import { test as setup } from '../fixtures/base'
import * as process from "node:process";
import path from 'path';

// Authentication storage path
const STORAGE_STATE_USER = path.join(__dirname, '../.auth/user.json');

setup('Login with valid user credentials', async ({ page, loginPage, homePage }) => {
    try {
        await homePage.goto('');
        await homePage.clickSignIn();
        await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
        await homePage.categoriesCardIsVisible();
        await page.context().storageState({ path: STORAGE_STATE_USER });
    } catch (error) {
        process.stderr.write(`Authentication setup failed: ${String(error)}\n`);
        throw error;
    }
});