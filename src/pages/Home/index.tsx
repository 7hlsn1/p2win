import styles from './Home.module.scss';
import Banner from '../../components/Banner';
import { useEffect, useState } from 'react';
import { Api } from '../../skds/api';
const api = new Api()
function Home() {
    const [userProfile, setUserProfile] = useState<any>({})
    useEffect(() => {
        api.getLoggedUser().then(data => {
            setUserProfile(data)
        })
    }, [])
    return (
        <div className={styles.container}>
            <Banner userProfile={userProfile} />
        </div>
    );
}

export default Home;
