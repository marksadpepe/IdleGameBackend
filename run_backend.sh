#!/usr/bin/sh

export DB_GREPPED_URL=$(grep "DB_URL" .env | xargs)
export DB_PORT=$(echo $DB_GREPPED_URL | awk -F':' '{print $NF}' | awk -F'/' '{print $1}')
export DB_USERNAME=$(echo $DB_GREPPED_URL | awk -F':' '{print $2}' | awk -F'/' '{print $NF}')
export DB_PASSWORD=$(echo $DB_GREPPED_URL | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
export DB_HOST=$(echo $DB_GREPPED_URL | awk -F':' '{print $3}' | awk -F'@' '{print $2}')
export DB_NAME=$(echo $DB_GREPPED_URL | awk -F':' '{print $NF}' | awk -F'/' '{print $NF}')

echo "Creating users table..."
psql -h $DB_HOST -U $DB_USERNAME -d $DB_NAME -c '
create table if not exists users (
id serial primary key,
username varchar(255) unique not null,
password varchar(255) not null,
xp integer default 0,
level smallint default 1,
created_at timestamp default current_timestamp,
last_seen_time timestamp default current_timestamp
);'

echo "Creating tokens table..."
psql -h $DB_HOST -U $DB_USERNAME -d $DB_NAME -c '
create table if not exists tokens (
id serial primary key,
refresh_token varchar(400) not null,
user_id integer not null,
foreign key (user_id) references users (id)
);'

npm run start:dev
