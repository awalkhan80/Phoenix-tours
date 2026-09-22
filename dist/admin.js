// Phoenix Travel & Tours - Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.sidebar nav button');
  const views = document.querySelectorAll('.view');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));
      
      btn.classList.add('active');
      const targetView = document.getElementById(btn.dataset.view);
      if (targetView) targetView.classList.add('active');
    });
  });

  // Test Email Button Handler
  const testEmailBtn = document.getElementById('btnSendTestEmail');
  if (testEmailBtn) {
    testEmailBtn.onclick = () => {
      const email = (document.getElementById('testEmailInput')?.value || '').trim();
      const st = document.getElementById('testEmailStatus');
      if (!email) {
        if (st) st.textContent = 'Please provide an email address.';
        return;
      }
      testEmailBtn.disabled = true;
      testEmailBtn.textContent = 'Sending...';
      if (st) st.textContent = 'Dispatching test booking summary email...';

      fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      .then(r => r.json())
      .then(res => {
        testEmailBtn.disabled = false;
        testEmailBtn.textContent = '✉ Send Test';
        if (st) {
          st.textContent = `✓ Test summary email dispatched to ${email}! Check inbox or spam.`;
          st.style.color = '#0d9488';
        }
      })
      .catch(err => {
        testEmailBtn.disabled = false;
        testEmailBtn.textContent = '✉ Send Test';
        if (st) {
          st.textContent = `Error: ${err.message || 'Failed'}`;
          st.style.color = '#dc2626';
        }
      });
    };
  }
});
