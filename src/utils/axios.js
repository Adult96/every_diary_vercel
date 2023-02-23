import axios from 'axios';

export default class Axios {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
    });
  }

  async get(path, option) {
    return this.instance.get(path, option);
  }

  async post(path, payload) {
    return this.instance.post(path, payload);
  }

  async delete(path, payload) {
    return this.instance.delete(`${path}/${payload}`);
  }

  async patch(path, payload, option) {
    return this.instance.patch(`${path}/${payload}`, option);
  }
}
