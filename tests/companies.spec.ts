import { test } from '../fixtures/base';
import globalData from "../data/globalData";

test.describe('Companies API', () => {
    // Optional: Uncomment and configure storageState if using authenticated storage
    // test.use({storageState: STORAGE_STATE_USER});

    test('Get all companies', async ({companiesApi}) => {
        await companiesApi.getCompanies({roleId: globalData.roleIdCISO, limit:'1'});
    });

});