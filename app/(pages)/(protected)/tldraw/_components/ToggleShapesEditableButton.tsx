import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useValue } from 'tldraw'
import useEditor from '../_hooks/useEditor'

function ToggleShapesEditableButton() {
  const {editor} = useEditor()
  const [unlock, setUnlock] = useState(true)
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null)
  
  const toggle = () => {
    requestAnimationFrame(() => {
      if (!editor) return
      const ids = editor.getSelectedShapeIds()
      if (selectedIds.length === 0) {
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
            meta: { ...(s.meta ?? {}), editable: !s.meta?.editable },
          })
          
        })
        // setUnlock(!unlock)
      })

      if (!unlock) {
        editor.setEditingShape(null)
      } else {
        if (ids.length === 1) editor.setEditingShape(ids[0])
      }
    })
  }

  const selectedIds = useValue(
      "selectedIds",
      () => {
        // console.log("PACO",{
        //   selected, shape, unlock
        // })
        if (!editor) return []
        const ids = editor.getSelectedShapeIds()
        if (ids.length === 0) {
          toggle()
          setSelected(null)
          setError(null)
          setUnlock(true)
          return []
        }
        const s = editor.getShape(ids[0])
        if (!s) return ids
        const editable = !!s?.meta?.editable
       
        if (ids.length === 1 && ids[0] !== selected) {
          setSelected(ids[0])
          setError(null)
        }
        if (ids.length === 1) {
          setUnlock(!editable)
        }

        return ids
      },
      [editor]
  ) || []


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
        { selected ?
          !unlock ? 'Lock shape' : 'Unlock shape'
          : 'Select a shape'
        }
      </Button>
    </>
  )
}

export default ToggleShapesEditableButton