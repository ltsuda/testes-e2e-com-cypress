it("Registra um novo usuário utilizando código de confirmação via email", () => {
    const faker = require("faker")
    const email = `${faker.datatype.uuid()}@${Cypress.env("MAILOSAUR_SERVER_ID")}.mailosaur.net`
    const password = Cypress.env("USER_PASSWORD")

    cy.intercept("GET", "**/notes").as("getNotes")
    cy.fillSignupFormAndSubmit(email, password)

    cy.mailosaurGetMessage(Cypress.env("MAILOSAUR_SERVER_ID"), {
        sentTo: email,
    }).then((message) => {
        const confirmationCode = message.html.body.match(/\d{6}/)[0]
        cy.get("#confirmationCode").type(`${confirmationCode}{enter}`)

        cy.wait("@getNotes")
        cy.contains("h1", "Your Notes").should("be.visible")
    })
})
