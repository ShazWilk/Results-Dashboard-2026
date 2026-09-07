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
