// Tarea - Version 1: solo DOM

const listaTareas = document.querySelector("#listaTareas");

const tarea1 = document.createElement("li");
tarea1.textContent = "Estudiar JavaScript";
listaTareas.appendChild(tarea1);

const tarea2 = document.createElement("li");
tarea2.textContent = "Realizar el laboratorio 8";
listaTareas.appendChild(tarea2);

// Tarea - Version 3: con clases y objetos

class Tarea {
  constructor(nombre, completada = false) {
    this.nombre = nombre;
    this.completada = completada;
  }

  alternar() {
    this.completada = !this.completada;
  }

  descripcion() {
    if (this.completada) {
      return "Completada";
    } else {
      return "Pendiente";
    }
  }
}

// Arreglo para guardar los objetos Tarea
const tareas = [];

// Tarea - Version 2: eventos y validacion
// Se conservan sus funciones, integradas con la clase Tarea.

const formTarea = document.querySelector("#formTarea");
const inputTarea = document.querySelector("#inputTarea");
const filtroTareas = document.querySelector("#filtroTareas");
const mensajeTarea = document.querySelector("#mensajeTarea");

// Preparar las tareas con sus botones y objetos
function prepararTarea(li) {
  const nombre = li.textContent.trim();

  const tarea = new Tarea(nombre);
  tareas.push(tarea);

  li.dataset.nombre = tarea.nombre.toLowerCase();

  const texto = document.createElement("span");
  texto.textContent = tarea.nombre + " ";

  const estado = document.createElement("span");
  estado.textContent = "(" + tarea.descripcion() + ") ";

  li.textContent = "";
  li.appendChild(texto);
  li.appendChild(estado);

  // Evento click: marcar y desmarcar
  const btnMarcar = document.createElement("button");
  btnMarcar.type = "button";
  btnMarcar.textContent = "Marcar";

  btnMarcar.addEventListener("click", () => {
    tarea.alternar();

    if (tarea.completada) {
      texto.style.textDecoration = "line-through";
      btnMarcar.textContent = "Desmarcar";
    } else {
      texto.style.textDecoration = "none";
      btnMarcar.textContent = "Marcar";
    }

    estado.textContent = "(" + tarea.descripcion() + ") ";
  });

  // Evento click: borrar
  const btnBorrar = document.createElement("button");
  btnBorrar.type = "button";
  btnBorrar.textContent = "Borrar";

  btnBorrar.addEventListener("click", () => {
    const indice = tareas.indexOf(tarea);

    if (indice !== -1) {
      tareas.splice(indice, 1);
    }

    li.remove();
  });

  li.appendChild(btnMarcar);
  li.appendChild(btnBorrar);
}

// Mantener las dos tareas originales de V1
prepararTarea(tarea1);
prepararTarea(tarea2);

// Crear nuevas tareas
function agregarTarea(nombre) {
  const li = document.createElement("li");
  li.textContent = nombre;

  listaTareas.appendChild(li);
  prepararTarea(li);
}

// Buscar tareas
function filtrarTareas() {
  const busqueda = filtroTareas.value.toLowerCase();

  listaTareas.querySelectorAll("li").forEach((li) => {
    li.hidden = !li.dataset.nombre.includes(busqueda);
  });
}

// Evento submit: agregar una tarea
formTarea.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = inputTarea.value.trim();

  // Validacion de tarea vacia
  if (nombre === "") {
    mensajeTarea.textContent = "Escribe una tarea.";
    mensajeTarea.style.color = "red";
    return;
  }

  mensajeTarea.textContent = "";

  agregarTarea(nombre);
  formTarea.reset();
  filtrarTareas();
});

// Evento input: buscar tareas
filtroTareas.addEventListener("input", filtrarTareas);

// Estilos basicos de la pagina

const estilos = document.createElement("style");

estilos.textContent = `
  * {
    box-sizing: border-box;
  }

  html {
    background-color: #f2f4f8;
  }

  body {
    font-family: Arial, sans-serif;
    max-width: 700px;
    margin: 40px auto;
    padding: 30px;
    background-color: white;
    color: #333;
    border-radius: 10px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);
  }

  h1 {
    color: #2456a6;
    text-align: center;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 19px;
    color: #333;
    margin-top: 25px;
  }

  form {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  input {
    padding: 9px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }

  input:focus {
    outline: 2px solid #b8d0f5;
    border-color: #2456a6;
  }

  button {
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }

  form button {
    background-color: #2456a6;
    color: white;
  }

  form button:hover {
    background-color: #174181;
  }

  #listaTareas {
    padding-left: 20px;
  }

  #listaTareas li {
    padding: 12px 5px;
    border-bottom: 1px solid #e5e5e5;
    line-height: 2.3;
  }

  #listaTareas li button {
    margin-left: 6px;
  }

  #listaTareas li button:first-of-type {
    background-color: #e1edff;
    color: #174181;
  }

  #listaTareas li button:last-of-type {
    background-color: #fde5e5;
    color: #a32828;
  }

  #listaTareas li button:hover {
    filter: brightness(0.94);
  }

  #listaTareas li span:nth-of-type(2) {
    color: #666;
    font-size: 13px;
  }

  #mensajeTarea {
    font-size: 14px;
  }

  @media (max-width: 600px) {
    body {
      margin: 12px;
      padding: 20px;
    }

    input {
      max-width: 100%;
    }
  }
`;

document.head.appendChild(estilos);
