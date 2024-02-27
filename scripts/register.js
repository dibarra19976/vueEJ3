const form = document.getElementById("form");
const username = document.getElementById("username");
const displayName = document.getElementById("displayName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const date = document.getElementById("date");
const phone = document.getElementById("phone");

let valido = true;
let modo = "registrar";
let editUserID = -1;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  verificarCampos();
  if (valido == true && modo === "registrar") {
    almacenarUsuarioGetData();
  }
  else if (valido == true && modo === "editar"){
    actualizarUsuario();
  }
});

function almacenarUsuarioGetData() {
  var pfp = document.querySelector("input[type='checkbox']:checked").id;
  var pfpSrc = document.querySelector("." + pfp).getAttribute("src");
  var admin;
  if (document.getElementById("admin").checked) {
    admin = true;
  } else {
    admin = false;
  }

  almacenarUsuario(
    username.value,
    displayName.value,
    email.value,
    password.value,
    date.value,
    phone.value,
    pfpSrc,
    admin
  );

  logIN(
    username.value,
    displayName.value,
    email.value,
    password.value,
    date.value,
    phone.value,
    pfpSrc,
    admin
  );

  if (admin) {
    window.location.href = "../docs/user_list.html";
  } else {
    window.location.href = "../index.html";
  }
}

function verificarCampos() {
  valido = true;
  mostrarCorrecto([username, displayName, email, password, date, phone]);
  // verificarPassword(password);
  verificarLongitud(username, 3, 8);
  verificarLongitud(password, 8, 18);
  verificarEmail(email);
  verificarEdad(date);
  verificarPfp();
  if (modo == "registrar") {
    verificarUniqueStart();
  }
  verificarVacio([username, displayName, email, password, date, phone]);
}

function verificarVacio(inputArray) {
  inputArray.forEach((input) => {
    if (input.value.trim() === null || input.value.trim() === "") {
      let mensaje = "The field can't be empty";
      mostrarError(input, mensaje);
      valido = false;
    }
  });
}

function verificarLongitud(input, min, max) {
  if (input.value.trim().length < min) {
    let mensaje = `${getNombreInput(
      input
    )} needs to have at least ${min} characters`;
    mostrarError(input, mensaje);
    valido = false;
  } else if (input.value.trim().length > max) {
    let mensaje = `${getNombreInput(
      input
    )} cant be longer than ${max} characters`;
    mostrarError(input, mensaje);
    valido = false;
  }
}

function verificarPassword(input) {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!re.test(input.value.trim())) {
    let missatge = `It needs to have a lowercase and uppercase letter, a number and a special character.`;
    mostrarError(input, missatge);
    valido = false;
  }
}

function verificarEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(input.value.trim())) {
    let missatge = `${getNombreInput(input)} isn't valid`;
    mostrarError(input, missatge);
    valido = false;
  }
}

function verificarEdad(input) {
  let fechaNacimiento = new Date(input.value);
  let fechaActual = new Date();
  let edad = Math.floor(
    (fechaActual - fechaNacimiento) / (1000 * 60 * 60 * 24 * 365.25)
  );
  if (edad < 18) {
    let mensaje = "You need to be 18 years old to use the website";
    mostrarError(input, mensaje);
    valido = false;
  }
}

function verificarPfp() {
  if (document.querySelector("input[type='checkbox']:checked") == null) {
    let pfp = document.querySelector("input[type='checkbox']");
    let mensaje = "You need to select a profile picture";
    mostrarError(pfp, mensaje);
    valido = false;
  } else {
    let pfp = document.querySelector("input[type='checkbox']");
    mostrarCorrecto([pfp]);
  }
}

function mostrarError(input, mensaje) {
  input.classList.remove("border");
  input.classList.remove("border-success");
  input.classList.add("border");
  input.classList.add("border-danger");
  let parent = input.parentElement;
  let formText = parent.querySelector(".form-text");
  formText.classList.add("text-danger");
  formText.innerHTML = mensaje;
}

function mostrarCorrecto(inputArray) {
  inputArray.forEach((input) => {
    input.classList.add("border");
    input.classList.add("border-success");
    let parent = input.parentElement;
    let formText = parent.querySelector(".form-text");
    formText.innerHTML = "";
  });
}

function verificarUniqueStart() {
  let transaccion = bd.transaction("users");
  let almacen = transaccion.objectStore("users");

  let puntero = almacen.openCursor();
  puntero.addEventListener("success", iterarArrayVerificar);
}

function iterarArrayVerificar(evento) {
  var puntero = evento.target.result;
  if (puntero) {
    let stringUser = puntero.value.username;
    let stringEmail = puntero.value.email;
    verificarUnique(username, email, stringUser, stringEmail);
    puntero.continue();
  }
}

function verificarUnique(inputUser, inputEmail, stringUser, stringEmail) {
  if (inputUser.value.trim() === stringUser) {
    let mensaje = "Username already in use";
    mostrarError(inputUser, mensaje);
    valido = false;
  }
  if (inputEmail.value.trim() === stringEmail) {
    let mensaje = "Email address already in use";
    mostrarError(inputEmail, mensaje);
    valido = false;
  }
}

function getNombreInput(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function buscarUsuario() {
  let transaccion = bd.transaction("users", "readwrite");
  let almacen = transaccion.objectStore("users");

  var request = almacen.get(editUserID);

  request.onsuccess = function (event) {
    if (event.target.result) {
      var puntero = event.target.result;
      username.value = puntero.username;
      displayName.value = puntero.displayName;
      email.value = puntero.email;
      date.value = puntero.date;
      phone.value = puntero.phone;
      if (puntero.admin == true) {
        admin.checked = true;
      }
    } else {
      console.log('No se encontró ningún usuario con la ID:', editUserID);
    }
  };

  request.onerror = function (event) {
    console.error('Error al buscar el usuario:', event.target.error);
  };
}

function actualizarUsuario() {
  let transaccion = bd.transaction("users", "readwrite");
  let almacen = transaccion.objectStore("users");

  var encryptedPassword = CryptoJS.AES.encrypt(password.value, key).toString();
  var pfp = document.querySelector("input[type='checkbox']:checked").id;
  var pfpSrc = document.querySelector("." + pfp).getAttribute("src");
  var admin = document.getElementById("admin").checked;

  almacen.delete(editUserID);

  var nuevoObjeto = {
    id: editUserID,
    username: username.value,
    displayName: displayName.value,
    email: email.value,
    password: encryptedPassword,
    date: date.value,
    pfp: pfpSrc,
    phone: phone.value,
    admin: admin,
  };

  almacen.add(nuevoObjeto);
  window.location = "../docs/user_list.html";
}


window.addEventListener("load", () => {
  var parametros = new URLSearchParams(window.location.search);
  if (parametros.has("modo")) {
    modo = parametros.get("modo");
    editUserID = parametros.get("id");
    editUserID = parseInt(editUserID);
  }
});
