const markClick = document.querySelectorAll(".fa-star");

markClick.forEach((el) => {
    el.addEventListener('click',(event)=>{
        el.classList.toggle("background")
    })
});
