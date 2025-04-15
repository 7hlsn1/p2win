import axios from "axios";

class Api {
    static type = 'closed'
    static token = localStorage.getItem('token');
    static data = {
        baseURL: 'http://localhost:3000',
        headers: {}
    }
    constructor(type_: string = 'closed') {
        Api.type = type_
        if (type_ == 'closed') {
            Api.data.headers = {
                'Authorization': 'Bearer ' + Api.token
            }
        }
    }
    static api = axios.create(Api.data)

    static login = async (username: string, password: string) => {
        return await this.api.post('/login', [{ username, password }])

    }
    static getCategories = async () => {
        const req = await this.api.get('/categories')
        const json_data = req.data
        var result = [];
        for (var i in json_data)
            result.push(json_data[i]);

        return result
    }

    static getProducts = async () => {

    }
}
export { Api }