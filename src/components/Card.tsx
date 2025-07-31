interface CardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 p-8 shadow-lg ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  )
}
