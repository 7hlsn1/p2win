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
    public token = localStorage.getItem('token')
    public static func = {
        createDeposit: () => {

        }
    }
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
    getOrder = (id: number) => new Promise(async (resolve, reject) => {

        try {
            const data = await this.api.get(`/order/${id}`);
            resolve(data)
        } catch (ex: any) {
            alert(ex.message)
            reject(ex)

        }
    })
    getUserTransactions = (type: any) => new Promise(async (resolve, reject) => {

        try {
            await this.api.get(`/transactions/` + type).then((res: any) => {
                resolve(res.data)
            })
        } catch (ex) {
            reject(ex)

        }
    })

    createTransaction = (type: any, amount: any) => new Promise(async (resolve, reject) => {

        try {
            await this.api.post(`/transaction/` + type, { amount: amount, method: type }).then((res: any) => {
                resolve(res.data)
            })
        } catch (ex) {
            reject(ex)

        }
    });
    toggleBan = (id: any) => new Promise(async (resolve, reject) => {
        try {
            await this.api.get(`/admin/users/ban/${id}`).then((res: any) => {
                resolve(res.data)
            })
        } catch (ex) {
            reject()

        }
    });
    verifyUser = (id: any) => new Promise(async (resolve, reject) => {

        try {
            await this.api.get(`/admin/users/verify/${id}`).then((res: any) => {
                resolve(res.data)
            })
        } catch (ex) {
            reject()

        }
    });
    denyUser = (id: any) => new Promise(async (resolve, reject) => {

        try {
            await this.api.get(`/admin/users/deny/${id}`).then((res: any) => {
                resolve(res.data)
            })
        } catch (ex) {
            reject()

        }
    });
    createVerify = (name: any, cpf: any, file: File, birthDate: string) => new Promise(async (resolve, reject) => {

        console.log(file)
        try {
            await this.api.post('/verify_account', {
                name: name,
                cpf: cpf,
                documentFront: file,
                documentBack: file,
                birthDate: birthDate
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res: any) => {
                resolve(res.data)
            })
        } catch (ex) {
            reject()

        }
    });
    getCart = (): Array<any> => {
        const cart = localStorage.getItem('cart')
        return JSON.parse(cart ?? '[]')
    }
    addToCart = (id: number) => new Promise(async (resolve, reject) => {
        const cart = this.getCart()

        const product = await this.getProduct(id)
        cart.push(product)
        localStorage.setItem('cart', JSON.stringify(cart))


        resolve(cart)
        reject()
    })

    removeFromCart = (item: number) => {
        const cart = this.getCart()
        console.log('cart:')
        console.log(cart)
        const newCart: Array<any> = []
        cart.map((i) => {
            if (i.id != item) {
                newCart.push(i)
            }
        })
        console.log('newCart')
        console.log(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
        return newCart
    }
    getOrders = (status?: number) => new Promise(async (resolve, reject) => {
        await this.api.get(`/orders${status ? '?status=' + status.toString() : ''}`).then((data: any) => {
            resolve(data.data)
        })
        reject()
    })


    createOrder = (cart: any, method: string) => new Promise(async (resolve, reject) => {
        await this.api.post('/order', {
            cart, method
        }).then((data: any) => {
            resolve(data.data)
        })
        reject()
    })

    renewPassword = (password: any, code: any) => new Promise(async (resolve, reject) => {
        await this.api.post('/renew_password/', { password, code }).then((data: any) => {
            resolve(data.data)
        })
        reject()
    })
    verifyPasswordToken = (token: any) => new Promise(async (resolve, reject) => {
        await this.api.get('/reset_password/' + token).then((data: any) => {
            resolve(data.data)
        })
        reject()
    })

    resetPassword = (email_: string) => new Promise(async (resolve, reject) => {
        await this.api.post('/forgot_password', {
            email: email_
        }).then((data: any) => {

            resolve(data.data)
        })
        reject()
    })
    getLoggedUser = () => new Promise(async (resolve, reject) => {


        await this.api.get('/verify_token').then((user: any) => {


            resolve(user.data.user)
        })

        const userId = localStorage.getItem('user_id')
        if (!userId) {
            resolve(false)
            return false;
        }


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

    getSellers = () => new Promise(async (resolve, reject) => {
        const req = await this.api.get('/sellers');
        const data = req.data
        resolve(data)
        reject()
    })
    getCategories = (search: string = '', limit: number = 10000, all: boolean = false) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/categories?search=${search}&limit=${limit}` + (all ? '&all=1' : ''));
        const data = req.data

        resolve(data);
        reject();
    });
    getTypes = () => new Promise(async (resolve, reject) => {
        const req = await this.api.get('/orders/types')
        resolve(req.data)
        reject();
    });




    getProducts = (search: string | any = '', user: number = 0, category: number = 0) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/products?search=${search}${user ? `&user=${user}` : ''}&category_id=${category}`)
        const data = req.data
        resolve(data);
        reject();
    });

    getAllProducts = (search: string | any = '', user: string = '', category: number = 0, status = 0) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/admin/products?search=${search}&user=${user}&category_id=${category}&status=${status}`)
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

    approveProduct = (id: number) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/admin/products/approve/${id}`)
        const data = req.data
        resolve(data);
        reject();
    });

    rejectProduct = (id: number) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/admin/products/reject/${id}`)
        const data = req.data
        resolve(data);
        reject();
    });

    getTransactions = (id: number) => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/admin/products/reject/${id}`)
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

            if (err.response.data.message.includes('Token')) {
                document.location.href = '/login';
            }


        }
        reject()
    });

    createProduct = (category: number, type: number, title: string, description: string, price: number, banner: File, images: any) => new Promise(async (resolve, reject) => {

        try {
            const req = await this.api.post(`/products/create`, { category, type, title, description, price, banner, images }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            resolve(req.data);

        } catch (ex) {
            reject();
        }
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
    getUsers = (verified: any = 'any') => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/admin/users/all?verified=${verified}`)
        resolve(req.data)
        reject()
    })
    getVerifyRequests = () => new Promise(async (resolve, reject) => {
        const req = await this.api.get(`/admin/users/verify_requests`)
        resolve(req.data)
        reject()
    })

}

class TLoader {

    static sleep = async (time: number) => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, time)
        if (0)
            reject()
    })
    static tLoader = async (value: number = 1, text: string = 'Carregando...') => {






        const styles: any = {
            position: 'fixed',
            top: 0,
            left: 0,
            flexDirection: 'column',
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.76)',
            backdropFilter: 'blur(15px)',
            color: 'white',
            zIndex: '99933399',
            display: ['none', 'flex'][value]
        }

        const loader = `
 
            <img src='/assets/logo.gif' />
            <span style="color: white">${text}</span>
 
        `
        let loaderFound = document.getElementById('tloader')
        if (loaderFound) {
            loaderFound.innerHTML = loader
            Object.keys(styles).map((k: any) => {
                loaderFound.style[k] = styles[k]
            })
        }





    }
}

export { Api, TLoader, }
export type { Category, Auth, Product, Profile }
