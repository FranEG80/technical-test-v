'use client'
import TldrawLayout from './layout';
import TldrawClient from './TldrawClient';

export default function TldrawPage() {
  return (
    <TldrawLayout>
      <h1>Tldraw Editor</h1>
      <TldrawClient />
    </TldrawLayout>
  )
}