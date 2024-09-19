import {defineConfig} from '@playwright/test';
import * as path from 'node:path';
import * as process from "node:process";
import {testPlanFilter} from "allure-playwright/testplan";

export const STORAGE_STATE_USER = path.join(__dirname, '.auth/user.json');

export default defineConfig({
    globalSetup: './helpers/utils/globalSetup.js',
    testDir: './tests',
    grep: testPlanFilter(),
    reporter: [
        ["list"],
        ["allure-playwright",
            {
                detail: false,
                outputFolder: "allure-results",
                suiteTitle: false,
            }
        ]
    ],
    timeout: 30 * 1000,
    expect: {
        timeout: 5000
    },
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    use: {
        baseURL: process.env.BASE_URL,
        trace: 'on-first-retry',
    },

    projects: [
            {
                name: 'Setup',
                testMatch: '**/*.setup.ts',
                use: {
                    headless: true
                }
            },
            {
                name: 'Api tests',
                dependencies: ['Setup'],
                use: {
                    launchOptions: {
                        headless: true,
                    }
                }
            }
        ]
});

