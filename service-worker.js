// ハレタス Service Worker
// キャッシュバージョン（更新時はここを変える）
const CACHE_NAME = 'haretasu-v1';

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// インストール: 静的アセットをキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// アクティベート: 古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// フェッチ: キャッシュファースト戦略
self.addEventListener('fetch', event => {
  // 同一オリジンのリクエストのみキャッシュ対象
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const cloned = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        return response;
      }).catch(() => {
        // オフライン時はindex.htmlにフォールバック
        return caches.match('./index.html');
      });
    })
  );
});

// プッシュ通知の受信 (バックグラウンド)
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'ハレタス', body: 'タスクの時間だよ！' };
  event.waitUntil(
    self.registration.showNotification(data.title || 'ハレタス', {
      body: data.body || 'タスクの時間だよ！',
      icon: './manifest.json',
      badge: './manifest.json',
      tag: data.tag || 'haretasu-notification',
      requireInteraction: false
    })
  );
});

// 通知クリック: アプリを開く
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});
