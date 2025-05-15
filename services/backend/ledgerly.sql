CREATE TABLE receipts (
    receipt_id UUID PRIMARY KEY,              -- Unique identifier for each receipt
    user_id UUID NOT NULL,            -- ID of the user
    category VARCHAR(20) NOT NULL,           -- Category of the receipt
    receipt_date DATE NOT NULL,               -- Date of the receipt
    vendor_name VARCHAR(255) NOT NULL,                 -- Vendor's name
    total_amount NUMERIC(10, 2) NOT NULL,              -- Total amount in currency
    s3_url TEXT DEFAULT NULL                     -- URL of the receipt in S3
);

-- Index for faster querying by user_id and category
CREATE INDEX idx_user_category ON receipts (user_id, category);

-- Index for querying by user_id and receipt_date
CREATE INDEX idx_user_date ON receipts (user_id, receipt_date);

CREATE TABLE users (
    user_id UUID PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    password TEXT NOT NULL
    budget NUMERIC(10, 2) DEFAULT 0.00, -- Monthly budget
);

CREATE INDEX idx_users_email ON users (email);

ALTER TABLE receipts
ADD CONSTRAINT fk_receipts_users FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;