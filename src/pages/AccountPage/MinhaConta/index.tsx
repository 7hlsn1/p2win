import React from 'react';
import './MinhaConta.scss';
import { FaCheckCircle, FaEnvelope, FaHeart, FaUserPlus, FaBan, FaFlag } from 'react-icons/fa';

export default function MinhaConta() {
  return (
    <div className="minha-conta">
      <div className="header">
        <div className="avatar-wrapper">
          <img src="https://i.imgur.com/6VBx3io.png" alt="Avatar" className="avatar" />
          <span className="status"><FaCheckCircle /> Conectado</span>
        </div>

        <div className="profile-info">
          <h2 className="username">BLOXFINDS <span className="tag">BLOXFINDS</span></h2>
          <div className="actions">
            <button><FaEnvelope /> Contato</button>
            <button><FaHeart /> Favorito</button>
            <button><FaUserPlus /> Seguir</button>
            <button className="danger"><FaBan /> Bloquear</button>
            <button className="danger"><FaFlag /> Reportar</button>
          </div>
          <p className="member-since">MEMBRO DESDE JAN 2025</p>
          <p className="bio">
            Welcome to BloxFinds! I’m selling Roblox in-game items!<br />
            <span className="warning">⚠️ Please only buy when I'm online...</span>
            <a href="#">CARREGAR MAIS...</a>
          </p>
        </div>
      </div>

      <div className="feedback">
        <h3>AVALIAÇÕES DE FEEDBACK</h3>
        <div className="ratings-table">
          <div className="row header">
            <span>30 dias</span>
            <span>90 dias</span>
            <span>180 dias</span>
            <span>12 meses</span>
            <span>Total</span>
          </div>
          <div className="row">
            <span className="good">146</span>
            <span className="good">606</span>
            <span className="good">606</span>
            <span className="good">606</span>
            <span className="good">606</span>
          </div>
          <div className="row">
            <span className="neutral">2</span>
            <span className="neutral">5</span>
            <span className="neutral">5</span>
            <span className="neutral">5</span>
            <span className="neutral">5</span>
          </div>
          <div className="row">
            <span className="bad">4</span>
            <span className="bad">7</span>
            <span className="bad">7</span>
            <span className="bad">7</span>
            <span className="bad">7</span>
          </div>
          <div className="row bold">
            <span>152</span>
            <span>618</span>
            <span>618</span>
            <span>618</span>
            <span>618</span>
          </div>
          <div className="row bold">
            <span>207</span>
            <span>851</span>
            <span>851</span>
            <span>851</span>
            <span>851</span>
          </div>
        </div>
        <p className="positive">Classificação do vendedor (últimos 180 dias): <strong>99.2% Positivo</strong></p>
      </div>

      <div className="tabs">
        <button className="active">ANÚNCIOS</button>
        <button>AVALIAÇÕES</button>
        <button>GALERIA</button>
      </div>

      <div className="filters">
        <input type="text" placeholder="Pesquisar" />
        <select><option>Categoria</option></select>
        <select><option>À Venda</option></select>
      </div>
    </div>
  );
}
