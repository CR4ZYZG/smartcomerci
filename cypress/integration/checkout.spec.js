/// <reference types="cypress" />

import Cad from '../pages/cadastro.page.js'
import Logar from '../pages/login.page.js'
import Cart from '../pages/carrinho.page'
import Checkout from '../pages/checkout.page'

describe('Testes de checkout no Mercado Online', () => {
    before(() => {
        Cad.visit()
        Logar.logar()
        Cart.adicionarCarrinho()
        Cart.adicionarProduto()
        Cart.abrirCarrinho()
    })
    it('realizar o checkout de uma compra', ()=>{
        Checkout.realizarCheckout()

    })
})