import Base from './_base.page';
import { CHECK } from './components/checkout.elements';
import { expect } from 'chai';

export default class Checkout extends Base {
    static validarProduto() {
        super.validarElemento(CHECK.PRODUCT)
    }

    static selecionarRetirada() {
        super.validarElemento(CHECK.INP_CEPCART)
        cy.readFile(`cypress/fixtures/credenciais.json`).then((credenciais) => {
            super.typeValue(CHECK.INP_CEPCART,  credenciais.endereço2.cep)
        })
        cy.scrollTo(0, 100)
        super.validarElemento(CHECK.CBOX_RETIRAR)
        super.clickOnElement(CHECK.CBOX_RETIRAR)
    }

    static realizarCheckout() {
        this.validarProduto()
        this.selecionarRetirada()
        super.validarElemento(CHECK.BTN_CONTINUAR)
        super.clickOnElement(CHECK.BTN_CONTINUAR)
        super.validarElemento(CHECK.INP_EMAIL)
        cy.readFile(`cypress/fixtures/credenciais.json`).then((credenciais) => {
            super.typeValue(CHECK.INP_EMAIL, credenciais.valido.email)
        })
        super.validarElemento(CHECK.BTN_CONTINUAREMAIL)
        super.clickOnElement(CHECK.BTN_CONTINUAREMAIL).then(()=>{
            this.validarCheckout()
        })
       


        cy.readFile(`cypress/fixtures/credenciais.json`).then((credenciais) => {
            super.typeValue(CHECK.INP_SENHA, credenciais.valido.senha)
        })
        super.validarElemento(CHECK.BTN_CONTINUARSENHA)
        super.validarElemento(CHECK.BTN_CONTINUARSENHA)
    }

    static validarCheckout(){
        cy.readFile(`cypress/fixtures/credenciais.json`).then((credenciais) => {
            cy.get(CHECK.TXT_CONFIRM).then(security => {
                super.getElementText(security)

                let botao = ''

                if (security.find("p:contains('Quais os primeiros dígitos do seu CPF?')").lenght > 0) {
                    cy.log(botao)
                    let botao = credenciais.valido.cpf.slice(0, 6)
                    cy.log(botao)
                }

                else if (security.find("p:contains('Qual o seu sobrenome?')").lenght > 0) {
                    cy.log(botao)
                    let botao = credenciais.valido.nome.split(' ')[1]
                    cy.log(botao)
                }

                else if (security.find("p:contains('Quais os últimos dígitos do seu CPF?')").lenght > 0) {
                    cy.log(botao)
                    let botao = credenciais.valido.cpf.slice(-6)
                    cy.log(botao)
                }

                else if (security.find("p:contains('Qual o seu endereço de entrega?')").length > 0) {
                    cy.log(botao)
                    let botao = credenciais.valido.nome.split(' ')[3]
                    cy.log(botao)
                }

                else if (security.find("p:contains('Quais os primeiros digitos do seu telefone?')").length > 0) {
                    cy.log(botao)
                    let botao = credenciais.valido.TC.substring(1, 6)
                    cy.log(botao)
                }
                
                console.log(botao)
                

                cy.wait(4000)
                super.getElement(CHECK.ITEM).contains(botao).click()
                cy.wait(4000)
            })
        })
    }
}