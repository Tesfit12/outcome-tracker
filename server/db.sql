CREATE DATABASE expense_db;

create table expense
(
    expense_id BIGSERIAL PRIMARY KEY,
    expense_name VARCHAR(1000) NOT NULL,
    expense_price NUMERIC(19, 2) NOT NULL,
    place VARCHAR(100),
    expense_description VARCHAR(1000),
    date_added DATE NOT NULL,
    owner_id BIGINT REFERENCES logger(loger_id)
);


create table logger
(
    loger_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(300) NOT NULL,
    last_name VARCHAR(300) NOT NULL,
    email VARCHAR(300),
    pwd VARCHAR(100) NOT NULL,
    confirm_pwd VARCHAR(300) NOT NULL

);


-- inser a fake user ---

INSERT INTO logger
    (first_name, last_name, email, pwd, confirm_pwd)
VALUES
    ('Ali', 'Baba', 'a@gamil.com', '222', '222');