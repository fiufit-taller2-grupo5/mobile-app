import { Share, ShareContent } from 'react-native';

export const share = async (title: string, message: string) => {
  try {
    const shareContent: ShareContent = {
      message: message,
      title: title,
    };
    const result = await Share.share(shareContent);
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log("TW1:", result.activityType);
        // shared with activity type of result.activityType
      } else {
        console.log("TW2:", result);
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
        console.log("TW3:", result);

      // dismissed
    }
  } catch (error:any) {
    alert(error.message);
  }
};
