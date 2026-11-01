/* Bilingual portfolio: human-written Arabic translations and English originals.
   No translation service or external API is required. */
"use strict";

const arabicTranslations = {
  "HELLO, I’M": "مرحبًا، أنا",
  "Sara": "سارة",
  "Programming & Web Development": "البرمجة وتطوير الويب",
  "Data Engineering Track": "مسار هندسة البيانات",
  "I build practical projects using Python, SQL, data technologies and web development tools, with a growing focus on Data Engineering.": "أطوّر مشاريع عملية باستخدام Python وSQL وتقنيات البيانات وأدوات تطوير الويب، مع تركيز متزايد على هندسة البيانات.",
  "View Projects": "استعرض المشاريع",
  "Contact Me": "تواصل معي",
  "SKILLS": "المهارات",
  "What I Work With": "التقنيات التي أعمل بها",
  "Data Engineering": "هندسة البيانات",
  "Database Management": "إدارة قواعد البيانات",
  "Git & GitHub": "Git وGitHub",
  "Flask & SQLite": "Flask وSQLite",
  "HTML, CSS & JavaScript": "HTML وCSS وJavaScript",
  "PROJECTS": "المشاريع",
  "Selected Work": "أبرز أعمالي",
  "WEB APPLICATION · LIVE DEMO": "تطبيق ويب · نسخة تجريبية مباشرة",
  "Hospital Visit Management System": "نظام إدارة زيارات المستشفيات",
  "A Flask and SQLite application for tracking hospital service visits, documenting issues, managing access by role and exporting records. The source code is private; a demo is available with fictional data.": "تطبيق مبني باستخدام Flask وSQLite لتوثيق زيارات المستشفيات ومتابعة المشكلات وإدارة الصلاحيات حسب الدور وتصدير السجلات. الكود المصدري خاص، وتتوفر نسخة تجريبية ببيانات وهمية.",
  "Try Live Demo": "جرّب النسخة التجريبية",
  "Demo Login & Details": "بيانات دخول التجربة والتفاصيل",
  "FRONT-END GAME · LIVE": "لعبة ويب · متاحة الآن",
  "Blind Talk — Conversation Game": "Blind Talk — لعبة حوار",
  "An Arabic, two-player browser game with random conversation topics, helpful questions, private round ratings and a final shareable summary. Responsive on mobile and desktop.": "لعبة حوار عربية لشخصين تعمل عبر المتصفح، تضم مواضيع عشوائية وأسئلة مساعدة وتقييمات سرية لكل جولة، مع ملخص نهائي قابل للمشاركة. متوافقة مع الجوال والكمبيوتر.",
  "Play Blind Talk": "العب Blind Talk",
  "View Source": "عرض الكود",
  "DATA ANALYSIS · PYTHON": "تحليل بيانات · Python",
  "COVID-19 Web Scraping": "استخراج بيانات كوفيد-19 من الويب",
  "A Python project that extracts and organizes publicly available COVID-19 statistics using Requests, BeautifulSoup and Pandas.": "مشروع Python لاستخراج إحصاءات كوفيد-19 المتاحة للعامة وتنظيمها باستخدام Requests وBeautifulSoup وPandas.",
  "View Project": "عرض المشروع",
  "POWER BI · SALES ANALYSIS": "Power BI · تحليل المبيعات",
  "E-commerce Sales Analysis": "تحليل مبيعات التجارة الإلكترونية",
  "An e-commerce sales dashboard project with downloadable project materials and a PDF report documenting the analysis.": "مشروع لوحة معلومات لتحليل مبيعات التجارة الإلكترونية، يتضمن ملفات المشروع القابلة للتحميل وتقرير PDF يوثّق التحليل.",
  "Oil & Gas Data Engineering": "هندسة بيانات النفط والغاز",
  "A data engineering project built using Python, SQL and Microsoft Fabric, including data transformation, validation and structured processing.": "مشروع لهندسة البيانات باستخدام Python وSQL وMicrosoft Fabric، يشمل تحويل البيانات والتحقق من جودتها ومعالجتها بصورة منظمة.",
  "HR Analytics Dashboard": "لوحة تحليل الموارد البشرية",
  "A Power BI analytics project focused on workforce data, attendance, salaries, recruitment and employee attrition.": "مشروع تحليلي باستخدام Power BI يركّز على بيانات الموظفين والحضور والرواتب والتوظيف ومعدل ترك العمل.",
  "Sales Performance Dashboard": "لوحة تحليل أداء المبيعات",
  "A data cleaning and analysis project covering revenue, profit, discounts and average order value.": "مشروع لتنظيف البيانات وتحليل الإيرادات والأرباح والخصومات ومتوسط قيمة الطلبات.",
  "Your Step is Energy": "خطوتك طاقة",
  "An innovative smart energy project that converts footsteps into electrical energy for small practical uses.": "مشروع مبتكر للطاقة الذكية يحوّل خطوات المشي إلى طاقة كهربائية لاستخدامات عملية صغيرة.",
  "CERTIFICATIONS": "الشهادات",
  "Professional Certifications": "الشهادات المهنية",
  "Professional Data Engineering Bootcamp": "المعسكر الاحترافي لهندسة البيانات",
  "Intensive hands-on Data Engineering program covering Python, SQL, NoSQL, Spark, Kafka, Airflow, Microsoft Fabric, Azure, data pipelines and data warehousing.": "برنامج عملي مكثف في هندسة البيانات يشمل Python وSQL وNoSQL وSpark وKafka وAirflow وMicrosoft Fabric وAzure وخطوط معالجة البيانات ومستودعات البيانات.",
  "View Certificate": "عرض الشهادة",
  "Professional Diploma – Data Analysis": "الدبلوم المهني في تحليل البيانات",
  "36-hour professional diploma in Data Analysis using Excel and Power BI.": "دبلوم مهني لمدة 36 ساعة في تحليل البيانات باستخدام Excel وPower BI.",
  "RECOMMENDATION": "خطاب التوصية",
  "Professional Recommendation": "التوصية المهنية",
  "Data Engineering Recommendation Letter": "خطاب توصية في هندسة البيانات",
  "Professional recommendation issued after completing the Data Engineering Bootcamp, recognizing technical proficiency, practical skills and the ability to build reliable data workflows.": "خطاب توصية مهني صدر بعد إتمام معسكر هندسة البيانات، ويُبرز الكفاءة التقنية والمهارات العملية والقدرة على بناء مسارات موثوقة لمعالجة البيانات.",
  "View Recommendation": "عرض خطاب التوصية",
  "ACHIEVEMENT": "الإنجازات",
  "Recognition": "التكريم والإنجاز",
  "1st Place — APEX Exhibition": "المركز الأول — معرض APEX",
  "Awarded first place at the college level for \"Your Step is Energy\", an innovative project focused on converting footsteps into usable electrical energy.": "الحصول على المركز الأول على مستوى الكلية عن مشروع «خطوتك طاقة»، الذي يركز على تحويل خطوات المشي إلى طاقة كهربائية قابلة للاستخدام.",
  "CONTACT": "التواصل",
  "Let’s Connect": "لنتواصل",
  "Interested in my work, projects or professional opportunities? You can reach me through the links below.": "هل ترغب في معرفة المزيد عن أعمالي ومشاريعي أو التواصل بشأن فرصة مهنية؟ يسعدني تواصلك عبر الروابط التالية.",
  "Download CV": "تحميل السيرة الذاتية",
  "Email": "البريد الإلكتروني"
};

