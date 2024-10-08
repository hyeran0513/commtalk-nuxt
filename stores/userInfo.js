import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', {
    state: () => ({
        userInfo: null,
        admin: false
    }),
    actions: {
        updateUserInfo(userInfo) {
            this.userInfo = userInfo;
            this.admin = (userInfo.nickname === 'admin');
        }
    }
});