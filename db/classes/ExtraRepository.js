const db = require('../db');

class ExtraRepository {
  static async save(table) {
    const saved = await db.query(
      `INSERT INTO ${table} default values RETURNING *`,
    );
    return saved.rows[0];
  }
}

module.exports = { ExtraRepository };