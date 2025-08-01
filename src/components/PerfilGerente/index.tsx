import React, { useState } from 'react';
import "./PerfilGerente.scss"
import styles from './../WalletModal/WalletModal.module.scss'
import { VerifyModal } from '../VerifyModal';
import moment from 'moment';
import { Api, TLoader } from '../../skds/api';
import Swal from 'sweetalert2';

const api = new Api('closed')
interface PerfilGerenteProps {
  profile: any;
}

const PerfilGerente: React.FC<PerfilGerenteProps> = (props: any) => {
  const profile = props.profile
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState<any>(null)
  const handleEditUser = () => {

  }
  const unused = { email, avatar, handleEditUser }
  console.log(unused)
  const handleChangeAvatar = (e: any) => {
    TLoader.tLoader(1)
    setAvatar(e.target.files[0])
    api.setAvatar(e.target.files[0]).then((data: any) => {
      Swal.fire({
        icon: 'success',
        text: data.message
      })
      profile.avatar = data.avatar
      TLoader.tLoader(0)
    }).catch((err: any) => {
      TLoader.tLoader(0)
      Swal.fire({
        icon: 'error',
        text: err
      })
    })

  }
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
            <label htmlFor='avatar' className='link'>Editar avatar</label>
            <input type="file" name="avatar" id="avatar" style={{ visibility: 'hidden' }} onChange={handleChangeAvatar} />
          </span>
        </div>
        <ul>
          <li><b>Email:</b> {profile.email}</li>
          <li><b>Entrou em:</b> {moment(profile.created_at).format('DD/MM/YYYY')}</li>
        </ul>



      </div >
      <div className='perfil-gerente' style={{ marginTop: '1em', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div className={styles.formGroup}>
          <label htmlFor="titulo">Seu Email</label>
          <input
            value={profile.email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="text"
            id="email"
            maxLength={80}
            placeholder="Digite aqui (máx. 20 caracteres)"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="titulo">Seu nome de usuário</label>
          <input
            value={profile.username}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="text"

            maxLength={80}
            placeholder="Digite aqui "
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="titulo">Seu nome (apenas leitura)</label>
          <input
            value={profile.name}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="text"
            readOnly
            maxLength={80}
            placeholder=""
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="titulo">Seu CPF (apenas leitura)</label>
          <input
            value={profile.cpf}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="text"
            readOnly
            maxLength={80}
            placeholder=""
          />
        </div>
        <button type="submit" className='success'>Salvar</button>
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