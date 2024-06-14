import create from 'zustand';
import { ITodo } from '../components/form/Form';

// Определение интерфейсов для состояния и действий
interface State {
    todos: ITodo[] | null;
    activeTodos: ITodo[] | null;
    anActiveTodos: ITodo[] | null;
}

interface Actions {
  setTodos: (data: (ITodo)[]) => void;
  getting: () => void
}

const useTodos = create<State & Actions>((set) => ({
  todos: null,
  activeTodos: null,
  anActiveTodos: null,
  setTodos: (data) => {
    set({todos: data})
  },
  getting: () => {
    const todos = localStorage.getItem("todos")
    if(todos){
        const parsed = JSON.parse(todos)
        const active = parsed.filter((el: {checked: boolean}) => {
            if(el.checked === false){
                return el
            }
        })
        const anActive = parsed.filter((el: {checked: boolean}) => {
            if(el.checked === true){
                return el
            }
        })
      set({activeTodos: active}) 
      set({anActiveTodos: anActive}) 
      set({todos: parsed})  
    }
  }
}));

export default useTodos;
