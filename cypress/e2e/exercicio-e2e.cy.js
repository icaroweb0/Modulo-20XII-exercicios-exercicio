/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";
import { faker } from '@faker-js/faker/locale/pt_BR';


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */


    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
        cy.preCadastro(faker.internet.email(), faker.internet.password(), faker.person.firstName(), faker.person.lastName());
        cy.get('.woocommerce-message').should('exist');
        cy.fixture('produtos').then(dados => {

            dados.forEach(element => {
                if (dados.quantidade == 1) {
                    var msgSucesso = `“${element.nomeProduto}” foi adicionado no seu carrinho`;
                } else {
                    var msgSucesso = `${element.quantidade} × “${element.nomeProduto}” foram adicionados no seu carrinho.`;
                }
                produtosPage.buscarProduto(element.nomeProduto);

                produtosPage.addProdutoCarrinho(element.tamanho, element.cor, element.quantidade);

                cy.get('.woocommerce-message').should('contain', msgSucesso);

            });
        })
       cy.visit('checkout');
       cy.finalizarCadastro(faker.location.streetAddress(), faker.location.city(), faker.location.state(), faker.location.zipCode(), faker.phone.number());
       cy.finalizarCompra();
       cy.intercept('/*').as('checkout');
       cy.wait('@checkout');
       cy.get('.page-title').should('contain', 'Pedido recebido');
       cy.screenshot();        
    });


})