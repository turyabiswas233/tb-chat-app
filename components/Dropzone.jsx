import React, { useCallback } from "react";

function Dropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // handle file upload here
  }, []);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      style={{
        width: 200,
        height: 200,
        border: "1px solid black",
        textAlign: "center",
      }}
    >
      Drag and drop files here
    </div>
  );
}

export default Dropzone;
