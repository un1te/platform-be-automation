import { expect } from "@playwright/test";

export const validateMeetingResponseSchema = (responseData: any) => {
    expect(typeof responseData.id).toBe('number');
    expect(typeof responseData.employeeName).toBe('string');
    expect(typeof responseData.companyName).toBe('string');
    expect(typeof responseData.status).toBe('string');
    expect(typeof responseData.createdAt).toBe('string');
    expect(typeof responseData.updatedAt).toBe('string');
    expect(responseData.startedAt === null || typeof responseData.startedAt === 'string').toBe(true);
    expect(responseData.startedAt === null || typeof responseData.finishedAt === 'string').toBe(true);
    expect(typeof responseData.isContactMeClicked).toBe('boolean');
    expect(typeof responseData.isContactMyColleagueClicked).toBe('boolean');
    expect(responseData.roleId === null || typeof responseData.roleId === 'string').toBe(true);
};