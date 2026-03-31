import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/OktaPage';
import MeetingApi from 'API/MeetingApi'
import { HomePage } from "../pages/HomePage";
import CompaniesApi from "API/CompaniesApi";

/**
 * Custom fixtures for test execution
 * Provides pre-configured instances of pages and API classes
 */
type MyFixtures = {
    /**
     * Login page fixture for authentication testing
     */
    loginPage: LoginPage;

    /**
     * Home page fixture for UI testing
     */
    homePage: HomePage;

    /**
     * Meeting API fixture for meeting-related API tests
     */
    meetingApi: MeetingApi;

    /**
     * Companies API fixture for company-related API tests
     */
    companiesApi: CompaniesApi;
};

/**
 * Extended test instance with custom fixtures
 * Provides fixtures for common test objects and utilities
 */
export const test = base.extend<MyFixtures>({
    /**
     * Initializes the login page fixture
     */
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    /**
     * Initializes the home page fixture
     */
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    /**
     * Initializes the meeting API fixture
     */
    meetingApi: async ({}, use) => {
        const meetingApi = new MeetingApi();
        await use(meetingApi);
    },

    /**
     * Initializes the companies API fixture
     */
    companiesApi: async ({}, use) => {
        const companiesApi = new CompaniesApi();
        await use(companiesApi);
    }
});

exports.expect = expect;