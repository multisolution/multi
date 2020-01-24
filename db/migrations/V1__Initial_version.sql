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
    room_number int       not null unique,
    description text,
    color       varchar   not null,
    timestamp   timestamp not null default current_timestamp
);

create table meetings
(
    id        varchar   not null primary key,
    host_id   varchar   not null references users (id),
    room_id   varchar   not null references meeting_rooms (id),
    title     varchar   not null,
    starts_at timestamp not null,
    ends_at   timestamp not null,
    status    status    not null,
    timestamp timestamp not null default current_timestamp
);

create table services
(
    id        varchar   not null primary key,
    title     varchar   not null,
    timestamp timestamp not null default current_timestamp
);

create table service_orders
(
    id         varchar   not null primary key,
    user_id    varchar   not null references users (id),
    meeting_id varchar   not null references meetings (id),
    fulfilled  boolean   not null default false,
    timestamp  timestamp not null default current_timestamp
);

create table service_requests
(
    id         varchar   not null primary key,
    order_id   varchar   not null references service_orders (id),
    service_id varchar   not null references services (id),
    total      int       not null,
    timestamp  timestamp not null default current_timestamp
);

insert into users
values ('root', 'multi@multisolution.art.br', '$2y$10$edZ0ukUfvvcmRP/jWzFaveIisvigFJoM6WvXiC98q.CnsXsYXoO.S',
        'ADMINISTRATOR');

insert into meeting_rooms (id, room_number, description, color)
values ('room1', 1, 'Room 1 is very nice', '#0E7C7B'),
       ('room2', 2, 'Room 2 is very nice', '#984447'),
       ('room3', 3, 'Room 3 is very nice', '#FFBA08'),
       ('room4', 4, 'Room 4 is very nice', '#3F88C5'),
       ('room5', 5, 'Room 5 is very nice', '#032B43'),
       ('room6', 6, 'Room 6 is very nice', '#541388');

insert into services (id, title)
values ('service1', 'Café'),
       ('service2', 'Água'),
       ('service3', 'Chá'),
       ('service4', 'Pão de queijo'),
       ('service5', 'Esfiha'),
       ('service6', 'Limpeza');
