import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
    FileSearch,
    TrendingUp,
    GitCompare,
    Shield,
    CheckCircle2,
    AlertTriangle,
    Search,
    Server,
    ArrowUpRight,
    Activity,
    Clock,
    BarChart3,
    Zap,
    ArrowRight
} from 'lucide-react'
import MetricCard from '../components/MetricCard'
import { dashboardData } from '../data/mockData'

const iconMap = {
    check: CheckCircle2,
    alert: AlertTriangle,
    search: Search,
    shield: Shield,
    sort: FileSearch,
    server: Server,
}

const moduleCards = [
    { path: '/instruction', icon: FileSearch, color: 'copper', key: 'instruction' },
    { path: '/position', icon: TrendingUp, color: 'emerald', key: 'position' },
    { path: '/reconciliation', icon: GitCompare, color: 'blue', key: 'reconciliation' },
    { path: '/supervision', icon: Shield, color: 'amber', key: 'supervision' },
]

const moduleDescriptions = {
    instruction: {
        zh: '清算指令业务类型自动识别与高峰期支付监控',
        en: 'Auto-recognition of clearing instruction types & peak payment monitoring'
    },
    position: {
        zh: '清算头寸智能预估与动态阈值预警',
        en: 'Intelligent position estimation with dynamic threshold alerts'
    },
    reconciliation: {
        zh: '核算对账差错归因分析与科目映射优化',
        en: 'Reconciliation error attribution & account mapping optimization'
    },
    supervision: {
        zh: '投资监督规则自动抽取与指标批量生成',
        en: 'Auto-extraction of supervision rules & batch indicator generation'
    }
}

export default function Dashboard() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const lang = i18n.language
    const { metrics, recentActivity } = dashboardData

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome */}
            <div className="mb-2" style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards' }}>
                <h1 className="text-2xl font-light text-white tracking-tight">{t('dashboard.welcome')}</h1>
                <p className="text-gray-500 text-sm mt-1">{t('dashboard.overview')}</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                    icon={BarChart3}
                    label={t('dashboard.totalInstructions')}
                    value={metrics.totalInstructions.toLocaleString()}
                    suffix={lang === 'zh' ? '笔' : 'txn'}
                    trend="+12.3%"
                    trendUp={true}
                    delay={100}
                    color="copper"
                />
                <MetricCard
                    icon={Zap}
                    label={t('dashboard.processingRate')}
                    value={metrics.processingRate}
                    suffix="%"
                    trend="+0.3%"
                    trendUp={true}
                    delay={180}
                    color="emerald"
                />
                <MetricCard
                    icon={Clock}
                    label={t('dashboard.avgLatency')}
                    value={metrics.avgLatency}
                    suffix={t('dashboard.seconds')}
                    trend="-0.5s"
                    trendUp={true}
                    delay={260}
                    color="blue"
                />
                <MetricCard
                    icon={AlertTriangle}
                    label={t('dashboard.alertCount')}
                    value={metrics.alertCount}
                    delay={340}
                    color="amber"
                />
            </div>

            {/* Module Cards */}
            <div>
                <h3 className="text-sm font-medium text-gray-400 mb-4 tracking-wide">{t('dashboard.moduleOverview')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {moduleCards.map((mod, index) => {
                        const Icon = mod.icon
                        const desc = moduleDescriptions[mod.key]
                        return (
                            <button
                                key={mod.path}
                                onClick={() => navigate(mod.path)}
                                className="group glass-card p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(224,142,85,0.08)] cursor-pointer"
                                style={{ animation: `fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${300 + index * 80}ms` }}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`p-2.5 rounded-xl bg-${mod.color}-500/10`}>
                                        <Icon size={20} className={`text-${mod.color}-400`} />
                                    </div>
                                    <ArrowRight size={16} className="text-gray-600 group-hover:text-copper-400 group-hover:translate-x-1 transition-all duration-300" />
                                </div>
                                <h4 className="text-sm font-medium text-gray-200 mb-1">{t(`nav.${mod.key}`)}</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">{lang === 'zh' ? desc.zh : desc.en}</p>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Recent Activity & System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Recent Activity */}
                <div className="lg:col-span-2 glass-card p-5"
                    style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '600ms' }}>
                    <h3 className="text-sm font-medium text-gray-300 mb-4">{t('dashboard.recentActivity')}</h3>
                    <div className="space-y-3">
                        {recentActivity.map((item, index) => {
                            const Icon = iconMap[item.icon] || Activity
                            const typeColors = {
                                instruction: 'text-copper-400 bg-copper-500/10',
                                warning: 'text-amber-400 bg-amber-500/10',
                                reconciliation: 'text-blue-400 bg-blue-500/10',
                                supervision: 'text-red-400 bg-red-500/10',
                                system: 'text-emerald-400 bg-emerald-500/10',
                            }
                            const colorClass = typeColors[item.type] || typeColors.system
                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200"
                                    style={{ animation: `fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${700 + index * 60}ms` }}
                                >
                                    <div className={`p-2 rounded-lg flex-shrink-0 ${colorClass}`}>
                                        <Icon size={14} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-300 truncate">
                                            {lang === 'zh' ? item.message.zh : item.message.en}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-600 flex-shrink-0">
                                        {lang === 'zh' ? item.time : item.timeEn}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* System Status */}
                <div className="glass-card p-5"
                    style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '700ms' }}>
                    <h3 className="text-sm font-medium text-gray-300 mb-4">{t('dashboard.systemStatus')}</h3>
                    <div className="space-y-4">
                        {[
                            { label: lang === 'zh' ? '清算引擎' : 'Clearing Engine', status: 'online' },
                            { label: lang === 'zh' ? 'OCR服务' : 'OCR Service', status: 'online' },
                            { label: lang === 'zh' ? '头寸预估' : 'Position Est.', status: 'normal' },
                            { label: lang === 'zh' ? '对账系统' : 'Reconciliation', status: 'normal' },
                            { label: lang === 'zh' ? '监控系统' : 'Monitoring', status: 'warning' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">{item.label}</span>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${item.status === 'online' ? 'bg-emerald-400 animate-pulse' :
                                            item.status === 'normal' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                                        }`}></span>
                                    <span className={`text-xs ${item.status === 'warning' ? 'text-amber-400' : 'text-emerald-400'
                                        }`}>
                                        {t(`dashboard.${item.status}`)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Key Metrics */}
                    <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">{t('dashboard.reconciliationRate')}</span>
                            <span className="text-emerald-400">{metrics.reconciliationRate}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">{t('dashboard.netPosition')}</span>
                            <span className="text-copper-400">{(metrics.netPosition / 10000).toFixed(1)}{t('dashboard.hundred_million')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">{t('dashboard.pendingInstructions')}</span>
                            <span className="text-amber-400">{metrics.pendingInstructions}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
