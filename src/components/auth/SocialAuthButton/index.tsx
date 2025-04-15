import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import styles from './styles.module.scss';

type SocialAuthButtonProps = {
    provider: 'google' | 'facebook';
    actionType: 'login' | 'register';
    onClick: () => void;
};

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
    provider,
    actionType,
    onClick
}) => {
    const providers = {
        google: {
            icon: <FcGoogle size={20} />,
            text: actionType === 'login' ? 'Entrar com Google' : 'Cadastrar com Google',
            className: styles.googleButton
        },
        facebook: {
            icon: <FaFacebook size={20} color="#3b5998" />,
            text: actionType === 'login' ? 'Entrar com Facebook' : 'Cadastrar com Facebook',
            className: styles.facebookButton
        }
    };

    return (
        <button
            className={`${styles.socialButton} ${providers[provider].className}`}
            onClick={onClick}
        >
            <span className={styles.icon}>{providers[provider].icon}</span>
            {providers[provider].text}
        </button>
    );
};

export default SocialAuthButton;