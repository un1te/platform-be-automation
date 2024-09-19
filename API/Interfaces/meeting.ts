export interface MeetingCreatePayload {
    employeeName: string,
    employeeRole: string,
    roleId: string,
    companyName: string,
    industryName: string
}

export interface response {
    id: number,
    employeeName: string,
    companyName: string,
    industryName: string,
    status: string,
    createdAt: string
    updatedAt: string
    startedAt: string,
    finishedAt: string,
    isContactMeClicked: boolean;
    isContactMyColleagueClicked: boolean
    roleId: string,
}

export interface changeMeetingStatusPayload {
    status: string
}