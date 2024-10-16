import '@/styles/global.css'

import Head from 'next/head'

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { createContext, useEffect, useState } from 'react';
config.autoAddCss = false; 

export const ThemeContext = createContext()

function App({ Component, pageProps }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') { return localStorage.getItem('theme') || 'light' }
    })

    useEffect(() => {
        localStorage.setItem('theme', theme)
        console.log("Saved: ", theme)
    }, [theme])

    return (
        <>
            <Head>
                <meta charSet='UTF-8' />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <title>Parcial 1</title>
            </Head>

            <ThemeContext.Provider value={{ theme, setTheme }}>
                <Component {...pageProps} />
            </ThemeContext.Provider>
        </>
    )
}

export default App