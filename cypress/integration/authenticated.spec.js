describe("Cenários utilizando usuário já autenticado", () => {
    beforeEach(() => {
        cy.intercept("GET", "**/notes").as("getNotes")
        cy.login()
    })

    it("CRUD uma nota", () => {
        const faker = require("faker")
        const noteDescription = faker.lorem.words(8)

        cy.createNote(noteDescription)
        cy.wait("@getNotes")

        const updatedDescription = faker.lorem.words(4)
        const attachFile = true
        cy.editNote(noteDescription, updatedDescription, attachFile)
        cy.wait("@getNotes")

        cy.deleteNote(updatedDescription)
        cy.wait("@getNotes")
    })

    it("Submete pagamento dentro do iframe", () => {
        cy.intercept("POST", "**/prod/billing").as("paymentRequest")

        cy.fillSettingsFormAndSubmit()

        cy.wait("@getNotes")
        cy.wait("@paymentRequest").then((response) => {
            expect(response.state).to.equal("Complete")
        })
    })

    it("Logs out", () => {
        cy.visit("/")
        cy.wait("@getNotes")
        if (Cypress.config("viewportWidth") < Cypress.env("viewportWidthBreakpoint")) {
            cy.get(".navbar-toggle.collapsed").should("be.visible").click()
        }
        /* ==== Generated with Cypress Studio ==== */
        cy.get(".nav > :nth-child(2) > a").click()
        cy.get("#email").should("be.visible")
        /* ==== End Cypress Studio ==== */
    })
})
