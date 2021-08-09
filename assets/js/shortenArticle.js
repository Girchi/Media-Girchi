const article = document.querySelectorAll('.card-text'), n = 150,
style = "color: #292424; font-weight: bolder; display: inline-block; white-space: nowrap;";

article.forEach(el => {
   ((el).innerHTML.length > n) ? (el).innerHTML = (el).innerHTML.substr(0, n) + `<i><p style="${style};">...დააკლიკე მეტის სანახავად</p></i>` : (el).innerHTML = (el).innerHTML
})

