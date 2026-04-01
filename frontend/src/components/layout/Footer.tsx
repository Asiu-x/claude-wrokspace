import React from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/assets';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100/50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={getAssetUrl('/images/cases/kdxf.jpg')} alt="科大讯飞" className="h-8 w-auto" />
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                <span className="font-bold text-gray-900">学科大模型AI能力中心</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4 max-w-md">
              科大讯飞面向教育行业的学科AI能力展示平台，整合底层模型能力、原子与业务级AI能力、数据集及高校案例成果，为教育场景赋能。
            </p>
            <div className="text-sm text-gray-400">
              <span>&copy; 2026 科大讯飞股份有限公司</span>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/models" className="hover:text-blue-600 transition-colors">模型库</Link></li>
              <li><Link to="/datasets" className="hover:text-blue-600 transition-colors">数据集</Link></li>
              <li><Link to="/cases" className="hover:text-blue-600 transition-colors">案例集</Link></li>
              <li><Link to="/capabilities" className="hover:text-blue-600 transition-colors">AI能力货架</Link></li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">联系我们</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>安徽省合肥市高新区望江西路666号</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>400-810-9899</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>edu@iflytek.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="mt-8 pt-8 border-t border-gray-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <a href="https://www.iflytek.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">科大讯飞官网</a>
              <span>·</span>
              <a href="https://www.iflytek.com/privacy-web/#/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">隐私政策</a>
              <span>·</span>
              <a href="https://www.iflytek.com/portal/#/support" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">服务条款</a>
            </div>
            <span>科大讯飞股份有限公司 版权所有</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
