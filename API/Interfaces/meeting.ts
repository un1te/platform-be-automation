export interface MeetingCreatePayload {
    employeeName: string,
    employeeRole: string,
    roleId: string,
    companyName: string,
    industryName: string
}

export interface meetingResponse {
    data: responseData,
    status: number

}
export interface responseData{
    id: number,
    employeeName: string,
    companyName: string,
    industryName: string,
    status: string,
    createdAt: string
    updatedAt: string
    startedAt: string | null,
    finishedAt: string | null,
    isContactMeClicked: boolean;
    isContactMyColleagueClicked: boolean
    roleId: string
}

export interface meetings {
    data: responseData[];
}

export interface changeMeetingStatusPayload {
    status: string
}

export interface employeesResponse {
    id: string,
    employeeName: string,
    employeeEmail: string,
    employeeRole: string,
    companyName: string,
    industryName: string
}

export interface activeMeetingResponse {
    activeMeeting: activeMeeting;
}

export interface activeMeeting{
    id: number,
    userId: string,
    employeeName: string,
    roleId: string
    companyName: string,
    industryName: string,
    status: string,
    notes: string | null,
    createdAt: string,
    updatedAt: string,
    startedAt: string,
    finishedAt: string | null
}