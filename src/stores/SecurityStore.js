import { defineStore } from 'pinia';
import { UserApi } from '@/api/user';
import { Api } from '@/api/api';

const SECURITY_TOKEN_KEY = 'security-token';

export const useSecurityStore = defineStore('security', {
    state: () => ({
        loading: false,
        token: null,
        user: null
    }),

    getters: {
        isLoggedIn() {
            return this.token != null;
        },
        firstName() {
            if(this.user) {
                return this.user.firstName;
            }
            return '';
        },
        lastName() {
            if(this.user) {
                return this.user.lastName;
            }
            return '';
        },
        image() {
            if(this.user) {
                return this.user.avatarUrl;
            }
            return '';
        },
        email() {
            if(this.user) {
                return this.user.email;
            }
            return '';
        }
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
            this.loading = true;
            const result = await UserApi.login(credentials);
            this.saveToken(result.token);
            this.loading = false;
        },
        async logout() {
            this.loading = true;
            await UserApi.logout();
            this.removeToken();
            this.loading = false;
        },
        async getUser() {
            this.loading = true;
            const result = await UserApi.getCurrentUser();
            this.setUser(result);
            this.loading = false;
        }
    }
});
