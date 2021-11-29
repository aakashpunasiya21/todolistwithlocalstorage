import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { setTodo, addTodo, updateTodo, localstorage } from '../actions';

// const getLocalStorage = () =>{
//   let list = localStorage.getItem('todolist');
//   console.log(list)
//   if(list){
//     return JSON.parse(localStorage.getItem('todolist'));
//   }else{
//     return [];
//   }
// }
function TodoForm(props) {
  const history = useHistory();
  const { todo, updatingTodoIndex } = props.todos;

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    const updatedTodo = { ...todo, [name]: value };
    props.setTodo(updatedTodo);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!todo.title) return;
    if (!updatingTodoIndex && updatingTodoIndex !== 0) {
      props.addTodo({ ...todo, id: new Date().getTime() });
      const data = localStorage.getItem('todolist') || '[]'
      const newdataparse = JSON.parse(data)

      newdataparse.push({
        todo: todo,
        id: new Date().getTime()
      })

      console.log("data parse", newdataparse)
      localStorage.setItem('todolist', JSON.stringify(newdataparse))
    } else {
      props.updateTodo({ ...todo });
    }

  }
  const handleclick = () => {
    history.push("/todolist")

  }

  return (
    <div className="text-center">
      <h1>Todo List</h1>
      <hr />
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Add todo Title">
            <Form.Label>Todo Title</Form.Label>
            <Form.Control type="text" name="title" value={todo.title} onChange={handleChangeInput} placeholder="Add todo Title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Todo Description</Form.Label>
            <Form.Control as="textarea" name="description" value={todo.description} onChange={handleChangeInput} placeholder="Add todo Description" rows={3} />
          </Form.Group>
          <Button variant="success" type="submit">{updatingTodoIndex ? 'Update' : 'AddTodo'}</Button>{" "}
          <Button variant="success" onClick={handleclick}>Show All</Button>
        </Form>
      </div>

    </div>
  );
}

const mapState = (state) => ({
  todos: state.todos,
});

const mapDispatch = {
  setTodo,
  addTodo,
  updateTodo,
};

export default connect(mapState, mapDispatch)(TodoForm);