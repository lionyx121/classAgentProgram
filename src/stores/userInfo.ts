import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

import type { UserInfoKey, UserInfo } from '@/types/login'

const KEY = 'USERINFOKEY'

export const useUserInfoStore = defineStore('userInfo', () => {
  const stored = localStorage.getItem(KEY)

  // 优先读取本地存储中的用户信息
  const userInfo = ref<UserInfo>(stored ? JSON.parse(stored) : {})
  const updataUserInfo = (key: UserInfoKey, value: any): void => {
    userInfo.value[key] = value
  }

  watch(userInfo, (val) => {
    localStorage.setItem(KEY, JSON.stringify(val))
  }, {deep: true})

  return {
    userInfo,
    updataUserInfo
  }
})
