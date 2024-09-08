// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-100 text-gray-900 py-8 px-4 sm:px-16">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold italic text-gray-400 mb-4">DevShift.Dev</h1>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:text-gray-400">Home</Link>
                    </li>
                    <li>
                        <Link href="/gold-price" className="hover:text-gray-400">Gold Price</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:text-gray-400">Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
