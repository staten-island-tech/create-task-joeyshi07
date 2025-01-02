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
    const japaneseTitle = item.original_title;
    const date = item.release_date;
    const score = item.rt_score;
    const director = item.director;
    const desc = item.description;
    const people = item.people;
    const locations = item.locations;
    const film_id = item.id;

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
  });
};

insertHTML();
