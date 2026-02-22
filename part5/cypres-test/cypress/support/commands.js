// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('register', (name, username, password) => {
    cy.request('POST', '/api/users/', {name, username, password});
});

Cypress.Commands.add('login', (username, password, localStorageKey = 'user') => {
    cy.request('POST', '/api/login', {username, password}).then((res) => {
        localStorage.setItem(localStorageKey, JSON.stringify(res.body));
    });

    cy.visit("");
});

Cypress.Commands.add('addBlog', (blog, username, password) => {
    cy.request('POST', '/api/login', {username, password}).then((loginResponse) => {
        cy.request({
            url: '/api/blogs',
            method: 'POST',
            body: blog,
            headers: {
                'Authorization': `Bearer ${loginResponse.body.token}`
            }
        });
    });
    cy.visit("");
});
