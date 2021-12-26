import axios from "axios";

export default class WeatherService {

    static async getCityByName(name) {
        const AK = '466b0e43bd22d0829d4cc8843b1487ca';
        const resposne = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${AK}`);
        return resposne;
    }





    static async getAll(limit = 10, page = 1) {
        const resposne = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        });
        return resposne;
    }

    static async getPostByID(id) {
        const resposne = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
        return resposne;
    }

    static async getCommentsByID(id) {
        const resposne = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id + '/comments');
        return resposne;
    }

    static async postNewPost(newPost) {
        const resposne = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
        return resposne;
    }

    static async patchPost(id, patchObj) {
        const resposne = await axios.patch('https://jsonplaceholder.typicode.com/posts/' + id, patchObj);
        return resposne;
    }

}

