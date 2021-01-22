const moment = require("moment-timezone");

function saveSesion(data) {
  localStorage.setItem("sesion", JSON.stringify(data));
}

function getSesion() {
  return JSON.parse(localStorage.getItem("sesion"));
}

function deleteSesion() {
  localStorage.removeItem("sesion");
}
function formatDate(date) {
  const f = moment(date).tz("America/Bogota");
  return f.format("YYYY-MM-DD");
}

function fecha() {
  const f = moment().tz("America/Bogota");
  const fecha = f.format("YYYY-MM-DD");
  return fecha;
}

module.exports = {
  saveSesion,
  getSesion,
  deleteSesion,
  formatDate,
  fecha
};
