import { FaFacebook, FaTwitter, FaInstagram, FaGit, FaGithub, FaLinkedin } from "react-icons/fa";


function Footer() {
    return (
        <footer className=" text-white p-4 mt-8 w-full bg-black">
            <div className="container mx-auto grid grid-cols-2 gap-4 text-sm justify-between">
                <div>
                    <h3 className="text-green-600 text-base font-bold mb-2">
                        BZE-DZEK БЗЭЗЭДЗЭКӀ
                    </h3>
                    <p>Hasbelkader Çeviri Programı.</p>
                </div>
                <div className="text-right">
                    <h3 className="text-base font-bold mb-2">
                        Bizi Takip Edin
                    </h3>
                    <div className="flex gap-6 justify-end">
                        <a href="#" className="text-lg hover:text-red-400"><FaLinkedin /></a>
                        <a href="#" className="text-lg hover:text-red-400"><FaGithub /></a>
                        <a href="#" className="text-lg hover:text-red-400"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 border-t border-white/20 pt-2 text-sm">
                <p>
                    cCc 2025 <span className="text-green-600">
                        BZE-DZEK БЗЭЗЭДЗЭКӀ
                    </span> Tüm hakları satılıktır.
                </p>
            </div>
        </footer>
    );
}

export default Footer;