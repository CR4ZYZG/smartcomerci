import Base from './_base.page';
import {IP} from './components/cadastro.elements.js'
import {LOGIN as LG} from './components/login.elements.js'

export default class Logar extends Base {
    static logout() {
        super.validarElemento(LG.BTN_DROPDOWN)
        super.clickOnElement(LG.BTN_DROPDOWN)
        super.validarElemento(LG.BTN_LOGOUT)
        super.clickOnElement(LG.BTN_LOGOUT)
    }

    static validarCamposLogin() {
        super.validarElemento(IP.BTN_LOGIN)
        super.clickOnElement(IP.BTN_LOGIN)
        super.validarElemento(LG.BTN_LOGIN)
        super.clickOnElement(LG.BTN_LOGIN)
        super.validarElemento(LG.BTN_CONTINUAR)
    }

    static logar() {
        this.validarCamposLogin()
        cy.fixture(`../fixtures/credenciais.json`).then((credenciais) => {
            super.typeValue(LG.INP_USER, credenciais.valido.email)
        })
        super.clickOnElement(LG.BTN_CONTINUAR)
        super.validarElemento(LG.INP_SENHA)
        super.validarElemento(LG.BTN_CONTINUARSENHA)
        cy.fixture(`../fixtures/credenciais.json`).then((credenciais) => {
            super.typeValue(LG.INP_SENHA, credenciais.valido.senha)
        })
        super.clickOnElement(LG.BTN_CONTINUARSENHA)
        super.verifyIfElementExists(LG.ICN_USER)
    }

    static logarInvalido() {
        this.validarCamposLogin()
        cy.readFile(`cypress/fixtures/credenciais.json`).then((credenciais) => {
            super.typeValue(LG.INP_USER, credenciais.invalido.email)
        })
        super.clickOnElement(LG.BTN_CONTINUAR)
        super.validarElemento(LG.INP_SENHA)
        super.validarElemento(LG.BTN_CONTINUARSENHA)
        cy.readFile('cypress/fixtures/credenciais.json').then((credenciais) => {
            super.typeValue(LG.INP_SENHA, credenciais.invalido.senha)
        })
        super.clickOnElement(LG.BTN_CONTINUARSENHA)
        cy.wait(2000)
        super.validateElementText(LG.TXT_LOGINERROR, 'Autenticação incorreta.')
    }
}