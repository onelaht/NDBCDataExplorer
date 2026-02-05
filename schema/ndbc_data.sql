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

CREATE TABLE IF NOT EXISTS stations_owner (
    code TEXT PRIMARY KEY,
    name TEXT,
    country_code TEXT,
    last_updated TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stations_datatype (
     station_id TEXT PRIMARY KEY,
     adcp INTEGER,
     cwind INTEGER,
     dart INTEGER,
     drift INTEGER,
     ocean INTEGER,
     rain INTEGER,
     spec INTEGER,
     spectral INTEGER,
     srad INTEGER,
     supl INTEGER,
     txt INTEGER,
     last_updated TIMESTAMP
);