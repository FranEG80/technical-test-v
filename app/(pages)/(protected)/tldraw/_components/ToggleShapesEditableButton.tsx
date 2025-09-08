import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useValue } from 'tldraw'
import useEditor from '../_hooks/useEditor'

function ToggleShapesEditableButton() {
  const {editor} = useEditor()
  const [unlock, setUnlock] = useState(false)
  const [error, setError] = useState<string | null>(null);
  
  const selectedIds = useValue(
      "selectedIds",
      () => {
        if (!editor) return []
        return editor.getSelectedShapeIds()
      },
      [editor]
  ) || []

  const toggle = () => {
    requestAnimationFrame(() => {
      if (!editor) return
      const ids = editor.getSelectedShapeIds()
      if (ids.length === 0) {
        setError("No shapes selected")
        return
      }
      if (selectedIds.length > 1) {
        setError("Select only one shape to edit")
        return
      }
      setError(null)

      editor.run(() => {
        selectedIds.forEach(id => {
          const s = editor.getShape(id)
          if (!s ) return
          editor.updateShape({
            id: s.id,
            type: s.type,
            meta: { ...(s.meta ?? {}), editable: !unlock },
          })
        })
        setUnlock(!unlock)
      })

      if (!unlock) {
        editor.setEditingShape(null)
      } else {
        if (ids.length === 1) editor.setEditingShape(ids[0])
      }
    })
  }


  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <>
      { error && <p className="text-red-500 text-sm mb-2">{error}</p> }
      <Button 
        className="w-3/4 mx-auto bg-vidext text-black  hover:bg-vidext/70" 
        onClick={toggle}
        onMouseDown={onMouseDown}
        disabled={selectedIds.length === 0}
        >
        { unlock ? 'Lock shapes' : 'Unlock shapes'}
      </Button>
    </>
  )
}

export default ToggleShapesEditableButton