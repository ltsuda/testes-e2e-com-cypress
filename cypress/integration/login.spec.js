it("autentica corretamente com um usário cadastrado", () => {
    cy.intercept("GET", "**/notes").as("getNotes")
    cy.login(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"), { cacheSession: false })
    cy.wait("@getNotes")
})
