// import Link from 'next/link';
// import 'bootstrap/dist/css/bootstrap.css';
// import { useState } from 'react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
//       <div className="container">
//         <h1 className="h4 font-weight-bold text-muted">DevShift.Dev</h1>

//         {/* Hamburger Button */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           aria-expanded={isOpen}
//           aria-label="Toggle navigation"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Menu Items */}
//         <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link href="/" className="nav-link text-dark">
//                 หน้าหลัก
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link href="/gold-price" className="nav-link text-dark">
//                 ราคาทองคำ
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link href="/newsboard" className="nav-link text-dark">
//                 ข้อมูลข่าวสาร
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ฟังก์ชันเพื่อหุบแฮมเบอร์เกอร์
  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <div className="container">
        <h1 className="h4 font-weight-bold text-muted">DevShift.Dev</h1>

        {/* Hamburger Button */}
        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Items */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link text-dark" onClick={handleMenuClick}>
                หน้าหลัก
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/gold-price" className="nav-link text-dark" onClick={handleMenuClick}>
                ราคาทองคำ
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/newsboard" className="nav-link text-dark" onClick={handleMenuClick}>
                ข้อมูลข่าวสาร
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
