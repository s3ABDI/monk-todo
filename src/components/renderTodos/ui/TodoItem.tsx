import styles from "./TodoItem.module.scss"
import useTodos from "../../../dataStore/useTodos"
import { ITodo } from "../../form/Form"

const TodoItem = (props: { text: string, checked: boolean, i: number, el: ITodo }) => {
    const { getting, todos } = useTodos()

    const onChangeCheck = () => {
        const fil = todos ? [...todos] : []
        fil.forEach((el, i) => {
            if (el.text === props.text) {
                fil[i].checked = !props.checked
            }
        })
        localStorage.setItem("todos", JSON.stringify(fil))
        getting()
    }
    return (
        <div className={props.checked ? styles.TodoItem : styles.TodoItemUn}>
            <p className={props.checked ? styles.checked : styles.unChecked}>{props.el.num ? props.el.num + 1 : 1}</p>
            <input type="checkbox" checked={props.checked} onChange={onChangeCheck} />
            <div className={styles.Content}>
                <p className={props.checked ? styles.checked : styles.unChecked}>{props.text}</p>
                <p className={props.checked ? styles.checked : styles.unChecked} style={{color: props.checked ? "gray" : props.el.priorety.split("/")[1]}}>{props.el.priorety.split("/")[0]}</p>
            </div>
            <p className={styles.time}>{props.el.time}</p>
        </div>
    )
}

export default TodoItem