CREATE TABLE huawei (
    id SERIAL PRIMARY KEY,
    slot INT,
    port INT,
    ont_id INT,
    sn VARCHAR(50),
    state VARCHAR(50)
);

CREATE TABLE zte_sns (
    id SERIAL PRIMARY KEY,
    slot INT,
    port INT,
    ont_id INT,
    sn VARCHAR(50),
    state VARCHAR(50)
);

CREATE TABLE zte_state (
    id SERIAL PRIMARY KEY,
    slot INT,
    port INT,
    ont_id INT,
    state VARCHAR(50)
);