import { test as base, expect} from '@playwright/test';
import {OktaPage} from '../pages/OktaPage';
import MeetingApi from 'API/MeetingApi'
import {HomePage} from "../pages/HomePage";
import CompaniesApi from "API/CompaniesApi";

type MyFixtures = {
    loginPage: OktaPage;
    meetingApi: MeetingApi;
    homePage: HomePage;
    companiesApi: CompaniesApi;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new OktaPage(page)
        await use(loginPage);
    },
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page)
        await use(homePage);
    },
    meetingApi: async ({}, use) => {
        const meetingApi = new MeetingApi()
        await use(meetingApi);
    },
    companiesApi: async ({}, use) => {
        const companiesApi = new CompaniesApi()
        await use(companiesApi);
    }
});

exports.expect = expect;