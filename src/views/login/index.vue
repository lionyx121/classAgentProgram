<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import type { FormInstance } from 'vant'
import { onSendEmailCode, onVerifyCode } from '@/api/login'
import { showSuccessToast, showFailToast } from 'vant';
import type { codeRes, RuleForm, UserInfoKey } from '@/types/login'
import { useUserInfoStore } from '@/stores/userInfo';
import router from '@/router'

const ruleForm = ref<RuleForm>({
    username: '',
    email: '',
    sms: ''
})

// 校验规则
const rules = {
    username: [
        { required: true, message: '请输入学号' },
        { pattern: /^2\d{10}$/, message: '学号格式错误' }
    ],
    email: [
        { required: true, message: '请输入邮箱' },
        {
            pattern: /^[A-Za-z0-9._%+-]+@(qq\.com|foxmail\.com|163\.com|126\.com|yeah\.net|sina\.com|sohu\.com|aliyun\.com|139\.com)$/,
            message: '邮箱格式错误'
        }
    ],
    sms: [
        { required: true, message: '请输入验证码' },
        { pattern: /^\d{6}$/, message: '验证码格式错误' }
    ]
}

const ruleFormRef = ref<FormInstance | null>(null)

// 判断是否发送验证码
const isSendSms = ref(false)
const contentTime = ref(60)

// 计时器
let timer: any[] = []

// 发送验证码
const sendSms = () => {
    ruleFormRef.value?.validate(['username', 'email']).then(async () => {
        isSendSms.value = true
        let time = setInterval(() => {
            contentTime.value--
            if (contentTime.value <= 0) {
                clearInterval(time)
                isSendSms.value = false
                contentTime.value = 60
            }
        }, 1000)
        timer.push({ key: 'setInterval', value: time })
        const res: codeRes = await onSendEmailCode(ruleForm.value)
        res.code === 0 ? showSuccessToast(res.msg) : showFailToast(res.msg)
    }).catch((err) => {
        console.log('校验不通过', err)
    })
}

const storeList = ['username', 'name', 'email', 'userid']
const userStroe = useUserInfoStore()

// 登录
const onLogin = () => {
    ruleFormRef.value?.validate().then(async () => {
        console.log('校验通过')
        const res: any = await onVerifyCode(ruleForm.value)
        res.code === 0 ? showSuccessToast(res.msg) : showFailToast(res.msg)
        if (res.code === 0) {
            storeList.forEach(item => {
                userStroe.updataUserInfo(item as UserInfoKey, res[item])
            })
            // 完成将信息存储到本地后跳转到首页'/'
            let time = setTimeout(() => {
                router.replace('/')
            }, 1000)
            timer.push({ key: 'setTimeout', value: time })
        }
    }).catch(() => {
        console.log('校验不通过')
    })
}

// 清理计时器
onUnmounted(() => {
    while (timer.length > 0) {
        let time = timer.shift()
        if (time.key === 'setInterval') {
            clearInterval(time.value)
        }
        if (time.key === 'setTimeout') {
            clearTimeout(time.value)
        }
    }
})

</script>

<template>
    <div class="layout">
        <!-- 顶部标题 -->
        <div class="top-title">
            <div>Welcome to Signals and Systems Agent</div>
            <div class="title">Let's login now!</div>
        </div>

        <!-- 表单：统一指定在 blur 时校验 -->
        <van-form validate-first validate-trigger="onBlur" ref="ruleFormRef">
            <van-cell-group inset class="input-cell-group" scroll-to-error>
                <van-field v-model="ruleForm.username" name="username" label="学号" placeholder="请输入学号"
                    :rules="rules.username" colon />
                <van-field v-model="ruleForm.email" name="email" label="邮箱" placeholder="请输入邮箱" :rules="rules.email"
                    colon />
                <van-field v-model="ruleForm.sms" name="sms" center clearable placeholder="请输入邮箱验证码" :rules="rules.sms"
                    maxlength="6">
                    <template #button>
                        <van-button size="small" type="primary" @click="sendSms" :disabled="isSendSms">
                            {{ isSendSms ? `验证码已发送${contentTime}` : '发送验证码' }}
                        </van-button>
                    </template>
                </van-field>
            </van-cell-group>
        </van-form>

        <!-- 登录按钮 -->
        <div class="login-btn" @click="onLogin">登录</div>

        <!-- 海大logo -->
        <img src="@/assets/images/AgentLogo-1.png" class="logo">
    </div>
</template>

<style scoped lang="scss">
.layout {
    background-color: #000;
    color: #fff;
    height: 100vh;
    border-top: 1px solid #000;
    position: relative;

    .top-title {
        width: 368px;
        height: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin: 40px auto;
        font-weight: 700;
        font-size: 16px;

        .title {
            font-size: 24px;
        }
    }

    .input-cell-group {
        background-color: transparent;
    }

    .login-btn {
        width: 350px;
        height: 48px;
        background-color: #1e1e1e;
        color: #fff;
        border-radius: 24px;
        margin: 40px auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #fff;
    }

    .logo {
        width: 170px;
        height: 170px;
        border-radius: 170px;
        position: absolute;
        right: 20px;
        bottom: 50px;
    }
}
</style>