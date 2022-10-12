import { Api } from "./api.js";

export { CategoriesApi, Category };

class CategoriesApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/categories${ slug ? `/${slug}`:""}`
    }

    static async getCategories() {
        return await Api.get(CategoriesApi.getUrl(), true);
    }

    static async addCategory(category) {
        return await Api.post(CategoriesApi.getUrl(), true, category);
    }

}

class Category {
    constructor(name, detail) {
        this.name = name;
        this.detail = detail;
    }
}
