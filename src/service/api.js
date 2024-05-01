import axios from 'axios';

// const baseURL = "http://localhost:5000/api";
const baseURL = 'http://3.141.177.7:5020/api';

// Changed IP due to new Elastic IP. 
const instance = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'http://3.141.177.7:5020/api',
});

export default instance;

// User API's
// GET USER BY ID
export const getUserById = (id) => axios.get(`${baseURL}/users/${id}`);

// VALIDATE USER
export const validateUser = (userData) => axios.post(`${baseURL}/user/find`, userData);
// UPDATE USER PASSWORD
export const updatePassword = (updatedData) => {
  // debugger;
  return axios.put(`${baseURL}/user/change-password`, updatedData);
};

// Games API's
// GET GAMES
export const getGames = () => axios.get(`${baseURL}/games`);

// GET GAME BY ID
export const getGameById = (id) => axios.get(`${baseURL}/games/${id}`);

// CREATE GAME
export const addGame = (GameData) => axios.post(`${baseURL}/games`, GameData);

// UPDATE GAME
export const addGameReview = (GameId, updatedGameData) => axios.put(`${baseURL}/games/${GameId}`, updatedGameData);

// DELETE GAME
export const deleteGame = (GameId) => axios.delete(`${baseURL}/games/${GameId}`);

// SEARCH GAME
export const searchGame = (searchTerm) => instance.get(`/games/search?q=${searchTerm}`);
