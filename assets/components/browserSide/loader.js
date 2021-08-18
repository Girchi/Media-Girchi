const loader = document.querySelector(".outerContainer")
window.addEventListener("load",function(){
    setTimeout(() => {
        loader.classList += " hidden"; 
    }, 2000);
})