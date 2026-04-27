import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, 
  MapPin, 
  Heart, 
  MessageCircle, 
  FileLock, 
  Search, 
  Globe, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Wifi,
  WifiOff,
  Crosshair,
  Briefcase,
  PhoneCall,
  Activity,
  Users,
  X,
  FileBadge,
  Scale,
  Stethoscope,
  ChevronLeft,
  Info,
  Camera,
  RefreshCw,
  Sparkles,
  FlaskConical,
  Clock,
  Lock,
  Check,
  User,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Types ---

type Language = 'en' | 'ar' | 'hi' | 'ur' | 'ne' | 'bn' | 'ta';
type ModuleId = 'shelter' | 'medical' | 'legal' | 'chat' | 'jobs' | 'census' | 'profile' | null;

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface TranslationSet {
  title: string;
  subtitle: string;
  shelter: string;
  medical: string;
  legal: string;
  chat: string;
  jobs: string;
  census: string;
  vault: string;
  upload: string;
  scan: string;
  encryption: string;
  mapTitle: string;
  searchPlaceholder: string;
  offlineReady: string;
  nearbyResources: string;
  documents: string;
  censusTitle: string;
  unhcrInfo: string;
  helplines: string;
  peopleHelped: string;
  activeCases: string;
  successRate: string;
  assistantTitle: string;
  assistantPrompt: string;
  shelterDesc: string;
  medicalDesc: string;
  legalDesc: string;
  chatDesc: string;
  jobsDesc: string;
  nodeStatus: string;
  feedbackTitle: string;
  feedbackPlaceholder: string;
  feedbackSubmit: string;
  feedbackSuccess: string;
  unhcrStepsTitle: string;
  unhcrStep1: string;
  unhcrStep2: string;
  unhcrStep3: string;
  unhcrStep4: string;
  unhcrStep5: string;
  vaxTitle: string;
  vaxDesc: string;
  laborTitle: string;
  laborDesc: string;
  ltvTitle: string;
  ltvRequirementTitle: string;
  ltvStepTitle: string;
  ltvAuthorityTitle: string;
  ltvStep1: string;
  ltvStep2: string;
  ltvStep3: string;
  ltvStep4: string;
  ltvReq1: string;
  ltvReq2: string;
  ltvReq3: string;
  profile: string;
  profileDesc: string;
  profileName: string;
  profileEmail: string;
  profilePhone: string;
  profileLang: string;
  profileSave: string;
  profileSettings: string;
}

