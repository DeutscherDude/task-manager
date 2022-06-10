CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
INSERT INTO users(username, password)
VALUES('Stefan', 'JakubIsLebowski'),
    ('John', 'penis'),
    ('TheDude', 'weed');
CREATE TABLE IF NOT EXISTS tasks (
    task_id SERIAL PRIMARY KEY,
    fk_user_id INTEGER REFERENCES users(user_id),
    title TEXT NOT NULL,
    description TEXT,
    status BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO tasks (fk_user_id, title, description)
VALUES(
        1,
        'Take out the Garbage',
        'I gotta take the smelly shit out'
    ),
    (2, 'Maidenless?', 'Get some bitches'),
    (
        3,
        'SORT?',
        'How about you sort yourself some pussy?'
    );
