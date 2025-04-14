import React, { useState } from 'react';
import './Recarga.scss';

export default function Recargas() {
  const [tipoBeneficiario, setTipoBeneficiario] = useState('Pessoa Física');

  return (
    <div className="recarga-container">
      <h2>Preencha</h2>

      <form className="recarga-form">
        <div className="form-group">
          <label>Valor da retirada <span>*</span></label>
          <input type="text" placeholder="R$ 0,00" />
        </div>

        <div className="form-group">
          <label>Tipo <span>*</span></label>
          <select>
            <option>Pix</option>
            <option>TED</option>
          </select>
        </div>

        <div className="form-group">
          <label>Conta Pix <span>*</span></label>
          <select>
            <option>Usar chave/dados da conta já utilizados antes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Para qual chave ou conta? <span>*</span></label>
          <select>
            <option>Chave: 171.675.837-82 | Marcello Lenziardi de Barros | Pessoa Física</option>
          </select>
          <small>Formato: "Dados | Favorecido | Tipo de pessoa"</small>
        </div>

        <div className="form-group">
          <label>Tipo de Beneficiário:</label>
          <div className="radio-group">
            <button
              type="button"
              className={tipoBeneficiario === 'Pessoa Física' ? 'active' : ''}
              onClick={() => setTipoBeneficiario('Pessoa Física')}
            >
              Pessoa Física
            </button>
            <button
              type="button"
              className={tipoBeneficiario === 'Pessoa Jurídica' ? 'active' : ''}
              onClick={() => setTipoBeneficiario('Pessoa Jurídica')}
            >
              Pessoa Jurídica
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>CPF do Titular da conta <span>*</span></label>
          <input type="text" placeholder="171.675.837-82" />
        </div>

        <div className="form-group">
          <label>Tipo de saque:</label>
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
