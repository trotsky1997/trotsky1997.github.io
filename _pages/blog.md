---
permalink: /blog/
title: "Blog"
excerpt: "Research notes and essays by Zhang Di on agentic coding, LLM reasoning, Bayesian optimization, LoRA scaling, and AI systems."
keywords: "Zhang Di blog, LLM reasoning, agentic coding, Bayesian optimization, LoRA, AI systems"
author_profile: true
---

# Blog

{% for post in site.posts %}
{% assign image_parts = post.content | split: '<img src="' %}
{% assign cover_image = "" %}
{% if image_parts.size > 1 %}
  {% assign cover_image = image_parts[1] | split: '"' | first %}
{% endif %}
<article class="blog-list-item{% if cover_image != '' %} has-cover{% endif %}">
  {% if cover_image != "" %}
  <a class="blog-list-cover" href="{{ post.url | relative_url }}" aria-label="{{ post.title }}">
    <img src="{{ cover_image }}" alt="">
  </a>
  {% endif %}
  <div class="blog-list-content">
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p>
    {% if post.excerpt %}
    <p>{{ post.excerpt | strip_html | truncate: 220 }}</p>
    {% endif %}
    <p class="blog-item-links">
      <a href="{{ post.url | relative_url }}">Read</a>
      <a href="{{ post.url | relative_url }}#citation">Citation</a>
    </p>
  </div>
</article>
{% endfor %}
