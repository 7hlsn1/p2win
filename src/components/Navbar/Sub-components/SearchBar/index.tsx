import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.scss';

export function SearchBar() {
    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder="Moby"
                className={styles.search}
            />
            <FaSearch className={styles.searchIcon} />
        </div>
    );
}