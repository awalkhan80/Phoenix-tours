// Phoenix Travel & Tours Admin Script
document.addEventListener('DOMContentLoaded', () => {
  const navBtns = document.querySelectorAll('.sidebar nav button');
  const views = document.querySelectorAll('.view');
  const viewTitle = document.getElementById('viewTitle');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.view;
      document.getElementById(target)?.classList.add('active');
      if (viewTitle) viewTitle.textContent = btn.textContent;
    });
  });

  const sendTestBtn = document.getElementById('btnSendTestEmail');
  if (sendTestBtn) {
    sendTestBtn.addEventListener('click', async () => {
      const emailInput = document.getElementById('testEmailInput');
      const statusDiv = document.getElementById('testEmailStatus');
      if (!emailInput || !emailInput.value) {
        statusDiv.style.color = '#ef4444';
        statusDiv.textContent = 'Please enter a recipient email address.';
        return;
      }
      statusDiv.style.color = '#0d9488';
      statusDiv.textContent = 'Sending test email...';
      try {
        const res = await fetch('/api/test-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ toEmail: emailInput.value })
        });
        const data = await res.json();
        if (data.success) {
          statusDiv.style.color = '#10b981';
          statusDiv.textContent = 'Test email dispatched successfully!';
        } else {
          statusDiv.style.color = '#ef4444';
          statusDiv.textContent = 'Failed: ' + (data.error || 'Server error');
        }
      } catch (err) {
        statusDiv.style.color = '#ef4444';
        statusDiv.textContent = 'Network or server error.';
      }
    });
  }
});
