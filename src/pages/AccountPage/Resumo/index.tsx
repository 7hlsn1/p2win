import { AccountSummary } from "../../../components/AccountSummary";
import { VerificationStatus } from "../../../components/VerificationStatus";
import { SalesSummary } from "../../../components/SalesSummary";
import PerfilGerente from "../../../components/PerfilGerente";
import './Resumo.scss'


const Resumo = () => (
    <>
        <AccountSummary />
            <PerfilGerente
                nome="Gerente"
                imagemUrl="/caminho/para/imagem.jpg"
                onVerPerfil={() => console.log("Ver perfil clicado")}
            />
        <div className="container-status">
            <VerificationStatus />
            <SalesSummary />
        </div>
    </>
);

export default Resumo;
