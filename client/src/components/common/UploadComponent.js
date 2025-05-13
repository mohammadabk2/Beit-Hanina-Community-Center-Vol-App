import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// import DropDownMenu from "./DropDownMenu";
// import DynamicButton from "./ButtonComponent";

const UploadFile = () => {
  const { t } = useTranslation("file");

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    // Clear previous state
    setError("");
    setPreviewUrl(null);
    setFile(null);

    const selectedFile = e.target.files?.[0]; // pass the first file only

    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setError(t("error_invalid_image_type"));
      setFile(null);
      setPreviewUrl(null);
      e.target.value = null;
    }
  };

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
      <div>
        <input
          className="button"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}

        {file && (
          <div className="flex-box flex-column">
            {previewUrl && (
              <div className="">
                <img
                  src={previewUrl}
                  alt={t("image_preview_alt")}
                  className="table-img preview-img"
                />

                {/* <div className="">
                  {t("file_size")}: {(file.size / (1024 * 1024)).toFixed(2)}{" "}
                  {t("MB")}
                </div> */}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UploadFile;
