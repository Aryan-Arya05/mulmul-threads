// Mulmul Threads service worker: shows alerts and opens the right screen when one is tapped.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data.json(); } catch (_) { d = { title: 'Mulmul Threads', body: e.data ? e.data.text() : '' }; }
  const opts = { body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', data: { link: d.link || '' } };
  if (d.link) { opts.tag = d.link; opts.renotify = true; }
  const jobs = [self.registration.showNotification(d.title || 'Mulmul Threads', opts)];
  if (typeof d.badge === 'number' && self.navigator && self.navigator.setAppBadge) {
    jobs.push(d.badge ? self.navigator.setAppBadge(d.badge).catch(() => {}) : self.navigator.clearAppBadge().catch(() => {}));
  }
  e.waitUntil(Promise.all(jobs));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const link = (e.notification.data && e.notification.data.link) || '';
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) {
      if ('focus' in c) { try { await c.focus(); } catch (_) {} c.postMessage({ open: link }); return; }
    }
    await self.clients.openWindow('./' + (link ? '?open=' + encodeURIComponent(link) : ''));
  })());
});
