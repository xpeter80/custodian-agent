import { useTranslation } from 'react-i18next'
import {
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    DollarSign,
    BarChart3
} from 'lucide-react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    ReferenceLine, ComposedChart, Line
} from 'recharts'
import MetricCard from '../components/MetricCard'
import StatusBadge from '../components/StatusBadge'
import { positionData } from '../data/mockData'

export default function PositionEstimation() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language

    const statusLabels = {
        safe: t('position.safe'),
        caution: t('position.caution'),
        warning: t('position.warning'),
        danger: t('position.danger')
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-midnight-800 border border-white/10 rounded-xl p-3 shadow-2xl">
                    <p className="text-gray-400 text-xs mb-2">{label}</p>
                    {payload.map((entry, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                            <span className="text-gray-400">{entry.name}:</span>
                            <span className="text-white font-medium">{entry.value?.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            )
        }
        return null
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards' }}>
                <h1 className="text-xl font-light text-white tracking-tight">{t('position.title')}</h1>
                <p className="text-gray-500 text-sm mt-1">{t('position.subtitle')}</p>
            </div>

            {/* Position Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard
                    icon={ArrowUpRight}
                    label={t('position.receivable')}
                    value={(positionData.overview.receivable / 10000).toFixed(1)}
                    suffix={t('position.unit')}
                    trend="+5.2%"
                    trendUp={true}
                    delay={100}
                    color="emerald"
                />
                <MetricCard
                    icon={ArrowDownRight}
                    label={t('position.payable')}
                    value={(positionData.overview.payable / 10000).toFixed(1)}
                    suffix={t('position.unit')}
                    trend="+2.1%"
                    trendUp={false}
                    delay={180}
                    color="red"
                />
                <MetricCard
                    icon={DollarSign}
                    label={t('position.netPosition')}
                    value={(positionData.overview.netPosition / 10000).toFixed(1)}
                    suffix={t('position.unit')}
                    trend="+8.3%"
                    trendUp={true}
                    delay={260}
                    color="copper"
                />
            </div>

            {/* Position Trend Chart */}
            <div className="glass-card p-6"
                style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '300ms' }}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-300">{t('position.trend')}</h3>
                    <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-copper-500 rounded-full"></span>{t('position.actual')}</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-400 rounded-full border-dashed"></span>{t('position.predicted')}</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-red-400/50 rounded-full"></span>{t('position.threshold')}</span>
                    </div>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={positionData.trend}>
                            <defs>
                                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#E08E55" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#E08E55" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
                            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <ReferenceLine y={25000} stroke="rgba(239,68,68,0.4)" strokeDasharray="5 5" label={{ value: t('position.upperThreshold'), fill: '#EF4444', fontSize: 10 }} />
                            <ReferenceLine y={10000} stroke="rgba(239,68,68,0.4)" strokeDasharray="5 5" label={{ value: t('position.lowerThreshold'), fill: '#EF4444', fontSize: 10 }} />
                            <Area type="monotone" dataKey="actual" name={t('position.actual')} stroke="#E08E55" strokeWidth={2} fill="url(#actualGradient)" connectNulls={false} />
                            <Line type="monotone" dataKey="predicted" name={t('position.predicted')} stroke="#60A5FA" strokeWidth={2} strokeDasharray="6 3" dot={{ fill: '#60A5FA', r: 3 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Fund Details Table */}
            <div className="glass-card p-6"
                style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards', animationDelay: '400ms' }}>
                <h3 className="text-sm font-medium text-gray-300 mb-4">{t('position.fundDetail')}</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                {[
                                    t('position.fundCode'),
                                    t('position.fundNameCol'),
                                    t('position.positionAmount'),
                                    t('position.predictedAmount'),
                                    t('position.deviation'),
                                    t('position.status')
                                ].map((h, i) => (
                                    <th key={i} className="text-left text-xs font-medium text-gray-500 pb-3 pr-4 uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {positionData.fundDetails.map((fund, index) => (
                                <tr
                                    key={fund.code}
                                    className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors duration-200"
                                    style={{ animation: `fadeInUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${500 + index * 50}ms` }}
                                >
                                    <td className="py-3 pr-4 text-sm text-gray-400 font-mono">{fund.code}</td>
                                    <td className="py-3 pr-4 text-sm text-gray-200">{lang === 'zh' ? fund.name.zh : fund.name.en}</td>
                                    <td className="py-3 pr-4 text-sm text-gray-300">{fund.position.toLocaleString()}</td>
                                    <td className="py-3 pr-4 text-sm text-blue-400">{fund.predicted.toLocaleString()}</td>
                                    <td className="py-3 pr-4">
                                        <span className={`text-sm font-medium ${Math.abs(fund.deviation) > 10 ? 'text-red-400' :
                                                Math.abs(fund.deviation) > 3 ? 'text-amber-400' : 'text-emerald-400'
                                            }`}>
                                            {-fund.deviation > 0 ? '+' : ''}{-fund.deviation}%
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <StatusBadge status={fund.status} label={statusLabels[fund.status]} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
