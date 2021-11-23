import faker from 'faker'
import Base from './_base.page';

const nome = faker.name.firstName();

export default class Cad extends Base{
    static criarCadastro() {
        cy.writeFile('cypress/fixtures/credenciais.json', { name: `${nome}`, email: 'eliza@example.com' })
        cy.readFile('cypress/fixtures/credenciais.json')
    }   
}
