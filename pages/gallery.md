---
title: Gallery
layout: page-nadkarni
permalink: /gallery.html
---
{%- assign thoughts = site.data[site.metadata] | where: "subject", "Thoughts from the design community" -%}
{%- assign photos = site.data[site.metadata] | where: "subject", "Photo Gallery" -%}
<div class="pg pg--gallery">
    <div class="gal__head">
        <div class="gal__head-left">
            <span class="chip chip--gal" data-appear="chip">GALLERY</span>
            <h1 class="gal__title" data-split>Thoughts from the design community</h1>
        </div>
        <p class="gal__intro" data-split data-delay="120">This gallery is a collection of thoughts, letters, sketches, and memories from Professor Nadkarni’s friends, peers, students, and family. Some are personal, some reflective, some unfinished or playful. Together they offer a glimpse into the many relationships, and conversations that shaped his design community and the people around him.</p>
    </div>
    <div class="gal__carousel-wrap" data-appear>
        <div id="thoughts-carousel" class="carousel slide gal__carousel" data-bs-ride="false" data-bs-touch="true">
            <div class="carousel-inner">
                {% for item in thoughts %}
                <div class="carousel-item{% if forloop.first %} active{% endif %}">
                    <a href="{{ '/item.html?id=' | append: item.objectid | relative_url }}"><img src="{{ '/objects/' | append: item.filename | relative_url }}" alt="{{ item.title | escape }}"></a>
                </div>
                {% endfor %}
            </div>
            <button class="gal__arrow gal__arrow--prev" type="button" data-bs-target="#thoughts-carousel" data-bs-slide="prev" aria-label="Previous"><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <button class="gal__arrow gal__arrow--next" type="button" data-bs-target="#thoughts-carousel" data-bs-slide="next" aria-label="Next"><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 4l6 6-6 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <div class="gal__count"><span id="thoughts-current">1</span> / {{ thoughts.size }}</div>
            <div class="gal__dots">
                {% for item in thoughts %}<button type="button" data-bs-target="#thoughts-carousel" data-bs-slide-to="{{ forloop.index0 }}"{% if forloop.first %} class="active" aria-current="true"{% endif %} aria-label="Slide {{ forloop.index }}"></button>{% endfor %}
            </div>
        </div>
        <span class="gal__rule" aria-hidden="true"></span>
    </div>
    <div class="gal__head gal__head--photos">
        <div class="gal__head-left">
            <span class="chip chip--gal" data-appear="chip">GALLERY</span>
            <h2 class="gal__title" data-split>Photo Gallery</h2>
        </div>
    </div>
    <div class="photo-grid" data-stagger="70">
        {% for item in photos %}
        <a data-appear="img" class="photo-grid__item photo-grid__item--{{ forloop.index }}" href="{{ '/item.html?id=' | append: item.objectid | relative_url }}"><img loading="lazy" src="{{ '/objects/' | append: item.filename | relative_url }}" alt="{{ item.title | escape }}"></a>
        {% endfor %}
    </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('thoughts-carousel').addEventListener('slid.bs.carousel', function (e) { document.getElementById('thoughts-current').textContent = e.to + 1; });
});
</script>
