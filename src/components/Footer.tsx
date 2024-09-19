
"use client";
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.css';

export default function Footer() {
  return (
    <footer className="bg-light text-dark py-4 px-4">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          {/* Left Side: Logo */}
          <div className="col-sm-2 mb-2 mb-sm-0 text-center text-sm-start">
            <Image
              src="/images/devshift-logo.jpg"
              alt="DevShift Logo"
              width={120}
              height={120}
              layout="intrinsic"
            />
          </div>

          {/* Right Side: Contact Info */}
          <div className="col-sm-10 text-center text-sm-start">
            <h2 className="h5 font-weight-bold">PUNNAWUT BUCHA</h2>
            <p className="text-muted mb-4">Software Developer</p>

            <ul className="list-unstyled">
              <li className="mb-2">
                <span role="img" aria-label="phone">📞</span> 
                <span className="ms-2">+668-0752-0397</span>
              </li>
              <li className="mb-2">
                <span role="img" aria-label="email">📧</span>
                <span className="ms-2">punnawut_bucha@outlook.com</span>
              </li>
              <li className="mb-2">
                <span role="img" aria-label="location">📍</span>
                <span className="ms-2">Phra Samut Chedi, Samut Prakan</span>
              </li>
              <li>
                <span role="img" aria-label="github">🐙</span>
                <a
                  href="https://github.com/punnawutbu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-2 text-decoration-none text-primary"
                >
                  github.com/punnawutbu
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
