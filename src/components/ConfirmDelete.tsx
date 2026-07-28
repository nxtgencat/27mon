import { AlertTriangle } from 'lucide-react'

interface ConfirmDeleteProps {
  title: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDelete({ title, onConfirm, onCancel }: ConfirmDeleteProps) {
  return (
    <div className="fixed inset-0 z-[60] grid place-content-center p-4 sm:p-5">
      <div onClick={onCancel} className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
      <div className="relative bg-surface dark:bg-surfacedark rounded-xl shadow-lg w-[min(92vw,420px)] p-5 sm:p-6 animate-fadeUp">
        <div className="w-10 h-10 rounded-full bg-rose/15 text-rose grid place-content-center mb-3">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <h3 className="font-display font-semibold text-lg mb-1 tracking-tight">
          Delete product?
        </h3>
        <p className="text-sm text-slate dark:text-slatedark mb-6 leading-relaxed">
          &ldquo;{title}&rdquo; will be removed permanently from your store inventory. This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-3">
          <button onClick={onCancel} type="button" className="btn-ghost px-4 py-2">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="px-5 py-2.5 rounded-full bg-rose text-white text-sm font-medium hover:opacity-90 active:scale-[.96] transition-all shadow-sm"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  )
}
