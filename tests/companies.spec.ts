import {STORAGE_STATE_USER} from "../playwright.config";
import {test} from '../fixtures/base';
import globalData from "../data/globalData";

test.describe('Companies API', () => {
    test.use({storageState: STORAGE_STATE_USER});

    test('Get all companies', async ({companiesApi}) => {
        await companiesApi.getCompanies({roleId: globalData.roleIdCISO, limit:'1'});
    });

});