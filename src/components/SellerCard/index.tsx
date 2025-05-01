import { Link } from 'react-router-dom';
import styles from './SellerCard.module.scss';
import moment from 'moment';

function SellerCard(props: any) {

    const { avatar, username, online, created_at, id } = props.seller
    
    return (

        <div className={styles.card} >
            <Link to={`/usuarios/${id}`}>
                <span className={styles.userLine}>
                    {
                        avatar ?
                            <img src={avatar.startsWith('http') ? avatar : import.meta.env.VITE_API_URL + avatar} alt={'Carregando imagem...'} />
                            :
                            <img className={styles.avatar} src={'https://cdn-icons-png.flaticon.com/512/147/147142.png'} />
                    }


                    <span >{username}</span>
                    <span className={online == 1 ? styles.online : styles.offline}>


                    </span>
                </span>

            </Link>


            <span className={styles.date}>Entrou em: {moment(created_at).format('DD/MM/Y')}</span>



            <span className={styles.user}>



            </span>

        </div>

    );
}

export default SellerCard;
