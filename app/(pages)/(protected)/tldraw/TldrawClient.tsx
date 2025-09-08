'use client'

import 'tldraw/tldraw.css'

declare global {
  interface Window {
    editor?: Editor;
  }
}
import { Tldraw, DefaultSpinner } from 'tldraw'
import type { Editor } from 'tldraw'
import { useEffect, useState } from 'react'
import { useAuth } from '../../_hooks/useAuth'
import useTldraw from './_hooks/useTldraw'
import useEditor from './_hooks/useEditor';

export default function TldrawClient() { 
  const { data, error, loading, save } = useTldraw()
  const { user } = useAuth();
  const [timer, setTimer] = useState<number | null>(null);
  const [unlisten, setUnlisten] = useState<(() => void) | undefined>(undefined);
  const { setEditor } = useEditor();

  function handleMount(editor: Editor) {
    if (!user) throw new Error("User is required");

    const remote = data.snapshot
    if (remote) {
      editor.loadSnapshot(remote)
    }

    let last = ''

    const unlisten = editor.store.listen(
      () => {
        if (timer) window.clearTimeout(timer)
        const timerToState = window.setTimeout(async () => {
          const snapshot = editor.getSnapshot()
          const serialized = JSON.stringify(snapshot)
          if (serialized !== last) {
            save(snapshot)
            last = serialized
          }
        }, 800)
        setTimer(timerToState)
      },
      { scope: 'all', source: 'user' }
    )
    setUnlisten(unlisten)
    setEditor(editor)
    ;(window).editor = editor
  }

  const cleanerEditor = () => {
    if (unlisten) {
      unlisten()
      setUnlisten(undefined)
    }
    if (timer) {
      window.clearTimeout(timer)
      setTimer(null)
    }
  }

  useEffect(() => {
    return () => cleanerEditor();
  }, []);
  
  return (
    <div className='h-screen w-full'>
        {
          error 
            ? <p className="text-sm text-red-600 mt-2 text-center">{error.message}</p>
            : loading 
              ? <DefaultSpinner /> 
              : <Tldraw  onMount={handleMount}  persistenceKey="demo-vidext" />
        }
    </div>
  );
}

