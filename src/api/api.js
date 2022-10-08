export { Api }

class Api {
    static token;

    static get baseUrl() {
        return 'http://localhost:8080/api';
    }

    static get timeout() {
        return 60 * 1000;
    }

    static async fetch(url, secure, init) {
        if(secure && Api.token) {
            if(!init.header) {
                init.header = {};
            }
            init.header['Authorization'] = `bearer ${Api.token}`
        }

        const controller = new AbortController();

        init.signal = controller.signal;
        const timer = setTimeout(() => controller.abort(), Api.timeout);

        try {
            const response = await fetch(url, init);
            const text = await response.text();
            const result = text ? JSON.parse(text) : {};

            if (result.code) { // if result.code is present => error
                throw result;
            }
            return result;
        } catch(error) {
            if(error.code) {  // if error.code is present => api error
                throw error;  // throw api error
            } else if(error.name === 'AbortError') { // controller aborted
                throw { 'code': 98, 'description': error.message.toLowerCase()}
            } else if(error.name === 'TypeError') {  // bad call?
                throw { 'code': 99, 'description': error.message.toLowerCase()}
            }
        } finally {
            clearTimeout(timer);
        }
    }

    static async get(url, secure) {
        return await Api.fetch(url, secure);
    }

    static async post(url, secure, data) {
        return await Api.fetch(url, secure, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(data)
        });
    }

    static async put(url, secure, data) {
        return await Api.fetch(url, secure, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(data)
        });
    }

    static async delete(url, secure) {
        return await Api.fetch(url, secure, {
            method: "DELETE",
        });
    }
}
