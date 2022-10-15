import axios from 'axios';

const api = {
    getData: async () => {
      return await axios.get('https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json');
    },
}

export default api;