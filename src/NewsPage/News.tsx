import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { useAuth } from "../hooks/useAuth";
import api from "../Services/api";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import "./News.css";

const ITEMS_PER_PAGE = 10;

const SmartImage = ({ src, alt = "", className = "", style = {} }) => {
  const [imageSrc, setImageSrc] = useState("/src/assets/raes.jpg");

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setImageSrc(src);
  }, [src]);

  return <img src={imageSrc} alt={alt} className={className} style={style} />;
};

interface NewsItem {
  id: number;
  newsImg: string;
  newsDetails: {
    head: string;
    abbr: string;
  };
  date: string;
  [key: string]: any;
}

function News() {
  const savedLang = JSON.parse(localStorage.getItem("lang") || "{}");
  const { t } = useTranslation("News");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [langId, setLangId] = useState(savedLang?.id || 2);
  const [totalPages, setTotalPages] = useState(0);
  const [moveNext, setMoveNext] = useState(false);
  const [movePrevious, setMovePrevious] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    newsId: null as number | null,
    newsTitle: "",
    isLoading: false,
  });

  const isArabic = savedLang?.code === "ar";

  const formatDate = (rawDate: string) => {
    const date = new Date(rawDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(isArabic ? "ar-EG" : "en-US", options);
  };

  const fetchNews = (page = 1, term = "") => {
    const query = `news?LanguageId=${langId}&PageIndex=${page}&PageSize=${ITEMS_PER_PAGE}${
      term ? `&Search=${term}` : ""
    }`;
    setIsLoading(true);

    api
      .get(query)
      .then((response) => {
        setFilteredNews(response.data.result);
        setTotalPages(response.data.totalPages);
        setMoveNext(response.data.moveNext);
        setMovePrevious(response.data.movePrevious);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchNews(currentPage, searchTerm);
  }, [langId, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchNews(1, searchTerm);
  };

  const handleDeleteClick = (e: React.MouseEvent, news: NewsItem) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteModal({
      isOpen: true,
      newsId: news.id,
      newsTitle: news.newsDetails.head,
      isLoading: false,
    });
  };

  const handleEditClick = (e: React.MouseEvent, news: NewsItem) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`/news/edit/${news.id}`, "_blank");
  };

  const handleDeleteConfirm = async () => {
    setDeleteModal((prev) => ({ ...prev, isLoading: true }));

    try {
      const token = localStorage.getItem("token");
      await api.get(`news/delete/${deleteModal.newsId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
      });

      setDeleteModal({
        isOpen: false,
        newsId: null,
        newsTitle: "",
        isLoading: false,
      });

      if (filteredNews.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        setTimeout(() => {
          fetchNews(currentPage, searchTerm);
        }, 100);
      }

      toast.success(t("delete.messages.success"), {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting news:", error);
      setDeleteModal((prev) => ({ ...prev, isLoading: false }));
      toast.error(t("delete.messages.error"), {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({
      isOpen: false,
      newsId: null,
      newsTitle: "",
      isLoading: false,
    });
  };

  const handleNextPage = () => {
    if (moveNext) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (movePrevious) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="news-page-wrapper">


      {/* Main Content - Figma Design */}
      <section className="news-main-content" dir="rtl">
        <div className="news-content-wrapper">
          {/* Title Area */}
          <div className="news-title-area">
            <h2 className="news-page-title">أخبار جامعة المنوفية</h2>
            <div className="news-title-underline"></div>
          </div>

          {/* Cards Grid */}
          {filteredNews.length === 0 ? (
            <div className="news-no-results">
              <h2>{t("details.noResultsFound")}</h2>
            </div>
          ) : (
            <div className="news-cards-grid">
              {filteredNews.map((news) => (
                <article key={news.id} className="news-card">
                  <Link
                    to={`/details/${news.id}`}
                    state={{ news }}
                    className="news-card-link"
                  >
                    {/* Image - Right Side (RTL) */}
                    <div className="news-card-image">
                      <SmartImage
                        src={news?.newsImg}
                        alt={news.newsDetails.head}
                      />
                    </div>

                    {/* Text Content - Middle */}
                    <div className="news-card-content">
                      <h4 className="news-card-title">
                        {news.newsDetails.head.slice(0, 100)}
                        {news.newsDetails.head.length > 100 ? "..." : ""}
                      </h4>
                      <p className="news-card-description">
                        {news.newsDetails.abbr.slice(0, 150)}
                        {news.newsDetails.abbr.length > 150 ? "..." : ""}
                      </p>
                      <span className="news-card-date">
                        {formatDate(news.date)}
                      </span>
                    </div>

                    {/* Arrow Button - Left Side */}
                    <div className="news-card-arrow">
                      <i className="fa-solid fa-arrow-up"></i>
                    </div>

                    {/* Admin Actions */}
                    {isLoggedIn && (
                      <div className="news-admin-actions">
                        <button
                          className="news-admin-btn news-edit-btn"
                          onClick={(e) => handleEditClick(e, news)}
                          data-tip="Edit news"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="news-admin-btn news-delete-btn"
                          onClick={(e) => handleDeleteClick(e, news)}
                          data-tip="Delete news"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {filteredNews.length > 0 && (
            <div className="news-pagination">
              <button
                className="news-pagination-arrow"
                onClick={handlePreviousPage}
                disabled={!movePrevious || isLoading}
                aria-label="Previous page"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
              <button
                className="news-pagination-arrow"
                onClick={handleNextPage}
                disabled={!moveNext || isLoading}
                aria-label="Next page"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            </div>
          )}
        </div>
      </section>

      <ReactTooltip
        place="top"
        className="custom-tooltip"
        type="dark"
        effect="solid"
      />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        newsTitle={deleteModal.newsTitle}
        isLoading={deleteModal.isLoading}
      />
    </div>
  );
}

export default News;