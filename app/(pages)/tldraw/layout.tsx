import 'tldraw/tldraw.css'

export default function TldrawLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tldraw-layout">
      {children}
    </div>
  );
}
