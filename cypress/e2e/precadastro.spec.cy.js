/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Função de pré-cadastro', () => {

    let nomeFaker = faker.name.firstName()
    let sobrenomeFaker = faker.name.lastName()
    let emailFaker = faker.internet.email(nomeFaker, sobrenomeFaker)
    let senhaFaker = faker.internet.password()

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });
    
    it('Cadastro com sucesso', () => {

        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type(senhaFaker)
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá,')

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nomeFaker)
        cy.get('#account_last_name').type(sobrenomeFaker)
        cy.get('.woocommerce-Button').click()
       
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso')

    });

    it.only('Conta já registrada', () => {

        cy.get('#reg_email').type('aluno_teste@teste.com')
        cy.get('#reg_password').type(senhaFaker)
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-error').should('contain', 'Erro: Uma conta já está registrada')
    });
});