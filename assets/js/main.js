// Reserve the actual fixed chrome height when the header or footer wraps.
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

// Arrow controls share the same scroll region as touch and keyboard navigation.
const completionStatistics = document.getElementById('completion-statistics');
if (completionStatistics) {
  const previous = document.querySelector('.statistics-previous');
  const next = document.querySelector('.statistics-next');
  const updateStatisticsArrows = () => {
    previous.disabled = completionStatistics.scrollLeft <= 1;
    next.disabled = completionStatistics.scrollLeft + completionStatistics.clientWidth >= completionStatistics.scrollWidth - 1;
  };
  const scrollStatistics = (direction) => {
    const step = completionStatistics.querySelector('.stat').getBoundingClientRect().width;
    completionStatistics.scrollBy({
      left: direction * step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  };
  previous.addEventListener('click', () => scrollStatistics(-1));
  next.addEventListener('click', () => scrollStatistics(1));
  completionStatistics.addEventListener('scroll', updateStatisticsArrows, { passive: true });
  window.addEventListener('resize', updateStatisticsArrows);
  if ('ResizeObserver' in window) new ResizeObserver(updateStatisticsArrows).observe(completionStatistics);
  updateStatisticsArrows();
}
// #results-table stays empty for integration; its separate visual preview is hidden
// by CSS as soon as real content is rendered into the integration target.

const searchForm = document.getElementById('results-search-form');
searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
});

// Shared nonmodal drawers overlay content and close on outside click or Escape.
document.querySelectorAll('.dashboard-sidebar').forEach((sidebar) => {
  const toggle = document.querySelector(`[aria-controls="${sidebar.id}"]`);
  if (!toggle || !window.bootstrap?.Offcanvas) return;
  sidebar.addEventListener('show.bs.offcanvas', () => {
    toggle.setAttribute('aria-expanded', 'true');
  });
  sidebar.addEventListener('shown.bs.offcanvas', () => {
    (sidebar.querySelector('input') || sidebar.querySelector('h2'))?.focus();
  });
  sidebar.addEventListener('hidden.bs.offcanvas', () => {
    toggle.setAttribute('aria-expanded', 'false');
    if (!document.querySelector('.dashboard-sidebar.show, .dashboard-sidebar.showing')) toggle.focus();
  });
  document.addEventListener('click', (event) => {
    if (sidebar.classList.contains('show') && !sidebar.contains(event.target) && !toggle.contains(event.target)) {
      bootstrap.Offcanvas.getInstance(sidebar)?.hide();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('show')) {
      bootstrap.Offcanvas.getInstance(sidebar)?.hide();
    }
  });
});

// Use a separate marker so tooltips coexist with offcanvas toggle attributes.
if (window.bootstrap?.Tooltip) {
  let activeTooltip;
  document.querySelectorAll('[data-sidebar-tooltip]').forEach((icon) => {
    const [heading, ...description] = icon.getAttribute('title').split(' — ');
    const content = document.createElement('div');
    const title = document.createElement('strong');
    title.className = 'sidebar-tooltip-heading';
    title.textContent = heading;
    const subtitle = document.createElement('span');
    subtitle.className = 'sidebar-tooltip-description';
    subtitle.textContent = description.join(' — ');
    content.append(title, subtitle);
    const tooltip = new bootstrap.Tooltip(icon, {
      container: document.body,
      customClass: 'sidebar-tooltip',
      html: true,
      title: content,
      placement: () => window.matchMedia('(max-width: 575.98px)').matches ? 'bottom' : 'right',
      trigger: 'manual',
      animation: false
    });
    const hideTooltip = () => {
      tooltip.hide();
      if (activeTooltip === tooltip) activeTooltip = null;
    };
    const showTooltip = () => {
      if (icon.getAttribute('aria-expanded') === 'true') return;
      activeTooltip?.hide();
      tooltip.show();
      activeTooltip = tooltip;
    };
    icon.addEventListener('mouseenter', showTooltip);
    icon.addEventListener('mouseleave', hideTooltip);
    // Restoring focus after a pointer click must not reopen the tooltip.
    icon.addEventListener('focus', () => {
      if (icon.matches(':focus-visible')) showTooltip();
    });
    icon.addEventListener('blur', hideTooltip);
    icon.addEventListener('click', hideTooltip);
    const sidebar = document.getElementById(icon.getAttribute('aria-controls'));
    sidebar?.addEventListener('show.bs.offcanvas', hideTooltip);
    icon.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') hideTooltip();
    });
  });
  window.addEventListener('blur', () => {
    activeTooltip?.hide();
    activeTooltip = null;
  });
}
