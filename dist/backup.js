// Phoenix Tours - Backup & Restore System
(function() {
  function updateBackupMeta() {
    const el = document.getElementById('backupLastExport');
    if (!el) return;
    const last = localStorage.getItem('phoenixLastBackupTime');
    if (last) {
      el.textContent = `Last export: ${new Date(last).toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}`;
    } else {
      el.textContent = 'No backup exported yet.';
    }
  }
  window.updateBackupMeta = updateBackupMeta;

  function exportData() {
    const payload = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      phoenixBookings: JSON.parse(localStorage.getItem('phoenixBookings') || '[]'),
      phoenixAdminTours: JSON.parse(localStorage.getItem('phoenixAdminTours') || '[]'),
      phoenixHomepageCMS: JSON.parse(localStorage.getItem('phoenixHomepageCMS') || '{}'),
      phoenixLandingCMS: JSON.parse(localStorage.getItem('phoenixLandingCMS') || '{}'),
      phoenixCategoryImages: JSON.parse(localStorage.getItem('phoenixCategoryImages') || '{}'),
      phoenixSettings: JSON.parse(localStorage.getItem('phoenixSettings') || '{}')
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `phoenix-tours-backup-${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);

    localStorage.setItem('phoenixLastBackupTime', new Date().toISOString());
    updateBackupMeta();
  }

  function restoreData(file) {
    const statusEl = document.getElementById('restoreBackupStatus');
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data || typeof data !== 'object') throw new Error('Invalid JSON format');

        if (Array.isArray(data.phoenixBookings)) {
          localStorage.setItem('phoenixBookings', JSON.stringify(data.phoenixBookings));
        }
        if (Array.isArray(data.phoenixAdminTours)) {
          localStorage.setItem('phoenixAdminTours', JSON.stringify(data.phoenixAdminTours));
        }
        if (data.phoenixHomepageCMS) {
          localStorage.setItem('phoenixHomepageCMS', JSON.stringify(data.phoenixHomepageCMS));
        }
        if (data.phoenixLandingCMS) {
          localStorage.setItem('phoenixLandingCMS', JSON.stringify(data.phoenixLandingCMS));
        }
        if (data.phoenixCategoryImages) {
          localStorage.setItem('phoenixCategoryImages', JSON.stringify(data.phoenixCategoryImages));
        }
        if (data.phoenixSettings) {
          localStorage.setItem('phoenixSettings', JSON.stringify(data.phoenixSettings));
        }

        if (statusEl) {
          statusEl.textContent = '✓ Data restored successfully!';
          statusEl.style.color = '#0f766e';
        }

        window.dispatchEvent(new CustomEvent('phoenix:data-restored'));
        if (typeof window.reloadAdminDashboard === 'function') {
          window.reloadAdminDashboard();
        }
      } catch (err) {
        if (statusEl) {
          statusEl.textContent = `Restore failed: ${err.message}`;
          statusEl.style.color = '#dc2626';
        }
      }
    };
    reader.readAsText(file);
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateBackupMeta();
    const exportBtn = document.getElementById('exportBackupJsonBtn');
    if (exportBtn) exportBtn.onclick = exportData;

    const restoreInput = document.getElementById('restoreBackupJsonInput');
    if (restoreInput) {
      restoreInput.onchange = (e) => {
        const file = e.target.files?.[0];
        if (file) restoreData(file);
      };
    }
  });
})();
