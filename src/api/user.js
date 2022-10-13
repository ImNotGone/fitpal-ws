import { Api } from './api.js'

export { UserApi, LoginCredentials, RegistrationCredentials, ResendVerification, AccountVerify};

class UserApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/users${ slug ? `/${slug}` : ""}`
    }

    static async signup(registration_credentials) {
        return await Api.post(UserApi.getUrl(), false, registration_credentials);
    }

    static async login(login_credentials) {
        return await Api.post(UserApi.getUrl('login'), false, login_credentials);
    }

    static async logout() {
        return await Api.post(UserApi.getUrl('logout'), true);
    }

    static async getCurrentUser() {
        return await Api.get(UserApi.getUrl('current'), true);
    }

    static async editCurrentUser(accountEdit) {
        return await Api.put(UserApi.getUrl('current'), true, accountEdit);
    }

    static async deleteCurrentUser() {
        return await Api.delete(UserApi.getUrl('current'), true);
    }

    static async resend_verification(email) {
        return await Api.post(UserApi.getUrl('resend_verification'), false, email);
    }

    static async verify_email(email_verification) {
        return await Api.post(UserApi.getUrl('verify_email'), false, email_verification);
    }
}


class LoginCredentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class RegistrationCredentials {
    constructor(firstName, lastName, email, password, metadata) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = email;
        this.password = password;
        this.metadata = metadata;
        this.avatarUrl = "https://plusvalleyadventure.com/wp-content/uploads/2020/11/default-user-icon-8.jpg";
    }
}

class ResendVerification {
    constructor(email) {
        this.email = email;
    }
}

class AccountVerify {
    constructor(email, code) {
        this.email = email;
        this.code = code;
    }
}
