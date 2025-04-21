import { AccountSummary } from "../../../components/AccountSummary";
import { VerificationStatus } from "../../../components/VerificationStatus";
import { SalesSummary } from "../../../components/SalesSummary";
import { useState, useEffect } from "react";
import { Api, Profile, TLoader } from "../../../skds/api";
import PerfilGerente from "../../../components/PerfilGerente";
import './Resumo.scss'

const Resumo = () => {
    const api = new Api('closed')
    const [profile, setProfile] = useState<Profile | any>({})

    const userId: number = parseInt(localStorage.getItem('user_id') as string)

    if (!userId) {
        return document.location.href = '/login'
    }


    console.log(`using id  (${userId})`)

    useEffect(() => {
        TLoader.tLoader(1)
        api.getProfile(userId).then((data: any) => {
            setProfile(data)
            TLoader.tLoader(0)
        })

    }, [])

    return <>
        <AccountSummary wallet={profile.wallet} pending_wallet={profile.pending_wallet} />
        <PerfilGerente
            nome={profile.username}
            imagemUrl={profile.avatar}
            onVerPerfil={() => console.log("Ver perfil clicado")}
        />
        <div className="container-status">
            <VerificationStatus />
            <SalesSummary />
        </div>
    </>
};

export default Resumo;
