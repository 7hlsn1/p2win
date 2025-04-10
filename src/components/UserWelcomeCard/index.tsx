import styles from './UserWelcomeCard.module.scss';

export const UserWelcomeCard = () => {
    return (
        <div className={styles.card}>
            <img src="https://via.placeholder.com/60" alt="User" />
            <div>
                <h3>Olá, Gerente.</h3>
                <p>Seja bem-vindo(a) à sua conta da GGMAX!</p>
            </div>
            <button>Ver meu perfil</button>
        </div>
    );
};
