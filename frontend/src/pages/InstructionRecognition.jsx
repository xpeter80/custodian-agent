import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Upload,
    FileText,
    CheckCircle2,
    Clock,
    ArrowRight,
    Activity,
    AlertTriangle,
    Zap,
    TrendingUp,
    Info,
    ChevronRight,
    BarChart3,
    Layers
} from 'lucide-react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import StatusBadge from '../components/StatusBadge'
import MetricCard from '../components/MetricCard'
import { sampleInstructions, monitorData } from '../data/mockData'

const typeColors = {
    subscription: 'copper',
    redemption: 'blue',
    dividend: 'emerald',
    transfer: 'amber',
    settlement: 'red'
}

export default function InstructionRecognition() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language
    const [activeTab, setActiveTab] = useState('recognition')
    const [selectedInstruction, setSelectedInstruction] = useState(sampleInstructions[0])
    const [showUpload, setShowUpload] = useState(false)

    const tabs = [
        { key: 'recognition', label: t('instruction.tabRecognition') },
        { key: 'monitor', label: t('instruction.tabMonitor') },
    ]

    const pipelineSteps = ['received', 'recognized', 'sorted', 'processing', 'completed']
    const statusToStep = { completed: 4, processing: 3, sorted: 2, recognized: 1, received: 0 }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards' }}>
                <h1 className="text-xl font-light text-white tracking-tight">{t('instruction.title')}</h1>
                <p className="text-gray-500 text-sm mt-1">{t('instruction.subtitle')}</p>
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

            {/* Tab Content */}
            {activeTab === 'recognition' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Upload + Instruction List */}
                    <div className="space-y-4">
                        {/* Upload Area */}
                        <div
                            className="glass-card p-6 cursor-pointer group"
                            onClick={() => setShowUpload(!showUpload)}
                            style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '200ms' }}
                        >
                            <div className="flex flex-col items-center gap-3 py-4 border-2 border-dashed border-white/10 rounded-xl group-hover:border-copper-500/30 transition-all duration-300">
                                <div className="p-3 rounded-2xl bg-copper-500/10 group-hover:bg-copper-500/20 transition-all duration-300">
                                    <Upload size={24} className="text-copper-400" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-300">{t('instruction.uploadDesc')}</p>
                                    <p className="text-xs text-gray-600 mt-1">{t('instruction.uploadHint')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Instruction List */}
                        <div className="space-y-2">
                            {sampleInstructions.map((inst, index) => (
                                <button
                                    key={inst.id}
                                    onClick={() => setSelectedInstruction(inst)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${selectedInstruction?.id === inst.id
                                            ? 'bg-gradient-to-br from-copper-500/10 to-transparent border-copper-500/30 shadow-[0_4px_12px_rgba(224,142,85,0.08)]'
                                            : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'
                                        }`}
                                    style={{ animation: `fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${300 + index * 80}ms` }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-500">{inst.id}</span>
                                        <StatusBadge
                                            status={inst.status}
                                            label={t(`instruction.steps.${inst.status}`)}
                                        />
                                    </div>
                                    <p className="text-sm font-medium text-gray-200 truncate">
                                        {lang === 'zh' ? inst.fundName.zh : inst.fundName.en}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-gray-500">{inst.date}</span>
                                        <span className="text-xs text-copper-400">
                                            ¥{inst.amount.toLocaleString()}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Instruction Detail */}
                    <div className="lg:col-span-2 space-y-4">
                        {selectedInstruction && (
                            <>
                                {/* Recognition Result Header */}
                                <div className="glass-card p-6"
                                    style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '250ms' }}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-xl bg-copper-500/10">
                                                <FileText size={20} className="text-copper-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-white">
                                                    {lang === 'zh' ? selectedInstruction.fundName.zh : selectedInstruction.fundName.en}
                                                </h3>
                                                <p className="text-xs text-gray-500">{selectedInstruction.instructionNo}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">{t('instruction.confidence')}</p>
                                                <p className="text-lg font-light text-emerald-400">{selectedInstruction.confidence}%</p>
                                            </div>
                                            <StatusBadge
                                                status={selectedInstruction.sortedTo}
                                                label={t(`instruction.types.${selectedInstruction.sortedTo}`)}
                                                size="md"
                                            />
                                        </div>
                                    </div>

                                    {/* Pipeline */}
                                    <div className="mt-6">
                                        <p className="text-xs text-gray-500 mb-3">{t('instruction.pipeline')}</p>
                                        <div className="flex items-center gap-2">
                                            {pipelineSteps.map((step, i) => {
                                                const currentStep = statusToStep[selectedInstruction.status] || 0
                                                const isActive = i <= currentStep
                                                const isCurrent = i === currentStep
                                                return (
                                                    <div key={step} className="flex items-center gap-2 flex-1">
                                                        <div className={`flex items-center gap-2 flex-1 p-2 rounded-lg border transition-all duration-300 ${isActive
                                                                ? isCurrent
                                                                    ? 'bg-copper-500/20 border-copper-500/30 animate-pulse-glow'
                                                                    : 'bg-emerald-500/10 border-emerald-500/20'
                                                                : 'bg-white/5 border-white/5'
                                                            }`}>
                                                            {isActive && !isCurrent ? (
                                                                <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                                                            ) : isCurrent ? (
                                                                <Clock size={12} className="text-copper-400 flex-shrink-0" />
                                                            ) : (
                                                                <div className="w-3 h-3 rounded-full bg-white/10 flex-shrink-0"></div>
                                                            )}
                                                            <span className={`text-[11px] truncate ${isActive ? 'text-gray-200' : 'text-gray-600'}`}>
                                                                {t(`instruction.steps.${step}`)}
                                                            </span>
                                                        </div>
                                                        {i < pipelineSteps.length - 1 && (
                                                            <ChevronRight size={12} className={isActive ? 'text-copper-400' : 'text-gray-700'} />
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Extracted Fields */}
                                <div className="glass-card p-6"
                                    style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '350ms' }}>
                                    <h3 className="text-sm font-medium text-gray-300 mb-4">{t('instruction.recognized')}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { key: 'businessType', value: t(`instruction.types.${selectedInstruction.businessType}`) },
                                            { key: 'amount', value: `¥ ${selectedInstruction.amount.toLocaleString()}` },
                                            { key: 'payee', value: lang === 'zh' ? selectedInstruction.payee.zh : selectedInstruction.payee.en },
                                            { key: 'payeeBank', value: lang === 'zh' ? selectedInstruction.payeeBank.zh : selectedInstruction.payeeBank.en },
                                            { key: 'account', value: selectedInstruction.account },
                                            { key: 'amountCN', value: lang === 'zh' ? selectedInstruction.amountCN.zh : selectedInstruction.amountCN.en },
                                            { key: 'purpose', value: selectedInstruction.purpose },
                                            { key: 'deadline', value: selectedInstruction.deadline },
                                        ].map((field, i) => (
                                            <div key={field.key} className="flex flex-col gap-1 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                                <span className="text-[11px] text-gray-500 uppercase tracking-wider">{t(`instruction.${field.key}`)}</span>
                                                <span className="text-sm text-gray-200 break-all">{field.value}</span>
                                            </div>
                                        ))}
                                        {selectedInstruction.subscriptionPrice && (
                                            <>
                                                <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                                    <span className="text-[11px] text-gray-500 uppercase tracking-wider">{t('instruction.subscriptionPrice')}</span>
                                                    <span className="text-sm text-gray-200">¥ {selectedInstruction.subscriptionPrice}</span>
                                                </div>
                                                <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                                    <span className="text-[11px] text-gray-500 uppercase tracking-wider">{t('instruction.subscriptionQty')}</span>
                                                    <span className="text-sm text-gray-200">{selectedInstruction.subscriptionQty?.toLocaleString()}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                /* Monitor Tab */
                <div className="space-y-6">
                    {/* Monitor Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MetricCard
                            icon={BarChart3}
                            label={t('instruction.monitor.totalToday')}
                            value={monitorData.metrics.volume.toLocaleString()}
                            suffix={lang === 'zh' ? '笔' : 'txn'}
                            delay={200}
                            color="copper"
                        />
                        <MetricCard
                            icon={Clock}
                            label={t('instruction.monitor.latency')}
                            value={monitorData.metrics.latency}
                            suffix={t('dashboard.seconds')}
                            delay={280}
                            color="blue"
                        />
                        <MetricCard
                            icon={Zap}
                            label={t('instruction.monitor.successRate')}
                            value={monitorData.metrics.successRate}
                            suffix="%"
                            delay={360}
                            color="emerald"
                        />
                        <MetricCard
                            icon={Layers}
                            label={t('instruction.monitor.queueDepth')}
                            value={monitorData.metrics.queueDepth}
                            delay={440}
                            color="amber"
                        />
                    </div>

                    {/* Throughput Chart */}
                    <div className="glass-card p-6"
                        style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '300ms' }}>
                        <h3 className="text-sm font-medium text-gray-300 mb-4">{t('instruction.monitor.throughput')}</h3>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monitorData.throughputTrend}>
                                    <defs>
                                        <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#E08E55" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#E08E55" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="time" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
                                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1A1412', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e5e7eb' }}
                                        labelStyle={{ color: '#9ca3af' }}
                                    />
                                    <ReferenceLine y={450} stroke="#F59E0B" strokeDasharray="5 5" label={{ value: lang === 'zh' ? '容量上限' : 'Capacity', fill: '#F59E0B', fontSize: 11 }} />
                                    <Area type="monotone" dataKey="value" stroke="#E08E55" strokeWidth={2} fill="url(#throughputGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Alerts */}
                    <div className="glass-card p-6"
                        style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '400ms' }}>
                        <h3 className="text-sm font-medium text-gray-300 mb-4">{t('instruction.monitor.alerts')}</h3>
                        <div className="space-y-3">
                            {monitorData.alerts.map((alert, index) => {
                                const alertIcons = { warning: AlertTriangle, info: Info, error: AlertTriangle, success: CheckCircle2 }
                                const alertColors = { warning: 'text-amber-400 bg-amber-500/10', info: 'text-blue-400 bg-blue-500/10', error: 'text-red-400 bg-red-500/10', success: 'text-emerald-400 bg-emerald-500/10' }
                                const Icon = alertIcons[alert.type]
                                return (
                                    <div
                                        key={alert.id}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                                        style={{ animation: `fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${500 + index * 60}ms` }}
                                    >
                                        <div className={`p-2 rounded-lg flex-shrink-0 ${alertColors[alert.type]}`}>
                                            <Icon size={14} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-300">{lang === 'zh' ? alert.message.zh : alert.message.en}</p>
                                        </div>
                                        <span className="text-xs text-gray-600 flex-shrink-0">{alert.time}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
