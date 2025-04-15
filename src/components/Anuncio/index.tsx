import styles from './Anuncio.module.scss'

const Anuncio: React.FC = () => {

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
          <input type="text" id="valor" placeholder="R$ 0,00" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantidade">Quantidade em estoque</label>
          <input type="number" id="quantidade" min={1} defaultValue={1} />
        </div>
      </div>

      <div className={styles.btnContainer}>
        <a href="#" className={styles.botaoCriar}>Criar anúncio</a>
      </div>
    </div>
  );
};

export default Anuncio;
