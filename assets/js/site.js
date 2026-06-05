(function () {
  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function setExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(function (link) {
      if (link.hostname && link.hostname !== window.location.hostname) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });
  }

  function setImageDefaults() {
    document.querySelectorAll("img").forEach(function (img) {
      if (!img.hasAttribute("loading")) img.loading = "lazy";
      if (!img.hasAttribute("decoding")) img.decoding = "async";
      if (!img.hasAttribute("width") && img.naturalWidth) img.width = img.naturalWidth;
      if (!img.hasAttribute("height") && img.naturalHeight) img.height = img.naturalHeight;
      if (!img.complete) {
        img.addEventListener("load", function () {
          if (!img.hasAttribute("width") && img.naturalWidth) img.width = img.naturalWidth;
          if (!img.hasAttribute("height") && img.naturalHeight) img.height = img.naturalHeight;
        }, { once: true });
      }
    });
  }

  function setContextualLinkLabels() {
    document.querySelectorAll(".paper-links a, .publication-list a, .project-links a, .blog-item-links a").forEach(function (link) {
      if (link.hasAttribute("aria-label")) return;

      var text = link.textContent.trim();
      if (!/^(read|citation|pdf|arxiv|hf paper|paper|code|model|dataset)$/i.test(text)) return;

      var container = link.closest("li, article, .paper-box, .project-item");
      var titleNode = container && container.querySelector("strong, h2, h3");
      var title = titleNode ? titleNode.textContent.replace(/\s+/g, " ").trim() : document.title;
      if (title) link.setAttribute("aria-label", text + " for " + title);
    });
  }

  function setupAuthorLinks() {
    var links = document.querySelector(".author__urls");
    var button = document.querySelector(".author__urls-wrapper button");
    if (!links) return;

    var sync = function () {
      var wide = window.matchMedia("(min-width: 925px)").matches;
      if (!button) links.style.display = wide ? "block" : "none";
    };

    sync();
    window.addEventListener("resize", sync, { passive: true });

    if (button) {
      button.addEventListener("click", function () {
        var open = links.style.display !== "block";
        links.style.display = open ? "block" : "none";
        button.classList.toggle("open", open);
        button.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }

  function setupNavigation() {
    var nav = document.getElementById("site-nav");
    if (!nav) return;

    var button = nav.querySelector(".greedy-nav__toggle");
    var visible = nav.querySelector(".visible-links");
    var hidden = nav.querySelector(".hidden-links");
    if (!button || !visible || !hidden) return;

    var allItems = Array.prototype.slice.call(visible.children).concat(Array.prototype.slice.call(hidden.children));

    function fitLinks() {
      hidden.classList.add("hidden");
      button.setAttribute("aria-expanded", "false");
      allItems.forEach(function (item) {
        visible.appendChild(item);
      });

      var availableWidth = nav.clientWidth - button.offsetWidth - 8;
      while (visible.scrollWidth > availableWidth && visible.children.length > 1) {
        hidden.insertBefore(visible.lastElementChild, hidden.firstElementChild);
      }

      button.hidden = hidden.children.length === 0;
      button.classList.toggle("hidden", hidden.children.length === 0);
    }

    button.addEventListener("click", function () {
      var open = hidden.classList.toggle("hidden") === false;
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });

    window.addEventListener("resize", fitLinks, { passive: true });
    fitLinks();
  }

  function setupSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", link.hash);
      });
    });
  }

  function setupShareCopy() {
    document.querySelectorAll(".share-link-button").forEach(function (button) {
      button.addEventListener("click", function () {
        var url = button.getAttribute("data-share-url") || window.location.href;
        var label = button.querySelector("span");
        var originalLabel = label ? label.textContent : button.textContent;
        var markCopied = function () {
          button.classList.add("copied");
          if (label) label.textContent = " Copied";
          window.setTimeout(function () {
            button.classList.remove("copied");
            if (label) label.textContent = originalLabel;
          }, 1600);
        };

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(url).then(markCopied).catch(function () {});
        } else {
          var input = document.createElement("input");
          input.value = url;
          input.setAttribute("readonly", "");
          input.style.position = "absolute";
          input.style.left = "-9999px";
          document.body.appendChild(input);
          input.select();
          try {
            if (document.execCommand("copy")) markCopied();
          } catch (error) {}
          document.body.removeChild(input);
        }
      });
    });
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator && window.location.protocol === "https:") {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").catch(function () {});
      });
    }
  }

  ready(function () {
    setExternalLinks();
    setImageDefaults();
    setContextualLinkLabels();
    setupAuthorLinks();
    setupNavigation();
    setupSmoothAnchors();
    setupShareCopy();
    registerServiceWorker();
  });
})();
