const markClick = document.querySelectorAll(".fa-star");
markClick.forEach((el) => {
    let important=false;
    
    el.addEventListener('click',()=>{
        const obj=el.getAttribute('value');
        el.classList.toggle("background")
        return obj
        // important=!important
        // if(important){
        //     console.log(important);
        // }else{
        //     console.log(important);
        // }
    })
});
