import { FaGithub, FaLinkedin, FaInstagram, FaHeart } from "react-icons/fa";

function Footer() {
    return (
        <footer className="text-white p-6 mt-16 w-full bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div>
                        <h3 className="text-green-600 text-lg font-bold mb-3">
                            BZE-DZEK БЗЭЗЭДЗЭКӀ
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-2">
                            Çerkes diline ve kültürüne dijital köprü. Modern teknoloji ile geleneksel dili buluşturan çeviri platformu.
                        </p>
                        <p className="text-gray-400 text-sm">
                            Hasbelkader Çeviri Programı.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white text-base font-bold mb-3">
                            Özellikler
                        </h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>• Hızlı ve doğru çeviri</li>
                            <li>• Çeviri geçmişi</li>
                            <li>• Klavye kısayolları</li>
                            <li>• Mobil uyumlu tasarım</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-base font-bold mb-3">
                            Bizi Takip Edin
                        </h3>
                        <div className="flex gap-4 mb-4">
                            <a href="#" className="text-2xl hover:text-green-400 transition-colors transform hover:scale-110">
                                <FaLinkedin />
                            </a>
                            <a href="#" className="text-2xl hover:text-green-400 transition-colors transform hover:scale-110">
                                <FaGithub />
                            </a>
                            <a href="#" className="text-2xl hover:text-green-400 transition-colors transform hover:scale-110">
                                <FaInstagram />
                            </a>
                        </div>
                        <p className="text-gray-400 text-xs">
                            Geri bildirimleriniz bizim için değerli
                        </p>
                    </div>
                </div>
                <div className="border-t border-white/20 mt-6 pt-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © 2025 <span className="text-green-600 font-medium">BZE-DZEK БЗЭЗЭДЗЭКӀ</span> - Tüm hakları saklıdır.
                        </p>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                            Çerkes kültürü için <FaHeart className="text-red-500" /> ile yapıldı
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;