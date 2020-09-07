import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://react-burger-e3f3a.firebaseio.com/'
});

export default instance;