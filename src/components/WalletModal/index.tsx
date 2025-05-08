 
import Modal from "../Modal"
import styles from './WalletModal.module.scss'
import Swal from "sweetalert2"
import { Api,   } from "../../skds/api"
import { useEffect, useState } from "react"
export const WalletModal = ({ onClose }: any) => {

    const [tab, setTab] = useState('deposit');
    const [user, setUser] = useState<any>({})
    const [amount, setAmount] = useState<number>(5.00)
    const api = new Api('closed')
    const handleSubmit = () => {
        if (tab == 'withdraw') {

        } else if (tab == 'deposit') {
            Api.func.createDeposit()
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Erro inesperado, entre em contato com o suporte'
            })
        }
    }
    useEffect(() => {
        api.getLoggedUser().then((user_: any) => {
            setUser(user_)
        })


    }, [])


    return (
        <Modal onClose={onClose}>
            <div className="tabs">
                <button onClick={() => {
                    setTab('deposit')
                }}> Depositar</button>
                <button onClick={() => {
                    if (user.cpf) {
                        setTab('withdraw')
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            text: 'Você deve verificar sua conta antes de realizar um saque'
                        })
                    }
                }}>Sacar</button>
            </div>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h3 style={{ marginBottom: '1em' }}>Realizar {tab == 'deposit' ? 'Depósito' : 'Saque'}</h3>

                    <div className={styles.formGroup}>
                        <label htmlFor="amount">Valor  {tab == 'withdraw' ? `(máximo R$ ${user.wallet})` : ''}</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e: any) => {
                                setAmount(e.target.value)
                            }}
                            placeholder="5.00"
                            required
                        />
                    </div>
                </form>

                {tab == 'deposit' ?
                    <>

                    </>
                    : tab == 'withdraw' ? <></> : null}
                <div className="buttons">
                    <button className={styles.submitButton}>
                        Confirmar
                    </button>
                </div>
            </div>
        </Modal >
    )
}