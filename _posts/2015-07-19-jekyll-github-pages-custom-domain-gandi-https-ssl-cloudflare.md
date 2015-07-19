---
layout: post
title: 'How to have a SSL-enabled Jekyll site with a custom domain on GitHub Pages'
date:   2015-07-19 16:00:00
categories: development
image: /assets/article_images/2015-07-19-jekyll-github-pages-custom-domain-https-ssl-cdn/rckms.jpg

---

[GitHub Pages](https://pages.github.com/) in combination with [Jekyll](http://jekyllrb.com/) is a simple yet powerful tool to build and serve static websites. 

However, by default you website will be located at *username*.github.io, e.g., [http://balauue.github.io](http://balauue.github.io) for this page.
Generously, GitHub provides [means to add a custom domain](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/) to your GitHub Page. 

In the following I explain, how this works for user and organization pages. I assume you already have set-up your website.

<!--more-->

## Use a custom domain with GitHub Pages

First, have your domain registered at any domain registrar that allows you setting [name server](https://en.wikipedia.org/wiki/Name_server) records and [DNS zone files](https://en.wikipedia.org/wiki/Zone_file). Otherwise, this won't work.

My domain provider is [Gandi.net](https://www.gandi.net/). The following steps consequently apply to Gandi, but are analogue for other providers.

### Change your DNS zone file

If you want to use your apex domain aka root domain (e.g., https://rck.ms), you have to bend the `A` records over to GitHub's servers.

That means, remove all existing A records for the apex domain and instead have the following two lines in your zone file:

```
@ 10800 IN A 192.30.252.153
@ 10800 IN A 192.30.252.154
```

If you want to have a sub-domain (e.g., blog.rck.ms) pointing to your GitHub Page, you have to set a `CNAME` record. For Gandi, the record would look like this:

```
blog 10800 IN CNAME balauue.github.io.
```

![DNS zone file for rck.ms at Gandi](/assets/article_images/2015-07-19-jekyll-github-pages-custom-domain-https-ssl-cdn/zone.jpg "Gandi.net DNS Zone file")

Now, tell GitHub the news. Add a file named `CNAME`to the root of your repository and put your custom domain in it. My file reads `https://rck.ms`. 

That's it. Wait for the new DNS records to propagate through the interwebs and a few hours later you website should be accessible under you custom domain.

### Serve your website with HTTPS

Every website should do this. Your website too. Unfortunately, GitHub does not allow to upload a server certificate. Therefore, you will see certificate issues when opening your website with HTTPS, as *custom-domain.com* and **.github.io* do not match.

There is a simple solution to that. [CloudFlare](https://www.cloudflare.com) offers [SSL](https://www.cloudflare.com/ssl) even in their free plan. 
 
Get started by signing up at CloudFlare and setting it up for your custom domain (**not the domain.github.io address**). It fetches the DNS records. Make sure these match the ones defined previously (i.e., the A records points to GitHub respective the sub-domain CNAME record points to the GitHub page). 

![CloudFlare DNS configuration](/assets/article_images/2015-07-19-jekyll-github-pages-custom-domain-https-ssl-cdn/DNS.jpg "CloudFlare DNS records")

Now, CloudFlare presents you a primary and secondary name server. Set them for your domain at your domain provider to route your traffic through CloudFlare. Below you see my new configuration at Gandi.

![Change your name servers to the ones provided by CloudFlare](/assets/article_images/2015-07-19-jekyll-github-pages-custom-domain-https-ssl-cdn/nameserver.jpg "CloudFlare Nameservers")


Again, wait a few hours for the DNS changes to propagate until they are effective. 

In the meantime, do some configuration at CloudFlare. 

At the **Crypto** tab, set SSL (plus SPDY) to *flexible*. CloudFlare will generate a certificate and soon, your https://custom-domain.com requests will be valid!

![Set SSL to flexible](/assets/article_images/2015-07-19-jekyll-github-pages-custom-domain-https-ssl-cdn/crypto.jpg "CloudFlare Flexible SSL")


Moreover, you might redirect your HTTP requests to HTTPS. At the **Page Rules** tab, create respective rules.

![Create page rules to redirect HTTP traffic to HTTPS](/assets/article_images/2015-07-19-jekyll-github-pages-custom-domain-https-ssl-cdn/pagerules.jpg "CloudFlare Page Rules")


That's all! You're leveraging the power of GitHub Pages and Cloudflare for a simple, cloud-delivered website and blogging solution.
