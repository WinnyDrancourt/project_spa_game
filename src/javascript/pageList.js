import { fetchList } from "./api";

const searchBox = document.getElementById('game-search'); 

export const PageList = (argument = '') => {
  let pageSize = 9;
  const preparePage = async () => {
    const cleanArgument = argument.trim().replace(/\s+/g, '-');
    const search = searchBox.value.trim();
    let cleanedArgument;
    if (search.length > 3) {
      cleanedArgument = search;
    }else{
      cleanedArgument = cleanArgument;
    }

    const platformFilter = Array.from(document.querySelectorAll('#platform-filter input:checked')).map(checkbox => checkbox.value);


    try {
      const list = await fetchList(cleanedArgument, pageSize);
      displayResults(list.results, platformFilter);
    }catch (error){
      console.error('Error fetch :', error);
    }
  };


  const displayResults = (articles, platformFilter) => {
    const filteredArticles = platformFilter.length > 0 ? articles.filter(article => article.parent_platforms.some(platform => platform.platform.slug && platformFilter.includes(platform.platform.slug))) : articles;


    if (filteredArticles.length < 9) {
      pageSize += 9;
      preparePage();
      return;
    }

    const resultsContent = filteredArticles.map((article) => {
      const platformsList = article.parent_platforms.map(platform => platform.platform.name).join(', ');
      return (
        `<article class="cardGame">
<a href="#pagedetail/${article.id}"><img src="${article.background_image}"></a>
<h1>${article.name}</h1>
<p>Plateformes: ${platformsList}</p>
</article>`
      );
    });

    const resultsContainer = document.querySelector('.page-list .articles');
    resultsContainer.innerHTML = resultsContent.join("\n");
  };

  const showMore = () => {
    pageSize += 9;
    preparePage();
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
      <input type="checkbox" id="pc" value="pc">
      <label for="pc">PC</label>
      <input type="checkbox" id="playstation" value="playstation">
      <label for="playstation">PlayStation</label>
      <input type="checkbox" id="xbox" value="xbox">
      <label for="xbox">Xbox</label>
      <input type="checkbox" id="nintendo" value="nintendo">
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

    document.getElementById('platform-filter').addEventListener('change', preparePage);

    preparePage();
  };

  render();

};
