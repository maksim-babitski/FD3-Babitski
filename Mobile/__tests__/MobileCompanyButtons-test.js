"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';

import clientsArr from '../clients.json';

let companyName='Velcom';

function confirmF() {   
    return confirm('Do you really want to delete this position?');
}

test('работа кнопки ВСЕ', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <MobileCompany name={companyName} clients={clientsArr} confirmFunc={confirmF} />
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму кнопку
  const buttonAllElem = component.root.findByProps({ value: "Все" });
  /*const buttonAllElem = component.root.find( el => el.props.className =='inputEdit');*/
  /*const buttonEdit = component.root.findByProps({ value: "Все" })*/
  
  // и "нажмём" на кнопку
  buttonAllElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // "нажмём" кнопку ещё раз
  buttonAllElem.props.onClick();
  
  // и получаем окончательный снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
});

test('работа кнопки АКТИВНЫЕ', () => {

  const component = renderer.create(
    <MobileCompany name={companyName} clients={clientsArr} confirmFunc={confirmF} />
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const buttonActiveElem = component.root.find( el => el.props.value == 'Активные');
  
  buttonActiveElem.props.onClick();

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  buttonActiveElem.props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
});

test('работа кнопки ЗАБЛОКИРОВАННЫЕ', () => {

  const component = renderer.create(
    <MobileCompany name={companyName} clients={clientsArr} confirmFunc={confirmF} />
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const buttonBlockedElem = component.root.find( el => el.props.value == 'Заблокированные');
  
  buttonBlockedElem.props.onClick();

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  buttonBlockedElem.props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
});

test('работа кнопки Добавить клиента', () => {

  const component = renderer.create(
    <MobileCompany name={companyName} clients={clientsArr} confirmFunc={confirmF} />
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const buttonAddElem = component.root.find( el => el.props.value == 'Добавь клиента');
  
  buttonAddElem.props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  buttonAddElem.props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
});