import { expect } from "@playwright/test";

/**
 * Validates the structure and types of a meeting API response
 * Ensures all required fields are present with correct data types
 * @param responseData - The meeting response object to validate
 * @throws AssertionError if validation fails
 */
export const validateMeetingResponseSchema = (responseData: any) => {
    // Validate required fields exist
    expect(responseData).toBeDefined();
    expect(responseData).not.toBeNull();

    // Validate ID field
    expect(typeof responseData.id).toBe('number');
    expect(responseData.id).toBeGreaterThan(0);

    // Validate string fields
    expect(typeof responseData.employeeName).toBe('string');
    expect(responseData.employeeName).toBeTruthy();

    expect(typeof responseData.companyName).toBe('string');
    expect(responseData.companyName).toBeTruthy();

    expect(typeof responseData.status).toBe('string');
    expect(responseData.status).toBeTruthy();

    // Validate timestamp fields
    expect(typeof responseData.createdAt).toBe('string');
    expect(responseData.createdAt).toBeTruthy();

    expect(typeof responseData.updatedAt).toBe('string');
    expect(responseData.updatedAt).toBeTruthy();

    // Validate optional timestamp fields (can be null or string)
    if (responseData.startedAt !== null) {
        expect(typeof responseData.startedAt).toBe('string');
    }

    if (responseData.finishedAt !== null) {
        expect(typeof responseData.finishedAt).toBe('string');
    }

    // Validate boolean fields
    expect(typeof responseData.isContactMeClicked).toBe('boolean');
    expect(typeof responseData.isContactMyColleagueClicked).toBe('boolean');

    // Validate optional role ID (can be null or string)
    if (responseData.roleId !== null) {
        expect(typeof responseData.roleId).toBe('string');
    }
};

/**
 * Validates a generic response object structure
 * @param responseData - The response object to validate
 * @throws AssertionError if validation fails
 */
export const validateResponseIsObject = (responseData: any) => {
    expect(responseData).toBeDefined();
    expect(typeof responseData).toBe('object');
    expect(responseData).not.toBeNull();
};

/**
 * Validates that a response is an array
 * @param responseData - The response to validate
 * @throws AssertionError if validation fails
 */
export const validateResponseIsArray = (responseData: any) => {
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length).toBeGreaterThanOrEqual(0);
};