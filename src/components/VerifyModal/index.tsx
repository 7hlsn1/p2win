
import Swal from "sweetalert2";
import { Api, TLoader } from "../../skds/api";
import Modal from "../Modal"
import styles from './VerifyModal.module.scss'

import { useEffect, useState } from "react"
import { cpf } from "cpf-cnpj-validator";
import { IMaskInput } from 'react-imask';
import moment from "moment";

const api = new Api('closed')
export const VerifyModal = ({ onClose }: any) => {



    const [name, setName] = useState<string>('')
    const [cpf_, setcpf_] = useState<string>('')
    const [birthDate, setBirthDate] = useState<string>('')
    const [file, setFile] = useState<any>()
    const [image, setImage] = useState('')
    const handleSubmit = () => {
        console.log(birthDate)
        const diff = moment().diff(moment(birthDate), 'years')

        if (diff < 18) {
            return Swal.fire({
                icon: 'warning',
                text: 'Você deve ter mais de 18 anos para se registrar'
            })
        }
        if (!cpf.isValid(cpf_)) {
            return Swal.fire({
                icon: 'warning',
                text: 'Por favor, preencha seu CPF corretamente'
            })
        }
        if (name.split(' ').length < 2) {
            return Swal.fire({
                icon: 'warning',
                text: 'Por favor, preencha seu nome completo'
            })
        }
        if (!image || !file) {
            return Swal.fire({
                icon: 'warning',
                text: 'Por favor, anexe seu documento de identidade'
            })
        }
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
                    <h3 style={{ marginBottom: '1em' }}>Verificar conta</h3>

                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nome completo</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e: any) => {
                                setName(e.target.value)
                            }}

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
                            value={cpf_}
                            onChange={(e: any) => {
                                setcpf_(e.target.value)
                            }}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="birthDate">Data de nascimento</label>
                        <input

                            type="date"
                            id="birthDate"
                            value={birthDate}
                            onChange={(e: any) => {
                                setBirthDate(e.target.value)
                            }}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="file">Documento de identificação</label>
                        <input type="file" name="" id="file" onChange={handleChangeFile} />
                    </div>
                    <div className={styles.formGroup}>
                        <img src={image} alt="" style={{ width: '100%' }} />
                    </div>
                </form>

                <div className="buttons">
                    <button className={styles.submitButton} onClick={handleSubmit}>
                        Enviar solicitação
                    </button>
                </div>
            </div>
        </Modal >
    )
}