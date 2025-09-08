import { Button } from "@/components/ui/button"
import useTldraw from "../_hooks/useTldraw"
import { useEditor } from "tldraw"


export default function SaveButton() {
  const { save, loading, error } = useTldraw()
  const editor = useEditor()

  function handleSave() {
    save(editor?.getSnapshot())
  }

  return (
    <>
        {error && <p className="text-sm text-red-600 mt-2 text-center">{error.message}</p>}
        <Button
            className="w-3/4 mx-auto bg-vidext text-black  hover:bg-vidext/70"
            onClick={handleSave}
            disabled={loading}
        >{loading ? "Saving..." : "Save"}</Button>
    </>

  )
}