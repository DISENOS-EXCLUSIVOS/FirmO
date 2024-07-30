INSERT INTO
  "User" ("email", "name")
VALUES
  ('serviceaccount@disex.com.co', 'Service Account')
ON CONFLICT DO NOTHING;
