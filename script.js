function obtenerSantoralDelDia() {
  const hoy = new Date();
  const dia = hoy.getDate().toString().padStart(2, "0");
  const mes = (hoy.getMonth() + 1).toString().padStart(2, "0");
  return window.santoral[`${dia}-${mes}`] || "No hay santos registrados";
}

function mostrarSantoral() {
  const elemento = document.getElementById("santoralHoy");
  if (elemento) elemento.textContent = obtenerSantoralDelDia();

  const fechaTexto = document.getElementById("fechaHoy");
  if (fechaTexto) {
    const hoy = new Date();
    const dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    const meses = ["enero","febrero","marzo","abril","mayo","junio",
                   "julio","agosto","septiembre","octubre","noviembre","diciembre"];

    fechaTexto.textContent =
      `${dias[hoy.getDay()]} ${hoy.getDate()} de ${meses[hoy.getMonth()]}`;
  }
}

function mostrarSantoralPorFecha() {
  const fecha = document.getElementById("fechaSelector").value;
  if (!fecha) return;

  const [year, month, day] = fecha.split("-");
  const clave = `${day}-${month}`;

  document.getElementById("santoralFechaSeleccionada").textContent =
    window.santoral[clave] || "No hay datos";
}

function buscarSanto() {
  const nombre = document.getElementById("nombreSanto").value.toLowerCase();
  const lista = document.getElementById("resultadosBusqueda");

  lista.innerHTML = "";

  Object.entries(window.santoral).forEach(([fecha, santos]) => {
    if (santos.toLowerCase().includes(nombre)) {
      const li = document.createElement("li");
      li.textContent = `${fecha}: ${santos}`;
      lista.appendChild(li);
    }
  });

  if (!lista.innerHTML) {
    lista.innerHTML = "<li>No se encontraron resultados</li>";
  }
}

function mostrarMes() {
  const params = new URLSearchParams(window.location.search);
  const mesSeleccionado = params.get("mes");
  if (!mesSeleccionado) return;

  const nombresMeses = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];

  document.getElementById("tituloMes").textContent =
    "Santoral de " + nombresMeses[mesSeleccionado - 1];

  const lista = document.getElementById("listaMes");
  lista.innerHTML = "";

  Object.entries(window.santoral).forEach(([fecha, santos]) => {
    const [dia, mes] = fecha.split("-");

    if (parseInt(mes) === parseInt(mesSeleccionado)) {
      const li = document.createElement("li");
      li.textContent = `${dia} - ${santos}`;
      lista.appendChild(li);
    }
  });
}

function toggleModoOscuro() {
  document.body.classList.toggle("modo-oscuro");
}

function actualizarAnio() {
  const el = document.getElementById("anioActual");
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarSantoral();
  mostrarMes();
  actualizarAnio();
});
