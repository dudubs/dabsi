(self["webpackChunkdabsi"] = self["webpackChunkdabsi"] || []).push([["index"],{

/***/ "./src/browser/mui/MuiAdmin.tsx":
/*!**************************************!*\
  !*** ./src/browser/mui/MuiAdmin.tsx ***!
  \**************************************/
/*! namespace exports */
/*! export MuiAdmin [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiAdmin": () => /* binding */ MuiAdmin
/* harmony export */ });
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/AppBar */ "./node_modules/@material-ui/core/esm/AppBar/AppBar.js");
/* harmony import */ var _material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Drawer */ "./node_modules/@material-ui/core/esm/Drawer/Drawer.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/makeStyles.js");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "./node_modules/@material-ui/core/esm/Toolbar/Toolbar.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/Typography.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _components_MuiButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/MuiButton */ "./src/browser/mui/components/MuiButton.tsx");
/* harmony import */ var _MuiNestedMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MuiNestedMenu */ "./src/browser/mui/MuiNestedMenu.tsx");
;








const useStyles = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__.default)(theme => ({
    container: {
        marginTop: theme.spacing(2),
    },
    drawer: {
        minWidth: 250,
    },
    root: {},
    title: {
        flexGrow: 1,
    },
    "@global": {
        body: {
            margin: 0,
        },
    },
}));
function MuiAdmin({ children, menu }) {
    const classes = useStyles();
    const [isMenuOpen, setMenu] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: classes.root },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_5__.default, { position: "static" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_6__.default, null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiButton__WEBPACK_IMPORTED_MODULE_2__.MuiButton, { iconOnly: true, icon: __webpack_require__(/*! @material-ui/icons/Menu */ "./node_modules/@material-ui/icons/Menu.js"), edge: "start", color: "inherit", onClick: () => {
                        setMenu(true);
                    } }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__.default, null, _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `ADMIN`)),
            " ",
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_8__.default, { open: isMenuOpen, keepMounted: true, onClose: () => setMenu(false) },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: classes.drawer },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiNestedMenu__WEBPACK_IMPORTED_MODULE_3__.MuiNestedMenu, { children: menu || {} })))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: classes.container }, children)));
}


/***/ }),

/***/ "./src/browser/mui/MuiNestedMenu.tsx":
/*!*******************************************!*\
  !*** ./src/browser/mui/MuiNestedMenu.tsx ***!
  \*******************************************/
/*! namespace exports */
/*! export MuiNestedMenu [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MuiNestedMenuChild [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiNestedMenu": () => /* binding */ MuiNestedMenu,
/* harmony export */   "MuiNestedMenuChild": () => /* binding */ MuiNestedMenuChild
/* harmony export */ });
/* harmony import */ var _material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Collapse */ "./node_modules/@material-ui/core/esm/Collapse/Collapse.js");
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/List */ "./node_modules/@material-ui/core/esm/List/List.js");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/ListItem */ "./node_modules/@material-ui/core/esm/ListItem/ListItem.js");
/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/ListItemIcon */ "./node_modules/@material-ui/core/esm/ListItemIcon/ListItemIcon.js");
/* harmony import */ var _material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/ListItemSecondaryAction */ "./node_modules/@material-ui/core/esm/ListItemSecondaryAction/ListItemSecondaryAction.js");
/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/ListItemText */ "./node_modules/@material-ui/core/esm/ListItemText/ListItemText.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/makeStyles.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_object_hasKeys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/object/hasKeys */ "./src/common/object/hasKeys.ts");
/* harmony import */ var _common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/object/mapObjectToArray */ "./src/common/object/mapObjectToArray.ts");
/* harmony import */ var _immutable2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../immutable2 */ "./src/immutable2.ts");
/* harmony import */ var _lang_LangKey__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lang/LangKey */ "./src/lang/LangKey.tsx");
/* harmony import */ var _react_utils_partialProps__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../react/utils/partialProps */ "./src/react/utils/partialProps.ts");
/* harmony import */ var _components_MuiIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/MuiIcon */ "./src/browser/mui/components/MuiIcon.tsx");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};















const useStyles = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__.default)(theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    itemWithChildText: {},
    parent: {
    // fontWeight: "bold",
    },
    listItemText: {
        fontSize: theme.typography.fontSize,
    },
}));
const List = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_6__.partialProps)(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_9__.default, {
// dense: true,
});
class MuiNestedMenuState extends (0,_immutable2__WEBPACK_IMPORTED_MODULE_4__.ImmutableRecord)({
    selectedPath: "",
}) {
}
function MuiNestedMenu({ children, }) {
    const classes = useStyles();
    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => new MuiNestedMenuState());
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(List, null, (0,_common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_3__.mapObjectToArray)(children, (child, key) => (react__WEBPACK_IMPORTED_MODULE_1__.createElement(MuiNestedMenuChild, Object.assign({}, child, { key: key, menuPath: key, menuKey: key, depth: 0, classes: classes, state: state, setState: setState }))))));
}
function MuiNestedMenuChild(_a) {
    var { children, title, icon, onClick, depth, menuPath, menuKey } = _a, props = __rest(_a, ["children", "title", "icon", "onClick", "depth", "menuPath", "menuKey"]);
    const [isOpen, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { classes, setState, state } = props;
    const itemIcon = react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_10__.default, null, (0,_components_MuiIcon__WEBPACK_IMPORTED_MODULE_7__.MuiIcon)(icon));
    const hasChildren = (0,_common_object_hasKeys__WEBPACK_IMPORTED_MODULE_2__.hasKeys)(children);
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_11__.default, { button: true, selected: state.selectedPath === menuPath, onClick: () => {
                setState(state.set("selectedPath", menuPath));
                onClick === null || onClick === void 0 ? void 0 : onClick();
                if (hasChildren) {
                    setOpen(!isOpen);
                }
            } },
            itemIcon,
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_12__.default, { primaryTypographyProps: {
                    className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__.default)(classes.listItemText, (0,_common_object_hasKeys__WEBPACK_IMPORTED_MODULE_2__.hasKeys)(children) && classes.parent),
                } },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_lang_LangKey__WEBPACK_IMPORTED_MODULE_5__.LangKey, { for: menuKey }, title)),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_13__.default, null, hasChildren &&
                (0,_components_MuiIcon__WEBPACK_IMPORTED_MODULE_7__.MuiIcon)(isOpen
                    ? __webpack_require__(/*! @material-ui/icons/ExpandLess */ "./node_modules/@material-ui/icons/ExpandLess.js")
                    : __webpack_require__(/*! @material-ui/icons/ExpandMore */ "./node_modules/@material-ui/icons/ExpandMore.js")))),
        isOpen && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_14__.default, { in: true },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(List, { disablePadding: true, className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__.default)(depth > 0 && classes.nested) }, (0,_common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_3__.mapObjectToArray)(children || {}, (childProps, key) => (react__WEBPACK_IMPORTED_MODULE_1__.createElement(MuiNestedMenuChild, Object.assign({}, props, { depth: depth + 1, key: key, menuPath: menuPath + "/" + key, menuKey: key, onClick: () => { } }, childProps)))))))));
}


/***/ }),

/***/ "./src/browser/mui/components/MuiButton.tsx":
/*!**************************************************!*\
  !*** ./src/browser/mui/components/MuiButton.tsx ***!
  \**************************************************/
/*! namespace exports */
/*! export MuiAddButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MuiButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MuiCancelButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MuiCloseButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MuiConfirmButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MuiEditButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MuiResetButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MuiSubmitButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiButton": () => /* binding */ MuiButton,
/* harmony export */   "MuiCancelButton": () => /* binding */ MuiCancelButton,
/* harmony export */   "MuiConfirmButton": () => /* binding */ MuiConfirmButton,
/* harmony export */   "MuiResetButton": () => /* binding */ MuiResetButton,
/* harmony export */   "MuiCloseButton": () => /* binding */ MuiCloseButton,
/* harmony export */   "MuiAddButton": () => /* binding */ MuiAddButton,
/* harmony export */   "MuiSubmitButton": () => /* binding */ MuiSubmitButton,
/* harmony export */   "MuiEditButton": () => /* binding */ MuiEditButton
/* harmony export */ });
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/Button.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/IconButton.js");
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Tooltip */ "./node_modules/@material-ui/core/esm/Tooltip/Tooltip.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _react_HookRef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../react/HookRef */ "./src/react/HookRef.ts");
/* harmony import */ var _react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../react/reactor/useEmitter */ "./src/react/reactor/useEmitter.ts");
/* harmony import */ var _react_utils_partialProps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../react/utils/partialProps */ "./src/react/utils/partialProps.ts");
/* harmony import */ var _MuiIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MuiIcon */ "./src/browser/mui/components/MuiIcon.tsx");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};










function MuiButton(props) {
    if (props.buttonType) {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(props.buttonType, Object.assign(Object.assign({}, props), { buttonType: undefined }));
    }
    let { ButtonProps, IconButtonProps, renderOnClick, TooltipProps, disableTooltip, iconOnly, buttonRef: initButtonRef, buttonType, emitOnClick } = props, buttonProps = __rest(props, ["ButtonProps", "IconButtonProps", "renderOnClick", "TooltipProps", "disableTooltip", "iconOnly", "buttonRef", "buttonType", "emitOnClick"]);
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const emit = emitOnClick && (0,_react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_3__.useEmitter)();
    const buttonRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    let element;
    let type;
    if (iconOnly) {
        type = _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__.default;
        buttonProps = Object.assign(Object.assign({}, buttonProps), IconButtonProps);
    }
    else {
        type = _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__.default;
        buttonProps = Object.assign(Object.assign({}, buttonProps), ButtonProps);
    }
    const _a = buttonProps, { title, danger, icon, onClick } = _a, elementProps = __rest(_a, ["title", "danger", "icon", "onClick"]);
    if (danger) {
        elementProps.color = "secondary";
    }
    elementProps.buttonRef = current => {
        (0,_react_HookRef__WEBPACK_IMPORTED_MODULE_2__.updateRef)(initButtonRef, current);
        (0,_react_HookRef__WEBPACK_IMPORTED_MODULE_2__.updateRef)(buttonRef, current);
    };
    elementProps.onClick = event => {
        onClick === null || onClick === void 0 ? void 0 : onClick(event);
        emitOnClick === null || emitOnClick === void 0 ? void 0 : emitOnClick(emit);
        setOpen(true);
    };
    if (iconOnly) {
        elementProps.children = (0,_MuiIcon__WEBPACK_IMPORTED_MODULE_5__.MuiIcon)(icon);
    }
    else {
        elementProps.endIcon = (0,_MuiIcon__WEBPACK_IMPORTED_MODULE_5__.MuiIcon)(icon);
        elementProps.children = title;
    }
    element = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(type, elementProps);
    if ((title || TooltipProps) && !disableTooltip) {
        element = (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_8__.default, Object.assign({ title: title }, TooltipProps), element));
    }
    if (open) {
        element = (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            element, renderOnClick === null || renderOnClick === void 0 ? void 0 :
            renderOnClick(() => setOpen(false), () => buttonRef.current)));
    }
    return element;
}
const MuiCancelButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_4__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Cancel */ "./node_modules/@material-ui/icons/Cancel.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `CANCEL`,
});
const MuiConfirmButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_4__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Done */ "./node_modules/@material-ui/icons/Done.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `CONFIRM`,
});
const MuiResetButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_4__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Clear */ "./node_modules/@material-ui/icons/Clear.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `RESET`,
});
const MuiCloseButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_4__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `CLOSE`,
});
const MuiAddButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_4__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Add */ "./node_modules/@material-ui/icons/Add.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `ADD`,
});
const MuiSubmitButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_4__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Send */ "./node_modules/@material-ui/icons/Send.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `Submit`,
});
const MuiEditButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_4__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Edit */ "./node_modules/@material-ui/icons/Edit.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `EDIT`,
});


/***/ }),

/***/ "./src/browser/mui/components/MuiDangerButton.tsx":
/*!********************************************************!*\
  !*** ./src/browser/mui/components/MuiDangerButton.tsx ***!
  \********************************************************/
/*! namespace exports */
/*! export MuiDangerButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiDangerButton": () => /* binding */ MuiDangerButton
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
/* harmony import */ var _MuiButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MuiButton */ "./src/browser/mui/components/MuiButton.tsx");
/* harmony import */ var _MuiDangerDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MuiDangerDialog */ "./src/browser/mui/components/MuiDangerDialog.tsx");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};




function MuiDangerButton(_a) {
    var { MuiDangerDialogProps, onClick } = _a, props = __rest(_a, ["MuiDangerDialogProps", "onClick"]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiButton__WEBPACK_IMPORTED_MODULE_2__.MuiButton, Object.assign({ danger: true }, props, { renderOnClick: (close) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiDangerDialog__WEBPACK_IMPORTED_MODULE_3__.MuiDangerDialog, Object.assign({}, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(MuiDangerDialogProps, {
            onCancel: () => close(),
            onConfirm: (event) => {
                close();
                onClick === null || onClick === void 0 ? void 0 : onClick(event);
            },
        }), { open: true }))) })));
}


/***/ }),

/***/ "./src/browser/mui/components/MuiDangerDialog.tsx":
/*!********************************************************!*\
  !*** ./src/browser/mui/components/MuiDangerDialog.tsx ***!
  \********************************************************/
/*! namespace exports */
/*! export MuiDangerDialog [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiDangerDialog": () => /* binding */ MuiDangerDialog
/* harmony export */ });
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/Typography.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _MuiDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MuiDialog */ "./src/browser/mui/components/MuiDialog.tsx");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _MuiButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MuiButton */ "./src/browser/mui/components/MuiButton.tsx");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};





const DEFAULT_TITLE = _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `CONFIRM_TO_${"action"}`;
const DEFAULT_TEXT = _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `YOU_ARE_SURE_YOU_WANT_TO_${"action"}_${"object"}?`;
function MuiDangerDialog(_a) {
    var { onCancel, onConfirm, actionTitle, objectTitle, title, text, TypographyProps } = _a, MuiDialogProps = __rest(_a, ["onCancel", "onConfirm", "actionTitle", "objectTitle", "title", "text", "TypographyProps"]);
    const action = actionTitle !== null && actionTitle !== void 0 ? actionTitle : _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `ACTION`;
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiDialog__WEBPACK_IMPORTED_MODULE_1__.MuiDialog, Object.assign({}, MuiDialogProps, { title: title !== null && title !== void 0 ? title : DEFAULT_TITLE({ action }), actions: react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiButton__WEBPACK_IMPORTED_MODULE_3__.MuiCancelButton, { onClick: event => {
                    onCancel === null || onCancel === void 0 ? void 0 : onCancel(event);
                } }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiButton__WEBPACK_IMPORTED_MODULE_3__.MuiConfirmButton, { danger: true, title: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `CONFIRM`, onClick: event => {
                    onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm(event);
                } })) }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__.default, Object.assign({}, TypographyProps), text !== null && text !== void 0 ? text : DEFAULT_TEXT({
            action,
            object: objectTitle !== null && objectTitle !== void 0 ? objectTitle : _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `OBJECT`,
        }))));
}


/***/ }),

/***/ "./src/browser/mui/components/MuiDeleteButton.tsx":
/*!********************************************************!*\
  !*** ./src/browser/mui/components/MuiDeleteButton.tsx ***!
  \********************************************************/
/*! namespace exports */
/*! export MuiDeleteButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiDeleteButton": () => /* binding */ MuiDeleteButton
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _MuiDangerButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MuiDangerButton */ "./src/browser/mui/components/MuiDangerButton.tsx");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};




function MuiDeleteButton(_a) {
    var { objectTitle } = _a, props = __rest(_a, ["objectTitle"]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiDangerButton__WEBPACK_IMPORTED_MODULE_1__.MuiDangerButton, Object.assign({ icon: __webpack_require__(/*! @material-ui/icons/Delete */ "./node_modules/@material-ui/icons/Delete.js"), title: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `DELETE` }, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_3__.mergeProps)(props, {
        MuiDangerDialogProps: {
            objectTitle,
            actionTitle: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `DELETE`,
        },
    }))));
}


/***/ }),

/***/ "./src/browser/mui/components/MuiDialog.tsx":
/*!**************************************************!*\
  !*** ./src/browser/mui/components/MuiDialog.tsx ***!
  \**************************************************/
/*! namespace exports */
/*! export MuiDialog [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiDialog": () => /* binding */ MuiDialog
/* harmony export */ });
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/Dialog.js");
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/DialogActions */ "./node_modules/@material-ui/core/esm/DialogActions/DialogActions.js");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/DialogContent.js");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/DialogTitle.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _MuiButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MuiButton */ "./src/browser/mui/components/MuiButton.tsx");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};







function MuiDialog(_a) {
    var { content, actions, title, children, DialogContentProps, DialogActionsProps, DialogTitleProps, onCancel, onSubmit, MuiCancelButtonProps, MuiSubmitButtonsProps } = _a, DialogProps = __rest(_a, ["content", "actions", "title", "children", "DialogContentProps", "DialogActionsProps", "DialogTitleProps", "onCancel", "onSubmit", "MuiCancelButtonProps", "MuiSubmitButtonsProps"]);
    if (onCancel || onSubmit) {
        actions = (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            onSubmit && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiButton__WEBPACK_IMPORTED_MODULE_1__.MuiSubmitButton, Object.assign({}, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_2__.mergeProps)(MuiSubmitButtonsProps, {
                onClick() {
                    onSubmit();
                },
            })))),
            actions,
            onCancel && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiButton__WEBPACK_IMPORTED_MODULE_1__.MuiCancelButton, Object.assign({}, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_2__.mergeProps)(MuiCancelButtonProps, {
                onClick() {
                    onCancel();
                },
            }))))));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_3__.default, Object.assign({}, DialogProps),
        title && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_4__.default, Object.assign({}, DialogTitleProps), title),
        (content || children) && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_5__.default, Object.assign({}, DialogContentProps),
            content,
            children)),
        actions && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_6__.default, Object.assign({}, DialogActionsProps), actions))));
}


/***/ }),

/***/ "./src/browser/mui/components/MuiGrid.tsx":
/*!************************************************!*\
  !*** ./src/browser/mui/components/MuiGrid.tsx ***!
  \************************************************/
/*! namespace exports */
/*! export MuiGrid [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiGrid": () => /* binding */ MuiGrid
/* harmony export */ });
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/Grid.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



function MuiGrid(_a) {
    var { item, children } = _a, props = __rest(_a, ["item", "children"]);
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__.default, Object.assign({}, props, { container: true }), react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children, child => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__.default, Object.assign({}, item, { item: true }), child)));
}


/***/ }),

/***/ "./src/browser/mui/components/MuiIcon.tsx":
/*!************************************************!*\
  !*** ./src/browser/mui/components/MuiIcon.tsx ***!
  \************************************************/
/*! namespace exports */
/*! export MuiIcon [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiIcon": () => /* binding */ MuiIcon
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_utils_EmptyFragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../react/utils/EmptyFragment */ "./src/react/utils/EmptyFragment.ts");
;


const MuiIconMap = {
    submit: "send",
    reset: "clear",
};
function MuiIcon(arg) {
    var _a;
    if (typeof arg === "string")
        return arg ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", { className: "material-icons" }, (_a = MuiIconMap[arg]) !== null && _a !== void 0 ? _a : arg)) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null));
    if (arg === null || arg === void 0 ? void 0 : arg.default)
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(arg.default);
    return _react_utils_EmptyFragment__WEBPACK_IMPORTED_MODULE_1__.EmptyFragment;
}


/***/ }),

/***/ "./src/browser/mui/components/MuiLink.tsx":
/*!************************************************!*\
  !*** ./src/browser/mui/components/MuiLink.tsx ***!
  \************************************************/
/*! namespace exports */
/*! export MuiLink [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiLink": () => /* binding */ MuiLink
/* harmony export */ });
/* harmony import */ var _material_ui_core_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Link */ "./node_modules/@material-ui/core/esm/Link/Link.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/makeStyles.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
;



const useStyles = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__.default)({
    root: {
        cursor: "pointer",
    },
});
function MuiLink(props) {
    const classes = useStyles();
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_3__.default, Object.assign({}, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(props, {
        className: classes.root,
    }))));
}


/***/ }),

/***/ "./src/browser/mui/components/MuiTableCell.tsx":
/*!*****************************************************!*\
  !*** ./src/browser/mui/components/MuiTableCell.tsx ***!
  \*****************************************************/
/*! namespace exports */
/*! export MuiTableCell [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiTableCell": () => /* binding */ MuiTableCell
/* harmony export */ });
/* harmony import */ var _material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/TableCell */ "./node_modules/@material-ui/core/esm/TableCell/TableCell.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/makeStyles.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};




const useStyles = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__.default)({
    fitToContent: {
        width: "1%",
        whiteSpace: "nowrap",
    },
});
function MuiTableCell(_a) {
    var { fitToContent } = _a, props = __rest(_a, ["fitToContent"]);
    const classes = useStyles();
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_3__.default, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(props, {
        className: classes.fitToContent,
    }));
}


/***/ }),

/***/ "./src/browser/mui/components/MuiTableToolbar.tsx":
/*!********************************************************!*\
  !*** ./src/browser/mui/components/MuiTableToolbar.tsx ***!
  \********************************************************/
/*! namespace exports */
/*! export MuiTableToolbar [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiTableToolbar": () => /* binding */ MuiTableToolbar
/* harmony export */ });
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/Grid.js");
/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/InputAdornment */ "./node_modules/@material-ui/core/esm/InputAdornment/InputAdornment.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/TextField.js");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "./node_modules/@material-ui/core/esm/Toolbar/Toolbar.js");
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Tooltip */ "./node_modules/@material-ui/core/esm/Tooltip/Tooltip.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/Typography.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/makeStyles.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _lang_LangTranslator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lang/LangTranslator */ "./src/lang/LangTranslator.ts");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
/* harmony import */ var _MuiIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MuiIcon */ "./src/browser/mui/components/MuiIcon.tsx");
;













const useStyles = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__.default)(theme => ({
    toolbar: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    title: {
        flex: "1 1 100%",
    },
    hidden: {
        visibility: "hidden",
    },
}));
const COUNT_SELECTED_ITEMS = _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `SELECTED_${"count"}_ITEMS`;
function MuiTableToolbar(props) {
    var _a, _b;
    const classes = useStyles();
    const { search: searchProps } = props;
    const lang = (0,_lang_LangTranslator__WEBPACK_IMPORTED_MODULE_3__.useLangTranslator)();
    const [searchText, setSearchText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(((_a = props.search) === null || _a === void 0 ? void 0 : _a.text) || "");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        var _a;
        setSearchText(((_a = props.search) === null || _a === void 0 ? void 0 : _a.text) || "");
    }, [(_b = props.search) === null || _b === void 0 ? void 0 : _b.text]);
    const title = props.countSelectedItems ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, COUNT_SELECTED_ITEMS({ count: props.countSelectedItems }))) : (props.title);
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_7__.default, Object.assign({}, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_4__.mergeProps)(props.ToolbarProps, {
        className: classes.toolbar,
    })),
        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.default, { container: true },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.default, { item: true, xs: true }, title && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9__.default, Object.assign({ variant: "h6" }, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_4__.mergeProps)(props.TitleTypographyProps, {
                className: classes.title,
            })), title))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.default, { item: true }, props.countSelectedItems ? (props.selectActions) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.default, { container: true, alignItems: "center" },
                props.staticActions && react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.default, { item: true }, props.staticActions),
                searchProps && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.default, { item: true },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_10__.default, Object.assign({ value: searchText, placeholder: lang.translateNode(_lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `SEARCH`) }, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_4__.mergeProps)(searchProps.TextFieldProps, {
                        onChange: event => {
                            var _a;
                            const text = event.target.value;
                            setSearchText(text || "");
                            (_a = searchProps === null || searchProps === void 0 ? void 0 : searchProps.onSearch) === null || _a === void 0 ? void 0 : _a.call(searchProps, text);
                        },
                        onBlur: () => {
                            var _a;
                            (_a = searchProps === null || searchProps === void 0 ? void 0 : searchProps.onSearch) === null || _a === void 0 ? void 0 : _a.call(searchProps, searchText);
                        },
                        onKeyDown: event => {
                            var _a;
                            if (event.key === "Escape") {
                                event.preventDefault();
                                setSearchText("");
                                (_a = searchProps === null || searchProps === void 0 ? void 0 : searchProps.onSearch) === null || _a === void 0 ? void 0 : _a.call(searchProps, "");
                            }
                        },
                        onKeyPress: event => {
                            // console.log({eventKey:event.key});
                            var _a;
                            switch (event.key) {
                                case "Enter":
                                    (_a = searchProps === null || searchProps === void 0 ? void 0 : searchProps.onSearch) === null || _a === void 0 ? void 0 : _a.call(searchProps, searchText);
                                    break;
                                case "Escape":
                                    setSearchText("");
                                    break;
                            }
                        },
                        InputProps: {
                            endAdornment: (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_11__.default, { position: "end" },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12__.default, { title: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `SEARCH` }, (0,_MuiIcon__WEBPACK_IMPORTED_MODULE_5__.MuiIcon)("search")))),
                            startAdornment: (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_11__.default, { className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__.default)({
                                    [classes.hidden]: !searchText,
                                }), position: "start", onClick: () => {
                                    setSearchText("");
                                } }, (0,_MuiIcon__WEBPACK_IMPORTED_MODULE_5__.MuiIcon)("close"))),
                        },
                    })))))))))));
}


/***/ }),

/***/ "./src/browser/mui/createMuiSystem.ts":
/*!********************************************!*\
  !*** ./src/browser/mui/createMuiSystem.ts ***!
  \********************************************/
/*! namespace exports */
/*! export createMuiSystem [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMuiSystem": () => /* binding */ createMuiSystem
/* harmony export */ });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/createMuiTheme.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/styles/esm/ThemeProvider/ThemeProvider.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/styles/esm/jssPreset/jssPreset.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/styles/esm/StylesProvider/StylesProvider.js");
/* harmony import */ var jss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jss */ "./node_modules/jss/dist/jss.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _lang_LangTranslator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lang/LangTranslator */ "./src/lang/LangTranslator.ts");
;





function createMuiSystem({ jssPlugins = [], theme = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__.default)({
    props: {
        MuiTextField: {
            fullWidth: true,
        },
        MuiDialog: {
            fullWidth: true,
        },
    },
}), } = {}) {
    const langTranslator = new _lang_LangTranslator__WEBPACK_IMPORTED_MODULE_2__.LangTranslator({});
    const jss = (0,jss__WEBPACK_IMPORTED_MODULE_0__.create)({
        plugins: [...(0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__.default)().plugins, ...jssPlugins],
    });
    return {
        Provider({ children }) {
            children = (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__.default, {
                children,
                theme,
            });
            children = (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(styled_components__WEBPACK_IMPORTED_MODULE_6__.ThemeProvider, {
                children,
                theme,
            });
            children = (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__.default, {
                children,
                jss,
            });
            children = (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_lang_LangTranslator__WEBPACK_IMPORTED_MODULE_2__.LangTranslatorContext.Provider, {
                children,
                value: langTranslator,
            });
            return children;
        },
    };
}


/***/ }),

/***/ "./src/browser/mui/rpc/MuiDataManagerView.tsx":
/*!****************************************************!*\
  !*** ./src/browser/mui/rpc/MuiDataManagerView.tsx ***!
  \****************************************************/
/*! namespace exports */
/*! export MuiDataManagerView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiDataManagerView": () => /* binding */ MuiDataManagerView
/* harmony export */ });
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/Typography.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
/* harmony import */ var _typerpc_widget_inline_widget_InlineWidgetView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../typerpc/widget/inline-widget/InlineWidgetView */ "./src/typerpc/widget/inline-widget/InlineWidgetView.ts");
/* harmony import */ var _typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../typerpc/widget/WidgetRouterView */ "./src/typerpc/widget/WidgetRouterView.tsx");
/* harmony import */ var _components_MuiButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/MuiButton */ "./src/browser/mui/components/MuiButton.tsx");
/* harmony import */ var _MuiDataTableView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MuiDataTableView */ "./src/browser/mui/rpc/MuiDataTableView.tsx");
/* harmony import */ var _MuiFormView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MuiFormView */ "./src/browser/mui/rpc/MuiFormView.tsx");
/* harmony import */ var _MuiTabsWidgetView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MuiTabsWidgetView */ "./src/browser/mui/rpc/MuiTabsWidgetView.tsx");
;








function MuiDataManagerView(props) {
    const _router = props.router;
    const dm = props;
    // TODO: save table query as state
    // TODO Save table state on location state
    (0,_typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_3__.WidgetRouterView)(_router, dm.connection.table, (props, { location }) => {
        // useLocationState(location.useState(""))
        // location.createState()
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiDataTableView__WEBPACK_IMPORTED_MODULE_5__.MuiDataTableView, Object.assign({}, props, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(dm.MuiDataTableViewProps, {
            toolbarActions: {
                add: Object.assign(Object.assign({ buttonType: _components_MuiButton__WEBPACK_IMPORTED_MODULE_4__.MuiAddButton }, dm.MuiAddButtonProps), { onClick() {
                        location.at("add").push();
                    } }),
            },
            onEditClick(event) {
                location.at("edit", { id: event.key }).push();
            },
            onDeleteClick(event) {
                return dm.connection.delete(event.key);
            },
        }))));
    });
    (0,_typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_3__.WidgetRouterView)(_router.at("add"), dm.connection.add, (props, { location }) => {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiFormView__WEBPACK_IMPORTED_MODULE_6__.MuiFormView, Object.assign({}, props, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(dm.MuiAddFormViewProps, {
            onSubmit(id) {
                location.parent.at("edit", { id }).push();
            },
        }), { input: dm.renderAddInput })));
    });
    (0,_typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_3__.WidgetRouterView)(_router.at("edit"), params => dm.connection.edit(params.id), {
        renderWidget(props, { location }) {
            return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_widget_inline_widget_InlineWidgetView__WEBPACK_IMPORTED_MODULE_2__.InlineWidgetView, Object.assign({}, props, { children: ({ targetProps: props, inlineElement: page }) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__.default, null, page.title),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiTabsWidgetView__WEBPACK_IMPORTED_MODULE_7__.MuiTabsWidgetView
                    // onTabChange={}
                    , Object.assign({}, props, { tabs: Object.assign(Object.assign({}, dm.editTabs), { form: Object.assign(Object.assign({}, dm.MuiEditFormTabViewProps), { render: props => {
                                    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiFormView__WEBPACK_IMPORTED_MODULE_6__.MuiFormView, Object.assign({}, props, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(dm.MuiEditFormViewProps, {
                                        onSubmit() {
                                            location.parent.push();
                                        },
                                    }), { input: dm.renderEditInput || dm.renderAddInput })));
                                } }) }) })))) })));
        },
    });
}


/***/ }),

/***/ "./src/browser/mui/rpc/MuiDataTableView.tsx":
/*!**************************************************!*\
  !*** ./src/browser/mui/rpc/MuiDataTableView.tsx ***!
  \**************************************************/
/*! namespace exports */
/*! export MuiDataTableView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiDataTableView": () => /* binding */ MuiDataTableView
/* harmony export */ });
/* harmony import */ var _material_ui_core_Table__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/Table */ "./node_modules/@material-ui/core/esm/Table/Table.js");
/* harmony import */ var _material_ui_core_TableBody__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/TableBody */ "./node_modules/@material-ui/core/esm/TableBody/TableBody.js");
/* harmony import */ var _material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/TableCell */ "./node_modules/@material-ui/core/esm/TableCell/TableCell.js");
/* harmony import */ var _material_ui_core_TableFooter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/TableFooter */ "./node_modules/@material-ui/core/esm/TableFooter/TableFooter.js");
/* harmony import */ var _material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/TableHead */ "./node_modules/@material-ui/core/esm/TableHead/TableHead.js");
/* harmony import */ var _material_ui_core_TablePagination__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/TablePagination */ "./node_modules/@material-ui/core/esm/TablePagination/TablePagination.js");
/* harmony import */ var _material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/TableRow */ "./node_modules/@material-ui/core/esm/TableRow/TableRow.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_object_hasKeys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/object/hasKeys */ "./src/common/object/hasKeys.ts");
/* harmony import */ var _common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/object/mapObjectToArray */ "./src/common/object/mapObjectToArray.ts");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _lang_LangKey__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../lang/LangKey */ "./src/lang/LangKey.tsx");
/* harmony import */ var _react_TableLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../react/TableLayout */ "./src/react/TableLayout.ts");
/* harmony import */ var _typerpc_widget_data_table_DataTableView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../typerpc/widget/data-table/DataTableView */ "./src/typerpc/widget/data-table/DataTableView.ts");
/* harmony import */ var _components_MuiButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/MuiButton */ "./src/browser/mui/components/MuiButton.tsx");
/* harmony import */ var _components_MuiDeleteButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/MuiDeleteButton */ "./src/browser/mui/components/MuiDeleteButton.tsx");
/* harmony import */ var _components_MuiTableCell__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/MuiTableCell */ "./src/browser/mui/components/MuiTableCell.tsx");
/* harmony import */ var _components_MuiTableToolbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/MuiTableToolbar */ "./src/browser/mui/components/MuiTableToolbar.tsx");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



















function MuiDataTableView(props) {
    let _a = props, { TableProps, TableHeadProps, TableBodyProps, TableFooterProps, onDeleteClick, onEditClick, actions, columns, MuiTableToolbarProps, MuiDeleteButtonProps, toolbarActions = {}, disableToolbar, title } = _a, nextProps = __rest(_a, ["TableProps", "TableHeadProps", "TableBodyProps", "TableFooterProps", "onDeleteClick", "onEditClick", "actions", "columns", "MuiTableToolbarProps", "MuiDeleteButtonProps", "toolbarActions", "disableToolbar", "title"]);
    const tableRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    actions = Object.assign({}, actions);
    onEditClick &&
        (actions.add = {
            title: _lang_Lang__WEBPACK_IMPORTED_MODULE_3__.Lang `EDIT`,
            icon: __webpack_require__(/*! @material-ui/icons/Edit */ "./node_modules/@material-ui/icons/Edit.js"),
            onClick: onEditClick,
        });
    onDeleteClick &&
        (actions.delete = {
            buttonType: _components_MuiDeleteButton__WEBPACK_IMPORTED_MODULE_8__.MuiDeleteButton,
            onClick: async (event) => {
                await onDeleteClick(event);
                await tableRef.current.reloadAfterRemove(event.key);
            },
        });
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_widget_data_table_DataTableView__WEBPACK_IMPORTED_MODULE_6__.DataTableView, Object.assign({}, nextProps, { ref: tableRef }), table => {
        var _a;
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_TableLayout__WEBPACK_IMPORTED_MODULE_5__.TableLayout, { getRowKey: row => row.$key, getRowData: row => row, rows: table.rows, columns: ((_a = table.element) === null || _a === void 0 ? void 0 : _a.columns) || {}, renderColumnTitle: column => {
                var _a;
                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_lang_LangKey__WEBPACK_IMPORTED_MODULE_4__.LangKey, { for: column.key }, (_a = columns === null || columns === void 0 ? void 0 : columns[column.key]) === null || _a === void 0 ? void 0 : _a.title));
            }, renderColumn: (column, children) => {
                var _a;
                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_11__.default, Object.assign({ key: column.key }, (_a = columns === null || columns === void 0 ? void 0 : columns[column.key]) === null || _a === void 0 ? void 0 : _a.MuiTableColumnProps), children));
            }, renderRow: (row, children) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_12__.default, { key: row.key },
                children,
                (0,_common_object_hasKeys__WEBPACK_IMPORTED_MODULE_1__.hasKeys)(actions) && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiTableCell__WEBPACK_IMPORTED_MODULE_9__.MuiTableCell, { fitToContent: true }, (0,_common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_2__.mapObjectToArray)(actions, (_a, key) => {
                    var { visible, onClick } = _a, MuiButtonProps = __rest(_a, ["visible", "onClick"]);
                    if (visible && !visible(row.data))
                        return;
                    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiButton__WEBPACK_IMPORTED_MODULE_7__.MuiButton, Object.assign({ iconOnly: true, size: "small", key: key }, MuiButtonProps, { onClick: async () => {
                            onClick === null || onClick === void 0 ? void 0 : onClick({
                                row: row.data,
                                key: row.key,
                                connection: table.props.connection.controller.getRowController(row.key),
                                table,
                            });
                        } })));
                }))))), renderRowColumn: (data, row, column) => {
                const { renderRowColumn } = (columns === null || columns === void 0 ? void 0 : columns[column.key]) || {};
                if (renderRowColumn)
                    return renderRowColumn(data, {
                        key: row.key,
                        row: row.data,
                    });
                return String(data);
            }, render: ({ columns, rows }) => {
                var _a;
                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
                    !disableToolbar && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiTableToolbar__WEBPACK_IMPORTED_MODULE_10__.MuiTableToolbar, Object.assign({ title: title }, MuiTableToolbarProps, { search: !((_a = table.element) === null || _a === void 0 ? void 0 : _a.searchable)
                            ? undefined
                            : {
                                text: table.searchText,
                                onSearch: async (text) => {
                                    table.search(text);
                                },
                            }, staticActions: (0,_common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_2__.mapObjectToArray)(toolbarActions, (props, key) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiButton__WEBPACK_IMPORTED_MODULE_7__.MuiButton, Object.assign({ iconOnly: true, key: key }, props, { onClick: () => {
                                var _a;
                                (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, { table });
                            } })))) }))),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Table__WEBPACK_IMPORTED_MODULE_13__.default, Object.assign({}, TableProps),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_14__.default, Object.assign({}, TableHeadProps), !table.isLoading && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_12__.default, null,
                            columns,
                            (0,_common_object_hasKeys__WEBPACK_IMPORTED_MODULE_1__.hasKeys)(actions) && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiTableCell__WEBPACK_IMPORTED_MODULE_9__.MuiTableCell, { fitToContent: true })))),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TableBody__WEBPACK_IMPORTED_MODULE_15__.default, Object.assign({}, TableBodyProps),
                            table.isLoading && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_12__.default, null,
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_11__.default, { colSpan: 1000, align: "center" }, _lang_Lang__WEBPACK_IMPORTED_MODULE_3__.Lang `LOADING_IN_PROGRESS`))),
                            rows.length ? (rows) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_12__.default, null,
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_11__.default, { colSpan: 1000, align: "center" }, _lang_Lang__WEBPACK_IMPORTED_MODULE_3__.Lang `NO_HAVE_MORE_ROWS`)))),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TableFooter__WEBPACK_IMPORTED_MODULE_16__.default, Object.assign({}, TableFooterProps),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_12__.default, null,
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TablePagination__WEBPACK_IMPORTED_MODULE_17__.default, { count: table.pageSize, page: table.pageIndex, rowsPerPage: table.pageSize, onChangeRowsPerPage: event => {
                                        table.setPageSize(parseInt(event.target.value));
                                    }, onChangePage: (event, page) => {
                                        table.setPageIndex(page);
                                    } }))))));
            } }));
    }));
}


/***/ }),

/***/ "./src/browser/mui/rpc/MuiFormView.tsx":
/*!*********************************************!*\
  !*** ./src/browser/mui/rpc/MuiFormView.tsx ***!
  \*********************************************/
/*! namespace exports */
/*! export MuiFormView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiFormView": () => /* binding */ MuiFormView
/* harmony export */ });
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/Grid.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
/* harmony import */ var _typerpc_widget_form_FormView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../typerpc/widget/form/FormView */ "./src/typerpc/widget/form/FormView.tsx");
/* harmony import */ var _components_MuiButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/MuiButton */ "./src/browser/mui/components/MuiButton.tsx");
/* harmony import */ var _components_MuiGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/MuiGrid */ "./src/browser/mui/components/MuiGrid.tsx");
;





function MuiFormView(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_widget_form_FormView__WEBPACK_IMPORTED_MODULE_2__.FormView, Object.assign({}, props), ({ input }) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__.default, { container: true, direction: "column", spacing: 2 },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__.default, { item: true }, input),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__.default, { item: true },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiGrid__WEBPACK_IMPORTED_MODULE_4__.MuiGrid, { spacing: 2, justify: "flex-end" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiButton__WEBPACK_IMPORTED_MODULE_3__.MuiSubmitButton, Object.assign({}, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(props.MuiSubmitButtonProps, {
                    emitOnClick: emit => {
                        emit(new _typerpc_widget_form_FormView__WEBPACK_IMPORTED_MODULE_2__.FormViewEvent("SUBMIT"));
                    },
                }))),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiButton__WEBPACK_IMPORTED_MODULE_3__.MuiResetButton, Object.assign({}, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(props.MuiResetButtonProps, {
                    emitOnClick: emit => {
                        emit(new _typerpc_widget_form_FormView__WEBPACK_IMPORTED_MODULE_2__.FormViewEvent("RESET"));
                    },
                })))))))));
}
/*


  <ReactorProvider>

    <ReactorListener toEvent= onEvent= />


  </ReactorProvider>

 */


/***/ }),

/***/ "./src/browser/mui/rpc/MuiTabsWidgetView.tsx":
/*!***************************************************!*\
  !*** ./src/browser/mui/rpc/MuiTabsWidgetView.tsx ***!
  \***************************************************/
/*! namespace exports */
/*! export LocationState [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MuiTabsWidgetView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiTabsWidgetView": () => /* binding */ MuiTabsWidgetView,
/* harmony export */   "LocationState": () => /* binding */ LocationState
/* harmony export */ });
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Tab */ "./node_modules/@material-ui/core/esm/Tab/Tab.js");
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Tabs */ "./node_modules/@material-ui/core/esm/Tabs/Tabs.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_object_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/object/keys */ "./src/common/object/keys.ts");
/* harmony import */ var _lang_LangKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lang/LangKey */ "./src/lang/LangKey.tsx");
/* harmony import */ var _react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../react/reactor/useEmitter */ "./src/react/reactor/useEmitter.ts");
/* harmony import */ var _react_utils_EmptyFragment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../react/utils/EmptyFragment */ "./src/react/utils/EmptyFragment.ts");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
/* harmony import */ var _typerpc_widget_tabs_widget_TabsWidgetView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../typerpc/widget/tabs-widget/TabsWidgetView */ "./src/typerpc/widget/tabs-widget/TabsWidgetView.tsx");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};









function MuiTabsWidgetView(props) {
    const _a = props, { tabs: tabOptionsMap, TabsProps, TabProps, SelectedTabProps, renderTabPanel } = _a, otherProps = __rest(_a, ["tabs", "TabsProps", "TabProps", "SelectedTabProps", "renderTabPanel"]);
    const emit = (0,_react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_3__.useEmitter)();
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_widget_tabs_widget_TabsWidgetView__WEBPACK_IMPORTED_MODULE_6__.TabsWidgetView, Object.assign({}, otherProps), view => {
        var _a;
        const tabs = [];
        const { currentTabProps } = view;
        const currentTabOptions = currentTabProps && getTabOptions(currentTabProps.key);
        for (const tabKey of (0,_common_object_keys__WEBPACK_IMPORTED_MODULE_1__.keys)(props.connection.rpc.tabMap)) {
            const tabOptions = getTabOptions(tabKey);
            const isSelected = (currentTabProps === null || currentTabProps === void 0 ? void 0 : currentTabProps.key) === tabKey;
            tabs.push(react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_7__.default, Object.assign({ key: tabKey }, TabProps, (isSelected ? SelectedTabProps : null), { label: react__WEBPACK_IMPORTED_MODULE_0__.createElement(_lang_LangKey__WEBPACK_IMPORTED_MODULE_2__.LangKey, { for: tabKey }, tabOptions === null || tabOptions === void 0 ? void 0 : tabOptions.title), value: tabKey })));
        }
        let tabContent = undefined;
        if (currentTabOptions === null || currentTabOptions === void 0 ? void 0 : currentTabOptions.render) {
            tabContent = (_a = currentTabOptions.render) === null || _a === void 0 ? void 0 : _a.call(currentTabOptions, currentTabProps);
        }
        if (tabs.length === 1)
            return tabContent !== null && tabContent !== void 0 ? tabContent : _react_utils_EmptyFragment__WEBPACK_IMPORTED_MODULE_4__.EmptyFragment;
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_8__.default, Object.assign({}, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_5__.mergeProps)(TabsProps, {
                onChange: (_, key) => {
                    var _a;
                    (_a = props.onTabChange) === null || _a === void 0 ? void 0 : _a.call(props, key);
                    return view.switchTo(key);
                },
            }), { value: currentTabProps === null || currentTabProps === void 0 ? void 0 : currentTabProps.key }), tabs),
            renderTabPanel
                ? renderTabPanel({ children: tabContent })
                : tabContent));
        function getTabOptions(key) {
            if (tabOptionsMap)
                return (typeof tabOptionsMap[key] === "function"
                    ? { render: tabOptionsMap[key] }
                    : tabOptionsMap[key]);
        }
    }));
}
class LocationState {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}


/***/ }),

/***/ "./src/browser/mui/rpc/inputs/MuiCheckboxInputView.tsx":
/*!*************************************************************!*\
  !*** ./src/browser/mui/rpc/inputs/MuiCheckboxInputView.tsx ***!
  \*************************************************************/
/*! namespace exports */
/*! export MuiCheckboxInputView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiCheckboxInputView": () => /* binding */ MuiCheckboxInputView
/* harmony export */ });
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "./node_modules/@material-ui/core/esm/Checkbox/Checkbox.js");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "./node_modules/@material-ui/core/esm/FormControlLabel/FormControlLabel.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
/* harmony import */ var _typerpc_input_bool_input_BoolInputView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../typerpc/input/bool-input/BoolInputView */ "./src/typerpc/input/bool-input/BoolInputView.tsx");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};





function MuiCheckboxInputView(_a) {
    var { title, CheckboxProps, FormControlLabelProps } = _a, props = __rest(_a, ["title", "CheckboxProps", "FormControlLabelProps"]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_input_bool_input_BoolInputView__WEBPACK_IMPORTED_MODULE_2__.BoolInputView, Object.assign({}, props), view => {
        const checkbox = (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_3__.default, Object.assign({}, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(CheckboxProps, {
            onChange: () => view.setValue(!view.value),
        }), { checked: view.value })));
        return title ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_4__.default, Object.assign({}, FormControlLabelProps, { label: title, control: checkbox }))) : (checkbox);
    }));
}


/***/ }),

/***/ "./src/browser/mui/rpc/inputs/MuiDataInputView.tsx":
/*!*********************************************************!*\
  !*** ./src/browser/mui/rpc/inputs/MuiDataInputView.tsx ***!
  \*********************************************************/
/*! namespace exports */
/*! export MuiDataInputView [provided] [no usage info] [missing usage info prevents renaming] */
/*! export useStyles [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useStyles": () => /* binding */ useStyles,
/* harmony export */   "MuiDataInputView": () => /* binding */ MuiDataInputView
/* harmony export */ });
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/Dialog.js");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/DialogContent.js");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/DialogTitle.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/TextField.js");
/* harmony import */ var _material_ui_lab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/lab */ "./node_modules/@material-ui/lab/esm/Autocomplete/Autocomplete.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/makeStyles.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _lang_LangTranslator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lang/LangTranslator */ "./src/lang/LangTranslator.ts");
/* harmony import */ var _typerpc_input_data_input_DataInputView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../typerpc/input/data-input/DataInputView */ "./src/typerpc/input/data-input/DataInputView.ts");
/* harmony import */ var _typerpc_widget_WidgetViewLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../typerpc/widget/WidgetViewLoader */ "./src/typerpc/widget/WidgetViewLoader.ts");
/* harmony import */ var _components_MuiLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/MuiLink */ "./src/browser/mui/components/MuiLink.tsx");
/* harmony import */ var _MuiDataTableView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../MuiDataTableView */ "./src/browser/mui/rpc/MuiDataTableView.tsx");
;













const useStyles = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__.default)(theme => ({}));
// TODO: Load the firsts rows
function MuiDataInputView(props) {
    const lang = (0,_lang_LangTranslator__WEBPACK_IMPORTED_MODULE_2__.useLangTranslator)();
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [isOpen, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [queryResult, setQueryResult] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    async function updateOptions(text) {
        setQueryResult(await props.connection.controller.getRows({
            getCount: true,
            text,
            take: 15,
        }));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_input_data_input_DataInputView__WEBPACK_IMPORTED_MODULE_3__.DataInputView, Object.assign({}, props, { ref: inputRef, children: view => {
                const options = (queryResult === null || queryResult === void 0 ? void 0 : queryResult.rows) || (view.value ? [view.value] : []);
                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_8__.default, { clearOnEscape: true, value: view.value || null, onChange: (_, value) => {
                            view.setValue(value);
                        }, onDoubleClick: () => {
                            setOpen(true);
                        }, onInputChange: (_, value) => {
                            updateOptions(value);
                        }, getOptionLabel: row => props["getLabel"] ? props["getLabel"](row) : row["label"], options: options, getOptionSelected: (o, v) => o.$key === v.$key, renderInput: params => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_9__.default, Object.assign({}, params, { error: !!view.error, helperText: view.renderError(), label: lang.translateNode(props.title) }))) })));
            } })),
        isOpen && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_10__.default, { open: true, onClose: () => setOpen(false) },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_11__.default, null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_12__.default, null, _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `PICK_${"subject"}`({
                    subject: props.title,
                })),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_widget_WidgetViewLoader__WEBPACK_IMPORTED_MODULE_4__.WidgetViewLoader, { connection: props.connection.controller, children: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiDataTableView__WEBPACK_IMPORTED_MODULE_6__.MuiDataTableView
                    // disableToolbar
                    , Object.assign({}, props, { actions: {
                            pick: {
                                title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `PICK`,
                                icon: __webpack_require__(/*! @material-ui/icons/KeyboardReturn */ "./node_modules/@material-ui/icons/KeyboardReturn.js"),
                                onClick: event => {
                                    setQueryResult(undefined);
                                    inputRef.current.setValue(event.row);
                                    setOpen(false);
                                },
                            },
                        }, columns: {
                            label: {
                                title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `ACCOUNT_FULL_NAME`,
                                renderRowColumn: (data, props) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiLink__WEBPACK_IMPORTED_MODULE_5__.MuiLink, { onClick: () => {
                                        setQueryResult(undefined);
                                        inputRef.current.setValue(props.row);
                                        setOpen(false);
                                    } }, data)),
                            },
                        } }))) }))))));
}


/***/ }),

/***/ "./src/browser/mui/rpc/inputs/MuiTextInputView.tsx":
/*!*********************************************************!*\
  !*** ./src/browser/mui/rpc/inputs/MuiTextInputView.tsx ***!
  \*********************************************************/
/*! namespace exports */
/*! export MuiTextInputView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiTextInputView": () => /* binding */ MuiTextInputView
/* harmony export */ });
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/TextField.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../react/reactor/useEmitter */ "./src/react/reactor/useEmitter.ts");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
/* harmony import */ var _typerpc_input_text_input_TextInputView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../typerpc/input/text-input/TextInputView */ "./src/typerpc/input/text-input/TextInputView.ts");
/* harmony import */ var _typerpc_widget_form_FormView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../typerpc/widget/form/FormView */ "./src/typerpc/widget/form/FormView.tsx");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};






function MuiTextInputView(_a) {
    var { title, TextFieldProps } = _a, props = __rest(_a, ["title", "TextFieldProps"]);
    const emit = (0,_react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_1__.useEmitter)();
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_input_text_input_TextInputView__WEBPACK_IMPORTED_MODULE_3__.TextInputView, Object.assign({}, props, { children: view => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__.default, Object.assign({ fullWidth: true }, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_2__.mergeProps)(TextFieldProps, {
            onBlur: () => view.validate(),
            onChange: event => view.setText(event.target.value),
            onKeyPress: event => {
                if (event.key === "Enter") {
                    emit(new _typerpc_widget_form_FormView__WEBPACK_IMPORTED_MODULE_4__.FormViewEvent("SUBMIT"));
                }
            },
        }), { label: title, error: view.error != null, helperText: view.renderError(), value: view.text || "" }))) })));
}
/*

  Key


 */


/***/ }),

/***/ "./src/common/MetaType.ts":
/*!********************************!*\
  !*** ./src/common/MetaType.ts ***!
  \********************************/
/*! namespace exports */
/*! export testMetaType [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "testMetaType": () => /* binding */ testMetaType
/* harmony export */ });
function testMetaType(obj, callback) {
    //
}


/***/ }),

/***/ "./src/common/WeakId.ts":
/*!******************************!*\
  !*** ./src/common/WeakId.ts ***!
  \******************************/
/*! namespace exports */
/*! export WeakId [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WeakId": () => /* binding */ WeakId
/* harmony export */ });
const ids = new WeakMap();
let counter = 0;
function WeakId(o) {
    var _a;
    return (_a = ids.get(o)) !== null && _a !== void 0 ? _a : ids.set(o, ++counter).get(o);
}


/***/ }),

/***/ "./src/common/array/useArrayToSeq.ts":
/*!*******************************************!*\
  !*** ./src/common/array/useArrayToSeq.ts ***!
  \*******************************************/
/*! namespace exports */
/*! export useArrayToSeq [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useArrayToSeq": () => /* binding */ useArrayToSeq
/* harmony export */ });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.es.js");
/* harmony import */ var _patterns_lazy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../patterns/lazy */ "./src/common/patterns/lazy.ts");
;

const useArrayToSeq = (0,_patterns_lazy__WEBPACK_IMPORTED_MODULE_1__.Lazy)(() => {
    Array.prototype.toSeq = function () {
        return immutable__WEBPACK_IMPORTED_MODULE_0__.Seq.Indexed(this);
    };
});


/***/ }),

/***/ "./src/common/assert.ts":
/*!******************************!*\
  !*** ./src/common/assert.ts ***!
  \******************************/
/*! namespace exports */
/*! export assert [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assert": () => /* binding */ assert
/* harmony export */ });
function assert(value, message) {
    if (!value)
        throw new Error(typeof message === "function" ? message() :
            message);
}


/***/ }),

/***/ "./src/common/async/Timeout.ts":
/*!*************************************!*\
  !*** ./src/common/async/Timeout.ts ***!
  \*************************************/
/*! namespace exports */
/*! export Timeout [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Timeout": () => /* binding */ Timeout
/* harmony export */ });
function Timeout(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


/***/ }),

/***/ "./src/common/async/Waiter.ts":
/*!************************************!*\
  !*** ./src/common/async/Waiter.ts ***!
  \************************************/
/*! namespace exports */
/*! export Waiter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Waiter": () => /* binding */ Waiter
/* harmony export */ });
function Waiter() {
    let props;
    const promise = new Promise((resolve, reject) => {
        props = { resolve, reject };
    });
    Object.assign(promise, props);
    return promise;
}


/***/ }),

/***/ "./src/common/getNextPath.ts":
/*!***********************************!*\
  !*** ./src/common/getNextPath.ts ***!
  \***********************************/
/*! namespace exports */
/*! export getNextPath [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNextPath": () => /* binding */ getNextPath
/* harmony export */ });
function getNextPath(path) {
    let start = 0;
    while (path.charAt(start) === '/') {
        start++;
    }
    const end = path.indexOf('/', start);
    if (0 > end) {
        return [path.slice(start), ""];
    }
    return [path.slice(start, end), path.slice(end)];
}


/***/ }),

/***/ "./src/common/map/mapFactory.ts":
/*!**************************************!*\
  !*** ./src/common/map/mapFactory.ts ***!
  \**************************************/
/*! namespace exports */
/*! export BaseMapFactory [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MapFactory [provided] [no usage info] [missing usage info prevents renaming] */
/*! export WeakMapFactory [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WeakMapFactory": () => /* binding */ WeakMapFactory,
/* harmony export */   "MapFactory": () => /* binding */ MapFactory,
/* harmony export */   "BaseMapFactory": () => /* binding */ BaseMapFactory
/* harmony export */ });
/* harmony import */ var _assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assert */ "./src/common/assert.ts");
;
function mapFactory(map, factory) {
    touch.map = map;
    return touch;
    function touch(key, callback) {
        if (callback) {
            return map.has(key) ? callback(map.get(key)) : undefined;
        }
        let value = map.get(key);
        if (value || (typeof value !== "undefined")) {
            return value;
        }
        map.set(key, value = factory(key));
        (0,_assert__WEBPACK_IMPORTED_MODULE_0__.assert)(typeof value !== "undefined");
        return value;
    }
}
function WeakMapFactory(factory) {
    return mapFactory(new WeakMap(), factory);
}
function MapFactory(factory) {
    return mapFactory(new Map(), factory);
}
function BaseMapFactory(map, factory) {
    return mapFactory(map, factory);
}


/***/ }),

/***/ "./src/common/map/touchMap.ts":
/*!************************************!*\
  !*** ./src/common/map/touchMap.ts ***!
  \************************************/
/*! namespace exports */
/*! export touchMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "touchMap": () => /* binding */ touchMap
/* harmony export */ });
function touchMap(map, key, callback) {
    let value = map.get(key);
    if (value || map.has(key)) {
        return value;
    }
    map.set(key, value = callback(key));
    return value;
}


/***/ }),

/***/ "./src/common/object/defined.ts":
/*!**************************************!*\
  !*** ./src/common/object/defined.ts ***!
  \**************************************/
/*! namespace exports */
/*! export defined [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defined": () => /* binding */ defined
/* harmony export */ });
function defined(value, errorOrCallback) {
    if (value == null)
        throw new Error(typeof errorOrCallback === "function" ? errorOrCallback() :
            errorOrCallback);
    // @ts-ignore
    return value;
}


/***/ }),

/***/ "./src/common/object/definedAt.ts":
/*!****************************************!*\
  !*** ./src/common/object/definedAt.ts ***!
  \****************************************/
/*! namespace exports */
/*! export definedAt [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "definedAt": () => /* binding */ definedAt
/* harmony export */ });
/* harmony import */ var _defined__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defined */ "./src/common/object/defined.ts");
;
function definedAt(obj, key) {
    return (0,_defined__WEBPACK_IMPORTED_MODULE_0__.defined)(obj[key], () => `No ${key}`);
}


/***/ }),

/***/ "./src/common/object/entries.ts":
/*!**************************************!*\
  !*** ./src/common/object/entries.ts ***!
  \**************************************/
/*! namespace exports */
/*! export entries [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entries": () => /* binding */ entries
/* harmony export */ });
/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys */ "./src/common/object/keys.ts");
;
function* entries(obj) {
    let index = 0;
    for (const key of (0,_keys__WEBPACK_IMPORTED_MODULE_0__.keys)(obj)) {
        // @ts-ignore
        yield [key, obj[key], index++];
    }
}


/***/ }),

/***/ "./src/common/object/hasKeys.ts":
/*!**************************************!*\
  !*** ./src/common/object/hasKeys.ts ***!
  \**************************************/
/*! namespace exports */
/*! export hasKeys [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasKeys": () => /* binding */ hasKeys
/* harmony export */ });
function hasKeys(object) {
    if (object)
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                return true;
            }
        }
    return false;
}


/***/ }),

/***/ "./src/common/object/keys.ts":
/*!***********************************!*\
  !*** ./src/common/object/keys.ts ***!
  \***********************************/
/*! namespace exports */
/*! export keys [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "keys": () => /* binding */ keys
/* harmony export */ });
function* keys(obj) {
    if (obj)
        for (const key in obj) {
            if (typeof key !== "string")
                continue;
            if (obj.hasOwnProperty(key)) {
                yield key;
            }
        }
}


/***/ }),

/***/ "./src/common/object/mapAndFilterObject.ts":
/*!*************************************************!*\
  !*** ./src/common/object/mapAndFilterObject.ts ***!
  \*************************************************/
/*! namespace exports */
/*! export mapAndFilterObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapAndFilterObject": () => /* binding */ mapAndFilterObject
/* harmony export */ });
/* harmony import */ var _entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entries */ "./src/common/object/entries.ts");
;
function mapAndFilterObject(obj, mapper) {
    const result = {};
    for (let [key, value] of (0,_entries__WEBPACK_IMPORTED_MODULE_0__.entries)(obj)) {
        const nextValue = mapper(value, key);
        if (nextValue !== undefined)
            continue;
        result[key] = nextValue;
    }
    return result;
}


/***/ }),

/***/ "./src/common/object/mapObject.ts":
/*!****************************************!*\
  !*** ./src/common/object/mapObject.ts ***!
  \****************************************/
/*! namespace exports */
/*! export mapObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mapObjectAsync [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapObject": () => /* binding */ mapObject,
/* harmony export */   "mapObjectAsync": () => /* binding */ mapObjectAsync
/* harmony export */ });
/* harmony import */ var _entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entries */ "./src/common/object/entries.ts");
;
function mapObject(obj, mapper) {
    const result = {};
    for (const [key, value] of (0,_entries__WEBPACK_IMPORTED_MODULE_0__.entries)(obj)) {
        result[key] = mapper(value, key);
    }
    return result;
}
async function mapObjectAsync(obj, mapper) {
    const result = {};
    for (const [key, value] of (0,_entries__WEBPACK_IMPORTED_MODULE_0__.entries)(obj)) {
        result[key] = await mapper(value, key);
    }
    return result;
}


/***/ }),

/***/ "./src/common/object/mapObjectToArray.ts":
/*!***********************************************!*\
  !*** ./src/common/object/mapObjectToArray.ts ***!
  \***********************************************/
/*! namespace exports */
/*! export mapObjectToArray [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapObjectToArray": () => /* binding */ mapObjectToArray
/* harmony export */ });
/* harmony import */ var _entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entries */ "./src/common/object/entries.ts");
;
function mapObjectToArray(obj, mapper) {
    let index = 0;
    const arr = [];
    for (const [key, value] of (0,_entries__WEBPACK_IMPORTED_MODULE_0__.entries)(obj)) {
        const nextValue = mapper(value, key, index++);
        if (nextValue !== undefined)
            arr.push(nextValue);
    }
    return arr;
}


/***/ }),

/***/ "./src/common/object/mergeDescriptors.ts":
/*!***********************************************!*\
  !*** ./src/common/object/mergeDescriptors.ts ***!
  \***********************************************/
/*! namespace exports */
/*! export mergeDescriptors [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeDescriptors": () => /* binding */ mergeDescriptors
/* harmony export */ });
/* harmony import */ var _entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entries */ "./src/common/object/entries.ts");
;
function mergeDescriptors(base, child) {
    for (const [key, desc] of (0,_entries__WEBPACK_IMPORTED_MODULE_0__.entries)(Object.getOwnPropertyDescriptors(base))) {
        if (!child.hasOwnProperty(key)) {
            Object.defineProperty(child, key, desc);
        }
    }
    return Object.setPrototypeOf(child, base);
}


/***/ }),

/***/ "./src/common/patterns/lazy.ts":
/*!*************************************!*\
  !*** ./src/common/patterns/lazy.ts ***!
  \*************************************/
/*! namespace exports */
/*! export Lazy [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lazy": () => /* binding */ Lazy
/* harmony export */ });
/* harmony import */ var _assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assert */ "./src/common/assert.ts");
;
const markToDelete = Symbol("deleted");
const map = new WeakMap();
function Lazy(callback) {
    if (callback) {
        return lazyCallback(callback);
    }
    else {
        return (target, prop, desc) => {
            if (typeof desc.get === "function") {
                lazyProperty(target, prop, desc);
            }
            else if (typeof desc.value === "function") {
                lazyMethod(target, prop, desc);
            }
        };
    }
}
function lazyCallback(callback) {
    return function () {
        if (map.has(callback))
            return map.get(callback);
        const value = callback.apply(this, arguments);
        map.set(callback, value);
        return value;
    };
}
function lazyProperty(target, prop, desc) {
    const map = new WeakMap();
    const getter = desc.get;
    (0,_assert__WEBPACK_IMPORTED_MODULE_0__.assert)(!desc.set);
    desc.set = function (value) {
        if (markToDelete === value) {
            map.delete(this);
        }
        else {
            map.set(this, value);
        }
    };
    desc.get = function () {
        if (map.has(this)) {
            return map.get(this);
        }
        const value = getter.apply(this);
        map.set(this, value);
        return value;
    };
}
function lazyMethod(target, prop, desc) {
    const map = new WeakMap();
    const method = desc.value;
    delete desc.value;
    desc.get = function () {
        if (map.has(this))
            return () => map.get(this);
        return (...args) => {
            const value = method.apply(this, ...args);
            map.set(this, value);
            return value;
        };
    };
    desc.set = function (value) {
        if (value === markToDelete) {
            map.delete(this);
        }
        else {
            throw new Error(`Can't set lazy method.`);
        }
    };
}
Lazy.delete = function (target, prop) {
    if (prop) {
        target[prop] = markToDelete;
    }
    else {
        map.delete(target);
    }
};


/***/ }),

/***/ "./src/common/string/capitalize.ts":
/*!*****************************************!*\
  !*** ./src/common/string/capitalize.ts ***!
  \*****************************************/
/*! namespace exports */
/*! export capitalize [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "capitalize": () => /* binding */ capitalize
/* harmony export */ });
function capitalize(key) {
    return key.charAt(0).toUpperCase() + key.slice(1);
}


/***/ }),

/***/ "./src/common/string/fromConstantCase.ts":
/*!***********************************************!*\
  !*** ./src/common/string/fromConstantCase.ts ***!
  \***********************************************/
/*! namespace exports */
/*! export fromConstantCase [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromConstantCase": () => /* binding */ fromConstantCase
/* harmony export */ });
/* harmony import */ var _split__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./split */ "./src/common/string/split.ts");
;
const fromConstantCase = text => (0,_split__WEBPACK_IMPORTED_MODULE_0__.split)(text, "_");


/***/ }),

/***/ "./src/common/string/fromPropertyCase.ts":
/*!***********************************************!*\
  !*** ./src/common/string/fromPropertyCase.ts ***!
  \***********************************************/
/*! namespace exports */
/*! export fromPropertyCase [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromPropertyCase": () => /* binding */ fromPropertyCase
/* harmony export */ });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.es.js");
;
const fromPropertyCase = text => immutable__WEBPACK_IMPORTED_MODULE_0__.Seq.Indexed(text.matchAll(/[A-Z]?[^A-Z]*/g))
    .map(([text]) => text);


/***/ }),

/***/ "./src/common/string/joinTemplate.ts":
/*!*******************************************!*\
  !*** ./src/common/string/joinTemplate.ts ***!
  \*******************************************/
/*! namespace exports */
/*! export joinTemplate [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "joinTemplate": () => /* binding */ joinTemplate
/* harmony export */ });
function joinTemplate(strings, args, callback) {
    let text = '';
    for (let [index, string] of strings.entries()) {
        text += string;
        if (args.length > index) {
            text += callback(args[index]);
        }
    }
    return text;
}


/***/ }),

/***/ "./src/common/string/joinUrl.ts":
/*!**************************************!*\
  !*** ./src/common/string/joinUrl.ts ***!
  \**************************************/
/*! namespace exports */
/*! export joinUrl [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "joinUrl": () => /* binding */ joinUrl
/* harmony export */ });
function joinUrl(url, ...args) {
    for (const arg of args) {
        if (!arg)
            continue;
        url = url.replace(/\/+$/g, '')
            + '/'
            + arg.replace(/^\/+/g, '');
    }
    return url;
}


/***/ }),

/***/ "./src/common/string/matchCase.ts":
/*!****************************************!*\
  !*** ./src/common/string/matchCase.ts ***!
  \****************************************/
/*! namespace exports */
/*! export matchCase [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "matchCase": () => /* binding */ matchCase
/* harmony export */ });
function matchCase(text, source, target) {
    return target(source(text));
}


/***/ }),

/***/ "./src/common/string/split.ts":
/*!************************************!*\
  !*** ./src/common/string/split.ts ***!
  \************************************/
/*! namespace exports */
/*! export _split [provided] [no usage info] [missing usage info prevents renaming] */
/*! export split [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_split": () => /* binding */ _split,
/* harmony export */   "split": () => /* binding */ split
/* harmony export */ });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.es.js");
;
function* _split(text, sep) {
    let start = 0;
    while (true) {
        const pos = text.indexOf(sep, start);
        if (-1 === pos) {
            break;
        }
        yield text.slice(start, pos);
        start = pos + sep.length;
    }
    yield start ? text.slice(start) : text;
}
const split = (text, sep) => immutable__WEBPACK_IMPORTED_MODULE_0__.Seq.Indexed(_split(text, sep));


/***/ }),

/***/ "./src/common/string/toConstantCase.ts":
/*!*********************************************!*\
  !*** ./src/common/string/toConstantCase.ts ***!
  \*********************************************/
/*! namespace exports */
/*! export toConstantCase [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toConstantCase": () => /* binding */ toConstantCase
/* harmony export */ });
const toConstantCase = words => words.join('_').toUpperCase();


/***/ }),

/***/ "./src/common/string/toTitleCase.ts":
/*!******************************************!*\
  !*** ./src/common/string/toTitleCase.ts ***!
  \******************************************/
/*! namespace exports */
/*! export toTitleCase [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toTitleCase": () => /* binding */ toTitleCase
/* harmony export */ });
const toTitleCase = words => words
    .map(text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase())
    .join(" ");


/***/ }),

/***/ "./src/common/typings2/TypeRef.ts":
/*!****************************************!*\
  !*** ./src/common/typings2/TypeRef.ts ***!
  \****************************************/
/*! namespace exports */
/*! export TypeRef [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypeRef": () => /* binding */ TypeRef
/* harmony export */ });
function TypeRef(cb) {
    return (() => {
        throw new Error();
    });
}


/***/ }),

/***/ "./src/common/typings2/Typing.ts":
/*!***************************************!*\
  !*** ./src/common/typings2/Typing.ts ***!
  \***************************************/
/*! namespace exports */
/*! export Typing [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Typing": () => /* binding */ Typing
/* harmony export */ });
function Typing() {
    return (() => {
        throw new Error();
    });
}


/***/ }),

/***/ "./src/immutable2.ts":
/*!***************************!*\
  !*** ./src/immutable2.ts ***!
  \***************************/
/*! namespace exports */
/*! export ImmutableKeys [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ImmutableList [provided] [no usage info] [missing usage info prevents renaming] -> ./node_modules/immutable/dist/immutable.es.js .List */
/*! export ImmutableMap [provided] [no usage info] [missing usage info prevents renaming] -> ./node_modules/immutable/dist/immutable.es.js .Map */
/*! export ImmutableRecord [provided] [no usage info] [missing usage info prevents renaming] -> ./node_modules/immutable/dist/immutable.es.js .Record */
/*! export ImmutableSet [provided] [no usage info] [missing usage info prevents renaming] -> ./node_modules/immutable/dist/immutable.es.js .Set */
/*! export IndexedSeq [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImmutableSet": () => /* reexport safe */ immutable__WEBPACK_IMPORTED_MODULE_0__.Set,
/* harmony export */   "ImmutableRecord": () => /* reexport safe */ immutable__WEBPACK_IMPORTED_MODULE_0__.Record,
/* harmony export */   "ImmutableMap": () => /* reexport safe */ immutable__WEBPACK_IMPORTED_MODULE_0__.Map,
/* harmony export */   "ImmutableList": () => /* reexport safe */ immutable__WEBPACK_IMPORTED_MODULE_0__.List,
/* harmony export */   "ImmutableKeys": () => /* binding */ ImmutableKeys,
/* harmony export */   "IndexedSeq": () => /* binding */ IndexedSeq
/* harmony export */ });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.es.js");



const ImmutableKeys = immutable__WEBPACK_IMPORTED_MODULE_0__.Set();
const IndexedSeq = immutable__WEBPACK_IMPORTED_MODULE_0__.Seq.Indexed;


/***/ }),

/***/ "./src/lang/Lang.ts":
/*!**************************!*\
  !*** ./src/lang/Lang.ts ***!
  \**************************/
/*! namespace exports */
/*! export Lang [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LangPropsType [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LangPropsType": () => /* binding */ LangPropsType,
/* harmony export */   "Lang": () => /* binding */ Lang
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _LangTemplate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LangTemplate */ "./src/lang/LangTemplate.ts");
/* harmony import */ var _LangView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LangView */ "./src/lang/LangView.ts");
;


var LangPropsType;
(function (LangPropsType) {
    LangPropsType[LangPropsType["token"] = 0] = "token";
    LangPropsType[LangPropsType["template"] = 1] = "template";
})(LangPropsType || (LangPropsType = {}));
function Lang(strings, ...params) {
    if (strings.length === 1) {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_LangView__WEBPACK_IMPORTED_MODULE_2__.LangView, {
            type: LangPropsType.token,
            token: strings[0]
        });
    }
    return (0,_LangTemplate__WEBPACK_IMPORTED_MODULE_1__.LangTemplate)(strings.raw, params);
}


/***/ }),

/***/ "./src/lang/LangKey.tsx":
/*!******************************!*\
  !*** ./src/lang/LangKey.tsx ***!
  \******************************/
/*! namespace exports */
/*! export LangKey [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LangKey": () => /* binding */ LangKey
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_string_fromPropertyCase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/string/fromPropertyCase */ "./src/common/string/fromPropertyCase.ts");
/* harmony import */ var _common_string_matchCase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/string/matchCase */ "./src/common/string/matchCase.ts");
/* harmony import */ var _common_string_toConstantCase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/string/toConstantCase */ "./src/common/string/toConstantCase.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _LangView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LangView */ "./src/lang/LangView.ts");
;






function LangKey(props) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        if (props.children != undefined) {
            return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, props.children);
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_LangView__WEBPACK_IMPORTED_MODULE_5__.LangView, { type: _Lang__WEBPACK_IMPORTED_MODULE_4__.LangPropsType.token, token: (0,_common_string_matchCase__WEBPACK_IMPORTED_MODULE_2__.matchCase)(props.for, props.sourceCase || _common_string_fromPropertyCase__WEBPACK_IMPORTED_MODULE_1__.fromPropertyCase, _common_string_toConstantCase__WEBPACK_IMPORTED_MODULE_3__.toConstantCase) }));
    }, [props.children, props.for]);
}


/***/ }),

/***/ "./src/lang/LangTemplate.ts":
/*!**********************************!*\
  !*** ./src/lang/LangTemplate.ts ***!
  \**********************************/
/*! namespace exports */
/*! export LangTemplate [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LangTemplate": () => /* binding */ LangTemplate
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_object_definedAt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/object/definedAt */ "./src/common/object/definedAt.ts");
/* harmony import */ var _common_string_joinTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/string/joinTemplate */ "./src/common/string/joinTemplate.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _LangView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LangView */ "./src/lang/LangView.ts");
;




function LangTemplate(strings, params) {
    const token = (0,_common_string_joinTemplate__WEBPACK_IMPORTED_MODULE_2__.joinTemplate)(strings, params, param => `{${param}}`);
    template.token = token;
    return template;
    function template(arg0, ...args) {
        if (args.length === 0 && typeof arg0 === "object") {
            return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_LangView__WEBPACK_IMPORTED_MODULE_4__.LangView, {
                type: _Lang__WEBPACK_IMPORTED_MODULE_3__.LangPropsType.template,
                token,
                props: arg0,
                params,
                strings,
            });
        }
        else {
            // template`...`
            return [
                token,
                props => (0,_common_string_joinTemplate__WEBPACK_IMPORTED_MODULE_2__.joinTemplate)(arg0, args, arg => {
                    return (0,_common_object_definedAt__WEBPACK_IMPORTED_MODULE_1__.definedAt)(props, arg);
                }),
            ];
        }
    }
}


/***/ }),

/***/ "./src/lang/LangTranslator.ts":
/*!************************************!*\
  !*** ./src/lang/LangTranslator.ts ***!
  \************************************/
/*! namespace exports */
/*! export LangTranslator [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LangTranslatorContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export useLangTranslator [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LangTranslator": () => /* binding */ LangTranslator,
/* harmony export */   "LangTranslatorContext": () => /* binding */ LangTranslatorContext,
/* harmony export */   "useLangTranslator": () => /* binding */ useLangTranslator
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_object_mapObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/object/mapObject */ "./src/common/object/mapObject.ts");
/* harmony import */ var _common_string_fromConstantCase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/string/fromConstantCase */ "./src/common/string/fromConstantCase.ts");
/* harmony import */ var _common_string_joinTemplate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/string/joinTemplate */ "./src/common/string/joinTemplate.ts");
/* harmony import */ var _common_string_matchCase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/string/matchCase */ "./src/common/string/matchCase.ts");
/* harmony import */ var _common_string_toTitleCase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/string/toTitleCase */ "./src/common/string/toTitleCase.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Lang */ "./src/lang/Lang.ts");
;






class LangTranslator {
    constructor(map) {
        this.map = map;
    }
    translateNode(node) {
        switch (typeof node) {
            case "string":
            case "number":
                return String(node);
            case "undefined":
                return;
            case "boolean":
                return "";
            case "object":
                if (!node)
                    return "";
                if (Array.isArray(node)) {
                    return node.map(node => this.translateNode(node)).join('');
                }
                return this.translateProps(node.props);
        }
    }
    translateProps(props) {
        switch (props.type) {
            case _Lang__WEBPACK_IMPORTED_MODULE_6__.LangPropsType.template:
                return this.translateTemplate(props);
            case _Lang__WEBPACK_IMPORTED_MODULE_6__.LangPropsType.token:
                return this.translateToken(props.token);
            default:
                throw new TypeError();
        }
    }
    translateDefaultToken(token) {
        return this.map[token] = (0,_common_string_matchCase__WEBPACK_IMPORTED_MODULE_4__.matchCase)(token, _common_string_fromConstantCase__WEBPACK_IMPORTED_MODULE_2__.fromConstantCase, _common_string_toTitleCase__WEBPACK_IMPORTED_MODULE_5__.toTitleCase);
    }
    translateToken(token) {
        const value = this.map[token];
        switch (typeof value) {
            case "function":
                return this.map[token] = value({});
            case "string":
                return value;
            case "undefined":
                return this.translateDefaultToken(token);
            default:
                throw new TypeError(`Not support ${typeof value}`);
        }
    }
    translateTemplate(template) {
        const value = this.map[template.token];
        switch (typeof value) {
            case "function":
                return value((0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_1__.mapObject)(template.props, node => {
                    if (typeof node === "object") {
                        return this.translateProps(node.props);
                    }
                    return String(node);
                }));
            case "string":
                return value;
            case "undefined":
                return (0,_common_string_matchCase__WEBPACK_IMPORTED_MODULE_4__.matchCase)((0,_common_string_joinTemplate__WEBPACK_IMPORTED_MODULE_3__.joinTemplate)(template.strings, template.params, param => String(this.translateNode(template.props[param]))), _common_string_fromConstantCase__WEBPACK_IMPORTED_MODULE_2__.fromConstantCase, _common_string_toTitleCase__WEBPACK_IMPORTED_MODULE_5__.toTitleCase);
            default:
                throw new TypeError(`Can't translate ${typeof value}.`);
        }
    }
}
const LangTranslatorContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(new LangTranslator({}));
const useLangTranslator = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(LangTranslatorContext);


/***/ }),

/***/ "./src/lang/LangView.ts":
/*!******************************!*\
  !*** ./src/lang/LangView.ts ***!
  \******************************/
/*! namespace exports */
/*! export LangView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LangView": () => /* binding */ LangView
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _LangTranslator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LangTranslator */ "./src/lang/LangTranslator.ts");
;

function LangView(props) {
    const translator = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_LangTranslator__WEBPACK_IMPORTED_MODULE_1__.LangTranslatorContext);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, translator.translateProps(props));
}


/***/ }),

/***/ "./src/logging/inspect.ts":
/*!********************************!*\
  !*** ./src/logging/inspect.ts ***!
  \********************************/
/*! namespace exports */
/*! export inspect [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inspect": () => /* binding */ inspect
/* harmony export */ });
/* harmony import */ var _common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/object/mapObjectToArray */ "./src/common/object/mapObjectToArray.ts");
var _a;

// trying to require "util" module.
const util = ((r, m) => {
    try {
        return __webpack_require__("./src/logging sync recursive")(m);
    }
    catch (error) { }
})(undefined, "util");
inspect.custom = (_a = util === null || util === void 0 ? void 0 : util.inspect.custom) !== null && _a !== void 0 ? _a : Symbol();
function inspect(...args) {
    if (args.length === 1) {
        args = [...args, { depth: 100 }];
    }
    const [value] = args;
    if (typeof (value === null || value === void 0 ? void 0 : value.inspect) === "function") {
        return value.inspect();
    }
    if (util)
        return util.inspect.apply(util, args);
    const method = value === null || value === void 0 ? void 0 : value[inspect.custom];
    if (method)
        return method.apply(value);
    if (Array.isArray(value)) {
        return ("[" +
            value
                .toSeq()
                .map(value => inspect(value))
                .join(", ") +
            "]");
    }
    if (Object.getPrototypeOf(value) === Object.prototype) {
        return `{${(0,_common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_0__.mapObjectToArray)(value, (value, key) => inspect(key) + ": " + inspect(value))}}`;
    }
    return JSON.stringify(value);
}


/***/ }),

/***/ "./src/react/HookRef.ts":
/*!******************************!*\
  !*** ./src/react/HookRef.ts ***!
  \******************************/
/*! namespace exports */
/*! export updateRef [provided] [no usage info] [missing usage info prevents renaming] */
/*! export useHookRef [provided] [no usage info] [missing usage info prevents renaming] */
/*! export useUpdateRef [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useUpdateRef": () => /* binding */ useUpdateRef,
/* harmony export */   "updateRef": () => /* binding */ updateRef,
/* harmony export */   "useHookRef": () => /* binding */ useHookRef
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
;
function useUpdateRef(ref, create) {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        ref && updateRef(ref, create());
        return () => {
            ref && updateRef(ref, null);
        };
    }, [typeof (ref || undefined)]);
}
function updateRef(ref, value) {
    if (ref)
        switch (typeof ref) {
            case "function":
                return ref(value);
            case "object":
                // @ts-expect-error
                ref["current"] = value;
        }
}
function useHookRef(componentType) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        hookRef.current = undefined;
        return hookRef;
        function hookRef(current) {
            hookRef.current = current;
        }
    }, []);
}


/***/ }),

/***/ "./src/react/TableLayout.ts":
/*!**********************************!*\
  !*** ./src/react/TableLayout.ts ***!
  \**********************************/
/*! namespace exports */
/*! export TableLayout [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableLayout": () => /* binding */ TableLayout
/* harmony export */ });
/* harmony import */ var _common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/object/mapObjectToArray */ "./src/common/object/mapObjectToArray.ts");
;
function TableLayout(props) {
    const columns = (0,_common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_0__.mapObjectToArray)(props.columns, (props, key, index) => {
        return { props, key, index };
    });
    return props.render({
        columns: columns.map((column) => props.renderColumn(column, props.renderColumnTitle(column))),
        rows: props.rows.map((item, index) => {
            const row = {
                key: props.getRowKey(item),
                data: props.getRowData(item),
                index,
            };
            return props.renderRow(row, columns.map((column) => {
                return props.renderColumn(column, props.renderRowColumn(row.data[column.key], row, column, row.key));
            }));
        }),
    });
}


/***/ }),

/***/ "./src/react/reactor/Reactor.ts":
/*!**************************************!*\
  !*** ./src/react/reactor/Reactor.ts ***!
  \**************************************/
/*! namespace exports */
/*! export Reactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ReactorContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export useReactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Reactor": () => /* binding */ Reactor,
/* harmony export */   "ReactorContext": () => /* binding */ ReactorContext,
/* harmony export */   "useReactor": () => /* binding */ useReactor
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_map_touchMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/map/touchMap */ "./src/common/map/touchMap.ts");
;

class Reactor {
    constructor(handle) {
        this.handle = handle;
        this.eventMap = new Map();
        this.eventListenerMap = new Map();
    }
    getLast(event) {
        return this.eventMap.get(event.constructor);
    }
    emit(event) {
        var _a;
        if (((_a = this.handle) === null || _a === void 0 ? void 0 : _a.call(this, event)) === false)
            return;
        this.eventMap.set(event.constructor, event);
        const listeners = this.eventListenerMap.get(event.constructor);
        for (const callback of listeners || []) {
            callback(event);
        }
    }
    listen(eventType, callback) {
        const listeners = (0,_common_map_touchMap__WEBPACK_IMPORTED_MODULE_1__.touchMap)(this.eventListenerMap, eventType, () => new Set());
        listeners.add(callback);
        return () => {
            listeners.delete(callback);
            if (!listeners.size) {
                this.eventListenerMap.delete(eventType);
            }
        };
    }
}
const ReactorContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(new Reactor());
const useReactor = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(ReactorContext);
// EventMap


/***/ }),

/***/ "./src/react/reactor/ReactorListener.tsx":
/*!***********************************************!*\
  !*** ./src/react/reactor/ReactorListener.tsx ***!
  \***********************************************/
/*! namespace exports */
/*! export ReactorListener [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactorListener": () => /* binding */ ReactorListener
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Reactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Reactor */ "./src/react/reactor/Reactor.ts");
;

function ReactorListener({ eventType, children, onEvent, }) {
    const parentReactor = (0,_Reactor__WEBPACK_IMPORTED_MODULE_1__.useReactor)();
    const reactor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        return new _Reactor__WEBPACK_IMPORTED_MODULE_1__.Reactor(event => {
            if (event.constructor === eventType) {
                onEvent(event);
                return false;
            }
            else {
                parentReactor.emit(event);
            }
        });
    }, [parentReactor]);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Reactor__WEBPACK_IMPORTED_MODULE_1__.ReactorContext.Provider, {
        value: reactor,
        children,
    });
}


/***/ }),

/***/ "./src/react/reactor/useEmitted.ts":
/*!*****************************************!*\
  !*** ./src/react/reactor/useEmitted.ts ***!
  \*****************************************/
/*! namespace exports */
/*! export useEmitted [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useEmitted": () => /* binding */ useEmitted
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Reactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Reactor */ "./src/react/reactor/Reactor.ts");
;

function useEmitted(actionType, callback, deps = []) {
    const reactor = (0,_Reactor__WEBPACK_IMPORTED_MODULE_1__.useReactor)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        return reactor.listen(actionType, event => {
            callback === null || callback === void 0 ? void 0 : callback(event);
        });
    }, [reactor, ...deps]);
}


/***/ }),

/***/ "./src/react/reactor/useEmittedState.ts":
/*!**********************************************!*\
  !*** ./src/react/reactor/useEmittedState.ts ***!
  \**********************************************/
/*! namespace exports */
/*! export useEmittedState [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useEmittedState": () => /* binding */ useEmittedState
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Reactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Reactor */ "./src/react/reactor/Reactor.ts");
;

function useEmittedState(actionType, callback) {
    const reactor = (0,_Reactor__WEBPACK_IMPORTED_MODULE_1__.useReactor)();
    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => reactor.getLast(actionType));
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        return reactor.listen(actionType, event => {
            if (event != state) {
                setState(event);
                callback === null || callback === void 0 ? void 0 : callback(event);
            }
        });
    }, [reactor]);
    return state;
}


/***/ }),

/***/ "./src/react/reactor/useEmitter.ts":
/*!*****************************************!*\
  !*** ./src/react/reactor/useEmitter.ts ***!
  \*****************************************/
/*! namespace exports */
/*! export useEmitter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useEmitter": () => /* binding */ useEmitter
/* harmony export */ });
/* harmony import */ var _Reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Reactor */ "./src/react/reactor/Reactor.ts");
;
function useEmitter() {
    const reactor = (0,_Reactor__WEBPACK_IMPORTED_MODULE_0__.useReactor)();
    return event => {
        reactor.emit(event);
    };
}


/***/ }),

/***/ "./src/react/utils/EmptyFragment.ts":
/*!******************************************!*\
  !*** ./src/react/utils/EmptyFragment.ts ***!
  \******************************************/
/*! namespace exports */
/*! export EmptyFragment [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmptyFragment": () => /* binding */ EmptyFragment
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
;
const EmptyFragment = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment);


/***/ }),

/***/ "./src/react/utils/hooks/useDebounce.ts":
/*!**********************************************!*\
  !*** ./src/react/utils/hooks/useDebounce.ts ***!
  \**********************************************/
/*! namespace exports */
/*! export Debounce [provided] [no usage info] [missing usage info prevents renaming] */
/*! export useDebounce [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Debounce": () => /* binding */ Debounce,
/* harmony export */   "useDebounce": () => /* binding */ useDebounce
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_async_Waiter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/async/Waiter */ "./src/common/async/Waiter.ts");
;

function Debounce(defaultMs = 1000) {
    let timeout;
    let lastWaiter = undefined;
    return {
        cancel,
        resolve: () => {
            if (timeout !== undefined) {
                clearTimeout(timeout);
                timeout = undefined;
            }
            const waiter = lastWaiter;
            lastWaiter = undefined;
            waiter === null || waiter === void 0 ? void 0 : waiter.resolve(false);
        },
        wait: (ms = defaultMs) => {
            cancel();
            if (timeout !== undefined) {
                clearTimeout(timeout);
            }
            const waiter = lastWaiter = (0,_common_async_Waiter__WEBPACK_IMPORTED_MODULE_1__.Waiter)();
            timeout = setTimeout(() => {
                timeout = undefined;
                waiter.resolve(lastWaiter !== waiter);
            }, ms);
            return waiter;
        }
    };
    function cancel() {
        const waiter = lastWaiter;
        lastWaiter = undefined;
        waiter === null || waiter === void 0 ? void 0 : waiter.resolve(true);
        if (timeout !== undefined) {
            clearTimeout(timeout);
            timeout = undefined;
        }
    }
}
function useDebounce(ms, deps = []) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => Debounce(ms), deps);
}


/***/ }),

/***/ "./src/react/utils/mergeProps.ts":
/*!***************************************!*\
  !*** ./src/react/utils/mergeProps.ts ***!
  \***************************************/
/*! namespace exports */
/*! export $merge [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isRefObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mergeProp [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mergeProps [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$merge": () => /* binding */ $merge,
/* harmony export */   "mergeProp": () => /* binding */ mergeProp,
/* harmony export */   "mergeProps": () => /* binding */ mergeProps,
/* harmony export */   "isRefObject": () => /* binding */ isRefObject
/* harmony export */ });
/* harmony import */ var _common_object_entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/object/entries */ "./src/common/object/entries.ts");
/* harmony import */ var _setRef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setRef */ "./src/react/utils/setRef.ts");
;

const $merge = "$merge";
const $default = "$default";
function mergeCallbacks(prevCallback, nextCallback) {
    return function () {
        var _a;
        const prevResult = prevCallback.apply(this, arguments);
        return (_a = nextCallback.apply(this, arguments)) !== null && _a !== void 0 ? _a : prevResult;
    };
}
function mergeRefs(prevRef, nextRef) {
    return (current) => {
        (0,_setRef__WEBPACK_IMPORTED_MODULE_1__.setRef)(prevRef, current);
        (0,_setRef__WEBPACK_IMPORTED_MODULE_1__.setRef)(nextRef, current);
    };
}
function mergeProp(prevValue, nextValue) {
    const nextType = typeof nextValue;
    const prevType = typeof prevValue;
    // TODO: $reverse
    if (nextValue && nextType === "object") {
        if ($default in nextValue) {
            return prevValue !== null && prevValue !== void 0 ? prevValue : nextValue[$default];
        }
        const merger = nextValue[$merge];
        if (typeof merger === "function") {
            return merger.call(nextValue, prevValue);
        }
        if (prevType === "undefined") {
            if (Object.getPrototypeOf(nextValue) === Object.prototype)
                return mergeProps({}, nextValue);
        }
    }
    if (nextType === "undefined") {
        return prevValue !== null && prevValue !== void 0 ? prevValue : nextValue;
    }
    if (isRefObject(prevValue) || isRefObject(nextValue)) {
        return mergeRefs(prevValue, nextValue);
    }
    if (prevType === nextType) {
        switch (prevType) {
            case "string":
                return `${prevValue} ${nextValue}`;
            case "function":
                return mergeCallbacks(prevValue, nextValue);
            case "object":
                if (Array.isArray(prevType) && Array.isArray(nextType)) {
                    console.info("mergeBetweenArrays");
                    return [...prevValue, ...nextValue];
                }
                return mergeProps(prevValue, nextValue);
        }
    }
    return nextValue;
}
/*

 */
function mergeProps(prevProps, nextProps) {
    let _props = Object.assign({}, prevProps);
    for (let [key, nextValue] of (0,_common_object_entries__WEBPACK_IMPORTED_MODULE_0__.entries)(nextProps)) {
        _props[key] = mergeProp(_props[key], nextValue);
    }
    return _props;
}
function isRefObject(o) {
    return o && typeof o === "object" && "current" in o;
}


/***/ }),

/***/ "./src/react/utils/partialProps.ts":
/*!*****************************************!*\
  !*** ./src/react/utils/partialProps.ts ***!
  \*****************************************/
/*! namespace exports */
/*! export partialProps [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "partialProps": () => /* binding */ partialProps
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
;
function _partialProps(component, defaultProps, extraDefaultProps) {
    var _a, _b;
    if (typeof defaultProps === "function") {
        defaultProps = defaultProps((_a = component.defaultProps) !== null && _a !== void 0 ? _a : {});
    }
    if (component.defaultComponent) {
        return _partialProps(component.defaultComponent, defaultProps, Object.assign(Object.assign({}, extraDefaultProps), component.defaultProps));
    }
    // console.log({component});
    const func = props => {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(component, props);
    };
    func.defaultComponent = component;
    func.displayName = (_b = component.displayName) !== null && _b !== void 0 ? _b : component.name;
    func.defaultProps = Object.assign(Object.assign({}, extraDefaultProps), defaultProps);
    return func;
}
const partialProps = (componentOrProps, props) => {
    if (props)
        return _partialProps(componentOrProps, props);
    return component => _partialProps(component, componentOrProps);
};


/***/ }),

/***/ "./src/react/utils/setRef.ts":
/*!***********************************!*\
  !*** ./src/react/utils/setRef.ts ***!
  \***********************************/
/*! namespace exports */
/*! export setRef [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setRef": () => /* binding */ setRef
/* harmony export */ });
function setRef(ref, value) {
    if (typeof ref === "function")
        ref(value);
    else if (ref) {
        // @ts-ignore
        ref["current"] = value;
    }
}


/***/ }),

/***/ "./src/react/view/View.ts":
/*!********************************!*\
  !*** ./src/react/view/View.ts ***!
  \********************************/
/*! namespace exports */
/*! export View [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "View": () => /* binding */ View
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_EmptyFragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/EmptyFragment */ "./src/react/utils/EmptyFragment.ts");
;

class View extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(...arguments);
        this.isDidMount = false;
        this.isWillUnmount = false;
        this.currentState = {};
        this.isDidSetState = false;
    }
    componentDidMount() {
        this.isDidMount = true;
    }
    componentWillUnmount() {
        this.isWillUnmount = true;
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.updateViewProps) {
            this.updateViewProps(this.props, nextProps);
            if (this.isDidSetState)
                return false;
        }
        return true;
    }
    render() {
        var _a;
        return (_a = this.renderView()) !== null && _a !== void 0 ? _a : _utils_EmptyFragment__WEBPACK_IMPORTED_MODULE_1__.EmptyFragment;
    }
}


/***/ }),

/***/ "./src/react/view/ViewState.ts":
/*!*************************************!*\
  !*** ./src/react/view/ViewState.ts ***!
  \*************************************/
/*! namespace exports */
/*! export ViewState [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewState": () => /* binding */ ViewState
/* harmony export */ });
/* harmony import */ var _setViewStateKey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setViewStateKey */ "./src/react/view/setViewStateKey.ts");
;
function ViewState(updateMethod) {
    return (target, key) => {
        Object.defineProperty(target, key, {
            get() {
                return this.currentState[key];
            },
            set(value) {
                if ((0,_setViewStateKey__WEBPACK_IMPORTED_MODULE_0__.setViewStateKey)(this, key, value)) {
                    updateMethod && this[updateMethod]();
                }
            },
        });
    };
}


/***/ }),

/***/ "./src/react/view/setViewStateKey.ts":
/*!*******************************************!*\
  !*** ./src/react/view/setViewStateKey.ts ***!
  \*******************************************/
/*! namespace exports */
/*! export setViewStateKey [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setViewStateKey": () => /* binding */ setViewStateKey
/* harmony export */ });
function setViewStateKey(view, key, value) {
    if (view.currentState[key] === value)
        return false;
    view.currentState[key] = value;
    if (view.isDidMount && !view.isDidSetState && !view.isWillUnmount) {
        view.isDidSetState = true;
        view.setState(state => {
            view.isDidSetState = false;
            return Object.assign(Object.assign({}, state), view.currentState);
        });
    }
    return true;
}


/***/ }),

/***/ "./src/system/browser/LoginInfoEvent.ts":
/*!**********************************************!*\
  !*** ./src/system/browser/LoginInfoEvent.ts ***!
  \**********************************************/
/*! namespace exports */
/*! export LoginInfoEvent [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginInfoEvent": () => /* binding */ LoginInfoEvent
/* harmony export */ });
class LoginInfoEvent {
    constructor(payload) {
        this.payload = payload;
    }
    isSuccess() {
        return this.payload.type === "SUCCESS";
    }
    get success() {
        if (this.payload.type === "SUCCESS") {
            return this.payload;
        }
    }
    get isAdmin() {
        var _a;
        return ((_a = this.success) === null || _a === void 0 ? void 0 : _a.isAdmin) || false;
    }
}
/*


  <ReactorProvider>

 */


/***/ }),

/***/ "./src/system/browser/MuiAclGroupInputView.tsx":
/*!*****************************************************!*\
  !*** ./src/system/browser/MuiAclGroupInputView.tsx ***!
  \*****************************************************/
/*! namespace exports */
/*! export MuiAclGroupInputView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiAclGroupInputView": () => /* binding */ MuiAclGroupInputView
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/rpc/inputs/MuiTextInputView */ "./src/browser/mui/rpc/inputs/MuiTextInputView.tsx");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../typerpc/input/input-map/InputMapView */ "./src/typerpc/input/input-map/InputMapView.tsx");
/* harmony import */ var _typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../typerpc/input/InputErrorHook */ "./src/typerpc/input/InputErrorHook.ts");
;




const MuiAclGroupInputView = props => {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_3__.InputMapView.Fields, Object.assign({}, props, { fields: {
            groupName: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__.MuiTextInputView, Object.assign({}, (0,_typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_4__.InputErrorHookViewProps)(props), { title: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `GROUP_NAME` }))),
        } })));
};


/***/ }),

/***/ "./src/system/browser/MuiAclGroupsManagerView.tsx":
/*!********************************************************!*\
  !*** ./src/system/browser/MuiAclGroupsManagerView.tsx ***!
  \********************************************************/
/*! namespace exports */
/*! export MuiAclGroupsManagerView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiAclGroupsManagerView": () => /* binding */ MuiAclGroupsManagerView
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_rpc_MuiDataManagerView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/rpc/MuiDataManagerView */ "./src/browser/mui/rpc/MuiDataManagerView.tsx");
/* harmony import */ var _common_AclGroupsManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/AclGroupsManager */ "./src/system/common/AclGroupsManager.ts");
/* harmony import */ var _MuiAclGroupInputView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MuiAclGroupInputView */ "./src/system/browser/MuiAclGroupInputView.tsx");
;



function MuiAclGroupsManagerView(router) {
    (0,_browser_mui_rpc_MuiDataManagerView__WEBPACK_IMPORTED_MODULE_1__.MuiDataManagerView)({
        router,
        connection: _common_AclGroupsManager__WEBPACK_IMPORTED_MODULE_2__.AclGroupsManager.service,
        renderAddInput: props => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiAclGroupInputView__WEBPACK_IMPORTED_MODULE_3__.MuiAclGroupInputView, Object.assign({}, props)),
    });
}


/***/ }),

/***/ "./src/system/browser/MuiAclUsersManagerView.tsx":
/*!*******************************************************!*\
  !*** ./src/system/browser/MuiAclUsersManagerView.tsx ***!
  \*******************************************************/
/*! namespace exports */
/*! export MuiAclUsersManagerView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiAclUsersManagerView": () => /* binding */ MuiAclUsersManagerView
/* harmony export */ });
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/Typography.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_rpc_inputs_MuiCheckboxInputView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/rpc/inputs/MuiCheckboxInputView */ "./src/browser/mui/rpc/inputs/MuiCheckboxInputView.tsx");
/* harmony import */ var _browser_mui_rpc_MuiDataManagerView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../browser/mui/rpc/MuiDataManagerView */ "./src/browser/mui/rpc/MuiDataManagerView.tsx");
/* harmony import */ var _browser_mui_rpc_MuiFormView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../browser/mui/rpc/MuiFormView */ "./src/browser/mui/rpc/MuiFormView.tsx");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _typerpc_input_data_input_map_DataInputMapView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../typerpc/input/data-input-map/DataInputMapView */ "./src/typerpc/input/data-input-map/DataInputMapView.ts");
/* harmony import */ var _typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../typerpc/input/input-map/InputMapView */ "./src/typerpc/input/input-map/InputMapView.tsx");
/* harmony import */ var _common_AclUsersManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/AclUsersManager */ "./src/system/common/AclUsersManager.ts");
/* harmony import */ var _MuiUserBasicInfoInputView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MuiUserBasicInfoInputView */ "./src/system/browser/MuiUserBasicInfoInputView.tsx");
/* harmony import */ var _MuiUserContactInfoInputView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MuiUserContactInfoInputView */ "./src/system/browser/MuiUserContactInfoInputView.tsx");
;










// MuiAclManagerView
function MuiAclUsersManagerView(router) {
    (0,_browser_mui_rpc_MuiDataManagerView__WEBPACK_IMPORTED_MODULE_2__.MuiDataManagerView)({
        router,
        connection: _common_AclUsersManager__WEBPACK_IMPORTED_MODULE_7__.AclUsersManager.service,
        editTabs: {
            groups: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_MuiFormView__WEBPACK_IMPORTED_MODULE_3__.MuiFormView, Object.assign({}, props, { 
                // submitOnChange
                onSubmit: () => {
                    // emit( new Alert({
                    //
                    //  message: Lang`SAVE_COMPLETE`,
                    //  options: {}
                    //
                    // }) )
                }, input: props => {
                    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_input_data_input_map_DataInputMapView__WEBPACK_IMPORTED_MODULE_5__.DataInputMapView, Object.assign({}, props, { target: ({ props, row }) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_inputs_MuiCheckboxInputView__WEBPACK_IMPORTED_MODULE_1__.MuiCheckboxInputView, Object.assign({}, props, { title: row.label }))), renderNoKeys: () => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__.default, null, _lang_Lang__WEBPACK_IMPORTED_MODULE_4__.Lang `NO_GROUPS`) })));
                } }))),
        },
        renderAddInput: props => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiUserBasicInfoInputView__WEBPACK_IMPORTED_MODULE_8__.MuiUserBasicInfoInputView, Object.assign({}, props)),
        renderEditInput: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_6__.InputMapView.Fields, Object.assign({}, props, { fields: {
                basicInfo: props => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiUserBasicInfoInputView__WEBPACK_IMPORTED_MODULE_8__.MuiUserBasicInfoInputView, Object.assign({}, props)),
                contactInfo: props => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiUserContactInfoInputView__WEBPACK_IMPORTED_MODULE_9__.MuiUserContactInfoInputView, Object.assign({}, props)),
            } }))),
    });
}


/***/ }),

/***/ "./src/system/browser/MuiAdminView.tsx":
/*!*********************************************!*\
  !*** ./src/system/browser/MuiAdminView.tsx ***!
  \*********************************************/
/*! namespace exports */
/*! export MuiAdminView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiAdminView": () => /* binding */ MuiAdminView
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_MuiAdmin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/MuiAdmin */ "./src/browser/mui/MuiAdmin.tsx");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _react_reactor_useEmittedState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../react/reactor/useEmittedState */ "./src/react/reactor/useEmittedState.ts");
/* harmony import */ var _typerouter_ReactRouter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../typerouter/ReactRouter */ "./src/typerouter/ReactRouter.ts");
/* harmony import */ var _LoginInfoEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LoginInfoEvent */ "./src/system/browser/LoginInfoEvent.ts");
/* harmony import */ var _MuiAclGroupsManagerView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MuiAclGroupsManagerView */ "./src/system/browser/MuiAclGroupsManagerView.tsx");
/* harmony import */ var _MuiAclUsersManagerView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MuiAclUsersManagerView */ "./src/system/browser/MuiAclUsersManagerView.tsx");
;







function MuiAdminView(router) {
    (0,_typerouter_ReactRouter__WEBPACK_IMPORTED_MODULE_4__.ReactRouter)(router, {
        renderDefault(props) {
            return _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `NO_ROUTE_${"path"}`({
                path: props.route.defaultPath,
            });
        },
        wrap({ children, location }) {
            const loginInfo = (0,_react_reactor_useEmittedState__WEBPACK_IMPORTED_MODULE_3__.useEmittedState)(_LoginInfoEvent__WEBPACK_IMPORTED_MODULE_5__.LoginInfoEvent);
            if (!loginInfo) {
                return _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `ACCESS_DENIED_BECAUSE_NO_LOGIN`;
            }
            const { success } = loginInfo;
            if (!success) {
                return _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `ACCESS_DENIED_BECAUSE_LOGIN_IS_NOT_SUCCESS`;
            }
            if (!success.isAdmin) {
                return _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `ACCESS_DENIED_BECAUSE_LOGIN_IS_NOT_ADMIN`;
            }
            return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_MuiAdmin__WEBPACK_IMPORTED_MODULE_1__.MuiAdmin, { menu: {
                    acl: {
                        // icon: require("@material-ui/icons/Home"),
                        children: {
                            users: {
                                icon: __webpack_require__(/*! @material-ui/icons/People */ "./node_modules/@material-ui/icons/People.js"),
                                onClick() {
                                    location.at("acl").at("users").push();
                                },
                            },
                            groups: {
                                icon: __webpack_require__(/*! @material-ui/icons/People */ "./node_modules/@material-ui/icons/People.js"),
                                onClick() {
                                    location.at("acl").at("groups").push();
                                },
                            },
                            addUser: { icon: __webpack_require__(/*! @material-ui/icons/PersonAdd */ "./node_modules/@material-ui/icons/PersonAdd.js") },
                            addGroup: { icon: __webpack_require__(/*! @material-ui/icons/GroupAdd */ "./node_modules/@material-ui/icons/GroupAdd.js") },
                        },
                    },
                } }, children));
        },
    });
    router.at("acl", router => {
        (0,_MuiAclUsersManagerView__WEBPACK_IMPORTED_MODULE_7__.MuiAclUsersManagerView)(router.at("users"));
        (0,_MuiAclGroupsManagerView__WEBPACK_IMPORTED_MODULE_6__.MuiAclGroupsManagerView)(router.at("groups"));
    });
}


/***/ }),

/***/ "./src/system/browser/MuiSystemRootView.tsx":
/*!**************************************************!*\
  !*** ./src/system/browser/MuiSystemRootView.tsx ***!
  \**************************************************/
/*! namespace exports */
/*! export MuiSystemRootView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiSystemRootView": () => /* binding */ MuiSystemRootView
/* harmony export */ });
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! history */ "./node_modules/history/esm/history.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_createMuiSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/createMuiSystem */ "./src/browser/mui/createMuiSystem.ts");
/* harmony import */ var _react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../react/reactor/useEmitter */ "./src/react/reactor/useEmitter.ts");
/* harmony import */ var _typerouter_ReactRouterView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../typerouter/ReactRouterView */ "./src/typerouter/ReactRouterView.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index */ "./src/system/browser/index.ts");
/* harmony import */ var _LoginInfoEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LoginInfoEvent */ "./src/system/browser/LoginInfoEvent.ts");
/* harmony import */ var _MuiSystemView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MuiSystemView */ "./src/system/browser/MuiSystemView.tsx");
/* harmony import */ var _SystemRouter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SystemRouter */ "./src/system/browser/SystemRouter.ts");
;








const { Provider: MuiSystemProvider } = (0,_browser_mui_createMuiSystem__WEBPACK_IMPORTED_MODULE_1__.createMuiSystem)();
const history = (0,history__WEBPACK_IMPORTED_MODULE_8__.createBrowserHistory)();
(0,_MuiSystemView__WEBPACK_IMPORTED_MODULE_6__.MuiSystemView)(_SystemRouter__WEBPACK_IMPORTED_MODULE_7__.SystemRouter);
function MuiSystemRootView() {
    const emit = (0,_react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_2__.useEmitter)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        _index__WEBPACK_IMPORTED_MODULE_4__.SystemLoginInfo.then(loginInfo => {
            console.log({ loginInfo });
            emit(new _LoginInfoEvent__WEBPACK_IMPORTED_MODULE_5__.LoginInfoEvent(loginInfo));
        });
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(MuiSystemProvider, null,
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerouter_ReactRouterView__WEBPACK_IMPORTED_MODULE_3__.ReactRouterView, { history: history, router: _SystemRouter__WEBPACK_IMPORTED_MODULE_7__.SystemRouter })));
}


/***/ }),

/***/ "./src/system/browser/MuiSystemView.tsx":
/*!**********************************************!*\
  !*** ./src/system/browser/MuiSystemView.tsx ***!
  \**********************************************/
/*! namespace exports */
/*! export MuiSystemView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiSystemView": () => /* binding */ MuiSystemView
/* harmony export */ });
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/Grid.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/esm/Paper/Paper.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/makeStyles.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/Typography.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_rpc_inputs_MuiDataInputView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/rpc/inputs/MuiDataInputView */ "./src/browser/mui/rpc/inputs/MuiDataInputView.tsx");
/* harmony import */ var _browser_mui_rpc_MuiFormView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../browser/mui/rpc/MuiFormView */ "./src/browser/mui/rpc/MuiFormView.tsx");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _react_reactor_useEmittedState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../react/reactor/useEmittedState */ "./src/react/reactor/useEmittedState.ts");
/* harmony import */ var _typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../typerpc/widget/WidgetRouterView */ "./src/typerpc/widget/WidgetRouterView.tsx");
/* harmony import */ var _common_SystemApp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/SystemApp */ "./src/system/common/SystemApp.ts");
/* harmony import */ var _LoginInfoEvent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./LoginInfoEvent */ "./src/system/browser/LoginInfoEvent.ts");
/* harmony import */ var _MuiAdminView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MuiAdminView */ "./src/system/browser/MuiAdminView.tsx");
;












const useStyles = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__.default)(theme => ({
    paper: {
        padding: theme.spacing(2),
    },
}));
function MuiSystemView(router) {
    (0,_MuiAdminView__WEBPACK_IMPORTED_MODULE_8__.MuiAdminView)(router.at("admin"));
    (0,_typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_5__.WidgetRouterView)(router.at("login"), _common_SystemApp__WEBPACK_IMPORTED_MODULE_6__.SystemApp.service.devLogin, (props, { emit }) => {
        const classes = useStyles();
        const loginInfo = (0,_react_reactor_useEmittedState__WEBPACK_IMPORTED_MODULE_4__.useEmittedState)(_LoginInfoEvent__WEBPACK_IMPORTED_MODULE_7__.LoginInfoEvent);
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10__.default, { container: true, justify: "center" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10__.default, { item: true },
                    (loginInfo === null || loginInfo === void 0 ? void 0 : loginInfo.success) && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__.default, null, _lang_Lang__WEBPACK_IMPORTED_MODULE_3__.Lang `WELCOME_TO_${"fullName"}`({
                        fullName: loginInfo.success.fullName,
                    }))),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12__.default, { className: classes.paper },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_MuiFormView__WEBPACK_IMPORTED_MODULE_2__.MuiFormView, Object.assign({}, props, { onSubmit: loginInfo => {
                                emit(new _LoginInfoEvent__WEBPACK_IMPORTED_MODULE_7__.LoginInfoEvent(loginInfo));
                            }, input: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_inputs_MuiDataInputView__WEBPACK_IMPORTED_MODULE_1__.MuiDataInputView, Object.assign({}, props, { title: _lang_Lang__WEBPACK_IMPORTED_MODULE_3__.Lang `USER_TO_LOGIN` })))) })))))));
    });
}


/***/ }),

/***/ "./src/system/browser/MuiUserBasicInfoInputView.tsx":
/*!**********************************************************!*\
  !*** ./src/system/browser/MuiUserBasicInfoInputView.tsx ***!
  \**********************************************************/
/*! namespace exports */
/*! export MuiUserBasicInfoInputView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiUserBasicInfoInputView": () => /* binding */ MuiUserBasicInfoInputView
/* harmony export */ });
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/Grid.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/rpc/inputs/MuiTextInputView */ "./src/browser/mui/rpc/inputs/MuiTextInputView.tsx");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../typerpc/input/input-map/InputMapView */ "./src/typerpc/input/input-map/InputMapView.tsx");
/* harmony import */ var _typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../typerpc/input/InputErrorHook */ "./src/typerpc/input/InputErrorHook.ts");
;





const MuiUserBasicInfoInputView = props => {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__.default, { container: true, spacing: 1 },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_3__.InputMapView.Fields, Object.assign({}, props, { fields: {
                firstName: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__.default, { item: true, xs: 6 },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__.MuiTextInputView, Object.assign({}, props, { title: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `FIRST_NAME` })))),
                lastName: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__.default, { item: true, xs: 6 },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__.MuiTextInputView, Object.assign({}, props, { title: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `LAST_NAME` })))),
                loginName: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__.default, { item: true, xs: true },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__.MuiTextInputView, Object.assign({}, (0,_typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_4__.InputErrorHookViewProps)(Object.assign(Object.assign({}, props), { errorMap: {
                            ALREADY_EXISTS: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `LOGIN_NAME_IS_ALREADY_EXISTS`,
                        } })), { title: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `LOGIN_NAME` })))),
            } }))));
};


/***/ }),

/***/ "./src/system/browser/MuiUserContactInfoInputView.tsx":
/*!************************************************************!*\
  !*** ./src/system/browser/MuiUserContactInfoInputView.tsx ***!
  \************************************************************/
/*! namespace exports */
/*! export MuiUserContactInfoInputView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiUserContactInfoInputView": () => /* binding */ MuiUserContactInfoInputView
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/rpc/inputs/MuiTextInputView */ "./src/browser/mui/rpc/inputs/MuiTextInputView.tsx");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../typerpc/input/input-map/InputMapView */ "./src/typerpc/input/input-map/InputMapView.tsx");
;



const MuiUserContactInfoInputView = props => {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_3__.InputMapView.Fields, Object.assign({}, props, { fields: {
            phoneNumber: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__.MuiTextInputView, Object.assign({}, props, { title: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `PHONE_NUMBER` }))),
            email: props => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__.MuiTextInputView, Object.assign({}, props, { title: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `EMAIL` })),
        } })));
};


/***/ }),

/***/ "./src/system/browser/SystemRouter.ts":
/*!********************************************!*\
  !*** ./src/system/browser/SystemRouter.ts ***!
  \********************************************/
/*! namespace exports */
/*! export SystemRouter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SystemRouter": () => /* binding */ SystemRouter
/* harmony export */ });
/* harmony import */ var _typerouter_Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../typerouter/Router */ "./src/typerouter/Router.ts");
/* harmony import */ var _common_admin_AdminRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/admin/AdminRouter */ "./src/system/common/admin/AdminRouter.ts");
;

const SystemRouter = (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_0__.Router)({
    admin: _common_admin_AdminRouter__WEBPACK_IMPORTED_MODULE_1__.AdminRouter,
    login: (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_0__.Router)(),
});


/***/ }),

/***/ "./src/system/browser/index.ts":
/*!*************************************!*\
  !*** ./src/system/browser/index.ts ***!
  \*************************************/
/*! namespace exports */
/*! export SystemLoginInfo [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SystemLoginInfo": () => /* binding */ SystemLoginInfo
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _common_array_useArrayToSeq__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/array/useArrayToSeq */ "./src/common/array/useArrayToSeq.ts");
/* harmony import */ var _typerpc_Rpc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../typerpc/Rpc */ "./src/typerpc/Rpc.ts");
/* harmony import */ var _common_SystemApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/SystemApp */ "./src/system/common/SystemApp.ts");
/* harmony import */ var _MuiSystemRootView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MuiSystemRootView */ "./src/system/browser/MuiSystemRootView.tsx");
;





(0,_common_array_useArrayToSeq__WEBPACK_IMPORTED_MODULE_2__.useArrayToSeq)();
(0,_typerpc_Rpc__WEBPACK_IMPORTED_MODULE_3__.handleRpcService)(_common_SystemApp__WEBPACK_IMPORTED_MODULE_4__.SystemApp, payload => {
    return fetch("/service", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }).then(res => res.json());
});
const SystemLoginInfo = _common_SystemApp__WEBPACK_IMPORTED_MODULE_4__.SystemApp.service.getLoginInfo();
window.addEventListener("DOMContentLoaded", () => {
    react_dom__WEBPACK_IMPORTED_MODULE_1__.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_MuiSystemRootView__WEBPACK_IMPORTED_MODULE_5__.MuiSystemRootView), //
    document.getElementById("system"));
});


/***/ }),

/***/ "./src/system/common/AclGroupsManager.ts":
/*!***********************************************!*\
  !*** ./src/system/common/AclGroupsManager.ts ***!
  \***********************************************/
/*! namespace exports */
/*! export AclGroupInput [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AclGroupsManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AclGroupsManagerRouter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AclGroupInput": () => /* binding */ AclGroupInput,
/* harmony export */   "AclGroupsManager": () => /* binding */ AclGroupsManager,
/* harmony export */   "AclGroupsManagerRouter": () => /* binding */ AclGroupsManagerRouter
/* harmony export */ });
/* harmony import */ var _typerpc_data_manager_DataManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../typerpc/data-manager/DataManager */ "./src/typerpc/data-manager/DataManager.ts");
/* harmony import */ var _typerpc_data_manager_DataManagerRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../typerpc/data-manager/DataManagerRouter */ "./src/typerpc/data-manager/DataManagerRouter.ts");
/* harmony import */ var _typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../typerpc/input/input-map/InputMap */ "./src/typerpc/input/input-map/InputMap.ts");
/* harmony import */ var _typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../typerpc/input/InputErrorHook */ "./src/typerpc/input/InputErrorHook.ts");
/* harmony import */ var _NameInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NameInput */ "./src/system/common/NameInput.ts");
;




const AclGroupInput = (0,_typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_2__.InputMap)({
    groupName: (0,_typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_3__.InputErrorHook)()(_NameInput__WEBPACK_IMPORTED_MODULE_4__.NameInput),
});
const AclGroupsManager = (0,_typerpc_data_manager_DataManager__WEBPACK_IMPORTED_MODULE_0__.DataManager)({
    addInput: AclGroupInput,
    tableRowType: { groupName: String },
});
const AclGroupsManagerRouter = (0,_typerpc_data_manager_DataManagerRouter__WEBPACK_IMPORTED_MODULE_1__.DataManagerRouter)(AclGroupsManager);


/***/ }),

/***/ "./src/system/common/AclUsersManager.ts":
/*!**********************************************!*\
  !*** ./src/system/common/AclUsersManager.ts ***!
  \**********************************************/
/*! namespace exports */
/*! export AclUsersManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AclUsersManagerRouter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UserBasicInfoInput [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UserContactInfoInput [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserBasicInfoInput": () => /* binding */ UserBasicInfoInput,
/* harmony export */   "UserContactInfoInput": () => /* binding */ UserContactInfoInput,
/* harmony export */   "AclUsersManager": () => /* binding */ AclUsersManager,
/* harmony export */   "AclUsersManagerRouter": () => /* binding */ AclUsersManagerRouter
/* harmony export */ });
/* harmony import */ var _typerpc_data_manager_DataManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../typerpc/data-manager/DataManager */ "./src/typerpc/data-manager/DataManager.ts");
/* harmony import */ var _typerpc_data_manager_DataManagerRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../typerpc/data-manager/DataManagerRouter */ "./src/typerpc/data-manager/DataManagerRouter.ts");
/* harmony import */ var _typerpc_input_bool_input_BoolInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../typerpc/input/bool-input/BoolInput */ "./src/typerpc/input/bool-input/BoolInput.ts");
/* harmony import */ var _typerpc_input_data_input_map_DataInputMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../typerpc/input/data-input-map/DataInputMap */ "./src/typerpc/input/data-input-map/DataInputMap.ts");
/* harmony import */ var _typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../typerpc/input/input-map/InputMap */ "./src/typerpc/input/input-map/InputMap.ts");
/* harmony import */ var _typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../typerpc/input/InputErrorHook */ "./src/typerpc/input/InputErrorHook.ts");
/* harmony import */ var _typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../typerpc/input/text-input/TextInput */ "./src/typerpc/input/text-input/TextInput.ts");
/* harmony import */ var _typerpc_widget_form_Form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../typerpc/widget/form/Form */ "./src/typerpc/widget/form/Form.ts");
/* harmony import */ var _NameInput__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NameInput */ "./src/system/common/NameInput.ts");
;








/*

InputWithError<>()

// check

InputWithErrorViewProps()
InlineInput({
  target: TextInput()
  error: Typing<...>(),

})

// InlineInputError
// InlineWidgetElemtn

 */
const UserBasicInfoInput = (0,_typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_4__.InputMap)({
    firstName: _NameInput__WEBPACK_IMPORTED_MODULE_8__.NameInput,
    lastName: _NameInput__WEBPACK_IMPORTED_MODULE_8__.NameInput,
    loginName: (0,_typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_5__.InputErrorHook)()((0,_typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_6__.TextInput)({
        nullable: true,
        trim: true,
    })),
});
/*

const currentTabState = useRouterLocationState(location, "currentTab");



// emit(new LocationState("x", "asdad"))

<Tabs view currentTabState={()=> useRouterLocationState(location, "currentTab")} />
 */
const UserContactInfoInput = (0,_typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_4__.InputMap)({
    phoneNumber: (0,_typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_6__.TextInput)({ nullable: true, trim: true }),
    email: (0,_typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_6__.TextInput)({ nullable: true, trim: true }),
});
const AclUsersManager = (0,_typerpc_data_manager_DataManager__WEBPACK_IMPORTED_MODULE_0__.DataManager)({
    addInput: UserBasicInfoInput,
    editInput: (0,_typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_4__.InputMap)({
        basicInfo: UserBasicInfoInput,
        contactInfo: UserContactInfoInput,
    }),
    tableRowType: {
        loginName: String,
        firstName: String,
        lastName: String,
    },
    // editController
    // defaultParam
    editTabs: {
        // TODO: groups
        groups: (0,_typerpc_widget_form_Form__WEBPACK_IMPORTED_MODULE_7__.Form)({
            input: (0,_typerpc_input_data_input_map_DataInputMap__WEBPACK_IMPORTED_MODULE_3__.DataInputMap)((0,_typerpc_input_bool_input_BoolInput__WEBPACK_IMPORTED_MODULE_2__.BoolInput)()),
        }),
    },
});
const AclUsersManagerRouter = (0,_typerpc_data_manager_DataManagerRouter__WEBPACK_IMPORTED_MODULE_1__.DataManagerRouter)(AclUsersManager);


/***/ }),

/***/ "./src/system/common/AdminApp.ts":
/*!***************************************!*\
  !*** ./src/system/common/AdminApp.ts ***!
  \***************************************/
/*! namespace exports */
/*! export AdminApp [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminApp": () => /* binding */ AdminApp
/* harmony export */ });
/* harmony import */ var _typerpc_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../typerpc/rpc-map/RpcMap */ "./src/typerpc/rpc-map/RpcMap.ts");
/* harmony import */ var _AclGroupsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AclGroupsManager */ "./src/system/common/AclGroupsManager.ts");
/* harmony import */ var _AclUsersManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AclUsersManager */ "./src/system/common/AclUsersManager.ts");
;


const AdminApp = (0,_typerpc_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_0__.RpcMap)({
    usersManager: _AclUsersManager__WEBPACK_IMPORTED_MODULE_2__.AclUsersManager,
    groupsManager: _AclGroupsManager__WEBPACK_IMPORTED_MODULE_1__.AclGroupsManager,
});


/***/ }),

/***/ "./src/system/common/NameInput.ts":
/*!****************************************!*\
  !*** ./src/system/common/NameInput.ts ***!
  \****************************************/
/*! namespace exports */
/*! export NameInput [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NameInput": () => /* binding */ NameInput
/* harmony export */ });
/* harmony import */ var _typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../typerpc/input/text-input/TextInput */ "./src/typerpc/input/text-input/TextInput.ts");
;
const NameInput = (0,_typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_0__.TextInput)({
    minLength: 2,
    maxLength: 20,
    required: true,
    trim: true,
});


/***/ }),

/***/ "./src/system/common/SystemApp.ts":
/*!****************************************!*\
  !*** ./src/system/common/SystemApp.ts ***!
  \****************************************/
/*! namespace exports */
/*! export DevLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SystemApp [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DevLogin": () => /* binding */ DevLogin,
/* harmony export */   "SystemApp": () => /* binding */ SystemApp
/* harmony export */ });
/* harmony import */ var _common_typings2_TypeRef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/typings2/TypeRef */ "./src/common/typings2/TypeRef.ts");
/* harmony import */ var _common_typings2_Typing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/typings2/Typing */ "./src/common/typings2/Typing.ts");
/* harmony import */ var _typerpc_input_data_input_DataInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../typerpc/input/data-input/DataInput */ "./src/typerpc/input/data-input/DataInput.ts");
/* harmony import */ var _typerpc_rpc_fn_RpcFn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../typerpc/rpc-fn/RpcFn */ "./src/typerpc/rpc-fn/RpcFn.ts");
/* harmony import */ var _typerpc_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../typerpc/rpc-map/RpcMap */ "./src/typerpc/rpc-map/RpcMap.ts");
/* harmony import */ var _typerpc_widget_form_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../typerpc/widget/form/Form */ "./src/typerpc/widget/form/Form.ts");
/* harmony import */ var _AdminApp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AdminApp */ "./src/system/common/AdminApp.ts");
/* harmony import */ var _UserApp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UserApp */ "./src/system/common/UserApp.ts");
;







// RemotePromise<X>
// type: rejected
// type: resolved
const DevLogin = (0,_typerpc_widget_form_Form__WEBPACK_IMPORTED_MODULE_5__.Form)({
    input: (0,_typerpc_input_data_input_DataInput__WEBPACK_IMPORTED_MODULE_2__.DataInput)({
        loadType: (0,_common_typings2_TypeRef__WEBPACK_IMPORTED_MODULE_0__.TypeRef)(() => DevLoginUser),
    }),
    value: (0,_common_typings2_Typing__WEBPACK_IMPORTED_MODULE_1__.Typing)(),
});
const SystemApp = (0,_typerpc_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_4__.RpcMap)({
    logout: (0,_typerpc_rpc_fn_RpcFn__WEBPACK_IMPORTED_MODULE_3__.RpcFn)(),
    getLoginInfo: (0,_typerpc_rpc_fn_RpcFn__WEBPACK_IMPORTED_MODULE_3__.RpcFn)(),
    devLogin: DevLogin,
    admin: _AdminApp__WEBPACK_IMPORTED_MODULE_6__.AdminApp,
    user: _UserApp__WEBPACK_IMPORTED_MODULE_7__.UserApp,
});


/***/ }),

/***/ "./src/system/common/UserApp.ts":
/*!**************************************!*\
  !*** ./src/system/common/UserApp.ts ***!
  \**************************************/
/*! namespace exports */
/*! export UserApp [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserApp": () => /* binding */ UserApp
/* harmony export */ });
/* harmony import */ var _typerpc_rpc_fn_RpcFn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../typerpc/rpc-fn/RpcFn */ "./src/typerpc/rpc-fn/RpcFn.ts");
/* harmony import */ var _typerpc_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../typerpc/rpc-map/RpcMap */ "./src/typerpc/rpc-map/RpcMap.ts");
;

const UserApp = (0,_typerpc_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_1__.RpcMap)({
    foo: (0,_typerpc_rpc_fn_RpcFn__WEBPACK_IMPORTED_MODULE_0__.RpcFn)(),
});


/***/ }),

/***/ "./src/system/common/admin/AdminRouter.ts":
/*!************************************************!*\
  !*** ./src/system/common/admin/AdminRouter.ts ***!
  \************************************************/
/*! namespace exports */
/*! export AdminRouter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminRouter": () => /* binding */ AdminRouter
/* harmony export */ });
/* harmony import */ var _typerouter_Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../typerouter/Router */ "./src/typerouter/Router.ts");
/* harmony import */ var _AclGroupsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AclGroupsManager */ "./src/system/common/AclGroupsManager.ts");
/* harmony import */ var _AclUsersManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AclUsersManager */ "./src/system/common/AclUsersManager.ts");
;


const AdminRouter = (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_0__.Router)({
    acl: (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_0__.Router)({
        users: _AclUsersManager__WEBPACK_IMPORTED_MODULE_2__.AclUsersManagerRouter,
        groups: _AclGroupsManager__WEBPACK_IMPORTED_MODULE_1__.AclGroupsManagerRouter,
    }),
});


/***/ }),

/***/ "./src/typerouter/ReactRouter.ts":
/*!***************************************!*\
  !*** ./src/typerouter/ReactRouter.ts ***!
  \***************************************/
/*! namespace exports */
/*! export ReactRouter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getReactRouterMetadata [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactRouter": () => /* binding */ ReactRouter,
/* harmony export */   "getReactRouterMetadata": () => /* binding */ getReactRouterMetadata
/* harmony export */ });
/* harmony import */ var _common_map_mapFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/map/mapFactory */ "./src/common/map/mapFactory.ts");
;
function ReactRouter(router, optionsOrRenderer) {
    let options;
    if (typeof optionsOrRenderer === "function") {
        options = { render: optionsOrRenderer };
    }
    else {
        options = optionsOrRenderer;
    }
    const { wrap: wrapper, render, renderDefault, renderIndex, renderNoParam, } = options;
    const info = getReactRouterMetadata(router);
    wrapper && info.wrappers.push(wrapper);
    const { renderer: prevRender } = info;
    info.renderer = props => {
        var _a;
        switch (props.route.type) {
            case "DEFAULT":
                if (renderDefault)
                    return props;
                break;
            case "INDEX":
                if (renderIndex)
                    return renderIndex(props);
                break;
            case "NO_PARAM":
                if (renderNoParam)
                    return renderNoParam(props);
                break;
        }
        return (_a = (render || prevRender)) === null || _a === void 0 ? void 0 : _a(props);
    };
}
const getReactRouterMetadata = (0,_common_map_mapFactory__WEBPACK_IMPORTED_MODULE_0__.WeakMapFactory)((router) => {
    return {
        wrappers: [],
        renderer: undefined,
    };
});


/***/ }),

/***/ "./src/typerouter/ReactRouterView.ts":
/*!*******************************************!*\
  !*** ./src/typerouter/ReactRouterView.ts ***!
  \*******************************************/
/*! namespace exports */
/*! export ReactRouterView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactRouterView": () => /* binding */ ReactRouterView
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_reactor_useEmitted__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../react/reactor/useEmitted */ "./src/react/reactor/useEmitted.ts");
/* harmony import */ var _react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../react/reactor/useEmitter */ "./src/react/reactor/useEmitter.ts");
/* harmony import */ var _ReactRouter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReactRouter */ "./src/typerouter/ReactRouter.ts");
/* harmony import */ var _Route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Route */ "./src/typerouter/Route.ts");
/* harmony import */ var _RouterLocation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RouterLocation */ "./src/typerouter/RouterLocation.ts");
;





const HistoryContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);
// emit(new LocationState(...))
// HistoryAction(()=> {})
// useDefaultEmitted(History, myHistory);
function ReactRouterView({ router: rootRouter, history, }) {
    const emit = (0,_react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_2__.useEmitter)();
    const [routerState, setRouterState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => {
        const route = getRouteByHistory();
        return {
            route,
            element: createRouteElement(route, history.location.state),
        };
    });
    (0,_react_reactor_useEmitted__WEBPACK_IMPORTED_MODULE_1__.useEmitted)(_RouterLocation__WEBPACK_IMPORTED_MODULE_5__.RouterLocation, location => {
        if (location.root.router === rootRouter &&
            location.path !== routerState.route.location.path) {
            history.push(location.path);
            pushRoute({
                type: "INDEX",
                location,
                path: location.path,
            });
        }
    }, [routerState]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => history.listen(() => {
        if (history.location.pathname !== routerState.route.location.path) {
            pushRoute(getRouteByHistory());
        }
    }), [history, routerState]);
    return routerState.element;
    function setLocationState(state) {
        history.replace(history.location.pathname, Object.assign(Object.assign({}, history.location.state), state));
    }
    function pushRoute(route) {
        setRouterState({
            route,
            element: createRouteElement(route, undefined),
        });
    }
    function createRouteElement(route, state) {
        let children = undefined;
        const routerMetadata = (0,_ReactRouter__WEBPACK_IMPORTED_MODULE_3__.getReactRouterMetadata)(route.location.router);
        if (routerMetadata.renderer) {
            const path = route.location.path;
            children = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(routerMetadata.renderer, {
                key: path + ":index",
                emit,
                route,
                location: route.location,
                state: state === null || state === void 0 ? void 0 : state[path],
                setState(state) {
                    setLocationState({ [path]: state });
                },
            });
        }
        for (const location of route.location.getParents()) {
            const path = route.location.path;
            const routerMetadata = (0,_ReactRouter__WEBPACK_IMPORTED_MODULE_3__.getReactRouterMetadata)(location.router);
            for (const [index, wrapper] of routerMetadata.wrappers.entries()) {
                children = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(wrapper, {
                    key: location.path + ":wrapper:" + index,
                    emit,
                    children,
                    location,
                    route,
                    state: state === null || state === void 0 ? void 0 : state[path],
                    setState(state) {
                        setLocationState({ [path]: state });
                    },
                });
            }
        }
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, children);
    }
    function getRouteByHistory() {
        return (0,_Route__WEBPACK_IMPORTED_MODULE_4__.getRouteByPath)(_RouterLocation__WEBPACK_IMPORTED_MODULE_5__.RouterLocation.create(rootRouter, emit), history.location.pathname);
    }
}


/***/ }),

/***/ "./src/typerouter/Route.ts":
/*!*********************************!*\
  !*** ./src/typerouter/Route.ts ***!
  \*********************************/
/*! namespace exports */
/*! export getRouteByPath [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRouteByPath": () => /* binding */ getRouteByPath
/* harmony export */ });
/* harmony import */ var _common_getNextPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/getNextPath */ "./src/common/getNextPath.ts");
/* harmony import */ var _common_MetaType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/MetaType */ "./src/common/MetaType.ts");
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Router */ "./src/typerouter/Router.ts");
/* harmony import */ var _RouterLocation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RouterLocation */ "./src/typerouter/RouterLocation.ts");
;



function getRouteByPath(location, path) {
    const baseProps = { path };
    while (true) {
        const defaultPath = path;
        let name;
        [name, path] = (0,_common_getNextPath__WEBPACK_IMPORTED_MODULE_0__.getNextPath)(path);
        if (!name) {
            return Object.assign(Object.assign({}, baseProps), { type: "INDEX", location });
        }
        const router = location.router.children[name];
        if (!router) {
            return Object.assign(Object.assign({}, baseProps), { type: "DEFAULT", location,
                defaultPath });
        }
        let params = {};
        for (const [paramIndex, paramKey] of router.params.entries()) {
            let value;
            [value, path] = (0,_common_getNextPath__WEBPACK_IMPORTED_MODULE_0__.getNextPath)(path);
            if (!value) {
                return Object.assign(Object.assign({}, baseProps), { type: "NO_PARAM", location,
                    params,
                    paramIndex,
                    paramKey });
            }
            params[paramKey] = value;
        }
        location = new _RouterLocation__WEBPACK_IMPORTED_MODULE_3__.RouterLocation(router, params, location, name, location.emit);
    }
}
(0,_common_MetaType__WEBPACK_IMPORTED_MODULE_1__.testMetaType)((0,_Router__WEBPACK_IMPORTED_MODULE_2__.Router)(["p"]), t => {
    // @ts-expect-error
    t.TRouter.Params.x;
    t.TRouter.Params.p;
});
(0,_common_MetaType__WEBPACK_IMPORTED_MODULE_1__.testMetaType)((0,_Router__WEBPACK_IMPORTED_MODULE_2__.Router)({ a: (0,_Router__WEBPACK_IMPORTED_MODULE_2__.Router)(["p"]) }), t => {
    // @ts-expect-error
    t.TRouter.Params.x;
    // @ts-expect-error
    t.TRouter.Children.a.Params.x;
    t.TRouter.Children.a.Params.p;
});
(0,_common_MetaType__WEBPACK_IMPORTED_MODULE_1__.testMetaType)((0,_Router__WEBPACK_IMPORTED_MODULE_2__.Router)({
    a: (0,_Router__WEBPACK_IMPORTED_MODULE_2__.Router)(["p"], {
        aa: (0,_Router__WEBPACK_IMPORTED_MODULE_2__.Router)(["pp"]),
    }),
}), t => {
    // @ts-expect-error
    t.TRouter.Params.x;
    // @ts-expect-error
    t.TRouter.Children.a.Params.x;
    t.TRouter.Children.a.Params.p;
    // @ts-expect-error
    t.TRouter.Children.a.Children.aa.Params.x;
    t.TRouter.Children.a.Children.aa.Params.pp;
});


/***/ }),

/***/ "./src/typerouter/Router.ts":
/*!**********************************!*\
  !*** ./src/typerouter/Router.ts ***!
  \**********************************/
/*! namespace exports */
/*! export Router [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RouterType [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Router": () => /* binding */ Router,
/* harmony export */   "RouterType": () => /* binding */ RouterType
/* harmony export */ });
/* harmony import */ var _common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/object/mapObject */ "./src/common/object/mapObject.ts");
;
function createRouter(params, children) {
    return {
        children,
        params,
        bases: new Set(),
    };
}
function Router(paramsOrChildren, maybeChildren) {
    let params, children;
    if (maybeChildren) {
        [params, children] = [paramsOrChildren, maybeChildren];
    }
    else {
        if (Array.isArray(paramsOrChildren)) {
            [params, children] = [paramsOrChildren, {}];
        }
        else {
            [params, children] = [[], paramsOrChildren || {}];
        }
    }
    return Object.setPrototypeOf(createRouter(params, children), RouterType);
}
var RouterType;
(function (RouterType) {
    function at(key, callback) {
        if (callback) {
            callback(this.children[key]);
            return this;
        }
        return this.children[key];
    }
    RouterType.at = at;
    function create() {
        const router = Router(this.params, (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__.mapObject)(this.children, c => c.create()));
        router.bases.add(this);
        for (const base of this.bases) {
            router.bases.add(base);
        }
        return router;
    }
    RouterType.create = create;
    function isRouterOf(base) {
        return this === base || this.bases.has(base);
    }
    RouterType.isRouterOf = isRouterOf;
})(RouterType || (RouterType = {}));


/***/ }),

/***/ "./src/typerouter/RouterLocation.ts":
/*!******************************************!*\
  !*** ./src/typerouter/RouterLocation.ts ***!
  \******************************************/
/*! namespace exports */
/*! export RouterLocation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RouterLocation": () => /* binding */ RouterLocation
/* harmony export */ });
/* harmony import */ var _common_object_entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/object/entries */ "./src/common/object/entries.ts");
/* harmony import */ var _common_patterns_lazy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/patterns/lazy */ "./src/common/patterns/lazy.ts");
/* harmony import */ var _common_string_joinUrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/string/joinUrl */ "./src/common/string/joinUrl.ts");
/* harmony import */ var _logging_inspect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logging/inspect */ "./src/logging/inspect.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




class RouterLocation {
    constructor(_router, _params, _parent, name, emit) {
        this._router = _router;
        this._params = _params;
        this._parent = _parent;
        this.name = name;
        this.emit = emit;
    }
    static create(router, emit = (event) => void 0) {
        if (router.params.length)
            throw new Error(`Can't create RouterLocation for ${(0,_logging_inspect__WEBPACK_IMPORTED_MODULE_3__.inspect)(this)}.`);
        return new RouterLocation(router, {}, undefined, undefined, emit);
    }
    get path() {
        var _a;
        let path = (0,_common_string_joinUrl__WEBPACK_IMPORTED_MODULE_2__.joinUrl)(((_a = this._parent) === null || _a === void 0 ? void 0 : _a.path) || "", this.name);
        for (const paramKey of this._router.params) {
            path = (0,_common_string_joinUrl__WEBPACK_IMPORTED_MODULE_2__.joinUrl)(path, this._params[paramKey]);
        }
        return path;
    }
    get parent() {
        return this._parent;
    }
    get root() {
        var _a;
        return ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.root) || this;
    }
    get router() {
        return this._router;
    }
    get params() {
        return this._params;
    }
    push() {
        this.emit(this);
    }
    at(key, ...[params]) {
        return (new RouterLocation(this._router.children[key], params || {}, this, key, this.emit));
    }
    atStack(key) {
        throw new Error();
    }
    *getParents() {
        for (let parent = this; parent; parent = parent.parent) {
            yield parent;
        }
    }
    *getParentsChildren() {
        for (let [name, router] of (0,_common_object_entries__WEBPACK_IMPORTED_MODULE_0__.entries)(this._router.children)) {
            if (router.params.length)
                continue;
            yield new RouterLocation(router, {}, this, name, this.emit);
        }
    }
    *getChildren() {
        for (const [name, router] of (0,_common_object_entries__WEBPACK_IMPORTED_MODULE_0__.entries)(this._router.children)) {
            if (!router.params.length) {
                yield new RouterLocation(router, {}, this, name, this.emit);
            }
        }
    }
    *findChildren() {
        yield* this.getChildren();
        for (let child of this.getChildren()) {
            yield* child.findChildren();
        }
    }
    *findParents() {
        let root = undefined;
        let parentRouters = new Set();
        for (const parent of this.getParents()) {
            parentRouters.add(parent.router);
            yield (root = parent);
        }
        if (root) {
            for (const child of root.findChildren()) {
                if (!parentRouters.has(child.router)) {
                    yield child;
                }
            }
        }
    }
    _find(locations, router) {
        for (const child of locations) {
            if (child.router.isRouterOf(router)) {
                return child;
            }
        }
    }
    find(router) {
        return this._find(this.findParents(), router);
    }
}
__decorate([
    (0,_common_patterns_lazy__WEBPACK_IMPORTED_MODULE_1__.Lazy)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], RouterLocation.prototype, "path", null);


/***/ }),

/***/ "./src/typerpc/ConfigFactory.ts":
/*!**************************************!*\
  !*** ./src/typerpc/ConfigFactory.ts ***!
  \**************************************/
/*! namespace exports */
/*! export ConfigFactory [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigFactory": () => /* binding */ ConfigFactory
/* harmony export */ });
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rpc */ "./src/typerpc/Rpc.ts");
;
const resultSymbol = Symbol();
async function ConfigFactory(config, context, ...args) {
    if (!config)
        return;
    let result = await config($ => {
        return { [resultSymbol]: $ };
    }, context, ...args);
    if (!result || !(resultSymbol in result)) {
        throw new _Rpc__WEBPACK_IMPORTED_MODULE_0__.RpcError(`You have to use $`);
    }
    while (resultSymbol in result) {
        result = result[resultSymbol];
    }
    return result;
}


/***/ }),

/***/ "./src/typerpc/GenericConfig.ts":
/*!**************************************!*\
  !*** ./src/typerpc/GenericConfig.ts ***!
  \**************************************/
/*! namespace exports */
/*! export GenericConfig [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenericConfig": () => /* binding */ GenericConfig
/* harmony export */ });
/* harmony import */ var _common_map_touchMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/map/touchMap */ "./src/common/map/touchMap.ts");
;
const genericConfigCache = new WeakMap();
function GenericConfig(genericConfig) {
    return (0,_common_map_touchMap__WEBPACK_IMPORTED_MODULE_0__.touchMap)(genericConfigCache, genericConfig, () => {
        return genericConfig(x => x);
    });
}


/***/ }),

/***/ "./src/typerpc/NoRpc.ts":
/*!******************************!*\
  !*** ./src/typerpc/NoRpc.ts ***!
  \******************************/
/*! namespace exports */
/*! export NoRpc [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoRpc": () => /* binding */ NoRpc
/* harmony export */ });
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rpc */ "./src/typerpc/Rpc.ts");
;
const NoRpc = (0,_Rpc__WEBPACK_IMPORTED_MODULE_0__.Rpc)({
    connect: () => ({}),
    handler: class extends _Rpc__WEBPACK_IMPORTED_MODULE_0__.AbstractRpcHandler {
        async handle() {
            return null;
        }
    },
});


/***/ }),

/***/ "./src/typerpc/Rpc.ts":
/*!****************************!*\
  !*** ./src/typerpc/Rpc.ts ***!
  \****************************/
/*! namespace exports */
/*! export AbstractRpcHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AnyRpc [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Rpc [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RpcConfig [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RpcError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export configureRpcService [provided] [no usage info] [missing usage info prevents renaming] */
/*! export handleRpcService [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rpc": () => /* binding */ Rpc,
/* harmony export */   "AbstractRpcHandler": () => /* binding */ AbstractRpcHandler,
/* harmony export */   "AnyRpc": () => /* binding */ AnyRpc,
/* harmony export */   "RpcError": () => /* binding */ RpcError,
/* harmony export */   "handleRpcService": () => /* binding */ handleRpcService,
/* harmony export */   "configureRpcService": () => /* binding */ configureRpcService,
/* harmony export */   "RpcConfig": () => /* binding */ RpcConfig
/* harmony export */ });
/* harmony import */ var _common_map_touchMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/map/touchMap */ "./src/common/map/touchMap.ts");
/* harmony import */ var _common_object_mergeDescriptors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/object/mergeDescriptors */ "./src/common/object/mergeDescriptors.ts");
/* harmony import */ var _logging_inspect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logging/inspect */ "./src/logging/inspect.ts");
/* harmony import */ var _ConfigFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConfigFactory */ "./src/typerpc/ConfigFactory.ts");
/* harmony import */ var _GenericConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GenericConfig */ "./src/typerpc/GenericConfig.ts");
;




const rpcToServiceCommand = new WeakMap();
function Rpc(options) {
    let service;
    const rpc = Object.setPrototypeOf((0,_common_object_mergeDescriptors__WEBPACK_IMPORTED_MODULE_1__.mergeDescriptors)(options["props"] || {}, {
        options,
        get service() {
            return service;
        },
    }), AnyRpc);
    service = rpc.createRpcConnection(payload => {
        const command = rpcToServiceCommand.get(service);
        if (!command) {
            throw new RpcError(`No handle for service.`);
        }
        return command(payload);
    });
    return rpc;
}
class AbstractRpcHandler {
    constructor(rpc, config) {
        this.rpc = rpc;
        this.config = config;
    }
}
const rpcToUndefinedConfig = new WeakMap();
const rpcToConfigToContext = new WeakMap();
let isServiceHandler = false;
const AnyRpc = {
    get options() {
        throw new Error();
    },
    get service() {
        throw new Error();
    },
    createRpcConnection(handler) {
        if (isServiceHandler) {
            rpcToServiceCommand.set(this.service, handler);
        }
        return this.options.connect.call(this, handler);
    },
    async createRpcHandler(config) {
        return new this.options.handler(this, config);
    },
    async resolveRpcHandler(unresolvedConfig) {
        return this.createRpcHandler(await this.resolveRpcConfig(unresolvedConfig));
    },
    async resolveRpcConfig(config) {
        if (config && typeof config === "object" && "$context" in config) {
            config = await (0,_ConfigFactory__WEBPACK_IMPORTED_MODULE_3__.ConfigFactory)(config.$context, this);
        }
        if (config &&
            Array.isArray(config) &&
            config.length === 1 &&
            typeof config[0] === "function") {
            config = await (0,_ConfigFactory__WEBPACK_IMPORTED_MODULE_3__.ConfigFactory)(config[0], this);
        }
        if (this.options.isGenericConfig) {
            if (typeof config !== "function")
                throw new TypeError(`expected to generic config, got: ${(0,_logging_inspect__WEBPACK_IMPORTED_MODULE_2__.inspect)(config)}`);
            config = await (0,_GenericConfig__WEBPACK_IMPORTED_MODULE_4__.GenericConfig)(config);
        }
        else if (typeof config === "function" && !this.options.isConfigFn) {
            config = await (0,_ConfigFactory__WEBPACK_IMPORTED_MODULE_3__.ConfigFactory)(config);
        }
        return config || {};
    },
    createRpcCommand(unresolvedConfig) {
        if (!unresolvedConfig) {
            unresolvedConfig = (0,_common_map_touchMap__WEBPACK_IMPORTED_MODULE_0__.touchMap)(rpcToUndefinedConfig, this, Object);
        }
        let config;
        let hasConfig = false;
        return async (payload) => {
            if (!hasConfig) {
                config = await this.resolveRpcConfig(unresolvedConfig);
                hasConfig = true;
            }
            const context = await (0,_common_map_touchMap__WEBPACK_IMPORTED_MODULE_0__.touchMap)((0,_common_map_touchMap__WEBPACK_IMPORTED_MODULE_0__.touchMap)(rpcToConfigToContext, this, () => new WeakMap()), config, () => this.createRpcHandler(config));
            return context.handle(payload);
        };
    },
};
class RpcError extends Error {
}
function handleRpcService(rpc, command) {
    isServiceHandler = true;
    const connection = rpc.createRpcConnection(command);
    isServiceHandler = false;
    return connection;
}
function configureRpcService(rpc, config) {
    return handleRpcService(rpc, rpc.createRpcCommand(config));
}
function RpcConfig(rpc, config) {
    return config;
}


/***/ }),

/***/ "./src/typerpc/RpcConfigHook.ts":
/*!**************************************!*\
  !*** ./src/typerpc/RpcConfigHook.ts ***!
  \**************************************/
/*! namespace exports */
/*! export RpcConfigHook [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RpcConfigHook": () => /* binding */ RpcConfigHook
/* harmony export */ });
/* harmony import */ var _ConfigFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfigFactory */ "./src/typerpc/ConfigFactory.ts");
/* harmony import */ var _GenericConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GenericConfig */ "./src/typerpc/GenericConfig.ts");
;

function RpcConfigHook(options) {
    var _a;
    const { target, handler } = options;
    const isGenericConfig = "isGenericConfig" in options ? (_a = options.isGenericConfig) !== null && _a !== void 0 ? _a : false : false;
    return Object.setPrototypeOf(Object.assign(Object.assign({}, options["props"]), { async resolveRpcConfig(config) {
            if (isGenericConfig) {
                config = await (0,_GenericConfig__WEBPACK_IMPORTED_MODULE_1__.GenericConfig)(handler({
                    config: await (0,_GenericConfig__WEBPACK_IMPORTED_MODULE_1__.GenericConfig)(config),
                    target: this,
                    props: options["props"],
                }));
            }
            else {
                config = await (0,_ConfigFactory__WEBPACK_IMPORTED_MODULE_0__.ConfigFactory)(handler({
                    config,
                    target: this,
                    props: options["props"],
                }));
            }
            return target.resolveRpcConfig.call(this, config);
        } }), target);
}


/***/ }),

/***/ "./src/typerpc/data-manager/DataManager.ts":
/*!*************************************************!*\
  !*** ./src/typerpc/data-manager/DataManager.ts ***!
  \*************************************************/
/*! namespace exports */
/*! export DataManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataManager": () => /* binding */ DataManager
/* harmony export */ });
/* harmony import */ var _rpc_fn_RpcFn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rpc-fn/RpcFn */ "./src/typerpc/rpc-fn/RpcFn.ts");
/* harmony import */ var _rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rpc-map/RpcMap */ "./src/typerpc/rpc-map/RpcMap.ts");
/* harmony import */ var _rpc_parameter_RpcParameter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rpc-parameter/RpcParameter */ "./src/typerpc/rpc-parameter/RpcParameter.ts");
/* harmony import */ var _RpcConfigHook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../RpcConfigHook */ "./src/typerpc/RpcConfigHook.ts");
/* harmony import */ var _widget_data_table_DataTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widget/data-table/DataTable */ "./src/typerpc/widget/data-table/DataTable.ts");
/* harmony import */ var _widget_form_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../widget/form/Form */ "./src/typerpc/widget/form/Form.ts");
/* harmony import */ var _widget_inline_widget_InlineWidget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../widget/inline-widget/InlineWidget */ "./src/typerpc/widget/inline-widget/InlineWidget.ts");
/* harmony import */ var _widget_tabs_widget_TabsWidget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../widget/tabs-widget/TabsWidget */ "./src/typerpc/widget/tabs-widget/TabsWidget.ts");
/* harmony import */ var _DataManagerHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DataManagerHandler */ "./src/typerpc/data-manager/DataManagerHandler.ts");
;








function DataManager(options) {
    const editInput = options.editInput || options.addInput;
    const editTabs = Object.assign({ form: (0,_widget_form_Form__WEBPACK_IMPORTED_MODULE_5__.Form)({ input: editInput }) }, options.editTabs);
    return (0,_RpcConfigHook__WEBPACK_IMPORTED_MODULE_3__.RpcConfigHook)({
        props: {
            editInput,
            editTabs,
        },
        isGenericConfig: true,
        handler: _DataManagerHandler__WEBPACK_IMPORTED_MODULE_8__.DataManagerHandler,
        target: (0,_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_1__.RpcMap)({
            delete: (0,_rpc_fn_RpcFn__WEBPACK_IMPORTED_MODULE_0__.RpcFn)(),
            table: (0,_widget_data_table_DataTable__WEBPACK_IMPORTED_MODULE_4__.DataTable)(options.tableRowType, options.tableOptions),
            add: (0,_widget_form_Form__WEBPACK_IMPORTED_MODULE_5__.Form)({
                input: options.addInput,
            }),
            edit: (0,_rpc_parameter_RpcParameter__WEBPACK_IMPORTED_MODULE_2__.RpcParameter)(String, (0,_widget_inline_widget_InlineWidget__WEBPACK_IMPORTED_MODULE_6__.InlineWidget)({
                target: (0,_widget_tabs_widget_TabsWidget__WEBPACK_IMPORTED_MODULE_7__.TabsWidget)(editTabs),
            })),
        }),
    });
}


/***/ }),

/***/ "./src/typerpc/data-manager/DataManagerHandler.ts":
/*!********************************************************!*\
  !*** ./src/typerpc/data-manager/DataManagerHandler.ts ***!
  \********************************************************/
/*! namespace exports */
/*! export DataManagerHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataManagerHandler": () => /* binding */ DataManagerHandler
/* harmony export */ });
/* harmony import */ var _ConfigFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ConfigFactory */ "./src/typerpc/ConfigFactory.ts");
;
const DataManagerHandler = ({ config, }) => $ => {
    return $({
        async delete(key) {
            await config.source.delete(key);
        },
        table: $ => $(Object.assign(Object.assign({}, config.tableConfig), { columns: config.tableColumnsConfig, source: config.source })),
        add: {
            inputConfig: config.addInputConfig,
            submit: config.addSubmit,
        },
        edit: async ($, key) => {
            const row = await config.source.getOrFail(key);
            return $({
                getElement() {
                    return { title: config.getTitleForRow(row) };
                },
                targetConfig: async ($) => {
                    return $(Object.assign(Object.assign({}, (await (0,_ConfigFactory__WEBPACK_IMPORTED_MODULE_0__.ConfigFactory)(config.getTabsConfigForRow, row))), { form: async ($) => $({
                            inputConfig: await (0,_ConfigFactory__WEBPACK_IMPORTED_MODULE_0__.ConfigFactory)(config.editInputConfigForRow, row),
                            valueConfig: config.editValueConfigForRow &&
                                (() => (0,_ConfigFactory__WEBPACK_IMPORTED_MODULE_0__.ConfigFactory)(config.editValueConfigForRow, row)),
                            async submit(value) {
                                await config.editSubmit(row, value);
                            },
                        }) }));
                },
            });
        },
    });
};


/***/ }),

/***/ "./src/typerpc/data-manager/DataManagerRouter.ts":
/*!*******************************************************!*\
  !*** ./src/typerpc/data-manager/DataManagerRouter.ts ***!
  \*******************************************************/
/*! namespace exports */
/*! export DataManagerRouter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataManagerRouter": () => /* binding */ DataManagerRouter
/* harmony export */ });
/* harmony import */ var _common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/object/mapObject */ "./src/common/object/mapObject.ts");
/* harmony import */ var _typerouter_Router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../typerouter/Router */ "./src/typerouter/Router.ts");
;

function DataManagerRouter(dm) {
    const r = (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_1__.Router)({
        add: (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_1__.Router)(),
        edit: (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_1__.Router)(["id"], Object.assign(Object.assign({}, (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__.mapObject)(dm.editTabs, () => (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_1__.Router)())), { form: (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_1__.Router)() })),
    });
    return r;
}


/***/ }),

/***/ "./src/typerpc/input/AbstractInputHandler.ts":
/*!***************************************************!*\
  !*** ./src/typerpc/input/AbstractInputHandler.ts ***!
  \***************************************************/
/*! namespace exports */
/*! export AbstractInputHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractInputHandler": () => /* binding */ AbstractInputHandler
/* harmony export */ });
/* harmony import */ var _widget_AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../widget/AbstractWidgetHandler */ "./src/typerpc/widget/AbstractWidgetHandler.ts");
;
class AbstractInputHandler extends _widget_AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_0__.AbstractWidgetHandler {
    async getElement(state) {
        return Object.assign(Object.assign({}, (await this.getInputElement())), { value: await this.getValueElement(undefined) });
    }
    async handleCheck(data) {
        const result = await this.loadAndCheck(data);
        if ("error" in result) {
            return result.error;
        }
    }
}


/***/ }),

/***/ "./src/typerpc/input/AbstractInputView.tsx":
/*!*************************************************!*\
  !*** ./src/typerpc/input/AbstractInputView.tsx ***!
  \*************************************************/
/*! namespace exports */
/*! export AbstractInputView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractInputView": () => /* binding */ AbstractInputView
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_view_ViewState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../react/view/ViewState */ "./src/react/view/ViewState.ts");
/* harmony import */ var _widget_AbstractWidgetView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widget/AbstractWidgetView */ "./src/typerpc/widget/AbstractWidgetView.tsx");
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Input */ "./src/typerpc/input/Input.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
// TODO: AbstractInputView



// TODO: type InputView

class AbstractInputView extends _widget_AbstractWidgetView__WEBPACK_IMPORTED_MODULE_2__.AbstractWidgetView {
    get errorElement() {
        return this._errorElement;
    }
    get data() {
        return this._data;
    }
    get error() {
        return this._error;
    }
    get value() {
        return this._value;
    }
    async setValue(value) {
        var _a, _b, _c, _d, _e;
        if (this._isValidValue && this._value === value) {
            return;
        }
        this._value = value;
        this.isValidating = true;
        this._error = await ((_a = this.getError) === null || _a === void 0 ? void 0 : _a.call(this));
        this.isValidating = false;
        if (this._error != null) {
            (_c = (_b = this.props).onError) === null || _c === void 0 ? void 0 : _c.call(_b, this);
            return;
        }
        this._isValidValue = true;
        (_e = (_d = this.props).onChange) === null || _e === void 0 ? void 0 : _e.call(_d, this);
    }
    setError(error) {
        this._error = error;
    }
    updateElement(element) {
        this._value =
            this.props.value !== undefined ? this.props.value : element.value;
    }
    forceUpdateValue() {
        var _a;
        this._error = undefined;
        this._isValidValue = false;
        this._data = this.rpc.getValueDataFromElement(this._value);
        (_a = this.updateValue) === null || _a === void 0 ? void 0 : _a.call(this, this._value);
    }
    // TODO: ["children", { ... }]
    renderErrorElement() {
        var _a, _b, _c;
        const { error } = this;
        // TODO: use this.error
        if (error == null)
            return;
        const element = (_b = (_a = this.props).renderError) === null || _b === void 0 ? void 0 : _b.call(_a, error);
        if (element)
            return element;
        const errorMap = Object.assign(Object.assign({}, (_c = this.getErrorElementMap) === null || _c === void 0 ? void 0 : _c.call(this)), this.props.errorMap);
        const errorType = typeof error === "string"
            ? error
            : typeof error === "object" && typeof error.type === "string"
                ? error.type
                : undefined;
        const errorElementOrFn = errorMap[errorType];
        if (typeof errorElementOrFn === "function")
            return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, errorElementOrFn(typeof error === "object" ? error : undefined));
        if (errorElementOrFn)
            return errorElementOrFn;
    }
    forceUpdateError() {
        var _a, _b;
        this._errorElement =
            this._error != null ? this.renderErrorElement() : undefined;
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.updateError(this._error);
        (_b = this.updateError) === null || _b === void 0 ? void 0 : _b.call(this, this._error);
    }
    async validate() {
        var _a, _b, _c, _d;
        await ((_a = this.inputWillValidate) === null || _a === void 0 ? void 0 : _a.call(this));
        const error = (_c = (await ((_b = this.children) === null || _b === void 0 ? void 0 : _b.getError()))) !== null && _c !== void 0 ? _c : (await ((_d = this.getError) === null || _d === void 0 ? void 0 : _d.call(this)));
        return null == (this._error = error);
    }
    updateViewProps(prevProps, nextProps) {
        super.updateViewProps(prevProps, nextProps);
        if (nextProps.value !== prevProps.value) {
            this._value = nextProps.value;
        }
    }
    renderError() {
        if (this.errorElement)
            return this.errorElement;
        const { error } = this;
        if (typeof error === "string")
            return error;
        if (error != null)
            return JSON.stringify(error);
    }
    componentDidMount() {
        var _a, _b;
        super.componentDidMount();
        (_b = (_a = this.props).inputRef) === null || _b === void 0 ? void 0 : _b.call(_a, this);
    }
    componentWillUnmount() {
        var _a, _b;
        super.componentWillUnmount();
        (_b = (_a = this.props).inputRef) === null || _b === void 0 ? void 0 : _b.call(_a, null);
    }
}
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_1__.ViewState)("forceUpdateValue"),
    __metadata("design:type", Object)
], AbstractInputView.prototype, "_value", void 0);
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_1__.ViewState)("forceUpdateError"),
    __metadata("design:type", typeof (_b = typeof _Input__WEBPACK_IMPORTED_MODULE_3__.InputError !== "undefined" && _Input__WEBPACK_IMPORTED_MODULE_3__.InputError) === "function" ? _b : Object)
], AbstractInputView.prototype, "_error", void 0);
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_1__.ViewState)(),
    __metadata("design:type", Object)
], AbstractInputView.prototype, "_errorElement", void 0);
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_1__.ViewState)(),
    __metadata("design:type", Boolean)
], AbstractInputView.prototype, "isValidating", void 0);


/***/ }),

/***/ "./src/typerpc/input/Input.ts":
/*!************************************!*\
  !*** ./src/typerpc/input/Input.ts ***!
  \************************************/
/*! namespace exports */
/*! export Input [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Input": () => /* binding */ Input
/* harmony export */ });
/* harmony import */ var _common_object_mergeDescriptors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/object/mergeDescriptors */ "./src/common/object/mergeDescriptors.ts");
/* harmony import */ var _widget_Widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../widget/Widget */ "./src/typerpc/widget/Widget.ts");
// TODO: Rename to *Input
;

function Input(options) {
    const { props = {}, isGenericConfig, controller, handler, getValueDataFromElement, } = options;
    return (0,_widget_Widget__WEBPACK_IMPORTED_MODULE_1__.Widget)({
        props: (0,_common_object_mergeDescriptors__WEBPACK_IMPORTED_MODULE_0__.mergeDescriptors)(props, {
            inputOptions: options,
            getValueDataFromElement,
        }),
        controller,
        isGenericConfig,
        commands: { check: "handleCheck" },
        connection: {
            check: conn => data => conn.command("check", data),
        },
        handler,
    });
}


/***/ }),

/***/ "./src/typerpc/input/InputErrorHook.ts":
/*!*********************************************!*\
  !*** ./src/typerpc/input/InputErrorHook.ts ***!
  \*********************************************/
/*! namespace exports */
/*! export InputErrorHook [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InputErrorHookViewProps [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputErrorHook": () => /* binding */ InputErrorHook,
/* harmony export */   "InputErrorHookViewProps": () => /* binding */ InputErrorHookViewProps
/* harmony export */ });
const checkSymbol = Symbol();
function InputErrorHook() {
    return (input) => {
        return Object.setPrototypeOf({
            async resolveRpcConfig(config) {
                let check = undefined;
                if (config &&
                    typeof config === "object" &&
                    typeof config.$check === "function") {
                    check = config.$check;
                    config = config.$config;
                }
                config = await input.resolveRpcConfig.call(this, config);
                check && (config[checkSymbol] = check);
                return config;
            },
            async createRpcHandler(config) {
                const handler = await input.createRpcHandler.call(this, config);
                if (config[checkSymbol]) {
                    const { loadAndCheck } = handler;
                    handler.loadAndCheck = async function (data) {
                        const result = await loadAndCheck.call(this, data);
                        if ("error" in result)
                            return result;
                        const error = await config[checkSymbol](result.value);
                        if (error != null)
                            return { error, value: result.value };
                        return result;
                    };
                }
                return handler;
            },
        }, input);
    };
}
function InputErrorHookViewProps(props) {
    return props;
}


/***/ }),

/***/ "./src/typerpc/input/InputViewChildren.ts":
/*!************************************************!*\
  !*** ./src/typerpc/input/InputViewChildren.ts ***!
  \************************************************/
/*! namespace exports */
/*! export InputViewChildren [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputViewChildren": () => /* binding */ InputViewChildren
/* harmony export */ });
/* harmony import */ var _common_object_entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/object/entries */ "./src/common/object/entries.ts");
/* harmony import */ var _common_object_hasKeys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/object/hasKeys */ "./src/common/object/hasKeys.ts");
;

class InputViewChildren {
    constructor() {
        this.viewMap = {};
    }
    async updateError(error) {
        const errorMap = (typeof error === "object" && (error === null || error === void 0 ? void 0 : error.errorMap)) || {};
        for (const [key, view] of (0,_common_object_entries__WEBPACK_IMPORTED_MODULE_0__.entries)(this.viewMap)) {
            view.setError(errorMap[key]);
        }
    }
    ref(key) {
        return view => {
            if (view) {
                this.viewMap[key] = view;
            }
            else {
                delete this.viewMap[key];
            }
        };
    }
    async getError() {
        const errorMap = {};
        for (const [key, view] of (0,_common_object_entries__WEBPACK_IMPORTED_MODULE_0__.entries)(this.viewMap)) {
            await view.validate();
            const { error } = view;
            if (error != null) {
                errorMap[key] = error;
            }
        }
        if ((0,_common_object_hasKeys__WEBPACK_IMPORTED_MODULE_1__.hasKeys)(errorMap))
            return { type: "ERROR_MAP", errorMap };
    }
}


/***/ }),

/***/ "./src/typerpc/input/LengthError.ts":
/*!******************************************!*\
  !*** ./src/typerpc/input/LengthError.ts ***!
  \******************************************/
/*! namespace exports */
/*! export getLengthError [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLengthError": () => /* binding */ getLengthError
/* harmony export */ });
function getLengthError(value, { maxLength, minLength }) {
    if (maxLength && value.length > maxLength) {
        return { type: "MAX_LENGTH", maxLength };
    }
    if (minLength && value.length < minLength) {
        return { type: "MIN_LENGTH", minLength };
    }
}


/***/ }),

/***/ "./src/typerpc/input/ValueOrAwaitableFn.ts":
/*!*************************************************!*\
  !*** ./src/typerpc/input/ValueOrAwaitableFn.ts ***!
  \*************************************************/
/*! namespace exports */
/*! export ValueOrAwaitableFn [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValueOrAwaitableFn": () => /* binding */ ValueOrAwaitableFn
/* harmony export */ });
async function ValueOrAwaitableFn(value) {
    if (typeof value === "function") {
        return value();
    }
    return value;
}


/***/ }),

/***/ "./src/typerpc/input/bool-input/BoolInput.ts":
/*!***************************************************!*\
  !*** ./src/typerpc/input/bool-input/BoolInput.ts ***!
  \***************************************************/
/*! namespace exports */
/*! export BoolInput [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoolInput": () => /* binding */ BoolInput
/* harmony export */ });
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Input */ "./src/typerpc/input/Input.ts");
/* harmony import */ var _BoolInputHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoolInputHandler */ "./src/typerpc/input/bool-input/BoolInputHandler.ts");
;

function BoolInput() {
    return (0,_Input__WEBPACK_IMPORTED_MODULE_0__.Input)({
        handler: _BoolInputHandler__WEBPACK_IMPORTED_MODULE_1__.BoolInputHandler,
        getValueDataFromElement(value) {
            return value;
        },
    });
}


/***/ }),

/***/ "./src/typerpc/input/bool-input/BoolInputHandler.ts":
/*!**********************************************************!*\
  !*** ./src/typerpc/input/bool-input/BoolInputHandler.ts ***!
  \**********************************************************/
/*! namespace exports */
/*! export BoolInputHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoolInputHandler": () => /* binding */ BoolInputHandler
/* harmony export */ });
/* harmony import */ var _AbstractInputHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AbstractInputHandler */ "./src/typerpc/input/AbstractInputHandler.ts");
;
class BoolInputHandler extends _AbstractInputHandler__WEBPACK_IMPORTED_MODULE_0__.AbstractInputHandler {
    getValueFromConfig(valueConfig) {
        return valueConfig || false;
    }
    async getValueElement(value) {
        return Boolean(value);
    }
    getControllerConfig() {
        return undefined;
    }
    getInputElement() {
        return Promise.resolve({});
    }
    async loadAndCheck(valueData) {
        return { value: valueData !== null && valueData !== void 0 ? valueData : false };
    }
}


/***/ }),

/***/ "./src/typerpc/input/bool-input/BoolInputView.tsx":
/*!********************************************************!*\
  !*** ./src/typerpc/input/bool-input/BoolInputView.tsx ***!
  \********************************************************/
/*! namespace exports */
/*! export BoolInputView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoolInputView": () => /* binding */ BoolInputView
/* harmony export */ });
/* harmony import */ var _AbstractInputView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AbstractInputView */ "./src/typerpc/input/AbstractInputView.tsx");
;
class BoolInputView extends _AbstractInputView__WEBPACK_IMPORTED_MODULE_0__.AbstractInputView {
    renderView() {
        return this.props.children(this);
    }
}


/***/ }),

/***/ "./src/typerpc/input/data-input-map/DataInputMap.ts":
/*!**********************************************************!*\
  !*** ./src/typerpc/input/data-input-map/DataInputMap.ts ***!
  \**********************************************************/
/*! namespace exports */
/*! export DataInputMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataInputMap": () => /* binding */ DataInputMap
/* harmony export */ });
/* harmony import */ var _common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/object/mapObject */ "./src/common/object/mapObject.ts");
/* harmony import */ var _rpc_parameter_RpcParameter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../rpc-parameter/RpcParameter */ "./src/typerpc/rpc-parameter/RpcParameter.ts");
/* harmony import */ var _rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../rpc-map/RpcMap */ "./src/typerpc/rpc-map/RpcMap.ts");
/* harmony import */ var _widget_data_table_DataTable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../widget/data-table/DataTable */ "./src/typerpc/widget/data-table/DataTable.ts");
/* harmony import */ var _widget_Row__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../widget/Row */ "./src/typerpc/widget/Row.ts");
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Input */ "./src/typerpc/input/Input.ts");
/* harmony import */ var _DataInputMapHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DataInputMapHandler */ "./src/typerpc/input/data-input-map/DataInputMapHandler.ts");
;






function DataInputMap(target, options) {
    const table = (0,_widget_data_table_DataTable__WEBPACK_IMPORTED_MODULE_3__.DataTable)((options === null || options === void 0 ? void 0 : options.tableRowType) || { label: _widget_Row__WEBPACK_IMPORTED_MODULE_4__.string });
    return (0,_Input__WEBPACK_IMPORTED_MODULE_5__.Input)({
        props: {
            target,
            table,
        },
        handler: _DataInputMapHandler__WEBPACK_IMPORTED_MODULE_6__.DataInputMapHandler,
        isGenericConfig: true,
        controller: (0,_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_2__.RpcMap)({
            table: table,
            target: target,
            getRowController: (0,_rpc_parameter_RpcParameter__WEBPACK_IMPORTED_MODULE_1__.RpcParameter)(String, target),
        }),
        getValueDataFromElement(valueMap) {
            return (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__.mapObject)(valueMap, item => this.target.getValueDataFromElement(item.$value));
        },
    });
}


/***/ }),

/***/ "./src/typerpc/input/data-input-map/DataInputMapHandler.ts":
/*!*****************************************************************!*\
  !*** ./src/typerpc/input/data-input-map/DataInputMapHandler.ts ***!
  \*****************************************************************/
/*! namespace exports */
/*! export DataInputMapHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataInputMapHandler": () => /* binding */ DataInputMapHandler
/* harmony export */ });
/* harmony import */ var _common_object_hasKeys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/object/hasKeys */ "./src/common/object/hasKeys.ts");
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Rpc */ "./src/typerpc/Rpc.ts");
/* harmony import */ var _AbstractInputHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AbstractInputHandler */ "./src/typerpc/input/AbstractInputHandler.ts");
;


class DataInputMapHandler extends _AbstractInputHandler__WEBPACK_IMPORTED_MODULE_2__.AbstractInputHandler {
    getValueFromConfig(valueConfig) {
        return {};
    }
    getControllerConfig() {
        return {
            table: $ => $(Object.assign(Object.assign({}, this.config.tableConfig), { source: this.config.source, columns: this.config.columns })),
            target: this.config.targetConfig,
            getRowController: $ => $({
                load: async (key) => {
                    if (!(await this.config.source.filter({ $is: String(key) }).hasRow())) {
                        throw new _Rpc__WEBPACK_IMPORTED_MODULE_1__.RpcError(`No have a key "${key}".`);
                    }
                    return key;
                },
                getTargetConfig: $ => $(this.config.targetConfig),
            }),
        };
    }
    async getInputElement() {
        return {
            target: await this.controller
                .then(c => c.getTargetHandler("target"))
                .then(c => c.getElement(undefined)),
        };
    }
    async getValueElement(valueMap) {
        var _a;
        const { table, target } = await this.controller.then(async (c) => ({
            table: await c.getTargetHandler("table"),
            target: await c.getTargetHandler("target"),
        }));
        let elementMap = {};
        for (const dataRow of await this.config.source.getRows()) {
            const value = (_a = valueMap === null || valueMap === void 0 ? void 0 : valueMap[dataRow.$key]) !== null && _a !== void 0 ? _a : (await this.config.getTargetValue(dataRow));
            elementMap[dataRow.$key] = Object.assign(Object.assign({}, (await table.loadRow(dataRow, true))), { $value: await target.getValueElement(value) });
        }
        return elementMap;
    }
    async loadAndCheck(dataMap) {
        // if (!dataMap) dataMap = {};
        const keys = Object.keys(dataMap);
        if (!keys.length)
            return { value: {} };
        let errorMap = {};
        let valueMap = {};
        const invalidKeys = new Set(keys);
        const target = await this.controller.then(c => c.getTargetHandler("target"));
        for (const row of await this.config.source
            .filter({ $is: keys })
            .getRows()) {
            invalidKeys.delete(row.$key);
            const result = await target.loadAndCheck(dataMap[row.$key]);
            if ("error" in result) {
                errorMap[row.$key] = result.error;
            }
            if (result.value !== undefined) {
                valueMap[row.$key] = result.value;
            }
        }
        if (invalidKeys.size) {
            return {
                error: { type: "INVALID_KEYS", invalidKeys: [...invalidKeys] },
                value: valueMap,
            };
        }
        if ((0,_common_object_hasKeys__WEBPACK_IMPORTED_MODULE_0__.hasKeys)(errorMap))
            return { error: { type: "ERROR_MAP", errorMap }, value: valueMap };
        return { value: valueMap };
    }
}


/***/ }),

/***/ "./src/typerpc/input/data-input-map/DataInputMapView.ts":
/*!**************************************************************!*\
  !*** ./src/typerpc/input/data-input-map/DataInputMapView.ts ***!
  \**************************************************************/
/*! namespace exports */
/*! export DataInputMapView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataInputMapView": () => /* binding */ DataInputMapView
/* harmony export */ });
/* harmony import */ var _common_object_hasKeys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/object/hasKeys */ "./src/common/object/hasKeys.ts");
/* harmony import */ var _common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/object/mapObjectToArray */ "./src/common/object/mapObjectToArray.ts");
/* harmony import */ var _AbstractInputView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AbstractInputView */ "./src/typerpc/input/AbstractInputView.tsx");
/* harmony import */ var _InputViewChildren__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../InputViewChildren */ "./src/typerpc/input/InputViewChildren.ts");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};




class DataInputMapView extends _AbstractInputView__WEBPACK_IMPORTED_MODULE_2__.AbstractInputView {
    constructor() {
        super(...arguments);
        this.children = new _InputViewChildren__WEBPACK_IMPORTED_MODULE_3__.InputViewChildren();
    }
    renderView() {
        var _a, _b;
        if (!(0,_common_object_hasKeys__WEBPACK_IMPORTED_MODULE_0__.hasKeys)(this.value)) {
            return (_b = (_a = this.props).renderNoKeys) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        return (0,_common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_1__.mapObjectToArray)(this.value || {}, (_a, key, index) => {
            var { $value } = _a, row = __rest(_a, ["$value"]);
            return this.props.target({
                row,
                index,
                key,
                props: {
                    key,
                    value: $value,
                    elementState: undefined,
                    onElementStateChange: undefined,
                    onChange: view => this.setValue(Object.assign(Object.assign({}, this.value), { [key]: Object.assign(Object.assign({}, row), { $value: view.value }) })),
                    connection: this.controller.getRowController(key),
                    element: this.element.target,
                    inputRef: this.children.ref(key),
                },
            });
        });
    }
}


/***/ }),

/***/ "./src/typerpc/input/data-input/DataInput.ts":
/*!***************************************************!*\
  !*** ./src/typerpc/input/data-input/DataInput.ts ***!
  \***************************************************/
/*! namespace exports */
/*! export DataInput [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataInput": () => /* binding */ DataInput
/* harmony export */ });
/* harmony import */ var _widget_data_table_DataTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../widget/data-table/DataTable */ "./src/typerpc/widget/data-table/DataTable.ts");
/* harmony import */ var _widget_Row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../widget/Row */ "./src/typerpc/widget/Row.ts");
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Input */ "./src/typerpc/input/Input.ts");
/* harmony import */ var _DataInputHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DataInputHandler */ "./src/typerpc/input/data-input/DataInputHandler.ts");
;



function DataInput(options = {}) {
    var _a;
    const table = (0,_widget_data_table_DataTable__WEBPACK_IMPORTED_MODULE_0__.DataTable)(options.tableRowType || { label: _widget_Row__WEBPACK_IMPORTED_MODULE_1__.string });
    return (0,_Input__WEBPACK_IMPORTED_MODULE_2__.Input)({
        props: {
            nullable: (_a = options.nullable) !== null && _a !== void 0 ? _a : false,
            table,
            isValueDataRow: !!options.loadType,
        },
        isGenericConfig: true,
        controller: table,
        handler: _DataInputHandler__WEBPACK_IMPORTED_MODULE_3__.DataInputHandler,
        getValueDataFromElement(value) {
            return value === null || value === void 0 ? void 0 : value.$key;
        },
    });
}
// DataInput({
//    tableRow: {}
//    row: Typing<User>()
// })


/***/ }),

/***/ "./src/typerpc/input/data-input/DataInputHandler.ts":
/*!**********************************************************!*\
  !*** ./src/typerpc/input/data-input/DataInputHandler.ts ***!
  \**********************************************************/
/*! namespace exports */
/*! export DataInputHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataInputHandler": () => /* binding */ DataInputHandler
/* harmony export */ });
/* harmony import */ var _nullable_input_AbstractNullableInputHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../nullable-input/AbstractNullableInputHandler */ "./src/typerpc/input/nullable-input/AbstractNullableInputHandler.ts");
/* harmony import */ var _ValueOrAwaitableFn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ValueOrAwaitableFn */ "./src/typerpc/input/ValueOrAwaitableFn.ts");
;

class DataInputHandler extends _nullable_input_AbstractNullableInputHandler__WEBPACK_IMPORTED_MODULE_0__.AbstractNullableInputHandler {
    getControllerConfig() {
        return $ => $(Object.assign(Object.assign({}, this.config.tableConfig), { source: this.config.source, columns: this.config.columns }));
    }
    getInputElement() {
        return Promise.resolve({});
    }
    async getValueFromConfig(valueConfig) {
        valueConfig = await (0,_ValueOrAwaitableFn__WEBPACK_IMPORTED_MODULE_1__.ValueOrAwaitableFn)(valueConfig);
        if (!valueConfig) {
            return;
        }
        if (this.rpc.isValueDataRow) {
            if (typeof valueConfig === "string") {
                return await this.valueSource.get(valueConfig);
            }
            return valueConfig;
        }
        return typeof valueConfig === "object" //
            ? valueConfig.$key
            : valueConfig;
    }
    get valueSource() {
        return this.config.valueSource || this.config.source;
    }
    async getValueElement(value) {
        if (!value)
            return undefined;
        let dataRow = undefined;
        if (typeof value === "object") {
            if (!this.config.valueSource) {
                dataRow = value;
            }
            else if (typeof value.$key === "string") {
                dataRow = await this.config.source.get(value.$key);
            }
        }
        else if (typeof value === "string") {
            dataRow = await this.config.source.get(value);
        }
        return dataRow && (await (await this.controller).loadRow(dataRow));
    }
    async loadAndCheckNotNull(key) {
        if (this.rpc.isValueDataRow) {
            const row = await this.valueSource.get(String(key));
            if (!row) {
                return { error: "INVALID_DATA_KEY", value: undefined };
            }
            return { value: row };
        }
        if (!(await this.config.source.filter({ $is: key }).hasRow())) {
            return { error: "INVALID_DATA_KEY", value: undefined };
        }
        return { value: key };
    }
}


/***/ }),

/***/ "./src/typerpc/input/data-input/DataInputView.ts":
/*!*******************************************************!*\
  !*** ./src/typerpc/input/data-input/DataInputView.ts ***!
  \*******************************************************/
/*! namespace exports */
/*! export DataInputView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataInputView": () => /* binding */ DataInputView
/* harmony export */ });
/* harmony import */ var _nullable_input_NullableInputView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../nullable-input/NullableInputView */ "./src/typerpc/input/nullable-input/NullableInputView.ts");
;
class DataInputView extends _nullable_input_NullableInputView__WEBPACK_IMPORTED_MODULE_0__.NullableInputView {
}


/***/ }),

/***/ "./src/typerpc/input/input-map/InputMap.ts":
/*!*************************************************!*\
  !*** ./src/typerpc/input/input-map/InputMap.ts ***!
  \*************************************************/
/*! namespace exports */
/*! export InputMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputMap": () => /* binding */ InputMap
/* harmony export */ });
/* harmony import */ var _common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/object/mapObject */ "./src/common/object/mapObject.ts");
/* harmony import */ var _rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../rpc-map/RpcMap */ "./src/typerpc/rpc-map/RpcMap.ts");
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Input */ "./src/typerpc/input/Input.ts");
/* harmony import */ var _InputMapHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InputMapHandler */ "./src/typerpc/input/input-map/InputMapHandler.ts");
;



//
function InputMap(targetMap) {
    return (0,_Input__WEBPACK_IMPORTED_MODULE_2__.Input)({
        props: {
            targetMap,
        },
        controller: (0,_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_1__.RpcMap)(targetMap),
        handler: _InputMapHandler__WEBPACK_IMPORTED_MODULE_3__.InputMapHandler,
        getValueDataFromElement(valueElementMap) {
            return (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__.mapObject)(this.targetMap, (target, key) => {
                return target.getValueDataFromElement(valueElementMap[key]);
            });
        },
    });
}


/***/ }),

/***/ "./src/typerpc/input/input-map/InputMapHandler.ts":
/*!********************************************************!*\
  !*** ./src/typerpc/input/input-map/InputMapHandler.ts ***!
  \********************************************************/
/*! namespace exports */
/*! export InputMapHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputMapHandler": () => /* binding */ InputMapHandler
/* harmony export */ });
/* harmony import */ var _common_object_hasKeys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/object/hasKeys */ "./src/common/object/hasKeys.ts");
/* harmony import */ var _common_object_mapObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/object/mapObject */ "./src/common/object/mapObject.ts");
/* harmony import */ var _AbstractInputHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AbstractInputHandler */ "./src/typerpc/input/AbstractInputHandler.ts");
;


class InputMapHandler extends _AbstractInputHandler__WEBPACK_IMPORTED_MODULE_2__.AbstractInputHandler {
    getControllerConfig() {
        return this.config;
    }
    getValueElement(value) {
        return (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_1__.mapObjectAsync)(this.rpc.targetMap, (target, key) => this.controller
            .then(c => c.getTargetHandler(key))
            .then(h => h.getValueElement(value === null || value === void 0 ? void 0 : value[key])));
    }
    async getInputElement() {
        return {
            elementMap: await (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_1__.mapObjectAsync)(this.rpc.targetMap, (target, key) => this.controller
                .then(c => c.getTargetHandler(key))
                .then(h => h.getInputElement())),
        };
    }
    async getValueFromConfig(valueConfig) {
        return (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_1__.mapObjectAsync)(this.rpc.targetMap, (target, key) => {
            return this.controller
                .then(c => c.getTargetHandler(key))
                .then(h => h.getValueFromConfig(valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig[key]));
        });
    }
    async loadAndCheck(dataMap) {
        const errorMap = {};
        const valueMap = await (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_1__.mapObjectAsync)(this.rpc.targetMap, (target, key) => this.controller
            .then(c => c.getTargetHandler(key))
            .then(h => h.loadAndCheck(dataMap[key]))
            .then(result => {
            if ("error" in result) {
                errorMap[key] = result.error;
            }
            return result.value;
        }));
        if ((0,_common_object_hasKeys__WEBPACK_IMPORTED_MODULE_0__.hasKeys)(errorMap)) {
            return { value: valueMap, error: { type: "ERROR_MAP", errorMap } };
        }
        return { value: valueMap };
    }
}


/***/ }),

/***/ "./src/typerpc/input/input-map/InputMapView.tsx":
/*!******************************************************!*\
  !*** ./src/typerpc/input/input-map/InputMapView.tsx ***!
  \******************************************************/
/*! namespace exports */
/*! export InputMapView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputMapView": () => /* binding */ InputMapView
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_object_mapObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/object/mapObject */ "./src/common/object/mapObject.ts");
/* harmony import */ var _common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/object/mapObjectToArray */ "./src/common/object/mapObjectToArray.ts");
/* harmony import */ var _AbstractInputView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AbstractInputView */ "./src/typerpc/input/AbstractInputView.tsx");
/* harmony import */ var _InputViewChildren__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../InputViewChildren */ "./src/typerpc/input/InputViewChildren.ts");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};






class InputMapView extends _AbstractInputView__WEBPACK_IMPORTED_MODULE_3__.AbstractInputView {
    constructor() {
        super(...arguments);
        this.children = new _InputViewChildren__WEBPACK_IMPORTED_MODULE_4__.InputViewChildren();
    }
    getProps(key) {
        var _a;
        return {
            key,
            connection: this.controller[key],
            element: this.element.elementMap[key],
            elementState: undefined,
            onElementStateChange: undefined,
            value: (_a = this.value) === null || _a === void 0 ? void 0 : _a[key],
            onError: view => { var _a, _b; return (_b = (_a = this.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, this); },
            onChange: view => this.setValue(Object.assign(Object.assign({}, this.value), { [key]: view.value })),
            inputRef: this.children.ref(key),
        };
    }
    renderView() {
        return this.props.children(this.getProps.bind(this), this);
    }
}
(function (InputMapView) {
    function Fields(_a) {
        var { children, fields: keyToRenderer } = _a, props = __rest(_a, ["children", "fields"]);
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(InputMapView, Object.assign({}, props, { children: (getProps, view) => {
                if (typeof children === "function") {
                    return children({
                        view,
                        fields: (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_1__.mapObject)(keyToRenderer, (render, key) => {
                            return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, { key }, render(getProps(key)));
                        }),
                    });
                }
                return (0,_common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_2__.mapObjectToArray)(keyToRenderer, (render, key) => {
                    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, { key }, render(getProps(key)));
                });
            } })));
    }
    InputMapView.Fields = Fields;
})(InputMapView || (InputMapView = {}));


/***/ }),

/***/ "./src/typerpc/input/nullable-input/AbstractNullableInputHandler.ts":
/*!**************************************************************************!*\
  !*** ./src/typerpc/input/nullable-input/AbstractNullableInputHandler.ts ***!
  \**************************************************************************/
/*! namespace exports */
/*! export AbstractNullableInputHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractNullableInputHandler": () => /* binding */ AbstractNullableInputHandler
/* harmony export */ });
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Rpc */ "./src/typerpc/Rpc.ts");
/* harmony import */ var _AbstractInputHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AbstractInputHandler */ "./src/typerpc/input/AbstractInputHandler.ts");
;

class AbstractNullableInputHandler extends _AbstractInputHandler__WEBPACK_IMPORTED_MODULE_1__.AbstractInputHandler {
    async loadAndCheck(valueData) {
        if (valueData == null) {
            if (!this.rpc.nullable) {
                return { error: "NOT_NULLABLE", value: undefined };
            }
            return { value: null };
        }
        const result = await this.loadAndCheckNotNull(valueData);
        if ("error" in result)
            return result;
        if (result.value == null) {
            if (!this.rpc.nullable) {
                throw new _Rpc__WEBPACK_IMPORTED_MODULE_0__.RpcError(`value is null`);
            }
        }
        return result;
    }
}


/***/ }),

/***/ "./src/typerpc/input/nullable-input/NullableInputView.ts":
/*!***************************************************************!*\
  !*** ./src/typerpc/input/nullable-input/NullableInputView.ts ***!
  \***************************************************************/
/*! namespace exports */
/*! export NullableInputView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NullableInputView": () => /* binding */ NullableInputView
/* harmony export */ });
/* harmony import */ var _AbstractInputView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AbstractInputView */ "./src/typerpc/input/AbstractInputView.tsx");
;
class NullableInputView extends _AbstractInputView__WEBPACK_IMPORTED_MODULE_0__.AbstractInputView {
    getError() {
        if (!this.rpc.nullable) {
            if (this.value == null) {
                return "NOT_NULLABLE";
            }
        }
    }
    renderView() {
        return this.props.children(this);
    }
}
// TOOD: InputView


/***/ }),

/***/ "./src/typerpc/input/text-input/TextInput.ts":
/*!***************************************************!*\
  !*** ./src/typerpc/input/text-input/TextInput.ts ***!
  \***************************************************/
/*! namespace exports */
/*! export TextInput [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextInput": () => /* binding */ TextInput
/* harmony export */ });
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Input */ "./src/typerpc/input/Input.ts");
/* harmony import */ var _TextInputHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextInputHandler */ "./src/typerpc/input/text-input/TextInputHandler.ts");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};


function TextInput(_a = {}) {
    var { nullable } = _a, loaderOptions = __rest(_a, ["nullable"]);
    return (0,_Input__WEBPACK_IMPORTED_MODULE_0__.Input)({
        handler: _TextInputHandler__WEBPACK_IMPORTED_MODULE_1__.TextInputHandler,
        props: {
            nullable: nullable || false,
            loaderOptions,
        },
        getValueDataFromElement(value) {
            return value;
        },
    });
}


/***/ }),

/***/ "./src/typerpc/input/text-input/TextInputHandler.ts":
/*!**********************************************************!*\
  !*** ./src/typerpc/input/text-input/TextInputHandler.ts ***!
  \**********************************************************/
/*! namespace exports */
/*! export TextInputHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextInputHandler": () => /* binding */ TextInputHandler
/* harmony export */ });
/* harmony import */ var _common_patterns_lazy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/patterns/lazy */ "./src/common/patterns/lazy.ts");
/* harmony import */ var _AbstractInputHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AbstractInputHandler */ "./src/typerpc/input/AbstractInputHandler.ts");
/* harmony import */ var _TextInputLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TextInputLoader */ "./src/typerpc/input/text-input/TextInputLoader.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;



class TextInputHandler extends _AbstractInputHandler__WEBPACK_IMPORTED_MODULE_1__.AbstractInputHandler {
    async getValueElement(value) {
        return value !== null && value !== void 0 ? value : "";
    }
    getControllerConfig() {
        return undefined;
    }
    get loaderOptions() {
        return Object.assign(Object.assign({}, this.rpc.loaderOptions), this.config);
    }
    async getInputElement() {
        var _a;
        return {
            minLength: this.loaderOptions.minLength,
            maxLength: this.loaderOptions.maxLength,
            pattern: (_a = this.loaderOptions.pattern) === null || _a === void 0 ? void 0 : _a.source,
            trim: this.loaderOptions.trim,
            required: this.loaderOptions.required,
        };
    }
    async loadAndCheck(valueData) {
        const value = await _TextInputLoader__WEBPACK_IMPORTED_MODULE_2__.TextInputLoader.load(this.config, valueData);
        const error = _TextInputLoader__WEBPACK_IMPORTED_MODULE_2__.TextInputLoader.check(this.config, valueData);
        if (error !== undefined)
            return { error, value };
        if (!value && this.rpc.nullable) {
            return { value: null };
        }
        return { value };
    }
    getValueFromConfig(valueConfig) {
        return valueConfig || "";
    }
}
__decorate([
    (0,_common_patterns_lazy__WEBPACK_IMPORTED_MODULE_0__.Lazy)(),
    __metadata("design:type", typeof (_a = typeof _TextInputLoader__WEBPACK_IMPORTED_MODULE_2__.TextLoaderOptions !== "undefined" && _TextInputLoader__WEBPACK_IMPORTED_MODULE_2__.TextLoaderOptions) === "function" ? _a : Object),
    __metadata("design:paramtypes", [])
], TextInputHandler.prototype, "loaderOptions", null);


/***/ }),

/***/ "./src/typerpc/input/text-input/TextInputLoader.ts":
/*!*********************************************************!*\
  !*** ./src/typerpc/input/text-input/TextInputLoader.ts ***!
  \*********************************************************/
/*! namespace exports */
/*! export TextInputLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextInputLoader": () => /* binding */ TextInputLoader
/* harmony export */ });
/* harmony import */ var _LengthError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../LengthError */ "./src/typerpc/input/LengthError.ts");
;
var TextInputLoader;
(function (TextInputLoader) {
    function load(options, value) {
        if (options.trim) {
            value = value.trim();
        }
        return value;
    }
    TextInputLoader.load = load;
    function check({ required, pattern, minLength, maxLength }, value) {
        if (!value) {
            if (required)
                return "REQUIRED";
            return;
        }
        if (pattern && !pattern.test(value)) {
            return { type: "INVALID_PATTERN", pattern: pattern.source };
        }
        const lengthError = (0,_LengthError__WEBPACK_IMPORTED_MODULE_0__.getLengthError)(value, { maxLength, minLength });
        if (lengthError)
            return lengthError;
    }
    TextInputLoader.check = check;
})(TextInputLoader || (TextInputLoader = {}));


/***/ }),

/***/ "./src/typerpc/input/text-input/TextInputView.ts":
/*!*******************************************************!*\
  !*** ./src/typerpc/input/text-input/TextInputView.ts ***!
  \*******************************************************/
/*! namespace exports */
/*! export TextInputView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextInputView": () => /* binding */ TextInputView
/* harmony export */ });
/* harmony import */ var _common_async_Timeout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/async/Timeout */ "./src/common/async/Timeout.ts");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _react_view_ViewState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../react/view/ViewState */ "./src/react/view/ViewState.ts");
/* harmony import */ var _AbstractInputView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AbstractInputView */ "./src/typerpc/input/AbstractInputView.tsx");
/* harmony import */ var _TextInputLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TextInputLoader */ "./src/typerpc/input/text-input/TextInputLoader.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





class TextInputView extends _AbstractInputView__WEBPACK_IMPORTED_MODULE_3__.AbstractInputView {
    constructor() {
        super(...arguments);
        this.debounceId = 0;
    }
    updateValue(value) {
        this._text = value || "";
    }
    get text() {
        return this._text;
    }
    updateElement(element) {
        super.updateElement(element);
        this._options = Object.assign(Object.assign({}, element), { pattern: element.pattern ? new RegExp(element.pattern) : undefined });
    }
    getError() {
        return _TextInputLoader__WEBPACK_IMPORTED_MODULE_4__.TextInputLoader.check(this._options, this.value || "");
    }
    async setValue(value) {
        return super.setValue((this._text = _TextInputLoader__WEBPACK_IMPORTED_MODULE_4__.TextInputLoader.load(this._options, value)));
    }
    inputWillValidate() {
        this.debounceId++;
        return this.setValue(this.text);
    }
    async setText(text) {
        if (this._text === text)
            return;
        const id = ++this.debounceId;
        this._text = text;
        this.setError(undefined);
        await (0,_common_async_Timeout__WEBPACK_IMPORTED_MODULE_0__.Timeout)(300);
        if (id !== this.debounceId)
            return;
        await this.setValue(text);
    }
    getErrorElementMap() {
        return {
            INVALID_PATTERN: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `EXPECTED_TO_PATTERN_${"pattern"}`,
            REQUIRED: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `REQUIRED`,
            MAX_LENGTH: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `REQUIRED_MAXIMUM_${"maxLength"}`,
            MIN_LENGTH: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `REQUIRED_MINIMUM_${"minLength"}`,
        };
    }
    renderView() {
        return this.props.children(this);
    }
}
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_2__.ViewState)(),
    __metadata("design:type", String)
], TextInputView.prototype, "_text", void 0);


/***/ }),

/***/ "./src/typerpc/rpc-fn/RpcFn.ts":
/*!*************************************!*\
  !*** ./src/typerpc/rpc-fn/RpcFn.ts ***!
  \*************************************/
/*! namespace exports */
/*! export RpcFn [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RpcFn": () => /* binding */ RpcFn
/* harmony export */ });
/* harmony import */ var _RpcFnHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RpcFnHandler */ "./src/typerpc/rpc-fn/RpcFnHandler.ts");
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Rpc */ "./src/typerpc/Rpc.ts");
;

function RpcFn() {
    return (0,_Rpc__WEBPACK_IMPORTED_MODULE_1__.Rpc)({
        isGenericConfig: false,
        isConfigFn: true,
        handler: _RpcFnHandler__WEBPACK_IMPORTED_MODULE_0__.RpcFnHandler,
        connect(handler) {
            return async (...args) => await handler(args);
        },
    });
}


/***/ }),

/***/ "./src/typerpc/rpc-fn/RpcFnHandler.ts":
/*!********************************************!*\
  !*** ./src/typerpc/rpc-fn/RpcFnHandler.ts ***!
  \********************************************/
/*! namespace exports */
/*! export RpcFnHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RpcFnHandler": () => /* binding */ RpcFnHandler
/* harmony export */ });
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Rpc */ "./src/typerpc/Rpc.ts");
;
class RpcFnHandler extends _Rpc__WEBPACK_IMPORTED_MODULE_0__.AbstractRpcHandler {
    handle(payload) {
        return this.config(...payload);
    }
}


/***/ }),

/***/ "./src/typerpc/rpc-map/RpcMap.ts":
/*!***************************************!*\
  !*** ./src/typerpc/rpc-map/RpcMap.ts ***!
  \***************************************/
/*! namespace exports */
/*! export RpcMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RpcMap": () => /* binding */ RpcMap
/* harmony export */ });
/* harmony import */ var _common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/object/mapObject */ "./src/common/object/mapObject.ts");
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Rpc */ "./src/typerpc/Rpc.ts");
/* harmony import */ var _RpcMapHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RpcMapHandler */ "./src/typerpc/rpc-map/RpcMapHandler.ts");
;


function RpcMap(targetMap) {
    return (0,_Rpc__WEBPACK_IMPORTED_MODULE_1__.Rpc)({
        props: {
            targetMap: targetMap,
        },
        handler: _RpcMapHandler__WEBPACK_IMPORTED_MODULE_2__.RpcMapHandler,
        connect(handler) {
            return (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__.mapObject)(this.targetMap, (target, key) => {
                try {
                    return target.createRpcConnection(payload => handler([key, payload]));
                }
                catch (error) {
                    if (error instanceof _Rpc__WEBPACK_IMPORTED_MODULE_1__.RpcError) {
                        throw new _Rpc__WEBPACK_IMPORTED_MODULE_1__.RpcError(`at key:${key}, ${error.message}`);
                    }
                    throw error;
                }
            });
        },
    });
}


/***/ }),

/***/ "./src/typerpc/rpc-map/RpcMapHandler.ts":
/*!**********************************************!*\
  !*** ./src/typerpc/rpc-map/RpcMapHandler.ts ***!
  \**********************************************/
/*! namespace exports */
/*! export RpcMapHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RpcMapHandler": () => /* binding */ RpcMapHandler
/* harmony export */ });
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Rpc */ "./src/typerpc/Rpc.ts");
;
class RpcMapHandler extends _Rpc__WEBPACK_IMPORTED_MODULE_0__.AbstractRpcHandler {
    handle([key, payload]) {
        return this.getTargetHandler(key).then(c => c.handle(payload));
    }
    async getTargetHandler(key) {
        try {
            return await this.rpc.targetMap[key].resolveRpcHandler(this.config[key]);
        }
        catch (error) {
            if (error instanceof _Rpc__WEBPACK_IMPORTED_MODULE_0__.RpcError) {
                throw new _Rpc__WEBPACK_IMPORTED_MODULE_0__.RpcError(`At key:${key}, ${error.message}`);
            }
            throw error;
        }
    }
}


/***/ }),

/***/ "./src/typerpc/rpc-parameter/RpcParameter.ts":
/*!***************************************************!*\
  !*** ./src/typerpc/rpc-parameter/RpcParameter.ts ***!
  \***************************************************/
/*! namespace exports */
/*! export RpcParameter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RpcParameter": () => /* binding */ RpcParameter
/* harmony export */ });
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Rpc */ "./src/typerpc/Rpc.ts");
/* harmony import */ var _RpcParameterHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RpcParameterHandler */ "./src/typerpc/rpc-parameter/RpcParameterHandler.ts");
;

// TODO: ParameterTypeRef
function RpcParameter(dataType, target) {
    return (0,_Rpc__WEBPACK_IMPORTED_MODULE_0__.Rpc)({
        isGenericConfig: false,
        isConfigFn: true,
        handler: _RpcParameterHandler__WEBPACK_IMPORTED_MODULE_1__.RpcParameterHandler,
        props: { parameterTarget: target, parameterDataType: dataType },
        connect(handler) {
            return data => this.parameterTarget.createRpcConnection(payload => handler([data, payload]));
        },
    });
}


/***/ }),

/***/ "./src/typerpc/rpc-parameter/RpcParameterHandler.ts":
/*!**********************************************************!*\
  !*** ./src/typerpc/rpc-parameter/RpcParameterHandler.ts ***!
  \**********************************************************/
/*! namespace exports */
/*! export RpcParameterHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RpcParameterHandler": () => /* binding */ RpcParameterHandler
/* harmony export */ });
/* harmony import */ var _ConfigFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ConfigFactory */ "./src/typerpc/ConfigFactory.ts");
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Rpc */ "./src/typerpc/Rpc.ts");
;

class RpcParameterHandler extends _Rpc__WEBPACK_IMPORTED_MODULE_1__.AbstractRpcHandler {
    async handle([data, payload]) {
        const value = await this.rpc.parameterDataType(data);
        const configForValue = await (0,_ConfigFactory__WEBPACK_IMPORTED_MODULE_0__.ConfigFactory)(this.config, value);
        return this.rpc.parameterTarget
            .resolveRpcHandler(configForValue)
            .then(c => c.handle(payload));
    }
}


/***/ }),

/***/ "./src/typerpc/widget/AbstractWidgetHandler.ts":
/*!*****************************************************!*\
  !*** ./src/typerpc/widget/AbstractWidgetHandler.ts ***!
  \*****************************************************/
/*! namespace exports */
/*! export AbstractWidgetHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractWidgetHandler": () => /* binding */ AbstractWidgetHandler
/* harmony export */ });
/* harmony import */ var _common_patterns_lazy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/patterns/lazy */ "./src/common/patterns/lazy.ts");
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Rpc */ "./src/typerpc/Rpc.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;


class AbstractWidgetHandler extends _Rpc__WEBPACK_IMPORTED_MODULE_1__.AbstractRpcHandler {
    get controller() {
        return this.rpc.widget.controller.resolveRpcHandler(this.getControllerConfig());
    }
    async handle([key, payload]) {
        switch (key) {
            case "getElement":
                return this.getElement(payload);
            case "controller":
                return this.controller.then(handler => handler.handle(payload));
            default:
                const handler = this.rpc.widget.commands[key];
                if (!handler) {
                    throw new Error(`No command handler for "${key}".`);
                }
                return this[handler](...payload);
        }
    }
}
__decorate([
    (0,_common_patterns_lazy__WEBPACK_IMPORTED_MODULE_0__.Lazy)(),
    __metadata("design:type", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object),
    __metadata("design:paramtypes", [])
], AbstractWidgetHandler.prototype, "controller", null);


/***/ }),

/***/ "./src/typerpc/widget/AbstractWidgetView.tsx":
/*!***************************************************!*\
  !*** ./src/typerpc/widget/AbstractWidgetView.tsx ***!
  \***************************************************/
/*! namespace exports */
/*! export AbstractWidgetView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractWidgetView": () => /* binding */ AbstractWidgetView
/* harmony export */ });
/* harmony import */ var _react_view_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../react/view/View */ "./src/react/view/View.ts");
/* harmony import */ var _react_view_ViewState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../react/view/ViewState */ "./src/react/view/ViewState.ts");
/* harmony import */ var _Widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Widget */ "./src/typerpc/widget/Widget.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;



class AbstractWidgetView extends _react_view_View__WEBPACK_IMPORTED_MODULE_0__.View {
    constructor(props) {
        var _a;
        super(props);
        this._elementState = this.props
            .elementState;
        this._element = this.props.element;
        (_a = this.updateElement) === null || _a === void 0 ? void 0 : _a.call(this, this.props.element);
    }
    setElementState(state) {
        var _a, _b;
        (_b = (_a = this.props).onElementStateChange) === null || _b === void 0 ? void 0 : _b.call(_a, (this._elementState = state));
    }
    get elementState() {
        return this._elementState;
    }
    get element() {
        return this._element;
    }
    setElement(element) {
        this._element = element;
    }
    get rpc() {
        return this.props.connection.rpc;
    }
    get controller() {
        return this.props.connection.controller;
    }
    get connection() {
        return this.props.connection;
    }
    forceUpdateElement() {
        var _a;
        (_a = this.updateElement) === null || _a === void 0 ? void 0 : _a.call(this, this.element);
    }
    updateViewProps(prevProps, nextProps) {
        if (nextProps.element !== prevProps.element) {
            this._element = nextProps.element;
        }
    }
}
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_1__.ViewState)("forceUpdateElement"),
    __metadata("design:type", typeof (_a = typeof _Widget__WEBPACK_IMPORTED_MODULE_2__.WidgetElement !== "undefined" && _Widget__WEBPACK_IMPORTED_MODULE_2__.WidgetElement) === "function" ? _a : Object)
], AbstractWidgetView.prototype, "_element", void 0);


/***/ }),

/***/ "./src/typerpc/widget/Row.ts":
/*!***********************************!*\
  !*** ./src/typerpc/widget/Row.ts ***!
  \***********************************/
/*! namespace exports */
/*! export boolean [provided] [no usage info] [missing usage info prevents renaming] */
/*! export nullable [provided] [no usage info] [missing usage info prevents renaming] */
/*! export number [provided] [no usage info] [missing usage info prevents renaming] */
/*! export string [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "number": () => /* binding */ number,
/* harmony export */   "nullable": () => /* binding */ nullable,
/* harmony export */   "string": () => /* binding */ string,
/* harmony export */   "boolean": () => /* binding */ boolean
/* harmony export */ });
function number(value) {
    return Number(value);
}
function nullable(type) {
    return value => {
        if (value != null)
            return type(value);
    };
}
function string(value) {
    if (value == null)
        return "";
    return String(value);
}
number.enum = function () {
    return number;
};
function boolean(value) {
    return Boolean(value);
}


/***/ }),

/***/ "./src/typerpc/widget/Widget.ts":
/*!**************************************!*\
  !*** ./src/typerpc/widget/Widget.ts ***!
  \**************************************/
/*! namespace exports */
/*! export AnyWidgetConnection [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Widget [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnyWidgetConnection": () => /* binding */ AnyWidgetConnection,
/* harmony export */   "Widget": () => /* binding */ Widget
/* harmony export */ });
/* harmony import */ var _common_object_entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/object/entries */ "./src/common/object/entries.ts");
/* harmony import */ var _common_object_mergeDescriptors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/object/mergeDescriptors */ "./src/common/object/mergeDescriptors.ts");
/* harmony import */ var _common_string_capitalize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/string/capitalize */ "./src/common/string/capitalize.ts");
/* harmony import */ var _NoRpc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../NoRpc */ "./src/typerpc/NoRpc.ts");
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Rpc */ "./src/typerpc/Rpc.ts");
// TODO: remove controller.
;




const AnyWidgetConnection = {
    get rpc() {
        throw new Error();
    },
    get rpcCommand() {
        throw new Error();
    },
    get controller() {
        throw new Error();
    },
    command(key, ...args) {
        return this.rpcCommand([key, args]);
    },
    getElement(state) {
        return this.rpcCommand(["getElement", state]);
    },
};
function Widget(options) {
    const { isGenericConfig = false, props = {}, handler, commands, controller, connection: connectionDescriptors, } = options;
    let connection = Object.create(AnyWidgetConnection);
    for (const [key, value] of (0,_common_object_entries__WEBPACK_IMPORTED_MODULE_0__.entries)(connectionDescriptors)) {
        const currentKey = "current" + (0,_common_string_capitalize__WEBPACK_IMPORTED_MODULE_2__.capitalize)(key);
        Object.defineProperty(connection, key, {
            get() {
                if (!(currentKey in this)) {
                    this[currentKey] = value(this);
                }
                return this[currentKey];
            },
        });
    }
    return (0,_Rpc__WEBPACK_IMPORTED_MODULE_4__.Rpc)({
        handler,
        isGenericConfig,
        props: (0,_common_object_mergeDescriptors__WEBPACK_IMPORTED_MODULE_1__.mergeDescriptors)(props, {
            widget: {
                controller: controller || _NoRpc__WEBPACK_IMPORTED_MODULE_3__.NoRpc,
                options: options,
                commands: commands || {},
                connection: connection,
            },
        }),
        connect(command) {
            return Object.setPrototypeOf({
                rpc: this,
                rpcCommand: command,
                controller: this.widget.controller.createRpcConnection(payload => {
                    return command(["controller", payload]);
                }),
            }, this.widget.connection);
        },
    });
}


/***/ }),

/***/ "./src/typerpc/widget/WidgetRouterView.tsx":
/*!*************************************************!*\
  !*** ./src/typerpc/widget/WidgetRouterView.tsx ***!
  \*************************************************/
/*! namespace exports */
/*! export WidgetRouterView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WidgetRouterView": () => /* binding */ WidgetRouterView
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_WeakId__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/WeakId */ "./src/common/WeakId.ts");
/* harmony import */ var _typerouter_ReactRouter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../typerouter/ReactRouter */ "./src/typerouter/ReactRouter.ts");
/* harmony import */ var _WidgetViewLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WidgetViewLoader */ "./src/typerpc/widget/WidgetViewLoader.ts");
;



function WidgetRouterView(router, connectionOrGetConnection, optionsOrRenderWidget) {
    const getConnection = typeof connectionOrGetConnection === "function"
        ? connectionOrGetConnection
        : () => connectionOrGetConnection;
    const options = typeof optionsOrRenderWidget === "function"
        ? { renderWidget: optionsOrRenderWidget }
        : optionsOrRenderWidget;
    const { renderWidget, getElementState } = options;
    (0,_typerouter_ReactRouter__WEBPACK_IMPORTED_MODULE_2__.ReactRouter)(router, Object.assign(Object.assign({}, options), { renderIndex(indexProps) {
            const connection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => getConnection(indexProps.location.params), [indexProps.location.params]);
            return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_WidgetViewLoader__WEBPACK_IMPORTED_MODULE_3__.WidgetViewLoader, { key: (0,_common_WeakId__WEBPACK_IMPORTED_MODULE_1__.WeakId)(indexProps.location), elementState: indexProps.state, onElementStateChange: state => {
                    indexProps.setState(state);
                }, connection: connection, children: props => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, { props, indexProps }) }));
        } }));
    function Component({ props, indexProps }) {
        return renderWidget(props, indexProps);
    }
}


/***/ }),

/***/ "./src/typerpc/widget/WidgetViewLoader.ts":
/*!************************************************!*\
  !*** ./src/typerpc/widget/WidgetViewLoader.ts ***!
  \************************************************/
/*! namespace exports */
/*! export WidgetViewLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WidgetViewLoader": () => /* binding */ WidgetViewLoader
/* harmony export */ });
/* harmony import */ var _react_view_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../react/view/View */ "./src/react/view/View.ts");
/* harmony import */ var _react_view_ViewState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../react/view/ViewState */ "./src/react/view/ViewState.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;


// TODO: Make service for WidgetViewLoader
class WidgetViewLoader extends _react_view_View__WEBPACK_IMPORTED_MODULE_0__.View {
    constructor(props) {
        super(props);
        this.isLoading = false;
        this.error = undefined;
        this.reload().catch(error => {
            this.error = error;
        });
    }
    async reload() {
        this.isLoading = true;
        try {
            this.element = await this.props.connection.getElement(this.props.elementState);
        }
        finally {
            this.isLoading = false;
        }
    }
    renderView() {
        if (this.error)
            throw this.error;
        if (this.element)
            return this.props.children({
                element: this.element,
                elementState: this.props.elementState,
                onElementStateChange: this.props.onElementStateChange,
                connection: this.props.connection,
            }, this);
    }
}
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_1__.ViewState)(),
    __metadata("design:type", Object)
], WidgetViewLoader.prototype, "isLoading", void 0);
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_1__.ViewState)(),
    __metadata("design:type", Object)
], WidgetViewLoader.prototype, "element", void 0);
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_1__.ViewState)(),
    __metadata("design:type", Object)
], WidgetViewLoader.prototype, "error", void 0);


/***/ }),

/***/ "./src/typerpc/widget/data-table/DataTable.ts":
/*!****************************************************!*\
  !*** ./src/typerpc/widget/data-table/DataTable.ts ***!
  \****************************************************/
/*! namespace exports */
/*! export DataTable [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataTable": () => /* binding */ DataTable
/* harmony export */ });
/* harmony import */ var _NoRpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../NoRpc */ "./src/typerpc/NoRpc.ts");
/* harmony import */ var _rpc_parameter_RpcParameter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../rpc-parameter/RpcParameter */ "./src/typerpc/rpc-parameter/RpcParameter.ts");
/* harmony import */ var _rpc_fn_RpcFn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../rpc-fn/RpcFn */ "./src/typerpc/rpc-fn/RpcFn.ts");
/* harmony import */ var _rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../rpc-map/RpcMap */ "./src/typerpc/rpc-map/RpcMap.ts");
/* harmony import */ var _Widget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Widget */ "./src/typerpc/widget/Widget.ts");
/* harmony import */ var _DataTableHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataTableHandler */ "./src/typerpc/widget/data-table/DataTableHandler.ts");
;





function DataTable(rowType, options = {}) {
    return (0,_Widget__WEBPACK_IMPORTED_MODULE_4__.Widget)({
        isGenericConfig: true,
        connection: {
            getRows: conn => query => conn.controller.getRows(query),
            getRowController: conn => key => conn.controller.getRowController(key),
        },
        props: { rowType },
        controller: (0,_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_3__.RpcMap)({
            getRowController: (0,_rpc_parameter_RpcParameter__WEBPACK_IMPORTED_MODULE_1__.RpcParameter)(String, options.rowController || _NoRpc__WEBPACK_IMPORTED_MODULE_0__.NoRpc),
            getRows: (0,_rpc_fn_RpcFn__WEBPACK_IMPORTED_MODULE_2__.RpcFn)(),
        }),
        handler: _DataTableHandler__WEBPACK_IMPORTED_MODULE_5__.DataTableHandler,
    });
}


/***/ }),

/***/ "./src/typerpc/widget/data-table/DataTableHandler.ts":
/*!***********************************************************!*\
  !*** ./src/typerpc/widget/data-table/DataTableHandler.ts ***!
  \***********************************************************/
/*! namespace exports */
/*! export DataTableHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataTableHandler": () => /* binding */ DataTableHandler
/* harmony export */ });
/* harmony import */ var _logging_inspect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../logging/inspect */ "./src/logging/inspect.ts");
/* harmony import */ var _AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AbstractWidgetHandler */ "./src/typerpc/widget/AbstractWidgetHandler.ts");
/* harmony import */ var _common_object_entries__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/object/entries */ "./src/common/object/entries.ts");
/* harmony import */ var _common_object_mapObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/object/mapObject */ "./src/common/object/mapObject.ts");
/* harmony import */ var _common_patterns_lazy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/patterns/lazy */ "./src/common/patterns/lazy.ts");
/* harmony import */ var _ConfigFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ConfigFactory */ "./src/typerpc/ConfigFactory.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






class DataTableHandler extends _AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_1__.AbstractWidgetHandler {
    get columns() {
        return (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_3__.mapObject)(this.rpc.rowType, (columnType, key) => {
            var _a;
            const columnConfig = (_a = this.config.columns) === null || _a === void 0 ? void 0 : _a[key];
            let load, field;
            switch (typeof columnConfig) {
                case "function":
                    load = columnConfig;
                    break;
                case "string":
                    field = columnConfig;
                    load = dataRow => dataRow[field];
                    break;
                case "object":
                    ({ load, field } = columnConfig || {});
                    if (!load) {
                        load = dataRow => dataRow[key];
                        field = key;
                    }
                    break;
                case "undefined":
                    return { field: key, load: dataRow => dataRow[key] };
                default:
                    throw new TypeError(`Unexpected ${(0,_logging_inspect__WEBPACK_IMPORTED_MODULE_0__.inspect)({ columnConfig })}`);
            }
            return {
                load,
                field,
            };
        });
    }
    async loadRow(dataRow, noKey) {
        const row = await (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_3__.mapObjectAsync)(this.columns, column => column.load(dataRow));
        if (!noKey) {
            row.$key = dataRow.$key;
        }
        return row;
    }
    async getRows(query) {
        var _a, _b, _c, _d;
        const orders = [];
        for (const [key, order] of (0,_common_object_entries__WEBPACK_IMPORTED_MODULE_2__.entries)(query.order)) {
            const column = this.columns[key];
            if (column.field === undefined) {
                continue;
            }
            if (typeof order === "string") {
                orders.push({
                    by: column.field,
                    sort: order,
                });
            }
            else {
                orders.push({
                    by: column.field,
                    sort: (_a = order.sort) !== null && _a !== void 0 ? _a : "ASC",
                    nulls: order.nulls,
                });
            }
        }
        const maxRows = (_b = this.config.maxRows) !== null && _b !== void 0 ? _b : 10;
        const filters = [];
        if (query.text) {
            const searchFilters = (_c = this.config.searchIn) === null || _c === void 0 ? void 0 : _c.map(field => {
                return {
                    $search: {
                        in: field,
                        text: query.text,
                    },
                };
            });
            if (searchFilters === null || searchFilters === void 0 ? void 0 : searchFilters.length) {
                filters.push({ $or: searchFilters });
            }
        }
        const pageSize = Math.max(1, Math.min((_d = query.pageSize) !== null && _d !== void 0 ? _d : maxRows, maxRows));
        let source = this.config.source
            .sort(orders)
            .take(pageSize)
            .skip(pageSize * (query.pageIndex || 0))
            .filter({ $and: filters });
        let totalRows;
        let dataRows;
        if (query.getCount) {
            [totalRows, dataRows] = await source.getCountAndRows();
        }
        else {
            [totalRows, dataRows] = [0, await source.getRows()];
        }
        const rows = [];
        for (const dataRow of dataRows) {
            rows.push(await this.loadRow(dataRow));
        }
        return { rows, totalRows };
    }
    getControllerConfig() {
        return {
            getRowController: async ($, key) => $(await (0,_ConfigFactory__WEBPACK_IMPORTED_MODULE_5__.ConfigFactory)(this.config.getRowControllerConfig, {
                key,
                source: this.config.source,
            })),
            getRows: query => this.getRows(query),
        };
    }
    async getElement(state) {
        var _a;
        const { rows, totalRows } = await this.getRows(Object.assign({ getCount: true, text: "", pageSize: this.config.pageSize || 10, pageIndex: 0, order: {} }, state === null || state === void 0 ? void 0 : state.query));
        return {
            rows,
            totalRows,
            pageSize: this.config.pageSize,
            searchable: !!((_a = this.config.searchIn) === null || _a === void 0 ? void 0 : _a.length),
            columns: (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_3__.mapObject)(this.columns, column => ({
                sortable: column.field !== undefined,
            })),
        };
    }
}
__decorate([
    (0,_common_patterns_lazy__WEBPACK_IMPORTED_MODULE_4__.Lazy)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DataTableHandler.prototype, "columns", null);


/***/ }),

/***/ "./src/typerpc/widget/data-table/DataTableView.ts":
/*!********************************************************!*\
  !*** ./src/typerpc/widget/data-table/DataTableView.ts ***!
  \********************************************************/
/*! namespace exports */
/*! export DataTableView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataTableView": () => /* binding */ DataTableView
/* harmony export */ });
/* harmony import */ var _common_object_mapAndFilterObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/object/mapAndFilterObject */ "./src/common/object/mapAndFilterObject.ts");
/* harmony import */ var _react_utils_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../react/utils/hooks/useDebounce */ "./src/react/utils/hooks/useDebounce.ts");
/* harmony import */ var _react_view_ViewState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../react/view/ViewState */ "./src/react/view/ViewState.ts");
/* harmony import */ var _AbstractWidgetView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AbstractWidgetView */ "./src/typerpc/widget/AbstractWidgetView.tsx");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;




class DataTableView extends _AbstractWidgetView__WEBPACK_IMPORTED_MODULE_3__.AbstractWidgetView {
    constructor() {
        var _a, _b;
        super(...arguments);
        this.reloadDebounce = (0,_react_utils_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_1__.Debounce)();
        this.searchText = ((_a = this.elementState) === null || _a === void 0 ? void 0 : _a.query.text) || "";
        this.pageIndex = ((_b = this.elementState) === null || _b === void 0 ? void 0 : _b.query.pageIndex) || 0;
        this.isLoading = false;
        this.columns = {};
    }
    // locationStateKey=""
    // @ViewHook(()=> useLocationState()) locationState: LocationState;
    updateElement(element) {
        var _a, _b, _c;
        this.rows = element.rows || [];
        this.totalRows = (_a = element.totalRows) !== null && _a !== void 0 ? _a : 0;
        this.pageSize =
            ((_c = (_b = this.elementState) === null || _b === void 0 ? void 0 : _b.query) === null || _c === void 0 ? void 0 : _c.pageSize) || element.pageSize || 10;
    }
    get lastPage() {
        return Math.ceil(this.totalRows / this.pageSize);
    }
    setPageIndex(pageIndex) {
        this.pageIndex = Math.min(this.lastPage - 1, pageIndex);
    }
    setRelativePage(count) {
        this.setPageIndex(this.pageIndex + count);
    }
    setPageSize(pageSize) {
        pageSize = this.pageSize = 1 > pageSize ? 1 : pageSize;
    }
    async search(text) {
        this.searchText = text;
        this.pageIndex = 0;
    }
    clearSearch() {
        this.searchText = "";
    }
    _toggleSortOrNulls(key, p, v1, v2) {
        const column = this.columns[key];
        let value = column[p];
        switch (value) {
            case v1:
                value = undefined;
                break;
            case v2:
                value = v1;
                break;
            case undefined:
                value = v2;
                break;
        }
        this.columns = Object.assign(Object.assign({}, this.columns), { [key]: Object.assign(Object.assign({}, column), { [p]: value }) });
    }
    toggleNulls(key) {
        this._toggleSortOrNulls(key, "sort", "ASC", "DESC");
    }
    toggleSort(key) {
        this._toggleSortOrNulls(key, "nulls", "FIRST", "LAST");
    }
    async reloadWithDebounce() {
        if (!this.isDidMount) {
            return;
        }
        this.isLoading = true;
        if (await this.reloadDebounce.wait())
            return;
        await this.reload();
    }
    async reloadAfterRemove(key) {
        // TODO
        return this.reload();
    }
    async reload() {
        if (this.isLoading)
            return;
        this.isLoading = true;
        const getCount = this.totalRows === 0 || this.pageIndex === 0;
        const { totalRows, rows } = await this.props.connection.controller.getRows({
            getCount,
            order: (0,_common_object_mapAndFilterObject__WEBPACK_IMPORTED_MODULE_0__.mapAndFilterObject)(this.columns, column => {
                const { nulls, sort } = column;
                if (nulls || sort) {
                    return { nulls, sort };
                }
            }),
            text: this.searchText,
            pageSize: this.pageSize,
            pageIndex: this.pageIndex,
        });
        if (getCount) {
            this.totalRows = totalRows;
        }
        this.rows = rows;
        this.isLoading = false;
    }
    renderView() {
        return this.props.children(this);
    }
}
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_2__.ViewState)("reloadWithDebounce"),
    __metadata("design:type", String)
], DataTableView.prototype, "searchText", void 0);
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_2__.ViewState)("reload"),
    __metadata("design:type", Object)
], DataTableView.prototype, "pageSize", void 0);
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_2__.ViewState)("reload"),
    __metadata("design:type", Object)
], DataTableView.prototype, "pageIndex", void 0);
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_2__.ViewState)(),
    __metadata("design:type", Number)
], DataTableView.prototype, "totalRows", void 0);
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_2__.ViewState)(),
    __metadata("design:type", Array)
], DataTableView.prototype, "rows", void 0);
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_2__.ViewState)(),
    __metadata("design:type", Object)
], DataTableView.prototype, "isLoading", void 0);
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_2__.ViewState)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], DataTableView.prototype, "columns", void 0);


/***/ }),

/***/ "./src/typerpc/widget/form/Form.ts":
/*!*****************************************!*\
  !*** ./src/typerpc/widget/form/Form.ts ***!
  \*****************************************/
/*! namespace exports */
/*! export Form [provided] [no usage info] [missing usage info prevents renaming] */
/*! export FormSubmitError [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": () => /* binding */ Form,
/* harmony export */   "FormSubmitError": () => /* binding */ FormSubmitError
/* harmony export */ });
/* harmony import */ var _Widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Widget */ "./src/typerpc/widget/Widget.ts");
/* harmony import */ var _FormHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormHandler */ "./src/typerpc/widget/form/FormHandler.ts");
;

function Form({ input }) {
    return (0,_Widget__WEBPACK_IMPORTED_MODULE_0__.Widget)({
        props: { input },
        controller: input,
        handler: _FormHandler__WEBPACK_IMPORTED_MODULE_1__.FormHandler,
        commands: { submit: "handleSubmit" },
        connection: {
            input: conn => conn.controller,
        },
    });
}
//
class FormSubmitError {
    constructor(error) {
        this.error = error;
    }
}


/***/ }),

/***/ "./src/typerpc/widget/form/FormHandler.ts":
/*!************************************************!*\
  !*** ./src/typerpc/widget/form/FormHandler.ts ***!
  \************************************************/
/*! namespace exports */
/*! export FormHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormHandler": () => /* binding */ FormHandler
/* harmony export */ });
/* harmony import */ var _input_ValueOrAwaitableFn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../input/ValueOrAwaitableFn */ "./src/typerpc/input/ValueOrAwaitableFn.ts");
/* harmony import */ var _AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AbstractWidgetHandler */ "./src/typerpc/widget/AbstractWidgetHandler.ts");
;

class FormHandler extends _AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_1__.AbstractWidgetHandler {
    getControllerConfig() {
        return this.config.inputConfig;
    }
    async handleSubmit(valueData) {
        const inputResult = await (await this.controller).loadAndCheck(valueData);
        if ("error" in inputResult)
            return { inputError: inputResult.error };
        class _Error {
            constructor(error) {
                this.error = error;
            }
        }
        try {
            return { value: await this.config.submit(inputResult.value, _Error) };
        }
        catch (error) {
            if (error.constructor === _Error) {
                return { error: error.error };
            }
            throw error;
        }
    }
    async getElement(state) {
        const value = await (0,_input_ValueOrAwaitableFn__WEBPACK_IMPORTED_MODULE_0__.ValueOrAwaitableFn)(this.config.valueConfig);
        if (value !== undefined) {
            const element = await this.controller.then(c => c.getInputElement());
            return Object.assign(Object.assign({}, element), { value });
        }
        return this.controller.then(c => c.getElement(state));
    }
}


/***/ }),

/***/ "./src/typerpc/widget/form/FormView.tsx":
/*!**********************************************!*\
  !*** ./src/typerpc/widget/form/FormView.tsx ***!
  \**********************************************/
/*! namespace exports */
/*! export FormView [provided] [no usage info] [missing usage info prevents renaming] */
/*! export FormViewEvent [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormView": () => /* binding */ FormView,
/* harmony export */   "FormViewEvent": () => /* binding */ FormViewEvent
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_reactor_ReactorListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../react/reactor/ReactorListener */ "./src/react/reactor/ReactorListener.tsx");
/* harmony import */ var _AbstractWidgetView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AbstractWidgetView */ "./src/typerpc/widget/AbstractWidgetView.tsx");
;


class FormView extends _AbstractWidgetView__WEBPACK_IMPORTED_MODULE_2__.AbstractWidgetView {
    reset() {
        this._element = Object.assign({}, this.element);
    }
    async submit() {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!(await this.input.validate()))
            return;
        const result = await this.props.connection.command("submit", this.input.data);
        if ("inputError" in result) {
            (_a = this.input) === null || _a === void 0 ? void 0 : _a.setError(result.inputError);
            (_c = (_b = this.props).onInputError) === null || _c === void 0 ? void 0 : _c.call(_b, result.inputError);
        }
        else if ("error" in result) {
            (_e = (_d = this.props).onError) === null || _e === void 0 ? void 0 : _e.call(_d, result.error);
        }
        else {
            (_g = (_f = this.props).onSubmit) === null || _g === void 0 ? void 0 : _g.call(_f, result.value);
        }
    }
    renderView() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_reactor_ReactorListener__WEBPACK_IMPORTED_MODULE_1__.ReactorListener, { eventType: FormViewEvent, onEvent: event => {
                switch (event.type) {
                    case "SUBMIT":
                        return this.submit();
                    case "RESET":
                        return this.reset();
                }
            } }, this.props.children({
            form: this,
            input: this.props.input({
                connection: this.controller,
                value: undefined,
                onChange: undefined,
                element: this.element,
                inputRef: field => {
                    this.input = field;
                },
                elementState: this.elementState,
                onElementStateChange: state => {
                    this.setElementState(state);
                },
            }),
        })));
    }
}
class FormViewEvent {
    constructor(type) {
        this.type = type;
    }
}


/***/ }),

/***/ "./src/typerpc/widget/inline-widget/InlineWidget.ts":
/*!**********************************************************!*\
  !*** ./src/typerpc/widget/inline-widget/InlineWidget.ts ***!
  \**********************************************************/
/*! namespace exports */
/*! export InlineWidget [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlineWidget": () => /* binding */ InlineWidget
/* harmony export */ });
/* harmony import */ var _NoRpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../NoRpc */ "./src/typerpc/NoRpc.ts");
/* harmony import */ var _Widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Widget */ "./src/typerpc/widget/Widget.ts");
/* harmony import */ var _InlineWidgetHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InlineWidgetHandler */ "./src/typerpc/widget/inline-widget/InlineWidgetHandler.ts");
;


function InlineWidget(options) {
    const { target, controller } = options;
    return (0,_Widget__WEBPACK_IMPORTED_MODULE_1__.Widget)({
        isGenericConfig: false,
        handler: _InlineWidgetHandler__WEBPACK_IMPORTED_MODULE_2__.InlineWidgetHandler,
        props: { inlineTarget: target },
        controller: controller || _NoRpc__WEBPACK_IMPORTED_MODULE_0__.NoRpc,
        commands: { target: "handleTarget" },
        connection: {
            target(conn) {
                var _a;
                return (_a = conn.rpc.inlineTarget) === null || _a === void 0 ? void 0 : _a.createRpcConnection(payload => {
                    return conn.command("target", payload);
                });
            },
        },
    });
}


/***/ }),

/***/ "./src/typerpc/widget/inline-widget/InlineWidgetHandler.ts":
/*!*****************************************************************!*\
  !*** ./src/typerpc/widget/inline-widget/InlineWidgetHandler.ts ***!
  \*****************************************************************/
/*! namespace exports */
/*! export InlineWidgetHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlineWidgetHandler": () => /* binding */ InlineWidgetHandler
/* harmony export */ });
/* harmony import */ var _common_patterns_lazy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/patterns/lazy */ "./src/common/patterns/lazy.ts");
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Rpc */ "./src/typerpc/Rpc.ts");
/* harmony import */ var _AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AbstractWidgetHandler */ "./src/typerpc/widget/AbstractWidgetHandler.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;



class InlineWidgetHandler extends _AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_2__.AbstractWidgetHandler {
    getControllerConfig() {
        return this.config.controllerConfig;
    }
    get targetHandler() {
        if (this.rpc.inlineTarget)
            return this.rpc.inlineTarget.resolveRpcHandler(this.config.targetConfig);
    }
    async handleTarget(payload) {
        if (!this.targetHandler)
            throw new _Rpc__WEBPACK_IMPORTED_MODULE_1__.RpcError(`No target`);
        return this.targetHandler.then(c => c.handle(payload));
    }
    async getElement(state) {
        var _a;
        return [
            await this.config.getElement(),
            await ((_a = (await this.targetHandler)) === null || _a === void 0 ? void 0 : _a.getElement(state)),
        ];
    }
}
__decorate([
    (0,_common_patterns_lazy__WEBPACK_IMPORTED_MODULE_0__.Lazy)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], InlineWidgetHandler.prototype, "targetHandler", null);


/***/ }),

/***/ "./src/typerpc/widget/inline-widget/InlineWidgetView.ts":
/*!**************************************************************!*\
  !*** ./src/typerpc/widget/inline-widget/InlineWidgetView.ts ***!
  \**************************************************************/
/*! namespace exports */
/*! export InlineWidgetView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlineWidgetView": () => /* binding */ InlineWidgetView
/* harmony export */ });
/* harmony import */ var _AbstractWidgetView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AbstractWidgetView */ "./src/typerpc/widget/AbstractWidgetView.tsx");
;
class InlineWidgetView extends _AbstractWidgetView__WEBPACK_IMPORTED_MODULE_0__.AbstractWidgetView {
    get inlineElement() {
        return this.element[0];
    }
    get targetProps() {
        return {
            connection: this.connection.target,
            element: this.element[1],
            elementState: this.elementState,
            onElementStateChange: state => {
                this.setElementState(state);
            },
        };
    }
    renderView() {
        return this.props.children(this);
    }
}


/***/ }),

/***/ "./src/typerpc/widget/tabs-widget/TabsWidget.ts":
/*!******************************************************!*\
  !*** ./src/typerpc/widget/tabs-widget/TabsWidget.ts ***!
  \******************************************************/
/*! namespace exports */
/*! export TabsWidget [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsWidget": () => /* binding */ TabsWidget
/* harmony export */ });
/* harmony import */ var _rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rpc-map/RpcMap */ "./src/typerpc/rpc-map/RpcMap.ts");
/* harmony import */ var _Widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Widget */ "./src/typerpc/widget/Widget.ts");
/* harmony import */ var _TabsWidgetHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabsWidgetHandler */ "./src/typerpc/widget/tabs-widget/TabsWidgetHandler.ts");
;


function TabsWidget(tabMap) {
    return (0,_Widget__WEBPACK_IMPORTED_MODULE_1__.Widget)({
        controller: (0,_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_0__.RpcMap)(tabMap),
        handler: _TabsWidgetHandler__WEBPACK_IMPORTED_MODULE_2__.TabsWidgetHandler,
        commands: { getTabElement: "handleGetTabElement" },
        props: { tabMap },
        connection: {
            getTabElement: conn => key => conn.command("getTabElement", key),
            tabs: conn => conn.controller,
        },
    });
}


/***/ }),

/***/ "./src/typerpc/widget/tabs-widget/TabsWidgetHandler.ts":
/*!*************************************************************!*\
  !*** ./src/typerpc/widget/tabs-widget/TabsWidgetHandler.ts ***!
  \*************************************************************/
/*! namespace exports */
/*! export TabsWidgetHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsWidgetHandler": () => /* binding */ TabsWidgetHandler
/* harmony export */ });
/* harmony import */ var _AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AbstractWidgetHandler */ "./src/typerpc/widget/AbstractWidgetHandler.ts");
/* harmony import */ var _common_object_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/object/keys */ "./src/common/object/keys.ts");
/* harmony import */ var _Rpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Rpc */ "./src/typerpc/Rpc.ts");
;


class TabsWidgetHandler extends _AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_0__.AbstractWidgetHandler {
    getControllerConfig() {
        return this.config;
    }
    async handleGetTabElement(key) {
        return this.controller
            .then(c => c.getTargetHandler(key))
            .then(t => t.getElement(undefined));
    }
    async getElement(state) {
        var _a;
        let key = (_a = state === null || state === void 0 ? void 0 : state.currentTab) === null || _a === void 0 ? void 0 : _a.key;
        if (!key || !(key in this.rpc.tabMap)) {
            [key] = (0,_common_object_keys__WEBPACK_IMPORTED_MODULE_1__.keys)(this.rpc.tabMap);
        }
        if (!key)
            throw new _Rpc__WEBPACK_IMPORTED_MODULE_2__.RpcError(`No tab key`);
        const element = await this.controller
            .then(c => c.getTargetHandler(key))
            .then(c => { var _a; return c.getElement((_a = state === null || state === void 0 ? void 0 : state.currentTab) === null || _a === void 0 ? void 0 : _a.state); });
        return { current: element ? { key, element } : undefined };
    }
}


/***/ }),

/***/ "./src/typerpc/widget/tabs-widget/TabsWidgetView.tsx":
/*!***********************************************************!*\
  !*** ./src/typerpc/widget/tabs-widget/TabsWidgetView.tsx ***!
  \***********************************************************/
/*! namespace exports */
/*! export TabsWidgetView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsWidgetView": () => /* binding */ TabsWidgetView
/* harmony export */ });
/* harmony import */ var _react_view_ViewState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../react/view/ViewState */ "./src/react/view/ViewState.ts");
/* harmony import */ var _AbstractWidgetView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AbstractWidgetView */ "./src/typerpc/widget/AbstractWidgetView.tsx");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;


class TabsWidgetView extends _AbstractWidgetView__WEBPACK_IMPORTED_MODULE_1__.AbstractWidgetView {
    get currentTabProps() {
        return this._currentTabProps;
    }
    updateTabProps({ key, element }) {
        var _a, _b;
        this._currentTabProps = {
            key,
            connection: this.controller[key],
            elementState: ((_b = (_a = this.elementState) === null || _a === void 0 ? void 0 : _a.currentTab) === null || _b === void 0 ? void 0 : _b.key) === key
                ? this.elementState.currentTab.state
                : undefined,
            onElementStateChange: state => {
                this.setElementState(Object.assign(Object.assign({}, this.elementState), { currentTab: { key, state } }));
            },
            element,
        };
    }
    updateElement(element) {
        if (element.current) {
            this.updateTabProps(element.current);
        }
    }
    async switchTo(key) {
        this.setElementState(Object.assign(Object.assign({}, this.elementState), { currentTab: { key, state: undefined } }));
        this.updateTabProps({
            key,
            element: await this.props.connection.getTabElement(key),
        });
    }
    renderView() {
        return this.props.children(this);
    }
}
__decorate([
    (0,_react_view_ViewState__WEBPACK_IMPORTED_MODULE_0__.ViewState)(),
    __metadata("design:type", Object)
], TabsWidgetView.prototype, "_currentTabProps", void 0);


/***/ }),

/***/ "./src/logging sync recursive":
/*!***************************!*\
  !*** ./src/logging/ sync ***!
  \***************************/
/*! default exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: module, __webpack_require__.o */
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => [];
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./src/logging sync recursive";
module.exports = webpackEmptyContext;

/***/ })

},
0,[["./src/system/browser/index.ts","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9NdWlBZG1pbi50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvTXVpTmVzdGVkTWVudS50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlCdXR0b24udHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NvbXBvbmVudHMvTXVpRGFuZ2VyQnV0dG9uLnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9jb21wb25lbnRzL011aURhbmdlckRpYWxvZy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlEZWxldGVCdXR0b24udHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NvbXBvbmVudHMvTXVpRGlhbG9nLnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9jb21wb25lbnRzL011aUdyaWQudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NvbXBvbmVudHMvTXVpSWNvbi50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlMaW5rLnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9jb21wb25lbnRzL011aVRhYmxlQ2VsbC50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlUYWJsZVRvb2xiYXIudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NyZWF0ZU11aVN5c3RlbS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9ycGMvTXVpRGF0YU1hbmFnZXJWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9ycGMvTXVpRGF0YVRhYmxlVmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvcnBjL011aUZvcm1WaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9ycGMvTXVpVGFic1dpZGdldFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL3JwYy9pbnB1dHMvTXVpQ2hlY2tib3hJbnB1dFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL3JwYy9pbnB1dHMvTXVpRGF0YUlucHV0Vmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvcnBjL2lucHV0cy9NdWlUZXh0SW5wdXRWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vTWV0YVR5cGUudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL1dlYWtJZC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vYXJyYXkvdXNlQXJyYXlUb1NlcS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vYXNzZXJ0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9hc3luYy9UaW1lb3V0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9hc3luYy9XYWl0ZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL2dldE5leHRQYXRoLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9tYXAvbWFwRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vbWFwL3RvdWNoTWFwLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9vYmplY3QvZGVmaW5lZC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vb2JqZWN0L2RlZmluZWRBdC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vb2JqZWN0L2VudHJpZXMudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9oYXNLZXlzLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9vYmplY3Qva2V5cy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vb2JqZWN0L21hcEFuZEZpbHRlck9iamVjdC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vb2JqZWN0L21hcE9iamVjdC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vb2JqZWN0L21hcE9iamVjdFRvQXJyYXkudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9tZXJnZURlc2NyaXB0b3JzLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9wYXR0ZXJucy9sYXp5LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9zdHJpbmcvY2FwaXRhbGl6ZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL2Zyb21Db25zdGFudENhc2UudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3N0cmluZy9mcm9tUHJvcGVydHlDYXNlLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9zdHJpbmcvam9pblRlbXBsYXRlLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9zdHJpbmcvam9pblVybC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL21hdGNoQ2FzZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL3NwbGl0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9zdHJpbmcvdG9Db25zdGFudENhc2UudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3N0cmluZy90b1RpdGxlQ2FzZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vdHlwaW5nczIvVHlwZVJlZi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vdHlwaW5nczIvVHlwaW5nLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2ltbXV0YWJsZTIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvbGFuZy9MYW5nLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2xhbmcvTGFuZ0tleS50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvbGFuZy9MYW5nVGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvbGFuZy9MYW5nVHJhbnNsYXRvci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9sYW5nL0xhbmdWaWV3LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2xvZ2dpbmcvaW5zcGVjdC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC9Ib29rUmVmLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L1RhYmxlTGF5b3V0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3JlYWN0b3IvUmVhY3Rvci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC9yZWFjdG9yL1JlYWN0b3JMaXN0ZW5lci50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvcmVhY3Rvci91c2VFbWl0dGVkLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3JlYWN0b3IvdXNlRW1pdHRlZFN0YXRlLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3JlYWN0b3IvdXNlRW1pdHRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC91dGlscy9FbXB0eUZyYWdtZW50LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3V0aWxzL2hvb2tzL3VzZURlYm91bmNlLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3V0aWxzL21lcmdlUHJvcHMudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvdXRpbHMvcGFydGlhbFByb3BzLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3V0aWxzL3NldFJlZi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC92aWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3Qvdmlldy9WaWV3U3RhdGUudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3Qvdmlldy9zZXRWaWV3U3RhdGVLZXkudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvTG9naW5JbmZvRXZlbnQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvTXVpQWNsR3JvdXBJbnB1dFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9icm93c2VyL011aUFjbEdyb3Vwc01hbmFnZXJWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vYnJvd3Nlci9NdWlBY2xVc2Vyc01hbmFnZXJWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vYnJvd3Nlci9NdWlBZG1pblZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9icm93c2VyL011aVN5c3RlbVJvb3RWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vYnJvd3Nlci9NdWlTeXN0ZW1WaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vYnJvd3Nlci9NdWlVc2VyQmFzaWNJbmZvSW5wdXRWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vYnJvd3Nlci9NdWlVc2VyQ29udGFjdEluZm9JbnB1dFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9icm93c2VyL1N5c3RlbVJvdXRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vYnJvd3Nlci9pbmRleC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vY29tbW9uL0FjbEdyb3Vwc01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2NvbW1vbi9BY2xVc2Vyc01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2NvbW1vbi9BZG1pbkFwcC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vY29tbW9uL05hbWVJbnB1dC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vY29tbW9uL1N5c3RlbUFwcC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vY29tbW9uL1VzZXJBcHAudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2NvbW1vbi9hZG1pbi9BZG1pblJvdXRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcm91dGVyL1JlYWN0Um91dGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVyb3V0ZXIvUmVhY3RSb3V0ZXJWaWV3LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVyb3V0ZXIvUm91dGUudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJvdXRlci9Sb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJvdXRlci9Sb3V0ZXJMb2NhdGlvbi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL0NvbmZpZ0ZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9HZW5lcmljQ29uZmlnLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvTm9ScGMudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9ScGMudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9ScGNDb25maWdIb29rLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvZGF0YS1tYW5hZ2VyL0RhdGFNYW5hZ2VyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvZGF0YS1tYW5hZ2VyL0RhdGFNYW5hZ2VySGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2RhdGEtbWFuYWdlci9EYXRhTWFuYWdlclJvdXRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L0Fic3RyYWN0SW5wdXRIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvQWJzdHJhY3RJbnB1dFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9JbnB1dEVycm9ySG9vay50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L0lucHV0Vmlld0NoaWxkcmVuLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvTGVuZ3RoRXJyb3IudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9WYWx1ZU9yQXdhaXRhYmxlRm4udHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9ib29sLWlucHV0L0Jvb2xJbnB1dC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L2Jvb2wtaW5wdXQvQm9vbElucHV0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L2Jvb2wtaW5wdXQvQm9vbElucHV0Vmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9kYXRhLWlucHV0LW1hcC9EYXRhSW5wdXRNYXAudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9kYXRhLWlucHV0LW1hcC9EYXRhSW5wdXRNYXBIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvZGF0YS1pbnB1dC1tYXAvRGF0YUlucHV0TWFwVmlldy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L2RhdGEtaW5wdXQvRGF0YUlucHV0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvZGF0YS1pbnB1dC9EYXRhSW5wdXRIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvZGF0YS1pbnB1dC9EYXRhSW5wdXRWaWV3LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvaW5wdXQtbWFwL0lucHV0TWFwLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvaW5wdXQtbWFwL0lucHV0TWFwSGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L2lucHV0LW1hcC9JbnB1dE1hcFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvbnVsbGFibGUtaW5wdXQvQWJzdHJhY3ROdWxsYWJsZUlucHV0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L251bGxhYmxlLWlucHV0L051bGxhYmxlSW5wdXRWaWV3LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvdGV4dC1pbnB1dC9UZXh0SW5wdXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC90ZXh0LWlucHV0L1RleHRJbnB1dEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC90ZXh0LWlucHV0L1RleHRJbnB1dExvYWRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L3RleHQtaW5wdXQvVGV4dElucHV0Vmlldy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3JwYy1mbi9ScGNGbi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3JwYy1mbi9ScGNGbkhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9ycGMtbWFwL1JwY01hcC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3JwYy1tYXAvUnBjTWFwSGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3JwYy1wYXJhbWV0ZXIvUnBjUGFyYW1ldGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvcnBjLXBhcmFtZXRlci9ScGNQYXJhbWV0ZXJIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L0Fic3RyYWN0V2lkZ2V0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9BYnN0cmFjdFdpZGdldFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L1Jvdy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9XaWRnZXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvV2lkZ2V0Um91dGVyVmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvV2lkZ2V0Vmlld0xvYWRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9kYXRhLXRhYmxlL0RhdGFUYWJsZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9kYXRhLXRhYmxlL0RhdGFUYWJsZUhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvZGF0YS10YWJsZS9EYXRhVGFibGVWaWV3LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9mb3JtL0Zvcm1IYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybVZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2lubGluZS13aWRnZXQvSW5saW5lV2lkZ2V0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2lubGluZS13aWRnZXQvSW5saW5lV2lkZ2V0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9pbmxpbmUtd2lkZ2V0L0lubGluZVdpZGdldFZpZXcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvdGFicy13aWRnZXQvVGFic1dpZGdldC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC90YWJzLXdpZGdldC9UYWJzV2lkZ2V0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC90YWJzLXdpZGdldC9UYWJzV2lkZ2V0Vmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvbG9nZ2luZ3xzeW5jIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQ0FBOEM7QUFDQTtBQUNRO0FBQ047QUFDTTtBQUNkO0FBQ0Q7QUFDWTtBQUNpQjtBQUVwRSxNQUFNLFNBQVMsR0FBRyxpRUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxTQUFTLEVBQUU7UUFDVCxTQUFTLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDNUI7SUFDRCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsR0FBRztLQUNkO0lBQ0QsSUFBSSxFQUFFLEVBQUU7SUFDUixLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsQ0FBQztLQUNa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RTs7Ozs7Ozs7Ozs7Ozs7QUN2QmhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcHBCYXIgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0FwcEJhclwiO1xuaW1wb3J0IERyYXdlciBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvRHJhd2VyXCI7XG5pbXBvcnQgeyBtYWtlU3R5bGVzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiO1xuaW1wb3J0IFRvb2xiYXIgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1Rvb2xiYXJcIjtcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UeXBvZ3JhcGh5XCI7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyBNdWlCdXR0b24gfSBmcm9tIFwiLi9jb21wb25lbnRzL011aUJ1dHRvblwiO1xuaW1wb3J0IHsgTXVpTmVzdGVkTWVudSwgTXVpTmVzdGVkTWVudVByb3BzIH0gZnJvbSBcIi4vTXVpTmVzdGVkTWVudVwiO1xuXG5jb25zdCB1c2VTdHlsZXMgPSBtYWtlU3R5bGVzKHRoZW1lID0+ICh7XG4gIGNvbnRhaW5lcjoge1xuICAgIG1hcmdpblRvcDogdGhlbWUuc3BhY2luZygyKSxcbiAgfSxcbiAgZHJhd2VyOiB7XG4gICAgbWluV2lkdGg6IDI1MCxcbiAgfSxcbiAgcm9vdDoge30sXG4gIHRpdGxlOiB7XG4gICAgZmxleEdyb3c6IDEsXG4gIH0sXG4gIFwiQGdsb2JhbFwiOiB7XG4gICAgYm9keToge1xuICAgICAgbWFyZ2luOiAwLFxuICAgIH0sXG4gIH0sXG59KSk7XG5cbmV4cG9ydCB0eXBlIE11aUFkbWluUHJvcHMgPSB7XG4gIGNoaWxkcmVuPztcbiAgbWVudT86IFJlY29yZDxzdHJpbmcsIE11aU5lc3RlZE1lbnVQcm9wcz47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpQWRtaW4oeyBjaGlsZHJlbiwgbWVudSB9OiBNdWlBZG1pblByb3BzKSB7XG4gIGNvbnN0IGNsYXNzZXMgPSB1c2VTdHlsZXMoKTtcbiAgY29uc3QgW2lzTWVudU9wZW4sIHNldE1lbnVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMucm9vdH0+XG4gICAgICA8QXBwQmFyIHBvc2l0aW9uPXtcInN0YXRpY1wifT5cbiAgICAgICAgPFRvb2xiYXI+XG4gICAgICAgICAgPE11aUJ1dHRvblxuICAgICAgICAgICAgaWNvbk9ubHlcbiAgICAgICAgICAgIGljb249e3JlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvTWVudVwiKX1cbiAgICAgICAgICAgIGVkZ2U9e1wic3RhcnRcIn1cbiAgICAgICAgICAgIGNvbG9yPVwiaW5oZXJpdFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldE1lbnUodHJ1ZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFR5cG9ncmFwaHk+e0xhbmdgQURNSU5gfTwvVHlwb2dyYXBoeT5cbiAgICAgICAgPC9Ub29sYmFyPntcIiBcIn1cbiAgICAgICAgPERyYXdlciBvcGVuPXtpc01lbnVPcGVufSBrZWVwTW91bnRlZCBvbkNsb3NlPXsoKSA9PiBzZXRNZW51KGZhbHNlKX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuZHJhd2VyfT5cbiAgICAgICAgICAgIDxNdWlOZXN0ZWRNZW51IGNoaWxkcmVuPXttZW51IHx8IHt9fSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0RyYXdlcj5cbiAgICAgIDwvQXBwQmFyPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuY29udGFpbmVyfT57Y2hpbGRyZW59PC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgQ29sbGFwc2UgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0NvbGxhcHNlXCI7XG5pbXBvcnQgX0xpc3QgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0xpc3RcIjtcbmltcG9ydCBMaXN0SXRlbSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvTGlzdEl0ZW1cIjtcbmltcG9ydCBMaXN0SXRlbUljb24gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtSWNvblwiO1xuaW1wb3J0IExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbVNlY29uZGFyeUFjdGlvblwiO1xuaW1wb3J0IExpc3RJdGVtVGV4dCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvTGlzdEl0ZW1UZXh0XCI7XG5pbXBvcnQgeyBtYWtlU3R5bGVzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiO1xuaW1wb3J0IGNsc3ggZnJvbSBcImNsc3hcIjtcbmltcG9ydCBSZWFjdCwgeyBEaXNwYXRjaCwgUmVhY3ROb2RlLCBTZXRTdGF0ZUFjdGlvbiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGhhc0tleXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9oYXNLZXlzXCI7XG5pbXBvcnQgeyBtYXBPYmplY3RUb0FycmF5IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0VG9BcnJheVwiO1xuaW1wb3J0IHsgSW1tdXRhYmxlUmVjb3JkLCBJbW11dGFibGVTZXQgfSBmcm9tIFwiLi4vLi4vaW1tdXRhYmxlMlwiO1xuaW1wb3J0IHsgTGFuZ0tleSB9IGZyb20gXCIuLi8uLi9sYW5nL0xhbmdLZXlcIjtcbmltcG9ydCB7IFN0YXRlUHJvcHMgfSBmcm9tIFwiLi4vLi4vcmVhY3Qvc3RhdGVIZWxwZXJzXCI7XG5pbXBvcnQgeyBwYXJ0aWFsUHJvcHMgfSBmcm9tIFwiLi4vLi4vcmVhY3QvdXRpbHMvcGFydGlhbFByb3BzXCI7XG5pbXBvcnQgeyBNdWlJY29uIH0gZnJvbSBcIi4vY29tcG9uZW50cy9NdWlJY29uXCI7XG5cbmNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXModGhlbWUgPT4gKHtcbiAgbmVzdGVkOiB7XG4gICAgcGFkZGluZ0xlZnQ6IHRoZW1lLnNwYWNpbmcoNCksXG4gIH0sXG5cbiAgaXRlbVdpdGhDaGlsZFRleHQ6IHt9LFxuICBwYXJlbnQ6IHtcbiAgICAvLyBmb250V2VpZ2h0OiBcImJvbGRcIixcbiAgfSxcbiAgbGlzdEl0ZW1UZXh0OiB7XG4gICAgZm9udFNpemU6IHRoZW1lLnR5cG9ncmFwaHkuZm9udFNpemUsXG4gIH0sXG59KSk7XG5jb25zdCBMaXN0ID0gcGFydGlhbFByb3BzKF9MaXN0LCB7XG4gIC8vIGRlbnNlOiB0cnVlLFxufSk7XG5cbmV4cG9ydCB0eXBlIE11aU5lc3RlZE1lbnVQcm9wcyA9IHtcbiAgdGl0bGU/OiBSZWFjdE5vZGU7XG4gIGljb24/OiBNdWlJY29uO1xuICBvbkNsaWNrPygpO1xuICBjaGlsZHJlbj86IFJlY29yZDxzdHJpbmcsIE11aU5lc3RlZE1lbnVQcm9wcz47XG59O1xuXG5jbGFzcyBNdWlOZXN0ZWRNZW51U3RhdGUgZXh0ZW5kcyBJbW11dGFibGVSZWNvcmQoe1xuICBzZWxlY3RlZFBhdGg6IFwiXCIsXG59KSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gTXVpTmVzdGVkTWVudSh7XG4gIGNoaWxkcmVuLFxufToge1xuICBjaGlsZHJlbjogUmVjb3JkPHN0cmluZywgTXVpTmVzdGVkTWVudVByb3BzPjtcbn0pIHtcbiAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKCgpID0+IG5ldyBNdWlOZXN0ZWRNZW51U3RhdGUoKSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGlzdD5cbiAgICAgIHttYXBPYmplY3RUb0FycmF5KGNoaWxkcmVuLCAoY2hpbGQsIGtleSkgPT4gKFxuICAgICAgICA8TXVpTmVzdGVkTWVudUNoaWxkXG4gICAgICAgICAgey4uLmNoaWxkfVxuICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgIG1lbnVQYXRoPXtrZXl9XG4gICAgICAgICAgbWVudUtleT17a2V5fVxuICAgICAgICAgIGRlcHRoPXswfVxuICAgICAgICAgIGNsYXNzZXM9e2NsYXNzZXN9XG4gICAgICAgICAgc3RhdGU9e3N0YXRlfVxuICAgICAgICAgIHNldFN0YXRlPXtzZXRTdGF0ZX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvTGlzdD5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE11aU5lc3RlZE1lbnVDaGlsZCh7XG4gIGNoaWxkcmVuLFxuICB0aXRsZSxcbiAgaWNvbixcbiAgb25DbGljayxcbiAgZGVwdGgsXG4gIG1lbnVQYXRoLFxuICBtZW51S2V5LFxuICAuLi5wcm9wc1xufTogTXVpTmVzdGVkTWVudVByb3BzICZcbiAgU3RhdGVQcm9wczxNdWlOZXN0ZWRNZW51U3RhdGU+ICYge1xuICAgIG1lbnVQYXRoOiBzdHJpbmc7XG4gICAgZGVwdGg6IG51bWJlcjtcbiAgICBtZW51S2V5OiBzdHJpbmc7XG4gICAgY2xhc3NlczogUmV0dXJuVHlwZTx0eXBlb2YgdXNlU3R5bGVzPjtcbiAgfSkge1xuICBjb25zdCBbaXNPcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgeyBjbGFzc2VzLCBzZXRTdGF0ZSwgc3RhdGUgfSA9IHByb3BzO1xuXG4gIGNvbnN0IGl0ZW1JY29uID0gPExpc3RJdGVtSWNvbj57TXVpSWNvbihpY29uKX08L0xpc3RJdGVtSWNvbj47XG5cbiAgY29uc3QgaGFzQ2hpbGRyZW4gPSBoYXNLZXlzKGNoaWxkcmVuKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8TGlzdEl0ZW1cbiAgICAgICAgYnV0dG9uXG4gICAgICAgIHNlbGVjdGVkPXtzdGF0ZS5zZWxlY3RlZFBhdGggPT09IG1lbnVQYXRofVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgc2V0U3RhdGUoc3RhdGUuc2V0KFwic2VsZWN0ZWRQYXRoXCIsIG1lbnVQYXRoKSk7XG4gICAgICAgICAgb25DbGljaz8uKCk7XG4gICAgICAgICAgaWYgKGhhc0NoaWxkcmVuKSB7XG4gICAgICAgICAgICBzZXRPcGVuKCFpc09wZW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2l0ZW1JY29ufVxuICAgICAgICA8TGlzdEl0ZW1UZXh0XG4gICAgICAgICAgcHJpbWFyeVR5cG9ncmFwaHlQcm9wcz17e1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBjbHN4KFxuICAgICAgICAgICAgICBjbGFzc2VzLmxpc3RJdGVtVGV4dCxcbiAgICAgICAgICAgICAgaGFzS2V5cyhjaGlsZHJlbikgJiYgY2xhc3Nlcy5wYXJlbnRcbiAgICAgICAgICAgICksXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxMYW5nS2V5IGZvcj17bWVudUtleX0+e3RpdGxlfTwvTGFuZ0tleT5cbiAgICAgICAgPC9MaXN0SXRlbVRleHQ+XG5cbiAgICAgICAgPExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uPlxuICAgICAgICAgIHtoYXNDaGlsZHJlbiAmJlxuICAgICAgICAgICAgTXVpSWNvbihcbiAgICAgICAgICAgICAgaXNPcGVuXG4gICAgICAgICAgICAgICAgPyByZXF1aXJlKGBAbWF0ZXJpYWwtdWkvaWNvbnMvRXhwYW5kTGVzc2ApXG4gICAgICAgICAgICAgICAgOiByZXF1aXJlKGBAbWF0ZXJpYWwtdWkvaWNvbnMvRXhwYW5kTW9yZWApXG4gICAgICAgICAgICApfVxuICAgICAgICA8L0xpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uPlxuICAgICAgPC9MaXN0SXRlbT5cbiAgICAgIHtpc09wZW4gJiYgKFxuICAgICAgICA8Q29sbGFwc2UgaW4+XG4gICAgICAgICAgPExpc3QgZGlzYWJsZVBhZGRpbmcgY2xhc3NOYW1lPXtjbHN4KGRlcHRoID4gMCAmJiBjbGFzc2VzLm5lc3RlZCl9PlxuICAgICAgICAgICAge21hcE9iamVjdFRvQXJyYXkoY2hpbGRyZW4gfHwge30sIChjaGlsZFByb3BzLCBrZXkpID0+IChcbiAgICAgICAgICAgICAgPE11aU5lc3RlZE1lbnVDaGlsZFxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICBkZXB0aD17ZGVwdGggKyAxfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIG1lbnVQYXRoPXttZW51UGF0aCArIFwiL1wiICsga2V5fVxuICAgICAgICAgICAgICAgIG1lbnVLZXk9e2tleX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICAgICAgICB7Li4uY2hpbGRQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvTGlzdD5cbiAgICAgICAgPC9Db2xsYXBzZT5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgQnV0dG9uLCB7IEJ1dHRvblByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0J1dHRvblwiO1xuaW1wb3J0IEljb25CdXR0b24sIHsgSWNvbkJ1dHRvblByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0ljb25CdXR0b25cIjtcbmltcG9ydCBUb29sdGlwLCB7IFRvb2x0aXBQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9Ub29sdGlwXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIENvbXBvbmVudFR5cGUsXG4gIGNyZWF0ZUVsZW1lbnQsXG4gIFJlYWN0RWxlbWVudCxcbiAgUmVhY3ROb2RlLFxuICB1c2VSZWYsXG4gIHVzZVN0YXRlLFxufSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEZuIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9GblwiO1xuaW1wb3J0IHsgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL092ZXJyaWRlXCI7XG5pbXBvcnQgeyBQbHVjayB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvUGx1Y2tcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyB1cGRhdGVSZWYgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvSG9va1JlZlwiO1xuaW1wb3J0IHsgUmVhY3RvckVtaXR0ZXIsIHVzZUVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvcmVhY3Rvci91c2VFbWl0dGVyXCI7XG5pbXBvcnQgeyBwYXJ0aWFsUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvcGFydGlhbFByb3BzXCI7XG5pbXBvcnQgeyBNdWlJY29uIH0gZnJvbSBcIi4vTXVpSWNvblwiO1xuXG5leHBvcnQgdHlwZSBNdWlCdXR0b25Qcm9wczxQID0ge30+ID1cbiAgfCBPdmVycmlkZTxCdXR0b25Qcm9wcywgQmFzZVByb3BzICYgUD5cbiAgfCBPdmVycmlkZTxJY29uQnV0dG9uUHJvcHMsIEJhc2VQcm9wcyAmIFA+O1xuXG50eXBlIEJhc2VQcm9wcyA9IHtcbiAgQnV0dG9uUHJvcHM/OiBCdXR0b25Qcm9wcztcbiAgSWNvbkJ1dHRvblByb3BzPzogSWNvbkJ1dHRvblByb3BzO1xuICByZW5kZXJPbkNsaWNrPyhjbG9zZTogKCkgPT4gdm9pZCwgZ2V0RWw6ICgpID0+IGFueSk6IFJlYWN0RWxlbWVudDtcbiAgZGlzYWJsZVRvb2x0aXA/OiBib29sZWFuO1xuICBpY29uT25seT86IGJvb2xlYW47XG4gIFRvb2x0aXBQcm9wcz86IFBhcnRpYWw8VG9vbHRpcFByb3BzPjtcbiAgZGFuZ2VyPzogYm9vbGVhbjtcbiAgaWNvbj86IE11aUljb247XG4gIHRpdGxlPzogUmVhY3ROb2RlO1xuICBidXR0b25UeXBlPzogQ29tcG9uZW50VHlwZTxNdWlCdXR0b25Qcm9wcz47XG4gIGVtaXRPbkNsaWNrPyhlbWl0OiBSZWFjdG9yRW1pdHRlcik6IHZvaWQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpQnV0dG9uKHByb3BzOiBNdWlCdXR0b25Qcm9wcykge1xuICBpZiAocHJvcHMuYnV0dG9uVHlwZSkge1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KHByb3BzLmJ1dHRvblR5cGUsIHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgYnV0dG9uVHlwZTogdW5kZWZpbmVkLFxuICAgIH0pO1xuICB9XG5cbiAgbGV0IHtcbiAgICBCdXR0b25Qcm9wcyxcbiAgICBJY29uQnV0dG9uUHJvcHMsXG4gICAgcmVuZGVyT25DbGljayxcbiAgICBUb29sdGlwUHJvcHMsXG4gICAgZGlzYWJsZVRvb2x0aXAsXG4gICAgaWNvbk9ubHksXG4gICAgYnV0dG9uUmVmOiBpbml0QnV0dG9uUmVmLFxuICAgIGJ1dHRvblR5cGUsXG4gICAgZW1pdE9uQ2xpY2ssXG4gICAgLi4uYnV0dG9uUHJvcHNcbiAgfTogTXVpQnV0dG9uUHJvcHMgPSBwcm9wcztcblxuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGVtaXQgPSBlbWl0T25DbGljayAmJiB1c2VFbWl0dGVyKCk7XG4gIGNvbnN0IGJ1dHRvblJlZiA9IHVzZVJlZjx1bmtub3duPihudWxsKTtcbiAgbGV0IGVsZW1lbnQ6IFJlYWN0RWxlbWVudDtcblxuICBsZXQgdHlwZTogQ29tcG9uZW50VHlwZTtcbiAgaWYgKGljb25Pbmx5KSB7XG4gICAgdHlwZSA9IEljb25CdXR0b247XG4gICAgYnV0dG9uUHJvcHMgPSB7XG4gICAgICAuLi5idXR0b25Qcm9wcyxcbiAgICAgIC4uLkljb25CdXR0b25Qcm9wcyxcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHR5cGUgPSBCdXR0b247XG4gICAgYnV0dG9uUHJvcHMgPSB7XG4gICAgICAuLi5idXR0b25Qcm9wcyxcbiAgICAgIC4uLkJ1dHRvblByb3BzLFxuICAgIH07XG4gIH1cblxuICBjb25zdCB7IHRpdGxlLCBkYW5nZXIsIGljb24sIG9uQ2xpY2ssIC4uLmVsZW1lbnRQcm9wcyB9ID0gYnV0dG9uUHJvcHMgYXMgYW55O1xuICBpZiAoZGFuZ2VyKSB7XG4gICAgZWxlbWVudFByb3BzLmNvbG9yID0gXCJzZWNvbmRhcnlcIjtcbiAgfVxuICBlbGVtZW50UHJvcHMuYnV0dG9uUmVmID0gY3VycmVudCA9PiB7XG4gICAgdXBkYXRlUmVmKGluaXRCdXR0b25SZWYsIGN1cnJlbnQpO1xuICAgIHVwZGF0ZVJlZihidXR0b25SZWYsIGN1cnJlbnQpO1xuICB9O1xuICBlbGVtZW50UHJvcHMub25DbGljayA9IGV2ZW50ID0+IHtcbiAgICBvbkNsaWNrPy4oZXZlbnQpO1xuICAgIGVtaXRPbkNsaWNrPy4oZW1pdCEpO1xuICAgIHNldE9wZW4odHJ1ZSk7XG4gIH07XG5cbiAgaWYgKGljb25Pbmx5KSB7XG4gICAgZWxlbWVudFByb3BzLmNoaWxkcmVuID0gTXVpSWNvbihpY29uKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50UHJvcHMuZW5kSWNvbiA9IE11aUljb24oaWNvbik7XG4gICAgZWxlbWVudFByb3BzLmNoaWxkcmVuID0gdGl0bGU7XG4gIH1cblxuICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCh0eXBlLCBlbGVtZW50UHJvcHMpO1xuXG4gIGlmICgodGl0bGUgfHwgVG9vbHRpcFByb3BzKSAmJiAhZGlzYWJsZVRvb2x0aXApIHtcbiAgICBlbGVtZW50ID0gKFxuICAgICAgPFRvb2x0aXAgdGl0bGU9e3RpdGxlfSB7Li4uVG9vbHRpcFByb3BzfT5cbiAgICAgICAge2VsZW1lbnR9XG4gICAgICA8L1Rvb2x0aXA+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChvcGVuKSB7XG4gICAgZWxlbWVudCA9IChcbiAgICAgIDw+XG4gICAgICAgIHtlbGVtZW50fVxuICAgICAgICB7cmVuZGVyT25DbGljaz8uKFxuICAgICAgICAgICgpID0+IHNldE9wZW4oZmFsc2UpLFxuICAgICAgICAgICgpID0+IGJ1dHRvblJlZi5jdXJyZW50IVxuICAgICAgICApfVxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IGNvbnN0IE11aUNhbmNlbEJ1dHRvbiA9IHBhcnRpYWxQcm9wcyhNdWlCdXR0b24sIHtcbiAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9DYW5jZWxcIiksXG4gIHRpdGxlOiBMYW5nYENBTkNFTGAsXG59KTtcblxuZXhwb3J0IGNvbnN0IE11aUNvbmZpcm1CdXR0b24gPSBwYXJ0aWFsUHJvcHMoTXVpQnV0dG9uLCB7XG4gIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvRG9uZVwiKSxcbiAgdGl0bGU6IExhbmdgQ09ORklSTWAsXG59KTtcblxuZXhwb3J0IGNvbnN0IE11aVJlc2V0QnV0dG9uID0gcGFydGlhbFByb3BzKE11aUJ1dHRvbiwge1xuICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0NsZWFyXCIpLFxuICB0aXRsZTogTGFuZ2BSRVNFVGAsXG59KTtcblxuZXhwb3J0IGNvbnN0IE11aUNsb3NlQnV0dG9uID0gcGFydGlhbFByb3BzKE11aUJ1dHRvbiwge1xuICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0Nsb3NlXCIpLFxuICB0aXRsZTogTGFuZ2BDTE9TRWAsXG59KTtcblxuZXhwb3J0IGNvbnN0IE11aUFkZEJ1dHRvbiA9IHBhcnRpYWxQcm9wcyhNdWlCdXR0b24sIHtcbiAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9BZGRcIiksXG4gIHRpdGxlOiBMYW5nYEFERGAsXG59KTtcblxuZXhwb3J0IGNvbnN0IE11aVN1Ym1pdEJ1dHRvbiA9IHBhcnRpYWxQcm9wcyhNdWlCdXR0b24sIHtcbiAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9TZW5kXCIpLFxuICB0aXRsZTogTGFuZ2BTdWJtaXRgLFxufSk7XG5cbmV4cG9ydCBjb25zdCBNdWlFZGl0QnV0dG9uID0gcGFydGlhbFByb3BzKE11aUJ1dHRvbiwge1xuICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0VkaXRcIiksXG4gIHRpdGxlOiBMYW5nYEVESVRgLFxufSk7XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG1lcmdlUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvbWVyZ2VQcm9wc1wiO1xuaW1wb3J0IHsgTXVpQnV0dG9uLCBNdWlCdXR0b25Qcm9wcyB9IGZyb20gXCIuL011aUJ1dHRvblwiO1xuaW1wb3J0IHsgTXVpRGFuZ2VyRGlhbG9nLCBNdWlEYW5nZXJEaWFsb2dQcm9wcyB9IGZyb20gXCIuL011aURhbmdlckRpYWxvZ1wiO1xuXG5leHBvcnQgdHlwZSBNdWlEYW5nZXJCdXR0b25Qcm9wcyA9IE11aUJ1dHRvblByb3BzPHtcbiAgTXVpRGFuZ2VyRGlhbG9nUHJvcHM/OiBQYXJ0aWFsPE11aURhbmdlckRpYWxvZ1Byb3BzPjtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpRGFuZ2VyQnV0dG9uKHtcbiAgTXVpRGFuZ2VyRGlhbG9nUHJvcHMsXG4gIG9uQ2xpY2ssXG4gIC4uLnByb3BzXG59OiBNdWlEYW5nZXJCdXR0b25Qcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxNdWlCdXR0b25cbiAgICAgIGRhbmdlclxuICAgICAgey4uLnByb3BzfVxuICAgICAgcmVuZGVyT25DbGljaz17KGNsb3NlKSA9PiAoXG4gICAgICAgIDxNdWlEYW5nZXJEaWFsb2dcbiAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhNdWlEYW5nZXJEaWFsb2dQcm9wcywge1xuICAgICAgICAgICAgb25DYW5jZWw6ICgpID0+IGNsb3NlKCksXG4gICAgICAgICAgICBvbkNvbmZpcm06IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgICBvbkNsaWNrPy4oZXZlbnQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KX1cbiAgICAgICAgICBvcGVuXG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIC8+XG4gICk7XG59XG4iLCJpbXBvcnQgVHlwb2dyYXBoeSwgeyBUeXBvZ3JhcGh5UHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE92ZXJyaWRlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9PdmVycmlkZVwiO1xuaW1wb3J0IHsgTXVpRGlhbG9nLCBNdWlEaWFsb2dQcm9wcyB9IGZyb20gXCIuL011aURpYWxvZ1wiO1xuaW1wb3J0IHsgTGFuZywgTGFuZ05vZGUgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyBSZWFjdENhbGxiYWNrIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L1JlYWN0Q2FsbGJhY2tcIjtcbmltcG9ydCB7IE11aUJ1dHRvbiwgTXVpQ2FuY2VsQnV0dG9uLCBNdWlDb25maXJtQnV0dG9uIH0gZnJvbSBcIi4vTXVpQnV0dG9uXCI7XG5cbmV4cG9ydCB0eXBlIE11aURhbmdlckRpYWxvZ1Byb3BzID0gT3ZlcnJpZGU8XG4gIE11aURpYWxvZ1Byb3BzLFxuICB7XG4gICAgVHlwb2dyYXBoeVByb3BzPzogVHlwb2dyYXBoeVByb3BzO1xuXG4gICAgYWN0aW9uVGl0bGU/OiBMYW5nTm9kZTtcbiAgICB0aXRsZT86IFJlYWN0Tm9kZTtcbiAgICBvYmplY3RUaXRsZT86IExhbmdOb2RlO1xuICAgIHRleHQ/OiBSZWFjdE5vZGU7XG5cbiAgICBvbkNhbmNlbD86IFJlYWN0Q2FsbGJhY2s7XG4gICAgb25Db25maXJtPzogUmVhY3RDYWxsYmFjaztcbiAgfVxuPjtcbmNvbnN0IERFRkFVTFRfVElUTEUgPSBMYW5nYENPTkZJUk1fVE9fJHtcImFjdGlvblwifWA7XG5jb25zdCBERUZBVUxUX1RFWFQgPSBMYW5nYFlPVV9BUkVfU1VSRV9ZT1VfV0FOVF9UT18ke1wiYWN0aW9uXCJ9XyR7XCJvYmplY3RcIn0/YDtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aURhbmdlckRpYWxvZyh7XG4gIG9uQ2FuY2VsLFxuICBvbkNvbmZpcm0sXG4gIGFjdGlvblRpdGxlLFxuICBvYmplY3RUaXRsZSxcbiAgdGl0bGUsXG4gIHRleHQsXG4gIFR5cG9ncmFwaHlQcm9wcyxcbiAgLi4uTXVpRGlhbG9nUHJvcHNcbn06IE11aURhbmdlckRpYWxvZ1Byb3BzKSB7XG4gIGNvbnN0IGFjdGlvbiA9IGFjdGlvblRpdGxlID8/IExhbmdgQUNUSU9OYDtcbiAgcmV0dXJuIChcbiAgICA8TXVpRGlhbG9nXG4gICAgICB7Li4uTXVpRGlhbG9nUHJvcHN9XG4gICAgICB0aXRsZT17dGl0bGUgPz8gREVGQVVMVF9USVRMRSh7IGFjdGlvbiB9KX1cbiAgICAgIGFjdGlvbnM9e1xuICAgICAgICA8PlxuICAgICAgICAgIDxNdWlDYW5jZWxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgb25DYW5jZWw/LihldmVudCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPE11aUNvbmZpcm1CdXR0b25cbiAgICAgICAgICAgIGRhbmdlclxuICAgICAgICAgICAgdGl0bGU9e0xhbmdgQ09ORklSTWB9XG4gICAgICAgICAgICBvbkNsaWNrPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgIG9uQ29uZmlybT8uKGV2ZW50KTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICB9XG4gICAgPlxuICAgICAgPFR5cG9ncmFwaHkgey4uLlR5cG9ncmFwaHlQcm9wc30+XG4gICAgICAgIHt0ZXh0ID8/XG4gICAgICAgICAgREVGQVVMVF9URVhUKHtcbiAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgIG9iamVjdDogb2JqZWN0VGl0bGUgPz8gTGFuZ2BPQkpFQ1RgLFxuICAgICAgICAgIH0pfVxuICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgIDwvTXVpRGlhbG9nPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL092ZXJyaWRlXCI7XG5pbXBvcnQgeyBNdWlEYW5nZXJCdXR0b24sIE11aURhbmdlckJ1dHRvblByb3BzIH0gZnJvbSBcIi4vTXVpRGFuZ2VyQnV0dG9uXCI7XG5pbXBvcnQgeyBMYW5nLCBMYW5nTm9kZSB9IGZyb20gXCIuLi8uLi8uLi9sYW5nL0xhbmdcIjtcbmltcG9ydCB7IG1lcmdlUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvbWVyZ2VQcm9wc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpRGVsZXRlQnV0dG9uKHtcbiAgb2JqZWN0VGl0bGUsXG4gIC4uLnByb3BzXG59OiBPdmVycmlkZTxcbiAgTXVpRGFuZ2VyQnV0dG9uUHJvcHMsXG4gIHtcbiAgICBvYmplY3RUaXRsZT86IExhbmdOb2RlO1xuICB9XG4+KSB7XG4gIHJldHVybiAoXG4gICAgPE11aURhbmdlckJ1dHRvblxuICAgICAgaWNvbj17cmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9EZWxldGVcIil9XG4gICAgICB0aXRsZT17TGFuZ2BERUxFVEVgfVxuICAgICAgey4uLm1lcmdlUHJvcHMocHJvcHMsIHtcbiAgICAgICAgTXVpRGFuZ2VyRGlhbG9nUHJvcHM6IHtcbiAgICAgICAgICBvYmplY3RUaXRsZSxcbiAgICAgICAgICBhY3Rpb25UaXRsZTogTGFuZ2BERUxFVEVgLFxuICAgICAgICB9LFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn1cbiIsImltcG9ydCBEaWFsb2csIHsgRGlhbG9nUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nXCI7XG5pbXBvcnQgRGlhbG9nQWN0aW9ucywge1xuICBEaWFsb2dBY3Rpb25zUHJvcHMsXG59IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dBY3Rpb25zXCI7XG5pbXBvcnQgRGlhbG9nQ29udGVudCwge1xuICBEaWFsb2dDb250ZW50UHJvcHMsXG59IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dDb250ZW50XCI7XG5pbXBvcnQgRGlhbG9nVGl0bGUsIHsgRGlhbG9nVGl0bGVQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dUaXRsZVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIE11aUJ1dHRvbixcbiAgTXVpQnV0dG9uUHJvcHMsXG4gIE11aUNhbmNlbEJ1dHRvbixcbiAgTXVpU3VibWl0QnV0dG9uLFxufSBmcm9tIFwiLi9NdWlCdXR0b25cIjtcblxuaW1wb3J0IHsgbWVyZ2VQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9tZXJnZVByb3BzXCI7XG5cbmV4cG9ydCB0eXBlIE11aURpYWxvZ1Byb3BzID0gT21pdDxEaWFsb2dQcm9wcywgXCJ0aXRsZVwiPiAmIHtcbiAgY29udGVudD86IFJlYWN0Tm9kZTtcbiAgYWN0aW9ucz86IFJlYWN0Tm9kZTtcbiAgdGl0bGU/OiBSZWFjdE5vZGU7XG4gIERpYWxvZ0NvbnRlbnRQcm9wcz86IERpYWxvZ0NvbnRlbnRQcm9wcztcbiAgRGlhbG9nQWN0aW9uc1Byb3BzPzogRGlhbG9nQWN0aW9uc1Byb3BzO1xuICBEaWFsb2dUaXRsZVByb3BzPzogRGlhbG9nVGl0bGVQcm9wcztcbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG5cbiAgTXVpU3VibWl0QnV0dG9uc1Byb3BzPzogTXVpQnV0dG9uUHJvcHM7XG4gIE11aUNhbmNlbEJ1dHRvblByb3BzPzogTXVpQnV0dG9uUHJvcHM7XG4gIG9uU3VibWl0PygpOiB2b2lkO1xuICBvbkNhbmNlbD8oKTogdm9pZDtcblxuICAvLyBNdWlBY3Rpb25zUHJvcHM/OiBNdWlBY3Rpb25zUHJvcHM8QyxcInN1Ym1pdFwifFwiY2FuY2VsXCI+XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpRGlhbG9nKHtcbiAgY29udGVudCxcbiAgYWN0aW9ucyxcbiAgdGl0bGUsXG4gIGNoaWxkcmVuLFxuICBEaWFsb2dDb250ZW50UHJvcHMsXG4gIERpYWxvZ0FjdGlvbnNQcm9wcyxcbiAgRGlhbG9nVGl0bGVQcm9wcyxcbiAgb25DYW5jZWwsXG4gIG9uU3VibWl0LFxuICBNdWlDYW5jZWxCdXR0b25Qcm9wcyxcbiAgTXVpU3VibWl0QnV0dG9uc1Byb3BzLFxuICAuLi5EaWFsb2dQcm9wc1xufTogTXVpRGlhbG9nUHJvcHMpIHtcbiAgaWYgKG9uQ2FuY2VsIHx8IG9uU3VibWl0KSB7XG4gICAgYWN0aW9ucyA9IChcbiAgICAgIDw+XG4gICAgICAgIHtvblN1Ym1pdCAmJiAoXG4gICAgICAgICAgPE11aVN1Ym1pdEJ1dHRvblxuICAgICAgICAgICAgey4uLm1lcmdlUHJvcHMoTXVpU3VibWl0QnV0dG9uc1Byb3BzLCB7XG4gICAgICAgICAgICAgIG9uQ2xpY2soKSB7XG4gICAgICAgICAgICAgICAgb25TdWJtaXQoKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHthY3Rpb25zfVxuICAgICAgICB7b25DYW5jZWwgJiYgKFxuICAgICAgICAgIDxNdWlDYW5jZWxCdXR0b25cbiAgICAgICAgICAgIHsuLi5tZXJnZVByb3BzKE11aUNhbmNlbEJ1dHRvblByb3BzLCB7XG4gICAgICAgICAgICAgIG9uQ2xpY2soKSB7XG4gICAgICAgICAgICAgICAgb25DYW5jZWwoKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8Lz5cbiAgICApO1xuICB9XG4gIHJldHVybiAoXG4gICAgPERpYWxvZyB7Li4uRGlhbG9nUHJvcHN9PlxuICAgICAge3RpdGxlICYmIDxEaWFsb2dUaXRsZSB7Li4uRGlhbG9nVGl0bGVQcm9wc30+e3RpdGxlfTwvRGlhbG9nVGl0bGU+fVxuICAgICAgeyhjb250ZW50IHx8IGNoaWxkcmVuKSAmJiAoXG4gICAgICAgIDxEaWFsb2dDb250ZW50IHsuLi5EaWFsb2dDb250ZW50UHJvcHN9PlxuICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9EaWFsb2dDb250ZW50PlxuICAgICAgKX1cbiAgICAgIHthY3Rpb25zICYmIChcbiAgICAgICAgPERpYWxvZ0FjdGlvbnMgey4uLkRpYWxvZ0FjdGlvbnNQcm9wc30+e2FjdGlvbnN9PC9EaWFsb2dBY3Rpb25zPlxuICAgICAgKX1cbiAgICA8L0RpYWxvZz5cbiAgKTtcbn1cbiIsImltcG9ydCBHcmlkLCB7R3JpZFByb3BzfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvR3JpZFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7IGltcG9ydCB7Q2hpbGRyZW59IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgdHlwZSBNdWlHcmlkUHJvcHMgPSB7IGl0ZW0/OiBHcmlkUHJvcHMgfSAmIE9taXQ8R3JpZFByb3BzLCBcIml0ZW1cIiB8IFwiY29udGFpbmVyXCI+O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpR3JpZCh7aXRlbSwgY2hpbGRyZW4sIC4uLnByb3BzfTogTXVpR3JpZFByb3BzKSB7XG4gICAgcmV0dXJuIDxHcmlkIHsuLi5wcm9wc30gY29udGFpbmVyPlxuICAgICAgICB7Q2hpbGRyZW4ubWFwKGNoaWxkcmVuLCBjaGlsZCA9PiA8R3JpZCB7Li4uaXRlbX0gaXRlbT5cbiAgICAgICAgICAgIHtjaGlsZH1cbiAgICAgICAgPC9HcmlkPil9XG4gICAgPC9HcmlkPlxufVxuXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENvbXBvbmVudENsYXNzLCBjcmVhdGVFbGVtZW50LCBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEVtcHR5RnJhZ21lbnQgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvRW1wdHlGcmFnbWVudFwiO1xuXG5jb25zdCBNdWlJY29uTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBzdWJtaXQ6IFwic2VuZFwiLFxuICByZXNldDogXCJjbGVhclwiLFxufTtcblxuZXhwb3J0IHR5cGUgTXVpSWNvbiA9IHN0cmluZyB8IHsgZGVmYXVsdDogQ29tcG9uZW50Q2xhc3MgfSB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aUljb24oYXJnOiBNdWlJY29uKTogUmVhY3RFbGVtZW50IHtcbiAgaWYgKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIGFyZyA/IChcbiAgICAgIDxpIGNsYXNzTmFtZT17XCJtYXRlcmlhbC1pY29uc1wifT57TXVpSWNvbk1hcFthcmddID8/IGFyZ308L2k+XG4gICAgKSA6IChcbiAgICAgIDw+PC8+XG4gICAgKTtcbiAgaWYgKGFyZz8uZGVmYXVsdCkgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoYXJnLmRlZmF1bHQpO1xuXG4gIHJldHVybiBFbXB0eUZyYWdtZW50O1xufVxuIiwiaW1wb3J0IExpbmssIHsgTGlua1Byb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0xpbmtcIjtcbmltcG9ydCB7IG1ha2VTdHlsZXMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBtZXJnZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL21lcmdlUHJvcHNcIjtcblxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcyh7XG4gIHJvb3Q6IHtcbiAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICB9LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlMaW5rKHByb3BzOiBMaW5rUHJvcHMpIHtcbiAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xuICByZXR1cm4gKFxuICAgIDxMaW5rXG4gICAgICB7Li4ubWVyZ2VQcm9wcyhwcm9wcywge1xuICAgICAgICBjbGFzc05hbWU6IGNsYXNzZXMucm9vdCxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59XG4iLCJpbXBvcnQgeyBUYWJsZUNlbGxQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZVwiO1xuaW1wb3J0IFRhYmxlQ2VsbCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFibGVDZWxsXCI7XG5pbXBvcnQgeyBtYWtlU3R5bGVzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL092ZXJyaWRlXCI7XG5pbXBvcnQgeyBtZXJnZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL21lcmdlUHJvcHNcIjtcblxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcyh7XG4gIGZpdFRvQ29udGVudDoge1xuICAgIHdpZHRoOiBcIjElXCIsXG4gICAgd2hpdGVTcGFjZTogXCJub3dyYXBcIixcbiAgfSxcbn0pO1xuXG5leHBvcnQgdHlwZSBNdWlUYWJsZUNvbHVtblByb3BzID0gT3ZlcnJpZGU8XG4gIFRhYmxlQ2VsbFByb3BzLFxuICB7XG4gICAgZml0VG9Db250ZW50PzogYm9vbGVhbjtcbiAgfVxuPjtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aVRhYmxlQ2VsbCh7IGZpdFRvQ29udGVudCwgLi4ucHJvcHMgfTogTXVpVGFibGVDb2x1bW5Qcm9wcykge1xuICBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKCk7XG4gIHJldHVybiBjcmVhdGVFbGVtZW50KFxuICAgIFRhYmxlQ2VsbCxcbiAgICBtZXJnZVByb3BzKHByb3BzLCB7XG4gICAgICBjbGFzc05hbWU6IGNsYXNzZXMuZml0VG9Db250ZW50LFxuICAgIH0pXG4gICk7XG59XG4iLCJpbXBvcnQgR3JpZCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvR3JpZFwiO1xuaW1wb3J0IElucHV0QWRvcm5tZW50IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9JbnB1dEFkb3JubWVudFwiO1xuaW1wb3J0IFRleHRGaWVsZCwgeyBUZXh0RmllbGRQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UZXh0RmllbGRcIjtcbmltcG9ydCBUb29sYmFyLCB7IFRvb2xiYXJQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9Ub29sYmFyXCI7XG5pbXBvcnQgVG9vbHRpcCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVG9vbHRpcFwiO1xuaW1wb3J0IFR5cG9ncmFwaHksIHsgVHlwb2dyYXBoeVByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1R5cG9ncmFwaHlcIjtcbmltcG9ydCB7IG1ha2VTdHlsZXMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCI7XG5pbXBvcnQgY2xzeCBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdE5vZGUsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyB1c2VMYW5nVHJhbnNsYXRvciB9IGZyb20gXCIuLi8uLi8uLi9sYW5nL0xhbmdUcmFuc2xhdG9yXCI7XG5pbXBvcnQgeyBtZXJnZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL21lcmdlUHJvcHNcIjtcbmltcG9ydCB7IE11aUljb24gfSBmcm9tIFwiLi9NdWlJY29uXCI7XG5cbmNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXModGhlbWUgPT4gKHtcbiAgdG9vbGJhcjoge1xuICAgIHBhZGRpbmdMZWZ0OiB0aGVtZS5zcGFjaW5nKDIpLFxuICAgIHBhZGRpbmdSaWdodDogdGhlbWUuc3BhY2luZygxKSxcbiAgfSxcbiAgdGl0bGU6IHtcbiAgICBmbGV4OiBcIjEgMSAxMDAlXCIsXG4gIH0sXG4gIGhpZGRlbjoge1xuICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsXG4gIH0sXG59KSk7XG5cbmV4cG9ydCB0eXBlIE11aVRhYmxlVG9vbGJhclByb3BzID0ge1xuICBUb29sYmFyUHJvcHM/OiBUb29sYmFyUHJvcHM7XG5cbiAgc2VhcmNoPzoge1xuICAgIHRleHQ6IHN0cmluZztcbiAgICBvblNlYXJjaD8odGV4dDogc3RyaW5nKTtcbiAgICBUZXh0RmllbGRQcm9wcz86IFBhcnRpYWw8VGV4dEZpZWxkUHJvcHM+O1xuICB9O1xuXG4gIHRpdGxlPzogUmVhY3ROb2RlO1xuXG4gIFRpdGxlVHlwb2dyYXBoeVByb3BzPzogVHlwb2dyYXBoeVByb3BzO1xuXG4gIHN0YXRpY0FjdGlvbnM/OiBSZWFjdE5vZGU7XG5cbiAgc2VsZWN0QWN0aW9ucz86IFJlYWN0Tm9kZTtcblxuICBjb3VudFNlbGVjdGVkSXRlbXM/OiBudW1iZXI7XG59O1xuXG5jb25zdCBDT1VOVF9TRUxFQ1RFRF9JVEVNUyA9IExhbmdgU0VMRUNURURfJHtcImNvdW50XCJ9X0lURU1TYDtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aVRhYmxlVG9vbGJhcihwcm9wczogTXVpVGFibGVUb29sYmFyUHJvcHMpIHtcbiAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xuICBjb25zdCB7IHNlYXJjaDogc2VhcmNoUHJvcHMgfSA9IHByb3BzO1xuXG4gIGNvbnN0IGxhbmcgPSB1c2VMYW5nVHJhbnNsYXRvcigpO1xuICBjb25zdCBbc2VhcmNoVGV4dCwgc2V0U2VhcmNoVGV4dF0gPSB1c2VTdGF0ZShwcm9wcy5zZWFyY2g/LnRleHQgfHwgXCJcIik7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRTZWFyY2hUZXh0KHByb3BzLnNlYXJjaD8udGV4dCB8fCBcIlwiKTtcbiAgfSwgW3Byb3BzLnNlYXJjaD8udGV4dF0pO1xuXG4gIGNvbnN0IHRpdGxlID0gcHJvcHMuY291bnRTZWxlY3RlZEl0ZW1zID8gKFxuICAgIDw+e0NPVU5UX1NFTEVDVEVEX0lURU1TKHsgY291bnQ6IHByb3BzLmNvdW50U2VsZWN0ZWRJdGVtcyB9KX08Lz5cbiAgKSA6IChcbiAgICBwcm9wcy50aXRsZVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPFRvb2xiYXJcbiAgICAgIHsuLi5tZXJnZVByb3BzKHByb3BzLlRvb2xiYXJQcm9wcywge1xuICAgICAgICBjbGFzc05hbWU6IGNsYXNzZXMudG9vbGJhcixcbiAgICAgIH0pfVxuICAgID5cbiAgICAgIDxHcmlkIGNvbnRhaW5lcj5cbiAgICAgICAgPEdyaWQgaXRlbSB4cz5cbiAgICAgICAgICB7dGl0bGUgJiYgKFxuICAgICAgICAgICAgPFR5cG9ncmFwaHlcbiAgICAgICAgICAgICAgdmFyaWFudD17XCJoNlwifVxuICAgICAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhwcm9wcy5UaXRsZVR5cG9ncmFwaHlQcm9wcywge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3Nlcy50aXRsZSxcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICApfVxuICAgICAgICA8L0dyaWQ+XG4gICAgICAgIDxHcmlkIGl0ZW0+XG4gICAgICAgICAge3Byb3BzLmNvdW50U2VsZWN0ZWRJdGVtcyA/IChcbiAgICAgICAgICAgIHByb3BzLnNlbGVjdEFjdGlvbnNcbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEdyaWQgY29udGFpbmVyIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAge3Byb3BzLnN0YXRpY0FjdGlvbnMgJiYgPEdyaWQgaXRlbT57cHJvcHMuc3RhdGljQWN0aW9uc308L0dyaWQ+fVxuICAgICAgICAgICAgICB7c2VhcmNoUHJvcHMgJiYgKFxuICAgICAgICAgICAgICAgIDxHcmlkIGl0ZW0+XG4gICAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hUZXh0fVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFuZy50cmFuc2xhdGVOb2RlKExhbmdgU0VBUkNIYCl9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5tZXJnZVByb3BzKHNlYXJjaFByb3BzLlRleHRGaWVsZFByb3BzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWFyY2hUZXh0KHRleHQgfHwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hQcm9wcz8ub25TZWFyY2g/Lih0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hQcm9wcz8ub25TZWFyY2g/LihzZWFyY2hUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bjogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWFyY2hUZXh0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hQcm9wcz8ub25TZWFyY2g/LihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uS2V5UHJlc3M6IGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHtldmVudEtleTpldmVudC5rZXl9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUHJvcHM/Lm9uU2VhcmNoPy4oc2VhcmNoVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkVzY2FwZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlYXJjaFRleHQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBJbnB1dFByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRBZG9ybm1lbnQ6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0QWRvcm5tZW50IHBvc2l0aW9uPXtcImVuZFwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VG9vbHRpcCB0aXRsZT17TGFuZ2BTRUFSQ0hgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtNdWlJY29uKFwic2VhcmNoXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVG9vbHRpcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEFkb3JubWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydEFkb3JubWVudDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRBZG9ybm1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Nsc3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzZXMuaGlkZGVuXTogIXNlYXJjaFRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb249e1wic3RhcnRcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWFyY2hUZXh0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7TXVpSWNvbihcImNsb3NlXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0QWRvcm5tZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvR3JpZD5cbiAgICAgIDwvR3JpZD5cbiAgICA8L1Rvb2xiYXI+XG4gICk7XG59XG4iLCJpbXBvcnQge1xuICBjcmVhdGVNdWlUaGVtZSxcbiAgVGhlbWUgYXMgTXVpQ29yZVRoZW1lLFxuICBUaGVtZVByb3ZpZGVyIGFzIE11aUNvcmVUaGVtZVByb3ZpZGVyLFxufSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCI7XG5pbXBvcnQge1xuICBqc3NQcmVzZXQsXG4gIFN0eWxlc1Byb3ZpZGVyIGFzIE11aUpzc1Byb3ZpZGVyLFxufSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCI7XG5pbXBvcnQgeyBjcmVhdGUgfSBmcm9tIFwianNzXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgYXMgU3R5bGVkVGhlbWVQcm92aWRlciB9IGZyb20gXCJzdHlsZWQtY29tcG9uZW50c1wiO1xuaW1wb3J0IHtcbiAgTGFuZ1RyYW5zbGF0b3IsXG4gIExhbmdUcmFuc2xhdG9yQ29udGV4dCxcbn0gZnJvbSBcIi4uLy4uL2xhbmcvTGFuZ1RyYW5zbGF0b3JcIjtcblxuZGVjbGFyZSBtb2R1bGUgXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIiB7XG4gIGludGVyZmFjZSBEZWZhdWx0VGhlbWUgZXh0ZW5kcyBNdWlDb3JlVGhlbWUge31cbn1cbmRlY2xhcmUgbW9kdWxlIFwic3R5bGVkLWNvbXBvbmVudHNcIiB7XG4gIGludGVyZmFjZSBEZWZhdWx0VGhlbWUgZXh0ZW5kcyBNdWlDb3JlVGhlbWUge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU11aVN5c3RlbSh7XG4gIGpzc1BsdWdpbnMgPSBbXSxcbiAgdGhlbWUgPSBjcmVhdGVNdWlUaGVtZSh7XG4gICAgcHJvcHM6IHtcbiAgICAgIE11aVRleHRGaWVsZDoge1xuICAgICAgICBmdWxsV2lkdGg6IHRydWUsXG4gICAgICB9LFxuICAgICAgTXVpRGlhbG9nOiB7XG4gICAgICAgIGZ1bGxXaWR0aDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSksXG59ID0ge30pIHtcbiAgY29uc3QgbGFuZ1RyYW5zbGF0b3IgPSBuZXcgTGFuZ1RyYW5zbGF0b3Ioe30pO1xuXG4gIGNvbnN0IGpzcyA9IGNyZWF0ZSh7XG4gICAgcGx1Z2luczogWy4uLmpzc1ByZXNldCgpLnBsdWdpbnMsIC4uLmpzc1BsdWdpbnNdLFxuICB9KTtcbiAgcmV0dXJuIHtcbiAgICBQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcbiAgICAgIGNoaWxkcmVuID0gY3JlYXRlRWxlbWVudChNdWlDb3JlVGhlbWVQcm92aWRlciwge1xuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgdGhlbWUsXG4gICAgICB9KTtcblxuICAgICAgY2hpbGRyZW4gPSBjcmVhdGVFbGVtZW50KFN0eWxlZFRoZW1lUHJvdmlkZXIsIHtcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIHRoZW1lLFxuICAgICAgfSk7XG5cbiAgICAgIGNoaWxkcmVuID0gY3JlYXRlRWxlbWVudChNdWlKc3NQcm92aWRlciwge1xuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAganNzLFxuICAgICAgfSk7XG5cbiAgICAgIGNoaWxkcmVuID0gY3JlYXRlRWxlbWVudChMYW5nVHJhbnNsYXRvckNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIHZhbHVlOiBsYW5nVHJhbnNsYXRvcixcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgfSxcbiAgfTtcbn1cbiIsImltcG9ydCBUeXBvZ3JhcGh5IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UeXBvZ3JhcGh5XCI7XG5pbXBvcnQgeyBlbWl0IH0gZnJvbSBcImNsdXN0ZXJcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IElmIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9ib29sZWFuXCI7XG5pbXBvcnQgeyBJcyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvYm9vbGVhbi9Jc1wiO1xuaW1wb3J0IHsgSXNFbXB0eU9iamVjdCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvYm9vbGVhbi9Jc0VtcHR5T2JqZWN0XCI7XG5pbXBvcnQgeyBPbWl0S2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvT21pdEtleXNcIjtcbmltcG9ydCB7IFBhcnRpYWxVbmRlZmluZWRLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9QYXJ0aWFsVW5kZWZpbmVkS2V5c1wiO1xuaW1wb3J0IHsgbWVyZ2VQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9tZXJnZVByb3BzXCI7XG5pbXBvcnQge1xuICBBbnlEYXRhTWFuYWdlcixcbiAgRGF0YU1hbmFnZXJUeXBlcyxcbiAgVERhdGFNYW5hZ2VyLFxufSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9kYXRhLW1hbmFnZXIvRGF0YU1hbmFnZXJcIjtcbmltcG9ydCB7XG4gIEFueURhdGFNYW5hZ2VyUm91dGVyLFxuICBEYXRhTWFuYWdlclJvdXRlcixcbn0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvZGF0YS1tYW5hZ2VyL0RhdGFNYW5hZ2VyUm91dGVyXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uLCBScGNUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvUnBjXCI7XG5pbXBvcnQgeyBGb3JtVmlld1Byb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybVZpZXdcIjtcbmltcG9ydCB7IElubGluZVdpZGdldFZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvaW5saW5lLXdpZGdldC9JbmxpbmVXaWRnZXRWaWV3XCI7XG5pbXBvcnQgeyBUYWJzV2lkZ2V0IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L3RhYnMtd2lkZ2V0L1RhYnNXaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFJvdXRlclZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvV2lkZ2V0Um91dGVyVmlld1wiO1xuaW1wb3J0IHsgTXVpQWRkQnV0dG9uLCBNdWlCdXR0b25Qcm9wcyB9IGZyb20gXCIuLi9jb21wb25lbnRzL011aUJ1dHRvblwiO1xuaW1wb3J0IHsgTXVpRGF0YVRhYmxlVmlldywgTXVpRGF0YVRhYmxlVmlld1Byb3BzIH0gZnJvbSBcIi4vTXVpRGF0YVRhYmxlVmlld1wiO1xuaW1wb3J0IHsgTXVpRm9ybVZpZXcsIE11aUZvcm1WaWV3UHJvcHMgfSBmcm9tIFwiLi9NdWlGb3JtVmlld1wiO1xuaW1wb3J0IHtcbiAgTXVpVGFic1dpZGdldFZpZXcsXG4gIE11aVRhYnNXaWRnZXRWaWV3UHJvcHMsXG4gIE11aVRhYlZpZXdQcm9wcyxcbn0gZnJvbSBcIi4vTXVpVGFic1dpZGdldFZpZXdcIjtcblxudHlwZSBfVHlwZXM8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4gPSBEYXRhTWFuYWdlclR5cGVzPFQ+ICYge307XG5cbmV4cG9ydCB0eXBlIE11aURhdGFNYW5hZ2VyVmlld1Byb3BzPFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlEYXRhTWFuYWdlcj4sXG4gIFQgZXh0ZW5kcyBURGF0YU1hbmFnZXIgPSBScGNUeXBlPEM+W1wiVENvbmZpZ0hvb2tcIl1bXCJURGF0YU1hbmFnZXJcIl1cbj4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAge1xuICAgIHJlbmRlckVkaXRJbnB1dDpcbiAgICAgIHwgRm9ybVZpZXdQcm9wczxScGNDb25uZWN0aW9uPF9UeXBlczxUPltcIkVkaXRGb3JtXCJdPj5bXCJpbnB1dFwiXVxuICAgICAgfCBJZjxJczxUW1wiQWRkSW5wdXRcIl0sIFRbXCJFZGl0SW5wdXRcIl0+LCB1bmRlZmluZWQ+O1xuXG4gICAgZWRpdFRhYnM6XG4gICAgICB8IE11aVRhYnNXaWRnZXRWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxUYWJzV2lkZ2V0PFRbXCJFZGl0VGFic1wiXT4+PltcInRhYnNcIl1cbiAgICAgIHwgSWY8SXNFbXB0eU9iamVjdDxUW1wiRWRpdFRhYnNcIl0+LCB1bmRlZmluZWQ+O1xuICB9LFxuICB7XG4gICAgY29ubmVjdGlvbjogQztcbiAgICByb3V0ZXI6IERhdGFNYW5hZ2VyUm91dGVyPFQ+O1xuXG4gICAgcmVuZGVyQWRkSW5wdXQ6IEZvcm1WaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxfVHlwZXM8VD5bXCJBZGRGb3JtXCJdPj5bXCJpbnB1dFwiXTtcblxuICAgIE11aUVkaXRGb3JtVGFiVmlld1Byb3BzPzogT21pdEtleXM8XG4gICAgICBNdWlUYWJWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxfVHlwZXM8VD5bXCJFZGl0Rm9ybVwiXT4+LFxuICAgICAgXCJyZW5kZXJcIlxuICAgID47XG5cbiAgICBNdWlEYXRhVGFibGVWaWV3UHJvcHM/OiBQYXJ0aWFsPFxuICAgICAgTXVpRGF0YVRhYmxlVmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248X1R5cGVzPFQ+W1wiVGFibGVcIl0+PlxuICAgID47XG5cbiAgICBNdWlBZGRGb3JtVmlld1Byb3BzPzogUGFydGlhbDxcbiAgICAgIE11aUZvcm1WaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxfVHlwZXM8VD5bXCJBZGRGb3JtXCJdPj5cbiAgICA+O1xuXG4gICAgTXVpRWRpdEZvcm1WaWV3UHJvcHM/OiBQYXJ0aWFsPFxuICAgICAgTXVpRm9ybVZpZXdQcm9wczxScGNDb25uZWN0aW9uPF9UeXBlczxUPltcIkVkaXRGb3JtXCJdPj5cbiAgICA+O1xuXG4gICAgTXVpQWRkQnV0dG9uUHJvcHM/OiBNdWlCdXR0b25Qcm9wcztcbiAgfVxuPjtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aURhdGFNYW5hZ2VyVmlldzxDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlEYXRhTWFuYWdlcj4+KFxuICBwcm9wczogTXVpRGF0YU1hbmFnZXJWaWV3UHJvcHM8Qz5cbikge1xuICBjb25zdCBfcm91dGVyID0gcHJvcHMucm91dGVyIGFzIEFueURhdGFNYW5hZ2VyUm91dGVyO1xuICBjb25zdCBkbSA9IHByb3BzIGFzIE11aURhdGFNYW5hZ2VyVmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248QW55RGF0YU1hbmFnZXI+PjtcblxuICAvLyBUT0RPOiBzYXZlIHRhYmxlIHF1ZXJ5IGFzIHN0YXRlXG5cbiAgLy8gVE9ETyBTYXZlIHRhYmxlIHN0YXRlIG9uIGxvY2F0aW9uIHN0YXRlXG4gIFdpZGdldFJvdXRlclZpZXcoX3JvdXRlciwgZG0uY29ubmVjdGlvbi50YWJsZSwgKHByb3BzLCB7IGxvY2F0aW9uIH0pID0+IHtcbiAgICAvLyB1c2VMb2NhdGlvblN0YXRlKGxvY2F0aW9uLnVzZVN0YXRlKFwiXCIpKVxuXG4gICAgLy8gbG9jYXRpb24uY3JlYXRlU3RhdGUoKVxuICAgIHJldHVybiAoXG4gICAgICA8TXVpRGF0YVRhYmxlVmlld1xuICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgIHsuLi5tZXJnZVByb3BzKGRtLk11aURhdGFUYWJsZVZpZXdQcm9wcywge1xuICAgICAgICAgIHRvb2xiYXJBY3Rpb25zOiB7XG4gICAgICAgICAgICBhZGQ6IHtcbiAgICAgICAgICAgICAgYnV0dG9uVHlwZTogTXVpQWRkQnV0dG9uLFxuICAgICAgICAgICAgICAuLi5kbS5NdWlBZGRCdXR0b25Qcm9wcyxcbiAgICAgICAgICAgICAgb25DbGljaygpIHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5hdChcImFkZFwiKS5wdXNoKCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FZGl0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLmF0KFwiZWRpdFwiLCB7IGlkOiBldmVudC5rZXkgfSkucHVzaCgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25EZWxldGVDbGljayhldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGRtLmNvbm5lY3Rpb24uZGVsZXRlKGV2ZW50LmtleSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSl9XG4gICAgICAvPlxuICAgICk7XG4gIH0pO1xuXG4gIFdpZGdldFJvdXRlclZpZXcoXG4gICAgX3JvdXRlci5hdChcImFkZFwiKSxcbiAgICBkbS5jb25uZWN0aW9uLmFkZCxcbiAgICAocHJvcHMsIHsgbG9jYXRpb24gfSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE11aUZvcm1WaWV3XG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIHsuLi5tZXJnZVByb3BzKGRtLk11aUFkZEZvcm1WaWV3UHJvcHMsIHtcbiAgICAgICAgICAgIG9uU3VibWl0KGlkKSB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLnBhcmVudC5hdChcImVkaXRcIiwgeyBpZCB9KS5wdXNoKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pfVxuICAgICAgICAgIGlucHV0PXtkbS5yZW5kZXJBZGRJbnB1dH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICApO1xuXG4gIFdpZGdldFJvdXRlclZpZXcoXG4gICAgX3JvdXRlci5hdChcImVkaXRcIiksXG4gICAgcGFyYW1zID0+IGRtLmNvbm5lY3Rpb24uZWRpdChwYXJhbXMuaWQpLFxuICAgIHtcbiAgICAgIHJlbmRlcldpZGdldChwcm9wcywgeyBsb2NhdGlvbiB9KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPElubGluZVdpZGdldFZpZXdcbiAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgIGNoaWxkcmVuPXsoeyB0YXJnZXRQcm9wczogcHJvcHMsIGlubGluZUVsZW1lbnQ6IHBhZ2UgfSkgPT4gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5PntwYWdlLnRpdGxlfTwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgICA8TXVpVGFic1dpZGdldFZpZXdcbiAgICAgICAgICAgICAgICAgIC8vIG9uVGFiQ2hhbmdlPXt9XG4gICAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgICB0YWJzPXt7XG4gICAgICAgICAgICAgICAgICAgIC4uLmRtLmVkaXRUYWJzLFxuICAgICAgICAgICAgICAgICAgICBmb3JtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uZG0uTXVpRWRpdEZvcm1UYWJWaWV3UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgcmVuZGVyOiBwcm9wcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8TXVpRm9ybVZpZXdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLm1lcmdlUHJvcHMoZG0uTXVpRWRpdEZvcm1WaWV3UHJvcHMsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VibWl0KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5wYXJlbnQucHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dD17ZG0ucmVuZGVyRWRpdElucHV0IHx8IGRtLnJlbmRlckFkZElucHV0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgfVxuICApO1xufVxuIiwiaW1wb3J0IFRhYmxlLCB7IFRhYmxlUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFibGVcIjtcbmltcG9ydCBUYWJsZUJvZHksIHsgVGFibGVCb2R5UHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFibGVCb2R5XCI7XG5pbXBvcnQgVGFibGVDZWxsIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UYWJsZUNlbGxcIjtcbmltcG9ydCBUYWJsZUZvb3RlciwgeyBUYWJsZUZvb3RlclByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1RhYmxlRm9vdGVyXCI7XG5pbXBvcnQgVGFibGVIZWFkLCB7IFRhYmxlSGVhZFByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1RhYmxlSGVhZFwiO1xuaW1wb3J0IFRhYmxlUGFnaW5hdGlvbiBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFibGVQYWdpbmF0aW9uXCI7XG5pbXBvcnQgVGFibGVSb3cgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1RhYmxlUm93XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENvbXBvbmVudFByb3BzLCBSZWFjdE5vZGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaGFzS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L2hhc0tleXNcIjtcbmltcG9ydCB7IG1hcE9iamVjdFRvQXJyYXkgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RUb0FycmF5XCI7XG5pbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL0FzeW5jXCI7XG5pbXBvcnQgeyBQYXJ0aWFsVW5kZWZpbmVkS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvUGFydGlhbFVuZGVmaW5lZEtleXNcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyBMYW5nS2V5IH0gZnJvbSBcIi4uLy4uLy4uL2xhbmcvTGFuZ0tleVwiO1xuaW1wb3J0IHsgVGFibGVMYXlvdXQgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvVGFibGVMYXlvdXRcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9ScGNcIjtcbmltcG9ydCB7IEFueURhdGFUYWJsZSB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL3dpZGdldC9kYXRhLXRhYmxlL0RhdGFUYWJsZVwiO1xuaW1wb3J0IHtcbiAgRGF0YVRhYmxlVmlldyxcbiAgRGF0YVRhYmxlVmlld1Byb3BzLFxufSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvZGF0YS10YWJsZS9EYXRhVGFibGVWaWV3XCI7XG5cbmltcG9ydCB7IFdpZGdldFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQgeyBNdWlCdXR0b24sIE11aUJ1dHRvblByb3BzIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvTXVpQnV0dG9uXCI7XG5pbXBvcnQgeyBNdWlEZWxldGVCdXR0b24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9NdWlEZWxldGVCdXR0b25cIjtcbmltcG9ydCB7IE11aVRhYmxlQ2VsbCwgTXVpVGFibGVDb2x1bW5Qcm9wcyB9IGZyb20gXCIuLi9jb21wb25lbnRzL011aVRhYmxlQ2VsbFwiO1xuaW1wb3J0IHtcbiAgTXVpVGFibGVUb29sYmFyLFxuICBNdWlUYWJsZVRvb2xiYXJQcm9wcyxcbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvTXVpVGFibGVUb29sYmFyXCI7XG5cbnR5cGUgTXVpRGF0YVRhYmxlVmlld0NvbHVtblByb3BzPFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlEYXRhVGFibGU+LFxuICBSb3dDb2x1bW4sXG4gIFJvd1xuPiA9IHtcbiAgTXVpVGFibGVDb2x1bW5Qcm9wcz86IE11aVRhYmxlQ29sdW1uUHJvcHM7XG4gIHRpdGxlPzogUmVhY3ROb2RlO1xuICByZW5kZXJSb3dDb2x1bW4/KFxuICAgIGRhdGE6IFJvd0NvbHVtbixcbiAgICBwcm9wczoge1xuICAgICAga2V5OiBzdHJpbmc7XG4gICAgICByb3c6IFdpZGdldFR5cGU8Qz5bXCJUeXBlc1wiXVtcIlJvd1dpdGhLZXlcIl07XG4gICAgfVxuICApOiBSZWFjdE5vZGU7XG59O1xuXG50eXBlIE11aURhdGFUYWJsZUFjdGlvbkV2ZW50PEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueURhdGFUYWJsZT4+ID0ge1xuICByb3c6IFdpZGdldFR5cGU8Qz5bXCJUeXBlc1wiXVtcIlJvd1dpdGhLZXlcIl07XG4gIGtleTogc3RyaW5nO1xuICBjb25uZWN0aW9uOiBScGNDb25uZWN0aW9uPFdpZGdldFR5cGU8Qz5bXCJUeXBlc1wiXVtcIlJvd0NvbnRyb2xsZXJcIl0+O1xuICB0YWJsZTogUmVhZG9ubHk8RGF0YVRhYmxlVmlldzxDPj47XG59O1xuXG5leHBvcnQgdHlwZSBNdWlEYXRhVGFibGVWaWV3UHJvcHM8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueURhdGFUYWJsZT4sXG4gIFJvdyA9IFdpZGdldFR5cGU8Qz5bXCJUeXBlc1wiXVtcIlJvd1wiXVxuPiA9IERhdGFUYWJsZVZpZXdQcm9wczxDPiAmIHtcbiAgVGFibGVQcm9wcz86IFRhYmxlUHJvcHM7XG4gIFRhYmxlSGVhZFByb3BzPzogVGFibGVIZWFkUHJvcHM7XG4gIFRhYmxlQm9keVByb3BzPzogVGFibGVCb2R5UHJvcHM7XG4gIFRhYmxlRm9vdGVyUHJvcHM/OiBUYWJsZUZvb3RlclByb3BzO1xuXG4gIGRpc2FibGVUb29sYmFyPzogYm9vbGVhbjtcblxuICBNdWlUYWJsZVRvb2xiYXJQcm9wcz86IE9taXQ8TXVpVGFibGVUb29sYmFyUHJvcHMsIFwiYWN0aW9uc1wiPjtcblxuICAvLyBUT0RPOiBvbkFkZENsaWNrXG5cbiAgLy8gVE9ETzogc2VsZWN0QWN0aW9uc1xuXG4gIC8vIEFzc2lnbjxNdWlEYXRhVGFibGVBY3Rpb25Qcm9wcywge30+XG4gIHRvb2xiYXJBY3Rpb25zPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBNdWlCdXR0b25Qcm9wczx7XG4gICAgICBvbkNsaWNrKHByb3BzOiB7IHRhYmxlOiBSZWFkb25seTxEYXRhVGFibGVWaWV3PEM+PiB9KTtcbiAgICB9PlxuICA+O1xuXG4gIGNvbHVtbnM/OiBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAgICB7XG4gICAgICBbSyBpbiBrZXlvZiBSZXF1aXJlZDxSb3c+XTpcbiAgICAgICAgfCB1bmRlZmluZWRcbiAgICAgICAgfCBNdWlEYXRhVGFibGVWaWV3Q29sdW1uUHJvcHM8QywgUm93W0tdLCBSb3c+O1xuICAgIH1cbiAgPjtcblxuICBvbkVkaXRDbGljaz8oZXZlbnQ6IE11aURhdGFUYWJsZUFjdGlvbkV2ZW50PEM+KTogdm9pZDtcblxuICBvbkRlbGV0ZUNsaWNrPyhldmVudDogTXVpRGF0YVRhYmxlQWN0aW9uRXZlbnQ8Qz4pOiBBd2FpdGFibGU7XG5cbiAgYWN0aW9ucz86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgTXVpQnV0dG9uUHJvcHM8e1xuICAgICAgdmlzaWJsZT86IChyb3c6IFJvdykgPT4gYm9vbGVhbjtcbiAgICAgIG9uQ2xpY2s/KGV2ZW50OiBNdWlEYXRhVGFibGVBY3Rpb25FdmVudDxDPik7XG4gICAgfT5cbiAgPjtcblxuICB0aXRsZT86IFJlYWN0Tm9kZTtcblxuICBNdWlEZWxldGVCdXR0b25Qcm9wcz86IFBhcnRpYWw8Q29tcG9uZW50UHJvcHM8dHlwZW9mIE11aURlbGV0ZUJ1dHRvbj4+O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aURhdGFUYWJsZVZpZXc8QyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55RGF0YVRhYmxlPj4oXG4gIHByb3BzOiBNdWlEYXRhVGFibGVWaWV3UHJvcHM8Qz5cbikge1xuICBsZXQge1xuICAgIFRhYmxlUHJvcHMsXG4gICAgVGFibGVIZWFkUHJvcHMsXG4gICAgVGFibGVCb2R5UHJvcHMsXG4gICAgVGFibGVGb290ZXJQcm9wcyxcbiAgICBvbkRlbGV0ZUNsaWNrLFxuICAgIG9uRWRpdENsaWNrLFxuICAgIGFjdGlvbnMsXG4gICAgY29sdW1ucyxcbiAgICBNdWlUYWJsZVRvb2xiYXJQcm9wcyxcbiAgICBNdWlEZWxldGVCdXR0b25Qcm9wcyxcbiAgICB0b29sYmFyQWN0aW9ucyA9IHt9LFxuICAgIGRpc2FibGVUb29sYmFyLFxuICAgIHRpdGxlLFxuICAgIC4uLm5leHRQcm9wc1xuICB9ID0gcHJvcHMgYXMgTXVpRGF0YVRhYmxlVmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248QW55RGF0YVRhYmxlPj47XG5cbiAgY29uc3QgdGFibGVSZWYgPSB1c2VSZWY8RGF0YVRhYmxlVmlldzxDPj4obnVsbCk7XG5cbiAgYWN0aW9ucyA9IHsgLi4uYWN0aW9ucyB9O1xuXG4gIG9uRWRpdENsaWNrICYmXG4gICAgKGFjdGlvbnMuYWRkID0ge1xuICAgICAgdGl0bGU6IExhbmdgRURJVGAsXG4gICAgICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0VkaXRcIiksXG4gICAgICBvbkNsaWNrOiBvbkVkaXRDbGljayxcbiAgICB9KTtcblxuICBvbkRlbGV0ZUNsaWNrICYmXG4gICAgKGFjdGlvbnMuZGVsZXRlID0ge1xuICAgICAgYnV0dG9uVHlwZTogTXVpRGVsZXRlQnV0dG9uLFxuICAgICAgb25DbGljazogYXN5bmMgZXZlbnQgPT4ge1xuICAgICAgICBhd2FpdCBvbkRlbGV0ZUNsaWNrIShldmVudCk7XG4gICAgICAgIGF3YWl0IHRhYmxlUmVmLmN1cnJlbnQhLnJlbG9hZEFmdGVyUmVtb3ZlKGV2ZW50LmtleSk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPERhdGFUYWJsZVZpZXcgey4uLm5leHRQcm9wc30gcmVmPXt0YWJsZVJlZn0+XG4gICAgICB7dGFibGUgPT4gKFxuICAgICAgICA8VGFibGVMYXlvdXQ8eyAka2V5OiBzdHJpbmcgfSwgeyBzb3J0YWJsZTogYm9vbGVhbiB9LCBhbnk+XG4gICAgICAgICAgZ2V0Um93S2V5PXtyb3cgPT4gcm93LiRrZXl9XG4gICAgICAgICAgZ2V0Um93RGF0YT17cm93ID0+IHJvd31cbiAgICAgICAgICByb3dzPXt0YWJsZS5yb3dzfVxuICAgICAgICAgIGNvbHVtbnM9e3RhYmxlLmVsZW1lbnQ/LmNvbHVtbnMgfHwge319XG4gICAgICAgICAgcmVuZGVyQ29sdW1uVGl0bGU9e2NvbHVtbiA9PiAoXG4gICAgICAgICAgICA8TGFuZ0tleSBmb3I9e2NvbHVtbi5rZXl9Pntjb2x1bW5zPy5bY29sdW1uLmtleV0/LnRpdGxlfTwvTGFuZ0tleT5cbiAgICAgICAgICApfVxuICAgICAgICAgIHJlbmRlckNvbHVtbj17KGNvbHVtbiwgY2hpbGRyZW4pID0+IChcbiAgICAgICAgICAgIDxUYWJsZUNlbGxcbiAgICAgICAgICAgICAga2V5PXtjb2x1bW4ua2V5fVxuICAgICAgICAgICAgICB7Li4uY29sdW1ucz8uW2NvbHVtbi5rZXldPy5NdWlUYWJsZUNvbHVtblByb3BzfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L1RhYmxlQ2VsbD5cbiAgICAgICAgICApfVxuICAgICAgICAgIHJlbmRlclJvdz17KHJvdywgY2hpbGRyZW4pID0+IChcbiAgICAgICAgICAgIDxUYWJsZVJvdyBrZXk9e3Jvdy5rZXl9PlxuICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgIHtoYXNLZXlzKGFjdGlvbnMpICYmIChcbiAgICAgICAgICAgICAgICA8TXVpVGFibGVDZWxsIGZpdFRvQ29udGVudD5cbiAgICAgICAgICAgICAgICAgIHttYXBPYmplY3RUb0FycmF5KFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zISxcbiAgICAgICAgICAgICAgICAgICAgKHsgdmlzaWJsZSwgb25DbGljaywgLi4uTXVpQnV0dG9uUHJvcHMgfSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2libGUgJiYgIXZpc2libGUocm93LmRhdGEpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNdWlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbk9ubHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT17XCJzbWFsbFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLk11aUJ1dHRvblByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz8uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHJvdy5rZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uOiB0YWJsZS5wcm9wcy5jb25uZWN0aW9uLmNvbnRyb2xsZXIuZ2V0Um93Q29udHJvbGxlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmtleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvTXVpVGFibGVDZWxsPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHJlbmRlclJvd0NvbHVtbj17KGRhdGEsIHJvdywgY29sdW1uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHJlbmRlclJvd0NvbHVtbiB9ID0gY29sdW1ucz8uW2NvbHVtbi5rZXldIHx8IHt9O1xuXG4gICAgICAgICAgICBpZiAocmVuZGVyUm93Q29sdW1uKVxuICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyUm93Q29sdW1uKGRhdGEsIHtcbiAgICAgICAgICAgICAgICBrZXk6IHJvdy5rZXksXG4gICAgICAgICAgICAgICAgcm93OiByb3cuZGF0YSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKGRhdGEpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgcmVuZGVyPXsoeyBjb2x1bW5zLCByb3dzIH0pID0+IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIHshZGlzYWJsZVRvb2xiYXIgJiYgKFxuICAgICAgICAgICAgICAgIDxNdWlUYWJsZVRvb2xiYXJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgIHsuLi5NdWlUYWJsZVRvb2xiYXJQcm9wc31cbiAgICAgICAgICAgICAgICAgIHNlYXJjaD17XG4gICAgICAgICAgICAgICAgICAgICF0YWJsZS5lbGVtZW50Py5zZWFyY2hhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdGFibGUuc2VhcmNoVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWFyY2g6IGFzeW5jIHRleHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLnNlYXJjaCh0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHN0YXRpY0FjdGlvbnM9e21hcE9iamVjdFRvQXJyYXkoXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXJBY3Rpb25zLFxuICAgICAgICAgICAgICAgICAgICAocHJvcHMsIGtleSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxNdWlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25Pbmx5XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMub25DbGljaz8uKHsgdGFibGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPFRhYmxlIHsuLi5UYWJsZVByb3BzfT5cbiAgICAgICAgICAgICAgICA8VGFibGVIZWFkIHsuLi5UYWJsZUhlYWRQcm9wc30+XG4gICAgICAgICAgICAgICAgICB7IXRhYmxlLmlzTG9hZGluZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvdz5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29sdW1uc31cbiAgICAgICAgICAgICAgICAgICAgICB7aGFzS2V5cyhhY3Rpb25zKSAmJiA8TXVpVGFibGVDZWxsIGZpdFRvQ29udGVudCAvPn1cbiAgICAgICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9UYWJsZUhlYWQ+XG4gICAgICAgICAgICAgICAgPFRhYmxlQm9keSB7Li4uVGFibGVCb2R5UHJvcHN9PlxuICAgICAgICAgICAgICAgICAge3RhYmxlLmlzTG9hZGluZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvdz5cbiAgICAgICAgICAgICAgICAgICAgICA8VGFibGVDZWxsIGNvbFNwYW49ezEwMDB9IGFsaWduPXtcImNlbnRlclwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtMYW5nYExPQURJTkdfSU5fUFJPR1JFU1NgfVxuICAgICAgICAgICAgICAgICAgICAgIDwvVGFibGVDZWxsPlxuICAgICAgICAgICAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAge3Jvd3MubGVuZ3RoID8gKFxuICAgICAgICAgICAgICAgICAgICByb3dzXG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8VGFibGVSb3c+XG4gICAgICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbCBjb2xTcGFuPXsxMDAwfSBhbGlnbj17XCJjZW50ZXJcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7TGFuZ2BOT19IQVZFX01PUkVfUk9XU2B9XG4gICAgICAgICAgICAgICAgICAgICAgPC9UYWJsZUNlbGw+XG4gICAgICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvVGFibGVCb2R5PlxuICAgICAgICAgICAgICAgIDxUYWJsZUZvb3RlciB7Li4uVGFibGVGb290ZXJQcm9wc30+XG4gICAgICAgICAgICAgICAgICA8VGFibGVSb3c+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICBjb3VudD17dGFibGUucGFnZVNpemV9XG4gICAgICAgICAgICAgICAgICAgICAgcGFnZT17dGFibGUucGFnZUluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgIHJvd3NQZXJQYWdlPXt0YWJsZS5wYWdlU2l6ZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZVJvd3NQZXJQYWdlPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5zZXRQYWdlU2l6ZShwYXJzZUludChldmVudC50YXJnZXQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlUGFnZT17KGV2ZW50LCBwYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5zZXRQYWdlSW5kZXgocGFnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgICAgICAgPC9UYWJsZUZvb3Rlcj5cbiAgICAgICAgICAgICAgPC9UYWJsZT5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvRGF0YVRhYmxlVmlldz5cbiAgKTtcbn1cbiIsImltcG9ydCBHcmlkIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9HcmlkXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBtZXJnZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL21lcmdlUHJvcHNcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9ScGNcIjtcbmltcG9ydCB7IEFueUZvcm0gfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvZm9ybS9Gb3JtXCI7XG5pbXBvcnQge1xuICBGb3JtVmlldyxcbiAgRm9ybVZpZXdFdmVudCxcbiAgRm9ybVZpZXdQcm9wcyxcbn0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybVZpZXdcIjtcblxuaW1wb3J0IHtcbiAgTXVpQnV0dG9uLFxuICBNdWlCdXR0b25Qcm9wcyxcbiAgTXVpUmVzZXRCdXR0b24sXG4gIE11aVN1Ym1pdEJ1dHRvbixcbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvTXVpQnV0dG9uXCI7XG5pbXBvcnQgeyBNdWlHcmlkIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvTXVpR3JpZFwiO1xuXG5leHBvcnQgdHlwZSBNdWlGb3JtVmlld1Byb3BzPEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueUZvcm0+PiA9IEZvcm1WaWV3UHJvcHM8XG4gIENcbj4gJiB7XG4gIE11aVN1Ym1pdEJ1dHRvblByb3BzPzogTXVpQnV0dG9uUHJvcHM7XG4gIE11aVJlc2V0QnV0dG9uUHJvcHM/OiBNdWlCdXR0b25Qcm9wcztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlGb3JtVmlldzxDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlGb3JtPj4oXG4gIHByb3BzOiBNdWlGb3JtVmlld1Byb3BzPEM+XG4pOiBSZWFjdEVsZW1lbnQge1xuICByZXR1cm4gKFxuICAgIDxGb3JtVmlldyB7Li4ucHJvcHN9PlxuICAgICAgeyh7IGlucHV0IH0pID0+IChcbiAgICAgICAgPEdyaWQgY29udGFpbmVyIGRpcmVjdGlvbj17XCJjb2x1bW5cIn0gc3BhY2luZz17Mn0+XG4gICAgICAgICAgPEdyaWQgaXRlbT57aW5wdXR9PC9HcmlkPlxuICAgICAgICAgIDxHcmlkIGl0ZW0+XG4gICAgICAgICAgICA8TXVpR3JpZCBzcGFjaW5nPXsyfSBqdXN0aWZ5PXtcImZsZXgtZW5kXCJ9PlxuICAgICAgICAgICAgICA8TXVpU3VibWl0QnV0dG9uXG4gICAgICAgICAgICAgICAgey4uLm1lcmdlUHJvcHMocHJvcHMuTXVpU3VibWl0QnV0dG9uUHJvcHMsIHtcbiAgICAgICAgICAgICAgICAgIGVtaXRPbkNsaWNrOiBlbWl0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdChuZXcgRm9ybVZpZXdFdmVudChcIlNVQk1JVFwiKSk7XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8TXVpUmVzZXRCdXR0b25cbiAgICAgICAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhwcm9wcy5NdWlSZXNldEJ1dHRvblByb3BzLCB7XG4gICAgICAgICAgICAgICAgICBlbWl0T25DbGljazogZW1pdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVtaXQobmV3IEZvcm1WaWV3RXZlbnQoXCJSRVNFVFwiKSk7XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9NdWlHcmlkPlxuICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgPC9HcmlkPlxuICAgICAgKX1cbiAgICA8L0Zvcm1WaWV3PlxuICApO1xufVxuXG4vKlxuXG5cbiAgPFJlYWN0b3JQcm92aWRlcj5cblxuICAgIDxSZWFjdG9yTGlzdGVuZXIgdG9FdmVudD0gb25FdmVudD0gLz5cblxuXG4gIDwvUmVhY3RvclByb3ZpZGVyPlxuXG4gKi9cbiIsImltcG9ydCBUYWIsIHsgVGFiUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFiXCI7XG5pbXBvcnQgVGFicywgeyBUYWJzUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFic1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdEVsZW1lbnQsIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZW50cmllcyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L2VudHJpZXNcIjtcbmltcG9ydCB7IGtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9rZXlzXCI7XG5pbXBvcnQgeyBMYW5nS2V5IH0gZnJvbSBcIi4uLy4uLy4uL2xhbmcvTGFuZ0tleVwiO1xuaW1wb3J0IHsgdXNlRW1pdHRlciB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC9yZWFjdG9yL3VzZUVtaXR0ZXJcIjtcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3JlbmRlcmVyXCI7XG5pbXBvcnQgeyBFbXB0eUZyYWdtZW50IH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL0VtcHR5RnJhZ21lbnRcIjtcbmltcG9ydCB7IG1lcmdlUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvbWVyZ2VQcm9wc1wiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL1JwY1wiO1xuaW1wb3J0IHsgQW55VGFic1dpZGdldCB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL3dpZGdldC90YWJzLXdpZGdldC9UYWJzV2lkZ2V0XCI7XG5pbXBvcnQgeyBUYWJzV2lkZ2V0VmlldyB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL3dpZGdldC90YWJzLXdpZGdldC9UYWJzV2lkZ2V0Vmlld1wiO1xuaW1wb3J0IHtcbiAgQW55V2lkZ2V0LFxuICBBbnlXaWRnZXRDb25uZWN0aW9uLFxuICBXaWRnZXRUeXBlLFxufSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQgeyBBbnlXaWRnZXRSZWNvcmQgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvd2lkZ2V0LW1hcC9XaWRnZXRNYXBcIjtcbmltcG9ydCB7IFdpZGdldFZpZXdQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL3dpZGdldC9XaWRnZXRWaWV3XCI7XG5pbXBvcnQgeyBNdWlJY29uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvTXVpSWNvblwiO1xuXG5leHBvcnQgdHlwZSBBbnlUYWJzV2lkZ2V0Q29ubmVjdGlvbiA9IFJwY0Nvbm5lY3Rpb248QW55VGFic1dpZGdldD47XG5cbmV4cG9ydCB0eXBlIFJlbmRlcmVyT3JQcm9wczxULCBQPiA9IFtQYXJ0aWFsPFQ+LCBSZW5kZXJlcjxQPl0gfCBSZW5kZXJlcjxQPjtcblxuZXhwb3J0IHR5cGUgTXVpVGFiVmlld1Byb3BzPEMgZXh0ZW5kcyBBbnlXaWRnZXRDb25uZWN0aW9uPiA9IHtcbiAgdGl0bGU/OiBSZWFjdE5vZGU7XG4gIGljb24/OiBNdWlJY29uO1xuICByZW5kZXI/KHByb3BzOiBXaWRnZXRWaWV3UHJvcHM8Qz4pOiBSZWFjdEVsZW1lbnQ7XG59O1xuXG5leHBvcnQgdHlwZSBNdWlUYWJzV2lkZ2V0Vmlld1Byb3BzPFxuICBDIGV4dGVuZHMgQW55VGFic1dpZGdldENvbm5lY3Rpb24sXG4gIFQgZXh0ZW5kcyBBbnlXaWRnZXRSZWNvcmQgPSBXaWRnZXRUeXBlPEM+W1wiVGFiTWFwXCJdXG4+ID0gV2lkZ2V0Vmlld1Byb3BzPEM+ICYge1xuICBUYWJzUHJvcHM/OiBUYWJzUHJvcHM7XG5cbiAgVGFiUHJvcHM/OiBUYWJQcm9wcztcbiAgU2VsZWN0ZWRUYWJQcm9wcz86IFRhYlByb3BzO1xuXG4gIHJlbmRlclRhYlBhbmVsPzogUmVuZGVyZXI8eyBjaGlsZHJlbjogUmVhY3RFbGVtZW50IHwgdW5kZWZpbmVkIH0+O1xuXG4gIGxvY2F0aW9uU3RhdGVLZXk/OiBzdHJpbmc7XG5cbiAgb25UYWJDaGFuZ2U/KGtleTogc3RyaW5nKTtcblxuICB0YWJzOiB7XG4gICAgW0sgaW4ga2V5b2YgVF0/OlxuICAgICAgfCBNdWlUYWJWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxUW0tdPj5cbiAgICAgIHwgTXVpVGFiVmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248VFtLXT4+W1wicmVuZGVyXCJdO1xuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aVRhYnNXaWRnZXRWaWV3PEMgZXh0ZW5kcyBBbnlUYWJzV2lkZ2V0Q29ubmVjdGlvbj4oXG4gIHByb3BzOiBNdWlUYWJzV2lkZ2V0Vmlld1Byb3BzPEM+XG4pIHtcbiAgY29uc3Qge1xuICAgIHRhYnM6IHRhYk9wdGlvbnNNYXAsXG4gICAgVGFic1Byb3BzLFxuICAgIFRhYlByb3BzLFxuICAgIFNlbGVjdGVkVGFiUHJvcHMsXG4gICAgcmVuZGVyVGFiUGFuZWwsXG4gICAgLi4ub3RoZXJQcm9wc1xuICB9ID0gcHJvcHMgYXMgTXVpVGFic1dpZGdldFZpZXdQcm9wczxBbnlUYWJzV2lkZ2V0Q29ubmVjdGlvbj47XG4gIGNvbnN0IGVtaXQgPSB1c2VFbWl0dGVyKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8VGFic1dpZGdldFZpZXcgey4uLm90aGVyUHJvcHN9PlxuICAgICAge3ZpZXcgPT4ge1xuICAgICAgICBjb25zdCB0YWJzOiBSZWFjdEVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBjb25zdCB7IGN1cnJlbnRUYWJQcm9wcyB9ID0gdmlldztcbiAgICAgICAgY29uc3QgY3VycmVudFRhYk9wdGlvbnMgPVxuICAgICAgICAgIGN1cnJlbnRUYWJQcm9wcyAmJiBnZXRUYWJPcHRpb25zKGN1cnJlbnRUYWJQcm9wcy5rZXkpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdGFiS2V5IG9mIGtleXMocHJvcHMuY29ubmVjdGlvbi5ycGMudGFiTWFwKSkge1xuICAgICAgICAgIGNvbnN0IHRhYk9wdGlvbnMgPSBnZXRUYWJPcHRpb25zKHRhYktleSk7XG5cbiAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gY3VycmVudFRhYlByb3BzPy5rZXkgPT09IHRhYktleTtcblxuICAgICAgICAgIHRhYnMucHVzaChcbiAgICAgICAgICAgIDxUYWJcbiAgICAgICAgICAgICAga2V5PXt0YWJLZXl9XG4gICAgICAgICAgICAgIHsuLi5UYWJQcm9wc31cbiAgICAgICAgICAgICAgey4uLihpc1NlbGVjdGVkID8gU2VsZWN0ZWRUYWJQcm9wcyA6IG51bGwpfVxuICAgICAgICAgICAgICBsYWJlbD17PExhbmdLZXkgZm9yPXt0YWJLZXl9Pnt0YWJPcHRpb25zPy50aXRsZX08L0xhbmdLZXk+fVxuICAgICAgICAgICAgICB2YWx1ZT17dGFiS2V5fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRhYkNvbnRlbnQ6IFJlYWN0RWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoY3VycmVudFRhYk9wdGlvbnM/LnJlbmRlcikge1xuICAgICAgICAgIHRhYkNvbnRlbnQgPSBjdXJyZW50VGFiT3B0aW9ucy5yZW5kZXI/LihjdXJyZW50VGFiUHJvcHMhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YWJzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHRhYkNvbnRlbnQgPz8gRW1wdHlGcmFnbWVudDtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8VGFic1xuICAgICAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhUYWJzUHJvcHMsIHtcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogKF8sIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgcHJvcHMub25UYWJDaGFuZ2U/LihrZXkpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpZXcuc3dpdGNoVG8oa2V5KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgdmFsdWU9e2N1cnJlbnRUYWJQcm9wcz8ua2V5fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGFic31cbiAgICAgICAgICAgIDwvVGFicz5cbiAgICAgICAgICAgIHtyZW5kZXJUYWJQYW5lbFxuICAgICAgICAgICAgICA/IHJlbmRlclRhYlBhbmVsKHsgY2hpbGRyZW46IHRhYkNvbnRlbnQgfSlcbiAgICAgICAgICAgICAgOiB0YWJDb250ZW50fVxuICAgICAgICAgIDwvPlxuICAgICAgICApO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldFRhYk9wdGlvbnMoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgICBpZiAodGFiT3B0aW9uc01hcClcbiAgICAgICAgICAgIHJldHVybiAodHlwZW9mIHRhYk9wdGlvbnNNYXBba2V5XSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgID8geyByZW5kZXI6IHRhYk9wdGlvbnNNYXBba2V5XSB9XG4gICAgICAgICAgICAgIDogdGFiT3B0aW9uc01hcFtrZXldKSBhc1xuICAgICAgICAgICAgICB8IE11aVRhYlZpZXdQcm9wczxBbnlXaWRnZXRDb25uZWN0aW9uPlxuICAgICAgICAgICAgICB8IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICA8L1RhYnNXaWRnZXRWaWV3PlxuICApO1xufVxuXG5leHBvcnQgY2xhc3MgTG9jYXRpb25TdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBrZXk6IHN0cmluZywgcHVibGljIHZhbHVlOiBhbnkpIHt9XG59XG4iLCJpbXBvcnQgQ2hlY2tib3gsIHsgQ2hlY2tib3hQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9DaGVja2JveFwiO1xuaW1wb3J0IEZvcm1Db250cm9sTGFiZWwsIHtcbiAgRm9ybUNvbnRyb2xMYWJlbFByb3BzLFxufSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvRm9ybUNvbnRyb2xMYWJlbFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE9taXRLZXlzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9PbWl0S2V5c1wiO1xuaW1wb3J0IHsgbWVyZ2VQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi8uLi9yZWFjdC91dGlscy9tZXJnZVByb3BzXCI7XG5pbXBvcnQgeyBCb29sSW5wdXQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXJwYy9pbnB1dC9ib29sLWlucHV0L0Jvb2xJbnB1dFwiO1xuaW1wb3J0IHtcbiAgQm9vbElucHV0VmlldyxcbiAgQm9vbElucHV0Vmlld1Byb3BzLFxufSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXJwYy9pbnB1dC9ib29sLWlucHV0L0Jvb2xJbnB1dFZpZXdcIjtcblxuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcnBjL1JwY1wiO1xuXG5leHBvcnQgdHlwZSBNdWlDaGVja0JveElucHV0Vmlld1Byb3BzPFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxCb29sSW5wdXQ+XG4+ID0gT21pdEtleXM8Qm9vbElucHV0Vmlld1Byb3BzPEM+LCBcImNoaWxkcmVuXCI+ICYge1xuICB0aXRsZT86IFJlYWN0Tm9kZTtcbiAgRm9ybUNvbnRyb2xMYWJlbFByb3BzPzogUGFydGlhbDxGb3JtQ29udHJvbExhYmVsUHJvcHM+O1xuICBDaGVja2JveFByb3BzPzogUGFydGlhbDxDaGVja2JveFByb3BzPjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlDaGVja2JveElucHV0VmlldzxDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxCb29sSW5wdXQ+Pih7XG4gIHRpdGxlLFxuICBDaGVja2JveFByb3BzLFxuICBGb3JtQ29udHJvbExhYmVsUHJvcHMsXG4gIC4uLnByb3BzXG59OiBNdWlDaGVja0JveElucHV0Vmlld1Byb3BzPEM+KSB7XG4gIHJldHVybiAoXG4gICAgPEJvb2xJbnB1dFZpZXcgey4uLnByb3BzfT5cbiAgICAgIHt2aWV3ID0+IHtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSAoXG4gICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhDaGVja2JveFByb3BzLCB7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlOiAoKSA9PiB2aWV3LnNldFZhbHVlKCF2aWV3LnZhbHVlKSxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgY2hlY2tlZD17dmlldy52YWx1ZX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB0aXRsZSA/IChcbiAgICAgICAgICA8Rm9ybUNvbnRyb2xMYWJlbFxuICAgICAgICAgICAgey4uLkZvcm1Db250cm9sTGFiZWxQcm9wc31cbiAgICAgICAgICAgIGxhYmVsPXt0aXRsZX1cbiAgICAgICAgICAgIGNvbnRyb2w9e2NoZWNrYm94fVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgY2hlY2tib3hcbiAgICAgICAgKTtcbiAgICAgIH19XG4gICAgPC9Cb29sSW5wdXRWaWV3PlxuICApO1xufVxuIiwiaW1wb3J0IERpYWxvZyBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nXCI7XG5pbXBvcnQgRGlhbG9nQ29udGVudCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nQ29udGVudFwiO1xuaW1wb3J0IERpYWxvZ1RpdGxlIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dUaXRsZVwiO1xuaW1wb3J0IFRleHRGaWVsZCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGV4dEZpZWxkXCI7XG5pbXBvcnQgeyBBdXRvY29tcGxldGUgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2xhYlwiO1xuaW1wb3J0IHsgbWFrZVN0eWxlcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgSWYgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW5cIjtcbmltcG9ydCB7IElzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9ib29sZWFuL0lzXCI7XG5pbXBvcnQgeyBQYXJ0aWFsVW5kZWZpbmVkS2V5cyB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb21tb24vdHlwaW5nczIvUGFydGlhbFVuZGVmaW5lZEtleXNcIjtcbmltcG9ydCB7IExhbmcsIExhbmdOb2RlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgdXNlTGFuZ1RyYW5zbGF0b3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vbGFuZy9MYW5nVHJhbnNsYXRvclwiO1xuaW1wb3J0IHsgQW55RGF0YUlucHV0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvaW5wdXQvZGF0YS1pbnB1dC9EYXRhSW5wdXRcIjtcbmltcG9ydCB7IERhdGFJbnB1dFZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXJwYy9pbnB1dC9kYXRhLWlucHV0L0RhdGFJbnB1dFZpZXdcIjtcblxuaW1wb3J0IHsgSW5wdXRUeXBlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvaW5wdXQvSW5wdXRcIjtcbmltcG9ydCB7IElucHV0Vmlld1Byb3BzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvaW5wdXQvSW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvUnBjXCI7XG5pbXBvcnQgeyBXaWRnZXRWaWV3TG9hZGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L1dpZGdldFZpZXdMb2FkZXJcIjtcbmltcG9ydCB7IE11aUxpbmsgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9NdWlMaW5rXCI7XG5pbXBvcnQgeyBNdWlEYXRhVGFibGVWaWV3IH0gZnJvbSBcIi4uL011aURhdGFUYWJsZVZpZXdcIjtcblxuZXhwb3J0IHR5cGUgQW55RGF0YUlucHV0Q29ubmVjdGlvbiA9IFJwY0Nvbm5lY3Rpb248QW55RGF0YUlucHV0PjtcblxuZXhwb3J0IGNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXModGhlbWUgPT4gKHt9KSk7XG5cbi8vIFRPRE86IExvYWQgdGhlIGZpcnN0cyByb3dzXG5leHBvcnQgZnVuY3Rpb24gTXVpRGF0YUlucHV0VmlldzxDIGV4dGVuZHMgQW55RGF0YUlucHV0Q29ubmVjdGlvbj4oXG4gIHByb3BzOiBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAgICB7XG4gICAgICBnZXRMYWJlbDpcbiAgICAgICAgfCAoKHJvdzogSW5wdXRUeXBlPEM+W1wiVHlwZXNcIl1bXCJUYWJsZVR5cGVzXCJdW1wiUm93V2l0aEtleVwiXSkgPT4gc3RyaW5nKVxuICAgICAgICB8IElmPFxuICAgICAgICAgICAgSXM8SW5wdXRUeXBlPEM+W1wiVHlwZXNcIl1bXCJUYWJsZVR5cGVzXCJdW1wiUm93XCJdLCB7IGxhYmVsOiBzdHJpbmcgfT4sXG4gICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgICA+O1xuICAgIH0sXG4gICAgSW5wdXRWaWV3UHJvcHM8Qz4gJiB7XG4gICAgICB0aXRsZT86IExhbmdOb2RlO1xuXG4gICAgICAvLyBUT0RPOiBsYWJlbENvbHVtblRpdGxlPzpcbiAgICB9XG4gID5cbikge1xuICB0eXBlIFR5cGVzID0gSW5wdXRUeXBlPEM+W1wiVHlwZXNcIl07XG4gIHR5cGUgVGFibGVUeXBlcyA9IFR5cGVzW1wiVGFibGVUeXBlc1wiXTtcbiAgdHlwZSBUYWJsZVJvdyA9IFRhYmxlVHlwZXNbXCJSb3dXaXRoS2V5XCJdO1xuXG4gIGNvbnN0IGxhbmcgPSB1c2VMYW5nVHJhbnNsYXRvcigpO1xuICBjb25zdCBpbnB1dFJlZiA9IHVzZVJlZjxEYXRhSW5wdXRWaWV3PEM+PihudWxsKTtcbiAgY29uc3QgW2lzT3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtxdWVyeVJlc3VsdCwgc2V0UXVlcnlSZXN1bHRdID0gdXNlU3RhdGU8VGFibGVUeXBlc1tcIlF1ZXJ5UmVzdWx0XCJdPigpO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU9wdGlvbnModGV4dDogc3RyaW5nKSB7XG4gICAgc2V0UXVlcnlSZXN1bHQoXG4gICAgICBhd2FpdCBwcm9wcy5jb25uZWN0aW9uLmNvbnRyb2xsZXIuZ2V0Um93cyh7XG4gICAgICAgIGdldENvdW50OiB0cnVlLFxuICAgICAgICB0ZXh0LFxuICAgICAgICB0YWtlOiAxNSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxEYXRhSW5wdXRWaWV3XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgcmVmPXtpbnB1dFJlZn1cbiAgICAgICAgY2hpbGRyZW49e3ZpZXcgPT4ge1xuICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IFRhYmxlVHlwZXNbXCJSb3dXaXRoS2V5XCJdW10gPVxuICAgICAgICAgICAgcXVlcnlSZXN1bHQ/LnJvd3MgfHwgKHZpZXcudmFsdWUgPyBbdmlldy52YWx1ZV0gOiBbXSk7XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPEF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgICAgIGNsZWFyT25Fc2NhcGVcbiAgICAgICAgICAgICAgICB2YWx1ZT17dmlldy52YWx1ZSB8fCBudWxsfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoXywgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZpZXcuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25Eb3VibGVDbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2U9eyhfLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdXBkYXRlT3B0aW9ucyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBnZXRPcHRpb25MYWJlbD17cm93ID0+XG4gICAgICAgICAgICAgICAgICBwcm9wc1tcImdldExhYmVsXCJdID8gcHJvcHNbXCJnZXRMYWJlbFwiXShyb3cpIDogcm93W1wibGFiZWxcIl1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgICAgICAgICBnZXRPcHRpb25TZWxlY3RlZD17KG8sIHYpID0+IG8uJGtleSA9PT0gdi4ka2V5fVxuICAgICAgICAgICAgICAgIHJlbmRlcklucHV0PXtwYXJhbXMgPT4gKFxuICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICB7Li4ucGFyYW1zfVxuICAgICAgICAgICAgICAgICAgICBlcnJvcj17ISF2aWV3LmVycm9yfVxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJUZXh0PXt2aWV3LnJlbmRlckVycm9yKCl9XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXtsYW5nLnRyYW5zbGF0ZU5vZGUocHJvcHMudGl0bGUpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIHtpc09wZW4gJiYgKFxuICAgICAgICA8RGlhbG9nIG9wZW4gb25DbG9zZT17KCkgPT4gc2V0T3BlbihmYWxzZSl9PlxuICAgICAgICAgIDxEaWFsb2dDb250ZW50PlxuICAgICAgICAgICAgPERpYWxvZ1RpdGxlPlxuICAgICAgICAgICAgICB7TGFuZ2BQSUNLXyR7XCJzdWJqZWN0XCJ9YCh7XG4gICAgICAgICAgICAgICAgc3ViamVjdDogcHJvcHMudGl0bGUsXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9EaWFsb2dUaXRsZT5cbiAgICAgICAgICAgIDxXaWRnZXRWaWV3TG9hZGVyXG4gICAgICAgICAgICAgIGNvbm5lY3Rpb249e3Byb3BzLmNvbm5lY3Rpb24uY29udHJvbGxlcn1cbiAgICAgICAgICAgICAgY2hpbGRyZW49e3Byb3BzID0+IChcbiAgICAgICAgICAgICAgICA8TXVpRGF0YVRhYmxlVmlld1xuICAgICAgICAgICAgICAgICAgLy8gZGlzYWJsZVRvb2xiYXJcbiAgICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICAgIGFjdGlvbnM9e3tcbiAgICAgICAgICAgICAgICAgICAgcGljazoge1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW5nYFBJQ0tgLFxuICAgICAgICAgICAgICAgICAgICAgIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvS2V5Ym9hcmRSZXR1cm5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljazogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UXVlcnlSZXN1bHQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0UmVmLmN1cnJlbnQhLnNldFZhbHVlKGV2ZW50LnJvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGNvbHVtbnM9e3tcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFuZ2BBQ0NPVU5UX0ZVTExfTkFNRWAsXG4gICAgICAgICAgICAgICAgICAgICAgcmVuZGVyUm93Q29sdW1uOiAoZGF0YSwgcHJvcHMpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNdWlMaW5rXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRRdWVyeVJlc3VsdCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0UmVmLmN1cnJlbnQhLnNldFZhbHVlKHByb3BzLnJvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NdWlMaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRGlhbG9nQ29udGVudD5cbiAgICAgICAgPC9EaWFsb2c+XG4gICAgICApfVxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFRleHRGaWVsZCwgeyBUZXh0RmllbGRQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UZXh0RmllbGRcIjtcbmltcG9ydCB7XG4gIEZpbGxlZFRleHRGaWVsZFByb3BzLFxuICBPdXRsaW5lZFRleHRGaWVsZFByb3BzLFxuICBTdGFuZGFyZFRleHRGaWVsZFByb3BzLFxufSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGV4dEZpZWxkL1RleHRGaWVsZFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vcmVhY3QvcmVhY3Rvci91c2VFbWl0dGVyXCI7XG5pbXBvcnQgeyBtZXJnZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3JlYWN0L3V0aWxzL21lcmdlUHJvcHNcIjtcbmltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcnBjL2lucHV0L3RleHQtaW5wdXQvVGV4dElucHV0XCI7XG5pbXBvcnQge1xuICBUZXh0SW5wdXRWaWV3LFxuICBUZXh0SW5wdXRWaWV3UHJvcHMsXG59IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcnBjL2lucHV0L3RleHQtaW5wdXQvVGV4dElucHV0Vmlld1wiO1xuXG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvUnBjXCI7XG5pbXBvcnQgeyBGb3JtVmlld0V2ZW50IH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybVZpZXdcIjtcblxuZXhwb3J0IHR5cGUgTXVpVGV4dElucHV0Vmlld1Byb3BzPFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxUZXh0SW5wdXQ+XG4+ID0gVGV4dElucHV0Vmlld1Byb3BzPEM+ICYge1xuICB0aXRsZT86IFJlYWN0Tm9kZTtcbiAgVGV4dEZpZWxkUHJvcHM/OiBQYXJ0aWFsPFRleHRGaWVsZFByb3BzPjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlUZXh0SW5wdXRWaWV3PEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPFRleHRJbnB1dD4+KHtcbiAgdGl0bGUsXG4gIFRleHRGaWVsZFByb3BzLFxuICAuLi5wcm9wc1xufTogTXVpVGV4dElucHV0Vmlld1Byb3BzPEM+KSB7XG4gIGNvbnN0IGVtaXQgPSB1c2VFbWl0dGVyKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8VGV4dElucHV0Vmlld1xuICAgICAgey4uLnByb3BzfVxuICAgICAgY2hpbGRyZW49e3ZpZXcgPT4gKFxuICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgey4uLm1lcmdlUHJvcHMoVGV4dEZpZWxkUHJvcHMsIHtcbiAgICAgICAgICAgIG9uQmx1cjogKCkgPT4gdmlldy52YWxpZGF0ZSgpLFxuICAgICAgICAgICAgb25DaGFuZ2U6IGV2ZW50ID0+IHZpZXcuc2V0VGV4dChldmVudC50YXJnZXQudmFsdWUpLFxuICAgICAgICAgICAgb25LZXlQcmVzczogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICBlbWl0KG5ldyBGb3JtVmlld0V2ZW50KFwiU1VCTUlUXCIpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KX1cbiAgICAgICAgICBsYWJlbD17dGl0bGV9XG4gICAgICAgICAgZXJyb3I9e3ZpZXcuZXJyb3IgIT0gbnVsbH1cbiAgICAgICAgICBoZWxwZXJUZXh0PXt2aWV3LnJlbmRlckVycm9yKCl9XG4gICAgICAgICAgdmFsdWU9e3ZpZXcudGV4dCB8fCBcIlwifVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAvPlxuICApO1xufVxuXG4vKlxuXG4gIEtleVxuXG5cbiAqL1xuIiwiaW1wb3J0IHsgTm9uTnVsbGFibGVBdCB9IGZyb20gXCIuL3R5cGluZ3MyL05vbk51bGxhYmxlQXRcIjtcbmltcG9ydCB7IE92ZXJyaWRlIH0gZnJvbSBcIi4vdHlwaW5nczIvT3ZlcnJpZGVcIjtcblxuZXhwb3J0IGRlY2xhcmUgY29uc3QgVE1ldGFUeXBlOiB1bmlxdWUgc3ltYm9sO1xuXG5leHBvcnQgdHlwZSBXaXRoTWV0YVR5cGU8VD4gPSB7IFtUTWV0YVR5cGVdPzogVCB9O1xuXG5leHBvcnQgdHlwZSBNZXRhVHlwZTxUIGV4dGVuZHMgV2l0aE1ldGFUeXBlPGFueT4+ID0gTm9uTnVsbGFibGVBdDxcbiAgVCxcbiAgdHlwZW9mIFRNZXRhVHlwZVxuPjtcblxuZXhwb3J0IHR5cGUgTWV0YVR5cGVIb29rPFQgZXh0ZW5kcyBXaXRoTWV0YVR5cGU8YW55PiwgVSBleHRlbmRzIG9iamVjdD4gPSBPbWl0PFxuICBULFxuICB0eXBlb2YgVE1ldGFUeXBlXG4+ICZcbiAgV2l0aE1ldGFUeXBlPE92ZXJyaWRlPE1ldGFUeXBlPFQ+LCBVPj47XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0TWV0YVR5cGU8VD4oXG4gIG9iajogV2l0aE1ldGFUeXBlPFQ+LFxuICBjYWxsYmFjazogKHR5cGU6IFQpID0+IHZvaWRcbikge1xuICAvL1xufVxuIiwiXG5cbmNvbnN0IGlkcyA9IG5ldyBXZWFrTWFwKCk7XG5sZXQgY291bnRlciA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBXZWFrSWQobzogb2JqZWN0KTogbnVtYmVyIHtcbiAgICByZXR1cm4gaWRzLmdldChvKSA/PyBpZHMuc2V0KG8sICsrY291bnRlcikuZ2V0KG8pXG59XG4iLCJpbXBvcnQgeyBTZXEgfSBmcm9tIFwiaW1tdXRhYmxlXCI7XG5pbXBvcnQgeyBMYXp5IH0gZnJvbSBcIi4uL3BhdHRlcm5zL2xhenlcIjtcbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIEFycmF5PFQ+IHtcbiAgICB0b1NlcSgpOiBTZXEuSW5kZXhlZDxUPjtcbiAgfVxuICBpbnRlcmZhY2UgUmVhZG9ubHlBcnJheTxUPiB7XG4gICAgdG9TZXEoKTogU2VxLkluZGV4ZWQ8VD47XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUFycmF5VG9TZXEgPSBMYXp5KCgpID0+IHtcbiAgQXJyYXkucHJvdG90eXBlLnRvU2VxID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBTZXEuSW5kZXhlZCh0aGlzKTtcbiAgfTtcbn0pO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGFzc2VydCh2YWx1ZSwgbWVzc2FnZT86IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpKTogYXNzZXJ0cyB2YWx1ZSB7XG4gICAgaWYgKCF2YWx1ZSkgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICB0eXBlb2YgbWVzc2FnZSA9PT0gXCJmdW5jdGlvblwiID8gbWVzc2FnZSgpIDpcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICApXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gVGltZW91dChtczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBtcyk7XHJcbiAgICB9KVxyXG59XHJcblxyXG4iLCJleHBvcnQgdHlwZSBXYWl0ZXI8VD4gPSBQcm9taXNlPFQ+ICZcbiAgICB7XG4gICAgICAgIHJlc29sdmUodmFsdWU6IFQpOiB2b2lkXG4gICAgICAgIHJlamVjdChlcnJvcjogYW55KTogdm9pZDtcbiAgICB9ICYgKFQgZXh0ZW5kcyB2b2lkID8ge1xuICAgICAgICByZXNvbHZlKCk6dm9pZDtcbn06e30pO1xuXG5leHBvcnQgZnVuY3Rpb24gV2FpdGVyPFQgPSBhbnk+KCk6IFdhaXRlcjxUPiB7XG4gICAgbGV0IHByb3BzO1xuICAgIGNvbnN0IHByb21pc2UgPSA8V2FpdGVyPFQ+Pm5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcHJvcHMgPSB7cmVzb2x2ZSwgcmVqZWN0fTtcbiAgICB9KVxuICAgIE9iamVjdC5hc3NpZ24ocHJvbWlzZSwgcHJvcHMpO1xuICAgIHJldHVybiBwcm9taXNlO1xuXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0TmV4dFBhdGgocGF0aDogc3RyaW5nKTogW3N0cmluZywgc3RyaW5nXSB7XG4gICAgbGV0IHN0YXJ0ID0gMDtcbiAgICB3aGlsZSAocGF0aC5jaGFyQXQoc3RhcnQpID09PSAnLycpIHtcbiAgICAgICAgc3RhcnQrKztcbiAgICB9XG4gICAgY29uc3QgZW5kID0gcGF0aC5pbmRleE9mKCcvJywgc3RhcnQpO1xuICAgIGlmICgwID4gZW5kKSB7XG4gICAgICAgIHJldHVybiBbcGF0aC5zbGljZShzdGFydCksIFwiXCJdXG4gICAgfVxuICAgIHJldHVybiBbcGF0aC5zbGljZShzdGFydCwgZW5kKSwgcGF0aC5zbGljZShlbmQpXVxufVxuIiwiaW1wb3J0IHthc3NlcnR9IGZyb20gXCIuLi9hc3NlcnRcIjtcbmltcG9ydCB7QmFzZU1hcCwgTWFwS2V5LCBNYXBWYWx1ZX0gZnJvbSBcIi4vQmFzZU1hcFwiO1xuXG5leHBvcnQgdHlwZSBNYXBGYWN0b3J5PFQgZXh0ZW5kcyBCYXNlTWFwPGFueSwgYW55Pj4gPSB7XG4gICAgbWFwOiBUO1xuICAgIChrZXk6IE1hcEtleTxUPik6IE5vbk51bGxhYmxlPE1hcFZhbHVlPFQ+PjtcblxufTtcblxuIGZ1bmN0aW9uIG1hcEZhY3Rvcnk8SywgVj4oXG4gICAgbWFwOiBCYXNlTWFwPEssIFY+LFxuICAgIGZhY3Rvcnk6IChrZXk6IEspID0+IFZcbik6IE1hcEZhY3Rvcnk8QmFzZU1hcDxLLCBWPj4ge1xuICAgIHRvdWNoLm1hcCA9IG1hcDtcbiAgICByZXR1cm4gdG91Y2hcblxuICAgIGZ1bmN0aW9uIHRvdWNoKGtleSwgY2FsbGJhY2s/KTogYW55IHtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBtYXAuaGFzKGtleSkgPyBjYWxsYmFjayhtYXAuZ2V0KGtleSkpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbHVlID0gbWFwLmdldChrZXkpO1xuICAgICAgICBpZiAodmFsdWUgfHwgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikpIHtcbiAgICAgICAgICAgIHJldHVybiA8Vj52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBtYXAuc2V0KGtleSwgdmFsdWUgPSBmYWN0b3J5KGtleSkpO1xuICAgICAgICBhc3NlcnQodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiKTtcbiAgICAgICAgcmV0dXJuIDxWPnZhbHVlO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gV2Vha01hcEZhY3Rvcnk8SyBleHRlbmRzIG9iamVjdCwgVj4oZmFjdG9yeTogKGtleTogSykgPT4gVik6IE1hcEZhY3Rvcnk8V2Vha01hcDxLLCBWPj4ge1xuICAgIHJldHVybiA8YW55Pm1hcEZhY3RvcnkobmV3IFdlYWtNYXAoKSwgZmFjdG9yeSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1hcEZhY3Rvcnk8SywgVj4oZmFjdG9yeTogKGtleTogSykgPT4gVik6IE1hcEZhY3Rvcnk8TWFwPEssIFY+PiB7XG4gICAgcmV0dXJuIDxhbnk+bWFwRmFjdG9yeShuZXcgTWFwKCksIGZhY3RvcnkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBCYXNlTWFwRmFjdG9yeTxLLCBWPihtYXA6IEJhc2VNYXA8SywgVj4sIGZhY3Rvcnk6IChrZXk6IEspID0+IFYpOiBNYXBGYWN0b3J5PEJhc2VNYXA8SywgVj4+IHtcbiAgICByZXR1cm4gPGFueT5tYXBGYWN0b3J5KG1hcCwgZmFjdG9yeSlcbn1cblxuIiwiaW1wb3J0IHtCYXNlTWFwLCBNYXBLZXksIE1hcFZhbHVlfSBmcm9tIFwiLi9CYXNlTWFwXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b3VjaE1hcDxUIGV4dGVuZHMgQmFzZU1hcDxhbnksIGFueT4+KFxuICAgIG1hcDogVCwga2V5OlxuICAgICAgICBNYXBLZXk8VD4sXG4gICAgY2FsbGJhY2s6IChrZXk6IE1hcEtleTxUPikgPT4gTWFwVmFsdWU8VD4pOiBNYXBWYWx1ZTxUPiB7XG4gICAgbGV0IHZhbHVlID0gbWFwLmdldChrZXkpO1xuICAgIGlmICh2YWx1ZSB8fCBtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBtYXAuc2V0KGtleSwgdmFsdWUgPSBjYWxsYmFjayhrZXkpKTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbiIsImV4cG9ydCBmdW5jdGlvbiBkZWZpbmVkPFQ+KHZhbHVlOiBULCBlcnJvck9yQ2FsbGJhY2s/KTogTm9uTnVsbGFibGU8VD4ge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICB0eXBlb2YgZXJyb3JPckNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIgPyBlcnJvck9yQ2FsbGJhY2soKSA6XG4gICAgICAgICAgICAgICAgZXJyb3JPckNhbGxiYWNrKTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5cbiIsImltcG9ydCB7ZGVmaW5lZH0gZnJvbSBcIi4vZGVmaW5lZFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lZEF0PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvYmo6IFQsIGtleTogSyk6IE5vbk51bGxhYmxlPFRbS10+IHtcbiAgICByZXR1cm4gZGVmaW5lZChvYmpba2V5XSwgKCkgPT4gYE5vICR7a2V5fWApXG59XG4iLCJpbXBvcnQge2tleXN9IGZyb20gXCIuL2tleXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uKiBlbnRyaWVzPFYgPSBhbnk+KG9iajogUmVjb3JkPHN0cmluZywgVj4gfCB1bmRlZmluZWQgfCBudWxsKTogSXRlcmFibGVJdGVyYXRvcjxbc3RyaW5nLCBWLG51bWJlcl0+IHtcbiAgICBsZXQgaW5kZXg9MDtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKG9iaikpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB5aWVsZCBba2V5LCBvYmpba2V5XSxpbmRleCsrXVxuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBoYXNLZXlzKG9iamVjdDogb2JqZWN0IHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKG9iamVjdCkgZm9yIChsZXQga2V5IGluIG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbioga2V5czxLIGV4dGVuZHMgUHJvcGVydHlLZXkgPSBzdHJpbmc+KFxuICBvYmo6IFJlY29yZDxLLCBhbnk+IHwgdW5kZWZpbmVkIHwgbnVsbFxuKTogSXRlcmFibGVJdGVyYXRvcjxzdHJpbmcgJiBLPiB7XG4gIGlmIChvYmopXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikgY29udGludWU7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgeWllbGQga2V5O1xuICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7ZW50cmllc30gZnJvbSBcIi4vZW50cmllc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwQW5kRmlsdGVyT2JqZWN0PFQsIFI+KG9iajogUmVjb3JkPHN0cmluZywgVD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcHBlcjogKHZhbHVlOiBULCBrZXk6IHN0cmluZykgPT4gUiB8IHVuZGVmaW5lZCk6IFJlY29yZDxzdHJpbmcsIFI+IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKG9iaikpIHtcbiAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gbWFwcGVyKHZhbHVlLCBrZXkpO1xuICAgICAgICBpZiAobmV4dFZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgcmVzdWx0W2tleV0gPSBuZXh0VmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vdHlwaW5nczIvQXN5bmNcIjtcbmltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi9lbnRyaWVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBPYmplY3Q8VCwgUj4oXG4gIG9iajogUmVjb3JkPHN0cmluZywgVD4sXG4gIG1hcHBlcjogKHZhbHVlOiBULCBrZXk6IHN0cmluZykgPT4gUlxuKTogUmVjb3JkPHN0cmluZywgUj4ge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKG9iaikpIHtcbiAgICByZXN1bHRba2V5XSA9IG1hcHBlcih2YWx1ZSwga2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFwT2JqZWN0QXN5bmM8VCwgUj4oXG4gIG9iajogUmVjb3JkPHN0cmluZywgVD4sXG4gIG1hcHBlcjogKHZhbHVlOiBULCBrZXk6IHN0cmluZykgPT4gQXdhaXRhYmxlPFI+XG4pOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIFI+PiB7XG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMob2JqKSkge1xuICAgIHJlc3VsdFtrZXldID0gYXdhaXQgbWFwcGVyKHZhbHVlLCBrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBlbnRyaWVzIH0gZnJvbSBcIi4vZW50cmllc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwT2JqZWN0VG9BcnJheTxUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55PiwgVT4oXG4gIG9iajogVCxcbiAgbWFwcGVyOiAodmFsdWU6IFRba2V5b2YgVF0sIGtleTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiBVIHwgdW5kZWZpbmVkXG4pOiBVW10ge1xuICBsZXQgaW5kZXggPSAwO1xuICBjb25zdCBhcnI6IFVbXSA9IFtdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKG9iaikpIHtcbiAgICBjb25zdCBuZXh0VmFsdWUgPSBtYXBwZXIodmFsdWUsIGtleSwgaW5kZXgrKyk7XG4gICAgaWYgKG5leHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSBhcnIucHVzaChuZXh0VmFsdWUpO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG4iLCJpbXBvcnQgeyBlbnRyaWVzIH0gZnJvbSBcIi4vZW50cmllc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEZXNjcmlwdG9yczxUIGV4dGVuZHMgb2JqZWN0LCBVIGV4dGVuZHMgb2JqZWN0PihcbiAgYmFzZTogVCxcbiAgY2hpbGQ6IFVcbik6IE9taXQ8VCwga2V5b2YgVT4gJiBVIHtcbiAgZm9yIChjb25zdCBba2V5LCBkZXNjXSBvZiBlbnRyaWVzKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGJhc2UpKSkge1xuICAgIGlmICghY2hpbGQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLCBrZXksIGRlc2MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YoY2hpbGQsIGJhc2UpO1xufVxuIiwiaW1wb3J0IHthc3NlcnR9IGZyb20gXCIuLi9hc3NlcnRcIjtcblxuY29uc3QgbWFya1RvRGVsZXRlID0gU3ltYm9sKFwiZGVsZXRlZFwiKTtcblxuXG5jb25zdCBtYXAgPSBuZXcgV2Vha01hcCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gTGF6eTxUIGV4dGVuZHMgKC4uLmFyZ3MpID0+IGFueT4oY2FsbGJhY2s6IFQpOiBUXG5leHBvcnQgZnVuY3Rpb24gTGF6eSgpOiBNZXRob2REZWNvcmF0b3JcbmV4cG9ydCBmdW5jdGlvbiBMYXp5KGNhbGxiYWNrPyk6IGFueSB7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBsYXp5Q2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAodGFyZ2V0LCBwcm9wLCBkZXNjKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlc2MuZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBsYXp5UHJvcGVydHkodGFyZ2V0LCBwcm9wLCBkZXNjKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGVzYy52YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgbGF6eU1ldGhvZCh0YXJnZXQsIHByb3AsIGRlc2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsYXp5Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRoaXM6YW55KSB7XG4gICAgICAgIGlmIChtYXAuaGFzKGNhbGxiYWNrKSlcbiAgICAgICAgICAgIHJldHVybiBtYXAuZ2V0KGNhbGxiYWNrKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBtYXAuc2V0KGNhbGxiYWNrLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxhenlQcm9wZXJ0eSh0YXJnZXQsIHByb3AsIGRlc2MpIHtcblxuICAgIGNvbnN0IG1hcCA9IG5ldyBXZWFrTWFwKClcbiAgICBjb25zdCBnZXR0ZXIgPSBkZXNjLmdldDtcbiAgICBhc3NlcnQoIWRlc2Muc2V0KTtcbiAgICBkZXNjLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAobWFya1RvRGVsZXRlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgbWFwLmRlbGV0ZSh0aGlzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFwLnNldCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVzYy5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChtYXAuaGFzKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFwLmdldCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9IGdldHRlci5hcHBseSh0aGlzKTtcbiAgICAgICAgbWFwLnNldCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gbGF6eU1ldGhvZCh0YXJnZXQsIHByb3AsIGRlc2MpIHtcblxuICAgIGNvbnN0IG1hcCA9IG5ldyBXZWFrTWFwKClcbiAgICBjb25zdCBtZXRob2QgPSBkZXNjLnZhbHVlO1xuICAgIGRlbGV0ZSBkZXNjLnZhbHVlO1xuICAgIGRlc2MuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAobWFwLmhhcyh0aGlzKSlcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiBtYXAuZ2V0KHRoaXMpO1xuXG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBtZXRob2QuYXBwbHkodGhpcywgLi4uYXJncyk7XG4gICAgICAgICAgICBtYXAuc2V0KHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkZXNjLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IG1hcmtUb0RlbGV0ZSkge1xuICAgICAgICAgICAgbWFwLmRlbGV0ZSh0aGlzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBzZXQgbGF6eSBtZXRob2QuYClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5MYXp5LmRlbGV0ZSA9IGZ1bmN0aW9uICh0YXJnZXQsIHByb3A/KSB7XG4gICAgaWYgKHByb3ApIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gbWFya1RvRGVsZXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5kZWxldGUodGFyZ2V0KTtcbiAgICB9XG59XG4iLCJ0eXBlIENhcGl0YWxpemU8VD4gPSBzdHJpbmc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplPFQgZXh0ZW5kcyBzdHJpbmc+KGtleTogVCk6IENhcGl0YWxpemU8VD4ge1xuICByZXR1cm4ga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpO1xufVxuIiwiaW1wb3J0IHtTb3VyY2VDYXNlfSBmcm9tIFwiLi9tYXRjaENhc2VcIjtcbmltcG9ydCB7c3BsaXR9IGZyb20gXCIuL3NwbGl0XCI7XG5cbmV4cG9ydCBjb25zdCBmcm9tQ29uc3RhbnRDYXNlOiBTb3VyY2VDYXNlID0gdGV4dCA9PiBzcGxpdCh0ZXh0LCBcIl9cIik7XG4iLCJpbXBvcnQge1NlcX0gZnJvbSBcImltbXV0YWJsZVwiO1xuaW1wb3J0IHtTb3VyY2VDYXNlfSBmcm9tIFwiLi9tYXRjaENhc2VcIjtcblxuXG5leHBvcnQgY29uc3QgZnJvbVByb3BlcnR5Q2FzZTogU291cmNlQ2FzZSA9IHRleHQgPT5cbiAgICBTZXEuSW5kZXhlZCh0ZXh0Lm1hdGNoQWxsKC9bQS1aXT9bXkEtWl0qL2cpKVxuICAgICAgICAubWFwKChbdGV4dF0pID0+IHRleHQpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGpvaW5UZW1wbGF0ZTxUPihzdHJpbmdzOiBSZWFkb25seUFycmF5PHN0cmluZz4sIGFyZ3M6IFRbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IChhcmc6IFQpID0+IHN0cmluZykge1xuICAgIGxldCB0ZXh0ID0gJyc7XG4gICAgZm9yIChsZXQgW2luZGV4LCBzdHJpbmddIG9mIHN0cmluZ3MuZW50cmllcygpKSB7XG4gICAgICAgIHRleHQgKz0gc3RyaW5nO1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBpbmRleCkge1xuICAgICAgICAgICAgdGV4dCArPSBjYWxsYmFjayhhcmdzW2luZGV4XSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBqb2luVXJsKHVybDogc3RyaW5nLCAuLi5hcmdzOiAoc3RyaW5nIHwgdW5kZWZpbmVkKVtdKTogc3RyaW5nIHtcbiAgICBmb3IgKGNvbnN0IGFyZyBvZiBhcmdzKSB7XG4gICAgICAgIGlmICghYXJnKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC8rJC9nLCAnJylcbiAgICAgICAgICAgICsgJy8nXG4gICAgICAgICAgICArIGFyZy5yZXBsYWNlKC9eXFwvKy9nLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG59XG4iLCJpbXBvcnQge1NlcX0gZnJvbSBcImltbXV0YWJsZVwiO1xuXG5leHBvcnQgdHlwZSBUYXJnZXRDYXNlID0gKHdvcmRzOiBTZXEuSW5kZXhlZDxzdHJpbmc+KSA9PiBzdHJpbmc7XG5leHBvcnQgdHlwZSBTb3VyY2VDYXNlID0gKHRleHQ6IHN0cmluZykgPT4gU2VxLkluZGV4ZWQ8c3RyaW5nPjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoQ2FzZShcbiAgICB0ZXh0OiBzdHJpbmcsXG4gICAgc291cmNlOiBTb3VyY2VDYXNlLFxuICAgIHRhcmdldDogVGFyZ2V0Q2FzZVxuKSB7XG4gICAgcmV0dXJuIHRhcmdldChzb3VyY2UodGV4dCkpXG59XG4iLCJpbXBvcnQge1NlcX0gZnJvbSBcImltbXV0YWJsZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24qIF9zcGxpdCh0ZXh0OiBzdHJpbmcsIHNlcDogc3RyaW5nKTogSXRlcmFibGVJdGVyYXRvcjxzdHJpbmc+IHtcbiAgICBsZXQgc3RhcnQgPSAwO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHRleHQuaW5kZXhPZihzZXAsIHN0YXJ0KTtcbiAgICAgICAgaWYgKC0xID09PSBwb3MpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHlpZWxkIHRleHQuc2xpY2Uoc3RhcnQsIHBvcyk7XG4gICAgICAgIHN0YXJ0ID0gcG9zICsgc2VwLmxlbmd0aDtcbiAgICB9XG4gICAgeWllbGQgc3RhcnQgPyB0ZXh0LnNsaWNlKHN0YXJ0KSA6IHRleHQ7XG5cbn1cblxuZXhwb3J0IGNvbnN0IHNwbGl0ID0gKHRleHQ6IHN0cmluZywgc2VwOiBzdHJpbmcpID0+IFNlcS5JbmRleGVkKF9zcGxpdCh0ZXh0LCBzZXApKVxuXG5cbiIsImltcG9ydCB7VGFyZ2V0Q2FzZX0gZnJvbSBcIi4vbWF0Y2hDYXNlXCI7XG5cblxuZXhwb3J0IGNvbnN0IHRvQ29uc3RhbnRDYXNlOiBUYXJnZXRDYXNlID0gd29yZHMgPT4gd29yZHMuam9pbignXycpLnRvVXBwZXJDYXNlKClcbiIsImltcG9ydCB7VGFyZ2V0Q2FzZX0gZnJvbSBcIi4vbWF0Y2hDYXNlXCI7XG5cbmV4cG9ydCBjb25zdCB0b1RpdGxlQ2FzZTogVGFyZ2V0Q2FzZSA9IHdvcmRzID0+IHdvcmRzXG4gICAgLm1hcCh0ZXh0ID0+IHRleHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkpXG4gICAgLmpvaW4oXCIgXCIpO1xuXG4iLCJleHBvcnQgdHlwZSBUeXBlUmVmPEsgZXh0ZW5kcyBQcm9wZXJ0eUtleT4gPSBLIGV4dGVuZHMga2V5b2YgVHlwZVJlZnNcbiAgPyBUeXBlUmVmc1tLXVxuICA6IG5ldmVyO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBUeXBlUmVmcyB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gVHlwZVJlZjxLIGV4dGVuZHMgUHJvcGVydHlLZXk+KFxuICBjYjogKCkgPT4gS1xuKTogSyBleHRlbmRzIGtleW9mIFR5cGVSZWZzID8gVHlwZVJlZnNbS10gOiBuZXZlciB7XG4gIHJldHVybiA8YW55PigoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH0pO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIFR5cGluZzxUPigpOiBUIHtcbiAgcmV0dXJuIDxhbnk+KCgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgfSk7XG59XG4iLCJleHBvcnQge1xuICAgIFNldCBhcyBJbW11dGFibGVTZXQsXG4gICAgUmVjb3JkIGFzIEltbXV0YWJsZVJlY29yZCxcbiAgICBNYXAgYXMgSW1tdXRhYmxlTWFwLFxuICAgIExpc3QgYXMgSW1tdXRhYmxlTGlzdCxcblxufSBmcm9tIFwiaW1tdXRhYmxlXCI7XG5cbmltcG9ydCAqIGFzIEltbXV0YWJsZSBmcm9tIFwiaW1tdXRhYmxlXCI7XG5pbXBvcnQge1NlcX0gZnJvbSBcImltbXV0YWJsZVwiO1xuXG5leHBvcnQgdHlwZSBJbW11dGFibGVLZXlzID0gSW1tdXRhYmxlLlNldDxzdHJpbmc+O1xuZXhwb3J0IGNvbnN0IEltbXV0YWJsZUtleXMgPSBJbW11dGFibGUuU2V0PHN0cmluZz4oKTtcblxuZXhwb3J0IHR5cGUgSW5kZXhlZFNlcTxUPiA9IFNlcS5JbmRleGVkPFQ+O1xuZXhwb3J0IGNvbnN0IEluZGV4ZWRTZXEgPSBTZXEuSW5kZXhlZDtcbiIsImltcG9ydCB7Y3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7TGFuZ1RlbXBsYXRlLCBMYW5nVGVtcGxhdGVQcm9wc30gZnJvbSBcIi4vTGFuZ1RlbXBsYXRlXCI7XG5pbXBvcnQge0xhbmdWaWV3fSBmcm9tIFwiLi9MYW5nVmlld1wiO1xuXG5leHBvcnQgdHlwZSBMYW5nVG9rZW5FbGVtZW50ID0gUmVhY3RFbGVtZW50PExhbmdUb2tlblByb3BzPjtcblxuZXhwb3J0IHR5cGUgTGFuZ1Rva2VuUHJvcHMgPSB7XG4gICAgdHlwZTogTGFuZ1Byb3BzVHlwZS50b2tlbixcbiAgICB0b2tlbjogc3RyaW5nXG59O1xuXG5leHBvcnQgdHlwZSBMYW5nID0gTGFuZ1RlbXBsYXRlPGFueT4gfCBSZWFjdEVsZW1lbnQ8TGFuZ1Rva2VuUHJvcHM+O1xuXG5leHBvcnQgdHlwZSBMYW5nRWxlbWVudCA9IFJlYWN0RWxlbWVudDxMYW5nUHJvcHM+O1xuXG5leHBvcnQgdHlwZSBMYW5nTm9kZSA9IG51bWJlciB8IHN0cmluZyB8IExhbmdFbGVtZW50IHwgTGFuZ05vZGVbXSB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IGVudW0gTGFuZ1Byb3BzVHlwZSB7XG4gICAgdG9rZW4sXG4gICAgdGVtcGxhdGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExhbmcoc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXkpOiBSZWFjdEVsZW1lbnQ8TGFuZ1Rva2VuUHJvcHM+XG5leHBvcnQgZnVuY3Rpb24gTGFuZzxQIGV4dGVuZHMgc3RyaW5nLCBLIGV4dGVuZHMgc3RyaW5nPihcbiAgICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgICBwYXJhbTogUCxcbiAgICAuLi5wYXJhbXM6IEtbXSk6IExhbmdUZW1wbGF0ZTxQIHwgSz5cbmV4cG9ydCBmdW5jdGlvbiBMYW5nKHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5wYXJhbXMpOiBhbnkge1xuICAgIGlmIChzdHJpbmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChMYW5nVmlldywge1xuICAgICAgICAgICAgdHlwZTogTGFuZ1Byb3BzVHlwZS50b2tlbixcbiAgICAgICAgICAgIHRva2VuOiBzdHJpbmdzWzBdXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBMYW5nVGVtcGxhdGUoc3RyaW5ncy5yYXcsIHBhcmFtcylcbn1cblxuXG5leHBvcnQgdHlwZSBMYW5nUHJvcHMgPSBMYW5nVGVtcGxhdGVQcm9wczxhbnk+IHwgTGFuZ1Rva2VuUHJvcHM7XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIFJlYWN0Tm9kZSwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZnJvbVByb3BlcnR5Q2FzZSB9IGZyb20gXCIuLi9jb21tb24vc3RyaW5nL2Zyb21Qcm9wZXJ0eUNhc2VcIjtcbmltcG9ydCB7IG1hdGNoQ2FzZSwgU291cmNlQ2FzZSB9IGZyb20gXCIuLi9jb21tb24vc3RyaW5nL21hdGNoQ2FzZVwiO1xuaW1wb3J0IHsgdG9Db25zdGFudENhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy90b0NvbnN0YW50Q2FzZVwiO1xuaW1wb3J0IHsgTGFuZ1Byb3BzVHlwZSB9IGZyb20gXCIuL0xhbmdcIjtcbmltcG9ydCB7IExhbmdWaWV3IH0gZnJvbSBcIi4vTGFuZ1ZpZXdcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIExhbmdLZXkocHJvcHM6IHtcbiAgZm9yOiBzdHJpbmc7XG4gIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG4gIHNvdXJjZUNhc2U/OiBTb3VyY2VDYXNlO1xufSk6IFJlYWN0RWxlbWVudCB7XG4gIHJldHVybiB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAocHJvcHMuY2hpbGRyZW4gIT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gPD57cHJvcHMuY2hpbGRyZW59PC8+O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8TGFuZ1ZpZXdcbiAgICAgICAgdHlwZT17TGFuZ1Byb3BzVHlwZS50b2tlbn1cbiAgICAgICAgdG9rZW49e21hdGNoQ2FzZShcbiAgICAgICAgICBwcm9wcy5mb3IsXG4gICAgICAgICAgcHJvcHMuc291cmNlQ2FzZSB8fCBmcm9tUHJvcGVydHlDYXNlLFxuICAgICAgICAgIHRvQ29uc3RhbnRDYXNlXG4gICAgICAgICl9XG4gICAgICAvPlxuICAgICk7XG4gIH0sIFtwcm9wcy5jaGlsZHJlbiwgcHJvcHMuZm9yXSk7XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGRlZmluZWRBdCB9IGZyb20gXCIuLi9jb21tb24vb2JqZWN0L2RlZmluZWRBdFwiO1xuaW1wb3J0IHsgam9pblRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9zdHJpbmcvam9pblRlbXBsYXRlXCI7XG5pbXBvcnQgeyBMYW5nRWxlbWVudCwgTGFuZ05vZGUsIExhbmdQcm9wc1R5cGUsIExhbmdUb2tlbkVsZW1lbnQgfSBmcm9tIFwiLi9MYW5nXCI7XG5pbXBvcnQgeyBMYW5nVmlldyB9IGZyb20gXCIuL0xhbmdWaWV3XCI7XG5cbmV4cG9ydCB0eXBlIExhbmdUZW1wbGF0ZTxLIGV4dGVuZHMgc3RyaW5nPiA9IHtcbiAgdG9rZW46IHN0cmluZztcblxuICAvLyBmb3JtYXR0ZXJcbiAgKHByb3BzOiBSZWNvcmQ8SywgTGFuZ05vZGU+KTogTGFuZ1RlbXBsYXRlRWxlbWVudDxLPjtcblxuICAvLyBwcm92aWRlclxuICAoc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLmtleXM6IEtbXSk6IExhbmdUZW1wbGF0ZUVudHJ5PEs+O1xufTtcblxuZXhwb3J0IHR5cGUgTGFuZ1RlbXBsYXRlRm9ybWF0dGVyPEsgZXh0ZW5kcyBzdHJpbmc+ID0gKFxuICBwcm9wczogUmVjb3JkPEssIGFueT5cbikgPT4gc3RyaW5nO1xuXG5leHBvcnQgdHlwZSBMYW5nVGVtcGxhdGVFbnRyeTxLIGV4dGVuZHMgc3RyaW5nPiA9IFtcbiAgc3RyaW5nLFxuICBMYW5nVGVtcGxhdGVGb3JtYXR0ZXI8Sz5cbl07XG5cbmV4cG9ydCB0eXBlIExhbmdUZW1wbGF0ZVByb3BzPEsgZXh0ZW5kcyBzdHJpbmc+ID0ge1xuICB0eXBlOiBMYW5nUHJvcHNUeXBlLnRlbXBsYXRlO1xuICB0b2tlbjogc3RyaW5nO1xuICBwcm9wczogUmVjb3JkPFxuICAgIEssXG4gICAgTGFuZ1RlbXBsYXRlRWxlbWVudDxhbnk+IHwgTGFuZ1Rva2VuRWxlbWVudCB8IHN0cmluZyB8IG51bWJlclxuICA+O1xuICBwYXJhbXM6IEtbXTtcbiAgc3RyaW5nczogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xufTtcblxuZXhwb3J0IHR5cGUgTGFuZ1RlbXBsYXRlRWxlbWVudDxLIGV4dGVuZHMgc3RyaW5nPiA9IFJlYWN0RWxlbWVudDxcbiAgTGFuZ1RlbXBsYXRlUHJvcHM8Sz5cbj47XG5cbmV4cG9ydCBmdW5jdGlvbiBMYW5nVGVtcGxhdGU8SyBleHRlbmRzIHN0cmluZz4oXG4gIHN0cmluZ3M6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPixcbiAgcGFyYW1zOiBLW11cbik6IExhbmdUZW1wbGF0ZTxLPiB7XG4gIGNvbnN0IHRva2VuID0gam9pblRlbXBsYXRlKHN0cmluZ3MsIHBhcmFtcywgcGFyYW0gPT4gYHske3BhcmFtfX1gKTtcblxuICB0ZW1wbGF0ZS50b2tlbiA9IHRva2VuO1xuICByZXR1cm4gPGFueT50ZW1wbGF0ZTtcblxuICBmdW5jdGlvbiB0ZW1wbGF0ZShhcmcwLCAuLi5hcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwICYmIHR5cGVvZiBhcmcwID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChMYW5nVmlldywge1xuICAgICAgICB0eXBlOiBMYW5nUHJvcHNUeXBlLnRlbXBsYXRlLFxuICAgICAgICB0b2tlbixcbiAgICAgICAgcHJvcHM6IGFyZzAsXG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgc3RyaW5ncyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0ZW1wbGF0ZWAuLi5gXG4gICAgICByZXR1cm4gW1xuICAgICAgICB0b2tlbixcbiAgICAgICAgcHJvcHMgPT5cbiAgICAgICAgICBqb2luVGVtcGxhdGUoPHN0cmluZ1tdPmFyZzAsIGFyZ3MsIGFyZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGVmaW5lZEF0KHByb3BzLCBhcmcpO1xuICAgICAgICAgIH0pLFxuICAgICAgXTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7Y3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge21hcE9iamVjdH0gZnJvbSBcIi4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0XCI7XG5pbXBvcnQge2Zyb21Db25zdGFudENhc2V9IGZyb20gXCIuLi9jb21tb24vc3RyaW5nL2Zyb21Db25zdGFudENhc2VcIjtcbmltcG9ydCB7am9pblRlbXBsYXRlfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy9qb2luVGVtcGxhdGVcIjtcbmltcG9ydCB7bWF0Y2hDYXNlfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy9tYXRjaENhc2VcIjtcbmltcG9ydCB7dG9UaXRsZUNhc2V9IGZyb20gXCIuLi9jb21tb24vc3RyaW5nL3RvVGl0bGVDYXNlXCI7XG5pbXBvcnQge0xhbmdOb2RlLCBMYW5nUHJvcHMsIExhbmdQcm9wc1R5cGUsIExhbmdUb2tlblByb3BzfSBmcm9tIFwiLi9MYW5nXCI7XG5pbXBvcnQge0xhbmdNYXB9IGZyb20gXCIuL0xhbmdNYXBcIjtcbmltcG9ydCB7TGFuZ1RlbXBsYXRlUHJvcHN9IGZyb20gXCIuL0xhbmdUZW1wbGF0ZVwiO1xuXG5cbmV4cG9ydCBjbGFzcyBMYW5nVHJhbnNsYXRvciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIG1hcDogTGFuZ01hcCkge1xuICAgIH1cblxuXG4gICAgdHJhbnNsYXRlTm9kZShub2RlOiBMYW5nTm9kZSk6c3RyaW5nfHVuZGVmaW5lZCB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIG5vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm1hcChub2RlID0+IHRoaXMudHJhbnNsYXRlTm9kZShub2RlKSkuam9pbignJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlUHJvcHMobm9kZS5wcm9wcyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZVByb3BzKHByb3BzOiBMYW5nUHJvcHMpIHtcbiAgICAgICAgc3dpdGNoIChwcm9wcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIExhbmdQcm9wc1R5cGUudGVtcGxhdGU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlVGVtcGxhdGUocHJvcHMpO1xuICAgICAgICAgICAgY2FzZSBMYW5nUHJvcHNUeXBlLnRva2VuOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVRva2VuKHByb3BzLnRva2VuKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVEZWZhdWx0VG9rZW4odG9rZW46IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBbdG9rZW5dID0gbWF0Y2hDYXNlKHRva2VuLCBmcm9tQ29uc3RhbnRDYXNlLCB0b1RpdGxlQ2FzZSk7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlVG9rZW4odG9rZW46c3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLm1hcFt0b2tlbl07XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBbdG9rZW5dID0gdmFsdWUoe30pO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVEZWZhdWx0VG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBOb3Qgc3VwcG9ydCAke3R5cGVvZiB2YWx1ZX1gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlVGVtcGxhdGUodGVtcGxhdGU6IExhbmdUZW1wbGF0ZVByb3BzPGFueT4pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMubWFwW3RlbXBsYXRlLnRva2VuXTtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZShtYXBPYmplY3QodGVtcGxhdGUucHJvcHMsIG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVByb3BzKG5vZGUucHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcobm9kZSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hDYXNlKFxuICAgICAgICAgICAgICAgICAgICBqb2luVGVtcGxhdGUodGVtcGxhdGUuc3RyaW5ncywgdGVtcGxhdGUucGFyYW1zLCBwYXJhbSA9PiBTdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlTm9kZSggdGVtcGxhdGUucHJvcHNbcGFyYW1dKVxuICAgICAgICAgICAgICAgICAgICApKSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbUNvbnN0YW50Q2FzZSxcbiAgICAgICAgICAgICAgICAgICAgdG9UaXRsZUNhc2VcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBDYW4ndCB0cmFuc2xhdGUgJHt0eXBlb2YgdmFsdWV9LmApXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IExhbmdUcmFuc2xhdG9yQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQobmV3IExhbmdUcmFuc2xhdG9yKHt9KSk7XG5leHBvcnQgY29uc3QgdXNlTGFuZ1RyYW5zbGF0b3IgPSAoKSA9PiB1c2VDb250ZXh0KExhbmdUcmFuc2xhdG9yQ29udGV4dCk7XG5cbiIsImltcG9ydCB7Y3JlYXRlRWxlbWVudCwgRnJhZ21lbnQsIHVzZUNvbnRleHR9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtMYW5nUHJvcHN9IGZyb20gXCIuL0xhbmdcIjtcbmltcG9ydCB7TGFuZ1RyYW5zbGF0b3JDb250ZXh0fSBmcm9tIFwiLi9MYW5nVHJhbnNsYXRvclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gTGFuZ1ZpZXcocHJvcHM6IExhbmdQcm9wcykge1xuICAgIGNvbnN0IHRyYW5zbGF0b3IgPSB1c2VDb250ZXh0KExhbmdUcmFuc2xhdG9yQ29udGV4dCk7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIHRyYW5zbGF0b3IudHJhbnNsYXRlUHJvcHMocHJvcHMpKVxufVxuXG4iLCJpbXBvcnQgeyBtYXBPYmplY3RUb0FycmF5IH0gZnJvbSBcIi4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0VG9BcnJheVwiO1xuXG4vLyB0cnlpbmcgdG8gcmVxdWlyZSBcInV0aWxcIiBtb2R1bGUuXG5cbmNvbnN0IHV0aWw6XG4gIHwgdW5kZWZpbmVkXG4gIHwge1xuICAgICAgaW5zcGVjdDtcbiAgICB9ID0gKChyLCBtKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHIobSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7fVxufSkocmVxdWlyZSwgXCJ1dGlsXCIpO1xuXG5pbnNwZWN0LmN1c3RvbSA9IHV0aWw/Lmluc3BlY3QuY3VzdG9tID8/IFN5bWJvbCgpO1xuZXhwb3J0IGZ1bmN0aW9uIGluc3BlY3QoLi4uYXJncyk6IHN0cmluZyB7XG4gIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgIGFyZ3MgPSBbLi4uYXJncywgeyBkZXB0aDogMTAwIH1dO1xuICB9XG4gIGNvbnN0IFt2YWx1ZV0gPSBhcmdzO1xuXG4gIGlmICh0eXBlb2YgdmFsdWU/Lmluc3BlY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB2YWx1ZS5pbnNwZWN0KCk7XG4gIH1cblxuICBpZiAodXRpbCkgcmV0dXJuIHV0aWwuaW5zcGVjdC5hcHBseSh1dGlsLCBhcmdzKTtcblxuICBjb25zdCBtZXRob2QgPSB2YWx1ZT8uW2luc3BlY3QuY3VzdG9tXTtcbiAgaWYgKG1ldGhvZCkgcmV0dXJuIG1ldGhvZC5hcHBseSh2YWx1ZSk7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiAoXG4gICAgICBcIltcIiArXG4gICAgICB2YWx1ZVxuICAgICAgICAudG9TZXEoKVxuICAgICAgICAubWFwKHZhbHVlID0+IGluc3BlY3QodmFsdWUpKVxuICAgICAgICAuam9pbihcIiwgXCIpICtcbiAgICAgIFwiXVwiXG4gICAgKTtcbiAgfVxuICBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKSA9PT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgIHJldHVybiBgeyR7bWFwT2JqZWN0VG9BcnJheShcbiAgICAgIHZhbHVlLFxuICAgICAgKHZhbHVlLCBrZXkpID0+IGluc3BlY3Qoa2V5KSArIFwiOiBcIiArIGluc3BlY3QodmFsdWUpXG4gICAgKX19YDtcbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudFR5cGUsIFJlZiwgdXNlRWZmZWN0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCB0eXBlIFJlZlR5cGU8VCBleHRlbmRzIFJlYWN0LlJlZjxhbnk+PiA9IFQgZXh0ZW5kcyBSZWFjdC5SZWY8aW5mZXIgVT5cbiAgPyBVXG4gIDogbmV2ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VVcGRhdGVSZWY8VCBleHRlbmRzIFJlZjxhbnk+IHwgdW5kZWZpbmVkPihcbiAgcmVmOiBULFxuICBjcmVhdGU6ICgpID0+IFJlZlR5cGU8Tm9uTnVsbGFibGU8VD4+XG4pIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZWYgJiYgdXBkYXRlUmVmKHJlZiwgY3JlYXRlKCkpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZWYgJiYgdXBkYXRlUmVmKHJlZiwgbnVsbCk7XG4gICAgfTtcbiAgfSwgW3R5cGVvZiAocmVmIHx8IHVuZGVmaW5lZCldKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVJlZjxUPihyZWY6IFJlYWN0LlJlZjxUPiB8IHVuZGVmaW5lZCwgdmFsdWU6IFQpIHtcbiAgaWYgKHJlZilcbiAgICBzd2l0Y2ggKHR5cGVvZiByZWYpIHtcbiAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICByZXR1cm4gcmVmKHZhbHVlKTtcbiAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICByZWZbXCJjdXJyZW50XCJdID0gdmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBIb29rUmVmPFQ+ID0geyBob29rUmVmPzogUmVhY3QuUmVmPFQ+IH07XG5leHBvcnQgdHlwZSBGb3J3YXJkSG9va1JlZjxUIGV4dGVuZHMgQ29tcG9uZW50VHlwZTxIb29rUmVmPGFueT4+PiA9IEhvb2tSZWY8XG4gIEhvb2tSZWZUeXBlPFQ+XG4+O1xuXG5leHBvcnQgdHlwZSBIb29rUmVmVHlwZTxcbiAgVCBleHRlbmRzIENvbXBvbmVudFR5cGU8SG9va1JlZjxhbnk+PlxuPiA9IFQgZXh0ZW5kcyBDb21wb25lbnRUeXBlPEhvb2tSZWY8aW5mZXIgVT4+ID8gVSA6IG5ldmVyO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlSG9va1JlZjxUIGV4dGVuZHMgQ29tcG9uZW50VHlwZTxIb29rUmVmPGFueT4+PihcbiAgY29tcG9uZW50VHlwZT86IFRcbik6IHtcbiAgcmVhZG9ubHkgY3VycmVudDogSG9va1JlZlR5cGU8VD47XG4gIChjdXJyZW50OiBIb29rUmVmVHlwZTxUPik6IHZvaWQ7XG59IHtcbiAgcmV0dXJuIHVzZU1lbW8oKCkgPT4ge1xuICAgIGhvb2tSZWYuY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gaG9va1JlZjtcblxuICAgIGZ1bmN0aW9uIGhvb2tSZWYoY3VycmVudCkge1xuICAgICAgaG9va1JlZi5jdXJyZW50ID0gY3VycmVudDtcbiAgICB9XG4gIH0sIFtdKTtcbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCwgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBtYXBPYmplY3RUb0FycmF5IH0gZnJvbSBcIi4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0VG9BcnJheVwiO1xuXG50eXBlIFRhYmxlTGF5b3V0Q29sdW1uUHJvcHM8Qz4gPSB7XG4gIGtleTogc3RyaW5nO1xuICBwcm9wczogQztcbiAgaW5kZXg6IG51bWJlcjtcbn07XG50eXBlIFRhYmxlTGF5b3V0Um93UHJvcHM8RD4gPSB7XG4gIGtleTogc3RyaW5nO1xuICBkYXRhOiBEO1xuICBpbmRleDogbnVtYmVyO1xufTtcbnR5cGUgVGFibGVMYXlvdXRQcm9wczxULCBDLCBEPiA9IHtcbiAgY29sdW1uczogUmVjb3JkPHN0cmluZywgQz47XG4gIHJvd3M6IFRbXTtcbiAgZ2V0Um93S2V5OiAocm93OiBUKSA9PiBzdHJpbmc7XG4gIGdldFJvd0RhdGE6IChyb3c6IFQpID0+IEQ7XG4gIHJlbmRlckNvbHVtbjogKFxuICAgIHByb3BzOiBUYWJsZUxheW91dENvbHVtblByb3BzPEM+LFxuICAgIGNoaWxkcmVuOiBSZWFjdE5vZGVcbiAgKSA9PiBSZWFjdE5vZGU7XG4gIC8vIFRPRE86IHJlbmFtZSB0byByZW5kZXJDb2x1bW5UaXRsZVxuXG4gIHJlbmRlckNvbHVtblRpdGxlOiAocHJvcHM6IFRhYmxlTGF5b3V0Q29sdW1uUHJvcHM8Qz4pID0+IFJlYWN0Tm9kZTtcbiAgcmVuZGVyUm93Q29sdW1uOiAoXG4gICAgZGF0YTogYW55LFxuICAgIHJvdzogVGFibGVMYXlvdXRSb3dQcm9wczxEPixcbiAgICBjb2x1bW46IFRhYmxlTGF5b3V0Q29sdW1uUHJvcHM8Qz4sXG4gICAga2V5OiBzdHJpbmdcbiAgKSA9PiBSZWFjdE5vZGU7XG5cbiAgcmVuZGVyUm93OiAocHJvcHM6IFRhYmxlTGF5b3V0Um93UHJvcHM8RD4sIGNoaWxkcmVuOiBSZWFjdE5vZGUpID0+IFJlYWN0Tm9kZTtcblxuICByZW5kZXIocHJvcHM6IHsgY29sdW1uczogUmVhY3ROb2RlW107IHJvd3M6IFJlYWN0Tm9kZVtdIH0pOiBSZWFjdEVsZW1lbnQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gVGFibGVMYXlvdXQ8VCwgQywgRD4ocHJvcHM6IFRhYmxlTGF5b3V0UHJvcHM8VCwgQywgRD4pIHtcbiAgY29uc3QgY29sdW1ucyA9IG1hcE9iamVjdFRvQXJyYXkocHJvcHMuY29sdW1ucywgKHByb3BzLCBrZXksIGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIHsgcHJvcHMsIGtleSwgaW5kZXggfTtcbiAgfSk7XG5cbiAgcmV0dXJuIHByb3BzLnJlbmRlcih7XG4gICAgY29sdW1uczogY29sdW1ucy5tYXAoKGNvbHVtbikgPT5cbiAgICAgIHByb3BzLnJlbmRlckNvbHVtbihjb2x1bW4sIHByb3BzLnJlbmRlckNvbHVtblRpdGxlKGNvbHVtbikpXG4gICAgKSxcbiAgICByb3dzOiBwcm9wcy5yb3dzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IHtcbiAgICAgICAga2V5OiBwcm9wcy5nZXRSb3dLZXkoaXRlbSksXG4gICAgICAgIGRhdGE6IHByb3BzLmdldFJvd0RhdGEoaXRlbSksXG4gICAgICAgIGluZGV4LFxuICAgICAgfTtcbiAgICAgIHJldHVybiBwcm9wcy5yZW5kZXJSb3coXG4gICAgICAgIHJvdyxcbiAgICAgICAgY29sdW1ucy5tYXAoKGNvbHVtbikgPT4ge1xuICAgICAgICAgIHJldHVybiBwcm9wcy5yZW5kZXJDb2x1bW4oXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICBwcm9wcy5yZW5kZXJSb3dDb2x1bW4ocm93LmRhdGFbY29sdW1uLmtleV0sIHJvdywgY29sdW1uLCByb3cua2V5KVxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pLFxuICB9KTtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHRvdWNoTWFwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXAvdG91Y2hNYXBcIjtcblxuZXhwb3J0IHR5cGUgUmVhY3RvckV2ZW50PFQ+ID0gbmV3ICguLi5hcmdzKSA9PiBUO1xuXG5leHBvcnQgdHlwZSBSZWFjdG9yTGlzdGVuZXIgPSAoYWN0aW9uOiBhbnkpID0+IHZvaWQ7XG5cbmV4cG9ydCBjbGFzcyBSZWFjdG9yIHtcbiAgcHJvdGVjdGVkIGV2ZW50TWFwID0gbmV3IE1hcCgpO1xuICBwcm90ZWN0ZWQgZXZlbnRMaXN0ZW5lck1hcCA9IG5ldyBNYXA8RnVuY3Rpb24sIFNldDxSZWFjdG9yTGlzdGVuZXI+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBoYW5kbGU/OiAoZXZlbnQ6IG9iamVjdCkgPT4gYm9vbGVhbiB8IHZvaWQpIHt9XG5cbiAgZ2V0TGFzdDxUPihldmVudDogUmVhY3RvckV2ZW50PFQ+KTogVCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50LmNvbnN0cnVjdG9yKTtcbiAgfVxuXG4gIGVtaXQoZXZlbnQ6IG9iamVjdCkge1xuICAgIGlmICh0aGlzLmhhbmRsZT8uKGV2ZW50KSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICB0aGlzLmV2ZW50TWFwLnNldChldmVudC5jb25zdHJ1Y3RvciwgZXZlbnQpO1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuZXZlbnRMaXN0ZW5lck1hcC5nZXQoZXZlbnQuY29uc3RydWN0b3IpO1xuICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgbGlzdGVuZXJzIHx8IFtdKSB7XG4gICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgfVxuICB9XG5cbiAgbGlzdGVuPFQ+KGV2ZW50VHlwZTogUmVhY3RvckV2ZW50PFQ+LCBjYWxsYmFjazogKGFjdGlvbjogVCkgPT4gdm9pZCkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRvdWNoTWFwKFxuICAgICAgdGhpcy5ldmVudExpc3RlbmVyTWFwLFxuICAgICAgZXZlbnRUeXBlLFxuICAgICAgKCkgPT4gbmV3IFNldCgpXG4gICAgKTtcbiAgICBsaXN0ZW5lcnMuYWRkKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgbGlzdGVuZXJzLmRlbGV0ZShjYWxsYmFjayk7XG4gICAgICBpZiAoIWxpc3RlbmVycy5zaXplKSB7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lck1hcC5kZWxldGUoZXZlbnRUeXBlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBSZWFjdG9yQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQobmV3IFJlYWN0b3IoKSk7XG5leHBvcnQgY29uc3QgdXNlUmVhY3RvciA9ICgpID0+IFJlYWN0LnVzZUNvbnRleHQoUmVhY3RvckNvbnRleHQpO1xuXG4vLyBFdmVudE1hcFxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgUmVhY3ROb2RlLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3RvciB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nczIvQ29uc3RydWN0b3JcIjtcbmltcG9ydCB7IFJlYWN0b3IsIFJlYWN0b3JDb250ZXh0LCB1c2VSZWFjdG9yIH0gZnJvbSBcIi4vUmVhY3RvclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gUmVhY3Rvckxpc3RlbmVyPFQgZXh0ZW5kcyBvYmplY3Q+KHtcbiAgZXZlbnRUeXBlLFxuICBjaGlsZHJlbixcbiAgb25FdmVudCxcbn06IHtcbiAgZXZlbnRUeXBlOiBDb25zdHJ1Y3RvcjxUPjtcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbiAgb25FdmVudChldmVudDogVCk6IHZvaWQ7XG59KSB7XG4gIGNvbnN0IHBhcmVudFJlYWN0b3IgPSB1c2VSZWFjdG9yKCk7XG5cbiAgY29uc3QgcmVhY3RvciA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUmVhY3RvcihldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQuY29uc3RydWN0b3IgPT09IGV2ZW50VHlwZSkge1xuICAgICAgICBvbkV2ZW50KGV2ZW50IGFzIFQpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJlbnRSZWFjdG9yLmVtaXQoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LCBbcGFyZW50UmVhY3Rvcl0pO1xuXG4gIHJldHVybiBjcmVhdGVFbGVtZW50KFJlYWN0b3JDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IHJlYWN0b3IsXG4gICAgY2hpbGRyZW4sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdG9yRXZlbnQsIHVzZVJlYWN0b3IgfSBmcm9tIFwiLi9SZWFjdG9yXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VFbWl0dGVkPFQ+KFxuICBhY3Rpb25UeXBlOiBSZWFjdG9yRXZlbnQ8VD4sXG4gIGNhbGxiYWNrPzogKGFjdGlvbjogVCkgPT4gdm9pZCxcbiAgZGVwczogYW55W10gPSBbXVxuKTogdm9pZCB7XG4gIGNvbnN0IHJlYWN0b3IgPSB1c2VSZWFjdG9yKCk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuIHJlYWN0b3IubGlzdGVuKGFjdGlvblR5cGUsIGV2ZW50ID0+IHtcbiAgICAgIGNhbGxiYWNrPy4oZXZlbnQpO1xuICAgIH0pO1xuICB9LCBbcmVhY3RvciwgLi4uZGVwc10pO1xufVxuIiwiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUmVhY3RvckV2ZW50LCB1c2VSZWFjdG9yIH0gZnJvbSBcIi4vUmVhY3RvclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlRW1pdHRlZFN0YXRlPFQ+KFxuICBhY3Rpb25UeXBlOiBSZWFjdG9yRXZlbnQ8VD4sXG4gIGNhbGxiYWNrPzogKGFjdGlvbjogVCkgPT4gdm9pZFxuKTogVCB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IHJlYWN0b3IgPSB1c2VSZWFjdG9yKCk7XG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoKCkgPT4gcmVhY3Rvci5nZXRMYXN0KGFjdGlvblR5cGUpKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gcmVhY3Rvci5saXN0ZW4oYWN0aW9uVHlwZSwgZXZlbnQgPT4ge1xuICAgICAgaWYgKGV2ZW50ICE9IHN0YXRlKSB7XG4gICAgICAgIHNldFN0YXRlKGV2ZW50KTtcbiAgICAgICAgY2FsbGJhY2s/LihldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sIFtyZWFjdG9yXSk7XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuIiwiaW1wb3J0IHsgdXNlUmVhY3RvciB9IGZyb20gXCIuL1JlYWN0b3JcIjtcblxuZXhwb3J0IHR5cGUgUmVhY3RvckVtaXR0ZXIgPSAoZXZlbnQ6IG9iamVjdCkgPT4gdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiB1c2VFbWl0dGVyKCk6IFJlYWN0b3JFbWl0dGVyIHtcbiAgY29uc3QgcmVhY3RvciA9IHVzZVJlYWN0b3IoKTtcbiAgcmV0dXJuIGV2ZW50ID0+IHtcbiAgICByZWFjdG9yLmVtaXQoZXZlbnQpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtjcmVhdGVFbGVtZW50LCBGcmFnbWVudH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBFbXB0eUZyYWdtZW50ID0gY3JlYXRlRWxlbWVudChGcmFnbWVudCk7XG4iLCJpbXBvcnQge3VzZU1lbW99IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtXYWl0ZXJ9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXN5bmMvV2FpdGVyXCI7XG5cbmV4cG9ydCB0eXBlIERlYm91bmNlID0ge1xuICAgIHdhaXQobXM/OiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+O1xuICAgIGNhbmNlbCgpOiB2b2lkO1xuICAgIHJlc29sdmUoKTogdm9pZDtcbn07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIERlYm91bmNlKGRlZmF1bHRNczogbnVtYmVyID0gMTAwMCk6IERlYm91bmNlIHtcblxuICAgIGxldCB0aW1lb3V0OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFzdFdhaXRlcjogV2FpdGVyPGJvb2xlYW4+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB7XG5cbiAgICAgICAgY2FuY2VsLFxuICAgICAgICByZXNvbHZlOiAoKSA9PiB7XG4gICAgICAgICAgICBpZih0aW1lb3V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB3YWl0ZXIgPSBsYXN0V2FpdGVyO1xuICAgICAgICAgICAgbGFzdFdhaXRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHdhaXRlcj8ucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHdhaXQ6IChtcyA9IGRlZmF1bHRNcykgPT4ge1xuICAgICAgICAgICAgY2FuY2VsKCk7XG5cbiAgICAgICAgICAgIGlmICh0aW1lb3V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHdhaXRlciA9IGxhc3RXYWl0ZXIgPSBXYWl0ZXIoKTtcblxuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgd2FpdGVyLnJlc29sdmUobGFzdFdhaXRlciAhPT0gd2FpdGVyKTtcbiAgICAgICAgICAgIH0sIG1zKTtcblxuICAgICAgICAgICAgcmV0dXJuIHdhaXRlcjtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgICBjb25zdCB3YWl0ZXIgPSBsYXN0V2FpdGVyO1xuICAgICAgICBsYXN0V2FpdGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB3YWl0ZXI/LnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIGlmICh0aW1lb3V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZURlYm91bmNlKG1zPzogbnVtYmVyLCBkZXBzID0gW10pIHtcbiAgICByZXR1cm4gdXNlTWVtbygoKSA9PiBEZWJvdW5jZShtcyksIGRlcHMpXG59XG5cbiIsImltcG9ydCB7IFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZW50cmllcyB9IGZyb20gXCIuLi8uLi9jb21tb24vb2JqZWN0L2VudHJpZXNcIjtcbmltcG9ydCB7IHNldFJlZiB9IGZyb20gXCIuL3NldFJlZlwiO1xuXG5leHBvcnQgY29uc3QgJG1lcmdlID0gXCIkbWVyZ2VcIjtcbmNvbnN0ICRkZWZhdWx0ID0gXCIkZGVmYXVsdFwiO1xuXG5leHBvcnQgdHlwZSBQcm9wTWVyZ2VyPFQ+ID1cbiAgfCBSZWNvcmQ8dHlwZW9mICRtZXJnZSwgKHZhbHVlOiBUKSA9PiBUPlxuICB8IFJlY29yZDx0eXBlb2YgJGRlZmF1bHQsIFQ+O1xuXG5mdW5jdGlvbiBtZXJnZUNhbGxiYWNrcyhwcmV2Q2FsbGJhY2s6IEZ1bmN0aW9uLCBuZXh0Q2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhpczogYW55KSB7XG4gICAgY29uc3QgcHJldlJlc3VsdCA9IHByZXZDYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXh0Q2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKSA/PyBwcmV2UmVzdWx0O1xuICB9O1xufVxuXG5mdW5jdGlvbiBtZXJnZVJlZnMocHJldlJlZiwgbmV4dFJlZikge1xuICByZXR1cm4gKGN1cnJlbnQpID0+IHtcbiAgICBzZXRSZWYocHJldlJlZiwgY3VycmVudCk7XG4gICAgc2V0UmVmKG5leHRSZWYsIGN1cnJlbnQpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VQcm9wKHByZXZWYWx1ZSwgbmV4dFZhbHVlKSB7XG4gIGNvbnN0IG5leHRUeXBlID0gdHlwZW9mIG5leHRWYWx1ZTtcblxuICBjb25zdCBwcmV2VHlwZSA9IHR5cGVvZiBwcmV2VmFsdWU7XG5cbiAgLy8gVE9ETzogJHJldmVyc2VcblxuICBpZiAobmV4dFZhbHVlICYmIG5leHRUeXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgaWYgKCRkZWZhdWx0IGluIG5leHRWYWx1ZSkge1xuICAgICAgcmV0dXJuIHByZXZWYWx1ZSA/PyBuZXh0VmFsdWVbJGRlZmF1bHRdO1xuICAgIH1cblxuICAgIGNvbnN0IG1lcmdlciA9IG5leHRWYWx1ZVskbWVyZ2VdO1xuICAgIGlmICh0eXBlb2YgbWVyZ2VyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBtZXJnZXIuY2FsbChuZXh0VmFsdWUsIHByZXZWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChwcmV2VHlwZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXh0VmFsdWUpID09PSBPYmplY3QucHJvdG90eXBlKVxuICAgICAgICByZXR1cm4gbWVyZ2VQcm9wcyh7fSwgbmV4dFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBpZiAobmV4dFR5cGUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gcHJldlZhbHVlID8/IG5leHRWYWx1ZTtcbiAgfVxuXG4gIGlmIChpc1JlZk9iamVjdChwcmV2VmFsdWUpIHx8IGlzUmVmT2JqZWN0KG5leHRWYWx1ZSkpIHtcbiAgICByZXR1cm4gbWVyZ2VSZWZzKHByZXZWYWx1ZSwgbmV4dFZhbHVlKTtcbiAgfVxuXG4gIGlmIChwcmV2VHlwZSA9PT0gbmV4dFR5cGUpIHtcbiAgICBzd2l0Y2ggKHByZXZUeXBlKSB7XG4gICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgIHJldHVybiBgJHtwcmV2VmFsdWV9ICR7bmV4dFZhbHVlfWA7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcmV0dXJuIG1lcmdlQ2FsbGJhY2tzKHByZXZWYWx1ZSwgbmV4dFZhbHVlKTtcbiAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJldlR5cGUpICYmIEFycmF5LmlzQXJyYXkobmV4dFR5cGUpKSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKFwibWVyZ2VCZXR3ZWVuQXJyYXlzXCIpO1xuICAgICAgICAgIHJldHVybiBbLi4ucHJldlZhbHVlLCAuLi5uZXh0VmFsdWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXJnZVByb3BzKHByZXZWYWx1ZSwgbmV4dFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV4dFZhbHVlO1xufVxuXG5leHBvcnQgdHlwZSBOZXh0UHJvcDxUPiA9XG4gIHwgRXhjbHVkZTxULCBQcm9wTWVyZ2VyPGFueT4+XG4gIHwgUHJvcE1lcmdlcjxUPlxuICB8IChUIGV4dGVuZHMgb2JqZWN0ID8gTmV4dFByb3BzPFQ+IDogbmV2ZXIpO1xuXG5leHBvcnQgdHlwZSBOZXh0UHJvcHM8UD4gPSB7XG4gIFtLIGluIGtleW9mIFJlcXVpcmVkPFA+XT86IE5leHRQcm9wPFBbS10+O1xufTtcblxuLypcblxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVByb3BzPFAsIEUgZXh0ZW5kcyBOZXh0UHJvcHM8UD4+KFxuICBwcmV2UHJvcHM6IFAgfCB1bmRlZmluZWQsXG4gIG5leHRQcm9wczogRVxuKTogUCAmIEUge1xuICBsZXQgX3Byb3BzID0geyAuLi5wcmV2UHJvcHMgfTtcblxuICBmb3IgKGxldCBba2V5LCBuZXh0VmFsdWVdIG9mIGVudHJpZXMobmV4dFByb3BzKSkge1xuICAgIF9wcm9wc1trZXldID0gbWVyZ2VQcm9wKF9wcm9wc1trZXldLCBuZXh0VmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIF9wcm9wcyBhcyBhbnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1JlZk9iamVjdChvKTogbyBpcyBSZWFjdC5SZWZPYmplY3Q8YW55PiB7XG4gIHJldHVybiBvICYmIHR5cGVvZiBvID09PSBcIm9iamVjdFwiICYmIFwiY3VycmVudFwiIGluIG87XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnRUeXBlLCBjcmVhdGVFbGVtZW50LCBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFBhcnRpYWxLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9QYXJ0aWFsVW5kZWZpbmVkS2V5c1wiO1xuXG5leHBvcnQgdHlwZSBXaXRoRGVmYXVsdFByb3BzID0ge1xuICA8VD4oZGVmYXVsdFByb3BzOiBUKTogPFA+KFxuICAgIGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxQICYgVD5cbiAgKSA9PiAocHJvcHM6IFAgJiBQYXJ0aWFsPFQ+KSA9PiBSZWFjdEVsZW1lbnQ7XG5cbiAgPFAsIEsgZXh0ZW5kcyBrZXlvZiBQPihcbiAgICBjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8UD4sXG4gICAgZGVmYXVsdFByb3BzOiBQaWNrPFAsIEs+XG4gICk6IChwcm9wczogUGFydGlhbEtleXM8UCwgSz4pID0+IFJlYWN0RWxlbWVudDtcblxuICA8UCwgSyBleHRlbmRzIGtleW9mIFA+KFxuICAgIGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxQPixcbiAgICBnZXREZWZhdWx0UHJvcHM6IChwcm9wczogUGFydGlhbDxQPikgPT4gUGljazxQLCBLPlxuICApOiAocHJvcHM6IFBhcnRpYWxLZXlzPFAsIEs+KSA9PiBSZWFjdEVsZW1lbnQ7XG59O1xuXG5mdW5jdGlvbiBfcGFydGlhbFByb3BzKGNvbXBvbmVudCwgZGVmYXVsdFByb3BzLCBleHRyYURlZmF1bHRQcm9wcz8pIHtcbiAgaWYgKHR5cGVvZiBkZWZhdWx0UHJvcHMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcyhjb21wb25lbnQuZGVmYXVsdFByb3BzID8/IHt9KTtcbiAgfVxuXG4gIGlmIChjb21wb25lbnQuZGVmYXVsdENvbXBvbmVudCkge1xuICAgIHJldHVybiBfcGFydGlhbFByb3BzKGNvbXBvbmVudC5kZWZhdWx0Q29tcG9uZW50LCBkZWZhdWx0UHJvcHMsIHtcbiAgICAgIC4uLmV4dHJhRGVmYXVsdFByb3BzLFxuICAgICAgLi4uY29tcG9uZW50LmRlZmF1bHRQcm9wcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGNvbnNvbGUubG9nKHtjb21wb25lbnR9KTtcbiAgY29uc3QgZnVuYyA9IHByb3BzID0+IHtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKTtcbiAgfTtcblxuICBmdW5jLmRlZmF1bHRDb21wb25lbnQgPSBjb21wb25lbnQ7XG5cbiAgZnVuYy5kaXNwbGF5TmFtZSA9IGNvbXBvbmVudC5kaXNwbGF5TmFtZSA/PyBjb21wb25lbnQubmFtZTtcblxuICBmdW5jLmRlZmF1bHRQcm9wcyA9IHtcbiAgICAuLi5leHRyYURlZmF1bHRQcm9wcyxcbiAgICAuLi5kZWZhdWx0UHJvcHMsXG4gIH07XG5cbiAgcmV0dXJuIGZ1bmM7XG59XG5cbmV4cG9ydCBjb25zdCBwYXJ0aWFsUHJvcHM6IFdpdGhEZWZhdWx0UHJvcHMgPSAoXG4gIGNvbXBvbmVudE9yUHJvcHMsXG4gIHByb3BzP1xuKTogYW55ID0+IHtcbiAgaWYgKHByb3BzKSByZXR1cm4gX3BhcnRpYWxQcm9wcyhjb21wb25lbnRPclByb3BzLCBwcm9wcyk7XG4gIHJldHVybiBjb21wb25lbnQgPT4gX3BhcnRpYWxQcm9wcyhjb21wb25lbnQsIGNvbXBvbmVudE9yUHJvcHMpO1xufTtcbiIsImltcG9ydCB7UmVmfSBmcm9tIFwicmVhY3RcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0UmVmPFQ+KHJlZjogUmVmPFQ+IHwgdW5kZWZpbmVkLCB2YWx1ZTogVCkge1xuICAgIGlmICh0eXBlb2YgcmVmID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJlZih2YWx1ZSk7XG4gICAgZWxzZSBpZiAocmVmKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmVmW1wiY3VycmVudFwiXSA9IHZhbHVlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Fzc2VydFwiO1xuaW1wb3J0IHsgV2Vha01hcEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hcC9tYXBGYWN0b3J5XCI7XG5pbXBvcnQgeyBMYXp5IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYXR0ZXJucy9sYXp5XCI7XG5pbXBvcnQgeyBFbXB0eUZyYWdtZW50IH0gZnJvbSBcIi4uL3V0aWxzL0VtcHR5RnJhZ21lbnRcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZpZXc8UCA9IHt9PiBleHRlbmRzIENvbXBvbmVudDxQLCBvYmplY3Q+IHtcbiAgYWJzdHJhY3QgcmVuZGVyVmlldygpOiBSZWFjdE5vZGU7XG5cbiAgaXNEaWRNb3VudCA9IGZhbHNlO1xuXG4gIGlzV2lsbFVubW91bnQgPSBmYWxzZTtcblxuICBjdXJyZW50U3RhdGUgPSB7fTtcblxuICBpc0RpZFNldFN0YXRlID0gZmFsc2U7XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5pc0RpZE1vdW50ID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuaXNXaWxsVW5tb3VudCA9IHRydWU7XG4gIH1cblxuICB1cGRhdGVWaWV3UHJvcHM/KHByZXZQcm9wczogUmVhZG9ubHk8UD4sIG5leHRQcm9wczogUmVhZG9ubHk8UD4pOiB2b2lkO1xuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShcbiAgICBuZXh0UHJvcHM6IFJlYWRvbmx5PFA+LFxuICAgIG5leHRTdGF0ZTogUmVhZG9ubHk8YW55PixcbiAgICBuZXh0Q29udGV4dDogYW55XG4gICk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnVwZGF0ZVZpZXdQcm9wcykge1xuICAgICAgdGhpcy51cGRhdGVWaWV3UHJvcHModGhpcy5wcm9wcywgbmV4dFByb3BzKTtcbiAgICAgIGlmICh0aGlzLmlzRGlkU2V0U3RhdGUpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJWaWV3KCkgPz8gRW1wdHlGcmFnbWVudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgc2V0Vmlld1N0YXRlS2V5IH0gZnJvbSBcIi4vc2V0Vmlld1N0YXRlS2V5XCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vVmlld1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gVmlld1N0YXRlKCk6IHsgKHRhcmdldDogVmlldzxhbnk+LCBrZXkpOiB2b2lkIH07XG5leHBvcnQgZnVuY3Rpb24gVmlld1N0YXRlPE1ldGhvZCBleHRlbmRzIFByb3BlcnR5S2V5PihcbiAgYmVmb3JlVXBkYXRlTWV0aG9kPzogTWV0aG9kXG4pOiB7XG4gICh0YXJnZXQ6IFZpZXc8YW55PiAmIFJlY29yZDxNZXRob2QsICgpID0+IGFueT4sIGtleSk6IHZvaWQ7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIFZpZXdTdGF0ZSh1cGRhdGVNZXRob2Q/KSB7XG4gIHJldHVybiAodGFyZ2V0OiBWaWV3PGFueT4sIGtleTogc3RyaW5nKSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICBnZXQodGhpczogVmlldykge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGVba2V5XTtcbiAgICAgIH0sXG4gICAgICBzZXQodGhpczogVmlldzxhbnk+LCB2YWx1ZSkge1xuICAgICAgICBpZiAoc2V0Vmlld1N0YXRlS2V5KHRoaXMsIGtleSwgdmFsdWUpKSB7XG4gICAgICAgICAgdXBkYXRlTWV0aG9kICYmIHRoaXNbdXBkYXRlTWV0aG9kXSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL1ZpZXdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZpZXdTdGF0ZUtleSh2aWV3OiBWaWV3LCBrZXk6IHN0cmluZywgdmFsdWUpIHtcbiAgaWYgKHZpZXcuY3VycmVudFN0YXRlW2tleV0gPT09IHZhbHVlKSByZXR1cm4gZmFsc2U7XG4gIHZpZXcuY3VycmVudFN0YXRlW2tleV0gPSB2YWx1ZTtcblxuICBpZiAodmlldy5pc0RpZE1vdW50ICYmICF2aWV3LmlzRGlkU2V0U3RhdGUgJiYgIXZpZXcuaXNXaWxsVW5tb3VudCkge1xuICAgIHZpZXcuaXNEaWRTZXRTdGF0ZSA9IHRydWU7XG4gICAgdmlldy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICB2aWV3LmlzRGlkU2V0U3RhdGUgPSBmYWxzZTtcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCAuLi52aWV3LmN1cnJlbnRTdGF0ZSB9O1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG4iLCJpbXBvcnQgeyBBd2FpdGVkIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9Bc3luY1wiO1xuaW1wb3J0IHsgTG9naW5JbmZvIH0gZnJvbSBcIi4uL2NvbW1vbi9TeXN0ZW1BcHBcIjtcblxudHlwZSBMb2dpbkluZm9QYXlsb2FkID0gQXdhaXRlZDxMb2dpbkluZm8+O1xuXG5leHBvcnQgY2xhc3MgTG9naW5JbmZvRXZlbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogTG9naW5JbmZvUGF5bG9hZCkge31cblxuICBpc1N1Y2Nlc3MoKTogdGhpcyBpcyBhbnkge1xuICAgIHJldHVybiB0aGlzLnBheWxvYWQudHlwZSA9PT0gXCJTVUNDRVNTXCI7XG4gIH1cblxuICBnZXQgc3VjY2VzcygpOiBFeHRyYWN0PExvZ2luSW5mb1BheWxvYWQsIHsgdHlwZTogXCJTVUNDRVNTXCIgfT4gfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnBheWxvYWQudHlwZSA9PT0gXCJTVUNDRVNTXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLnBheWxvYWQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzQWRtaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VjY2Vzcz8uaXNBZG1pbiB8fCBmYWxzZTtcbiAgfVxufVxuXG4vKlxuXG5cbiAgPFJlYWN0b3JQcm92aWRlcj5cblxuICovXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNdWlUZXh0SW5wdXRWaWV3IH0gZnJvbSBcIi4uLy4uL2Jyb3dzZXIvbXVpL3JwYy9pbnB1dHMvTXVpVGV4dElucHV0Vmlld1wiO1xuaW1wb3J0IHsgTGFuZyB9IGZyb20gXCIuLi8uLi9sYW5nL0xhbmdcIjtcbmltcG9ydCB7IElucHV0TWFwVmlldyB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2lucHV0L2lucHV0LW1hcC9JbnB1dE1hcFZpZXdcIjtcbmltcG9ydCB7IElucHV0RXJyb3JIb29rVmlld1Byb3BzIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvSW5wdXRFcnJvckhvb2tcIjtcbmltcG9ydCB7IElucHV0Vmlld0ZuIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvSW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBBY2xHcm91cElucHV0IH0gZnJvbSBcIi4uL2NvbW1vbi9BY2xHcm91cHNNYW5hZ2VyXCI7XG5cbmV4cG9ydCBjb25zdCBNdWlBY2xHcm91cElucHV0VmlldzogSW5wdXRWaWV3Rm48dHlwZW9mIEFjbEdyb3VwSW5wdXQ+ID0gcHJvcHMgPT4ge1xuICByZXR1cm4gKFxuICAgIDxJbnB1dE1hcFZpZXcuRmllbGRzXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICBmaWVsZHM9e3tcbiAgICAgICAgZ3JvdXBOYW1lOiBwcm9wcyA9PiAoXG4gICAgICAgICAgPE11aVRleHRJbnB1dFZpZXdcbiAgICAgICAgICAgIHsuLi5JbnB1dEVycm9ySG9va1ZpZXdQcm9wcyhwcm9wcyl9XG4gICAgICAgICAgICB0aXRsZT17TGFuZ2BHUk9VUF9OQU1FYH1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgfX1cbiAgICAvPlxuICApO1xufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE11aURhdGFNYW5hZ2VyVmlldyB9IGZyb20gXCIuLi8uLi9icm93c2VyL211aS9ycGMvTXVpRGF0YU1hbmFnZXJWaWV3XCI7XG5pbXBvcnQge1xuICBBY2xHcm91cHNNYW5hZ2VyLFxuICBBY2xHcm91cHNNYW5hZ2VyUm91dGVyLFxufSBmcm9tIFwiLi4vY29tbW9uL0FjbEdyb3Vwc01hbmFnZXJcIjtcbmltcG9ydCB7IE11aUFjbEdyb3VwSW5wdXRWaWV3IH0gZnJvbSBcIi4vTXVpQWNsR3JvdXBJbnB1dFZpZXdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aUFjbEdyb3Vwc01hbmFnZXJWaWV3KHJvdXRlcjogdHlwZW9mIEFjbEdyb3Vwc01hbmFnZXJSb3V0ZXIpIHtcbiAgTXVpRGF0YU1hbmFnZXJWaWV3KHtcbiAgICByb3V0ZXIsXG4gICAgY29ubmVjdGlvbjogQWNsR3JvdXBzTWFuYWdlci5zZXJ2aWNlLFxuICAgIHJlbmRlckFkZElucHV0OiBwcm9wcyA9PiA8TXVpQWNsR3JvdXBJbnB1dFZpZXcgey4uLnByb3BzfSAvPixcbiAgfSk7XG59XG4iLCJpbXBvcnQgVHlwb2dyYXBoeSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeVwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTXVpQ2hlY2tib3hJbnB1dFZpZXcgfSBmcm9tIFwiLi4vLi4vYnJvd3Nlci9tdWkvcnBjL2lucHV0cy9NdWlDaGVja2JveElucHV0Vmlld1wiO1xuaW1wb3J0IHsgTXVpRGF0YU1hbmFnZXJWaWV3IH0gZnJvbSBcIi4uLy4uL2Jyb3dzZXIvbXVpL3JwYy9NdWlEYXRhTWFuYWdlclZpZXdcIjtcbmltcG9ydCB7IE11aUZvcm1WaWV3IH0gZnJvbSBcIi4uLy4uL2Jyb3dzZXIvbXVpL3JwYy9NdWlGb3JtVmlld1wiO1xuaW1wb3J0IHsgTGFuZyB9IGZyb20gXCIuLi8uLi9sYW5nL0xhbmdcIjtcbmltcG9ydCB7IERhdGFJbnB1dE1hcFZpZXcgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9pbnB1dC9kYXRhLWlucHV0LW1hcC9EYXRhSW5wdXRNYXBWaWV3XCI7XG5pbXBvcnQgeyBJbnB1dE1hcFZpZXcgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9pbnB1dC9pbnB1dC1tYXAvSW5wdXRNYXBWaWV3XCI7XG5pbXBvcnQge1xuICBBY2xVc2Vyc01hbmFnZXIsXG4gIEFjbFVzZXJzTWFuYWdlclJvdXRlcixcbn0gZnJvbSBcIi4uL2NvbW1vbi9BY2xVc2Vyc01hbmFnZXJcIjtcbmltcG9ydCB7IE11aVVzZXJCYXNpY0luZm9JbnB1dFZpZXcgfSBmcm9tIFwiLi9NdWlVc2VyQmFzaWNJbmZvSW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBNdWlVc2VyQ29udGFjdEluZm9JbnB1dFZpZXcgfSBmcm9tIFwiLi9NdWlVc2VyQ29udGFjdEluZm9JbnB1dFZpZXdcIjtcblxuLy8gTXVpQWNsTWFuYWdlclZpZXdcblxuZXhwb3J0IGZ1bmN0aW9uIE11aUFjbFVzZXJzTWFuYWdlclZpZXcocm91dGVyOiB0eXBlb2YgQWNsVXNlcnNNYW5hZ2VyUm91dGVyKSB7XG4gIE11aURhdGFNYW5hZ2VyVmlldyh7XG4gICAgcm91dGVyLFxuICAgIGNvbm5lY3Rpb246IEFjbFVzZXJzTWFuYWdlci5zZXJ2aWNlLFxuICAgIGVkaXRUYWJzOiB7XG4gICAgICBncm91cHM6IHByb3BzID0+IChcbiAgICAgICAgPE11aUZvcm1WaWV3XG4gICAgICAgICAgey4uLnByb3BzfSAvL1xuICAgICAgICAgIC8vIHN1Ym1pdE9uQ2hhbmdlXG4gICAgICAgICAgb25TdWJtaXQ9eygpID0+IHtcbiAgICAgICAgICAgIC8vIGVtaXQoIG5ldyBBbGVydCh7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gIG1lc3NhZ2U6IExhbmdgU0FWRV9DT01QTEVURWAsXG4gICAgICAgICAgICAvLyAgb3B0aW9uczoge31cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB9KSApXG4gICAgICAgICAgfX1cbiAgICAgICAgICBpbnB1dD17cHJvcHMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPERhdGFJbnB1dE1hcFZpZXdcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgdGFyZ2V0PXsoeyBwcm9wcywgcm93IH0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxNdWlDaGVja2JveElucHV0VmlldyB7Li4ucHJvcHN9IHRpdGxlPXtyb3cubGFiZWx9IC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICByZW5kZXJOb0tleXM9eygpID0+IDxUeXBvZ3JhcGh5PntMYW5nYE5PX0dST1VQU2B9PC9UeXBvZ3JhcGh5Pn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICksXG4gICAgfSxcblxuICAgIHJlbmRlckFkZElucHV0OiBwcm9wcyA9PiA8TXVpVXNlckJhc2ljSW5mb0lucHV0VmlldyB7Li4ucHJvcHN9IC8+LFxuICAgIHJlbmRlckVkaXRJbnB1dDogcHJvcHMgPT4gKFxuICAgICAgPElucHV0TWFwVmlldy5GaWVsZHNcbiAgICAgICAgey4uLnByb3BzfVxuICAgICAgICBmaWVsZHM9e3tcbiAgICAgICAgICBiYXNpY0luZm86IHByb3BzID0+IDxNdWlVc2VyQmFzaWNJbmZvSW5wdXRWaWV3IHsuLi5wcm9wc30gLz4sXG4gICAgICAgICAgY29udGFjdEluZm86IHByb3BzID0+IDxNdWlVc2VyQ29udGFjdEluZm9JbnB1dFZpZXcgey4uLnByb3BzfSAvPixcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgKSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNdWlBZG1pbiB9IGZyb20gXCIuLi8uLi9icm93c2VyL211aS9NdWlBZG1pblwiO1xuaW1wb3J0IHsgTGFuZyB9IGZyb20gXCIuLi8uLi9sYW5nL0xhbmdcIjtcbmltcG9ydCB7IHVzZUVtaXR0ZWRTdGF0ZSB9IGZyb20gXCIuLi8uLi9yZWFjdC9yZWFjdG9yL3VzZUVtaXR0ZWRTdGF0ZVwiO1xuaW1wb3J0IHsgUmVhY3RSb3V0ZXIgfSBmcm9tIFwiLi4vLi4vdHlwZXJvdXRlci9SZWFjdFJvdXRlclwiO1xuaW1wb3J0IHsgTG9naW5JbmZvRXZlbnQgfSBmcm9tIFwiLi9Mb2dpbkluZm9FdmVudFwiO1xuaW1wb3J0IHsgQWRtaW5Sb3V0ZXIgfSBmcm9tIFwiLi4vY29tbW9uL2FkbWluL0FkbWluUm91dGVyXCI7XG5pbXBvcnQgeyBNdWlBY2xHcm91cHNNYW5hZ2VyVmlldyB9IGZyb20gXCIuL011aUFjbEdyb3Vwc01hbmFnZXJWaWV3XCI7XG5pbXBvcnQgeyBNdWlBY2xVc2Vyc01hbmFnZXJWaWV3IH0gZnJvbSBcIi4vTXVpQWNsVXNlcnNNYW5hZ2VyVmlld1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpQWRtaW5WaWV3KHJvdXRlcjogdHlwZW9mIEFkbWluUm91dGVyKSB7XG4gIFJlYWN0Um91dGVyKHJvdXRlciwge1xuICAgIHJlbmRlckRlZmF1bHQocHJvcHMpIHtcbiAgICAgIHJldHVybiBMYW5nYE5PX1JPVVRFXyR7XCJwYXRoXCJ9YCh7XG4gICAgICAgIHBhdGg6IHByb3BzLnJvdXRlLmRlZmF1bHRQYXRoLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICB3cmFwKHsgY2hpbGRyZW4sIGxvY2F0aW9uIH0pIHtcbiAgICAgIGNvbnN0IGxvZ2luSW5mbyA9IHVzZUVtaXR0ZWRTdGF0ZShMb2dpbkluZm9FdmVudCk7XG5cbiAgICAgIGlmICghbG9naW5JbmZvKSB7XG4gICAgICAgIHJldHVybiBMYW5nYEFDQ0VTU19ERU5JRURfQkVDQVVTRV9OT19MT0dJTmA7XG4gICAgICB9XG4gICAgICBjb25zdCB7IHN1Y2Nlc3MgfSA9IGxvZ2luSW5mbztcbiAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gTGFuZ2BBQ0NFU1NfREVOSUVEX0JFQ0FVU0VfTE9HSU5fSVNfTk9UX1NVQ0NFU1NgO1xuICAgICAgfVxuICAgICAgaWYgKCFzdWNjZXNzLmlzQWRtaW4pIHtcbiAgICAgICAgcmV0dXJuIExhbmdgQUNDRVNTX0RFTklFRF9CRUNBVVNFX0xPR0lOX0lTX05PVF9BRE1JTmA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxNdWlBZG1pblxuICAgICAgICAgIG1lbnU9e3tcbiAgICAgICAgICAgIGFjbDoge1xuICAgICAgICAgICAgICAvLyBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0hvbWVcIiksXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiB7XG4gICAgICAgICAgICAgICAgdXNlcnM6IHtcbiAgICAgICAgICAgICAgICAgIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvUGVvcGxlXCIpLFxuICAgICAgICAgICAgICAgICAgb25DbGljaygpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uYXQoXCJhY2xcIikuYXQoXCJ1c2Vyc1wiKS5wdXNoKCk7XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZ3JvdXBzOiB7XG4gICAgICAgICAgICAgICAgICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL1Blb3BsZVwiKSxcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2soKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmF0KFwiYWNsXCIpLmF0KFwiZ3JvdXBzXCIpLnB1c2goKTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhZGRVc2VyOiB7IGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvUGVyc29uQWRkXCIpIH0sXG4gICAgICAgICAgICAgICAgYWRkR3JvdXA6IHsgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9Hcm91cEFkZFwiKSB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L011aUFkbWluPlxuICAgICAgKTtcbiAgICB9LFxuICB9KTtcblxuICByb3V0ZXIuYXQoXCJhY2xcIiwgcm91dGVyID0+IHtcbiAgICBNdWlBY2xVc2Vyc01hbmFnZXJWaWV3KHJvdXRlci5hdChcInVzZXJzXCIpKTtcbiAgICBNdWlBY2xHcm91cHNNYW5hZ2VyVmlldyhyb3V0ZXIuYXQoXCJncm91cHNcIikpO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUJyb3dzZXJIaXN0b3J5IH0gZnJvbSBcImhpc3RvcnlcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZU11aVN5c3RlbSB9IGZyb20gXCIuLi8uLi9icm93c2VyL211aS9jcmVhdGVNdWlTeXN0ZW1cIjtcbmltcG9ydCB7IHVzZUVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vcmVhY3QvcmVhY3Rvci91c2VFbWl0dGVyXCI7XG5pbXBvcnQgeyBSZWFjdFJvdXRlclZpZXcgfSBmcm9tIFwiLi4vLi4vdHlwZXJvdXRlci9SZWFjdFJvdXRlclZpZXdcIjtcbmltcG9ydCB7IFN5c3RlbUxvZ2luSW5mbyB9IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgeyBMb2dpbkluZm9FdmVudCB9IGZyb20gXCIuL0xvZ2luSW5mb0V2ZW50XCI7XG5pbXBvcnQgeyBNdWlTeXN0ZW1WaWV3IH0gZnJvbSBcIi4vTXVpU3lzdGVtVmlld1wiO1xuaW1wb3J0IHsgU3lzdGVtUm91dGVyIH0gZnJvbSBcIi4vU3lzdGVtUm91dGVyXCI7XG5cbmNvbnN0IHsgUHJvdmlkZXI6IE11aVN5c3RlbVByb3ZpZGVyIH0gPSBjcmVhdGVNdWlTeXN0ZW0oKTtcbmNvbnN0IGhpc3RvcnkgPSBjcmVhdGVCcm93c2VySGlzdG9yeSgpO1xuXG5NdWlTeXN0ZW1WaWV3KFN5c3RlbVJvdXRlcik7XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlTeXN0ZW1Sb290VmlldygpIHtcbiAgY29uc3QgZW1pdCA9IHVzZUVtaXR0ZXIoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIFN5c3RlbUxvZ2luSW5mby50aGVuKGxvZ2luSW5mbyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh7IGxvZ2luSW5mbyB9KTtcbiAgICAgIGVtaXQobmV3IExvZ2luSW5mb0V2ZW50KGxvZ2luSW5mbykpO1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TXVpU3lzdGVtUHJvdmlkZXI+XG4gICAgICA8UmVhY3RSb3V0ZXJWaWV3IGhpc3Rvcnk9e2hpc3Rvcnl9IHJvdXRlcj17U3lzdGVtUm91dGVyfSAvPlxuICAgIDwvTXVpU3lzdGVtUHJvdmlkZXI+XG4gICk7XG59XG4iLCJpbXBvcnQgR3JpZCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvR3JpZFwiO1xuaW1wb3J0IFBhcGVyIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9QYXBlclwiO1xuaW1wb3J0IHsgbWFrZVN0eWxlcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIjtcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UeXBvZ3JhcGh5XCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNdWlEYXRhSW5wdXRWaWV3IH0gZnJvbSBcIi4uLy4uL2Jyb3dzZXIvbXVpL3JwYy9pbnB1dHMvTXVpRGF0YUlucHV0Vmlld1wiO1xuaW1wb3J0IHsgTXVpRm9ybVZpZXcgfSBmcm9tIFwiLi4vLi4vYnJvd3Nlci9tdWkvcnBjL011aUZvcm1WaWV3XCI7XG5pbXBvcnQgeyBMYW5nIH0gZnJvbSBcIi4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgdXNlRW1pdHRlZFN0YXRlIH0gZnJvbSBcIi4uLy4uL3JlYWN0L3JlYWN0b3IvdXNlRW1pdHRlZFN0YXRlXCI7XG5pbXBvcnQgeyBXaWRnZXRSb3V0ZXJWaWV3IH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvd2lkZ2V0L1dpZGdldFJvdXRlclZpZXdcIjtcbmltcG9ydCB7IFN5c3RlbUFwcCB9IGZyb20gXCIuLi9jb21tb24vU3lzdGVtQXBwXCI7XG5pbXBvcnQgeyBMb2dpbkluZm9FdmVudCB9IGZyb20gXCIuL0xvZ2luSW5mb0V2ZW50XCI7XG5pbXBvcnQgeyBNdWlBZG1pblZpZXcgfSBmcm9tIFwiLi9NdWlBZG1pblZpZXdcIjtcbmltcG9ydCB7IFN5c3RlbVJvdXRlciB9IGZyb20gXCIuL1N5c3RlbVJvdXRlclwiO1xuXG5jb25zdCB1c2VTdHlsZXMgPSBtYWtlU3R5bGVzKHRoZW1lID0+ICh7XG4gIHBhcGVyOiB7XG4gICAgcGFkZGluZzogdGhlbWUuc3BhY2luZygyKSxcbiAgfSxcbn0pKTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aVN5c3RlbVZpZXcocm91dGVyOiB0eXBlb2YgU3lzdGVtUm91dGVyKSB7XG4gIE11aUFkbWluVmlldyhyb3V0ZXIuYXQoXCJhZG1pblwiKSk7XG4gIFdpZGdldFJvdXRlclZpZXcoXG4gICAgcm91dGVyLmF0KFwibG9naW5cIiksXG4gICAgU3lzdGVtQXBwLnNlcnZpY2UuZGV2TG9naW4sXG4gICAgKHByb3BzLCB7IGVtaXQgfSkgPT4ge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xuICAgICAgY29uc3QgbG9naW5JbmZvID0gdXNlRW1pdHRlZFN0YXRlKExvZ2luSW5mb0V2ZW50KTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICA8R3JpZCBjb250YWluZXIganVzdGlmeT17XCJjZW50ZXJcIn0+XG4gICAgICAgICAgICA8R3JpZCBpdGVtPlxuICAgICAgICAgICAgICB7bG9naW5JbmZvPy5zdWNjZXNzICYmIChcbiAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgICAgIHtMYW5nYFdFTENPTUVfVE9fJHtcImZ1bGxOYW1lXCJ9YCh7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxOYW1lOiBsb2dpbkluZm8uc3VjY2Vzcy5mdWxsTmFtZSxcbiAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPFBhcGVyIGNsYXNzTmFtZT17Y2xhc3Nlcy5wYXBlcn0+XG4gICAgICAgICAgICAgICAgPE11aUZvcm1WaWV3XG4gICAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgICBvblN1Ym1pdD17bG9naW5JbmZvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdChuZXcgTG9naW5JbmZvRXZlbnQobG9naW5JbmZvKSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgaW5wdXQ9e3Byb3BzID0+IChcbiAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICA8TXVpRGF0YUlucHV0Vmlld1xuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e0xhbmdgVVNFUl9UT19MT0dJTmB9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvUGFwZXI+XG4gICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgPC9HcmlkPlxuICAgICAgICA8Lz5cbiAgICAgICk7XG4gICAgfVxuICApO1xufVxuIiwiaW1wb3J0IEdyaWQgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0dyaWRcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE11aVRleHRJbnB1dFZpZXcgfSBmcm9tIFwiLi4vLi4vYnJvd3Nlci9tdWkvcnBjL2lucHV0cy9NdWlUZXh0SW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBMYW5nIH0gZnJvbSBcIi4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgSW5wdXRNYXBWaWV3IH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvaW5wdXQtbWFwL0lucHV0TWFwVmlld1wiO1xuaW1wb3J0IHsgSW5wdXRFcnJvckhvb2tWaWV3UHJvcHMgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9pbnB1dC9JbnB1dEVycm9ySG9va1wiO1xuaW1wb3J0IHsgSW5wdXRWaWV3Rm4gfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9pbnB1dC9JbnB1dFZpZXdcIjtcbmltcG9ydCB7IFVzZXJCYXNpY0luZm9JbnB1dCB9IGZyb20gXCIuLi9jb21tb24vQWNsVXNlcnNNYW5hZ2VyXCI7XG5cbmV4cG9ydCBjb25zdCBNdWlVc2VyQmFzaWNJbmZvSW5wdXRWaWV3OiBJbnB1dFZpZXdGbjx0eXBlb2YgVXNlckJhc2ljSW5mb0lucHV0PiA9IHByb3BzID0+IHtcbiAgcmV0dXJuIChcbiAgICA8R3JpZCBjb250YWluZXIgc3BhY2luZz17MX0+XG4gICAgICA8SW5wdXRNYXBWaWV3LkZpZWxkc1xuICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgIGZpZWxkcz17e1xuICAgICAgICAgIGZpcnN0TmFtZTogcHJvcHMgPT4gKFxuICAgICAgICAgICAgPEdyaWQgaXRlbSB4cz17Nn0+XG4gICAgICAgICAgICAgIDxNdWlUZXh0SW5wdXRWaWV3IHsuLi5wcm9wc30gdGl0bGU9e0xhbmdgRklSU1RfTkFNRWB9IC8+XG4gICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgKSxcbiAgICAgICAgICBsYXN0TmFtZTogcHJvcHMgPT4gKFxuICAgICAgICAgICAgPEdyaWQgaXRlbSB4cz17Nn0+XG4gICAgICAgICAgICAgIDxNdWlUZXh0SW5wdXRWaWV3IHsuLi5wcm9wc30gdGl0bGU9e0xhbmdgTEFTVF9OQU1FYH0gLz5cbiAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICApLFxuICAgICAgICAgIGxvZ2luTmFtZTogcHJvcHMgPT4gKFxuICAgICAgICAgICAgPEdyaWQgaXRlbSB4cz5cbiAgICAgICAgICAgICAgPE11aVRleHRJbnB1dFZpZXdcbiAgICAgICAgICAgICAgICB7Li4uSW5wdXRFcnJvckhvb2tWaWV3UHJvcHMoe1xuICAgICAgICAgICAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgICAgICAgICAgICBlcnJvck1hcDoge1xuICAgICAgICAgICAgICAgICAgICBBTFJFQURZX0VYSVNUUzogTGFuZ2BMT0dJTl9OQU1FX0lTX0FMUkVBRFlfRVhJU1RTYCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgdGl0bGU9e0xhbmdgTE9HSU5fTkFNRWB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgKSxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9HcmlkPlxuICApO1xufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE11aVRleHRJbnB1dFZpZXcgfSBmcm9tIFwiLi4vLi4vYnJvd3Nlci9tdWkvcnBjL2lucHV0cy9NdWlUZXh0SW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBMYW5nIH0gZnJvbSBcIi4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgSW5wdXRNYXBWaWV3IH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvaW5wdXQtbWFwL0lucHV0TWFwVmlld1wiO1xuaW1wb3J0IHsgSW5wdXRWaWV3Rm4gfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9pbnB1dC9JbnB1dFZpZXdcIjtcbmltcG9ydCB7IFVzZXJDb250YWN0SW5mb0lucHV0IH0gZnJvbSBcIi4uL2NvbW1vbi9BY2xVc2Vyc01hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IE11aVVzZXJDb250YWN0SW5mb0lucHV0VmlldzogSW5wdXRWaWV3Rm48dHlwZW9mIFVzZXJDb250YWN0SW5mb0lucHV0PiA9IHByb3BzID0+IHtcbiAgcmV0dXJuIChcbiAgICA8SW5wdXRNYXBWaWV3LkZpZWxkc1xuICAgICAgey4uLnByb3BzfVxuICAgICAgZmllbGRzPXt7XG4gICAgICAgIHBob25lTnVtYmVyOiBwcm9wcyA9PiAoXG4gICAgICAgICAgPE11aVRleHRJbnB1dFZpZXcgey4uLnByb3BzfSB0aXRsZT17TGFuZ2BQSE9ORV9OVU1CRVJgfSAvPlxuICAgICAgICApLFxuICAgICAgICBlbWFpbDogcHJvcHMgPT4gPE11aVRleHRJbnB1dFZpZXcgey4uLnByb3BzfSB0aXRsZT17TGFuZ2BFTUFJTGB9IC8+LFxuICAgICAgfX1cbiAgICAvPlxuICApO1xufTtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCIuLi8uLi90eXBlcm91dGVyL1JvdXRlclwiO1xuaW1wb3J0IHsgQWRtaW5Sb3V0ZXIgfSBmcm9tIFwiLi4vY29tbW9uL2FkbWluL0FkbWluUm91dGVyXCI7XG5cbmV4cG9ydCBjb25zdCBTeXN0ZW1Sb3V0ZXIgPSBSb3V0ZXIoe1xuICBhZG1pbjogQWRtaW5Sb3V0ZXIsXG4gIGxvZ2luOiBSb3V0ZXIoKSxcbn0pO1xuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IHVzZUFycmF5VG9TZXEgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FycmF5L3VzZUFycmF5VG9TZXFcIjtcbmltcG9ydCB7IGhhbmRsZVJwY1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9ScGNcIjtcbmltcG9ydCB7IFN5c3RlbUFwcCB9IGZyb20gXCIuLi9jb21tb24vU3lzdGVtQXBwXCI7XG5pbXBvcnQgeyBNdWlTeXN0ZW1Sb290VmlldyB9IGZyb20gXCIuL011aVN5c3RlbVJvb3RWaWV3XCI7XG5cbnVzZUFycmF5VG9TZXEoKTtcblxuaGFuZGxlUnBjU2VydmljZShTeXN0ZW1BcHAsIHBheWxvYWQgPT4ge1xuICByZXR1cm4gZmV0Y2goXCIvc2VydmljZVwiLCB7XG4gICAgbWV0aG9kOiBcInBvc3RcIixcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBTeXN0ZW1Mb2dpbkluZm8gPSBTeXN0ZW1BcHAuc2VydmljZS5nZXRMb2dpbkluZm8oKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgUmVhY3RET00ucmVuZGVyKFxuICAgIGNyZWF0ZUVsZW1lbnQoTXVpU3lzdGVtUm9vdFZpZXcpLCAvL1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3lzdGVtXCIpXG4gICk7XG59KTtcbiIsImltcG9ydCB7IERhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvZGF0YS1tYW5hZ2VyL0RhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgeyBEYXRhTWFuYWdlclJvdXRlciB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2RhdGEtbWFuYWdlci9EYXRhTWFuYWdlclJvdXRlclwiO1xuaW1wb3J0IHsgSW5wdXRNYXAgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9pbnB1dC9pbnB1dC1tYXAvSW5wdXRNYXBcIjtcbmltcG9ydCB7IElucHV0RXJyb3JIb29rIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvSW5wdXRFcnJvckhvb2tcIjtcbmltcG9ydCB7IE5hbWVJbnB1dCB9IGZyb20gXCIuL05hbWVJbnB1dFwiO1xuXG5leHBvcnQgY29uc3QgQWNsR3JvdXBJbnB1dCA9IElucHV0TWFwKHtcbiAgZ3JvdXBOYW1lOiBJbnB1dEVycm9ySG9vazxcIkFMUkVBRFlfRVhJU1RTXCI+KCkoTmFtZUlucHV0KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgQWNsR3JvdXBzTWFuYWdlciA9IERhdGFNYW5hZ2VyKHtcbiAgYWRkSW5wdXQ6IEFjbEdyb3VwSW5wdXQsXG4gIHRhYmxlUm93VHlwZTogeyBncm91cE5hbWU6IFN0cmluZyB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBBY2xHcm91cHNNYW5hZ2VyUm91dGVyID0gRGF0YU1hbmFnZXJSb3V0ZXIoQWNsR3JvdXBzTWFuYWdlcik7XG4iLCJpbXBvcnQgeyBEYXRhTWFuYWdlciB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2RhdGEtbWFuYWdlci9EYXRhTWFuYWdlclwiO1xuXG5pbXBvcnQgeyBEYXRhTWFuYWdlclJvdXRlciB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2RhdGEtbWFuYWdlci9EYXRhTWFuYWdlclJvdXRlclwiO1xuaW1wb3J0IHsgQm9vbElucHV0IH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvYm9vbC1pbnB1dC9Cb29sSW5wdXRcIjtcbmltcG9ydCB7IERhdGFJbnB1dE1hcCB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2lucHV0L2RhdGEtaW5wdXQtbWFwL0RhdGFJbnB1dE1hcFwiO1xuaW1wb3J0IHsgSW5wdXRNYXAgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9pbnB1dC9pbnB1dC1tYXAvSW5wdXRNYXBcIjtcbmltcG9ydCB7IElucHV0RXJyb3JIb29rIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvSW5wdXRFcnJvckhvb2tcIjtcbmltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2lucHV0L3RleHQtaW5wdXQvVGV4dElucHV0XCI7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybVwiO1xuaW1wb3J0IHsgTmFtZUlucHV0IH0gZnJvbSBcIi4vTmFtZUlucHV0XCI7XG5cbi8qXG5cbklucHV0V2l0aEVycm9yPD4oKVxuXG4vLyBjaGVja1xuXG5JbnB1dFdpdGhFcnJvclZpZXdQcm9wcygpXG5JbmxpbmVJbnB1dCh7XG4gIHRhcmdldDogVGV4dElucHV0KClcbiAgZXJyb3I6IFR5cGluZzwuLi4+KCksXG5cbn0pXG5cbi8vIElubGluZUlucHV0RXJyb3Jcbi8vIElubGluZVdpZGdldEVsZW10blxuXG4gKi9cblxuZXhwb3J0IGNvbnN0IFVzZXJCYXNpY0luZm9JbnB1dCA9IElucHV0TWFwKHtcbiAgZmlyc3ROYW1lOiBOYW1lSW5wdXQsXG4gIGxhc3ROYW1lOiBOYW1lSW5wdXQsXG4gIGxvZ2luTmFtZTogSW5wdXRFcnJvckhvb2s8XCJBTFJFQURZX0VYSVNUU1wiPigpKFxuICAgIFRleHRJbnB1dCh7XG4gICAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWUsXG4gICAgfSlcbiAgKSxcbn0pO1xuXG4vKlxuXG5jb25zdCBjdXJyZW50VGFiU3RhdGUgPSB1c2VSb3V0ZXJMb2NhdGlvblN0YXRlKGxvY2F0aW9uLCBcImN1cnJlbnRUYWJcIik7XG5cblxuXG4vLyBlbWl0KG5ldyBMb2NhdGlvblN0YXRlKFwieFwiLCBcImFzZGFkXCIpKVxuXG48VGFicyB2aWV3IGN1cnJlbnRUYWJTdGF0ZT17KCk9PiB1c2VSb3V0ZXJMb2NhdGlvblN0YXRlKGxvY2F0aW9uLCBcImN1cnJlbnRUYWJcIil9IC8+XG4gKi9cbmV4cG9ydCBjb25zdCBVc2VyQ29udGFjdEluZm9JbnB1dCA9IElucHV0TWFwKHtcbiAgcGhvbmVOdW1iZXI6IFRleHRJbnB1dCh7IG51bGxhYmxlOiB0cnVlLCB0cmltOiB0cnVlIH0pLFxuICBlbWFpbDogVGV4dElucHV0KHsgbnVsbGFibGU6IHRydWUsIHRyaW06IHRydWUgfSksXG59KTtcblxuZXhwb3J0IGNvbnN0IEFjbFVzZXJzTWFuYWdlciA9IERhdGFNYW5hZ2VyKHtcbiAgYWRkSW5wdXQ6IFVzZXJCYXNpY0luZm9JbnB1dCxcbiAgZWRpdElucHV0OiBJbnB1dE1hcCh7XG4gICAgYmFzaWNJbmZvOiBVc2VyQmFzaWNJbmZvSW5wdXQsXG4gICAgY29udGFjdEluZm86IFVzZXJDb250YWN0SW5mb0lucHV0LFxuICB9KSxcbiAgdGFibGVSb3dUeXBlOiB7XG4gICAgbG9naW5OYW1lOiBTdHJpbmcsXG4gICAgZmlyc3ROYW1lOiBTdHJpbmcsXG4gICAgbGFzdE5hbWU6IFN0cmluZyxcbiAgfSxcblxuICAvLyBlZGl0Q29udHJvbGxlclxuICAvLyBkZWZhdWx0UGFyYW1cbiAgZWRpdFRhYnM6IHtcbiAgICAvLyBUT0RPOiBncm91cHNcbiAgICBncm91cHM6IEZvcm0oe1xuICAgICAgaW5wdXQ6IERhdGFJbnB1dE1hcChCb29sSW5wdXQoKSksXG4gICAgfSksXG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IEFjbFVzZXJzTWFuYWdlclJvdXRlciA9IERhdGFNYW5hZ2VyUm91dGVyKEFjbFVzZXJzTWFuYWdlcik7XG4iLCJpbXBvcnQgeyBScGNGbiB9IGZyb20gXCIuLi8uLi90eXBlcnBjL3JwYy1mbi9ScGNGblwiO1xuaW1wb3J0IHsgUnBjTWFwIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvcnBjLW1hcC9ScGNNYXBcIjtcbmltcG9ydCB7IEFjbEdyb3Vwc01hbmFnZXIgfSBmcm9tIFwiLi9BY2xHcm91cHNNYW5hZ2VyXCI7XG5pbXBvcnQgeyBBY2xVc2Vyc01hbmFnZXIgfSBmcm9tIFwiLi9BY2xVc2Vyc01hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IEFkbWluQXBwID0gUnBjTWFwKHtcbiAgdXNlcnNNYW5hZ2VyOiBBY2xVc2Vyc01hbmFnZXIsXG4gIGdyb3Vwc01hbmFnZXI6IEFjbEdyb3Vwc01hbmFnZXIsXG59KTtcbiIsImltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2lucHV0L3RleHQtaW5wdXQvVGV4dElucHV0XCI7XG5cbmV4cG9ydCBjb25zdCBOYW1lSW5wdXQgPSBUZXh0SW5wdXQoe1xuICBtaW5MZW5ndGg6IDIsXG4gIG1heExlbmd0aDogMjAsXG4gIHJlcXVpcmVkOiB0cnVlLFxuICB0cmltOiB0cnVlLFxufSk7XG4iLCJpbXBvcnQgeyBQYXlsb2FkIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9QYXlsb2FkXCI7XG5pbXBvcnQgeyBUeXBlUmVmIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9UeXBlUmVmXCI7XG5pbXBvcnQgeyBUeXBpbmcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL1R5cGluZ1wiO1xuaW1wb3J0IHsgRGF0YUlucHV0IH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvZGF0YS1pbnB1dC9EYXRhSW5wdXRcIjtcbmltcG9ydCB7IFJwY0ZuIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvcnBjLWZuL1JwY0ZuXCI7XG5pbXBvcnQgeyBScGNNYXAgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9ycGMtbWFwL1JwY01hcFwiO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gXCIuLi8uLi90eXBlcnBjL3dpZGdldC9mb3JtL0Zvcm1cIjtcbmltcG9ydCB7IEFkbWluQXBwIH0gZnJvbSBcIi4vQWRtaW5BcHBcIjtcbmltcG9ydCB7IFVzZXJBcHAgfSBmcm9tIFwiLi9Vc2VyQXBwXCI7XG5cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IERldkxvZ2luVXNlcjogdW5pcXVlIHN5bWJvbDtcblxuZXhwb3J0IHR5cGUgTG9naW5JbmZvID0gUGF5bG9hZDx7XG4gIEZBSUxFRDoge307XG4gIFNVQ0NFU1M6IHtcbiAgICBmdWxsTmFtZTogc3RyaW5nO1xuICAgIGlzQWRtaW46IGJvb2xlYW47XG4gIH07XG59PjtcblxuLy8gUmVtb3RlUHJvbWlzZTxYPlxuLy8gdHlwZTogcmVqZWN0ZWRcbi8vIHR5cGU6IHJlc29sdmVkXG5cbmV4cG9ydCBjb25zdCBEZXZMb2dpbiA9IEZvcm0oe1xuICBpbnB1dDogRGF0YUlucHV0KHtcbiAgICBsb2FkVHlwZTogVHlwZVJlZigoKSA9PiBEZXZMb2dpblVzZXIpLFxuICB9KSxcbiAgdmFsdWU6IFR5cGluZzxMb2dpbkluZm8+KCksXG59KTtcblxuZXhwb3J0IGNvbnN0IFN5c3RlbUFwcCA9IFJwY01hcCh7XG4gIGxvZ291dDogUnBjRm4oKSxcblxuICBnZXRMb2dpbkluZm86IFJwY0ZuPCgpID0+IExvZ2luSW5mbz4oKSxcblxuICBkZXZMb2dpbjogRGV2TG9naW4sXG5cbiAgYWRtaW46IEFkbWluQXBwLFxuXG4gIHVzZXI6IFVzZXJBcHAsXG59KTtcbiIsImltcG9ydCB7IFJwY0ZuIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvcnBjLWZuL1JwY0ZuXCI7XG5pbXBvcnQgeyBScGNNYXAgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9ycGMtbWFwL1JwY01hcFwiO1xuXG5leHBvcnQgY29uc3QgVXNlckFwcCA9IFJwY01hcCh7XG4gIGZvbzogUnBjRm4oKSxcbn0pO1xuIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVyb3V0ZXIvUm91dGVyXCI7XG5pbXBvcnQgeyBBY2xHcm91cHNNYW5hZ2VyUm91dGVyIH0gZnJvbSBcIi4uL0FjbEdyb3Vwc01hbmFnZXJcIjtcbmltcG9ydCB7IEFjbFVzZXJzTWFuYWdlclJvdXRlciB9IGZyb20gXCIuLi9BY2xVc2Vyc01hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IEFkbWluUm91dGVyID0gUm91dGVyKHtcbiAgYWNsOiBSb3V0ZXIoe1xuICAgIHVzZXJzOiBBY2xVc2Vyc01hbmFnZXJSb3V0ZXIsXG4gICAgZ3JvdXBzOiBBY2xHcm91cHNNYW5hZ2VyUm91dGVyLFxuICB9KSxcbn0pO1xuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50LCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFdlYWtNYXBGYWN0b3J5IH0gZnJvbSBcIi4uL2NvbW1vbi9tYXAvbWFwRmFjdG9yeVwiO1xuaW1wb3J0IHsgY3JlYXRlUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vcmVhY3QvY3JlYXRlUmVuZGVyZXJDb21wb25lbnRcIjtcbmltcG9ydCB7IFJlYWN0b3JFbWl0dGVyIH0gZnJvbSBcIi4uL3JlYWN0L3JlYWN0b3IvdXNlRW1pdHRlclwiO1xuaW1wb3J0IHsgY3JlYXRlVW5kZWZpbmVkQ29udGV4dCB9IGZyb20gXCIuLi9yZWFjdC91dGlscy9ob29rcy9jcmVhdGVVbmRlZmluZWRDb250ZXh0XCI7XG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gXCIuL1JvdXRlXCI7XG5pbXBvcnQgeyBBbnlSb3V0ZXIsIFJvdXRlciwgVFJvdXRlciB9IGZyb20gXCIuL1JvdXRlclwiO1xuaW1wb3J0IHsgQW55Um91dGVyTG9jYXRpb24sIFJvdXRlckxvY2F0aW9uIH0gZnJvbSBcIi4vUm91dGVyTG9jYXRpb25cIjtcblxudHlwZSBfUmVuZGVyZXJQcm9wczxUIGV4dGVuZHMgVFJvdXRlciwgUiBleHRlbmRzIFJvdXRlID0gUm91dGU+ID0ge1xuICBsb2NhdGlvbjogUm91dGVyTG9jYXRpb248VD47XG4gIHJvdXRlOiBSO1xuICBlbWl0OiBSZWFjdG9yRW1pdHRlcjtcblxuICBzdGF0ZTogYW55O1xuICBzZXRTdGF0ZTogKHN0YXRlOiBhbnkpID0+IHZvaWQ7XG59O1xudHlwZSBfV3JhcHBlclByb3BzPFQgZXh0ZW5kcyBUUm91dGVyPiA9IF9SZW5kZXJlclByb3BzPFQ+ICYge1xuICBjaGlsZHJlbjogUmVhY3ROb2RlO1xufTtcbnR5cGUgX1JlbmRlcmVyPFQgZXh0ZW5kcyBUUm91dGVyLCBSIGV4dGVuZHMgUm91dGUgPSBSb3V0ZT4gPSAoXG4gIHByb3BzOiBfUmVuZGVyZXJQcm9wczxULCBSPlxuKSA9PiBSZWFjdEVsZW1lbnQ7XG50eXBlIF9XcmFwcGVyPFQgZXh0ZW5kcyBUUm91dGVyPiA9IChwcm9wczogX1dyYXBwZXJQcm9wczxUPikgPT4gUmVhY3RFbGVtZW50O1xuXG5leHBvcnQgdHlwZSBSZWFjdFJvdXRlck9wdGlvbnM8VCBleHRlbmRzIFRSb3V0ZXI+ID0ge1xuICB3cmFwPzogX1dyYXBwZXI8VD47XG5cbiAgcmVuZGVyPzogX1JlbmRlcmVyPFQ+O1xuICByZW5kZXJEZWZhdWx0PzogX1JlbmRlcmVyPFQsIEV4dHJhY3Q8Um91dGUsIHsgdHlwZTogXCJERUZBVUxUXCIgfT4+O1xuICByZW5kZXJJbmRleD86IF9SZW5kZXJlcjxULCBFeHRyYWN0PFJvdXRlLCB7IHR5cGU6IFwiSU5ERVhcIiB9Pj47XG4gIHJlbmRlck5vUGFyYW0/OiBfUmVuZGVyZXI8VCwgRXh0cmFjdDxSb3V0ZSwgeyB0eXBlOiBcIk5PX1BBUkFNXCIgfT4+O1xufTtcblxuZXhwb3J0IHR5cGUgUmVhY3RSb3V0ZXIgPSB7XG4gIHB1c2gobG9jYXRpb246IEFueVJvdXRlckxvY2F0aW9uKTtcblxuICBmaW5kKHJvdXRlcik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gUmVhY3RSb3V0ZXI8VCBleHRlbmRzIFRSb3V0ZXI+KFxuICByb3V0ZXI6IFJvdXRlcjxUPixcbiAgb3B0aW9uc09yUmVuZGVyZXI6IFJlYWN0Um91dGVyT3B0aW9uczxUPiB8IF9SZW5kZXJlcjxUPlxuKSB7XG4gIGxldCBvcHRpb25zOiBSZWFjdFJvdXRlck9wdGlvbnM8VFJvdXRlcj47XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zT3JSZW5kZXJlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgb3B0aW9ucyA9IHsgcmVuZGVyOiBvcHRpb25zT3JSZW5kZXJlciBhcyBhbnkgfTtcbiAgfSBlbHNlIHtcbiAgICBvcHRpb25zID0gb3B0aW9uc09yUmVuZGVyZXIgYXMgYW55O1xuICB9XG5cbiAgY29uc3Qge1xuICAgIHdyYXA6IHdyYXBwZXIsXG4gICAgcmVuZGVyLFxuICAgIHJlbmRlckRlZmF1bHQsXG4gICAgcmVuZGVySW5kZXgsXG4gICAgcmVuZGVyTm9QYXJhbSxcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgaW5mbyA9IGdldFJlYWN0Um91dGVyTWV0YWRhdGEocm91dGVyKTtcblxuICB3cmFwcGVyICYmIGluZm8ud3JhcHBlcnMucHVzaCh3cmFwcGVyKTtcblxuICBjb25zdCB7IHJlbmRlcmVyOiBwcmV2UmVuZGVyIH0gPSBpbmZvO1xuXG4gIGluZm8ucmVuZGVyZXIgPSBwcm9wcyA9PiB7XG4gICAgc3dpdGNoIChwcm9wcy5yb3V0ZS50eXBlKSB7XG4gICAgICBjYXNlIFwiREVGQVVMVFwiOlxuICAgICAgICBpZiAocmVuZGVyRGVmYXVsdCkgcmV0dXJuIHByb3BzIGFzIGFueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiSU5ERVhcIjpcbiAgICAgICAgaWYgKHJlbmRlckluZGV4KSByZXR1cm4gcmVuZGVySW5kZXgocHJvcHMgYXMgYW55KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiTk9fUEFSQU1cIjpcbiAgICAgICAgaWYgKHJlbmRlck5vUGFyYW0pIHJldHVybiByZW5kZXJOb1BhcmFtKHByb3BzIGFzIGFueSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gKHJlbmRlciB8fCBwcmV2UmVuZGVyKT8uKHByb3BzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFJlYWN0Um91dGVyTWV0YWRhdGEgPSBXZWFrTWFwRmFjdG9yeSgocm91dGVyOiBBbnlSb3V0ZXIpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB3cmFwcGVyczogW10gYXMgX1dyYXBwZXI8VFJvdXRlcj5bXSxcbiAgICByZW5kZXJlcjogdW5kZWZpbmVkIGFzIHVuZGVmaW5lZCB8IF9SZW5kZXJlcjxUUm91dGVyPixcbiAgfTtcbn0pO1xuIiwiaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gXCJoaXN0b3J5XCI7XG5pbXBvcnQge1xuICBjcmVhdGVDb250ZXh0LFxuICBjcmVhdGVFbGVtZW50LFxuICBGcmFnbWVudCxcbiAgUmVhY3ROb2RlLFxuICB1c2VFZmZlY3QsXG4gIHVzZVN0YXRlLFxufSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUVtaXR0ZWQgfSBmcm9tIFwiLi4vcmVhY3QvcmVhY3Rvci91c2VFbWl0dGVkXCI7XG5pbXBvcnQgeyB1c2VFbWl0dGVyIH0gZnJvbSBcIi4uL3JlYWN0L3JlYWN0b3IvdXNlRW1pdHRlclwiO1xuaW1wb3J0IHsgZ2V0UmVhY3RSb3V0ZXJNZXRhZGF0YSB9IGZyb20gXCIuL1JlYWN0Um91dGVyXCI7XG5pbXBvcnQgeyBnZXRSb3V0ZUJ5UGF0aCwgUm91dGUgfSBmcm9tIFwiLi9Sb3V0ZVwiO1xuaW1wb3J0IHsgQW55Um91dGVyIH0gZnJvbSBcIi4vUm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJMb2NhdGlvbiB9IGZyb20gXCIuL1JvdXRlckxvY2F0aW9uXCI7XG5cbmV4cG9ydCB0eXBlIFJlYWN0Um91dGVyVmlld1Byb3BzID0ge1xuICByb3V0ZXI6IEFueVJvdXRlcjtcbiAgaGlzdG9yeTogSGlzdG9yeTtcbn07XG5cbmNvbnN0IEhpc3RvcnlDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxIaXN0b3J5Pih1bmRlZmluZWQhKTtcblxuLy8gZW1pdChuZXcgTG9jYXRpb25TdGF0ZSguLi4pKVxuXG4vLyBIaXN0b3J5QWN0aW9uKCgpPT4ge30pXG5cbi8vIHVzZURlZmF1bHRFbWl0dGVkKEhpc3RvcnksIG15SGlzdG9yeSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFjdFJvdXRlclZpZXcoe1xuICByb3V0ZXI6IHJvb3RSb3V0ZXIsXG4gIGhpc3RvcnksXG59OiBSZWFjdFJvdXRlclZpZXdQcm9wcykge1xuICBjb25zdCBlbWl0ID0gdXNlRW1pdHRlcigpO1xuXG4gIGNvbnN0IFtyb3V0ZXJTdGF0ZSwgc2V0Um91dGVyU3RhdGVdID0gdXNlU3RhdGUoKCkgPT4ge1xuICAgIGNvbnN0IHJvdXRlID0gZ2V0Um91dGVCeUhpc3RvcnkoKTtcbiAgICByZXR1cm4ge1xuICAgICAgcm91dGUsXG4gICAgICBlbGVtZW50OiBjcmVhdGVSb3V0ZUVsZW1lbnQocm91dGUsIGhpc3RvcnkubG9jYXRpb24uc3RhdGUpLFxuICAgIH07XG4gIH0pO1xuXG4gIHVzZUVtaXR0ZWQoXG4gICAgUm91dGVyTG9jYXRpb24sXG4gICAgbG9jYXRpb24gPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBsb2NhdGlvbi5yb290LnJvdXRlciA9PT0gcm9vdFJvdXRlciAmJlxuICAgICAgICBsb2NhdGlvbi5wYXRoICE9PSByb3V0ZXJTdGF0ZS5yb3V0ZS5sb2NhdGlvbi5wYXRoXG4gICAgICApIHtcbiAgICAgICAgaGlzdG9yeS5wdXNoKGxvY2F0aW9uLnBhdGgpO1xuICAgICAgICBwdXNoUm91dGUoe1xuICAgICAgICAgIHR5cGU6IFwiSU5ERVhcIixcbiAgICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgICBwYXRoOiBsb2NhdGlvbi5wYXRoLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtyb3V0ZXJTdGF0ZV1cbiAgKTtcblxuICB1c2VFZmZlY3QoXG4gICAgKCkgPT5cbiAgICAgIGhpc3RvcnkubGlzdGVuKCgpID0+IHtcbiAgICAgICAgaWYgKGhpc3RvcnkubG9jYXRpb24ucGF0aG5hbWUgIT09IHJvdXRlclN0YXRlLnJvdXRlLmxvY2F0aW9uLnBhdGgpIHtcbiAgICAgICAgICBwdXNoUm91dGUoZ2V0Um91dGVCeUhpc3RvcnkoKSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgIFtoaXN0b3J5LCByb3V0ZXJTdGF0ZV1cbiAgKTtcblxuICByZXR1cm4gcm91dGVyU3RhdGUuZWxlbWVudDtcblxuICBmdW5jdGlvbiBzZXRMb2NhdGlvblN0YXRlKHN0YXRlKSB7XG4gICAgaGlzdG9yeS5yZXBsYWNlKGhpc3RvcnkubG9jYXRpb24ucGF0aG5hbWUsIHtcbiAgICAgIC4uLmhpc3RvcnkubG9jYXRpb24uc3RhdGUsXG4gICAgICAuLi5zdGF0ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2hSb3V0ZShyb3V0ZTogUm91dGUpIHtcbiAgICBzZXRSb3V0ZXJTdGF0ZSh7XG4gICAgICByb3V0ZSxcbiAgICAgIGVsZW1lbnQ6IGNyZWF0ZVJvdXRlRWxlbWVudChyb3V0ZSwgdW5kZWZpbmVkKSxcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlRWxlbWVudChyb3V0ZTogUm91dGUsIHN0YXRlKSB7XG4gICAgbGV0IGNoaWxkcmVuOiBSZWFjdE5vZGUgPSB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCByb3V0ZXJNZXRhZGF0YSA9IGdldFJlYWN0Um91dGVyTWV0YWRhdGEocm91dGUubG9jYXRpb24ucm91dGVyKTtcblxuICAgIGlmIChyb3V0ZXJNZXRhZGF0YS5yZW5kZXJlcikge1xuICAgICAgY29uc3QgcGF0aCA9IHJvdXRlLmxvY2F0aW9uLnBhdGg7XG4gICAgICBjaGlsZHJlbiA9IGNyZWF0ZUVsZW1lbnQocm91dGVyTWV0YWRhdGEucmVuZGVyZXIsIHtcbiAgICAgICAga2V5OiBwYXRoICsgXCI6aW5kZXhcIixcbiAgICAgICAgZW1pdCxcbiAgICAgICAgcm91dGUsXG4gICAgICAgIGxvY2F0aW9uOiByb3V0ZS5sb2NhdGlvbixcbiAgICAgICAgc3RhdGU6IHN0YXRlPy5bcGF0aF0sXG4gICAgICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgICAgc2V0TG9jYXRpb25TdGF0ZSh7IFtwYXRoXTogc3RhdGUgfSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGxvY2F0aW9uIG9mIHJvdXRlLmxvY2F0aW9uLmdldFBhcmVudHMoKSkge1xuICAgICAgY29uc3QgcGF0aCA9IHJvdXRlLmxvY2F0aW9uLnBhdGg7XG4gICAgICBjb25zdCByb3V0ZXJNZXRhZGF0YSA9IGdldFJlYWN0Um91dGVyTWV0YWRhdGEobG9jYXRpb24ucm91dGVyKTtcbiAgICAgIGZvciAoY29uc3QgW2luZGV4LCB3cmFwcGVyXSBvZiByb3V0ZXJNZXRhZGF0YS53cmFwcGVycy5lbnRyaWVzKCkpIHtcbiAgICAgICAgY2hpbGRyZW4gPSBjcmVhdGVFbGVtZW50KHdyYXBwZXIsIHtcbiAgICAgICAgICBrZXk6IGxvY2F0aW9uLnBhdGggKyBcIjp3cmFwcGVyOlwiICsgaW5kZXgsXG4gICAgICAgICAgZW1pdCxcbiAgICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgICByb3V0ZSxcbiAgICAgICAgICBzdGF0ZTogc3RhdGU/LltwYXRoXSxcbiAgICAgICAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICAgICAgc2V0TG9jYXRpb25TdGF0ZSh7IFtwYXRoXTogc3RhdGUgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoRnJhZ21lbnQsIG51bGwsIGNoaWxkcmVuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFJvdXRlQnlIaXN0b3J5KCkge1xuICAgIHJldHVybiBnZXRSb3V0ZUJ5UGF0aChcbiAgICAgIFJvdXRlckxvY2F0aW9uLmNyZWF0ZShyb290Um91dGVyLCBlbWl0KSxcbiAgICAgIGhpc3RvcnkubG9jYXRpb24ucGF0aG5hbWVcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBnZXROZXh0UGF0aCB9IGZyb20gXCIuLi9jb21tb24vZ2V0TmV4dFBhdGhcIjtcbmltcG9ydCB7IHRlc3RNZXRhVHlwZSB9IGZyb20gXCIuLi9jb21tb24vTWV0YVR5cGVcIjtcbmltcG9ydCB7IFBheWxvYWQgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3MyL1BheWxvYWRcIjtcbmltcG9ydCB7IEFueVJvdXRlciwgUm91dGVyIH0gZnJvbSBcIi4vUm91dGVyXCI7XG5pbXBvcnQgeyBBbnlSb3V0ZXJMb2NhdGlvbiwgUm91dGVyTG9jYXRpb24gfSBmcm9tIFwiLi9Sb3V0ZXJMb2NhdGlvblwiO1xuXG5leHBvcnQgdHlwZSBSb3V0ZSA9IFBheWxvYWQ8XG4gIHtcbiAgICBJTkRFWDoge307XG4gICAgREVGQVVMVDoge1xuICAgICAgZGVmYXVsdFBhdGg6IHN0cmluZztcbiAgICB9O1xuICAgIE5PX1BBUkFNOiB7XG4gICAgICBwYXJhbXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gICAgICBwYXJhbUtleTogc3RyaW5nO1xuICAgICAgcGFyYW1JbmRleDogbnVtYmVyO1xuICAgIH07XG4gIH0sXG4gIHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgbG9jYXRpb246IEFueVJvdXRlckxvY2F0aW9uO1xuICB9XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um91dGVCeVBhdGgoXG4gIGxvY2F0aW9uOiBBbnlSb3V0ZXJMb2NhdGlvbixcbiAgcGF0aDogc3RyaW5nXG4pOiBSb3V0ZSB7XG4gIGNvbnN0IGJhc2VQcm9wcyA9IHsgcGF0aCB9O1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3QgZGVmYXVsdFBhdGggPSBwYXRoO1xuICAgIGxldCBuYW1lOiBzdHJpbmc7XG4gICAgW25hbWUsIHBhdGhdID0gZ2V0TmV4dFBhdGgocGF0aCk7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICByZXR1cm4geyAuLi5iYXNlUHJvcHMsIHR5cGU6IFwiSU5ERVhcIiwgbG9jYXRpb24gfTtcbiAgICB9XG4gICAgY29uc3Qgcm91dGVyID0gbG9jYXRpb24ucm91dGVyLmNoaWxkcmVuW25hbWVdO1xuICAgIGlmICghcm91dGVyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlUHJvcHMsXG4gICAgICAgIHR5cGU6IFwiREVGQVVMVFwiLFxuICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgZGVmYXVsdFBhdGgsXG4gICAgICB9O1xuICAgIH1cbiAgICBsZXQgcGFyYW1zID0ge307XG4gICAgZm9yIChjb25zdCBbcGFyYW1JbmRleCwgcGFyYW1LZXldIG9mIHJvdXRlci5wYXJhbXMuZW50cmllcygpKSB7XG4gICAgICBsZXQgdmFsdWU6IHN0cmluZztcbiAgICAgIFt2YWx1ZSwgcGF0aF0gPSBnZXROZXh0UGF0aChwYXRoKTtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5iYXNlUHJvcHMsXG4gICAgICAgICAgdHlwZTogXCJOT19QQVJBTVwiLFxuICAgICAgICAgIGxvY2F0aW9uLFxuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICBwYXJhbUluZGV4LFxuICAgICAgICAgIHBhcmFtS2V5LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcGFyYW1zW3BhcmFtS2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICBsb2NhdGlvbiA9IG5ldyBSb3V0ZXJMb2NhdGlvbihcbiAgICAgIHJvdXRlcixcbiAgICAgIHBhcmFtcyxcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgbmFtZSxcbiAgICAgIGxvY2F0aW9uLmVtaXRcbiAgICApO1xuICB9XG59XG50ZXN0TWV0YVR5cGUoUm91dGVyKFtcInBcIl0pLCB0ID0+IHtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICB0LlRSb3V0ZXIuUGFyYW1zLng7XG5cbiAgdC5UUm91dGVyLlBhcmFtcy5wO1xufSk7XG50ZXN0TWV0YVR5cGUoUm91dGVyKHsgYTogUm91dGVyKFtcInBcIl0pIH0pLCB0ID0+IHtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICB0LlRSb3V0ZXIuUGFyYW1zLng7XG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICB0LlRSb3V0ZXIuQ2hpbGRyZW4uYS5QYXJhbXMueDtcblxuICB0LlRSb3V0ZXIuQ2hpbGRyZW4uYS5QYXJhbXMucDtcbn0pO1xuXG50ZXN0TWV0YVR5cGUoXG4gIFJvdXRlcih7XG4gICAgYTogUm91dGVyKFtcInBcIl0sIHtcbiAgICAgIGFhOiBSb3V0ZXIoW1wicHBcIl0pLFxuICAgIH0pLFxuICB9KSxcbiAgdCA9PiB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHQuVFJvdXRlci5QYXJhbXMueDtcblxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICB0LlRSb3V0ZXIuQ2hpbGRyZW4uYS5QYXJhbXMueDtcblxuICAgIHQuVFJvdXRlci5DaGlsZHJlbi5hLlBhcmFtcy5wO1xuXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHQuVFJvdXRlci5DaGlsZHJlbi5hLkNoaWxkcmVuLmFhLlBhcmFtcy54O1xuXG4gICAgdC5UUm91dGVyLkNoaWxkcmVuLmEuQ2hpbGRyZW4uYWEuUGFyYW1zLnBwO1xuICB9XG4pO1xuIiwiaW1wb3J0IHsgV2Vha01hcEZhY3RvcnkgfSBmcm9tIFwiLi4vY29tbW9uL21hcC9tYXBGYWN0b3J5XCI7XG5pbXBvcnQgeyBNZXRhVHlwZSwgV2l0aE1ldGFUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9NZXRhVHlwZVwiO1xuaW1wb3J0IHsgbWFwT2JqZWN0IH0gZnJvbSBcIi4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0XCI7XG5pbXBvcnQgeyBFeHBlY3QgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3MyL0V4cGVjdFwiO1xuaW1wb3J0IHsgSWZOZXZlciB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nczIvSWZOZXZlclwiO1xuaW1wb3J0IHsgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3MyL092ZXJyaWRlXCI7XG5cbmV4cG9ydCB0eXBlIEFueVJvdXRlck1hcCA9IFJlY29yZDxzdHJpbmcsIFJvdXRlcjxUUm91dGVyPj47XG5cbmV4cG9ydCB0eXBlIFRSb3V0ZXIgPSB7XG4gIFBhcmVudD86IFRSb3V0ZXI7XG4gIFBhcmFtczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgU3RhY2s6IFJlY29yZDxzdHJpbmcsIFRSb3V0ZXI+O1xuICBDaGlsZHJlbjogUmVjb3JkPHN0cmluZywgVFJvdXRlcj47XG59O1xuXG5leHBvcnQgdHlwZSBSb3V0ZXJQcm9wcyA9IHR5cGVvZiBSb3V0ZXJUeXBlICYgUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlUm91dGVyPjtcblxuZXhwb3J0IHR5cGUgVEVtcHR5Um91dGVyID0gRXhwZWN0PFxuICBUUm91dGVyLFxuICBPdmVycmlkZTxcbiAgICBUUm91dGVyLFxuICAgIHtcbiAgICAgIFN0YWNrOiB7fTtcbiAgICAgIENoaWxkcmVuOiB7fTtcbiAgICAgIFBhcmFtczoge307XG4gICAgfVxuICA+XG4+O1xuZXhwb3J0IHR5cGUgUm91dGVyTWFwVHlwZTxUIGV4dGVuZHMgQW55Um91dGVyTWFwPiA9IHtcbiAgW0sgaW4ga2V5b2YgVF06IFJvdXRlclR5cGU8VFtLXT47XG59O1xuZXhwb3J0IHR5cGUgUm91dGVyV2l0aENoaWxkcmVuPFxuICBDIGV4dGVuZHMgQW55Um91dGVyTWFwLFxuICBQIGV4dGVuZHMgb2JqZWN0ID0ge31cbj4gPSBSb3V0ZXI8XG4gIE92ZXJyaWRlPFxuICAgIFAgJiBURW1wdHlSb3V0ZXIsXG4gICAge1xuICAgICAgQ2hpbGRyZW46IFJvdXRlck1hcFR5cGU8Qz47XG4gICAgfVxuICA+XG4+O1xuZXhwb3J0IHR5cGUgUm91dGVyV2l0aFBhcmFtczxcbiAgUCBleHRlbmRzIHN0cmluZyxcbiAgQyBleHRlbmRzIEFueVJvdXRlck1hcCA9IHt9XG4+ID0gUm91dGVyPFxuICBPdmVycmlkZTxcbiAgICBURW1wdHlSb3V0ZXIsXG4gICAge1xuICAgICAgUGFyYW1zOiBSZWNvcmQ8UCwgc3RyaW5nPjtcbiAgICAgIENoaWxkcmVuOiBSb3V0ZXJNYXBUeXBlPEM+O1xuICAgIH1cbiAgPlxuPjtcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXI8VCBleHRlbmRzIFRSb3V0ZXIgPSBURW1wdHlSb3V0ZXI+XG4gIGV4dGVuZHMgV2l0aE1ldGFUeXBlPHsgVFJvdXRlcjogVCB9PixcbiAgICBSb3V0ZXJQcm9wcyB7fVxuXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZXIocGFyYW1zOiBzdHJpbmdbXSwgY2hpbGRyZW46IFJlY29yZDxzdHJpbmcsIEFueVJvdXRlcj4pIHtcbiAgcmV0dXJuIHtcbiAgICBjaGlsZHJlbixcbiAgICBwYXJhbXMsXG4gICAgYmFzZXM6IG5ldyBTZXQ8QW55Um91dGVyPigpLFxuICB9O1xufVxuZXhwb3J0IHR5cGUgUm91dGVyVHlwZTxUIGV4dGVuZHMgQW55Um91dGVyPiA9IE1ldGFUeXBlPFQ+W1wiVFJvdXRlclwiXTtcblxuZXhwb3J0IHR5cGUgQW55Um91dGVyID0gUm91dGVyPFRSb3V0ZXI+O1xuXG5leHBvcnQgZnVuY3Rpb24gUm91dGVyKCk6IFJvdXRlcjx7XG4gIFBhcmFtczoge307XG4gIFN0YWNrOiB7fTtcbiAgQ2hpbGRyZW46IHt9O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBSb3V0ZXI8QyBleHRlbmRzIEFueVJvdXRlck1hcD4oXG4gIGNoaWxkcmVuOiBDXG4pOiBSb3V0ZXI8e1xuICBQYXJhbXM6IHt9O1xuICBTdGFjazoge307XG4gIENoaWxkcmVuOiBSb3V0ZXJNYXBUeXBlPEM+O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBSb3V0ZXI8SyBleHRlbmRzIHN0cmluZz4oXG4gIHBhcmFtczogS1tdXG4pOiBSb3V0ZXI8e1xuICBQYXJhbXM6IFJlY29yZDxzdHJpbmcgJiBLLCBzdHJpbmc+O1xuICBTdGFjazoge307XG4gIENoaWxkcmVuOiB7fTtcbn0+O1xuZXhwb3J0IGZ1bmN0aW9uIFJvdXRlcjxLIGV4dGVuZHMgc3RyaW5nLCBDIGV4dGVuZHMgQW55Um91dGVyTWFwPihcbiAgcGFyYW1zOiBLW10sXG4gIGNoaWxkcmVuOiBDXG4pOiBSb3V0ZXI8e1xuICBQYXJhbXM6IFJlY29yZDxzdHJpbmcgJiBLLCBzdHJpbmc+O1xuICBTdGFjazoge307XG4gIENoaWxkcmVuOiBSb3V0ZXJNYXBUeXBlPEM+O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBSb3V0ZXIocGFyYW1zT3JDaGlsZHJlbj8sIG1heWJlQ2hpbGRyZW4/KSB7XG4gIGxldCBwYXJhbXMsIGNoaWxkcmVuO1xuICBpZiAobWF5YmVDaGlsZHJlbikge1xuICAgIFtwYXJhbXMsIGNoaWxkcmVuXSA9IFtwYXJhbXNPckNoaWxkcmVuLCBtYXliZUNoaWxkcmVuXTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbXNPckNoaWxkcmVuKSkge1xuICAgICAgW3BhcmFtcywgY2hpbGRyZW5dID0gW3BhcmFtc09yQ2hpbGRyZW4sIHt9XTtcbiAgICB9IGVsc2Uge1xuICAgICAgW3BhcmFtcywgY2hpbGRyZW5dID0gW1tdLCBwYXJhbXNPckNoaWxkcmVuIHx8IHt9XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZihjcmVhdGVSb3V0ZXIocGFyYW1zLCBjaGlsZHJlbiksIFJvdXRlclR5cGUpO1xufVxuXG5leHBvcnQgdHlwZSBSb3V0ZXJBdDxcbiAgVCBleHRlbmRzIFRSb3V0ZXIsIC8vXG4gIEsgZXh0ZW5kcyBrZXlvZiBUW1wiQ2hpbGRyZW5cIl1cbj4gPSBSb3V0ZXI8XG4gIFRbXCJDaGlsZHJlblwiXVtLXSAmIHtcbiAgICBQYXJlbnQ6IFQ7XG4gICAgU3RhY2s6IFRbXCJTdGFja1wiXSAmIFJlY29yZDxLLCBUW1wiQ2hpbGRyZW5cIl1bS10+O1xuICB9XG4+O1xuXG5leHBvcnQgbmFtZXNwYWNlIFJvdXRlclR5cGUge1xuICBleHBvcnQgZnVuY3Rpb24gYXQ8VCBleHRlbmRzIFRSb3V0ZXIsIEsgZXh0ZW5kcyBrZXlvZiBUW1wiQ2hpbGRyZW5cIl0+KFxuICAgIHRoaXM6IFJvdXRlcjxUPixcbiAgICBrZXk6IHN0cmluZyAmIEtcbiAgKTogUm91dGVyQXQ8VCwgSz47XG4gIGV4cG9ydCBmdW5jdGlvbiBhdDxUIGV4dGVuZHMgVFJvdXRlciwgSyBleHRlbmRzIGtleW9mIFRbXCJDaGlsZHJlblwiXT4oXG4gICAgdGhpczogUm91dGVyPFQ+LFxuICAgIGtleTogc3RyaW5nICYgSyxcbiAgICBjYWxsYmFjazogKHJvdXRlcjogUm91dGVyQXQ8VCwgSz4pID0+IHZvaWRcbiAgKTogUm91dGVyPFQ+O1xuICBleHBvcnQgZnVuY3Rpb24gYXQodGhpczogQW55Um91dGVyLCBrZXksIGNhbGxiYWNrPykge1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sodGhpcy5jaGlsZHJlbltrZXldKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltrZXldO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZTxUIGV4dGVuZHMgVFJvdXRlcj4odGhpczogUm91dGVyPFQ+KTogUm91dGVyPFQ+IHtcbiAgICBjb25zdCByb3V0ZXIgPSBSb3V0ZXIoXG4gICAgICB0aGlzLnBhcmFtcyxcbiAgICAgIG1hcE9iamVjdCh0aGlzLmNoaWxkcmVuLCBjID0+IGMuY3JlYXRlKCkpXG4gICAgKSBhcyBSb3V0ZXI8VD47XG5cbiAgICByb3V0ZXIuYmFzZXMuYWRkKHRoaXMpO1xuICAgIGZvciAoY29uc3QgYmFzZSBvZiB0aGlzLmJhc2VzKSB7XG4gICAgICByb3V0ZXIuYmFzZXMuYWRkKGJhc2UpO1xuICAgIH1cbiAgICByZXR1cm4gcm91dGVyO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGlzUm91dGVyT2YodGhpczogQW55Um91dGVyLCBiYXNlOiBBbnlSb3V0ZXIpIHtcbiAgICByZXR1cm4gdGhpcyA9PT0gYmFzZSB8fCB0aGlzLmJhc2VzLmhhcyhiYXNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZW50cmllcyB9IGZyb20gXCIuLi9jb21tb24vb2JqZWN0L2VudHJpZXNcIjtcbmltcG9ydCB7IExhenkgfSBmcm9tIFwiLi4vY29tbW9uL3BhdHRlcm5zL2xhenlcIjtcbmltcG9ydCB7IGpvaW5VcmwgfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy9qb2luVXJsXCI7XG5pbXBvcnQgeyBIYXNLZXlzIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzMi9ib29sZWFuXCI7XG5pbXBvcnQgeyBPdmVycmlkZSB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nczIvT3ZlcnJpZGVcIjtcbmltcG9ydCB7IGluc3BlY3QgfSBmcm9tIFwiLi4vbG9nZ2luZy9pbnNwZWN0XCI7XG5pbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi9yZWFjdC9tYW5pcHVsYXRlXCI7XG5pbXBvcnQgeyBSZWFjdG9yRW1pdHRlciB9IGZyb20gXCIuLi9yZWFjdC9yZWFjdG9yL3VzZUVtaXR0ZXJcIjtcbmltcG9ydCB7IFZhbHVlUmVmIH0gZnJvbSBcIi4uL3JlYWN0L1ZhbHVlUmVmXCI7XG5pbXBvcnQgeyBMb2NhdGlvblN0YXRlRXZlbnQgfSBmcm9tIFwiLi9Mb2NhdGlvblN0YXRlRXZlbnRcIjtcbmltcG9ydCB7IEFueVJvdXRlciwgUm91dGVyLCBSb3V0ZXJBdCwgUm91dGVyVHlwZSwgVFJvdXRlciB9IGZyb20gXCIuL1JvdXRlclwiO1xuXG5leHBvcnQgdHlwZSBBbnlSb3V0ZXJMb2NhdGlvbiA9IFJvdXRlckxvY2F0aW9uPFRSb3V0ZXI+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckxvY2F0aW9uPFQgZXh0ZW5kcyBUUm91dGVyPiB7fVxuXG5leHBvcnQgY2xhc3MgUm91dGVyTG9jYXRpb248VCBleHRlbmRzIFRSb3V0ZXI+IHtcbiAgc3RhdGljIGNyZWF0ZTxUIGV4dGVuZHMgVFJvdXRlcj4oXG4gICAgcm91dGVyOiBSb3V0ZXI8VD4sXG4gICAgZW1pdDogUmVhY3RvckVtaXR0ZXIgPSAoZXZlbnQ6IGFueSkgPT4gdm9pZCAwXG4gICk6IFJvdXRlckxvY2F0aW9uPFQ+IHtcbiAgICBpZiAocm91dGVyLnBhcmFtcy5sZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGNyZWF0ZSBSb3V0ZXJMb2NhdGlvbiBmb3IgJHtpbnNwZWN0KHRoaXMpfS5gKTtcbiAgICByZXR1cm4gbmV3IFJvdXRlckxvY2F0aW9uKHJvdXRlciwge30sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBlbWl0KTtcbiAgfVxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgX3JvdXRlcjogQW55Um91dGVyLFxuICAgIHByb3RlY3RlZCBfcGFyYW1zOiBhbnksXG4gICAgcHJvdGVjdGVkIF9wYXJlbnQ6IEFueVJvdXRlckxvY2F0aW9uIHwgdW5kZWZpbmVkLFxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgcHVibGljIGVtaXRcbiAgKSB7fVxuXG4gIEBMYXp5KCkgZ2V0IHBhdGgoKTogc3RyaW5nIHtcbiAgICBsZXQgcGF0aDogc3RyaW5nID0gam9pblVybCh0aGlzLl9wYXJlbnQ/LnBhdGggfHwgXCJcIiwgdGhpcy5uYW1lKTtcbiAgICBmb3IgKGNvbnN0IHBhcmFtS2V5IG9mIHRoaXMuX3JvdXRlci5wYXJhbXMpIHtcbiAgICAgIHBhdGggPSBqb2luVXJsKHBhdGgsIHRoaXMuX3BhcmFtc1twYXJhbUtleV0pO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIGdldCBwYXJlbnQoKTogVFtcIlBhcmVudFwiXSBleHRlbmRzIFRSb3V0ZXJcbiAgICA/IFJvdXRlckxvY2F0aW9uPFRbXCJQYXJlbnRcIl0+XG4gICAgOiB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQgYXMgYW55O1xuICB9XG5cbiAgZ2V0IHJvb3QoKTogQW55Um91dGVyTG9jYXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ/LnJvb3QgfHwgKHRoaXMgYXMgYW55KTtcbiAgfVxuXG4gIGdldCByb3V0ZXIoKTogUm91dGVyPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcm91dGVyIGFzIFJvdXRlcjxUPjtcbiAgfVxuXG4gIGdldCBwYXJhbXMoKTogVFtcIlBhcmFtc1wiXSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmFtcztcbiAgfVxuXG4gIHB1c2goKSB7XG4gICAgdGhpcy5lbWl0KHRoaXMpO1xuICB9XG5cbiAgYXQ8VCBleHRlbmRzIFRSb3V0ZXIsIEsgZXh0ZW5kcyBrZXlvZiBUW1wiQ2hpbGRyZW5cIl0+KFxuICAgIHRoaXM6IFJvdXRlckxvY2F0aW9uPFQ+LFxuICAgIGtleTogc3RyaW5nICYgSyxcbiAgICAuLi5bcGFyYW1zXTogSGFzS2V5czxUW1wiQ2hpbGRyZW5cIl1bS11bXCJQYXJhbXNcIl0+IGV4dGVuZHMgZmFsc2VcbiAgICAgID8gW11cbiAgICAgIDogW1RbXCJDaGlsZHJlblwiXVtLXVtcIlBhcmFtc1wiXV1cbiAgKTogUm91dGVyTG9jYXRpb248Um91dGVyVHlwZTxSb3V0ZXJBdDxULCBLPj4+IHtcbiAgICByZXR1cm4gPGFueT4oXG4gICAgICBuZXcgUm91dGVyTG9jYXRpb24oXG4gICAgICAgIHRoaXMuX3JvdXRlci5jaGlsZHJlbltrZXldLFxuICAgICAgICBwYXJhbXMgfHwge30sXG4gICAgICAgIHRoaXMgYXMgYW55LFxuICAgICAgICBrZXksXG4gICAgICAgIHRoaXMuZW1pdFxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBhdFN0YWNrPFQgZXh0ZW5kcyBUUm91dGVyLCBLIGV4dGVuZHMga2V5b2YgVFtcIlN0YWNrXCJdPihcbiAgICB0aGlzOiBSb3V0ZXJMb2NhdGlvbjxUPixcbiAgICBrZXk6IEtcbiAgKTogUm91dGVyTG9jYXRpb248VFtcIlN0YWNrXCJdW0tdPiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH1cblxuICAqZ2V0UGFyZW50cyh0aGlzOiBBbnlSb3V0ZXJMb2NhdGlvbikge1xuICAgIGZvciAobGV0IHBhcmVudCA9IHRoaXM7IHBhcmVudDsgcGFyZW50ID0gcGFyZW50LnBhcmVudCEpIHtcbiAgICAgIHlpZWxkIHBhcmVudDtcbiAgICB9XG4gIH1cblxuICAqZ2V0UGFyZW50c0NoaWxkcmVuKHRoaXM6IEFueVJvdXRlckxvY2F0aW9uKSB7XG4gICAgZm9yIChsZXQgW25hbWUsIHJvdXRlcl0gb2YgZW50cmllcyh0aGlzLl9yb3V0ZXIuY2hpbGRyZW4pKSB7XG4gICAgICBpZiAocm91dGVyLnBhcmFtcy5sZW5ndGgpIGNvbnRpbnVlO1xuICAgICAgeWllbGQgbmV3IFJvdXRlckxvY2F0aW9uKHJvdXRlciwge30sIHRoaXMsIG5hbWUsIHRoaXMuZW1pdCk7XG4gICAgfVxuICB9XG5cbiAgKmdldENoaWxkcmVuKHRoaXM6IEFueVJvdXRlckxvY2F0aW9uKTogSXRlcmFibGVJdGVyYXRvcjxBbnlSb3V0ZXJMb2NhdGlvbj4ge1xuICAgIGZvciAoY29uc3QgW25hbWUsIHJvdXRlcl0gb2YgZW50cmllcyh0aGlzLl9yb3V0ZXIuY2hpbGRyZW4pKSB7XG4gICAgICBpZiAoIXJvdXRlci5wYXJhbXMubGVuZ3RoKSB7XG4gICAgICAgIHlpZWxkIG5ldyBSb3V0ZXJMb2NhdGlvbihyb3V0ZXIsIHt9LCB0aGlzLCBuYW1lLCB0aGlzLmVtaXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCAqZmluZENoaWxkcmVuKFxuICAgIHRoaXM6IEFueVJvdXRlckxvY2F0aW9uXG4gICk6IEl0ZXJhYmxlSXRlcmF0b3I8QW55Um91dGVyTG9jYXRpb24+IHtcbiAgICB5aWVsZCogdGhpcy5nZXRDaGlsZHJlbigpO1xuICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuZ2V0Q2hpbGRyZW4oKSkge1xuICAgICAgeWllbGQqIGNoaWxkLmZpbmRDaGlsZHJlbigpO1xuICAgIH1cbiAgfVxuXG4gICpmaW5kUGFyZW50cyh0aGlzOiBBbnlSb3V0ZXJMb2NhdGlvbikge1xuICAgIGxldCByb290OiBBbnlSb3V0ZXJMb2NhdGlvbiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgcGFyZW50Um91dGVycyA9IG5ldyBTZXQ8QW55Um91dGVyPigpO1xuICAgIGZvciAoY29uc3QgcGFyZW50IG9mIHRoaXMuZ2V0UGFyZW50cygpKSB7XG4gICAgICBwYXJlbnRSb3V0ZXJzLmFkZChwYXJlbnQucm91dGVyKTtcbiAgICAgIHlpZWxkIChyb290ID0gcGFyZW50KTtcbiAgICB9XG4gICAgaWYgKHJvb3QpIHtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygcm9vdC5maW5kQ2hpbGRyZW4oKSkge1xuICAgICAgICBpZiAoIXBhcmVudFJvdXRlcnMuaGFzKGNoaWxkLnJvdXRlcikpIHtcbiAgICAgICAgICB5aWVsZCBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfZmluZChcbiAgICBsb2NhdGlvbnM6IEl0ZXJhYmxlPEFueVJvdXRlckxvY2F0aW9uPixcbiAgICByb3V0ZXI6IEFueVJvdXRlclxuICApOiBBbnlSb3V0ZXJMb2NhdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBsb2NhdGlvbnMpIHtcbiAgICAgIGlmIChjaGlsZC5yb3V0ZXIuaXNSb3V0ZXJPZihyb3V0ZXIpKSB7XG4gICAgICAgIHJldHVybiBjaGlsZCBhcyBBbnlSb3V0ZXJMb2NhdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaW5kPFQgZXh0ZW5kcyBUUm91dGVyPihcbiAgICB0aGlzOiBBbnlSb3V0ZXJMb2NhdGlvbixcbiAgICByb3V0ZXI6IFJvdXRlcjxUPlxuICApOlxuICAgIHwgUm91dGVyTG9jYXRpb248T3ZlcnJpZGU8VCwgUGljazxUUm91dGVyLCBcIlBhcmVudFwiIHwgXCJTdGFja1wiPj4+XG4gICAgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9maW5kKHRoaXMuZmluZFBhcmVudHMoKSwgcm91dGVyKSBhcyBhbnk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nczIvQXN5bmNcIjtcbmltcG9ydCB7IFJwY0Vycm9yIH0gZnJvbSBcIi4vUnBjXCI7XG5cbmNvbnN0IHJlc3VsdFN5bWJvbCA9IFN5bWJvbCgpO1xuXG5leHBvcnQgdHlwZSBDb25maWdGYWN0b3J5UmVzdWx0PEM+ID0gQXdhaXRhYmxlPHsgW3Jlc3VsdFN5bWJvbF06IEMgfT47XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0ZhY3RvcnlGbjxDPiA9IChjb25maWc6IEMpID0+IENvbmZpZ0ZhY3RvcnlSZXN1bHQ8Qz47XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0ZhY3Rvcnk8QywgVSBleHRlbmRzIGFueVtdID0gW10+ID0gKFxuICAkOiBDb25maWdGYWN0b3J5Rm48Qz4sXG4gIC4uLmFyZ3M6IFVcbikgPT4gQ29uZmlnRmFjdG9yeVJlc3VsdDxDPjtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ0ZhY3Rvcnk8QywgVSBleHRlbmRzIGFueVtdPihcbiAgY29uZmlnOiBDb25maWdGYWN0b3J5PEMsIFU+IHwgdW5kZWZpbmVkLFxuICAuLi5hcmdzOiBVXG4pOiBQcm9taXNlPEMgfCB1bmRlZmluZWQ+O1xuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ0ZhY3Rvcnk8QywgVSBleHRlbmRzIGFueVtdPihcbiAgY29uZmlnOiBDb25maWdGYWN0b3J5PEMsIFU+LFxuICAuLi5hcmdzOiBVXG4pOiBQcm9taXNlPEM+O1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIENvbmZpZ0ZhY3RvcnkoY29uZmlnLCBjb250ZXh0LCAuLi5hcmdzKSB7XG4gIGlmICghY29uZmlnKSByZXR1cm47XG4gIGxldCByZXN1bHQgPSBhd2FpdCBjb25maWcoXG4gICAgJCA9PiB7XG4gICAgICByZXR1cm4geyBbcmVzdWx0U3ltYm9sXTogJCB9O1xuICAgIH0sXG4gICAgY29udGV4dCxcbiAgICAuLi5hcmdzXG4gICk7XG4gIGlmICghcmVzdWx0IHx8ICEocmVzdWx0U3ltYm9sIGluIHJlc3VsdCkpIHtcbiAgICB0aHJvdyBuZXcgUnBjRXJyb3IoYFlvdSBoYXZlIHRvIHVzZSAkYCk7XG4gIH1cbiAgd2hpbGUgKHJlc3VsdFN5bWJvbCBpbiByZXN1bHQpIHtcbiAgICByZXN1bHQgPSByZXN1bHRbcmVzdWx0U3ltYm9sXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IHsgdG91Y2hNYXAgfSBmcm9tIFwiLi4vY29tbW9uL21hcC90b3VjaE1hcFwiO1xuaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzMi9Bc3luY1wiO1xuaW1wb3J0IHsgSXNOZXZlciB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nczIvYm9vbGVhbi9Jc05ldmVyXCI7XG5pbXBvcnQgeyBGbiB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nczIvRm5cIjtcblxuY29uc3QgZ2VuZXJpY0NvbmZpZ0NhY2hlID0gbmV3IFdlYWtNYXAoKTtcblxuZGVjbGFyZSBjb25zdCBpc0dlbmVyaWNDb25maWc6IHVuaXF1ZSBzeW1ib2w7XG5cbmV4cG9ydCB0eXBlIEdlbmVyaWNDb25maWdDb25maWd1cmU8XG4gIFQgZXh0ZW5kcyBHZW5lcmljQ29uZmlnPEZuPlxuPiA9IFQgZXh0ZW5kcyBHZW5lcmljQ29uZmlnPGluZmVyIFU+ID8gVSA6IG5ldmVyO1xuZXhwb3J0IHR5cGUgR2VuZXJpY0NvbmZpZzxUIGV4dGVuZHMgRm4gPSBhbnk+ID0ge1xuICAoY29uZmlndXJlOiBUKTogQXdhaXRhYmxlPFJldHVyblR5cGU8VD4+O1xuICBbaXNHZW5lcmljQ29uZmlnXT86IHRydWU7XG59O1xuZXhwb3J0IHR5cGUgSXNHZW5lcmljQ29uZmlnPFQ+ID0gSXNOZXZlcjxUPiBleHRlbmRzIHRydWVcbiAgPyBmYWxzZSB8IHRydWVcbiAgOiBUIGV4dGVuZHMgRm5cbiAgPyBSZXF1aXJlZDxUPiBleHRlbmRzIHtcbiAgICAgIFtpc0dlbmVyaWNDb25maWddOiB0cnVlO1xuICAgIH1cbiAgICA/IHRydWVcbiAgICA6IGZhbHNlXG4gIDogZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBHZW5lcmljQ29uZmlnPFQgZXh0ZW5kcyBHZW5lcmljQ29uZmlnPihcbiAgZ2VuZXJpY0NvbmZpZzogVFxuKTogUmV0dXJuVHlwZTxUPiB7XG4gIHJldHVybiB0b3VjaE1hcChnZW5lcmljQ29uZmlnQ2FjaGUsIGdlbmVyaWNDb25maWcsICgpID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpY0NvbmZpZyh4ID0+IHgpO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IElmIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzMi9ib29sZWFuXCI7XG5pbXBvcnQgeyBJcyB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nczIvYm9vbGVhbi9Jc1wiO1xuaW1wb3J0IHtcbiAgQWJzdHJhY3RScGNIYW5kbGVyLFxuICBBbnlScGMsXG4gIElScGNIYW5kbGVyLFxuICBScGMsXG4gIFJwY0NvbW1hbmQsXG59IGZyb20gXCIuL1JwY1wiO1xuXG5leHBvcnQgdHlwZSBOb1JwYyA9IFJwYzx7XG4gIEhhbmRsZXI6IHt9O1xuICBDb25uZWN0aW9uOiB7fTtcbiAgQ29uZmlnOiB1bmRlZmluZWQ7XG4gIFByb3BzOiB7fTtcbn0+O1xuXG5leHBvcnQgY29uc3QgTm9ScGM6IE5vUnBjID0gUnBjPE5vUnBjPih7XG4gIGNvbm5lY3Q6ICgpID0+ICh7fSksXG4gIGhhbmRsZXI6IGNsYXNzXG4gICAgZXh0ZW5kcyBBYnN0cmFjdFJwY0hhbmRsZXI8Tm9ScGM+XG4gICAgaW1wbGVtZW50cyBJUnBjSGFuZGxlcjxOb1JwYz4ge1xuICAgIGFzeW5jIGhhbmRsZSgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSxcbn0pO1xuIiwiaW1wb3J0IHsgdG91Y2hNYXAgfSBmcm9tIFwiLi4vY29tbW9uL21hcC90b3VjaE1hcFwiO1xuaW1wb3J0IHsgTWV0YVR5cGUsIFdpdGhNZXRhVHlwZSB9IGZyb20gXCIuLi9jb21tb24vTWV0YVR5cGVcIjtcbmltcG9ydCB7IG1lcmdlRGVzY3JpcHRvcnMgfSBmcm9tIFwiLi4vY29tbW9uL29iamVjdC9tZXJnZURlc2NyaXB0b3JzXCI7XG5pbXBvcnQgeyBBd2FpdGFibGUsIEF3YWl0ZWQgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3MyL0FzeW5jXCI7XG5pbXBvcnQgeyBJZiwgSXNVbmRlZmluZWQsIE5vdCB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nczIvYm9vbGVhblwiO1xuaW1wb3J0IHsgSXMgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW4vSXNcIjtcbmltcG9ydCB7IElzRW1wdHlPYmplY3QgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW4vSXNFbXB0eU9iamVjdFwiO1xuaW1wb3J0IHsgRm4gfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3MyL0ZuXCI7XG5pbXBvcnQgeyBPdmVycmlkZSB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nczIvT3ZlcnJpZGVcIjtcbmltcG9ydCB7IFBhcnRpYWxVbmRlZmluZWRLZXlzIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzMi9QYXJ0aWFsVW5kZWZpbmVkS2V5c1wiO1xuaW1wb3J0IHsgaW5zcGVjdCB9IGZyb20gXCIuLi9sb2dnaW5nL2luc3BlY3RcIjtcbmltcG9ydCB7IENvbmZpZ0ZhY3RvcnkgfSBmcm9tIFwiLi9Db25maWdGYWN0b3J5XCI7XG5pbXBvcnQgeyBHZW5lcmljQ29uZmlnLCBJc0dlbmVyaWNDb25maWcgfSBmcm9tIFwiLi9HZW5lcmljQ29uZmlnXCI7XG5cbmV4cG9ydCB0eXBlIFJwY0NvbW1hbmQgPSAocGF5bG9hZDogYW55KSA9PiBQcm9taXNlPGFueT47XG5cbmV4cG9ydCB0eXBlIFRScGMgPSB7XG4gIEhhbmRsZXI6IG9iamVjdDtcbiAgQ29ubmVjdGlvbjogYW55O1xuICBDb25maWc6IG9iamVjdCB8IHVuZGVmaW5lZDtcbiAgUHJvcHM6IG9iamVjdDtcbn07XG5cbmV4cG9ydCB0eXBlIEFueVJwYyA9IFJwYzxUUnBjPjtcblxuZXhwb3J0IHR5cGUgUnBjPFQgZXh0ZW5kcyBUUnBjPiA9IFdpdGhNZXRhVHlwZTx7XG4gIFRScGM6IFQ7XG59PiAmXG4gIFRbXCJQcm9wc1wiXSAmIHtcbiAgICByZWFkb25seSBvcHRpb25zOiBScGNPcHRpb25zPFRScGM+O1xuXG4gICAgcmVhZG9ubHkgc2VydmljZTogX1JwY0Nvbm5lY3Rpb248VD47XG5cbiAgICBjcmVhdGVScGNDb25uZWN0aW9uKGNvbW1hbmQ6IFJwY0NvbW1hbmQpOiBUW1wiQ29ubmVjdGlvblwiXTtcblxuICAgIC8vIFRPRE86IHJlbmFtZTpcbiAgICAvLyAgLSAqUnBjKiB0byAqKlxuICAgIGNyZWF0ZVJwY0NvbW1hbmQodW5yZXNvbHZlZENvbmZpZzogX1JwY1VucmVzb2x2ZWRDb25maWc8VD4pOiBScGNDb21tYW5kO1xuXG4gICAgcmVzb2x2ZVJwY0NvbmZpZyhcbiAgICAgIHVucmVzb2x2ZWRDb25maWc6IF9ScGNVbnJlc29sdmVkQ29uZmlnPFQ+XG4gICAgKTogUHJvbWlzZTxfUnBjUmVzb2x2ZWRDb25maWc8VD4+O1xuXG4gICAgcmVzb2x2ZVJwY0hhbmRsZXIoXG4gICAgICBjb25maWc6IF9ScGNVbnJlc29sdmVkQ29uZmlnPFQ+XG4gICAgKTogUHJvbWlzZTxfUnBjUmVzb2x2ZWRIYW5kbGVyPFQ+PjtcblxuICAgIGNyZWF0ZVJwY0hhbmRsZXIoXG4gICAgICBjb25maWc6IF9ScGNSZXNvbHZlZENvbmZpZzxUPlxuICAgICk6IFByb21pc2U8X1JwY1Jlc29sdmVkSGFuZGxlcjxUPj47XG4gIH07XG5cbmNvbnN0IHJwY1RvU2VydmljZUNvbW1hbmQgPSBuZXcgV2Vha01hcDxhbnksIEZuPigpO1xuXG5leHBvcnQgZnVuY3Rpb24gUnBjPFIgZXh0ZW5kcyBCYXNlZFJwYywgVCBleHRlbmRzIFRScGMgPSBScGNUeXBlPFI+PihcbiAgb3B0aW9uczogUnBjT3B0aW9uczxUPlxuKTogUnBjPFQ+IHtcbiAgbGV0IHNlcnZpY2U7XG4gIGNvbnN0IHJwYzogUnBjPFQ+ID0gT2JqZWN0LnNldFByb3RvdHlwZU9mKFxuICAgIG1lcmdlRGVzY3JpcHRvcnMob3B0aW9uc1tcInByb3BzXCJdIHx8IHt9LCB7XG4gICAgICBvcHRpb25zLFxuICAgICAgZ2V0IHNlcnZpY2UoKSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgICAgfSxcbiAgICB9KSxcbiAgICBBbnlScGNcbiAgKTtcbiAgc2VydmljZSA9IHJwYy5jcmVhdGVScGNDb25uZWN0aW9uKHBheWxvYWQgPT4ge1xuICAgIGNvbnN0IGNvbW1hbmQgPSBycGNUb1NlcnZpY2VDb21tYW5kLmdldChzZXJ2aWNlKTtcbiAgICBpZiAoIWNvbW1hbmQpIHtcbiAgICAgIHRocm93IG5ldyBScGNFcnJvcihgTm8gaGFuZGxlIGZvciBzZXJ2aWNlLmApO1xuICAgIH1cbiAgICByZXR1cm4gY29tbWFuZChwYXlsb2FkKTtcbiAgfSk7XG4gIHJldHVybiBycGM7XG59XG5cbmV4cG9ydCB0eXBlIFJwY1Jlc29sdmVkQ29uZmlnPFQgZXh0ZW5kcyBCYXNlZFJwYz4gPSBfUnBjUmVzb2x2ZWRDb25maWc8XG4gIFJwY1R5cGU8VD5cbj47XG5cbmV4cG9ydCB0eXBlIF9ScGNSZXNvbHZlZENvbmZpZzxcbiAgVCBleHRlbmRzIFRScGMsXG4gIENvbmZpZyA9IE5vbk51bGxhYmxlPFRbXCJDb25maWdcIl0+XG4+ID0gQ29uZmlnIGV4dGVuZHMgRm5cbiAgPyBJc0dlbmVyaWNDb25maWc8Q29uZmlnPiBleHRlbmRzIHRydWVcbiAgICA/IEF3YWl0ZWQ8UmV0dXJuVHlwZTxDb25maWc+PlxuICAgIDogQ29uZmlnXG4gIDogQ29uZmlnO1xuXG5leHBvcnQgdHlwZSBScGNSZXNvbHZlZEhhbmRsZXI8VCBleHRlbmRzIEJhc2VkUnBjPiA9IF9ScGNSZXNvbHZlZEhhbmRsZXI8XG4gIFJwY1R5cGU8VD5cbj47XG5cbnR5cGUgX1JwY1Jlc29sdmVkSGFuZGxlcjxUIGV4dGVuZHMgVFJwYz4gPSBUW1wiSGFuZGxlclwiXSAmIHtcbiAgY29uZmlnOiBfUnBjUmVzb2x2ZWRDb25maWc8VD47XG4gIHJwYzogUnBjPFQ+O1xuICBoYW5kbGUocGF5bG9hZDogYW55KTogQXdhaXRhYmxlPGFueT47XG59O1xuXG5leHBvcnQgdHlwZSBJUnBjSGFuZGxlcjxUIGV4dGVuZHMgQmFzZWRScGM+ID0gX1JwY1Jlc29sdmVkSGFuZGxlcjxScGNUeXBlPFQ+PjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0UnBjSGFuZGxlcjxcbiAgUiBleHRlbmRzIEFueVJwYyxcbiAgVCBleHRlbmRzIFRScGMgPSBScGNUeXBlPFI+XG4+IHtcbiAgY29uc3RydWN0b3IocHVibGljIHJwYzogUiwgcHVibGljIGNvbmZpZzogX1JwY1Jlc29sdmVkQ29uZmlnPFQ+KSB7fVxuXG4gIGFic3RyYWN0IGhhbmRsZShwYXlsb2FkOiBhbnkpOiBQcm9taXNlPGFueT47XG59XG5cbmV4cG9ydCB0eXBlIFJwY0hhbmRsZXJDbGFzczxUIGV4dGVuZHMgQW55UnBjLCBQID0ge30+ID0gbmV3IChcbiAgcnBjOiBULFxuICBjb25maWc6IF9ScGNSZXNvbHZlZENvbmZpZzxScGNUeXBlPFQ+PlxuKSA9PiBfUnBjUmVzb2x2ZWRIYW5kbGVyPFJwY1R5cGU8VD4+ICYgUDtcblxuZXhwb3J0IHR5cGUgUnBjSXNHZW5lcmljQ29uZmlnT3B0aW9uPFQgZXh0ZW5kcyBQaWNrPFRScGMsIFwiQ29uZmlnXCI+PiA9XG4gIHwgSXNHZW5lcmljQ29uZmlnPFRbXCJDb25maWdcIl0+XG4gIHwgSWY8Tm90PElzPFRbXCJDb25maWdcIl0sIEZuPj4sIHVuZGVmaW5lZD47XG5cbmV4cG9ydCB0eXBlIFJwY1Byb3BzT3B0aW9uPFQgZXh0ZW5kcyBQaWNrPFRScGMsIFwiUHJvcHNcIj4+ID1cbiAgfCBUW1wiUHJvcHNcIl1cbiAgfCBJZjxJc0VtcHR5T2JqZWN0PFRbXCJQcm9wc1wiXT4sIHVuZGVmaW5lZD47XG5cbmV4cG9ydCB0eXBlIFJwY09wdGlvbnM8XG4gIFQgZXh0ZW5kcyBUUnBjLFxuICBDb25maWdJc0ZuIGV4dGVuZHMgYm9vbGVhbiA9IElzPFRbXCJDb25maWdcIl0sIEZuPixcbiAgQ29uZmlnSXNHZW5lcmljQ29uZmlnIGV4dGVuZHMgYm9vbGVhbiA9IElzR2VuZXJpY0NvbmZpZzxUW1wiQ29uZmlnXCJdPlxuPiA9IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICB7XG4gICAgLy8gVE9ETzogY29uZmlnVHlwZTogJ2Z1bmN0aW9uJyB8ICdnZW5lcmljJyB8ICdvYmplY3QnXG4gICAgaXNHZW5lcmljQ29uZmlnOiBScGNJc0dlbmVyaWNDb25maWdPcHRpb248VD47XG5cbiAgICBpc0NvbmZpZ0ZuOiBib29sZWFuIHwgSWY8Tm90PElzPFRbXCJDb25maWdcIl0sIEZuPj4sIHVuZGVmaW5lZD47XG5cbiAgICBwcm9wczogUnBjUHJvcHNPcHRpb248VD47XG4gIH0sXG4gIHtcbiAgICBjb25uZWN0KHRoaXM6IFJwYzxUPiwgY29tbWFuZDogUnBjQ29tbWFuZCk6IFRbXCJDb25uZWN0aW9uXCJdO1xuXG4gICAgaGFuZGxlcjogUnBjSGFuZGxlckNsYXNzPFJwYzxUPj47XG4gIH1cbj47XG5cbmNvbnN0IHJwY1RvVW5kZWZpbmVkQ29uZmlnID0gbmV3IFdlYWtNYXA8QW55UnBjLCBhbnk+KCk7XG5jb25zdCBycGNUb0NvbmZpZ1RvQ29udGV4dCA9IG5ldyBXZWFrTWFwPFxuICBBbnlScGMsXG4gIFdlYWtNYXA8YW55LCBQcm9taXNlPF9ScGNSZXNvbHZlZEhhbmRsZXI8VFJwYz4+PlxuPigpO1xuXG5sZXQgaXNTZXJ2aWNlSGFuZGxlciA9IGZhbHNlO1xuXG5leHBvcnQgY29uc3QgQW55UnBjOiBBbnlScGMgPSB7XG4gIGdldCBvcHRpb25zKCk6IGFueSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH0sXG4gIGdldCBzZXJ2aWNlKCk6IGFueSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH0sXG4gIGNyZWF0ZVJwY0Nvbm5lY3Rpb24oaGFuZGxlcikge1xuICAgIGlmIChpc1NlcnZpY2VIYW5kbGVyKSB7XG4gICAgICBycGNUb1NlcnZpY2VDb21tYW5kLnNldCh0aGlzLnNlcnZpY2UsIGhhbmRsZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNvbm5lY3QuY2FsbCh0aGlzLCBoYW5kbGVyKTtcbiAgfSxcbiAgYXN5bmMgY3JlYXRlUnBjSGFuZGxlcihjb25maWcpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMub3B0aW9ucy5oYW5kbGVyKHRoaXMsIGNvbmZpZyk7XG4gIH0sXG5cbiAgYXN5bmMgcmVzb2x2ZVJwY0hhbmRsZXIodW5yZXNvbHZlZENvbmZpZykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJwY0hhbmRsZXIoYXdhaXQgdGhpcy5yZXNvbHZlUnBjQ29uZmlnKHVucmVzb2x2ZWRDb25maWcpKTtcbiAgfSxcblxuICBhc3luYyByZXNvbHZlUnBjQ29uZmlnKGNvbmZpZyk6IFByb21pc2U8b2JqZWN0PiB7XG4gICAgaWYgKGNvbmZpZyAmJiB0eXBlb2YgY29uZmlnID09PSBcIm9iamVjdFwiICYmIFwiJGNvbnRleHRcIiBpbiBjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9IGF3YWl0IENvbmZpZ0ZhY3RvcnkoY29uZmlnLiRjb250ZXh0LCB0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBjb25maWcgJiZcbiAgICAgIEFycmF5LmlzQXJyYXkoY29uZmlnKSAmJlxuICAgICAgY29uZmlnLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgdHlwZW9mIGNvbmZpZ1swXSA9PT0gXCJmdW5jdGlvblwiXG4gICAgKSB7XG4gICAgICBjb25maWcgPSBhd2FpdCBDb25maWdGYWN0b3J5KGNvbmZpZ1swXSwgdGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc0dlbmVyaWNDb25maWcpIHtcbiAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgYGV4cGVjdGVkIHRvIGdlbmVyaWMgY29uZmlnLCBnb3Q6ICR7aW5zcGVjdChjb25maWcpfWBcbiAgICAgICAgKTtcbiAgICAgIGNvbmZpZyA9IGF3YWl0IEdlbmVyaWNDb25maWcoY29uZmlnIGFzIEdlbmVyaWNDb25maWcpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZyA9PT0gXCJmdW5jdGlvblwiICYmICF0aGlzLm9wdGlvbnMuaXNDb25maWdGbikge1xuICAgICAgY29uZmlnID0gYXdhaXQgQ29uZmlnRmFjdG9yeShjb25maWcgYXMgQ29uZmlnRmFjdG9yeTxhbnk+KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlnIHx8IHt9O1xuICB9LFxuICBjcmVhdGVScGNDb21tYW5kKHVucmVzb2x2ZWRDb25maWcpIHtcbiAgICBpZiAoIXVucmVzb2x2ZWRDb25maWcpIHtcbiAgICAgIHVucmVzb2x2ZWRDb25maWcgPSB0b3VjaE1hcChycGNUb1VuZGVmaW5lZENvbmZpZywgdGhpcywgT2JqZWN0KTtcbiAgICB9XG4gICAgbGV0IGNvbmZpZztcbiAgICBsZXQgaGFzQ29uZmlnID0gZmFsc2U7XG4gICAgcmV0dXJuIGFzeW5jIHBheWxvYWQgPT4ge1xuICAgICAgaWYgKCFoYXNDb25maWcpIHtcbiAgICAgICAgY29uZmlnID0gYXdhaXQgdGhpcy5yZXNvbHZlUnBjQ29uZmlnKHVucmVzb2x2ZWRDb25maWcpO1xuICAgICAgICBoYXNDb25maWcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgY29uc3QgY29udGV4dCA9IGF3YWl0IHRvdWNoTWFwKFxuICAgICAgICB0b3VjaE1hcChycGNUb0NvbmZpZ1RvQ29udGV4dCwgdGhpcywgKCkgPT4gbmV3IFdlYWtNYXAoKSksXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgKCkgPT4gdGhpcy5jcmVhdGVScGNIYW5kbGVyKGNvbmZpZylcbiAgICAgICk7XG4gICAgICByZXR1cm4gY29udGV4dC5oYW5kbGUocGF5bG9hZCk7XG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCB0eXBlIEJhc2VkUnBjPFQgZXh0ZW5kcyBUUnBjID0gVFJwYz4gPSBXaXRoTWV0YVR5cGU8eyBUUnBjOiBUIH0+O1xuXG5leHBvcnQgdHlwZSBScGNUeXBlPFQgZXh0ZW5kcyBCYXNlZFJwYz4gPSBNZXRhVHlwZTxUPltcIlRScGNcIl07XG5cbmV4cG9ydCB0eXBlIFJwY0hvb2s8UiBleHRlbmRzIEJhc2VkUnBjLCBUIGV4dGVuZHMgUGFydGlhbDxUUnBjPj4gPSBScGM8XG4gIEV4dHJhY3Q8T3ZlcnJpZGU8UnBjVHlwZTxSPiwgVD4sIFRScGM+XG4+O1xuXG50eXBlIF9ScGNVbnJlc29sdmVkQ29uZmlnPFQgZXh0ZW5kcyBUUnBjPiA9XG4gIHwgVFtcIkNvbmZpZ1wiXVxuICB8IElmPE5vdDxJczxUW1wiQ29uZmlnXCJdLCBGbj4+LCBDb25maWdGYWN0b3J5PFRbXCJDb25maWdcIl0+PlxuICAvLyBUT0RPOiAkY29uZmlnQ29udGV4dCwgJGdlbmVyaWNDb25maWdDb250ZXh0XG4gIHwge1xuICAgICAgJGNvbnRleHQ6IENvbmZpZ0ZhY3Rvcnk8VFtcIkNvbmZpZ1wiXSwgW1JwYzxUPl0+O1xuICAgIH07XG5cbmV4cG9ydCB0eXBlIFJwY1VucmVzb2x2ZWRDb25maWc8VCBleHRlbmRzIEJhc2VkUnBjPiA9IF9ScGNVbnJlc29sdmVkQ29uZmlnPFxuICBScGNUeXBlPFQ+XG4+O1xuXG5leHBvcnQgdHlwZSBScGNDb25maWc8VCBleHRlbmRzIEJhc2VkUnBjPiA9IFJwY1R5cGU8VD5bXCJDb25maWdcIl07XG5cbmV4cG9ydCB0eXBlIFJwY1VuZGVmaW5lZENvbmZpZzxUIGV4dGVuZHMgQmFzZWRScGM+ID0gSWY8XG4gIElzVW5kZWZpbmVkPFJwY1VucmVzb2x2ZWRDb25maWc8VD4+LFxuICB1bmRlZmluZWRcbj47XG5cbmV4cG9ydCBjbGFzcyBScGNFcnJvciBleHRlbmRzIEVycm9yIHt9XG5cbmV4cG9ydCB0eXBlIFJwY0hhbmRsZXI8VCBleHRlbmRzIEFueVJwYz4gPSBScGNUeXBlPFQ+W1wiSGFuZGxlclwiXTtcbmV4cG9ydCB0eXBlIFJwY0Nvbm5lY3Rpb248VCBleHRlbmRzIEJhc2VkUnBjPiA9IF9ScGNDb25uZWN0aW9uPFJwY1R5cGU8VD4+O1xuXG50eXBlIF9ScGNDb25uZWN0aW9uPFQgZXh0ZW5kcyBUUnBjPiA9IFRbXCJDb25uZWN0aW9uXCJdICYgQmFzZWRScGM8VD47XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVScGNTZXJ2aWNlPFQgZXh0ZW5kcyBBbnlScGM+KFxuICBycGM6IFQsXG4gIGNvbW1hbmQ6IFJwY0NvbW1hbmRcbik6IFJwY0Nvbm5lY3Rpb248VD4ge1xuICBpc1NlcnZpY2VIYW5kbGVyID0gdHJ1ZTtcbiAgY29uc3QgY29ubmVjdGlvbiA9IHJwYy5jcmVhdGVScGNDb25uZWN0aW9uKGNvbW1hbmQpO1xuICBpc1NlcnZpY2VIYW5kbGVyID0gZmFsc2U7XG4gIHJldHVybiBjb25uZWN0aW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlUnBjU2VydmljZTxUIGV4dGVuZHMgQW55UnBjPihcbiAgcnBjOiBULFxuICBjb25maWc6IFJwY1VucmVzb2x2ZWRDb25maWc8VD5cbik6IFJwY0Nvbm5lY3Rpb248VD4ge1xuICByZXR1cm4gaGFuZGxlUnBjU2VydmljZShycGMsIHJwYy5jcmVhdGVScGNDb21tYW5kKGNvbmZpZykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUnBjQ29uZmlnPFQgZXh0ZW5kcyBBbnlScGM+KFxuICBycGM6IFQsXG4gIGNvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxUPlxuKTogUnBjVW5yZXNvbHZlZENvbmZpZzxUPiB7XG4gIHJldHVybiBjb25maWc7XG59XG4iLCJpbXBvcnQgeyBBd2FpdGVkIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzMi9Bc3luY1wiO1xuaW1wb3J0IHsgSWYsIE5vdCB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nczIvYm9vbGVhblwiO1xuaW1wb3J0IHsgRm4gfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3MyL0ZuXCI7XG5pbXBvcnQgeyBQYXJ0aWFsVW5kZWZpbmVkS2V5cyB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nczIvUGFydGlhbFVuZGVmaW5lZEtleXNcIjtcbmltcG9ydCB7IENvbmZpZ0ZhY3RvcnkgfSBmcm9tIFwiLi9Db25maWdGYWN0b3J5XCI7XG5pbXBvcnQgeyBHZW5lcmljQ29uZmlnLCBJc0dlbmVyaWNDb25maWcgfSBmcm9tIFwiLi9HZW5lcmljQ29uZmlnXCI7XG5pbXBvcnQgeyBBbnlScGMsIFJwY0hvb2ssIFJwY1R5cGUsIFJwY1VucmVzb2x2ZWRDb25maWcsIFRScGMgfSBmcm9tIFwiLi9ScGNcIjtcblxuZXhwb3J0IHR5cGUgUnBjQ29uZmlnSG9vazxcbiAgVCBleHRlbmRzIFRDb25maWdIb29rICYge1xuICAgIFByb3BzPzogb2JqZWN0O1xuICB9XG4+ID0gUnBjSG9vazxcbiAgVFtcIlRhcmdldFwiXSxcbiAge1xuICAgIFRDb25maWdIb29rOiBUO1xuICAgIENvbmZpZzogVFtcIkNvbmZpZ1wiXTtcbiAgfVxuPiAmXG4gIE5vbk51bGxhYmxlPFRbXCJQcm9wc1wiXT47XG5cbmV4cG9ydCB0eXBlIFRDb25maWdIb29rID0ge1xuICBUYXJnZXQ6IEFueVJwYztcbiAgQ29uZmlnOiBUUnBjW1wiQ29uZmlnXCJdO1xuICBQcm9wcz86IG9iamVjdDtcbn07XG5leHBvcnQgdHlwZSBBbnlScGNDb25maWdIb29rID0gUnBjQ29uZmlnSG9vazx7XG4gIFRhcmdldDogQW55UnBjO1xuICBDb25maWc6IFRScGNbXCJDb25maWdcIl07XG59PjtcblxuLy8gVE9ETzogX0dlbmVyaWNUb0dlbmVyaWNDb25maWdcbi8vIFRPRE86IF9Db25maWdUb0dlbmVyaWNDb25maWdcbi8vIFRPRE86IF9Db25maWdUb0NvbmZpZ1xuLy8gVE9ETzogX0dlbmVyaWNDb25maWdUb0NvbmZpZ1xudHlwZSBfR2VuZXJpY0NvbmZpZ0hhbmRsZXI8VCBleHRlbmRzIFRDb25maWdIb29rPiA9IChfOiB7XG4gIGNvbmZpZzogQXdhaXRlZDxSZXR1cm5UeXBlPEV4dHJhY3Q8VFtcIkNvbmZpZ1wiXSwgRm4+Pj47XG4gIHRhcmdldDogVFtcIlRhcmdldFwiXTtcbiAgcHJvcHM6IFRbXCJQcm9wc1wiXTtcbn0pID0+IENvbmZpZ0ZhY3Rvcnk8UnBjVW5yZXNvbHZlZENvbmZpZzxUW1wiVGFyZ2V0XCJdPj47XG5cbnR5cGUgX0NvbmZpZ0hhbmRsZXI8VCBleHRlbmRzIFRDb25maWdIb29rPiA9IChfOiB7XG4gIGNvbmZpZzogVFtcIkNvbmZpZ1wiXTtcbiAgdGFyZ2V0OiBUW1wiVGFyZ2V0XCJdO1xuICBwcm9wczogVFtcIlByb3BzXCJdO1xufSkgPT4gQ29uZmlnRmFjdG9yeTxScGNVbnJlc29sdmVkQ29uZmlnPFRbXCJUYXJnZXRcIl0+PjtcblxuZXhwb3J0IHR5cGUgUnBjQ29uZmlnSG9va0hhbmRsZXI8XG4gIFIgZXh0ZW5kcyBBbnlScGNDb25maWdIb29rLFxuICBUIGV4dGVuZHMgVENvbmZpZ0hvb2sgPSBScGNUeXBlPFI+W1wiVENvbmZpZ0hvb2tcIl1cbj4gPSBJc0dlbmVyaWNDb25maWc8VFtcIkNvbmZpZ1wiXT4gZXh0ZW5kcyB0cnVlXG4gID8gX0dlbmVyaWNDb25maWdIYW5kbGVyPFQ+XG4gIDogX0NvbmZpZ0hhbmRsZXI8VD47XG5cbmV4cG9ydCBmdW5jdGlvbiBScGNDb25maWdIb29rPFxuICBSIGV4dGVuZHMgQW55UnBjQ29uZmlnSG9vayxcbiAgVCBleHRlbmRzIFRDb25maWdIb29rID0gUnBjVHlwZTxSPltcIlRDb25maWdIb29rXCJdXG4+KFxuICBvcHRpb25zOiBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAgICB7XG4gICAgICBpc0dlbmVyaWNDb25maWc6XG4gICAgICAgIHwgSXNHZW5lcmljQ29uZmlnPFRbXCJDb25maWdcIl0+XG4gICAgICAgIHwgSWY8Tm90PElzR2VuZXJpY0NvbmZpZzxUW1wiQ29uZmlnXCJdPj4sIHVuZGVmaW5lZD47XG5cbiAgICAgIHByb3BzOiBUW1wiUHJvcHNcIl07XG4gICAgfSxcbiAgICB7XG4gICAgICB0YXJnZXQ6IFRbXCJUYXJnZXRcIl07XG4gICAgICBoYW5kbGVyOiBScGNDb25maWdIb29rSGFuZGxlcjxSPjtcbiAgICB9XG4gID5cbik6IFIge1xuICBjb25zdCB7IHRhcmdldCwgaGFuZGxlciB9ID0gb3B0aW9ucztcbiAgY29uc3QgaXNHZW5lcmljQ29uZmlnID1cbiAgICBcImlzR2VuZXJpY0NvbmZpZ1wiIGluIG9wdGlvbnMgPyBvcHRpb25zLmlzR2VuZXJpY0NvbmZpZyA/PyBmYWxzZSA6IGZhbHNlO1xuXG4gIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YoXG4gICAge1xuICAgICAgLi4ub3B0aW9uc1tcInByb3BzXCJdLFxuICAgICAgYXN5bmMgcmVzb2x2ZVJwY0NvbmZpZyh0aGlzOiBUW1wiVGFyZ2V0XCJdLCBjb25maWcpIHtcbiAgICAgICAgaWYgKGlzR2VuZXJpY0NvbmZpZykge1xuICAgICAgICAgIGNvbmZpZyA9IGF3YWl0IEdlbmVyaWNDb25maWcoXG4gICAgICAgICAgICAoaGFuZGxlciBhcyBfR2VuZXJpY0NvbmZpZ0hhbmRsZXI8VD4pKHtcbiAgICAgICAgICAgICAgY29uZmlnOiBhd2FpdCBHZW5lcmljQ29uZmlnKGNvbmZpZyksXG4gICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgcHJvcHM6IG9wdGlvbnNbXCJwcm9wc1wiXSxcbiAgICAgICAgICAgIH0pIGFzIEdlbmVyaWNDb25maWdcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbmZpZyA9IGF3YWl0IENvbmZpZ0ZhY3RvcnkoXG4gICAgICAgICAgICAoaGFuZGxlciBhcyBfQ29uZmlnSGFuZGxlcjxUPikoe1xuICAgICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgcHJvcHM6IG9wdGlvbnNbXCJwcm9wc1wiXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnJlc29sdmVScGNDb25maWcuY2FsbCh0aGlzLCBjb25maWcpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHRhcmdldFxuICApO1xufVxuIiwiaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9Bc3luY1wiO1xuaW1wb3J0IHsgSWYgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW5cIjtcbmltcG9ydCB7IElzRW1wdHlPYmplY3QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW4vSXNFbXB0eU9iamVjdFwiO1xuaW1wb3J0IHsgT21pdEtleXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL09taXRLZXlzXCI7XG5pbXBvcnQgeyBPdmVycmlkZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nczIvT3ZlcnJpZGVcIjtcbmltcG9ydCB7IFBhcnRpYWxVbmRlZmluZWRLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9QYXJ0aWFsVW5kZWZpbmVkS2V5c1wiO1xuaW1wb3J0IHsgVW5kZWZpbmVkSWZJc1VuZGVmaW5lZCB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nczIvVW5kZWZpbmVkSWZJc1VuZGVmaW5lZFwiO1xuaW1wb3J0IHsgRGF0YVJvdyB9IGZyb20gXCIuLi8uLi90eXBlZGF0YS9EYXRhUm93XCI7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSBcIi4uLy4uL3R5cGVkYXRhL0RhdGFTb3VyY2VcIjtcbmltcG9ydCB7IENvbmZpZ0ZhY3RvcnkgfSBmcm9tIFwiLi4vQ29uZmlnRmFjdG9yeVwiO1xuaW1wb3J0IHsgR2VuZXJpY0NvbmZpZyB9IGZyb20gXCIuLi9HZW5lcmljQ29uZmlnXCI7XG5cbmltcG9ydCB7IEFueUlucHV0LCBJbnB1dFZhbHVlLCBJbnB1dFZhbHVlQ29uZmlnIH0gZnJvbSBcIi4uL2lucHV0L0lucHV0XCI7XG5pbXBvcnQgeyBOb1JwYyB9IGZyb20gXCIuLi9Ob1JwY1wiO1xuaW1wb3J0IHsgQW55UnBjLCBScGNDb25maWcsIFJwY1R5cGUsIFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQgeyBScGNGbiB9IGZyb20gXCIuLi9ycGMtZm4vUnBjRm5cIjtcbmltcG9ydCB7IFJwY01hcCB9IGZyb20gXCIuLi9ycGMtbWFwL1JwY01hcFwiO1xuaW1wb3J0IHsgUnBjUGFyYW1ldGVyIH0gZnJvbSBcIi4uL3JwYy1wYXJhbWV0ZXIvUnBjUGFyYW1ldGVyXCI7XG5pbXBvcnQgeyBScGNDb25maWdIb29rIH0gZnJvbSBcIi4uL1JwY0NvbmZpZ0hvb2tcIjtcbmltcG9ydCB7IERhdGFUYWJsZSwgRGF0YVRhYmxlT3B0aW9ucyB9IGZyb20gXCIuLi93aWRnZXQvZGF0YS10YWJsZS9EYXRhVGFibGVcIjtcbmltcG9ydCB7IEZvcm0sIEZvcm1UeXBlIH0gZnJvbSBcIi4uL3dpZGdldC9mb3JtL0Zvcm1cIjtcbmltcG9ydCB7IElubGluZVdpZGdldCB9IGZyb20gXCIuLi93aWRnZXQvaW5saW5lLXdpZGdldC9JbmxpbmVXaWRnZXRcIjtcbmltcG9ydCB7IEFueVJvd1R5cGUsIFJvdyB9IGZyb20gXCIuLi93aWRnZXQvUm93XCI7XG5pbXBvcnQgeyBUYWJzV2lkZ2V0IH0gZnJvbSBcIi4uL3dpZGdldC90YWJzLXdpZGdldC9UYWJzV2lkZ2V0XCI7XG5pbXBvcnQgeyBXaWRnZXRUeXBlIH0gZnJvbSBcIi4uL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7IEFueVdpZGdldFJlY29yZCB9IGZyb20gXCIuLi93aWRnZXQvd2lkZ2V0LW1hcC9XaWRnZXRNYXBcIjtcbmltcG9ydCB7IERhdGFNYW5hZ2VySGFuZGxlciB9IGZyb20gXCIuL0RhdGFNYW5hZ2VySGFuZGxlclwiO1xuXG4vLyBGdWxsPFR5cGU+U3RhY2tcbmV4cG9ydCB0eXBlIFREYXRhTWFuYWdlciA9IHtcbiAgRGF0YTogYW55O1xuXG4gIFRhYmxlUm93Q29udHJvbGxlcjogQW55UnBjO1xuXG4gIFRhYmxlUm93OiBhbnk7XG5cbiAgRWRpdElucHV0OiBBbnlJbnB1dDtcblxuICBFZGl0RXJyb3I6IGFueTtcblxuICBBZGRJbnB1dDogQW55SW5wdXQ7XG5cbiAgQWRkRXJyb3I6IGFueTtcblxuICBFZGl0VGFiczogQW55V2lkZ2V0UmVjb3JkO1xufTtcblxudHlwZSBfVHlwZXM8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4gPSB7XG4gIFRhYmxlOiBEYXRhVGFibGU8e1xuICAgIFJvdzogVFtcIlRhYmxlUm93XCJdO1xuICAgIFJvd0NvbnRyb2xsZXI6IFRbXCJUYWJsZVJvd0NvbnRyb2xsZXJcIl07XG4gICAgRGF0YTogVFtcIkRhdGFcIl07XG4gIH0+O1xuXG4gIFRhYmxlVHlwZXM6IFdpZGdldFR5cGU8X1R5cGVzPFQ+W1wiVGFibGVcIl0+W1wiVHlwZXNcIl07XG5cbiAgVGFibGVDb25maWc6XG4gICAgfCBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAgICAgICAgT21pdEtleXM8X1R5cGVzPFQ+W1wiVGFibGVUeXBlc1wiXVtcIk9wdGlvbmFsQ29uZmlnXCJdLCBcImNvbHVtbnNcIj4gJlxuICAgICAgICAgIE9taXRLZXlzPF9UeXBlczxUPltcIlRhYmxlVHlwZXNcIl1bXCJSZXF1aXJlZENvbmZpZ1wiXSwgXCJzb3VyY2VcIj5cbiAgICAgID5cbiAgICB8IHVuZGVmaW5lZDtcblxuICBFZGl0Rm9ybTogRm9ybTx7XG4gICAgVmFsdWU6IG51bGw7XG4gICAgRXJyb3I6IFRbXCJFZGl0RXJyb3JcIl07XG4gICAgSW5wdXQ6IFRbXCJFZGl0SW5wdXRcIl07XG4gIH0+O1xuXG4gIEFkZEZvcm06IEZvcm08e1xuICAgIFZhbHVlOiBzdHJpbmc7XG4gICAgRXJyb3I6IFRbXCJBZGRFcnJvclwiXTtcbiAgICBJbnB1dDogVFtcIkFkZElucHV0XCJdO1xuICB9PjtcblxuICBFZGl0VGFic1dpdGhGb3JtOiBPdmVycmlkZTxcbiAgICBUW1wiRWRpdFRhYnNcIl0sXG4gICAge1xuICAgICAgZm9ybTogX1R5cGVzPFQ+W1wiRWRpdEZvcm1cIl07XG4gICAgfVxuICA+O1xuXG4gIEVkaXRUYWJzV2lkZ2V0OiBUYWJzV2lkZ2V0PF9UeXBlczxUPltcIkVkaXRUYWJzV2l0aEZvcm1cIl0+O1xuXG4gIEVkaXRUYWJzQ29uZmlnOiB7XG4gICAgW0sgaW4ga2V5b2YgVFtcIkVkaXRUYWJzXCJdXTogUnBjVW5yZXNvbHZlZENvbmZpZzxUW1wiRWRpdFRhYnNcIl1bS10+O1xuICB9O1xufTtcbmV4cG9ydCB0eXBlIERhdGFNYW5hZ2VyQ29uZmlnPFQgZXh0ZW5kcyBURGF0YU1hbmFnZXI+ID0gUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gIHtcbiAgICBnZXRUYWJzQ29uZmlnRm9yUm93OlxuICAgICAgfCBDb25maWdGYWN0b3J5PF9UeXBlczxUPltcIkVkaXRUYWJzQ29uZmlnXCJdLCBbRGF0YVJvdzxUW1wiRGF0YVwiXT5dPlxuICAgICAgfCBJZjxJc0VtcHR5T2JqZWN0PFRbXCJFZGl0VGFic1wiXT4sIHVuZGVmaW5lZD47XG5cbiAgICBhZGRJbnB1dENvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxUW1wiQWRkSW5wdXRcIl0+O1xuXG4gICAgZWRpdElucHV0Q29uZmlnRm9yUm93OlxuICAgICAgfCBDb25maWdGYWN0b3J5PFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIkVkaXRJbnB1dFwiXT4sIFtEYXRhUm93PFRbXCJEYXRhXCJdPl0+XG4gICAgICB8IFVuZGVmaW5lZElmSXNVbmRlZmluZWQ8UnBjVW5yZXNvbHZlZENvbmZpZzxUW1wiRWRpdElucHV0XCJdPj47XG5cbiAgICB0YWJsZUNvbHVtbnNDb25maWc6IF9UeXBlczxUPltcIlRhYmxlVHlwZXNcIl1bXCJDb2x1bW5Db25maWdNYXBcIl07XG4gIH0sXG4gIHtcbiAgICBzb3VyY2U6IERhdGFTb3VyY2U8VFtcIkRhdGFcIl0+O1xuXG4gICAgZ2V0VGl0bGVGb3JSb3c6IChyb3c6IERhdGFSb3c8VFtcIkRhdGFcIl0+KSA9PiBzdHJpbmc7XG5cbiAgICBlZGl0VmFsdWVDb25maWdGb3JSb3c/OiBDb25maWdGYWN0b3J5PFxuICAgICAgSW5wdXRWYWx1ZUNvbmZpZzxUW1wiRWRpdElucHV0XCJdPixcbiAgICAgIFtyb3c6IERhdGFSb3c8VFtcIkRhdGFcIl0+XVxuICAgID47XG5cbiAgICB0YWJsZUNvbmZpZz86IF9UeXBlczxUPltcIlRhYmxlQ29uZmlnXCJdO1xuXG4gICAgYWRkU3VibWl0OiBScGNDb25maWc8X1R5cGVzPFQ+W1wiQWRkRm9ybVwiXT5bXCJzdWJtaXRcIl07XG5cbiAgICBlZGl0U3VibWl0OiAoXG4gICAgICByb3c6IERhdGFSb3c8VFtcIkRhdGFcIl0+LFxuICAgICAgdmFsdWU6IElucHV0VmFsdWU8VFtcIkVkaXRJbnB1dFwiXT5cbiAgICApID0+IEF3YWl0YWJsZTtcbiAgfVxuPjtcblxuZXhwb3J0IHR5cGUgQW55RGF0YU1hbmFnZXIgPSBEYXRhTWFuYWdlcjxURGF0YU1hbmFnZXI+O1xuXG5leHBvcnQgdHlwZSBEYXRhTWFuYWdlclR5cGVzPFQgZXh0ZW5kcyBURGF0YU1hbmFnZXI+ID0gX1R5cGVzPFQ+O1xuXG5leHBvcnQgdHlwZSBEYXRhTWFuYWdlclR5cGU8VCBleHRlbmRzIEFueURhdGFNYW5hZ2VyPiA9IFJwY1R5cGU8XG4gIFRcbj5bXCJUQ29uZmlnSG9va1wiXVtcIlREYXRhTWFuYWdlclwiXTtcbmV4cG9ydCB0eXBlIERhdGFNYW5hZ2VyPFQgZXh0ZW5kcyBURGF0YU1hbmFnZXI+ID0gUnBjQ29uZmlnSG9vazx7XG4gIFREYXRhTWFuYWdlcjogVDtcblxuICBQcm9wczoge1xuICAgIGVkaXRJbnB1dDogQW55SW5wdXQ7XG4gICAgZWRpdFRhYnM6IEFueVdpZGdldFJlY29yZDtcbiAgfTtcblxuICBUYXJnZXQ6IFJwY01hcDx7XG4gICAgZGVsZXRlOiBScGNGbjwoa2V5OiBzdHJpbmcpID0+IHZvaWQ+O1xuXG4gICAgdGFibGU6IF9UeXBlczxUPltcIlRhYmxlXCJdO1xuXG4gICAgYWRkOiBfVHlwZXM8VD5bXCJBZGRGb3JtXCJdO1xuXG4gICAgZWRpdDogUnBjUGFyYW1ldGVyPHtcbiAgICAgIERhdGE6IHN0cmluZztcbiAgICAgIFRhcmdldDogSW5saW5lV2lkZ2V0PHtcbiAgICAgICAgVGFyZ2V0OiBfVHlwZXM8VD5bXCJFZGl0VGFic1dpZGdldFwiXTtcbiAgICAgICAgQ29udHJvbGxlcjogTm9ScGM7XG4gICAgICAgIEVsZW1lbnQ6IHsgdGl0bGU6IHN0cmluZyB9O1xuICAgICAgfT47XG4gICAgfT47XG4gIH0+O1xuICBDb25maWc6IEdlbmVyaWNDb25maWc8XG4gICAgPERhdGE+KFxuICAgICAgY29uZmlnOiBEYXRhTWFuYWdlckNvbmZpZzxPdmVycmlkZTxULCB7IERhdGE6IERhdGEgfT4+XG4gICAgKSA9PiBEYXRhTWFuYWdlckNvbmZpZzxUPlxuICA+O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXRhTWFuYWdlcjxcbiAgVGFibGVSb3dUeXBlIGV4dGVuZHMgQW55Um93VHlwZSxcbiAgQWRkRXJyb3IsXG4gIEVkaXRFcnJvcixcbiAgQWRkSW5wdXQgZXh0ZW5kcyBBbnlJbnB1dCxcbiAgRWRpdElucHV0IGV4dGVuZHMgQW55SW5wdXQgPSBBZGRJbnB1dCxcbiAgVGFibGVSb3dDb250cm9sbGVyIGV4dGVuZHMgQW55UnBjID0gTm9ScGMsXG4gIEVkaXRUYWJzIGV4dGVuZHMgQW55V2lkZ2V0UmVjb3JkID0ge31cbj4ob3B0aW9uczoge1xuICB0YWJsZVJvd1R5cGU6IFRhYmxlUm93VHlwZTtcbiAgdGFibGVPcHRpb25zPzogRGF0YVRhYmxlT3B0aW9uczxUYWJsZVJvd0NvbnRyb2xsZXI+O1xuICBhZGRFcnJvcj86IEFkZEVycm9yO1xuICBlZGl0RXJyb3I/OiBFZGl0RXJyb3I7XG4gIGFkZElucHV0OiBBZGRJbnB1dDtcbiAgZWRpdElucHV0PzogRWRpdElucHV0O1xuICBlZGl0VGFicz86IEVkaXRUYWJzO1xufSk6IERhdGFNYW5hZ2VyPHtcbiAgRGF0YTogYW55O1xuICBUYWJsZVJvd0NvbnRyb2xsZXI6IFRhYmxlUm93Q29udHJvbGxlcjtcbiAgVGFibGVSb3c6IFJvdzxUYWJsZVJvd1R5cGU+O1xuICBBZGRFcnJvcjogQWRkRXJyb3I7XG4gIEFkZElucHV0OiBBZGRJbnB1dDtcbiAgRWRpdEVycm9yOiBFZGl0RXJyb3I7XG4gIEVkaXRJbnB1dDogRWRpdElucHV0O1xuICBFZGl0VGFiczogRWRpdFRhYnM7XG59PiB7XG4gIGNvbnN0IGVkaXRJbnB1dDogQW55SW5wdXQgPSBvcHRpb25zLmVkaXRJbnB1dCB8fCBvcHRpb25zLmFkZElucHV0O1xuICBjb25zdCBlZGl0VGFicyA9IHtcbiAgICBmb3JtOiBGb3JtKHsgaW5wdXQ6IGVkaXRJbnB1dCB9KSxcbiAgICAuLi4ob3B0aW9ucy5lZGl0VGFicyBhcyB7fSksXG4gIH0gYXMgQW55V2lkZ2V0UmVjb3JkO1xuICByZXR1cm4gPGFueT5ScGNDb25maWdIb29rPEFueURhdGFNYW5hZ2VyPih7XG4gICAgcHJvcHM6IHtcbiAgICAgIGVkaXRJbnB1dCxcbiAgICAgIGVkaXRUYWJzLFxuICAgIH0sXG4gICAgaXNHZW5lcmljQ29uZmlnOiB0cnVlLFxuICAgIGhhbmRsZXI6IERhdGFNYW5hZ2VySGFuZGxlcixcbiAgICB0YXJnZXQ6IFJwY01hcCh7XG4gICAgICBkZWxldGU6IFJwY0ZuPChrZXk6IHN0cmluZykgPT4gdm9pZD4oKSxcblxuICAgICAgdGFibGU6IERhdGFUYWJsZShvcHRpb25zLnRhYmxlUm93VHlwZSwgb3B0aW9ucy50YWJsZU9wdGlvbnMpLFxuXG4gICAgICBhZGQ6IEZvcm0oe1xuICAgICAgICBpbnB1dDogb3B0aW9ucy5hZGRJbnB1dCxcbiAgICAgIH0pLFxuXG4gICAgICBlZGl0OiBScGNQYXJhbWV0ZXIoXG4gICAgICAgIFN0cmluZyxcbiAgICAgICAgSW5saW5lV2lkZ2V0KHtcbiAgICAgICAgICB0YXJnZXQ6IFRhYnNXaWRnZXQoZWRpdFRhYnMpLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICB9KSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBDb25maWdGYWN0b3J5IH0gZnJvbSBcIi4uL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7IFZhbHVlT3JBd2FpdGFibGVGbiB9IGZyb20gXCIuLi9pbnB1dC9WYWx1ZU9yQXdhaXRhYmxlRm5cIjtcbmltcG9ydCB7IFJwY0NvbmZpZ0hvb2tIYW5kbGVyIH0gZnJvbSBcIi4uL1JwY0NvbmZpZ0hvb2tcIjtcbmltcG9ydCB7IEFueURhdGFNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YU1hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IERhdGFNYW5hZ2VySGFuZGxlcjogUnBjQ29uZmlnSG9va0hhbmRsZXI8QW55RGF0YU1hbmFnZXI+ID0gKHtcbiAgY29uZmlnLFxufSkgPT4gJCA9PiB7XG4gIHJldHVybiAkKHtcbiAgICBhc3luYyBkZWxldGUoa2V5KSB7XG4gICAgICBhd2FpdCBjb25maWcuc291cmNlLmRlbGV0ZShrZXkpO1xuICAgIH0sXG4gICAgdGFibGU6ICQgPT5cbiAgICAgICQoe1xuICAgICAgICAuLi5jb25maWcudGFibGVDb25maWcsXG4gICAgICAgIGNvbHVtbnM6IGNvbmZpZy50YWJsZUNvbHVtbnNDb25maWcsXG4gICAgICAgIHNvdXJjZTogY29uZmlnLnNvdXJjZSxcbiAgICAgIH0pLFxuICAgIGFkZDoge1xuICAgICAgaW5wdXRDb25maWc6IGNvbmZpZy5hZGRJbnB1dENvbmZpZyxcbiAgICAgIHN1Ym1pdDogY29uZmlnLmFkZFN1Ym1pdCxcbiAgICB9LFxuICAgIGVkaXQ6IGFzeW5jICgkLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IGF3YWl0IGNvbmZpZy5zb3VyY2UuZ2V0T3JGYWlsKGtleSk7XG4gICAgICByZXR1cm4gJCh7XG4gICAgICAgIGdldEVsZW1lbnQoKSB7XG4gICAgICAgICAgcmV0dXJuIHsgdGl0bGU6IGNvbmZpZy5nZXRUaXRsZUZvclJvdyhyb3cpIH07XG4gICAgICAgIH0sXG4gICAgICAgIHRhcmdldENvbmZpZzogYXN5bmMgJCA9PiB7XG4gICAgICAgICAgcmV0dXJuICQoe1xuICAgICAgICAgICAgLi4uKGF3YWl0IENvbmZpZ0ZhY3RvcnkoY29uZmlnLmdldFRhYnNDb25maWdGb3JSb3csIHJvdykpLFxuICAgICAgICAgICAgZm9ybTogYXN5bmMgJCA9PlxuICAgICAgICAgICAgICAkKHtcbiAgICAgICAgICAgICAgICBpbnB1dENvbmZpZzogYXdhaXQgQ29uZmlnRmFjdG9yeShcbiAgICAgICAgICAgICAgICAgIGNvbmZpZy5lZGl0SW5wdXRDb25maWdGb3JSb3csXG4gICAgICAgICAgICAgICAgICByb3dcbiAgICAgICAgICAgICAgICApLCAvL1xuICAgICAgICAgICAgICAgIHZhbHVlQ29uZmlnOlxuICAgICAgICAgICAgICAgICAgY29uZmlnLmVkaXRWYWx1ZUNvbmZpZ0ZvclJvdyAmJlxuICAgICAgICAgICAgICAgICAgKCgpID0+IENvbmZpZ0ZhY3RvcnkoY29uZmlnLmVkaXRWYWx1ZUNvbmZpZ0ZvclJvdywgcm93KSksXG4gICAgICAgICAgICAgICAgYXN5bmMgc3VibWl0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBjb25maWcuZWRpdFN1Ym1pdChyb3csIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgLy8vIHRhYnNDb25maWdcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7XG4gIFJvdXRlcixcbiAgUm91dGVyVHlwZSxcbiAgUm91dGVyV2l0aENoaWxkcmVuLFxuICBSb3V0ZXJXaXRoUGFyYW1zLFxufSBmcm9tIFwiLi4vLi4vdHlwZXJvdXRlci9Sb3V0ZXJcIjtcbmltcG9ydCB7XG4gIEFueURhdGFNYW5hZ2VyLFxuICBEYXRhTWFuYWdlclR5cGUsXG4gIERhdGFNYW5hZ2VyVHlwZXMsXG4gIFREYXRhTWFuYWdlcixcbn0gZnJvbSBcIi4vRGF0YU1hbmFnZXJcIjtcblxuZXhwb3J0IHR5cGUgQW55RGF0YU1hbmFnZXJSb3V0ZXIgPSBEYXRhTWFuYWdlclJvdXRlcjxURGF0YU1hbmFnZXI+O1xuXG5leHBvcnQgdHlwZSBEYXRhTWFuYWdlclJvdXRlcjxUIGV4dGVuZHMgVERhdGFNYW5hZ2VyPiA9IFJvdXRlcldpdGhDaGlsZHJlbjxcbiAge1xuICAgIGFkZDogUm91dGVyO1xuICAgIGVkaXQ6IFJvdXRlcldpdGhQYXJhbXM8XG4gICAgICBcImlkXCIsXG4gICAgICBSZWNvcmQ8a2V5b2YgRGF0YU1hbmFnZXJUeXBlczxUPltcIkVkaXRUYWJzV2l0aEZvcm1cIl0sIFJvdXRlcj5cbiAgICA+O1xuICB9LFxuICB7IFREYXRhTWFuYWdlcjogVCB9XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gRGF0YU1hbmFnZXJSb3V0ZXI8VCBleHRlbmRzIEFueURhdGFNYW5hZ2VyPihcbiAgZG06IFRcbik6IERhdGFNYW5hZ2VyUm91dGVyPERhdGFNYW5hZ2VyVHlwZTxUPj4ge1xuICBjb25zdCByID0gUm91dGVyKHtcbiAgICBhZGQ6IFJvdXRlcigpLFxuICAgIGVkaXQ6IFJvdXRlcihbXCJpZFwiXSwge1xuICAgICAgLi4uKG1hcE9iamVjdChkbS5lZGl0VGFicywgKCkgPT4gUm91dGVyKCkpIGFzIFJlY29yZDxcbiAgICAgICAga2V5b2YgRGF0YU1hbmFnZXJUeXBlPFQ+W1wiRWRpdFRhYnNcIl0sXG4gICAgICAgIFJvdXRlclxuICAgICAgPiksXG4gICAgICBmb3JtOiBSb3V0ZXIoKSxcbiAgICB9KSxcbiAgfSk7XG4gIHJldHVybiByIGFzIFJvdXRlcjxcbiAgICBSb3V0ZXJUeXBlPHR5cGVvZiByPiAmIHtcbiAgICAgIFREYXRhTWFuYWdlcjogRGF0YU1hbmFnZXJUeXBlPFQ+O1xuICAgIH1cbiAgPjtcbn1cbiIsImltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nczIvQXN5bmNcIjtcbmltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL1JlcXVpcmVPcHRpb25hbEtleXNcIjtcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0SGFuZGxlciB9IGZyb20gXCIuLi93aWRnZXQvQWJzdHJhY3RXaWRnZXRIYW5kbGVyXCI7XG5pbXBvcnQge1xuICBJV2lkZ2V0SGFuZGxlcixcbiAgV2lkZ2V0RWxlbWVudCxcbiAgV2lkZ2V0RWxlbWVudFN0YXRlLFxufSBmcm9tIFwiLi4vd2lkZ2V0L1dpZGdldFwiO1xuaW1wb3J0IHtcbiAgQW55SW5wdXQsXG4gIElJbnB1dCxcbiAgSW5wdXRFbGVtZW50LFxuICBJbnB1dEVycm9yLFxuICBJbnB1dEVycm9yT3JWYWx1ZSxcbiAgSW5wdXRWYWx1ZSxcbiAgSW5wdXRWYWx1ZUNvbmZpZyxcbiAgSW5wdXRWYWx1ZURhdGEsXG4gIElucHV0VmFsdWVFbGVtZW50LFxufSBmcm9tIFwiLi9JbnB1dFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RJbnB1dEhhbmRsZXI8VCBleHRlbmRzIEFueUlucHV0PlxuICBleHRlbmRzIEFic3RyYWN0V2lkZ2V0SGFuZGxlcjxUPlxuICBpbXBsZW1lbnRzIElXaWRnZXRIYW5kbGVyPElJbnB1dD4ge1xuICBhYnN0cmFjdCBsb2FkQW5kQ2hlY2soZGF0YTogSW5wdXRWYWx1ZURhdGE8VD4pOiBQcm9taXNlPElucHV0RXJyb3JPclZhbHVlPFQ+PjtcblxuICBhYnN0cmFjdCBnZXRWYWx1ZUZyb21Db25maWcoXG4gICAgdmFsdWVDb25maWc6IElucHV0VmFsdWVDb25maWc8VD5cbiAgKTogQXdhaXRhYmxlPElucHV0VmFsdWU8VD4+O1xuXG4gIGFic3RyYWN0IGdldFZhbHVlRWxlbWVudChcbiAgICB2YWx1ZTogSW5wdXRWYWx1ZTxUPiB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPElucHV0VmFsdWVFbGVtZW50PFQ+PjtcblxuICBhYnN0cmFjdCBnZXRJbnB1dEVsZW1lbnQoKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPElucHV0RWxlbWVudDxUPj4+O1xuXG4gIGFzeW5jIGdldEVsZW1lbnQoXG4gICAgc3RhdGU6IFdpZGdldEVsZW1lbnRTdGF0ZTxUPiB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPFJlcXVpcmVPcHRpb25hbEtleXM8V2lkZ2V0RWxlbWVudDxUPj4+IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uKGF3YWl0IHRoaXMuZ2V0SW5wdXRFbGVtZW50KCkpLFxuICAgICAgdmFsdWU6IGF3YWl0IHRoaXMuZ2V0VmFsdWVFbGVtZW50KHVuZGVmaW5lZCksXG4gICAgfSBhcyBSZXF1aXJlT3B0aW9uYWxLZXlzPFdpZGdldEVsZW1lbnQ8VD4+O1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlQ2hlY2soXG4gICAgZGF0YTogSW5wdXRWYWx1ZURhdGE8VD5cbiAgKTogUHJvbWlzZTxJbnB1dEVycm9yPFQ+IHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5sb2FkQW5kQ2hlY2soZGF0YSk7XG4gICAgaWYgKFwiZXJyb3JcIiBpbiByZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZXJyb3I7XG4gICAgfVxuICB9XG59XG4iLCIvLyBUT0RPOiBBYnN0cmFjdElucHV0Vmlld1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgRnJhZ21lbnQsIFJlYWN0RWxlbWVudCwgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL0FzeW5jXCI7XG5pbXBvcnQgeyBWaWV3U3RhdGUgfSBmcm9tIFwiLi4vLi4vcmVhY3Qvdmlldy9WaWV3U3RhdGVcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldFZpZXcgfSBmcm9tIFwiLi4vd2lkZ2V0L0Fic3RyYWN0V2lkZ2V0Vmlld1wiO1xuaW1wb3J0IHsgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi93aWRnZXQvV2lkZ2V0XCI7XG4vLyBUT0RPOiB0eXBlIElucHV0Vmlld1xuaW1wb3J0IHtcbiAgQW55SW5wdXQsXG4gIEFueUlucHV0Q29ubmVjdGlvbixcbiAgSW5wdXRFcnJvcixcbiAgSW5wdXRUeXBlLFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRWYWx1ZUVsZW1lbnQsXG59IGZyb20gXCIuL0lucHV0XCI7XG5pbXBvcnQgeyBJbnB1dEVycm9yRWxlbWVudE1hcCwgSW5wdXRWaWV3LCBJbnB1dFZpZXdQcm9wcyB9IGZyb20gXCIuL0lucHV0Vmlld1wiO1xuaW1wb3J0IHsgSW5wdXRWaWV3Q2hpbGRyZW4gfSBmcm9tIFwiLi9JbnB1dFZpZXdDaGlsZHJlblwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RJbnB1dFZpZXc8XG4gICAgQyBleHRlbmRzIEFueUlucHV0Q29ubmVjdGlvbixcbiAgICBQIGV4dGVuZHMgSW5wdXRWaWV3UHJvcHM8Qz4gPSBJbnB1dFZpZXdQcm9wczxDPixcbiAgICBUIGV4dGVuZHMgSW5wdXRUeXBlPEM+ID0gSW5wdXRUeXBlPEM+XG4gID5cbiAgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldFZpZXc8QywgUD5cbiAgaW1wbGVtZW50cyBJbnB1dFZpZXc8Qz4ge1xuICBwcm90ZWN0ZWQgdXBkYXRlRXJyb3I/KGVycm9yOiBUW1wiRXJyb3JcIl0gfCB1bmRlZmluZWQpOiB2b2lkO1xuXG4gIEBWaWV3U3RhdGUoXCJmb3JjZVVwZGF0ZVZhbHVlXCIpIHByb3RlY3RlZCBfdmFsdWU6XG4gICAgfCBJbnB1dFZhbHVlRWxlbWVudDxDPlxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIEBWaWV3U3RhdGUoXCJmb3JjZVVwZGF0ZUVycm9yXCIpIHByb3RlY3RlZCBfZXJyb3I6IElucHV0RXJyb3I8Qz47XG5cbiAgQFZpZXdTdGF0ZSgpIF9lcnJvckVsZW1lbnQ6IFJlYWN0RWxlbWVudCB8IHVuZGVmaW5lZDtcblxuICBAVmlld1N0YXRlKCkgaXNWYWxpZGF0aW5nOiBib29sZWFuO1xuXG4gIHByb3RlY3RlZCBfZGF0YTogSW5wdXRWYWx1ZURhdGE8Qz47XG4gIHByb3RlY3RlZCBfaXNWYWxpZFZhbHVlOiBib29sZWFuO1xuXG4gIGNoaWxkcmVuPzogSW5wdXRWaWV3Q2hpbGRyZW47XG5cbiAgZ2V0IGVycm9yRWxlbWVudCgpOiBSZWFjdEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9lcnJvckVsZW1lbnQ7XG4gIH1cblxuICBnZXQgZGF0YSgpOiBJbnB1dFZhbHVlRGF0YTxDPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICBnZXQgZXJyb3IoKTogVFtcIkVycm9yXCJdIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3I7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogSW5wdXRWYWx1ZUVsZW1lbnQ8Qz4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIGFzeW5jIHNldFZhbHVlKHZhbHVlOiBJbnB1dFZhbHVlRWxlbWVudDxDPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLl9pc1ZhbGlkVmFsdWUgJiYgdGhpcy5fdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmlzVmFsaWRhdGluZyA9IHRydWU7XG4gICAgdGhpcy5fZXJyb3IgPSBhd2FpdCB0aGlzLmdldEVycm9yPy4oKTtcbiAgICB0aGlzLmlzVmFsaWRhdGluZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLl9lcnJvciAhPSBudWxsKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRXJyb3I/Lih0aGlzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faXNWYWxpZFZhbHVlID0gdHJ1ZTtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlPy4odGhpcyk7XG4gIH1cblxuICBzZXRFcnJvcihlcnJvcjogVFtcIkVycm9yXCJdIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fZXJyb3IgPSBlcnJvcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRFcnJvcj8oKTogQXdhaXRhYmxlPElucHV0RXJyb3I8Qz4gfCB1bmRlZmluZWQ+O1xuXG4gIHByb3RlY3RlZCB1cGRhdGVWYWx1ZT8odmFsdWU6IElucHV0VmFsdWVFbGVtZW50PEM+IHwgdW5kZWZpbmVkKTogdm9pZDtcblxuICBwcm90ZWN0ZWQgdXBkYXRlRWxlbWVudChlbGVtZW50OiBXaWRnZXRUeXBlPEM+W1wiRWxlbWVudFwiXSkge1xuICAgIHRoaXMuX3ZhbHVlID1cbiAgICAgIHRoaXMucHJvcHMudmFsdWUgIT09IHVuZGVmaW5lZCA/IHRoaXMucHJvcHMudmFsdWUgOiBlbGVtZW50LnZhbHVlO1xuICB9XG5cbiAgZm9yY2VVcGRhdGVWYWx1ZSgpIHtcbiAgICB0aGlzLl9lcnJvciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9pc1ZhbGlkVmFsdWUgPSBmYWxzZTtcbiAgICB0aGlzLl9kYXRhID0gdGhpcy5ycGMuZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQodGhpcy5fdmFsdWUpO1xuXG4gICAgdGhpcy51cGRhdGVWYWx1ZT8uKHRoaXMuX3ZhbHVlKTtcbiAgfVxuXG4gIC8vIFRPRE86IFtcImNoaWxkcmVuXCIsIHsgLi4uIH1dXG4gIHByb3RlY3RlZCByZW5kZXJFcnJvckVsZW1lbnQoKTogUmVhY3RFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzO1xuICAgIC8vIFRPRE86IHVzZSB0aGlzLmVycm9yXG4gICAgaWYgKGVycm9yID09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5wcm9wcy5yZW5kZXJFcnJvcj8uKGVycm9yKTtcbiAgICBpZiAoZWxlbWVudCkgcmV0dXJuIGVsZW1lbnQ7XG5cbiAgICBjb25zdCBlcnJvck1hcDogUmVjb3JkPHN0cmluZywgUmVhY3RFbGVtZW50IHwgKChlcnJvcikgPT4gUmVhY3RFbGVtZW50KT4gPSB7XG4gICAgICAuLi50aGlzLmdldEVycm9yRWxlbWVudE1hcD8uKCkhLFxuICAgICAgLi4udGhpcy5wcm9wcy5lcnJvck1hcCEsXG4gICAgfSBhcyBhbnk7XG5cbiAgICBjb25zdCBlcnJvclR5cGUgPVxuICAgICAgdHlwZW9mIGVycm9yID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gZXJyb3JcbiAgICAgICAgOiB0eXBlb2YgZXJyb3IgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGVycm9yLnR5cGUgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBlcnJvci50eXBlXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgZXJyb3JFbGVtZW50T3JGbiA9IGVycm9yTWFwW2Vycm9yVHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGVycm9yRWxlbWVudE9yRm4gPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxuICAgICAgICBGcmFnbWVudCxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgZXJyb3JFbGVtZW50T3JGbih0eXBlb2YgZXJyb3IgPT09IFwib2JqZWN0XCIgPyBlcnJvciA6IHVuZGVmaW5lZClcbiAgICAgICk7XG5cbiAgICBpZiAoZXJyb3JFbGVtZW50T3JGbikgcmV0dXJuIGVycm9yRWxlbWVudE9yRm47XG4gIH1cblxuICBmb3JjZVVwZGF0ZUVycm9yKCkge1xuICAgIHRoaXMuX2Vycm9yRWxlbWVudCA9XG4gICAgICB0aGlzLl9lcnJvciAhPSBudWxsID8gdGhpcy5yZW5kZXJFcnJvckVsZW1lbnQoKSA6IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuY2hpbGRyZW4/LnVwZGF0ZUVycm9yKHRoaXMuX2Vycm9yKTtcbiAgICB0aGlzLnVwZGF0ZUVycm9yPy4odGhpcy5fZXJyb3IpO1xuICB9XG5cbiAgaW5wdXRXaWxsVmFsaWRhdGU/KCk6IEF3YWl0YWJsZTtcblxuICBhc3luYyB2YWxpZGF0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBhd2FpdCB0aGlzLmlucHV0V2lsbFZhbGlkYXRlPy4oKTtcbiAgICBjb25zdCBlcnJvciA9XG4gICAgICAoYXdhaXQgdGhpcy5jaGlsZHJlbj8uZ2V0RXJyb3IoKSkgPz8gKGF3YWl0IHRoaXMuZ2V0RXJyb3I/LigpKTtcbiAgICByZXR1cm4gbnVsbCA9PSAodGhpcy5fZXJyb3IgPSBlcnJvcik7XG4gIH1cblxuICB1cGRhdGVWaWV3UHJvcHMocHJldlByb3BzOiBSZWFkb25seTxQPiwgbmV4dFByb3BzOiBSZWFkb25seTxQPikge1xuICAgIHN1cGVyLnVwZGF0ZVZpZXdQcm9wcyhwcmV2UHJvcHMsIG5leHRQcm9wcyk7XG4gICAgaWYgKG5leHRQcm9wcy52YWx1ZSAhPT0gcHJldlByb3BzLnZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IG5leHRQcm9wcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RXJyb3JFbGVtZW50TWFwPygpOiBJbnB1dEVycm9yRWxlbWVudE1hcDxDPjtcblxuICByZW5kZXJFcnJvcigpOiBSZWFjdE5vZGUge1xuICAgIGlmICh0aGlzLmVycm9yRWxlbWVudCkgcmV0dXJuIHRoaXMuZXJyb3JFbGVtZW50O1xuXG4gICAgY29uc3QgeyBlcnJvciB9ID0gdGhpcztcbiAgICBpZiAodHlwZW9mIGVycm9yID09PSBcInN0cmluZ1wiKSByZXR1cm4gZXJyb3I7XG5cbiAgICBpZiAoZXJyb3IgIT0gbnVsbCkgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycm9yKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHN1cGVyLmNvbXBvbmVudERpZE1vdW50KCk7XG4gICAgdGhpcy5wcm9wcy5pbnB1dFJlZj8uKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgc3VwZXIuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbiAgICB0aGlzLnByb3BzLmlucHV0UmVmPy4obnVsbCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgSW5wdXRWaWV3Q2xhc3M8VCBleHRlbmRzIEFueUlucHV0PiA9IG5ldyAoXG4gIHByb3BzOiBJbnB1dFZpZXdQcm9wczxScGNDb25uZWN0aW9uPFQ+PlxuKSA9PiBBYnN0cmFjdElucHV0VmlldzxScGNDb25uZWN0aW9uPFQ+PjtcbiIsIi8vIFRPRE86IFJlbmFtZSB0byAqSW5wdXRcbmltcG9ydCB7IG1lcmdlRGVzY3JpcHRvcnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9tZXJnZURlc2NyaXB0b3JzXCI7XG5pbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL0FzeW5jXCI7XG5pbXBvcnQgeyBJZiwgSXNVbmRlZmluZWQsIE5vdCB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nczIvYm9vbGVhblwiO1xuaW1wb3J0IHsgSXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW4vSXNcIjtcbmltcG9ydCB7IElzRW1wdHlPYmplY3QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW4vSXNFbXB0eU9iamVjdFwiO1xuaW1wb3J0IHsgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL092ZXJyaWRlXCI7XG5pbXBvcnQgeyBQYXJ0aWFsVW5kZWZpbmVkS2V5cyB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nczIvUGFydGlhbFVuZGVmaW5lZEtleXNcIjtcbmltcG9ydCB7IE5vUnBjIH0gZnJvbSBcIi4uL05vUnBjXCI7XG5pbXBvcnQge1xuICBCYXNlZFJwYyxcbiAgUnBjSXNHZW5lcmljQ29uZmlnT3B0aW9uLFxuICBScGNDb25uZWN0aW9uLFxuICBScGNIYW5kbGVyQ2xhc3MsXG4gIFJwY1Jlc29sdmVkSGFuZGxlcixcbiAgUnBjVHlwZSxcbiAgUnBjVW5yZXNvbHZlZENvbmZpZyxcbiAgUnBjUHJvcHNPcHRpb24sXG59IGZyb20gXCIuLi9ScGNcIjtcbmltcG9ydCB7IElzR2VuZXJpY0NvbmZpZyB9IGZyb20gXCIuLi9HZW5lcmljQ29uZmlnXCI7XG5pbXBvcnQge1xuICBUV2lkZ2V0LFxuICBXaWRnZXQsXG4gIFdpZGdldENvbW1hbmRzT3B0aW9uLFxuICBXaWRnZXRDb250cm9sbGVyT3B0aW9uLFxuICBXaWRnZXRFbGVtZW50LFxuICBXaWRnZXRUeXBlLFxufSBmcm9tIFwiLi4vd2lkZ2V0L1dpZGdldFwiO1xuXG5leHBvcnQgdHlwZSBJSW5wdXQgPSBJbnB1dDxcbiAgT3ZlcnJpZGU8XG4gICAgVElucHV0LFxuICAgIHtcbiAgICAgIENvbW1hbmRzOiB7fTtcbiAgICB9XG4gID5cbj47XG5leHBvcnQgdHlwZSBUSW5wdXQgPSB7XG4gIFZhbHVlRGF0YTogYW55O1xuXG4gIFZhbHVlOiBhbnk7XG5cbiAgQ29udHJvbGxlcjogVFdpZGdldFtcIkNvbnRyb2xsZXJcIl07XG5cbiAgUHJvcHM6IFRXaWRnZXRbXCJQcm9wc1wiXTtcblxuICBDb25maWc6IFRXaWRnZXRbXCJDb25maWdcIl07XG5cbiAgRWxlbWVudDogVFdpZGdldFtcIkVsZW1lbnRcIl07XG5cbiAgVmFsdWVFbGVtZW50OiBhbnk7XG5cbiAgVmFsdWVDb25maWc6IGFueTtcblxuICBFcnJvcjogYW55O1xuXG4gIENvbW1hbmRzOiBUV2lkZ2V0W1wiQ29tbWFuZHNcIl07XG59O1xuXG5leHBvcnQgdHlwZSBJbnB1dEVsZW1lbnQ8VCBleHRlbmRzIEFueUlucHV0PiA9IElucHV0VHlwZTxUPltcIkVsZW1lbnRcIl07XG5cbi8qXG5cbiAgJGlucHV0OiB7XG4gICAgY29uZmlnOiAuLi4sXG4gICAgY2hlY2tcbiAgfVxuXG4gKi9cbmV4cG9ydCB0eXBlIElucHV0PFQgZXh0ZW5kcyBUSW5wdXQ+ID0gV2lkZ2V0PHtcbiAgQ29tbWFuZHM6IFRbXCJDb21tYW5kc1wiXSAmIHtcbiAgICBjaGVjazoge1xuICAgICAgKGRhdGE6IFRbXCJWYWx1ZURhdGFcIl0pOiBUW1wiRXJyb3JcIl0gfCB1bmRlZmluZWQ7XG4gICAgICBoYW5kbGVyOiBcImhhbmRsZUNoZWNrXCI7XG4gICAgfTtcbiAgfTtcblxuICBUSW5wdXQ6IFQ7XG5cbiAgQ29ubmVjdGlvbjoge1xuICAgIGNoZWNrKGRhdGE6IFRbXCJWYWx1ZURhdGFcIl0pOiBUW1wiRXJyb3JcIl0gfCB1bmRlZmluZWQ7XG4gIH07XG5cbiAgQ29uZmlnOiBUW1wiQ29uZmlnXCJdO1xuXG4gIEhhbmRsZXI6IHtcbiAgICBnZXRJbnB1dEVsZW1lbnQoKTogUHJvbWlzZTxUW1wiRWxlbWVudFwiXT47XG4gICAgZ2V0VmFsdWVGcm9tQ29uZmlnKHZhbHVlQ29uZmlnOiBUW1wiVmFsdWVDb25maWdcIl0pOiBBd2FpdGFibGU8VFtcIlZhbHVlXCJdPjtcbiAgICBnZXRWYWx1ZUVsZW1lbnQodmFsdWU6IFRbXCJWYWx1ZVwiXSB8IHVuZGVmaW5lZCk6IFByb21pc2U8VFtcIlZhbHVlRWxlbWVudFwiXT47XG4gICAgbG9hZEFuZENoZWNrKFxuICAgICAgdmFsdWVEYXRhOiBUW1wiVmFsdWVEYXRhXCJdXG4gICAgKTogUHJvbWlzZTxJbnB1dEVycm9yT3JWYWx1ZTxJbnB1dDxUPj4+O1xuICB9O1xuXG4gIFByb3BzOiBUW1wiUHJvcHNcIl0gJiB7XG4gICAgaW5wdXRPcHRpb25zOiBJbnB1dE9wdGlvbnM8VElucHV0PjtcblxuICAgIGdldFZhbHVlRGF0YUZyb21FbGVtZW50KFxuICAgICAgdGhpczogSW5wdXQ8VD4sXG4gICAgICBlbGVtZW50OiBUW1wiVmFsdWVFbGVtZW50XCJdXG4gICAgKTogVFtcIlZhbHVlRGF0YVwiXTtcbiAgfTtcblxuICBFbGVtZW50OiBUW1wiRWxlbWVudFwiXSAmIHtcbiAgICB2YWx1ZTogVFtcIlZhbHVlRWxlbWVudFwiXSB8IHVuZGVmaW5lZDtcbiAgfTtcblxuICBFbGVtZW50U3RhdGU6IHVuZGVmaW5lZDtcbiAgQ29udHJvbGxlcjogVFtcIkNvbnRyb2xsZXJcIl07XG59PjtcblxuZXhwb3J0IHR5cGUgQmFzZWRJbnB1dDxUIGV4dGVuZHMgVElucHV0ID0gVElucHV0PiA9IEJhc2VkUnBjPFJwY1R5cGU8SW5wdXQ8VD4+PjtcblxuZXhwb3J0IHR5cGUgSW5wdXRUeXBlPFQgZXh0ZW5kcyBCYXNlZElucHV0PiA9IFdpZGdldFR5cGU8VD5bXCJUSW5wdXRcIl07XG5cbmV4cG9ydCB0eXBlIEVycm9yT3JWYWx1ZTxFLCBWPiA9XG4gIHwgeyBlcnJvcjogRTsgdmFsdWU6IFYgfCB1bmRlZmluZWQgfVxuICB8IHsgdmFsdWU6IFYgfTtcblxuZXhwb3J0IHR5cGUgSW5wdXRFcnJvck9yVmFsdWU8VCBleHRlbmRzIEJhc2VkSW5wdXQ+ID0gRXJyb3JPclZhbHVlPFxuICBJbnB1dEVycm9yPFQ+LFxuICBJbnB1dFZhbHVlPFQ+XG4+O1xuXG5leHBvcnQgdHlwZSBBbnlJbnB1dCA9IElucHV0PFRJbnB1dD47XG5leHBvcnQgdHlwZSBBbnlJbnB1dENvbm5lY3Rpb24gPSBScGNDb25uZWN0aW9uPEFueUlucHV0PjtcblxuZXhwb3J0IHR5cGUgSW5wdXRPcHRpb25zPFQgZXh0ZW5kcyBUSW5wdXQ+ID0gUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gIHtcbiAgICBpc0dlbmVyaWNDb25maWc6IFJwY0lzR2VuZXJpY0NvbmZpZ09wdGlvbjxUPjtcblxuICAgIHByb3BzOiBScGNQcm9wc09wdGlvbjxUPjtcblxuICAgIGNvbnRyb2xsZXI6IFdpZGdldENvbnRyb2xsZXJPcHRpb248VD47XG4gIH0sXG4gIHtcbiAgICBoYW5kbGVyOiBScGNIYW5kbGVyQ2xhc3M8SW5wdXQ8VD4+O1xuXG4gICAgZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQ6IChcbiAgICAgIHRoaXM6IElucHV0PFQ+LFxuICAgICAgdmFsdWU6IElucHV0VmFsdWVFbGVtZW50PElucHV0PFQ+PlxuICAgICkgPT4gSW5wdXRWYWx1ZURhdGE8SW5wdXQ8VD4+O1xuICB9XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gSW5wdXQ8UiBleHRlbmRzIEJhc2VkSW5wdXQsIFQgZXh0ZW5kcyBUSW5wdXQgPSBJbnB1dFR5cGU8Uj4+KFxuICBvcHRpb25zOiBJbnB1dE9wdGlvbnM8VD5cbik6IElucHV0PFQ+IHtcbiAgY29uc3Qge1xuICAgIHByb3BzID0ge30sXG4gICAgaXNHZW5lcmljQ29uZmlnLFxuICAgIGNvbnRyb2xsZXIsXG4gICAgaGFuZGxlcixcbiAgICBnZXRWYWx1ZURhdGFGcm9tRWxlbWVudCxcbiAgfSA9IG9wdGlvbnMgYXMgSW5wdXRPcHRpb25zPFRJbnB1dD47XG5cbiAgcmV0dXJuIDxhbnk+V2lkZ2V0PEFueUlucHV0Pih7XG4gICAgcHJvcHM6IG1lcmdlRGVzY3JpcHRvcnMocHJvcHMsIHtcbiAgICAgIGlucHV0T3B0aW9uczogPElucHV0T3B0aW9uczxUSW5wdXQ+Pm9wdGlvbnMsXG4gICAgICBnZXRWYWx1ZURhdGFGcm9tRWxlbWVudCxcbiAgICB9KSxcbiAgICBjb250cm9sbGVyLFxuICAgIGlzR2VuZXJpY0NvbmZpZyxcbiAgICBjb21tYW5kczogeyBjaGVjazogXCJoYW5kbGVDaGVja1wiIH0sXG4gICAgY29ubmVjdGlvbjoge1xuICAgICAgY2hlY2s6IGNvbm4gPT4gZGF0YSA9PiBjb25uLmNvbW1hbmQoXCJjaGVja1wiLCBkYXRhKSxcbiAgICB9LFxuICAgIGhhbmRsZXIsXG4gIH0pO1xufVxuXG5leHBvcnQgdHlwZSBJbnB1dFZhbHVlPFQgZXh0ZW5kcyBCYXNlZElucHV0PiA9IElucHV0VHlwZTxUPltcIlZhbHVlXCJdO1xuXG5leHBvcnQgdHlwZSBJbnB1dFZhbHVlRWxlbWVudDxUIGV4dGVuZHMgQmFzZWRJbnB1dD4gPSBJbnB1dFR5cGU8XG4gIFRcbj5bXCJWYWx1ZUVsZW1lbnRcIl07XG5cbmV4cG9ydCB0eXBlIElucHV0RXJyb3I8VCBleHRlbmRzIEJhc2VkSW5wdXQ+ID0gSW5wdXRUeXBlPFQ+W1wiRXJyb3JcIl07XG5cbmV4cG9ydCB0eXBlIElucHV0VmFsdWVEYXRhPFQgZXh0ZW5kcyBCYXNlZElucHV0PiA9IElucHV0VHlwZTxUPltcIlZhbHVlRGF0YVwiXTtcblxuZXhwb3J0IHR5cGUgSW5wdXRWYWx1ZUNvbmZpZzxUIGV4dGVuZHMgQmFzZWRJbnB1dD4gPSBJbnB1dFR5cGU8XG4gIFRcbj5bXCJWYWx1ZUNvbmZpZ1wiXTtcbiIsImltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nczIvQXN5bmNcIjtcbmltcG9ydCB7IFBhcnRpYWxVbmRlZmluZWRLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9QYXJ0aWFsVW5kZWZpbmVkS2V5c1wiO1xuaW1wb3J0IHtcbiAgUnBjQ29ubmVjdGlvbixcbiAgUnBjUmVzb2x2ZWRIYW5kbGVyLFxuICBScGNUeXBlLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxufSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQge1xuICBBbnlJbnB1dCxcbiAgSW5wdXQsXG4gIElucHV0RXJyb3IsXG4gIElucHV0VHlwZSxcbiAgSW5wdXRWYWx1ZSxcbiAgVElucHV0LFxufSBmcm9tIFwiLi9JbnB1dFwiO1xuaW1wb3J0IHsgSW5wdXRWaWV3UHJvcHMgfSBmcm9tIFwiLi9JbnB1dFZpZXdcIjtcblxuZXhwb3J0IHR5cGUgQW55SW5wdXRFcnJvckhvb2sgPSBJbnB1dEVycm9ySG9vazxUSW5wdXRFcnJvckhvb2s+O1xuXG5leHBvcnQgdHlwZSBUSW5wdXRFcnJvckhvb2sgPSB7IFRhcmdldDogQW55SW5wdXQ7IEVycm9yOiBhbnkgfTtcblxuZXhwb3J0IHR5cGUgSW5wdXRFcnJvckhvb2s8XG4gIFQgZXh0ZW5kcyBUSW5wdXRFcnJvckhvb2ssXG4gIFRUYXJnZXQgZXh0ZW5kcyBUSW5wdXQgPSBJbnB1dFR5cGU8VFtcIlRhcmdldFwiXT5cbj4gPSBJbnB1dDxcbiAgT21pdDxUVGFyZ2V0LCBcIkVycm9yXCI+ICYge1xuICAgIFRJbnB1dEVycm9ySG9vazogVDtcbiAgICBFcnJvcjogVFRhcmdldFtcIkVycm9yXCJdIHwgVFtcIkVycm9yXCJdO1xuXG4gICAgQ29uZmlnOlxuICAgICAgfCBUVGFyZ2V0W1wiQ29uZmlnXCJdXG4gICAgICB8IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICAgICAgICAgIHsgJGNvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxUW1wiVGFyZ2V0XCJdPiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICRjaGVjazogKFxuICAgICAgICAgICAgICB2YWx1ZTogSW5wdXRWYWx1ZTxUW1wiVGFyZ2V0XCJdPlxuICAgICAgICAgICAgKSA9PiBBd2FpdGFibGU8VFtcIkVycm9yXCJdIHwgdW5kZWZpbmVkPjtcbiAgICAgICAgICB9XG4gICAgICAgID47XG4gIH1cbj47XG5cbmNvbnN0IGNoZWNrU3ltYm9sID0gU3ltYm9sKCk7XG5leHBvcnQgZnVuY3Rpb24gSW5wdXRFcnJvckhvb2s8RT4oKSB7XG4gIHJldHVybiA8VCBleHRlbmRzIEFueUlucHV0PihcbiAgICBpbnB1dDogVFxuICApOiBJbnB1dEVycm9ySG9vazx7IFRhcmdldDogVDsgRXJyb3I6IEUgfT4gPT4ge1xuICAgIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YoXG4gICAgICB7XG4gICAgICAgIGFzeW5jIHJlc29sdmVScGNDb25maWcoY29uZmlnKSB7XG4gICAgICAgICAgbGV0IGNoZWNrOiBhbnkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29uZmlnICYmXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnLiRjaGVjayA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjaGVjayA9IGNvbmZpZy4kY2hlY2s7XG4gICAgICAgICAgICBjb25maWcgPSBjb25maWcuJGNvbmZpZztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uZmlnID0gYXdhaXQgaW5wdXQucmVzb2x2ZVJwY0NvbmZpZy5jYWxsKHRoaXMsIGNvbmZpZyk7XG4gICAgICAgICAgY2hlY2sgJiYgKGNvbmZpZ1tjaGVja1N5bWJvbF0gPSBjaGVjayk7XG5cbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyBjcmVhdGVScGNIYW5kbGVyKGNvbmZpZykge1xuICAgICAgICAgIGNvbnN0IGhhbmRsZXI6IFJwY1Jlc29sdmVkSGFuZGxlcjxBbnlJbnB1dD4gPSBhd2FpdCBpbnB1dC5jcmVhdGVScGNIYW5kbGVyLmNhbGwoXG4gICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgY29uZmlnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoY29uZmlnW2NoZWNrU3ltYm9sXSkge1xuICAgICAgICAgICAgY29uc3QgeyBsb2FkQW5kQ2hlY2sgfSA9IGhhbmRsZXI7XG4gICAgICAgICAgICBoYW5kbGVyLmxvYWRBbmRDaGVjayA9IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGxvYWRBbmRDaGVjay5jYWxsKHRoaXMsIGRhdGEpO1xuICAgICAgICAgICAgICBpZiAoXCJlcnJvclwiIGluIHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBhd2FpdCBjb25maWdbY2hlY2tTeW1ib2xdKHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChlcnJvciAhPSBudWxsKSByZXR1cm4geyBlcnJvciwgdmFsdWU6IHJlc3VsdC52YWx1ZSB9O1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGhhbmRsZXI7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgaW5wdXRcbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSW5wdXRFcnJvckhvb2tWaWV3UHJvcHM8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueUlucHV0RXJyb3JIb29rPixcbiAgVCBleHRlbmRzIFRJbnB1dEVycm9ySG9vayA9IElucHV0VHlwZTxDPltcIlRJbnB1dEVycm9ySG9va1wiXVxuPihwcm9wczogSW5wdXRWaWV3UHJvcHM8Qz4pOiBJbnB1dFZpZXdQcm9wczxScGNDb25uZWN0aW9uPFRbXCJUYXJnZXRcIl0+PiB7XG4gIHJldHVybiA8YW55PnByb3BzO1xufVxuIiwiaW1wb3J0IHsgUmVmQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9lbnRyaWVzXCI7XG5pbXBvcnQgeyBoYXNLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9vYmplY3QvaGFzS2V5c1wiO1xuaW1wb3J0IHsgSWYgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW5cIjtcbmltcG9ydCB7IEFueUlucHV0Q29ubmVjdGlvbiB9IGZyb20gXCIuL0lucHV0XCI7XG5pbXBvcnQgeyBJbnB1dEVycm9yTWFwIH0gZnJvbSBcIi4vaW5wdXQtbWFwL0lucHV0TWFwXCI7XG5pbXBvcnQgeyBBbnlJbnB1dFZpZXcsIElucHV0VmlldyB9IGZyb20gXCIuL0lucHV0Vmlld1wiO1xuXG5leHBvcnQgY2xhc3MgSW5wdXRWaWV3Q2hpbGRyZW4ge1xuICB2aWV3TWFwOiBSZWNvcmQ8c3RyaW5nLCBBbnlJbnB1dFZpZXc+ID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGFzeW5jIHVwZGF0ZUVycm9yKGVycm9yKSB7XG4gICAgY29uc3QgZXJyb3JNYXAgPSAodHlwZW9mIGVycm9yID09PSBcIm9iamVjdFwiICYmIGVycm9yPy5lcnJvck1hcCkgfHwge307XG4gICAgZm9yIChjb25zdCBba2V5LCB2aWV3XSBvZiBlbnRyaWVzPEFueUlucHV0Vmlldz4odGhpcy52aWV3TWFwKSkge1xuICAgICAgdmlldy5zZXRFcnJvcihlcnJvck1hcFtrZXldKTtcbiAgICB9XG4gIH1cblxuICByZWYoa2V5OiBzdHJpbmcpOiBSZWZDYWxsYmFjazxBbnlJbnB1dFZpZXc+IHtcbiAgICByZXR1cm4gdmlldyA9PiB7XG4gICAgICBpZiAodmlldykge1xuICAgICAgICB0aGlzLnZpZXdNYXBba2V5XSA9IHZpZXc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy52aWV3TWFwW2tleV07XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldEVycm9yKCk6IFByb21pc2U8SW5wdXRFcnJvck1hcDxhbnk+IHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgZXJyb3JNYXAgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZpZXddIG9mIGVudHJpZXModGhpcy52aWV3TWFwKSkge1xuICAgICAgYXdhaXQgdmlldy52YWxpZGF0ZSgpO1xuICAgICAgY29uc3QgeyBlcnJvciB9ID0gdmlldztcbiAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgIGVycm9yTWFwW2tleV0gPSBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGhhc0tleXMoZXJyb3JNYXApKSByZXR1cm4geyB0eXBlOiBcIkVSUk9SX01BUFwiLCBlcnJvck1hcCB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBQYXlsb2FkIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9QYXlsb2FkXCI7XG5cbmV4cG9ydCB0eXBlIExlbmd0aEVycm9yID0gUGF5bG9hZDx7XG4gIE1BWF9MRU5HVEg6IHsgbWF4TGVuZ3RoOiBudW1iZXIgfTtcbiAgTUlOX0xFTkdUSDogeyBtaW5MZW5ndGg6IG51bWJlciB9O1xufT47XG5leHBvcnQgdHlwZSBMZW5ndGhPcHRpb25zID0ge1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIG1pbkxlbmd0aD86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMZW5ndGhFcnJvcihcbiAgdmFsdWU6IHsgbGVuZ3RoOiBudW1iZXIgfSxcbiAgeyBtYXhMZW5ndGgsIG1pbkxlbmd0aCB9OiBMZW5ndGhPcHRpb25zXG4pOiBMZW5ndGhFcnJvciB8IHVuZGVmaW5lZCB7XG4gIGlmIChtYXhMZW5ndGggJiYgdmFsdWUubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogXCJNQVhfTEVOR1RIXCIsIG1heExlbmd0aCB9O1xuICB9XG4gIGlmIChtaW5MZW5ndGggJiYgdmFsdWUubGVuZ3RoIDwgbWluTGVuZ3RoKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogXCJNSU5fTEVOR1RIXCIsIG1pbkxlbmd0aCB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL0FzeW5jXCI7XG5cbmV4cG9ydCB0eXBlIFZhbHVlT3JBd2FpdGFibGVGbjxUPiA9IFQgfCAoKCkgPT4gQXdhaXRhYmxlPFQ+KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFZhbHVlT3JBd2FpdGFibGVGbjxUPihcbiAgdmFsdWU6IFZhbHVlT3JBd2FpdGFibGVGbjxUPlxuKTogUHJvbWlzZTxUPiB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiAoPGFueT52YWx1ZSkoKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG4iLCJpbXBvcnQgeyBOb1JwYyB9IGZyb20gXCIuLi8uLi9Ob1JwY1wiO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IFZhbHVlT3JBd2FpdGFibGVGbiB9IGZyb20gXCIuLi9WYWx1ZU9yQXdhaXRhYmxlRm5cIjtcbmltcG9ydCB7IEJvb2xJbnB1dEhhbmRsZXIgfSBmcm9tIFwiLi9Cb29sSW5wdXRIYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIEJvb2xJbnB1dCA9IElucHV0PHtcbiAgQ29tbWFuZHM6IHt9O1xuICBWYWx1ZURhdGE6IGJvb2xlYW47XG4gIFZhbHVlOiBib29sZWFuO1xuICBWYWx1ZUVsZW1lbnQ6IGJvb2xlYW47XG4gIFZhbHVlQ29uZmlnOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICBDb25maWc6IHVuZGVmaW5lZDtcbiAgUHJvcHM6IHt9O1xuICBFbGVtZW50OiB7fTtcbiAgRXJyb3I6IHVuZGVmaW5lZDtcbiAgQ29udHJvbGxlcjogTm9ScGM7XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIEJvb2xJbnB1dCgpOiBCb29sSW5wdXQge1xuICByZXR1cm4gSW5wdXQoe1xuICAgIGhhbmRsZXI6IEJvb2xJbnB1dEhhbmRsZXIsXG4gICAgZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvQXN5bmNcIjtcbmltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL1JlcXVpcmVPcHRpb25hbEtleXNcIjtcbmltcG9ydCB7IFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBXaWRnZXRDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7IEFic3RyYWN0SW5wdXRIYW5kbGVyIH0gZnJvbSBcIi4uL0Fic3RyYWN0SW5wdXRIYW5kbGVyXCI7XG5pbXBvcnQge1xuICBJbnB1dEVsZW1lbnQsXG4gIElucHV0RXJyb3JPclZhbHVlLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlQ29uZmlnLFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRWYWx1ZUVsZW1lbnQsXG59IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgQm9vbElucHV0IH0gZnJvbSBcIi4vQm9vbElucHV0XCI7XG5cbnR5cGUgVCA9IEJvb2xJbnB1dDtcblxuZXhwb3J0IGNsYXNzIEJvb2xJbnB1dEhhbmRsZXIgZXh0ZW5kcyBBYnN0cmFjdElucHV0SGFuZGxlcjxUPiB7XG4gIGdldFZhbHVlRnJvbUNvbmZpZyhcbiAgICB2YWx1ZUNvbmZpZzogSW5wdXRWYWx1ZUNvbmZpZzxUPlxuICApOiBBd2FpdGFibGU8SW5wdXRWYWx1ZTxUPj4ge1xuICAgIHJldHVybiB2YWx1ZUNvbmZpZyB8fCBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIGdldFZhbHVlRWxlbWVudChcbiAgICB2YWx1ZTogSW5wdXRWYWx1ZTxUPiB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPElucHV0VmFsdWVFbGVtZW50PFQ+PiB7XG4gICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgZ2V0Q29udHJvbGxlckNvbmZpZygpOiBScGNVbnJlc29sdmVkQ29uZmlnPFdpZGdldENvbnRyb2xsZXI8VD4+IHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZ2V0SW5wdXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxJbnB1dEVsZW1lbnQ8VD4+PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7fSk7XG4gIH1cblxuICBhc3luYyBsb2FkQW5kQ2hlY2soXG4gICAgdmFsdWVEYXRhOiBJbnB1dFZhbHVlRGF0YTxUPlxuICApOiBQcm9taXNlPElucHV0RXJyb3JPclZhbHVlPFQ+PiB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlRGF0YSA/PyBmYWxzZSB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvQXN5bmNcIjtcbmltcG9ydCB7IFZpZXdTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC92aWV3L1ZpZXdTdGF0ZVwiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IFdpZGdldEVsZW1lbnQsIFdpZGdldFR5cGUgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0L1dpZGdldFwiO1xuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dFZpZXcgfSBmcm9tIFwiLi4vQWJzdHJhY3RJbnB1dFZpZXdcIjtcbmltcG9ydCB7IEJvb2xJbnB1dCB9IGZyb20gXCIuL0Jvb2xJbnB1dFwiO1xuaW1wb3J0IHsgQW55SW5wdXQsIElucHV0VmFsdWVEYXRhLCBJbnB1dEVycm9yLCBJbnB1dFR5cGUgfSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IElucHV0RXJyb3JPckRhdGEsIElucHV0VmlldywgSW5wdXRWaWV3UHJvcHMgfSBmcm9tIFwiLi4vSW5wdXRWaWV3XCI7XG5cbmV4cG9ydCB0eXBlIEJvb2xJbnB1dFZpZXdQcm9wczxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248Qm9vbElucHV0PlxuPiA9IElucHV0Vmlld1Byb3BzPEM+ICYge1xuICBjaGlsZHJlbihmaWVsZDogQm9vbElucHV0VmlldzxDPik6IFJlYWN0RWxlbWVudDtcbn07XG5cbmV4cG9ydCBjbGFzcyBCb29sSW5wdXRWaWV3PFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxCb29sSW5wdXQ+XG4+IGV4dGVuZHMgQWJzdHJhY3RJbnB1dFZpZXc8QywgQm9vbElucHV0Vmlld1Byb3BzPEM+PiB7XG4gIHJlbmRlclZpZXcoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbih0aGlzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbWFwQXJyYXlUb09iamVjdCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXJyYXkvbWFwQXJyYXlUb09iamVjdFwiO1xuaW1wb3J0IHsgbWFwT2JqZWN0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0XCI7XG5pbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL0FzeW5jXCI7XG5pbXBvcnQgeyBPdmVycmlkZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvT3ZlcnJpZGVcIjtcbmltcG9ydCB7IFBhcnRpYWxVbmRlZmluZWRLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9QYXJ0aWFsVW5kZWZpbmVkS2V5c1wiO1xuaW1wb3J0IHsgUGF5bG9hZCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvUGF5bG9hZFwiO1xuaW1wb3J0IHsgRGF0YVJvdyB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9EYXRhUm93XCI7XG5pbXBvcnQgeyBHZW5lcmljQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0dlbmVyaWNDb25maWdcIjtcbmltcG9ydCB7IE5vUnBjIH0gZnJvbSBcIi4uLy4uL05vUnBjXCI7XG5cbmltcG9ydCB7IFJwY1BhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9ycGMtcGFyYW1ldGVyL1JwY1BhcmFtZXRlclwiO1xuaW1wb3J0IHsgQW55UnBjLCBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgUnBjTWFwIH0gZnJvbSBcIi4uLy4uL3JwYy1tYXAvUnBjTWFwXCI7XG5pbXBvcnQgeyBEYXRhVGFibGUgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0L2RhdGEtdGFibGUvRGF0YVRhYmxlXCI7XG5pbXBvcnQgeyBBbnlSb3dUeXBlLCBSb3csIHN0cmluZyB9IGZyb20gXCIuLi8uLi93aWRnZXQvUm93XCI7XG5pbXBvcnQgeyBXaWRnZXRFbGVtZW50IH0gZnJvbSBcIi4uLy4uL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7XG4gIFdpdGhEYXRhS2V5LFxuICBEYXRhSW5wdXRUeXBlcyxcbiAgVERhdGFJbnB1dCxcbn0gZnJvbSBcIi4uL2RhdGEtaW5wdXQvRGF0YUlucHV0XCI7XG5pbXBvcnQge1xuICBBbnlJbnB1dCxcbiAgSW5wdXQsXG4gIElucHV0RXJyb3IsXG4gIElucHV0VmFsdWUsXG4gIElucHV0VmFsdWVEYXRhLFxuICBJbnB1dFZhbHVlRWxlbWVudCxcbn0gZnJvbSBcIi4uL0lucHV0XCI7XG5pbXBvcnQgeyBJbnB1dEVycm9yTWFwIH0gZnJvbSBcIi4uL2lucHV0LW1hcC9JbnB1dE1hcFwiO1xuaW1wb3J0IHsgRGF0YUlucHV0TWFwSGFuZGxlciB9IGZyb20gXCIuL0RhdGFJbnB1dE1hcEhhbmRsZXJcIjtcblxuZXhwb3J0IHR5cGUgQW55RGF0YUlucHV0TWFwID0gRGF0YUlucHV0TWFwPFREYXRhSW5wdXRNYXA+O1xuXG5leHBvcnQgdHlwZSBURGF0YUlucHV0TWFwID0gVERhdGFJbnB1dCAmIHtcbiAgVGFyZ2V0OiBBbnlJbnB1dDtcbn07XG50eXBlIF9UeXBlczxUIGV4dGVuZHMgVERhdGFJbnB1dE1hcD4gPSBUICYgRGF0YUlucHV0VHlwZXM8VD47XG5cbmV4cG9ydCB0eXBlIERhdGFJbnB1dE1hcDxUIGV4dGVuZHMgVERhdGFJbnB1dE1hcD4gPSBJbnB1dDx7XG4gIFR5cGVzOiBfVHlwZXM8VD47XG5cbiAgQ29tbWFuZHM6IHt9O1xuXG4gIFZhbHVlRGF0YTogUmVjb3JkPHN0cmluZywgSW5wdXRWYWx1ZURhdGE8VFtcIlRhcmdldFwiXT4+O1xuXG4gIFZhbHVlOiBSZWNvcmQ8c3RyaW5nLCBJbnB1dFZhbHVlPFRbXCJUYXJnZXRcIl0+PjtcblxuICBWYWx1ZUNvbmZpZzogdW5kZWZpbmVkO1xuXG4gIFZhbHVlRWxlbWVudDogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICB7XG4gICAgICAkdmFsdWU6IElucHV0VmFsdWVFbGVtZW50PFRbXCJUYXJnZXRcIl0+O1xuICAgIH0gJiBUW1wiVGFibGVSb3dcIl1cbiAgPjtcblxuICBQcm9wczoge1xuICAgIHRhcmdldDogVFtcIlRhcmdldFwiXTtcbiAgICB0YWJsZTogRGF0YUlucHV0VHlwZXM8VD5bXCJUYWJsZVwiXTtcbiAgfTtcblxuICBFbGVtZW50OiB7XG4gICAgdGFyZ2V0OiBXaWRnZXRFbGVtZW50PFRbXCJUYXJnZXRcIl0+O1xuICB9O1xuXG4gIENvbmZpZzogR2VuZXJpY0NvbmZpZzxcbiAgICA8VGFibGVEYXRhPihcbiAgICAgIGNvbmZpZzogRGF0YUlucHV0TWFwQ29uZmlnPE92ZXJyaWRlPFQsIHsgVGFibGVEYXRhOiBUYWJsZURhdGEgfT4+XG4gICAgKSA9PiBEYXRhSW5wdXRNYXBDb25maWc8VD5cbiAgPjtcblxuICBFcnJvcjpcbiAgICB8IElucHV0RXJyb3JNYXA8UmVjb3JkPHN0cmluZywgSW5wdXRFcnJvcjxUW1wiVGFyZ2V0XCJdPj4+XG4gICAgfCBQYXlsb2FkPHtcbiAgICAgICAgSU5WQUxJRF9LRVlTOiB7XG4gICAgICAgICAgaW52YWxpZEtleXM6IHN0cmluZ1tdO1xuICAgICAgICB9O1xuICAgICAgfT47XG5cbiAgQ29udHJvbGxlcjogUnBjTWFwPHtcbiAgICB0YWJsZTogRGF0YUlucHV0VHlwZXM8VD5bXCJUYWJsZVwiXTtcbiAgICB0YXJnZXQ6IFRbXCJUYXJnZXRcIl07XG4gICAgZ2V0Um93Q29udHJvbGxlcjogUnBjUGFyYW1ldGVyPHsgVGFyZ2V0OiBUW1wiVGFyZ2V0XCJdOyBEYXRhOiBzdHJpbmcgfT47XG4gIH0+O1xufT47XG5cbmV4cG9ydCB0eXBlIERhdGFJbnB1dE1hcENvbmZpZzxcbiAgVCBleHRlbmRzIFREYXRhSW5wdXRNYXAsXG4gIFRhcmdldCBleHRlbmRzIEFueUlucHV0ID0gVFtcIlRhcmdldFwiXVxuPiA9IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICBEYXRhSW5wdXRUeXBlczxUPltcIk9wdGlvbmFsQ29uZmlnXCJdICYge1xuICAgIHRhcmdldENvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxUYXJnZXQ+O1xuICB9LFxuICBEYXRhSW5wdXRUeXBlczxUPltcIlJlcXVpcmVkQ29uZmlnXCJdICYge1xuICAgIGdldFRhcmdldFZhbHVlOiAoXG4gICAgICByb3c6IERhdGFSb3c8VFtcIlRhYmxlRGF0YVwiXT5cbiAgICApID0+IEF3YWl0YWJsZTxJbnB1dFZhbHVlPFRhcmdldD4+O1xuICB9XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gRGF0YUlucHV0TWFwPFxuICBUYXJnZXQgZXh0ZW5kcyBBbnlJbnB1dCxcbiAgVGFibGVSb3dUeXBlIGV4dGVuZHMgQW55Um93VHlwZSA9IHtcbiAgICBsYWJlbDogdHlwZW9mIHN0cmluZztcbiAgfSxcbiAgVGFibGVSb3dDb250cm9sbGVyIGV4dGVuZHMgQW55UnBjID0gTm9ScGNcbj4oXG4gIHRhcmdldDogVGFyZ2V0LFxuICBvcHRpb25zPzoge1xuICAgIHRhYmxlUm93VHlwZT86IFRhYmxlUm93VHlwZTtcbiAgICB0YWJsZVJvd0NvbnRyb2xsZXI/OiBUYWJsZVJvd0NvbnRyb2xsZXI7XG4gIH1cbik6IERhdGFJbnB1dE1hcDx7XG4gIFRhcmdldDogVGFyZ2V0O1xuICBUYWJsZVJvdzogUm93PFRhYmxlUm93VHlwZT47XG4gIFRhYmxlUm93Q29udHJvbGxlcjogVGFibGVSb3dDb250cm9sbGVyO1xuICBUYWJsZURhdGE6IGFueTtcbiAgTG9hZERhdGE6IGFueTtcbiAgTG9hZFJvdzogYW55O1xuICBWYWx1ZTogc3RyaW5nO1xufT4ge1xuICBjb25zdCB0YWJsZSA9IERhdGFUYWJsZShcbiAgICAob3B0aW9ucz8udGFibGVSb3dUeXBlIGFzIEFueVJvd1R5cGUpIHx8IHsgbGFiZWw6IHN0cmluZyB9XG4gICk7XG5cbiAgcmV0dXJuIDxhbnk+SW5wdXQ8QW55RGF0YUlucHV0TWFwPih7XG4gICAgcHJvcHM6IHtcbiAgICAgIHRhcmdldCxcbiAgICAgIHRhYmxlLFxuICAgIH0sXG4gICAgaGFuZGxlcjogRGF0YUlucHV0TWFwSGFuZGxlcixcbiAgICBpc0dlbmVyaWNDb25maWc6IHRydWUsXG4gICAgY29udHJvbGxlcjogUnBjTWFwKHtcbiAgICAgIHRhYmxlOiB0YWJsZSxcbiAgICAgIHRhcmdldDogdGFyZ2V0IGFzIEFueUlucHV0LFxuICAgICAgZ2V0Um93Q29udHJvbGxlcjogUnBjUGFyYW1ldGVyKFN0cmluZywgdGFyZ2V0KSxcbiAgICB9KSxcbiAgICBnZXRWYWx1ZURhdGFGcm9tRWxlbWVudCh2YWx1ZU1hcCkge1xuICAgICAgcmV0dXJuIG1hcE9iamVjdCh2YWx1ZU1hcCwgaXRlbSA9PlxuICAgICAgICB0aGlzLnRhcmdldC5nZXRWYWx1ZURhdGFGcm9tRWxlbWVudChpdGVtLiR2YWx1ZSlcbiAgICAgICk7XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBoYXNLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvaGFzS2V5c1wiO1xuaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9Bc3luY1wiO1xuaW1wb3J0IHsgUmVxdWlyZU9wdGlvbmFsS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvUmVxdWlyZU9wdGlvbmFsS2V5c1wiO1xuaW1wb3J0IHsgUnBjRXJyb3IsIFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBXaWRnZXRDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7IEFic3RyYWN0SW5wdXRIYW5kbGVyIH0gZnJvbSBcIi4uL0Fic3RyYWN0SW5wdXRIYW5kbGVyXCI7XG5pbXBvcnQge1xuICBJbnB1dEVsZW1lbnQsXG4gIElucHV0RXJyb3JPclZhbHVlLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlQ29uZmlnLFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRWYWx1ZUVsZW1lbnQsXG59IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgQW55RGF0YUlucHV0TWFwIH0gZnJvbSBcIi4vRGF0YUlucHV0TWFwXCI7XG5cbnR5cGUgVCA9IEFueURhdGFJbnB1dE1hcDtcblxuZXhwb3J0IGNsYXNzIERhdGFJbnB1dE1hcEhhbmRsZXIgZXh0ZW5kcyBBYnN0cmFjdElucHV0SGFuZGxlcjxUPiB7XG4gIGdldFZhbHVlRnJvbUNvbmZpZyhcbiAgICB2YWx1ZUNvbmZpZzogSW5wdXRWYWx1ZUNvbmZpZzxUPlxuICApOiBBd2FpdGFibGU8SW5wdXRWYWx1ZTxUPj4ge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGdldENvbnRyb2xsZXJDb25maWcoKTogUnBjVW5yZXNvbHZlZENvbmZpZzxXaWRnZXRDb250cm9sbGVyPFQ+PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRhYmxlOiAkID0+XG4gICAgICAgICQoe1xuICAgICAgICAgIC4uLnRoaXMuY29uZmlnLnRhYmxlQ29uZmlnLFxuICAgICAgICAgIHNvdXJjZTogdGhpcy5jb25maWcuc291cmNlLFxuICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY29uZmlnLmNvbHVtbnMsXG4gICAgICAgIH0pLFxuICAgICAgdGFyZ2V0OiB0aGlzLmNvbmZpZy50YXJnZXRDb25maWcsXG4gICAgICBnZXRSb3dDb250cm9sbGVyOiAkID0+XG4gICAgICAgICQoe1xuICAgICAgICAgIGxvYWQ6IGFzeW5jIGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICEoYXdhaXQgdGhpcy5jb25maWcuc291cmNlLmZpbHRlcih7ICRpczogU3RyaW5nKGtleSkgfSkuaGFzUm93KCkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFJwY0Vycm9yKGBObyBoYXZlIGEga2V5IFwiJHtrZXl9XCIuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0VGFyZ2V0Q29uZmlnOiAkID0+ICQodGhpcy5jb25maWcudGFyZ2V0Q29uZmlnKSxcbiAgICAgICAgfSksXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldElucHV0RWxlbWVudCgpOiBQcm9taXNlPFJlcXVpcmVPcHRpb25hbEtleXM8SW5wdXRFbGVtZW50PFQ+Pj4ge1xuICAgIHJldHVybiB7XG4gICAgICB0YXJnZXQ6IGF3YWl0IHRoaXMuY29udHJvbGxlclxuICAgICAgICAudGhlbihjID0+IGMuZ2V0VGFyZ2V0SGFuZGxlcihcInRhcmdldFwiKSlcbiAgICAgICAgLnRoZW4oYyA9PiBjLmdldEVsZW1lbnQodW5kZWZpbmVkKSksXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldFZhbHVlRWxlbWVudChcbiAgICB2YWx1ZU1hcDogSW5wdXRWYWx1ZTxUPiB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPElucHV0VmFsdWVFbGVtZW50PFQ+PiB7XG4gICAgY29uc3QgeyB0YWJsZSwgdGFyZ2V0IH0gPSBhd2FpdCB0aGlzLmNvbnRyb2xsZXIudGhlbihhc3luYyBjID0+ICh7XG4gICAgICB0YWJsZTogYXdhaXQgYy5nZXRUYXJnZXRIYW5kbGVyKFwidGFibGVcIiksXG4gICAgICB0YXJnZXQ6IGF3YWl0IGMuZ2V0VGFyZ2V0SGFuZGxlcihcInRhcmdldFwiKSxcbiAgICB9KSk7XG5cbiAgICBsZXQgZWxlbWVudE1hcDogUmVjb3JkPHN0cmluZywgeyAkdmFsdWUgfT4gPSB7fTtcbiAgICBmb3IgKGNvbnN0IGRhdGFSb3cgb2YgYXdhaXQgdGhpcy5jb25maWcuc291cmNlLmdldFJvd3MoKSkge1xuICAgICAgY29uc3QgdmFsdWUgPVxuICAgICAgICB2YWx1ZU1hcD8uW2RhdGFSb3cuJGtleV0gPz8gKGF3YWl0IHRoaXMuY29uZmlnLmdldFRhcmdldFZhbHVlKGRhdGFSb3cpKTtcbiAgICAgIGVsZW1lbnRNYXBbZGF0YVJvdy4ka2V5XSA9IHtcbiAgICAgICAgLi4uKGF3YWl0IHRhYmxlLmxvYWRSb3coZGF0YVJvdywgdHJ1ZSkpLFxuICAgICAgICAkdmFsdWU6IGF3YWl0IHRhcmdldC5nZXRWYWx1ZUVsZW1lbnQodmFsdWUpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnRNYXA7XG4gIH1cblxuICBhc3luYyBsb2FkQW5kQ2hlY2soXG4gICAgZGF0YU1hcDogSW5wdXRWYWx1ZURhdGE8VD5cbiAgKTogUHJvbWlzZTxJbnB1dEVycm9yT3JWYWx1ZTxUPj4ge1xuICAgIC8vIGlmICghZGF0YU1hcCkgZGF0YU1hcCA9IHt9O1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhTWFwKTtcbiAgICBpZiAoIWtleXMubGVuZ3RoKSByZXR1cm4geyB2YWx1ZToge30gfTtcblxuICAgIGxldCBlcnJvck1hcDogYW55ID0ge307XG4gICAgbGV0IHZhbHVlTWFwOiBhbnkgPSB7fTtcbiAgICBjb25zdCBpbnZhbGlkS2V5cyA9IG5ldyBTZXQoa2V5cyk7XG4gICAgY29uc3QgdGFyZ2V0ID0gYXdhaXQgdGhpcy5jb250cm9sbGVyLnRoZW4oYyA9PlxuICAgICAgYy5nZXRUYXJnZXRIYW5kbGVyKFwidGFyZ2V0XCIpXG4gICAgKTtcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiBhd2FpdCB0aGlzLmNvbmZpZy5zb3VyY2VcbiAgICAgIC5maWx0ZXIoeyAkaXM6IGtleXMgfSlcbiAgICAgIC5nZXRSb3dzKCkpIHtcbiAgICAgIGludmFsaWRLZXlzLmRlbGV0ZShyb3cuJGtleSk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRhcmdldC5sb2FkQW5kQ2hlY2soZGF0YU1hcFtyb3cuJGtleV0pO1xuICAgICAgaWYgKFwiZXJyb3JcIiBpbiByZXN1bHQpIHtcbiAgICAgICAgZXJyb3JNYXBbcm93LiRrZXldID0gcmVzdWx0LmVycm9yO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlTWFwW3Jvdy4ka2V5XSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGludmFsaWRLZXlzLnNpemUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGVycm9yOiB7IHR5cGU6IFwiSU5WQUxJRF9LRVlTXCIsIGludmFsaWRLZXlzOiBbLi4uaW52YWxpZEtleXNdIH0sXG4gICAgICAgIHZhbHVlOiB2YWx1ZU1hcCxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChoYXNLZXlzKGVycm9yTWFwKSlcbiAgICAgIHJldHVybiB7IGVycm9yOiB7IHR5cGU6IFwiRVJST1JfTUFQXCIsIGVycm9yTWFwIH0sIHZhbHVlOiB2YWx1ZU1hcCB9O1xuICAgIHJldHVybiB7IHZhbHVlOiB2YWx1ZU1hcCB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBoYXNLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvaGFzS2V5c1wiO1xuaW1wb3J0IHsgbWFwT2JqZWN0VG9BcnJheSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L21hcE9iamVjdFRvQXJyYXlcIjtcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3JlbmRlcmVyXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dFZpZXcgfSBmcm9tIFwiLi4vQWJzdHJhY3RJbnB1dFZpZXdcIjtcbmltcG9ydCB7IElucHV0VHlwZSB9IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgSW5wdXRWaWV3UHJvcHMgfSBmcm9tIFwiLi4vSW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBJbnB1dFZpZXdDaGlsZHJlbiB9IGZyb20gXCIuLi9JbnB1dFZpZXdDaGlsZHJlblwiO1xuaW1wb3J0IHsgQW55RGF0YUlucHV0TWFwIH0gZnJvbSBcIi4vRGF0YUlucHV0TWFwXCI7XG5cbmV4cG9ydCB0eXBlIERhdGFJbnB1dE1hcFZpZXdQcm9wczxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55RGF0YUlucHV0TWFwPlxuPiA9IElucHV0Vmlld1Byb3BzPEM+ICYge1xuICB0YXJnZXQ6IFJlbmRlcmVyPHtcbiAgICBwcm9wczogSW5wdXRWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxJbnB1dFR5cGU8Qz5bXCJUeXBlc1wiXVtcIlRhcmdldFwiXT4+O1xuICAgIHJvdzogSW5wdXRUeXBlPEM+W1wiVHlwZXNcIl1bXCJUYWJsZVJvd1wiXTtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIGtleTogc3RyaW5nO1xuICB9PjtcbiAgcmVuZGVyTm9LZXlzPygpO1xufTtcblxuZXhwb3J0IGNsYXNzIERhdGFJbnB1dE1hcFZpZXc8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueURhdGFJbnB1dE1hcD5cbj4gZXh0ZW5kcyBBYnN0cmFjdElucHV0VmlldzxDLCBEYXRhSW5wdXRNYXBWaWV3UHJvcHM8Qz4+IHtcbiAgY2hpbGRyZW4gPSBuZXcgSW5wdXRWaWV3Q2hpbGRyZW4oKTtcblxuICByZW5kZXJWaWV3KCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgaWYgKCFoYXNLZXlzKHRoaXMudmFsdWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW5kZXJOb0tleXM/LigpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBPYmplY3RUb0FycmF5KFxuICAgICAgdGhpcy52YWx1ZSEgfHwge30sXG4gICAgICAoeyAkdmFsdWUsIC4uLnJvdyB9LCBrZXksIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRhcmdldCh7XG4gICAgICAgICAgcm93LFxuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgdmFsdWU6ICR2YWx1ZSxcbiAgICAgICAgICAgIGVsZW1lbnRTdGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgb25FbGVtZW50U3RhdGVDaGFuZ2U6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiB2aWV3ID0+XG4gICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoe1xuICAgICAgICAgICAgICAgIC4uLnRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgICAgIC4uLnJvdyxcbiAgICAgICAgICAgICAgICAgICR2YWx1ZTogdmlldy52YWx1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb246IHRoaXMuY29udHJvbGxlci5nZXRSb3dDb250cm9sbGVyKGtleSksXG4gICAgICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQudGFyZ2V0LFxuICAgICAgICAgICAgaW5wdXRSZWY6IHRoaXMuY2hpbGRyZW4ucmVmKGtleSksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSWYgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW5cIjtcbmltcG9ydCB7IElzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9ib29sZWFuL0lzXCI7XG5pbXBvcnQgeyBJc05ldmVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9ib29sZWFuL0lzTmV2ZXJcIjtcbmltcG9ydCB7IE9taXRLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9PbWl0S2V5c1wiO1xuaW1wb3J0IHsgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL092ZXJyaWRlXCI7XG5pbXBvcnQgeyBQYXJ0aWFsVW5kZWZpbmVkS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvUGFydGlhbFVuZGVmaW5lZEtleXNcIjtcbmltcG9ydCB7IERhdGFSb3cgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZWRhdGEvRGF0YVJvd1wiO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9EYXRhU291cmNlXCI7XG5pbXBvcnQgeyBHZW5lcmljQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0dlbmVyaWNDb25maWdcIjtcbmltcG9ydCB7IE5vUnBjIH0gZnJvbSBcIi4uLy4uL05vUnBjXCI7XG5pbXBvcnQgeyBBbnlScGMgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBEYXRhVGFibGUgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0L2RhdGEtdGFibGUvRGF0YVRhYmxlXCI7XG5pbXBvcnQgeyBBbnlSb3dUeXBlLCBSb3csIHN0cmluZyB9IGZyb20gXCIuLi8uLi93aWRnZXQvUm93XCI7XG5pbXBvcnQgeyBXaWRnZXRUeXBlIH0gZnJvbSBcIi4uLy4uL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4uL0lucHV0XCI7XG5pbXBvcnQgeyBOdWxsYWJsZUlucHV0IH0gZnJvbSBcIi4uL251bGxhYmxlLWlucHV0L051bGxhYmxlSW5wdXRcIjtcblxuaW1wb3J0IHsgVmFsdWVPckF3YWl0YWJsZUZuIH0gZnJvbSBcIi4uL1ZhbHVlT3JBd2FpdGFibGVGblwiO1xuaW1wb3J0IHsgRGF0YUlucHV0SGFuZGxlciB9IGZyb20gXCIuL0RhdGFJbnB1dEhhbmRsZXJcIjtcbmltcG9ydCB7IERhdGFJbnB1dFRlc3RlciB9IGZyb20gXCIuL0RhdGFJbnB1dFRlc3RlclwiO1xuXG5leHBvcnQgdHlwZSBXaXRoRGF0YUtleSA9IHtcbiAgJGtleTogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgRGF0YUlucHV0VHlwZXM8VCBleHRlbmRzIFREYXRhSW5wdXQ+ID0gX1R5cGVzPFQ+O1xuXG50eXBlIF9UeXBlczxUIGV4dGVuZHMgVERhdGFJbnB1dD4gPSBUICYge1xuICBUYWJsZTogRGF0YVRhYmxlPHtcbiAgICBSb3c6IFRbXCJUYWJsZVJvd1wiXTtcbiAgICBEYXRhOiBUW1wiVGFibGVEYXRhXCJdO1xuICAgIFJvd0NvbnRyb2xsZXI6IE5vUnBjO1xuICB9PjtcblxuICBUYWJsZVR5cGVzOiBXaWRnZXRUeXBlPF9UeXBlczxUPltcIlRhYmxlXCJdPltcIlR5cGVzXCJdO1xuXG4gIE9wdGlvbmFsQ29uZmlnOiB7XG4gICAgY29sdW1uczogX1R5cGVzPFQ+W1wiVGFibGVUeXBlc1wiXVtcIkNvbHVtbkNvbmZpZ01hcFwiXTtcbiAgfTtcblxuICBSZXF1aXJlZENvbmZpZzoge1xuICAgIHRhYmxlQ29uZmlnPzogT21pdEtleXM8XG4gICAgICBfVHlwZXM8VD5bXCJUYWJsZVR5cGVzXCJdW1wiUmVxdWlyZWRDb25maWdcIl0gJlxuICAgICAgICBfVHlwZXM8VD5bXCJUYWJsZVR5cGVzXCJdW1wiT3B0aW9uYWxDb25maWdcIl0sXG4gICAgICBcImNvbHVtbnNcIiB8IFwic291cmNlXCJcbiAgICA+O1xuXG4gICAgc291cmNlOiBEYXRhU291cmNlPFRbXCJUYWJsZURhdGFcIl0+O1xuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgRGF0YUlucHV0Q29uZmlnPFQgZXh0ZW5kcyBURGF0YUlucHV0PiA9IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICBfVHlwZXM8VD5bXCJPcHRpb25hbENvbmZpZ1wiXSAmIHtcbiAgICB2YWx1ZVNvdXJjZTpcbiAgICAgIHwgRGF0YVNvdXJjZTxUW1wiTG9hZERhdGFcIl0+XG4gICAgICB8IElmPFxuICAgICAgICAgIElzPFRbXCJWYWx1ZVwiXSwgc3RyaW5nPiB8IElzPFRbXCJUYWJsZURhdGFcIl0sIFRbXCJMb2FkUm93XCJdPixcbiAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgPjtcbiAgfSxcbiAgX1R5cGVzPFQ+W1wiUmVxdWlyZWRDb25maWdcIl1cbj47XG5cbmV4cG9ydCB0eXBlIEFueURhdGFJbnB1dCA9IERhdGFJbnB1dDxhbnksIFREYXRhSW5wdXQ+O1xuXG5leHBvcnQgdHlwZSBURGF0YUlucHV0ID0ge1xuICBUYWJsZVJvdzogYW55O1xuXG4gIFRhYmxlUm93Q29udHJvbGxlcjogQW55UnBjO1xuXG4gIFRhYmxlRGF0YTogYW55O1xuXG4gIExvYWREYXRhOiBhbnk7XG5cbiAgTG9hZFJvdzogYW55O1xuXG4gIFZhbHVlOiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBEYXRhSW5wdXQ8TiBleHRlbmRzIGJvb2xlYW4sIFQgZXh0ZW5kcyBURGF0YUlucHV0PiA9IE51bGxhYmxlSW5wdXQ8XG4gIE4sXG4gIHtcbiAgICBUeXBlczogX1R5cGVzPFQ+O1xuXG4gICAgQ29tbWFuZHM6IHt9O1xuXG4gICAgVmFsdWVEYXRhOiBzdHJpbmc7XG5cbiAgICBWYWx1ZTogVFtcIlZhbHVlXCJdO1xuXG4gICAgVmFsdWVFbGVtZW50OiBfVHlwZXM8VD5bXCJUYWJsZVR5cGVzXCJdW1wiUm93V2l0aEtleVwiXTtcblxuICAgIFZhbHVlQ29uZmlnOiBWYWx1ZU9yQXdhaXRhYmxlRm48XG4gICAgICBzdHJpbmcgfCBEYXRhUm93PFRbXCJUYWJsZURhdGFcIl0+IHwgdW5kZWZpbmVkXG4gICAgPjtcblxuICAgIFByb3BzOiB7XG4gICAgICB0YWJsZTogX1R5cGVzPFQ+W1wiVGFibGVcIl07XG5cbiAgICAgIGlzVmFsdWVEYXRhUm93OiBib29sZWFuO1xuICAgIH07XG5cbiAgICBDb25maWc6IEdlbmVyaWNDb25maWc8XG4gICAgICA8VGFibGVEYXRhLCBMb2FkRGF0YSA9IFRhYmxlRGF0YT4oXG4gICAgICAgIGNvbmZpZzogRGF0YUlucHV0Q29uZmlnPFxuICAgICAgICAgIE92ZXJyaWRlPFxuICAgICAgICAgICAgVCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgVGFibGVEYXRhOiBUYWJsZURhdGE7XG4gICAgICAgICAgICAgIExvYWREYXRhOiBMb2FkRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA+XG4gICAgICAgID5cbiAgICAgICkgPT4gRGF0YUlucHV0Q29uZmlnPFQ+XG4gICAgPjtcblxuICAgIEVsZW1lbnQ6IHt9O1xuXG4gICAgQ29udHJvbGxlcjogX1R5cGVzPFQ+W1wiVGFibGVcIl07XG5cbiAgICBFcnJvcjogXCJJTlZBTElEX0RBVEFfS0VZXCI7XG4gIH1cbj47XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXRhSW5wdXQ8XG4gIFRhYmxlUm93VHlwZSBleHRlbmRzIEFueVJvd1R5cGUgPSB7XG4gICAgbGFiZWw6IHR5cGVvZiBzdHJpbmc7XG4gIH0sXG4gIFRhYmxlUm93Q29udHJvbGxlciBleHRlbmRzIEFueVJwYyA9IE5vUnBjLFxuICBOIGV4dGVuZHMgYm9vbGVhbiA9IGZhbHNlLFxuICBMb2FkVHlwZSA9IG5ldmVyLFxuICBTIGV4dGVuZHMgUHJvcGVydHlLZXkgPSBhbnlcbj4oXG4gIG9wdGlvbnM6IHtcbiAgICBudWxsYWJsZT86IE47XG4gICAgdGFibGVSb3dUeXBlPzogVGFibGVSb3dUeXBlO1xuICAgIHRhYmxlUm93Q29udHJvbGxlcj86IFRhYmxlUm93Q29udHJvbGxlcjtcbiAgICBsb2FkVHlwZT86IExvYWRUeXBlO1xuICB9ID0ge31cbik6IERhdGFJbnB1dDxcbiAgTixcbiAge1xuICAgIFRhYmxlUm93OiBSb3c8VGFibGVSb3dUeXBlPjtcbiAgICBUYWJsZVJvd0NvbnRyb2xsZXI6IFRhYmxlUm93Q29udHJvbGxlcjtcbiAgICBEYXRhOiBhbnk7XG4gICAgTG9hZFJvdzogTG9hZFR5cGU7XG4gICAgVGFibGVEYXRhOiBhbnk7XG4gICAgTG9hZERhdGE6IGFueTtcbiAgICBWYWx1ZTogSXNOZXZlcjxMb2FkVHlwZT4gZXh0ZW5kcyB0cnVlID8gc3RyaW5nIDogRGF0YVJvdzxMb2FkVHlwZT47XG4gICAgUm93OiBhbnk7XG4gIH1cbj4ge1xuICBjb25zdCB0YWJsZSA9IERhdGFUYWJsZShvcHRpb25zLnRhYmxlUm93VHlwZSB8fCB7IGxhYmVsOiBzdHJpbmcgfSk7XG4gIHJldHVybiA8YW55PklucHV0PEFueURhdGFJbnB1dD4oe1xuICAgIHByb3BzOiB7XG4gICAgICBudWxsYWJsZTogb3B0aW9ucy5udWxsYWJsZSA/PyBmYWxzZSxcbiAgICAgIHRhYmxlLFxuICAgICAgaXNWYWx1ZURhdGFSb3c6ICEhb3B0aW9ucy5sb2FkVHlwZSxcbiAgICB9LFxuICAgIGlzR2VuZXJpY0NvbmZpZzogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiB0YWJsZSxcbiAgICBoYW5kbGVyOiBEYXRhSW5wdXRIYW5kbGVyLFxuICAgIGdldFZhbHVlRGF0YUZyb21FbGVtZW50KHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWU/LiRrZXk7XG4gICAgfSxcbiAgfSk7XG59XG5cbi8vIERhdGFJbnB1dCh7XG4vLyAgICB0YWJsZVJvdzoge31cbi8vICAgIHJvdzogVHlwaW5nPFVzZXI+KClcbi8vIH0pXG4iLCJpbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL0FzeW5jXCI7XG5pbXBvcnQgeyBSZXF1aXJlT3B0aW9uYWxLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9SZXF1aXJlT3B0aW9uYWxLZXlzXCI7XG5pbXBvcnQgeyBEYXRhUm93IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVkYXRhL0RhdGFSb3dcIjtcbmltcG9ydCB7IFJwY0Vycm9yLCBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgV2lkZ2V0Q29udHJvbGxlciB9IGZyb20gXCIuLi8uLi93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQge1xuICBFcnJvck9yVmFsdWUsXG4gIElucHV0RWxlbWVudCxcbiAgSW5wdXRFcnJvcixcbiAgSW5wdXRUeXBlLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlQ29uZmlnLFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRWYWx1ZUVsZW1lbnQsXG59IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgQWJzdHJhY3ROdWxsYWJsZUlucHV0SGFuZGxlciB9IGZyb20gXCIuLi9udWxsYWJsZS1pbnB1dC9BYnN0cmFjdE51bGxhYmxlSW5wdXRIYW5kbGVyXCI7XG5pbXBvcnQgeyBWYWx1ZU9yQXdhaXRhYmxlRm4gfSBmcm9tIFwiLi4vVmFsdWVPckF3YWl0YWJsZUZuXCI7XG5pbXBvcnQgeyBBbnlEYXRhSW5wdXQgfSBmcm9tIFwiLi9EYXRhSW5wdXRcIjtcblxudHlwZSBUID0gQW55RGF0YUlucHV0O1xuXG5leHBvcnQgY2xhc3MgRGF0YUlucHV0SGFuZGxlciBleHRlbmRzIEFic3RyYWN0TnVsbGFibGVJbnB1dEhhbmRsZXI8VD4ge1xuICBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxUPj4ge1xuICAgIHJldHVybiAkID0+XG4gICAgICAkKHtcbiAgICAgICAgLi4udGhpcy5jb25maWcudGFibGVDb25maWcsXG4gICAgICAgIHNvdXJjZTogdGhpcy5jb25maWcuc291cmNlLFxuICAgICAgICBjb2x1bW5zOiB0aGlzLmNvbmZpZy5jb2x1bW5zLFxuICAgICAgfSk7XG4gIH1cblxuICBnZXRJbnB1dEVsZW1lbnQoKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPElucHV0RWxlbWVudDxUPj4+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHt9KTtcbiAgfVxuXG4gIGFzeW5jIGdldFZhbHVlRnJvbUNvbmZpZyhcbiAgICB2YWx1ZUNvbmZpZzogSW5wdXRWYWx1ZUNvbmZpZzxUPlxuICApOiBQcm9taXNlPElucHV0VmFsdWU8VD4+IHtcbiAgICB2YWx1ZUNvbmZpZyA9IGF3YWl0IFZhbHVlT3JBd2FpdGFibGVGbih2YWx1ZUNvbmZpZyk7XG4gICAgaWYgKCF2YWx1ZUNvbmZpZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5ycGMuaXNWYWx1ZURhdGFSb3cpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWVDb25maWcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudmFsdWVTb3VyY2UuZ2V0KHZhbHVlQ29uZmlnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZUNvbmZpZztcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZUNvbmZpZyA9PT0gXCJvYmplY3RcIiAvL1xuICAgICAgPyB2YWx1ZUNvbmZpZy4ka2V5XG4gICAgICA6IHZhbHVlQ29uZmlnO1xuICB9XG5cbiAgZ2V0IHZhbHVlU291cmNlKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy52YWx1ZVNvdXJjZSB8fCB0aGlzLmNvbmZpZy5zb3VyY2U7XG4gIH1cblxuICBhc3luYyBnZXRWYWx1ZUVsZW1lbnQoXG4gICAgdmFsdWU6IElucHV0VmFsdWU8VD4gfCB1bmRlZmluZWRcbiAgKTogUHJvbWlzZTxJbnB1dFZhbHVlRWxlbWVudDxUPj4ge1xuICAgIGlmICghdmFsdWUpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICBsZXQgZGF0YVJvdzogRGF0YVJvdzxhbnk+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgaWYgKCF0aGlzLmNvbmZpZy52YWx1ZVNvdXJjZSkge1xuICAgICAgICBkYXRhUm93ID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZS4ka2V5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGRhdGFSb3cgPSBhd2FpdCB0aGlzLmNvbmZpZy5zb3VyY2UuZ2V0KHZhbHVlLiRrZXkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBkYXRhUm93ID0gYXdhaXQgdGhpcy5jb25maWcuc291cmNlLmdldCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGFSb3cgJiYgKGF3YWl0IChhd2FpdCB0aGlzLmNvbnRyb2xsZXIpLmxvYWRSb3coZGF0YVJvdykpO1xuICB9XG5cbiAgYXN5bmMgbG9hZEFuZENoZWNrTm90TnVsbChcbiAgICBrZXk6IE5vbk51bGxhYmxlPElucHV0VmFsdWVEYXRhPFQ+PlxuICApOiBQcm9taXNlPEVycm9yT3JWYWx1ZTxJbnB1dEVycm9yPFQ+LCBOb25OdWxsYWJsZTxJbnB1dFZhbHVlPFQ+Pj4+IHtcbiAgICBpZiAodGhpcy5ycGMuaXNWYWx1ZURhdGFSb3cpIHtcbiAgICAgIGNvbnN0IHJvdyA9IGF3YWl0IHRoaXMudmFsdWVTb3VyY2UuZ2V0KFN0cmluZyhrZXkpKTtcbiAgICAgIGlmICghcm93KSB7XG4gICAgICAgIHJldHVybiB7IGVycm9yOiBcIklOVkFMSURfREFUQV9LRVlcIiwgdmFsdWU6IHVuZGVmaW5lZCB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgdmFsdWU6IHJvdyB9O1xuICAgIH1cbiAgICBpZiAoIShhd2FpdCB0aGlzLmNvbmZpZy5zb3VyY2UuZmlsdGVyKHsgJGlzOiBrZXkgfSkuaGFzUm93KCkpKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogXCJJTlZBTElEX0RBVEFfS0VZXCIsIHZhbHVlOiB1bmRlZmluZWQgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGtleSB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgTnVsbGFibGVJbnB1dFZpZXcgfSBmcm9tIFwiLi4vbnVsbGFibGUtaW5wdXQvTnVsbGFibGVJbnB1dFZpZXdcIjtcbmltcG9ydCB7IEFueURhdGFJbnB1dCB9IGZyb20gXCIuL0RhdGFJbnB1dFwiO1xuXG5leHBvcnQgY2xhc3MgRGF0YUlucHV0VmlldzxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55RGF0YUlucHV0PlxuPiBleHRlbmRzIE51bGxhYmxlSW5wdXRWaWV3PEM+IHt9XG4iLCJpbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7IFBhcnRpYWxVbmRlZmluZWRLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9QYXJ0aWFsVW5kZWZpbmVkS2V5c1wiO1xuaW1wb3J0IHsgUGF5bG9hZCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvUGF5bG9hZFwiO1xuaW1wb3J0IHsgVW5kZWZpbmVkSWZFbXB0eU9iamVjdCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvVW5kZWZpbmVkSWZFbXB0eU9iamVjdFwiO1xuaW1wb3J0IHsgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IFJwY01hcCB9IGZyb20gXCIuLi8uLi9ycGMtbWFwL1JwY01hcFwiO1xuXG5pbXBvcnQge1xuICBBbnlJbnB1dCxcbiAgSW5wdXQsXG4gIElucHV0RWxlbWVudCxcbiAgSW5wdXRFcnJvcixcbiAgSW5wdXRWYWx1ZSxcbiAgSW5wdXRWYWx1ZUNvbmZpZyxcbiAgSW5wdXRWYWx1ZURhdGEsXG4gIElucHV0VmFsdWVFbGVtZW50LFxufSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IElucHV0TWFwSGFuZGxlciB9IGZyb20gXCIuL0lucHV0TWFwSGFuZGxlclwiO1xuXG5leHBvcnQgdHlwZSBBbnlJbnB1dFJlY29yZCA9IFJlY29yZDxzdHJpbmcsIEFueUlucHV0PjtcbmV4cG9ydCB0eXBlIEFueUlucHV0TWFwID0gSW5wdXRNYXA8QW55SW5wdXRSZWNvcmQ+O1xuZXhwb3J0IHR5cGUgSW5wdXRFcnJvck1hcDxUIGV4dGVuZHMgQW55SW5wdXRSZWNvcmQ+ID0gUGF5bG9hZDx7XG4gIEVSUk9SX01BUDoge1xuICAgIGVycm9yTWFwOiB7IFtLIGluIGtleW9mIFRdOiBJbnB1dEVycm9yPFRbS10+IH07XG4gIH07XG59PjtcblxuZXhwb3J0IHR5cGUgSW5wdXRNYXA8VCBleHRlbmRzIEFueUlucHV0UmVjb3JkPiA9IElucHV0PHtcbiAgVElucHV0TWFwOiBUO1xuICBDb21tYW5kczoge307XG4gIENvbnRyb2xsZXI6IFJwY01hcDxUPjtcbiAgUHJvcHM6IHtcbiAgICB0YXJnZXRNYXA6IFQ7XG4gIH07XG4gIEVsZW1lbnQ6IHtcbiAgICBlbGVtZW50TWFwOiB7XG4gICAgICBbSyBpbiBrZXlvZiBUXTogSW5wdXRFbGVtZW50PFRbS10+O1xuICAgIH07XG4gIH07XG4gIENvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxScGNNYXA8VD4+O1xuXG4gIFZhbHVlQ29uZmlnOiBVbmRlZmluZWRJZkVtcHR5T2JqZWN0PFxuICAgIFBhcnRpYWxVbmRlZmluZWRLZXlzPHsgW0sgaW4ga2V5b2YgVF06IElucHV0VmFsdWVDb25maWc8VFtLXT4gfT5cbiAgPjtcbiAgRXJyb3I6IElucHV0RXJyb3JNYXA8VD47XG4gIFZhbHVlRGF0YTogeyBbSyBpbiBrZXlvZiBUXTogSW5wdXRWYWx1ZURhdGE8VFtLXT4gfTtcbiAgVmFsdWU6IHsgW0sgaW4ga2V5b2YgVF06IElucHV0VmFsdWU8VFtLXT4gfTtcbiAgVmFsdWVFbGVtZW50OiB7IFtLIGluIGtleW9mIFRdOiBJbnB1dFZhbHVlRWxlbWVudDxUW0tdPiB9O1xufT47XG5cbi8vXG5cbmV4cG9ydCBmdW5jdGlvbiBJbnB1dE1hcDxUIGV4dGVuZHMgQW55SW5wdXRSZWNvcmQ+KHRhcmdldE1hcDogVCk6IElucHV0TWFwPFQ+IHtcbiAgcmV0dXJuIDxhbnk+SW5wdXQ8QW55SW5wdXRNYXA+KHtcbiAgICBwcm9wczoge1xuICAgICAgdGFyZ2V0TWFwLFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogUnBjTWFwKHRhcmdldE1hcCksXG4gICAgaGFuZGxlcjogSW5wdXRNYXBIYW5kbGVyLFxuICAgIGdldFZhbHVlRGF0YUZyb21FbGVtZW50KHZhbHVlRWxlbWVudE1hcCkge1xuICAgICAgcmV0dXJuIG1hcE9iamVjdCh0aGlzLnRhcmdldE1hcCwgKHRhcmdldCwga2V5KSA9PiB7XG4gICAgICAgIHJldHVybiB0YXJnZXQuZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQodmFsdWVFbGVtZW50TWFwW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBoYXNLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvaGFzS2V5c1wiO1xuaW1wb3J0IHsgbWFwT2JqZWN0QXN5bmMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvQXN5bmNcIjtcbmltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL1JlcXVpcmVPcHRpb25hbEtleXNcIjtcbmltcG9ydCB7IFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBXaWRnZXRDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7IEFic3RyYWN0SW5wdXRIYW5kbGVyIH0gZnJvbSBcIi4uL0Fic3RyYWN0SW5wdXRIYW5kbGVyXCI7XG5pbXBvcnQge1xuICBJbnB1dEVsZW1lbnQsXG4gIElucHV0RXJyb3JPclZhbHVlLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlQ29uZmlnLFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRWYWx1ZUVsZW1lbnQsXG59IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgQW55SW5wdXRNYXAgfSBmcm9tIFwiLi9JbnB1dE1hcFwiO1xuXG50eXBlIFQgPSBBbnlJbnB1dE1hcDtcblxuZXhwb3J0IGNsYXNzIElucHV0TWFwSGFuZGxlciBleHRlbmRzIEFic3RyYWN0SW5wdXRIYW5kbGVyPFQ+IHtcbiAgZ2V0Q29udHJvbGxlckNvbmZpZygpOiBScGNVbnJlc29sdmVkQ29uZmlnPFdpZGdldENvbnRyb2xsZXI8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5jb25maWc7XG4gIH1cblxuICBnZXRWYWx1ZUVsZW1lbnQoXG4gICAgdmFsdWU6IElucHV0VmFsdWU8VD4gfCB1bmRlZmluZWRcbiAgKTogUHJvbWlzZTxJbnB1dFZhbHVlRWxlbWVudDxUPj4ge1xuICAgIHJldHVybiBtYXBPYmplY3RBc3luYyh0aGlzLnJwYy50YXJnZXRNYXAsICh0YXJnZXQsIGtleSkgPT5cbiAgICAgIHRoaXMuY29udHJvbGxlclxuICAgICAgICAudGhlbihjID0+IGMuZ2V0VGFyZ2V0SGFuZGxlcihrZXkpKVxuICAgICAgICAudGhlbihoID0+IGguZ2V0VmFsdWVFbGVtZW50KHZhbHVlPy5ba2V5XSkpXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGdldElucHV0RWxlbWVudCgpOiBQcm9taXNlPFJlcXVpcmVPcHRpb25hbEtleXM8SW5wdXRFbGVtZW50PFQ+Pj4ge1xuICAgIHJldHVybiB7XG4gICAgICBlbGVtZW50TWFwOiBhd2FpdCBtYXBPYmplY3RBc3luYyh0aGlzLnJwYy50YXJnZXRNYXAsICh0YXJnZXQsIGtleSkgPT5cbiAgICAgICAgdGhpcy5jb250cm9sbGVyXG4gICAgICAgICAgLnRoZW4oYyA9PiBjLmdldFRhcmdldEhhbmRsZXIoa2V5KSlcbiAgICAgICAgICAudGhlbihoID0+IGguZ2V0SW5wdXRFbGVtZW50KCkpXG4gICAgICApLFxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXRWYWx1ZUZyb21Db25maWcoXG4gICAgdmFsdWVDb25maWc6IElucHV0VmFsdWVDb25maWc8VD5cbiAgKTogUHJvbWlzZTxJbnB1dFZhbHVlPFQ+PiB7XG4gICAgcmV0dXJuIG1hcE9iamVjdEFzeW5jKHRoaXMucnBjLnRhcmdldE1hcCwgKHRhcmdldCwga2V5KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyXG4gICAgICAgIC50aGVuKGMgPT4gYy5nZXRUYXJnZXRIYW5kbGVyKGtleSkpXG4gICAgICAgIC50aGVuKGggPT4gaC5nZXRWYWx1ZUZyb21Db25maWcodmFsdWVDb25maWc/LltrZXldKSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBsb2FkQW5kQ2hlY2soXG4gICAgZGF0YU1hcDogSW5wdXRWYWx1ZURhdGE8VD5cbiAgKTogUHJvbWlzZTxJbnB1dEVycm9yT3JWYWx1ZTxUPj4ge1xuICAgIGNvbnN0IGVycm9yTWFwOiBhbnkgPSB7fTtcbiAgICBjb25zdCB2YWx1ZU1hcCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKHRoaXMucnBjLnRhcmdldE1hcCwgKHRhcmdldCwga2V5KSA9PlxuICAgICAgdGhpcy5jb250cm9sbGVyXG4gICAgICAgIC50aGVuKGMgPT4gYy5nZXRUYXJnZXRIYW5kbGVyKGtleSkpXG4gICAgICAgIC50aGVuKGggPT4gaC5sb2FkQW5kQ2hlY2soZGF0YU1hcFtrZXldKSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoXCJlcnJvclwiIGluIHJlc3VsdCkge1xuICAgICAgICAgICAgZXJyb3JNYXBba2V5XSA9IHJlc3VsdC5lcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC52YWx1ZTtcbiAgICAgICAgfSlcbiAgICApO1xuXG4gICAgaWYgKGhhc0tleXMoZXJyb3JNYXApKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogdmFsdWVNYXAsIGVycm9yOiB7IHR5cGU6IFwiRVJST1JfTUFQXCIsIGVycm9yTWFwIH0gfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlTWFwIH07XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgRnJhZ21lbnQsIFJlYWN0RWxlbWVudCwgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7IG1hcE9iamVjdFRvQXJyYXkgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RUb0FycmF5XCI7XG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC9yZW5kZXJlclwiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IFdpZGdldENvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0L1dpZGdldFwiO1xuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dFZpZXcgfSBmcm9tIFwiLi4vQWJzdHJhY3RJbnB1dFZpZXdcIjtcbmltcG9ydCB7IEFueUlucHV0Q29ubmVjdGlvbiB9IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgSW5wdXRWaWV3UHJvcHMgfSBmcm9tIFwiLi4vSW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBJbnB1dFZpZXdDaGlsZHJlbiB9IGZyb20gXCIuLi9JbnB1dFZpZXdDaGlsZHJlblwiO1xuaW1wb3J0IHsgQW55SW5wdXRNYXAsIEFueUlucHV0UmVjb3JkLCBJbnB1dE1hcCB9IGZyb20gXCIuL0lucHV0TWFwXCI7XG5cbmV4cG9ydCB0eXBlIEFueUlucHV0TWFwQ29ubmVjdGlvbiA9IFJwY0Nvbm5lY3Rpb248SW5wdXRNYXA8QW55SW5wdXRSZWNvcmQ+PjtcblxuZXhwb3J0IGNsYXNzIElucHV0TWFwVmlldzxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248SW5wdXRNYXA8QW55SW5wdXRSZWNvcmQ+PlxuPiBleHRlbmRzIEFic3RyYWN0SW5wdXRWaWV3PFxuICBDLFxuICBJbnB1dFZpZXdQcm9wczxDPiAmIHtcbiAgICBjaGlsZHJlbihcbiAgICAgIGdldFByb3BzOiA8SyBleHRlbmRzIGtleW9mIFJwY0Nvbm5lY3Rpb248V2lkZ2V0Q29udHJvbGxlcjxDPj4+KFxuICAgICAgICBrZXk6IHN0cmluZyAmIEtcbiAgICAgICkgPT4gSW5wdXRWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxXaWRnZXRDb250cm9sbGVyPEM+PltLXT4sXG4gICAgICB2aWV3OiBJbnB1dE1hcFZpZXc8Qz5cbiAgICApOiBSZWFjdE5vZGU7XG4gIH1cbj4ge1xuICBjaGlsZHJlbiA9IG5ldyBJbnB1dFZpZXdDaGlsZHJlbigpO1xuXG4gIGdldFByb3BzPEsgZXh0ZW5kcyBrZXlvZiBScGNDb25uZWN0aW9uPFdpZGdldENvbnRyb2xsZXI8Qz4+PihcbiAgICBrZXk6IHN0cmluZyAmIEtcbiAgKTogSW5wdXRWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxXaWRnZXRDb250cm9sbGVyPEM+PltLXT4ge1xuICAgIHJldHVybiB7XG4gICAgICBrZXksXG4gICAgICBjb25uZWN0aW9uOiB0aGlzLmNvbnRyb2xsZXJba2V5XSxcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudC5lbGVtZW50TWFwW2tleV0sXG4gICAgICBlbGVtZW50U3RhdGU6IHVuZGVmaW5lZCxcbiAgICAgIG9uRWxlbWVudFN0YXRlQ2hhbmdlOiB1bmRlZmluZWQsXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZT8uW2tleV0sXG4gICAgICBvbkVycm9yOiB2aWV3ID0+IHRoaXMucHJvcHMub25FcnJvcj8uKHRoaXMpLFxuICAgICAgb25DaGFuZ2U6IHZpZXcgPT5cbiAgICAgICAgdGhpcy5zZXRWYWx1ZSh7XG4gICAgICAgICAgLi4udGhpcy52YWx1ZSxcbiAgICAgICAgICBba2V5XTogdmlldy52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBpbnB1dFJlZjogdGhpcy5jaGlsZHJlbi5yZWYoa2V5KSxcbiAgICB9IGFzIElucHV0Vmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248V2lkZ2V0Q29udHJvbGxlcjxDPj5bS10+O1xuICB9XG5cbiAgcmVuZGVyVmlldygpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuKHRoaXMuZ2V0UHJvcHMuYmluZCh0aGlzKSwgdGhpcyk7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBJbnB1dE1hcFZpZXcge1xuICBleHBvcnQgdHlwZSBGaWVsZHNQcm9wczxcbiAgICBDIGV4dGVuZHMgQW55SW5wdXRNYXBDb25uZWN0aW9uLFxuICAgIFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBBbnlJbnB1dENvbm5lY3Rpb24+ID0gUnBjQ29ubmVjdGlvbjxcbiAgICAgIFdpZGdldENvbnRyb2xsZXI8Qz5cbiAgICA+XG4gID4gPSBJbnB1dFZpZXdQcm9wczxDPiAmIHtcbiAgICBmaWVsZHM6IHsgW0sgaW4gc3RyaW5nICYga2V5b2YgVF06IFJlbmRlcmVyPElucHV0Vmlld1Byb3BzPFRbS10+PiB9O1xuICAgIGNoaWxkcmVuPzogUmVuZGVyZXI8e1xuICAgICAgZmllbGRzOiBSZWNvcmQ8c3RyaW5nICYga2V5b2YgVCwgUmVhY3RFbGVtZW50PjtcbiAgICAgIHZpZXc6IElucHV0TWFwVmlldzxDPjtcbiAgICB9PjtcbiAgfTtcblxuICBleHBvcnQgZnVuY3Rpb24gRmllbGRzPEMgZXh0ZW5kcyBBbnlJbnB1dE1hcENvbm5lY3Rpb24+KHtcbiAgICBjaGlsZHJlbixcbiAgICBmaWVsZHM6IGtleVRvUmVuZGVyZXIsXG4gICAgLi4ucHJvcHNcbiAgfTogRmllbGRzUHJvcHM8Qz4pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPElucHV0TWFwVmlld1xuICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgIGNoaWxkcmVuPXsoZ2V0UHJvcHMsIHZpZXcpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbih7XG4gICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgIGZpZWxkczogbWFwT2JqZWN0KGtleVRvUmVuZGVyZXIsIChyZW5kZXIsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgRnJhZ21lbnQsXG4gICAgICAgICAgICAgICAgICB7IGtleSB9LFxuICAgICAgICAgICAgICAgICAgcmVuZGVyKGdldFByb3BzKGtleSkgYXMgYW55KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYXBPYmplY3RUb0FycmF5KFxuICAgICAgICAgICAga2V5VG9SZW5kZXJlcixcbiAgICAgICAgICAgIChyZW5kZXI6IFJlbmRlcmVyPGFueT4sIGtleSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBGcmFnbWVudCxcbiAgICAgICAgICAgICAgICB7IGtleSB9LFxuICAgICAgICAgICAgICAgIHJlbmRlcihnZXRQcm9wcyhrZXkpIGFzIGFueSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBScGNFcnJvciB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IEFic3RyYWN0SW5wdXRIYW5kbGVyIH0gZnJvbSBcIi4uL0Fic3RyYWN0SW5wdXRIYW5kbGVyXCI7XG5pbXBvcnQge1xuICBFcnJvck9yVmFsdWUsXG4gIElucHV0RXJyb3IsXG4gIElucHV0RXJyb3JPclZhbHVlLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgVElucHV0LFxufSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IE51bGxhYmxlSW5wdXQgfSBmcm9tIFwiLi9OdWxsYWJsZUlucHV0XCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE51bGxhYmxlSW5wdXRIYW5kbGVyPFxuICBUIGV4dGVuZHMgTnVsbGFibGVJbnB1dDxhbnksIFRJbnB1dD5cbj4gZXh0ZW5kcyBBYnN0cmFjdElucHV0SGFuZGxlcjxUPiB7XG4gIGFic3RyYWN0IGxvYWRBbmRDaGVja05vdE51bGwoXG4gICAgdmFsdWVEYXRhOiBOb25OdWxsYWJsZTxJbnB1dFZhbHVlRGF0YTxUPj5cbiAgKTogUHJvbWlzZTxFcnJvck9yVmFsdWU8SW5wdXRFcnJvcjxUPiwgTm9uTnVsbGFibGU8SW5wdXRWYWx1ZTxUPj4+PjtcblxuICBhc3luYyBsb2FkQW5kQ2hlY2soXG4gICAgdmFsdWVEYXRhOiBJbnB1dFZhbHVlRGF0YTxUPlxuICApOiBQcm9taXNlPElucHV0RXJyb3JPclZhbHVlPFQ+PiB7XG4gICAgaWYgKHZhbHVlRGF0YSA9PSBudWxsKSB7XG4gICAgICBpZiAoIXRoaXMucnBjLm51bGxhYmxlKSB7XG4gICAgICAgIHJldHVybiB7IGVycm9yOiBcIk5PVF9OVUxMQUJMRVwiLCB2YWx1ZTogdW5kZWZpbmVkIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyB2YWx1ZTogbnVsbCB9O1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmxvYWRBbmRDaGVja05vdE51bGwodmFsdWVEYXRhKTtcbiAgICBpZiAoXCJlcnJvclwiIGluIHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAocmVzdWx0LnZhbHVlID09IG51bGwpIHtcbiAgICAgIGlmICghdGhpcy5ycGMubnVsbGFibGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJwY0Vycm9yKGB2YWx1ZSBpcyBudWxsYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9Bc3luY1wiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IEFic3RyYWN0SW5wdXRWaWV3IH0gZnJvbSBcIi4uL0Fic3RyYWN0SW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBJbnB1dEVycm9yLCBUSW5wdXQgfSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IElucHV0Vmlld1Byb3BzIH0gZnJvbSBcIi4uL0lucHV0Vmlld1wiO1xuaW1wb3J0IHsgTnVsbGFibGVJbnB1dCB9IGZyb20gXCIuL051bGxhYmxlSW5wdXRcIjtcbmltcG9ydCB7IEFueURhdGFJbnB1dCB9IGZyb20gXCIuLi9kYXRhLWlucHV0L0RhdGFJbnB1dFwiO1xuXG5leHBvcnQgY2xhc3MgTnVsbGFibGVJbnB1dFZpZXc8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPE51bGxhYmxlSW5wdXQ8YW55LCBUSW5wdXQ+PlxuPiBleHRlbmRzIEFic3RyYWN0SW5wdXRWaWV3PFxuICBDLFxuICBJbnB1dFZpZXdQcm9wczxDPiAmIHtcbiAgICBjaGlsZHJlbih2aWV3OiBOdWxsYWJsZUlucHV0VmlldzxDPik6IFJlYWN0RWxlbWVudDtcbiAgfVxuPiB7XG4gIHByb3RlY3RlZCBnZXRFcnJvcigpOiBBd2FpdGFibGU8SW5wdXRFcnJvcjxDPiB8IHVuZGVmaW5lZD4ge1xuICAgIGlmICghdGhpcy5ycGMubnVsbGFibGUpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiTk9UX05VTExBQkxFXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyVmlldygpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuKHRoaXMpO1xuICB9XG59XG5cbi8vIFRPT0Q6IElucHV0Vmlld1xuIiwiaW1wb3J0IHsgSWYgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW5cIjtcbmltcG9ydCB7IE92ZXJyaWRlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9PdmVycmlkZVwiO1xuaW1wb3J0IHsgTm9ScGMgfSBmcm9tIFwiLi4vLi4vTm9ScGNcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4uL0lucHV0XCI7XG5pbXBvcnQgeyBUZXh0SW5wdXRIYW5kbGVyIH0gZnJvbSBcIi4vVGV4dElucHV0SGFuZGxlclwiO1xuaW1wb3J0IHsgVGV4dExvYWRlckVycm9yLCBUZXh0TG9hZGVyT3B0aW9ucyB9IGZyb20gXCIuL1RleHRJbnB1dExvYWRlclwiO1xuXG5leHBvcnQgdHlwZSBUZXh0SW5wdXQ8TiBleHRlbmRzIGJvb2xlYW4gPSBhbnk+ID0gSW5wdXQ8e1xuICBFcnJvcjogVGV4dExvYWRlckVycm9yO1xuXG4gIFZhbHVlRGF0YTogc3RyaW5nO1xuXG4gIENvbW1hbmRzOiB7fTtcblxuICBWYWx1ZTogc3RyaW5nIHwgSWY8TiwgbnVsbD47XG5cbiAgVmFsdWVFbGVtZW50OiBzdHJpbmc7XG5cbiAgVmFsdWVDb25maWc6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBDb250cm9sbGVyOiBOb1JwYztcblxuICBQcm9wczoge1xuICAgIG51bGxhYmxlOiBib29sZWFuO1xuICAgIGxvYWRlck9wdGlvbnM6IFRleHRMb2FkZXJPcHRpb25zO1xuICB9O1xuXG4gIENvbmZpZzogdW5kZWZpbmVkIHwgVGV4dExvYWRlck9wdGlvbnM7XG5cbiAgRWxlbWVudDogT3ZlcnJpZGU8XG4gICAgVGV4dExvYWRlck9wdGlvbnMsXG4gICAge1xuICAgICAgcGF0dGVybj86IHN0cmluZztcbiAgICB9XG4gID47XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIFRleHRJbnB1dDxOIGV4dGVuZHMgYm9vbGVhbiA9IGZhbHNlPih7XG4gIG51bGxhYmxlLFxuICAuLi5sb2FkZXJPcHRpb25zXG59OiB7XG4gIG51bGxhYmxlPzogTjtcbn0gJiBUZXh0TG9hZGVyT3B0aW9ucyA9IHt9KTogVGV4dElucHV0PE4+IHtcbiAgcmV0dXJuIDxhbnk+SW5wdXQ8VGV4dElucHV0PGFueT4+KHtcbiAgICBoYW5kbGVyOiBUZXh0SW5wdXRIYW5kbGVyLFxuICAgIHByb3BzOiB7XG4gICAgICBudWxsYWJsZTogbnVsbGFibGUgfHwgZmFsc2UsXG4gICAgICBsb2FkZXJPcHRpb25zLFxuICAgIH0sXG4gICAgZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7IHBpY2sgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9waWNrXCI7XG5pbXBvcnQgeyBMYXp5IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYXR0ZXJucy9sYXp5XCI7XG5pbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL0FzeW5jXCI7XG5pbXBvcnQgeyBSZXF1aXJlT3B0aW9uYWxLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9SZXF1aXJlT3B0aW9uYWxLZXlzXCI7XG5pbXBvcnQgeyBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgV2lkZ2V0Q29udHJvbGxlciB9IGZyb20gXCIuLi8uLi93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQgeyBBYnN0cmFjdElucHV0SGFuZGxlciB9IGZyb20gXCIuLi9BYnN0cmFjdElucHV0SGFuZGxlclwiO1xuaW1wb3J0IHtcbiAgSW5wdXRFbGVtZW50LFxuICBJbnB1dEVycm9yT3JWYWx1ZSxcbiAgSW5wdXRWYWx1ZSxcbiAgSW5wdXRWYWx1ZUNvbmZpZyxcbiAgSW5wdXRWYWx1ZURhdGEsXG4gIElucHV0VmFsdWVFbGVtZW50LFxufSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gXCIuL1RleHRJbnB1dFwiO1xuaW1wb3J0IHsgVGV4dElucHV0TG9hZGVyLCBUZXh0TG9hZGVyT3B0aW9ucyB9IGZyb20gXCIuL1RleHRJbnB1dExvYWRlclwiO1xuXG50eXBlIFQgPSBUZXh0SW5wdXQ8YW55PjtcblxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEhhbmRsZXIgZXh0ZW5kcyBBYnN0cmFjdElucHV0SGFuZGxlcjxUPiB7XG4gIGFzeW5jIGdldFZhbHVlRWxlbWVudChcbiAgICB2YWx1ZTogSW5wdXRWYWx1ZTxUPiB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPElucHV0VmFsdWVFbGVtZW50PFQ+PiB7XG4gICAgcmV0dXJuIHZhbHVlID8/IFwiXCI7XG4gIH1cblxuICBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxUPj4ge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBATGF6eSgpIGdldCBsb2FkZXJPcHRpb25zKCk6IFRleHRMb2FkZXJPcHRpb25zIHtcbiAgICByZXR1cm4geyAuLi50aGlzLnJwYy5sb2FkZXJPcHRpb25zLCAuLi50aGlzLmNvbmZpZyB9O1xuICB9XG5cbiAgYXN5bmMgZ2V0SW5wdXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxJbnB1dEVsZW1lbnQ8VD4+PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1pbkxlbmd0aDogdGhpcy5sb2FkZXJPcHRpb25zLm1pbkxlbmd0aCxcbiAgICAgIG1heExlbmd0aDogdGhpcy5sb2FkZXJPcHRpb25zLm1heExlbmd0aCxcbiAgICAgIHBhdHRlcm46IHRoaXMubG9hZGVyT3B0aW9ucy5wYXR0ZXJuPy5zb3VyY2UsXG4gICAgICB0cmltOiB0aGlzLmxvYWRlck9wdGlvbnMudHJpbSxcbiAgICAgIHJlcXVpcmVkOiB0aGlzLmxvYWRlck9wdGlvbnMucmVxdWlyZWQsXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRBbmRDaGVjayhcbiAgICB2YWx1ZURhdGE6IElucHV0VmFsdWVEYXRhPFQ+XG4gICk6IFByb21pc2U8SW5wdXRFcnJvck9yVmFsdWU8VD4+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IFRleHRJbnB1dExvYWRlci5sb2FkKHRoaXMuY29uZmlnLCB2YWx1ZURhdGEpO1xuICAgIGNvbnN0IGVycm9yID0gVGV4dElucHV0TG9hZGVyLmNoZWNrKHRoaXMuY29uZmlnLCB2YWx1ZURhdGEpO1xuICAgIGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSByZXR1cm4geyBlcnJvciwgdmFsdWUgfTtcbiAgICBpZiAoIXZhbHVlICYmIHRoaXMucnBjLm51bGxhYmxlKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogbnVsbCB9O1xuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZSB9O1xuICB9XG5cbiAgZ2V0VmFsdWVGcm9tQ29uZmlnKFxuICAgIHZhbHVlQ29uZmlnOiBJbnB1dFZhbHVlQ29uZmlnPFQ+XG4gICk6IEF3YWl0YWJsZTxJbnB1dFZhbHVlPFQ+PiB7XG4gICAgcmV0dXJuIHZhbHVlQ29uZmlnIHx8IFwiXCI7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBheWxvYWQgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL1BheWxvYWRcIjtcbmltcG9ydCB7IGdldExlbmd0aEVycm9yLCBMZW5ndGhFcnJvciB9IGZyb20gXCIuLi9MZW5ndGhFcnJvclwiO1xuXG5leHBvcnQgdHlwZSBUZXh0TG9hZGVyT3B0aW9ucyA9IHtcbiAgcGF0dGVybj86IFJlZ0V4cDtcbiAgbWluTGVuZ3RoPzogbnVtYmVyO1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIHRyaW0/OiBib29sZWFuO1xuICByZXF1aXJlZD86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBUZXh0TG9hZGVyRXJyb3IgPVxuICB8IFBheWxvYWQ8e1xuICAgICAgSU5WQUxJRF9QQVRURVJOOiB7IHBhdHRlcm46IHN0cmluZyB9O1xuICAgIH0+XG4gIHwgTGVuZ3RoRXJyb3JcbiAgfCBcIlJFUVVJUkVEXCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVGV4dElucHV0TG9hZGVyIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGxvYWQob3B0aW9uczogVGV4dExvYWRlck9wdGlvbnMsIHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChvcHRpb25zLnRyaW0pIHtcbiAgICAgIHZhbHVlID0gdmFsdWUudHJpbSgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gY2hlY2soXG4gICAgeyByZXF1aXJlZCwgcGF0dGVybiwgbWluTGVuZ3RoLCBtYXhMZW5ndGggfTogVGV4dExvYWRlck9wdGlvbnMsXG4gICAgdmFsdWU6IHN0cmluZ1xuICApOiBUZXh0TG9hZGVyRXJyb3IgfCB1bmRlZmluZWQge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIGlmIChyZXF1aXJlZCkgcmV0dXJuIFwiUkVRVUlSRURcIjtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocGF0dGVybiAmJiAhcGF0dGVybi50ZXN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJJTlZBTElEX1BBVFRFUk5cIiwgcGF0dGVybjogcGF0dGVybi5zb3VyY2UgfTtcbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGhFcnJvciA9IGdldExlbmd0aEVycm9yKHZhbHVlLCB7IG1heExlbmd0aCwgbWluTGVuZ3RoIH0pO1xuICAgIGlmIChsZW5ndGhFcnJvcikgcmV0dXJuIGxlbmd0aEVycm9yO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFRpbWVvdXQgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FzeW5jL1RpbWVvdXRcIjtcbmltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvQXN5bmNcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyBWaWV3U3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3Qvdmlldy9WaWV3U3RhdGVcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBXaWRnZXRUeXBlIH0gZnJvbSBcIi4uLy4uL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7IEFic3RyYWN0SW5wdXRWaWV3IH0gZnJvbSBcIi4uL0Fic3RyYWN0SW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBJbnB1dEVycm9yLCBJbnB1dFZhbHVlRWxlbWVudCB9IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgSW5wdXRFcnJvckVsZW1lbnRNYXAsIElucHV0Vmlld1Byb3BzIH0gZnJvbSBcIi4uL0lucHV0Vmlld1wiO1xuaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSBcIi4vVGV4dElucHV0XCI7XG5pbXBvcnQgeyBUZXh0SW5wdXRMb2FkZXIsIFRleHRMb2FkZXJPcHRpb25zIH0gZnJvbSBcIi4vVGV4dElucHV0TG9hZGVyXCI7XG5cbmV4cG9ydCB0eXBlIFRleHRJbnB1dFZpZXdQcm9wczxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248VGV4dElucHV0PlxuPiA9IElucHV0Vmlld1Byb3BzPEM+O1xuXG5leHBvcnQgY2xhc3MgVGV4dElucHV0VmlldzxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248VGV4dElucHV0PlxuPiBleHRlbmRzIEFic3RyYWN0SW5wdXRWaWV3PFxuICBDLFxuICBUZXh0SW5wdXRWaWV3UHJvcHM8Qz4gJiB7XG4gICAgY2hpbGRyZW4odmlldzogVGV4dElucHV0VmlldzxDPik6IFJlYWN0RWxlbWVudDtcbiAgfVxuPiB7XG4gIEBWaWV3U3RhdGUoKSBwcm90ZWN0ZWQgX3RleHQ6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgdXBkYXRlVmFsdWUodmFsdWU6IElucHV0VmFsdWVFbGVtZW50PEM+IHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fdGV4dCA9IHZhbHVlIHx8IFwiXCI7XG4gIH1cblxuICBnZXQgdGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWJvdW5jZUlkID0gMDtcblxuICBwcm90ZWN0ZWQgX29wdGlvbnM6IFRleHRMb2FkZXJPcHRpb25zO1xuXG4gIHByb3RlY3RlZCB1cGRhdGVFbGVtZW50KGVsZW1lbnQ6IFdpZGdldFR5cGU8Qz5bXCJFbGVtZW50XCJdKSB7XG4gICAgc3VwZXIudXBkYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgLi4uZWxlbWVudCxcbiAgICAgIHBhdHRlcm46IGVsZW1lbnQucGF0dGVybiA/IG5ldyBSZWdFeHAoZWxlbWVudC5wYXR0ZXJuKSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEVycm9yKCk6IEF3YWl0YWJsZTxJbnB1dEVycm9yPEM+IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIFRleHRJbnB1dExvYWRlci5jaGVjayh0aGlzLl9vcHRpb25zLCB0aGlzLnZhbHVlIHx8IFwiXCIpO1xuICB9XG5cbiAgYXN5bmMgc2V0VmFsdWUodmFsdWU6IElucHV0VmFsdWVFbGVtZW50PEM+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHN1cGVyLnNldFZhbHVlKFxuICAgICAgKHRoaXMuX3RleHQgPSBUZXh0SW5wdXRMb2FkZXIubG9hZCh0aGlzLl9vcHRpb25zLCB2YWx1ZSkpXG4gICAgKTtcbiAgfVxuXG4gIGlucHV0V2lsbFZhbGlkYXRlKCk6IEF3YWl0YWJsZSB7XG4gICAgdGhpcy5kZWJvdW5jZUlkKys7XG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsdWUodGhpcy50ZXh0KTtcbiAgfVxuXG4gIGFzeW5jIHNldFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX3RleHQgPT09IHRleHQpIHJldHVybjtcbiAgICBjb25zdCBpZCA9ICsrdGhpcy5kZWJvdW5jZUlkO1xuICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xuICAgIHRoaXMuc2V0RXJyb3IodW5kZWZpbmVkKTtcbiAgICBhd2FpdCBUaW1lb3V0KDMwMCk7XG4gICAgaWYgKGlkICE9PSB0aGlzLmRlYm91bmNlSWQpIHJldHVybjtcbiAgICBhd2FpdCB0aGlzLnNldFZhbHVlKHRleHQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEVycm9yRWxlbWVudE1hcCgpOiBJbnB1dEVycm9yRWxlbWVudE1hcDxUZXh0SW5wdXQ+IHtcbiAgICByZXR1cm4ge1xuICAgICAgSU5WQUxJRF9QQVRURVJOOiBMYW5nYEVYUEVDVEVEX1RPX1BBVFRFUk5fJHtcInBhdHRlcm5cIn1gLFxuICAgICAgUkVRVUlSRUQ6IExhbmdgUkVRVUlSRURgLFxuICAgICAgTUFYX0xFTkdUSDogTGFuZ2BSRVFVSVJFRF9NQVhJTVVNXyR7XCJtYXhMZW5ndGhcIn1gLFxuICAgICAgTUlOX0xFTkdUSDogTGFuZ2BSRVFVSVJFRF9NSU5JTVVNXyR7XCJtaW5MZW5ndGhcIn1gLFxuICAgIH07XG4gIH1cblxuICByZW5kZXJWaWV3KCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW4odGhpcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEF3YWl0YWJsZSwgQXdhaXRlZCB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nczIvQXN5bmNcIjtcbmltcG9ydCB7IEZuIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9GblwiO1xuaW1wb3J0IHsgUnBjRm5IYW5kbGVyIH0gZnJvbSBcIi4vUnBjRm5IYW5kbGVyXCI7XG5pbXBvcnQgeyBScGMgfSBmcm9tIFwiLi4vUnBjXCI7XG5cbmV4cG9ydCB0eXBlIFJwY0ZuPFQgZXh0ZW5kcyBGbj4gPSBScGM8e1xuICBDb25uZWN0aW9uOiAoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4gUHJvbWlzZTxBd2FpdGVkPFJldHVyblR5cGU8VD4+PjtcbiAgUHJvcHM6IHt9O1xuICBDb25maWc6ICguLi5hcmdzOiBQYXJhbWV0ZXJzPFQ+KSA9PiBBd2FpdGFibGU8QXdhaXRlZDxSZXR1cm5UeXBlPFQ+Pj47XG4gIEhhbmRsZXI6IHt9O1xufT47XG5cbmV4cG9ydCB0eXBlIEFueVJwY0ZuID0gUnBjRm48Rm4+O1xuXG5leHBvcnQgZnVuY3Rpb24gUnBjRm48VCBleHRlbmRzIEZuID0gKCkgPT4gdm9pZD4oKTogUnBjRm48VD4ge1xuICByZXR1cm4gPGFueT5ScGM8QW55UnBjRm4+KHtcbiAgICBpc0dlbmVyaWNDb25maWc6IGZhbHNlLFxuICAgIGlzQ29uZmlnRm46IHRydWUsXG4gICAgaGFuZGxlcjogUnBjRm5IYW5kbGVyLFxuICAgIGNvbm5lY3QoaGFuZGxlcikge1xuICAgICAgcmV0dXJuIGFzeW5jICguLi5hcmdzKSA9PiA8QXdhaXRlZDxSZXR1cm5UeXBlPFQ+Pj5hd2FpdCBoYW5kbGVyKGFyZ3MpO1xuICAgIH0sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9Bc3luY1wiO1xuaW1wb3J0IHsgQW55UnBjRm4gfSBmcm9tIFwiLi9ScGNGblwiO1xuaW1wb3J0IHsgQWJzdHJhY3RScGNIYW5kbGVyLCBJUnBjSGFuZGxlciB9IGZyb20gXCIuLi9ScGNcIjtcblxudHlwZSBUID0gQW55UnBjRm47XG5cbmV4cG9ydCBjbGFzcyBScGNGbkhhbmRsZXJcbiAgZXh0ZW5kcyBBYnN0cmFjdFJwY0hhbmRsZXI8VD5cbiAgaW1wbGVtZW50cyBJUnBjSGFuZGxlcjxUPiB7XG4gIGhhbmRsZShwYXlsb2FkOiBhbnkpOiBBd2FpdGFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnKC4uLnBheWxvYWQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7IFBhcnRpYWxVbmRlZmluZWRLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9QYXJ0aWFsVW5kZWZpbmVkS2V5c1wiO1xuaW1wb3J0IHsgVW5kZWZpbmVkSWZFbXB0eU9iamVjdCB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nczIvVW5kZWZpbmVkSWZFbXB0eU9iamVjdFwiO1xuaW1wb3J0IHtcbiAgQW55UnBjLFxuICBScGMsXG4gIFJwY0Nvbm5lY3Rpb24sXG4gIFJwY0Vycm9yLFxuICBScGNSZXNvbHZlZEhhbmRsZXIsXG4gIFJwY1VucmVzb2x2ZWRDb25maWcsXG59IGZyb20gXCIuLi9ScGNcIjtcbmltcG9ydCB7IFJwY01hcEhhbmRsZXIgfSBmcm9tIFwiLi9ScGNNYXBIYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIEFueVJwY1JlY29yZCA9IFJlY29yZDxzdHJpbmcsIEFueVJwYz47XG5cbmV4cG9ydCB0eXBlIEFueVJwY01hcCA9IFJwY01hcDxBbnlScGNSZWNvcmQ+O1xuXG5leHBvcnQgdHlwZSBScGNNYXA8VCBleHRlbmRzIEFueVJwY1JlY29yZD4gPSBScGM8e1xuICBUUnBjTWFwOiBUO1xuXG4gIENvbm5lY3Rpb246IHtcbiAgICBbSyBpbiBrZXlvZiBUXTogUnBjQ29ubmVjdGlvbjxUW0tdPjtcbiAgfTtcblxuICBQcm9wczogeyB0YXJnZXRNYXA6IFQgfTtcblxuICBDb25maWc6IFVuZGVmaW5lZElmRW1wdHlPYmplY3Q8XG4gICAgUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gICAgICB7XG4gICAgICAgIFtLIGluIGtleW9mIFRdOiBScGNVbnJlc29sdmVkQ29uZmlnPFRbS10+O1xuICAgICAgfVxuICAgID5cbiAgPjtcbiAgSGFuZGxlcjoge1xuICAgIGdldFRhcmdldEhhbmRsZXI8SyBleHRlbmRzIGtleW9mIFQ+KFxuICAgICAga2V5OiBLXG4gICAgKTogUHJvbWlzZTxScGNSZXNvbHZlZEhhbmRsZXI8VFtLXT4+O1xuICB9O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBScGNNYXA8VCBleHRlbmRzIEFueVJwY1JlY29yZD4odGFyZ2V0TWFwOiBUKTogUnBjTWFwPFQ+IHtcbiAgcmV0dXJuIDxhbnk+UnBjPEFueVJwY01hcD4oe1xuICAgIHByb3BzOiB7XG4gICAgICB0YXJnZXRNYXA6IHRhcmdldE1hcCxcbiAgICB9LFxuICAgIGhhbmRsZXI6IFJwY01hcEhhbmRsZXIsXG4gICAgY29ubmVjdChoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gbWFwT2JqZWN0KHRoaXMudGFyZ2V0TWFwLCAodGFyZ2V0LCBrZXkpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0LmNyZWF0ZVJwY0Nvbm5lY3Rpb24ocGF5bG9hZCA9PiBoYW5kbGVyKFtrZXksIHBheWxvYWRdKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgUnBjRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBScGNFcnJvcihgYXQga2V5OiR7a2V5fSwgJHtlcnJvci5tZXNzYWdlfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL0FzeW5jXCI7XG5pbXBvcnQge1xuICBBYnN0cmFjdFJwY0hhbmRsZXIsXG4gIEFueVJwYyxcbiAgSVJwY0hhbmRsZXIsXG4gIFJwY0Vycm9yLFxuICBScGNSZXNvbHZlZEhhbmRsZXIsXG4gIFJwY1R5cGUsXG59IGZyb20gXCIuLi9ScGNcIjtcbmltcG9ydCB7IEFueVJwY01hcCB9IGZyb20gXCIuL1JwY01hcFwiO1xuXG5leHBvcnQgY2xhc3MgUnBjTWFwSGFuZGxlcjxSIGV4dGVuZHMgQW55UnBjTWFwLCBUIGV4dGVuZHMgUnBjVHlwZTxSPltcIlRScGNNYXBcIl0+XG4gIGV4dGVuZHMgQWJzdHJhY3RScGNIYW5kbGVyPFI+XG4gIGltcGxlbWVudHMgSVJwY0hhbmRsZXI8QW55UnBjTWFwPiB7XG4gIGhhbmRsZShba2V5LCBwYXlsb2FkXSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGFyZ2V0SGFuZGxlcihrZXkpLnRoZW4oYyA9PiBjLmhhbmRsZShwYXlsb2FkKSk7XG4gIH1cblxuICBhc3luYyBnZXRUYXJnZXRIYW5kbGVyKGtleTogc3RyaW5nKTogUHJvbWlzZTxScGNSZXNvbHZlZEhhbmRsZXI8QW55UnBjPj4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5ycGMudGFyZ2V0TWFwW2tleV0ucmVzb2x2ZVJwY0hhbmRsZXIodGhpcy5jb25maWdba2V5XSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFJwY0Vycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBScGNFcnJvcihgQXQga2V5OiR7a2V5fSwgJHtlcnJvci5tZXNzYWdlfWApO1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb25maWdGYWN0b3J5IH0gZnJvbSBcIi4uL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIEFueVJwYyxcbiAgUnBjLFxuICBScGNDb25maWcsXG4gIFJwY0Nvbm5lY3Rpb24sXG4gIFJwY1VucmVzb2x2ZWRDb25maWcsXG59IGZyb20gXCIuLi9ScGNcIjtcbmltcG9ydCB7IFJwY1BhcmFtZXRlckhhbmRsZXIgfSBmcm9tIFwiLi9ScGNQYXJhbWV0ZXJIYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIFRScGNQYXJhbWV0ZXIgPSB7IFRhcmdldDogQW55UnBjOyBEYXRhOiBhbnkgfTtcblxuZXhwb3J0IHR5cGUgUnBjUGFyYW1ldGVyPFQgZXh0ZW5kcyBUUnBjUGFyYW1ldGVyPiA9IFJwYzx7XG4gIFRQYXJhbWV0ZXI6IFQ7XG5cbiAgSGFuZGxlcjoge307XG5cbiAgQ29ubmVjdGlvbjogKGRhdGE6IFRbXCJEYXRhXCJdKSA9PiBScGNDb25uZWN0aW9uPFRbXCJUYXJnZXRcIl0+O1xuXG4gIFByb3BzOiB7XG4gICAgcGFyYW1ldGVyVGFyZ2V0OiBUW1wiVGFyZ2V0XCJdO1xuICAgIHBhcmFtZXRlckRhdGFUeXBlOiAob2JqOiBhbnkpID0+IFRbXCJEYXRhXCJdO1xuICB9O1xuXG4gIENvbmZpZzogQ29uZmlnRmFjdG9yeTxScGNDb25maWc8VFtcIlRhcmdldFwiXT4sIFtUW1wiRGF0YVwiXV0+O1xufT47XG5leHBvcnQgdHlwZSBBbnlScGNQYXJhbWV0ZXIgPSBScGNQYXJhbWV0ZXI8VFJwY1BhcmFtZXRlcj47XG5cbi8vIFRPRE86IFBhcmFtZXRlclR5cGVSZWZcbmV4cG9ydCBmdW5jdGlvbiBScGNQYXJhbWV0ZXI8VGFyZ2V0IGV4dGVuZHMgQW55UnBjLCBEYXRhPihcbiAgZGF0YVR5cGU6IChvYmo6IGFueSkgPT4gRGF0YSxcbiAgdGFyZ2V0OiBUYXJnZXRcbik6IFJwY1BhcmFtZXRlcjx7IERhdGE6IERhdGE7IFRhcmdldDogVGFyZ2V0IH0+IHtcbiAgcmV0dXJuIDxhbnk+UnBjPEFueVJwY1BhcmFtZXRlcj4oe1xuICAgIGlzR2VuZXJpY0NvbmZpZzogZmFsc2UsXG4gICAgaXNDb25maWdGbjogdHJ1ZSxcbiAgICBoYW5kbGVyOiBScGNQYXJhbWV0ZXJIYW5kbGVyLFxuICAgIHByb3BzOiB7IHBhcmFtZXRlclRhcmdldDogdGFyZ2V0LCBwYXJhbWV0ZXJEYXRhVHlwZTogZGF0YVR5cGUgfSxcbiAgICBjb25uZWN0KGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBkYXRhID0+XG4gICAgICAgIHRoaXMucGFyYW1ldGVyVGFyZ2V0LmNyZWF0ZVJwY0Nvbm5lY3Rpb24ocGF5bG9hZCA9PlxuICAgICAgICAgIGhhbmRsZXIoW2RhdGEsIHBheWxvYWRdKVxuICAgICAgICApO1xuICAgIH0sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgQ29uZmlnRmFjdG9yeSB9IGZyb20gXCIuLi9Db25maWdGYWN0b3J5XCI7XG5pbXBvcnQgeyBBYnN0cmFjdFJwY0hhbmRsZXIsIElScGNIYW5kbGVyIH0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgQW55UnBjUGFyYW1ldGVyIH0gZnJvbSBcIi4vUnBjUGFyYW1ldGVyXCI7XG5cbnR5cGUgVCA9IEFueVJwY1BhcmFtZXRlcjtcblxuZXhwb3J0IGNsYXNzIFJwY1BhcmFtZXRlckhhbmRsZXJcbiAgZXh0ZW5kcyBBYnN0cmFjdFJwY0hhbmRsZXI8VD5cbiAgaW1wbGVtZW50cyBJUnBjSGFuZGxlcjxUPiB7XG4gIGFzeW5jIGhhbmRsZShbZGF0YSwgcGF5bG9hZF0pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgdGhpcy5ycGMucGFyYW1ldGVyRGF0YVR5cGUoZGF0YSk7XG4gICAgY29uc3QgY29uZmlnRm9yVmFsdWUgPSBhd2FpdCBDb25maWdGYWN0b3J5KHRoaXMuY29uZmlnLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMucnBjLnBhcmFtZXRlclRhcmdldFxuICAgICAgLnJlc29sdmVScGNIYW5kbGVyKGNvbmZpZ0ZvclZhbHVlKVxuICAgICAgLnRoZW4oYyA9PiBjLmhhbmRsZShwYXlsb2FkKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IExhenkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhdHRlcm5zL2xhenlcIjtcbmltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL1JlcXVpcmVPcHRpb25hbEtleXNcIjtcbmltcG9ydCB7XG4gIEFic3RyYWN0UnBjSGFuZGxlcixcbiAgSVJwY0hhbmRsZXIsXG4gIFJwY1Jlc29sdmVkSGFuZGxlcixcbiAgUnBjVW5yZXNvbHZlZENvbmZpZyxcbn0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHtcbiAgQW55V2lkZ2V0LFxuICBJV2lkZ2V0LFxuICBUV2lkZ2V0LFxuICBXaWRnZXRDb250cm9sbGVyLFxuICBXaWRnZXRFbGVtZW50LFxuICBXaWRnZXRFbGVtZW50U3RhdGUsXG4gIFdpZGdldFR5cGUsXG59IGZyb20gXCIuL1dpZGdldFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RXaWRnZXRIYW5kbGVyPFQgZXh0ZW5kcyBBbnlXaWRnZXQ+XG4gIGV4dGVuZHMgQWJzdHJhY3RScGNIYW5kbGVyPFQ+XG4gIGltcGxlbWVudHMgSVJwY0hhbmRsZXI8SVdpZGdldD4ge1xuICBhYnN0cmFjdCBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxUPj47XG5cbiAgYWJzdHJhY3QgZ2V0RWxlbWVudChcbiAgICBzdGF0ZTogV2lkZ2V0RWxlbWVudFN0YXRlPFQ+IHwgdW5kZWZpbmVkXG4gICk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxXaWRnZXRFbGVtZW50PFQ+Pj47XG5cbiAgQExhenkoKSBnZXQgY29udHJvbGxlcigpOiBQcm9taXNlPFJwY1Jlc29sdmVkSGFuZGxlcjxXaWRnZXRDb250cm9sbGVyPFQ+Pj4ge1xuICAgIHJldHVybiB0aGlzLnJwYy53aWRnZXQuY29udHJvbGxlci5yZXNvbHZlUnBjSGFuZGxlcihcbiAgICAgIHRoaXMuZ2V0Q29udHJvbGxlckNvbmZpZygpXG4gICAgKSBhcyBQcm9taXNlPFJwY1Jlc29sdmVkSGFuZGxlcjxXaWRnZXRDb250cm9sbGVyPFQ+Pj47XG4gIH1cblxuICBhc3luYyBoYW5kbGUoW2tleSwgcGF5bG9hZF06IFtzdHJpbmcsIGFueV0pOiBQcm9taXNlPGFueT4ge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIFwiZ2V0RWxlbWVudFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50KHBheWxvYWQpO1xuICAgICAgY2FzZSBcImNvbnRyb2xsZXJcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci50aGVuKGhhbmRsZXIgPT4gaGFuZGxlci5oYW5kbGUocGF5bG9hZCkpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMucnBjLndpZGdldC5jb21tYW5kc1trZXldO1xuICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGNvbW1hbmQgaGFuZGxlciBmb3IgXCIke2tleX1cIi5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1toYW5kbGVyXSguLi5wYXlsb2FkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi4vLi4vcmVhY3Qvdmlldy9WaWV3XCI7XG5pbXBvcnQgeyBWaWV3U3RhdGUgfSBmcm9tIFwiLi4vLi4vcmVhY3Qvdmlldy9WaWV3U3RhdGVcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQge1xuICBBbnlXaWRnZXQsXG4gIEFueVdpZGdldENvbm5lY3Rpb24sXG4gIFdpZGdldCxcbiAgV2lkZ2V0Q29udHJvbGxlcixcbiAgV2lkZ2V0RWxlbWVudCxcbiAgV2lkZ2V0RWxlbWVudFN0YXRlLFxuICBXaWRnZXRUeXBlLFxufSBmcm9tIFwiLi9XaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFZpZXcsIFdpZGdldFZpZXdQcm9wcyB9IGZyb20gXCIuL1dpZGdldFZpZXdcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0V2lkZ2V0VmlldzxcbiAgICBDIGV4dGVuZHMgQW55V2lkZ2V0Q29ubmVjdGlvbixcbiAgICBQIGV4dGVuZHMgV2lkZ2V0Vmlld1Byb3BzPEM+ID0gV2lkZ2V0Vmlld1Byb3BzPEM+XG4gID5cbiAgZXh0ZW5kcyBWaWV3PFA+XG4gIGltcGxlbWVudHMgV2lkZ2V0VmlldzxDPiB7XG4gIEBWaWV3U3RhdGUoXCJmb3JjZVVwZGF0ZUVsZW1lbnRcIikgX2VsZW1lbnQ6IFdpZGdldEVsZW1lbnQ8Qz47XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUVsZW1lbnQ/KGVsZW1lbnQ6IFdpZGdldEVsZW1lbnQ8Qz4pOiB2b2lkO1xuXG4gIHByb3RlY3RlZCBfZWxlbWVudFN0YXRlOiBXaWRnZXRFbGVtZW50U3RhdGU8Qz4gfCB1bmRlZmluZWQgPSB0aGlzLnByb3BzXG4gICAgLmVsZW1lbnRTdGF0ZTtcbiAgc2V0RWxlbWVudFN0YXRlKHN0YXRlOiBXaWRnZXRFbGVtZW50U3RhdGU8Qz4pIHtcbiAgICB0aGlzLnByb3BzLm9uRWxlbWVudFN0YXRlQ2hhbmdlPy4oKHRoaXMuX2VsZW1lbnRTdGF0ZSA9IHN0YXRlKSk7XG4gIH1cblxuICBnZXQgZWxlbWVudFN0YXRlKCk6IFdpZGdldEVsZW1lbnRTdGF0ZTxDPiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRTdGF0ZTtcbiAgfVxuXG4gIGdldCBlbGVtZW50KCk6IFdpZGdldEVsZW1lbnQ8Qz4ge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICB9XG5cbiAgc2V0RWxlbWVudChlbGVtZW50OiBXaWRnZXRFbGVtZW50PEM+KSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBnZXQgcnBjKCk6IFdpZGdldDxXaWRnZXRUeXBlPEM+PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY29ubmVjdGlvbi5ycGMgYXMgYW55O1xuICB9XG5cbiAgZ2V0IGNvbnRyb2xsZXIoKTogUnBjQ29ubmVjdGlvbjxXaWRnZXRDb250cm9sbGVyPEM+PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY29ubmVjdGlvbi5jb250cm9sbGVyO1xuICB9XG5cbiAgZ2V0IGNvbm5lY3Rpb24oKTogQyB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY29ubmVjdGlvbjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLnByb3BzLmVsZW1lbnQ7XG4gICAgdGhpcy51cGRhdGVFbGVtZW50Py4odGhpcy5wcm9wcy5lbGVtZW50KTtcbiAgfVxuXG4gIGZvcmNlVXBkYXRlRWxlbWVudCgpIHtcbiAgICB0aGlzLnVwZGF0ZUVsZW1lbnQ/Lih0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgdXBkYXRlVmlld1Byb3BzKHByZXZQcm9wczogUmVhZG9ubHk8UD4sIG5leHRQcm9wczogUmVhZG9ubHk8UD4pOiB2b2lkIHtcbiAgICBpZiAobmV4dFByb3BzLmVsZW1lbnQgIT09IHByZXZQcm9wcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLl9lbGVtZW50ID0gbmV4dFByb3BzLmVsZW1lbnQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB0eXBlIFdpZGdldFZpZXdDbGFzczxUIGV4dGVuZHMgQW55V2lkZ2V0PiA9IG5ldyAoXG4gIHByb3BzOiBXaWRnZXRWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxUPj5cbikgPT4gQWJzdHJhY3RXaWRnZXRWaWV3PFJwY0Nvbm5lY3Rpb248VD4+O1xuIiwiaW1wb3J0IHsgRXhwZWN0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9FeHBlY3RcIjtcbmltcG9ydCB7IE51bGxhYmxlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9OdWxsYWJsZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyKHZhbHVlOiBhbnkpOiBudW1iZXIge1xuICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG51bGxhYmxlPFQ+KHR5cGU6ICh2YWx1ZTogYW55KSA9PiBUKTogQ29sdW1uVHlwZTxUIHwgTnVsbGFibGU+IHtcbiAgcmV0dXJuIHZhbHVlID0+IHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkgcmV0dXJuIHR5cGUodmFsdWUpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpO1xufVxuXG5udW1iZXIuZW51bSA9IGZ1bmN0aW9uIDxUIGV4dGVuZHMgbnVtYmVyPigpOiBDb2x1bW5UeXBlPFQ+IHtcbiAgcmV0dXJuIDxhbnk+bnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGJvb2xlYW4odmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG59XG5cbmV4cG9ydCB0eXBlIENvbHVtblR5cGU8VD4gPSAodmFsdWU6IGFueSkgPT4gVDtcbmV4cG9ydCB0eXBlIEFueUNvbHVtblR5cGUgPSBDb2x1bW5UeXBlPGFueT47XG5cbmV4cG9ydCB0eXBlIEFueVJvd1R5cGUgPSBSZWNvcmQ8c3RyaW5nLCBBbnlDb2x1bW5UeXBlPjtcblxuZXhwb3J0IHR5cGUgUm93PFQgZXh0ZW5kcyBBbnlSb3dUeXBlPiA9IHsgW0sgaW4ga2V5b2YgVF06IFJldHVyblR5cGU8VFtLXT4gfTtcbmV4cG9ydCB0eXBlIENvbHVtbjxUIGV4dGVuZHMgQW55Q29sdW1uVHlwZT4gPSBSZXR1cm5UeXBlPFQ+O1xuXG5leHBvcnQgdHlwZSBBbnlQcmltaXRpdmVDb2x1bW5UeXBlID0gRXhwZWN0PFxuICBBbnlDb2x1bW5UeXBlLFxuICB0eXBlb2Ygc3RyaW5nIHwgdHlwZW9mIG51bWJlciB8IHR5cGVvZiBib29sZWFuXG4+O1xuIiwiLy8gVE9ETzogcmVtb3ZlIGNvbnRyb2xsZXIuXG5pbXBvcnQgeyBlbnRyaWVzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9vYmplY3QvZW50cmllc1wiO1xuaW1wb3J0IHsgbWVyZ2VEZXNjcmlwdG9ycyB9IGZyb20gXCIuLi8uLi9jb21tb24vb2JqZWN0L21lcmdlRGVzY3JpcHRvcnNcIjtcbmltcG9ydCB7IGNhcGl0YWxpemUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3N0cmluZy9jYXBpdGFsaXplXCI7XG5pbXBvcnQgeyBJZiB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nczIvYm9vbGVhblwiO1xuaW1wb3J0IHsgSXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW4vSXNcIjtcbmltcG9ydCB7IElzRW1wdHlPYmplY3QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW4vSXNFbXB0eU9iamVjdFwiO1xuaW1wb3J0IHsgRm4gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL0ZuXCI7XG5pbXBvcnQgeyBPdmVycmlkZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nczIvT3ZlcnJpZGVcIjtcbmltcG9ydCB7IFBhcnRpYWxVbmRlZmluZWRLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9QYXJ0aWFsVW5kZWZpbmVkS2V5c1wiO1xuaW1wb3J0IHsgVW5pb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3MyL1VuaW9uXCI7XG5pbXBvcnQgeyBOb1JwYyB9IGZyb20gXCIuLi9Ob1JwY1wiO1xuaW1wb3J0IHtcbiAgQW55UnBjLFxuICBCYXNlZFJwYyxcbiAgSVJwY0hhbmRsZXIsXG4gIFJwYyxcbiAgUnBjQ29tbWFuZCxcbiAgUnBjQ29ubmVjdGlvbixcbiAgUnBjSGFuZGxlckNsYXNzLFxuICBScGNJc0dlbmVyaWNDb25maWdPcHRpb24sXG4gIFJwY1Byb3BzT3B0aW9uLFxuICBScGNUeXBlLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxuICBUUnBjLFxufSBmcm9tIFwiLi4vUnBjXCI7XG5cbnR5cGUgX1dpZGdldENvbm5lY3Rpb248VCBleHRlbmRzIFRXaWRnZXQ+ID0gVFtcIkNvbm5lY3Rpb25cIl0gJiB7XG4gIHJwYzogV2lkZ2V0PFQ+O1xuICBycGNDb21tYW5kOiBScGNDb21tYW5kO1xuICBjb250cm9sbGVyOiBScGNDb25uZWN0aW9uPFRbXCJDb250cm9sbGVyXCJdPjtcblxuICBnZXRFbGVtZW50KHN0YXRlPzogVFtcIkVsZW1lbnRTdGF0ZVwiXSk6IFByb21pc2U8VFtcIkVsZW1lbnRcIl0+O1xuXG4gIGNvbW1hbmQ8SyBleHRlbmRzIGtleW9mIFRbXCJDb21tYW5kc1wiXT4oXG4gICAga2V5OiBzdHJpbmcgJiBLLFxuICAgIC4uLmFyZ3M6IFBhcmFtZXRlcnM8VFtcIkNvbW1hbmRzXCJdW0tdPlxuICApOiBQcm9taXNlPFJldHVyblR5cGU8VFtcIkNvbW1hbmRzXCJdW0tdPj47XG59O1xuXG5leHBvcnQgdHlwZSBUV2lkZ2V0ID0ge1xuICBDb25uZWN0aW9uOiBvYmplY3Q7XG4gIENvbmZpZzogVFJwY1tcIkNvbmZpZ1wiXTtcbiAgSGFuZGxlcjogVFJwY1tcIkhhbmRsZXJcIl07XG4gIFByb3BzOiBUUnBjW1wiUHJvcHNcIl07XG4gIEVsZW1lbnQ6IG9iamVjdDtcbiAgQ29udHJvbGxlcjogQW55UnBjO1xuICBDb21tYW5kczogUmVjb3JkPHN0cmluZywgRm4gJiB7IGhhbmRsZXI6IHN0cmluZyB9PjtcbiAgRWxlbWVudFN0YXRlOiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBXaWRnZXQ8XG4gIFQgZXh0ZW5kcyBUV2lkZ2V0LFxuICBDIGV4dGVuZHMgVFdpZGdldFtcIkNvbW1hbmRzXCJdID0gVFtcIkNvbW1hbmRzXCJdXG4+ID0gUnBjPHtcbiAgVFdpZGdldDogVDtcblxuICBDb25maWc6IFRbXCJDb25maWdcIl07XG5cbiAgSGFuZGxlcjogVFtcIkhhbmRsZXJcIl0gJiB7XG4gICAgZ2V0RWxlbWVudChzdGF0ZTogVFtcIkVsZW1lbnRTdGF0ZVwiXSB8IHVuZGVmaW5lZCk6IFByb21pc2U8VFtcIkVsZW1lbnRcIl0+O1xuICAgIGdldENvbnRyb2xsZXJDb25maWcoKTogUnBjVW5yZXNvbHZlZENvbmZpZzxUW1wiQ29udHJvbGxlclwiXT47XG4gIH07XG5cbiAgUHJvcHM6IFRbXCJQcm9wc1wiXSAmIHtcbiAgICB3aWRnZXQ6IHtcbiAgICAgIG9wdGlvbnM6IFdpZGdldE9wdGlvbnM8VFdpZGdldD47XG4gICAgICBjb21tYW5kczogUmVjb3JkPGtleW9mIFRbXCJDb21tYW5kc1wiXSwgc3RyaW5nPjtcbiAgICAgIGNvbm5lY3Rpb246IF9XaWRnZXRDb25uZWN0aW9uPFQ+O1xuICAgICAgY29udHJvbGxlcjogVFtcIkNvbnRyb2xsZXJcIl07XG4gICAgfTtcbiAgfTtcblxuICBDb25uZWN0aW9uOiBfV2lkZ2V0Q29ubmVjdGlvbjxUPjtcbn0+O1xuXG5leHBvcnQgdHlwZSBXaWRnZXRDb250cm9sbGVyT3B0aW9uPFQgZXh0ZW5kcyBQaWNrPFRXaWRnZXQsIFwiQ29udHJvbGxlclwiPj4gPVxuICB8IFRbXCJDb250cm9sbGVyXCJdXG4gIHwgSWY8SXM8VFtcIkNvbnRyb2xsZXJcIl0sIE5vUnBjPiwgdW5kZWZpbmVkPjtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0Q29tbWFuZHNPcHRpb248XG4gIFQgZXh0ZW5kcyBQaWNrPFRXaWRnZXQsIFwiQ29tbWFuZHNcIj4sXG4gIEMgZXh0ZW5kcyBUV2lkZ2V0W1wiQ29tbWFuZHNcIl0gPSBUW1wiQ29tbWFuZHNcIl1cbj4gPVxuICB8IHsgW0sgaW4ga2V5b2YgVFtcIkNvbW1hbmRzXCJdXTogQ1tLXVtcImhhbmRsZXJcIl0gfVxuICB8IElmPElzRW1wdHlPYmplY3Q8VFtcIkNvbW1hbmRzXCJdPiwgdW5kZWZpbmVkPjtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0T3B0aW9uczxUIGV4dGVuZHMgVFdpZGdldD4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAge1xuICAgIGlzR2VuZXJpY0NvbmZpZzogUnBjSXNHZW5lcmljQ29uZmlnT3B0aW9uPFQ+O1xuXG4gICAgcHJvcHM6IFJwY1Byb3BzT3B0aW9uPFQ+O1xuXG4gICAgY29udHJvbGxlcjogV2lkZ2V0Q29udHJvbGxlck9wdGlvbjxUPjtcblxuICAgIGNvbW1hbmRzOiBXaWRnZXRDb21tYW5kc09wdGlvbjxUPjtcblxuICAgIGNvbm5lY3Rpb246XG4gICAgICB8IHtcbiAgICAgICAgICBbSyBpbiBrZXlvZiBUW1wiQ29ubmVjdGlvblwiXV06IChcbiAgICAgICAgICAgIGNvbm5lY3Rpb246IF9XaWRnZXRDb25uZWN0aW9uPFQ+XG4gICAgICAgICAgKSA9PiBUW1wiQ29ubmVjdGlvblwiXVtLXTtcbiAgICAgICAgfVxuICAgICAgfCBJZjxJc0VtcHR5T2JqZWN0PFRbXCJDb25uZWN0aW9uXCJdPiwgdW5kZWZpbmVkPjtcbiAgfSxcbiAge1xuICAgIGhhbmRsZXI6IFdpZGdldEhhbmRsZXJDbGFzczxXaWRnZXQ8VD4+O1xuICB9XG4+O1xuXG5leHBvcnQgdHlwZSBXaWRnZXRIYW5kbGVyQ2xhc3M8XG4gIFIgZXh0ZW5kcyBBbnlXaWRnZXQsXG4gIEMgZXh0ZW5kcyBUV2lkZ2V0W1wiQ29tbWFuZHNcIl0gPSBXaWRnZXRUeXBlPFI+W1wiQ29tbWFuZHNcIl1cbj4gPSBScGNIYW5kbGVyQ2xhc3M8UiwgX1dpZGdldENvbW1hbmRIYW5kbGVyTWFwPFI+PjtcblxudHlwZSBfV2lkZ2V0Q29tbWFuZEhhbmRsZXJNYXA8XG4gIFIgZXh0ZW5kcyBCYXNlZFdpZGdldCxcbiAgQyBleHRlbmRzIFRXaWRnZXRbXCJDb21tYW5kc1wiXSA9IFdpZGdldFR5cGU8Uj5bXCJDb21tYW5kc1wiXVxuPiA9IHtcbiAgW0hLIGluIFVuaW9uPHsgW0sgaW4ga2V5b2YgQ106IENbS11bXCJoYW5kbGVyXCJdIH0+XTogVW5pb248XG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgQ106IENbS11bXCJoYW5kbGVyXCJdIGV4dGVuZHMgSEtcbiAgICAgICAgPyAoLi4uYXJnczogUGFyYW1ldGVyczxDW0tdPikgPT4gUHJvbWlzZTxSZXR1cm5UeXBlPENbS10+PlxuICAgICAgICA6IG5ldmVyO1xuICAgIH1cbiAgPjtcbn07XG5cbmV4cG9ydCB0eXBlIElXaWRnZXRIYW5kbGVyPFxuICBSIGV4dGVuZHMgQW55V2lkZ2V0LFxuICBDIGV4dGVuZHMgVFdpZGdldFtcIkNvbW1hbmRzXCJdID0gV2lkZ2V0VHlwZTxSPltcIkNvbW1hbmRzXCJdXG4+ID0gSVJwY0hhbmRsZXI8Uj4gJiBfV2lkZ2V0Q29tbWFuZEhhbmRsZXJNYXA8Uj47XG5cbmV4cG9ydCBjb25zdCBBbnlXaWRnZXRDb25uZWN0aW9uOiBfV2lkZ2V0Q29ubmVjdGlvbjxUV2lkZ2V0PiA9IHtcbiAgZ2V0IHJwYygpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9LFxuICBnZXQgcnBjQ29tbWFuZCgpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9LFxuICBnZXQgY29udHJvbGxlcigpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9LFxuICBjb21tYW5kKGtleSwgLi4uYXJncykge1xuICAgIHJldHVybiB0aGlzLnJwY0NvbW1hbmQoW2tleSwgYXJnc10pO1xuICB9LFxuICBnZXRFbGVtZW50KHN0YXRlPykge1xuICAgIHJldHVybiB0aGlzLnJwY0NvbW1hbmQoW1wiZ2V0RWxlbWVudFwiLCBzdGF0ZV0pO1xuICB9LFxufTtcblxuZXhwb3J0IHR5cGUgQW55V2lkZ2V0ID0gV2lkZ2V0PFRXaWRnZXQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gV2lkZ2V0PFIgZXh0ZW5kcyBBbnlXaWRnZXQsIFQgZXh0ZW5kcyBUV2lkZ2V0ID0gV2lkZ2V0VHlwZTxSPj4oXG4gIG9wdGlvbnM6IFdpZGdldE9wdGlvbnM8VD5cbik6IFdpZGdldDxUPiB7XG4gIGNvbnN0IHtcbiAgICBpc0dlbmVyaWNDb25maWcgPSBmYWxzZSxcbiAgICBwcm9wcyA9IHt9LFxuICAgIGhhbmRsZXIsXG4gICAgY29tbWFuZHMsXG4gICAgY29udHJvbGxlcixcbiAgICBjb25uZWN0aW9uOiBjb25uZWN0aW9uRGVzY3JpcHRvcnMsXG4gIH0gPSBvcHRpb25zIGFzIFdpZGdldE9wdGlvbnM8VFdpZGdldD47XG5cbiAgbGV0IGNvbm5lY3Rpb24gPSBPYmplY3QuY3JlYXRlKEFueVdpZGdldENvbm5lY3Rpb24pO1xuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMoY29ubmVjdGlvbkRlc2NyaXB0b3JzKSkge1xuICAgIGNvbnN0IGN1cnJlbnRLZXkgPSBcImN1cnJlbnRcIiArIGNhcGl0YWxpemUoa2V5KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29ubmVjdGlvbiwga2V5LCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIGlmICghKGN1cnJlbnRLZXkgaW4gdGhpcykpIHtcbiAgICAgICAgICB0aGlzW2N1cnJlbnRLZXldID0gdmFsdWUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNbY3VycmVudEtleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIDxhbnk+UnBjPEFueVdpZGdldD4oe1xuICAgIGhhbmRsZXIsXG4gICAgaXNHZW5lcmljQ29uZmlnLFxuICAgIHByb3BzOiBtZXJnZURlc2NyaXB0b3JzKHByb3BzIGFzIHt9LCB7XG4gICAgICB3aWRnZXQ6IHtcbiAgICAgICAgY29udHJvbGxlcjogY29udHJvbGxlciB8fCBOb1JwYyxcbiAgICAgICAgb3B0aW9uczogPFdpZGdldE9wdGlvbnM8VFdpZGdldD4+b3B0aW9ucyxcbiAgICAgICAgY29tbWFuZHM6IGNvbW1hbmRzIHx8IHt9LFxuICAgICAgICBjb25uZWN0aW9uOiBjb25uZWN0aW9uLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBjb25uZWN0KGNvbW1hbmQpIHtcbiAgICAgIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YoXG4gICAgICAgIHtcbiAgICAgICAgICBycGM6IHRoaXMsXG4gICAgICAgICAgcnBjQ29tbWFuZDogY29tbWFuZCxcbiAgICAgICAgICBjb250cm9sbGVyOiB0aGlzLndpZGdldC5jb250cm9sbGVyLmNyZWF0ZVJwY0Nvbm5lY3Rpb24ocGF5bG9hZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29tbWFuZChbXCJjb250cm9sbGVyXCIsIHBheWxvYWRdKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgdGhpcy53aWRnZXQuY29ubmVjdGlvblxuICAgICAgKTtcbiAgICB9LFxuICB9KTtcbn1cblxuLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgdHlwZSBBbnlXaWRnZXRDb25uZWN0aW9uID0gUnBjQ29ubmVjdGlvbjxBbnlXaWRnZXQ+O1xuXG5leHBvcnQgdHlwZSBCYXNlZFdpZGdldDxUIGV4dGVuZHMgVFdpZGdldCA9IFRXaWRnZXQ+ID0gQmFzZWRScGM8XG4gIFJwY1R5cGU8V2lkZ2V0PFQ+PlxuPjtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0VHlwZTxUIGV4dGVuZHMgQmFzZWRXaWRnZXQ+ID0gUnBjVHlwZTxUPltcIlRXaWRnZXRcIl07XG5leHBvcnQgdHlwZSBXaWRnZXRFbGVtZW50U3RhdGU8VCBleHRlbmRzIEJhc2VkV2lkZ2V0PiA9IFdpZGdldFR5cGU8XG4gIFRcbj5bXCJFbGVtZW50U3RhdGVcIl07XG5cbmV4cG9ydCB0eXBlIFdpZGdldEVsZW1lbnQ8VCBleHRlbmRzIEJhc2VkV2lkZ2V0PiA9IFdpZGdldFR5cGU8VD5bXCJFbGVtZW50XCJdO1xuXG5leHBvcnQgdHlwZSBXaWRnZXRDb250cm9sbGVyPFQgZXh0ZW5kcyBCYXNlZFdpZGdldD4gPSBXaWRnZXRUeXBlPFxuICBUXG4+W1wiQ29udHJvbGxlclwiXTtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0SG9vazxcbiAgUiBleHRlbmRzIEFueVdpZGdldCxcbiAgVCBleHRlbmRzIFBhcnRpYWw8VFdpZGdldD5cbj4gPSBXaWRnZXQ8RXh0cmFjdDxPdmVycmlkZTxXaWRnZXRUeXBlPFI+LCBUPiwgVFdpZGdldD4+O1xuXG5leHBvcnQgdHlwZSBJV2lkZ2V0ID0gV2lkZ2V0PFxuICBPdmVycmlkZTxcbiAgICBUV2lkZ2V0LFxuICAgIHtcbiAgICAgIENvbW1hbmRzOiB7fTtcbiAgICB9XG4gID5cbj47XG4iLCJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBGbiB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nczIvRm5cIjtcbmltcG9ydCB7IE9taXRLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzMi9PbWl0S2V5c1wiO1xuaW1wb3J0IHsgV2Vha0lkIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9XZWFrSWRcIjtcbmltcG9ydCB7IFJlYWN0Um91dGVyLCBSZWFjdFJvdXRlck9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vdHlwZXJvdXRlci9SZWFjdFJvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyLCBUUm91dGVyIH0gZnJvbSBcIi4uLy4uL3R5cGVyb3V0ZXIvUm91dGVyXCI7XG5pbXBvcnQgeyBBbnlXaWRnZXRDb25uZWN0aW9uLCBXaWRnZXRFbGVtZW50U3RhdGUgfSBmcm9tIFwiLi9XaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFZpZXdQcm9wcyB9IGZyb20gXCIuL1dpZGdldFZpZXdcIjtcbmltcG9ydCB7IFdpZGdldFZpZXdMb2FkZXIgfSBmcm9tIFwiLi9XaWRnZXRWaWV3TG9hZGVyXCI7XG5cbnR5cGUgSW5kZXhQcm9wczxUIGV4dGVuZHMgVFJvdXRlcj4gPSBQYXJhbWV0ZXJzPFxuICBOb25OdWxsYWJsZTxSZWFjdFJvdXRlck9wdGlvbnM8VD5bXCJyZW5kZXJJbmRleFwiXT5cbj5bMF07XG5cbmV4cG9ydCB0eXBlIFdpZGdldFZpZXdSb3V0ZXJPcHRpb25zPFxuICBUIGV4dGVuZHMgVFJvdXRlcixcbiAgQyBleHRlbmRzIEFueVdpZGdldENvbm5lY3Rpb25cbj4gPSBPbWl0S2V5czxSZWFjdFJvdXRlck9wdGlvbnM8VD4sIFwicmVuZGVySW5kZXhcIj4gJiB7XG4gIGdldEVsZW1lbnRTdGF0ZT86IChwcm9wczogSW5kZXhQcm9wczxUPikgPT4gV2lkZ2V0RWxlbWVudFN0YXRlPEM+O1xuICByZW5kZXJXaWRnZXQoXG4gICAgcHJvcHM6IFdpZGdldFZpZXdQcm9wczxDPixcbiAgICBpbmRleFByb3BzOiBJbmRleFByb3BzPFQ+XG4gICk6IFJlYWN0RWxlbWVudDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBXaWRnZXRSb3V0ZXJWaWV3PFxuICBUIGV4dGVuZHMgVFJvdXRlcixcbiAgQyBleHRlbmRzIEFueVdpZGdldENvbm5lY3Rpb25cbj4oXG4gIHJvdXRlcjogUm91dGVyPFQ+LFxuICBjb25uZWN0aW9uT3JHZXRDb25uZWN0aW9uOiBFeGNsdWRlPEMsIEZuPiB8ICgocGFyYW1zOiBUW1wiUGFyYW1zXCJdKSA9PiBDKSxcbiAgb3B0aW9uc09yUmVuZGVyV2lkZ2V0OlxuICAgIHwgV2lkZ2V0Vmlld1JvdXRlck9wdGlvbnM8VCwgQz5cbiAgICB8IFdpZGdldFZpZXdSb3V0ZXJPcHRpb25zPFQsIEM+W1wicmVuZGVyV2lkZ2V0XCJdXG4pIHtcbiAgY29uc3QgZ2V0Q29ubmVjdGlvbjogKHBhcmFtczogVFtcIlBhcmFtc1wiXSkgPT4gQyA9XG4gICAgdHlwZW9mIGNvbm5lY3Rpb25PckdldENvbm5lY3Rpb24gPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBjb25uZWN0aW9uT3JHZXRDb25uZWN0aW9uXG4gICAgICA6ICgpID0+IGNvbm5lY3Rpb25PckdldENvbm5lY3Rpb247XG5cbiAgY29uc3Qgb3B0aW9uczogV2lkZ2V0Vmlld1JvdXRlck9wdGlvbnM8VCwgQz4gPVxuICAgIHR5cGVvZiBvcHRpb25zT3JSZW5kZXJXaWRnZXQgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyB7IHJlbmRlcldpZGdldDogb3B0aW9uc09yUmVuZGVyV2lkZ2V0IH1cbiAgICAgIDogb3B0aW9uc09yUmVuZGVyV2lkZ2V0O1xuXG4gIGNvbnN0IHsgcmVuZGVyV2lkZ2V0LCBnZXRFbGVtZW50U3RhdGUgfSA9IG9wdGlvbnM7XG5cbiAgUmVhY3RSb3V0ZXIocm91dGVyLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICByZW5kZXJJbmRleChpbmRleFByb3BzKSB7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gZ2V0Q29ubmVjdGlvbihpbmRleFByb3BzLmxvY2F0aW9uLnBhcmFtcyksXG4gICAgICAgIFtpbmRleFByb3BzLmxvY2F0aW9uLnBhcmFtc11cbiAgICAgICk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8V2lkZ2V0Vmlld0xvYWRlclxuICAgICAgICAgIGtleT17V2Vha0lkKGluZGV4UHJvcHMubG9jYXRpb24pfVxuICAgICAgICAgIGVsZW1lbnRTdGF0ZT17aW5kZXhQcm9wcy5zdGF0ZX1cbiAgICAgICAgICBvbkVsZW1lbnRTdGF0ZUNoYW5nZT17c3RhdGUgPT4ge1xuICAgICAgICAgICAgaW5kZXhQcm9wcy5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBjb25uZWN0aW9uPXtjb25uZWN0aW9ufVxuICAgICAgICAgIGNoaWxkcmVuPXtwcm9wcyA9PiBjcmVhdGVFbGVtZW50KENvbXBvbmVudCwgeyBwcm9wcywgaW5kZXhQcm9wcyB9KX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSxcbiAgfSk7XG5cbiAgZnVuY3Rpb24gQ29tcG9uZW50KHsgcHJvcHMsIGluZGV4UHJvcHMgfSkge1xuICAgIHJldHVybiByZW5kZXJXaWRnZXQocHJvcHMsIGluZGV4UHJvcHMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi4vLi4vcmVhY3Qvdmlldy9WaWV3XCI7XG5pbXBvcnQgeyBWaWV3U3RhdGUgfSBmcm9tIFwiLi4vLi4vcmVhY3Qvdmlldy9WaWV3U3RhdGVcIjtcbmltcG9ydCB7XG4gIEFueVdpZGdldENvbm5lY3Rpb24sXG4gIFdpZGdldEVsZW1lbnQsXG4gIFdpZGdldEVsZW1lbnRTdGF0ZSxcbiAgV2lkZ2V0VHlwZSxcbn0gZnJvbSBcIi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBXaWRnZXRWaWV3UHJvcHMgfSBmcm9tIFwiLi9XaWRnZXRWaWV3XCI7XG5cbi8vIFRPRE86IE1ha2Ugc2VydmljZSBmb3IgV2lkZ2V0Vmlld0xvYWRlclxuXG5leHBvcnQgY2xhc3MgV2lkZ2V0Vmlld0xvYWRlcjxDIGV4dGVuZHMgQW55V2lkZ2V0Q29ubmVjdGlvbj4gZXh0ZW5kcyBWaWV3PFxuICB7XG4gICAgY29ubmVjdGlvbjogQztcblxuICAgIGNoaWxkcmVuKHByb3BzOiBXaWRnZXRWaWV3UHJvcHM8Qz4sIHZpZXc6IFdpZGdldFZpZXdMb2FkZXI8Qz4pOiBSZWFjdE5vZGU7XG4gIH0gJiBQaWNrPFdpZGdldFZpZXdQcm9wczxDPiwgXCJlbGVtZW50U3RhdGVcIiB8IFwib25FbGVtZW50U3RhdGVDaGFuZ2VcIj5cbj4ge1xuICBAVmlld1N0YXRlKCkgaXNMb2FkaW5nID0gZmFsc2U7XG5cbiAgQFZpZXdTdGF0ZSgpIGVsZW1lbnQ6IFdpZGdldEVsZW1lbnQ8Qz4gfCB1bmRlZmluZWQ7XG5cbiAgQFZpZXdTdGF0ZSgpIGVycm9yOiBhbnkgPSB1bmRlZmluZWQ7XG5cbiAgYXN5bmMgcmVsb2FkKCkge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5lbGVtZW50ID0gYXdhaXQgdGhpcy5wcm9wcy5jb25uZWN0aW9uLmdldEVsZW1lbnQoXG4gICAgICAgIHRoaXMucHJvcHMuZWxlbWVudFN0YXRlXG4gICAgICApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5yZWxvYWQoKS5jYXRjaChlcnJvciA9PiB7XG4gICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJWaWV3KCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgaWYgKHRoaXMuZXJyb3IpIHRocm93IHRoaXMuZXJyb3I7XG4gICAgaWYgKHRoaXMuZWxlbWVudClcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuKFxuICAgICAgICB7XG4gICAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICAgIGVsZW1lbnRTdGF0ZTogdGhpcy5wcm9wcy5lbGVtZW50U3RhdGUsXG4gICAgICAgICAgb25FbGVtZW50U3RhdGVDaGFuZ2U6IHRoaXMucHJvcHMub25FbGVtZW50U3RhdGVDaGFuZ2UsXG4gICAgICAgICAgY29ubmVjdGlvbjogdGhpcy5wcm9wcy5jb25uZWN0aW9uLFxuICAgICAgICB9LFxuICAgICAgICB0aGlzXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJZiB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvYm9vbGVhblwiO1xuaW1wb3J0IHsgSXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW4vSXNcIjtcbmltcG9ydCB7IE92ZXJyaWRlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9PdmVycmlkZVwiO1xuaW1wb3J0IHsgUGFydGlhbFVuZGVmaW5lZEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL1BhcnRpYWxVbmRlZmluZWRLZXlzXCI7XG5pbXBvcnQgeyBVbmRlZmluZWRJZkVtcHR5T2JqZWN0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9VbmRlZmluZWRJZkVtcHR5T2JqZWN0XCI7XG5pbXBvcnQgeyBVbmRlZmluZWRJZklzVW5kZWZpbmVkIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9VbmRlZmluZWRJZklzVW5kZWZpbmVkXCI7XG5pbXBvcnQgeyBEYXRhRXhwIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVkYXRhL2RhdGEtZXhwL0RhdGFFeHBcIjtcbmltcG9ydCB7IERhdGFSb3cgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZWRhdGEvRGF0YVJvd1wiO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9EYXRhU291cmNlXCI7XG5pbXBvcnQgeyBOb25SZWxhdGlvbktleXMgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZWRhdGEvRGF0YVJlbGF0aW9uXCI7XG5pbXBvcnQgeyBDb25maWdGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7IEdlbmVyaWNDb25maWcgfSBmcm9tIFwiLi4vLi4vR2VuZXJpY0NvbmZpZ1wiO1xuaW1wb3J0IHsgTm9ScGMgfSBmcm9tIFwiLi4vLi4vTm9ScGNcIjtcbmltcG9ydCB7IFJwY1BhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9ycGMtcGFyYW1ldGVyL1JwY1BhcmFtZXRlclwiO1xuaW1wb3J0IHtcbiAgQW55UnBjLFxuICBScGNDb25maWcsXG4gIFJwY0Nvbm5lY3Rpb24sXG4gIFJwY1VucmVzb2x2ZWRDb25maWcsXG59IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IFJwY0ZuIH0gZnJvbSBcIi4uLy4uL3JwYy1mbi9ScGNGblwiO1xuaW1wb3J0IHsgUnBjTWFwIH0gZnJvbSBcIi4uLy4uL3JwYy1tYXAvUnBjTWFwXCI7XG5pbXBvcnQgeyBBbnlSb3dUeXBlLCBDb2x1bW4sIFJvdyB9IGZyb20gXCIuLi9Sb3dcIjtcbmltcG9ydCB7IFdpZGdldCwgV2lkZ2V0Q29udHJvbGxlciB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IERhdGFUYWJsZUhhbmRsZXIgfSBmcm9tIFwiLi9EYXRhVGFibGVIYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIERhdGFUYWJsZVR5cGVzPFQgZXh0ZW5kcyBURGF0YVRhYmxlPiA9IF9UeXBlczxUPjtcblxudHlwZSBfQ29sdW1uVHlwZXM8XG4gIFQgZXh0ZW5kcyBURGF0YVRhYmxlICYge1xuICAgIENvbHVtbktleTogc3RyaW5nO1xuICAgIENvbHVtblR5cGU7XG4gIH0sXG4gIFVuZGVmaW5lZElmQ29sdW1uS2V5SXNEYXRhS2V5IGV4dGVuZHMgdW5kZWZpbmVkID0gSWY8XG4gICAgSXM8VFtcIkNvbHVtbktleVwiXSwga2V5b2YgUmVxdWlyZWQ8VFtcIkRhdGFcIl0+PixcbiAgICB1bmRlZmluZWRcbiAgPlxuPiA9IHtcbiAgQ29sdW1uTG9hZGVyOiAoKHJvdzogRGF0YVJvdzxUW1wiRGF0YVwiXT4pID0+IGFueSkgfCBOb25SZWxhdGlvbktleXM8VFtcIkRhdGFcIl0+O1xuXG4gIENvbHVtbkNvbmZpZzpcbiAgICB8IF9Db2x1bW5UeXBlczxUPltcIkNvbHVtbkxvYWRlclwiXVxuICAgIHwgUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gICAgICAgIHtcbiAgICAgICAgICBsb2FkOiBfQ29sdW1uVHlwZXM8VD5bXCJDb2x1bW5Mb2FkZXJcIl0gfCBVbmRlZmluZWRJZkNvbHVtbktleUlzRGF0YUtleTtcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpZWxkPzogRGF0YUV4cDxUW1wiRGF0YVwiXT47XG4gICAgICAgIH1cbiAgICAgID5cbiAgICB8IFVuZGVmaW5lZElmQ29sdW1uS2V5SXNEYXRhS2V5O1xufTtcblxuZXhwb3J0IHR5cGUgX1R5cGVzPFQgZXh0ZW5kcyBURGF0YVRhYmxlLCBEID0gVFtcIkRhdGFcIl0sIFJvdyA9IFRbXCJSb3dcIl0+ID0gVCAmIHtcbiAgUm93V2l0aEtleTogUm93ICYgeyAka2V5OiBzdHJpbmcgfTtcblxuICBRdWVyeToge1xuICAgIGdldENvdW50PzogYm9vbGVhbjtcbiAgICBvcmRlcj86IFJlY29yZDxcbiAgICAgIGtleW9mIFJvdyxcbiAgICAgIHsgc29ydD86IFwiQVNDXCIgfCBcIkRFU0NcIjsgbnVsbHM/OiBcIkZJUlNUXCIgfCBcIkxBU1RcIiB9IHwgXCJBU0NcIiB8IFwiREVTQ1wiXG4gICAgPjtcbiAgICB0ZXh0Pzogc3RyaW5nO1xuICAgIHBhZ2VTaXplPzogbnVtYmVyO1xuICAgIHBhZ2VJbmRleD86IG51bWJlcjtcbiAgfTtcblxuICBRdWVyeVJlc3VsdDogeyB0b3RhbFJvd3M6IG51bWJlcjsgcm93czogKHsgJGtleTogc3RyaW5nIH0gJiBSb3cpW10gfTtcblxuICBDb2x1bW5Db25maWdNYXA6IFVuZGVmaW5lZElmRW1wdHlPYmplY3Q8XG4gICAgUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gICAgICB7XG4gICAgICAgIFtLIGluIHN0cmluZyAmIGtleW9mIFJvd106IF9Db2x1bW5UeXBlczxcbiAgICAgICAgICBUICYge1xuICAgICAgICAgICAgQ29sdW1uS2V5OiBLO1xuICAgICAgICAgICAgQ29sdW1uVHlwZTogUm93W0tdO1xuICAgICAgICAgIH1cbiAgICAgICAgPltcIkNvbHVtbkNvbmZpZ1wiXTtcbiAgICAgIH1cbiAgICA+XG4gID47XG5cbiAgT3B0aW9uYWxDb25maWc6IHtcbiAgICBnZXRSb3dDb250cm9sbGVyQ29uZmlnOlxuICAgICAgfCBDb25maWdGYWN0b3J5PFxuICAgICAgICAgIFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIlJvd0NvbnRyb2xsZXJcIl0+LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiBzdHJpbmc7XG4gICAgICAgICAgICAgIHNvdXJjZTogRGF0YVNvdXJjZTxEPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgID5cbiAgICAgIHwgVW5kZWZpbmVkSWZJc1VuZGVmaW5lZDxScGNDb25maWc8VFtcIlJvd0NvbnRyb2xsZXJcIl0+PjtcblxuICAgIGNvbHVtbnM6IF9UeXBlczxUPltcIkNvbHVtbkNvbmZpZ01hcFwiXTtcbiAgfTtcblxuICBSZXF1aXJlZENvbmZpZzoge1xuICAgIHNvdXJjZTogRGF0YVNvdXJjZTxEPjtcbiAgICBwYWdlU2l6ZT86IG51bWJlcjtcbiAgICBzZWFyY2hJbj86IERhdGFFeHA8RD5bXTtcbiAgICBtYXhSb3dzPzogbnVtYmVyO1xuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgRGF0YVRhYmxlQ29uZmlnPFQgZXh0ZW5kcyBURGF0YVRhYmxlPiA9IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICBfVHlwZXM8VD5bXCJPcHRpb25hbENvbmZpZ1wiXSxcbiAgX1R5cGVzPFQ+W1wiUmVxdWlyZWRDb25maWdcIl1cbj47XG5cbmV4cG9ydCB0eXBlIEFueURhdGFUYWJsZSA9IERhdGFUYWJsZTxURGF0YVRhYmxlPjtcblxuZXhwb3J0IHR5cGUgVERhdGFUYWJsZSA9IHtcbiAgUm93OiBhbnk7XG4gIFJvd0NvbnRyb2xsZXI6IEFueVJwYztcbiAgRGF0YTogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgRGF0YVRhYmxlPFxuICBUIGV4dGVuZHMgVERhdGFUYWJsZSxcbiAgUm93ID0gVFtcIlJvd1wiXSxcbiAgUm93Q29udHJvbGxlciBleHRlbmRzIEFueVJwYyA9IFRbXCJSb3dDb250cm9sbGVyXCJdLFxuICBEID0gVFtcIkRhdGFcIl0sXG4gIEdldFJvd3NGbiA9IChxdWVyeTogX1R5cGVzPFQ+W1wiUXVlcnlcIl0pID0+IFByb21pc2U8X1R5cGVzPFQ+W1wiUXVlcnlSZXN1bHRcIl0+XG4+ID0gV2lkZ2V0PHtcbiAgVHlwZXM6IF9UeXBlczxUPjtcblxuICBDb25maWc6IEdlbmVyaWNDb25maWc8XG4gICAgPEQ+KGNvbmZpZzogRGF0YVRhYmxlQ29uZmlnPE92ZXJyaWRlPFQsIHsgRGF0YTogRCB9Pj4pID0+IERhdGFUYWJsZUNvbmZpZzxUPlxuICA+O1xuXG4gIENvbW1hbmRzOiB7fTtcblxuICBDb25uZWN0aW9uOiB7XG4gICAgZ2V0Um93czogR2V0Um93c0ZuO1xuICAgIGdldFJvd0NvbnRyb2xsZXIoa2V5OiBzdHJpbmcpOiBScGNDb25uZWN0aW9uPFJvd0NvbnRyb2xsZXI+O1xuICB9O1xuXG4gIEVsZW1lbnRTdGF0ZToge1xuICAgIHF1ZXJ5OiBfVHlwZXM8VD5bXCJRdWVyeVwiXTtcbiAgfTtcbiAgRWxlbWVudDoge1xuICAgIC8vIFRPRE86IG1vdmUgdG8gUHJvcHNcbiAgICBzZWFyY2hhYmxlOiBib29sZWFuO1xuICAgIGNvbHVtbnM6IHtcbiAgICAgIFtLIGluIGtleW9mIFJlcXVpcmVkPFJvdz5dOiB7XG4gICAgICAgIHNvcnRhYmxlOiBib29sZWFuO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHRvdGFsUm93czogbnVtYmVyO1xuICAgIHJvd3M6IF9UeXBlczxUPltcIlJvd1dpdGhLZXlcIl1bXTtcbiAgICBwYWdlU2l6ZT86IG51bWJlcjtcbiAgfTtcblxuICBQcm9wczoge1xuICAgIHJvd1R5cGU6IHsgW0sgaW4ga2V5b2YgUm93XTogKHZhbHVlOiBhbnkpID0+IFJvd1tLXSB9O1xuICB9O1xuXG4gIEhhbmRsZXI6IHtcbiAgICBnZXRSb3dzOiBHZXRSb3dzRm47XG5cbiAgICBsb2FkUm93KGRhdGFSb3c6IGFueSk6IFByb21pc2U8eyAka2V5OiBzdHJpbmcgfSAmIFJvdz47XG4gICAgbG9hZFJvdyhkYXRhUm93OiBhbnksIG5vS2V5OiB0cnVlKTogUHJvbWlzZTxSb3c+O1xuXG4gICAgY29sdW1uczogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAge1xuICAgICAgICBsb2FkOiAocm93OiBEYXRhUm93PEQ+KSA9PiBhbnk7XG4gICAgICAgIGZpZWxkPzogRGF0YUV4cDxEPjtcbiAgICAgIH1cbiAgICA+O1xuICB9O1xuICBDb250cm9sbGVyOiBScGNNYXA8e1xuICAgIGdldFJvd0NvbnRyb2xsZXI6IFJwY1BhcmFtZXRlcjx7XG4gICAgICBUYXJnZXQ6IFJvd0NvbnRyb2xsZXI7XG4gICAgICBEYXRhOiBzdHJpbmc7XG4gICAgICBWYWx1ZTogc3RyaW5nO1xuICAgIH0+O1xuICAgIGdldFJvd3M6IFJwY0ZuPChxdWVyeTogX1R5cGVzPFQ+W1wiUXVlcnlcIl0pID0+IF9UeXBlczxUPltcIlF1ZXJ5UmVzdWx0XCJdPjtcbiAgfT47XG59PjtcblxuZXhwb3J0IHR5cGUgRGF0YVRhYmxlT3B0aW9uczxSb3dDb250cm9sbGVyIGV4dGVuZHMgQW55UnBjPiA9IHtcbiAgcm93Q29udHJvbGxlcj86IFJvd0NvbnRyb2xsZXI7XG5cbiAgcGFnZVNpemU/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gRGF0YVRhYmxlPFxuICBSb3dUeXBlIGV4dGVuZHMgQW55Um93VHlwZSxcbiAgUm93Q29udHJvbGxlciBleHRlbmRzIEFueVJwYyA9IE5vUnBjXG4+KFxuICByb3dUeXBlOiBSb3dUeXBlLFxuICBvcHRpb25zOiBEYXRhVGFibGVPcHRpb25zPFJvd0NvbnRyb2xsZXI+ID0ge31cbik6IERhdGFUYWJsZTx7XG4gIFJvd0NvbnRyb2xsZXI6IFJvd0NvbnRyb2xsZXI7XG4gIFJvdzogUm93PFJvd1R5cGU+O1xuICBEYXRhOiBhbnk7XG59PiB7XG4gIHJldHVybiA8YW55PldpZGdldDxBbnlEYXRhVGFibGU+KHtcbiAgICBpc0dlbmVyaWNDb25maWc6IHRydWUsXG4gICAgY29ubmVjdGlvbjoge1xuICAgICAgZ2V0Um93czogY29ubiA9PiBxdWVyeSA9PiBjb25uLmNvbnRyb2xsZXIuZ2V0Um93cyhxdWVyeSksXG4gICAgICBnZXRSb3dDb250cm9sbGVyOiBjb25uID0+IGtleSA9PiBjb25uLmNvbnRyb2xsZXIuZ2V0Um93Q29udHJvbGxlcihrZXkpLFxuICAgIH0sXG4gICAgcHJvcHM6IHsgcm93VHlwZSB9LFxuICAgIGNvbnRyb2xsZXI6IFJwY01hcCh7XG4gICAgICBnZXRSb3dDb250cm9sbGVyOiBScGNQYXJhbWV0ZXIoU3RyaW5nLCBvcHRpb25zLnJvd0NvbnRyb2xsZXIgfHwgTm9ScGMpLFxuICAgICAgZ2V0Um93czogUnBjRm48YW55PigpLFxuICAgIH0pIGFzIFdpZGdldENvbnRyb2xsZXI8QW55RGF0YVRhYmxlPixcbiAgICBoYW5kbGVyOiBEYXRhVGFibGVIYW5kbGVyLFxuICB9KTtcbn1cbiIsImltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL1JlcXVpcmVPcHRpb25hbEtleXNcIjtcbmltcG9ydCB7IGluc3BlY3QgfSBmcm9tIFwiLi4vLi4vLi4vbG9nZ2luZy9pbnNwZWN0XCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldEhhbmRsZXIgfSBmcm9tIFwiLi4vQWJzdHJhY3RXaWRnZXRIYW5kbGVyXCI7XG5pbXBvcnQgeyBlbnRyaWVzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvZW50cmllc1wiO1xuaW1wb3J0IHsgbWFwT2JqZWN0LCBtYXBPYmplY3RBc3luYyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L21hcE9iamVjdFwiO1xuaW1wb3J0IHsgTGF6eSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGF0dGVybnMvbGF6eVwiO1xuaW1wb3J0IHsgRGF0YUV4cCB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9kYXRhLWV4cC9EYXRhRXhwXCI7XG5pbXBvcnQgeyBEYXRhT3JkZXIgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZWRhdGEvRGF0YU9yZGVyXCI7XG5pbXBvcnQgeyBEYXRhUm93IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVkYXRhL0RhdGFSb3dcIjtcbmltcG9ydCB7IENvbmZpZ0ZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vQ29uZmlnRmFjdG9yeVwiO1xuaW1wb3J0IHsgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7XG4gIElXaWRnZXRIYW5kbGVyLFxuICBXaWRnZXRDb250cm9sbGVyLFxuICBXaWRnZXRFbGVtZW50LFxuICBXaWRnZXRFbGVtZW50U3RhdGUsXG59IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IEFueURhdGFUYWJsZSwgRGF0YVRhYmxlVHlwZXMsIFREYXRhVGFibGUgfSBmcm9tIFwiLi9EYXRhVGFibGVcIjtcblxudHlwZSBSID0gQW55RGF0YVRhYmxlO1xuXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlSGFuZGxlclxuICBleHRlbmRzIEFic3RyYWN0V2lkZ2V0SGFuZGxlcjxSPlxuICBpbXBsZW1lbnRzIElXaWRnZXRIYW5kbGVyPFI+IHtcbiAgQExhenkoKSBnZXQgY29sdW1ucygpIHtcbiAgICByZXR1cm4gbWFwT2JqZWN0KHRoaXMucnBjLnJvd1R5cGUsIChjb2x1bW5UeXBlLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IGNvbHVtbkNvbmZpZyA9IHRoaXMuY29uZmlnLmNvbHVtbnM/LltrZXldO1xuICAgICAgbGV0IGxvYWQsIGZpZWxkO1xuXG4gICAgICBzd2l0Y2ggKHR5cGVvZiBjb2x1bW5Db25maWcpIHtcbiAgICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgICAgbG9hZCA9IGNvbHVtbkNvbmZpZztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIGZpZWxkID0gY29sdW1uQ29uZmlnO1xuICAgICAgICAgIGxvYWQgPSBkYXRhUm93ID0+IGRhdGFSb3dbZmllbGRdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgKHsgbG9hZCwgZmllbGQgfSA9IGNvbHVtbkNvbmZpZyB8fCAoe30gYXMgYW55KSk7XG4gICAgICAgICAgaWYgKCFsb2FkKSB7XG4gICAgICAgICAgICBsb2FkID0gZGF0YVJvdyA9PiBkYXRhUm93W2tleV07XG4gICAgICAgICAgICBmaWVsZCA9IGtleTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgICByZXR1cm4geyBmaWVsZDoga2V5LCBsb2FkOiBkYXRhUm93ID0+IGRhdGFSb3dba2V5XSB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVuZXhwZWN0ZWQgJHtpbnNwZWN0KHsgY29sdW1uQ29uZmlnIH0pfWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBsb2FkLFxuICAgICAgICBmaWVsZCxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBsb2FkUm93KGRhdGFSb3csIG5vS2V5PzogYm9vbGVhbikge1xuICAgIGNvbnN0IHJvdzogYW55ID0gYXdhaXQgbWFwT2JqZWN0QXN5bmModGhpcy5jb2x1bW5zLCBjb2x1bW4gPT5cbiAgICAgIGNvbHVtbi5sb2FkKGRhdGFSb3cpXG4gICAgKTtcbiAgICBpZiAoIW5vS2V5KSB7XG4gICAgICByb3cuJGtleSA9IGRhdGFSb3cuJGtleTtcbiAgICB9XG4gICAgcmV0dXJuIHJvdztcbiAgfVxuXG4gIGFzeW5jIGdldFJvd3MoXG4gICAgcXVlcnk6IERhdGFUYWJsZVR5cGVzPFREYXRhVGFibGU+W1wiUXVlcnlcIl1cbiAgKTogUHJvbWlzZTxEYXRhVGFibGVUeXBlczxURGF0YVRhYmxlPltcIlF1ZXJ5UmVzdWx0XCJdPiB7XG4gICAgY29uc3Qgb3JkZXJzOiBEYXRhT3JkZXI8YW55PltdID0gW107XG4gICAgZm9yIChjb25zdCBba2V5LCBvcmRlcl0gb2YgZW50cmllcyhxdWVyeS5vcmRlcikpIHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuY29sdW1uc1trZXldO1xuICAgICAgaWYgKGNvbHVtbi5maWVsZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG9yZGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIG9yZGVycy5wdXNoKHtcbiAgICAgICAgICBieTogY29sdW1uLmZpZWxkLFxuICAgICAgICAgIHNvcnQ6IG9yZGVyLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9yZGVycy5wdXNoKHtcbiAgICAgICAgICBieTogY29sdW1uLmZpZWxkLFxuICAgICAgICAgIHNvcnQ6IG9yZGVyLnNvcnQgPz8gXCJBU0NcIixcbiAgICAgICAgICBudWxsczogb3JkZXIubnVsbHMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG1heFJvd3MgPSB0aGlzLmNvbmZpZy5tYXhSb3dzID8/IDEwO1xuICAgIGNvbnN0IGZpbHRlcnM6IERhdGFFeHA8YW55PiA9IFtdO1xuXG4gICAgaWYgKHF1ZXJ5LnRleHQpIHtcbiAgICAgIGNvbnN0IHNlYXJjaEZpbHRlcnMgPSB0aGlzLmNvbmZpZy5zZWFyY2hJbj8ubWFwKGZpZWxkID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAkc2VhcmNoOiB7XG4gICAgICAgICAgICBpbjogZmllbGQsXG4gICAgICAgICAgICB0ZXh0OiBxdWVyeS50ZXh0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIGlmIChzZWFyY2hGaWx0ZXJzPy5sZW5ndGgpIHtcbiAgICAgICAgZmlsdGVycy5wdXNoKHsgJG9yOiBzZWFyY2hGaWx0ZXJzIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwYWdlU2l6ZSA9IE1hdGgubWF4KDEsIE1hdGgubWluKHF1ZXJ5LnBhZ2VTaXplID8/IG1heFJvd3MsIG1heFJvd3MpKTtcbiAgICBsZXQgc291cmNlID0gdGhpcy5jb25maWcuc291cmNlXG4gICAgICAuc29ydChvcmRlcnMpXG4gICAgICAudGFrZShwYWdlU2l6ZSlcbiAgICAgIC5za2lwKHBhZ2VTaXplICogKHF1ZXJ5LnBhZ2VJbmRleCB8fCAwKSlcbiAgICAgIC5maWx0ZXIoeyAkYW5kOiBmaWx0ZXJzIH0pO1xuXG4gICAgbGV0IHRvdGFsUm93czogbnVtYmVyO1xuICAgIGxldCBkYXRhUm93czogRGF0YVJvdzxhbnk+W107XG5cbiAgICBpZiAocXVlcnkuZ2V0Q291bnQpIHtcbiAgICAgIFt0b3RhbFJvd3MsIGRhdGFSb3dzXSA9IGF3YWl0IHNvdXJjZS5nZXRDb3VudEFuZFJvd3MoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgW3RvdGFsUm93cywgZGF0YVJvd3NdID0gWzAsIGF3YWl0IHNvdXJjZS5nZXRSb3dzKCldO1xuICAgIH1cbiAgICBjb25zdCByb3dzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgZGF0YVJvdyBvZiBkYXRhUm93cykge1xuICAgICAgcm93cy5wdXNoKGF3YWl0IHRoaXMubG9hZFJvdyhkYXRhUm93KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgcm93cywgdG90YWxSb3dzIH07XG4gIH1cblxuICBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxSPj4ge1xuICAgIHJldHVybiB7XG4gICAgICBnZXRSb3dDb250cm9sbGVyOiBhc3luYyAoJCwga2V5KSA9PlxuICAgICAgICAkKFxuICAgICAgICAgIGF3YWl0IENvbmZpZ0ZhY3RvcnkodGhpcy5jb25maWcuZ2V0Um93Q29udHJvbGxlckNvbmZpZywge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLmNvbmZpZy5zb3VyY2UsXG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgIGdldFJvd3M6IHF1ZXJ5ID0+IHRoaXMuZ2V0Um93cyhxdWVyeSksXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldEVsZW1lbnQoXG4gICAgc3RhdGU6IFdpZGdldEVsZW1lbnRTdGF0ZTxSPiB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPFJlcXVpcmVPcHRpb25hbEtleXM8V2lkZ2V0RWxlbWVudDxSPj4+IHtcbiAgICBjb25zdCB7IHJvd3MsIHRvdGFsUm93cyB9ID0gYXdhaXQgdGhpcy5nZXRSb3dzKHtcbiAgICAgIGdldENvdW50OiB0cnVlLFxuICAgICAgdGV4dDogXCJcIixcbiAgICAgIHBhZ2VTaXplOiB0aGlzLmNvbmZpZy5wYWdlU2l6ZSB8fCAxMCxcbiAgICAgIHBhZ2VJbmRleDogMCxcbiAgICAgIG9yZGVyOiB7fSxcbiAgICAgIC4uLnN0YXRlPy5xdWVyeSxcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgcm93cyxcbiAgICAgIHRvdGFsUm93cyxcbiAgICAgIHBhZ2VTaXplOiB0aGlzLmNvbmZpZy5wYWdlU2l6ZSxcbiAgICAgIHNlYXJjaGFibGU6ICEhdGhpcy5jb25maWcuc2VhcmNoSW4/Lmxlbmd0aCxcbiAgICAgIGNvbHVtbnM6IG1hcE9iamVjdCh0aGlzLmNvbHVtbnMsIGNvbHVtbiA9PiAoe1xuICAgICAgICBzb3J0YWJsZTogY29sdW1uLmZpZWxkICE9PSB1bmRlZmluZWQsXG4gICAgICB9KSksXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBtYXBBbmRGaWx0ZXJPYmplY3QgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9tYXBBbmRGaWx0ZXJPYmplY3RcIjtcbmltcG9ydCB7IHBpY2sgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9waWNrXCI7XG5pbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC9tYW5pcHVsYXRlXCI7XG5pbXBvcnQgeyBEZWJvdW5jZSB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9ob29rcy91c2VEZWJvdW5jZVwiO1xuaW1wb3J0IHsgVmlld1N0YXRlIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3ZpZXcvVmlld1N0YXRlXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXRWaWV3IH0gZnJvbSBcIi4uL0Fic3RyYWN0V2lkZ2V0Vmlld1wiO1xuaW1wb3J0IHsgQW55RGF0YVRhYmxlLCBEYXRhVGFibGVUeXBlcyB9IGZyb20gXCIuL0RhdGFUYWJsZVwiO1xuaW1wb3J0IHsgV2lkZ2V0RWxlbWVudCwgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFZpZXdQcm9wcyB9IGZyb20gXCIuLi9XaWRnZXRWaWV3XCI7XG5cbmV4cG9ydCB0eXBlIERhdGFUYWJsZVZpZXdQcm9wczxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55RGF0YVRhYmxlPlxuPiA9IFdpZGdldFZpZXdQcm9wczxDPjtcblxuZXhwb3J0IHR5cGUgRGF0YVRhYmxlVmlld1N0YXRlID0ge1xuICBzZWFyY2hUZXh0Pzogc3RyaW5nO1xuICBwYWdlU2l6ZT86IG51bWJlcjtcbiAgcGFnZUluZGV4PzogbnVtYmVyO1xufTtcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVWaWV3PFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlEYXRhVGFibGU+XG4+IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRWaWV3PFxuICBDLFxuICBEYXRhVGFibGVWaWV3UHJvcHM8Qz4gJiB7XG4gICAgY2hpbGRyZW4odmlldzogRGF0YVRhYmxlVmlldzxDPik6IFJlYWN0RWxlbWVudDtcbiAgfVxuPiB7XG4gIHByb3RlY3RlZCByZWxvYWREZWJvdW5jZSA9IERlYm91bmNlKCk7XG5cbiAgQFZpZXdTdGF0ZShcInJlbG9hZFdpdGhEZWJvdW5jZVwiKSBzZWFyY2hUZXh0OiBzdHJpbmcgPVxuICAgIHRoaXMuZWxlbWVudFN0YXRlPy5xdWVyeS50ZXh0IHx8IFwiXCI7XG4gIEBWaWV3U3RhdGUoXCJyZWxvYWRcIikgcGFnZVNpemU7XG4gIEBWaWV3U3RhdGUoXCJyZWxvYWRcIikgcGFnZUluZGV4ID0gdGhpcy5lbGVtZW50U3RhdGU/LnF1ZXJ5LnBhZ2VJbmRleCB8fCAwO1xuXG4gIEBWaWV3U3RhdGUoKSB0b3RhbFJvd3M6IG51bWJlcjtcbiAgQFZpZXdTdGF0ZSgpIHJvd3M6IFdpZGdldFR5cGU8Qz5bXCJUeXBlc1wiXVtcIlJvd1dpdGhLZXlcIl1bXTtcbiAgQFZpZXdTdGF0ZSgpIGlzTG9hZGluZyA9IGZhbHNlO1xuXG4gIC8vIGxvY2F0aW9uU3RhdGVLZXk9XCJcIlxuICAvLyBAVmlld0hvb2soKCk9PiB1c2VMb2NhdGlvblN0YXRlKCkpIGxvY2F0aW9uU3RhdGU6IExvY2F0aW9uU3RhdGU7XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUVsZW1lbnQoZWxlbWVudDogV2lkZ2V0RWxlbWVudDxDPikge1xuICAgIHRoaXMucm93cyA9IGVsZW1lbnQucm93cyB8fCBbXTtcbiAgICB0aGlzLnRvdGFsUm93cyA9IGVsZW1lbnQudG90YWxSb3dzID8/IDA7XG4gICAgdGhpcy5wYWdlU2l6ZSA9XG4gICAgICB0aGlzLmVsZW1lbnRTdGF0ZT8ucXVlcnk/LnBhZ2VTaXplIHx8IGVsZW1lbnQucGFnZVNpemUgfHwgMTA7XG4gIH1cblxuICBAVmlld1N0YXRlKCkgY29sdW1uczogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICB7XG4gICAgICBzb3J0PzogXCJBU0NcIiB8IFwiREVTQ1wiO1xuICAgICAgbnVsbHM/OiBcIkZJUlNUXCIgfCBcIkxBU1RcIjtcbiAgICB9XG4gID4gPSB7fTtcblxuICBnZXQgbGFzdFBhZ2UoKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnRvdGFsUm93cyAvIHRoaXMucGFnZVNpemUpO1xuICB9XG5cbiAgc2V0UGFnZUluZGV4KHBhZ2VJbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5wYWdlSW5kZXggPSBNYXRoLm1pbih0aGlzLmxhc3RQYWdlIC0gMSwgcGFnZUluZGV4KTtcbiAgfVxuXG4gIHNldFJlbGF0aXZlUGFnZShjb3VudDogbnVtYmVyKSB7XG4gICAgdGhpcy5zZXRQYWdlSW5kZXgodGhpcy5wYWdlSW5kZXggKyBjb3VudCk7XG4gIH1cblxuICBzZXRQYWdlU2l6ZShwYWdlU2l6ZTogbnVtYmVyKSB7XG4gICAgcGFnZVNpemUgPSB0aGlzLnBhZ2VTaXplID0gMSA+IHBhZ2VTaXplID8gMSA6IHBhZ2VTaXplO1xuICB9XG5cbiAgYXN5bmMgc2VhcmNoKHRleHQ6IHN0cmluZykge1xuICAgIHRoaXMuc2VhcmNoVGV4dCA9IHRleHQ7XG4gICAgdGhpcy5wYWdlSW5kZXggPSAwO1xuICB9XG5cbiAgY2xlYXJTZWFyY2goKSB7XG4gICAgdGhpcy5zZWFyY2hUZXh0ID0gXCJcIjtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdG9nZ2xlU29ydE9yTnVsbHM8SyBleHRlbmRzIFwic29ydFwiIHwgXCJudWxsc1wiPihcbiAgICBrZXk6IHN0cmluZyxcbiAgICBwOiBLLFxuICAgIHYxOiB7IHNvcnQ6IFwiQVNDXCIgfCBcIkRFU0NcIjsgbnVsbHM6IFwiRklSU1RcIiB8IFwiTEFTVFwiIH1bS10sXG4gICAgdjI6IHsgc29ydDogXCJBU0NcIiB8IFwiREVTQ1wiOyBudWxsczogXCJGSVJTVFwiIHwgXCJMQVNUXCIgfVtLXVxuICApIHtcbiAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmNvbHVtbnNba2V5XTtcbiAgICBsZXQgdmFsdWU6IHR5cGVvZiBjb2x1bW5bdHlwZW9mIHBdID0gY29sdW1uW3BdO1xuXG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSB2MTpcbiAgICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB2MjpcbiAgICAgICAgdmFsdWUgPSB2MTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgdmFsdWUgPSB2MjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY29sdW1ucyA9IHtcbiAgICAgIC4uLnRoaXMuY29sdW1ucyxcbiAgICAgIFtrZXldOiB7IC4uLmNvbHVtbiwgW3BdOiB2YWx1ZSB9LFxuICAgIH07XG4gIH1cblxuICB0b2dnbGVOdWxscyhrZXk6IHN0cmluZykge1xuICAgIHRoaXMuX3RvZ2dsZVNvcnRPck51bGxzKGtleSwgXCJzb3J0XCIsIFwiQVNDXCIsIFwiREVTQ1wiKTtcbiAgfVxuXG4gIHRvZ2dsZVNvcnQoa2V5OiBzdHJpbmcpIHtcbiAgICB0aGlzLl90b2dnbGVTb3J0T3JOdWxscyhrZXksIFwibnVsbHNcIiwgXCJGSVJTVFwiLCBcIkxBU1RcIik7XG4gIH1cblxuICBhc3luYyByZWxvYWRXaXRoRGVib3VuY2UoKSB7XG4gICAgaWYgKCF0aGlzLmlzRGlkTW91bnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIGlmIChhd2FpdCB0aGlzLnJlbG9hZERlYm91bmNlLndhaXQoKSkgcmV0dXJuO1xuICAgIGF3YWl0IHRoaXMucmVsb2FkKCk7XG4gIH1cblxuICBhc3luYyByZWxvYWRBZnRlclJlbW92ZShrZXk6IHN0cmluZykge1xuICAgIC8vIFRPRE9cbiAgICByZXR1cm4gdGhpcy5yZWxvYWQoKTtcbiAgfVxuXG4gIGFzeW5jIHJlbG9hZCgpIHtcbiAgICBpZiAodGhpcy5pc0xvYWRpbmcpIHJldHVybjtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgY29uc3QgZ2V0Q291bnQgPSB0aGlzLnRvdGFsUm93cyA9PT0gMCB8fCB0aGlzLnBhZ2VJbmRleCA9PT0gMDtcbiAgICBjb25zdCB7IHRvdGFsUm93cywgcm93cyB9ID0gYXdhaXQgdGhpcy5wcm9wcy5jb25uZWN0aW9uLmNvbnRyb2xsZXIuZ2V0Um93cyh7XG4gICAgICBnZXRDb3VudCxcbiAgICAgIG9yZGVyOiBtYXBBbmRGaWx0ZXJPYmplY3QodGhpcy5jb2x1bW5zLCBjb2x1bW4gPT4ge1xuICAgICAgICBjb25zdCB7IG51bGxzLCBzb3J0IH0gPSBjb2x1bW47XG4gICAgICAgIGlmIChudWxscyB8fCBzb3J0KSB7XG4gICAgICAgICAgcmV0dXJuIHsgbnVsbHMsIHNvcnQgfTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICB0ZXh0OiB0aGlzLnNlYXJjaFRleHQsXG4gICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgIHBhZ2VJbmRleDogdGhpcy5wYWdlSW5kZXgsXG4gICAgfSk7XG5cbiAgICBpZiAoZ2V0Q291bnQpIHtcbiAgICAgIHRoaXMudG90YWxSb3dzID0gdG90YWxSb3dzO1xuICAgIH1cbiAgICB0aGlzLnJvd3MgPSByb3dzO1xuICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICByZW5kZXJWaWV3KCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW4hKHRoaXMpO1xuICB9XG59XG4iLCIvKlxuXG5UT0RPOlxuICBvblN1Ym1pdCh2YWx1ZSwge3Jlc29sdmUsIHJlamVjdH0pIHtcbiAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICB9XG5cbiAqL1xuaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9Bc3luY1wiO1xuaW1wb3J0IHsgSWYgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW5cIjtcbmltcG9ydCB7IElzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9ib29sZWFuL0lzXCI7XG5pbXBvcnQgeyBQYXJ0aWFsVW5kZWZpbmVkS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nczIvUGFydGlhbFVuZGVmaW5lZEtleXNcIjtcbmltcG9ydCB7IFVuZGVmaW5lZElmSXNVbmRlZmluZWQgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL1VuZGVmaW5lZElmSXNVbmRlZmluZWRcIjtcbmltcG9ydCB7XG4gIEFueUlucHV0LFxuICBJbnB1dEVycm9yLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlQ29uZmlnLFxuICBJbnB1dFZhbHVlRGF0YSxcbn0gZnJvbSBcIi4uLy4uL2lucHV0L0lucHV0XCI7XG5pbXBvcnQgeyBWYWx1ZU9yQXdhaXRhYmxlRm4gfSBmcm9tIFwiLi4vLi4vaW5wdXQvVmFsdWVPckF3YWl0YWJsZUZuXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uLCBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHtcbiAgQmFzZWRXaWRnZXQsXG4gIFdpZGdldCxcbiAgV2lkZ2V0RWxlbWVudCxcbiAgV2lkZ2V0RWxlbWVudFN0YXRlLFxuICBXaWRnZXRUeXBlLFxufSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBGb3JtSGFuZGxlciB9IGZyb20gXCIuL0Zvcm1IYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIFRGb3JtID0ge1xuICBJbnB1dDogQW55SW5wdXQ7XG4gIEVycm9yOiBhbnk7XG4gIFZhbHVlOiBhbnk7XG59O1xuZXhwb3J0IHR5cGUgQW55Rm9ybSA9IEZvcm08VEZvcm0+O1xuXG5leHBvcnQgdHlwZSBCYXNlZEZvcm0gPSBCYXNlZFdpZGdldDxXaWRnZXRUeXBlPEFueUZvcm0+PjtcblxuZXhwb3J0IHR5cGUgRm9ybVR5cGU8VCBleHRlbmRzIEJhc2VkRm9ybT4gPSBXaWRnZXRUeXBlPFQ+W1wiVEZvcm1cIl07XG5cbmV4cG9ydCB0eXBlIEZvcm08XG4gIFQgZXh0ZW5kcyBURm9ybSxcbiAgVmFsdWUgPSBUW1wiVmFsdWVcIl0sXG4gIEVycm9yID0gVFtcIkVycm9yXCJdLFxuICBJbnB1dCBleHRlbmRzIEFueUlucHV0ID0gVFtcIklucHV0XCJdLFxuICBSZXN1bHQgPVxuICAgIHwgeyB2YWx1ZTogVmFsdWUgfVxuICAgIHwgeyBlcnJvcjogRXJyb3IgfVxuICAgIHwgeyBpbnB1dEVycm9yOiBJbnB1dEVycm9yPElucHV0PiB9XG4+ID0gV2lkZ2V0PHtcbiAgVEZvcm06IFQ7XG5cbiAgQ29ubmVjdGlvbjoge1xuICAgIGlucHV0OiBScGNDb25uZWN0aW9uPElucHV0PjtcbiAgfTtcblxuICBDb21tYW5kczoge1xuICAgIHN1Ym1pdDoge1xuICAgICAgKGRhdGE6IElucHV0VmFsdWVEYXRhPElucHV0Pik6IFJlc3VsdDtcbiAgICAgIGhhbmRsZXI6IFwiaGFuZGxlU3VibWl0XCI7XG4gICAgfTtcbiAgfTtcblxuICBDb25maWc6IHtcbiAgICBpbnB1dENvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxJbnB1dD47XG4gICAgdmFsdWVDb25maWc/OiBWYWx1ZU9yQXdhaXRhYmxlRm48SW5wdXRWYWx1ZUNvbmZpZzxJbnB1dD4+O1xuXG4gICAgc3VibWl0KFxuICAgICAgdmFsdWU6IElucHV0VmFsdWU8SW5wdXQ+LFxuICAgICAgZXJyb3JDbGFzczogbmV3IChlcnJvcjogRXJyb3IpID0+IEZvcm1TdWJtaXRFcnJvclxuICAgICk6IEF3YWl0YWJsZTxWYWx1ZT47XG4gIH07XG5cbiAgRWxlbWVudDogV2lkZ2V0RWxlbWVudDxJbnB1dD47XG5cbiAgQ29udHJvbGxlcjogSW5wdXQ7XG5cbiAgUHJvcHM6IHsgaW5wdXQ6IElucHV0IH07XG5cbiAgSGFuZGxlcjoge307XG5cbiAgRWxlbWVudFN0YXRlOiBXaWRnZXRFbGVtZW50U3RhdGU8SW5wdXQ+O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtPFxuICBJbnB1dCBleHRlbmRzIEFueUlucHV0LFxuICBWYWx1ZSA9IG51bGwsXG4gIEVycm9yID0gbmV2ZXIsXG4gIFQgZXh0ZW5kcyBURm9ybSA9IHtcbiAgICBJbnB1dDogSW5wdXQ7XG4gICAgVmFsdWU6IFZhbHVlO1xuICAgIEVycm9yOiBFcnJvcjtcbiAgfVxuPih7IGlucHV0IH06IHsgdmFsdWU/OiBWYWx1ZTsgZXJyb3I/OiBFcnJvcjsgaW5wdXQ6IElucHV0IH0pOiBGb3JtPFQ+IHtcbiAgcmV0dXJuIDxhbnk+V2lkZ2V0PEFueUZvcm0+KHtcbiAgICBwcm9wczogeyBpbnB1dCB9LFxuICAgIGNvbnRyb2xsZXI6IGlucHV0LFxuICAgIGhhbmRsZXI6IEZvcm1IYW5kbGVyLFxuICAgIGNvbW1hbmRzOiB7IHN1Ym1pdDogXCJoYW5kbGVTdWJtaXRcIiB9LFxuICAgIGNvbm5lY3Rpb246IHtcbiAgICAgIGlucHV0OiBjb25uID0+IGNvbm4uY29udHJvbGxlcixcbiAgICB9LFxuICB9KTtcbn1cblxuLy9cblxuZXhwb3J0IGNsYXNzIEZvcm1TdWJtaXRFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlcnJvcikge31cbn1cbiIsImltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL1JlcXVpcmVPcHRpb25hbEtleXNcIjtcbmltcG9ydCB7IEFueUlucHV0LCBJbnB1dFZhbHVlRGF0YSB9IGZyb20gXCIuLi8uLi9pbnB1dC9JbnB1dFwiO1xuaW1wb3J0IHsgVmFsdWVPckF3YWl0YWJsZUZuIH0gZnJvbSBcIi4uLy4uL2lucHV0L1ZhbHVlT3JBd2FpdGFibGVGblwiO1xuaW1wb3J0IHsgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0SGFuZGxlciB9IGZyb20gXCIuLi9BYnN0cmFjdFdpZGdldEhhbmRsZXJcIjtcbmltcG9ydCB7IEFueUZvcm0sIEZvcm1TdWJtaXRFcnJvciB9IGZyb20gXCIuL0Zvcm1cIjtcbmltcG9ydCB7IElXaWRnZXRIYW5kbGVyLCBXaWRnZXRDb250cm9sbGVyLCBXaWRnZXRFbGVtZW50IH0gZnJvbSBcIi4uL1dpZGdldFwiO1xuXG50eXBlIFQgPSBBbnlGb3JtO1xuXG5leHBvcnQgY2xhc3MgRm9ybUhhbmRsZXJcbiAgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldEhhbmRsZXI8VD5cbiAgaW1wbGVtZW50cyBJV2lkZ2V0SGFuZGxlcjxBbnlGb3JtPiB7XG4gIGdldENvbnRyb2xsZXJDb25maWcoKTogUnBjVW5yZXNvbHZlZENvbmZpZzxXaWRnZXRDb250cm9sbGVyPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmlucHV0Q29uZmlnO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlU3VibWl0KHZhbHVlRGF0YTogSW5wdXRWYWx1ZURhdGE8QW55SW5wdXQ+KSB7XG4gICAgY29uc3QgaW5wdXRSZXN1bHQgPSBhd2FpdCAoYXdhaXQgdGhpcy5jb250cm9sbGVyKS5sb2FkQW5kQ2hlY2sodmFsdWVEYXRhKTtcbiAgICBpZiAoXCJlcnJvclwiIGluIGlucHV0UmVzdWx0KSByZXR1cm4geyBpbnB1dEVycm9yOiBpbnB1dFJlc3VsdC5lcnJvciB9O1xuXG4gICAgY2xhc3MgX0Vycm9yIHtcbiAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlcnJvcikge31cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IGF3YWl0IHRoaXMuY29uZmlnLnN1Ym1pdChpbnB1dFJlc3VsdC52YWx1ZSwgX0Vycm9yKSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IuY29uc3RydWN0b3IgPT09IF9FcnJvcikge1xuICAgICAgICByZXR1cm4geyBlcnJvcjogZXJyb3IuZXJyb3IgfTtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldEVsZW1lbnQoc3RhdGUpOiBQcm9taXNlPFJlcXVpcmVPcHRpb25hbEtleXM8V2lkZ2V0RWxlbWVudDxUPj4+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IFZhbHVlT3JBd2FpdGFibGVGbih0aGlzLmNvbmZpZy52YWx1ZUNvbmZpZyk7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBhd2FpdCB0aGlzLmNvbnRyb2xsZXIudGhlbihjID0+IGMuZ2V0SW5wdXRFbGVtZW50KCkpO1xuICAgICAgcmV0dXJuIHsgLi4uZWxlbWVudCwgdmFsdWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci50aGVuKGMgPT4gYy5nZXRFbGVtZW50KHN0YXRlKSk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUmVhY3Rvckxpc3RlbmVyIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3JlYWN0b3IvUmVhY3Rvckxpc3RlbmVyXCI7XG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC9yZW5kZXJlclwiO1xuaW1wb3J0IHsgSW5wdXRFcnJvciB9IGZyb20gXCIuLi8uLi9pbnB1dC9JbnB1dFwiO1xuaW1wb3J0IHsgSW5wdXRWaWV3LCBJbnB1dFZpZXdQcm9wcyB9IGZyb20gXCIuLi8uLi9pbnB1dC9JbnB1dFZpZXdcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldFZpZXcgfSBmcm9tIFwiLi4vQWJzdHJhY3RXaWRnZXRWaWV3XCI7XG5cbmltcG9ydCB7IFdpZGdldENvbnRyb2xsZXIsIFdpZGdldFR5cGUgfSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBXaWRnZXRWaWV3UHJvcHMgfSBmcm9tIFwiLi4vV2lkZ2V0Vmlld1wiO1xuaW1wb3J0IHsgQW55Rm9ybSwgVEZvcm0gfSBmcm9tIFwiLi9Gb3JtXCI7XG5cbmV4cG9ydCB0eXBlIEZvcm1WaWV3UHJvcHM8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueUZvcm0+LFxuICBUIGV4dGVuZHMgVEZvcm0gPSBXaWRnZXRUeXBlPEM+W1wiVEZvcm1cIl1cbj4gPSBXaWRnZXRWaWV3UHJvcHM8Qz4gJiB7XG4gIC8vIHJlbmRlckZvcm1FcnJvclxuICBpbnB1dDogUmVuZGVyZXI8SW5wdXRWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxUW1wiSW5wdXRcIl0+Pj47XG5cbiAgb25TdWJtaXQ/KHJlc3VsdDogVFtcIlZhbHVlXCJdKTtcblxuICBvbkVycm9yPyhyZXN1bHQ6IFRbXCJFcnJvclwiXSk7XG5cbiAgb25JbnB1dEVycm9yPyhyZXN1bHQ6IElucHV0RXJyb3I8VFtcIklucHV0XCJdPik7XG59O1xuXG5leHBvcnQgY2xhc3MgRm9ybVZpZXc8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueUZvcm0+XG4+IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRWaWV3PFxuICBDLFxuICBGb3JtVmlld1Byb3BzPEM+ICYge1xuICAgIGNoaWxkcmVuOiAocHJvcHM6IHtcbiAgICAgIGZvcm06IEZvcm1WaWV3PEM+O1xuICAgICAgaW5wdXQ6IFJlYWN0RWxlbWVudDtcbiAgICB9KSA9PiBSZWFjdEVsZW1lbnQ7XG4gIH1cbj4ge1xuICBpbnB1dDogSW5wdXRWaWV3PFJwY0Nvbm5lY3Rpb248V2lkZ2V0Q29udHJvbGxlcjxDPj4+O1xuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuX2VsZW1lbnQgPSB7IC4uLnRoaXMuZWxlbWVudCB9O1xuICB9XG5cbiAgYXN5bmMgc3VibWl0KCkge1xuICAgIGlmICghKGF3YWl0IHRoaXMuaW5wdXQudmFsaWRhdGUoKSkpIHJldHVybjtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucHJvcHMuY29ubmVjdGlvbi5jb21tYW5kKFxuICAgICAgXCJzdWJtaXRcIixcbiAgICAgIHRoaXMuaW5wdXQuZGF0YVxuICAgICk7XG5cbiAgICBpZiAoXCJpbnB1dEVycm9yXCIgaW4gcmVzdWx0KSB7XG4gICAgICB0aGlzLmlucHV0Py5zZXRFcnJvcihyZXN1bHQuaW5wdXRFcnJvcik7XG4gICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcj8uKHJlc3VsdC5pbnB1dEVycm9yKTtcbiAgICB9IGVsc2UgaWYgKFwiZXJyb3JcIiBpbiByZXN1bHQpIHtcbiAgICAgIHRoaXMucHJvcHMub25FcnJvcj8uKHJlc3VsdC5lcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMub25TdWJtaXQ/LihyZXN1bHQudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlclZpZXcoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0b3JMaXN0ZW5lclxuICAgICAgICBldmVudFR5cGU9e0Zvcm1WaWV3RXZlbnR9XG4gICAgICAgIG9uRXZlbnQ9e2V2ZW50ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJTVUJNSVRcIjpcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3VibWl0KCk7XG4gICAgICAgICAgICBjYXNlIFwiUkVTRVRcIjpcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVuKHtcbiAgICAgICAgICBmb3JtOiB0aGlzLFxuICAgICAgICAgIGlucHV0OiB0aGlzLnByb3BzLmlucHV0KHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb246IHRoaXMuY29udHJvbGxlcixcbiAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvbkNoYW5nZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICAgICAgaW5wdXRSZWY6IGZpZWxkID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IGZpZWxkIGFzIGFueTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbGVtZW50U3RhdGU6IHRoaXMuZWxlbWVudFN0YXRlLFxuICAgICAgICAgICAgb25FbGVtZW50U3RhdGVDaGFuZ2U6IHN0YXRlID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50U3RhdGUoc3RhdGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSl9XG4gICAgICA8L1JlYWN0b3JMaXN0ZW5lcj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGb3JtVmlld0V2ZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IFwiU1VCTUlUXCIgfCBcIlJFU0VUXCIpIHt9XG59XG4iLCJpbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL0FzeW5jXCI7XG5pbXBvcnQgeyBJZiwgSXNVbmRlZmluZWQgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3MyL2Jvb2xlYW5cIjtcbmltcG9ydCB7IFBhcnRpYWxVbmRlZmluZWRLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9QYXJ0aWFsVW5kZWZpbmVkS2V5c1wiO1xuaW1wb3J0IHsgTm9ScGMgfSBmcm9tIFwiLi4vLi4vTm9ScGNcIjtcbmltcG9ydCB7XG4gIEFueVJwYyxcbiAgUnBjQ29tbWFuZCxcbiAgUnBjQ29ubmVjdGlvbixcbiAgUnBjVW5yZXNvbHZlZENvbmZpZyxcbn0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHtcbiAgQW55V2lkZ2V0LFxuICBUV2lkZ2V0LFxuICBXaWRnZXQsXG4gIFdpZGdldEVsZW1lbnQsXG4gIFdpZGdldEVsZW1lbnRTdGF0ZSxcbiAgV2lkZ2V0SGFuZGxlckNsYXNzLFxufSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBJbmxpbmVXaWRnZXRIYW5kbGVyIH0gZnJvbSBcIi4vSW5saW5lV2lkZ2V0SGFuZGxlclwiO1xuXG5leHBvcnQgdHlwZSBUSW5saW5lV2lkZ2V0ID0ge1xuICBUYXJnZXQ6IEFueVdpZGdldCB8IHVuZGVmaW5lZDtcbiAgRWxlbWVudDogb2JqZWN0O1xuICBDb250cm9sbGVyOiBBbnlScGM7XG59O1xuXG5leHBvcnQgdHlwZSBBbnlJbmxpbmVXaWRnZXQgPSBJbmxpbmVXaWRnZXQ8VElubGluZVdpZGdldD47XG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBJbmxpbmVXaWRnZXQge1xuICB0eXBlIFdpdGhFbGVtZW50PFxuICAgIFRhcmdldCBleHRlbmRzIEFueVdpZGdldCxcbiAgICBFbGVtZW50IGV4dGVuZHMgb2JqZWN0XG4gID4gPSBJbmxpbmVXaWRnZXQ8eyBDb250cm9sbGVyOiBOb1JwYzsgVGFyZ2V0OiBUYXJnZXQ7IEVsZW1lbnQ6IEVsZW1lbnQgfT47XG59XG5leHBvcnQgdHlwZSBJbmxpbmVXaWRnZXQ8XG4gIFQgZXh0ZW5kcyBUSW5saW5lV2lkZ2V0LFxuICBUYXJnZXQgZXh0ZW5kcyBBbnlXaWRnZXQgPSBOb25OdWxsYWJsZTxUW1wiVGFyZ2V0XCJdPixcbiAgVW5kZWZpbmVkVGFyZ2V0IGV4dGVuZHMgdW5kZWZpbmVkID0gSWY8SXNVbmRlZmluZWQ8VFtcIlRhcmdldFwiXT4sIHVuZGVmaW5lZD5cbj4gPSBXaWRnZXQ8e1xuICBUSW5saW5lV2lkZ2V0OiBUO1xuICBDb25uZWN0aW9uOiB7XG4gICAgdGFyZ2V0OiBScGNDb25uZWN0aW9uPFRhcmdldD4gfCBVbmRlZmluZWRUYXJnZXQ7XG4gIH07XG4gIENvbmZpZzogUGFydGlhbFVuZGVmaW5lZEtleXM8e1xuICAgIGNvbnRyb2xsZXJDb25maWc6IFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIkNvbnRyb2xsZXJcIl0+O1xuXG4gICAgZ2V0RWxlbWVudDpcbiAgICAgIHwgKCgpID0+IEF3YWl0YWJsZTxUW1wiRWxlbWVudFwiXT4pXG4gICAgICB8IElmPElzVW5kZWZpbmVkPFRbXCJFbGVtZW50XCJdPiwgdW5kZWZpbmVkPjtcbiAgICB0YXJnZXRDb25maWc6IFJwY1VucmVzb2x2ZWRDb25maWc8VGFyZ2V0PiB8IFVuZGVmaW5lZFRhcmdldDtcbiAgfT47XG4gIEhhbmRsZXI6IHt9O1xuICBQcm9wczoge1xuICAgIGlubGluZVRhcmdldDogVFtcIlRhcmdldFwiXTtcbiAgfTtcbiAgRWxlbWVudDogW1RbXCJFbGVtZW50XCJdLCBXaWRnZXRFbGVtZW50PFRhcmdldD4gfCBVbmRlZmluZWRUYXJnZXRdO1xuICBDb250cm9sbGVyOiBUW1wiQ29udHJvbGxlclwiXTtcbiAgQ29tbWFuZHM6IHtcbiAgICB0YXJnZXQ6IFJwY0NvbW1hbmQgJiB7IGhhbmRsZXI6IFwiaGFuZGxlVGFyZ2V0XCIgfTtcbiAgfTtcbiAgRWxlbWVudFN0YXRlOiBXaWRnZXRFbGVtZW50U3RhdGU8VGFyZ2V0Pjtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gSW5saW5lV2lkZ2V0PFxuICBUYXJnZXQgZXh0ZW5kcyBBbnlXaWRnZXQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsXG4gIENvbnRyb2xsZXIgZXh0ZW5kcyBBbnlScGMgPSBOb1JwYyxcbiAgRWxlbWVudCBleHRlbmRzIG9iamVjdCA9IHt9LFxuICBUIGV4dGVuZHMgVElubGluZVdpZGdldCA9IHtcbiAgICBFbGVtZW50OiBFbGVtZW50O1xuICAgIENvbnRyb2xsZXI6IENvbnRyb2xsZXI7XG4gICAgVGFyZ2V0OiBUYXJnZXQ7XG4gIH1cbj4ob3B0aW9uczoge1xuICB0YXJnZXQ/OiBUYXJnZXQ7XG4gIGNvbnRyb2xsZXI/OiBDb250cm9sbGVyO1xuICBlbGVtZW50PzogRWxlbWVudDtcbn0pOiBJbmxpbmVXaWRnZXQ8VD4ge1xuICBjb25zdCB7IHRhcmdldCwgY29udHJvbGxlciB9ID0gb3B0aW9ucztcbiAgcmV0dXJuIFdpZGdldDxJbmxpbmVXaWRnZXQ8VD4+KHtcbiAgICBpc0dlbmVyaWNDb25maWc6IGZhbHNlLFxuICAgIGhhbmRsZXI6IElubGluZVdpZGdldEhhbmRsZXIgYXMgV2lkZ2V0SGFuZGxlckNsYXNzPElubGluZVdpZGdldDxUPj4sXG4gICAgcHJvcHM6IHsgaW5saW5lVGFyZ2V0OiB0YXJnZXQgfSxcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyIHx8IE5vUnBjLFxuICAgIGNvbW1hbmRzOiB7IHRhcmdldDogXCJoYW5kbGVUYXJnZXRcIiB9LFxuICAgIGNvbm5lY3Rpb246IHtcbiAgICAgIHRhcmdldChjb25uKSB7XG4gICAgICAgIHJldHVybiBjb25uLnJwYy5pbmxpbmVUYXJnZXQ/LmNyZWF0ZVJwY0Nvbm5lY3Rpb24ocGF5bG9hZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbm4uY29tbWFuZChcInRhcmdldFwiLCBwYXlsb2FkKTtcbiAgICAgICAgfSkhO1xuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7IExhenkgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhdHRlcm5zL2xhenlcIjtcbmltcG9ydCB7IFJwY0Vycm9yLCBScGNSZXNvbHZlZEhhbmRsZXIsIFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldEhhbmRsZXIgfSBmcm9tIFwiLi4vQWJzdHJhY3RXaWRnZXRIYW5kbGVyXCI7XG5pbXBvcnQgeyBBbnlJbmxpbmVXaWRnZXQgfSBmcm9tIFwiLi9JbmxpbmVXaWRnZXRcIjtcbmltcG9ydCB7XG4gIEFueVdpZGdldCxcbiAgSVdpZGdldEhhbmRsZXIsXG4gIFdpZGdldENvbnRyb2xsZXIsXG4gIFdpZGdldEVsZW1lbnQsXG59IGZyb20gXCIuLi9XaWRnZXRcIjtcblxuZXhwb3J0IGNsYXNzIElubGluZVdpZGdldEhhbmRsZXI8VCBleHRlbmRzIEFueUlubGluZVdpZGdldD5cbiAgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldEhhbmRsZXI8VD5cbiAgaW1wbGVtZW50cyBJV2lkZ2V0SGFuZGxlcjxBbnlJbmxpbmVXaWRnZXQ+IHtcbiAgZ2V0Q29udHJvbGxlckNvbmZpZygpOiBScGNVbnJlc29sdmVkQ29uZmlnPFdpZGdldENvbnRyb2xsZXI8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuY29udHJvbGxlckNvbmZpZztcbiAgfVxuXG4gIEBMYXp5KCkgZ2V0IHRhcmdldEhhbmRsZXIoKTpcbiAgICB8IFByb21pc2U8UnBjUmVzb2x2ZWRIYW5kbGVyPEFueVdpZGdldD4+XG4gICAgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnJwYy5pbmxpbmVUYXJnZXQpXG4gICAgICByZXR1cm4gdGhpcy5ycGMuaW5saW5lVGFyZ2V0LnJlc29sdmVScGNIYW5kbGVyKHRoaXMuY29uZmlnLnRhcmdldENvbmZpZyk7XG4gIH1cblxuICBhc3luYyBoYW5kbGVUYXJnZXQocGF5bG9hZCkge1xuICAgIGlmICghdGhpcy50YXJnZXRIYW5kbGVyKSB0aHJvdyBuZXcgUnBjRXJyb3IoYE5vIHRhcmdldGApO1xuICAgIHJldHVybiB0aGlzLnRhcmdldEhhbmRsZXIudGhlbihjID0+IGMuaGFuZGxlKHBheWxvYWQpKTtcbiAgfVxuXG4gIGFzeW5jIGdldEVsZW1lbnQoc3RhdGU/KTogUHJvbWlzZTxXaWRnZXRFbGVtZW50PFQ+PiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIGF3YWl0IHRoaXMuY29uZmlnLmdldEVsZW1lbnQoKSxcbiAgICAgIGF3YWl0IChhd2FpdCB0aGlzLnRhcmdldEhhbmRsZXIpPy5nZXRFbGVtZW50KHN0YXRlKSxcbiAgICBdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldFZpZXcgfSBmcm9tIFwiLi4vQWJzdHJhY3RXaWRnZXRWaWV3XCI7XG5pbXBvcnQgeyBBbnlJbmxpbmVXaWRnZXQsIFRJbmxpbmVXaWRnZXQgfSBmcm9tIFwiLi9JbmxpbmVXaWRnZXRcIjtcbmltcG9ydCB7IEFueVdpZGdldCwgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFZpZXdQcm9wcyB9IGZyb20gXCIuLi9XaWRnZXRWaWV3XCI7XG5cbmV4cG9ydCBjbGFzcyBJbmxpbmVXaWRnZXRWaWV3PFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlJbmxpbmVXaWRnZXQ+LFxuICBUIGV4dGVuZHMgVElubGluZVdpZGdldCA9IFdpZGdldFR5cGU8Qz5bXCJUSW5saW5lV2lkZ2V0XCJdLFxuICBUYXJnZXQgZXh0ZW5kcyBBbnlXaWRnZXQgPSBOb25OdWxsYWJsZTxUW1wiVGFyZ2V0XCJdPlxuPiBleHRlbmRzIEFic3RyYWN0V2lkZ2V0VmlldzxcbiAgQyxcbiAgV2lkZ2V0Vmlld1Byb3BzPEM+ICYge1xuICAgIGNoaWxkcmVuKHZpZXc6IElubGluZVdpZGdldFZpZXc8Qz4pOiBSZWFjdE5vZGU7XG4gIH1cbj4ge1xuICBnZXQgaW5saW5lRWxlbWVudCgpOiBUW1wiRWxlbWVudFwiXSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFswXTtcbiAgfVxuICBnZXQgdGFyZ2V0UHJvcHMoKTogV2lkZ2V0Vmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248VGFyZ2V0Pj4ge1xuICAgIHJldHVybiB7XG4gICAgICBjb25uZWN0aW9uOiB0aGlzLmNvbm5lY3Rpb24udGFyZ2V0ISxcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudFsxXSEsXG4gICAgICBlbGVtZW50U3RhdGU6IHRoaXMuZWxlbWVudFN0YXRlLFxuICAgICAgb25FbGVtZW50U3RhdGVDaGFuZ2U6IHN0YXRlID0+IHtcbiAgICAgICAgdGhpcy5zZXRFbGVtZW50U3RhdGUoc3RhdGUpO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyVmlldygpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuKHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7IFVuaW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9VbmlvblwiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiwgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IFJwY01hcCB9IGZyb20gXCIuLi8uLi9ycGMtbWFwL1JwY01hcFwiO1xuaW1wb3J0IHsgQW55V2lkZ2V0LCBXaWRnZXQsIFdpZGdldEVsZW1lbnQgfSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBBbnlXaWRnZXRSZWNvcmQgfSBmcm9tIFwiLi4vd2lkZ2V0LW1hcC9XaWRnZXRNYXBcIjtcbmltcG9ydCB7IFRhYnNXaWRnZXRIYW5kbGVyIH0gZnJvbSBcIi4vVGFic1dpZGdldEhhbmRsZXJcIjtcblxuZXhwb3J0IHR5cGUgQW55VGFic1dpZGdldCA9IFRhYnNXaWRnZXQ8QW55V2lkZ2V0UmVjb3JkPjtcblxuZXhwb3J0IHR5cGUgVGFic1dpZGdldDxUIGV4dGVuZHMgQW55V2lkZ2V0UmVjb3JkPiA9IFdpZGdldDx7XG4gIFRhYk1hcDogVDtcblxuICBDb250cm9sbGVyOiBScGNNYXA8VD47XG5cbiAgQ29tbWFuZHM6IHtcbiAgICBnZXRUYWJFbGVtZW50OiB7XG4gICAgICAoa2V5OiBzdHJpbmcpOiBXaWRnZXRFbGVtZW50PEFueVdpZGdldD47XG4gICAgICBoYW5kbGVyOiBcImhhbmRsZUdldFRhYkVsZW1lbnRcIjtcbiAgICB9O1xuICB9O1xuXG4gIENvbm5lY3Rpb246IHtcbiAgICBnZXRUYWJFbGVtZW50PEsgZXh0ZW5kcyBrZXlvZiBUPihrZXk6IEspOiBXaWRnZXRFbGVtZW50PFRbS10+O1xuICAgIHRhYnM6IHsgW0sgaW4ga2V5b2YgVF06IFJwY0Nvbm5lY3Rpb248VFtLXT4gfTtcbiAgfTtcblxuICBDb25maWc6IFJwY1VucmVzb2x2ZWRDb25maWc8UnBjTWFwPFQ+PjtcblxuICBFbGVtZW50OiB7XG4gICAgY3VycmVudD86IFVuaW9uPFxuICAgICAge1xuICAgICAgICBbSyBpbiBzdHJpbmcgJiBrZXlvZiBUXToge1xuICAgICAgICAgIGtleTogSztcbiAgICAgICAgICBlbGVtZW50OiBXaWRnZXRFbGVtZW50PFRbS10+O1xuICAgICAgICB9O1xuICAgICAgfVxuICAgID47XG4gIH07XG5cbiAgRWxlbWVudFN0YXRlOiB7XG4gICAgY3VycmVudFRhYj86IHtcbiAgICAgIGtleTogc3RyaW5nO1xuICAgICAgc3RhdGU6IGFueTtcbiAgICB9O1xuICB9O1xuXG4gIFByb3BzOiB7XG4gICAgdGFiTWFwOiBUO1xuICB9O1xuXG4gIEhhbmRsZXI6IHt9O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBUYWJzV2lkZ2V0PFQgZXh0ZW5kcyBBbnlXaWRnZXRSZWNvcmQ+KFxuICB0YWJNYXA6IFRcbik6IFRhYnNXaWRnZXQ8VD4ge1xuICByZXR1cm4gPGFueT5XaWRnZXQ8QW55VGFic1dpZGdldD4oe1xuICAgIGNvbnRyb2xsZXI6IFJwY01hcCh0YWJNYXApLFxuICAgIGhhbmRsZXI6IFRhYnNXaWRnZXRIYW5kbGVyLFxuICAgIGNvbW1hbmRzOiB7IGdldFRhYkVsZW1lbnQ6IFwiaGFuZGxlR2V0VGFiRWxlbWVudFwiIH0sXG4gICAgcHJvcHM6IHsgdGFiTWFwIH0sXG4gICAgY29ubmVjdGlvbjoge1xuICAgICAgZ2V0VGFiRWxlbWVudDogY29ubiA9PiBrZXkgPT4gY29ubi5jb21tYW5kKFwiZ2V0VGFiRWxlbWVudFwiLCBrZXkpLFxuICAgICAgdGFiczogY29ubiA9PiBjb25uLmNvbnRyb2xsZXIsXG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBSZXF1aXJlT3B0aW9uYWxLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9SZXF1aXJlT3B0aW9uYWxLZXlzXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldEhhbmRsZXIgfSBmcm9tIFwiLi4vQWJzdHJhY3RXaWRnZXRIYW5kbGVyXCI7XG5pbXBvcnQgeyBrZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3Qva2V5c1wiO1xuaW1wb3J0IHsgUnBjRXJyb3IsIFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQge1xuICBJV2lkZ2V0SGFuZGxlcixcbiAgV2lkZ2V0Q29udHJvbGxlcixcbiAgV2lkZ2V0RWxlbWVudCxcbiAgV2lkZ2V0RWxlbWVudFN0YXRlLFxufSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBBbnlUYWJzV2lkZ2V0IH0gZnJvbSBcIi4vVGFic1dpZGdldFwiO1xuXG50eXBlIFQgPSBBbnlUYWJzV2lkZ2V0O1xuXG5leHBvcnQgY2xhc3MgVGFic1dpZGdldEhhbmRsZXJcbiAgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldEhhbmRsZXI8VD5cbiAgaW1wbGVtZW50cyBJV2lkZ2V0SGFuZGxlcjxUPiB7XG4gIGdldENvbnRyb2xsZXJDb25maWcoKTogUnBjVW5yZXNvbHZlZENvbmZpZzxXaWRnZXRDb250cm9sbGVyPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlR2V0VGFiRWxlbWVudChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyXG4gICAgICAudGhlbihjID0+IGMuZ2V0VGFyZ2V0SGFuZGxlcihrZXkpKVxuICAgICAgLnRoZW4odCA9PiB0LmdldEVsZW1lbnQodW5kZWZpbmVkKSk7XG4gIH1cblxuICBhc3luYyBnZXRFbGVtZW50KFxuICAgIHN0YXRlOiBXaWRnZXRFbGVtZW50U3RhdGU8VD4gfCB1bmRlZmluZWRcbiAgKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPFdpZGdldEVsZW1lbnQ8VD4+PiB7XG4gICAgbGV0IGtleSA9IHN0YXRlPy5jdXJyZW50VGFiPy5rZXk7XG4gICAgaWYgKCFrZXkgfHwgIShrZXkgaW4gdGhpcy5ycGMudGFiTWFwKSkge1xuICAgICAgW2tleV0gPSBrZXlzKHRoaXMucnBjLnRhYk1hcCk7XG4gICAgfVxuICAgIGlmICgha2V5KSB0aHJvdyBuZXcgUnBjRXJyb3IoYE5vIHRhYiBrZXlgKTtcbiAgICBjb25zdCBlbGVtZW50ID0gYXdhaXQgdGhpcy5jb250cm9sbGVyXG4gICAgICAudGhlbihjID0+IGMuZ2V0VGFyZ2V0SGFuZGxlcihrZXkhKSlcbiAgICAgIC50aGVuKGMgPT4gYy5nZXRFbGVtZW50KHN0YXRlPy5jdXJyZW50VGFiPy5zdGF0ZSkpO1xuICAgIHJldHVybiB7IGN1cnJlbnQ6IGVsZW1lbnQgPyB7IGtleSwgZWxlbWVudCB9IDogdW5kZWZpbmVkIH07XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE92ZXJyaWRlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzMi9PdmVycmlkZVwiO1xuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvcmVuZGVyZXJcIjtcbmltcG9ydCB7IFZpZXdTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC92aWV3L1ZpZXdTdGF0ZVwiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0VmlldyB9IGZyb20gXCIuLi9BYnN0cmFjdFdpZGdldFZpZXdcIjtcbmltcG9ydCB7IEFueVdpZGdldCwgQW55V2lkZ2V0Q29ubmVjdGlvbiwgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFZpZXdQcm9wcyB9IGZyb20gXCIuLi9XaWRnZXRWaWV3XCI7XG5pbXBvcnQgeyBBbnlUYWJzV2lkZ2V0LCBUYWJzV2lkZ2V0IH0gZnJvbSBcIi4vVGFic1dpZGdldFwiO1xuXG5leHBvcnQgdHlwZSBBbnlUYWJzV2lkZ2V0Q29ubmVjdGlvbiA9IFJwY0Nvbm5lY3Rpb248QW55VGFic1dpZGdldD47XG5cbmV4cG9ydCBjbGFzcyBUYWJzV2lkZ2V0VmlldzxcbiAgQyBleHRlbmRzIEFueVRhYnNXaWRnZXRDb25uZWN0aW9uXG4+IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRWaWV3PFxuICBDLFxuICBXaWRnZXRWaWV3UHJvcHM8Qz4gJiB7XG4gICAgY2hpbGRyZW46IFJlbmRlcmVyPFRhYnNXaWRnZXRWaWV3PEM+PjtcbiAgfVxuPiB7XG4gIEBWaWV3U3RhdGUoKVxuICBwcm90ZWN0ZWQgX2N1cnJlbnRUYWJQcm9wczpcbiAgICB8IE92ZXJyaWRlPFdpZGdldFZpZXdQcm9wczxBbnlXaWRnZXRDb25uZWN0aW9uPiwgeyBrZXk6IHN0cmluZyB9PlxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIGdldCBjdXJyZW50VGFiUHJvcHMoKTpcbiAgICB8IE92ZXJyaWRlPFdpZGdldFZpZXdQcm9wczxBbnlXaWRnZXRDb25uZWN0aW9uPiwgeyBrZXk6IHN0cmluZyB9PlxuICAgIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFRhYlByb3BzO1xuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZVRhYlByb3BzKHsga2V5LCBlbGVtZW50IH06IHsga2V5OiBzdHJpbmc7IGVsZW1lbnQ6IG9iamVjdCB9KSB7XG4gICAgdGhpcy5fY3VycmVudFRhYlByb3BzID0ge1xuICAgICAga2V5LFxuICAgICAgY29ubmVjdGlvbjogdGhpcy5jb250cm9sbGVyW2tleV0sXG4gICAgICBlbGVtZW50U3RhdGU6XG4gICAgICAgIHRoaXMuZWxlbWVudFN0YXRlPy5jdXJyZW50VGFiPy5rZXkgPT09IGtleVxuICAgICAgICAgID8gdGhpcy5lbGVtZW50U3RhdGUuY3VycmVudFRhYi5zdGF0ZVxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgb25FbGVtZW50U3RhdGVDaGFuZ2U6IHN0YXRlID0+IHtcbiAgICAgICAgdGhpcy5zZXRFbGVtZW50U3RhdGUoe1xuICAgICAgICAgIC4uLnRoaXMuZWxlbWVudFN0YXRlLFxuICAgICAgICAgIGN1cnJlbnRUYWI6IHsga2V5LCBzdGF0ZSB9LFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBlbGVtZW50LFxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlRWxlbWVudChlbGVtZW50OiBXaWRnZXRUeXBlPEM+W1wiRWxlbWVudFwiXSkge1xuICAgIGlmIChlbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgIHRoaXMudXBkYXRlVGFiUHJvcHMoZWxlbWVudC5jdXJyZW50KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzd2l0Y2hUbzxLIGV4dGVuZHMgc3RyaW5nICYga2V5b2YgV2lkZ2V0VHlwZTxDPltcIlRhYk1hcFwiXT4oa2V5OiBLKSB7XG4gICAgdGhpcy5zZXRFbGVtZW50U3RhdGUoe1xuICAgICAgLi4udGhpcy5lbGVtZW50U3RhdGUsXG4gICAgICBjdXJyZW50VGFiOiB7IGtleSwgc3RhdGU6IHVuZGVmaW5lZCB9LFxuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlVGFiUHJvcHMoe1xuICAgICAga2V5LFxuICAgICAgZWxlbWVudDogYXdhaXQgdGhpcy5wcm9wcy5jb25uZWN0aW9uLmdldFRhYkVsZW1lbnQoa2V5KSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlclZpZXcoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbih0aGlzKTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSAoKSA9PiBbXTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL3NyYy9sb2dnaW5nIHN5bmMgcmVjdXJzaXZlXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7Il0sInNvdXJjZVJvb3QiOiIifQ==