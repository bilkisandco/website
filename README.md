# Bilkis & Co. website

The website for Bilkis & Co., independent sales representatives for Mirror Image and Indoteak Design in New York City, New Jersey, Connecticut, and Philadelphia.

Live site: https://bilkisandco.com

## How it updates

The site is hosted on Vercel and connected to this GitHub repository. **Every time a change is pushed to the `main` branch, Vercel rebuilds and publishes the site automatically**, usually within a minute. There is nothing to "deploy" by hand.

## What's where

| File | What it is |
|---|---|
| `index.html` | Home page |
| `about.html` | About page |
| `brands.html` | Brands page (Mirror Image and Indoteak Design, side by side) |
| `projects.html` | Projects page |
| `404.html` | "Page not found" page |
| `assets/styles.css` | All colors, fonts, and layout. Brand colors are at the very top. |
| `assets/main.js` | Menu, hero slideshow, scroll animations, project filters |
| `assets/img/` | All photos |
| `favicon.svg` | The small "&" icon in browser tabs |
| `vercel.json` | Vercel settings (clean URLs like `/about` instead of `/about.html`) |

## Common edits

- **Change text:** open the page's `.html` file, find the words, and edit them.
- **Fill in placeholders:** search the `.html` files for `[Placeholder` — those are highlighted in yellow on the site until replaced.
- **Add a project:** in `projects.html`, copy one `<article class="project" ...>` block, change the photo, labels, and name, and set `data-brand` to `mirror-image` or `indoteak` so the filters work.
- **Swap a photo:** put the new image in `assets/img/` and update the `src="..."` that points to it.
- **Change colors:** edit the values at the top of `assets/styles.css` (`--pop` is the deep green accent).

## Preview changes on your computer

From this folder, run:

```bash
npx serve .
```

Then open the address it prints (usually http://localhost:3000).

## Photo credits

Product and project photography courtesy of Mirror Image and Indoteak Design.
