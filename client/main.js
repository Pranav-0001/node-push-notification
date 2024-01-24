if (!this.document) {
  self.addEventListener("push", (event) => {
    let notification = event.data.json();
    self.registration.showNotification(
      notification.title,
      notification.options
    );
  });
  self.addEventListener(
    "notificationclick",
    function (event) {
      if (clients && event.action?.split("redirect_")[1]) {
        clients.openWindow(event.action.split("redirect_")[1]);
      }
      event.notification.close();
    },
    false
  );
} else {
  var VAPID_PUBLIC_KEY =
    "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

  async function registerServiceWorker() {
    await navigator.serviceWorker.register("main.js");
  }
  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.getRegistration();
    const isAlreadySubscribed =
      await registration.pushManager.getSubscription();
    if (!isAlreadySubscribed) {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY),
      });
      var scriptElement = document.querySelector("script[data-owner]");
      var owner = scriptElement.getAttribute("data-owner");
      console.log({ subscription });
      const res = await fetch("http://localhost:3000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscription,owner }),
      });
    }
  }

  /* Utility functions. */

  // Convert a base64 string to Uint8Array.
  // Must do this so the server can understand the VAPID_PUBLIC_KEY.
  const urlB64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  async function postToServer(url, data) {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  (function init() {
    registerServiceWorker();
    subscribeToPush();
  })();
}
