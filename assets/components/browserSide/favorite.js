const socket = io("http://127.0.0.1:3000");
const el = document.querySelectorAll(".fa-star");
const btn = document.querySelector(".btn-click");
const markClick = document.querySelectorAll(".fa-star");


socket.on("connection");
el.forEach((e) => {
  let check = false;
  e.addEventListener("click", () => {
    console.log(e.classList);
    e.classList.add("background");
    let sendData = e.getAttribute("value");
    socket.emit("message", sendData);
    if (check != true) {
      check = !check;
    } else {
      check = !check;
    }
  });
});
