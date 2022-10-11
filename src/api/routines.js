import { Api } from "./api";

export { RoutineApi, RoutineData, Review };

class RoutineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ""}`;
    }

    static getRewiewsUrl(slug) {
        return `${Api.baseUrl}/reviews${ slug ? `/${slug}` : ""}`;
    }

    static async getRoutines() {
        return await Api.get(RoutineApi.getUrl(), true)
    }

    static async addRoutine(routineData) {
        return await Api.post(RoutineApi.getUrl(), true, routineData);
    }

    static async getRoutine(id) {
        return await Api.get(RoutineApi.getUrl(id), true);
    }

    static async modifyRoutine(id, routineData) {
        return await Api.put(RoutineApi.getUrl(id), true, routineData);
    }

    static async deleteRoutine(id) {
        return await Api.delete(RoutineApi.getUrl(id), true);
    }

    static async getRoutineRewiews(id) {
        return await Api.get(RoutineApi.getRewiewsUrl(id), true);
    }

    static async addRoutineReview(id, review) {
        return await Api.post(RoutineApi.getRewiewsUrl(id), true, review);
    }
}

/*
* @param {char[100]} name
* @param {char[200]} desc
* @param {bool} isPublic
* @param {enum{"rookie", "beginner", "intermediate", "advanced", "expert"}} difficulty
* */

class RoutineData {
    constructor(name, detail, isPublic, difficulty, category, metadata) {
        this.name = name;
        this.detail = detail;
        this.isPublic = isPublic;
        this.difficulty = difficulty;
        this.category = category;
        this.metadata = metadata;
    }
}

class Review {
    constructor(stars, review) {
        this.stars = stars;
        this.review = review;
    }
}
