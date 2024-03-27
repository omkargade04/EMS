create table users(
    user_id serial primary key,
    name varchar(255) not null,
    email varchar(255) unique not null,
    password varchar(255) unique not null,
    is_student boolean default false,
    is_educator boolean default false,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table user_token(
    user_token_id serial primary key,
    token varchar not null,
    fk_user int not null,
    created_at timestamp default current_timestamp,
    constraint fk_user foreign key(fk_user) references users(user_id) on delete cascade on update cascade
);

create table admins(
    admin_id serial primary key, 
    name varchar(255) not null,
    password varchar(255) unique not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table admin_token(
    admin_token_id serial primary key,
    token varchar not null,
    fk_admin int not null,
    created_at timestamp default current_timestamp,
    constraint fk_admin foreign key(fk_admin) references admins(admin_id) on delete cascade on update cascade
);