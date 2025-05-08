import React, { useEffect, useState } from "react";
import styles from "./Categorias.module.scss";
import { Api, TLoader } from "../../skds/api";
import { Link } from "react-router-dom";
import moment from "moment";
import GameCard from "../../components/GameCard";
moment.localeData('pt-br')
moment.locale('pt-br')
const api = new Api('closed')

// type Status = "Ativo" | "Em análise" | "Reprovado" | "Desativado" | "Suspenso";



const Categorias: React.FC = () => {

  const [categories, setCategories] = useState([])
  console.log(window.location)
  const params = new URLSearchParams(window.location.search)



  useEffect(() => {
    console.log('here')
    TLoader.tLoader(1)
    api.getCategories(params.get('search') ?? '', 1000).then((data: any) => {
      setCategories(data)
      TLoader.tLoader(0)
    }).catch(err => {
      console.log('err:')
      console.log(err)
    }
    )
  }, [])



  return (
    <div>
      <Link to='/' style={{ color: 'rgb(0, 134, 200)', marginBottom: '1em', display:'block' }}>Voltar</Link>

      <h4>Categorias</h4>
      <div className={styles.cards}>
        {categories.length > 0 ? categories.map((category: any) => (
          <GameCard key={category.id} id={category.id} title={category.name} image={`${category.image}`} count={category.products} />

        )) :
          (
            <></>
          )}
      </div>
    </div>
  );
};

export default Categorias;
