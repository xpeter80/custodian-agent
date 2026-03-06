import { useState, useRef, useEffect } from 'react'
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
    Layers,
    FileImage,
    Sparkles,
    Tag,
    Eye,
    X
} from 'lucide-react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import StatusBadge from '../components/StatusBadge'
import MetricCard from '../components/MetricCard'
import { sampleInstructions, instructionTemplates, monitorData } from '../data/mockData'

const typeColors = {
    ipo_subscription: 'copper',
    custody_fee: 'blue',
    interbank_settlement: 'emerald',
    redemption: 'amber',
    dividend: 'red',
    subscription: 'copper',
    transfer: 'amber',
    settlement: 'red',
}

const typeColorClasses = {
    ipo_subscription: 'bg-copper-500/10 text-copper-400 border-copper-500/20',
    custody_fee: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    interbank_settlement: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    redemption: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dividend: 'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function InstructionRecognition() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language
    const [activeTab, setActiveTab] = useState('recognition')
    const [instructions, setInstructions] = useState(sampleInstructions)
    const [selectedInstruction, setSelectedInstruction] = useState(sampleInstructions[0])
    const [uploading, setUploading] = useState(false)
    const [filterType, setFilterType] = useState('all')
    const [manualStuckSummary, setManualStuckSummary] = useState(null)
    const [manualStuckItems, setManualStuckItems] = useState([])
    const [manualStuckFundSummary, setManualStuckFundSummary] = useState([])
    const [manualStuckLoading, setManualStuckLoading] = useState(false)
    const fileInputRef = useRef(null)

    const tabs = [
        { key: 'recognition', label: t('instruction.tabRecognition') },
        { key: 'monitor', label: t('instruction.tabMonitor') },
        { key: 'manualMonitor', label: t('instruction.tabManualMonitor') },
    ]

    // Get all unique business types from instructions
    const businessTypes = [...new Set(instructions.map(i => i.businessType))]

    // Filter instructions by type
    const filteredInstructions = filterType === 'all'
        ? instructions
        : instructions.filter(i => i.businessType === filterType)

    // Get template for the selected instruction's business type
    const currentTemplate = selectedInstruction
        ? instructionTemplates[selectedInstruction.businessType]
        : null

    // Load manual stuck monitoring data when switching to manual monitor tab
    useEffect(() => {
        if (activeTab !== 'manualMonitor') return

        let cancelled = false
        const fetchManualStuck = async () => {
            setManualStuckLoading(true)
            try {
                const apiUrl = window.APP_CONFIG?.apiUrl || '/api'
                const res = await fetch(`${apiUrl}/monitor/manual-stuck/list`)
                if (res.ok) {
                    const data = await res.json()
                    if (!cancelled) {
                        setManualStuckSummary(data.summary || null)
                        setManualStuckFundSummary(Array.isArray(data.fundSummary) ? data.fundSummary : [])
                        setManualStuckItems(Array.isArray(data.items) ? data.items : [])
                    }
                }
            } catch (e) {
                if (!cancelled) {
                    setManualStuckSummary(null)
                    setManualStuckFundSummary([])
                    setManualStuckItems([])
                }
            } finally {
                if (!cancelled) {
                    setManualStuckLoading(false)
                }
            }
        }

        fetchManualStuck()

        return () => {
            cancelled = true
        }
    }, [activeTab])

    // Handle file upload
    const handleFileUpload = async (e) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploading(true)

        for (const file of files) {
            // Simulate recognition delay
            await new Promise(resolve => setTimeout(resolve, 800))

            // Try calling backend API first, fall back to local mock
            try {
                const apiUrl = window.APP_CONFIG?.apiUrl || '/api'
                const formData = new FormData()
                formData.append('file', file)
                const res = await fetch(`${apiUrl}/instructions/upload`, {
                    method: 'POST',
                    body: formData,
                })
                if (res.ok) {
                    const data = await res.json()
                    if (data.success) {
                        setInstructions(prev => [data.instruction, ...prev])
                        setSelectedInstruction(data.instruction)
                        continue
                    }
                }
            } catch (err) {
                // Backend not available, use local mock
            }

            // Local mock recognition
            const mockInstruction = createMockInstruction(file.name)
            setInstructions(prev => [mockInstruction, ...prev])
            setSelectedInstruction(mockInstruction)
        }

        setUploading(false)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    // Create mock instruction from filename
    function createMockInstruction(filename) {
        let businessType = 'ipo_subscription'
        if (filename.includes('托管费') || filename.includes('管理费')) {
            businessType = 'custody_fee'
        } else if (filename.includes('成交单') || filename.includes('银行间')) {
            businessType = 'interbank_settlement'
        } else if (filename.includes('赎回')) {
            businessType = 'redemption'
        } else if (filename.includes('分红')) {
            businessType = 'dividend'
        }

        const template = instructionTemplates[businessType]
        const mockFields = {}
        template.fields.forEach(f => {
            mockFields[f.key] = lang === 'zh' ? `[${f.label.zh}]` : `[${f.label.en}]`
        })

        return {
            id: `INS-${Date.now().toString(36).toUpperCase()}`,
            filename,
            businessType,
            businessTypeName: template.name,
            confidence: parseFloat((90 + Math.random() * 9).toFixed(1)),
            status: 'completed',
            recognizedFields: mockFields,
        }
    }

    // Get display value for a field
    function getFieldValue(value) {
        if (value === null || value === undefined) return t('instruction.noFieldData')
        if (typeof value === 'object' && value.zh !== undefined) {
            return lang === 'zh' ? value.zh : value.en
        }
        return String(value)
    }

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
                    {/* Left: Upload + Filter + Instruction List */}
                    <div className="space-y-4">
                        {/* Upload Area */}
                        <div
                            className="glass-card p-6 cursor-pointer group"
                            onClick={() => fileInputRef.current?.click()}
                            style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '200ms' }}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".jpg,.jpeg,.png,.tif,.tiff,.pdf"
                                multiple
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                            <div className={`flex flex-col items-center gap-3 py-4 border-2 border-dashed rounded-xl transition-all duration-300 ${uploading
                                    ? 'border-copper-500/50 bg-copper-500/5'
                                    : 'border-white/10 group-hover:border-copper-500/30'
                                }`}>
                                <div className={`p-3 rounded-2xl transition-all duration-300 ${uploading
                                        ? 'bg-copper-500/20 animate-pulse'
                                        : 'bg-copper-500/10 group-hover:bg-copper-500/20'
                                    }`}>
                                    {uploading ? (
                                        <Sparkles size={24} className="text-copper-400 animate-spin" />
                                    ) : (
                                        <Upload size={24} className="text-copper-400" />
                                    )}
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-300">
                                        {uploading ? t('instruction.importing') : t('instruction.uploadDesc')}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">{t('instruction.uploadHint')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Business Type Filter */}
                        <div className="flex flex-wrap gap-1.5"
                            style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '250ms' }}>
                            <button
                                onClick={() => setFilterType('all')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${filterType === 'all'
                                        ? 'bg-copper-600 text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                {lang === 'zh' ? '全部' : 'All'} ({instructions.length})
                            </button>
                            {Object.entries(instructionTemplates).map(([key, tmpl]) => {
                                const count = instructions.filter(i => i.businessType === key).length
                                if (count === 0) return null
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setFilterType(key)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${filterType === key
                                                ? 'bg-copper-600 text-white'
                                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {lang === 'zh' ? tmpl.name.zh : tmpl.name.en} ({count})
                                    </button>
                                )
                            })}
                        </div>

                        {/* Instruction List */}
                        <div className="space-y-2 max-h-[calc(100vh-420px)] overflow-y-auto custom-scrollbar pr-1">
                            {filteredInstructions.map((inst, index) => (
                                <button
                                    key={inst.id}
                                    onClick={() => setSelectedInstruction(inst)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${selectedInstruction?.id === inst.id
                                        ? 'bg-gradient-to-br from-copper-500/10 to-transparent border-copper-500/30 shadow-[0_4px_12px_rgba(224,142,85,0.08)]'
                                        : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'
                                        }`}
                                    style={{ animation: `fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${300 + index * 60}ms` }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-500">{inst.id}</span>
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${typeColorClasses[inst.businessType] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                                            <Tag size={10} />
                                            {t(`instruction.types.${inst.businessType}`)}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-200 truncate">
                                        {inst.filename}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-gray-500">
                                            {t('instruction.confidence')}: {inst.confidence}%
                                        </span>
                                        <StatusBadge
                                            status={inst.status}
                                            label={t(`instruction.steps.${inst.status}`)}
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Template-based Detail View */}
                    <div className="lg:col-span-2 space-y-4">
                        {selectedInstruction && currentTemplate && (
                            <>
                                {/* Recognition Result Header */}
                                <div className="glass-card p-6"
                                    style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '250ms' }}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-xl bg-copper-500/10">
                                                <FileImage size={20} className="text-copper-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-white truncate max-w-md">
                                                    {selectedInstruction.filename}
                                                </h3>
                                                <p className="text-xs text-gray-500">{selectedInstruction.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">{t('instruction.confidence')}</p>
                                                <p className="text-lg font-light text-emerald-400">{selectedInstruction.confidence}%</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Business Type Badge */}
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                        <div className="flex items-center gap-2">
                                            <Sparkles size={14} className="text-copper-400" />
                                            <span className="text-xs text-gray-500">{t('instruction.typeRecognized')}</span>
                                        </div>
                                        <ArrowRight size={14} className="text-gray-600" />
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${typeColorClasses[selectedInstruction.businessType] || ''}`}>
                                            <Tag size={12} />
                                            {lang === 'zh'
                                                ? selectedInstruction.businessTypeName?.zh || t(`instruction.types.${selectedInstruction.businessType}`)
                                                : selectedInstruction.businessTypeName?.en || t(`instruction.types.${selectedInstruction.businessType}`)
                                            }
                                        </span>
                                    </div>
                                </div>

                                {/* Template View: Recognized Fields */}
                                <div className="glass-card p-6"
                                    style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '350ms' }}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Eye size={16} className="text-copper-400" />
                                            <h3 className="text-sm font-medium text-gray-300">
                                                {t('instruction.templateView')}
                                            </h3>
                                        </div>
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${typeColorClasses[selectedInstruction.businessType] || ''}`}>
                                            {lang === 'zh' ? currentTemplate.name.zh : currentTemplate.name.en}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {currentTemplate.fields.map((field, i) => {
                                            const rawValue = selectedInstruction.recognizedFields?.[field.key]
                                            const displayValue = getFieldValue(rawValue)
                                            const fieldLabel = lang === 'zh' ? field.label.zh : field.label.en

                                            return (
                                                <div
                                                    key={field.key}
                                                    className="flex flex-col gap-1.5 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-200"
                                                    style={{ animation: `fadeInUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${400 + i * 40}ms` }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[11px] text-gray-500 uppercase tracking-wider">
                                                            {fieldLabel}
                                                        </span>
                                                        {field.type === 'currency' && (
                                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">¥</span>
                                                        )}
                                                        {field.type === 'date' && (
                                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">📅</span>
                                                        )}
                                                    </div>
                                                    <span className={`text-sm break-all ${rawValue ? 'text-gray-200' : 'text-gray-600 italic'
                                                        }`}>
                                                        {field.type === 'currency' && rawValue ? `¥ ${displayValue}` : displayValue}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : activeTab === 'monitor' ? (
                /* Peak Payment Monitor Tab */
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

                    {/* Manual stuck instruction monitor moved to dedicated tab */}
                    {false && (
                    <div className="glass-card p-6"
                        style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '260ms' }}>
                        <div className="flex items-start justify-between mb-4 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-300">
                                    {t('instruction.monitor.manualStuckTitle')}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {t('instruction.monitor.manualStuckSubtitle')}
                                </p>
                            </div>
                            {manualStuckSummary && (
                                <div className="flex flex-col items-end gap-1 text-xs">
                                    <span className="text-gray-500">{t('instruction.monitor.manualStuckSummary')}</span>
                                    <div className="flex gap-1.5">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                            <AlertTriangle size={12} />
                                            {manualStuckSummary.warningCount}
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                                            <AlertTriangle size={12} />
                                            {manualStuckSummary.criticalCount}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {manualStuckLoading ? (
                            <p className="text-xs text-gray-500">{t('common.loading')}</p>
                        ) : (
                            <>
                                {manualStuckItems.filter(i => i.alertLevel !== 'none').length === 0 ? (
                                    <p className="text-xs text-gray-600">
                                        {t('instruction.monitor.manualStuckNoData')}
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {manualStuckItems
                                            .filter(i => i.alertLevel !== 'none')
                                            .sort((a, b) => b.stuckMinutes - a.stuckMinutes)
                                            .map(item => {
                                                const level = item.alertLevel
                                                const isCritical = level === 'critical'
                                                const badgeClass = isCritical
                                                    ? 'bg-red-500/10 text-red-400 border-red-500/30'
                                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                const statusLabel = (() => {
                                                    if (item.status === 'MANUAL_REVIEW') {
                                                        return t('instruction.monitor.statusManualReview')
                                                    }
                                                    if (item.status === 'PENDING_PAY') {
                                                        return t('instruction.monitor.statusPendingPay')
                                                    }
                                                    return item.status
                                                })()
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                                                    >
                                                        <div className={`p-2 rounded-lg flex-shrink-0 ${badgeClass}`}>
                                                            <AlertTriangle size={14} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <p className="text-sm text-gray-200 truncate">
                                                                    {item.id} · {item.fundName}
                                                                </p>
                                                                <span className="text-xs text-gray-500 flex-shrink-0">
                                                                    ¥ {item.amount.toLocaleString()}
                                                                </span>
                                                            </div>
                                                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                                                                <span>{statusLabel}</span>
                                                                <span className="inline-flex items-center gap-1">
                                                                    <Clock size={12} />
                                                                    {t('instruction.monitor.stuckMinutes')}: {item.stuckMinutes}{t('instruction.monitor.minutes')}
                                                                </span>
                                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${badgeClass}`}>
                                                                    {isCritical
                                                                        ? t('instruction.monitor.manualStuckCritical')
                                                                        : t('instruction.monitor.manualStuckWarning')}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    )}

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
            ) : (
                /* Manual pending instruction monitor Tab */
                <div className="space-y-6">
                    <div className="glass-card p-6"
                        style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '160ms' }}>
                        <div className="flex items-start justify-between mb-4 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-300">
                                    {t('instruction.monitor.manualStuckTitle')}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {t('instruction.monitor.manualStuckSubtitle')}
                                </p>
                            </div>
                            {manualStuckSummary && (
                                <div className="flex flex-col items-end gap-1 text-xs">
                                    <span className="text-gray-500">{t('instruction.monitor.manualStuckSummary')}</span>
                                    <div className="flex gap-1.5">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                            <AlertTriangle size={12} />
                                            {manualStuckSummary.warningCount}
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border-red-500/20">
                                            <AlertTriangle size={12} />
                                            {manualStuckSummary.criticalCount}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {manualStuckLoading ? (
                            <p className="text-xs text-gray-500">{t('common.loading')}</p>
                        ) : manualStuckFundSummary.length === 0 ? (
                            <p className="text-xs text-gray-600">
                                {t('instruction.monitor.manualStuckNoData')}
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Fund-level summary cards */}
                                <div className="space-y-3">
                                    {manualStuckFundSummary.map((fund, index) => (
                                        <div
                                            key={fund.fundName}
                                            className="p-3 rounded-xl bg-white/[0.02] border border-white/5"
                                            style={{ animation: `fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${220 + index * 60}ms` }}
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-200 truncate">
                                                        {fund.fundName}
                                                    </span>
                                                    <span className="text-[11px] text-gray-500 mt-0.5">
                                                        {fund.instructionCount}{lang === 'zh' ? ' 笔人工滞留指令' : ' pending instructions'}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-end gap-1 text-[11px] text-gray-500 flex-shrink-0">
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                        <AlertTriangle size={11} />
                                                        {fund.warningCount}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border-red-500/20">
                                                        <AlertTriangle size={11} />
                                                        {fund.criticalCount}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                                                <span className="inline-flex items-center gap-1">
                                                    <Clock size={11} />
                                                    {t('instruction.monitor.stuckMinutes')}: {fund.maxStuckMinutes}{t('instruction.monitor.minutes')}
                                                    <span className="mx-1 text-gray-600">/</span>
                                                    avg {fund.avgStuckMinutes}{t('instruction.monitor.minutes')}
                                                </span>
                                                <span>
                                                    ¥ {fund.totalAmount.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Instruction-level list */}
                                <div className="space-y-3">
                                    {manualStuckItems
                                        .filter(i => i.alertLevel !== 'none')
                                        .sort((a, b) => b.stuckMinutes - a.stuckMinutes)
                                        .map(item => {
                                            const level = item.alertLevel
                                            const isCritical = level === 'critical'
                                            const badgeClass = isCritical
                                                ? 'bg-red-500/10 text-red-400 border-red-500/30'
                                                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                            const statusLabel = (() => {
                                                if (item.status === 'MANUAL_REVIEW') {
                                                    return t('instruction.monitor.statusManualReview')
                                                }
                                                if (item.status === 'PENDING_PAY') {
                                                    return t('instruction.monitor.statusPendingPay')
                                                }
                                                return item.status
                                            })()
                                            return (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                                                >
                                                    <div className={`p-2 rounded-lg flex-shrink-0 ${badgeClass}`}>
                                                        <AlertTriangle size={14} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <p className="text-sm text-gray-200 truncate">
                                                                {item.id} · {item.fundName}
                                                            </p>
                                                            <span className="text-xs text-gray-500 flex-shrink-0">
                                                                ¥ {item.amount.toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                                                            <span>{statusLabel}</span>
                                                            <span className="inline-flex items-center gap-1">
                                                                <Clock size={12} />
                                                                {t('instruction.monitor.stuckMinutes')}: {item.stuckMinutes}{t('instruction.monitor.minutes')}
                                                            </span>
                                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${badgeClass}`}>
                                                                {isCritical
                                                                    ? t('instruction.monitor.manualStuckCritical')
                                                                    : t('instruction.monitor.manualStuckWarning')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
