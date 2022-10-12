import { Api } from "./api.js";

export { ExercisesApi, Exercise };

class ExercisesApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ""}`
    }

    static async getExercises() {
        return await Api.get(ExercisesApi.getUrl(), true);
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
}


class Exercise {
    constructor(name, detail, type, metadata) {
        this.name = name;       // char[100]
        this.detail = detail;   // char[200]
        this.type = type;       // enum{ "excercise", "rest" }
        this.metadata = metadata;
    }
}
