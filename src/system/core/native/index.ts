import { ReactNativeAppRef } from "@dabsi/native";
import NtSystemRoot from "@dabsi/system/core/native/NtSystemRoot";
import React from "react";

ReactNativeAppRef.current = () => React.createElement(NtSystemRoot);
