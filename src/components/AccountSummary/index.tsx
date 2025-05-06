import styles from './AccountSummary.module.scss';

export const AccountSummary = (props: any) => {
    console.log(props)
    return (
        <div className={styles.summaryContainer}>
            {/* <div className={styles.card}>GG Point(s): <strong>0</strong></div> */}
            <div className={styles.card}>Saldo a liberar: <strong>R${props.profile.pending_wallet}</strong></div>
            <div className={`${styles.card} ${styles.available}`}>Saldo Disponível: <strong>R${props.profile.wallet}</strong> <button>Retirar</button></div>
        </div>
    );
};
