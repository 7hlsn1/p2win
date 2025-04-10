import styles from './SalesSummary.module.scss';

export const SalesSummary = () => {
    return (
        <div className={styles.salesContainer}>
            <div className={styles.filters}>
                <button className={styles.active}>Hoje</button>
                <button>Ontem</button>
                <button>Esta semana</button>
                <button>Este mês</button>
            </div>
            <p><strong>R$13,90</strong> (2 vendas)</p>
        </div>
    );
};
