import "@dabsi/common/register";
import NativeHistory from "@dabsi/native/NativeHistory";
import configureViewLoaderByHistory from "@dabsi/view/configureViewLoaderByHistory";
import RegularText from "@dabsi/view/RegularText";
import React from "react";
import { Text } from "react-native";
import "reflect-metadata";
import matchall from "string.prototype.matchall";

matchall.shim();

RegularText.renderer = props => React.createElement(Text, null, props.children);

configureViewLoaderByHistory(NativeHistory);
