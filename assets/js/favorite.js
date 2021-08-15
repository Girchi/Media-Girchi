const socket = io("http://127.0.0.1:3000");
const el = document.querySelectorAll(".fa-star");
const btn = document.querySelector(".btn-click");
socket.on("connection");
el.forEach((e) => {
  e.addEventListener("click", () => {
    let sendData = e.getAttribute("value");
    socket.emit("message", sendData);
  });
});
