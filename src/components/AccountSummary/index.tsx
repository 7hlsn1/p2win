import styles from './AccountSummary.module.scss';

export const AccountSummary = () => {
    return (
        <div className={styles.summaryContainer}>
            <div className={styles.card}>GG Point(s): <strong>0</strong></div>
            <div className={styles.card}>Saldo a liberar: <strong>R$136,85</strong></div>
            <div className={`${styles.card} ${styles.available}`}>Saldo Disponível: <strong>R$122,91</strong> <button>Retirar</button></div>
        </div>
    );
};
