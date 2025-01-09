import "../CSS/style.css";

const filmURL = "https://ghibliapi.vercel.app/films";
const characterAPI = "https://ghibliapi.vercel.app/people";
const locationAPI = "";

// Function to fetch movie data
async function fetchData(filmURL) {
  try {
    const response = await fetch(filmURL);
    const data = await response.json();
    console.log(data); // Log the fetched data to check if it’s working
    return data;
  } catch (error) {
    console.error("Error fetching movie data", error);
    return []; // return empty array in case of an error
  }
}

// Function to insert movie cards into the DOM
const insertHTML = async () => {
  const movies = await fetchData(filmURL);
  const apiResponseDOM = document.querySelector(".api-response");

  movies.forEach((movie) => {
    const title = movie.title;
    const image = movie.image;
    const japaneseTitle = movie.original_title;
    const date = movie.release_date;
    const score = movie.rt_score;
    const director = movie.director;
    const desc = movie.description;

    // Insert movie card into DOM
    apiResponseDOM.insertAdjacentHTML(
      "beforeend",
      `
      <div class="movie-card">
        <div class="card-front">
            <h2>${title}</h2>
            <h3>${japaneseTitle}</h3>
            <img src="${image}" class="movie-image" alt="Movie poster of ${title}" />
        </div>
        <div class="card-back">
            <h3>Plot: ${desc}</h3>
            <h3>Rotten Tomatoes Score: ${score}</h3>
            <h3>Release Date: ${date}</h3>
            <h3>Director: ${director}</h3>
        </div>
      </div>
      `
    );
  });
};

// Call insertHTML to load movies into the DOM
insertHTML();

const gameStart = async () => {
  const movies = await fetchData(filmURL);
  const gameImageContainer = document.querySelector("#game-image-container");
  let correctMovieIndex = null;

  function getRandomMovies() {
    const randomMovies = [];
    while (randomMovies.length < 4) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      if (!randomMovies.includes(movies[randomIndex])) {
        randomMovies.push(movies[randomIndex]);
      }
    }
    return randomMovies;
  }

  function displayQuiz() {
    const randomMovies = getRandomMovies();
    function highestRated(movies) {
      let highest = movies[0];

      for (let i = 1; i < movies.length; i++) {
        if (movies[i].rt_score > highest.rt_score) {
          highest = movies[i];
        }
      }

      return highest;
    }

    gameImageContainer.innerHTML = "";

    randomMovies.forEach((movie, index) => {
      gameImageContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="movie-option" data-index="${index}">
          <img src="${movie.image}" alt="Movie option ${index + 1}" />
        </div>`
      );
    });

    document.querySelectorAll(".movie-option").forEach((option) => {
      option.addEventListener("click", (event) => {
        const selectedIndex = parseInt(event.currentTarget.dataset.index);
        checkAnswer(selectedIndex);
      });
    });
  }

  function checkAnswer(selectedIndex) {
    if (selectedIndex === correctMovieIndex) {
      alert("Correct! Well done.");
    } else {
      alert("Wrong! Try again.");
    }
    displayQuiz();
  }

  displayQuiz();
};

gameStart();

const DOMSelectors = {
  filterDropdown: document.querySelectorAll(".filter-dropdown"),
  resetButton: document.querySelector("#reset-button"),
};

const filterMap = {
  director: "director",
  decade: "decade",
};

function filterMovies(filterType, filterValue) {
  const filteredMovies = movies.filter((movie) => {
    return movie[filterType].includes(filterValue);
  });
  showMovies(filteredMovies);
}

DOMSelectors.filterDropdown.forEach((dropdown) => {
  const button = dropdown.querySelector("button");
  dropdown.querySelectorAll("a").forEach((item) => {
    item.addEventListener("click", (event) => {
      const filterCategory = button.id;
      const filterKey = filterMap[filterCategory];
      const filterValue = event.target.textContent;

      filterMovies(filterKey, filterValue);
    });
  });
});

function showMovies(moviesDisplayed) {
  const apiResponseDOM = document.querySelector(".api-response");
  apiResponseDOM.innerHTML = "";
  moviesDisplayed.forEach((movie) => movieAdd(movie));
}
