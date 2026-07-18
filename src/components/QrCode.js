import React, { useEffect, useRef } from "react";

function QrCode({ value, size = 160 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!window.QRCode || !containerRef.current) return;
    containerRef.current.innerHTML = "";
    // eslint-disable-next-line no-new
    new window.QRCode(containerRef.current, {
      text: value,
      width: size,
      height: size,
    });
  }, [value, size]);

  return <div ref={containerRef} className="bc-qr-canvas" />;
}

export default QrCode;
