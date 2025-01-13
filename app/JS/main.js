const filmURL = "https://ghibliapi.vercel.app/films";

const fetchData = async (apiURL) => {
  try {
    const response = await fetch(apiURL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

let correctAnswers = 0;
let currentRound = 0;
const gameRounds = 5;

const getRandomMovies = (movies, count) => {
  const randomMovies = [];
  const usedScores = new Set();

  while (randomMovies.length < count) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const movie = movies[randomIndex];

    if (!usedScores.has(movie.rt_score)) {
      randomMovies.push(movie);
      usedScores.add(movie.rt_score);
    }
  }

  return randomMovies;
};

const getHighestRatedIndex = (movies) => {
  let highestRatedIndex = 0;

  for (let i = 1; i < movies.length; i++) {
    if (Number(movies[i].rt_score) === 100) {
      return i;
    } else if (
      Number(movies[i].rt_score) > Number(movies[highestRatedIndex].rt_score)
    ) {
      highestRatedIndex = i;
    }
  }

  return highestRatedIndex;
};

const displayOptions = (movies, gameContainer) => {
  gameContainer.innerHTML = "";

  movies.forEach((movie, index) => {
    gameContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="movie-option" data-index="${index}">
        <img src="${movie.image}" alt="${movie.title}" />
      </div>`
    );
  });
};

const handleGameOver = (scoreContainer, gameContainer) => {
  if (correctAnswers === gameRounds) {
    scoreContainer.insertAdjacentHTML(
      "beforeend",
      `<h5>CONGRATS! You got all the questions right!</h5>`
    );
  } else {
    scoreContainer.insertAdjacentHTML(
      "beforeend",
      `<h5>Game Over! You got ${correctAnswers} out of ${gameRounds} correct.</h5>`
    );
  }

  gameContainer.innerHTML = `<button id="replay">Replay</button>`;
  document.querySelector("#replay").addEventListener("click", () => {
    scoreContainer.innerHTML = "";
    resetGame();
  });
};

const displayQuiz = (movies, gameContainer, scoreContainer) => {
  if (currentRound === gameRounds) {
    handleGameOver(scoreContainer, gameContainer);
    return;
  }

  const randomMovies = getRandomMovies(movies, 4);
  const correctMovieIndex = getHighestRatedIndex(randomMovies);

  displayOptions(randomMovies, gameContainer);

  document.querySelectorAll(".movie-option").forEach((option) => {
    option.addEventListener("click", (event) => {
      const selectedIndex = event.currentTarget.dataset.index;
      if (selectedIndex == correctMovieIndex) {
        correctAnswers++;
      }
      currentRound++;
      displayQuiz(movies, gameContainer, scoreContainer);
    });
  });
};

const resetGame = async () => {
  correctAnswers = 0;
  currentRound = 0;
  startGame();
};

const startGame = async () => {
  const movies = await fetchData(filmURL);
  const gameContainer = document.querySelector("#game-container");
  const scoreContainer = document.querySelector("#score-container");
  displayQuiz(movies, gameContainer, scoreContainer);
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
