import React from 'react';
import "./PerfilGerente.scss"
 
interface PerfilGerenteProps {
  nome: string;
  saudacao?: string;
  imagemUrl: string;
  onVerPerfil: () => void;
}

const PerfilGerente: React.FC<PerfilGerenteProps> = ({
  nome,
  saudacao = 'Seja bem-vindo(a) à sua conta da GGMAX!',
  imagemUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
  onVerPerfil,
}) => {
  return (
    <div className="perfil-gerente">
      <div className="perfil-gerente__info">
        <div className="perfil-gerente__avatar-container">
          <img src={imagemUrl} alt="Foto do gerente" className="perfil-gerente__foto" />
        </div>
        <div className="perfil-gerente__texto">
          <h4>Olá, {nome}.</h4>
          <p>{saudacao}</p>
        </div>
      </div>
      <button className="perfil-gerente__botao" onClick={onVerPerfil}>
        Ver meu perfil
      </button>
    </div>
  );
};

export default PerfilGerente;