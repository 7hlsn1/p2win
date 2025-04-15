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

interface Profile {
    email: string,
    username: string,
    avatar: string
}

class Api {
    public api
    static type = 'closed'
    public token = localStorage.getItem('token');
    public data = {
        baseURL: 'https://game-store-6d576f08fc9a.herokuapp.com',
        headers: {}
    }
    constructor(type_: string = 'closed') {

        if (type_ == 'closed') {
            if (this.token != null) {
                this.data.headers = {
                    'Authorization': 'Bearer ' + this.token
                }
            } else {

              
            }
        }
        this.api = axios.create(this.data)
    }

    logout = () => new Promise(async (resolve, reject) => {
        await this.api.get('/logout')
       
        resolve(1)
        reject()
    })

    login = (email: string, password: string) => new Promise(async (resolve, reject) => {
        const req = await this.api.post('/login', { email, password });
        resolve(req.data)
        if (!req) {
            reject()
        }
    })


    register = (email: string, password: string, username: string) => new Promise(async (resolve, reject) => {
        const req = await this.api.post('/register', { email, password, username });
        resolve(req.data)
        if (!req) {
            reject()
        }
    })

    getProfile = () => new Promise(async (resolve, reject) => {
        const req = await this.api.get('/profile');
        resolve(req.data)
        reject()
    })


    getCategories = (search: string = '') => new Promise(async (resolve, reject) => {
        const req = await this.api.get('/categories?search=' + search);
        const data = req.data
        var result = [];
        for (var i in data) {
            let data_: Category = data[i];
            result.push(data_);
        }
        resolve(result);
        reject();
    });


    getProducts = (search: string = '', user: any = '') => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/products?search=${search}&user=${user}`)
        const data = req.data
        var result = [];
        for (var i in data) {
            let data_: Product = data[i];
            result.push(data_);
        }
        resolve(result);
        reject();
    });

    createProduct = (category: number, type: number, title: string, description: string, price: number, banner: string) => new Promise(async (resolve, reject) => {
        const req = await this.api.post(`/products/create`, { category, type, title, description, price, banner })
        resolve(req.data);
        reject();
    });

    likeProduct = (id: number) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/products/like/${id}`)
        resolve(req.data)
        reject()
    })

}



export { Api }
export type { Category, Auth, Product, Profile }