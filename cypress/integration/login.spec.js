it("autentica corretamente com um usário cadastrado", () => {
    cy.intercept("GET", "**/notes").as("getNotes")
    cy.login()
    cy.wait("@getNotes")
})
