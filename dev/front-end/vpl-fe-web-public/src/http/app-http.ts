import axios, { AxiosInstance } from "axios";

export default class AppHttp {
    private static myInstance: AxiosInstance;

    static get instance(): AxiosInstance {
        return AppHttp.myInstance ??= axios.create({
            baseURL: import.meta.env.VITE_API_URL
        });
    }
}
