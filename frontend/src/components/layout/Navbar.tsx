import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAgentPlazaUrl } from '../../utils/agentPlazaUrl';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/models', label: '模型库' },
    { path: '/datasets', label: '数据集' },
    { path: '/cases', label: '案例集' },
    { path: '/capabilities', label: 'AI能力货架' },
  ];

  const agentPlazaUrl = getAgentPlazaUrl();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: '64px',
        minHeight: '64px',
        background: scrolled ? 'rgba(255, 255, 255, 0.9)' : '#FFFFFF',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: scrolled ? '0 4px 16px rgba(0, 0, 0, 0.08)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-lg font-bold transition-all duration-200"
            style={{ color: '#1A1A2E' }}
          >
            <div className="
              w-8 h-8
              rounded-lg
              flex items-center justify-center
              bg-gradient-to-br from-[#5B7CFF] to-[#7C98FF]
            ">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span>学科大模型AI能力中心</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="
                  px-4 py-2
                  rounded-lg
                  text-sm font-medium
                  transition-all duration-200
                  whitespace-nowrap
                "
                style={{
                  color: isActive(item.path) ? '#5B7CFF' : '#8A8A9E',
                  backgroundColor: isActive(item.path) ? '#E8EBFF' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.color = '#4A4A6A';
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.color = '#8A8A9E';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={agentPlazaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-4 py-2
                rounded-lg
                text-sm font-medium
                transition-all duration-200
                whitespace-nowrap
              "
              style={{ color: '#8A8A9E' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4A4A6A';
                e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#8A8A9E';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              智能体广场
              <svg className="inline-block ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="
              md:hidden
              p-2
              rounded-lg
              text-sm font-medium
              text-[#8A8A9E]
              hover:text-[#4A4A6A]
              hover:bg-[#F9FAFB]
              transition-colors duration-200
            "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up mt-2">
            <div className="
              bg-white
              rounded-xl
              border border-[#E5E7EB]
              shadow-md
              p-4
              mb-4
            ">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="
                      block px-4 py-2.5
                      rounded-lg
                      text-sm font-medium
                      transition-all duration-200
                      whitespace-nowrap
                    "
                    style={{
                      color: isActive(item.path) ? '#5B7CFF' : '#8A8A9E',
                      backgroundColor: isActive(item.path) ? '#E8EBFF' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(item.path)) {
                        e.currentTarget.style.color = '#4A4A6A';
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.path)) {
                        e.currentTarget.style.color = '#8A8A9E';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={agentPlazaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    block px-4 py-2.5
                    rounded-lg
                    text-sm font-medium
                    transition-all duration-200
                    whitespace-nowrap
                  "
                  style={{ color: '#8A8A9E' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#4A4A6A';
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#8A8A9E';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  学科大模型
                  <svg className="inline-block ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
