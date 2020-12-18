import React, {useState, useEffect, useRef} from 'react'

function Form(props) {
    /*aqui utilizamos un use effect el cual va enviar todo  los datos a nuestro input y le hemos colocado una condicional que si el form recibe un prop de  la variable edit
    entonces que coloque lo que es el value de esa edit sino pues que quede vacio*/
    const [input, setInput] = useState(props.edit? props.edit.value: '');

    /*aqui es solo para la referencia o el focus del input */
    const inputRef = useRef(null)

    /*aqui haces un montaje del input ref diciendo que queremos que sea el focus */
    useEffect(()=>{
        inputRef.current.focus();
    })

    /*aqui solo decimos que queremos el value que tenga el text */
    const handleChange = e =>{
        setInput(e.target.value);
    }
    /*aqui mandamos a llamar otra funcion la cual de otro lado de props que en este caso seria el onsubmit el cual va a enviar el valor con id y un text */
    const handleSubmit = e =>{
        e.preventDefault();
        props.onSubmit({
            id: Math.floor(Math.random()*1000),
            text: input
        })

        setInput("");
    }
    /*aqui es donde se ubica lo que es el form con todos los datos que se estan utilizando */
    return (
        <form className="todo-form" onSubmit={handleSubmit} >
            <input type="text" 
            placeholder="Agregar una tarea" 
            value={input} 
            name="text" 
            className={!props.edit? "todo-input": "todo-input edit" }
            onChange={handleChange}
            ref={inputRef}/>
            <button className={!props.edit? "todo-button": "todo-button edit" }>{!props.edit? 'Agregar':'Actualizar'}</button>
        </form>
    );
}

export default Form;