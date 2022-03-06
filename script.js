// api key from the omdb api site
// https://www.omdbapi.com/?t=avengers&apikey=37662260
// id url https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=37662260


// selectors
const title = document.getElementById('movieName');
const searchList = document.getElementById('List');
const resultDiv = document.getElementsByClassName('results');

const info = document.getElementsByClassName('info');

// functions


//load movies function will call the api and get the movies search list
async function loadMovies(searchTerm) {
    // here s== search , t= title , i=id
    const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=37662260`

    const res = await fetch(`${url}`);
    const data = await res.json();
    if (data.Response == "True") {
        displayMovieList(data.Search);
    } else {
        console.error(err);
    }

}

// this function will trigger when the user starts typing in the search box by onkeyup event
function findMovies() {
    let searchTerm = (movieName.value).trim();
    // console.log(searchTerm)


    if (searchTerm.length > 0) {
        // will remove hide classes as soon as anything is written in the input box
        searchList.classList.remove('hide');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide');
    }
}

// this function will clear the existing poster
function emptyPoster() {
    poster.innerHTML = "";
    info.innerHTML = "";

}
//  this function will dislay list like the suggestions

function displayMovieList(movies) {

    searchList.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {
        let listItem = document.createElement('div');
        listItem.dataset.id = movies[i].imdbID;
        listItem.classList.add('search-list-items');

        listItem.innerHTML = `
       <p> ${ movies[i].Title} </p>
       <p>${movies[i].Year}</p>
       `;
        searchList.appendChild(listItem);



    }
    loadMovieDetails();

}
// this function will load details of the movie
function loadMovieDetails() {

    const searchListMovies = searchList.querySelectorAll('.search-list-items');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async() => {
            //   console.log(movie.dataset.id);
            searchList.classList.add('hide');
            movieName.value = "";

            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=37662260`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);

        })
    });
}

//  this function will post the details in the poster div and info div

function displayMovieDetails(details) {


    // console.log(details);
    // this will get the poster img  url from  the  details
    let img = details.Poster;
    let posterImg = document.createElement("img");
    posterImg.src = `${img}`;
    // append the getted img from the server to the poster div
    document.getElementById('poster').appendChild(posterImg);




    //  posting the information of the  movie  in the info div
    document.getElementById('info').innerHTML = `<p class="highlight" id="title" > Title: ${details.Title} <p>
    <p class="highlightRed"> Year: ${details.Year} <p>
    <p> Released:${details.Released}</p>
    <p> Genre: ${details.Genre}</p>
    <p>Language: ${details.Language}</p>
    <p>Writer: ${details.Writer}</p>
    <p class="highlight">Actors: ${details.Actors}</p>
    <p> Country: ${details.Country}</p>
    <p>Rated: ${details.Rated}</p>
    `;
}

//   for hiding the search list when the user will click on the window other than input box
window.addEventListener('click', (event) => {
    if (event.target.className != "movieName") {
        searchList.classList.add('hide');
    }
});