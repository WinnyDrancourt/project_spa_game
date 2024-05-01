import { fetchGame, fetchGameTrailer, fetchGameSreen } from "./api";

export const PageDetail = (argument = '') => {
  const preparePage = async () => {
    try {
      const cleanedArgument = argument.trim().replace(/\s+/g, "-");

      const gameData = await fetchGame(cleanedArgument);
      const trailerData = await fetchGameTrailer(cleanedArgument);
      const screenData = await fetchGameSreen(cleanedArgument);

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
    <div class='imgContainer'>
    <img class="img" src="">
        <a class='external' href=''>Check Website</a>
      </div>
    <div class='content'>
    <div id='title'>
      <h2 class="title"></h2>
      <p id='rating'></p>
    </div>
    <p class="description"></p>
    <div class='about'>
      <div>
        <p><strong>Release Date :</strong></p>
        <p class="release-date"><span></span></p>
      </div>
      <div>
        <p><strong>Developer :</strong></p>
        <ul class="dev"></ul>
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
    <h3 class='trailer'>Trailer</h3>
    <div class='trailer'></div>
    <h3>Screenshots</h3>
    <div class='screenshots'></div>
  </div>
    </div>
</section>
`;


    preparePage();
  };

  render();
};

const displayGame = async (gameData, trailerData, screenData) => {
  const { name, released, description, background_image, developers, parent_platforms, publishers, genres, tags, stores, rating, ratings_count, website} = gameData;
  const articleDOM = document.querySelector(".page-detail .article");
  articleDOM.querySelector("h2.title").innerHTML = name;
  articleDOM.querySelector("p#rating").innerHTML = `${rating}/5 - ${ratings_count} votes`;
  articleDOM.querySelector("p.release-date span").innerHTML = released;
  articleDOM.querySelector("p.description").innerHTML = description;
  developers.forEach((dev)=>{
    articleDOM.querySelector("ul.dev").innerHTML += `<li><a href='#pagelist/devId=${dev.id}'>${dev.name}</a></li>`;});
  articleDOM.querySelector("p.publisher").innerHTML = publishers[0].name;
  parent_platforms.forEach((platform)=>{
    articleDOM.querySelector("ul.platform").innerHTML +=`<li><a href='#pagelist/platId=${platform.platform.id}'>${platform.platform.name}</li>`;});
  let genresList = genres.map(genre => `<a href='#pagelist/genreId=${genre.id}'>${genre.name}</a>`).join(', ');
  articleDOM.querySelector("p.genres").innerHTML =genresList;
  let tagsList = tags.map(tag => `<a href='#pagelist/tagId=${tag.id}'>${tag.name}</a>`).join(', ');
  articleDOM.querySelector("p.tags").innerHTML =tagsList;
  stores.forEach((store)=>{
    articleDOM.querySelector("ul.store").innerHTML +=`<li><a href='http://${store.store.domain}'>${store.store.name}</li>`;});
  articleDOM.querySelector("img.img").src = background_image;
  articleDOM.querySelector('a.external').href = website;
  if (trailerData.results.length > 0) {
    articleDOM.querySelector("div.trailer").innerHTML = `<video width="100%" controls><source src='${trailerData.results[0].data.max}' type='video/mp4'></video>`;
  }else{
    articleDOM.querySelector('h3.trailer').style.display = 'none';}
  let screenList = screenData.results.slice(0, 4).map(screen => `<div class='screen'><img src="${screen.image}"></div>`).join('');
  articleDOM.querySelector(".screenshots").innerHTML = screenList;

};
