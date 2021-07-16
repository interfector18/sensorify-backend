CREATE TYPE SensorType AS ENUM ('light', 'temp');
CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55) NOT NULL,
    school_name VARCHAR(55) NOT NULL
);

CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    value REAL NOT NULL,
    sensor_type SensorType NOT NULL,
    device_id INT NOT NULL REFERENCES devices(id),
    timestamp timestamp NOT NULL
);