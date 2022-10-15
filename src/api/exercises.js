import { Api } from "./api.js";

export { ExercisesApi, Exercise, Image };

class ExercisesApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ""}`
    }

    static async getExercises() {
        let resp = await Api.get(ExercisesApi.getUrl(), true);
        return resp.content;
    }

    static async addExercise(exercise) {
        return await Api.post(ExercisesApi.getUrl(), true, exercise);
    }

    static async getExercise(id) {
        return await Api.get(ExercisesApi.getUrl(id), true);
    }

    static async editExercise(id, exercise) {
        return await Api.put(ExercisesApi.getUrl(id), true, exercise);
    }

    static async deleteExercise(id) {
        return await Api.delete(ExercisesApi.getUrl(id), true);
    }

    static async getImage(exerciseId) {
        let resp = await Api.get(`${ExercisesApi.getUrl()}/${exerciseId}/images`, true);
        return resp.content[0]?.url;
    }

    static async addImage(exerciseId, image) {
        return await Api.post(`${ExercisesApi.getUrl()}/${exerciseId}/images`,true, image);
    }

    static async editImage(exerciseId, imageId, image) {
        return await Api.post(`${ExercisesApi.getUrl()}/${exerciseId}/images/${imageId}`, true, image);
    }

    static async deleteImage(exerciseId, imageId) {
        return await Api.delete(`${ExercisesApi.getUrl()}/${exerciseId}/images/${imageId}`, true);
    }
}


class Exercise {
    constructor(name, detail, type, metadata) {
        this.name = name;       // char[100]
        this.detail = detail;   // char[200]
        this.type = type;       // enum{ "excercise", "rest" }
        this.metadata = metadata;
    }
}

class Image {
    constructor(imgUrl) {
        this.number = 1;
        this.url = imgUrl;
    }
}
