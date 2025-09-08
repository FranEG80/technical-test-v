"use client";

import 'tldraw/tldraw.css'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './_components/sidebar'
import { TldrawEditor } from 'tldraw'
import { EditorProvider } from './_context/EditorContext';

export default function TldrawLayout({ children }: { children: React.ReactNode }) {
  return (
    <TldrawEditor>
      <EditorProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="-m-l-6 tldraw-layout w-full h-screen flex-1 overflow-hidden">
            {children}
          </main>
        </SidebarProvider>
      </EditorProvider>
    </TldrawEditor>
  )
}
