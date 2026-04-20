import {Locator, Page} from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly signInButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("input[placeholder*='username'], input[placeholder*='email'], input[name='username']").first()
        this.passwordInput = this.page.locator("input[type='password'], input[name='password']").first()
        this.signInButton = this.page.locator("button:has-text('Sign in'), button:has-text('Login'), button[type='submit']").first()
    }

    async inputUsername(username: string) {
        await this.usernameInput.fill(username)
    }

    async inputPassword(password: string) {
        await this.passwordInput.fill(password)
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async login(username: string, password: string) {
        await this.inputUsername(username)
        await this.inputPassword(password)
        await this.clickSignIn()
        await this.waitForLoginComplete();
    }

    async waitForLoginComplete() {
        await this.page.waitForURL('**/dashboard/**', { timeout: 10000 }).catch(() => {
            return this.page.waitForSelector('[data-testid="authenticated-content"]', { timeout: 10000 }).catch(() => null);
        });
    }

}