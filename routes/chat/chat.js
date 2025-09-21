const express = require('express');
const router = express.Router();
const axios = require('axios');
const { getEmbedding } = require('../../utils/RAG/getRagData');

const User = require('../../models/user')

const { API_KEY: apiKey, APPID: appId } = require('../../config/env');

// 获取一个随机8位的字符串
const getRandomString = () => {
  return Math.random().toString(36).substring(2, 10)
}

// 全局维护一个map key是clientid value中包含userid、username、questions等信息
const userMap = new Map()

// 获取从前端拿到的userid、username、questions 去改变map中的值 并生成一个clientid返回给前端
// 我们还需要返回这个问题可能和什么相关给前端，让前端拼接相关的知识点喂给大模型，并且可以进行展示
router.post('/getClientId', async (req, res) => {
  try {
    const { userid, username, questions } = req.body
    const clientid = getRandomString()
    const content = questions[questions.length - 1].content
    // 调用getEmbedding函数获取相似度高的数据
    const similarity = await getEmbedding(content)

    let str = '相关知识点：'
    // 对最后一项question的content根据similarity添加说明
    for (let i = 0; i < similarity.length; i++) {
      str += `${similarity[i].id}(${similarity[i].cosine.toString().slice(0, 7)})、`
    }
    questions[questions.length - 1].content += str

    const data = {
      userid,
      username,
      questions
    }
    userMap.set(clientid, data)
    res.status(200).json({
      code: 1000,
      msg: '获取clientid成功',
      clientid,
      similarity
    })
  } catch (error) {
    res.status(400).json({
      code: 1001,
      msg: '获取clientid失败'
    })
  }
})

// 建立SSE链接 获取大模型返回的数据
router.get('/connetSSE', async (req, res) => {
  const { clientid } = req.query;
  // 判断是否有clientid
  if (!clientid) {
    res.status(400).json({
      code: 1001,
      msg: 'clientid不能为空'
    })
    return
  }

  // 从userMap中去获得相关的信息
  const { username, userid, questions } = userMap.get(clientid)

  // ---- 给前端（浏览器）设置 SSE 头 ----
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  // 浏览器断线重连等待时间（毫秒）
  res.write(`retry: 2000\n\n`);

  // 30 秒心跳，避免中间层断开
  const heartbeat = setInterval(() => {
    res.write(`event: ping\ndata: "💓"\n\n`);
  }, 30000);

  // 小工具：向前端发一条标准 SSE 默认消息（message）
  const pushData = (payload) => {
    // 统一包成 JSON 字符串，前端 onmessage -> JSON.parse(e.data)
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };
  // 小工具：发自定义事件
  const pushEvent = (event, payload) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  const url = `https://dashscope.aliyuncs.com/api/v1/apps/${appId}/completion`;

  // 请求体：按你的应用模型需要调整
  const body = {
    input: {
      messages: questions,
      prompt: "在最后帮我用8个字总结用户本次的提问"
    },
    parameters: {
      incremental_output: true,
      // flow_stream_mode: 'agent_format', // 若是工作流/智能体可开启
    }
  };
  let upstream;
  let answerBack = {
    role: 'assistant',
    content: '',
    createTime: Date.now()
  }

  try {
    upstream = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-SSE': 'enable',   // 要求上游 SSE
      },
      responseType: 'stream',
      timeout: 1000 * 60 * 5
    });
  } catch (err) {
    clearInterval(heartbeat);
    // 出错也走 SSE，让前端能感知
    pushEvent('error', { message: `DashScope request failed: ${err.message}` });
    pushEvent('done', 'done');
    return res.end();
  }

  // 逐行解析上游 SSE（data: ...），抽出文本后再用我们的 SSE 往前端推
  let buffer = '';
  upstream.data.on('data', (chunk) => {
    const str = chunk.toString('utf8');
    buffer += str;

    // 按行切，保留最后一行（可能不完整）
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // 只关心 data: 行（上游也可能有 event: 等）
      if (!trimmed.startsWith('data:')) continue;

      const payload = trimmed.slice(5).trim(); // 去掉 'data:'
      if (!payload) continue;

      try {
        const json = JSON.parse(payload);

        // 兼容不同输出位
        const piece =
          json?.output?.text ??
          json?.output?.workflow_message?.message?.content ??
          '';

        if (piece) {
          // **关键：包成标准 SSE 消息**
          pushData({ text: piece });
          answerBack.content += piece
        }

      } catch {
        // 非 JSON 就透传，便于调试
        pushData({ raw: payload });
      }
    }
  });

  upstream.data.on('end', () => {
    // 把残留缓冲也尽力处理一下
    if (buffer.trim().length) {
      try {
        const j = JSON.parse(buffer.trim());
        const last =
          j?.output?.text ??
          j?.output?.workflow_message?.message?.content ??
          '';
        if (last) ({ text: last });
      } catch {
        pushData({ raw: buffer.trim() });
      }
      buffer = '';
    }
    // 告知前端结束
    pushEvent('done', 'done');
    clearInterval(heartbeat);
    res.end();
  });

  upstream.data.on('error', (err) => {
    pushEvent('error', { message: err.message || 'upstream stream error' });
    pushEvent('done', 'done');
    clearInterval(heartbeat);
    res.end();
  });

  // 前端断开 → 关闭上游流，清理资源
  req.on('close', async () => {
    // 将answerBack添加到用户的聊天记录中
    questions.push(answerBack)

    const firstCreateTime = questions[0].createTime
    const res = await User.updateOne(
      {
        username,
        "history.chatHistory.0.createTime": firstCreateTime
      },
      {
        $set: { "history.$.chatHistory": questions }
      }
    )

    // 如果没有找到（matchedCount === 0），说明要插入新的
    if (res.matchedCount === 0) {
      await User.updateOne(
        { username },
        {
          $push: {
            history: { chatHistory: questions }
          }
        }
      )
    }
    clearInterval(heartbeat);
    if (upstream?.data?.destroy) upstream.data.destroy();
  });
});

module.exports = router;
