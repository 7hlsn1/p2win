import './MinhaConta.scss';
// import styles from './MinhaConta.scss'
import styles from '../Produtos/Produto.module.scss'
import { FaCheckCircle, FaHeart, FaUserPlus, FaBan, FaFlag, FaStar, FaTimes } from 'react-icons/fa';
import { Api, TLoader } from '../../skds/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from '../../skds/api';
import moment from 'moment';

import ProductCard from '../../components/ProductCard';

export default function Usuario() {

  const api = new Api('closed')
  const [userProfile, setUserProfile] = useState<Profile | any>({})
  const [following, setFollowing] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<any>([])
  const [activeTab, setActiveTab] = useState('products')
  const [user, setUser] = useState<any>([])
  const params = useParams<string | any>();
  const userId = params.id
  console.log(userId)
  let id
  if (userId) {
    id = parseInt(userId)
  } else {
    id = 0
  }
  useEffect(() => {
    TLoader.tLoader(1)
    api.getLoggedUser().then(data => {
      setUser(data)
    })
    api.getProfile(id).then((data: any) => {
      setUserProfile(data)
      console.log('data')
      console.log(data)
      setFollowing(data.following)
      setProducts(data.products)
      setBlocked(data.blocked)

      data.products.map((product: any) => {

        if (!categories.includes({
          id: product.category_id,
          name: product.category
        })) {
          setCategories([...categories, {
            id: product.category_id,
            name: product.category
          }])
        }
      })


      TLoader.tLoader(0)

    })
  }, [])
  const handleSearch = (e: any) => {
    setSearch(e.currentTarget.value)
    api.getProducts(search, parseInt(userProfile.id)).then((data: any) => {
      setProducts(data)
    })
  }
  const handleFollow = () => {
    TLoader.tLoader(1)
    api.followUser(userProfile.id).then((data: any) => {
      setFollowing(data.following)
      TLoader.tLoader(0)
    })
  }

  const handleBlock = () => {
    TLoader.tLoader(1)
    api.blockUser(userProfile.id).then((data: any) => {
      setBlocked(data.blocked)
      TLoader.tLoader(0)
    })
  }


  return (
    <div className="minha-conta" >
      <div className="header" style={{ display: userProfile.username ? 'flex' : 'none' }}>
        <div className="avatar-wrapper" style={{ backgroundImage: `url("${userProfile.avatar ?? 'https://cdn-icons-png.flaticon.com/512/147/147142.png'}")` }}>
          {userProfile?.online ? <span className="status">
            <FaCheckCircle /> Conectado
          </span> : <span className="status" style={{ backgroundColor: '#ff4f4f' }}>
            <FaTimes /> Desconectado
          </span>}


        </div>

        <div className="profile-info">
          <h2 className="username">{userProfile.username}</h2>
          {
            !userProfile.self && user ? (
              <div className="actions">
                <button><FaHeart /> Favorito</button>
                <button onClick={handleFollow}><FaUserPlus /> {following ? 'Deixar de seguir' : 'Seguir'}</button>
                <button onClick={handleBlock} className="danger"><FaBan /> {blocked ? 'Desbloquear' : 'Bloquear'}</button>
                <button className="danger"><FaFlag /> Reportar</button>
              </div>) : <></>
          }
          <p className="member-since">MEMBRO DESDE {moment(userProfile.created_at).format('MM/Y')}</p>
          <p className="bio">
            {userProfile.bio}

          </p>
        </div>
      </div>



      <div className="tabs">
        <button onClick={() => { setActiveTab('products') }} className="active">ANÚNCIOS</button>
        <button onClick={() => { setActiveTab('rates') }}>AVALIAÇÕES</button>
        {/* <button>GALERIA</button> */}
      </div>

      <div className="filters">
        <input type="text" placeholder="Pesquisar" value={search} onChange={handleSearch} />
        {/* <select>
          <option>Categoria</option>
          {
            categories.map((cat: any) => {
              return <option value={cat.id}>{cat.name}</option>
            })
          }
        </select>
        <select><option>À Venda</option></select> */}
      </div>

      {
        activeTab == 'products' ? (
          <div className='products'>

            {products?.map((product_: any) => {
              return (
                <ProductCard product={product_} buy={true} key={product_.id}/>
              )
            })}
          </div>)
          : <div className={styles.rates}>

            {
              userProfile.avaliations?.map((rate: any) => (
                <div className={styles.rate}>

                  <span>
                    <div className={styles.avatar} style={{ backgroundImage: 'url("https://static.vecteezy.com/ti/vetor-gratis/p1/11483813-avatar-de-anime-de-cara-gratis-vetor.jpg")' }}>

                    </div>
                    <span className={styles.user}>{rate.user}</span><br />
                    <span><span style={{ opacity: 0.5, fontSize: 'small' }}>Produto:</span>
                      <br />
                      <span style={{ fontSize: 'small' }}>{rate.product}</span></span>
                    <span className={styles.avaliation}>{
                      [...Array(rate.avaliation)].map(() => (
                        <FaStar color='yellow' />
                      ))
                    }</span>
                  </span>

                  <span className={styles.content}>
                    {rate.content}
                  </span>
                  <span className={styles.date}>{moment(rate.created_at).format('ddd, D MMMM, Y')}</span>
                </div>
              ))
            }

          </div>


      }

    </div>
  );

}
