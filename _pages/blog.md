---
permalink: /blog/
title: "Blog"
excerpt: "Research notes and essays by Di Zhang on agentic coding, LLM reasoning, Bayesian optimization, LoRA scaling, and AI systems."
keywords: "Di Zhang blog, 张迪, LLM reasoning, agentic coding, Bayesian optimization, LoRA, AI systems"
author_profile: true
---

# Blog

{% for post in site.posts %}
{% assign image_parts = post.content | split: '<img src="' %}
{% assign cover_image = "" %}
{% assign cover_alt = post.title %}
{% assign cover_width = "800" %}
{% assign cover_height = "450" %}
{% if image_parts.size > 1 %}
  {% assign first_image = image_parts[1] %}
  {% assign cover_image = first_image | split: '"' | first %}
  {% if first_image contains 'alt="' %}
    {% assign cover_alt = first_image | split: 'alt="' | last | split: '"' | first | default: post.title %}
  {% endif %}
  {% if first_image contains 'width="' %}
    {% assign cover_width = first_image | split: 'width="' | last | split: '"' | first %}
  {% endif %}
  {% if first_image contains 'height="' %}
    {% assign cover_height = first_image | split: 'height="' | last | split: '"' | first %}
  {% endif %}
{% endif %}
<article class="blog-list-item{% if cover_image != '' %} has-cover{% endif %}">
  {% if cover_image != "" %}
  <a class="blog-list-cover" href="{{ post.url | relative_url }}" aria-label="{{ post.title }}">
    <img src="{{ cover_image }}" alt="{{ cover_alt | escape }}" width="{{ cover_width }}" height="{{ cover_height }}" loading="lazy" decoding="async">
  </a>
  {% endif %}
  <div class="blog-list-content">
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p>
    {% if post.excerpt %}
    <p>{{ post.excerpt | strip_html | truncate: 220 }}</p>
    {% endif %}
    <p class="blog-item-links">
      <a href="{{ post.url | relative_url }}" aria-label="Read {{ post.title | escape }}">Read</a>
      <a href="{{ post.url | relative_url }}#citation" aria-label="Citation for {{ post.title | escape }}">Citation</a>
    </p>
  </div>
</article>
{% endfor %}
