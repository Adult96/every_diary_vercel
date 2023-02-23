import axios from 'axios';

export default class Axios {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
    });
  }

  async get(path, option) {
    return axios.get(`${this.instance}${path}`, option);
  }

  async post(path, payload) {
    return axios.post(`${this.instance}${path}`, payload);
  }

  async delete(path, payload) {
    return axios.delete(
      `${process.env.REACT_APP_DIARY_API_KEY}${path}/${payload}`
    );
  }

  async patch(path, payload, option) {
    return axios.patch(
      `${process.env.REACT_APP_DIARY_API_KEY}${path}/${payload}`,
      option
    );
  }
}
