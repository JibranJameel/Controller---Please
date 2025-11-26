// script.js — simplified interactions for the donation site
document.addEventListener('DOMContentLoaded', function () {
  // DOM elements
  const donatePrimary = document.getElementById('donatePrimary'); // hero button
  const donateBtn = document.getElementById('donateBtn');         // main donate button
  const donationDropdown = document.getElementById('donationDropdown');
  const closeDropdown = document.getElementById('closeDropdown');
  const copyables = document.querySelectorAll('.copyable');

  // Function to open the dropdown
  function openDropdown() {
    donationDropdown.style.display = 'block';
    donationDropdown.setAttribute('aria-hidden', 'false');
    // Scroll so user sees the dropdown
    donationDropdown.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Function to close the dropdown
  function closeDropdownFn() {
    donationDropdown.style.display = 'none';
    donationDropdown.setAttribute('aria-hidden', 'true');
  }

  // Hero button: scrolls to donation card and opens dropdown
  donatePrimary.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('donate').scrollIntoView({ behavior: 'smooth' });
    setTimeout(openDropdown, 450);
  });

  // Main donate button: toggle dropdown
  donateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (donationDropdown.getAttribute('aria-hidden') === 'true') {
      openDropdown();
    } else {
      closeDropdownFn();
    }
  });

  // Close dropdown button
  closeDropdown.addEventListener('click', (e) => {
    e.preventDefault();
    closeDropdownFn();
  });

  // Copy to clipboard for account numbers
  copyables.forEach(el => {
    el.addEventListener('click', async () => {
      const text = el.dataset.copy || el.textContent;
      try {
        await navigator.clipboard.writeText(text);
        el.textContent = 'Copied ✓';
        setTimeout(() => el.textContent = text, 1400);
      } catch (err) {
        console.warn('Copy failed', err);
      }
    });
  });

  // Optional: close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!donationDropdown.contains(e.target) && !donateBtn.contains(e.target) && !donatePrimary.contains(e.target)) {
      // Uncomment next line if you want dropdown to close when clicking outside
      // closeDropdownFn();
    }
  });
});
