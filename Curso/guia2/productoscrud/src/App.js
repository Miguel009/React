  
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl="http://localhost:8080/apiPhpEscuela/";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [alumnoSeleccionado, setalumnoSeleccionado]=useState({
    id: '',
    nombre: '',
    existencias: '',
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setalumnoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(alumnoSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl, {params: {METHOD: "GET1"}})
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    var f = new FormData();
    f.append("nombre", alumnoSeleccionado.nombre);
    f.append("existencias", alumnoSeleccionado.existencias);
    f.append("METHOD", "POST1");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      console.log(response.data);
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("nombre", alumnoSeleccionado.nombre);
    f.append("existencias", alumnoSeleccionado.existencias);
    f.append("METHOD", "PUT1");
    await axios.post(baseUrl, f, {params: {id: alumnoSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(alumno=>{
        if(alumno.id===alumnoSeleccionado.id){
          alumno.nombre=alumnoSeleccionado.nombre;
          alumno.existencias=alumnoSeleccionado.existencias;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE1");
    await axios.post(baseUrl, f, {params: {id: alumnoSeleccionado.id}})
    .then(response=>{
      setData(data.filter(alumno=>alumno.id!==alumnoSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarAlumno=(alumno, caso)=>{
    setalumnoSeleccionado(alumno);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div style={{textAlign: 'center'}}>
<br />
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Existencias</th>
        </tr>
      </thead>
      <tbody>
        {data.map(alumno=>(
          <tr key={alumno.id}>
            <td>{alumno.id}</td>
            <td>{alumno.nombre}</td>
            <td>{alumno.existencias}</td>
          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarAlumno(alumno, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarAlumno(alumno, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar alumno</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
          <br />
          <label>Existencias: </label>
          <br />
          <input type="text" className="form-control" name="existencias" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar alumno</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.nombre}/>
          <br />
          <label>Existencias: </label>
          <br />
          <input type="text" className="form-control" name="existencias" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.existencias}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el alumno {alumnoSeleccionado && alumnoSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;