const translations: Record<Language, TranslationSet> = {
  en: {
    title: "RefugeeBridge",
    subtitle: "Humanitarian Support Platform",
    shelter: "Find Shelter",
    medical: "Medical Aid",
    legal: "Legal Rights",
    chat: "Community",
    jobs: "Jobs Available",
    census: "Detailed Census",
    vault: "Digital Vault",
    upload: "Submit",
    scan: "Scan",
    encryption: "ENCRYPTED SERVER",
    mapTitle: "Resource Map",
    searchPlaceholder: "Search services...",
    offlineReady: "Offline Mode: Active",
    nearbyResources: "Nearby Organizations",
    documents: "My Documents",
    censusTitle: "UNHCR Impact Census (India)",
    unhcrInfo: "Official UNHCR Support",
    helplines: "Emergency Helplines",
    peopleHelped: "People Helped",
    activeCases: "Verified IDs",
    successRate: "Case Success",
    assistantTitle: "Bridge Assistant",
    assistantPrompt: "How can I help you navigate resources today?",
    shelterDesc: "Secure refugee camps & homes",
    medicalDesc: "Emergency clinics in major cities",
    legalDesc: "UNHCR & Govt ID assistance",
    chatDesc: "Safe peer-to-peer verification",
    jobsDesc: "Verified fair-wage opportunities",
    nodeStatus: "Secure Local Relay",
    feedbackTitle: "Rate this Resource",
    feedbackPlaceholder: "Share your experience...",
    feedbackSubmit: "Submit Feedback",
    feedbackSuccess: "Feedback received securely.",
    unhcrStepsTitle: "UNHCR Card Process",
    unhcrStep1: "1. Visit UNHCR New Delhi for initial profiling.",
    unhcrStep2: "2. Temporary registration certificate (TRC) issued.",
    unhcrStep3: "3. Refugee Status Determination (RSD) interview.",
    unhcrStep4: "4. Verification of documents & biometric capture.",
    unhcrStep5: "5. Card collection and status updates via SMS.",
    vaxTitle: "Vaccination Sites",
    vaxDesc: "Free immunization centers",
    laborTitle: "Labor Laws",
    laborDesc: "Workplace rights in India",
    ltvTitle: "LTV Renewal Process",
    ltvRequirementTitle: "Requirements",
    ltvStepTitle: "Renewal Steps",
    ltvAuthorityTitle: "Authorities",
    ltvStep1: "1. Login to the MHA FRRO portal 60 days before expiry.",
    ltvStep2: "2. Upload valid UNHCR card & residency proof.",
    ltvStep3: "3. Schedule physical verification if requested by local LIU.",
    ltvStep4: "4. Receive digital LTV certificate via email.",
    ltvReq1: "Valid UNHCR Refugee Card",
    ltvReq2: "Current LTV copy",
    ltvReq3: "Proof of residence (e.g. Rent Agreement)",
    profile: "User Profile",
    profileDesc: "Manage your personal credentials",
    profileName: "Full Name",
    profileEmail: "Email Address",
    profilePhone: "Phone Number",
    profileLang: "Preferred Language",
    profileSave: "Update Profile",
    profileSettings: "Regional Settings"
  },
  ar: {
    title: "جسر اللاجئين",
    subtitle: "منصة الدعم الإنساني",
    shelter: "البحث عن مأوى",
    medical: "المساعدة الطبية",
    legal: "الحقوق القانونية",
    chat: "المجتمع",
    jobs: "وظائف متاحة",
    census: "تعداد مفصل",
    vault: "الخزنة الرقمية",
    upload: "إرسال",
    scan: "مسح",
    encryption: "سيرفر مشفر",
    mapTitle: "خريطة الموارد",
    searchPlaceholder: "ابحث عن الخدمات...",
    offlineReady: "وضع الأوفلاين: نشط",
    nearbyResources: "المنظمات القريبة",
    documents: "مستنداتي",
    censusTitle: "تعداد تأثير المفوضية (الهند)",
    unhcrInfo: "دعم المفوضية الرسمي",
    helplines: "خطوط الطوارئ",
    peopleHelped: "أشخاص تمت مساعدتهم",
    activeCases: "هويات موثقة",
    successRate: "نجاح الحالات",
    assistantTitle: "مساعد الجسر",
    assistantPrompt: "كيف يمكنني مساعدتك في العثور على الموارد اليوم؟",
    shelterDesc: "مخيمات ومنازل آمنة للاجئين",
    medicalDesc: "عيادات الطوارئ في المدن الكبرى",
    legalDesc: "مساعدة في الهوية والتأشيرات",
    chatDesc: "تحقق آمن بين الأقران",
    jobsDesc: "فرص عمل بأجور عادلة",
    nodeStatus: "مرحل محلي آمن",
    feedbackTitle: "تقييم هذا المورد",
    feedbackPlaceholder: "شارك تجربتك...",
    feedbackSubmit: "إرسال التعليق",
    feedbackSuccess: "تم استلام التعليق بأمان.",
    unhcrStepsTitle: "عملية بطاقة المفوضية",
    unhcrStep1: "1. قم بزيارة المفوضية في نيودلهي للتقييم الأولي.",
    unhcrStep2: "2. إصدار شهادة تسجيل مؤقتة (TRC).",
    unhcrStep3: "3. مقابلة تحديد وضع اللاجئ (RSD).",
    unhcrStep4: "4. التحقق من المستندات والتقاط البيانات الحيوية.",
    unhcrStep5: "5. استلام البطاقة وتحديثات الحالة عبر الرسائل النصية.",
    vaxTitle: "مواقع التطعيم",
    vaxDesc: "مراكز تحصين مجانية",
    laborTitle: "قوانين العمل",
    laborDesc: "حقوق مكان العمل في الهند",
    ltvTitle: "عملية تجديد تأشيرة الإقامة الطويلة",
    ltvRequirementTitle: "المتطلبات",
    ltvStepTitle: "خطوات التجديد",
    ltvAuthorityTitle: "السلطات",
    ltvStep1: "1. قم بتسجيل الدخول إلى بوابة MHA FRRO قبل 60 يومًا من انتهاء الصلاحية.",
    ltvStep2: "2. تحميل بطاقة المفوضية صالحة وإثبات الإقامة.",
    ltvStep3: "3. جدولة التحقق الجسدي إذا طلبت وحدة الاستخبارات المحلية (LIU).",
    ltvStep4: "4. استلام شهادة LTV الرقمية عبر البريد الإلكتروني.",
    ltvReq1: "بطاقة لاجئ صالحة من المفوضية",
    ltvReq2: "نسخة من تأشيرة الإقامة الطويلة الحالية",
    ltvReq3: "إثبات السكن (مثل عقد الإيجار)",
    profile: "ملف المستخدم",
    profileDesc: "إدارة بياناتك الشخصية",
    profileName: "الاسم الكامل",
    profileEmail: "البريد الإلكتروني",
    profilePhone: "رقم الهاتف",
    profileLang: "اللغة المفضلة",
    profileSave: "تحديث الملف",
    profileSettings: "الإعدادات الإقليمية"
  },
  hi: {
    title: "RefugeeBridge",
    subtitle: "शरणार्थी सहायता मंच",
    shelter: "आश्रय खोजें",
    medical: "चिकित्सा सहायता",
    legal: "कानूनी अधिकार",
    chat: "समुदाय",
    jobs: "उपलब्ध नौकरियां",
    census: "विस्तृत जनगणना",
    vault: "डिजिटल वॉल्ट",
    upload: "जमा करें",
    scan: "स्कैन",
    encryption: "एन्क्रिप्टेड सर्वर",
    mapTitle: "संसाधन मानचित्र",
    searchPlaceholder: "सेवाएं खोजें...",
    offlineReady: "ऑफलाइन मोड: सक्रिय",
    nearbyResources: "नज़दीकी संस्थाएं",
    documents: "मेरे दस्तावेज़",
    censusTitle: "UNHCR प्रभाव जनगणना (भारत)",
    unhcrInfo: "आधिकारिक सहायता",
    helplines: "आपातकालीन हेल्पलाइन",
    peopleHelped: "मदद किए गए लोग",
    activeCases: "सत्यापित आईडी",
    successRate: "मामला सफलता",
    assistantTitle: "ब्रिज सहायक",
    assistantPrompt: "मैं आज आपको संसाधनों को खोजने में कैसे मदद कर सकता हूँ?",
    shelterDesc: "सुरक्षित शरणार्थी शिविर और घर",
    medicalDesc: "प्रमुख शहरों में आपातकालीन क्लीनिक",
    legalDesc: "UNHCR और सरकारी आईडी सहायता",
    chatDesc: "सुरक्षित पीयर-टू-पीयर सत्यापन",
    jobsDesc: "सत्यापित उचित मजदूरी के अवसर",
    nodeStatus: "सुरक्षित स्थानीय रिले",
    feedbackTitle: "इस संसाधन को रेट करें",
    feedbackPlaceholder: "अपना अनुभव साझा करें...",
    feedbackSubmit: "प्रतिक्रिया जमा करें",
    feedbackSuccess: "प्रतिक्रिया सुरक्षित रूप से प्राप्त हुई।",
    unhcrStepsTitle: "UNHCR कार्ड प्रक्रिया",
    unhcrStep1: "1. प्रारंभिक प्रोफाइलिंग के लिए UNHCR नई दिल्ली जाएं।",
    unhcrStep2: "2. अस्थायी पंजीकरण प्रमाण पत्र (TRC) जारी किया गया।",
    unhcrStep3: "3. शरणार्थी स्थिति निर्धारण (RSD) साक्षात्कार।",
    unhcrStep4: "4. दस्तावेजों का सत्यापन और बायोमेट्रिक कैप्चर।",
    unhcrStep5: "5. एसएमएस के माध्यम से कार्ड संग्रह और स्थिति अपडेट।",
    vaxTitle: "टीकाकरण स्थल",
    vaxDesc: "नि: शुल्क टीकाकरण केंद्र",
    laborTitle: "श्रम कानून",
    laborDesc: "भारत में कार्यस्थल अधिकार",
    ltvTitle: "LTV नवीनीकरण प्रक्रिया",
    ltvRequirementTitle: "आवश्यकताएँ",
    ltvStepTitle: "नवीनीकरण के चरण",
    ltvAuthorityTitle: "प्राधिकारी",
    ltvStep1: "1. समाप्ति से 60 दिन पहले MHA FRRO पोर्टल पर लॉगिन करें।",
    ltvStep2: "2. वैध UNHCR कार्ड और निवास प्रमाण अपलोड करें।",
    ltvStep3: "3. स्थानीय LIU द्वारा अनुरोध किए जाने पर भौतिक सत्यापन निर्धारित करें।",
    ltvStep4: "4. ईमेल के माध्यम से डिजिटल LTV प्रमाणपत्र प्राप्त करें।",
    ltvReq1: "वैध UNHCR शरणार्थी कार्ड",
    ltvReq2: "वर्तमान LTV प्रति",
    ltvReq3: "निवास का प्रमाण (जैसे किराया समझौता)",
    profile: "उपयोगकर्ता प्रोफ़ाइल",
    profileDesc: "अपने व्यक्तिगत क्रेडेंशियल प्रबंधित करें",
    profileName: "पूरा नाम",
    profileEmail: "ईमेल पता",
    profilePhone: "फ़ोन नंबर",
    profileLang: "पसंदीदा भाषा",
    profileSave: "प्रोफ़ाइल अपडेट करें",
    profileSettings: "क्षेत्रीय सेटिंग्स"
  },
  ur: {
    title: "RefugeeBridge",
    subtitle: "انسانی امداد کا پلیٹ فارم",
    shelter: "پناہ گاہ تلاش کریں",
    medical: "طبی امداد",
    legal: "قانونی حقوق",
    chat: "کمیونٹی",
    jobs: "دستیاب ملازمتیں",
    census: "تفصیلی مردم شماری",
    vault: "ڈیجیٹل والٹ",
    upload: "جمع کروائیں",
    scan: "اسکین",
    encryption: "انکرپٹڈ سرور",
    mapTitle: "وسائل کا نقشہ",
    searchPlaceholder: "خدمات تلاش کریں...",
    offlineReady: "آف لائن موڈ: فعال",
    nearbyResources: "قریبی تنظیمیں",
    documents: "میری دستاویزات",
    censusTitle: "UNHCR مردم شماری (بھارت)",
    unhcrInfo: "آفیشل سپورٹ",
    helplines: "ہنگامی ہیلپ لائنز",
    peopleHelped: "لوگوں کی مدد کی",
    activeCases: "تصدیق شدہ IDs",
    successRate: "کامیابی کی شرح",
    assistantTitle: "برج اسسٹنٹ",
    assistantPrompt: "آج میں وسائل تلاش کرنے میں آپ کی کیا مدد کر سکتا ہوں؟",
    shelterDesc: "محفوظ کیمپ اور گھر",
    medicalDesc: "بڑے شہروں میں ایمرجنسی کلینک",
    legalDesc: "شناختی کارڈ اور ویزا کی مدد",
    chatDesc: "محفوظ ہم مرتبہ تصدیق",
    jobsDesc: "منصفانہ اجرت کے مواقع",
    nodeStatus: "محفوظ مقامی سپلائر",
    feedbackTitle: "اس وسائل کی درجہ بندی کریں",
    feedbackPlaceholder: "اپنا تجربہ شیئر کریں...",
    feedbackSubmit: "تاثرات جمع کروائیں",
    feedbackSuccess: "تاثرات محفوظ طریقے سے موصول ہوئے۔",
    unhcrStepsTitle: "UNHCR کارڈ کا عمل",
    unhcrStep1: "1. ابتدائی پروفائلنگ کے لیے UNHCR نئی دہلی کا دورہ کریں۔",
    unhcrStep2: "2. عارضی رجسٹریشن سرٹیفکیٹ (TRC) جاری کیا گیا۔",
    unhcrStep3: "3. رفیوجی سٹیٹس ڈیٹرمینیشن (RSD) انٹرویو۔",
    unhcrStep4: "4. دستاویزات کی تصدیق اور بایومیٹرک کیپچر۔",
    unhcrStep5: "5. ایس ایم ایس کے ذریعے کارڈ کی وصولی اور اسٹیٹس اپ ڈیٹس۔",
    vaxTitle: "ٹیکہ کاری کے مقامات",
    vaxDesc: "مفت حفاظتی ٹیکوں کے مراکز",
    laborTitle: "لیبر قوانین",
    laborDesc: "بھارت میں کام کی جگہ کے حقوق",
    ltvTitle: "LTV کی تجدید کا عمل",
    ltvRequirementTitle: "ضروریات",
    ltvStepTitle: "تجدید کے مراحل",
    ltvAuthorityTitle: "حکام",
    ltvStep1: "1. میعاد ختم ہونے سے 60 دن پہلے MHA FRRO پورٹل پر لاگ ان کریں۔",
    ltvStep2: "2. درست UNHCR کارڈ اور رہائش کا ثبوت اپ لوڈ کریں۔",
    ltvStep3: "3. اگر مقامی LIU کی طرف سے درخواست کی جائے تو جسمانی تصدیق کا شیڈول بنائیں۔",
    ltvStep4: "4. ای میل کے ذریعے ڈیجیٹل LTV سرٹیفکیٹ حاصل کریں۔",
    ltvReq1: "درست UNHCR پناہ گزین کارڈ",
    ltvReq2: "موجودہ LTV کاپی",
    ltvReq3: "رہائش کا ثبوت (جیسے کرایہ نامہ)",
    profile: "صارف کا پروفائل",
    profileDesc: "اپنی ذاتی اسناد کا نظم کریں",
    profileName: "مکمل نام",
    profileEmail: "ای میل ایڈریس",
    profilePhone: "فون نمبر",
    profileLang: "پسندیدہ زبان",
    profileSave: "پروفائل اپ ڈیٹ کریں",
    profileSettings: "علاقائی ترتیبات"
  },
  ne: {
    title: "RefugeeBridge",
    subtitle: "मानवीय सहायता प्लेटफर्म",
    shelter: "आश्रय खोज्नुहोस्",
    medical: "चिकित्सा सहायता",
    legal: "कानूनी अधिकार",
    chat: "समुदाय",
    jobs: "उपलब्ध कामहरू",
    census: "विस्तृत जनगणना",
    vault: "डिजिटल भल्ट",
    upload: "पेश गर्नुहोस्",
    scan: "स्क्यान",
    encryption: "इन्क्रिप्टेड सर्भर",
    mapTitle: "स्रोत नक्सा",
    searchPlaceholder: "सेवाहरू खोज्नुहोस्...",
    offlineReady: "अफलाइन मोड: सक्रिय",
    nearbyResources: "नजिकैका संस्थाहरू",
    documents: "मेरा कागजातहरू",
    censusTitle: "UNHCR प्रभाव गणना (भारत)",
    unhcrInfo: "आधिकारिक सहयोग",
    helplines: "आपातकालीन हेल्पलाइन",
    peopleHelped: "मद्दत पाएका मानिसहरू",
    activeCases: "प्रमाणित आईडी",
    successRate: "सफलता दर",
    assistantTitle: "ब्रिज सहायक",
    assistantPrompt: "आज म तपाईंलाई संसाधनहरू खोज्न कसरी मद्दत गर्न सक्छु?",
    shelterDesc: "सुरक्षित शरणार्थी शिविर र घरहरू",
    medicalDesc: "प्रमुख सहरहरूमा आपतकालीन क्लिनिकहरू",
    legalDesc: "UNHCR र सरकारी आईडी सहयोग",
    chatDesc: "सुरक्षित साथी-देखि-साथी प्रमाणीकरण",
    jobsDesc: "प्रमाणित उचित ज्याला अवसरहरू",
    nodeStatus: "सुरक्षित स्थानीय रिले",
    feedbackTitle: "यस स्रोतलाई मूल्याङ्कन गर्नुहोस्",
    feedbackPlaceholder: "आफ्नो अनुभव साझा गर्नुहोस्...",
    feedbackSubmit: "प्रतिक्रिया बुझाउनुहोस्",
    feedbackSuccess: "प्रतिक्रिया सुरक्षित रूपमा प्राप्त भयो।",
    unhcrStepsTitle: "UNHCR कार्ड प्रक्रिया",
    unhcrStep1: "1. प्रारम्भिक प्रोफाइलको लागि UNHCR नयाँ दिल्ली भ्रमण गर्नुहोस्।",
    unhcrStep2: "2. अस्थायी दर्ता प्रमाणपत्र (TRC) जारी गरियो।",
    unhcrStep3: "3. शरणार्थी स्थिति निर्धारण (RSD) अन्तर्वार्ता।",
    unhcrStep4: "4. कागजातहरूको प्रमाणीकरण र बायोमेट्रिक क्याप्चर।",
    unhcrStep5: "5. एसएमएस मार्फत कार्ड सङ्कलन र स्थिति अपडेटहरू।",
    vaxTitle: "खोप केन्द्रहरू",
    vaxDesc: "निःशुल्क खोप केन्द्रहरू",
    laborTitle: "श्रम कानून",
    laborDesc: "भारतमा कार्यस्थल अधिकारहरू",
    ltvTitle: "LTV नवीकरण प्रक्रिया",
    ltvRequirementTitle: "आवश्यकताहरू",
    ltvStepTitle: "नवीकरण चरणहरू",
    ltvAuthorityTitle: "अधिकारीहरू",
    ltvStep1: "1. म्याद समाप्त हुनुभन्दा ६० दिन अघि MHA FRRO पोर्टलमा लगइन गर्नुहोस्।",
    ltvStep2: "2. मान्य UNHCR कार्ड र बसोबासको प्रमाण अपलोड गर्नुहोस्।",
    ltvStep3: "3. स्थानीय LIU द्वारा अनुरोध गरिएको खण्डमा भौतिक प्रमाणीकरण तालिकाहरू बनाउनुहोस्।",
    ltvStep4: "4. इमेल मार्फत डिजिटल LTV प्रमाणपत्र प्राप्त गर्नुहोस्।",
    ltvReq1: "मान्य UNHCR शरणार्थी कार्ड",
    ltvReq2: "वर्तमान LTV प्रतिलिपि",
    ltvReq3: "बसोबासको प्रमाण (उदा. भाडा सम्झौता)",
    profile: "प्रयोगकर्ता प्रोफाइल",
    profileDesc: "आफ्नो व्यक्तिगत प्रमाणहरू प्रबन्ध गर्नुहोस्",
    profileName: "पूरा नाम",
    profileEmail: "इमेल ठेगाना",
    profilePhone: "फोन नम्बर",
    profileLang: "प्राथमिक भाषा",
    profileSave: "प्रोफाइल अपडेट गर्नुहोस्",
    profileSettings: "क्षेत्रीय सेटिङहरू"
  },
  bn: {
    title: "RefugeeBridge",
    subtitle: "মানবিক সহায়তা প্ল্যাটফর্ম",
    shelter: "আশ্রয় খুঁজুন",
    medical: "চিকিৎসা সহায়তা",
    legal: "আইনি অধিকার",
    chat: "সম্প্রদায়",
    jobs: "উপলব্ধ চাকরি",
    census: "বিস্তারিত সেন্সাস",
    vault: "ডিজিটাল ভল্ট",
    upload: "জমা দিন",
    scan: "স্ক্যান",
    encryption: "এনক্রিপ্টেড সার্ভার",
    mapTitle: "সম্পদ মানচিত্র",
    searchPlaceholder: "পরিষেবা খুঁজুন...",
    offlineReady: "অফলাইন মোড: সক্রিয়",
    nearbyResources: "নিকটস্থ সংস্থা",
    documents: "আমার নথি",
    censusTitle: "ইউএনএইচসিআর প্রভাব সেন্সাস (ভারত)",
    unhcrInfo: "অফিসিয়াল সমর্থন",
    helplines: "জরুরী হেল্পলাইন",
    peopleHelped: "সাহায্যপ্রাপ্ত মানুষ",
    activeCases: "যাচাইকৃত আইডি",
    successRate: "সাফল্যের হার",
    assistantTitle: "ব্রিজ সহকারী",
    assistantPrompt: "আমি আজ কীভাবে আপনাকে সংস্থানগুলি খুঁজে পেতে সহায়তা করতে পারি?",
    shelterDesc: "নিরাপদ শরণার্থী শিবির এবং ঘর",
    medicalDesc: "বড় শহরগুলিতে জরুরি ক্লিনিক",
    legalDesc: "আইডি এবং ভিসা সহায়তা",
    chatDesc: "নিরাপদ পিয়ার-টু-পিয়ার যাচাইকরণ",
    jobsDesc: "যাচাইকৃত ন্যায্য মজুরি সুযোগ",
    nodeStatus: "নিরাপদ স্থানীয় রিলে",
    feedbackTitle: "এই সংস্থানটি মূল্যায়ন করুন",
    feedbackPlaceholder: "আপনার অভিজ্ঞতা শেয়ার করুন...",
    feedbackSubmit: "মতামত জমা দিন",
    feedbackSuccess: "মতামত নিরাপদে প্রাপ্ত হয়েছে।",
    unhcrStepsTitle: "UNHCR কার্ড প্রক্রিয়া",
    unhcrStep1: "১. প্রাথমিক প্রোফাইলিংয়ের জন্য UNHCR নয়াদিল্লি পরিদর্শন করুন।",
    unhcrStep2: "২. অস্থায়ী নিবন্ধন শংসাপত্র (TRC) জারি করা হয়েছে।",
    unhcrStep3: "৩. রিফিউজি স্ট্যাটাস ডিটারমিনেশন (RSD) সাক্ষাৎকার।",
    unhcrStep4: "৪. নথিপত্র যাচাইকরণ এবং বায়োমেট্রিক গ্রহণ।",
    unhcrStep5: "৫. এসএমএসের মাধ্যমে কার্ড সংগ্রহ এবং স্ট্যাটাস আপডেট।",
    vaxTitle: "টিকাদান কেন্দ্র",
    vaxDesc: "বিনামূল্যে টিকাদান কেন্দ্র",
    laborTitle: "শ্রম আইন",
    laborDesc: "ভারতে কর্মক্ষেত্রের অধিকার",
    ltvTitle: "LTV নবায়ন প্রক্রিয়া",
    ltvRequirementTitle: "প্রয়োজনীয়তা",
    ltvStepTitle: "নবায়ন ধাপ",
    ltvAuthorityTitle: "কর্তৃপক্ষ",
    ltvStep1: "১. মেয়াদ শেষ হওয়ার ৬০ দিন আগে MHA FRRO পোর্টালে লগইন করুন।",
    ltvStep2: "২. বৈধ UNHCR কার্ড এবং বসবাসের প্রমাণ আপলোড করুন।",
    ltvStep3: "৩. স্থানীয় LIU অনুরোধ করলে শারীরিক যাচাইকরণের সময়সূচী নির্ধারণ করুন।",
    ltvStep4: "৪. ইমেলের মাধ্যমে ডিজিটাল LTV সার্টিফিকেট গ্রহণ করুন।",
    ltvReq1: "বৈধ UNHCR শরণার্থী কার্ড",
    ltvReq2: "বর্তমান LTV কপি",
    ltvReq3: "বসবাসের প্রমাণ (যেমন ভাড়া চুক্তি)",
    profile: "ব্যবহারকারীর প্রোফাইল",
    profileDesc: "আপনার ব্যক্তিগত প্রমাণপত্রাদি পরিচালনা করুন",
    profileName: "পুরো নাম",
    profileEmail: "ইমেল ঠিকানা",
    profilePhone: "ফোন নম্বর",
    profileLang: "পছন্দসই ভাষা",
    profileSave: "প্রোফাইল আপডেট করুন",
    profileSettings: "আঞ্চলিক সেটিংস"
  },
  ta: {
    title: "RefugeeBridge",
    subtitle: "மனிதாபிமான உதவி தளம்",
    shelter: "தங்குமிடம் தேடு",
    medical: "மருத்துவ உதவி",
    legal: "சட்ட உரிமைகள்",
    chat: "சமூகம்",
    jobs: "கிடைக்கும் வேலைகள்",
    census: "விரிவான கணக்கெடுப்பு",
    vault: "டிஜிட்டல் வால்ட்",
    upload: "சமர்ப்பி",
    scan: "ஸ்கேன்",
    encryption: "குறியாக்கப்பட்ட சர்வர்",
    mapTitle: "வள வரைபடம்",
    searchPlaceholder: "தேடு...",
    offlineReady: "ஆஃப்லைன்: செயலில் உள்ளது",
    nearbyResources: "அருகிலுள்ள நிறுவனங்கள்",
    documents: "எனது ஆவணங்கள்",
    censusTitle: "UNHCR கணக்கெடுப்பு (இந்தியா)",
    unhcrInfo: "அதிகாரப்பூர்வ ஆதரவு",
    helplines: "அவசர உதவி எண்கள்",
    peopleHelped: "உதவி பெற்றவர்கள்",
    activeCases: "சரிபார்க்கப்பட்ட IDs",
    successRate: "வெற்றி விகிதம்",
    assistantTitle: "பிரிட்ஜ் உதவியாளர்",
    assistantPrompt: "இன்று வளங்களைக் கண்டறிய நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    shelterDesc: "பாதுகாப்பான அகதி முகாம்கள் மற்றும் வீடுகள்",
    medicalDesc: "முக்கிய நகரங்களில் அவசர சிகிச்சை நிலையங்கள்",
    legalDesc: "ஐடி மற்றும் விசா உதவி",
    chatDesc: "பாதுகாப்பான சகாரார்டு சரிபார்ப்பு",
    jobsDesc: "சரிபார்க்கப்பட்ட நியாயமான ஊதிய வாய்ப்புகள்",
    nodeStatus: "மறையீடு பாதுகாக்கப்பட்ட ரிலே",
    feedbackTitle: "இந்த சேவையை மதிப்பிடவும்",
    feedbackPlaceholder: "உங்கள் அனுபவத்தைப் பகிரவும்...",
    feedbackSubmit: "கருத்தைச் சமர்ப்பி",
    feedbackSuccess: "கருத்து பாதுகாப்பாகப் பெறப்பட்டது.",
    unhcrStepsTitle: "UNHCR அட்டை செயல்முறை",
    unhcrStep1: "1. ஆரம்ப விவரக்குறிப்பிற்கு புது டெல்லி UNHCR ஐப் பார்வையிடவும்.",
    unhcrStep2: "2. தற்காலிக பதிவு சான்றிதழ் (TRC) வழங்கப்படும்.",
    unhcrStep3: "3. அகதி நிலை நிர்ணய (RSD) நேர்காணல்.",
    unhcrStep4: "4. ஆவணங்களைச் சரிபார்த்தல் மற்றும் பயோமெட்ரிக் பதிவு.",
    unhcrStep5: "5. அட்டை சேகரிப்பு மற்றும் SMS மூலம் நிலை புதுப்பிப்புகள்.",
    vaxTitle: "தடுப்பூசி மையங்கள்",
    vaxDesc: "இலவச நோய்த்தடுப்பு மையங்கள்",
    laborTitle: "தொழிலாளர் சட்டங்கள்",
    laborDesc: "இந்தியாவில் பணியிட உரிமைகள்",
    ltvTitle: "LTV புதுப்பித்தல் செயல்முறை",
    ltvRequirementTitle: "தேவைகள்",
    ltvStepTitle: "புதுப்பித்தல் படிகள்",
    ltvAuthorityTitle: "அதிகாரிகள்",
    ltvStep1: "1. காலாவதியாவதற்கு 60 நாட்களுக்கு முன்பு MHA FRRO போர்ட்டலில் உள்நுழையவும்.",
    ltvStep2: "2. சரியான UNHCR அட்டை மற்றும் வதிவிட ஆதாரத்தைப் பதிவேற்றவும்.",
    ltvStep3: "3. உள்ளூர் LIU கோரினால் நேரடி சரிபார்ப்பைத் திட்டமிடவும்.",
    ltvStep4: "4. மின்னஞ்சல் மூலம் டிஜிட்டல் LTV சான்றிதழைப் பெறவும்.",
    ltvReq1: "சரியான UNHCR அகதி அட்டை",
    ltvReq2: "தற்போதைய LTV நகல்",
    ltvReq3: "இருப்பிட ஆதாரம் (எ.கா. வாடகை ஒப்பந்தம்)",
    profile: "பயனர் சுயவிவரம்",
    profileDesc: "உங்கள் தனிப்பட்ட நற்சான்றிதழ்களை நிர்வகிக்கவும்",
    profileName: "முழு பெயர்",
    profileEmail: "மின்னஞ்சல் முகவரி",
    profilePhone: "தொலைபேசி எண்",
    profileLang: "விருப்பமான மொழி",
    profileSave: "சுயவிவரத்தைப் புதுப்பிக்கவும்",
    profileSettings: "வட்டார அமைப்புகள்"
  }
};

