const loader =document.querySelector(".outerContainer")
console.log(loader)
window.addEventListener("load",function(){
    setTimeout(() => {
        loader.classList += " hidden"; 
    }, 2000);
})