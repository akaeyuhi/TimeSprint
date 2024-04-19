CREATE TYPE "role" AS ENUM (
  'collaborator',
  'admin'
);

CREATE TABLE "user" (
  "id" int PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "password" varchar,
  "role" role,
  "teams" team,
  "activities" leisure_activity,
  "tasks" task
);

CREATE TABLE "site_admins" (
  "id" int PRIMARY KEY,
  "users" "user"
);

CREATE TABLE "team" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "members" "user",
  "admins" "user",
  "projects" project
);

CREATE TABLE "leisure_activity" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "start_date" timestamp,
  "end_date" timestamp
);

CREATE TABLE "project" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "start_date" timestamp,
  "end_date" timestamp,
  "tasks" task
);

CREATE TABLE "task" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "urgency" boolean,
  "importance" boolean,
  "start_date" timestamp,
  "end_date" timestamp
);

CREATE TABLE "team_user" (
  "team_id" int,
  "user_teams" team,
  PRIMARY KEY ("team_id", "user_teams")
);

ALTER TABLE "team_user" ADD FOREIGN KEY ("team_id") REFERENCES "team" ("id");

ALTER TABLE "team_user" ADD FOREIGN KEY ("user_teams") REFERENCES "user" ("teams");


ALTER TABLE "user" ADD FOREIGN KEY ("activities") REFERENCES "leisure_activity" ("id");

ALTER TABLE "user" ADD FOREIGN KEY ("tasks") REFERENCES "task" ("id");

ALTER TABLE "site_admins" ADD FOREIGN KEY ("users") REFERENCES "user" ("id");

CREATE TABLE "user_team" (
  "user_id" int,
  "team_members" "user",
  PRIMARY KEY ("user_id", "team_members")
);

ALTER TABLE "user_team" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_team" ADD FOREIGN KEY ("team_members") REFERENCES "team" ("members");


CREATE TABLE "user_team(1)" (
  "user_id" int,
  "team_admins" "user",
  PRIMARY KEY ("user_id", "team_admins")
);

ALTER TABLE "user_team(1)" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_team(1)" ADD FOREIGN KEY ("team_admins") REFERENCES "team" ("admins");


ALTER TABLE "team" ADD FOREIGN KEY ("projects") REFERENCES "project" ("id");

ALTER TABLE "project" ADD FOREIGN KEY ("tasks") REFERENCES "task" ("id");
