/// <reference types="cypress" />

import Cad from '../pages/cadastro.page.js'
import Logar from '../pages/login.page.js'
import Cart from '../pages/carrinho.page'


describe('Testes de login ', () => {
    before(() => {
        Cad.visit()
        Logar.logar()
        cy.wait(3000)
    })
    it.only('Deve adicionar alguns produtos ao carrinho e abrir a pagina de checkout', () => {
        
        cy.wait(5000)
        Cart.adicionarCarrinho()
        Cart.adicionarProduto()
        Cart.adicionarProduto()
        Cart.adicionarProduto()
        
        Cart.abrirCarrinho()
        Cad.validarUrl('/checkout/cart')
    })

    it('Adiciona alguns produtos e diminui 2 vezes a quantidade', ()=>{
        Cart.abrirModal()
        Cart.limparCarrinho()
        Cart.adicionarCarrinho()
        Cart.adicionarProduto()
        Cart.adicionarProduto()
        Cart.adicionarProduto()
        Cart.adicionarProduto()
        Cart.adicionarProduto()
    
        Cart.diminuirProduto()
        Cart.fecharModal()
        Cart.diminuirProduto()
        Cad.validarUrl('/checkout/cart')
    })
    
})