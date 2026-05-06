// FitnessCalc — common.js

// Search filtering on index
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('toolSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const q = this.value.toLowerCase().trim();
      document.querySelectorAll('.tool-card').forEach(function (card) {
        const text = card.textContent.toLowerCase();
        card.style.display = q === '' || text.includes(q) ? '' : 'none';
      });
      // Show/hide section headings if all cards hidden
      document.querySelectorAll('.section').forEach(function (sec) {
        const visible = Array.from(sec.querySelectorAll('.tool-card')).some(c => c.style.display !== 'none');
        sec.style.display = visible ? '' : 'none';
      });
    });
  }

  // Unit toggle buttons
  document.querySelectorAll('.toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const group = this.closest('.toggle-row');
      group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const unit = this.dataset.unit;
      if (unit) document.dispatchEvent(new CustomEvent('unitChange', { detail: unit }));
    });
  });
});

// Helper: round to decimals
function round(val, dec) {
  return Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec);
}

// Helper: show result box
function showResult(boxId) {
  const box = document.getElementById(boxId);
  if (box) { box.classList.add('show'); box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
}

// Helper: validate number input
function getNum(id) {
  const el = document.getElementById(id);
  if (!el) return NaN;
  const v = parseFloat(el.value);
  return isNaN(v) || v < 0 ? NaN : v;
}

// Helper: get select value
function getSel(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

// Active nav highlight
(function () {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(function (a) {
    if (a.getAttribute('href') === path) a.style.color = 'var(--green)';
  });
})();
