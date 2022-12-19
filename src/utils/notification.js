import PushNotification from 'react-native-push-notification';

export const handleShowNotification = (
  msg,
  title = 'Local Notification',
  options = {},
) => {
  PushNotification.localNotification({
    channelId: 'local-notification',
    title,
    message: msg,
    ...options,
  });
};

export const handleScheduledNotification = (msg, seconds = 1) => {
  PushNotification.localNotificationSchedule({
    channelId: 'local-notification',
    title: 'Scheduled Notification',
    message: msg,
    date: new Date(Date.now() + Number(seconds) * 1000),
  });
};
