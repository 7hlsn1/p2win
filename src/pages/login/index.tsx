import React, { useState } from 'react';
import LoginModal from '../../components/auth/LoginModal';
import styles from './styles.module.scss';

const LoginPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <div className={styles.loginPage}>
            <div className={styles.content}>
                <h1>Bem-vindo ao nosso marketplace</h1>
                <p>Faça login para acessar sua conta e começar a vender ou comprar produtos.</p>

                <LoginModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    defaultTab="login"
                />
            </div>
        </div>
    );
};

export default LoginPage;