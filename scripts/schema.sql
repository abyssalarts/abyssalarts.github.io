-- Abyssal Arts Website — Turso database schema
-- Run once via: turso db shell <db-name> < scripts/schema.sql

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    hashed_password TEXT,
    github_id TEXT UNIQUE,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    avatar_url TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);

CREATE TABLE IF NOT EXISTS licenses (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product TEXT NOT NULL,
    license_key TEXT UNIQUE NOT NULL,
    stripe_session_id TEXT,
    device_count INTEGER NOT NULL DEFAULT 0,
    max_devices INTEGER NOT NULL DEFAULT 3,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    revoked INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS licenses_user_id_idx ON licenses(user_id);
CREATE INDEX IF NOT EXISTS licenses_license_key_idx ON licenses(license_key);

CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product TEXT NOT NULL,
    body TEXT NOT NULL,
    parent_id TEXT REFERENCES comments(id) ON DELETE CASCADE,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    edited_at INTEGER,
    deleted INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS comments_product_idx ON comments(product);
CREATE INDEX IF NOT EXISTS comments_user_id_idx ON comments(user_id);

CREATE TABLE IF NOT EXISTS feedback (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    product TEXT NOT NULL,
    type TEXT NOT NULL,
    body TEXT NOT NULL,
    email TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS feedback_product_idx ON feedback(product);
