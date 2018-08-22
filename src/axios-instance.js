import axios from 'axios'


const instance= axios.create({
    baseURL: 'https://react-burger-65c1d.firebaseio.com/'
})

export default instance;