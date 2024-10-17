
import styles from './Button.module.css'; // Importe os estilos CSS

type ButtonProps = {
    text: string,
    link: string,
    children?: React.ReactNode,
}

const Button = ({ text, link, children }: ButtonProps) => {
    return (
        <div className={styles.button}>
            <a href={link}>
                {text}
                {children}
            </a>
        </div>
    );
};

export default Button;
