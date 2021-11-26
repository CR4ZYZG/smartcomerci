/// <reference types="cypress" />

import Cad from "../pages/cadastro.page";

describe('Testes de cadastros no Mercado Online', () => { 
    beforeEach(() => {
        Cad.visit()
    })

    it('Cadastro de pessoas fisica valida', () => {
        Cad.criarCadastro()
        Cad.validarCampos()
        Cad.cadastrarUsuario()
        cy.wait(3000)  
    })

    it('cadastro de pessoa fisica incoreta', ()=>{
        Cad.validarCampos()
        Cad.cadastrarUsuarioIncoreto()
    })
})
