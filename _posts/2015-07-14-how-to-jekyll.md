---
layout: post
title: How I stopped worrying and started to love Jekyll
date:   2015-07-14 12:00:00
categories: development
image: /assets/article_images/2015-07-14-how-to-jekyll/cable_zoo.jpg
---

Nine years ago I used my first CMS, [B2Evolution](https://en.wikipedia.org/wiki/B2evolution). Since then, I made my way over various platforms and kept stuck with [Wordpress](https://www.wordpress.org) and [Drupal](https://www.drupal.org). 

In a recent [blog post](http://blog.stackexchange.com/2015/07/how-we-built-our-blog/) [John Chan](http://blog.stackexchange.com/authors/jonhmchan/) explains 
how the StackExchange blog was migrated from Wordpress to static files. This made me think: Despite improvements in bandwidth, computational power, and more and more powerful webhosting and cloud offerings, website speed often did not follow this trend. 

One reason are bloated CMS. Users install more complex plugins and themes, turning the platforms into monstrosities. Installations using 50+ plugins have become the rule rather than the exception. These plugins include megabytes of server-side code on every page call and add a zoo of javascript and css file includes to the client-side code. I'm telling no new story, but unfortunately, this trend seems to stick around.

![Site load metrics for http://theme-fusion.com/avada/, the #1 selling Wordpress theme on themeforest.net](/assets/article_images/2015-07-14-how-to-jekyll/timeline_loading_wordpress_example.jpg "Site load metrics for an exemplary wordpress blog") 


No question, the extensibility of these frameworks' is a great. For example [WooCommerce](http://www.woothemes.com/woocommerce/) turns Wordpress into a full-fledged e-commerce platform that can be set-up without deep technical knowledge. 

Nevertheless, the main use cases of Wordpress are blogs and product / company / event websites. Is *having fancy slider XY that is used on one page* really worth loading megabytes of code on every page request?

I doubt that...

## What now?

For my private page [rck.ms](https://rck.ms) I wanted to keep it straightforward and lean. I need some static pages and a blog. That's it. Let's do it like 1995. Why not have a small static website that every 56k modem can rock (despite the large images)? So I omit monstrosities and unneccessary includes as much as possible. As secondary goal I wanted to build a website without a bit of PHP code, but with contemporary frameworks. As tertiary goal I wanted to leverage free offerings as much as possible. Basically I wanted a minimal system that I can control, that is fast, and that does not cost much.

My agenda was to...

* **1. Find a static site generator**  
   First of I used the great [static site generator comparison](https://github.com/jaspervdj/static-site-generator-comparison)
    by [Jasper Van der Jeugt](https://github.com/jaspervdj). [Harp.js](https://www.harpjs.com) and [Jekyll](http://jekyllrb.com) looked promising to me, so I continued to step two.
 
* **2. Settle on a deployment method**   
 My first thought was to have a local instance, manage source code with [GitHub](https://www.github.com), locally generate deployables, and push them to [Amazon S3](http://aws.amazon.com/s3/).  My second thought was to not do that. I don't want to manually deploy everytime I change something and I don't want to pay money for hosting when I could get the same for free. <br><br>Here comes Jekyll! GitHub provides [free hosting for static websites](https://pages.github.com) and, more important, provides Jekyll support.  In fact, every push to the repository initiates automatic deployment at GitHub Pages. Even better, blog posts are markdown files that can be conveniently created on GitHub itself. No tooling needed. 
 
![Github Pages, source: https://pages.github.com/](/assets/article_images/2015-07-14-how-to-jekyll/github_pages.jpg "Github Pages") 


* **4. Make it better**  
 GitHub already serves pages quite fast, using [fastly.com](https://www.fastly.com/customers/github) as CDN. I am also able to use my custom domain registered ad [gandi.net](https://www.gandi.net) with it. But I can't do that using _https_. GitHub provides no means to upload a SSL certificate. <br><br>Luckily, clever people found a solution: [Ben Burwell](https://www.benburwell.com) shows, how to get [SSL for custom domains mapped to GitHub Pages](https://www.benburwell.com/posts/configuring-cloudflare-universal-ssl/). Essentially, traffic is rerouted through [CloudFlare](http://cloudflare.com) which provides free SSL encryption.
 
![CloudFlare, source: https://www.cloudflare.com](/assets/article_images/2015-07-14-how-to-jekyll/cloudflare.jpg "CloudFlare Overview for rck.ms") 

I will write a concise tutorial on what I did, viz., how to host a website using Jekyll on GitHub Pages with a custom domain that supports https.

## Conclusion, tl;dr

Don't use bloated CMS for small private web projects. Instead, leverage static site generators and free web services.

I'm more than happy to not to worry about page speed, security implications and complexity anymore.