import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 text-center">
            <div className="max-w-6xl mx-auto px-4">
                <ul className="flex justify-center gap-5 mb-5 list-none p-0">
                    <li className="cursor-pointer hover:underline">Terms Of Use</li>
                    <li className="cursor-pointer hover:underline">Privacy-Policy</li>
                    <li className="cursor-pointer hover:underline">About</li>
                    <li className="cursor-pointer hover:underline">Blog</li>
                    <li className="cursor-pointer hover:underline">FAQ</li>
                </ul>
                <div className="mb-5 text-sm leading-6">
                Welcome to MY TV LIST, your ultimate destination for tracking and discovering TV shows and movies. We offer personalized recommendations, detailed show information, and an intuitive platform to manage your watchlist. Elevate your viewing experience with curated content and seamless organization.
                </div>
                <div className="flex justify-center gap-3">
                    <span className="bg-white text-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-200">
                        <FaFacebookF />
                    </span>
                    <span className="bg-white text-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-200">
                        <FaInstagram />
                    </span>
                    <span className="bg-white text-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-200">
                        <FaTwitter />
                    </span>
                    <span className="bg-white text-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-200">
                        <FaLinkedin />
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
