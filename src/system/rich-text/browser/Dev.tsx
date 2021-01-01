// import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";
// import { Debounce } from "@dabsi/common/async/Debounce";
// import BoxInCenter from "@dabsi/system/acl/browser/BoxInCenter";
// import IconButton from "@material-ui/core/IconButton";
// import BoldIcon from "@material-ui/icons/FormatBold";
// import {
//   CompositeDecorator,
//   convertFromRaw,
//   convertToRaw,
//   Editor,
//   EditorState,
//   RichUtils,
// } from "draft-js";
// import React, { useState } from "react";
// import styled from "styled-components";
// const Container = styled.div`
//   width: 500px;
//   height: 300px;
//   border: 1px solid gray;
// `;

// const setStateDebounce = Debounce(500);

// const Tag = styled.span`
//   color: red;
// `;

// const editorDecorator = new CompositeDecorator([
//   {
//     strategy: (contentBlock, callback, contentState) => {
//       const text = contentBlock.getText();

//       for (const {
//         0: { length },

//         // @ts-expect-error
//         groups: { before, value },
//         index,
//       } of text.matchAll(/(?<before>^|.)(?<value>@[^\s\n]+)/g)) {
//         const start = index + before.length;
//         const end = start + value.length;
//         callback(start, end);
//       }
//     },
//     component: ({ children, decoratedText }) => {
//       return <Tag>{children}</Tag>;
//     },
//   },
// ]);

// export default function DevView() {
//   const [state, setState] = useEditorDevState();
//   const [ref] = useState({
//     current: null as null | {
//       focus();
//     },
//   });
//   return (
//     <BoxInCenter>
//       <MuiGrid direction="column" spacing={2}>
//         <div>
//           <IconButton
//             size="small"
//             onClick={() => {
//               setState(RichUtils.toggleInlineStyle(state, "BOLD"));
//             }}
//           >
//             <BoldIcon />
//           </IconButton>
//         </div>
//         <div
//           onClick={() => {
//             ref.current!.focus();
//             console.log("focus");
//           }}
//         >
//           <Editor
//             ref={element => {
//               ref.current = element;
//             }}
//             editorState={state}
//             onChange={setState}
//             handleKeyCommand={() => {
//               return "not-handled";
//             }}
//           />
//         </div>
//       </MuiGrid>
//     </BoxInCenter>
//   );
// }
// function useEditorDevState(): [EditorState, (state: EditorState) => void] {
//   const [state, setState] = useState(() => {
//     const raw = history.state?._EDITOR_STATE;
//     const content = raw && convertFromRaw(raw);
//     if (content) {
//       return EditorState.createWithContent(content, editorDecorator);
//     }
//     return EditorState.createEmpty(editorDecorator);
//   });

//   return [
//     state,
//     async (state: EditorState) => {
//       setState(state);
//       if (await setStateDebounce()) {
//         const content = state.getCurrentContent();
//         const raw = convertToRaw(content);
//         history.replaceState(
//           {
//             _EDITOR_STATE: raw,
//           },
//           ""
//         );
//       }
//     },
//   ];
// }
