const { Pool } = require('pg');
const pool = new Pool({
  user: 'vtx',
  host: 'localhost',
  database: 'virtexdb',
  password: 'vtxchallenge',
  port: 5432,
});

const getData = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ONUs');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const insertData = async (req, res) => {
  const { slot, port, ont_id, sn, state, manufacturer } = req.body;
  try {
    await pool.query(
      'INSERT INTO ONUs (slot, port, ont_id, sn, state, manufacturer) VALUES ($1, $2, $3, $4, $5, $6)',
      [slot, port, ont_id, sn, state, manufacturer]
    );
    res.json({ message: 'Data inserted successfully' });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { getData, insertData };
