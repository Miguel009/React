import './App.css';
import Todo from './componets/todoList';

function App() {
  /*aqui lo unico que mandamos es a mandar a llamar la lista que en este caso la eh llamado todo  */
  return (
    <div className="todo-app">
        <h1>Lista de Pendientes</h1>
        <Todo></Todo>
    </div>
  );
}

export default App;
