import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FrienderApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = endpoint === `auth/register` ?
    { Authorization: `Bearer ${FrienderApi.token}`,
      'Content-Type': 'multipart/form-data' } :
    { Authorization: `Bearer ${FrienderApi.token}`}

    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the user. */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    console.log("login=iluabcbeca",data)
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /**get all potential matches */

  static async getAllPotentialMatch(username){
    let res = await this.request(`users/${username}/matches/potential`);
    return res.allPotentialMatches
  }

  /**get all successful matches  */

  static async getAllSuccessfulMatch(username){
    let res = await this.request(`users/${username}/matches/successful`);
    return res.allSuccessfulMatches
  }

  /** delete a potential match */
  static async deleteMatch(id){
    let res = await this.request(`matches/potential/${id}`, {}, "delete");
    return res
  }

  /** like a potential match */
  static async likeMatch(username, id){
    let res = await this.request(`users/${username}/matches/${id}`, {}, "patch");
    return res
  }

}


export default FrienderApi;
