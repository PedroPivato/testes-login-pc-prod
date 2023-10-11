/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Funcionalidade de produtos', () => {
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });

    it('Deve adicionar qualquer produto da lista', () => {

        cy.get('[class="product-block grid"]')
            .first()
            .click()

        cy.go('back')

        cy.get('[class="product-block grid"]')
            .last()
            .click()

        cy.go('back')

        cy.get('[class="product-block grid"]')
            .eq(6)
            .click()

        cy.go('back')

        cy.get('[class="product-block grid"]')
            .contains('Ariel Roll Sleeve Sweatshirt')
            .click()

    });

    it.only('Adicionar produto ao carrinho', () => {
        let quantidade = 5

        cy.get('[class="product-block grid"]')
            .first()
            .click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
    });
});

