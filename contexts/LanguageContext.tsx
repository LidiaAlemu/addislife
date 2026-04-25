"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export type Language = "en" | "am" | "om";

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ" },
  { code: "om", name: "Oromo", nativeName: "Afaan Oromoo" },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    // App
    "app.name": "AddisLife",
    "app.tagline": "Your Addis City Action Engine",

    // Navigation
    "nav.home": "Home",
    "nav.explore": "Explore",
    "nav.tasks": "Tasks",
    "nav.profile": "Profile",

    // Greetings
    "greeting.morning": "Good Morning",
    "greeting.afternoon": "Good Afternoon",
    "greeting.evening": "Good Evening",

    // Home Screen
    "home.subtitle": "How can AddisLife help today?",
    "home.nearbyEssentials": "Nearby Essentials",
    "home.trendingInAddis": "Trending in Addis",
    "home.dailyUtility": "Daily Utility",

    // Quick Actions
    "quick.atm": "ATM",
    "quick.pharmacy": "Pharmacy",
    "quick.taxi": "Taxi Stand",

    // Trending
    "trending.workCafes": "Best Work Cafes",
    "trending.safeRoutes": "Women Safe Routes",
    "trending.events": "Weekend Events",

    // Utility
    "utility.sunny": "Sunny",
    "utility.moderate": "Moderate",
    "utility.traffic": "Traffic",
    "utility.stable": "Stable",
    "utility.power": "Power",

    // Featured Card
    "featured.backup": "Backup Generator",
    "featured.openUntil": "Open until",
    "featured.whyRecommended": "Why recommended for you",
    "featured.aiMatch": "AI Match",
    "featured.reserve": "Reserve",
    "featured.map": "Map",

    // Chat
    "chat.placeholder": "Ask AddisLife anything...",
    "chat.send": "Send",
    "chat.thinking": "Thinking...",
    "chat.welcome": "Hello! I'm your AddisLife assistant. How can I help you today?",

    // Tasks
    "tasks.title": "Your Tasks",
    "tasks.subtitle": "Monitor your active requests",
    "tasks.empty": "No active tasks",
    "tasks.emptyDesc": "Your monitoring tasks will appear here",
    "tasks.status.waiting": "Waiting",
    "tasks.status.progress": "Running",
    "tasks.status.completed": "Completed",
    "tasks.status.failed": "Failed",
    "tasks.cancel": "Cancel",
    "tasks.edit": "Edit Alert",
    "tasks.checked": "Checked",
    "tasks.ago": "ago",

    // Settings
    "settings.title": "Profile",
    "settings.language": "Language",
    "settings.language.desc": "Choose your preferred language",
    "settings.notifications": "Notifications",
    "settings.notifications.desc": "Manage notification preferences",
    "settings.locations": "Saved Locations",
    "settings.locations.desc": "Home, work, favorites",
    "settings.about": "About AddisLife",
    "settings.version": "Version 1.0.0",
    "settings.privacy": "Privacy Policy",
    "settings.help": "Help & Support",

    // Common
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.retry": "Retry",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.save": "Save",
    "common.back": "Back",
  },
  am: {
    // App
    "app.name": "አዲስላይፍ",
    "app.tagline": "የአዲስ ከተማ አገልግሎት",

    // Navigation
    "nav.home": "መነሻ",
    "nav.explore": "አስስ",
    "nav.tasks": "ስራዎች",
    "nav.profile": "መገለጫ",

    // Greetings
    "greeting.morning": "እንደምን አደርክ",
    "greeting.afternoon": "እንደምን ዋልክ",
    "greeting.evening": "እንደምን አምሸህ",

    // Home Screen
    "home.subtitle": "AddisLife እንዴት ሊረዳህ ይችላል?",
    "home.nearbyEssentials": "የቅርብ አገልግሎቶች",
    "home.trendingInAddis": "በአዲስ ውስጥ ትኩስ",
    "home.dailyUtility": "ዕለታዊ መረጃ",

    // Quick Actions
    "quick.atm": "ኤቲኤም",
    "quick.pharmacy": "ፋርማሲ",
    "quick.taxi": "ታክሲ",

    // Trending
    "trending.workCafes": "ምርጥ የስራ ካፌዎች",
    "trending.safeRoutes": "ለሴቶች ደህንነቱ የተጠበቀ መንገድ",
    "trending.events": "የሳምንት መጨረሻ ዝግጅቶች",

    // Utility
    "utility.sunny": "ፀሐያማ",
    "utility.moderate": "መካከለኛ",
    "utility.traffic": "ትራፊክ",
    "utility.stable": "የተረጋጋ",
    "utility.power": "ኤሌክትሪክ",

    // Featured Card
    "featured.backup": "ተጠባባቂ ጀነሬተር",
    "featured.openUntil": "ክፍት እስከ",
    "featured.whyRecommended": "ለምን ለእርስዎ ተመከረ",
    "featured.aiMatch": "AI ተዛማጅነት",
    "featured.reserve": "ቦታ ያስይዙ",
    "featured.map": "ካርታ",

    // Chat
    "chat.placeholder": "ማንኛውንም ነገር ይጠይቁ...",
    "chat.send": "ላክ",
    "chat.thinking": "እያሰብኩ ነው...",
    "chat.welcome": "ሰላም! እኔ የ AddisLife ረዳትዎ ነኝ። ዛሬ እንዴት ልርዳዎት?",

    // Tasks
    "tasks.title": "ስራዎችዎ",
    "tasks.subtitle": "ንቁ ጥያቄዎችዎን ይከታተሉ",
    "tasks.empty": "ምንም ንቁ ስራዎች የሉም",
    "tasks.emptyDesc": "የእርስዎ ክትትል ስራዎች እዚህ ይታያሉ",
    "tasks.status.waiting": "በመጠበቅ ላይ",
    "tasks.status.progress": "በሂደት ላይ",
    "tasks.status.completed": "ተጠናቅቋል",
    "tasks.status.failed": "አልተሳካም",
    "tasks.cancel": "ሰርዝ",
    "tasks.edit": "ማስጠንቀቂያ አስተካክል",
    "tasks.checked": "ተረጋግጧል",
    "tasks.ago": "በፊት",

    // Settings
    "settings.title": "መገለጫ",
    "settings.language": "ቋንቋ",
    "settings.language.desc": "የሚፈልጉትን ቋንቋ ይምረጡ",
    "settings.notifications": "ማሳወቂያዎች",
    "settings.notifications.desc": "የማሳወቂያ ምርጫዎችን ያስተዳድሩ",
    "settings.locations": "የተቀመጡ ቦታዎች",
    "settings.locations.desc": "ቤት፣ ስራ፣ ተወዳጆች",
    "settings.about": "ስለ አዲስላይፍ",
    "settings.version": "ስሪት 1.0.0",
    "settings.privacy": "የግላዊነት ፖሊሲ",
    "settings.help": "እርዳታ እና ድጋፍ",

    // Common
    "common.loading": "በመጫን ላይ...",
    "common.error": "ችግር ተፈጥሯል",
    "common.retry": "እንደገና ሞክር",
    "common.cancel": "ሰርዝ",
    "common.confirm": "አረጋግጥ",
    "common.save": "አስቀምጥ",
    "common.back": "ተመለስ",
  },
  om: {
    // App
    "app.name": "AddisLife",
    "app.tagline": "Tajaajila Magaalaa Addis",

    // Navigation
    "nav.home": "Mana",
    "nav.explore": "Sakatta'i",
    "nav.tasks": "Hojii",
    "nav.profile": "Profaayilii",

    // Greetings
    "greeting.morning": "Akkam Bultee",
    "greeting.afternoon": "Akkam Oolte",
    "greeting.evening": "Akkam Galgale",

    // Home Screen
    "home.subtitle": "AddisLife har'a akkam si gargaaruu?",
    "home.nearbyEssentials": "Tajaajila Dhiyoo",
    "home.trendingInAddis": "Addis Keessatti",
    "home.dailyUtility": "Odeeffannoo Guyyaa",

    // Quick Actions
    "quick.atm": "ATM",
    "quick.pharmacy": "Farmaasiifi",
    "quick.taxi": "Taaksii",

    // Trending
    "trending.workCafes": "Kaafee Hojii",
    "trending.safeRoutes": "Karaa Nagaa Dubartootaaf",
    "trending.events": "Sagantaalee Torbee",

    // Utility
    "utility.sunny": "Biiftuun",
    "utility.moderate": "Giddu galeessa",
    "utility.traffic": "Tiraafikaa",
    "utility.stable": "Tasgabbaa'aa",
    "utility.power": "Ibsaa",

    // Featured Card
    "featured.backup": "Jenereetara Duubaa",
    "featured.openUntil": "Banaa hanga",
    "featured.whyRecommended": "Maaliif siif gorfame",
    "featured.aiMatch": "AI Walsimaa",
    "featured.reserve": "Qabadhu",
    "featured.map": "Kaartaa",

    // Chat
    "chat.placeholder": "AddisLife waa'ee gaafadhaa...",
    "chat.send": "Ergi",
    "chat.thinking": "Yaadaa jira...",
    "chat.welcome": "Akkam! Ani gargaartuu AddisLife keeti. Har'a akkam si gargaaruu?",

    // Tasks
    "tasks.title": "Hojii Kee",
    "tasks.subtitle": "Gaaffii hojii irra jirtu hordofi",
    "tasks.empty": "Hojii hin jiru",
    "tasks.emptyDesc": "Hojiiwwan hordoffii kee asitti mul'atu",
    "tasks.status.waiting": "Eegaa jira",
    "tasks.status.progress": "Hojjatamaa jira",
    "tasks.status.completed": "Xummurame",
    "tasks.status.failed": "Hin milkoofne",
    "tasks.cancel": "Haqi",
    "tasks.edit": "Akeekkachiisa Sirreessi",
    "tasks.checked": "Ilaalame",
    "tasks.ago": "dura",

    // Settings
    "settings.title": "Profaayilii",
    "settings.language": "Afaan",
    "settings.language.desc": "Afaan filadhu",
    "settings.notifications": "Beeksisa",
    "settings.notifications.desc": "Filannoo beeksisa bulchi",
    "settings.locations": "Bakkeewwan Kuufaman",
    "settings.locations.desc": "Mana, hojii, jaallatamoo",
    "settings.about": "Waa'ee AddisLife",
    "settings.version": "Gosa 1.0.0",
    "settings.privacy": "Imaammata Dhuunfaa",
    "settings.help": "Gargaarsa",

    // Common
    "common.loading": "Fe'aa jira...",
    "common.error": "Rakkoon uumame",
    "common.retry": "Irra deebi'i yaali",
    "common.cancel": "Haqi",
    "common.confirm": "Mirkaneessi",
    "common.save": "Kuusi",
    "common.back": "Duuba",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("am");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved language preference
    const saved = localStorage.getItem("addislife-language") as Language;
    if (saved && ["en", "am", "om"].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("addislife-language", lang);
    // Update document language
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || translations.en[key] || key;
    },
    [language]
  );

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{ language: "am", setLanguage, t, languages: LANGUAGES }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, languages: LANGUAGES }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
