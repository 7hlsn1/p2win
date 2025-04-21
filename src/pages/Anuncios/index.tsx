import React, { useEffect, useState } from "react";
import "./Anuncios.scss";
import { Api, Product } from "../../skds/api";
import { Link } from "react-router-dom";
import moment from "moment";
moment.localeData('pt-br')
moment.locale('pt-br')
const api = new Api('closed')

// type Status = "Ativo" | "Em análise" | "Reprovado" | "Desativado" | "Suspenso";



const Produtos: React.FC = () => {

  const [anuncios, setAnuncios] = useState([]);
  const [category, setCategory] = useState('')
  console.log(window.location)
  const params = new URLSearchParams(window.location.search)
  let categoryId: string | null = params.get('category_id')


  useEffect(() => {
    console.log('here')
    api.getProducts(params.get('search') ?? '', '', parseInt(categoryId ? categoryId.toString() : '')).then((data: any) => {
      setCategory(data[0].category)
      setAnuncios(data)
    }).catch(err => {
      console.log('err:')
      console.log(err)
    }
    )
  }, [])



  return (

    <div className="aba-anuncios">
      <br />
      <h3>{category}</h3>
      <br />
      <div className="lista-anuncios">
        {anuncios.length > 0 ? anuncios.map((anuncio: Product) => (
          <div key={anuncio.id} className="card-anuncio">
            <div className="conteudo">
              <a href={`/produtos/${anuncio.id.toString()}`} className="titulo">
                {anuncio.title}
              </a>
              <div className="detalhes">
                <span>{anuncio.type_id}</span>

                <h4 style={{ color: 'lime' }}>
                  R$ {anuncio.price}
                </h4>
                <h5>
                  {anuncio.description}
                </h5>
                <img src={anuncio.banner} alt="" />
                <span style={{ fontSize: 10 }}>Publicado por</span> <span className="product-user"><Link to={`/usuarios/${anuncio.user_id}`}>{anuncio.user}</Link></span>
                <span>{moment(anuncio.created_at).format('ddd, D MMMM, Y - H:m')}</span>
              </div>
            </div>
            {/* <div className="acoes">
              <button className="desativar">Desativar</button>
              <button className="editar">Editar</button>
            </div> */}
          </div>
        )) :
          (
            <div>
              <h3>{category}</h3>

              <h3>Nenhum resultado encontrado para essa categoria :\</h3>
              <Link to="/">
                <br />
                <button>Voltar</button>

              </Link>

            </div>
          )}
      </div>
    </div>
  );
};

export default Produtos;
