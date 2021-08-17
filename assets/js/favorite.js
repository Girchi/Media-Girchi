const socket = io("http://127.0.0.1:3000");
const el = document.querySelectorAll(".fa-star");
const btn = document.querySelector(".btn-click");
const markClick = document.querySelectorAll(".fa-star");


socket.on("connection");
el.forEach((e) => {
  let check = false;
  e.addEventListener("click", () => {
    let sendData = e.getAttribute("value");
    socket.emit("message", sendData);
    e.classList.toggle("background");

    if (check != true) {
      check = !check;
      alert("დაემატა");
    } else {
      check = !check;
      alert("ამოიშალა");
    }
  });
});
