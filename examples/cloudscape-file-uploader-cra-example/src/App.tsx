import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from '@cloudscape-design/components';
import { FileUploader } from 'cloudscape-file-uploader';

function App() {
  const [files1, setFiles1] = useState<File[]>([]);
  const [errorText1, setErrorText1] = useState<string>();
  const [files2, setFiles2] = useState<File[]>([]);
  const [errorText2, setErrorText2] = useState<string>();

  return (
    <Container>
      <FileUploader
        fileInputId="singleFileUpload"
        text="Choose a single file to upload"
        label="Upload a single file"
        description="You can use this input to upload files"
        constraintText="Hint: Press the button to upload files"
        errorText={errorText1}
        files={files1}
        onFilesUploaded={(uploadedFiles) => {
          if (uploadedFiles.length === 1) {
            setFiles1([...uploadedFiles]);
            setErrorText1("");
          } else {
            setErrorText1("An error occured.");
          }
        }}
      />
      <FileUploader
        fileInputId="multipleFileUpload"
        text="Choose multiple files to upload"
        label="Upload multiple files"
        description="You can use this input to upload files"
        constraintText="Hint: Press the button to upload files"
        errorText={errorText2}
        files={files2}
        multiple
        onFilesUploaded={(uploadedFiles) => {
          if (uploadedFiles.length > 0) {
            setFiles2([...uploadedFiles]);
            setErrorText2("");
          } else {
            setErrorText2("An error occured.");
          }
        }}
        onFileRemoved={(fileIdx) => {
          const updatedFiles = [...files2];
          updatedFiles.splice(fileIdx, 1);
          setFiles2(updatedFiles);
        }}
      />
    </Container>
  );
}

export default App;
