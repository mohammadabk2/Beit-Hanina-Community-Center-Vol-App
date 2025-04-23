import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// import DropDownMenu from "./DropDownMenu";
// import DynamicButton from "./ButtonComponent";

const UploadFile = () => {
  const { t } = useTranslation("file");
  //   const navigate = useNavigate();

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
            <div className="basic-item-padding">
              {t("file_size")}: {(file.size / (1024 * 1024)).toFixed(2)}{" "}
              {t("MB")}
            </div>

            {previewUrl && (
              <div className="basic-item-padding">
                <img
                  src={previewUrl}
                  alt={t("image_preview_alt")}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    marginTop: "10px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UploadFile;
