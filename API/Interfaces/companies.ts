export interface Response {
     companyId:  string,
     companyAccountId:  string,
     companyName:  string,
     companyDescription:  string,
     companyLogo:  string,
     companyWebsite:  string,
     hqLocation:  string,
     firstInvestDate:  string,
     salesforceAccountName:  string,
     ilevelAssetId:  string,
     statusOfInvestment:  string
     isActive: true,
     companyOneLiner:  string,
     valueProposition:  string,
     companySize:  string,
     foundationYear:  string,
     fundingStage:  string,
     customers: string[],
     companyExecutiveInsight1:  string,
     companyExecutiveInsight2: string
}

export interface CompanyParams {
     roleId?: string;
     categoryId?: string;
     subcategoryId?: string;
     topPriorityId?: string;
     page?: string;
     sort?: string;
     limit?: string;
}