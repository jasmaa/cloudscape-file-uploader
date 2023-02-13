import React, { useState } from "react";
import { Container } from "@cloudscape-design/components";
import { FileUploader } from "cloudscape-file-uploader";

export default function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [errorText, setErrorText] = useState<string>();

  return (
    <Container>
      <FileUploader
        fileInputId="fileUpload"
        text="Choose file to upload"
        label="Upload a file"
        description="You can use this input to upload a file"
        constraintText="Hint: Press the button to upload a file"
        errorText={errorText}
        files={files}
        multiple
        onFilesUploaded={(uploadedFiles) => {
          if (uploadedFiles && uploadedFiles.length > 0) {
            setFiles([...files, ...uploadedFiles]);
          } else {
            setErrorText("An error occured.");
          }
        }}
        onFileRemoved={(fileIdx) => {
          const updatedFiles = [...files];
          updatedFiles.splice(fileIdx, 1);
          setFiles(updatedFiles);
        }}
      />
    </Container>
  );
}
