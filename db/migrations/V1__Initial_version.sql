create type role as enum ('ADMINISTRATOR', 'COLLABORATOR');
create type status as enum ('SCHEDULED', 'CANCELLED');

create table users
(
    id        varchar   not null primary key,
    email     varchar   not null,
    password  varchar   not null,
    role      role      not null,
    timestamp timestamp not null default current_timestamp
);

create table meeting_rooms
(
    id          varchar   not null primary key,
    room_number int       not null,
    description text,
    timestamp   timestamp not null default current_timestamp,
    unique (room_number)
);

create table meetings
(
    id        varchar   not null primary key,
    host_id   varchar   not null references users (id),
    room_id   varchar   not null references meeting_rooms (id),
    starts_at timestamp not null,
    ends_at   timestamp not null,
    status    status    not null,
    timestamp timestamp not null default current_timestamp
);

insert into users
values ('root', 'multi@multisolution.art.br', '$2y$10$edZ0ukUfvvcmRP/jWzFaveIisvigFJoM6WvXiC98q.CnsXsYXoO.S',
        'ADMINISTRATOR');
