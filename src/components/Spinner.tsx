import { Loader2 } from 'lucide-react'

export default function Spinner() {
  return (
    <div className="py-16 flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 text-cobalt dark:text-cobalt-light animate-spin" />
      <span className="mini-tag">LOADING CATALOG...</span>
    </div>
  )
}
