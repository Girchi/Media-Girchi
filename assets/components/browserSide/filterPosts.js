const container = document.querySelector('.filter');
const cardContainer = document.querySelectorAll('#othernews');

function filterPosts(sourceName) {
    for (let i = 0; i < cardContainer.length; i++) {
        cardContainer[i].classList.add("hideElement");
    }  
    for (let i = 0; i < cardContainer.length; i++) {
        if (cardContainer[i].getAttribute('itemprop') === sourceName) {
            cardContainer[i].classList.add("showElement");
        }
    }

}

container.addEventListener('input', () => {
    let value = container.value;
    console.log(value);

    if(value === "Imedi") {
        filterPosts('Imedi');
    } else if (value === "Formula") {
        filterPosts('Formula');
    } else if(value === "Facebook") {
        filterPosts("Facebook");
    } else if(value === "IPN") {
        filterPosts('IPN');
    } else if(value === "On") {
        filterPosts('On');
    } else if(value === "Mtavari") {
        filterPosts('Mtavari');
    } else if(value === "Palitra") {
        filterPosts('Palitra');
    } else if(value === "Tabula") {
        filterPosts('Tabula');
    }
})
