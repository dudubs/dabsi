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
    const [isMenuOpen, setMenu] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
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
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/Button.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/IconButton.js");
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Tooltip */ "./node_modules/@material-ui/core/esm/Tooltip/Tooltip.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _react_HookRef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../react/HookRef */ "./src/react/HookRef.ts");
/* harmony import */ var _react_utils_partialProps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../react/utils/partialProps */ "./src/react/utils/partialProps.ts");
/* harmony import */ var _MuiIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MuiIcon */ "./src/browser/mui/components/MuiIcon.tsx");
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
    let { ButtonProps, IconButtonProps, renderOnClick, TooltipProps, disableTooltip, iconOnly, buttonRef: initButtonRef, buttonType } = props, buttonProps = __rest(props, ["ButtonProps", "IconButtonProps", "renderOnClick", "TooltipProps", "disableTooltip", "iconOnly", "buttonRef", "buttonType"]);
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const buttonRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    let element;
    let type;
    if (iconOnly) {
        type = _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_5__.default;
        buttonProps = Object.assign(Object.assign({}, buttonProps), IconButtonProps);
    }
    else {
        type = _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__.default;
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
        setOpen(true);
    };
    if (iconOnly) {
        elementProps.children = (0,_MuiIcon__WEBPACK_IMPORTED_MODULE_4__.MuiIcon)(icon);
    }
    else {
        elementProps.endIcon = (0,_MuiIcon__WEBPACK_IMPORTED_MODULE_4__.MuiIcon)(icon);
        elementProps.children = title;
    }
    element = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(type, elementProps);
    if ((title || TooltipProps) && !disableTooltip) {
        element = (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_7__.default, Object.assign({ title: title }, TooltipProps), element));
    }
    if (open) {
        element = (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            element, renderOnClick === null || renderOnClick === void 0 ? void 0 :
            renderOnClick(() => setOpen(false), () => buttonRef.current)));
    }
    return element;
}
const MuiCancelButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_3__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Cancel */ "./node_modules/@material-ui/icons/Cancel.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `CANCEL`,
});
const MuiConfirmButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_3__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Done */ "./node_modules/@material-ui/icons/Done.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `CONFIRM`,
});
const MuiResetButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_3__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Clear */ "./node_modules/@material-ui/icons/Clear.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `RESET`,
});
const MuiCloseButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_3__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `CLOSE`,
});
const MuiAddButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_3__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Add */ "./node_modules/@material-ui/icons/Add.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `ADD`,
});
const MuiSubmitButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_3__.partialProps)(MuiButton, {
    icon: __webpack_require__(/*! @material-ui/icons/Send */ "./node_modules/@material-ui/icons/Send.js"),
    title: _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `Submit`,
});
const MuiEditButton = (0,_react_utils_partialProps__WEBPACK_IMPORTED_MODULE_3__.partialProps)(MuiButton, {
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
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiButton__WEBPACK_IMPORTED_MODULE_3__.MuiCancelButton, { onClick: (event) => {
                    onCancel === null || onCancel === void 0 ? void 0 : onCancel(event);
                } }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiButton__WEBPACK_IMPORTED_MODULE_3__.MuiConfirmButton, { danger: true, title: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `CONFIRM`, onClick: (event) => {
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
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/styles */ "./node_modules/@material-ui/styles/esm/makeStyles/makeStyles.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
;



const useStyles = (0,_material_ui_styles__WEBPACK_IMPORTED_MODULE_2__.default)({
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
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/styles */ "./node_modules/@material-ui/styles/esm/makeStyles/makeStyles.js");
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




const useStyles = (0,_material_ui_styles__WEBPACK_IMPORTED_MODULE_2__.default)({
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
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/styles */ "./node_modules/@material-ui/styles/esm/makeStyles/makeStyles.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _lang_LangTranslator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lang/LangTranslator */ "./src/lang/LangTranslator.ts");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
/* harmony import */ var _MuiIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MuiIcon */ "./src/browser/mui/components/MuiIcon.tsx");
;













const useStyles = (0,_material_ui_styles__WEBPACK_IMPORTED_MODULE_6__.default)((theme) => ({
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
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.default, { item: true }, props.countSelectedItems ? (props.selectActions) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.default, { container: true, alignItems: 'center' },
                props.staticActions && react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.default, { item: true }, props.staticActions),
                searchProps && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.default, { item: true },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_10__.default, Object.assign({ value: searchText, placeholder: lang.translateNode(_lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `SEARCH`) }, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_4__.mergeProps)(searchProps.TextFieldProps, {
                        onChange: (event) => {
                            var _a;
                            const text = event.target.value;
                            setSearchText(text || "");
                            (_a = searchProps === null || searchProps === void 0 ? void 0 : searchProps.onSearch) === null || _a === void 0 ? void 0 : _a.call(searchProps, text);
                        },
                        onBlur: () => {
                            var _a;
                            (_a = searchProps === null || searchProps === void 0 ? void 0 : searchProps.onSearch) === null || _a === void 0 ? void 0 : _a.call(searchProps, searchText);
                        },
                        onKeyDown: (event) => {
                            var _a;
                            if (event.key === "Escape") {
                                event.preventDefault();
                                setSearchText("");
                                (_a = searchProps === null || searchProps === void 0 ? void 0 : searchProps.onSearch) === null || _a === void 0 ? void 0 : _a.call(searchProps, "");
                            }
                        },
                        onKeyPress: (event) => {
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
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/styles */ "./node_modules/@material-ui/styles/esm/jssPreset/jssPreset.js");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/styles */ "./node_modules/@material-ui/styles/esm/StylesProvider/StylesProvider.js");
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
        plugins: [...(0,_material_ui_styles__WEBPACK_IMPORTED_MODULE_4__.default)().plugins, ...jssPlugins],
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
            children = (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_material_ui_styles__WEBPACK_IMPORTED_MODULE_7__.default, {
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
    (0,_typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_3__.WidgetRouterView)(_router, dm.connection.table, (props, { location, emit }) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiDataTableView__WEBPACK_IMPORTED_MODULE_5__.MuiDataTableView, Object.assign({}, props, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(dm.MuiDataTableViewProps, {
        toolbarActions: {
            add: Object.assign(Object.assign({ buttonType: _components_MuiButton__WEBPACK_IMPORTED_MODULE_4__.MuiAddButton }, dm.MuiAddButtonProps), { onClick() {
                    emit(location.at("add"));
                } }),
        },
        onEditClick(event) {
            emit(location.at("edit", { id: event.key }));
        },
        onDeleteClick(event) {
            return dm.connection.delete(event.key);
        },
    })))));
    (0,_typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_3__.WidgetRouterView)(_router.at("add"), dm.connection.add, (props, { location, emit }) => {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiFormView__WEBPACK_IMPORTED_MODULE_6__.MuiFormView, Object.assign({}, props, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(dm.MuiAddFormViewProps, {
            onSubmit(id) {
                emit(location.parent.at("edit", { id }));
            },
        }), { input: dm.renderAddInput })));
    });
    (0,_typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_3__.WidgetRouterView)(_router.at("edit"), params => dm.connection.edit(params.id), props => {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_widget_inline_widget_InlineWidgetView__WEBPACK_IMPORTED_MODULE_2__.InlineWidgetView, Object.assign({}, props, { children: ({ targetProps: props, inlineElement: page }) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__.default, null, page.title),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiTabsWidgetView__WEBPACK_IMPORTED_MODULE_7__.MuiTabsWidgetView, Object.assign({}, props, { tabs: Object.assign(Object.assign({}, dm.tabs), { form: Object.assign(Object.assign({}, dm.MuiEditFormTabViewProps), { render: props => {
                                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiFormView__WEBPACK_IMPORTED_MODULE_6__.MuiFormView, Object.assign({}, props, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(dm.MuiEditFormViewProps, {
                                    onSubmit() {
                                        // TODO: alert or next location ...
                                    },
                                }), { input: dm.renderEditInput || dm.renderAddInput })));
                            } }) }) })))) })));
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
            icon: "edit",
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
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_widget_form_FormView__WEBPACK_IMPORTED_MODULE_2__.FormView, Object.assign({}, props), ({ input, form }) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__.default, { container: true, direction: "column", spacing: 2 },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__.default, { item: true }, input),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__.default, { item: true },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiGrid__WEBPACK_IMPORTED_MODULE_4__.MuiGrid, { spacing: 2, justify: "flex-end" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiButton__WEBPACK_IMPORTED_MODULE_3__.MuiSubmitButton, Object.assign({ ButtonProps: { variant: "contained" } }, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(props.MuiSubmitButtonProps, {
                    onClick: () => form.submit(),
                }))),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MuiButton__WEBPACK_IMPORTED_MODULE_3__.MuiResetButton, Object.assign({ ButtonProps: { variant: "contained" } }, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(props.MuiResetButtonProps, {
                    onClick: () => form.reset(),
                })))))))));
}


/***/ }),

/***/ "./src/browser/mui/rpc/MuiTabsWidgetView.tsx":
/*!***************************************************!*\
  !*** ./src/browser/mui/rpc/MuiTabsWidgetView.tsx ***!
  \***************************************************/
/*! namespace exports */
/*! export MuiTabsWidgetView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiTabsWidgetView": () => /* binding */ MuiTabsWidgetView
/* harmony export */ });
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Tab */ "./node_modules/@material-ui/core/esm/Tab/Tab.js");
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Tabs */ "./node_modules/@material-ui/core/esm/Tabs/Tabs.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_object_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/object/keys */ "./src/common/object/keys.ts");
/* harmony import */ var _lang_LangKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lang/LangKey */ "./src/lang/LangKey.tsx");
/* harmony import */ var _react_utils_EmptyFragment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../react/utils/EmptyFragment */ "./src/react/utils/EmptyFragment.ts");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
/* harmony import */ var _typerpc_widget_tabs_widget_TabsWidgetView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../typerpc/widget/tabs-widget/TabsWidgetView */ "./src/typerpc/widget/tabs-widget/TabsWidgetView.tsx");
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
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_widget_tabs_widget_TabsWidgetView__WEBPACK_IMPORTED_MODULE_5__.TabsWidgetView, Object.assign({}, otherProps), view => {
        var _a;
        const tabs = [];
        const { currentTabProps } = view;
        const currentTabOptions = currentTabProps && getTabOptions(currentTabProps.key);
        for (const tabKey of (0,_common_object_keys__WEBPACK_IMPORTED_MODULE_1__.keys)(props.connection.rpc.tabMap)) {
            const tabOptions = getTabOptions(tabKey);
            const isSelected = (currentTabProps === null || currentTabProps === void 0 ? void 0 : currentTabProps.key) === tabKey;
            tabs.push(react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6__.default, Object.assign({ key: tabKey }, TabProps, (isSelected ? SelectedTabProps : null), { label: react__WEBPACK_IMPORTED_MODULE_0__.createElement(_lang_LangKey__WEBPACK_IMPORTED_MODULE_2__.LangKey, { for: tabKey }, tabOptions === null || tabOptions === void 0 ? void 0 : tabOptions.title), value: tabKey })));
        }
        let tabContent = undefined;
        if (currentTabOptions === null || currentTabOptions === void 0 ? void 0 : currentTabOptions.render) {
            tabContent = (_a = currentTabOptions.render) === null || _a === void 0 ? void 0 : _a.call(currentTabOptions, currentTabProps);
        }
        if (tabs.length === 1)
            return tabContent !== null && tabContent !== void 0 ? tabContent : _react_utils_EmptyFragment__WEBPACK_IMPORTED_MODULE_3__.EmptyFragment;
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__.default, Object.assign({}, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_4__.mergeProps)(TabsProps, {
                onChange: (_, key) => view.switchTo(key),
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
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/styles */ "./node_modules/@material-ui/styles/esm/makeStyles/makeStyles.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _lang_LangTranslator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lang/LangTranslator */ "./src/lang/LangTranslator.ts");
/* harmony import */ var _typerpc_input_data_input_DataInputView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../typerpc/input/data-input/DataInputView */ "./src/typerpc/input/data-input/DataInputView.ts");
/* harmony import */ var _typerpc_widget_WidgetViewLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../typerpc/widget/WidgetViewLoader */ "./src/typerpc/widget/WidgetViewLoader.ts");
/* harmony import */ var _components_MuiLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/MuiLink */ "./src/browser/mui/components/MuiLink.tsx");
/* harmony import */ var _MuiDataTableView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../MuiDataTableView */ "./src/browser/mui/rpc/MuiDataTableView.tsx");
;













const useStyles = (0,_material_ui_styles__WEBPACK_IMPORTED_MODULE_7__.default)(theme => ({}));
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
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/TextField.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../react/utils/mergeProps */ "./src/react/utils/mergeProps.ts");
/* harmony import */ var _typerpc_input_text_input_TextInputView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../typerpc/input/text-input/TextInputView */ "./src/typerpc/input/text-input/TextInputView.ts");
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
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_input_text_input_TextInputView__WEBPACK_IMPORTED_MODULE_2__.TextInputView, Object.assign({}, props, { children: view => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3__.default, Object.assign({ fullWidth: true }, (0,_react_utils_mergeProps__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(TextFieldProps, {
            onBlur: () => view.validate(),
            onChange: event => view.setText(event.target.value),
        }), { label: title, error: view.error != null, helperText: view.renderError(), value: view.text }))) })));
}


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

/***/ "./src/common/typings.ts":
/*!*******************************!*\
  !*** ./src/common/typings.ts ***!
  \*******************************/
/*! namespace exports */
/*! export Nullable [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Type [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TypeRef [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Typing [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Nullable": () => /* binding */ Nullable,
/* harmony export */   "Typing": () => /* binding */ Typing,
/* harmony export */   "TypeRef": () => /* binding */ TypeRef,
/* harmony export */   "Type": () => /* binding */ Type
/* harmony export */ });
function Nullable(value) {
    return value;
}
function Typing() {
    return (() => {
        throw new Error();
    });
}
function TypeRef(cb) {
    return (() => {
        throw new Error();
    });
}
function Type() {
    if (this instanceof Type) {
        throw new Error();
    }
    return Type;
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
        listeners === null || listeners === void 0 ? void 0 : listeners.forEach(callback => {
            callback(event);
        });
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

function useEmitted(actionType, callback) {
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

/***/ "./src/react/utils/hooks/createUndefinedContext.ts":
/*!*********************************************************!*\
  !*** ./src/react/utils/hooks/createUndefinedContext.ts ***!
  \*********************************************************/
/*! namespace exports */
/*! export createUndefinedContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createUndefinedContext": () => /* binding */ createUndefinedContext
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
;
function createUndefinedContext() {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);
}


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
    if (view.isDidMount && !view.isDidSetState) {
        view.isDidSetState = true;
        view.setState((state) => {
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
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! history */ "./node_modules/history/esm/history.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_createMuiSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/createMuiSystem */ "./src/browser/mui/createMuiSystem.ts");
/* harmony import */ var _browser_mui_MuiAdmin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../browser/mui/MuiAdmin */ "./src/browser/mui/MuiAdmin.tsx");
/* harmony import */ var _react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../react/reactor/useEmitter */ "./src/react/reactor/useEmitter.ts");
/* harmony import */ var _typerouter2_ReactRouterView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../typerouter2/ReactRouterView */ "./src/typerouter2/ReactRouterView.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index */ "./src/system/browser/index.ts");
/* harmony import */ var _LoginInfoEvent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LoginInfoEvent */ "./src/system/browser/LoginInfoEvent.ts");
/* harmony import */ var _MuiSystemView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MuiSystemView */ "./src/system/browser/MuiSystemView.tsx");
/* harmony import */ var _SystemRouter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SystemRouter */ "./src/system/browser/SystemRouter.ts");
;









const { Provider: MuiSystemProvider } = (0,_browser_mui_createMuiSystem__WEBPACK_IMPORTED_MODULE_1__.createMuiSystem)();
const history = (0,history__WEBPACK_IMPORTED_MODULE_9__.createBrowserHistory)();
(0,_MuiSystemView__WEBPACK_IMPORTED_MODULE_7__.MuiSystemView)(_SystemRouter__WEBPACK_IMPORTED_MODULE_8__.SystemRouter);
function MuiSystemRootView() {
    const emit = (0,_react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_3__.useEmitter)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        _index__WEBPACK_IMPORTED_MODULE_5__.SystemLoginInfo.then(loginInfo => {
            console.log({ loginInfo });
            emit(new _LoginInfoEvent__WEBPACK_IMPORTED_MODULE_6__.LoginInfoEvent(loginInfo));
        });
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(MuiSystemProvider, null,
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerouter2_ReactRouterView__WEBPACK_IMPORTED_MODULE_4__.ReactRouterView, { history: history, router: _SystemRouter__WEBPACK_IMPORTED_MODULE_8__.SystemRouter })));
}
const Test = () => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_MuiAdmin__WEBPACK_IMPORTED_MODULE_2__.MuiAdmin, { menu: {
        home: {
            icon: __webpack_require__(/*! @material-ui/icons/Home */ "./node_modules/@material-ui/icons/Home.js"),
        },
        acl: {
            // icon: require("@material-ui/icons/Home"),
            children: {
                users: {
                    children: {
                        add: { icon: __webpack_require__(/*! @material-ui/icons/PersonAdd */ "./node_modules/@material-ui/icons/PersonAdd.js") },
                    },
                },
                groups: {
                    icon: __webpack_require__(/*! @material-ui/icons/People */ "./node_modules/@material-ui/icons/People.js"),
                    children: {
                        add: { icon: __webpack_require__(/*! @material-ui/icons/GroupAdd */ "./node_modules/@material-ui/icons/GroupAdd.js") },
                    },
                },
            },
        },
        outbox: {
            icon: __webpack_require__(/*! @material-ui/icons/Send */ "./node_modules/@material-ui/icons/Send.js"),
        },
        favorites: {
            icon: __webpack_require__(/*! @material-ui/icons/Favorite */ "./node_modules/@material-ui/icons/Favorite.js"),
        },
        archive: {
            icon: __webpack_require__(/*! @material-ui/icons/Archive */ "./node_modules/@material-ui/icons/Archive.js"),
        },
        trash: {
            icon: __webpack_require__(/*! @material-ui/icons/Delete */ "./node_modules/@material-ui/icons/Delete.js"),
        },
        spam: {
            icon: __webpack_require__(/*! @material-ui/icons/Error */ "./node_modules/@material-ui/icons/Error.js"),
        },
    } }));


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
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/Grid.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/esm/Paper/Paper.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/makeStyles.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_rpc_inputs_MuiDataInputView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/rpc/inputs/MuiDataInputView */ "./src/browser/mui/rpc/inputs/MuiDataInputView.tsx");
/* harmony import */ var _browser_mui_rpc_MuiFormView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../browser/mui/rpc/MuiFormView */ "./src/browser/mui/rpc/MuiFormView.tsx");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../typerpc/widget/WidgetRouterView */ "./src/typerpc/widget/WidgetRouterView.tsx");
/* harmony import */ var _common_admin_MuiAdminView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/admin/MuiAdminView */ "./src/system/common/admin/MuiAdminView.tsx");
/* harmony import */ var _common_SystemApp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/SystemApp */ "./src/system/common/SystemApp.ts");
;









const useStyles = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__.default)(theme => ({
    paper: {
        padding: theme.spacing(2),
    },
}));
function MuiSystemView(router) {
    (0,_common_admin_MuiAdminView__WEBPACK_IMPORTED_MODULE_5__.MuiAdminView)(router.at("admin"));
    (0,_typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_4__.WidgetRouterView)(router.at("login"), _common_SystemApp__WEBPACK_IMPORTED_MODULE_6__.SystemApp.service.devLogin, props => {
        const classes = useStyles();
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.default, { container: true, justify: "center" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.default, { item: true },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__.default, { className: classes.paper },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_MuiFormView__WEBPACK_IMPORTED_MODULE_2__.MuiFormView, Object.assign({}, props, { input: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_inputs_MuiDataInputView__WEBPACK_IMPORTED_MODULE_1__.MuiDataInputView, Object.assign({}, props, { title: _lang_Lang__WEBPACK_IMPORTED_MODULE_3__.Lang `LOGIN_TO_USER` })))) })))))));
    });
}


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
/* harmony import */ var _typerouter2_Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../typerouter2/Router */ "./src/typerouter2/Router.ts");
/* harmony import */ var _common_admin_AdminRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/admin/AdminRouter */ "./src/system/common/admin/AdminRouter.ts");
;

const SystemRouter = (0,_typerouter2_Router__WEBPACK_IMPORTED_MODULE_0__.Router)({
    admin: _common_admin_AdminRouter__WEBPACK_IMPORTED_MODULE_1__.AdminRouter,
    login: (0,_typerouter2_Router__WEBPACK_IMPORTED_MODULE_0__.Router)(),
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
/* harmony import */ var _typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../typerpc/input/input-map/InputMap */ "./src/typerpc/input/input-map/InputMap.ts");
/* harmony import */ var _typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../typerpc/input/InputErrorHook */ "./src/typerpc/input/InputErrorHook.ts");
/* harmony import */ var _typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../typerpc/input/text-input/TextInput */ "./src/typerpc/input/text-input/TextInput.ts");
/* harmony import */ var _typerpc_RpcPartialConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../typerpc/RpcPartialConfig */ "./src/typerpc/RpcPartialConfig.ts");
;





const NameInput = (0,_typerpc_RpcPartialConfig__WEBPACK_IMPORTED_MODULE_5__.RpcPartialConfig)((0,_typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_4__.TextInput)(), {
    minLength: 2,
    maxLength: 20,
    required: true,
});
const UserBasicInfoInput = (0,_typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_2__.InputMap)({
    firstName: NameInput,
    lastName: NameInput,
    loginName: (0,_typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_3__.InputErrorHook)()((0,_typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_4__.TextInput)()),
});
const UserContactInfoInput = (0,_typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_2__.InputMap)({
    phoneNumber: (0,_typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_4__.TextInput)(),
    email: (0,_typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_4__.TextInput)(),
});
const AclUsersManager = (0,_typerpc_data_manager_DataManager__WEBPACK_IMPORTED_MODULE_0__.DataManager)({
    addInput: UserBasicInfoInput,
    editInput: (0,_typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_2__.InputMap)({
        basicInfo: UserBasicInfoInput,
        contactInfo: UserContactInfoInput,
    }),
    tableRowType: {
        loginName: String,
        firstName: String,
        lastName: String,
    },
    editTabs: {
    // TODO: groups
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
;
const AdminApp = (0,_typerpc_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_0__.RpcMap)({
// fo: RpcFn(),
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
/* harmony import */ var _common_typings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/typings */ "./src/common/typings.ts");
/* harmony import */ var _typerpc_input_data_input_DataInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../typerpc/input/data-input/DataInput */ "./src/typerpc/input/data-input/DataInput.ts");
/* harmony import */ var _typerpc_rpc_fn_RpcFn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../typerpc/rpc-fn/RpcFn */ "./src/typerpc/rpc-fn/RpcFn.ts");
/* harmony import */ var _typerpc_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../typerpc/rpc-map/RpcMap */ "./src/typerpc/rpc-map/RpcMap.ts");
/* harmony import */ var _typerpc_widget_form_Form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../typerpc/widget/form/Form */ "./src/typerpc/widget/form/Form.ts");
/* harmony import */ var _AdminApp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AdminApp */ "./src/system/common/AdminApp.ts");
/* harmony import */ var _UserApp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UserApp */ "./src/system/common/UserApp.ts");
;






// RemotePromise<X>
// type: rejected
// type: resolved
const DevLogin = (0,_typerpc_widget_form_Form__WEBPACK_IMPORTED_MODULE_4__.Form)({
    input: (0,_typerpc_input_data_input_DataInput__WEBPACK_IMPORTED_MODULE_1__.DataInput)({
        loadType: (0,_common_typings__WEBPACK_IMPORTED_MODULE_0__.TypeRef)(() => DevLoginUser),
    }),
    value: (0,_common_typings__WEBPACK_IMPORTED_MODULE_0__.Typing)(),
});
const SystemApp = (0,_typerpc_rpc_map_RpcMap__WEBPACK_IMPORTED_MODULE_3__.RpcMap)({
    logout: (0,_typerpc_rpc_fn_RpcFn__WEBPACK_IMPORTED_MODULE_2__.RpcFn)(),
    getLoginInfo: (0,_typerpc_rpc_fn_RpcFn__WEBPACK_IMPORTED_MODULE_2__.RpcFn)(),
    devLogin: DevLogin,
    admin: _AdminApp__WEBPACK_IMPORTED_MODULE_5__.AdminApp,
    user: _UserApp__WEBPACK_IMPORTED_MODULE_6__.UserApp,
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
/* harmony import */ var _typerouter2_Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../typerouter2/Router */ "./src/typerouter2/Router.ts");
/* harmony import */ var _AclUsersManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AclUsersManager */ "./src/system/common/AclUsersManager.ts");
;

const AdminRouter = (0,_typerouter2_Router__WEBPACK_IMPORTED_MODULE_0__.Router)({
    acl: (0,_typerouter2_Router__WEBPACK_IMPORTED_MODULE_0__.Router)({
        users: _AclUsersManager__WEBPACK_IMPORTED_MODULE_1__.AclUsersManagerRouter,
    }),
});


/***/ }),

/***/ "./src/system/common/admin/MuiAclUsersManagerView.tsx":
/*!************************************************************!*\
  !*** ./src/system/common/admin/MuiAclUsersManagerView.tsx ***!
  \************************************************************/
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_rpc_MuiDataManagerView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../browser/mui/rpc/MuiDataManagerView */ "./src/browser/mui/rpc/MuiDataManagerView.tsx");
/* harmony import */ var _typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../typerpc/input/input-map/InputMapView */ "./src/typerpc/input/input-map/InputMapView.tsx");
/* harmony import */ var _AclUsersManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AclUsersManager */ "./src/system/common/AclUsersManager.ts");
/* harmony import */ var _MuiUserBasicInfoInputView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MuiUserBasicInfoInputView */ "./src/system/common/admin/MuiUserBasicInfoInputView.tsx");
/* harmony import */ var _MuiUserContactInfoInputView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MuiUserContactInfoInputView */ "./src/system/common/admin/MuiUserContactInfoInputView.tsx");
;





// MuiAclManagerView
const MuiAclUsersManagerView = (router) => {
    (0,_browser_mui_rpc_MuiDataManagerView__WEBPACK_IMPORTED_MODULE_1__.MuiDataManagerView)({
        router,
        connection: _AclUsersManager__WEBPACK_IMPORTED_MODULE_3__.AclUsersManager.service,
        renderAddInput: props => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiUserBasicInfoInputView__WEBPACK_IMPORTED_MODULE_4__.MuiUserBasicInfoInputView, Object.assign({}, props)),
        renderEditInput: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_2__.InputMapView.Fields, Object.assign({}, props, { fields: {
                basicInfo: props => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiUserBasicInfoInputView__WEBPACK_IMPORTED_MODULE_4__.MuiUserBasicInfoInputView, Object.assign({}, props)),
                contactInfo: props => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiUserContactInfoInputView__WEBPACK_IMPORTED_MODULE_5__.MuiUserContactInfoInputView, Object.assign({}, props)),
            } }))),
    });
};


/***/ }),

/***/ "./src/system/common/admin/MuiAdminView.tsx":
/*!**************************************************!*\
  !*** ./src/system/common/admin/MuiAdminView.tsx ***!
  \**************************************************/
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
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _react_reactor_useEmitted__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../react/reactor/useEmitted */ "./src/react/reactor/useEmitted.ts");
/* harmony import */ var _typerouter2_ReactRouter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../typerouter2/ReactRouter */ "./src/typerouter2/ReactRouter.ts");
/* harmony import */ var _browser_LoginInfoEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../browser/LoginInfoEvent */ "./src/system/browser/LoginInfoEvent.ts");
/* harmony import */ var _MuiAclUsersManagerView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MuiAclUsersManagerView */ "./src/system/common/admin/MuiAclUsersManagerView.tsx");
;





function MuiAdminView(router) {
    console.log("x");
    (0,_typerouter2_ReactRouter__WEBPACK_IMPORTED_MODULE_3__.ReactRouter)(router, {
        wrap(props) {
            const loginInfo = (0,_react_reactor_useEmitted__WEBPACK_IMPORTED_MODULE_2__.useEmitted)(_browser_LoginInfoEvent__WEBPACK_IMPORTED_MODULE_4__.LoginInfoEvent);
            if (!loginInfo) {
                return _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `ACCESS_DENIED_BECAUSE_NO_LOGIN`;
            }
            const { success } = loginInfo;
            if (!success) {
                return _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `ACCESS_DENIED_BECAUSE_LOGIN_IS_NOT_SUCCESS`;
            }
            if (!success.isAdmin) {
                return _lang_Lang__WEBPACK_IMPORTED_MODULE_1__.Lang `ACCESS_DENIED_BECAUSE_LOGIN_IS_NOT_ADMIN`;
            }
            return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, props.children);
        },
    });
    (0,_MuiAclUsersManagerView__WEBPACK_IMPORTED_MODULE_5__.MuiAclUsersManagerView)(router.at("acl").at("users"));
}


/***/ }),

/***/ "./src/system/common/admin/MuiUserBasicInfoInputView.tsx":
/*!***************************************************************!*\
  !*** ./src/system/common/admin/MuiUserBasicInfoInputView.tsx ***!
  \***************************************************************/
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
/* harmony import */ var _browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../browser/mui/rpc/inputs/MuiTextInputView */ "./src/browser/mui/rpc/inputs/MuiTextInputView.tsx");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../typerpc/input/input-map/InputMapView */ "./src/typerpc/input/input-map/InputMapView.tsx");
/* harmony import */ var _typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../typerpc/input/InputErrorHook */ "./src/typerpc/input/InputErrorHook.ts");
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

/***/ "./src/system/common/admin/MuiUserContactInfoInputView.tsx":
/*!*****************************************************************!*\
  !*** ./src/system/common/admin/MuiUserContactInfoInputView.tsx ***!
  \*****************************************************************/
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
/* harmony import */ var _browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../browser/mui/rpc/inputs/MuiTextInputView */ "./src/browser/mui/rpc/inputs/MuiTextInputView.tsx");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../typerpc/input/input-map/InputMapView */ "./src/typerpc/input/input-map/InputMapView.tsx");
;



const MuiUserContactInfoInputView = props => {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_3__.InputMapView.Fields, Object.assign({}, props, { fields: {
            phoneNumber: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__.MuiTextInputView, Object.assign({}, props, { title: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `PHONE_NUMBER` }))),
            email: props => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_inputs_MuiTextInputView__WEBPACK_IMPORTED_MODULE_1__.MuiTextInputView, Object.assign({}, props, { title: _lang_Lang__WEBPACK_IMPORTED_MODULE_2__.Lang `EMAIL` })),
        } })));
};


/***/ }),

/***/ "./src/typerouter2/ReactRouter.ts":
/*!****************************************!*\
  !*** ./src/typerouter2/ReactRouter.ts ***!
  \****************************************/
/*! namespace exports */
/*! export ReactRouter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ReactRouterContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getReactRouterMetadata [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactRouterContext": () => /* binding */ ReactRouterContext,
/* harmony export */   "ReactRouter": () => /* binding */ ReactRouter,
/* harmony export */   "getReactRouterMetadata": () => /* binding */ getReactRouterMetadata
/* harmony export */ });
/* harmony import */ var _common_map_mapFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/map/mapFactory */ "./src/common/map/mapFactory.ts");
/* harmony import */ var _react_utils_hooks_createUndefinedContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../react/utils/hooks/createUndefinedContext */ "./src/react/utils/hooks/createUndefinedContext.ts");
;

const ReactRouterContext = (0,_react_utils_hooks_createUndefinedContext__WEBPACK_IMPORTED_MODULE_1__.createUndefinedContext)();
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
                    return renderDefault(props);
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

/***/ "./src/typerouter2/ReactRouterView.ts":
/*!********************************************!*\
  !*** ./src/typerouter2/ReactRouterView.ts ***!
  \********************************************/
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
/* harmony import */ var _RouteProps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RouteProps */ "./src/typerouter2/RouteProps.ts");
/* harmony import */ var _ReactRouter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReactRouter */ "./src/typerouter2/ReactRouter.ts");
/* harmony import */ var _RouterLocation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RouterLocation */ "./src/typerouter2/RouterLocation.ts");
;





function ReactRouterView({ router: rootRouter, history, }) {
    const [route, setRoute] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => (0,_RouteProps__WEBPACK_IMPORTED_MODULE_3__.getRoutePropsByPath)(rootRouter, history.location.pathname));
    const emit = (0,_react_reactor_useEmitter__WEBPACK_IMPORTED_MODULE_2__.useEmitter)();
    (0,_react_reactor_useEmitted__WEBPACK_IMPORTED_MODULE_1__.useEmitted)(_RouterLocation__WEBPACK_IMPORTED_MODULE_5__.RouterLocation, location => {
        if (location.root.router === rootRouter) {
            setRoute({
                type: "INDEX",
                location,
                path: location.path,
            });
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => history.listen(() => {
        setRoute((0,_RouteProps__WEBPACK_IMPORTED_MODULE_3__.getRoutePropsByPath)(rootRouter, history.location.pathname));
    }), [history]);
    let children = undefined;
    const routerMetadata = (0,_ReactRouter__WEBPACK_IMPORTED_MODULE_4__.getReactRouterMetadata)(route.location.router);
    if (routerMetadata.renderer) {
        children = routerMetadata.renderer({
            emit,
            route,
            location: route.location,
        });
    }
    for (const location of route.location.getParents()) {
        const routerMetadata = (0,_ReactRouter__WEBPACK_IMPORTED_MODULE_4__.getReactRouterMetadata)(location.router);
        for (const wrapper of routerMetadata.wrappers) {
            children = wrapper({
                emit,
                children,
                location,
                route,
            });
        }
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, children);
}


/***/ }),

/***/ "./src/typerouter2/RouteProps.ts":
/*!***************************************!*\
  !*** ./src/typerouter2/RouteProps.ts ***!
  \***************************************/
/*! namespace exports */
/*! export getRoutePropsByPath [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRoutePropsByPath": () => /* binding */ getRoutePropsByPath
/* harmony export */ });
/* harmony import */ var _common_getNextPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/getNextPath */ "./src/common/getNextPath.ts");
/* harmony import */ var _common_MetaType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/MetaType */ "./src/common/MetaType.ts");
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Router */ "./src/typerouter2/Router.ts");
/* harmony import */ var _RouterLocation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RouterLocation */ "./src/typerouter2/RouterLocation.ts");
;



function getRoutePropsByPath(router, path) {
    let location = _RouterLocation__WEBPACK_IMPORTED_MODULE_3__.RouterLocation.create(router);
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
        location = new _RouterLocation__WEBPACK_IMPORTED_MODULE_3__.RouterLocation(router, params, location, name);
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

/***/ "./src/typerouter2/Router.ts":
/*!***********************************!*\
  !*** ./src/typerouter2/Router.ts ***!
  \***********************************/
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

/***/ "./src/typerouter2/RouterLocation.ts":
/*!*******************************************!*\
  !*** ./src/typerouter2/RouterLocation.ts ***!
  \*******************************************/
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
    constructor(_router, _params, _parent, name) {
        this._router = _router;
        this._params = _params;
        this._parent = _parent;
        this.name = name;
    }
    static create(router) {
        if (router.params.length)
            throw new Error(`Can't create RouterLocation for ${(0,_logging_inspect__WEBPACK_IMPORTED_MODULE_3__.inspect)(this)}.`);
        return new RouterLocation(router, {}, undefined, undefined);
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
    at(key, ...[params]) {
        return (new RouterLocation(this._router.children[key], params || {}, this, key));
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
            yield new RouterLocation(router, {}, this, name);
        }
    }
    *getChildren() {
        for (const [name, router] of (0,_common_object_entries__WEBPACK_IMPORTED_MODULE_0__.entries)(this._router.children)) {
            if (!router.params.length) {
                yield new RouterLocation(router, {}, this, name);
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
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigFactory": () => /* binding */ ConfigFactory
/* harmony export */ });
const resultSymbol = Symbol();
function ConfigFactory(config, context, ...args) {
    let result = config === null || config === void 0 ? void 0 : config($ => {
        return { [resultSymbol]: $ };
    }, context, ...args);
    if (!result || !(resultSymbol in result)) {
        throw new Error(`You have to use $`);
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




const rpcToServiceHandler = new WeakMap();
function Rpc(options) {
    let service;
    const rpc = Object.setPrototypeOf((0,_common_object_mergeDescriptors__WEBPACK_IMPORTED_MODULE_1__.mergeDescriptors)(options["props"] || {}, {
        options,
        get service() {
            return service;
        },
    }), AnyRpc);
    service = rpc.createRpcConnection(payload => {
        const handler = rpcToServiceHandler.get(rpc);
        if (!handler) {
            throw new RpcError(`No handle for service.`);
        }
        return handler(payload);
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
            rpcToServiceHandler.set(this, handler);
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
        else if (!this.options.isConfigFn && typeof config === "function") {
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
                    config,
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

/***/ "./src/typerpc/RpcPartialConfig.ts":
/*!*****************************************!*\
  !*** ./src/typerpc/RpcPartialConfig.ts ***!
  \*****************************************/
/*! namespace exports */
/*! export RpcPartialConfig [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RpcPartialConfig": () => /* binding */ RpcPartialConfig
/* harmony export */ });
/* harmony import */ var _RpcConfigHook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RpcConfigHook */ "./src/typerpc/RpcConfigHook.ts");
;
function RpcPartialConfig(target, defaultConfig) {
    return (0,_RpcConfigHook__WEBPACK_IMPORTED_MODULE_0__.RpcConfigHook)({
        isGenericConfig: false,
        target,
        handler: ({ config }) => $ => $(Object.assign(Object.assign({}, defaultConfig), config)),
    });
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
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataManagerHandler": () => /* binding */ DataManagerHandler
/* harmony export */ });
const DataManagerHandler = ({ config, props: { editInput }, }) => $ => {
    return $({
        async delete(key) {
            await config.source.delete(key);
        },
        table: $ => $(Object.assign(Object.assign({}, config.tableConfig), { source: config.source })),
        add: {
            inputConfig: config.addInputConfig,
            submit: value => {
                return config.addSubmit(value);
            },
        },
        edit: async ($, key) => {
            const row = await config.source.getOrFail(key);
            return $({
                getElement() {
                    return { title: config.getTitle(row) };
                },
                targetConfig: {
                    form: { inputConfig: config.editInputConfig },
                    submit(value) {
                        return config.editSubmit(row, value);
                    },
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
/* harmony import */ var _typerouter2_Router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../typerouter2/Router */ "./src/typerouter2/Router.ts");
;

function DataManagerRouter(dm) {
    const r = (0,_typerouter2_Router__WEBPACK_IMPORTED_MODULE_1__.Router)({
        add: (0,_typerouter2_Router__WEBPACK_IMPORTED_MODULE_1__.Router)(),
        edit: (0,_typerouter2_Router__WEBPACK_IMPORTED_MODULE_1__.Router)(["id"], Object.assign(Object.assign({}, (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__.mapObject)(dm.editTabs, () => (0,_typerouter2_Router__WEBPACK_IMPORTED_MODULE_1__.Router)())), { form: (0,_typerouter2_Router__WEBPACK_IMPORTED_MODULE_1__.Router)() })),
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
    async getElement() {
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
function InputErrorHook() {
    return (input) => {
        return input;
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
    async getValueElement(dataKey) {
        let dataRow = undefined;
        if (!dataKey) {
            const dataKeyOrRow = await (0,_ValueOrAwaitableFn__WEBPACK_IMPORTED_MODULE_1__.ValueOrAwaitableFn)(this.config.default);
            if (dataKeyOrRow && typeof dataKeyOrRow === "object") {
                dataRow = dataKeyOrRow;
            }
            else if (dataKeyOrRow) {
                dataKey = String(dataKeyOrRow);
            }
        }
        if (dataKey && !dataRow) {
            dataRow = await this.config.source.get(dataKey);
        }
        return dataRow && (await this.controller.then(c => c.loadRow(dataRow)));
    }
    async loadAndCheckNotNull(key) {
        if (this.config.loadSource) {
            const row = await this.config.loadSource.get(String(key));
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
            return (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__.mapObject)(valueElementMap, (itemValue, itemKey) => {
                return this.targetMap[itemKey].getValueDataFromElement(itemValue);
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
;

function TextInput() {
    return (0,_Input__WEBPACK_IMPORTED_MODULE_0__.Input)({
        handler: _TextInputHandler__WEBPACK_IMPORTED_MODULE_1__.TextInputHandler,
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
/* harmony import */ var _AbstractInputHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AbstractInputHandler */ "./src/typerpc/input/AbstractInputHandler.ts");
/* harmony import */ var _TextInputLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextInputLoader */ "./src/typerpc/input/text-input/TextInputLoader.ts");
/* harmony import */ var _ValueOrAwaitableFn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ValueOrAwaitableFn */ "./src/typerpc/input/ValueOrAwaitableFn.ts");
;


class TextInputHandler extends _AbstractInputHandler__WEBPACK_IMPORTED_MODULE_0__.AbstractInputHandler {
    async getValueElement(value) {
        var _a;
        return (_a = value !== null && value !== void 0 ? value : (await (0,_ValueOrAwaitableFn__WEBPACK_IMPORTED_MODULE_2__.ValueOrAwaitableFn)(this.config.default))) !== null && _a !== void 0 ? _a : "";
    }
    getControllerConfig() {
        return undefined;
    }
    async getInputElement() {
        var _a;
        return {
            minLength: this.config.minLength,
            maxLength: this.config.maxLength,
            pattern: (_a = this.config.pattern) === null || _a === void 0 ? void 0 : _a.source,
            trim: this.config.trim,
            required: this.config.required,
        };
    }
    async loadAndCheck(valueData) {
        const value = await _TextInputLoader__WEBPACK_IMPORTED_MODULE_1__.TextInputLoader.load(this.config, valueData);
        const error = _TextInputLoader__WEBPACK_IMPORTED_MODULE_1__.TextInputLoader.check(this.config, valueData);
        if (error !== undefined)
            return { error, value };
        return { value };
    }
}


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
        return super.setValue(_TextInputLoader__WEBPACK_IMPORTED_MODULE_4__.TextInputLoader.load(this._options, value));
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
    getTargetHandler(key) {
        return this.rpc.targetMap[key].resolveRpcHandler(this.config[key]);
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
        isConfigFn: false,
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
        const targetConfig = await (0,_ConfigFactory__WEBPACK_IMPORTED_MODULE_0__.ConfigFactory)(this.config, value);
        return this.rpc.parameterTarget
            .resolveRpcHandler(targetConfig)
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
                return this.getElement();
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
        this._element = this.props.element;
        (_a = this.updateElement) === null || _a === void 0 ? void 0 : _a.call(this, this.props.element);
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
    getElement() {
        return this.rpcCommand(["getElement", []]);
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
/* harmony import */ var _typerouter2_ReactRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../typerouter2/ReactRouter */ "./src/typerouter2/ReactRouter.ts");
/* harmony import */ var _WidgetViewLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WidgetViewLoader */ "./src/typerpc/widget/WidgetViewLoader.ts");
;


function WidgetRouterView(router, connectionOrGetConnection, optionsOrRenderWidget) {
    const getConnection = typeof connectionOrGetConnection === "function"
        ? connectionOrGetConnection
        : () => connectionOrGetConnection;
    const options = typeof optionsOrRenderWidget === "function"
        ? { renderWidget: optionsOrRenderWidget }
        : optionsOrRenderWidget;
    const { renderWidget } = options;
    (0,_typerouter2_ReactRouter__WEBPACK_IMPORTED_MODULE_1__.ReactRouter)(router, Object.assign(Object.assign({}, options), { renderIndex(indexProps) {
            const connection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => getConnection(indexProps.location.params), [indexProps.location.params]);
            return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_WidgetViewLoader__WEBPACK_IMPORTED_MODULE_2__.WidgetViewLoader, { connection: connection, children: props => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, { props, indexProps }) }));
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
        this.reload().catch((error) => {
            this.error = error;
        });
    }
    async reload() {
        this.isLoading = true;
        try {
            this.element = await this.props.connection.getElement();
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
        return (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_3__.mapObject)(this.config.columns || {}, (columnConfig, key) => {
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
        const row = {};
        if (!noKey) {
            row.$key = dataRow.$key;
        }
        for (const [key, column] of (0,_common_object_entries__WEBPACK_IMPORTED_MODULE_2__.entries)(this.columns)) {
            row[key] = await column.load(dataRow);
        }
        return row;
    }
    async getRows(query) {
        var _a, _b, _c, _d, _e;
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
        let source = this.config.source
            .order(orders)
            .take(Math.min((_d = query.take) !== null && _d !== void 0 ? _d : maxRows, maxRows))
            .skip((_e = query.skip) !== null && _e !== void 0 ? _e : 0)
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
    async getElement() {
        var _a;
        const { rows, totalRows } = await this.getRows({
            getCount: true,
            text: "",
            take: this.config.pageSize || 10,
            skip: 0,
            order: {},
        });
        return {
            rows,
            totalRows,
            pageSize: this.config.pageSize,
            searchable: !!((_a = this.config.searchIn) === null || _a === void 0 ? void 0 : _a.length),
            columns: {},
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
        super(...arguments);
        this.reloadDebounce = (0,_react_utils_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_1__.Debounce)();
        this.searchText = "";
        this.pageIndex = 0;
        this.isLoading = false;
        this.columns = {};
    }
    updateElement(element) {
        var _a;
        this.rows = element.rows || [];
        this.totalRows = (_a = element.totalRows) !== null && _a !== void 0 ? _a : 0;
        this.pageSize = element.pageSize || 10;
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
        this.pageSize = 1 > pageSize ? 1 : pageSize;
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
    // TODO: @ViewMethod() - emit only if isDidMount && !sDidUnmount
    async reload() {
        if (!this.isDidMount) {
            return;
        }
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
            take: this.pageSize,
            skip: this.pageIndex * this.pageSize,
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
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": () => /* binding */ Form
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
    });
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
        const inputResult = await this.controller.then(input => input.loadAndCheck(valueData));
        if ("error" in inputResult)
            return { inputError: inputResult.error };
        const submitResult = await this.config.submit(inputResult.value);
        if (submitResult == null)
            return { value: null };
        if (typeof submitResult !== "object" || Array.isArray(submitResult))
            return { value: submitResult };
        return submitResult;
    }
    async getElement() {
        const value = await (0,_input_ValueOrAwaitableFn__WEBPACK_IMPORTED_MODULE_0__.ValueOrAwaitableFn)(this.config.default);
        if (value !== undefined) {
            const element = await this.controller.then(c => c.getInputElement());
            return Object.assign(Object.assign({}, element), { value });
        }
        return this.controller.then(c => c.getElement());
    }
}


/***/ }),

/***/ "./src/typerpc/widget/form/FormView.tsx":
/*!**********************************************!*\
  !*** ./src/typerpc/widget/form/FormView.tsx ***!
  \**********************************************/
/*! namespace exports */
/*! export FormView [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormView": () => /* binding */ FormView
/* harmony export */ });
/* harmony import */ var _AbstractWidgetView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AbstractWidgetView */ "./src/typerpc/widget/AbstractWidgetView.tsx");
;
class FormView extends _AbstractWidgetView__WEBPACK_IMPORTED_MODULE_0__.AbstractWidgetView {
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
        return this.props.children({
            form: this,
            input: this.props.input({
                connection: this.controller,
                value: undefined,
                onChange: undefined,
                element: this.element,
                inputRef: field => {
                    this.input = field;
                },
            }),
        });
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
    get targetContext() {
        if (this.rpc.inlineTarget)
            return this.rpc.inlineTarget.resolveRpcHandler(this.config.targetConfig);
    }
    async handleTarget(payload) {
        if (!this.targetContext)
            throw new _Rpc__WEBPACK_IMPORTED_MODULE_1__.RpcError(`No target`);
        return this.targetContext.then(c => c.handle(payload));
    }
    async getElement() {
        var _a;
        this.config.getElement();
        return [
            await this.config.getElement(),
            await ((_a = this.targetContext) === null || _a === void 0 ? void 0 : _a.then(c => c.getElement())),
        ];
    }
}
__decorate([
    (0,_common_patterns_lazy__WEBPACK_IMPORTED_MODULE_0__.Lazy)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], InlineWidgetHandler.prototype, "targetContext", null);


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
        commands: { getTab: "handleGetTab" },
        props: { tabMap },
        connection: {
            getTab: conn => key => conn.command("getTab", key),
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
;

class TabsWidgetHandler extends _AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_0__.AbstractWidgetHandler {
    getControllerConfig() {
        return undefined;
    }
    async handleGetTab(key) {
        return this.controller
            .then(c => c.getTargetHandler(key))
            .then(t => t.getElement());
    }
    async getElement() {
        const [key] = (0,_common_object_keys__WEBPACK_IMPORTED_MODULE_1__.keys)(this.rpc.widget.controller.targetMap);
        const element = (key || undefined) &&
            (await this.controller
                .then(c => c.getTargetHandler(key))
                .then(c => c.getElement()));
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
        this._currentTabProps = {
            key,
            connection: this.controller[key],
            element,
        };
    }
    updateElement(element) {
        if (element.current)
            this.updateTabProps(element.current);
    }
    async switchTo(key) {
        this.updateTabProps({
            key,
            element: await this.props.connection.getTab(key),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9NdWlBZG1pbi50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvTXVpTmVzdGVkTWVudS50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlCdXR0b24udHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NvbXBvbmVudHMvTXVpRGFuZ2VyQnV0dG9uLnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9jb21wb25lbnRzL011aURhbmdlckRpYWxvZy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlEZWxldGVCdXR0b24udHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NvbXBvbmVudHMvTXVpRGlhbG9nLnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9jb21wb25lbnRzL011aUdyaWQudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NvbXBvbmVudHMvTXVpSWNvbi50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlMaW5rLnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9jb21wb25lbnRzL011aVRhYmxlQ2VsbC50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlUYWJsZVRvb2xiYXIudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NyZWF0ZU11aVN5c3RlbS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9ycGMvTXVpRGF0YU1hbmFnZXJWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9ycGMvTXVpRGF0YVRhYmxlVmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvcnBjL011aUZvcm1WaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9ycGMvTXVpVGFic1dpZGdldFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL3JwYy9pbnB1dHMvTXVpRGF0YUlucHV0Vmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvcnBjL2lucHV0cy9NdWlUZXh0SW5wdXRWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vTWV0YVR5cGUudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL2FycmF5L3VzZUFycmF5VG9TZXEudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL2Fzc2VydC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vYXN5bmMvVGltZW91dC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vYXN5bmMvV2FpdGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9nZXROZXh0UGF0aC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vbWFwL21hcEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL21hcC90b3VjaE1hcC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vb2JqZWN0L2RlZmluZWQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9kZWZpbmVkQXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9lbnRyaWVzLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9vYmplY3QvaGFzS2V5cy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vb2JqZWN0L2tleXMudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9tYXBBbmRGaWx0ZXJPYmplY3QudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9tYXBPYmplY3QudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9tYXBPYmplY3RUb0FycmF5LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9vYmplY3QvbWVyZ2VEZXNjcmlwdG9ycy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vcGF0dGVybnMvbGF6eS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL2NhcGl0YWxpemUudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3N0cmluZy9mcm9tQ29uc3RhbnRDYXNlLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9zdHJpbmcvZnJvbVByb3BlcnR5Q2FzZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL2pvaW5UZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL2pvaW5VcmwudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3N0cmluZy9tYXRjaENhc2UudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3N0cmluZy9zcGxpdC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL3RvQ29uc3RhbnRDYXNlLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9zdHJpbmcvdG9UaXRsZUNhc2UudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3R5cGluZ3MudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvaW1tdXRhYmxlMi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9sYW5nL0xhbmcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvbGFuZy9MYW5nS2V5LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9sYW5nL0xhbmdUZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9sYW5nL0xhbmdUcmFuc2xhdG9yLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2xhbmcvTGFuZ1ZpZXcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvbG9nZ2luZy9pbnNwZWN0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L0hvb2tSZWYudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvVGFibGVMYXlvdXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvcmVhY3Rvci9SZWFjdG9yLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3JlYWN0b3IvdXNlRW1pdHRlZC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC9yZWFjdG9yL3VzZUVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvdXRpbHMvRW1wdHlGcmFnbWVudC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC91dGlscy9ob29rcy9jcmVhdGVVbmRlZmluZWRDb250ZXh0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3V0aWxzL2hvb2tzL3VzZURlYm91bmNlLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3V0aWxzL21lcmdlUHJvcHMudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvdXRpbHMvcGFydGlhbFByb3BzLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3V0aWxzL3NldFJlZi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC92aWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3Qvdmlldy9WaWV3U3RhdGUudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3Qvdmlldy9zZXRWaWV3U3RhdGVLZXkudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvTG9naW5JbmZvRXZlbnQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvTXVpU3lzdGVtUm9vdFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9icm93c2VyL011aVN5c3RlbVZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9icm93c2VyL1N5c3RlbVJvdXRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vYnJvd3Nlci9pbmRleC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vY29tbW9uL0FjbFVzZXJzTWFuYWdlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vY29tbW9uL0FkbWluQXBwLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9jb21tb24vU3lzdGVtQXBwLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9jb21tb24vVXNlckFwcC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vY29tbW9uL2FkbWluL0FkbWluUm91dGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9jb21tb24vYWRtaW4vTXVpQWNsVXNlcnNNYW5hZ2VyVmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2NvbW1vbi9hZG1pbi9NdWlBZG1pblZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9jb21tb24vYWRtaW4vTXVpVXNlckJhc2ljSW5mb0lucHV0Vmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2NvbW1vbi9hZG1pbi9NdWlVc2VyQ29udGFjdEluZm9JbnB1dFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVyb3V0ZXIyL1JlYWN0Um91dGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVyb3V0ZXIyL1JlYWN0Um91dGVyVmlldy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcm91dGVyMi9Sb3V0ZVByb3BzLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVyb3V0ZXIyL1JvdXRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcm91dGVyMi9Sb3V0ZXJMb2NhdGlvbi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL0NvbmZpZ0ZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9HZW5lcmljQ29uZmlnLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvTm9ScGMudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9ScGMudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9ScGNDb25maWdIb29rLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvUnBjUGFydGlhbENvbmZpZy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2RhdGEtbWFuYWdlci9EYXRhTWFuYWdlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2RhdGEtbWFuYWdlci9EYXRhTWFuYWdlckhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9kYXRhLW1hbmFnZXIvRGF0YU1hbmFnZXJSb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9BYnN0cmFjdElucHV0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L0Fic3RyYWN0SW5wdXRWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L0lucHV0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvSW5wdXRFcnJvckhvb2sudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9JbnB1dFZpZXdDaGlsZHJlbi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L0xlbmd0aEVycm9yLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvVmFsdWVPckF3YWl0YWJsZUZuLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvZGF0YS1pbnB1dC9EYXRhSW5wdXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9kYXRhLWlucHV0L0RhdGFJbnB1dEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9kYXRhLWlucHV0L0RhdGFJbnB1dFZpZXcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9pbnB1dC1tYXAvSW5wdXRNYXAudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9pbnB1dC1tYXAvSW5wdXRNYXBIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvaW5wdXQtbWFwL0lucHV0TWFwVmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9udWxsYWJsZS1pbnB1dC9BYnN0cmFjdE51bGxhYmxlSW5wdXRIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvbnVsbGFibGUtaW5wdXQvTnVsbGFibGVJbnB1dFZpZXcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC90ZXh0LWlucHV0L1RleHRJbnB1dC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L3RleHQtaW5wdXQvVGV4dElucHV0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L3RleHQtaW5wdXQvVGV4dElucHV0TG9hZGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvdGV4dC1pbnB1dC9UZXh0SW5wdXRWaWV3LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvcnBjLWZuL1JwY0ZuLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvcnBjLWZuL1JwY0ZuSGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3JwYy1tYXAvUnBjTWFwLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvcnBjLW1hcC9ScGNNYXBIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvcnBjLXBhcmFtZXRlci9ScGNQYXJhbWV0ZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9ycGMtcGFyYW1ldGVyL1JwY1BhcmFtZXRlckhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvQWJzdHJhY3RXaWRnZXRIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L0Fic3RyYWN0V2lkZ2V0Vmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvUm93LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L1dpZGdldC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9XaWRnZXRSb3V0ZXJWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9XaWRnZXRWaWV3TG9hZGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2RhdGEtdGFibGUvRGF0YVRhYmxlLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2RhdGEtdGFibGUvRGF0YVRhYmxlSGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9kYXRhLXRhYmxlL0RhdGFUYWJsZVZpZXcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvZm9ybS9Gb3JtLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybUhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvZm9ybS9Gb3JtVmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvaW5saW5lLXdpZGdldC9JbmxpbmVXaWRnZXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvaW5saW5lLXdpZGdldC9JbmxpbmVXaWRnZXRIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2lubGluZS13aWRnZXQvSW5saW5lV2lkZ2V0Vmlldy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC90YWJzLXdpZGdldC9UYWJzV2lkZ2V0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L3RhYnMtd2lkZ2V0L1RhYnNXaWRnZXRIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L3RhYnMtd2lkZ2V0L1RhYnNXaWRnZXRWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9sb2dnaW5nfHN5bmMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUE4QztBQUNBO0FBQ1E7QUFDTjtBQUNNO0FBQ2Q7QUFDRDtBQUNZO0FBSzFCO0FBRXpCLE1BQU0sU0FBUyxHQUFHLGlFQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLFNBQVMsRUFBRTtRQUNULFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcHBCYXIgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0FwcEJhclwiO1xuaW1wb3J0IERyYXdlciBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvRHJhd2VyXCI7XG5pbXBvcnQgeyBtYWtlU3R5bGVzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiO1xuaW1wb3J0IFRvb2xiYXIgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1Rvb2xiYXJcIjtcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UeXBvZ3JhcGh5XCI7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyBNdWlCdXR0b24gfSBmcm9tIFwiLi9jb21wb25lbnRzL011aUJ1dHRvblwiO1xuaW1wb3J0IHtcbiAgTXVpTmVzdGVkTWVudUNoaWxkLFxuICBNdWlOZXN0ZWRNZW51UHJvcHMsXG4gIE11aU5lc3RlZE1lbnUsXG59IGZyb20gXCIuL011aU5lc3RlZE1lbnVcIjtcblxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcyh0aGVtZSA9PiAoe1xuICBjb250YWluZXI6IHtcbiAgICBtYXJnaW5Ub3A6IHRoZW1lLnNwYWNpbmcoMiksXG4gIH0sXG4gIGRyYXdlcjoge1xuICAgIG1pbldpZHRoOiAyNTAsXG4gIH0sXG4gIHJvb3Q6IHt9LFxuICB0aXRsZToge1xuICAgIGZsZXhHcm93OiAxLFxuICB9LFxuICBcIkBnbG9iYWxcIjoge1xuICAgIGJvZHk6IHtcbiAgICAgIG1hcmdpbjogMCxcbiAgICB9LFxuICB9LFxufSkpO1xuXG5leHBvcnQgdHlwZSBNdWlBZG1pblByb3BzID0ge1xuICBjaGlsZHJlbj87XG4gIG1lbnU/OiBSZWNvcmQ8c3RyaW5nLCBNdWlOZXN0ZWRNZW51UHJvcHM+O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aUFkbWluKHsgY2hpbGRyZW4sIG1lbnUgfTogTXVpQWRtaW5Qcm9wcykge1xuICBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKCk7XG4gIGNvbnN0IFtpc01lbnVPcGVuLCBzZXRNZW51XSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMucm9vdH0+XG4gICAgICA8QXBwQmFyIHBvc2l0aW9uPXtcInN0YXRpY1wifT5cbiAgICAgICAgPFRvb2xiYXI+XG4gICAgICAgICAgPE11aUJ1dHRvblxuICAgICAgICAgICAgaWNvbk9ubHlcbiAgICAgICAgICAgIGljb249e3JlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvTWVudVwiKX1cbiAgICAgICAgICAgIGVkZ2U9e1wic3RhcnRcIn1cbiAgICAgICAgICAgIGNvbG9yPVwiaW5oZXJpdFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldE1lbnUodHJ1ZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFR5cG9ncmFwaHk+e0xhbmdgQURNSU5gfTwvVHlwb2dyYXBoeT5cbiAgICAgICAgPC9Ub29sYmFyPntcIiBcIn1cbiAgICAgICAgPERyYXdlciBvcGVuPXtpc01lbnVPcGVufSBrZWVwTW91bnRlZCBvbkNsb3NlPXsoKSA9PiBzZXRNZW51KGZhbHNlKX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuZHJhd2VyfT5cbiAgICAgICAgICAgIDxNdWlOZXN0ZWRNZW51IGNoaWxkcmVuPXttZW51fHx7fX0gIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvRHJhd2VyPlxuICAgICAgPC9BcHBCYXI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5jb250YWluZXJ9PntjaGlsZHJlbn08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiIsImltcG9ydCBDb2xsYXBzZSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvQ29sbGFwc2VcIjtcbmltcG9ydCBfTGlzdCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvTGlzdFwiO1xuaW1wb3J0IExpc3RJdGVtIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbVwiO1xuaW1wb3J0IExpc3RJdGVtSWNvbiBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvTGlzdEl0ZW1JY29uXCI7XG5pbXBvcnQgTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uXCI7XG5pbXBvcnQgTGlzdEl0ZW1UZXh0IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbVRleHRcIjtcbmltcG9ydCB7IG1ha2VTdHlsZXMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCI7XG5pbXBvcnQgY2xzeCBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IFJlYWN0LCB7IERpc3BhdGNoLCBSZWFjdE5vZGUsIFNldFN0YXRlQWN0aW9uLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaGFzS2V5cyB9IGZyb20gXCIuLi8uLi9jb21tb24vb2JqZWN0L2hhc0tleXNcIjtcbmltcG9ydCB7IG1hcE9iamVjdFRvQXJyYXkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RUb0FycmF5XCI7XG5pbXBvcnQgeyBJbW11dGFibGVSZWNvcmQsIEltbXV0YWJsZVNldCB9IGZyb20gXCIuLi8uLi9pbW11dGFibGUyXCI7XG5pbXBvcnQgeyBMYW5nS2V5IH0gZnJvbSBcIi4uLy4uL2xhbmcvTGFuZ0tleVwiO1xuaW1wb3J0IHsgU3RhdGVQcm9wcyB9IGZyb20gXCIuLi8uLi9yZWFjdC9zdGF0ZUhlbHBlcnNcIjtcbmltcG9ydCB7IHBhcnRpYWxQcm9wcyB9IGZyb20gXCIuLi8uLi9yZWFjdC91dGlscy9wYXJ0aWFsUHJvcHNcIjtcbmltcG9ydCB7IE11aUljb24gfSBmcm9tIFwiLi9jb21wb25lbnRzL011aUljb25cIjtcblxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcyh0aGVtZSA9PiAoe1xuICBuZXN0ZWQ6IHtcbiAgICBwYWRkaW5nTGVmdDogdGhlbWUuc3BhY2luZyg0KSxcbiAgfSxcblxuICBpdGVtV2l0aENoaWxkVGV4dDoge30sXG4gIHBhcmVudDoge1xuICAgIC8vIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLFxuICB9LFxuICBsaXN0SXRlbVRleHQ6IHtcbiAgICBmb250U2l6ZTogdGhlbWUudHlwb2dyYXBoeS5mb250U2l6ZSxcbiAgfSxcbn0pKTtcbmNvbnN0IExpc3QgPSBwYXJ0aWFsUHJvcHMoX0xpc3QsIHtcbiAgLy8gZGVuc2U6IHRydWUsXG59KTtcblxuZXhwb3J0IHR5cGUgTXVpTmVzdGVkTWVudVByb3BzID0ge1xuICB0aXRsZT86IFJlYWN0Tm9kZTtcbiAgaWNvbj86IE11aUljb247XG4gIG9uQ2xpY2s/KCk7XG4gIGNoaWxkcmVuPzogUmVjb3JkPHN0cmluZywgTXVpTmVzdGVkTWVudVByb3BzPjtcbn07XG5cbmNsYXNzIE11aU5lc3RlZE1lbnVTdGF0ZSBleHRlbmRzIEltbXV0YWJsZVJlY29yZCh7XG4gIHNlbGVjdGVkUGF0aDogXCJcIixcbn0pIHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlOZXN0ZWRNZW51KHtcbiAgY2hpbGRyZW4sXG59OiB7XG4gIGNoaWxkcmVuOiBSZWNvcmQ8c3RyaW5nLCBNdWlOZXN0ZWRNZW51UHJvcHM+O1xufSkge1xuICBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKCk7XG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoKCkgPT4gbmV3IE11aU5lc3RlZE1lbnVTdGF0ZSgpKTtcblxuICByZXR1cm4gKFxuICAgIDxMaXN0PlxuICAgICAge21hcE9iamVjdFRvQXJyYXkoY2hpbGRyZW4sIChjaGlsZCwga2V5KSA9PiAoXG4gICAgICAgIDxNdWlOZXN0ZWRNZW51Q2hpbGRcbiAgICAgICAgICB7Li4uY2hpbGR9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgbWVudVBhdGg9e2tleX1cbiAgICAgICAgICBtZW51S2V5PXtrZXl9XG4gICAgICAgICAgZGVwdGg9ezB9XG4gICAgICAgICAgY2xhc3Nlcz17Y2xhc3Nlc31cbiAgICAgICAgICBzdGF0ZT17c3RhdGV9XG4gICAgICAgICAgc2V0U3RhdGU9e3NldFN0YXRlfVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgPC9MaXN0PlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTXVpTmVzdGVkTWVudUNoaWxkKHtcbiAgY2hpbGRyZW4sXG4gIHRpdGxlLFxuICBpY29uLFxuICBvbkNsaWNrLFxuICBkZXB0aCxcbiAgbWVudVBhdGgsXG4gIG1lbnVLZXksXG4gIC4uLnByb3BzXG59OiBNdWlOZXN0ZWRNZW51UHJvcHMgJlxuICBTdGF0ZVByb3BzPE11aU5lc3RlZE1lbnVTdGF0ZT4gJiB7XG4gICAgbWVudVBhdGg6IHN0cmluZztcbiAgICBkZXB0aDogbnVtYmVyO1xuICAgIG1lbnVLZXk6IHN0cmluZztcbiAgICBjbGFzc2VzOiBSZXR1cm5UeXBlPHR5cGVvZiB1c2VTdHlsZXM+O1xuICB9KSB7XG4gIGNvbnN0IFtpc09wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCB7IGNsYXNzZXMsIHNldFN0YXRlLCBzdGF0ZSB9ID0gcHJvcHM7XG5cbiAgY29uc3QgaXRlbUljb24gPSA8TGlzdEl0ZW1JY29uPntNdWlJY29uKGljb24pfTwvTGlzdEl0ZW1JY29uPjtcblxuICBjb25zdCBoYXNDaGlsZHJlbiA9IGhhc0tleXMoY2hpbGRyZW4pO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxMaXN0SXRlbVxuICAgICAgICBidXR0b25cbiAgICAgICAgc2VsZWN0ZWQ9e3N0YXRlLnNlbGVjdGVkUGF0aCA9PT0gbWVudVBhdGh9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBzZXRTdGF0ZShzdGF0ZS5zZXQoXCJzZWxlY3RlZFBhdGhcIiwgbWVudVBhdGgpKTtcbiAgICAgICAgICBvbkNsaWNrPy4oKTtcbiAgICAgICAgICBpZiAoaGFzQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHNldE9wZW4oIWlzT3Blbik7XG4gICAgICAgICAgfVxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7aXRlbUljb259XG4gICAgICAgIDxMaXN0SXRlbVRleHRcbiAgICAgICAgICBwcmltYXJ5VHlwb2dyYXBoeVByb3BzPXt7XG4gICAgICAgICAgICBjbGFzc05hbWU6IGNsc3goXG4gICAgICAgICAgICAgIGNsYXNzZXMubGlzdEl0ZW1UZXh0LFxuICAgICAgICAgICAgICBoYXNLZXlzKGNoaWxkcmVuKSAmJiBjbGFzc2VzLnBhcmVudFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPExhbmdLZXkgZm9yPXttZW51S2V5fT57dGl0bGV9PC9MYW5nS2V5PlxuICAgICAgICA8L0xpc3RJdGVtVGV4dD5cblxuICAgICAgICA8TGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24+XG4gICAgICAgICAge2hhc0NoaWxkcmVuICYmXG4gICAgICAgICAgICBNdWlJY29uKFxuICAgICAgICAgICAgICBpc09wZW5cbiAgICAgICAgICAgICAgICA/IHJlcXVpcmUoYEBtYXRlcmlhbC11aS9pY29ucy9FeHBhbmRMZXNzYClcbiAgICAgICAgICAgICAgICA6IHJlcXVpcmUoYEBtYXRlcmlhbC11aS9pY29ucy9FeHBhbmRNb3JlYClcbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24+XG4gICAgICA8L0xpc3RJdGVtPlxuICAgICAge2lzT3BlbiAmJiAoXG4gICAgICAgIDxDb2xsYXBzZSBpbj5cbiAgICAgICAgICA8TGlzdCBkaXNhYmxlUGFkZGluZyBjbGFzc05hbWU9e2Nsc3goZGVwdGggPiAwICYmIGNsYXNzZXMubmVzdGVkKX0+XG4gICAgICAgICAgICB7bWFwT2JqZWN0VG9BcnJheShjaGlsZHJlbiB8fCB7fSwgKGNoaWxkUHJvcHMsIGtleSkgPT4gKFxuICAgICAgICAgICAgICA8TXVpTmVzdGVkTWVudUNoaWxkXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIGRlcHRoPXtkZXB0aCArIDF9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgbWVudVBhdGg9e21lbnVQYXRoICsgXCIvXCIgKyBrZXl9XG4gICAgICAgICAgICAgICAgbWVudUtleT17a2V5fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHt9fVxuICAgICAgICAgICAgICAgIHsuLi5jaGlsZFByb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9MaXN0PlxuICAgICAgICA8L0NvbGxhcHNlPlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn1cbiIsImltcG9ydCBCdXR0b24sIHsgQnV0dG9uUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvQnV0dG9uXCI7XG5pbXBvcnQgSWNvbkJ1dHRvbiwgeyBJY29uQnV0dG9uUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvSWNvbkJ1dHRvblwiO1xuaW1wb3J0IFRvb2x0aXAsIHsgVG9vbHRpcFByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1Rvb2x0aXBcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50VHlwZSxcbiAgY3JlYXRlRWxlbWVudCxcbiAgUmVhY3RFbGVtZW50LFxuICBSZWFjdE5vZGUsXG4gIHVzZVJlZixcbiAgdXNlU3RhdGUsXG59IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRm4sIE92ZXJyaWRlLCBQbHVja1JlcXVpcmVkIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBMYW5nIH0gZnJvbSBcIi4uLy4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgdXBkYXRlUmVmIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L0hvb2tSZWZcIjtcbmltcG9ydCB7IHBhcnRpYWxQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9wYXJ0aWFsUHJvcHNcIjtcbmltcG9ydCB7IE11aUljb24gfSBmcm9tIFwiLi9NdWlJY29uXCI7XG5cbmV4cG9ydCB0eXBlIE11aUJ1dHRvblByb3BzPFAgPSB7fT4gPVxuICB8IE92ZXJyaWRlPEJ1dHRvblByb3BzLCBCYXNlUHJvcHMgJiBQPlxuICB8IE92ZXJyaWRlPEljb25CdXR0b25Qcm9wcywgQmFzZVByb3BzICYgUD47XG5cbnR5cGUgQmFzZVByb3BzID0ge1xuICBCdXR0b25Qcm9wcz86IEJ1dHRvblByb3BzO1xuICBJY29uQnV0dG9uUHJvcHM/OiBJY29uQnV0dG9uUHJvcHM7XG4gIHJlbmRlck9uQ2xpY2s/KGNsb3NlOiAoKSA9PiB2b2lkLCBnZXRFbDogKCkgPT4gYW55KTogUmVhY3RFbGVtZW50O1xuICBkaXNhYmxlVG9vbHRpcD86IGJvb2xlYW47XG4gIGljb25Pbmx5PzogYm9vbGVhbjtcbiAgVG9vbHRpcFByb3BzPzogUGFydGlhbDxUb29sdGlwUHJvcHM+O1xuICBkYW5nZXI/OiBib29sZWFuO1xuICBpY29uPzogTXVpSWNvbjtcbiAgdGl0bGU/OiBSZWFjdE5vZGU7XG4gIGJ1dHRvblR5cGU/OiBDb21wb25lbnRUeXBlPE11aUJ1dHRvblByb3BzPjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlCdXR0b24ocHJvcHM6IE11aUJ1dHRvblByb3BzKSB7XG4gIGlmIChwcm9wcy5idXR0b25UeXBlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQocHJvcHMuYnV0dG9uVHlwZSwge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBidXR0b25UeXBlOiB1bmRlZmluZWQsXG4gICAgfSk7XG4gIH1cblxuICBsZXQge1xuICAgIEJ1dHRvblByb3BzLFxuICAgIEljb25CdXR0b25Qcm9wcyxcbiAgICByZW5kZXJPbkNsaWNrLFxuICAgIFRvb2x0aXBQcm9wcyxcbiAgICBkaXNhYmxlVG9vbHRpcCxcbiAgICBpY29uT25seSxcbiAgICBidXR0b25SZWY6IGluaXRCdXR0b25SZWYsXG4gICAgYnV0dG9uVHlwZSxcbiAgICAuLi5idXR0b25Qcm9wc1xuICB9OiBNdWlCdXR0b25Qcm9wcyA9IHByb3BzO1xuXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgYnV0dG9uUmVmID0gdXNlUmVmPHVua25vd24+KG51bGwpO1xuICBsZXQgZWxlbWVudDogUmVhY3RFbGVtZW50O1xuXG4gIGxldCB0eXBlOiBDb21wb25lbnRUeXBlO1xuICBpZiAoaWNvbk9ubHkpIHtcbiAgICB0eXBlID0gSWNvbkJ1dHRvbjtcbiAgICBidXR0b25Qcm9wcyA9IHtcbiAgICAgIC4uLmJ1dHRvblByb3BzLFxuICAgICAgLi4uSWNvbkJ1dHRvblByb3BzLFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgdHlwZSA9IEJ1dHRvbjtcbiAgICBidXR0b25Qcm9wcyA9IHtcbiAgICAgIC4uLmJ1dHRvblByb3BzLFxuICAgICAgLi4uQnV0dG9uUHJvcHMsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdGl0bGUsIGRhbmdlciwgaWNvbiwgb25DbGljaywgLi4uZWxlbWVudFByb3BzIH0gPSBidXR0b25Qcm9wcyBhcyBhbnk7XG4gIGlmIChkYW5nZXIpIHtcbiAgICBlbGVtZW50UHJvcHMuY29sb3IgPSBcInNlY29uZGFyeVwiO1xuICB9XG4gIGVsZW1lbnRQcm9wcy5idXR0b25SZWYgPSBjdXJyZW50ID0+IHtcbiAgICB1cGRhdGVSZWYoaW5pdEJ1dHRvblJlZiwgY3VycmVudCk7XG4gICAgdXBkYXRlUmVmKGJ1dHRvblJlZiwgY3VycmVudCk7XG4gIH07XG4gIGVsZW1lbnRQcm9wcy5vbkNsaWNrID0gZXZlbnQgPT4ge1xuICAgIG9uQ2xpY2s/LihldmVudCk7XG4gICAgc2V0T3Blbih0cnVlKTtcbiAgfTtcblxuICBpZiAoaWNvbk9ubHkpIHtcbiAgICBlbGVtZW50UHJvcHMuY2hpbGRyZW4gPSBNdWlJY29uKGljb24pO1xuICB9IGVsc2Uge1xuICAgIGVsZW1lbnRQcm9wcy5lbmRJY29uID0gTXVpSWNvbihpY29uKTtcbiAgICBlbGVtZW50UHJvcHMuY2hpbGRyZW4gPSB0aXRsZTtcbiAgfVxuXG4gIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHR5cGUsIGVsZW1lbnRQcm9wcyk7XG5cbiAgaWYgKCh0aXRsZSB8fCBUb29sdGlwUHJvcHMpICYmICFkaXNhYmxlVG9vbHRpcCkge1xuICAgIGVsZW1lbnQgPSAoXG4gICAgICA8VG9vbHRpcCB0aXRsZT17dGl0bGV9IHsuLi5Ub29sdGlwUHJvcHN9PlxuICAgICAgICB7ZWxlbWVudH1cbiAgICAgIDwvVG9vbHRpcD5cbiAgICApO1xuICB9XG5cbiAgaWYgKG9wZW4pIHtcbiAgICBlbGVtZW50ID0gKFxuICAgICAgPD5cbiAgICAgICAge2VsZW1lbnR9XG4gICAgICAgIHtyZW5kZXJPbkNsaWNrPy4oXG4gICAgICAgICAgKCkgPT4gc2V0T3BlbihmYWxzZSksXG4gICAgICAgICAgKCkgPT4gYnV0dG9uUmVmLmN1cnJlbnQhXG4gICAgICAgICl9XG4gICAgICA8Lz5cbiAgICApO1xuICB9XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5leHBvcnQgY29uc3QgTXVpQ2FuY2VsQnV0dG9uID0gcGFydGlhbFByb3BzKE11aUJ1dHRvbiwge1xuICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0NhbmNlbFwiKSxcbiAgdGl0bGU6IExhbmdgQ0FOQ0VMYCxcbn0pO1xuXG5leHBvcnQgY29uc3QgTXVpQ29uZmlybUJ1dHRvbiA9IHBhcnRpYWxQcm9wcyhNdWlCdXR0b24sIHtcbiAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9Eb25lXCIpLFxuICB0aXRsZTogTGFuZ2BDT05GSVJNYCxcbn0pO1xuXG5leHBvcnQgY29uc3QgTXVpUmVzZXRCdXR0b24gPSBwYXJ0aWFsUHJvcHMoTXVpQnV0dG9uLCB7XG4gIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvQ2xlYXJcIiksXG4gIHRpdGxlOiBMYW5nYFJFU0VUYCxcbn0pO1xuXG5leHBvcnQgY29uc3QgTXVpQ2xvc2VCdXR0b24gPSBwYXJ0aWFsUHJvcHMoTXVpQnV0dG9uLCB7XG4gIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvQ2xvc2VcIiksXG4gIHRpdGxlOiBMYW5nYENMT1NFYCxcbn0pO1xuXG5leHBvcnQgY29uc3QgTXVpQWRkQnV0dG9uID0gcGFydGlhbFByb3BzKE11aUJ1dHRvbiwge1xuICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0FkZFwiKSxcbiAgdGl0bGU6IExhbmdgQUREYCxcbn0pO1xuXG5leHBvcnQgY29uc3QgTXVpU3VibWl0QnV0dG9uID0gcGFydGlhbFByb3BzKE11aUJ1dHRvbiwge1xuICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL1NlbmRcIiksXG4gIHRpdGxlOiBMYW5nYFN1Ym1pdGAsXG59KTtcblxuZXhwb3J0IGNvbnN0IE11aUVkaXRCdXR0b24gPSBwYXJ0aWFsUHJvcHMoTXVpQnV0dG9uLCB7XG4gIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvRWRpdFwiKSxcbiAgdGl0bGU6IExhbmdgRURJVGAsXG59KTtcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgbWVyZ2VQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9tZXJnZVByb3BzXCI7XG5pbXBvcnQgeyBNdWlCdXR0b24sIE11aUJ1dHRvblByb3BzIH0gZnJvbSBcIi4vTXVpQnV0dG9uXCI7XG5pbXBvcnQgeyBNdWlEYW5nZXJEaWFsb2csIE11aURhbmdlckRpYWxvZ1Byb3BzIH0gZnJvbSBcIi4vTXVpRGFuZ2VyRGlhbG9nXCI7XG5cbmV4cG9ydCB0eXBlIE11aURhbmdlckJ1dHRvblByb3BzID0gTXVpQnV0dG9uUHJvcHM8e1xuICBNdWlEYW5nZXJEaWFsb2dQcm9wcz86IFBhcnRpYWw8TXVpRGFuZ2VyRGlhbG9nUHJvcHM+O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlEYW5nZXJCdXR0b24oe1xuICBNdWlEYW5nZXJEaWFsb2dQcm9wcyxcbiAgb25DbGljayxcbiAgLi4ucHJvcHNcbn06IE11aURhbmdlckJ1dHRvblByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPE11aUJ1dHRvblxuICAgICAgZGFuZ2VyXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICByZW5kZXJPbkNsaWNrPXsoY2xvc2UpID0+IChcbiAgICAgICAgPE11aURhbmdlckRpYWxvZ1xuICAgICAgICAgIHsuLi5tZXJnZVByb3BzKE11aURhbmdlckRpYWxvZ1Byb3BzLCB7XG4gICAgICAgICAgICBvbkNhbmNlbDogKCkgPT4gY2xvc2UoKSxcbiAgICAgICAgICAgIG9uQ29uZmlybTogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICAgIG9uQ2xpY2s/LihldmVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pfVxuICAgICAgICAgIG9wZW5cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgLz5cbiAgKTtcbn1cbiIsImltcG9ydCBUeXBvZ3JhcGh5LCB7IFR5cG9ncmFwaHlQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UeXBvZ3JhcGh5XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTXVpRGlhbG9nLCBNdWlEaWFsb2dQcm9wcyB9IGZyb20gXCIuL011aURpYWxvZ1wiO1xuaW1wb3J0IHsgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IExhbmcsIExhbmdOb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgUmVhY3RDYWxsYmFjayB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC9SZWFjdENhbGxiYWNrXCI7XG5pbXBvcnQgeyBNdWlCdXR0b24sIE11aUNhbmNlbEJ1dHRvbiwgTXVpQ29uZmlybUJ1dHRvbiB9IGZyb20gXCIuL011aUJ1dHRvblwiO1xuXG5leHBvcnQgdHlwZSBNdWlEYW5nZXJEaWFsb2dQcm9wcyA9IE92ZXJyaWRlPFxuICBNdWlEaWFsb2dQcm9wcyxcbiAge1xuICAgIFR5cG9ncmFwaHlQcm9wcz86IFR5cG9ncmFwaHlQcm9wcztcblxuICAgIGFjdGlvblRpdGxlPzogTGFuZ05vZGU7XG4gICAgdGl0bGU/OiBSZWFjdE5vZGU7XG4gICAgb2JqZWN0VGl0bGU/OiBMYW5nTm9kZTtcbiAgICB0ZXh0PzogUmVhY3ROb2RlO1xuXG4gICAgb25DYW5jZWw/OiBSZWFjdENhbGxiYWNrO1xuICAgIG9uQ29uZmlybT86IFJlYWN0Q2FsbGJhY2s7XG4gIH1cbj47XG5jb25zdCBERUZBVUxUX1RJVExFID0gTGFuZ2BDT05GSVJNX1RPXyR7XCJhY3Rpb25cIn1gO1xuY29uc3QgREVGQVVMVF9URVhUID0gTGFuZ2BZT1VfQVJFX1NVUkVfWU9VX1dBTlRfVE9fJHtcImFjdGlvblwifV8ke1wib2JqZWN0XCJ9P2A7XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlEYW5nZXJEaWFsb2coe1xuICBvbkNhbmNlbCxcbiAgb25Db25maXJtLFxuICBhY3Rpb25UaXRsZSxcbiAgb2JqZWN0VGl0bGUsXG4gIHRpdGxlLFxuICB0ZXh0LFxuICBUeXBvZ3JhcGh5UHJvcHMsXG4gIC4uLk11aURpYWxvZ1Byb3BzXG59OiBNdWlEYW5nZXJEaWFsb2dQcm9wcykge1xuICBjb25zdCBhY3Rpb24gPSBhY3Rpb25UaXRsZSA/PyBMYW5nYEFDVElPTmA7XG4gIHJldHVybiAoXG4gICAgPE11aURpYWxvZ1xuICAgICAgey4uLk11aURpYWxvZ1Byb3BzfVxuICAgICAgdGl0bGU9e3RpdGxlID8/IERFRkFVTFRfVElUTEUoeyBhY3Rpb24gfSl9XG4gICAgICBhY3Rpb25zPXtcbiAgICAgICAgPD5cbiAgICAgICAgICA8TXVpQ2FuY2VsQnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgb25DYW5jZWw/LihldmVudCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPE11aUNvbmZpcm1CdXR0b25cbiAgICAgICAgICAgIGRhbmdlclxuICAgICAgICAgICAgdGl0bGU9e0xhbmdgQ09ORklSTWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgb25Db25maXJtPy4oZXZlbnQpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8Lz5cbiAgICAgIH0+XG4gICAgICA8VHlwb2dyYXBoeSB7Li4uVHlwb2dyYXBoeVByb3BzfT5cbiAgICAgICAge3RleHQgPz9cbiAgICAgICAgICBERUZBVUxUX1RFWFQoe1xuICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgb2JqZWN0OiBvYmplY3RUaXRsZSA/PyBMYW5nYE9CSkVDVGAsXG4gICAgICAgICAgfSl9XG4gICAgICA8L1R5cG9ncmFwaHk+XG4gICAgPC9NdWlEaWFsb2c+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNdWlEYW5nZXJCdXR0b24sIE11aURhbmdlckJ1dHRvblByb3BzIH0gZnJvbSBcIi4vTXVpRGFuZ2VyQnV0dG9uXCI7XG5pbXBvcnQgeyBPdmVycmlkZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgTGFuZywgTGFuZ05vZGUgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyBtZXJnZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL21lcmdlUHJvcHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aURlbGV0ZUJ1dHRvbih7XG4gIG9iamVjdFRpdGxlLFxuICAuLi5wcm9wc1xufTogT3ZlcnJpZGU8XG4gIE11aURhbmdlckJ1dHRvblByb3BzLFxuICB7XG4gICAgb2JqZWN0VGl0bGU/OiBMYW5nTm9kZTtcbiAgfVxuPikge1xuICByZXR1cm4gKFxuICAgIDxNdWlEYW5nZXJCdXR0b25cbiAgICAgIGljb249e3JlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvRGVsZXRlXCIpfVxuICAgICAgdGl0bGU9e0xhbmdgREVMRVRFYH1cbiAgICAgIHsuLi5tZXJnZVByb3BzKHByb3BzLCB7XG4gICAgICAgIE11aURhbmdlckRpYWxvZ1Byb3BzOiB7XG4gICAgICAgICAgb2JqZWN0VGl0bGUsXG4gICAgICAgICAgYWN0aW9uVGl0bGU6IExhbmdgREVMRVRFYCxcbiAgICAgICAgfSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59XG4iLCJpbXBvcnQgRGlhbG9nLCB7IERpYWxvZ1Byb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0RpYWxvZ1wiO1xuaW1wb3J0IERpYWxvZ0FjdGlvbnMsIHtcbiAgRGlhbG9nQWN0aW9uc1Byb3BzLFxufSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nQWN0aW9uc1wiO1xuaW1wb3J0IERpYWxvZ0NvbnRlbnQsIHtcbiAgRGlhbG9nQ29udGVudFByb3BzLFxufSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nQ29udGVudFwiO1xuaW1wb3J0IERpYWxvZ1RpdGxlLCB7IERpYWxvZ1RpdGxlUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nVGl0bGVcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICBNdWlCdXR0b24sXG4gIE11aUJ1dHRvblByb3BzLFxuICBNdWlDYW5jZWxCdXR0b24sXG4gIE11aVN1Ym1pdEJ1dHRvbixcbn0gZnJvbSBcIi4vTXVpQnV0dG9uXCI7XG5cbmltcG9ydCB7IG1lcmdlUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvbWVyZ2VQcm9wc1wiO1xuXG5leHBvcnQgdHlwZSBNdWlEaWFsb2dQcm9wcyA9IE9taXQ8RGlhbG9nUHJvcHMsIFwidGl0bGVcIj4gJiB7XG4gIGNvbnRlbnQ/OiBSZWFjdE5vZGU7XG4gIGFjdGlvbnM/OiBSZWFjdE5vZGU7XG4gIHRpdGxlPzogUmVhY3ROb2RlO1xuICBEaWFsb2dDb250ZW50UHJvcHM/OiBEaWFsb2dDb250ZW50UHJvcHM7XG4gIERpYWxvZ0FjdGlvbnNQcm9wcz86IERpYWxvZ0FjdGlvbnNQcm9wcztcbiAgRGlhbG9nVGl0bGVQcm9wcz86IERpYWxvZ1RpdGxlUHJvcHM7XG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuXG4gIE11aVN1Ym1pdEJ1dHRvbnNQcm9wcz86IE11aUJ1dHRvblByb3BzO1xuICBNdWlDYW5jZWxCdXR0b25Qcm9wcz86IE11aUJ1dHRvblByb3BzO1xuICBvblN1Ym1pdD8oKTogdm9pZDtcbiAgb25DYW5jZWw/KCk6IHZvaWQ7XG5cbiAgLy8gTXVpQWN0aW9uc1Byb3BzPzogTXVpQWN0aW9uc1Byb3BzPEMsXCJzdWJtaXRcInxcImNhbmNlbFwiPlxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aURpYWxvZyh7XG4gIGNvbnRlbnQsXG4gIGFjdGlvbnMsXG4gIHRpdGxlLFxuICBjaGlsZHJlbixcbiAgRGlhbG9nQ29udGVudFByb3BzLFxuICBEaWFsb2dBY3Rpb25zUHJvcHMsXG4gIERpYWxvZ1RpdGxlUHJvcHMsXG4gIG9uQ2FuY2VsLFxuICBvblN1Ym1pdCxcbiAgTXVpQ2FuY2VsQnV0dG9uUHJvcHMsXG4gIE11aVN1Ym1pdEJ1dHRvbnNQcm9wcyxcbiAgLi4uRGlhbG9nUHJvcHNcbn06IE11aURpYWxvZ1Byb3BzKSB7XG4gIGlmIChvbkNhbmNlbCB8fCBvblN1Ym1pdCkge1xuICAgIGFjdGlvbnMgPSAoXG4gICAgICA8PlxuICAgICAgICB7b25TdWJtaXQgJiYgKFxuICAgICAgICAgIDxNdWlTdWJtaXRCdXR0b25cbiAgICAgICAgICAgIHsuLi5tZXJnZVByb3BzKE11aVN1Ym1pdEJ1dHRvbnNQcm9wcywge1xuICAgICAgICAgICAgICBvbkNsaWNrKCkge1xuICAgICAgICAgICAgICAgIG9uU3VibWl0KCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7YWN0aW9uc31cbiAgICAgICAge29uQ2FuY2VsICYmIChcbiAgICAgICAgICA8TXVpQ2FuY2VsQnV0dG9uXG4gICAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhNdWlDYW5jZWxCdXR0b25Qcm9wcywge1xuICAgICAgICAgICAgICBvbkNsaWNrKCkge1xuICAgICAgICAgICAgICAgIG9uQ2FuY2VsKCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxuICByZXR1cm4gKFxuICAgIDxEaWFsb2cgey4uLkRpYWxvZ1Byb3BzfT5cbiAgICAgIHt0aXRsZSAmJiA8RGlhbG9nVGl0bGUgey4uLkRpYWxvZ1RpdGxlUHJvcHN9Pnt0aXRsZX08L0RpYWxvZ1RpdGxlPn1cbiAgICAgIHsoY29udGVudCB8fCBjaGlsZHJlbikgJiYgKFxuICAgICAgICA8RGlhbG9nQ29udGVudCB7Li4uRGlhbG9nQ29udGVudFByb3BzfT5cbiAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvRGlhbG9nQ29udGVudD5cbiAgICAgICl9XG4gICAgICB7YWN0aW9ucyAmJiAoXG4gICAgICAgIDxEaWFsb2dBY3Rpb25zIHsuLi5EaWFsb2dBY3Rpb25zUHJvcHN9PnthY3Rpb25zfTwvRGlhbG9nQWN0aW9ucz5cbiAgICAgICl9XG4gICAgPC9EaWFsb2c+XG4gICk7XG59XG4iLCJpbXBvcnQgR3JpZCwge0dyaWRQcm9wc30gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0dyaWRcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiOyBpbXBvcnQge0NoaWxkcmVufSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IHR5cGUgTXVpR3JpZFByb3BzID0geyBpdGVtPzogR3JpZFByb3BzIH0gJiBPbWl0PEdyaWRQcm9wcywgXCJpdGVtXCIgfCBcImNvbnRhaW5lclwiPjtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aUdyaWQoe2l0ZW0sIGNoaWxkcmVuLCAuLi5wcm9wc306IE11aUdyaWRQcm9wcykge1xuICAgIHJldHVybiA8R3JpZCB7Li4ucHJvcHN9IGNvbnRhaW5lcj5cbiAgICAgICAge0NoaWxkcmVuLm1hcChjaGlsZHJlbiwgY2hpbGQgPT4gPEdyaWQgey4uLml0ZW19IGl0ZW0+XG4gICAgICAgICAgICB7Y2hpbGR9XG4gICAgICAgIDwvR3JpZD4pfVxuICAgIDwvR3JpZD5cbn1cblxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDb21wb25lbnRDbGFzcywgY3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBFbXB0eUZyYWdtZW50IH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL0VtcHR5RnJhZ21lbnRcIjtcblxuY29uc3QgTXVpSWNvbk1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgc3VibWl0OiBcInNlbmRcIixcbiAgcmVzZXQ6IFwiY2xlYXJcIixcbn07XG5cbmV4cG9ydCB0eXBlIE11aUljb24gPSBzdHJpbmcgfCB7IGRlZmF1bHQ6IENvbXBvbmVudENsYXNzIH0gfCB1bmRlZmluZWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlJY29uKGFyZzogTXVpSWNvbik6IFJlYWN0RWxlbWVudCB7XG4gIGlmICh0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiBhcmcgPyAoXG4gICAgICA8aSBjbGFzc05hbWU9e1wibWF0ZXJpYWwtaWNvbnNcIn0+e011aUljb25NYXBbYXJnXSA/PyBhcmd9PC9pPlxuICAgICkgOiAoXG4gICAgICA8PjwvPlxuICAgICk7XG4gIGlmIChhcmc/LmRlZmF1bHQpIHJldHVybiBjcmVhdGVFbGVtZW50KGFyZy5kZWZhdWx0KTtcblxuICByZXR1cm4gRW1wdHlGcmFnbWVudDtcbn1cbiIsImltcG9ydCBMaW5rLCB7IExpbmtQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9MaW5rXCI7XG5pbXBvcnQgeyBtYWtlU3R5bGVzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9zdHlsZXNcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG1lcmdlUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvbWVyZ2VQcm9wc1wiO1xuXG5jb25zdCB1c2VTdHlsZXMgPSBtYWtlU3R5bGVzKHtcbiAgcm9vdDoge1xuICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gIH0sXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aUxpbmsocHJvcHM6IExpbmtQcm9wcykge1xuICBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKCk7XG4gIHJldHVybiAoXG4gICAgPExpbmtcbiAgICAgIHsuLi5tZXJnZVByb3BzKHByb3BzLCB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3Nlcy5yb290LFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn1cbiIsImltcG9ydCB7IFRhYmxlQ2VsbFByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlXCI7XG5pbXBvcnQgVGFibGVDZWxsIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UYWJsZUNlbGxcIjtcbmltcG9ydCB7IG1ha2VTdHlsZXMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL3N0eWxlc1wiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IG1lcmdlUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvbWVyZ2VQcm9wc1wiO1xuXG5jb25zdCB1c2VTdHlsZXMgPSBtYWtlU3R5bGVzKHtcbiAgZml0VG9Db250ZW50OiB7XG4gICAgd2lkdGg6IFwiMSVcIixcbiAgICB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiLFxuICB9LFxufSk7XG5cbmV4cG9ydCB0eXBlIE11aVRhYmxlQ29sdW1uUHJvcHMgPSBPdmVycmlkZTxcbiAgVGFibGVDZWxsUHJvcHMsXG4gIHtcbiAgICBmaXRUb0NvbnRlbnQ/OiBib29sZWFuO1xuICB9XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpVGFibGVDZWxsKHsgZml0VG9Db250ZW50LCAuLi5wcm9wcyB9OiBNdWlUYWJsZUNvbHVtblByb3BzKSB7XG4gIGNvbnN0IGNsYXNzZXMgPSB1c2VTdHlsZXMoKTtcbiAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXG4gICAgVGFibGVDZWxsLFxuICAgIG1lcmdlUHJvcHMocHJvcHMsIHtcbiAgICAgIGNsYXNzTmFtZTogY2xhc3Nlcy5maXRUb0NvbnRlbnQsXG4gICAgfSlcbiAgKTtcbn1cbiIsImltcG9ydCBHcmlkIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9HcmlkXCI7XG5pbXBvcnQgSW5wdXRBZG9ybm1lbnQgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0lucHV0QWRvcm5tZW50XCI7XG5pbXBvcnQgVGV4dEZpZWxkLCB7IFRleHRGaWVsZFByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1RleHRGaWVsZFwiO1xuaW1wb3J0IFRvb2xiYXIsIHsgVG9vbGJhclByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1Rvb2xiYXJcIjtcbmltcG9ydCBUb29sdGlwIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9Ub29sdGlwXCI7XG5pbXBvcnQgVHlwb2dyYXBoeSwgeyBUeXBvZ3JhcGh5UHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeVwiO1xuaW1wb3J0IHsgbWFrZVN0eWxlcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvc3R5bGVzXCI7XG5pbXBvcnQgY2xzeCBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdE5vZGUsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyB1c2VMYW5nVHJhbnNsYXRvciB9IGZyb20gXCIuLi8uLi8uLi9sYW5nL0xhbmdUcmFuc2xhdG9yXCI7XG5pbXBvcnQgeyBtZXJnZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL21lcmdlUHJvcHNcIjtcbmltcG9ydCB7IE11aUljb24gfSBmcm9tIFwiLi9NdWlJY29uXCI7XG5cbmNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXMoKHRoZW1lKSA9PiAoe1xuICB0b29sYmFyOiB7XG4gICAgcGFkZGluZ0xlZnQ6IHRoZW1lLnNwYWNpbmcoMiksXG4gICAgcGFkZGluZ1JpZ2h0OiB0aGVtZS5zcGFjaW5nKDEpLFxuICB9LFxuICB0aXRsZToge1xuICAgIGZsZXg6IFwiMSAxIDEwMCVcIixcbiAgfSxcbiAgaGlkZGVuOiB7XG4gICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIixcbiAgfSxcbn0pKTtcblxuZXhwb3J0IHR5cGUgTXVpVGFibGVUb29sYmFyUHJvcHMgPSB7XG4gIFRvb2xiYXJQcm9wcz86IFRvb2xiYXJQcm9wcztcblxuICBzZWFyY2g/OiB7XG4gICAgdGV4dDogc3RyaW5nO1xuICAgIG9uU2VhcmNoPyh0ZXh0OiBzdHJpbmcpO1xuICAgIFRleHRGaWVsZFByb3BzPzogUGFydGlhbDxUZXh0RmllbGRQcm9wcz47XG4gIH07XG5cbiAgdGl0bGU/OiBSZWFjdE5vZGU7XG5cbiAgVGl0bGVUeXBvZ3JhcGh5UHJvcHM/OiBUeXBvZ3JhcGh5UHJvcHM7XG5cbiAgc3RhdGljQWN0aW9ucz86IFJlYWN0Tm9kZTtcblxuICBzZWxlY3RBY3Rpb25zPzogUmVhY3ROb2RlO1xuXG4gIGNvdW50U2VsZWN0ZWRJdGVtcz86IG51bWJlcjtcbn07XG5cbmNvbnN0IENPVU5UX1NFTEVDVEVEX0lURU1TID0gTGFuZ2BTRUxFQ1RFRF8ke1wiY291bnRcIn1fSVRFTVNgO1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpVGFibGVUb29sYmFyKHByb3BzOiBNdWlUYWJsZVRvb2xiYXJQcm9wcykge1xuICBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKCk7XG4gIGNvbnN0IHsgc2VhcmNoOiBzZWFyY2hQcm9wcyB9ID0gcHJvcHM7XG5cbiAgY29uc3QgbGFuZyA9IHVzZUxhbmdUcmFuc2xhdG9yKCk7XG4gIGNvbnN0IFtzZWFyY2hUZXh0LCBzZXRTZWFyY2hUZXh0XSA9IHVzZVN0YXRlKHByb3BzLnNlYXJjaD8udGV4dCB8fCBcIlwiKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFNlYXJjaFRleHQocHJvcHMuc2VhcmNoPy50ZXh0IHx8IFwiXCIpO1xuICB9LCBbcHJvcHMuc2VhcmNoPy50ZXh0XSk7XG5cbiAgY29uc3QgdGl0bGUgPSBwcm9wcy5jb3VudFNlbGVjdGVkSXRlbXMgPyAoXG4gICAgPD57Q09VTlRfU0VMRUNURURfSVRFTVMoeyBjb3VudDogcHJvcHMuY291bnRTZWxlY3RlZEl0ZW1zIH0pfTwvPlxuICApIDogKFxuICAgIHByb3BzLnRpdGxlXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8VG9vbGJhclxuICAgICAgey4uLm1lcmdlUHJvcHMocHJvcHMuVG9vbGJhclByb3BzLCB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3Nlcy50b29sYmFyLFxuICAgICAgfSl9PlxuICAgICAgPEdyaWQgY29udGFpbmVyPlxuICAgICAgICA8R3JpZCBpdGVtIHhzPlxuICAgICAgICAgIHt0aXRsZSAmJiAoXG4gICAgICAgICAgICA8VHlwb2dyYXBoeVxuICAgICAgICAgICAgICB2YXJpYW50PXtcImg2XCJ9XG4gICAgICAgICAgICAgIHsuLi5tZXJnZVByb3BzKHByb3BzLlRpdGxlVHlwb2dyYXBoeVByb3BzLCB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc2VzLnRpdGxlLFxuICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICApfVxuICAgICAgICA8L0dyaWQ+XG4gICAgICAgIDxHcmlkIGl0ZW0+XG4gICAgICAgICAge3Byb3BzLmNvdW50U2VsZWN0ZWRJdGVtcyA/IChcbiAgICAgICAgICAgIHByb3BzLnNlbGVjdEFjdGlvbnNcbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEdyaWQgY29udGFpbmVyIGFsaWduSXRlbXM9J2NlbnRlcic+XG4gICAgICAgICAgICAgIHtwcm9wcy5zdGF0aWNBY3Rpb25zICYmIDxHcmlkIGl0ZW0+e3Byb3BzLnN0YXRpY0FjdGlvbnN9PC9HcmlkPn1cbiAgICAgICAgICAgICAge3NlYXJjaFByb3BzICYmIChcbiAgICAgICAgICAgICAgICA8R3JpZCBpdGVtPlxuICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNoVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhbmcudHJhbnNsYXRlTm9kZShMYW5nYFNFQVJDSGApfVxuICAgICAgICAgICAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhzZWFyY2hQcm9wcy5UZXh0RmllbGRQcm9wcywge1xuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWFyY2hUZXh0KHRleHQgfHwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hQcm9wcz8ub25TZWFyY2g/Lih0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hQcm9wcz8ub25TZWFyY2g/LihzZWFyY2hUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bjogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlYXJjaFRleHQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFByb3BzPy5vblNlYXJjaD8uKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgb25LZXlQcmVzczogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh7ZXZlbnRLZXk6ZXZlbnQua2V5fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFByb3BzPy5vblNlYXJjaD8uKHNlYXJjaFRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJFc2NhcGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWFyY2hUZXh0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgSW5wdXRQcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kQWRvcm5tZW50OiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEFkb3JubWVudCBwb3NpdGlvbj17XCJlbmRcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRvb2x0aXAgdGl0bGU9e0xhbmdgU0VBUkNIYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7TXVpSWNvbihcInNlYXJjaFwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1Rvb2x0aXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvSW5wdXRBZG9ybm1lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRBZG9ybm1lbnQ6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0QWRvcm5tZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbHN4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc2VzLmhpZGRlbl06ICFzZWFyY2hUZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uPXtcInN0YXJ0XCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VhcmNoVGV4dChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7TXVpSWNvbihcImNsb3NlXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0QWRvcm5tZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvR3JpZD5cbiAgICAgIDwvR3JpZD5cbiAgICA8L1Rvb2xiYXI+XG4gICk7XG59XG4iLCJpbXBvcnQge1xuICBjcmVhdGVNdWlUaGVtZSxcbiAgVGhlbWUgYXMgTXVpQ29yZVRoZW1lLFxuICBUaGVtZVByb3ZpZGVyIGFzIE11aUNvcmVUaGVtZVByb3ZpZGVyLFxufSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCI7XG5pbXBvcnQge1xuICBqc3NQcmVzZXQsXG4gIFN0eWxlc1Byb3ZpZGVyIGFzIE11aUpzc1Byb3ZpZGVyLFxufSBmcm9tIFwiQG1hdGVyaWFsLXVpL3N0eWxlc1wiO1xuaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSBcImpzc1wiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIGFzIFN0eWxlZFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwic3R5bGVkLWNvbXBvbmVudHNcIjtcbmltcG9ydCB7XG4gIExhbmdUcmFuc2xhdG9yLFxuICBMYW5nVHJhbnNsYXRvckNvbnRleHQsXG59IGZyb20gXCIuLi8uLi9sYW5nL0xhbmdUcmFuc2xhdG9yXCI7XG5cbmRlY2xhcmUgbW9kdWxlIFwiQG1hdGVyaWFsLXVpL3N0eWxlc1wiIHtcbiAgaW50ZXJmYWNlIERlZmF1bHRUaGVtZSBleHRlbmRzIE11aUNvcmVUaGVtZSB7fVxufVxuZGVjbGFyZSBtb2R1bGUgXCJzdHlsZWQtY29tcG9uZW50c1wiIHtcbiAgaW50ZXJmYWNlIERlZmF1bHRUaGVtZSBleHRlbmRzIE11aUNvcmVUaGVtZSB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTXVpU3lzdGVtKHtcbiAganNzUGx1Z2lucyA9IFtdLFxuICB0aGVtZSA9IGNyZWF0ZU11aVRoZW1lKHtcbiAgICBwcm9wczoge1xuICAgICAgTXVpVGV4dEZpZWxkOiB7XG4gICAgICAgIGZ1bGxXaWR0aDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBNdWlEaWFsb2c6IHtcbiAgICAgICAgZnVsbFdpZHRoOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9KSxcbn0gPSB7fSkge1xuICBjb25zdCBsYW5nVHJhbnNsYXRvciA9IG5ldyBMYW5nVHJhbnNsYXRvcih7fSk7XG5cbiAgY29uc3QganNzID0gY3JlYXRlKHtcbiAgICBwbHVnaW5zOiBbLi4uanNzUHJlc2V0KCkucGx1Z2lucywgLi4uanNzUGx1Z2luc10sXG4gIH0pO1xuICByZXR1cm4ge1xuICAgIFByb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xuICAgICAgY2hpbGRyZW4gPSBjcmVhdGVFbGVtZW50KE11aUNvcmVUaGVtZVByb3ZpZGVyLCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICB0aGVtZSxcbiAgICAgIH0pO1xuXG4gICAgICBjaGlsZHJlbiA9IGNyZWF0ZUVsZW1lbnQoU3R5bGVkVGhlbWVQcm92aWRlciwge1xuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgdGhlbWUsXG4gICAgICB9KTtcblxuICAgICAgY2hpbGRyZW4gPSBjcmVhdGVFbGVtZW50KE11aUpzc1Byb3ZpZGVyLCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBqc3MsXG4gICAgICB9KTtcblxuICAgICAgY2hpbGRyZW4gPSBjcmVhdGVFbGVtZW50KExhbmdUcmFuc2xhdG9yQ29udGV4dC5Qcm92aWRlciwge1xuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgdmFsdWU6IGxhbmdUcmFuc2xhdG9yLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjaGlsZHJlbjtcbiAgICB9LFxuICB9O1xufVxuIiwiaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1R5cG9ncmFwaHlcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIElmLFxuICBJcyxcbiAgSXNFbXB0eU9iamVjdCxcbiAgT21pdEtleXMsXG4gIFBhcnRpYWxVbmRlZmluZWRLZXlzLFxufSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IG1lcmdlUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvbWVyZ2VQcm9wc1wiO1xuaW1wb3J0IHtcbiAgQW55RGF0YU1hbmFnZXIsXG4gIERhdGFNYW5hZ2VyVHlwZXMsXG4gIFREYXRhTWFuYWdlcixcbn0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvZGF0YS1tYW5hZ2VyL0RhdGFNYW5hZ2VyXCI7XG5pbXBvcnQge1xuICBBbnlEYXRhTWFuYWdlclJvdXRlcixcbiAgRGF0YU1hbmFnZXJSb3V0ZXIsXG59IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL2RhdGEtbWFuYWdlci9EYXRhTWFuYWdlclJvdXRlclwiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiwgUnBjVHlwZSB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL1JwY1wiO1xuaW1wb3J0IHsgRm9ybVZpZXdQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL3dpZGdldC9mb3JtL0Zvcm1WaWV3XCI7XG5pbXBvcnQgeyBJbmxpbmVXaWRnZXRWaWV3IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L2lubGluZS13aWRnZXQvSW5saW5lV2lkZ2V0Vmlld1wiO1xuaW1wb3J0IHsgVGFic1dpZGdldCB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL3dpZGdldC90YWJzLXdpZGdldC9UYWJzV2lkZ2V0XCI7XG5pbXBvcnQgeyBXaWRnZXRSb3V0ZXJWaWV3IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L1dpZGdldFJvdXRlclZpZXdcIjtcbmltcG9ydCB7IE11aUFkZEJ1dHRvbiwgTXVpQnV0dG9uUHJvcHMgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9NdWlCdXR0b25cIjtcbmltcG9ydCB7IE11aURhdGFUYWJsZVZpZXcsIE11aURhdGFUYWJsZVZpZXdQcm9wcyB9IGZyb20gXCIuL011aURhdGFUYWJsZVZpZXdcIjtcbmltcG9ydCB7IE11aUZvcm1WaWV3LCBNdWlGb3JtVmlld1Byb3BzIH0gZnJvbSBcIi4vTXVpRm9ybVZpZXdcIjtcbmltcG9ydCB7XG4gIE11aVRhYnNXaWRnZXRWaWV3LFxuICBNdWlUYWJzV2lkZ2V0Vmlld1Byb3BzLFxuICBNdWlUYWJWaWV3UHJvcHMsXG59IGZyb20gXCIuL011aVRhYnNXaWRnZXRWaWV3XCI7XG5cbnR5cGUgX1R5cGVzPFQgZXh0ZW5kcyBURGF0YU1hbmFnZXI+ID0gRGF0YU1hbmFnZXJUeXBlczxUPiAmIHt9O1xuXG5leHBvcnQgdHlwZSBNdWlEYXRhTWFuYWdlclZpZXdQcm9wczxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55RGF0YU1hbmFnZXI+LFxuICBUIGV4dGVuZHMgVERhdGFNYW5hZ2VyID0gUnBjVHlwZTxDPltcIlRDb25maWdIb29rXCJdW1wiVERhdGFNYW5hZ2VyXCJdXG4+ID0gUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gIHtcbiAgICByZW5kZXJFZGl0SW5wdXQ6XG4gICAgICB8IEZvcm1WaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxfVHlwZXM8VD5bXCJFZGl0Rm9ybVwiXT4+W1wiaW5wdXRcIl1cbiAgICAgIHwgSWY8SXM8VFtcIkFkZElucHV0XCJdLCBUW1wiRWRpdElucHV0XCJdPiwgdW5kZWZpbmVkPjtcblxuICAgIHRhYnM6XG4gICAgICB8IE11aVRhYnNXaWRnZXRWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxUYWJzV2lkZ2V0PFRbXCJFZGl0VGFic1wiXT4+PltcInRhYnNcIl1cbiAgICAgIHwgSWY8SXNFbXB0eU9iamVjdDxUW1wiRWRpdFRhYnNcIl0+LCB1bmRlZmluZWQ+O1xuICB9LFxuICB7XG4gICAgY29ubmVjdGlvbjogQztcbiAgICByb3V0ZXI6IERhdGFNYW5hZ2VyUm91dGVyPFQ+O1xuXG4gICAgcmVuZGVyQWRkSW5wdXQ6IEZvcm1WaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxfVHlwZXM8VD5bXCJBZGRGb3JtXCJdPj5bXCJpbnB1dFwiXTtcblxuICAgIE11aUVkaXRGb3JtVGFiVmlld1Byb3BzPzogT21pdEtleXM8XG4gICAgICBNdWlUYWJWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxfVHlwZXM8VD5bXCJFZGl0Rm9ybVwiXT4+LFxuICAgICAgXCJyZW5kZXJcIlxuICAgID47XG5cbiAgICBNdWlEYXRhVGFibGVWaWV3UHJvcHM/OiBQYXJ0aWFsPFxuICAgICAgTXVpRGF0YVRhYmxlVmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248X1R5cGVzPFQ+W1wiVGFibGVcIl0+PlxuICAgID47XG5cbiAgICBNdWlBZGRGb3JtVmlld1Byb3BzPzogUGFydGlhbDxcbiAgICAgIE11aUZvcm1WaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxfVHlwZXM8VD5bXCJBZGRGb3JtXCJdPj5cbiAgICA+O1xuXG4gICAgTXVpRWRpdEZvcm1WaWV3UHJvcHM/OiBQYXJ0aWFsPFxuICAgICAgTXVpRm9ybVZpZXdQcm9wczxScGNDb25uZWN0aW9uPF9UeXBlczxUPltcIkVkaXRGb3JtXCJdPj5cbiAgICA+O1xuXG4gICAgTXVpQWRkQnV0dG9uUHJvcHM/OiBNdWlCdXR0b25Qcm9wcztcbiAgfVxuPjtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aURhdGFNYW5hZ2VyVmlldzxDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlEYXRhTWFuYWdlcj4+KFxuICBwcm9wczogTXVpRGF0YU1hbmFnZXJWaWV3UHJvcHM8Qz5cbikge1xuICBjb25zdCBfcm91dGVyID0gcHJvcHMucm91dGVyIGFzIEFueURhdGFNYW5hZ2VyUm91dGVyO1xuICBjb25zdCBkbSA9IHByb3BzIGFzIE11aURhdGFNYW5hZ2VyVmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248QW55RGF0YU1hbmFnZXI+PjtcblxuICBXaWRnZXRSb3V0ZXJWaWV3KFxuICAgIF9yb3V0ZXIsXG4gICAgZG0uY29ubmVjdGlvbi50YWJsZSxcbiAgICAocHJvcHMsIHsgbG9jYXRpb24sIGVtaXQgfSkgPT4gKFxuICAgICAgPE11aURhdGFUYWJsZVZpZXdcbiAgICAgICAgey4uLnByb3BzfVxuICAgICAgICB7Li4ubWVyZ2VQcm9wcyhkbS5NdWlEYXRhVGFibGVWaWV3UHJvcHMsIHtcbiAgICAgICAgICB0b29sYmFyQWN0aW9uczoge1xuICAgICAgICAgICAgYWRkOiB7XG4gICAgICAgICAgICAgIGJ1dHRvblR5cGU6IE11aUFkZEJ1dHRvbixcbiAgICAgICAgICAgICAgLi4uZG0uTXVpQWRkQnV0dG9uUHJvcHMsXG4gICAgICAgICAgICAgIG9uQ2xpY2soKSB7XG4gICAgICAgICAgICAgICAgZW1pdChsb2NhdGlvbi5hdChcImFkZFwiKSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FZGl0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgICAgIGVtaXQobG9jYXRpb24uYXQoXCJlZGl0XCIsIHsgaWQ6IGV2ZW50LmtleSB9KSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkRlbGV0ZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZG0uY29ubmVjdGlvbi5kZWxldGUoZXZlbnQua2V5KTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KX1cbiAgICAgIC8+XG4gICAgKVxuICApO1xuXG4gIFdpZGdldFJvdXRlclZpZXcoXG4gICAgX3JvdXRlci5hdChcImFkZFwiKSxcbiAgICBkbS5jb25uZWN0aW9uLmFkZCxcbiAgICAocHJvcHMsIHsgbG9jYXRpb24sIGVtaXQgfSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE11aUZvcm1WaWV3XG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIHsuLi5tZXJnZVByb3BzKGRtLk11aUFkZEZvcm1WaWV3UHJvcHMsIHtcbiAgICAgICAgICAgIG9uU3VibWl0KGlkKSB7XG4gICAgICAgICAgICAgIGVtaXQobG9jYXRpb24ucGFyZW50LmF0KFwiZWRpdFwiLCB7IGlkIH0pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgaW5wdXQ9e2RtLnJlbmRlckFkZElucHV0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICk7XG5cbiAgV2lkZ2V0Um91dGVyVmlldyhcbiAgICBfcm91dGVyLmF0KFwiZWRpdFwiKSxcbiAgICBwYXJhbXMgPT4gZG0uY29ubmVjdGlvbi5lZGl0KHBhcmFtcy5pZCksXG4gICAgcHJvcHMgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPElubGluZVdpZGdldFZpZXdcbiAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgY2hpbGRyZW49eyh7IHRhcmdldFByb3BzOiBwcm9wcywgaW5saW5lRWxlbWVudDogcGFnZSB9KSA9PiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8VHlwb2dyYXBoeT57cGFnZS50aXRsZX08L1R5cG9ncmFwaHk+XG4gICAgICAgICAgICAgIDxNdWlUYWJzV2lkZ2V0Vmlld1xuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICB0YWJzPXt7XG4gICAgICAgICAgICAgICAgICAuLi5kbS50YWJzLFxuICAgICAgICAgICAgICAgICAgZm9ybToge1xuICAgICAgICAgICAgICAgICAgICAuLi5kbS5NdWlFZGl0Rm9ybVRhYlZpZXdQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyOiBwcm9wcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNdWlGb3JtVmlld1xuICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5tZXJnZVByb3BzKGRtLk11aUVkaXRGb3JtVmlld1Byb3BzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TdWJtaXQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBhbGVydCBvciBuZXh0IGxvY2F0aW9uIC4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dD17ZG0ucmVuZGVyRWRpdElucHV0IHx8IGRtLnJlbmRlckFkZElucHV0fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICApO1xufVxuIiwiaW1wb3J0IFRhYmxlLCB7IFRhYmxlUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFibGVcIjtcbmltcG9ydCBUYWJsZUJvZHksIHsgVGFibGVCb2R5UHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFibGVCb2R5XCI7XG5pbXBvcnQgVGFibGVDZWxsIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UYWJsZUNlbGxcIjtcbmltcG9ydCBUYWJsZUZvb3RlciwgeyBUYWJsZUZvb3RlclByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1RhYmxlRm9vdGVyXCI7XG5pbXBvcnQgVGFibGVIZWFkLCB7IFRhYmxlSGVhZFByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1RhYmxlSGVhZFwiO1xuaW1wb3J0IFRhYmxlUGFnaW5hdGlvbiBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFibGVQYWdpbmF0aW9uXCI7XG5pbXBvcnQgVGFibGVSb3cgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1RhYmxlUm93XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENvbXBvbmVudFByb3BzLCBSZWFjdE5vZGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaGFzS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L2hhc0tleXNcIjtcbmltcG9ydCB7IG1hcE9iamVjdFRvQXJyYXkgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RUb0FycmF5XCI7XG5pbXBvcnQgeyBBd2FpdGFibGUsIFBhcnRpYWxVbmRlZmluZWRLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBMYW5nIH0gZnJvbSBcIi4uLy4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgTGFuZ0tleSB9IGZyb20gXCIuLi8uLi8uLi9sYW5nL0xhbmdLZXlcIjtcbmltcG9ydCB7IFRhYmxlTGF5b3V0IH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L1RhYmxlTGF5b3V0XCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvUnBjXCI7XG5pbXBvcnQgeyBBbnlEYXRhVGFibGUgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvZGF0YS10YWJsZS9EYXRhVGFibGVcIjtcbmltcG9ydCB7XG4gIERhdGFUYWJsZVZpZXcsXG4gIERhdGFUYWJsZVZpZXdQcm9wcyxcbn0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L2RhdGEtdGFibGUvRGF0YVRhYmxlVmlld1wiO1xuXG5pbXBvcnQgeyBXaWRnZXRUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L1dpZGdldFwiO1xuaW1wb3J0IHsgTXVpQnV0dG9uLCBNdWlCdXR0b25Qcm9wcyB9IGZyb20gXCIuLi9jb21wb25lbnRzL011aUJ1dHRvblwiO1xuaW1wb3J0IHsgTXVpRGVsZXRlQnV0dG9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvTXVpRGVsZXRlQnV0dG9uXCI7XG5pbXBvcnQgeyBNdWlUYWJsZUNlbGwsIE11aVRhYmxlQ29sdW1uUHJvcHMgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9NdWlUYWJsZUNlbGxcIjtcbmltcG9ydCB7XG4gIE11aVRhYmxlVG9vbGJhcixcbiAgTXVpVGFibGVUb29sYmFyUHJvcHMsXG59IGZyb20gXCIuLi9jb21wb25lbnRzL011aVRhYmxlVG9vbGJhclwiO1xuXG50eXBlIE11aURhdGFUYWJsZVZpZXdDb2x1bW5Qcm9wczxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55RGF0YVRhYmxlPixcbiAgUm93Q29sdW1uLFxuICBSb3dcbj4gPSB7XG4gIE11aVRhYmxlQ29sdW1uUHJvcHM/OiBNdWlUYWJsZUNvbHVtblByb3BzO1xuICB0aXRsZT86IFJlYWN0Tm9kZTtcbiAgcmVuZGVyUm93Q29sdW1uPyhcbiAgICBkYXRhOiBSb3dDb2x1bW4sXG4gICAgcHJvcHM6IHtcbiAgICAgIGtleTogc3RyaW5nO1xuICAgICAgcm93OiBXaWRnZXRUeXBlPEM+W1wiVHlwZXNcIl1bXCJSb3dXaXRoS2V5XCJdO1xuICAgIH1cbiAgKTogUmVhY3ROb2RlO1xufTtcblxudHlwZSBNdWlEYXRhVGFibGVBY3Rpb25FdmVudDxDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlEYXRhVGFibGU+PiA9IHtcbiAgcm93OiBXaWRnZXRUeXBlPEM+W1wiVHlwZXNcIl1bXCJSb3dXaXRoS2V5XCJdO1xuICBrZXk6IHN0cmluZztcbiAgY29ubmVjdGlvbjogUnBjQ29ubmVjdGlvbjxXaWRnZXRUeXBlPEM+W1wiVHlwZXNcIl1bXCJSb3dDb250cm9sbGVyXCJdPjtcbiAgdGFibGU6IFJlYWRvbmx5PERhdGFUYWJsZVZpZXc8Qz4+O1xufTtcblxuZXhwb3J0IHR5cGUgTXVpRGF0YVRhYmxlVmlld1Byb3BzPFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlEYXRhVGFibGU+LFxuICBSb3cgPSBXaWRnZXRUeXBlPEM+W1wiVHlwZXNcIl1bXCJSb3dcIl1cbj4gPSBEYXRhVGFibGVWaWV3UHJvcHM8Qz4gJiB7XG4gIFRhYmxlUHJvcHM/OiBUYWJsZVByb3BzO1xuICBUYWJsZUhlYWRQcm9wcz86IFRhYmxlSGVhZFByb3BzO1xuICBUYWJsZUJvZHlQcm9wcz86IFRhYmxlQm9keVByb3BzO1xuICBUYWJsZUZvb3RlclByb3BzPzogVGFibGVGb290ZXJQcm9wcztcblxuICBkaXNhYmxlVG9vbGJhcj86IGJvb2xlYW47XG5cbiAgTXVpVGFibGVUb29sYmFyUHJvcHM/OiBPbWl0PE11aVRhYmxlVG9vbGJhclByb3BzLCBcImFjdGlvbnNcIj47XG5cbiAgLy8gVE9ETzogb25BZGRDbGlja1xuXG4gIC8vIFRPRE86IHNlbGVjdEFjdGlvbnNcblxuICAvLyBBc3NpZ248TXVpRGF0YVRhYmxlQWN0aW9uUHJvcHMsIHt9PlxuICB0b29sYmFyQWN0aW9ucz86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgTXVpQnV0dG9uUHJvcHM8e1xuICAgICAgb25DbGljayhwcm9wczogeyB0YWJsZTogUmVhZG9ubHk8RGF0YVRhYmxlVmlldzxDPj4gfSk7XG4gICAgfT5cbiAgPjtcblxuICBjb2x1bW5zPzogUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgUmVxdWlyZWQ8Um93Pl06XG4gICAgICAgIHwgdW5kZWZpbmVkXG4gICAgICAgIHwgTXVpRGF0YVRhYmxlVmlld0NvbHVtblByb3BzPEMsIFJvd1tLXSwgUm93PjtcbiAgICB9XG4gID47XG5cbiAgb25FZGl0Q2xpY2s/KGV2ZW50OiBNdWlEYXRhVGFibGVBY3Rpb25FdmVudDxDPik6IHZvaWQ7XG5cbiAgb25EZWxldGVDbGljaz8oZXZlbnQ6IE11aURhdGFUYWJsZUFjdGlvbkV2ZW50PEM+KTogQXdhaXRhYmxlO1xuXG4gIGFjdGlvbnM/OiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIE11aUJ1dHRvblByb3BzPHtcbiAgICAgIHZpc2libGU/OiAocm93OiBSb3cpID0+IGJvb2xlYW47XG4gICAgICBvbkNsaWNrPyhldmVudDogTXVpRGF0YVRhYmxlQWN0aW9uRXZlbnQ8Qz4pO1xuICAgIH0+XG4gID47XG5cbiAgdGl0bGU/OiBSZWFjdE5vZGU7XG5cbiAgTXVpRGVsZXRlQnV0dG9uUHJvcHM/OiBQYXJ0aWFsPENvbXBvbmVudFByb3BzPHR5cGVvZiBNdWlEZWxldGVCdXR0b24+Pjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlEYXRhVGFibGVWaWV3PEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueURhdGFUYWJsZT4+KFxuICBwcm9wczogTXVpRGF0YVRhYmxlVmlld1Byb3BzPEM+XG4pIHtcbiAgbGV0IHtcbiAgICBUYWJsZVByb3BzLFxuICAgIFRhYmxlSGVhZFByb3BzLFxuICAgIFRhYmxlQm9keVByb3BzLFxuICAgIFRhYmxlRm9vdGVyUHJvcHMsXG4gICAgb25EZWxldGVDbGljayxcbiAgICBvbkVkaXRDbGljayxcbiAgICBhY3Rpb25zLFxuICAgIGNvbHVtbnMsXG4gICAgTXVpVGFibGVUb29sYmFyUHJvcHMsXG4gICAgTXVpRGVsZXRlQnV0dG9uUHJvcHMsXG4gICAgdG9vbGJhckFjdGlvbnMgPSB7fSxcbiAgICBkaXNhYmxlVG9vbGJhcixcbiAgICB0aXRsZSxcbiAgICAuLi5uZXh0UHJvcHNcbiAgfSA9IHByb3BzIGFzIE11aURhdGFUYWJsZVZpZXdQcm9wczxScGNDb25uZWN0aW9uPEFueURhdGFUYWJsZT4+O1xuXG4gIGNvbnN0IHRhYmxlUmVmID0gdXNlUmVmPERhdGFUYWJsZVZpZXc8Qz4+KG51bGwpO1xuXG4gIGFjdGlvbnMgPSB7IC4uLmFjdGlvbnMgfTtcblxuICBvbkVkaXRDbGljayAmJlxuICAgIChhY3Rpb25zLmFkZCA9IHtcbiAgICAgIHRpdGxlOiBMYW5nYEVESVRgLFxuICAgICAgaWNvbjogXCJlZGl0XCIsXG4gICAgICBvbkNsaWNrOiBvbkVkaXRDbGljayxcbiAgICB9KTtcblxuICBvbkRlbGV0ZUNsaWNrICYmXG4gICAgKGFjdGlvbnMuZGVsZXRlID0ge1xuICAgICAgYnV0dG9uVHlwZTogTXVpRGVsZXRlQnV0dG9uLFxuICAgICAgb25DbGljazogYXN5bmMgZXZlbnQgPT4ge1xuICAgICAgICBhd2FpdCBvbkRlbGV0ZUNsaWNrIShldmVudCk7XG4gICAgICAgIGF3YWl0IHRhYmxlUmVmLmN1cnJlbnQhLnJlbG9hZEFmdGVyUmVtb3ZlKGV2ZW50LmtleSk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPERhdGFUYWJsZVZpZXcgey4uLm5leHRQcm9wc30gcmVmPXt0YWJsZVJlZn0+XG4gICAgICB7dGFibGUgPT4gKFxuICAgICAgICA8VGFibGVMYXlvdXQ8eyAka2V5OiBzdHJpbmcgfSwgeyBzb3J0YWJsZTogYm9vbGVhbiB9LCBhbnk+XG4gICAgICAgICAgZ2V0Um93S2V5PXtyb3cgPT4gcm93LiRrZXl9XG4gICAgICAgICAgZ2V0Um93RGF0YT17cm93ID0+IHJvd31cbiAgICAgICAgICByb3dzPXt0YWJsZS5yb3dzfVxuICAgICAgICAgIGNvbHVtbnM9e3RhYmxlLmVsZW1lbnQ/LmNvbHVtbnMgfHwge319XG4gICAgICAgICAgcmVuZGVyQ29sdW1uVGl0bGU9e2NvbHVtbiA9PiAoXG4gICAgICAgICAgICA8TGFuZ0tleSBmb3I9e2NvbHVtbi5rZXl9Pntjb2x1bW5zPy5bY29sdW1uLmtleV0/LnRpdGxlfTwvTGFuZ0tleT5cbiAgICAgICAgICApfVxuICAgICAgICAgIHJlbmRlckNvbHVtbj17KGNvbHVtbiwgY2hpbGRyZW4pID0+IChcbiAgICAgICAgICAgIDxUYWJsZUNlbGxcbiAgICAgICAgICAgICAga2V5PXtjb2x1bW4ua2V5fVxuICAgICAgICAgICAgICB7Li4uY29sdW1ucz8uW2NvbHVtbi5rZXldPy5NdWlUYWJsZUNvbHVtblByb3BzfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L1RhYmxlQ2VsbD5cbiAgICAgICAgICApfVxuICAgICAgICAgIHJlbmRlclJvdz17KHJvdywgY2hpbGRyZW4pID0+IChcbiAgICAgICAgICAgIDxUYWJsZVJvdyBrZXk9e3Jvdy5rZXl9PlxuICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgIHtoYXNLZXlzKGFjdGlvbnMpICYmIChcbiAgICAgICAgICAgICAgICA8TXVpVGFibGVDZWxsIGZpdFRvQ29udGVudD5cbiAgICAgICAgICAgICAgICAgIHttYXBPYmplY3RUb0FycmF5KFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zISxcbiAgICAgICAgICAgICAgICAgICAgKHsgdmlzaWJsZSwgb25DbGljaywgLi4uTXVpQnV0dG9uUHJvcHMgfSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2libGUgJiYgIXZpc2libGUocm93LmRhdGEpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNdWlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbk9ubHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT17XCJzbWFsbFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLk11aUJ1dHRvblByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz8uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHJvdy5rZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uOiB0YWJsZS5wcm9wcy5jb25uZWN0aW9uLmNvbnRyb2xsZXIuZ2V0Um93Q29udHJvbGxlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmtleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvTXVpVGFibGVDZWxsPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHJlbmRlclJvd0NvbHVtbj17KGRhdGEsIHJvdywgY29sdW1uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHJlbmRlclJvd0NvbHVtbiB9ID0gY29sdW1ucz8uW2NvbHVtbi5rZXldIHx8IHt9O1xuXG4gICAgICAgICAgICBpZiAocmVuZGVyUm93Q29sdW1uKVxuICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyUm93Q29sdW1uKGRhdGEsIHtcbiAgICAgICAgICAgICAgICBrZXk6IHJvdy5rZXksXG4gICAgICAgICAgICAgICAgcm93OiByb3cuZGF0YSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKGRhdGEpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgcmVuZGVyPXsoeyBjb2x1bW5zLCByb3dzIH0pID0+IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIHshZGlzYWJsZVRvb2xiYXIgJiYgKFxuICAgICAgICAgICAgICAgIDxNdWlUYWJsZVRvb2xiYXJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgIHsuLi5NdWlUYWJsZVRvb2xiYXJQcm9wc31cbiAgICAgICAgICAgICAgICAgIHNlYXJjaD17XG4gICAgICAgICAgICAgICAgICAgICF0YWJsZS5lbGVtZW50Py5zZWFyY2hhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdGFibGUuc2VhcmNoVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWFyY2g6IGFzeW5jIHRleHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLnNlYXJjaCh0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHN0YXRpY0FjdGlvbnM9e21hcE9iamVjdFRvQXJyYXkoXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXJBY3Rpb25zLFxuICAgICAgICAgICAgICAgICAgICAocHJvcHMsIGtleSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxNdWlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25Pbmx5XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMub25DbGljaz8uKHsgdGFibGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPFRhYmxlIHsuLi5UYWJsZVByb3BzfT5cbiAgICAgICAgICAgICAgICA8VGFibGVIZWFkIHsuLi5UYWJsZUhlYWRQcm9wc30+XG4gICAgICAgICAgICAgICAgICB7IXRhYmxlLmlzTG9hZGluZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvdz5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29sdW1uc31cbiAgICAgICAgICAgICAgICAgICAgICB7aGFzS2V5cyhhY3Rpb25zKSAmJiA8TXVpVGFibGVDZWxsIGZpdFRvQ29udGVudCAvPn1cbiAgICAgICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9UYWJsZUhlYWQ+XG4gICAgICAgICAgICAgICAgPFRhYmxlQm9keSB7Li4uVGFibGVCb2R5UHJvcHN9PlxuICAgICAgICAgICAgICAgICAge3RhYmxlLmlzTG9hZGluZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvdz5cbiAgICAgICAgICAgICAgICAgICAgICA8VGFibGVDZWxsIGNvbFNwYW49ezEwMDB9IGFsaWduPXtcImNlbnRlclwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtMYW5nYExPQURJTkdfSU5fUFJPR1JFU1NgfVxuICAgICAgICAgICAgICAgICAgICAgIDwvVGFibGVDZWxsPlxuICAgICAgICAgICAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAge3Jvd3MubGVuZ3RoID8gKFxuICAgICAgICAgICAgICAgICAgICByb3dzXG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8VGFibGVSb3c+XG4gICAgICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbCBjb2xTcGFuPXsxMDAwfSBhbGlnbj17XCJjZW50ZXJcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7TGFuZ2BOT19IQVZFX01PUkVfUk9XU2B9XG4gICAgICAgICAgICAgICAgICAgICAgPC9UYWJsZUNlbGw+XG4gICAgICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvVGFibGVCb2R5PlxuICAgICAgICAgICAgICAgIDxUYWJsZUZvb3RlciB7Li4uVGFibGVGb290ZXJQcm9wc30+XG4gICAgICAgICAgICAgICAgICA8VGFibGVSb3c+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICBjb3VudD17dGFibGUucGFnZVNpemV9XG4gICAgICAgICAgICAgICAgICAgICAgcGFnZT17dGFibGUucGFnZUluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgIHJvd3NQZXJQYWdlPXt0YWJsZS5wYWdlU2l6ZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZVJvd3NQZXJQYWdlPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5zZXRQYWdlU2l6ZShwYXJzZUludChldmVudC50YXJnZXQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlUGFnZT17KGV2ZW50LCBwYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5zZXRQYWdlSW5kZXgocGFnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgICAgICAgPC9UYWJsZUZvb3Rlcj5cbiAgICAgICAgICAgICAgPC9UYWJsZT5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvRGF0YVRhYmxlVmlldz5cbiAgKTtcbn1cbiIsImltcG9ydCBHcmlkIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9HcmlkXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBtZXJnZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL21lcmdlUHJvcHNcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9ScGNcIjtcbmltcG9ydCB7IEFueUZvcm0gfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvZm9ybS9Gb3JtXCI7XG5pbXBvcnQgeyBGb3JtVmlldywgRm9ybVZpZXdQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL3dpZGdldC9mb3JtL0Zvcm1WaWV3XCI7XG5cbmltcG9ydCB7XG4gIE11aUJ1dHRvbixcbiAgTXVpQnV0dG9uUHJvcHMsXG4gIE11aVJlc2V0QnV0dG9uLFxuICBNdWlTdWJtaXRCdXR0b24sXG59IGZyb20gXCIuLi9jb21wb25lbnRzL011aUJ1dHRvblwiO1xuaW1wb3J0IHsgTXVpR3JpZCB9IGZyb20gXCIuLi9jb21wb25lbnRzL011aUdyaWRcIjtcblxuZXhwb3J0IHR5cGUgTXVpRm9ybVZpZXdQcm9wczxDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlGb3JtPj4gPSBGb3JtVmlld1Byb3BzPFxuICBDXG4+ICYge1xuICBNdWlTdWJtaXRCdXR0b25Qcm9wcz86IE11aUJ1dHRvblByb3BzO1xuICBNdWlSZXNldEJ1dHRvblByb3BzPzogTXVpQnV0dG9uUHJvcHM7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpRm9ybVZpZXc8QyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55Rm9ybT4+KFxuICBwcm9wczogTXVpRm9ybVZpZXdQcm9wczxDPlxuKTogUmVhY3RFbGVtZW50IHtcbiAgcmV0dXJuIChcbiAgICA8Rm9ybVZpZXcgey4uLnByb3BzfT5cbiAgICAgIHsoeyBpbnB1dCwgZm9ybSB9KSA9PiAoXG4gICAgICAgIDxHcmlkIGNvbnRhaW5lciBkaXJlY3Rpb249e1wiY29sdW1uXCJ9IHNwYWNpbmc9ezJ9PlxuICAgICAgICAgIDxHcmlkIGl0ZW0+e2lucHV0fTwvR3JpZD5cbiAgICAgICAgICA8R3JpZCBpdGVtPlxuICAgICAgICAgICAgPE11aUdyaWQgc3BhY2luZz17Mn0ganVzdGlmeT17XCJmbGV4LWVuZFwifT5cbiAgICAgICAgICAgICAgPE11aVN1Ym1pdEJ1dHRvblxuICAgICAgICAgICAgICAgIEJ1dHRvblByb3BzPXt7IHZhcmlhbnQ6IFwiY29udGFpbmVkXCIgfX1cbiAgICAgICAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhwcm9wcy5NdWlTdWJtaXRCdXR0b25Qcm9wcywge1xuICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gZm9ybS5zdWJtaXQoKSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPE11aVJlc2V0QnV0dG9uXG4gICAgICAgICAgICAgICAgQnV0dG9uUHJvcHM9e3sgdmFyaWFudDogXCJjb250YWluZWRcIiB9fVxuICAgICAgICAgICAgICAgIHsuLi5tZXJnZVByb3BzKHByb3BzLk11aVJlc2V0QnV0dG9uUHJvcHMsIHtcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IGZvcm0ucmVzZXQoKSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvTXVpR3JpZD5cbiAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgIDwvR3JpZD5cbiAgICAgICl9XG4gICAgPC9Gb3JtVmlldz5cbiAgKTtcbn1cbiIsImltcG9ydCBUYWIsIHsgVGFiUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFiXCI7XG5pbXBvcnQgVGFicywgeyBUYWJzUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFic1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdEVsZW1lbnQsIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZW50cmllcyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L2VudHJpZXNcIjtcbmltcG9ydCB7IGtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9rZXlzXCI7XG5pbXBvcnQgeyBMYW5nS2V5IH0gZnJvbSBcIi4uLy4uLy4uL2xhbmcvTGFuZ0tleVwiO1xuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvcmVuZGVyZXJcIjtcbmltcG9ydCB7IEVtcHR5RnJhZ21lbnQgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvRW1wdHlGcmFnbWVudFwiO1xuaW1wb3J0IHsgbWVyZ2VQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9tZXJnZVByb3BzXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvUnBjXCI7XG5pbXBvcnQgeyBBbnlUYWJzV2lkZ2V0IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L3RhYnMtd2lkZ2V0L1RhYnNXaWRnZXRcIjtcbmltcG9ydCB7IFRhYnNXaWRnZXRWaWV3IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L3RhYnMtd2lkZ2V0L1RhYnNXaWRnZXRWaWV3XCI7XG5pbXBvcnQge1xuICBBbnlXaWRnZXQsXG4gIEFueVdpZGdldENvbm5lY3Rpb24sXG4gIFdpZGdldFR5cGUsXG59IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7IEFueVdpZGdldFJlY29yZCB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL3dpZGdldC93aWRnZXQtbWFwL1dpZGdldE1hcFwiO1xuaW1wb3J0IHsgV2lkZ2V0Vmlld1Byb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L1dpZGdldFZpZXdcIjtcbmltcG9ydCB7IE11aUljb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9NdWlJY29uXCI7XG5cbmV4cG9ydCB0eXBlIEFueVRhYnNXaWRnZXRDb25uZWN0aW9uID0gUnBjQ29ubmVjdGlvbjxBbnlUYWJzV2lkZ2V0PjtcblxuZXhwb3J0IHR5cGUgUmVuZGVyZXJPclByb3BzPFQsIFA+ID0gW1BhcnRpYWw8VD4sIFJlbmRlcmVyPFA+XSB8IFJlbmRlcmVyPFA+O1xuXG5leHBvcnQgdHlwZSBNdWlUYWJWaWV3UHJvcHM8QyBleHRlbmRzIEFueVdpZGdldENvbm5lY3Rpb24+ID0ge1xuICB0aXRsZT86IFJlYWN0Tm9kZTtcbiAgaWNvbj86IE11aUljb247XG4gIHJlbmRlcj8ocHJvcHM6IFdpZGdldFZpZXdQcm9wczxDPik6IFJlYWN0RWxlbWVudDtcbn07XG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBNdWlUYWJzV2lkZ2V0Vmlld1Byb3BzIHtcbiAgZXhwb3J0IHR5cGUgVGFiID0ge1xuICAgIHRpdGxlOiBSZWFjdE5vZGU7XG4gICAgaWNvbj86IE11aUljb247XG4gIH07XG59XG5leHBvcnQgdHlwZSBNdWlUYWJzV2lkZ2V0Vmlld1Byb3BzPFxuICBDIGV4dGVuZHMgQW55VGFic1dpZGdldENvbm5lY3Rpb24sXG4gIFQgZXh0ZW5kcyBBbnlXaWRnZXRSZWNvcmQgPSBXaWRnZXRUeXBlPEM+W1wiVGFiTWFwXCJdXG4+ID0gV2lkZ2V0Vmlld1Byb3BzPEM+ICYge1xuICBUYWJzUHJvcHM/OiBUYWJzUHJvcHM7XG5cbiAgVGFiUHJvcHM/OiBUYWJQcm9wcztcbiAgU2VsZWN0ZWRUYWJQcm9wcz86IFRhYlByb3BzO1xuXG4gIHJlbmRlclRhYlBhbmVsPzogUmVuZGVyZXI8eyBjaGlsZHJlbjogUmVhY3RFbGVtZW50IHwgdW5kZWZpbmVkIH0+O1xuXG4gIHRhYnM/OiB7XG4gICAgW0sgaW4ga2V5b2YgVF0/OlxuICAgICAgfCBNdWlUYWJWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxUW0tdPj5cbiAgICAgIHwgTXVpVGFiVmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248VFtLXT4+W1wicmVuZGVyXCJdO1xuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aVRhYnNXaWRnZXRWaWV3PEMgZXh0ZW5kcyBBbnlUYWJzV2lkZ2V0Q29ubmVjdGlvbj4oXG4gIHByb3BzOiBNdWlUYWJzV2lkZ2V0Vmlld1Byb3BzPEM+XG4pIHtcbiAgY29uc3Qge1xuICAgIHRhYnM6IHRhYk9wdGlvbnNNYXAsXG4gICAgVGFic1Byb3BzLFxuICAgIFRhYlByb3BzLFxuICAgIFNlbGVjdGVkVGFiUHJvcHMsXG4gICAgcmVuZGVyVGFiUGFuZWwsXG4gICAgLi4ub3RoZXJQcm9wc1xuICB9ID0gcHJvcHMgYXMgTXVpVGFic1dpZGdldFZpZXdQcm9wczxBbnlUYWJzV2lkZ2V0Q29ubmVjdGlvbj47XG5cbiAgcmV0dXJuIChcbiAgICA8VGFic1dpZGdldFZpZXcgey4uLm90aGVyUHJvcHN9PlxuICAgICAge3ZpZXcgPT4ge1xuICAgICAgICBjb25zdCB0YWJzOiBSZWFjdEVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBjb25zdCB7IGN1cnJlbnRUYWJQcm9wcyB9ID0gdmlldztcbiAgICAgICAgY29uc3QgY3VycmVudFRhYk9wdGlvbnMgPVxuICAgICAgICAgIGN1cnJlbnRUYWJQcm9wcyAmJiBnZXRUYWJPcHRpb25zKGN1cnJlbnRUYWJQcm9wcy5rZXkpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdGFiS2V5IG9mIGtleXMocHJvcHMuY29ubmVjdGlvbi5ycGMudGFiTWFwKSkge1xuICAgICAgICAgIGNvbnN0IHRhYk9wdGlvbnMgPSBnZXRUYWJPcHRpb25zKHRhYktleSk7XG5cbiAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gY3VycmVudFRhYlByb3BzPy5rZXkgPT09IHRhYktleTtcblxuICAgICAgICAgIHRhYnMucHVzaChcbiAgICAgICAgICAgIDxUYWJcbiAgICAgICAgICAgICAga2V5PXt0YWJLZXl9XG4gICAgICAgICAgICAgIHsuLi5UYWJQcm9wc31cbiAgICAgICAgICAgICAgey4uLihpc1NlbGVjdGVkID8gU2VsZWN0ZWRUYWJQcm9wcyA6IG51bGwpfVxuICAgICAgICAgICAgICBsYWJlbD17PExhbmdLZXkgZm9yPXt0YWJLZXl9Pnt0YWJPcHRpb25zPy50aXRsZX08L0xhbmdLZXk+fVxuICAgICAgICAgICAgICB2YWx1ZT17dGFiS2V5fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRhYkNvbnRlbnQ6IFJlYWN0RWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoY3VycmVudFRhYk9wdGlvbnM/LnJlbmRlcikge1xuICAgICAgICAgIHRhYkNvbnRlbnQgPSBjdXJyZW50VGFiT3B0aW9ucy5yZW5kZXI/LihjdXJyZW50VGFiUHJvcHMhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YWJzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHRhYkNvbnRlbnQgPz8gRW1wdHlGcmFnbWVudDtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8VGFic1xuICAgICAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhUYWJzUHJvcHMsIHtcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogKF8sIGtleSkgPT4gdmlldy5zd2l0Y2hUbyhrZXkpLFxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgdmFsdWU9e2N1cnJlbnRUYWJQcm9wcz8ua2V5fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGFic31cbiAgICAgICAgICAgIDwvVGFicz5cbiAgICAgICAgICAgIHtyZW5kZXJUYWJQYW5lbFxuICAgICAgICAgICAgICA/IHJlbmRlclRhYlBhbmVsKHsgY2hpbGRyZW46IHRhYkNvbnRlbnQgfSlcbiAgICAgICAgICAgICAgOiB0YWJDb250ZW50fVxuICAgICAgICAgIDwvPlxuICAgICAgICApO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldFRhYk9wdGlvbnMoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgICBpZiAodGFiT3B0aW9uc01hcClcbiAgICAgICAgICAgIHJldHVybiAodHlwZW9mIHRhYk9wdGlvbnNNYXBba2V5XSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgID8geyByZW5kZXI6IHRhYk9wdGlvbnNNYXBba2V5XSB9XG4gICAgICAgICAgICAgIDogdGFiT3B0aW9uc01hcFtrZXldKSBhc1xuICAgICAgICAgICAgICB8IE11aVRhYlZpZXdQcm9wczxBbnlXaWRnZXRDb25uZWN0aW9uPlxuICAgICAgICAgICAgICB8IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICA8L1RhYnNXaWRnZXRWaWV3PlxuICApO1xufVxuIiwiaW1wb3J0IERpYWxvZyBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nXCI7XG5pbXBvcnQgRGlhbG9nQ29udGVudCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nQ29udGVudFwiO1xuaW1wb3J0IERpYWxvZ1RpdGxlIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dUaXRsZVwiO1xuaW1wb3J0IFRleHRGaWVsZCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGV4dEZpZWxkXCI7XG5pbXBvcnQgeyBBdXRvY29tcGxldGUgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2xhYlwiO1xuaW1wb3J0IHsgbWFrZVN0eWxlcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvc3R5bGVzXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IElmLCBJcywgUGFydGlhbFVuZGVmaW5lZEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IExhbmcsIExhbmdOb2RlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgdXNlTGFuZ1RyYW5zbGF0b3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vbGFuZy9MYW5nVHJhbnNsYXRvclwiO1xuaW1wb3J0IHsgQW55RGF0YUlucHV0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvaW5wdXQvZGF0YS1pbnB1dC9EYXRhSW5wdXRcIjtcbmltcG9ydCB7IERhdGFJbnB1dFZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXJwYy9pbnB1dC9kYXRhLWlucHV0L0RhdGFJbnB1dFZpZXdcIjtcblxuaW1wb3J0IHsgSW5wdXRUeXBlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvaW5wdXQvSW5wdXRcIjtcbmltcG9ydCB7IElucHV0Vmlld1Byb3BzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvaW5wdXQvSW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvUnBjXCI7XG5pbXBvcnQgeyBXaWRnZXRWaWV3TG9hZGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L1dpZGdldFZpZXdMb2FkZXJcIjtcbmltcG9ydCB7IE11aUxpbmsgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9NdWlMaW5rXCI7XG5pbXBvcnQgeyBNdWlEYXRhVGFibGVWaWV3IH0gZnJvbSBcIi4uL011aURhdGFUYWJsZVZpZXdcIjtcblxuZXhwb3J0IHR5cGUgQW55RGF0YUlucHV0Q29ubmVjdGlvbiA9IFJwY0Nvbm5lY3Rpb248QW55RGF0YUlucHV0PjtcblxuZXhwb3J0IGNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXModGhlbWUgPT4gKHt9KSk7XG5cbi8vIFRPRE86IExvYWQgdGhlIGZpcnN0cyByb3dzXG5leHBvcnQgZnVuY3Rpb24gTXVpRGF0YUlucHV0VmlldzxDIGV4dGVuZHMgQW55RGF0YUlucHV0Q29ubmVjdGlvbj4oXG4gIHByb3BzOiBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAgICB7XG4gICAgICBnZXRMYWJlbDpcbiAgICAgICAgfCAoKHJvdzogSW5wdXRUeXBlPEM+W1wiVHlwZXNcIl1bXCJUYWJsZVR5cGVzXCJdW1wiUm93V2l0aEtleVwiXSkgPT4gc3RyaW5nKVxuICAgICAgICB8IElmPFxuICAgICAgICAgICAgSXM8SW5wdXRUeXBlPEM+W1wiVHlwZXNcIl1bXCJUYWJsZVR5cGVzXCJdW1wiUm93XCJdLCB7IGxhYmVsOiBzdHJpbmcgfT4sXG4gICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgICA+O1xuICAgIH0sXG4gICAgSW5wdXRWaWV3UHJvcHM8Qz4gJiB7XG4gICAgICB0aXRsZT86IExhbmdOb2RlO1xuXG4gICAgICAvLyBUT0RPOiBsYWJlbENvbHVtblRpdGxlPzpcbiAgICB9XG4gID5cbikge1xuICB0eXBlIFR5cGVzID0gSW5wdXRUeXBlPEM+W1wiVHlwZXNcIl07XG4gIHR5cGUgVGFibGVUeXBlcyA9IFR5cGVzW1wiVGFibGVUeXBlc1wiXTtcbiAgdHlwZSBUYWJsZVJvdyA9IFRhYmxlVHlwZXNbXCJSb3dXaXRoS2V5XCJdO1xuXG4gIGNvbnN0IGxhbmcgPSB1c2VMYW5nVHJhbnNsYXRvcigpO1xuICBjb25zdCBpbnB1dFJlZiA9IHVzZVJlZjxEYXRhSW5wdXRWaWV3PEM+PihudWxsKTtcbiAgY29uc3QgW2lzT3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtxdWVyeVJlc3VsdCwgc2V0UXVlcnlSZXN1bHRdID0gdXNlU3RhdGU8VGFibGVUeXBlc1tcIlF1ZXJ5UmVzdWx0XCJdPigpO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU9wdGlvbnModGV4dDogc3RyaW5nKSB7XG4gICAgc2V0UXVlcnlSZXN1bHQoXG4gICAgICBhd2FpdCBwcm9wcy5jb25uZWN0aW9uLmNvbnRyb2xsZXIuZ2V0Um93cyh7XG4gICAgICAgIGdldENvdW50OiB0cnVlLFxuICAgICAgICB0ZXh0LFxuICAgICAgICB0YWtlOiAxNSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxEYXRhSW5wdXRWaWV3XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgcmVmPXtpbnB1dFJlZn1cbiAgICAgICAgY2hpbGRyZW49e3ZpZXcgPT4ge1xuICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IFRhYmxlVHlwZXNbXCJSb3dXaXRoS2V5XCJdW10gPVxuICAgICAgICAgICAgcXVlcnlSZXN1bHQ/LnJvd3MgfHwgKHZpZXcudmFsdWUgPyBbdmlldy52YWx1ZV0gOiBbXSk7XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPEF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgICAgIGNsZWFyT25Fc2NhcGVcbiAgICAgICAgICAgICAgICB2YWx1ZT17dmlldy52YWx1ZSB8fCBudWxsfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoXywgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZpZXcuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25Eb3VibGVDbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2U9eyhfLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdXBkYXRlT3B0aW9ucyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBnZXRPcHRpb25MYWJlbD17cm93ID0+XG4gICAgICAgICAgICAgICAgICBwcm9wc1tcImdldExhYmVsXCJdID8gcHJvcHNbXCJnZXRMYWJlbFwiXShyb3cpIDogcm93W1wibGFiZWxcIl1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgICAgICAgICBnZXRPcHRpb25TZWxlY3RlZD17KG8sIHYpID0+IG8uJGtleSA9PT0gdi4ka2V5fVxuICAgICAgICAgICAgICAgIHJlbmRlcklucHV0PXtwYXJhbXMgPT4gKFxuICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICB7Li4ucGFyYW1zfVxuICAgICAgICAgICAgICAgICAgICBlcnJvcj17ISF2aWV3LmVycm9yfVxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJUZXh0PXt2aWV3LnJlbmRlckVycm9yKCl9XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXtsYW5nLnRyYW5zbGF0ZU5vZGUocHJvcHMudGl0bGUpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIHtpc09wZW4gJiYgKFxuICAgICAgICA8RGlhbG9nIG9wZW4gb25DbG9zZT17KCkgPT4gc2V0T3BlbihmYWxzZSl9PlxuICAgICAgICAgIDxEaWFsb2dDb250ZW50PlxuICAgICAgICAgICAgPERpYWxvZ1RpdGxlPlxuICAgICAgICAgICAgICB7TGFuZ2BQSUNLXyR7XCJzdWJqZWN0XCJ9YCh7XG4gICAgICAgICAgICAgICAgc3ViamVjdDogcHJvcHMudGl0bGUsXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9EaWFsb2dUaXRsZT5cbiAgICAgICAgICAgIDxXaWRnZXRWaWV3TG9hZGVyXG4gICAgICAgICAgICAgIGNvbm5lY3Rpb249e3Byb3BzLmNvbm5lY3Rpb24uY29udHJvbGxlcn1cbiAgICAgICAgICAgICAgY2hpbGRyZW49e3Byb3BzID0+IChcbiAgICAgICAgICAgICAgICA8TXVpRGF0YVRhYmxlVmlld1xuICAgICAgICAgICAgICAgICAgLy8gZGlzYWJsZVRvb2xiYXJcbiAgICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICAgIGFjdGlvbnM9e3tcbiAgICAgICAgICAgICAgICAgICAgcGljazoge1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW5nYFBJQ0tgLFxuICAgICAgICAgICAgICAgICAgICAgIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvS2V5Ym9hcmRSZXR1cm5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljazogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UXVlcnlSZXN1bHQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0UmVmLmN1cnJlbnQhLnNldFZhbHVlKGV2ZW50LnJvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGNvbHVtbnM9e3tcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFuZ2BBQ0NPVU5UX0ZVTExfTkFNRWAsXG4gICAgICAgICAgICAgICAgICAgICAgcmVuZGVyUm93Q29sdW1uOiAoZGF0YSwgcHJvcHMpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNdWlMaW5rXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRRdWVyeVJlc3VsdCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0UmVmLmN1cnJlbnQhLnNldFZhbHVlKHByb3BzLnJvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NdWlMaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRGlhbG9nQ29udGVudD5cbiAgICAgICAgPC9EaWFsb2c+XG4gICAgICApfVxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFRleHRGaWVsZCwgeyBUZXh0RmllbGRQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UZXh0RmllbGRcIjtcbmltcG9ydCB7XG4gIEZpbGxlZFRleHRGaWVsZFByb3BzLFxuICBPdXRsaW5lZFRleHRGaWVsZFByb3BzLFxuICBTdGFuZGFyZFRleHRGaWVsZFByb3BzLFxufSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGV4dEZpZWxkL1RleHRGaWVsZFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG1lcmdlUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vcmVhY3QvdXRpbHMvbWVyZ2VQcm9wc1wiO1xuaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvaW5wdXQvdGV4dC1pbnB1dC9UZXh0SW5wdXRcIjtcbmltcG9ydCB7XG4gIFRleHRJbnB1dFZpZXcsXG4gIFRleHRJbnB1dFZpZXdQcm9wcyxcbn0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvaW5wdXQvdGV4dC1pbnB1dC9UZXh0SW5wdXRWaWV3XCI7XG5cbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXJwYy9ScGNcIjtcblxuZXhwb3J0IHR5cGUgTXVpVGV4dElucHV0Vmlld1Byb3BzPFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxUZXh0SW5wdXQ+XG4+ID0gVGV4dElucHV0Vmlld1Byb3BzPEM+ICYge1xuICB0aXRsZT86IFJlYWN0Tm9kZTtcbiAgVGV4dEZpZWxkUHJvcHM/OiBQYXJ0aWFsPFRleHRGaWVsZFByb3BzPjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlUZXh0SW5wdXRWaWV3PEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPFRleHRJbnB1dD4+KHtcbiAgdGl0bGUsXG4gIFRleHRGaWVsZFByb3BzLFxuICAuLi5wcm9wc1xufTogTXVpVGV4dElucHV0Vmlld1Byb3BzPEM+KSB7XG4gIHJldHVybiAoXG4gICAgPFRleHRJbnB1dFZpZXdcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIGNoaWxkcmVuPXt2aWV3ID0+IChcbiAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgIHsuLi5tZXJnZVByb3BzKFRleHRGaWVsZFByb3BzLCB7XG4gICAgICAgICAgICBvbkJsdXI6ICgpID0+IHZpZXcudmFsaWRhdGUoKSxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBldmVudCA9PiB2aWV3LnNldFRleHQoZXZlbnQudGFyZ2V0LnZhbHVlKSxcbiAgICAgICAgICB9KX1cbiAgICAgICAgICBsYWJlbD17dGl0bGV9XG4gICAgICAgICAgZXJyb3I9e3ZpZXcuZXJyb3IgIT0gbnVsbH1cbiAgICAgICAgICBoZWxwZXJUZXh0PXt2aWV3LnJlbmRlckVycm9yKCl9XG4gICAgICAgICAgdmFsdWU9e3ZpZXcudGV4dH1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgLz5cbiAgKTtcbn1cbiIsImltcG9ydCB7IE5vbk51bGxhYmxlQXQgfSBmcm9tIFwiLi90eXBpbmdzXCI7XG5cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IFRNZXRhVHlwZTogdW5pcXVlIHN5bWJvbDtcblxuZXhwb3J0IHR5cGUgV2l0aE1ldGFUeXBlPFQ+ID0geyBbVE1ldGFUeXBlXT86IFQgfTtcblxuZXhwb3J0IHR5cGUgTWV0YVR5cGU8VCBleHRlbmRzIHsgW1RNZXRhVHlwZV0/IH0+ID0gTm9uTnVsbGFibGVBdDxcbiAgVCxcbiAgdHlwZW9mIFRNZXRhVHlwZVxuPjtcblxuZXhwb3J0IHR5cGUgTWV0YVR5cGVIb29rPFxuICBUIGV4dGVuZHMgQW55VCxcbiAgQW55VCBleHRlbmRzIFdpdGhNZXRhVHlwZTxhbnk+LFxuICBVXG4+ID0gV2l0aE1ldGFUeXBlPE9taXQ8TWV0YVR5cGU8VD4sIGtleW9mIE1ldGFUeXBlPEFueVQ+IHwga2V5b2YgVT4gJiBVPjtcblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RNZXRhVHlwZTxUPihcbiAgb2JqOiBXaXRoTWV0YVR5cGU8VD4sXG4gIGNhbGxiYWNrOiAodHlwZTogVCkgPT4gdm9pZFxuKSB7XG4gIC8vXG59XG4iLCJpbXBvcnQgeyBTZXEgfSBmcm9tIFwiaW1tdXRhYmxlXCI7XG5pbXBvcnQgeyBMYXp5IH0gZnJvbSBcIi4uL3BhdHRlcm5zL2xhenlcIjtcbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIEFycmF5PFQ+IHtcbiAgICB0b1NlcSgpOiBTZXEuSW5kZXhlZDxUPjtcbiAgfVxuICBpbnRlcmZhY2UgUmVhZG9ubHlBcnJheTxUPiB7XG4gICAgdG9TZXEoKTogU2VxLkluZGV4ZWQ8VD47XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUFycmF5VG9TZXEgPSBMYXp5KCgpID0+IHtcbiAgQXJyYXkucHJvdG90eXBlLnRvU2VxID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBTZXEuSW5kZXhlZCh0aGlzKTtcbiAgfTtcbn0pO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGFzc2VydCh2YWx1ZSwgbWVzc2FnZT86IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpKTogYXNzZXJ0cyB2YWx1ZSB7XG4gICAgaWYgKCF2YWx1ZSkgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICB0eXBlb2YgbWVzc2FnZSA9PT0gXCJmdW5jdGlvblwiID8gbWVzc2FnZSgpIDpcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICApXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gVGltZW91dChtczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBtcyk7XHJcbiAgICB9KVxyXG59XHJcblxyXG4iLCJleHBvcnQgdHlwZSBXYWl0ZXI8VD4gPSBQcm9taXNlPFQ+ICZcbiAgICB7XG4gICAgICAgIHJlc29sdmUodmFsdWU6IFQpOiB2b2lkXG4gICAgICAgIHJlamVjdChlcnJvcjogYW55KTogdm9pZDtcbiAgICB9ICYgKFQgZXh0ZW5kcyB2b2lkID8ge1xuICAgICAgICByZXNvbHZlKCk6dm9pZDtcbn06e30pO1xuXG5leHBvcnQgZnVuY3Rpb24gV2FpdGVyPFQgPSBhbnk+KCk6IFdhaXRlcjxUPiB7XG4gICAgbGV0IHByb3BzO1xuICAgIGNvbnN0IHByb21pc2UgPSA8V2FpdGVyPFQ+Pm5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcHJvcHMgPSB7cmVzb2x2ZSwgcmVqZWN0fTtcbiAgICB9KVxuICAgIE9iamVjdC5hc3NpZ24ocHJvbWlzZSwgcHJvcHMpO1xuICAgIHJldHVybiBwcm9taXNlO1xuXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0TmV4dFBhdGgocGF0aDogc3RyaW5nKTogW3N0cmluZywgc3RyaW5nXSB7XG4gICAgbGV0IHN0YXJ0ID0gMDtcbiAgICB3aGlsZSAocGF0aC5jaGFyQXQoc3RhcnQpID09PSAnLycpIHtcbiAgICAgICAgc3RhcnQrKztcbiAgICB9XG4gICAgY29uc3QgZW5kID0gcGF0aC5pbmRleE9mKCcvJywgc3RhcnQpO1xuICAgIGlmICgwID4gZW5kKSB7XG4gICAgICAgIHJldHVybiBbcGF0aC5zbGljZShzdGFydCksIFwiXCJdXG4gICAgfVxuICAgIHJldHVybiBbcGF0aC5zbGljZShzdGFydCwgZW5kKSwgcGF0aC5zbGljZShlbmQpXVxufVxuIiwiaW1wb3J0IHthc3NlcnR9IGZyb20gXCIuLi9hc3NlcnRcIjtcbmltcG9ydCB7QmFzZU1hcCwgTWFwS2V5LCBNYXBWYWx1ZX0gZnJvbSBcIi4vQmFzZU1hcFwiO1xuXG5leHBvcnQgdHlwZSBNYXBGYWN0b3J5PFQgZXh0ZW5kcyBCYXNlTWFwPGFueSwgYW55Pj4gPSB7XG4gICAgbWFwOiBUO1xuICAgIChrZXk6IE1hcEtleTxUPik6IE5vbk51bGxhYmxlPE1hcFZhbHVlPFQ+PjtcblxufTtcblxuIGZ1bmN0aW9uIG1hcEZhY3Rvcnk8SywgVj4oXG4gICAgbWFwOiBCYXNlTWFwPEssIFY+LFxuICAgIGZhY3Rvcnk6IChrZXk6IEspID0+IFZcbik6IE1hcEZhY3Rvcnk8QmFzZU1hcDxLLCBWPj4ge1xuICAgIHRvdWNoLm1hcCA9IG1hcDtcbiAgICByZXR1cm4gdG91Y2hcblxuICAgIGZ1bmN0aW9uIHRvdWNoKGtleSwgY2FsbGJhY2s/KTogYW55IHtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBtYXAuaGFzKGtleSkgPyBjYWxsYmFjayhtYXAuZ2V0KGtleSkpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbHVlID0gbWFwLmdldChrZXkpO1xuICAgICAgICBpZiAodmFsdWUgfHwgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikpIHtcbiAgICAgICAgICAgIHJldHVybiA8Vj52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBtYXAuc2V0KGtleSwgdmFsdWUgPSBmYWN0b3J5KGtleSkpO1xuICAgICAgICBhc3NlcnQodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiKTtcbiAgICAgICAgcmV0dXJuIDxWPnZhbHVlO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gV2Vha01hcEZhY3Rvcnk8SyBleHRlbmRzIG9iamVjdCwgVj4oZmFjdG9yeTogKGtleTogSykgPT4gVik6IE1hcEZhY3Rvcnk8V2Vha01hcDxLLCBWPj4ge1xuICAgIHJldHVybiA8YW55Pm1hcEZhY3RvcnkobmV3IFdlYWtNYXAoKSwgZmFjdG9yeSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1hcEZhY3Rvcnk8SywgVj4oZmFjdG9yeTogKGtleTogSykgPT4gVik6IE1hcEZhY3Rvcnk8TWFwPEssIFY+PiB7XG4gICAgcmV0dXJuIDxhbnk+bWFwRmFjdG9yeShuZXcgTWFwKCksIGZhY3RvcnkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBCYXNlTWFwRmFjdG9yeTxLLCBWPihtYXA6IEJhc2VNYXA8SywgVj4sIGZhY3Rvcnk6IChrZXk6IEspID0+IFYpOiBNYXBGYWN0b3J5PEJhc2VNYXA8SywgVj4+IHtcbiAgICByZXR1cm4gPGFueT5tYXBGYWN0b3J5KG1hcCwgZmFjdG9yeSlcbn1cblxuIiwiaW1wb3J0IHtCYXNlTWFwLCBNYXBLZXksIE1hcFZhbHVlfSBmcm9tIFwiLi9CYXNlTWFwXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b3VjaE1hcDxUIGV4dGVuZHMgQmFzZU1hcDxhbnksIGFueT4+KFxuICAgIG1hcDogVCwga2V5OlxuICAgICAgICBNYXBLZXk8VD4sXG4gICAgY2FsbGJhY2s6IChrZXk6IE1hcEtleTxUPikgPT4gTWFwVmFsdWU8VD4pOiBNYXBWYWx1ZTxUPiB7XG4gICAgbGV0IHZhbHVlID0gbWFwLmdldChrZXkpO1xuICAgIGlmICh2YWx1ZSB8fCBtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBtYXAuc2V0KGtleSwgdmFsdWUgPSBjYWxsYmFjayhrZXkpKTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbiIsImV4cG9ydCBmdW5jdGlvbiBkZWZpbmVkPFQ+KHZhbHVlOiBULCBlcnJvck9yQ2FsbGJhY2s/KTogTm9uTnVsbGFibGU8VD4ge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICB0eXBlb2YgZXJyb3JPckNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIgPyBlcnJvck9yQ2FsbGJhY2soKSA6XG4gICAgICAgICAgICAgICAgZXJyb3JPckNhbGxiYWNrKTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5cbiIsImltcG9ydCB7ZGVmaW5lZH0gZnJvbSBcIi4vZGVmaW5lZFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lZEF0PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvYmo6IFQsIGtleTogSyk6IE5vbk51bGxhYmxlPFRbS10+IHtcbiAgICByZXR1cm4gZGVmaW5lZChvYmpba2V5XSwgKCkgPT4gYE5vICR7a2V5fWApXG59XG4iLCJpbXBvcnQge2tleXN9IGZyb20gXCIuL2tleXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uKiBlbnRyaWVzPFYgPSBhbnk+KG9iajogUmVjb3JkPHN0cmluZywgVj4gfCB1bmRlZmluZWQgfCBudWxsKTogSXRlcmFibGVJdGVyYXRvcjxbc3RyaW5nLCBWLG51bWJlcl0+IHtcbiAgICBsZXQgaW5kZXg9MDtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKG9iaikpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB5aWVsZCBba2V5LCBvYmpba2V5XSxpbmRleCsrXVxuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBoYXNLZXlzKG9iamVjdDogb2JqZWN0IHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKG9iamVjdCkgZm9yIChsZXQga2V5IGluIG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbioga2V5czxLIGV4dGVuZHMgUHJvcGVydHlLZXkgPSBzdHJpbmc+KFxuICBvYmo6IFJlY29yZDxLLCBhbnk+IHwgdW5kZWZpbmVkIHwgbnVsbFxuKTogSXRlcmFibGVJdGVyYXRvcjxzdHJpbmcgJiBLPiB7XG4gIGlmIChvYmopXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikgY29udGludWU7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgeWllbGQga2V5O1xuICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7ZW50cmllc30gZnJvbSBcIi4vZW50cmllc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwQW5kRmlsdGVyT2JqZWN0PFQsIFI+KG9iajogUmVjb3JkPHN0cmluZywgVD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcHBlcjogKHZhbHVlOiBULCBrZXk6IHN0cmluZykgPT4gUiB8IHVuZGVmaW5lZCk6IFJlY29yZDxzdHJpbmcsIFI+IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKG9iaikpIHtcbiAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gbWFwcGVyKHZhbHVlLCBrZXkpO1xuICAgICAgICBpZiAobmV4dFZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgcmVzdWx0W2tleV0gPSBuZXh0VmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vdHlwaW5nc1wiO1xuaW1wb3J0IHsgZW50cmllcyB9IGZyb20gXCIuL2VudHJpZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcE9iamVjdDxULCBSPihcbiAgb2JqOiBSZWNvcmQ8c3RyaW5nLCBUPixcbiAgbWFwcGVyOiAodmFsdWU6IFQsIGtleTogc3RyaW5nKSA9PiBSXG4pOiBSZWNvcmQ8c3RyaW5nLCBSPiB7XG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMob2JqKSkge1xuICAgIHJlc3VsdFtrZXldID0gbWFwcGVyKHZhbHVlLCBrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYXBPYmplY3RBc3luYzxULCBSPihcbiAgb2JqOiBSZWNvcmQ8c3RyaW5nLCBUPixcbiAgbWFwcGVyOiAodmFsdWU6IFQsIGtleTogc3RyaW5nKSA9PiBBd2FpdGFibGU8Uj5cbik6IFByb21pc2U8UmVjb3JkPHN0cmluZywgUj4+IHtcbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcyhvYmopKSB7XG4gICAgcmVzdWx0W2tleV0gPSBhd2FpdCBtYXBwZXIodmFsdWUsIGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsImltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi9lbnRyaWVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBPYmplY3RUb0FycmF5PFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBVPihcbiAgb2JqOiBULFxuICBtYXBwZXI6ICh2YWx1ZTogVFtrZXlvZiBUXSwga2V5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IFUgfCB1bmRlZmluZWRcbik6IFVbXSB7XG4gIGxldCBpbmRleCA9IDA7XG4gIGNvbnN0IGFycjogVVtdID0gW107XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMob2JqKSkge1xuICAgIGNvbnN0IG5leHRWYWx1ZSA9IG1hcHBlcih2YWx1ZSwga2V5LCBpbmRleCsrKTtcbiAgICBpZiAobmV4dFZhbHVlICE9PSB1bmRlZmluZWQpIGFyci5wdXNoKG5leHRWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cbiIsImltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi9lbnRyaWVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZURlc2NyaXB0b3JzPFQgZXh0ZW5kcyBvYmplY3QsIFUgZXh0ZW5kcyBvYmplY3Q+KFxuICBiYXNlOiBULFxuICBjaGlsZDogVVxuKTogT21pdDxULCBrZXlvZiBVPiAmIFUge1xuICBmb3IgKGNvbnN0IFtrZXksIGRlc2NdIG9mIGVudHJpZXMoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoYmFzZSkpKSB7XG4gICAgaWYgKCFjaGlsZC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2hpbGQsIGtleSwgZGVzYyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZihjaGlsZCwgYmFzZSk7XG59XG4iLCJpbXBvcnQge2Fzc2VydH0gZnJvbSBcIi4uL2Fzc2VydFwiO1xuXG5jb25zdCBtYXJrVG9EZWxldGUgPSBTeW1ib2woXCJkZWxldGVkXCIpO1xuXG5cbmNvbnN0IG1hcCA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBMYXp5PFQgZXh0ZW5kcyAoLi4uYXJncykgPT4gYW55PihjYWxsYmFjazogVCk6IFRcbmV4cG9ydCBmdW5jdGlvbiBMYXp5KCk6IE1ldGhvZERlY29yYXRvclxuZXhwb3J0IGZ1bmN0aW9uIExhenkoY2FsbGJhY2s/KTogYW55IHtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGxhenlDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICh0YXJnZXQsIHByb3AsIGRlc2MpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVzYy5nZXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGxhenlQcm9wZXJ0eSh0YXJnZXQsIHByb3AsIGRlc2MpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZXNjLnZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBsYXp5TWV0aG9kKHRhcmdldCwgcHJvcCwgZGVzYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxhenlDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGhpczphbnkpIHtcbiAgICAgICAgaWYgKG1hcC5oYXMoY2FsbGJhY2spKVxuICAgICAgICAgICAgcmV0dXJuIG1hcC5nZXQoY2FsbGJhY2spO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIG1hcC5zZXQoY2FsbGJhY2ssIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbGF6eVByb3BlcnR5KHRhcmdldCwgcHJvcCwgZGVzYykge1xuXG4gICAgY29uc3QgbWFwID0gbmV3IFdlYWtNYXAoKVxuICAgIGNvbnN0IGdldHRlciA9IGRlc2MuZ2V0O1xuICAgIGFzc2VydCghZGVzYy5zZXQpO1xuICAgIGRlc2Muc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmIChtYXJrVG9EZWxldGUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICBtYXAuZGVsZXRlKHRoaXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXAuc2V0KHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZXNjLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKG1hcC5oYXModGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXAuZ2V0KHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0dGVyLmFwcGx5KHRoaXMpO1xuICAgICAgICBtYXAuc2V0KHRoaXMsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBsYXp5TWV0aG9kKHRhcmdldCwgcHJvcCwgZGVzYykge1xuXG4gICAgY29uc3QgbWFwID0gbmV3IFdlYWtNYXAoKVxuICAgIGNvbnN0IG1ldGhvZCA9IGRlc2MudmFsdWU7XG4gICAgZGVsZXRlIGRlc2MudmFsdWU7XG4gICAgZGVzYy5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChtYXAuaGFzKHRoaXMpKVxuICAgICAgICAgICAgcmV0dXJuICgpID0+IG1hcC5nZXQodGhpcyk7XG5cbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG1ldGhvZC5hcHBseSh0aGlzLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIG1hcC5zZXQodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRlc2Muc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbWFya1RvRGVsZXRlKSB7XG4gICAgICAgICAgICBtYXAuZGVsZXRlKHRoaXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IHNldCBsYXp5IG1ldGhvZC5gKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbkxhenkuZGVsZXRlID0gZnVuY3Rpb24gKHRhcmdldCwgcHJvcD8pIHtcbiAgICBpZiAocHJvcCkge1xuICAgICAgICB0YXJnZXRbcHJvcF0gPSBtYXJrVG9EZWxldGU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLmRlbGV0ZSh0YXJnZXQpO1xuICAgIH1cbn1cbiIsInR5cGUgQ2FwaXRhbGl6ZTxUPiA9IHN0cmluZztcblxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemU8VCBleHRlbmRzIHN0cmluZz4oa2V5OiBUKTogQ2FwaXRhbGl6ZTxUPiB7XG4gIHJldHVybiBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7XG59XG4iLCJpbXBvcnQge1NvdXJjZUNhc2V9IGZyb20gXCIuL21hdGNoQ2FzZVwiO1xuaW1wb3J0IHtzcGxpdH0gZnJvbSBcIi4vc3BsaXRcIjtcblxuZXhwb3J0IGNvbnN0IGZyb21Db25zdGFudENhc2U6IFNvdXJjZUNhc2UgPSB0ZXh0ID0+IHNwbGl0KHRleHQsIFwiX1wiKTtcbiIsImltcG9ydCB7U2VxfSBmcm9tIFwiaW1tdXRhYmxlXCI7XG5pbXBvcnQge1NvdXJjZUNhc2V9IGZyb20gXCIuL21hdGNoQ2FzZVwiO1xuXG5cbmV4cG9ydCBjb25zdCBmcm9tUHJvcGVydHlDYXNlOiBTb3VyY2VDYXNlID0gdGV4dCA9PlxuICAgIFNlcS5JbmRleGVkKHRleHQubWF0Y2hBbGwoL1tBLVpdP1teQS1aXSovZykpXG4gICAgICAgIC5tYXAoKFt0ZXh0XSkgPT4gdGV4dCk7XG4iLCJleHBvcnQgZnVuY3Rpb24gam9pblRlbXBsYXRlPFQ+KHN0cmluZ3M6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPiwgYXJnczogVFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKGFyZzogVCkgPT4gc3RyaW5nKSB7XG4gICAgbGV0IHRleHQgPSAnJztcbiAgICBmb3IgKGxldCBbaW5kZXgsIHN0cmluZ10gb2Ygc3RyaW5ncy5lbnRyaWVzKCkpIHtcbiAgICAgICAgdGV4dCArPSBzdHJpbmc7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICAgICAgICB0ZXh0ICs9IGNhbGxiYWNrKGFyZ3NbaW5kZXhdKVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGpvaW5VcmwodXJsOiBzdHJpbmcsIC4uLmFyZ3M6IChzdHJpbmcgfCB1bmRlZmluZWQpW10pOiBzdHJpbmcge1xuICAgIGZvciAoY29uc3QgYXJnIG9mIGFyZ3MpIHtcbiAgICAgICAgaWYgKCFhcmcpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL1xcLyskL2csICcnKVxuICAgICAgICAgICAgKyAnLydcbiAgICAgICAgICAgICsgYXJnLnJlcGxhY2UoL15cXC8rL2csICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbn1cbiIsImltcG9ydCB7U2VxfSBmcm9tIFwiaW1tdXRhYmxlXCI7XG5cbmV4cG9ydCB0eXBlIFRhcmdldENhc2UgPSAod29yZHM6IFNlcS5JbmRleGVkPHN0cmluZz4pID0+IHN0cmluZztcbmV4cG9ydCB0eXBlIFNvdXJjZUNhc2UgPSAodGV4dDogc3RyaW5nKSA9PiBTZXEuSW5kZXhlZDxzdHJpbmc+O1xuXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hDYXNlKFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICBzb3VyY2U6IFNvdXJjZUNhc2UsXG4gICAgdGFyZ2V0OiBUYXJnZXRDYXNlXG4pIHtcbiAgICByZXR1cm4gdGFyZ2V0KHNvdXJjZSh0ZXh0KSlcbn1cbiIsImltcG9ydCB7U2VxfSBmcm9tIFwiaW1tdXRhYmxlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiogX3NwbGl0KHRleHQ6IHN0cmluZywgc2VwOiBzdHJpbmcpOiBJdGVyYWJsZUl0ZXJhdG9yPHN0cmluZz4ge1xuICAgIGxldCBzdGFydCA9IDA7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgcG9zID0gdGV4dC5pbmRleE9mKHNlcCwgc3RhcnQpO1xuICAgICAgICBpZiAoLTEgPT09IHBvcykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgeWllbGQgdGV4dC5zbGljZShzdGFydCwgcG9zKTtcbiAgICAgICAgc3RhcnQgPSBwb3MgKyBzZXAubGVuZ3RoO1xuICAgIH1cbiAgICB5aWVsZCBzdGFydCA/IHRleHQuc2xpY2Uoc3RhcnQpIDogdGV4dDtcblxufVxuXG5leHBvcnQgY29uc3Qgc3BsaXQgPSAodGV4dDogc3RyaW5nLCBzZXA6IHN0cmluZykgPT4gU2VxLkluZGV4ZWQoX3NwbGl0KHRleHQsIHNlcCkpXG5cblxuIiwiaW1wb3J0IHtUYXJnZXRDYXNlfSBmcm9tIFwiLi9tYXRjaENhc2VcIjtcblxuXG5leHBvcnQgY29uc3QgdG9Db25zdGFudENhc2U6IFRhcmdldENhc2UgPSB3b3JkcyA9PiB3b3Jkcy5qb2luKCdfJykudG9VcHBlckNhc2UoKVxuIiwiaW1wb3J0IHtUYXJnZXRDYXNlfSBmcm9tIFwiLi9tYXRjaENhc2VcIjtcblxuZXhwb3J0IGNvbnN0IHRvVGl0bGVDYXNlOiBUYXJnZXRDYXNlID0gd29yZHMgPT4gd29yZHNcbiAgICAubWFwKHRleHQgPT4gdGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRleHQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSlcbiAgICAuam9pbihcIiBcIik7XG5cbiIsImV4cG9ydCB0eXBlIFVuaW9uPFQ+ID0gVFtrZXlvZiBUXTtcblxuZXhwb3J0IHR5cGUgRXhwTWFwPFQ+ID0gVW5pb248XG4gIHtcbiAgICBbSyBpbiBrZXlvZiBUXTogUmVjb3JkPEssIFRbS10+O1xuICB9XG4+O1xuZXhwb3J0IHR5cGUgTnVsbGFibGUgPSB1bmRlZmluZWQgfCBudWxsO1xuXG5leHBvcnQgdHlwZSBBd2FpdGFibGU8VCA9IGFueT4gPSBQcm9taXNlPFQ+IHwgVDtcblxuZXhwb3J0IHR5cGUgRm4gPSAoLi4uYXJnczogYW55W10pID0+IGFueTtcblxuZXhwb3J0IHR5cGUgUHJvbWlzZVR5cGU8VCBleHRlbmRzIFByb21pc2U8YW55Pj4gPSBUIGV4dGVuZHMgUHJvbWlzZTxpbmZlciBVPlxuICA/IFVcbiAgOiBuZXZlcjtcblxuZXhwb3J0IHR5cGUgQXdhaXRlZDxUIGV4dGVuZHMgQXdhaXRhYmxlPiA9IFQgZXh0ZW5kcyBBd2FpdGFibGU8aW5mZXIgVT5cbiAgPyBVXG4gIDogbmV2ZXI7XG5cbmV4cG9ydCB0eXBlIEV4dHJhY3RLZXlzPFQsIFY+ID0gRXhjbHVkZTxcbiAgVW5pb248XG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBWID8gSyA6IG5ldmVyO1xuICAgIH1cbiAgPixcbiAgbmV2ZXJcbj47XG5cbmV4cG9ydCB0eXBlIEV4Y2x1ZGVLZXlzPFQsIFY+ID0gRXhjbHVkZTxcbiAgVW5pb248XG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBWID8gbmV2ZXIgOiBLO1xuICAgIH1cbiAgPixcbiAgbmV2ZXJcbj47XG5cbmV4cG9ydCB0eXBlIFBpY2tCeVZhbHVlPFQsIFY+ID0gUGljazxULCBFeHRyYWN0S2V5czxULCBWPj47XG5leHBvcnQgdHlwZSBPbWl0QnlWYWx1ZTxULCBWPiA9IE9taXQ8VCwgRXh0cmFjdEtleXM8VCwgVj4+O1xuXG5leHBvcnQgdHlwZSBQbHVja1JlcXVpcmVkPFQsIEsgZXh0ZW5kcyBQcm9wZXJ0eUtleSwgRSA9IG5ldmVyPiA9IElzTmV2ZXI8XG4gIFRcbj4gZXh0ZW5kcyB0cnVlXG4gID8gRVxuICA6IFJlcXVpcmVkPFQ+IGV4dGVuZHMgUmVjb3JkPEssIGluZmVyIFU+XG4gID8gVVxuICA6IEU7XG5cbmV4cG9ydCB0eXBlIEF0PFQsIEsgZXh0ZW5kcyBQcm9wZXJ0eUtleT4gPSBLIGV4dGVuZHMga2V5b2YgUmVxdWlyZWQ8VD5cbiAgPyBUW0tdXG4gIDogbmV2ZXI7XG5cbmV4cG9ydCB0eXBlIFBhcnRpYWxLZXlzPFQsIEsgZXh0ZW5kcyBrZXlvZiBUPiA9IE9taXQ8VCwgSz4gJlxuICBQYXJ0aWFsPFBpY2s8VCwgSz4+O1xuXG5leHBvcnQgZnVuY3Rpb24gTnVsbGFibGU8VD4odmFsdWU/OiBUKTogVCB8IE51bGxhYmxlIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgdHlwZSBUeXBlPFQ+ID0gRnVuY3Rpb24gJiB7IHByb3RvdHlwZTogVCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gVHlwaW5nPFQ+KCk6IFQge1xuICByZXR1cm4gPGFueT4oKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9KTtcbn1cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFR5cGVSZWZzIHt9XG59XG5leHBvcnQgZnVuY3Rpb24gVHlwZVJlZjxLIGV4dGVuZHMgUHJvcGVydHlLZXk+KFxuICBjYjogKCkgPT4gS1xuKTogSyBleHRlbmRzIGtleW9mIFR5cGVSZWZzID8gVHlwZVJlZnNbS10gOiBuZXZlciB7XG4gIHJldHVybiA8YW55PigoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIFR5cGU8VCA9IGFueT4odGhpczogYW55KTogVHlwZTxUPiB7XG4gIGlmICh0aGlzIGluc3RhbmNlb2YgVHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9XG4gIHJldHVybiBUeXBlO1xufVxuXG5leHBvcnQgdHlwZSBQYXlsb2FkPFxuICBUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgb2JqZWN0PixcbiAgVSBleHRlbmRzIG9iamVjdCA9IHt9XG4+ID0gVW5pb248eyBbSyBpbiBrZXlvZiBUXTogeyB0eXBlOiBLIH0gJiBUW0tdICYgVSB9PjtcblxuZXhwb3J0IHR5cGUgQXNzaWduPFQsIFU+ID0gT21pdDxULCBrZXlvZiBSZXF1aXJlZDxVPj4gJiBVO1xuZXhwb3J0IHR5cGUgT3ZlcnJpZGU8VCBleHRlbmRzIG9iamVjdCwgVSBleHRlbmRzIG9iamVjdD4gPSBPbWl0PFQsIGtleW9mIFU+ICYgVTtcbmV4cG9ydCB0eXBlIFJlcGxhY2U8VCBleHRlbmRzIG9iamVjdCwgVSBleHRlbmRzIFBhcnRpYWw8VD4+ID0gRXh0cmFjdDxcbiAgT3ZlcnJpZGU8VCwgVT4sXG4gIFRcbj47XG5leHBvcnQgdHlwZSBBc3NpZ25LZXlzPFQsIFU+ID0gSGFzS2V5czxUPiBleHRlbmRzIGZhbHNlXG4gID8gVVxuICA6IEhhc0tleXM8VT4gZXh0ZW5kcyBmYWxzZVxuICA/IFRcbiAgOiBBc3NpZ248VCwgVT47XG5cbmV4cG9ydCB0eXBlIEFycmF5VHlwZU9yT2JqZWN0PFQ+ID0gVCBleHRlbmRzIEFycmF5PGluZmVyIFU+XG4gID8gVVxuICA6IEV4dHJhY3Q8VCwgb2JqZWN0PjtcblxuZXhwb3J0IHR5cGUgT3B0aW9uYWxBcmc8VD4gPSBJc05ldmVyPFQ+IGV4dGVuZHMgdHJ1ZSA/IFtdIDogW1RdO1xuXG5leHBvcnQgdHlwZSBOZXZlcktleXM8VD4gPSBVbmlvbjxcbiAge1xuICAgIFtLIGluIGtleW9mIFRdOiBJc05ldmVyPFRbS10+IGV4dGVuZHMgdHJ1ZSA/IEsgOiBuZXZlcjtcbiAgfVxuPjtcblxuZXhwb3J0IHR5cGUgT21pdE5ldmVyS2V5czxUPiA9IE9taXQ8VCwgTmV2ZXJLZXlzPFQ+PjtcblxuZXhwb3J0IHR5cGUgT3B0aW9uYWxPYmplY3RBcmc8VD4gPSBJc05ldmVyPFVuaW9uPFQ+PiBleHRlbmRzIHRydWVcbiAgPyBbXVxuICA6IFtPbWl0PFQsIE5ldmVyS2V5czxUPj5dO1xuXG5leHBvcnQgdHlwZSBEZWZhdWx0SWZOZXZlcjxULCBVPiA9IElzTmV2ZXI8VD4gZXh0ZW5kcyB0cnVlID8gVSA6IFQ7XG5cbmV4cG9ydCB0eXBlIElmTmV2ZXI8VCwgVSwgRSA9IG5ldmVyPiA9IElzTmV2ZXI8VD4gZXh0ZW5kcyB0cnVlID8gVSA6IEU7XG5cbmV4cG9ydCB0eXBlIENvbW1vbjxMLCBSPiA9IE9taXRCeVZhbHVlPFxuICB7XG4gICAgW0sgaW4ga2V5b2YgKEwgJiBSKV06IEsgZXh0ZW5kcyBrZXlvZiBMXG4gICAgICA/IEsgZXh0ZW5kcyBrZXlvZiBSXG4gICAgICAgID8gRXh0cmFjdDxMW0tdLCBSW0tdPlxuICAgICAgICA6IG5ldmVyXG4gICAgICA6IG5ldmVyO1xuICB9LFxuICBuZXZlclxuPjtcblxuZXhwb3J0IHR5cGUgUmVxdWlyZWRLZXlzPFQ+ID0gVW5pb248XG4gIHtcbiAgICBbSyBpbiBrZXlvZiBUXTogVCBleHRlbmRzIFJlY29yZDxLLCBhbnk+ID8gSyA6IG5ldmVyO1xuICB9XG4+O1xuXG5leHBvcnQgdHlwZSBPcHRpb25hbEtleXM8VD4gPSBVbmlvbjxcbiAge1xuICAgIFtLIGluIGtleW9mIFRdOiBUIGV4dGVuZHMgUmVjb3JkPEssIGFueT4gPyBuZXZlciA6IEs7XG4gIH1cbj47XG5cbmV4cG9ydCB0eXBlIE9wdGlvbmFsT25seTxULCBLIGV4dGVuZHMga2V5b2YgVCA9IG5ldmVyPiA9IE9taXQ8XG4gIFQsXG4gIEV4Y2x1ZGU8UmVxdWlyZWRLZXlzPFQ+LCBLPlxuPjtcblxuZXhwb3J0IHR5cGUgUmVxdWlyZWRPbmx5PFQ+ID0gUGljazxULCBSZXF1aXJlZEtleXM8VD4+O1xuXG5leHBvcnQgdHlwZSBPcHRpb25hbDxUPiA9IFBpY2s8VCwgT3B0aW9uYWxLZXlzPFQ+PjtcblxuZXhwb3J0IHR5cGUgSXNOZXZlcjxUPiA9IFtUXSBleHRlbmRzIFtuZXZlcl0gPyB0cnVlIDogZmFsc2U7XG5leHBvcnQgdHlwZSBJczxULCBVPiA9IFtUXSBleHRlbmRzIFtVXSA/IHRydWUgOiBmYWxzZTtcbmV4cG9ydCB0eXBlIEV4cGVjdDxULCBVIGV4dGVuZHMgVD4gPSBVO1xuZXhwb3J0IHR5cGUgSXNFbXB0eU9iamVjdDxUPiA9IElzPHt9LCBUPjtcblxuZXhwb3J0IHR5cGUgQW5kPFQgZXh0ZW5kcyBib29sZWFuLCBVIGV4dGVuZHMgYm9vbGVhbj4gPSBUIGV4dGVuZHMgdHJ1ZVxuICA/IFUgZXh0ZW5kcyB0cnVlXG4gICAgPyB0cnVlXG4gICAgOiBmYWxzZVxuICA6IGZhbHNlO1xuXG5leHBvcnQgdHlwZSBPcjxUIGV4dGVuZHMgYm9vbGVhbiwgVSBleHRlbmRzIGJvb2xlYW4+ID0gVCBleHRlbmRzIHRydWVcbiAgPyB0cnVlXG4gIDogVSBleHRlbmRzIHRydWVcbiAgPyB0cnVlXG4gIDogZmFsc2U7XG5cbmV4cG9ydCB0eXBlIElzU29tZTxULCBVPiA9IEFuZDxJczxULCBVPiwgSXM8VSwgVD4+O1xuZXhwb3J0IHR5cGUgSXNOb3Q8VCwgVT4gPSBUIGV4dGVuZHMgVSA/IGZhbHNlIDogdHJ1ZTtcblxuZXhwb3J0IHR5cGUgSXNBbnk8VD4gPSAwIGV4dGVuZHMgMSAmIFQgPyB0cnVlIDogZmFsc2U7XG5cbmV4cG9ydCB0eXBlIElzRXh0ZW5kPFQsIFU+ID0gVCBleHRlbmRzIFUgPyB0cnVlIDogZmFsc2U7XG5cbmV4cG9ydCB0eXBlIElzTnVsbDxUPiA9IFQgZXh0ZW5kcyB1bmRlZmluZWQgfCBudWxsID8gdHJ1ZSA6IGZhbHNlO1xuXG5leHBvcnQgdHlwZSBIYXNLZXlzPFQ+ID0gSXNOZXZlcjxUPiBleHRlbmRzIHRydWVcbiAgPyBmYWxzZVxuICA6IE5vdDxJc05ldmVyPGtleW9mIFQ+PjtcblxuZXhwb3J0IHR5cGUgTm90PFQgZXh0ZW5kcyBib29sZWFuPiA9IFQgZXh0ZW5kcyB0cnVlID8gZmFsc2UgOiB0cnVlO1xuXG5leHBvcnQgdHlwZSBJZjxDIGV4dGVuZHMgYm9vbGVhbiwgVCwgRSA9IG5ldmVyPiA9IEMgZXh0ZW5kcyB0cnVlID8gVCA6IEU7XG5leHBvcnQgdHlwZSBJZk5vdDxDIGV4dGVuZHMgYm9vbGVhbiwgVCwgRSA9IG5ldmVyPiA9IElmPEMsIEUsIFQ+O1xuXG5leHBvcnQgdHlwZSBDb25zdHJ1Y3RvcjxUPiA9IHsgbmV3ICguLi5hcmdzOiBhbnlbXSk6IFQgfTtcblxuZXhwb3J0IHR5cGUgTWVyZ2U8TCwgUiwgTT4gPSBIYXNLZXlzPEw+IGV4dGVuZHMgZmFsc2VcbiAgPyBSXG4gIDogSGFzS2V5czxSPiBleHRlbmRzIGZhbHNlXG4gID8gTFxuICA6IEFzc2lnbktleXM8TCwgTT47XG5cbmV4cG9ydCB0eXBlIFBhcnRpYWxVbmRlZmluZWRLZXlzPFQsIFUgPSB7fT4gPVxuICB8IChVICYgVClcbiAgfCAoVSAmXG4gICAgICBQYXJ0aWFsS2V5czxcbiAgICAgICAgVCxcbiAgICAgICAgVW5pb248XG4gICAgICAgICAge1xuICAgICAgICAgICAgW0sgaW4ga2V5b2YgUmVxdWlyZWQ8VD5dOiBPcjxcbiAgICAgICAgICAgICAgSXNOZXZlcjxUW0tdPixcbiAgICAgICAgICAgICAgSXNBbnk8VFtLXT5cbiAgICAgICAgICAgID4gZXh0ZW5kcyB0cnVlXG4gICAgICAgICAgICAgID8gbmV2ZXJcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQgZXh0ZW5kcyBUW0tdXG4gICAgICAgICAgICAgID8gS1xuICAgICAgICAgICAgICA6IG5ldmVyO1xuICAgICAgICAgIH1cbiAgICAgICAgPlxuICAgICAgPik7XG5cbmV4cG9ydCB0eXBlIFVuZGVmaW5lZElmRW1wdHlPYmplY3Q8VD4gPSBJZjxJc0VtcHR5T2JqZWN0PFQ+LCB1bmRlZmluZWQ+IHwgVDtcblxuZXhwb3J0IHR5cGUgUmVxdWlyZU9wdGlvbmFsS2V5czxUPiA9IHtcbiAgW0sgaW4ga2V5b2YgUmVxdWlyZWQ8VD5dOiBUW0tdO1xufTtcblxuZXhwb3J0IHR5cGUgSWZOdWxsPFQsIFU+ID0gVCBleHRlbmRzIG51bGwgPyBVIDogbmV2ZXI7XG5cbmV4cG9ydCB0eXBlIEFzeW5jRm48VCBleHRlbmRzICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PiA9IChcbiAgLi4uYXJnczogUGFyYW1ldGVyczxUPlxuKSA9PiBQcm9taXNlPFJldHVyblR5cGU8VD4+O1xuXG5leHBvcnQgdHlwZSBTeW5jRm48VCBleHRlbmRzICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PiA9IChcbiAgLi4uYXJnczogUGFyYW1ldGVyczxUPlxuKSA9PiBBd2FpdGVkPFJldHVyblR5cGU8VD4+O1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBUeXBlUmVmcyB7fVxufVxuXG5leHBvcnQgdHlwZSBUeXBlUmVmPEsgZXh0ZW5kcyBQcm9wZXJ0eUtleT4gPSBLIGV4dGVuZHMga2V5b2YgVHlwZVJlZnNcbiAgPyBUeXBlUmVmc1tLXVxuICA6IG5ldmVyO1xuXG5leHBvcnQgdHlwZSBOb25OdWxsYWJsZUF0PFxuICBULFxuICBLIGV4dGVuZHMga2V5b2YgUmVxdWlyZWQ8VD4sXG4gIEQgPSBuZXZlcixcbiAgViA9IE5vbk51bGxhYmxlPFRbS10+XG4+ID0gSXNOZXZlcjxWPiBleHRlbmRzIHRydWUgPyBEIDogVjtcblxuZXhwb3J0IHR5cGUgT21pdEtleXM8VCwgSyBleHRlbmRzIGtleW9mIFQ+ID0gT21pdDxULCBLPjtcblxuZXhwb3J0IHR5cGUgVW5kZWZpbmVkSWZJc1VuZGVmaW5lZDxUPiA9IElmPElzVW5kZWZpbmVkPFQ+LCB1bmRlZmluZWQ+O1xuXG5leHBvcnQgdHlwZSBJc1VuZGVmaW5lZDxUPiA9IHVuZGVmaW5lZCBleHRlbmRzIFQgPyB0cnVlIDogZmFsc2U7XG5cbmV4cG9ydCB0eXBlIERlZmluZWQ8VD4gPSBUIGV4dGVuZHMgdW5kZWZpbmVkID8gbmV2ZXIgOiBUO1xuXG5leHBvcnQgdHlwZSBPbWl0UmVxdWlyZWRLZXlzPFQgZXh0ZW5kcyBVLCBVPiA9IE9taXQ8VCwga2V5b2YgUmVxdWlyZWQ8VT4+O1xuZXhwb3J0IHR5cGUgS2V5TWFwPFQ+ID0gUmVjb3JkPHN0cmluZywgVD47XG4iLCJleHBvcnQge1xuICAgIFNldCBhcyBJbW11dGFibGVTZXQsXG4gICAgUmVjb3JkIGFzIEltbXV0YWJsZVJlY29yZCxcbiAgICBNYXAgYXMgSW1tdXRhYmxlTWFwLFxuICAgIExpc3QgYXMgSW1tdXRhYmxlTGlzdCxcblxufSBmcm9tIFwiaW1tdXRhYmxlXCI7XG5cbmltcG9ydCAqIGFzIEltbXV0YWJsZSBmcm9tIFwiaW1tdXRhYmxlXCI7XG5pbXBvcnQge1NlcX0gZnJvbSBcImltbXV0YWJsZVwiO1xuXG5leHBvcnQgdHlwZSBJbW11dGFibGVLZXlzID0gSW1tdXRhYmxlLlNldDxzdHJpbmc+O1xuZXhwb3J0IGNvbnN0IEltbXV0YWJsZUtleXMgPSBJbW11dGFibGUuU2V0PHN0cmluZz4oKTtcblxuZXhwb3J0IHR5cGUgSW5kZXhlZFNlcTxUPiA9IFNlcS5JbmRleGVkPFQ+O1xuZXhwb3J0IGNvbnN0IEluZGV4ZWRTZXEgPSBTZXEuSW5kZXhlZDtcbiIsImltcG9ydCB7Y3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7TGFuZ1RlbXBsYXRlLCBMYW5nVGVtcGxhdGVQcm9wc30gZnJvbSBcIi4vTGFuZ1RlbXBsYXRlXCI7XG5pbXBvcnQge0xhbmdWaWV3fSBmcm9tIFwiLi9MYW5nVmlld1wiO1xuXG5leHBvcnQgdHlwZSBMYW5nVG9rZW5FbGVtZW50ID0gUmVhY3RFbGVtZW50PExhbmdUb2tlblByb3BzPjtcblxuZXhwb3J0IHR5cGUgTGFuZ1Rva2VuUHJvcHMgPSB7XG4gICAgdHlwZTogTGFuZ1Byb3BzVHlwZS50b2tlbixcbiAgICB0b2tlbjogc3RyaW5nXG59O1xuXG5leHBvcnQgdHlwZSBMYW5nID0gTGFuZ1RlbXBsYXRlPGFueT4gfCBSZWFjdEVsZW1lbnQ8TGFuZ1Rva2VuUHJvcHM+O1xuXG5leHBvcnQgdHlwZSBMYW5nRWxlbWVudCA9IFJlYWN0RWxlbWVudDxMYW5nUHJvcHM+O1xuXG5leHBvcnQgdHlwZSBMYW5nTm9kZSA9IG51bWJlciB8IHN0cmluZyB8IExhbmdFbGVtZW50IHwgTGFuZ05vZGVbXSB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IGVudW0gTGFuZ1Byb3BzVHlwZSB7XG4gICAgdG9rZW4sXG4gICAgdGVtcGxhdGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExhbmcoc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXkpOiBSZWFjdEVsZW1lbnQ8TGFuZ1Rva2VuUHJvcHM+XG5leHBvcnQgZnVuY3Rpb24gTGFuZzxQIGV4dGVuZHMgc3RyaW5nLCBLIGV4dGVuZHMgc3RyaW5nPihcbiAgICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgICBwYXJhbTogUCxcbiAgICAuLi5wYXJhbXM6IEtbXSk6IExhbmdUZW1wbGF0ZTxQIHwgSz5cbmV4cG9ydCBmdW5jdGlvbiBMYW5nKHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5wYXJhbXMpOiBhbnkge1xuICAgIGlmIChzdHJpbmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChMYW5nVmlldywge1xuICAgICAgICAgICAgdHlwZTogTGFuZ1Byb3BzVHlwZS50b2tlbixcbiAgICAgICAgICAgIHRva2VuOiBzdHJpbmdzWzBdXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBMYW5nVGVtcGxhdGUoc3RyaW5ncy5yYXcsIHBhcmFtcylcbn1cblxuXG5leHBvcnQgdHlwZSBMYW5nUHJvcHMgPSBMYW5nVGVtcGxhdGVQcm9wczxhbnk+IHwgTGFuZ1Rva2VuUHJvcHM7XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIFJlYWN0Tm9kZSwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZnJvbVByb3BlcnR5Q2FzZSB9IGZyb20gXCIuLi9jb21tb24vc3RyaW5nL2Zyb21Qcm9wZXJ0eUNhc2VcIjtcbmltcG9ydCB7IG1hdGNoQ2FzZSwgU291cmNlQ2FzZSB9IGZyb20gXCIuLi9jb21tb24vc3RyaW5nL21hdGNoQ2FzZVwiO1xuaW1wb3J0IHsgdG9Db25zdGFudENhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy90b0NvbnN0YW50Q2FzZVwiO1xuaW1wb3J0IHsgTGFuZ1Byb3BzVHlwZSB9IGZyb20gXCIuL0xhbmdcIjtcbmltcG9ydCB7IExhbmdWaWV3IH0gZnJvbSBcIi4vTGFuZ1ZpZXdcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIExhbmdLZXkocHJvcHM6IHtcbiAgZm9yOiBzdHJpbmc7XG4gIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG4gIHNvdXJjZUNhc2U/OiBTb3VyY2VDYXNlO1xufSk6IFJlYWN0RWxlbWVudCB7XG4gIHJldHVybiB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAocHJvcHMuY2hpbGRyZW4gIT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gPD57cHJvcHMuY2hpbGRyZW59PC8+O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8TGFuZ1ZpZXdcbiAgICAgICAgdHlwZT17TGFuZ1Byb3BzVHlwZS50b2tlbn1cbiAgICAgICAgdG9rZW49e21hdGNoQ2FzZShcbiAgICAgICAgICBwcm9wcy5mb3IsXG4gICAgICAgICAgcHJvcHMuc291cmNlQ2FzZSB8fCBmcm9tUHJvcGVydHlDYXNlLFxuICAgICAgICAgIHRvQ29uc3RhbnRDYXNlXG4gICAgICAgICl9XG4gICAgICAvPlxuICAgICk7XG4gIH0sIFtwcm9wcy5jaGlsZHJlbiwgcHJvcHMuZm9yXSk7XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGRlZmluZWRBdCB9IGZyb20gXCIuLi9jb21tb24vb2JqZWN0L2RlZmluZWRBdFwiO1xuaW1wb3J0IHsgam9pblRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9zdHJpbmcvam9pblRlbXBsYXRlXCI7XG5pbXBvcnQgeyBMYW5nRWxlbWVudCwgTGFuZ05vZGUsIExhbmdQcm9wc1R5cGUsIExhbmdUb2tlbkVsZW1lbnQgfSBmcm9tIFwiLi9MYW5nXCI7XG5pbXBvcnQgeyBMYW5nVmlldyB9IGZyb20gXCIuL0xhbmdWaWV3XCI7XG5cbmV4cG9ydCB0eXBlIExhbmdUZW1wbGF0ZTxLIGV4dGVuZHMgc3RyaW5nPiA9IHtcbiAgdG9rZW46IHN0cmluZztcblxuICAvLyBmb3JtYXR0ZXJcbiAgKHByb3BzOiBSZWNvcmQ8SywgTGFuZ05vZGU+KTogTGFuZ1RlbXBsYXRlRWxlbWVudDxLPjtcblxuICAvLyBwcm92aWRlclxuICAoc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLmtleXM6IEtbXSk6IExhbmdUZW1wbGF0ZUVudHJ5PEs+O1xufTtcblxuZXhwb3J0IHR5cGUgTGFuZ1RlbXBsYXRlRm9ybWF0dGVyPEsgZXh0ZW5kcyBzdHJpbmc+ID0gKFxuICBwcm9wczogUmVjb3JkPEssIGFueT5cbikgPT4gc3RyaW5nO1xuXG5leHBvcnQgdHlwZSBMYW5nVGVtcGxhdGVFbnRyeTxLIGV4dGVuZHMgc3RyaW5nPiA9IFtcbiAgc3RyaW5nLFxuICBMYW5nVGVtcGxhdGVGb3JtYXR0ZXI8Sz5cbl07XG5cbmV4cG9ydCB0eXBlIExhbmdUZW1wbGF0ZVByb3BzPEsgZXh0ZW5kcyBzdHJpbmc+ID0ge1xuICB0eXBlOiBMYW5nUHJvcHNUeXBlLnRlbXBsYXRlO1xuICB0b2tlbjogc3RyaW5nO1xuICBwcm9wczogUmVjb3JkPFxuICAgIEssXG4gICAgTGFuZ1RlbXBsYXRlRWxlbWVudDxhbnk+IHwgTGFuZ1Rva2VuRWxlbWVudCB8IHN0cmluZyB8IG51bWJlclxuICA+O1xuICBwYXJhbXM6IEtbXTtcbiAgc3RyaW5nczogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xufTtcblxuZXhwb3J0IHR5cGUgTGFuZ1RlbXBsYXRlRWxlbWVudDxLIGV4dGVuZHMgc3RyaW5nPiA9IFJlYWN0RWxlbWVudDxcbiAgTGFuZ1RlbXBsYXRlUHJvcHM8Sz5cbj47XG5cbmV4cG9ydCBmdW5jdGlvbiBMYW5nVGVtcGxhdGU8SyBleHRlbmRzIHN0cmluZz4oXG4gIHN0cmluZ3M6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPixcbiAgcGFyYW1zOiBLW11cbik6IExhbmdUZW1wbGF0ZTxLPiB7XG4gIGNvbnN0IHRva2VuID0gam9pblRlbXBsYXRlKHN0cmluZ3MsIHBhcmFtcywgcGFyYW0gPT4gYHske3BhcmFtfX1gKTtcblxuICB0ZW1wbGF0ZS50b2tlbiA9IHRva2VuO1xuICByZXR1cm4gPGFueT50ZW1wbGF0ZTtcblxuICBmdW5jdGlvbiB0ZW1wbGF0ZShhcmcwLCAuLi5hcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwICYmIHR5cGVvZiBhcmcwID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChMYW5nVmlldywge1xuICAgICAgICB0eXBlOiBMYW5nUHJvcHNUeXBlLnRlbXBsYXRlLFxuICAgICAgICB0b2tlbixcbiAgICAgICAgcHJvcHM6IGFyZzAsXG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgc3RyaW5ncyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0ZW1wbGF0ZWAuLi5gXG4gICAgICByZXR1cm4gW1xuICAgICAgICB0b2tlbixcbiAgICAgICAgcHJvcHMgPT5cbiAgICAgICAgICBqb2luVGVtcGxhdGUoPHN0cmluZ1tdPmFyZzAsIGFyZ3MsIGFyZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGVmaW5lZEF0KHByb3BzLCBhcmcpO1xuICAgICAgICAgIH0pLFxuICAgICAgXTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7Y3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge21hcE9iamVjdH0gZnJvbSBcIi4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0XCI7XG5pbXBvcnQge2Zyb21Db25zdGFudENhc2V9IGZyb20gXCIuLi9jb21tb24vc3RyaW5nL2Zyb21Db25zdGFudENhc2VcIjtcbmltcG9ydCB7am9pblRlbXBsYXRlfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy9qb2luVGVtcGxhdGVcIjtcbmltcG9ydCB7bWF0Y2hDYXNlfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy9tYXRjaENhc2VcIjtcbmltcG9ydCB7dG9UaXRsZUNhc2V9IGZyb20gXCIuLi9jb21tb24vc3RyaW5nL3RvVGl0bGVDYXNlXCI7XG5pbXBvcnQge0xhbmdOb2RlLCBMYW5nUHJvcHMsIExhbmdQcm9wc1R5cGUsIExhbmdUb2tlblByb3BzfSBmcm9tIFwiLi9MYW5nXCI7XG5pbXBvcnQge0xhbmdNYXB9IGZyb20gXCIuL0xhbmdNYXBcIjtcbmltcG9ydCB7TGFuZ1RlbXBsYXRlUHJvcHN9IGZyb20gXCIuL0xhbmdUZW1wbGF0ZVwiO1xuXG5cbmV4cG9ydCBjbGFzcyBMYW5nVHJhbnNsYXRvciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIG1hcDogTGFuZ01hcCkge1xuICAgIH1cblxuXG4gICAgdHJhbnNsYXRlTm9kZShub2RlOiBMYW5nTm9kZSk6c3RyaW5nfHVuZGVmaW5lZCB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIG5vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm1hcChub2RlID0+IHRoaXMudHJhbnNsYXRlTm9kZShub2RlKSkuam9pbignJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlUHJvcHMobm9kZS5wcm9wcyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZVByb3BzKHByb3BzOiBMYW5nUHJvcHMpIHtcbiAgICAgICAgc3dpdGNoIChwcm9wcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIExhbmdQcm9wc1R5cGUudGVtcGxhdGU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlVGVtcGxhdGUocHJvcHMpO1xuICAgICAgICAgICAgY2FzZSBMYW5nUHJvcHNUeXBlLnRva2VuOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVRva2VuKHByb3BzLnRva2VuKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVEZWZhdWx0VG9rZW4odG9rZW46IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBbdG9rZW5dID0gbWF0Y2hDYXNlKHRva2VuLCBmcm9tQ29uc3RhbnRDYXNlLCB0b1RpdGxlQ2FzZSk7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlVG9rZW4odG9rZW46c3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLm1hcFt0b2tlbl07XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBbdG9rZW5dID0gdmFsdWUoe30pO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVEZWZhdWx0VG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBOb3Qgc3VwcG9ydCAke3R5cGVvZiB2YWx1ZX1gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlVGVtcGxhdGUodGVtcGxhdGU6IExhbmdUZW1wbGF0ZVByb3BzPGFueT4pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMubWFwW3RlbXBsYXRlLnRva2VuXTtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZShtYXBPYmplY3QodGVtcGxhdGUucHJvcHMsIG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVByb3BzKG5vZGUucHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcobm9kZSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hDYXNlKFxuICAgICAgICAgICAgICAgICAgICBqb2luVGVtcGxhdGUodGVtcGxhdGUuc3RyaW5ncywgdGVtcGxhdGUucGFyYW1zLCBwYXJhbSA9PiBTdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlTm9kZSggdGVtcGxhdGUucHJvcHNbcGFyYW1dKVxuICAgICAgICAgICAgICAgICAgICApKSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbUNvbnN0YW50Q2FzZSxcbiAgICAgICAgICAgICAgICAgICAgdG9UaXRsZUNhc2VcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBDYW4ndCB0cmFuc2xhdGUgJHt0eXBlb2YgdmFsdWV9LmApXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IExhbmdUcmFuc2xhdG9yQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQobmV3IExhbmdUcmFuc2xhdG9yKHt9KSk7XG5leHBvcnQgY29uc3QgdXNlTGFuZ1RyYW5zbGF0b3IgPSAoKSA9PiB1c2VDb250ZXh0KExhbmdUcmFuc2xhdG9yQ29udGV4dCk7XG5cbiIsImltcG9ydCB7Y3JlYXRlRWxlbWVudCwgRnJhZ21lbnQsIHVzZUNvbnRleHR9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtMYW5nUHJvcHN9IGZyb20gXCIuL0xhbmdcIjtcbmltcG9ydCB7TGFuZ1RyYW5zbGF0b3JDb250ZXh0fSBmcm9tIFwiLi9MYW5nVHJhbnNsYXRvclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gTGFuZ1ZpZXcocHJvcHM6IExhbmdQcm9wcykge1xuICAgIGNvbnN0IHRyYW5zbGF0b3IgPSB1c2VDb250ZXh0KExhbmdUcmFuc2xhdG9yQ29udGV4dCk7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIHRyYW5zbGF0b3IudHJhbnNsYXRlUHJvcHMocHJvcHMpKVxufVxuXG4iLCJpbXBvcnQgeyBtYXBPYmplY3RUb0FycmF5IH0gZnJvbSBcIi4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0VG9BcnJheVwiO1xuXG4vLyB0cnlpbmcgdG8gcmVxdWlyZSBcInV0aWxcIiBtb2R1bGUuXG5cbmNvbnN0IHV0aWw6XG4gIHwgdW5kZWZpbmVkXG4gIHwge1xuICAgICAgaW5zcGVjdDtcbiAgICB9ID0gKChyLCBtKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHIobSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7fVxufSkocmVxdWlyZSwgXCJ1dGlsXCIpO1xuXG5pbnNwZWN0LmN1c3RvbSA9IHV0aWw/Lmluc3BlY3QuY3VzdG9tID8/IFN5bWJvbCgpO1xuZXhwb3J0IGZ1bmN0aW9uIGluc3BlY3QoLi4uYXJncyk6IHN0cmluZyB7XG4gIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgIGFyZ3MgPSBbLi4uYXJncywgeyBkZXB0aDogMTAwIH1dO1xuICB9XG4gIGNvbnN0IFt2YWx1ZV0gPSBhcmdzO1xuXG4gIGlmICh0eXBlb2YgdmFsdWU/Lmluc3BlY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB2YWx1ZS5pbnNwZWN0KCk7XG4gIH1cblxuICBpZiAodXRpbCkgcmV0dXJuIHV0aWwuaW5zcGVjdC5hcHBseSh1dGlsLCBhcmdzKTtcblxuICBjb25zdCBtZXRob2QgPSB2YWx1ZT8uW2luc3BlY3QuY3VzdG9tXTtcbiAgaWYgKG1ldGhvZCkgcmV0dXJuIG1ldGhvZC5hcHBseSh2YWx1ZSk7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiAoXG4gICAgICBcIltcIiArXG4gICAgICB2YWx1ZVxuICAgICAgICAudG9TZXEoKVxuICAgICAgICAubWFwKHZhbHVlID0+IGluc3BlY3QodmFsdWUpKVxuICAgICAgICAuam9pbihcIiwgXCIpICtcbiAgICAgIFwiXVwiXG4gICAgKTtcbiAgfVxuICBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKSA9PT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgIHJldHVybiBgeyR7bWFwT2JqZWN0VG9BcnJheShcbiAgICAgIHZhbHVlLFxuICAgICAgKHZhbHVlLCBrZXkpID0+IGluc3BlY3Qoa2V5KSArIFwiOiBcIiArIGluc3BlY3QodmFsdWUpXG4gICAgKX19YDtcbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudFR5cGUsIFJlZiwgdXNlRWZmZWN0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCB0eXBlIFJlZlR5cGU8VCBleHRlbmRzIFJlYWN0LlJlZjxhbnk+PiA9IFQgZXh0ZW5kcyBSZWFjdC5SZWY8aW5mZXIgVT5cbiAgPyBVXG4gIDogbmV2ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VVcGRhdGVSZWY8VCBleHRlbmRzIFJlZjxhbnk+IHwgdW5kZWZpbmVkPihcbiAgcmVmOiBULFxuICBjcmVhdGU6ICgpID0+IFJlZlR5cGU8Tm9uTnVsbGFibGU8VD4+XG4pIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZWYgJiYgdXBkYXRlUmVmKHJlZiwgY3JlYXRlKCkpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZWYgJiYgdXBkYXRlUmVmKHJlZiwgbnVsbCk7XG4gICAgfTtcbiAgfSwgW3R5cGVvZiAocmVmIHx8IHVuZGVmaW5lZCldKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVJlZjxUPihyZWY6IFJlYWN0LlJlZjxUPiB8IHVuZGVmaW5lZCwgdmFsdWU6IFQpIHtcbiAgaWYgKHJlZilcbiAgICBzd2l0Y2ggKHR5cGVvZiByZWYpIHtcbiAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICByZXR1cm4gcmVmKHZhbHVlKTtcbiAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICByZWZbXCJjdXJyZW50XCJdID0gdmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBIb29rUmVmPFQ+ID0geyBob29rUmVmPzogUmVhY3QuUmVmPFQ+IH07XG5leHBvcnQgdHlwZSBGb3J3YXJkSG9va1JlZjxUIGV4dGVuZHMgQ29tcG9uZW50VHlwZTxIb29rUmVmPGFueT4+PiA9IEhvb2tSZWY8XG4gIEhvb2tSZWZUeXBlPFQ+XG4+O1xuXG5leHBvcnQgdHlwZSBIb29rUmVmVHlwZTxcbiAgVCBleHRlbmRzIENvbXBvbmVudFR5cGU8SG9va1JlZjxhbnk+PlxuPiA9IFQgZXh0ZW5kcyBDb21wb25lbnRUeXBlPEhvb2tSZWY8aW5mZXIgVT4+ID8gVSA6IG5ldmVyO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlSG9va1JlZjxUIGV4dGVuZHMgQ29tcG9uZW50VHlwZTxIb29rUmVmPGFueT4+PihcbiAgY29tcG9uZW50VHlwZT86IFRcbik6IHtcbiAgcmVhZG9ubHkgY3VycmVudDogSG9va1JlZlR5cGU8VD47XG4gIChjdXJyZW50OiBIb29rUmVmVHlwZTxUPik6IHZvaWQ7XG59IHtcbiAgcmV0dXJuIHVzZU1lbW8oKCkgPT4ge1xuICAgIGhvb2tSZWYuY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gaG9va1JlZjtcblxuICAgIGZ1bmN0aW9uIGhvb2tSZWYoY3VycmVudCkge1xuICAgICAgaG9va1JlZi5jdXJyZW50ID0gY3VycmVudDtcbiAgICB9XG4gIH0sIFtdKTtcbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCwgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBtYXBPYmplY3RUb0FycmF5IH0gZnJvbSBcIi4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0VG9BcnJheVwiO1xuXG50eXBlIFRhYmxlTGF5b3V0Q29sdW1uUHJvcHM8Qz4gPSB7XG4gIGtleTogc3RyaW5nO1xuICBwcm9wczogQztcbiAgaW5kZXg6IG51bWJlcjtcbn07XG50eXBlIFRhYmxlTGF5b3V0Um93UHJvcHM8RD4gPSB7XG4gIGtleTogc3RyaW5nO1xuICBkYXRhOiBEO1xuICBpbmRleDogbnVtYmVyO1xufTtcbnR5cGUgVGFibGVMYXlvdXRQcm9wczxULCBDLCBEPiA9IHtcbiAgY29sdW1uczogUmVjb3JkPHN0cmluZywgQz47XG4gIHJvd3M6IFRbXTtcbiAgZ2V0Um93S2V5OiAocm93OiBUKSA9PiBzdHJpbmc7XG4gIGdldFJvd0RhdGE6IChyb3c6IFQpID0+IEQ7XG4gIHJlbmRlckNvbHVtbjogKFxuICAgIHByb3BzOiBUYWJsZUxheW91dENvbHVtblByb3BzPEM+LFxuICAgIGNoaWxkcmVuOiBSZWFjdE5vZGVcbiAgKSA9PiBSZWFjdE5vZGU7XG4gIC8vIFRPRE86IHJlbmFtZSB0byByZW5kZXJDb2x1bW5UaXRsZVxuXG4gIHJlbmRlckNvbHVtblRpdGxlOiAocHJvcHM6IFRhYmxlTGF5b3V0Q29sdW1uUHJvcHM8Qz4pID0+IFJlYWN0Tm9kZTtcbiAgcmVuZGVyUm93Q29sdW1uOiAoXG4gICAgZGF0YTogYW55LFxuICAgIHJvdzogVGFibGVMYXlvdXRSb3dQcm9wczxEPixcbiAgICBjb2x1bW46IFRhYmxlTGF5b3V0Q29sdW1uUHJvcHM8Qz4sXG4gICAga2V5OiBzdHJpbmdcbiAgKSA9PiBSZWFjdE5vZGU7XG5cbiAgcmVuZGVyUm93OiAocHJvcHM6IFRhYmxlTGF5b3V0Um93UHJvcHM8RD4sIGNoaWxkcmVuOiBSZWFjdE5vZGUpID0+IFJlYWN0Tm9kZTtcblxuICByZW5kZXIocHJvcHM6IHsgY29sdW1uczogUmVhY3ROb2RlW107IHJvd3M6IFJlYWN0Tm9kZVtdIH0pOiBSZWFjdEVsZW1lbnQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gVGFibGVMYXlvdXQ8VCwgQywgRD4ocHJvcHM6IFRhYmxlTGF5b3V0UHJvcHM8VCwgQywgRD4pIHtcbiAgY29uc3QgY29sdW1ucyA9IG1hcE9iamVjdFRvQXJyYXkocHJvcHMuY29sdW1ucywgKHByb3BzLCBrZXksIGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIHsgcHJvcHMsIGtleSwgaW5kZXggfTtcbiAgfSk7XG5cbiAgcmV0dXJuIHByb3BzLnJlbmRlcih7XG4gICAgY29sdW1uczogY29sdW1ucy5tYXAoKGNvbHVtbikgPT5cbiAgICAgIHByb3BzLnJlbmRlckNvbHVtbihjb2x1bW4sIHByb3BzLnJlbmRlckNvbHVtblRpdGxlKGNvbHVtbikpXG4gICAgKSxcbiAgICByb3dzOiBwcm9wcy5yb3dzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IHtcbiAgICAgICAga2V5OiBwcm9wcy5nZXRSb3dLZXkoaXRlbSksXG4gICAgICAgIGRhdGE6IHByb3BzLmdldFJvd0RhdGEoaXRlbSksXG4gICAgICAgIGluZGV4LFxuICAgICAgfTtcbiAgICAgIHJldHVybiBwcm9wcy5yZW5kZXJSb3coXG4gICAgICAgIHJvdyxcbiAgICAgICAgY29sdW1ucy5tYXAoKGNvbHVtbikgPT4ge1xuICAgICAgICAgIHJldHVybiBwcm9wcy5yZW5kZXJDb2x1bW4oXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICBwcm9wcy5yZW5kZXJSb3dDb2x1bW4ocm93LmRhdGFbY29sdW1uLmtleV0sIHJvdywgY29sdW1uLCByb3cua2V5KVxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pLFxuICB9KTtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHRvdWNoTWFwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXAvdG91Y2hNYXBcIjtcblxuZXhwb3J0IHR5cGUgUmVhY3RvckV2ZW50PFQ+ID0gbmV3ICguLi5hcmdzKSA9PiBUO1xuXG5leHBvcnQgdHlwZSBSZWFjdG9yTGlzdGVuZXIgPSAoYWN0aW9uOiBhbnkpID0+IHZvaWQ7XG5cbmV4cG9ydCBjbGFzcyBSZWFjdG9yIHtcbiAgcHJvdGVjdGVkIGV2ZW50TWFwID0gbmV3IE1hcCgpO1xuICBwcm90ZWN0ZWQgZXZlbnRMaXN0ZW5lck1hcCA9IG5ldyBNYXA8RnVuY3Rpb24sIFNldDxSZWFjdG9yTGlzdGVuZXI+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBoYW5kbGU/OiAoZXZlbnQ6IG9iamVjdCkgPT4gYm9vbGVhbiB8IHZvaWQpIHt9XG5cbiAgZ2V0TGFzdDxUPihldmVudDogUmVhY3RvckV2ZW50PFQ+KTogVCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50LmNvbnN0cnVjdG9yKTtcbiAgfVxuXG4gIGVtaXQoZXZlbnQ6IG9iamVjdCkge1xuICAgIGlmICh0aGlzLmhhbmRsZT8uKGV2ZW50KSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICB0aGlzLmV2ZW50TWFwLnNldChldmVudC5jb25zdHJ1Y3RvciwgZXZlbnQpO1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuZXZlbnRMaXN0ZW5lck1hcC5nZXQoZXZlbnQuY29uc3RydWN0b3IpO1xuICAgIGxpc3RlbmVycz8uZm9yRWFjaChjYWxsYmFjayA9PiB7XG4gICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICBsaXN0ZW48VD4oZXZlbnRUeXBlOiBSZWFjdG9yRXZlbnQ8VD4sIGNhbGxiYWNrOiAoYWN0aW9uOiBUKSA9PiB2b2lkKSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdG91Y2hNYXAoXG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJNYXAsXG4gICAgICBldmVudFR5cGUsXG4gICAgICAoKSA9PiBuZXcgU2V0KClcbiAgICApO1xuICAgIGxpc3RlbmVycy5hZGQoY2FsbGJhY2spO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBsaXN0ZW5lcnMuZGVsZXRlKGNhbGxiYWNrKTtcbiAgICAgIGlmICghbGlzdGVuZXJzLnNpemUpIHtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyTWFwLmRlbGV0ZShldmVudFR5cGUpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJlYWN0b3JDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dChuZXcgUmVhY3RvcigpKTtcbmV4cG9ydCBjb25zdCB1c2VSZWFjdG9yID0gKCkgPT4gUmVhY3QudXNlQ29udGV4dChSZWFjdG9yQ29udGV4dCk7XG4iLCJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdG9yRXZlbnQsIHVzZVJlYWN0b3IgfSBmcm9tIFwiLi9SZWFjdG9yXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VFbWl0dGVkPFQ+KFxuICBhY3Rpb25UeXBlOiBSZWFjdG9yRXZlbnQ8VD4sXG4gIGNhbGxiYWNrPzogKGFjdGlvbjogVCkgPT4gdm9pZFxuKTogVCB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IHJlYWN0b3IgPSB1c2VSZWFjdG9yKCk7XG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoKCkgPT4gcmVhY3Rvci5nZXRMYXN0KGFjdGlvblR5cGUpKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gcmVhY3Rvci5saXN0ZW4oYWN0aW9uVHlwZSwgZXZlbnQgPT4ge1xuICAgICAgaWYgKGV2ZW50ICE9IHN0YXRlKSB7XG4gICAgICAgIHNldFN0YXRlKGV2ZW50KTtcbiAgICAgICAgY2FsbGJhY2s/LihldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sIFtyZWFjdG9yXSk7XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuIiwiaW1wb3J0IHsgdXNlUmVhY3RvciB9IGZyb20gXCIuL1JlYWN0b3JcIjtcblxuZXhwb3J0IHR5cGUgUmVhY3RvckVtaXR0ZXIgPSAoZXZlbnQ6IG9iamVjdCkgPT4gdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiB1c2VFbWl0dGVyKCk6IFJlYWN0b3JFbWl0dGVyIHtcbiAgY29uc3QgcmVhY3RvciA9IHVzZVJlYWN0b3IoKTtcbiAgcmV0dXJuIGV2ZW50ID0+IHtcbiAgICByZWFjdG9yLmVtaXQoZXZlbnQpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtjcmVhdGVFbGVtZW50LCBGcmFnbWVudH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBFbXB0eUZyYWdtZW50ID0gY3JlYXRlRWxlbWVudChGcmFnbWVudCk7XG4iLCJpbXBvcnQge0NvbnRleHQsIGNyZWF0ZUNvbnRleHR9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVW5kZWZpbmVkQ29udGV4dDxUPigpOiBDb250ZXh0PFQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gY3JlYXRlQ29udGV4dDxUIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpXG59XG4iLCJpbXBvcnQge3VzZU1lbW99IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtXYWl0ZXJ9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXN5bmMvV2FpdGVyXCI7XG5cbmV4cG9ydCB0eXBlIERlYm91bmNlID0ge1xuICAgIHdhaXQobXM/OiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+O1xuICAgIGNhbmNlbCgpOiB2b2lkO1xuICAgIHJlc29sdmUoKTogdm9pZDtcbn07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIERlYm91bmNlKGRlZmF1bHRNczogbnVtYmVyID0gMTAwMCk6IERlYm91bmNlIHtcblxuICAgIGxldCB0aW1lb3V0OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFzdFdhaXRlcjogV2FpdGVyPGJvb2xlYW4+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB7XG5cbiAgICAgICAgY2FuY2VsLFxuICAgICAgICByZXNvbHZlOiAoKSA9PiB7XG4gICAgICAgICAgICBpZih0aW1lb3V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB3YWl0ZXIgPSBsYXN0V2FpdGVyO1xuICAgICAgICAgICAgbGFzdFdhaXRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHdhaXRlcj8ucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHdhaXQ6IChtcyA9IGRlZmF1bHRNcykgPT4ge1xuICAgICAgICAgICAgY2FuY2VsKCk7XG5cbiAgICAgICAgICAgIGlmICh0aW1lb3V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHdhaXRlciA9IGxhc3RXYWl0ZXIgPSBXYWl0ZXIoKTtcblxuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgd2FpdGVyLnJlc29sdmUobGFzdFdhaXRlciAhPT0gd2FpdGVyKTtcbiAgICAgICAgICAgIH0sIG1zKTtcblxuICAgICAgICAgICAgcmV0dXJuIHdhaXRlcjtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgICBjb25zdCB3YWl0ZXIgPSBsYXN0V2FpdGVyO1xuICAgICAgICBsYXN0V2FpdGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB3YWl0ZXI/LnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIGlmICh0aW1lb3V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZURlYm91bmNlKG1zPzogbnVtYmVyLCBkZXBzID0gW10pIHtcbiAgICByZXR1cm4gdXNlTWVtbygoKSA9PiBEZWJvdW5jZShtcyksIGRlcHMpXG59XG5cbiIsImltcG9ydCB7IFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZW50cmllcyB9IGZyb20gXCIuLi8uLi9jb21tb24vb2JqZWN0L2VudHJpZXNcIjtcbmltcG9ydCB7IHNldFJlZiB9IGZyb20gXCIuL3NldFJlZlwiO1xuXG5leHBvcnQgY29uc3QgJG1lcmdlID0gXCIkbWVyZ2VcIjtcbmNvbnN0ICRkZWZhdWx0ID0gXCIkZGVmYXVsdFwiO1xuXG5leHBvcnQgdHlwZSBQcm9wTWVyZ2VyPFQ+ID1cbiAgfCBSZWNvcmQ8dHlwZW9mICRtZXJnZSwgKHZhbHVlOiBUKSA9PiBUPlxuICB8IFJlY29yZDx0eXBlb2YgJGRlZmF1bHQsIFQ+O1xuXG5mdW5jdGlvbiBtZXJnZUNhbGxiYWNrcyhwcmV2Q2FsbGJhY2s6IEZ1bmN0aW9uLCBuZXh0Q2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhpczogYW55KSB7XG4gICAgY29uc3QgcHJldlJlc3VsdCA9IHByZXZDYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXh0Q2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKSA/PyBwcmV2UmVzdWx0O1xuICB9O1xufVxuXG5mdW5jdGlvbiBtZXJnZVJlZnMocHJldlJlZiwgbmV4dFJlZikge1xuICByZXR1cm4gKGN1cnJlbnQpID0+IHtcbiAgICBzZXRSZWYocHJldlJlZiwgY3VycmVudCk7XG4gICAgc2V0UmVmKG5leHRSZWYsIGN1cnJlbnQpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VQcm9wKHByZXZWYWx1ZSwgbmV4dFZhbHVlKSB7XG4gIGNvbnN0IG5leHRUeXBlID0gdHlwZW9mIG5leHRWYWx1ZTtcblxuICBjb25zdCBwcmV2VHlwZSA9IHR5cGVvZiBwcmV2VmFsdWU7XG5cbiAgLy8gVE9ETzogJHJldmVyc2VcblxuICBpZiAobmV4dFZhbHVlICYmIG5leHRUeXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgaWYgKCRkZWZhdWx0IGluIG5leHRWYWx1ZSkge1xuICAgICAgcmV0dXJuIHByZXZWYWx1ZSA/PyBuZXh0VmFsdWVbJGRlZmF1bHRdO1xuICAgIH1cblxuICAgIGNvbnN0IG1lcmdlciA9IG5leHRWYWx1ZVskbWVyZ2VdO1xuICAgIGlmICh0eXBlb2YgbWVyZ2VyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBtZXJnZXIuY2FsbChuZXh0VmFsdWUsIHByZXZWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChwcmV2VHlwZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXh0VmFsdWUpID09PSBPYmplY3QucHJvdG90eXBlKVxuICAgICAgICByZXR1cm4gbWVyZ2VQcm9wcyh7fSwgbmV4dFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBpZiAobmV4dFR5cGUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gcHJldlZhbHVlID8/IG5leHRWYWx1ZTtcbiAgfVxuXG4gIGlmIChpc1JlZk9iamVjdChwcmV2VmFsdWUpIHx8IGlzUmVmT2JqZWN0KG5leHRWYWx1ZSkpIHtcbiAgICByZXR1cm4gbWVyZ2VSZWZzKHByZXZWYWx1ZSwgbmV4dFZhbHVlKTtcbiAgfVxuXG4gIGlmIChwcmV2VHlwZSA9PT0gbmV4dFR5cGUpIHtcbiAgICBzd2l0Y2ggKHByZXZUeXBlKSB7XG4gICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgIHJldHVybiBgJHtwcmV2VmFsdWV9ICR7bmV4dFZhbHVlfWA7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcmV0dXJuIG1lcmdlQ2FsbGJhY2tzKHByZXZWYWx1ZSwgbmV4dFZhbHVlKTtcbiAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJldlR5cGUpICYmIEFycmF5LmlzQXJyYXkobmV4dFR5cGUpKSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKFwibWVyZ2VCZXR3ZWVuQXJyYXlzXCIpO1xuICAgICAgICAgIHJldHVybiBbLi4ucHJldlZhbHVlLCAuLi5uZXh0VmFsdWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXJnZVByb3BzKHByZXZWYWx1ZSwgbmV4dFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV4dFZhbHVlO1xufVxuXG5leHBvcnQgdHlwZSBOZXh0UHJvcDxUPiA9XG4gIHwgRXhjbHVkZTxULCBQcm9wTWVyZ2VyPGFueT4+XG4gIHwgUHJvcE1lcmdlcjxUPlxuICB8IChUIGV4dGVuZHMgb2JqZWN0ID8gTmV4dFByb3BzPFQ+IDogbmV2ZXIpO1xuXG5leHBvcnQgdHlwZSBOZXh0UHJvcHM8UD4gPSB7XG4gIFtLIGluIGtleW9mIFJlcXVpcmVkPFA+XT86IE5leHRQcm9wPFBbS10+O1xufTtcblxuLypcblxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVByb3BzPFAsIEUgZXh0ZW5kcyBOZXh0UHJvcHM8UD4+KFxuICBwcmV2UHJvcHM6IFAgfCB1bmRlZmluZWQsXG4gIG5leHRQcm9wczogRVxuKTogUCAmIEUge1xuICBsZXQgX3Byb3BzID0geyAuLi5wcmV2UHJvcHMgfTtcblxuICBmb3IgKGxldCBba2V5LCBuZXh0VmFsdWVdIG9mIGVudHJpZXMobmV4dFByb3BzKSkge1xuICAgIF9wcm9wc1trZXldID0gbWVyZ2VQcm9wKF9wcm9wc1trZXldLCBuZXh0VmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIF9wcm9wcyBhcyBhbnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1JlZk9iamVjdChvKTogbyBpcyBSZWFjdC5SZWZPYmplY3Q8YW55PiB7XG4gIHJldHVybiBvICYmIHR5cGVvZiBvID09PSBcIm9iamVjdFwiICYmIFwiY3VycmVudFwiIGluIG87XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudFR5cGUsIGNyZWF0ZUVsZW1lbnQsIFJlYWN0RWxlbWVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1BhcnRpYWxLZXlzfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcblxuZXhwb3J0IHR5cGUgV2l0aERlZmF1bHRQcm9wcyA9IHtcblxuICAgIDxUPihkZWZhdWx0UHJvcHM6IFQpOlxuICAgICAgICA8UD4oY29tcG9uZW50OiBDb21wb25lbnRUeXBlPFAgJiBUPikgPT5cbiAgICAgICAgICAgIChwcm9wczogUCAmIFBhcnRpYWw8VD4pID0+IFJlYWN0RWxlbWVudDtcblxuXG4gICAgPFAsIEsgZXh0ZW5kcyBrZXlvZiBQPihcbiAgICAgICAgY29tcG9uZW50OiBDb21wb25lbnRUeXBlPFA+LFxuICAgICAgICBkZWZhdWx0UHJvcHM6IFBpY2s8UCwgSz5cbiAgICApOlxuICAgICAgICAocHJvcHM6IFBhcnRpYWxLZXlzPFAsIEs+KSA9PiBSZWFjdEVsZW1lbnQ7XG5cbiAgICA8UCwgSyBleHRlbmRzIGtleW9mIFA+KFxuICAgICAgICBjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8UD4sXG4gICAgICAgIGdldERlZmF1bHRQcm9wczogKHByb3BzOiBQYXJ0aWFsPFA+KSA9PiBQaWNrPFAsIEs+XG4gICAgKTpcbiAgICAgICAgKHByb3BzOiBQYXJ0aWFsS2V5czxQLCBLPikgPT4gUmVhY3RFbGVtZW50O1xufTtcblxuZnVuY3Rpb24gX3BhcnRpYWxQcm9wcyhcbiAgICBjb21wb25lbnQsIGRlZmF1bHRQcm9wcyxcbiAgICBleHRyYURlZmF1bHRQcm9wcz9cbikge1xuXG5cbiAgICBpZiAodHlwZW9mIGRlZmF1bHRQcm9wcyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcyhcbiAgICAgICAgICAgIGNvbXBvbmVudC5kZWZhdWx0UHJvcHMgPz8ge31cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGlmIChjb21wb25lbnQuZGVmYXVsdENvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gX3BhcnRpYWxQcm9wcyhjb21wb25lbnQuZGVmYXVsdENvbXBvbmVudCxcbiAgICAgICAgICAgIGRlZmF1bHRQcm9wcywge1xuICAgICAgICAgICAgICAgIC4uLmV4dHJhRGVmYXVsdFByb3BzLFxuICAgICAgICAgICAgICAgIC4uLmNvbXBvbmVudC5kZWZhdWx0UHJvcHMsXG4gICAgICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKHtjb21wb25lbnR9KTtcbiAgICBjb25zdCBmdW5jID0gcHJvcHMgPT4ge1xuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKVxuICAgIH07XG5cbiAgICBmdW5jLmRlZmF1bHRDb21wb25lbnQgPSBjb21wb25lbnQ7XG5cbiAgICBmdW5jLmRpc3BsYXlOYW1lID0gY29tcG9uZW50LmRpc3BsYXlOYW1lID8/XG4gICAgICAgIGNvbXBvbmVudC5uYW1lO1xuXG4gICAgZnVuYy5kZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLmV4dHJhRGVmYXVsdFByb3BzLFxuICAgICAgICAuLi5kZWZhdWx0UHJvcHNcbiAgICB9O1xuXG4gICAgcmV0dXJuIGZ1bmM7XG59XG5cbmV4cG9ydCBjb25zdCBwYXJ0aWFsUHJvcHM6IFdpdGhEZWZhdWx0UHJvcHMgPVxuICAgIChjb21wb25lbnRPclByb3BzLCBwcm9wcz8pOiBhbnkgPT4ge1xuICAgICAgICBpZiAocHJvcHMpXG4gICAgICAgICAgICByZXR1cm4gX3BhcnRpYWxQcm9wcyhjb21wb25lbnRPclByb3BzLCBwcm9wcyk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnQgPT4gX3BhcnRpYWxQcm9wcyhjb21wb25lbnQsIGNvbXBvbmVudE9yUHJvcHMpO1xuICAgIH07XG4iLCJpbXBvcnQge1JlZn0gZnJvbSBcInJlYWN0XCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFJlZjxUPihyZWY6IFJlZjxUPiB8IHVuZGVmaW5lZCwgdmFsdWU6IFQpIHtcbiAgICBpZiAodHlwZW9mIHJlZiA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZWYodmFsdWUpO1xuICAgIGVsc2UgaWYgKHJlZikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJlZltcImN1cnJlbnRcIl0gPSB2YWx1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hc3NlcnRcIjtcbmltcG9ydCB7IFdlYWtNYXBGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXAvbWFwRmFjdG9yeVwiO1xuaW1wb3J0IHsgTGF6eSB9IGZyb20gXCIuLi8uLi9jb21tb24vcGF0dGVybnMvbGF6eVwiO1xuaW1wb3J0IHsgRW1wdHlGcmFnbWVudCB9IGZyb20gXCIuLi91dGlscy9FbXB0eUZyYWdtZW50XCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWaWV3PFAgPSB7fT4gZXh0ZW5kcyBDb21wb25lbnQ8UCwgb2JqZWN0PiB7XG4gIGFic3RyYWN0IHJlbmRlclZpZXcoKTogUmVhY3ROb2RlO1xuXG4gIGlzRGlkTW91bnQgPSBmYWxzZTtcblxuICBpc1dpbGxVbm1vdW50ID0gZmFsc2U7XG5cbiAgY3VycmVudFN0YXRlID0ge307XG5cbiAgaXNEaWRTZXRTdGF0ZSA9IGZhbHNlO1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaXNEaWRNb3VudCA9IHRydWU7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmlzV2lsbFVubW91bnQgPSB0cnVlO1xuICB9XG5cbiAgdXBkYXRlVmlld1Byb3BzPyhwcmV2UHJvcHM6IFJlYWRvbmx5PFA+LCBuZXh0UHJvcHM6IFJlYWRvbmx5PFA+KTogdm9pZDtcblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoXG4gICAgbmV4dFByb3BzOiBSZWFkb25seTxQPixcbiAgICBuZXh0U3RhdGU6IFJlYWRvbmx5PGFueT4sXG4gICAgbmV4dENvbnRleHQ6IGFueVxuICApOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy51cGRhdGVWaWV3UHJvcHMpIHtcbiAgICAgIHRoaXMudXBkYXRlVmlld1Byb3BzKHRoaXMucHJvcHMsIG5leHRQcm9wcyk7XG4gICAgICBpZiAodGhpcy5pc0RpZFNldFN0YXRlKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyVmlldygpID8/IEVtcHR5RnJhZ21lbnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IHNldFZpZXdTdGF0ZUtleSB9IGZyb20gXCIuL3NldFZpZXdTdGF0ZUtleVwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL1ZpZXdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIFZpZXdTdGF0ZSgpOiB7ICh0YXJnZXQ6IFZpZXc8YW55Piwga2V5KTogdm9pZCB9O1xuZXhwb3J0IGZ1bmN0aW9uIFZpZXdTdGF0ZTxNZXRob2QgZXh0ZW5kcyBQcm9wZXJ0eUtleT4oXG4gIGJlZm9yZVVwZGF0ZU1ldGhvZD86IE1ldGhvZFxuKToge1xuICAodGFyZ2V0OiBWaWV3PGFueT4gJiBSZWNvcmQ8TWV0aG9kLCAoKSA9PiBhbnk+LCBrZXkpOiB2b2lkO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBWaWV3U3RhdGUodXBkYXRlTWV0aG9kPykge1xuICByZXR1cm4gKHRhcmdldDogVmlldzxhbnk+LCBrZXk6IHN0cmluZykgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwge1xuICAgICAgZ2V0KHRoaXM6IFZpZXcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFN0YXRlW2tleV07XG4gICAgICB9LFxuICAgICAgc2V0KHRoaXMsIHZhbHVlKSB7XG4gICAgICAgIGlmIChzZXRWaWV3U3RhdGVLZXkodGhpcywga2V5LCB2YWx1ZSkpIHtcbiAgICAgICAgICB1cGRhdGVNZXRob2QgJiYgdGhpc1t1cGRhdGVNZXRob2RdKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vVmlld1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0Vmlld1N0YXRlS2V5KHZpZXc6IFZpZXcsIGtleTogc3RyaW5nLCB2YWx1ZSkge1xuICBpZiAodmlldy5jdXJyZW50U3RhdGVba2V5XSA9PT0gdmFsdWUpIHJldHVybiBmYWxzZTtcbiAgdmlldy5jdXJyZW50U3RhdGVba2V5XSA9IHZhbHVlO1xuXG4gIGlmICh2aWV3LmlzRGlkTW91bnQgJiYgIXZpZXcuaXNEaWRTZXRTdGF0ZSkge1xuICAgIHZpZXcuaXNEaWRTZXRTdGF0ZSA9IHRydWU7XG4gICAgdmlldy5zZXRTdGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgIHZpZXcuaXNEaWRTZXRTdGF0ZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIC4uLnZpZXcuY3VycmVudFN0YXRlIH07XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB7IEF3YWl0ZWQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IExvZ2luSW5mbyB9IGZyb20gXCIuLi9jb21tb24vU3lzdGVtQXBwXCI7XG5cbnR5cGUgTG9naW5JbmZvUGF5bG9hZCA9IEF3YWl0ZWQ8TG9naW5JbmZvPjtcblxuZXhwb3J0IGNsYXNzIExvZ2luSW5mb0V2ZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IExvZ2luSW5mb1BheWxvYWQpIHt9XG5cbiAgaXNTdWNjZXNzKCk6IHRoaXMgaXMgYW55IHtcbiAgICByZXR1cm4gdGhpcy5wYXlsb2FkLnR5cGUgPT09IFwiU1VDQ0VTU1wiO1xuICB9XG5cbiAgZ2V0IHN1Y2Nlc3MoKTogRXh0cmFjdDxMb2dpbkluZm9QYXlsb2FkLCB7IHR5cGU6IFwiU1VDQ0VTU1wiIH0+IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5wYXlsb2FkLnR5cGUgPT09IFwiU1VDQ0VTU1wiKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXlsb2FkO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc0FkbWluKCkge1xuICAgIHJldHVybiB0aGlzLnN1Y2Nlc3M/LmlzQWRtaW4gfHwgZmFsc2U7XG4gIH1cbn1cblxuLypcblxuXG4gIDxSZWFjdG9yUHJvdmlkZXI+XG5cbiAqL1xuIiwiaW1wb3J0IHsgY3JlYXRlQnJvd3Nlckhpc3RvcnkgfSBmcm9tIFwiaGlzdG9yeVwiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlTXVpU3lzdGVtIH0gZnJvbSBcIi4uLy4uL2Jyb3dzZXIvbXVpL2NyZWF0ZU11aVN5c3RlbVwiO1xuaW1wb3J0IHsgTXVpQWRtaW4gfSBmcm9tIFwiLi4vLi4vYnJvd3Nlci9tdWkvTXVpQWRtaW5cIjtcbmltcG9ydCB7IHVzZUVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vcmVhY3QvcmVhY3Rvci91c2VFbWl0dGVyXCI7XG5pbXBvcnQgeyBSZWFjdFJvdXRlclZpZXcgfSBmcm9tIFwiLi4vLi4vdHlwZXJvdXRlcjIvUmVhY3RSb3V0ZXJWaWV3XCI7XG5pbXBvcnQgeyBTeXN0ZW1Mb2dpbkluZm8gfSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHsgTG9naW5JbmZvRXZlbnQgfSBmcm9tIFwiLi9Mb2dpbkluZm9FdmVudFwiO1xuaW1wb3J0IHsgTXVpU3lzdGVtVmlldyB9IGZyb20gXCIuL011aVN5c3RlbVZpZXdcIjtcbmltcG9ydCB7IFN5c3RlbVJvdXRlciB9IGZyb20gXCIuL1N5c3RlbVJvdXRlclwiO1xuXG5jb25zdCB7IFByb3ZpZGVyOiBNdWlTeXN0ZW1Qcm92aWRlciB9ID0gY3JlYXRlTXVpU3lzdGVtKCk7XG5jb25zdCBoaXN0b3J5ID0gY3JlYXRlQnJvd3Nlckhpc3RvcnkoKTtcblxuTXVpU3lzdGVtVmlldyhTeXN0ZW1Sb3V0ZXIpO1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpU3lzdGVtUm9vdFZpZXcoKSB7XG4gIGNvbnN0IGVtaXQgPSB1c2VFbWl0dGVyKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBTeXN0ZW1Mb2dpbkluZm8udGhlbihsb2dpbkluZm8gPT4ge1xuICAgICAgY29uc29sZS5sb2coeyBsb2dpbkluZm8gfSk7XG4gICAgICBlbWl0KG5ldyBMb2dpbkluZm9FdmVudChsb2dpbkluZm8pKTtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPE11aVN5c3RlbVByb3ZpZGVyPlxuICAgICAgPFJlYWN0Um91dGVyVmlldyBoaXN0b3J5PXtoaXN0b3J5fSByb3V0ZXI9e1N5c3RlbVJvdXRlcn0gLz5cbiAgICA8L011aVN5c3RlbVByb3ZpZGVyPlxuICApO1xufVxuXG5jb25zdCBUZXN0ID0gKCkgPT4gKFxuICA8TXVpQWRtaW5cbiAgICBtZW51PXt7XG4gICAgICBob21lOiB7XG4gICAgICAgIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvSG9tZVwiKSxcbiAgICAgIH0sXG4gICAgICBhY2w6IHtcbiAgICAgICAgLy8gaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9Ib21lXCIpLFxuICAgICAgICBjaGlsZHJlbjoge1xuICAgICAgICAgIHVzZXJzOiB7XG4gICAgICAgICAgICBjaGlsZHJlbjoge1xuICAgICAgICAgICAgICBhZGQ6IHsgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9QZXJzb25BZGRcIikgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBncm91cHM6IHtcbiAgICAgICAgICAgIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvUGVvcGxlXCIpLFxuICAgICAgICAgICAgY2hpbGRyZW46IHtcbiAgICAgICAgICAgICAgYWRkOiB7IGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvR3JvdXBBZGRcIikgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBvdXRib3g6IHtcbiAgICAgICAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9TZW5kXCIpLFxuICAgICAgfSxcbiAgICAgIGZhdm9yaXRlczoge1xuICAgICAgICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0Zhdm9yaXRlXCIpLFxuICAgICAgfSxcbiAgICAgIGFyY2hpdmU6IHtcbiAgICAgICAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9BcmNoaXZlXCIpLFxuICAgICAgfSxcbiAgICAgIHRyYXNoOiB7XG4gICAgICAgIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvRGVsZXRlXCIpLFxuICAgICAgfSxcbiAgICAgIHNwYW06IHtcbiAgICAgICAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9FcnJvclwiKSxcbiAgICAgIH0sXG4gICAgfX1cbiAgLz5cbik7XG4iLCJpbXBvcnQgR3JpZCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvR3JpZFwiO1xuaW1wb3J0IFBhcGVyIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9QYXBlclwiO1xuaW1wb3J0IHsgbWFrZVN0eWxlcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE11aURhdGFJbnB1dFZpZXcgfSBmcm9tIFwiLi4vLi4vYnJvd3Nlci9tdWkvcnBjL2lucHV0cy9NdWlEYXRhSW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBNdWlGb3JtVmlldyB9IGZyb20gXCIuLi8uLi9icm93c2VyL211aS9ycGMvTXVpRm9ybVZpZXdcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyBFbXB0eUZyYWdtZW50IH0gZnJvbSBcIi4uLy4uL3JlYWN0L3V0aWxzL0VtcHR5RnJhZ21lbnRcIjtcbmltcG9ydCB7IFdpZGdldFJvdXRlclZpZXcgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy93aWRnZXQvV2lkZ2V0Um91dGVyVmlld1wiO1xuaW1wb3J0IHsgTXVpQWRtaW5WaWV3IH0gZnJvbSBcIi4uL2NvbW1vbi9hZG1pbi9NdWlBZG1pblZpZXdcIjtcbmltcG9ydCB7IFN5c3RlbUFwcCB9IGZyb20gXCIuLi9jb21tb24vU3lzdGVtQXBwXCI7XG5pbXBvcnQgeyBTeXN0ZW1Sb3V0ZXIgfSBmcm9tIFwiLi9TeXN0ZW1Sb3V0ZXJcIjtcblxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcyh0aGVtZSA9PiAoe1xuICBwYXBlcjoge1xuICAgIHBhZGRpbmc6IHRoZW1lLnNwYWNpbmcoMiksXG4gIH0sXG59KSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlTeXN0ZW1WaWV3KHJvdXRlcjogdHlwZW9mIFN5c3RlbVJvdXRlcikge1xuICBNdWlBZG1pblZpZXcocm91dGVyLmF0KFwiYWRtaW5cIikpO1xuICBXaWRnZXRSb3V0ZXJWaWV3KHJvdXRlci5hdChcImxvZ2luXCIpLCBTeXN0ZW1BcHAuc2VydmljZS5kZXZMb2dpbiwgcHJvcHMgPT4ge1xuICAgIGNvbnN0IGNsYXNzZXMgPSB1c2VTdHlsZXMoKTtcbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAgPEdyaWQgY29udGFpbmVyIGp1c3RpZnk9e1wiY2VudGVyXCJ9PlxuICAgICAgICAgIDxHcmlkIGl0ZW0+XG4gICAgICAgICAgICA8UGFwZXIgY2xhc3NOYW1lPXtjbGFzc2VzLnBhcGVyfT5cbiAgICAgICAgICAgICAgPE11aUZvcm1WaWV3XG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIGlucHV0PXtwcm9wcyA9PiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8TXVpRGF0YUlucHV0VmlldyB7Li4ucHJvcHN9IHRpdGxlPXtMYW5nYExPR0lOX1RPX1VTRVJgfSAvPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvUGFwZXI+XG4gICAgICAgICAgPC9HcmlkPlxuICAgICAgICA8L0dyaWQ+XG4gICAgICA8Lz5cbiAgICApO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCIuLi8uLi90eXBlcm91dGVyMi9Sb3V0ZXJcIjtcbmltcG9ydCB7IEFkbWluUm91dGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9hZG1pbi9BZG1pblJvdXRlclwiO1xuXG5leHBvcnQgY29uc3QgU3lzdGVtUm91dGVyID0gUm91dGVyKHtcbiAgYWRtaW46IEFkbWluUm91dGVyLFxuICBsb2dpbjogUm91dGVyKCksXG59KTtcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VBcnJheVRvU2VxIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcnJheS91c2VBcnJheVRvU2VxXCI7XG5pbXBvcnQgeyBoYW5kbGVScGNTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvUnBjXCI7XG5pbXBvcnQgeyBTeXN0ZW1BcHAgfSBmcm9tIFwiLi4vY29tbW9uL1N5c3RlbUFwcFwiO1xuaW1wb3J0IHsgTXVpU3lzdGVtUm9vdFZpZXcgfSBmcm9tIFwiLi9NdWlTeXN0ZW1Sb290Vmlld1wiO1xuXG51c2VBcnJheVRvU2VxKCk7XG5cbmhhbmRsZVJwY1NlcnZpY2UoU3lzdGVtQXBwLCBwYXlsb2FkID0+IHtcbiAgcmV0dXJuIGZldGNoKFwiL3NlcnZpY2VcIiwge1xuICAgIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgU3lzdGVtTG9naW5JbmZvID0gU3lzdGVtQXBwLnNlcnZpY2UuZ2V0TG9naW5JbmZvKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIFJlYWN0RE9NLnJlbmRlcihcbiAgICBjcmVhdGVFbGVtZW50KE11aVN5c3RlbVJvb3RWaWV3KSwgLy9cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN5c3RlbVwiKVxuICApO1xufSk7XG4iLCJpbXBvcnQgeyBEYXRhTWFuYWdlciB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2RhdGEtbWFuYWdlci9EYXRhTWFuYWdlclwiO1xuXG5pbXBvcnQgeyBEYXRhTWFuYWdlclJvdXRlciB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2RhdGEtbWFuYWdlci9EYXRhTWFuYWdlclJvdXRlclwiO1xuaW1wb3J0IHsgSW5wdXRNYXAgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9pbnB1dC9pbnB1dC1tYXAvSW5wdXRNYXBcIjtcbmltcG9ydCB7IElucHV0RXJyb3JIb29rIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvSW5wdXRFcnJvckhvb2tcIjtcbmltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2lucHV0L3RleHQtaW5wdXQvVGV4dElucHV0XCI7XG5pbXBvcnQgeyBScGNQYXJ0aWFsQ29uZmlnIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvUnBjUGFydGlhbENvbmZpZ1wiO1xuXG5jb25zdCBOYW1lSW5wdXQgPSBScGNQYXJ0aWFsQ29uZmlnKFRleHRJbnB1dCgpLCB7XG4gIG1pbkxlbmd0aDogMixcbiAgbWF4TGVuZ3RoOiAyMCxcbiAgcmVxdWlyZWQ6IHRydWUsXG59KTtcblxuZXhwb3J0IGNvbnN0IFVzZXJCYXNpY0luZm9JbnB1dCA9IElucHV0TWFwKHtcbiAgZmlyc3ROYW1lOiBOYW1lSW5wdXQsXG4gIGxhc3ROYW1lOiBOYW1lSW5wdXQsXG4gIGxvZ2luTmFtZTogSW5wdXRFcnJvckhvb2s8XCJBTFJFQURZX0VYSVNUU1wiPigpKFRleHRJbnB1dCgpKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgVXNlckNvbnRhY3RJbmZvSW5wdXQgPSBJbnB1dE1hcCh7XG4gIHBob25lTnVtYmVyOiBUZXh0SW5wdXQoKSxcbiAgZW1haWw6IFRleHRJbnB1dCgpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBBY2xVc2Vyc01hbmFnZXIgPSBEYXRhTWFuYWdlcih7XG4gIGFkZElucHV0OiBVc2VyQmFzaWNJbmZvSW5wdXQsXG4gIGVkaXRJbnB1dDogSW5wdXRNYXAoe1xuICAgIGJhc2ljSW5mbzogVXNlckJhc2ljSW5mb0lucHV0LFxuICAgIGNvbnRhY3RJbmZvOiBVc2VyQ29udGFjdEluZm9JbnB1dCxcbiAgfSksXG4gIHRhYmxlUm93VHlwZToge1xuICAgIGxvZ2luTmFtZTogU3RyaW5nLFxuICAgIGZpcnN0TmFtZTogU3RyaW5nLFxuICAgIGxhc3ROYW1lOiBTdHJpbmcsXG4gIH0sXG4gIGVkaXRUYWJzOiB7XG4gICAgLy8gVE9ETzogZ3JvdXBzXG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IEFjbFVzZXJzTWFuYWdlclJvdXRlciA9IERhdGFNYW5hZ2VyUm91dGVyKEFjbFVzZXJzTWFuYWdlcik7XG4iLCJpbXBvcnQgeyBScGNGbiB9IGZyb20gXCIuLi8uLi90eXBlcnBjL3JwYy1mbi9ScGNGblwiO1xuaW1wb3J0IHsgUnBjTWFwIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvcnBjLW1hcC9ScGNNYXBcIjtcblxuZXhwb3J0IGNvbnN0IEFkbWluQXBwID0gUnBjTWFwKHtcbiAgLy8gZm86IFJwY0ZuKCksXG59KTtcbiIsImltcG9ydCB7IFBheWxvYWQsIFR5cGVSZWYsIFR5cGluZyB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgRGF0YUlucHV0IH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvZGF0YS1pbnB1dC9EYXRhSW5wdXRcIjtcbmltcG9ydCB7IFJwY0ZuIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvcnBjLWZuL1JwY0ZuXCI7XG5pbXBvcnQgeyBScGNNYXAgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9ycGMtbWFwL1JwY01hcFwiO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gXCIuLi8uLi90eXBlcnBjL3dpZGdldC9mb3JtL0Zvcm1cIjtcbmltcG9ydCB7IEFkbWluQXBwIH0gZnJvbSBcIi4vQWRtaW5BcHBcIjtcbmltcG9ydCB7IFVzZXJBcHAgfSBmcm9tIFwiLi9Vc2VyQXBwXCI7XG5cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IERldkxvZ2luVXNlcjogdW5pcXVlIHN5bWJvbDtcblxuZXhwb3J0IHR5cGUgTG9naW5JbmZvID0gUGF5bG9hZDx7XG4gIEZBSUxFRDoge307XG4gIFNVQ0NFU1M6IHtcbiAgICBmdWxsTmFtZTogc3RyaW5nO1xuICAgIGlzQWRtaW46IGJvb2xlYW47XG4gIH07XG59PjtcblxuLy8gUmVtb3RlUHJvbWlzZTxYPlxuLy8gdHlwZTogcmVqZWN0ZWRcbi8vIHR5cGU6IHJlc29sdmVkXG5cbmV4cG9ydCBjb25zdCBEZXZMb2dpbiA9IEZvcm0oe1xuICBpbnB1dDogRGF0YUlucHV0KHtcbiAgICBsb2FkVHlwZTogVHlwZVJlZigoKSA9PiBEZXZMb2dpblVzZXIpLFxuICB9KSxcbiAgdmFsdWU6IFR5cGluZzx7IGhlbGxvVG86IHN0cmluZyB9PigpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBTeXN0ZW1BcHAgPSBScGNNYXAoe1xuICBsb2dvdXQ6IFJwY0ZuKCksXG5cbiAgZ2V0TG9naW5JbmZvOiBScGNGbjwoKSA9PiBMb2dpbkluZm8+KCksXG5cbiAgZGV2TG9naW46IERldkxvZ2luLFxuXG4gIGFkbWluOiBBZG1pbkFwcCxcblxuICB1c2VyOiBVc2VyQXBwLFxufSk7XG4iLCJpbXBvcnQgeyBScGNGbiB9IGZyb20gXCIuLi8uLi90eXBlcnBjL3JwYy1mbi9ScGNGblwiO1xuaW1wb3J0IHsgUnBjTWFwIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvcnBjLW1hcC9ScGNNYXBcIjtcblxuZXhwb3J0IGNvbnN0IFVzZXJBcHAgPSBScGNNYXAoe1xuICBmb286IFJwY0ZuKCksXG59KTtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCIuLi8uLi8uLi90eXBlcm91dGVyMi9Sb3V0ZXJcIjtcbmltcG9ydCB7IEFjbFVzZXJzTWFuYWdlclJvdXRlciB9IGZyb20gXCIuLi9BY2xVc2Vyc01hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IEFkbWluUm91dGVyID0gUm91dGVyKHtcbiAgYWNsOiBSb3V0ZXIoe1xuICAgIHVzZXJzOiBBY2xVc2Vyc01hbmFnZXJSb3V0ZXIsXG4gIH0pLFxufSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNdWlEYXRhTWFuYWdlclZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vYnJvd3Nlci9tdWkvcnBjL011aURhdGFNYW5hZ2VyVmlld1wiO1xuaW1wb3J0IHsgSW5wdXRNYXBWaWV3IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvaW5wdXQvaW5wdXQtbWFwL0lucHV0TWFwVmlld1wiO1xuaW1wb3J0IHsgQWNsVXNlcnNNYW5hZ2VyLCBBY2xVc2Vyc01hbmFnZXJSb3V0ZXIgfSBmcm9tIFwiLi4vQWNsVXNlcnNNYW5hZ2VyXCI7XG5pbXBvcnQgeyBNdWlVc2VyQmFzaWNJbmZvSW5wdXRWaWV3IH0gZnJvbSBcIi4vTXVpVXNlckJhc2ljSW5mb0lucHV0Vmlld1wiO1xuaW1wb3J0IHsgTXVpVXNlckNvbnRhY3RJbmZvSW5wdXRWaWV3IH0gZnJvbSBcIi4vTXVpVXNlckNvbnRhY3RJbmZvSW5wdXRWaWV3XCI7XG5cbi8vIE11aUFjbE1hbmFnZXJWaWV3XG5cbmV4cG9ydCBjb25zdCBNdWlBY2xVc2Vyc01hbmFnZXJWaWV3ID0gKFxuICByb3V0ZXI6IHR5cGVvZiBBY2xVc2Vyc01hbmFnZXJSb3V0ZXJcbikgPT4ge1xuICBNdWlEYXRhTWFuYWdlclZpZXcoe1xuICAgIHJvdXRlcixcbiAgICBjb25uZWN0aW9uOiBBY2xVc2Vyc01hbmFnZXIuc2VydmljZSxcbiAgICByZW5kZXJBZGRJbnB1dDogcHJvcHMgPT4gPE11aVVzZXJCYXNpY0luZm9JbnB1dFZpZXcgey4uLnByb3BzfSAvPixcbiAgICByZW5kZXJFZGl0SW5wdXQ6IHByb3BzID0+IChcbiAgICAgIDxJbnB1dE1hcFZpZXcuRmllbGRzXG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgZmllbGRzPXt7XG4gICAgICAgICAgYmFzaWNJbmZvOiBwcm9wcyA9PiA8TXVpVXNlckJhc2ljSW5mb0lucHV0VmlldyB7Li4ucHJvcHN9IC8+LFxuICAgICAgICAgIGNvbnRhY3RJbmZvOiBwcm9wcyA9PiA8TXVpVXNlckNvbnRhY3RJbmZvSW5wdXRWaWV3IHsuLi5wcm9wc30gLz4sXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICksXG4gIH0pO1xufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyB1c2VFbWl0dGVkIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3JlYWN0b3IvdXNlRW1pdHRlZFwiO1xuaW1wb3J0IHsgUmVhY3RSb3V0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJvdXRlcjIvUmVhY3RSb3V0ZXJcIjtcbmltcG9ydCB7IExvZ2luSW5mb0V2ZW50IH0gZnJvbSBcIi4uLy4uL2Jyb3dzZXIvTG9naW5JbmZvRXZlbnRcIjtcbmltcG9ydCB7IEFkbWluUm91dGVyIH0gZnJvbSBcIi4vQWRtaW5Sb3V0ZXJcIjtcbmltcG9ydCB7IE11aUFjbFVzZXJzTWFuYWdlclZpZXcgfSBmcm9tIFwiLi9NdWlBY2xVc2Vyc01hbmFnZXJWaWV3XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlBZG1pblZpZXcocm91dGVyOiB0eXBlb2YgQWRtaW5Sb3V0ZXIpIHtcbiAgY29uc29sZS5sb2coXCJ4XCIpO1xuXG4gIFJlYWN0Um91dGVyKHJvdXRlciwge1xuICAgIHdyYXAocHJvcHMpIHtcbiAgICAgIGNvbnN0IGxvZ2luSW5mbyA9IHVzZUVtaXR0ZWQoTG9naW5JbmZvRXZlbnQpO1xuXG4gICAgICBpZiAoIWxvZ2luSW5mbykge1xuICAgICAgICByZXR1cm4gTGFuZ2BBQ0NFU1NfREVOSUVEX0JFQ0FVU0VfTk9fTE9HSU5gO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBzdWNjZXNzIH0gPSBsb2dpbkluZm87XG4gICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuIExhbmdgQUNDRVNTX0RFTklFRF9CRUNBVVNFX0xPR0lOX0lTX05PVF9TVUNDRVNTYDtcbiAgICAgIH1cbiAgICAgIGlmICghc3VjY2Vzcy5pc0FkbWluKSB7XG4gICAgICAgIHJldHVybiBMYW5nYEFDQ0VTU19ERU5JRURfQkVDQVVTRV9MT0dJTl9JU19OT1RfQURNSU5gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gPD57cHJvcHMuY2hpbGRyZW59PC8+O1xuICAgIH0sXG4gIH0pO1xuXG4gIE11aUFjbFVzZXJzTWFuYWdlclZpZXcocm91dGVyLmF0KFwiYWNsXCIpLmF0KFwidXNlcnNcIikpO1xufVxuIiwiaW1wb3J0IEdyaWQgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0dyaWRcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE11aVRleHRJbnB1dFZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vYnJvd3Nlci9tdWkvcnBjL2lucHV0cy9NdWlUZXh0SW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBMYW5nIH0gZnJvbSBcIi4uLy4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgSW5wdXRNYXBWaWV3IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvaW5wdXQvaW5wdXQtbWFwL0lucHV0TWFwVmlld1wiO1xuaW1wb3J0IHsgSW5wdXRFcnJvckhvb2tWaWV3UHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9pbnB1dC9JbnB1dEVycm9ySG9va1wiO1xuaW1wb3J0IHsgSW5wdXRWaWV3Rm4gfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9pbnB1dC9JbnB1dFZpZXdcIjtcbmltcG9ydCB7IFVzZXJCYXNpY0luZm9JbnB1dCB9IGZyb20gXCIuLi9BY2xVc2Vyc01hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IE11aVVzZXJCYXNpY0luZm9JbnB1dFZpZXc6IElucHV0Vmlld0ZuPHR5cGVvZiBVc2VyQmFzaWNJbmZvSW5wdXQ+ID0gcHJvcHMgPT4ge1xuICByZXR1cm4gKFxuICAgIDxHcmlkIGNvbnRhaW5lciBzcGFjaW5nPXsxfT5cbiAgICAgIDxJbnB1dE1hcFZpZXcuRmllbGRzXG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgZmllbGRzPXt7XG4gICAgICAgICAgZmlyc3ROYW1lOiBwcm9wcyA9PiAoXG4gICAgICAgICAgICA8R3JpZCBpdGVtIHhzPXs2fT5cbiAgICAgICAgICAgICAgPE11aVRleHRJbnB1dFZpZXcgey4uLnByb3BzfSB0aXRsZT17TGFuZ2BGSVJTVF9OQU1FYH0gLz5cbiAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICApLFxuICAgICAgICAgIGxhc3ROYW1lOiBwcm9wcyA9PiAoXG4gICAgICAgICAgICA8R3JpZCBpdGVtIHhzPXs2fT5cbiAgICAgICAgICAgICAgPE11aVRleHRJbnB1dFZpZXcgey4uLnByb3BzfSB0aXRsZT17TGFuZ2BMQVNUX05BTUVgfSAvPlxuICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICksXG4gICAgICAgICAgbG9naW5OYW1lOiBwcm9wcyA9PiAoXG4gICAgICAgICAgICA8R3JpZCBpdGVtIHhzPlxuICAgICAgICAgICAgICA8TXVpVGV4dElucHV0Vmlld1xuICAgICAgICAgICAgICAgIHsuLi5JbnB1dEVycm9ySG9va1ZpZXdQcm9wcyh7XG4gICAgICAgICAgICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgICAgICAgICAgIGVycm9yTWFwOiB7XG4gICAgICAgICAgICAgICAgICAgIEFMUkVBRFlfRVhJU1RTOiBMYW5nYExPR0lOX05BTUVfSVNfQUxSRUFEWV9FWElTVFNgLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB0aXRsZT17TGFuZ2BMT0dJTl9OQU1FYH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICApLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L0dyaWQ+XG4gICk7XG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTXVpVGV4dElucHV0VmlldyB9IGZyb20gXCIuLi8uLi8uLi9icm93c2VyL211aS9ycGMvaW5wdXRzL011aVRleHRJbnB1dFZpZXdcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyBJbnB1dE1hcFZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9pbnB1dC9pbnB1dC1tYXAvSW5wdXRNYXBWaWV3XCI7XG5pbXBvcnQgeyBJbnB1dFZpZXdGbiB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL2lucHV0L0lucHV0Vmlld1wiO1xuaW1wb3J0IHsgVXNlckNvbnRhY3RJbmZvSW5wdXQgfSBmcm9tIFwiLi4vQWNsVXNlcnNNYW5hZ2VyXCI7XG5cbmV4cG9ydCBjb25zdCBNdWlVc2VyQ29udGFjdEluZm9JbnB1dFZpZXc6IElucHV0Vmlld0ZuPHR5cGVvZiBVc2VyQ29udGFjdEluZm9JbnB1dD4gPSBwcm9wcyA9PiB7XG4gIHJldHVybiAoXG4gICAgPElucHV0TWFwVmlldy5GaWVsZHNcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIGZpZWxkcz17e1xuICAgICAgICBwaG9uZU51bWJlcjogcHJvcHMgPT4gKFxuICAgICAgICAgIDxNdWlUZXh0SW5wdXRWaWV3IHsuLi5wcm9wc30gdGl0bGU9e0xhbmdgUEhPTkVfTlVNQkVSYH0gLz5cbiAgICAgICAgKSxcbiAgICAgICAgZW1haWw6IHByb3BzID0+IDxNdWlUZXh0SW5wdXRWaWV3IHsuLi5wcm9wc30gdGl0bGU9e0xhbmdgRU1BSUxgfSAvPixcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFdlYWtNYXBGYWN0b3J5IH0gZnJvbSBcIi4uL2NvbW1vbi9tYXAvbWFwRmFjdG9yeVwiO1xuaW1wb3J0IHsgUmVhY3RvckVtaXR0ZXIgfSBmcm9tIFwiLi4vcmVhY3QvcmVhY3Rvci91c2VFbWl0dGVyXCI7XG5pbXBvcnQgeyBFbXB0eUZyYWdtZW50IH0gZnJvbSBcIi4uL3JlYWN0L3V0aWxzL0VtcHR5RnJhZ21lbnRcIjtcbmltcG9ydCB7IGNyZWF0ZVVuZGVmaW5lZENvbnRleHQgfSBmcm9tIFwiLi4vcmVhY3QvdXRpbHMvaG9va3MvY3JlYXRlVW5kZWZpbmVkQ29udGV4dFwiO1xuaW1wb3J0IHsgUm91dGVQcm9wcyB9IGZyb20gXCIuL1JvdXRlUHJvcHNcIjtcbmltcG9ydCB7IEFueVJvdXRlciwgUm91dGVyLCBSb3V0ZXJUeXBlLCBUUm91dGVyIH0gZnJvbSBcIi4vUm91dGVyXCI7XG5pbXBvcnQgeyBBbnlSb3V0ZXJMb2NhdGlvbiwgUm91dGVyTG9jYXRpb24gfSBmcm9tIFwiLi9Sb3V0ZXJMb2NhdGlvblwiO1xuXG50eXBlIF9SZW5kZXJlclByb3BzPFQgZXh0ZW5kcyBUUm91dGVyLCBSIGV4dGVuZHMgUm91dGVQcm9wcyA9IFJvdXRlUHJvcHM+ID0ge1xuICBsb2NhdGlvbjogUm91dGVyTG9jYXRpb248VD47XG4gIHJvdXRlOiBSO1xuICBlbWl0OiBSZWFjdG9yRW1pdHRlcjtcbn07XG50eXBlIF9XcmFwcGVyUHJvcHM8VCBleHRlbmRzIFRSb3V0ZXI+ID0gX1JlbmRlcmVyUHJvcHM8VD4gJiB7XG4gIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG59O1xudHlwZSBfUmVuZGVyZXI8VCBleHRlbmRzIFRSb3V0ZXIsIFIgZXh0ZW5kcyBSb3V0ZVByb3BzID0gUm91dGVQcm9wcz4gPSAoXG4gIHByb3BzOiBfUmVuZGVyZXJQcm9wczxULCBSPlxuKSA9PiBSZWFjdE5vZGU7XG50eXBlIF9XcmFwcGVyPFQgZXh0ZW5kcyBUUm91dGVyPiA9IChwcm9wczogX1dyYXBwZXJQcm9wczxUPikgPT4gUmVhY3ROb2RlO1xuXG5leHBvcnQgdHlwZSBSZWFjdFJvdXRlck9wdGlvbnM8VCBleHRlbmRzIFRSb3V0ZXI+ID0ge1xuICB3cmFwPzogX1dyYXBwZXI8VD47XG5cbiAgcmVuZGVyPzogX1JlbmRlcmVyPFQ+O1xuICByZW5kZXJEZWZhdWx0PzogX1JlbmRlcmVyPFQsIEV4dHJhY3Q8Um91dGVQcm9wcywgeyB0eXBlOiBcIkRFRkFVTFRcIiB9Pj47XG4gIHJlbmRlckluZGV4PzogX1JlbmRlcmVyPFQsIEV4dHJhY3Q8Um91dGVQcm9wcywgeyB0eXBlOiBcIklOREVYXCIgfT4+O1xuICByZW5kZXJOb1BhcmFtPzogX1JlbmRlcmVyPFQsIEV4dHJhY3Q8Um91dGVQcm9wcywgeyB0eXBlOiBcIk5PX1BBUkFNXCIgfT4+O1xufTtcblxuZXhwb3J0IHR5cGUgUmVhY3RSb3V0ZXIgPSB7XG4gIHB1c2gobG9jYXRpb246IEFueVJvdXRlckxvY2F0aW9uKTtcblxuICBmaW5kKHJvdXRlcik7XG59O1xuXG5leHBvcnQgY29uc3QgUmVhY3RSb3V0ZXJDb250ZXh0ID0gY3JlYXRlVW5kZWZpbmVkQ29udGV4dDxSZWFjdFJvdXRlcj4oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWN0Um91dGVyPFQgZXh0ZW5kcyBUUm91dGVyPihcbiAgcm91dGVyOiBSb3V0ZXI8VD4sXG4gIG9wdGlvbnNPclJlbmRlcmVyOiBSZWFjdFJvdXRlck9wdGlvbnM8VD4gfCBfUmVuZGVyZXI8VD5cbikge1xuICBsZXQgb3B0aW9uczogUmVhY3RSb3V0ZXJPcHRpb25zPFRSb3V0ZXI+O1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9uc09yUmVuZGVyZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIG9wdGlvbnMgPSB7IHJlbmRlcjogb3B0aW9uc09yUmVuZGVyZXIgYXMgYW55IH07XG4gIH0gZWxzZSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnNPclJlbmRlcmVyIGFzIGFueTtcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICB3cmFwOiB3cmFwcGVyLFxuICAgIHJlbmRlcixcbiAgICByZW5kZXJEZWZhdWx0LFxuICAgIHJlbmRlckluZGV4LFxuICAgIHJlbmRlck5vUGFyYW0sXG4gIH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IGluZm8gPSBnZXRSZWFjdFJvdXRlck1ldGFkYXRhKHJvdXRlcik7XG5cbiAgd3JhcHBlciAmJiBpbmZvLndyYXBwZXJzLnB1c2god3JhcHBlcik7XG5cbiAgY29uc3QgeyByZW5kZXJlcjogcHJldlJlbmRlciB9ID0gaW5mbztcblxuICBpbmZvLnJlbmRlcmVyID0gcHJvcHMgPT4ge1xuICAgIHN3aXRjaCAocHJvcHMucm91dGUudHlwZSkge1xuICAgICAgY2FzZSBcIkRFRkFVTFRcIjpcbiAgICAgICAgaWYgKHJlbmRlckRlZmF1bHQpIHJldHVybiByZW5kZXJEZWZhdWx0KHByb3BzIGFzIGFueSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIklOREVYXCI6XG4gICAgICAgIGlmIChyZW5kZXJJbmRleCkgcmV0dXJuIHJlbmRlckluZGV4KHByb3BzIGFzIGFueSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIk5PX1BBUkFNXCI6XG4gICAgICAgIGlmIChyZW5kZXJOb1BhcmFtKSByZXR1cm4gcmVuZGVyTm9QYXJhbShwcm9wcyBhcyBhbnkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIChyZW5kZXIgfHwgcHJldlJlbmRlcik/Lihwcm9wcyk7XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBnZXRSZWFjdFJvdXRlck1ldGFkYXRhID0gV2Vha01hcEZhY3RvcnkoKHJvdXRlcjogQW55Um91dGVyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgd3JhcHBlcnM6IFtdIGFzIF9XcmFwcGVyPFRSb3V0ZXI+W10sXG4gICAgcmVuZGVyZXI6IHVuZGVmaW5lZCBhcyB1bmRlZmluZWQgfCBfUmVuZGVyZXI8VFJvdXRlcj4sXG4gIH07XG59KTtcbiIsImltcG9ydCB7IEhpc3RvcnkgfSBmcm9tIFwiaGlzdG9yeVwiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgRnJhZ21lbnQsIFJlYWN0Tm9kZSwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlRW1pdHRlZCB9IGZyb20gXCIuLi9yZWFjdC9yZWFjdG9yL3VzZUVtaXR0ZWRcIjtcbmltcG9ydCB7IHVzZUVtaXR0ZXIgfSBmcm9tIFwiLi4vcmVhY3QvcmVhY3Rvci91c2VFbWl0dGVyXCI7XG5pbXBvcnQgeyBnZXRSb3V0ZVByb3BzQnlQYXRoLCBSb3V0ZVByb3BzIH0gZnJvbSBcIi4vUm91dGVQcm9wc1wiO1xuaW1wb3J0IHsgZ2V0UmVhY3RSb3V0ZXJNZXRhZGF0YSB9IGZyb20gXCIuL1JlYWN0Um91dGVyXCI7XG5pbXBvcnQgeyBBbnlSb3V0ZXIgfSBmcm9tIFwiLi9Sb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckxvY2F0aW9uIH0gZnJvbSBcIi4vUm91dGVyTG9jYXRpb25cIjtcblxuZXhwb3J0IHR5cGUgUmVhY3RSb3V0ZXJWaWV3UHJvcHMgPSB7XG4gIHJvdXRlcjogQW55Um91dGVyO1xuICBoaXN0b3J5OiBIaXN0b3J5O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWN0Um91dGVyVmlldyh7XG4gIHJvdXRlcjogcm9vdFJvdXRlcixcbiAgaGlzdG9yeSxcbn06IFJlYWN0Um91dGVyVmlld1Byb3BzKSB7XG4gIGNvbnN0IFtyb3V0ZSwgc2V0Um91dGVdID0gdXNlU3RhdGUoKCkgPT5cbiAgICBnZXRSb3V0ZVByb3BzQnlQYXRoKHJvb3RSb3V0ZXIsIGhpc3RvcnkubG9jYXRpb24ucGF0aG5hbWUpXG4gICk7XG5cbiAgY29uc3QgZW1pdCA9IHVzZUVtaXR0ZXIoKTtcblxuICB1c2VFbWl0dGVkKFJvdXRlckxvY2F0aW9uLCBsb2NhdGlvbiA9PiB7XG4gICAgaWYgKGxvY2F0aW9uLnJvb3Qucm91dGVyID09PSByb290Um91dGVyKSB7XG4gICAgICBzZXRSb3V0ZSh7XG4gICAgICAgIHR5cGU6IFwiSU5ERVhcIixcbiAgICAgICAgbG9jYXRpb24sXG4gICAgICAgIHBhdGg6IGxvY2F0aW9uLnBhdGgsXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIHVzZUVmZmVjdChcbiAgICAoKSA9PlxuICAgICAgaGlzdG9yeS5saXN0ZW4oKCkgPT4ge1xuICAgICAgICBzZXRSb3V0ZShnZXRSb3V0ZVByb3BzQnlQYXRoKHJvb3RSb3V0ZXIsIGhpc3RvcnkubG9jYXRpb24ucGF0aG5hbWUpKTtcbiAgICAgIH0pLFxuICAgIFtoaXN0b3J5XVxuICApO1xuXG4gIGxldCBjaGlsZHJlbjogUmVhY3ROb2RlID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0IHJvdXRlck1ldGFkYXRhID0gZ2V0UmVhY3RSb3V0ZXJNZXRhZGF0YShyb3V0ZS5sb2NhdGlvbi5yb3V0ZXIpO1xuICBpZiAocm91dGVyTWV0YWRhdGEucmVuZGVyZXIpIHtcbiAgICBjaGlsZHJlbiA9IHJvdXRlck1ldGFkYXRhLnJlbmRlcmVyKHtcbiAgICAgIGVtaXQsXG4gICAgICByb3V0ZSxcbiAgICAgIGxvY2F0aW9uOiByb3V0ZS5sb2NhdGlvbixcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAoY29uc3QgbG9jYXRpb24gb2Ygcm91dGUubG9jYXRpb24uZ2V0UGFyZW50cygpKSB7XG4gICAgY29uc3Qgcm91dGVyTWV0YWRhdGEgPSBnZXRSZWFjdFJvdXRlck1ldGFkYXRhKGxvY2F0aW9uLnJvdXRlcik7XG4gICAgZm9yIChjb25zdCB3cmFwcGVyIG9mIHJvdXRlck1ldGFkYXRhLndyYXBwZXJzKSB7XG4gICAgICBjaGlsZHJlbiA9IHdyYXBwZXIoe1xuICAgICAgICBlbWl0LFxuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgbG9jYXRpb24sXG4gICAgICAgIHJvdXRlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoRnJhZ21lbnQsIG51bGwsIGNoaWxkcmVuKTtcbn1cbiIsImltcG9ydCB7IGdldE5leHRQYXRoIH0gZnJvbSBcIi4uL2NvbW1vbi9nZXROZXh0UGF0aFwiO1xuaW1wb3J0IHsgdGVzdE1ldGFUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9NZXRhVHlwZVwiO1xuaW1wb3J0IHsgUGF5bG9hZCB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgQW55Um91dGVyLCBSb3V0ZXIgfSBmcm9tIFwiLi9Sb3V0ZXJcIjtcbmltcG9ydCB7IEFueVJvdXRlckxvY2F0aW9uLCBSb3V0ZXJMb2NhdGlvbiB9IGZyb20gXCIuL1JvdXRlckxvY2F0aW9uXCI7XG5cbmV4cG9ydCB0eXBlIFJvdXRlUHJvcHMgPSBQYXlsb2FkPFxuICB7XG4gICAgSU5ERVg6IHt9O1xuICAgIERFRkFVTFQ6IHtcbiAgICAgIGRlZmF1bHRQYXRoOiBzdHJpbmc7XG4gICAgfTtcbiAgICBOT19QQVJBTToge1xuICAgICAgcGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICAgICAgcGFyYW1LZXk6IHN0cmluZztcbiAgICAgIHBhcmFtSW5kZXg6IG51bWJlcjtcbiAgICB9O1xuICB9LFxuICB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGxvY2F0aW9uOiBBbnlSb3V0ZXJMb2NhdGlvbjtcbiAgfVxuPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvdXRlUHJvcHNCeVBhdGgoXG4gIHJvdXRlcjogQW55Um91dGVyLFxuICBwYXRoOiBzdHJpbmdcbik6IFJvdXRlUHJvcHMge1xuICBsZXQgbG9jYXRpb24gPSBSb3V0ZXJMb2NhdGlvbi5jcmVhdGUocm91dGVyKTtcbiAgY29uc3QgYmFzZVByb3BzID0geyBwYXRoIH07XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBkZWZhdWx0UGF0aCA9IHBhdGg7XG4gICAgbGV0IG5hbWU6IHN0cmluZztcbiAgICBbbmFtZSwgcGF0aF0gPSBnZXROZXh0UGF0aChwYXRoKTtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHJldHVybiB7IC4uLmJhc2VQcm9wcywgdHlwZTogXCJJTkRFWFwiLCBsb2NhdGlvbiB9O1xuICAgIH1cbiAgICBjb25zdCByb3V0ZXIgPSBsb2NhdGlvbi5yb3V0ZXIuY2hpbGRyZW5bbmFtZV07XG4gICAgaWYgKCFyb3V0ZXIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2VQcm9wcyxcbiAgICAgICAgdHlwZTogXCJERUZBVUxUXCIsXG4gICAgICAgIGxvY2F0aW9uLFxuICAgICAgICBkZWZhdWx0UGF0aCxcbiAgICAgIH07XG4gICAgfVxuICAgIGxldCBwYXJhbXMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFtwYXJhbUluZGV4LCBwYXJhbUtleV0gb2Ygcm91dGVyLnBhcmFtcy5lbnRyaWVzKCkpIHtcbiAgICAgIGxldCB2YWx1ZTogc3RyaW5nO1xuICAgICAgW3ZhbHVlLCBwYXRoXSA9IGdldE5leHRQYXRoKHBhdGgpO1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmJhc2VQcm9wcyxcbiAgICAgICAgICB0eXBlOiBcIk5PX1BBUkFNXCIsXG4gICAgICAgICAgbG9jYXRpb24sXG4gICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgIHBhcmFtSW5kZXgsXG4gICAgICAgICAgcGFyYW1LZXksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBwYXJhbXNbcGFyYW1LZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGxvY2F0aW9uID0gbmV3IFJvdXRlckxvY2F0aW9uKHJvdXRlciwgcGFyYW1zLCBsb2NhdGlvbiwgbmFtZSk7XG4gIH1cbn1cbnRlc3RNZXRhVHlwZShSb3V0ZXIoW1wicFwiXSksIHQgPT4ge1xuICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gIHQuVFJvdXRlci5QYXJhbXMueDtcblxuICB0LlRSb3V0ZXIuUGFyYW1zLnA7XG59KTtcbnRlc3RNZXRhVHlwZShSb3V0ZXIoeyBhOiBSb3V0ZXIoW1wicFwiXSkgfSksIHQgPT4ge1xuICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gIHQuVFJvdXRlci5QYXJhbXMueDtcblxuICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gIHQuVFJvdXRlci5DaGlsZHJlbi5hLlBhcmFtcy54O1xuXG4gIHQuVFJvdXRlci5DaGlsZHJlbi5hLlBhcmFtcy5wO1xufSk7XG5cbnRlc3RNZXRhVHlwZShcbiAgUm91dGVyKHtcbiAgICBhOiBSb3V0ZXIoW1wicFwiXSwge1xuICAgICAgYWE6IFJvdXRlcihbXCJwcFwiXSksXG4gICAgfSksXG4gIH0pLFxuICB0ID0+IHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgdC5UUm91dGVyLlBhcmFtcy54O1xuXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHQuVFJvdXRlci5DaGlsZHJlbi5hLlBhcmFtcy54O1xuXG4gICAgdC5UUm91dGVyLkNoaWxkcmVuLmEuUGFyYW1zLnA7XG5cbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgdC5UUm91dGVyLkNoaWxkcmVuLmEuQ2hpbGRyZW4uYWEuUGFyYW1zLng7XG5cbiAgICB0LlRSb3V0ZXIuQ2hpbGRyZW4uYS5DaGlsZHJlbi5hYS5QYXJhbXMucHA7XG4gIH1cbik7XG4iLCJpbXBvcnQgeyBXZWFrTWFwRmFjdG9yeSB9IGZyb20gXCIuLi9jb21tb24vbWFwL21hcEZhY3RvcnlcIjtcbmltcG9ydCB7IE1ldGFUeXBlLCBXaXRoTWV0YVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL01ldGFUeXBlXCI7XG5pbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7IEV4cGVjdCwgSWZOZXZlciwgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3NcIjtcblxuZXhwb3J0IHR5cGUgQW55Um91dGVyTWFwID0gUmVjb3JkPHN0cmluZywgUm91dGVyPFRSb3V0ZXI+PjtcblxuZXhwb3J0IHR5cGUgVFJvdXRlciA9IHtcbiAgUGFyZW50PzogVFJvdXRlcjtcbiAgUGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBTdGFjazogUmVjb3JkPHN0cmluZywgVFJvdXRlcj47XG4gIENoaWxkcmVuOiBSZWNvcmQ8c3RyaW5nLCBUUm91dGVyPjtcbn07XG5cbmV4cG9ydCB0eXBlIFJvdXRlclByb3BzID0gdHlwZW9mIFJvdXRlclR5cGUgJiBSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVSb3V0ZXI+O1xuXG5leHBvcnQgdHlwZSBURW1wdHlSb3V0ZXIgPSBFeHBlY3Q8XG4gIFRSb3V0ZXIsXG4gIE92ZXJyaWRlPFxuICAgIFRSb3V0ZXIsXG4gICAge1xuICAgICAgU3RhY2s6IHt9O1xuICAgICAgQ2hpbGRyZW46IHt9O1xuICAgICAgUGFyYW1zOiB7fTtcbiAgICB9XG4gID5cbj47XG5leHBvcnQgdHlwZSBSb3V0ZXJNYXBUeXBlPFQgZXh0ZW5kcyBBbnlSb3V0ZXJNYXA+ID0ge1xuICBbSyBpbiBrZXlvZiBUXTogUm91dGVyVHlwZTxUW0tdPjtcbn07XG5leHBvcnQgdHlwZSBSb3V0ZXJXaXRoQ2hpbGRyZW48XG4gIEMgZXh0ZW5kcyBBbnlSb3V0ZXJNYXAsXG4gIFAgZXh0ZW5kcyBvYmplY3QgPSB7fVxuPiA9IFJvdXRlcjxcbiAgT3ZlcnJpZGU8XG4gICAgUCAmIFRFbXB0eVJvdXRlcixcbiAgICB7XG4gICAgICBDaGlsZHJlbjogUm91dGVyTWFwVHlwZTxDPjtcbiAgICB9XG4gID5cbj47XG5leHBvcnQgdHlwZSBSb3V0ZXJXaXRoUGFyYW1zPFxuICBQIGV4dGVuZHMgc3RyaW5nLFxuICBDIGV4dGVuZHMgQW55Um91dGVyTWFwID0ge31cbj4gPSBSb3V0ZXI8XG4gIE92ZXJyaWRlPFxuICAgIFRFbXB0eVJvdXRlcixcbiAgICB7XG4gICAgICBQYXJhbXM6IFJlY29yZDxQLCBzdHJpbmc+O1xuICAgICAgQ2hpbGRyZW46IFJvdXRlck1hcFR5cGU8Qz47XG4gICAgfVxuICA+XG4+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlcjxUIGV4dGVuZHMgVFJvdXRlciA9IFRFbXB0eVJvdXRlcj5cbiAgZXh0ZW5kcyBXaXRoTWV0YVR5cGU8eyBUUm91dGVyOiBUIH0+LFxuICAgIFJvdXRlclByb3BzIHt9XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlcihwYXJhbXM6IHN0cmluZ1tdLCBjaGlsZHJlbjogUmVjb3JkPHN0cmluZywgQW55Um91dGVyPikge1xuICByZXR1cm4ge1xuICAgIGNoaWxkcmVuLFxuICAgIHBhcmFtcyxcbiAgICBiYXNlczogbmV3IFNldDxBbnlSb3V0ZXI+KCksXG4gIH07XG59XG5leHBvcnQgdHlwZSBSb3V0ZXJUeXBlPFQgZXh0ZW5kcyBBbnlSb3V0ZXI+ID0gTWV0YVR5cGU8VD5bXCJUUm91dGVyXCJdO1xuXG5leHBvcnQgdHlwZSBBbnlSb3V0ZXIgPSBSb3V0ZXI8VFJvdXRlcj47XG5cbmV4cG9ydCBmdW5jdGlvbiBSb3V0ZXIoKTogUm91dGVyPHtcbiAgUGFyYW1zOiB7fTtcbiAgU3RhY2s6IHt9O1xuICBDaGlsZHJlbjoge307XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJvdXRlcjxDIGV4dGVuZHMgQW55Um91dGVyTWFwPihcbiAgY2hpbGRyZW46IENcbik6IFJvdXRlcjx7XG4gIFBhcmFtczoge307XG4gIFN0YWNrOiB7fTtcbiAgQ2hpbGRyZW46IFJvdXRlck1hcFR5cGU8Qz47XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJvdXRlcjxLIGV4dGVuZHMgc3RyaW5nPihcbiAgcGFyYW1zOiBLW11cbik6IFJvdXRlcjx7XG4gIFBhcmFtczogUmVjb3JkPHN0cmluZyAmIEssIHN0cmluZz47XG4gIFN0YWNrOiB7fTtcbiAgQ2hpbGRyZW46IHt9O1xufT47XG5leHBvcnQgZnVuY3Rpb24gUm91dGVyPEsgZXh0ZW5kcyBzdHJpbmcsIEMgZXh0ZW5kcyBBbnlSb3V0ZXJNYXA+KFxuICBwYXJhbXM6IEtbXSxcbiAgY2hpbGRyZW46IENcbik6IFJvdXRlcjx7XG4gIFBhcmFtczogUmVjb3JkPHN0cmluZyAmIEssIHN0cmluZz47XG4gIFN0YWNrOiB7fTtcbiAgQ2hpbGRyZW46IFJvdXRlck1hcFR5cGU8Qz47XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJvdXRlcihwYXJhbXNPckNoaWxkcmVuPywgbWF5YmVDaGlsZHJlbj8pIHtcbiAgbGV0IHBhcmFtcywgY2hpbGRyZW47XG4gIGlmIChtYXliZUNoaWxkcmVuKSB7XG4gICAgW3BhcmFtcywgY2hpbGRyZW5dID0gW3BhcmFtc09yQ2hpbGRyZW4sIG1heWJlQ2hpbGRyZW5dO1xuICB9IGVsc2Uge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtc09yQ2hpbGRyZW4pKSB7XG4gICAgICBbcGFyYW1zLCBjaGlsZHJlbl0gPSBbcGFyYW1zT3JDaGlsZHJlbiwge31dO1xuICAgIH0gZWxzZSB7XG4gICAgICBbcGFyYW1zLCBjaGlsZHJlbl0gPSBbW10sIHBhcmFtc09yQ2hpbGRyZW4gfHwge31dO1xuICAgIH1cbiAgfVxuICByZXR1cm4gT2JqZWN0LnNldFByb3RvdHlwZU9mKGNyZWF0ZVJvdXRlcihwYXJhbXMsIGNoaWxkcmVuKSwgUm91dGVyVHlwZSk7XG59XG5cbmV4cG9ydCB0eXBlIFJvdXRlckF0PFxuICBUIGV4dGVuZHMgVFJvdXRlciwgLy9cbiAgSyBleHRlbmRzIGtleW9mIFRbXCJDaGlsZHJlblwiXVxuPiA9IFJvdXRlcjxcbiAgVFtcIkNoaWxkcmVuXCJdW0tdICYge1xuICAgIFBhcmVudDogVDtcbiAgICBTdGFjazogVFtcIlN0YWNrXCJdICYgUmVjb3JkPEssIFRbXCJDaGlsZHJlblwiXVtLXT47XG4gIH1cbj47XG5cbmV4cG9ydCBuYW1lc3BhY2UgUm91dGVyVHlwZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBhdDxUIGV4dGVuZHMgVFJvdXRlciwgSyBleHRlbmRzIGtleW9mIFRbXCJDaGlsZHJlblwiXT4oXG4gICAgdGhpczogUm91dGVyPFQ+LFxuICAgIGtleTogc3RyaW5nICYgS1xuICApOiBSb3V0ZXJBdDxULCBLPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGF0PFQgZXh0ZW5kcyBUUm91dGVyLCBLIGV4dGVuZHMga2V5b2YgVFtcIkNoaWxkcmVuXCJdPihcbiAgICB0aGlzOiBSb3V0ZXI8VD4sXG4gICAga2V5OiBzdHJpbmcgJiBLLFxuICAgIGNhbGxiYWNrOiAocm91dGVyOiBSb3V0ZXJBdDxULCBLPikgPT4gdm9pZFxuICApOiBSb3V0ZXI8VD47XG4gIGV4cG9ydCBmdW5jdGlvbiBhdCh0aGlzOiBBbnlSb3V0ZXIsIGtleSwgY2FsbGJhY2s/KSB7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayh0aGlzLmNoaWxkcmVuW2tleV0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuW2tleV07XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlPFQgZXh0ZW5kcyBUUm91dGVyPih0aGlzOiBSb3V0ZXI8VD4pOiBSb3V0ZXI8VD4ge1xuICAgIGNvbnN0IHJvdXRlciA9IFJvdXRlcihcbiAgICAgIHRoaXMucGFyYW1zLFxuICAgICAgbWFwT2JqZWN0KHRoaXMuY2hpbGRyZW4sIGMgPT4gYy5jcmVhdGUoKSlcbiAgICApIGFzIFJvdXRlcjxUPjtcblxuICAgIHJvdXRlci5iYXNlcy5hZGQodGhpcyk7XG4gICAgZm9yIChjb25zdCBiYXNlIG9mIHRoaXMuYmFzZXMpIHtcbiAgICAgIHJvdXRlci5iYXNlcy5hZGQoYmFzZSk7XG4gICAgfVxuICAgIHJldHVybiByb3V0ZXI7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gaXNSb3V0ZXJPZih0aGlzOiBBbnlSb3V0ZXIsIGJhc2U6IEFueVJvdXRlcikge1xuICAgIHJldHVybiB0aGlzID09PSBiYXNlIHx8IHRoaXMuYmFzZXMuaGFzKGJhc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyByZXZlcnNlZCB9IGZyb20gXCIuLi9jb21tb24vYXJyYXkvcmV2ZXJzZWRcIjtcbmltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi4vY29tbW9uL29iamVjdC9lbnRyaWVzXCI7XG5pbXBvcnQgeyBMYXp5IH0gZnJvbSBcIi4uL2NvbW1vbi9wYXR0ZXJucy9sYXp5XCI7XG5pbXBvcnQge1xuICBIYXNLZXlzLFxuICBJc05ldmVyLFxuICBJc1VuZGVmaW5lZCxcbiAgT21pdEtleXMsXG4gIE92ZXJyaWRlLFxufSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IGpvaW5VcmwgfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy9qb2luVXJsXCI7XG5pbXBvcnQgeyBpbnNwZWN0IH0gZnJvbSBcIi4uL2xvZ2dpbmcvaW5zcGVjdFwiO1xuaW1wb3J0IHsgQW55Um91dGVyLCBSb3V0ZXIsIFJvdXRlckF0LCBSb3V0ZXJUeXBlLCBUUm91dGVyIH0gZnJvbSBcIi4vUm91dGVyXCI7XG5cbmV4cG9ydCB0eXBlIEFueVJvdXRlckxvY2F0aW9uID0gUm91dGVyTG9jYXRpb248VFJvdXRlcj47XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyTG9jYXRpb248VCBleHRlbmRzIFRSb3V0ZXI+IHt9XG5leHBvcnQgY2xhc3MgUm91dGVyTG9jYXRpb248VCBleHRlbmRzIFRSb3V0ZXI+IHtcbiAgc3RhdGljIGNyZWF0ZTxUIGV4dGVuZHMgVFJvdXRlcj4ocm91dGVyOiBSb3V0ZXI8VD4pOiBSb3V0ZXJMb2NhdGlvbjxUPiB7XG4gICAgaWYgKHJvdXRlci5wYXJhbXMubGVuZ3RoKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBjcmVhdGUgUm91dGVyTG9jYXRpb24gZm9yICR7aW5zcGVjdCh0aGlzKX0uYCk7XG4gICAgcmV0dXJuIG5ldyBSb3V0ZXJMb2NhdGlvbihyb3V0ZXIsIHt9LCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG4gIH1cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9yb3V0ZXI6IEFueVJvdXRlcixcbiAgICBwcm90ZWN0ZWQgX3BhcmFtczogYW55LFxuICAgIHByb3RlY3RlZCBfcGFyZW50OiBBbnlSb3V0ZXJMb2NhdGlvbiB8IHVuZGVmaW5lZCxcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4gICkge31cblxuICBATGF6eSgpIGdldCBwYXRoKCk6IHN0cmluZyB7XG4gICAgbGV0IHBhdGg6IHN0cmluZyA9IGpvaW5VcmwodGhpcy5fcGFyZW50Py5wYXRoIHx8IFwiXCIsIHRoaXMubmFtZSk7XG4gICAgZm9yIChjb25zdCBwYXJhbUtleSBvZiB0aGlzLl9yb3V0ZXIucGFyYW1zKSB7XG4gICAgICBwYXRoID0gam9pblVybChwYXRoLCB0aGlzLl9wYXJhbXNbcGFyYW1LZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXQgcGFyZW50KCk6IFRbXCJQYXJlbnRcIl0gZXh0ZW5kcyBUUm91dGVyXG4gICAgPyBSb3V0ZXJMb2NhdGlvbjxUW1wiUGFyZW50XCJdPlxuICAgIDogdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50IGFzIGFueTtcbiAgfVxuXG4gIGdldCByb290KCk6IEFueVJvdXRlckxvY2F0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50Py5yb290IHx8ICh0aGlzIGFzIGFueSk7XG4gIH1cblxuICBnZXQgcm91dGVyKCk6IFJvdXRlcjxUPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JvdXRlciBhcyBSb3V0ZXI8VD47XG4gIH1cblxuICBnZXQgcGFyYW1zKCk6IFRbXCJQYXJhbXNcIl0ge1xuICAgIHJldHVybiB0aGlzLl9wYXJhbXM7XG4gIH1cblxuICBhdDxUIGV4dGVuZHMgVFJvdXRlciwgSyBleHRlbmRzIGtleW9mIFRbXCJDaGlsZHJlblwiXT4oXG4gICAgdGhpczogUm91dGVyTG9jYXRpb248VD4sXG4gICAga2V5OiBzdHJpbmcgJiBLLFxuICAgIC4uLltwYXJhbXNdOiBIYXNLZXlzPFRbXCJDaGlsZHJlblwiXVtLXVtcIlBhcmFtc1wiXT4gZXh0ZW5kcyBmYWxzZVxuICAgICAgPyBbXVxuICAgICAgOiBbVFtcIkNoaWxkcmVuXCJdW0tdW1wiUGFyYW1zXCJdXVxuICApOiBSb3V0ZXJMb2NhdGlvbjxSb3V0ZXJUeXBlPFJvdXRlckF0PFQsIEs+Pj4ge1xuICAgIHJldHVybiA8YW55PihcbiAgICAgIG5ldyBSb3V0ZXJMb2NhdGlvbihcbiAgICAgICAgdGhpcy5fcm91dGVyLmNoaWxkcmVuW2tleV0sXG4gICAgICAgIHBhcmFtcyB8fCB7fSxcbiAgICAgICAgdGhpcyBhcyBhbnksXG4gICAgICAgIGtleVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBhdFN0YWNrPFQgZXh0ZW5kcyBUUm91dGVyLCBLIGV4dGVuZHMga2V5b2YgVFtcIlN0YWNrXCJdPihcbiAgICB0aGlzOiBSb3V0ZXJMb2NhdGlvbjxUPixcbiAgICBrZXk6IEtcbiAgKTogUm91dGVyTG9jYXRpb248VFtcIlN0YWNrXCJdW0tdPiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH1cblxuICAqZ2V0UGFyZW50cyh0aGlzOiBBbnlSb3V0ZXJMb2NhdGlvbikge1xuICAgIGZvciAobGV0IHBhcmVudCA9IHRoaXM7IHBhcmVudDsgcGFyZW50ID0gcGFyZW50LnBhcmVudCEpIHtcbiAgICAgIHlpZWxkIHBhcmVudDtcbiAgICB9XG4gIH1cblxuICAqZ2V0UGFyZW50c0NoaWxkcmVuKHRoaXM6IEFueVJvdXRlckxvY2F0aW9uKSB7XG4gICAgZm9yIChsZXQgW25hbWUsIHJvdXRlcl0gb2YgZW50cmllcyh0aGlzLl9yb3V0ZXIuY2hpbGRyZW4pKSB7XG4gICAgICBpZiAocm91dGVyLnBhcmFtcy5sZW5ndGgpIGNvbnRpbnVlO1xuICAgICAgeWllbGQgbmV3IFJvdXRlckxvY2F0aW9uKHJvdXRlciwge30sIHRoaXMsIG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gICpnZXRDaGlsZHJlbih0aGlzOiBBbnlSb3V0ZXJMb2NhdGlvbik6IEl0ZXJhYmxlSXRlcmF0b3I8QW55Um91dGVyTG9jYXRpb24+IHtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCByb3V0ZXJdIG9mIGVudHJpZXModGhpcy5fcm91dGVyLmNoaWxkcmVuKSkge1xuICAgICAgaWYgKCFyb3V0ZXIucGFyYW1zLmxlbmd0aCkge1xuICAgICAgICB5aWVsZCBuZXcgUm91dGVyTG9jYXRpb24ocm91dGVyLCB7fSwgdGhpcywgbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkICpmaW5kQ2hpbGRyZW4oXG4gICAgdGhpczogQW55Um91dGVyTG9jYXRpb25cbiAgKTogSXRlcmFibGVJdGVyYXRvcjxBbnlSb3V0ZXJMb2NhdGlvbj4ge1xuICAgIHlpZWxkKiB0aGlzLmdldENoaWxkcmVuKCk7XG4gICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5nZXRDaGlsZHJlbigpKSB7XG4gICAgICB5aWVsZCogY2hpbGQuZmluZENoaWxkcmVuKCk7XG4gICAgfVxuICB9XG5cbiAgKmZpbmRQYXJlbnRzKHRoaXM6IEFueVJvdXRlckxvY2F0aW9uKSB7XG4gICAgbGV0IHJvb3Q6IEFueVJvdXRlckxvY2F0aW9uIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGxldCBwYXJlbnRSb3V0ZXJzID0gbmV3IFNldDxBbnlSb3V0ZXI+KCk7XG4gICAgZm9yIChjb25zdCBwYXJlbnQgb2YgdGhpcy5nZXRQYXJlbnRzKCkpIHtcbiAgICAgIHBhcmVudFJvdXRlcnMuYWRkKHBhcmVudC5yb3V0ZXIpO1xuICAgICAgeWllbGQgKHJvb3QgPSBwYXJlbnQpO1xuICAgIH1cbiAgICBpZiAocm9vdCkge1xuICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiByb290LmZpbmRDaGlsZHJlbigpKSB7XG4gICAgICAgIGlmICghcGFyZW50Um91dGVycy5oYXMoY2hpbGQucm91dGVyKSkge1xuICAgICAgICAgIHlpZWxkIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9maW5kKFxuICAgIGxvY2F0aW9uczogSXRlcmFibGU8QW55Um91dGVyTG9jYXRpb24+LFxuICAgIHJvdXRlcjogQW55Um91dGVyXG4gICk6IEFueVJvdXRlckxvY2F0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGxvY2F0aW9ucykge1xuICAgICAgaWYgKGNoaWxkLnJvdXRlci5pc1JvdXRlck9mKHJvdXRlcikpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkIGFzIEFueVJvdXRlckxvY2F0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZpbmQ8VCBleHRlbmRzIFRSb3V0ZXI+KFxuICAgIHRoaXM6IEFueVJvdXRlckxvY2F0aW9uLFxuICAgIHJvdXRlcjogUm91dGVyPFQ+XG4gICk6XG4gICAgfCBSb3V0ZXJMb2NhdGlvbjxPdmVycmlkZTxULCBQaWNrPFRSb3V0ZXIsIFwiUGFyZW50XCIgfCBcIlN0YWNrXCI+Pj5cbiAgICB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmQodGhpcy5maW5kUGFyZW50cygpLCByb3V0ZXIpIGFzIGFueTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzXCI7XG5cbmNvbnN0IHJlc3VsdFN5bWJvbCA9IFN5bWJvbCgpO1xuXG5leHBvcnQgdHlwZSBDb25maWdGYWN0b3J5UmVzdWx0PEM+ID0gQXdhaXRhYmxlPHsgW3Jlc3VsdFN5bWJvbF06IEMgfT47XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0ZhY3RvcnlGbjxDPiA9IChjb25maWc6IEMpID0+IENvbmZpZ0ZhY3RvcnlSZXN1bHQ8Qz47XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0ZhY3Rvcnk8QywgVSBleHRlbmRzIGFueVtdID0gW10+ID0gKFxuICAkOiBDb25maWdGYWN0b3J5Rm48Qz4sXG4gIC4uLmFyZ3M6IFVcbikgPT4gQ29uZmlnRmFjdG9yeVJlc3VsdDxDPjtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ0ZhY3Rvcnk8QywgVSBleHRlbmRzIGFueVtdPihcbiAgY29uZmlnOiBDb25maWdGYWN0b3J5PEMsIFU+IHwgdW5kZWZpbmVkLFxuICAuLi5hcmdzOiBVXG4pOiBDIHwgdW5kZWZpbmVkO1xuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ0ZhY3Rvcnk8QywgVSBleHRlbmRzIGFueVtdPihcbiAgY29uZmlnOiBDb25maWdGYWN0b3J5PEMsIFU+LFxuICAuLi5hcmdzOiBVXG4pOiBDO1xuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ0ZhY3RvcnkoY29uZmlnLCBjb250ZXh0LCAuLi5hcmdzKSB7XG4gIGxldCByZXN1bHQgPSBjb25maWc/LihcbiAgICAkID0+IHtcbiAgICAgIHJldHVybiB7IFtyZXN1bHRTeW1ib2xdOiAkIH07XG4gICAgfSxcbiAgICBjb250ZXh0LFxuICAgIC4uLmFyZ3NcbiAgKTtcbiAgaWYgKCFyZXN1bHQgfHwgIShyZXN1bHRTeW1ib2wgaW4gcmVzdWx0KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgWW91IGhhdmUgdG8gdXNlICRgKTtcbiAgfVxuICB3aGlsZSAocmVzdWx0U3ltYm9sIGluIHJlc3VsdCkge1xuICAgIHJlc3VsdCA9IHJlc3VsdFtyZXN1bHRTeW1ib2xdO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyB0b3VjaE1hcCB9IGZyb20gXCIuLi9jb21tb24vbWFwL3RvdWNoTWFwXCI7XG5pbXBvcnQgeyBBd2FpdGFibGUsIEZuLCBJc05ldmVyIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzXCI7XG5cbmNvbnN0IGdlbmVyaWNDb25maWdDYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbmRlY2xhcmUgY29uc3QgaXNHZW5lcmljQ29uZmlnOiB1bmlxdWUgc3ltYm9sO1xuXG5leHBvcnQgdHlwZSBHZW5lcmljQ29uZmlnQ29uZmlndXJlPFxuICBUIGV4dGVuZHMgR2VuZXJpY0NvbmZpZzxGbj5cbj4gPSBUIGV4dGVuZHMgR2VuZXJpY0NvbmZpZzxpbmZlciBVPiA/IFUgOiBuZXZlcjtcbmV4cG9ydCB0eXBlIEdlbmVyaWNDb25maWc8VCBleHRlbmRzIEZuID0gYW55PiA9IHtcbiAgKGNvbmZpZ3VyZTogVCk6IEF3YWl0YWJsZTxSZXR1cm5UeXBlPFQ+PjtcbiAgW2lzR2VuZXJpY0NvbmZpZ10/OiB0cnVlO1xufTtcbmV4cG9ydCB0eXBlIElzR2VuZXJpY0NvbmZpZzxUPiA9IElzTmV2ZXI8VD4gZXh0ZW5kcyB0cnVlXG4gID8gZmFsc2UgfCB0cnVlXG4gIDogVCBleHRlbmRzIEZuXG4gID8gUmVxdWlyZWQ8VD4gZXh0ZW5kcyB7XG4gICAgICBbaXNHZW5lcmljQ29uZmlnXTogdHJ1ZTtcbiAgICB9XG4gICAgPyB0cnVlXG4gICAgOiBmYWxzZVxuICA6IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gR2VuZXJpY0NvbmZpZzxUIGV4dGVuZHMgR2VuZXJpY0NvbmZpZz4oXG4gIGdlbmVyaWNDb25maWc6IFRcbik6IFJldHVyblR5cGU8VD4ge1xuICByZXR1cm4gdG91Y2hNYXAoZ2VuZXJpY0NvbmZpZ0NhY2hlLCBnZW5lcmljQ29uZmlnLCAoKSA9PiB7XG4gICAgcmV0dXJuIGdlbmVyaWNDb25maWcoeCA9PiB4KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBJZiwgSXMgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7XG4gIEFic3RyYWN0UnBjSGFuZGxlcixcbiAgQW55UnBjLFxuICBJUnBjSGFuZGxlcixcbiAgUnBjLFxuICBScGNDb21tYW5kLFxufSBmcm9tIFwiLi9ScGNcIjtcblxuZXhwb3J0IHR5cGUgTm9ScGMgPSBScGM8e1xuICBIYW5kbGVyOiB7fTtcbiAgQ29ubmVjdGlvbjoge307XG4gIENvbmZpZzogdW5kZWZpbmVkO1xuICBQcm9wczoge307XG59PjtcblxuZXhwb3J0IGNvbnN0IE5vUnBjOiBOb1JwYyA9IFJwYzxOb1JwYz4oe1xuICBjb25uZWN0OiAoKSA9PiAoe30pLFxuICBoYW5kbGVyOiBjbGFzc1xuICAgIGV4dGVuZHMgQWJzdHJhY3RScGNIYW5kbGVyPE5vUnBjPlxuICAgIGltcGxlbWVudHMgSVJwY0hhbmRsZXI8Tm9ScGM+IHtcbiAgICBhc3luYyBoYW5kbGUoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG59KTtcbiIsImltcG9ydCB7IHRvdWNoTWFwIH0gZnJvbSBcIi4uL2NvbW1vbi9tYXAvdG91Y2hNYXBcIjtcbmltcG9ydCB7IE1ldGFUeXBlLCBXaXRoTWV0YVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL01ldGFUeXBlXCI7XG5pbXBvcnQgeyBtZXJnZURlc2NyaXB0b3JzIH0gZnJvbSBcIi4uL2NvbW1vbi9vYmplY3QvbWVyZ2VEZXNjcmlwdG9yc1wiO1xuaW1wb3J0IHtcbiAgQXdhaXRhYmxlLFxuICBBd2FpdGVkLFxuICBGbixcbiAgSWYsXG4gIElzLFxuICBJc0VtcHR5T2JqZWN0LFxuICBJc1VuZGVmaW5lZCxcbiAgTm90LFxuICBPdmVycmlkZSxcbiAgUGFydGlhbFVuZGVmaW5lZEtleXMsXG59IGZyb20gXCIuLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgaW5zcGVjdCB9IGZyb20gXCIuLi9sb2dnaW5nL2luc3BlY3RcIjtcbmltcG9ydCB7IENvbmZpZ0ZhY3RvcnkgfSBmcm9tIFwiLi9Db25maWdGYWN0b3J5XCI7XG5pbXBvcnQgeyBHZW5lcmljQ29uZmlnLCBJc0dlbmVyaWNDb25maWcgfSBmcm9tIFwiLi9HZW5lcmljQ29uZmlnXCI7XG5cbmV4cG9ydCB0eXBlIFJwY0NvbW1hbmQgPSAocGF5bG9hZDogYW55KSA9PiBQcm9taXNlPGFueT47XG5cbmV4cG9ydCB0eXBlIFRScGMgPSB7XG4gIEhhbmRsZXI6IG9iamVjdDtcbiAgQ29ubmVjdGlvbjogYW55O1xuICBDb25maWc6IG9iamVjdCB8IHVuZGVmaW5lZDtcbiAgUHJvcHM6IG9iamVjdDtcbn07XG5cbmV4cG9ydCB0eXBlIEFueVJwYyA9IFJwYzxUUnBjPjtcblxuZXhwb3J0IHR5cGUgUnBjPFQgZXh0ZW5kcyBUUnBjPiA9IFdpdGhNZXRhVHlwZTx7XG4gIFRScGM6IFQ7XG59PiAmXG4gIFRbXCJQcm9wc1wiXSAmIHtcbiAgICByZWFkb25seSBvcHRpb25zOiBScGNPcHRpb25zPFRScGM+O1xuXG4gICAgcmVhZG9ubHkgc2VydmljZTogX1JwY0Nvbm5lY3Rpb248VD47XG5cbiAgICBjcmVhdGVScGNDb25uZWN0aW9uKGNvbW1hbmQ6IFJwY0NvbW1hbmQpOiBUW1wiQ29ubmVjdGlvblwiXTtcblxuICAgIC8vIFRPRE86IHJlbmFtZTpcbiAgICAvLyAgLSAqUnBjKiB0byAqKlxuICAgIGNyZWF0ZVJwY0NvbW1hbmQodW5yZXNvbHZlZENvbmZpZzogX1JwY1VucmVzb2x2ZWRDb25maWc8VD4pOiBScGNDb21tYW5kO1xuXG4gICAgcmVzb2x2ZVJwY0NvbmZpZyhcbiAgICAgIHVucmVzb2x2ZWRDb25maWc6IF9ScGNVbnJlc29sdmVkQ29uZmlnPFQ+XG4gICAgKTogUHJvbWlzZTxfUnBjUmVzb2x2ZWRDb25maWc8VD4+O1xuXG4gICAgcmVzb2x2ZVJwY0hhbmRsZXIoXG4gICAgICBjb25maWc6IF9ScGNVbnJlc29sdmVkQ29uZmlnPFQ+XG4gICAgKTogUHJvbWlzZTxfUnBjUmVzb2x2ZWRIYW5kbGVyPFQ+PjtcblxuICAgIGNyZWF0ZVJwY0hhbmRsZXIoXG4gICAgICBjb25maWc6IF9ScGNSZXNvbHZlZENvbmZpZzxUPlxuICAgICk6IFByb21pc2U8X1JwY1Jlc29sdmVkSGFuZGxlcjxUPj47XG4gIH07XG5cbmNvbnN0IHJwY1RvU2VydmljZUhhbmRsZXIgPSBuZXcgV2Vha01hcDxhbnksIEZuPigpO1xuXG5leHBvcnQgZnVuY3Rpb24gUnBjPFIgZXh0ZW5kcyBCYXNlZFJwYywgVCBleHRlbmRzIFRScGMgPSBScGNUeXBlPFI+PihcbiAgb3B0aW9uczogUnBjT3B0aW9uczxUPlxuKTogUnBjPFQ+IHtcbiAgbGV0IHNlcnZpY2U7XG4gIGNvbnN0IHJwYzogUnBjPFQ+ID0gT2JqZWN0LnNldFByb3RvdHlwZU9mKFxuICAgIG1lcmdlRGVzY3JpcHRvcnMob3B0aW9uc1tcInByb3BzXCJdIHx8IHt9LCB7XG4gICAgICBvcHRpb25zLFxuXG4gICAgICBnZXQgc2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICB9LFxuICAgIH0pLFxuICAgIEFueVJwY1xuICApO1xuICBzZXJ2aWNlID0gcnBjLmNyZWF0ZVJwY0Nvbm5lY3Rpb24ocGF5bG9hZCA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IHJwY1RvU2VydmljZUhhbmRsZXIuZ2V0KHJwYyk7XG4gICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICB0aHJvdyBuZXcgUnBjRXJyb3IoYE5vIGhhbmRsZSBmb3Igc2VydmljZS5gKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZXIocGF5bG9hZCk7XG4gIH0pO1xuICByZXR1cm4gcnBjO1xufVxuXG5leHBvcnQgdHlwZSBScGNSZXNvbHZlZENvbmZpZzxUIGV4dGVuZHMgQmFzZWRScGM+ID0gX1JwY1Jlc29sdmVkQ29uZmlnPFxuICBScGNUeXBlPFQ+XG4+O1xuXG5leHBvcnQgdHlwZSBfUnBjUmVzb2x2ZWRDb25maWc8XG4gIFQgZXh0ZW5kcyBUUnBjLFxuICBDb25maWcgPSBOb25OdWxsYWJsZTxUW1wiQ29uZmlnXCJdPlxuPiA9IENvbmZpZyBleHRlbmRzIEZuXG4gID8gSXNHZW5lcmljQ29uZmlnPENvbmZpZz4gZXh0ZW5kcyB0cnVlXG4gICAgPyBBd2FpdGVkPFJldHVyblR5cGU8Q29uZmlnPj5cbiAgICA6IENvbmZpZ1xuICA6IENvbmZpZztcblxuZXhwb3J0IHR5cGUgUnBjUmVzb2x2ZWRIYW5kbGVyPFQgZXh0ZW5kcyBCYXNlZFJwYz4gPSBfUnBjUmVzb2x2ZWRIYW5kbGVyPFxuICBScGNUeXBlPFQ+XG4+O1xuXG50eXBlIF9ScGNSZXNvbHZlZEhhbmRsZXI8VCBleHRlbmRzIFRScGM+ID0gVFtcIkhhbmRsZXJcIl0gJiB7XG4gIGNvbmZpZzogX1JwY1Jlc29sdmVkQ29uZmlnPFQ+O1xuICBycGM6IFJwYzxUPjtcbiAgaGFuZGxlKHBheWxvYWQ6IGFueSk6IEF3YWl0YWJsZTxhbnk+O1xufTtcblxuZXhwb3J0IHR5cGUgSVJwY0hhbmRsZXI8VCBleHRlbmRzIEJhc2VkUnBjPiA9IF9ScGNSZXNvbHZlZEhhbmRsZXI8UnBjVHlwZTxUPj47XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFJwY0hhbmRsZXI8XG4gIFIgZXh0ZW5kcyBBbnlScGMsXG4gIFQgZXh0ZW5kcyBUUnBjID0gUnBjVHlwZTxSPlxuPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBycGM6IFIsIHB1YmxpYyBjb25maWc6IF9ScGNSZXNvbHZlZENvbmZpZzxUPikge31cblxuICBhYnN0cmFjdCBoYW5kbGUocGF5bG9hZDogYW55KTogUHJvbWlzZTxhbnk+O1xufVxuXG5leHBvcnQgdHlwZSBScGNIYW5kbGVyQ2xhc3M8VCBleHRlbmRzIEFueVJwYywgUCA9IHt9PiA9IG5ldyAoXG4gIHJwYzogVCxcbiAgY29uZmlnOiBfUnBjUmVzb2x2ZWRDb25maWc8UnBjVHlwZTxUPj5cbikgPT4gX1JwY1Jlc29sdmVkSGFuZGxlcjxScGNUeXBlPFQ+PiAmIFA7XG5cbmV4cG9ydCB0eXBlIFJwY0lzR2VuZXJpY0NvbmZpZ09wdGlvbjxUIGV4dGVuZHMgUGljazxUUnBjLCBcIkNvbmZpZ1wiPj4gPVxuICB8IElzR2VuZXJpY0NvbmZpZzxUW1wiQ29uZmlnXCJdPlxuICB8IElmPE5vdDxJczxUW1wiQ29uZmlnXCJdLCBGbj4+LCB1bmRlZmluZWQ+O1xuXG5leHBvcnQgdHlwZSBScGNQcm9wc09wdGlvbjxUIGV4dGVuZHMgUGljazxUUnBjLCBcIlByb3BzXCI+PiA9XG4gIHwgVFtcIlByb3BzXCJdXG4gIHwgSWY8SXNFbXB0eU9iamVjdDxUW1wiUHJvcHNcIl0+LCB1bmRlZmluZWQ+O1xuXG5leHBvcnQgdHlwZSBScGNPcHRpb25zPFxuICBUIGV4dGVuZHMgVFJwYyxcbiAgQ29uZmlnSXNGbiBleHRlbmRzIGJvb2xlYW4gPSBJczxUW1wiQ29uZmlnXCJdLCBGbj4sXG4gIENvbmZpZ0lzR2VuZXJpY0NvbmZpZyBleHRlbmRzIGJvb2xlYW4gPSBJc0dlbmVyaWNDb25maWc8VFtcIkNvbmZpZ1wiXT5cbj4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAge1xuICAgIC8vIFRPRE86IGNvbmZpZ1R5cGU6ICdmdW5jdGlvbicgfCAnZ2VuZXJpYycgfCAnb2JqZWN0J1xuICAgIGlzR2VuZXJpY0NvbmZpZzogUnBjSXNHZW5lcmljQ29uZmlnT3B0aW9uPFQ+O1xuXG4gICAgaXNDb25maWdGbjogYm9vbGVhbiB8IElmPE5vdDxJczxUW1wiQ29uZmlnXCJdLCBGbj4+LCB1bmRlZmluZWQ+O1xuXG4gICAgcHJvcHM6IFJwY1Byb3BzT3B0aW9uPFQ+O1xuICB9LFxuICB7XG4gICAgY29ubmVjdCh0aGlzOiBScGM8VD4sIGNvbW1hbmQ6IFJwY0NvbW1hbmQpOiBUW1wiQ29ubmVjdGlvblwiXTtcblxuICAgIGhhbmRsZXI6IFJwY0hhbmRsZXJDbGFzczxScGM8VD4+O1xuICB9XG4+O1xuXG5jb25zdCBycGNUb1VuZGVmaW5lZENvbmZpZyA9IG5ldyBXZWFrTWFwPEFueVJwYywgYW55PigpO1xuY29uc3QgcnBjVG9Db25maWdUb0NvbnRleHQgPSBuZXcgV2Vha01hcDxcbiAgQW55UnBjLFxuICBXZWFrTWFwPGFueSwgUHJvbWlzZTxfUnBjUmVzb2x2ZWRIYW5kbGVyPFRScGM+Pj5cbj4oKTtcblxubGV0IGlzU2VydmljZUhhbmRsZXIgPSBmYWxzZTtcblxuZXhwb3J0IGNvbnN0IEFueVJwYzogQW55UnBjID0ge1xuICBnZXQgb3B0aW9ucygpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9LFxuICBnZXQgc2VydmljZSgpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9LFxuICBjcmVhdGVScGNDb25uZWN0aW9uKGhhbmRsZXIpIHtcbiAgICBpZiAoaXNTZXJ2aWNlSGFuZGxlcikge1xuICAgICAgcnBjVG9TZXJ2aWNlSGFuZGxlci5zZXQodGhpcywgaGFuZGxlcik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY29ubmVjdC5jYWxsKHRoaXMsIGhhbmRsZXIpO1xuICB9LFxuICBhc3luYyBjcmVhdGVScGNIYW5kbGVyKGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgdGhpcy5vcHRpb25zLmhhbmRsZXIodGhpcywgY29uZmlnKTtcbiAgfSxcblxuICBhc3luYyByZXNvbHZlUnBjSGFuZGxlcih1bnJlc29sdmVkQ29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUnBjSGFuZGxlcihhd2FpdCB0aGlzLnJlc29sdmVScGNDb25maWcodW5yZXNvbHZlZENvbmZpZykpO1xuICB9LFxuXG4gIGFzeW5jIHJlc29sdmVScGNDb25maWcoY29uZmlnKTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgICBpZiAoY29uZmlnICYmIHR5cGVvZiBjb25maWcgPT09IFwib2JqZWN0XCIgJiYgXCIkY29udGV4dFwiIGluIGNvbmZpZykge1xuICAgICAgY29uZmlnID0gYXdhaXQgQ29uZmlnRmFjdG9yeShjb25maWcuJGNvbnRleHQsIHRoaXMpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGNvbmZpZyAmJlxuICAgICAgQXJyYXkuaXNBcnJheShjb25maWcpICYmXG4gICAgICBjb25maWcubGVuZ3RoID09PSAxICYmXG4gICAgICB0eXBlb2YgY29uZmlnWzBdID09PSBcImZ1bmN0aW9uXCJcbiAgICApIHtcbiAgICAgIGNvbmZpZyA9IGF3YWl0IENvbmZpZ0ZhY3RvcnkoY29uZmlnWzBdLCB0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmlzR2VuZXJpY0NvbmZpZykge1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBgZXhwZWN0ZWQgdG8gZ2VuZXJpYyBjb25maWcsIGdvdDogJHtpbnNwZWN0KGNvbmZpZyl9YFxuICAgICAgICApO1xuICAgICAgY29uZmlnID0gYXdhaXQgR2VuZXJpY0NvbmZpZyhjb25maWcgYXMgR2VuZXJpY0NvbmZpZyk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5vcHRpb25zLmlzQ29uZmlnRm4gJiYgdHlwZW9mIGNvbmZpZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb25maWcgPSBhd2FpdCBDb25maWdGYWN0b3J5KGNvbmZpZyBhcyBDb25maWdGYWN0b3J5PGFueT4pO1xuICAgIH1cblxuICAgIHJldHVybiBjb25maWcgfHwge307XG4gIH0sXG4gIGNyZWF0ZVJwY0NvbW1hbmQodW5yZXNvbHZlZENvbmZpZykge1xuICAgIGlmICghdW5yZXNvbHZlZENvbmZpZykge1xuICAgICAgdW5yZXNvbHZlZENvbmZpZyA9IHRvdWNoTWFwKHJwY1RvVW5kZWZpbmVkQ29uZmlnLCB0aGlzLCBPYmplY3QpO1xuICAgIH1cbiAgICBsZXQgY29uZmlnO1xuICAgIGxldCBoYXNDb25maWcgPSBmYWxzZTtcbiAgICByZXR1cm4gYXN5bmMgcGF5bG9hZCA9PiB7XG4gICAgICBpZiAoIWhhc0NvbmZpZykge1xuICAgICAgICBjb25maWcgPSBhd2FpdCB0aGlzLnJlc29sdmVScGNDb25maWcodW5yZXNvbHZlZENvbmZpZyk7XG4gICAgICAgIGhhc0NvbmZpZyA9IHRydWU7XG4gICAgICB9XG4gICAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgdG91Y2hNYXAoXG4gICAgICAgIHRvdWNoTWFwKHJwY1RvQ29uZmlnVG9Db250ZXh0LCB0aGlzLCAoKSA9PiBuZXcgV2Vha01hcCgpKSxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICAoKSA9PiB0aGlzLmNyZWF0ZVJwY0hhbmRsZXIoY29uZmlnKVxuICAgICAgKTtcbiAgICAgIHJldHVybiBjb250ZXh0LmhhbmRsZShwYXlsb2FkKTtcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IHR5cGUgQmFzZWRScGM8VCBleHRlbmRzIFRScGMgPSBUUnBjPiA9IFdpdGhNZXRhVHlwZTx7IFRScGM6IFQgfT47XG5cbmV4cG9ydCB0eXBlIFJwY1R5cGU8VCBleHRlbmRzIEJhc2VkUnBjPiA9IE1ldGFUeXBlPFQ+W1wiVFJwY1wiXTtcblxuZXhwb3J0IHR5cGUgUnBjSG9vazxSIGV4dGVuZHMgQmFzZWRScGMsIFQgZXh0ZW5kcyBQYXJ0aWFsPFRScGM+PiA9IFJwYzxcbiAgRXh0cmFjdDxPdmVycmlkZTxScGNUeXBlPFI+LCBUPiwgVFJwYz5cbj47XG5cbnR5cGUgX1JwY1VucmVzb2x2ZWRDb25maWc8VCBleHRlbmRzIFRScGM+ID1cbiAgfCBUW1wiQ29uZmlnXCJdXG4gIHwgSWY8Tm90PElzPFRbXCJDb25maWdcIl0sIEZuPj4sIENvbmZpZ0ZhY3Rvcnk8VFtcIkNvbmZpZ1wiXT4+XG4gIC8vIFRPRE86ICRjb25maWdDb250ZXh0LCAkZ2VuZXJpY0NvbmZpZ0NvbnRleHRcbiAgfCB7XG4gICAgICAkY29udGV4dDogQ29uZmlnRmFjdG9yeTxUW1wiQ29uZmlnXCJdLCBbUnBjPFQ+XT47XG4gICAgfTtcblxuZXhwb3J0IHR5cGUgUnBjVW5yZXNvbHZlZENvbmZpZzxUIGV4dGVuZHMgQmFzZWRScGM+ID0gX1JwY1VucmVzb2x2ZWRDb25maWc8XG4gIFJwY1R5cGU8VD5cbj47XG5cbmV4cG9ydCB0eXBlIFJwY0NvbmZpZzxUIGV4dGVuZHMgQmFzZWRScGM+ID0gUnBjVHlwZTxUPltcIkNvbmZpZ1wiXTtcblxuZXhwb3J0IHR5cGUgUnBjVW5kZWZpbmVkQ29uZmlnPFQgZXh0ZW5kcyBCYXNlZFJwYz4gPSBJZjxcbiAgSXNVbmRlZmluZWQ8UnBjVW5yZXNvbHZlZENvbmZpZzxUPj4sXG4gIHVuZGVmaW5lZFxuPjtcblxuZXhwb3J0IGNsYXNzIFJwY0Vycm9yIGV4dGVuZHMgRXJyb3Ige31cblxuZXhwb3J0IHR5cGUgUnBjSGFuZGxlcjxUIGV4dGVuZHMgQW55UnBjPiA9IFJwY1R5cGU8VD5bXCJIYW5kbGVyXCJdO1xuZXhwb3J0IHR5cGUgUnBjQ29ubmVjdGlvbjxUIGV4dGVuZHMgQmFzZWRScGM+ID0gX1JwY0Nvbm5lY3Rpb248UnBjVHlwZTxUPj47XG5cbnR5cGUgX1JwY0Nvbm5lY3Rpb248VCBleHRlbmRzIFRScGM+ID0gVFtcIkNvbm5lY3Rpb25cIl0gJiBCYXNlZFJwYzxUPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVJwY1NlcnZpY2U8VCBleHRlbmRzIEFueVJwYz4oXG4gIHJwYzogVCxcbiAgY29tbWFuZDogUnBjQ29tbWFuZFxuKTogUnBjQ29ubmVjdGlvbjxUPiB7XG4gIGlzU2VydmljZUhhbmRsZXIgPSB0cnVlO1xuICBjb25zdCBjb25uZWN0aW9uID0gcnBjLmNyZWF0ZVJwY0Nvbm5lY3Rpb24oY29tbWFuZCk7XG4gIGlzU2VydmljZUhhbmRsZXIgPSBmYWxzZTtcbiAgcmV0dXJuIGNvbm5lY3Rpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmVScGNTZXJ2aWNlPFQgZXh0ZW5kcyBBbnlScGM+KFxuICBycGM6IFQsXG4gIGNvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxUPlxuKTogUnBjQ29ubmVjdGlvbjxUPiB7XG4gIHJldHVybiBoYW5kbGVScGNTZXJ2aWNlKHJwYywgcnBjLmNyZWF0ZVJwY0NvbW1hbmQoY29uZmlnKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBScGNDb25maWc8VCBleHRlbmRzIEFueVJwYz4oXG4gIHJwYzogVCxcbiAgY29uZmlnOiBScGNVbnJlc29sdmVkQ29uZmlnPFQ+XG4pOiBScGNVbnJlc29sdmVkQ29uZmlnPFQ+IHtcbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCB7IEF3YWl0ZWQsIEZuLCBJZiwgTm90LCBQYXJ0aWFsVW5kZWZpbmVkS2V5cyB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgQ29uZmlnRmFjdG9yeSB9IGZyb20gXCIuL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7IEdlbmVyaWNDb25maWcsIElzR2VuZXJpY0NvbmZpZyB9IGZyb20gXCIuL0dlbmVyaWNDb25maWdcIjtcbmltcG9ydCB7IEFueVJwYywgUnBjSG9vaywgUnBjVHlwZSwgUnBjVW5yZXNvbHZlZENvbmZpZywgVFJwYyB9IGZyb20gXCIuL1JwY1wiO1xuXG5leHBvcnQgdHlwZSBScGNDb25maWdIb29rPFxuICBUIGV4dGVuZHMgVENvbmZpZ0hvb2sgJiB7XG4gICAgUHJvcHM/OiBvYmplY3Q7XG4gIH1cbj4gPSBScGNIb29rPFxuICBUW1wiVGFyZ2V0XCJdLFxuICB7XG4gICAgVENvbmZpZ0hvb2s6IFQ7XG4gICAgQ29uZmlnOiBUW1wiQ29uZmlnXCJdO1xuICB9XG4+ICZcbiAgTm9uTnVsbGFibGU8VFtcIlByb3BzXCJdPjtcblxuZXhwb3J0IHR5cGUgVENvbmZpZ0hvb2sgPSB7XG4gIFRhcmdldDogQW55UnBjO1xuICBDb25maWc6IFRScGNbXCJDb25maWdcIl07XG4gIFByb3BzPzogb2JqZWN0O1xufTtcbmV4cG9ydCB0eXBlIEFueVJwY0NvbmZpZ0hvb2sgPSBScGNDb25maWdIb29rPHtcbiAgVGFyZ2V0OiBBbnlScGM7XG4gIENvbmZpZzogVFJwY1tcIkNvbmZpZ1wiXTtcbn0+O1xuXG4vLyBUT0RPOiBfR2VuZXJpY1RvR2VuZXJpY0NvbmZpZ1xuLy8gVE9ETzogX0NvbmZpZ1RvR2VuZXJpY0NvbmZpZ1xuLy8gVE9ETzogX0NvbmZpZ1RvQ29uZmlnXG4vLyBUT0RPOiBfR2VuZXJpY0NvbmZpZ1RvQ29uZmlnXG50eXBlIF9HZW5lcmljQ29uZmlnSGFuZGxlcjxUIGV4dGVuZHMgVENvbmZpZ0hvb2s+ID0gKF86IHtcbiAgY29uZmlnOiBBd2FpdGVkPFJldHVyblR5cGU8RXh0cmFjdDxUW1wiQ29uZmlnXCJdLCBGbj4+PjtcbiAgdGFyZ2V0OiBUW1wiVGFyZ2V0XCJdO1xuICBwcm9wczogVFtcIlByb3BzXCJdO1xufSkgPT4gQ29uZmlnRmFjdG9yeTxScGNVbnJlc29sdmVkQ29uZmlnPFRbXCJUYXJnZXRcIl0+PjtcblxudHlwZSBfQ29uZmlnSGFuZGxlcjxUIGV4dGVuZHMgVENvbmZpZ0hvb2s+ID0gKF86IHtcbiAgY29uZmlnOiBUW1wiQ29uZmlnXCJdO1xuICB0YXJnZXQ6IFRbXCJUYXJnZXRcIl07XG4gIHByb3BzOiBUW1wiUHJvcHNcIl07XG59KSA9PiBDb25maWdGYWN0b3J5PFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIlRhcmdldFwiXT4+O1xuXG5leHBvcnQgdHlwZSBScGNDb25maWdIb29rSGFuZGxlcjxcbiAgUiBleHRlbmRzIEFueVJwY0NvbmZpZ0hvb2ssXG4gIFQgZXh0ZW5kcyBUQ29uZmlnSG9vayA9IFJwY1R5cGU8Uj5bXCJUQ29uZmlnSG9va1wiXVxuPiA9IElzR2VuZXJpY0NvbmZpZzxUW1wiQ29uZmlnXCJdPiBleHRlbmRzIHRydWVcbiAgPyBfR2VuZXJpY0NvbmZpZ0hhbmRsZXI8VD5cbiAgOiBfQ29uZmlnSGFuZGxlcjxUPjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJwY0NvbmZpZ0hvb2s8XG4gIFIgZXh0ZW5kcyBBbnlScGNDb25maWdIb29rLFxuICBUIGV4dGVuZHMgVENvbmZpZ0hvb2sgPSBScGNUeXBlPFI+W1wiVENvbmZpZ0hvb2tcIl1cbj4oXG4gIG9wdGlvbnM6IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICAgIHtcbiAgICAgIGlzR2VuZXJpY0NvbmZpZzpcbiAgICAgICAgfCBJc0dlbmVyaWNDb25maWc8VFtcIkNvbmZpZ1wiXT5cbiAgICAgICAgfCBJZjxOb3Q8SXNHZW5lcmljQ29uZmlnPFRbXCJDb25maWdcIl0+PiwgdW5kZWZpbmVkPjtcblxuICAgICAgcHJvcHM6IFRbXCJQcm9wc1wiXTtcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhcmdldDogVFtcIlRhcmdldFwiXTtcbiAgICAgIGhhbmRsZXI6IFJwY0NvbmZpZ0hvb2tIYW5kbGVyPFI+O1xuICAgIH1cbiAgPlxuKTogUiB7XG4gIGNvbnN0IHsgdGFyZ2V0LCBoYW5kbGVyIH0gPSBvcHRpb25zO1xuICBjb25zdCBpc0dlbmVyaWNDb25maWcgPVxuICAgIFwiaXNHZW5lcmljQ29uZmlnXCIgaW4gb3B0aW9ucyA/IG9wdGlvbnMuaXNHZW5lcmljQ29uZmlnID8/IGZhbHNlIDogZmFsc2U7XG5cbiAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZihcbiAgICB7XG4gICAgICAuLi5vcHRpb25zW1wicHJvcHNcIl0sXG4gICAgICBhc3luYyByZXNvbHZlUnBjQ29uZmlnKHRoaXM6IFRbXCJUYXJnZXRcIl0sIGNvbmZpZykge1xuICAgICAgICBpZiAoaXNHZW5lcmljQ29uZmlnKSB7XG4gICAgICAgICAgY29uZmlnID0gYXdhaXQgR2VuZXJpY0NvbmZpZyhcbiAgICAgICAgICAgIChoYW5kbGVyIGFzIF9HZW5lcmljQ29uZmlnSGFuZGxlcjxUPikoe1xuICAgICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgcHJvcHM6IG9wdGlvbnNbXCJwcm9wc1wiXSxcbiAgICAgICAgICAgIH0pIGFzIEdlbmVyaWNDb25maWdcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbmZpZyA9IGF3YWl0IENvbmZpZ0ZhY3RvcnkoXG4gICAgICAgICAgICAoaGFuZGxlciBhcyBfQ29uZmlnSGFuZGxlcjxUPikoe1xuICAgICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgcHJvcHM6IG9wdGlvbnNbXCJwcm9wc1wiXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnJlc29sdmVScGNDb25maWcuY2FsbCh0aGlzLCBjb25maWcpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHRhcmdldFxuICApO1xufVxuIiwiaW1wb3J0IHtcbiAgT3ZlcnJpZGUsXG4gIFBhcnRpYWxLZXlzLFxuICBVbmRlZmluZWRJZkVtcHR5T2JqZWN0LFxufSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IEFueVJwYywgUnBjLCBScGNDb25maWcsIFJwY1VucmVzb2x2ZWRDb25maWcsIFRScGMgfSBmcm9tIFwiLi9ScGNcIjtcbmltcG9ydCB7IEFueVJwY0NvbmZpZ0hvb2ssIFJwY0NvbmZpZ0hvb2sgfSBmcm9tIFwiLi9ScGNDb25maWdIb29rXCI7XG5cbmV4cG9ydCB0eXBlIEFueVJwY1dpdGhPYmplY3RDb25maWcgPSBScGM8XG4gIE92ZXJyaWRlPFRScGMsIHsgQ29uZmlnOiBvYmplY3QgfCB1bmRlZmluZWQgfT5cbj47XG5cbmV4cG9ydCB0eXBlIFJwY1BhcnRpYWxDb25maWc8XG4gIFQgZXh0ZW5kcyBBbnlScGNXaXRoT2JqZWN0Q29uZmlnLFxuICBLIGV4dGVuZHMga2V5b2YgTm9uTnVsbGFibGU8UnBjQ29uZmlnPFQ+PlxuPiA9IFJwY0NvbmZpZ0hvb2s8e1xuICBUYXJnZXQ6IFQ7XG4gIENvbmZpZzpcbiAgICB8IE5vbk51bGxhYmxlPFJwY0NvbmZpZzxUPj5cbiAgICB8IFVuZGVmaW5lZElmRW1wdHlPYmplY3Q8UGFydGlhbEtleXM8Tm9uTnVsbGFibGU8UnBjQ29uZmlnPFQ+PiwgSz4+O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBScGNQYXJ0aWFsQ29uZmlnPFxuICBUIGV4dGVuZHMgQW55UnBjLFxuICBLIGV4dGVuZHMga2V5b2YgTm9uTnVsbGFibGU8UnBjQ29uZmlnPFQ+PlxuPihcbiAgdGFyZ2V0OiBULFxuICBkZWZhdWx0Q29uZmlnOiBQaWNrPE5vbk51bGxhYmxlPFJwY0NvbmZpZzxUPj4sIEs+XG4pOiBScGNQYXJ0aWFsQ29uZmlnPFQsIEs+IHtcbiAgcmV0dXJuIDxhbnk+UnBjQ29uZmlnSG9vazxBbnlScGNDb25maWdIb29rPih7XG4gICAgaXNHZW5lcmljQ29uZmlnOiBmYWxzZSxcbiAgICB0YXJnZXQsXG4gICAgaGFuZGxlcjogKHsgY29uZmlnIH0pID0+ICQgPT4gJCh7IC4uLmRlZmF1bHRDb25maWcsIC4uLmNvbmZpZyB9KSxcbiAgfSk7XG59XG4iLCJpbXBvcnQge1xuICBBd2FpdGFibGUsXG4gIElmLFxuICBJc0VtcHR5T2JqZWN0LFxuICBPbWl0S2V5cyxcbiAgT3ZlcnJpZGUsXG4gIFBhcnRpYWxVbmRlZmluZWRLZXlzLFxufSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IERhdGFSb3cgfSBmcm9tIFwiLi4vLi4vdHlwZWRhdGEvRGF0YVJvd1wiO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gXCIuLi8uLi90eXBlZGF0YS9EYXRhU291cmNlXCI7XG5pbXBvcnQgeyBDb25maWdGYWN0b3J5IH0gZnJvbSBcIi4uL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7IEdlbmVyaWNDb25maWcgfSBmcm9tIFwiLi4vR2VuZXJpY0NvbmZpZ1wiO1xuXG5pbXBvcnQgeyBBbnlJbnB1dCwgSW5wdXRWYWx1ZSB9IGZyb20gXCIuLi9pbnB1dC9JbnB1dFwiO1xuaW1wb3J0IHsgTm9ScGMgfSBmcm9tIFwiLi4vTm9ScGNcIjtcbmltcG9ydCB7IEFueVJwYywgUnBjQ29uZmlnLCBScGNUeXBlLCBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgUnBjRm4gfSBmcm9tIFwiLi4vcnBjLWZuL1JwY0ZuXCI7XG5pbXBvcnQgeyBScGNNYXAgfSBmcm9tIFwiLi4vcnBjLW1hcC9ScGNNYXBcIjtcbmltcG9ydCB7IFJwY1BhcmFtZXRlciB9IGZyb20gXCIuLi9ycGMtcGFyYW1ldGVyL1JwY1BhcmFtZXRlclwiO1xuaW1wb3J0IHsgUnBjQ29uZmlnSG9vayB9IGZyb20gXCIuLi9ScGNDb25maWdIb29rXCI7XG5pbXBvcnQgeyBEYXRhVGFibGUsIERhdGFUYWJsZU9wdGlvbnMgfSBmcm9tIFwiLi4vd2lkZ2V0L2RhdGEtdGFibGUvRGF0YVRhYmxlXCI7XG5pbXBvcnQgeyBGb3JtLCBGb3JtVHlwZSB9IGZyb20gXCIuLi93aWRnZXQvZm9ybS9Gb3JtXCI7XG5pbXBvcnQgeyBJbmxpbmVXaWRnZXQgfSBmcm9tIFwiLi4vd2lkZ2V0L2lubGluZS13aWRnZXQvSW5saW5lV2lkZ2V0XCI7XG5pbXBvcnQgeyBBbnlSb3dUeXBlLCBSb3cgfSBmcm9tIFwiLi4vd2lkZ2V0L1Jvd1wiO1xuaW1wb3J0IHsgVGFic1dpZGdldCB9IGZyb20gXCIuLi93aWRnZXQvdGFicy13aWRnZXQvVGFic1dpZGdldFwiO1xuaW1wb3J0IHsgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQgeyBBbnlXaWRnZXRSZWNvcmQgfSBmcm9tIFwiLi4vd2lkZ2V0L3dpZGdldC1tYXAvV2lkZ2V0TWFwXCI7XG5pbXBvcnQgeyBEYXRhTWFuYWdlckhhbmRsZXIgfSBmcm9tIFwiLi9EYXRhTWFuYWdlckhhbmRsZXJcIjtcblxuLy8gRnVsbDxUeXBlPlN0YWNrXG5leHBvcnQgdHlwZSBURGF0YU1hbmFnZXIgPSB7XG4gIERhdGE6IGFueTtcblxuICBUYWJsZVJvd0NvbnRyb2xsZXI6IEFueVJwYztcblxuICBUYWJsZVJvdzogYW55O1xuXG4gIEVkaXRJbnB1dDogQW55SW5wdXQ7XG5cbiAgRWRpdEVycm9yOiBhbnk7XG5cbiAgQWRkSW5wdXQ6IEFueUlucHV0O1xuXG4gIEFkZEVycm9yOiBhbnk7XG5cbiAgRWRpdFRhYnM6IEFueVdpZGdldFJlY29yZDtcbn07XG5cbnR5cGUgX1R5cGVzPFQgZXh0ZW5kcyBURGF0YU1hbmFnZXI+ID0ge1xuICBUYWJsZTogRGF0YVRhYmxlPHtcbiAgICBSb3c6IFRbXCJUYWJsZVJvd1wiXTtcbiAgICBSb3dDb250cm9sbGVyOiBUW1wiVGFibGVSb3dDb250cm9sbGVyXCJdO1xuICAgIERhdGE6IFRbXCJEYXRhXCJdO1xuICB9PjtcblxuICBUYWJsZVR5cGVzOiBXaWRnZXRUeXBlPF9UeXBlczxUPltcIlRhYmxlXCJdPltcIlR5cGVzXCJdO1xuXG4gIFRhYmxlQ29uZmlnOlxuICAgIHwgUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gICAgICAgIF9UeXBlczxUPltcIlRhYmxlVHlwZXNcIl1bXCJPcHRpb25hbENvbmZpZ1wiXSAmXG4gICAgICAgICAgT21pdEtleXM8X1R5cGVzPFQ+W1wiVGFibGVUeXBlc1wiXVtcIlJlcXVpcmVkQ29uZmlnXCJdLCBcInNvdXJjZVwiPlxuICAgICAgPlxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIEVkaXRGb3JtOiBGb3JtPHtcbiAgICBWYWx1ZTogbnVsbDtcbiAgICBFcnJvcjogVFtcIkVkaXRFcnJvclwiXTtcbiAgICBJbnB1dDogVFtcIkVkaXRJbnB1dFwiXTtcbiAgfT47XG5cbiAgQWRkRm9ybTogRm9ybTx7XG4gICAgVmFsdWU6IHN0cmluZztcbiAgICBFcnJvcjogVFtcIkFkZEVycm9yXCJdO1xuICAgIElucHV0OiBUW1wiQWRkSW5wdXRcIl07XG4gIH0+O1xuXG4gIEVkaXRUYWJzV2l0aEZvcm06IE92ZXJyaWRlPFxuICAgIFRbXCJFZGl0VGFic1wiXSxcbiAgICB7XG4gICAgICBmb3JtOiBfVHlwZXM8VD5bXCJFZGl0Rm9ybVwiXTtcbiAgICB9XG4gID47XG5cbiAgRWRpdFRhYnNXaWRnZXQ6IFRhYnNXaWRnZXQ8X1R5cGVzPFQ+W1wiRWRpdFRhYnNXaXRoRm9ybVwiXT47XG59O1xuZXhwb3J0IHR5cGUgRGF0YU1hbmFnZXJDb25maWc8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAge1xuICAgIGdldFRhYnNDb25maWc6XG4gICAgICB8IENvbmZpZ0ZhY3Rvcnk8XG4gICAgICAgICAgUnBjVW5yZXNvbHZlZENvbmZpZzxfVHlwZXM8VD5bXCJFZGl0VGFic1dpZGdldFwiXT4sXG4gICAgICAgICAgW0RhdGFSb3c8VFtcIkRhdGFcIl0+XVxuICAgICAgICA+XG4gICAgICB8IElmPElzRW1wdHlPYmplY3Q8VFtcIkVkaXRUYWJzXCJdPiwgdW5kZWZpbmVkPjtcblxuICAgIGFkZElucHV0Q29uZmlnOiBScGNVbnJlc29sdmVkQ29uZmlnPFRbXCJBZGRJbnB1dFwiXT47XG5cbiAgICBlZGl0SW5wdXRDb25maWc6IFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIkVkaXRJbnB1dFwiXT47XG4gIH0sXG4gIHtcbiAgICBnZXRWYWx1ZUZyb21EYXRhUm93OiAoXG4gICAgICByb3c6IERhdGFSb3c8VFtcIkRhdGFcIl0+XG4gICAgKSA9PiBJbnB1dFZhbHVlPEZvcm1UeXBlPF9UeXBlczxUPltcIkVkaXRGb3JtXCJdPltcIklucHV0XCJdPjtcblxuICAgIHNvdXJjZTogRGF0YVNvdXJjZTxUW1wiRGF0YVwiXT47XG5cbiAgICBnZXRUaXRsZTogKHJvdzogRGF0YVJvdzxUW1wiRGF0YVwiXT4pID0+IHN0cmluZztcblxuICAgIHRhYmxlQ29uZmlnOiBfVHlwZXM8VD5bXCJUYWJsZUNvbmZpZ1wiXTtcblxuICAgIGFkZFN1Ym1pdDogUnBjQ29uZmlnPF9UeXBlczxUPltcIkFkZEZvcm1cIl0+W1wic3VibWl0XCJdO1xuXG4gICAgZWRpdFN1Ym1pdDogKFxuICAgICAgcm93OiBEYXRhUm93PFRbXCJEYXRhXCJdPixcbiAgICAgIHZhbHVlOiBJbnB1dFZhbHVlPEZvcm1UeXBlPF9UeXBlczxUPltcIkVkaXRGb3JtXCJdPltcIklucHV0XCJdPlxuICAgICkgPT4gQXdhaXRhYmxlO1xuICB9XG4+O1xuXG5leHBvcnQgdHlwZSBBbnlEYXRhTWFuYWdlciA9IERhdGFNYW5hZ2VyPFREYXRhTWFuYWdlcj47XG5cbmV4cG9ydCB0eXBlIERhdGFNYW5hZ2VyVHlwZXM8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4gPSBfVHlwZXM8VD47XG5cbmV4cG9ydCB0eXBlIERhdGFNYW5hZ2VyVHlwZTxUIGV4dGVuZHMgQW55RGF0YU1hbmFnZXI+ID0gUnBjVHlwZTxcbiAgVFxuPltcIlRDb25maWdIb29rXCJdW1wiVERhdGFNYW5hZ2VyXCJdO1xuZXhwb3J0IHR5cGUgRGF0YU1hbmFnZXI8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4gPSBScGNDb25maWdIb29rPHtcbiAgVERhdGFNYW5hZ2VyOiBUO1xuICBQcm9wczoge1xuICAgIGVkaXRJbnB1dDogQW55SW5wdXQ7XG4gICAgZWRpdFRhYnM6IEFueVdpZGdldFJlY29yZDtcbiAgfTtcbiAgVGFyZ2V0OiBScGNNYXA8e1xuICAgIGRlbGV0ZTogUnBjRm48KGtleTogc3RyaW5nKSA9PiB2b2lkPjtcblxuICAgIHRhYmxlOiBfVHlwZXM8VD5bXCJUYWJsZVwiXTtcblxuICAgIGFkZDogX1R5cGVzPFQ+W1wiQWRkRm9ybVwiXTtcblxuICAgIGVkaXQ6IFJwY1BhcmFtZXRlcjx7XG4gICAgICBEYXRhOiBzdHJpbmc7XG4gICAgICBUYXJnZXQ6IElubGluZVdpZGdldDx7XG4gICAgICAgIFRhcmdldDogX1R5cGVzPFQ+W1wiRWRpdFRhYnNXaWRnZXRcIl07XG4gICAgICAgIENvbnRyb2xsZXI6IE5vUnBjO1xuICAgICAgICBFbGVtZW50OiB7IHRpdGxlOiBzdHJpbmcgfTtcbiAgICAgIH0+O1xuICAgIH0+O1xuICB9PjtcbiAgQ29uZmlnOiBHZW5lcmljQ29uZmlnPFxuICAgIDxEYXRhPihcbiAgICAgIGNvbmZpZzogRGF0YU1hbmFnZXJDb25maWc8T3ZlcnJpZGU8VCwgeyBEYXRhOiBEYXRhIH0+PlxuICAgICkgPT4gRGF0YU1hbmFnZXJDb25maWc8VD5cbiAgPjtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gRGF0YU1hbmFnZXI8XG4gIFRhYmxlUm93VHlwZSBleHRlbmRzIEFueVJvd1R5cGUsXG4gIEFkZEVycm9yLFxuICBFZGl0RXJyb3IsXG4gIEFkZElucHV0IGV4dGVuZHMgQW55SW5wdXQsXG4gIEVkaXRJbnB1dCBleHRlbmRzIEFueUlucHV0ID0gQWRkSW5wdXQsXG4gIFRhYmxlUm93Q29udHJvbGxlciBleHRlbmRzIEFueVJwYyA9IE5vUnBjLFxuICBFZGl0VGFicyBleHRlbmRzIEFueVdpZGdldFJlY29yZCA9IHt9XG4+KG9wdGlvbnM6IHtcbiAgdGFibGVSb3dUeXBlOiBUYWJsZVJvd1R5cGU7XG4gIHRhYmxlT3B0aW9ucz86IERhdGFUYWJsZU9wdGlvbnM8VGFibGVSb3dDb250cm9sbGVyPjtcbiAgYWRkRXJyb3I/OiBBZGRFcnJvcjtcbiAgZWRpdEVycm9yPzogRWRpdEVycm9yO1xuICBhZGRJbnB1dDogQWRkSW5wdXQ7XG4gIGVkaXRJbnB1dD86IEVkaXRJbnB1dDtcbiAgZWRpdFRhYnM/OiBFZGl0VGFicztcbn0pOiBEYXRhTWFuYWdlcjx7XG4gIFRhYmxlUm93Q29udHJvbGxlcjogVGFibGVSb3dDb250cm9sbGVyO1xuICBUYWJsZVJvdzogUm93PFRhYmxlUm93VHlwZT47XG4gIERhdGE6IGFueTtcbiAgQWRkRXJyb3I6IEFkZEVycm9yO1xuICBBZGRJbnB1dDogQWRkSW5wdXQ7XG4gIEVkaXRFcnJvcjogRWRpdEVycm9yO1xuICBFZGl0SW5wdXQ6IEVkaXRJbnB1dDtcbiAgRWRpdFRhYnM6IEVkaXRUYWJzO1xufT4ge1xuICBjb25zdCBlZGl0SW5wdXQ6IEFueUlucHV0ID0gb3B0aW9ucy5lZGl0SW5wdXQgfHwgb3B0aW9ucy5hZGRJbnB1dDtcbiAgY29uc3QgZWRpdFRhYnMgPSB7XG4gICAgZm9ybTogRm9ybSh7IGlucHV0OiBlZGl0SW5wdXQgfSksXG4gICAgLi4uKG9wdGlvbnMuZWRpdFRhYnMgYXMge30pLFxuICB9IGFzIEFueVdpZGdldFJlY29yZDtcbiAgcmV0dXJuIDxhbnk+UnBjQ29uZmlnSG9vazxBbnlEYXRhTWFuYWdlcj4oe1xuICAgIHByb3BzOiB7XG4gICAgICBlZGl0SW5wdXQsXG4gICAgICBlZGl0VGFicyxcbiAgICB9LFxuICAgIGlzR2VuZXJpY0NvbmZpZzogdHJ1ZSxcbiAgICBoYW5kbGVyOiBEYXRhTWFuYWdlckhhbmRsZXIsXG4gICAgdGFyZ2V0OiBScGNNYXAoe1xuICAgICAgZGVsZXRlOiBScGNGbjwoa2V5OiBzdHJpbmcpID0+IHZvaWQ+KCksXG5cbiAgICAgIHRhYmxlOiBEYXRhVGFibGUob3B0aW9ucy50YWJsZVJvd1R5cGUsIG9wdGlvbnMudGFibGVPcHRpb25zKSxcblxuICAgICAgYWRkOiBGb3JtKHtcbiAgICAgICAgaW5wdXQ6IG9wdGlvbnMuYWRkSW5wdXQsXG4gICAgICB9KSxcblxuICAgICAgZWRpdDogUnBjUGFyYW1ldGVyKFxuICAgICAgICBTdHJpbmcsXG4gICAgICAgIElubGluZVdpZGdldCh7XG4gICAgICAgICAgdGFyZ2V0OiBUYWJzV2lkZ2V0KGVkaXRUYWJzKSxcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgfSksXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgUnBjQ29uZmlnSG9va0hhbmRsZXIgfSBmcm9tIFwiLi4vUnBjQ29uZmlnSG9va1wiO1xuaW1wb3J0IHsgQW55RGF0YU1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhTWFuYWdlclwiO1xuXG5leHBvcnQgY29uc3QgRGF0YU1hbmFnZXJIYW5kbGVyOiBScGNDb25maWdIb29rSGFuZGxlcjxBbnlEYXRhTWFuYWdlcj4gPSAoe1xuICBjb25maWcsXG4gIHByb3BzOiB7IGVkaXRJbnB1dCB9LFxufSkgPT4gJCA9PiB7XG4gIHJldHVybiAkKHtcbiAgICBhc3luYyBkZWxldGUoa2V5KSB7XG4gICAgICBhd2FpdCBjb25maWcuc291cmNlLmRlbGV0ZShrZXkpO1xuICAgIH0sXG4gICAgdGFibGU6ICQgPT5cbiAgICAgICQoe1xuICAgICAgICAuLi5jb25maWcudGFibGVDb25maWcsXG4gICAgICAgIHNvdXJjZTogY29uZmlnLnNvdXJjZSxcbiAgICAgIH0pLFxuICAgIGFkZDoge1xuICAgICAgaW5wdXRDb25maWc6IGNvbmZpZy5hZGRJbnB1dENvbmZpZyxcbiAgICAgIHN1Ym1pdDogdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gY29uZmlnLmFkZFN1Ym1pdCh2YWx1ZSk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgZWRpdDogYXN5bmMgKCQsIGtleSkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0gYXdhaXQgY29uZmlnLnNvdXJjZS5nZXRPckZhaWwoa2V5KTtcbiAgICAgIHJldHVybiAkKHtcbiAgICAgICAgZ2V0RWxlbWVudCgpIHtcbiAgICAgICAgICByZXR1cm4geyB0aXRsZTogY29uZmlnLmdldFRpdGxlKHJvdykgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdGFyZ2V0Q29uZmlnOiB7XG4gICAgICAgICAgZm9ybTogeyBpbnB1dENvbmZpZzogY29uZmlnLmVkaXRJbnB1dENvbmZpZyB9LFxuICAgICAgICAgIHN1Ym1pdCh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5lZGl0U3VibWl0KHJvdywgdmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7XG4gIFJvdXRlcixcbiAgUm91dGVyVHlwZSxcbiAgUm91dGVyV2l0aENoaWxkcmVuLFxuICBSb3V0ZXJXaXRoUGFyYW1zLFxufSBmcm9tIFwiLi4vLi4vdHlwZXJvdXRlcjIvUm91dGVyXCI7XG5pbXBvcnQge1xuICBBbnlEYXRhTWFuYWdlcixcbiAgRGF0YU1hbmFnZXJUeXBlLFxuICBEYXRhTWFuYWdlclR5cGVzLFxuICBURGF0YU1hbmFnZXIsXG59IGZyb20gXCIuL0RhdGFNYW5hZ2VyXCI7XG5cbmV4cG9ydCB0eXBlIEFueURhdGFNYW5hZ2VyUm91dGVyID0gRGF0YU1hbmFnZXJSb3V0ZXI8VERhdGFNYW5hZ2VyPjtcblxuZXhwb3J0IHR5cGUgRGF0YU1hbmFnZXJSb3V0ZXI8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4gPSBSb3V0ZXJXaXRoQ2hpbGRyZW48XG4gIHtcbiAgICBhZGQ6IFJvdXRlcjtcbiAgICBlZGl0OiBSb3V0ZXJXaXRoUGFyYW1zPFxuICAgICAgXCJpZFwiLFxuICAgICAgUmVjb3JkPGtleW9mIERhdGFNYW5hZ2VyVHlwZXM8VD5bXCJFZGl0VGFic1dpdGhGb3JtXCJdLCBSb3V0ZXI+XG4gICAgPjtcbiAgfSxcbiAgeyBURGF0YU1hbmFnZXI6IFQgfVxuPjtcblxuZXhwb3J0IGZ1bmN0aW9uIERhdGFNYW5hZ2VyUm91dGVyPFQgZXh0ZW5kcyBBbnlEYXRhTWFuYWdlcj4oXG4gIGRtOiBUXG4pOiBEYXRhTWFuYWdlclJvdXRlcjxEYXRhTWFuYWdlclR5cGU8VD4+IHtcbiAgY29uc3QgciA9IFJvdXRlcih7XG4gICAgYWRkOiBSb3V0ZXIoKSxcbiAgICBlZGl0OiBSb3V0ZXIoW1wiaWRcIl0sIHtcbiAgICAgIC4uLihtYXBPYmplY3QoZG0uZWRpdFRhYnMsICgpID0+IFJvdXRlcigpKSBhcyBSZWNvcmQ8XG4gICAgICAgIGtleW9mIERhdGFNYW5hZ2VyVHlwZTxUPltcIkVkaXRUYWJzXCJdLFxuICAgICAgICBSb3V0ZXJcbiAgICAgID4pLFxuICAgICAgZm9ybTogUm91dGVyKCksXG4gICAgfSksXG4gIH0pO1xuICByZXR1cm4gciBhcyBSb3V0ZXI8XG4gICAgUm91dGVyVHlwZTx0eXBlb2Ygcj4gJiB7XG4gICAgICBURGF0YU1hbmFnZXI6IERhdGFNYW5hZ2VyVHlwZTxUPjtcbiAgICB9XG4gID47XG59XG4iLCJpbXBvcnQgeyBSZXF1aXJlT3B0aW9uYWxLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQge1xuICBBbnlJbnB1dCxcbiAgSUlucHV0LFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRFcnJvcixcbiAgSW5wdXRFcnJvck9yVmFsdWUsXG4gIElucHV0VmFsdWUsXG4gIElucHV0VmFsdWVFbGVtZW50LFxuICBJbnB1dEVsZW1lbnQsXG59IGZyb20gXCIuL0lucHV0XCI7XG5pbXBvcnQge1xuICBScGNSZXNvbHZlZENvbmZpZyxcbiAgUnBjUmVzb2x2ZWRIYW5kbGVyLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxufSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldEhhbmRsZXIgfSBmcm9tIFwiLi4vd2lkZ2V0L0Fic3RyYWN0V2lkZ2V0SGFuZGxlclwiO1xuaW1wb3J0IHsgSVdpZGdldEhhbmRsZXIsIFdpZGdldEVsZW1lbnQgfSBmcm9tIFwiLi4vd2lkZ2V0L1dpZGdldFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RJbnB1dEhhbmRsZXI8VCBleHRlbmRzIEFueUlucHV0PlxuICBleHRlbmRzIEFic3RyYWN0V2lkZ2V0SGFuZGxlcjxUPlxuICBpbXBsZW1lbnRzIElXaWRnZXRIYW5kbGVyPElJbnB1dD4ge1xuICBhYnN0cmFjdCBsb2FkQW5kQ2hlY2soZGF0YTogSW5wdXRWYWx1ZURhdGE8VD4pOiBQcm9taXNlPElucHV0RXJyb3JPclZhbHVlPFQ+PjtcblxuICBhYnN0cmFjdCBnZXRWYWx1ZUVsZW1lbnQoXG4gICAgdmFsdWU6IElucHV0VmFsdWU8VD4gfCB1bmRlZmluZWRcbiAgKTogUHJvbWlzZTxJbnB1dFZhbHVlRWxlbWVudDxUPj47XG5cbiAgYWJzdHJhY3QgZ2V0SW5wdXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxJbnB1dEVsZW1lbnQ8VD4+PjtcblxuICBhc3luYyBnZXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxXaWRnZXRFbGVtZW50PFQ+Pj4ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi4oYXdhaXQgdGhpcy5nZXRJbnB1dEVsZW1lbnQoKSksXG4gICAgICB2YWx1ZTogYXdhaXQgdGhpcy5nZXRWYWx1ZUVsZW1lbnQodW5kZWZpbmVkKSxcbiAgICB9IGFzIFJlcXVpcmVPcHRpb25hbEtleXM8V2lkZ2V0RWxlbWVudDxUPj47XG4gIH1cblxuICBhc3luYyBoYW5kbGVDaGVjayhcbiAgICBkYXRhOiBJbnB1dFZhbHVlRGF0YTxUPlxuICApOiBQcm9taXNlPElucHV0RXJyb3I8VD4gfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmxvYWRBbmRDaGVjayhkYXRhKTtcbiAgICBpZiAoXCJlcnJvclwiIGluIHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5lcnJvcjtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIFRPRE86IEFic3RyYWN0SW5wdXRWaWV3XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBGcmFnbWVudCwgUmVhY3RFbGVtZW50LCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgVmlld1N0YXRlIH0gZnJvbSBcIi4uLy4uL3JlYWN0L3ZpZXcvVmlld1N0YXRlXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXRWaWV3IH0gZnJvbSBcIi4uL3dpZGdldC9BYnN0cmFjdFdpZGdldFZpZXdcIjtcbmltcG9ydCB7IFdpZGdldFR5cGUgfSBmcm9tIFwiLi4vd2lkZ2V0L1dpZGdldFwiO1xuLy8gVE9ETzogdHlwZSBJbnB1dFZpZXdcbmltcG9ydCB7XG4gIEFueUlucHV0LFxuICBBbnlJbnB1dENvbm5lY3Rpb24sXG4gIElucHV0RXJyb3IsXG4gIElucHV0VHlwZSxcbiAgSW5wdXRWYWx1ZURhdGEsXG4gIElucHV0VmFsdWVFbGVtZW50LFxufSBmcm9tIFwiLi9JbnB1dFwiO1xuaW1wb3J0IHsgSW5wdXRFcnJvckVsZW1lbnRNYXAsIElucHV0VmlldywgSW5wdXRWaWV3UHJvcHMgfSBmcm9tIFwiLi9JbnB1dFZpZXdcIjtcbmltcG9ydCB7IElucHV0Vmlld0NoaWxkcmVuIH0gZnJvbSBcIi4vSW5wdXRWaWV3Q2hpbGRyZW5cIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0SW5wdXRWaWV3PFxuICAgIEMgZXh0ZW5kcyBBbnlJbnB1dENvbm5lY3Rpb24sXG4gICAgUCBleHRlbmRzIElucHV0Vmlld1Byb3BzPEM+ID0gSW5wdXRWaWV3UHJvcHM8Qz4sXG4gICAgVCBleHRlbmRzIElucHV0VHlwZTxDPiA9IElucHV0VHlwZTxDPlxuICA+XG4gIGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRWaWV3PEMsIFA+XG4gIGltcGxlbWVudHMgSW5wdXRWaWV3PEM+IHtcbiAgcHJvdGVjdGVkIHVwZGF0ZUVycm9yPyhlcnJvcjogVFtcIkVycm9yXCJdIHwgdW5kZWZpbmVkKTogdm9pZDtcblxuICBAVmlld1N0YXRlKFwiZm9yY2VVcGRhdGVWYWx1ZVwiKSBwcm90ZWN0ZWQgX3ZhbHVlOlxuICAgIHwgSW5wdXRWYWx1ZUVsZW1lbnQ8Qz5cbiAgICB8IHVuZGVmaW5lZDtcblxuICBAVmlld1N0YXRlKFwiZm9yY2VVcGRhdGVFcnJvclwiKSBwcm90ZWN0ZWQgX2Vycm9yOiBJbnB1dEVycm9yPEM+O1xuXG4gIEBWaWV3U3RhdGUoKSBfZXJyb3JFbGVtZW50OiBSZWFjdEVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgQFZpZXdTdGF0ZSgpIGlzVmFsaWRhdGluZzogYm9vbGVhbjtcblxuICBwcm90ZWN0ZWQgX2RhdGE6IElucHV0VmFsdWVEYXRhPEM+O1xuICBwcm90ZWN0ZWQgX2lzVmFsaWRWYWx1ZTogYm9vbGVhbjtcblxuICBjaGlsZHJlbj86IElucHV0Vmlld0NoaWxkcmVuO1xuXG4gIGdldCBlcnJvckVsZW1lbnQoKTogUmVhY3RFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JFbGVtZW50O1xuICB9XG5cbiAgZ2V0IGRhdGEoKTogSW5wdXRWYWx1ZURhdGE8Qz4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgZ2V0IGVycm9yKCk6IFRbXCJFcnJvclwiXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IElucHV0VmFsdWVFbGVtZW50PEM+IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBhc3luYyBzZXRWYWx1ZSh2YWx1ZTogSW5wdXRWYWx1ZUVsZW1lbnQ8Qz4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5faXNWYWxpZFZhbHVlICYmIHRoaXMuX3ZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5pc1ZhbGlkYXRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2Vycm9yID0gYXdhaXQgdGhpcy5nZXRFcnJvcj8uKCk7XG4gICAgdGhpcy5pc1ZhbGlkYXRpbmcgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5fZXJyb3IgIT0gbnVsbCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkVycm9yPy4odGhpcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2lzVmFsaWRWYWx1ZSA9IHRydWU7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZT8uKHRoaXMpO1xuICB9XG5cbiAgc2V0RXJyb3IoZXJyb3I6IFRbXCJFcnJvclwiXSB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX2Vycm9yID0gZXJyb3I7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RXJyb3I/KCk6IEF3YWl0YWJsZTxJbnB1dEVycm9yPEM+IHwgdW5kZWZpbmVkPjtcblxuICBwcm90ZWN0ZWQgdXBkYXRlVmFsdWU/KHZhbHVlOiBJbnB1dFZhbHVlRWxlbWVudDxDPiB8IHVuZGVmaW5lZCk6IHZvaWQ7XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUVsZW1lbnQoZWxlbWVudDogV2lkZ2V0VHlwZTxDPltcIkVsZW1lbnRcIl0pIHtcbiAgICB0aGlzLl92YWx1ZSA9XG4gICAgICB0aGlzLnByb3BzLnZhbHVlICE9PSB1bmRlZmluZWQgPyB0aGlzLnByb3BzLnZhbHVlIDogZWxlbWVudC52YWx1ZTtcbiAgfVxuXG4gIGZvcmNlVXBkYXRlVmFsdWUoKSB7XG4gICAgdGhpcy5fZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5faXNWYWxpZFZhbHVlID0gZmFsc2U7XG4gICAgdGhpcy5fZGF0YSA9IHRoaXMucnBjLmdldFZhbHVlRGF0YUZyb21FbGVtZW50KHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlPy4odGhpcy5fdmFsdWUpO1xuICB9XG5cbiAgLy8gVE9ETzogW1wiY2hpbGRyZW5cIiwgeyAuLi4gfV1cbiAgcHJvdGVjdGVkIHJlbmRlckVycm9yRWxlbWVudCgpOiBSZWFjdEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHsgZXJyb3IgfSA9IHRoaXM7XG4gICAgLy8gVE9ETzogdXNlIHRoaXMuZXJyb3JcbiAgICBpZiAoZXJyb3IgPT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnByb3BzLnJlbmRlckVycm9yPy4oZXJyb3IpO1xuICAgIGlmIChlbGVtZW50KSByZXR1cm4gZWxlbWVudDtcblxuICAgIGNvbnN0IGVycm9yTWFwOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdEVsZW1lbnQgfCAoKGVycm9yKSA9PiBSZWFjdEVsZW1lbnQpPiA9IHtcbiAgICAgIC4uLnRoaXMuZ2V0RXJyb3JFbGVtZW50TWFwPy4oKSEsXG4gICAgICAuLi50aGlzLnByb3BzLmVycm9yTWFwISxcbiAgICB9IGFzIGFueTtcblxuICAgIGNvbnN0IGVycm9yVHlwZSA9XG4gICAgICB0eXBlb2YgZXJyb3IgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBlcnJvclxuICAgICAgICA6IHR5cGVvZiBlcnJvciA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgZXJyb3IudHlwZSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IGVycm9yLnR5cGVcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBlcnJvckVsZW1lbnRPckZuID0gZXJyb3JNYXBbZXJyb3JUeXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXJyb3JFbGVtZW50T3JGbiA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIEZyYWdtZW50LFxuICAgICAgICBudWxsLFxuICAgICAgICBlcnJvckVsZW1lbnRPckZuKHR5cGVvZiBlcnJvciA9PT0gXCJvYmplY3RcIiA/IGVycm9yIDogdW5kZWZpbmVkKVxuICAgICAgKTtcblxuICAgIGlmIChlcnJvckVsZW1lbnRPckZuKSByZXR1cm4gZXJyb3JFbGVtZW50T3JGbjtcbiAgfVxuXG4gIGZvcmNlVXBkYXRlRXJyb3IoKSB7XG4gICAgdGhpcy5fZXJyb3JFbGVtZW50ID1cbiAgICAgIHRoaXMuX2Vycm9yICE9IG51bGwgPyB0aGlzLnJlbmRlckVycm9yRWxlbWVudCgpIDogdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5jaGlsZHJlbj8udXBkYXRlRXJyb3IodGhpcy5fZXJyb3IpO1xuICAgIHRoaXMudXBkYXRlRXJyb3I/Lih0aGlzLl9lcnJvcik7XG4gIH1cblxuICBpbnB1dFdpbGxWYWxpZGF0ZT8oKTogQXdhaXRhYmxlO1xuXG4gIGFzeW5jIHZhbGlkYXRlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGF3YWl0IHRoaXMuaW5wdXRXaWxsVmFsaWRhdGU/LigpO1xuICAgIGNvbnN0IGVycm9yID1cbiAgICAgIChhd2FpdCB0aGlzLmNoaWxkcmVuPy5nZXRFcnJvcigpKSA/PyAoYXdhaXQgdGhpcy5nZXRFcnJvcj8uKCkpO1xuICAgIHJldHVybiBudWxsID09ICh0aGlzLl9lcnJvciA9IGVycm9yKTtcbiAgfVxuXG4gIHVwZGF0ZVZpZXdQcm9wcyhwcmV2UHJvcHM6IFJlYWRvbmx5PFA+LCBuZXh0UHJvcHM6IFJlYWRvbmx5PFA+KSB7XG4gICAgc3VwZXIudXBkYXRlVmlld1Byb3BzKHByZXZQcm9wcywgbmV4dFByb3BzKTtcbiAgICBpZiAobmV4dFByb3BzLnZhbHVlICE9PSBwcmV2UHJvcHMudmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gbmV4dFByb3BzLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRFcnJvckVsZW1lbnRNYXA/KCk6IElucHV0RXJyb3JFbGVtZW50TWFwPEM+O1xuXG4gIHJlbmRlckVycm9yKCk6IFJlYWN0Tm9kZSB7XG4gICAgaWYgKHRoaXMuZXJyb3JFbGVtZW50KSByZXR1cm4gdGhpcy5lcnJvckVsZW1lbnQ7XG5cbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgZXJyb3IgPT09IFwic3RyaW5nXCIpIHJldHVybiBlcnJvcjtcblxuICAgIGlmIChlcnJvciAhPSBudWxsKSByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyb3IpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgc3VwZXIuY29tcG9uZW50RGlkTW91bnQoKTtcbiAgICB0aGlzLnByb3BzLmlucHV0UmVmPy4odGhpcyk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBzdXBlci5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuICAgIHRoaXMucHJvcHMuaW5wdXRSZWY/LihudWxsKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBJbnB1dFZpZXdDbGFzczxUIGV4dGVuZHMgQW55SW5wdXQ+ID0gbmV3IChcbiAgcHJvcHM6IElucHV0Vmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248VD4+XG4pID0+IEFic3RyYWN0SW5wdXRWaWV3PFJwY0Nvbm5lY3Rpb248VD4+O1xuIiwiLy8gVE9ETzogUmVuYW1lIHRvICpJbnB1dFxuaW1wb3J0IHsgbWVyZ2VEZXNjcmlwdG9ycyB9IGZyb20gXCIuLi8uLi9jb21tb24vb2JqZWN0L21lcmdlRGVzY3JpcHRvcnNcIjtcbmltcG9ydCB7XG4gIEF3YWl0YWJsZSxcbiAgSWYsXG4gIElzLFxuICBJc0VtcHR5T2JqZWN0LFxuICBJc1VuZGVmaW5lZCxcbiAgTm90LFxuICBPdmVycmlkZSxcbiAgUGFydGlhbFVuZGVmaW5lZEtleXMsXG59IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgTm9ScGMgfSBmcm9tIFwiLi4vTm9ScGNcIjtcbmltcG9ydCB7XG4gIEJhc2VkUnBjLFxuICBScGNJc0dlbmVyaWNDb25maWdPcHRpb24sXG4gIFJwY0Nvbm5lY3Rpb24sXG4gIFJwY0hhbmRsZXJDbGFzcyxcbiAgUnBjUmVzb2x2ZWRIYW5kbGVyLFxuICBScGNUeXBlLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxuICBScGNQcm9wc09wdGlvbixcbn0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgSXNHZW5lcmljQ29uZmlnIH0gZnJvbSBcIi4uL0dlbmVyaWNDb25maWdcIjtcbmltcG9ydCB7XG4gIFRXaWRnZXQsXG4gIFdpZGdldCxcbiAgV2lkZ2V0Q29tbWFuZHNPcHRpb24sXG4gIFdpZGdldENvbnRyb2xsZXJPcHRpb24sXG4gIFdpZGdldEVsZW1lbnQsXG4gIFdpZGdldFR5cGUsXG59IGZyb20gXCIuLi93aWRnZXQvV2lkZ2V0XCI7XG5cbmV4cG9ydCB0eXBlIElJbnB1dCA9IElucHV0PFxuICBPdmVycmlkZTxcbiAgICBUSW5wdXQsXG4gICAge1xuICAgICAgQ29tbWFuZHM6IHt9O1xuICAgIH1cbiAgPlxuPjtcbmV4cG9ydCB0eXBlIFRJbnB1dCA9IHtcbiAgVmFsdWVEYXRhOiBhbnk7XG5cbiAgVmFsdWU6IGFueTtcblxuICBDb250cm9sbGVyOiBUV2lkZ2V0W1wiQ29udHJvbGxlclwiXTtcblxuICBQcm9wczogVFdpZGdldFtcIlByb3BzXCJdO1xuXG4gIENvbmZpZzogVFdpZGdldFtcIkNvbmZpZ1wiXTtcblxuICBFbGVtZW50OiBUV2lkZ2V0W1wiRWxlbWVudFwiXTtcblxuICBWYWx1ZUVsZW1lbnQ6IGFueTtcblxuICBFcnJvcjogYW55O1xuXG4gIENvbW1hbmRzOiBUV2lkZ2V0W1wiQ29tbWFuZHNcIl07XG59O1xuXG5leHBvcnQgdHlwZSBJbnB1dEVsZW1lbnQ8VCBleHRlbmRzIEFueUlucHV0PiA9IElucHV0VHlwZTxUPltcIkVsZW1lbnRcIl07XG5cbmV4cG9ydCB0eXBlIElucHV0PFQgZXh0ZW5kcyBUSW5wdXQ+ID0gV2lkZ2V0PHtcbiAgQ29tbWFuZHM6IFRbXCJDb21tYW5kc1wiXSAmIHtcbiAgICBjaGVjazoge1xuICAgICAgKGRhdGE6IFRbXCJWYWx1ZURhdGFcIl0pOiBUW1wiRXJyb3JcIl0gfCB1bmRlZmluZWQ7XG4gICAgICBoYW5kbGVyOiBcImhhbmRsZUNoZWNrXCI7XG4gICAgfTtcbiAgfTtcblxuICBUSW5wdXQ6IFQ7XG5cbiAgQ29ubmVjdGlvbjoge307XG5cbiAgQ29uZmlnOiBUW1wiQ29uZmlnXCJdO1xuXG4gIEhhbmRsZXI6IHtcbiAgICBnZXRJbnB1dEVsZW1lbnQoKTogUHJvbWlzZTxUW1wiRWxlbWVudFwiXT47XG4gICAgZ2V0VmFsdWVFbGVtZW50KHZhbHVlOiBUW1wiVmFsdWVcIl0gfCB1bmRlZmluZWQpOiBQcm9taXNlPFRbXCJWYWx1ZUVsZW1lbnRcIl0+O1xuICAgIGxvYWRBbmRDaGVjayhcbiAgICAgIHZhbHVlRGF0YTogVFtcIlZhbHVlRGF0YVwiXVxuICAgICk6IFByb21pc2U8SW5wdXRFcnJvck9yVmFsdWU8SW5wdXQ8VD4+PjtcbiAgfTtcblxuICBQcm9wczogVFtcIlByb3BzXCJdICYge1xuICAgIGlucHV0T3B0aW9uczogSW5wdXRPcHRpb25zPFRJbnB1dD47XG5cbiAgICBnZXRWYWx1ZURhdGFGcm9tRWxlbWVudChcbiAgICAgIHRoaXM6IElucHV0PFQ+LFxuICAgICAgZWxlbWVudDogVFtcIlZhbHVlRWxlbWVudFwiXVxuICAgICk6IFRbXCJWYWx1ZURhdGFcIl07XG4gIH07XG5cbiAgRWxlbWVudDogVFtcIkVsZW1lbnRcIl0gJiB7XG4gICAgdmFsdWU6IFRbXCJWYWx1ZUVsZW1lbnRcIl0gfCB1bmRlZmluZWQ7XG4gIH07XG5cbiAgQ29udHJvbGxlcjogVFtcIkNvbnRyb2xsZXJcIl07XG59PjtcblxuZXhwb3J0IHR5cGUgQmFzZWRJbnB1dDxUIGV4dGVuZHMgVElucHV0ID0gVElucHV0PiA9IEJhc2VkUnBjPFJwY1R5cGU8SW5wdXQ8VD4+PjtcblxuZXhwb3J0IHR5cGUgSW5wdXRUeXBlPFQgZXh0ZW5kcyBCYXNlZElucHV0PiA9IFdpZGdldFR5cGU8VD5bXCJUSW5wdXRcIl07XG5cbmV4cG9ydCB0eXBlIEVycm9yT3JWYWx1ZTxFLCBWPiA9XG4gIHwgeyBlcnJvcjogRTsgdmFsdWU6IFYgfCB1bmRlZmluZWQgfVxuICB8IHsgdmFsdWU6IFYgfTtcblxuZXhwb3J0IHR5cGUgSW5wdXRFcnJvck9yVmFsdWU8VCBleHRlbmRzIEJhc2VkSW5wdXQ+ID0gRXJyb3JPclZhbHVlPFxuICBJbnB1dEVycm9yPFQ+LFxuICBJbnB1dFZhbHVlPFQ+XG4+O1xuXG5leHBvcnQgdHlwZSBBbnlJbnB1dCA9IElucHV0PFRJbnB1dD47XG5leHBvcnQgdHlwZSBBbnlJbnB1dENvbm5lY3Rpb24gPSBScGNDb25uZWN0aW9uPEFueUlucHV0PjtcblxuZXhwb3J0IHR5cGUgSW5wdXRPcHRpb25zPFQgZXh0ZW5kcyBUSW5wdXQ+ID0gUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gIHtcbiAgICBpc0dlbmVyaWNDb25maWc6IFJwY0lzR2VuZXJpY0NvbmZpZ09wdGlvbjxUPjtcblxuICAgIHByb3BzOiBScGNQcm9wc09wdGlvbjxUPjtcblxuICAgIGNvbnRyb2xsZXI6IFdpZGdldENvbnRyb2xsZXJPcHRpb248VD47XG4gIH0sXG4gIHtcbiAgICBoYW5kbGVyOiBScGNIYW5kbGVyQ2xhc3M8SW5wdXQ8VD4+O1xuXG4gICAgZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQ6IChcbiAgICAgIHRoaXM6IElucHV0PFQ+LFxuICAgICAgdmFsdWU6IElucHV0VmFsdWVFbGVtZW50PElucHV0PFQ+PlxuICAgICkgPT4gSW5wdXRWYWx1ZURhdGE8SW5wdXQ8VD4+O1xuICB9XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gSW5wdXQ8UiBleHRlbmRzIEJhc2VkSW5wdXQsIFQgZXh0ZW5kcyBUSW5wdXQgPSBJbnB1dFR5cGU8Uj4+KFxuICBvcHRpb25zOiBJbnB1dE9wdGlvbnM8VD5cbik6IElucHV0PFQ+IHtcbiAgY29uc3Qge1xuICAgIHByb3BzID0ge30sXG4gICAgaXNHZW5lcmljQ29uZmlnLFxuICAgIGNvbnRyb2xsZXIsXG4gICAgaGFuZGxlcixcbiAgICBnZXRWYWx1ZURhdGFGcm9tRWxlbWVudCxcbiAgfSA9IG9wdGlvbnMgYXMgSW5wdXRPcHRpb25zPFRJbnB1dD47XG5cbiAgcmV0dXJuIDxhbnk+V2lkZ2V0PEFueUlucHV0Pih7XG4gICAgcHJvcHM6IG1lcmdlRGVzY3JpcHRvcnMocHJvcHMsIHtcbiAgICAgIGlucHV0T3B0aW9uczogPElucHV0T3B0aW9uczxUSW5wdXQ+Pm9wdGlvbnMsXG4gICAgICBnZXRWYWx1ZURhdGFGcm9tRWxlbWVudCxcbiAgICB9KSxcbiAgICBjb250cm9sbGVyLFxuICAgIGlzR2VuZXJpY0NvbmZpZyxcbiAgICBjb21tYW5kczogeyBjaGVjazogXCJoYW5kbGVDaGVja1wiIH0sXG4gICAgaGFuZGxlcixcbiAgfSk7XG59XG5cbmV4cG9ydCB0eXBlIElucHV0VmFsdWU8VCBleHRlbmRzIEJhc2VkSW5wdXQ+ID0gSW5wdXRUeXBlPFQ+W1wiVmFsdWVcIl07XG5cbmV4cG9ydCB0eXBlIElucHV0VmFsdWVFbGVtZW50PFQgZXh0ZW5kcyBCYXNlZElucHV0PiA9IElucHV0VHlwZTxcbiAgVFxuPltcIlZhbHVlRWxlbWVudFwiXTtcblxuZXhwb3J0IHR5cGUgSW5wdXRFcnJvcjxUIGV4dGVuZHMgQmFzZWRJbnB1dD4gPSBJbnB1dFR5cGU8VD5bXCJFcnJvclwiXTtcblxuZXhwb3J0IHR5cGUgSW5wdXRWYWx1ZURhdGE8VCBleHRlbmRzIEJhc2VkSW5wdXQ+ID0gSW5wdXRUeXBlPFQ+W1wiVmFsdWVEYXRhXCJdO1xuIiwiaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi9ScGNcIjtcbmltcG9ydCB7IEFueUlucHV0LCBJbnB1dCwgSW5wdXRFcnJvciwgSW5wdXRUeXBlIH0gZnJvbSBcIi4vSW5wdXRcIjtcbmltcG9ydCB7IElucHV0Vmlld1Byb3BzIH0gZnJvbSBcIi4vSW5wdXRWaWV3XCI7XG5cbmV4cG9ydCB0eXBlIEFueUlucHV0RXJyb3JIb29rID0gSW5wdXRFcnJvckhvb2s8VElucHV0RXJyb3JIb29rPjtcblxuZXhwb3J0IHR5cGUgVElucHV0RXJyb3JIb29rID0geyBUYXJnZXQ6IEFueUlucHV0OyBFcnJvcjogYW55IH07XG5cbmV4cG9ydCB0eXBlIElucHV0RXJyb3JIb29rPFQgZXh0ZW5kcyBUSW5wdXRFcnJvckhvb2s+ID0gSW5wdXQ8XG4gIE9taXQ8SW5wdXRUeXBlPFRbXCJUYXJnZXRcIl0+LCBcIkVycm9yXCI+ICYge1xuICAgIFRJbnB1dEVycm9ySG9vazogVDtcbiAgICBFcnJvcjogSW5wdXRFcnJvcjxUW1wiVGFyZ2V0XCJdPiB8IFRbXCJFcnJvclwiXTtcbiAgfVxuPjtcblxuZXhwb3J0IGZ1bmN0aW9uIElucHV0RXJyb3JIb29rPEU+KCkge1xuICByZXR1cm4gPFQgZXh0ZW5kcyBBbnlJbnB1dD4oXG4gICAgaW5wdXQ6IFRcbiAgKTogSW5wdXRFcnJvckhvb2s8eyBUYXJnZXQ6IFQ7IEVycm9yOiBFIH0+ID0+IHtcbiAgICByZXR1cm4gPGFueT5pbnB1dDtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElucHV0RXJyb3JIb29rVmlld1Byb3BzPFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlJbnB1dEVycm9ySG9vaz4sXG4gIFQgZXh0ZW5kcyBUSW5wdXRFcnJvckhvb2sgPSBJbnB1dFR5cGU8Qz5bXCJUSW5wdXRFcnJvckhvb2tcIl1cbiAgLy8gVCBleHRlbmRzIEFueUlucHV0ID0gSW5wdXRUeXBlPEM+W1wiVEVycm9ySG9va1wiXVtcIlRhcmdldFwiXVxuPihwcm9wczogSW5wdXRWaWV3UHJvcHM8Qz4pOiBJbnB1dFZpZXdQcm9wczxScGNDb25uZWN0aW9uPFRbXCJUYXJnZXRcIl0+PiB7XG4gIHJldHVybiA8YW55PnByb3BzO1xufVxuIiwiaW1wb3J0IHsgUmVmQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9lbnRyaWVzXCI7XG5pbXBvcnQgeyBoYXNLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9vYmplY3QvaGFzS2V5c1wiO1xuaW1wb3J0IHsgSWYgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IEFueUlucHV0Q29ubmVjdGlvbiB9IGZyb20gXCIuL0lucHV0XCI7XG5pbXBvcnQgeyBJbnB1dEVycm9yTWFwIH0gZnJvbSBcIi4vaW5wdXQtbWFwL0lucHV0TWFwXCI7XG5pbXBvcnQgeyBBbnlJbnB1dFZpZXcsIElucHV0VmlldyB9IGZyb20gXCIuL0lucHV0Vmlld1wiO1xuXG5leHBvcnQgY2xhc3MgSW5wdXRWaWV3Q2hpbGRyZW4ge1xuICB2aWV3TWFwOiBSZWNvcmQ8c3RyaW5nLCBBbnlJbnB1dFZpZXc+ID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGFzeW5jIHVwZGF0ZUVycm9yKGVycm9yKSB7XG4gICAgY29uc3QgZXJyb3JNYXAgPSAodHlwZW9mIGVycm9yID09PSBcIm9iamVjdFwiICYmIGVycm9yPy5lcnJvck1hcCkgfHwge307XG4gICAgZm9yIChjb25zdCBba2V5LCB2aWV3XSBvZiBlbnRyaWVzPEFueUlucHV0Vmlldz4odGhpcy52aWV3TWFwKSkge1xuICAgICAgdmlldy5zZXRFcnJvcihlcnJvck1hcFtrZXldKTtcbiAgICB9XG4gIH1cblxuICByZWYoa2V5OiBzdHJpbmcpOiBSZWZDYWxsYmFjazxBbnlJbnB1dFZpZXc+IHtcbiAgICByZXR1cm4gdmlldyA9PiB7XG4gICAgICBpZiAodmlldykge1xuICAgICAgICB0aGlzLnZpZXdNYXBba2V5XSA9IHZpZXc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy52aWV3TWFwW2tleV07XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldEVycm9yKCk6IFByb21pc2U8SW5wdXRFcnJvck1hcDxhbnk+IHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgZXJyb3JNYXAgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZpZXddIG9mIGVudHJpZXModGhpcy52aWV3TWFwKSkge1xuICAgICAgYXdhaXQgdmlldy52YWxpZGF0ZSgpO1xuICAgICAgY29uc3QgeyBlcnJvciB9ID0gdmlldztcbiAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgIGVycm9yTWFwW2tleV0gPSBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGhhc0tleXMoZXJyb3JNYXApKSByZXR1cm4geyB0eXBlOiBcIkVSUk9SX01BUFwiLCBlcnJvck1hcCB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBQYXlsb2FkIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5cbmV4cG9ydCB0eXBlIExlbmd0aEVycm9yID0gUGF5bG9hZDx7XG4gIE1BWF9MRU5HVEg6IHsgbWF4TGVuZ3RoOiBudW1iZXIgfTtcbiAgTUlOX0xFTkdUSDogeyBtaW5MZW5ndGg6IG51bWJlciB9O1xufT47XG5leHBvcnQgdHlwZSBMZW5ndGhPcHRpb25zID0ge1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIG1pbkxlbmd0aD86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMZW5ndGhFcnJvcihcbiAgdmFsdWU6IHsgbGVuZ3RoOiBudW1iZXIgfSxcbiAgeyBtYXhMZW5ndGgsIG1pbkxlbmd0aCB9OiBMZW5ndGhPcHRpb25zXG4pOiBMZW5ndGhFcnJvciB8IHVuZGVmaW5lZCB7XG4gIGlmIChtYXhMZW5ndGggJiYgdmFsdWUubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogXCJNQVhfTEVOR1RIXCIsIG1heExlbmd0aCB9O1xuICB9XG4gIGlmIChtaW5MZW5ndGggJiYgdmFsdWUubGVuZ3RoIDwgbWluTGVuZ3RoKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogXCJNSU5fTEVOR1RIXCIsIG1pbkxlbmd0aCB9O1xuICB9XG59XG4iLCJpbXBvcnQge0F3YWl0YWJsZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5cbmV4cG9ydCB0eXBlIFZhbHVlT3JBd2FpdGFibGVGbjxUPiA9IFQgfCAoKCkgPT4gQXdhaXRhYmxlPFQ+KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFZhbHVlT3JBd2FpdGFibGVGbjxUPih2YWx1ZTogVmFsdWVPckF3YWl0YWJsZUZuPFQ+KTogUHJvbWlzZTxUPiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiAoPGFueT52YWx1ZSkoKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuIiwiaW1wb3J0IHtcbiAgSWYsXG4gIElzLFxuICBJc05ldmVyLFxuICBPbWl0S2V5cyxcbiAgT3ZlcnJpZGUsXG4gIFBhcnRpYWxVbmRlZmluZWRLZXlzLFxufSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IERhdGFSb3cgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZWRhdGEvRGF0YVJvd1wiO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9EYXRhU291cmNlXCI7XG5pbXBvcnQgeyBHZW5lcmljQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0dlbmVyaWNDb25maWdcIjtcbmltcG9ydCB7IE5vUnBjIH0gZnJvbSBcIi4uLy4uL05vUnBjXCI7XG5pbXBvcnQgeyBEYXRhVGFibGUgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0L2RhdGEtdGFibGUvRGF0YVRhYmxlXCI7XG5pbXBvcnQgeyBBbnlSb3dUeXBlLCBSb3csIHN0cmluZyB9IGZyb20gXCIuLi8uLi93aWRnZXQvUm93XCI7XG5pbXBvcnQgeyBXaWRnZXRUeXBlIH0gZnJvbSBcIi4uLy4uL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4uL0lucHV0XCI7XG5pbXBvcnQgeyBOdWxsYWJsZUlucHV0IH0gZnJvbSBcIi4uL251bGxhYmxlLWlucHV0L051bGxhYmxlSW5wdXRcIjtcblxuaW1wb3J0IHsgVmFsdWVPckF3YWl0YWJsZUZuIH0gZnJvbSBcIi4uL1ZhbHVlT3JBd2FpdGFibGVGblwiO1xuaW1wb3J0IHsgRGF0YUlucHV0SGFuZGxlciB9IGZyb20gXCIuL0RhdGFJbnB1dEhhbmRsZXJcIjtcbmltcG9ydCB7IERhdGFJbnB1dFRlc3RlciB9IGZyb20gXCIuL0RhdGFJbnB1dFRlc3RlclwiO1xuXG5leHBvcnQgdHlwZSBXaXRoRGF0YUtleSA9IHtcbiAgJGtleTogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgRGF0YUlucHV0VHlwZXM8VCBleHRlbmRzIFREYXRhSW5wdXQ+ID0gX1R5cGVzPFQ+O1xuXG50eXBlIF9UeXBlczxUIGV4dGVuZHMgVERhdGFJbnB1dD4gPSBUICYge1xuICBUYWJsZTogRGF0YVRhYmxlPHtcbiAgICBSb3c6IFRbXCJUYWJsZVJvd1wiXTtcbiAgICBEYXRhOiBUW1wiVGFibGVEYXRhXCJdO1xuICAgIFJvd0NvbnRyb2xsZXI6IE5vUnBjO1xuICB9PjtcblxuICBUYWJsZVR5cGVzOiBXaWRnZXRUeXBlPF9UeXBlczxUPltcIlRhYmxlXCJdPltcIlR5cGVzXCJdO1xuXG4gIE9wdGlvbmFsQ29uZmlnOiB7XG4gICAgY29sdW1uczogX1R5cGVzPFQ+W1wiVGFibGVUeXBlc1wiXVtcIkNvbHVtbkNvbmZpZ01hcFwiXTtcbiAgfTtcblxuICBSZXF1aXJlZENvbmZpZzoge1xuICAgIGRlZmF1bHQ/OiBWYWx1ZU9yQXdhaXRhYmxlRm48c3RyaW5nIHwgRGF0YVJvdzxUW1wiVGFibGVEYXRhXCJdPiB8IHVuZGVmaW5lZD47XG5cbiAgICB0YWJsZUNvbmZpZz86IE9taXRLZXlzPFxuICAgICAgX1R5cGVzPFQ+W1wiVGFibGVUeXBlc1wiXVtcIlJlcXVpcmVkQ29uZmlnXCJdICZcbiAgICAgICAgX1R5cGVzPFQ+W1wiVGFibGVUeXBlc1wiXVtcIk9wdGlvbmFsQ29uZmlnXCJdLFxuICAgICAgXCJjb2x1bW5zXCIgfCBcInNvdXJjZVwiXG4gICAgPjtcblxuICAgIHNvdXJjZTogRGF0YVNvdXJjZTxUW1wiVGFibGVEYXRhXCJdPjtcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIERhdGFJbnB1dENvbmZpZzxUIGV4dGVuZHMgVERhdGFJbnB1dD4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAgX1R5cGVzPFQ+W1wiT3B0aW9uYWxDb25maWdcIl0gJiB7XG4gICAgbG9hZFNvdXJjZTpcbiAgICAgIHwgRGF0YVNvdXJjZTxUW1wiTG9hZERhdGFcIl0+XG4gICAgICB8IElmPFxuICAgICAgICAgIElzPFRbXCJWYWx1ZVwiXSwgc3RyaW5nPiB8IElzPFRbXCJUYWJsZURhdGFcIl0sIFRbXCJMb2FkUm93XCJdPixcbiAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgPjtcbiAgfSxcbiAgX1R5cGVzPFQ+W1wiUmVxdWlyZWRDb25maWdcIl1cbj47XG5cbmV4cG9ydCB0eXBlIEFueURhdGFJbnB1dCA9IERhdGFJbnB1dDxhbnksIFREYXRhSW5wdXQ+O1xuXG5leHBvcnQgdHlwZSBURGF0YUlucHV0ID0ge1xuICBUYWJsZVJvdzogYW55O1xuICBUYWJsZURhdGE6IGFueTtcblxuICBMb2FkRGF0YTogYW55O1xuICBMb2FkUm93OiBhbnk7XG5cbiAgVmFsdWU6IGFueTtcbn07XG5cbmV4cG9ydCB0eXBlIERhdGFJbnB1dDxOIGV4dGVuZHMgYm9vbGVhbiwgVCBleHRlbmRzIFREYXRhSW5wdXQ+ID0gTnVsbGFibGVJbnB1dDxcbiAgTixcbiAge1xuICAgIFR5cGVzOiBfVHlwZXM8VD47XG5cbiAgICBDb21tYW5kczoge307XG5cbiAgICBWYWx1ZURhdGE6IHN0cmluZztcblxuICAgIFZhbHVlOiBUW1wiVmFsdWVcIl07XG5cbiAgICBWYWx1ZUVsZW1lbnQ6IF9UeXBlczxUPltcIlRhYmxlVHlwZXNcIl1bXCJSb3dXaXRoS2V5XCJdO1xuXG4gICAgUHJvcHM6IHtcbiAgICAgIHRhYmxlOiBfVHlwZXM8VD5bXCJUYWJsZVwiXTtcbiAgICB9O1xuXG4gICAgQ29uZmlnOiBHZW5lcmljQ29uZmlnPFxuICAgICAgPFRhYmxlRGF0YSwgTG9hZERhdGEgPSBUYWJsZURhdGE+KFxuICAgICAgICBjb25maWc6IERhdGFJbnB1dENvbmZpZzxcbiAgICAgICAgICBPdmVycmlkZTxcbiAgICAgICAgICAgIFQsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFRhYmxlRGF0YTogVGFibGVEYXRhO1xuICAgICAgICAgICAgICBMb2FkRGF0YTogTG9hZERhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPlxuICAgICAgICA+XG4gICAgICApID0+IERhdGFJbnB1dENvbmZpZzxUPlxuICAgID47XG5cbiAgICBFbGVtZW50OiB7fTtcblxuICAgIENvbnRyb2xsZXI6IF9UeXBlczxUPltcIlRhYmxlXCJdO1xuXG4gICAgRXJyb3I6IFwiSU5WQUxJRF9EQVRBX0tFWVwiO1xuICB9XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gRGF0YUlucHV0PFxuICBUYWJsZVJvd1R5cGUgZXh0ZW5kcyBBbnlSb3dUeXBlID0ge1xuICAgIGxhYmVsOiB0eXBlb2Ygc3RyaW5nO1xuICB9LFxuICBOIGV4dGVuZHMgYm9vbGVhbiA9IGZhbHNlLFxuICBMb2FkVHlwZSA9IG5ldmVyLFxuICBTIGV4dGVuZHMgUHJvcGVydHlLZXkgPSBhbnlcbj4oXG4gIG9wdGlvbnM6IHtcbiAgICBudWxsYWJsZT86IE47XG4gICAgdGFibGVSb3dUeXBlPzogVGFibGVSb3dUeXBlO1xuICAgIGxvYWRUeXBlPzogTG9hZFR5cGU7XG4gIH0gPSB7fVxuKTogRGF0YUlucHV0PFxuICBOLFxuICB7XG4gICAgVGFibGVSb3c6IFJvdzxUYWJsZVJvd1R5cGU+O1xuICAgIERhdGE6IGFueTtcbiAgICBMb2FkUm93OiBMb2FkVHlwZTtcbiAgICBUYWJsZURhdGE6IGFueTtcbiAgICBMb2FkRGF0YTogYW55O1xuICAgIFZhbHVlOiBJc05ldmVyPExvYWRUeXBlPiBleHRlbmRzIHRydWUgPyBzdHJpbmcgOiBEYXRhUm93PExvYWRUeXBlPjtcbiAgICBSb3c6IGFueTtcbiAgfVxuPiB7XG4gIGNvbnN0IHRhYmxlID0gRGF0YVRhYmxlKG9wdGlvbnMudGFibGVSb3dUeXBlIHx8IHsgbGFiZWw6IHN0cmluZyB9KTtcbiAgcmV0dXJuIDxhbnk+SW5wdXQ8QW55RGF0YUlucHV0Pih7XG4gICAgcHJvcHM6IHtcbiAgICAgIG51bGxhYmxlOiBvcHRpb25zLm51bGxhYmxlID8/IGZhbHNlLFxuICAgICAgdGFibGUsXG4gICAgfSxcbiAgICBpc0dlbmVyaWNDb25maWc6IHRydWUsXG4gICAgY29udHJvbGxlcjogdGFibGUsXG4gICAgaGFuZGxlcjogRGF0YUlucHV0SGFuZGxlcixcbiAgICBnZXRWYWx1ZURhdGFGcm9tRWxlbWVudCh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlPy4ka2V5O1xuICAgIH0sXG4gIH0pO1xufVxuXG4vLyBEYXRhSW5wdXQoe1xuLy8gICAgdGFibGVSb3c6IHt9XG4vLyAgICByb3c6IFR5cGluZzxVc2VyPigpXG4vLyB9KVxuIiwiaW1wb3J0IHsgUmVxdWlyZU9wdGlvbmFsS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgRGF0YVJvdyB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9EYXRhUm93XCI7XG5pbXBvcnQgeyBScGNFcnJvciwgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IFdpZGdldENvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0L1dpZGdldFwiO1xuaW1wb3J0IHtcbiAgRXJyb3JPclZhbHVlLFxuICBJbnB1dEVsZW1lbnQsXG4gIElucHV0RXJyb3IsXG4gIElucHV0VHlwZSxcbiAgSW5wdXRWYWx1ZSxcbiAgSW5wdXRWYWx1ZURhdGEsXG4gIElucHV0VmFsdWVFbGVtZW50LFxufSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IEFic3RyYWN0TnVsbGFibGVJbnB1dEhhbmRsZXIgfSBmcm9tIFwiLi4vbnVsbGFibGUtaW5wdXQvQWJzdHJhY3ROdWxsYWJsZUlucHV0SGFuZGxlclwiO1xuaW1wb3J0IHsgVmFsdWVPckF3YWl0YWJsZUZuIH0gZnJvbSBcIi4uL1ZhbHVlT3JBd2FpdGFibGVGblwiO1xuaW1wb3J0IHsgQW55RGF0YUlucHV0IH0gZnJvbSBcIi4vRGF0YUlucHV0XCI7XG5cbnR5cGUgVCA9IEFueURhdGFJbnB1dDtcblxuZXhwb3J0IGNsYXNzIERhdGFJbnB1dEhhbmRsZXIgZXh0ZW5kcyBBYnN0cmFjdE51bGxhYmxlSW5wdXRIYW5kbGVyPFQ+IHtcbiAgZ2V0Q29udHJvbGxlckNvbmZpZygpOiBScGNVbnJlc29sdmVkQ29uZmlnPFdpZGdldENvbnRyb2xsZXI8VD4+IHtcbiAgICByZXR1cm4gJCA9PlxuICAgICAgJCh7XG4gICAgICAgIC4uLnRoaXMuY29uZmlnLnRhYmxlQ29uZmlnLFxuICAgICAgICBzb3VyY2U6IHRoaXMuY29uZmlnLnNvdXJjZSxcbiAgICAgICAgY29sdW1uczogdGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgIH0pO1xuICB9XG5cbiAgZ2V0SW5wdXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxJbnB1dEVsZW1lbnQ8VD4+PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7fSk7XG4gIH1cblxuICBhc3luYyBnZXRWYWx1ZUVsZW1lbnQoXG4gICAgZGF0YUtleTogSW5wdXRWYWx1ZTxUPiB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPElucHV0VmFsdWVFbGVtZW50PFQ+PiB7XG4gICAgbGV0IGRhdGFSb3c6IERhdGFSb3c8YW55PiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoIWRhdGFLZXkpIHtcbiAgICAgIGNvbnN0IGRhdGFLZXlPclJvdyA9IGF3YWl0IFZhbHVlT3JBd2FpdGFibGVGbih0aGlzLmNvbmZpZy5kZWZhdWx0KTtcbiAgICAgIGlmIChkYXRhS2V5T3JSb3cgJiYgdHlwZW9mIGRhdGFLZXlPclJvdyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBkYXRhUm93ID0gZGF0YUtleU9yUm93O1xuICAgICAgfSBlbHNlIGlmIChkYXRhS2V5T3JSb3cpIHtcbiAgICAgICAgZGF0YUtleSA9IFN0cmluZyhkYXRhS2V5T3JSb3cpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZGF0YUtleSAmJiAhZGF0YVJvdykge1xuICAgICAgZGF0YVJvdyA9IGF3YWl0IHRoaXMuY29uZmlnLnNvdXJjZS5nZXQoZGF0YUtleSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhUm93ICYmIChhd2FpdCB0aGlzLmNvbnRyb2xsZXIudGhlbihjID0+IGMubG9hZFJvdyhkYXRhUm93KSkpO1xuICB9XG5cbiAgYXN5bmMgbG9hZEFuZENoZWNrTm90TnVsbChcbiAgICBrZXk6IE5vbk51bGxhYmxlPElucHV0VmFsdWVEYXRhPFQ+PlxuICApOiBQcm9taXNlPEVycm9yT3JWYWx1ZTxJbnB1dEVycm9yPFQ+LCBOb25OdWxsYWJsZTxJbnB1dFZhbHVlPFQ+Pj4+IHtcbiAgICBpZiAodGhpcy5jb25maWcubG9hZFNvdXJjZSkge1xuICAgICAgY29uc3Qgcm93ID0gYXdhaXQgdGhpcy5jb25maWcubG9hZFNvdXJjZS5nZXQoU3RyaW5nKGtleSkpO1xuICAgICAgaWYgKCFyb3cpIHtcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiSU5WQUxJRF9EQVRBX0tFWVwiLCB2YWx1ZTogdW5kZWZpbmVkIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyB2YWx1ZTogcm93IH07XG4gICAgfVxuICAgIGlmICghKGF3YWl0IHRoaXMuY29uZmlnLnNvdXJjZS5maWx0ZXIoeyAkaXM6IGtleSB9KS5oYXNSb3coKSkpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiBcIklOVkFMSURfREFUQV9LRVlcIiwgdmFsdWU6IHVuZGVmaW5lZCB9O1xuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZToga2V5IH07XG4gIH1cbn1cbiIsImltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBOdWxsYWJsZUlucHV0VmlldyB9IGZyb20gXCIuLi9udWxsYWJsZS1pbnB1dC9OdWxsYWJsZUlucHV0Vmlld1wiO1xuaW1wb3J0IHsgQW55RGF0YUlucHV0IH0gZnJvbSBcIi4vRGF0YUlucHV0XCI7XG5cbmV4cG9ydCBjbGFzcyBEYXRhSW5wdXRWaWV3PFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlEYXRhSW5wdXQ+XG4+IGV4dGVuZHMgTnVsbGFibGVJbnB1dFZpZXc8Qz4ge31cbiIsImltcG9ydCB7IG1hcE9iamVjdCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L21hcE9iamVjdFwiO1xuaW1wb3J0IHsgUGF5bG9hZCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IFJwY01hcCB9IGZyb20gXCIuLi8uLi9ycGMtbWFwL1JwY01hcFwiO1xuXG5pbXBvcnQge1xuICBBbnlJbnB1dCxcbiAgSW5wdXQsXG4gIElucHV0RWxlbWVudCxcbiAgSW5wdXRFcnJvcixcbiAgSW5wdXRWYWx1ZSxcbiAgSW5wdXRWYWx1ZURhdGEsXG4gIElucHV0VmFsdWVFbGVtZW50LFxufSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IElucHV0TWFwSGFuZGxlciB9IGZyb20gXCIuL0lucHV0TWFwSGFuZGxlclwiO1xuXG5leHBvcnQgdHlwZSBBbnlJbnB1dFJlY29yZCA9IFJlY29yZDxzdHJpbmcsIEFueUlucHV0PjtcbmV4cG9ydCB0eXBlIEFueUlucHV0TWFwID0gSW5wdXRNYXA8QW55SW5wdXRSZWNvcmQ+O1xuZXhwb3J0IHR5cGUgSW5wdXRFcnJvck1hcDxUIGV4dGVuZHMgQW55SW5wdXRSZWNvcmQ+ID0gUGF5bG9hZDx7XG4gIEVSUk9SX01BUDoge1xuICAgIGVycm9yTWFwOiB7IFtLIGluIGtleW9mIFRdOiBJbnB1dEVycm9yPFRbS10+IH07XG4gIH07XG59PjtcblxuZXhwb3J0IHR5cGUgSW5wdXRNYXA8VCBleHRlbmRzIEFueUlucHV0UmVjb3JkPiA9IElucHV0PHtcbiAgVElucHV0TWFwOiBUO1xuICBDb21tYW5kczoge307XG4gIENvbnRyb2xsZXI6IFJwY01hcDxUPjtcbiAgUHJvcHM6IHtcbiAgICB0YXJnZXRNYXA6IFQ7XG4gIH07XG4gIEVsZW1lbnQ6IHtcbiAgICBlbGVtZW50TWFwOiB7XG4gICAgICBbSyBpbiBrZXlvZiBUXTogSW5wdXRFbGVtZW50PFRbS10+O1xuICAgIH07XG4gIH07XG4gIENvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxScGNNYXA8VD4+O1xuICBFcnJvcjogSW5wdXRFcnJvck1hcDxUPjtcbiAgVmFsdWVEYXRhOiB7IFtLIGluIGtleW9mIFRdOiBJbnB1dFZhbHVlRGF0YTxUW0tdPiB9O1xuICBWYWx1ZTogeyBbSyBpbiBrZXlvZiBUXTogSW5wdXRWYWx1ZTxUW0tdPiB9O1xuICBWYWx1ZUVsZW1lbnQ6IHsgW0sgaW4ga2V5b2YgVF06IElucHV0VmFsdWVFbGVtZW50PFRbS10+IH07XG59PjtcblxuLy9cblxuZXhwb3J0IGZ1bmN0aW9uIElucHV0TWFwPFQgZXh0ZW5kcyBBbnlJbnB1dFJlY29yZD4odGFyZ2V0TWFwOiBUKTogSW5wdXRNYXA8VD4ge1xuICByZXR1cm4gPGFueT5JbnB1dDxBbnlJbnB1dE1hcD4oe1xuICAgIHByb3BzOiB7XG4gICAgICB0YXJnZXRNYXAsXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBScGNNYXAodGFyZ2V0TWFwKSxcbiAgICBoYW5kbGVyOiBJbnB1dE1hcEhhbmRsZXIsXG4gICAgZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQodmFsdWVFbGVtZW50TWFwKSB7XG4gICAgICByZXR1cm4gbWFwT2JqZWN0KHZhbHVlRWxlbWVudE1hcCwgKGl0ZW1WYWx1ZSwgaXRlbUtleSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXRNYXBbaXRlbUtleV0uZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQoaXRlbVZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgaGFzS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L2hhc0tleXNcIjtcbmltcG9ydCB7IG1hcE9iamVjdEFzeW5jIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0XCI7XG5pbXBvcnQgeyBSZXF1aXJlT3B0aW9uYWxLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgV2lkZ2V0Q29udHJvbGxlciB9IGZyb20gXCIuLi8uLi93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQgeyBBYnN0cmFjdElucHV0SGFuZGxlciB9IGZyb20gXCIuLi9BYnN0cmFjdElucHV0SGFuZGxlclwiO1xuaW1wb3J0IHtcbiAgSW5wdXRFbGVtZW50LFxuICBJbnB1dEVycm9yT3JWYWx1ZSxcbiAgSW5wdXRWYWx1ZSxcbiAgSW5wdXRWYWx1ZURhdGEsXG4gIElucHV0VmFsdWVFbGVtZW50LFxufSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IEFueUlucHV0TWFwIH0gZnJvbSBcIi4vSW5wdXRNYXBcIjtcblxudHlwZSBUID0gQW55SW5wdXRNYXA7XG5cbmV4cG9ydCBjbGFzcyBJbnB1dE1hcEhhbmRsZXIgZXh0ZW5kcyBBYnN0cmFjdElucHV0SGFuZGxlcjxUPiB7XG4gIGdldENvbnRyb2xsZXJDb25maWcoKTogUnBjVW5yZXNvbHZlZENvbmZpZzxXaWRnZXRDb250cm9sbGVyPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnO1xuICB9XG5cbiAgZ2V0VmFsdWVFbGVtZW50KFxuICAgIHZhbHVlOiBJbnB1dFZhbHVlPFQ+IHwgdW5kZWZpbmVkXG4gICk6IFByb21pc2U8SW5wdXRWYWx1ZUVsZW1lbnQ8VD4+IHtcbiAgICByZXR1cm4gbWFwT2JqZWN0QXN5bmModGhpcy5ycGMudGFyZ2V0TWFwLCAodGFyZ2V0LCBrZXkpID0+XG4gICAgICB0aGlzLmNvbnRyb2xsZXJcbiAgICAgICAgLnRoZW4oYyA9PiBjLmdldFRhcmdldEhhbmRsZXIoa2V5KSlcbiAgICAgICAgLnRoZW4oaCA9PiBoLmdldFZhbHVlRWxlbWVudCh2YWx1ZT8uW2tleV0pKVxuICAgICk7XG4gIH1cblxuICBhc3luYyBnZXRJbnB1dEVsZW1lbnQoKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPElucHV0RWxlbWVudDxUPj4+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudE1hcDogYXdhaXQgbWFwT2JqZWN0QXN5bmModGhpcy5ycGMudGFyZ2V0TWFwLCAodGFyZ2V0LCBrZXkpID0+XG4gICAgICAgIHRoaXMuY29udHJvbGxlclxuICAgICAgICAgIC50aGVuKGMgPT4gYy5nZXRUYXJnZXRIYW5kbGVyKGtleSkpXG4gICAgICAgICAgLnRoZW4oaCA9PiBoLmdldElucHV0RWxlbWVudCgpKVxuICAgICAgKSxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgbG9hZEFuZENoZWNrKFxuICAgIGRhdGFNYXA6IElucHV0VmFsdWVEYXRhPFQ+XG4gICk6IFByb21pc2U8SW5wdXRFcnJvck9yVmFsdWU8VD4+IHtcbiAgICBjb25zdCBlcnJvck1hcDogYW55ID0ge307XG4gICAgY29uc3QgdmFsdWVNYXAgPSBhd2FpdCBtYXBPYmplY3RBc3luYyh0aGlzLnJwYy50YXJnZXRNYXAsICh0YXJnZXQsIGtleSkgPT5cbiAgICAgIHRoaXMuY29udHJvbGxlclxuICAgICAgICAudGhlbihjID0+IGMuZ2V0VGFyZ2V0SGFuZGxlcihrZXkpKVxuICAgICAgICAudGhlbihoID0+IGgubG9hZEFuZENoZWNrKGRhdGFNYXBba2V5XSkpXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKFwiZXJyb3JcIiBpbiByZXN1bHQpIHtcbiAgICAgICAgICAgIGVycm9yTWFwW2tleV0gPSByZXN1bHQuZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQudmFsdWU7XG4gICAgICAgIH0pXG4gICAgKTtcblxuICAgIGlmIChoYXNLZXlzKGVycm9yTWFwKSkge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlTWFwLCBlcnJvcjogeyB0eXBlOiBcIkVSUk9SX01BUFwiLCBlcnJvck1hcCB9IH07XG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiB2YWx1ZU1hcCB9O1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIEZyYWdtZW50LCBSZWFjdEVsZW1lbnQsIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgbWFwT2JqZWN0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0XCI7XG5pbXBvcnQgeyBtYXBPYmplY3RUb0FycmF5IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0VG9BcnJheVwiO1xuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvcmVuZGVyZXJcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBXaWRnZXRDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7IEFic3RyYWN0SW5wdXRWaWV3IH0gZnJvbSBcIi4uL0Fic3RyYWN0SW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBBbnlJbnB1dENvbm5lY3Rpb24gfSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IElucHV0Vmlld1Byb3BzIH0gZnJvbSBcIi4uL0lucHV0Vmlld1wiO1xuaW1wb3J0IHsgSW5wdXRWaWV3Q2hpbGRyZW4gfSBmcm9tIFwiLi4vSW5wdXRWaWV3Q2hpbGRyZW5cIjtcbmltcG9ydCB7IEFueUlucHV0TWFwLCBBbnlJbnB1dFJlY29yZCwgSW5wdXRNYXAgfSBmcm9tIFwiLi9JbnB1dE1hcFwiO1xuXG5leHBvcnQgdHlwZSBBbnlJbnB1dE1hcENvbm5lY3Rpb24gPSBScGNDb25uZWN0aW9uPElucHV0TWFwPEFueUlucHV0UmVjb3JkPj47XG5cbmV4cG9ydCBjbGFzcyBJbnB1dE1hcFZpZXc8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPElucHV0TWFwPEFueUlucHV0UmVjb3JkPj5cbj4gZXh0ZW5kcyBBYnN0cmFjdElucHV0VmlldzxcbiAgQyxcbiAgSW5wdXRWaWV3UHJvcHM8Qz4gJiB7XG4gICAgY2hpbGRyZW4oXG4gICAgICBnZXRQcm9wczogPEsgZXh0ZW5kcyBrZXlvZiBScGNDb25uZWN0aW9uPFdpZGdldENvbnRyb2xsZXI8Qz4+PihcbiAgICAgICAga2V5OiBzdHJpbmcgJiBLXG4gICAgICApID0+IElucHV0Vmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248V2lkZ2V0Q29udHJvbGxlcjxDPj5bS10+LFxuICAgICAgdmlldzogSW5wdXRNYXBWaWV3PEM+XG4gICAgKTogUmVhY3ROb2RlO1xuICB9XG4+IHtcbiAgY2hpbGRyZW4gPSBuZXcgSW5wdXRWaWV3Q2hpbGRyZW4oKTtcblxuICBnZXRQcm9wczxLIGV4dGVuZHMga2V5b2YgUnBjQ29ubmVjdGlvbjxXaWRnZXRDb250cm9sbGVyPEM+Pj4oXG4gICAga2V5OiBzdHJpbmcgJiBLXG4gICk6IElucHV0Vmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248V2lkZ2V0Q29udHJvbGxlcjxDPj5bS10+IHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5LFxuICAgICAgY29ubmVjdGlvbjogdGhpcy5jb250cm9sbGVyW2tleV0sXG4gICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQuZWxlbWVudE1hcFtrZXldLFxuICAgICAgdmFsdWU6IHRoaXMudmFsdWU/LltrZXldLFxuICAgICAgb25FcnJvcjogdmlldyA9PiB0aGlzLnByb3BzLm9uRXJyb3I/Lih0aGlzKSxcbiAgICAgIG9uQ2hhbmdlOiB2aWV3ID0+XG4gICAgICAgIHRoaXMuc2V0VmFsdWUoe1xuICAgICAgICAgIC4uLnRoaXMudmFsdWUsXG4gICAgICAgICAgW2tleV06IHZpZXcudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgaW5wdXRSZWY6IHRoaXMuY2hpbGRyZW4ucmVmKGtleSksXG4gICAgfSBhcyBJbnB1dFZpZXdQcm9wczxScGNDb25uZWN0aW9uPFdpZGdldENvbnRyb2xsZXI8Qz4+W0tdPjtcbiAgfVxuXG4gIHJlbmRlclZpZXcoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbih0aGlzLmdldFByb3BzLmJpbmQodGhpcyksIHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgSW5wdXRNYXBWaWV3IHtcbiAgZXhwb3J0IHR5cGUgRmllbGRzUHJvcHM8XG4gICAgQyBleHRlbmRzIEFueUlucHV0TWFwQ29ubmVjdGlvbixcbiAgICBUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgQW55SW5wdXRDb25uZWN0aW9uPiA9IFJwY0Nvbm5lY3Rpb248XG4gICAgICBXaWRnZXRDb250cm9sbGVyPEM+XG4gICAgPlxuICA+ID0gSW5wdXRWaWV3UHJvcHM8Qz4gJiB7XG4gICAgZmllbGRzOiB7IFtLIGluIHN0cmluZyAmIGtleW9mIFRdOiBSZW5kZXJlcjxJbnB1dFZpZXdQcm9wczxUW0tdPj4gfTtcbiAgICBjaGlsZHJlbj86IFJlbmRlcmVyPHtcbiAgICAgIGZpZWxkczogUmVjb3JkPHN0cmluZyAmIGtleW9mIFQsIFJlYWN0RWxlbWVudD47XG4gICAgICB2aWV3OiBJbnB1dE1hcFZpZXc8Qz47XG4gICAgfT47XG4gIH07XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIEZpZWxkczxDIGV4dGVuZHMgQW55SW5wdXRNYXBDb25uZWN0aW9uPih7XG4gICAgY2hpbGRyZW4sXG4gICAgZmllbGRzOiBrZXlUb1JlbmRlcmVyLFxuICAgIC4uLnByb3BzXG4gIH06IEZpZWxkc1Byb3BzPEM+KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxJbnB1dE1hcFZpZXdcbiAgICAgICAgey4uLnByb3BzfVxuICAgICAgICBjaGlsZHJlbj17KGdldFByb3BzLCB2aWV3KSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hpbGRyZW4oe1xuICAgICAgICAgICAgICB2aWV3LFxuICAgICAgICAgICAgICBmaWVsZHM6IG1hcE9iamVjdChrZXlUb1JlbmRlcmVyLCAocmVuZGVyLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgIEZyYWdtZW50LFxuICAgICAgICAgICAgICAgICAgeyBrZXkgfSxcbiAgICAgICAgICAgICAgICAgIHJlbmRlcihnZXRQcm9wcyhrZXkpIGFzIGFueSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWFwT2JqZWN0VG9BcnJheShcbiAgICAgICAgICAgIGtleVRvUmVuZGVyZXIsXG4gICAgICAgICAgICAocmVuZGVyOiBSZW5kZXJlcjxhbnk+LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgRnJhZ21lbnQsXG4gICAgICAgICAgICAgICAgeyBrZXkgfSxcbiAgICAgICAgICAgICAgICByZW5kZXIoZ2V0UHJvcHMoa2V5KSBhcyBhbnkpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUnBjRXJyb3IgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdElucHV0SGFuZGxlciB9IGZyb20gXCIuLi9BYnN0cmFjdElucHV0SGFuZGxlclwiO1xuaW1wb3J0IHtcbiAgRXJyb3JPclZhbHVlLFxuICBJbnB1dEVycm9yLFxuICBJbnB1dEVycm9yT3JWYWx1ZSxcbiAgSW5wdXRWYWx1ZSxcbiAgSW5wdXRWYWx1ZURhdGEsXG4gIFRJbnB1dCxcbn0gZnJvbSBcIi4uL0lucHV0XCI7XG5pbXBvcnQgeyBOdWxsYWJsZUlucHV0IH0gZnJvbSBcIi4vTnVsbGFibGVJbnB1dFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3ROdWxsYWJsZUlucHV0SGFuZGxlcjxcbiAgVCBleHRlbmRzIE51bGxhYmxlSW5wdXQ8YW55LCBUSW5wdXQ+XG4+IGV4dGVuZHMgQWJzdHJhY3RJbnB1dEhhbmRsZXI8VD4ge1xuICBhYnN0cmFjdCBsb2FkQW5kQ2hlY2tOb3ROdWxsKFxuICAgIHZhbHVlRGF0YTogTm9uTnVsbGFibGU8SW5wdXRWYWx1ZURhdGE8VD4+XG4gICk6IFByb21pc2U8RXJyb3JPclZhbHVlPElucHV0RXJyb3I8VD4sIE5vbk51bGxhYmxlPElucHV0VmFsdWU8VD4+Pj47XG5cbiAgYXN5bmMgbG9hZEFuZENoZWNrKFxuICAgIHZhbHVlRGF0YTogSW5wdXRWYWx1ZURhdGE8VD5cbiAgKTogUHJvbWlzZTxJbnB1dEVycm9yT3JWYWx1ZTxUPj4ge1xuICAgIGlmICh2YWx1ZURhdGEgPT0gbnVsbCkge1xuICAgICAgaWYgKCF0aGlzLnJwYy5udWxsYWJsZSkge1xuICAgICAgICByZXR1cm4geyBlcnJvcjogXCJOT1RfTlVMTEFCTEVcIiwgdmFsdWU6IHVuZGVmaW5lZCB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgdmFsdWU6IG51bGwgfTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5sb2FkQW5kQ2hlY2tOb3ROdWxsKHZhbHVlRGF0YSk7XG4gICAgaWYgKFwiZXJyb3JcIiBpbiByZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKHJlc3VsdC52YWx1ZSA9PSBudWxsKSB7XG4gICAgICBpZiAoIXRoaXMucnBjLm51bGxhYmxlKSB7XG4gICAgICAgIHRocm93IG5ldyBScGNFcnJvcihgdmFsdWUgaXMgbnVsbGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IEFic3RyYWN0SW5wdXRWaWV3IH0gZnJvbSBcIi4uL0Fic3RyYWN0SW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBJbnB1dEVycm9yLCBUSW5wdXQgfSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IElucHV0Vmlld1Byb3BzIH0gZnJvbSBcIi4uL0lucHV0Vmlld1wiO1xuaW1wb3J0IHsgTnVsbGFibGVJbnB1dCB9IGZyb20gXCIuL051bGxhYmxlSW5wdXRcIjtcbmltcG9ydCB7IEFueURhdGFJbnB1dCB9IGZyb20gXCIuLi9kYXRhLWlucHV0L0RhdGFJbnB1dFwiO1xuXG5leHBvcnQgY2xhc3MgTnVsbGFibGVJbnB1dFZpZXc8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPE51bGxhYmxlSW5wdXQ8YW55LCBUSW5wdXQ+PlxuPiBleHRlbmRzIEFic3RyYWN0SW5wdXRWaWV3PFxuICBDLFxuICBJbnB1dFZpZXdQcm9wczxDPiAmIHtcbiAgICBjaGlsZHJlbih2aWV3OiBOdWxsYWJsZUlucHV0VmlldzxDPik6IFJlYWN0RWxlbWVudDtcbiAgfVxuPiB7XG4gIHByb3RlY3RlZCBnZXRFcnJvcigpOiBBd2FpdGFibGU8SW5wdXRFcnJvcjxDPiB8IHVuZGVmaW5lZD4ge1xuICAgIGlmICghdGhpcy5ycGMubnVsbGFibGUpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiTk9UX05VTExBQkxFXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyVmlldygpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuKHRoaXMpO1xuICB9XG59XG5cbi8vIFRPT0Q6IElucHV0Vmlld1xuIiwiaW1wb3J0IHsgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IE5vUnBjIH0gZnJvbSBcIi4uLy4uL05vUnBjXCI7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgVGV4dElucHV0RXJyb3IsIFRleHRJbnB1dE9wdGlvbnMgfSBmcm9tIFwiLi9UZXh0SW5wdXRMb2FkZXJcIjtcbmltcG9ydCB7IFZhbHVlT3JBd2FpdGFibGVGbiB9IGZyb20gXCIuLi9WYWx1ZU9yQXdhaXRhYmxlRm5cIjtcbmltcG9ydCB7IFRleHRJbnB1dEhhbmRsZXIgfSBmcm9tIFwiLi9UZXh0SW5wdXRIYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIFRleHRJbnB1dCA9IElucHV0PHtcbiAgRXJyb3I6IFRleHRJbnB1dEVycm9yO1xuXG4gIFZhbHVlRGF0YTogc3RyaW5nO1xuXG4gIENvbW1hbmRzOiB7fTtcblxuICBWYWx1ZTogc3RyaW5nO1xuXG4gIFZhbHVlRWxlbWVudDogc3RyaW5nO1xuXG4gIENvbnRyb2xsZXI6IE5vUnBjO1xuXG4gIFByb3BzOiB7fTtcblxuICBDb25maWc6XG4gICAgfCB1bmRlZmluZWRcbiAgICB8IChUZXh0SW5wdXRPcHRpb25zICYge1xuICAgICAgICBkZWZhdWx0PzogVmFsdWVPckF3YWl0YWJsZUZuPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gICAgICB9KTtcblxuICBFbGVtZW50OiBPdmVycmlkZTxcbiAgICBUZXh0SW5wdXRPcHRpb25zLFxuICAgIHtcbiAgICAgIHBhdHRlcm4/OiBzdHJpbmc7XG4gICAgfVxuICA+O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBUZXh0SW5wdXQoKTogVGV4dElucHV0IHtcbiAgcmV0dXJuIElucHV0PFRleHRJbnB1dD4oe1xuICAgIGhhbmRsZXI6IFRleHRJbnB1dEhhbmRsZXIsXG4gICAgZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdElucHV0SGFuZGxlciB9IGZyb20gXCIuLi9BYnN0cmFjdElucHV0SGFuZGxlclwiO1xuaW1wb3J0IHsgV2lkZ2V0Q29udHJvbGxlciwgV2lkZ2V0RWxlbWVudCB9IGZyb20gXCIuLi8uLi93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQge1xuICBJbnB1dEVsZW1lbnQsXG4gIElucHV0RXJyb3JPclZhbHVlLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRWYWx1ZUVsZW1lbnQsXG59IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgVGV4dElucHV0TG9hZGVyIH0gZnJvbSBcIi4vVGV4dElucHV0TG9hZGVyXCI7XG5pbXBvcnQgeyBWYWx1ZU9yQXdhaXRhYmxlRm4gfSBmcm9tIFwiLi4vVmFsdWVPckF3YWl0YWJsZUZuXCI7XG5pbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tIFwiLi9UZXh0SW5wdXRcIjtcblxudHlwZSBUID0gVGV4dElucHV0O1xuXG5leHBvcnQgY2xhc3MgVGV4dElucHV0SGFuZGxlciBleHRlbmRzIEFic3RyYWN0SW5wdXRIYW5kbGVyPFQ+IHtcbiAgYXN5bmMgZ2V0VmFsdWVFbGVtZW50KFxuICAgIHZhbHVlOiBJbnB1dFZhbHVlPFQ+IHwgdW5kZWZpbmVkXG4gICk6IFByb21pc2U8SW5wdXRWYWx1ZUVsZW1lbnQ8VD4+IHtcbiAgICByZXR1cm4gdmFsdWUgPz8gKGF3YWl0IFZhbHVlT3JBd2FpdGFibGVGbih0aGlzLmNvbmZpZy5kZWZhdWx0KSkgPz8gXCJcIjtcbiAgfVxuXG4gIGdldENvbnRyb2xsZXJDb25maWcoKTogUnBjVW5yZXNvbHZlZENvbmZpZzxXaWRnZXRDb250cm9sbGVyPFQ+PiB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGFzeW5jIGdldElucHV0RWxlbWVudCgpOiBQcm9taXNlPFJlcXVpcmVPcHRpb25hbEtleXM8SW5wdXRFbGVtZW50PFQ+Pj4ge1xuICAgIHJldHVybiB7XG4gICAgICBtaW5MZW5ndGg6IHRoaXMuY29uZmlnLm1pbkxlbmd0aCxcbiAgICAgIG1heExlbmd0aDogdGhpcy5jb25maWcubWF4TGVuZ3RoLFxuICAgICAgcGF0dGVybjogdGhpcy5jb25maWcucGF0dGVybj8uc291cmNlLFxuICAgICAgdHJpbTogdGhpcy5jb25maWcudHJpbSxcbiAgICAgIHJlcXVpcmVkOiB0aGlzLmNvbmZpZy5yZXF1aXJlZCxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgbG9hZEFuZENoZWNrKFxuICAgIHZhbHVlRGF0YTogSW5wdXRWYWx1ZURhdGE8VD5cbiAgKTogUHJvbWlzZTxJbnB1dEVycm9yT3JWYWx1ZTxUPj4ge1xuICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgVGV4dElucHV0TG9hZGVyLmxvYWQodGhpcy5jb25maWcsIHZhbHVlRGF0YSk7XG4gICAgY29uc3QgZXJyb3IgPSBUZXh0SW5wdXRMb2FkZXIuY2hlY2sodGhpcy5jb25maWcsIHZhbHVlRGF0YSk7XG4gICAgaWYgKGVycm9yICE9PSB1bmRlZmluZWQpIHJldHVybiB7IGVycm9yLCB2YWx1ZSB9O1xuICAgIHJldHVybiB7IHZhbHVlIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IFBheWxvYWQgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IGdldExlbmd0aEVycm9yLCBMZW5ndGhFcnJvciB9IGZyb20gXCIuLi9MZW5ndGhFcnJvclwiO1xuXG5leHBvcnQgdHlwZSBUZXh0SW5wdXRPcHRpb25zID0ge1xuICBwYXR0ZXJuPzogUmVnRXhwO1xuICBtaW5MZW5ndGg/OiBudW1iZXI7XG4gIG1heExlbmd0aD86IG51bWJlcjtcbiAgdHJpbT86IGJvb2xlYW47XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIFRleHRJbnB1dEVycm9yID1cbiAgfCBQYXlsb2FkPHtcbiAgICAgIElOVkFMSURfUEFUVEVSTjogeyBwYXR0ZXJuOiBzdHJpbmcgfTtcbiAgICB9PlxuICB8IExlbmd0aEVycm9yXG4gIHwgXCJSRVFVSVJFRFwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRleHRJbnB1dExvYWRlciB7XG4gIGV4cG9ydCBmdW5jdGlvbiBsb2FkKG9wdGlvbnM6IFRleHRJbnB1dE9wdGlvbnMsIHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChvcHRpb25zLnRyaW0pIHtcbiAgICAgIHZhbHVlID0gdmFsdWUudHJpbSgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gY2hlY2soXG4gICAgeyByZXF1aXJlZCwgcGF0dGVybiwgbWluTGVuZ3RoLCBtYXhMZW5ndGggfTogVGV4dElucHV0T3B0aW9ucyxcbiAgICB2YWx1ZTogc3RyaW5nXG4gICk6IFRleHRJbnB1dEVycm9yIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICBpZiAocmVxdWlyZWQpIHJldHVybiBcIlJFUVVJUkVEXCI7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHBhdHRlcm4gJiYgIXBhdHRlcm4udGVzdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwiSU5WQUxJRF9QQVRURVJOXCIsIHBhdHRlcm46IHBhdHRlcm4uc291cmNlIH07XG4gICAgfVxuXG4gICAgY29uc3QgbGVuZ3RoRXJyb3IgPSBnZXRMZW5ndGhFcnJvcih2YWx1ZSwgeyBtYXhMZW5ndGgsIG1pbkxlbmd0aCB9KTtcbiAgICBpZiAobGVuZ3RoRXJyb3IpIHJldHVybiBsZW5ndGhFcnJvcjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUaW1lb3V0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9hc3luYy9UaW1lb3V0XCI7XG5pbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyBWaWV3U3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3Qvdmlldy9WaWV3U3RhdGVcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBXaWRnZXRUeXBlIH0gZnJvbSBcIi4uLy4uL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7IEFic3RyYWN0SW5wdXRWaWV3IH0gZnJvbSBcIi4uL0Fic3RyYWN0SW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBJbnB1dEVycm9yLCBJbnB1dFZhbHVlRWxlbWVudCB9IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgSW5wdXRFcnJvckVsZW1lbnRNYXAsIElucHV0Vmlld1Byb3BzIH0gZnJvbSBcIi4uL0lucHV0Vmlld1wiO1xuaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSBcIi4vVGV4dElucHV0XCI7XG5pbXBvcnQgeyBUZXh0SW5wdXRMb2FkZXIsIFRleHRJbnB1dE9wdGlvbnMgfSBmcm9tIFwiLi9UZXh0SW5wdXRMb2FkZXJcIjtcblxuZXhwb3J0IHR5cGUgVGV4dElucHV0Vmlld1Byb3BzPFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxUZXh0SW5wdXQ+XG4+ID0gSW5wdXRWaWV3UHJvcHM8Qz47XG5cbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRWaWV3PFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxUZXh0SW5wdXQ+XG4+IGV4dGVuZHMgQWJzdHJhY3RJbnB1dFZpZXc8XG4gIEMsXG4gIFRleHRJbnB1dFZpZXdQcm9wczxDPiAmIHtcbiAgICBjaGlsZHJlbih2aWV3OiBUZXh0SW5wdXRWaWV3PEM+KTogUmVhY3RFbGVtZW50O1xuICB9XG4+IHtcbiAgQFZpZXdTdGF0ZSgpIHByb3RlY3RlZCBfdGV4dDogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCB1cGRhdGVWYWx1ZSh2YWx1ZTogSW5wdXRWYWx1ZUVsZW1lbnQ8Qz4gfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl90ZXh0ID0gdmFsdWUgfHwgXCJcIjtcbiAgfVxuXG4gIGdldCB0ZXh0KCkge1xuICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGRlYm91bmNlSWQgPSAwO1xuXG4gIHByb3RlY3RlZCBfb3B0aW9uczogVGV4dElucHV0T3B0aW9ucztcbiAgcHJvdGVjdGVkIHVwZGF0ZUVsZW1lbnQoZWxlbWVudDogV2lkZ2V0VHlwZTxDPltcIkVsZW1lbnRcIl0pIHtcbiAgICBzdXBlci51cGRhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICAuLi5lbGVtZW50LFxuICAgICAgcGF0dGVybjogZWxlbWVudC5wYXR0ZXJuID8gbmV3IFJlZ0V4cChlbGVtZW50LnBhdHRlcm4pIDogdW5kZWZpbmVkLFxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RXJyb3IoKTogQXdhaXRhYmxlPElucHV0RXJyb3I8Qz4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gVGV4dElucHV0TG9hZGVyLmNoZWNrKHRoaXMuX29wdGlvbnMsIHRoaXMudmFsdWUgfHwgXCJcIik7XG4gIH1cblxuICBhc3luYyBzZXRWYWx1ZSh2YWx1ZTogSW5wdXRWYWx1ZUVsZW1lbnQ8Qz4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gc3VwZXIuc2V0VmFsdWUoVGV4dElucHV0TG9hZGVyLmxvYWQodGhpcy5fb3B0aW9ucywgdmFsdWUpKTtcbiAgfVxuXG4gIGlucHV0V2lsbFZhbGlkYXRlKCk6IEF3YWl0YWJsZSB7XG4gICAgdGhpcy5kZWJvdW5jZUlkKys7XG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsdWUodGhpcy50ZXh0KTtcbiAgfVxuXG4gIGFzeW5jIHNldFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX3RleHQgPT09IHRleHQpIHJldHVybjtcbiAgICBjb25zdCBpZCA9ICsrdGhpcy5kZWJvdW5jZUlkO1xuICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xuICAgIHRoaXMuc2V0RXJyb3IodW5kZWZpbmVkKTtcbiAgICBhd2FpdCBUaW1lb3V0KDMwMCk7XG4gICAgaWYgKGlkICE9PSB0aGlzLmRlYm91bmNlSWQpIHJldHVybjtcbiAgICBhd2FpdCB0aGlzLnNldFZhbHVlKHRleHQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEVycm9yRWxlbWVudE1hcCgpOiBJbnB1dEVycm9yRWxlbWVudE1hcDxUZXh0SW5wdXQ+IHtcbiAgICByZXR1cm4ge1xuICAgICAgSU5WQUxJRF9QQVRURVJOOiBMYW5nYEVYUEVDVEVEX1RPX1BBVFRFUk5fJHtcInBhdHRlcm5cIn1gLFxuICAgICAgUkVRVUlSRUQ6IExhbmdgUkVRVUlSRURgLFxuICAgICAgTUFYX0xFTkdUSDogTGFuZ2BSRVFVSVJFRF9NQVhJTVVNXyR7XCJtYXhMZW5ndGhcIn1gLFxuICAgICAgTUlOX0xFTkdUSDogTGFuZ2BSRVFVSVJFRF9NSU5JTVVNXyR7XCJtaW5MZW5ndGhcIn1gLFxuICAgIH07XG4gIH1cblxuICByZW5kZXJWaWV3KCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW4odGhpcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEF3YWl0YWJsZSwgQXdhaXRlZCwgRm4gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IFJwY0ZuSGFuZGxlciB9IGZyb20gXCIuL1JwY0ZuSGFuZGxlclwiO1xuaW1wb3J0IHsgUnBjIH0gZnJvbSBcIi4uL1JwY1wiO1xuXG5leHBvcnQgdHlwZSBScGNGbjxUIGV4dGVuZHMgRm4+ID0gUnBjPHtcbiAgQ29ubmVjdGlvbjogKC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD4pID0+IFByb21pc2U8QXdhaXRlZDxSZXR1cm5UeXBlPFQ+Pj47XG4gIFByb3BzOiB7fTtcbiAgQ29uZmlnOiAoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4gQXdhaXRhYmxlPEF3YWl0ZWQ8UmV0dXJuVHlwZTxUPj4+O1xuICBIYW5kbGVyOiB7fTtcbn0+O1xuXG5leHBvcnQgdHlwZSBBbnlScGNGbiA9IFJwY0ZuPEZuPjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJwY0ZuPFQgZXh0ZW5kcyBGbiA9ICgpID0+IHZvaWQ+KCk6IFJwY0ZuPFQ+IHtcbiAgcmV0dXJuIDxhbnk+UnBjPEFueVJwY0ZuPih7XG4gICAgaXNHZW5lcmljQ29uZmlnOiBmYWxzZSxcbiAgICBpc0NvbmZpZ0ZuOiB0cnVlLFxuICAgIGhhbmRsZXI6IFJwY0ZuSGFuZGxlcixcbiAgICBjb25uZWN0KGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBhc3luYyAoLi4uYXJncykgPT4gPEF3YWl0ZWQ8UmV0dXJuVHlwZTxUPj4+YXdhaXQgaGFuZGxlcihhcmdzKTtcbiAgICB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgQW55UnBjRm4gfSBmcm9tIFwiLi9ScGNGblwiO1xuaW1wb3J0IHsgQWJzdHJhY3RScGNIYW5kbGVyLCBJUnBjSGFuZGxlciB9IGZyb20gXCIuLi9ScGNcIjtcblxudHlwZSBUID0gQW55UnBjRm47XG5cbmV4cG9ydCBjbGFzcyBScGNGbkhhbmRsZXJcbiAgZXh0ZW5kcyBBYnN0cmFjdFJwY0hhbmRsZXI8VD5cbiAgaW1wbGVtZW50cyBJUnBjSGFuZGxlcjxUPiB7XG4gIGhhbmRsZShwYXlsb2FkOiBhbnkpOiBBd2FpdGFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnKC4uLnBheWxvYWQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7XG4gIFBhcnRpYWxVbmRlZmluZWRLZXlzLFxuICBVbmRlZmluZWRJZkVtcHR5T2JqZWN0LFxufSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7XG4gIEFueVJwYyxcbiAgUnBjLFxuICBScGNDb25uZWN0aW9uLFxuICBScGNFcnJvcixcbiAgUnBjUmVzb2x2ZWRIYW5kbGVyLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxufSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQgeyBScGNNYXBIYW5kbGVyIH0gZnJvbSBcIi4vUnBjTWFwSGFuZGxlclwiO1xuXG5leHBvcnQgdHlwZSBBbnlScGNSZWNvcmQgPSBSZWNvcmQ8c3RyaW5nLCBBbnlScGM+O1xuXG5leHBvcnQgdHlwZSBBbnlScGNNYXAgPSBScGNNYXA8QW55UnBjUmVjb3JkPjtcblxuZXhwb3J0IHR5cGUgUnBjTWFwPFQgZXh0ZW5kcyBBbnlScGNSZWNvcmQ+ID0gUnBjPHtcbiAgVFJwY01hcDogVDtcblxuICBDb25uZWN0aW9uOiB7XG4gICAgW0sgaW4ga2V5b2YgVF06IFJwY0Nvbm5lY3Rpb248VFtLXT47XG4gIH07XG5cbiAgUHJvcHM6IHsgdGFyZ2V0TWFwOiBUIH07XG4gIENvbmZpZzogVW5kZWZpbmVkSWZFbXB0eU9iamVjdDxcbiAgICBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAgICAgIHtcbiAgICAgICAgW0sgaW4ga2V5b2YgVF06IFJwY1VucmVzb2x2ZWRDb25maWc8VFtLXT47XG4gICAgICB9XG4gICAgPlxuICA+O1xuICBIYW5kbGVyOiB7XG4gICAgZ2V0VGFyZ2V0SGFuZGxlcjxLIGV4dGVuZHMga2V5b2YgVD4oXG4gICAgICBrZXk6IEtcbiAgICApOiBQcm9taXNlPFJwY1Jlc29sdmVkSGFuZGxlcjxUW0tdPj47XG4gIH07XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJwY01hcDxUIGV4dGVuZHMgQW55UnBjUmVjb3JkPih0YXJnZXRNYXA6IFQpOiBScGNNYXA8VD4ge1xuICByZXR1cm4gPGFueT5ScGM8QW55UnBjTWFwPih7XG4gICAgcHJvcHM6IHtcbiAgICAgIHRhcmdldE1hcDogdGFyZ2V0TWFwLFxuICAgIH0sXG4gICAgaGFuZGxlcjogUnBjTWFwSGFuZGxlcixcbiAgICBjb25uZWN0KGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBtYXBPYmplY3QodGhpcy50YXJnZXRNYXAsICh0YXJnZXQsIGtleSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiB0YXJnZXQuY3JlYXRlUnBjQ29ubmVjdGlvbihwYXlsb2FkID0+IGhhbmRsZXIoW2tleSwgcGF5bG9hZF0pKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBScGNFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJwY0Vycm9yKGBhdCBrZXk6JHtrZXl9LCAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHtcbiAgQWJzdHJhY3RScGNIYW5kbGVyLFxuICBBbnlScGMsXG4gIElScGNIYW5kbGVyLFxuICBScGNSZXNvbHZlZEhhbmRsZXIsXG4gIFJwY1R5cGUsXG59IGZyb20gXCIuLi9ScGNcIjtcbmltcG9ydCB7IEFueVJwY01hcCB9IGZyb20gXCIuL1JwY01hcFwiO1xuXG5leHBvcnQgY2xhc3MgUnBjTWFwSGFuZGxlcjxSIGV4dGVuZHMgQW55UnBjTWFwLCBUIGV4dGVuZHMgUnBjVHlwZTxSPltcIlRScGNNYXBcIl0+XG4gIGV4dGVuZHMgQWJzdHJhY3RScGNIYW5kbGVyPFI+XG4gIGltcGxlbWVudHMgSVJwY0hhbmRsZXI8QW55UnBjTWFwPiB7XG4gIGhhbmRsZShba2V5LCBwYXlsb2FkXSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGFyZ2V0SGFuZGxlcihrZXkpLnRoZW4oYyA9PiBjLmhhbmRsZShwYXlsb2FkKSk7XG4gIH1cblxuICBnZXRUYXJnZXRIYW5kbGVyKGtleTogc3RyaW5nKTogUHJvbWlzZTxScGNSZXNvbHZlZEhhbmRsZXI8QW55UnBjPj4ge1xuICAgIHJldHVybiB0aGlzLnJwYy50YXJnZXRNYXBba2V5XS5yZXNvbHZlUnBjSGFuZGxlcih0aGlzLmNvbmZpZ1trZXldKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29uZmlnRmFjdG9yeSB9IGZyb20gXCIuLi9Db25maWdGYWN0b3J5XCI7XG5pbXBvcnQgeyBBbnlScGMsIFJwYywgUnBjQ29ubmVjdGlvbiwgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi9ScGNcIjtcbmltcG9ydCB7IFJwY1BhcmFtZXRlckhhbmRsZXIgfSBmcm9tIFwiLi9ScGNQYXJhbWV0ZXJIYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIFRScGNQYXJhbWV0ZXIgPSB7IFRhcmdldDogQW55UnBjOyBEYXRhOiBhbnkgfTtcblxudHlwZSBUZXN0UnBjID0gUnBjPHtcbiAgSGFuZGxlcjoge307XG4gIENvbm5lY3Rpb246IHt9O1xuICBQcm9wczoge307XG4gIENvbmZpZzogQ29uZmlnRmFjdG9yeTxhbnk+O1xufT47XG5cbmV4cG9ydCB0eXBlIFJwY1BhcmFtZXRlcjxUIGV4dGVuZHMgVFJwY1BhcmFtZXRlcj4gPSBScGM8e1xuICBUUGFyYW1ldGVyOiBUO1xuXG4gIEhhbmRsZXI6IHt9O1xuXG4gIENvbm5lY3Rpb246IChkYXRhOiBUW1wiRGF0YVwiXSkgPT4gUnBjQ29ubmVjdGlvbjxUW1wiVGFyZ2V0XCJdPjtcblxuICBQcm9wczoge1xuICAgIHBhcmFtZXRlclRhcmdldDogVFtcIlRhcmdldFwiXTtcbiAgICBwYXJhbWV0ZXJEYXRhVHlwZTogKG9iajogYW55KSA9PiBUW1wiRGF0YVwiXTtcbiAgfTtcblxuICBDb25maWc6IENvbmZpZ0ZhY3Rvcnk8UnBjVW5yZXNvbHZlZENvbmZpZzxUW1wiVGFyZ2V0XCJdPiwgW1RbXCJEYXRhXCJdXT47XG59PjtcbmV4cG9ydCB0eXBlIEFueVJwY1BhcmFtZXRlciA9IFJwY1BhcmFtZXRlcjxUUnBjUGFyYW1ldGVyPjtcblxuLy8gVE9ETzogUGFyYW1ldGVyVHlwZVJlZlxuZXhwb3J0IGZ1bmN0aW9uIFJwY1BhcmFtZXRlcjxUYXJnZXQgZXh0ZW5kcyBBbnlScGMsIERhdGE+KFxuICBkYXRhVHlwZTogKG9iajogYW55KSA9PiBEYXRhLFxuICB0YXJnZXQ6IFRhcmdldFxuKTogUnBjUGFyYW1ldGVyPHsgRGF0YTogRGF0YTsgVGFyZ2V0OiBUYXJnZXQgfT4ge1xuICByZXR1cm4gPGFueT5ScGM8QW55UnBjUGFyYW1ldGVyPih7XG4gICAgaXNHZW5lcmljQ29uZmlnOiBmYWxzZSxcbiAgICBpc0NvbmZpZ0ZuOiBmYWxzZSxcbiAgICBoYW5kbGVyOiBScGNQYXJhbWV0ZXJIYW5kbGVyLFxuICAgIHByb3BzOiB7IHBhcmFtZXRlclRhcmdldDogdGFyZ2V0LCBwYXJhbWV0ZXJEYXRhVHlwZTogZGF0YVR5cGUgfSxcbiAgICBjb25uZWN0KGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBkYXRhID0+XG4gICAgICAgIHRoaXMucGFyYW1ldGVyVGFyZ2V0LmNyZWF0ZVJwY0Nvbm5lY3Rpb24ocGF5bG9hZCA9PlxuICAgICAgICAgIGhhbmRsZXIoW2RhdGEsIHBheWxvYWRdKVxuICAgICAgICApO1xuICAgIH0sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgQ29uZmlnRmFjdG9yeSB9IGZyb20gXCIuLi9Db25maWdGYWN0b3J5XCI7XG5pbXBvcnQgeyBBYnN0cmFjdFJwY0hhbmRsZXIsIElScGNIYW5kbGVyIH0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgQW55UnBjUGFyYW1ldGVyIH0gZnJvbSBcIi4vUnBjUGFyYW1ldGVyXCI7XG5cbnR5cGUgVCA9IEFueVJwY1BhcmFtZXRlcjtcblxuZXhwb3J0IGNsYXNzIFJwY1BhcmFtZXRlckhhbmRsZXJcbiAgZXh0ZW5kcyBBYnN0cmFjdFJwY0hhbmRsZXI8VD5cbiAgaW1wbGVtZW50cyBJUnBjSGFuZGxlcjxUPiB7XG4gIGFzeW5jIGhhbmRsZShbZGF0YSwgcGF5bG9hZF0pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgdGhpcy5ycGMucGFyYW1ldGVyRGF0YVR5cGUoZGF0YSk7XG4gICAgY29uc3QgdGFyZ2V0Q29uZmlnID0gYXdhaXQgQ29uZmlnRmFjdG9yeSh0aGlzLmNvbmZpZywgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzLnJwYy5wYXJhbWV0ZXJUYXJnZXRcbiAgICAgIC5yZXNvbHZlUnBjSGFuZGxlcih0YXJnZXRDb25maWcpXG4gICAgICAudGhlbihjID0+IGMuaGFuZGxlKHBheWxvYWQpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTGF6eSB9IGZyb20gXCIuLi8uLi9jb21tb24vcGF0dGVybnMvbGF6eVwiO1xuaW1wb3J0IHsgUmVxdWlyZU9wdGlvbmFsS2V5cyB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHtcbiAgQWJzdHJhY3RScGNIYW5kbGVyLFxuICBJUnBjSGFuZGxlcixcbiAgUnBjUmVzb2x2ZWRIYW5kbGVyLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxufSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQge1xuICBBbnlXaWRnZXQsXG4gIElXaWRnZXQsXG4gIFRXaWRnZXQsXG4gIFdpZGdldENvbnRyb2xsZXIsXG4gIFdpZGdldEVsZW1lbnQsXG4gIFdpZGdldFR5cGUsXG59IGZyb20gXCIuL1dpZGdldFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RXaWRnZXRIYW5kbGVyPFxuICAgIFIgZXh0ZW5kcyBBbnlXaWRnZXQsXG4gICAgVCBleHRlbmRzIFRXaWRnZXQgPSBXaWRnZXRUeXBlPFI+XG4gID5cbiAgZXh0ZW5kcyBBYnN0cmFjdFJwY0hhbmRsZXI8Uj5cbiAgaW1wbGVtZW50cyBJUnBjSGFuZGxlcjxJV2lkZ2V0PiB7XG4gIGFic3RyYWN0IGdldENvbnRyb2xsZXJDb25maWcoKTogUnBjVW5yZXNvbHZlZENvbmZpZzxXaWRnZXRDb250cm9sbGVyPFI+PjtcblxuICBhYnN0cmFjdCBnZXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxXaWRnZXRFbGVtZW50PFI+Pj47XG5cbiAgQExhenkoKSBnZXQgY29udHJvbGxlcigpOiBQcm9taXNlPFJwY1Jlc29sdmVkSGFuZGxlcjxXaWRnZXRDb250cm9sbGVyPFI+Pj4ge1xuICAgIHJldHVybiB0aGlzLnJwYy53aWRnZXQuY29udHJvbGxlci5yZXNvbHZlUnBjSGFuZGxlcihcbiAgICAgIHRoaXMuZ2V0Q29udHJvbGxlckNvbmZpZygpXG4gICAgKSBhcyBQcm9taXNlPFJwY1Jlc29sdmVkSGFuZGxlcjxXaWRnZXRDb250cm9sbGVyPFI+Pj47XG4gIH1cblxuICBhc3luYyBoYW5kbGUoW2tleSwgcGF5bG9hZF06IFtzdHJpbmcsIGFueV0pOiBQcm9taXNlPGFueT4ge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIFwiZ2V0RWxlbWVudFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICBjYXNlIFwiY29udHJvbGxlclwiOlxuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLnRoZW4oaGFuZGxlciA9PiBoYW5kbGVyLmhhbmRsZShwYXlsb2FkKSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zdCBoYW5kbGVyID0gdGhpcy5ycGMud2lkZ2V0LmNvbW1hbmRzW2tleV07XG4gICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gY29tbWFuZCBoYW5kbGVyIGZvciBcIiR7a2V5fVwiLmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzW2hhbmRsZXJdKC4uLnBheWxvYWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuLi8uLi9yZWFjdC92aWV3L1ZpZXdcIjtcbmltcG9ydCB7IFZpZXdTdGF0ZSB9IGZyb20gXCIuLi8uLi9yZWFjdC92aWV3L1ZpZXdTdGF0ZVwiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi9ScGNcIjtcbmltcG9ydCB7XG4gIEFueVdpZGdldCxcbiAgQW55V2lkZ2V0Q29ubmVjdGlvbixcbiAgV2lkZ2V0LFxuICBXaWRnZXRDb250cm9sbGVyLFxuICBXaWRnZXRFbGVtZW50LFxuICBXaWRnZXRUeXBlLFxufSBmcm9tIFwiLi9XaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFZpZXcsIFdpZGdldFZpZXdQcm9wcyB9IGZyb20gXCIuL1dpZGdldFZpZXdcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0V2lkZ2V0VmlldzxcbiAgICBDIGV4dGVuZHMgQW55V2lkZ2V0Q29ubmVjdGlvbixcbiAgICBQIGV4dGVuZHMgV2lkZ2V0Vmlld1Byb3BzPEM+ID0gV2lkZ2V0Vmlld1Byb3BzPEM+XG4gID5cbiAgZXh0ZW5kcyBWaWV3PFA+XG4gIGltcGxlbWVudHMgV2lkZ2V0VmlldzxDPiB7XG4gIEBWaWV3U3RhdGUoXCJmb3JjZVVwZGF0ZUVsZW1lbnRcIikgX2VsZW1lbnQ6IFdpZGdldEVsZW1lbnQ8Qz47XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUVsZW1lbnQ/KGVsZW1lbnQ6IFdpZGdldEVsZW1lbnQ8Qz4pOiB2b2lkO1xuXG4gIGdldCBlbGVtZW50KCk6IFdpZGdldEVsZW1lbnQ8Qz4ge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICB9XG5cbiAgc2V0RWxlbWVudChlbGVtZW50OiBXaWRnZXRFbGVtZW50PEM+KSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBnZXQgcnBjKCk6IFdpZGdldDxXaWRnZXRUeXBlPEM+PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY29ubmVjdGlvbi5ycGMgYXMgYW55O1xuICB9XG5cbiAgZ2V0IGNvbnRyb2xsZXIoKTogUnBjQ29ubmVjdGlvbjxXaWRnZXRDb250cm9sbGVyPEM+PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY29ubmVjdGlvbi5jb250cm9sbGVyO1xuICB9XG5cbiAgZ2V0IGNvbm5lY3Rpb24oKTogQyB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY29ubmVjdGlvbjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLnByb3BzLmVsZW1lbnQ7XG4gICAgdGhpcy51cGRhdGVFbGVtZW50Py4odGhpcy5wcm9wcy5lbGVtZW50KTtcbiAgfVxuXG4gIGZvcmNlVXBkYXRlRWxlbWVudCgpIHtcbiAgICB0aGlzLnVwZGF0ZUVsZW1lbnQ/Lih0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgdXBkYXRlVmlld1Byb3BzKHByZXZQcm9wczogUmVhZG9ubHk8UD4sIG5leHRQcm9wczogUmVhZG9ubHk8UD4pOiB2b2lkIHtcbiAgICBpZiAobmV4dFByb3BzLmVsZW1lbnQgIT09IHByZXZQcm9wcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLl9lbGVtZW50ID0gbmV4dFByb3BzLmVsZW1lbnQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB0eXBlIFdpZGdldFZpZXdDbGFzczxUIGV4dGVuZHMgQW55V2lkZ2V0PiA9IG5ldyAoXG4gIHByb3BzOiBXaWRnZXRWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxUPj5cbikgPT4gQWJzdHJhY3RXaWRnZXRWaWV3PFJwY0Nvbm5lY3Rpb248VD4+O1xuIiwiaW1wb3J0IHsgRXhwZWN0LCBOdWxsYWJsZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyKHZhbHVlOiBhbnkpOiBudW1iZXIge1xuICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG51bGxhYmxlPFQ+KHR5cGU6ICh2YWx1ZTogYW55KSA9PiBUKTogQ29sdW1uVHlwZTxUIHwgTnVsbGFibGU+IHtcbiAgcmV0dXJuIHZhbHVlID0+IHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkgcmV0dXJuIHR5cGUodmFsdWUpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpO1xufVxuXG5udW1iZXIuZW51bSA9IGZ1bmN0aW9uIDxUIGV4dGVuZHMgbnVtYmVyPigpOiBDb2x1bW5UeXBlPFQ+IHtcbiAgcmV0dXJuIDxhbnk+bnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGJvb2xlYW4odmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG59XG5cbmV4cG9ydCB0eXBlIENvbHVtblR5cGU8VD4gPSAodmFsdWU6IGFueSkgPT4gVDtcbmV4cG9ydCB0eXBlIEFueUNvbHVtblR5cGUgPSBDb2x1bW5UeXBlPGFueT47XG5cbmV4cG9ydCB0eXBlIEFueVJvd1R5cGUgPSBSZWNvcmQ8c3RyaW5nLCBBbnlDb2x1bW5UeXBlPjtcblxuZXhwb3J0IHR5cGUgUm93PFQgZXh0ZW5kcyBBbnlSb3dUeXBlPiA9IHsgW0sgaW4ga2V5b2YgVF06IFJldHVyblR5cGU8VFtLXT4gfTtcbmV4cG9ydCB0eXBlIENvbHVtbjxUIGV4dGVuZHMgQW55Q29sdW1uVHlwZT4gPSBSZXR1cm5UeXBlPFQ+O1xuXG5leHBvcnQgdHlwZSBBbnlQcmltaXRpdmVDb2x1bW5UeXBlID0gRXhwZWN0PFxuICBBbnlDb2x1bW5UeXBlLFxuICB0eXBlb2Ygc3RyaW5nIHwgdHlwZW9mIG51bWJlciB8IHR5cGVvZiBib29sZWFuXG4+O1xuIiwiaW1wb3J0IHsgZW50cmllcyB9IGZyb20gXCIuLi8uLi9jb21tb24vb2JqZWN0L2VudHJpZXNcIjtcbmltcG9ydCB7IG1lcmdlRGVzY3JpcHRvcnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9tZXJnZURlc2NyaXB0b3JzXCI7XG5pbXBvcnQgeyBjYXBpdGFsaXplIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zdHJpbmcvY2FwaXRhbGl6ZVwiO1xuaW1wb3J0IHtcbiAgRm4sXG4gIElmLFxuICBJcyxcbiAgSXNFbXB0eU9iamVjdCxcbiAgT3ZlcnJpZGUsXG4gIFBhcnRpYWxVbmRlZmluZWRLZXlzLFxuICBVbmlvbixcbn0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBOb1JwYyB9IGZyb20gXCIuLi9Ob1JwY1wiO1xuaW1wb3J0IHtcbiAgQW55UnBjLFxuICBCYXNlZFJwYyxcbiAgSVJwY0hhbmRsZXIsXG4gIFJwYyxcbiAgUnBjQ29tbWFuZCxcbiAgUnBjQ29ubmVjdGlvbixcbiAgUnBjSGFuZGxlckNsYXNzLFxuICBScGNJc0dlbmVyaWNDb25maWdPcHRpb24sXG4gIFJwY1Byb3BzT3B0aW9uLFxuICBScGNUeXBlLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxuICBUUnBjLFxufSBmcm9tIFwiLi4vUnBjXCI7XG5cbnR5cGUgX1dpZGdldENvbm5lY3Rpb248VCBleHRlbmRzIFRXaWRnZXQ+ID0gVFtcIkNvbm5lY3Rpb25cIl0gJiB7XG4gIHJwYzogV2lkZ2V0PFQ+O1xuICBycGNDb21tYW5kOiBScGNDb21tYW5kO1xuICBjb250cm9sbGVyOiBScGNDb25uZWN0aW9uPFRbXCJDb250cm9sbGVyXCJdPjtcblxuICBnZXRFbGVtZW50KCk6IFByb21pc2U8VFtcIkVsZW1lbnRcIl0+O1xuXG4gIGNvbW1hbmQ8SyBleHRlbmRzIGtleW9mIFRbXCJDb21tYW5kc1wiXT4oXG4gICAga2V5OiBzdHJpbmcgJiBLLFxuICAgIC4uLmFyZ3M6IFBhcmFtZXRlcnM8VFtcIkNvbW1hbmRzXCJdW0tdPlxuICApOiBQcm9taXNlPFJldHVyblR5cGU8VFtcIkNvbW1hbmRzXCJdW0tdPj47XG59O1xuXG5leHBvcnQgdHlwZSBUV2lkZ2V0ID0ge1xuICBDb25uZWN0aW9uOiBvYmplY3Q7XG4gIENvbmZpZzogVFJwY1tcIkNvbmZpZ1wiXTtcbiAgSGFuZGxlcjogVFJwY1tcIkhhbmRsZXJcIl07XG4gIFByb3BzOiBUUnBjW1wiUHJvcHNcIl07XG4gIEVsZW1lbnQ6IG9iamVjdDtcbiAgQ29udHJvbGxlcjogQW55UnBjO1xuICBDb21tYW5kczogUmVjb3JkPHN0cmluZywgRm4gJiB7IGhhbmRsZXI6IHN0cmluZyB9Pjtcbn07XG5cbmV4cG9ydCB0eXBlIFdpZGdldDxcbiAgVCBleHRlbmRzIFRXaWRnZXQsXG4gIEMgZXh0ZW5kcyBUV2lkZ2V0W1wiQ29tbWFuZHNcIl0gPSBUW1wiQ29tbWFuZHNcIl1cbj4gPSBScGM8e1xuICBUV2lkZ2V0OiBUO1xuXG4gIENvbmZpZzogVFtcIkNvbmZpZ1wiXTtcblxuICBIYW5kbGVyOiBUW1wiSGFuZGxlclwiXSAmIHtcbiAgICBnZXRFbGVtZW50KCk6IFByb21pc2U8VFtcIkVsZW1lbnRcIl0+O1xuICAgIGdldENvbnRyb2xsZXJDb25maWcoKTogUnBjVW5yZXNvbHZlZENvbmZpZzxUW1wiQ29udHJvbGxlclwiXT47XG4gIH07XG5cbiAgUHJvcHM6IFRbXCJQcm9wc1wiXSAmIHtcbiAgICB3aWRnZXQ6IHtcbiAgICAgIG9wdGlvbnM6IFdpZGdldE9wdGlvbnM8VFdpZGdldD47XG4gICAgICBjb21tYW5kczogUmVjb3JkPGtleW9mIFRbXCJDb21tYW5kc1wiXSwgc3RyaW5nPjtcbiAgICAgIGNvbm5lY3Rpb246IF9XaWRnZXRDb25uZWN0aW9uPFQ+O1xuICAgICAgY29udHJvbGxlcjogVFtcIkNvbnRyb2xsZXJcIl07XG4gICAgfTtcbiAgfTtcblxuICBDb25uZWN0aW9uOiBfV2lkZ2V0Q29ubmVjdGlvbjxUPjtcbn0+O1xuXG5leHBvcnQgdHlwZSBXaWRnZXRDb250cm9sbGVyT3B0aW9uPFQgZXh0ZW5kcyBQaWNrPFRXaWRnZXQsIFwiQ29udHJvbGxlclwiPj4gPVxuICB8IFRbXCJDb250cm9sbGVyXCJdXG4gIHwgSWY8SXM8VFtcIkNvbnRyb2xsZXJcIl0sIE5vUnBjPiwgdW5kZWZpbmVkPjtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0Q29tbWFuZHNPcHRpb248XG4gIFQgZXh0ZW5kcyBQaWNrPFRXaWRnZXQsIFwiQ29tbWFuZHNcIj4sXG4gIEMgZXh0ZW5kcyBUV2lkZ2V0W1wiQ29tbWFuZHNcIl0gPSBUW1wiQ29tbWFuZHNcIl1cbj4gPVxuICB8IHsgW0sgaW4ga2V5b2YgVFtcIkNvbW1hbmRzXCJdXTogQ1tLXVtcImhhbmRsZXJcIl0gfVxuICB8IElmPElzRW1wdHlPYmplY3Q8VFtcIkNvbW1hbmRzXCJdPiwgdW5kZWZpbmVkPjtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0T3B0aW9uczxUIGV4dGVuZHMgVFdpZGdldD4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAge1xuICAgIGlzR2VuZXJpY0NvbmZpZzogUnBjSXNHZW5lcmljQ29uZmlnT3B0aW9uPFQ+O1xuXG4gICAgcHJvcHM6IFJwY1Byb3BzT3B0aW9uPFQ+O1xuXG4gICAgY29udHJvbGxlcjogV2lkZ2V0Q29udHJvbGxlck9wdGlvbjxUPjtcblxuICAgIGNvbW1hbmRzOiBXaWRnZXRDb21tYW5kc09wdGlvbjxUPjtcblxuICAgIGNvbm5lY3Rpb246XG4gICAgICB8IHtcbiAgICAgICAgICBbSyBpbiBrZXlvZiBUW1wiQ29ubmVjdGlvblwiXV06IChcbiAgICAgICAgICAgIGNvbm5lY3Rpb246IF9XaWRnZXRDb25uZWN0aW9uPFQ+XG4gICAgICAgICAgKSA9PiBUW1wiQ29ubmVjdGlvblwiXVtLXTtcbiAgICAgICAgfVxuICAgICAgfCBJZjxJc0VtcHR5T2JqZWN0PFRbXCJDb25uZWN0aW9uXCJdPiwgdW5kZWZpbmVkPjtcbiAgfSxcbiAge1xuICAgIGhhbmRsZXI6IFdpZGdldEhhbmRsZXJDbGFzczxXaWRnZXQ8VD4+O1xuICB9XG4+O1xuXG5leHBvcnQgdHlwZSBXaWRnZXRIYW5kbGVyQ2xhc3M8XG4gIFIgZXh0ZW5kcyBBbnlXaWRnZXQsXG4gIEMgZXh0ZW5kcyBUV2lkZ2V0W1wiQ29tbWFuZHNcIl0gPSBXaWRnZXRUeXBlPFI+W1wiQ29tbWFuZHNcIl1cbj4gPSBScGNIYW5kbGVyQ2xhc3M8UiwgX1dpZGdldENvbW1hbmRIYW5kbGVyTWFwPFI+PjtcblxudHlwZSBfV2lkZ2V0Q29tbWFuZEhhbmRsZXJNYXA8XG4gIFIgZXh0ZW5kcyBCYXNlZFdpZGdldCxcbiAgQyBleHRlbmRzIFRXaWRnZXRbXCJDb21tYW5kc1wiXSA9IFdpZGdldFR5cGU8Uj5bXCJDb21tYW5kc1wiXVxuPiA9IHtcbiAgW0hLIGluIFVuaW9uPHsgW0sgaW4ga2V5b2YgQ106IENbS11bXCJoYW5kbGVyXCJdIH0+XTogVW5pb248XG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgQ106IENbS11bXCJoYW5kbGVyXCJdIGV4dGVuZHMgSEtcbiAgICAgICAgPyAoLi4uYXJnczogUGFyYW1ldGVyczxDW0tdPikgPT4gUHJvbWlzZTxSZXR1cm5UeXBlPENbS10+PlxuICAgICAgICA6IG5ldmVyO1xuICAgIH1cbiAgPjtcbn07XG5cbmV4cG9ydCB0eXBlIElXaWRnZXRIYW5kbGVyPFxuICBSIGV4dGVuZHMgQW55V2lkZ2V0LFxuICBDIGV4dGVuZHMgVFdpZGdldFtcIkNvbW1hbmRzXCJdID0gV2lkZ2V0VHlwZTxSPltcIkNvbW1hbmRzXCJdXG4+ID0gSVJwY0hhbmRsZXI8Uj4gJiBfV2lkZ2V0Q29tbWFuZEhhbmRsZXJNYXA8Uj47XG5cbmV4cG9ydCBjb25zdCBBbnlXaWRnZXRDb25uZWN0aW9uOiBfV2lkZ2V0Q29ubmVjdGlvbjxUV2lkZ2V0PiA9IHtcbiAgZ2V0IHJwYygpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9LFxuICBnZXQgcnBjQ29tbWFuZCgpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9LFxuICBnZXQgY29udHJvbGxlcigpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9LFxuICBjb21tYW5kKGtleSwgLi4uYXJncykge1xuICAgIHJldHVybiB0aGlzLnJwY0NvbW1hbmQoW2tleSwgYXJnc10pO1xuICB9LFxuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJwY0NvbW1hbmQoW1wiZ2V0RWxlbWVudFwiLCBbXV0pO1xuICB9LFxufTtcblxuZXhwb3J0IHR5cGUgQW55V2lkZ2V0ID0gV2lkZ2V0PFRXaWRnZXQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gV2lkZ2V0PFIgZXh0ZW5kcyBBbnlXaWRnZXQsIFQgZXh0ZW5kcyBUV2lkZ2V0ID0gV2lkZ2V0VHlwZTxSPj4oXG4gIG9wdGlvbnM6IFdpZGdldE9wdGlvbnM8VD5cbik6IFdpZGdldDxUPiB7XG4gIGNvbnN0IHtcbiAgICBpc0dlbmVyaWNDb25maWcgPSBmYWxzZSxcbiAgICBwcm9wcyA9IHt9LFxuICAgIGhhbmRsZXIsXG4gICAgY29tbWFuZHMsXG4gICAgY29udHJvbGxlcixcbiAgICBjb25uZWN0aW9uOiBjb25uZWN0aW9uRGVzY3JpcHRvcnMsXG4gIH0gPSBvcHRpb25zIGFzIFdpZGdldE9wdGlvbnM8VFdpZGdldD47XG5cbiAgbGV0IGNvbm5lY3Rpb24gPSBPYmplY3QuY3JlYXRlKEFueVdpZGdldENvbm5lY3Rpb24pO1xuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMoY29ubmVjdGlvbkRlc2NyaXB0b3JzKSkge1xuICAgIGNvbnN0IGN1cnJlbnRLZXkgPSBcImN1cnJlbnRcIiArIGNhcGl0YWxpemUoa2V5KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29ubmVjdGlvbiwga2V5LCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIGlmICghKGN1cnJlbnRLZXkgaW4gdGhpcykpIHtcbiAgICAgICAgICB0aGlzW2N1cnJlbnRLZXldID0gdmFsdWUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNbY3VycmVudEtleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIDxhbnk+UnBjPEFueVdpZGdldD4oe1xuICAgIGhhbmRsZXIsXG4gICAgaXNHZW5lcmljQ29uZmlnLFxuICAgIHByb3BzOiBtZXJnZURlc2NyaXB0b3JzKHByb3BzIGFzIHt9LCB7XG4gICAgICB3aWRnZXQ6IHtcbiAgICAgICAgY29udHJvbGxlcjogY29udHJvbGxlciB8fCBOb1JwYyxcbiAgICAgICAgb3B0aW9uczogPFdpZGdldE9wdGlvbnM8VFdpZGdldD4+b3B0aW9ucyxcbiAgICAgICAgY29tbWFuZHM6IGNvbW1hbmRzIHx8IHt9LFxuICAgICAgICBjb25uZWN0aW9uOiBjb25uZWN0aW9uLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBjb25uZWN0KGNvbW1hbmQpIHtcbiAgICAgIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YoXG4gICAgICAgIHtcbiAgICAgICAgICBycGM6IHRoaXMsXG4gICAgICAgICAgcnBjQ29tbWFuZDogY29tbWFuZCxcbiAgICAgICAgICBjb250cm9sbGVyOiB0aGlzLndpZGdldC5jb250cm9sbGVyLmNyZWF0ZVJwY0Nvbm5lY3Rpb24ocGF5bG9hZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29tbWFuZChbXCJjb250cm9sbGVyXCIsIHBheWxvYWRdKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgdGhpcy53aWRnZXQuY29ubmVjdGlvblxuICAgICAgKTtcbiAgICB9LFxuICB9KTtcbn1cblxuLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgdHlwZSBBbnlXaWRnZXRDb25uZWN0aW9uID0gUnBjQ29ubmVjdGlvbjxBbnlXaWRnZXQ+O1xuXG5leHBvcnQgdHlwZSBCYXNlZFdpZGdldDxUIGV4dGVuZHMgVFdpZGdldCA9IFRXaWRnZXQ+ID0gQmFzZWRScGM8XG4gIFJwY1R5cGU8V2lkZ2V0PFQ+PlxuPjtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0VHlwZTxUIGV4dGVuZHMgQmFzZWRXaWRnZXQ+ID0gUnBjVHlwZTxUPltcIlRXaWRnZXRcIl07XG5cbmV4cG9ydCB0eXBlIFdpZGdldEVsZW1lbnQ8VCBleHRlbmRzIEJhc2VkV2lkZ2V0PiA9IFdpZGdldFR5cGU8VD5bXCJFbGVtZW50XCJdO1xuXG5leHBvcnQgdHlwZSBXaWRnZXRDb250cm9sbGVyPFQgZXh0ZW5kcyBCYXNlZFdpZGdldD4gPSBXaWRnZXRUeXBlPFxuICBUXG4+W1wiQ29udHJvbGxlclwiXTtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0SG9vazxcbiAgUiBleHRlbmRzIEFueVdpZGdldCxcbiAgVCBleHRlbmRzIFBhcnRpYWw8VFdpZGdldD5cbj4gPSBXaWRnZXQ8RXh0cmFjdDxPdmVycmlkZTxXaWRnZXRUeXBlPFI+LCBUPiwgVFdpZGdldD4+O1xuXG5leHBvcnQgdHlwZSBJV2lkZ2V0ID0gV2lkZ2V0PFxuICBPdmVycmlkZTxcbiAgICBUV2lkZ2V0LFxuICAgIHtcbiAgICAgIENvbW1hbmRzOiB7fTtcbiAgICB9XG4gID5cbj47XG4iLCJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBGbiwgT21pdEtleXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IFJlYWN0Um91dGVyLCBSZWFjdFJvdXRlck9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vdHlwZXJvdXRlcjIvUmVhY3RSb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlciwgVFJvdXRlciB9IGZyb20gXCIuLi8uLi90eXBlcm91dGVyMi9Sb3V0ZXJcIjtcbmltcG9ydCB7IEFueVdpZGdldENvbm5lY3Rpb24gfSBmcm9tIFwiLi9XaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFZpZXdQcm9wcyB9IGZyb20gXCIuL1dpZGdldFZpZXdcIjtcbmltcG9ydCB7IFdpZGdldFZpZXdMb2FkZXIgfSBmcm9tIFwiLi9XaWRnZXRWaWV3TG9hZGVyXCI7XG5cbmV4cG9ydCB0eXBlIFdpZGdldFZpZXdSb3V0ZXJPcHRpb25zPFxuICBUIGV4dGVuZHMgVFJvdXRlcixcbiAgQyBleHRlbmRzIEFueVdpZGdldENvbm5lY3Rpb25cbj4gPSBPbWl0S2V5czxSZWFjdFJvdXRlck9wdGlvbnM8VD4sIFwicmVuZGVySW5kZXhcIj4gJiB7XG4gIHJlbmRlcldpZGdldChcbiAgICBwcm9wczogV2lkZ2V0Vmlld1Byb3BzPEM+LFxuICAgIGluZGV4UHJvcHM6IFBhcmFtZXRlcnM8Tm9uTnVsbGFibGU8UmVhY3RSb3V0ZXJPcHRpb25zPFQ+W1wicmVuZGVySW5kZXhcIl0+PlswXVxuICApOiBSZWFjdEVsZW1lbnQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gV2lkZ2V0Um91dGVyVmlldzxcbiAgVCBleHRlbmRzIFRSb3V0ZXIsXG4gIEMgZXh0ZW5kcyBBbnlXaWRnZXRDb25uZWN0aW9uXG4+KFxuICByb3V0ZXI6IFJvdXRlcjxUPixcbiAgY29ubmVjdGlvbk9yR2V0Q29ubmVjdGlvbjogRXhjbHVkZTxDLCBGbj4gfCAoKHBhcmFtczogVFtcIlBhcmFtc1wiXSkgPT4gQyksXG4gIG9wdGlvbnNPclJlbmRlcldpZGdldDpcbiAgICB8IFdpZGdldFZpZXdSb3V0ZXJPcHRpb25zPFQsIEM+XG4gICAgfCBXaWRnZXRWaWV3Um91dGVyT3B0aW9uczxULCBDPltcInJlbmRlcldpZGdldFwiXVxuKSB7XG4gIGNvbnN0IGdldENvbm5lY3Rpb246IChwYXJhbXM6IFRbXCJQYXJhbXNcIl0pID0+IEMgPVxuICAgIHR5cGVvZiBjb25uZWN0aW9uT3JHZXRDb25uZWN0aW9uID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gY29ubmVjdGlvbk9yR2V0Q29ubmVjdGlvblxuICAgICAgOiAoKSA9PiBjb25uZWN0aW9uT3JHZXRDb25uZWN0aW9uO1xuXG4gIGNvbnN0IG9wdGlvbnM6IFdpZGdldFZpZXdSb3V0ZXJPcHRpb25zPFQsIEM+ID1cbiAgICB0eXBlb2Ygb3B0aW9uc09yUmVuZGVyV2lkZ2V0ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8geyByZW5kZXJXaWRnZXQ6IG9wdGlvbnNPclJlbmRlcldpZGdldCB9XG4gICAgICA6IG9wdGlvbnNPclJlbmRlcldpZGdldDtcblxuICBjb25zdCB7IHJlbmRlcldpZGdldCB9ID0gb3B0aW9ucztcblxuICBSZWFjdFJvdXRlcihyb3V0ZXIsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHJlbmRlckluZGV4KGluZGV4UHJvcHMpIHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSB1c2VNZW1vKFxuICAgICAgICAoKSA9PiBnZXRDb25uZWN0aW9uKGluZGV4UHJvcHMubG9jYXRpb24ucGFyYW1zKSxcbiAgICAgICAgW2luZGV4UHJvcHMubG9jYXRpb24ucGFyYW1zXVxuICAgICAgKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxXaWRnZXRWaWV3TG9hZGVyXG4gICAgICAgICAgY29ubmVjdGlvbj17Y29ubmVjdGlvbn1cbiAgICAgICAgICBjaGlsZHJlbj17cHJvcHMgPT4gY3JlYXRlRWxlbWVudChDb21wb25lbnQsIHsgcHJvcHMsIGluZGV4UHJvcHMgfSl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0sXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIENvbXBvbmVudCh7IHByb3BzLCBpbmRleFByb3BzIH0pIHtcbiAgICByZXR1cm4gcmVuZGVyV2lkZ2V0KHByb3BzLCBpbmRleFByb3BzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4uLy4uL3JlYWN0L3ZpZXcvVmlld1wiO1xuaW1wb3J0IHsgVmlld1N0YXRlIH0gZnJvbSBcIi4uLy4uL3JlYWN0L3ZpZXcvVmlld1N0YXRlXCI7XG5pbXBvcnQgeyBBbnlXaWRnZXRDb25uZWN0aW9uLCBXaWRnZXRFbGVtZW50IH0gZnJvbSBcIi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBXaWRnZXRWaWV3UHJvcHMgfSBmcm9tIFwiLi9XaWRnZXRWaWV3XCI7XG5cbi8vIFRPRE86IE1ha2Ugc2VydmljZSBmb3IgV2lkZ2V0Vmlld0xvYWRlclxuXG5leHBvcnQgY2xhc3MgV2lkZ2V0Vmlld0xvYWRlcjxDIGV4dGVuZHMgQW55V2lkZ2V0Q29ubmVjdGlvbj4gZXh0ZW5kcyBWaWV3PHtcbiAgY29ubmVjdGlvbjogQztcblxuICBjaGlsZHJlbihwcm9wczogV2lkZ2V0Vmlld1Byb3BzPEM+LCB2aWV3OiBXaWRnZXRWaWV3TG9hZGVyPEM+KTogUmVhY3ROb2RlO1xufT4ge1xuICBAVmlld1N0YXRlKCkgaXNMb2FkaW5nID0gZmFsc2U7XG5cbiAgQFZpZXdTdGF0ZSgpIGVsZW1lbnQ6IFdpZGdldEVsZW1lbnQ8Qz4gfCB1bmRlZmluZWQ7XG5cbiAgQFZpZXdTdGF0ZSgpIGVycm9yOiBhbnkgPSB1bmRlZmluZWQ7XG5cbiAgYXN5bmMgcmVsb2FkKCkge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5lbGVtZW50ID0gYXdhaXQgdGhpcy5wcm9wcy5jb25uZWN0aW9uLmdldEVsZW1lbnQoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMucmVsb2FkKCkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJWaWV3KCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgaWYgKHRoaXMuZXJyb3IpIHRocm93IHRoaXMuZXJyb3I7XG4gICAgaWYgKHRoaXMuZWxlbWVudClcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuKFxuICAgICAgICB7XG4gICAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICAgIGNvbm5lY3Rpb246IHRoaXMucHJvcHMuY29ubmVjdGlvbixcbiAgICAgICAgfSxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSWYsXG4gIElzLFxuICBPdmVycmlkZSxcbiAgUGFydGlhbFVuZGVmaW5lZEtleXMsXG4gIFVuZGVmaW5lZElmRW1wdHlPYmplY3QsXG4gIFVuZGVmaW5lZElmSXNVbmRlZmluZWQsXG59IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgRGF0YUV4cCB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9kYXRhLWV4cC9EYXRhRXhwXCI7XG5pbXBvcnQgeyBEYXRhUm93IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVkYXRhL0RhdGFSb3dcIjtcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZWRhdGEvRGF0YVNvdXJjZVwiO1xuaW1wb3J0IHsgTm9uUmVsYXRpb25LZXlzIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVkYXRhL1JlbGF0aW9uXCI7XG5pbXBvcnQgeyBDb25maWdGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7IEdlbmVyaWNDb25maWcgfSBmcm9tIFwiLi4vLi4vR2VuZXJpY0NvbmZpZ1wiO1xuaW1wb3J0IHsgTm9ScGMgfSBmcm9tIFwiLi4vLi4vTm9ScGNcIjtcbmltcG9ydCB7IFJwY1BhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9ycGMtcGFyYW1ldGVyL1JwY1BhcmFtZXRlclwiO1xuaW1wb3J0IHtcbiAgQW55UnBjLFxuICBScGNDb25maWcsXG4gIFJwY0Nvbm5lY3Rpb24sXG4gIFJwY1VucmVzb2x2ZWRDb25maWcsXG59IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IFJwY0ZuIH0gZnJvbSBcIi4uLy4uL3JwYy1mbi9ScGNGblwiO1xuaW1wb3J0IHsgUnBjTWFwIH0gZnJvbSBcIi4uLy4uL3JwYy1tYXAvUnBjTWFwXCI7XG5pbXBvcnQgeyBBbnlSb3dUeXBlLCBDb2x1bW4sIFJvdyB9IGZyb20gXCIuLi9Sb3dcIjtcbmltcG9ydCB7IFdpZGdldCwgV2lkZ2V0Q29udHJvbGxlciB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IERhdGFUYWJsZUhhbmRsZXIgfSBmcm9tIFwiLi9EYXRhVGFibGVIYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIERhdGFUYWJsZVR5cGVzPFQgZXh0ZW5kcyBURGF0YVRhYmxlPiA9IF9UeXBlczxUPjtcbnR5cGUgX0NvbHVtblR5cGVzPFxuICBUIGV4dGVuZHMgVERhdGFUYWJsZSAmIHtcbiAgICBDb2x1bW5LZXk6IHN0cmluZztcbiAgICBDb2x1bW5UeXBlO1xuICB9LFxuICBVbmRlZmluZWRJZkNvbHVtbktleUlzRGF0YUtleSBleHRlbmRzIHVuZGVmaW5lZCA9IElmPFxuICAgIElzPFRbXCJDb2x1bW5LZXlcIl0sIGtleW9mIFJlcXVpcmVkPFRbXCJEYXRhXCJdPj4sXG4gICAgdW5kZWZpbmVkXG4gID5cbj4gPSB7XG4gIENvbHVtbkxvYWRlcjogKChyb3c6IERhdGFSb3c8VFtcIkRhdGFcIl0+KSA9PiBhbnkpIHwgTm9uUmVsYXRpb25LZXlzPFRbXCJEYXRhXCJdPjtcblxuICBDb2x1bW5Db25maWc6XG4gICAgfCBfQ29sdW1uVHlwZXM8VD5bXCJDb2x1bW5Mb2FkZXJcIl1cbiAgICB8IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICAgICAgICB7XG4gICAgICAgICAgbG9hZDogX0NvbHVtblR5cGVzPFQ+W1wiQ29sdW1uTG9hZGVyXCJdIHwgVW5kZWZpbmVkSWZDb2x1bW5LZXlJc0RhdGFLZXk7XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaWVsZD86IERhdGFFeHA8VFtcIkRhdGFcIl0+O1xuICAgICAgICB9XG4gICAgICA+XG4gICAgfCBVbmRlZmluZWRJZkNvbHVtbktleUlzRGF0YUtleTtcbn07XG5cbmV4cG9ydCB0eXBlIF9UeXBlczxUIGV4dGVuZHMgVERhdGFUYWJsZSwgRCA9IFRbXCJEYXRhXCJdLCBSb3cgPSBUW1wiUm93XCJdPiA9IFQgJiB7XG4gIFJvd1dpdGhLZXk6IFJvdyAmIHsgJGtleTogc3RyaW5nIH07XG5cbiAgUXVlcnk6IHtcbiAgICBnZXRDb3VudD86IGJvb2xlYW47XG4gICAgb3JkZXI/OiBSZWNvcmQ8XG4gICAgICBrZXlvZiBSb3csXG4gICAgICB7IHNvcnQ/OiBcIkFTQ1wiIHwgXCJERVNDXCI7IG51bGxzPzogXCJGSVJTVFwiIHwgXCJMQVNUXCIgfSB8IFwiQVNDXCIgfCBcIkRFU0NcIlxuICAgID47XG4gICAgdGV4dD86IHN0cmluZztcbiAgICBza2lwPzogbnVtYmVyO1xuICAgIHRha2U/OiBudW1iZXI7XG4gIH07XG5cbiAgUXVlcnlSZXN1bHQ6IHsgdG90YWxSb3dzOiBudW1iZXI7IHJvd3M6ICh7ICRrZXk6IHN0cmluZyB9ICYgUm93KVtdIH07XG5cbiAgQ29sdW1uQ29uZmlnTWFwOiBVbmRlZmluZWRJZkVtcHR5T2JqZWN0PFxuICAgIFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICAgICAge1xuICAgICAgICBbSyBpbiBzdHJpbmcgJiBrZXlvZiBSb3ddOiBfQ29sdW1uVHlwZXM8XG4gICAgICAgICAgVCAmIHtcbiAgICAgICAgICAgIENvbHVtbktleTogSztcbiAgICAgICAgICAgIENvbHVtblR5cGU6IFJvd1tLXTtcbiAgICAgICAgICB9XG4gICAgICAgID5bXCJDb2x1bW5Db25maWdcIl07XG4gICAgICB9XG4gICAgPlxuICA+O1xuXG4gIE9wdGlvbmFsQ29uZmlnOiB7XG4gICAgZ2V0Um93Q29udHJvbGxlckNvbmZpZzpcbiAgICAgIHwgQ29uZmlnRmFjdG9yeTxcbiAgICAgICAgICBScGNVbnJlc29sdmVkQ29uZmlnPFRbXCJSb3dDb250cm9sbGVyXCJdPixcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGtleTogc3RyaW5nO1xuICAgICAgICAgICAgICBzb3VyY2U6IERhdGFTb3VyY2U8RD47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICA+XG4gICAgICB8IFVuZGVmaW5lZElmSXNVbmRlZmluZWQ8UnBjQ29uZmlnPFRbXCJSb3dDb250cm9sbGVyXCJdPj47XG5cbiAgICBjb2x1bW5zOiBfVHlwZXM8VD5bXCJDb2x1bW5Db25maWdNYXBcIl07XG4gIH07XG5cbiAgUmVxdWlyZWRDb25maWc6IHtcbiAgICBzb3VyY2U6IERhdGFTb3VyY2U8RD47XG4gICAgcGFnZVNpemU/OiBudW1iZXI7XG4gICAgc2VhcmNoSW4/OiBEYXRhRXhwPEQ+W107XG4gICAgbWF4Um93cz86IG51bWJlcjtcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIERhdGFUYWJsZUNvbmZpZzxUIGV4dGVuZHMgVERhdGFUYWJsZT4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAgX1R5cGVzPFQ+W1wiT3B0aW9uYWxDb25maWdcIl0sXG4gIF9UeXBlczxUPltcIlJlcXVpcmVkQ29uZmlnXCJdXG4+O1xuXG5leHBvcnQgdHlwZSBBbnlEYXRhVGFibGUgPSBEYXRhVGFibGU8VERhdGFUYWJsZT47XG5cbmV4cG9ydCB0eXBlIFREYXRhVGFibGUgPSB7XG4gIFJvdzogYW55O1xuICBSb3dDb250cm9sbGVyOiBBbnlScGM7XG4gIERhdGE6IGFueTtcbn07XG5cbmV4cG9ydCB0eXBlIERhdGFUYWJsZTxcbiAgVCBleHRlbmRzIFREYXRhVGFibGUsXG4gIFJvdyA9IFRbXCJSb3dcIl0sXG4gIFJvd0NvbnRyb2xsZXIgZXh0ZW5kcyBBbnlScGMgPSBUW1wiUm93Q29udHJvbGxlclwiXSxcbiAgRCA9IFRbXCJEYXRhXCJdLFxuICBHZXRSb3dzRm4gPSAocXVlcnk6IF9UeXBlczxUPltcIlF1ZXJ5XCJdKSA9PiBQcm9taXNlPF9UeXBlczxUPltcIlF1ZXJ5UmVzdWx0XCJdPlxuPiA9IFdpZGdldDx7XG4gIFR5cGVzOiBfVHlwZXM8VD47XG5cbiAgQ29uZmlnOiBHZW5lcmljQ29uZmlnPFxuICAgIDxEPihjb25maWc6IERhdGFUYWJsZUNvbmZpZzxPdmVycmlkZTxULCB7IERhdGE6IEQgfT4+KSA9PiBEYXRhVGFibGVDb25maWc8VD5cbiAgPjtcblxuICBDb21tYW5kczoge307XG5cbiAgQ29ubmVjdGlvbjoge1xuICAgIGdldFJvd3M6IEdldFJvd3NGbjtcbiAgICBnZXRSb3dDb250cm9sbGVyKGtleTogc3RyaW5nKTogUnBjQ29ubmVjdGlvbjxSb3dDb250cm9sbGVyPjtcbiAgfTtcblxuICBFbGVtZW50OiB7XG4gICAgLy8gVE9ETzogbW92ZSB0byBQcm9wc1xuICAgIHNlYXJjaGFibGU6IGJvb2xlYW47XG4gICAgY29sdW1uczoge1xuICAgICAgW0sgaW4ga2V5b2YgUmVxdWlyZWQ8Um93Pl06IHtcbiAgICAgICAgc29ydGFibGU6IGJvb2xlYW47XG4gICAgICB9O1xuICAgIH07XG4gICAgdG90YWxSb3dzOiBudW1iZXI7XG4gICAgcm93czogX1R5cGVzPFQ+W1wiUm93V2l0aEtleVwiXVtdO1xuICAgIHBhZ2VTaXplPzogbnVtYmVyO1xuICB9O1xuICBQcm9wczoge307XG4gIEhhbmRsZXI6IHtcbiAgICBnZXRSb3dzOiBHZXRSb3dzRm47XG5cbiAgICBsb2FkUm93KGRhdGFSb3c6IGFueSk6IFByb21pc2U8eyAka2V5OiBzdHJpbmcgfSAmIFJvdz47XG4gICAgbG9hZFJvdyhkYXRhUm93OiBhbnksIG5vS2V5OiB0cnVlKTogUHJvbWlzZTxSb3c+O1xuXG4gICAgY29sdW1uczogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAge1xuICAgICAgICBsb2FkOiAocm93OiBEYXRhUm93PEQ+KSA9PiBhbnk7XG4gICAgICAgIGZpZWxkPzogRGF0YUV4cDxEPjtcbiAgICAgIH1cbiAgICA+O1xuICB9O1xuICBDb250cm9sbGVyOiBScGNNYXA8e1xuICAgIGdldFJvd0NvbnRyb2xsZXI6IFJwY1BhcmFtZXRlcjx7XG4gICAgICBUYXJnZXQ6IFJvd0NvbnRyb2xsZXI7XG4gICAgICBEYXRhOiBzdHJpbmc7XG4gICAgICBWYWx1ZTogc3RyaW5nO1xuICAgIH0+O1xuICAgIGdldFJvd3M6IFJwY0ZuPChxdWVyeTogX1R5cGVzPFQ+W1wiUXVlcnlcIl0pID0+IF9UeXBlczxUPltcIlF1ZXJ5UmVzdWx0XCJdPjtcbiAgfT47XG59PjtcblxuZXhwb3J0IHR5cGUgRGF0YVRhYmxlT3B0aW9uczxSb3dDb250cm9sbGVyIGV4dGVuZHMgQW55UnBjPiA9IHtcbiAgcm93Q29udHJvbGxlcj86IFJvd0NvbnRyb2xsZXI7XG5cbiAgcGFnZVNpemU/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gRGF0YVRhYmxlPFxuICBSb3dUeXBlIGV4dGVuZHMgQW55Um93VHlwZSxcbiAgUm93Q29udHJvbGxlciBleHRlbmRzIEFueVJwYyA9IE5vUnBjXG4+KFxuICByb3dUeXBlOiBSb3dUeXBlLFxuICBvcHRpb25zOiBEYXRhVGFibGVPcHRpb25zPFJvd0NvbnRyb2xsZXI+ID0ge31cbik6IERhdGFUYWJsZTx7XG4gIFJvd0NvbnRyb2xsZXI6IFJvd0NvbnRyb2xsZXI7XG4gIFJvdzogUm93PFJvd1R5cGU+O1xuICBEYXRhOiBhbnk7XG59PiB7XG4gIHJldHVybiA8YW55PldpZGdldDxBbnlEYXRhVGFibGU+KHtcbiAgICBpc0dlbmVyaWNDb25maWc6IHRydWUsXG4gICAgY29ubmVjdGlvbjoge1xuICAgICAgZ2V0Um93czogY29ubiA9PiBxdWVyeSA9PiBjb25uLmNvbnRyb2xsZXIuZ2V0Um93cyhxdWVyeSksXG4gICAgICBnZXRSb3dDb250cm9sbGVyOiBjb25uID0+IGtleSA9PiBjb25uLmNvbnRyb2xsZXIuZ2V0Um93Q29udHJvbGxlcihrZXkpLFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogUnBjTWFwKHtcbiAgICAgIGdldFJvd0NvbnRyb2xsZXI6IFJwY1BhcmFtZXRlcihTdHJpbmcsIG9wdGlvbnMucm93Q29udHJvbGxlciB8fCBOb1JwYyksXG4gICAgICBnZXRSb3dzOiBScGNGbjxhbnk+KCksXG4gICAgfSkgYXMgV2lkZ2V0Q29udHJvbGxlcjxBbnlEYXRhVGFibGU+LFxuICAgIGhhbmRsZXI6IERhdGFUYWJsZUhhbmRsZXIsXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgaW5zcGVjdCB9IGZyb20gXCIuLi8uLi8uLi9sb2dnaW5nL2luc3BlY3RcIjtcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0SGFuZGxlciB9IGZyb20gXCIuLi9BYnN0cmFjdFdpZGdldEhhbmRsZXJcIjtcbmltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9lbnRyaWVzXCI7XG5pbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7IExhenkgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhdHRlcm5zL2xhenlcIjtcbmltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IERhdGFFeHAgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZWRhdGEvZGF0YS1leHAvRGF0YUV4cFwiO1xuaW1wb3J0IHsgRGF0YU9yZGVyIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVkYXRhL0RhdGFPcmRlclwiO1xuaW1wb3J0IHsgRGF0YVJvdyB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9EYXRhUm93XCI7XG5pbXBvcnQgeyBDb25maWdGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7IFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBJV2lkZ2V0SGFuZGxlciwgV2lkZ2V0Q29udHJvbGxlciwgV2lkZ2V0RWxlbWVudCB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IEFueURhdGFUYWJsZSwgRGF0YVRhYmxlVHlwZXMsIFREYXRhVGFibGUgfSBmcm9tIFwiLi9EYXRhVGFibGVcIjtcblxudHlwZSBSID0gQW55RGF0YVRhYmxlO1xudHlwZSBUID0gVERhdGFUYWJsZTtcblxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUhhbmRsZXJcbiAgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldEhhbmRsZXI8Uj5cbiAgaW1wbGVtZW50cyBJV2lkZ2V0SGFuZGxlcjxSPiB7XG4gIEBMYXp5KCkgZ2V0IGNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIG1hcE9iamVjdCh0aGlzLmNvbmZpZy5jb2x1bW5zIHx8IHt9LCAoY29sdW1uQ29uZmlnLCBrZXkpID0+IHtcbiAgICAgIGxldCBsb2FkLCBmaWVsZDtcblxuICAgICAgc3dpdGNoICh0eXBlb2YgY29sdW1uQ29uZmlnKSB7XG4gICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICAgIGxvYWQgPSBjb2x1bW5Db25maWc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBmaWVsZCA9IGNvbHVtbkNvbmZpZztcbiAgICAgICAgICBsb2FkID0gZGF0YVJvdyA9PiBkYXRhUm93W2ZpZWxkXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICh7IGxvYWQsIGZpZWxkIH0gPSBjb2x1bW5Db25maWcgfHwgKHt9IGFzIGFueSkpO1xuICAgICAgICAgIGlmICghbG9hZCkge1xuICAgICAgICAgICAgbG9hZCA9IGRhdGFSb3cgPT4gZGF0YVJvd1trZXldO1xuICAgICAgICAgICAgZmllbGQgPSBrZXk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVuZXhwZWN0ZWQgJHtpbnNwZWN0KHsgY29sdW1uQ29uZmlnIH0pfWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBsb2FkLFxuICAgICAgICBmaWVsZCxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBsb2FkUm93KGRhdGFSb3csIG5vS2V5PzogYm9vbGVhbikge1xuICAgIGNvbnN0IHJvdzogYW55ID0ge307XG4gICAgaWYgKCFub0tleSkge1xuICAgICAgcm93LiRrZXkgPSBkYXRhUm93LiRrZXk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgY29sdW1uXSBvZiBlbnRyaWVzKHRoaXMuY29sdW1ucykpIHtcbiAgICAgIHJvd1trZXldID0gYXdhaXQgY29sdW1uLmxvYWQoZGF0YVJvdyk7XG4gICAgfVxuICAgIHJldHVybiByb3c7XG4gIH1cblxuICBhc3luYyBnZXRSb3dzKFxuICAgIHF1ZXJ5OiBEYXRhVGFibGVUeXBlczxUPltcIlF1ZXJ5XCJdXG4gICk6IFByb21pc2U8RGF0YVRhYmxlVHlwZXM8VD5bXCJRdWVyeVJlc3VsdFwiXT4ge1xuICAgIGNvbnN0IG9yZGVyczogRGF0YU9yZGVyPGFueT5bXSA9IFtdO1xuICAgIGZvciAoY29uc3QgW2tleSwgb3JkZXJdIG9mIGVudHJpZXMocXVlcnkub3JkZXIpKSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmNvbHVtbnNba2V5XTtcbiAgICAgIGlmIChjb2x1bW4uZmllbGQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBvcmRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBvcmRlcnMucHVzaCh7XG4gICAgICAgICAgYnk6IGNvbHVtbi5maWVsZCxcbiAgICAgICAgICBzb3J0OiBvcmRlcixcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcmRlcnMucHVzaCh7XG4gICAgICAgICAgYnk6IGNvbHVtbi5maWVsZCxcbiAgICAgICAgICBzb3J0OiBvcmRlci5zb3J0ID8/IFwiQVNDXCIsXG4gICAgICAgICAgbnVsbHM6IG9yZGVyLm51bGxzLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBtYXhSb3dzID0gdGhpcy5jb25maWcubWF4Um93cyA/PyAxMDtcbiAgICBjb25zdCBmaWx0ZXJzOiBEYXRhRXhwPGFueT4gPSBbXTtcblxuICAgIGlmIChxdWVyeS50ZXh0KSB7XG4gICAgICBjb25zdCBzZWFyY2hGaWx0ZXJzID0gdGhpcy5jb25maWcuc2VhcmNoSW4/Lm1hcChmaWVsZCA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgJHNlYXJjaDoge1xuICAgICAgICAgICAgaW46IGZpZWxkLFxuICAgICAgICAgICAgdGV4dDogcXVlcnkudGV4dCxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICBpZiAoc2VhcmNoRmlsdGVycz8ubGVuZ3RoKSB7XG4gICAgICAgIGZpbHRlcnMucHVzaCh7ICRvcjogc2VhcmNoRmlsdGVycyB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHNvdXJjZSA9IHRoaXMuY29uZmlnLnNvdXJjZVxuICAgICAgLm9yZGVyKG9yZGVycylcbiAgICAgIC50YWtlKE1hdGgubWluKHF1ZXJ5LnRha2UgPz8gbWF4Um93cywgbWF4Um93cykpXG4gICAgICAuc2tpcChxdWVyeS5za2lwID8/IDApXG4gICAgICAuZmlsdGVyKHsgJGFuZDogZmlsdGVycyB9KTtcblxuICAgIGxldCB0b3RhbFJvd3M6IG51bWJlcjtcbiAgICBsZXQgZGF0YVJvd3M6IERhdGFSb3c8YW55PltdO1xuXG4gICAgaWYgKHF1ZXJ5LmdldENvdW50KSB7XG4gICAgICBbdG90YWxSb3dzLCBkYXRhUm93c10gPSBhd2FpdCBzb3VyY2UuZ2V0Q291bnRBbmRSb3dzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFt0b3RhbFJvd3MsIGRhdGFSb3dzXSA9IFswLCBhd2FpdCBzb3VyY2UuZ2V0Um93cygpXTtcbiAgICB9XG5cbiAgICBjb25zdCByb3dzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgZGF0YVJvdyBvZiBkYXRhUm93cykge1xuICAgICAgcm93cy5wdXNoKGF3YWl0IHRoaXMubG9hZFJvdyhkYXRhUm93KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgcm93cywgdG90YWxSb3dzIH07XG4gIH1cblxuICBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxSPj4ge1xuICAgIHJldHVybiB7XG4gICAgICBnZXRSb3dDb250cm9sbGVyOiBhc3luYyAoJCwga2V5KSA9PlxuICAgICAgICAkKFxuICAgICAgICAgIGF3YWl0IENvbmZpZ0ZhY3RvcnkodGhpcy5jb25maWcuZ2V0Um93Q29udHJvbGxlckNvbmZpZywge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLmNvbmZpZy5zb3VyY2UsXG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgIGdldFJvd3M6IHF1ZXJ5ID0+IHRoaXMuZ2V0Um93cyhxdWVyeSksXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldEVsZW1lbnQoKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPFdpZGdldEVsZW1lbnQ8Uj4+PiB7XG4gICAgY29uc3QgeyByb3dzLCB0b3RhbFJvd3MgfSA9IGF3YWl0IHRoaXMuZ2V0Um93cyh7XG4gICAgICBnZXRDb3VudDogdHJ1ZSxcbiAgICAgIHRleHQ6IFwiXCIsXG4gICAgICB0YWtlOiB0aGlzLmNvbmZpZy5wYWdlU2l6ZSB8fCAxMCxcbiAgICAgIHNraXA6IDAsXG4gICAgICBvcmRlcjoge30sXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvd3MsXG4gICAgICB0b3RhbFJvd3MsXG4gICAgICBwYWdlU2l6ZTogdGhpcy5jb25maWcucGFnZVNpemUsXG4gICAgICBzZWFyY2hhYmxlOiAhIXRoaXMuY29uZmlnLnNlYXJjaEluPy5sZW5ndGgsXG4gICAgICBjb2x1bW5zOiB7fSxcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG1hcEFuZEZpbHRlck9iamVjdCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L21hcEFuZEZpbHRlck9iamVjdFwiO1xuaW1wb3J0IHsgRGVib3VuY2UgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvaG9va3MvdXNlRGVib3VuY2VcIjtcbmltcG9ydCB7IFZpZXdTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC92aWV3L1ZpZXdTdGF0ZVwiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0VmlldyB9IGZyb20gXCIuLi9BYnN0cmFjdFdpZGdldFZpZXdcIjtcbmltcG9ydCB7IEFueURhdGFUYWJsZSB9IGZyb20gXCIuL0RhdGFUYWJsZVwiO1xuaW1wb3J0IHsgV2lkZ2V0RWxlbWVudCwgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFZpZXdQcm9wcyB9IGZyb20gXCIuLi9XaWRnZXRWaWV3XCI7XG5cbmV4cG9ydCB0eXBlIERhdGFUYWJsZVZpZXdQcm9wczxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55RGF0YVRhYmxlPlxuPiA9IFdpZGdldFZpZXdQcm9wczxDPjtcblxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZVZpZXc8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueURhdGFUYWJsZT5cbj4gZXh0ZW5kcyBBYnN0cmFjdFdpZGdldFZpZXc8XG4gIEMsXG4gIERhdGFUYWJsZVZpZXdQcm9wczxDPiAmIHtcbiAgICBjaGlsZHJlbih2aWV3OiBSZWFkb25seTxEYXRhVGFibGVWaWV3PEM+Pik6IFJlYWN0RWxlbWVudDtcbiAgfVxuPiB7XG4gIHByb3RlY3RlZCByZWxvYWREZWJvdW5jZSA9IERlYm91bmNlKCk7XG5cbiAgQFZpZXdTdGF0ZShcInJlbG9hZFdpdGhEZWJvdW5jZVwiKSBzZWFyY2hUZXh0OiBzdHJpbmcgPSBcIlwiO1xuICBAVmlld1N0YXRlKFwicmVsb2FkXCIpIHBhZ2VTaXplO1xuICBAVmlld1N0YXRlKFwicmVsb2FkXCIpIHBhZ2VJbmRleCA9IDA7XG5cbiAgQFZpZXdTdGF0ZSgpIHRvdGFsUm93czogbnVtYmVyO1xuICBAVmlld1N0YXRlKCkgcm93czogV2lkZ2V0VHlwZTxDPltcIlR5cGVzXCJdW1wiUm93V2l0aEtleVwiXVtdO1xuICBAVmlld1N0YXRlKCkgaXNMb2FkaW5nID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUVsZW1lbnQoZWxlbWVudDogV2lkZ2V0RWxlbWVudDxDPikge1xuICAgIHRoaXMucm93cyA9IGVsZW1lbnQucm93cyB8fCBbXTtcbiAgICB0aGlzLnRvdGFsUm93cyA9IGVsZW1lbnQudG90YWxSb3dzID8/IDA7XG4gICAgdGhpcy5wYWdlU2l6ZSA9IGVsZW1lbnQucGFnZVNpemUgfHwgMTA7XG4gIH1cblxuICBAVmlld1N0YXRlKCkgY29sdW1uczogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICB7XG4gICAgICBzb3J0PzogXCJBU0NcIiB8IFwiREVTQ1wiO1xuICAgICAgbnVsbHM/OiBcIkZJUlNUXCIgfCBcIkxBU1RcIjtcbiAgICB9XG4gID4gPSB7fTtcblxuICBnZXQgbGFzdFBhZ2UoKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnRvdGFsUm93cyAvIHRoaXMucGFnZVNpemUpO1xuICB9XG5cbiAgc2V0UGFnZUluZGV4KHBhZ2VJbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5wYWdlSW5kZXggPSBNYXRoLm1pbih0aGlzLmxhc3RQYWdlIC0gMSwgcGFnZUluZGV4KTtcbiAgfVxuXG4gIHNldFJlbGF0aXZlUGFnZShjb3VudDogbnVtYmVyKSB7XG4gICAgdGhpcy5zZXRQYWdlSW5kZXgodGhpcy5wYWdlSW5kZXggKyBjb3VudCk7XG4gIH1cblxuICBzZXRQYWdlU2l6ZShwYWdlU2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5wYWdlU2l6ZSA9IDEgPiBwYWdlU2l6ZSA/IDEgOiBwYWdlU2l6ZTtcbiAgfVxuXG4gIGFzeW5jIHNlYXJjaCh0ZXh0OiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlYXJjaFRleHQgPSB0ZXh0O1xuICAgIHRoaXMucGFnZUluZGV4ID0gMDtcbiAgfVxuXG4gIGNsZWFyU2VhcmNoKCkge1xuICAgIHRoaXMuc2VhcmNoVGV4dCA9IFwiXCI7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3RvZ2dsZVNvcnRPck51bGxzPEsgZXh0ZW5kcyBcInNvcnRcIiB8IFwibnVsbHNcIj4oXG4gICAga2V5OiBzdHJpbmcsXG4gICAgcDogSyxcbiAgICB2MTogeyBzb3J0OiBcIkFTQ1wiIHwgXCJERVNDXCI7IG51bGxzOiBcIkZJUlNUXCIgfCBcIkxBU1RcIiB9W0tdLFxuICAgIHYyOiB7IHNvcnQ6IFwiQVNDXCIgfCBcIkRFU0NcIjsgbnVsbHM6IFwiRklSU1RcIiB8IFwiTEFTVFwiIH1bS11cbiAgKSB7XG4gICAgY29uc3QgY29sdW1uID0gdGhpcy5jb2x1bW5zW2tleV07XG4gICAgbGV0IHZhbHVlOiB0eXBlb2YgY29sdW1uW3R5cGVvZiBwXSA9IGNvbHVtbltwXTtcblxuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgdjE6XG4gICAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdjI6XG4gICAgICAgIHZhbHVlID0gdjE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHZhbHVlID0gdjI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmNvbHVtbnMgPSB7XG4gICAgICAuLi50aGlzLmNvbHVtbnMsXG4gICAgICBba2V5XTogeyAuLi5jb2x1bW4sIFtwXTogdmFsdWUgfSxcbiAgICB9O1xuICB9XG5cbiAgdG9nZ2xlTnVsbHMoa2V5OiBzdHJpbmcpIHtcbiAgICB0aGlzLl90b2dnbGVTb3J0T3JOdWxscyhrZXksIFwic29ydFwiLCBcIkFTQ1wiLCBcIkRFU0NcIik7XG4gIH1cblxuICB0b2dnbGVTb3J0KGtleTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdG9nZ2xlU29ydE9yTnVsbHMoa2V5LCBcIm51bGxzXCIsIFwiRklSU1RcIiwgXCJMQVNUXCIpO1xuICB9XG5cbiAgYXN5bmMgcmVsb2FkV2l0aERlYm91bmNlKCkge1xuICAgIGlmICghdGhpcy5pc0RpZE1vdW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICBpZiAoYXdhaXQgdGhpcy5yZWxvYWREZWJvdW5jZS53YWl0KCkpIHJldHVybjtcbiAgICBhd2FpdCB0aGlzLnJlbG9hZCgpO1xuICB9XG5cbiAgYXN5bmMgcmVsb2FkQWZ0ZXJSZW1vdmUoa2V5OiBzdHJpbmcpIHtcbiAgICAvLyBUT0RPXG4gICAgcmV0dXJuIHRoaXMucmVsb2FkKCk7XG4gIH1cblxuICAvLyBUT0RPOiBAVmlld01ldGhvZCgpIC0gZW1pdCBvbmx5IGlmIGlzRGlkTW91bnQgJiYgIXNEaWRVbm1vdW50XG4gIGFzeW5jIHJlbG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuaXNEaWRNb3VudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgY29uc3QgZ2V0Q291bnQgPSB0aGlzLnRvdGFsUm93cyA9PT0gMCB8fCB0aGlzLnBhZ2VJbmRleCA9PT0gMDtcbiAgICBjb25zdCB7IHRvdGFsUm93cywgcm93cyB9ID0gYXdhaXQgdGhpcy5wcm9wcy5jb25uZWN0aW9uLmNvbnRyb2xsZXIuZ2V0Um93cyh7XG4gICAgICBnZXRDb3VudCxcbiAgICAgIG9yZGVyOiBtYXBBbmRGaWx0ZXJPYmplY3QodGhpcy5jb2x1bW5zLCBjb2x1bW4gPT4ge1xuICAgICAgICBjb25zdCB7IG51bGxzLCBzb3J0IH0gPSBjb2x1bW47XG4gICAgICAgIGlmIChudWxscyB8fCBzb3J0KSB7XG4gICAgICAgICAgcmV0dXJuIHsgbnVsbHMsIHNvcnQgfTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICB0ZXh0OiB0aGlzLnNlYXJjaFRleHQsXG4gICAgICB0YWtlOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgc2tpcDogdGhpcy5wYWdlSW5kZXggKiB0aGlzLnBhZ2VTaXplLFxuICAgIH0pO1xuXG4gICAgaWYgKGdldENvdW50KSB7XG4gICAgICB0aGlzLnRvdGFsUm93cyA9IHRvdGFsUm93cztcbiAgICB9XG4gICAgdGhpcy5yb3dzID0gcm93cztcbiAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICB9XG5cbiAgcmVuZGVyVmlldygpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuISh0aGlzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXdhaXRhYmxlLCBJZiwgSXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7XG4gIEFueUlucHV0LFxuICBJbnB1dEVycm9yLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlRGF0YSxcbn0gZnJvbSBcIi4uLy4uL2lucHV0L0lucHV0XCI7XG5pbXBvcnQgeyBWYWx1ZU9yQXdhaXRhYmxlRm4gfSBmcm9tIFwiLi4vLi4vaW5wdXQvVmFsdWVPckF3YWl0YWJsZUZuXCI7XG5pbXBvcnQgeyBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgQmFzZWRXaWRnZXQsIFdpZGdldCwgV2lkZ2V0RWxlbWVudCwgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IEZvcm1IYW5kbGVyIH0gZnJvbSBcIi4vRm9ybUhhbmRsZXJcIjtcblxuZXhwb3J0IHR5cGUgVEZvcm0gPSB7XG4gIElucHV0OiBBbnlJbnB1dDtcbiAgRXJyb3I6IGFueTtcbiAgVmFsdWU6IGFueTtcbn07XG5leHBvcnQgdHlwZSBBbnlGb3JtID0gRm9ybTxURm9ybT47XG5cbmV4cG9ydCB0eXBlIEJhc2VkRm9ybSA9IEJhc2VkV2lkZ2V0PFdpZGdldFR5cGU8QW55Rm9ybT4+O1xuXG5leHBvcnQgdHlwZSBGb3JtVHlwZTxUIGV4dGVuZHMgQmFzZWRGb3JtPiA9IFdpZGdldFR5cGU8VD5bXCJURm9ybVwiXTtcblxuZXhwb3J0IHR5cGUgRm9ybTxcbiAgVCBleHRlbmRzIFRGb3JtLFxuICBWYWx1ZSA9IFRbXCJWYWx1ZVwiXSxcbiAgRXJyb3IgPSBUW1wiRXJyb3JcIl0sXG4gIElucHV0IGV4dGVuZHMgQW55SW5wdXQgPSBUW1wiSW5wdXRcIl0sXG4gIFJlc3VsdCA9XG4gICAgfCB7IHZhbHVlOiBWYWx1ZSB9XG4gICAgfCB7IGVycm9yOiBFcnJvciB9XG4gICAgfCB7IGlucHV0RXJyb3I6IElucHV0RXJyb3I8SW5wdXQ+IH1cbj4gPSBXaWRnZXQ8e1xuICBURm9ybTogVDtcblxuICBDb25uZWN0aW9uOiB7fTtcblxuICBDb21tYW5kczoge1xuICAgIHN1Ym1pdDoge1xuICAgICAgKGRhdGE6IElucHV0VmFsdWVEYXRhPElucHV0Pik6IFJlc3VsdDtcbiAgICAgIGhhbmRsZXI6IFwiaGFuZGxlU3VibWl0XCI7XG4gICAgfTtcbiAgfTtcblxuICBDb25maWc6IHtcbiAgICBkZWZhdWx0PzogVmFsdWVPckF3YWl0YWJsZUZuPElucHV0VmFsdWU8SW5wdXQ+PjtcblxuICAgIGlucHV0Q29uZmlnOiBScGNVbnJlc29sdmVkQ29uZmlnPElucHV0PjtcblxuICAgIHN1Ym1pdChcbiAgICAgIHZhbHVlOiBJbnB1dFZhbHVlPElucHV0PlxuICAgICk6IEF3YWl0YWJsZTxcbiAgICAgIHwgUmVzdWx0XG4gICAgICB8IElmPElzPFZhbHVlLCBudWxsPiwgdm9pZD5cbiAgICAgIHwgSWY8SXM8VmFsdWUsIHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBhbnlbXT4sIFZhbHVlPlxuICAgID47XG4gIH07XG5cbiAgRWxlbWVudDogV2lkZ2V0RWxlbWVudDxJbnB1dD47XG5cbiAgQ29udHJvbGxlcjogSW5wdXQ7XG5cbiAgUHJvcHM6IHsgaW5wdXQ6IElucHV0IH07XG5cbiAgSGFuZGxlcjoge307XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIEZvcm08XG4gIElucHV0IGV4dGVuZHMgQW55SW5wdXQsXG4gIFZhbHVlID0gbnVsbCxcbiAgRXJyb3IgPSBuZXZlcixcbiAgVCBleHRlbmRzIFRGb3JtID0ge1xuICAgIElucHV0OiBJbnB1dDtcbiAgICBWYWx1ZTogVmFsdWU7XG4gICAgRXJyb3I6IEVycm9yO1xuICB9XG4+KHsgaW5wdXQgfTogeyB2YWx1ZT86IFZhbHVlOyBlcnJvcj86IEVycm9yOyBpbnB1dDogSW5wdXQgfSk6IEZvcm08VD4ge1xuICByZXR1cm4gPGFueT5XaWRnZXQ8QW55Rm9ybT4oe1xuICAgIHByb3BzOiB7IGlucHV0IH0sXG4gICAgY29udHJvbGxlcjogaW5wdXQsXG4gICAgaGFuZGxlcjogRm9ybUhhbmRsZXIsXG4gICAgY29tbWFuZHM6IHsgc3VibWl0OiBcImhhbmRsZVN1Ym1pdFwiIH0sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgUmVxdWlyZU9wdGlvbmFsS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgQW55SW5wdXQsIElucHV0VmFsdWVEYXRhIH0gZnJvbSBcIi4uLy4uL2lucHV0L0lucHV0XCI7XG5pbXBvcnQgeyBWYWx1ZU9yQXdhaXRhYmxlRm4gfSBmcm9tIFwiLi4vLi4vaW5wdXQvVmFsdWVPckF3YWl0YWJsZUZuXCI7XG5pbXBvcnQgeyBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXRIYW5kbGVyIH0gZnJvbSBcIi4uL0Fic3RyYWN0V2lkZ2V0SGFuZGxlclwiO1xuaW1wb3J0IHsgQW55Rm9ybSB9IGZyb20gXCIuL0Zvcm1cIjtcbmltcG9ydCB7IElXaWRnZXRIYW5kbGVyLCBXaWRnZXRDb250cm9sbGVyLCBXaWRnZXRFbGVtZW50IH0gZnJvbSBcIi4uL1dpZGdldFwiO1xuXG50eXBlIFQgPSBBbnlGb3JtO1xuXG5leHBvcnQgY2xhc3MgRm9ybUhhbmRsZXJcbiAgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldEhhbmRsZXI8VD5cbiAgaW1wbGVtZW50cyBJV2lkZ2V0SGFuZGxlcjxBbnlGb3JtPiB7XG4gIGdldENvbnRyb2xsZXJDb25maWcoKTogUnBjVW5yZXNvbHZlZENvbmZpZzxXaWRnZXRDb250cm9sbGVyPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmlucHV0Q29uZmlnO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlU3VibWl0KHZhbHVlRGF0YTogSW5wdXRWYWx1ZURhdGE8QW55SW5wdXQ+KSB7XG4gICAgY29uc3QgaW5wdXRSZXN1bHQgPSBhd2FpdCB0aGlzLmNvbnRyb2xsZXIudGhlbihpbnB1dCA9PlxuICAgICAgaW5wdXQubG9hZEFuZENoZWNrKHZhbHVlRGF0YSlcbiAgICApO1xuICAgIGlmIChcImVycm9yXCIgaW4gaW5wdXRSZXN1bHQpIHJldHVybiB7IGlucHV0RXJyb3I6IGlucHV0UmVzdWx0LmVycm9yIH07XG4gICAgY29uc3Qgc3VibWl0UmVzdWx0ID0gYXdhaXQgdGhpcy5jb25maWcuc3VibWl0KGlucHV0UmVzdWx0LnZhbHVlKTtcbiAgICBpZiAoc3VibWl0UmVzdWx0ID09IG51bGwpIHJldHVybiB7IHZhbHVlOiBudWxsIH07XG4gICAgaWYgKHR5cGVvZiBzdWJtaXRSZXN1bHQgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShzdWJtaXRSZXN1bHQpKVxuICAgICAgcmV0dXJuIHsgdmFsdWU6IHN1Ym1pdFJlc3VsdCB9O1xuXG4gICAgcmV0dXJuIHN1Ym1pdFJlc3VsdDtcbiAgfVxuXG4gIGFzeW5jIGdldEVsZW1lbnQoKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPFdpZGdldEVsZW1lbnQ8VD4+PiB7XG4gICAgY29uc3QgdmFsdWUgPSBhd2FpdCBWYWx1ZU9yQXdhaXRhYmxlRm4odGhpcy5jb25maWcuZGVmYXVsdCk7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBhd2FpdCB0aGlzLmNvbnRyb2xsZXIudGhlbihjID0+IGMuZ2V0SW5wdXRFbGVtZW50KCkpO1xuICAgICAgcmV0dXJuIHsgLi4uZWxlbWVudCwgdmFsdWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci50aGVuKGMgPT4gYy5nZXRFbGVtZW50KCkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3JlbmRlcmVyXCI7XG5pbXBvcnQgeyBJbnB1dEVycm9yIH0gZnJvbSBcIi4uLy4uL2lucHV0L0lucHV0XCI7XG5pbXBvcnQgeyBJbnB1dFZpZXcsIElucHV0Vmlld1Byb3BzIH0gZnJvbSBcIi4uLy4uL2lucHV0L0lucHV0Vmlld1wiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0VmlldyB9IGZyb20gXCIuLi9BYnN0cmFjdFdpZGdldFZpZXdcIjtcblxuaW1wb3J0IHsgV2lkZ2V0Q29udHJvbGxlciwgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFZpZXdQcm9wcyB9IGZyb20gXCIuLi9XaWRnZXRWaWV3XCI7XG5pbXBvcnQgeyBBbnlGb3JtLCBURm9ybSB9IGZyb20gXCIuL0Zvcm1cIjtcblxuZXhwb3J0IHR5cGUgRm9ybVZpZXdQcm9wczxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55Rm9ybT4sXG4gIFQgZXh0ZW5kcyBURm9ybSA9IFdpZGdldFR5cGU8Qz5bXCJURm9ybVwiXVxuPiA9IFdpZGdldFZpZXdQcm9wczxDPiAmIHtcbiAgLy8gcmVuZGVyRm9ybUVycm9yXG4gIGlucHV0OiBSZW5kZXJlcjxJbnB1dFZpZXdQcm9wczxScGNDb25uZWN0aW9uPFRbXCJJbnB1dFwiXT4+PjtcblxuICBvblN1Ym1pdD8ocmVzdWx0OiBUW1wiVmFsdWVcIl0pO1xuXG4gIG9uRXJyb3I/KHJlc3VsdDogVFtcIkVycm9yXCJdKTtcblxuICBvbklucHV0RXJyb3I/KHJlc3VsdDogSW5wdXRFcnJvcjxUW1wiSW5wdXRcIl0+KTtcbn07XG5cbmV4cG9ydCBjbGFzcyBGb3JtVmlldzxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55Rm9ybT5cbj4gZXh0ZW5kcyBBYnN0cmFjdFdpZGdldFZpZXc8XG4gIEMsXG4gIEZvcm1WaWV3UHJvcHM8Qz4gJiB7XG4gICAgY2hpbGRyZW46IChwcm9wczoge1xuICAgICAgZm9ybTogRm9ybVZpZXc8Qz47XG4gICAgICBpbnB1dDogUmVhY3RFbGVtZW50O1xuICAgIH0pID0+IFJlYWN0RWxlbWVudDtcbiAgfVxuPiB7XG4gIGlucHV0OiBJbnB1dFZpZXc8UnBjQ29ubmVjdGlvbjxXaWRnZXRDb250cm9sbGVyPEM+Pj47XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IHsgLi4udGhpcy5lbGVtZW50IH07XG4gIH1cblxuICBhc3luYyBzdWJtaXQoKSB7XG4gICAgaWYgKCEoYXdhaXQgdGhpcy5pbnB1dC52YWxpZGF0ZSgpKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5wcm9wcy5jb25uZWN0aW9uLmNvbW1hbmQoXG4gICAgICBcInN1Ym1pdFwiLFxuICAgICAgdGhpcy5pbnB1dC5kYXRhXG4gICAgKTtcblxuICAgIGlmIChcImlucHV0RXJyb3JcIiBpbiByZXN1bHQpIHtcbiAgICAgIHRoaXMuaW5wdXQ/LnNldEVycm9yKHJlc3VsdC5pbnB1dEVycm9yKTtcbiAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yPy4ocmVzdWx0LmlucHV0RXJyb3IpO1xuICAgIH0gZWxzZSBpZiAoXCJlcnJvclwiIGluIHJlc3VsdCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkVycm9yPy4ocmVzdWx0LmVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdD8uKHJlc3VsdC52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyVmlldygpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuKHtcbiAgICAgIGZvcm06IHRoaXMsXG4gICAgICBpbnB1dDogdGhpcy5wcm9wcy5pbnB1dCh7XG4gICAgICAgIGNvbm5lY3Rpb246IHRoaXMuY29udHJvbGxlcixcbiAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgb25DaGFuZ2U6IHVuZGVmaW5lZCxcbiAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICBpbnB1dFJlZjogZmllbGQgPT4ge1xuICAgICAgICAgIHRoaXMuaW5wdXQgPSBmaWVsZCBhcyBhbnk7XG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQXdhaXRhYmxlLFxuICBJZixcbiAgSXNVbmRlZmluZWQsXG4gIFBhcnRpYWxVbmRlZmluZWRLZXlzLFxufSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IE5vUnBjIH0gZnJvbSBcIi4uLy4uL05vUnBjXCI7XG5pbXBvcnQge1xuICBBbnlScGMsXG4gIFJwY0NvbW1hbmQsXG4gIFJwY0Nvbm5lY3Rpb24sXG4gIFJwY1VucmVzb2x2ZWRDb25maWcsXG59IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7XG4gIEFueVdpZGdldCxcbiAgVFdpZGdldCxcbiAgV2lkZ2V0LFxuICBXaWRnZXRFbGVtZW50LFxuICBXaWRnZXRIYW5kbGVyQ2xhc3MsXG59IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IElubGluZVdpZGdldEhhbmRsZXIgfSBmcm9tIFwiLi9JbmxpbmVXaWRnZXRIYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIFRJbmxpbmVXaWRnZXQgPSB7XG4gIFRhcmdldDogQW55V2lkZ2V0IHwgdW5kZWZpbmVkO1xuICBFbGVtZW50OiBvYmplY3Q7XG4gIENvbnRyb2xsZXI6IEFueVJwYztcbn07XG5cbmV4cG9ydCB0eXBlIEFueUlubGluZVdpZGdldCA9IElubGluZVdpZGdldDxUSW5saW5lV2lkZ2V0PjtcblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIElubGluZVdpZGdldCB7XG4gIHR5cGUgV2l0aEVsZW1lbnQ8XG4gICAgVGFyZ2V0IGV4dGVuZHMgQW55V2lkZ2V0LFxuICAgIEVsZW1lbnQgZXh0ZW5kcyBvYmplY3RcbiAgPiA9IElubGluZVdpZGdldDx7IENvbnRyb2xsZXI6IE5vUnBjOyBUYXJnZXQ6IFRhcmdldDsgRWxlbWVudDogRWxlbWVudCB9Pjtcbn1cbmV4cG9ydCB0eXBlIElubGluZVdpZGdldDxcbiAgVCBleHRlbmRzIFRJbmxpbmVXaWRnZXQsXG4gIFRhcmdldCBleHRlbmRzIEFueVdpZGdldCA9IE5vbk51bGxhYmxlPFRbXCJUYXJnZXRcIl0+LFxuICBVbmRlZmluZWRUYXJnZXQgZXh0ZW5kcyB1bmRlZmluZWQgPSBJZjxJc1VuZGVmaW5lZDxUW1wiVGFyZ2V0XCJdPiwgdW5kZWZpbmVkPlxuPiA9IFdpZGdldDx7XG4gIFRJbmxpbmVXaWRnZXQ6IFQ7XG4gIENvbm5lY3Rpb246IHtcbiAgICB0YXJnZXQ6IFJwY0Nvbm5lY3Rpb248VGFyZ2V0PiB8IFVuZGVmaW5lZFRhcmdldDtcbiAgfTtcbiAgQ29uZmlnOiBQYXJ0aWFsVW5kZWZpbmVkS2V5czx7XG4gICAgY29udHJvbGxlckNvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxUW1wiQ29udHJvbGxlclwiXT47XG5cbiAgICBnZXRFbGVtZW50OlxuICAgICAgfCAoKCkgPT4gQXdhaXRhYmxlPFRbXCJFbGVtZW50XCJdPilcbiAgICAgIHwgSWY8SXNVbmRlZmluZWQ8VFtcIkVsZW1lbnRcIl0+LCB1bmRlZmluZWQ+O1xuICAgIHRhcmdldENvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxUYXJnZXQ+IHwgVW5kZWZpbmVkVGFyZ2V0O1xuICB9PjtcbiAgSGFuZGxlcjoge307XG4gIFByb3BzOiB7XG4gICAgaW5saW5lVGFyZ2V0OiBUW1wiVGFyZ2V0XCJdO1xuICB9O1xuICBFbGVtZW50OiBbVFtcIkVsZW1lbnRcIl0sIFdpZGdldEVsZW1lbnQ8VGFyZ2V0PiB8IFVuZGVmaW5lZFRhcmdldF07XG4gIENvbnRyb2xsZXI6IFRbXCJDb250cm9sbGVyXCJdO1xuICBDb21tYW5kczoge1xuICAgIHRhcmdldDogUnBjQ29tbWFuZCAmIHsgaGFuZGxlcjogXCJoYW5kbGVUYXJnZXRcIiB9O1xuICB9O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmxpbmVXaWRnZXQ8XG4gIFRhcmdldCBleHRlbmRzIEFueVdpZGdldCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCxcbiAgQ29udHJvbGxlciBleHRlbmRzIEFueVJwYyA9IE5vUnBjLFxuICBFbGVtZW50IGV4dGVuZHMgb2JqZWN0ID0ge30sXG4gIFQgZXh0ZW5kcyBUSW5saW5lV2lkZ2V0ID0ge1xuICAgIEVsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgQ29udHJvbGxlcjogQ29udHJvbGxlcjtcbiAgICBUYXJnZXQ6IFRhcmdldDtcbiAgfVxuPihvcHRpb25zOiB7XG4gIHRhcmdldD86IFRhcmdldDtcbiAgY29udHJvbGxlcj86IENvbnRyb2xsZXI7XG4gIGVsZW1lbnQ/OiBFbGVtZW50O1xufSk6IElubGluZVdpZGdldDxUPiB7XG4gIGNvbnN0IHsgdGFyZ2V0LCBjb250cm9sbGVyIH0gPSBvcHRpb25zO1xuICByZXR1cm4gV2lkZ2V0PElubGluZVdpZGdldDxUPj4oe1xuICAgIGlzR2VuZXJpY0NvbmZpZzogZmFsc2UsXG4gICAgaGFuZGxlcjogSW5saW5lV2lkZ2V0SGFuZGxlciBhcyBXaWRnZXRIYW5kbGVyQ2xhc3M8SW5saW5lV2lkZ2V0PFQ+PixcbiAgICBwcm9wczogeyBpbmxpbmVUYXJnZXQ6IHRhcmdldCB9LFxuICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXIgfHwgTm9ScGMsXG4gICAgY29tbWFuZHM6IHsgdGFyZ2V0OiBcImhhbmRsZVRhcmdldFwiIH0sXG4gICAgY29ubmVjdGlvbjoge1xuICAgICAgdGFyZ2V0KGNvbm4pIHtcbiAgICAgICAgcmV0dXJuIGNvbm4ucnBjLmlubGluZVRhcmdldD8uY3JlYXRlUnBjQ29ubmVjdGlvbihwYXlsb2FkID0+IHtcbiAgICAgICAgICByZXR1cm4gY29ubi5jb21tYW5kKFwidGFyZ2V0XCIsIHBheWxvYWQpO1xuICAgICAgICB9KSE7XG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgTGF6eSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGF0dGVybnMvbGF6eVwiO1xuaW1wb3J0IHsgUnBjRXJyb3IsIFJwY1Jlc29sdmVkSGFuZGxlciwgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0SGFuZGxlciB9IGZyb20gXCIuLi9BYnN0cmFjdFdpZGdldEhhbmRsZXJcIjtcbmltcG9ydCB7IEFueUlubGluZVdpZGdldCB9IGZyb20gXCIuL0lubGluZVdpZGdldFwiO1xuaW1wb3J0IHtcbiAgQW55V2lkZ2V0LFxuICBJV2lkZ2V0SGFuZGxlcixcbiAgV2lkZ2V0Q29udHJvbGxlcixcbiAgV2lkZ2V0RWxlbWVudCxcbn0gZnJvbSBcIi4uL1dpZGdldFwiO1xuXG5leHBvcnQgY2xhc3MgSW5saW5lV2lkZ2V0SGFuZGxlcjxUIGV4dGVuZHMgQW55SW5saW5lV2lkZ2V0PlxuICBleHRlbmRzIEFic3RyYWN0V2lkZ2V0SGFuZGxlcjxUPlxuICBpbXBsZW1lbnRzIElXaWRnZXRIYW5kbGVyPEFueUlubGluZVdpZGdldD4ge1xuICBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxUPj4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb250cm9sbGVyQ29uZmlnO1xuICB9XG5cbiAgQExhenkoKSBnZXQgdGFyZ2V0Q29udGV4dCgpOlxuICAgIHwgUHJvbWlzZTxScGNSZXNvbHZlZEhhbmRsZXI8QW55V2lkZ2V0Pj5cbiAgICB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMucnBjLmlubGluZVRhcmdldClcbiAgICAgIHJldHVybiB0aGlzLnJwYy5pbmxpbmVUYXJnZXQucmVzb2x2ZVJwY0hhbmRsZXIodGhpcy5jb25maWcudGFyZ2V0Q29uZmlnKTtcbiAgfVxuXG4gIGFzeW5jIGhhbmRsZVRhcmdldChwYXlsb2FkKSB7XG4gICAgaWYgKCF0aGlzLnRhcmdldENvbnRleHQpIHRocm93IG5ldyBScGNFcnJvcihgTm8gdGFyZ2V0YCk7XG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0Q29udGV4dC50aGVuKGMgPT4gYy5oYW5kbGUocGF5bG9hZCkpO1xuICB9XG5cbiAgYXN5bmMgZ2V0RWxlbWVudCgpOiBQcm9taXNlPFdpZGdldEVsZW1lbnQ8VD4+IHtcbiAgICB0aGlzLmNvbmZpZy5nZXRFbGVtZW50KCk7XG4gICAgcmV0dXJuIFtcbiAgICAgIGF3YWl0IHRoaXMuY29uZmlnLmdldEVsZW1lbnQoKSxcbiAgICAgIGF3YWl0IHRoaXMudGFyZ2V0Q29udGV4dD8udGhlbihjID0+IGMuZ2V0RWxlbWVudCgpKSxcbiAgICBdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldFZpZXcgfSBmcm9tIFwiLi4vQWJzdHJhY3RXaWRnZXRWaWV3XCI7XG5pbXBvcnQgeyBBbnlJbmxpbmVXaWRnZXQsIFRJbmxpbmVXaWRnZXQgfSBmcm9tIFwiLi9JbmxpbmVXaWRnZXRcIjtcbmltcG9ydCB7IEFueVdpZGdldCwgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFZpZXdQcm9wcyB9IGZyb20gXCIuLi9XaWRnZXRWaWV3XCI7XG5cbmV4cG9ydCBjbGFzcyBJbmxpbmVXaWRnZXRWaWV3PFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlJbmxpbmVXaWRnZXQ+LFxuICBUIGV4dGVuZHMgVElubGluZVdpZGdldCA9IFdpZGdldFR5cGU8Qz5bXCJUSW5saW5lV2lkZ2V0XCJdLFxuICBUYXJnZXQgZXh0ZW5kcyBBbnlXaWRnZXQgPSBOb25OdWxsYWJsZTxUW1wiVGFyZ2V0XCJdPlxuPiBleHRlbmRzIEFic3RyYWN0V2lkZ2V0VmlldzxcbiAgQyxcbiAgV2lkZ2V0Vmlld1Byb3BzPEM+ICYge1xuICAgIGNoaWxkcmVuKHZpZXc6IElubGluZVdpZGdldFZpZXc8Qz4pOiBSZWFjdE5vZGU7XG4gIH1cbj4ge1xuICBnZXQgaW5saW5lRWxlbWVudCgpOiBUW1wiRWxlbWVudFwiXSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFswXTtcbiAgfVxuICBnZXQgdGFyZ2V0UHJvcHMoKTogV2lkZ2V0Vmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248VGFyZ2V0Pj4ge1xuICAgIHJldHVybiB7XG4gICAgICBjb25uZWN0aW9uOiB0aGlzLmNvbm5lY3Rpb24udGFyZ2V0ISxcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudFsxXSEsXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlclZpZXcoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbih0aGlzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVW5pb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBScGNNYXAgfSBmcm9tIFwiLi4vLi4vcnBjLW1hcC9ScGNNYXBcIjtcbmltcG9ydCB7IEFueVdpZGdldCwgV2lkZ2V0LCBXaWRnZXRFbGVtZW50IH0gZnJvbSBcIi4uL1dpZGdldFwiO1xuaW1wb3J0IHsgQW55V2lkZ2V0UmVjb3JkIH0gZnJvbSBcIi4uL3dpZGdldC1tYXAvV2lkZ2V0TWFwXCI7XG5pbXBvcnQgeyBUYWJzV2lkZ2V0SGFuZGxlciB9IGZyb20gXCIuL1RhYnNXaWRnZXRIYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIEFueVRhYnNXaWRnZXQgPSBUYWJzV2lkZ2V0PEFueVdpZGdldFJlY29yZD47XG5cbmV4cG9ydCB0eXBlIFRhYnNXaWRnZXQ8VCBleHRlbmRzIEFueVdpZGdldFJlY29yZD4gPSBXaWRnZXQ8e1xuICBUYWJNYXA6IFQ7XG5cbiAgQ29udHJvbGxlcjogUnBjTWFwPFQ+O1xuXG4gIENvbW1hbmRzOiB7XG4gICAgZ2V0VGFiOiB7XG4gICAgICAoa2V5OiBzdHJpbmcpOiBXaWRnZXRFbGVtZW50PEFueVdpZGdldD47XG4gICAgICBoYW5kbGVyOiBcImhhbmRsZUdldFRhYlwiO1xuICAgIH07XG4gIH07XG4gIENvbm5lY3Rpb246IHtcbiAgICBnZXRUYWI8SyBleHRlbmRzIGtleW9mIFQ+KGtleTogSyk6IFdpZGdldEVsZW1lbnQ8VFtLXT47XG4gIH07XG5cbiAgQ29uZmlnOiBScGNVbnJlc29sdmVkQ29uZmlnPFJwY01hcDxUPj47XG5cbiAgRWxlbWVudDoge1xuICAgIGN1cnJlbnQ/OiBVbmlvbjxcbiAgICAgIHtcbiAgICAgICAgW0sgaW4gc3RyaW5nICYga2V5b2YgVF06IHtcbiAgICAgICAgICBrZXk6IEs7XG4gICAgICAgICAgZWxlbWVudDogV2lkZ2V0RWxlbWVudDxUW0tdPjtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICA+O1xuICB9O1xuXG4gIFByb3BzOiB7XG4gICAgdGFiTWFwOiBUO1xuICB9O1xuXG4gIEhhbmRsZXI6IHt9O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBUYWJzV2lkZ2V0PFQgZXh0ZW5kcyBBbnlXaWRnZXRSZWNvcmQ+KFxuICB0YWJNYXA6IFRcbik6IFRhYnNXaWRnZXQ8VD4ge1xuICByZXR1cm4gPGFueT5XaWRnZXQ8QW55VGFic1dpZGdldD4oe1xuICAgIGNvbnRyb2xsZXI6IFJwY01hcCh0YWJNYXApLFxuICAgIGhhbmRsZXI6IFRhYnNXaWRnZXRIYW5kbGVyLFxuICAgIGNvbW1hbmRzOiB7IGdldFRhYjogXCJoYW5kbGVHZXRUYWJcIiB9LFxuICAgIHByb3BzOiB7IHRhYk1hcCB9LFxuICAgIGNvbm5lY3Rpb246IHtcbiAgICAgIGdldFRhYjogY29ubiA9PiBrZXkgPT4gY29ubi5jb21tYW5kKFwiZ2V0VGFiXCIsIGtleSksXG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBBYnN0cmFjdFdpZGdldEhhbmRsZXIgfSBmcm9tIFwiLi4vQWJzdHJhY3RXaWRnZXRIYW5kbGVyXCI7XG5pbXBvcnQgeyBrZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3Qva2V5c1wiO1xuaW1wb3J0IHsgUmVxdWlyZU9wdGlvbmFsS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IElXaWRnZXRIYW5kbGVyLCBXaWRnZXRDb250cm9sbGVyLCBXaWRnZXRFbGVtZW50IH0gZnJvbSBcIi4uL1dpZGdldFwiO1xuaW1wb3J0IHsgQW55VGFic1dpZGdldCB9IGZyb20gXCIuL1RhYnNXaWRnZXRcIjtcblxudHlwZSBUID0gQW55VGFic1dpZGdldDtcblxuZXhwb3J0IGNsYXNzIFRhYnNXaWRnZXRIYW5kbGVyXG4gIGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRIYW5kbGVyPFQ+XG4gIGltcGxlbWVudHMgSVdpZGdldEhhbmRsZXI8VD4ge1xuICBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxUPj4ge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBhc3luYyBoYW5kbGVHZXRUYWIoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbGxlclxuICAgICAgLnRoZW4oYyA9PiBjLmdldFRhcmdldEhhbmRsZXIoa2V5KSlcbiAgICAgIC50aGVuKHQgPT4gdC5nZXRFbGVtZW50KCkpO1xuICB9XG5cbiAgYXN5bmMgZ2V0RWxlbWVudCgpOiBQcm9taXNlPFJlcXVpcmVPcHRpb25hbEtleXM8V2lkZ2V0RWxlbWVudDxUPj4+IHtcbiAgICBjb25zdCBba2V5XSA9IGtleXModGhpcy5ycGMud2lkZ2V0LmNvbnRyb2xsZXIudGFyZ2V0TWFwKTtcblxuICAgIGNvbnN0IGVsZW1lbnQgPVxuICAgICAgKGtleSB8fCB1bmRlZmluZWQpICYmXG4gICAgICAoYXdhaXQgdGhpcy5jb250cm9sbGVyXG4gICAgICAgIC50aGVuKGMgPT4gYy5nZXRUYXJnZXRIYW5kbGVyKGtleSkpXG4gICAgICAgIC50aGVuKGMgPT4gYy5nZXRFbGVtZW50KCkpKTtcbiAgICByZXR1cm4geyBjdXJyZW50OiBlbGVtZW50ID8geyBrZXksIGVsZW1lbnQgfSA6IHVuZGVmaW5lZCB9O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBPdmVycmlkZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvcmVuZGVyZXJcIjtcbmltcG9ydCB7IFZpZXdTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC92aWV3L1ZpZXdTdGF0ZVwiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0VmlldyB9IGZyb20gXCIuLi9BYnN0cmFjdFdpZGdldFZpZXdcIjtcbmltcG9ydCB7IEFueVdpZGdldCwgQW55V2lkZ2V0Q29ubmVjdGlvbiwgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFZpZXdQcm9wcyB9IGZyb20gXCIuLi9XaWRnZXRWaWV3XCI7XG5pbXBvcnQgeyBBbnlUYWJzV2lkZ2V0LCBUYWJzV2lkZ2V0IH0gZnJvbSBcIi4vVGFic1dpZGdldFwiO1xuXG5leHBvcnQgdHlwZSBBbnlUYWJzV2lkZ2V0Q29ubmVjdGlvbiA9IFJwY0Nvbm5lY3Rpb248QW55VGFic1dpZGdldD47XG5cbmV4cG9ydCBjbGFzcyBUYWJzV2lkZ2V0VmlldzxcbiAgQyBleHRlbmRzIEFueVRhYnNXaWRnZXRDb25uZWN0aW9uXG4+IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRWaWV3PFxuICBDLFxuICBXaWRnZXRWaWV3UHJvcHM8Qz4gJiB7XG4gICAgY2hpbGRyZW46IFJlbmRlcmVyPFRhYnNXaWRnZXRWaWV3PEM+PjtcbiAgfVxuPiB7XG4gIEBWaWV3U3RhdGUoKVxuICBwcm90ZWN0ZWQgX2N1cnJlbnRUYWJQcm9wczpcbiAgICB8IE92ZXJyaWRlPFdpZGdldFZpZXdQcm9wczxBbnlXaWRnZXRDb25uZWN0aW9uPiwgeyBrZXk6IHN0cmluZyB9PlxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIGdldCBjdXJyZW50VGFiUHJvcHMoKTpcbiAgICB8IE92ZXJyaWRlPFdpZGdldFZpZXdQcm9wczxBbnlXaWRnZXRDb25uZWN0aW9uPiwgeyBrZXk6IHN0cmluZyB9PlxuICAgIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFRhYlByb3BzO1xuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZVRhYlByb3BzKHsga2V5LCBlbGVtZW50IH06IHsga2V5OiBzdHJpbmc7IGVsZW1lbnQ6IG9iamVjdCB9KSB7XG4gICAgdGhpcy5fY3VycmVudFRhYlByb3BzID0ge1xuICAgICAga2V5LFxuICAgICAgY29ubmVjdGlvbjogdGhpcy5jb250cm9sbGVyW2tleV0sXG4gICAgICBlbGVtZW50LFxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlRWxlbWVudChlbGVtZW50OiBXaWRnZXRUeXBlPEM+W1wiRWxlbWVudFwiXSkge1xuICAgIGlmIChlbGVtZW50LmN1cnJlbnQpIHRoaXMudXBkYXRlVGFiUHJvcHMoZWxlbWVudC5jdXJyZW50KTtcbiAgfVxuXG4gIGFzeW5jIHN3aXRjaFRvPEsgZXh0ZW5kcyBzdHJpbmcgJiBrZXlvZiBXaWRnZXRUeXBlPEM+W1wiVGFiTWFwXCJdPihrZXk6IEspIHtcbiAgICB0aGlzLnVwZGF0ZVRhYlByb3BzKHtcbiAgICAgIGtleSxcbiAgICAgIGVsZW1lbnQ6IGF3YWl0IHRoaXMucHJvcHMuY29ubmVjdGlvbi5nZXRUYWIoa2V5KSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlclZpZXcoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbih0aGlzKTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSAoKSA9PiBbXTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL3NyYy9sb2dnaW5nIHN5bmMgcmVjdXJzaXZlXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7Il0sInNvdXJjZVJvb3QiOiIifQ==