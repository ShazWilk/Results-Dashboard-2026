# Municipal Election Results

Portable static front-end built with HTML5, Bootstrap 5.3.8, custom CSS, and vanilla JavaScript. All runtime assets are included locally. No npm packages, build step, Python runtime, GitHub account, or Codespaces environment is required to run the application.

## Run after cloning

Clone the repository and serve its root with any static web server, or include it in your existing web application. Keep `index.html` and the `assets/` directory together. Opening `index.html` directly in a modern browser also works for the current static preview; use HTTP hosting when integrating APIs.

An optional preview command, if Python is installed, is:

```sh
python3 -m http.server 8000
```

On Windows, `py -m http.server 8000` is an alternative. Open the server address printed by your server in your browser. Port 8000 is only a preview choice, not an application dependency.

## Project structure

- `index.html`: dashboard markup, search form, and static example results.
- `assets/css/styles.css`: readable custom styles and responsive layout.
- `assets/js/components.js`: creates the header, navigation rail, and footer.
- `assets/js/main.js`: layout measurements, search drawer interactions, and placeholder search feedback.
- `assets/images/`: supplied branding, party logo, and navigation images.
- `assets/vendor/bootstrap/`: Bootstrap 5.3.8 CSS, JavaScript bundle (including Popper), and MIT license.
- `design-reference/`: reference images for developers; not needed at runtime.
- `.nojekyll`: optional GitHub Pages hosting marker; ignored by other servers.

Bootstrap Icons was unused and has been removed. Unavailable source-map references have been removed from the Bootstrap files; their executable code and CSS rules are unchanged. Preserve the bundled license when distributing Bootstrap.

## Visual Studio / ASP.NET handover

This is a front-end asset package, not a Visual Studio solution. Integrate it into the team's existing ASP.NET project; no Node tooling or additional front-end framework is needed.

1. Copy `assets/` into the application's static content location (typically `wwwroot/assets/` in ASP.NET Core), with static asset serving enabled by the host project. For other ASP.NET project types, use the existing static content directory.
2. Incorporate the page markup into a view or Razor page. If the application already provides a shared layout, keep only one document shell and load the styles and scripts once.
3. Load Bootstrap CSS before `assets/css/styles.css`. Load scripts in this order: `bootstrap.bundle.min.js`, `components.js`, then `main.js`. Preserve `defer`, or load them after the page markup; do not use `async`.
4. Resolve asset URLs using the host application's URL helpers when serving nested routes or a virtual application directory. For example, a Razor view can use `@Url.Content("~/assets/css/styles.css")`. Plain static HTML does not interpret `~` or Razor expressions.
5. Update the `index.html` home links and image URLs inside `components.js` for the host's routes as well. Razor expressions are not evaluated inside external JavaScript files. Move this shared markup into Razor partials, or pass server-resolved URLs to the JavaScript. Keep the existing classes and IDs to preserve styling and behavior.
6. If shared chrome is rendered by Razor instead, remove the corresponding rendering from `components.js` so it does not overwrite the server-rendered header, navigation, or footer. `main.js` safely skips search initialization when its required elements or Bootstrap are absent.
7. Avoid loading a second copy of Bootstrap from the existing layout. The current UI uses Bootstrap 5 data attributes and its Offcanvas and Collapse components.

All current image, stylesheet, script, and navigation paths are relative to the document. CSS image references are embedded data URLs. The existing structure works at a root or subdirectory when kept together; document-relative paths must be adapted when the host introduces nested routes. Preserve asset filename capitalization.

## Backend and API integration remaining

The page intentionally reproduces the supplied design and is not connected to live election data:

- Percentages, counts, party names, leading margins, election labels, the LIVE badge, and timestamps are static values in `index.html` and `components.js`. Bind these to the backend's data model. The selected example election is 2021 while the title is 2026.
- `#results-table` remains an empty integration target inside `.results-table-container`. Its sibling `.table-placeholder` is a decorative preview; CSS hides the preview when real content is inserted into the target. Replace `.results-map-container` contents with the real map; the current inline SVG is illustrative, with no map data or interactions.
- The three party cards use static reference values. Existing national table markup and original summary statistics remain in the expandable “More national results & election information” section.
- The fixed footer reuses the original progress markup and IEC assets. Completion figures are static examples from `design-reference/FinalFinal.png`; bind the `data-result-stat` hooks to real counts. The original summary values remain in the expandable section.
- `#results-search-form` includes election, ID number, province, municipality, and party fields. Province names are example option values; map them to the API's identifiers. Municipality options remain disabled until populated from data.
- `main.js` prevents normal form submission and displays placeholder feedback. Replace that handler with the application's search integration and provide loading, empty, and error states. The current UI makes no API requests and does not store ID numbers. If this JavaScript is omitted or fails, native form submission defaults to GET; configure deliberate submission behavior before connecting the form to real ID lookup.
- Search opens from the rail icon and supports close, Escape, outside-click dismissal, and reset. Read More uses Bootstrap Collapse.
- Other navigation, results tools, View All, and the header election selector remain disabled pending integration. Remaining party logo slots are placeholders.
- The progress fill, logo marker, label, and accessible value now all show 87%. Update these together when connecting live data.
- `main.js` measures the fixed header/footer with ResizeObserver and updates CSS dimensions so main content and the search drawer remain clear of the chrome. Mobile completion statistics scroll horizontally inside the footer (including keyboard access). No runtime dependencies were added.
- The redesign follows `design-reference/FinalFinal.png`: navy ANC/DA/EFF party cards, map on the left, detailed table preview on the right, and a fixed progress footer.

Keep credentials and backend secrets on the server. There is no client-side environment configuration or API endpoint to replace. Local environment files, common Visual Studio output, and certificate containers are excluded by `.gitignore`; this does not replace review of files before committing.

## Verification and handover

Use a modern browser. Verify the dashboard at desktop and mobile widths and exercise search opening, closing, reset, and Read More after integration. Confirm asset requests also work at the actual application route and deployment prefix.

The repository includes no automated build or test dependencies. JavaScript syntax can optionally be checked with `node --check assets/js/components.js` and `node --check assets/js/main.js`. Node is not needed to serve the site.

Commit and push the complete handover, including the ANC image and design references, before developers clone it. Visual Studio execution and backend integration must be validated in the receiving project.

Responsive redesign verification: Chromium checks passed at 1920×1080, 1366×768, 1024×768, 768×1024, and 390×844. Checks covered fixed chrome, final-content clearance, page overflow, column layout, visible/replaced placeholders, search submission/reset/province feedback, close/Escape/outside-click dismissal, focus return, Read More, retained national results, home navigation, and mobile footer scrolling. No browser JavaScript or asset errors were reported. Existing IDs, classes, and data attributes were retained.

## Optional GitHub Pages hosting

GitHub Pages can serve the repository root directly without a build step. Keep `.nojekyll` for that hosting option. It is not needed for Visual Studio or other web servers, and `README.md` and `design-reference/` do not need to be published with the runtime site.
