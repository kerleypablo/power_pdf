CREATE TABLE merge_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NULL
);
