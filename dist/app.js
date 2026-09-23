// Phoenix Travel & Tours Client Script
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const mainNav = document.getElementById('mainNav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
      mainNav.style.flexDirection = 'column';
      mainNav.style.position = 'absolute';
      mainNav.style.top = '100%';
      mainNav.style.left = '0';
      mainNav.style.right = '0';
      mainNav.style.background = '#052f39';
      mainNav.style.padding = '20px';
    });
  }

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusDiv = document.getElementById('formStatus');
      statusDiv.style.color = '#0d9488';
      statusDiv.textContent = 'Processing reservation request...';

      const tour = document.getElementById('tourSelect')?.value || 'Desert Safari';
      const name = document.getElementById('custName')?.value || '';
      const phone = document.getElementById('custPhone')?.value || '';
      const date = document.getElementById('bookDate')?.value || '';
      const time = document.getElementById('bookTime')?.value || '';
      const riders = document.getElementById('bookRiders')?.value || '1';
      const notes = document.getElementById('bookNotes')?.value || '';

      const msg = `Hello Phoenix Travel & Tours! I would like to book:\nTour: ${tour}\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${riders}\nNotes: ${notes}`;
      const waUrl = `https://wa.me/971561505270?text=${encodeURIComponent(msg)}`;

      setTimeout(() => {
        statusDiv.textContent = 'Redirecting to WhatsApp Concierge...';
        window.open(waUrl, '_blank');
      }, 800);
    });
  }
});
