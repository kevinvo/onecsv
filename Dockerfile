FROM ruby:3.1.2-slim

RUN apt-get update -qq && apt-get install -y curl build-essential libpq-dev \
 nodejs postgresql-client &&\
  curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y nodejs yarn

RUN gem update --system && gem install bundler

WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN gem install bundler foreman && bundle install

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]