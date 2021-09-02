"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileClient from '../components/MobileClient';

let client = {id:1, lastName: "Иванов", name: "Иван", middleName: "Иванович", balance:200};

test('работа кнопки Редактировать', () => {

  const component = renderer.create(
    <MobileClient info={client} />
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const buttonAllElem = component.root.findByProps({ value: "Редактировать" });
  
  buttonAllElem.props.onClick();

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  buttonAllElem.props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
});

test('работа кнопки Удалить', () => {

  const component = renderer.create(
    <MobileClient info={client} />
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const buttonAllElem = component.root.findByProps({ value: "Удалить" });
  
  buttonAllElem.props.onClick();

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  buttonAllElem.props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
});