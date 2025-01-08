import "../CSS/style.css";

const filmURL = "https://ghibliapi.vercel.app/films";
const characterAPI = "https://ghibliapi.vercel.app/people";
const locationAPI = "";

async function fetchData(filmURL) {
  try {
    const response = await fetch(filmURL);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching movie data", error);
    return []; // return empty array if there is an error
  }
}

const insertHTML = async () => {
  const movies = await fetchData(filmURL);
  const apiResponseDOM = document.querySelector(".api-response");

  movies.forEach((item) => {
    const title = item.title;
    const image = item.image;
    const poster = item.movie_poster;
    const japaneseTitle = item.original_title;
    const date = item.release_date;
    const score = item.rt_score;
    const director = item.director;
    const desc = item.description;
    const people = item.people;
    const locations = item.locations;
    const film_id = item.id;

    movies.push({ title, image, movie_poster, score });

    function movieAdd(movie) {
    apiResponseDOM.insertAdjacentHTML(
      "beforeend",
      `
      <div class="movie-card">
        <div class="card-front">
            <h2> ${title}</h2>
            <h3> ${japaneseTitle}</h3>
            <img src="${image}" class = "movie-image" alt="Movie poster of ${title}" />

        </div>
        <div class = "card-back">
            <h3>Plot: ${desc}</h3>
            <h3>Rotten Tomatoes Score: ${score}</h3>
            <h3>Release Date: ${date}</h3>
            <h3>Director: ${director}</h3>
        </div>

      </div>
      `
    );
    }
});

insertHTML();

const DOMSelectors = {
  filterDropdown: document.querySelectorAll(".filter-dropdown"),
  resetButton: document.querySelector("#reset-button"),
};

function gameStart() {
  const gameImageOne = document.querySelector("#game-image-1");
  const submitButton = document.querySelector("#submit-button");

  function newQuestion() {
    gameImageOne.innerHTML = "";
    gameImageTwo.innerHTML = ""; // maybe 4 windows intead 

    function getMovies() {
      const index1 = Math.floor(Math.random() * arr.length);
      let index2 = Math.floor(Math.random() * arr.length);

      while (index2 === index1) {
        index2 = Math.floor(Math.random() * arr.length);
      }
      return [arr[index1], arr[index2]];
    }

    getMovies(movies);

    gameImageOne.insertAdjacentHTML(
      "beforeend",
      `<img src="${getMovies[0].image}" alt="random movie 1" />` //might come back and make these clickable buttons instead
    );

    gameImageTwo.insertAdjacentHTML(
      "beforeend",
      `<img src="${getMovies[1].image}" alt="random movie 2" />`
    );

    function higherRated() {
        if getMovies[0].score > getMovies[1].score
    }
  }
}
gameStart();

function showMovies(moviesDisplayed) {
    DOMSelectors.container.replaceChildren();
    moviesDisplayed.forEach((movie) => movieAdd(movie));
}
showMovies(movies);

const filterMap = {
    director: "director",
    decade: "decade",
  };
  
  function filterMovies(filterType, filterValue) {
    const filteredMovies = movies.filter((movie) => {
      return movies[filterType].includes(filterValue); //if the prop has the text from the dropdown
    });
    showAlbums(filteredMoviess); //only show what matches clicked
  }
  DOMSelectors.filterDropdown.forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    dropdown.querySelectorAll("a").forEach((item) => {
      item.addEventListener("click", (event) => {
        const filterCategory = button.id; //get id from dropdown
        const filterKey = filterMap[filterCategory]; //match it to prop in array
        const filterValue = event.target.textContent; //content in each dropdown
  
        filterMovies(filterKey, filterValue);
      });
    });
  });