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
\i path.sql
```

run from root of project to init all the tables.

```bash
\d
```

Describe.

```bash
\l
```

list all databases.

```bash
DROP <type> <name>
```

list all databases.

```bash
psql -U <userName> -h <host> -d <dbName>
```

## in dev host can be ignored

Connect to Database.

```bash
\c <Name of databse>
```

move between databases

```bash
\q
```

Quit.
