# PostGreSql Cheat Sheet

```bash
sudo service postgresql start
```
Starts the Service in linux.

```bash
psql -U postgres
```
logs in to postgre terminal.

```bash
CREATE USER <username> WITH PASSWORD '<password>';
```
Create New User.

```bash
\dt
```
Describe Tables.

```bash
\du
```
List Users

```bash
\i src/database/schema.sql 
```
run from root of project to init all the tables.

```bash
\d
```
Describe.

```bash
\q
```
Describe.
