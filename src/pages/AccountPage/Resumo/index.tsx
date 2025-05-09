import { AccountSummary } from "../../../components/AccountSummary";

import { useState, useEffect } from "react";
import { Api, Profile, TLoader } from "../../../skds/api";
import PerfilGerente from "../../../components/PerfilGerente";
import './Resumo.scss'

const Resumo = () => {
    const api = new Api('closed')
    const [profile_, setProfile] = useState<Profile | any>({})



    useEffect(() => {
        TLoader.tLoader(1, 'Carregando perfil...')
        api.getLoggedUser().then((data: any) => {
            setProfile(data)

            TLoader.tLoader(0)
        })

    }, [])

    return profile_.username ?
        <>
            <AccountSummary profile={profile_} />
            <PerfilGerente
                profile={profile_}

            />


        </> : 'Carregando...'
};

export default Resumo;
