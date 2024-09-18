
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';

const Navbar = () => {
    return (
        <nav className="bg-light py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="h4 font-weight-bold text-muted">DevShift.Dev</h1>
                <ul className="nav">
                    <li className="nav-item">
                        <Link href="/" legacyBehavior passHref>
                            <a className="nav-link text-dark">หน้าหลัก</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/gold-price" legacyBehavior passHref>
                            <a className="nav-link text-dark">ราคาทองคำ</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/newsboard" legacyBehavior passHref>
                            <a className="nav-link text-dark">ข้อมูลข่าวสาร</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