const mockNGOs = [
  { id: 1, name: "UNHCR New Delhi", type: "Legal & Housing", distance: "0.8 km", location: "Okhla" },
  { id: 2, name: "Save the Children", type: "Medical & Childcare", distance: "2.4 km", location: "Lajpat" },
  { id: 3, name: "ARA Trust", type: "Asylum Advocacy", distance: "3.1 km", location: "Nizamuddin" },
  { id: 4, name: "Don Bosco Ashalayam", type: "Youth Shelter", distance: "4.2 km", location: "Delhi NCR" }
];

const helplines = [
  { name: "UNHCR India Hotline", number: "1800-419-7434", desc: "Mon-Fri 9AM-5PM" },
  { name: "Childline India", number: "1098", desc: "24/7 Emergency Support" },
  { name: "Emergency Ambulance", number: "102", desc: "Medical Emergencies" },
  { name: "Women Helpline", number: "181", desc: "Support & Crisis" }
];

const mockJobs = [
  { id: 1, title: "Language Interpreter", company: "UNHCR Partner", type: "Remote/Part-time", pay: "₹500/hr", skills: "Arabic/English" },
  { id: 2, title: "Kitchen Assistant", company: "Zomato Feeding India", type: "Full-time", pay: "₹15,000/mo", skills: "No Exp Needed" },
  { id: 3, title: "Data Entry Operator", company: "NGO Collective", type: "Contract", pay: "₹12,000/mo", skills: "Basic Computer" },
  { id: 4, title: "Tailoring Specialist", company: "Self-Help Group", type: "Daily Wage", pay: "₹400/day", skills: "Stitching" }
];

