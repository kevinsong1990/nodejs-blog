# This is my blog project
[![Dependency Status](https://david-dm.org/kevinsong1990/nodejs-blog.svg)](https://david-dm.org/kevinsong1990/nodejs-blog)
I will develop this project as my new personal blog site. I will spend almost 2 months to complete it.

# Angular JS + Express JS + Mongo DB
Angular JS is an execent Javascript framwork in UI frontend. Express JS is an popular Node.js module in UI backend. 
And it's popular to use them together now. 

So I will use Angular JS in frontend, and Express JS as UI server in backend.

The database I want to choose Mangodb, because I really want to learn it in the same time.

# Html
In frontend, I used this beautiful template https://github.com/IronSummitMedia/startbootstrap-clean-blog.  Becasue I'm not good at html, thanks very much.

# Use 3rd party Comment Plugin
I will use 3rd party comment plugin to reduce my work. The plugin I choose is DuoSuo - a famous chinese comment plugin.

# Use Monit to start/restart/stop process
You can find monit script at folder /monit.  And here is monit website https://mmonit.com/monit/ .

# How to start
```
cd nodejs-blog/

// create node_modules folder, and install these dependency moduels
mkdir node_modules
npm install

// copy monit script to monit path
cp monit/blog.monit /etc/monit.d/

// change the execute  permission for monit, or the monit will throw 'not executable' error
chmod +x bin/blog-start-stop
```

# Contribute Code or Provide Feedback
If you encounter any bugs with the library please file an issue in the Issues section of the project. Thanks very much.

# My Contact Info
* Phone: +86 15051839628
* Email: songkailun@foxmail.com
* Blog : www.cnblogs.com/KevinSong/
* Linkedin: https://cn.linkedin.com/in/songkailun
