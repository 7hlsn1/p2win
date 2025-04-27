import React, { useEffect, useState } from "react";
import "./Anuncios.scss";
import { Api, Product } from "../../skds/api";
import { Link } from "react-router-dom";
import moment from "moment";
import ProductCard from "../../components/ProductCard";
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
    api.getProducts(params.get('search') ?? '', 0, parseInt(categoryId ? categoryId.toString() : '')).then((data: any) => {
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
        {anuncios.length > 0 ? anuncios.map((product: Product) => (
          <ProductCard
            image={product.banner}
            title={product.title}
            id={product.id}
            price={product.price}
            description={product.description}
            user={product.user}
            user_id={product.user_id}
          />



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
