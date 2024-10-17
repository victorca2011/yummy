'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './navmenu.module.css';

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className={styles.header}>
            <div className={styles.linkContainer}>
                <div className={styles.navmenu}>
                    <Link href="/">Inicio</Link>
                    <Link href="/recipes-slider">Receitas</Link>
                    <Link href="/recipes">Populares</Link>
                    {/* Exibe o link apenas se o usuário estiver autenticado */}
                    {session && (
                        <Link href="/private">
                            Cadastrar Receita
                        </Link>
                    )}
                </div>

                <div>
                    {session ? (
                        <>
                            <span className={styles.welcomeMessage}>Bem-vindo, {session.user?.name}!</span>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className={`${styles.button} ${styles.signOutButton}`}
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className={`${styles.button} ${styles.signInButton}`}
                        >
                            Entrar
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
