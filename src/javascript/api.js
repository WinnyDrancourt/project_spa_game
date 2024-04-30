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

export const fetchList = async (argument, pageSize) => {
  let fetchUrl = url;
  if (argument.length === 0){
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}`;
  }else{
    fetchUrl += `?key=${API_KEY}&page_size=${pageSize}&search=${argument}`;
  }

  const response = await fetch(fetchUrl);
  return response.json();
};
