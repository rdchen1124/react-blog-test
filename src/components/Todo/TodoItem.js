import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
const TodoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid salmon;
  margin: 0 20px;
  & + & {
    margin-top: 10px
  }
`
const TodoContent = styled.div`
  color: deepskyblue;
  ${props => props.isDone && `
    color: lightgreen;
    text-decoration: line-through;
  `}
`
const TodoButtonWrapper = styled.div`
  display: flex;
`
const Button = styled.div`
  border: 1px solid skyblue;
  padding: 4px;
  color: antiquewhite;
  background-color: lightseagreen;
  font-size: 20px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
  & + & {
    margin-left: 8px;
  }
  &:hover {
    color: salmon;
  }
`
const RedButton = styled(Button)`
  color: red;
`
const TodoItem = ({className, todo, handleDeleteTodo, handleTodoIsDone})=>{
  return (
    <TodoWrapper className={className} data-todo-id={todo.id}>
        <TodoContent isDone={todo.isDone}>{todo.content}</TodoContent>
        <TodoButtonWrapper>
          <Button onClick={()=>{
            handleTodoIsDone(todo.id)
          }}>{todo.isDone ? '未完成':'已完成'}</Button>
          <RedButton onClick={()=>{
            handleDeleteTodo(todo.id)
          }}>delete</RedButton>
        </TodoButtonWrapper>
      </TodoWrapper>
  )
}

TodoItem.propTypes ={
  className: PropTypes.string,
  todo: PropTypes.shape({
    id: PropTypes.number,
    isDone: PropTypes.bool,
    content: PropTypes.string
  }),
  handleDeleteTodo: PropTypes.func,
  handleTodoIsDone: PropTypes.func
}

export default TodoItem;