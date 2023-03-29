CREATE TABLE projects(
    id bigserial not null primary key,
    name varchar(200) not null
);

CREATE TABLE tasks(
    id bigserial not null primary key,
    title varchar(200) not null,
    project_id bigint not null references projects(id),
    done boolean not null
);

CREATE INDEX idx_tasks_title ON tasks(title);

INSERT INTO projects(name) VALUES
    ('Project Salsa'),
    ('Project Tango');

INSERT INTO tasks (title, done, project_id) VALUES
    ('Finish logo', true, 1),
    ('Write unit tests', false, 1),
    ('Choose a name', false, 1),
    ('Review copy', true, 1),
    ('Deploy to staging', false, 1),
    ('Deploy to production', false, 1),
    ('Smoke testing', false, 2),
    ('Talk to marketing', false, 2),
    ('Load testing', false, 2);
