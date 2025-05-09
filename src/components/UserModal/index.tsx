
import Swal from "sweetalert2";
import { Api, TLoader } from "../../skds/api";
import Modal from "../Modal"
import styles from './UserModal.module.scss'

import { useEffect, useState } from "react"
import { cpf } from "cpf-cnpj-validator";
import { IMaskInput } from 'react-imask';
import moment from "moment";

const api = new Api('closed')
export const UserModal = ({ onClose, user }: any) => {

    const [cpf_, setcpf_] = useState<string>('')
    const [birthDate, setBirthDate] = useState<string>('')
    const [file, setFile] = useState<any>()
    const [image, setImage] = useState('')

    const handleSubmit = () => {
        console.log(birthDate)

        TLoader.tLoader(1)
        api.createVerify(name, cpf_, file, birthDate).then((data: any) => {
            TLoader.tLoader(0)
            if (data.error) {
                Swal.fire({
                    icon: 'warning',
                    text: data.error
                })
            } else if (data.message) {
                Swal.fire({
                    icon: 'success',
                    text: data.message
                }).then((res: any) => {
                    console.log(res)
                    document.location.reload()
                })
                onClose()
            }

        }).catch(() => {
            TLoader.tLoader(0)
            Swal.fire({
                icon: 'error',
                text: 'Erro inesperado'
            })

        })
    }

    const handleChangeFile = (e: any) => {
        const imageUrl = URL.createObjectURL(e.target.files[0])
        setFile(e.target.files[0])
        setImage(imageUrl)
    }

    useEffect(() => {



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
                        />
                    </div>


                    <div className={styles.formGroup}>
                        <label htmlFor="cpf_">CPF</label>
                        <IMaskInput
                            mask='000.000.000-00'
                            placeholder='000.000.000-00'
                            type="text"
                            id="cpf_"
                            value={user.cpf}
                            onChange={(e: any) => {
                                setcpf_(e.target.value)
                            }}
                            required
                            readOnly
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="birthDate">Data de nascimento: {user.birth_date}</label>

                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="file">Documento de identificação</label>
                        <img src={import.meta.env.VITE_API_URL + user.document} alt="" />
                    </div>
                    <div className={styles.formGroup}>
                        <img src={image} alt="" style={{ width: '100%' }} />
                    </div>
                </form>

                {/* <div className="buttons">
                    <button className={styles.submitButton} onClick={handleSubmit}>
                        Enviar solicitação
                    </button>
                </div> */}
            </div>
        </Modal >
    )
}