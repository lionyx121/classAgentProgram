import { onUnmounted } from 'vue';
import { useUserInfoStore } from '@/stores/userInfo';
import router from '@/router';
import { showLoadingToast, closeToast } from 'vant';

export const isLogin = () => {
    const userStore = useUserInfoStore()
    let timer: number | null = null

    if (!userStore.userInfo.userid) {
        const toast = showLoadingToast({
            message: '暂未登录..',
            forbidClick: true, // 背景不可点击
            duration: 0,       // 0 表示不会自动消失
        });
        timer = setTimeout(() => {
            router.push('/login').finally(() => {
                closeToast()

            })
        }, 500)
        return false
    }

    onUnmounted(() => {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
    })

    return true
}