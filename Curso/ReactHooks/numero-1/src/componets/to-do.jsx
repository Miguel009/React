import React, {useState} from 'react'
import TodoForm from './to-doForm'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'
function ToDo(props) {
    const [edit, setEdit] = useState({
        id: null, 
        value: ''
    })

    const submitUpdate = value =>{
        props.updateTodo(edit.id, value)
        setEdit({
            id: null, 
            value: ''
        })
    }
    /*aqui este codigo se revisa cuando el edit.id cambia de null */
    if(edit.id){
        return <TodoForm edit={edit} onSubmit={submitUpdate}></TodoForm>
    }
    /*aqui lo que hacemos es mapear para enviar los datos que tenemos pero ya como codigo html cabe recalcar que aqui despues del => se pueden colocar lo que son () para decir que estamos enviando
    algo o dejarlo vacio como en este caso pero ya si estuvieramos retornando algo a una variable como por ejemplo un objeto o ejemplo asi ahi si es necesario colocar {} */
  return props.todos.map((todo, index)=>
      <div className={todo.isComplete? 'todo-row complete' : 'todo-row'} key={index} onClick={()=>{ props.completeTodo(todo.id)}}>
          <div key={todo.id}>
            {todo.text}
          </div>
          <div className="icons">
            <RiCloseCircleLine  onClick={()=>{props.removeTodo(todo.id)}} className="delete-icon"/>
            <TiEdit onClick={()=>{ setEdit({id: todo.id, value:todo.text})}} className="delete-icon"/>
          </div>
      </div>
  )
}

export default ToDo;
