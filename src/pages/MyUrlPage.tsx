import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  CaretDoubleDown,
  CaretDoubleUp,
  ChartLine,
  ShareNetwork,
  Copy,
  QrCode,
  Trash,
  WhatsappLogo,
  FacebookLogo,
  TwitterLogo,
  EnvelopeSimple,
  XCircle,
} from "@phosphor-icons/react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import UrlDetails from "../components/UrlDetails";
import Modal from "../components/Modal";
import MagicWandBlue from "../images/magic-wand-blue.svg";
import "./urlpage.css";

gsap.registerPlugin(useGSAP);

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [UrlDetailsIsOpen, setUrlDetailsIsOpen] = useState(false);
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string>("");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const [parent] = useAutoAnimate();
  const container = useRef<HTMLDivElement>(null);

  const pageSize = 10;
  const totalPages = Math.ceil(filteredLinks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredLinks.length);
  const linksPerPage = filteredLinks.slice(startIndex, endIndex);

  const noLink = links.length === 0;
  const hasLink = links.length > 1;
  const noFilteredLinks = filteredLinks.length === 0;
  const urlHasDetails = UrlDetailsIsOpen && selectedLink;

  // Fetch session data(links)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("links")
          .select("*")
          .eq("user_id", session?.user.id)
          .order("created_at", { ascending: isAscending });

        if (error) {
          setError(error.message);
        } else {
          // Save links in a state from newest to oldest
          setLinks(data.reverse() || []);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.id) {
      fetchData();
    }
  }, [session?.user.id, isAscending]);

  // Filter links based on search input
  useEffect(() => {
    const filteredLinks = links.filter(
      (link) =>
        // ensure case sensitive search
        link.short_link.toLowerCase().includes(searchInput.toLowerCase()) ||
        link.long_link.toLowerCase().includes(searchInput.toLowerCase())
    );
    // save to state
    setFilteredLinks(filteredLinks);
    // start input search from page 1
    setCurrentPage(1);
  }, [searchInput, links]);

  // link filtering from input change event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Page Navigation
  // navigate to next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  // navigate to previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // navigate to exact page
  const handleExactPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Toggle link order - Ascending/Descending
  const toggleOrder = () => {
    setIsAscending((prevIsAscending) => !prevIsAscending);
  };

  // Copy shortened link to clipboard
  const handleCopy = async (shortLink: string) => {
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

  // Handle the click of QRCode button to fetch link data, and use shortened link to generate QRCode
  const handleQrCodeClick = async (shortLink: string) => {
    const selectedLink = links.find((link) => link.short_link === shortLink);
    if (selectedLink) {
      setSelectedLink(selectedLink);
      setUrlDetailsIsOpen(true);
      document.body.classList.add("auth-open");
      await generateQrCode(selectedLink.short_link);
    } else {
      console.error("Selected link not found:", shortLink);
    }
  };

  // Generate QRcode
  const generateQrCode = async (url: string) => {
    const baseUrl = import.meta.env.VITE_QRCODE_URL as string;
    const qrCodeUrl = baseUrl + encodeURIComponent(url);
    const qrCodeOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY as string,
        "X-RapidAPI-Host": import.meta.env.VITE_QRCODE_HOST as string,
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

  // Close URL details
  const closeUrlDetails = () => {
    // Initialize data
    setSelectedLink(null);
    generateQrCode("");
    setUrlDetailsIsOpen(false);
    document.body.classList.remove("auth-open");
  };

  // Handle the click of Share button
  const handleShare = async (shortLink: string) => {
    setShareLink(null);
    document.body.classList.add("auth-open");

    try {
      const shareData = {
        title: "Url link shortened from https://spoo.me/scissors",
        text: "Check out this link!",
        url: shortLink,
      };

      // Share using navigator.share(for mobile)
      // Check if navigator.share is supported
      if (navigator.share) {
        // If supported, use navigator.share
        await navigator.share(shareData);
      } else {
        // If not supported, save the shortened link to be used in a custom share modal window
        setShareLink(shortLink);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Close custom share modal window
  const closeShareComponent = () => {
    setShareLink(null);
    document.body.classList.remove("auth-open");
  };

  // Close custom share modal window using "ESC" button on keyboard
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeShareComponent();
      }
    };

    if (shareLink !== null) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [shareLink, closeShareComponent]);

  // Close custom modal windows(share & delete) by overlay clicks
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeShareComponent();
      setShowDeleteModal(false);
    }
  };

  //Custom Share Buttons/Methods
  // Whatsapp
  const shareViaWhatsApp = (shortLink: string) => {
    const message = "Check out this link: " + shortLink;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };
  // Twitter / X
  const shareViaTwitter = (shortLink: string) => {
    const tweetText = "Check out this link: " + shortLink;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterUrl, "_blank");
  };
  // Facebook
  const shareViaFacebook = (shortLink: string) => {
    try {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shortLink
      )}`;
      window.open(facebookUrl, "_blank");
    } catch (error) {
      console.error("Error sharing via Facebook:", error);
    }
  };
  // E-mail
  const shareViaEmail = (shortLink: string) => {
    const subject = "Check out this link";
    const body = `Hey, I found this interesting link: ${shortLink}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
  };

  // Handle the click of Stat button
  const handleStatClick = async (shortLink: string) => {
    try {
      const shortcode = shortLink.split("/").pop();

      const analyticsUrl = `https://spoo-me-url-shortener.p.rapidapi.com/stats/${shortcode}`;
      const analyticsOptions = {
        method: "POST",
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY as string,
          "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST as string,
        },
      };
      const analyticsResponse = await fetch(analyticsUrl, analyticsOptions);
      const analyticsResult = await analyticsResponse.json();
      setAnalyticsData(analyticsResult);
      // Perform navigation to links AnalyticsPage if it exist/data
      {
        !analyticsData &&
          navigate(`/analytics/${shortcode}`, {
            state: {
              analyticsData: analyticsResult,
            },
          });
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  // Handle click of Delete button/icon
  const openDeleteModal = (link: Link) => {
    setSelectedLink(link);
    setShowDeleteModal(true);
  };

  // Handle the click of delete button(confirm)
  const handleDeleteLink = async () => {
    if (!selectedLink) return;

    // Delete from database
    try {
      const { data, error } = await supabase
        .from("links")
        .delete()
        .eq("id", selectedLink.id);
      if (error) {
        throw error;
      }
      // Display remaining links, alert user, and close delete modal window
      setLinks((prevLinks) =>
        prevLinks.filter((link) => link.id !== selectedLink.id)
      );
      setModalMessage("Link has been deleted");
      setShowModal(true);
      setShowDeleteModal(false);
      console.log("Link deleted successfully:", data);
    } catch (error) {
      console.error("Error deleting link:", (error as Error).message);
      setModalMessage("Error deleting link");
      setShowModal(true);
    }
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

  return (
    <section id="url" className="url-page" ref={parent}>
      {urlHasDetails && (
        <UrlDetails
          UrlDetailsIsOpen={true}
          closeUrlDetails={closeUrlDetails}
          shortLink={selectedLink.short_link}
          longLink={selectedLink.long_link}
          qrCodeImage={qrCodeImageUrl}
        />
      )}
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
      <div ref={container}>
        {session && (
          <div>
            <p className="user">
              Signed in as:&nbsp;<em>{session?.user?.email}</em>
            </p>
            {/* if no links, display */}
            {noLink && (
              <div className="no-link">No links found for this user.</div>
            )}

            {/* if more than 1 link, */}
            {hasLink && (
              <div className="filter-btns">
                {/* and search input */}
                <input
                  className="search-input"
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                  placeholder="Search links..."
                />
                {/* display toggle order button */}
                {!noFilteredLinks && (
                  <a
                    className="sort-btn white-btn"
                    onClick={toggleOrder}
                    ref={parent}
                  >
                    {isAscending ? "Newest to Oldest" : "Oldest to Newest"}
                    {isAscending ? (
                      <CaretDoubleDown size={16} weight="duotone" />
                    ) : (
                      <CaretDoubleUp size={16} weight="duotone" />
                    )}
                  </a>
                )}
              </div>
            )}
          </div>
        )}
        <div className="main-box" ref={parent}>
          {/* Render links for the current page */}
          {linksPerPage.map((link) => (
            <div className="url-container" key={link.id}>
              <div className="links">
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
                <div className="url-btns" ref={parent}>
                  <button
                    className="white-btn"
                    title="share"
                    onClick={() => handleShare(link.short_link)}
                  >
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
                  onClick={() => openDeleteModal(link)}
                >
                  <Trash size={28} weight="duotone" />
                </button>

                {/* Custom share modal window */}
                {shareLink === link.short_link && (
                  <div className="overlay" onClick={handleOverlayClick}>
                    <div className="share-component">
                      <p>Share to your socials and contacts.</p>
                      <div className="share-socials">
                        <button
                          onClick={() => shareViaWhatsApp(link.short_link)}
                        >
                          <WhatsappLogo size={32} weight="duotone" />
                        </button>
                        <button
                          onClick={() => shareViaTwitter(link.short_link)}
                        >
                          <TwitterLogo size={32} weight="duotone" />
                        </button>
                        <button
                          onClick={() => shareViaFacebook(link.short_link)}
                        >
                          <FacebookLogo size={32} weight="duotone" />
                        </button>
                        <button onClick={() => shareViaEmail(link.short_link)}>
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

                {/* Custom delete modal window */}
                {showDeleteModal && (
                  <div className="overlay" onClick={handleOverlayClick}>
                    <div className="share-component delete">
                      <p>
                        Confirm to delete <em>"{selectedLink?.short_link}"</em>?
                      </p>
                      <ul className="share-socials">
                        <li>
                          <a
                            className="button confirm-btn"
                            onClick={handleDeleteLink}
                          >
                            Confirm
                          </a>
                        </li>
                        <li>
                          <a
                            className=" button discard-btn"
                            onClick={() => setShowDeleteModal(false)}
                          >
                            Discard
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="url-nav">
          {noFilteredLinks ? (
            <div>No search result found...</div>
          ) : (
            <div className="pagination">
              {/* Pagination controls */}
              {totalPages > 1 ? (
                <div className="pagination-ctrls">
                  <button
                    className="white-btn"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    title={
                      currentPage === 1
                        ? "This is the first page"
                        : "Go back to previous page"
                    }
                  >
                    Previous
                  </button>

                  <div className="dots">
                    {[...Array(totalPages).keys()].map((pageNumber) => (
                      <div
                        key={pageNumber}
                        onClick={() => handleExactPage(pageNumber + 1)}
                        className={
                          currentPage === pageNumber + 1
                            ? "page-active page"
                            : "page"
                        }
                      />
                    ))}
                  </div>
                  <button
                    className="white-btn "
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    title={
                      currentPage < totalPages
                        ? "This is the last page"
                        : "Go to next page"
                    }
                  >
                    Next
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              <span>
                Page: {currentPage} / {totalPages}
              </span>
            </div>
          )}

          <a className="sort-btn white-btn " href="../#trim-url">
            Go to trim URL
            <img
              className="magic-wand"
              src={MagicWandBlue}
              alt="arrow down icon"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MyUrlPage;
