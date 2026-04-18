import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.jpg";
import { useTranslation } from "react-i18next";
import {
  Search as SearchIcon,
  Globe,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";

// ─────────────────────────────────────────────
// FIXED LANGUAGES - 4 only
// ─────────────────────────────────────────────
const FIXED_LANGUAGES = [
  { code: "ar", name: "عربي", id: 1, flag: "https://flagcdn.com/w40/eg.png" },
  { code: "en", name: "English", id: 2, flag: "https://flagcdn.com/w40/gb.png" },
  { code: "fr", name: "Français", id: 3, flag: "https://flagcdn.com/w40/fr.png" },
  { code: "de", name: "Deutsch", id: 4, flag: "https://flagcdn.com/w40/de.png" },
];

// ─────────────────────────────────────────────
// NAV DATA FUNCTION - Returns translated items
// ─────────────────────────────────────────────
const getNavItems = (t: any) => [
  { key: "home", label: t("nav.home"), link: "/" },
  {
    key: "about",
    label: t("nav.about"),
    children: [
      { key: "digital-identity", label: t("nav.about.digitalIdentity"), link: "/" },
      { key: "president-word", label: t("nav.about.presidentWord"), link: "/" },
      { key: "sectors", label: t("nav.about.sectors"), link: "/" },
      { key: "units", label: t("nav.about.units"), link: "/" },
      { key: "departments", label: t("nav.about.departments"), link: "/" },
      { key: "sitemap", label: t("nav.about.sitemap"), link: "/" },
      {
        key: "history",
        label: t("nav.about.history"),
        children: [
          { key: "vision", label: t("nav.about.history.vision"), link: "/" },
          { key: "mission", label: t("nav.about.history.mission"), link: "/" },
          { key: "goals", label: t("nav.about.history.goals"), link: "/" },
          { key: "ranking", label: t("nav.about.history.ranking"), link: "/" },
        ],
      },
    ],
  },
  { key: "programs", label: t("nav.programs"), link: "/programs" },
  {
    key: "students",
    label: t("nav.students"),
    children: [
      { key: "platforms", label: t("nav.students.platforms"), link: "/" },
      { key: "admission", label: t("nav.students.admission"), link: "/" },
      { key: "ethics", label: t("nav.students.ethics"), link: "/" },
      { key: "scholarships", label: t("nav.students.scholarships"), link: "/" },
      { key: "fees", label: t("nav.students.fees"), link: "/" },
      {
        key: "services",
        label: t("nav.students.services"),
        children: [
          { key: "housing", label: t("nav.students.services.housing"), link: "/" },
          { key: "transport", label: t("nav.students.services.transport"), link: "/" },
        ],
      },
    ],
  },
  {
    key: "expatriates",
    label: t("nav.expatriates"),
    children: [
      { key: "apply", label: t("nav.expatriates.apply"), link: "/" },
      { key: "exp-programs", label: t("nav.expatriates.programs"), link: "/" },
      { key: "expenses", label: t("nav.expatriates.expenses"), link: "/" },
      { key: "housing", label: t("nav.expatriates.housing"), link: "/" },
      { key: "residency", label: t("nav.expatriates.residency"), link: "/" },
      { key: "student-life", label: t("nav.expatriates.studentLife"), link: "/" },
    ],
  },
  { key: "staff", label: t("nav.staff"), link: "/team" },
  { key: "systems", label: t("nav.systems"), link: "/systems" },
  {
    key: "news",
    label: t("nav.news"),
    children: [
      { key: "news-list", label: t("nav.news.newsList"), link: "/news" },
      { key: "archive", label: t("nav.news.archive"), link: "/" },
      {
        key: "media",
        label: t("nav.news.media"),
        children: [
          { key: "photos", label: t("nav.news.media.photos"), link: "/" },
          { key: "videos", label: t("nav.news.media.videos"), link: "/" },
          { key: "channel", label: t("nav.news.media.channel"), link: "/" },
        ],
      },
    ],
  },
  { key: "contact", label: t("nav.contact"), link: "/contactUs" },
];

// ─────────────────────────────────────────────
// SUB-DROPDOWN ITEM (Level 2)
// ─────────────────────────────────────────────
const SubDropdownItem = ({ item }: any) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children?.length > 0;
  const ref = useRef<HTMLDivElement | null>(null);
  const subDropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      e.stopPropagation();
      setOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (open && subDropdownRef.current) {
      const subDropdown = subDropdownRef.current;
      const rect = subDropdown.getBoundingClientRect();

      if (rect.left < 0) {
        subDropdown.style.insetInlineStart = "100%";
        subDropdown.style.insetInlineEnd = "auto";
      } else if (rect.right > window.innerWidth) {
        subDropdown.style.insetInlineStart = "auto";
        subDropdown.style.insetInlineEnd = "100%";
      }
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div
      className={`dropdown-item ${hasChildren ? "has-sub" : ""} ${open ? "sub-open" : ""}`}
      ref={ref}
    >
      {hasChildren ? (
        <span className="dropdown-item-label" onClick={handleToggle}>
          <span className="dropdown-item-text">{item.label}</span>
          <ChevronLeft size={12} className="sub-arrow" />
        </span>
      ) : (
        <Link to={item.link} className="dropdown-item-label solo">
          <span className="dropdown-item-text">{item.label}</span>
        </Link>
      )}

      {hasChildren && open && (
        <div className="sub-dropdown" ref={subDropdownRef}>
          {item.children.map((child: any) => (
            <Link key={child.key} to={child.link} className="dropdown-item-label solo">
              <span className="dropdown-item-text">{child.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// NAV ITEM (Level 1)
// ─────────────────────────────────────────────
const NavItem = ({ item, isActive }: any) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children?.length > 0;
  const ref = useRef<HTMLLIElement | null>(null);

  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      e.stopPropagation();
      setOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <li
      className={`nav-item ${isActive ? "active" : ""} ${hasChildren ? "has-dropdown" : ""} ${open ? "dropdown-open" : ""}`}
      ref={ref}
    >
      {hasChildren ? (
        <span className="nav-link" onClick={handleToggle}>
          <span className="nav-link-text">{item.label}</span>
          <ChevronDown size={11} className="nav-arrow" />
        </span>
      ) : (
        <Link to={item.link} className="nav-link">
          <span className="nav-link-text">{item.label}</span>
        </Link>
      )}

      {hasChildren && open && (
        <div className="dropdown-menu">
          {item.children.map((child: any) => (
            <SubDropdownItem key={child.key} item={child} />
          ))}
        </div>
      )}
    </li>
  );
};

// ─────────────────────────────────────────────
// MAIN HEADER
// ─────────────────────────────────────────────
const Header = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const savedLang = JSON.parse(
    localStorage.getItem("lang") || '{"code": "ar", "id": 1}'
  );

  const [menuActive, setMenuActive] = useState(false);
  const [langActive, setLangActive] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement | null>(null);

  const NAV_ITEMS = getNavItems(t);

  const changeAllLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  const changeLanguage = (lang: any) => {
    localStorage.setItem("lang", JSON.stringify(lang));
    changeAllLanguage(lang.code);
    window.location.reload();
  };

  useEffect(() => {
    changeAllLanguage(savedLang.code);
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        searchOpen &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
        setSearchTerm("");
      }

      const target = e.target as HTMLElement;
      if (langActive && !target.closest(".lang-wrapper")) {
        setLangActive(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [searchOpen, langActive]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
    }
  };

  return (
    <header className="nav-container">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Logo" />
      </Link>

      <nav className={`nav-links ${menuActive ? "nav-active" : ""}`}>
        <button
          className="nav-close"
          onClick={() => setMenuActive(false)}
          aria-label="close menu"
        >
          <i className="fa-solid fa-times" />
        </button>

        <ul>
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.key}
              item={item}
              isActive={item.link && location.pathname === item.link}
            />
          ))}
        </ul>
      </nav>

      <div className="nav-icons">
        <div className="lang-wrapper" onClick={() => setLangActive((p) => !p)}>
          <Globe size={20} />
          <span className="lang-code">{savedLang.code.toUpperCase()}</span>
          <ChevronDown
            size={14}
            className={`lang-arrow ${langActive ? "rotated" : ""}`}
          />

          <div className={`lang-dropdown ${langActive ? "open" : ""}`}>
            {FIXED_LANGUAGES.map((lang) => (
              <div
                key={lang.code}
                className={`lang-option ${savedLang.code === lang.code ? "current" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  changeLanguage(lang);
                }}
              >
                <img src={lang.flag} alt={lang.name} width={20} height={20} />
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="search-wrapper" ref={searchRef}>
          <button
            className="icon-btn search-btn"
            onClick={() => setSearchOpen((p) => !p)}
            aria-label="search"
          >
            <SearchIcon size={20} />
          </button>

          {searchOpen && (
            <form onSubmit={handleSearch} className="search-dropdown">
              <input
                type="text"
                className="search-input-pro"
                placeholder={t("search.placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="search-submit-btn"
                aria-label="submit search"
              >
                <SearchIcon size={18} />
              </button>
            </form>
          )}
        </div>

        <button
          className="icon-btn menu-btn"
          onClick={() => setMenuActive(true)}
          aria-label="open menu"
        >
          <i className="fa-solid fa-bars" />
        </button>
      </div>

      {menuActive && <div className="nav-overlay" onClick={() => setMenuActive(false)} />}
    </header>
  );
};

export default Header;