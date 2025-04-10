import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AccountPage from './pages/AccountPage';
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

import { Container } from './components/Container';
import Navbar from './components/Navbar';

function App() {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/minha-conta" element={<AccountPage />}>
          <Route index element={<Resumo />} />
          <Route path="transacoes" element={<Transacoes />} />
          <Route path="anuncios" element={<Anuncios />} />
          <Route path="compras" element={<Compras />} />
          <Route path="vendas" element={<Vendas />} />
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
      </Routes>
    </Container>
  );
}


export default App;
