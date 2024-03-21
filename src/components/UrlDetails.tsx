import { saveAs } from "file-saver";
import { useState } from "react";
import {
  Copy,
  ShareNetwork,
  XCircle,
  DownloadSimple,
} from "@phosphor-icons/react";
import "../css/modal.css";
import Modal from "./Modal";

interface DetailsProps {
  urlIsOpen: boolean;
  longLink: string;
  shortLink: string;
  qrCodeImage: string;
  closeUrlDetails: () => void;
}

const UrlDetails: React.FC<DetailsProps> = ({
  urlIsOpen,
  longLink,
  shortLink,
  qrCodeImage,
  closeUrlDetails,
}) => {
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortLink);
      setModalMessage("Copied to clipboard!");
      setShowModal(true);
    } catch (error) {
      console.error("Failed to copy:", error);
      setModalMessage("Failed to copy to clipboard!");
      setShowModal(true);
    }
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: "Url link shortened from https://spoo.me/scissors",
        text: "Check out this link!",
        url: shortLink,
      };

      await navigator.share(shareData);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleDownloadQrCode = () => {
    if (qrCodeImage) {
      fetch(qrCodeImage)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, "qr_code.png");
        })
        .catch((error) => {
          console.error("Error downloading QR code:", error);
        });
    }
  };

  return (
    <div className={urlIsOpen ? "overlay" : "overlay hidden"}>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
      <div className="url-details">
        {qrCodeImage && (
          <div className="qrcode-img" title="click to download">
            <img
              src={qrCodeImage}
              alt="qr code for shortened link"
              onClick={handleDownloadQrCode}
            />
            <DownloadSimple
              size={34}
              weight="duotone"
              className="download-icon"
            />
          </div>
        )}
        <div
          className="short-link"
          title="copy to clipboard"
          onClick={handleCopy}
        >
          <p>{shortLink}</p>
          {qrCodeImage && <Copy size={18} weight="bold" />}
        </div>
        <div className="long-link">
          <p>{longLink}</p>
        </div>

        <XCircle
          size={34}
          weight="duotone"
          onClick={closeUrlDetails}
          className="cancel-btn"
        />

        {qrCodeImage && (
          <button className="button share-btn" onClick={handleShare}>
            <ShareNetwork size={20} />
            Share
          </button>
        )}
      </div>
    </div>
  );
};

export default UrlDetails;
