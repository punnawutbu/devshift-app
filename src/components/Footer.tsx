"use client";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-bar text-gray-900 py-8 px-4 sm:px-16 color-text">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                {/* Left Side: Logo */}
                <div className="mb-6 sm:mb-0">
                    <Image
                        src="/images/devshift-logo.jpg"
                        alt="DevShift Logo"
                        width={200}
                        height={200}
                    />
                </div>

                {/* Right Side: Contact Info */}
                <div className="flex flex-col text-center sm:text-left">
                    <h2 className="text-xl font-bold">PUNNAWUT BUCHA</h2>
                    <p className="text-sm italic mb-4">Software Developer</p>

                    <div className="flex flex-col space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                            <span role="img" aria-label="phone">📞</span>
                            <span>+668-0752-0397</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span role="img" aria-label="email">📧</span>
                            <span>punnawut_bucha@outlook.com</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span role="img" aria-label="location">📍</span>
                            <span>Phra Samut Chedi, Samut Prakan</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span role="img" aria-label="github">🐙</span>
                            <a
                                href="https://github.com/punnawutbu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                github.com/punnawutbu
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}
