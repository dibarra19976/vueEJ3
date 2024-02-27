export default {
  name: "Navbar",
  props: ["login"],
  methods: {
    logoutBtn: function(){
  
    }
  },
  template: `

  <header class="container-fluid bg-primary sticky-top mb-4">
  <div class="container-fluid w-100 text-center" style="height: 100px">
    <div class="row align-items-center navb h-100">
      <img
        src="../img/icon.svg"
        alt=""
        class="logo h-100 d-sm-none d-md-block d-none d-sm-block"
      />

      <!-- LOGIN/IMG -->

      <div class="col d-sm-none d-md-block d-none d-sm-block h-100">
        <ul class="h-100 d-flex align-items-center">
          <li class="me-3">
            <a href="../index.html" class="link-navbar">Home</a>
          </li>
          <li class="mx-3">Favourites</li>
          <li class="mx-3" id="loginbtn" v-if="!login">
            <button class="btn">
              <a href="./login.html">Log In</a>
            </button>
          </li>
          <li class="mx-3" id="registerbtn" v-if="!login">
            <button class="btn btn-register">
              <a href="./register.html">Register</a>
            </button>
          </li>
          <li class="mx-3" id="logoutbtn" v-on:click="logoutBtn" v-if="login">
            <button class="btn btn-register">
              <a href="#">Log Out</a>
            </button>
          </li>
        <a href="#" id="profile-btn" >
            <li class="mx-3  d-flex align-items-center" id="profile"  v-if="login">
              <img
                src="/img/gray.png"
                alt=""
                class="logo h-100 d-sm-none d-md-block d-none d-sm-block"
                id="profilePicTop"
              />
              <p style="padding-left: 20px" class="link" id="username"></p>
            </li>
          </a>
        </ul>
      </div>
      <div class="col h-75 bg-primary p-0 d-flex">
        <form
          class="searchbar bg-secondary flex-fill align-content-center p-3 row m-0"
        >
          <div class="searchbarInside h-100 col me-3">
            <input
              placeholder="Search..."
              type="text"
              class="w-100 h-100 transparent-input focus-ring"
            />
          </div>
          <input
            class="col-2 btn btn-img d-xl-none .d-xxl-block"
            type="submit"
            value=" "
          />
          <input
            class="col-2 btn d-sm-none d-md-block d-md-none d-lg-block d-lg-none d-xl-block d-none d-sm-block"
            type="submit"
            value="Submit"
          />
          <div
            class="dropdown-center col-1 h-100 align-content-center me-3"
          >
            <a
              class=" "
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <img
                src="../ico/filter_list_FILL1_wght400_GRAD200_opsz24.svg"
                alt=""
                class="h-100 align-content-center filter-primary"
              />
            </a>

            <ul class="dropdown-menu">
              <li class="dropdown-item w-100">
                <input
                  type="checkbox"
                  name="filter"
                  id="filterid"
                  class="form-check-input focus-ring"
                />
                Category
                <img
                  class="h-75 float-end"
                  src="../ico/home_FILL1_wght400_GRAD200_opsz24.svg"
                  alt=""
                />
              </li>
              <li class="dropdown-item w-100">
                <input
                  type="checkbox"
                  name="filter"
                  id="filterid"
                  class="form-check-input focus-ring"
                />
                Category
                <img
                  class="h-75 float-end"
                  src="../ico/home_FILL1_wght400_GRAD200_opsz24.svg"
                  alt=""
                />
              </li>
              <li class="dropdown-item w-100">
                <input
                  type="checkbox"
                  name="filter"
                  id="filterid"
                  class="form-check-input focus-ring"
                />
                Category
                <img
                  class="h-75 float-end"
                  src="../ico/home_FILL1_wght400_GRAD200_opsz24.svg"
                  alt=""
                />
              </li>
              <li class="dropdown-item w-100">
                <input
                  type="checkbox"
                  name="filter"
                  id="filterid"
                  class="form-check-input focus-ring"
                />
                Category
                <img
                  class="h-75 float-end"
                  src="../ico/home_FILL1_wght400_GRAD200_opsz24.svg"
                  alt=""
                />
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li class="dropdown-item w-100">
                <span class="w-100">Sort by</span>
              </li>
              <li class="dropdown-item w-100">
                <select name="" id="" class="w-100">
                  <option value="value1" selected>Recent</option>
                  <option value="value2">Most views</option>
                  <option value="value3">Most LIkes</option>
                </select>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </div>
</header>`,
};
