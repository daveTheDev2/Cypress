/// <reference types="cypress"/>
const { faker } = require('@faker-js/faker');

const Name = faker.name.findName(); 
const firstName = faker.name.firstName()
const Email = faker.internet.email();

describe(' Login ok tests suite ', () => {
    beforeEach(() => {
        cy.visit('https://preprod.backmarket.fr/register')
        cy.get('[data-qa="accept-cta"]').click() 
      })
   
        it(' Create account with user name empty ', () => {    
          cy.get('[data-qa="accept-cta"]').click() 
          
        cy.get("#lastName").type(firstName)
        cy.get("#signup-email").type(Email)
        cy.get("#signup-password").type('Fakeman12345?')
        cy.get('[data-qa="signup-submit-button"]').click();
      
        cy.url().should("include","/register")
        cy.contains("obligatoire")

      });
        it(' Create account with good crédentials', () => {    
            
            cy.get("#firstName").type(Name)
            cy.get("#lastName").type(firstName)
            cy.get("#signup-email").type(Email)
            cy.get("#signup-password").type('Fakeman12345?')
            cy.get('[data-qa="signup-submit-button"]').click();
           
            cy.url().should("include","dashboard/orders")
            cy.get('[data-qa="dashboard-navigation-profil"]').click()
            cy.get('[data-test="dashboard-profile"]').should("exist");
    

        });
    

      it(' Sign in with good crédentials', () => {    

        cy.get("#signin-email").type(Email)
        cy.get("#signin-password").type('Fakeman12345?')
        cy.get('[data-qa="signin-submit-button"]').click();
      
        cy.url().should("include","dashboard/orders")
        cy.get('[data-qa="dashboard-navigation-profil"]').click()
        cy.get('[data-test="dashboard-profile"]').should("exist");

    });

    

      it(' Sign in with bad password', () => {    

        cy.get("#signin-email").type(Email)
        cy.get("#signin-password").type('Fakeman1234?')
        cy.get('[data-qa="signin-submit-button"]').click();
        
        cy.contains("Informations d'identification erronées").should('be.visible');
    });
})