import { useState } from 'react'

function Translate() {
  const [sourceLang, setSourceLang] = useState('Türkçe');
  const [targetLang, setTargetLang] = useState('Çerkesce (Doğu)');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleTranslate = async () => {
    if (!input.trim()) {
      setOutput('Lütfen çevirilecek metni giriniz.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await fetch("https://flask-hello-world-ifgc.onrender.com/translateByLogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            text: input,
            source_lang: sourceLang,
            target_lang: targetLang
          })
        });
        const data = await res.json();

        if (data.error) {
          setOutput(`Hata: ${data.error}`);
        } else {
          setOutput(data.çeviri);
        }
      }
      else {
        const res = await fetch("https://flask-hello-world-ifgc.onrender.com/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: input,
            source_lang: sourceLang,
            target_lang: targetLang
          })
        });
        const data = await res.json();

        if (data.error) {
          setOutput(`Hata: ${data.error}`);
        } else {
          setOutput(data.çeviri);
        }
      }


    } catch (err) {
      console.error("HATA:", err.message);
      setOutput('Çeviri hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };


  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setOutput('');
  };

  return (
    <div className="min-h-screenflex flex-col items-center justify-start pt-24 p-4">
      <div className="bg-white/5 rounded-lg shadow-lg p-6 w-full">
        <h1 className="text-white text-2xl font-bold text-center mb-4">Çerkesce Çeviri</h1>
        <div className="flex justify-between mb-4">
          <div className="w-5/12">
            <label
              className="mt-1 block w-full p-2 border text-white font-bold border-gray-300 rounded-md"
            >
              {sourceLang}
            </label>
          </div>
          <button
            onClick={handleSwap}
            className="mt-1 px-5 py-1 bg-green-600 font-bold text-white rounded hover:bg-blue-600"
          >
            ↔
          </button>
          <div className="w-5/12">
            <label
              className="mt-1 block w-full p-2 border text-white font-bold border-gray-300 rounded-md"
            >
              {targetLang}
            </label>
          </div>
        </div>
        <div className='flex justify-between mb-4'>
          <div className="mb-4 w-full mr-2">
            <label className="block text-sm font-medium font-bold text-white">Metin</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Metni giriniz..."
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-50 text-white"
            />
          </div>
          <div className="mb-4 w-full ml-2">
            <label className="block text-sm font-medium font-bold text-white">Çeviri</label>
            <textarea
              value={output}
              readOnly
              placeholder="Çeviri burada gözükecek."
              className="mt-1 block w-full p-2  border border-gray-300 rounded-md h-50 text-white"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleTranslate}
            className="w-70 text-xl px-4 py-2 bg-green-600 text-white rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? 'Çevriliyor...' : 'Çevir'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Translate;
