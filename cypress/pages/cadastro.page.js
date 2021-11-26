
import faker from "faker"
import fakerbr from "faker-br"
const { fakerBr } = require('js-brasil');
import Base from './_base.page'
import {IP} from './components/cadastro.elements'
import {USER as U} from './components/cadastro.elements'

export default class Cad extends Base {

    static visit() {
        cy.visit(`${Cypress.env('BASE_URL')}`)
    }

    static criarCadastro() {
        cy.writeFile('cypress/fixtures/credenciais.json', {
            'valido' :
                {
                'nome': `${fakerbr.name.firstName()} ${fakerbr.name.lastName()}`,
                'DN': `${fakerBr.data()}`,
                'cpf': `${fakerBr.cpf()}`,
                'TF': `${faker.phone.phoneNumber('(11)3#######')}`,
                'TC': `${faker.phone.phoneNumber('(21)9########')}`,
                'email': `${fakerbr.internet.email()}`,
                'senha': `${faker.internet.password()}`
            },
            'invalido' :
               {
                'nome': `${fakerbr.name.firstName()} ${fakerbr.name.lastName()} `,
                'DN': `${fakerBr.data()}`,
                'cpf': `${faker.random.word()}`,
                'TF': `${faker.phone.phoneNumber('(##)6###-####')}`,
                'TC': `${faker.phone.phoneNumber('(##)2####-####')}`,
                'email': `${fakerbr.internet.email()}`,
                'senha': `${faker.internet.password()}`
            },
            'endereço': {                
                'cep': `${fakerBr.cep()}`,
                'numero': `${faker.datatype.number()}`
            },  

            'endereço2': {
                'cep': '01153-000', 
                'numero': `${faker.datatype.number()}`
            }
        })
    }

    static validarCampos (){
        super.validarElemento(IP.IMG_START)
        super.validarElemento(IP.BTN_CADASTRO)
        super.clickOnElement(IP.BTN_CADASTRO)
        super.validarElemento(U.INP_NOME)
        super.validarElemento(U.INP_DATA)
        super.validarElemento(U.INP_CPF)
        super.validarElemento(U.INP_TELEFONE)
        super.validarElemento(U.INP_CELULAR)
        super.validarElemento(U.INP_EMAIL)
        super.validarElemento(U.INP_EMAIL2)
        super.validarElemento(U.INP_SENHA)
        super.validarElemento(U.INP_SENHA2)
    }            

    static cadastrarUsuario() {
        
        cy.readFile(`cypress/fixtures/credenciais.json`).then((credenciais) => {
            super.typeValue(U.INP_NOME, credenciais.valido.nome)
            super.typeValue(U.INP_DATA, credenciais.valido.DN)
            super.typeValue(U.INP_CPF, credenciais.valido.cpf)
            super.typeValue(U.INP_TELEFONE, credenciais.valido.TF)
            super.typeValue(U.INP_CELULAR, credenciais.valido.TC)
            super.typeValue(U.INP_EMAIL, credenciais.valido.email)
            super.typeValue(U.INP_EMAIL2, credenciais.valido.email)
            super.typeValue(U.INP_SENHA, credenciais.valido.senha)
            super.typeValue(U.INP_SENHA2, credenciais.valido.senha)
            super.clickOnElement(U.BTN_AVANÇAR)
            cy.wait(3000)
        })
    }

    static cadastrarUsuarioIncoreto() {
        
        cy.readFile(`cypress/fixtures/credenciais.json`).then((credenciais) => {
            super.typeValue(U.INP_NOME, credenciais.invalido.nome)
            super.typeValue(U.INP_DATA, credenciais.invalido.DN)
            super.typeValue(U.INP_CPF, credenciais.invalido.cpf)
            super.typeValue(U.INP_TELEFONE, credenciais.invalido.TF)
            super.typeValue(U.INP_CELULAR, credenciais.invalido.TC)
            super.typeValue(U.INP_EMAIL, credenciais.invalido.email)
            super.typeValue(U.INP_EMAIL2, credenciais.invalido.email)
            super.typeValue(U.INP_SENHA, credenciais.invalido.senha)
            super.typeValue(U.INP_SENHA2, credenciais.invalido.senha)
            super.validarElemento(U.BTN_AVANÇAR)
            super.clickOnElement(U.BTN_AVANÇAR)
            super.validarElemento(U.INP_ERROCPF)
        })
    }

    static validarUrl(url) {
        super.validarUrl(url)
    }
}