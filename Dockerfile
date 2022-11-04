FROM ruby:3.1.2-slim

RUN apt-get update -qq && apt-get install -y curl build-essential libpq-dev \
 nodejs postgresql-client &&\
  curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y nodejs yarn

WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN gem update --system && gem install bundler && gem install bundler foreman && bundle install

COPY entrypoint-app.sh entrypoint-worker.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint-app.sh
RUN chmod +x /usr/bin/entrypoint-worker.sh

EXPOSE 3000