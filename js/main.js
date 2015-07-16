---
---

{% include /_js/jquery.fitvids.js %}
{% include /_js/readingTime.min.js %}
{% include /_js/moment.min.js %}

// Spotify responsive
function respondify(){
    jQuery('iframe[src*="embed.spotify.com"]').each( function() {
        jQuery(this).css('width',jQuery(this).parent(1).css('width'));
        jQuery(this).attr('src',jQuery(this).attr('src'));
    });
}

jQuery(window).resize(function() {
    respondify();
});

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        // Calculates the Date Ago
        $(".post-meta time").each( function() {
            var dt = $(this).attr("datetime");
            $(this).text(moment(dt).fromNow());
        });

        // Calculates Reading Time
        if($().readingTime){
            $('.post-content').readingTime({
                readingTimeTarget: '.post-reading-time',
                wordCountTarget: '.post-word-count',
            });
        };

        // Creates Captions from Alt tags
        $(".post-content img").each(function() {
            // Let's put a caption if there is one
            if($(this).attr("alt") && !$(this).hasClass("emoji"))
                $(this).wrap('<figure class="image"></figure>')
                    .after('<figcaption>'+$(this).attr("alt")+'</figcaption>');
        });
        respondify();
    });

}(jQuery));

(function ($) {
    "use strict";
    $(document).ready(function(){

        var $window = $(window),
            $image = $('.post-image-image, .teaserimage-image');

        $window.on('scroll', function() {
            var top = $window.scrollTop();

            if (top < 0 || top > 1500) { return; }
            $image
                .css('transform', 'translate3d(0px, '+top/3+'px, 0px)')
                .css('opacity', 1-Math.max(top/700, 0));
        });
        $window.trigger('scroll');

        var height = $('.article-image').height();
        $('.post-content').css('padding-top', height + 'px');

        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
                && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({ scrollTop: target.offset().top }, 500);
                    return false;
                }
            }
        });

    });
}(jQuery));