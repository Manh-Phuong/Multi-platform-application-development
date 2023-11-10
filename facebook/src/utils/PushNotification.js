import messaging from '@firebase/messaging';

const registerForPushNotifications = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
  } catch (error) {
    console.error('Error registering device for remote messages:', error);
  }

  // Lắng nghe sự kiện thông báo
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification opened while the app was in the foreground:', remoteMessage);
    // Xử lý thông báo ở đây
  });

  // Nếu thông báo được nhấn khi ứng dụng không hoạt động
  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      console.log('Notification opened from a quit state:', remoteMessage);
      // Xử lý thông báo ở đây
    }
  });
};

export { registerForPushNotifications };
