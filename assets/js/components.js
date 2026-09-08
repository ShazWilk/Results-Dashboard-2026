// Shared dashboard chrome; reusable on additional election pages.
const header = document.getElementById('site-header');
if (header) header.innerHTML = `
  <a class="election-brand" href="index.html" aria-label="Election results home"><img src="assets/images/logo.png" alt="IEC South Africa — 2026 local government elections"></a>
  <h1><strong>2026</strong> Municipal Election Results</h1>
  <div class="live-status"><span class="live-dot" aria-hidden="true"></span><span class="live-badge">LIVE</span>
  </div>
  <div class="votes-counted"><strong>87%</strong> of Votes<br>Counted</div>
  <div class="header-updated"><span aria-hidden="true">●</span>
    <div>Last updated:<br><time datetime="2026-11-05T13:54:00">5 Nov 2026, 13:54</time>
    </div>
  </div>
  <div class="election-select"><label class="visually-hidden" for="election-year">Election year</label><select id="election-year" class="form-select" disabled><option>2021 Elections</option></select>
  </div>`;
const navigation = document.getElementById('site-navigation');
if (navigation) navigation.innerHTML = `
  <nav class="rail-primary"><a href="index.html" aria-label="Home" aria-current="page"><img src="assets/images/left_home_icon.png" alt=""></a><button type="button" aria-label="Search" data-bs-toggle="offcanvas" data-bs-target="#search-sidebar" aria-controls="search-sidebar" aria-expanded="false"><img src="assets/images/left_search_icon.png" alt=""></button><button disabled aria-label="Map"><img src="assets/images/left_map_icon.png" alt=""></button><button disabled aria-label="Results table"><img src="assets/images/left_table_icon.png" alt=""></button>
  </nav>
  <div class="rail-social"><button disabled aria-label="X"><img src="assets/images/left_twitter_icon.png" alt=""></button><button disabled aria-label="Facebook"><img src="assets/images/left_fb_icon.png" alt=""></button>
  </div>`;
const footer = document.getElementById('site-footer');
if (footer) footer.innerHTML = `
  <div class="stat"><span>Total Municipalities:</span><strong>257</strong>
  </div>
  <div class="stat"><span>Parties Participating:</span><strong>120</strong>
  </div>
  <div class="stat"><span>Voter Turnout:</span><strong>58.2%</strong>
  </div>
  <div class="stat"><span>Leading Party:</span><strong>ANC (45.5%)</strong>
  </div>
  <div class="stat"><span>Seats Declared:</span><strong>4500/4700</strong>
  </div>
  <div class="stat updated-stat"><span class="clock-icon" aria-hidden="true"></span><span>Last updated: <time datetime="2026-11-05T13:54:00">13:54 PM</time></span>
  </div>`;
