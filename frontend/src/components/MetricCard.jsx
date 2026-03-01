export default function MetricCard({ icon: Icon, label, value, suffix, trend, trendUp, delay = 0, color = 'copper' }) {
    const colorMap = {
        copper: 'from-copper-500/20 to-copper-900/10 border-copper-500/20',
        emerald: 'from-emerald-500/20 to-emerald-900/10 border-emerald-500/20',
        blue: 'from-blue-500/20 to-blue-900/10 border-blue-500/20',
        amber: 'from-amber-500/20 to-amber-900/10 border-amber-500/20',
        red: 'from-red-500/20 to-red-900/10 border-red-500/20',
    }

    const iconColorMap = {
        copper: 'text-copper-400 bg-copper-500/10',
        emerald: 'text-emerald-400 bg-emerald-500/10',
        blue: 'text-blue-400 bg-blue-500/10',
        amber: 'text-amber-400 bg-amber-500/10',
        red: 'text-red-400 bg-red-500/10',
    }

    return (
        <div
            className={`relative overflow-hidden bg-gradient-to-br ${colorMap[color]} border rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_40px_rgba(224,142,85,0.08)] hover:-translate-y-0.5`}
            style={{ animation: `fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`, animationDelay: `${delay}ms` }}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs text-gray-400 mb-2 tracking-wide">{label}</p>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-light text-white tracking-tight">{value}</span>
                        {suffix && <span className="text-sm text-gray-400">{suffix}</span>}
                    </div>
                    {trend !== undefined && (
                        <div className={`flex items-center gap-1 mt-2 text-xs ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
                            <span>{trendUp ? '↑' : '↓'}</span>
                            <span>{trend}</span>
                        </div>
                    )}
                </div>
                {Icon && (
                    <div className={`p-2.5 rounded-xl ${iconColorMap[color]}`}>
                        <Icon size={20} />
                    </div>
                )}
            </div>
            {/* Shimmer overlay */}
            <div className="absolute inset-0 shimmer pointer-events-none opacity-50"></div>
        </div>
    )
}
