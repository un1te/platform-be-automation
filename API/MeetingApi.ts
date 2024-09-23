import {getAxiosInstance} from "../helpers/utils/axiosInstance";
import {changeMeetingStatusPayload, MeetingCreatePayload, response} from "./Interfaces/meeting";

export default class meetingApi {
    public async createNewMeeting(payload: MeetingCreatePayload ): Promise<response> {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.post('/meetings', payload);
        return response.data;
    }

    async deleteMeetingById(id: number) {
        const axiosInstance = await getAxiosInstance();
        await axiosInstance.delete('/meetings/' + id);
    }

    async deleteAllMeetings() {
        const axiosInstance = await getAxiosInstance();
        await axiosInstance.delete('/meetings/all');
    }

    async getMeetings():Promise<response> {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get('/meetings/');
        return response.data.data;
    }

    public async changeMeetingStatus(meetingId: number, payload: changeMeetingStatusPayload ): Promise<response> {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.patch('/meetings/'+ meetingId, payload);
        return response.data;
    }
}