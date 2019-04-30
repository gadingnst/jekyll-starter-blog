## Jekyll Starter Blog Template

> Jekyll Blog Starter kit.

> Demo Website : https://sutanlab.js.org/jekyll-starter-blog

#### Required in System
1. [NodeJS](https://nodejs.org/en/download/) 
2. [Ruby](https://www.ruby-lang.org/en/downloads/) 
3. [Bundler](https://bundler.io/) 

#### Install Depedencies
- `npm install` for install node depedencies
- `bundle install` for install bundle depedencies

#### Initpost command
- `./initpost -h` output instructions
- `./initpost -c {POST_TITLE}` create post
- `./initpost -d {POST_TITLE}` create draft post
- `./initpost -p {POST_TITLE}` publish/promote a draft to a post

#### How to deploy site in Github Pages
1. `npm run build` for Compile sass, js and build site files

2. `npm run deploy` for Deploy to other branch which on github pages

3. Commit files and push to development branch.


#### How to run server in local for development
run `npm start` or `bundle exec jekyll server --host=[IP ADDR]`
