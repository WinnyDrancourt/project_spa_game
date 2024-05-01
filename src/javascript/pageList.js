import { fetchChoice, fetchGame } from "./api";
import { API_KEY } from "./api_key";
import { platformImages } from "./utils";

const searchBox = document.getElementById('game-search'); 

export const PageList = (argument = '') => {
  let pageSize = 9;
  const preparePage = async () => {
    // lecture de l'url pour recuperer les infos et filtrer en consequences
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
          break;
        default:
          break;
      }
    }
    // ecoute de la barre de recherche
    const search = searchBox.value.trim();
    // recuperation du filtre de platforms
    const platformDropdown = document.getElementById('platform-dropdown');
    platformId = platformDropdown.value;
    // dropdown trie
    const orderDropdown = document.getElementById('order-dropdown');
    const orderBy = orderDropdown.value;
    const today = new Date().toISOString().split('T')[0];
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=1990-01-01,${today}`;
    if (orderBy === 'released') {
      url += '&ordering=-released';
    } else if (orderBy === 'rreleased') {
      url += '&ordering=released';
    } else if (orderBy === 'name') {
      url += '&ordering=-name';
    } else if (orderBy === 'rname') {
      url += '&ordering=name';
    } else if (orderBy === 'rating') {
      url += '&ordering=-rating';
    } else if (orderBy === 'rrating') {
      url += '&ordering=rating';
    }

    //Recuperation des resultats filtrer par l'api
    let result = await fetchChoice(url, search, pageSize, platformId, devId, genreId, tagId);
    displayResults(result.results);


  };

  const displayResults = async (articles) => {
    // map des resultats pour recuperer les donne de chaque index
    const resultsContent = await Promise.all(articles.map(async (article) => {
      // ajout pour avoir des infos supplementaire non dispo en search
      let more = await fetchGame(article.id);
      let publisher = more.publishers.map(publisher=> publisher.name).join(', ');
      const platformsList = article.parent_platforms.map(platform =>{
        const name = platform.platform.slug.toLowerCase();
        return platformImages.hasOwnProperty(name)
          ? `<img class='platform-img' src="${platformImages[name]}">`:'';
      }).join(', ');
      const genres = article.genres.map(genre=> genre.name).join(', ');
      return (
        `<article class="cardGame" data-aos="zoom-in-left" data-release-date='Release in : ${article.released}' data-publisher='Publishers : ${publisher}' data-genres='Genres : ${genres}' data-rating='Rating : ${article.rating}'>
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
      <select id="platform-dropdown">
        <option value="">Platform : any</option>
        <option value="1,5,6">PC/Mac/Linux</option>
        <option value="2">PlayStation</option>
        <option value="3">Xbox</option>
        <option value="7">Nintendo</option>
        <option value="4,8">Android/Ios</option>
      </select>
    </div>
    <div id="order-filter">
      <select id="order-dropdown">
        <option value="">Order by : any</option>
        <option value="name">Name</option>
        <option value="rname">Name reverse</option>
        <option value="released">Release Date</option>
        <option value="rreleased">Release Date reverse</option>
        <option value="rating">Rating</option>
        <option value="rrating">Reverse Rating</option>
      </select>
    </div>
  </div>
  <div class="articles">Loading...</div>
  <button class="show-more-btn">Show More</button>
</section>
`;

    const showMoreBtn = document.querySelector('.show-more-btn');
    showMoreBtn.addEventListener('click', showMore);

    searchBox.addEventListener('keyup', preparePage);

    const platformDropdown = document.getElementById('platform-dropdown');
    platformDropdown.addEventListener('change', preparePage);

    const orderDropdown = document.getElementById('order-dropdown');
    orderDropdown.addEventListener('change', preparePage);

    preparePage();

  };

  render();

};

