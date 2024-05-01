import { API_KEY } from "./api_key";
const url = 'https://api.rawg.io/api/games'

export const fetchGame = async (argument) => {
  const response = await fetch(`${url}/${argument}?key=${API_KEY}`);
  return response.json();
};

export const fetchGameTrailer = async (argument) => {
  const response = await fetch(`${url}/${argument}/movies?key=${API_KEY}`);
  return response.json();
};

export const fetchGameSreen = async (argument) => {
  const response = await fetch(`${url}/${argument}/screenshots?key=${API_KEY}`);
  return response.json();
};

export const fetchList = async (argument, pageSize, platId) => {
  let fetchUrl = url;
  if (argument.length === 0 && platId.length === 0){
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}`;
  }else if (platId.length === 0){
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&search=${argument}&ordering=-released`;
  }else if (argument.length === 0) {
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&parent_platforms=${platId}&ordering=-released`;
  }else{
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&parent_platforms=${platId}&search=${argument}&ordering=-released`;
  }

  const response = await fetch(fetchUrl);
  return response.json();
};

export const fetchListDev = async (argument, pageSize, platId, devId) => {
  let fetchUrl = url;
  if (argument.length === 0 && platId.length === 0){
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&developers=${devId}&ordering=-released`;
  }else if (platId.length === 0){
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&search=${argument}&developers=${devId}&ordering=-released`;
  }else if (argument.length === 0) {
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&parent_platforms=${platId}&developers=${devId}&ordering=-released`;
  }else{
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&parent_platforms=${platId}&search=${argument}&developers=${devId}&ordering=-released`;
  }

  const response = await fetch(fetchUrl);
  return response.json();
};

export const fetchListGenres = async (argument, pageSize, platId, genreId) => {
  let fetchUrl = url;
  if (argument.length === 0 && platId.length === 0){
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&genres=${genreId}&ordering=-released`;
  }else if (platId.length === 0){
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&search=${argument}&genres=${genreId}&ordering=-released`;
  }else if (argument.length === 0) {
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&parent_platforms=${platId}&genres=${genreId}&ordering=-released`;
  }else{
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&parent_platforms=${platId}&search=${argument}&genres=${genreId}&ordering=-released`;
  }

  const response = await fetch(fetchUrl);
  return response.json();
};

export const fetchListTag = async (argument, pageSize, platId, tagId) => {
  let fetchUrl = url;
  if (argument.length === 0 && platId.length === 0){
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&tags=${tagId}&ordering=-released`;
  }else if (platId.length === 0){
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&search=${argument}&tags=${tagId}&ordering=-released`;
  }else if (argument.length === 0) {
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&parent_platforms=${platId}&tags=${tagId}&ordering=-released`;
  }else{
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&parent_platforms=${platId}&search=${argument}&tags=${tagId}&ordering=-released`;
  }

  const response = await fetch(fetchUrl);
  return response.json();
};

export const fetchChoice = async (search, pageSize, platId, devId, genreId, tagId)=>{
try {
      let list;
      if (devId !== null) {
        return list = await fetchListDev(search,pageSize, platId, devId);
      }else if (tagId !== null){
        return list = await fetchListTag(search,pageSize, platId, tagId);
      }else if (genreId !== null){
        return list = await fetchListGenres(search,pageSize, platId, genreId);
      }else{
        return list = await fetchList(search, pageSize, platId);
      }
    }catch (error){
      console.error('Error fetch :', error);
    }
  };
