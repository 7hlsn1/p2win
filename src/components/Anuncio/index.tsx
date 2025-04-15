import styles from './Anuncio.module.scss'
import { useState } from 'react';

const Anuncio: React.FC = () => {
  const [banner, setBanner] = useState('');

  const handleSetBanner = (e: any) => {
     
    setBanner(URL.createObjectURL(e.target.files[0]))
  }
  return (
    <div className={styles.container}>
      <h1>Anúncio</h1>

      <div className={styles.formGroup}>
        <label htmlFor="titulo">Escolha um título para o seu anúncio</label>
        <input
          type="text"
          id="titulo"
          maxLength={80}
          placeholder="Digite aqui (máx. 20 caracteres)"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="titulo">Escolha uma descrição para o seu anúncio</label>
        <input
          type="text"
          id="titulo"
          maxLength={80}
          placeholder="Digite aqui (máx. 80 caracteres)"
        />
        <small>
          Exemplo: Conta LoL diamante full champs, 250 Tebe Coins, Curso de Inglês Avançado...
        </small>
      </div>
      <div className={styles.inlineInputs}>
        <div className={styles.formGroup}>
          <label htmlFor="valor">Valor do anúncio</label>
          <input type="number" step="0.1" id="valor" placeholder="R$ 0,00" />
        </div>
      </div>

      <div className={styles.inlineInputs}>
        <div className={styles.formGroup}>
          <label htmlFor="valor">Selecione um banner</label>
          <input type="file" id="banner" onChange={handleSetBanner} placeholder="R$ 0,00" />
        </div>
      </div>
      {banner != '' ? (
        <div className={styles.inlineInputs}>
          <div className={styles.formGroup}>
            <img src={banner} alt="" style={{width: '100%'}}/>
          </div>
        </div>
      ) : <>
      </>}
      <div className={styles.btnContainer}>
        <a href="#" className={styles.botaoCriar}>Criar anúncio</a>
      </div>
    </div>
  );
};

export default Anuncio;
