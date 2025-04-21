import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.scss';
import { Api, Product } from '../../../../skds/api';
import moment from 'moment';
import { Link } from 'react-router-dom';

const api = new Api('open');

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Buscar produtos ao digitar
    useEffect(() => {
        if (searchTerm.length > 1) {
            api.getProducts(searchTerm).then((data: any) => {
                console.log("Produtos encontrados:", data);
                setResults(data);
                setShowDropdown(data.length > 0);
            });
        } else {
            setResults([]);
            setShowDropdown(false);
        }
    }, [searchTerm]);


    // Fechar dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.searchContainer} ref={searchRef}>
            <input
                type="text"
                placeholder="Buscar anúncio..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm && setShowDropdown(true)}
            />
            <FaSearch className={styles.searchIcon} />

            {showDropdown && results.length > 0 && (
                <div className={styles.dropdown}>
                    {results.map((item) => (
                        <Link to={`/produtos/${item.id}`}>
                            <div key={item.id} className={styles.dropdownItem}>

                                <div>
                                    <span className='title'>{item.title}</span>
                                    <span className='price'>R$ {item.price}</span>
                                </div>
                                <div className={styles.description}>
                                    {item.description}
                                </div>
                                <div>
                                    <span className={styles.created_at}>{moment(item.created_at).format('D/MM/Y')}</span>
                                    <span className={styles.user}>
                                        {item.user}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
