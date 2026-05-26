'use client';

import { useEffect } from 'react';
import { getSession, signInAnonymously } from '@/lib/auth';
import {
  registerServiceWorker,
  checkRhythmNotifications,
  loadNotificationPrefs,
  subscribeToPush,
  notificationPermission,
} from '@/lib/notifications';
import { loadAllRemote } from '@/lib/sync';

export function AuthBootstrap() {
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        signInAnonymously();
      } else {
        loadAllRemote();
      }
    });

    registerServiceWorker().then(async () => {
      // Check and fire rhythm notifications (diurnal + seasonal thresholds)
      await checkRhythmNotifications();

      // Re-register push subscription on each load so the server always has
      // a fresh endpoint (subscriptions can change after browser updates).
      const prefs = loadNotificationPrefs();
      if (prefs.enabled && notificationPermission() === 'granted') {
        subscribeToPush();
      }
    });
  }, []);

  return null;
}
