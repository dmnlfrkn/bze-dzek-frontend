import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaUser, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-black/95 backdrop-blur-md text-white p-4 fixed top-0 left-0 right-0 z-50 border-b border-white/10">
            <div className="container mx-auto flex justify-between items-center ">
                <Link to="/" className="text-green-600 text-center text-2xl font-bold flex items-center gap-2 hover:text-green-500 transition-colors">
                    BZE-DZEK БЗЭЗЭДЗЭКӀ
                </Link>
                <div className="flex items-center gap-4 ">
                    <div className="hidden lg:flex items-center gap-4">
                        <Link to="/" className="hover:text-green-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                            Ana Sayfa
                        </Link>
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                                    <FaUser className="text-green-400" />
                                    <span className="text-green-300 text-sm">Hoşgeldin, {user.username}</span>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                >
                                    <FaSignOutAlt />
                                    Çıkış
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to='/login' className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all">
                                    Giriş
                                </Link>
                                <Link to='/register' className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    Kayıt ol
                                </Link>
                            </div>
                        )
                        }
                    </div>
                    <button 
                        className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors" 
                        onClick={() => { setIsMenuOpen(!isMenuOpen) }}
                    >
                        <FaBars />
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="bg-gray-900/95 backdrop-blur-md lg:hidden p-4 border-t border-white/10">
                    <Link 
                        to="/" 
                        className="block py-3 px-3 hover:text-green-400 hover:bg-white/10 rounded-lg transition-all"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Ana Sayfa
                    </Link>
                    {user ? (
                        <div className="space-y-2 mt-2">
                            <div className="flex items-center gap-2 py-2 px-3 bg-white/10 rounded-lg">
                                <FaUser className="text-green-400" />
                                <span className="text-green-300 text-sm">Hoşgeldin, {user.username}</span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 py-3 px-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                            >
                                <FaSignOutAlt />
                                Çıkış
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2 mt-2">
                            <Link 
                                to='/login' 
                                className="block py-3 px-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Giriş
                            </Link>
                            <Link 
                                to='/register' 
                                className="block py-3 px-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Kayıt ol
                            </Link>
                        </div>
                    )
                    }
                </div>
            )}
        </nav>
    );
}

export default Navbar;