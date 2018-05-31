CREATE TABLE users (
  id serial PRIMARY KEY,
  name varchar(100) not null,
  email varchar(100) not null,
  is_admin int DEFAULT 0,
  password varchar(250) not null
);

CREATE TABLE requests (
  id serial PRIMARY KEY,
  title varchar(250) not null,
  type varchar(250) not null,
  description text not null,
  user_id int not null,
  status_id int DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT Now()
);
