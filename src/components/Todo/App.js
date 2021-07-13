import React from 'react';
import TodoItem from './TodoItem';
import useTodos from './useTodos';

// function saveData(todos){
//   window.localStorage.setItem('todos', JSON.stringify(todos));
// }

function App() {
  const {
    todos,
    // setTodos,
    value, 
    // setValue,
    handleClick,
    handleClear,
    handleDeleteTodo,
    handleTodoIsDone,
    handleChange
  } = useTodos();
  // const id = useRef(1);
  // const [todos, setTodos] = useState(()=>{
  //   let todoData = JSON.parse(window.localStorage.getItem('todos')) || "";
  //   if(todoData){
  //     id.current = todoData[0].id + 1;

  //   }else{
  //     todoData = [];
  //   }
  //   return todoData;
    
  // });
  // const [value, setValue] = useState('');
  // useEffect(()=>{
  //   saveData(todos);
  // }, [todos])

  // const handleClick = ()=>{
  //   setTodos([{
  //     id: id.current,
  //     content: value,
  //     isDone: false
  //   },...todos]);
  //   setValue('');
  //   id.current++;
  // }
  // const handleClear = ()=>{
  //   setTodos([]);
  //   id.current = 1;
  // }
  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // }
  // const handleDeleteTodo = (todoId) => {
  //   setTodos(todos.filter(todo => todoId !== todo.id))
  // }
  // const handleTodoIsDone = (id) =>{
  //   setTodos(todos.filter(todo => {
  //     if(id === todo.id){
  //       todo.isDone = !todo.isDone;
  //     }
  //     return todo
  //   }))
  // }
  return (
    <div className="App">
      <input type='text' placeholder='todo...' value={value} onChange={handleChange} />
      <button onClick={handleClick}>Add Todo</button>
      <button onClick={handleClear}>Clear Todos</button>
      {
        todos.map(todo=> <TodoItem key={todo.id} todo={todo} 
          handleDeleteTodo={handleDeleteTodo} handleTodoIsDone={handleTodoIsDone} />)
      }
    </div>
  );
}

export default App;