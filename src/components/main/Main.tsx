import Form from "../form/Form"
import Todos from "../renderTodos/RenderTodos"
import styles from "./Main.module.scss"

const Main = () => {
    return (
        <div className={styles.Main}>
            <Form/>
            <Todos/>
        </div>
    )
}

export default Main