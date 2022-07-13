const { Helper } = require('../../db/classes/Repository');

describe('helper behavior', () => {
  const request = {
    name: 'Alexandr',
    surname: 'Smirnov',
    login: 'Alex',
    password: 'Alex',
    email: 'alex@gmail.com'
  };
  const {name, surname, login, password, email} = request

  const values = [name, surname, login, password, email];

  const helper = new Helper()
  const identifiers = helper.setValueID(values)

  test('length of value identifiers must be equal to length of values', () => {
    expect(values.length).toEqual(identifiers.split(",").length)
  })
  test('text content should be the same', () => {
    const str = "$1,$2,$3,$4,$5"
    expect(str).toEqual(identifiers)
  })



});