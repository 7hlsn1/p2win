
// import Swal from "sweetalert2";

import moment from "moment"
import { Api, TLoader } from "../../skds/api"
import Modal from "../Modal"
import styles from './UserModal.module.scss'

import {
    useEffect,
    useState,
    //    useState
} from "react"

// import { IMaskInput } from 'react-imask';

const api = new Api('closed')
export const UserModal = ({ onClose, user }: any) => {

    const [banned, setBanned] = useState(false)
    const [cpf, setcpf] = useState<string>('')
    const [birthDate, setBirthDate] = useState<string>('')
    const [email, setEmail] = useState<any>('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')

    const unused = { cpf, birthDate, email, name, username, setBirthDate, setName, setEmail, setcpf }
    console.log(unused)
    // const handleSubmit = () => {
    //     console.log(birthDate)

    //     TLoader.tLoader(1)

    // }

    const handleBan = () => {
        TLoader.tLoader(1)
        api.toggleBan(user.id).then((data: any) => {
            setBanned(data.banned == 1)
            TLoader.tLoader(0)
        })
    }
    useEffect(() => {
        setBanned(user.status == 0)
    }, [])


    return (
        <Modal onClose={onClose}>

            <div className={styles.formWrapper}>
                <form className={styles.form}>
                    <h3 style={{ marginBottom: '1em' }}>Perfil do usuário</h3>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nome de usuário</label>
                        <input
                            type="text"
                            id="name"
                            value={user.username}
                            required
                            onChange={(e: any) => {
                                user.username = e.target.value
                                setUsername(e.target.value)
                            }}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            required
                            onChange={(e: any) => {
                                user.email = e.target.value
                                setEmail(e.target.value)
                            }}
                        />
                    </div>



                    <div className={styles.formGroup}>
                        <label htmlFor="birthDate">Data de nascimento<br /><b>{moment(user.birth_date).format('DD/MM/YYYY')}</b></label>

                    </div>

                    {user.cpf ?
                        <>
                            <div className={styles.formGroup}>
                                <label htmlFor="cpf_">CPF</label>
                                <input readOnly value={user.cpf} onChange={() => { }}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Nome</label>
                                <input readOnly value={user.name} onChange={() => { }}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="file">Documento de identificação</label>
                                <img src={import.meta.env.VITE_API_URL + user.document} alt="" />
                            </div>
                        </>

                        : null}
                    <div>
                        <input type="checkbox" style={{ marginRight: 10 }} name="" id="banned" onChange={handleBan} checked={banned} />
                        <label htmlFor="banned">Usuário banido</label>
                    </div>

                </form>
                {/* <div className="buttons">
                    <button className={styles.submitButton}>Salvar</button>
                </div> */}
            </div >
        </Modal >
    )
}