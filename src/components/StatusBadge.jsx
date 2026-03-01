import { useTranslation } from 'react-i18next'

const statusColors = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    safe: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    caution: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    compliant: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    nearLimit: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    breached: 'bg-red-500/10 text-red-400 border-red-500/20',
    matched: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    suggested: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    unmatched: 'bg-red-500/10 text-red-400 border-red-500/20',
    completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    sorted: 'bg-copper-500/10 text-copper-400 border-copper-500/20',
    pending: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

const dotColors = {
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    error: 'bg-red-400',
    info: 'bg-blue-400',
    safe: 'bg-emerald-400',
    caution: 'bg-yellow-400',
    danger: 'bg-red-400',
    compliant: 'bg-emerald-400',
    nearLimit: 'bg-amber-400',
    breached: 'bg-red-400',
    matched: 'bg-emerald-400',
    suggested: 'bg-blue-400',
    unmatched: 'bg-red-400',
    completed: 'bg-emerald-400',
    processing: 'bg-blue-400',
    sorted: 'bg-copper-400',
    pending: 'bg-gray-400',
}

export default function StatusBadge({ status, label, showDot = true, size = 'sm' }) {
    const colorClass = statusColors[status] || statusColors.info
    const dotClass = dotColors[status] || dotColors.info
    const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${colorClass} ${sizeClass}`}>
            {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>}
            {label}
        </span>
    )
}
