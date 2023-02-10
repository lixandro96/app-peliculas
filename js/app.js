const movies = document.querySelector('.movies');
const imagen = 'https://image.tmdb.org/t/p/w500';
let Page = 1
const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = '&api_key=92cd1c9da3c801f9d8bc1853983f91b1'
const popularMovies = '/discover/movie?sort_by=popularity.desc&'
const apiUrl = baseUrl+popularMovies+'page='+Page+apiKey;
const populars = document.querySelector('#populars');

// cargar peliculas
document.addEventListener('DOMContentLoaded',loadInfo(apiUrl));


const currentpage =document.querySelector('.currentpage');
const lastpage = document.querySelector('.lastpage');
const queryGenre = `/genre/movie/list?`
const inputSearch = document.querySelector('#search');
const form = document.querySelector('.form');

currentpage.textContent= Page;



function loadInfo(url){
    try {
        fetch(url)
        .then(response => response.json())
        .then(data => showMovies(data))
    } catch (error) {
        console.log(error)
    }

}

function loadCategorie(category){

    try {
        fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=92cd1c9da3c801f9d8bc1853983f91b1&language=en-US&page=${Page}`)
        .then(response => response.json())
        .then(data => showMovies(data))
    } catch (error) {
        console.log(error)
    }

}
const categories = document.querySelector('.menu');

categories.addEventListener("click", e =>{
    e.preventDefault()
    if (e.target.classList.contains('genre')){
        console.log(e.target.id)
        loadCategorie(e.target.id)
    }
})
const next = document.querySelector('.next');

next.addEventListener("click", (e)=>{
    Page++
    loadInfo(baseUrl+popularMovies+'page='+Page+apiKey)
})

form.addEventListener('submit',(e)=> {
    e.preventDefault()
    if(inputSearch.value === ''){
        return loadInfo(baseUrl+popularMovies+'page='+Page+apiKey)
    }
    const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=92cd1c9da3c801f9d8bc1853983f91b1&language=en-US&page=${Page}&include_adult=true&query=${inputSearch.value}`;

    loadInfo(urlSearch)

})

function showMovies(informacion){

    const moviesContainer = document.querySelector('.movies-container');
    moviesContainer.innerHTML = `<section class="movies"></section>`;
    const movies = document.querySelector('.movies');
    informacion.results.forEach(element => {
        const{title,backdrop_path,poster_path, overview,release_date,vote_average,id}= element;
        const card = document.createElement("div");
        card.classList.add("card")
        card.innerHTML = `

            <div class="movie">
                <span class="vote_average">${vote_average}</span>
                <img src=${imagen+poster_path} alt='${title}' class='poster'>
                <div class="info">
                    <h3 class="title">${title}<span>(${release_date})</span></h3>
                </div>
            </div>
        `;

        movies.appendChild(card)
        currentpage.textContent= Page
        lastpage.textContent = informacion.total_pages
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
