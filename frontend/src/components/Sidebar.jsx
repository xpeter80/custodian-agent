import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
    LayoutDashboard,
    FileSearch,
    TrendingUp,
    GitCompare,
    Shield,
    ChevronLeft,
    ChevronRight,
    Bot
} from 'lucide-react'

const navItems = [
    { path: '/', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
    { path: '/instruction', icon: FileSearch, labelKey: 'nav.instruction' },
    { path: '/position', icon: TrendingUp, labelKey: 'nav.position' },
    { path: '/reconciliation', icon: GitCompare, labelKey: 'nav.reconciliation' },
    { path: '/supervision', icon: Shield, labelKey: 'nav.supervision' },
]

export default function Sidebar({ collapsed, onToggle }) {
    const { t } = useTranslation()

    return (
        <aside
            className={`relative flex flex-col h-full bg-midnight-900/80 backdrop-blur-xl border-r border-white/5 transition-all duration-300 z-20 ${collapsed ? 'w-[72px]' : 'w-[260px]'
                }`}
        >
            {/* Logo Area */}
            <div className="flex items-center gap-3 px-4 h-16 border-b border-white/5">
                <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-copper-500 to-copper-600 flex items-center justify-center shadow-lg shadow-copper-900/20">
                        <Bot size={22} className="text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-midnight-900"></div>
                </div>
                {!collapsed && (
                    <div className="overflow-hidden">
                        <h1 className="text-sm font-medium text-white tracking-tight truncate">
                            {t('app.title')}
                        </h1>
                        <p className="text-[10px] text-gray-500 truncate">{t('app.subtitle')}</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                {navItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) =>
                                `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${isActive
                                    ? 'bg-gradient-to-br from-copper-500/20 to-transparent border border-copper-500/30 text-copper-400 shadow-[0_4px_12px_rgba(224,142,85,0.1)]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
                                }`
                            }
                            style={{ animationDelay: `${100 + index * 80}ms` }}
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <div className="absolute left-[-13px] top-1/2 -translate-y-1/2 h-8 w-1 bg-copper-500 rounded-r-full shadow-[0_0_10px_rgba(224,142,85,0.6)]"></div>
                                    )}
                                    <div
                                        className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-300 ${isActive
                                                ? 'bg-copper-500/10'
                                                : 'group-hover:bg-white/5'
                                            }`}
                                    >
                                        <Icon size={18} />
                                    </div>
                                    {!collapsed && (
                                        <span className="text-sm font-medium truncate">{t(item.labelKey)}</span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    )
                })}
            </nav>

            {/* Collapse Toggle */}
            <button
                onClick={onToggle}
                className="flex items-center justify-center h-12 border-t border-white/5 text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200"
                title={collapsed ? t('nav.expand') : t('nav.collapse')}
            >
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
        </aside>
    )
}
