document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.site-header nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Handle booking form submit if present
  const bookForm = document.getElementById('bookingForm');
  if (bookForm) {
    bookForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = bookForm.querySelector('button[type="submit"]');
      const statusEl = document.getElementById('formStatus');
      
      const formData = {
        name: document.getElementById('custName')?.value || '',
        email: document.getElementById('custEmail')?.value || '',
        phone: document.getElementById('custPhone')?.value || '',
        tour: document.getElementById('tourSelect')?.value || 'Desert Safari',
        date: document.getElementById('bookDate')?.value || '',
        time: document.getElementById('bookTime')?.value || '',
        riders: document.getElementById('bookRiders')?.value || 1,
        notes: document.getElementById('bookNotes')?.value || ''
      };

      if (!formData.name || !formData.phone) {
        if (statusEl) statusEl.textContent = 'Please enter your name and phone number.';
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (statusEl) statusEl.textContent = 'Processing reservation...';

      try {
        const res = await fetch('/api/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
          if (statusEl) {
            statusEl.innerHTML = `<span style="color:#0d9488;font-weight:800;">✓ Reservation confirmed! Code: ${data.confirmationCode}</span>`;
          }
          bookForm.reset();
        } else {
          if (statusEl) statusEl.textContent = data.error || 'Booking failed. Please try again.';
        }
      } catch (err) {
        if (statusEl) statusEl.textContent = 'Network error. Please try again or book via WhatsApp.';
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});
