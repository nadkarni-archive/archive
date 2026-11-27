---
title: In Memoriam
layout: page-nadkarni
permalink: /in-memoriam.html
---
{%- assign m = site.data.memoriam -%}
<div class="pg pg--memoriam">
    <header class="mm-head">
        <div class="mm-head__left">
            <span class="chip chip--dark" data-appear="chip">IN MEMORIAM</span>
            <h1 class="mm-head__title" data-split>Prof. Sudhakar Nadkarni</h1>
            <p class="mm-head__years" data-appear>1936 – 2026</p>
        </div>
        <nav class="mm-toc" aria-label="On this page" data-appear>
            <a href="#events"><span>01</span>Events</a>
            <a href="#media"><span>02</span>Media Coverage</a>
            <a href="#social"><span>03</span>Social Media Posts</a>
        </nav>
    </header>

    <section class="mm-section" id="events" aria-labelledby="events-h">
        <div class="mm-section__head">
            <span class="mm-section__no">01</span>
            <h2 class="mm-section__title" id="events-h" data-split>Events</h2>
        </div>
        {% for ev in m.events %}
        <article class="mm-event" data-appear>
            <header class="mm-event__head">
                <span class="chip chip--dark">{{ ev.venue | upcase }}</span>
                <h3 class="mm-event__title">{{ ev.title }}</h3>
                <p class="mm-event__date">{{ ev.date }}</p>
                {% if ev.place %}<p class="mm-event__place">{{ ev.place }}</p>{% endif %}
                {% if ev.caption %}<p class="mm-event__caption">{{ ev.caption }}</p>{% endif %}
                {% if ev.credit %}<p class="mm-event__credit">{{ ev.credit }}</p>{% endif %}
            </header>
            {% if ev.youtube %}
            <div class="mm-video">
                <button type="button" class="yt" data-yt="{{ ev.youtube }}" aria-label="Play video: {{ ev.youtube_title | escape }}" style="background-image: url('https://i.ytimg.com/vi/{{ ev.youtube }}/hqdefault.jpg');">
                    <span class="yt__play" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 22 22"><path d="M7 4.5v13L18 11z" fill="currentColor"/></svg></span>
                </button>
                <p class="mm-video__meta"><span class="mm-video__title">{{ ev.youtube_title }}</span> · {{ ev.youtube_channel }} · <a href="https://www.youtube.com/watch?v={{ ev.youtube }}">Watch on YouTube</a></p>
            </div>
            {% endif %}
            <div id="mm-car-{{ ev.id }}" class="carousel slide gal__carousel mm-carousel" data-bs-ride="false" data-bs-touch="true" data-ratio="{{ ev.ratio }}" style="--ratio: {{ ev.ratio }};">
                <div class="carousel-inner">
                    {% for p in ev.photos %}
                    <div class="carousel-item{% if forloop.first %} active{% endif %}">
                        <img src="{{ '/memoriam/events/' | append: p | append: '.jpg' | relative_url }}" alt="{{ ev.title }}, {{ ev.venue }}, photograph {{ forloop.index }} of {{ ev.photos.size }}" loading="{% if forloop.first %}eager{% else %}lazy{% endif %}">
                    </div>
                    {% endfor %}
                </div>
                <button class="gal__arrow gal__arrow--prev" type="button" data-bs-target="#mm-car-{{ ev.id }}" data-bs-slide="prev" aria-label="Previous photograph"><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                <button class="gal__arrow gal__arrow--next" type="button" data-bs-target="#mm-car-{{ ev.id }}" data-bs-slide="next" aria-label="Next photograph"><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 4l6 6-6 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                <div class="gal__count"><span class="mm-current">1</span> / {{ ev.photos.size }}</div>
                <div class="gal__dots">
                    {% for p in ev.photos %}<button type="button" data-bs-target="#mm-car-{{ ev.id }}" data-bs-slide-to="{{ forloop.index0 }}"{% if forloop.first %} class="active" aria-current="true"{% endif %} aria-label="Photograph {{ forloop.index }}"></button>{% endfor %}
                </div>
            </div>
        </article>
        {% endfor %}
    </section>

    <section class="mm-section" id="media" aria-labelledby="media-h">
        <div class="mm-section__head">
            <span class="mm-section__no">02</span>
            <h2 class="mm-section__title" id="media-h" data-split>Media Coverage</h2>
            <p class="mm-section__count">{{ m.press.size }} articles and tributes</p>
        </div>
        <ol class="mm-press" data-stagger="60">
            {% for a in m.press %}
            <li class="mm-press__item" data-appear>
                <a class="mm-press__thumb" href="{{ '/memoriam/press/' | append: a.slug | append: '.pdf' | relative_url }}" aria-hidden="true" tabindex="-1"><img loading="lazy" src="{{ '/memoriam/press/' | append: a.slug | append: '.jpg' | relative_url }}" alt=""></a>
                <div class="mm-press__text">
                    <span class="chip chip--dark">{{ a.kind | upcase }}</span>
                    <p class="art__source">{{ a.source }}</p>
                    <p class="mm-press__title"><a href="{{ '/memoriam/press/' | append: a.slug | append: '.pdf' | relative_url }}">{{ a.title }}</a></p>
                    {% if a.translation %}<p class="art__tr">({{ a.translation }})</p>{% endif %}
                    {% if a.by != "" or a.date != "" %}<p class="art__by">{{ a.by }}{% if a.by != "" and a.date != "" %} ({{ a.date }}){% elsif a.date != "" %}{{ a.date }}{% endif %}</p>{% endif %}
                    <p class="mm-press__links"><a class="art__view" href="{{ '/memoriam/press/' | append: a.slug | append: '.pdf' | relative_url }}"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 1.5h5.5L13 5v9.5H4z" fill="none" stroke="#D44208" stroke-width="1.2"/><text x="5" y="12.5" font-size="4.2" font-family="Inter, sans-serif" font-weight="700" fill="#D44208">PDF</text></svg>Read the PDF</a>{% if a.url %}<a class="art__view" href="{{ a.url }}">Original article ↗</a>{% endif %}</p>
                </div>
            </li>
            {% endfor %}
        </ol>
    </section>

    <section class="mm-section" id="social" aria-labelledby="social-h">
        <div class="mm-section__head">
            <span class="mm-section__no">03</span>
            <h2 class="mm-section__title" id="social-h" data-split>Social Media Posts</h2>
            <p class="mm-section__count">{{ m.social.size }} posts</p>
        </div>
        <ol class="mm-social">
            {% for s in m.social %}
            <li class="mm-post" data-appear>
                <header class="mm-post__head">
                    <span class="chip chip--dark">{{ s.platform | upcase }}</span>
                    <p class="art__source">{{ s.handle }}</p>
                    <p class="mm-post__title">{{ s.title }}</p>
                    {% if s.translation %}<p class="art__tr">({{ s.translation }})</p>{% endif %}
                    {% if s.date %}<p class="art__by">{{ s.date }}</p>{% endif %}
                </header>
                <div class="mm-post__embed">
                {% if s.youtube %}
                    <button type="button" class="yt" data-yt="{{ s.youtube }}" aria-label="Play video: {{ s.title | escape }}" style="background-image: url('https://i.ytimg.com/vi/{{ s.youtube }}/hqdefault.jpg');"><span class="yt__play" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 22 22"><path d="M7 4.5v13L18 11z" fill="currentColor"/></svg></span></button>
                {% elsif s.instagram %}
                    <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/{{ s.instagram }}/" data-instgrm-version="14" data-instgrm-captioned><a href="https://www.instagram.com/p/{{ s.instagram }}/">View this post on Instagram</a></blockquote>
                {% elsif s.facebook %}
                    <iframe class="mm-fb" title="Facebook post by {{ s.handle | escape }}" data-src="https://www.facebook.com/plugins/post.php?href={{ s.facebook | url_encode }}&show_text=true&width=500" width="500" height="560" loading="lazy" allowfullscreen></iframe>
                    <a class="art__view" href="{{ s.facebook }}">View on Facebook ↗</a>
                {% elsif s.linkedin %}
                    <iframe class="mm-li" title="LinkedIn post by {{ s.handle | escape }}" data-src="https://www.linkedin.com/embed/feed/update/{{ s.linkedin }}" width="504" height="620" loading="lazy" allowfullscreen></iframe>
                    <a class="art__view" href="{{ s.url }}">View on LinkedIn ↗</a>
                {% endif %}
                </div>
            </li>
            {% endfor %}
        </ol>
    </section>
</div>
<script src="{{ '/assets/js/memoriam.js' | relative_url }}" defer></script>
