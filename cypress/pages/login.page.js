import Base from './_base.page';
import {IP} from './components/cadastro.elements.js'
import {LOGIN as LG} from './components/login.elements.js'

export default class CSLogin extends Base {
    static logout() {
        cy.get(IP.BTN_LOGOUT).invoke('show').click({force: true})
    }

    static validarEntrarLogin() {
        super.validarElemento(IP.BTN_LOGIN)
        super.clickOnElement(IP.BTN_LOGIN)
        super.validarElemento(LG.BTN_LOGIN)
        super.clickOnElement(LG.BTN_LOGIN)
        super.validarElemento(LG.TXT_USER)
        super.validarElemento(LG.BTN_CONTINUAR)
    }

    static logar() {
        cy.fixture(`../fixtures/usuario.json`).then((usuario) => {
            super.typeValue(LG.INP_USER, usuario.valido.email)
        })
        super.clickOnElement(LG.BTN_CONTINUAR)
        super.validarElemento(LG.INP_SENHA)
        super.validarElemento(LG.BTN_CONTINUARSENHA)
        cy.fixture(`../fixtures/usuario.json`).then((usuario) => {
            super.typeValue(LG.INP_SENHA, usuario.valido.senha)
        })
        super.clickOnElement(LG.BTN_CONTINUARSENHA)
    }

    static validarLogin() {
        super.validarUrl('/my-account')
        cy.fixture('../fixtures/usuario.json').then((usuario) => {
            let stringsplit = usuario.valido.nome.split(" ")
            let nome = stringsplit[0]
            super.validateElementText(LG.TXT_LOGINWELCOME, `Olá, ${nome}`)
        })
    }

    static logarInvalido() {
        super.clickOnElement(LG.BTN_SAIR, 8)
        this.validarEntrarLogin()
        cy.readFile(`cypress/fixtures/usuarioInvalido.json`).then((usuario) => {
            super.typeValue(LG.TXT_USER, usuario.Invalido.email)
        })
        super.clickOnElement(LG.BTN_CONTINUAR)
        super.validarElemento(LG.TXT_SENHA)
        super.validarElemento(LG.BTN_CONTINUARSENHA)
        cy.readFile('cypress/fixtures/usuarioInvalido.json').then((senha) => {
            super.typeValue(LG.TXT_SENHA, senha.Invalido.senha)
        })
        super.clickOnElement(LG.BTN_CONTINUARSENHA)
        cy.wait(2000)
        super.validateElementText(LG.TXT_LOGINERROR, 'Autenticação incorreta.')
    }

}