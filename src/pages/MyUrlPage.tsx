import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChartLine,
  ShareNetwork,
  Copy,
  QrCode,
  Trash,
} from "@phosphor-icons/react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import UrlDetails from "../components/UrlDetails";
import Modal from "../components/Modal";
import "./urlpage.css";

interface Link {
  id: number;
  short_link: string;
  long_link: string;
}

interface AnalyticsData {
  [key: string]: any;
  browser: Record<string, number>;
  country: Record<string, number>;
}

interface UrlPageProps {
  session: Session | null;
}

const MyUrlPage: React.FC<UrlPageProps> = ({ session }) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string>("");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("links")
          .select("*")
          .eq("user_id", session?.user.id);

        if (error) {
          setError(error.message);
          console.error("Error fetching data:", error.message);
        } else {
          setLinks(data || []);
          console.log("Data retrieved successfully!", data);
        }
      } catch (error) {
        setError((error as Error).message);
        console.error("Error fetching data:", (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.id) {
      fetchData();
    }
  }, [session?.user.id]);

  // generate QRcode
  const generateQrCode = async (url: string) => {
    const baseUrl = "https://easy-qr-code.p.rapidapi.com/generate?content=";
    const qrCodeUrl = baseUrl + encodeURIComponent(url);
    const qrCodeOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "9bdbb17e96msha66477146363d67p17b8f4jsne2b47f46bca8",
        "X-RapidAPI-Host": "easy-qr-code.p.rapidapi.com",
      },
    };

    try {
      const qrCodeResponse = await fetch(qrCodeUrl, qrCodeOptions);
      const qrCodeImageBlob = await qrCodeResponse.blob();
      const qrCodeImageUrl = URL.createObjectURL(qrCodeImageBlob);
      setQrCodeImageUrl(qrCodeImageUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleQrCodeClick = async (shortLink: string) => {
    const selectedLink = links.find((link) => link.short_link === shortLink);
    if (selectedLink) {
      setSelectedLink(selectedLink);
      await generateQrCode(selectedLink.short_link);
    } else {
      console.error("Selected link not found:", shortLink);
    }
  };

  const handleDeleteLink = async (linkId: number) => {
    try {
      const { data, error } = await supabase
        .from("links")
        .delete()
        .eq("id", linkId);

      if (error) {
        throw error;
      }

      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));

      console.log("Link deleted successfully:", data);
    } catch (error) {
      console.error("Error deleting link:", (error as Error).message);
    }
  };

  const handleCopy = async (shortLink: string) => {
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

  const handleStatClick = async (shortLink: string) => {
    try {
      const shortcode = shortLink.split("/").pop();

      const analyticsUrl = `https://spoo-me-url-shortener.p.rapidapi.com/stats/${shortcode}`;
      const analyticsOptions = {
        method: "POST",
        headers: {
          "X-RapidAPI-Key":
            "9bdbb17e96msha66477146363d67p17b8f4jsne2b47f46bca8",
          "X-RapidAPI-Host": "spoo-me-url-shortener.p.rapidapi.com",
        },
      };
      const analyticsResponse = await fetch(analyticsUrl, analyticsOptions);
      const analyticsResult = await analyticsResponse.json();
      setAnalyticsData(analyticsResult);
      navigate(`/analytics/${shortcode}`, {
        state: {
          analyticsData: analyticsResult,
        },
      });

      console.log("Analytics data:", analyticsData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  const closeUrlDetails = () => {
    setSelectedLink(null);
    generateQrCode("");
  };

  if (!session) {
    return (
      <p className="loading">Kindly login to view your shortened url history</p>
    );
  }

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <div className="loading">Error: {error}</div>;
  }

  if (links.length === 0) {
    return <div className="loading">No links found for this user.</div>;
  }

  return (
    <section className="url-page" id="url">
      {selectedLink && (
        <UrlDetails
          urlIsOpen={true}
          closeUrlDetails={closeUrlDetails}
          shortLink={selectedLink.short_link}
          longLink={selectedLink.long_link}
          qrCodeImage={qrCodeImageUrl}
        />
      )}
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
      <div>
        {session && (
          <p className="user">
            Signed in as:&nbsp;<em>{session?.user?.email}</em>
          </p>
        )}
        <div className="main-box">
          {links.map((link) => (
            <div className="url-container" key={link.id}>
              <div>
                <div
                  className="short-link"
                  title="copy to clipboard"
                  onClick={() => handleCopy(link.short_link)}
                >
                  <p className="short-link">{link.short_link}</p>
                  <Copy size={18} weight="bold" />
                </div>
                <div className="long-link">
                  <p>{link.long_link}</p>
                </div>
                <div className="url-btns">
                  <button className="white-btn" title="share">
                    <ShareNetwork size={18} />
                    Share
                  </button>
                  <button
                    className="white-btn"
                    onClick={() => handleQrCodeClick(link.short_link)}
                    title="view QR code"
                  >
                    <QrCode size={18} />
                    QRCode
                  </button>
                  <button
                    title="view stats"
                    onClick={() => handleStatClick(link.short_link)}
                  >
                    <ChartLine size={18} />
                    Stats
                  </button>
                </div>
                <button
                  className="delete-btn"
                  onDoubleClick={() => handleDeleteLink(link.id)}
                  title="double click to delete"
                >
                  <Trash size={28} weight="duotone" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyUrlPage;
