CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at timestamptz
);

CREATE TABLE category_translations (
    id SERIAL PRIMARY KEY,
    category_uuid VARCHAR(255) NOT NULL,
    locale VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    keywords TEXT,
    created_at timestamptz,
    FOREIGN KEY (category_uuid) REFERENCES categories(uuid) ON DELETE CASCADE
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    thumbnail_url VARCHAR(255),
    game_url VARCHAR(255) NOT NULL,
    category_uuid VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    is_home_game BOOLEAN DEFAULT FALSE,
    sort INTEGER DEFAULT 0,
    created_at timestamptz,
    updated_at timestamptz,
    FOREIGN KEY (category_uuid) REFERENCES categories(uuid) ON DELETE CASCADE
);

CREATE TABLE game_translations (
    id SERIAL PRIMARY KEY,
    game_uuid VARCHAR(255) NOT NULL,
    locale VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    keywords TEXT,
    created_at timestamptz,
    FOREIGN KEY (game_uuid) REFERENCES games(uuid) ON DELETE CASCADE
);

CREATE TABLE game_recommendations (
    id SERIAL PRIMARY KEY,
    source_game_uuid VARCHAR(255) NOT NULL,
    recommended_game_uuid VARCHAR(255) NOT NULL,
    sort INTEGER DEFAULT 0,
    created_at timestamptz,
    FOREIGN KEY (source_game_uuid) REFERENCES games(uuid) ON DELETE CASCADE,
    FOREIGN KEY (recommended_game_uuid) REFERENCES games(uuid) ON DELETE CASCADE
);
