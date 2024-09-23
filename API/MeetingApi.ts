import {getAxiosInstance} from "../helpers/utils/axiosInstance";
import {
    activeMeetingResponse,
    changeMeetingStatusPayload,
    employeesResponse,
    MeetingCreatePayload,
    meetingResponse, responseData
} from "./Interfaces/meeting";
import axios from "axios";

export default class meetingApi {
    public async createNewMeeting(payload: MeetingCreatePayload ): Promise<meetingResponse> {
        const axiosInstance = await getAxiosInstance();
        return await axiosInstance.post('/meetings', payload);
    }

    async deleteMeetingById(id: number): Promise<any> {
        const axiosInstance = await getAxiosInstance();
        try {
            return await axiosInstance.delete('/meetings/' + id);

        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                return error.response.status;
            }
            throw error;
        }
    }

    async deleteAllMeetings() {
        const axiosInstance = await getAxiosInstance();
        return axiosInstance.delete('/meetings/all');

    }

    async getMeetings():Promise<responseData[]> {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get('/meetings/');
        return response.data.data;
    }

    public async changeMeetingStatus(meetingId: number, payload: changeMeetingStatusPayload ): Promise<meetingResponse> {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.patch('/meetings/'+ meetingId, payload);
        return response.data;
    }

    public async searchEmployee(employeeName: string): Promise<employeesResponse[]> {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get('/meetings/search-employees?name='+ employeeName);
        return response.data;
    }

    public async checkActiveMeeting(): Promise<activeMeetingResponse> {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get('/settings');
        return response.data
    }
}