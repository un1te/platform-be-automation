# Ignite Platform API Automation Tests
This project contains automated tests for the Ignite Platform App using Node.js, Typescript and Playwright.

## Prerequisites
- Node.js latest LTS version installed
- AWS VPN configured. (documentation: https://insightpartners.atlassian.net/wiki/spaces/IDS/pages/2878144540/How+to+access+the+AWS+VPN)

## Setup

To set up the project and run tests locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the `tests` directory.
3. Install dependencies by running: 
```bash
npm install
```

4. Install Playwright by running:
```bash
npx playwright install
```

5. Create a `.env` file in the root directory with the following content:
```bash
BASE_URL = https://ignite-platform-automation.nonprod.rad.insightpartners.com/
API_URL = https://ignite-platform-backend-automation.nonprod.rad.insightpartners.com/api/v1
USERNAME = <your user name>
PASSWORD = <your password>
PROXY = "socks5://127.0.0.1:9999"
```

6. To run the tests locally, execute the following command:
   (run proxy server to run tests locally)
```bash
npm run test
```

7. To run specific scenarios, use the `TAGS` parameter as follows:
```bash
npm run test <e2e_tests/tests/<test_name>.spec.ts>
```

8. To generate the test report (under test-results/reports folder), execute the following command:
```bash
npm run report-publish
```

## Directory Structure
- `pages`: contains pages in POM
- `test-results`: Contains test result files (after tests execution completes).
- `API`: Contains api services
- `tests`: Contains test scenarios 

## Contributing
Feel free to contribute to this project by opening issues or pull requests. Contributions are welcome!