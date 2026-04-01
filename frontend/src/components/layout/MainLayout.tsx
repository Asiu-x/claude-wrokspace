import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {children}
    </div>
  );
};

export default MainLayout;
