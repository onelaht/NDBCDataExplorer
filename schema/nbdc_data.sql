DROP TABLE IF EXISTS stations;

CREATE TABLE IF NOT EXISTS stations (
    station_id TEXT PRIMARY KEY,
    owner TEXT,
    ttype TEXT,
    hull TEXT,
    name TEXT,
    payload TEXT,
    location TEXT,
    timezone TEXT,
    forecast TEXT,
    note TEXT,
    last_updated TIMESTAMP
);