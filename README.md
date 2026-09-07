# Municipal Election Results

Responsive HTML5, Bootstrap 5, custom CSS, and vanilla JavaScript implementation of `design-reference/landing page.png`. Bootstrap assets are local; no build step is needed.

Run `python3 -m http.server 8000 --bind 0.0.0.0` and open port 8000 to preview.

- `index.html`: overview, progress, leading party, and national party summary.
- `assets/css/styles.css`: dashboard layout and responsive styles.
- `assets/js/components.js`: shared header, navigation rail, and statistics footer.
- `assets/js/main.js`: reserved for data integration and page interactions.
- `assets/images/`: supplied branding and navigation images.
- `assets/vendor/`: local Bootstrap dependencies and their licenses.

The main results area (`#results-table`) is intentionally blank for future data integration. Party logo slots reserve space for the remaining supplied assets. Results tool tiles use the supplied map, compare parties, historical results, and downloads icons. Navigation and election selection are disabled until their destinations/data are available. Read More expands the provisional-results information.

Displayed values and timestamps reproduce the reference and are static, not live election data.

## Publish to GitHub Pages

The site is ready to publish directly from the repository root; no build command or dependencies are required. The root `.nojekyll` file bypasses Jekyll processing.

1. Commit and push the project, including `.nojekyll`, `index.html`, and the entire `assets/` directory, to your GitHub repository.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the branch containing the website (usually `main`), choose **/(root)**, and click **Save**.
5. Wait for the Pages deployment to finish, then open the site URL shown in Pages settings. For a project repository, this is usually `https://<owner>.github.io/<repository>/`.

HTML and JavaScript-generated image and navigation paths are relative to the page. CSS font paths are relative to their stylesheet, and embedded CSS images use data URLs. Keep paths relative when adding assets so the site continues to work under a repository subdirectory. Use the exact filename capitalization because GitHub Pages paths are case-sensitive.

See [GitHub's publishing source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for deployment settings.
