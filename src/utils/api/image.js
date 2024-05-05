//Fire store config
import { imageDB } from "../../utils/api/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (image, path) => {
  if (image) {
    // Create a reference to the Firebase Storage location where you want to store the image
    const storageRef = ref(imageDB, path);

    try {
      // Convert the image URI to a Blob
      const response = await fetch(image);
      const blob = await response.blob();

      // Upload the image blob to Firebase Storage
      await uploadBytes(storageRef, blob);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      if (downloadURL) {
        return downloadURL;
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  }
  return null;
};
