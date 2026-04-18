import "./Hero.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import defaultImg from "../../assets/raes.jpg";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

// ✅ SmartImage component
const SmartImage = ({ src, alt = "", className, style, clipPath }) => {
  const [imageSrc, setImageSrc] = useState(defaultImg);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
    };
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={{ ...style, clipPath }}
    />
  );
};

function Hero(props) {
  const isFeaturedimages = useMemo(() => {
    return (
      props.News.some((news) => news.isFeatured)
        ? props.News.filter((news) => news.isFeatured)
        : props.News
    ).flatMap((news) => {
      const head = news.newsDetails?.head || "";
      const id = news.id;

      if (news.newsImg) {
        return [
          {
            url: news.newsImg,
            head: head,
            id: id,
          },
        ];
      } else {
        return [];
      }
    });
  }, [props.News]);

  const ARstyle = {
    direction: "rtl",
    fontFamily: "var(--MNF_Heading_AR)",
  };

  const ENstyle = {
    direction: "ltr",
    fontFamily: "var(--MNF_Heading_EN)",
  };

  const savedLang = JSON.parse(localStorage.getItem("lang") || "{}");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useTranslation();

  const startAutoSlide = useCallback(() => {
    return setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % isFeaturedimages.length);
    }, 3500);
  }, [isFeaturedimages.length]);

  useEffect(() => {
    if (!isPaused && isFeaturedimages.length > 0) {
      const interval = startAutoSlide();
      return () => clearInterval(interval);
    }
  }, [isPaused, startAutoSlide, isFeaturedimages.length]);

  if (!isFeaturedimages || isFeaturedimages.length === 0) {
    return null;
  }

  return (
    <div className="hero-carousel-wrapper">
      <div className="hero-carousel-main">
        <div
          className="hero-carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {isFeaturedimages?.map((item, index) => (
            <div key={index} className="hero-carousel-slide">
              <SmartImage
                src={item.url}
                alt={`University slide ${index + 1}`}
                className="hero-carousel-image"
                style={{}}
                clipPath=""
              />

              <div className="hero-carousel-overlay" />

              <section
                className="hero-content-card"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                style={savedLang?.code === "ar" ? ARstyle : ENstyle}
              >
                <h1 className="hero-main-heading">
                  {item?.head?.slice(0, 150) ?? item?.head}
                </h1>
                <div className="hero-arrow-wrapper">
                  <Link
                    to={`/details/${item.id}`}
                    className="hero-arrow-link"
                    data-tip={t("tooltip.details")}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#1f1f1f"
                    >
                      <path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z" />
                    </svg>
                  </Link>
                  <ReactTooltip
                    place="top"
                    className="hero-custom-tooltip"
                    type="dark"
                    effect="solid"
                  />
                </div>
              </section>
            </div>
          ))}
        </div>

        <div className="hero-pagination-dots">
          {isFeaturedimages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`hero-pagination-dot ${
                currentIndex === index ? "hero-pagination-dot-active" : ""
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
