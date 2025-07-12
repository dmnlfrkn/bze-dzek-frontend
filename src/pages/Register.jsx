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
            const response = await fetch('https://flask-python-template.vercel.app/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess('Kayıt başarılı. Giriş Yapılıyor');

                const loginresponse = await fetch('https://flask-python-template.vercel.app/login', {
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
        <div className="min-h-screenflex flex-col items-center justify-start pt-20 ">
            <div className="w-full flex bg-white/5 backdrop-blur-md rounded-none shadow-2xl">
                <div className="relative flex-1 p-8 text-center text-white p-20">
                    <h1 className="text-3xl font-bold mb-4">Çerkesçeyi anlamak artık çok kolay!</h1>
                    <p className="text-lg mb-4">Dilinize sahip çıkmak için ilk adımı atın.</p>
                    <p className="text-center text-m mt-4 text-gray-100 leading-[2.2]">
                        Çerkesçe–Türkçe çeviri platformumuz, dil işleme teknolojileriyle geliştirilmiş bir araçtır. <br/>
                        Kullanıcılara hızlı ve doğru çeviri sunarak, dil öğrenme sürecini kolaylaştırmayı ve <br/> kültürel içeriklere erişimi artırmayı hedefler.
                    </p>
                </div>
                <div className="flex-1  text-white p-20">
                    <h2 className="text-xl font-semibold mb-6 text-center">Kayıt Formu</h2>
                    {error && (
                        <div className="bg-red-100 text-red-800 px-3 py-2 rounded-md text-sm mb-4 text-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-100 text-green-800 px-3 py-2 rounded-md text-sm mb-4 text-center">
                            {success}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Kullanıcı Adı"
                            className="text-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Şifre"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm"
                        >
                            Kayıt Ol
                        </button>
                    </form>
                    <p className="text-center text-sm mt-4 text-gray-400">
                        Zaten hesabınız var mı?{' '}
                        <Link to="/login" className="text-green-600 font-bold hover:underline">
                            Giriş Yap
                        </Link>
                    </p>
                    <p className="text-center text-sm mt-4 text-gray-400" >
                        Bir hesap oluşturarak <Link to="/policy" className="text-green-600 font-bold hover:underline">Hizmet Şartları</Link>'nı kabul etmiş olursunuz.
                        BZE-DZEK'ın gizlilik uygulamaları hakkında daha fazla bilgi için <Link to="/policy#security" className="text-green-600 font-bold hover:underline">BZE-DZEK Gizlilik Beyanı</Link>'na bakın.
                        Size zaman zaman hesabınızla ilgili e-postalar göndereceğiz.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
