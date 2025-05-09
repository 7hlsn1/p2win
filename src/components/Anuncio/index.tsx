import styles from './Anuncio.module.scss'
import { useEffect, useState } from 'react';
import { Api, TLoader } from '../../skds/api';
import Swal from 'sweetalert2';
import { IconButton } from '../Navbar/Sub-components/IconButton';
import { FaTrash } from 'react-icons/fa';
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
  const [images, setImages] = useState<any>([])
  const [type, setType] = useState<any>({
    id: 1,
    tax: 10,
    title: 'Pro',
    position: 'Inicial'
  })
  const [types, setTypes] = useState<any>([])


  const handleCreateProduct = () => {

    const newImages: any = []
    images.map((image: any) => {
      newImages.push(image.file)
    })

    TLoader.tLoader(1)

    api2.createProduct(parseInt(categoryId), 1, title, descricao, parseFloat(valor), bannerFile, newImages).then((data: any) => {
      console.log(data)
      TLoader.tLoader(0)
      if (data.error) {
        Swal.fire({
          icon: 'error',
          text: data.error
        })
      } else {
        Swal.fire({
          icon: 'success',
          text: data.message
        }).then(res => {
          console.log(res)
          document.location.href = '/'
        })
      }
    }).catch((err: any) => {
      console.log(err)
      TLoader.tLoader(0)
      Swal.fire({
        icon: 'warning',
        text: 'Erro inesperado, verifique o formato e tamanho dos arquivos. (Apenas imagens)'
      })
    })
  }
  const handleAddImage = (e: any) => {
    const file = e.target.files[0]
    const image = URL.createObjectURL(file)

    const newImages = [...images, {
      file, image
    }]

    setImages(newImages)
  }

  const handleDeleteImage = (e: any) => {
    console.log(e.currentTarget)
    const imageUrl = e.currentTarget.attributes['datatype'].value

    const newImages: any = []
    images.map((image: any) => {
      if (image.image != imageUrl) {

        const image_ = image.image
        const file_ = image.file

        newImages.push(
          { image: image_, file: file_ }
        )
      } else {
        console.log(`Deleting ${imageUrl}`)
      }
    })
    console.log(newImages)

    setImages(newImages)
  }

  useEffect(() => {
    TLoader.tLoader(1)
    api2.getTypes().then((types: any) => {
      setTypes(types)
      TLoader.tLoader(0)

    })
    TLoader.tLoader(1)
    api.getCategories('', 10000, true).then((data: any) => {
      setCategories(data)
      TLoader.tLoader(0)
    })
  }, [])
  const handleSetBanner = (e: any) => {
    setBannerFile(e.target.files[0])
    console.log(bannerFile)
    setBanner(URL.createObjectURL(e.target.files[0]))
  }
  const handleSetType = (e: any) => {
    console.log(e.target.value)
    setType(JSON.parse(e.target.value))
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
      {
        descricao ? (<div className={styles.inlineInputs}>
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
        ) : <></>
      }

      {categoryId ? (
        <>
          <div className={styles.inlineInputs}>
            <div className={styles.formGroup}>
              <label htmlFor="type">Tipo do anúncio</label>
              <select name="type" id="type" onChange={handleSetType}>
                {
                  types.map((t: any) => (
                    <option value={JSON.stringify(t)} key={t.id}>Anúncio {t.title}</option>
                  ))
                }
              </select>
              {
                type.id ?
                  <>
                    <br />
                    <br />
                    Taxa de {type.tax}%<br /><br />
                    Posição no rank {type.position}
                  </>
                  : null
              }
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
              {
                valor ? <>Valor final: R$ {(parseFloat(valor) + (parseFloat(valor) * (type.tax / 100))).toFixed(2)}</> : null
              }

            </div>
          </div>
        </>) : <></>}

      {
        valor ? (
          <>
            <div className={styles.inlineInputs}>
              <div className={styles.formGroup}>
                <label htmlFor="banner">Selecione um banner</label>
                <input type="file" id="banner" accept="image/*"
                  onChange={handleSetBanner} />
              </div>
            </div>
            {banner ? (
              <div className={styles.inlineInputs}>
                <div className={styles.formGroup}>
                  <img src={banner} alt="" style={{ width: '100%' }} />
                </div>
              </div>
            ) : <>
            </>}
            <div className={styles.inlineInputs}>
              <div className={styles.formGroup}>
                <label htmlFor="images">Selecione algumas imagens para o seu anúncio</label>
                <input type="file" id="images" accept="image/*"
                  onChange={handleAddImage} />
              </div>
            </div>

            {
              images ?
                <div className={styles.imageInputs}> {
                  images.map((image: any) => {

                    return (

                      <div className={styles.imageGroup} style={{ backgroundImage: `url("${image.image}")` }}>
                        <div className={styles.iconGroup} datatype={image.image} onClick={handleDeleteImage} >
                          <IconButton color={'black'} icon={FaTrash} />
                        </div>
                      </div>


                    )
                  })
                }
                </div>
                : <>Selecione as imagens para seu anúncio</>
            }
          </>
        ) : <></>
      }

      {banner ? (
        <div className={styles.btnContainer}>
          <a onClick={handleCreateProduct} className={styles.botaoCriar}>Criar anúncio</a>
        </div>
      ) : <></>}
    </div>
  );
};

export default Anuncio;
