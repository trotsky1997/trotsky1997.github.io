---
permalink: /subscribe/
title: "Subscribe"
excerpt: "Email and feed subscription options for Di Zhang's publication and blog updates."
keywords: "Di Zhang subscribe, publication updates, blog updates, updates feed"
author_profile: true
---

# Subscribe

Get publication and blog updates by email. Enter your email and click Subscribe.

<form class="subscribe-form" id="update-subscribe-form" action="{{ site.update_subscription.worker_url }}/subscribe" method="post">
  <label for="subscribe-email">Email</label>
  <div class="subscribe-row">
    <input id="subscribe-email" name="email" type="email" autocomplete="email" required>
    <button type="submit">Subscribe</button>
  </div>
  <p class="subscribe-result" id="subscribe-result" role="status" aria-live="polite"></p>
</form>

<p class="update-links">
  <a href="{{ '/updates.xml' | relative_url }}">Updates Feed</a>
</p>

<script>
  (function () {
    var form = document.getElementById("update-subscribe-form");
    var result = document.getElementById("subscribe-result");
    if (!form || !result || !window.fetch) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      result.textContent = "Submitting...";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form)
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Subscription request failed.");
          return response.json();
        })
        .then(function (payload) {
          if (payload.status !== "confirmed") throw new Error("Subscription was not confirmed.");
          result.textContent = "Subscribed. You will receive publication and blog updates.";
        })
        .catch(function () {
          result.textContent = "Subscription request failed. Please try again later.";
        });
    });
  }());
</script>
