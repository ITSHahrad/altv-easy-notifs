import * as alt from 'alt-client';
import notificationEvents from '../shared/notification-types.js';

var webview;

const handleNewNotification = (type, text) => {
  if (webview == null) {
    return 
  }

  webview.emit(notificationEvents.CreateNotification, type, text);
}

alt.onServer(notificationEvents.CreateNotification, handleNewNotification);
alt.on(notificationEvents.CreateNotification, handleNewNotification);

const handleLoadNotificationCEF = (state) => {
  if (!state) {
    webview.destroy();
  }

  if (webview != null) { 
    return;
  }

  webview = new alt.WebView('http://resource/client/CEF/index.html');
  webview.focus();
}

alt.onServer(notificationEvents.LoadNotification, handleLoadNotificationCEF);
alt.on(notificationEvents.LoadNotification, handleLoadNotificationCEF);