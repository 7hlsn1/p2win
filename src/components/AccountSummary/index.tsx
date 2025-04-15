import styles from './AccountSummary.module.scss';

export const AccountSummary = (props: any) => {
    return (
        <div className={styles.summaryContainer}>
            {/* <div className={styles.card}>GG Point(s): <strong>0</strong></div> */}
            <div className={styles.card}>Saldo a liberar: <strong>R${props.wallet}</strong></div>
            <div className={`${styles.card} ${styles.available}`}>Saldo Disponível: <strong>R${props.pending_wallet}</strong> <button>Retirar</button></div>
        </div>
    );
};
