import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly signInButton: Locator;
    readonly categoriesCard: Locator;

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;

        this.signInButton = this.page.getByText('Sign In with OKTA');
        this.categoriesCard = this.page.getByTestId('filter-market-categories');
    }
    async goto(url: string, timeout?: number) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: timeout
        });
    }
    async clickSignIn() {
        await this.signInButton.click();
    }

    async categoriesCardIsVisible() {
        await expect(this.categoriesCard).toBeVisible({timeout: 10000});
    }
}