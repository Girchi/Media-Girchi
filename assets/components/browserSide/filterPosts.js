const container = document.querySelector('.filter');
const cardContainer = document.querySelectorAll('#othernews');


function filterPosts(sourceName) {
    for(let i = 0; i < cardContainer.length; i++) {
        cardContainer[i].classList.remove("hideElement");
        cardContainer[i].classList.remove("showElement");
    }
    
    for (let i = 0; i < cardContainer.length; i++) {
        if (cardContainer[i].getAttribute('itemprop') === sourceName) {
            cardContainer[i].classList.add("showElement");
        } else {
            cardContainer[i].classList.add("hideElement");
        }
    }
}
