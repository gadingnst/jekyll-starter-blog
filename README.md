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

#### `post.sh` command
- `./post -h` output instructions
- `./post -c POST-TITLE` create post
- `./post -d POST-TITLE` create draft post
- `./post -p POST-TITLE` publish/promote a draft to a post

#### Setting up your data
Go and edit `_config.yml`
```yml
# Site settings
name: Sutanlab Blog
title: Sutan Nst. - Coder
description: A blog and journal about Sutan Nst, Junior Developer
baseurl: "/jekyll-starter-blog" # the subpath for this project default is ""
url: "https://sutanlab.js.org" # the base hostname & protocol in your domain

username: Sutan Nst.
user_description: Learner, Coder & Coffee Maniac
user_title: Welcome to My Blog Site
avatar: /assets/img/sutan.jpeg
email: sutan.gnst@gmail.com
github_username: sutanlab
disqus_username: sutanlab
facebook_username: sgnzst
instagram_username: sutan_gnst
twitter_username: sutan_gnst
medium_username: sutan.gnst

...
```

#### Setting theme site
Go and edit `_variables.scss` in `src/sass` folder
```scss
// theme color
$main: #2c3e50;
$sidemenu: #242f3a;
$hover: darken($main, 50%);
$sec: #FFFFFF;
$lightGray: #F2F2F2;
$texts: #333333;
$colorcode: #3085F4;
$loader-color: #FFFFFF;

/**
  * adjust with your disqus theme
  * if your disqus theme is dark, the color should be darken. 
  * if your disqus theme is light, the color should be lighten
*/
$comment-theme: #304165; 

// responsive cut
$cut: 37.5rem;
```

#### How to deploy site in Github Pages
1. `npm run build` for Compile sass, js and build site files

2. `npm run deploy` for Deploy to other branch which on github pages

3. Commit files and push to development branch.

4. Or you can use automation deploy with `./deploy.sh`

#### How to run server in local for development
run `npm start` or `bundle exec jekyll server --host=IP_ADDR`

---
Copyright © 2019 by Sutan Gading Fadhillah Nasution