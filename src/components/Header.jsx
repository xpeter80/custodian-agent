import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Search, Bell, Globe } from 'lucide-react'

const routeTitles = {
    '/': 'nav.dashboard',
    '/instruction': 'nav.instruction',
    '/position': 'nav.position',
    '/reconciliation': 'nav.reconciliation',
    '/supervision': 'nav.supervision',
}

export default function Header() {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const titleKey = routeTitles[location.pathname] || 'nav.dashboard'

    const toggleLanguage = () => {
        const newLang = i18n.language === 'zh' ? 'en' : 'zh'
        i18n.changeLanguage(newLang)
    }

    return (
        <header className="flex items-center justify-between h-14 px-6 border-b border-white/5 bg-midnight-900/40 backdrop-blur-md z-10">
            {/* Page Title */}
            <div>
                <h2 className="text-lg font-medium text-white tracking-tight">
                    {t(titleKey)}
                </h2>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative hidden md:flex items-center">
                    <Search size={14} className="absolute left-3 text-gray-500" />
                    <input
                        type="text"
                        placeholder={t('header.search')}
                        className="w-64 pl-9 pr-4 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg text-gray-300 placeholder-gray-600 focus:bg-white/10 focus:border-copper-500/50 focus:shadow-[0_0_20px_rgba(224,142,85,0.1)] transition-all duration-300 outline-none"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                    <Bell size={18} />
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </button>

                {/* Language Switch */}
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:text-copper-400 hover:bg-white/5 border border-white/10 hover:border-copper-500/30 transition-all duration-200"
                >
                    <Globe size={14} />
                    <span>{t('header.langSwitch')}</span>
                </button>
            </div>
        </header>
    )
}
