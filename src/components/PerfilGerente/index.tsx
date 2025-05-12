import React, { useState } from 'react';
import "./PerfilGerente.scss"
import styles from './../WalletModal/WalletModal.module.scss'
import { VerifyModal } from '../VerifyModal';
import moment from 'moment';

interface PerfilGerenteProps {
  profile: any;
}

const PerfilGerente: React.FC<PerfilGerenteProps> = (props: any) => {
  const profile = props.profile
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  return (profile.username ?
    <>
      {
        isModalOpen ?
          <VerifyModal onClose={() => {
            setIsModalOpen(false)
          }} /> : null
      }
      <div className="perfil-gerente">

        <div className="perfil-gerente__avatar-container">
          <img src={profile.avatar ? import.meta.env.VITE_API_URL + profile.avatar : 'https://cdn-icons-png.flaticon.com/512/147/147142.png'} alt=" " className="perfil-gerente__foto" />
          <span>
            <h4>{profile.username} </h4>
            <a href="#" className='link'>Editar avatar</a>
          </span>
        </div>
        <ul>
          <li><b>Email:</b> {profile.email}</li>
          <li><b>Entrou em:</b> {moment(profile.created_at).format('DD/MM/YYYY')}</li>
        </ul>



      </div >
      <div className='perfil-gerente'>
        <div className={styles.formGroup}>
          <label htmlFor="titulo">Seu Email</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="text"
            id="email"
            maxLength={80}
            placeholder="Digite aqui (máx. 20 caracteres)"
          />
        </div>
      </div>
      {!profile.cpf ?
        <div className="perfil-gerente" style={{ margin: '1em auto' }}>
          <h3 style={{ color: 'red' }}>Conta pendente de verificação</h3>
          <button className='success' onClick={() => {
            setIsModalOpen(true)
          }}>Clique aqui para verificar</button>
        </div>
        : null
      }
    </> : null
  );
};

export default PerfilGerente;