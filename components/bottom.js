export default {
    name: "Bottom",
    template: `
    <div
    class="container-fluid bg-primary fixed-bottom d-block d-sm-block d-md-none mt-5"
  >
    <div class="container text-center" style="height: 60px">
      <div class="row align-items-center navb h-100">
        <div class="col h-75">
          <a href="#"
            ><img
              src="/ico/home_FILL1_wght400_GRAD200_opsz24.svg"
              alt=""
              class="h-100 filter-secondary"
          /></a>
        </div>
        <div class="col h-75">
          <img
            src="/ico/bookmarks_FILL1_wght400_GRAD200_opsz24.svg"
            alt=""
            class="h-100 filter-secondary"
          />
        </div>
        <div class="col h-75">
          <img
            src="/ico/account_circle_FILL1_wght400_GRAD200_opsz24.svg"
            alt=""
            class="h-100 filter-secondary"
            id="profileIcon"
          />
        </div>
      </div>
    </div>
  </div>`,
  };
  