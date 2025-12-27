import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { DeleteIcon } from '../Icon'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void
  title: string
  itemName: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, title, itemName }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShow(true)
    } else {
      setTimeout(() => setShow(false), 200)
    }
  }, [isOpen])

  if (!isOpen && !show) return null

  return createPortal(
    <div className="fixed inset-0 z-999 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      ></div>

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          className={`relative transform overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/10 text-left shadow-2xl transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-md ${
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 mb-6 group">
              <DeleteIcon width={30} height={30} className="text-red-500 group-hover:scale-110" />
            </div>

            <h3 className="text-xl font-bold leading-6 text-white mb-2" id="modal-title">
              {title}
            </h3>
            <div className="mt-2.5">
              <p className="text-sm text-zinc-400">
                Are you sure you want to delete <span className="text-white font-medium">"{itemName}"</span>
              </p>
              <p className="text-sm text-zinc-400">This action cannot be undone.</p>
            </div>
          </div>

          <div className="bg-black/20 px-8 py-6 flex flex-col sm:flex-row gap-3 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-xl bg-zinc-800 px-6 py-4 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-white/10 hover:bg-zinc-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-red-600 px-6 py-4 text-sm font-medium text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:bg-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
            >
              Yes, Delete it
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default DeleteModal
