import styles from './AccountVerifierCard.module.scss';

export const AccountVerifierCard = () => {
    return (
        <div className={styles.verifierCard}>
            <p><strong>Verificador de contas</strong> <span className={styles.new}>NOVO</span></p>
            <p>Uma segurança adicional exclusiva da P2Win, experimente!</p>
            <img src="https://via.placeholder.com/300x100" alt="Mascote" />
        </div>
    );
};
