import { AccountSummary } from "../../../components/AccountSummary";
import { VerificationStatus } from "../../../components/VerificationStatus";
import { SalesSummary } from "../../../components/SalesSummary";
import PerfilGerente from "../../../components/PerfilGerente";

const Resumo = () => (
    <>
        <AccountSummary />
            <PerfilGerente
                nome="Gerente"
                imagemUrl="/caminho/para/imagem.jpg"
                onVerPerfil={() => console.log("Ver perfil clicado")}
            />
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <VerificationStatus />
            <SalesSummary />
        </div>
    </>
);

export default Resumo;
