import React, { useState } from 'react';
import styles from './LoginModal.module.scss';
// import SocialAuthButton from '../SocialAuthButton';
import swal from 'sweetalert';
import { Api } from '../../../skds/api';
const api = new Api('open')
interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'login' | 'register';
}

const LoginModal: React.FC<LoginModalProps> = ({
    isOpen,
    onClose,
    defaultTab = 'login'
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
    const [rememberMe, setRememberMe] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (activeTab === 'register' && password !== repeatPassword) {
            alert('As senhas não coincidem.');
            return;
        }
        api.login(email, password).then((data: any) => {
            if (data.token) {
                localStorage.setItem('token', data.token)
                document.location.href = '/'
            } else {
                console.log('auth error')
                swal({
                    title: data.error,
                    icon: 'warning'
                })
            }
        })
        console.log({ email, password, rememberMe });
        // Aqui vai a lógica de autenticação ou criação de conta
    };

    // const handleSocialLogin = (provider: 'google' | 'facebook') => {
    //     console.log(`Logging in with ${provider}`);
    //     // Integração com Firebase ou outra solução de autenticação
    // };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'login' ? styles.active : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Entrar
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'register' ? styles.active : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Criar conta
                    </button>
                </div>

                <h2 className={styles.title}>
                    {activeTab === 'login' ? 'Faça login na sua conta' : 'Crie sua conta gratuita'}
                </h2>

                {/* <div className={styles.socialButtons}>
                    <SocialAuthButton
                        provider="google"
                        actionType={activeTab}
                        onClick={() => handleSocialLogin('google')}
                    />
                    <SocialAuthButton
                        provider="facebook"
                        actionType={activeTab}
                        onClick={() => handleSocialLogin('facebook')}
                    />
                </div>

                <div className={styles.divider}>
                    <span>ou</span>
                </div> */}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {activeTab === 'register' && (
                        <div className={styles.formGroup}>
                            <label htmlFor="repeatPassword">Repetir senha</label>
                            <input
                                type="password"
                                id="repeatPassword"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {activeTab === 'login' && (
                        <div className={styles.options}>
                            <label className={styles.rememberMe}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                Lembrar de mim
                            </label>
                            <a href="#forgot-password" className={styles.forgotPassword}>
                                Esqueceu a senha?
                            </a>
                        </div>
                    )}

                    {activeTab === 'register' && (
                        <div className={styles.terms}>
                            Ao criar uma conta, você concorda com nossos{' '}
                            <a href="#terms">Termos de Serviço</a> e{' '}
                            <a href="#privacy">Política de Privacidade</a>.
                        </div>
                    )}

                    <button type="submit" className={styles.submitButton}>
                        {activeTab === 'login' ? 'Entrar' : 'Criar conta'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
