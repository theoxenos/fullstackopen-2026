# Cypress E2E Tests for Blog App

This repository contains end-to-end (E2E) tests for a Blog application using Cypress. The tests exercise common user flows such as logging in, creating, liking, removing blogs, and verifying ordering by likes.

Note: This repo only includes the E2E tests. The actual web application (frontend) and API (backend) must be running separately for the tests to pass.

## Tech stack
- Language: JavaScript (CommonJS modules)
- Test framework/tooling: Cypress ^15
- Package manager: npm (package-lock.json present)
- Target app base URL: http://localhost:5173 (configured in cypress.config.js)

## Requirements
- Node.js and npm installed
  - TODO: Specify supported Node.js version/range (e.g., via .nvmrc or engines)
- The Blog application frontend running and accessible at http://localhost:5173
- The Blog application backend/API available under the same origin (or appropriately proxied) with endpoints used by the tests:
  - POST /api/testing/reset (resets test data)
  - POST /api/users (registers a user)
  - POST /api/login (returns auth token)
  - POST /api/blogs (creates a blog; requires Bearer token)

If your environment requires GTK 3 to run Cypress Electron, the scripts set ELECTRON_EXTRA_LAUNCH_ARGS="--gtk-version=3" accordingly (helpful on some Linux distros).

## Setup
1. Install dependencies:
   - npm install
   - or: npm ci (for clean installs in CI)
2. Ensure the target app and backend are running and accessible at the base URL defined in cypress.config.js (default http://localhost:5173).
   - TODO: Document how to start the frontend (e.g., npm run dev) and backend (e.g., npm start / docker-compose) for this project’s app.

## How to run
- Open Cypress Test Runner (interactive GUI):
  - npm run cy:open
- Run Cypress headless (CLI):
  - npm run test:e2e

By default, tests run against the baseUrl from cypress.config.js.

## npm scripts
Defined in package.json:
- cy:open — Launches Cypress with Electron (GTK 3 arg for Linux):
  - ELECTRON_EXTRA_LAUNCH_ARGS="--gtk-version=3" cypress open
- test:e2e — Executes Cypress tests in headless mode:
  - ELECTRON_EXTRA_LAUNCH_ARGS="--gtk-version=3" cypress run
- test — Placeholder (currently exits with error). TODO: If desired, make this alias run the E2E tests or remove.

## Environment variables and configuration
- Base URL is set in cypress.config.js:
  - e2e.baseUrl = 'http://localhost:5173'
- Browser launch arg for Electron on Linux:
  - ELECTRON_EXTRA_LAUNCH_ARGS="--gtk-version=3" (in scripts)
- TODO: If the app/backend requires additional environment variables (e.g., API URL, DB connection, auth secrets), document them here and ensure they’re configured for the test environment.

## Tests overview
Main spec:
- cypress/e2e/blog_app.cy.js
  - Resets the test database via /api/testing/reset
  - Registers users via custom command cy.register
  - Verifies login success and failure
  - Creates, likes, and removes blogs
  - Verifies permission checks (cannot remove blogs created by another user)
  - Sorts blogs by likes and verifies ordering

Custom Cypress commands (cypress/support/commands.js):
- cy.register(name, username, password) — POST /api/users
- cy.login(username, password, localStorageKey='user') — POST /api/login, stores token in localStorage, visits base URL
- cy.addBlog(blog, username, password) — Authenticates then POST /api/blogs, visits base URL

These tests expect the frontend to read the logged-in user from localStorage under the key 'user' (default) and render specific labels and button texts, such as:
- Labels: "Username", "Password"
- Buttons: "Login" (submit), "new blog", "Submit", "View/hide", "Like", "remove", "sort by likes"
- UI texts: e.g., "wrong credentials", "has been liked", "has been removed"

## Project structure
- cypress/
  - e2e/
    - blog_app.cy.js — main E2E spec
  - support/
    - commands.js — custom Cypress commands for API actions
- cypress.config.js — Cypress configuration (baseUrl, hooks placeholder)
- package.json — project metadata and npm scripts
- package-lock.json — exact dependency lockfile

## Running in CI
- Ensure the target app and backend are started and healthy before invoking the Cypress tests.
- Use npm ci to install dependencies.
- For headless runs: npm run test:e2e
- Consider using Cypress GitHub Action or similar. TODO: Add a sample CI config (e.g., GitHub Actions) if/when this repo gains CI.

## Troubleshooting
- Tests fail on first request to /api/testing/reset
  - Ensure backend exposes the testing reset route in test mode and is reachable from the base URL origin.
- Login test fails or localStorage key mismatches
  - Ensure the frontend reads the user from localStorage key 'user' or adjust cy.login localStorageKey parameter and app code accordingly.
- Electron fails to launch on Linux
  - The provided scripts set GTK 3. If issues persist, try different browsers: cypress run --browser chrome
- CORS or mixed-origin issues
  - Make sure the API is served under the same origin or configure appropriate proxies to match the baseUrl origin.

## License
This project is licensed under the ISC License (as declared in package.json).

## TODOs
- Specify supported Node.js version.
- Document how to start the Blog app (frontend) and backend locally for testing.
- Decide whether npm test should run the Cypress suite or be removed/replaced.
