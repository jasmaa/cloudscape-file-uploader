# Cloudscape File Uploader

[![NPM version](https://img.shields.io/npm/v/cloudscape-file-uploader)](https://www.npmjs.com/package/cloudscape-file-uploader)
[![Build](https://img.shields.io/github/actions/workflow/status/jasmaa/cloudscape-file-uploader/build.yml)](https://github.com/jasmaa/cloudscape-file-uploader/actions/workflows/build.yml)
[![Codecov](https://img.shields.io/codecov/c/github/jasmaa/cloudscape-file-uploader)](https://app.codecov.io/gh/jasmaa/cloudscape-file-uploader)

A file uploader for Cloudscape following: https://cloudscape.design/components/fileupload/

![Screenshot of multiple file uploader](https://github.com/jasmaa/cloudscape-file-uploader/raw/main/docs/screenshot_01.png)

## Usage

Install the package and Cloudscape peer dependencies with npm:

```
npm install @cloudscape-design/components @cloudscape-design/design-tokens
npm install cloudscape-file-uploader
```

...or with Yarn

```
yarn add @cloudscape-design/components @cloudscape-design/design-tokens
yarn add cloudscape-file-uploader
```

Add `FileUploader` to project:

```jsx
import React, { useState } from "react";
import { FileUploader } from "cloudscape-file-uploader";

function App() {
  const [files, setFiles] = useState([]);
  const [errorText, setErrorText] = useState("");

  return (
    <FileUploader
      fileInputId="singleFileUpload"
      text="Choose a file to upload"
      label="Upload a file"
      errorText={errorText}
      files={files}
      onFilesUploaded={(uploadedFiles) => {
        if (uploadedFiles.length === 1) {
          setFiles1([...uploadedFiles]);
          setErrorText("");
        } else {
          setErrorText("An error occured.");
        }
      }}
    />
  );
}
```

See more [examples](./examples/cloudscape-file-uploader-example).

## Development

Install packages and build dist:

```
yarn install
yarn build
```

## Testing

Test with:

```
yarn test
```

Fix prettier with:

```
npx prettier --write .
```

Fix eslint with:

```
npx eslint --fix .
```
