import axios from "axios";

class Api {
    static type = 'closed'
    static token = localStorage.getItem('token');
    static data = {
        baseURL: 'http://localhost:3000',
        headers: {}
    }
    constructor(type_: string = 'closed') {
        if (type_ == 'closed') {
            Api.data.headers = {
                'Authorization': 'Bearer ' + Api.token
            }
        }
    }
    static api = axios.create(Api.data)

    login_ = async (username: string, password: string) => {
        return await Api.api.post('/login', [{ username, password }])
    }

    login = () => new Promise(async (resolve, reject) => {
        const req = await Api.api.post('/login', []);
        resolve(req.data)
        if (!req) {
            reject('err')
        }
    })

    getCategories = () => new Promise(async function (resolve, reject) {

        interface Category {
            id: number,
            name: string,
            image: string
        }

        const req = await Api.api.get('/categories')
        const json_data = req.data
        var result = [];
        for (var i in json_data) {
            let data: Category;
            data = json_data[i]
            result.push(data);
        }
        resolve(result); // when successful
        reject();  // when error
    });




    static getProducts = async () => {

    }

}


interface Category {
    id: number,
    name: string,
    image: string
}


export { Api }
export type { Category }