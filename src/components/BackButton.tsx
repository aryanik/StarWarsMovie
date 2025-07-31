import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function BackButton({ label = 'Back' }: { label?: string }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center cursor-pointer gap-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <ArrowLeftIcon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  )
}