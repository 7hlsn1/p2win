import { AccountSummary } from "../../../components/AccountSummary";
import { VerificationStatus } from "../../../components/VerificationStatus";
import { SalesSummary } from "../../../components/SalesSummary";

const Resumo = () => (
    <>
        <AccountSummary />
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <VerificationStatus />
            <SalesSummary />
        </div>
    </>
);

export default Resumo;
