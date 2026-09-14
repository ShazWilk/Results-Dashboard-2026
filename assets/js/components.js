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
  <div class="election-select"><label class="visually-hidden" for="election-year">Election year</label><select id="election-year" class="form-select" disabled><option>2026 Elections</option></select>
  </div>`;
const navigation = document.getElementById('site-navigation');
if (navigation) navigation.innerHTML = `
  <nav class="rail-primary" aria-label="Dashboard navigation">
    <a href="index.html" aria-label="Home" aria-current="page" data-sidebar-tooltip title="Home — Refreshes map and table back to National Leaderboard"><img src="assets/images/left_home_icon.png" alt=""></a>
    <button type="button" aria-label="Search" data-sidebar-tooltip title="Search — Search results via ID, Province, Municipality and Party Abbreviation." data-bs-toggle="offcanvas" data-bs-target="#search-sidebar" aria-controls="search-sidebar" aria-expanded="false"><img src="assets/images/left_search_icon.png" alt=""></button>
    <button type="button" aria-label="Key Councils" data-bs-toggle="offcanvas" data-bs-target="#key-councils-sidebar" aria-controls="key-councils-sidebar" aria-expanded="false" data-sidebar-tooltip title="Key Councils — Track key council outcomes"><img src="assets/images/left_map_icon.png" alt=""></button>
    <button type="button" aria-label="More Info" data-sidebar-tooltip title="More Info — Explore results and resources" data-bs-toggle="offcanvas" data-bs-target="#national-sidebar" aria-controls="national-sidebar" aria-expanded="false"><img src="assets/images/left_table_icon.png" alt=""></button>
  </nav>
  <div class="rail-social"><a href="https://x.com/iecsouthafrica?lang=en" aria-label="IEC South Africa on X"><img src="assets/images/left_twitter_icon.png" alt=""></a><a href="https://www.facebook.com/IECSouthAfrica" aria-label="IEC South Africa on Facebook"><img src="assets/images/left_fb_icon.png" alt=""></a>
  </div>`;
const footer = document.getElementById('site-footer');
// Retain the original national statistics separately for future data integration.
const legacyStatistics = document.querySelector('.legacy-statistics');
if (legacyStatistics) legacyStatistics.innerHTML = `
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
if (footer) footer.innerHTML = `
  <section class="footer-progress" aria-label="Results counting progress">
            <div class="progress-heading d-flex align-items-center">
              <img class="year-art" src="assets/images/2026.png" alt="2026">
              <div class="progress-title"><span>Local Government Elections</span>
                <h2>Results Progress</h2>
              </div>
              <div class="completion"><strong>87%</strong><span>complete</span>
              </div>
            </div>
            <div class="progress election-progress" role="progressbar" aria-label="Votes counted" aria-valuenow="87" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar">
              </div><img class="progressbar-logo" src="assets/images/progressbar_logo.png" alt="IEC South Africa">
            </div>
  </section>
  <div class="completion-navigation">
    <button class="statistics-arrow statistics-previous" type="button" aria-label="Previous statistics" aria-controls="completion-statistics" disabled><span aria-hidden="true">‹</span></button>
  <div id="completion-statistics" class="completion-statistics" role="region" tabindex="0" aria-label="Results completion statistics">
    <div class="stat"><span>Voting districts completed</span><strong data-result-stat="voting-districts">0 <small>of</small> <em>23148</em></strong></div>
    <div class="stat"><span>Wards completed</span><strong data-result-stat="wards">0 <small>of</small> <em>4468</em></strong></div>
    <div class="stat"><span>Municipalities completed</span><strong data-result-stat="municipalities">0 <small>of</small> <em>213</em></strong></div>
    <div class="stat"><span>Seats allocated</span><strong data-result-stat="seats">0 <small>of</small> <em>8794</em></strong></div>
  </div>
    <button class="statistics-arrow statistics-next" type="button" aria-label="Next statistics" aria-controls="completion-statistics"><span aria-hidden="true">›</span></button>
  </div>`;
