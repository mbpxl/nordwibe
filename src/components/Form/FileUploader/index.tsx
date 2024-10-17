import React, { useState } from "react";
import styles from "./styles.module.scss";

type FileUploaderProps = {
  onChange: (files: FileList) => void;
  accept: string;
};

const FileUploader: React.FC<FileUploaderProps> = ({ onChange, accept }) => {
  const [files, setFiles] = useState<FileList | undefined>(undefined);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFiles(files);
      onChange(files);
    }
  };

  return (
    <div className={styles.fileUploader}>
      <label className={styles.label} htmlFor="file-input">
        Загрузить файлы
      </label>
      <div className={styles.fileInputWrapper}>
        <input
          className={styles.fileInput}
          type="file"
          id="file-input"
          multiple
          accept={accept}
          onChange={handleFileChange}
          style={{
            position: "absolute",
            left: -9999,
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
};

export default FileUploader;
