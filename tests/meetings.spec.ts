import {STORAGE_STATE_USER} from "../playwright.config";
import {test} from '../fixtures/base';
import meetingData from "../data/meetingData";
import {expect} from "@playwright/test";

test.describe('Meetings API', () => {
    test.use({storageState: STORAGE_STATE_USER});

    test.afterEach(async ({meetingApi}) => {
        await meetingApi.deleteAllMeetings();
    });

    test('Create new meeting', async ({meetingApi}) => {
        const response = await meetingApi.createNewMeeting(meetingData.createMeetingPayload);
        expect(typeof response.id).toBe(typeof response.id);
        expect(typeof response.employeeName).toBe('string');
        expect(typeof response.companyName).toBe('string');
        expect(typeof response.status).toBe('string');
        expect(typeof response.createdAt).toBe('string');
        expect(typeof response.updatedAt).toBe('string');
        expect(response.startedAt === null || typeof response.startedAt === 'string').toBe(true);
        expect(response.startedAt === null || typeof response.finishedAt == 'string').toBe(true);
        expect(typeof response.isContactMeClicked).toBe('boolean');
        expect(typeof response.isContactMyColleagueClicked).toBe('boolean');
        expect(response.roleId === null || typeof response.roleId == 'string').toBe(true);
    });

    test('Get all user meetings', async ({meetingApi}) => {
        await meetingApi.createNewMeeting(meetingData.createMeetingPayload);
        await meetingApi.getMeetings();
    });
});