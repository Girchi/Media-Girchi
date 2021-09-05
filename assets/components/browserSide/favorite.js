const socket = io("http://0.0.0.0:3000");
const el = document.querySelectorAll(".fa-star");
const btn = document.querySelector(".btn-click");

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
