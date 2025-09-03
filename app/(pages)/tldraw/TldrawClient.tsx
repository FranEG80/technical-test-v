'use client'

import 'tldraw/tldraw.css'
import { Tldraw } from 'tldraw'

export default function TldrawClient() {
  return <div style={{ position: 'fixed', inset: 0 }}><Tldraw /></div>
}