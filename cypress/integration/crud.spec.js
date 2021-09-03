it("CRUD uma nota", () => {
    const faker = require("faker")
    const noteDescription = faker.lorem.words(8)

    cy.intercept("GET", "**/notes").as("getNotes")
    cy.intercept("GET", "**/notes/**").as("getNote")
    cy.login()

    cy.visit("/notes/new")
    cy.get("#content").type(noteDescription)
    cy.contains("button", "Create").click()

    cy.wait("@getNotes")
    cy.contains(".list-group-item", noteDescription).should("be.visible").click()
    cy.wait("@getNote")

    const updatedDescription = faker.lorem.words(4)

    cy.get("#content").clear().type(updatedDescription)
    cy.contains("button", "Save").click()
    cy.wait("@getNotes")

    cy.contains(".list-group-item", noteDescription).should("not.exist")
    cy.contains(".list-group-item", updatedDescription).should("be.visible").click()

    cy.wait("@getNote")
    cy.contains("button", "Delete").click()
    cy.wait("@getNotes")

    cy.contains(".list-group-item", updatedDescription).should("not.exist")
})
