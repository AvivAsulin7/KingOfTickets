CREATE SCHEMA IF NOT EXISTS `hotix`;

DROP USER IF EXISTS 'hotix_server'@'%';
CREATE USER 'hotix_server'@'%' IDENTIFIED WITH mysql_native_password BY 'Aviv852456$';
GRANT ALL privileges ON hotix.* TO 'hotix_server'@'%';
FLUSH PRIVILEGES;

