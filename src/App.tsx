import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AccountPage from './pages/AccountPage';
import AnuncioPage from './pages/Anuncio';
import Resumo from './pages/AccountPage/Resumo';
import Transacoes from './pages/AccountPage/Transacoes';
import Anuncios from './pages/AccountPage/Anuncios';
import Compras from './pages/AccountPage/Compras';
import Vendas from './pages/AccountPage/Vendas';
import MinhasPerguntas from './pages/AccountPage/MinhasPerguntas';
import PerguntasRecebidas from './pages/AccountPage/PerguntasRecebidas';
import Retiradas from './pages/AccountPage/Retiradas';
import Recargas from './pages/AccountPage/Recargas';
import MinhaConta from './pages/AccountPage/MinhaConta';
import MeusDados from './pages/AccountPage/MeusDados';
import Verificacoes from './pages/AccountPage/Verificacoes';
import Seguranca from './pages/AccountPage/Seguranca';
import Notificacoes from './pages/AccountPage/Notificacoes';
import AdminUsuarios from './pages/AccountPage/Administracao/AdminUsuarios';
import AdminTransacoes from './pages/AccountPage/Administracao/AdminTransacoes';
import ScrollToTop from './components/ScrollToTop';
import Cart from './pages/Cart';

import { Container } from './components/Container';
import Navbar from './components/Navbar';
import LoginPage from './pages/login';
import { Api, TLoader } from './skds/api';
import { useEffect, useState } from 'react';
import Produtos from './pages/Anuncios';
import Produto from './pages/Produtos';
import Usuario from './pages/Usuario';
import AdminAnuncios from './pages/AccountPage/Administracao/AdminAnuncios';
import Categorias from './pages/Categorias';
import Footer from './components/Footer';
import { PrimeReactProvider } from 'primereact/api';
import AdminVerificacoes from './pages/AccountPage/Administracao/AdminVerificacoes';
import Order from './pages/Order';
import MailSuccess from './pages/MailSuccess';
import MailError from './pages/MailError';
import AdminPedidos from './pages/AccountPage/Administracao/AdminPedidos';
const api = new Api('closed')

function App() {
  const [logged_, setLogged] = useState(false)

  useEffect(() => {
    TLoader.tLoader(1, 'Carregando usuário...')
    api.getLoggedUser().then((data: any) => {
      console.log(data)

      if (data) {
        setLogged(data)
      }
      TLoader.tLoader(0)
    })
  }, [])
  return (
    <PrimeReactProvider>
      <Container>
        <Navbar profile={logged_} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anunciar" element={<AnuncioPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:id" element={<Produto />} />
          <Route path="/usuarios/:id" element={<Usuario />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/mail_success" element={<MailSuccess />} />
          <Route path="/mail_error" element={<MailError />} />

          <Route path="/minha-conta" element={<AccountPage />}>
            <Route index element={<Resumo />} />
            <Route path="pedidos" element={<Order />} />

            <Route path="pedidos/:id" element={<Order />} />
            <Route path="vendas" element={<Vendas />} />

            <Route path="transacoes" element={<Transacoes />} />
            <Route path="anuncios" element={<Anuncios />} />
            <Route path="compras" element={<Compras />} />

            <Route path="minhas-perguntas" element={<MinhasPerguntas />} />
            <Route path="perguntas-recebidas" element={<PerguntasRecebidas />} />
            <Route path="retiradas" element={<Retiradas />} />
            <Route path="recargas" element={<Recargas />} />
            <Route path="minha-conta" element={<MinhaConta />} />
            <Route path="meus-dados" element={<MeusDados />} />
            <Route path="verificacoes" element={<Verificacoes />} />
            <Route path="seguranca" element={<Seguranca />} />
            <Route path="notificacoes" element={<Notificacoes />} />

          </Route>
          <Route path="/admin" element={<AccountPage />}>
            <Route path='usuarios' element={<AdminUsuarios />} />
            <Route path='verificacao' element={<AdminVerificacoes />} />
            <Route path='anuncios' element={<AdminAnuncios />} />

            <Route path='transacoes' element={<AdminTransacoes />} />
            <Route path='pedidos' element={<AdminPedidos />} />


          </Route>
        </Routes>

      </Container>
      <Footer />
    </PrimeReactProvider>
  );
}


export default App;
