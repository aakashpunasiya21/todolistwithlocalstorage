import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import TodoForm from './TodoForm';
import { completeTodo, setUpdatingTodoIndex, deleteTodo, localstorage } from '../actions';

export default function TodoList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const todos = useSelector((state) => state.todos);

  const handleEdit = (todoId) => {
    const todoIndex = todos.records.findIndex((todo) => todo.id === todoId);
    dispatch(setUpdatingTodoIndex(todoIndex));
    history.push("/");

  }
  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
    history.push("/");
  }

  const handleComplete = (event, todoId) => {
    dispatch(completeTodo({ todoId, completed: event.target.checked }));
  }
  let initTodo;
  if (localStorage.getItem("todolist") === null) {
    initTodo = []
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todolist"))
    console.log(initTodo)
  }

  return (
    <div className="container">
      <h1 className="text-center">Show All</h1>
      <ul>
        {initTodo.map((todo) => (
          <ListGroup key={todo.id}>
            <ListGroup.Item>
              <ListGroup.Item>Title : {todo.todo.title} </ListGroup.Item>
              <ListGroup.Item>Description : {todo.todo.description} </ListGroup.Item><br />

              <div>
                <Button variant="danger" onClick={() => handleDelete(todo.id)}>Delete</Button>{"  "}
                <Button variant="warning" onClick={() => handleEdit(todo.id)}>Edit</Button>

                <label>
                  complete
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onClick={(event) => handleComplete(event, todo.id)}
                  />
                </label>
              </div>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </ul>
    </div>
  );
}