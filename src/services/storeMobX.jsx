import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class ToDoList {
  data = [];
  loading = false;
  error = null;
  api = "http://37.27.29.18:8001/api/to-dos";
  constructor() {
    makeAutoObservable(this);
  }

  async getToDos() {
    this.loading = true;
    this.error = null;
    try {
      let { data } = await axios.get(this.api);
      let result = data?.data;

      runInAction(() => {
        this.data = result;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.loading = false;
      });
    }
  }
  async addToDos(formData) {
    try {
      await axios.post(this.api, formData);
      await this.getToDos();
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = error.message;
      });
    }
  }
  async deleteToDos(id) {
    try {
      await axios.delete(`${this.api}?id=${id}`);
      await this.getToDos();
    } catch (error) {
      console.error(error);
    }
  }
  async editToDos(updated) {
    try {
      await axios.put(this.api, updated);
      await this.getToDos();
    } catch (error) {
      console.error(error);
    }
  }
  async addImageToDos(id, form) {
    try {
      await axios.post(`${this.api}/${id}/images`, form);
      await this.getToDos();
    } catch (error) {
      console.error(error);
    }
  }
  async deleteImageToDos(id) {
    try {
      await axios.delete(`${this.api}/images/${id}`);
      await this.getToDos();
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ToDoList();
