CREATE TABLE IF NOT EXISTS subscribers (
  email TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  source TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  confirmed_at TEXT,
  unsubscribed_at TEXT,
  last_message_id TEXT
);

CREATE INDEX IF NOT EXISTS idx_subscribers_status
  ON subscribers(status);

CREATE TABLE IF NOT EXISTS email_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  event_type TEXT NOT NULL,
  subject TEXT,
  message_id TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_email_events_email
  ON email_events(email);

CREATE INDEX IF NOT EXISTS idx_email_events_created_at
  ON email_events(created_at);
