import { test } from '../fixtures/base';
import meetingData from "../data/meetingData";
import { expect } from "@playwright/test";
import globalData from "../data/globalData";
import { activeMeetingResponse } from "API/Interfaces/meeting";
import { validateMeetingResponseSchema } from "../helpers/helper";

test.describe('Meetings API', () => {
    test.afterEach(async ({meetingApi}) => {
        await meetingApi.deleteAllMeetings();
    });

    test('Create new meeting', async ({meetingApi}) => {
        const response = await meetingApi.createNewMeeting(meetingData.createMeetingPayload);
        const responseData = response.data;

        await test.step("Response code is 200", async () => {
            expect(response.status).toBe(200);
        });

        await test.step("Check the response schema", async () => {
            validateMeetingResponseSchema(responseData)
        });

        await test.step("Check the created meeting status", async () => {
            expect(responseData.status).toEqual(meetingData.statuses.prepared);
        });

        await test.step("Check the created meeting data is correct", async () => {
            expect(responseData.employeeName).toEqual(meetingData.createMeetingPayload.employeeName);
            expect(responseData.companyName).toEqual(meetingData.createMeetingPayload.companyName);
            expect(responseData.industryName).toEqual(meetingData.createMeetingPayload.industryName);
        });
    });

    test('Check the meeting was created', async ({meetingApi}) => {
        const response = await meetingApi.createNewMeeting(meetingData.createMeetingPayload);
        const meetingId = response.data.id;
        const userMeetings = await meetingApi.getMeetings();
        const userMeetingIds = userMeetings.map(meeting => meeting.id);
        await test.step("Check the meeting is created by meeting id", async () => {
            expect(userMeetingIds).toContain(meetingId);
        });
    });

    test('Create new meeting - featured companies', async ({meetingApi, companiesApi}) => {
        const response = await meetingApi.createNewMeeting(meetingData.createMeetingFeaturedCompaniesPayload);
        const responseData = response.data;
        const meetingId = responseData.id;

        await test.step("Response status is 200", async () => {
            expect(response.status).toBe(200);
        });
        await test.step("Check the response schema", async () => {
            validateMeetingResponseSchema(responseData)
        });
        await test.step("Check the meeting with featured companies was created", async () => {
            const featuredCompanies = await companiesApi.getFeaturedCompanies(meetingId);
            expect(featuredCompanies[0].companyId, `Received Featured company${featuredCompanies[0].companyId} is not equal expected ${globalData.companyId}`).toEqual(globalData.companyId)
        });
    });

    test('Search employee by name', async ({meetingApi}) => {
        const response = await meetingApi.searchEmployee(meetingData.employeeName);
        const userNames = response.map(employeeNames => employeeNames.employeeName);
        await test.step("Expected person is displayed in search results", async () => {
            expect(userNames).toContain(meetingData.employeeName);
        });
    });

    test('Delete meeting by id', async ({meetingApi}) => {
        const response = await meetingApi.createNewMeeting(meetingData.createMeetingPayload);
        const meetingId = response.data.id;
        const deleteMeetingResponse = await meetingApi.deleteMeetingById(meetingId);

        await test.step("Response code is 200", async () => {
            expect(deleteMeetingResponse.status).toEqual(200);
        });

        const userMeetings = await meetingApi.getMeetings();
        const userMeetingIds = userMeetings.map(meeting => meeting.id);

        await test.step("Deleted meeting is not displayed among the user's meetings", async () => {
            expect(userMeetingIds).not.toContain(meetingId);
        });
    });

    test('Delete meeting by wrong id', async ({meetingApi}) => {
        const deleteMeetingResponse = await meetingApi.deleteMeetingById(123);
        await test.step("Response code is 500", async () => {
            expect(deleteMeetingResponse).toBe(500);
        });
    });

    test('Delete all meetings', async ({meetingApi}) => {
        await meetingApi.createNewMeeting(meetingData.createMeetingPayload);
        await meetingApi.createNewMeeting(meetingData.createMeetingPayload);

        const deleteMeetingsResponse = await meetingApi.deleteAllMeetings();

        await test.step("Response code is 200", async () => {
            expect(deleteMeetingsResponse.status).toEqual(200);
        });

        const userMeetings = await meetingApi.getMeetings();

        await test.step("Any meetings are not displayed among the user's meetings ", async () => {
            expect(userMeetings.length).toEqual(0);
        });
    });

    test('Start the meeting', async ({meetingApi}) => {
        const meetingResponse = await meetingApi.createNewMeeting(meetingData.createMeetingPayload);
        const meetingId = meetingResponse.data.id

        let activeMeeting: activeMeetingResponse = await meetingApi.checkActiveMeeting();

        await test.step("There are not active meetings", async () => {
            expect(activeMeeting.activeMeeting).toEqual(null)
        });

        await meetingApi.changeMeetingStatus(meetingId, meetingData.startMeetingPayload)
        activeMeeting = await meetingApi.checkActiveMeeting();

        await test.step("Active meeting is displayed in started status", async () => {
            expect(activeMeeting.activeMeeting.id).toEqual(meetingId)
            expect(activeMeeting.activeMeeting.status).toEqual(meetingData.statuses.started)
        });
    });

    test('Finish the meeting', async ({meetingApi}) => {
        const meetingResponse = await meetingApi.createNewMeeting(meetingData.createMeetingPayload);
        const meetingId = meetingResponse.data.id

        await meetingApi.changeMeetingStatus(meetingId, meetingData.startMeetingPayload);
        let activeMeeting: activeMeetingResponse = await meetingApi.checkActiveMeeting();

        await test.step("Active meeting is displayed in started status", async () => {
            expect(activeMeeting.activeMeeting.status).toEqual(meetingData.statuses.started)
        });
        await test.step("No active meetings are displayed after finishing", async () => {
            await meetingApi.changeMeetingStatus(meetingId, meetingData.finishMeetingPayload)
            activeMeeting = await meetingApi.checkActiveMeeting();
            expect(activeMeeting.activeMeeting).toEqual(null)
        });
    });
});