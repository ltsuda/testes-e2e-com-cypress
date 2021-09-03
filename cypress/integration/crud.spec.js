it("CRUD uma nota", () => {
    const faker = require("faker")
    const noteDescription = faker.lorem.words(8)

    cy.intercept("GET", "**/notes").as("getNotes")
    cy.login()

    cy.createNote(noteDescription)
    cy.wait("@getNotes")

    const updatedDescription = faker.lorem.words(4)
    const attachFile = true
    cy.editNote(noteDescription, updatedDescription, attachFile)
    cy.wait("@getNotes")

    cy.deleteNote(updatedDescription)
    cy.wait("@getNotes")
})
