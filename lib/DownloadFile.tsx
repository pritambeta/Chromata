import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';

const downloadImage = async (imageUrl) => {
  const imageName = "10" + (Math.floor(Math.random() * (999999999 - 10000000 + 1)) + 10000000).toString();
  const ext = "jpg";

  const chromataFolderPath = Platform.select({
    android: RNFetchBlob.fs.dirs.DownloadDir + '/Chromata',
    ios: RNFetchBlob.fs.dirs.DocumentDir + '/Chromata',
  });

  try {
    const folderExists = await RNFetchBlob.fs.isDir(chromataFolderPath);

    if (!folderExists) {
      await RNFetchBlob.fs.mkdir(chromataFolderPath);
    }

    const filePath = `${chromataFolderPath}/${imageName}.${ext}`;

    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
      },
      IOSBackgroundTask: true,
    })
      .fetch('GET', imageUrl)
      .then(res => {
        // console.log('Image downloaded:', res.path());
      })
      .catch(error => {
        // console.error('Error downloading image:', error);
      });
  } catch (error) {
    // console.error('Error handling Chromata folder:', error);
  }
};

export default downloadImage;