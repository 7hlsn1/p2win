import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import moment from 'moment';
import { FaCartPlus, FaEye } from 'react-icons/fa6';
import { Api, TLoader } from '../../skds/api';
import Swal from 'sweetalert2';
const api = new Api('open')
function ProductCard(props: any) {

    const { id, title, banner, description, price, created_at, user, user_id, user_online = 0, category, category_id } = props.product
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
        TLoader.tLoader(1, 'Adicionando produto...')
        api.addToCart(id).then(() => {
            TLoader.tLoader(0)
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
        })
    }
    return (

        <div className={styles.card} >
            <Link style={{ position: 'absolute', top: 10, left: 10 }} to={`/produtos?category_id=${category_id}`}>
                {category}

            </Link>
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
