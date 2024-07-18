CREATE DATABASE futsal_booking;

USE futsal_booking;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
    ALTER TABLE users ADD email VARCHAR(100) NOT NULL AFTER username;

);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin and user
INSERT INTO users (username, password, role) VALUES ('admin', SHA2('admin123', 256), 'admin');
INSERT INTO users (username, password, role) VALUES ('user', SHA2('user123', 256), 'user');
