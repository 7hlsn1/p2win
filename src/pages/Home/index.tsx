import styles from './Home.module.scss';
import Navbar from '../../components/Navbar';
import Banner from '../../components/Banner';

function Home() {
    return (
        <div className={styles.container}>
            <Navbar />
            <Banner />
        </div>
    );
}

export default Home;
