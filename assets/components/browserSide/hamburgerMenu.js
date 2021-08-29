const openBtn = document.querySelector(".fa-bars");
const closeBtn = document.querySelector(".fa-window-close");
const showMenu = document.querySelector(".show-menu-side");


openBtn.addEventListener("click", () => {
  showMenu.classList.remove("display-none");
});
closeBtn.addEventListener("click", () => {
    showMenu.classList.add("display-none");
  });
