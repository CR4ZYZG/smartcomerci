
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
                "nome": `${fakerbr.name.firstName()} ${fakerbr.name.lastName()}`,
                "DN": `${fakerBr.data()}`,
                "cpf": `${fakerBr.cpf()}`,
                'TF': `${faker.phone.phoneNumber('(##)5#######')}`,
                'TC': `${faker.phone.phoneNumber('(##)#########')}`,
                "email": `${fakerbr.internet.email()}`,
                "senha": `${faker.internet.password()}`
            },

            'invalido' :
               {
                "nome": `${faker.vehicle.model()}`,
                "DN": `${fakerBr.data()}`,
                "cpf": `${fakerBr.cpf()}`,
                'TF': `${faker.random.word()}`,
                'TC': `${faker.phone.phoneNumber('(##) #####-####')}`,
                "email": `${fakerbr.internet.email()}`,
                "senha": `${faker.internet.password()}`
            }
            
          })
    }

    static cadastrarUsuario() {
        super.validarElemento(IP.IMG_START)
        super.validarElemento(IP.BTN_CADASTRO)
        super.clickOnElement(IP.BTN_CADASTRO)
        cy.readFile(`cypress/fixtures/credenciais.json`).then((credenciais) => {
            super.validarElemento(U.INP_NOME)
            super.typeValue(U.INP_NOME, credenciais.valido.nome)
            super.validarElemento(U.INP_DATA)
            super.typeValue(U.INP_DATA, credenciais.valido.DN)
            super.validarElemento(U.INP_CPF)
            super.typeValue(U.INP_CPF, credenciais.valido.cpf)
            super.validarElemento(U.INP_TELEFONE)
            super.typeValue(U.INP_TELEFONE, credenciais.valido.TF)
            super.validarElemento(U.INP_CELULAR)
            super.typeValue(U.INP_CELULAR, credenciais.valido.TC)
            super.validarElemento(U.INP_EMAIL)
            super.typeValue(U.INP_EMAIL, credenciais.valido.email)
            super.validarElemento(U.INP_EMAIL2)
            super.typeValue(U.INP_EMAIL2, credenciais.valido.email)
            super.validarElemento(U.INP_SENHA)
            super.typeValue(U.INP_SENHA, credenciais.valido.senha)
            super.validarElemento(U.INP_SENHA2)
            super.typeValue(U.INP_SENHA2, credenciais.valido.senha)
            super.validarElemento(U.BTN_AVANÇAR)
            super.clickOnElement(U.BTN_AVANÇAR)
        })
    }

    static gerarCep() {
        cy.writeFile('cypress/fixtures/endereco.json',  {
        'valido' :
            {
            "cep": `${fakerBr.cep()}`,
            "numero": `${faker.datatype.number()}`
            }
        
        })
    }

}