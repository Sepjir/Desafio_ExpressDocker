CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE todos (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    fecha varchar(255) NOT NULL
);