---
layout: home-nadkarni
title: Home
---
<div class="features">
    <section class="bk bk--home" data-appear>
        <div class="bk__text">{% include nk/by-design-text.html %}</div>
        <div class="bk__img"><img src="{{ '/assets/img/site/by-design-cover.png' | relative_url }}" alt="Cover of the book by design"></div>
        <div class="bk__after">
            <p class="bk__caption">'by design' book launch in Pune, May 2026:</p>
            <video class="bk__video" controls preload="none" playsinline poster="{{ '/assets/img/site/book-launch-poster.jpg' | relative_url }}"><source src="{{ '/assets/video/book-launch-pune-2026.mp4' | relative_url }}" type="video/mp4"></video>
            {% include nk/explore.html href="/books-and-media.html" label="Explore" link="Books &amp; Media" %}
        </div>
    </section>
    {% include nk/about-block.html %}
</div>
