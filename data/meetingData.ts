import globalData from './globalData'

function getRandomTestName(): string {
    const name = "test";
    const randomNumbers = Math.floor(1000 + Math.random() * 9000).toString();
    return name + randomNumbers;
}
const statuses = {
    "prepared": "prepared",
    "started": "started",
    "finished": "finished"
}

const createMeetingPayload = {
    "employeeName": getRandomTestName(),
    "employeeRole": getRandomTestName(),
    "roleId": globalData.roleIdCISO,
    "companyName": getRandomTestName(),
    "industryName": getRandomTestName(),
};

const startMeetingPayload = {
    "status": statuses.started
};

const finishMeetingPayload = {
    "status": statuses.finished
};

export default {
    createMeetingPayload,
    statuses,
    startMeetingPayload,
    finishMeetingPayload
}