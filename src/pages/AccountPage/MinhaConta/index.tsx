import './MinhaConta.scss';
import { FaCheckCircle, FaEnvelope, FaHeart, FaUserPlus, FaBan, FaFlag } from 'react-icons/fa';
import { Api, TLoader } from '../../../skds/api'
import { useState, useEffect } from 'react';

export default function MinhaConta() {

  const api = new Api('closed')
  const [profile, setProfile] = useState<any>([])
  useEffect(() => {
    TLoader.tLoader(1, 'Carregando perfil...')
    api.getProfile().then((data: any) => {
       
      setProfile(data)
      TLoader.tLoader(0)
    })
  }, [])


  return (
    <div className="minha-conta">
      <div className="header">
        <div className="avatar-wrapper">
          <img src="https://i.imgur.com/6VBx3io.png" alt="Avatar" className="avatar" />
          <span className="status"><FaCheckCircle /> Conectado</span>
        </div>

        <div className="profile-info">
          <h2 className="username">{profile.username}</h2>
          <div className="actions">
            <button><FaEnvelope /> Contato</button>
            <button><FaHeart /> Favorito</button>
            <button><FaUserPlus /> Seguir</button>
            <button className="danger"><FaBan /> Bloquear</button>
            <button className="danger"><FaFlag /> Reportar</button>
          </div>
          <p className="member-since">MEMBRO DESDE JAN 2025</p>
          <p className="bio">
            {profile.bio}

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
