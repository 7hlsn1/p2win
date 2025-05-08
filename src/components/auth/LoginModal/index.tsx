import React, { useState } from 'react';
import styles from './LoginModal.module.scss';
// import SocialAuthButton from '../SocialAuthButton';
import Swal from 'sweetalert2';
import { Api, TLoader } from '../../../skds/api';
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
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    // const [token, setToken] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'login' | 'register' | 'recover' | 'reset' | 'renew'>(defaultTab);

    if (!isOpen) return null;

    const handleForgotPassword = () => {

        if (!email) {
            return Swal.fire({
                icon: 'warning',
                text: 'Insira o email da conta que deseja recuperar'
            })
        }
        setActiveTab('recover')
        TLoader.tLoader(1)
        api.resetPassword(email).then((data: any) => {
            TLoader.tLoader(0)
            if (data.message) {
                Swal.fire({
                    icon: 'success',
                    text: data.message
                })
            } else if (data.error) {
                Swal.fire({
                    icon: 'error',
                    text: data.error
                })
            }
        })
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (activeTab == 'renew') {
            api.renewPassword(password, code).then((data: any) => {
                Swal.fire({
                    text: data.message
                }).then(() => {
                    setActiveTab('login')
                })
            })
        }
        if (activeTab == 'recover') {

            api.verifyPasswordToken(code).then((data: any) => {

                if (data.error) {

                    return Swal.fire({
                        icon: 'error',
                        text: data.error
                    })

                }
                if (data.message) {
                    setActiveTab('renew')
                    return Swal.fire({
                        icon: 'success',
                        text: data.message
                    })
                }
            })
        }

        if (activeTab === 'register' && password !== repeatPassword) {
            alert('As senhas não coincidem.');
            return;
        }
        if (activeTab == 'login') {
            TLoader.tLoader(1)
            api.login(email, password).then((data: any) => {
                TLoader.tLoader(0)
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('user_id', data.user_id);
                    document.location.href = '/'
                } else {
                    console.log('auth error')
                    Swal.fire({
                        text: data.error,
                        icon: 'warning',


                    })
                }
            })
        } else if (activeTab == 'register') {
            api.register(email, password, username).then((data: any) => {
                if (data.message) {
                    Swal.fire({
                        title: data.message,
                        icon: 'success'
                    })
                    setActiveTab('login')
                } else {
                    Swal.fire({
                        title: data.error,
                        icon: 'warning'
                    })
                }
            })
        }
        console.log({ email, password });
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
                    {activeTab === 'login' ? 'Faça login na sua conta' : activeTab == 'recover' || activeTab == 'renew' ? 'Recuperar senha' : 'Crie sua conta gratuita'}
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
                {
                    activeTab == 'reset' ?
                        <>

                        </> : <></>
                }
                <form className={styles.form} onSubmit={handleSubmit}>
                    {activeTab == 'register' || activeTab == 'login'
                        ?
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
                        :
                        <></>
                    }

                    {
                        activeTab == 'recover'
                            ?
                            <div className={styles.formGroup}>
                                <label htmlFor="code">Código de verificação</label>
                                <input
                                    type="text"
                                    id="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </div>
                            :
                            <></>

                    }

                    {
                        activeTab == 'renew'
                            ?
                            <div className={styles.formGroup}>
                                <label htmlFor="code">Nova senha</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            :
                            <></>

                    }

                    {
                        activeTab == 'register' ? <div className={styles.formGroup}>
                            <label htmlFor="username">Nome de usuário</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div> : <></>}
                    {
                        activeTab == 'register' || activeTab == 'login' || activeTab == 'reset' ?
                            < div className={styles.formGroup}>
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

                            </div> : <></>}


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
                            {/* <label className={styles.rememberMe}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                Lembrar de mim
                            </label> */}
                            <a onClick={handleForgotPassword} className={styles.forgotPassword}>
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
                        {activeTab === 'login' ? 'Entrar' : activeTab == 'recover' ? 'Verificar código' : activeTab == 'renew' ? 'Salvar senha' : 'Criar conta'}
                    </button>
                </form>
            </div >
        </div >
    );
};

export default LoginModal;
