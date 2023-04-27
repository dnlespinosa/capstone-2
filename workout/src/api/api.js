import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class WorkoutApi {
    static token;

    static async request(endpoint, data={}, method='get') {
        const url = `${BASE_URL}/${endpoint}`
        const headers = { Authorization: `Bearer ${WorkoutApi.token}` };
        const params = (method === 'get')
            ? data 
            : {};
        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message: [message];
        }
    }

    static async getAllUsers() {
        let res = await this.request(`users/`)
        return res
    }

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`)
        return res.user;
    }

    static async login(data){
        let res = await this.request(`auth/token`, data, 'post');
        return res.token
    }

    static async signup(data){
        let res = await this.request(`auth/register`, data, 'post');
        return res.token;
    }

    static async updateProfile(username, data) {
        let res = await this.request(`users/${username}`, data, 'patch');
        return res.user;
    }

    static async getPrograms() {
        let res = await this.request(`browse`);
        return res
    }

    static async getWorkout(handle){
        let res = await this.request(`browse/${handle}`)
        return res.workout
    }

    static async getWorkoutById(id) {
        let res = await this.request(`browse/id/${id}`)
        return res.workout
    }

    static async selectProgram(username, id) {
        await this.request(`users/${username}/browse/${id}`, {}, 'post')
    }

    static async completeWorkout(username, data) {
        let res = await this.request(`users/completed/${username}`, data, 'patch')
        return res.user;
    }
}

export default WorkoutApi;