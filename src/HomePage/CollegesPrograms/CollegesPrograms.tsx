import React from "react";
import { useTranslation } from "react-i18next";
import "./CollegesPrograms.css";

const collegesAr = [
  "كلية الهندسة",
  "كلية العلوم",
  "كلية الزراعة",
  "كلية الحقوق",
  "كلية التربية",
  "كلية التجارة",
  "كلية التمريض",
  "كلية الذكاء الاصطناعي",
  "كلية الآداب",
  "كلية الطب",
  "كلية الصيدلة",
  "كلية الطب البيطري",
  "كلية الحاسبات والمعلومات",
  "كلية التربية للطفولة المبكرة",
  "كلية الهندسة الإلكترونية بمنوف",
  "كلية تكنولوجيا العلوم الصحية التطبيقية",
  "كلية الإعلام",
  "كلية التربية النوعية",
  "كلية التربية الرياضية",
];

const collegesEn = [
  "Faculty of Engineering",
  "Faculty of Science",
  "Faculty of Agriculture",
  "Faculty of Law",
  "Faculty of Education",
  "Faculty of Commerce",
  "Faculty of Nursing",
  "Faculty of Artificial Intelligence",
  "Faculty of Arts",
  "Faculty of Medicine",
  "Faculty of Pharmacy",
  "Faculty of Veterinary Medicine",
  "Faculty of Computers and Information",
  "Faculty of Early Childhood Education",
  "Faculty of Electronic Engineering, Menouf",
  "Faculty of Applied Health Sciences Technology",
  "Faculty of Mass Communication",
  "Faculty of Specific Education",
  "Faculty of Physical Education",
];

const CollegesPrograms: React.FC = () => {
  const { i18n } = useTranslation();

  const isArabic = i18n.language?.startsWith("ar");
  const colleges = isArabic ? collegesAr : collegesEn;

  return (
    <section
      className={`cp-section ${isArabic ? "rtl" : "ltr"}`}
      aria-label={isArabic ? "الكليات والبرامج" : "Colleges and Programs"}
    >
      <div className="cp-container">
        <div className="cp-titleWrap">
          <h2 className="cp-title">
            {isArabic ? "الكليات والبرامج" : "Colleges & Programs"}
          </h2>
          <span className="cp-underline" aria-hidden="true" />
        </div>

        <div className="cp-grid">
          {colleges.map((item, index) => (
            <button key={index} type="button" className="cp-item">
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollegesPrograms;