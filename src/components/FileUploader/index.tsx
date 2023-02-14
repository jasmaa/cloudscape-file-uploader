import React from "react";
import { Box, Button, FormField } from "@cloudscape-design/components";
import FileEntry from "./FileEntry";
import Token from "./Token";

export default function FileUploader({
  fileInputId,
  text,
  label,
  description,
  constraintText,
  errorText,
  files,
  onFilesUploaded,
  onFileRemoved,
  multiple = false,
}: {
  fileInputId: string;
  text: string;
  label?: string;
  description?: string;
  constraintText?: string;
  errorText?: string;
  files: File[];
  onFilesUploaded: (uploadedFiles: File[]) => void;
  onFileRemoved?: (fileIdx: number) => void;
  multiple?: boolean;
}) {
  return (
    <>
      <FormField
        label={label}
        description={description}
        constraintText={constraintText}
        errorText={errorText}
      >
        <Button
          iconName="upload"
          onClick={() => {
            document.getElementById(fileInputId).click();
          }}
        >
          <input
            id={fileInputId}
            type="file"
            multiple={multiple}
            hidden
            onChange={() => {
              const fileInput = document.getElementById(fileInputId);
              onFilesUploaded(
                Array.from((fileInput as HTMLInputElement).files)
              );
            }}
          />
          {text}
        </Button>
      </FormField>
      <Box margin={{ top: "l" }}>
        {files &&
          files.length > 0 &&
          (multiple ? (
            Array.from(files).map((file, fileIdx) => (
              <div key={`file-${fileIdx}`} data-testid={`token-${file.name}`}>
                <Token
                  onClose={
                    onFileRemoved
                      ? () => {
                          onFileRemoved(fileIdx);
                        }
                      : null
                  }
                >
                  <FileEntry file={file} showImage />
                </Token>
              </div>
            ))
          ) : (
            <FileEntry file={files[0]} />
          ))}
      </Box>
    </>
  );
}
