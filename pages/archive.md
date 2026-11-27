---
title: Archive
layout: page-nadkarni
permalink: /archive.html
---
{%- assign items = site.data[site.metadata] -%}
{%- assign press_a = items | where: "subject", "Press" -%}{%- assign press_b = items | where: "kind", "Press clipping" -%}{%- assign pubs = press_a | concat: press_b | map: "source" | uniq | sort -%}
<div class="pg pg--archive">
    <header class="ar-head">
        <div class="ar-head__left">
            <span class="chip chip--dark" data-appear="chip">ARCHIVE</span>
            <h1 class="ar-head__title" data-split>The Nadkarni Archive</h1>
        </div>
        <p class="ar-head__intro" data-split data-delay="120">Press clippings, letters, sketches and photographs from Professor Sudhakar Nadkarni's life and work. Search, or narrow the collection with the filters below.</p>
    </header>

    <div class="ar-search" data-appear>
        <label class="visually-hidden" for="ar-q">Search the archive</label>
        <input id="ar-q" class="ar-search__input" type="search" placeholder="Search titles, publications, people" autocomplete="off" spellcheck="false">
    </div>

    <div class="ar-filters" data-appear>
        <div class="ar-filter">
            <p class="ar-filter__label">Collection</p>
            <div class="ar-filter__chips" role="group" aria-label="Filter by collection">
                <button type="button" class="chip fchip" data-f="tag" data-v="nadu-75-booklet" aria-pressed="false">Nadu 75 booklet <span class="fchip__n"></span></button>
                <button type="button" class="chip fchip" data-f="tag" data-v="in-memoriam" aria-pressed="false">In Memoriam <span class="fchip__n"></span></button>
            </div>
        </div>
        <div class="ar-filter">
            <p class="ar-filter__label">Type</p>
            <div class="ar-filter__chips" role="group" aria-label="Filter by type">
                <button type="button" class="chip fchip" data-f="kind" data-v="press" aria-pressed="false">Press clippings <span class="fchip__n"></span></button>
                <button type="button" class="chip fchip" data-f="kind" data-v="letter" aria-pressed="false">Letters &amp; sketches <span class="fchip__n"></span></button>
                <button type="button" class="chip fchip" data-f="kind" data-v="photo" aria-pressed="false">Photographs <span class="fchip__n"></span></button>
                <button type="button" class="chip fchip" data-f="kind" data-v="tribute" aria-pressed="false">Tributes &amp; letters <span class="fchip__n"></span></button>
                <button type="button" class="chip fchip" data-f="kind" data-v="event" aria-pressed="false">Events <span class="fchip__n"></span></button>
                <button type="button" class="chip fchip" data-f="kind" data-v="booklet" aria-pressed="false">Booklet pages <span class="fchip__n"></span></button>
            </div>
        </div>
        <div class="ar-filter">
            <p class="ar-filter__label">Publication</p>
            <div class="ar-filter__chips" role="group" aria-label="Filter by publication">
                {% for p in pubs %}{% assign pclean = p | remove: ":" | strip %}<button type="button" class="chip fchip" data-f="pub" data-v="{{ pclean | slugify }}" aria-pressed="false">{{ pclean }} <span class="fchip__n"></span></button>
                {% endfor %}
            </div>
        </div>
        <div class="ar-filter">
            <p class="ar-filter__label">Language</p>
            <div class="ar-filter__chips" role="group" aria-label="Filter by language">
                <button type="button" class="chip fchip" data-f="lang" data-v="english" aria-pressed="false">English <span class="fchip__n"></span></button>
                <button type="button" class="chip fchip" data-f="lang" data-v="marathi" aria-pressed="false">Marathi <span class="fchip__n"></span></button>
                <button type="button" class="chip fchip" data-f="lang" data-v="hindi" aria-pressed="false">Hindi <span class="fchip__n"></span></button>
                <button type="button" class="chip fchip" data-f="lang" data-v="german" aria-pressed="false">German <span class="fchip__n"></span></button>
            </div>
        </div>
        <div class="ar-filter">
            <p class="ar-filter__label">Year</p>
            <div class="ar-filter__chips" role="group" aria-label="Filter by year">
                {%- assign dates = items | map: "date" | compact | sort | reverse -%}{%- assign seen = "" -%}
                {% for d in dates %}{% assign y = d | slice: 0, 4 %}{% if y != "" %}{% unless seen contains y %}{% assign seen = seen | append: y | append: "," %}<button type="button" class="chip fchip" data-f="year" data-v="{{ y }}" aria-pressed="false">{{ y }} <span class="fchip__n"></span></button>
                {% endunless %}{% endif %}{% endfor %}
            </div>
        </div>
    </div>

    <div class="ar-bar">
        <p class="ar-bar__count" aria-live="polite"><span id="ar-count">{{ items.size }}</span> of {{ items.size }} items</p>
        <button type="button" class="btn-light ar-bar__clear" id="ar-clear" hidden>Clear filters</button>
        <div class="ar-bar__right">
            <div class="ar-seg" role="group" aria-label="Sort">
                <button type="button" class="ar-seg__btn" data-sort="collection" aria-pressed="true">Collection order</button>
                <button type="button" class="ar-seg__btn" data-sort="new" aria-pressed="false">Newest</button>
                <button type="button" class="ar-seg__btn" data-sort="old" aria-pressed="false">Oldest</button>
            </div>
            <div class="ar-seg" role="group" aria-label="View">
                <button type="button" class="ar-seg__btn" data-view="grid" aria-pressed="true">Thumbnails</button>
                <button type="button" class="ar-seg__btn" data-view="list" aria-pressed="false">List</button>
            </div>
        </div>
    </div>

    <div class="ar-results ar-results--grid" id="ar-results">
        <div class="ar-listhead" aria-hidden="true"><span>No.</span><span>Title</span><span>Type</span><span>Publication / author</span><span>Date</span><span>Language</span></div>
        <ol class="ar-grid" id="ar-grid">
            {% for it in items %}{% include nk/item-vars.html item=it %}
            <li class="ar-item" data-appear data-i="{{ forloop.index }}" data-kind="{{ kind_slug }}" data-pub="{{ pub | slugify }}" data-lang="{{ lang_name | downcase }}" data-year="{{ year }}" data-tag="{{ tag_slug }}" data-date="{{ it.date }}" data-text="{{ it.title | append: ' ' | append: it.description | append: ' ' | append: pub | append: ' ' | append: it.creator | append: ' ' | append: kind | append: ' ' | append: lang_name | append: ' ' | append: year | downcase | escape }}">
                <a class="ar-item__link" href="{{ '/item.html?id=' | append: it.objectid | relative_url }}">
                    <span class="ar-item__frame"><img loading="lazy" src="{{ '/objects/' | append: it.filename | relative_url }}" alt=""></span>
                    <span class="ar-item__no">{{ forloop.index | prepend: '00' | slice: -2, 2 }}</span>
                    <span class="ar-item__body">
                        <span class="ar-item__title">{{ it.title }}</span>
                        {% if it.description != "" %}<span class="ar-item__tr">{{ it.description }}</span>{% endif %}
                    </span>
                    <span class="ar-item__kind"><span class="chip chip--dark">{{ kind | upcase }}</span></span>
                    <span class="ar-item__source">{% if pub != "" %}{{ pub }}{% if it.creator != "" %}<br><span class="ar-item__by">{{ it.creator }}</span>{% endif %}{% else %}&ndash;{% endif %}</span>
                    <span class="ar-item__date">{% if date_label != "" %}{{ date_label }}{% else %}&ndash;{% endif %}</span>
                    <span class="ar-item__lang">{% if lang_name != "" %}{{ lang_name }}{% else %}&ndash;{% endif %}</span>
                </a>
            </li>
            {% endfor %}
        </ol>
        <div class="ar-empty" id="ar-empty" hidden>
            <p class="ar-empty__title">Nothing matches that.</p>
            <p>Try fewer filters or a different word.</p>
            <button type="button" class="btn-light" id="ar-empty-clear">Clear everything</button>
        </div>
        <p class="ar-download">Download the collection data: <a href="{{ '/assets/data/metadata.csv' | relative_url }}" download>CSV</a> · <a href="{{ '/assets/data/metadata.json' | relative_url }}">JSON</a></p>
    </div>
</div>
<script src="{{ '/assets/js/archive.js' | relative_url }}" defer></script>
