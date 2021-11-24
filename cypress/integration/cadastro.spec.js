import Cad from "../pages/cadastro.page";

describe('testes para cadastros', () => { 
    before(() => {
        Cad.visit()
    })

    it('Cadastro de pessoas validas e invalidas', () => {
        Cad.criarCadastro()
        Cad.cadastrarUsuario()
        
    }) 
})
