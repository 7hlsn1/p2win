import styles from './Home.module.scss';
import Banner from '../../components/Banner';

function Home() {
    return (
        <div className={styles.container}>
            <Banner />
        </div>
    );
}

export default Home;
