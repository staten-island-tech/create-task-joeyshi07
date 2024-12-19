import "../CSS/style.css";

const apiURL = "https://ghibliapi.vercel.app/films";

async function fetchData(apiURL) {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching movie data", error);
    return []; // return empty array if there is an error
  }
}

const insertHTML = async () => {
  const movies = await fetchData(apiURL);
  const apiResponseDOM = document.querySelector(".api-response"); // Corrected to query by class name

  // If no movies, show a message
  if (movies.length === 0) {
    apiResponseDOM.innerHTML = "<p>No movies found or error fetching data.</p>";
    return;
  }

  movies.forEach((item) => {
    const title = item.title;
    const image = item.image; // Placeholder image if no image URL
    apiResponseDOM.insertAdjacentHTML(
      "beforeend",
      `
      <div class="movie">
        <h3>Title: ${title}</h3>
        <img src="${image}" class = "movie-image" alt="Movie poster of ${title}" />
      </div>
      `
    );
  });
};

insertHTML();
