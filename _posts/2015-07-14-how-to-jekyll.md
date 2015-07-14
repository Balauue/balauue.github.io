---
layout: post
title: How I stopped worrying and started to love to Jekyll
date:   2015-07-14 12:00:00
categories: development
image: /assets/article_images/2015-07-14-how-to-jekyll/cable_zoo.jpg
---

Nine years ago I used my first CMS, [B2Evolution](https://en.wikipedia.org/wiki/B2evolution). Since then, I made my way over various 
platforms and kept stuck with [Wordpress](https://www.wordpress.org) and [Drupal](https://www.drupal.org). 
In a recent [blog post](http://blog.stackexchange.com/2015/07/how-we-built-our-blog/) [http://blog.stackexchange.com/authors/jonhmchan/](John Chan) explains, 
how the StackExchange blog was migrated from Wordpress to static files. This kept me thinking: 
Despite improvements in bandwidth, computational power, and more and more powerful webhosting and cloud offerings,  
website speed often did not follow this trend. That is because CMS getting more and more bloated by complex plugins and themes,  
turning the platforms into monstrosities. Installations using 50+ plugins have become the rule rather than the exception. 
These plugins include megabytes of server-side code on every page call and add a zoo of javascript and css includes to 
the client-side code. I'm telling no new story, but unfortunately, this trend seems to stick around.

No question, the extensibility of these frameworks' is a good thing. For example [WooCommerce](http://www.woothemes.com/woocommerce/) 
turns Wordpress into a full-fledged e-commerce platform. Nevertheless, the main use cases of Wordpress are blogs and 
product / company / event websites. Is *having fancy slider XY that is used on one page* really worth loading megabytes
of code on every page request?

## What now?

For my private page [rck.ms](https://rck.ms) I want to do things better. My goals are to keep the website small, omit monstrosities,
and make best use of contemporary web technologies. Consequently, I want to leverage cloud delivery, lean code,
and the beauty of static websites. I need something that allows me to create a small portfolio website with a blog. No Wordpress this time!

My agenda was to...
1. Find a static site generator
3. Make it bett(-er)

### 1. Find a static site generator

First of I used the great [static site generator comparison](https://github.com/jaspervdj/static-site-generator-comparison)
 by [Jasper Van der Jeugt](https://github.com/jaspervdj). [Harp.js](https://www.harpjs.com) and [Jekyll](http://jekyllrb.com) matched my requirements, so I went to step 2.
 
### 2. Settle on a deployment method

My first thought was to have a local instance, manage source code with [GitHub](https://www.github.com), locally 
generate deployables, and push them to [Amazon S3](http://aws.amazon.com/s3/).
 My second thought was to not do that. I don't want to manually deploy everytime I change something.
 
 Here comes Jekyll! GitHub provides [free hosting for static websites](https://pages.github.com) and, more important, provides Jekyll support.
 In fact, every push to the repo initiates automatic deployment at GitHub. Even better, blog posts are markdown files
 that can be conveniently created on GitHub itself. No tooling needed. 
 
### 3. Make it bett(-er)
 
GitHub already serves quite fast, using [fastly.com](https://www.fastly.com/customers/github) as CDN. I am also able to use
my custom domain with it. But I cant do that using *https*. GitHub provides no means to upload a certificate.
 
Luckily, clever people found a solution: [Ben Burwell](https://www.benburwell.com) shows, how to get [SSL for custom domains mapped to GitHub Pages](https://www.benburwell.com/posts/configuring-cloudflare-universal-ssl/). 
Essentially, traffic is rerouted through [CloudFlare}(http://cloudflare.com) which provides free SSL encryption.

## Conclusion, tl;dr

Don't use bloated CMS for small private web projects. Instead, leverage static site generators and free web services.

I'm more than happy to never have to worry about page speed, security implications and complexity anymore.