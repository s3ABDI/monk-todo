import { ChangeEvent, useEffect, useState } from "react"
import styles from "./Form.module.scss"
import useTodos from "../../dataStore/useTodos"
import { useGetTime } from "../../shared/getDate/useGetTime"
import { useGetDate } from "../../shared/getDate/useGetDate"
import { AddCircle, CloseSquare } from "iconsax-react"
import { Popover } from "antd"
import SelectPriorety from "./ui/selecter/SelectPriorety"

export interface ITodo {
    text: string,
    checked: boolean,
    time: string,
    date: string,
    num: number,
    priorety: string
}

const Form = () => {
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [todoValue, setTodoValue] = useState<string>("")
    const [priorety, setPriorety] = useState<string>("Low/green")
    const [isOpenPriorety, setIsOpenPriorety] = useState<boolean>(false)

    const { getting, todos } = useTodos()
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 50) {
            setTodoValue(e.target.value)
        }
    }
    const time = useGetTime()
    const date = useGetDate()
    const onSub = () => {
        const prev = localStorage.getItem("todos")
        const one = { text: todoValue, checked: false, time: time, date: date, num: todos?.length, priorety: priorety }
        const newTodo = prev ? [...JSON.parse(prev), one] : [one]
        const finding = todos?.find((el) => el.text === todoValue)
        if (finding) return
        if (todoValue.length > 7) {
            localStorage.setItem("todos", JSON.stringify(newTodo))
            getting()
            setPriorety("Low/green")
            setTodoValue("")
        }
    }

    const clear = () => {
        localStorage.setItem("todos", "[]")
        getting()
    }

    useEffect(() => {
        if (!todoValue) {
            setIsFocus(false)
        } else {
            setIsFocus(true)
        }
    }, [todoValue])
    const setPrioretyFunc = (e: {text: string, color: string}) => {
        setPriorety(`${e.text}/${e.color}`)
        setIsOpenPriorety(false)
    }
    return (
        <div className={styles.Form}>
            <div className={styles.Clear}>
                <CloseSquare color="white" size={30} onClick={clear} />
            </div>
            <div className={styles.InputCont}>
                <label htmlFor="todoInput" className={isFocus ? styles.Focused : styles.UnFocused}>New todo</label>
                <input id="todoInput" type="text" value={todoValue} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSub()
                    }
                }} onChange={onChange} onFocus={() => setIsFocus(true)} onBlur={() => todoValue.length ? null : setIsFocus(false)} />
                <label htmlFor="todoInput" className={isFocus ? styles.FocusedCount : styles.UnFocusedCount}>{todoValue.length}/50</label>
            </div>
            <Popover
                trigger="click"
                placement="bottom"
                open={isOpenPriorety}
                onOpenChange={setIsOpenPriorety}        
                content={
                    <SelectPriorety setPriorety={setPrioretyFunc}/>
                }
            >
                <div className={styles.Priorety}>
                    <p style={{color: priorety.split("/")[1]}}>{priorety.split("/")[0]}</p>
                </div>
            </Popover>
            <div className={styles.BtnSub} onClick={onSub}>
                <AddCircle cursor="pointer" color="grey" size={40} />
            </div>
        </div>
    )
}

export default Form