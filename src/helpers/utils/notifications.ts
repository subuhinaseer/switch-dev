import notifee from '@notifee/react-native';

export const showNotification = async ({
  channel = {},
  ...notification
} = {}) => {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    ...channel,
  });
  // Display a notification
  return await notifee.displayNotification({
    title: 'Notification',
    body: '',
    ...notification,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      ...(notification.android || {}),
    },
  });
};
