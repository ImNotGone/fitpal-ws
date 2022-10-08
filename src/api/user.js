import { Api } from './api.js'


export { UserApi, Credentials };

class UserApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/users${ slug ? `/${slug}` : ""}`
    }

    static async login(credentials) {
        return await Api.post(UserApi.getUrl('login'), false, credentials);
    }

    static async logout() {
        return await Api.post(UserApi.getUrl('logout'), true);
    }

    static async get() {
        return Api.get(UserApi.getUrl('current'), true);
    }
}


class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
