import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaShoppingCart, FaMoon, FaSun, FaSearch, FaBars, FaHeart } from "react-icons/fa";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/product?search=${search}`);
        }
    };

    return (
        <nav className="bg-black text-white p-4 fixed top-0 left-0 right-0 z-50  ">
            <div className="container mx-auto flex justify-between items-center ">
                <Link to="/" className="text-green-600 text-center text-2xl font-bold flex items-center gap-2">
                    BZE-DZEK БЗЭЗЭДЗЭКӀ
                </Link>
                <div className="flex items-center gap-4 ">
                    <div className="hidden lg:flex items-center gap-4">
                        <Link to="/" className="hover:text-purple-600 transition">
                            Ana Sayfa
                        </Link>
                        {user ? (
                            <>
                                <span className="text-purple-300 rext-sm"> Hoşgeldin,{user.username} </span><button onClick={() => { logout(); navigate('/') }}>Çıkış</button>
                            </>
                        ) : (
                            <>
                                <Link to='/login' className="hover:text-purple-600 transition">
                                    Giriş
                                </Link>
                                <Link to='/register' className="hover:text-purple-600 transition">
                                    Kayıt ol
                                </Link>
                            </>
                        )
                        }
                    </div>
                    <button className="lg:hidden" onClick={() => { setIsMenuOpen(!isMenuOpen) }}>
                        <FaBars />
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="bg-gray-900 lg:hidden p-4">
                    <Link to="/" className="block py-2 hover:text-purple-600 transition">
                        Ana Sayfa
                    </Link>
                    {user ? (
                        <>
                            <span className="text-purple-300 rext-sm"> Hoşgeldin,{user.username} </span><button onClick={() => { logout(); navigate('/') }}>Çıkış</button>
                        </>
                    ) : (
                        <>
                            <Link to='/login' className="block py-2 hover:text-purple-600 transition">
                                Giriş
                            </Link>
                            <Link to='/register' className="block py-2 hover:text-purple-600 transition">
                                Kayıt ol
                            </Link>
                        </>
                    )
                    }
                </div>
            )}
        </nav>
    );
}

export default Navbar;