
import styles from './AccountSummary.module.scss';
import { WalletModal } from '../WalletModal';
import { useState } from 'react';
export const AccountSummary = (props: any) => {
    const [isOpen, setIsOpen] = useState(false)
    console.log(props)
    return (
        <>
            {
                isOpen
                    ?
                    <WalletModal onClose={() => {
                        setIsOpen(false)
                    }} />
                    :
                    null
            }

            < div className={styles.summaryContainer} >
                {/* <div className={styles.card}>GG Point(s): <strong>0</strong></div> */}
                < div className={styles.card} > Saldo a liberar: <strong>R${props.profile.pending_wallet}</strong></div >
                <div className={`${styles.card} ${styles.available}`}>Saldo Disponível: <strong>R${props.profile.wallet}</strong>
                    <button className='success' style={{color:'white', fontWeight:'bold'}} onClick={() => {
                        setIsOpen(true)
                    }}>Depositar / Sacar</button></div>
            </div >
        </>
    );
};
