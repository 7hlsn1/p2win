import axios from "axios";
interface Category {
    id: number,
    name: string,
    image: string
}

interface Auth {
    email: string,
    password: string,
}

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

 

    login = (email: string, password: string) => new Promise(async (resolve, reject) => {
        const req = await Api.api.post('/login', [{ email, password }]);
        resolve(req.data)
        if (!req) {
            reject('err')
        }
    })

    getCategories = (search: string = '') => new Promise(async function (resolve, reject) {


        const req = await Api.api.get('/categories?search=' + search)
        const data = req.data
        var result = [];
        for (var i in data) {
            let data_: Category = data[i];
            result.push(data_);
        }
        resolve(result); // when successful
        reject();  // when error
    });




    static getProducts = async () => {

    }

}



export { Api }
export type { Category, Auth }