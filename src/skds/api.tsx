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
    description: string,
    category_id: number,
    type_id: number,
    user_id: number,
    user: string,
    category: string,
    created_at: string,
    status: string
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
    public user = {}
    public data = {
        baseURL: import.meta.env.VITE_API_URL,
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
    getLoggedUser = () => new Promise(async (resolve, reject) => {
        const userId = localStorage.getItem('user_id')
        if (!userId) {
            resolve(false)
            return false;
        }
        await this.getProfile(parseInt(userId)).then(user => {
            resolve(user)
        })
        reject()
    })
    logout = () => new Promise(async (resolve, reject) => {
        await this.api.get('/logout')


        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
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

    getProfile = (userId: number = 0) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/profile?user=${userId}`);
        resolve(req.data)
        reject()
    })


    getCategories = (search: string = '') => new Promise(async (resolve, reject) => {
        const req = await this.api.get('/categories?search=' + search);
        const data = req.data

        resolve(data);
        reject();
    });


    getProducts = (search: string | any = '', user: number = 0, category: number = 0) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/products?search=${search}&user=${user}&category_id=${category}`)
        const data = req.data
        resolve(data);
        reject();
    });

    getAllProducts = (search: string | any = '', user: number = 0, category: number = 0) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/admin/products?search=${search}&user=${user}&category_id=${category}`)
        const data = req.data
        resolve(data);
        reject();
    });

    getProduct = (id: number) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/products?id=${id}`)
        const data = req.data
        resolve(data);
        reject();
    });


    getMyProducts = (search: string | any = '', status_: number | string = 10, category: number | string = '') => new Promise(async (resolve, reject) => {
        if (status_ == 10) {
            status_ = ''
        }
        try {
            const req = await this.api.get(`/my_products?search=${search}&status=${status_}&category_id=${category}`)
            const data = req.data
            resolve(data);

        } catch (err: any) {
            console.log('err:')
            console.log(err)
            if (err.response.data.message.includes('Token')) {
                document.location.href = '/login';
            }


        }
        reject()
    });

    createProduct = (category: number, type: number, title: string, description: string, price: number, banner: File, images: any) => new Promise(async (resolve, reject) => {
        console.log(images)
        const req = await this.api.post(`/products/create`, { category, type, title, description, price, banner, images }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        resolve(req.data);
        reject();
    });

    likeProduct = (id: number) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/products/like/${id}`)
        resolve(req.data)
        reject()
    })

    followUser = (id: number) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/users/follow/${id}`)
        resolve(req.data)
        reject()
    })
    blockUser = (id: number) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/users/block/${id}`)
        resolve(req.data)
        reject()
    })

    favoriteUser = (id: number) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/users/favorite/${id}`)
        resolve(req.data)
        reject()
    })
    getUsers = () => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/admin/users/all`)
        resolve(req.data)
        reject()
    })

}

class TLoader {


    static tLoader = (value: number = 1) => {
        const styles: any = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, .5)',
            backdropFilter: 'blur(5px)',
            color: 'white',
            zIndex: '9999',
            display: ['none', 'flex'][value]
        }

        const loader = `
            
                Carregando...
            
        `
        let loaderFound = document.getElementById('tloader')
        if (loaderFound) {
            loaderFound.innerHTML = loader
            Object.keys(styles).map((k: any) => {
                loaderFound.style[k] = styles[k]
            })
        } else {
            alert('err');
        }
    }
}

export { Api, TLoader }
export type { Category, Auth, Product, Profile }