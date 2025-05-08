
import Modal from "../Modal"
import styles from './VerifyModal.module.scss'
import Swal from "sweetalert2"
import { Api, } from "../../skds/api"
import { useEffect, useState } from "react"
import { useRef } from "react"
import { IMaskInput } from 'react-imask';

export const VerifyModal = ({ onClose }: any) => {



    const [name, setName] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [file, setFile] = useState<any>()
    const api = new Api('closed')
    const handleSubmit = () => {

    }
    const handleChangeFile = (e: any) => {
        setFile(e.target.files[0])
    }
    useEffect(() => {



    }, [])


    return (
        <Modal onClose={onClose}>

            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
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
                        <label htmlFor="cpf">CPF</label>
                        <IMaskInput
                            mask='000.000.000-00'
                            placeholder='000.000.000-00'
                            type="text"
                            id="cpf"
                            value={cpf}
                            onChange={(e: any) => {
                                setCpf(e.target.value)
                            }}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="file">Documento de identificação</label>
                        <input type="file" name="" id="file" onChange={handleChangeFile}/>
                    </div>
                    <div className={styles.formGroup}>
                        <img src="" alt="" />
                    </div>
                </form>

                <div className="buttons">
                    <button className={styles.submitButton}>
                        Confirmar
                    </button>
                </div>
            </div>
        </Modal >
    )
}