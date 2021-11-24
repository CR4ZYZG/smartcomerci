import Cad from "../pages/cadastro.page";

describe('testes para cadastros', () => { 
    beforeEach(() => {
        Cad.visit()
    })

    it.only('Cadastro de pessoas fisica valida', () => {
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
