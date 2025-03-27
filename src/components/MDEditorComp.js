import { useEffect, useState, useMemo } from "react";

import { Block, BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

// localStrorage에 저장
async function saveToStorage(jsonBlocks: Block[]) {
  localStorage.setItem("blocks", JSON.stringify(jsonBlocks));
}

// localStorage에서 불러오기
async function loadFromStorage() {
  const blocks = localStorage.getItem("blocks");
  if (blocks) {
    return JSON.parse(blocks);
  }
  return [];
}

export default function MDEditorComp() {
  const [blocks, setBlocks] = useState([]);
  const [initialContent, setInitialContent] = useState();

  // const editor = useCreateBlockNote();
  const editor = useMemo(() => {
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent])

  useEffect(() => {
    loadFromStorage().then((blocks) => {
      // setBlocks(blocks);
      setInitialContent(blocks);
    });
  }, []);

  useEffect(() => {
    console.log(blocks);
  }, [blocks]);

  return (
    <div>
      <BlockNoteView
        editor={editor}
        onChange={() => {
          // setBlocks(editor.document);
          saveToStorage(editor.document);
        }} />
    </div>
  );
}