import axios from "axios";

export default class AdminService{
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/admin';
    }

    async createUser(payload){
        axios.defaults.withCredentials = true
        const response = axios.post(this.baseUrl + `/createUser`, payload)

        const getBody = await response

        return getBody
    }
}