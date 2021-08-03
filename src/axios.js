import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-clone-e2792.cloudfunctions.net/api' //API url
    //http://localhost:5001/clone-e2792/us-central1/api
});
 
export default instance;