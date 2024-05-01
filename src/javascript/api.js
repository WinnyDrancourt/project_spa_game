import { API_KEY } from "./api_key";

const urlG = 'https://api.rawg.io/api/games'

export const fetchGame = async (argument) => {
  const response = await fetch(`${urlG}/${argument}?key=${API_KEY}`);
  console.log(response);
  return response.json();
};

export const fetchGameTrailer = async (argument) => {
  const response = await fetch(`${urlG}/${argument}/movies?key=${API_KEY}`);
  console.log(response);
  return response.json();
};

export const fetchGameSreen = async (argument) => {
  const response = await fetch(`${urlG}/${argument}/screenshots?key=${API_KEY}`);
  console.log(response);
  return response.json();
};

export const fetchList = async (url, argument, pageSize, platId) => {
  let fetchUrl = url;
  if (argument.length === 0 && platId.length === 0){
    fetchUrl += `&page_size=${pageSize}`;
    console.log(fetchUrl);
  }else if (platId.length === 0){
    fetchUrl += `&page_size=${pageSize}&search=${argument}`;
    console.log(fetchUrl);
  }else if (argument.length === 0) {
    fetchUrl += `&page_size=${pageSize}&parent_platforms=${platId}`;
    console.log(fetchUrl);
  }else{
    fetchUrl += `&page_size=${pageSize}&parent_platforms=${platId}&search=${argument}`;
    console.log(fetchUrl);
  }

  const response = await fetch(fetchUrl);
  return response.json();
};

export const fetchListDev = async (url, argument, pageSize, platId, devId) => {
  let fetchUrl = url;
  if (argument.length === 0 && platId.length === 0){
    fetchUrl += `&page_size=${pageSize}&developers=${devId}`;
    console.log(fetchUrl);
  }else if (platId.length === 0){
    fetchUrl += `&page_size=${pageSize}&search=${argument}&developers=${devId}`;
    console.log(fetchUrl);
  }else if (argument.length === 0) {
    fetchUrl += `&page_size=${pageSize}&parent_platforms=${platId}&developers=${devId}`;
    console.log(fetchUrl);
  }else{
    fetchUrl += `&page_size=${pageSize}&parent_platforms=${platId}&search=${argument}&developers=${devId}`;
    console.log(fetchUrl);
  }

  const response = await fetch(fetchUrl);
  return response.json();
};

export const fetchListGenres = async (url, argument, pageSize, platId, genreId) => {
  let fetchUrl = url;
  if (argument.length === 0 && platId.length === 0){
    fetchUrl += `&page_size=${pageSize}&genres=${genreId}`;
    console.log(fetchUrl);
  }else if (platId.length === 0){
    fetchUrl += `&page_size=${pageSize}&search=${argument}&genres=${genreId}`;
    console.log(fetchUrl);
  }else if (argument.length === 0) {
    fetchUrl += `&page_size=${pageSize}&parent_platforms=${platId}&genres=${genreId}`;
    console.log(fetchUrl);
  }else{
    fetchUrl += `&page_size=${pageSize}&parent_platforms=${platId}&search=${argument}&genres=${genreId}`;
    console.log(fetchUrl);
  }

  const response = await fetch(fetchUrl);
  return response.json();
};

export const fetchListTag = async (url, argument, pageSize, platId, tagId) => {
  let fetchUrl = url;
  if (argument.length === 0 && platId.length === 0){
    fetchUrl += `&page_size=${pageSize}&tags=${tagId}`;
    console.log(fetchUrl);
  }else if (platId.length === 0){
    fetchUrl += `&page_size=${pageSize}&search=${argument}&tags=${tagId}`;
    console.log(fetchUrl);
  }else if (argument.length === 0) {
    fetchUrl += `&page_size=${pageSize}&parent_platforms=${platId}&tags=${tagId}`;
    console.log(fetchUrl);
  }else{
    fetchUrl += `&page_size=${pageSize}&parent_platforms=${platId}&search=${argument}&tags=${tagId}`;
    console.log(fetchUrl);
  }

  const response = await fetch(fetchUrl);
  return response.json();
};

export const fetchChoice = async (url, search, pageSize, platId, devId, genreId, tagId)=>{
  try {
    let list;
    if (devId !== null) {
      return list = await fetchListDev(url, search,pageSize, platId, devId);
    }else if (tagId !== null){
      return list = await fetchListTag(url, search,pageSize, platId, tagId);
    }else if (genreId !== null){
      return list = await fetchListGenres(url, search,pageSize, platId, genreId);
    }else{
      return list = await fetchList(url, search, pageSize, platId);
    }
  }catch (error){
    console.error('Error fetch :', error);
  }
};
