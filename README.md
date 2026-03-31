# API Test Automation Framework

A comprehensive test automation framework for API testing using **Playwright**, **TypeScript**, and **Axios**. This project demonstrates best practices in test automation including POM (Page Object Model), API abstraction layers, and Allure reporting.

## 🎯 Features

- ✅ API testing with custom Axios instances
- ✅ TypeScript for type-safe tests
- ✅ Playwright for end-to-end scenarios
- ✅ Page Object Model (POM) pattern
- ✅ Comprehensive test reporting with Allure
- ✅ Configurable environment setup
- ✅ Custom test fixtures for easy test writing
- ✅ Error handling and validation
- ✅ CI/CD ready

## 📋 Prerequisites

- **Node.js** v18.0.0 or higher (LTS version recommended)
- **npm** v9.0.0 or higher
- Basic understanding of TypeScript and testing concepts

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd api-automation-framework
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# API Configuration
BASE_URL=https://api.example.com/
API_URL=https://api.example.com/api/v1

# Authentication
USERNAME=your_username
PASSWORD=your_password

# Proxy (optional)
PROXY=socks5://127.0.0.1:9999
```

For development, you can use `.env.example` as a template.

### 5. Run Tests

```bash
# Run all tests
npm run test

# Run with debugging
npm run test:debug

# Run specific test file
npm run test -- tests/examples/companies.spec.ts
```

### 6. Generate Test Report

```bash
npm run report-publish
```

This generates an Allure report in the `allure-report` directory.

## 📁 Project Structure

```
├── API/                          # API Service Layer
│   ├── CompaniesApi.ts          # Companies API endpoints
│   ├── MeetingApi.ts            # Meeting API endpoints
│   └── Interfaces/              # TypeScript interfaces for API responses
├── pages/                        # Page Object Model (POM)
│   ├── HomePage.ts              # Home page objects and actions
│   └── OktaPage.ts              # Generic login/authentication page objects
├── helpers/                      # Utility functions
│   ├── helper.ts                # Common helpers and validators
│   └── utils/
│       ├── axiosInstance.ts     # Axios instance configuration
│       └── globalSetup.js       # Global test setup
├── fixtures/                    # Playwright fixtures
│   └── base.ts                  # Custom test fixtures
├── tests/                       # Test scenarios
│   ├── companies.spec.ts        # Company API tests
│   └── meetings.spec.ts         # Meeting API tests
├── data/                        # Test data and fixtures
├── test-results/                # Test execution results
├── allure-results/              # Allure report data
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## 🧪 Test Architecture

### API Testing Pattern

```typescript
// Example: Using custom fixtures to test APIs
test('Create new item', async ({itemApi}) => {
  const response = await itemApi.create({
    name: 'Test Item',
    description: 'Test Description'
  });
  
  expect(response.status).toBe(200);
  expect(response.data.id).toBeDefined();
});
```

### POM Pattern

```typescript
// Example: Using Page Objects for UI testing
test('Login flow', async ({page, loginPage}) => {
  await loginPage.navigate();
  await loginPage.fillCredentials(username, password);
  await loginPage.submit();
  await expect(page).toHaveURL('/dashboard');
});
```

## 📊 Available Commands

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests |
| `npm run test:debug` | Run tests with debug mode enabled |
| `npm run report-publish` | Generate Allure test report |

## 🔧 Configuration

### Environment Variables

Create a `.env` file (see `.env.example`):

| Variable | Description | Example |
|----------|-------------|---------|
| `BASE_URL` | Base URL for the application | `https://api.example.com/` |
| `API_URL` | API base URL | `https://api.example.com/api/v1` |
| `USERNAME` | Test user username | `testuser` |
| `PASSWORD` | Test user password | `password` |
| `PROXY` | Proxy server URL (optional) | `socks5://127.0.0.1:9999` |

## 📝 Writing Tests

### Create a New Test

```typescript
import { test } from '../fixtures/base';
import { expect } from '@playwright/test';

test.describe('Feature Tests', () => {
  test('Test case description', async ({meetingApi}) => {
    // Setup
    const payload = { /* test data */ };
    
    // Execute
    const response = await meetingApi.createNewMeeting(payload);
    
    // Assert
    await test.step("Verify response", async () => {
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id');
    });
  });
});
```

### Using Test Steps

Tests use Playwright's test steps for better organization and reporting:

```typescript
await test.step("Step name", async () => {
  // Your assertions here
});
```

## 🔐 Security

- ⚠️ **Never commit `.env` file** - Add it to `.gitignore`
- Use `.env.example` as a template
- Store credentials securely in CI/CD systems
- Use environment variables in GitHub Actions/GitLab CI

## 📈 Test Results & Reporting

Test results are automatically generated after each test run:

- **Test Results**: `test-results/` directory
- **Allure Reports**: `allure-results/` directory
- **HTML Report**: Generated in `allure-report/`

To view the Allure report:
```bash
npm run report-publish
```



### Authentication issues
- Check `.env` file configuration
- Verify credentials
- Ensure API endpoints are accessible

### Report generation fails
- Ensure `allure-results` directory exists
- Check Allure CLI is installed: `npx allure --version`

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Axios Documentation](https://axios-http.com)
- [Allure Framework](https://docs.qameta.io/allure)
