import { fetchGame, fetchGameTrailer, fetchGameSreen } from "./api";

export const PageDetail = (argument = '') => {
  const preparePage = async () => {
    try {
      const cleanedArgument = argument.trim().replace(/\s+/g, "-");

      const gameData = await fetchGame(cleanedArgument);
      const trailerData = await fetchGameTrailer(cleanedArgument);
      const screenData = await fetchGameSreen(cleanedArgument);
      console.log(screenData);

      displayGame(gameData, trailerData, screenData);
    }catch (error) {
      console.error('Error fetch :', error);
    }
  };

  const render = () => {
    const pageContent = document.querySelector('#page-content');
    pageContent.innerHTML = `
<section class="page-detail">
  <div class="article">
    <img class="img" src="">
    <h2 class="title"></h2>
    <p class="description"></p>
    <div class='about'>
      <div>
        <p><strong>Release Date :</strong></p>
        <p class="release-date"><span></span></p>
      </div>
      <div>
        <p><strong>Developer :</strong></p>
        <p class="dev"></p>
      </div>
      <div>
        <p><strong>Platforms</strong></p>
        <ul class="platform"></ul>
      </div>
      <div>
        <p><strong>Publisher</strong></p>
        <p class="publisher"></p>
      </div>
    </div>
    <div class='more'>
      <div>
        <p><strong>Genres</strong></p>
        <p class="genres"></p>
      </div>
      <div>
        <p><strong>Tags</strong>
        <p class="tags"></p>
      </div>
    </div>
    <h3>Buy</h3>
    <ul class="store"></ul>
    <h3>Trailer</h3>
    <div class='trailer'></div>
    <h3>Screenshots</h3>
    <div class='screenshots'></div>
  </div>
</section>
`;

    preparePage();
  };

  render();
};

const displayGame = async (gameData, trailerData, screenData) => {
  const { name, released, description, background_image, developers, parent_platforms, publishers, genres, tags, stores} = gameData;
  const articleDOM = document.querySelector(".page-detail .article");
  articleDOM.querySelector("h2.title").innerHTML = name;
  articleDOM.querySelector("p.release-date span").innerHTML = released;
  articleDOM.querySelector("p.description").innerHTML = description;
  articleDOM.querySelector("p.dev").innerHTML = developers[0].name;
  articleDOM.querySelector("p.publisher").innerHTML = publishers[0].name;
  parent_platforms.forEach((platform)=>{
    articleDOM.querySelector("ul.platform").innerHTML +=`<li>${platform.platform.name}</li>`;});
  let genresList = genres.map(genre => genre.name).join(', ');
  articleDOM.querySelector("p.genres").innerHTML =genresList;
  let tagsList = tags.map(tag => tag.name).join(', ');
  articleDOM.querySelector("p.tags").innerHTML =tagsList;
  stores.forEach((store)=>{
    articleDOM.querySelector("ul.store").innerHTML +=`<li>${store.store.name}</li>`;});
  articleDOM.querySelector("img.img").src = background_image;
  if (trailerData.results.length > 0) {
    articleDOM.querySelector("div.trailer").innerHTML = `<iframe width="100%" height="525" src="${trailerData.results[0].data.max}" frameborder="0" allowfullscreen></iframe>`;
  }
  let screenList = screenData.results.slice(0, 4).map(screen => `<div class='screen'><img src="${screen.image}"></div>`).join('');
  articleDOM.querySelector(".screenshots").innerHTML = screenList;
};
