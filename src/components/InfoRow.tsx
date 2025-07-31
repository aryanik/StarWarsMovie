interface InfoRowProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

export default function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="group flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:bg-white/80 hover:shadow-md transition-all duration-200">
      <div className="flex-shrink-0 p-2 rounded-lg bg-gray-50 group-hover:bg-white transition-colors duration-200">
        {icon}
      </div>
      <div className="flex-1">
        <span className="block text-sm font-medium text-gray-600 mb-1">{label}</span>
        <span className="block text-lg font-bold text-gray-900">{value}</span>
      </div>
    </div>
  )
}
