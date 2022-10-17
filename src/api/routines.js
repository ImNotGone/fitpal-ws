import { Api } from "./api";

export { RoutineApi, RoutineData, Review, SectionData, CycleExercise };

class RoutineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ""}`;
    }

    static getRewiewsUrl(slug) {
        return `${Api.baseUrl}/reviews${ slug ? `/${slug}` : ""}`;
    }

    static getSectionUrl(cycleId, exerciseId) {
        return `${Api.baseUrl}/cycles/${cycleId}/exercises/${exerciseId}`;
    }

    static async getRoutines() {
        return await Api.get(RoutineApi.getUrl(), true)
    }

    static async addRoutine(routineData) {
        return await Api.post(RoutineApi.getUrl(), true, routineData);
    }

    static async addSection(id, sectionData) {
        return await Api.post(RoutineApi.getUrl(id.toString() + '/cycles'), true, sectionData);
    }

    static async addExerciseToSection(id, exerciseId, exerciseData) {
        return await Api.post(RoutineApi.getSectionUrl(id, exerciseId), true, exerciseData);
    }

    static async getSection(routineId, sectionid) {
        return await Api.get(RoutineApi.getUrl(routineId.toString() + '/cycles/' + sectionid.toString()), true);
    }

    static async getSections(routineId) {
        return await Api.get(RoutineApi.getUrl(routineId.toString() + '/cycles'), true);
    }

    static async getExercisesFromSection(routineId, sectionId) {
        return await Api.get(`${Api.baseUrl}` + '/cycles/' + sectionId.toString() + '/exercises', true);
    }

    static async modifySection(routineId, sectionId, sectionData) {
        return await Api.put(RoutineApi.getUrl(routineId.toString() + '/cycles/' + sectionId.toString()), true, sectionData);
    }

    static async modifyExerciseToSection(id, exerciseId, exerciseData) {
        return await Api.put(RoutineApi.getSectionUrl(id, exerciseId), true, exerciseData);
    }

    static async deleteSection(routineId, sectionId) {
        return await Api.delete(`${Api.baseUrl}` + '/routines/' + routineId + '/cycles/' + sectionId, true);
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
    constructor(name, detail, isPublic, difficulty, imageUrl, tags, qtySeries) {
        this.name = name;
        this.detail = detail;
        this.isPublic = isPublic;
        this.difficulty = difficulty;
        this.metadata = {
            imageUrl: imageUrl,
            tags: tags,
            qtySections: qtySeries,
        }
    }
}

class SectionData {
    constructor(name, order, type, repetitions, rest) {
        this.name = name;
        this.detail = '';
        this.type = type;
        this.order = order;
        this.repetitions = repetitions;
        this.metadata = {
            rest: rest
        }
    }
}

class CycleExercise {
    constructor(order, type, amount) {
        this.order = order;
        this.duration = (type === 'Time (seconds)' ? amount : 0);
        this.repetitions = (type === 'Reps' ? amount : 0);
    }
}

class Review {
    constructor(score, review) {
        this.score = score;
        this.review = review;
    }
}
