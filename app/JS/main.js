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
  const insert = await fetchData(apiURL);
  const apiResponseDOM = document.getElementById("api-response");
  const title = insert.title;
  const
  apiResponseDOM.insertHTML = `title: `

  insert.
};
