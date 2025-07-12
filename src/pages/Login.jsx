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
            const loginresponse = await fetch('https://flask-python-template.vercel.app/login', {
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
        <div className="min-h-screenflex flex-col items-center justify-start pt-20 ">
            <h3 className="text-3xl font-bold mb-4 text-center text-white">Çerkesce Çevirinin Merkezi</h3>
            <div className="w-full flex bg-white/5 backdrop-blur-md rounded-none shadow-2xl">
                <div className="flex-1  text-white p-20">
                    <h1 className="text-xl font-semibold mb-6 text-center">
                        Giriş
                    </h1>
                    {error && (
                        <div className="bg-red-100 text-red-800 px-3 py-2 rounded-md text-sm mb-4 text-center">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="kullanıcı adı"
                            className="text-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                        />
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Şifre"
                            className="text-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                        />
                        <button type="submit"
                            className="w-full bg-green-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm"
                        >
                            Giriş Yap
                        </button>
                    </form>
                    <p className="text-center text-sm mt-4 text-gray-400">
                        Şifrenizi mi unuttunuz {' '}
                        <Link to="/login" className="text-green-600 font-bold hover:underline">
                            Şifre Al
                        </Link>
                    </p>
                </div>
                <div className="relative flex-1 p-8 text-center text-white p-20">
                    <h1 className="text-3xl font-bold mb-12 "></h1>
                    <p className="text-2xl mb-4">Çerkes diline ve kültürüne dijital köprü....</p>
                    <p className="text-center text-m mt-4 text-gray-100 leading-[2.2]" >
                        Çerkesçeyi öğrenenler için pratik bir çeviri kaynağı!<br/>
                        Kelimeleri, cümleleri ya da metinleri girin; saniyeler içinde Türkçesini görün.<br/>
                        Öğrenmenin en kolay yollarından biri artık elinizin altında.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
