# Zhang Di Academic Homepage

This repository powers <https://trotsky1997.github.io/>.

The site is built with Jekyll and the AcadHomepage template. Main editing points:

- `_config.yml`: site title, author profile, avatar, email, social links, Scholar link.
- `_pages/about.md`: homepage content, research summary, experience, education, and publications.
- `images/`: favicon and publication/profile images.
- `.github/workflows/pages-deploy.yml`: GitHub Pages build and deploy workflow.
- `.github/workflows/google_scholar_crawler.yaml`: Google Scholar citation data refresh workflow.

Local build with Docker:

```bash
docker run --rm -v "$PWD:/srv/jekyll" -w /srv/jekyll ruby:3.1 bash -lc "gem install bundler:2.2.19 -N && bundle _2.2.19_ install && bundle _2.2.19_ exec jekyll build"
```
