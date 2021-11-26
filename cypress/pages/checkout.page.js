import Base from './_base.page';
import { CHECK } from './components/checkout.elements';

export default class Checkout extends Base {
    static validarProduto() {
        super.validarElemento(CHECK.PRODUCT)
    }

    static selecionarRetirada() {
        super.validarElemento(CHECK.INP_CEPCART)
        cy.readFile(`cypress/fixtures/credenciais.json`).then((credenciais) => {
            super.typeValue(CHECK.INP_CEPCART,  credenciais.endereço.cep)
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
        super.getElementText('.ch-input.ch-input-disabled.ch-text-center.ch-vspace-sm').then((texto) => {
            if(texto.includes('CPF')){
                this.confirmarCpf()
            }
            else if(texto.includes('nome')){
                this.confirmarNome()
            }
            else if(texto.includes('sobrenome')){
                this.confirmarSobrenome()
            }
            else {
                this.confirmarTelefone()
            }
        })
    }
    static confirmarTelefone() {
        cy.readFile(`cypress/fixtures/credenciais.json`).then((credenciais) => {
            
        
            if(CHECK.ITEM1.include(credenciais.valido.TF)){
                super.clickOnElement(CHECK.ITEM1)
            }
            else if(CHECK.ITEM2.include(credenciais.valido.TF)){
                super.clickOnElement(CHECK.ITEM2)
            }
            else if(CHECK.ITEM3.include(credenciais.valido.TF)){
                super.clickOnElement(CHECK.ITEM3)
            }
            
        })  
    }
}
