import { create } from 'apisauce';
import config from '../config.json';

const URL = config.development.API_URL;
const apiClient = create({
  baseURL: `${URL}/backend`,
});


 

export default apiClient;
