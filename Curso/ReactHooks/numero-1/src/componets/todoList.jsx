import React, {useState} from 'react'
import TodoForm from './to-doForm'
import ToDo from './to-do'

function ToDoList() {
  /*Aqui colocamos el array de nuestras tareas */
  const [toDos, setToDos] = useState([])
  
  /*aqui o usamos el metodo de añadir tareas teniendo una pequeña validacion la cual no va a permitir que si el dato esta en null o si tiene espacio entonces se mande */
  const addToDo = (toDo)=>{
    if(!toDo.text || /^\s*$/.test(toDo.text))
    {
        return;
    }

    const newToDos = [toDo, ...toDos]

    setToDos(newToDos);
  }
/*aqui hacemos lo que mencione anteriormente de que se completa la tarea y estamos usando map pero en este caso si es necesario que se envie o se retorne algo es decir los toDos */
  const completeTodo = (id)=>{
      let updateToDos = toDos.map(toDo=>{
          if(toDo.id === id)
          {
            toDo.isComplete = !toDo.isComplete
          }
          return toDo
      })
      setToDos(updateToDos);
  }
  /*aqui lo que estoy haciendo es que con el update todos lo que va a hacer es que va a buscar el id y luego de eso  revisa que si el id del item esta por ahi y si esta le coloca los nuevos values
  sino pues solo coloca los values que ya tenia */
  const updateTodo = (todoId, newvAL)=>{
    if(!newvAL.text || /^\s*$/.test(newvAL.text))
    {
        return;
    }
    setToDos(prev=>prev.map(item=>(item.id===todoId ? { text: newvAL.text, id: todoId}: item)));
  }
  /*aqui es parecido al update con la diferencia que aqui se hace un filter del arreglo y luego se filtra viendo los que no son iguales al id y luego esa variable se pasa como el setToDos */
  const removeTodo = (id)=>{
    const removerArr = toDos.filter(todo=>todo.id !==id)
    setToDos(removerArr);
  }
  /*AQUI EN EL RETURN mandamos a llamar al formulario como a la lista y les pasamos los parametros necesarios */
    return (
    <div >
        <h1>¿Que planes tienes ahora?</h1>
        <TodoForm onSubmit={addToDo}></TodoForm>
        <ToDo todos={toDos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}></ToDo>
    </div>
  );
}

export default ToDoList;
