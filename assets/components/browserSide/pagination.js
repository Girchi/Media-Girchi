const ul_container = document.querySelector('ul.pagination');

async function getLength() {
    const response = await fetch('/assets/additional_data/newsCount.json');
    const result = await response.json();

    let objectLength = result.length;
    console.log(typeof objectLength);

    for(let i = 1; i <= objectLength; i++) {
        const li = document.createElement('li');
        li.className = 'page-item';

        const a = document.createElement('a');
        a.className = 'page-link';
        a.href = `/page=${i}`;
        a.innerHTML = i; 

        li.appendChild(a);
        ul_container.appendChild(li);
    }
}
getLength();
