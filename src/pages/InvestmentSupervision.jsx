import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    FileText,
    Shield,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Zap,
    BookOpen,
    Scale,
    Target,
    BarChart3,
    Eye,
    ChevronDown,
    ChevronUp,
    Sparkles
} from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import MetricCard from '../components/MetricCard'
import { supervisionData } from '../data/mockData'

export default function InvestmentSupervision() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language
    const [activeTab, setActiveTab] = useState('extraction')
    const [showContract, setShowContract] = useState(true)
    const [generating, setGenerating] = useState(false)

    const tabs = [
        { key: 'extraction', label: t('supervision.tabExtraction') },
        { key: 'indicators', label: t('supervision.tabIndicators') },
    ]

    const typeIcons = {
        ratio: Scale,
        concentration: Target,
        credit: Shield,
        duration: BarChart3,
        liquidity: Zap,
        prohibited: XCircle,
    }

    const levelColors = {
        regulatory: 'text-red-400 bg-red-500/10 border-red-500/20',
        contract: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    }

    const handleBatchGenerate = () => {
        setGenerating(true)
        setTimeout(() => setGenerating(false), 2000)
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards' }}>
                <h1 className="text-xl font-light text-white tracking-tight">{t('supervision.title')}</h1>
                <p className="text-gray-500 text-sm mt-1">{t('supervision.subtitle')}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard
                    icon={BookOpen}
                    label={t('supervision.indicators.totalRules')}
                    value={supervisionData.stats.totalRules}
                    delay={100}
                    color="copper"
                />
                <MetricCard
                    icon={Sparkles}
                    label={t('supervision.indicators.autoExtracted')}
                    value={supervisionData.stats.autoExtracted}
                    trend={`${((supervisionData.stats.autoExtracted / supervisionData.stats.totalRules) * 100).toFixed(0)}%`}
                    trendUp
                    delay={180}
                    color="emerald"
                />
                <MetricCard
                    icon={Eye}
                    label={t('supervision.indicators.manualReview')}
                    value={supervisionData.stats.manualReview}
                    delay={260}
                    color="amber"
                />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit"
                style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '200ms' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.key
                                ? 'bg-copper-600 text-white shadow-lg shadow-copper-900/20'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'extraction' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Contract Preview */}
                    <div className="glass-card overflow-hidden"
                        style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '300ms' }}>
                        <button
                            onClick={() => setShowContract(!showContract)}
                            className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-copper-400" />
                                <span className="text-sm font-medium text-gray-300">{t('supervision.contractPreview')}</span>
                            </div>
                            {showContract ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
                        </button>
                        {showContract && (
                            <div className="px-4 pb-4">
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 max-h-[500px] overflow-y-auto custom-scrollbar">
                                    <pre className="text-xs text-gray-400 whitespace-pre-wrap leading-relaxed font-sans">
                                        {lang === 'zh' ? supervisionData.contractText.zh : supervisionData.contractText.en}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Extracted Rules */}
                    <div className="space-y-3"
                        style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '400ms' }}>
                        <h3 className="text-sm font-medium text-gray-300">{t('supervision.extractedRules')}</h3>
                        {supervisionData.extractedRules.map((rule, index) => {
                            const TypeIcon = typeIcons[rule.type] || Shield
                            return (
                                <div
                                    key={rule.id}
                                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-200"
                                    style={{ animation: `fadeInUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${500 + index * 60}ms` }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-copper-500/10 flex-shrink-0">
                                            <TypeIcon size={14} className="text-copper-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className="text-[10px] text-gray-500 font-mono">{rule.id}</span>
                                                <StatusBadge
                                                    status={rule.type === 'ratio' ? 'info' : rule.type === 'concentration' ? 'warning' : 'success'}
                                                    label={t(`supervision.ruleTypes.${rule.type}`)}
                                                    showDot={false}
                                                />
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${levelColors[rule.level]}`}>
                                                    {rule.level === 'regulatory' ? t('supervision.regulatoryLevel') : t('supervision.contractLevel')}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-300 leading-relaxed">
                                                {lang === 'zh' ? rule.content.zh : rule.content.en}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <BookOpen size={10} className="text-gray-600" />
                                                <span className="text-[10px] text-gray-600">{lang === 'zh' ? rule.clause.zh : rule.clause.en}</span>
                                                {rule.minValue !== null && rule.maxValue !== null && (
                                                    <span className="text-[10px] text-copper-400 ml-2">{rule.minValue}% - {rule.maxValue}%</span>
                                                )}
                                                {rule.minValue !== null && rule.maxValue === null && (
                                                    <span className="text-[10px] text-copper-400 ml-2">≥ {rule.minValue}%</span>
                                                )}
                                                {rule.minValue === null && rule.maxValue !== null && (
                                                    <span className="text-[10px] text-copper-400 ml-2">≤ {rule.maxValue}%</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : (
                /* Indicators Tab */
                <div className="space-y-6">
                    {/* Batch Generate Button */}
                    <div className="flex justify-end"
                        style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '250ms' }}>
                        <button
                            onClick={handleBatchGenerate}
                            disabled={generating}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${generating
                                    ? 'bg-copper-600/50 text-gray-300 cursor-not-allowed'
                                    : 'bg-gradient-to-br from-copper-500 to-copper-600 text-white shadow-lg shadow-copper-900/30 hover:shadow-[0_0_30px_rgba(224,142,85,0.3)] hover:scale-105'
                                }`}
                        >
                            {generating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    {t('supervision.indicators.generating')}
                                </>
                            ) : (
                                <>
                                    <Sparkles size={16} />
                                    {t('supervision.indicators.batchGenerate')}
                                </>
                            )}
                        </button>
                    </div>

                    {/* Indicators Table */}
                    <div className="glass-card p-6"
                        style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '300ms' }}>
                        <h3 className="text-sm font-medium text-gray-300 mb-4">{t('supervision.indicators.title')}</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        {[
                                            t('supervision.indicators.indicatorName'),
                                            t('supervision.indicators.indicatorValue'),
                                            t('supervision.indicators.currentValue'),
                                            t('supervision.indicators.complianceStatus')
                                        ].map((h, i) => (
                                            <th key={i} className="text-left text-xs font-medium text-gray-500 pb-3 pr-4 uppercase tracking-wider">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {supervisionData.indicators.map((indicator, index) => {
                                        const statusConfig = {
                                            compliant: { icon: CheckCircle2, color: 'text-emerald-400', label: t('supervision.indicators.compliant') },
                                            nearLimit: { icon: AlertTriangle, color: 'text-amber-400', label: t('supervision.indicators.nearLimit') },
                                            breached: { icon: XCircle, color: 'text-red-400', label: t('supervision.indicators.breached') },
                                        }
                                        const config = statusConfig[indicator.status]
                                        const StatusIcon = config.icon
                                        return (
                                            <tr
                                                key={index}
                                                className={`border-b border-white/[0.03] transition-colors duration-200 ${indicator.status === 'breached' ? 'bg-red-500/[0.03]' :
                                                        indicator.status === 'nearLimit' ? 'bg-amber-500/[0.02]' :
                                                            'hover:bg-white/[0.02]'
                                                    }`}
                                                style={{ animation: `fadeInUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${400 + index * 50}ms` }}
                                            >
                                                <td className="py-3.5 pr-4 text-sm text-gray-200">{lang === 'zh' ? indicator.name.zh : indicator.name.en}</td>
                                                <td className="py-3.5 pr-4 text-sm text-gray-400 font-mono">{indicator.threshold}</td>
                                                <td className="py-3.5 pr-4">
                                                    <span className={`text-sm font-medium font-mono ${config.color}`}>{indicator.currentValue}%</span>
                                                </td>
                                                <td className="py-3.5">
                                                    <div className="flex items-center gap-1.5">
                                                        <StatusIcon size={14} className={config.color} />
                                                        <StatusBadge status={indicator.status} label={config.label} showDot={false} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
