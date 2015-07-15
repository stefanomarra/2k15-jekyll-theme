---
layout: post
title:  "Simple HTTP Server in NodeJS"
date:   2014-06-28 04:07:49
categories: NodeJS Guides
cover_image: ""
featured: false
comments: true
author: laura
---

Node.js is a platform built on [Chrome’s JavaScript runtime](http://code.google.com/p/v8/) for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

This simple web server written in Node responds with “Hello World” for every request. To run the server, put the code into a file example.js and execute it with the node program from the command line.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<!--more-->

{% highlight javascript %}
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
{% endhighlight %}