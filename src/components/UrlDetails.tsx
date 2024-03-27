import { saveAs } from "file-saver";
import { useState, useEffect } from "react";
import {
  Copy,
  ShareNetwork,
  XCircle,
  DownloadSimple,
  WhatsappLogo,
  FacebookLogo,
  TwitterLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import Modal from "./Modal";
import "../css/modal.css";

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
  const [shareComponent, setShareComponent] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortLink);
      setModalMessage("Link has been copied to clipboard!");
      setShowModal(true);
    } catch (error) {
      console.error("Failed to copy:", error);
      setModalMessage("Failed to copy to clipboard!");
      setShowModal(true);
    }
  };

  const closeShareComponent = () => {
    setShareComponent(false);
    document.body.classList.remove("auth-open");
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeShareComponent();
      }
    };

    if (shareComponent) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [shareComponent, closeShareComponent]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeShareComponent();
    }
  };

  const handleShare = async () => {
    document.body.classList.add("auth-open");
    try {
      const shareData = {
        title: "Url link shortened from https://spoo.me/scissors",
        text: "Check out this link!",
        url: shortLink,
      };
      // Check if navigator.share is supported
      if (navigator.share) {
        // If supported, use navigator.share
        await navigator.share(shareData);
      } else {
        // If not supported, display a custom modal or fallback option
        setShareComponent(true);
        console.log("navigator.share not supported. Displaying custom modal.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const shareViaWhatsApp = (shortLink: string) => {
    const message = "Check out this link: " + shortLink;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  const shareViaTwitter = (shortLink: string) => {
    const tweetText = "Check out this link: " + shortLink;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterUrl, "_blank");
  };

  // share to twitter DM
  // const shareViaTwitter = (shortLink: string) => {
  //   const tweetText = "Check out this link: " + shortLink;
  //   const twitterUrl = `https://twitter.com/messages/compose?text=${encodeURIComponent(
  //     tweetText
  //   )}`;
  //   window.open(twitterUrl, "_blank");
  // };

  const shareViaFacebook = (shortLink: string) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shortLink
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const shareViaEmail = (shortLink: string) => {
    const subject = "Check out this link";
    const body = `Hey, I found this interesting link: ${shortLink}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
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
          <div
            className="qrcode-img"
            title="click to download"
            onClick={handleDownloadQrCode}
          >
            <img src={qrCodeImage} alt="QR code image for shortened link" />
            <DownloadSimple
              size={34}
              weight="duotone"
              className="download-icon"
            />
            <p>click QR code image to download</p>
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
        {shareComponent && (
          <div className="overlay" onClick={handleOverlayClick}>
            <div className="share-component">
              <p>
                Share API not enabled or unsupported by your browser. Use the
                alternative below{" "}
              </p>
              <div className="share-socials">
                <button onClick={() => shareViaWhatsApp(shortLink)}>
                  <WhatsappLogo size={32} weight="duotone" />
                </button>
                <button onClick={() => shareViaTwitter(shortLink)}>
                  <TwitterLogo size={32} weight="duotone" />
                </button>
                <button onClick={() => shareViaFacebook(shortLink)}>
                  <FacebookLogo size={32} weight="duotone" />
                </button>
                <button onClick={() => shareViaEmail(shortLink)}>
                  <EnvelopeSimple size={32} weight="duotone" />
                </button>
              </div>
              <XCircle
                size={34}
                weight="duotone"
                onClick={closeShareComponent}
                className="cancel-btn"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlDetails;
