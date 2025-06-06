import axios from "axios";

class API {
  private address = "http://localhost:8080/api/v1";
  private route = axios.create({ baseURL: `${this.address}` });

  public Auth = async (): Promise<Boolean> => {
    this.route.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    if (localStorage.getItem("token")) {
      try {
        const { status } = await this.route.get(`${this.address}/account`);

        if (status === 200) {
          return true;
        }
      } catch (error) {
        localStorage.removeItem("token");
        return false;
      }
    }
    return false;
  };

  public GET = async (path: string) => {
    try {
      this.route.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      const res = await this.route.get(path);
      return { data: res.data, status: res.status };
    }
    catch (error) {
      return { errors: error.response.data.errors };
    }
  };

  public POST = async (path: string, data: object) => {
    try {
      this.route.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      const res = await this.route.post(path, data);
      return { data: res.data, status: res.status };
    }
    catch (error) {
      return { errors: error.response.data.errors };
    }
  };

  public PUT = async (path: string, data: object) => {
    try {
      this.route.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      const res = await this.route.put(path, data);
      return { data: res.data, status: res.status };
    }
    catch (error) {
      return { errors: error.response.data.errors };
    }
  };

  public DELETE = async (path: string) => {
    try {
      this.route.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      const res = await this.route.delete(path);
      return { data: res.data, status: res.status };
    }
    catch (error) {
      return { errors: error.response.data.errors };
    }
  };
}

export default new API();
