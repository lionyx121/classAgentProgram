const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoUrl = require('./config/env').mongoUrl;
const path = require('path')
const fs = require('fs')

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 获取路由
const chatRoutes = require('./routes/chat/chat');
const loginRoutes = require('./routes/login/login');
const userRoutes = require('./routes/user/user')
const classDataRoutes = require('./routes/classData/classData')
const practice = require('./routes/practice/practice')
const resourcesRoutes = require('./routes/resources/resources')

// 路由
app.use('/api/chat', chatRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/user', userRoutes);
app.use('/api/classData', classDataRoutes);
app.use('/api/practice', practice);
app.use('/api/resources', resourcesRoutes)

// 暴露静态资源
app.get('/resources/:file', (req, res) => {
    const filename = req.params.file
    const filePath = path.join(__dirname, 'uploads/resources', filename)

    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ msg: '文件不存在' })
    }

    res.download(filePath) // 使用原文件名强制下载
})

app.get('/', (req, res) => {
    res.send('连接成功')
})

// 数据库连接
mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

// pm2 restart all --update-env
