import './Recarga.scss';

export default function Recargas() {

  return (
    <div className="recarga-container">
      <h2>Preencha</h2>

      <form className="recarga-form">
        <div className="form-group">
          <label>Valor da retirada <span>*</span></label>
          <input type="text" placeholder="R$ 0,00" />
        </div>

        <div className="form-group">
          <label>Para qual chave ou conta? <span>*</span></label>
          <select>
            <option>Chave: 171.675.837-82 | Marcello Lenziardi de Barros | Pessoa Física</option>
          </select>
          <small>Formato: "Dados | Favorecido | Tipo de pessoa"</small>
        </div>

        <div className="form-group">
          <label>CPF do Titular da conta <span>*</span></label>
          <input type="text" placeholder="171.675.837-82" />
        </div>

        <div className="form-group">
          <label>Sacar:</label>
          <div className="radio-group">
            <button className="active" type="button">
              Retirada Normal (Grátis) – Em até 2 dias úteis
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
