import { fetchChoice, fetchGame } from "./api";

const searchBox = document.getElementById('game-search'); 

export const PageList = (argument = '') => {
  let pageSize = 9;

  const preparePage = async () => {
    let devId = null;
    let tagId = null;
    let genreId = null;
    let platformId = null;

    const argumentParts = argument.split('=');
    if (argumentParts.length === 2) {
      const argumentName = argumentParts[0];
      const argumentValue = argumentParts[1];
      switch (argumentName) {
        case 'devId':
          devId = argumentValue;
          break;
        case 'tagId':
          tagId = argumentValue;
          break;
        case 'genreId':
          genreId = argumentValue;
          break;
        case 'platId':
          platformId = [argumentValue];
          console.log(platformId);
          break;
        default:
          break;
      }
    }
    const search = searchBox.value.trim();
    platformId = Array.from(document.querySelectorAll('#platform-filter input:checked')).map(checkbox => checkbox.value);

    let result = await fetchChoice(search, pageSize, platformId, devId, genreId, tagId);
    displayResults(result.results);


};
    
  const displayResults = async (articles) => {
    const resultsContent = await Promise.all(articles.map(async (article) => {
      let more = await fetchGame(article.id);
      let publisher = more.publishers.map(publisher=> publisher.name).join(', ');
      console.log(publisher);
      const platformsList = article.parent_platforms.map(platform => platform.platform.name).join(', ');
      const genres = article.genres.map(genre=> genre.name).join(', ');
      return (
        `<article class="cardGame" data-release-date='Release in : ${article.released}' data-publisher='Publishers : ${publisher}' data-genres='Genres : ${genres}'>
<a href="#pagedetail/${article.id}"><img src="${article.background_image}"></a>
<h1>${article.name}</h1>
<p>Plateformes: ${platformsList}</p>
</article>`
      );
    }));

    const resultsContainer = document.querySelector('.page-list .articles');
    resultsContainer.innerHTML = resultsContent.join("\n");
  };

  const showMore = () => {
    pageSize += 9;
    preparePage();
    if (pageSize >=27) {
      const showMoreBtn = document.querySelector('.show-more-btn');
      showMoreBtn.style.display = 'none';
    }
  };

  const render = () => {
    const pageContent = document.querySelector('#page-content');
    pageContent.innerHTML = `
<section class="page-list">
  <div id='presentation'>
    <h2>Welcome,</h2>
    <p>The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
      the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
      brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
      groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
      with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p>
  </div>

  <div class="filter-container">
    <div id="platform-filter">
      <h3>Platform :</h3>
      <input type="checkbox" id="pc" value="1">
      <label for="pc">PC</label>
      <input type="checkbox" id="playstation" value="2">
      <label for="playstation">PlayStation</label>
      <input type="checkbox" id="xbox" value="3">
      <label for="xbox">Xbox</label>
      <input type="checkbox" id="nintendo" value="7">
      <label for="nintendo">Nintendo</label>
    </div>
  </div>
  <div class="articles">Loading...</div>
  <button class="show-more-btn">Show More</button>
</section>
`;

    const showMoreBtn = document.querySelector('.show-more-btn');
    showMoreBtn.addEventListener('click', showMore);

    searchBox.addEventListener('keyup', preparePage);

    const platformCheckboxes = document.querySelectorAll('#platform-filter input');
    platformCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', preparePage);
    });

    preparePage();

      
  };

  render();

};
