import { defineStore } from 'pinia';
import { UserApi } from '@/api/user';
import { Api } from '@/api/api';

const SECURITY_TOKEN_KEY = 'security-token';

export const useSecurityStore = defineStore('security', {
    state: () => ({
        token: null,
        user: null
    }),

    getters: {
        isLoggedIn() {
            return this.token != null;
        },
    },

    actions: {
        init() {
            const token = localStorage.getItem(SECURITY_TOKEN_KEY);
            if(token) {
                this.setToken(token);
            }
        },
        setUser(user) {
            this.user = user;
        },
        setToken(token) {
            this.token = token;
            Api.token = token;
        },
        saveToken(token) {
            localStorage.setItem(SECURITY_TOKEN_KEY, token);
            this.setToken(token);
        },
        removeToken() {
            localStorage.removeItem(SECURITY_TOKEN_KEY);
            this.setToken(null);
        },
        async login(credentials) {
            try {
                const result = await UserApi.login(credentials);
                this.saveToken(result.token);
            } catch(error) {
                alert(error.description)
                return false;
            }
            return true;
        },
        async logout() {
            try {
                await UserApi.logout();
            } catch(error) {
                console.log(error)
            }
            this.removeToken();
        },
        async getUser() {
            if(this.user) {
                return this.user;
            }
            const result = await UserApi.getCurrentUser();
            this.setUser(result);
            return this.user;
        }
    }
});
