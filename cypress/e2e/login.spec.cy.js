/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Funcionalidade Login', () => {

    let emailFaker = faker.internet.email()
    let senhaFaker = faker.internet.password()

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    it('Realizar login com sucesso', () => {

        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').should('contain', 'Detalhes da conta')
    });

    it('Mensagem de e-mail incorreto', () => {

        cy.get('#username').type(emailFaker)
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido')
    });

    it('Mensagem de senha incorreta', () => {

        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type(senhaFaker)
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain', 'Perdeu a senha?')

    });


});