const mysql = require('mysql2');
const connection = mysql.createConnection({
    user: 'wpr',
    password: 'fit2023',
    database: 'wpr2023'
});

const createUsersTable = `CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    inbox TEXT,
    outbox TEXT
  )`;
const createEmailsTable = `CREATE TABLE emails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT,
    recipient_id INT,
    subject TEXT,
    body TEXT,
    file TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (recipient_id) REFERENCES users(id)
  )`;
const insertUsersData = `INSERT INTO users (fullname, password, email) VALUES
  ('Email Admin', '12345678', 'a@a.com'),
  ('Nguyen Xuan Hien', '12345678', 'hien1832@student.com'),
  ('Dang Dinh Quan', '12345678', 'quandd@teacher.com')`;
const insertEmailsData = `INSERT INTO emails (sender_id, recipient_id, subject, body, file) VALUES
  (1, 2, 'Hello Hien1832', 'Your account is created successfully!!!', ''),
  (1, 3, 'Hello Quandd', 'Your account is created successfully!!!', ''),
  (2, 1, 'Service Rating', 'Good service', ''),
  (3, 1, 'Service Rating', 'Good service', ''),
  (1, 3, 'Rating reply', 'Thanks for rating!!!', ''),
  (1, 2, 'Rating reply', 'Thanks for rating!!!', ''),
  (2, 1, '', '', ''),
  (3, 1, '', '', '')`;
const updateEmailDataForUser1 = `UPDATE users
  SET inbox = '[3, 4, 7, 8]', outbox = '[1, 2, 5, 6]'
  WHERE id = 1`;
const updateEmailDataForUser2 = `UPDATE users 
  SET inbox = '[1,6]', outbox = '[3,7]'
  WHERE id = 2`;
const updateEmailDataForUser3 = `UPDATE users 
  SET inbox = '[2,5]', outbox = '[4,8]'
  WHERE id = 3`;

try {
    connection.promise().query(createUsersTable);
    connection.promise().query(createEmailsTable);
    connection.promise().query(insertUsersData);
    connection.promise().query(insertEmailsData);
    connection.promise().query(updateEmailDataForUser1);
    connection.promise().query(updateEmailDataForUser2);
    connection.promise().query(updateEmailDataForUser3);
    console.log('Set up the database for the first time successfully!!!')
} catch (error) {
    console.log(error);
}


