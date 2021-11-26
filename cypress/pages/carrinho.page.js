import Base from './_base.page';
import { COMPRAR } from './components/comprar.elements';

export default class Cart extends Base {
    static verLoja(){
        super.validarElemento(COMPRAR.BTN_LOJA)
        super.clickOnElement(COMPRAR.BTN_LOJA)
    }

    static adicionarCarrinho(){
        this.verLoja()
        cy.scrollTo(0, 350)
        super.validarElemento(COMPRAR.BTN_ADICIONAR) 
        super.clickOnElement(COMPRAR.BTN_ADICIONAR) 
    }
    
    static adicionarProduto(){
        super.validarElemento(COMPRAR.BTN_AUMENTAR)
        super.clickOnElement(COMPRAR.BTN_AUMENTAR)
    }
    
    static diminuirProduto(){
        super.validarElemento(COMPRAR.BTN_DIMINUIR)
        super.clickOnElement(COMPRAR.BTN_DIMINUIR)
    }

    static abrirModal(){
        super.validarElemento(COMPRAR.BTN_ABREMODAL)
        super.clickOnElement(COMPRAR.BTN_ABREMODAL)
    }

    static fecharModal(){
        super.validarElemento(COMPRAR.BTN_FECHAMODAL)
        super.clickOnElement(COMPRAR.BTN_FECHAMODAL)
    }

    static limparCarrinho(){
        super.validarElemento(COMPRAR.BTN_LIMPACARRINHO)
        super.clickOnElement(COMPRAR.BTN_LIMPACARRINHO)
    }

    static abrirCarrinho(){
        cy.get(COMPRAR.BTN_ABREMODAL).trigger('mouseover')
    
        cy.get(COMPRAR.BTN_CHECKOUT).click({ force: true })
        
    }
}