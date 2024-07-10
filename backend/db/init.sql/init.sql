-- init.sql
CREATE TABLE ONUs (
    id SERIAL PRIMARY KEY,
    slot INT,
    port INT,
    ont_id INT,
    sn VARCHAR(50),
    state VARCHAR(10),
    manufacturer VARCHAR(50)
);