import axios from "axios";

class API {
    private address = "http://localhost:8080/api/v1";
    private route = axios.create({ baseURL: `${this.address}` });

    public Auth = async (): Promise<Boolean> => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            try {
                const { status } = await axios.get(`${this.address}/account`);

                if (status === 200) {
                    localStorage.setItem("token", token);
                    return true;
                }
            } catch (error) {
                console.error("Error on verifying token:", error);
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