const censusByOrigin = [
  { country: "Myanmar", count: "220,000+", pcent: 45 },
  { country: "Afghanistan", count: "50,000+", pcent: 15 },
  { country: "Sri Lanka", count: "90,000+", pcent: 25 },
  { country: "Tibet", count: "100,000+", pcent: 12 },
  { country: "Others", count: "15,000+", pcent: 3 }
];

const demographicBreakdown = [
  { group: "Women", value: 42, color: "bg-rose-400" },
  { group: "Children", value: 35, color: "bg-amber-400" },
  { group: "Men", value: 23, color: "bg-sky-400" }
];

const impactStats = [
  { label: "peopleHelped", value: "154,210", color: "text-white" },
  { label: "activeCases", value: "42,800", color: "text-sky-300" },
  { label: "successRate", value: "98.4%", color: "text-emerald-400" }
];

// --- Chat Bot Helper ---
import { GoogleGenAI } from "@google/genai";
const aiToken = process.env.GEMINI_API_KEY;
const genAI = aiToken ? new GoogleGenAI({ apiKey: aiToken }) : null;

const BridgeAssistant = ({ lang, onClose }: { lang: Language, onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: translations[lang].assistantPrompt }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !genAI) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: `You are Bridge Assistant, a compassionate helper for refugees in India on the RefugeeBridge platform. 
          Respond in ${lang} language. 
          Your goals: 
          1. Provide information about local NGOs (UNHCR New Delhi, Save the Children, ARA Trust).
          2. Help with legal rights (UNHCR card, Long Term Visa LTV).
          3. Guide to medical aid and vaccination sites.
          4. Assist in finding jobs and shelter.
          5. Keep responses concise, supportive, and safety-first.
          Refer users to the specific sections of the RefugeeBridge app: "Find Shelter", "Medical Aid", "Legal Rights", "Jobs Available", "Digital Vault".`
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm having trouble connecting to the relay. Please try again." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Relay connection lost. Switch to offline support." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-20 right-8 w-80 h-[450px] bg-[#0F2440] border border-white/20 rounded-2xl shadow-2xl flex flex-col z-[200] overflow-hidden"
    >
      <div className="bg-emerald-500 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-white">
          <Sparkles size={18} />
          <span className="font-extrabold text-sm uppercase tracking-widest">{translations[lang].assistantTitle}</span>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white"><X size={18} /></button>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs ${m.role === 'user' ? 'bg-emerald-500 text-white rounded-br-none' : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl rounded-bl-none animate-pulse">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/10 bg-black/20 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type message..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500/50 text-white"
        />
        <button 
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-[0_0_10px_#10B981]"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

// --- Sub-components ---

const LanguageToggle = ({ current, onChange }: { current: Language; onChange: (l: Language) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const langs: { key: Language; label: string }[] = [
    { key: 'en', label: 'English' },
    { key: 'ar', label: 'العربية' },
    { key: 'hi', label: 'हिन्दी' },
    { key: 'ur', label: 'اردو' },
    { key: 'ne', label: 'नेपाली' },
    { key: 'bn', label: 'বাংলা' },
    { key: 'ta', label: 'தமிழ்' }
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium text-white"
      >
        <Globe size={14} className="opacity-70" />
        {langs.find(l => l.key === current)?.label}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-40 rounded-xl bg-[#0F2440] backdrop-blur-xl border border-white/20 shadow-2xl p-2 z-50 overflow-hidden"
          >
            {langs.map((lang) => (
              <button
                key={lang.key}
                onClick={() => {
                  onChange(lang.key);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-xs transition-colors ${current === lang.key ? 'bg-emerald-500/20 text-emerald-400' : 'text-white/80 hover:bg-white/10'}`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [search, setSearch] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [activeModule, setActiveModule] = useState<ModuleId>(null);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [activeCommunityTab, setActiveCommunityTab] = useState<'All Nodes' | 'Legal Support' | 'General' | 'Marketplace'>('All Nodes');
  const [moduleFeedback, setModuleFeedback] = useState<Record<string, { rating: number, comment: string }>>({});
  const [mapFocus, setMapFocus] = useState<{ x: number, y: number } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Anonymous Refugee',
    email: 'waiting_for_reg@relay.local',
    phone: '+91 XXX-XXX-XXXX',
    language: 'en',
    notifications: true
  });
  
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  const t = translations[lang];
  
  const startScanning = async () => {
    setIsScanning(true);
    setCapturedImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied", err);
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    setCameraStream(null);
    setIsScanning(false);
    setCapturedImage(null);
    setIsEnhancing(false);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        setCapturedImage(canvas.toDataURL('image/jpeg'));
        // Stop stream to save battery
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
        }
      }
    }
  };

  const saveScan = () => {
    setIsEnhancing(true);
    // Simulate complex enhance/crop/encrypt multi-step process
    setTimeout(() => {
      handleUpload(); // Reuse existing mock upload logic
      setTimeout(() => {
        stopScanning();
      }, 2000);
    }, 1500);
  };

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const filteredNGOs = useMemo(() => {
    return mockNGOs.filter(ngo => 
      ngo.name.toLowerCase().includes(search.toLowerCase()) ||
      ngo.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsUploading(false), 800);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleNGOFocus = (ngoId: number) => {
    // Simulate map focus coordination
    const coords = [
      { x: 30, y: 40 },
      { x: 55, y: 60 },
      { x: 70, y: 25 },
      { x: 45, y: 50 }
    ];
    setMapFocus(coords[(ngoId - 1) % coords.length]);
    setTimeout(() => setMapFocus(null), 3000);
  };

  const [showLegalSteps, setShowLegalSteps] = useState(false);
  const [showLaborLaws, setShowLaborLaws] = useState(false);
  const [showVaccinations, setShowVaccinations] = useState(false);
  const [showLtvProcess, setShowLtvProcess] = useState(false);

  const ModuleFeedback = ({ moduleId }: { moduleId: string }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
      setModuleFeedback(prev => ({ ...prev, [moduleId]: { rating, comment } }));
      setSubmitted(true);
    };

    if (submitted) {
      return (
        <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
          <CheckCircle2 size={24} className="text-emerald-400 mx-auto mb-2" />
          <p className="text-xs font-bold text-emerald-400">{t.feedbackSuccess}</p>
        </div>
      );
    }

    return (
      <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4">{t.feedbackTitle}</h4>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map(star => (
            <button key={star} onClick={() => setRating(star)}>
              <Sparkles 
                size={20} 
                className={rating >= star ? "text-emerald-400 fill-emerald-400" : "text-white/20"} 
              />
            </button>
          ))}
        </div>
        <textarea 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t.feedbackPlaceholder}
          className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-500/50 text-white h-20 mb-4"
        />
        <button 
          onClick={handleSubmit}
          disabled={!rating}
          className="bg-emerald-500 text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 disabled:opacity-20 transition-all"
        >
          {t.feedbackSubmit}
        </button>
      </div>
    );
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'legal':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-sm">UNHCR Card Registration</h4>
                  <p className="text-[10px] text-white/40">Primary Identity Document</p>
                </div>
                <span className="text-[9px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded font-black">CRITICAL</span>
              </div>
              <button 
                onClick={() => setShowLegalSteps(!showLegalSteps)}
                className="w-full bg-white/5 hover:bg-white/10 py-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-2"
              >
                {showLegalSteps ? "Hide Steps" : "View Steps"}
                <ChevronRight size={14} className={showLegalSteps ? "rotate-90" : ""} />
              </button>
              
              <AnimatePresence>
                {showLegalSteps && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="bg-black/20 p-4 rounded-xl space-y-3 border border-white/5">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{t.unhcrStepsTitle}</h5>
                      {[t.unhcrStep1, t.unhcrStep2, t.unhcrStep3, t.unhcrStep4, t.unhcrStep5].map((step, i) => (
                        <div key={i} className="text-[11px] text-white/70 leading-relaxed pl-2 border-l border-emerald-500/30">
                          {step}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setShowLaborLaws(!showLaborLaws)}
                  className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Scale size={20} className="text-white/20 mb-2" />
                  <h5 className="text-[11px] font-bold">{t.laborTitle}</h5>
                  <p className="text-[9px] text-white/40 mt-1">{t.laborDesc}</p>
                </div>
                <div 
                  onClick={() => setShowLtvProcess(!showLtvProcess)}
                  className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Scale size={20} className="text-white/20 mb-2" />
                  <h5 className="text-[11px] font-bold">{t.ltvTitle}</h5>
                  <p className="text-[9px] text-white/40 mt-1">Protocols & Online Renewal</p>
                </div>
              </div>

              <AnimatePresence>
                {showLtvProcess && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="bg-black/20 p-5 rounded-2xl border border-white/5 space-y-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileBadge size={16} className="text-emerald-400" />
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{t.ltvStepTitle}</h4>
                        </div>
                        <a 
                          href="https://indianfrro.gov.in/frro/" 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold hover:bg-emerald-500/30 transition-all"
                        >
                          Official MHA Portal ↗
                        </a>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                          {[t.ltvStep1, t.ltvStep2, t.ltvStep3, t.ltvStep4].map((step, i) => (
                            <div key={i} className="flex gap-3 text-[11px] text-white/70">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                              {step}
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-white/5">
                          <h5 className="text-[10px] font-bold text-white/40 uppercase mb-3 px-1">{t.ltvRequirementTitle}</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {[t.ltvReq1, t.ltvReq2, t.ltvReq3].map((req, i) => (
                              <div key={i} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/5 text-[10px]">
                                <Check size={12} className="text-emerald-400" />
                                {req}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Scale size={14} className="text-sky-400" />
                            <span className="text-[10px] font-black uppercase text-sky-400">{t.ltvAuthorityTitle}</span>
                          </div>
                          <p className="text-[10px] text-sky-100/70 leading-relaxed">Ministry of Home Affairs (Foreigners Division) & Local Intelligence Unit (LIU) of the respective district.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showLaborLaws && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="bg-black/20 p-5 rounded-2xl border border-white/5 space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock size={14} className="text-sky-400" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-sky-400">Essential Labor Protections</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-white/5 rounded-xl">
                          <p className="text-[11px] font-bold mb-1">Minimum Wage Act</p>
                          <p className="text-[10px] text-white/50 leading-relaxed">All workers in India, regardless of status, are entitled to state-mandated minimum wages. Rates vary by state (e.g., Delhi approx ₹17,000+ per month).</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl">
                          <p className="text-[11px] font-bold mb-1">Prevention of Wage Theft</p>
                          <p className="text-[10px] text-white/50 leading-relaxed">Employers cannot withhold wages or UNHCR cards. Document all work hours and agreements.</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl">
                          <p className="text-[11px] font-bold mb-1">Safe Work Environment</p>
                          <p className="text-[10px] text-white/50 leading-relaxed">Protection against physical or verbal abuse and dangerous working conditions without safety gear.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            <ModuleFeedback moduleId="legal" />
          </div>
        );
      case 'shelter':
        return (
          <div className="space-y-4">
            <p className="text-xs text-white/60">Currently tracking 14 verified temporary shelters and housing aid centers in the Delhi NCR region.</p>
            <div className="space-y-3">
              {[
                { name: "Don Bosco Cluster", beds: "12 Available", type: "Youth/Men" },
                { name: "Shanti Kutir", beds: "Full", type: "Women/Children" },
                { name: "Sector 9 Transit Camp", beds: "8 Available", type: "Emergency" }
              ].map(s => (
                <div key={s.name} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <p className="text-sm font-bold">{s.name}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">{s.type}</p>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded ${s.beds === 'Full' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {s.beds}
                  </span>
                </div>
              ))}
            </div>
            <ModuleFeedback moduleId="shelter" />
          </div>
        );
      case 'medical':
        return (
          <div className="space-y-6">
            <div 
              onClick={() => setShowVaccinations(!showVaccinations)}
              className="p-5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl border border-white/10 cursor-pointer hover:from-indigo-500/30 transition-all"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20">
                    <FlaskConical size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t.vaxTitle}</h4>
                    <p className="text-[10px] text-white/40">{t.vaxDesc}</p>
                  </div>
                </div>
                <ChevronRight size={20} className={`text-white/20 transition-transform ${showVaccinations ? 'rotate-90' : ''}`} />
              </div>

              <AnimatePresence>
                {showVaccinations && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-6"
                  >
                    <div className="space-y-3">
                      {[
                        { name: "SDM Polyclinic", type: "Polio, MMR, COVID-19", location: "Lajpat Nagar", hours: "9AM - 4PM", dist: "1.2km" },
                        { name: "ESI Hospital Node", type: "Hepatitis, Flu", location: "Okhla Phase III", hours: "10AM - 2PM", dist: "3.4km" },
                        { name: "MCD Health Post", type: "Childhood Immunization", location: "Tilak Nagar", hours: "9AM - 5PM", dist: "0.8km" }
                      ].map((site, i) => (
                        <div key={i} className="p-3 bg-black/20 rounded-xl border border-white/5 flex justify-between items-center">
                          <div>
                            <p className="text-[11px] font-bold">{site.name}</p>
                            <p className="text-[9px] text-white/40">{site.type}</p>
                            <p className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1"><Clock size={10} /> {site.hours}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black">{site.dist}</p>
                            <p className="text-[8px] text-white/20 uppercase tracking-tighter">{site.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h4 className="text-sm font-bold mb-3">Nearest Primary Care</h4>
              <p className="text-[11px] text-white/50 mb-3">MHS India partner clinics provide free consultations for valid card holders.</p>
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
                <MapPin size={12} /> Delhi North Zone A-12
              </div>
            </div>
            <ModuleFeedback moduleId="medical" />
          </div>
        );
      case 'chat':
        const filteredPosts = [
          { user: "Omar K.", role: "Verified Member", time: "2m ago", text: "Does anyone know the current waiting time at the Okhla UNHCR gate? I heard it's shorter today.", tags: ["#LegalHelp", "#UNHCR"], verified: true, category: 'Legal Support' },
          { user: "Sarah B.", role: "Community Lead", time: "15m ago", text: "Giving away small baby clothes and a stroller near Lajpat Nagar center. Please DM if needed. Only for those in immediate need.", tags: ["#Help", "#Clothing"], verified: true, category: 'Marketplace' },
          { user: "Arjun S.", role: "Legal Advocate", time: "1h ago", text: "Reminder: The LTV renewal cycle has been updated. Check the 'Legal Rights' section for the latest Govt PDF.", tags: ["#LegalUpdate"], verified: true, category: 'Legal Support' },
          { user: "RefugeePeer_99", role: "Member", time: "3h ago", text: "Found a reliable pharmacy near Nizamuddin that accepts UNHCR cards for basic discounts.", tags: ["#Medical"], verified: false, category: 'General' },
          { user: "Fatima R.", role: "Verified Member", time: "4h ago", text: "Seeking a tutor for English language near the community hub. Will pay in skills exchange (sewing).", tags: ["#Education", "#Exchange"], verified: true, category: 'Marketplace' },
          { user: "Ahmed Y.", role: "Member", time: "5h ago", text: "Just arrived in Delhi. Is there any community gathering this weekend?", tags: ["#NewArrival", "#Connect"], verified: false, category: 'General' }
        ].filter(p => activeCommunityTab === 'All Nodes' || p.category === activeCommunityTab);

        return (
          <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar sticky top-0 bg-[#0F2440] z-10 pt-2 border-b border-white/10">
              {(['All Nodes', 'Legal Support', 'General', 'Marketplace'] as const).map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCommunityTab(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shrink-0 whitespace-nowrap transition-all ${activeCommunityTab === cat ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredPosts.length > 0 ? filteredPosts.map((post, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/[0.07] transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center font-black text-xs text-white">
                        {post.user[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold">{post.user}</span>
                          {post.verified && <CheckCircle2 size={12} className="text-emerald-400" />}
                        </div>
                        <p className="text-[9px] text-white/40 uppercase font-black tracking-tighter">{post.role} • {post.time}</p>
                      </div>
                    </div>
                    <button className="text-white/20 hover:text-white"><Info size={14} /></button>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed mb-4">{post.text}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {post.tags.map(t => (
                        <span key={t} className="text-[9px] text-sky-400 font-bold">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1 text-[10px] font-black text-white/40 hover:text-emerald-400 transition-colors uppercase tracking-widest">
                        <MessageCircle size={12} /> Reply
                      </button>
                      <button className="flex items-center gap-1 text-[10px] font-black text-white/40 hover:text-rose-400 transition-colors uppercase tracking-widest">
                        <Heart size={12} /> Like
                      </button>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-20 opacity-40">
                  <p className="text-xs italic">No messages found in this relay node yet.</p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-[#0F2440] pt-4 pb-2 border-t border-white/10">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder={`Share in ${activeCommunityTab}...`}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500/50 pr-12 text-white"
                />
                <button className="absolute right-2 top-1.5 bg-emerald-500 p-2 rounded-lg text-white hover:bg-emerald-400 transition-all shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <ModuleFeedback moduleId="chat" />
          </div>
        );
      case 'jobs':
        return (
          <div className="space-y-6">
            <div className="bg-sky-500/10 border border-sky-500/20 p-4 rounded-xl">
              <p className="text-xs text-sky-200">
                Verified fair-wage opportunities for UNHCR card holders and LTV residents. These partners follow refugee-friendly hiring protocols.
              </p>
            </div>
            
            <div className="space-y-3">
              {mockJobs.map(job => (
                <div key={job.id} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">{job.title}</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">{job.company}</p>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-black">{job.pay}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-[9px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded uppercase font-black">{job.type}</span>
                    <span className="text-[9px] bg-white/10 text-white/60 px-2 py-0.5 rounded uppercase font-black">Req: {job.skills}</span>
                  </div>
                  <button className="w-full mt-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all">
                    Apply via Node
                  </button>
                </div>
              ))}
            </div>
            <ModuleFeedback moduleId="jobs" />
          </div>
        );
      case 'census':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-4">Origin Hubs</h4>
                <div className="space-y-4">
                  {censusByOrigin.map(c => (
                    <div key={c.country} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span>{c.country}</span>
                        <span className="text-white/40">{c.count}</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${c.pcent}%` }} className="h-full bg-emerald-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                <h4 className="text-xs font-black uppercase tracking-widest text-sky-400 mb-6">Demographic Split</h4>
                <div className="flex items-end h-32 gap-3 pb-2 border-b border-white/10">
                  {demographicBreakdown.map(d => (
                    <div key={d.group} className="flex-1 flex flex-col justify-end gap-2 group">
                      <motion.div 
                        initial={{ height: 0 }} 
                        animate={{ height: `${d.value * 2}%` }} 
                        className={`w-full ${d.color} rounded-t-lg relative`}
                      >
                         <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black">{d.value}%</span>
                      </motion.div>
                      <span className="text-[9px] text-center uppercase font-black tracking-tighter opacity-60">{d.group}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h4 className="text-xs font-black uppercase tracking-widest text-rose-400 mb-4">Regional Distribution (India)</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { city: "Delhi NCR", density: "High", count: "120k" },
                  { city: "Jammu", density: "Med", count: "45k" },
                  { city: "Chennai", density: "Med", count: "38k" },
                  { city: "Hyderabad", density: "Low", count: "12k" }
                ].map(loc => (
                  <div key={loc.city} className="p-3 bg-black/20 rounded-xl border border-white/5">
                    <p className="text-[10px] font-bold">{loc.city}</p>
                    <div className="flex items-center justify-between mt-2">
                       <span className="text-[8px] bg-white/10 text-white/50 px-1.5 py-0.5 rounded font-black uppercase">{loc.density}</span>
                       <span className="text-[10px] text-emerald-400 font-mono">{loc.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ModuleFeedback moduleId="census" />
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-8">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">{t.profileName}</label>
                  <input 
                    type="text" 
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">{t.profileEmail}</label>
                  <input 
                    type="email" 
                    value={userProfile.email}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-white transition-all font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">{t.profilePhone}</label>
                  <input 
                    type="text" 
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-white transition-all font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">{t.profileLang}</label>
                  <div className="p-3 bg-black/20 border border-white/10 rounded-xl text-sm text-sky-400 font-bold flex items-center justify-between">
                    {translations[lang].profileLang}
                    <Globe size={14} />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{t.profileSettings}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div>
                      <p className="text-xs font-bold">Encrypted Relay Notifications</p>
                      <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Receive secure SMS updates</p>
                    </div>
                    <button 
                      onClick={() => setUserProfile(prev => ({ ...prev, notifications: !prev.notifications }))}
                      className={`w-10 h-5 rounded-full transition-all relative ${userProfile.notifications ? 'bg-emerald-500' : 'bg-white/10'}`}
                    >
                      <motion.div 
                        animate={{ x: userProfile.notifications ? 20 : 4 }}
                        className="w-4 h-4 bg-white rounded-full absolute top-0.5"
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 opacity-50 cursor-not-allowed">
                    <div>
                      <p className="text-xs font-bold">Biometric Vault Auth</p>
                      <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Secondary verification required</p>
                    </div>
                    <Lock size={16} />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveModule(null)}
                className="w-full bg-emerald-500 text-white py-4 rounded-xl font-black uppercase tracking-[0.3em] text-xs hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
              >
                {t.profileSave}
              </button>
            </div>

            <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-3xl space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-400">Security Actions</h4>
               <p className="text-[10px] text-rose-200/50 leading-relaxed">Sensitive data like your identity card scans are stored locally with AES-256 encryption. Clearing app data will remove all stored documents.</p>
               <button className="text-[10px] font-black text-rose-400 uppercase tracking-widest hover:underline transition-all">Emergency Wipe (Clear All Data) →</button>
            </div>
          </div>
        );
      default:
        return <p className="text-white/40 italic text-sm">Content for this module is being updated via relay mesh...</p>;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#1A365D] text-[#EBF8FF] font-sans flex flex-col items-center overflow-x-hidden selection:bg-emerald-500/30">
      <div className="w-full max-w-[1024px] h-[768px] bg-[#1A365D] flex flex-col overflow-hidden select-none shadow-2xl relative my-auto border border-white/5">
        
        {/* Document Scanner Overlay */}
        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="absolute inset-0 z-[100] bg-black flex flex-col overflow-hidden"
            >
              <div className="flex-1 relative">
                {!capturedImage ? (
                  <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#0F2440] flex items-center justify-center p-8 overflow-hidden">
                    <div className="relative max-w-full max-h-full shadow-2xl border-4 border-white/20 rounded-lg">
                      <img src={capturedImage} alt="Captured" className="max-w-full max-h-[70vh] object-contain" />
                      
                      {/* Scanning/Enhancing Filter Visual */}
                      <AnimatePresence>
                        {isEnhancing && (
                          <motion.div 
                            initial={{ top: 0 }}
                            animate={{ top: '100%' }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                            className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_20px_#10B981] z-10"
                          />
                        )}
                      </AnimatePresence>
                      
                      {/* Simulated Cropping Corners */}
                      {!isEnhancing && (
                        <>
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 -mt-2 -ml-2" />
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 -mt-2 -mr-2" />
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 -mb-2 -ml-2" />
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 -mb-2 -mr-2" />
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Viewfinder Overlay */}
                {!capturedImage && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[80%] h-[70%] border-2 border-white/30 rounded-2xl relative shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                      <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl" />
                      <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl" />
                      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl" />
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-emerald-500 rounded-br-xl" />
                      
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-500/20" />
                      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-500/20" />

                      <p className="absolute bottom-8 left-0 right-0 text-center text-xs text-white/60 font-black uppercase tracking-[0.3em]">
                        Center Document in Frame
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="h-32 bg-black flex items-center justify-between px-10 gap-6 border-t border-white/5">
                <button 
                  disabled={isEnhancing}
                  onClick={stopScanning}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors disabled:opacity-20"
                >
                  <X size={16} />
                  Cancel
                </button>

                {!capturedImage ? (
                  <button 
                    onClick={captureImage}
                    className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white group-active:scale-95 transition-transform" />
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button 
                      disabled={isEnhancing}
                      className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all disabled:opacity-20"
                      onClick={() => { setCapturedImage(null); startScanning(); }}
                    >
                      <RefreshCw size={14} className={isEnhancing ? 'animate-spin' : ''} />
                      Retake
                    </button>
                    <button 
                      disabled={isEnhancing}
                      onClick={saveScan}
                      className="flex items-center gap-2 bg-emerald-500 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_0_20px_#10B981] disabled:opacity-50"
                    >
                      {isEnhancing ? (
                        <>
                          <Sparkles size={14} className="animate-pulse" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={14} />
                          Secure & Save
                        </>
                      )}
                    </button>
                  </div>
                )}

                <div className="w-20 hidden md:block" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Module Explorer Overlay */}
        <AnimatePresence>
          {activeModule && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-50 bg-[#0F2440] flex flex-col shadow-2xl"
            >
              <div className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-white/10 bg-black/20">
                <button 
                  onClick={() => setActiveModule(null)}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <ChevronLeft size={16} />
                  Back to Hub
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-black animate-pulse uppercase tracking-tighter">Live Relay</span>
                  <button onClick={() => setActiveModule(null)} className="p-1 border border-white/10 rounded hover:bg-white/5">
                    <X size={16} className="text-white/40" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20">
                      {activeModule === 'legal' && <Scale className="text-emerald-400" size={40} />}
                      {activeModule === 'shelter' && <MapPin className="text-emerald-400" size={40} />}
                      {activeModule === 'medical' && <Heart className="text-emerald-400" size={40} />}
                      {activeModule === 'chat' && <Users className="text-emerald-400" size={40} />}
                      {activeModule === 'jobs' && <Briefcase className="text-emerald-400" size={40} />}
                      {activeModule === 'census' && <Activity className="text-emerald-400" size={40} />}
                      {activeModule === 'profile' && <User className="text-emerald-400" size={40} />}
                    </div>
                    <div>
                      <h2 className="text-4xl font-black tracking-tighter capitalize">{activeModule === 'legal' ? t.legal : activeModule === 'shelter' ? t.shelter : activeModule === 'medical' ? t.medical : activeModule === 'chat' ? t.chat : activeModule === 'jobs' ? t.jobs : activeModule === 'census' ? t.census : ''}</h2>
                      <p className="text-white/40 uppercase tracking-[0.2em] font-bold text-xs mt-1">Resource Repository • India Node</p>
                    </div>
                  </div>
                  
                  {renderModuleContent()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Existing Layout... */}
        {/* Header Navigation */}
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-8 bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
          <div 
            onClick={() => { setActiveModule(null); setIsBotOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col -space-y-1">
              <h1 className="text-lg font-bold tracking-tight text-white leading-tight">{t.title}</h1>
              <p className="text-[9px] uppercase tracking-widest text-emerald-400 font-extrabold">India Relay Node</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isOnline ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-amber-500/20 border-amber-500/30'}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
              <span className={`text-[11px] font-medium uppercase tracking-wider ${isOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isOnline ? t.offlineReady : 'Local Node Active'}
              </span>
            </div>
            <LanguageToggle current={lang} onChange={setLang} />
          </div>
        </header>

        <main className="flex-1 p-6 grid grid-cols-12 gap-6 overflow-y-auto custom-scrollbar">
          
          {/* --- Left Column: Search & Vault --- */}
          <div className="col-span-3 flex flex-col gap-6">
            <div 
              onClick={() => setActiveModule('profile')}
              className="bg-gradient-to-br from-[#0F2440] to-[#1A365D] border border-white/10 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-all group shadow-xl"
            >
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30 group-hover:bg-emerald-500/30 transition-colors">
                <User size={24} className="text-emerald-400" />
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="text-xs font-black text-white truncate">{userProfile.name}</h4>
                <p className="text-[9px] text-white/40 uppercase tracking-widest font-black truncate">{t.profile}</p>
              </div>
              <Settings size={14} className="text-white/20 group-hover:text-emerald-400 transition-colors" />
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4">
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-emerald-500/50 transition-all text-white"
                />
                <Search className="w-4 h-4 absolute left-3 top-2.5 opacity-50" />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-1">{t.nearbyResources}</p>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {filteredNGOs.map(ngo => (
                    <div 
                      key={ngo.id} 
                      onClick={() => handleNGOFocus(ngo.id)}
                      className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold group-hover:text-emerald-300 transition-colors">{ngo.name}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">{ngo.distance}</span>
                      </div>
                      <p className="text-[10px] text-white/60 mt-1 uppercase tracking-tighter">{ngo.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#0F2440] border border-white/10 rounded-2xl p-4 flex-1 flex flex-col shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold flex items-center gap-2 uppercase tracking-wide">
                  <FileLock className="w-4 h-4 text-emerald-400" />
                  {t.vault}
                </h2>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-black">ENCRYPTED</span>
              </div>
              
              <div className="flex gap-2 mb-4">
                <div 
                  onClick={handleUpload}
                  className={`flex-1 border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer ${isUploading ? 'bg-white/5 border-emerald-500/50' : 'border-white/10 hover:bg-white/5'}`}
                >
                  {!isUploading ? (
                    <>
                      <Upload className="w-5 h-5 text-white/20 mx-auto mb-1" />
                      <p className="text-[10px] text-white/40 font-medium">{t.upload}</p>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] text-emerald-400 font-black">
                        <span>SYNCING</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <motion.div animate={{ width: `${uploadProgress}%` }} className="h-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={startScanning}
                  className="flex flex-col items-center justify-center gap-1 border-2 border-dashed border-white/10 rounded-xl px-4 hover:bg-white/5 transition-all text-white/40 hover:text-emerald-400 group"
                >
                  <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-medium uppercase tracking-tighter">{t.scan}</span>
                </button>
              </div>

              <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                {[
                  { name: "Passport_Scan.pdf", icon: "📄", type: "ID" },
                  { name: "Travel_Permit.jpg", icon: "🖼️", type: "ENTRY" }
                ].map(doc => (
                  <div key={doc.name} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/5">
                    <div className="w-8 h-8 bg-blue-500/20 flex items-center justify-center rounded text-sm">{doc.icon}</div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[11px] font-bold truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[8px] bg-sky-500/20 text-sky-400 px-1.5 rounded tracking-widest font-black uppercase">{doc.type}</span>
                        <span className="text-[8px] text-white/30 uppercase font-black">Local</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- Middle Column: Safe Harbor & Impact Census --- */}
          <div className="col-span-5 flex flex-col gap-6">
            {/* Impact Census Section */}
            <div 
              onClick={() => setActiveModule('census')}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group shadow-lg cursor-pointer hover:bg-white/10 transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
              <h2 className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2">
                <Activity size={12} className="text-emerald-400" />
                {t.censusTitle}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className={`text-2xl font-light ${stat.color} tracking-tighter`}>{stat.value}</p>
                    <p className="text-[9px] text-white/40 mt-1 tracking-widest uppercase font-bold">{(t as any)[stat.label]}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-4">
                 {[
                   { label: "Community Aid Distributed", progress: 84, color: "bg-emerald-500" },
                   { label: "India Region Coverage", progress: 72, color: "bg-sky-400" }
                 ].map(bar => (
                  <div key={bar.label} className="flex items-center justify-between">
                    <span className="text-[10px] text-white/60 font-bold uppercase tracking-tight">{bar.label}</span>
                    <div className="w-1/2 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${bar.progress}%` }}
                        className={`h-full ${bar.color}`} 
                      />
                    </div>
                  </div>
                 ))}
              </div>
              <div className="mt-4 text-[9px] text-emerald-400 font-black uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity">Click for Origin & Demographic Census →</div>
            </div>

            {/* Safe Harbor Grid */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div 
                onClick={() => setActiveModule('shelter')}
                className="bg-emerald-600/90 rounded-2xl p-5 flex flex-col justify-between shadow-xl shadow-emerald-900/40 border border-emerald-400/30 group hover:shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{t.shelter}</h3>
                  <p className="text-xs text-white/70">{t.shelterDesc}</p>
                </div>
              </div>
              
              <div 
                onClick={() => setActiveModule('medical')}
                className="bg-[#2D4E8C] rounded-2xl p-5 flex flex-col justify-between border border-white/10 group hover:bg-[#3459a1] transition-all cursor-pointer shadow-lg"
              >
                <Heart className="text-sky-300 transition-transform group-hover:scale-110" size={40} strokeWidth={1} />
                <div>
                  <h3 className="text-lg font-extrabold text-white">{t.medical}</h3>
                  <p className="text-xs text-white/50">{t.medicalDesc}</p>
                </div>
              </div>

              <div 
                onClick={() => setActiveModule('legal')}
                className="bg-[#2D4E8C] rounded-2xl p-5 flex flex-col justify-between border border-white/10 group hover:bg-[#3459a1] transition-all cursor-pointer shadow-lg"
              >
                <Shield className="text-sky-300 opacity-60" size={40} strokeWidth={1} />
                <div>
                  <h3 className="text-lg font-extrabold text-white">{t.legal}</h3>
                  <p className="text-xs text-white/50">{t.legalDesc}</p>
                </div>
              </div>

              <div 
                onClick={() => setActiveModule('chat')}
                className="bg-[#2D4E8C] rounded-2xl p-5 flex flex-col justify-between border border-white/10 group hover:bg-[#3459a1] transition-all cursor-pointer shadow-lg"
              >
                <Users className="text-sky-300 opacity-60" size={40} strokeWidth={1} />
                <div>
                  <h3 className="text-lg font-extrabold text-white">{t.chat}</h3>
                  <p className="text-xs text-white/50">{t.chatDesc}</p>
                </div>
              </div>

              <div 
                onClick={() => setActiveModule('jobs')}
                className="col-span-2 bg-[#0F2440] rounded-2xl p-5 flex items-center gap-6 border border-white/10 group hover:bg-[#152e50] transition-all cursor-pointer shadow-lg"
              >
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/30 transition-colors">
                  <Briefcase className="text-emerald-400" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-extrabold text-white">{t.jobs}</h3>
                  <p className="text-xs text-white/50">{t.jobsDesc}</p>
                </div>
                <ChevronRight className="text-white/20 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
          </div>

          {/* --- Right Column: Map & Helplines --- */}
          <div className="col-span-4 flex flex-col gap-6">
            {/* Immersive Map Container */}
            <div className="bg-black/20 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[380px] shadow-2xl">
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <span className="text-xs font-black tracking-widest uppercase">{t.mapTitle}</span>
                <span className="text-[10px] text-emerald-400 font-black animate-pulse flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  LIVE MESH ACTIVE
                </span>
              </div>
              <div className="flex-1 relative bg-[#132B4C] overflow-hidden">
                {/* Simulated Grid Background */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#EBF8FF 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                
                {/* Dynamic Map Elements */}
                {mapFocus && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ left: `${mapFocus.x}%`, top: `${mapFocus.y}%` }}
                    className="absolute w-24 h-24 bg-sky-500/20 border border-sky-400 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"
                  />
                )}

                <div className="absolute top-[40%] left-[30%]">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} className="w-4 h-4 bg-emerald-500 rounded-full border-4 border-emerald-500/20 shadow-[0_0_15px_#10B981]"></motion.div>
                </div>

                <div className="absolute top-[60%] left-[55%]">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full border-4 border-emerald-500/20 shadow-[0_0_15px_#10B981]"></div>
                </div>

                <div className="absolute bottom-[20%] right-[35%] flex flex-col items-center gap-1">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-500/30">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-[8px] font-black uppercase text-white tracking-widest shadow-lg">You</span>
                </div>

                {/* Map Interface Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all font-black">+</button>
                  <button className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all font-black">-</button>
                </div>
              </div>
              <div className="p-4 bg-black/40">
                <div className="flex items-center gap-2 mb-1.5">
                  <MapPin size={10} className="text-emerald-500" />
                  <span className="text-[9px] font-black tracking-wider uppercase text-white/70">Okhla Relay Cluster v9</span>
                </div>
                <p className="text-[10px] text-white/40 leading-tight">Mesh network active. Local resource relay updated via Okhla Station Node.</p>
              </div>
            </div>

            {/* Crisis Helpline Directory */}
            <div className="bg-[#0F2440] border border-rose-500/30 rounded-2xl p-4 flex-1 shadow-xl">
              <h3 className="text-xs font-black mb-4 flex items-center gap-2 text-rose-400 uppercase tracking-widest">
                <PhoneCall size={14} />
                {t.helplines}
              </h3>
              <div className="space-y-2.5 overflow-y-auto max-h-[220px] pr-1 custom-scrollbar">
                {helplines.map(call => (
                  <div key={call.name} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2.5 rounded-xl transition-all border border-transparent hover:border-white/10">
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-extrabold text-white/90 truncate">{call.name}</p>
                      <p className="text-[9px] text-white/40 uppercase font-black truncate">{call.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-xs font-mono font-black text-emerald-400">{call.number}</p>
                      <div className="text-[8px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded uppercase font-black tracking-tighter mt-1">CONNECT</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Status Bar */}
        <footer className="h-8 px-8 bg-black/40 border-t border-white/10 flex-shrink-0 flex items-center justify-between text-[10px] text-white/40 uppercase tracking-widest font-extrabold">
          <div className="flex gap-8">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10B981]"></div>
              R-BRIDGE NODE 2.0.26
            </span>
            <span className="text-emerald-400 opacity-60">Status: {t.nodeStatus}</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Protcol</a>
            <a href="#" className="hover:text-white transition-colors">Mesh Help</a>
          </div>
        </footer>

        {/* Bridge Assistant Float */}
        <div className="fixed bottom-6 right-6 z-[200]">
          <button 
            onClick={() => setIsBotOpen(!isBotOpen)}
            className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-110 active:scale-95 transition-all"
          >
            {isBotOpen ? <X size={20} /> : <MessageCircle size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {isBotOpen && <BridgeAssistant lang={lang} onClose={() => setIsBotOpen(false)} />}
        </AnimatePresence>
      </div>

      {/* Global Aesthetics */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </div>
  );
}
