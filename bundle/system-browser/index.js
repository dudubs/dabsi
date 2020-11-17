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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_rpc_MuiDataManagerView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/rpc/MuiDataManagerView */ "./src/browser/mui/rpc/MuiDataManagerView.tsx");
/* harmony import */ var _typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../typerpc/input/input-map/InputMapView */ "./src/typerpc/input/input-map/InputMapView.tsx");
/* harmony import */ var _common_AclUsersManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/AclUsersManager */ "./src/system/common/AclUsersManager.ts");
/* harmony import */ var _MuiUserBasicInfoInputView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MuiUserBasicInfoInputView */ "./src/system/browser/MuiUserBasicInfoInputView.tsx");
/* harmony import */ var _MuiUserContactInfoInputView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MuiUserContactInfoInputView */ "./src/system/browser/MuiUserContactInfoInputView.tsx");
;





// MuiAclManagerView
const MuiAclUsersManagerView = (router) => {
    (0,_browser_mui_rpc_MuiDataManagerView__WEBPACK_IMPORTED_MODULE_1__.MuiDataManagerView)({
        router,
        connection: _common_AclUsersManager__WEBPACK_IMPORTED_MODULE_3__.AclUsersManager.service,
        renderAddInput: props => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiUserBasicInfoInputView__WEBPACK_IMPORTED_MODULE_4__.MuiUserBasicInfoInputView, Object.assign({}, props)),
        renderEditInput: props => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerpc_input_input_map_InputMapView__WEBPACK_IMPORTED_MODULE_2__.InputMapView.Fields, Object.assign({}, props, { fields: {
                basicInfo: props => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiUserBasicInfoInputView__WEBPACK_IMPORTED_MODULE_4__.MuiUserBasicInfoInputView, Object.assign({}, props)),
                contactInfo: props => react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiUserContactInfoInputView__WEBPACK_IMPORTED_MODULE_5__.MuiUserContactInfoInputView, Object.assign({}, props)),
            } }))),
    });
};


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
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _react_reactor_useEmitted__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../react/reactor/useEmitted */ "./src/react/reactor/useEmitted.ts");
/* harmony import */ var _typerouter2_ReactRouter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../typerouter2/ReactRouter */ "./src/typerouter2/ReactRouter.ts");
/* harmony import */ var _LoginInfoEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LoginInfoEvent */ "./src/system/browser/LoginInfoEvent.ts");
/* harmony import */ var _MuiAclUsersManagerView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MuiAclUsersManagerView */ "./src/system/browser/MuiAclUsersManagerView.tsx");
;





function MuiAdminView(router) {
    console.log("x");
    (0,_typerouter2_ReactRouter__WEBPACK_IMPORTED_MODULE_3__.ReactRouter)(router, {
        wrap(props) {
            const loginInfo = (0,_react_reactor_useEmitted__WEBPACK_IMPORTED_MODULE_2__.useEmitted)(_LoginInfoEvent__WEBPACK_IMPORTED_MODULE_4__.LoginInfoEvent);
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
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/Grid.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/esm/Paper/Paper.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/makeStyles.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/Typography.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_rpc_inputs_MuiDataInputView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/rpc/inputs/MuiDataInputView */ "./src/browser/mui/rpc/inputs/MuiDataInputView.tsx");
/* harmony import */ var _browser_mui_rpc_MuiFormView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../browser/mui/rpc/MuiFormView */ "./src/browser/mui/rpc/MuiFormView.tsx");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _react_reactor_useEmitted__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../react/reactor/useEmitted */ "./src/react/reactor/useEmitted.ts");
/* harmony import */ var _typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../typerpc/widget/WidgetRouterView */ "./src/typerpc/widget/WidgetRouterView.tsx");
/* harmony import */ var _MuiAdminView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MuiAdminView */ "./src/system/browser/MuiAdminView.tsx");
/* harmony import */ var _common_SystemApp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/SystemApp */ "./src/system/common/SystemApp.ts");
/* harmony import */ var _LoginInfoEvent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LoginInfoEvent */ "./src/system/browser/LoginInfoEvent.ts");
;












const useStyles = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__.default)(theme => ({
    paper: {
        padding: theme.spacing(2),
    },
}));
function MuiSystemView(router) {
    (0,_MuiAdminView__WEBPACK_IMPORTED_MODULE_6__.MuiAdminView)(router.at("admin"));
    (0,_typerpc_widget_WidgetRouterView__WEBPACK_IMPORTED_MODULE_5__.WidgetRouterView)(router.at("login"), _common_SystemApp__WEBPACK_IMPORTED_MODULE_7__.SystemApp.service.devLogin, (props, { emit }) => {
        const classes = useStyles();
        const loginInfo = (0,_react_reactor_useEmitted__WEBPACK_IMPORTED_MODULE_4__.useEmitted)(_LoginInfoEvent__WEBPACK_IMPORTED_MODULE_8__.LoginInfoEvent);
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10__.default, { container: true, justify: "center" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10__.default, { item: true },
                    (loginInfo === null || loginInfo === void 0 ? void 0 : loginInfo.success) && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__.default, null, _lang_Lang__WEBPACK_IMPORTED_MODULE_3__.Lang `WELCOME_TO_${"fullName"}`({
                        fullName: loginInfo.success.fullName,
                    }))),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12__.default, { className: classes.paper },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_rpc_MuiFormView__WEBPACK_IMPORTED_MODULE_2__.MuiFormView, Object.assign({}, props, { onSubmit: loginInfo => {
                                emit(new _LoginInfoEvent__WEBPACK_IMPORTED_MODULE_8__.LoginInfoEvent(loginInfo));
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
            hasLoadType: !!options.loadType,
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
        if (this.rpc.hasLoadType) {
            const row = await (this.config.loadSource || this.config.source).get(String(key));
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
            .sort(orders)
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
    async reload() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9NdWlBZG1pbi50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvTXVpTmVzdGVkTWVudS50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlCdXR0b24udHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NvbXBvbmVudHMvTXVpRGFuZ2VyQnV0dG9uLnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9jb21wb25lbnRzL011aURhbmdlckRpYWxvZy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlEZWxldGVCdXR0b24udHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NvbXBvbmVudHMvTXVpRGlhbG9nLnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9jb21wb25lbnRzL011aUdyaWQudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NvbXBvbmVudHMvTXVpSWNvbi50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlMaW5rLnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9jb21wb25lbnRzL011aVRhYmxlQ2VsbC50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlUYWJsZVRvb2xiYXIudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NyZWF0ZU11aVN5c3RlbS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9ycGMvTXVpRGF0YU1hbmFnZXJWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9ycGMvTXVpRGF0YVRhYmxlVmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvcnBjL011aUZvcm1WaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9ycGMvTXVpVGFic1dpZGdldFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL3JwYy9pbnB1dHMvTXVpRGF0YUlucHV0Vmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvcnBjL2lucHV0cy9NdWlUZXh0SW5wdXRWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vTWV0YVR5cGUudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL2FycmF5L3VzZUFycmF5VG9TZXEudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL2Fzc2VydC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vYXN5bmMvVGltZW91dC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vYXN5bmMvV2FpdGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9nZXROZXh0UGF0aC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vbWFwL21hcEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL21hcC90b3VjaE1hcC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vb2JqZWN0L2RlZmluZWQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9kZWZpbmVkQXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9lbnRyaWVzLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9vYmplY3QvaGFzS2V5cy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vb2JqZWN0L2tleXMudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9tYXBBbmRGaWx0ZXJPYmplY3QudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9tYXBPYmplY3QudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9tYXBPYmplY3RUb0FycmF5LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9vYmplY3QvbWVyZ2VEZXNjcmlwdG9ycy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vcGF0dGVybnMvbGF6eS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL2NhcGl0YWxpemUudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3N0cmluZy9mcm9tQ29uc3RhbnRDYXNlLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9zdHJpbmcvZnJvbVByb3BlcnR5Q2FzZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL2pvaW5UZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL2pvaW5VcmwudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3N0cmluZy9tYXRjaENhc2UudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3N0cmluZy9zcGxpdC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL3RvQ29uc3RhbnRDYXNlLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9zdHJpbmcvdG9UaXRsZUNhc2UudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3R5cGluZ3MudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvaW1tdXRhYmxlMi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9sYW5nL0xhbmcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvbGFuZy9MYW5nS2V5LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9sYW5nL0xhbmdUZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9sYW5nL0xhbmdUcmFuc2xhdG9yLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2xhbmcvTGFuZ1ZpZXcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvbG9nZ2luZy9pbnNwZWN0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L0hvb2tSZWYudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvVGFibGVMYXlvdXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvcmVhY3Rvci9SZWFjdG9yLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3JlYWN0b3IvdXNlRW1pdHRlZC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC9yZWFjdG9yL3VzZUVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvdXRpbHMvRW1wdHlGcmFnbWVudC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC91dGlscy9ob29rcy9jcmVhdGVVbmRlZmluZWRDb250ZXh0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3V0aWxzL2hvb2tzL3VzZURlYm91bmNlLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3V0aWxzL21lcmdlUHJvcHMudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvdXRpbHMvcGFydGlhbFByb3BzLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3V0aWxzL3NldFJlZi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC92aWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3Qvdmlldy9WaWV3U3RhdGUudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3Qvdmlldy9zZXRWaWV3U3RhdGVLZXkudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvTG9naW5JbmZvRXZlbnQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvTXVpQWNsVXNlcnNNYW5hZ2VyVmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvTXVpQWRtaW5WaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vYnJvd3Nlci9NdWlTeXN0ZW1Sb290Vmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvTXVpU3lzdGVtVmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvTXVpVXNlckJhc2ljSW5mb0lucHV0Vmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvTXVpVXNlckNvbnRhY3RJbmZvSW5wdXRWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vYnJvd3Nlci9TeXN0ZW1Sb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2NvbW1vbi9BY2xVc2Vyc01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2NvbW1vbi9BZG1pbkFwcC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vY29tbW9uL1N5c3RlbUFwcC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vY29tbW9uL1VzZXJBcHAudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2NvbW1vbi9hZG1pbi9BZG1pblJvdXRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcm91dGVyMi9SZWFjdFJvdXRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcm91dGVyMi9SZWFjdFJvdXRlclZpZXcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJvdXRlcjIvUm91dGVQcm9wcy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcm91dGVyMi9Sb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJvdXRlcjIvUm91dGVyTG9jYXRpb24udHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9Db25maWdGYWN0b3J5LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvR2VuZXJpY0NvbmZpZy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL05vUnBjLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvUnBjLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvUnBjQ29uZmlnSG9vay50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL1JwY1BhcnRpYWxDb25maWcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9kYXRhLW1hbmFnZXIvRGF0YU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9kYXRhLW1hbmFnZXIvRGF0YU1hbmFnZXJIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvZGF0YS1tYW5hZ2VyL0RhdGFNYW5hZ2VyUm91dGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvQWJzdHJhY3RJbnB1dEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9BYnN0cmFjdElucHV0Vmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9JbnB1dC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L0lucHV0RXJyb3JIb29rLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvSW5wdXRWaWV3Q2hpbGRyZW4udHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9MZW5ndGhFcnJvci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L1ZhbHVlT3JBd2FpdGFibGVGbi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L2RhdGEtaW5wdXQvRGF0YUlucHV0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvZGF0YS1pbnB1dC9EYXRhSW5wdXRIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvZGF0YS1pbnB1dC9EYXRhSW5wdXRWaWV3LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvaW5wdXQtbWFwL0lucHV0TWFwLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvaW5wdXQtbWFwL0lucHV0TWFwSGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L2lucHV0LW1hcC9JbnB1dE1hcFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvbnVsbGFibGUtaW5wdXQvQWJzdHJhY3ROdWxsYWJsZUlucHV0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L251bGxhYmxlLWlucHV0L051bGxhYmxlSW5wdXRWaWV3LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvdGV4dC1pbnB1dC9UZXh0SW5wdXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC90ZXh0LWlucHV0L1RleHRJbnB1dEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC90ZXh0LWlucHV0L1RleHRJbnB1dExvYWRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L3RleHQtaW5wdXQvVGV4dElucHV0Vmlldy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3JwYy1mbi9ScGNGbi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3JwYy1mbi9ScGNGbkhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9ycGMtbWFwL1JwY01hcC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3JwYy1tYXAvUnBjTWFwSGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3JwYy1wYXJhbWV0ZXIvUnBjUGFyYW1ldGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvcnBjLXBhcmFtZXRlci9ScGNQYXJhbWV0ZXJIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L0Fic3RyYWN0V2lkZ2V0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9BYnN0cmFjdFdpZGdldFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L1Jvdy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9XaWRnZXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvV2lkZ2V0Um91dGVyVmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvV2lkZ2V0Vmlld0xvYWRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9kYXRhLXRhYmxlL0RhdGFUYWJsZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9kYXRhLXRhYmxlL0RhdGFUYWJsZUhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvZGF0YS10YWJsZS9EYXRhVGFibGVWaWV3LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9mb3JtL0Zvcm1IYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybVZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2lubGluZS13aWRnZXQvSW5saW5lV2lkZ2V0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2lubGluZS13aWRnZXQvSW5saW5lV2lkZ2V0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9pbmxpbmUtd2lkZ2V0L0lubGluZVdpZGdldFZpZXcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvdGFicy13aWRnZXQvVGFic1dpZGdldC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC90YWJzLXdpZGdldC9UYWJzV2lkZ2V0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC90YWJzLXdpZGdldC9UYWJzV2lkZ2V0Vmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvbG9nZ2luZ3xzeW5jIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQ0FBOEM7QUFDQTtBQUNRO0FBQ047QUFDTTtBQUNkO0FBQ0Q7QUFDWTtBQUsxQjtBQUV6QixNQUFNLFNBQVMsR0FBRyxpRUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxTQUFTLEVBQUU7UUFDVCxTQUFTLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDNUI7SUFDRCxNQUFNLEVB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RyxDQUFDO1lBQ2hDLE9BQU87U0FDUixDQUFDO0lBQ0osQ0FBQztJQUVTLGFBQWEsQ0FBQyxPQUFpQztRQUN2RCxJQUFJLE9BQU8sQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRLENBQW1ELEdBQU07UUFDckUsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUNsQixHQUFHO1lBQ0gsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNqRCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNGO0FBaENDO0lBREMsZ0VBQVMsRUFBRTs7d0RBR0U7Ozs7Ozs7Ozs7Ozs7O0FDdkJoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBwQmFyIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9BcHBCYXJcIjtcbmltcG9ydCBEcmF3ZXIgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0RyYXdlclwiO1xuaW1wb3J0IHsgbWFrZVN0eWxlcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIjtcbmltcG9ydCBUb29sYmFyIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9Ub29sYmFyXCI7XG5pbXBvcnQgVHlwb2dyYXBoeSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeVwiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBMYW5nIH0gZnJvbSBcIi4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgTXVpQnV0dG9uIH0gZnJvbSBcIi4vY29tcG9uZW50cy9NdWlCdXR0b25cIjtcbmltcG9ydCB7XG4gIE11aU5lc3RlZE1lbnVDaGlsZCxcbiAgTXVpTmVzdGVkTWVudVByb3BzLFxuICBNdWlOZXN0ZWRNZW51LFxufSBmcm9tIFwiLi9NdWlOZXN0ZWRNZW51XCI7XG5cbmNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXModGhlbWUgPT4gKHtcbiAgY29udGFpbmVyOiB7XG4gICAgbWFyZ2luVG9wOiB0aGVtZS5zcGFjaW5nKDIpLFxuICB9LFxuICBkcmF3ZXI6IHtcbiAgICBtaW5XaWR0aDogMjUwLFxuICB9LFxuICByb290OiB7fSxcbiAgdGl0bGU6IHtcbiAgICBmbGV4R3JvdzogMSxcbiAgfSxcbiAgXCJAZ2xvYmFsXCI6IHtcbiAgICBib2R5OiB7XG4gICAgICBtYXJnaW46IDAsXG4gICAgfSxcbiAgfSxcbn0pKTtcblxuZXhwb3J0IHR5cGUgTXVpQWRtaW5Qcm9wcyA9IHtcbiAgY2hpbGRyZW4/O1xuICBtZW51PzogUmVjb3JkPHN0cmluZywgTXVpTmVzdGVkTWVudVByb3BzPjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlBZG1pbih7IGNoaWxkcmVuLCBtZW51IH06IE11aUFkbWluUHJvcHMpIHtcbiAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xuICBjb25zdCBbaXNNZW51T3Blbiwgc2V0TWVudV0gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLnJvb3R9PlxuICAgICAgPEFwcEJhciBwb3NpdGlvbj17XCJzdGF0aWNcIn0+XG4gICAgICAgIDxUb29sYmFyPlxuICAgICAgICAgIDxNdWlCdXR0b25cbiAgICAgICAgICAgIGljb25Pbmx5XG4gICAgICAgICAgICBpY29uPXtyZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL01lbnVcIil9XG4gICAgICAgICAgICBlZGdlPXtcInN0YXJ0XCJ9XG4gICAgICAgICAgICBjb2xvcj1cImluaGVyaXRcIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBzZXRNZW51KHRydWUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxUeXBvZ3JhcGh5PntMYW5nYEFETUlOYH08L1R5cG9ncmFwaHk+XG4gICAgICAgIDwvVG9vbGJhcj57XCIgXCJ9XG4gICAgICAgIDxEcmF3ZXIgb3Blbj17aXNNZW51T3Blbn0ga2VlcE1vdW50ZWQgb25DbG9zZT17KCkgPT4gc2V0TWVudShmYWxzZSl9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmRyYXdlcn0+XG4gICAgICAgICAgICA8TXVpTmVzdGVkTWVudSBjaGlsZHJlbj17bWVudXx8e319ICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0RyYXdlcj5cbiAgICAgIDwvQXBwQmFyPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuY29udGFpbmVyfT57Y2hpbGRyZW59PC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgQ29sbGFwc2UgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0NvbGxhcHNlXCI7XG5pbXBvcnQgX0xpc3QgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0xpc3RcIjtcbmltcG9ydCBMaXN0SXRlbSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvTGlzdEl0ZW1cIjtcbmltcG9ydCBMaXN0SXRlbUljb24gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtSWNvblwiO1xuaW1wb3J0IExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbVNlY29uZGFyeUFjdGlvblwiO1xuaW1wb3J0IExpc3RJdGVtVGV4dCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvTGlzdEl0ZW1UZXh0XCI7XG5pbXBvcnQgeyBtYWtlU3R5bGVzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiO1xuaW1wb3J0IGNsc3ggZnJvbSBcImNsc3hcIjtcbmltcG9ydCBSZWFjdCwgeyBEaXNwYXRjaCwgUmVhY3ROb2RlLCBTZXRTdGF0ZUFjdGlvbiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGhhc0tleXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9oYXNLZXlzXCI7XG5pbXBvcnQgeyBtYXBPYmplY3RUb0FycmF5IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0VG9BcnJheVwiO1xuaW1wb3J0IHsgSW1tdXRhYmxlUmVjb3JkLCBJbW11dGFibGVTZXQgfSBmcm9tIFwiLi4vLi4vaW1tdXRhYmxlMlwiO1xuaW1wb3J0IHsgTGFuZ0tleSB9IGZyb20gXCIuLi8uLi9sYW5nL0xhbmdLZXlcIjtcbmltcG9ydCB7IFN0YXRlUHJvcHMgfSBmcm9tIFwiLi4vLi4vcmVhY3Qvc3RhdGVIZWxwZXJzXCI7XG5pbXBvcnQgeyBwYXJ0aWFsUHJvcHMgfSBmcm9tIFwiLi4vLi4vcmVhY3QvdXRpbHMvcGFydGlhbFByb3BzXCI7XG5pbXBvcnQgeyBNdWlJY29uIH0gZnJvbSBcIi4vY29tcG9uZW50cy9NdWlJY29uXCI7XG5cbmNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXModGhlbWUgPT4gKHtcbiAgbmVzdGVkOiB7XG4gICAgcGFkZGluZ0xlZnQ6IHRoZW1lLnNwYWNpbmcoNCksXG4gIH0sXG5cbiAgaXRlbVdpdGhDaGlsZFRleHQ6IHt9LFxuICBwYXJlbnQ6IHtcbiAgICAvLyBmb250V2VpZ2h0OiBcImJvbGRcIixcbiAgfSxcbiAgbGlzdEl0ZW1UZXh0OiB7XG4gICAgZm9udFNpemU6IHRoZW1lLnR5cG9ncmFwaHkuZm9udFNpemUsXG4gIH0sXG59KSk7XG5jb25zdCBMaXN0ID0gcGFydGlhbFByb3BzKF9MaXN0LCB7XG4gIC8vIGRlbnNlOiB0cnVlLFxufSk7XG5cbmV4cG9ydCB0eXBlIE11aU5lc3RlZE1lbnVQcm9wcyA9IHtcbiAgdGl0bGU/OiBSZWFjdE5vZGU7XG4gIGljb24/OiBNdWlJY29uO1xuICBvbkNsaWNrPygpO1xuICBjaGlsZHJlbj86IFJlY29yZDxzdHJpbmcsIE11aU5lc3RlZE1lbnVQcm9wcz47XG59O1xuXG5jbGFzcyBNdWlOZXN0ZWRNZW51U3RhdGUgZXh0ZW5kcyBJbW11dGFibGVSZWNvcmQoe1xuICBzZWxlY3RlZFBhdGg6IFwiXCIsXG59KSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gTXVpTmVzdGVkTWVudSh7XG4gIGNoaWxkcmVuLFxufToge1xuICBjaGlsZHJlbjogUmVjb3JkPHN0cmluZywgTXVpTmVzdGVkTWVudVByb3BzPjtcbn0pIHtcbiAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKCgpID0+IG5ldyBNdWlOZXN0ZWRNZW51U3RhdGUoKSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGlzdD5cbiAgICAgIHttYXBPYmplY3RUb0FycmF5KGNoaWxkcmVuLCAoY2hpbGQsIGtleSkgPT4gKFxuICAgICAgICA8TXVpTmVzdGVkTWVudUNoaWxkXG4gICAgICAgICAgey4uLmNoaWxkfVxuICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgIG1lbnVQYXRoPXtrZXl9XG4gICAgICAgICAgbWVudUtleT17a2V5fVxuICAgICAgICAgIGRlcHRoPXswfVxuICAgICAgICAgIGNsYXNzZXM9e2NsYXNzZXN9XG4gICAgICAgICAgc3RhdGU9e3N0YXRlfVxuICAgICAgICAgIHNldFN0YXRlPXtzZXRTdGF0ZX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvTGlzdD5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE11aU5lc3RlZE1lbnVDaGlsZCh7XG4gIGNoaWxkcmVuLFxuICB0aXRsZSxcbiAgaWNvbixcbiAgb25DbGljayxcbiAgZGVwdGgsXG4gIG1lbnVQYXRoLFxuICBtZW51S2V5LFxuICAuLi5wcm9wc1xufTogTXVpTmVzdGVkTWVudVByb3BzICZcbiAgU3RhdGVQcm9wczxNdWlOZXN0ZWRNZW51U3RhdGU+ICYge1xuICAgIG1lbnVQYXRoOiBzdHJpbmc7XG4gICAgZGVwdGg6IG51bWJlcjtcbiAgICBtZW51S2V5OiBzdHJpbmc7XG4gICAgY2xhc3NlczogUmV0dXJuVHlwZTx0eXBlb2YgdXNlU3R5bGVzPjtcbiAgfSkge1xuICBjb25zdCBbaXNPcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgeyBjbGFzc2VzLCBzZXRTdGF0ZSwgc3RhdGUgfSA9IHByb3BzO1xuXG4gIGNvbnN0IGl0ZW1JY29uID0gPExpc3RJdGVtSWNvbj57TXVpSWNvbihpY29uKX08L0xpc3RJdGVtSWNvbj47XG5cbiAgY29uc3QgaGFzQ2hpbGRyZW4gPSBoYXNLZXlzKGNoaWxkcmVuKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8TGlzdEl0ZW1cbiAgICAgICAgYnV0dG9uXG4gICAgICAgIHNlbGVjdGVkPXtzdGF0ZS5zZWxlY3RlZFBhdGggPT09IG1lbnVQYXRofVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgc2V0U3RhdGUoc3RhdGUuc2V0KFwic2VsZWN0ZWRQYXRoXCIsIG1lbnVQYXRoKSk7XG4gICAgICAgICAgb25DbGljaz8uKCk7XG4gICAgICAgICAgaWYgKGhhc0NoaWxkcmVuKSB7XG4gICAgICAgICAgICBzZXRPcGVuKCFpc09wZW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2l0ZW1JY29ufVxuICAgICAgICA8TGlzdEl0ZW1UZXh0XG4gICAgICAgICAgcHJpbWFyeVR5cG9ncmFwaHlQcm9wcz17e1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBjbHN4KFxuICAgICAgICAgICAgICBjbGFzc2VzLmxpc3RJdGVtVGV4dCxcbiAgICAgICAgICAgICAgaGFzS2V5cyhjaGlsZHJlbikgJiYgY2xhc3Nlcy5wYXJlbnRcbiAgICAgICAgICAgICksXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxMYW5nS2V5IGZvcj17bWVudUtleX0+e3RpdGxlfTwvTGFuZ0tleT5cbiAgICAgICAgPC9MaXN0SXRlbVRleHQ+XG5cbiAgICAgICAgPExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uPlxuICAgICAgICAgIHtoYXNDaGlsZHJlbiAmJlxuICAgICAgICAgICAgTXVpSWNvbihcbiAgICAgICAgICAgICAgaXNPcGVuXG4gICAgICAgICAgICAgICAgPyByZXF1aXJlKGBAbWF0ZXJpYWwtdWkvaWNvbnMvRXhwYW5kTGVzc2ApXG4gICAgICAgICAgICAgICAgOiByZXF1aXJlKGBAbWF0ZXJpYWwtdWkvaWNvbnMvRXhwYW5kTW9yZWApXG4gICAgICAgICAgICApfVxuICAgICAgICA8L0xpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uPlxuICAgICAgPC9MaXN0SXRlbT5cbiAgICAgIHtpc09wZW4gJiYgKFxuICAgICAgICA8Q29sbGFwc2UgaW4+XG4gICAgICAgICAgPExpc3QgZGlzYWJsZVBhZGRpbmcgY2xhc3NOYW1lPXtjbHN4KGRlcHRoID4gMCAmJiBjbGFzc2VzLm5lc3RlZCl9PlxuICAgICAgICAgICAge21hcE9iamVjdFRvQXJyYXkoY2hpbGRyZW4gfHwge30sIChjaGlsZFByb3BzLCBrZXkpID0+IChcbiAgICAgICAgICAgICAgPE11aU5lc3RlZE1lbnVDaGlsZFxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICBkZXB0aD17ZGVwdGggKyAxfVxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIG1lbnVQYXRoPXttZW51UGF0aCArIFwiL1wiICsga2V5fVxuICAgICAgICAgICAgICAgIG1lbnVLZXk9e2tleX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICAgICAgICB7Li4uY2hpbGRQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvTGlzdD5cbiAgICAgICAgPC9Db2xsYXBzZT5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgQnV0dG9uLCB7IEJ1dHRvblByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0J1dHRvblwiO1xuaW1wb3J0IEljb25CdXR0b24sIHsgSWNvbkJ1dHRvblByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0ljb25CdXR0b25cIjtcbmltcG9ydCBUb29sdGlwLCB7IFRvb2x0aXBQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9Ub29sdGlwXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIENvbXBvbmVudFR5cGUsXG4gIGNyZWF0ZUVsZW1lbnQsXG4gIFJlYWN0RWxlbWVudCxcbiAgUmVhY3ROb2RlLFxuICB1c2VSZWYsXG4gIHVzZVN0YXRlLFxufSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEZuLCBPdmVycmlkZSwgUGx1Y2tSZXF1aXJlZCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgTGFuZyB9IGZyb20gXCIuLi8uLi8uLi9sYW5nL0xhbmdcIjtcbmltcG9ydCB7IHVwZGF0ZVJlZiB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC9Ib29rUmVmXCI7XG5pbXBvcnQgeyBwYXJ0aWFsUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvcGFydGlhbFByb3BzXCI7XG5pbXBvcnQgeyBNdWlJY29uIH0gZnJvbSBcIi4vTXVpSWNvblwiO1xuXG5leHBvcnQgdHlwZSBNdWlCdXR0b25Qcm9wczxQID0ge30+ID1cbiAgfCBPdmVycmlkZTxCdXR0b25Qcm9wcywgQmFzZVByb3BzICYgUD5cbiAgfCBPdmVycmlkZTxJY29uQnV0dG9uUHJvcHMsIEJhc2VQcm9wcyAmIFA+O1xuXG50eXBlIEJhc2VQcm9wcyA9IHtcbiAgQnV0dG9uUHJvcHM/OiBCdXR0b25Qcm9wcztcbiAgSWNvbkJ1dHRvblByb3BzPzogSWNvbkJ1dHRvblByb3BzO1xuICByZW5kZXJPbkNsaWNrPyhjbG9zZTogKCkgPT4gdm9pZCwgZ2V0RWw6ICgpID0+IGFueSk6IFJlYWN0RWxlbWVudDtcbiAgZGlzYWJsZVRvb2x0aXA/OiBib29sZWFuO1xuICBpY29uT25seT86IGJvb2xlYW47XG4gIFRvb2x0aXBQcm9wcz86IFBhcnRpYWw8VG9vbHRpcFByb3BzPjtcbiAgZGFuZ2VyPzogYm9vbGVhbjtcbiAgaWNvbj86IE11aUljb247XG4gIHRpdGxlPzogUmVhY3ROb2RlO1xuICBidXR0b25UeXBlPzogQ29tcG9uZW50VHlwZTxNdWlCdXR0b25Qcm9wcz47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpQnV0dG9uKHByb3BzOiBNdWlCdXR0b25Qcm9wcykge1xuICBpZiAocHJvcHMuYnV0dG9uVHlwZSkge1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KHByb3BzLmJ1dHRvblR5cGUsIHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgYnV0dG9uVHlwZTogdW5kZWZpbmVkLFxuICAgIH0pO1xuICB9XG5cbiAgbGV0IHtcbiAgICBCdXR0b25Qcm9wcyxcbiAgICBJY29uQnV0dG9uUHJvcHMsXG4gICAgcmVuZGVyT25DbGljayxcbiAgICBUb29sdGlwUHJvcHMsXG4gICAgZGlzYWJsZVRvb2x0aXAsXG4gICAgaWNvbk9ubHksXG4gICAgYnV0dG9uUmVmOiBpbml0QnV0dG9uUmVmLFxuICAgIGJ1dHRvblR5cGUsXG4gICAgLi4uYnV0dG9uUHJvcHNcbiAgfTogTXVpQnV0dG9uUHJvcHMgPSBwcm9wcztcblxuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGJ1dHRvblJlZiA9IHVzZVJlZjx1bmtub3duPihudWxsKTtcbiAgbGV0IGVsZW1lbnQ6IFJlYWN0RWxlbWVudDtcblxuICBsZXQgdHlwZTogQ29tcG9uZW50VHlwZTtcbiAgaWYgKGljb25Pbmx5KSB7XG4gICAgdHlwZSA9IEljb25CdXR0b247XG4gICAgYnV0dG9uUHJvcHMgPSB7XG4gICAgICAuLi5idXR0b25Qcm9wcyxcbiAgICAgIC4uLkljb25CdXR0b25Qcm9wcyxcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHR5cGUgPSBCdXR0b247XG4gICAgYnV0dG9uUHJvcHMgPSB7XG4gICAgICAuLi5idXR0b25Qcm9wcyxcbiAgICAgIC4uLkJ1dHRvblByb3BzLFxuICAgIH07XG4gIH1cblxuICBjb25zdCB7IHRpdGxlLCBkYW5nZXIsIGljb24sIG9uQ2xpY2ssIC4uLmVsZW1lbnRQcm9wcyB9ID0gYnV0dG9uUHJvcHMgYXMgYW55O1xuICBpZiAoZGFuZ2VyKSB7XG4gICAgZWxlbWVudFByb3BzLmNvbG9yID0gXCJzZWNvbmRhcnlcIjtcbiAgfVxuICBlbGVtZW50UHJvcHMuYnV0dG9uUmVmID0gY3VycmVudCA9PiB7XG4gICAgdXBkYXRlUmVmKGluaXRCdXR0b25SZWYsIGN1cnJlbnQpO1xuICAgIHVwZGF0ZVJlZihidXR0b25SZWYsIGN1cnJlbnQpO1xuICB9O1xuICBlbGVtZW50UHJvcHMub25DbGljayA9IGV2ZW50ID0+IHtcbiAgICBvbkNsaWNrPy4oZXZlbnQpO1xuICAgIHNldE9wZW4odHJ1ZSk7XG4gIH07XG5cbiAgaWYgKGljb25Pbmx5KSB7XG4gICAgZWxlbWVudFByb3BzLmNoaWxkcmVuID0gTXVpSWNvbihpY29uKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50UHJvcHMuZW5kSWNvbiA9IE11aUljb24oaWNvbik7XG4gICAgZWxlbWVudFByb3BzLmNoaWxkcmVuID0gdGl0bGU7XG4gIH1cblxuICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCh0eXBlLCBlbGVtZW50UHJvcHMpO1xuXG4gIGlmICgodGl0bGUgfHwgVG9vbHRpcFByb3BzKSAmJiAhZGlzYWJsZVRvb2x0aXApIHtcbiAgICBlbGVtZW50ID0gKFxuICAgICAgPFRvb2x0aXAgdGl0bGU9e3RpdGxlfSB7Li4uVG9vbHRpcFByb3BzfT5cbiAgICAgICAge2VsZW1lbnR9XG4gICAgICA8L1Rvb2x0aXA+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChvcGVuKSB7XG4gICAgZWxlbWVudCA9IChcbiAgICAgIDw+XG4gICAgICAgIHtlbGVtZW50fVxuICAgICAgICB7cmVuZGVyT25DbGljaz8uKFxuICAgICAgICAgICgpID0+IHNldE9wZW4oZmFsc2UpLFxuICAgICAgICAgICgpID0+IGJ1dHRvblJlZi5jdXJyZW50IVxuICAgICAgICApfVxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IGNvbnN0IE11aUNhbmNlbEJ1dHRvbiA9IHBhcnRpYWxQcm9wcyhNdWlCdXR0b24sIHtcbiAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9DYW5jZWxcIiksXG4gIHRpdGxlOiBMYW5nYENBTkNFTGAsXG59KTtcblxuZXhwb3J0IGNvbnN0IE11aUNvbmZpcm1CdXR0b24gPSBwYXJ0aWFsUHJvcHMoTXVpQnV0dG9uLCB7XG4gIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvRG9uZVwiKSxcbiAgdGl0bGU6IExhbmdgQ09ORklSTWAsXG59KTtcblxuZXhwb3J0IGNvbnN0IE11aVJlc2V0QnV0dG9uID0gcGFydGlhbFByb3BzKE11aUJ1dHRvbiwge1xuICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0NsZWFyXCIpLFxuICB0aXRsZTogTGFuZ2BSRVNFVGAsXG59KTtcblxuZXhwb3J0IGNvbnN0IE11aUNsb3NlQnV0dG9uID0gcGFydGlhbFByb3BzKE11aUJ1dHRvbiwge1xuICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0Nsb3NlXCIpLFxuICB0aXRsZTogTGFuZ2BDTE9TRWAsXG59KTtcblxuZXhwb3J0IGNvbnN0IE11aUFkZEJ1dHRvbiA9IHBhcnRpYWxQcm9wcyhNdWlCdXR0b24sIHtcbiAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9BZGRcIiksXG4gIHRpdGxlOiBMYW5nYEFERGAsXG59KTtcblxuZXhwb3J0IGNvbnN0IE11aVN1Ym1pdEJ1dHRvbiA9IHBhcnRpYWxQcm9wcyhNdWlCdXR0b24sIHtcbiAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9TZW5kXCIpLFxuICB0aXRsZTogTGFuZ2BTdWJtaXRgLFxufSk7XG5cbmV4cG9ydCBjb25zdCBNdWlFZGl0QnV0dG9uID0gcGFydGlhbFByb3BzKE11aUJ1dHRvbiwge1xuICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0VkaXRcIiksXG4gIHRpdGxlOiBMYW5nYEVESVRgLFxufSk7XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG1lcmdlUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvbWVyZ2VQcm9wc1wiO1xuaW1wb3J0IHsgTXVpQnV0dG9uLCBNdWlCdXR0b25Qcm9wcyB9IGZyb20gXCIuL011aUJ1dHRvblwiO1xuaW1wb3J0IHsgTXVpRGFuZ2VyRGlhbG9nLCBNdWlEYW5nZXJEaWFsb2dQcm9wcyB9IGZyb20gXCIuL011aURhbmdlckRpYWxvZ1wiO1xuXG5leHBvcnQgdHlwZSBNdWlEYW5nZXJCdXR0b25Qcm9wcyA9IE11aUJ1dHRvblByb3BzPHtcbiAgTXVpRGFuZ2VyRGlhbG9nUHJvcHM/OiBQYXJ0aWFsPE11aURhbmdlckRpYWxvZ1Byb3BzPjtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpRGFuZ2VyQnV0dG9uKHtcbiAgTXVpRGFuZ2VyRGlhbG9nUHJvcHMsXG4gIG9uQ2xpY2ssXG4gIC4uLnByb3BzXG59OiBNdWlEYW5nZXJCdXR0b25Qcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxNdWlCdXR0b25cbiAgICAgIGRhbmdlclxuICAgICAgey4uLnByb3BzfVxuICAgICAgcmVuZGVyT25DbGljaz17KGNsb3NlKSA9PiAoXG4gICAgICAgIDxNdWlEYW5nZXJEaWFsb2dcbiAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhNdWlEYW5nZXJEaWFsb2dQcm9wcywge1xuICAgICAgICAgICAgb25DYW5jZWw6ICgpID0+IGNsb3NlKCksXG4gICAgICAgICAgICBvbkNvbmZpcm06IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgICBvbkNsaWNrPy4oZXZlbnQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KX1cbiAgICAgICAgICBvcGVuXG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIC8+XG4gICk7XG59XG4iLCJpbXBvcnQgVHlwb2dyYXBoeSwgeyBUeXBvZ3JhcGh5UHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE11aURpYWxvZywgTXVpRGlhbG9nUHJvcHMgfSBmcm9tIFwiLi9NdWlEaWFsb2dcIjtcbmltcG9ydCB7IE92ZXJyaWRlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBMYW5nLCBMYW5nTm9kZSB9IGZyb20gXCIuLi8uLi8uLi9sYW5nL0xhbmdcIjtcbmltcG9ydCB7IFJlYWN0Q2FsbGJhY2sgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvUmVhY3RDYWxsYmFja1wiO1xuaW1wb3J0IHsgTXVpQnV0dG9uLCBNdWlDYW5jZWxCdXR0b24sIE11aUNvbmZpcm1CdXR0b24gfSBmcm9tIFwiLi9NdWlCdXR0b25cIjtcblxuZXhwb3J0IHR5cGUgTXVpRGFuZ2VyRGlhbG9nUHJvcHMgPSBPdmVycmlkZTxcbiAgTXVpRGlhbG9nUHJvcHMsXG4gIHtcbiAgICBUeXBvZ3JhcGh5UHJvcHM/OiBUeXBvZ3JhcGh5UHJvcHM7XG5cbiAgICBhY3Rpb25UaXRsZT86IExhbmdOb2RlO1xuICAgIHRpdGxlPzogUmVhY3ROb2RlO1xuICAgIG9iamVjdFRpdGxlPzogTGFuZ05vZGU7XG4gICAgdGV4dD86IFJlYWN0Tm9kZTtcblxuICAgIG9uQ2FuY2VsPzogUmVhY3RDYWxsYmFjaztcbiAgICBvbkNvbmZpcm0/OiBSZWFjdENhbGxiYWNrO1xuICB9XG4+O1xuY29uc3QgREVGQVVMVF9USVRMRSA9IExhbmdgQ09ORklSTV9UT18ke1wiYWN0aW9uXCJ9YDtcbmNvbnN0IERFRkFVTFRfVEVYVCA9IExhbmdgWU9VX0FSRV9TVVJFX1lPVV9XQU5UX1RPXyR7XCJhY3Rpb25cIn1fJHtcIm9iamVjdFwifT9gO1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpRGFuZ2VyRGlhbG9nKHtcbiAgb25DYW5jZWwsXG4gIG9uQ29uZmlybSxcbiAgYWN0aW9uVGl0bGUsXG4gIG9iamVjdFRpdGxlLFxuICB0aXRsZSxcbiAgdGV4dCxcbiAgVHlwb2dyYXBoeVByb3BzLFxuICAuLi5NdWlEaWFsb2dQcm9wc1xufTogTXVpRGFuZ2VyRGlhbG9nUHJvcHMpIHtcbiAgY29uc3QgYWN0aW9uID0gYWN0aW9uVGl0bGUgPz8gTGFuZ2BBQ1RJT05gO1xuICByZXR1cm4gKFxuICAgIDxNdWlEaWFsb2dcbiAgICAgIHsuLi5NdWlEaWFsb2dQcm9wc31cbiAgICAgIHRpdGxlPXt0aXRsZSA/PyBERUZBVUxUX1RJVExFKHsgYWN0aW9uIH0pfVxuICAgICAgYWN0aW9ucz17XG4gICAgICAgIDw+XG4gICAgICAgICAgPE11aUNhbmNlbEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIG9uQ2FuY2VsPy4oZXZlbnQpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxNdWlDb25maXJtQnV0dG9uXG4gICAgICAgICAgICBkYW5nZXJcbiAgICAgICAgICAgIHRpdGxlPXtMYW5nYENPTkZJUk1gfVxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIG9uQ29uZmlybT8uKGV2ZW50KTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICB9PlxuICAgICAgPFR5cG9ncmFwaHkgey4uLlR5cG9ncmFwaHlQcm9wc30+XG4gICAgICAgIHt0ZXh0ID8/XG4gICAgICAgICAgREVGQVVMVF9URVhUKHtcbiAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgIG9iamVjdDogb2JqZWN0VGl0bGUgPz8gTGFuZ2BPQkpFQ1RgLFxuICAgICAgICAgIH0pfVxuICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgIDwvTXVpRGlhbG9nPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTXVpRGFuZ2VyQnV0dG9uLCBNdWlEYW5nZXJCdXR0b25Qcm9wcyB9IGZyb20gXCIuL011aURhbmdlckJ1dHRvblwiO1xuaW1wb3J0IHsgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IExhbmcsIExhbmdOb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgbWVyZ2VQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9tZXJnZVByb3BzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlEZWxldGVCdXR0b24oe1xuICBvYmplY3RUaXRsZSxcbiAgLi4ucHJvcHNcbn06IE92ZXJyaWRlPFxuICBNdWlEYW5nZXJCdXR0b25Qcm9wcyxcbiAge1xuICAgIG9iamVjdFRpdGxlPzogTGFuZ05vZGU7XG4gIH1cbj4pIHtcbiAgcmV0dXJuIChcbiAgICA8TXVpRGFuZ2VyQnV0dG9uXG4gICAgICBpY29uPXtyZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0RlbGV0ZVwiKX1cbiAgICAgIHRpdGxlPXtMYW5nYERFTEVURWB9XG4gICAgICB7Li4ubWVyZ2VQcm9wcyhwcm9wcywge1xuICAgICAgICBNdWlEYW5nZXJEaWFsb2dQcm9wczoge1xuICAgICAgICAgIG9iamVjdFRpdGxlLFxuICAgICAgICAgIGFjdGlvblRpdGxlOiBMYW5nYERFTEVURWAsXG4gICAgICAgIH0sXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufVxuIiwiaW1wb3J0IERpYWxvZywgeyBEaWFsb2dQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dcIjtcbmltcG9ydCBEaWFsb2dBY3Rpb25zLCB7XG4gIERpYWxvZ0FjdGlvbnNQcm9wcyxcbn0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0RpYWxvZ0FjdGlvbnNcIjtcbmltcG9ydCBEaWFsb2dDb250ZW50LCB7XG4gIERpYWxvZ0NvbnRlbnRQcm9wcyxcbn0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0RpYWxvZ0NvbnRlbnRcIjtcbmltcG9ydCBEaWFsb2dUaXRsZSwgeyBEaWFsb2dUaXRsZVByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0RpYWxvZ1RpdGxlXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgTXVpQnV0dG9uLFxuICBNdWlCdXR0b25Qcm9wcyxcbiAgTXVpQ2FuY2VsQnV0dG9uLFxuICBNdWlTdWJtaXRCdXR0b24sXG59IGZyb20gXCIuL011aUJ1dHRvblwiO1xuXG5pbXBvcnQgeyBtZXJnZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL21lcmdlUHJvcHNcIjtcblxuZXhwb3J0IHR5cGUgTXVpRGlhbG9nUHJvcHMgPSBPbWl0PERpYWxvZ1Byb3BzLCBcInRpdGxlXCI+ICYge1xuICBjb250ZW50PzogUmVhY3ROb2RlO1xuICBhY3Rpb25zPzogUmVhY3ROb2RlO1xuICB0aXRsZT86IFJlYWN0Tm9kZTtcbiAgRGlhbG9nQ29udGVudFByb3BzPzogRGlhbG9nQ29udGVudFByb3BzO1xuICBEaWFsb2dBY3Rpb25zUHJvcHM/OiBEaWFsb2dBY3Rpb25zUHJvcHM7XG4gIERpYWxvZ1RpdGxlUHJvcHM/OiBEaWFsb2dUaXRsZVByb3BzO1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcblxuICBNdWlTdWJtaXRCdXR0b25zUHJvcHM/OiBNdWlCdXR0b25Qcm9wcztcbiAgTXVpQ2FuY2VsQnV0dG9uUHJvcHM/OiBNdWlCdXR0b25Qcm9wcztcbiAgb25TdWJtaXQ/KCk6IHZvaWQ7XG4gIG9uQ2FuY2VsPygpOiB2b2lkO1xuXG4gIC8vIE11aUFjdGlvbnNQcm9wcz86IE11aUFjdGlvbnNQcm9wczxDLFwic3VibWl0XCJ8XCJjYW5jZWxcIj5cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlEaWFsb2coe1xuICBjb250ZW50LFxuICBhY3Rpb25zLFxuICB0aXRsZSxcbiAgY2hpbGRyZW4sXG4gIERpYWxvZ0NvbnRlbnRQcm9wcyxcbiAgRGlhbG9nQWN0aW9uc1Byb3BzLFxuICBEaWFsb2dUaXRsZVByb3BzLFxuICBvbkNhbmNlbCxcbiAgb25TdWJtaXQsXG4gIE11aUNhbmNlbEJ1dHRvblByb3BzLFxuICBNdWlTdWJtaXRCdXR0b25zUHJvcHMsXG4gIC4uLkRpYWxvZ1Byb3BzXG59OiBNdWlEaWFsb2dQcm9wcykge1xuICBpZiAob25DYW5jZWwgfHwgb25TdWJtaXQpIHtcbiAgICBhY3Rpb25zID0gKFxuICAgICAgPD5cbiAgICAgICAge29uU3VibWl0ICYmIChcbiAgICAgICAgICA8TXVpU3VibWl0QnV0dG9uXG4gICAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhNdWlTdWJtaXRCdXR0b25zUHJvcHMsIHtcbiAgICAgICAgICAgICAgb25DbGljaygpIHtcbiAgICAgICAgICAgICAgICBvblN1Ym1pdCgpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2FjdGlvbnN9XG4gICAgICAgIHtvbkNhbmNlbCAmJiAoXG4gICAgICAgICAgPE11aUNhbmNlbEJ1dHRvblxuICAgICAgICAgICAgey4uLm1lcmdlUHJvcHMoTXVpQ2FuY2VsQnV0dG9uUHJvcHMsIHtcbiAgICAgICAgICAgICAgb25DbGljaygpIHtcbiAgICAgICAgICAgICAgICBvbkNhbmNlbCgpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8RGlhbG9nIHsuLi5EaWFsb2dQcm9wc30+XG4gICAgICB7dGl0bGUgJiYgPERpYWxvZ1RpdGxlIHsuLi5EaWFsb2dUaXRsZVByb3BzfT57dGl0bGV9PC9EaWFsb2dUaXRsZT59XG4gICAgICB7KGNvbnRlbnQgfHwgY2hpbGRyZW4pICYmIChcbiAgICAgICAgPERpYWxvZ0NvbnRlbnQgey4uLkRpYWxvZ0NvbnRlbnRQcm9wc30+XG4gICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L0RpYWxvZ0NvbnRlbnQ+XG4gICAgICApfVxuICAgICAge2FjdGlvbnMgJiYgKFxuICAgICAgICA8RGlhbG9nQWN0aW9ucyB7Li4uRGlhbG9nQWN0aW9uc1Byb3BzfT57YWN0aW9uc308L0RpYWxvZ0FjdGlvbnM+XG4gICAgICApfVxuICAgIDwvRGlhbG9nPlxuICApO1xufVxuIiwiaW1wb3J0IEdyaWQsIHtHcmlkUHJvcHN9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9HcmlkXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjsgaW1wb3J0IHtDaGlsZHJlbn0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCB0eXBlIE11aUdyaWRQcm9wcyA9IHsgaXRlbT86IEdyaWRQcm9wcyB9ICYgT21pdDxHcmlkUHJvcHMsIFwiaXRlbVwiIHwgXCJjb250YWluZXJcIj47XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlHcmlkKHtpdGVtLCBjaGlsZHJlbiwgLi4ucHJvcHN9OiBNdWlHcmlkUHJvcHMpIHtcbiAgICByZXR1cm4gPEdyaWQgey4uLnByb3BzfSBjb250YWluZXI+XG4gICAgICAgIHtDaGlsZHJlbi5tYXAoY2hpbGRyZW4sIGNoaWxkID0+IDxHcmlkIHsuLi5pdGVtfSBpdGVtPlxuICAgICAgICAgICAge2NoaWxkfVxuICAgICAgICA8L0dyaWQ+KX1cbiAgICA8L0dyaWQ+XG59XG5cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ29tcG9uZW50Q2xhc3MsIGNyZWF0ZUVsZW1lbnQsIFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRW1wdHlGcmFnbWVudCB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9FbXB0eUZyYWdtZW50XCI7XG5cbmNvbnN0IE11aUljb25NYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIHN1Ym1pdDogXCJzZW5kXCIsXG4gIHJlc2V0OiBcImNsZWFyXCIsXG59O1xuXG5leHBvcnQgdHlwZSBNdWlJY29uID0gc3RyaW5nIHwgeyBkZWZhdWx0OiBDb21wb25lbnRDbGFzcyB9IHwgdW5kZWZpbmVkO1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpSWNvbihhcmc6IE11aUljb24pOiBSZWFjdEVsZW1lbnQge1xuICBpZiAodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIilcbiAgICByZXR1cm4gYXJnID8gKFxuICAgICAgPGkgY2xhc3NOYW1lPXtcIm1hdGVyaWFsLWljb25zXCJ9PntNdWlJY29uTWFwW2FyZ10gPz8gYXJnfTwvaT5cbiAgICApIDogKFxuICAgICAgPD48Lz5cbiAgICApO1xuICBpZiAoYXJnPy5kZWZhdWx0KSByZXR1cm4gY3JlYXRlRWxlbWVudChhcmcuZGVmYXVsdCk7XG5cbiAgcmV0dXJuIEVtcHR5RnJhZ21lbnQ7XG59XG4iLCJpbXBvcnQgTGluaywgeyBMaW5rUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvTGlua1wiO1xuaW1wb3J0IHsgbWFrZVN0eWxlcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG1lcmdlUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvbWVyZ2VQcm9wc1wiO1xuXG5jb25zdCB1c2VTdHlsZXMgPSBtYWtlU3R5bGVzKHtcbiAgcm9vdDoge1xuICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gIH0sXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aUxpbmsocHJvcHM6IExpbmtQcm9wcykge1xuICBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKCk7XG4gIHJldHVybiAoXG4gICAgPExpbmtcbiAgICAgIHsuLi5tZXJnZVByb3BzKHByb3BzLCB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3Nlcy5yb290LFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn1cbiIsImltcG9ydCB7IFRhYmxlQ2VsbFByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlXCI7XG5pbXBvcnQgVGFibGVDZWxsIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UYWJsZUNlbGxcIjtcbmltcG9ydCB7IG1ha2VTdHlsZXMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBPdmVycmlkZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgbWVyZ2VQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9tZXJnZVByb3BzXCI7XG5cbmNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXMoe1xuICBmaXRUb0NvbnRlbnQ6IHtcbiAgICB3aWR0aDogXCIxJVwiLFxuICAgIHdoaXRlU3BhY2U6IFwibm93cmFwXCIsXG4gIH0sXG59KTtcblxuZXhwb3J0IHR5cGUgTXVpVGFibGVDb2x1bW5Qcm9wcyA9IE92ZXJyaWRlPFxuICBUYWJsZUNlbGxQcm9wcyxcbiAge1xuICAgIGZpdFRvQ29udGVudD86IGJvb2xlYW47XG4gIH1cbj47XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlUYWJsZUNlbGwoeyBmaXRUb0NvbnRlbnQsIC4uLnByb3BzIH06IE11aVRhYmxlQ29sdW1uUHJvcHMpIHtcbiAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xuICByZXR1cm4gY3JlYXRlRWxlbWVudChcbiAgICBUYWJsZUNlbGwsXG4gICAgbWVyZ2VQcm9wcyhwcm9wcywge1xuICAgICAgY2xhc3NOYW1lOiBjbGFzc2VzLmZpdFRvQ29udGVudCxcbiAgICB9KVxuICApO1xufVxuIiwiaW1wb3J0IEdyaWQgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0dyaWRcIjtcbmltcG9ydCBJbnB1dEFkb3JubWVudCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvSW5wdXRBZG9ybm1lbnRcIjtcbmltcG9ydCBUZXh0RmllbGQsIHsgVGV4dEZpZWxkUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGV4dEZpZWxkXCI7XG5pbXBvcnQgVG9vbGJhciwgeyBUb29sYmFyUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVG9vbGJhclwiO1xuaW1wb3J0IFRvb2x0aXAgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1Rvb2x0aXBcIjtcbmltcG9ydCBUeXBvZ3JhcGh5LCB7IFR5cG9ncmFwaHlQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UeXBvZ3JhcGh5XCI7XG5pbXBvcnQgeyBtYWtlU3R5bGVzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiO1xuaW1wb3J0IGNsc3ggZnJvbSBcImNsc3hcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUmVhY3ROb2RlLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBMYW5nIH0gZnJvbSBcIi4uLy4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgdXNlTGFuZ1RyYW5zbGF0b3IgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nVHJhbnNsYXRvclwiO1xuaW1wb3J0IHsgbWVyZ2VQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9tZXJnZVByb3BzXCI7XG5pbXBvcnQgeyBNdWlJY29uIH0gZnJvbSBcIi4vTXVpSWNvblwiO1xuXG5jb25zdCB1c2VTdHlsZXMgPSBtYWtlU3R5bGVzKHRoZW1lID0+ICh7XG4gIHRvb2xiYXI6IHtcbiAgICBwYWRkaW5nTGVmdDogdGhlbWUuc3BhY2luZygyKSxcbiAgICBwYWRkaW5nUmlnaHQ6IHRoZW1lLnNwYWNpbmcoMSksXG4gIH0sXG4gIHRpdGxlOiB7XG4gICAgZmxleDogXCIxIDEgMTAwJVwiLFxuICB9LFxuICBoaWRkZW46IHtcbiAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiLFxuICB9LFxufSkpO1xuXG5leHBvcnQgdHlwZSBNdWlUYWJsZVRvb2xiYXJQcm9wcyA9IHtcbiAgVG9vbGJhclByb3BzPzogVG9vbGJhclByb3BzO1xuXG4gIHNlYXJjaD86IHtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgb25TZWFyY2g/KHRleHQ6IHN0cmluZyk7XG4gICAgVGV4dEZpZWxkUHJvcHM/OiBQYXJ0aWFsPFRleHRGaWVsZFByb3BzPjtcbiAgfTtcblxuICB0aXRsZT86IFJlYWN0Tm9kZTtcblxuICBUaXRsZVR5cG9ncmFwaHlQcm9wcz86IFR5cG9ncmFwaHlQcm9wcztcblxuICBzdGF0aWNBY3Rpb25zPzogUmVhY3ROb2RlO1xuXG4gIHNlbGVjdEFjdGlvbnM/OiBSZWFjdE5vZGU7XG5cbiAgY291bnRTZWxlY3RlZEl0ZW1zPzogbnVtYmVyO1xufTtcblxuY29uc3QgQ09VTlRfU0VMRUNURURfSVRFTVMgPSBMYW5nYFNFTEVDVEVEXyR7XCJjb3VudFwifV9JVEVNU2A7XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlUYWJsZVRvb2xiYXIocHJvcHM6IE11aVRhYmxlVG9vbGJhclByb3BzKSB7XG4gIGNvbnN0IGNsYXNzZXMgPSB1c2VTdHlsZXMoKTtcbiAgY29uc3QgeyBzZWFyY2g6IHNlYXJjaFByb3BzIH0gPSBwcm9wcztcblxuICBjb25zdCBsYW5nID0gdXNlTGFuZ1RyYW5zbGF0b3IoKTtcbiAgY29uc3QgW3NlYXJjaFRleHQsIHNldFNlYXJjaFRleHRdID0gdXNlU3RhdGUocHJvcHMuc2VhcmNoPy50ZXh0IHx8IFwiXCIpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0U2VhcmNoVGV4dChwcm9wcy5zZWFyY2g/LnRleHQgfHwgXCJcIik7XG4gIH0sIFtwcm9wcy5zZWFyY2g/LnRleHRdKTtcblxuICBjb25zdCB0aXRsZSA9IHByb3BzLmNvdW50U2VsZWN0ZWRJdGVtcyA/IChcbiAgICA8PntDT1VOVF9TRUxFQ1RFRF9JVEVNUyh7IGNvdW50OiBwcm9wcy5jb3VudFNlbGVjdGVkSXRlbXMgfSl9PC8+XG4gICkgOiAoXG4gICAgcHJvcHMudGl0bGVcbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxUb29sYmFyXG4gICAgICB7Li4ubWVyZ2VQcm9wcyhwcm9wcy5Ub29sYmFyUHJvcHMsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc2VzLnRvb2xiYXIsXG4gICAgICB9KX1cbiAgICA+XG4gICAgICA8R3JpZCBjb250YWluZXI+XG4gICAgICAgIDxHcmlkIGl0ZW0geHM+XG4gICAgICAgICAge3RpdGxlICYmIChcbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5XG4gICAgICAgICAgICAgIHZhcmlhbnQ9e1wiaDZcIn1cbiAgICAgICAgICAgICAgey4uLm1lcmdlUHJvcHMocHJvcHMuVGl0bGVUeXBvZ3JhcGh5UHJvcHMsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzZXMudGl0bGUsXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGl0bGV9XG4gICAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9HcmlkPlxuICAgICAgICA8R3JpZCBpdGVtPlxuICAgICAgICAgIHtwcm9wcy5jb3VudFNlbGVjdGVkSXRlbXMgPyAoXG4gICAgICAgICAgICBwcm9wcy5zZWxlY3RBY3Rpb25zXG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxHcmlkIGNvbnRhaW5lciBhbGlnbkl0ZW1zPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgIHtwcm9wcy5zdGF0aWNBY3Rpb25zICYmIDxHcmlkIGl0ZW0+e3Byb3BzLnN0YXRpY0FjdGlvbnN9PC9HcmlkPn1cbiAgICAgICAgICAgICAge3NlYXJjaFByb3BzICYmIChcbiAgICAgICAgICAgICAgICA8R3JpZCBpdGVtPlxuICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNoVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhbmcudHJhbnNsYXRlTm9kZShMYW5nYFNFQVJDSGApfVxuICAgICAgICAgICAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhzZWFyY2hQcm9wcy5UZXh0RmllbGRQcm9wcywge1xuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VhcmNoVGV4dCh0ZXh0IHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUHJvcHM/Lm9uU2VhcmNoPy4odGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUHJvcHM/Lm9uU2VhcmNoPy4oc2VhcmNoVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBvbktleURvd246IGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VhcmNoVGV4dChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUHJvcHM/Lm9uU2VhcmNoPy4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBvbktleVByZXNzOiBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh7ZXZlbnRLZXk6ZXZlbnQua2V5fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFByb3BzPy5vblNlYXJjaD8uKHNlYXJjaFRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJFc2NhcGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWFyY2hUZXh0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgSW5wdXRQcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kQWRvcm5tZW50OiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEFkb3JubWVudCBwb3NpdGlvbj17XCJlbmRcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRvb2x0aXAgdGl0bGU9e0xhbmdgU0VBUkNIYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7TXVpSWNvbihcInNlYXJjaFwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1Rvb2x0aXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvSW5wdXRBZG9ybm1lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRBZG9ybm1lbnQ6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0QWRvcm5tZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbHN4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc2VzLmhpZGRlbl06ICFzZWFyY2hUZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uPXtcInN0YXJ0XCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VhcmNoVGV4dChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge011aUljb24oXCJjbG9zZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEFkb3JubWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICApfVxuICAgICAgICA8L0dyaWQ+XG4gICAgICA8L0dyaWQ+XG4gICAgPC9Ub29sYmFyPlxuICApO1xufVxuIiwiaW1wb3J0IHtcbiAgY3JlYXRlTXVpVGhlbWUsXG4gIFRoZW1lIGFzIE11aUNvcmVUaGVtZSxcbiAgVGhlbWVQcm92aWRlciBhcyBNdWlDb3JlVGhlbWVQcm92aWRlcixcbn0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiO1xuaW1wb3J0IHtcbiAganNzUHJlc2V0LFxuICBTdHlsZXNQcm92aWRlciBhcyBNdWlKc3NQcm92aWRlcixcbn0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiO1xuaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSBcImpzc1wiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIGFzIFN0eWxlZFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwic3R5bGVkLWNvbXBvbmVudHNcIjtcbmltcG9ydCB7XG4gIExhbmdUcmFuc2xhdG9yLFxuICBMYW5nVHJhbnNsYXRvckNvbnRleHQsXG59IGZyb20gXCIuLi8uLi9sYW5nL0xhbmdUcmFuc2xhdG9yXCI7XG5cbmRlY2xhcmUgbW9kdWxlIFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCIge1xuICBpbnRlcmZhY2UgRGVmYXVsdFRoZW1lIGV4dGVuZHMgTXVpQ29yZVRoZW1lIHt9XG59XG5kZWNsYXJlIG1vZHVsZSBcInN0eWxlZC1jb21wb25lbnRzXCIge1xuICBpbnRlcmZhY2UgRGVmYXVsdFRoZW1lIGV4dGVuZHMgTXVpQ29yZVRoZW1lIHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNdWlTeXN0ZW0oe1xuICBqc3NQbHVnaW5zID0gW10sXG4gIHRoZW1lID0gY3JlYXRlTXVpVGhlbWUoe1xuICAgIHByb3BzOiB7XG4gICAgICBNdWlUZXh0RmllbGQ6IHtcbiAgICAgICAgZnVsbFdpZHRoOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIE11aURpYWxvZzoge1xuICAgICAgICBmdWxsV2lkdGg6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pLFxufSA9IHt9KSB7XG4gIGNvbnN0IGxhbmdUcmFuc2xhdG9yID0gbmV3IExhbmdUcmFuc2xhdG9yKHt9KTtcblxuICBjb25zdCBqc3MgPSBjcmVhdGUoe1xuICAgIHBsdWdpbnM6IFsuLi5qc3NQcmVzZXQoKS5wbHVnaW5zLCAuLi5qc3NQbHVnaW5zXSxcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XG4gICAgICBjaGlsZHJlbiA9IGNyZWF0ZUVsZW1lbnQoTXVpQ29yZVRoZW1lUHJvdmlkZXIsIHtcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIHRoZW1lLFxuICAgICAgfSk7XG5cbiAgICAgIGNoaWxkcmVuID0gY3JlYXRlRWxlbWVudChTdHlsZWRUaGVtZVByb3ZpZGVyLCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICB0aGVtZSxcbiAgICAgIH0pO1xuXG4gICAgICBjaGlsZHJlbiA9IGNyZWF0ZUVsZW1lbnQoTXVpSnNzUHJvdmlkZXIsIHtcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIGpzcyxcbiAgICAgIH0pO1xuXG4gICAgICBjaGlsZHJlbiA9IGNyZWF0ZUVsZW1lbnQoTGFuZ1RyYW5zbGF0b3JDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICB2YWx1ZTogbGFuZ1RyYW5zbGF0b3IsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgVHlwb2dyYXBoeSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeVwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgSWYsXG4gIElzLFxuICBJc0VtcHR5T2JqZWN0LFxuICBPbWl0S2V5cyxcbiAgUGFydGlhbFVuZGVmaW5lZEtleXMsXG59IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgbWVyZ2VQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9tZXJnZVByb3BzXCI7XG5pbXBvcnQge1xuICBBbnlEYXRhTWFuYWdlcixcbiAgRGF0YU1hbmFnZXJUeXBlcyxcbiAgVERhdGFNYW5hZ2VyLFxufSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9kYXRhLW1hbmFnZXIvRGF0YU1hbmFnZXJcIjtcbmltcG9ydCB7XG4gIEFueURhdGFNYW5hZ2VyUm91dGVyLFxuICBEYXRhTWFuYWdlclJvdXRlcixcbn0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvZGF0YS1tYW5hZ2VyL0RhdGFNYW5hZ2VyUm91dGVyXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uLCBScGNUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvUnBjXCI7XG5pbXBvcnQgeyBGb3JtVmlld1Byb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybVZpZXdcIjtcbmltcG9ydCB7IElubGluZVdpZGdldFZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvaW5saW5lLXdpZGdldC9JbmxpbmVXaWRnZXRWaWV3XCI7XG5pbXBvcnQgeyBUYWJzV2lkZ2V0IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L3RhYnMtd2lkZ2V0L1RhYnNXaWRnZXRcIjtcbmltcG9ydCB7IFdpZGdldFJvdXRlclZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvV2lkZ2V0Um91dGVyVmlld1wiO1xuaW1wb3J0IHsgTXVpQWRkQnV0dG9uLCBNdWlCdXR0b25Qcm9wcyB9IGZyb20gXCIuLi9jb21wb25lbnRzL011aUJ1dHRvblwiO1xuaW1wb3J0IHsgTXVpRGF0YVRhYmxlVmlldywgTXVpRGF0YVRhYmxlVmlld1Byb3BzIH0gZnJvbSBcIi4vTXVpRGF0YVRhYmxlVmlld1wiO1xuaW1wb3J0IHsgTXVpRm9ybVZpZXcsIE11aUZvcm1WaWV3UHJvcHMgfSBmcm9tIFwiLi9NdWlGb3JtVmlld1wiO1xuaW1wb3J0IHtcbiAgTXVpVGFic1dpZGdldFZpZXcsXG4gIE11aVRhYnNXaWRnZXRWaWV3UHJvcHMsXG4gIE11aVRhYlZpZXdQcm9wcyxcbn0gZnJvbSBcIi4vTXVpVGFic1dpZGdldFZpZXdcIjtcblxudHlwZSBfVHlwZXM8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4gPSBEYXRhTWFuYWdlclR5cGVzPFQ+ICYge307XG5cbmV4cG9ydCB0eXBlIE11aURhdGFNYW5hZ2VyVmlld1Byb3BzPFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlEYXRhTWFuYWdlcj4sXG4gIFQgZXh0ZW5kcyBURGF0YU1hbmFnZXIgPSBScGNUeXBlPEM+W1wiVENvbmZpZ0hvb2tcIl1bXCJURGF0YU1hbmFnZXJcIl1cbj4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAge1xuICAgIHJlbmRlckVkaXRJbnB1dDpcbiAgICAgIHwgRm9ybVZpZXdQcm9wczxScGNDb25uZWN0aW9uPF9UeXBlczxUPltcIkVkaXRGb3JtXCJdPj5bXCJpbnB1dFwiXVxuICAgICAgfCBJZjxJczxUW1wiQWRkSW5wdXRcIl0sIFRbXCJFZGl0SW5wdXRcIl0+LCB1bmRlZmluZWQ+O1xuXG4gICAgdGFiczpcbiAgICAgIHwgTXVpVGFic1dpZGdldFZpZXdQcm9wczxScGNDb25uZWN0aW9uPFRhYnNXaWRnZXQ8VFtcIkVkaXRUYWJzXCJdPj4+W1widGFic1wiXVxuICAgICAgfCBJZjxJc0VtcHR5T2JqZWN0PFRbXCJFZGl0VGFic1wiXT4sIHVuZGVmaW5lZD47XG4gIH0sXG4gIHtcbiAgICBjb25uZWN0aW9uOiBDO1xuICAgIHJvdXRlcjogRGF0YU1hbmFnZXJSb3V0ZXI8VD47XG5cbiAgICByZW5kZXJBZGRJbnB1dDogRm9ybVZpZXdQcm9wczxScGNDb25uZWN0aW9uPF9UeXBlczxUPltcIkFkZEZvcm1cIl0+PltcImlucHV0XCJdO1xuXG4gICAgTXVpRWRpdEZvcm1UYWJWaWV3UHJvcHM/OiBPbWl0S2V5czxcbiAgICAgIE11aVRhYlZpZXdQcm9wczxScGNDb25uZWN0aW9uPF9UeXBlczxUPltcIkVkaXRGb3JtXCJdPj4sXG4gICAgICBcInJlbmRlclwiXG4gICAgPjtcblxuICAgIE11aURhdGFUYWJsZVZpZXdQcm9wcz86IFBhcnRpYWw8XG4gICAgICBNdWlEYXRhVGFibGVWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxfVHlwZXM8VD5bXCJUYWJsZVwiXT4+XG4gICAgPjtcblxuICAgIE11aUFkZEZvcm1WaWV3UHJvcHM/OiBQYXJ0aWFsPFxuICAgICAgTXVpRm9ybVZpZXdQcm9wczxScGNDb25uZWN0aW9uPF9UeXBlczxUPltcIkFkZEZvcm1cIl0+PlxuICAgID47XG5cbiAgICBNdWlFZGl0Rm9ybVZpZXdQcm9wcz86IFBhcnRpYWw8XG4gICAgICBNdWlGb3JtVmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248X1R5cGVzPFQ+W1wiRWRpdEZvcm1cIl0+PlxuICAgID47XG5cbiAgICBNdWlBZGRCdXR0b25Qcm9wcz86IE11aUJ1dHRvblByb3BzO1xuICB9XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpRGF0YU1hbmFnZXJWaWV3PEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueURhdGFNYW5hZ2VyPj4oXG4gIHByb3BzOiBNdWlEYXRhTWFuYWdlclZpZXdQcm9wczxDPlxuKSB7XG4gIGNvbnN0IF9yb3V0ZXIgPSBwcm9wcy5yb3V0ZXIgYXMgQW55RGF0YU1hbmFnZXJSb3V0ZXI7XG4gIGNvbnN0IGRtID0gcHJvcHMgYXMgTXVpRGF0YU1hbmFnZXJWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxBbnlEYXRhTWFuYWdlcj4+O1xuXG4gIFdpZGdldFJvdXRlclZpZXcoXG4gICAgX3JvdXRlcixcbiAgICBkbS5jb25uZWN0aW9uLnRhYmxlLFxuICAgIChwcm9wcywgeyBsb2NhdGlvbiwgZW1pdCB9KSA9PiAoXG4gICAgICA8TXVpRGF0YVRhYmxlVmlld1xuICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgIHsuLi5tZXJnZVByb3BzKGRtLk11aURhdGFUYWJsZVZpZXdQcm9wcywge1xuICAgICAgICAgIHRvb2xiYXJBY3Rpb25zOiB7XG4gICAgICAgICAgICBhZGQ6IHtcbiAgICAgICAgICAgICAgYnV0dG9uVHlwZTogTXVpQWRkQnV0dG9uLFxuICAgICAgICAgICAgICAuLi5kbS5NdWlBZGRCdXR0b25Qcm9wcyxcbiAgICAgICAgICAgICAgb25DbGljaygpIHtcbiAgICAgICAgICAgICAgICBlbWl0KGxvY2F0aW9uLmF0KFwiYWRkXCIpKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkVkaXRDbGljayhldmVudCkge1xuICAgICAgICAgICAgZW1pdChsb2NhdGlvbi5hdChcImVkaXRcIiwgeyBpZDogZXZlbnQua2V5IH0pKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRGVsZXRlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBkbS5jb25uZWN0aW9uLmRlbGV0ZShldmVudC5rZXkpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pfVxuICAgICAgLz5cbiAgICApXG4gICk7XG5cbiAgV2lkZ2V0Um91dGVyVmlldyhcbiAgICBfcm91dGVyLmF0KFwiYWRkXCIpLFxuICAgIGRtLmNvbm5lY3Rpb24uYWRkLFxuICAgIChwcm9wcywgeyBsb2NhdGlvbiwgZW1pdCB9KSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TXVpRm9ybVZpZXdcbiAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgey4uLm1lcmdlUHJvcHMoZG0uTXVpQWRkRm9ybVZpZXdQcm9wcywge1xuICAgICAgICAgICAgb25TdWJtaXQoaWQpIHtcbiAgICAgICAgICAgICAgZW1pdChsb2NhdGlvbi5wYXJlbnQuYXQoXCJlZGl0XCIsIHsgaWQgfSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KX1cbiAgICAgICAgICBpbnB1dD17ZG0ucmVuZGVyQWRkSW5wdXR9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgKTtcblxuICBXaWRnZXRSb3V0ZXJWaWV3KFxuICAgIF9yb3V0ZXIuYXQoXCJlZGl0XCIpLFxuICAgIHBhcmFtcyA9PiBkbS5jb25uZWN0aW9uLmVkaXQocGFyYW1zLmlkKSxcbiAgICBwcm9wcyA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8SW5saW5lV2lkZ2V0Vmlld1xuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICBjaGlsZHJlbj17KHsgdGFyZ2V0UHJvcHM6IHByb3BzLCBpbmxpbmVFbGVtZW50OiBwYWdlIH0pID0+IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxUeXBvZ3JhcGh5PntwYWdlLnRpdGxlfTwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgPE11aVRhYnNXaWRnZXRWaWV3XG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHRhYnM9e3tcbiAgICAgICAgICAgICAgICAgIC4uLmRtLnRhYnMsXG4gICAgICAgICAgICAgICAgICBmb3JtOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmRtLk11aUVkaXRGb3JtVGFiVmlld1Byb3BzLFxuICAgICAgICAgICAgICAgICAgICByZW5kZXI6IHByb3BzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPE11aUZvcm1WaWV3XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLm1lcmdlUHJvcHMoZG0uTXVpRWRpdEZvcm1WaWV3UHJvcHMsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN1Ym1pdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGFsZXJ0IG9yIG5leHQgbG9jYXRpb24gLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0PXtkbS5yZW5kZXJFZGl0SW5wdXQgfHwgZG0ucmVuZGVyQWRkSW5wdXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICk7XG59XG4iLCJpbXBvcnQgVGFibGUsIHsgVGFibGVQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UYWJsZVwiO1xuaW1wb3J0IFRhYmxlQm9keSwgeyBUYWJsZUJvZHlQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UYWJsZUJvZHlcIjtcbmltcG9ydCBUYWJsZUNlbGwgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1RhYmxlQ2VsbFwiO1xuaW1wb3J0IFRhYmxlRm9vdGVyLCB7IFRhYmxlRm9vdGVyUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFibGVGb290ZXJcIjtcbmltcG9ydCBUYWJsZUhlYWQsIHsgVGFibGVIZWFkUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFibGVIZWFkXCI7XG5pbXBvcnQgVGFibGVQYWdpbmF0aW9uIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UYWJsZVBhZ2luYXRpb25cIjtcbmltcG9ydCBUYWJsZVJvdyBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGFibGVSb3dcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ29tcG9uZW50UHJvcHMsIFJlYWN0Tm9kZSwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBoYXNLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvaGFzS2V5c1wiO1xuaW1wb3J0IHsgbWFwT2JqZWN0VG9BcnJheSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L21hcE9iamVjdFRvQXJyYXlcIjtcbmltcG9ydCB7IEF3YWl0YWJsZSwgUGFydGlhbFVuZGVmaW5lZEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyBMYW5nS2V5IH0gZnJvbSBcIi4uLy4uLy4uL2xhbmcvTGFuZ0tleVwiO1xuaW1wb3J0IHsgVGFibGVMYXlvdXQgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvVGFibGVMYXlvdXRcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9ScGNcIjtcbmltcG9ydCB7IEFueURhdGFUYWJsZSB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL3dpZGdldC9kYXRhLXRhYmxlL0RhdGFUYWJsZVwiO1xuaW1wb3J0IHtcbiAgRGF0YVRhYmxlVmlldyxcbiAgRGF0YVRhYmxlVmlld1Byb3BzLFxufSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvZGF0YS10YWJsZS9EYXRhVGFibGVWaWV3XCI7XG5cbmltcG9ydCB7IFdpZGdldFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQgeyBNdWlCdXR0b24sIE11aUJ1dHRvblByb3BzIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvTXVpQnV0dG9uXCI7XG5pbXBvcnQgeyBNdWlEZWxldGVCdXR0b24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9NdWlEZWxldGVCdXR0b25cIjtcbmltcG9ydCB7IE11aVRhYmxlQ2VsbCwgTXVpVGFibGVDb2x1bW5Qcm9wcyB9IGZyb20gXCIuLi9jb21wb25lbnRzL011aVRhYmxlQ2VsbFwiO1xuaW1wb3J0IHtcbiAgTXVpVGFibGVUb29sYmFyLFxuICBNdWlUYWJsZVRvb2xiYXJQcm9wcyxcbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvTXVpVGFibGVUb29sYmFyXCI7XG5cbnR5cGUgTXVpRGF0YVRhYmxlVmlld0NvbHVtblByb3BzPFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlEYXRhVGFibGU+LFxuICBSb3dDb2x1bW4sXG4gIFJvd1xuPiA9IHtcbiAgTXVpVGFibGVDb2x1bW5Qcm9wcz86IE11aVRhYmxlQ29sdW1uUHJvcHM7XG4gIHRpdGxlPzogUmVhY3ROb2RlO1xuICByZW5kZXJSb3dDb2x1bW4/KFxuICAgIGRhdGE6IFJvd0NvbHVtbixcbiAgICBwcm9wczoge1xuICAgICAga2V5OiBzdHJpbmc7XG4gICAgICByb3c6IFdpZGdldFR5cGU8Qz5bXCJUeXBlc1wiXVtcIlJvd1dpdGhLZXlcIl07XG4gICAgfVxuICApOiBSZWFjdE5vZGU7XG59O1xuXG50eXBlIE11aURhdGFUYWJsZUFjdGlvbkV2ZW50PEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueURhdGFUYWJsZT4+ID0ge1xuICByb3c6IFdpZGdldFR5cGU8Qz5bXCJUeXBlc1wiXVtcIlJvd1dpdGhLZXlcIl07XG4gIGtleTogc3RyaW5nO1xuICBjb25uZWN0aW9uOiBScGNDb25uZWN0aW9uPFdpZGdldFR5cGU8Qz5bXCJUeXBlc1wiXVtcIlJvd0NvbnRyb2xsZXJcIl0+O1xuICB0YWJsZTogUmVhZG9ubHk8RGF0YVRhYmxlVmlldzxDPj47XG59O1xuXG5leHBvcnQgdHlwZSBNdWlEYXRhVGFibGVWaWV3UHJvcHM8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueURhdGFUYWJsZT4sXG4gIFJvdyA9IFdpZGdldFR5cGU8Qz5bXCJUeXBlc1wiXVtcIlJvd1wiXVxuPiA9IERhdGFUYWJsZVZpZXdQcm9wczxDPiAmIHtcbiAgVGFibGVQcm9wcz86IFRhYmxlUHJvcHM7XG4gIFRhYmxlSGVhZFByb3BzPzogVGFibGVIZWFkUHJvcHM7XG4gIFRhYmxlQm9keVByb3BzPzogVGFibGVCb2R5UHJvcHM7XG4gIFRhYmxlRm9vdGVyUHJvcHM/OiBUYWJsZUZvb3RlclByb3BzO1xuXG4gIGRpc2FibGVUb29sYmFyPzogYm9vbGVhbjtcblxuICBNdWlUYWJsZVRvb2xiYXJQcm9wcz86IE9taXQ8TXVpVGFibGVUb29sYmFyUHJvcHMsIFwiYWN0aW9uc1wiPjtcblxuICAvLyBUT0RPOiBvbkFkZENsaWNrXG5cbiAgLy8gVE9ETzogc2VsZWN0QWN0aW9uc1xuXG4gIC8vIEFzc2lnbjxNdWlEYXRhVGFibGVBY3Rpb25Qcm9wcywge30+XG4gIHRvb2xiYXJBY3Rpb25zPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBNdWlCdXR0b25Qcm9wczx7XG4gICAgICBvbkNsaWNrKHByb3BzOiB7IHRhYmxlOiBSZWFkb25seTxEYXRhVGFibGVWaWV3PEM+PiB9KTtcbiAgICB9PlxuICA+O1xuXG4gIGNvbHVtbnM/OiBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAgICB7XG4gICAgICBbSyBpbiBrZXlvZiBSZXF1aXJlZDxSb3c+XTpcbiAgICAgICAgfCB1bmRlZmluZWRcbiAgICAgICAgfCBNdWlEYXRhVGFibGVWaWV3Q29sdW1uUHJvcHM8QywgUm93W0tdLCBSb3c+O1xuICAgIH1cbiAgPjtcblxuICBvbkVkaXRDbGljaz8oZXZlbnQ6IE11aURhdGFUYWJsZUFjdGlvbkV2ZW50PEM+KTogdm9pZDtcblxuICBvbkRlbGV0ZUNsaWNrPyhldmVudDogTXVpRGF0YVRhYmxlQWN0aW9uRXZlbnQ8Qz4pOiBBd2FpdGFibGU7XG5cbiAgYWN0aW9ucz86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgTXVpQnV0dG9uUHJvcHM8e1xuICAgICAgdmlzaWJsZT86IChyb3c6IFJvdykgPT4gYm9vbGVhbjtcbiAgICAgIG9uQ2xpY2s/KGV2ZW50OiBNdWlEYXRhVGFibGVBY3Rpb25FdmVudDxDPik7XG4gICAgfT5cbiAgPjtcblxuICB0aXRsZT86IFJlYWN0Tm9kZTtcblxuICBNdWlEZWxldGVCdXR0b25Qcm9wcz86IFBhcnRpYWw8Q29tcG9uZW50UHJvcHM8dHlwZW9mIE11aURlbGV0ZUJ1dHRvbj4+O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aURhdGFUYWJsZVZpZXc8QyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55RGF0YVRhYmxlPj4oXG4gIHByb3BzOiBNdWlEYXRhVGFibGVWaWV3UHJvcHM8Qz5cbikge1xuICBsZXQge1xuICAgIFRhYmxlUHJvcHMsXG4gICAgVGFibGVIZWFkUHJvcHMsXG4gICAgVGFibGVCb2R5UHJvcHMsXG4gICAgVGFibGVGb290ZXJQcm9wcyxcbiAgICBvbkRlbGV0ZUNsaWNrLFxuICAgIG9uRWRpdENsaWNrLFxuICAgIGFjdGlvbnMsXG4gICAgY29sdW1ucyxcbiAgICBNdWlUYWJsZVRvb2xiYXJQcm9wcyxcbiAgICBNdWlEZWxldGVCdXR0b25Qcm9wcyxcbiAgICB0b29sYmFyQWN0aW9ucyA9IHt9LFxuICAgIGRpc2FibGVUb29sYmFyLFxuICAgIHRpdGxlLFxuICAgIC4uLm5leHRQcm9wc1xuICB9ID0gcHJvcHMgYXMgTXVpRGF0YVRhYmxlVmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248QW55RGF0YVRhYmxlPj47XG5cbiAgY29uc3QgdGFibGVSZWYgPSB1c2VSZWY8RGF0YVRhYmxlVmlldzxDPj4obnVsbCk7XG5cbiAgYWN0aW9ucyA9IHsgLi4uYWN0aW9ucyB9O1xuXG4gIG9uRWRpdENsaWNrICYmXG4gICAgKGFjdGlvbnMuYWRkID0ge1xuICAgICAgdGl0bGU6IExhbmdgRURJVGAsXG4gICAgICBpY29uOiBcImVkaXRcIixcbiAgICAgIG9uQ2xpY2s6IG9uRWRpdENsaWNrLFxuICAgIH0pO1xuXG4gIG9uRGVsZXRlQ2xpY2sgJiZcbiAgICAoYWN0aW9ucy5kZWxldGUgPSB7XG4gICAgICBidXR0b25UeXBlOiBNdWlEZWxldGVCdXR0b24sXG4gICAgICBvbkNsaWNrOiBhc3luYyBldmVudCA9PiB7XG4gICAgICAgIGF3YWl0IG9uRGVsZXRlQ2xpY2shKGV2ZW50KTtcbiAgICAgICAgYXdhaXQgdGFibGVSZWYuY3VycmVudCEucmVsb2FkQWZ0ZXJSZW1vdmUoZXZlbnQua2V5KTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8RGF0YVRhYmxlVmlldyB7Li4ubmV4dFByb3BzfSByZWY9e3RhYmxlUmVmfT5cbiAgICAgIHt0YWJsZSA9PiAoXG4gICAgICAgIDxUYWJsZUxheW91dDx7ICRrZXk6IHN0cmluZyB9LCB7IHNvcnRhYmxlOiBib29sZWFuIH0sIGFueT5cbiAgICAgICAgICBnZXRSb3dLZXk9e3JvdyA9PiByb3cuJGtleX1cbiAgICAgICAgICBnZXRSb3dEYXRhPXtyb3cgPT4gcm93fVxuICAgICAgICAgIHJvd3M9e3RhYmxlLnJvd3N9XG4gICAgICAgICAgY29sdW1ucz17dGFibGUuZWxlbWVudD8uY29sdW1ucyB8fCB7fX1cbiAgICAgICAgICByZW5kZXJDb2x1bW5UaXRsZT17Y29sdW1uID0+IChcbiAgICAgICAgICAgIDxMYW5nS2V5IGZvcj17Y29sdW1uLmtleX0+e2NvbHVtbnM/Lltjb2x1bW4ua2V5XT8udGl0bGV9PC9MYW5nS2V5PlxuICAgICAgICAgICl9XG4gICAgICAgICAgcmVuZGVyQ29sdW1uPXsoY29sdW1uLCBjaGlsZHJlbikgPT4gKFxuICAgICAgICAgICAgPFRhYmxlQ2VsbFxuICAgICAgICAgICAgICBrZXk9e2NvbHVtbi5rZXl9XG4gICAgICAgICAgICAgIHsuLi5jb2x1bW5zPy5bY29sdW1uLmtleV0/Lk11aVRhYmxlQ29sdW1uUHJvcHN9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvVGFibGVDZWxsPlxuICAgICAgICAgICl9XG4gICAgICAgICAgcmVuZGVyUm93PXsocm93LCBjaGlsZHJlbikgPT4gKFxuICAgICAgICAgICAgPFRhYmxlUm93IGtleT17cm93LmtleX0+XG4gICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgICAge2hhc0tleXMoYWN0aW9ucykgJiYgKFxuICAgICAgICAgICAgICAgIDxNdWlUYWJsZUNlbGwgZml0VG9Db250ZW50PlxuICAgICAgICAgICAgICAgICAge21hcE9iamVjdFRvQXJyYXkoXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnMhLFxuICAgICAgICAgICAgICAgICAgICAoeyB2aXNpYmxlLCBvbkNsaWNrLCAuLi5NdWlCdXR0b25Qcm9wcyB9LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodmlzaWJsZSAmJiAhdmlzaWJsZShyb3cuZGF0YSkpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPE11aUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uT25seVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPXtcInNtYWxsXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4uTXVpQnV0dG9uUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2FzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPy4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiByb3cuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogcm93LmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb246IHRhYmxlLnByb3BzLmNvbm5lY3Rpb24uY29udHJvbGxlci5nZXRSb3dDb250cm9sbGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cua2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9NdWlUYWJsZUNlbGw+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICAgICl9XG4gICAgICAgICAgcmVuZGVyUm93Q29sdW1uPXsoZGF0YSwgcm93LCBjb2x1bW4pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgcmVuZGVyUm93Q29sdW1uIH0gPSBjb2x1bW5zPy5bY29sdW1uLmtleV0gfHwge307XG5cbiAgICAgICAgICAgIGlmIChyZW5kZXJSb3dDb2x1bW4pXG4gICAgICAgICAgICAgIHJldHVybiByZW5kZXJSb3dDb2x1bW4oZGF0YSwge1xuICAgICAgICAgICAgICAgIGtleTogcm93LmtleSxcbiAgICAgICAgICAgICAgICByb3c6IHJvdy5kYXRhLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcoZGF0YSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICByZW5kZXI9eyh7IGNvbHVtbnMsIHJvd3MgfSkgPT4gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgeyFkaXNhYmxlVG9vbGJhciAmJiAoXG4gICAgICAgICAgICAgICAgPE11aVRhYmxlVG9vbGJhclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICAgICAgey4uLk11aVRhYmxlVG9vbGJhclByb3BzfVxuICAgICAgICAgICAgICAgICAgc2VhcmNoPXtcbiAgICAgICAgICAgICAgICAgICAgIXRhYmxlLmVsZW1lbnQ/LnNlYXJjaGFibGVcbiAgICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0YWJsZS5zZWFyY2hUZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlYXJjaDogYXN5bmMgdGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUuc2VhcmNoKHRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgc3RhdGljQWN0aW9ucz17bWFwT2JqZWN0VG9BcnJheShcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhckFjdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIChwcm9wcywga2V5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPE11aUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbk9ubHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5vbkNsaWNrPy4oeyB0YWJsZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8VGFibGUgey4uLlRhYmxlUHJvcHN9PlxuICAgICAgICAgICAgICAgIDxUYWJsZUhlYWQgey4uLlRhYmxlSGVhZFByb3BzfT5cbiAgICAgICAgICAgICAgICAgIHshdGFibGUuaXNMb2FkaW5nICYmIChcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93PlxuICAgICAgICAgICAgICAgICAgICAgIHtjb2x1bW5zfVxuICAgICAgICAgICAgICAgICAgICAgIHtoYXNLZXlzKGFjdGlvbnMpICYmIDxNdWlUYWJsZUNlbGwgZml0VG9Db250ZW50IC8+fVxuICAgICAgICAgICAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L1RhYmxlSGVhZD5cbiAgICAgICAgICAgICAgICA8VGFibGVCb2R5IHsuLi5UYWJsZUJvZHlQcm9wc30+XG4gICAgICAgICAgICAgICAgICB7dGFibGUuaXNMb2FkaW5nICYmIChcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93PlxuICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZUNlbGwgY29sU3Bhbj17MTAwMH0gYWxpZ249e1wiY2VudGVyXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAge0xhbmdgTE9BRElOR19JTl9QUk9HUkVTU2B9XG4gICAgICAgICAgICAgICAgICAgICAgPC9UYWJsZUNlbGw+XG4gICAgICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICB7cm93cy5sZW5ndGggPyAoXG4gICAgICAgICAgICAgICAgICAgIHJvd3NcbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvdz5cbiAgICAgICAgICAgICAgICAgICAgICA8VGFibGVDZWxsIGNvbFNwYW49ezEwMDB9IGFsaWduPXtcImNlbnRlclwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtMYW5nYE5PX0hBVkVfTU9SRV9ST1dTYH1cbiAgICAgICAgICAgICAgICAgICAgICA8L1RhYmxlQ2VsbD5cbiAgICAgICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9UYWJsZUJvZHk+XG4gICAgICAgICAgICAgICAgPFRhYmxlRm9vdGVyIHsuLi5UYWJsZUZvb3RlclByb3BzfT5cbiAgICAgICAgICAgICAgICAgIDxUYWJsZVJvdz5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUGFnaW5hdGlvblxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50PXt0YWJsZS5wYWdlU2l6ZX1cbiAgICAgICAgICAgICAgICAgICAgICBwYWdlPXt0YWJsZS5wYWdlSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgcm93c1BlclBhZ2U9e3RhYmxlLnBhZ2VTaXplfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlUm93c1BlclBhZ2U9e2V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLnNldFBhZ2VTaXplKHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2VQYWdlPXsoZXZlbnQsIHBhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLnNldFBhZ2VJbmRleChwYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICAgICA8L1RhYmxlRm9vdGVyPlxuICAgICAgICAgICAgICA8L1RhYmxlPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9EYXRhVGFibGVWaWV3PlxuICApO1xufVxuIiwiaW1wb3J0IEdyaWQgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0dyaWRcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IG1lcmdlUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvdXRpbHMvbWVyZ2VQcm9wc1wiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL1JwY1wiO1xuaW1wb3J0IHsgQW55Rm9ybSB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL3dpZGdldC9mb3JtL0Zvcm1cIjtcbmltcG9ydCB7IEZvcm1WaWV3LCBGb3JtVmlld1Byb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybVZpZXdcIjtcblxuaW1wb3J0IHtcbiAgTXVpQnV0dG9uLFxuICBNdWlCdXR0b25Qcm9wcyxcbiAgTXVpUmVzZXRCdXR0b24sXG4gIE11aVN1Ym1pdEJ1dHRvbixcbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvTXVpQnV0dG9uXCI7XG5pbXBvcnQgeyBNdWlHcmlkIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvTXVpR3JpZFwiO1xuXG5leHBvcnQgdHlwZSBNdWlGb3JtVmlld1Byb3BzPEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueUZvcm0+PiA9IEZvcm1WaWV3UHJvcHM8XG4gIENcbj4gJiB7XG4gIE11aVN1Ym1pdEJ1dHRvblByb3BzPzogTXVpQnV0dG9uUHJvcHM7XG4gIE11aVJlc2V0QnV0dG9uUHJvcHM/OiBNdWlCdXR0b25Qcm9wcztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlGb3JtVmlldzxDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlGb3JtPj4oXG4gIHByb3BzOiBNdWlGb3JtVmlld1Byb3BzPEM+XG4pOiBSZWFjdEVsZW1lbnQge1xuICByZXR1cm4gKFxuICAgIDxGb3JtVmlldyB7Li4ucHJvcHN9PlxuICAgICAgeyh7IGlucHV0LCBmb3JtIH0pID0+IChcbiAgICAgICAgPEdyaWQgY29udGFpbmVyIGRpcmVjdGlvbj17XCJjb2x1bW5cIn0gc3BhY2luZz17Mn0+XG4gICAgICAgICAgPEdyaWQgaXRlbT57aW5wdXR9PC9HcmlkPlxuICAgICAgICAgIDxHcmlkIGl0ZW0+XG4gICAgICAgICAgICA8TXVpR3JpZCBzcGFjaW5nPXsyfSBqdXN0aWZ5PXtcImZsZXgtZW5kXCJ9PlxuICAgICAgICAgICAgICA8TXVpU3VibWl0QnV0dG9uXG4gICAgICAgICAgICAgICAgQnV0dG9uUHJvcHM9e3sgdmFyaWFudDogXCJjb250YWluZWRcIiB9fVxuICAgICAgICAgICAgICAgIHsuLi5tZXJnZVByb3BzKHByb3BzLk11aVN1Ym1pdEJ1dHRvblByb3BzLCB7XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBmb3JtLnN1Ym1pdCgpLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8TXVpUmVzZXRCdXR0b25cbiAgICAgICAgICAgICAgICBCdXR0b25Qcm9wcz17eyB2YXJpYW50OiBcImNvbnRhaW5lZFwiIH19XG4gICAgICAgICAgICAgICAgey4uLm1lcmdlUHJvcHMocHJvcHMuTXVpUmVzZXRCdXR0b25Qcm9wcywge1xuICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gZm9ybS5yZXNldCgpLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9NdWlHcmlkPlxuICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgPC9HcmlkPlxuICAgICAgKX1cbiAgICA8L0Zvcm1WaWV3PlxuICApO1xufVxuIiwiaW1wb3J0IFRhYiwgeyBUYWJQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UYWJcIjtcbmltcG9ydCBUYWJzLCB7IFRhYnNQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UYWJzXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJlYWN0RWxlbWVudCwgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBlbnRyaWVzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvZW50cmllc1wiO1xuaW1wb3J0IHsga2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L2tleXNcIjtcbmltcG9ydCB7IExhbmdLZXkgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nS2V5XCI7XG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC9yZW5kZXJlclwiO1xuaW1wb3J0IHsgRW1wdHlGcmFnbWVudCB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9FbXB0eUZyYWdtZW50XCI7XG5pbXBvcnQgeyBtZXJnZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL21lcmdlUHJvcHNcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9ScGNcIjtcbmltcG9ydCB7IEFueVRhYnNXaWRnZXQgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvdGFicy13aWRnZXQvVGFic1dpZGdldFwiO1xuaW1wb3J0IHsgVGFic1dpZGdldFZpZXcgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvdGFicy13aWRnZXQvVGFic1dpZGdldFZpZXdcIjtcbmltcG9ydCB7XG4gIEFueVdpZGdldCxcbiAgQW55V2lkZ2V0Q29ubmVjdGlvbixcbiAgV2lkZ2V0VHlwZSxcbn0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L1dpZGdldFwiO1xuaW1wb3J0IHsgQW55V2lkZ2V0UmVjb3JkIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L3dpZGdldC1tYXAvV2lkZ2V0TWFwXCI7XG5pbXBvcnQgeyBXaWRnZXRWaWV3UHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy93aWRnZXQvV2lkZ2V0Vmlld1wiO1xuaW1wb3J0IHsgTXVpSWNvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL011aUljb25cIjtcblxuZXhwb3J0IHR5cGUgQW55VGFic1dpZGdldENvbm5lY3Rpb24gPSBScGNDb25uZWN0aW9uPEFueVRhYnNXaWRnZXQ+O1xuXG5leHBvcnQgdHlwZSBSZW5kZXJlck9yUHJvcHM8VCwgUD4gPSBbUGFydGlhbDxUPiwgUmVuZGVyZXI8UD5dIHwgUmVuZGVyZXI8UD47XG5cbmV4cG9ydCB0eXBlIE11aVRhYlZpZXdQcm9wczxDIGV4dGVuZHMgQW55V2lkZ2V0Q29ubmVjdGlvbj4gPSB7XG4gIHRpdGxlPzogUmVhY3ROb2RlO1xuICBpY29uPzogTXVpSWNvbjtcbiAgcmVuZGVyPyhwcm9wczogV2lkZ2V0Vmlld1Byb3BzPEM+KTogUmVhY3RFbGVtZW50O1xufTtcblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIE11aVRhYnNXaWRnZXRWaWV3UHJvcHMge1xuICBleHBvcnQgdHlwZSBUYWIgPSB7XG4gICAgdGl0bGU6IFJlYWN0Tm9kZTtcbiAgICBpY29uPzogTXVpSWNvbjtcbiAgfTtcbn1cbmV4cG9ydCB0eXBlIE11aVRhYnNXaWRnZXRWaWV3UHJvcHM8XG4gIEMgZXh0ZW5kcyBBbnlUYWJzV2lkZ2V0Q29ubmVjdGlvbixcbiAgVCBleHRlbmRzIEFueVdpZGdldFJlY29yZCA9IFdpZGdldFR5cGU8Qz5bXCJUYWJNYXBcIl1cbj4gPSBXaWRnZXRWaWV3UHJvcHM8Qz4gJiB7XG4gIFRhYnNQcm9wcz86IFRhYnNQcm9wcztcblxuICBUYWJQcm9wcz86IFRhYlByb3BzO1xuICBTZWxlY3RlZFRhYlByb3BzPzogVGFiUHJvcHM7XG5cbiAgcmVuZGVyVGFiUGFuZWw/OiBSZW5kZXJlcjx7IGNoaWxkcmVuOiBSZWFjdEVsZW1lbnQgfCB1bmRlZmluZWQgfT47XG5cbiAgdGFicz86IHtcbiAgICBbSyBpbiBrZXlvZiBUXT86XG4gICAgICB8IE11aVRhYlZpZXdQcm9wczxScGNDb25uZWN0aW9uPFRbS10+PlxuICAgICAgfCBNdWlUYWJWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxUW0tdPj5bXCJyZW5kZXJcIl07XG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpVGFic1dpZGdldFZpZXc8QyBleHRlbmRzIEFueVRhYnNXaWRnZXRDb25uZWN0aW9uPihcbiAgcHJvcHM6IE11aVRhYnNXaWRnZXRWaWV3UHJvcHM8Qz5cbikge1xuICBjb25zdCB7XG4gICAgdGFiczogdGFiT3B0aW9uc01hcCxcbiAgICBUYWJzUHJvcHMsXG4gICAgVGFiUHJvcHMsXG4gICAgU2VsZWN0ZWRUYWJQcm9wcyxcbiAgICByZW5kZXJUYWJQYW5lbCxcbiAgICAuLi5vdGhlclByb3BzXG4gIH0gPSBwcm9wcyBhcyBNdWlUYWJzV2lkZ2V0Vmlld1Byb3BzPEFueVRhYnNXaWRnZXRDb25uZWN0aW9uPjtcblxuICByZXR1cm4gKFxuICAgIDxUYWJzV2lkZ2V0VmlldyB7Li4ub3RoZXJQcm9wc30+XG4gICAgICB7dmlldyA9PiB7XG4gICAgICAgIGNvbnN0IHRhYnM6IFJlYWN0RWxlbWVudFtdID0gW107XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFRhYlByb3BzIH0gPSB2aWV3O1xuICAgICAgICBjb25zdCBjdXJyZW50VGFiT3B0aW9ucyA9XG4gICAgICAgICAgY3VycmVudFRhYlByb3BzICYmIGdldFRhYk9wdGlvbnMoY3VycmVudFRhYlByb3BzLmtleSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0YWJLZXkgb2Yga2V5cyhwcm9wcy5jb25uZWN0aW9uLnJwYy50YWJNYXApKSB7XG4gICAgICAgICAgY29uc3QgdGFiT3B0aW9ucyA9IGdldFRhYk9wdGlvbnModGFiS2V5KTtcblxuICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBjdXJyZW50VGFiUHJvcHM/LmtleSA9PT0gdGFiS2V5O1xuXG4gICAgICAgICAgdGFicy5wdXNoKFxuICAgICAgICAgICAgPFRhYlxuICAgICAgICAgICAgICBrZXk9e3RhYktleX1cbiAgICAgICAgICAgICAgey4uLlRhYlByb3BzfVxuICAgICAgICAgICAgICB7Li4uKGlzU2VsZWN0ZWQgPyBTZWxlY3RlZFRhYlByb3BzIDogbnVsbCl9XG4gICAgICAgICAgICAgIGxhYmVsPXs8TGFuZ0tleSBmb3I9e3RhYktleX0+e3RhYk9wdGlvbnM/LnRpdGxlfTwvTGFuZ0tleT59XG4gICAgICAgICAgICAgIHZhbHVlPXt0YWJLZXl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdGFiQ29udGVudDogUmVhY3RFbGVtZW50IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChjdXJyZW50VGFiT3B0aW9ucz8ucmVuZGVyKSB7XG4gICAgICAgICAgdGFiQ29udGVudCA9IGN1cnJlbnRUYWJPcHRpb25zLnJlbmRlcj8uKGN1cnJlbnRUYWJQcm9wcyEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhYnMubGVuZ3RoID09PSAxKSByZXR1cm4gdGFiQ29udGVudCA/PyBFbXB0eUZyYWdtZW50O1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxUYWJzXG4gICAgICAgICAgICAgIHsuLi5tZXJnZVByb3BzKFRhYnNQcm9wcywge1xuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiAoXywga2V5KSA9PiB2aWV3LnN3aXRjaFRvKGtleSksXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICB2YWx1ZT17Y3VycmVudFRhYlByb3BzPy5rZXl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0YWJzfVxuICAgICAgICAgICAgPC9UYWJzPlxuICAgICAgICAgICAge3JlbmRlclRhYlBhbmVsXG4gICAgICAgICAgICAgID8gcmVuZGVyVGFiUGFuZWwoeyBjaGlsZHJlbjogdGFiQ29udGVudCB9KVxuICAgICAgICAgICAgICA6IHRhYkNvbnRlbnR9XG4gICAgICAgICAgPC8+XG4gICAgICAgICk7XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0VGFiT3B0aW9ucyhrZXk6IHN0cmluZykge1xuICAgICAgICAgIGlmICh0YWJPcHRpb25zTWFwKVxuICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgdGFiT3B0aW9uc01hcFtrZXldID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgICAgPyB7IHJlbmRlcjogdGFiT3B0aW9uc01hcFtrZXldIH1cbiAgICAgICAgICAgICAgOiB0YWJPcHRpb25zTWFwW2tleV0pIGFzXG4gICAgICAgICAgICAgIHwgTXVpVGFiVmlld1Byb3BzPEFueVdpZGdldENvbm5lY3Rpb24+XG4gICAgICAgICAgICAgIHwgdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgIDwvVGFic1dpZGdldFZpZXc+XG4gICk7XG59XG4iLCJpbXBvcnQgRGlhbG9nIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dcIjtcbmltcG9ydCBEaWFsb2dDb250ZW50IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dDb250ZW50XCI7XG5pbXBvcnQgRGlhbG9nVGl0bGUgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0RpYWxvZ1RpdGxlXCI7XG5pbXBvcnQgVGV4dEZpZWxkIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UZXh0RmllbGRcIjtcbmltcG9ydCB7IEF1dG9jb21wbGV0ZSB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvbGFiXCI7XG5pbXBvcnQgeyBtYWtlU3R5bGVzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBJZiwgSXMsIFBhcnRpYWxVbmRlZmluZWRLZXlzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBMYW5nLCBMYW5nTm9kZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9sYW5nL0xhbmdcIjtcbmltcG9ydCB7IHVzZUxhbmdUcmFuc2xhdG9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2xhbmcvTGFuZ1RyYW5zbGF0b3JcIjtcbmltcG9ydCB7IEFueURhdGFJbnB1dCB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcnBjL2lucHV0L2RhdGEtaW5wdXQvRGF0YUlucHV0XCI7XG5pbXBvcnQgeyBEYXRhSW5wdXRWaWV3IH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvaW5wdXQvZGF0YS1pbnB1dC9EYXRhSW5wdXRWaWV3XCI7XG5cbmltcG9ydCB7IElucHV0VHlwZSB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcnBjL2lucHV0L0lucHV0XCI7XG5pbXBvcnQgeyBJbnB1dFZpZXdQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcnBjL2lucHV0L0lucHV0Vmlld1wiO1xuaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcnBjL1JwY1wiO1xuaW1wb3J0IHsgV2lkZ2V0Vmlld0xvYWRlciB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcnBjL3dpZGdldC9XaWRnZXRWaWV3TG9hZGVyXCI7XG5pbXBvcnQgeyBNdWlMaW5rIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvTXVpTGlua1wiO1xuaW1wb3J0IHsgTXVpRGF0YVRhYmxlVmlldyB9IGZyb20gXCIuLi9NdWlEYXRhVGFibGVWaWV3XCI7XG5cbmV4cG9ydCB0eXBlIEFueURhdGFJbnB1dENvbm5lY3Rpb24gPSBScGNDb25uZWN0aW9uPEFueURhdGFJbnB1dD47XG5cbmV4cG9ydCBjb25zdCB1c2VTdHlsZXMgPSBtYWtlU3R5bGVzKHRoZW1lID0+ICh7fSkpO1xuXG4vLyBUT0RPOiBMb2FkIHRoZSBmaXJzdHMgcm93c1xuZXhwb3J0IGZ1bmN0aW9uIE11aURhdGFJbnB1dFZpZXc8QyBleHRlbmRzIEFueURhdGFJbnB1dENvbm5lY3Rpb24+KFxuICBwcm9wczogUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gICAge1xuICAgICAgZ2V0TGFiZWw6XG4gICAgICAgIHwgKChyb3c6IElucHV0VHlwZTxDPltcIlR5cGVzXCJdW1wiVGFibGVUeXBlc1wiXVtcIlJvd1dpdGhLZXlcIl0pID0+IHN0cmluZylcbiAgICAgICAgfCBJZjxcbiAgICAgICAgICAgIElzPElucHV0VHlwZTxDPltcIlR5cGVzXCJdW1wiVGFibGVUeXBlc1wiXVtcIlJvd1wiXSwgeyBsYWJlbDogc3RyaW5nIH0+LFxuICAgICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICAgPjtcbiAgICB9LFxuICAgIElucHV0Vmlld1Byb3BzPEM+ICYge1xuICAgICAgdGl0bGU/OiBMYW5nTm9kZTtcblxuICAgICAgLy8gVE9ETzogbGFiZWxDb2x1bW5UaXRsZT86XG4gICAgfVxuICA+XG4pIHtcbiAgdHlwZSBUeXBlcyA9IElucHV0VHlwZTxDPltcIlR5cGVzXCJdO1xuICB0eXBlIFRhYmxlVHlwZXMgPSBUeXBlc1tcIlRhYmxlVHlwZXNcIl07XG4gIHR5cGUgVGFibGVSb3cgPSBUYWJsZVR5cGVzW1wiUm93V2l0aEtleVwiXTtcblxuICBjb25zdCBsYW5nID0gdXNlTGFuZ1RyYW5zbGF0b3IoKTtcbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8RGF0YUlucHV0VmlldzxDPj4obnVsbCk7XG4gIGNvbnN0IFtpc09wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcXVlcnlSZXN1bHQsIHNldFF1ZXJ5UmVzdWx0XSA9IHVzZVN0YXRlPFRhYmxlVHlwZXNbXCJRdWVyeVJlc3VsdFwiXT4oKTtcblxuICBhc3luYyBmdW5jdGlvbiB1cGRhdGVPcHRpb25zKHRleHQ6IHN0cmluZykge1xuICAgIHNldFF1ZXJ5UmVzdWx0KFxuICAgICAgYXdhaXQgcHJvcHMuY29ubmVjdGlvbi5jb250cm9sbGVyLmdldFJvd3Moe1xuICAgICAgICBnZXRDb3VudDogdHJ1ZSxcbiAgICAgICAgdGV4dCxcbiAgICAgICAgdGFrZTogMTUsXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8RGF0YUlucHV0Vmlld1xuICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgIHJlZj17aW5wdXRSZWZ9XG4gICAgICAgIGNoaWxkcmVuPXt2aWV3ID0+IHtcbiAgICAgICAgICBjb25zdCBvcHRpb25zOiBUYWJsZVR5cGVzW1wiUm93V2l0aEtleVwiXVtdID1cbiAgICAgICAgICAgIHF1ZXJ5UmVzdWx0Py5yb3dzIHx8ICh2aWV3LnZhbHVlID8gW3ZpZXcudmFsdWVdIDogW10pO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxBdXRvY29tcGxldGVcbiAgICAgICAgICAgICAgICBjbGVhck9uRXNjYXBlXG4gICAgICAgICAgICAgICAgdmFsdWU9e3ZpZXcudmFsdWUgfHwgbnVsbH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KF8sIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2aWV3LnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uRG91YmxlQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbklucHV0Q2hhbmdlPXsoXywgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZU9wdGlvbnModmFsdWUpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgZ2V0T3B0aW9uTGFiZWw9e3JvdyA9PlxuICAgICAgICAgICAgICAgICAgcHJvcHNbXCJnZXRMYWJlbFwiXSA/IHByb3BzW1wiZ2V0TGFiZWxcIl0ocm93KSA6IHJvd1tcImxhYmVsXCJdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICAgICAgICAgICAgZ2V0T3B0aW9uU2VsZWN0ZWQ9eyhvLCB2KSA9PiBvLiRrZXkgPT09IHYuJGtleX1cbiAgICAgICAgICAgICAgICByZW5kZXJJbnB1dD17cGFyYW1zID0+IChcbiAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgey4uLnBhcmFtc31cbiAgICAgICAgICAgICAgICAgICAgZXJyb3I9eyEhdmlldy5lcnJvcn1cbiAgICAgICAgICAgICAgICAgICAgaGVscGVyVGV4dD17dmlldy5yZW5kZXJFcnJvcigpfVxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17bGFuZy50cmFuc2xhdGVOb2RlKHByb3BzLnRpdGxlKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICk7XG4gICAgICAgIH19XG4gICAgICAvPlxuXG4gICAgICB7aXNPcGVuICYmIChcbiAgICAgICAgPERpYWxvZyBvcGVuIG9uQ2xvc2U9eygpID0+IHNldE9wZW4oZmFsc2UpfT5cbiAgICAgICAgICA8RGlhbG9nQ29udGVudD5cbiAgICAgICAgICAgIDxEaWFsb2dUaXRsZT5cbiAgICAgICAgICAgICAge0xhbmdgUElDS18ke1wic3ViamVjdFwifWAoe1xuICAgICAgICAgICAgICAgIHN1YmplY3Q6IHByb3BzLnRpdGxlLFxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvRGlhbG9nVGl0bGU+XG4gICAgICAgICAgICA8V2lkZ2V0Vmlld0xvYWRlclxuICAgICAgICAgICAgICBjb25uZWN0aW9uPXtwcm9wcy5jb25uZWN0aW9uLmNvbnRyb2xsZXJ9XG4gICAgICAgICAgICAgIGNoaWxkcmVuPXtwcm9wcyA9PiAoXG4gICAgICAgICAgICAgICAgPE11aURhdGFUYWJsZVZpZXdcbiAgICAgICAgICAgICAgICAgIC8vIGRpc2FibGVUb29sYmFyXG4gICAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgICBhY3Rpb25zPXt7XG4gICAgICAgICAgICAgICAgICAgIHBpY2s6IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFuZ2BQSUNLYCxcbiAgICAgICAgICAgICAgICAgICAgICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0tleWJvYXJkUmV0dXJuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFF1ZXJ5UmVzdWx0KHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZi5jdXJyZW50IS5zZXRWYWx1ZShldmVudC5yb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjb2x1bW5zPXt7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbmdgQUNDT1VOVF9GVUxMX05BTUVgLFxuICAgICAgICAgICAgICAgICAgICAgIHJlbmRlclJvd0NvbHVtbjogKGRhdGEsIHByb3BzKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8TXVpTGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UXVlcnlSZXN1bHQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZi5jdXJyZW50IS5zZXRWYWx1ZShwcm9wcy5yb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTXVpTGluaz5cbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0RpYWxvZ0NvbnRlbnQ+XG4gICAgICAgIDwvRGlhbG9nPlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn1cbiIsImltcG9ydCBUZXh0RmllbGQsIHsgVGV4dEZpZWxkUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVGV4dEZpZWxkXCI7XG5pbXBvcnQge1xuICBGaWxsZWRUZXh0RmllbGRQcm9wcyxcbiAgT3V0bGluZWRUZXh0RmllbGRQcm9wcyxcbiAgU3RhbmRhcmRUZXh0RmllbGRQcm9wcyxcbn0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1RleHRGaWVsZC9UZXh0RmllbGRcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBtZXJnZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3JlYWN0L3V0aWxzL21lcmdlUHJvcHNcIjtcbmltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcnBjL2lucHV0L3RleHQtaW5wdXQvVGV4dElucHV0XCI7XG5pbXBvcnQge1xuICBUZXh0SW5wdXRWaWV3LFxuICBUZXh0SW5wdXRWaWV3UHJvcHMsXG59IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcnBjL2lucHV0L3RleHQtaW5wdXQvVGV4dElucHV0Vmlld1wiO1xuXG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVycGMvUnBjXCI7XG5cbmV4cG9ydCB0eXBlIE11aVRleHRJbnB1dFZpZXdQcm9wczxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248VGV4dElucHV0PlxuPiA9IFRleHRJbnB1dFZpZXdQcm9wczxDPiAmIHtcbiAgdGl0bGU/OiBSZWFjdE5vZGU7XG4gIFRleHRGaWVsZFByb3BzPzogUGFydGlhbDxUZXh0RmllbGRQcm9wcz47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpVGV4dElucHV0VmlldzxDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxUZXh0SW5wdXQ+Pih7XG4gIHRpdGxlLFxuICBUZXh0RmllbGRQcm9wcyxcbiAgLi4ucHJvcHNcbn06IE11aVRleHRJbnB1dFZpZXdQcm9wczxDPikge1xuICByZXR1cm4gKFxuICAgIDxUZXh0SW5wdXRWaWV3XG4gICAgICB7Li4ucHJvcHN9XG4gICAgICBjaGlsZHJlbj17dmlldyA9PiAoXG4gICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICB7Li4ubWVyZ2VQcm9wcyhUZXh0RmllbGRQcm9wcywge1xuICAgICAgICAgICAgb25CbHVyOiAoKSA9PiB2aWV3LnZhbGlkYXRlKCksXG4gICAgICAgICAgICBvbkNoYW5nZTogZXZlbnQgPT4gdmlldy5zZXRUZXh0KGV2ZW50LnRhcmdldC52YWx1ZSksXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgbGFiZWw9e3RpdGxlfVxuICAgICAgICAgIGVycm9yPXt2aWV3LmVycm9yICE9IG51bGx9XG4gICAgICAgICAgaGVscGVyVGV4dD17dmlldy5yZW5kZXJFcnJvcigpfVxuICAgICAgICAgIHZhbHVlPXt2aWV3LnRleHR9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIC8+XG4gICk7XG59XG4iLCJpbXBvcnQgeyBOb25OdWxsYWJsZUF0IH0gZnJvbSBcIi4vdHlwaW5nc1wiO1xuXG5leHBvcnQgZGVjbGFyZSBjb25zdCBUTWV0YVR5cGU6IHVuaXF1ZSBzeW1ib2w7XG5cbmV4cG9ydCB0eXBlIFdpdGhNZXRhVHlwZTxUPiA9IHsgW1RNZXRhVHlwZV0/OiBUIH07XG5cbmV4cG9ydCB0eXBlIE1ldGFUeXBlPFQgZXh0ZW5kcyB7IFtUTWV0YVR5cGVdPyB9PiA9IE5vbk51bGxhYmxlQXQ8XG4gIFQsXG4gIHR5cGVvZiBUTWV0YVR5cGVcbj47XG5cbmV4cG9ydCB0eXBlIE1ldGFUeXBlSG9vazxcbiAgVCBleHRlbmRzIEFueVQsXG4gIEFueVQgZXh0ZW5kcyBXaXRoTWV0YVR5cGU8YW55PixcbiAgVVxuPiA9IFdpdGhNZXRhVHlwZTxPbWl0PE1ldGFUeXBlPFQ+LCBrZXlvZiBNZXRhVHlwZTxBbnlUPiB8IGtleW9mIFU+ICYgVT47XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0TWV0YVR5cGU8VD4oXG4gIG9iajogV2l0aE1ldGFUeXBlPFQ+LFxuICBjYWxsYmFjazogKHR5cGU6IFQpID0+IHZvaWRcbikge1xuICAvL1xufVxuIiwiaW1wb3J0IHsgU2VxIH0gZnJvbSBcImltbXV0YWJsZVwiO1xuaW1wb3J0IHsgTGF6eSB9IGZyb20gXCIuLi9wYXR0ZXJucy9sYXp5XCI7XG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBBcnJheTxUPiB7XG4gICAgdG9TZXEoKTogU2VxLkluZGV4ZWQ8VD47XG4gIH1cbiAgaW50ZXJmYWNlIFJlYWRvbmx5QXJyYXk8VD4ge1xuICAgIHRvU2VxKCk6IFNlcS5JbmRleGVkPFQ+O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB1c2VBcnJheVRvU2VxID0gTGF6eSgoKSA9PiB7XG4gIEFycmF5LnByb3RvdHlwZS50b1NlcSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gU2VxLkluZGV4ZWQodGhpcyk7XG4gIH07XG59KTtcbiIsImV4cG9ydCBmdW5jdGlvbiBhc3NlcnQodmFsdWUsIG1lc3NhZ2U/OiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKSk6IGFzc2VydHMgdmFsdWUge1xuICAgIGlmICghdmFsdWUpIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgdHlwZW9mIG1lc3NhZ2UgPT09IFwiZnVuY3Rpb25cIiA/IG1lc3NhZ2UoKSA6XG4gICAgICAgICAgICBtZXNzYWdlXG4gICAgKVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIFRpbWVvdXQobXM6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpO1xyXG4gICAgfSlcclxufVxyXG5cclxuIiwiZXhwb3J0IHR5cGUgV2FpdGVyPFQ+ID0gUHJvbWlzZTxUPiAmXG4gICAge1xuICAgICAgICByZXNvbHZlKHZhbHVlOiBUKTogdm9pZFxuICAgICAgICByZWplY3QoZXJyb3I6IGFueSk6IHZvaWQ7XG4gICAgfSAmIChUIGV4dGVuZHMgdm9pZCA/IHtcbiAgICAgICAgcmVzb2x2ZSgpOnZvaWQ7XG59Ont9KTtcblxuZXhwb3J0IGZ1bmN0aW9uIFdhaXRlcjxUID0gYW55PigpOiBXYWl0ZXI8VD4ge1xuICAgIGxldCBwcm9wcztcbiAgICBjb25zdCBwcm9taXNlID0gPFdhaXRlcjxUPj5uZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHByb3BzID0ge3Jlc29sdmUsIHJlamVjdH07XG4gICAgfSlcbiAgICBPYmplY3QuYXNzaWduKHByb21pc2UsIHByb3BzKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcblxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldE5leHRQYXRoKHBhdGg6IHN0cmluZyk6IFtzdHJpbmcsIHN0cmluZ10ge1xuICAgIGxldCBzdGFydCA9IDA7XG4gICAgd2hpbGUgKHBhdGguY2hhckF0KHN0YXJ0KSA9PT0gJy8nKSB7XG4gICAgICAgIHN0YXJ0Kys7XG4gICAgfVxuICAgIGNvbnN0IGVuZCA9IHBhdGguaW5kZXhPZignLycsIHN0YXJ0KTtcbiAgICBpZiAoMCA+IGVuZCkge1xuICAgICAgICByZXR1cm4gW3BhdGguc2xpY2Uoc3RhcnQpLCBcIlwiXVxuICAgIH1cbiAgICByZXR1cm4gW3BhdGguc2xpY2Uoc3RhcnQsIGVuZCksIHBhdGguc2xpY2UoZW5kKV1cbn1cbiIsImltcG9ydCB7YXNzZXJ0fSBmcm9tIFwiLi4vYXNzZXJ0XCI7XG5pbXBvcnQge0Jhc2VNYXAsIE1hcEtleSwgTWFwVmFsdWV9IGZyb20gXCIuL0Jhc2VNYXBcIjtcblxuZXhwb3J0IHR5cGUgTWFwRmFjdG9yeTxUIGV4dGVuZHMgQmFzZU1hcDxhbnksIGFueT4+ID0ge1xuICAgIG1hcDogVDtcbiAgICAoa2V5OiBNYXBLZXk8VD4pOiBOb25OdWxsYWJsZTxNYXBWYWx1ZTxUPj47XG5cbn07XG5cbiBmdW5jdGlvbiBtYXBGYWN0b3J5PEssIFY+KFxuICAgIG1hcDogQmFzZU1hcDxLLCBWPixcbiAgICBmYWN0b3J5OiAoa2V5OiBLKSA9PiBWXG4pOiBNYXBGYWN0b3J5PEJhc2VNYXA8SywgVj4+IHtcbiAgICB0b3VjaC5tYXAgPSBtYXA7XG4gICAgcmV0dXJuIHRvdWNoXG5cbiAgICBmdW5jdGlvbiB0b3VjaChrZXksIGNhbGxiYWNrPyk6IGFueSB7XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFwLmhhcyhrZXkpID8gY2FsbGJhY2sobWFwLmdldChrZXkpKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YWx1ZSA9IG1hcC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKHZhbHVlIHx8ICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gPFY+dmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgbWFwLnNldChrZXksIHZhbHVlID0gZmFjdG9yeShrZXkpKTtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIik7XG4gICAgICAgIHJldHVybiA8Vj52YWx1ZTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIFdlYWtNYXBGYWN0b3J5PEsgZXh0ZW5kcyBvYmplY3QsIFY+KGZhY3Rvcnk6IChrZXk6IEspID0+IFYpOiBNYXBGYWN0b3J5PFdlYWtNYXA8SywgVj4+IHtcbiAgICByZXR1cm4gPGFueT5tYXBGYWN0b3J5KG5ldyBXZWFrTWFwKCksIGZhY3RvcnkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNYXBGYWN0b3J5PEssIFY+KGZhY3Rvcnk6IChrZXk6IEspID0+IFYpOiBNYXBGYWN0b3J5PE1hcDxLLCBWPj4ge1xuICAgIHJldHVybiA8YW55Pm1hcEZhY3RvcnkobmV3IE1hcCgpLCBmYWN0b3J5KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQmFzZU1hcEZhY3Rvcnk8SywgVj4obWFwOiBCYXNlTWFwPEssIFY+LCBmYWN0b3J5OiAoa2V5OiBLKSA9PiBWKTogTWFwRmFjdG9yeTxCYXNlTWFwPEssIFY+PiB7XG4gICAgcmV0dXJuIDxhbnk+bWFwRmFjdG9yeShtYXAsIGZhY3RvcnkpXG59XG5cbiIsImltcG9ydCB7QmFzZU1hcCwgTWFwS2V5LCBNYXBWYWx1ZX0gZnJvbSBcIi4vQmFzZU1hcFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gdG91Y2hNYXA8VCBleHRlbmRzIEJhc2VNYXA8YW55LCBhbnk+PihcbiAgICBtYXA6IFQsIGtleTpcbiAgICAgICAgTWFwS2V5PFQ+LFxuICAgIGNhbGxiYWNrOiAoa2V5OiBNYXBLZXk8VD4pID0+IE1hcFZhbHVlPFQ+KTogTWFwVmFsdWU8VD4ge1xuICAgIGxldCB2YWx1ZSA9IG1hcC5nZXQoa2V5KTtcbiAgICBpZiAodmFsdWUgfHwgbWFwLmhhcyhrZXkpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgbWFwLnNldChrZXksIHZhbHVlID0gY2FsbGJhY2soa2V5KSk7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG4iLCJleHBvcnQgZnVuY3Rpb24gZGVmaW5lZDxUPih2YWx1ZTogVCwgZXJyb3JPckNhbGxiYWNrPyk6IE5vbk51bGxhYmxlPFQ+IHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgdHlwZW9mIGVycm9yT3JDYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiID8gZXJyb3JPckNhbGxiYWNrKCkgOlxuICAgICAgICAgICAgICAgIGVycm9yT3JDYWxsYmFjayk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuXG4iLCJpbXBvcnQge2RlZmluZWR9IGZyb20gXCIuL2RlZmluZWRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZWRBdDxULCBLIGV4dGVuZHMga2V5b2YgVD4ob2JqOiBULCBrZXk6IEspOiBOb25OdWxsYWJsZTxUW0tdPiB7XG4gICAgcmV0dXJuIGRlZmluZWQob2JqW2tleV0sICgpID0+IGBObyAke2tleX1gKVxufVxuIiwiaW1wb3J0IHtrZXlzfSBmcm9tIFwiLi9rZXlzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiogZW50cmllczxWID0gYW55PihvYmo6IFJlY29yZDxzdHJpbmcsIFY+IHwgdW5kZWZpbmVkIHwgbnVsbCk6IEl0ZXJhYmxlSXRlcmF0b3I8W3N0cmluZywgVixudW1iZXJdPiB7XG4gICAgbGV0IGluZGV4PTA7XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cyhvYmopKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgeWllbGQgW2tleSwgb2JqW2tleV0saW5kZXgrK11cbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaGFzS2V5cyhvYmplY3Q6IG9iamVjdCB8IHVuZGVmaW5lZCkge1xuICAgIGlmIChvYmplY3QpIGZvciAobGV0IGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24qIGtleXM8SyBleHRlbmRzIFByb3BlcnR5S2V5ID0gc3RyaW5nPihcbiAgb2JqOiBSZWNvcmQ8SywgYW55PiB8IHVuZGVmaW5lZCB8IG51bGxcbik6IEl0ZXJhYmxlSXRlcmF0b3I8c3RyaW5nICYgSz4ge1xuICBpZiAob2JqKVxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBrZXkgIT09IFwic3RyaW5nXCIpIGNvbnRpbnVlO1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHlpZWxkIGtleTtcbiAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge2VudHJpZXN9IGZyb20gXCIuL2VudHJpZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcEFuZEZpbHRlck9iamVjdDxULCBSPihvYmo6IFJlY29yZDxzdHJpbmcsIFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBwZXI6ICh2YWx1ZTogVCwga2V5OiBzdHJpbmcpID0+IFIgfCB1bmRlZmluZWQpOiBSZWNvcmQ8c3RyaW5nLCBSPiB7XG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcyhvYmopKSB7XG4gICAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IG1hcHBlcih2YWx1ZSwga2V5KTtcbiAgICAgICAgaWYgKG5leHRWYWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIHJlc3VsdFtrZXldID0gbmV4dFZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uL3R5cGluZ3NcIjtcbmltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi9lbnRyaWVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBPYmplY3Q8VCwgUj4oXG4gIG9iajogUmVjb3JkPHN0cmluZywgVD4sXG4gIG1hcHBlcjogKHZhbHVlOiBULCBrZXk6IHN0cmluZykgPT4gUlxuKTogUmVjb3JkPHN0cmluZywgUj4ge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKG9iaikpIHtcbiAgICByZXN1bHRba2V5XSA9IG1hcHBlcih2YWx1ZSwga2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFwT2JqZWN0QXN5bmM8VCwgUj4oXG4gIG9iajogUmVjb3JkPHN0cmluZywgVD4sXG4gIG1hcHBlcjogKHZhbHVlOiBULCBrZXk6IHN0cmluZykgPT4gQXdhaXRhYmxlPFI+XG4pOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIFI+PiB7XG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMob2JqKSkge1xuICAgIHJlc3VsdFtrZXldID0gYXdhaXQgbWFwcGVyKHZhbHVlLCBrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBlbnRyaWVzIH0gZnJvbSBcIi4vZW50cmllc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwT2JqZWN0VG9BcnJheTxUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55PiwgVT4oXG4gIG9iajogVCxcbiAgbWFwcGVyOiAodmFsdWU6IFRba2V5b2YgVF0sIGtleTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiBVIHwgdW5kZWZpbmVkXG4pOiBVW10ge1xuICBsZXQgaW5kZXggPSAwO1xuICBjb25zdCBhcnI6IFVbXSA9IFtdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKG9iaikpIHtcbiAgICBjb25zdCBuZXh0VmFsdWUgPSBtYXBwZXIodmFsdWUsIGtleSwgaW5kZXgrKyk7XG4gICAgaWYgKG5leHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSBhcnIucHVzaChuZXh0VmFsdWUpO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG4iLCJpbXBvcnQgeyBlbnRyaWVzIH0gZnJvbSBcIi4vZW50cmllc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEZXNjcmlwdG9yczxUIGV4dGVuZHMgb2JqZWN0LCBVIGV4dGVuZHMgb2JqZWN0PihcbiAgYmFzZTogVCxcbiAgY2hpbGQ6IFVcbik6IE9taXQ8VCwga2V5b2YgVT4gJiBVIHtcbiAgZm9yIChjb25zdCBba2V5LCBkZXNjXSBvZiBlbnRyaWVzKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGJhc2UpKSkge1xuICAgIGlmICghY2hpbGQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLCBrZXksIGRlc2MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YoY2hpbGQsIGJhc2UpO1xufVxuIiwiaW1wb3J0IHthc3NlcnR9IGZyb20gXCIuLi9hc3NlcnRcIjtcblxuY29uc3QgbWFya1RvRGVsZXRlID0gU3ltYm9sKFwiZGVsZXRlZFwiKTtcblxuXG5jb25zdCBtYXAgPSBuZXcgV2Vha01hcCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gTGF6eTxUIGV4dGVuZHMgKC4uLmFyZ3MpID0+IGFueT4oY2FsbGJhY2s6IFQpOiBUXG5leHBvcnQgZnVuY3Rpb24gTGF6eSgpOiBNZXRob2REZWNvcmF0b3JcbmV4cG9ydCBmdW5jdGlvbiBMYXp5KGNhbGxiYWNrPyk6IGFueSB7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBsYXp5Q2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAodGFyZ2V0LCBwcm9wLCBkZXNjKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlc2MuZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBsYXp5UHJvcGVydHkodGFyZ2V0LCBwcm9wLCBkZXNjKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGVzYy52YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgbGF6eU1ldGhvZCh0YXJnZXQsIHByb3AsIGRlc2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsYXp5Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRoaXM6YW55KSB7XG4gICAgICAgIGlmIChtYXAuaGFzKGNhbGxiYWNrKSlcbiAgICAgICAgICAgIHJldHVybiBtYXAuZ2V0KGNhbGxiYWNrKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBtYXAuc2V0KGNhbGxiYWNrLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxhenlQcm9wZXJ0eSh0YXJnZXQsIHByb3AsIGRlc2MpIHtcblxuICAgIGNvbnN0IG1hcCA9IG5ldyBXZWFrTWFwKClcbiAgICBjb25zdCBnZXR0ZXIgPSBkZXNjLmdldDtcbiAgICBhc3NlcnQoIWRlc2Muc2V0KTtcbiAgICBkZXNjLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAobWFya1RvRGVsZXRlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgbWFwLmRlbGV0ZSh0aGlzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFwLnNldCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVzYy5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChtYXAuaGFzKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFwLmdldCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9IGdldHRlci5hcHBseSh0aGlzKTtcbiAgICAgICAgbWFwLnNldCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gbGF6eU1ldGhvZCh0YXJnZXQsIHByb3AsIGRlc2MpIHtcblxuICAgIGNvbnN0IG1hcCA9IG5ldyBXZWFrTWFwKClcbiAgICBjb25zdCBtZXRob2QgPSBkZXNjLnZhbHVlO1xuICAgIGRlbGV0ZSBkZXNjLnZhbHVlO1xuICAgIGRlc2MuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAobWFwLmhhcyh0aGlzKSlcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiBtYXAuZ2V0KHRoaXMpO1xuXG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBtZXRob2QuYXBwbHkodGhpcywgLi4uYXJncyk7XG4gICAgICAgICAgICBtYXAuc2V0KHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkZXNjLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IG1hcmtUb0RlbGV0ZSkge1xuICAgICAgICAgICAgbWFwLmRlbGV0ZSh0aGlzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBzZXQgbGF6eSBtZXRob2QuYClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5MYXp5LmRlbGV0ZSA9IGZ1bmN0aW9uICh0YXJnZXQsIHByb3A/KSB7XG4gICAgaWYgKHByb3ApIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gbWFya1RvRGVsZXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5kZWxldGUodGFyZ2V0KTtcbiAgICB9XG59XG4iLCJ0eXBlIENhcGl0YWxpemU8VD4gPSBzdHJpbmc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplPFQgZXh0ZW5kcyBzdHJpbmc+KGtleTogVCk6IENhcGl0YWxpemU8VD4ge1xuICByZXR1cm4ga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpO1xufVxuIiwiaW1wb3J0IHtTb3VyY2VDYXNlfSBmcm9tIFwiLi9tYXRjaENhc2VcIjtcbmltcG9ydCB7c3BsaXR9IGZyb20gXCIuL3NwbGl0XCI7XG5cbmV4cG9ydCBjb25zdCBmcm9tQ29uc3RhbnRDYXNlOiBTb3VyY2VDYXNlID0gdGV4dCA9PiBzcGxpdCh0ZXh0LCBcIl9cIik7XG4iLCJpbXBvcnQge1NlcX0gZnJvbSBcImltbXV0YWJsZVwiO1xuaW1wb3J0IHtTb3VyY2VDYXNlfSBmcm9tIFwiLi9tYXRjaENhc2VcIjtcblxuXG5leHBvcnQgY29uc3QgZnJvbVByb3BlcnR5Q2FzZTogU291cmNlQ2FzZSA9IHRleHQgPT5cbiAgICBTZXEuSW5kZXhlZCh0ZXh0Lm1hdGNoQWxsKC9bQS1aXT9bXkEtWl0qL2cpKVxuICAgICAgICAubWFwKChbdGV4dF0pID0+IHRleHQpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGpvaW5UZW1wbGF0ZTxUPihzdHJpbmdzOiBSZWFkb25seUFycmF5PHN0cmluZz4sIGFyZ3M6IFRbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IChhcmc6IFQpID0+IHN0cmluZykge1xuICAgIGxldCB0ZXh0ID0gJyc7XG4gICAgZm9yIChsZXQgW2luZGV4LCBzdHJpbmddIG9mIHN0cmluZ3MuZW50cmllcygpKSB7XG4gICAgICAgIHRleHQgKz0gc3RyaW5nO1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBpbmRleCkge1xuICAgICAgICAgICAgdGV4dCArPSBjYWxsYmFjayhhcmdzW2luZGV4XSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBqb2luVXJsKHVybDogc3RyaW5nLCAuLi5hcmdzOiAoc3RyaW5nIHwgdW5kZWZpbmVkKVtdKTogc3RyaW5nIHtcbiAgICBmb3IgKGNvbnN0IGFyZyBvZiBhcmdzKSB7XG4gICAgICAgIGlmICghYXJnKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC8rJC9nLCAnJylcbiAgICAgICAgICAgICsgJy8nXG4gICAgICAgICAgICArIGFyZy5yZXBsYWNlKC9eXFwvKy9nLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG59XG4iLCJpbXBvcnQge1NlcX0gZnJvbSBcImltbXV0YWJsZVwiO1xuXG5leHBvcnQgdHlwZSBUYXJnZXRDYXNlID0gKHdvcmRzOiBTZXEuSW5kZXhlZDxzdHJpbmc+KSA9PiBzdHJpbmc7XG5leHBvcnQgdHlwZSBTb3VyY2VDYXNlID0gKHRleHQ6IHN0cmluZykgPT4gU2VxLkluZGV4ZWQ8c3RyaW5nPjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoQ2FzZShcbiAgICB0ZXh0OiBzdHJpbmcsXG4gICAgc291cmNlOiBTb3VyY2VDYXNlLFxuICAgIHRhcmdldDogVGFyZ2V0Q2FzZVxuKSB7XG4gICAgcmV0dXJuIHRhcmdldChzb3VyY2UodGV4dCkpXG59XG4iLCJpbXBvcnQge1NlcX0gZnJvbSBcImltbXV0YWJsZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24qIF9zcGxpdCh0ZXh0OiBzdHJpbmcsIHNlcDogc3RyaW5nKTogSXRlcmFibGVJdGVyYXRvcjxzdHJpbmc+IHtcbiAgICBsZXQgc3RhcnQgPSAwO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHRleHQuaW5kZXhPZihzZXAsIHN0YXJ0KTtcbiAgICAgICAgaWYgKC0xID09PSBwb3MpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHlpZWxkIHRleHQuc2xpY2Uoc3RhcnQsIHBvcyk7XG4gICAgICAgIHN0YXJ0ID0gcG9zICsgc2VwLmxlbmd0aDtcbiAgICB9XG4gICAgeWllbGQgc3RhcnQgPyB0ZXh0LnNsaWNlKHN0YXJ0KSA6IHRleHQ7XG5cbn1cblxuZXhwb3J0IGNvbnN0IHNwbGl0ID0gKHRleHQ6IHN0cmluZywgc2VwOiBzdHJpbmcpID0+IFNlcS5JbmRleGVkKF9zcGxpdCh0ZXh0LCBzZXApKVxuXG5cbiIsImltcG9ydCB7VGFyZ2V0Q2FzZX0gZnJvbSBcIi4vbWF0Y2hDYXNlXCI7XG5cblxuZXhwb3J0IGNvbnN0IHRvQ29uc3RhbnRDYXNlOiBUYXJnZXRDYXNlID0gd29yZHMgPT4gd29yZHMuam9pbignXycpLnRvVXBwZXJDYXNlKClcbiIsImltcG9ydCB7VGFyZ2V0Q2FzZX0gZnJvbSBcIi4vbWF0Y2hDYXNlXCI7XG5cbmV4cG9ydCBjb25zdCB0b1RpdGxlQ2FzZTogVGFyZ2V0Q2FzZSA9IHdvcmRzID0+IHdvcmRzXG4gICAgLm1hcCh0ZXh0ID0+IHRleHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkpXG4gICAgLmpvaW4oXCIgXCIpO1xuXG4iLCJleHBvcnQgdHlwZSBVbmlvbjxUPiA9IFRba2V5b2YgVF07XG5cbmV4cG9ydCB0eXBlIEV4cE1hcDxUPiA9IFVuaW9uPFxuICB7XG4gICAgW0sgaW4ga2V5b2YgVF06IFJlY29yZDxLLCBUW0tdPjtcbiAgfVxuPjtcbmV4cG9ydCB0eXBlIE51bGxhYmxlID0gdW5kZWZpbmVkIHwgbnVsbDtcblxuZXhwb3J0IHR5cGUgQXdhaXRhYmxlPFQgPSBhbnk+ID0gUHJvbWlzZTxUPiB8IFQ7XG5cbmV4cG9ydCB0eXBlIEZuID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbmV4cG9ydCB0eXBlIFByb21pc2VUeXBlPFQgZXh0ZW5kcyBQcm9taXNlPGFueT4+ID0gVCBleHRlbmRzIFByb21pc2U8aW5mZXIgVT5cbiAgPyBVXG4gIDogbmV2ZXI7XG5cbmV4cG9ydCB0eXBlIEF3YWl0ZWQ8VCBleHRlbmRzIEF3YWl0YWJsZT4gPSBUIGV4dGVuZHMgQXdhaXRhYmxlPGluZmVyIFU+XG4gID8gVVxuICA6IG5ldmVyO1xuXG5leHBvcnQgdHlwZSBFeHRyYWN0S2V5czxULCBWPiA9IEV4Y2x1ZGU8XG4gIFVuaW9uPFxuICAgIHtcbiAgICAgIFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgViA/IEsgOiBuZXZlcjtcbiAgICB9XG4gID4sXG4gIG5ldmVyXG4+O1xuXG5leHBvcnQgdHlwZSBFeGNsdWRlS2V5czxULCBWPiA9IEV4Y2x1ZGU8XG4gIFVuaW9uPFxuICAgIHtcbiAgICAgIFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgViA/IG5ldmVyIDogSztcbiAgICB9XG4gID4sXG4gIG5ldmVyXG4+O1xuXG5leHBvcnQgdHlwZSBQaWNrQnlWYWx1ZTxULCBWPiA9IFBpY2s8VCwgRXh0cmFjdEtleXM8VCwgVj4+O1xuZXhwb3J0IHR5cGUgT21pdEJ5VmFsdWU8VCwgVj4gPSBPbWl0PFQsIEV4dHJhY3RLZXlzPFQsIFY+PjtcblxuZXhwb3J0IHR5cGUgUGx1Y2tSZXF1aXJlZDxULCBLIGV4dGVuZHMgUHJvcGVydHlLZXksIEUgPSBuZXZlcj4gPSBJc05ldmVyPFxuICBUXG4+IGV4dGVuZHMgdHJ1ZVxuICA/IEVcbiAgOiBSZXF1aXJlZDxUPiBleHRlbmRzIFJlY29yZDxLLCBpbmZlciBVPlxuICA/IFVcbiAgOiBFO1xuXG5leHBvcnQgdHlwZSBBdDxULCBLIGV4dGVuZHMgUHJvcGVydHlLZXk+ID0gSyBleHRlbmRzIGtleW9mIFJlcXVpcmVkPFQ+XG4gID8gVFtLXVxuICA6IG5ldmVyO1xuXG5leHBvcnQgdHlwZSBQYXJ0aWFsS2V5czxULCBLIGV4dGVuZHMga2V5b2YgVD4gPSBPbWl0PFQsIEs+ICZcbiAgUGFydGlhbDxQaWNrPFQsIEs+PjtcblxuZXhwb3J0IGZ1bmN0aW9uIE51bGxhYmxlPFQ+KHZhbHVlPzogVCk6IFQgfCBOdWxsYWJsZSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IHR5cGUgVHlwZTxUPiA9IEZ1bmN0aW9uICYgeyBwcm90b3R5cGU6IFQgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIFR5cGluZzxUPigpOiBUIHtcbiAgcmV0dXJuIDxhbnk+KCgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgfSk7XG59XG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBUeXBlUmVmcyB7fVxufVxuZXhwb3J0IGZ1bmN0aW9uIFR5cGVSZWY8SyBleHRlbmRzIFByb3BlcnR5S2V5PihcbiAgY2I6ICgpID0+IEtcbik6IEsgZXh0ZW5kcyBrZXlvZiBUeXBlUmVmcyA/IFR5cGVSZWZzW0tdIDogbmV2ZXIge1xuICByZXR1cm4gPGFueT4oKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBUeXBlPFQgPSBhbnk+KHRoaXM6IGFueSk6IFR5cGU8VD4ge1xuICBpZiAodGhpcyBpbnN0YW5jZW9mIFR5cGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgfVxuICByZXR1cm4gVHlwZTtcbn1cblxuZXhwb3J0IHR5cGUgUGF5bG9hZDxcbiAgVCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIG9iamVjdD4sXG4gIFUgZXh0ZW5kcyBvYmplY3QgPSB7fVxuPiA9IFVuaW9uPHsgW0sgaW4ga2V5b2YgVF06IHsgdHlwZTogSyB9ICYgVFtLXSAmIFUgfT47XG5cbmV4cG9ydCB0eXBlIEFzc2lnbjxULCBVPiA9IE9taXQ8VCwga2V5b2YgUmVxdWlyZWQ8VT4+ICYgVTtcbmV4cG9ydCB0eXBlIE92ZXJyaWRlPFQgZXh0ZW5kcyBvYmplY3QsIFUgZXh0ZW5kcyBvYmplY3Q+ID0gT21pdDxULCBrZXlvZiBVPiAmIFU7XG5leHBvcnQgdHlwZSBSZXBsYWNlPFQgZXh0ZW5kcyBvYmplY3QsIFUgZXh0ZW5kcyBQYXJ0aWFsPFQ+PiA9IEV4dHJhY3Q8XG4gIE92ZXJyaWRlPFQsIFU+LFxuICBUXG4+O1xuZXhwb3J0IHR5cGUgQXNzaWduS2V5czxULCBVPiA9IEhhc0tleXM8VD4gZXh0ZW5kcyBmYWxzZVxuICA/IFVcbiAgOiBIYXNLZXlzPFU+IGV4dGVuZHMgZmFsc2VcbiAgPyBUXG4gIDogQXNzaWduPFQsIFU+O1xuXG5leHBvcnQgdHlwZSBBcnJheVR5cGVPck9iamVjdDxUPiA9IFQgZXh0ZW5kcyBBcnJheTxpbmZlciBVPlxuICA/IFVcbiAgOiBFeHRyYWN0PFQsIG9iamVjdD47XG5cbmV4cG9ydCB0eXBlIE9wdGlvbmFsQXJnPFQ+ID0gSXNOZXZlcjxUPiBleHRlbmRzIHRydWUgPyBbXSA6IFtUXTtcblxuZXhwb3J0IHR5cGUgTmV2ZXJLZXlzPFQ+ID0gVW5pb248XG4gIHtcbiAgICBbSyBpbiBrZXlvZiBUXTogSXNOZXZlcjxUW0tdPiBleHRlbmRzIHRydWUgPyBLIDogbmV2ZXI7XG4gIH1cbj47XG5cbmV4cG9ydCB0eXBlIE9taXROZXZlcktleXM8VD4gPSBPbWl0PFQsIE5ldmVyS2V5czxUPj47XG5cbmV4cG9ydCB0eXBlIE9wdGlvbmFsT2JqZWN0QXJnPFQ+ID0gSXNOZXZlcjxVbmlvbjxUPj4gZXh0ZW5kcyB0cnVlXG4gID8gW11cbiAgOiBbT21pdDxULCBOZXZlcktleXM8VD4+XTtcblxuZXhwb3J0IHR5cGUgRGVmYXVsdElmTmV2ZXI8VCwgVT4gPSBJc05ldmVyPFQ+IGV4dGVuZHMgdHJ1ZSA/IFUgOiBUO1xuXG5leHBvcnQgdHlwZSBJZk5ldmVyPFQsIFUsIEUgPSBuZXZlcj4gPSBJc05ldmVyPFQ+IGV4dGVuZHMgdHJ1ZSA/IFUgOiBFO1xuXG5leHBvcnQgdHlwZSBDb21tb248TCwgUj4gPSBPbWl0QnlWYWx1ZTxcbiAge1xuICAgIFtLIGluIGtleW9mIChMICYgUildOiBLIGV4dGVuZHMga2V5b2YgTFxuICAgICAgPyBLIGV4dGVuZHMga2V5b2YgUlxuICAgICAgICA/IEV4dHJhY3Q8TFtLXSwgUltLXT5cbiAgICAgICAgOiBuZXZlclxuICAgICAgOiBuZXZlcjtcbiAgfSxcbiAgbmV2ZXJcbj47XG5cbmV4cG9ydCB0eXBlIFJlcXVpcmVkS2V5czxUPiA9IFVuaW9uPFxuICB7XG4gICAgW0sgaW4ga2V5b2YgVF06IFQgZXh0ZW5kcyBSZWNvcmQ8SywgYW55PiA/IEsgOiBuZXZlcjtcbiAgfVxuPjtcblxuZXhwb3J0IHR5cGUgT3B0aW9uYWxLZXlzPFQ+ID0gVW5pb248XG4gIHtcbiAgICBbSyBpbiBrZXlvZiBUXTogVCBleHRlbmRzIFJlY29yZDxLLCBhbnk+ID8gbmV2ZXIgOiBLO1xuICB9XG4+O1xuXG5leHBvcnQgdHlwZSBPcHRpb25hbE9ubHk8VCwgSyBleHRlbmRzIGtleW9mIFQgPSBuZXZlcj4gPSBPbWl0PFxuICBULFxuICBFeGNsdWRlPFJlcXVpcmVkS2V5czxUPiwgSz5cbj47XG5cbmV4cG9ydCB0eXBlIFJlcXVpcmVkT25seTxUPiA9IFBpY2s8VCwgUmVxdWlyZWRLZXlzPFQ+PjtcblxuZXhwb3J0IHR5cGUgT3B0aW9uYWw8VD4gPSBQaWNrPFQsIE9wdGlvbmFsS2V5czxUPj47XG5cbmV4cG9ydCB0eXBlIElzTmV2ZXI8VD4gPSBbVF0gZXh0ZW5kcyBbbmV2ZXJdID8gdHJ1ZSA6IGZhbHNlO1xuZXhwb3J0IHR5cGUgSXM8VCwgVT4gPSBbVF0gZXh0ZW5kcyBbVV0gPyB0cnVlIDogZmFsc2U7XG5leHBvcnQgdHlwZSBFeHBlY3Q8VCwgVSBleHRlbmRzIFQ+ID0gVTtcbmV4cG9ydCB0eXBlIElzRW1wdHlPYmplY3Q8VD4gPSBJczx7fSwgVD47XG5cbmV4cG9ydCB0eXBlIEFuZDxUIGV4dGVuZHMgYm9vbGVhbiwgVSBleHRlbmRzIGJvb2xlYW4+ID0gVCBleHRlbmRzIHRydWVcbiAgPyBVIGV4dGVuZHMgdHJ1ZVxuICAgID8gdHJ1ZVxuICAgIDogZmFsc2VcbiAgOiBmYWxzZTtcblxuZXhwb3J0IHR5cGUgT3I8VCBleHRlbmRzIGJvb2xlYW4sIFUgZXh0ZW5kcyBib29sZWFuPiA9IFQgZXh0ZW5kcyB0cnVlXG4gID8gdHJ1ZVxuICA6IFUgZXh0ZW5kcyB0cnVlXG4gID8gdHJ1ZVxuICA6IGZhbHNlO1xuXG5leHBvcnQgdHlwZSBJc1NvbWU8VCwgVT4gPSBBbmQ8SXM8VCwgVT4sIElzPFUsIFQ+PjtcbmV4cG9ydCB0eXBlIElzTm90PFQsIFU+ID0gVCBleHRlbmRzIFUgPyBmYWxzZSA6IHRydWU7XG5cbmV4cG9ydCB0eXBlIElzQW55PFQ+ID0gMCBleHRlbmRzIDEgJiBUID8gdHJ1ZSA6IGZhbHNlO1xuXG5leHBvcnQgdHlwZSBJc0V4dGVuZDxULCBVPiA9IFQgZXh0ZW5kcyBVID8gdHJ1ZSA6IGZhbHNlO1xuXG5leHBvcnQgdHlwZSBJc051bGw8VD4gPSBUIGV4dGVuZHMgdW5kZWZpbmVkIHwgbnVsbCA/IHRydWUgOiBmYWxzZTtcblxuZXhwb3J0IHR5cGUgSGFzS2V5czxUPiA9IElzTmV2ZXI8VD4gZXh0ZW5kcyB0cnVlXG4gID8gZmFsc2VcbiAgOiBOb3Q8SXNOZXZlcjxrZXlvZiBUPj47XG5cbmV4cG9ydCB0eXBlIE5vdDxUIGV4dGVuZHMgYm9vbGVhbj4gPSBUIGV4dGVuZHMgdHJ1ZSA/IGZhbHNlIDogdHJ1ZTtcblxuZXhwb3J0IHR5cGUgSWY8QyBleHRlbmRzIGJvb2xlYW4sIFQsIEUgPSBuZXZlcj4gPSBDIGV4dGVuZHMgdHJ1ZSA/IFQgOiBFO1xuZXhwb3J0IHR5cGUgSWZOb3Q8QyBleHRlbmRzIGJvb2xlYW4sIFQsIEUgPSBuZXZlcj4gPSBJZjxDLCBFLCBUPjtcblxuZXhwb3J0IHR5cGUgQ29uc3RydWN0b3I8VD4gPSB7IG5ldyAoLi4uYXJnczogYW55W10pOiBUIH07XG5cbmV4cG9ydCB0eXBlIE1lcmdlPEwsIFIsIE0+ID0gSGFzS2V5czxMPiBleHRlbmRzIGZhbHNlXG4gID8gUlxuICA6IEhhc0tleXM8Uj4gZXh0ZW5kcyBmYWxzZVxuICA/IExcbiAgOiBBc3NpZ25LZXlzPEwsIE0+O1xuXG5leHBvcnQgdHlwZSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxULCBVID0ge30+ID1cbiAgfCAoVSAmIFQpXG4gIHwgKFUgJlxuICAgICAgUGFydGlhbEtleXM8XG4gICAgICAgIFQsXG4gICAgICAgIFVuaW9uPFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFtLIGluIGtleW9mIFJlcXVpcmVkPFQ+XTogT3I8XG4gICAgICAgICAgICAgIElzTmV2ZXI8VFtLXT4sXG4gICAgICAgICAgICAgIElzQW55PFRbS10+XG4gICAgICAgICAgICA+IGV4dGVuZHMgdHJ1ZVxuICAgICAgICAgICAgICA/IG5ldmVyXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkIGV4dGVuZHMgVFtLXVxuICAgICAgICAgICAgICA/IEtcbiAgICAgICAgICAgICAgOiBuZXZlcjtcbiAgICAgICAgICB9XG4gICAgICAgID5cbiAgICAgID4pO1xuXG5leHBvcnQgdHlwZSBVbmRlZmluZWRJZkVtcHR5T2JqZWN0PFQ+ID0gSWY8SXNFbXB0eU9iamVjdDxUPiwgdW5kZWZpbmVkPiB8IFQ7XG5cbmV4cG9ydCB0eXBlIFJlcXVpcmVPcHRpb25hbEtleXM8VD4gPSB7XG4gIFtLIGluIGtleW9mIFJlcXVpcmVkPFQ+XTogVFtLXTtcbn07XG5cbmV4cG9ydCB0eXBlIElmTnVsbDxULCBVPiA9IFQgZXh0ZW5kcyBudWxsID8gVSA6IG5ldmVyO1xuXG5leHBvcnQgdHlwZSBBc3luY0ZuPFQgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IGFueT4gPSAoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD5cbikgPT4gUHJvbWlzZTxSZXR1cm5UeXBlPFQ+PjtcblxuZXhwb3J0IHR5cGUgU3luY0ZuPFQgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IGFueT4gPSAoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD5cbikgPT4gQXdhaXRlZDxSZXR1cm5UeXBlPFQ+PjtcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgVHlwZVJlZnMge31cbn1cblxuZXhwb3J0IHR5cGUgVHlwZVJlZjxLIGV4dGVuZHMgUHJvcGVydHlLZXk+ID0gSyBleHRlbmRzIGtleW9mIFR5cGVSZWZzXG4gID8gVHlwZVJlZnNbS11cbiAgOiBuZXZlcjtcblxuZXhwb3J0IHR5cGUgTm9uTnVsbGFibGVBdDxcbiAgVCxcbiAgSyBleHRlbmRzIGtleW9mIFJlcXVpcmVkPFQ+LFxuICBEID0gbmV2ZXIsXG4gIFYgPSBOb25OdWxsYWJsZTxUW0tdPlxuPiA9IElzTmV2ZXI8Vj4gZXh0ZW5kcyB0cnVlID8gRCA6IFY7XG5cbmV4cG9ydCB0eXBlIE9taXRLZXlzPFQsIEsgZXh0ZW5kcyBrZXlvZiBUPiA9IE9taXQ8VCwgSz47XG5cbmV4cG9ydCB0eXBlIFVuZGVmaW5lZElmSXNVbmRlZmluZWQ8VD4gPSBJZjxJc1VuZGVmaW5lZDxUPiwgdW5kZWZpbmVkPjtcblxuZXhwb3J0IHR5cGUgSXNVbmRlZmluZWQ8VD4gPSB1bmRlZmluZWQgZXh0ZW5kcyBUID8gdHJ1ZSA6IGZhbHNlO1xuXG5leHBvcnQgdHlwZSBEZWZpbmVkPFQ+ID0gVCBleHRlbmRzIHVuZGVmaW5lZCA/IG5ldmVyIDogVDtcblxuZXhwb3J0IHR5cGUgT21pdFJlcXVpcmVkS2V5czxUIGV4dGVuZHMgVSwgVT4gPSBPbWl0PFQsIGtleW9mIFJlcXVpcmVkPFU+PjtcbmV4cG9ydCB0eXBlIEtleU1hcDxUPiA9IFJlY29yZDxzdHJpbmcsIFQ+O1xuIiwiZXhwb3J0IHtcbiAgICBTZXQgYXMgSW1tdXRhYmxlU2V0LFxuICAgIFJlY29yZCBhcyBJbW11dGFibGVSZWNvcmQsXG4gICAgTWFwIGFzIEltbXV0YWJsZU1hcCxcbiAgICBMaXN0IGFzIEltbXV0YWJsZUxpc3QsXG5cbn0gZnJvbSBcImltbXV0YWJsZVwiO1xuXG5pbXBvcnQgKiBhcyBJbW11dGFibGUgZnJvbSBcImltbXV0YWJsZVwiO1xuaW1wb3J0IHtTZXF9IGZyb20gXCJpbW11dGFibGVcIjtcblxuZXhwb3J0IHR5cGUgSW1tdXRhYmxlS2V5cyA9IEltbXV0YWJsZS5TZXQ8c3RyaW5nPjtcbmV4cG9ydCBjb25zdCBJbW11dGFibGVLZXlzID0gSW1tdXRhYmxlLlNldDxzdHJpbmc+KCk7XG5cbmV4cG9ydCB0eXBlIEluZGV4ZWRTZXE8VD4gPSBTZXEuSW5kZXhlZDxUPjtcbmV4cG9ydCBjb25zdCBJbmRleGVkU2VxID0gU2VxLkluZGV4ZWQ7XG4iLCJpbXBvcnQge2NyZWF0ZUVsZW1lbnQsIFJlYWN0RWxlbWVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge0xhbmdUZW1wbGF0ZSwgTGFuZ1RlbXBsYXRlUHJvcHN9IGZyb20gXCIuL0xhbmdUZW1wbGF0ZVwiO1xuaW1wb3J0IHtMYW5nVmlld30gZnJvbSBcIi4vTGFuZ1ZpZXdcIjtcblxuZXhwb3J0IHR5cGUgTGFuZ1Rva2VuRWxlbWVudCA9IFJlYWN0RWxlbWVudDxMYW5nVG9rZW5Qcm9wcz47XG5cbmV4cG9ydCB0eXBlIExhbmdUb2tlblByb3BzID0ge1xuICAgIHR5cGU6IExhbmdQcm9wc1R5cGUudG9rZW4sXG4gICAgdG9rZW46IHN0cmluZ1xufTtcblxuZXhwb3J0IHR5cGUgTGFuZyA9IExhbmdUZW1wbGF0ZTxhbnk+IHwgUmVhY3RFbGVtZW50PExhbmdUb2tlblByb3BzPjtcblxuZXhwb3J0IHR5cGUgTGFuZ0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQ8TGFuZ1Byb3BzPjtcblxuZXhwb3J0IHR5cGUgTGFuZ05vZGUgPSBudW1iZXIgfCBzdHJpbmcgfCBMYW5nRWxlbWVudCB8IExhbmdOb2RlW10gfCB1bmRlZmluZWQ7XG5cbmV4cG9ydCBlbnVtIExhbmdQcm9wc1R5cGUge1xuICAgIHRva2VuLFxuICAgIHRlbXBsYXRlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMYW5nKHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5KTogUmVhY3RFbGVtZW50PExhbmdUb2tlblByb3BzPlxuZXhwb3J0IGZ1bmN0aW9uIExhbmc8UCBleHRlbmRzIHN0cmluZywgSyBleHRlbmRzIHN0cmluZz4oXG4gICAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXksXG4gICAgcGFyYW06IFAsXG4gICAgLi4ucGFyYW1zOiBLW10pOiBMYW5nVGVtcGxhdGU8UCB8IEs+XG5leHBvcnQgZnVuY3Rpb24gTGFuZyhzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4ucGFyYW1zKTogYW55IHtcbiAgICBpZiAoc3RyaW5ncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoTGFuZ1ZpZXcsIHtcbiAgICAgICAgICAgIHR5cGU6IExhbmdQcm9wc1R5cGUudG9rZW4sXG4gICAgICAgICAgICB0b2tlbjogc3RyaW5nc1swXVxuICAgICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gTGFuZ1RlbXBsYXRlKHN0cmluZ3MucmF3LCBwYXJhbXMpXG59XG5cblxuZXhwb3J0IHR5cGUgTGFuZ1Byb3BzID0gTGFuZ1RlbXBsYXRlUHJvcHM8YW55PiB8IExhbmdUb2tlblByb3BzO1xuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50LCBSZWFjdE5vZGUsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZyb21Qcm9wZXJ0eUNhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy9mcm9tUHJvcGVydHlDYXNlXCI7XG5pbXBvcnQgeyBtYXRjaENhc2UsIFNvdXJjZUNhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy9tYXRjaENhc2VcIjtcbmltcG9ydCB7IHRvQ29uc3RhbnRDYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9zdHJpbmcvdG9Db25zdGFudENhc2VcIjtcbmltcG9ydCB7IExhbmdQcm9wc1R5cGUgfSBmcm9tIFwiLi9MYW5nXCI7XG5pbXBvcnQgeyBMYW5nVmlldyB9IGZyb20gXCIuL0xhbmdWaWV3XCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBMYW5nS2V5KHByb3BzOiB7XG4gIGZvcjogc3RyaW5nO1xuICBjaGlsZHJlbjogUmVhY3ROb2RlO1xuICBzb3VyY2VDYXNlPzogU291cmNlQ2FzZTtcbn0pOiBSZWFjdEVsZW1lbnQge1xuICByZXR1cm4gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKHByb3BzLmNoaWxkcmVuICE9IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIDw+e3Byb3BzLmNoaWxkcmVufTwvPjtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPExhbmdWaWV3XG4gICAgICAgIHR5cGU9e0xhbmdQcm9wc1R5cGUudG9rZW59XG4gICAgICAgIHRva2VuPXttYXRjaENhc2UoXG4gICAgICAgICAgcHJvcHMuZm9yLFxuICAgICAgICAgIHByb3BzLnNvdXJjZUNhc2UgfHwgZnJvbVByb3BlcnR5Q2FzZSxcbiAgICAgICAgICB0b0NvbnN0YW50Q2FzZVxuICAgICAgICApfVxuICAgICAgLz5cbiAgICApO1xuICB9LCBbcHJvcHMuY2hpbGRyZW4sIHByb3BzLmZvcl0pO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBkZWZpbmVkQXQgfSBmcm9tIFwiLi4vY29tbW9uL29iamVjdC9kZWZpbmVkQXRcIjtcbmltcG9ydCB7IGpvaW5UZW1wbGF0ZSB9IGZyb20gXCIuLi9jb21tb24vc3RyaW5nL2pvaW5UZW1wbGF0ZVwiO1xuaW1wb3J0IHsgTGFuZ0VsZW1lbnQsIExhbmdOb2RlLCBMYW5nUHJvcHNUeXBlLCBMYW5nVG9rZW5FbGVtZW50IH0gZnJvbSBcIi4vTGFuZ1wiO1xuaW1wb3J0IHsgTGFuZ1ZpZXcgfSBmcm9tIFwiLi9MYW5nVmlld1wiO1xuXG5leHBvcnQgdHlwZSBMYW5nVGVtcGxhdGU8SyBleHRlbmRzIHN0cmluZz4gPSB7XG4gIHRva2VuOiBzdHJpbmc7XG5cbiAgLy8gZm9ybWF0dGVyXG4gIChwcm9wczogUmVjb3JkPEssIExhbmdOb2RlPik6IExhbmdUZW1wbGF0ZUVsZW1lbnQ8Sz47XG5cbiAgLy8gcHJvdmlkZXJcbiAgKHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5rZXlzOiBLW10pOiBMYW5nVGVtcGxhdGVFbnRyeTxLPjtcbn07XG5cbmV4cG9ydCB0eXBlIExhbmdUZW1wbGF0ZUZvcm1hdHRlcjxLIGV4dGVuZHMgc3RyaW5nPiA9IChcbiAgcHJvcHM6IFJlY29yZDxLLCBhbnk+XG4pID0+IHN0cmluZztcblxuZXhwb3J0IHR5cGUgTGFuZ1RlbXBsYXRlRW50cnk8SyBleHRlbmRzIHN0cmluZz4gPSBbXG4gIHN0cmluZyxcbiAgTGFuZ1RlbXBsYXRlRm9ybWF0dGVyPEs+XG5dO1xuXG5leHBvcnQgdHlwZSBMYW5nVGVtcGxhdGVQcm9wczxLIGV4dGVuZHMgc3RyaW5nPiA9IHtcbiAgdHlwZTogTGFuZ1Byb3BzVHlwZS50ZW1wbGF0ZTtcbiAgdG9rZW46IHN0cmluZztcbiAgcHJvcHM6IFJlY29yZDxcbiAgICBLLFxuICAgIExhbmdUZW1wbGF0ZUVsZW1lbnQ8YW55PiB8IExhbmdUb2tlbkVsZW1lbnQgfCBzdHJpbmcgfCBudW1iZXJcbiAgPjtcbiAgcGFyYW1zOiBLW107XG4gIHN0cmluZ3M6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbn07XG5cbmV4cG9ydCB0eXBlIExhbmdUZW1wbGF0ZUVsZW1lbnQ8SyBleHRlbmRzIHN0cmluZz4gPSBSZWFjdEVsZW1lbnQ8XG4gIExhbmdUZW1wbGF0ZVByb3BzPEs+XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gTGFuZ1RlbXBsYXRlPEsgZXh0ZW5kcyBzdHJpbmc+KFxuICBzdHJpbmdzOiBSZWFkb25seUFycmF5PHN0cmluZz4sXG4gIHBhcmFtczogS1tdXG4pOiBMYW5nVGVtcGxhdGU8Sz4ge1xuICBjb25zdCB0b2tlbiA9IGpvaW5UZW1wbGF0ZShzdHJpbmdzLCBwYXJhbXMsIHBhcmFtID0+IGB7JHtwYXJhbX19YCk7XG5cbiAgdGVtcGxhdGUudG9rZW4gPSB0b2tlbjtcbiAgcmV0dXJuIDxhbnk+dGVtcGxhdGU7XG5cbiAgZnVuY3Rpb24gdGVtcGxhdGUoYXJnMCwgLi4uYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCAmJiB0eXBlb2YgYXJnMCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoTGFuZ1ZpZXcsIHtcbiAgICAgICAgdHlwZTogTGFuZ1Byb3BzVHlwZS50ZW1wbGF0ZSxcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIHByb3BzOiBhcmcwLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHN0cmluZ3MsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGVtcGxhdGVgLi4uYFxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIHByb3BzID0+XG4gICAgICAgICAgam9pblRlbXBsYXRlKDxzdHJpbmdbXT5hcmcwLCBhcmdzLCBhcmcgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmluZWRBdChwcm9wcywgYXJnKTtcbiAgICAgICAgICB9KSxcbiAgICAgIF07XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge2NyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHR9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHttYXBPYmplY3R9IGZyb20gXCIuLi9jb21tb24vb2JqZWN0L21hcE9iamVjdFwiO1xuaW1wb3J0IHtmcm9tQ29uc3RhbnRDYXNlfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy9mcm9tQ29uc3RhbnRDYXNlXCI7XG5pbXBvcnQge2pvaW5UZW1wbGF0ZX0gZnJvbSBcIi4uL2NvbW1vbi9zdHJpbmcvam9pblRlbXBsYXRlXCI7XG5pbXBvcnQge21hdGNoQ2FzZX0gZnJvbSBcIi4uL2NvbW1vbi9zdHJpbmcvbWF0Y2hDYXNlXCI7XG5pbXBvcnQge3RvVGl0bGVDYXNlfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy90b1RpdGxlQ2FzZVwiO1xuaW1wb3J0IHtMYW5nTm9kZSwgTGFuZ1Byb3BzLCBMYW5nUHJvcHNUeXBlLCBMYW5nVG9rZW5Qcm9wc30gZnJvbSBcIi4vTGFuZ1wiO1xuaW1wb3J0IHtMYW5nTWFwfSBmcm9tIFwiLi9MYW5nTWFwXCI7XG5pbXBvcnQge0xhbmdUZW1wbGF0ZVByb3BzfSBmcm9tIFwiLi9MYW5nVGVtcGxhdGVcIjtcblxuXG5leHBvcnQgY2xhc3MgTGFuZ1RyYW5zbGF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtYXA6IExhbmdNYXApIHtcbiAgICB9XG5cblxuICAgIHRyYW5zbGF0ZU5vZGUobm9kZTogTGFuZ05vZGUpOnN0cmluZ3x1bmRlZmluZWQge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBub2RlKSB7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhub2RlKTtcbiAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5tYXAobm9kZSA9PiB0aGlzLnRyYW5zbGF0ZU5vZGUobm9kZSkpLmpvaW4oJycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVByb3BzKG5vZGUucHJvcHMpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVQcm9wcyhwcm9wczogTGFuZ1Byb3BzKSB7XG4gICAgICAgIHN3aXRjaCAocHJvcHMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBMYW5nUHJvcHNUeXBlLnRlbXBsYXRlOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVRlbXBsYXRlKHByb3BzKTtcbiAgICAgICAgICAgIGNhc2UgTGFuZ1Byb3BzVHlwZS50b2tlbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVUb2tlbihwcm9wcy50b2tlbik7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlRGVmYXVsdFRva2VuKHRva2VuOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwW3Rva2VuXSA9IG1hdGNoQ2FzZSh0b2tlbiwgZnJvbUNvbnN0YW50Q2FzZSwgdG9UaXRsZUNhc2UpO1xuICAgIH1cblxuICAgIHRyYW5zbGF0ZVRva2VuKHRva2VuOnN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5tYXBbdG9rZW5dO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwW3Rva2VuXSA9IHZhbHVlKHt9KTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlRGVmYXVsdFRva2VuKHRva2VuKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm90IHN1cHBvcnQgJHt0eXBlb2YgdmFsdWV9YClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZVRlbXBsYXRlKHRlbXBsYXRlOiBMYW5nVGVtcGxhdGVQcm9wczxhbnk+KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLm1hcFt0ZW1wbGF0ZS50b2tlbl07XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUobWFwT2JqZWN0KHRlbXBsYXRlLnByb3BzLCBub2RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVQcm9wcyhub2RlLnByb3BzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKG5vZGUpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoQ2FzZShcbiAgICAgICAgICAgICAgICAgICAgam9pblRlbXBsYXRlKHRlbXBsYXRlLnN0cmluZ3MsIHRlbXBsYXRlLnBhcmFtcywgcGFyYW0gPT4gU3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZU5vZGUoIHRlbXBsYXRlLnByb3BzW3BhcmFtXSlcbiAgICAgICAgICAgICAgICAgICAgKSksXG4gICAgICAgICAgICAgICAgICAgIGZyb21Db25zdGFudENhc2UsXG4gICAgICAgICAgICAgICAgICAgIHRvVGl0bGVDYXNlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQ2FuJ3QgdHJhbnNsYXRlICR7dHlwZW9mIHZhbHVlfS5gKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBMYW5nVHJhbnNsYXRvckNvbnRleHQgPSBjcmVhdGVDb250ZXh0KG5ldyBMYW5nVHJhbnNsYXRvcih7fSkpO1xuZXhwb3J0IGNvbnN0IHVzZUxhbmdUcmFuc2xhdG9yID0gKCkgPT4gdXNlQ29udGV4dChMYW5nVHJhbnNsYXRvckNvbnRleHQpO1xuXG4iLCJpbXBvcnQge2NyZWF0ZUVsZW1lbnQsIEZyYWdtZW50LCB1c2VDb250ZXh0fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7TGFuZ1Byb3BzfSBmcm9tIFwiLi9MYW5nXCI7XG5pbXBvcnQge0xhbmdUcmFuc2xhdG9yQ29udGV4dH0gZnJvbSBcIi4vTGFuZ1RyYW5zbGF0b3JcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIExhbmdWaWV3KHByb3BzOiBMYW5nUHJvcHMpIHtcbiAgICBjb25zdCB0cmFuc2xhdG9yID0gdXNlQ29udGV4dChMYW5nVHJhbnNsYXRvckNvbnRleHQpO1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KEZyYWdtZW50LCBudWxsLFxuICAgICAgICB0cmFuc2xhdG9yLnRyYW5zbGF0ZVByb3BzKHByb3BzKSlcbn1cblxuIiwiaW1wb3J0IHsgbWFwT2JqZWN0VG9BcnJheSB9IGZyb20gXCIuLi9jb21tb24vb2JqZWN0L21hcE9iamVjdFRvQXJyYXlcIjtcblxuLy8gdHJ5aW5nIHRvIHJlcXVpcmUgXCJ1dGlsXCIgbW9kdWxlLlxuXG5jb25zdCB1dGlsOlxuICB8IHVuZGVmaW5lZFxuICB8IHtcbiAgICAgIGluc3BlY3Q7XG4gICAgfSA9ICgociwgbSkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiByKG0pO1xuICB9IGNhdGNoIChlcnJvcikge31cbn0pKHJlcXVpcmUsIFwidXRpbFwiKTtcblxuaW5zcGVjdC5jdXN0b20gPSB1dGlsPy5pbnNwZWN0LmN1c3RvbSA/PyBTeW1ib2woKTtcbmV4cG9ydCBmdW5jdGlvbiBpbnNwZWN0KC4uLmFyZ3MpOiBzdHJpbmcge1xuICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICBhcmdzID0gWy4uLmFyZ3MsIHsgZGVwdGg6IDEwMCB9XTtcbiAgfVxuICBjb25zdCBbdmFsdWVdID0gYXJncztcblxuICBpZiAodHlwZW9mIHZhbHVlPy5pbnNwZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5zcGVjdCgpO1xuICB9XG5cbiAgaWYgKHV0aWwpIHJldHVybiB1dGlsLmluc3BlY3QuYXBwbHkodXRpbCwgYXJncyk7XG5cbiAgY29uc3QgbWV0aG9kID0gdmFsdWU/LltpbnNwZWN0LmN1c3RvbV07XG4gIGlmIChtZXRob2QpIHJldHVybiBtZXRob2QuYXBwbHkodmFsdWUpO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgXCJbXCIgK1xuICAgICAgdmFsdWVcbiAgICAgICAgLnRvU2VxKClcbiAgICAgICAgLm1hcCh2YWx1ZSA9PiBpbnNwZWN0KHZhbHVlKSlcbiAgICAgICAgLmpvaW4oXCIsIFwiKSArXG4gICAgICBcIl1cIlxuICAgICk7XG4gIH1cbiAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSkgPT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICByZXR1cm4gYHske21hcE9iamVjdFRvQXJyYXkoXG4gICAgICB2YWx1ZSxcbiAgICAgICh2YWx1ZSwga2V5KSA9PiBpbnNwZWN0KGtleSkgKyBcIjogXCIgKyBpbnNwZWN0KHZhbHVlKVxuICAgICl9fWA7XG4gIH1cbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnRUeXBlLCBSZWYsIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgdHlwZSBSZWZUeXBlPFQgZXh0ZW5kcyBSZWFjdC5SZWY8YW55Pj4gPSBUIGV4dGVuZHMgUmVhY3QuUmVmPGluZmVyIFU+XG4gID8gVVxuICA6IG5ldmVyO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlVXBkYXRlUmVmPFQgZXh0ZW5kcyBSZWY8YW55PiB8IHVuZGVmaW5lZD4oXG4gIHJlZjogVCxcbiAgY3JlYXRlOiAoKSA9PiBSZWZUeXBlPE5vbk51bGxhYmxlPFQ+PlxuKSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVmICYmIHVwZGF0ZVJlZihyZWYsIGNyZWF0ZSgpKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmVmICYmIHVwZGF0ZVJlZihyZWYsIG51bGwpO1xuICAgIH07XG4gIH0sIFt0eXBlb2YgKHJlZiB8fCB1bmRlZmluZWQpXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVSZWY8VD4ocmVmOiBSZWFjdC5SZWY8VD4gfCB1bmRlZmluZWQsIHZhbHVlOiBUKSB7XG4gIGlmIChyZWYpXG4gICAgc3dpdGNoICh0eXBlb2YgcmVmKSB7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcmV0dXJuIHJlZih2YWx1ZSk7XG4gICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgcmVmW1wiY3VycmVudFwiXSA9IHZhbHVlO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgSG9va1JlZjxUPiA9IHsgaG9va1JlZj86IFJlYWN0LlJlZjxUPiB9O1xuZXhwb3J0IHR5cGUgRm9yd2FyZEhvb2tSZWY8VCBleHRlbmRzIENvbXBvbmVudFR5cGU8SG9va1JlZjxhbnk+Pj4gPSBIb29rUmVmPFxuICBIb29rUmVmVHlwZTxUPlxuPjtcblxuZXhwb3J0IHR5cGUgSG9va1JlZlR5cGU8XG4gIFQgZXh0ZW5kcyBDb21wb25lbnRUeXBlPEhvb2tSZWY8YW55Pj5cbj4gPSBUIGV4dGVuZHMgQ29tcG9uZW50VHlwZTxIb29rUmVmPGluZmVyIFU+PiA/IFUgOiBuZXZlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUhvb2tSZWY8VCBleHRlbmRzIENvbXBvbmVudFR5cGU8SG9va1JlZjxhbnk+Pj4oXG4gIGNvbXBvbmVudFR5cGU/OiBUXG4pOiB7XG4gIHJlYWRvbmx5IGN1cnJlbnQ6IEhvb2tSZWZUeXBlPFQ+O1xuICAoY3VycmVudDogSG9va1JlZlR5cGU8VD4pOiB2b2lkO1xufSB7XG4gIHJldHVybiB1c2VNZW1vKCgpID0+IHtcbiAgICBob29rUmVmLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGhvb2tSZWY7XG5cbiAgICBmdW5jdGlvbiBob29rUmVmKGN1cnJlbnQpIHtcbiAgICAgIGhvb2tSZWYuY3VycmVudCA9IGN1cnJlbnQ7XG4gICAgfVxuICB9LCBbXSk7XG59XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgbWFwT2JqZWN0VG9BcnJheSB9IGZyb20gXCIuLi9jb21tb24vb2JqZWN0L21hcE9iamVjdFRvQXJyYXlcIjtcblxudHlwZSBUYWJsZUxheW91dENvbHVtblByb3BzPEM+ID0ge1xuICBrZXk6IHN0cmluZztcbiAgcHJvcHM6IEM7XG4gIGluZGV4OiBudW1iZXI7XG59O1xudHlwZSBUYWJsZUxheW91dFJvd1Byb3BzPEQ+ID0ge1xuICBrZXk6IHN0cmluZztcbiAgZGF0YTogRDtcbiAgaW5kZXg6IG51bWJlcjtcbn07XG50eXBlIFRhYmxlTGF5b3V0UHJvcHM8VCwgQywgRD4gPSB7XG4gIGNvbHVtbnM6IFJlY29yZDxzdHJpbmcsIEM+O1xuICByb3dzOiBUW107XG4gIGdldFJvd0tleTogKHJvdzogVCkgPT4gc3RyaW5nO1xuICBnZXRSb3dEYXRhOiAocm93OiBUKSA9PiBEO1xuICByZW5kZXJDb2x1bW46IChcbiAgICBwcm9wczogVGFibGVMYXlvdXRDb2x1bW5Qcm9wczxDPixcbiAgICBjaGlsZHJlbjogUmVhY3ROb2RlXG4gICkgPT4gUmVhY3ROb2RlO1xuICAvLyBUT0RPOiByZW5hbWUgdG8gcmVuZGVyQ29sdW1uVGl0bGVcblxuICByZW5kZXJDb2x1bW5UaXRsZTogKHByb3BzOiBUYWJsZUxheW91dENvbHVtblByb3BzPEM+KSA9PiBSZWFjdE5vZGU7XG4gIHJlbmRlclJvd0NvbHVtbjogKFxuICAgIGRhdGE6IGFueSxcbiAgICByb3c6IFRhYmxlTGF5b3V0Um93UHJvcHM8RD4sXG4gICAgY29sdW1uOiBUYWJsZUxheW91dENvbHVtblByb3BzPEM+LFxuICAgIGtleTogc3RyaW5nXG4gICkgPT4gUmVhY3ROb2RlO1xuXG4gIHJlbmRlclJvdzogKHByb3BzOiBUYWJsZUxheW91dFJvd1Byb3BzPEQ+LCBjaGlsZHJlbjogUmVhY3ROb2RlKSA9PiBSZWFjdE5vZGU7XG5cbiAgcmVuZGVyKHByb3BzOiB7IGNvbHVtbnM6IFJlYWN0Tm9kZVtdOyByb3dzOiBSZWFjdE5vZGVbXSB9KTogUmVhY3RFbGVtZW50O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFRhYmxlTGF5b3V0PFQsIEMsIEQ+KHByb3BzOiBUYWJsZUxheW91dFByb3BzPFQsIEMsIEQ+KSB7XG4gIGNvbnN0IGNvbHVtbnMgPSBtYXBPYmplY3RUb0FycmF5KHByb3BzLmNvbHVtbnMsIChwcm9wcywga2V5LCBpbmRleCkgPT4ge1xuICAgIHJldHVybiB7IHByb3BzLCBrZXksIGluZGV4IH07XG4gIH0pO1xuXG4gIHJldHVybiBwcm9wcy5yZW5kZXIoe1xuICAgIGNvbHVtbnM6IGNvbHVtbnMubWFwKChjb2x1bW4pID0+XG4gICAgICBwcm9wcy5yZW5kZXJDb2x1bW4oY29sdW1uLCBwcm9wcy5yZW5kZXJDb2x1bW5UaXRsZShjb2x1bW4pKVxuICAgICksXG4gICAgcm93czogcHJvcHMucm93cy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCByb3cgPSB7XG4gICAgICAgIGtleTogcHJvcHMuZ2V0Um93S2V5KGl0ZW0pLFxuICAgICAgICBkYXRhOiBwcm9wcy5nZXRSb3dEYXRhKGl0ZW0pLFxuICAgICAgICBpbmRleCxcbiAgICAgIH07XG4gICAgICByZXR1cm4gcHJvcHMucmVuZGVyUm93KFxuICAgICAgICByb3csXG4gICAgICAgIGNvbHVtbnMubWFwKChjb2x1bW4pID0+IHtcbiAgICAgICAgICByZXR1cm4gcHJvcHMucmVuZGVyQ29sdW1uKFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcHJvcHMucmVuZGVyUm93Q29sdW1uKHJvdy5kYXRhW2NvbHVtbi5rZXldLCByb3csIGNvbHVtbiwgcm93LmtleSlcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB0b3VjaE1hcCB9IGZyb20gXCIuLi8uLi9jb21tb24vbWFwL3RvdWNoTWFwXCI7XG5cbmV4cG9ydCB0eXBlIFJlYWN0b3JFdmVudDxUPiA9IG5ldyAoLi4uYXJncykgPT4gVDtcblxuZXhwb3J0IHR5cGUgUmVhY3Rvckxpc3RlbmVyID0gKGFjdGlvbjogYW55KSA9PiB2b2lkO1xuXG5leHBvcnQgY2xhc3MgUmVhY3RvciB7XG4gIHByb3RlY3RlZCBldmVudE1hcCA9IG5ldyBNYXAoKTtcbiAgcHJvdGVjdGVkIGV2ZW50TGlzdGVuZXJNYXAgPSBuZXcgTWFwPEZ1bmN0aW9uLCBTZXQ8UmVhY3Rvckxpc3RlbmVyPj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaGFuZGxlPzogKGV2ZW50OiBvYmplY3QpID0+IGJvb2xlYW4gfCB2b2lkKSB7fVxuXG4gIGdldExhc3Q8VD4oZXZlbnQ6IFJlYWN0b3JFdmVudDxUPik6IFQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmV2ZW50TWFwLmdldChldmVudC5jb25zdHJ1Y3Rvcik7XG4gIH1cblxuICBlbWl0KGV2ZW50OiBvYmplY3QpIHtcbiAgICBpZiAodGhpcy5oYW5kbGU/LihldmVudCkgPT09IGZhbHNlKSByZXR1cm47XG4gICAgdGhpcy5ldmVudE1hcC5zZXQoZXZlbnQuY29uc3RydWN0b3IsIGV2ZW50KTtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJNYXAuZ2V0KGV2ZW50LmNvbnN0cnVjdG9yKTtcbiAgICBsaXN0ZW5lcnM/LmZvckVhY2goY2FsbGJhY2sgPT4ge1xuICAgICAgY2FsbGJhY2soZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgbGlzdGVuPFQ+KGV2ZW50VHlwZTogUmVhY3RvckV2ZW50PFQ+LCBjYWxsYmFjazogKGFjdGlvbjogVCkgPT4gdm9pZCkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRvdWNoTWFwKFxuICAgICAgdGhpcy5ldmVudExpc3RlbmVyTWFwLFxuICAgICAgZXZlbnRUeXBlLFxuICAgICAgKCkgPT4gbmV3IFNldCgpXG4gICAgKTtcbiAgICBsaXN0ZW5lcnMuYWRkKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgbGlzdGVuZXJzLmRlbGV0ZShjYWxsYmFjayk7XG4gICAgICBpZiAoIWxpc3RlbmVycy5zaXplKSB7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lck1hcC5kZWxldGUoZXZlbnRUeXBlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBSZWFjdG9yQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQobmV3IFJlYWN0b3IoKSk7XG5leHBvcnQgY29uc3QgdXNlUmVhY3RvciA9ICgpID0+IFJlYWN0LnVzZUNvbnRleHQoUmVhY3RvckNvbnRleHQpO1xuIiwiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUmVhY3RvckV2ZW50LCB1c2VSZWFjdG9yIH0gZnJvbSBcIi4vUmVhY3RvclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlRW1pdHRlZDxUPihcbiAgYWN0aW9uVHlwZTogUmVhY3RvckV2ZW50PFQ+LFxuICBjYWxsYmFjaz86IChhY3Rpb246IFQpID0+IHZvaWRcbik6IFQgfCB1bmRlZmluZWQge1xuICBjb25zdCByZWFjdG9yID0gdXNlUmVhY3RvcigpO1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKCgpID0+IHJlYWN0b3IuZ2V0TGFzdChhY3Rpb25UeXBlKSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuIHJlYWN0b3IubGlzdGVuKGFjdGlvblR5cGUsIGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudCAhPSBzdGF0ZSkge1xuICAgICAgICBzZXRTdGF0ZShldmVudCk7XG4gICAgICAgIGNhbGxiYWNrPy4oZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LCBbcmVhY3Rvcl0pO1xuXG4gIHJldHVybiBzdGF0ZTtcbn1cbiIsImltcG9ydCB7IHVzZVJlYWN0b3IgfSBmcm9tIFwiLi9SZWFjdG9yXCI7XG5cbmV4cG9ydCB0eXBlIFJlYWN0b3JFbWl0dGVyID0gKGV2ZW50OiBvYmplY3QpID0+IHZvaWQ7XG5leHBvcnQgZnVuY3Rpb24gdXNlRW1pdHRlcigpOiBSZWFjdG9yRW1pdHRlciB7XG4gIGNvbnN0IHJlYWN0b3IgPSB1c2VSZWFjdG9yKCk7XG4gIHJldHVybiBldmVudCA9PiB7XG4gICAgcmVhY3Rvci5lbWl0KGV2ZW50KTtcbiAgfTtcbn1cbiIsImltcG9ydCB7Y3JlYXRlRWxlbWVudCwgRnJhZ21lbnR9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgRW1wdHlGcmFnbWVudCA9IGNyZWF0ZUVsZW1lbnQoRnJhZ21lbnQpO1xuIiwiaW1wb3J0IHtDb250ZXh0LCBjcmVhdGVDb250ZXh0fSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVuZGVmaW5lZENvbnRleHQ8VD4oKTogQ29udGV4dDxUIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIGNyZWF0ZUNvbnRleHQ8VCB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKVxufVxuIiwiaW1wb3J0IHt1c2VNZW1vfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7V2FpdGVyfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FzeW5jL1dhaXRlclwiO1xuXG5leHBvcnQgdHlwZSBEZWJvdW5jZSA9IHtcbiAgICB3YWl0KG1zPzogbnVtYmVyKTogUHJvbWlzZTxib29sZWFuPjtcbiAgICBjYW5jZWwoKTogdm9pZDtcbiAgICByZXNvbHZlKCk6IHZvaWQ7XG59O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBEZWJvdW5jZShkZWZhdWx0TXM6IG51bWJlciA9IDEwMDApOiBEZWJvdW5jZSB7XG5cbiAgICBsZXQgdGltZW91dDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IGxhc3RXYWl0ZXI6IFdhaXRlcjxib29sZWFuPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGNhbmNlbCxcbiAgICAgICAgcmVzb2x2ZTogKCkgPT4ge1xuICAgICAgICAgICAgaWYodGltZW91dCE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgd2FpdGVyID0gbGFzdFdhaXRlcjtcbiAgICAgICAgICAgIGxhc3RXYWl0ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB3YWl0ZXI/LnJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICB3YWl0OiAobXMgPSBkZWZhdWx0TXMpID0+IHtcbiAgICAgICAgICAgIGNhbmNlbCgpO1xuXG4gICAgICAgICAgICBpZiAodGltZW91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB3YWl0ZXIgPSBsYXN0V2FpdGVyID0gV2FpdGVyKCk7XG5cbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHdhaXRlci5yZXNvbHZlKGxhc3RXYWl0ZXIgIT09IHdhaXRlcik7XG4gICAgICAgICAgICB9LCBtcyk7XG5cbiAgICAgICAgICAgIHJldHVybiB3YWl0ZXI7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICAgICAgY29uc3Qgd2FpdGVyID0gbGFzdFdhaXRlcjtcbiAgICAgICAgbGFzdFdhaXRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgd2FpdGVyPy5yZXNvbHZlKHRydWUpO1xuICAgICAgICBpZiAodGltZW91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB0aW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VEZWJvdW5jZShtcz86IG51bWJlciwgZGVwcyA9IFtdKSB7XG4gICAgcmV0dXJuIHVzZU1lbW8oKCkgPT4gRGVib3VuY2UobXMpLCBkZXBzKVxufVxuXG4iLCJpbXBvcnQgeyBSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9lbnRyaWVzXCI7XG5pbXBvcnQgeyBzZXRSZWYgfSBmcm9tIFwiLi9zZXRSZWZcIjtcblxuZXhwb3J0IGNvbnN0ICRtZXJnZSA9IFwiJG1lcmdlXCI7XG5jb25zdCAkZGVmYXVsdCA9IFwiJGRlZmF1bHRcIjtcblxuZXhwb3J0IHR5cGUgUHJvcE1lcmdlcjxUPiA9XG4gIHwgUmVjb3JkPHR5cGVvZiAkbWVyZ2UsICh2YWx1ZTogVCkgPT4gVD5cbiAgfCBSZWNvcmQ8dHlwZW9mICRkZWZhdWx0LCBUPjtcblxuZnVuY3Rpb24gbWVyZ2VDYWxsYmFja3MocHJldkNhbGxiYWNrOiBGdW5jdGlvbiwgbmV4dENhbGxiYWNrOiBGdW5jdGlvbikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoaXM6IGFueSkge1xuICAgIGNvbnN0IHByZXZSZXN1bHQgPSBwcmV2Q2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gbmV4dENhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgPz8gcHJldlJlc3VsdDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VSZWZzKHByZXZSZWYsIG5leHRSZWYpIHtcbiAgcmV0dXJuIChjdXJyZW50KSA9PiB7XG4gICAgc2V0UmVmKHByZXZSZWYsIGN1cnJlbnQpO1xuICAgIHNldFJlZihuZXh0UmVmLCBjdXJyZW50KTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlUHJvcChwcmV2VmFsdWUsIG5leHRWYWx1ZSkge1xuICBjb25zdCBuZXh0VHlwZSA9IHR5cGVvZiBuZXh0VmFsdWU7XG5cbiAgY29uc3QgcHJldlR5cGUgPSB0eXBlb2YgcHJldlZhbHVlO1xuXG4gIC8vIFRPRE86ICRyZXZlcnNlXG5cbiAgaWYgKG5leHRWYWx1ZSAmJiBuZXh0VHlwZSA9PT0gXCJvYmplY3RcIikge1xuICAgIGlmICgkZGVmYXVsdCBpbiBuZXh0VmFsdWUpIHtcbiAgICAgIHJldHVybiBwcmV2VmFsdWUgPz8gbmV4dFZhbHVlWyRkZWZhdWx0XTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXJnZXIgPSBuZXh0VmFsdWVbJG1lcmdlXTtcbiAgICBpZiAodHlwZW9mIG1lcmdlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZXR1cm4gbWVyZ2VyLmNhbGwobmV4dFZhbHVlLCBwcmV2VmFsdWUpO1xuICAgIH1cbiAgICBpZiAocHJldlR5cGUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV4dFZhbHVlKSA9PT0gT2JqZWN0LnByb3RvdHlwZSlcbiAgICAgICAgcmV0dXJuIG1lcmdlUHJvcHMoe30sIG5leHRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG5leHRUeXBlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHByZXZWYWx1ZSA/PyBuZXh0VmFsdWU7XG4gIH1cblxuICBpZiAoaXNSZWZPYmplY3QocHJldlZhbHVlKSB8fCBpc1JlZk9iamVjdChuZXh0VmFsdWUpKSB7XG4gICAgcmV0dXJuIG1lcmdlUmVmcyhwcmV2VmFsdWUsIG5leHRWYWx1ZSk7XG4gIH1cblxuICBpZiAocHJldlR5cGUgPT09IG5leHRUeXBlKSB7XG4gICAgc3dpdGNoIChwcmV2VHlwZSkge1xuICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICByZXR1cm4gYCR7cHJldlZhbHVlfSAke25leHRWYWx1ZX1gO1xuICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgIHJldHVybiBtZXJnZUNhbGxiYWNrcyhwcmV2VmFsdWUsIG5leHRWYWx1ZSk7XG4gICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByZXZUeXBlKSAmJiBBcnJheS5pc0FycmF5KG5leHRUeXBlKSkge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIm1lcmdlQmV0d2VlbkFycmF5c1wiKTtcbiAgICAgICAgICByZXR1cm4gWy4uLnByZXZWYWx1ZSwgLi4ubmV4dFZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVyZ2VQcm9wcyhwcmV2VmFsdWUsIG5leHRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5leHRWYWx1ZTtcbn1cblxuZXhwb3J0IHR5cGUgTmV4dFByb3A8VD4gPVxuICB8IEV4Y2x1ZGU8VCwgUHJvcE1lcmdlcjxhbnk+PlxuICB8IFByb3BNZXJnZXI8VD5cbiAgfCAoVCBleHRlbmRzIG9iamVjdCA/IE5leHRQcm9wczxUPiA6IG5ldmVyKTtcblxuZXhwb3J0IHR5cGUgTmV4dFByb3BzPFA+ID0ge1xuICBbSyBpbiBrZXlvZiBSZXF1aXJlZDxQPl0/OiBOZXh0UHJvcDxQW0tdPjtcbn07XG5cbi8qXG5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VQcm9wczxQLCBFIGV4dGVuZHMgTmV4dFByb3BzPFA+PihcbiAgcHJldlByb3BzOiBQIHwgdW5kZWZpbmVkLFxuICBuZXh0UHJvcHM6IEVcbik6IFAgJiBFIHtcbiAgbGV0IF9wcm9wcyA9IHsgLi4ucHJldlByb3BzIH07XG5cbiAgZm9yIChsZXQgW2tleSwgbmV4dFZhbHVlXSBvZiBlbnRyaWVzKG5leHRQcm9wcykpIHtcbiAgICBfcHJvcHNba2V5XSA9IG1lcmdlUHJvcChfcHJvcHNba2V5XSwgbmV4dFZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiBfcHJvcHMgYXMgYW55O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSZWZPYmplY3Qobyk6IG8gaXMgUmVhY3QuUmVmT2JqZWN0PGFueT4ge1xuICByZXR1cm4gbyAmJiB0eXBlb2YgbyA9PT0gXCJvYmplY3RcIiAmJiBcImN1cnJlbnRcIiBpbiBvO1xufVxuIiwiaW1wb3J0IHtDb21wb25lbnRUeXBlLCBjcmVhdGVFbGVtZW50LCBSZWFjdEVsZW1lbnR9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtQYXJ0aWFsS2V5c30gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5cbmV4cG9ydCB0eXBlIFdpdGhEZWZhdWx0UHJvcHMgPSB7XG5cbiAgICA8VD4oZGVmYXVsdFByb3BzOiBUKTpcbiAgICAgICAgPFA+KGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxQICYgVD4pID0+XG4gICAgICAgICAgICAocHJvcHM6IFAgJiBQYXJ0aWFsPFQ+KSA9PiBSZWFjdEVsZW1lbnQ7XG5cblxuICAgIDxQLCBLIGV4dGVuZHMga2V5b2YgUD4oXG4gICAgICAgIGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxQPixcbiAgICAgICAgZGVmYXVsdFByb3BzOiBQaWNrPFAsIEs+XG4gICAgKTpcbiAgICAgICAgKHByb3BzOiBQYXJ0aWFsS2V5czxQLCBLPikgPT4gUmVhY3RFbGVtZW50O1xuXG4gICAgPFAsIEsgZXh0ZW5kcyBrZXlvZiBQPihcbiAgICAgICAgY29tcG9uZW50OiBDb21wb25lbnRUeXBlPFA+LFxuICAgICAgICBnZXREZWZhdWx0UHJvcHM6IChwcm9wczogUGFydGlhbDxQPikgPT4gUGljazxQLCBLPlxuICAgICk6XG4gICAgICAgIChwcm9wczogUGFydGlhbEtleXM8UCwgSz4pID0+IFJlYWN0RWxlbWVudDtcbn07XG5cbmZ1bmN0aW9uIF9wYXJ0aWFsUHJvcHMoXG4gICAgY29tcG9uZW50LCBkZWZhdWx0UHJvcHMsXG4gICAgZXh0cmFEZWZhdWx0UHJvcHM/XG4pIHtcblxuXG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0UHJvcHMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHMoXG4gICAgICAgICAgICBjb21wb25lbnQuZGVmYXVsdFByb3BzID8/IHt9XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBpZiAoY29tcG9uZW50LmRlZmF1bHRDb21wb25lbnQpIHtcbiAgICAgICAgcmV0dXJuIF9wYXJ0aWFsUHJvcHMoY29tcG9uZW50LmRlZmF1bHRDb21wb25lbnQsXG4gICAgICAgICAgICBkZWZhdWx0UHJvcHMsIHtcbiAgICAgICAgICAgICAgICAuLi5leHRyYURlZmF1bHRQcm9wcyxcbiAgICAgICAgICAgICAgICAuLi5jb21wb25lbnQuZGVmYXVsdFByb3BzLFxuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZyh7Y29tcG9uZW50fSk7XG4gICAgY29uc3QgZnVuYyA9IHByb3BzID0+IHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBwcm9wcylcbiAgICB9O1xuXG4gICAgZnVuYy5kZWZhdWx0Q29tcG9uZW50ID0gY29tcG9uZW50O1xuXG4gICAgZnVuYy5kaXNwbGF5TmFtZSA9IGNvbXBvbmVudC5kaXNwbGF5TmFtZSA/P1xuICAgICAgICBjb21wb25lbnQubmFtZTtcblxuICAgIGZ1bmMuZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5leHRyYURlZmF1bHRQcm9wcyxcbiAgICAgICAgLi4uZGVmYXVsdFByb3BzXG4gICAgfTtcblxuICAgIHJldHVybiBmdW5jO1xufVxuXG5leHBvcnQgY29uc3QgcGFydGlhbFByb3BzOiBXaXRoRGVmYXVsdFByb3BzID1cbiAgICAoY29tcG9uZW50T3JQcm9wcywgcHJvcHM/KTogYW55ID0+IHtcbiAgICAgICAgaWYgKHByb3BzKVxuICAgICAgICAgICAgcmV0dXJuIF9wYXJ0aWFsUHJvcHMoY29tcG9uZW50T3JQcm9wcywgcHJvcHMpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50ID0+IF9wYXJ0aWFsUHJvcHMoY29tcG9uZW50LCBjb21wb25lbnRPclByb3BzKTtcbiAgICB9O1xuIiwiaW1wb3J0IHtSZWZ9IGZyb20gXCJyZWFjdFwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRSZWY8VD4ocmVmOiBSZWY8VD4gfCB1bmRlZmluZWQsIHZhbHVlOiBUKSB7XG4gICAgaWYgKHR5cGVvZiByZWYgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmVmKHZhbHVlKTtcbiAgICBlbHNlIGlmIChyZWYpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZWZbXCJjdXJyZW50XCJdID0gdmFsdWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gXCIuLi8uLi9jb21tb24vYXNzZXJ0XCI7XG5pbXBvcnQgeyBXZWFrTWFwRmFjdG9yeSB9IGZyb20gXCIuLi8uLi9jb21tb24vbWFwL21hcEZhY3RvcnlcIjtcbmltcG9ydCB7IExhenkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhdHRlcm5zL2xhenlcIjtcbmltcG9ydCB7IEVtcHR5RnJhZ21lbnQgfSBmcm9tIFwiLi4vdXRpbHMvRW1wdHlGcmFnbWVudFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVmlldzxQID0ge30+IGV4dGVuZHMgQ29tcG9uZW50PFAsIG9iamVjdD4ge1xuICBhYnN0cmFjdCByZW5kZXJWaWV3KCk6IFJlYWN0Tm9kZTtcblxuICBpc0RpZE1vdW50ID0gZmFsc2U7XG5cbiAgaXNXaWxsVW5tb3VudCA9IGZhbHNlO1xuXG4gIGN1cnJlbnRTdGF0ZSA9IHt9O1xuXG4gIGlzRGlkU2V0U3RhdGUgPSBmYWxzZTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmlzRGlkTW91bnQgPSB0cnVlO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5pc1dpbGxVbm1vdW50ID0gdHJ1ZTtcbiAgfVxuXG4gIHVwZGF0ZVZpZXdQcm9wcz8ocHJldlByb3BzOiBSZWFkb25seTxQPiwgbmV4dFByb3BzOiBSZWFkb25seTxQPik6IHZvaWQ7XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKFxuICAgIG5leHRQcm9wczogUmVhZG9ubHk8UD4sXG4gICAgbmV4dFN0YXRlOiBSZWFkb25seTxhbnk+LFxuICAgIG5leHRDb250ZXh0OiBhbnlcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMudXBkYXRlVmlld1Byb3BzKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXdQcm9wcyh0aGlzLnByb3BzLCBuZXh0UHJvcHMpO1xuICAgICAgaWYgKHRoaXMuaXNEaWRTZXRTdGF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnJlbmRlclZpZXcoKSA/PyBFbXB0eUZyYWdtZW50O1xuICB9XG59XG4iLCJpbXBvcnQgeyBzZXRWaWV3U3RhdGVLZXkgfSBmcm9tIFwiLi9zZXRWaWV3U3RhdGVLZXlcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9WaWV3XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBWaWV3U3RhdGUoKTogeyAodGFyZ2V0OiBWaWV3PGFueT4sIGtleSk6IHZvaWQgfTtcbmV4cG9ydCBmdW5jdGlvbiBWaWV3U3RhdGU8TWV0aG9kIGV4dGVuZHMgUHJvcGVydHlLZXk+KFxuICBiZWZvcmVVcGRhdGVNZXRob2Q/OiBNZXRob2Rcbik6IHtcbiAgKHRhcmdldDogVmlldzxhbnk+ICYgUmVjb3JkPE1ldGhvZCwgKCkgPT4gYW55Piwga2V5KTogdm9pZDtcbn07XG5leHBvcnQgZnVuY3Rpb24gVmlld1N0YXRlKHVwZGF0ZU1ldGhvZD8pIHtcbiAgcmV0dXJuICh0YXJnZXQ6IFZpZXc8YW55Piwga2V5OiBzdHJpbmcpID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcbiAgICAgIGdldCh0aGlzOiBWaWV3KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTdGF0ZVtrZXldO1xuICAgICAgfSxcbiAgICAgIHNldCh0aGlzLCB2YWx1ZSkge1xuICAgICAgICBpZiAoc2V0Vmlld1N0YXRlS2V5KHRoaXMsIGtleSwgdmFsdWUpKSB7XG4gICAgICAgICAgdXBkYXRlTWV0aG9kICYmIHRoaXNbdXBkYXRlTWV0aG9kXSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL1ZpZXdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZpZXdTdGF0ZUtleSh2aWV3OiBWaWV3LCBrZXk6IHN0cmluZywgdmFsdWUpIHtcbiAgaWYgKHZpZXcuY3VycmVudFN0YXRlW2tleV0gPT09IHZhbHVlKSByZXR1cm4gZmFsc2U7XG4gIHZpZXcuY3VycmVudFN0YXRlW2tleV0gPSB2YWx1ZTtcblxuICBpZiAodmlldy5pc0RpZE1vdW50ICYmICF2aWV3LmlzRGlkU2V0U3RhdGUpIHtcbiAgICB2aWV3LmlzRGlkU2V0U3RhdGUgPSB0cnVlO1xuICAgIHZpZXcuc2V0U3RhdGUoKHN0YXRlKSA9PiB7XG4gICAgICB2aWV3LmlzRGlkU2V0U3RhdGUgPSBmYWxzZTtcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCAuLi52aWV3LmN1cnJlbnRTdGF0ZSB9O1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG4iLCJpbXBvcnQgeyBBd2FpdGVkIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBMb2dpbkluZm8gfSBmcm9tIFwiLi4vY29tbW9uL1N5c3RlbUFwcFwiO1xuXG50eXBlIExvZ2luSW5mb1BheWxvYWQgPSBBd2FpdGVkPExvZ2luSW5mbz47XG5cbmV4cG9ydCBjbGFzcyBMb2dpbkluZm9FdmVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBMb2dpbkluZm9QYXlsb2FkKSB7fVxuXG4gIGlzU3VjY2VzcygpOiB0aGlzIGlzIGFueSB7XG4gICAgcmV0dXJuIHRoaXMucGF5bG9hZC50eXBlID09PSBcIlNVQ0NFU1NcIjtcbiAgfVxuXG4gIGdldCBzdWNjZXNzKCk6IEV4dHJhY3Q8TG9naW5JbmZvUGF5bG9hZCwgeyB0eXBlOiBcIlNVQ0NFU1NcIiB9PiB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMucGF5bG9hZC50eXBlID09PSBcIlNVQ0NFU1NcIikge1xuICAgICAgcmV0dXJuIHRoaXMucGF5bG9hZDtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNBZG1pbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdWNjZXNzPy5pc0FkbWluIHx8IGZhbHNlO1xuICB9XG59XG5cbi8qXG5cblxuICA8UmVhY3RvclByb3ZpZGVyPlxuXG4gKi9cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE11aURhdGFNYW5hZ2VyVmlldyB9IGZyb20gXCIuLi8uLi9icm93c2VyL211aS9ycGMvTXVpRGF0YU1hbmFnZXJWaWV3XCI7XG5pbXBvcnQgeyBJbnB1dE1hcFZpZXcgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9pbnB1dC9pbnB1dC1tYXAvSW5wdXRNYXBWaWV3XCI7XG5pbXBvcnQge1xuICBBY2xVc2Vyc01hbmFnZXIsXG4gIEFjbFVzZXJzTWFuYWdlclJvdXRlcixcbn0gZnJvbSBcIi4uL2NvbW1vbi9BY2xVc2Vyc01hbmFnZXJcIjtcbmltcG9ydCB7IE11aVVzZXJCYXNpY0luZm9JbnB1dFZpZXcgfSBmcm9tIFwiLi9NdWlVc2VyQmFzaWNJbmZvSW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBNdWlVc2VyQ29udGFjdEluZm9JbnB1dFZpZXcgfSBmcm9tIFwiLi9NdWlVc2VyQ29udGFjdEluZm9JbnB1dFZpZXdcIjtcblxuLy8gTXVpQWNsTWFuYWdlclZpZXdcblxuZXhwb3J0IGNvbnN0IE11aUFjbFVzZXJzTWFuYWdlclZpZXcgPSAoXG4gIHJvdXRlcjogdHlwZW9mIEFjbFVzZXJzTWFuYWdlclJvdXRlclxuKSA9PiB7XG4gIE11aURhdGFNYW5hZ2VyVmlldyh7XG4gICAgcm91dGVyLFxuICAgIGNvbm5lY3Rpb246IEFjbFVzZXJzTWFuYWdlci5zZXJ2aWNlLFxuICAgIHJlbmRlckFkZElucHV0OiBwcm9wcyA9PiA8TXVpVXNlckJhc2ljSW5mb0lucHV0VmlldyB7Li4ucHJvcHN9IC8+LFxuICAgIHJlbmRlckVkaXRJbnB1dDogcHJvcHMgPT4gKFxuICAgICAgPElucHV0TWFwVmlldy5GaWVsZHNcbiAgICAgICAgey4uLnByb3BzfVxuICAgICAgICBmaWVsZHM9e3tcbiAgICAgICAgICBiYXNpY0luZm86IHByb3BzID0+IDxNdWlVc2VyQmFzaWNJbmZvSW5wdXRWaWV3IHsuLi5wcm9wc30gLz4sXG4gICAgICAgICAgY29udGFjdEluZm86IHByb3BzID0+IDxNdWlVc2VyQ29udGFjdEluZm9JbnB1dFZpZXcgey4uLnByb3BzfSAvPixcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgKSxcbiAgfSk7XG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTGFuZyB9IGZyb20gXCIuLi8uLi9sYW5nL0xhbmdcIjtcbmltcG9ydCB7IHVzZUVtaXR0ZWQgfSBmcm9tIFwiLi4vLi4vcmVhY3QvcmVhY3Rvci91c2VFbWl0dGVkXCI7XG5pbXBvcnQgeyBSZWFjdFJvdXRlciB9IGZyb20gXCIuLi8uLi90eXBlcm91dGVyMi9SZWFjdFJvdXRlclwiO1xuaW1wb3J0IHsgTG9naW5JbmZvRXZlbnQgfSBmcm9tIFwiLi9Mb2dpbkluZm9FdmVudFwiO1xuaW1wb3J0IHsgQWRtaW5Sb3V0ZXIgfSBmcm9tIFwiLi4vY29tbW9uL2FkbWluL0FkbWluUm91dGVyXCI7XG5pbXBvcnQgeyBNdWlBY2xVc2Vyc01hbmFnZXJWaWV3IH0gZnJvbSBcIi4vTXVpQWNsVXNlcnNNYW5hZ2VyVmlld1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpQWRtaW5WaWV3KHJvdXRlcjogdHlwZW9mIEFkbWluUm91dGVyKSB7XG4gIGNvbnNvbGUubG9nKFwieFwiKTtcblxuICBSZWFjdFJvdXRlcihyb3V0ZXIsIHtcbiAgICB3cmFwKHByb3BzKSB7XG4gICAgICBjb25zdCBsb2dpbkluZm8gPSB1c2VFbWl0dGVkKExvZ2luSW5mb0V2ZW50KTtcblxuICAgICAgaWYgKCFsb2dpbkluZm8pIHtcbiAgICAgICAgcmV0dXJuIExhbmdgQUNDRVNTX0RFTklFRF9CRUNBVVNFX05PX0xPR0lOYDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgc3VjY2VzcyB9ID0gbG9naW5JbmZvO1xuICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgIHJldHVybiBMYW5nYEFDQ0VTU19ERU5JRURfQkVDQVVTRV9MT0dJTl9JU19OT1RfU1VDQ0VTU2A7XG4gICAgICB9XG4gICAgICBpZiAoIXN1Y2Nlc3MuaXNBZG1pbikge1xuICAgICAgICByZXR1cm4gTGFuZ2BBQ0NFU1NfREVOSUVEX0JFQ0FVU0VfTE9HSU5fSVNfTk9UX0FETUlOYDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDw+e3Byb3BzLmNoaWxkcmVufTwvPjtcbiAgICB9LFxuICB9KTtcblxuICBNdWlBY2xVc2Vyc01hbmFnZXJWaWV3KHJvdXRlci5hdChcImFjbFwiKS5hdChcInVzZXJzXCIpKTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUJyb3dzZXJIaXN0b3J5IH0gZnJvbSBcImhpc3RvcnlcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZU11aVN5c3RlbSB9IGZyb20gXCIuLi8uLi9icm93c2VyL211aS9jcmVhdGVNdWlTeXN0ZW1cIjtcbmltcG9ydCB7IE11aUFkbWluIH0gZnJvbSBcIi4uLy4uL2Jyb3dzZXIvbXVpL011aUFkbWluXCI7XG5pbXBvcnQgeyB1c2VFbWl0dGVyIH0gZnJvbSBcIi4uLy4uL3JlYWN0L3JlYWN0b3IvdXNlRW1pdHRlclwiO1xuaW1wb3J0IHsgUmVhY3RSb3V0ZXJWaWV3IH0gZnJvbSBcIi4uLy4uL3R5cGVyb3V0ZXIyL1JlYWN0Um91dGVyVmlld1wiO1xuaW1wb3J0IHsgU3lzdGVtTG9naW5JbmZvIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7IExvZ2luSW5mb0V2ZW50IH0gZnJvbSBcIi4vTG9naW5JbmZvRXZlbnRcIjtcbmltcG9ydCB7IE11aVN5c3RlbVZpZXcgfSBmcm9tIFwiLi9NdWlTeXN0ZW1WaWV3XCI7XG5pbXBvcnQgeyBTeXN0ZW1Sb3V0ZXIgfSBmcm9tIFwiLi9TeXN0ZW1Sb3V0ZXJcIjtcblxuY29uc3QgeyBQcm92aWRlcjogTXVpU3lzdGVtUHJvdmlkZXIgfSA9IGNyZWF0ZU11aVN5c3RlbSgpO1xuY29uc3QgaGlzdG9yeSA9IGNyZWF0ZUJyb3dzZXJIaXN0b3J5KCk7XG5cbk11aVN5c3RlbVZpZXcoU3lzdGVtUm91dGVyKTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aVN5c3RlbVJvb3RWaWV3KCkge1xuICBjb25zdCBlbWl0ID0gdXNlRW1pdHRlcigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgU3lzdGVtTG9naW5JbmZvLnRoZW4obG9naW5JbmZvID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHsgbG9naW5JbmZvIH0pO1xuICAgICAgZW1pdChuZXcgTG9naW5JbmZvRXZlbnQobG9naW5JbmZvKSk7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxNdWlTeXN0ZW1Qcm92aWRlcj5cbiAgICAgIDxSZWFjdFJvdXRlclZpZXcgaGlzdG9yeT17aGlzdG9yeX0gcm91dGVyPXtTeXN0ZW1Sb3V0ZXJ9IC8+XG4gICAgPC9NdWlTeXN0ZW1Qcm92aWRlcj5cbiAgKTtcbn1cblxuY29uc3QgVGVzdCA9ICgpID0+IChcbiAgPE11aUFkbWluXG4gICAgbWVudT17e1xuICAgICAgaG9tZToge1xuICAgICAgICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0hvbWVcIiksXG4gICAgICB9LFxuICAgICAgYWNsOiB7XG4gICAgICAgIC8vIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvSG9tZVwiKSxcbiAgICAgICAgY2hpbGRyZW46IHtcbiAgICAgICAgICB1c2Vyczoge1xuICAgICAgICAgICAgY2hpbGRyZW46IHtcbiAgICAgICAgICAgICAgYWRkOiB7IGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvUGVyc29uQWRkXCIpIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ3JvdXBzOiB7XG4gICAgICAgICAgICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL1Blb3BsZVwiKSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiB7XG4gICAgICAgICAgICAgIGFkZDogeyBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0dyb3VwQWRkXCIpIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgb3V0Ym94OiB7XG4gICAgICAgIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvU2VuZFwiKSxcbiAgICAgIH0sXG4gICAgICBmYXZvcml0ZXM6IHtcbiAgICAgICAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9GYXZvcml0ZVwiKSxcbiAgICAgIH0sXG4gICAgICBhcmNoaXZlOiB7XG4gICAgICAgIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvQXJjaGl2ZVwiKSxcbiAgICAgIH0sXG4gICAgICB0cmFzaDoge1xuICAgICAgICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0RlbGV0ZVwiKSxcbiAgICAgIH0sXG4gICAgICBzcGFtOiB7XG4gICAgICAgIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvRXJyb3JcIiksXG4gICAgICB9LFxuICAgIH19XG4gIC8+XG4pO1xuIiwiaW1wb3J0IEdyaWQgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0dyaWRcIjtcbmltcG9ydCBQYXBlciBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvUGFwZXJcIjtcbmltcG9ydCB7IG1ha2VTdHlsZXMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCI7XG5pbXBvcnQgVHlwb2dyYXBoeSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeVwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTXVpRGF0YUlucHV0VmlldyB9IGZyb20gXCIuLi8uLi9icm93c2VyL211aS9ycGMvaW5wdXRzL011aURhdGFJbnB1dFZpZXdcIjtcbmltcG9ydCB7IE11aUZvcm1WaWV3IH0gZnJvbSBcIi4uLy4uL2Jyb3dzZXIvbXVpL3JwYy9NdWlGb3JtVmlld1wiO1xuaW1wb3J0IHsgTGFuZyB9IGZyb20gXCIuLi8uLi9sYW5nL0xhbmdcIjtcbmltcG9ydCB7IHVzZUVtaXR0ZWQgfSBmcm9tIFwiLi4vLi4vcmVhY3QvcmVhY3Rvci91c2VFbWl0dGVkXCI7XG5pbXBvcnQgeyB1c2VFbWl0dGVyIH0gZnJvbSBcIi4uLy4uL3JlYWN0L3JlYWN0b3IvdXNlRW1pdHRlclwiO1xuaW1wb3J0IHsgRW1wdHlGcmFnbWVudCB9IGZyb20gXCIuLi8uLi9yZWFjdC91dGlscy9FbXB0eUZyYWdtZW50XCI7XG5pbXBvcnQgeyBXaWRnZXRSb3V0ZXJWaWV3IH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvd2lkZ2V0L1dpZGdldFJvdXRlclZpZXdcIjtcbmltcG9ydCB7IE11aUFkbWluVmlldyB9IGZyb20gXCIuL011aUFkbWluVmlld1wiO1xuaW1wb3J0IHsgU3lzdGVtQXBwIH0gZnJvbSBcIi4uL2NvbW1vbi9TeXN0ZW1BcHBcIjtcbmltcG9ydCB7IExvZ2luSW5mb0V2ZW50IH0gZnJvbSBcIi4vTG9naW5JbmZvRXZlbnRcIjtcbmltcG9ydCB7IFN5c3RlbVJvdXRlciB9IGZyb20gXCIuL1N5c3RlbVJvdXRlclwiO1xuXG5jb25zdCB1c2VTdHlsZXMgPSBtYWtlU3R5bGVzKHRoZW1lID0+ICh7XG4gIHBhcGVyOiB7XG4gICAgcGFkZGluZzogdGhlbWUuc3BhY2luZygyKSxcbiAgfSxcbn0pKTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aVN5c3RlbVZpZXcocm91dGVyOiB0eXBlb2YgU3lzdGVtUm91dGVyKSB7XG4gIE11aUFkbWluVmlldyhyb3V0ZXIuYXQoXCJhZG1pblwiKSk7XG4gIFdpZGdldFJvdXRlclZpZXcoXG4gICAgcm91dGVyLmF0KFwibG9naW5cIiksXG4gICAgU3lzdGVtQXBwLnNlcnZpY2UuZGV2TG9naW4sXG4gICAgKHByb3BzLCB7IGVtaXQgfSkgPT4ge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xuICAgICAgY29uc3QgbG9naW5JbmZvID0gdXNlRW1pdHRlZChMb2dpbkluZm9FdmVudCk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPEdyaWQgY29udGFpbmVyIGp1c3RpZnk9e1wiY2VudGVyXCJ9PlxuICAgICAgICAgICAgPEdyaWQgaXRlbT5cbiAgICAgICAgICAgICAge2xvZ2luSW5mbz8uc3VjY2VzcyAmJiAoXG4gICAgICAgICAgICAgICAgPFR5cG9ncmFwaHk+XG4gICAgICAgICAgICAgICAgICB7TGFuZ2BXRUxDT01FX1RPXyR7XCJmdWxsTmFtZVwifWAoe1xuICAgICAgICAgICAgICAgICAgICBmdWxsTmFtZTogbG9naW5JbmZvLnN1Y2Nlc3MuZnVsbE5hbWUsXG4gICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDxQYXBlciBjbGFzc05hbWU9e2NsYXNzZXMucGFwZXJ9PlxuICAgICAgICAgICAgICAgIDxNdWlGb3JtVmlld1xuICAgICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgICAgb25TdWJtaXQ9e2xvZ2luSW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVtaXQobmV3IExvZ2luSW5mb0V2ZW50KGxvZ2luSW5mbykpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGlucHV0PXtwcm9wcyA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgPE11aURhdGFJbnB1dFZpZXdcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtMYW5nYFVTRVJfVE9fTE9HSU5gfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L1BhcGVyPlxuICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgPC8+XG4gICAgICApO1xuICAgIH1cbiAgKTtcbn1cbiIsImltcG9ydCBHcmlkIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9HcmlkXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNdWlUZXh0SW5wdXRWaWV3IH0gZnJvbSBcIi4uLy4uL2Jyb3dzZXIvbXVpL3JwYy9pbnB1dHMvTXVpVGV4dElucHV0Vmlld1wiO1xuaW1wb3J0IHsgTGFuZyB9IGZyb20gXCIuLi8uLi9sYW5nL0xhbmdcIjtcbmltcG9ydCB7IElucHV0TWFwVmlldyB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2lucHV0L2lucHV0LW1hcC9JbnB1dE1hcFZpZXdcIjtcbmltcG9ydCB7IElucHV0RXJyb3JIb29rVmlld1Byb3BzIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvSW5wdXRFcnJvckhvb2tcIjtcbmltcG9ydCB7IElucHV0Vmlld0ZuIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvSW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBVc2VyQmFzaWNJbmZvSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uL0FjbFVzZXJzTWFuYWdlclwiO1xuXG5leHBvcnQgY29uc3QgTXVpVXNlckJhc2ljSW5mb0lucHV0VmlldzogSW5wdXRWaWV3Rm48dHlwZW9mIFVzZXJCYXNpY0luZm9JbnB1dD4gPSBwcm9wcyA9PiB7XG4gIHJldHVybiAoXG4gICAgPEdyaWQgY29udGFpbmVyIHNwYWNpbmc9ezF9PlxuICAgICAgPElucHV0TWFwVmlldy5GaWVsZHNcbiAgICAgICAgey4uLnByb3BzfVxuICAgICAgICBmaWVsZHM9e3tcbiAgICAgICAgICBmaXJzdE5hbWU6IHByb3BzID0+IChcbiAgICAgICAgICAgIDxHcmlkIGl0ZW0geHM9ezZ9PlxuICAgICAgICAgICAgICA8TXVpVGV4dElucHV0VmlldyB7Li4ucHJvcHN9IHRpdGxlPXtMYW5nYEZJUlNUX05BTUVgfSAvPlxuICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICksXG4gICAgICAgICAgbGFzdE5hbWU6IHByb3BzID0+IChcbiAgICAgICAgICAgIDxHcmlkIGl0ZW0geHM9ezZ9PlxuICAgICAgICAgICAgICA8TXVpVGV4dElucHV0VmlldyB7Li4ucHJvcHN9IHRpdGxlPXtMYW5nYExBU1RfTkFNRWB9IC8+XG4gICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgKSxcbiAgICAgICAgICBsb2dpbk5hbWU6IHByb3BzID0+IChcbiAgICAgICAgICAgIDxHcmlkIGl0ZW0geHM+XG4gICAgICAgICAgICAgIDxNdWlUZXh0SW5wdXRWaWV3XG4gICAgICAgICAgICAgICAgey4uLklucHV0RXJyb3JIb29rVmlld1Byb3BzKHtcbiAgICAgICAgICAgICAgICAgIC4uLnByb3BzLFxuICAgICAgICAgICAgICAgICAgZXJyb3JNYXA6IHtcbiAgICAgICAgICAgICAgICAgICAgQUxSRUFEWV9FWElTVFM6IExhbmdgTE9HSU5fTkFNRV9JU19BTFJFQURZX0VYSVNUU2AsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHRpdGxlPXtMYW5nYExPR0lOX05BTUVgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICksXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvR3JpZD5cbiAgKTtcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNdWlUZXh0SW5wdXRWaWV3IH0gZnJvbSBcIi4uLy4uL2Jyb3dzZXIvbXVpL3JwYy9pbnB1dHMvTXVpVGV4dElucHV0Vmlld1wiO1xuaW1wb3J0IHsgTGFuZyB9IGZyb20gXCIuLi8uLi9sYW5nL0xhbmdcIjtcbmltcG9ydCB7IElucHV0TWFwVmlldyB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2lucHV0L2lucHV0LW1hcC9JbnB1dE1hcFZpZXdcIjtcbmltcG9ydCB7IElucHV0Vmlld0ZuIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvSW5wdXRWaWV3XCI7XG5pbXBvcnQgeyBVc2VyQ29udGFjdEluZm9JbnB1dCB9IGZyb20gXCIuLi9jb21tb24vQWNsVXNlcnNNYW5hZ2VyXCI7XG5cbmV4cG9ydCBjb25zdCBNdWlVc2VyQ29udGFjdEluZm9JbnB1dFZpZXc6IElucHV0Vmlld0ZuPHR5cGVvZiBVc2VyQ29udGFjdEluZm9JbnB1dD4gPSBwcm9wcyA9PiB7XG4gIHJldHVybiAoXG4gICAgPElucHV0TWFwVmlldy5GaWVsZHNcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIGZpZWxkcz17e1xuICAgICAgICBwaG9uZU51bWJlcjogcHJvcHMgPT4gKFxuICAgICAgICAgIDxNdWlUZXh0SW5wdXRWaWV3IHsuLi5wcm9wc30gdGl0bGU9e0xhbmdgUEhPTkVfTlVNQkVSYH0gLz5cbiAgICAgICAgKSxcbiAgICAgICAgZW1haWw6IHByb3BzID0+IDxNdWlUZXh0SW5wdXRWaWV3IHsuLi5wcm9wc30gdGl0bGU9e0xhbmdgRU1BSUxgfSAvPixcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn07XG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiLi4vLi4vdHlwZXJvdXRlcjIvUm91dGVyXCI7XG5pbXBvcnQgeyBBZG1pblJvdXRlciB9IGZyb20gXCIuLi9jb21tb24vYWRtaW4vQWRtaW5Sb3V0ZXJcIjtcblxuZXhwb3J0IGNvbnN0IFN5c3RlbVJvdXRlciA9IFJvdXRlcih7XG4gIGFkbWluOiBBZG1pblJvdXRlcixcbiAgbG9naW46IFJvdXRlcigpLFxufSk7XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgdXNlQXJyYXlUb1NlcSB9IGZyb20gXCIuLi8uLi9jb21tb24vYXJyYXkvdXNlQXJyYXlUb1NlcVwiO1xuaW1wb3J0IHsgaGFuZGxlUnBjU2VydmljZSB9IGZyb20gXCIuLi8uLi90eXBlcnBjL1JwY1wiO1xuaW1wb3J0IHsgU3lzdGVtQXBwIH0gZnJvbSBcIi4uL2NvbW1vbi9TeXN0ZW1BcHBcIjtcbmltcG9ydCB7IE11aVN5c3RlbVJvb3RWaWV3IH0gZnJvbSBcIi4vTXVpU3lzdGVtUm9vdFZpZXdcIjtcblxudXNlQXJyYXlUb1NlcSgpO1xuXG5oYW5kbGVScGNTZXJ2aWNlKFN5c3RlbUFwcCwgcGF5bG9hZCA9PiB7XG4gIHJldHVybiBmZXRjaChcIi9zZXJ2aWNlXCIsIHtcbiAgICBtZXRob2Q6IFwicG9zdFwiLFxuICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSk7XG59KTtcblxuZXhwb3J0IGNvbnN0IFN5c3RlbUxvZ2luSW5mbyA9IFN5c3RlbUFwcC5zZXJ2aWNlLmdldExvZ2luSW5mbygpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBSZWFjdERPTS5yZW5kZXIoXG4gICAgY3JlYXRlRWxlbWVudChNdWlTeXN0ZW1Sb290VmlldyksIC8vXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzeXN0ZW1cIilcbiAgKTtcbn0pO1xuIiwiaW1wb3J0IHsgRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9kYXRhLW1hbmFnZXIvRGF0YU1hbmFnZXJcIjtcblxuaW1wb3J0IHsgRGF0YU1hbmFnZXJSb3V0ZXIgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9kYXRhLW1hbmFnZXIvRGF0YU1hbmFnZXJSb3V0ZXJcIjtcbmltcG9ydCB7IElucHV0TWFwIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvaW5wdXQvaW5wdXQtbWFwL0lucHV0TWFwXCI7XG5pbXBvcnQgeyBJbnB1dEVycm9ySG9vayB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2lucHV0L0lucHV0RXJyb3JIb29rXCI7XG5pbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9pbnB1dC90ZXh0LWlucHV0L1RleHRJbnB1dFwiO1xuaW1wb3J0IHsgUnBjUGFydGlhbENvbmZpZyB9IGZyb20gXCIuLi8uLi90eXBlcnBjL1JwY1BhcnRpYWxDb25maWdcIjtcblxuY29uc3QgTmFtZUlucHV0ID0gUnBjUGFydGlhbENvbmZpZyhUZXh0SW5wdXQoKSwge1xuICBtaW5MZW5ndGg6IDIsXG4gIG1heExlbmd0aDogMjAsXG4gIHJlcXVpcmVkOiB0cnVlLFxufSk7XG5cbmV4cG9ydCBjb25zdCBVc2VyQmFzaWNJbmZvSW5wdXQgPSBJbnB1dE1hcCh7XG4gIGZpcnN0TmFtZTogTmFtZUlucHV0LFxuICBsYXN0TmFtZTogTmFtZUlucHV0LFxuICBsb2dpbk5hbWU6IElucHV0RXJyb3JIb29rPFwiQUxSRUFEWV9FWElTVFNcIj4oKShUZXh0SW5wdXQoKSksXG59KTtcblxuZXhwb3J0IGNvbnN0IFVzZXJDb250YWN0SW5mb0lucHV0ID0gSW5wdXRNYXAoe1xuICBwaG9uZU51bWJlcjogVGV4dElucHV0KCksXG4gIGVtYWlsOiBUZXh0SW5wdXQoKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgQWNsVXNlcnNNYW5hZ2VyID0gRGF0YU1hbmFnZXIoe1xuICBhZGRJbnB1dDogVXNlckJhc2ljSW5mb0lucHV0LFxuICBlZGl0SW5wdXQ6IElucHV0TWFwKHtcbiAgICBiYXNpY0luZm86IFVzZXJCYXNpY0luZm9JbnB1dCxcbiAgICBjb250YWN0SW5mbzogVXNlckNvbnRhY3RJbmZvSW5wdXQsXG4gIH0pLFxuICB0YWJsZVJvd1R5cGU6IHtcbiAgICBsb2dpbk5hbWU6IFN0cmluZyxcbiAgICBmaXJzdE5hbWU6IFN0cmluZyxcbiAgICBsYXN0TmFtZTogU3RyaW5nLFxuICB9LFxuICBlZGl0VGFiczoge1xuICAgIC8vIFRPRE86IGdyb3Vwc1xuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBBY2xVc2Vyc01hbmFnZXJSb3V0ZXIgPSBEYXRhTWFuYWdlclJvdXRlcihBY2xVc2Vyc01hbmFnZXIpO1xuIiwiaW1wb3J0IHsgUnBjRm4gfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9ycGMtZm4vUnBjRm5cIjtcbmltcG9ydCB7IFJwY01hcCB9IGZyb20gXCIuLi8uLi90eXBlcnBjL3JwYy1tYXAvUnBjTWFwXCI7XG5cbmV4cG9ydCBjb25zdCBBZG1pbkFwcCA9IFJwY01hcCh7XG4gIC8vIGZvOiBScGNGbigpLFxufSk7XG4iLCJpbXBvcnQgeyBQYXlsb2FkLCBUeXBlUmVmLCBUeXBpbmcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IERhdGFJbnB1dCB9IGZyb20gXCIuLi8uLi90eXBlcnBjL2lucHV0L2RhdGEtaW5wdXQvRGF0YUlucHV0XCI7XG5pbXBvcnQgeyBScGNGbiB9IGZyb20gXCIuLi8uLi90eXBlcnBjL3JwYy1mbi9ScGNGblwiO1xuaW1wb3J0IHsgUnBjTWFwIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvcnBjLW1hcC9ScGNNYXBcIjtcbmltcG9ydCB7IEZvcm0gfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy93aWRnZXQvZm9ybS9Gb3JtXCI7XG5pbXBvcnQgeyBBZG1pbkFwcCB9IGZyb20gXCIuL0FkbWluQXBwXCI7XG5pbXBvcnQgeyBVc2VyQXBwIH0gZnJvbSBcIi4vVXNlckFwcFwiO1xuXG5leHBvcnQgZGVjbGFyZSBjb25zdCBEZXZMb2dpblVzZXI6IHVuaXF1ZSBzeW1ib2w7XG5cbmV4cG9ydCB0eXBlIExvZ2luSW5mbyA9IFBheWxvYWQ8e1xuICBGQUlMRUQ6IHt9O1xuICBTVUNDRVNTOiB7XG4gICAgZnVsbE5hbWU6IHN0cmluZztcbiAgICBpc0FkbWluOiBib29sZWFuO1xuICB9O1xufT47XG5cbi8vIFJlbW90ZVByb21pc2U8WD5cbi8vIHR5cGU6IHJlamVjdGVkXG4vLyB0eXBlOiByZXNvbHZlZFxuXG5leHBvcnQgY29uc3QgRGV2TG9naW4gPSBGb3JtKHtcbiAgaW5wdXQ6IERhdGFJbnB1dCh7XG4gICAgbG9hZFR5cGU6IFR5cGVSZWYoKCkgPT4gRGV2TG9naW5Vc2VyKSxcbiAgfSksXG4gIHZhbHVlOiBUeXBpbmc8TG9naW5JbmZvPigpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBTeXN0ZW1BcHAgPSBScGNNYXAoe1xuICBsb2dvdXQ6IFJwY0ZuKCksXG5cbiAgZ2V0TG9naW5JbmZvOiBScGNGbjwoKSA9PiBMb2dpbkluZm8+KCksXG5cbiAgZGV2TG9naW46IERldkxvZ2luLFxuXG4gIGFkbWluOiBBZG1pbkFwcCxcblxuICB1c2VyOiBVc2VyQXBwLFxufSk7XG4iLCJpbXBvcnQgeyBScGNGbiB9IGZyb20gXCIuLi8uLi90eXBlcnBjL3JwYy1mbi9ScGNGblwiO1xuaW1wb3J0IHsgUnBjTWFwIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvcnBjLW1hcC9ScGNNYXBcIjtcblxuZXhwb3J0IGNvbnN0IFVzZXJBcHAgPSBScGNNYXAoe1xuICBmb286IFJwY0ZuKCksXG59KTtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCIuLi8uLi8uLi90eXBlcm91dGVyMi9Sb3V0ZXJcIjtcbmltcG9ydCB7IEFjbFVzZXJzTWFuYWdlclJvdXRlciB9IGZyb20gXCIuLi9BY2xVc2Vyc01hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IEFkbWluUm91dGVyID0gUm91dGVyKHtcbiAgYWNsOiBSb3V0ZXIoe1xuICAgIHVzZXJzOiBBY2xVc2Vyc01hbmFnZXJSb3V0ZXIsXG4gIH0pLFxufSk7XG4iLCJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFdlYWtNYXBGYWN0b3J5IH0gZnJvbSBcIi4uL2NvbW1vbi9tYXAvbWFwRmFjdG9yeVwiO1xuaW1wb3J0IHsgUmVhY3RvckVtaXR0ZXIgfSBmcm9tIFwiLi4vcmVhY3QvcmVhY3Rvci91c2VFbWl0dGVyXCI7XG5pbXBvcnQgeyBFbXB0eUZyYWdtZW50IH0gZnJvbSBcIi4uL3JlYWN0L3V0aWxzL0VtcHR5RnJhZ21lbnRcIjtcbmltcG9ydCB7IGNyZWF0ZVVuZGVmaW5lZENvbnRleHQgfSBmcm9tIFwiLi4vcmVhY3QvdXRpbHMvaG9va3MvY3JlYXRlVW5kZWZpbmVkQ29udGV4dFwiO1xuaW1wb3J0IHsgUm91dGVQcm9wcyB9IGZyb20gXCIuL1JvdXRlUHJvcHNcIjtcbmltcG9ydCB7IEFueVJvdXRlciwgUm91dGVyLCBSb3V0ZXJUeXBlLCBUUm91dGVyIH0gZnJvbSBcIi4vUm91dGVyXCI7XG5pbXBvcnQgeyBBbnlSb3V0ZXJMb2NhdGlvbiwgUm91dGVyTG9jYXRpb24gfSBmcm9tIFwiLi9Sb3V0ZXJMb2NhdGlvblwiO1xuXG50eXBlIF9SZW5kZXJlclByb3BzPFQgZXh0ZW5kcyBUUm91dGVyLCBSIGV4dGVuZHMgUm91dGVQcm9wcyA9IFJvdXRlUHJvcHM+ID0ge1xuICBsb2NhdGlvbjogUm91dGVyTG9jYXRpb248VD47XG4gIHJvdXRlOiBSO1xuICBlbWl0OiBSZWFjdG9yRW1pdHRlcjtcbn07XG50eXBlIF9XcmFwcGVyUHJvcHM8VCBleHRlbmRzIFRSb3V0ZXI+ID0gX1JlbmRlcmVyUHJvcHM8VD4gJiB7XG4gIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG59O1xudHlwZSBfUmVuZGVyZXI8VCBleHRlbmRzIFRSb3V0ZXIsIFIgZXh0ZW5kcyBSb3V0ZVByb3BzID0gUm91dGVQcm9wcz4gPSAoXG4gIHByb3BzOiBfUmVuZGVyZXJQcm9wczxULCBSPlxuKSA9PiBSZWFjdE5vZGU7XG50eXBlIF9XcmFwcGVyPFQgZXh0ZW5kcyBUUm91dGVyPiA9IChwcm9wczogX1dyYXBwZXJQcm9wczxUPikgPT4gUmVhY3ROb2RlO1xuXG5leHBvcnQgdHlwZSBSZWFjdFJvdXRlck9wdGlvbnM8VCBleHRlbmRzIFRSb3V0ZXI+ID0ge1xuICB3cmFwPzogX1dyYXBwZXI8VD47XG5cbiAgcmVuZGVyPzogX1JlbmRlcmVyPFQ+O1xuICByZW5kZXJEZWZhdWx0PzogX1JlbmRlcmVyPFQsIEV4dHJhY3Q8Um91dGVQcm9wcywgeyB0eXBlOiBcIkRFRkFVTFRcIiB9Pj47XG4gIHJlbmRlckluZGV4PzogX1JlbmRlcmVyPFQsIEV4dHJhY3Q8Um91dGVQcm9wcywgeyB0eXBlOiBcIklOREVYXCIgfT4+O1xuICByZW5kZXJOb1BhcmFtPzogX1JlbmRlcmVyPFQsIEV4dHJhY3Q8Um91dGVQcm9wcywgeyB0eXBlOiBcIk5PX1BBUkFNXCIgfT4+O1xufTtcblxuZXhwb3J0IHR5cGUgUmVhY3RSb3V0ZXIgPSB7XG4gIHB1c2gobG9jYXRpb246IEFueVJvdXRlckxvY2F0aW9uKTtcblxuICBmaW5kKHJvdXRlcik7XG59O1xuXG5leHBvcnQgY29uc3QgUmVhY3RSb3V0ZXJDb250ZXh0ID0gY3JlYXRlVW5kZWZpbmVkQ29udGV4dDxSZWFjdFJvdXRlcj4oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWN0Um91dGVyPFQgZXh0ZW5kcyBUUm91dGVyPihcbiAgcm91dGVyOiBSb3V0ZXI8VD4sXG4gIG9wdGlvbnNPclJlbmRlcmVyOiBSZWFjdFJvdXRlck9wdGlvbnM8VD4gfCBfUmVuZGVyZXI8VD5cbikge1xuICBsZXQgb3B0aW9uczogUmVhY3RSb3V0ZXJPcHRpb25zPFRSb3V0ZXI+O1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9uc09yUmVuZGVyZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIG9wdGlvbnMgPSB7IHJlbmRlcjogb3B0aW9uc09yUmVuZGVyZXIgYXMgYW55IH07XG4gIH0gZWxzZSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnNPclJlbmRlcmVyIGFzIGFueTtcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICB3cmFwOiB3cmFwcGVyLFxuICAgIHJlbmRlcixcbiAgICByZW5kZXJEZWZhdWx0LFxuICAgIHJlbmRlckluZGV4LFxuICAgIHJlbmRlck5vUGFyYW0sXG4gIH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IGluZm8gPSBnZXRSZWFjdFJvdXRlck1ldGFkYXRhKHJvdXRlcik7XG5cbiAgd3JhcHBlciAmJiBpbmZvLndyYXBwZXJzLnB1c2god3JhcHBlcik7XG5cbiAgY29uc3QgeyByZW5kZXJlcjogcHJldlJlbmRlciB9ID0gaW5mbztcblxuICBpbmZvLnJlbmRlcmVyID0gcHJvcHMgPT4ge1xuICAgIHN3aXRjaCAocHJvcHMucm91dGUudHlwZSkge1xuICAgICAgY2FzZSBcIkRFRkFVTFRcIjpcbiAgICAgICAgaWYgKHJlbmRlckRlZmF1bHQpIHJldHVybiByZW5kZXJEZWZhdWx0KHByb3BzIGFzIGFueSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIklOREVYXCI6XG4gICAgICAgIGlmIChyZW5kZXJJbmRleCkgcmV0dXJuIHJlbmRlckluZGV4KHByb3BzIGFzIGFueSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIk5PX1BBUkFNXCI6XG4gICAgICAgIGlmIChyZW5kZXJOb1BhcmFtKSByZXR1cm4gcmVuZGVyTm9QYXJhbShwcm9wcyBhcyBhbnkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIChyZW5kZXIgfHwgcHJldlJlbmRlcik/Lihwcm9wcyk7XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBnZXRSZWFjdFJvdXRlck1ldGFkYXRhID0gV2Vha01hcEZhY3RvcnkoKHJvdXRlcjogQW55Um91dGVyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgd3JhcHBlcnM6IFtdIGFzIF9XcmFwcGVyPFRSb3V0ZXI+W10sXG4gICAgcmVuZGVyZXI6IHVuZGVmaW5lZCBhcyB1bmRlZmluZWQgfCBfUmVuZGVyZXI8VFJvdXRlcj4sXG4gIH07XG59KTtcbiIsImltcG9ydCB7IEhpc3RvcnkgfSBmcm9tIFwiaGlzdG9yeVwiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgRnJhZ21lbnQsIFJlYWN0Tm9kZSwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlRW1pdHRlZCB9IGZyb20gXCIuLi9yZWFjdC9yZWFjdG9yL3VzZUVtaXR0ZWRcIjtcbmltcG9ydCB7IHVzZUVtaXR0ZXIgfSBmcm9tIFwiLi4vcmVhY3QvcmVhY3Rvci91c2VFbWl0dGVyXCI7XG5pbXBvcnQgeyBnZXRSb3V0ZVByb3BzQnlQYXRoLCBSb3V0ZVByb3BzIH0gZnJvbSBcIi4vUm91dGVQcm9wc1wiO1xuaW1wb3J0IHsgZ2V0UmVhY3RSb3V0ZXJNZXRhZGF0YSB9IGZyb20gXCIuL1JlYWN0Um91dGVyXCI7XG5pbXBvcnQgeyBBbnlSb3V0ZXIgfSBmcm9tIFwiLi9Sb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckxvY2F0aW9uIH0gZnJvbSBcIi4vUm91dGVyTG9jYXRpb25cIjtcblxuZXhwb3J0IHR5cGUgUmVhY3RSb3V0ZXJWaWV3UHJvcHMgPSB7XG4gIHJvdXRlcjogQW55Um91dGVyO1xuICBoaXN0b3J5OiBIaXN0b3J5O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWN0Um91dGVyVmlldyh7XG4gIHJvdXRlcjogcm9vdFJvdXRlcixcbiAgaGlzdG9yeSxcbn06IFJlYWN0Um91dGVyVmlld1Byb3BzKSB7XG4gIGNvbnN0IFtyb3V0ZSwgc2V0Um91dGVdID0gdXNlU3RhdGUoKCkgPT5cbiAgICBnZXRSb3V0ZVByb3BzQnlQYXRoKHJvb3RSb3V0ZXIsIGhpc3RvcnkubG9jYXRpb24ucGF0aG5hbWUpXG4gICk7XG5cbiAgY29uc3QgZW1pdCA9IHVzZUVtaXR0ZXIoKTtcblxuICB1c2VFbWl0dGVkKFJvdXRlckxvY2F0aW9uLCBsb2NhdGlvbiA9PiB7XG4gICAgaWYgKGxvY2F0aW9uLnJvb3Qucm91dGVyID09PSByb290Um91dGVyKSB7XG4gICAgICBzZXRSb3V0ZSh7XG4gICAgICAgIHR5cGU6IFwiSU5ERVhcIixcbiAgICAgICAgbG9jYXRpb24sXG4gICAgICAgIHBhdGg6IGxvY2F0aW9uLnBhdGgsXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIHVzZUVmZmVjdChcbiAgICAoKSA9PlxuICAgICAgaGlzdG9yeS5saXN0ZW4oKCkgPT4ge1xuICAgICAgICBzZXRSb3V0ZShnZXRSb3V0ZVByb3BzQnlQYXRoKHJvb3RSb3V0ZXIsIGhpc3RvcnkubG9jYXRpb24ucGF0aG5hbWUpKTtcbiAgICAgIH0pLFxuICAgIFtoaXN0b3J5XVxuICApO1xuXG4gIGxldCBjaGlsZHJlbjogUmVhY3ROb2RlID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0IHJvdXRlck1ldGFkYXRhID0gZ2V0UmVhY3RSb3V0ZXJNZXRhZGF0YShyb3V0ZS5sb2NhdGlvbi5yb3V0ZXIpO1xuICBpZiAocm91dGVyTWV0YWRhdGEucmVuZGVyZXIpIHtcbiAgICBjaGlsZHJlbiA9IHJvdXRlck1ldGFkYXRhLnJlbmRlcmVyKHtcbiAgICAgIGVtaXQsXG4gICAgICByb3V0ZSxcbiAgICAgIGxvY2F0aW9uOiByb3V0ZS5sb2NhdGlvbixcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAoY29uc3QgbG9jYXRpb24gb2Ygcm91dGUubG9jYXRpb24uZ2V0UGFyZW50cygpKSB7XG4gICAgY29uc3Qgcm91dGVyTWV0YWRhdGEgPSBnZXRSZWFjdFJvdXRlck1ldGFkYXRhKGxvY2F0aW9uLnJvdXRlcik7XG4gICAgZm9yIChjb25zdCB3cmFwcGVyIG9mIHJvdXRlck1ldGFkYXRhLndyYXBwZXJzKSB7XG4gICAgICBjaGlsZHJlbiA9IHdyYXBwZXIoe1xuICAgICAgICBlbWl0LFxuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgbG9jYXRpb24sXG4gICAgICAgIHJvdXRlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoRnJhZ21lbnQsIG51bGwsIGNoaWxkcmVuKTtcbn1cbiIsImltcG9ydCB7IGdldE5leHRQYXRoIH0gZnJvbSBcIi4uL2NvbW1vbi9nZXROZXh0UGF0aFwiO1xuaW1wb3J0IHsgdGVzdE1ldGFUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9NZXRhVHlwZVwiO1xuaW1wb3J0IHsgUGF5bG9hZCB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgQW55Um91dGVyLCBSb3V0ZXIgfSBmcm9tIFwiLi9Sb3V0ZXJcIjtcbmltcG9ydCB7IEFueVJvdXRlckxvY2F0aW9uLCBSb3V0ZXJMb2NhdGlvbiB9IGZyb20gXCIuL1JvdXRlckxvY2F0aW9uXCI7XG5cbmV4cG9ydCB0eXBlIFJvdXRlUHJvcHMgPSBQYXlsb2FkPFxuICB7XG4gICAgSU5ERVg6IHt9O1xuICAgIERFRkFVTFQ6IHtcbiAgICAgIGRlZmF1bHRQYXRoOiBzdHJpbmc7XG4gICAgfTtcbiAgICBOT19QQVJBTToge1xuICAgICAgcGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICAgICAgcGFyYW1LZXk6IHN0cmluZztcbiAgICAgIHBhcmFtSW5kZXg6IG51bWJlcjtcbiAgICB9O1xuICB9LFxuICB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGxvY2F0aW9uOiBBbnlSb3V0ZXJMb2NhdGlvbjtcbiAgfVxuPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvdXRlUHJvcHNCeVBhdGgoXG4gIHJvdXRlcjogQW55Um91dGVyLFxuICBwYXRoOiBzdHJpbmdcbik6IFJvdXRlUHJvcHMge1xuICBsZXQgbG9jYXRpb24gPSBSb3V0ZXJMb2NhdGlvbi5jcmVhdGUocm91dGVyKTtcbiAgY29uc3QgYmFzZVByb3BzID0geyBwYXRoIH07XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBkZWZhdWx0UGF0aCA9IHBhdGg7XG4gICAgbGV0IG5hbWU6IHN0cmluZztcbiAgICBbbmFtZSwgcGF0aF0gPSBnZXROZXh0UGF0aChwYXRoKTtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHJldHVybiB7IC4uLmJhc2VQcm9wcywgdHlwZTogXCJJTkRFWFwiLCBsb2NhdGlvbiB9O1xuICAgIH1cbiAgICBjb25zdCByb3V0ZXIgPSBsb2NhdGlvbi5yb3V0ZXIuY2hpbGRyZW5bbmFtZV07XG4gICAgaWYgKCFyb3V0ZXIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2VQcm9wcyxcbiAgICAgICAgdHlwZTogXCJERUZBVUxUXCIsXG4gICAgICAgIGxvY2F0aW9uLFxuICAgICAgICBkZWZhdWx0UGF0aCxcbiAgICAgIH07XG4gICAgfVxuICAgIGxldCBwYXJhbXMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFtwYXJhbUluZGV4LCBwYXJhbUtleV0gb2Ygcm91dGVyLnBhcmFtcy5lbnRyaWVzKCkpIHtcbiAgICAgIGxldCB2YWx1ZTogc3RyaW5nO1xuICAgICAgW3ZhbHVlLCBwYXRoXSA9IGdldE5leHRQYXRoKHBhdGgpO1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmJhc2VQcm9wcyxcbiAgICAgICAgICB0eXBlOiBcIk5PX1BBUkFNXCIsXG4gICAgICAgICAgbG9jYXRpb24sXG4gICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgIHBhcmFtSW5kZXgsXG4gICAgICAgICAgcGFyYW1LZXksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBwYXJhbXNbcGFyYW1LZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGxvY2F0aW9uID0gbmV3IFJvdXRlckxvY2F0aW9uKHJvdXRlciwgcGFyYW1zLCBsb2NhdGlvbiwgbmFtZSk7XG4gIH1cbn1cbnRlc3RNZXRhVHlwZShSb3V0ZXIoW1wicFwiXSksIHQgPT4ge1xuICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gIHQuVFJvdXRlci5QYXJhbXMueDtcblxuICB0LlRSb3V0ZXIuUGFyYW1zLnA7XG59KTtcbnRlc3RNZXRhVHlwZShSb3V0ZXIoeyBhOiBSb3V0ZXIoW1wicFwiXSkgfSksIHQgPT4ge1xuICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gIHQuVFJvdXRlci5QYXJhbXMueDtcblxuICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gIHQuVFJvdXRlci5DaGlsZHJlbi5hLlBhcmFtcy54O1xuXG4gIHQuVFJvdXRlci5DaGlsZHJlbi5hLlBhcmFtcy5wO1xufSk7XG5cbnRlc3RNZXRhVHlwZShcbiAgUm91dGVyKHtcbiAgICBhOiBSb3V0ZXIoW1wicFwiXSwge1xuICAgICAgYWE6IFJvdXRlcihbXCJwcFwiXSksXG4gICAgfSksXG4gIH0pLFxuICB0ID0+IHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgdC5UUm91dGVyLlBhcmFtcy54O1xuXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHQuVFJvdXRlci5DaGlsZHJlbi5hLlBhcmFtcy54O1xuXG4gICAgdC5UUm91dGVyLkNoaWxkcmVuLmEuUGFyYW1zLnA7XG5cbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgdC5UUm91dGVyLkNoaWxkcmVuLmEuQ2hpbGRyZW4uYWEuUGFyYW1zLng7XG5cbiAgICB0LlRSb3V0ZXIuQ2hpbGRyZW4uYS5DaGlsZHJlbi5hYS5QYXJhbXMucHA7XG4gIH1cbik7XG4iLCJpbXBvcnQgeyBXZWFrTWFwRmFjdG9yeSB9IGZyb20gXCIuLi9jb21tb24vbWFwL21hcEZhY3RvcnlcIjtcbmltcG9ydCB7IE1ldGFUeXBlLCBXaXRoTWV0YVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL01ldGFUeXBlXCI7XG5pbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7IEV4cGVjdCwgSWZOZXZlciwgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3NcIjtcblxuZXhwb3J0IHR5cGUgQW55Um91dGVyTWFwID0gUmVjb3JkPHN0cmluZywgUm91dGVyPFRSb3V0ZXI+PjtcblxuZXhwb3J0IHR5cGUgVFJvdXRlciA9IHtcbiAgUGFyZW50PzogVFJvdXRlcjtcbiAgUGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBTdGFjazogUmVjb3JkPHN0cmluZywgVFJvdXRlcj47XG4gIENoaWxkcmVuOiBSZWNvcmQ8c3RyaW5nLCBUUm91dGVyPjtcbn07XG5cbmV4cG9ydCB0eXBlIFJvdXRlclByb3BzID0gdHlwZW9mIFJvdXRlclR5cGUgJiBSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVSb3V0ZXI+O1xuXG5leHBvcnQgdHlwZSBURW1wdHlSb3V0ZXIgPSBFeHBlY3Q8XG4gIFRSb3V0ZXIsXG4gIE92ZXJyaWRlPFxuICAgIFRSb3V0ZXIsXG4gICAge1xuICAgICAgU3RhY2s6IHt9O1xuICAgICAgQ2hpbGRyZW46IHt9O1xuICAgICAgUGFyYW1zOiB7fTtcbiAgICB9XG4gID5cbj47XG5leHBvcnQgdHlwZSBSb3V0ZXJNYXBUeXBlPFQgZXh0ZW5kcyBBbnlSb3V0ZXJNYXA+ID0ge1xuICBbSyBpbiBrZXlvZiBUXTogUm91dGVyVHlwZTxUW0tdPjtcbn07XG5leHBvcnQgdHlwZSBSb3V0ZXJXaXRoQ2hpbGRyZW48XG4gIEMgZXh0ZW5kcyBBbnlSb3V0ZXJNYXAsXG4gIFAgZXh0ZW5kcyBvYmplY3QgPSB7fVxuPiA9IFJvdXRlcjxcbiAgT3ZlcnJpZGU8XG4gICAgUCAmIFRFbXB0eVJvdXRlcixcbiAgICB7XG4gICAgICBDaGlsZHJlbjogUm91dGVyTWFwVHlwZTxDPjtcbiAgICB9XG4gID5cbj47XG5leHBvcnQgdHlwZSBSb3V0ZXJXaXRoUGFyYW1zPFxuICBQIGV4dGVuZHMgc3RyaW5nLFxuICBDIGV4dGVuZHMgQW55Um91dGVyTWFwID0ge31cbj4gPSBSb3V0ZXI8XG4gIE92ZXJyaWRlPFxuICAgIFRFbXB0eVJvdXRlcixcbiAgICB7XG4gICAgICBQYXJhbXM6IFJlY29yZDxQLCBzdHJpbmc+O1xuICAgICAgQ2hpbGRyZW46IFJvdXRlck1hcFR5cGU8Qz47XG4gICAgfVxuICA+XG4+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlcjxUIGV4dGVuZHMgVFJvdXRlciA9IFRFbXB0eVJvdXRlcj5cbiAgZXh0ZW5kcyBXaXRoTWV0YVR5cGU8eyBUUm91dGVyOiBUIH0+LFxuICAgIFJvdXRlclByb3BzIHt9XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlcihwYXJhbXM6IHN0cmluZ1tdLCBjaGlsZHJlbjogUmVjb3JkPHN0cmluZywgQW55Um91dGVyPikge1xuICByZXR1cm4ge1xuICAgIGNoaWxkcmVuLFxuICAgIHBhcmFtcyxcbiAgICBiYXNlczogbmV3IFNldDxBbnlSb3V0ZXI+KCksXG4gIH07XG59XG5leHBvcnQgdHlwZSBSb3V0ZXJUeXBlPFQgZXh0ZW5kcyBBbnlSb3V0ZXI+ID0gTWV0YVR5cGU8VD5bXCJUUm91dGVyXCJdO1xuXG5leHBvcnQgdHlwZSBBbnlSb3V0ZXIgPSBSb3V0ZXI8VFJvdXRlcj47XG5cbmV4cG9ydCBmdW5jdGlvbiBSb3V0ZXIoKTogUm91dGVyPHtcbiAgUGFyYW1zOiB7fTtcbiAgU3RhY2s6IHt9O1xuICBDaGlsZHJlbjoge307XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJvdXRlcjxDIGV4dGVuZHMgQW55Um91dGVyTWFwPihcbiAgY2hpbGRyZW46IENcbik6IFJvdXRlcjx7XG4gIFBhcmFtczoge307XG4gIFN0YWNrOiB7fTtcbiAgQ2hpbGRyZW46IFJvdXRlck1hcFR5cGU8Qz47XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJvdXRlcjxLIGV4dGVuZHMgc3RyaW5nPihcbiAgcGFyYW1zOiBLW11cbik6IFJvdXRlcjx7XG4gIFBhcmFtczogUmVjb3JkPHN0cmluZyAmIEssIHN0cmluZz47XG4gIFN0YWNrOiB7fTtcbiAgQ2hpbGRyZW46IHt9O1xufT47XG5leHBvcnQgZnVuY3Rpb24gUm91dGVyPEsgZXh0ZW5kcyBzdHJpbmcsIEMgZXh0ZW5kcyBBbnlSb3V0ZXJNYXA+KFxuICBwYXJhbXM6IEtbXSxcbiAgY2hpbGRyZW46IENcbik6IFJvdXRlcjx7XG4gIFBhcmFtczogUmVjb3JkPHN0cmluZyAmIEssIHN0cmluZz47XG4gIFN0YWNrOiB7fTtcbiAgQ2hpbGRyZW46IFJvdXRlck1hcFR5cGU8Qz47XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJvdXRlcihwYXJhbXNPckNoaWxkcmVuPywgbWF5YmVDaGlsZHJlbj8pIHtcbiAgbGV0IHBhcmFtcywgY2hpbGRyZW47XG4gIGlmIChtYXliZUNoaWxkcmVuKSB7XG4gICAgW3BhcmFtcywgY2hpbGRyZW5dID0gW3BhcmFtc09yQ2hpbGRyZW4sIG1heWJlQ2hpbGRyZW5dO1xuICB9IGVsc2Uge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtc09yQ2hpbGRyZW4pKSB7XG4gICAgICBbcGFyYW1zLCBjaGlsZHJlbl0gPSBbcGFyYW1zT3JDaGlsZHJlbiwge31dO1xuICAgIH0gZWxzZSB7XG4gICAgICBbcGFyYW1zLCBjaGlsZHJlbl0gPSBbW10sIHBhcmFtc09yQ2hpbGRyZW4gfHwge31dO1xuICAgIH1cbiAgfVxuICByZXR1cm4gT2JqZWN0LnNldFByb3RvdHlwZU9mKGNyZWF0ZVJvdXRlcihwYXJhbXMsIGNoaWxkcmVuKSwgUm91dGVyVHlwZSk7XG59XG5cbmV4cG9ydCB0eXBlIFJvdXRlckF0PFxuICBUIGV4dGVuZHMgVFJvdXRlciwgLy9cbiAgSyBleHRlbmRzIGtleW9mIFRbXCJDaGlsZHJlblwiXVxuPiA9IFJvdXRlcjxcbiAgVFtcIkNoaWxkcmVuXCJdW0tdICYge1xuICAgIFBhcmVudDogVDtcbiAgICBTdGFjazogVFtcIlN0YWNrXCJdICYgUmVjb3JkPEssIFRbXCJDaGlsZHJlblwiXVtLXT47XG4gIH1cbj47XG5cbmV4cG9ydCBuYW1lc3BhY2UgUm91dGVyVHlwZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBhdDxUIGV4dGVuZHMgVFJvdXRlciwgSyBleHRlbmRzIGtleW9mIFRbXCJDaGlsZHJlblwiXT4oXG4gICAgdGhpczogUm91dGVyPFQ+LFxuICAgIGtleTogc3RyaW5nICYgS1xuICApOiBSb3V0ZXJBdDxULCBLPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGF0PFQgZXh0ZW5kcyBUUm91dGVyLCBLIGV4dGVuZHMga2V5b2YgVFtcIkNoaWxkcmVuXCJdPihcbiAgICB0aGlzOiBSb3V0ZXI8VD4sXG4gICAga2V5OiBzdHJpbmcgJiBLLFxuICAgIGNhbGxiYWNrOiAocm91dGVyOiBSb3V0ZXJBdDxULCBLPikgPT4gdm9pZFxuICApOiBSb3V0ZXI8VD47XG4gIGV4cG9ydCBmdW5jdGlvbiBhdCh0aGlzOiBBbnlSb3V0ZXIsIGtleSwgY2FsbGJhY2s/KSB7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayh0aGlzLmNoaWxkcmVuW2tleV0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuW2tleV07XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlPFQgZXh0ZW5kcyBUUm91dGVyPih0aGlzOiBSb3V0ZXI8VD4pOiBSb3V0ZXI8VD4ge1xuICAgIGNvbnN0IHJvdXRlciA9IFJvdXRlcihcbiAgICAgIHRoaXMucGFyYW1zLFxuICAgICAgbWFwT2JqZWN0KHRoaXMuY2hpbGRyZW4sIGMgPT4gYy5jcmVhdGUoKSlcbiAgICApIGFzIFJvdXRlcjxUPjtcblxuICAgIHJvdXRlci5iYXNlcy5hZGQodGhpcyk7XG4gICAgZm9yIChjb25zdCBiYXNlIG9mIHRoaXMuYmFzZXMpIHtcbiAgICAgIHJvdXRlci5iYXNlcy5hZGQoYmFzZSk7XG4gICAgfVxuICAgIHJldHVybiByb3V0ZXI7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gaXNSb3V0ZXJPZih0aGlzOiBBbnlSb3V0ZXIsIGJhc2U6IEFueVJvdXRlcikge1xuICAgIHJldHVybiB0aGlzID09PSBiYXNlIHx8IHRoaXMuYmFzZXMuaGFzKGJhc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyByZXZlcnNlZCB9IGZyb20gXCIuLi9jb21tb24vYXJyYXkvcmV2ZXJzZWRcIjtcbmltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi4vY29tbW9uL29iamVjdC9lbnRyaWVzXCI7XG5pbXBvcnQgeyBMYXp5IH0gZnJvbSBcIi4uL2NvbW1vbi9wYXR0ZXJucy9sYXp5XCI7XG5pbXBvcnQge1xuICBIYXNLZXlzLFxuICBJc05ldmVyLFxuICBJc1VuZGVmaW5lZCxcbiAgT21pdEtleXMsXG4gIE92ZXJyaWRlLFxufSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IGpvaW5VcmwgfSBmcm9tIFwiLi4vY29tbW9uL3N0cmluZy9qb2luVXJsXCI7XG5pbXBvcnQgeyBpbnNwZWN0IH0gZnJvbSBcIi4uL2xvZ2dpbmcvaW5zcGVjdFwiO1xuaW1wb3J0IHsgQW55Um91dGVyLCBSb3V0ZXIsIFJvdXRlckF0LCBSb3V0ZXJUeXBlLCBUUm91dGVyIH0gZnJvbSBcIi4vUm91dGVyXCI7XG5cbmV4cG9ydCB0eXBlIEFueVJvdXRlckxvY2F0aW9uID0gUm91dGVyTG9jYXRpb248VFJvdXRlcj47XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyTG9jYXRpb248VCBleHRlbmRzIFRSb3V0ZXI+IHt9XG5leHBvcnQgY2xhc3MgUm91dGVyTG9jYXRpb248VCBleHRlbmRzIFRSb3V0ZXI+IHtcbiAgc3RhdGljIGNyZWF0ZTxUIGV4dGVuZHMgVFJvdXRlcj4ocm91dGVyOiBSb3V0ZXI8VD4pOiBSb3V0ZXJMb2NhdGlvbjxUPiB7XG4gICAgaWYgKHJvdXRlci5wYXJhbXMubGVuZ3RoKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBjcmVhdGUgUm91dGVyTG9jYXRpb24gZm9yICR7aW5zcGVjdCh0aGlzKX0uYCk7XG4gICAgcmV0dXJuIG5ldyBSb3V0ZXJMb2NhdGlvbihyb3V0ZXIsIHt9LCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG4gIH1cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9yb3V0ZXI6IEFueVJvdXRlcixcbiAgICBwcm90ZWN0ZWQgX3BhcmFtczogYW55LFxuICAgIHByb3RlY3RlZCBfcGFyZW50OiBBbnlSb3V0ZXJMb2NhdGlvbiB8IHVuZGVmaW5lZCxcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4gICkge31cblxuICBATGF6eSgpIGdldCBwYXRoKCk6IHN0cmluZyB7XG4gICAgbGV0IHBhdGg6IHN0cmluZyA9IGpvaW5VcmwodGhpcy5fcGFyZW50Py5wYXRoIHx8IFwiXCIsIHRoaXMubmFtZSk7XG4gICAgZm9yIChjb25zdCBwYXJhbUtleSBvZiB0aGlzLl9yb3V0ZXIucGFyYW1zKSB7XG4gICAgICBwYXRoID0gam9pblVybChwYXRoLCB0aGlzLl9wYXJhbXNbcGFyYW1LZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXQgcGFyZW50KCk6IFRbXCJQYXJlbnRcIl0gZXh0ZW5kcyBUUm91dGVyXG4gICAgPyBSb3V0ZXJMb2NhdGlvbjxUW1wiUGFyZW50XCJdPlxuICAgIDogdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50IGFzIGFueTtcbiAgfVxuXG4gIGdldCByb290KCk6IEFueVJvdXRlckxvY2F0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50Py5yb290IHx8ICh0aGlzIGFzIGFueSk7XG4gIH1cblxuICBnZXQgcm91dGVyKCk6IFJvdXRlcjxUPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JvdXRlciBhcyBSb3V0ZXI8VD47XG4gIH1cblxuICBnZXQgcGFyYW1zKCk6IFRbXCJQYXJhbXNcIl0ge1xuICAgIHJldHVybiB0aGlzLl9wYXJhbXM7XG4gIH1cblxuICBhdDxUIGV4dGVuZHMgVFJvdXRlciwgSyBleHRlbmRzIGtleW9mIFRbXCJDaGlsZHJlblwiXT4oXG4gICAgdGhpczogUm91dGVyTG9jYXRpb248VD4sXG4gICAga2V5OiBzdHJpbmcgJiBLLFxuICAgIC4uLltwYXJhbXNdOiBIYXNLZXlzPFRbXCJDaGlsZHJlblwiXVtLXVtcIlBhcmFtc1wiXT4gZXh0ZW5kcyBmYWxzZVxuICAgICAgPyBbXVxuICAgICAgOiBbVFtcIkNoaWxkcmVuXCJdW0tdW1wiUGFyYW1zXCJdXVxuICApOiBSb3V0ZXJMb2NhdGlvbjxSb3V0ZXJUeXBlPFJvdXRlckF0PFQsIEs+Pj4ge1xuICAgIHJldHVybiA8YW55PihcbiAgICAgIG5ldyBSb3V0ZXJMb2NhdGlvbihcbiAgICAgICAgdGhpcy5fcm91dGVyLmNoaWxkcmVuW2tleV0sXG4gICAgICAgIHBhcmFtcyB8fCB7fSxcbiAgICAgICAgdGhpcyBhcyBhbnksXG4gICAgICAgIGtleVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBhdFN0YWNrPFQgZXh0ZW5kcyBUUm91dGVyLCBLIGV4dGVuZHMga2V5b2YgVFtcIlN0YWNrXCJdPihcbiAgICB0aGlzOiBSb3V0ZXJMb2NhdGlvbjxUPixcbiAgICBrZXk6IEtcbiAgKTogUm91dGVyTG9jYXRpb248VFtcIlN0YWNrXCJdW0tdPiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH1cblxuICAqZ2V0UGFyZW50cyh0aGlzOiBBbnlSb3V0ZXJMb2NhdGlvbikge1xuICAgIGZvciAobGV0IHBhcmVudCA9IHRoaXM7IHBhcmVudDsgcGFyZW50ID0gcGFyZW50LnBhcmVudCEpIHtcbiAgICAgIHlpZWxkIHBhcmVudDtcbiAgICB9XG4gIH1cblxuICAqZ2V0UGFyZW50c0NoaWxkcmVuKHRoaXM6IEFueVJvdXRlckxvY2F0aW9uKSB7XG4gICAgZm9yIChsZXQgW25hbWUsIHJvdXRlcl0gb2YgZW50cmllcyh0aGlzLl9yb3V0ZXIuY2hpbGRyZW4pKSB7XG4gICAgICBpZiAocm91dGVyLnBhcmFtcy5sZW5ndGgpIGNvbnRpbnVlO1xuICAgICAgeWllbGQgbmV3IFJvdXRlckxvY2F0aW9uKHJvdXRlciwge30sIHRoaXMsIG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gICpnZXRDaGlsZHJlbih0aGlzOiBBbnlSb3V0ZXJMb2NhdGlvbik6IEl0ZXJhYmxlSXRlcmF0b3I8QW55Um91dGVyTG9jYXRpb24+IHtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCByb3V0ZXJdIG9mIGVudHJpZXModGhpcy5fcm91dGVyLmNoaWxkcmVuKSkge1xuICAgICAgaWYgKCFyb3V0ZXIucGFyYW1zLmxlbmd0aCkge1xuICAgICAgICB5aWVsZCBuZXcgUm91dGVyTG9jYXRpb24ocm91dGVyLCB7fSwgdGhpcywgbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkICpmaW5kQ2hpbGRyZW4oXG4gICAgdGhpczogQW55Um91dGVyTG9jYXRpb25cbiAgKTogSXRlcmFibGVJdGVyYXRvcjxBbnlSb3V0ZXJMb2NhdGlvbj4ge1xuICAgIHlpZWxkKiB0aGlzLmdldENoaWxkcmVuKCk7XG4gICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5nZXRDaGlsZHJlbigpKSB7XG4gICAgICB5aWVsZCogY2hpbGQuZmluZENoaWxkcmVuKCk7XG4gICAgfVxuICB9XG5cbiAgKmZpbmRQYXJlbnRzKHRoaXM6IEFueVJvdXRlckxvY2F0aW9uKSB7XG4gICAgbGV0IHJvb3Q6IEFueVJvdXRlckxvY2F0aW9uIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGxldCBwYXJlbnRSb3V0ZXJzID0gbmV3IFNldDxBbnlSb3V0ZXI+KCk7XG4gICAgZm9yIChjb25zdCBwYXJlbnQgb2YgdGhpcy5nZXRQYXJlbnRzKCkpIHtcbiAgICAgIHBhcmVudFJvdXRlcnMuYWRkKHBhcmVudC5yb3V0ZXIpO1xuICAgICAgeWllbGQgKHJvb3QgPSBwYXJlbnQpO1xuICAgIH1cbiAgICBpZiAocm9vdCkge1xuICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiByb290LmZpbmRDaGlsZHJlbigpKSB7XG4gICAgICAgIGlmICghcGFyZW50Um91dGVycy5oYXMoY2hpbGQucm91dGVyKSkge1xuICAgICAgICAgIHlpZWxkIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9maW5kKFxuICAgIGxvY2F0aW9uczogSXRlcmFibGU8QW55Um91dGVyTG9jYXRpb24+LFxuICAgIHJvdXRlcjogQW55Um91dGVyXG4gICk6IEFueVJvdXRlckxvY2F0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGxvY2F0aW9ucykge1xuICAgICAgaWYgKGNoaWxkLnJvdXRlci5pc1JvdXRlck9mKHJvdXRlcikpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkIGFzIEFueVJvdXRlckxvY2F0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZpbmQ8VCBleHRlbmRzIFRSb3V0ZXI+KFxuICAgIHRoaXM6IEFueVJvdXRlckxvY2F0aW9uLFxuICAgIHJvdXRlcjogUm91dGVyPFQ+XG4gICk6XG4gICAgfCBSb3V0ZXJMb2NhdGlvbjxPdmVycmlkZTxULCBQaWNrPFRSb3V0ZXIsIFwiUGFyZW50XCIgfCBcIlN0YWNrXCI+Pj5cbiAgICB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmQodGhpcy5maW5kUGFyZW50cygpLCByb3V0ZXIpIGFzIGFueTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzXCI7XG5cbmNvbnN0IHJlc3VsdFN5bWJvbCA9IFN5bWJvbCgpO1xuXG5leHBvcnQgdHlwZSBDb25maWdGYWN0b3J5UmVzdWx0PEM+ID0gQXdhaXRhYmxlPHsgW3Jlc3VsdFN5bWJvbF06IEMgfT47XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0ZhY3RvcnlGbjxDPiA9IChjb25maWc6IEMpID0+IENvbmZpZ0ZhY3RvcnlSZXN1bHQ8Qz47XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0ZhY3Rvcnk8QywgVSBleHRlbmRzIGFueVtdID0gW10+ID0gKFxuICAkOiBDb25maWdGYWN0b3J5Rm48Qz4sXG4gIC4uLmFyZ3M6IFVcbikgPT4gQ29uZmlnRmFjdG9yeVJlc3VsdDxDPjtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ0ZhY3Rvcnk8QywgVSBleHRlbmRzIGFueVtdPihcbiAgY29uZmlnOiBDb25maWdGYWN0b3J5PEMsIFU+IHwgdW5kZWZpbmVkLFxuICAuLi5hcmdzOiBVXG4pOiBDIHwgdW5kZWZpbmVkO1xuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ0ZhY3Rvcnk8QywgVSBleHRlbmRzIGFueVtdPihcbiAgY29uZmlnOiBDb25maWdGYWN0b3J5PEMsIFU+LFxuICAuLi5hcmdzOiBVXG4pOiBDO1xuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ0ZhY3RvcnkoY29uZmlnLCBjb250ZXh0LCAuLi5hcmdzKSB7XG4gIGxldCByZXN1bHQgPSBjb25maWc/LihcbiAgICAkID0+IHtcbiAgICAgIHJldHVybiB7IFtyZXN1bHRTeW1ib2xdOiAkIH07XG4gICAgfSxcbiAgICBjb250ZXh0LFxuICAgIC4uLmFyZ3NcbiAgKTtcbiAgaWYgKCFyZXN1bHQgfHwgIShyZXN1bHRTeW1ib2wgaW4gcmVzdWx0KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgWW91IGhhdmUgdG8gdXNlICRgKTtcbiAgfVxuICB3aGlsZSAocmVzdWx0U3ltYm9sIGluIHJlc3VsdCkge1xuICAgIHJlc3VsdCA9IHJlc3VsdFtyZXN1bHRTeW1ib2xdO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyB0b3VjaE1hcCB9IGZyb20gXCIuLi9jb21tb24vbWFwL3RvdWNoTWFwXCI7XG5pbXBvcnQgeyBBd2FpdGFibGUsIEZuLCBJc05ldmVyIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzXCI7XG5cbmNvbnN0IGdlbmVyaWNDb25maWdDYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbmRlY2xhcmUgY29uc3QgaXNHZW5lcmljQ29uZmlnOiB1bmlxdWUgc3ltYm9sO1xuXG5leHBvcnQgdHlwZSBHZW5lcmljQ29uZmlnQ29uZmlndXJlPFxuICBUIGV4dGVuZHMgR2VuZXJpY0NvbmZpZzxGbj5cbj4gPSBUIGV4dGVuZHMgR2VuZXJpY0NvbmZpZzxpbmZlciBVPiA/IFUgOiBuZXZlcjtcbmV4cG9ydCB0eXBlIEdlbmVyaWNDb25maWc8VCBleHRlbmRzIEZuID0gYW55PiA9IHtcbiAgKGNvbmZpZ3VyZTogVCk6IEF3YWl0YWJsZTxSZXR1cm5UeXBlPFQ+PjtcbiAgW2lzR2VuZXJpY0NvbmZpZ10/OiB0cnVlO1xufTtcbmV4cG9ydCB0eXBlIElzR2VuZXJpY0NvbmZpZzxUPiA9IElzTmV2ZXI8VD4gZXh0ZW5kcyB0cnVlXG4gID8gZmFsc2UgfCB0cnVlXG4gIDogVCBleHRlbmRzIEZuXG4gID8gUmVxdWlyZWQ8VD4gZXh0ZW5kcyB7XG4gICAgICBbaXNHZW5lcmljQ29uZmlnXTogdHJ1ZTtcbiAgICB9XG4gICAgPyB0cnVlXG4gICAgOiBmYWxzZVxuICA6IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gR2VuZXJpY0NvbmZpZzxUIGV4dGVuZHMgR2VuZXJpY0NvbmZpZz4oXG4gIGdlbmVyaWNDb25maWc6IFRcbik6IFJldHVyblR5cGU8VD4ge1xuICByZXR1cm4gdG91Y2hNYXAoZ2VuZXJpY0NvbmZpZ0NhY2hlLCBnZW5lcmljQ29uZmlnLCAoKSA9PiB7XG4gICAgcmV0dXJuIGdlbmVyaWNDb25maWcoeCA9PiB4KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBJZiwgSXMgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7XG4gIEFic3RyYWN0UnBjSGFuZGxlcixcbiAgQW55UnBjLFxuICBJUnBjSGFuZGxlcixcbiAgUnBjLFxuICBScGNDb21tYW5kLFxufSBmcm9tIFwiLi9ScGNcIjtcblxuZXhwb3J0IHR5cGUgTm9ScGMgPSBScGM8e1xuICBIYW5kbGVyOiB7fTtcbiAgQ29ubmVjdGlvbjoge307XG4gIENvbmZpZzogdW5kZWZpbmVkO1xuICBQcm9wczoge307XG59PjtcblxuZXhwb3J0IGNvbnN0IE5vUnBjOiBOb1JwYyA9IFJwYzxOb1JwYz4oe1xuICBjb25uZWN0OiAoKSA9PiAoe30pLFxuICBoYW5kbGVyOiBjbGFzc1xuICAgIGV4dGVuZHMgQWJzdHJhY3RScGNIYW5kbGVyPE5vUnBjPlxuICAgIGltcGxlbWVudHMgSVJwY0hhbmRsZXI8Tm9ScGM+IHtcbiAgICBhc3luYyBoYW5kbGUoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG59KTtcbiIsImltcG9ydCB7IHRvdWNoTWFwIH0gZnJvbSBcIi4uL2NvbW1vbi9tYXAvdG91Y2hNYXBcIjtcbmltcG9ydCB7IE1ldGFUeXBlLCBXaXRoTWV0YVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL01ldGFUeXBlXCI7XG5pbXBvcnQgeyBtZXJnZURlc2NyaXB0b3JzIH0gZnJvbSBcIi4uL2NvbW1vbi9vYmplY3QvbWVyZ2VEZXNjcmlwdG9yc1wiO1xuaW1wb3J0IHtcbiAgQXdhaXRhYmxlLFxuICBBd2FpdGVkLFxuICBGbixcbiAgSWYsXG4gIElzLFxuICBJc0VtcHR5T2JqZWN0LFxuICBJc1VuZGVmaW5lZCxcbiAgTm90LFxuICBPdmVycmlkZSxcbiAgUGFydGlhbFVuZGVmaW5lZEtleXMsXG59IGZyb20gXCIuLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgaW5zcGVjdCB9IGZyb20gXCIuLi9sb2dnaW5nL2luc3BlY3RcIjtcbmltcG9ydCB7IENvbmZpZ0ZhY3RvcnkgfSBmcm9tIFwiLi9Db25maWdGYWN0b3J5XCI7XG5pbXBvcnQgeyBHZW5lcmljQ29uZmlnLCBJc0dlbmVyaWNDb25maWcgfSBmcm9tIFwiLi9HZW5lcmljQ29uZmlnXCI7XG5cbmV4cG9ydCB0eXBlIFJwY0NvbW1hbmQgPSAocGF5bG9hZDogYW55KSA9PiBQcm9taXNlPGFueT47XG5cbmV4cG9ydCB0eXBlIFRScGMgPSB7XG4gIEhhbmRsZXI6IG9iamVjdDtcbiAgQ29ubmVjdGlvbjogYW55O1xuICBDb25maWc6IG9iamVjdCB8IHVuZGVmaW5lZDtcbiAgUHJvcHM6IG9iamVjdDtcbn07XG5cbmV4cG9ydCB0eXBlIEFueVJwYyA9IFJwYzxUUnBjPjtcblxuZXhwb3J0IHR5cGUgUnBjPFQgZXh0ZW5kcyBUUnBjPiA9IFdpdGhNZXRhVHlwZTx7XG4gIFRScGM6IFQ7XG59PiAmXG4gIFRbXCJQcm9wc1wiXSAmIHtcbiAgICByZWFkb25seSBvcHRpb25zOiBScGNPcHRpb25zPFRScGM+O1xuXG4gICAgcmVhZG9ubHkgc2VydmljZTogX1JwY0Nvbm5lY3Rpb248VD47XG5cbiAgICBjcmVhdGVScGNDb25uZWN0aW9uKGNvbW1hbmQ6IFJwY0NvbW1hbmQpOiBUW1wiQ29ubmVjdGlvblwiXTtcblxuICAgIC8vIFRPRE86IHJlbmFtZTpcbiAgICAvLyAgLSAqUnBjKiB0byAqKlxuICAgIGNyZWF0ZVJwY0NvbW1hbmQodW5yZXNvbHZlZENvbmZpZzogX1JwY1VucmVzb2x2ZWRDb25maWc8VD4pOiBScGNDb21tYW5kO1xuXG4gICAgcmVzb2x2ZVJwY0NvbmZpZyhcbiAgICAgIHVucmVzb2x2ZWRDb25maWc6IF9ScGNVbnJlc29sdmVkQ29uZmlnPFQ+XG4gICAgKTogUHJvbWlzZTxfUnBjUmVzb2x2ZWRDb25maWc8VD4+O1xuXG4gICAgcmVzb2x2ZVJwY0hhbmRsZXIoXG4gICAgICBjb25maWc6IF9ScGNVbnJlc29sdmVkQ29uZmlnPFQ+XG4gICAgKTogUHJvbWlzZTxfUnBjUmVzb2x2ZWRIYW5kbGVyPFQ+PjtcblxuICAgIGNyZWF0ZVJwY0hhbmRsZXIoXG4gICAgICBjb25maWc6IF9ScGNSZXNvbHZlZENvbmZpZzxUPlxuICAgICk6IFByb21pc2U8X1JwY1Jlc29sdmVkSGFuZGxlcjxUPj47XG4gIH07XG5cbmNvbnN0IHJwY1RvU2VydmljZUhhbmRsZXIgPSBuZXcgV2Vha01hcDxhbnksIEZuPigpO1xuXG5leHBvcnQgZnVuY3Rpb24gUnBjPFIgZXh0ZW5kcyBCYXNlZFJwYywgVCBleHRlbmRzIFRScGMgPSBScGNUeXBlPFI+PihcbiAgb3B0aW9uczogUnBjT3B0aW9uczxUPlxuKTogUnBjPFQ+IHtcbiAgbGV0IHNlcnZpY2U7XG4gIGNvbnN0IHJwYzogUnBjPFQ+ID0gT2JqZWN0LnNldFByb3RvdHlwZU9mKFxuICAgIG1lcmdlRGVzY3JpcHRvcnMob3B0aW9uc1tcInByb3BzXCJdIHx8IHt9LCB7XG4gICAgICBvcHRpb25zLFxuXG4gICAgICBnZXQgc2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICB9LFxuICAgIH0pLFxuICAgIEFueVJwY1xuICApO1xuICBzZXJ2aWNlID0gcnBjLmNyZWF0ZVJwY0Nvbm5lY3Rpb24ocGF5bG9hZCA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IHJwY1RvU2VydmljZUhhbmRsZXIuZ2V0KHJwYyk7XG4gICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICB0aHJvdyBuZXcgUnBjRXJyb3IoYE5vIGhhbmRsZSBmb3Igc2VydmljZS5gKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZXIocGF5bG9hZCk7XG4gIH0pO1xuICByZXR1cm4gcnBjO1xufVxuXG5leHBvcnQgdHlwZSBScGNSZXNvbHZlZENvbmZpZzxUIGV4dGVuZHMgQmFzZWRScGM+ID0gX1JwY1Jlc29sdmVkQ29uZmlnPFxuICBScGNUeXBlPFQ+XG4+O1xuXG5leHBvcnQgdHlwZSBfUnBjUmVzb2x2ZWRDb25maWc8XG4gIFQgZXh0ZW5kcyBUUnBjLFxuICBDb25maWcgPSBOb25OdWxsYWJsZTxUW1wiQ29uZmlnXCJdPlxuPiA9IENvbmZpZyBleHRlbmRzIEZuXG4gID8gSXNHZW5lcmljQ29uZmlnPENvbmZpZz4gZXh0ZW5kcyB0cnVlXG4gICAgPyBBd2FpdGVkPFJldHVyblR5cGU8Q29uZmlnPj5cbiAgICA6IENvbmZpZ1xuICA6IENvbmZpZztcblxuZXhwb3J0IHR5cGUgUnBjUmVzb2x2ZWRIYW5kbGVyPFQgZXh0ZW5kcyBCYXNlZFJwYz4gPSBfUnBjUmVzb2x2ZWRIYW5kbGVyPFxuICBScGNUeXBlPFQ+XG4+O1xuXG50eXBlIF9ScGNSZXNvbHZlZEhhbmRsZXI8VCBleHRlbmRzIFRScGM+ID0gVFtcIkhhbmRsZXJcIl0gJiB7XG4gIGNvbmZpZzogX1JwY1Jlc29sdmVkQ29uZmlnPFQ+O1xuICBycGM6IFJwYzxUPjtcbiAgaGFuZGxlKHBheWxvYWQ6IGFueSk6IEF3YWl0YWJsZTxhbnk+O1xufTtcblxuZXhwb3J0IHR5cGUgSVJwY0hhbmRsZXI8VCBleHRlbmRzIEJhc2VkUnBjPiA9IF9ScGNSZXNvbHZlZEhhbmRsZXI8UnBjVHlwZTxUPj47XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFJwY0hhbmRsZXI8XG4gIFIgZXh0ZW5kcyBBbnlScGMsXG4gIFQgZXh0ZW5kcyBUUnBjID0gUnBjVHlwZTxSPlxuPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBycGM6IFIsIHB1YmxpYyBjb25maWc6IF9ScGNSZXNvbHZlZENvbmZpZzxUPikge31cblxuICBhYnN0cmFjdCBoYW5kbGUocGF5bG9hZDogYW55KTogUHJvbWlzZTxhbnk+O1xufVxuXG5leHBvcnQgdHlwZSBScGNIYW5kbGVyQ2xhc3M8VCBleHRlbmRzIEFueVJwYywgUCA9IHt9PiA9IG5ldyAoXG4gIHJwYzogVCxcbiAgY29uZmlnOiBfUnBjUmVzb2x2ZWRDb25maWc8UnBjVHlwZTxUPj5cbikgPT4gX1JwY1Jlc29sdmVkSGFuZGxlcjxScGNUeXBlPFQ+PiAmIFA7XG5cbmV4cG9ydCB0eXBlIFJwY0lzR2VuZXJpY0NvbmZpZ09wdGlvbjxUIGV4dGVuZHMgUGljazxUUnBjLCBcIkNvbmZpZ1wiPj4gPVxuICB8IElzR2VuZXJpY0NvbmZpZzxUW1wiQ29uZmlnXCJdPlxuICB8IElmPE5vdDxJczxUW1wiQ29uZmlnXCJdLCBGbj4+LCB1bmRlZmluZWQ+O1xuXG5leHBvcnQgdHlwZSBScGNQcm9wc09wdGlvbjxUIGV4dGVuZHMgUGljazxUUnBjLCBcIlByb3BzXCI+PiA9XG4gIHwgVFtcIlByb3BzXCJdXG4gIHwgSWY8SXNFbXB0eU9iamVjdDxUW1wiUHJvcHNcIl0+LCB1bmRlZmluZWQ+O1xuXG5leHBvcnQgdHlwZSBScGNPcHRpb25zPFxuICBUIGV4dGVuZHMgVFJwYyxcbiAgQ29uZmlnSXNGbiBleHRlbmRzIGJvb2xlYW4gPSBJczxUW1wiQ29uZmlnXCJdLCBGbj4sXG4gIENvbmZpZ0lzR2VuZXJpY0NvbmZpZyBleHRlbmRzIGJvb2xlYW4gPSBJc0dlbmVyaWNDb25maWc8VFtcIkNvbmZpZ1wiXT5cbj4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAge1xuICAgIC8vIFRPRE86IGNvbmZpZ1R5cGU6ICdmdW5jdGlvbicgfCAnZ2VuZXJpYycgfCAnb2JqZWN0J1xuICAgIGlzR2VuZXJpY0NvbmZpZzogUnBjSXNHZW5lcmljQ29uZmlnT3B0aW9uPFQ+O1xuXG4gICAgaXNDb25maWdGbjogYm9vbGVhbiB8IElmPE5vdDxJczxUW1wiQ29uZmlnXCJdLCBGbj4+LCB1bmRlZmluZWQ+O1xuXG4gICAgcHJvcHM6IFJwY1Byb3BzT3B0aW9uPFQ+O1xuICB9LFxuICB7XG4gICAgY29ubmVjdCh0aGlzOiBScGM8VD4sIGNvbW1hbmQ6IFJwY0NvbW1hbmQpOiBUW1wiQ29ubmVjdGlvblwiXTtcblxuICAgIGhhbmRsZXI6IFJwY0hhbmRsZXJDbGFzczxScGM8VD4+O1xuICB9XG4+O1xuXG5jb25zdCBycGNUb1VuZGVmaW5lZENvbmZpZyA9IG5ldyBXZWFrTWFwPEFueVJwYywgYW55PigpO1xuY29uc3QgcnBjVG9Db25maWdUb0NvbnRleHQgPSBuZXcgV2Vha01hcDxcbiAgQW55UnBjLFxuICBXZWFrTWFwPGFueSwgUHJvbWlzZTxfUnBjUmVzb2x2ZWRIYW5kbGVyPFRScGM+Pj5cbj4oKTtcblxubGV0IGlzU2VydmljZUhhbmRsZXIgPSBmYWxzZTtcblxuZXhwb3J0IGNvbnN0IEFueVJwYzogQW55UnBjID0ge1xuICBnZXQgb3B0aW9ucygpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9LFxuICBnZXQgc2VydmljZSgpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9LFxuICBjcmVhdGVScGNDb25uZWN0aW9uKGhhbmRsZXIpIHtcbiAgICBpZiAoaXNTZXJ2aWNlSGFuZGxlcikge1xuICAgICAgcnBjVG9TZXJ2aWNlSGFuZGxlci5zZXQodGhpcywgaGFuZGxlcik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY29ubmVjdC5jYWxsKHRoaXMsIGhhbmRsZXIpO1xuICB9LFxuICBhc3luYyBjcmVhdGVScGNIYW5kbGVyKGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgdGhpcy5vcHRpb25zLmhhbmRsZXIodGhpcywgY29uZmlnKTtcbiAgfSxcblxuICBhc3luYyByZXNvbHZlUnBjSGFuZGxlcih1bnJlc29sdmVkQ29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUnBjSGFuZGxlcihhd2FpdCB0aGlzLnJlc29sdmVScGNDb25maWcodW5yZXNvbHZlZENvbmZpZykpO1xuICB9LFxuXG4gIGFzeW5jIHJlc29sdmVScGNDb25maWcoY29uZmlnKTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgICBpZiAoY29uZmlnICYmIHR5cGVvZiBjb25maWcgPT09IFwib2JqZWN0XCIgJiYgXCIkY29udGV4dFwiIGluIGNvbmZpZykge1xuICAgICAgY29uZmlnID0gYXdhaXQgQ29uZmlnRmFjdG9yeShjb25maWcuJGNvbnRleHQsIHRoaXMpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGNvbmZpZyAmJlxuICAgICAgQXJyYXkuaXNBcnJheShjb25maWcpICYmXG4gICAgICBjb25maWcubGVuZ3RoID09PSAxICYmXG4gICAgICB0eXBlb2YgY29uZmlnWzBdID09PSBcImZ1bmN0aW9uXCJcbiAgICApIHtcbiAgICAgIGNvbmZpZyA9IGF3YWl0IENvbmZpZ0ZhY3RvcnkoY29uZmlnWzBdLCB0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmlzR2VuZXJpY0NvbmZpZykge1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBgZXhwZWN0ZWQgdG8gZ2VuZXJpYyBjb25maWcsIGdvdDogJHtpbnNwZWN0KGNvbmZpZyl9YFxuICAgICAgICApO1xuICAgICAgY29uZmlnID0gYXdhaXQgR2VuZXJpY0NvbmZpZyhjb25maWcgYXMgR2VuZXJpY0NvbmZpZyk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5vcHRpb25zLmlzQ29uZmlnRm4gJiYgdHlwZW9mIGNvbmZpZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb25maWcgPSBhd2FpdCBDb25maWdGYWN0b3J5KGNvbmZpZyBhcyBDb25maWdGYWN0b3J5PGFueT4pO1xuICAgIH1cblxuICAgIHJldHVybiBjb25maWcgfHwge307XG4gIH0sXG4gIGNyZWF0ZVJwY0NvbW1hbmQodW5yZXNvbHZlZENvbmZpZykge1xuICAgIGlmICghdW5yZXNvbHZlZENvbmZpZykge1xuICAgICAgdW5yZXNvbHZlZENvbmZpZyA9IHRvdWNoTWFwKHJwY1RvVW5kZWZpbmVkQ29uZmlnLCB0aGlzLCBPYmplY3QpO1xuICAgIH1cbiAgICBsZXQgY29uZmlnO1xuICAgIGxldCBoYXNDb25maWcgPSBmYWxzZTtcbiAgICByZXR1cm4gYXN5bmMgcGF5bG9hZCA9PiB7XG4gICAgICBpZiAoIWhhc0NvbmZpZykge1xuICAgICAgICBjb25maWcgPSBhd2FpdCB0aGlzLnJlc29sdmVScGNDb25maWcodW5yZXNvbHZlZENvbmZpZyk7XG4gICAgICAgIGhhc0NvbmZpZyA9IHRydWU7XG4gICAgICB9XG4gICAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgdG91Y2hNYXAoXG4gICAgICAgIHRvdWNoTWFwKHJwY1RvQ29uZmlnVG9Db250ZXh0LCB0aGlzLCAoKSA9PiBuZXcgV2Vha01hcCgpKSxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICAoKSA9PiB0aGlzLmNyZWF0ZVJwY0hhbmRsZXIoY29uZmlnKVxuICAgICAgKTtcbiAgICAgIHJldHVybiBjb250ZXh0LmhhbmRsZShwYXlsb2FkKTtcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IHR5cGUgQmFzZWRScGM8VCBleHRlbmRzIFRScGMgPSBUUnBjPiA9IFdpdGhNZXRhVHlwZTx7IFRScGM6IFQgfT47XG5cbmV4cG9ydCB0eXBlIFJwY1R5cGU8VCBleHRlbmRzIEJhc2VkUnBjPiA9IE1ldGFUeXBlPFQ+W1wiVFJwY1wiXTtcblxuZXhwb3J0IHR5cGUgUnBjSG9vazxSIGV4dGVuZHMgQmFzZWRScGMsIFQgZXh0ZW5kcyBQYXJ0aWFsPFRScGM+PiA9IFJwYzxcbiAgRXh0cmFjdDxPdmVycmlkZTxScGNUeXBlPFI+LCBUPiwgVFJwYz5cbj47XG5cbnR5cGUgX1JwY1VucmVzb2x2ZWRDb25maWc8VCBleHRlbmRzIFRScGM+ID1cbiAgfCBUW1wiQ29uZmlnXCJdXG4gIHwgSWY8Tm90PElzPFRbXCJDb25maWdcIl0sIEZuPj4sIENvbmZpZ0ZhY3Rvcnk8VFtcIkNvbmZpZ1wiXT4+XG4gIC8vIFRPRE86ICRjb25maWdDb250ZXh0LCAkZ2VuZXJpY0NvbmZpZ0NvbnRleHRcbiAgfCB7XG4gICAgICAkY29udGV4dDogQ29uZmlnRmFjdG9yeTxUW1wiQ29uZmlnXCJdLCBbUnBjPFQ+XT47XG4gICAgfTtcblxuZXhwb3J0IHR5cGUgUnBjVW5yZXNvbHZlZENvbmZpZzxUIGV4dGVuZHMgQmFzZWRScGM+ID0gX1JwY1VucmVzb2x2ZWRDb25maWc8XG4gIFJwY1R5cGU8VD5cbj47XG5cbmV4cG9ydCB0eXBlIFJwY0NvbmZpZzxUIGV4dGVuZHMgQmFzZWRScGM+ID0gUnBjVHlwZTxUPltcIkNvbmZpZ1wiXTtcblxuZXhwb3J0IHR5cGUgUnBjVW5kZWZpbmVkQ29uZmlnPFQgZXh0ZW5kcyBCYXNlZFJwYz4gPSBJZjxcbiAgSXNVbmRlZmluZWQ8UnBjVW5yZXNvbHZlZENvbmZpZzxUPj4sXG4gIHVuZGVmaW5lZFxuPjtcblxuZXhwb3J0IGNsYXNzIFJwY0Vycm9yIGV4dGVuZHMgRXJyb3Ige31cblxuZXhwb3J0IHR5cGUgUnBjSGFuZGxlcjxUIGV4dGVuZHMgQW55UnBjPiA9IFJwY1R5cGU8VD5bXCJIYW5kbGVyXCJdO1xuZXhwb3J0IHR5cGUgUnBjQ29ubmVjdGlvbjxUIGV4dGVuZHMgQmFzZWRScGM+ID0gX1JwY0Nvbm5lY3Rpb248UnBjVHlwZTxUPj47XG5cbnR5cGUgX1JwY0Nvbm5lY3Rpb248VCBleHRlbmRzIFRScGM+ID0gVFtcIkNvbm5lY3Rpb25cIl0gJiBCYXNlZFJwYzxUPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVJwY1NlcnZpY2U8VCBleHRlbmRzIEFueVJwYz4oXG4gIHJwYzogVCxcbiAgY29tbWFuZDogUnBjQ29tbWFuZFxuKTogUnBjQ29ubmVjdGlvbjxUPiB7XG4gIGlzU2VydmljZUhhbmRsZXIgPSB0cnVlO1xuICBjb25zdCBjb25uZWN0aW9uID0gcnBjLmNyZWF0ZVJwY0Nvbm5lY3Rpb24oY29tbWFuZCk7XG4gIGlzU2VydmljZUhhbmRsZXIgPSBmYWxzZTtcbiAgcmV0dXJuIGNvbm5lY3Rpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmVScGNTZXJ2aWNlPFQgZXh0ZW5kcyBBbnlScGM+KFxuICBycGM6IFQsXG4gIGNvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxUPlxuKTogUnBjQ29ubmVjdGlvbjxUPiB7XG4gIHJldHVybiBoYW5kbGVScGNTZXJ2aWNlKHJwYywgcnBjLmNyZWF0ZVJwY0NvbW1hbmQoY29uZmlnKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBScGNDb25maWc8VCBleHRlbmRzIEFueVJwYz4oXG4gIHJwYzogVCxcbiAgY29uZmlnOiBScGNVbnJlc29sdmVkQ29uZmlnPFQ+XG4pOiBScGNVbnJlc29sdmVkQ29uZmlnPFQ+IHtcbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCB7IEF3YWl0ZWQsIEZuLCBJZiwgTm90LCBQYXJ0aWFsVW5kZWZpbmVkS2V5cyB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgQ29uZmlnRmFjdG9yeSB9IGZyb20gXCIuL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7IEdlbmVyaWNDb25maWcsIElzR2VuZXJpY0NvbmZpZyB9IGZyb20gXCIuL0dlbmVyaWNDb25maWdcIjtcbmltcG9ydCB7IEFueVJwYywgUnBjSG9vaywgUnBjVHlwZSwgUnBjVW5yZXNvbHZlZENvbmZpZywgVFJwYyB9IGZyb20gXCIuL1JwY1wiO1xuXG5leHBvcnQgdHlwZSBScGNDb25maWdIb29rPFxuICBUIGV4dGVuZHMgVENvbmZpZ0hvb2sgJiB7XG4gICAgUHJvcHM/OiBvYmplY3Q7XG4gIH1cbj4gPSBScGNIb29rPFxuICBUW1wiVGFyZ2V0XCJdLFxuICB7XG4gICAgVENvbmZpZ0hvb2s6IFQ7XG4gICAgQ29uZmlnOiBUW1wiQ29uZmlnXCJdO1xuICB9XG4+ICZcbiAgTm9uTnVsbGFibGU8VFtcIlByb3BzXCJdPjtcblxuZXhwb3J0IHR5cGUgVENvbmZpZ0hvb2sgPSB7XG4gIFRhcmdldDogQW55UnBjO1xuICBDb25maWc6IFRScGNbXCJDb25maWdcIl07XG4gIFByb3BzPzogb2JqZWN0O1xufTtcbmV4cG9ydCB0eXBlIEFueVJwY0NvbmZpZ0hvb2sgPSBScGNDb25maWdIb29rPHtcbiAgVGFyZ2V0OiBBbnlScGM7XG4gIENvbmZpZzogVFJwY1tcIkNvbmZpZ1wiXTtcbn0+O1xuXG4vLyBUT0RPOiBfR2VuZXJpY1RvR2VuZXJpY0NvbmZpZ1xuLy8gVE9ETzogX0NvbmZpZ1RvR2VuZXJpY0NvbmZpZ1xuLy8gVE9ETzogX0NvbmZpZ1RvQ29uZmlnXG4vLyBUT0RPOiBfR2VuZXJpY0NvbmZpZ1RvQ29uZmlnXG50eXBlIF9HZW5lcmljQ29uZmlnSGFuZGxlcjxUIGV4dGVuZHMgVENvbmZpZ0hvb2s+ID0gKF86IHtcbiAgY29uZmlnOiBBd2FpdGVkPFJldHVyblR5cGU8RXh0cmFjdDxUW1wiQ29uZmlnXCJdLCBGbj4+PjtcbiAgdGFyZ2V0OiBUW1wiVGFyZ2V0XCJdO1xuICBwcm9wczogVFtcIlByb3BzXCJdO1xufSkgPT4gQ29uZmlnRmFjdG9yeTxScGNVbnJlc29sdmVkQ29uZmlnPFRbXCJUYXJnZXRcIl0+PjtcblxudHlwZSBfQ29uZmlnSGFuZGxlcjxUIGV4dGVuZHMgVENvbmZpZ0hvb2s+ID0gKF86IHtcbiAgY29uZmlnOiBUW1wiQ29uZmlnXCJdO1xuICB0YXJnZXQ6IFRbXCJUYXJnZXRcIl07XG4gIHByb3BzOiBUW1wiUHJvcHNcIl07XG59KSA9PiBDb25maWdGYWN0b3J5PFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIlRhcmdldFwiXT4+O1xuXG5leHBvcnQgdHlwZSBScGNDb25maWdIb29rSGFuZGxlcjxcbiAgUiBleHRlbmRzIEFueVJwY0NvbmZpZ0hvb2ssXG4gIFQgZXh0ZW5kcyBUQ29uZmlnSG9vayA9IFJwY1R5cGU8Uj5bXCJUQ29uZmlnSG9va1wiXVxuPiA9IElzR2VuZXJpY0NvbmZpZzxUW1wiQ29uZmlnXCJdPiBleHRlbmRzIHRydWVcbiAgPyBfR2VuZXJpY0NvbmZpZ0hhbmRsZXI8VD5cbiAgOiBfQ29uZmlnSGFuZGxlcjxUPjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJwY0NvbmZpZ0hvb2s8XG4gIFIgZXh0ZW5kcyBBbnlScGNDb25maWdIb29rLFxuICBUIGV4dGVuZHMgVENvbmZpZ0hvb2sgPSBScGNUeXBlPFI+W1wiVENvbmZpZ0hvb2tcIl1cbj4oXG4gIG9wdGlvbnM6IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICAgIHtcbiAgICAgIGlzR2VuZXJpY0NvbmZpZzpcbiAgICAgICAgfCBJc0dlbmVyaWNDb25maWc8VFtcIkNvbmZpZ1wiXT5cbiAgICAgICAgfCBJZjxOb3Q8SXNHZW5lcmljQ29uZmlnPFRbXCJDb25maWdcIl0+PiwgdW5kZWZpbmVkPjtcblxuICAgICAgcHJvcHM6IFRbXCJQcm9wc1wiXTtcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhcmdldDogVFtcIlRhcmdldFwiXTtcbiAgICAgIGhhbmRsZXI6IFJwY0NvbmZpZ0hvb2tIYW5kbGVyPFI+O1xuICAgIH1cbiAgPlxuKTogUiB7XG4gIGNvbnN0IHsgdGFyZ2V0LCBoYW5kbGVyIH0gPSBvcHRpb25zO1xuICBjb25zdCBpc0dlbmVyaWNDb25maWcgPVxuICAgIFwiaXNHZW5lcmljQ29uZmlnXCIgaW4gb3B0aW9ucyA/IG9wdGlvbnMuaXNHZW5lcmljQ29uZmlnID8/IGZhbHNlIDogZmFsc2U7XG5cbiAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZihcbiAgICB7XG4gICAgICAuLi5vcHRpb25zW1wicHJvcHNcIl0sXG4gICAgICBhc3luYyByZXNvbHZlUnBjQ29uZmlnKHRoaXM6IFRbXCJUYXJnZXRcIl0sIGNvbmZpZykge1xuICAgICAgICBpZiAoaXNHZW5lcmljQ29uZmlnKSB7XG4gICAgICAgICAgY29uZmlnID0gYXdhaXQgR2VuZXJpY0NvbmZpZyhcbiAgICAgICAgICAgIChoYW5kbGVyIGFzIF9HZW5lcmljQ29uZmlnSGFuZGxlcjxUPikoe1xuICAgICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgcHJvcHM6IG9wdGlvbnNbXCJwcm9wc1wiXSxcbiAgICAgICAgICAgIH0pIGFzIEdlbmVyaWNDb25maWdcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbmZpZyA9IGF3YWl0IENvbmZpZ0ZhY3RvcnkoXG4gICAgICAgICAgICAoaGFuZGxlciBhcyBfQ29uZmlnSGFuZGxlcjxUPikoe1xuICAgICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgcHJvcHM6IG9wdGlvbnNbXCJwcm9wc1wiXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnJlc29sdmVScGNDb25maWcuY2FsbCh0aGlzLCBjb25maWcpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHRhcmdldFxuICApO1xufVxuIiwiaW1wb3J0IHtcbiAgT3ZlcnJpZGUsXG4gIFBhcnRpYWxLZXlzLFxuICBVbmRlZmluZWRJZkVtcHR5T2JqZWN0LFxufSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IEFueVJwYywgUnBjLCBScGNDb25maWcsIFJwY1VucmVzb2x2ZWRDb25maWcsIFRScGMgfSBmcm9tIFwiLi9ScGNcIjtcbmltcG9ydCB7IEFueVJwY0NvbmZpZ0hvb2ssIFJwY0NvbmZpZ0hvb2sgfSBmcm9tIFwiLi9ScGNDb25maWdIb29rXCI7XG5cbmV4cG9ydCB0eXBlIEFueVJwY1dpdGhPYmplY3RDb25maWcgPSBScGM8XG4gIE92ZXJyaWRlPFRScGMsIHsgQ29uZmlnOiBvYmplY3QgfCB1bmRlZmluZWQgfT5cbj47XG5cbmV4cG9ydCB0eXBlIFJwY1BhcnRpYWxDb25maWc8XG4gIFQgZXh0ZW5kcyBBbnlScGNXaXRoT2JqZWN0Q29uZmlnLFxuICBLIGV4dGVuZHMga2V5b2YgTm9uTnVsbGFibGU8UnBjQ29uZmlnPFQ+PlxuPiA9IFJwY0NvbmZpZ0hvb2s8e1xuICBUYXJnZXQ6IFQ7XG4gIENvbmZpZzpcbiAgICB8IE5vbk51bGxhYmxlPFJwY0NvbmZpZzxUPj5cbiAgICB8IFVuZGVmaW5lZElmRW1wdHlPYmplY3Q8UGFydGlhbEtleXM8Tm9uTnVsbGFibGU8UnBjQ29uZmlnPFQ+PiwgSz4+O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBScGNQYXJ0aWFsQ29uZmlnPFxuICBUIGV4dGVuZHMgQW55UnBjLFxuICBLIGV4dGVuZHMga2V5b2YgTm9uTnVsbGFibGU8UnBjQ29uZmlnPFQ+PlxuPihcbiAgdGFyZ2V0OiBULFxuICBkZWZhdWx0Q29uZmlnOiBQaWNrPE5vbk51bGxhYmxlPFJwY0NvbmZpZzxUPj4sIEs+XG4pOiBScGNQYXJ0aWFsQ29uZmlnPFQsIEs+IHtcbiAgcmV0dXJuIDxhbnk+UnBjQ29uZmlnSG9vazxBbnlScGNDb25maWdIb29rPih7XG4gICAgaXNHZW5lcmljQ29uZmlnOiBmYWxzZSxcbiAgICB0YXJnZXQsXG4gICAgaGFuZGxlcjogKHsgY29uZmlnIH0pID0+ICQgPT4gJCh7IC4uLmRlZmF1bHRDb25maWcsIC4uLmNvbmZpZyB9KSxcbiAgfSk7XG59XG4iLCJpbXBvcnQge1xuICBBd2FpdGFibGUsXG4gIElmLFxuICBJc0VtcHR5T2JqZWN0LFxuICBPbWl0S2V5cyxcbiAgT3ZlcnJpZGUsXG4gIFBhcnRpYWxVbmRlZmluZWRLZXlzLFxufSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IERhdGFSb3cgfSBmcm9tIFwiLi4vLi4vdHlwZWRhdGEvRGF0YVJvd1wiO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gXCIuLi8uLi90eXBlZGF0YS9EYXRhU291cmNlXCI7XG5pbXBvcnQgeyBDb25maWdGYWN0b3J5IH0gZnJvbSBcIi4uL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7IEdlbmVyaWNDb25maWcgfSBmcm9tIFwiLi4vR2VuZXJpY0NvbmZpZ1wiO1xuXG5pbXBvcnQgeyBBbnlJbnB1dCwgSW5wdXRWYWx1ZSB9IGZyb20gXCIuLi9pbnB1dC9JbnB1dFwiO1xuaW1wb3J0IHsgTm9ScGMgfSBmcm9tIFwiLi4vTm9ScGNcIjtcbmltcG9ydCB7IEFueVJwYywgUnBjQ29uZmlnLCBScGNUeXBlLCBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgUnBjRm4gfSBmcm9tIFwiLi4vcnBjLWZuL1JwY0ZuXCI7XG5pbXBvcnQgeyBScGNNYXAgfSBmcm9tIFwiLi4vcnBjLW1hcC9ScGNNYXBcIjtcbmltcG9ydCB7IFJwY1BhcmFtZXRlciB9IGZyb20gXCIuLi9ycGMtcGFyYW1ldGVyL1JwY1BhcmFtZXRlclwiO1xuaW1wb3J0IHsgUnBjQ29uZmlnSG9vayB9IGZyb20gXCIuLi9ScGNDb25maWdIb29rXCI7XG5pbXBvcnQgeyBEYXRhVGFibGUsIERhdGFUYWJsZU9wdGlvbnMgfSBmcm9tIFwiLi4vd2lkZ2V0L2RhdGEtdGFibGUvRGF0YVRhYmxlXCI7XG5pbXBvcnQgeyBGb3JtLCBGb3JtVHlwZSB9IGZyb20gXCIuLi93aWRnZXQvZm9ybS9Gb3JtXCI7XG5pbXBvcnQgeyBJbmxpbmVXaWRnZXQgfSBmcm9tIFwiLi4vd2lkZ2V0L2lubGluZS13aWRnZXQvSW5saW5lV2lkZ2V0XCI7XG5pbXBvcnQgeyBBbnlSb3dUeXBlLCBSb3cgfSBmcm9tIFwiLi4vd2lkZ2V0L1Jvd1wiO1xuaW1wb3J0IHsgVGFic1dpZGdldCB9IGZyb20gXCIuLi93aWRnZXQvdGFicy13aWRnZXQvVGFic1dpZGdldFwiO1xuaW1wb3J0IHsgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQgeyBBbnlXaWRnZXRSZWNvcmQgfSBmcm9tIFwiLi4vd2lkZ2V0L3dpZGdldC1tYXAvV2lkZ2V0TWFwXCI7XG5pbXBvcnQgeyBEYXRhTWFuYWdlckhhbmRsZXIgfSBmcm9tIFwiLi9EYXRhTWFuYWdlckhhbmRsZXJcIjtcblxuLy8gRnVsbDxUeXBlPlN0YWNrXG5leHBvcnQgdHlwZSBURGF0YU1hbmFnZXIgPSB7XG4gIERhdGE6IGFueTtcblxuICBUYWJsZVJvd0NvbnRyb2xsZXI6IEFueVJwYztcblxuICBUYWJsZVJvdzogYW55O1xuXG4gIEVkaXRJbnB1dDogQW55SW5wdXQ7XG5cbiAgRWRpdEVycm9yOiBhbnk7XG5cbiAgQWRkSW5wdXQ6IEFueUlucHV0O1xuXG4gIEFkZEVycm9yOiBhbnk7XG5cbiAgRWRpdFRhYnM6IEFueVdpZGdldFJlY29yZDtcbn07XG5cbnR5cGUgX1R5cGVzPFQgZXh0ZW5kcyBURGF0YU1hbmFnZXI+ID0ge1xuICBUYWJsZTogRGF0YVRhYmxlPHtcbiAgICBSb3c6IFRbXCJUYWJsZVJvd1wiXTtcbiAgICBSb3dDb250cm9sbGVyOiBUW1wiVGFibGVSb3dDb250cm9sbGVyXCJdO1xuICAgIERhdGE6IFRbXCJEYXRhXCJdO1xuICB9PjtcblxuICBUYWJsZVR5cGVzOiBXaWRnZXRUeXBlPF9UeXBlczxUPltcIlRhYmxlXCJdPltcIlR5cGVzXCJdO1xuXG4gIFRhYmxlQ29uZmlnOlxuICAgIHwgUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gICAgICAgIF9UeXBlczxUPltcIlRhYmxlVHlwZXNcIl1bXCJPcHRpb25hbENvbmZpZ1wiXSAmXG4gICAgICAgICAgT21pdEtleXM8X1R5cGVzPFQ+W1wiVGFibGVUeXBlc1wiXVtcIlJlcXVpcmVkQ29uZmlnXCJdLCBcInNvdXJjZVwiPlxuICAgICAgPlxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIEVkaXRGb3JtOiBGb3JtPHtcbiAgICBWYWx1ZTogbnVsbDtcbiAgICBFcnJvcjogVFtcIkVkaXRFcnJvclwiXTtcbiAgICBJbnB1dDogVFtcIkVkaXRJbnB1dFwiXTtcbiAgfT47XG5cbiAgQWRkRm9ybTogRm9ybTx7XG4gICAgVmFsdWU6IHN0cmluZztcbiAgICBFcnJvcjogVFtcIkFkZEVycm9yXCJdO1xuICAgIElucHV0OiBUW1wiQWRkSW5wdXRcIl07XG4gIH0+O1xuXG4gIEVkaXRUYWJzV2l0aEZvcm06IE92ZXJyaWRlPFxuICAgIFRbXCJFZGl0VGFic1wiXSxcbiAgICB7XG4gICAgICBmb3JtOiBfVHlwZXM8VD5bXCJFZGl0Rm9ybVwiXTtcbiAgICB9XG4gID47XG5cbiAgRWRpdFRhYnNXaWRnZXQ6IFRhYnNXaWRnZXQ8X1R5cGVzPFQ+W1wiRWRpdFRhYnNXaXRoRm9ybVwiXT47XG59O1xuZXhwb3J0IHR5cGUgRGF0YU1hbmFnZXJDb25maWc8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAge1xuICAgIGdldFRhYnNDb25maWc6XG4gICAgICB8IENvbmZpZ0ZhY3Rvcnk8XG4gICAgICAgICAgUnBjVW5yZXNvbHZlZENvbmZpZzxfVHlwZXM8VD5bXCJFZGl0VGFic1dpZGdldFwiXT4sXG4gICAgICAgICAgW0RhdGFSb3c8VFtcIkRhdGFcIl0+XVxuICAgICAgICA+XG4gICAgICB8IElmPElzRW1wdHlPYmplY3Q8VFtcIkVkaXRUYWJzXCJdPiwgdW5kZWZpbmVkPjtcblxuICAgIGFkZElucHV0Q29uZmlnOiBScGNVbnJlc29sdmVkQ29uZmlnPFRbXCJBZGRJbnB1dFwiXT47XG5cbiAgICBlZGl0SW5wdXRDb25maWc6IFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIkVkaXRJbnB1dFwiXT47XG4gIH0sXG4gIHtcbiAgICBnZXRWYWx1ZUZyb21EYXRhUm93OiAoXG4gICAgICByb3c6IERhdGFSb3c8VFtcIkRhdGFcIl0+XG4gICAgKSA9PiBJbnB1dFZhbHVlPEZvcm1UeXBlPF9UeXBlczxUPltcIkVkaXRGb3JtXCJdPltcIklucHV0XCJdPjtcblxuICAgIHNvdXJjZTogRGF0YVNvdXJjZTxUW1wiRGF0YVwiXT47XG5cbiAgICBnZXRUaXRsZTogKHJvdzogRGF0YVJvdzxUW1wiRGF0YVwiXT4pID0+IHN0cmluZztcblxuICAgIHRhYmxlQ29uZmlnOiBfVHlwZXM8VD5bXCJUYWJsZUNvbmZpZ1wiXTtcblxuICAgIGFkZFN1Ym1pdDogUnBjQ29uZmlnPF9UeXBlczxUPltcIkFkZEZvcm1cIl0+W1wic3VibWl0XCJdO1xuXG4gICAgZWRpdFN1Ym1pdDogKFxuICAgICAgcm93OiBEYXRhUm93PFRbXCJEYXRhXCJdPixcbiAgICAgIHZhbHVlOiBJbnB1dFZhbHVlPEZvcm1UeXBlPF9UeXBlczxUPltcIkVkaXRGb3JtXCJdPltcIklucHV0XCJdPlxuICAgICkgPT4gQXdhaXRhYmxlO1xuICB9XG4+O1xuXG5leHBvcnQgdHlwZSBBbnlEYXRhTWFuYWdlciA9IERhdGFNYW5hZ2VyPFREYXRhTWFuYWdlcj47XG5cbmV4cG9ydCB0eXBlIERhdGFNYW5hZ2VyVHlwZXM8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4gPSBfVHlwZXM8VD47XG5cbmV4cG9ydCB0eXBlIERhdGFNYW5hZ2VyVHlwZTxUIGV4dGVuZHMgQW55RGF0YU1hbmFnZXI+ID0gUnBjVHlwZTxcbiAgVFxuPltcIlRDb25maWdIb29rXCJdW1wiVERhdGFNYW5hZ2VyXCJdO1xuZXhwb3J0IHR5cGUgRGF0YU1hbmFnZXI8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4gPSBScGNDb25maWdIb29rPHtcbiAgVERhdGFNYW5hZ2VyOiBUO1xuICBQcm9wczoge1xuICAgIGVkaXRJbnB1dDogQW55SW5wdXQ7XG4gICAgZWRpdFRhYnM6IEFueVdpZGdldFJlY29yZDtcbiAgfTtcbiAgVGFyZ2V0OiBScGNNYXA8e1xuICAgIGRlbGV0ZTogUnBjRm48KGtleTogc3RyaW5nKSA9PiB2b2lkPjtcblxuICAgIHRhYmxlOiBfVHlwZXM8VD5bXCJUYWJsZVwiXTtcblxuICAgIGFkZDogX1R5cGVzPFQ+W1wiQWRkRm9ybVwiXTtcblxuICAgIGVkaXQ6IFJwY1BhcmFtZXRlcjx7XG4gICAgICBEYXRhOiBzdHJpbmc7XG4gICAgICBUYXJnZXQ6IElubGluZVdpZGdldDx7XG4gICAgICAgIFRhcmdldDogX1R5cGVzPFQ+W1wiRWRpdFRhYnNXaWRnZXRcIl07XG4gICAgICAgIENvbnRyb2xsZXI6IE5vUnBjO1xuICAgICAgICBFbGVtZW50OiB7IHRpdGxlOiBzdHJpbmcgfTtcbiAgICAgIH0+O1xuICAgIH0+O1xuICB9PjtcbiAgQ29uZmlnOiBHZW5lcmljQ29uZmlnPFxuICAgIDxEYXRhPihcbiAgICAgIGNvbmZpZzogRGF0YU1hbmFnZXJDb25maWc8T3ZlcnJpZGU8VCwgeyBEYXRhOiBEYXRhIH0+PlxuICAgICkgPT4gRGF0YU1hbmFnZXJDb25maWc8VD5cbiAgPjtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gRGF0YU1hbmFnZXI8XG4gIFRhYmxlUm93VHlwZSBleHRlbmRzIEFueVJvd1R5cGUsXG4gIEFkZEVycm9yLFxuICBFZGl0RXJyb3IsXG4gIEFkZElucHV0IGV4dGVuZHMgQW55SW5wdXQsXG4gIEVkaXRJbnB1dCBleHRlbmRzIEFueUlucHV0ID0gQWRkSW5wdXQsXG4gIFRhYmxlUm93Q29udHJvbGxlciBleHRlbmRzIEFueVJwYyA9IE5vUnBjLFxuICBFZGl0VGFicyBleHRlbmRzIEFueVdpZGdldFJlY29yZCA9IHt9XG4+KG9wdGlvbnM6IHtcbiAgdGFibGVSb3dUeXBlOiBUYWJsZVJvd1R5cGU7XG4gIHRhYmxlT3B0aW9ucz86IERhdGFUYWJsZU9wdGlvbnM8VGFibGVSb3dDb250cm9sbGVyPjtcbiAgYWRkRXJyb3I/OiBBZGRFcnJvcjtcbiAgZWRpdEVycm9yPzogRWRpdEVycm9yO1xuICBhZGRJbnB1dDogQWRkSW5wdXQ7XG4gIGVkaXRJbnB1dD86IEVkaXRJbnB1dDtcbiAgZWRpdFRhYnM/OiBFZGl0VGFicztcbn0pOiBEYXRhTWFuYWdlcjx7XG4gIFRhYmxlUm93Q29udHJvbGxlcjogVGFibGVSb3dDb250cm9sbGVyO1xuICBUYWJsZVJvdzogUm93PFRhYmxlUm93VHlwZT47XG4gIERhdGE6IGFueTtcbiAgQWRkRXJyb3I6IEFkZEVycm9yO1xuICBBZGRJbnB1dDogQWRkSW5wdXQ7XG4gIEVkaXRFcnJvcjogRWRpdEVycm9yO1xuICBFZGl0SW5wdXQ6IEVkaXRJbnB1dDtcbiAgRWRpdFRhYnM6IEVkaXRUYWJzO1xufT4ge1xuICBjb25zdCBlZGl0SW5wdXQ6IEFueUlucHV0ID0gb3B0aW9ucy5lZGl0SW5wdXQgfHwgb3B0aW9ucy5hZGRJbnB1dDtcbiAgY29uc3QgZWRpdFRhYnMgPSB7XG4gICAgZm9ybTogRm9ybSh7IGlucHV0OiBlZGl0SW5wdXQgfSksXG4gICAgLi4uKG9wdGlvbnMuZWRpdFRhYnMgYXMge30pLFxuICB9IGFzIEFueVdpZGdldFJlY29yZDtcbiAgcmV0dXJuIDxhbnk+UnBjQ29uZmlnSG9vazxBbnlEYXRhTWFuYWdlcj4oe1xuICAgIHByb3BzOiB7XG4gICAgICBlZGl0SW5wdXQsXG4gICAgICBlZGl0VGFicyxcbiAgICB9LFxuICAgIGlzR2VuZXJpY0NvbmZpZzogdHJ1ZSxcbiAgICBoYW5kbGVyOiBEYXRhTWFuYWdlckhhbmRsZXIsXG4gICAgdGFyZ2V0OiBScGNNYXAoe1xuICAgICAgZGVsZXRlOiBScGNGbjwoa2V5OiBzdHJpbmcpID0+IHZvaWQ+KCksXG5cbiAgICAgIHRhYmxlOiBEYXRhVGFibGUob3B0aW9ucy50YWJsZVJvd1R5cGUsIG9wdGlvbnMudGFibGVPcHRpb25zKSxcblxuICAgICAgYWRkOiBGb3JtKHtcbiAgICAgICAgaW5wdXQ6IG9wdGlvbnMuYWRkSW5wdXQsXG4gICAgICB9KSxcblxuICAgICAgZWRpdDogUnBjUGFyYW1ldGVyKFxuICAgICAgICBTdHJpbmcsXG4gICAgICAgIElubGluZVdpZGdldCh7XG4gICAgICAgICAgdGFyZ2V0OiBUYWJzV2lkZ2V0KGVkaXRUYWJzKSxcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgfSksXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgUnBjQ29uZmlnSG9va0hhbmRsZXIgfSBmcm9tIFwiLi4vUnBjQ29uZmlnSG9va1wiO1xuaW1wb3J0IHsgQW55RGF0YU1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhTWFuYWdlclwiO1xuXG5leHBvcnQgY29uc3QgRGF0YU1hbmFnZXJIYW5kbGVyOiBScGNDb25maWdIb29rSGFuZGxlcjxBbnlEYXRhTWFuYWdlcj4gPSAoe1xuICBjb25maWcsXG4gIHByb3BzOiB7IGVkaXRJbnB1dCB9LFxufSkgPT4gJCA9PiB7XG4gIHJldHVybiAkKHtcbiAgICBhc3luYyBkZWxldGUoa2V5KSB7XG4gICAgICBhd2FpdCBjb25maWcuc291cmNlLmRlbGV0ZShrZXkpO1xuICAgIH0sXG4gICAgdGFibGU6ICQgPT5cbiAgICAgICQoe1xuICAgICAgICAuLi5jb25maWcudGFibGVDb25maWcsXG4gICAgICAgIHNvdXJjZTogY29uZmlnLnNvdXJjZSxcbiAgICAgIH0pLFxuICAgIGFkZDoge1xuICAgICAgaW5wdXRDb25maWc6IGNvbmZpZy5hZGRJbnB1dENvbmZpZyxcbiAgICAgIHN1Ym1pdDogdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gY29uZmlnLmFkZFN1Ym1pdCh2YWx1ZSk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgZWRpdDogYXN5bmMgKCQsIGtleSkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0gYXdhaXQgY29uZmlnLnNvdXJjZS5nZXRPckZhaWwoa2V5KTtcbiAgICAgIHJldHVybiAkKHtcbiAgICAgICAgZ2V0RWxlbWVudCgpIHtcbiAgICAgICAgICByZXR1cm4geyB0aXRsZTogY29uZmlnLmdldFRpdGxlKHJvdykgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdGFyZ2V0Q29uZmlnOiB7XG4gICAgICAgICAgZm9ybTogeyBpbnB1dENvbmZpZzogY29uZmlnLmVkaXRJbnB1dENvbmZpZyB9LFxuICAgICAgICAgIHN1Ym1pdCh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5lZGl0U3VibWl0KHJvdywgdmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7XG4gIFJvdXRlcixcbiAgUm91dGVyVHlwZSxcbiAgUm91dGVyV2l0aENoaWxkcmVuLFxuICBSb3V0ZXJXaXRoUGFyYW1zLFxufSBmcm9tIFwiLi4vLi4vdHlwZXJvdXRlcjIvUm91dGVyXCI7XG5pbXBvcnQge1xuICBBbnlEYXRhTWFuYWdlcixcbiAgRGF0YU1hbmFnZXJUeXBlLFxuICBEYXRhTWFuYWdlclR5cGVzLFxuICBURGF0YU1hbmFnZXIsXG59IGZyb20gXCIuL0RhdGFNYW5hZ2VyXCI7XG5cbmV4cG9ydCB0eXBlIEFueURhdGFNYW5hZ2VyUm91dGVyID0gRGF0YU1hbmFnZXJSb3V0ZXI8VERhdGFNYW5hZ2VyPjtcblxuZXhwb3J0IHR5cGUgRGF0YU1hbmFnZXJSb3V0ZXI8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4gPSBSb3V0ZXJXaXRoQ2hpbGRyZW48XG4gIHtcbiAgICBhZGQ6IFJvdXRlcjtcbiAgICBlZGl0OiBSb3V0ZXJXaXRoUGFyYW1zPFxuICAgICAgXCJpZFwiLFxuICAgICAgUmVjb3JkPGtleW9mIERhdGFNYW5hZ2VyVHlwZXM8VD5bXCJFZGl0VGFic1dpdGhGb3JtXCJdLCBSb3V0ZXI+XG4gICAgPjtcbiAgfSxcbiAgeyBURGF0YU1hbmFnZXI6IFQgfVxuPjtcblxuZXhwb3J0IGZ1bmN0aW9uIERhdGFNYW5hZ2VyUm91dGVyPFQgZXh0ZW5kcyBBbnlEYXRhTWFuYWdlcj4oXG4gIGRtOiBUXG4pOiBEYXRhTWFuYWdlclJvdXRlcjxEYXRhTWFuYWdlclR5cGU8VD4+IHtcbiAgY29uc3QgciA9IFJvdXRlcih7XG4gICAgYWRkOiBSb3V0ZXIoKSxcbiAgICBlZGl0OiBSb3V0ZXIoW1wiaWRcIl0sIHtcbiAgICAgIC4uLihtYXBPYmplY3QoZG0uZWRpdFRhYnMsICgpID0+IFJvdXRlcigpKSBhcyBSZWNvcmQ8XG4gICAgICAgIGtleW9mIERhdGFNYW5hZ2VyVHlwZTxUPltcIkVkaXRUYWJzXCJdLFxuICAgICAgICBSb3V0ZXJcbiAgICAgID4pLFxuICAgICAgZm9ybTogUm91dGVyKCksXG4gICAgfSksXG4gIH0pO1xuICByZXR1cm4gciBhcyBSb3V0ZXI8XG4gICAgUm91dGVyVHlwZTx0eXBlb2Ygcj4gJiB7XG4gICAgICBURGF0YU1hbmFnZXI6IERhdGFNYW5hZ2VyVHlwZTxUPjtcbiAgICB9XG4gID47XG59XG4iLCJpbXBvcnQgeyBSZXF1aXJlT3B0aW9uYWxLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQge1xuICBBbnlJbnB1dCxcbiAgSUlucHV0LFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRFcnJvcixcbiAgSW5wdXRFcnJvck9yVmFsdWUsXG4gIElucHV0VmFsdWUsXG4gIElucHV0VmFsdWVFbGVtZW50LFxuICBJbnB1dEVsZW1lbnQsXG59IGZyb20gXCIuL0lucHV0XCI7XG5pbXBvcnQge1xuICBScGNSZXNvbHZlZENvbmZpZyxcbiAgUnBjUmVzb2x2ZWRIYW5kbGVyLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxufSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldEhhbmRsZXIgfSBmcm9tIFwiLi4vd2lkZ2V0L0Fic3RyYWN0V2lkZ2V0SGFuZGxlclwiO1xuaW1wb3J0IHsgSVdpZGdldEhhbmRsZXIsIFdpZGdldEVsZW1lbnQgfSBmcm9tIFwiLi4vd2lkZ2V0L1dpZGdldFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RJbnB1dEhhbmRsZXI8VCBleHRlbmRzIEFueUlucHV0PlxuICBleHRlbmRzIEFic3RyYWN0V2lkZ2V0SGFuZGxlcjxUPlxuICBpbXBsZW1lbnRzIElXaWRnZXRIYW5kbGVyPElJbnB1dD4ge1xuICBhYnN0cmFjdCBsb2FkQW5kQ2hlY2soZGF0YTogSW5wdXRWYWx1ZURhdGE8VD4pOiBQcm9taXNlPElucHV0RXJyb3JPclZhbHVlPFQ+PjtcblxuICBhYnN0cmFjdCBnZXRWYWx1ZUVsZW1lbnQoXG4gICAgdmFsdWU6IElucHV0VmFsdWU8VD4gfCB1bmRlZmluZWRcbiAgKTogUHJvbWlzZTxJbnB1dFZhbHVlRWxlbWVudDxUPj47XG5cbiAgYWJzdHJhY3QgZ2V0SW5wdXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxJbnB1dEVsZW1lbnQ8VD4+PjtcblxuICBhc3luYyBnZXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxXaWRnZXRFbGVtZW50PFQ+Pj4ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi4oYXdhaXQgdGhpcy5nZXRJbnB1dEVsZW1lbnQoKSksXG4gICAgICB2YWx1ZTogYXdhaXQgdGhpcy5nZXRWYWx1ZUVsZW1lbnQodW5kZWZpbmVkKSxcbiAgICB9IGFzIFJlcXVpcmVPcHRpb25hbEtleXM8V2lkZ2V0RWxlbWVudDxUPj47XG4gIH1cblxuICBhc3luYyBoYW5kbGVDaGVjayhcbiAgICBkYXRhOiBJbnB1dFZhbHVlRGF0YTxUPlxuICApOiBQcm9taXNlPElucHV0RXJyb3I8VD4gfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmxvYWRBbmRDaGVjayhkYXRhKTtcbiAgICBpZiAoXCJlcnJvclwiIGluIHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5lcnJvcjtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIFRPRE86IEFic3RyYWN0SW5wdXRWaWV3XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBGcmFnbWVudCwgUmVhY3RFbGVtZW50LCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgVmlld1N0YXRlIH0gZnJvbSBcIi4uLy4uL3JlYWN0L3ZpZXcvVmlld1N0YXRlXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXRWaWV3IH0gZnJvbSBcIi4uL3dpZGdldC9BYnN0cmFjdFdpZGdldFZpZXdcIjtcbmltcG9ydCB7IFdpZGdldFR5cGUgfSBmcm9tIFwiLi4vd2lkZ2V0L1dpZGdldFwiO1xuLy8gVE9ETzogdHlwZSBJbnB1dFZpZXdcbmltcG9ydCB7XG4gIEFueUlucHV0LFxuICBBbnlJbnB1dENvbm5lY3Rpb24sXG4gIElucHV0RXJyb3IsXG4gIElucHV0VHlwZSxcbiAgSW5wdXRWYWx1ZURhdGEsXG4gIElucHV0VmFsdWVFbGVtZW50LFxufSBmcm9tIFwiLi9JbnB1dFwiO1xuaW1wb3J0IHsgSW5wdXRFcnJvckVsZW1lbnRNYXAsIElucHV0VmlldywgSW5wdXRWaWV3UHJvcHMgfSBmcm9tIFwiLi9JbnB1dFZpZXdcIjtcbmltcG9ydCB7IElucHV0Vmlld0NoaWxkcmVuIH0gZnJvbSBcIi4vSW5wdXRWaWV3Q2hpbGRyZW5cIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0SW5wdXRWaWV3PFxuICAgIEMgZXh0ZW5kcyBBbnlJbnB1dENvbm5lY3Rpb24sXG4gICAgUCBleHRlbmRzIElucHV0Vmlld1Byb3BzPEM+ID0gSW5wdXRWaWV3UHJvcHM8Qz4sXG4gICAgVCBleHRlbmRzIElucHV0VHlwZTxDPiA9IElucHV0VHlwZTxDPlxuICA+XG4gIGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRWaWV3PEMsIFA+XG4gIGltcGxlbWVudHMgSW5wdXRWaWV3PEM+IHtcbiAgcHJvdGVjdGVkIHVwZGF0ZUVycm9yPyhlcnJvcjogVFtcIkVycm9yXCJdIHwgdW5kZWZpbmVkKTogdm9pZDtcblxuICBAVmlld1N0YXRlKFwiZm9yY2VVcGRhdGVWYWx1ZVwiKSBwcm90ZWN0ZWQgX3ZhbHVlOlxuICAgIHwgSW5wdXRWYWx1ZUVsZW1lbnQ8Qz5cbiAgICB8IHVuZGVmaW5lZDtcblxuICBAVmlld1N0YXRlKFwiZm9yY2VVcGRhdGVFcnJvclwiKSBwcm90ZWN0ZWQgX2Vycm9yOiBJbnB1dEVycm9yPEM+O1xuXG4gIEBWaWV3U3RhdGUoKSBfZXJyb3JFbGVtZW50OiBSZWFjdEVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgQFZpZXdTdGF0ZSgpIGlzVmFsaWRhdGluZzogYm9vbGVhbjtcblxuICBwcm90ZWN0ZWQgX2RhdGE6IElucHV0VmFsdWVEYXRhPEM+O1xuICBwcm90ZWN0ZWQgX2lzVmFsaWRWYWx1ZTogYm9vbGVhbjtcblxuICBjaGlsZHJlbj86IElucHV0Vmlld0NoaWxkcmVuO1xuXG4gIGdldCBlcnJvckVsZW1lbnQoKTogUmVhY3RFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JFbGVtZW50O1xuICB9XG5cbiAgZ2V0IGRhdGEoKTogSW5wdXRWYWx1ZURhdGE8Qz4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgZ2V0IGVycm9yKCk6IFRbXCJFcnJvclwiXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IElucHV0VmFsdWVFbGVtZW50PEM+IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBhc3luYyBzZXRWYWx1ZSh2YWx1ZTogSW5wdXRWYWx1ZUVsZW1lbnQ8Qz4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5faXNWYWxpZFZhbHVlICYmIHRoaXMuX3ZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5pc1ZhbGlkYXRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2Vycm9yID0gYXdhaXQgdGhpcy5nZXRFcnJvcj8uKCk7XG4gICAgdGhpcy5pc1ZhbGlkYXRpbmcgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5fZXJyb3IgIT0gbnVsbCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkVycm9yPy4odGhpcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2lzVmFsaWRWYWx1ZSA9IHRydWU7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZT8uKHRoaXMpO1xuICB9XG5cbiAgc2V0RXJyb3IoZXJyb3I6IFRbXCJFcnJvclwiXSB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX2Vycm9yID0gZXJyb3I7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RXJyb3I/KCk6IEF3YWl0YWJsZTxJbnB1dEVycm9yPEM+IHwgdW5kZWZpbmVkPjtcblxuICBwcm90ZWN0ZWQgdXBkYXRlVmFsdWU/KHZhbHVlOiBJbnB1dFZhbHVlRWxlbWVudDxDPiB8IHVuZGVmaW5lZCk6IHZvaWQ7XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUVsZW1lbnQoZWxlbWVudDogV2lkZ2V0VHlwZTxDPltcIkVsZW1lbnRcIl0pIHtcbiAgICB0aGlzLl92YWx1ZSA9XG4gICAgICB0aGlzLnByb3BzLnZhbHVlICE9PSB1bmRlZmluZWQgPyB0aGlzLnByb3BzLnZhbHVlIDogZWxlbWVudC52YWx1ZTtcbiAgfVxuXG4gIGZvcmNlVXBkYXRlVmFsdWUoKSB7XG4gICAgdGhpcy5fZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5faXNWYWxpZFZhbHVlID0gZmFsc2U7XG4gICAgdGhpcy5fZGF0YSA9IHRoaXMucnBjLmdldFZhbHVlRGF0YUZyb21FbGVtZW50KHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlPy4odGhpcy5fdmFsdWUpO1xuICB9XG5cbiAgLy8gVE9ETzogW1wiY2hpbGRyZW5cIiwgeyAuLi4gfV1cbiAgcHJvdGVjdGVkIHJlbmRlckVycm9yRWxlbWVudCgpOiBSZWFjdEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHsgZXJyb3IgfSA9IHRoaXM7XG4gICAgLy8gVE9ETzogdXNlIHRoaXMuZXJyb3JcbiAgICBpZiAoZXJyb3IgPT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnByb3BzLnJlbmRlckVycm9yPy4oZXJyb3IpO1xuICAgIGlmIChlbGVtZW50KSByZXR1cm4gZWxlbWVudDtcblxuICAgIGNvbnN0IGVycm9yTWFwOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdEVsZW1lbnQgfCAoKGVycm9yKSA9PiBSZWFjdEVsZW1lbnQpPiA9IHtcbiAgICAgIC4uLnRoaXMuZ2V0RXJyb3JFbGVtZW50TWFwPy4oKSEsXG4gICAgICAuLi50aGlzLnByb3BzLmVycm9yTWFwISxcbiAgICB9IGFzIGFueTtcblxuICAgIGNvbnN0IGVycm9yVHlwZSA9XG4gICAgICB0eXBlb2YgZXJyb3IgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBlcnJvclxuICAgICAgICA6IHR5cGVvZiBlcnJvciA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgZXJyb3IudHlwZSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IGVycm9yLnR5cGVcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBlcnJvckVsZW1lbnRPckZuID0gZXJyb3JNYXBbZXJyb3JUeXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXJyb3JFbGVtZW50T3JGbiA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIEZyYWdtZW50LFxuICAgICAgICBudWxsLFxuICAgICAgICBlcnJvckVsZW1lbnRPckZuKHR5cGVvZiBlcnJvciA9PT0gXCJvYmplY3RcIiA/IGVycm9yIDogdW5kZWZpbmVkKVxuICAgICAgKTtcblxuICAgIGlmIChlcnJvckVsZW1lbnRPckZuKSByZXR1cm4gZXJyb3JFbGVtZW50T3JGbjtcbiAgfVxuXG4gIGZvcmNlVXBkYXRlRXJyb3IoKSB7XG4gICAgdGhpcy5fZXJyb3JFbGVtZW50ID1cbiAgICAgIHRoaXMuX2Vycm9yICE9IG51bGwgPyB0aGlzLnJlbmRlckVycm9yRWxlbWVudCgpIDogdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5jaGlsZHJlbj8udXBkYXRlRXJyb3IodGhpcy5fZXJyb3IpO1xuICAgIHRoaXMudXBkYXRlRXJyb3I/Lih0aGlzLl9lcnJvcik7XG4gIH1cblxuICBpbnB1dFdpbGxWYWxpZGF0ZT8oKTogQXdhaXRhYmxlO1xuXG4gIGFzeW5jIHZhbGlkYXRlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGF3YWl0IHRoaXMuaW5wdXRXaWxsVmFsaWRhdGU/LigpO1xuICAgIGNvbnN0IGVycm9yID1cbiAgICAgIChhd2FpdCB0aGlzLmNoaWxkcmVuPy5nZXRFcnJvcigpKSA/PyAoYXdhaXQgdGhpcy5nZXRFcnJvcj8uKCkpO1xuICAgIHJldHVybiBudWxsID09ICh0aGlzLl9lcnJvciA9IGVycm9yKTtcbiAgfVxuXG4gIHVwZGF0ZVZpZXdQcm9wcyhwcmV2UHJvcHM6IFJlYWRvbmx5PFA+LCBuZXh0UHJvcHM6IFJlYWRvbmx5PFA+KSB7XG4gICAgc3VwZXIudXBkYXRlVmlld1Byb3BzKHByZXZQcm9wcywgbmV4dFByb3BzKTtcbiAgICBpZiAobmV4dFByb3BzLnZhbHVlICE9PSBwcmV2UHJvcHMudmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gbmV4dFByb3BzLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRFcnJvckVsZW1lbnRNYXA/KCk6IElucHV0RXJyb3JFbGVtZW50TWFwPEM+O1xuXG4gIHJlbmRlckVycm9yKCk6IFJlYWN0Tm9kZSB7XG4gICAgaWYgKHRoaXMuZXJyb3JFbGVtZW50KSByZXR1cm4gdGhpcy5lcnJvckVsZW1lbnQ7XG5cbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgZXJyb3IgPT09IFwic3RyaW5nXCIpIHJldHVybiBlcnJvcjtcblxuICAgIGlmIChlcnJvciAhPSBudWxsKSByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyb3IpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgc3VwZXIuY29tcG9uZW50RGlkTW91bnQoKTtcbiAgICB0aGlzLnByb3BzLmlucHV0UmVmPy4odGhpcyk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBzdXBlci5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuICAgIHRoaXMucHJvcHMuaW5wdXRSZWY/LihudWxsKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBJbnB1dFZpZXdDbGFzczxUIGV4dGVuZHMgQW55SW5wdXQ+ID0gbmV3IChcbiAgcHJvcHM6IElucHV0Vmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248VD4+XG4pID0+IEFic3RyYWN0SW5wdXRWaWV3PFJwY0Nvbm5lY3Rpb248VD4+O1xuIiwiLy8gVE9ETzogUmVuYW1lIHRvICpJbnB1dFxuaW1wb3J0IHsgbWVyZ2VEZXNjcmlwdG9ycyB9IGZyb20gXCIuLi8uLi9jb21tb24vb2JqZWN0L21lcmdlRGVzY3JpcHRvcnNcIjtcbmltcG9ydCB7XG4gIEF3YWl0YWJsZSxcbiAgSWYsXG4gIElzLFxuICBJc0VtcHR5T2JqZWN0LFxuICBJc1VuZGVmaW5lZCxcbiAgTm90LFxuICBPdmVycmlkZSxcbiAgUGFydGlhbFVuZGVmaW5lZEtleXMsXG59IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgTm9ScGMgfSBmcm9tIFwiLi4vTm9ScGNcIjtcbmltcG9ydCB7XG4gIEJhc2VkUnBjLFxuICBScGNJc0dlbmVyaWNDb25maWdPcHRpb24sXG4gIFJwY0Nvbm5lY3Rpb24sXG4gIFJwY0hhbmRsZXJDbGFzcyxcbiAgUnBjUmVzb2x2ZWRIYW5kbGVyLFxuICBScGNUeXBlLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxuICBScGNQcm9wc09wdGlvbixcbn0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgSXNHZW5lcmljQ29uZmlnIH0gZnJvbSBcIi4uL0dlbmVyaWNDb25maWdcIjtcbmltcG9ydCB7XG4gIFRXaWRnZXQsXG4gIFdpZGdldCxcbiAgV2lkZ2V0Q29tbWFuZHNPcHRpb24sXG4gIFdpZGdldENvbnRyb2xsZXJPcHRpb24sXG4gIFdpZGdldEVsZW1lbnQsXG4gIFdpZGdldFR5cGUsXG59IGZyb20gXCIuLi93aWRnZXQvV2lkZ2V0XCI7XG5cbmV4cG9ydCB0eXBlIElJbnB1dCA9IElucHV0PFxuICBPdmVycmlkZTxcbiAgICBUSW5wdXQsXG4gICAge1xuICAgICAgQ29tbWFuZHM6IHt9O1xuICAgIH1cbiAgPlxuPjtcbmV4cG9ydCB0eXBlIFRJbnB1dCA9IHtcbiAgVmFsdWVEYXRhOiBhbnk7XG5cbiAgVmFsdWU6IGFueTtcblxuICBDb250cm9sbGVyOiBUV2lkZ2V0W1wiQ29udHJvbGxlclwiXTtcblxuICBQcm9wczogVFdpZGdldFtcIlByb3BzXCJdO1xuXG4gIENvbmZpZzogVFdpZGdldFtcIkNvbmZpZ1wiXTtcblxuICBFbGVtZW50OiBUV2lkZ2V0W1wiRWxlbWVudFwiXTtcblxuICBWYWx1ZUVsZW1lbnQ6IGFueTtcblxuICBFcnJvcjogYW55O1xuXG4gIENvbW1hbmRzOiBUV2lkZ2V0W1wiQ29tbWFuZHNcIl07XG59O1xuXG5leHBvcnQgdHlwZSBJbnB1dEVsZW1lbnQ8VCBleHRlbmRzIEFueUlucHV0PiA9IElucHV0VHlwZTxUPltcIkVsZW1lbnRcIl07XG5cbmV4cG9ydCB0eXBlIElucHV0PFQgZXh0ZW5kcyBUSW5wdXQ+ID0gV2lkZ2V0PHtcbiAgQ29tbWFuZHM6IFRbXCJDb21tYW5kc1wiXSAmIHtcbiAgICBjaGVjazoge1xuICAgICAgKGRhdGE6IFRbXCJWYWx1ZURhdGFcIl0pOiBUW1wiRXJyb3JcIl0gfCB1bmRlZmluZWQ7XG4gICAgICBoYW5kbGVyOiBcImhhbmRsZUNoZWNrXCI7XG4gICAgfTtcbiAgfTtcblxuICBUSW5wdXQ6IFQ7XG5cbiAgQ29ubmVjdGlvbjoge307XG5cbiAgQ29uZmlnOiBUW1wiQ29uZmlnXCJdO1xuXG4gIEhhbmRsZXI6IHtcbiAgICBnZXRJbnB1dEVsZW1lbnQoKTogUHJvbWlzZTxUW1wiRWxlbWVudFwiXT47XG4gICAgZ2V0VmFsdWVFbGVtZW50KHZhbHVlOiBUW1wiVmFsdWVcIl0gfCB1bmRlZmluZWQpOiBQcm9taXNlPFRbXCJWYWx1ZUVsZW1lbnRcIl0+O1xuICAgIGxvYWRBbmRDaGVjayhcbiAgICAgIHZhbHVlRGF0YTogVFtcIlZhbHVlRGF0YVwiXVxuICAgICk6IFByb21pc2U8SW5wdXRFcnJvck9yVmFsdWU8SW5wdXQ8VD4+PjtcbiAgfTtcblxuICBQcm9wczogVFtcIlByb3BzXCJdICYge1xuICAgIGlucHV0T3B0aW9uczogSW5wdXRPcHRpb25zPFRJbnB1dD47XG5cbiAgICBnZXRWYWx1ZURhdGFGcm9tRWxlbWVudChcbiAgICAgIHRoaXM6IElucHV0PFQ+LFxuICAgICAgZWxlbWVudDogVFtcIlZhbHVlRWxlbWVudFwiXVxuICAgICk6IFRbXCJWYWx1ZURhdGFcIl07XG4gIH07XG5cbiAgRWxlbWVudDogVFtcIkVsZW1lbnRcIl0gJiB7XG4gICAgdmFsdWU6IFRbXCJWYWx1ZUVsZW1lbnRcIl0gfCB1bmRlZmluZWQ7XG4gIH07XG5cbiAgQ29udHJvbGxlcjogVFtcIkNvbnRyb2xsZXJcIl07XG59PjtcblxuZXhwb3J0IHR5cGUgQmFzZWRJbnB1dDxUIGV4dGVuZHMgVElucHV0ID0gVElucHV0PiA9IEJhc2VkUnBjPFJwY1R5cGU8SW5wdXQ8VD4+PjtcblxuZXhwb3J0IHR5cGUgSW5wdXRUeXBlPFQgZXh0ZW5kcyBCYXNlZElucHV0PiA9IFdpZGdldFR5cGU8VD5bXCJUSW5wdXRcIl07XG5cbmV4cG9ydCB0eXBlIEVycm9yT3JWYWx1ZTxFLCBWPiA9XG4gIHwgeyBlcnJvcjogRTsgdmFsdWU6IFYgfCB1bmRlZmluZWQgfVxuICB8IHsgdmFsdWU6IFYgfTtcblxuZXhwb3J0IHR5cGUgSW5wdXRFcnJvck9yVmFsdWU8VCBleHRlbmRzIEJhc2VkSW5wdXQ+ID0gRXJyb3JPclZhbHVlPFxuICBJbnB1dEVycm9yPFQ+LFxuICBJbnB1dFZhbHVlPFQ+XG4+O1xuXG5leHBvcnQgdHlwZSBBbnlJbnB1dCA9IElucHV0PFRJbnB1dD47XG5leHBvcnQgdHlwZSBBbnlJbnB1dENvbm5lY3Rpb24gPSBScGNDb25uZWN0aW9uPEFueUlucHV0PjtcblxuZXhwb3J0IHR5cGUgSW5wdXRPcHRpb25zPFQgZXh0ZW5kcyBUSW5wdXQ+ID0gUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gIHtcbiAgICBpc0dlbmVyaWNDb25maWc6IFJwY0lzR2VuZXJpY0NvbmZpZ09wdGlvbjxUPjtcblxuICAgIHByb3BzOiBScGNQcm9wc09wdGlvbjxUPjtcblxuICAgIGNvbnRyb2xsZXI6IFdpZGdldENvbnRyb2xsZXJPcHRpb248VD47XG4gIH0sXG4gIHtcbiAgICBoYW5kbGVyOiBScGNIYW5kbGVyQ2xhc3M8SW5wdXQ8VD4+O1xuXG4gICAgZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQ6IChcbiAgICAgIHRoaXM6IElucHV0PFQ+LFxuICAgICAgdmFsdWU6IElucHV0VmFsdWVFbGVtZW50PElucHV0PFQ+PlxuICAgICkgPT4gSW5wdXRWYWx1ZURhdGE8SW5wdXQ8VD4+O1xuICB9XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gSW5wdXQ8UiBleHRlbmRzIEJhc2VkSW5wdXQsIFQgZXh0ZW5kcyBUSW5wdXQgPSBJbnB1dFR5cGU8Uj4+KFxuICBvcHRpb25zOiBJbnB1dE9wdGlvbnM8VD5cbik6IElucHV0PFQ+IHtcbiAgY29uc3Qge1xuICAgIHByb3BzID0ge30sXG4gICAgaXNHZW5lcmljQ29uZmlnLFxuICAgIGNvbnRyb2xsZXIsXG4gICAgaGFuZGxlcixcbiAgICBnZXRWYWx1ZURhdGFGcm9tRWxlbWVudCxcbiAgfSA9IG9wdGlvbnMgYXMgSW5wdXRPcHRpb25zPFRJbnB1dD47XG5cbiAgcmV0dXJuIDxhbnk+V2lkZ2V0PEFueUlucHV0Pih7XG4gICAgcHJvcHM6IG1lcmdlRGVzY3JpcHRvcnMocHJvcHMsIHtcbiAgICAgIGlucHV0T3B0aW9uczogPElucHV0T3B0aW9uczxUSW5wdXQ+Pm9wdGlvbnMsXG4gICAgICBnZXRWYWx1ZURhdGFGcm9tRWxlbWVudCxcbiAgICB9KSxcbiAgICBjb250cm9sbGVyLFxuICAgIGlzR2VuZXJpY0NvbmZpZyxcbiAgICBjb21tYW5kczogeyBjaGVjazogXCJoYW5kbGVDaGVja1wiIH0sXG4gICAgaGFuZGxlcixcbiAgfSk7XG59XG5cbmV4cG9ydCB0eXBlIElucHV0VmFsdWU8VCBleHRlbmRzIEJhc2VkSW5wdXQ+ID0gSW5wdXRUeXBlPFQ+W1wiVmFsdWVcIl07XG5cbmV4cG9ydCB0eXBlIElucHV0VmFsdWVFbGVtZW50PFQgZXh0ZW5kcyBCYXNlZElucHV0PiA9IElucHV0VHlwZTxcbiAgVFxuPltcIlZhbHVlRWxlbWVudFwiXTtcblxuZXhwb3J0IHR5cGUgSW5wdXRFcnJvcjxUIGV4dGVuZHMgQmFzZWRJbnB1dD4gPSBJbnB1dFR5cGU8VD5bXCJFcnJvclwiXTtcblxuZXhwb3J0IHR5cGUgSW5wdXRWYWx1ZURhdGE8VCBleHRlbmRzIEJhc2VkSW5wdXQ+ID0gSW5wdXRUeXBlPFQ+W1wiVmFsdWVEYXRhXCJdO1xuIiwiaW1wb3J0IHsgUnBjQ29ubmVjdGlvbiB9IGZyb20gXCIuLi9ScGNcIjtcbmltcG9ydCB7IEFueUlucHV0LCBJbnB1dCwgSW5wdXRFcnJvciwgSW5wdXRUeXBlIH0gZnJvbSBcIi4vSW5wdXRcIjtcbmltcG9ydCB7IElucHV0Vmlld1Byb3BzIH0gZnJvbSBcIi4vSW5wdXRWaWV3XCI7XG5cbmV4cG9ydCB0eXBlIEFueUlucHV0RXJyb3JIb29rID0gSW5wdXRFcnJvckhvb2s8VElucHV0RXJyb3JIb29rPjtcblxuZXhwb3J0IHR5cGUgVElucHV0RXJyb3JIb29rID0geyBUYXJnZXQ6IEFueUlucHV0OyBFcnJvcjogYW55IH07XG5cbmV4cG9ydCB0eXBlIElucHV0RXJyb3JIb29rPFQgZXh0ZW5kcyBUSW5wdXRFcnJvckhvb2s+ID0gSW5wdXQ8XG4gIE9taXQ8SW5wdXRUeXBlPFRbXCJUYXJnZXRcIl0+LCBcIkVycm9yXCI+ICYge1xuICAgIFRJbnB1dEVycm9ySG9vazogVDtcbiAgICBFcnJvcjogSW5wdXRFcnJvcjxUW1wiVGFyZ2V0XCJdPiB8IFRbXCJFcnJvclwiXTtcbiAgfVxuPjtcblxuZXhwb3J0IGZ1bmN0aW9uIElucHV0RXJyb3JIb29rPEU+KCkge1xuICByZXR1cm4gPFQgZXh0ZW5kcyBBbnlJbnB1dD4oXG4gICAgaW5wdXQ6IFRcbiAgKTogSW5wdXRFcnJvckhvb2s8eyBUYXJnZXQ6IFQ7IEVycm9yOiBFIH0+ID0+IHtcbiAgICByZXR1cm4gPGFueT5pbnB1dDtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElucHV0RXJyb3JIb29rVmlld1Byb3BzPFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlJbnB1dEVycm9ySG9vaz4sXG4gIFQgZXh0ZW5kcyBUSW5wdXRFcnJvckhvb2sgPSBJbnB1dFR5cGU8Qz5bXCJUSW5wdXRFcnJvckhvb2tcIl1cbiAgLy8gVCBleHRlbmRzIEFueUlucHV0ID0gSW5wdXRUeXBlPEM+W1wiVEVycm9ySG9va1wiXVtcIlRhcmdldFwiXVxuPihwcm9wczogSW5wdXRWaWV3UHJvcHM8Qz4pOiBJbnB1dFZpZXdQcm9wczxScGNDb25uZWN0aW9uPFRbXCJUYXJnZXRcIl0+PiB7XG4gIHJldHVybiA8YW55PnByb3BzO1xufVxuIiwiaW1wb3J0IHsgUmVmQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9lbnRyaWVzXCI7XG5pbXBvcnQgeyBoYXNLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9vYmplY3QvaGFzS2V5c1wiO1xuaW1wb3J0IHsgSWYgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IEFueUlucHV0Q29ubmVjdGlvbiB9IGZyb20gXCIuL0lucHV0XCI7XG5pbXBvcnQgeyBJbnB1dEVycm9yTWFwIH0gZnJvbSBcIi4vaW5wdXQtbWFwL0lucHV0TWFwXCI7XG5pbXBvcnQgeyBBbnlJbnB1dFZpZXcsIElucHV0VmlldyB9IGZyb20gXCIuL0lucHV0Vmlld1wiO1xuXG5leHBvcnQgY2xhc3MgSW5wdXRWaWV3Q2hpbGRyZW4ge1xuICB2aWV3TWFwOiBSZWNvcmQ8c3RyaW5nLCBBbnlJbnB1dFZpZXc+ID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGFzeW5jIHVwZGF0ZUVycm9yKGVycm9yKSB7XG4gICAgY29uc3QgZXJyb3JNYXAgPSAodHlwZW9mIGVycm9yID09PSBcIm9iamVjdFwiICYmIGVycm9yPy5lcnJvck1hcCkgfHwge307XG4gICAgZm9yIChjb25zdCBba2V5LCB2aWV3XSBvZiBlbnRyaWVzPEFueUlucHV0Vmlldz4odGhpcy52aWV3TWFwKSkge1xuICAgICAgdmlldy5zZXRFcnJvcihlcnJvck1hcFtrZXldKTtcbiAgICB9XG4gIH1cblxuICByZWYoa2V5OiBzdHJpbmcpOiBSZWZDYWxsYmFjazxBbnlJbnB1dFZpZXc+IHtcbiAgICByZXR1cm4gdmlldyA9PiB7XG4gICAgICBpZiAodmlldykge1xuICAgICAgICB0aGlzLnZpZXdNYXBba2V5XSA9IHZpZXc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy52aWV3TWFwW2tleV07XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldEVycm9yKCk6IFByb21pc2U8SW5wdXRFcnJvck1hcDxhbnk+IHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgZXJyb3JNYXAgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZpZXddIG9mIGVudHJpZXModGhpcy52aWV3TWFwKSkge1xuICAgICAgYXdhaXQgdmlldy52YWxpZGF0ZSgpO1xuICAgICAgY29uc3QgeyBlcnJvciB9ID0gdmlldztcbiAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgIGVycm9yTWFwW2tleV0gPSBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGhhc0tleXMoZXJyb3JNYXApKSByZXR1cm4geyB0eXBlOiBcIkVSUk9SX01BUFwiLCBlcnJvck1hcCB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBQYXlsb2FkIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5cbmV4cG9ydCB0eXBlIExlbmd0aEVycm9yID0gUGF5bG9hZDx7XG4gIE1BWF9MRU5HVEg6IHsgbWF4TGVuZ3RoOiBudW1iZXIgfTtcbiAgTUlOX0xFTkdUSDogeyBtaW5MZW5ndGg6IG51bWJlciB9O1xufT47XG5leHBvcnQgdHlwZSBMZW5ndGhPcHRpb25zID0ge1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIG1pbkxlbmd0aD86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMZW5ndGhFcnJvcihcbiAgdmFsdWU6IHsgbGVuZ3RoOiBudW1iZXIgfSxcbiAgeyBtYXhMZW5ndGgsIG1pbkxlbmd0aCB9OiBMZW5ndGhPcHRpb25zXG4pOiBMZW5ndGhFcnJvciB8IHVuZGVmaW5lZCB7XG4gIGlmIChtYXhMZW5ndGggJiYgdmFsdWUubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogXCJNQVhfTEVOR1RIXCIsIG1heExlbmd0aCB9O1xuICB9XG4gIGlmIChtaW5MZW5ndGggJiYgdmFsdWUubGVuZ3RoIDwgbWluTGVuZ3RoKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogXCJNSU5fTEVOR1RIXCIsIG1pbkxlbmd0aCB9O1xuICB9XG59XG4iLCJpbXBvcnQge0F3YWl0YWJsZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5cbmV4cG9ydCB0eXBlIFZhbHVlT3JBd2FpdGFibGVGbjxUPiA9IFQgfCAoKCkgPT4gQXdhaXRhYmxlPFQ+KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFZhbHVlT3JBd2FpdGFibGVGbjxUPih2YWx1ZTogVmFsdWVPckF3YWl0YWJsZUZuPFQ+KTogUHJvbWlzZTxUPiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiAoPGFueT52YWx1ZSkoKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuIiwiaW1wb3J0IHtcbiAgSWYsXG4gIElzLFxuICBJc05ldmVyLFxuICBPbWl0S2V5cyxcbiAgT3ZlcnJpZGUsXG4gIFBhcnRpYWxVbmRlZmluZWRLZXlzLFxufSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IERhdGFSb3cgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZWRhdGEvRGF0YVJvd1wiO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9EYXRhU291cmNlXCI7XG5pbXBvcnQgeyBHZW5lcmljQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0dlbmVyaWNDb25maWdcIjtcbmltcG9ydCB7IE5vUnBjIH0gZnJvbSBcIi4uLy4uL05vUnBjXCI7XG5pbXBvcnQgeyBEYXRhVGFibGUgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0L2RhdGEtdGFibGUvRGF0YVRhYmxlXCI7XG5pbXBvcnQgeyBBbnlSb3dUeXBlLCBSb3csIHN0cmluZyB9IGZyb20gXCIuLi8uLi93aWRnZXQvUm93XCI7XG5pbXBvcnQgeyBXaWRnZXRUeXBlIH0gZnJvbSBcIi4uLy4uL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4uL0lucHV0XCI7XG5pbXBvcnQgeyBOdWxsYWJsZUlucHV0IH0gZnJvbSBcIi4uL251bGxhYmxlLWlucHV0L051bGxhYmxlSW5wdXRcIjtcblxuaW1wb3J0IHsgVmFsdWVPckF3YWl0YWJsZUZuIH0gZnJvbSBcIi4uL1ZhbHVlT3JBd2FpdGFibGVGblwiO1xuaW1wb3J0IHsgRGF0YUlucHV0SGFuZGxlciB9IGZyb20gXCIuL0RhdGFJbnB1dEhhbmRsZXJcIjtcbmltcG9ydCB7IERhdGFJbnB1dFRlc3RlciB9IGZyb20gXCIuL0RhdGFJbnB1dFRlc3RlclwiO1xuXG5leHBvcnQgdHlwZSBXaXRoRGF0YUtleSA9IHtcbiAgJGtleTogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgRGF0YUlucHV0VHlwZXM8VCBleHRlbmRzIFREYXRhSW5wdXQ+ID0gX1R5cGVzPFQ+O1xuXG50eXBlIF9UeXBlczxUIGV4dGVuZHMgVERhdGFJbnB1dD4gPSBUICYge1xuICBUYWJsZTogRGF0YVRhYmxlPHtcbiAgICBSb3c6IFRbXCJUYWJsZVJvd1wiXTtcbiAgICBEYXRhOiBUW1wiVGFibGVEYXRhXCJdO1xuICAgIFJvd0NvbnRyb2xsZXI6IE5vUnBjO1xuICB9PjtcblxuICBUYWJsZVR5cGVzOiBXaWRnZXRUeXBlPF9UeXBlczxUPltcIlRhYmxlXCJdPltcIlR5cGVzXCJdO1xuXG4gIE9wdGlvbmFsQ29uZmlnOiB7XG4gICAgY29sdW1uczogX1R5cGVzPFQ+W1wiVGFibGVUeXBlc1wiXVtcIkNvbHVtbkNvbmZpZ01hcFwiXTtcbiAgfTtcblxuICBSZXF1aXJlZENvbmZpZzoge1xuICAgIGRlZmF1bHQ/OiBWYWx1ZU9yQXdhaXRhYmxlRm48c3RyaW5nIHwgRGF0YVJvdzxUW1wiVGFibGVEYXRhXCJdPiB8IHVuZGVmaW5lZD47XG5cbiAgICB0YWJsZUNvbmZpZz86IE9taXRLZXlzPFxuICAgICAgX1R5cGVzPFQ+W1wiVGFibGVUeXBlc1wiXVtcIlJlcXVpcmVkQ29uZmlnXCJdICZcbiAgICAgICAgX1R5cGVzPFQ+W1wiVGFibGVUeXBlc1wiXVtcIk9wdGlvbmFsQ29uZmlnXCJdLFxuICAgICAgXCJjb2x1bW5zXCIgfCBcInNvdXJjZVwiXG4gICAgPjtcblxuICAgIHNvdXJjZTogRGF0YVNvdXJjZTxUW1wiVGFibGVEYXRhXCJdPjtcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIERhdGFJbnB1dENvbmZpZzxUIGV4dGVuZHMgVERhdGFJbnB1dD4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAgX1R5cGVzPFQ+W1wiT3B0aW9uYWxDb25maWdcIl0gJiB7XG4gICAgbG9hZFNvdXJjZTpcbiAgICAgIHwgRGF0YVNvdXJjZTxUW1wiTG9hZERhdGFcIl0+XG4gICAgICB8IElmPFxuICAgICAgICAgIElzPFRbXCJWYWx1ZVwiXSwgc3RyaW5nPiB8IElzPFRbXCJUYWJsZURhdGFcIl0sIFRbXCJMb2FkUm93XCJdPixcbiAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgPjtcbiAgfSxcbiAgX1R5cGVzPFQ+W1wiUmVxdWlyZWRDb25maWdcIl1cbj47XG5cbmV4cG9ydCB0eXBlIEFueURhdGFJbnB1dCA9IERhdGFJbnB1dDxhbnksIFREYXRhSW5wdXQ+O1xuXG5leHBvcnQgdHlwZSBURGF0YUlucHV0ID0ge1xuICBUYWJsZVJvdzogYW55O1xuXG4gIFRhYmxlRGF0YTogYW55O1xuXG4gIExvYWREYXRhOiBhbnk7XG5cbiAgTG9hZFJvdzogYW55O1xuXG4gIFZhbHVlOiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBEYXRhSW5wdXQ8TiBleHRlbmRzIGJvb2xlYW4sIFQgZXh0ZW5kcyBURGF0YUlucHV0PiA9IE51bGxhYmxlSW5wdXQ8XG4gIE4sXG4gIHtcbiAgICBUeXBlczogX1R5cGVzPFQ+O1xuXG4gICAgQ29tbWFuZHM6IHt9O1xuXG4gICAgVmFsdWVEYXRhOiBzdHJpbmc7XG5cbiAgICBWYWx1ZTogVFtcIlZhbHVlXCJdO1xuXG4gICAgVmFsdWVFbGVtZW50OiBfVHlwZXM8VD5bXCJUYWJsZVR5cGVzXCJdW1wiUm93V2l0aEtleVwiXTtcblxuICAgIFByb3BzOiB7XG4gICAgICB0YWJsZTogX1R5cGVzPFQ+W1wiVGFibGVcIl07XG5cbiAgICAgIGhhc0xvYWRUeXBlOiBib29sZWFuO1xuICAgIH07XG5cbiAgICBDb25maWc6IEdlbmVyaWNDb25maWc8XG4gICAgICA8VGFibGVEYXRhLCBMb2FkRGF0YSA9IFRhYmxlRGF0YT4oXG4gICAgICAgIGNvbmZpZzogRGF0YUlucHV0Q29uZmlnPFxuICAgICAgICAgIE92ZXJyaWRlPFxuICAgICAgICAgICAgVCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgVGFibGVEYXRhOiBUYWJsZURhdGE7XG4gICAgICAgICAgICAgIExvYWREYXRhOiBMb2FkRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA+XG4gICAgICAgID5cbiAgICAgICkgPT4gRGF0YUlucHV0Q29uZmlnPFQ+XG4gICAgPjtcblxuICAgIEVsZW1lbnQ6IHt9O1xuXG4gICAgQ29udHJvbGxlcjogX1R5cGVzPFQ+W1wiVGFibGVcIl07XG5cbiAgICBFcnJvcjogXCJJTlZBTElEX0RBVEFfS0VZXCI7XG4gIH1cbj47XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXRhSW5wdXQ8XG4gIFRhYmxlUm93VHlwZSBleHRlbmRzIEFueVJvd1R5cGUgPSB7XG4gICAgbGFiZWw6IHR5cGVvZiBzdHJpbmc7XG4gIH0sXG4gIE4gZXh0ZW5kcyBib29sZWFuID0gZmFsc2UsXG4gIExvYWRUeXBlID0gbmV2ZXIsXG4gIFMgZXh0ZW5kcyBQcm9wZXJ0eUtleSA9IGFueVxuPihcbiAgb3B0aW9uczoge1xuICAgIG51bGxhYmxlPzogTjtcbiAgICB0YWJsZVJvd1R5cGU/OiBUYWJsZVJvd1R5cGU7XG4gICAgbG9hZFR5cGU/OiBMb2FkVHlwZTtcbiAgfSA9IHt9XG4pOiBEYXRhSW5wdXQ8XG4gIE4sXG4gIHtcbiAgICBUYWJsZVJvdzogUm93PFRhYmxlUm93VHlwZT47XG4gICAgRGF0YTogYW55O1xuICAgIExvYWRSb3c6IExvYWRUeXBlO1xuICAgIFRhYmxlRGF0YTogYW55O1xuICAgIExvYWREYXRhOiBhbnk7XG4gICAgVmFsdWU6IElzTmV2ZXI8TG9hZFR5cGU+IGV4dGVuZHMgdHJ1ZSA/IHN0cmluZyA6IERhdGFSb3c8TG9hZFR5cGU+O1xuICAgIFJvdzogYW55O1xuICB9XG4+IHtcbiAgY29uc3QgdGFibGUgPSBEYXRhVGFibGUob3B0aW9ucy50YWJsZVJvd1R5cGUgfHwgeyBsYWJlbDogc3RyaW5nIH0pO1xuICByZXR1cm4gPGFueT5JbnB1dDxBbnlEYXRhSW5wdXQ+KHtcbiAgICBwcm9wczoge1xuICAgICAgbnVsbGFibGU6IG9wdGlvbnMubnVsbGFibGUgPz8gZmFsc2UsXG4gICAgICB0YWJsZSxcbiAgICAgIGhhc0xvYWRUeXBlOiAhIW9wdGlvbnMubG9hZFR5cGUsXG4gICAgfSxcbiAgICBpc0dlbmVyaWNDb25maWc6IHRydWUsXG4gICAgY29udHJvbGxlcjogdGFibGUsXG4gICAgaGFuZGxlcjogRGF0YUlucHV0SGFuZGxlcixcbiAgICBnZXRWYWx1ZURhdGFGcm9tRWxlbWVudCh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlPy4ka2V5O1xuICAgIH0sXG4gIH0pO1xufVxuXG4vLyBEYXRhSW5wdXQoe1xuLy8gICAgdGFibGVSb3c6IHt9XG4vLyAgICByb3c6IFR5cGluZzxVc2VyPigpXG4vLyB9KVxuIiwiaW1wb3J0IHsgUmVxdWlyZU9wdGlvbmFsS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgRGF0YVJvdyB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9EYXRhUm93XCI7XG5pbXBvcnQgeyBScGNFcnJvciwgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IFdpZGdldENvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0L1dpZGdldFwiO1xuaW1wb3J0IHtcbiAgRXJyb3JPclZhbHVlLFxuICBJbnB1dEVsZW1lbnQsXG4gIElucHV0RXJyb3IsXG4gIElucHV0VHlwZSxcbiAgSW5wdXRWYWx1ZSxcbiAgSW5wdXRWYWx1ZURhdGEsXG4gIElucHV0VmFsdWVFbGVtZW50LFxufSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IEFic3RyYWN0TnVsbGFibGVJbnB1dEhhbmRsZXIgfSBmcm9tIFwiLi4vbnVsbGFibGUtaW5wdXQvQWJzdHJhY3ROdWxsYWJsZUlucHV0SGFuZGxlclwiO1xuaW1wb3J0IHsgVmFsdWVPckF3YWl0YWJsZUZuIH0gZnJvbSBcIi4uL1ZhbHVlT3JBd2FpdGFibGVGblwiO1xuaW1wb3J0IHsgQW55RGF0YUlucHV0IH0gZnJvbSBcIi4vRGF0YUlucHV0XCI7XG5cbnR5cGUgVCA9IEFueURhdGFJbnB1dDtcblxuZXhwb3J0IGNsYXNzIERhdGFJbnB1dEhhbmRsZXIgZXh0ZW5kcyBBYnN0cmFjdE51bGxhYmxlSW5wdXRIYW5kbGVyPFQ+IHtcbiAgZ2V0Q29udHJvbGxlckNvbmZpZygpOiBScGNVbnJlc29sdmVkQ29uZmlnPFdpZGdldENvbnRyb2xsZXI8VD4+IHtcbiAgICByZXR1cm4gJCA9PlxuICAgICAgJCh7XG4gICAgICAgIC4uLnRoaXMuY29uZmlnLnRhYmxlQ29uZmlnLFxuICAgICAgICBzb3VyY2U6IHRoaXMuY29uZmlnLnNvdXJjZSxcbiAgICAgICAgY29sdW1uczogdGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgIH0pO1xuICB9XG5cbiAgZ2V0SW5wdXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxJbnB1dEVsZW1lbnQ8VD4+PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7fSk7XG4gIH1cblxuICBhc3luYyBnZXRWYWx1ZUVsZW1lbnQoXG4gICAgZGF0YUtleTogSW5wdXRWYWx1ZTxUPiB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPElucHV0VmFsdWVFbGVtZW50PFQ+PiB7XG4gICAgbGV0IGRhdGFSb3c6IERhdGFSb3c8YW55PiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoIWRhdGFLZXkpIHtcbiAgICAgIGNvbnN0IGRhdGFLZXlPclJvdyA9IGF3YWl0IFZhbHVlT3JBd2FpdGFibGVGbih0aGlzLmNvbmZpZy5kZWZhdWx0KTtcbiAgICAgIGlmIChkYXRhS2V5T3JSb3cgJiYgdHlwZW9mIGRhdGFLZXlPclJvdyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBkYXRhUm93ID0gZGF0YUtleU9yUm93O1xuICAgICAgfSBlbHNlIGlmIChkYXRhS2V5T3JSb3cpIHtcbiAgICAgICAgZGF0YUtleSA9IFN0cmluZyhkYXRhS2V5T3JSb3cpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZGF0YUtleSAmJiAhZGF0YVJvdykge1xuICAgICAgZGF0YVJvdyA9IGF3YWl0IHRoaXMuY29uZmlnLnNvdXJjZS5nZXQoZGF0YUtleSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhUm93ICYmIChhd2FpdCB0aGlzLmNvbnRyb2xsZXIudGhlbihjID0+IGMubG9hZFJvdyhkYXRhUm93KSkpO1xuICB9XG5cbiAgYXN5bmMgbG9hZEFuZENoZWNrTm90TnVsbChcbiAgICBrZXk6IE5vbk51bGxhYmxlPElucHV0VmFsdWVEYXRhPFQ+PlxuICApOiBQcm9taXNlPEVycm9yT3JWYWx1ZTxJbnB1dEVycm9yPFQ+LCBOb25OdWxsYWJsZTxJbnB1dFZhbHVlPFQ+Pj4+IHtcbiAgICBpZiAodGhpcy5ycGMuaGFzTG9hZFR5cGUpIHtcbiAgICAgIGNvbnN0IHJvdyA9IGF3YWl0ICh0aGlzLmNvbmZpZy5sb2FkU291cmNlIHx8IHRoaXMuY29uZmlnLnNvdXJjZSkuZ2V0KFxuICAgICAgICBTdHJpbmcoa2V5KVxuICAgICAgKTtcbiAgICAgIGlmICghcm93KSB7XG4gICAgICAgIHJldHVybiB7IGVycm9yOiBcIklOVkFMSURfREFUQV9LRVlcIiwgdmFsdWU6IHVuZGVmaW5lZCB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgdmFsdWU6IHJvdyB9O1xuICAgIH1cbiAgICBpZiAoIShhd2FpdCB0aGlzLmNvbmZpZy5zb3VyY2UuZmlsdGVyKHsgJGlzOiBrZXkgfSkuaGFzUm93KCkpKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogXCJJTlZBTElEX0RBVEFfS0VZXCIsIHZhbHVlOiB1bmRlZmluZWQgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGtleSB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgTnVsbGFibGVJbnB1dFZpZXcgfSBmcm9tIFwiLi4vbnVsbGFibGUtaW5wdXQvTnVsbGFibGVJbnB1dFZpZXdcIjtcbmltcG9ydCB7IEFueURhdGFJbnB1dCB9IGZyb20gXCIuL0RhdGFJbnB1dFwiO1xuXG5leHBvcnQgY2xhc3MgRGF0YUlucHV0VmlldzxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55RGF0YUlucHV0PlxuPiBleHRlbmRzIE51bGxhYmxlSW5wdXRWaWV3PEM+IHt9XG4iLCJpbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7IFBheWxvYWQgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBScGNNYXAgfSBmcm9tIFwiLi4vLi4vcnBjLW1hcC9ScGNNYXBcIjtcblxuaW1wb3J0IHtcbiAgQW55SW5wdXQsXG4gIElucHV0LFxuICBJbnB1dEVsZW1lbnQsXG4gIElucHV0RXJyb3IsXG4gIElucHV0VmFsdWUsXG4gIElucHV0VmFsdWVEYXRhLFxuICBJbnB1dFZhbHVlRWxlbWVudCxcbn0gZnJvbSBcIi4uL0lucHV0XCI7XG5pbXBvcnQgeyBJbnB1dE1hcEhhbmRsZXIgfSBmcm9tIFwiLi9JbnB1dE1hcEhhbmRsZXJcIjtcblxuZXhwb3J0IHR5cGUgQW55SW5wdXRSZWNvcmQgPSBSZWNvcmQ8c3RyaW5nLCBBbnlJbnB1dD47XG5leHBvcnQgdHlwZSBBbnlJbnB1dE1hcCA9IElucHV0TWFwPEFueUlucHV0UmVjb3JkPjtcbmV4cG9ydCB0eXBlIElucHV0RXJyb3JNYXA8VCBleHRlbmRzIEFueUlucHV0UmVjb3JkPiA9IFBheWxvYWQ8e1xuICBFUlJPUl9NQVA6IHtcbiAgICBlcnJvck1hcDogeyBbSyBpbiBrZXlvZiBUXTogSW5wdXRFcnJvcjxUW0tdPiB9O1xuICB9O1xufT47XG5cbmV4cG9ydCB0eXBlIElucHV0TWFwPFQgZXh0ZW5kcyBBbnlJbnB1dFJlY29yZD4gPSBJbnB1dDx7XG4gIFRJbnB1dE1hcDogVDtcbiAgQ29tbWFuZHM6IHt9O1xuICBDb250cm9sbGVyOiBScGNNYXA8VD47XG4gIFByb3BzOiB7XG4gICAgdGFyZ2V0TWFwOiBUO1xuICB9O1xuICBFbGVtZW50OiB7XG4gICAgZWxlbWVudE1hcDoge1xuICAgICAgW0sgaW4ga2V5b2YgVF06IElucHV0RWxlbWVudDxUW0tdPjtcbiAgICB9O1xuICB9O1xuICBDb25maWc6IFJwY1VucmVzb2x2ZWRDb25maWc8UnBjTWFwPFQ+PjtcbiAgRXJyb3I6IElucHV0RXJyb3JNYXA8VD47XG4gIFZhbHVlRGF0YTogeyBbSyBpbiBrZXlvZiBUXTogSW5wdXRWYWx1ZURhdGE8VFtLXT4gfTtcbiAgVmFsdWU6IHsgW0sgaW4ga2V5b2YgVF06IElucHV0VmFsdWU8VFtLXT4gfTtcbiAgVmFsdWVFbGVtZW50OiB7IFtLIGluIGtleW9mIFRdOiBJbnB1dFZhbHVlRWxlbWVudDxUW0tdPiB9O1xufT47XG5cbi8vXG5cbmV4cG9ydCBmdW5jdGlvbiBJbnB1dE1hcDxUIGV4dGVuZHMgQW55SW5wdXRSZWNvcmQ+KHRhcmdldE1hcDogVCk6IElucHV0TWFwPFQ+IHtcbiAgcmV0dXJuIDxhbnk+SW5wdXQ8QW55SW5wdXRNYXA+KHtcbiAgICBwcm9wczoge1xuICAgICAgdGFyZ2V0TWFwLFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogUnBjTWFwKHRhcmdldE1hcCksXG4gICAgaGFuZGxlcjogSW5wdXRNYXBIYW5kbGVyLFxuICAgIGdldFZhbHVlRGF0YUZyb21FbGVtZW50KHZhbHVlRWxlbWVudE1hcCkge1xuICAgICAgcmV0dXJuIG1hcE9iamVjdCh2YWx1ZUVsZW1lbnRNYXAsIChpdGVtVmFsdWUsIGl0ZW1LZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0TWFwW2l0ZW1LZXldLmdldFZhbHVlRGF0YUZyb21FbGVtZW50KGl0ZW1WYWx1ZSk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7IGhhc0tleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9oYXNLZXlzXCI7XG5pbXBvcnQgeyBtYXBPYmplY3RBc3luYyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L21hcE9iamVjdFwiO1xuaW1wb3J0IHsgUmVxdWlyZU9wdGlvbmFsS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IFdpZGdldENvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0L1dpZGdldFwiO1xuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dEhhbmRsZXIgfSBmcm9tIFwiLi4vQWJzdHJhY3RJbnB1dEhhbmRsZXJcIjtcbmltcG9ydCB7XG4gIElucHV0RWxlbWVudCxcbiAgSW5wdXRFcnJvck9yVmFsdWUsXG4gIElucHV0VmFsdWUsXG4gIElucHV0VmFsdWVEYXRhLFxuICBJbnB1dFZhbHVlRWxlbWVudCxcbn0gZnJvbSBcIi4uL0lucHV0XCI7XG5pbXBvcnQgeyBBbnlJbnB1dE1hcCB9IGZyb20gXCIuL0lucHV0TWFwXCI7XG5cbnR5cGUgVCA9IEFueUlucHV0TWFwO1xuXG5leHBvcnQgY2xhc3MgSW5wdXRNYXBIYW5kbGVyIGV4dGVuZHMgQWJzdHJhY3RJbnB1dEhhbmRsZXI8VD4ge1xuICBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxUPj4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZztcbiAgfVxuXG4gIGdldFZhbHVlRWxlbWVudChcbiAgICB2YWx1ZTogSW5wdXRWYWx1ZTxUPiB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPElucHV0VmFsdWVFbGVtZW50PFQ+PiB7XG4gICAgcmV0dXJuIG1hcE9iamVjdEFzeW5jKHRoaXMucnBjLnRhcmdldE1hcCwgKHRhcmdldCwga2V5KSA9PlxuICAgICAgdGhpcy5jb250cm9sbGVyXG4gICAgICAgIC50aGVuKGMgPT4gYy5nZXRUYXJnZXRIYW5kbGVyKGtleSkpXG4gICAgICAgIC50aGVuKGggPT4gaC5nZXRWYWx1ZUVsZW1lbnQodmFsdWU/LltrZXldKSlcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgZ2V0SW5wdXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxJbnB1dEVsZW1lbnQ8VD4+PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVsZW1lbnRNYXA6IGF3YWl0IG1hcE9iamVjdEFzeW5jKHRoaXMucnBjLnRhcmdldE1hcCwgKHRhcmdldCwga2V5KSA9PlxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJcbiAgICAgICAgICAudGhlbihjID0+IGMuZ2V0VGFyZ2V0SGFuZGxlcihrZXkpKVxuICAgICAgICAgIC50aGVuKGggPT4gaC5nZXRJbnB1dEVsZW1lbnQoKSlcbiAgICAgICksXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRBbmRDaGVjayhcbiAgICBkYXRhTWFwOiBJbnB1dFZhbHVlRGF0YTxUPlxuICApOiBQcm9taXNlPElucHV0RXJyb3JPclZhbHVlPFQ+PiB7XG4gICAgY29uc3QgZXJyb3JNYXA6IGFueSA9IHt9O1xuICAgIGNvbnN0IHZhbHVlTWFwID0gYXdhaXQgbWFwT2JqZWN0QXN5bmModGhpcy5ycGMudGFyZ2V0TWFwLCAodGFyZ2V0LCBrZXkpID0+XG4gICAgICB0aGlzLmNvbnRyb2xsZXJcbiAgICAgICAgLnRoZW4oYyA9PiBjLmdldFRhcmdldEhhbmRsZXIoa2V5KSlcbiAgICAgICAgLnRoZW4oaCA9PiBoLmxvYWRBbmRDaGVjayhkYXRhTWFwW2tleV0pKVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmIChcImVycm9yXCIgaW4gcmVzdWx0KSB7XG4gICAgICAgICAgICBlcnJvck1hcFtrZXldID0gcmVzdWx0LmVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0LnZhbHVlO1xuICAgICAgICB9KVxuICAgICk7XG5cbiAgICBpZiAoaGFzS2V5cyhlcnJvck1hcCkpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiB2YWx1ZU1hcCwgZXJyb3I6IHsgdHlwZTogXCJFUlJPUl9NQVBcIiwgZXJyb3JNYXAgfSB9O1xuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogdmFsdWVNYXAgfTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBGcmFnbWVudCwgUmVhY3RFbGVtZW50LCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG1hcE9iamVjdCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L21hcE9iamVjdFwiO1xuaW1wb3J0IHsgbWFwT2JqZWN0VG9BcnJheSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L21hcE9iamVjdFRvQXJyYXlcIjtcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3JlbmRlcmVyXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgV2lkZ2V0Q29udHJvbGxlciB9IGZyb20gXCIuLi8uLi93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQgeyBBYnN0cmFjdElucHV0VmlldyB9IGZyb20gXCIuLi9BYnN0cmFjdElucHV0Vmlld1wiO1xuaW1wb3J0IHsgQW55SW5wdXRDb25uZWN0aW9uIH0gZnJvbSBcIi4uL0lucHV0XCI7XG5pbXBvcnQgeyBJbnB1dFZpZXdQcm9wcyB9IGZyb20gXCIuLi9JbnB1dFZpZXdcIjtcbmltcG9ydCB7IElucHV0Vmlld0NoaWxkcmVuIH0gZnJvbSBcIi4uL0lucHV0Vmlld0NoaWxkcmVuXCI7XG5pbXBvcnQgeyBBbnlJbnB1dE1hcCwgQW55SW5wdXRSZWNvcmQsIElucHV0TWFwIH0gZnJvbSBcIi4vSW5wdXRNYXBcIjtcblxuZXhwb3J0IHR5cGUgQW55SW5wdXRNYXBDb25uZWN0aW9uID0gUnBjQ29ubmVjdGlvbjxJbnB1dE1hcDxBbnlJbnB1dFJlY29yZD4+O1xuXG5leHBvcnQgY2xhc3MgSW5wdXRNYXBWaWV3PFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxJbnB1dE1hcDxBbnlJbnB1dFJlY29yZD4+XG4+IGV4dGVuZHMgQWJzdHJhY3RJbnB1dFZpZXc8XG4gIEMsXG4gIElucHV0Vmlld1Byb3BzPEM+ICYge1xuICAgIGNoaWxkcmVuKFxuICAgICAgZ2V0UHJvcHM6IDxLIGV4dGVuZHMga2V5b2YgUnBjQ29ubmVjdGlvbjxXaWRnZXRDb250cm9sbGVyPEM+Pj4oXG4gICAgICAgIGtleTogc3RyaW5nICYgS1xuICAgICAgKSA9PiBJbnB1dFZpZXdQcm9wczxScGNDb25uZWN0aW9uPFdpZGdldENvbnRyb2xsZXI8Qz4+W0tdPixcbiAgICAgIHZpZXc6IElucHV0TWFwVmlldzxDPlxuICAgICk6IFJlYWN0Tm9kZTtcbiAgfVxuPiB7XG4gIGNoaWxkcmVuID0gbmV3IElucHV0Vmlld0NoaWxkcmVuKCk7XG5cbiAgZ2V0UHJvcHM8SyBleHRlbmRzIGtleW9mIFJwY0Nvbm5lY3Rpb248V2lkZ2V0Q29udHJvbGxlcjxDPj4+KFxuICAgIGtleTogc3RyaW5nICYgS1xuICApOiBJbnB1dFZpZXdQcm9wczxScGNDb25uZWN0aW9uPFdpZGdldENvbnRyb2xsZXI8Qz4+W0tdPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleSxcbiAgICAgIGNvbm5lY3Rpb246IHRoaXMuY29udHJvbGxlcltrZXldLFxuICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LmVsZW1lbnRNYXBba2V5XSxcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlPy5ba2V5XSxcbiAgICAgIG9uRXJyb3I6IHZpZXcgPT4gdGhpcy5wcm9wcy5vbkVycm9yPy4odGhpcyksXG4gICAgICBvbkNoYW5nZTogdmlldyA9PlxuICAgICAgICB0aGlzLnNldFZhbHVlKHtcbiAgICAgICAgICAuLi50aGlzLnZhbHVlLFxuICAgICAgICAgIFtrZXldOiB2aWV3LnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIGlucHV0UmVmOiB0aGlzLmNoaWxkcmVuLnJlZihrZXkpLFxuICAgIH0gYXMgSW5wdXRWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxXaWRnZXRDb250cm9sbGVyPEM+PltLXT47XG4gIH1cblxuICByZW5kZXJWaWV3KCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW4odGhpcy5nZXRQcm9wcy5iaW5kKHRoaXMpLCB0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIElucHV0TWFwVmlldyB7XG4gIGV4cG9ydCB0eXBlIEZpZWxkc1Byb3BzPFxuICAgIEMgZXh0ZW5kcyBBbnlJbnB1dE1hcENvbm5lY3Rpb24sXG4gICAgVCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIEFueUlucHV0Q29ubmVjdGlvbj4gPSBScGNDb25uZWN0aW9uPFxuICAgICAgV2lkZ2V0Q29udHJvbGxlcjxDPlxuICAgID5cbiAgPiA9IElucHV0Vmlld1Byb3BzPEM+ICYge1xuICAgIGZpZWxkczogeyBbSyBpbiBzdHJpbmcgJiBrZXlvZiBUXTogUmVuZGVyZXI8SW5wdXRWaWV3UHJvcHM8VFtLXT4+IH07XG4gICAgY2hpbGRyZW4/OiBSZW5kZXJlcjx7XG4gICAgICBmaWVsZHM6IFJlY29yZDxzdHJpbmcgJiBrZXlvZiBULCBSZWFjdEVsZW1lbnQ+O1xuICAgICAgdmlldzogSW5wdXRNYXBWaWV3PEM+O1xuICAgIH0+O1xuICB9O1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBGaWVsZHM8QyBleHRlbmRzIEFueUlucHV0TWFwQ29ubmVjdGlvbj4oe1xuICAgIGNoaWxkcmVuLFxuICAgIGZpZWxkczoga2V5VG9SZW5kZXJlcixcbiAgICAuLi5wcm9wc1xuICB9OiBGaWVsZHNQcm9wczxDPikge1xuICAgIHJldHVybiAoXG4gICAgICA8SW5wdXRNYXBWaWV3XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgY2hpbGRyZW49eyhnZXRQcm9wcywgdmlldykgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuKHtcbiAgICAgICAgICAgICAgdmlldyxcbiAgICAgICAgICAgICAgZmllbGRzOiBtYXBPYmplY3Qoa2V5VG9SZW5kZXJlciwgKHJlbmRlciwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBGcmFnbWVudCxcbiAgICAgICAgICAgICAgICAgIHsga2V5IH0sXG4gICAgICAgICAgICAgICAgICByZW5kZXIoZ2V0UHJvcHMoa2V5KSBhcyBhbnkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1hcE9iamVjdFRvQXJyYXkoXG4gICAgICAgICAgICBrZXlUb1JlbmRlcmVyLFxuICAgICAgICAgICAgKHJlbmRlcjogUmVuZGVyZXI8YW55Piwga2V5KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIEZyYWdtZW50LFxuICAgICAgICAgICAgICAgIHsga2V5IH0sXG4gICAgICAgICAgICAgICAgcmVuZGVyKGdldFByb3BzKGtleSkgYXMgYW55KVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJwY0Vycm9yIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dEhhbmRsZXIgfSBmcm9tIFwiLi4vQWJzdHJhY3RJbnB1dEhhbmRsZXJcIjtcbmltcG9ydCB7XG4gIEVycm9yT3JWYWx1ZSxcbiAgSW5wdXRFcnJvcixcbiAgSW5wdXRFcnJvck9yVmFsdWUsXG4gIElucHV0VmFsdWUsXG4gIElucHV0VmFsdWVEYXRhLFxuICBUSW5wdXQsXG59IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgTnVsbGFibGVJbnB1dCB9IGZyb20gXCIuL051bGxhYmxlSW5wdXRcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0TnVsbGFibGVJbnB1dEhhbmRsZXI8XG4gIFQgZXh0ZW5kcyBOdWxsYWJsZUlucHV0PGFueSwgVElucHV0PlxuPiBleHRlbmRzIEFic3RyYWN0SW5wdXRIYW5kbGVyPFQ+IHtcbiAgYWJzdHJhY3QgbG9hZEFuZENoZWNrTm90TnVsbChcbiAgICB2YWx1ZURhdGE6IE5vbk51bGxhYmxlPElucHV0VmFsdWVEYXRhPFQ+PlxuICApOiBQcm9taXNlPEVycm9yT3JWYWx1ZTxJbnB1dEVycm9yPFQ+LCBOb25OdWxsYWJsZTxJbnB1dFZhbHVlPFQ+Pj4+O1xuXG4gIGFzeW5jIGxvYWRBbmRDaGVjayhcbiAgICB2YWx1ZURhdGE6IElucHV0VmFsdWVEYXRhPFQ+XG4gICk6IFByb21pc2U8SW5wdXRFcnJvck9yVmFsdWU8VD4+IHtcbiAgICBpZiAodmFsdWVEYXRhID09IG51bGwpIHtcbiAgICAgIGlmICghdGhpcy5ycGMubnVsbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiTk9UX05VTExBQkxFXCIsIHZhbHVlOiB1bmRlZmluZWQgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHZhbHVlOiBudWxsIH07XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMubG9hZEFuZENoZWNrTm90TnVsbCh2YWx1ZURhdGEpO1xuICAgIGlmIChcImVycm9yXCIgaW4gcmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChyZXN1bHQudmFsdWUgPT0gbnVsbCkge1xuICAgICAgaWYgKCF0aGlzLnJwYy5udWxsYWJsZSkge1xuICAgICAgICB0aHJvdyBuZXcgUnBjRXJyb3IoYHZhbHVlIGlzIG51bGxgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdElucHV0VmlldyB9IGZyb20gXCIuLi9BYnN0cmFjdElucHV0Vmlld1wiO1xuaW1wb3J0IHsgSW5wdXRFcnJvciwgVElucHV0IH0gZnJvbSBcIi4uL0lucHV0XCI7XG5pbXBvcnQgeyBJbnB1dFZpZXdQcm9wcyB9IGZyb20gXCIuLi9JbnB1dFZpZXdcIjtcbmltcG9ydCB7IE51bGxhYmxlSW5wdXQgfSBmcm9tIFwiLi9OdWxsYWJsZUlucHV0XCI7XG5pbXBvcnQgeyBBbnlEYXRhSW5wdXQgfSBmcm9tIFwiLi4vZGF0YS1pbnB1dC9EYXRhSW5wdXRcIjtcblxuZXhwb3J0IGNsYXNzIE51bGxhYmxlSW5wdXRWaWV3PFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxOdWxsYWJsZUlucHV0PGFueSwgVElucHV0Pj5cbj4gZXh0ZW5kcyBBYnN0cmFjdElucHV0VmlldzxcbiAgQyxcbiAgSW5wdXRWaWV3UHJvcHM8Qz4gJiB7XG4gICAgY2hpbGRyZW4odmlldzogTnVsbGFibGVJbnB1dFZpZXc8Qz4pOiBSZWFjdEVsZW1lbnQ7XG4gIH1cbj4ge1xuICBwcm90ZWN0ZWQgZ2V0RXJyb3IoKTogQXdhaXRhYmxlPElucHV0RXJyb3I8Qz4gfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAoIXRoaXMucnBjLm51bGxhYmxlKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIk5PVF9OVUxMQUJMRVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlclZpZXcoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbih0aGlzKTtcbiAgfVxufVxuXG4vLyBUT09EOiBJbnB1dFZpZXdcbiIsImltcG9ydCB7IE92ZXJyaWRlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBOb1JwYyB9IGZyb20gXCIuLi8uLi9Ob1JwY1wiO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IFRleHRJbnB1dEVycm9yLCBUZXh0SW5wdXRPcHRpb25zIH0gZnJvbSBcIi4vVGV4dElucHV0TG9hZGVyXCI7XG5pbXBvcnQgeyBWYWx1ZU9yQXdhaXRhYmxlRm4gfSBmcm9tIFwiLi4vVmFsdWVPckF3YWl0YWJsZUZuXCI7XG5pbXBvcnQgeyBUZXh0SW5wdXRIYW5kbGVyIH0gZnJvbSBcIi4vVGV4dElucHV0SGFuZGxlclwiO1xuXG5leHBvcnQgdHlwZSBUZXh0SW5wdXQgPSBJbnB1dDx7XG4gIEVycm9yOiBUZXh0SW5wdXRFcnJvcjtcblxuICBWYWx1ZURhdGE6IHN0cmluZztcblxuICBDb21tYW5kczoge307XG5cbiAgVmFsdWU6IHN0cmluZztcblxuICBWYWx1ZUVsZW1lbnQ6IHN0cmluZztcblxuICBDb250cm9sbGVyOiBOb1JwYztcblxuICBQcm9wczoge307XG5cbiAgQ29uZmlnOlxuICAgIHwgdW5kZWZpbmVkXG4gICAgfCAoVGV4dElucHV0T3B0aW9ucyAmIHtcbiAgICAgICAgZGVmYXVsdD86IFZhbHVlT3JBd2FpdGFibGVGbjxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICAgICAgfSk7XG5cbiAgRWxlbWVudDogT3ZlcnJpZGU8XG4gICAgVGV4dElucHV0T3B0aW9ucyxcbiAgICB7XG4gICAgICBwYXR0ZXJuPzogc3RyaW5nO1xuICAgIH1cbiAgPjtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gVGV4dElucHV0KCk6IFRleHRJbnB1dCB7XG4gIHJldHVybiBJbnB1dDxUZXh0SW5wdXQ+KHtcbiAgICBoYW5kbGVyOiBUZXh0SW5wdXRIYW5kbGVyLFxuICAgIGdldFZhbHVlRGF0YUZyb21FbGVtZW50KHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBSZXF1aXJlT3B0aW9uYWxLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dEhhbmRsZXIgfSBmcm9tIFwiLi4vQWJzdHJhY3RJbnB1dEhhbmRsZXJcIjtcbmltcG9ydCB7IFdpZGdldENvbnRyb2xsZXIsIFdpZGdldEVsZW1lbnQgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0L1dpZGdldFwiO1xuaW1wb3J0IHtcbiAgSW5wdXRFbGVtZW50LFxuICBJbnB1dEVycm9yT3JWYWx1ZSxcbiAgSW5wdXRWYWx1ZSxcbiAgSW5wdXRWYWx1ZURhdGEsXG4gIElucHV0VmFsdWVFbGVtZW50LFxufSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IFRleHRJbnB1dExvYWRlciB9IGZyb20gXCIuL1RleHRJbnB1dExvYWRlclwiO1xuaW1wb3J0IHsgVmFsdWVPckF3YWl0YWJsZUZuIH0gZnJvbSBcIi4uL1ZhbHVlT3JBd2FpdGFibGVGblwiO1xuaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSBcIi4vVGV4dElucHV0XCI7XG5cbnR5cGUgVCA9IFRleHRJbnB1dDtcblxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEhhbmRsZXIgZXh0ZW5kcyBBYnN0cmFjdElucHV0SGFuZGxlcjxUPiB7XG4gIGFzeW5jIGdldFZhbHVlRWxlbWVudChcbiAgICB2YWx1ZTogSW5wdXRWYWx1ZTxUPiB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPElucHV0VmFsdWVFbGVtZW50PFQ+PiB7XG4gICAgcmV0dXJuIHZhbHVlID8/IChhd2FpdCBWYWx1ZU9yQXdhaXRhYmxlRm4odGhpcy5jb25maWcuZGVmYXVsdCkpID8/IFwiXCI7XG4gIH1cblxuICBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxUPj4ge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBhc3luYyBnZXRJbnB1dEVsZW1lbnQoKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPElucHV0RWxlbWVudDxUPj4+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbWluTGVuZ3RoOiB0aGlzLmNvbmZpZy5taW5MZW5ndGgsXG4gICAgICBtYXhMZW5ndGg6IHRoaXMuY29uZmlnLm1heExlbmd0aCxcbiAgICAgIHBhdHRlcm46IHRoaXMuY29uZmlnLnBhdHRlcm4/LnNvdXJjZSxcbiAgICAgIHRyaW06IHRoaXMuY29uZmlnLnRyaW0sXG4gICAgICByZXF1aXJlZDogdGhpcy5jb25maWcucmVxdWlyZWQsXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRBbmRDaGVjayhcbiAgICB2YWx1ZURhdGE6IElucHV0VmFsdWVEYXRhPFQ+XG4gICk6IFByb21pc2U8SW5wdXRFcnJvck9yVmFsdWU8VD4+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IFRleHRJbnB1dExvYWRlci5sb2FkKHRoaXMuY29uZmlnLCB2YWx1ZURhdGEpO1xuICAgIGNvbnN0IGVycm9yID0gVGV4dElucHV0TG9hZGVyLmNoZWNrKHRoaXMuY29uZmlnLCB2YWx1ZURhdGEpO1xuICAgIGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSByZXR1cm4geyBlcnJvciwgdmFsdWUgfTtcbiAgICByZXR1cm4geyB2YWx1ZSB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBQYXlsb2FkIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBnZXRMZW5ndGhFcnJvciwgTGVuZ3RoRXJyb3IgfSBmcm9tIFwiLi4vTGVuZ3RoRXJyb3JcIjtcblxuZXhwb3J0IHR5cGUgVGV4dElucHV0T3B0aW9ucyA9IHtcbiAgcGF0dGVybj86IFJlZ0V4cDtcbiAgbWluTGVuZ3RoPzogbnVtYmVyO1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIHRyaW0/OiBib29sZWFuO1xuICByZXF1aXJlZD86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBUZXh0SW5wdXRFcnJvciA9XG4gIHwgUGF5bG9hZDx7XG4gICAgICBJTlZBTElEX1BBVFRFUk46IHsgcGF0dGVybjogc3RyaW5nIH07XG4gICAgfT5cbiAgfCBMZW5ndGhFcnJvclxuICB8IFwiUkVRVUlSRURcIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBUZXh0SW5wdXRMb2FkZXIge1xuICBleHBvcnQgZnVuY3Rpb24gbG9hZChvcHRpb25zOiBUZXh0SW5wdXRPcHRpb25zLCB2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAob3B0aW9ucy50cmltKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNoZWNrKFxuICAgIHsgcmVxdWlyZWQsIHBhdHRlcm4sIG1pbkxlbmd0aCwgbWF4TGVuZ3RoIH06IFRleHRJbnB1dE9wdGlvbnMsXG4gICAgdmFsdWU6IHN0cmluZ1xuICApOiBUZXh0SW5wdXRFcnJvciB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgaWYgKHJlcXVpcmVkKSByZXR1cm4gXCJSRVFVSVJFRFwiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwYXR0ZXJuICYmICFwYXR0ZXJuLnRlc3QodmFsdWUpKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIklOVkFMSURfUEFUVEVSTlwiLCBwYXR0ZXJuOiBwYXR0ZXJuLnNvdXJjZSB9O1xuICAgIH1cblxuICAgIGNvbnN0IGxlbmd0aEVycm9yID0gZ2V0TGVuZ3RoRXJyb3IodmFsdWUsIHsgbWF4TGVuZ3RoLCBtaW5MZW5ndGggfSk7XG4gICAgaWYgKGxlbmd0aEVycm9yKSByZXR1cm4gbGVuZ3RoRXJyb3I7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgVGltZW91dCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXN5bmMvVGltZW91dFwiO1xuaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBMYW5nIH0gZnJvbSBcIi4uLy4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgVmlld1N0YXRlIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3ZpZXcvVmlld1N0YXRlXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi8uLi93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQgeyBBYnN0cmFjdElucHV0VmlldyB9IGZyb20gXCIuLi9BYnN0cmFjdElucHV0Vmlld1wiO1xuaW1wb3J0IHsgSW5wdXRFcnJvciwgSW5wdXRWYWx1ZUVsZW1lbnQgfSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IElucHV0RXJyb3JFbGVtZW50TWFwLCBJbnB1dFZpZXdQcm9wcyB9IGZyb20gXCIuLi9JbnB1dFZpZXdcIjtcbmltcG9ydCB7IFRleHRJbnB1dCB9IGZyb20gXCIuL1RleHRJbnB1dFwiO1xuaW1wb3J0IHsgVGV4dElucHV0TG9hZGVyLCBUZXh0SW5wdXRPcHRpb25zIH0gZnJvbSBcIi4vVGV4dElucHV0TG9hZGVyXCI7XG5cbmV4cG9ydCB0eXBlIFRleHRJbnB1dFZpZXdQcm9wczxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248VGV4dElucHV0PlxuPiA9IElucHV0Vmlld1Byb3BzPEM+O1xuXG5leHBvcnQgY2xhc3MgVGV4dElucHV0VmlldzxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248VGV4dElucHV0PlxuPiBleHRlbmRzIEFic3RyYWN0SW5wdXRWaWV3PFxuICBDLFxuICBUZXh0SW5wdXRWaWV3UHJvcHM8Qz4gJiB7XG4gICAgY2hpbGRyZW4odmlldzogVGV4dElucHV0VmlldzxDPik6IFJlYWN0RWxlbWVudDtcbiAgfVxuPiB7XG4gIEBWaWV3U3RhdGUoKSBwcm90ZWN0ZWQgX3RleHQ6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgdXBkYXRlVmFsdWUodmFsdWU6IElucHV0VmFsdWVFbGVtZW50PEM+IHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fdGV4dCA9IHZhbHVlIHx8IFwiXCI7XG4gIH1cblxuICBnZXQgdGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWJvdW5jZUlkID0gMDtcblxuICBwcm90ZWN0ZWQgX29wdGlvbnM6IFRleHRJbnB1dE9wdGlvbnM7XG4gIHByb3RlY3RlZCB1cGRhdGVFbGVtZW50KGVsZW1lbnQ6IFdpZGdldFR5cGU8Qz5bXCJFbGVtZW50XCJdKSB7XG4gICAgc3VwZXIudXBkYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgLi4uZWxlbWVudCxcbiAgICAgIHBhdHRlcm46IGVsZW1lbnQucGF0dGVybiA/IG5ldyBSZWdFeHAoZWxlbWVudC5wYXR0ZXJuKSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEVycm9yKCk6IEF3YWl0YWJsZTxJbnB1dEVycm9yPEM+IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIFRleHRJbnB1dExvYWRlci5jaGVjayh0aGlzLl9vcHRpb25zLCB0aGlzLnZhbHVlIHx8IFwiXCIpO1xuICB9XG5cbiAgYXN5bmMgc2V0VmFsdWUodmFsdWU6IElucHV0VmFsdWVFbGVtZW50PEM+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHN1cGVyLnNldFZhbHVlKFRleHRJbnB1dExvYWRlci5sb2FkKHRoaXMuX29wdGlvbnMsIHZhbHVlKSk7XG4gIH1cblxuICBpbnB1dFdpbGxWYWxpZGF0ZSgpOiBBd2FpdGFibGUge1xuICAgIHRoaXMuZGVib3VuY2VJZCsrO1xuICAgIHJldHVybiB0aGlzLnNldFZhbHVlKHRoaXMudGV4dCk7XG4gIH1cblxuICBhc3luYyBzZXRUZXh0KHRleHQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl90ZXh0ID09PSB0ZXh0KSByZXR1cm47XG4gICAgY29uc3QgaWQgPSArK3RoaXMuZGVib3VuY2VJZDtcbiAgICB0aGlzLl90ZXh0ID0gdGV4dDtcbiAgICB0aGlzLnNldEVycm9yKHVuZGVmaW5lZCk7XG4gICAgYXdhaXQgVGltZW91dCgzMDApO1xuICAgIGlmIChpZCAhPT0gdGhpcy5kZWJvdW5jZUlkKSByZXR1cm47XG4gICAgYXdhaXQgdGhpcy5zZXRWYWx1ZSh0ZXh0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRFcnJvckVsZW1lbnRNYXAoKTogSW5wdXRFcnJvckVsZW1lbnRNYXA8VGV4dElucHV0PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIElOVkFMSURfUEFUVEVSTjogTGFuZ2BFWFBFQ1RFRF9UT19QQVRURVJOXyR7XCJwYXR0ZXJuXCJ9YCxcbiAgICAgIFJFUVVJUkVEOiBMYW5nYFJFUVVJUkVEYCxcbiAgICAgIE1BWF9MRU5HVEg6IExhbmdgUkVRVUlSRURfTUFYSU1VTV8ke1wibWF4TGVuZ3RoXCJ9YCxcbiAgICAgIE1JTl9MRU5HVEg6IExhbmdgUkVRVUlSRURfTUlOSU1VTV8ke1wibWluTGVuZ3RoXCJ9YCxcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyVmlldygpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuKHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBd2FpdGFibGUsIEF3YWl0ZWQsIEZuIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBScGNGbkhhbmRsZXIgfSBmcm9tIFwiLi9ScGNGbkhhbmRsZXJcIjtcbmltcG9ydCB7IFJwYyB9IGZyb20gXCIuLi9ScGNcIjtcblxuZXhwb3J0IHR5cGUgUnBjRm48VCBleHRlbmRzIEZuPiA9IFJwYzx7XG4gIENvbm5lY3Rpb246ICguLi5hcmdzOiBQYXJhbWV0ZXJzPFQ+KSA9PiBQcm9taXNlPEF3YWl0ZWQ8UmV0dXJuVHlwZTxUPj4+O1xuICBQcm9wczoge307XG4gIENvbmZpZzogKC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD4pID0+IEF3YWl0YWJsZTxBd2FpdGVkPFJldHVyblR5cGU8VD4+PjtcbiAgSGFuZGxlcjoge307XG59PjtcblxuZXhwb3J0IHR5cGUgQW55UnBjRm4gPSBScGNGbjxGbj47XG5cbmV4cG9ydCBmdW5jdGlvbiBScGNGbjxUIGV4dGVuZHMgRm4gPSAoKSA9PiB2b2lkPigpOiBScGNGbjxUPiB7XG4gIHJldHVybiA8YW55PlJwYzxBbnlScGNGbj4oe1xuICAgIGlzR2VuZXJpY0NvbmZpZzogZmFsc2UsXG4gICAgaXNDb25maWdGbjogdHJ1ZSxcbiAgICBoYW5kbGVyOiBScGNGbkhhbmRsZXIsXG4gICAgY29ubmVjdChoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gYXN5bmMgKC4uLmFyZ3MpID0+IDxBd2FpdGVkPFJldHVyblR5cGU8VD4+PmF3YWl0IGhhbmRsZXIoYXJncyk7XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IEFueVJwY0ZuIH0gZnJvbSBcIi4vUnBjRm5cIjtcbmltcG9ydCB7IEFic3RyYWN0UnBjSGFuZGxlciwgSVJwY0hhbmRsZXIgfSBmcm9tIFwiLi4vUnBjXCI7XG5cbnR5cGUgVCA9IEFueVJwY0ZuO1xuXG5leHBvcnQgY2xhc3MgUnBjRm5IYW5kbGVyXG4gIGV4dGVuZHMgQWJzdHJhY3RScGNIYW5kbGVyPFQ+XG4gIGltcGxlbWVudHMgSVJwY0hhbmRsZXI8VD4ge1xuICBoYW5kbGUocGF5bG9hZDogYW55KTogQXdhaXRhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZyguLi5wYXlsb2FkKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbWFwT2JqZWN0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0XCI7XG5pbXBvcnQge1xuICBQYXJ0aWFsVW5kZWZpbmVkS2V5cyxcbiAgVW5kZWZpbmVkSWZFbXB0eU9iamVjdCxcbn0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQge1xuICBBbnlScGMsXG4gIFJwYyxcbiAgUnBjQ29ubmVjdGlvbixcbiAgUnBjRXJyb3IsXG4gIFJwY1Jlc29sdmVkSGFuZGxlcixcbiAgUnBjVW5yZXNvbHZlZENvbmZpZyxcbn0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgUnBjTWFwSGFuZGxlciB9IGZyb20gXCIuL1JwY01hcEhhbmRsZXJcIjtcblxuZXhwb3J0IHR5cGUgQW55UnBjUmVjb3JkID0gUmVjb3JkPHN0cmluZywgQW55UnBjPjtcblxuZXhwb3J0IHR5cGUgQW55UnBjTWFwID0gUnBjTWFwPEFueVJwY1JlY29yZD47XG5cbmV4cG9ydCB0eXBlIFJwY01hcDxUIGV4dGVuZHMgQW55UnBjUmVjb3JkPiA9IFJwYzx7XG4gIFRScGNNYXA6IFQ7XG5cbiAgQ29ubmVjdGlvbjoge1xuICAgIFtLIGluIGtleW9mIFRdOiBScGNDb25uZWN0aW9uPFRbS10+O1xuICB9O1xuXG4gIFByb3BzOiB7IHRhcmdldE1hcDogVCB9O1xuICBDb25maWc6IFVuZGVmaW5lZElmRW1wdHlPYmplY3Q8XG4gICAgUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gICAgICB7XG4gICAgICAgIFtLIGluIGtleW9mIFRdOiBScGNVbnJlc29sdmVkQ29uZmlnPFRbS10+O1xuICAgICAgfVxuICAgID5cbiAgPjtcbiAgSGFuZGxlcjoge1xuICAgIGdldFRhcmdldEhhbmRsZXI8SyBleHRlbmRzIGtleW9mIFQ+KFxuICAgICAga2V5OiBLXG4gICAgKTogUHJvbWlzZTxScGNSZXNvbHZlZEhhbmRsZXI8VFtLXT4+O1xuICB9O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBScGNNYXA8VCBleHRlbmRzIEFueVJwY1JlY29yZD4odGFyZ2V0TWFwOiBUKTogUnBjTWFwPFQ+IHtcbiAgcmV0dXJuIDxhbnk+UnBjPEFueVJwY01hcD4oe1xuICAgIHByb3BzOiB7XG4gICAgICB0YXJnZXRNYXA6IHRhcmdldE1hcCxcbiAgICB9LFxuICAgIGhhbmRsZXI6IFJwY01hcEhhbmRsZXIsXG4gICAgY29ubmVjdChoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gbWFwT2JqZWN0KHRoaXMudGFyZ2V0TWFwLCAodGFyZ2V0LCBrZXkpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0LmNyZWF0ZVJwY0Nvbm5lY3Rpb24ocGF5bG9hZCA9PiBoYW5kbGVyKFtrZXksIHBheWxvYWRdKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgUnBjRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBScGNFcnJvcihgYXQga2V5OiR7a2V5fSwgJHtlcnJvci5tZXNzYWdlfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBBd2FpdGFibGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7XG4gIEFic3RyYWN0UnBjSGFuZGxlcixcbiAgQW55UnBjLFxuICBJUnBjSGFuZGxlcixcbiAgUnBjUmVzb2x2ZWRIYW5kbGVyLFxuICBScGNUeXBlLFxufSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQgeyBBbnlScGNNYXAgfSBmcm9tIFwiLi9ScGNNYXBcIjtcblxuZXhwb3J0IGNsYXNzIFJwY01hcEhhbmRsZXI8UiBleHRlbmRzIEFueVJwY01hcCwgVCBleHRlbmRzIFJwY1R5cGU8Uj5bXCJUUnBjTWFwXCJdPlxuICBleHRlbmRzIEFic3RyYWN0UnBjSGFuZGxlcjxSPlxuICBpbXBsZW1lbnRzIElScGNIYW5kbGVyPEFueVJwY01hcD4ge1xuICBoYW5kbGUoW2tleSwgcGF5bG9hZF0pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmdldFRhcmdldEhhbmRsZXIoa2V5KS50aGVuKGMgPT4gYy5oYW5kbGUocGF5bG9hZCkpO1xuICB9XG5cbiAgZ2V0VGFyZ2V0SGFuZGxlcihrZXk6IHN0cmluZyk6IFByb21pc2U8UnBjUmVzb2x2ZWRIYW5kbGVyPEFueVJwYz4+IHtcbiAgICByZXR1cm4gdGhpcy5ycGMudGFyZ2V0TWFwW2tleV0ucmVzb2x2ZVJwY0hhbmRsZXIodGhpcy5jb25maWdba2V5XSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbmZpZ0ZhY3RvcnkgfSBmcm9tIFwiLi4vQ29uZmlnRmFjdG9yeVwiO1xuaW1wb3J0IHsgQW55UnBjLCBScGMsIFJwY0Nvbm5lY3Rpb24sIFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQgeyBScGNQYXJhbWV0ZXJIYW5kbGVyIH0gZnJvbSBcIi4vUnBjUGFyYW1ldGVySGFuZGxlclwiO1xuXG5leHBvcnQgdHlwZSBUUnBjUGFyYW1ldGVyID0geyBUYXJnZXQ6IEFueVJwYzsgRGF0YTogYW55IH07XG5cbnR5cGUgVGVzdFJwYyA9IFJwYzx7XG4gIEhhbmRsZXI6IHt9O1xuICBDb25uZWN0aW9uOiB7fTtcbiAgUHJvcHM6IHt9O1xuICBDb25maWc6IENvbmZpZ0ZhY3Rvcnk8YW55Pjtcbn0+O1xuXG5leHBvcnQgdHlwZSBScGNQYXJhbWV0ZXI8VCBleHRlbmRzIFRScGNQYXJhbWV0ZXI+ID0gUnBjPHtcbiAgVFBhcmFtZXRlcjogVDtcblxuICBIYW5kbGVyOiB7fTtcblxuICBDb25uZWN0aW9uOiAoZGF0YTogVFtcIkRhdGFcIl0pID0+IFJwY0Nvbm5lY3Rpb248VFtcIlRhcmdldFwiXT47XG5cbiAgUHJvcHM6IHtcbiAgICBwYXJhbWV0ZXJUYXJnZXQ6IFRbXCJUYXJnZXRcIl07XG4gICAgcGFyYW1ldGVyRGF0YVR5cGU6IChvYmo6IGFueSkgPT4gVFtcIkRhdGFcIl07XG4gIH07XG5cbiAgQ29uZmlnOiBDb25maWdGYWN0b3J5PFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIlRhcmdldFwiXT4sIFtUW1wiRGF0YVwiXV0+O1xufT47XG5leHBvcnQgdHlwZSBBbnlScGNQYXJhbWV0ZXIgPSBScGNQYXJhbWV0ZXI8VFJwY1BhcmFtZXRlcj47XG5cbi8vIFRPRE86IFBhcmFtZXRlclR5cGVSZWZcbmV4cG9ydCBmdW5jdGlvbiBScGNQYXJhbWV0ZXI8VGFyZ2V0IGV4dGVuZHMgQW55UnBjLCBEYXRhPihcbiAgZGF0YVR5cGU6IChvYmo6IGFueSkgPT4gRGF0YSxcbiAgdGFyZ2V0OiBUYXJnZXRcbik6IFJwY1BhcmFtZXRlcjx7IERhdGE6IERhdGE7IFRhcmdldDogVGFyZ2V0IH0+IHtcbiAgcmV0dXJuIDxhbnk+UnBjPEFueVJwY1BhcmFtZXRlcj4oe1xuICAgIGlzR2VuZXJpY0NvbmZpZzogZmFsc2UsXG4gICAgaXNDb25maWdGbjogZmFsc2UsXG4gICAgaGFuZGxlcjogUnBjUGFyYW1ldGVySGFuZGxlcixcbiAgICBwcm9wczogeyBwYXJhbWV0ZXJUYXJnZXQ6IHRhcmdldCwgcGFyYW1ldGVyRGF0YVR5cGU6IGRhdGFUeXBlIH0sXG4gICAgY29ubmVjdChoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gZGF0YSA9PlxuICAgICAgICB0aGlzLnBhcmFtZXRlclRhcmdldC5jcmVhdGVScGNDb25uZWN0aW9uKHBheWxvYWQgPT5cbiAgICAgICAgICBoYW5kbGVyKFtkYXRhLCBwYXlsb2FkXSlcbiAgICAgICAgKTtcbiAgICB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7IENvbmZpZ0ZhY3RvcnkgfSBmcm9tIFwiLi4vQ29uZmlnRmFjdG9yeVwiO1xuaW1wb3J0IHsgQWJzdHJhY3RScGNIYW5kbGVyLCBJUnBjSGFuZGxlciB9IGZyb20gXCIuLi9ScGNcIjtcbmltcG9ydCB7IEFueVJwY1BhcmFtZXRlciB9IGZyb20gXCIuL1JwY1BhcmFtZXRlclwiO1xuXG50eXBlIFQgPSBBbnlScGNQYXJhbWV0ZXI7XG5cbmV4cG9ydCBjbGFzcyBScGNQYXJhbWV0ZXJIYW5kbGVyXG4gIGV4dGVuZHMgQWJzdHJhY3RScGNIYW5kbGVyPFQ+XG4gIGltcGxlbWVudHMgSVJwY0hhbmRsZXI8VD4ge1xuICBhc3luYyBoYW5kbGUoW2RhdGEsIHBheWxvYWRdKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IHRoaXMucnBjLnBhcmFtZXRlckRhdGFUeXBlKGRhdGEpO1xuICAgIGNvbnN0IHRhcmdldENvbmZpZyA9IGF3YWl0IENvbmZpZ0ZhY3RvcnkodGhpcy5jb25maWcsIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5ycGMucGFyYW1ldGVyVGFyZ2V0XG4gICAgICAucmVzb2x2ZVJwY0hhbmRsZXIodGFyZ2V0Q29uZmlnKVxuICAgICAgLnRoZW4oYyA9PiBjLmhhbmRsZShwYXlsb2FkKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IExhenkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhdHRlcm5zL2xhenlcIjtcbmltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7XG4gIEFic3RyYWN0UnBjSGFuZGxlcixcbiAgSVJwY0hhbmRsZXIsXG4gIFJwY1Jlc29sdmVkSGFuZGxlcixcbiAgUnBjVW5yZXNvbHZlZENvbmZpZyxcbn0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHtcbiAgQW55V2lkZ2V0LFxuICBJV2lkZ2V0LFxuICBUV2lkZ2V0LFxuICBXaWRnZXRDb250cm9sbGVyLFxuICBXaWRnZXRFbGVtZW50LFxuICBXaWRnZXRUeXBlLFxufSBmcm9tIFwiLi9XaWRnZXRcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0V2lkZ2V0SGFuZGxlcjxcbiAgICBSIGV4dGVuZHMgQW55V2lkZ2V0LFxuICAgIFQgZXh0ZW5kcyBUV2lkZ2V0ID0gV2lkZ2V0VHlwZTxSPlxuICA+XG4gIGV4dGVuZHMgQWJzdHJhY3RScGNIYW5kbGVyPFI+XG4gIGltcGxlbWVudHMgSVJwY0hhbmRsZXI8SVdpZGdldD4ge1xuICBhYnN0cmFjdCBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxSPj47XG5cbiAgYWJzdHJhY3QgZ2V0RWxlbWVudCgpOiBQcm9taXNlPFJlcXVpcmVPcHRpb25hbEtleXM8V2lkZ2V0RWxlbWVudDxSPj4+O1xuXG4gIEBMYXp5KCkgZ2V0IGNvbnRyb2xsZXIoKTogUHJvbWlzZTxScGNSZXNvbHZlZEhhbmRsZXI8V2lkZ2V0Q29udHJvbGxlcjxSPj4+IHtcbiAgICByZXR1cm4gdGhpcy5ycGMud2lkZ2V0LmNvbnRyb2xsZXIucmVzb2x2ZVJwY0hhbmRsZXIoXG4gICAgICB0aGlzLmdldENvbnRyb2xsZXJDb25maWcoKVxuICAgICkgYXMgUHJvbWlzZTxScGNSZXNvbHZlZEhhbmRsZXI8V2lkZ2V0Q29udHJvbGxlcjxSPj4+O1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlKFtrZXksIHBheWxvYWRdOiBbc3RyaW5nLCBhbnldKTogUHJvbWlzZTxhbnk+IHtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBcImdldEVsZW1lbnRcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgY2FzZSBcImNvbnRyb2xsZXJcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci50aGVuKGhhbmRsZXIgPT4gaGFuZGxlci5oYW5kbGUocGF5bG9hZCkpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMucnBjLndpZGdldC5jb21tYW5kc1trZXldO1xuICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGNvbW1hbmQgaGFuZGxlciBmb3IgXCIke2tleX1cIi5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1toYW5kbGVyXSguLi5wYXlsb2FkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi4vLi4vcmVhY3Qvdmlldy9WaWV3XCI7XG5pbXBvcnQgeyBWaWV3U3RhdGUgfSBmcm9tIFwiLi4vLi4vcmVhY3Qvdmlldy9WaWV3U3RhdGVcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQge1xuICBBbnlXaWRnZXQsXG4gIEFueVdpZGdldENvbm5lY3Rpb24sXG4gIFdpZGdldCxcbiAgV2lkZ2V0Q29udHJvbGxlcixcbiAgV2lkZ2V0RWxlbWVudCxcbiAgV2lkZ2V0VHlwZSxcbn0gZnJvbSBcIi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBXaWRnZXRWaWV3LCBXaWRnZXRWaWV3UHJvcHMgfSBmcm9tIFwiLi9XaWRnZXRWaWV3XCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFdpZGdldFZpZXc8XG4gICAgQyBleHRlbmRzIEFueVdpZGdldENvbm5lY3Rpb24sXG4gICAgUCBleHRlbmRzIFdpZGdldFZpZXdQcm9wczxDPiA9IFdpZGdldFZpZXdQcm9wczxDPlxuICA+XG4gIGV4dGVuZHMgVmlldzxQPlxuICBpbXBsZW1lbnRzIFdpZGdldFZpZXc8Qz4ge1xuICBAVmlld1N0YXRlKFwiZm9yY2VVcGRhdGVFbGVtZW50XCIpIF9lbGVtZW50OiBXaWRnZXRFbGVtZW50PEM+O1xuXG4gIHByb3RlY3RlZCB1cGRhdGVFbGVtZW50PyhlbGVtZW50OiBXaWRnZXRFbGVtZW50PEM+KTogdm9pZDtcblxuICBnZXQgZWxlbWVudCgpOiBXaWRnZXRFbGVtZW50PEM+IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgfVxuXG4gIHNldEVsZW1lbnQoZWxlbWVudDogV2lkZ2V0RWxlbWVudDxDPikge1xuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICB9XG5cbiAgZ2V0IHJwYygpOiBXaWRnZXQ8V2lkZ2V0VHlwZTxDPj4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNvbm5lY3Rpb24ucnBjIGFzIGFueTtcbiAgfVxuXG4gIGdldCBjb250cm9sbGVyKCk6IFJwY0Nvbm5lY3Rpb248V2lkZ2V0Q29udHJvbGxlcjxDPj4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNvbm5lY3Rpb24uY29udHJvbGxlcjtcbiAgfVxuXG4gIGdldCBjb25uZWN0aW9uKCk6IEMge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNvbm5lY3Rpb247XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wczogUCkge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5wcm9wcy5lbGVtZW50O1xuICAgIHRoaXMudXBkYXRlRWxlbWVudD8uKHRoaXMucHJvcHMuZWxlbWVudCk7XG4gIH1cblxuICBmb3JjZVVwZGF0ZUVsZW1lbnQoKSB7XG4gICAgdGhpcy51cGRhdGVFbGVtZW50Py4odGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIHVwZGF0ZVZpZXdQcm9wcyhwcmV2UHJvcHM6IFJlYWRvbmx5PFA+LCBuZXh0UHJvcHM6IFJlYWRvbmx5PFA+KTogdm9pZCB7XG4gICAgaWYgKG5leHRQcm9wcy5lbGVtZW50ICE9PSBwcmV2UHJvcHMuZWxlbWVudCkge1xuICAgICAgdGhpcy5fZWxlbWVudCA9IG5leHRQcm9wcy5lbGVtZW50O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgdHlwZSBXaWRnZXRWaWV3Q2xhc3M8VCBleHRlbmRzIEFueVdpZGdldD4gPSBuZXcgKFxuICBwcm9wczogV2lkZ2V0Vmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248VD4+XG4pID0+IEFic3RyYWN0V2lkZ2V0VmlldzxScGNDb25uZWN0aW9uPFQ+PjtcbiIsImltcG9ydCB7IEV4cGVjdCwgTnVsbGFibGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlcih2YWx1ZTogYW55KTogbnVtYmVyIHtcbiAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBudWxsYWJsZTxUPih0eXBlOiAodmFsdWU6IGFueSkgPT4gVCk6IENvbHVtblR5cGU8VCB8IE51bGxhYmxlPiB7XG4gIHJldHVybiB2YWx1ZSA9PiB7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHJldHVybiB0eXBlKHZhbHVlKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZyh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBcIlwiO1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbn1cblxubnVtYmVyLmVudW0gPSBmdW5jdGlvbiA8VCBleHRlbmRzIG51bWJlcj4oKTogQ29sdW1uVHlwZTxUPiB7XG4gIHJldHVybiA8YW55Pm51bWJlcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBib29sZWFuKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xufVxuXG5leHBvcnQgdHlwZSBDb2x1bW5UeXBlPFQ+ID0gKHZhbHVlOiBhbnkpID0+IFQ7XG5leHBvcnQgdHlwZSBBbnlDb2x1bW5UeXBlID0gQ29sdW1uVHlwZTxhbnk+O1xuXG5leHBvcnQgdHlwZSBBbnlSb3dUeXBlID0gUmVjb3JkPHN0cmluZywgQW55Q29sdW1uVHlwZT47XG5cbmV4cG9ydCB0eXBlIFJvdzxUIGV4dGVuZHMgQW55Um93VHlwZT4gPSB7IFtLIGluIGtleW9mIFRdOiBSZXR1cm5UeXBlPFRbS10+IH07XG5leHBvcnQgdHlwZSBDb2x1bW48VCBleHRlbmRzIEFueUNvbHVtblR5cGU+ID0gUmV0dXJuVHlwZTxUPjtcblxuZXhwb3J0IHR5cGUgQW55UHJpbWl0aXZlQ29sdW1uVHlwZSA9IEV4cGVjdDxcbiAgQW55Q29sdW1uVHlwZSxcbiAgdHlwZW9mIHN0cmluZyB8IHR5cGVvZiBudW1iZXIgfCB0eXBlb2YgYm9vbGVhblxuPjtcbiIsImltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9lbnRyaWVzXCI7XG5pbXBvcnQgeyBtZXJnZURlc2NyaXB0b3JzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9vYmplY3QvbWVyZ2VEZXNjcmlwdG9yc1wiO1xuaW1wb3J0IHsgY2FwaXRhbGl6ZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc3RyaW5nL2NhcGl0YWxpemVcIjtcbmltcG9ydCB7XG4gIEZuLFxuICBJZixcbiAgSXMsXG4gIElzRW1wdHlPYmplY3QsXG4gIE92ZXJyaWRlLFxuICBQYXJ0aWFsVW5kZWZpbmVkS2V5cyxcbiAgVW5pb24sXG59IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgTm9ScGMgfSBmcm9tIFwiLi4vTm9ScGNcIjtcbmltcG9ydCB7XG4gIEFueVJwYyxcbiAgQmFzZWRScGMsXG4gIElScGNIYW5kbGVyLFxuICBScGMsXG4gIFJwY0NvbW1hbmQsXG4gIFJwY0Nvbm5lY3Rpb24sXG4gIFJwY0hhbmRsZXJDbGFzcyxcbiAgUnBjSXNHZW5lcmljQ29uZmlnT3B0aW9uLFxuICBScGNQcm9wc09wdGlvbixcbiAgUnBjVHlwZSxcbiAgUnBjVW5yZXNvbHZlZENvbmZpZyxcbiAgVFJwYyxcbn0gZnJvbSBcIi4uL1JwY1wiO1xuXG50eXBlIF9XaWRnZXRDb25uZWN0aW9uPFQgZXh0ZW5kcyBUV2lkZ2V0PiA9IFRbXCJDb25uZWN0aW9uXCJdICYge1xuICBycGM6IFdpZGdldDxUPjtcbiAgcnBjQ29tbWFuZDogUnBjQ29tbWFuZDtcbiAgY29udHJvbGxlcjogUnBjQ29ubmVjdGlvbjxUW1wiQ29udHJvbGxlclwiXT47XG5cbiAgZ2V0RWxlbWVudCgpOiBQcm9taXNlPFRbXCJFbGVtZW50XCJdPjtcblxuICBjb21tYW5kPEsgZXh0ZW5kcyBrZXlvZiBUW1wiQ29tbWFuZHNcIl0+KFxuICAgIGtleTogc3RyaW5nICYgSyxcbiAgICAuLi5hcmdzOiBQYXJhbWV0ZXJzPFRbXCJDb21tYW5kc1wiXVtLXT5cbiAgKTogUHJvbWlzZTxSZXR1cm5UeXBlPFRbXCJDb21tYW5kc1wiXVtLXT4+O1xufTtcblxuZXhwb3J0IHR5cGUgVFdpZGdldCA9IHtcbiAgQ29ubmVjdGlvbjogb2JqZWN0O1xuICBDb25maWc6IFRScGNbXCJDb25maWdcIl07XG4gIEhhbmRsZXI6IFRScGNbXCJIYW5kbGVyXCJdO1xuICBQcm9wczogVFJwY1tcIlByb3BzXCJdO1xuICBFbGVtZW50OiBvYmplY3Q7XG4gIENvbnRyb2xsZXI6IEFueVJwYztcbiAgQ29tbWFuZHM6IFJlY29yZDxzdHJpbmcsIEZuICYgeyBoYW5kbGVyOiBzdHJpbmcgfT47XG59O1xuXG5leHBvcnQgdHlwZSBXaWRnZXQ8XG4gIFQgZXh0ZW5kcyBUV2lkZ2V0LFxuICBDIGV4dGVuZHMgVFdpZGdldFtcIkNvbW1hbmRzXCJdID0gVFtcIkNvbW1hbmRzXCJdXG4+ID0gUnBjPHtcbiAgVFdpZGdldDogVDtcblxuICBDb25maWc6IFRbXCJDb25maWdcIl07XG5cbiAgSGFuZGxlcjogVFtcIkhhbmRsZXJcIl0gJiB7XG4gICAgZ2V0RWxlbWVudCgpOiBQcm9taXNlPFRbXCJFbGVtZW50XCJdPjtcbiAgICBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIkNvbnRyb2xsZXJcIl0+O1xuICB9O1xuXG4gIFByb3BzOiBUW1wiUHJvcHNcIl0gJiB7XG4gICAgd2lkZ2V0OiB7XG4gICAgICBvcHRpb25zOiBXaWRnZXRPcHRpb25zPFRXaWRnZXQ+O1xuICAgICAgY29tbWFuZHM6IFJlY29yZDxrZXlvZiBUW1wiQ29tbWFuZHNcIl0sIHN0cmluZz47XG4gICAgICBjb25uZWN0aW9uOiBfV2lkZ2V0Q29ubmVjdGlvbjxUPjtcbiAgICAgIGNvbnRyb2xsZXI6IFRbXCJDb250cm9sbGVyXCJdO1xuICAgIH07XG4gIH07XG5cbiAgQ29ubmVjdGlvbjogX1dpZGdldENvbm5lY3Rpb248VD47XG59PjtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0Q29udHJvbGxlck9wdGlvbjxUIGV4dGVuZHMgUGljazxUV2lkZ2V0LCBcIkNvbnRyb2xsZXJcIj4+ID1cbiAgfCBUW1wiQ29udHJvbGxlclwiXVxuICB8IElmPElzPFRbXCJDb250cm9sbGVyXCJdLCBOb1JwYz4sIHVuZGVmaW5lZD47XG5cbmV4cG9ydCB0eXBlIFdpZGdldENvbW1hbmRzT3B0aW9uPFxuICBUIGV4dGVuZHMgUGljazxUV2lkZ2V0LCBcIkNvbW1hbmRzXCI+LFxuICBDIGV4dGVuZHMgVFdpZGdldFtcIkNvbW1hbmRzXCJdID0gVFtcIkNvbW1hbmRzXCJdXG4+ID1cbiAgfCB7IFtLIGluIGtleW9mIFRbXCJDb21tYW5kc1wiXV06IENbS11bXCJoYW5kbGVyXCJdIH1cbiAgfCBJZjxJc0VtcHR5T2JqZWN0PFRbXCJDb21tYW5kc1wiXT4sIHVuZGVmaW5lZD47XG5cbmV4cG9ydCB0eXBlIFdpZGdldE9wdGlvbnM8VCBleHRlbmRzIFRXaWRnZXQ+ID0gUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gIHtcbiAgICBpc0dlbmVyaWNDb25maWc6IFJwY0lzR2VuZXJpY0NvbmZpZ09wdGlvbjxUPjtcblxuICAgIHByb3BzOiBScGNQcm9wc09wdGlvbjxUPjtcblxuICAgIGNvbnRyb2xsZXI6IFdpZGdldENvbnRyb2xsZXJPcHRpb248VD47XG5cbiAgICBjb21tYW5kczogV2lkZ2V0Q29tbWFuZHNPcHRpb248VD47XG5cbiAgICBjb25uZWN0aW9uOlxuICAgICAgfCB7XG4gICAgICAgICAgW0sgaW4ga2V5b2YgVFtcIkNvbm5lY3Rpb25cIl1dOiAoXG4gICAgICAgICAgICBjb25uZWN0aW9uOiBfV2lkZ2V0Q29ubmVjdGlvbjxUPlxuICAgICAgICAgICkgPT4gVFtcIkNvbm5lY3Rpb25cIl1bS107XG4gICAgICAgIH1cbiAgICAgIHwgSWY8SXNFbXB0eU9iamVjdDxUW1wiQ29ubmVjdGlvblwiXT4sIHVuZGVmaW5lZD47XG4gIH0sXG4gIHtcbiAgICBoYW5kbGVyOiBXaWRnZXRIYW5kbGVyQ2xhc3M8V2lkZ2V0PFQ+PjtcbiAgfVxuPjtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0SGFuZGxlckNsYXNzPFxuICBSIGV4dGVuZHMgQW55V2lkZ2V0LFxuICBDIGV4dGVuZHMgVFdpZGdldFtcIkNvbW1hbmRzXCJdID0gV2lkZ2V0VHlwZTxSPltcIkNvbW1hbmRzXCJdXG4+ID0gUnBjSGFuZGxlckNsYXNzPFIsIF9XaWRnZXRDb21tYW5kSGFuZGxlck1hcDxSPj47XG5cbnR5cGUgX1dpZGdldENvbW1hbmRIYW5kbGVyTWFwPFxuICBSIGV4dGVuZHMgQmFzZWRXaWRnZXQsXG4gIEMgZXh0ZW5kcyBUV2lkZ2V0W1wiQ29tbWFuZHNcIl0gPSBXaWRnZXRUeXBlPFI+W1wiQ29tbWFuZHNcIl1cbj4gPSB7XG4gIFtISyBpbiBVbmlvbjx7IFtLIGluIGtleW9mIENdOiBDW0tdW1wiaGFuZGxlclwiXSB9Pl06IFVuaW9uPFxuICAgIHtcbiAgICAgIFtLIGluIGtleW9mIENdOiBDW0tdW1wiaGFuZGxlclwiXSBleHRlbmRzIEhLXG4gICAgICAgID8gKC4uLmFyZ3M6IFBhcmFtZXRlcnM8Q1tLXT4pID0+IFByb21pc2U8UmV0dXJuVHlwZTxDW0tdPj5cbiAgICAgICAgOiBuZXZlcjtcbiAgICB9XG4gID47XG59O1xuXG5leHBvcnQgdHlwZSBJV2lkZ2V0SGFuZGxlcjxcbiAgUiBleHRlbmRzIEFueVdpZGdldCxcbiAgQyBleHRlbmRzIFRXaWRnZXRbXCJDb21tYW5kc1wiXSA9IFdpZGdldFR5cGU8Uj5bXCJDb21tYW5kc1wiXVxuPiA9IElScGNIYW5kbGVyPFI+ICYgX1dpZGdldENvbW1hbmRIYW5kbGVyTWFwPFI+O1xuXG5leHBvcnQgY29uc3QgQW55V2lkZ2V0Q29ubmVjdGlvbjogX1dpZGdldENvbm5lY3Rpb248VFdpZGdldD4gPSB7XG4gIGdldCBycGMoKTogYW55IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgfSxcbiAgZ2V0IHJwY0NvbW1hbmQoKTogYW55IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgfSxcbiAgZ2V0IGNvbnRyb2xsZXIoKTogYW55IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgfSxcbiAgY29tbWFuZChrZXksIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5ycGNDb21tYW5kKFtrZXksIGFyZ3NdKTtcbiAgfSxcbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5ycGNDb21tYW5kKFtcImdldEVsZW1lbnRcIiwgW11dKTtcbiAgfSxcbn07XG5cbmV4cG9ydCB0eXBlIEFueVdpZGdldCA9IFdpZGdldDxUV2lkZ2V0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIFdpZGdldDxSIGV4dGVuZHMgQW55V2lkZ2V0LCBUIGV4dGVuZHMgVFdpZGdldCA9IFdpZGdldFR5cGU8Uj4+KFxuICBvcHRpb25zOiBXaWRnZXRPcHRpb25zPFQ+XG4pOiBXaWRnZXQ8VD4ge1xuICBjb25zdCB7XG4gICAgaXNHZW5lcmljQ29uZmlnID0gZmFsc2UsXG4gICAgcHJvcHMgPSB7fSxcbiAgICBoYW5kbGVyLFxuICAgIGNvbW1hbmRzLFxuICAgIGNvbnRyb2xsZXIsXG4gICAgY29ubmVjdGlvbjogY29ubmVjdGlvbkRlc2NyaXB0b3JzLFxuICB9ID0gb3B0aW9ucyBhcyBXaWRnZXRPcHRpb25zPFRXaWRnZXQ+O1xuXG4gIGxldCBjb25uZWN0aW9uID0gT2JqZWN0LmNyZWF0ZShBbnlXaWRnZXRDb25uZWN0aW9uKTtcblxuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKGNvbm5lY3Rpb25EZXNjcmlwdG9ycykpIHtcbiAgICBjb25zdCBjdXJyZW50S2V5ID0gXCJjdXJyZW50XCIgKyBjYXBpdGFsaXplKGtleSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbm5lY3Rpb24sIGtleSwge1xuICAgICAgZ2V0KCkge1xuICAgICAgICBpZiAoIShjdXJyZW50S2V5IGluIHRoaXMpKSB7XG4gICAgICAgICAgdGhpc1tjdXJyZW50S2V5XSA9IHZhbHVlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzW2N1cnJlbnRLZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiA8YW55PlJwYzxBbnlXaWRnZXQ+KHtcbiAgICBoYW5kbGVyLFxuICAgIGlzR2VuZXJpY0NvbmZpZyxcbiAgICBwcm9wczogbWVyZ2VEZXNjcmlwdG9ycyhwcm9wcyBhcyB7fSwge1xuICAgICAgd2lkZ2V0OiB7XG4gICAgICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXIgfHwgTm9ScGMsXG4gICAgICAgIG9wdGlvbnM6IDxXaWRnZXRPcHRpb25zPFRXaWRnZXQ+Pm9wdGlvbnMsXG4gICAgICAgIGNvbW1hbmRzOiBjb21tYW5kcyB8fCB7fSxcbiAgICAgICAgY29ubmVjdGlvbjogY29ubmVjdGlvbixcbiAgICAgIH0sXG4gICAgfSksXG4gICAgY29ubmVjdChjb21tYW5kKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnNldFByb3RvdHlwZU9mKFxuICAgICAgICB7XG4gICAgICAgICAgcnBjOiB0aGlzLFxuICAgICAgICAgIHJwY0NvbW1hbmQ6IGNvbW1hbmQsXG4gICAgICAgICAgY29udHJvbGxlcjogdGhpcy53aWRnZXQuY29udHJvbGxlci5jcmVhdGVScGNDb25uZWN0aW9uKHBheWxvYWQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmQoW1wiY29udHJvbGxlclwiLCBwYXlsb2FkXSk7XG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMud2lkZ2V0LmNvbm5lY3Rpb25cbiAgICAgICk7XG4gICAgfSxcbiAgfSk7XG59XG5cbi8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IHR5cGUgQW55V2lkZ2V0Q29ubmVjdGlvbiA9IFJwY0Nvbm5lY3Rpb248QW55V2lkZ2V0PjtcblxuZXhwb3J0IHR5cGUgQmFzZWRXaWRnZXQ8VCBleHRlbmRzIFRXaWRnZXQgPSBUV2lkZ2V0PiA9IEJhc2VkUnBjPFxuICBScGNUeXBlPFdpZGdldDxUPj5cbj47XG5cbmV4cG9ydCB0eXBlIFdpZGdldFR5cGU8VCBleHRlbmRzIEJhc2VkV2lkZ2V0PiA9IFJwY1R5cGU8VD5bXCJUV2lkZ2V0XCJdO1xuXG5leHBvcnQgdHlwZSBXaWRnZXRFbGVtZW50PFQgZXh0ZW5kcyBCYXNlZFdpZGdldD4gPSBXaWRnZXRUeXBlPFQ+W1wiRWxlbWVudFwiXTtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0Q29udHJvbGxlcjxUIGV4dGVuZHMgQmFzZWRXaWRnZXQ+ID0gV2lkZ2V0VHlwZTxcbiAgVFxuPltcIkNvbnRyb2xsZXJcIl07XG5cbmV4cG9ydCB0eXBlIFdpZGdldEhvb2s8XG4gIFIgZXh0ZW5kcyBBbnlXaWRnZXQsXG4gIFQgZXh0ZW5kcyBQYXJ0aWFsPFRXaWRnZXQ+XG4+ID0gV2lkZ2V0PEV4dHJhY3Q8T3ZlcnJpZGU8V2lkZ2V0VHlwZTxSPiwgVD4sIFRXaWRnZXQ+PjtcblxuZXhwb3J0IHR5cGUgSVdpZGdldCA9IFdpZGdldDxcbiAgT3ZlcnJpZGU8XG4gICAgVFdpZGdldCxcbiAgICB7XG4gICAgICBDb21tYW5kczoge307XG4gICAgfVxuICA+XG4+O1xuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQsIFJlYWN0RWxlbWVudCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRm4sIE9taXRLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBSZWFjdFJvdXRlciwgUmVhY3RSb3V0ZXJPcHRpb25zIH0gZnJvbSBcIi4uLy4uL3R5cGVyb3V0ZXIyL1JlYWN0Um91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIFRSb3V0ZXIgfSBmcm9tIFwiLi4vLi4vdHlwZXJvdXRlcjIvUm91dGVyXCI7XG5pbXBvcnQgeyBBbnlXaWRnZXRDb25uZWN0aW9uIH0gZnJvbSBcIi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBXaWRnZXRWaWV3UHJvcHMgfSBmcm9tIFwiLi9XaWRnZXRWaWV3XCI7XG5pbXBvcnQgeyBXaWRnZXRWaWV3TG9hZGVyIH0gZnJvbSBcIi4vV2lkZ2V0Vmlld0xvYWRlclwiO1xuXG5leHBvcnQgdHlwZSBXaWRnZXRWaWV3Um91dGVyT3B0aW9uczxcbiAgVCBleHRlbmRzIFRSb3V0ZXIsXG4gIEMgZXh0ZW5kcyBBbnlXaWRnZXRDb25uZWN0aW9uXG4+ID0gT21pdEtleXM8UmVhY3RSb3V0ZXJPcHRpb25zPFQ+LCBcInJlbmRlckluZGV4XCI+ICYge1xuICByZW5kZXJXaWRnZXQoXG4gICAgcHJvcHM6IFdpZGdldFZpZXdQcm9wczxDPixcbiAgICBpbmRleFByb3BzOiBQYXJhbWV0ZXJzPE5vbk51bGxhYmxlPFJlYWN0Um91dGVyT3B0aW9uczxUPltcInJlbmRlckluZGV4XCJdPj5bMF1cbiAgKTogUmVhY3RFbGVtZW50O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFdpZGdldFJvdXRlclZpZXc8XG4gIFQgZXh0ZW5kcyBUUm91dGVyLFxuICBDIGV4dGVuZHMgQW55V2lkZ2V0Q29ubmVjdGlvblxuPihcbiAgcm91dGVyOiBSb3V0ZXI8VD4sXG4gIGNvbm5lY3Rpb25PckdldENvbm5lY3Rpb246IEV4Y2x1ZGU8QywgRm4+IHwgKChwYXJhbXM6IFRbXCJQYXJhbXNcIl0pID0+IEMpLFxuICBvcHRpb25zT3JSZW5kZXJXaWRnZXQ6XG4gICAgfCBXaWRnZXRWaWV3Um91dGVyT3B0aW9uczxULCBDPlxuICAgIHwgV2lkZ2V0Vmlld1JvdXRlck9wdGlvbnM8VCwgQz5bXCJyZW5kZXJXaWRnZXRcIl1cbikge1xuICBjb25zdCBnZXRDb25uZWN0aW9uOiAocGFyYW1zOiBUW1wiUGFyYW1zXCJdKSA9PiBDID1cbiAgICB0eXBlb2YgY29ubmVjdGlvbk9yR2V0Q29ubmVjdGlvbiA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IGNvbm5lY3Rpb25PckdldENvbm5lY3Rpb25cbiAgICAgIDogKCkgPT4gY29ubmVjdGlvbk9yR2V0Q29ubmVjdGlvbjtcblxuICBjb25zdCBvcHRpb25zOiBXaWRnZXRWaWV3Um91dGVyT3B0aW9uczxULCBDPiA9XG4gICAgdHlwZW9mIG9wdGlvbnNPclJlbmRlcldpZGdldCA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IHsgcmVuZGVyV2lkZ2V0OiBvcHRpb25zT3JSZW5kZXJXaWRnZXQgfVxuICAgICAgOiBvcHRpb25zT3JSZW5kZXJXaWRnZXQ7XG5cbiAgY29uc3QgeyByZW5kZXJXaWRnZXQgfSA9IG9wdGlvbnM7XG5cbiAgUmVhY3RSb3V0ZXIocm91dGVyLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICByZW5kZXJJbmRleChpbmRleFByb3BzKSB7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gZ2V0Q29ubmVjdGlvbihpbmRleFByb3BzLmxvY2F0aW9uLnBhcmFtcyksXG4gICAgICAgIFtpbmRleFByb3BzLmxvY2F0aW9uLnBhcmFtc11cbiAgICAgICk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8V2lkZ2V0Vmlld0xvYWRlclxuICAgICAgICAgIGNvbm5lY3Rpb249e2Nvbm5lY3Rpb259XG4gICAgICAgICAgY2hpbGRyZW49e3Byb3BzID0+IGNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCB7IHByb3BzLCBpbmRleFByb3BzIH0pfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9LFxuICB9KTtcblxuICBmdW5jdGlvbiBDb21wb25lbnQoeyBwcm9wcywgaW5kZXhQcm9wcyB9KSB7XG4gICAgcmV0dXJuIHJlbmRlcldpZGdldChwcm9wcywgaW5kZXhQcm9wcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuLi8uLi9yZWFjdC92aWV3L1ZpZXdcIjtcbmltcG9ydCB7IFZpZXdTdGF0ZSB9IGZyb20gXCIuLi8uLi9yZWFjdC92aWV3L1ZpZXdTdGF0ZVwiO1xuaW1wb3J0IHsgQW55V2lkZ2V0Q29ubmVjdGlvbiwgV2lkZ2V0RWxlbWVudCB9IGZyb20gXCIuL1dpZGdldFwiO1xuaW1wb3J0IHsgV2lkZ2V0Vmlld1Byb3BzIH0gZnJvbSBcIi4vV2lkZ2V0Vmlld1wiO1xuXG4vLyBUT0RPOiBNYWtlIHNlcnZpY2UgZm9yIFdpZGdldFZpZXdMb2FkZXJcblxuZXhwb3J0IGNsYXNzIFdpZGdldFZpZXdMb2FkZXI8QyBleHRlbmRzIEFueVdpZGdldENvbm5lY3Rpb24+IGV4dGVuZHMgVmlldzx7XG4gIGNvbm5lY3Rpb246IEM7XG5cbiAgY2hpbGRyZW4ocHJvcHM6IFdpZGdldFZpZXdQcm9wczxDPiwgdmlldzogV2lkZ2V0Vmlld0xvYWRlcjxDPik6IFJlYWN0Tm9kZTtcbn0+IHtcbiAgQFZpZXdTdGF0ZSgpIGlzTG9hZGluZyA9IGZhbHNlO1xuXG4gIEBWaWV3U3RhdGUoKSBlbGVtZW50OiBXaWRnZXRFbGVtZW50PEM+IHwgdW5kZWZpbmVkO1xuXG4gIEBWaWV3U3RhdGUoKSBlcnJvcjogYW55ID0gdW5kZWZpbmVkO1xuXG4gIGFzeW5jIHJlbG9hZCgpIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IGF3YWl0IHRoaXMucHJvcHMuY29ubmVjdGlvbi5nZXRFbGVtZW50KCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnJlbG9hZCgpLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyVmlldygpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgIGlmICh0aGlzLmVycm9yKSB0aHJvdyB0aGlzLmVycm9yO1xuICAgIGlmICh0aGlzLmVsZW1lbnQpXG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbihcbiAgICAgICAge1xuICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgICAgICBjb25uZWN0aW9uOiB0aGlzLnByb3BzLmNvbm5lY3Rpb24sXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXNcbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIElmLFxuICBJcyxcbiAgT3ZlcnJpZGUsXG4gIFBhcnRpYWxVbmRlZmluZWRLZXlzLFxuICBVbmRlZmluZWRJZkVtcHR5T2JqZWN0LFxuICBVbmRlZmluZWRJZklzVW5kZWZpbmVkLFxufSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IERhdGFFeHAgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZWRhdGEvZGF0YS1leHAvRGF0YUV4cFwiO1xuaW1wb3J0IHsgRGF0YVJvdyB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9EYXRhUm93XCI7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVkYXRhL0RhdGFTb3VyY2VcIjtcbmltcG9ydCB7IE5vblJlbGF0aW9uS2V5cyB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9SZWxhdGlvblwiO1xuaW1wb3J0IHsgQ29uZmlnRmFjdG9yeSB9IGZyb20gXCIuLi8uLi9Db25maWdGYWN0b3J5XCI7XG5pbXBvcnQgeyBHZW5lcmljQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0dlbmVyaWNDb25maWdcIjtcbmltcG9ydCB7IE5vUnBjIH0gZnJvbSBcIi4uLy4uL05vUnBjXCI7XG5pbXBvcnQgeyBScGNQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vcnBjLXBhcmFtZXRlci9ScGNQYXJhbWV0ZXJcIjtcbmltcG9ydCB7XG4gIEFueVJwYyxcbiAgUnBjQ29uZmlnLFxuICBScGNDb25uZWN0aW9uLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxufSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBScGNGbiB9IGZyb20gXCIuLi8uLi9ycGMtZm4vUnBjRm5cIjtcbmltcG9ydCB7IFJwY01hcCB9IGZyb20gXCIuLi8uLi9ycGMtbWFwL1JwY01hcFwiO1xuaW1wb3J0IHsgQW55Um93VHlwZSwgQ29sdW1uLCBSb3cgfSBmcm9tIFwiLi4vUm93XCI7XG5pbXBvcnQgeyBXaWRnZXQsIFdpZGdldENvbnRyb2xsZXIgfSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBEYXRhVGFibGVIYW5kbGVyIH0gZnJvbSBcIi4vRGF0YVRhYmxlSGFuZGxlclwiO1xuXG5leHBvcnQgdHlwZSBEYXRhVGFibGVUeXBlczxUIGV4dGVuZHMgVERhdGFUYWJsZT4gPSBfVHlwZXM8VD47XG5cbnR5cGUgX0NvbHVtblR5cGVzPFxuICBUIGV4dGVuZHMgVERhdGFUYWJsZSAmIHtcbiAgICBDb2x1bW5LZXk6IHN0cmluZztcbiAgICBDb2x1bW5UeXBlO1xuICB9LFxuICBVbmRlZmluZWRJZkNvbHVtbktleUlzRGF0YUtleSBleHRlbmRzIHVuZGVmaW5lZCA9IElmPFxuICAgIElzPFRbXCJDb2x1bW5LZXlcIl0sIGtleW9mIFJlcXVpcmVkPFRbXCJEYXRhXCJdPj4sXG4gICAgdW5kZWZpbmVkXG4gID5cbj4gPSB7XG4gIENvbHVtbkxvYWRlcjogKChyb3c6IERhdGFSb3c8VFtcIkRhdGFcIl0+KSA9PiBhbnkpIHwgTm9uUmVsYXRpb25LZXlzPFRbXCJEYXRhXCJdPjtcblxuICBDb2x1bW5Db25maWc6XG4gICAgfCBfQ29sdW1uVHlwZXM8VD5bXCJDb2x1bW5Mb2FkZXJcIl1cbiAgICB8IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICAgICAgICB7XG4gICAgICAgICAgbG9hZDogX0NvbHVtblR5cGVzPFQ+W1wiQ29sdW1uTG9hZGVyXCJdIHwgVW5kZWZpbmVkSWZDb2x1bW5LZXlJc0RhdGFLZXk7XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaWVsZD86IERhdGFFeHA8VFtcIkRhdGFcIl0+O1xuICAgICAgICB9XG4gICAgICA+XG4gICAgfCBVbmRlZmluZWRJZkNvbHVtbktleUlzRGF0YUtleTtcbn07XG5cbmV4cG9ydCB0eXBlIF9UeXBlczxUIGV4dGVuZHMgVERhdGFUYWJsZSwgRCA9IFRbXCJEYXRhXCJdLCBSb3cgPSBUW1wiUm93XCJdPiA9IFQgJiB7XG4gIFJvd1dpdGhLZXk6IFJvdyAmIHsgJGtleTogc3RyaW5nIH07XG5cbiAgUXVlcnk6IHtcbiAgICBnZXRDb3VudD86IGJvb2xlYW47XG4gICAgb3JkZXI/OiBSZWNvcmQ8XG4gICAgICBrZXlvZiBSb3csXG4gICAgICB7IHNvcnQ/OiBcIkFTQ1wiIHwgXCJERVNDXCI7IG51bGxzPzogXCJGSVJTVFwiIHwgXCJMQVNUXCIgfSB8IFwiQVNDXCIgfCBcIkRFU0NcIlxuICAgID47XG4gICAgdGV4dD86IHN0cmluZztcbiAgICBza2lwPzogbnVtYmVyO1xuICAgIHRha2U/OiBudW1iZXI7XG4gIH07XG5cbiAgUXVlcnlSZXN1bHQ6IHsgdG90YWxSb3dzOiBudW1iZXI7IHJvd3M6ICh7ICRrZXk6IHN0cmluZyB9ICYgUm93KVtdIH07XG5cbiAgQ29sdW1uQ29uZmlnTWFwOiBVbmRlZmluZWRJZkVtcHR5T2JqZWN0PFxuICAgIFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICAgICAge1xuICAgICAgICBbSyBpbiBzdHJpbmcgJiBrZXlvZiBSb3ddOiBfQ29sdW1uVHlwZXM8XG4gICAgICAgICAgVCAmIHtcbiAgICAgICAgICAgIENvbHVtbktleTogSztcbiAgICAgICAgICAgIENvbHVtblR5cGU6IFJvd1tLXTtcbiAgICAgICAgICB9XG4gICAgICAgID5bXCJDb2x1bW5Db25maWdcIl07XG4gICAgICB9XG4gICAgPlxuICA+O1xuXG4gIE9wdGlvbmFsQ29uZmlnOiB7XG4gICAgZ2V0Um93Q29udHJvbGxlckNvbmZpZzpcbiAgICAgIHwgQ29uZmlnRmFjdG9yeTxcbiAgICAgICAgICBScGNVbnJlc29sdmVkQ29uZmlnPFRbXCJSb3dDb250cm9sbGVyXCJdPixcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGtleTogc3RyaW5nO1xuICAgICAgICAgICAgICBzb3VyY2U6IERhdGFTb3VyY2U8RD47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICA+XG4gICAgICB8IFVuZGVmaW5lZElmSXNVbmRlZmluZWQ8UnBjQ29uZmlnPFRbXCJSb3dDb250cm9sbGVyXCJdPj47XG5cbiAgICBjb2x1bW5zOiBfVHlwZXM8VD5bXCJDb2x1bW5Db25maWdNYXBcIl07XG4gIH07XG5cbiAgUmVxdWlyZWRDb25maWc6IHtcbiAgICBzb3VyY2U6IERhdGFTb3VyY2U8RD47XG4gICAgcGFnZVNpemU/OiBudW1iZXI7XG4gICAgc2VhcmNoSW4/OiBEYXRhRXhwPEQ+W107XG4gICAgbWF4Um93cz86IG51bWJlcjtcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIERhdGFUYWJsZUNvbmZpZzxUIGV4dGVuZHMgVERhdGFUYWJsZT4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAgX1R5cGVzPFQ+W1wiT3B0aW9uYWxDb25maWdcIl0sXG4gIF9UeXBlczxUPltcIlJlcXVpcmVkQ29uZmlnXCJdXG4+O1xuXG5leHBvcnQgdHlwZSBBbnlEYXRhVGFibGUgPSBEYXRhVGFibGU8VERhdGFUYWJsZT47XG5cbmV4cG9ydCB0eXBlIFREYXRhVGFibGUgPSB7XG4gIFJvdzogYW55O1xuICBSb3dDb250cm9sbGVyOiBBbnlScGM7XG4gIERhdGE6IGFueTtcbn07XG5cbmV4cG9ydCB0eXBlIERhdGFUYWJsZTxcbiAgVCBleHRlbmRzIFREYXRhVGFibGUsXG4gIFJvdyA9IFRbXCJSb3dcIl0sXG4gIFJvd0NvbnRyb2xsZXIgZXh0ZW5kcyBBbnlScGMgPSBUW1wiUm93Q29udHJvbGxlclwiXSxcbiAgRCA9IFRbXCJEYXRhXCJdLFxuICBHZXRSb3dzRm4gPSAocXVlcnk6IF9UeXBlczxUPltcIlF1ZXJ5XCJdKSA9PiBQcm9taXNlPF9UeXBlczxUPltcIlF1ZXJ5UmVzdWx0XCJdPlxuPiA9IFdpZGdldDx7XG4gIFR5cGVzOiBfVHlwZXM8VD47XG5cbiAgQ29uZmlnOiBHZW5lcmljQ29uZmlnPFxuICAgIDxEPihjb25maWc6IERhdGFUYWJsZUNvbmZpZzxPdmVycmlkZTxULCB7IERhdGE6IEQgfT4+KSA9PiBEYXRhVGFibGVDb25maWc8VD5cbiAgPjtcblxuICBDb21tYW5kczoge307XG5cbiAgQ29ubmVjdGlvbjoge1xuICAgIGdldFJvd3M6IEdldFJvd3NGbjtcbiAgICBnZXRSb3dDb250cm9sbGVyKGtleTogc3RyaW5nKTogUnBjQ29ubmVjdGlvbjxSb3dDb250cm9sbGVyPjtcbiAgfTtcblxuICBFbGVtZW50OiB7XG4gICAgLy8gVE9ETzogbW92ZSB0byBQcm9wc1xuICAgIHNlYXJjaGFibGU6IGJvb2xlYW47XG4gICAgY29sdW1uczoge1xuICAgICAgW0sgaW4ga2V5b2YgUmVxdWlyZWQ8Um93Pl06IHtcbiAgICAgICAgc29ydGFibGU6IGJvb2xlYW47XG4gICAgICB9O1xuICAgIH07XG4gICAgdG90YWxSb3dzOiBudW1iZXI7XG4gICAgcm93czogX1R5cGVzPFQ+W1wiUm93V2l0aEtleVwiXVtdO1xuICAgIHBhZ2VTaXplPzogbnVtYmVyO1xuICB9O1xuXG4gIFByb3BzOiB7XG4gICAgcm93VHlwZTogeyBbSyBpbiBrZXlvZiBSb3ddOiAodmFsdWU6IGFueSkgPT4gUm93W0tdIH07XG4gIH07XG5cbiAgSGFuZGxlcjoge1xuICAgIGdldFJvd3M6IEdldFJvd3NGbjtcblxuICAgIGxvYWRSb3coZGF0YVJvdzogYW55KTogUHJvbWlzZTx7ICRrZXk6IHN0cmluZyB9ICYgUm93PjtcbiAgICBsb2FkUm93KGRhdGFSb3c6IGFueSwgbm9LZXk6IHRydWUpOiBQcm9taXNlPFJvdz47XG5cbiAgICBjb2x1bW5zOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7XG4gICAgICAgIGxvYWQ6IChyb3c6IERhdGFSb3c8RD4pID0+IGFueTtcbiAgICAgICAgZmllbGQ/OiBEYXRhRXhwPEQ+O1xuICAgICAgfVxuICAgID47XG4gIH07XG4gIENvbnRyb2xsZXI6IFJwY01hcDx7XG4gICAgZ2V0Um93Q29udHJvbGxlcjogUnBjUGFyYW1ldGVyPHtcbiAgICAgIFRhcmdldDogUm93Q29udHJvbGxlcjtcbiAgICAgIERhdGE6IHN0cmluZztcbiAgICAgIFZhbHVlOiBzdHJpbmc7XG4gICAgfT47XG4gICAgZ2V0Um93czogUnBjRm48KHF1ZXJ5OiBfVHlwZXM8VD5bXCJRdWVyeVwiXSkgPT4gX1R5cGVzPFQ+W1wiUXVlcnlSZXN1bHRcIl0+O1xuICB9Pjtcbn0+O1xuXG5leHBvcnQgdHlwZSBEYXRhVGFibGVPcHRpb25zPFJvd0NvbnRyb2xsZXIgZXh0ZW5kcyBBbnlScGM+ID0ge1xuICByb3dDb250cm9sbGVyPzogUm93Q29udHJvbGxlcjtcblxuICBwYWdlU2l6ZT86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXRhVGFibGU8XG4gIFJvd1R5cGUgZXh0ZW5kcyBBbnlSb3dUeXBlLFxuICBSb3dDb250cm9sbGVyIGV4dGVuZHMgQW55UnBjID0gTm9ScGNcbj4oXG4gIHJvd1R5cGU6IFJvd1R5cGUsXG4gIG9wdGlvbnM6IERhdGFUYWJsZU9wdGlvbnM8Um93Q29udHJvbGxlcj4gPSB7fVxuKTogRGF0YVRhYmxlPHtcbiAgUm93Q29udHJvbGxlcjogUm93Q29udHJvbGxlcjtcbiAgUm93OiBSb3c8Um93VHlwZT47XG4gIERhdGE6IGFueTtcbn0+IHtcbiAgcmV0dXJuIDxhbnk+V2lkZ2V0PEFueURhdGFUYWJsZT4oe1xuICAgIGlzR2VuZXJpY0NvbmZpZzogdHJ1ZSxcbiAgICBjb25uZWN0aW9uOiB7XG4gICAgICBnZXRSb3dzOiBjb25uID0+IHF1ZXJ5ID0+IGNvbm4uY29udHJvbGxlci5nZXRSb3dzKHF1ZXJ5KSxcbiAgICAgIGdldFJvd0NvbnRyb2xsZXI6IGNvbm4gPT4ga2V5ID0+IGNvbm4uY29udHJvbGxlci5nZXRSb3dDb250cm9sbGVyKGtleSksXG4gICAgfSxcbiAgICBwcm9wczogeyByb3dUeXBlIH0sXG4gICAgY29udHJvbGxlcjogUnBjTWFwKHtcbiAgICAgIGdldFJvd0NvbnRyb2xsZXI6IFJwY1BhcmFtZXRlcihTdHJpbmcsIG9wdGlvbnMucm93Q29udHJvbGxlciB8fCBOb1JwYyksXG4gICAgICBnZXRSb3dzOiBScGNGbjxhbnk+KCksXG4gICAgfSkgYXMgV2lkZ2V0Q29udHJvbGxlcjxBbnlEYXRhVGFibGU+LFxuICAgIGhhbmRsZXI6IERhdGFUYWJsZUhhbmRsZXIsXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgaW5zcGVjdCB9IGZyb20gXCIuLi8uLi8uLi9sb2dnaW5nL2luc3BlY3RcIjtcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0SGFuZGxlciB9IGZyb20gXCIuLi9BYnN0cmFjdFdpZGdldEhhbmRsZXJcIjtcbmltcG9ydCB7IGVudHJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9lbnRyaWVzXCI7XG5pbXBvcnQgeyBtYXBPYmplY3QsIG1hcE9iamVjdEFzeW5jIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0XCI7XG5pbXBvcnQgeyBMYXp5IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYXR0ZXJucy9sYXp5XCI7XG5pbXBvcnQgeyBSZXF1aXJlT3B0aW9uYWxLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBEYXRhRXhwIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVkYXRhL2RhdGEtZXhwL0RhdGFFeHBcIjtcbmltcG9ydCB7IERhdGFPcmRlciB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9EYXRhT3JkZXJcIjtcbmltcG9ydCB7IERhdGFSb3cgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZWRhdGEvRGF0YVJvd1wiO1xuaW1wb3J0IHsgQ29uZmlnRmFjdG9yeSB9IGZyb20gXCIuLi8uLi9Db25maWdGYWN0b3J5XCI7XG5pbXBvcnQgeyBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgSVdpZGdldEhhbmRsZXIsIFdpZGdldENvbnRyb2xsZXIsIFdpZGdldEVsZW1lbnQgfSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBBbnlEYXRhVGFibGUsIERhdGFUYWJsZVR5cGVzLCBURGF0YVRhYmxlIH0gZnJvbSBcIi4vRGF0YVRhYmxlXCI7XG5cbnR5cGUgUiA9IEFueURhdGFUYWJsZTtcbnR5cGUgVCA9IFREYXRhVGFibGU7XG5cbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIYW5kbGVyXG4gIGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRIYW5kbGVyPFI+XG4gIGltcGxlbWVudHMgSVdpZGdldEhhbmRsZXI8Uj4ge1xuICBATGF6eSgpIGdldCBjb2x1bW5zKCkge1xuICAgIHJldHVybiBtYXBPYmplY3QodGhpcy5ycGMucm93VHlwZSwgKGNvbHVtblR5cGUsIGtleSkgPT4ge1xuICAgICAgY29uc3QgY29sdW1uQ29uZmlnID0gdGhpcy5jb25maWcuY29sdW1ucz8uW2tleV07XG4gICAgICBsZXQgbG9hZCwgZmllbGQ7XG5cbiAgICAgIHN3aXRjaCAodHlwZW9mIGNvbHVtbkNvbmZpZykge1xuICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICBsb2FkID0gY29sdW1uQ29uZmlnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgZmllbGQgPSBjb2x1bW5Db25maWc7XG4gICAgICAgICAgbG9hZCA9IGRhdGFSb3cgPT4gZGF0YVJvd1tmaWVsZF07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAoeyBsb2FkLCBmaWVsZCB9ID0gY29sdW1uQ29uZmlnIHx8ICh7fSBhcyBhbnkpKTtcbiAgICAgICAgICBpZiAoIWxvYWQpIHtcbiAgICAgICAgICAgIGxvYWQgPSBkYXRhUm93ID0+IGRhdGFSb3dba2V5XTtcbiAgICAgICAgICAgIGZpZWxkID0ga2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbmV4cGVjdGVkICR7aW5zcGVjdCh7IGNvbHVtbkNvbmZpZyB9KX1gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbG9hZCxcbiAgICAgICAgZmllbGQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9hZFJvdyhkYXRhUm93LCBub0tleT86IGJvb2xlYW4pIHtcbiAgICBjb25zdCByb3c6IGFueSA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKHRoaXMuY29sdW1ucywgY29sdW1uID0+XG4gICAgICBjb2x1bW4ubG9hZChkYXRhUm93KVxuICAgICk7XG4gICAgaWYgKCFub0tleSkge1xuICAgICAgcm93LiRrZXkgPSBkYXRhUm93LiRrZXk7XG4gICAgfVxuICAgIHJldHVybiByb3c7XG4gIH1cblxuICBhc3luYyBnZXRSb3dzKFxuICAgIHF1ZXJ5OiBEYXRhVGFibGVUeXBlczxUPltcIlF1ZXJ5XCJdXG4gICk6IFByb21pc2U8RGF0YVRhYmxlVHlwZXM8VD5bXCJRdWVyeVJlc3VsdFwiXT4ge1xuICAgIGNvbnN0IG9yZGVyczogRGF0YU9yZGVyPGFueT5bXSA9IFtdO1xuICAgIGZvciAoY29uc3QgW2tleSwgb3JkZXJdIG9mIGVudHJpZXMocXVlcnkub3JkZXIpKSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmNvbHVtbnNba2V5XTtcbiAgICAgIGlmIChjb2x1bW4uZmllbGQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBvcmRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBvcmRlcnMucHVzaCh7XG4gICAgICAgICAgYnk6IGNvbHVtbi5maWVsZCxcbiAgICAgICAgICBzb3J0OiBvcmRlcixcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcmRlcnMucHVzaCh7XG4gICAgICAgICAgYnk6IGNvbHVtbi5maWVsZCxcbiAgICAgICAgICBzb3J0OiBvcmRlci5zb3J0ID8/IFwiQVNDXCIsXG4gICAgICAgICAgbnVsbHM6IG9yZGVyLm51bGxzLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBtYXhSb3dzID0gdGhpcy5jb25maWcubWF4Um93cyA/PyAxMDtcbiAgICBjb25zdCBmaWx0ZXJzOiBEYXRhRXhwPGFueT4gPSBbXTtcblxuICAgIGlmIChxdWVyeS50ZXh0KSB7XG4gICAgICBjb25zdCBzZWFyY2hGaWx0ZXJzID0gdGhpcy5jb25maWcuc2VhcmNoSW4/Lm1hcChmaWVsZCA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgJHNlYXJjaDoge1xuICAgICAgICAgICAgaW46IGZpZWxkLFxuICAgICAgICAgICAgdGV4dDogcXVlcnkudGV4dCxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICBpZiAoc2VhcmNoRmlsdGVycz8ubGVuZ3RoKSB7XG4gICAgICAgIGZpbHRlcnMucHVzaCh7ICRvcjogc2VhcmNoRmlsdGVycyB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHNvdXJjZSA9IHRoaXMuY29uZmlnLnNvdXJjZVxuICAgICAgLnNvcnQob3JkZXJzKVxuICAgICAgLnRha2UoTWF0aC5taW4ocXVlcnkudGFrZSA/PyBtYXhSb3dzLCBtYXhSb3dzKSlcbiAgICAgIC5za2lwKHF1ZXJ5LnNraXAgPz8gMClcbiAgICAgIC5maWx0ZXIoeyAkYW5kOiBmaWx0ZXJzIH0pO1xuXG4gICAgbGV0IHRvdGFsUm93czogbnVtYmVyO1xuICAgIGxldCBkYXRhUm93czogRGF0YVJvdzxhbnk+W107XG5cbiAgICBpZiAocXVlcnkuZ2V0Q291bnQpIHtcbiAgICAgIFt0b3RhbFJvd3MsIGRhdGFSb3dzXSA9IGF3YWl0IHNvdXJjZS5nZXRDb3VudEFuZFJvd3MoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgW3RvdGFsUm93cywgZGF0YVJvd3NdID0gWzAsIGF3YWl0IHNvdXJjZS5nZXRSb3dzKCldO1xuICAgIH1cbiAgICBjb25zdCByb3dzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgZGF0YVJvdyBvZiBkYXRhUm93cykge1xuICAgICAgcm93cy5wdXNoKGF3YWl0IHRoaXMubG9hZFJvdyhkYXRhUm93KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgcm93cywgdG90YWxSb3dzIH07XG4gIH1cblxuICBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxSPj4ge1xuICAgIHJldHVybiB7XG4gICAgICBnZXRSb3dDb250cm9sbGVyOiBhc3luYyAoJCwga2V5KSA9PlxuICAgICAgICAkKFxuICAgICAgICAgIGF3YWl0IENvbmZpZ0ZhY3RvcnkodGhpcy5jb25maWcuZ2V0Um93Q29udHJvbGxlckNvbmZpZywge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLmNvbmZpZy5zb3VyY2UsXG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgIGdldFJvd3M6IHF1ZXJ5ID0+IHRoaXMuZ2V0Um93cyhxdWVyeSksXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldEVsZW1lbnQoKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPFdpZGdldEVsZW1lbnQ8Uj4+PiB7XG4gICAgY29uc3QgeyByb3dzLCB0b3RhbFJvd3MgfSA9IGF3YWl0IHRoaXMuZ2V0Um93cyh7XG4gICAgICBnZXRDb3VudDogdHJ1ZSxcbiAgICAgIHRleHQ6IFwiXCIsXG4gICAgICB0YWtlOiB0aGlzLmNvbmZpZy5wYWdlU2l6ZSB8fCAxMCxcbiAgICAgIHNraXA6IDAsXG4gICAgICBvcmRlcjoge30sXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvd3MsXG4gICAgICB0b3RhbFJvd3MsXG4gICAgICBwYWdlU2l6ZTogdGhpcy5jb25maWcucGFnZVNpemUsXG4gICAgICBzZWFyY2hhYmxlOiAhIXRoaXMuY29uZmlnLnNlYXJjaEluPy5sZW5ndGgsXG4gICAgICBjb2x1bW5zOiBtYXBPYmplY3QodGhpcy5jb2x1bW5zLCBjb2x1bW4gPT4gKHtcbiAgICAgICAgc29ydGFibGU6IGNvbHVtbi5maWVsZCAhPT0gdW5kZWZpbmVkLFxuICAgICAgfSkpLFxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgbWFwQW5kRmlsdGVyT2JqZWN0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvbWFwQW5kRmlsdGVyT2JqZWN0XCI7XG5pbXBvcnQgeyBEZWJvdW5jZSB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91dGlscy9ob29rcy91c2VEZWJvdW5jZVwiO1xuaW1wb3J0IHsgVmlld1N0YXRlIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3ZpZXcvVmlld1N0YXRlXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXRWaWV3IH0gZnJvbSBcIi4uL0Fic3RyYWN0V2lkZ2V0Vmlld1wiO1xuaW1wb3J0IHsgQW55RGF0YVRhYmxlIH0gZnJvbSBcIi4vRGF0YVRhYmxlXCI7XG5pbXBvcnQgeyBXaWRnZXRFbGVtZW50LCBXaWRnZXRUeXBlIH0gZnJvbSBcIi4uL1dpZGdldFwiO1xuaW1wb3J0IHsgV2lkZ2V0Vmlld1Byb3BzIH0gZnJvbSBcIi4uL1dpZGdldFZpZXdcIjtcblxuZXhwb3J0IHR5cGUgRGF0YVRhYmxlVmlld1Byb3BzPFxuICBDIGV4dGVuZHMgUnBjQ29ubmVjdGlvbjxBbnlEYXRhVGFibGU+XG4+ID0gV2lkZ2V0Vmlld1Byb3BzPEM+O1xuXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlVmlldzxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55RGF0YVRhYmxlPlxuPiBleHRlbmRzIEFic3RyYWN0V2lkZ2V0VmlldzxcbiAgQyxcbiAgRGF0YVRhYmxlVmlld1Byb3BzPEM+ICYge1xuICAgIGNoaWxkcmVuKHZpZXc6IFJlYWRvbmx5PERhdGFUYWJsZVZpZXc8Qz4+KTogUmVhY3RFbGVtZW50O1xuICB9XG4+IHtcbiAgcHJvdGVjdGVkIHJlbG9hZERlYm91bmNlID0gRGVib3VuY2UoKTtcblxuICBAVmlld1N0YXRlKFwicmVsb2FkV2l0aERlYm91bmNlXCIpIHNlYXJjaFRleHQ6IHN0cmluZyA9IFwiXCI7XG4gIEBWaWV3U3RhdGUoXCJyZWxvYWRcIikgcGFnZVNpemU7XG4gIEBWaWV3U3RhdGUoXCJyZWxvYWRcIikgcGFnZUluZGV4ID0gMDtcblxuICBAVmlld1N0YXRlKCkgdG90YWxSb3dzOiBudW1iZXI7XG4gIEBWaWV3U3RhdGUoKSByb3dzOiBXaWRnZXRUeXBlPEM+W1wiVHlwZXNcIl1bXCJSb3dXaXRoS2V5XCJdW107XG4gIEBWaWV3U3RhdGUoKSBpc0xvYWRpbmcgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgdXBkYXRlRWxlbWVudChlbGVtZW50OiBXaWRnZXRFbGVtZW50PEM+KSB7XG4gICAgdGhpcy5yb3dzID0gZWxlbWVudC5yb3dzIHx8IFtdO1xuICAgIHRoaXMudG90YWxSb3dzID0gZWxlbWVudC50b3RhbFJvd3MgPz8gMDtcbiAgICB0aGlzLnBhZ2VTaXplID0gZWxlbWVudC5wYWdlU2l6ZSB8fCAxMDtcbiAgfVxuXG4gIEBWaWV3U3RhdGUoKSBjb2x1bW5zOiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIHtcbiAgICAgIHNvcnQ/OiBcIkFTQ1wiIHwgXCJERVNDXCI7XG4gICAgICBudWxscz86IFwiRklSU1RcIiB8IFwiTEFTVFwiO1xuICAgIH1cbiAgPiA9IHt9O1xuXG4gIGdldCBsYXN0UGFnZSgpIHtcbiAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMudG90YWxSb3dzIC8gdGhpcy5wYWdlU2l6ZSk7XG4gIH1cblxuICBzZXRQYWdlSW5kZXgocGFnZUluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnBhZ2VJbmRleCA9IE1hdGgubWluKHRoaXMubGFzdFBhZ2UgLSAxLCBwYWdlSW5kZXgpO1xuICB9XG5cbiAgc2V0UmVsYXRpdmVQYWdlKGNvdW50OiBudW1iZXIpIHtcbiAgICB0aGlzLnNldFBhZ2VJbmRleCh0aGlzLnBhZ2VJbmRleCArIGNvdW50KTtcbiAgfVxuXG4gIHNldFBhZ2VTaXplKHBhZ2VTaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLnBhZ2VTaXplID0gMSA+IHBhZ2VTaXplID8gMSA6IHBhZ2VTaXplO1xuICB9XG5cbiAgYXN5bmMgc2VhcmNoKHRleHQ6IHN0cmluZykge1xuICAgIHRoaXMuc2VhcmNoVGV4dCA9IHRleHQ7XG4gICAgdGhpcy5wYWdlSW5kZXggPSAwO1xuICB9XG5cbiAgY2xlYXJTZWFyY2goKSB7XG4gICAgdGhpcy5zZWFyY2hUZXh0ID0gXCJcIjtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdG9nZ2xlU29ydE9yTnVsbHM8SyBleHRlbmRzIFwic29ydFwiIHwgXCJudWxsc1wiPihcbiAgICBrZXk6IHN0cmluZyxcbiAgICBwOiBLLFxuICAgIHYxOiB7IHNvcnQ6IFwiQVNDXCIgfCBcIkRFU0NcIjsgbnVsbHM6IFwiRklSU1RcIiB8IFwiTEFTVFwiIH1bS10sXG4gICAgdjI6IHsgc29ydDogXCJBU0NcIiB8IFwiREVTQ1wiOyBudWxsczogXCJGSVJTVFwiIHwgXCJMQVNUXCIgfVtLXVxuICApIHtcbiAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmNvbHVtbnNba2V5XTtcbiAgICBsZXQgdmFsdWU6IHR5cGVvZiBjb2x1bW5bdHlwZW9mIHBdID0gY29sdW1uW3BdO1xuXG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSB2MTpcbiAgICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB2MjpcbiAgICAgICAgdmFsdWUgPSB2MTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgdmFsdWUgPSB2MjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY29sdW1ucyA9IHtcbiAgICAgIC4uLnRoaXMuY29sdW1ucyxcbiAgICAgIFtrZXldOiB7IC4uLmNvbHVtbiwgW3BdOiB2YWx1ZSB9LFxuICAgIH07XG4gIH1cblxuICB0b2dnbGVOdWxscyhrZXk6IHN0cmluZykge1xuICAgIHRoaXMuX3RvZ2dsZVNvcnRPck51bGxzKGtleSwgXCJzb3J0XCIsIFwiQVNDXCIsIFwiREVTQ1wiKTtcbiAgfVxuXG4gIHRvZ2dsZVNvcnQoa2V5OiBzdHJpbmcpIHtcbiAgICB0aGlzLl90b2dnbGVTb3J0T3JOdWxscyhrZXksIFwibnVsbHNcIiwgXCJGSVJTVFwiLCBcIkxBU1RcIik7XG4gIH1cblxuICBhc3luYyByZWxvYWRXaXRoRGVib3VuY2UoKSB7XG4gICAgaWYgKCF0aGlzLmlzRGlkTW91bnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIGlmIChhd2FpdCB0aGlzLnJlbG9hZERlYm91bmNlLndhaXQoKSkgcmV0dXJuO1xuICAgIGF3YWl0IHRoaXMucmVsb2FkKCk7XG4gIH1cblxuICBhc3luYyByZWxvYWRBZnRlclJlbW92ZShrZXk6IHN0cmluZykge1xuICAgIC8vIFRPRE9cbiAgICByZXR1cm4gdGhpcy5yZWxvYWQoKTtcbiAgfVxuXG4gIGFzeW5jIHJlbG9hZCgpIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgY29uc3QgZ2V0Q291bnQgPSB0aGlzLnRvdGFsUm93cyA9PT0gMCB8fCB0aGlzLnBhZ2VJbmRleCA9PT0gMDtcbiAgICBjb25zdCB7IHRvdGFsUm93cywgcm93cyB9ID0gYXdhaXQgdGhpcy5wcm9wcy5jb25uZWN0aW9uLmNvbnRyb2xsZXIuZ2V0Um93cyh7XG4gICAgICBnZXRDb3VudCxcbiAgICAgIG9yZGVyOiBtYXBBbmRGaWx0ZXJPYmplY3QodGhpcy5jb2x1bW5zLCBjb2x1bW4gPT4ge1xuICAgICAgICBjb25zdCB7IG51bGxzLCBzb3J0IH0gPSBjb2x1bW47XG4gICAgICAgIGlmIChudWxscyB8fCBzb3J0KSB7XG4gICAgICAgICAgcmV0dXJuIHsgbnVsbHMsIHNvcnQgfTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICB0ZXh0OiB0aGlzLnNlYXJjaFRleHQsXG4gICAgICB0YWtlOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgc2tpcDogdGhpcy5wYWdlSW5kZXggKiB0aGlzLnBhZ2VTaXplLFxuICAgIH0pO1xuXG4gICAgaWYgKGdldENvdW50KSB7XG4gICAgICB0aGlzLnRvdGFsUm93cyA9IHRvdGFsUm93cztcbiAgICB9XG4gICAgdGhpcy5yb3dzID0gcm93cztcbiAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICB9XG5cbiAgcmVuZGVyVmlldygpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuISh0aGlzKTtcbiAgfVxufVxuIiwiLypcblxuVE9ETzpcbiAgb25TdWJtaXQodmFsdWUsIHtyZXNvbHZlLCByZWplY3R9KSB7XG4gICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgfVxuXG4gKi9cbmltcG9ydCB7IEF3YWl0YWJsZSwgSWYsIElzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQge1xuICBBbnlJbnB1dCxcbiAgSW5wdXRFcnJvcixcbiAgSW5wdXRWYWx1ZSxcbiAgSW5wdXRWYWx1ZURhdGEsXG59IGZyb20gXCIuLi8uLi9pbnB1dC9JbnB1dFwiO1xuaW1wb3J0IHsgVmFsdWVPckF3YWl0YWJsZUZuIH0gZnJvbSBcIi4uLy4uL2lucHV0L1ZhbHVlT3JBd2FpdGFibGVGblwiO1xuaW1wb3J0IHsgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IEJhc2VkV2lkZ2V0LCBXaWRnZXQsIFdpZGdldEVsZW1lbnQsIFdpZGdldFR5cGUgfSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBGb3JtSGFuZGxlciB9IGZyb20gXCIuL0Zvcm1IYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIFRGb3JtID0ge1xuICBJbnB1dDogQW55SW5wdXQ7XG4gIEVycm9yOiBhbnk7XG4gIFZhbHVlOiBhbnk7XG59O1xuZXhwb3J0IHR5cGUgQW55Rm9ybSA9IEZvcm08VEZvcm0+O1xuXG5leHBvcnQgdHlwZSBCYXNlZEZvcm0gPSBCYXNlZFdpZGdldDxXaWRnZXRUeXBlPEFueUZvcm0+PjtcblxuZXhwb3J0IHR5cGUgRm9ybVR5cGU8VCBleHRlbmRzIEJhc2VkRm9ybT4gPSBXaWRnZXRUeXBlPFQ+W1wiVEZvcm1cIl07XG5cbmV4cG9ydCB0eXBlIEZvcm08XG4gIFQgZXh0ZW5kcyBURm9ybSxcbiAgVmFsdWUgPSBUW1wiVmFsdWVcIl0sXG4gIEVycm9yID0gVFtcIkVycm9yXCJdLFxuICBJbnB1dCBleHRlbmRzIEFueUlucHV0ID0gVFtcIklucHV0XCJdLFxuICBSZXN1bHQgPVxuICAgIHwgeyB2YWx1ZTogVmFsdWUgfVxuICAgIHwgeyBlcnJvcjogRXJyb3IgfVxuICAgIHwgeyBpbnB1dEVycm9yOiBJbnB1dEVycm9yPElucHV0PiB9XG4+ID0gV2lkZ2V0PHtcbiAgVEZvcm06IFQ7XG5cbiAgQ29ubmVjdGlvbjoge307XG5cbiAgQ29tbWFuZHM6IHtcbiAgICBzdWJtaXQ6IHtcbiAgICAgIChkYXRhOiBJbnB1dFZhbHVlRGF0YTxJbnB1dD4pOiBSZXN1bHQ7XG4gICAgICBoYW5kbGVyOiBcImhhbmRsZVN1Ym1pdFwiO1xuICAgIH07XG4gIH07XG5cbiAgQ29uZmlnOiB7XG4gICAgZGVmYXVsdD86IFZhbHVlT3JBd2FpdGFibGVGbjxJbnB1dFZhbHVlPElucHV0Pj47XG5cbiAgICBpbnB1dENvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxJbnB1dD47XG5cbiAgICBzdWJtaXQoXG4gICAgICB2YWx1ZTogSW5wdXRWYWx1ZTxJbnB1dD5cbiAgICApOiBBd2FpdGFibGU8XG4gICAgICB8IFJlc3VsdFxuICAgICAgfCBJZjxJczxWYWx1ZSwgbnVsbD4sIHZvaWQ+XG4gICAgICB8IElmPElzPFZhbHVlLCBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgYW55W10+LCBWYWx1ZT5cbiAgICA+O1xuICB9O1xuXG4gIEVsZW1lbnQ6IFdpZGdldEVsZW1lbnQ8SW5wdXQ+O1xuXG4gIENvbnRyb2xsZXI6IElucHV0O1xuXG4gIFByb3BzOiB7IGlucHV0OiBJbnB1dCB9O1xuXG4gIEhhbmRsZXI6IHt9O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtPFxuICBJbnB1dCBleHRlbmRzIEFueUlucHV0LFxuICBWYWx1ZSA9IG51bGwsXG4gIEVycm9yID0gbmV2ZXIsXG4gIFQgZXh0ZW5kcyBURm9ybSA9IHtcbiAgICBJbnB1dDogSW5wdXQ7XG4gICAgVmFsdWU6IFZhbHVlO1xuICAgIEVycm9yOiBFcnJvcjtcbiAgfVxuPih7IGlucHV0IH06IHsgdmFsdWU/OiBWYWx1ZTsgZXJyb3I/OiBFcnJvcjsgaW5wdXQ6IElucHV0IH0pOiBGb3JtPFQ+IHtcbiAgcmV0dXJuIDxhbnk+V2lkZ2V0PEFueUZvcm0+KHtcbiAgICBwcm9wczogeyBpbnB1dCB9LFxuICAgIGNvbnRyb2xsZXI6IGlucHV0LFxuICAgIGhhbmRsZXI6IEZvcm1IYW5kbGVyLFxuICAgIGNvbW1hbmRzOiB7IHN1Ym1pdDogXCJoYW5kbGVTdWJtaXRcIiB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IEFueUlucHV0LCBJbnB1dFZhbHVlRGF0YSB9IGZyb20gXCIuLi8uLi9pbnB1dC9JbnB1dFwiO1xuaW1wb3J0IHsgVmFsdWVPckF3YWl0YWJsZUZuIH0gZnJvbSBcIi4uLy4uL2lucHV0L1ZhbHVlT3JBd2FpdGFibGVGblwiO1xuaW1wb3J0IHsgUnBjVW5yZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuLi8uLi9ScGNcIjtcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0SGFuZGxlciB9IGZyb20gXCIuLi9BYnN0cmFjdFdpZGdldEhhbmRsZXJcIjtcbmltcG9ydCB7IEFueUZvcm0gfSBmcm9tIFwiLi9Gb3JtXCI7XG5pbXBvcnQgeyBJV2lkZ2V0SGFuZGxlciwgV2lkZ2V0Q29udHJvbGxlciwgV2lkZ2V0RWxlbWVudCB9IGZyb20gXCIuLi9XaWRnZXRcIjtcblxudHlwZSBUID0gQW55Rm9ybTtcblxuZXhwb3J0IGNsYXNzIEZvcm1IYW5kbGVyXG4gIGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRIYW5kbGVyPFQ+XG4gIGltcGxlbWVudHMgSVdpZGdldEhhbmRsZXI8QW55Rm9ybT4ge1xuICBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxUPj4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5pbnB1dENvbmZpZztcbiAgfVxuXG4gIGFzeW5jIGhhbmRsZVN1Ym1pdCh2YWx1ZURhdGE6IElucHV0VmFsdWVEYXRhPEFueUlucHV0Pikge1xuICAgIGNvbnN0IGlucHV0UmVzdWx0ID0gYXdhaXQgdGhpcy5jb250cm9sbGVyLnRoZW4oaW5wdXQgPT5cbiAgICAgIGlucHV0LmxvYWRBbmRDaGVjayh2YWx1ZURhdGEpXG4gICAgKTtcbiAgICBpZiAoXCJlcnJvclwiIGluIGlucHV0UmVzdWx0KSByZXR1cm4geyBpbnB1dEVycm9yOiBpbnB1dFJlc3VsdC5lcnJvciB9O1xuICAgIGNvbnN0IHN1Ym1pdFJlc3VsdCA9IGF3YWl0IHRoaXMuY29uZmlnLnN1Ym1pdChpbnB1dFJlc3VsdC52YWx1ZSk7XG4gICAgaWYgKHN1Ym1pdFJlc3VsdCA9PSBudWxsKSByZXR1cm4geyB2YWx1ZTogbnVsbCB9O1xuICAgIGlmICh0eXBlb2Ygc3VibWl0UmVzdWx0ICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkoc3VibWl0UmVzdWx0KSlcbiAgICAgIHJldHVybiB7IHZhbHVlOiBzdWJtaXRSZXN1bHQgfTtcblxuICAgIHJldHVybiBzdWJtaXRSZXN1bHQ7XG4gIH1cblxuICBhc3luYyBnZXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxXaWRnZXRFbGVtZW50PFQ+Pj4ge1xuICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgVmFsdWVPckF3YWl0YWJsZUZuKHRoaXMuY29uZmlnLmRlZmF1bHQpO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gYXdhaXQgdGhpcy5jb250cm9sbGVyLnRoZW4oYyA9PiBjLmdldElucHV0RWxlbWVudCgpKTtcbiAgICAgIHJldHVybiB7IC4uLmVsZW1lbnQsIHZhbHVlIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIudGhlbihjID0+IGMuZ2V0RWxlbWVudCgpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC9yZW5kZXJlclwiO1xuaW1wb3J0IHsgSW5wdXRFcnJvciB9IGZyb20gXCIuLi8uLi9pbnB1dC9JbnB1dFwiO1xuaW1wb3J0IHsgSW5wdXRWaWV3LCBJbnB1dFZpZXdQcm9wcyB9IGZyb20gXCIuLi8uLi9pbnB1dC9JbnB1dFZpZXdcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldFZpZXcgfSBmcm9tIFwiLi4vQWJzdHJhY3RXaWRnZXRWaWV3XCI7XG5cbmltcG9ydCB7IFdpZGdldENvbnRyb2xsZXIsIFdpZGdldFR5cGUgfSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBXaWRnZXRWaWV3UHJvcHMgfSBmcm9tIFwiLi4vV2lkZ2V0Vmlld1wiO1xuaW1wb3J0IHsgQW55Rm9ybSwgVEZvcm0gfSBmcm9tIFwiLi9Gb3JtXCI7XG5cbmV4cG9ydCB0eXBlIEZvcm1WaWV3UHJvcHM8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueUZvcm0+LFxuICBUIGV4dGVuZHMgVEZvcm0gPSBXaWRnZXRUeXBlPEM+W1wiVEZvcm1cIl1cbj4gPSBXaWRnZXRWaWV3UHJvcHM8Qz4gJiB7XG4gIC8vIHJlbmRlckZvcm1FcnJvclxuICBpbnB1dDogUmVuZGVyZXI8SW5wdXRWaWV3UHJvcHM8UnBjQ29ubmVjdGlvbjxUW1wiSW5wdXRcIl0+Pj47XG5cbiAgb25TdWJtaXQ/KHJlc3VsdDogVFtcIlZhbHVlXCJdKTtcblxuICBvbkVycm9yPyhyZXN1bHQ6IFRbXCJFcnJvclwiXSk7XG5cbiAgb25JbnB1dEVycm9yPyhyZXN1bHQ6IElucHV0RXJyb3I8VFtcIklucHV0XCJdPik7XG59O1xuXG5leHBvcnQgY2xhc3MgRm9ybVZpZXc8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueUZvcm0+XG4+IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRWaWV3PFxuICBDLFxuICBGb3JtVmlld1Byb3BzPEM+ICYge1xuICAgIGNoaWxkcmVuOiAocHJvcHM6IHtcbiAgICAgIGZvcm06IEZvcm1WaWV3PEM+O1xuICAgICAgaW5wdXQ6IFJlYWN0RWxlbWVudDtcbiAgICB9KSA9PiBSZWFjdEVsZW1lbnQ7XG4gIH1cbj4ge1xuICBpbnB1dDogSW5wdXRWaWV3PFJwY0Nvbm5lY3Rpb248V2lkZ2V0Q29udHJvbGxlcjxDPj4+O1xuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuX2VsZW1lbnQgPSB7IC4uLnRoaXMuZWxlbWVudCB9O1xuICB9XG5cbiAgYXN5bmMgc3VibWl0KCkge1xuICAgIGlmICghKGF3YWl0IHRoaXMuaW5wdXQudmFsaWRhdGUoKSkpIHJldHVybjtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucHJvcHMuY29ubmVjdGlvbi5jb21tYW5kKFxuICAgICAgXCJzdWJtaXRcIixcbiAgICAgIHRoaXMuaW5wdXQuZGF0YVxuICAgICk7XG5cbiAgICBpZiAoXCJpbnB1dEVycm9yXCIgaW4gcmVzdWx0KSB7XG4gICAgICB0aGlzLmlucHV0Py5zZXRFcnJvcihyZXN1bHQuaW5wdXRFcnJvcik7XG4gICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcj8uKHJlc3VsdC5pbnB1dEVycm9yKTtcbiAgICB9IGVsc2UgaWYgKFwiZXJyb3JcIiBpbiByZXN1bHQpIHtcbiAgICAgIHRoaXMucHJvcHMub25FcnJvcj8uKHJlc3VsdC5lcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMub25TdWJtaXQ/LihyZXN1bHQudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlclZpZXcoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbih7XG4gICAgICBmb3JtOiB0aGlzLFxuICAgICAgaW5wdXQ6IHRoaXMucHJvcHMuaW5wdXQoe1xuICAgICAgICBjb25uZWN0aW9uOiB0aGlzLmNvbnRyb2xsZXIsXG4gICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgIG9uQ2hhbmdlOiB1bmRlZmluZWQsXG4gICAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgICAgaW5wdXRSZWY6IGZpZWxkID0+IHtcbiAgICAgICAgICB0aGlzLmlucHV0ID0gZmllbGQgYXMgYW55O1xuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEF3YWl0YWJsZSxcbiAgSWYsXG4gIElzVW5kZWZpbmVkLFxuICBQYXJ0aWFsVW5kZWZpbmVkS2V5cyxcbn0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBOb1JwYyB9IGZyb20gXCIuLi8uLi9Ob1JwY1wiO1xuaW1wb3J0IHtcbiAgQW55UnBjLFxuICBScGNDb21tYW5kLFxuICBScGNDb25uZWN0aW9uLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxufSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQge1xuICBBbnlXaWRnZXQsXG4gIFRXaWRnZXQsXG4gIFdpZGdldCxcbiAgV2lkZ2V0RWxlbWVudCxcbiAgV2lkZ2V0SGFuZGxlckNsYXNzLFxufSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBJbmxpbmVXaWRnZXRIYW5kbGVyIH0gZnJvbSBcIi4vSW5saW5lV2lkZ2V0SGFuZGxlclwiO1xuXG5leHBvcnQgdHlwZSBUSW5saW5lV2lkZ2V0ID0ge1xuICBUYXJnZXQ6IEFueVdpZGdldCB8IHVuZGVmaW5lZDtcbiAgRWxlbWVudDogb2JqZWN0O1xuICBDb250cm9sbGVyOiBBbnlScGM7XG59O1xuXG5leHBvcnQgdHlwZSBBbnlJbmxpbmVXaWRnZXQgPSBJbmxpbmVXaWRnZXQ8VElubGluZVdpZGdldD47XG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBJbmxpbmVXaWRnZXQge1xuICB0eXBlIFdpdGhFbGVtZW50PFxuICAgIFRhcmdldCBleHRlbmRzIEFueVdpZGdldCxcbiAgICBFbGVtZW50IGV4dGVuZHMgb2JqZWN0XG4gID4gPSBJbmxpbmVXaWRnZXQ8eyBDb250cm9sbGVyOiBOb1JwYzsgVGFyZ2V0OiBUYXJnZXQ7IEVsZW1lbnQ6IEVsZW1lbnQgfT47XG59XG5leHBvcnQgdHlwZSBJbmxpbmVXaWRnZXQ8XG4gIFQgZXh0ZW5kcyBUSW5saW5lV2lkZ2V0LFxuICBUYXJnZXQgZXh0ZW5kcyBBbnlXaWRnZXQgPSBOb25OdWxsYWJsZTxUW1wiVGFyZ2V0XCJdPixcbiAgVW5kZWZpbmVkVGFyZ2V0IGV4dGVuZHMgdW5kZWZpbmVkID0gSWY8SXNVbmRlZmluZWQ8VFtcIlRhcmdldFwiXT4sIHVuZGVmaW5lZD5cbj4gPSBXaWRnZXQ8e1xuICBUSW5saW5lV2lkZ2V0OiBUO1xuICBDb25uZWN0aW9uOiB7XG4gICAgdGFyZ2V0OiBScGNDb25uZWN0aW9uPFRhcmdldD4gfCBVbmRlZmluZWRUYXJnZXQ7XG4gIH07XG4gIENvbmZpZzogUGFydGlhbFVuZGVmaW5lZEtleXM8e1xuICAgIGNvbnRyb2xsZXJDb25maWc6IFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIkNvbnRyb2xsZXJcIl0+O1xuXG4gICAgZ2V0RWxlbWVudDpcbiAgICAgIHwgKCgpID0+IEF3YWl0YWJsZTxUW1wiRWxlbWVudFwiXT4pXG4gICAgICB8IElmPElzVW5kZWZpbmVkPFRbXCJFbGVtZW50XCJdPiwgdW5kZWZpbmVkPjtcbiAgICB0YXJnZXRDb25maWc6IFJwY1VucmVzb2x2ZWRDb25maWc8VGFyZ2V0PiB8IFVuZGVmaW5lZFRhcmdldDtcbiAgfT47XG4gIEhhbmRsZXI6IHt9O1xuICBQcm9wczoge1xuICAgIGlubGluZVRhcmdldDogVFtcIlRhcmdldFwiXTtcbiAgfTtcbiAgRWxlbWVudDogW1RbXCJFbGVtZW50XCJdLCBXaWRnZXRFbGVtZW50PFRhcmdldD4gfCBVbmRlZmluZWRUYXJnZXRdO1xuICBDb250cm9sbGVyOiBUW1wiQ29udHJvbGxlclwiXTtcbiAgQ29tbWFuZHM6IHtcbiAgICB0YXJnZXQ6IFJwY0NvbW1hbmQgJiB7IGhhbmRsZXI6IFwiaGFuZGxlVGFyZ2V0XCIgfTtcbiAgfTtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gSW5saW5lV2lkZ2V0PFxuICBUYXJnZXQgZXh0ZW5kcyBBbnlXaWRnZXQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsXG4gIENvbnRyb2xsZXIgZXh0ZW5kcyBBbnlScGMgPSBOb1JwYyxcbiAgRWxlbWVudCBleHRlbmRzIG9iamVjdCA9IHt9LFxuICBUIGV4dGVuZHMgVElubGluZVdpZGdldCA9IHtcbiAgICBFbGVtZW50OiBFbGVtZW50O1xuICAgIENvbnRyb2xsZXI6IENvbnRyb2xsZXI7XG4gICAgVGFyZ2V0OiBUYXJnZXQ7XG4gIH1cbj4ob3B0aW9uczoge1xuICB0YXJnZXQ/OiBUYXJnZXQ7XG4gIGNvbnRyb2xsZXI/OiBDb250cm9sbGVyO1xuICBlbGVtZW50PzogRWxlbWVudDtcbn0pOiBJbmxpbmVXaWRnZXQ8VD4ge1xuICBjb25zdCB7IHRhcmdldCwgY29udHJvbGxlciB9ID0gb3B0aW9ucztcbiAgcmV0dXJuIFdpZGdldDxJbmxpbmVXaWRnZXQ8VD4+KHtcbiAgICBpc0dlbmVyaWNDb25maWc6IGZhbHNlLFxuICAgIGhhbmRsZXI6IElubGluZVdpZGdldEhhbmRsZXIgYXMgV2lkZ2V0SGFuZGxlckNsYXNzPElubGluZVdpZGdldDxUPj4sXG4gICAgcHJvcHM6IHsgaW5saW5lVGFyZ2V0OiB0YXJnZXQgfSxcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyIHx8IE5vUnBjLFxuICAgIGNvbW1hbmRzOiB7IHRhcmdldDogXCJoYW5kbGVUYXJnZXRcIiB9LFxuICAgIGNvbm5lY3Rpb246IHtcbiAgICAgIHRhcmdldChjb25uKSB7XG4gICAgICAgIHJldHVybiBjb25uLnJwYy5pbmxpbmVUYXJnZXQ/LmNyZWF0ZVJwY0Nvbm5lY3Rpb24ocGF5bG9hZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbm4uY29tbWFuZChcInRhcmdldFwiLCBwYXlsb2FkKTtcbiAgICAgICAgfSkhO1xuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7IExhenkgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhdHRlcm5zL2xhenlcIjtcbmltcG9ydCB7IFJwY0Vycm9yLCBScGNSZXNvbHZlZEhhbmRsZXIsIFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldEhhbmRsZXIgfSBmcm9tIFwiLi4vQWJzdHJhY3RXaWRnZXRIYW5kbGVyXCI7XG5pbXBvcnQgeyBBbnlJbmxpbmVXaWRnZXQgfSBmcm9tIFwiLi9JbmxpbmVXaWRnZXRcIjtcbmltcG9ydCB7XG4gIEFueVdpZGdldCxcbiAgSVdpZGdldEhhbmRsZXIsXG4gIFdpZGdldENvbnRyb2xsZXIsXG4gIFdpZGdldEVsZW1lbnQsXG59IGZyb20gXCIuLi9XaWRnZXRcIjtcblxuZXhwb3J0IGNsYXNzIElubGluZVdpZGdldEhhbmRsZXI8VCBleHRlbmRzIEFueUlubGluZVdpZGdldD5cbiAgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldEhhbmRsZXI8VD5cbiAgaW1wbGVtZW50cyBJV2lkZ2V0SGFuZGxlcjxBbnlJbmxpbmVXaWRnZXQ+IHtcbiAgZ2V0Q29udHJvbGxlckNvbmZpZygpOiBScGNVbnJlc29sdmVkQ29uZmlnPFdpZGdldENvbnRyb2xsZXI8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuY29udHJvbGxlckNvbmZpZztcbiAgfVxuXG4gIEBMYXp5KCkgZ2V0IHRhcmdldENvbnRleHQoKTpcbiAgICB8IFByb21pc2U8UnBjUmVzb2x2ZWRIYW5kbGVyPEFueVdpZGdldD4+XG4gICAgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnJwYy5pbmxpbmVUYXJnZXQpXG4gICAgICByZXR1cm4gdGhpcy5ycGMuaW5saW5lVGFyZ2V0LnJlc29sdmVScGNIYW5kbGVyKHRoaXMuY29uZmlnLnRhcmdldENvbmZpZyk7XG4gIH1cblxuICBhc3luYyBoYW5kbGVUYXJnZXQocGF5bG9hZCkge1xuICAgIGlmICghdGhpcy50YXJnZXRDb250ZXh0KSB0aHJvdyBuZXcgUnBjRXJyb3IoYE5vIHRhcmdldGApO1xuICAgIHJldHVybiB0aGlzLnRhcmdldENvbnRleHQudGhlbihjID0+IGMuaGFuZGxlKHBheWxvYWQpKTtcbiAgfVxuXG4gIGFzeW5jIGdldEVsZW1lbnQoKTogUHJvbWlzZTxXaWRnZXRFbGVtZW50PFQ+PiB7XG4gICAgdGhpcy5jb25maWcuZ2V0RWxlbWVudCgpO1xuICAgIHJldHVybiBbXG4gICAgICBhd2FpdCB0aGlzLmNvbmZpZy5nZXRFbGVtZW50KCksXG4gICAgICBhd2FpdCB0aGlzLnRhcmdldENvbnRleHQ/LnRoZW4oYyA9PiBjLmdldEVsZW1lbnQoKSksXG4gICAgXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXRWaWV3IH0gZnJvbSBcIi4uL0Fic3RyYWN0V2lkZ2V0Vmlld1wiO1xuaW1wb3J0IHsgQW55SW5saW5lV2lkZ2V0LCBUSW5saW5lV2lkZ2V0IH0gZnJvbSBcIi4vSW5saW5lV2lkZ2V0XCI7XG5pbXBvcnQgeyBBbnlXaWRnZXQsIFdpZGdldFR5cGUgfSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBXaWRnZXRWaWV3UHJvcHMgfSBmcm9tIFwiLi4vV2lkZ2V0Vmlld1wiO1xuXG5leHBvcnQgY2xhc3MgSW5saW5lV2lkZ2V0VmlldzxcbiAgQyBleHRlbmRzIFJwY0Nvbm5lY3Rpb248QW55SW5saW5lV2lkZ2V0PixcbiAgVCBleHRlbmRzIFRJbmxpbmVXaWRnZXQgPSBXaWRnZXRUeXBlPEM+W1wiVElubGluZVdpZGdldFwiXSxcbiAgVGFyZ2V0IGV4dGVuZHMgQW55V2lkZ2V0ID0gTm9uTnVsbGFibGU8VFtcIlRhcmdldFwiXT5cbj4gZXh0ZW5kcyBBYnN0cmFjdFdpZGdldFZpZXc8XG4gIEMsXG4gIFdpZGdldFZpZXdQcm9wczxDPiAmIHtcbiAgICBjaGlsZHJlbih2aWV3OiBJbmxpbmVXaWRnZXRWaWV3PEM+KTogUmVhY3ROb2RlO1xuICB9XG4+IHtcbiAgZ2V0IGlubGluZUVsZW1lbnQoKTogVFtcIkVsZW1lbnRcIl0ge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRbMF07XG4gIH1cbiAgZ2V0IHRhcmdldFByb3BzKCk6IFdpZGdldFZpZXdQcm9wczxScGNDb25uZWN0aW9uPFRhcmdldD4+IHtcbiAgICByZXR1cm4ge1xuICAgICAgY29ubmVjdGlvbjogdGhpcy5jb25uZWN0aW9uLnRhcmdldCEsXG4gICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnRbMV0hLFxuICAgIH07XG4gIH1cblxuICByZW5kZXJWaWV3KCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW4odGhpcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFVuaW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgUnBjTWFwIH0gZnJvbSBcIi4uLy4uL3JwYy1tYXAvUnBjTWFwXCI7XG5pbXBvcnQgeyBBbnlXaWRnZXQsIFdpZGdldCwgV2lkZ2V0RWxlbWVudCB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IEFueVdpZGdldFJlY29yZCB9IGZyb20gXCIuLi93aWRnZXQtbWFwL1dpZGdldE1hcFwiO1xuaW1wb3J0IHsgVGFic1dpZGdldEhhbmRsZXIgfSBmcm9tIFwiLi9UYWJzV2lkZ2V0SGFuZGxlclwiO1xuXG5leHBvcnQgdHlwZSBBbnlUYWJzV2lkZ2V0ID0gVGFic1dpZGdldDxBbnlXaWRnZXRSZWNvcmQ+O1xuXG5leHBvcnQgdHlwZSBUYWJzV2lkZ2V0PFQgZXh0ZW5kcyBBbnlXaWRnZXRSZWNvcmQ+ID0gV2lkZ2V0PHtcbiAgVGFiTWFwOiBUO1xuXG4gIENvbnRyb2xsZXI6IFJwY01hcDxUPjtcblxuICBDb21tYW5kczoge1xuICAgIGdldFRhYjoge1xuICAgICAgKGtleTogc3RyaW5nKTogV2lkZ2V0RWxlbWVudDxBbnlXaWRnZXQ+O1xuICAgICAgaGFuZGxlcjogXCJoYW5kbGVHZXRUYWJcIjtcbiAgICB9O1xuICB9O1xuICBDb25uZWN0aW9uOiB7XG4gICAgZ2V0VGFiPEsgZXh0ZW5kcyBrZXlvZiBUPihrZXk6IEspOiBXaWRnZXRFbGVtZW50PFRbS10+O1xuICB9O1xuXG4gIENvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxScGNNYXA8VD4+O1xuXG4gIEVsZW1lbnQ6IHtcbiAgICBjdXJyZW50PzogVW5pb248XG4gICAgICB7XG4gICAgICAgIFtLIGluIHN0cmluZyAmIGtleW9mIFRdOiB7XG4gICAgICAgICAga2V5OiBLO1xuICAgICAgICAgIGVsZW1lbnQ6IFdpZGdldEVsZW1lbnQ8VFtLXT47XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgPjtcbiAgfTtcblxuICBQcm9wczoge1xuICAgIHRhYk1hcDogVDtcbiAgfTtcblxuICBIYW5kbGVyOiB7fTtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gVGFic1dpZGdldDxUIGV4dGVuZHMgQW55V2lkZ2V0UmVjb3JkPihcbiAgdGFiTWFwOiBUXG4pOiBUYWJzV2lkZ2V0PFQ+IHtcbiAgcmV0dXJuIDxhbnk+V2lkZ2V0PEFueVRhYnNXaWRnZXQ+KHtcbiAgICBjb250cm9sbGVyOiBScGNNYXAodGFiTWFwKSxcbiAgICBoYW5kbGVyOiBUYWJzV2lkZ2V0SGFuZGxlcixcbiAgICBjb21tYW5kczogeyBnZXRUYWI6IFwiaGFuZGxlR2V0VGFiXCIgfSxcbiAgICBwcm9wczogeyB0YWJNYXAgfSxcbiAgICBjb25uZWN0aW9uOiB7XG4gICAgICBnZXRUYWI6IGNvbm4gPT4ga2V5ID0+IGNvbm4uY29tbWFuZChcImdldFRhYlwiLCBrZXkpLFxuICAgIH0sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXRIYW5kbGVyIH0gZnJvbSBcIi4uL0Fic3RyYWN0V2lkZ2V0SGFuZGxlclwiO1xuaW1wb3J0IHsga2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L2tleXNcIjtcbmltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBJV2lkZ2V0SGFuZGxlciwgV2lkZ2V0Q29udHJvbGxlciwgV2lkZ2V0RWxlbWVudCB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IEFueVRhYnNXaWRnZXQgfSBmcm9tIFwiLi9UYWJzV2lkZ2V0XCI7XG5cbnR5cGUgVCA9IEFueVRhYnNXaWRnZXQ7XG5cbmV4cG9ydCBjbGFzcyBUYWJzV2lkZ2V0SGFuZGxlclxuICBleHRlbmRzIEFic3RyYWN0V2lkZ2V0SGFuZGxlcjxUPlxuICBpbXBsZW1lbnRzIElXaWRnZXRIYW5kbGVyPFQ+IHtcbiAgZ2V0Q29udHJvbGxlckNvbmZpZygpOiBScGNVbnJlc29sdmVkQ29uZmlnPFdpZGdldENvbnRyb2xsZXI8VD4+IHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlR2V0VGFiKGtleSkge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXJcbiAgICAgIC50aGVuKGMgPT4gYy5nZXRUYXJnZXRIYW5kbGVyKGtleSkpXG4gICAgICAudGhlbih0ID0+IHQuZ2V0RWxlbWVudCgpKTtcbiAgfVxuXG4gIGFzeW5jIGdldEVsZW1lbnQoKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPFdpZGdldEVsZW1lbnQ8VD4+PiB7XG4gICAgY29uc3QgW2tleV0gPSBrZXlzKHRoaXMucnBjLndpZGdldC5jb250cm9sbGVyLnRhcmdldE1hcCk7XG5cbiAgICBjb25zdCBlbGVtZW50ID1cbiAgICAgIChrZXkgfHwgdW5kZWZpbmVkKSAmJlxuICAgICAgKGF3YWl0IHRoaXMuY29udHJvbGxlclxuICAgICAgICAudGhlbihjID0+IGMuZ2V0VGFyZ2V0SGFuZGxlcihrZXkpKVxuICAgICAgICAudGhlbihjID0+IGMuZ2V0RWxlbWVudCgpKSk7XG4gICAgcmV0dXJuIHsgY3VycmVudDogZWxlbWVudCA/IHsga2V5LCBlbGVtZW50IH0gOiB1bmRlZmluZWQgfTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3JlbmRlcmVyXCI7XG5pbXBvcnQgeyBWaWV3U3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3Qvdmlldy9WaWV3U3RhdGVcIjtcbmltcG9ydCB7IFJwY0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldFZpZXcgfSBmcm9tIFwiLi4vQWJzdHJhY3RXaWRnZXRWaWV3XCI7XG5pbXBvcnQgeyBBbnlXaWRnZXQsIEFueVdpZGdldENvbm5lY3Rpb24sIFdpZGdldFR5cGUgfSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBXaWRnZXRWaWV3UHJvcHMgfSBmcm9tIFwiLi4vV2lkZ2V0Vmlld1wiO1xuaW1wb3J0IHsgQW55VGFic1dpZGdldCwgVGFic1dpZGdldCB9IGZyb20gXCIuL1RhYnNXaWRnZXRcIjtcblxuZXhwb3J0IHR5cGUgQW55VGFic1dpZGdldENvbm5lY3Rpb24gPSBScGNDb25uZWN0aW9uPEFueVRhYnNXaWRnZXQ+O1xuXG5leHBvcnQgY2xhc3MgVGFic1dpZGdldFZpZXc8XG4gIEMgZXh0ZW5kcyBBbnlUYWJzV2lkZ2V0Q29ubmVjdGlvblxuPiBleHRlbmRzIEFic3RyYWN0V2lkZ2V0VmlldzxcbiAgQyxcbiAgV2lkZ2V0Vmlld1Byb3BzPEM+ICYge1xuICAgIGNoaWxkcmVuOiBSZW5kZXJlcjxUYWJzV2lkZ2V0VmlldzxDPj47XG4gIH1cbj4ge1xuICBAVmlld1N0YXRlKClcbiAgcHJvdGVjdGVkIF9jdXJyZW50VGFiUHJvcHM6XG4gICAgfCBPdmVycmlkZTxXaWRnZXRWaWV3UHJvcHM8QW55V2lkZ2V0Q29ubmVjdGlvbj4sIHsga2V5OiBzdHJpbmcgfT5cbiAgICB8IHVuZGVmaW5lZDtcblxuICBnZXQgY3VycmVudFRhYlByb3BzKCk6XG4gICAgfCBPdmVycmlkZTxXaWRnZXRWaWV3UHJvcHM8QW55V2lkZ2V0Q29ubmVjdGlvbj4sIHsga2V5OiBzdHJpbmcgfT5cbiAgICB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRUYWJQcm9wcztcbiAgfVxuXG4gIHByb3RlY3RlZCB1cGRhdGVUYWJQcm9wcyh7IGtleSwgZWxlbWVudCB9OiB7IGtleTogc3RyaW5nOyBlbGVtZW50OiBvYmplY3QgfSkge1xuICAgIHRoaXMuX2N1cnJlbnRUYWJQcm9wcyA9IHtcbiAgICAgIGtleSxcbiAgICAgIGNvbm5lY3Rpb246IHRoaXMuY29udHJvbGxlcltrZXldLFxuICAgICAgZWxlbWVudCxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUVsZW1lbnQoZWxlbWVudDogV2lkZ2V0VHlwZTxDPltcIkVsZW1lbnRcIl0pIHtcbiAgICBpZiAoZWxlbWVudC5jdXJyZW50KSB0aGlzLnVwZGF0ZVRhYlByb3BzKGVsZW1lbnQuY3VycmVudCk7XG4gIH1cblxuICBhc3luYyBzd2l0Y2hUbzxLIGV4dGVuZHMgc3RyaW5nICYga2V5b2YgV2lkZ2V0VHlwZTxDPltcIlRhYk1hcFwiXT4oa2V5OiBLKSB7XG4gICAgdGhpcy51cGRhdGVUYWJQcm9wcyh7XG4gICAgICBrZXksXG4gICAgICBlbGVtZW50OiBhd2FpdCB0aGlzLnByb3BzLmNvbm5lY3Rpb24uZ2V0VGFiKGtleSksXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJWaWV3KCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW4odGhpcyk7XG4gIH1cbn1cbiIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHR0aHJvdyBlO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gKCkgPT4gW107XG53ZWJwYWNrRW1wdHlDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xud2VicGFja0VtcHR5Q29udGV4dC5pZCA9IFwiLi9zcmMvbG9nZ2luZyBzeW5jIHJlY3Vyc2l2ZVwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0OyJdLCJzb3VyY2VSb290IjoiIn0=