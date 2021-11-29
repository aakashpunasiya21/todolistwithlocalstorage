import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';
function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={TodoForm} />
        <Route path="/todolist" component={TodoList} />
      </Router>
    </>
  );
}
export default App;
