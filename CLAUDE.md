# CLAUDE.md - Hugo Website Project Guide

## Build & Deploy Commands
- Build site locally: `HUGO_THEME=academia hugo --themesDir themes/`
- Clean build artifacts: `rm -rf public`
- Start local server: `hugo server -D`
- Deploy changes: Build then run `cp -r public deploy/data/`

## Content Management
- Add new post: Create Markdown file in `content/post/[category]/index.md`
- Add images: Place in same directory as post's index.md file
- Reference images: `![Alt text](image-name.jpg)`

## Code Style Guidelines
- Markdown formatting: Use standard Markdown syntax
- Front matter: Include title, date, draft status, featured image path
- Image optimization: Compress images before adding to repository
- Naming conventions: Use lowercase with hyphens for filenames
- Content structure: Follow existing patterns in content organization

## Reveal.js Presentations
- Build slide decks: `cd static/vorlesung && npm run build`
- Start presentation server: `cd static/vorlesung && npm run start`
- Use standard HTML syntax for slides following existing examples