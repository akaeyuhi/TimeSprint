CREATE TABLE "user" (
  "id" int PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "password" varchar,
  "role" enum,
  "teams" in,
  "activities" in,
  "tasks" in
);

CREATE TABLE "site_admins" (
  "id" int PRIMARY KEY,
  "users" in
);

CREATE TABLE "team" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "members" in,
  "admins" in,
  "projects" in
);

CREATE TABLE "leisure_activities" (
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
  "tasks" in
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
  "user_teams" in,
  PRIMARY KEY ("team_id", "user_teams")
);

ALTER TABLE "team_user" ADD FOREIGN KEY ("team_id") REFERENCES "team" ("id");

ALTER TABLE "team_user" ADD FOREIGN KEY ("user_teams") REFERENCES "user" ("teams");


ALTER TABLE "user" ADD FOREIGN KEY ("activities") REFERENCES "leisure_activities" ("id");

ALTER TABLE "user" ADD FOREIGN KEY ("tasks") REFERENCES "task" ("id");

ALTER TABLE "site_admins" ADD FOREIGN KEY ("users") REFERENCES "user" ("id");

CREATE TABLE "user_team" (
  "user_id" int,
  "team_members" in,
  PRIMARY KEY ("user_id", "team_members")
);

ALTER TABLE "user_team" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_team" ADD FOREIGN KEY ("team_members") REFERENCES "team" ("members");


CREATE TABLE "user_team(1)" (
  "user_id" int,
  "team_admins" in,
  PRIMARY KEY ("user_id", "team_admins")
);

ALTER TABLE "user_team(1)" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_team(1)" ADD FOREIGN KEY ("team_admins") REFERENCES "team" ("admins");


ALTER TABLE "team" ADD FOREIGN KEY ("projects") REFERENCES "project" ("id");

ALTER TABLE "project" ADD FOREIGN KEY ("tasks") REFERENCES "task" ("id");
