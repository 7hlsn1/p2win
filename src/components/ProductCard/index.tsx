import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import moment from 'moment';
import { FaCartPlus, FaEye } from 'react-icons/fa6';
import { Api } from '../../skds/api';
import Swal from 'sweetalert2';
const api = new Api('open')
function ProductCard(props: any) {

    const { id, title, banner, description, price, created_at, user, user_id, user_online = 0 } = props.product
    const buy = props.buy
    const handleAddToCart = async () => {
        const currentCart = api.getCart()
        const ids = currentCart.map((i: any) => i.id)

        if (ids.includes(id)) {
            return Swal.fire({
                icon: 'info',
                text: 'Produto já adicionado ao carrinho',
                showCancelButton: true,
                cancelButtonText: 'Ir para o carrinho',
                cancelButtonColor: 'green',
            }).then((res: any) => {
                if (res.dismiss == 'cancel') {
                    document.location.href = '/carrinho'
                }
            })
        }
        await api.addToCart(id).then((cart: any) => {
            Swal.fire({
                icon: 'success',
                text: 'Adicionado ao carrinho',
                showCancelButton: true,
                cancelButtonText: 'Ir para o carrinho',
                cancelButtonColor: 'green',
            }).then((res: any) => {
                if (res.dismiss == 'cancel') {
                    document.location.href = '/carrinho'
                }
            })
            console.log(cart)
        })
    }
    return (

        <div className={styles.card} >
            <Link to={`/produtos/${id}`}>
                <h4 className={styles.title}>{title}</h4>
            </Link>

            <img src={banner.startsWith('http') ? banner : import.meta.env.VITE_API_URL + banner} alt={'Carregando imagem...'} />
            <span>{description}</span>
            <span className="price">
                R$ {price}
            </span>
            <span className={styles.date}>{moment(created_at).format('DD/MM/Y')}</span>
            {buy ? <div className={styles.buttons}>
                <Link to={`/produtos/${id}`}>
                    <button   >  <FaEye /> Ver</button>
                </Link>

                <button onClick={handleAddToCart}> <FaCartPlus /> Adicionar ao carrinho </button>

            </div>

                : <></>}

            {/* <span>{['Aguardando aprovação', 'Aprovado', 'Vendido', 'Reprovado'][status]}</span> */}

            {
                user ?
                    <span className={styles.user}>
                        <span style={{ opacity: .8, marginRight: '4px', fontSize: 'small' }}>Por:</span>
                        <Link to={`/usuarios/${user_id}`} className={styles.link}>
                            {user}
                        </Link>
                        <span className={user_online == 1 ? styles.online : styles.offline}>

                            {/* {[<span>Offline</span >, <span>Online</span >][user_online]} */}

                        </span>
                    </span>
                    : <></>

            }
        </div>

    );
}

export default ProductCard;
