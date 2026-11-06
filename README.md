# Academic E-Portfolio

Portfolio site for John Rex B. Duran, pre-service teacher of Grade 7 TLE (ICT) at President Diosdado Macapagal High School.

Live URL: `https://jayoverflow.github.io/FS1-EPortfolio/`

Built with HTML, CSS, and vanilla JavaScript. No build step, no dependencies.

## Design

The reference is [bermawy.com](https://bermawy.com/), adapted for an academic panel.

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#faf8f3` | Page ground |
| Ink | `#15171a` | Text and rules |
| Blue | `#1f3a93` | Links, active states, ready status |
| Mist | `#e9eef8` | Colophon band, hover fills |
| Rule | `#d9d4c8` | Hairlines |
| Ochre | `#a8641c` | Pending status dot |

Type: **Cousine** for chrome, headings, tags, and numerals. **Source Serif 4** for body and document titles.

Layout: one scroll. A sticky top bar reports the current section. Section I is a dotted-leader index with live document counts. Each section keeps a margin column with its roman numeral and a short note. Document rows carry the TS tag, title, status, and file type. Clicking a row opens a side panel, not a new page.

Motion: one page-load sequence on the hero, one drawer transition, hover states. All of it stops under `prefers-reduced-motion`.

## Files

```
.
├── index.html          page shell, hero, colophon, footer, viewer
├── css/style.css       all styles, including print
├── js/data.js          every section, document, and CV entry
├── js/app.js           rendering, viewer, scroll spy, file detection
├── assets/             portrait, campus, seal, favicon placeholders
├── documents/          drop final PDFs here
├── .nojekyll           keeps GitHub Pages from running Jekyll
└── README.md
```

## Edit content

Open `js/data.js`. Each section follows this shape:

```js
{
  roman: "V",
  title: "Curriculum and Planning",
  note: "The teaching load, documented.",
  type: "docs",
  intro: ["One or two sentences."],
  docs: [
    {
      slug: "annotated-dll",
      ts: "TS2",
      title: "Annotated DLL",
      desc: "Week 4 DLL on binary and decimal conversion.",
      type: "PDF"
    }
  ]
}
```

- `slug` controls the expected file path: `documents/<slug>.pdf`.
- `ts` is the small tag on the row. Leave it out to show an em dash.
- `type` is the file label: `PDF`, `Image set`, `Document`, `Sealed`.
- `separate: true` marks a document as a sealed submission with no file.
- `files: []` overrides auto-detection when a document has several images.

## Add documents

1. Put the PDF in `documents/` using the slug from the table in `documents/README.md`.
2. Reload the page. The row changes to **Ready** and the viewer opens the PDF.

No code edit is needed for single PDFs. Image sets with multiple images need their paths added to `files` in `js/data.js`.

The browser logs a 404 for each expected file that is not there yet. That is expected until the documents are uploaded.

## Deploy to GitHub Pages

```bash
cd portfolio
git init
git add .
git commit -m "Build academic e-portfolio"
git branch -M main
git remote add origin https://github.com/JayOverFlow/FS1-EPortfolio.git
git push -u origin main
```

Then open the repository on GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: main, folder: / (root) → Save**.

The site appears at `https://jayoverflow.github.io/FS1-EPortfolio/` within a minute or two.

All paths are relative, so the project page works without changes.

## Print

The `[Print]` button calls the browser's print dialog. The stylesheet:

- hides the top bar, viewer, buttons, and portrait
- starts each section on a new page
- prints pending documents as a checklist with empty boxes
- prints the colophon and footer

Use **Save as PDF**, A4, default margins.

## Before final submission

- [ ] Replace `assets/portrait.svg` with a real portrait.
- [ ] Replace `assets/school-building.svg` and `assets/school-logo.svg` with school photos and the official seal.
- [ ] Upload the twenty documents listed in `documents/README.md`.
- [ ] Replace the sample copy in `js/data.js` with the final narrative.
- [ ] Fill in the date on the colophon.
- [ ] Remove the placeholder note from the colophon.
- [ ] Confirm the sealed CT evaluation is not in the repository.
