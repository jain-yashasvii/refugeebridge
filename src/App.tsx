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
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Types ---

type Language = 'en' | 'ar' | 'hi' | 'ur' | 'ne' | 'bn' | 'ta';
type ModuleId = 'shelter' | 'medical' | 'legal' | 'chat' | 'jobs' | 'census' | null;

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
    nodeStatus: "Secure Local Relay"
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
    nodeStatus: "مرحل محلي آمن"
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
    nodeStatus: "सुरक्षित स्थानीय रिले"
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
    nodeStatus: "محفوظ مقامی سپلائر"
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
    nodeStatus: "सुरक्षित स्थानीय रिले"
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
    nodeStatus: "নিরাপদ স্থানীয় রিলে"
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
    nodeStatus: "பாதுகாப்பான உள்ளூர் ரிலே"
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
  const [mapFocus, setMapFocus] = useState<{ x: number, y: number } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  
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

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'legal':
        return (
          <div className="space-y-6">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex gap-3">
              <Info className="text-emerald-400 shrink-0" size={20} />
              <p className="text-xs text-emerald-100 flex-1">
                India is not a signatory to the 1951 Refugee Convention, so protection is primarily managed via the UNHCR and the Ministry of Home Affairs (MHA).
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <FileBadge className="text-sky-400 mb-3" size={24} />
                <h4 className="font-bold text-sm mb-2">UNHCR Card Registration</h4>
                <p className="text-[11px] text-white/50 leading-relaxed">The UNHCR Refugee Card provides international recognition. Registration is available in Delhi, Chennai, and Mumbai centres.</p>
                <button className="mt-4 text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:underline">View Steps →</button>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <Scale className="text-sky-400 mb-3" size={24} />
                <h4 className="font-bold text-sm mb-2">Long Term Visa (LTV)</h4>
                <p className="text-[11px] text-white/50 leading-relaxed">Necessary for valid residency, bank account opening, and legal employment in India for specific nationalities.</p>
                <button className="mt-4 text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:underline">Apply Online →</button>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-xl">
              <h4 className="font-bold text-sm text-rose-300 mb-2">Emergency Legal Aid</h4>
              <p className="text-[11px] text-white/50 mb-4">Facing detention or documentation issues? Connect with ARA Trust specialized lawyers.</p>
              <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-emerald-400">HOTLINE: +91 11 2690 1234</span>
                <span className="text-[9px] bg-rose-500 text-white px-2 py-0.5 rounded uppercase font-black">Call Now</span>
              </div>
            </div>
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
          </div>
        );
      case 'medical':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-center">
                <Stethoscope className="mx-auto mb-2 text-emerald-400" size={32} />
                <p className="text-xs font-bold uppercase tracking-widest">Free Clinic Index</p>
              </div>
              <div className="bg-sky-500/10 p-4 rounded-xl border border-sky-500/20 text-center">
                <Heart className="mx-auto mb-2 text-sky-400" size={32} />
                <p className="text-xs font-bold uppercase tracking-widest">Vaccination Sites</p>
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h4 className="text-sm font-bold mb-3">Nearest Primary Care</h4>
              <p className="text-[11px] text-white/50 mb-3">MHS India partner clinics provide free consultations for valid card holders.</p>
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
                <MapPin size={12} /> Delhi North Zone A-12
              </div>
            </div>
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
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
