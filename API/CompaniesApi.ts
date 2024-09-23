import {getAxiosInstance} from "../helpers/utils/axiosInstance";
import {Response, CompanyParams} from "./Interfaces/companies";

export default class CompaniesApi {

    public async getCompanies(params: CompanyParams ): Promise<Response> {
        const axiosInstance = await getAxiosInstance();
        const filteredParams = Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        const response = await axiosInstance.get(`/companies?${filteredParams}`);
        return response.data;
    }

    public async getFeaturedCompanies(meetingId: number ): Promise<Response> {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get('/companies/featured?meetingId='+ meetingId);
        return response.data;
    }
}