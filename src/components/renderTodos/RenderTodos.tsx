import styles from "./Todos.module.scss"
import TodoItem from "./ui/TodoItem"
import useTodos from "../../dataStore/useTodos"
import { useEffect } from "react"
import { ITodo } from "../form/Form"

const Todos = () => {
    const {getting, anActiveTodos, activeTodos} = useTodos()
    useEffect(() => {
        getting()
    }, [])
    return (
        <div className={styles.Todos}>
            {activeTodos ? activeTodos.map((el: ITodo, i) => {
                return (
                    <TodoItem text={el?.text} checked={el?.checked} i={i} el={el}/>
                )
            }) : null}
            {activeTodos?.length && anActiveTodos?.length ? <div className={styles.Liner}></div> : null}
            
            {anActiveTodos ? anActiveTodos.map((el: ITodo, i) => {
                return (
                    <TodoItem text={el?.text} checked={el?.checked} i={i} el={el}/>
                )
            }) : null}
        </div>
    )
}

export default Todos