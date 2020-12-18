import React, { useEffect, useState } from "react";
import EmpleadoForm from "./EmpleadoForm";

import { db } from "../Firebase";
import { toast } from "react-toastify";

const Empleado = () => {
  const [Empleado, setEmpleados] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getEmpleados = async () => {
    db.collection("Empleado").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setEmpleados(docs);
    });
  };

  const onDeleteEmpleado = async (id) => {
    if (window.confirm("are you sure you want to delete this Empleado?")) {
      await db.collection("Empleado").doc(id).delete();
      toast("Se elimino un Empleado", {
        type: "error",
        //autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  const addOrEditEmpleado = async (EmpleadoObject) => {
    try {
      if (currentId === "") {
        await db.collection("Empleado").doc().set(EmpleadoObject);
        toast("Se agrego un Empleado", {
          type: "success",
        });
      } else {
        await db.collection("Empleado").doc(currentId).update(EmpleadoObject);
        toast("Se actualizo un Empleado", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>    
      <div className="col-md-8 p-2">
        <div class="container">
          <h2>Lista Empleados</h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Aciones</th>
              </tr>
            </thead>
            <tbody>
              {Empleado.map((empleado) => (
                <tr key={empleado.id}>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.cargo}</td>
                  <td>
                    <button className="btn btn-info buton" onClick={() => setCurrentId(empleado.id)}>Editar</button>
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-danger buton" onClick={() => onDeleteEmpleado(empleado.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-md-4 p-2">
      <h2>Agregar Empleados</h2>
        <EmpleadoForm {...{ addOrEditEmpleado, currentId, Empleado }} />
      </div>
    </>
  );
};
export default Empleado;