import styles from './VerificationStatus.module.scss';

export const VerificationStatus = () => {
    return (
        <div className={styles.statusContainer}>
            <div className={styles.todos}>
                <p className={styles.title}>Tudo validado! <span className={styles.percent}>✔ 100%</span></p>
                <p><strong>Parabéns!</strong> Seu perfil público e todos os seus anúncios terão os selos de usuário verificado pela P2Win!</p>
                <button>Ver Verificações</button>
            </div>
        </div>
    );
};
