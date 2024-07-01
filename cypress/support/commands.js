Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('preCadastro', (email, senha, nome, sobrenome) => {
    cy.get('#reg_email').type(email)
    cy.get('#reg_password').type(senha)
    cy.get(':nth-child(4) > .button').click()
    cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
    cy.get('#account_first_name').type(nome)
    cy.get('#account_last_name').type(sobrenome)
    cy.get('.woocommerce-Button').click()
    cy.screenshot();
});

Cypress.Commands.add('finalizarCadastro', (endereco, cidade, estado, cep, telefone) => {
    cy.get('#billing_address_1').type(endereco)
    cy.get('#billing_city').type(cidade)
    cy.get('#billing_state').select(estado,{force: true})
    cy.get('#billing_postcode').type(cep)
    cy.get('#billing_phone').type(telefone)
    cy.screenshot();
});

Cypress.Commands.add('finalizarCompra', ()=>{
    cy.get('#payment_method_cod').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()
});