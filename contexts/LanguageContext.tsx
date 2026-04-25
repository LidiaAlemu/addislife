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
    "nav.chat": "Chat",
    "nav.tasks": "Tasks",
    "nav.settings": "Settings",

    // Home Screen
    "home.greeting": "Hello! How can I help you today?",
    "home.categories": "What would you like to do?",

    // Categories
    "category.documents": "Renew Documents",
    "category.documents.desc": "ID, passport, licenses",
    "category.clinic": "Find a Clinic",
    "category.clinic.desc": "Nearby healthcare",
    "category.transport": "Get Home Fast",
    "category.transport.desc": "Compare rides",
    "category.water": "Water Delivery",
    "category.water.desc": "Order drinking water",
    "category.cafe": "Find a Work Cafe",
    "category.cafe.desc": "WiFi & workspace",

    // Chat
    "chat.placeholder": "Type your message...",
    "chat.send": "Send",
    "chat.thinking": "Thinking...",

    // Tasks
    "tasks.title": "Your Tasks",
    "tasks.empty": "No active tasks",
    "tasks.status.waiting": "Waiting",
    "tasks.status.progress": "In Progress",
    "tasks.status.completed": "Completed",
    "tasks.status.failed": "Failed",
    "tasks.cancel": "Cancel",

    // Settings
    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.language.desc": "Choose your preferred language",
    "settings.notifications": "Notifications",
    "settings.notifications.desc": "Manage notification preferences",
    "settings.locations": "Saved Locations",
    "settings.locations.desc": "Home, work, favorites",
    "settings.about": "About AddisLife",
    "settings.version": "Version 1.0.0",

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
    "nav.chat": "ውይይት",
    "nav.tasks": "ስራዎች",
    "nav.settings": "ቅንብሮች",

    // Home Screen
    "home.greeting": "ሰላም! ዛሬ እንዴት ልርዳዎት?",
    "home.categories": "ምን ማድረግ ይፈልጋሉ?",

    // Categories
    "category.documents": "ሰነዶች ማደስ",
    "category.documents.desc": "መታወቂያ፣ ፓስፖርት፣ ፈቃድ",
    "category.clinic": "ክሊኒክ ፈልግ",
    "category.clinic.desc": "የቅርብ ጤና ተቋም",
    "category.transport": "ቤት ድረስ",
    "category.transport.desc": "ትራንስፖርት አወዳድር",
    "category.water": "ውሃ ማዘዝ",
    "category.water.desc": "የመጠጥ ውሃ አገልግሎት",
    "category.cafe": "ካፌ ፈልግ",
    "category.cafe.desc": "WiFi እና የስራ ቦታ",

    // Chat
    "chat.placeholder": "መልእክትዎን ይጻፉ...",
    "chat.send": "ላክ",
    "chat.thinking": "እያሰብኩ ነው...",

    // Tasks
    "tasks.title": "ስራዎችዎ",
    "tasks.empty": "ምንም ንቁ ስራዎች የሉም",
    "tasks.status.waiting": "በመጠበቅ ላይ",
    "tasks.status.progress": "በሂደት ላይ",
    "tasks.status.completed": "ተጠናቅቋል",
    "tasks.status.failed": "አልተሳካም",
    "tasks.cancel": "ሰርዝ",

    // Settings
    "settings.title": "ቅንብሮች",
    "settings.language": "ቋንቋ",
    "settings.language.desc": "የሚፈልጉትን ቋንቋ ይምረጡ",
    "settings.notifications": "ማሳወቂያዎች",
    "settings.notifications.desc": "የማሳወቂያ ምርጫዎችን ያስተዳድሩ",
    "settings.locations": "የተቀመጡ ቦታዎች",
    "settings.locations.desc": "ቤት፣ ስራ፣ ተወዳጆች",
    "settings.about": "ስለ አዲስላይፍ",
    "settings.version": "ስሪት 1.0.0",

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
    "nav.chat": "Haasaa",
    "nav.tasks": "Hojii",
    "nav.settings": "Qindaa'ina",

    // Home Screen
    "home.greeting": "Akkam! Har'a maal si gargaaruu?",
    "home.categories": "Maal gochuu barbaadda?",

    // Categories
    "category.documents": "Sanadoota Haaromsi",
    "category.documents.desc": "Eenyummaa, paaspoortii",
    "category.clinic": "Kilinika Barbaadi",
    "category.clinic.desc": "Kunuunsa fayyaa dhiyoo",
    "category.transport": "Mana Gahi",
    "category.transport.desc": "Geejjiba madaali",
    "category.water": "Bishaan Ajaji",
    "category.water.desc": "Bishaan dhugaatii",
    "category.cafe": "Kaafee Barbaadi",
    "category.cafe.desc": "WiFi fi bakka hojii",

    // Chat
    "chat.placeholder": "Ergaa kee barreessi...",
    "chat.send": "Ergi",
    "chat.thinking": "Yaadaa jira...",

    // Tasks
    "tasks.title": "Hojii Kee",
    "tasks.empty": "Hojii hin jiru",
    "tasks.status.waiting": "Eegaa jira",
    "tasks.status.progress": "Hojjatamaa jira",
    "tasks.status.completed": "Xummurame",
    "tasks.status.failed": "Hin milkoofne",
    "tasks.cancel": "Haqi",

    // Settings
    "settings.title": "Qindaa'ina",
    "settings.language": "Afaan",
    "settings.language.desc": "Afaan filadhu",
    "settings.notifications": "Beeksisa",
    "settings.notifications.desc": "Filannoo beeksisa bulchi",
    "settings.locations": "Bakkeewwan Kuufaman",
    "settings.locations.desc": "Mana, hojii, jaallatamoo",
    "settings.about": "Waa'ee AddisLife",
    "settings.version": "Gosa 1.0.0",

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
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
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
