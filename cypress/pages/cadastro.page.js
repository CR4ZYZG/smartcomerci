import faker from 'faker'
import Base from './_base.page';
import { fakerBr } from 'js-brasil';


const nome = faker.name.firstName();
const dn = faker.date.between(1/1/1900, 1/1/2010);


export default class Cad extends Base{
    static criarCadastro() {
        cy.writeFile('cypress/fixtures/credenciais.json', { 
            'name': `${faker.name.firstName()}`, 
            'dataNascimento': `${faker.date.between(1900/1/1, 2010/1/1)}`,
            'CPF': `${fakerBr.cpf()}`, 
            'TF': `${faker.phone.phoneNumber()}` });
     
    }   
}
