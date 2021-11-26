/// <reference types="cypress" />


import Cad from '../pages/cadastro.page.js'
import Logar from '../pages/login.page.js'


describe('Testes de login no Mercado Online', () => {
    before(() => {
        Cad.visit()
    })
    it('Deve logar uma pessoa física com sucesso', () => {
        Cad.validarUrl(`${Cypress.env('BASE_URL')}`)
        Logar.logar() 
        cy.wait(3000)
        
        
    })

    it('Deve deslogar o usuário', ()=>{
        Logar.logout()
        cy.wait(3000)
        Cad.validarUrl('/loja')
    })

    it('Deve tentar logar um usuário não cadastrado', () => {
        Cad.validarUrl(`${Cypress.env('BASE_URL')}`)
        Logar.logarInvalido()
        cy.wait(4000)
        
    })
})