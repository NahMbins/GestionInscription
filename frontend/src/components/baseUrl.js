import axios from "axios";

const ExpressAxios = axios.create({
    baseURL:'http://localhost:3001/api/etudiant'
});


export {ExpressAxios}