// Backup and Restore Module
(() => {
  const STORAGE_KEYS = ['phoenixBookings', 'phoenixAdminTours', 'phoenixSettings'];
  
  function createBackup() {
    try {
      const now = new Date().toISOString();
      const storage = {};
      STORAGE_KEYS.forEach(k => {
        const v = localStorage.getItem(k);
        if (v !== null) storage[k] = v;
      });
      const backupObj = {
        format: 'phoenix-tours-backup',
        createdAt: now,
        storage
      };
      const blob = new Blob([JSON.stringify(backupObj, null, 2)], { type: 'application/json' });
      const u = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = u;
      a.download = `phoenix-tours-backup-${now.slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { a.remove(); URL.revokeObjectURL(u); }, 1000);
    } catch (err) {
      console.error('Backup error:', err);
    }
  }

  window.createPhoenixBackup = createBackup;
})();
