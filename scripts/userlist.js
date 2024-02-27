const popup = document.getElementById("popup");
const yes = document.getElementById("yes");
const no = document.getElementById("no");

function mostrarLista() {
  let userList = document.getElementById("user-list-div");
  userList.innerHTML="";
  let transaccion = bd.transaction("users");
  let almacen = transaccion.objectStore("users");
  let puntero = almacen.openCursor();
  puntero.addEventListener("success", (e) => {
    var puntero = e.target.result;
    if (puntero) {
      let elements = `<li class="w-100 my-3 d-flex justify-content-center">
        <div class="d-flex align-items-center user-div">
          <div style="height: 100px; margin: 20px">
            <img src="${puntero.value.pfp}" class="h-100" />
          </div>
          <div class="d-flex flex-column user-info p-3">
            <h4>ID ${puntero.value.id}: ${puntero.value.username}</h4>
            <div class="d-flex flex-row">
              <div class="d-flex flex-column user-info p-3">
                <p>Display Name: <span>${puntero.value.displayName}</span></p>
                <p>Email: <span>${puntero.value.email}</span></p>
                <p>Date of birth: <span>${puntero.value.date}</span></p>
              </div>

              <div class="d-flex flex-column user-info p-3">
                <p>Phone Number: <span>${puntero.value.phone}</span></p>
                <p>Admin: <span>${puntero.value.admin ? "Yes" : "No"}</span></p>
              </div>
              <div class="d-flex flex-column user-info p-3">
                <button class="btn btn-register m-2" onClick="editarUsuario(${
                  puntero.value.id
                });">
                 Edit
                </button>
                <button class="btn btn-primary m-2" onClick="eliminarUsuario(${
                    puntero.value.id
                  });">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>`;
      userList.innerHTML += elements;
      puntero.continue();
    }
  });
}

function editarUsuario(userID) {
  var URL = "../docs/register.html?id=" + userID + "&modo=editar";
  window.location.href = URL;
}

function eliminarUsuario(userID) {
  popup.classList.toggle("d-none");

  no.addEventListener("click", () => {
    popup.classList.add("d-none");
  });

  yes.addEventListener("click", () => {
    let transaccion = bd.transaction("users", "readwrite");
    let almacen = transaccion.objectStore("users");
    almacen.delete(parseInt(userID));
    mostrarLista();
    popup.classList.add("d-none");
  });
}
