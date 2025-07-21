import { useState, useEffect, useRef } from "react";
import {
  FaExchangeAlt,
  FaCopy,
  FaVolumeUp,
  FaHistory,
  FaTimes,
  FaKeyboard,
  FaChevronDown,
} from "react-icons/fa";

function Translate() {
  const [sourceLang, setSourceLang] = useState("Türkçe");
  const [targetLang, setTargetLang] = useState("Çerkesce (Doğu)");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  // Dil seçenekleri (frontend tarafında sabit)
  const LANG_OPTIONS = ["Türkçe", "Çerkesce (Doğu)", "İngilizce"];

  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const maxChars = 5000;

  const getAvailableTargetLangs = (source) => {
    if (source === "Türkçe" || source === "İngilizce") {
      return ["Çerkesce (Doğu)"];
    } else if (source === "Çerkesce (Doğu)") {
      return ["Türkçe", "İngilizce"];
    }
    return [];
  };

  useEffect(() => {
    const available = getAvailableTargetLangs(sourceLang);
    if (!available.includes(targetLang)) {
      setTargetLang(available[0]);
    }
  }, [sourceLang]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("translationHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("translationHistory", JSON.stringify(history));
  }, [history]);

  // Show/hide scroll button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show button if not at bottom and there's content below
      setShowScrollButton(scrollTop + windowHeight < documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update character count
  useEffect(() => {
    setCharCount(input.length);
  }, [input]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "Enter":
            e.preventDefault();
            handleTranslate();
            break;
          case "k":
            e.preventDefault();
            handleSwap();
            break;
          case "l":
            e.preventDefault();
            handleClear();
            break;
          case "h":
            e.preventDefault();
            setShowHistory(!showHistory);
            break;
        }
      }
      if (e.key === "Escape") {
        setShowHistory(false);
        setShowShortcuts(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showHistory, input]);

  const handleTranslate = async () => {
    if (sourceLang === targetLang) {
      setOutput("Kaynak ve hedef dil farklı olmalıdır.");
      return;
    }
    if (!input.trim()) {
      setOutput("Lütfen çevirilecek metni giriniz.");
      return;
    }

    if (input.length > maxChars) {
      setOutput(
        `Metin çok uzun. Maksimum ${maxChars} karakter girebilirsiniz.`
      );
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const endpoint = token ? "/translateByLogin" : "/translate";
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const res = await fetch(`http://127.0.0.1:5001${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          text: input,
          source_lang: sourceLang,
          target_lang: targetLang,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setOutput(`Hata: ${data.error}`);
      } else {
        const translation = data.çeviri;
        setOutput(translation);

        // Add to history
        const newHistoryItem = {
          id: Date.now(),
          input: input,
          output: translation,
          sourceLang,
          targetLang,
          timestamp: new Date().toLocaleString("tr-TR"),
        };

        setHistory((prev) => [newHistoryItem, ...prev.slice(0, 19)]); // Keep last 20 translations
      }
    } catch (err) {
      console.error("HATA:", err.message);
      setOutput("Çeviri hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInput(output);
    setOutput("");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    inputRef.current?.focus();
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Kopyalandı!");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      setCopySuccess("Kopyalama başarısız");
      setTimeout(() => setCopySuccess(""), 2000);
    }
  };

  const handleHistorySelect = (item) => {
    setInput(item.input);
    setOutput(item.output);
    setSourceLang(item.sourceLang);
    setTargetLang(item.targetLang);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setHistory([]);
    setShowHistory(false);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start pt-24 p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-6xl border border-white/20">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-white text-3xl font-bold">Çerkesce Çeviri</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowShortcuts(!showShortcuts)}
                className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
                title="Klavye Kısayolları"
              >
                <FaKeyboard />
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
                title="Çeviri Geçmişi (Ctrl+H)"
              >
                <FaHistory />
              </button>
            </div>
          </div>

          {/* Keyboard Shortcuts Modal */}
          {showShortcuts && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4 border border-white/20">
                <h3 className="text-white text-xl font-bold mb-4">
                  Klavye Kısayolları
                </h3>
                <div className="space-y-2 text-white">
                  <div className="flex justify-between">
                    <span>Çevir:</span>
                    <kbd className="bg-white/20 px-2 py-1 rounded text-sm">
                      Ctrl + Enter
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Dil Değiştir:</span>
                    <kbd className="bg-white/20 px-2 py-1 rounded text-sm">
                      Ctrl + K
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Temizle:</span>
                    <kbd className="bg-white/20 px-2 py-1 rounded text-sm">
                      Ctrl + L
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Geçmiş:</span>
                    <kbd className="bg-white/20 px-2 py-1 rounded text-sm">
                      Ctrl + H
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Kapat:</span>
                    <kbd className="bg-white/20 px-2 py-1 rounded text-sm">
                      Esc
                    </kbd>
                  </div>
                </div>
                <button
                  onClick={() => setShowShortcuts(false)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Kapat
                </button>
              </div>
            </div>
          )}

          {/* History Modal */}
          {showHistory && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-xl font-bold">
                    Çeviri Geçmişi
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={clearHistory}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                    >
                      Temizle
                    </button>
                    <button
                      onClick={() => setShowHistory(false)}
                      className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {history.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">
                      Henüz çeviri geçmişi yok
                    </p>
                  ) : (
                    history.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleHistorySelect(item)}
                        className="bg-white/10 p-3 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs text-gray-400">
                            {item.sourceLang} → {item.targetLang}
                          </span>
                          <span className="text-xs text-gray-400">
                            {item.timestamp}
                          </span>
                        </div>
                        <p className="text-white text-sm truncate">
                          {item.input}
                        </p>
                        <p className="text-green-400 text-sm truncate">
                          {item.output}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Language Selection */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 max-w-xs">
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full bg-black/60 border border-white/20 rounded-lg p-3 text-white font-medium text-center appearance-none"
              >
                {LANG_OPTIONS.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwap}
              className="mx-4 p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-200 hover:scale-105"
              title="Dilleri Değiştir (Ctrl+K)"
            >
              <FaExchangeAlt />
            </button>

            <div className="flex-1 max-w-xs">
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full bg-black/60 border border-white/20 rounded-lg p-3 text-white font-medium text-center appearance-none"
              >
                {getAvailableTargetLangs(sourceLang).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Translation Areas */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Input Area */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-white font-medium">Metin</label>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm ${
                      charCount > maxChars * 0.9
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                  >
                    {charCount}/{maxChars}
                  </span>
                  <button
                    onClick={handleClear}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Temizle (Ctrl+L)"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              </div>
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Metni giriniz... (Ctrl+Enter ile çevir)"
                  className="w-full h-40 p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  maxLength={maxChars}
                />
                {input && (
                  <button
                    onClick={() => handleCopy(input)}
                    className="absolute bottom-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                    title="Kopyala"
                  >
                    <FaCopy size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Output Area */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-white font-medium">Çeviri</label>
                {copySuccess && (
                  <span className="text-green-400 text-sm animate-fade-in">
                    {copySuccess}
                  </span>
                )}
              </div>
              <div className="relative">
                <textarea
                  ref={outputRef}
                  value={output}
                  readOnly
                  placeholder="Çeviri burada görünecek..."
                  className="w-full h-40 p-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none"
                />
                {output && (
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <button
                      onClick={() => handleCopy(output)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="Kopyala"
                    >
                      <FaCopy size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleTranslate}
              disabled={loading || !input.trim()}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Çevriliyor...
                </div>
              ) : (
                "Çevir (Ctrl+Enter)"
              )}
            </button>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-white font-medium mb-2">💡 İpuçları:</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>
                • Klavye kısayollarını kullanarak daha hızlı çeviri
                yapabilirsiniz
              </li>
              <li>• Çeviri geçmişiniz otomatik olarak kaydedilir</li>
              <li>• Uzun metinler için parça parça çeviri yapmanız önerilir</li>
              <li>
                • Giriş yaparak daha gelişmiş çeviri özelliklerinden
                yararlanabilirsiniz
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-6 left-6 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-110 z-40"
          title="Sayfanın altına git"
        >
          <FaChevronDown className="text-lg" />
        </button>
      )}
    </>
  );
}

export default Translate;
