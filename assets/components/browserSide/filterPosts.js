const container = document.querySelector('.filter');
const cardContainer = document.querySelectorAll('.main-card');

function filterPosts(sourceName) {
  for (let i in cardContainer) {
    if (cardContainer[i].getAttribute('value') !== sourceName) {
      cardContainer[i].style.display = 'none';
    }
  }
}

container.addEventListener('input', () => {
    let value = container.value;
    console.log(value);
    switch (value) {
        case "Imedi":
            filterPosts('Imedi');
            break;
        case "Formula":
            filterPosts('Formula');
            break;
        case "Facebook":
            filterPosts('Facebook');
            break;
        case "IPN":
            filterPosts('IPN');
            break;
        case "On":
            filterPosts('On');
            break;
        case "Mtavari":
            filterPosts('Mtavari');
            break;
        case "Palitra":
            filterPosts('Palitra');
            break;
        case "Tabula":
            filterPosts('Tabula');
            break;
    }
})
