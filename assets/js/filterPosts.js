const container = document.querySelector('.filter');
const cardContainer = document.querySelectorAll('.card');

console.log(cardContainer);

container.addEventListener('input', () => {
    console.log(container.value);
})