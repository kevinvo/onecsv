FROM ruby:3.1.2

RUN apt-get update -qq && apt-get install -y curl build-essential libpq-dev \
 nodejs postgresql-client &&\
  curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y nodejs yarn

ADD . /app
WORKDIR /app

COPY Gemfile /app/Gemfile
RUN bundle install

COPY package.json /app/package.json
RUN yarn install

COPY . .
EXPOSE 3000
CMD ["rails","server","-b","0.0.0.0"]