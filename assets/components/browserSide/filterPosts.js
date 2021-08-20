const container = document.querySelector('.filter');
const cardContainer = document.querySelectorAll('#othernews');

function filterPosts(sourceName) {
    let localContainer = cardContainer; 
    for (let i in localContainer) {
      if (localContainer[i].getAttribute('itemprop') !== sourceName) {
          localContainer[i].style.display = 'none';
      }
    }
    localContainer = cardContainer;
}


$(document).ready(function(){
    $(".filter").on("keyup", function() {
      var value = $(this).val();
      $("#list").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

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
