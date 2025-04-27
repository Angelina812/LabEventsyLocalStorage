const botonAgregar = document.querySelector("#boton-agregar");
const inputTarea = document.querySelector("#input-tarea");
const listaTareas = document.querySelector("#lista-tareas");
const mensajeError = document.querySelector("#mensaje-error");
const borrarTodoBtn = document.querySelector("#boton-borrar-todo");

// evita que se eliminen las tareas al recargar la pagina
document.addEventListener("DOMContentLoaded", function () {
  const tareasGuardadas = JSON.parse(localStorage.getItem("text")) || [];  //los || [] son necesarios para trabajar con un arreglo vacio
  tareasGuardadas.forEach(function (tarea) {  //foreach  recorrer arreglos sin necesidad de controlar índices manualmente (i)
    crearTarea(tarea);
  });
});

botonAgregar.addEventListener("click", function () {
  const textoTarea = inputTarea.value.trim();

  if (textoTarea === "") {
    mensajeError.textContent = "⚠️ Campo vacío.";
    return;
  }

  crearTarea(textoTarea);       
  guardarTarea(textoTarea);

  inputTarea.value = "";
  mensajeError.textContent = "";
});

function crearTarea(textoTarea) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox-tarea");

  const textoTareaElemento = document.createElement("span");
  textoTareaElemento.textContent = textoTarea;

  const botonEliminar = document.createElement("btn-eliminar");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.classList.add("btn-eliminar");

  li.appendChild(checkbox);
  li.appendChild(textoTareaElemento);
  li.appendChild(botonEliminar);
  listaTareas.appendChild(li);

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      textoTareaElemento.style.textDecoration = "line-through";
      textoTareaElemento.style.color = "green";
    } else {
      textoTareaElemento.style.textDecoration = "none";
      textoTareaElemento.style.color = "purple";
    }
  });

  botonEliminar.addEventListener("click", function () {
    borrarTarea(textoTarea);
    li.remove();
  });
}

function guardarTarea(tarea) {
  let tareas = JSON.parse(localStorage.getItem("text")) || [];
  tareas.push(tarea);
  localStorage.setItem("text", JSON.stringify(tareas));
}

function borrarTarea(tarea) {
  let tareas = JSON.parse(localStorage.getItem("text")) || [];
  tareas = tareas.filter(function (t) {
    return t !== tarea;
  });
  localStorage.setItem("text", JSON.stringify(tareas));
}
// boton que borra todo
borrarTodoBtn.addEventListener("click", function () {
  listaTareas.innerHTML = "";
  localStorage.removeItem("text");
});
