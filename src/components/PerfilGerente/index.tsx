import React from 'react';
import "./PerfilGerente.scss"

interface PerfilGerenteProps {
  profile: any;
}

const PerfilGerente: React.FC<PerfilGerenteProps> = (props: any) => {
  return (
    <div className="perfil-gerente">
      <div className="perfil-gerente__info">
        <div className="perfil-gerente__avatar-container">
          <img src={import.meta.env.VITE_API_URL + props.profile.avatar} alt=" " className="perfil-gerente__foto" />
        </div>
        <div className="perfil-gerente__texto">
          <h4>Olá, {props.profile.username}.</h4>
          {/* <p>{saudacao}</p> */}
        </div>
      </div>
      <button className="perfil-gerente__botao"  >
        Ver meu perfil
      </button>
    </div>
  );
};

export default PerfilGerente;