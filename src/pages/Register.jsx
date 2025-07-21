import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await fetch('https://flask-hello-world-ifgc.onrender.com/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess('Kayıt başarılı. Giriş Yapılıyor');

                const loginresponse = await fetch('https://flask-hello-world-ifgc.onrender.com/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
                const logindata = await loginresponse.json();
                if (loginresponse.ok) {
                    localStorage.setItem('token', logindata.access_token);
                    login(username);
                    setTimeout(() => navigate('/'), 2000);
                } else {
                    setError(logindata.message);
                }
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Kayıt başarısız, lütfen tekrar deneyin.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4">
            <h3 className="text-3xl font-bold mb-6 text-center text-white">Çerkesce Çeviri Ailesine Katılın</h3>
            <div className="w-full max-w-6xl flex bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="relative flex-1 p-8 lg:p-20 text-center text-white bg-gradient-to-br from-green-600/20 to-transparent">
                    <h1 className="text-3xl font-bold mb-6">Çerkesçeyi anlamak artık çok kolay!</h1>
                    <p className="text-xl mb-6 text-green-200">Dilinize sahip çıkmak için ilk adımı atın.</p>
                    <div className="space-y-4 text-gray-200 leading-relaxed">
                        <p>
                        Çerkesçe–Türkçe çeviri platformumuz, dil işleme teknolojileriyle geliştirilmiş bir araçtır. <br/>
                        Kullanıcılara hızlı ve doğru çeviri sunarak, dil öğrenme sürecini kolaylaştırmayı ve <br/> kültürel içeriklere erişimi artırmayı hedefler.
                        </p>
                        <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
                            <h3 className="font-semibold mb-2 text-green-300">Platform Özellikleri:</h3>
                            <ul className="text-sm space-y-1 text-left">
                                <li>• Yapay zeka destekli çeviri</li>
                                <li>• Çeviri geçmişi kaydetme</li>
                                <li>• Klavye kısayolları</li>
                                <li>• Mobil uyumlu tasarım</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex-1 text-white p-8 lg:p-20">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Kayıt Formu</h2>
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm mb-4 text-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm mb-4 text-center">
                            {success}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Kullanıcı Adı"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Şifre"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            Kayıt Ol
                        </button>
                    </form>
                    <p className="text-center text-sm mt-6 text-gray-400">
                        Zaten hesabınız var mı?{' '}
                        <Link to="/login" className="text-green-400 font-medium hover:text-green-300 hover:underline transition-colors">
                            Giriş Yap
                        </Link>
                    </p>
                    <p className="text-center text-xs mt-6 text-gray-500 leading-relaxed">
                        Bir hesap oluşturarak <Link to="/policy" className="text-green-400 hover:text-green-300 hover:underline transition-colors">Hizmet Şartları</Link>'nı kabul etmiş olursunuz.
                        BZE-DZEK'ın gizlilik uygulamaları hakkında daha fazla bilgi için <Link to="/policy#security" className="text-green-400 hover:text-green-300 hover:underline transition-colors">BZE-DZEK Gizlilik Beyanı</Link>'na bakın.
                        Size zaman zaman hesabınızla ilgili e-postalar göndereceğiz.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
