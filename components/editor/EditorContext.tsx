"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface EditorContextValue {
   sourceNodeId: string | null;
   isSheetOpen: boolean;
   openSheet: (sourceNodeId: string) => void;
   closeSheet: () => void;
}

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
   const [sourceNodeId, setSourceNodeId] = useState<string | null>(null);
   const [isSheetOpen, setIsSheetOpen] = useState(false);

   const openSheet = useCallback((id: string) => {
      setSourceNodeId(id);
      setIsSheetOpen(true);
   }, []);

   const closeSheet = useCallback(() => {
      setIsSheetOpen(false);
      setSourceNodeId(null);
   }, []);

   return (
      <EditorContext.Provider value={{ sourceNodeId, isSheetOpen, openSheet, closeSheet }}>
         {children}
      </EditorContext.Provider>
   );
}

export function useEditor() {
   const ctx = useContext(EditorContext);
   if (!ctx) throw new Error("useEditor must be used inside EditorProvider");
   return ctx;
}