const languageButtons = Array.from(document.querySelectorAll("[data-language]"));
const translatableNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

while (walker.nextNode()) {
    const node = walker.currentNode;
    const original = node.nodeValue;
    const key = original.replace(/\s+/g, " ").trim();
    if (Object.prototype.hasOwnProperty.call(arabicTranslations, key)) {
        translatableNodes.push({
            node,
            original,
            translation: arabicTranslations[key],
            leading: (original.match(/^\s*/) || [""])[0],
            trailing: (original.match(/\s*$/) || [""])[0]
        });
    }
}

function setPortfolioLanguage(lang) {
    const selected = lang === "ar" ? "ar" : "en";
    document.documentElement.lang = selected;
    document.documentElement.dir = selected === "ar" ? "rtl" : "ltr";
    document.title = selected === "ar" ? "سارة | ملف الأعمال" : "Sara | Portfolio";

    for (const item of translatableNodes) {
        item.node.nodeValue = selected === "ar"
            ? item.leading + item.translation + item.trailing
            : item.original;
    }

    for (const button of languageButtons) {
        const active = button.dataset.language === selected;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
    }

    try {
        window.localStorage.setItem("sara-portfolio-language", selected);
    } catch (error) {
        // Language switching still works when storage is disabled.
    }
}

for (const button of languageButtons) {
    button.addEventListener("click", () => setPortfolioLanguage(button.dataset.language));
}

let initialLanguage = "en";
try {
    const saved = window.localStorage.getItem("sara-portfolio-language");
    if (saved === "en" || saved === "ar") initialLanguage = saved;
} catch (error) {
    // Use English as the default if storage is unavailable.
}
setPortfolioLanguage(initialLanguage);


/* The public PDF must be present before the download link becomes visible.
   Prevents a broken link while a user uploads the PDF via GitHub. */
const cvDownloadButton = document.getElementById("cv-download");
if (cvDownloadButton) {
    fetch("Sara_CV.pdf", { method: "HEAD", cache: "no-store" })
        .then((response) => {
            if (response.ok && (response.headers.get("content-type") || "").toLowerCase().includes("pdf")) {
                cvDownloadButton.hidden = false;
            }
        })
        .catch(() => {
            // Stay hidden rather than show a link to a missing document.
        });
}
