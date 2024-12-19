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
  }
}

const insertHTML = async () => {
  const movies = await fetchData(apiURL);
  const apiResponseDOM = document.getElementById("api-response");

  movies.forEach((item) => {
    const title = item.title;
    const image = item.image;
    apiResponseDOM.insertAdjacentHTML(
      "beforeend",
      `
      <div class="movie">
        <h3>Title: ${title}</h3>
        <img src="${image}" alt="Movie poster of ${title}" />
      </div>
      `
    );
  });
};

insertHTML();
