const db = require('../db');

class Repositiory {
  _table = '';
  _columns = '';
  _values = [];

  constructor({table, columns, values}) {
    this._table = table;
    this._columns = columns;
    this._values = values;
    this._helper = new Helper()
  }

  async save() {
    const saved = await db.query(
      `INSERT INTO ${this._table} (${this._columns}) values (${this._helper.setValueID(this._values)}) RETURNING *`,
      this._values
    );
    return saved.rows[0];
  }
}

class Helper {
  setValueID(values) {
    let result = '';
    let i = 1;
    const length = values.length

    while (i <= length) {
      if (i === length) {
        result = result.concat(`$${i}`);
        break
      }
      result = result.concat(`$${i},`);
      i++
    }
    return result;
  }
}

module.exports = { Repositiory, Helper};
