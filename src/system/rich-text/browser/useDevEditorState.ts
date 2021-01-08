import { Debounce } from "@dabsi/common/async/Debounce";
import { useHistory } from "@dabsi/typerouter/History";
import {
  CompositeDecorator,
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from "draft-js";
import { useMemo, useState } from "react";

export default function useEditorDevState(
  editorDecorator: CompositeDecorator
): [EditorState, (state: EditorState) => void] {
  const history = useHistory();
  const [state, setState] = useState(() => {
    const raw: RawDraftContentState | undefined =
      history.location.state?._EDITOR_STATE;

    const content = raw && convertFromRaw(raw);
    if (content) {
      return EditorState.createWithContent(content, editorDecorator);
    }
    return EditorState.createWithContent(
      ContentState.createFromText("hello"),
      editorDecorator
    );
  });

  const debounce = useMemo(() => Debounce(500), []);

  return [
    state,
    async (state: EditorState) => {
      setState(state);
      if (await debounce()) {
        const content = state.getCurrentContent();
        const raw = convertToRaw(content);
        history.replace(history.location.pathname, {
          _EDITOR_STATE: raw,
        });
      }
    },
  ];
}
