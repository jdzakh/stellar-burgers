describe('создание заказа', () => {
  before(() => {
    cy.visit('http://localhost:4000');
  });

  it('должен открыть страницу конструктора по умолчанию', () => {
    cy.contains('Соберите бургер');
  });

  it('добавляет ингредиенты и оформляет заказ', () => {
    cy.get('[class^=BurgerConstructor_constructor_container_]').as('constructor');

    const dragAndDrop = (ingredientText) => {
      cy.contains('li', ingredientText)
        .trigger('dragstart')
        .trigger('dragleave');
      cy.get('@constructor')
        .trigger('dragenter')
        .trigger('dragover')
        .trigger('drop')
        .trigger('dragend');
    };

    dragAndDrop('Флюоресцентная булка R2-D3');
    dragAndDrop('Кристаллы марсианских альфа-сахаридов');
    dragAndDrop('Плоды Фалленианского дерева');

    cy.contains('Оформить заказ').click();
  });

  it('входит в профиль и оформляет заказ', () => {
    cy.get('form').within(() => {
      cy.get('input[name="e-mail"]').type('qwe@mail.com');
      cy.get('input[name="password"]').type('1234qwer');
    });
    cy.contains('Войти').click();
    cy.wait(500);
    cy.contains('Оформить заказ').click();
  });

  it('загружает и закрывает модальное окно с подтверждением', () => {
    cy.wait(15000);
    cy.contains('Ваш заказ начали готовить');
    cy.get('#modals button').click();
  });

  it('открывает ленту заказов и возвращается к конструктору', () => {
    cy.contains('Лента заказов').click();
    cy.wait(500);
    cy.contains('Конструктор').click();
  });
});