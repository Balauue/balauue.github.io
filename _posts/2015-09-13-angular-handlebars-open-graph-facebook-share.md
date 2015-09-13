---
layout: post
title: 'How to support social sharing for AngularJS apps using Facebooks Open Graph tags'
date:   2015-09-13 10:00:00
categories: development
image: /assets/article_images/2015-09-13-angular-handlebars-open-graph-facebook-share/title.jpg

---

Social sharing buttons and tools are ubiquitous on the web. Behind the scenes, developers use the [Open Graph protocol](http://ogp.me/) to provide relevant metadata for sharing targets such as Facebook or Twitter. This works well for server-generated markup, but poses a challenge for client-side templating engines.

<!--more-->

When a post having open graph tags is shared, the sites use crawlers that fetch relevant metadata.

Consider the basic example below:

```html
  <meta name="author" content="John Doe" />
  <meta property="og:description" content="A description of the post." />
  <meta property="og:title" content="The post title" />
  <meta property="og:image" content="https://rck.ms/assets/article_images/img.jpg" />
```

These few pieces allow for example Facebook to generate cards showing the title image, title, description and the author.
My [post on Technimatic](https://rck.ms/flashbulb-drum-bass-technimatic/) would show up like this:

![Facebook card for a rck.ms post](/assets/article_images/2015-09-13-angular-handlebars-open-graph-facebook-share/fb_card.jpg "Facebook card for a rck.ms post")

So far, so easy. This blog is powered by [Jekyll](https://jekyllrb.com/) and served as static, pre-generated HTML files. 

## The issue with AngularJS and dynamic metatags

[AngularJS](https://angularjs.org/) apps  &mdash; on the contrary to static HTML &mdash; use client-side JS templating engines such as the inbuilt engine or [Handlebars](http://handlebarsjs.com/). When showing a blog post, the metatags are dynamically populated using Javascript.

```html
  <meta name="author" content="{% raw %}{{post.author}}{% endraw %}" />
  <meta property="og:description" content="{% raw %}{{post.description}}{% endraw %}" />
  <meta property="og:title" content="{% raw %}{{post.title}}{% endraw %}" />
  <meta property="og:image" content="{% raw %}{{post.image}}{% endraw %}" />
```

The templating engine turns the curly-braced variables such as ``{% raw %}{{post.author}}{% endraw %}`` into actual information such as ``John Doe``.

Problem is, aforementioned crawlers from Facebook or Twitter do not evaluate Javascript. In fact, they use the plain HTML as they see it.

You might have already guessed the result:

![Facebook card with template tags](/assets/article_images/2015-09-13-angular-handlebars-open-graph-facebook-share/fb_card2.jpg "Facebook card with template tags")

This week, I faced exactly this problem in a customer project.

## My solution

When Facebook does not want to evaluate Javascript, we have to serve it something it can digest. Therefore, I built a conditional redirect for these crawlers to a small script that emits the information.

The redirect is done on an Apache server, using ``.htaccess``:

```apache
AddDefaultCharset UTF-8
RewriteEngine On
RewriteBase   /

RewriteCond %{HTTP_USER_AGENT} (facebookexternalhit/[0-9]|Twitterbot|Pinterest|Google.*snippet)
RewriteRule ^post/(.*)$ http://www.website.com/static.php?id=$1 [NC,L]
```

When a crawler requests a post (http://website.com/post/1) it will see the static file instead (http://website.com/static.php?id=1).


The PHP script below retrieves the content identifier as input and returns a minimal HTML page having all the important metatags set.

```php
<?php
// 1. get the content Id (here: an Integer) and sanitize it properly
$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

// 2. get the content from a flat file (or API, or Database, or ...)
$data = json_decode(file_get_contents('./posts/'. $id . '.json'));

// 3. return the page
return makePage($data); 

function makePage($data) {
    // 1. get the page
    $pageUrl = "https://website.com/post/" . $data->id;
    // 2. generate the HTML with open graph tags
    $html  = '<!doctype html>'.PHP_EOL;
    $html .= '<html>'.PHP_EOL;
    $html .= '<head>'.PHP_EOL;
    $html .= '<meta name="author" content="'.$data->name.'"/>'.PHP_EOL;
    $html .= '<meta property="og:title" content="'.$data->title.'"/>'.PHP_EOL;
    $html .= '<meta property="og:description" content="'.$data->description.'"/>'.PHP_EOL;
    $html .= '<meta property="og:image" content="'.$data->poster.'"/>'.PHP_EOL;
    $html .= '<meta http-equiv="refresh" content="0;url='.$pageUrl.'">'.PHP_EOL;
    $html .= '</head>'.PHP_EOL;
    $html .= '<body></body>'.PHP_EOL;
    $html .= '</html>';
    // 3. return the page
    echo $html;
}
```

The crawlers actually do not need a whole website with a populated ``<body>``. Therefore, I only supply the bare-boned HTML with the metatags.

You can test what the Facebook crawler sees for an URL in their [Open Graph Object Debugger](https://developers.facebook.com/tools/debug).

### The next hurdle

Facebook and other social sites are now unaware of the actual content URL and will link their cards to the static file.

Not a problem at all! I made use of the ``http-equiv="refresh"`` metatag, which will redirect normal users to the correct URL. So when a user clicks on a Facebook card, he or she will see the (empty) static site for a blink of an eye until he or she is redirected to the actual content.

## Summary

Open graph metatags are widely used on the Internet. Developers can check, what for example the Facebook crawler sees for an url in the [Open Graph Object Debugger](https://developers.facebook.com/tools/debug).


1. Client-side templating is nice, but incompatible with rich social sharing
2. Social sharing crawlers can be easily redirected 
3. A minimal script returns the bare-boned HTML with all metatags set
4. Crawlers can work with this, but link to the wrong URL now
5. The refresh metatag redirects users to the right URL

