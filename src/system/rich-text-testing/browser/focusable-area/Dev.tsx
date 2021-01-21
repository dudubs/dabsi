import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FocusableArea from "@dabsi/system/rich-text-testing/browser/focusable-area/MuiFocusableArea";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import styled from "styled-components";
const Box = styled.div<{}>`
  padding: 10px;
`;

export default function FocusableAreaDev() {
  return (
    <>
      <FocusableArea root>
        <Box>
          focus{" "}
          <FocusableArea
            inline
            toolbar={
              <>
                <IconButton size="small">
                  <FormatBoldIcon />
                </IconButton>
              </>
            }
          >
            level 0
          </FocusableArea>
          <FocusableArea>
            <Box>
              focus{" "}
              <FocusableArea
                inline
                toolbar={
                  <>
                    <IconButton size="small">
                      <FormatBoldIcon />
                    </IconButton>
                  </>
                }
              >
                level 1
              </FocusableArea>
              <FocusableArea
                toolbar={
                  <>
                    <IconButton size="small">
                      <FormatBoldIcon />
                    </IconButton>
                  </>
                }
              >
                <Box>
                  focus <FocusableArea inline>level 2</FocusableArea>
                </Box>
              </FocusableArea>
            </Box>
          </FocusableArea>
        </Box>
      </FocusableArea>
    </>
  );
}
