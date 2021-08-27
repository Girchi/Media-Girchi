const cardContainer = document.querySelectorAll('.main-card');

function filterPosts(sourceName) {
    if(typeof sourceName !== "string") { 
        return; 
    }

    for(let i = 0; i < cardContainer.length; i++) {
        cardContainer[i].classList.remove("hideElement");
        cardContainer[i].classList.remove("showElement");
    }
    
    for (let i = 0; i < cardContainer.length; i++) {
        if (cardContainer[i].getAttribute('itemprop') === sourceName) {
            cardContainer[i].classList.add("showElement");
        } else {
            cardContainer[i].classList.add("hideElement");
            console.log(cardContainer[i]);
        }
    }
}
