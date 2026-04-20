import { test } from '../fixtures/base';
import globalData from "../data/globalData";

test.describe('Companies API', () => {
    test('Get all companies', async ({companiesApi}) => {
        await companiesApi.getCompanies({roleId: globalData.roleIdCISO, limit:'1'});
    });

});