  
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import Crud1 from "./componente/crud1"
import Crud2 from "./componente/crud2"
function App() {
  return (
    <div>
      <h1 class="text-center">Crud 1</h1>
      <Crud1/>
      <h1 class="text-center">Crud de Productos</h1>
      <Crud2/>
    </div>
  );
}

export default App;