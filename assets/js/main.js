// Keep the rail and desktop viewport layout aligned when the header wraps.
const dashboardHeader = document.getElementById('site-header');
const dashboardFooter = document.getElementById('site-footer');
function updateChromeDimensions() {
  if (dashboardHeader) document.documentElement.style.setProperty('--header-height', `${dashboardHeader.offsetHeight}px`);
  if (dashboardFooter) document.documentElement.style.setProperty('--footer-height', `${dashboardFooter.offsetHeight}px`);
}
if ('ResizeObserver' in window) {
  const chromeObserver = new ResizeObserver(updateChromeDimensions);
  if (dashboardHeader) chromeObserver.observe(dashboardHeader);
  if (dashboardFooter) chromeObserver.observe(dashboardFooter);
}
updateChromeDimensions();
// #results-table is intentionally empty for the data integration.

const searchSidebar = document.getElementById('search-sidebar');
const searchToggle = document.querySelector('[aria-controls="search-sidebar"]');
const searchForm = document.getElementById('results-search-form');
const searchStatus = document.getElementById('search-data-status');

const searchId = document.getElementById('search-id');

// Shared layouts may omit the search drawer entirely.
if (searchSidebar && searchToggle && searchForm && searchStatus && searchId && window.bootstrap?.Offcanvas) {
  searchSidebar.addEventListener('show.bs.offcanvas', () => {
    searchToggle.setAttribute('aria-expanded', 'true');
  });
  searchSidebar.addEventListener('shown.bs.offcanvas', () => {
    searchId.focus();
  });
  searchSidebar.addEventListener('hidden.bs.offcanvas', () => {
    searchToggle.setAttribute('aria-expanded', 'false');
    searchToggle.focus();
  });
  // A nonmodal panel keeps the dashboard available, including outside clicks.
  document.addEventListener('click', (event) => {
    if (searchSidebar.classList.contains('show') &&
        !searchSidebar.contains(event.target) && !searchToggle.contains(event.target)) {
      bootstrap.Offcanvas.getInstance(searchSidebar)?.hide();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && searchSidebar.classList.contains('show')) {
      bootstrap.Offcanvas.getInstance(searchSidebar)?.hide();
    }
  });
  function showSearchDataStatus() {
    searchStatus.textContent = 'Results search and municipality options will be available when election data is connected.';
    searchStatus.hidden = false;
  }
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showSearchDataStatus();
  });
  searchForm.addEventListener('change', showSearchDataStatus);
  searchForm.addEventListener('reset', () => {
    searchStatus.hidden = true;
    searchStatus.textContent = '';
  });
}
