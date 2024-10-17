
import Home from '@/app/page'
import styles from './style.module.css'

export function Banner() {
    return (
        
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h1>Aprenda <span>receitas</span> maravilhosas e gostosas.
                            <br></br><span>bon appetit</span></h1>
                        <p>Aqui voce encontra diversos tipos de receitas para fazer aí mesmo da sua casa.</p>
                        <div className={styles.button}>
                            <a href="/recipes">
                                Confira
                            </a>
                        </div>
                    </div>
                    <img src="https://www.pngall.com/wp-content/uploads/12/Chef-PNG.png" alt="image-banner" />
                    
                </div>
            </div>
    )
}