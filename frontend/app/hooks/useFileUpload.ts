import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Asynchronous function to handle the file picking process.
  const handlePickFile = async () => {
    try {
      // Open the document picker, restricting file types to PDFs and videos.
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "video/*"],
      });

      if (result.canceled) return; // If the user cancels the selection, exit the function.

      // Get the first selected file from the assets array.
      const file = result.assets[0];
      // Set the selected file's name in the state.
      setSelectedFile(file.name);

      // Start the upload simulation by setting uploading to true and progress to 0.
      setUploading(true);
      setProgress(0);
      let p = 0;

      // Use an interval to simulate a progress bar incrementing.
      const interval = setInterval(() => {
        p += 10; // Increment the progress by 10.
        setProgress(p);
        // When progress reaches 100, clear the interval and stop the upload.
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          // Alert the user that the upload is complete.
          alert("Upload complete!");
        }
      }, 300);
    } catch (err) {
      console.error(err);
      // Ensure uploading state is set to false in case of an error.
      setUploading(false);
    }
  };

  // Returning the state variables and the function for external use.
  return {
    uploading,
    progress,
    selectedFile,
    setSelectedFile,
    handlePickFile,
  };
};
