import { FC } from 'react'
import Main from './components/main/Main'
import styles from "./App.module.scss"
export const App: FC = () => {
    return (
        <div className={styles.App}>
            <Main/>
        </div>
    )
}
