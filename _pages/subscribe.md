---
permalink: /subscribe/
title: "Subscribe"
excerpt: "Email and feed subscription options for Di Zhang's publication and blog updates."
keywords: "Di Zhang subscribe, publication updates, blog updates, updates feed"
author_profile: true
---

# Subscribe

Get publication and blog updates by email. Enter your email and click Subscribe.

{% assign turnstile_site_key = site.update_subscription.turnstile_site_key %}
{% if turnstile_site_key %}
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
{% endif %}

<form class="subscribe-form" id="update-subscribe-form" action="{{ site.update_subscription.worker_url }}/subscribe" method="post" data-turnstile="{% if turnstile_site_key %}true{% else %}false{% endif %}">
  <label for="subscribe-email">Email</label>
  <div class="subscribe-row">
    <input id="subscribe-email" name="email" type="email" autocomplete="email" required>
    <button type="submit">Subscribe</button>
  </div>
  {% if turnstile_site_key %}
  <div class="subscribe-turnstile cf-turnstile"
       data-sitekey="{{ turnstile_site_key }}"
       data-action="update-subscribe"
       data-callback="onUpdateSubscribeTurnstile"
       data-expired-callback="onUpdateSubscribeTurnstileExpired"
       data-error-callback="onUpdateSubscribeTurnstileExpired"></div>
  {% endif %}
  <p class="subscribe-result" id="subscribe-result" role="status" aria-live="polite"></p>
</form>

<p class="update-links">
  <a href="{{ '/updates.xml' | relative_url }}">Updates Feed</a>
</p>

<script>
  (function () {
    var form = document.getElementById("update-subscribe-form");
    var result = document.getElementById("subscribe-result");
    var button = form ? form.querySelector("button[type='submit']") : null;
    if (!form || !result || !window.fetch) return;

    var requiresTurnstile = form.getAttribute("data-turnstile") === "true";
    var turnstileReady = !requiresTurnstile;

    function setSubmitState() {
      if (button) button.disabled = !turnstileReady;
    }

    window.onUpdateSubscribeTurnstile = function (token) {
      turnstileReady = !!token;
      setSubmitState();
    };

    window.onUpdateSubscribeTurnstileExpired = function () {
      turnstileReady = !requiresTurnstile;
      setSubmitState();
    };

    function resetTurnstile() {
      if (!requiresTurnstile || !window.turnstile) return;
      var widget = form.querySelector(".cf-turnstile");
      if (widget) window.turnstile.reset(widget);
      turnstileReady = false;
      setSubmitState();
    }

    setSubmitState();

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var body = new FormData(form);
      if (requiresTurnstile && !body.get("cf-turnstile-response")) {
        result.textContent = "Verification failed. Please try again.";
        resetTurnstile();
        return;
      }

      result.textContent = "Submitting...";

      fetch(form.action, {
        method: "POST",
        body: body
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
          resetTurnstile();
        });
    });
  }());
</script>
