import axios from './axios';

class AxiosInstance {

    constructor(){
        this.axios = axios;
    }

    get(url, object){
        return this.axios.get(url, object);
    }

    post(url, object){
        return this.axios.post(url, object);
    }

    put(url, object){
        return this.axios.put(url, object);
    }

    delete(url, object){
        return this.axios.delete(url, object);
    }


}

export default new AxiosInstance();