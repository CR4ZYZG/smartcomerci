export default class Base{
    static getElement(element, index = undefined) {
      let elem;
  
      if (typeof index !== 'undefined' || index > 0) {
        elem = cy.get(element, { timeout: Cypress.env('global_timeout') }).eq(index);
      } else {
        elem = cy.get(element, { timeout: Cypress.env('global_timeout') });
      }
      return elem;
    }
  
    static getElementContaining(text) {
      return cy.contains(text, { timeout: Cypress.env('global_timeout') }).should('be.visible');
    }
  
    static getElementByXPath(element, index) {
      let elem;
  
      if (typeof index !== 'undefined' || index > 0) {
        elem = cy.xpath(element, { timeout: Cypress.env('global_timeout') }).eq(index);
      } else {
        elem = cy.xpath(element, { timeout: Cypress.env('global_timeout') });
      }
  
      return elem;
    }
  
    static validateText(baseValue, comparingValue) {
      expect(baseValue).to.contains(comparingValue);
    }
  
    static validateElementText(element, value, index = undefined) {
      this.getElementText(element, index).then((text) => {
        expect(text).to.contains(value);
      });
    }
  
    static getElementText(element, index = undefined) {
      return this.getElement(element, index).invoke('text');
    }
  
    static typeValue(element, value, force = false) {
      if (force === true) {
        this.getElement(element).type(value, { force: true });
      } else {
        this.getElement(element).type(value);
      }
    }
  
    static typeValueXPath(element, value, force = false) {
      if (force === true) {
        this.getElementByXPath(element).type(value, { force: true });
      } else {
        this.getElementByXPath(element).type(value);
      }
    }
  
    static typeWithDay(element, value) {
      this.getElement(element).type(value, { timeout: Cypress.env('global_timeout') });
    }
  
    static clickOnElement(element, index = undefined, force = false) {
      if (force === true) {
        return this.getElement(element, index).click({ force: true });
      } else {
        return this.getElement(element, index).click();
      }
    }
  
    static verifyIfElementExists(element) {
      this.getElement(element).should('exist', { timeout: Cypress.env('global_timeout') });
    }
  
    static verifyIfElementDoesNotExist(element) {
      this.getElement(element).should('not.exist', { timeout: Cypress.env('global_timeout') });
    }
  
    static verifyIfElementIsHidden(element) {
      this.getElement(element).should('not.be.visible', { timeout: Cypress.env('global_timeout') });
    }
  
    static waitElementAndSelectOption(element, option) {
      return this.getElement(element).should('be.visible').select(option);
    }
  
    static validarPrimeiroElementoDoArray(array, value) {
      cy.get(array).first().should('contain', value)
    }
  
    static validarUrl(url){
      cy.url(`${Cypress.env('baseURL_front')}`).should('include', url) 
    }
  
    static validarElemento(elemento, index){
      this.getElement(elemento, index).should('be.visible', { timeout: Cypress.env('global_timeout') });
    }
  
  
    static verificarSeElementoNãoContemAtr(element, atr) {
      cy.get(element).should('not.have.attr', atr)
    }
  
    static validateElementValue(element, text, index = undefined) {
      this.typeValue(element, text)
      this.getElementText(element, index).then((value) => {
      expect(value).to.contain('teste');
  
      });
    }
  }