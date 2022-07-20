const db = require('../db');

class Repository {
  static async save(table, columns, values) {
    const saved = await db.query(
      `INSERT INTO ${table} (${columns}) values (${Helper.setValueID(
        Helper.convertValuesToArray(values)
      )}) RETURNING *`,
      Helper.convertValuesToArray(values)
    );
    return saved.rows[0];
  }

  static async getAll(table, res) {
    const result = await db.query('SELECT * FROM ' + table);
    return res.json(result.rows);
  }

  static async getOne(table, id, res) {
    const result = await db.query(`SELECT * FROM ${table} WHERE id = ${id}`);
    return res.json(result.rows[0]);
  }

  static async remove(table, id) {
    await db.query(`DELETE FROM ${table} WHERE id = ${id} RETURNING *`);
  }

  static async update(table, id, columns, values) {
    const updatedPerson = await db.query(
      `UPDATE ${table} set ${Helper.createDbQueryString(columns)} WHERE id = ${id} RETURNING *`,
      Helper.convertValuesToArray(values)
    );
    return updatedPerson.rows[0]
  }
}

class Helper {
  static setValueID(values) {
    let result = '';
    let i = 1;
    const length = values.length;

    while (i <= length) {
      if (i === length) {
        result = result.concat(`$${i}`);
        break;
      }
      result = result.concat(`$${i},`);
      i++;
    }
    return result;
  }
  static convertValuesToArray(values) {
    return Object.values(values);
  }
  static createDbQueryString(columns) {
    const dbQueryString = columns.map((c, i) => c + ' = ' + '$' + [i + 1]);
    return dbQueryString;
  }
}

module.exports = { Repository, Helper };
