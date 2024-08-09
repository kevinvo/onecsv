# OneCSV

## Usage

1. Local

```
$ docker compose build
$ docker compose run --rm web bin/rails db:setup
$ docker compose up
$ docker exec -it web  bundle exec rails db:migrate
```

http://localhost:3000/

## Deployment

Additional notes on how to deploy this on a live or release system. Explaining the most important branches, what pipelines they trigger and how to update the database (if anything special).
