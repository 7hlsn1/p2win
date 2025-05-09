import React, { useState } from 'react';
import "./PerfilGerente.scss"
import { VerifyModal } from '../VerifyModal';
interface PerfilGerenteProps {
  profile: any;
}

const PerfilGerente: React.FC<PerfilGerenteProps> = (props: any) => {
  const profile = props.profile
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (profile.username ?
    <>
      {
        isModalOpen ?
          <VerifyModal onClose={() => {
            setIsModalOpen(false)
          }} /> : null
      }
      <div className="perfil-gerente">
        <div className="perfil-gerente__info">
          <div className="perfil-gerente__avatar-container">
            <img src={import.meta.env.VITE_API_URL + profile.avatar} alt=" " className="perfil-gerente__foto" />
          </div>
          <div className="perfil-gerente__texto">
            <h4>Olá, {profile.username}</h4>
            {/* <p>{saudacao}</p> */}
          </div>
        </div>
        {/* <button className="perfil-gerente__botao"  >
          Ver meu perfil
        </button> */}

      </div>
      {!profile.cpf ?
        <div className="perfil-gerente" style={{ margin: '1em auto' }}>
          <h3 style={{ color: 'red' }}>Conta pendente de verificação</h3>
          <button className='success' onClick={() => {
            setIsModalOpen(true)
          }}>Clique aqui para verificar</button>
        </div>
        : null}
    </> : null
  );
};

export default PerfilGerente;