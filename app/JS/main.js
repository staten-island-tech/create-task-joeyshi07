const filmURL = "https://ghibliapi.vercel.app/films";

async function fetchData(apiURL) {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

let correctAnswers = 0;
let currentRound = 0;
const gameRounds = 5;

const startGame = async () => {
  const movies = await fetchData(filmURL);
  const gameContainer = document.querySelector("#game-container");
  const scoreContainer = document.querySelector("#score-container");
  let correctMovieIndex;

  const displayQuiz = () => {
    if (currentRound === gameRounds) {
      if (correctAnswers === gameRounds) {
        scoreContainer.insertAdjacentHTML(
          "beforeend",
          `<p> CONGRATS! You got all the questions right!</p>`
        );
      } else {
        scoreContainer.insertAdjacentHTML(
          "beforeend",
          `<p> Game Over! You got ${correctAnswers} out of ${gameRounds} Correct. </p>`
        );
      }
      gameContainer.innerHTML = `<button id="replay">Replay</button>`;

      document.querySelector("#replay").addEventListener("click", () => {
        scoreContainer.innerHTML = "";
        resetGame();
      });

      return;
    }

    const randomMovies = [];
    const usedScores = new Set();

    while (randomMovies.length < 4) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      const movie = movies[randomIndex];

      if (!usedScores.has(movie.rt_score)) {
        randomMovies.push(movie);
        usedScores.add(movie.rt_score);
      }
    }
    let highestRatedMovie = randomMovies[0];
    correctMovieIndex = 0;

    for (let i = 1; i < randomMovies.length; i++) {
      if (Number(randomMovies[i].rt_score) === "100") {
        highestRatedMovie = randomMovies[i];
        correctMovieIndex = i;
        break;
      } else if (
        Number(randomMovies[i].rt_score) > Number(highestRatedMovie.rt_score)
      ) {
        highestRatedMovie = randomMovies[i];
        correctMovieIndex = i;
      }
    }

    gameContainer.innerHTML = "";
    randomMovies.forEach((movie, index) => {
      gameContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="movie-option" data-index="${index}">
          <img src="${movie.image}" alt="${movie.title}" />
        </div>`
      );
    });

    document.querySelectorAll(".movie-option").forEach((option) => {
      option.addEventListener("click", (event) => {
        const selectedIndex = event.currentTarget.dataset.index;
        if (selectedIndex == correctMovieIndex) {
          correctAnswers++;
        }
        currentRound++;
        displayQuiz();
      });
    });
  };

  displayQuiz();
};

const resetGame = () => {
  correctAnswers = 0;
  currentRound = 0;
  startGame();
};

startGame();

const showMovies = async () => {
  const movies = await fetchData(filmURL);
  const apiResponseDOM = document.querySelector(".api-response");
  apiResponseDOM.innerHTML = "";
  movies.forEach((movie) => {
    apiResponseDOM.insertAdjacentHTML(
      "beforeend",
      `<div class="movie-card">
      <div class="card-front">
      <h3>${movie.title}</h3>
        <h4>${movie.original_title}</h4>
        <img src="${movie.movie_banner}" alt="${movie.title}" />
        <p>Director: ${movie.director}</p>
        <p>Release Date: ${movie.release_date}</p></div>
      

         <div class = "card-back">
            <p>Plot: ${movie.description}</p>
        </div>
      </div>`
    );
  });
};

showMovies();
