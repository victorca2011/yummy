import styles from './footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3>Yuumy - Receitas Rápidas</h3>
                    <p>Receitas fáceis e rápidas para o seu dia a dia.</p>
                </div>
                <div className={styles.column}>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">Sobre</a></li>
                        <li><a href="/contact">Contato</a></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <p>&copy; 2024 Yummy. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
