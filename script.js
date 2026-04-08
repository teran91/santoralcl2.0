// ===== FECHA BONITA =====
function obtenerFechaFormateada() {
  const hoy = new Date();
  const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  return `${dias[hoy.getDay()]} ${hoy.getDate()} de ${meses[hoy.getMonth()]}`;
}

// ===== MOSTRAR SANTORAL DEL DÍA =====
function mostrarSantoral() {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");

  const nombre = santoral[`${dia}-${mes}`] || "No hay santos registrados";

  document.getElementById("santoralHoy").innerHTML = `
    <h2>Santoral del día</h2>
    <p><strong>${obtenerFechaFormateada()}</strong></p>
    <p>${nombre}</p>
  `;
}

// ===== BUSCAR POR FECHA =====
function mostrarSantoralPorFecha() {
  const fecha = document.getElementById("fechaSelector").value;
  if (!fecha) return;

  const [_, mes, dia] = fecha.split("-");
  const resultado = santoral[`${dia}-${mes}`] || "No hay santos registrados";

  document.getElementById("santoralFechaSeleccionada").textContent = resultado;
}

// ===== BUSCAR POR NOMBRE =====
function buscarSanto() {
  const nombre = document.getElementById("nombreSanto").value.toLowerCase();

  const resultados = Object.entries(santoral).filter(([_, santos]) =>
    santos.toLowerCase().includes(nombre)
  );

  document.getElementById("resultadosBusqueda").innerHTML =
    resultados.length
      ? resultados.map(([f, s]) => `<li>${f}: ${s}</li>`).join("")
      : "<li>No encontrado</li>";
}

// ===== MODO OSCURO + ICONO =====
function toggleModoOscuro() {
  document.body.classList.toggle("modo-oscuro");

  const boton = document.getElementById("toggleModo");

  if (document.body.classList.contains("modo-oscuro")) {
    boton.textContent = "☀️";
    localStorage.setItem("modo", "oscuro");
  } else {
    boton.textContent = "🌙";
    localStorage.setItem("modo", "claro");
  }
}

// ===== AÑO AUTOMÁTICO =====
function actualizarAnio() {
  document.getElementById("anioActual").textContent =
    new Date().getFullYear();
}

// ===== INICIO =====
document.addEventListener("DOMContentLoaded", () => {
  mostrarSantoral();
  actualizarAnio();

  if (localStorage.getItem("modo") === "oscuro") {
    document.body.classList.add("modo-oscuro");
    document.getElementById("toggleModo").textContent = "☀️";
  }
});
