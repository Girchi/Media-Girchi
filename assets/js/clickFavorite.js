const markClick = document.querySelectorAll(".fa-star");

markClick.forEach((el) => {
    let important=false;
    
    el.addEventListener('click',()=>{
        const obj=el.getAttribute('value');
        el.classList.toggle("background")
        console.log(obj);
        // important=!important
        // if(important){
        //     console.log(important);
        // }else{
        //     console.log(important);
        // }
    })
});


// exports.SimpleMessage = 'Hello world';