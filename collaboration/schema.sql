CREATE TABLE IF NOT EXISTS documents (
 id uuid PRIMARY KEY,
 title text NOT NULL DEFAULT 'Untitled document',
 state bytea NOT NULL,
 updated_at timestamptz NOT NULL DEFAULT now()
);
