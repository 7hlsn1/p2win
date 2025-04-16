import styles from './Anuncio.module.scss'
import { useEffect, useState } from 'react';
import { Api } from '../../skds/api';
import Swal from 'sweetalert2';
const api = new Api('open')
const api2 = new Api('closed')
const Anuncio: React.FC = () => {
  const [banner, setBanner] = useState('');
  const [bannerFile, setBannerFile] = useState<File | any>();

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [valor, setValor] = useState('')

  const handleCreateProduct = () => {
    api2.createProduct(parseInt(categoryId), 1, title, descricao, parseFloat(valor), bannerFile).then((data: any) => {
      console.log(data)
      Swal.fire({
        text: data.message
      })
    })
  }

  useEffect(() => {
    api.getCategories().then((data: any) => {
      setCategories(data)
    })
  }, [])
  const handleSetBanner = (e: any) => {
    setBannerFile(e.target.files[0])
    console.log(bannerFile)
    setBanner(URL.createObjectURL(e.target.files[0]))
  }
  return (
    <div className={styles.container}>
      <h2>Criar novo anúncio</h2>

      <div className={styles.formGroup}>
        <label htmlFor="titulo">Escolha um título para o seu anúncio</label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          type="text"
          id="titulo"
          maxLength={80}
          placeholder="Digite aqui (máx. 20 caracteres)"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="descricao">Escolha uma descrição para o seu anúncio</label>
        <input
          onChange={(e) => {
            setDescricao(e.target.value)
          }}
          value={descricao}
          type="text"
          id="descricao"
          maxLength={80}
          placeholder="Digite aqui (máx. 80 caracteres)"
        />
        <small>
          Exemplo: Conta LoL diamante full champs, 250 Tebe Coins, Curso de Inglês Avançado...
        </small>
      </div>
      <div className={styles.inlineInputs}>
        <div className={styles.formGroup}>
          <label htmlFor="category_id">Escolha uma categoria para o seu anúncio</label>
          <select name="category_id" id="category_id" value={categoryId}
            onChange={(e) => {
              console.log('here')
              console.log(e.target.value)
              setCategoryId(e.target.value)
            }}
          >
            {
              categories.map((category: any) => {
                return (
                  <option key={category.id} value={category.id}>{category.name}</option>
                )
              })
            }
          </select>
        </div>
      </div>
      <div className={styles.inlineInputs}>
        <div className={styles.formGroup}>
          <label htmlFor="valor">Valor do anúncio</label>
          <input type="number" step="0.1" id="valor" placeholder="R$ 0,00"
            onChange={(e) => {
              setValor(e.target.value)
            }}
            value={valor}
          />
        </div>
      </div>

      <div className={styles.inlineInputs}>
        <div className={styles.formGroup}>
          <label htmlFor="valor">Selecione um banner</label>
          <input type="file" id="banner" onChange={handleSetBanner} />
        </div>
      </div>
      {banner != '' ? (
        <div className={styles.inlineInputs}>
          <div className={styles.formGroup}>
            <img src={banner} alt="" style={{ width: '100%' }} />
          </div>
        </div>
      ) : <>
      </>}
      <div className={styles.btnContainer}>
        <a onClick={handleCreateProduct} className={styles.botaoCriar}>Criar anúncio</a>
      </div>
    </div>
  );
};

export default Anuncio;
