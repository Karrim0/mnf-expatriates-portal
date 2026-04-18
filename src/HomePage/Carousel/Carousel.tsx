import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";
import { useTranslation } from "react-i18next";
import defaultImg from "../../assets/raes.jpg";
import ReactTooltip from "react-tooltip";

// ✅ SmartImage – بتحط default لو الصورة فشلت
const SmartImage = ({ src, alt = "", className, style }) => {
  const [imageSrc, setImageSrc] = useState(defaultImg);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setImageSrc(src);
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={style}
    />
  );
};

export default function NewsCarousel(props) {
  const { t } = useTranslation();
  const savedLang = JSON.parse(localStorage.getItem("lang") || "{}");

  const ArStyle = { fontFamily: "var(--MNF_Body_AR)" };
  const EnStyle = { fontFamily: "var(--MNF_Body_EN)" };

  const isAr = savedLang?.code === "ar";

  // ✅ Force ReactTooltip to rebuild after component mounts
  useEffect(() => {
    if (typeof ReactTooltip !== 'undefined' && ReactTooltip.rebuild) {
      ReactTooltip.rebuild();
    }
  }, [props.News]);

  return (
    <div className="home-news-carousel">
      {/* SVG clip-path مخفي – مشترك بين كل الكروت */}
      <svg
        className="carousel-clip-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="carousel-img-clip" clipPathUnits="userSpaceOnUse">
            <path
              d="M3.99997 20C3.99997 8.95433 12.9543 0 24 0H170C181.046 0 190 8.95431 190 20V187.088C190 201.067 176.026 210.733 162.946 205.803L16.9462 150.774C9.15647 147.838 3.99997 140.384 3.99997 132.059V20Z"
              className="svg-path"
            />
          </clipPath>
        </defs>
      </svg>

      <div className="home-news-carousel-wrapper">
        <div className="home-news-grid">
          {props.News?.slice(0, 9).map((news, index) => {
            return (
              <div key={index} className="carousel-item">
                <div className="carousel-item-box">
                  <div className="carousel-item-layout">

                    {/* ── النص على اليمين ── */}
                    <div
                      className="carousel-text-section"
                      style={isAr ? ArStyle : EnStyle}
                    >
                      <h3 className="carousel-heading">
                        {news.newsDetails.head.length > 75
                          ? news.newsDetails.head.slice(0, 75) + "..."
                          : news.newsDetails.head}
                      </h3>
                    </div>

                    {/* ── الصورة + الزرار تحتها على الشمال ── */}
                    <div className="carousel-image-section">
                      <div className="carousel-image-wrapper">
                        <SmartImage
                          src={news.newsImg}
                          alt={news.newsDetails.head || "news"}
                          className="carousel-clipped-image"
                        />
                      </div>

                      {/* الزرار تحت الصورة */}
                      <Link
                        to={`/details/${news.id}`}
                        className="carousel-arrow-btn"
                        data-tip={t("tooltip.details")}
                        onClick={() => window.scrollTo(0, 0)}
                        aria-label={t("tooltip.details")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                        >
                          <path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z" />
                        </svg>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* زر المزيد */}
      <div className="carousel-more-btn-wrapper">
        <a href="/news" className="carousel-more-link">
          {t("header.More News")}
        </a>
      </div>

      <ReactTooltip
        place="top"
        type="dark"
        effect="solid"
      />
    </div>
  );
}