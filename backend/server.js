const express = require('express');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Configurar a conexão com o PostgreSQL
const pool = new Pool({
    user: 'vtx',
    host: 'db',
    database: 'virtexdb',
    password: 'vtxchallenge',
    port: 5432,
});

// Funções de parsing
const parseHuawei = (data) => {
    const result = [];
    const lines = data.split('\n');
    for (const line of lines) {
        const match = line.match(/(\d+)\/(\d+)\/(\d+)\s+(\w+)\s+(\w+)\s+(\w+)/);
        if (match) {
            const [_, slot, port, ont_id, sn, status] = match;
            result.push({ slot, port, ont_id, sn, state: status });
        }
    }
    return result;
};

const parseZteSns = (data) => {
    const result = [];
    const lines = data.split('\n');
    for (const line of lines) {
        const match = line.match(/gpon-onu_(\d+)\/(\d+)\/(\d+):(\d+)\s+\w+\s+\w+\s+SN:(\w+)\s+(\w+)/);
        if (match) {
            const [_, slot, port, ont_id, sn, status] = match;
            result.push({ slot, port, ont_id, sn, state: status });
        }
    }
    return result;
};

const parseZteState = (data) => {
    const result = [];
    const lines = data.split('\n');
    for (const line of lines) {
        const match = line.match(/(\d+)\/(\d+)\/(\d+):(\d+)\s+\w+\s+\w+\s+(\w+)\s+\w+/);
        if (match) {
            const [_, slot, port, ont_id, status] = match;
            result.push({ slot, port, ont_id, state: status });
        }
    }
    return result;
};

// Funções para salvar e buscar os dados do banco de dados
const saveData = async (table, data) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        for (const item of data) {
            await client.query(`INSERT INTO ${table} (slot, port, ont_id, sn, state) VALUES ($1, $2, $3, $4, $5)`,
                [item.slot, item.port, item.ont_id, item.sn, item.state]);
        }
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getData = async (table) => {
    const client = await pool.connect();
    try {
        const res = await client.query(`SELECT * FROM ${table}`);
        return res.rows;
    } finally {
        client.release();
    }
};

app.use(express.static('public'));

app.get('/api/huawei', async (req, res) => {
    try {
        const data = await getData('huawei');
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api/zte-sns', async (req, res) => {
    try {
        const data = await getData('zte_sns');
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api/zte-state', async (req, res) => {
    try {
        const data = await getData('zte_state');
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rotas para salvar os dados parseados
app.post('/api/huawei', async (req, res) => {
    fs.readFile(path.join(__dirname, 'OntInfo - Huawei.txt'), 'utf8', async (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        try {
            const parsedData = parseHuawei(data);
            await saveData('huawei', parsedData);
            res.send(parsedData);
        } catch (err) {
            res.status(500).send(err);
        }
    });
});

app.post('/api/zte-sns', async (req, res) => {
    fs.readFile(path.join(__dirname, 'OntInfo - ZTE - SNs.txt'), 'utf8', async (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        try {
            const parsedData = parseZteSns(data);
            await saveData('zte_sns', parsedData);
            res.send(parsedData);
        } catch (err) {
            res.status(500).send(err);
        }
    });
});

app.post('/api/zte-state', async (req, res) => {
    fs.readFile(path.join(__dirname, 'OntInfo - ZTE - SNs - State.txt'), 'utf8', async (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        try {
            const parsedData = parseZteState(data);
            await saveData('zte_state', parsedData);
            res.send(parsedData);
        } catch (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
