rm -f tmp/pids/server.pid
exec bundle exec rails s -b 0.0.0.0
exec yarn build --watch
exec yarn build:css --watch