import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const loginresponse = await fetch('https://dmnlfrkn-bze-dzek-backend.onrender.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const logindata = await loginresponse.json();
            if (loginresponse.ok) {
                localStorage.setItem('token', logindata.access_token);
                login(username);
                navigate('/');
            } else {
                setError(logindata.message);
            }

        }
        catch (err) {
            setError("Giriş başarısız lütfen tekrar deneyin");
        }
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4">
            <h3 className="text-3xl font-bold mb-6 text-center text-white">Çerkesce Çevirinin Merkezi</h3>
            <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="flex-1 text-white p-6 lg:p-20 order-1 lg:order-1">
                    <h1 className="text-2xl font-semibold mb-6 text-center">
                        Giriş
                    </h1>
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm mb-4 text-center">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="kullanıcı adı"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Şifre"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                        <button type="submit"
                            className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            Giriş Yap
                        </button>
                    </form>
                    <p className="text-center text-sm mt-6 text-gray-400">
                        Şifrenizi mi unuttunuz {' '}
                        <Link to="/login" className="text-green-400 font-medium hover:text-green-300 hover:underline transition-colors">
                            Şifre Al
                        </Link>
                    </p>
                </div>
                <div className="relative flex-1 p-6 lg:p-20 text-center text-white bg-gradient-to-br from-green-600/20 to-transparent order-2 lg:order-2">
                    <h1 className="text-3xl font-bold mb-8">Hoş Geldiniz</h1>
                    <p className="text-xl mb-6 text-green-200">Çerkes diline ve kültürüne dijital köprü</p>
                    <div className="space-y-4 text-gray-200 leading-relaxed">
                        <p>
                        Çerkesçeyi öğrenenler için pratik bir çeviri kaynağı!<br/>
                        Kelimeleri, cümleleri ya da metinleri girin; saniyeler içinde Türkçesini görün.<br/>
                        Öğrenmenin en kolay yollarından biri artık elinizin altında.
                        </p>
                        <div className="mt-6 lg:mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
                            <h3 className="font-semibold mb-2 text-green-300">Giriş Yaparak:</h3>
                            <ul className="text-sm space-y-1 text-left">
                                <li>• Çeviri geçmişinizi kaydedin</li>
                                <li>• Gelişmiş çeviri özelliklerini kullanın</li>
                                <li>• Kişiselleştirilmiş deneyim yaşayın</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
