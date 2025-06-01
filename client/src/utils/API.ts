import axios from "axios";

class API {
  private address = "http://localhost:8080/api/v1";
  private token = localStorage.getItem("token");
  private route = axios.create({
    baseURL: `${this.address}`,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.token}` },
  });

  public Auth = async (): Promise<Boolean> => {
    if (this.token) {
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
    const res = await this.route.get(path);
    return { data: res.data, status: res.status };
  };

  public POST = async (path: string, data: object) => {
    const res = await this.route.post(path, data);
    return { data: res.data, status: res.status };
  };

  public PUT = async (path: string, data: object) => {
    const res = await this.route.put(path, data);
    return { data: res.data, status: res.status };
  };

  public DELETE = async (path: string) => {
    const res = await this.route.delete(path);
    return { data: res.data, status: res.status };
  };
}

export default new API();
