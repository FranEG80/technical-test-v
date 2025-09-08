import { useEffect, useState } from "react";
import { TLEditorSnapshot, useEditor } from "tldraw";
import { trpc } from "@/server/trpc/client";
import { useAuth } from "@/app/(pages)/_hooks/useAuth";
import { StoreJson } from "@/shared/types";
import { Sheet } from "@/server/modules/notes/domain/entities/SheetEntity";
import { Notebook } from "@/server/modules/notes/domain/entities/NotebookEntity";

type SheetParamsType = { 
    id?: string; 
    notebookId: string; 
    userId: string; 
    title: string; 
    storeJson: StoreJson; 
    order?: number; 
}

type NotebookParamsType = { 
    userId: string; 
    title: string; 
    id?: string; 
}

export default function useTldraw() {
    const { user } = useAuth();
    if (!user) throw new Error("User is required");

    const [snapshot, setSnapshot] = useState<TLEditorSnapshot | null>(null);
    const [notebook, setNotebook] = useState<ReturnType<Notebook['toPrimitives']> | null>(null);
    const [sheet, setSheet] = useState<ReturnType<Sheet['toPrimitives']> | null>(null);


    const saveNotebookMutation = trpc.notebook.create.useMutation();
    const saveSheetMutation = trpc.sheet.create.useMutation();
    const getNotebookQuery = trpc.notebook.listMine.useQuery({ id: user.id });
    const utils = trpc.useUtils();


    const handleSave = (snapshot: TLEditorSnapshot) => {
        setSnapshot(snapshot);
    }

    const getNotebook = async () => {
        if (getNotebookQuery.isLoading) return;
        if (getNotebookQuery.error) throw getNotebookQuery.error;
        const notebooks = getNotebookQuery.data;
        if (!notebooks ||notebooks.length === 0) return;
        const notebook = notebooks[0];
        if (notebook.sheets.length === 0) return;
        const sheet = notebook.sheets[0];
        setNotebook(notebook);
        setSheet(sheet);
        setSnapshot(sheet.storeJson);
    }

    const saveNotebook = async () => {
        const nbParams: NotebookParamsType = { userId: user.id, title: `${new Date().toISOString()}` };
        if (notebook) {
            nbParams['id'] = notebook.id;
        }
        const notebookDB = await saveNotebookMutation.mutateAsync(nbParams);

        setNotebook(notebookDB);
        return notebookDB;
    }
    
    const saveSheet = async () => {
        let nb = notebook;
        if (!notebook) {
            nb = await saveNotebook();
        }
        if (!nb) throw new Error("Notebook is required");

        const sheetParams: SheetParamsType = {
            notebookId: nb.id,
            userId: user.id,
            title: `${new Date().toISOString()}`,
            storeJson: snapshot as StoreJson,
        };
        if (sheet) {
            sheetParams['id'] = sheet.id;
        }

        const sheetDB = await saveSheetMutation.mutateAsync(sheetParams);
        await utils.notebook.listMine.invalidate({ id: user.id });
        setSheet(sheetDB);
    }

    useEffect(() => {
        getNotebook();
    }, []);

    useEffect(() => {
        if (snapshot && getNotebookQuery.data && !saveSheetMutation.isPending) {
            saveSheet();
        }
    }, [snapshot]);

    return {
        save: handleSave,
        loading: saveNotebookMutation.isPending || saveSheetMutation.isPending,
        error: saveNotebookMutation.error || saveSheetMutation.error,
        data: { 
            notebookId: notebook?.id, 
            sheetId: sheet?.id, 
            snapshot
        },
    };
}