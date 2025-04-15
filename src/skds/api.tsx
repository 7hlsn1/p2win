import axios from "axios";

interface Category {
    id: number,
    name: string,
    image: string
}

interface Product {
    id: number,
    title: string,
    banner: string,
    price: number,
    category_id: number,
    user_id: number,
    created_at: string
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
            reject()
        }
    })


    register = (email: string, password: string, username: string) => new Promise(async (resolve, reject) => {
        const req = await Api.api.post('/register', [{ email, password, username }]);
        resolve(req.data)
        if (!req) {
            reject()
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
        resolve(result);
        reject();
    });


    getProducts = (search: string = '', user: any = '') => new Promise(async function (resolve, reject) {
        const req = await Api.api.get(`/products?search=${search}&user=${user}`)
        const data = req.data
        var result = [];
        for (var i in data) {
            let data_: Product = data[i];
            result.push(data_);
        }
        resolve(result);
        reject();
    });

    createProduct = (category: number, type: number, title: string, description: string, price: number, banner: string) => new Promise(async function (resolve, reject) {
        const req = await Api.api.post(`/products/create`, [{ category, type, title, description, price, banner }])
        resolve(req.data);
        reject();
    });

    likeProduct = (id: number) => new Promise(async (resolve, reject) => {
        const req = await Api.api.get(`/products/like/${id}`)
        resolve(req.data)
        reject()
    })

}



export { Api }
export type { Category, Auth, Product }