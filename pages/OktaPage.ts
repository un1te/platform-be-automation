import {Locator, Page} from "@playwright/test";

export class OktaPage  {
    readonly page: Page;
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly signInButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("[name='identifier']")
        this.passwordInput = this.page.locator("[name='credentials.passcode']")
        this.signInButton = this.page.locator("[value='Sign in']")
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
    }

}