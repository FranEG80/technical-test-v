'use client'

import 'tldraw/tldraw.css'
import { Tldraw, useEditor, Editor, TLEditorSnapshot, createTLStore, defaultShapeSchemas } from 'tldraw'
import useTldraw from './_hooks/useTldraw'
import { useEffect, useMemo, useState } from 'react'

export default function TldrawClient() { 
  const editor = useEditor()
  const { data, error, loading } = useTldraw()
  const [dataLoaded, setDataLoaded] = useState(false);

  function handleMount(editor: Editor) {
    ;(window as any).editor = editor
  }

  
  useEffect(() => {
    if (data?.snapshot && editor && !dataLoaded) {
      editor?.loadSnapshot(data.snapshot as unknown as TLEditorSnapshot);
      setDataLoaded(true);
    }
    
  }, [data, editor]);

    const store = useMemo(() => {
    // registra TODOS los shapes por defecto (draw, geo, text, etc.)
    return createTLStore({ shapes: defaultShapeSchemas });
  }, []);

  useEffect(() => {
    if (!snapshot) return;
    // en v3/v4 el snapshot es { document, session }
    store.loadSnapshot(snapshot.document); // o editor.store.loadSnapshot(...)
  }, [snapshot, store]);

  if (loading || !dataLoaded ) return <p>Loading...</p>
  if (error) return <p className="text-sm text-red-600 mt-2 text-center">{error.message}</p>
  
  return (
    <div className='h-screen w-full'>
        <Tldraw  onMount={handleMount} />
    </div>
  );
}

