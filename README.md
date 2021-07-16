# MoleculerDyte

## Running with Docker
```bash
docker-compose up
```

## API Endpoints

> API runs on port `3000` by default

| Method | Endpoint | Description | Body |
|--------|-----------|-------------|-----|
|POST    |/admin/register | create new webhook      | { targetUrl }       |
|POST    |/admin/update   | update existing webhook | { id, newtargetUrl }|
|POST    |/admin/delete   | delete webhook          | { id }              |
|GET     |/admin/list     | List all webhooks       | -                   |
|GET     |/ip             | Trigger all webhooks    | -                   |