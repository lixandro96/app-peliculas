const contenedorPeliculas = document.querySelector('.movies');
const imagen = 'https://image.tmdb.org/t/p/original'
// cargar peliculas
document.addEventListener('DOMContentLoaded',cargarInfo)

function cargarInfo(){

    const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=92cd1c9da3c801f9d8bc1853983f91b1';
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarDatos(data.results))

}
let pagination = 1
const next = document.querySelector('.next');
next.addEventListener("click", ()=>{
    next.preventDefault()
    pagination++
    console.log(pagination)
    })
prueba()
function prueba(){

    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${pagination}&api_key=92cd1c9da3c801f9d8bc1853983f91b1`;
    fetch(url)
        .then(response => response.json())
        .then(data =>console.log(data))
}

function mostrarDatos(informacion){

    informacion.forEach(element => {
        const{title,backdrop_path,poster_path, overview,release_date,vote_average,id}= element
        const card = document.createElement("div");
        card.classList.add("card")
        const div = document.createElement('div');
        div.classList.add('movie');
        div.innerHTML = `<img src=${imagen+poster_path} class='poster'>`;

        const info = document.createElement("div");
        info.classList.add("info")
        info.innerHTML = `<h3 class="title">${title}
            <span>(${release_date})</span>
          </h3>`
        card.appendChild(div)
        card.appendChild(info)
        contenedorPeliculas.appendChild(card)
    });
}

// menu en mobil
const menuBtn = document.querySelector('.menu_mobil');
menuBtn.addEventListener('click', () =>{
    const navegacion =document.querySelector('.navegation');
    navegacion.classList.toggle('menu_visible')
    const bars = document.querySelectorAll('.bar');
    bars[0].classList.toggle('bar_transform1')
    bars[1].classList.toggle('bar_hidden')
    bars[2].classList.toggle('bar_transform2')


})
