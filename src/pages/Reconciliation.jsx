import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Search,
    AlertCircle,
    CheckCircle2,
    HelpCircle,
    Link2,
    Unlink2,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Lightbulb,
    GitCompare,
    BarChart3
} from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import MetricCard from '../components/MetricCard'
import { reconciliationData } from '../data/mockData'

export default function Reconciliation() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language
    const [activeTab, setActiveTab] = useState('attribution')
    const [expandedError, setExpandedError] = useState('ERR-001')

    const tabs = [
        { key: 'attribution', label: t('reconciliation.tabAttribution') },
        { key: 'mapping', label: t('reconciliation.tabMapping') },
    ]

    const typeLabels = {
        price: t('reconciliation.types.price'),
        fee: t('reconciliation.types.fee'),
        interest: t('reconciliation.types.interest'),
        quantity: t('reconciliation.types.quantity'),
        other: t('reconciliation.types.other'),
    }

    const typeColors = {
        price: 'amber',
        fee: 'blue',
        interest: 'copper',
        quantity: 'red',
        other: 'gray'
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards' }}>
                <h1 className="text-xl font-light text-white tracking-tight">{t('reconciliation.title')}</h1>
                <p className="text-gray-500 text-sm mt-1">{t('reconciliation.subtitle')}</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit"
                style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '100ms' }}>
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

            {activeTab === 'attribution' ? (
                <div className="space-y-4">
                    {/* Error List */}
                    {reconciliationData.errors.map((error, index) => (
                        <div
                            key={error.id}
                            className="glass-card overflow-hidden"
                            style={{ animation: `fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${200 + index * 80}ms` }}
                        >
                            {/* Error Header */}
                            <button
                                onClick={() => setExpandedError(expandedError === error.id ? null : error.id)}
                                className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl bg-${typeColors[error.type]}-500/10`}>
                                        <AlertCircle size={18} className={`text-${typeColors[error.type]}-400`} />
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500 font-mono">{error.id}</span>
                                            <StatusBadge status={error.type === 'price' ? 'warning' : error.type === 'quantity' ? 'error' : 'info'} label={typeLabels[error.type]} />
                                        </div>
                                        <p className="text-sm text-gray-200 mt-1">
                                            {lang === 'zh' ? error.fundName.zh : error.fundName.en}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">{t('reconciliation.errorAmount')}</p>
                                        <p className="text-sm font-medium text-red-400">¥ {error.amount.toLocaleString()}</p>
                                    </div>
                                    <span className="text-xs text-gray-600">{error.date}</span>
                                    {expandedError === error.id ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                                </div>
                            </button>

                            {/* Expanded Detail */}
                            {expandedError === error.id && (
                                <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
                                    {/* Root Cause */}
                                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                                        <div className="flex items-start gap-2">
                                            <Lightbulb size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs font-medium text-amber-400 mb-1">{t('reconciliation.rootCause')}</p>
                                                <p className="text-sm text-gray-300">{lang === 'zh' ? error.rootCause.zh : error.rootCause.en}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Parameter Tracing */}
                                    <div>
                                        <p className="text-xs font-medium text-gray-400 mb-3">{t('reconciliation.tracing')}</p>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                                                <p className="text-[10px] text-gray-500 mb-1">{t('reconciliation.custodianParam')}</p>
                                                <p className="text-sm text-gray-200 font-mono">{error.custodianParam}</p>
                                            </div>
                                            <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10 text-center">
                                                <p className="text-[10px] text-red-400 mb-1">{t('reconciliation.paramDiff')}</p>
                                                <p className="text-sm text-red-400 font-mono font-medium">{error.paramDiff}</p>
                                            </div>
                                            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                                                <p className="text-[10px] text-gray-500 mb-1">{t('reconciliation.managerParam')}</p>
                                                <p className="text-sm text-gray-200 font-mono">{error.managerParam}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Resolution */}
                                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                        <div className="flex items-start gap-2">
                                            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs font-medium text-emerald-400 mb-1">{t('reconciliation.resolution')}</p>
                                                <p className="text-sm text-gray-300">{lang === 'zh' ? error.resolution.zh : error.resolution.en}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                /* Account Mapping Tab */
                <div className="space-y-6">
                    {/* Mapping Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MetricCard
                            icon={BarChart3}
                            label={t('reconciliation.mapping.totalAccounts')}
                            value={reconciliationData.mappingStats.total}
                            delay={200}
                            color="copper"
                        />
                        <MetricCard
                            icon={Link2}
                            label={t('reconciliation.mapping.matchedCount')}
                            value={reconciliationData.mappingStats.matched}
                            delay={280}
                            color="emerald"
                        />
                        <MetricCard
                            icon={HelpCircle}
                            label={t('reconciliation.mapping.pendingCount')}
                            value={reconciliationData.mappingStats.pending}
                            delay={360}
                            color="amber"
                        />
                        <MetricCard
                            icon={GitCompare}
                            label={t('reconciliation.mapping.successRate')}
                            value={reconciliationData.mappingStats.successRate}
                            suffix="%"
                            delay={440}
                            color="blue"
                        />
                    </div>

                    {/* Mapping Table */}
                    <div className="glass-card p-6"
                        style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '300ms' }}>
                        <h3 className="text-sm font-medium text-gray-300 mb-4">{t('reconciliation.mapping.title')}</h3>
                        <div className="space-y-3">
                            {reconciliationData.accountMapping.map((mapping, index) => (
                                <div
                                    key={mapping.managerCode}
                                    className={`p-4 rounded-xl border transition-all duration-300 ${mapping.status === 'unmatched'
                                            ? 'bg-red-500/5 border-red-500/10'
                                            : mapping.status === 'suggested'
                                                ? 'bg-blue-500/5 border-blue-500/10'
                                                : 'bg-white/[0.02] border-white/5'
                                        }`}
                                    style={{ animation: `fadeInUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${400 + index * 60}ms` }}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Manager Account */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] text-gray-500 mb-0.5">{t('reconciliation.mapping.managerAccount')}</p>
                                            <p className="text-sm text-gray-200 font-mono">{mapping.managerCode}</p>
                                            <p className="text-xs text-gray-400 truncate">
                                                {lang === 'zh' ? mapping.managerName.zh : mapping.managerName.en}
                                            </p>
                                        </div>

                                        {/* Connection */}
                                        <div className="flex flex-col items-center gap-1 px-2">
                                            {mapping.status === 'matched' ? (
                                                <Link2 size={16} className="text-emerald-400" />
                                            ) : mapping.status === 'suggested' ? (
                                                <Link2 size={16} className="text-blue-400" />
                                            ) : (
                                                <Unlink2 size={16} className="text-red-400" />
                                            )}
                                            <StatusBadge
                                                status={mapping.status}
                                                label={t(`reconciliation.mapping.${mapping.status}`)}
                                                showDot={false}
                                            />
                                            {mapping.confidence > 0 && (
                                                <span className="text-[10px] text-gray-500">{mapping.confidence}%</span>
                                            )}
                                        </div>

                                        {/* Custodian Account */}
                                        <div className="flex-1 min-w-0 text-right">
                                            <p className="text-[10px] text-gray-500 mb-0.5">{t('reconciliation.mapping.custodianAccount')}</p>
                                            {mapping.custodianCode ? (
                                                <>
                                                    <p className="text-sm text-gray-200 font-mono">{mapping.custodianCode}</p>
                                                    <p className="text-xs text-gray-400 truncate">
                                                        {lang === 'zh' ? mapping.custodianName.zh : mapping.custodianName.en}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-sm text-red-400 italic">—</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Diff Reason & Suggestion */}
                                    {mapping.diffReason && (
                                        <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-[10px] text-amber-400">{t('reconciliation.mapping.diffReason')}</p>
                                                    <p className="text-xs text-gray-400">{lang === 'zh' ? mapping.diffReason.zh : mapping.diffReason.en}</p>
                                                </div>
                                            </div>
                                            {mapping.suggestion && (
                                                <div className="flex items-start gap-2">
                                                    <Lightbulb size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-[10px] text-emerald-400">{t('reconciliation.mapping.suggestion')}</p>
                                                        <p className="text-xs text-gray-400">{lang === 'zh' ? mapping.suggestion.zh : mapping.suggestion.en}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
