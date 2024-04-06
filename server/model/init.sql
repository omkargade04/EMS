-- create table users(
--     user_id serial primary key,
--     name varchar(255) not null,
--     email varchar(255) unique not null,
--     password varchar(255) unique not null,
--     created_at timestamp default current_timestamp,
--     updated_at timestamp default current_timestamp
-- );

create table user_token(
    user_token_id serial primary key,
    token varchar not null,
    fk_educator int,
    fk_student int,
    role varchar(255) not null,
    created_at timestamp default current_timestamp,
    constraint fk_student foreign key(fk_student) references students(student_id) on delete cascade on update cascade,
    constraint fk_educator foreign key(fk_educator) references educators(educator_id) on delete cascade on update cascade
);

create table students(
    student_id serial primary key,
    name varchar(255) not null,
    email varchar(255) unique not null,
    password varchar(255) unique not null,
    role varchar(255) not null,
    applied_courses varchar(255)[] default array[]::varchar(255)[],
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table educators(
    educator_id serial primary key,
    name varchar(255) not null,
    email varchar(255) unique not null,
    password varchar(255) unique not null,
    institute varchar(255) not null,
    experience int,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table educator_verification(
    verification_id serial primary key,
    name varchar(255) not null,
    email varchar(255) unique not null,
    password varchar(255) unique not null,
    institute varchar(255) not null,
    experience int,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table courses(
    course_id serial primary key,
    course_title varchar(255),
    course_description varchar(255),
    course_price int,
    fk_educator int not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint fk_educator foreign key(fk_educator) references educators(educator_id) on delete cascade on update cascade
);

create table course(
    id serial primary key,
    fk_educator int,
    title varchar(255),
    description text,
    imageUrl varchar(255),
    price float,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table chapters(
    chapter_id serial primary key,
    title varchar(255),
    description text,
    position int,
    isPublished boolean default false,
    isFree boolean default false
    fk_course int,
    purchases varchar(255)[] default array[]::varchar(255)[],
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
    constraint fk_course foreign key(fk_course) references course(id) on delete cascade on update cascade
);

create table purchase(
    purchase_id serial primary key,
    fk_student int,
    fk_course int,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint fk_course foreign key(fk_course) references course(id) on delete cascade on update cascade,
    constraint fk_student foreign key(fk_student) references students(student_id) on delete cascade on update cascade
);

create table stripeCustomer(
    stripe_id varchar(255) primary key,
    fk_student int,
    stripeCustomerId int,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp 
);

create table admins(
    admin_id serial primary key, 
    name varchar(255) not null,
    password varchar(255) unique not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint fk_educator foreign key(fk_educator) references educators(educator_id) on delete cascade on update cascade
);

create table admin_token(
    admin_token_id serial primary key,
    token varchar not null,
    fk_admin int not null,
    created_at timestamp default current_timestamp,
    constraint fk_admin foreign key(fk_admin) references admins(admin_id) on delete cascade on update cascade
);