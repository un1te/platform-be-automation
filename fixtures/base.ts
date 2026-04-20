import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/OktaPage';
import MeetingApi from 'API/MeetingApi'
import { HomePage } from "../pages/HomePage";
import CompaniesApi from "API/CompaniesApi";

type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    meetingApi: MeetingApi;
    companiesApi: CompaniesApi;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    meetingApi: async ({}, use) => {
        const meetingApi = new MeetingApi();
        await use(meetingApi);
    },

    companiesApi: async ({}, use) => {
        const companiesApi = new CompaniesApi();
        await use(companiesApi);
    }
});
