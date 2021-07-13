import { useState, useRef, useEffect } from "react";

function saveData(todos){
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

export default function useTodos(){
    const id = useRef(1);
    const [todos, setTodos] = useState(()=>{
      let todoData = JSON.parse(window.localStorage.getItem('todos')) || "";
      if(todoData){
        id.current = todoData[0].id + 1;
      }else{
        todoData = [];
      }
      return todoData;
    });
    const [value, setValue] = useState('');
    useEffect(()=>{
      saveData(todos);
    }, [todos]);
    const handleClick = ()=>{
      setTodos([{
        id: id.current,
        content: value,
        isDone: false
      },...todos]);
      setValue('');
      id.current++;
    }
    const handleClear = ()=>{
      setTodos([]);
      id.current = 1;
    }
    const handleChange = (e) => {
      setValue(e.target.value);
    }
    const handleDeleteTodo = (todoId) => {
      setTodos(todos.filter(todo => todoId !== todo.id))
    }
    const handleTodoIsDone = (id) =>{
      setTodos(todos.filter(todo => {
        if(id === todo.id){
          todo.isDone = !todo.isDone;
        }
        return todo
      }))
    }
    return {
      id,
      todos,
      value, 
      handleClick,
      handleClear,
      handleDeleteTodo,
      handleTodoIsDone,
      handleChange
    }
}