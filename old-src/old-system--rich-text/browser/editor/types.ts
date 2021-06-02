declare global {
  namespace IRichText {
    interface EditorKeyCommands {}
  }
}

export type RichTextEditorKeyCommand =
  | keyof IRichText.EditorKeyCommands
  | Draft.DraftEditorCommand;
