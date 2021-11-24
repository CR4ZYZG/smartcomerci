/// <reference types="cypress" />


import Cad from '../pages/cadastro.page.js'
import CSCadastro from '../pages/sm_cadastro.page.js'
import CSLogin from '../pages/sm_login.page.js'


describe('Testes de login/Positivos', () => {
    before(() => {
        Cad.visit()
    })
    it('Deve logar uma pessoa física com sucesso', () => {
        CSCadastro.validarUrl(`${Cypress.env('baseURL')}`)
        CSLogin.validarEntrarLogin()  
        CSLogin.logar() 
        cy.wait(10000)
        CSLogin.validarLogin()  
    })
})

describe('Testes de login/Negativos', () => {
    it('Deve tentar logar um usuário não cadastrado', () => {
        CSLogin.logarInvalido()
    })
})