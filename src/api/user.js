import { useSecurityStore } from '@/stores/SecurityStore.js';
import { Api } from './api.js'
import { Exercise, ExercisesApi, Video } from './exercises.js';
import { GetRoutines } from './routines.js';

export { UserApi, LoginCredentials, RegistrationCredentials, ResendVerification, AccountVerify, AccountEdit};

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

    static async getUserRoutines(getRoutines = new GetRoutines()) {
        let gR = getRoutines;
        let url = `${UserApi.getUrl('current/routines')}?page=${gR.page}&size=${gR.size}`
        if(gR.orderBy)
            url += `&orderBy=${gR.orderBy}`
        if(gR.direction)
            url += `&direction=${gR.direction}`
        if(gR.difficulty)
            url += `&difficulty=${gR.difficulty}`
        return await Api.get(url,true);
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

    static async loadDefaultExcercises() {
        const user = await useSecurityStore().getUser();
        if(!user.metadata || user.metadata.hasLoggedIn) {
            return;
        }
        // load default exercises
        let defaultExercises = UserApi.getDefaultExercises();

        defaultExercises.forEach(async element => {
            let ex = await ExercisesApi.addExercise(element.exercise);
            await ExercisesApi.addVideo(ex.id, element.video);
        });

        // edit user flag
        await UserApi.editCurrentUser(new LoadedExcercises);
    }

    static getDefaultExercises() {
        let defaultExercises = [];
        let exercise = new Exercise(
            "Push Ups",
            "Perfect Pushup",
            "exercise",
            {tags: "Biceps"});
        let video = new Video(
            "https://www.youtube.com/watch?v=IODxDxX7oi4"
        )
        defaultExercises.push({"exercise": exercise, "video": video});

        //exercise = new Exercise(
        //""
        //);
        //video = new Video();
        //defaultExercises.push({"exercise": exercise, "video": video});
        return defaultExercises;
    }
}


class LoginCredentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class RegistrationCredentials {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = email;
        this.password = password;
        this.metadata = {
            hasLoggedIn: false,
        }
        this.avatarUrl = "https://plusvalleyadventure.com/wp-content/uploads/2020/11/default-user-icon-8.jpg";
    }
}

class LoadedExcercises {
    constructor() {
        this.metadata = {
            hasLoggedIn: true,
        }
    }
}

class AccountEdit {
    constructor(firstName, lastName, avatarUrl) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatarUrl = avatarUrl;
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
