#!/bin/sh

set -e
rm -f /app/tmp/pids/server.pid
bundle exec sidekiq