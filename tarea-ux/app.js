"use strict";

// Rediseño basado en la tarea original del Laboratorio 08.
// Mantiene agregar, buscar, completar y borrar; añade confirmación, deshacer y avisos visibles.
const formulario = document.querySelector("#formTarea");
const inputTarea = document.querySelector("#inputTarea");
const botonAgregar = document.querySelector("#botonAgregar");
const filtroTareas = document.querySelector("#filtroTareas");
const filtroEstado = document.querySelector("#filtroEstado");
const listaTareas = document.querySelector("#listaTareas");
const contador = document.querySelector("#contador");
const sinResultados = document.querySelector("#sinResultados");
const aviso = document.querySelector("#aviso");
const mensajeTarea = document.querySelector("#mensajeTarea");
const botonDeshacer = document.querySelector("#botonDeshacer");

let siguienteId = 3;
const tareas = [
  { id: 1, nombre: "Estudiar JavaScript", completada: false },
  { id: 2, nombre: "Realizar el laboratorio 8", completada: false }
];
let eliminacionAnterior = null;

function informar(texto, tipo = "info", permiteDeshacer = false) {
  mensajeTarea.textContent = texto;
  aviso.className = tipo === "info" ? "aviso" : `aviso ${tipo}`;
  botonDeshacer.hidden = !permiteDeshacer;
}

function sincronizarBoton() {
  botonAgregar.disabled = inputTarea.value.trim().length === 0;
}

function crearBoton(texto, clase, accion) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = `btn ${clase}`;
  boton.textContent = texto;
  boton.addEventListener("click", accion);
  return boton;
}

function renderizar() {
  listaTareas.replaceChildren();
  const busqueda = filtroTareas.value.trim().toLocaleLowerCase("es");
  const estado = filtroEstado.value;
  const visibles = tareas.filter(tarea =>
    tarea.nombre.toLocaleLowerCase("es").includes(busqueda) &&
    (estado === "todas" || (estado === "pendientes" && !tarea.completada) ||
      (estado === "completadas" && tarea.completada))
  );

  for (const tarea of visibles) {
    const li = document.createElement("li");
    li.className = `tarea${tarea.completada ? " completada" : ""}`;
    const contenido = document.createElement("div");
    contenido.className = "tarea-contenido";
    const nombre = document.createElement("p");
    nombre.className = "tarea-nombre";
    nombre.textContent = tarea.nombre; // evita insertar HTML aportado por el usuario
    const estadoTexto = document.createElement("span");
    estadoTexto.className = `estado${tarea.completada ? " finalizada" : ""}`;
    estadoTexto.textContent = tarea.completada ? "Completada" : "Pendiente";
    contenido.append(nombre, estadoTexto);

    const acciones = document.createElement("div");
    acciones.className = "tarea-acciones";
    const botonCompletar = crearBoton(
      tarea.completada ? "Marcar pendiente" : "Completar",
      "btn-accion",
      () => {
        tarea.completada = !tarea.completada;
        renderizar();
        informar(`Tarea «${tarea.nombre}» marcada como ${tarea.completada ? "completada" : "pendiente"}.`, "exito");
      }
    );
    const botonEliminar = crearBoton("Eliminar", "btn-eliminar", () => {
      if (!window.confirm(`¿Seguro que quieres eliminar la tarea «${tarea.nombre}»?`)) {
        informar("Eliminación cancelada. Tu tarea sigue en la lista.");
        return;
      }
      const posicion = tareas.findIndex(item => item.id === tarea.id);
      if (posicion < 0) return;
      eliminacionAnterior = { tarea: { ...tarea }, posicion };
      tareas.splice(posicion, 1);
      renderizar();
      informar(`Tarea «${tarea.nombre}» eliminada. Puedes deshacer el cambio.`, "exito", true);
      botonDeshacer.focus();
    });
    acciones.append(botonCompletar, botonEliminar);
    li.append(contenido, acciones);
    listaTareas.appendChild(li);
  }
  contador.textContent = `${tareas.length} ${tareas.length === 1 ? "tarea" : "tareas"} · ${tareas.filter(t => !t.completada).length} pendientes`;
  sinResultados.hidden = visibles.length > 0;
}

inputTarea.addEventListener("input", sincronizarBoton);
formulario.addEventListener("submit", evento => {
  evento.preventDefault();
  const nombre = inputTarea.value.trim();
  if (!nombre) {
    // Prevención doble: botón deshabilitado y validación si se intenta enviar por teclado.
    informar("Escribe un nombre antes de agregar una tarea.", "error");
    inputTarea.focus();
    return;
  }
  tareas.push({ id: siguienteId++, nombre, completada: false });
  inputTarea.value = "";
  sincronizarBoton();
  renderizar();
  informar(`Tarea «${nombre}» agregada correctamente.`, "exito");
  inputTarea.focus();
});

filtroTareas.addEventListener("input", () => {
  renderizar();
  informar(`Búsqueda actualizada. ${listaTareas.children.length} ${listaTareas.children.length === 1 ? "resultado" : "resultados"}.`);
});
filtroEstado.addEventListener("change", () => {
  renderizar();
  informar(`Filtro aplicado: ${filtroEstado.options[filtroEstado.selectedIndex].text}.`);
});
botonDeshacer.addEventListener("click", () => {
  if (!eliminacionAnterior) return;
  const { tarea, posicion } = eliminacionAnterior;
  if (!tareas.some(item => item.id === tarea.id)) {
    tareas.splice(Math.min(posicion, tareas.length), 0, tarea);
  }
  eliminacionAnterior = null;
  renderizar();
  informar(`Eliminación deshecha. Se recuperó la tarea «${tarea.nombre}».`, "exito");
});

sincronizarBoton();
renderizar();
