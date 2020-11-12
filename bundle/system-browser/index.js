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
        minWidth: 200,
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
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuiNestedMenu__WEBPACK_IMPORTED_MODULE_3__.MuiNestedMenu, { root: true, children: menu })))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: classes.container }, children)));
}


/***/ }),

/***/ "./src/browser/mui/MuiNestedMenu.tsx":
/*!*******************************************!*\
  !*** ./src/browser/mui/MuiNestedMenu.tsx ***!
  \*******************************************/
/*! namespace exports */
/*! export MuiNestedMenu [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuiNestedMenu": () => /* binding */ MuiNestedMenu
/* harmony export */ });
/* harmony import */ var _material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Collapse */ "./node_modules/@material-ui/core/esm/Collapse/Collapse.js");
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/List */ "./node_modules/@material-ui/core/esm/List/List.js");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/ListItem */ "./node_modules/@material-ui/core/esm/ListItem/ListItem.js");
/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/ListItemIcon */ "./node_modules/@material-ui/core/esm/ListItemIcon/ListItemIcon.js");
/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/ListItemText */ "./node_modules/@material-ui/core/esm/ListItemText/ListItemText.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_object_hasKeys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/object/hasKeys */ "./src/common/object/hasKeys.ts");
/* harmony import */ var _common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/object/mapObjectToArray */ "./src/common/object/mapObjectToArray.ts");
/* harmony import */ var _components_MuiIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/MuiIcon */ "./src/browser/mui/components/MuiIcon.tsx");
;









function MuiNestedMenu(props) {
    const { root: isRoot } = props;
    console.log({ props });
    const [isOpen, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(isRoot);
    const childMenus = (0,_common_object_mapObjectToArray__WEBPACK_IMPORTED_MODULE_2__.mapObjectToArray)(props.children || {}, (childProps, key) => {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(MuiNestedMenu, Object.assign({ key: key }, childProps, { root: false, title: childProps.title || key })));
    });
    const hasChildren = (0,_common_object_hasKeys__WEBPACK_IMPORTED_MODULE_1__.hasKeys)(props.children);
    const hasIndex = hasChildren && !!props.onClick;
    const itemIcon = props.icon && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_4__.default, null, (0,_components_MuiIcon__WEBPACK_IMPORTED_MODULE_3__.MuiIcon)(props.icon)));
    let element = (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, isRoot ? (childMenus) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__.default, { button: true, onClick: () => {
                if ((0,_common_object_hasKeys__WEBPACK_IMPORTED_MODULE_1__.hasKeys)(props.children)) {
                    setOpen(!isOpen);
                }
            } },
            hasIndex ? false : itemIcon,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_6__.default, null, props.title)),
        isOpen && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_7__.default, { in: true },
            hasIndex && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__.default, null, itemIcon),
            childMenus))))));
    if (isRoot) {
        element = react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_8__.default, null, element);
    }
    return element;
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

/***/ "./src/common/flatToSeq.ts":
/*!*********************************!*\
  !*** ./src/common/flatToSeq.ts ***!
  \*********************************/
/*! namespace exports */
/*! export flatToSeq [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "flatToSeq": () => /* binding */ flatToSeq
/* harmony export */ });
/* harmony import */ var _immutable2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../immutable2 */ "./src/immutable2.ts");
;
function flatToSeq(first, getNext) {
    return (0,_immutable2__WEBPACK_IMPORTED_MODULE_0__.IndexedSeq)([first]).flatMap(function* (value) {
        while (value != null) {
            yield value;
            value = getNext(value);
        }
    });
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
    template.tokenNode = token;
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

/***/ "./src/logging/index.ts":
/*!******************************!*\
  !*** ./src/logging/index.ts ***!
  \******************************/
/*! namespace exports */
/*! export createLogger [provided] [no usage info] [missing usage info prevents renaming] */
/*! export inspect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export logDebug [provided] [no usage info] [missing usage info prevents renaming] */
/*! export logError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export logInfo [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inspect": () => /* binding */ inspect,
/* harmony export */   "createLogger": () => /* binding */ createLogger,
/* harmony export */   "logDebug": () => /* binding */ logDebug,
/* harmony export */   "logInfo": () => /* binding */ logInfo,
/* harmony export */   "logError": () => /* binding */ logError
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
function createLogger(level) {
    return function (callback) {
        callback((strings, ...args) => {
            let text = "";
            for (const [index, string] of strings.entries()) {
                text += string;
                if (index in args) {
                    text += inspect(args[index]);
                }
            }
            console[level](text);
        });
    };
}
const logDebug = createLogger("debug");
const logInfo = createLogger("info");
const logError = createLogger("error");


/***/ }),

/***/ "./src/react/ActionManager.ts":
/*!************************************!*\
  !*** ./src/react/ActionManager.ts ***!
  \************************************/
/*! namespace exports */
/*! export ActionManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! export useActionManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionManager": () => /* binding */ ActionManager,
/* harmony export */   "useActionManager": () => /* binding */ useActionManager
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_map_touchMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/map/touchMap */ "./src/common/map/touchMap.ts");
;

class ActionManager {
    constructor() {
        this.actionMap = new Map();
        this.actionListenerMap = new Map();
    }
    emit(action) {
        if (this.actionMap.get(action.constructor) !== action) {
            this.actionMap.set(action.constructor, action);
            const listeners = this.actionListenerMap.get(action.constructor);
            listeners === null || listeners === void 0 ? void 0 : listeners.forEach(callback => {
                callback(action);
            });
        }
    }
    listen(actionType, callback) {
        const listeners = (0,_common_map_touchMap__WEBPACK_IMPORTED_MODULE_1__.touchMap)(this.actionListenerMap, actionType, () => new Set());
        return () => {
            listeners.delete(callback);
            if (!listeners.size) {
                this.actionListenerMap.delete(actionType);
            }
        };
    }
}
const context = react__WEBPACK_IMPORTED_MODULE_0__.createContext(new ActionManager());
const useActionManager = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(context);


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

/***/ "./src/react/renderer.ts":
/*!*******************************!*\
  !*** ./src/react/renderer.ts ***!
  \*******************************/
/*! namespace exports */
/*! export Renderer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export renderer [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderer": () => /* binding */ renderer,
/* harmony export */   "Renderer": () => /* binding */ Renderer
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
;
function renderer(component, defaultProps) {
    return props => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(component, !defaultProps ? props : Object.assign(Object.assign({}, defaultProps), props));
}
function Renderer(Component) {
    return props => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, props);
}


/***/ }),

/***/ "./src/react/useEmitted.ts":
/*!*********************************!*\
  !*** ./src/react/useEmitted.ts ***!
  \*********************************/
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
/* harmony import */ var _ActionManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionManager */ "./src/react/ActionManager.ts");
;

function useEmitted(actionType, callback) {
    const am = (0,_ActionManager__WEBPACK_IMPORTED_MODULE_1__.useActionManager)();
    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => am.actionMap.get(actionType));
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => am.listen(actionType, action => {
        if (action != state) {
            setState(action);
            callback === null || callback === void 0 ? void 0 : callback(action);
        }
    }), [am]);
    return state;
}


/***/ }),

/***/ "./src/react/useEmitter.ts":
/*!*********************************!*\
  !*** ./src/react/useEmitter.ts ***!
  \*********************************/
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
/* harmony import */ var _ActionManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionManager */ "./src/react/ActionManager.ts");
;
function useEmitter() {
    const am = (0,_ActionManager__WEBPACK_IMPORTED_MODULE_0__.useActionManager)();
    return action => {
        am.emit(action);
    };
}


/***/ }),

/***/ "./src/react/useLoader.ts":
/*!********************************!*\
  !*** ./src/react/useLoader.ts ***!
  \********************************/
/*! namespace exports */
/*! export useLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useLoader": () => /* binding */ useLoader
/* harmony export */ });
/* harmony import */ var react_async_hook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-async-hook */ "./node_modules/react-async-hook/dist/index.js");
;
function useLoader(callback, deps = []) {
    const result = (0,react_async_hook__WEBPACK_IMPORTED_MODULE_0__.useAsync)(async () => await callback(), deps);
    switch (result.status) {
        case "error":
            throw result.error;
        case "success":
            return result.result;
    }
}


/***/ }),

/***/ "./src/react/utils/ContextOrType.ts":
/*!******************************************!*\
  !*** ./src/react/utils/ContextOrType.ts ***!
  \******************************************/
/*! namespace exports */
/*! export ContextOrType [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContextOrType": () => /* binding */ ContextOrType
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_map_touchMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/map/touchMap */ "./src/common/map/touchMap.ts");
;

const contexts = new WeakMap();
function ContextOrType(contextOrType) {
    if (typeof contextOrType === "function")
        return (0,_common_map_touchMap__WEBPACK_IMPORTED_MODULE_1__.touchMap)(contexts, contextOrType, () => {
            const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);
            context.displayName = contextOrType.name;
            return context;
        });
    return contextOrType;
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

/***/ "./src/react/utils/hooks/useDefinedContext.ts":
/*!****************************************************!*\
  !*** ./src/react/utils/hooks/useDefinedContext.ts ***!
  \****************************************************/
/*! namespace exports */
/*! export useDefinedContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useDefinedContext": () => /* binding */ useDefinedContext
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_object_defined__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/object/defined */ "./src/common/object/defined.ts");
/* harmony import */ var _ContextOrType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ContextOrType */ "./src/react/utils/ContextOrType.ts");
;


function useDefinedContext(context) {
    return (0,_common_object_defined__WEBPACK_IMPORTED_MODULE_1__.defined)((0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)((0,_ContextOrType__WEBPACK_IMPORTED_MODULE_2__.ContextOrType)(context)), () => `No defined context ${(0,_ContextOrType__WEBPACK_IMPORTED_MODULE_2__.ContextOrType)(context).displayName}`);
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

/***/ "./src/system/browser/LoginInfo.ts":
/*!*****************************************!*\
  !*** ./src/system/browser/LoginInfo.ts ***!
  \*****************************************/
/*! namespace exports */
/*! export LoginInfo [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginInfo": () => /* binding */ LoginInfo
/* harmony export */ });
class LoginInfo {
    constructor(payload) {
        this.payload = payload;
    }
    get isSuccess() {
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
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! history */ "./node_modules/history/esm/history.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _browser_mui_createMuiSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../browser/mui/createMuiSystem */ "./src/browser/mui/createMuiSystem.ts");
/* harmony import */ var _browser_mui_MuiAdmin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../browser/mui/MuiAdmin */ "./src/browser/mui/MuiAdmin.tsx");
/* harmony import */ var _react_useEmitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../react/useEmitter */ "./src/react/useEmitter.ts");
/* harmony import */ var _typerouter_ReactRouterContentView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../typerouter/ReactRouterContentView */ "./src/typerouter/ReactRouterContentView.ts");
/* harmony import */ var _typerouter_ReactRouterView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../typerouter/ReactRouterView */ "./src/typerouter/ReactRouterView.ts");
/* harmony import */ var _common_SystemApp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/SystemApp */ "./src/system/common/SystemApp.ts");
/* harmony import */ var _admin_SystemAdminRouter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./admin/SystemAdminRouter */ "./src/system/browser/admin/SystemAdminRouter.tsx");
/* harmony import */ var _LoginInfo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LoginInfo */ "./src/system/browser/LoginInfo.ts");
/* harmony import */ var _SystemRouter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SystemRouter */ "./src/system/browser/SystemRouter.ts");
;










const { Provider: MuiSystemProvider } = (0,_browser_mui_createMuiSystem__WEBPACK_IMPORTED_MODULE_1__.createMuiSystem)();
const history = (0,history__WEBPACK_IMPORTED_MODULE_10__.createBrowserHistory)();
const currentLoginInfo = _common_SystemApp__WEBPACK_IMPORTED_MODULE_6__.SystemApp.service.getLoginInfo();
const plugins = [
    _SystemRouter__WEBPACK_IMPORTED_MODULE_9__.SystemRouter.at("admin").plugin((r, c) => {
        (0,_admin_SystemAdminRouter__WEBPACK_IMPORTED_MODULE_7__.AdminRouterPlugin)(r, c);
    }),
];
function MuiSystemView() {
    const emit = (0,_react_useEmitter__WEBPACK_IMPORTED_MODULE_3__.useEmitter)();
    // emit(LoginInfo, {})
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        currentLoginInfo.then(loginInfo => {
            emit(new _LoginInfo__WEBPACK_IMPORTED_MODULE_8__.LoginInfo(loginInfo));
        });
    }, []);
    void (react__WEBPACK_IMPORTED_MODULE_0__.createElement(MuiSystemProvider, null,
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerouter_ReactRouterView__WEBPACK_IMPORTED_MODULE_5__.ReactRouterView, { history: history, router: _SystemRouter__WEBPACK_IMPORTED_MODULE_9__.SystemRouter, plugins: plugins },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_typerouter_ReactRouterContentView__WEBPACK_IMPORTED_MODULE_4__.ReactRouterContentView, null))));
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_browser_mui_MuiAdmin__WEBPACK_IMPORTED_MODULE_2__.MuiAdmin, { menu: {
            test: {
                title: "TestTitle",
                icon: __webpack_require__(/*! @material-ui/icons/Add */ "./node_modules/@material-ui/icons/Add.js"),
                children: {
                    foo: {
                        children: {
                            hello: {},
                            world: {},
                        },
                    },
                    bar: {},
                },
            },
        } }));
}
/*

SystemPlugin({


})
 */


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
/* harmony import */ var _typerouter_ReactRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../typerouter/ReactRouter */ "./src/typerouter/ReactRouter.ts");
/* harmony import */ var _typerouter_Router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../typerouter/Router */ "./src/typerouter/Router.ts");
/* harmony import */ var _admin_AdminRouter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin/AdminRouter */ "./src/system/browser/admin/AdminRouter.ts");
;


const SystemRouter = (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_1__.Router)().use(_typerouter_ReactRouter__WEBPACK_IMPORTED_MODULE_0__.ReactRouter).route({
    admin: _admin_AdminRouter__WEBPACK_IMPORTED_MODULE_2__.AdminRouter,
    login: (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_1__.Router)(),
});


/***/ }),

/***/ "./src/system/browser/admin/AdminRouter.ts":
/*!*************************************************!*\
  !*** ./src/system/browser/admin/AdminRouter.ts ***!
  \*************************************************/
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
/* harmony import */ var _typerouter_ReactRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../typerouter/ReactRouter */ "./src/typerouter/ReactRouter.ts");
/* harmony import */ var _typerouter_Router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../typerouter/Router */ "./src/typerouter/Router.ts");
/* harmony import */ var _typerpc_data_manager_DataManagerRouter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../typerpc/data-manager/DataManagerRouter */ "./src/typerpc/data-manager/DataManagerRouter.ts");
/* harmony import */ var _server_acl_AclUsersManaager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../server/acl/AclUsersManaager */ "./src/system/server/acl/AclUsersManaager.ts");
;



const AdminRouter = (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_1__.Router)()
    .use(_typerouter_ReactRouter__WEBPACK_IMPORTED_MODULE_0__.ReactRouter)
    .route({
    acl: (0,_typerpc_data_manager_DataManagerRouter__WEBPACK_IMPORTED_MODULE_2__.DataManagerRouter)(_server_acl_AclUsersManaager__WEBPACK_IMPORTED_MODULE_3__.AclUsersManager),
});


/***/ }),

/***/ "./src/system/browser/admin/SystemAdminRouter.tsx":
/*!********************************************************!*\
  !*** ./src/system/browser/admin/SystemAdminRouter.tsx ***!
  \********************************************************/
/*! namespace exports */
/*! export AdminRouterPlugin [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminRouterPlugin": () => /* binding */ AdminRouterPlugin
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lang_Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lang/Lang */ "./src/lang/Lang.ts");
/* harmony import */ var _react_useEmitted__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../react/useEmitted */ "./src/react/useEmitted.ts");
/* harmony import */ var _LoginInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../LoginInfo */ "./src/system/browser/LoginInfo.ts");
/* harmony import */ var _AdminRouter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AdminRouter */ "./src/system/browser/admin/AdminRouter.ts");
;




const AdminRouterPlugin = _AdminRouter__WEBPACK_IMPORTED_MODULE_4__.AdminRouter.plugin(r => {
    r.wrap(props => {
        const loginInfo = (0,_react_useEmitted__WEBPACK_IMPORTED_MODULE_2__.useEmitted)(_LoginInfo__WEBPACK_IMPORTED_MODULE_3__.LoginInfo);
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
    });
    r.render(() => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "hello"));
});


/***/ }),

/***/ "./src/system/browser/index.ts":
/*!*************************************!*\
  !*** ./src/system/browser/index.ts ***!
  \*************************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _typerpc_Rpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../typerpc/Rpc */ "./src/typerpc/Rpc.ts");
/* harmony import */ var _common_SystemApp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/SystemApp */ "./src/system/common/SystemApp.ts");
/* harmony import */ var _MuiSystemView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MuiSystemView */ "./src/system/browser/MuiSystemView.tsx");
;




(0,_typerpc_Rpc__WEBPACK_IMPORTED_MODULE_2__.handleRpcService)(_common_SystemApp__WEBPACK_IMPORTED_MODULE_3__.SystemApp, payload => {
    return fetch("/service", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }).then(res => res.json());
});
_common_SystemApp__WEBPACK_IMPORTED_MODULE_3__.SystemApp.service.getLoginInfo().then(loginInfo => {
    console.log({ loginInfo });
});
window.addEventListener("DOMContentLoaded", () => {
    react_dom__WEBPACK_IMPORTED_MODULE_1__.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_MuiSystemView__WEBPACK_IMPORTED_MODULE_4__.MuiSystemView), //
    document.getElementById("system"));
});


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

/***/ "./src/system/server/acl/AclUsersManaager.ts":
/*!***************************************************!*\
  !*** ./src/system/server/acl/AclUsersManaager.ts ***!
  \***************************************************/
/*! namespace exports */
/*! export AclUsersManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UserContactInfoInput [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserContactInfoInput": () => /* binding */ UserContactInfoInput,
/* harmony export */   "AclUsersManager": () => /* binding */ AclUsersManager
/* harmony export */ });
/* harmony import */ var _typerpc_data_manager_DataManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../typerpc/data-manager/DataManager */ "./src/typerpc/data-manager/DataManager.ts");
/* harmony import */ var _typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../typerpc/input/input-map/InputMap */ "./src/typerpc/input/input-map/InputMap.ts");
/* harmony import */ var _typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../typerpc/input/InputErrorHook */ "./src/typerpc/input/InputErrorHook.ts");
/* harmony import */ var _typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../typerpc/input/text-input/TextInput */ "./src/typerpc/input/text-input/TextInput.ts");
/* harmony import */ var _typerpc_RpcPartialConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../typerpc/RpcPartialConfig */ "./src/typerpc/RpcPartialConfig.ts");
;




const NameInput = (0,_typerpc_RpcPartialConfig__WEBPACK_IMPORTED_MODULE_4__.RpcPartialConfig)((0,_typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_3__.TextInput)(), {
    minLength: 2,
    maxLength: 20,
    required: true,
});
const UserBasicInfoInput = (0,_typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_1__.InputMap)({
    firstName: NameInput,
    lastName: NameInput,
    loginName: (0,_typerpc_input_InputErrorHook__WEBPACK_IMPORTED_MODULE_2__.InputErrorHook)()((0,_typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_3__.TextInput)()),
});
const UserContactInfoInput = (0,_typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_1__.InputMap)({
    phoneNumber: (0,_typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_3__.TextInput)(),
    email: (0,_typerpc_input_text_input_TextInput__WEBPACK_IMPORTED_MODULE_3__.TextInput)(),
});
const AclUsersManager = (0,_typerpc_data_manager_DataManager__WEBPACK_IMPORTED_MODULE_0__.DataManager)({
    addInput: UserBasicInfoInput,
    editInput: (0,_typerpc_input_input_map_InputMap__WEBPACK_IMPORTED_MODULE_1__.InputMap)({
        baseInfo: UserBasicInfoInput,
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


/***/ }),

/***/ "./src/typerouter/ReactRouter.ts":
/*!***************************************!*\
  !*** ./src/typerouter/ReactRouter.ts ***!
  \***************************************/
/*! namespace exports */
/*! export ReactRouter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getReactRouterProps [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getReactRouterProps": () => /* binding */ getReactRouterProps,
/* harmony export */   "ReactRouter": () => /* binding */ ReactRouter
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _react_useLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../react/useLoader */ "./src/react/useLoader.ts");
/* harmony import */ var _common_map_mapFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/map/mapFactory */ "./src/common/map/mapFactory.ts");
/* harmony import */ var _common_flatToSeq__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/flatToSeq */ "./src/common/flatToSeq.ts");
/* harmony import */ var _react_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../react/renderer */ "./src/react/renderer.ts");
/* harmony import */ var _react_utils_EmptyFragment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../react/utils/EmptyFragment */ "./src/react/utils/EmptyFragment.ts");
;





const getReactRouterProps = (0,_common_map_mapFactory__WEBPACK_IMPORTED_MODULE_2__.WeakMapFactory)(() => ({
    wrappers: [],
}));
var ReactRouter;
(function (ReactRouter) {
    Object.defineProperty(ReactRouter, "reactProps", {
        get() {
            return getReactRouterProps(this);
        },
    });
    function wrap(wrapper) {
        this.reactProps.wrappers.push(wrapper);
        return this;
    }
    ReactRouter.wrap = wrap;
    function renderDefault(renderer) {
        this.reactProps.defaultRenderer = renderer;
        return this;
    }
    ReactRouter.renderDefault = renderDefault;
    function render(component) {
        this.reactProps.renderer = (0,_react_renderer__WEBPACK_IMPORTED_MODULE_4__.Renderer)(component);
        return this;
    }
    ReactRouter.render = render;
    function renderOnLoad(renderer) {
        this.reactProps.loadRenderer = renderer;
        return this;
    }
    ReactRouter.renderOnLoad = renderOnLoad;
    function loadAndRender(loadRenderer) {
        return this.render(props => {
            const component = (0,_react_useLoader__WEBPACK_IMPORTED_MODULE_1__.useLoader)(() => loadRenderer(props), [props.location]);
            if (component)
                return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(component);
            const renderOnLoad = (0,_common_flatToSeq__WEBPACK_IMPORTED_MODULE_3__.flatToSeq)(this, router => router.parent)
                .map(router => router === null || router === void 0 ? void 0 : router.reactProps.loadRenderer)
                .find(renderer => !!renderer);
            if (renderOnLoad)
                return renderOnLoad(props);
            return _react_utils_EmptyFragment__WEBPACK_IMPORTED_MODULE_5__.EmptyFragment;
        });
    }
    ReactRouter.loadAndRender = loadAndRender;
})(ReactRouter || (ReactRouter = {}));


/***/ }),

/***/ "./src/typerouter/ReactRouterContentView.ts":
/*!**************************************************!*\
  !*** ./src/typerouter/ReactRouterContentView.ts ***!
  \**************************************************/
/*! namespace exports */
/*! export ReactRouterContentView [provided] [no usage info] [missing usage info prevents renaming] */
/*! export renderReactRouterContainer [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactRouterContentView": () => /* binding */ ReactRouterContentView,
/* harmony export */   "renderReactRouterContainer": () => /* binding */ renderReactRouterContainer
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_flatToSeq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/flatToSeq */ "./src/common/flatToSeq.ts");
/* harmony import */ var _react_utils_EmptyFragment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../react/utils/EmptyFragment */ "./src/react/utils/EmptyFragment.ts");
/* harmony import */ var _react_utils_hooks_useDefinedContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../react/utils/hooks/useDefinedContext */ "./src/react/utils/hooks/useDefinedContext.ts");
/* harmony import */ var _ReactRouter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReactRouter */ "./src/typerouter/ReactRouter.ts");
/* harmony import */ var _ReactRouterLocation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ReactRouterLocation */ "./src/typerouter/ReactRouterLocation.ts");
;





function ReactRouterContentView() {
    return renderReactRouterContainer((0,_react_utils_hooks_useDefinedContext__WEBPACK_IMPORTED_MODULE_3__.useDefinedContext)(_ReactRouterLocation__WEBPACK_IMPORTED_MODULE_5__.ReactRouterContext));
}
function renderReactRouterContainer(routeProps) {
    const routerProps = (0,_ReactRouter__WEBPACK_IMPORTED_MODULE_4__.getReactRouterProps)(routeProps.location.router);
    let children;
    if (routerProps.renderer) {
        children = routerProps.renderer(routeProps);
    }
    else {
        const defaultRenderer = (0,_common_flatToSeq__WEBPACK_IMPORTED_MODULE_1__.flatToSeq)(routeProps.location, location => location.parent)
            .map(location => location.router.reactProps.defaultRenderer)
            .find(defaultRenderer => !!defaultRenderer);
        if (defaultRenderer) {
            children = defaultRenderer(routeProps);
        }
        else {
            children = _react_utils_EmptyFragment__WEBPACK_IMPORTED_MODULE_2__.EmptyFragment;
        }
    }
    for (let location = routeProps.location; location; location = location.parent) {
        const props = (0,_ReactRouter__WEBPACK_IMPORTED_MODULE_4__.getReactRouterProps)(location.router);
        const wrapperProps = {
            location: location,
            route: routeProps,
            children,
        };
        for (const wrapper of props.wrappers) {
            children = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(wrapper, wrapperProps);
        }
    }
    return children;
}
// OuterWrappers
// InnerWrappers


/***/ }),

/***/ "./src/typerouter/ReactRouterError.ts":
/*!********************************************!*\
  !*** ./src/typerouter/ReactRouterError.ts ***!
  \********************************************/
/*! namespace exports */
/*! export ReactRouterError [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactRouterError": () => /* binding */ ReactRouterError
/* harmony export */ });
class ReactRouterError extends Error {
}


/***/ }),

/***/ "./src/typerouter/ReactRouterLocation.ts":
/*!***********************************************!*\
  !*** ./src/typerouter/ReactRouterLocation.ts ***!
  \***********************************************/
/*! namespace exports */
/*! export ReactRouterContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ReactRouterLocation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export useReactRouterContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactRouterLocation": () => /* binding */ ReactRouterLocation,
/* harmony export */   "ReactRouterContext": () => /* binding */ ReactRouterContext,
/* harmony export */   "useReactRouterContext": () => /* binding */ useReactRouterContext
/* harmony export */ });
/* harmony import */ var _joinUrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./joinUrl */ "./src/typerouter/joinUrl.ts");
/* harmony import */ var _common_patterns_lazy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/patterns/lazy */ "./src/common/patterns/lazy.ts");
/* harmony import */ var _react_utils_hooks_createUndefinedContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../react/utils/hooks/createUndefinedContext */ "./src/react/utils/hooks/createUndefinedContext.ts");
/* harmony import */ var _react_utils_hooks_useDefinedContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../react/utils/hooks/useDefinedContext */ "./src/react/utils/hooks/useDefinedContext.ts");
/* harmony import */ var _common_getNextPath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/getNextPath */ "./src/common/getNextPath.ts");
/* harmony import */ var _ReactRouterError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ReactRouterError */ "./src/typerouter/ReactRouterError.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






class ReactRouterLocation {
    constructor(_parent, name, history, router, params) {
        this._parent = _parent;
        this.name = name;
        this.history = history;
        this.router = router;
        this.params = params;
    }
    get parent() {
        return this._parent;
    }
    get root() {
        var _a;
        return ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.root) || this;
    }
    // stack: { [K in keyof T['stack']]: Router<T['stack'][K]> }
    atStack(name) {
        if (this.name === name)
            return this;
        if (!this._parent)
            throw new _ReactRouterError__WEBPACK_IMPORTED_MODULE_5__.ReactRouterError(`No ${name} at router stack.`);
        return this._parent.atStack(name);
    }
    get path() {
        var _a;
        let path;
        if (this.name) {
            if (this._parent) {
                path = (0,_joinUrl__WEBPACK_IMPORTED_MODULE_0__.joinUrl)(this._parent.path, this.name);
            }
            else {
                path = "/" + this.name;
            }
        }
        else {
            path = ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.path) || "/";
        }
        for (let name of this.router.params) {
            path = (0,_joinUrl__WEBPACK_IMPORTED_MODULE_0__.joinUrl)(path, String(this.params[name]));
        }
        return path;
    }
    at(name, ...[params]) {
        return new ReactRouterLocation(this, name, this.history, this.router.at(name), params || {});
    }
    push() {
        this.history.push(this.path);
    }
    route(path) {
        const rootPath = path;
        let location = this;
        while (true) {
            const nextPath = path;
            let name;
            [name, path] = (0,_common_getNextPath__WEBPACK_IMPORTED_MODULE_4__.getNextPath)(path);
            if (!name) {
                return { type: "index", location, rootPath };
            }
            if (!(name in location.router.children)) {
                return { type: "default", location, rootPath, nextPath };
            }
            const router = location.router.at(name);
            let params = {};
            for (const name of router.params) {
                let value;
                [value, path] = (0,_common_getNextPath__WEBPACK_IMPORTED_MODULE_4__.getNextPath)(path);
                if (!value) {
                    return { type: "param", name, location, rootPath };
                }
                params[name] = value;
            }
            location = new ReactRouterLocation(location, name, location.history, router, params);
        }
    }
}
__decorate([
    (0,_common_patterns_lazy__WEBPACK_IMPORTED_MODULE_1__.Lazy)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], ReactRouterLocation.prototype, "path", null);
const ReactRouterContext = (0,_react_utils_hooks_createUndefinedContext__WEBPACK_IMPORTED_MODULE_2__.createUndefinedContext)();
function useReactRouterContext() {
    return (0,_react_utils_hooks_useDefinedContext__WEBPACK_IMPORTED_MODULE_3__.useDefinedContext)(ReactRouterContext);
}


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
/* harmony import */ var _ReactRouterLocation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactRouterLocation */ "./src/typerouter/ReactRouterLocation.ts");
;

function ReactRouterView(props) {
    const { plugins, router: unboundRouter, context, history } = props;
    const router = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        if (!plugins)
            return unboundRouter;
        return unboundRouter.bind(context || {}, plugins);
    }, [unboundRouter, plugins]);
    const [route, setRoute] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => getRouteFromPath(history.location.pathname));
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (route.location.router !== router) {
            setRoute(getRouteFromPath(history.location.pathname));
        }
    }, [router]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => history.listen(location => {
        setRoute(getRouteFromPath(location.pathname));
    }), [history, router]);
    let children = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ReactRouterLocation__WEBPACK_IMPORTED_MODULE_1__.ReactRouterContext.Provider, {
        value: route,
        children: props.children,
    });
    return children;
    function getRouteFromPath(path) {
        return new _ReactRouterLocation__WEBPACK_IMPORTED_MODULE_1__.ReactRouterLocation(null, null, history, router, {}).route(path);
    }
}


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
/* harmony import */ var _common_object_defined__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/object/defined */ "./src/common/object/defined.ts");
/* harmony import */ var _logging__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logging */ "./src/logging/index.ts");
;

function Router(...args) {
    let params;
    let children;
    if (args.length === 2) {
        [params, children] = args;
    }
    else if (args.length === 1) {
        if (Array.isArray(args[0])) {
            [params, children] = [args[0], {}];
        }
        else {
            [params, children] = [[], args[0]];
        }
    }
    else {
        [params, children] = [[], {}];
    }
    const routerType = Object.create(RouterType);
    return Object.setPrototypeOf({
        children,
        params,
        routerType,
        plugins: [],
    }, routerType);
}
var RouterType;
(function (RouterType) {
    function route(children) {
        Object.assign(this.children, children);
        return this;
    }
    RouterType.route = route;
    function use(type) {
        Object.defineProperties(this.routerType, Object.getOwnPropertyDescriptors(type));
        return this;
    }
    RouterType.use = use;
    function at(name, callback) {
        let child = (0,_common_object_defined__WEBPACK_IMPORTED_MODULE_0__.defined)(this.children[name], () => `No router child at "${name}".`);
        if (child.parent !== this) {
            child = this.children[name] = Router(child.params, child.children)
                .use(child.routerType)
                .use(this.routerType);
            child.parent = this;
            child.name = name;
        }
        callback === null || callback === void 0 ? void 0 : callback(child);
        return child;
    }
    RouterType.at = at;
    function param(name) {
        this.params.push(name);
        return this;
    }
    RouterType.param = param;
    function bind(context, plugins) {
        const router = (Router(this.params, this.children).use(this.routerType));
        this.plugins.forEach(plugin => {
            plugin(router, context);
        });
        plugins.forEach(plugin => {
            plugin(router, context);
        });
        return router;
    }
    RouterType.bind = bind;
    function apply(plugins) {
        this.plugins.push(...plugins);
        return this;
    }
    RouterType.apply = apply;
    function plugin(callback) {
        if (this.parent) {
            return this.parent.plugin((router, context) => {
                callback(router.at(this.name), context);
            });
        }
        return callback;
    }
    RouterType.plugin = plugin;
    function context() {
        return () => this;
    }
    RouterType.context = context;
    function toString(children) {
        return `Router(${(0,_logging__WEBPACK_IMPORTED_MODULE_1__.inspect)(this.params)},${(0,_logging__WEBPACK_IMPORTED_MODULE_1__.inspect)(this.children)})`;
    }
    RouterType.toString = toString;
})(RouterType || (RouterType = {}));
Router.prototype = RouterType;


/***/ }),

/***/ "./src/typerouter/joinUrl.ts":
/*!***********************************!*\
  !*** ./src/typerouter/joinUrl.ts ***!
  \***********************************/
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
/* harmony import */ var _logging__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logging */ "./src/logging/index.ts");
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
                throw new TypeError(`expected to generic config, got: ${(0,_logging__WEBPACK_IMPORTED_MODULE_2__.inspect)(config)}`);
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
            dataManager: {
                editInput,
                editTabs,
            },
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
const DataManagerHandler = ({ config, props: { dataManager: { editInput }, }, }) => $ => {
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
/* harmony import */ var _typerouter_Router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../typerouter/Router */ "./src/typerouter/Router.ts");
;

function DataManagerRouter(dm) {
    return (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_1__.Router)({
        add: (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_1__.Router)(),
        edit: (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_1__.Router)(["id"], (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__.mapObject)(dm.dataManager.editTabs, () => (0,_typerouter_Router__WEBPACK_IMPORTED_MODULE_1__.Router)())),
    });
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
/*! export InputErrorHookView [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InputErrorHookViewProps [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputErrorHook": () => /* binding */ InputErrorHook,
/* harmony export */   "InputErrorHookViewProps": () => /* binding */ InputErrorHookViewProps,
/* harmony export */   "InputErrorHookView": () => /* binding */ InputErrorHookView
/* harmony export */ });
/* harmony import */ var _AbstractInputView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractInputView */ "./src/typerpc/input/AbstractInputView.tsx");
;
function InputErrorHook() {
    return (input) => {
        return input;
    };
}
function InputErrorHookViewProps(props) {
    return props;
}
class InputErrorHookView extends _AbstractInputView__WEBPACK_IMPORTED_MODULE_0__.AbstractInputView {
    inputWillValidate() {
        var _a;
        return (_a = this.target) === null || _a === void 0 ? void 0 : _a.validate();
    }
    updateError(error) {
        var _a;
        if (!this.errorElement) {
            (_a = this.target) === null || _a === void 0 ? void 0 : _a.setError(error);
        }
    }
    renderView() {
        const { connection, element } = this.props;
        return this.props.children({
            connection,
            element,
            inputRef: target => {
                this.target = target;
            },
            value: this.value,
        }, this.errorElement);
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
            return (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_0__.mapObject)(this.targetMap, (target, key) => target.createRpcConnection(payload => handler([key, payload])));
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
/* harmony import */ var _AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AbstractWidgetHandler */ "./src/typerpc/widget/AbstractWidgetHandler.ts");
/* harmony import */ var _common_object_entries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/object/entries */ "./src/common/object/entries.ts");
/* harmony import */ var _common_object_mapObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/object/mapObject */ "./src/common/object/mapObject.ts");
/* harmony import */ var _common_patterns_lazy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/patterns/lazy */ "./src/common/patterns/lazy.ts");
/* harmony import */ var _logging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../logging */ "./src/logging/index.ts");
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






class DataTableHandler extends _AbstractWidgetHandler__WEBPACK_IMPORTED_MODULE_0__.AbstractWidgetHandler {
    get columns() {
        return (0,_common_object_mapObject__WEBPACK_IMPORTED_MODULE_2__.mapObject)(this.config.columns || {}, (columnConfig, key) => {
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
                    throw new TypeError(`Unexpected ${(0,_logging__WEBPACK_IMPORTED_MODULE_4__.inspect)({ columnConfig })}`);
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
        for (const [key, column] of (0,_common_object_entries__WEBPACK_IMPORTED_MODULE_1__.entries)(this.columns)) {
            row[key] = await column.load(dataRow);
        }
        return row;
    }
    async getRows(query) {
        var _a, _b, _c, _d, _e;
        const orders = [];
        for (const [key, order] of (0,_common_object_entries__WEBPACK_IMPORTED_MODULE_1__.entries)(query.order)) {
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
    (0,_common_patterns_lazy__WEBPACK_IMPORTED_MODULE_3__.Lazy)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DataTableHandler.prototype, "columns", null);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9icm93c2VyL211aS9NdWlBZG1pbi50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvTXVpTmVzdGVkTWVudS50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY29tcG9uZW50cy9NdWlCdXR0b24udHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL2Jyb3dzZXIvbXVpL2NvbXBvbmVudHMvTXVpSWNvbi50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvYnJvd3Nlci9tdWkvY3JlYXRlTXVpU3lzdGVtLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9hc3NlcnQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL2ZsYXRUb1NlcS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vZ2V0TmV4dFBhdGgudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL21hcC9tYXBGYWN0b3J5LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9tYXAvdG91Y2hNYXAudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9kZWZpbmVkLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9vYmplY3QvZGVmaW5lZEF0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9vYmplY3QvZW50cmllcy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vb2JqZWN0L2hhc0tleXMudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL29iamVjdC9rZXlzLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0VG9BcnJheS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vb2JqZWN0L21lcmdlRGVzY3JpcHRvcnMudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3BhdHRlcm5zL2xhenkudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3N0cmluZy9jYXBpdGFsaXplLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9zdHJpbmcvZnJvbUNvbnN0YW50Q2FzZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL2pvaW5UZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL21hdGNoQ2FzZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9jb21tb24vc3RyaW5nL3NwbGl0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2NvbW1vbi9zdHJpbmcvdG9UaXRsZUNhc2UudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvY29tbW9uL3R5cGluZ3MudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvaW1tdXRhYmxlMi50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9sYW5nL0xhbmcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvbGFuZy9MYW5nVGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvbGFuZy9MYW5nVHJhbnNsYXRvci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9sYW5nL0xhbmdWaWV3LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL2xvZ2dpbmcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvQWN0aW9uTWFuYWdlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC9Ib29rUmVmLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3JlbmRlcmVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3VzZUVtaXR0ZWQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvdXNlRW1pdHRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC91c2VMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvdXRpbHMvQ29udGV4dE9yVHlwZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC91dGlscy9FbXB0eUZyYWdtZW50LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3V0aWxzL2hvb2tzL2NyZWF0ZVVuZGVmaW5lZENvbnRleHQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvdXRpbHMvaG9va3MvdXNlRGVmaW5lZENvbnRleHQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvcmVhY3QvdXRpbHMvcGFydGlhbFByb3BzLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3JlYWN0L3ZpZXcvVmlldy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC92aWV3L1ZpZXdTdGF0ZS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9yZWFjdC92aWV3L3NldFZpZXdTdGF0ZUtleS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vYnJvd3Nlci9Mb2dpbkluZm8udHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvTXVpU3lzdGVtVmlldy50c3giLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvc3lzdGVtL2Jyb3dzZXIvU3lzdGVtUm91dGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9icm93c2VyL2FkbWluL0FkbWluUm91dGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9icm93c2VyL2FkbWluL1N5c3RlbUFkbWluUm91dGVyLnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vYnJvd3Nlci9pbmRleC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vY29tbW9uL0FkbWluQXBwLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9jb21tb24vU3lzdGVtQXBwLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3N5c3RlbS9jb21tb24vVXNlckFwcC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9zeXN0ZW0vc2VydmVyL2FjbC9BY2xVc2Vyc01hbmFhZ2VyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVyb3V0ZXIvUmVhY3RSb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJvdXRlci9SZWFjdFJvdXRlckNvbnRlbnRWaWV3LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVyb3V0ZXIvUmVhY3RSb3V0ZXJFcnJvci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcm91dGVyL1JlYWN0Um91dGVyTG9jYXRpb24udHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJvdXRlci9SZWFjdFJvdXRlclZpZXcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJvdXRlci9Sb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJvdXRlci9qb2luVXJsLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvQ29uZmlnRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL0dlbmVyaWNDb25maWcudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9Ob1JwYy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL1JwYy50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL1JwY0NvbmZpZ0hvb2sudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9ScGNQYXJ0aWFsQ29uZmlnLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvZGF0YS1tYW5hZ2VyL0RhdGFNYW5hZ2VyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvZGF0YS1tYW5hZ2VyL0RhdGFNYW5hZ2VySGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2RhdGEtbWFuYWdlci9EYXRhTWFuYWdlclJvdXRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L0Fic3RyYWN0SW5wdXRIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvQWJzdHJhY3RJbnB1dFZpZXcudHN4Iiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9JbnB1dEVycm9ySG9vay50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L0xlbmd0aEVycm9yLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvVmFsdWVPckF3YWl0YWJsZUZuLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvZGF0YS1pbnB1dC9EYXRhSW5wdXQudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9kYXRhLWlucHV0L0RhdGFJbnB1dEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9pbnB1dC1tYXAvSW5wdXRNYXAudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9pbnB1dC9pbnB1dC1tYXAvSW5wdXRNYXBIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvbnVsbGFibGUtaW5wdXQvQWJzdHJhY3ROdWxsYWJsZUlucHV0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL2lucHV0L3RleHQtaW5wdXQvVGV4dElucHV0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvdGV4dC1pbnB1dC9UZXh0SW5wdXRIYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvaW5wdXQvdGV4dC1pbnB1dC9UZXh0SW5wdXRMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9ycGMtZm4vUnBjRm4udHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9ycGMtZm4vUnBjRm5IYW5kbGVyLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvcnBjLW1hcC9ScGNNYXAudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9ycGMtbWFwL1JwY01hcEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy9ycGMtcGFyYW1ldGVyL1JwY1BhcmFtZXRlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3JwYy1wYXJhbWV0ZXIvUnBjUGFyYW1ldGVySGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9BYnN0cmFjdFdpZGdldEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvQWJzdHJhY3RXaWRnZXRWaWV3LnRzeCIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9Sb3cudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvV2lkZ2V0LnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2RhdGEtdGFibGUvRGF0YVRhYmxlLnRzIiwid2VicGFjazovL2RhYnNpLy4vc3JjL3R5cGVycGMvd2lkZ2V0L2RhdGEtdGFibGUvRGF0YVRhYmxlSGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9mb3JtL0Zvcm0udHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvZm9ybS9Gb3JtSGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9pbmxpbmUtd2lkZ2V0L0lubGluZVdpZGdldC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC9pbmxpbmUtd2lkZ2V0L0lubGluZVdpZGdldEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZGFic2kvLi9zcmMvdHlwZXJwYy93aWRnZXQvdGFicy13aWRnZXQvVGFic1dpZGdldC50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy90eXBlcnBjL3dpZGdldC90YWJzLXdpZGdldC9UYWJzV2lkZ2V0SGFuZGxlci50cyIsIndlYnBhY2s6Ly9kYWJzaS8uL3NyYy9sb2dnaW5nfHN5bmMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUE4QztBQUNBO0FBQ1E7QUFDTjtBQUNNO0FBQ2Q7QUFDRDtBQUNZO0FBQ2lCO0FBRXBFLE1BQU0sU0FBUyxHQUFHLGlFQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLFNBQVMsRUFBRTtRQUNULFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUM1QjtJQUNELE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRSxHQUFHO0tBQ2Q7SUFDRCxJQUFJLEVBQUUsRUFBRTtJQUNSLEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxDQUFDO0tBQ1o7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsQ0FBQztTQUNWO0tBQ0Y7Q0FDRixDQUFDLENBQUMsQ0FBQztBQU9HLFNBQVMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBaUI7SUFDeEQsTUFBTSxPQUFPLEdBQUcsU0FBUyxFQUFFLENBQUM7SUFDNUIsTUFBTSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsR0FBRywrQ0FBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTdDLE9BQU8sQ0FDTCwwREFBSyxTQUFTLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDMUIsaURBQUMs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LENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVU7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcseURBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFekQsTUFBTSxPQUFPLEdBQ1gsQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDO1lBQ2xCLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVTtpQkFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNsQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0QsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7OztBQ2hDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBwQmFyIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9BcHBCYXJcIjtcbmltcG9ydCBEcmF3ZXIgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0RyYXdlclwiO1xuaW1wb3J0IHsgbWFrZVN0eWxlcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIjtcbmltcG9ydCBUb29sYmFyIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9Ub29sYmFyXCI7XG5pbXBvcnQgVHlwb2dyYXBoeSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeVwiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBMYW5nIH0gZnJvbSBcIi4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgTXVpQnV0dG9uIH0gZnJvbSBcIi4vY29tcG9uZW50cy9NdWlCdXR0b25cIjtcbmltcG9ydCB7IE11aU5lc3RlZE1lbnUsIE11aU5lc3RlZE1lbnVQcm9wcyB9IGZyb20gXCIuL011aU5lc3RlZE1lbnVcIjtcblxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcyh0aGVtZSA9PiAoe1xuICBjb250YWluZXI6IHtcbiAgICBtYXJnaW5Ub3A6IHRoZW1lLnNwYWNpbmcoMiksXG4gIH0sXG4gIGRyYXdlcjoge1xuICAgIG1pbldpZHRoOiAyMDAsXG4gIH0sXG4gIHJvb3Q6IHt9LFxuICB0aXRsZToge1xuICAgIGZsZXhHcm93OiAxLFxuICB9LFxuICBcIkBnbG9iYWxcIjoge1xuICAgIGJvZHk6IHtcbiAgICAgIG1hcmdpbjogMCxcbiAgICB9LFxuICB9LFxufSkpO1xuXG5leHBvcnQgdHlwZSBNdWlBZG1pblByb3BzID0ge1xuICBjaGlsZHJlbj87XG4gIG1lbnU/OiBSZWNvcmQ8c3RyaW5nLCBNdWlOZXN0ZWRNZW51UHJvcHM+O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aUFkbWluKHsgY2hpbGRyZW4sIG1lbnUgfTogTXVpQWRtaW5Qcm9wcykge1xuICBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKCk7XG4gIGNvbnN0IFtpc01lbnVPcGVuLCBzZXRNZW51XSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMucm9vdH0+XG4gICAgICA8QXBwQmFyIHBvc2l0aW9uPXtcInN0YXRpY1wifT5cbiAgICAgICAgPFRvb2xiYXI+XG4gICAgICAgICAgPE11aUJ1dHRvblxuICAgICAgICAgICAgaWNvbk9ubHlcbiAgICAgICAgICAgIGljb249e3JlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvTWVudVwiKX1cbiAgICAgICAgICAgIGVkZ2U9e1wic3RhcnRcIn1cbiAgICAgICAgICAgIGNvbG9yPVwiaW5oZXJpdFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldE1lbnUodHJ1ZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFR5cG9ncmFwaHk+e0xhbmdgQURNSU5gfTwvVHlwb2dyYXBoeT5cbiAgICAgICAgPC9Ub29sYmFyPntcIiBcIn1cbiAgICAgICAgPERyYXdlciBvcGVuPXtpc01lbnVPcGVufSBrZWVwTW91bnRlZCBvbkNsb3NlPXsoKSA9PiBzZXRNZW51KGZhbHNlKX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuZHJhd2VyfT5cbiAgICAgICAgICAgIDxNdWlOZXN0ZWRNZW51IHJvb3QgY2hpbGRyZW49e21lbnV9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvRHJhd2VyPlxuICAgICAgPC9BcHBCYXI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5jb250YWluZXJ9PntjaGlsZHJlbn08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiIsImltcG9ydCBDb2xsYXBzZSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvQ29sbGFwc2VcIjtcbmltcG9ydCBMaXN0IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9MaXN0XCI7XG5pbXBvcnQgTGlzdEl0ZW0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtXCI7XG5pbXBvcnQgTGlzdEl0ZW1JY29uIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbUljb25cIjtcbmltcG9ydCBMaXN0SXRlbVRleHQgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtVGV4dFwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUmVhY3ROb2RlLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaGFzS2V5cyB9IGZyb20gXCIuLi8uLi9jb21tb24vb2JqZWN0L2hhc0tleXNcIjtcbmltcG9ydCB7IG1hcE9iamVjdFRvQXJyYXkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RUb0FycmF5XCI7XG5pbXBvcnQgeyBNdWlJY29uIH0gZnJvbSBcIi4vY29tcG9uZW50cy9NdWlJY29uXCI7XG5cbmV4cG9ydCB0eXBlIE11aU5lc3RlZE1lbnVQcm9wcyA9IHtcbiAgdGl0bGU/OiBSZWFjdE5vZGU7XG4gIGljb24/OiBNdWlJY29uO1xuICBvbkNsaWNrPygpO1xuICBjaGlsZHJlbj86IFJlY29yZDxzdHJpbmcsIE11aU5lc3RlZE1lbnVQcm9wcz47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpTmVzdGVkTWVudShcbiAgcHJvcHM6IE11aU5lc3RlZE1lbnVQcm9wcyAmIHtcbiAgICByb290PzogYm9vbGVhbjtcbiAgfVxuKSB7XG4gIGNvbnN0IHsgcm9vdDogaXNSb290IH0gPSBwcm9wcztcbiAgY29uc29sZS5sb2coeyBwcm9wcyB9KTtcbiAgY29uc3QgW2lzT3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShpc1Jvb3QpO1xuXG4gIGNvbnN0IGNoaWxkTWVudXMgPSBtYXBPYmplY3RUb0FycmF5KFxuICAgIHByb3BzLmNoaWxkcmVuIHx8IHt9LFxuICAgIChjaGlsZFByb3BzLCBrZXkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxNdWlOZXN0ZWRNZW51XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgey4uLmNoaWxkUHJvcHN9XG4gICAgICAgICAgcm9vdD17ZmFsc2V9XG4gICAgICAgICAgdGl0bGU9e2NoaWxkUHJvcHMudGl0bGUgfHwga2V5fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICk7XG5cbiAgY29uc3QgaGFzQ2hpbGRyZW4gPSBoYXNLZXlzKHByb3BzLmNoaWxkcmVuKTtcbiAgY29uc3QgaGFzSW5kZXggPSBoYXNDaGlsZHJlbiAmJiAhIXByb3BzLm9uQ2xpY2s7XG5cbiAgY29uc3QgaXRlbUljb24gPSBwcm9wcy5pY29uICYmIChcbiAgICA8TGlzdEl0ZW1JY29uPntNdWlJY29uKHByb3BzLmljb24pfTwvTGlzdEl0ZW1JY29uPlxuICApO1xuXG4gIGxldCBlbGVtZW50ID0gKFxuICAgIDw+XG4gICAgICB7aXNSb290ID8gKFxuICAgICAgICBjaGlsZE1lbnVzXG4gICAgICApIDogKFxuICAgICAgICA8PlxuICAgICAgICAgIDxMaXN0SXRlbVxuICAgICAgICAgICAgYnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChoYXNLZXlzKHByb3BzLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAgIHNldE9wZW4oIWlzT3Blbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2hhc0luZGV4ID8gZmFsc2UgOiBpdGVtSWNvbn1cbiAgICAgICAgICAgIDxMaXN0SXRlbVRleHQ+e3Byb3BzLnRpdGxlfTwvTGlzdEl0ZW1UZXh0PlxuICAgICAgICAgIDwvTGlzdEl0ZW0+XG4gICAgICAgICAge2lzT3BlbiAmJiAoXG4gICAgICAgICAgICA8Q29sbGFwc2UgaW4+XG4gICAgICAgICAgICAgIHtoYXNJbmRleCAmJiA8TGlzdEl0ZW0+e2l0ZW1JY29ufTwvTGlzdEl0ZW0+fVxuICAgICAgICAgICAgICB7Y2hpbGRNZW51c31cbiAgICAgICAgICAgIDwvQ29sbGFwc2U+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgIDwvPlxuICApO1xuXG4gIGlmIChpc1Jvb3QpIHtcbiAgICBlbGVtZW50ID0gPExpc3Q+e2VsZW1lbnR9PC9MaXN0PjtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuIiwiaW1wb3J0IEJ1dHRvbiwgeyBCdXR0b25Qcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9CdXR0b25cIjtcbmltcG9ydCBJY29uQnV0dG9uLCB7IEljb25CdXR0b25Qcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9JY29uQnV0dG9uXCI7XG5pbXBvcnQgVG9vbHRpcCwgeyBUb29sdGlwUHJvcHMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVG9vbHRpcFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICBDb21wb25lbnRUeXBlLFxuICBjcmVhdGVFbGVtZW50LFxuICBSZWFjdEVsZW1lbnQsXG4gIFJlYWN0Tm9kZSxcbiAgdXNlUmVmLFxuICB1c2VTdGF0ZSxcbn0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBGbiwgT3ZlcnJpZGUsIFBsdWNrUmVxdWlyZWQgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IExhbmcgfSBmcm9tIFwiLi4vLi4vLi4vbGFuZy9MYW5nXCI7XG5pbXBvcnQgeyB1cGRhdGVSZWYgfSBmcm9tIFwiLi4vLi4vLi4vcmVhY3QvSG9va1JlZlwiO1xuaW1wb3J0IHsgcGFydGlhbFByb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL3BhcnRpYWxQcm9wc1wiO1xuaW1wb3J0IHsgTXVpSWNvbiB9IGZyb20gXCIuL011aUljb25cIjtcblxuZXhwb3J0IHR5cGUgTXVpQnV0dG9uUHJvcHM8UCA9IHt9PiA9XG4gIHwgT3ZlcnJpZGU8QnV0dG9uUHJvcHMsIEJhc2VQcm9wcyAmIFA+XG4gIHwgT3ZlcnJpZGU8SWNvbkJ1dHRvblByb3BzLCBCYXNlUHJvcHMgJiBQPjtcblxudHlwZSBCYXNlUHJvcHMgPSB7XG4gIEJ1dHRvblByb3BzPzogQnV0dG9uUHJvcHM7XG4gIEljb25CdXR0b25Qcm9wcz86IEljb25CdXR0b25Qcm9wcztcbiAgcmVuZGVyT25DbGljaz8oY2xvc2U6ICgpID0+IHZvaWQsIGdldEVsOiAoKSA9PiBhbnkpOiBSZWFjdEVsZW1lbnQ7XG4gIGRpc2FibGVUb29sdGlwPzogYm9vbGVhbjtcbiAgaWNvbk9ubHk/OiBib29sZWFuO1xuICBUb29sdGlwUHJvcHM/OiBQYXJ0aWFsPFRvb2x0aXBQcm9wcz47XG4gIGRhbmdlcj86IGJvb2xlYW47XG4gIGljb24/OiBNdWlJY29uO1xuICB0aXRsZT86IFJlYWN0Tm9kZTtcbiAgYnV0dG9uVHlwZT86IENvbXBvbmVudFR5cGU8TXVpQnV0dG9uUHJvcHM+O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11aUJ1dHRvbihwcm9wczogTXVpQnV0dG9uUHJvcHMpIHtcbiAgaWYgKHByb3BzLmJ1dHRvblR5cGUpIHtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChwcm9wcy5idXR0b25UeXBlLCB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGJ1dHRvblR5cGU6IHVuZGVmaW5lZCxcbiAgICB9KTtcbiAgfVxuXG4gIGxldCB7XG4gICAgQnV0dG9uUHJvcHMsXG4gICAgSWNvbkJ1dHRvblByb3BzLFxuICAgIHJlbmRlck9uQ2xpY2ssXG4gICAgVG9vbHRpcFByb3BzLFxuICAgIGRpc2FibGVUb29sdGlwLFxuICAgIGljb25Pbmx5LFxuICAgIGJ1dHRvblJlZjogaW5pdEJ1dHRvblJlZixcbiAgICBidXR0b25UeXBlLFxuICAgIC4uLmJ1dHRvblByb3BzXG4gIH06IE11aUJ1dHRvblByb3BzID0gcHJvcHM7XG5cbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBidXR0b25SZWYgPSB1c2VSZWY8dW5rbm93bj4obnVsbCk7XG4gIGxldCBlbGVtZW50OiBSZWFjdEVsZW1lbnQ7XG5cbiAgbGV0IHR5cGU6IENvbXBvbmVudFR5cGU7XG4gIGlmIChpY29uT25seSkge1xuICAgIHR5cGUgPSBJY29uQnV0dG9uO1xuICAgIGJ1dHRvblByb3BzID0ge1xuICAgICAgLi4uYnV0dG9uUHJvcHMsXG4gICAgICAuLi5JY29uQnV0dG9uUHJvcHMsXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICB0eXBlID0gQnV0dG9uO1xuICAgIGJ1dHRvblByb3BzID0ge1xuICAgICAgLi4uYnV0dG9uUHJvcHMsXG4gICAgICAuLi5CdXR0b25Qcm9wcyxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgeyB0aXRsZSwgZGFuZ2VyLCBpY29uLCBvbkNsaWNrLCAuLi5lbGVtZW50UHJvcHMgfSA9IGJ1dHRvblByb3BzIGFzIGFueTtcbiAgaWYgKGRhbmdlcikge1xuICAgIGVsZW1lbnRQcm9wcy5jb2xvciA9IFwic2Vjb25kYXJ5XCI7XG4gIH1cbiAgZWxlbWVudFByb3BzLmJ1dHRvblJlZiA9IGN1cnJlbnQgPT4ge1xuICAgIHVwZGF0ZVJlZihpbml0QnV0dG9uUmVmLCBjdXJyZW50KTtcbiAgICB1cGRhdGVSZWYoYnV0dG9uUmVmLCBjdXJyZW50KTtcbiAgfTtcbiAgZWxlbWVudFByb3BzLm9uQ2xpY2sgPSBldmVudCA9PiB7XG4gICAgb25DbGljaz8uKGV2ZW50KTtcbiAgICBzZXRPcGVuKHRydWUpO1xuICB9O1xuXG4gIGlmIChpY29uT25seSkge1xuICAgIGVsZW1lbnRQcm9wcy5jaGlsZHJlbiA9IE11aUljb24oaWNvbik7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudFByb3BzLmVuZEljb24gPSBNdWlJY29uKGljb24pO1xuICAgIGVsZW1lbnRQcm9wcy5jaGlsZHJlbiA9IHRpdGxlO1xuICB9XG5cbiAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQodHlwZSwgZWxlbWVudFByb3BzKTtcblxuICBpZiAoKHRpdGxlIHx8IFRvb2x0aXBQcm9wcykgJiYgIWRpc2FibGVUb29sdGlwKSB7XG4gICAgZWxlbWVudCA9IChcbiAgICAgIDxUb29sdGlwIHRpdGxlPXt0aXRsZX0gey4uLlRvb2x0aXBQcm9wc30+XG4gICAgICAgIHtlbGVtZW50fVxuICAgICAgPC9Ub29sdGlwPlxuICAgICk7XG4gIH1cblxuICBpZiAob3Blbikge1xuICAgIGVsZW1lbnQgPSAoXG4gICAgICA8PlxuICAgICAgICB7ZWxlbWVudH1cbiAgICAgICAge3JlbmRlck9uQ2xpY2s/LihcbiAgICAgICAgICAoKSA9PiBzZXRPcGVuKGZhbHNlKSxcbiAgICAgICAgICAoKSA9PiBidXR0b25SZWYuY3VycmVudCFcbiAgICAgICAgKX1cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmV4cG9ydCBjb25zdCBNdWlDYW5jZWxCdXR0b24gPSBwYXJ0aWFsUHJvcHMoTXVpQnV0dG9uLCB7XG4gIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvQ2FuY2VsXCIpLFxuICB0aXRsZTogTGFuZ2BDQU5DRUxgLFxufSk7XG5cbmV4cG9ydCBjb25zdCBNdWlDb25maXJtQnV0dG9uID0gcGFydGlhbFByb3BzKE11aUJ1dHRvbiwge1xuICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0RvbmVcIiksXG4gIHRpdGxlOiBMYW5nYENPTkZJUk1gLFxufSk7XG5cbmV4cG9ydCBjb25zdCBNdWlSZXNldEJ1dHRvbiA9IHBhcnRpYWxQcm9wcyhNdWlCdXR0b24sIHtcbiAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9DbGVhclwiKSxcbiAgdGl0bGU6IExhbmdgUkVTRVRgLFxufSk7XG5cbmV4cG9ydCBjb25zdCBNdWlDbG9zZUJ1dHRvbiA9IHBhcnRpYWxQcm9wcyhNdWlCdXR0b24sIHtcbiAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9DbG9zZVwiKSxcbiAgdGl0bGU6IExhbmdgQ0xPU0VgLFxufSk7XG5cbmV4cG9ydCBjb25zdCBNdWlBZGRCdXR0b24gPSBwYXJ0aWFsUHJvcHMoTXVpQnV0dG9uLCB7XG4gIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvQWRkXCIpLFxuICB0aXRsZTogTGFuZ2BBRERgLFxufSk7XG5cbmV4cG9ydCBjb25zdCBNdWlTdWJtaXRCdXR0b24gPSBwYXJ0aWFsUHJvcHMoTXVpQnV0dG9uLCB7XG4gIGljb246IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvU2VuZFwiKSxcbiAgdGl0bGU6IExhbmdgU3VibWl0YCxcbn0pO1xuXG5leHBvcnQgY29uc3QgTXVpRWRpdEJ1dHRvbiA9IHBhcnRpYWxQcm9wcyhNdWlCdXR0b24sIHtcbiAgaWNvbjogcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9FZGl0XCIpLFxuICB0aXRsZTogTGFuZ2BFRElUYCxcbn0pO1xuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDb21wb25lbnRDbGFzcywgY3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBFbXB0eUZyYWdtZW50IH0gZnJvbSBcIi4uLy4uLy4uL3JlYWN0L3V0aWxzL0VtcHR5RnJhZ21lbnRcIjtcblxuY29uc3QgTXVpSWNvbk1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgc3VibWl0OiBcInNlbmRcIixcbiAgcmVzZXQ6IFwiY2xlYXJcIixcbn07XG5cbmV4cG9ydCB0eXBlIE11aUljb24gPSBzdHJpbmcgfCB7IGRlZmF1bHQ6IENvbXBvbmVudENsYXNzIH0gfCB1bmRlZmluZWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlJY29uKGFyZzogTXVpSWNvbik6IFJlYWN0RWxlbWVudCB7XG4gIGlmICh0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKVxuICAgIHJldHVybiBhcmcgPyAoXG4gICAgICA8aSBjbGFzc05hbWU9e1wibWF0ZXJpYWwtaWNvbnNcIn0+e011aUljb25NYXBbYXJnXSA/PyBhcmd9PC9pPlxuICAgICkgOiAoXG4gICAgICA8PjwvPlxuICAgICk7XG4gIGlmIChhcmc/LmRlZmF1bHQpIHJldHVybiBjcmVhdGVFbGVtZW50KGFyZy5kZWZhdWx0KTtcblxuICByZXR1cm4gRW1wdHlGcmFnbWVudDtcbn1cbiIsImltcG9ydCB7XG4gIGNyZWF0ZU11aVRoZW1lLFxuICBUaGVtZSBhcyBNdWlDb3JlVGhlbWUsXG4gIFRoZW1lUHJvdmlkZXIgYXMgTXVpQ29yZVRoZW1lUHJvdmlkZXIsXG59IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIjtcbmltcG9ydCB7XG4gIGpzc1ByZXNldCxcbiAgU3R5bGVzUHJvdmlkZXIgYXMgTXVpSnNzUHJvdmlkZXIsXG59IGZyb20gXCJAbWF0ZXJpYWwtdWkvc3R5bGVzXCI7XG5pbXBvcnQgeyBjcmVhdGUgfSBmcm9tIFwianNzXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgYXMgU3R5bGVkVGhlbWVQcm92aWRlciB9IGZyb20gXCJzdHlsZWQtY29tcG9uZW50c1wiO1xuaW1wb3J0IHtcbiAgTGFuZ1RyYW5zbGF0b3IsXG4gIExhbmdUcmFuc2xhdG9yQ29udGV4dCxcbn0gZnJvbSBcIi4uLy4uL2xhbmcvTGFuZ1RyYW5zbGF0b3JcIjtcblxuZGVjbGFyZSBtb2R1bGUgXCJAbWF0ZXJpYWwtdWkvc3R5bGVzXCIge1xuICBpbnRlcmZhY2UgRGVmYXVsdFRoZW1lIGV4dGVuZHMgTXVpQ29yZVRoZW1lIHt9XG59XG5kZWNsYXJlIG1vZHVsZSBcInN0eWxlZC1jb21wb25lbnRzXCIge1xuICBpbnRlcmZhY2UgRGVmYXVsdFRoZW1lIGV4dGVuZHMgTXVpQ29yZVRoZW1lIHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNdWlTeXN0ZW0oe1xuICBqc3NQbHVnaW5zID0gW10sXG4gIHRoZW1lID0gY3JlYXRlTXVpVGhlbWUoe1xuICAgIHByb3BzOiB7XG4gICAgICBNdWlUZXh0RmllbGQ6IHtcbiAgICAgICAgZnVsbFdpZHRoOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIE11aURpYWxvZzoge1xuICAgICAgICBmdWxsV2lkdGg6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pLFxufSA9IHt9KSB7XG4gIGNvbnN0IGxhbmdUcmFuc2xhdG9yID0gbmV3IExhbmdUcmFuc2xhdG9yKHt9KTtcblxuICBjb25zdCBqc3MgPSBjcmVhdGUoe1xuICAgIHBsdWdpbnM6IFsuLi5qc3NQcmVzZXQoKS5wbHVnaW5zLCAuLi5qc3NQbHVnaW5zXSxcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XG4gICAgICBjaGlsZHJlbiA9IGNyZWF0ZUVsZW1lbnQoTXVpQ29yZVRoZW1lUHJvdmlkZXIsIHtcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIHRoZW1lLFxuICAgICAgfSk7XG5cbiAgICAgIGNoaWxkcmVuID0gY3JlYXRlRWxlbWVudChTdHlsZWRUaGVtZVByb3ZpZGVyLCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICB0aGVtZSxcbiAgICAgIH0pO1xuXG4gICAgICBjaGlsZHJlbiA9IGNyZWF0ZUVsZW1lbnQoTXVpSnNzUHJvdmlkZXIsIHtcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIGpzcyxcbiAgICAgIH0pO1xuXG4gICAgICBjaGlsZHJlbiA9IGNyZWF0ZUVsZW1lbnQoTGFuZ1RyYW5zbGF0b3JDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICB2YWx1ZTogbGFuZ1RyYW5zbGF0b3IsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH0sXG4gIH07XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gYXNzZXJ0KHZhbHVlLCBtZXNzYWdlPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZykpOiBhc3NlcnRzIHZhbHVlIHtcbiAgICBpZiAoIXZhbHVlKSB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIHR5cGVvZiBtZXNzYWdlID09PSBcImZ1bmN0aW9uXCIgPyBtZXNzYWdlKCkgOlxuICAgICAgICAgICAgbWVzc2FnZVxuICAgIClcbn1cbiIsImltcG9ydCB7SW5kZXhlZFNlcX0gZnJvbSBcIi4uL2ltbXV0YWJsZTJcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXRUb1NlcTxUPihcbiAgICBmaXJzdDogVCxcbiAgICBnZXROZXh0OiAocHJldjogVCkgPT4gVCB8IHVuZGVmaW5lZCB8IG51bGxcbik6IEluZGV4ZWRTZXE8VD4ge1xuICAgIHJldHVybiBJbmRleGVkU2VxPFQ+KFtmaXJzdF0pLmZsYXRNYXAoZnVuY3Rpb24qICh2YWx1ZTogYW55KSB7XG4gICAgICAgIHdoaWxlICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICB5aWVsZCB2YWx1ZTtcbiAgICAgICAgICAgIHZhbHVlID0gZ2V0TmV4dCh2YWx1ZSlcbiAgICAgICAgfVxuICAgIH0pXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0TmV4dFBhdGgocGF0aDogc3RyaW5nKTogW3N0cmluZywgc3RyaW5nXSB7XG4gICAgbGV0IHN0YXJ0ID0gMDtcbiAgICB3aGlsZSAocGF0aC5jaGFyQXQoc3RhcnQpID09PSAnLycpIHtcbiAgICAgICAgc3RhcnQrKztcbiAgICB9XG4gICAgY29uc3QgZW5kID0gcGF0aC5pbmRleE9mKCcvJywgc3RhcnQpO1xuICAgIGlmICgwID4gZW5kKSB7XG4gICAgICAgIHJldHVybiBbcGF0aC5zbGljZShzdGFydCksIFwiXCJdXG4gICAgfVxuICAgIHJldHVybiBbcGF0aC5zbGljZShzdGFydCwgZW5kKSwgcGF0aC5zbGljZShlbmQpXVxufVxuIiwiaW1wb3J0IHthc3NlcnR9IGZyb20gXCIuLi9hc3NlcnRcIjtcbmltcG9ydCB7QmFzZU1hcCwgTWFwS2V5LCBNYXBWYWx1ZX0gZnJvbSBcIi4vQmFzZU1hcFwiO1xuXG5leHBvcnQgdHlwZSBNYXBGYWN0b3J5PFQgZXh0ZW5kcyBCYXNlTWFwPGFueSwgYW55Pj4gPSB7XG4gICAgbWFwOiBUO1xuICAgIChrZXk6IE1hcEtleTxUPik6IE5vbk51bGxhYmxlPE1hcFZhbHVlPFQ+PjtcblxufTtcblxuIGZ1bmN0aW9uIG1hcEZhY3Rvcnk8SywgVj4oXG4gICAgbWFwOiBCYXNlTWFwPEssIFY+LFxuICAgIGZhY3Rvcnk6IChrZXk6IEspID0+IFZcbik6IE1hcEZhY3Rvcnk8QmFzZU1hcDxLLCBWPj4ge1xuICAgIHRvdWNoLm1hcCA9IG1hcDtcbiAgICByZXR1cm4gdG91Y2hcblxuICAgIGZ1bmN0aW9uIHRvdWNoKGtleSwgY2FsbGJhY2s/KTogYW55IHtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBtYXAuaGFzKGtleSkgPyBjYWxsYmFjayhtYXAuZ2V0KGtleSkpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbHVlID0gbWFwLmdldChrZXkpO1xuICAgICAgICBpZiAodmFsdWUgfHwgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikpIHtcbiAgICAgICAgICAgIHJldHVybiA8Vj52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBtYXAuc2V0KGtleSwgdmFsdWUgPSBmYWN0b3J5KGtleSkpO1xuICAgICAgICBhc3NlcnQodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiKTtcbiAgICAgICAgcmV0dXJuIDxWPnZhbHVlO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gV2Vha01hcEZhY3Rvcnk8SyBleHRlbmRzIG9iamVjdCwgVj4oZmFjdG9yeTogKGtleTogSykgPT4gVik6IE1hcEZhY3Rvcnk8V2Vha01hcDxLLCBWPj4ge1xuICAgIHJldHVybiA8YW55Pm1hcEZhY3RvcnkobmV3IFdlYWtNYXAoKSwgZmFjdG9yeSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1hcEZhY3Rvcnk8SywgVj4oZmFjdG9yeTogKGtleTogSykgPT4gVik6IE1hcEZhY3Rvcnk8TWFwPEssIFY+PiB7XG4gICAgcmV0dXJuIDxhbnk+bWFwRmFjdG9yeShuZXcgTWFwKCksIGZhY3RvcnkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBCYXNlTWFwRmFjdG9yeTxLLCBWPihtYXA6IEJhc2VNYXA8SywgVj4sIGZhY3Rvcnk6IChrZXk6IEspID0+IFYpOiBNYXBGYWN0b3J5PEJhc2VNYXA8SywgVj4+IHtcbiAgICByZXR1cm4gPGFueT5tYXBGYWN0b3J5KG1hcCwgZmFjdG9yeSlcbn1cblxuIiwiaW1wb3J0IHtCYXNlTWFwLCBNYXBLZXksIE1hcFZhbHVlfSBmcm9tIFwiLi9CYXNlTWFwXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b3VjaE1hcDxUIGV4dGVuZHMgQmFzZU1hcDxhbnksIGFueT4+KFxuICAgIG1hcDogVCwga2V5OlxuICAgICAgICBNYXBLZXk8VD4sXG4gICAgY2FsbGJhY2s6IChrZXk6IE1hcEtleTxUPikgPT4gTWFwVmFsdWU8VD4pOiBNYXBWYWx1ZTxUPiB7XG4gICAgbGV0IHZhbHVlID0gbWFwLmdldChrZXkpO1xuICAgIGlmICh2YWx1ZSB8fCBtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBtYXAuc2V0KGtleSwgdmFsdWUgPSBjYWxsYmFjayhrZXkpKTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbiIsImV4cG9ydCBmdW5jdGlvbiBkZWZpbmVkPFQ+KHZhbHVlOiBULCBlcnJvck9yQ2FsbGJhY2s/KTogTm9uTnVsbGFibGU8VD4ge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICB0eXBlb2YgZXJyb3JPckNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIgPyBlcnJvck9yQ2FsbGJhY2soKSA6XG4gICAgICAgICAgICAgICAgZXJyb3JPckNhbGxiYWNrKTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5cbiIsImltcG9ydCB7ZGVmaW5lZH0gZnJvbSBcIi4vZGVmaW5lZFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lZEF0PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvYmo6IFQsIGtleTogSyk6IE5vbk51bGxhYmxlPFRbS10+IHtcbiAgICByZXR1cm4gZGVmaW5lZChvYmpba2V5XSwgKCkgPT4gYE5vICR7a2V5fWApXG59XG4iLCJpbXBvcnQge2tleXN9IGZyb20gXCIuL2tleXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uKiBlbnRyaWVzPFYgPSBhbnk+KG9iajogUmVjb3JkPHN0cmluZywgVj4gfCB1bmRlZmluZWQgfCBudWxsKTogSXRlcmFibGVJdGVyYXRvcjxbc3RyaW5nLCBWLG51bWJlcl0+IHtcbiAgICBsZXQgaW5kZXg9MDtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKG9iaikpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB5aWVsZCBba2V5LCBvYmpba2V5XSxpbmRleCsrXVxuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBoYXNLZXlzKG9iamVjdDogb2JqZWN0IHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKG9iamVjdCkgZm9yIChsZXQga2V5IGluIG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbioga2V5czxLIGV4dGVuZHMgUHJvcGVydHlLZXkgPSBzdHJpbmc+KFxuICBvYmo6IFJlY29yZDxLLCBhbnk+IHwgdW5kZWZpbmVkIHwgbnVsbFxuKTogSXRlcmFibGVJdGVyYXRvcjxzdHJpbmcgJiBLPiB7XG4gIGlmIChvYmopXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikgY29udGludWU7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgeWllbGQga2V5O1xuICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi90eXBpbmdzXCI7XG5pbXBvcnQgeyBlbnRyaWVzIH0gZnJvbSBcIi4vZW50cmllc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwT2JqZWN0PFQsIFI+KFxuICBvYmo6IFJlY29yZDxzdHJpbmcsIFQ+LFxuICBtYXBwZXI6ICh2YWx1ZTogVCwga2V5OiBzdHJpbmcpID0+IFJcbik6IFJlY29yZDxzdHJpbmcsIFI+IHtcbiAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcyhvYmopKSB7XG4gICAgcmVzdWx0W2tleV0gPSBtYXBwZXIodmFsdWUsIGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1hcE9iamVjdEFzeW5jPFQsIFI+KFxuICBvYmo6IFJlY29yZDxzdHJpbmcsIFQ+LFxuICBtYXBwZXI6ICh2YWx1ZTogVCwga2V5OiBzdHJpbmcpID0+IEF3YWl0YWJsZTxSPlxuKTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBSPj4ge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKG9iaikpIHtcbiAgICByZXN1bHRba2V5XSA9IGF3YWl0IG1hcHBlcih2YWx1ZSwga2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IHsgZW50cmllcyB9IGZyb20gXCIuL2VudHJpZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcE9iamVjdFRvQXJyYXk8VCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIGFueT4sIFU+KFxuICBvYmo6IFQsXG4gIG1hcHBlcjogKHZhbHVlOiBUW2tleW9mIFRdLCBrZXk6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4gVSB8IHVuZGVmaW5lZFxuKTogVVtdIHtcbiAgbGV0IGluZGV4ID0gMDtcbiAgY29uc3QgYXJyOiBVW10gPSBbXTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcyhvYmopKSB7XG4gICAgY29uc3QgbmV4dFZhbHVlID0gbWFwcGVyKHZhbHVlLCBrZXksIGluZGV4KyspO1xuICAgIGlmIChuZXh0VmFsdWUgIT09IHVuZGVmaW5lZCkgYXJyLnB1c2gobmV4dFZhbHVlKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuIiwiaW1wb3J0IHsgZW50cmllcyB9IGZyb20gXCIuL2VudHJpZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVzY3JpcHRvcnM8VCBleHRlbmRzIG9iamVjdCwgVSBleHRlbmRzIG9iamVjdD4oXG4gIGJhc2U6IFQsXG4gIGNoaWxkOiBVXG4pOiBPbWl0PFQsIGtleW9mIFU+ICYgVSB7XG4gIGZvciAoY29uc3QgW2tleSwgZGVzY10gb2YgZW50cmllcyhPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhiYXNlKSkpIHtcbiAgICBpZiAoIWNoaWxkLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZCwga2V5LCBkZXNjKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LnNldFByb3RvdHlwZU9mKGNoaWxkLCBiYXNlKTtcbn1cbiIsImltcG9ydCB7YXNzZXJ0fSBmcm9tIFwiLi4vYXNzZXJ0XCI7XG5cbmNvbnN0IG1hcmtUb0RlbGV0ZSA9IFN5bWJvbChcImRlbGV0ZWRcIik7XG5cblxuY29uc3QgbWFwID0gbmV3IFdlYWtNYXAoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIExhenk8VCBleHRlbmRzICguLi5hcmdzKSA9PiBhbnk+KGNhbGxiYWNrOiBUKTogVFxuZXhwb3J0IGZ1bmN0aW9uIExhenkoKTogTWV0aG9kRGVjb3JhdG9yXG5leHBvcnQgZnVuY3Rpb24gTGF6eShjYWxsYmFjaz8pOiBhbnkge1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gbGF6eUNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKHRhcmdldCwgcHJvcCwgZGVzYykgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZXNjLmdldCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgbGF6eVByb3BlcnR5KHRhcmdldCwgcHJvcCwgZGVzYyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlc2MudmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGxhenlNZXRob2QodGFyZ2V0LCBwcm9wLCBkZXNjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbGF6eUNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzOmFueSkge1xuICAgICAgICBpZiAobWFwLmhhcyhjYWxsYmFjaykpXG4gICAgICAgICAgICByZXR1cm4gbWFwLmdldChjYWxsYmFjayk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgbWFwLnNldChjYWxsYmFjaywgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsYXp5UHJvcGVydHkodGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG5cbiAgICBjb25zdCBtYXAgPSBuZXcgV2Vha01hcCgpXG4gICAgY29uc3QgZ2V0dGVyID0gZGVzYy5nZXQ7XG4gICAgYXNzZXJ0KCFkZXNjLnNldCk7XG4gICAgZGVzYy5zZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKG1hcmtUb0RlbGV0ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIG1hcC5kZWxldGUodGhpcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcC5zZXQodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlc2MuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAobWFwLmhhcyh0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hcC5nZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXR0ZXIuYXBwbHkodGhpcyk7XG4gICAgICAgIG1hcC5zZXQodGhpcywgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGxhenlNZXRob2QodGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG5cbiAgICBjb25zdCBtYXAgPSBuZXcgV2Vha01hcCgpXG4gICAgY29uc3QgbWV0aG9kID0gZGVzYy52YWx1ZTtcbiAgICBkZWxldGUgZGVzYy52YWx1ZTtcbiAgICBkZXNjLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKG1hcC5oYXModGhpcykpXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gbWFwLmdldCh0aGlzKTtcblxuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbWV0aG9kLmFwcGx5KHRoaXMsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgbWFwLnNldCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZGVzYy5zZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBtYXJrVG9EZWxldGUpIHtcbiAgICAgICAgICAgIG1hcC5kZWxldGUodGhpcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3Qgc2V0IGxhenkgbWV0aG9kLmApXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuTGF6eS5kZWxldGUgPSBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wPykge1xuICAgIGlmIChwcm9wKSB7XG4gICAgICAgIHRhcmdldFtwcm9wXSA9IG1hcmtUb0RlbGV0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtYXAuZGVsZXRlKHRhcmdldCk7XG4gICAgfVxufVxuIiwidHlwZSBDYXBpdGFsaXplPFQ+ID0gc3RyaW5nO1xuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZTxUIGV4dGVuZHMgc3RyaW5nPihrZXk6IFQpOiBDYXBpdGFsaXplPFQ+IHtcbiAgcmV0dXJuIGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKTtcbn1cbiIsImltcG9ydCB7U291cmNlQ2FzZX0gZnJvbSBcIi4vbWF0Y2hDYXNlXCI7XG5pbXBvcnQge3NwbGl0fSBmcm9tIFwiLi9zcGxpdFwiO1xuXG5leHBvcnQgY29uc3QgZnJvbUNvbnN0YW50Q2FzZTogU291cmNlQ2FzZSA9IHRleHQgPT4gc3BsaXQodGV4dCwgXCJfXCIpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGpvaW5UZW1wbGF0ZTxUPihzdHJpbmdzOiBSZWFkb25seUFycmF5PHN0cmluZz4sIGFyZ3M6IFRbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IChhcmc6IFQpID0+IHN0cmluZykge1xuICAgIGxldCB0ZXh0ID0gJyc7XG4gICAgZm9yIChsZXQgW2luZGV4LCBzdHJpbmddIG9mIHN0cmluZ3MuZW50cmllcygpKSB7XG4gICAgICAgIHRleHQgKz0gc3RyaW5nO1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBpbmRleCkge1xuICAgICAgICAgICAgdGV4dCArPSBjYWxsYmFjayhhcmdzW2luZGV4XSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbn1cbiIsImltcG9ydCB7U2VxfSBmcm9tIFwiaW1tdXRhYmxlXCI7XG5cbmV4cG9ydCB0eXBlIFRhcmdldENhc2UgPSAod29yZHM6IFNlcS5JbmRleGVkPHN0cmluZz4pID0+IHN0cmluZztcbmV4cG9ydCB0eXBlIFNvdXJjZUNhc2UgPSAodGV4dDogc3RyaW5nKSA9PiBTZXEuSW5kZXhlZDxzdHJpbmc+O1xuXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hDYXNlKFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICBzb3VyY2U6IFNvdXJjZUNhc2UsXG4gICAgdGFyZ2V0OiBUYXJnZXRDYXNlXG4pIHtcbiAgICByZXR1cm4gdGFyZ2V0KHNvdXJjZSh0ZXh0KSlcbn1cbiIsImltcG9ydCB7U2VxfSBmcm9tIFwiaW1tdXRhYmxlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiogX3NwbGl0KHRleHQ6IHN0cmluZywgc2VwOiBzdHJpbmcpOiBJdGVyYWJsZUl0ZXJhdG9yPHN0cmluZz4ge1xuICAgIGxldCBzdGFydCA9IDA7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgcG9zID0gdGV4dC5pbmRleE9mKHNlcCwgc3RhcnQpO1xuICAgICAgICBpZiAoLTEgPT09IHBvcykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgeWllbGQgdGV4dC5zbGljZShzdGFydCwgcG9zKTtcbiAgICAgICAgc3RhcnQgPSBwb3MgKyBzZXAubGVuZ3RoO1xuICAgIH1cbiAgICB5aWVsZCBzdGFydCA/IHRleHQuc2xpY2Uoc3RhcnQpIDogdGV4dDtcblxufVxuXG5leHBvcnQgY29uc3Qgc3BsaXQgPSAodGV4dDogc3RyaW5nLCBzZXA6IHN0cmluZykgPT4gU2VxLkluZGV4ZWQoX3NwbGl0KHRleHQsIHNlcCkpXG5cblxuIiwiaW1wb3J0IHtUYXJnZXRDYXNlfSBmcm9tIFwiLi9tYXRjaENhc2VcIjtcblxuZXhwb3J0IGNvbnN0IHRvVGl0bGVDYXNlOiBUYXJnZXRDYXNlID0gd29yZHMgPT4gd29yZHNcbiAgICAubWFwKHRleHQgPT4gdGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRleHQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSlcbiAgICAuam9pbihcIiBcIik7XG5cbiIsImV4cG9ydCB0eXBlIFVuaW9uPFQ+ID0gVFtrZXlvZiBUXTtcblxuZXhwb3J0IHR5cGUgRXhwTWFwPFQ+ID0gVW5pb248XG4gIHtcbiAgICBbSyBpbiBrZXlvZiBUXTogUmVjb3JkPEssIFRbS10+O1xuICB9XG4+O1xuZXhwb3J0IHR5cGUgTnVsbGFibGUgPSB1bmRlZmluZWQgfCBudWxsO1xuXG5leHBvcnQgdHlwZSBBd2FpdGFibGU8VCA9IGFueT4gPSBQcm9taXNlPFQ+IHwgVDtcblxuZXhwb3J0IHR5cGUgRm4gPSAoLi4uYXJnczogYW55W10pID0+IGFueTtcblxuZXhwb3J0IHR5cGUgUHJvbWlzZVR5cGU8VCBleHRlbmRzIFByb21pc2U8YW55Pj4gPSBUIGV4dGVuZHMgUHJvbWlzZTxpbmZlciBVPlxuICA/IFVcbiAgOiBuZXZlcjtcblxuZXhwb3J0IHR5cGUgQXdhaXRlZDxUIGV4dGVuZHMgQXdhaXRhYmxlPiA9IFQgZXh0ZW5kcyBBd2FpdGFibGU8aW5mZXIgVT5cbiAgPyBVXG4gIDogbmV2ZXI7XG5cbmV4cG9ydCB0eXBlIEV4dHJhY3RLZXlzPFQsIFY+ID0gRXhjbHVkZTxcbiAgVW5pb248XG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBWID8gSyA6IG5ldmVyO1xuICAgIH1cbiAgPixcbiAgbmV2ZXJcbj47XG5cbmV4cG9ydCB0eXBlIEV4Y2x1ZGVLZXlzPFQsIFY+ID0gRXhjbHVkZTxcbiAgVW5pb248XG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBWID8gbmV2ZXIgOiBLO1xuICAgIH1cbiAgPixcbiAgbmV2ZXJcbj47XG5cbmV4cG9ydCB0eXBlIFBpY2tCeVZhbHVlPFQsIFY+ID0gUGljazxULCBFeHRyYWN0S2V5czxULCBWPj47XG5leHBvcnQgdHlwZSBPbWl0QnlWYWx1ZTxULCBWPiA9IE9taXQ8VCwgRXh0cmFjdEtleXM8VCwgVj4+O1xuXG5leHBvcnQgdHlwZSBQbHVja1JlcXVpcmVkPFQsIEsgZXh0ZW5kcyBQcm9wZXJ0eUtleSwgRSA9IG5ldmVyPiA9IElzTmV2ZXI8XG4gIFRcbj4gZXh0ZW5kcyB0cnVlXG4gID8gRVxuICA6IFJlcXVpcmVkPFQ+IGV4dGVuZHMgUmVjb3JkPEssIGluZmVyIFU+XG4gID8gVVxuICA6IEU7XG5cbmV4cG9ydCB0eXBlIEF0PFQsIEsgZXh0ZW5kcyBQcm9wZXJ0eUtleT4gPSBLIGV4dGVuZHMga2V5b2YgUmVxdWlyZWQ8VD5cbiAgPyBUW0tdXG4gIDogbmV2ZXI7XG5cbmV4cG9ydCB0eXBlIFBhcnRpYWxLZXlzPFQsIEsgZXh0ZW5kcyBrZXlvZiBUPiA9IE9taXQ8VCwgSz4gJlxuICBQYXJ0aWFsPFBpY2s8VCwgSz4+O1xuXG5leHBvcnQgZnVuY3Rpb24gTnVsbGFibGU8VD4odmFsdWU/OiBUKTogVCB8IE51bGxhYmxlIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgdHlwZSBUeXBlPFQ+ID0gRnVuY3Rpb24gJiB7IHByb3RvdHlwZTogVCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gVHlwaW5nPFQ+KCk6IFQge1xuICByZXR1cm4gPGFueT4oKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9KTtcbn1cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFR5cGVSZWZzIHt9XG59XG5leHBvcnQgZnVuY3Rpb24gVHlwZVJlZjxLIGV4dGVuZHMgUHJvcGVydHlLZXk+KFxuICBjYjogKCkgPT4gS1xuKTogSyBleHRlbmRzIGtleW9mIFR5cGVSZWZzID8gVHlwZVJlZnNbS10gOiBuZXZlciB7XG4gIHJldHVybiA8YW55PigoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIFR5cGU8VCA9IGFueT4odGhpczogYW55KTogVHlwZTxUPiB7XG4gIGlmICh0aGlzIGluc3RhbmNlb2YgVHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9XG4gIHJldHVybiBUeXBlO1xufVxuXG5leHBvcnQgdHlwZSBQYXlsb2FkPFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBvYmplY3Q+PiA9IFVuaW9uPFxuICB7IFtLIGluIGtleW9mIFRdOiB7IHR5cGU6IEsgfSAmIFRbS10gfVxuPjtcbmV4cG9ydCB0eXBlIEFzc2lnbjxULCBVPiA9IE9taXQ8VCwga2V5b2YgUmVxdWlyZWQ8VT4+ICYgVTtcbmV4cG9ydCB0eXBlIE92ZXJyaWRlPFQgZXh0ZW5kcyBvYmplY3QsIFUgZXh0ZW5kcyBvYmplY3Q+ID0gT21pdDxULCBrZXlvZiBVPiAmIFU7XG5leHBvcnQgdHlwZSBSZXBsYWNlPFQgZXh0ZW5kcyBvYmplY3QsIFUgZXh0ZW5kcyBQYXJ0aWFsPFQ+PiA9IEV4dHJhY3Q8XG4gIE92ZXJyaWRlPFQsIFU+LFxuICBUXG4+O1xuZXhwb3J0IHR5cGUgQXNzaWduS2V5czxULCBVPiA9IEhhc0tleXM8VD4gZXh0ZW5kcyBmYWxzZVxuICA/IFVcbiAgOiBIYXNLZXlzPFU+IGV4dGVuZHMgZmFsc2VcbiAgPyBUXG4gIDogQXNzaWduPFQsIFU+O1xuXG5leHBvcnQgdHlwZSBBcnJheVR5cGVPck9iamVjdDxUPiA9IFQgZXh0ZW5kcyBBcnJheTxpbmZlciBVPlxuICA/IFVcbiAgOiBFeHRyYWN0PFQsIG9iamVjdD47XG5cbmV4cG9ydCB0eXBlIE9wdGlvbmFsQXJnPFQ+ID0gSXNOZXZlcjxUPiBleHRlbmRzIHRydWUgPyBbXSA6IFtUXTtcblxuZXhwb3J0IHR5cGUgTmV2ZXJLZXlzPFQ+ID0gVW5pb248XG4gIHtcbiAgICBbSyBpbiBrZXlvZiBUXTogSXNOZXZlcjxUW0tdPiBleHRlbmRzIHRydWUgPyBLIDogbmV2ZXI7XG4gIH1cbj47XG5cbmV4cG9ydCB0eXBlIE9taXROZXZlcktleXM8VD4gPSBPbWl0PFQsIE5ldmVyS2V5czxUPj47XG5cbmV4cG9ydCB0eXBlIE9wdGlvbmFsT2JqZWN0QXJnPFQ+ID0gSXNOZXZlcjxVbmlvbjxUPj4gZXh0ZW5kcyB0cnVlXG4gID8gW11cbiAgOiBbT21pdDxULCBOZXZlcktleXM8VD4+XTtcblxuZXhwb3J0IHR5cGUgRGVmYXVsdElmTmV2ZXI8VCwgVT4gPSBJc05ldmVyPFQ+IGV4dGVuZHMgdHJ1ZSA/IFUgOiBUO1xuXG5leHBvcnQgdHlwZSBJZk5ldmVyPFQsIFUsIEUgPSBuZXZlcj4gPSBJc05ldmVyPFQ+IGV4dGVuZHMgdHJ1ZSA/IFUgOiBFO1xuXG5leHBvcnQgdHlwZSBDb21tb248TCwgUj4gPSBPbWl0QnlWYWx1ZTxcbiAge1xuICAgIFtLIGluIGtleW9mIChMICYgUildOiBLIGV4dGVuZHMga2V5b2YgTFxuICAgICAgPyBLIGV4dGVuZHMga2V5b2YgUlxuICAgICAgICA/IEV4dHJhY3Q8TFtLXSwgUltLXT5cbiAgICAgICAgOiBuZXZlclxuICAgICAgOiBuZXZlcjtcbiAgfSxcbiAgbmV2ZXJcbj47XG5cbmV4cG9ydCB0eXBlIFJlcXVpcmVkS2V5czxUPiA9IFVuaW9uPFxuICB7XG4gICAgW0sgaW4ga2V5b2YgVF06IFQgZXh0ZW5kcyBSZWNvcmQ8SywgYW55PiA/IEsgOiBuZXZlcjtcbiAgfVxuPjtcblxuZXhwb3J0IHR5cGUgT3B0aW9uYWxLZXlzPFQ+ID0gVW5pb248XG4gIHtcbiAgICBbSyBpbiBrZXlvZiBUXTogVCBleHRlbmRzIFJlY29yZDxLLCBhbnk+ID8gbmV2ZXIgOiBLO1xuICB9XG4+O1xuXG5leHBvcnQgdHlwZSBPcHRpb25hbE9ubHk8VCwgSyBleHRlbmRzIGtleW9mIFQgPSBuZXZlcj4gPSBPbWl0PFxuICBULFxuICBFeGNsdWRlPFJlcXVpcmVkS2V5czxUPiwgSz5cbj47XG5cbmV4cG9ydCB0eXBlIFJlcXVpcmVkT25seTxUPiA9IFBpY2s8VCwgUmVxdWlyZWRLZXlzPFQ+PjtcblxuZXhwb3J0IHR5cGUgT3B0aW9uYWw8VD4gPSBQaWNrPFQsIE9wdGlvbmFsS2V5czxUPj47XG5cbmV4cG9ydCB0eXBlIElzTmV2ZXI8VD4gPSBbVF0gZXh0ZW5kcyBbbmV2ZXJdID8gdHJ1ZSA6IGZhbHNlO1xuZXhwb3J0IHR5cGUgSXM8VCwgVT4gPSBbVF0gZXh0ZW5kcyBbVV0gPyB0cnVlIDogZmFsc2U7XG5leHBvcnQgdHlwZSBFeHBlY3Q8VCwgVSBleHRlbmRzIFQ+ID0gVTtcbmV4cG9ydCB0eXBlIElzRW1wdHlPYmplY3Q8VD4gPSBJczx7fSwgVD47XG5cbmV4cG9ydCB0eXBlIEFuZDxUIGV4dGVuZHMgYm9vbGVhbiwgVSBleHRlbmRzIGJvb2xlYW4+ID0gVCBleHRlbmRzIHRydWVcbiAgPyBVIGV4dGVuZHMgdHJ1ZVxuICAgID8gdHJ1ZVxuICAgIDogZmFsc2VcbiAgOiBmYWxzZTtcblxuZXhwb3J0IHR5cGUgT3I8VCBleHRlbmRzIGJvb2xlYW4sIFUgZXh0ZW5kcyBib29sZWFuPiA9IFQgZXh0ZW5kcyB0cnVlXG4gID8gdHJ1ZVxuICA6IFUgZXh0ZW5kcyB0cnVlXG4gID8gdHJ1ZVxuICA6IGZhbHNlO1xuXG5leHBvcnQgdHlwZSBJc1NvbWU8VCwgVT4gPSBBbmQ8SXM8VCwgVT4sIElzPFUsIFQ+PjtcbmV4cG9ydCB0eXBlIElzTm90PFQsIFU+ID0gVCBleHRlbmRzIFUgPyBmYWxzZSA6IHRydWU7XG5cbmV4cG9ydCB0eXBlIElzQW55PFQ+ID0gMCBleHRlbmRzIDEgJiBUID8gdHJ1ZSA6IGZhbHNlO1xuXG5leHBvcnQgdHlwZSBJc0V4dGVuZDxULCBVPiA9IFQgZXh0ZW5kcyBVID8gdHJ1ZSA6IGZhbHNlO1xuXG5leHBvcnQgdHlwZSBJc051bGw8VD4gPSBUIGV4dGVuZHMgdW5kZWZpbmVkIHwgbnVsbCA/IHRydWUgOiBmYWxzZTtcblxuZXhwb3J0IHR5cGUgSGFzS2V5czxUPiA9IElzTmV2ZXI8VD4gZXh0ZW5kcyB0cnVlXG4gID8gZmFsc2VcbiAgOiBOb3Q8SXNOZXZlcjxrZXlvZiBUPj47XG5cbmV4cG9ydCB0eXBlIE5vdDxUIGV4dGVuZHMgYm9vbGVhbj4gPSBUIGV4dGVuZHMgdHJ1ZSA/IGZhbHNlIDogdHJ1ZTtcblxuZXhwb3J0IHR5cGUgSWY8QyBleHRlbmRzIGJvb2xlYW4sIFQsIEUgPSBuZXZlcj4gPSBDIGV4dGVuZHMgdHJ1ZSA/IFQgOiBFO1xuZXhwb3J0IHR5cGUgSWZOb3Q8QyBleHRlbmRzIGJvb2xlYW4sIFQsIEUgPSBuZXZlcj4gPSBJZjxDLCBFLCBUPjtcblxuZXhwb3J0IHR5cGUgQ29uc3RydWN0b3I8VD4gPSB7IG5ldyAoLi4uYXJnczogYW55W10pOiBUIH07XG5cbmV4cG9ydCB0eXBlIE1lcmdlPEwsIFIsIE0+ID0gSGFzS2V5czxMPiBleHRlbmRzIGZhbHNlXG4gID8gUlxuICA6IEhhc0tleXM8Uj4gZXh0ZW5kcyBmYWxzZVxuICA/IExcbiAgOiBBc3NpZ25LZXlzPEwsIE0+O1xuXG5leHBvcnQgdHlwZSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxULCBVID0ge30+ID1cbiAgfCAoVSAmIFQpXG4gIHwgKFUgJlxuICAgICAgUGFydGlhbEtleXM8XG4gICAgICAgIFQsXG4gICAgICAgIFVuaW9uPFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFtLIGluIGtleW9mIFJlcXVpcmVkPFQ+XTogT3I8XG4gICAgICAgICAgICAgIElzTmV2ZXI8VFtLXT4sXG4gICAgICAgICAgICAgIElzQW55PFRbS10+XG4gICAgICAgICAgICA+IGV4dGVuZHMgdHJ1ZVxuICAgICAgICAgICAgICA/IG5ldmVyXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkIGV4dGVuZHMgVFtLXVxuICAgICAgICAgICAgICA/IEtcbiAgICAgICAgICAgICAgOiBuZXZlcjtcbiAgICAgICAgICB9XG4gICAgICAgID5cbiAgICAgID4pO1xuXG5leHBvcnQgdHlwZSBVbmRlZmluZWRJZkVtcHR5T2JqZWN0PFQ+ID0gSWY8SXNFbXB0eU9iamVjdDxUPiwgdW5kZWZpbmVkPiB8IFQ7XG5cbmV4cG9ydCB0eXBlIFJlcXVpcmVPcHRpb25hbEtleXM8VD4gPSB7XG4gIFtLIGluIGtleW9mIFJlcXVpcmVkPFQ+XTogVFtLXTtcbn07XG5cbmV4cG9ydCB0eXBlIElmTnVsbDxULCBVPiA9IFQgZXh0ZW5kcyBudWxsID8gVSA6IG5ldmVyO1xuXG5leHBvcnQgdHlwZSBBc3luY0ZuPFQgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IGFueT4gPSAoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD5cbikgPT4gUHJvbWlzZTxSZXR1cm5UeXBlPFQ+PjtcblxuZXhwb3J0IHR5cGUgU3luY0ZuPFQgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IGFueT4gPSAoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD5cbikgPT4gQXdhaXRlZDxSZXR1cm5UeXBlPFQ+PjtcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgVHlwZVJlZnMge31cbn1cblxuZXhwb3J0IHR5cGUgVHlwZVJlZjxLIGV4dGVuZHMgUHJvcGVydHlLZXk+ID0gSyBleHRlbmRzIGtleW9mIFR5cGVSZWZzXG4gID8gVHlwZVJlZnNbS11cbiAgOiBuZXZlcjtcblxuZXhwb3J0IHR5cGUgTm9uTnVsbGFibGVBdDxcbiAgVCxcbiAgSyBleHRlbmRzIGtleW9mIFJlcXVpcmVkPFQ+LFxuICBEID0gbmV2ZXIsXG4gIFYgPSBOb25OdWxsYWJsZTxUW0tdPlxuPiA9IElzTmV2ZXI8Vj4gZXh0ZW5kcyB0cnVlID8gRCA6IFY7XG5cbmV4cG9ydCB0eXBlIE9taXRLZXlzPFQsIEsgZXh0ZW5kcyBrZXlvZiBUPiA9IE9taXQ8VCwgSz47XG5cbmV4cG9ydCB0eXBlIFVuZGVmaW5lZElmSXNVbmRlZmluZWQ8VD4gPSBJZjxJc1VuZGVmaW5lZDxUPiwgdW5kZWZpbmVkPjtcblxuZXhwb3J0IHR5cGUgSXNVbmRlZmluZWQ8VD4gPSB1bmRlZmluZWQgZXh0ZW5kcyBUID8gdHJ1ZSA6IGZhbHNlO1xuXG5leHBvcnQgdHlwZSBEZWZpbmVkPFQ+ID0gVCBleHRlbmRzIHVuZGVmaW5lZCA/IG5ldmVyIDogVDtcblxuZXhwb3J0IHR5cGUgT21pdFJlcXVpcmVkS2V5czxUIGV4dGVuZHMgVSwgVT4gPSBPbWl0PFQsIGtleW9mIFJlcXVpcmVkPFU+PjtcbmV4cG9ydCB0eXBlIEtleU1hcDxUPiA9IFJlY29yZDxzdHJpbmcsIFQ+O1xuIiwiZXhwb3J0IHtcbiAgICBTZXQgYXMgSW1tdXRhYmxlU2V0LFxuICAgIFJlY29yZCBhcyBJbW11dGFibGVSZWNvcmQsXG4gICAgTWFwIGFzIEltbXV0YWJsZU1hcCxcbiAgICBMaXN0IGFzIEltbXV0YWJsZUxpc3QsXG5cbn0gZnJvbSBcImltbXV0YWJsZVwiO1xuXG5pbXBvcnQgKiBhcyBJbW11dGFibGUgZnJvbSBcImltbXV0YWJsZVwiO1xuaW1wb3J0IHtTZXF9IGZyb20gXCJpbW11dGFibGVcIjtcblxuZXhwb3J0IHR5cGUgSW1tdXRhYmxlS2V5cyA9IEltbXV0YWJsZS5TZXQ8c3RyaW5nPjtcbmV4cG9ydCBjb25zdCBJbW11dGFibGVLZXlzID0gSW1tdXRhYmxlLlNldDxzdHJpbmc+KCk7XG5cbmV4cG9ydCB0eXBlIEluZGV4ZWRTZXE8VD4gPSBTZXEuSW5kZXhlZDxUPjtcbmV4cG9ydCBjb25zdCBJbmRleGVkU2VxID0gU2VxLkluZGV4ZWQ7XG4iLCJpbXBvcnQge2NyZWF0ZUVsZW1lbnQsIFJlYWN0RWxlbWVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge0xhbmdUZW1wbGF0ZSwgTGFuZ1RlbXBsYXRlUHJvcHN9IGZyb20gXCIuL0xhbmdUZW1wbGF0ZVwiO1xuaW1wb3J0IHtMYW5nVmlld30gZnJvbSBcIi4vTGFuZ1ZpZXdcIjtcblxuZXhwb3J0IHR5cGUgTGFuZ1Rva2VuRWxlbWVudCA9IFJlYWN0RWxlbWVudDxMYW5nVG9rZW5Qcm9wcz47XG5cbmV4cG9ydCB0eXBlIExhbmdUb2tlblByb3BzID0ge1xuICAgIHR5cGU6IExhbmdQcm9wc1R5cGUudG9rZW4sXG4gICAgdG9rZW46IHN0cmluZ1xufTtcblxuZXhwb3J0IHR5cGUgTGFuZyA9IExhbmdUZW1wbGF0ZTxhbnk+IHwgUmVhY3RFbGVtZW50PExhbmdUb2tlblByb3BzPjtcblxuZXhwb3J0IHR5cGUgTGFuZ0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQ8TGFuZ1Byb3BzPjtcblxuZXhwb3J0IHR5cGUgTGFuZ05vZGUgPSBudW1iZXIgfCBzdHJpbmcgfCBMYW5nRWxlbWVudCB8IExhbmdOb2RlW10gfCB1bmRlZmluZWQ7XG5cbmV4cG9ydCBlbnVtIExhbmdQcm9wc1R5cGUge1xuICAgIHRva2VuLFxuICAgIHRlbXBsYXRlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMYW5nKHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5KTogUmVhY3RFbGVtZW50PExhbmdUb2tlblByb3BzPlxuZXhwb3J0IGZ1bmN0aW9uIExhbmc8UCBleHRlbmRzIHN0cmluZywgSyBleHRlbmRzIHN0cmluZz4oXG4gICAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXksXG4gICAgcGFyYW06IFAsXG4gICAgLi4ucGFyYW1zOiBLW10pOiBMYW5nVGVtcGxhdGU8UCB8IEs+XG5leHBvcnQgZnVuY3Rpb24gTGFuZyhzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4ucGFyYW1zKTogYW55IHtcbiAgICBpZiAoc3RyaW5ncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoTGFuZ1ZpZXcsIHtcbiAgICAgICAgICAgIHR5cGU6IExhbmdQcm9wc1R5cGUudG9rZW4sXG4gICAgICAgICAgICB0b2tlbjogc3RyaW5nc1swXVxuICAgICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gTGFuZ1RlbXBsYXRlKHN0cmluZ3MucmF3LCBwYXJhbXMpXG59XG5cblxuZXhwb3J0IHR5cGUgTGFuZ1Byb3BzID0gTGFuZ1RlbXBsYXRlUHJvcHM8YW55PiB8IExhbmdUb2tlblByb3BzO1xuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBkZWZpbmVkQXQgfSBmcm9tIFwiLi4vY29tbW9uL29iamVjdC9kZWZpbmVkQXRcIjtcbmltcG9ydCB7IGpvaW5UZW1wbGF0ZSB9IGZyb20gXCIuLi9jb21tb24vc3RyaW5nL2pvaW5UZW1wbGF0ZVwiO1xuaW1wb3J0IHsgTGFuZ0VsZW1lbnQsIExhbmdOb2RlLCBMYW5nUHJvcHNUeXBlLCBMYW5nVG9rZW5FbGVtZW50IH0gZnJvbSBcIi4vTGFuZ1wiO1xuaW1wb3J0IHsgTGFuZ1ZpZXcgfSBmcm9tIFwiLi9MYW5nVmlld1wiO1xuXG5leHBvcnQgdHlwZSBMYW5nVGVtcGxhdGU8SyBleHRlbmRzIHN0cmluZz4gPSB7XG4gIHRva2VuOiBzdHJpbmc7XG5cbiAgLy8gZm9ybWF0dGVyXG4gIChwcm9wczogUmVjb3JkPEssIExhbmdOb2RlPik6IExhbmdUZW1wbGF0ZUVsZW1lbnQ8Sz47XG5cbiAgLy8gcHJvdmlkZXJcbiAgKHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5rZXlzOiBLW10pOiBMYW5nVGVtcGxhdGVFbnRyeTxLPjtcbn07XG5cbmV4cG9ydCB0eXBlIExhbmdUZW1wbGF0ZUZvcm1hdHRlcjxLIGV4dGVuZHMgc3RyaW5nPiA9IChcbiAgcHJvcHM6IFJlY29yZDxLLCBhbnk+XG4pID0+IHN0cmluZztcblxuZXhwb3J0IHR5cGUgTGFuZ1RlbXBsYXRlRW50cnk8SyBleHRlbmRzIHN0cmluZz4gPSBbXG4gIHN0cmluZyxcbiAgTGFuZ1RlbXBsYXRlRm9ybWF0dGVyPEs+XG5dO1xuXG5leHBvcnQgdHlwZSBMYW5nVGVtcGxhdGVQcm9wczxLIGV4dGVuZHMgc3RyaW5nPiA9IHtcbiAgdHlwZTogTGFuZ1Byb3BzVHlwZS50ZW1wbGF0ZTtcbiAgdG9rZW46IHN0cmluZztcbiAgcHJvcHM6IFJlY29yZDxcbiAgICBLLFxuICAgIExhbmdUZW1wbGF0ZUVsZW1lbnQ8YW55PiB8IExhbmdUb2tlbkVsZW1lbnQgfCBzdHJpbmcgfCBudW1iZXJcbiAgPjtcbiAgcGFyYW1zOiBLW107XG4gIHN0cmluZ3M6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbn07XG5cbmV4cG9ydCB0eXBlIExhbmdUZW1wbGF0ZUVsZW1lbnQ8SyBleHRlbmRzIHN0cmluZz4gPSBSZWFjdEVsZW1lbnQ8XG4gIExhbmdUZW1wbGF0ZVByb3BzPEs+XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gTGFuZ1RlbXBsYXRlPEsgZXh0ZW5kcyBzdHJpbmc+KFxuICBzdHJpbmdzOiBSZWFkb25seUFycmF5PHN0cmluZz4sXG4gIHBhcmFtczogS1tdXG4pOiBMYW5nVGVtcGxhdGU8Sz4ge1xuICBjb25zdCB0b2tlbiA9IGpvaW5UZW1wbGF0ZShzdHJpbmdzLCBwYXJhbXMsIHBhcmFtID0+IGB7JHtwYXJhbX19YCk7XG5cbiAgdGVtcGxhdGUudG9rZW5Ob2RlID0gdG9rZW47XG4gIHJldHVybiA8YW55PnRlbXBsYXRlO1xuXG4gIGZ1bmN0aW9uIHRlbXBsYXRlKGFyZzAsIC4uLmFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDAgJiYgdHlwZW9mIGFyZzAgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KExhbmdWaWV3LCB7XG4gICAgICAgIHR5cGU6IExhbmdQcm9wc1R5cGUudGVtcGxhdGUsXG4gICAgICAgIHRva2VuLFxuICAgICAgICBwcm9wczogYXJnMCxcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBzdHJpbmdzLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRlbXBsYXRlYC4uLmBcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRva2VuLFxuICAgICAgICBwcm9wcyA9PlxuICAgICAgICAgIGpvaW5UZW1wbGF0ZSg8c3RyaW5nW10+YXJnMCwgYXJncywgYXJnID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkZWZpbmVkQXQocHJvcHMsIGFyZyk7XG4gICAgICAgICAgfSksXG4gICAgICBdO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7bWFwT2JqZWN0fSBmcm9tIFwiLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7ZnJvbUNvbnN0YW50Q2FzZX0gZnJvbSBcIi4uL2NvbW1vbi9zdHJpbmcvZnJvbUNvbnN0YW50Q2FzZVwiO1xuaW1wb3J0IHtqb2luVGVtcGxhdGV9IGZyb20gXCIuLi9jb21tb24vc3RyaW5nL2pvaW5UZW1wbGF0ZVwiO1xuaW1wb3J0IHttYXRjaENhc2V9IGZyb20gXCIuLi9jb21tb24vc3RyaW5nL21hdGNoQ2FzZVwiO1xuaW1wb3J0IHt0b1RpdGxlQ2FzZX0gZnJvbSBcIi4uL2NvbW1vbi9zdHJpbmcvdG9UaXRsZUNhc2VcIjtcbmltcG9ydCB7TGFuZ05vZGUsIExhbmdQcm9wcywgTGFuZ1Byb3BzVHlwZSwgTGFuZ1Rva2VuUHJvcHN9IGZyb20gXCIuL0xhbmdcIjtcbmltcG9ydCB7TGFuZ01hcH0gZnJvbSBcIi4vTGFuZ01hcFwiO1xuaW1wb3J0IHtMYW5nVGVtcGxhdGVQcm9wc30gZnJvbSBcIi4vTGFuZ1RlbXBsYXRlXCI7XG5cblxuZXhwb3J0IGNsYXNzIExhbmdUcmFuc2xhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWFwOiBMYW5nTWFwKSB7XG4gICAgfVxuXG5cbiAgICB0cmFuc2xhdGVOb2RlKG5vZGU6IExhbmdOb2RlKTpzdHJpbmd8dW5kZWZpbmVkIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2Ygbm9kZSkge1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcobm9kZSk7XG4gICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICghbm9kZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUubWFwKG5vZGUgPT4gdGhpcy50cmFuc2xhdGVOb2RlKG5vZGUpKS5qb2luKCcnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVQcm9wcyhub2RlLnByb3BzKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlUHJvcHMocHJvcHM6IExhbmdQcm9wcykge1xuICAgICAgICBzd2l0Y2ggKHByb3BzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgTGFuZ1Byb3BzVHlwZS50ZW1wbGF0ZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVUZW1wbGF0ZShwcm9wcyk7XG4gICAgICAgICAgICBjYXNlIExhbmdQcm9wc1R5cGUudG9rZW46XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlVG9rZW4ocHJvcHMudG9rZW4pO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZURlZmF1bHRUb2tlbih0b2tlbjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcFt0b2tlbl0gPSBtYXRjaENhc2UodG9rZW4sIGZyb21Db25zdGFudENhc2UsIHRvVGl0bGVDYXNlKTtcbiAgICB9XG5cbiAgICB0cmFuc2xhdGVUb2tlbih0b2tlbjpzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMubWFwW3Rva2VuXTtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcFt0b2tlbl0gPSB2YWx1ZSh7fSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlZmF1bHRUb2tlbih0b2tlbik7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vdCBzdXBwb3J0ICR7dHlwZW9mIHZhbHVlfWApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVUZW1wbGF0ZSh0ZW1wbGF0ZTogTGFuZ1RlbXBsYXRlUHJvcHM8YW55Pik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5tYXBbdGVtcGxhdGUudG9rZW5dO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlKG1hcE9iamVjdCh0ZW1wbGF0ZS5wcm9wcywgbm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlUHJvcHMobm9kZS5wcm9wcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhub2RlKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaENhc2UoXG4gICAgICAgICAgICAgICAgICAgIGpvaW5UZW1wbGF0ZSh0ZW1wbGF0ZS5zdHJpbmdzLCB0ZW1wbGF0ZS5wYXJhbXMsIHBhcmFtID0+IFN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVOb2RlKCB0ZW1wbGF0ZS5wcm9wc1twYXJhbV0pXG4gICAgICAgICAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgICAgICAgICBmcm9tQ29uc3RhbnRDYXNlLFxuICAgICAgICAgICAgICAgICAgICB0b1RpdGxlQ2FzZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYENhbid0IHRyYW5zbGF0ZSAke3R5cGVvZiB2YWx1ZX0uYClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3QgTGFuZ1RyYW5zbGF0b3JDb250ZXh0ID0gY3JlYXRlQ29udGV4dChuZXcgTGFuZ1RyYW5zbGF0b3Ioe30pKTtcbmV4cG9ydCBjb25zdCB1c2VMYW5nVHJhbnNsYXRvciA9ICgpID0+IHVzZUNvbnRleHQoTGFuZ1RyYW5zbGF0b3JDb250ZXh0KTtcblxuIiwiaW1wb3J0IHtjcmVhdGVFbGVtZW50LCBGcmFnbWVudCwgdXNlQ29udGV4dH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge0xhbmdQcm9wc30gZnJvbSBcIi4vTGFuZ1wiO1xuaW1wb3J0IHtMYW5nVHJhbnNsYXRvckNvbnRleHR9IGZyb20gXCIuL0xhbmdUcmFuc2xhdG9yXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBMYW5nVmlldyhwcm9wczogTGFuZ1Byb3BzKSB7XG4gICAgY29uc3QgdHJhbnNsYXRvciA9IHVzZUNvbnRleHQoTGFuZ1RyYW5zbGF0b3JDb250ZXh0KTtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChGcmFnbWVudCwgbnVsbCxcbiAgICAgICAgdHJhbnNsYXRvci50cmFuc2xhdGVQcm9wcyhwcm9wcykpXG59XG5cbiIsImltcG9ydCB7IG1hcE9iamVjdFRvQXJyYXkgfSBmcm9tIFwiLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RUb0FycmF5XCI7XG5cbnR5cGUgTG9nZ2VyID0ge1xuICAoXG4gICAgY2FsbGJhY2s6IChcbiAgICAgIGZvcm1hdHRlcjogKHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5hcmdzKSA9PiBhbnlcbiAgICApID0+IGFueVxuICApOiB2b2lkO1xufTtcblxuLy8gdHJ5aW5nIHRvIHJlcXVpcmUgXCJ1dGlsXCIgbW9kdWxlLlxuY29uc3QgdXRpbDpcbiAgfCB1bmRlZmluZWRcbiAgfCB7XG4gICAgICBpbnNwZWN0O1xuICAgIH0gPSAoKHIsIG0pID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gcihtKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHt9XG59KShyZXF1aXJlLCBcInV0aWxcIik7XG5cbmluc3BlY3QuY3VzdG9tID0gdXRpbD8uaW5zcGVjdC5jdXN0b20gPz8gU3ltYm9sKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNwZWN0KC4uLmFyZ3MpOiBzdHJpbmcge1xuICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICBhcmdzID0gWy4uLmFyZ3MsIHsgZGVwdGg6IDEwMCB9XTtcbiAgfVxuICBjb25zdCBbdmFsdWVdID0gYXJncztcblxuICBpZiAodHlwZW9mIHZhbHVlPy5pbnNwZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5zcGVjdCgpO1xuICB9XG5cbiAgaWYgKHV0aWwpIHJldHVybiB1dGlsLmluc3BlY3QuYXBwbHkodXRpbCwgYXJncyk7XG5cbiAgY29uc3QgbWV0aG9kID0gdmFsdWU/LltpbnNwZWN0LmN1c3RvbV07XG4gIGlmIChtZXRob2QpIHJldHVybiBtZXRob2QuYXBwbHkodmFsdWUpO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgXCJbXCIgK1xuICAgICAgdmFsdWVcbiAgICAgICAgLnRvU2VxKClcbiAgICAgICAgLm1hcCh2YWx1ZSA9PiBpbnNwZWN0KHZhbHVlKSlcbiAgICAgICAgLmpvaW4oXCIsIFwiKSArXG4gICAgICBcIl1cIlxuICAgICk7XG4gIH1cbiAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSkgPT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICByZXR1cm4gYHske21hcE9iamVjdFRvQXJyYXkoXG4gICAgICB2YWx1ZSxcbiAgICAgICh2YWx1ZSwga2V5KSA9PiBpbnNwZWN0KGtleSkgKyBcIjogXCIgKyBpbnNwZWN0KHZhbHVlKVxuICAgICl9fWA7XG4gIH1cbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxvZ2dlcihsZXZlbCk6IExvZ2dlciB7XG4gIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjaygoc3RyaW5ncywgLi4uYXJncykgPT4ge1xuICAgICAgbGV0IHRleHQgPSBcIlwiO1xuICAgICAgZm9yIChjb25zdCBbaW5kZXgsIHN0cmluZ10gb2Ygc3RyaW5ncy5lbnRyaWVzKCkpIHtcbiAgICAgICAgdGV4dCArPSBzdHJpbmc7XG4gICAgICAgIGlmIChpbmRleCBpbiBhcmdzKSB7XG4gICAgICAgICAgdGV4dCArPSBpbnNwZWN0KGFyZ3NbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc29sZVtsZXZlbF0odGV4dCk7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBsb2dEZWJ1ZyA9IGNyZWF0ZUxvZ2dlcihcImRlYnVnXCIpO1xuZXhwb3J0IGNvbnN0IGxvZ0luZm8gPSBjcmVhdGVMb2dnZXIoXCJpbmZvXCIpO1xuZXhwb3J0IGNvbnN0IGxvZ0Vycm9yID0gY3JlYXRlTG9nZ2VyKFwiZXJyb3JcIik7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB0b3VjaE1hcCB9IGZyb20gXCIuLi9jb21tb24vbWFwL3RvdWNoTWFwXCI7XG5cbmV4cG9ydCB0eXBlIEFjdGlvblR5cGU8VD4gPSBuZXcgKC4uLmFyZ3MpID0+IFQ7XG5cbmV4cG9ydCB0eXBlIEFjdGlvbkxpc3RlbmVyID0gKGFjdGlvbjogYW55KSA9PiB2b2lkO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uTWFuYWdlciB7XG4gIGFjdGlvbk1hcCA9IG5ldyBNYXAoKTtcbiAgYWN0aW9uTGlzdGVuZXJNYXAgPSBuZXcgTWFwPEZ1bmN0aW9uLCBTZXQ8QWN0aW9uTGlzdGVuZXI+PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBlbWl0KGFjdGlvbjogb2JqZWN0KSB7XG4gICAgaWYgKHRoaXMuYWN0aW9uTWFwLmdldChhY3Rpb24uY29uc3RydWN0b3IpICE9PSBhY3Rpb24pIHtcbiAgICAgIHRoaXMuYWN0aW9uTWFwLnNldChhY3Rpb24uY29uc3RydWN0b3IsIGFjdGlvbik7XG4gICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmFjdGlvbkxpc3RlbmVyTWFwLmdldChhY3Rpb24uY29uc3RydWN0b3IpO1xuICAgICAgbGlzdGVuZXJzPy5mb3JFYWNoKGNhbGxiYWNrID0+IHtcbiAgICAgICAgY2FsbGJhY2soYWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGxpc3RlbjxUPihhY3Rpb25UeXBlOiBBY3Rpb25UeXBlPFQ+LCBjYWxsYmFjazogKGFjdGlvbjogVCkgPT4gdm9pZCkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRvdWNoTWFwKFxuICAgICAgdGhpcy5hY3Rpb25MaXN0ZW5lck1hcCxcbiAgICAgIGFjdGlvblR5cGUsXG4gICAgICAoKSA9PiBuZXcgU2V0KClcbiAgICApO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBsaXN0ZW5lcnMuZGVsZXRlKGNhbGxiYWNrKTtcbiAgICAgIGlmICghbGlzdGVuZXJzLnNpemUpIHtcbiAgICAgICAgdGhpcy5hY3Rpb25MaXN0ZW5lck1hcC5kZWxldGUoYWN0aW9uVHlwZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBjb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dChuZXcgQWN0aW9uTWFuYWdlcigpKTtcbmV4cG9ydCBjb25zdCB1c2VBY3Rpb25NYW5hZ2VyID0gKCkgPT4gUmVhY3QudXNlQ29udGV4dChjb250ZXh0KTtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnRUeXBlLCBSZWYsIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgdHlwZSBSZWZUeXBlPFQgZXh0ZW5kcyBSZWFjdC5SZWY8YW55Pj4gPSBUIGV4dGVuZHMgUmVhY3QuUmVmPGluZmVyIFU+XG4gID8gVVxuICA6IG5ldmVyO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlVXBkYXRlUmVmPFQgZXh0ZW5kcyBSZWY8YW55PiB8IHVuZGVmaW5lZD4oXG4gIHJlZjogVCxcbiAgY3JlYXRlOiAoKSA9PiBSZWZUeXBlPE5vbk51bGxhYmxlPFQ+PlxuKSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVmICYmIHVwZGF0ZVJlZihyZWYsIGNyZWF0ZSgpKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmVmICYmIHVwZGF0ZVJlZihyZWYsIG51bGwpO1xuICAgIH07XG4gIH0sIFt0eXBlb2YgKHJlZiB8fCB1bmRlZmluZWQpXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVSZWY8VD4ocmVmOiBSZWFjdC5SZWY8VD4gfCB1bmRlZmluZWQsIHZhbHVlOiBUKSB7XG4gIGlmIChyZWYpXG4gICAgc3dpdGNoICh0eXBlb2YgcmVmKSB7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcmV0dXJuIHJlZih2YWx1ZSk7XG4gICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgcmVmW1wiY3VycmVudFwiXSA9IHZhbHVlO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgSG9va1JlZjxUPiA9IHsgaG9va1JlZj86IFJlYWN0LlJlZjxUPiB9O1xuZXhwb3J0IHR5cGUgRm9yd2FyZEhvb2tSZWY8VCBleHRlbmRzIENvbXBvbmVudFR5cGU8SG9va1JlZjxhbnk+Pj4gPSBIb29rUmVmPFxuICBIb29rUmVmVHlwZTxUPlxuPjtcblxuZXhwb3J0IHR5cGUgSG9va1JlZlR5cGU8XG4gIFQgZXh0ZW5kcyBDb21wb25lbnRUeXBlPEhvb2tSZWY8YW55Pj5cbj4gPSBUIGV4dGVuZHMgQ29tcG9uZW50VHlwZTxIb29rUmVmPGluZmVyIFU+PiA/IFUgOiBuZXZlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUhvb2tSZWY8VCBleHRlbmRzIENvbXBvbmVudFR5cGU8SG9va1JlZjxhbnk+Pj4oXG4gIGNvbXBvbmVudFR5cGU/OiBUXG4pOiB7XG4gIHJlYWRvbmx5IGN1cnJlbnQ6IEhvb2tSZWZUeXBlPFQ+O1xuICAoY3VycmVudDogSG9va1JlZlR5cGU8VD4pOiB2b2lkO1xufSB7XG4gIHJldHVybiB1c2VNZW1vKCgpID0+IHtcbiAgICBob29rUmVmLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGhvb2tSZWY7XG5cbiAgICBmdW5jdGlvbiBob29rUmVmKGN1cnJlbnQpIHtcbiAgICAgIGhvb2tSZWYuY3VycmVudCA9IGN1cnJlbnQ7XG4gICAgfVxuICB9LCBbXSk7XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudFR5cGUsIGNyZWF0ZUVsZW1lbnQsIFJlYWN0RWxlbWVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1BhcnRpYWxLZXlzfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3NcIjtcblxuZXhwb3J0IHR5cGUgUmVuZGVyZXI8UCwgVSBleHRlbmRzIGFueVtdID0gW10+ID0gKHByb3BzOiBQICYgeyBrZXk/IH0sIC4uLmFyZ3M6IFUpID0+IFJlYWN0RWxlbWVudDtcblxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyZXI8UCwgSyBleHRlbmRzIGtleW9mIFA+KFxuICAgIGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxQPixcbiAgICBkZWZhdWx0UHJvcHM/OiBQaWNrPFAsIEs+XG4pOiBSZW5kZXJlcjxQYXJ0aWFsS2V5czxQLCBLPj5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJlcjxQLCBLIGV4dGVuZHMga2V5b2YgUD4oXG4gICAgY29tcG9uZW50OiBDb21wb25lbnRUeXBlPFA+LFxuICAgIGRlZmF1bHRQcm9wcz86IFBpY2s8UCwgSz5cbik6IFJlbmRlcmVyPFBhcnRpYWxLZXlzPFAsIEs+PlxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcmVyKGNvbXBvbmVudCwgZGVmYXVsdFByb3BzPykge1xuICAgIHJldHVybiBwcm9wcyA9PiBjcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgIWRlZmF1bHRQcm9wcyA/IHByb3BzIDoge1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIC4uLnByb3BzXG4gICAgfSlcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gUmVuZGVyZXI8UD4oQ29tcG9uZW50OiBDb21wb25lbnRUeXBlPFA+KTogUmVuZGVyZXI8UD4ge1xuICAgIHJldHVybiBwcm9wcyA9PiBjcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpXG59XG4iLCJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBY3Rpb25UeXBlLCB1c2VBY3Rpb25NYW5hZ2VyIH0gZnJvbSBcIi4vQWN0aW9uTWFuYWdlclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlRW1pdHRlZDxUPihcbiAgYWN0aW9uVHlwZTogQWN0aW9uVHlwZTxUPixcbiAgY2FsbGJhY2s/OiAoYWN0aW9uOiBUKSA9PiB2b2lkXG4pOiBUIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgYW0gPSB1c2VBY3Rpb25NYW5hZ2VyKCk7XG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoKCkgPT4gYW0uYWN0aW9uTWFwLmdldChhY3Rpb25UeXBlKSk7XG4gIHVzZUVmZmVjdChcbiAgICAoKSA9PlxuICAgICAgYW0ubGlzdGVuKGFjdGlvblR5cGUsIGFjdGlvbiA9PiB7XG4gICAgICAgIGlmIChhY3Rpb24gIT0gc3RhdGUpIHtcbiAgICAgICAgICBzZXRTdGF0ZShhY3Rpb24pO1xuICAgICAgICAgIGNhbGxiYWNrPy4oYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgW2FtXVxuICApO1xuXG4gIHJldHVybiBzdGF0ZTtcbn1cbiIsImltcG9ydCB7IHVzZUFjdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9BY3Rpb25NYW5hZ2VyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VFbWl0dGVyKCkge1xuICBjb25zdCBhbSA9IHVzZUFjdGlvbk1hbmFnZXIoKTtcbiAgcmV0dXJuIGFjdGlvbiA9PiB7XG4gICAgYW0uZW1pdChhY3Rpb24pO1xuICB9O1xufVxuIiwiaW1wb3J0IHt1c2VBc3luY30gZnJvbSBcInJlYWN0LWFzeW5jLWhvb2tcIjtcbmltcG9ydCB7QXdhaXRhYmxlfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUxvYWRlcjxULCBTPihcbiAgICBjYWxsYmFjazogKCkgPT4gQXdhaXRhYmxlPFQ+LFxuICAgIGRlcHM6IGFueVtdID0gW11cbik6IFQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHVzZUFzeW5jPFQ+KGFzeW5jICgpID0+IGF3YWl0IGNhbGxiYWNrKCksIGRlcHMpO1xuXG4gICAgc3dpdGNoIChyZXN1bHQuc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgXCJlcnJvclwiOlxuICAgICAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yO1xuICAgICAgICBjYXNlIFwic3VjY2Vzc1wiOlxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5yZXN1bHQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29udGV4dCwgY3JlYXRlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdG91Y2hNYXAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hcC90b3VjaE1hcFwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuXG5jb25zdCBjb250ZXh0cyA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCB0eXBlIENvbnRleHRPclR5cGU8VD4gPSBDb250ZXh0PFQ+IHwgVHlwZTxUPjtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbnRleHRPclR5cGU8VD4oXG4gIGNvbnRleHRPclR5cGU6IENvbnRleHRPclR5cGU8VD5cbik6IENvbnRleHQ8VCB8IHVuZGVmaW5lZD4ge1xuICBpZiAodHlwZW9mIGNvbnRleHRPclR5cGUgPT09IFwiZnVuY3Rpb25cIilcbiAgICByZXR1cm4gdG91Y2hNYXAoY29udGV4dHMsIGNvbnRleHRPclR5cGUsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBjcmVhdGVDb250ZXh0KHVuZGVmaW5lZCk7XG4gICAgICBjb250ZXh0LmRpc3BsYXlOYW1lID0gY29udGV4dE9yVHlwZS5uYW1lO1xuICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfSk7XG4gIHJldHVybiA8Q29udGV4dDxUIHwgdW5kZWZpbmVkPj5jb250ZXh0T3JUeXBlO1xufVxuIiwiaW1wb3J0IHtjcmVhdGVFbGVtZW50LCBGcmFnbWVudH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBFbXB0eUZyYWdtZW50ID0gY3JlYXRlRWxlbWVudChGcmFnbWVudCk7XG4iLCJpbXBvcnQge0NvbnRleHQsIGNyZWF0ZUNvbnRleHR9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVW5kZWZpbmVkQ29udGV4dDxUPigpOiBDb250ZXh0PFQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gY3JlYXRlQ29udGV4dDxUIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpXG59XG4iLCJpbXBvcnQge3VzZUNvbnRleHR9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtkZWZpbmVkfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9kZWZpbmVkXCI7XG5pbXBvcnQge0NvbnRleHRPclR5cGV9IGZyb20gXCIuLi9Db250ZXh0T3JUeXBlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VEZWZpbmVkQ29udGV4dDxUPihjb250ZXh0OiBDb250ZXh0T3JUeXBlPFQ+KTogTm9uTnVsbGFibGU8VD4ge1xuICAgIHJldHVybiBkZWZpbmVkKHVzZUNvbnRleHQoQ29udGV4dE9yVHlwZShjb250ZXh0KSksICgpID0+XG4gICAgICAgIGBObyBkZWZpbmVkIGNvbnRleHQgJHtcbiAgICAgICAgICAgIENvbnRleHRPclR5cGUoY29udGV4dCkuZGlzcGxheU5hbWVcbiAgICAgICAgfWApO1xufVxuXG5cbiIsImltcG9ydCB7Q29tcG9uZW50VHlwZSwgY3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7UGFydGlhbEtleXN9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuXG5leHBvcnQgdHlwZSBXaXRoRGVmYXVsdFByb3BzID0ge1xuXG4gICAgPFQ+KGRlZmF1bHRQcm9wczogVCk6XG4gICAgICAgIDxQPihjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8UCAmIFQ+KSA9PlxuICAgICAgICAgICAgKHByb3BzOiBQICYgUGFydGlhbDxUPikgPT4gUmVhY3RFbGVtZW50O1xuXG5cbiAgICA8UCwgSyBleHRlbmRzIGtleW9mIFA+KFxuICAgICAgICBjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8UD4sXG4gICAgICAgIGRlZmF1bHRQcm9wczogUGljazxQLCBLPlxuICAgICk6XG4gICAgICAgIChwcm9wczogUGFydGlhbEtleXM8UCwgSz4pID0+IFJlYWN0RWxlbWVudDtcblxuICAgIDxQLCBLIGV4dGVuZHMga2V5b2YgUD4oXG4gICAgICAgIGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxQPixcbiAgICAgICAgZ2V0RGVmYXVsdFByb3BzOiAocHJvcHM6IFBhcnRpYWw8UD4pID0+IFBpY2s8UCwgSz5cbiAgICApOlxuICAgICAgICAocHJvcHM6IFBhcnRpYWxLZXlzPFAsIEs+KSA9PiBSZWFjdEVsZW1lbnQ7XG59O1xuXG5mdW5jdGlvbiBfcGFydGlhbFByb3BzKFxuICAgIGNvbXBvbmVudCwgZGVmYXVsdFByb3BzLFxuICAgIGV4dHJhRGVmYXVsdFByb3BzP1xuKSB7XG5cblxuICAgIGlmICh0eXBlb2YgZGVmYXVsdFByb3BzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzKFxuICAgICAgICAgICAgY29tcG9uZW50LmRlZmF1bHRQcm9wcyA/PyB7fVxuICAgICAgICApXG4gICAgfVxuXG4gICAgaWYgKGNvbXBvbmVudC5kZWZhdWx0Q29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBfcGFydGlhbFByb3BzKGNvbXBvbmVudC5kZWZhdWx0Q29tcG9uZW50LFxuICAgICAgICAgICAgZGVmYXVsdFByb3BzLCB7XG4gICAgICAgICAgICAgICAgLi4uZXh0cmFEZWZhdWx0UHJvcHMsXG4gICAgICAgICAgICAgICAgLi4uY29tcG9uZW50LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coe2NvbXBvbmVudH0pO1xuICAgIGNvbnN0IGZ1bmMgPSBwcm9wcyA9PiB7XG4gICAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpXG4gICAgfTtcblxuICAgIGZ1bmMuZGVmYXVsdENvbXBvbmVudCA9IGNvbXBvbmVudDtcblxuICAgIGZ1bmMuZGlzcGxheU5hbWUgPSBjb21wb25lbnQuZGlzcGxheU5hbWUgPz9cbiAgICAgICAgY29tcG9uZW50Lm5hbWU7XG5cbiAgICBmdW5jLmRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uZXh0cmFEZWZhdWx0UHJvcHMsXG4gICAgICAgIC4uLmRlZmF1bHRQcm9wc1xuICAgIH07XG5cbiAgICByZXR1cm4gZnVuYztcbn1cblxuZXhwb3J0IGNvbnN0IHBhcnRpYWxQcm9wczogV2l0aERlZmF1bHRQcm9wcyA9XG4gICAgKGNvbXBvbmVudE9yUHJvcHMsIHByb3BzPyk6IGFueSA9PiB7XG4gICAgICAgIGlmIChwcm9wcylcbiAgICAgICAgICAgIHJldHVybiBfcGFydGlhbFByb3BzKGNvbXBvbmVudE9yUHJvcHMsIHByb3BzKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudCA9PiBfcGFydGlhbFByb3BzKGNvbXBvbmVudCwgY29tcG9uZW50T3JQcm9wcyk7XG4gICAgfTtcbiIsImltcG9ydCB7IENvbXBvbmVudCwgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Fzc2VydFwiO1xuaW1wb3J0IHsgV2Vha01hcEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hcC9tYXBGYWN0b3J5XCI7XG5pbXBvcnQgeyBMYXp5IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYXR0ZXJucy9sYXp5XCI7XG5pbXBvcnQgeyBFbXB0eUZyYWdtZW50IH0gZnJvbSBcIi4uL3V0aWxzL0VtcHR5RnJhZ21lbnRcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZpZXc8UCA9IHt9PiBleHRlbmRzIENvbXBvbmVudDxQLCBvYmplY3Q+IHtcbiAgYWJzdHJhY3QgcmVuZGVyVmlldygpOiBSZWFjdE5vZGU7XG5cbiAgaXNEaWRNb3VudCA9IGZhbHNlO1xuXG4gIGlzV2lsbFVubW91bnQgPSBmYWxzZTtcblxuICBjdXJyZW50U3RhdGUgPSB7fTtcblxuICBpc0RpZFNldFN0YXRlID0gZmFsc2U7XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5pc0RpZE1vdW50ID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuaXNXaWxsVW5tb3VudCA9IHRydWU7XG4gIH1cblxuICB1cGRhdGVWaWV3UHJvcHM/KHByZXZQcm9wczogUmVhZG9ubHk8UD4sIG5leHRQcm9wczogUmVhZG9ubHk8UD4pOiB2b2lkO1xuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShcbiAgICBuZXh0UHJvcHM6IFJlYWRvbmx5PFA+LFxuICAgIG5leHRTdGF0ZTogUmVhZG9ubHk8YW55PixcbiAgICBuZXh0Q29udGV4dDogYW55XG4gICk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnVwZGF0ZVZpZXdQcm9wcykge1xuICAgICAgdGhpcy51cGRhdGVWaWV3UHJvcHModGhpcy5wcm9wcywgbmV4dFByb3BzKTtcbiAgICAgIGlmICh0aGlzLmlzRGlkU2V0U3RhdGUpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJWaWV3KCkgPz8gRW1wdHlGcmFnbWVudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgc2V0Vmlld1N0YXRlS2V5IH0gZnJvbSBcIi4vc2V0Vmlld1N0YXRlS2V5XCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vVmlld1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gVmlld1N0YXRlKCk6IHsgKHRhcmdldDogVmlldzxhbnk+LCBrZXkpOiB2b2lkIH07XG5leHBvcnQgZnVuY3Rpb24gVmlld1N0YXRlPE1ldGhvZCBleHRlbmRzIFByb3BlcnR5S2V5PihcbiAgYmVmb3JlVXBkYXRlTWV0aG9kPzogTWV0aG9kXG4pOiB7XG4gICh0YXJnZXQ6IFZpZXc8YW55PiAmIFJlY29yZDxNZXRob2QsICgpID0+IGFueT4sIGtleSk6IHZvaWQ7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIFZpZXdTdGF0ZSh1cGRhdGVNZXRob2Q/KSB7XG4gIHJldHVybiAodGFyZ2V0OiBWaWV3PGFueT4sIGtleTogc3RyaW5nKSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICBnZXQodGhpczogVmlldykge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGVba2V5XTtcbiAgICAgIH0sXG4gICAgICBzZXQodGhpcywgdmFsdWUpIHtcbiAgICAgICAgaWYgKHNldFZpZXdTdGF0ZUtleSh0aGlzLCBrZXksIHZhbHVlKSkge1xuICAgICAgICAgIHVwZGF0ZU1ldGhvZCAmJiB0aGlzW3VwZGF0ZU1ldGhvZF0oKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9WaWV3XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWaWV3U3RhdGVLZXkodmlldzogVmlldywga2V5OiBzdHJpbmcsIHZhbHVlKSB7XG4gIGlmICh2aWV3LmN1cnJlbnRTdGF0ZVtrZXldID09PSB2YWx1ZSkgcmV0dXJuIGZhbHNlO1xuICB2aWV3LmN1cnJlbnRTdGF0ZVtrZXldID0gdmFsdWU7XG5cbiAgaWYgKHZpZXcuaXNEaWRNb3VudCAmJiAhdmlldy5pc0RpZFNldFN0YXRlKSB7XG4gICAgdmlldy5pc0RpZFNldFN0YXRlID0gdHJ1ZTtcbiAgICB2aWV3LnNldFN0YXRlKChzdGF0ZSkgPT4ge1xuICAgICAgdmlldy5pc0RpZFNldFN0YXRlID0gZmFsc2U7XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgLi4udmlldy5jdXJyZW50U3RhdGUgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuIiwiaW1wb3J0IHsgQXdhaXRlZCB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgU3lzdGVtQXBwIH0gZnJvbSBcIi4uL2NvbW1vbi9TeXN0ZW1BcHBcIjtcblxudHlwZSBMb2dpbkluZm9QYXlsb2FkID0gQXdhaXRlZDxcbiAgUmV0dXJuVHlwZTx0eXBlb2YgU3lzdGVtQXBwLnNlcnZpY2UuZ2V0TG9naW5JbmZvPlxuPjtcblxuZXhwb3J0IGNsYXNzIExvZ2luSW5mbyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBMb2dpbkluZm9QYXlsb2FkKSB7fVxuXG4gIGdldCBpc1N1Y2Nlc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucGF5bG9hZC50eXBlID09PSBcIlNVQ0NFU1NcIjtcbiAgfVxuICBnZXQgc3VjY2VzcygpOiBFeHRyYWN0PExvZ2luSW5mb1BheWxvYWQsIHsgdHlwZTogXCJTVUNDRVNTXCIgfT4gfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnBheWxvYWQudHlwZSA9PT0gXCJTVUNDRVNTXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLnBheWxvYWQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzQWRtaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VjY2Vzcz8uaXNBZG1pbiB8fCBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlQnJvd3Nlckhpc3RvcnkgfSBmcm9tIFwiaGlzdG9yeVwiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlTXVpU3lzdGVtIH0gZnJvbSBcIi4uLy4uL2Jyb3dzZXIvbXVpL2NyZWF0ZU11aVN5c3RlbVwiO1xuaW1wb3J0IHsgTXVpQWRtaW4gfSBmcm9tIFwiLi4vLi4vYnJvd3Nlci9tdWkvTXVpQWRtaW5cIjtcbmltcG9ydCB7IHVzZUVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vcmVhY3QvdXNlRW1pdHRlclwiO1xuaW1wb3J0IHsgUmVhY3RSb3V0ZXJDb250ZW50VmlldyB9IGZyb20gXCIuLi8uLi90eXBlcm91dGVyL1JlYWN0Um91dGVyQ29udGVudFZpZXdcIjtcbmltcG9ydCB7IFJlYWN0Um91dGVyVmlldyB9IGZyb20gXCIuLi8uLi90eXBlcm91dGVyL1JlYWN0Um91dGVyVmlld1wiO1xuaW1wb3J0IHsgU3lzdGVtQXBwIH0gZnJvbSBcIi4uL2NvbW1vbi9TeXN0ZW1BcHBcIjtcbmltcG9ydCB7IEFkbWluUm91dGVyUGx1Z2luIH0gZnJvbSBcIi4vYWRtaW4vU3lzdGVtQWRtaW5Sb3V0ZXJcIjtcbmltcG9ydCB7IExvZ2luSW5mbyB9IGZyb20gXCIuL0xvZ2luSW5mb1wiO1xuaW1wb3J0IHsgU3lzdGVtUm91dGVyIH0gZnJvbSBcIi4vU3lzdGVtUm91dGVyXCI7XG5cbmNvbnN0IHsgUHJvdmlkZXI6IE11aVN5c3RlbVByb3ZpZGVyIH0gPSBjcmVhdGVNdWlTeXN0ZW0oKTtcbmNvbnN0IGhpc3RvcnkgPSBjcmVhdGVCcm93c2VySGlzdG9yeSgpO1xuY29uc3QgY3VycmVudExvZ2luSW5mbyA9IFN5c3RlbUFwcC5zZXJ2aWNlLmdldExvZ2luSW5mbygpO1xuXG5jb25zdCBwbHVnaW5zID0gW1xuICBTeXN0ZW1Sb3V0ZXIuYXQoXCJhZG1pblwiKS5wbHVnaW4oKHIsIGMpID0+IHtcbiAgICBBZG1pblJvdXRlclBsdWdpbihyLCBjKTtcbiAgfSksXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpU3lzdGVtVmlldygpIHtcbiAgY29uc3QgZW1pdCA9IHVzZUVtaXR0ZXIoKTtcblxuICAvLyBlbWl0KExvZ2luSW5mbywge30pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjdXJyZW50TG9naW5JbmZvLnRoZW4obG9naW5JbmZvID0+IHtcbiAgICAgIGVtaXQobmV3IExvZ2luSW5mbyhsb2dpbkluZm8pKTtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIHZvaWQgKFxuICAgIDxNdWlTeXN0ZW1Qcm92aWRlcj5cbiAgICAgIDxSZWFjdFJvdXRlclZpZXdcbiAgICAgICAgaGlzdG9yeT17aGlzdG9yeX1cbiAgICAgICAgcm91dGVyPXtTeXN0ZW1Sb3V0ZXJ9XG4gICAgICAgIHBsdWdpbnM9e3BsdWdpbnN9XG4gICAgICA+XG4gICAgICAgIDxSZWFjdFJvdXRlckNvbnRlbnRWaWV3IC8+XG4gICAgICA8L1JlYWN0Um91dGVyVmlldz5cbiAgICA8L011aVN5c3RlbVByb3ZpZGVyPlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPE11aUFkbWluXG4gICAgICBtZW51PXt7XG4gICAgICAgIHRlc3Q6IHtcbiAgICAgICAgICB0aXRsZTogXCJUZXN0VGl0bGVcIixcbiAgICAgICAgICBpY29uOiByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2ljb25zL0FkZFwiKSxcbiAgICAgICAgICBjaGlsZHJlbjoge1xuICAgICAgICAgICAgZm9vOiB7XG4gICAgICAgICAgICAgIGNoaWxkcmVuOiB7XG4gICAgICAgICAgICAgICAgaGVsbG86IHt9LFxuICAgICAgICAgICAgICAgIHdvcmxkOiB7fSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXI6IHt9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59XG5cbi8qXG5cblN5c3RlbVBsdWdpbih7XG5cblxufSlcbiAqL1xuIiwiaW1wb3J0IHsgUmVhY3RSb3V0ZXIgfSBmcm9tIFwiLi4vLi4vdHlwZXJvdXRlci9SZWFjdFJvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIi4uLy4uL3R5cGVyb3V0ZXIvUm91dGVyXCI7XG5pbXBvcnQgeyBBZG1pblJvdXRlciB9IGZyb20gXCIuL2FkbWluL0FkbWluUm91dGVyXCI7XG5cbmV4cG9ydCBjb25zdCBTeXN0ZW1Sb3V0ZXIgPSBSb3V0ZXIoKS51c2UoUmVhY3RSb3V0ZXIpLnJvdXRlKHtcbiAgYWRtaW46IEFkbWluUm91dGVyLFxuICBsb2dpbjogUm91dGVyKCksXG59KTtcbiIsImltcG9ydCB7IFJlYWN0Um91dGVyIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVyb3V0ZXIvUmVhY3RSb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCIuLi8uLi8uLi90eXBlcm91dGVyL1JvdXRlclwiO1xuaW1wb3J0IHsgRGF0YU1hbmFnZXJSb3V0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9kYXRhLW1hbmFnZXIvRGF0YU1hbmFnZXJSb3V0ZXJcIjtcbmltcG9ydCB7IEFjbFVzZXJzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9zZXJ2ZXIvYWNsL0FjbFVzZXJzTWFuYWFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IEFkbWluUm91dGVyID0gUm91dGVyKClcbiAgLnVzZShSZWFjdFJvdXRlcilcbiAgLnJvdXRlKHtcbiAgICBhY2w6IERhdGFNYW5hZ2VyUm91dGVyKEFjbFVzZXJzTWFuYWdlciksXG4gIH0pO1xuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQsIEZyYWdtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBMYW5nIH0gZnJvbSBcIi4uLy4uLy4uL2xhbmcvTGFuZ1wiO1xuaW1wb3J0IHsgdXNlRW1pdHRlZCB9IGZyb20gXCIuLi8uLi8uLi9yZWFjdC91c2VFbWl0dGVkXCI7XG5pbXBvcnQgeyBMb2dpbkluZm8gfSBmcm9tIFwiLi4vTG9naW5JbmZvXCI7XG5pbXBvcnQgeyBBZG1pblJvdXRlciB9IGZyb20gXCIuL0FkbWluUm91dGVyXCI7XG5cbmV4cG9ydCBjb25zdCBBZG1pblJvdXRlclBsdWdpbiA9IEFkbWluUm91dGVyLnBsdWdpbihyID0+IHtcbiAgci53cmFwKHByb3BzID0+IHtcbiAgICBjb25zdCBsb2dpbkluZm8gPSB1c2VFbWl0dGVkKExvZ2luSW5mbyk7XG5cbiAgICBpZiAoIWxvZ2luSW5mbykge1xuICAgICAgcmV0dXJuIExhbmdgQUNDRVNTX0RFTklFRF9CRUNBVVNFX05PX0xPR0lOYDtcbiAgICB9XG4gICAgY29uc3QgeyBzdWNjZXNzIH0gPSBsb2dpbkluZm87XG4gICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICByZXR1cm4gTGFuZ2BBQ0NFU1NfREVOSUVEX0JFQ0FVU0VfTE9HSU5fSVNfTk9UX1NVQ0NFU1NgO1xuICAgIH1cbiAgICBpZiAoIXN1Y2Nlc3MuaXNBZG1pbikge1xuICAgICAgcmV0dXJuIExhbmdgQUNDRVNTX0RFTklFRF9CRUNBVVNFX0xPR0lOX0lTX05PVF9BRE1JTmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIDw+e3Byb3BzLmNoaWxkcmVufTwvPjtcbiAgfSk7XG4gIHIucmVuZGVyKCgpID0+IGNyZWF0ZUVsZW1lbnQoRnJhZ21lbnQsIG51bGwsIFwiaGVsbG9cIikpO1xufSk7XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgaGFuZGxlUnBjU2VydmljZSB9IGZyb20gXCIuLi8uLi90eXBlcnBjL1JwY1wiO1xuaW1wb3J0IHsgU3lzdGVtQXBwIH0gZnJvbSBcIi4uL2NvbW1vbi9TeXN0ZW1BcHBcIjtcbmltcG9ydCB7IE11aVN5c3RlbVZpZXcgfSBmcm9tIFwiLi9NdWlTeXN0ZW1WaWV3XCI7XG5cbmhhbmRsZVJwY1NlcnZpY2UoU3lzdGVtQXBwLCBwYXlsb2FkID0+IHtcbiAgcmV0dXJuIGZldGNoKFwiL3NlcnZpY2VcIiwge1xuICAgIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcbn0pO1xuXG5TeXN0ZW1BcHAuc2VydmljZS5nZXRMb2dpbkluZm8oKS50aGVuKGxvZ2luSW5mbyA9PiB7XG4gIGNvbnNvbGUubG9nKHsgbG9naW5JbmZvIH0pO1xufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIFJlYWN0RE9NLnJlbmRlcihcbiAgICBjcmVhdGVFbGVtZW50KE11aVN5c3RlbVZpZXcpLCAvL1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3lzdGVtXCIpXG4gICk7XG59KTtcbiIsImltcG9ydCB7IFJwY0ZuIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvcnBjLWZuL1JwY0ZuXCI7XG5pbXBvcnQgeyBScGNNYXAgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9ycGMtbWFwL1JwY01hcFwiO1xuXG5leHBvcnQgY29uc3QgQWRtaW5BcHAgPSBScGNNYXAoe1xuICAvLyBmbzogUnBjRm4oKSxcbn0pO1xuIiwiaW1wb3J0IHsgUGF5bG9hZCwgVHlwZVJlZiwgVHlwaW5nIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBEYXRhSW5wdXQgfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9pbnB1dC9kYXRhLWlucHV0L0RhdGFJbnB1dFwiO1xuaW1wb3J0IHsgUnBjRm4gfSBmcm9tIFwiLi4vLi4vdHlwZXJwYy9ycGMtZm4vUnBjRm5cIjtcbmltcG9ydCB7IFJwY01hcCB9IGZyb20gXCIuLi8uLi90eXBlcnBjL3JwYy1tYXAvUnBjTWFwXCI7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybVwiO1xuaW1wb3J0IHsgQWRtaW5BcHAgfSBmcm9tIFwiLi9BZG1pbkFwcFwiO1xuaW1wb3J0IHsgVXNlckFwcCB9IGZyb20gXCIuL1VzZXJBcHBcIjtcblxuZXhwb3J0IGRlY2xhcmUgY29uc3QgRGV2TG9naW5Vc2VyOiB1bmlxdWUgc3ltYm9sO1xuXG5leHBvcnQgY29uc3QgRGV2TG9naW4gPSBGb3JtKHtcbiAgaW5wdXQ6IERhdGFJbnB1dCh7XG4gICAgbG9hZFR5cGU6IFR5cGVSZWYoKCkgPT4gRGV2TG9naW5Vc2VyKSxcbiAgfSksXG4gIHZhbHVlOiBUeXBpbmc8eyBoZWxsb1RvOiBzdHJpbmcgfT4oKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgU3lzdGVtQXBwID0gUnBjTWFwKHtcbiAgbG9nb3V0OiBScGNGbigpLFxuXG4gIGdldExvZ2luSW5mbzogUnBjRm48XG4gICAgKCkgPT4gUGF5bG9hZDx7XG4gICAgICBGQUlMRUQ6IHt9O1xuICAgICAgU1VDQ0VTUzoge1xuICAgICAgICBmdWxsTmFtZTogc3RyaW5nO1xuICAgICAgICBpc0FkbWluOiBib29sZWFuO1xuICAgICAgfTtcbiAgICB9PlxuICA+KCksXG5cbiAgZGV2TG9naW46IERldkxvZ2luLFxuXG4gIGFkbWluOiBBZG1pbkFwcCxcblxuICB1c2VyOiBVc2VyQXBwLFxufSk7XG4iLCJpbXBvcnQgeyBScGNGbiB9IGZyb20gXCIuLi8uLi90eXBlcnBjL3JwYy1mbi9ScGNGblwiO1xuaW1wb3J0IHsgUnBjTWFwIH0gZnJvbSBcIi4uLy4uL3R5cGVycGMvcnBjLW1hcC9ScGNNYXBcIjtcblxuZXhwb3J0IGNvbnN0IFVzZXJBcHAgPSBScGNNYXAoe1xuICBmb286IFJwY0ZuKCksXG59KTtcbiIsImltcG9ydCB7IERhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvZGF0YS1tYW5hZ2VyL0RhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgeyBJbnB1dE1hcCB9IGZyb20gXCIuLi8uLi8uLi90eXBlcnBjL2lucHV0L2lucHV0LW1hcC9JbnB1dE1hcFwiO1xuaW1wb3J0IHsgSW5wdXRFcnJvckhvb2sgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9pbnB1dC9JbnB1dEVycm9ySG9va1wiO1xuaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvaW5wdXQvdGV4dC1pbnB1dC9UZXh0SW5wdXRcIjtcbmltcG9ydCB7IFJwY1BhcnRpYWxDb25maWcgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXJwYy9ScGNQYXJ0aWFsQ29uZmlnXCI7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVycGMvd2lkZ2V0L2Zvcm0vRm9ybVwiO1xuXG5jb25zdCBOYW1lSW5wdXQgPSBScGNQYXJ0aWFsQ29uZmlnKFRleHRJbnB1dCgpLCB7XG4gIG1pbkxlbmd0aDogMixcbiAgbWF4TGVuZ3RoOiAyMCxcbiAgcmVxdWlyZWQ6IHRydWUsXG59KTtcblxuY29uc3QgVXNlckJhc2ljSW5mb0lucHV0ID0gSW5wdXRNYXAoe1xuICBmaXJzdE5hbWU6IE5hbWVJbnB1dCxcbiAgbGFzdE5hbWU6IE5hbWVJbnB1dCxcbiAgbG9naW5OYW1lOiBJbnB1dEVycm9ySG9vazxcIkFMUkVBRFlfRVhJU1RTXCI+KCkoVGV4dElucHV0KCkpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBVc2VyQ29udGFjdEluZm9JbnB1dCA9IElucHV0TWFwKHtcbiAgcGhvbmVOdW1iZXI6IFRleHRJbnB1dCgpLFxuICBlbWFpbDogVGV4dElucHV0KCksXG59KTtcblxuZXhwb3J0IGNvbnN0IEFjbFVzZXJzTWFuYWdlciA9IERhdGFNYW5hZ2VyKHtcbiAgYWRkSW5wdXQ6IFVzZXJCYXNpY0luZm9JbnB1dCxcbiAgZWRpdElucHV0OiBJbnB1dE1hcCh7XG4gICAgYmFzZUluZm86IFVzZXJCYXNpY0luZm9JbnB1dCxcbiAgICBjb250YWN0SW5mbzogVXNlckNvbnRhY3RJbmZvSW5wdXQsXG4gIH0pLFxuICB0YWJsZVJvd1R5cGU6IHtcbiAgICBsb2dpbk5hbWU6IFN0cmluZyxcbiAgICBmaXJzdE5hbWU6IFN0cmluZyxcbiAgICBsYXN0TmFtZTogU3RyaW5nLFxuICB9LFxuICBlZGl0VGFiczoge1xuICAgIC8vIFRPRE86IGdyb3Vwc1xuICB9LFxufSk7XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBGcmFnbWVudCwgUmVhY3RFbGVtZW50LCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUxvYWRlciB9IGZyb20gXCIuLi9yZWFjdC91c2VMb2FkZXJcIjtcbmltcG9ydCB7IFdlYWtNYXBGYWN0b3J5IH0gZnJvbSBcIi4uL2NvbW1vbi9tYXAvbWFwRmFjdG9yeVwiO1xuaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBmbGF0VG9TZXEgfSBmcm9tIFwiLi4vY29tbW9uL2ZsYXRUb1NlcVwiO1xuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi4vcmVhY3QvcmVuZGVyZXJcIjtcbmltcG9ydCB7IEVtcHR5RnJhZ21lbnQgfSBmcm9tIFwiLi4vcmVhY3QvdXRpbHMvRW1wdHlGcmFnbWVudFwiO1xuaW1wb3J0IHsgUmVhY3RIb29rIH0gZnJvbSBcIi4uL3JlYWN0L3V0aWxzL1JlYWN0SG9va1wiO1xuaW1wb3J0IHsgUmVhY3RSb3V0ZXJMb2NhdGlvbiwgUmVhY3RSb3V0ZXJDb250ZXh0IH0gZnJvbSBcIi4vUmVhY3RSb3V0ZXJMb2NhdGlvblwiO1xuaW1wb3J0IHsgQW55Um91dGVyLCBSb3V0ZXIsIFRSb3V0ZXIsIFJvdXRlclBsdWdpbiB9IGZyb20gXCIuL1JvdXRlclwiO1xuXG5leHBvcnQgdHlwZSBUUmVhY3RSb3V0ZXIgPSBUUm91dGVyICYgeyByb3V0ZXJUeXBlOiB0eXBlb2YgUmVhY3RSb3V0ZXIgfTtcblxudHlwZSBXcmFwcGVyUHJvcHM8VCBleHRlbmRzIFRSZWFjdFJvdXRlcj4gPSB7XG4gIGxvY2F0aW9uOiBSZWFjdFJvdXRlckxvY2F0aW9uPFQ+O1xuICByb3V0ZTogUmVhY3RSb3V0ZXJDb250ZXh0O1xuICBjaGlsZHJlbjogUmVhY3RFbGVtZW50O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFJlYWN0Um91dGVyUHJvcHMgPSBXZWFrTWFwRmFjdG9yeTxBbnlSb3V0ZXIsIFJlYWN0Um91dGVyUHJvcHM+KFxuICAoKSA9PiAoe1xuICAgIHdyYXBwZXJzOiBbXSxcbiAgfSlcbik7XG5cbmV4cG9ydCB0eXBlIFJlYWN0Um91dGVyUHJvcHMgPSB7XG4gIHJlbmRlcmVyPzogUmVuZGVyZXI8UmVhY3RSb3V0ZXJDb250ZXh0PjtcbiAgZGVmYXVsdFJlbmRlcmVyPzogUmVuZGVyZXI8UmVhY3RSb3V0ZXJDb250ZXh0PjtcbiAgbG9hZFJlbmRlcmVyPzogUmVuZGVyZXI8UmVhY3RSb3V0ZXJDb250ZXh0PjtcbiAgd3JhcHBlcnM6IFJlbmRlcmVyPFdyYXBwZXJQcm9wczxhbnk+PltdO1xufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWFjdFJvdXRlciB7XG4gIGV4cG9ydCBsZXQgcmVhY3RQcm9wczogUmVhY3RSb3V0ZXJQcm9wcztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhY3RSb3V0ZXIsIFwicmVhY3RQcm9wc1wiLCB7XG4gICAgZ2V0KHRoaXM6IFJvdXRlcjxUUmVhY3RSb3V0ZXI+KTogUmVhY3RSb3V0ZXJQcm9wcyB7XG4gICAgICByZXR1cm4gZ2V0UmVhY3RSb3V0ZXJQcm9wcyh0aGlzKTtcbiAgICB9LFxuICB9KTtcblxuICBleHBvcnQgZnVuY3Rpb24gd3JhcDxUIGV4dGVuZHMgVFJlYWN0Um91dGVyPihcbiAgICB0aGlzOiBSb3V0ZXI8VD4sXG4gICAgd3JhcHBlcjogUmVuZGVyZXI8V3JhcHBlclByb3BzPFQ+PlxuICApOiBSb3V0ZXI8VD4ge1xuICAgIHRoaXMucmVhY3RQcm9wcy53cmFwcGVycy5wdXNoKHdyYXBwZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckRlZmF1bHQ8VCBleHRlbmRzIFRSZWFjdFJvdXRlcj4oXG4gICAgdGhpczogUm91dGVyPFQ+LFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjxSZWFjdFJvdXRlckNvbnRleHQ8VD4gJiB7IHR5cGU6IFwiZGVmYXVsdFwiIH0+XG4gICk6IFJvdXRlcjxUPiB7XG4gICAgdGhpcy5yZWFjdFByb3BzLmRlZmF1bHRSZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcjxUIGV4dGVuZHMgVFJlYWN0Um91dGVyPihcbiAgICB0aGlzOiBSb3V0ZXI8VD4sXG4gICAgY29tcG9uZW50OiBSZW5kZXJlcjxSZWFjdFJvdXRlckNvbnRleHQ8VD4+XG4gICk6IFJvdXRlcjxUPiB7XG4gICAgdGhpcy5yZWFjdFByb3BzLnJlbmRlcmVyID0gUmVuZGVyZXIoY29tcG9uZW50KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiByZW5kZXJPbkxvYWQ8VCBleHRlbmRzIFRSZWFjdFJvdXRlcj4oXG4gICAgdGhpczogUm91dGVyPFQ+LFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjxSZWFjdFJvdXRlckNvbnRleHQ+XG4gICk6IFJvdXRlcjxUPiB7XG4gICAgdGhpcy5yZWFjdFByb3BzLmxvYWRSZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxvYWRBbmRSZW5kZXI8VCBleHRlbmRzIFRSZWFjdFJvdXRlcj4oXG4gICAgdGhpczogUm91dGVyPFQ+LFxuICAgIGxvYWRSZW5kZXJlcjogKFxuICAgICAgcHJvcHM6IFJlYWN0Um91dGVyQ29udGV4dDxUPlxuICAgICkgPT4gQXdhaXRhYmxlPCgpID0+IFJlYWN0RWxlbWVudD5cbiAgKTogUm91dGVyPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXIocHJvcHMgPT4ge1xuICAgICAgY29uc3QgY29tcG9uZW50ID0gdXNlTG9hZGVyKCgpID0+IGxvYWRSZW5kZXJlcihwcm9wcyksIFtwcm9wcy5sb2NhdGlvbl0pO1xuXG4gICAgICBpZiAoY29tcG9uZW50KSByZXR1cm4gY3JlYXRlRWxlbWVudChjb21wb25lbnQpO1xuXG4gICAgICBjb25zdCByZW5kZXJPbkxvYWQgPSBmbGF0VG9TZXE8Um91dGVyPFRSZWFjdFJvdXRlcj4+KFxuICAgICAgICB0aGlzLFxuICAgICAgICByb3V0ZXIgPT4gcm91dGVyLnBhcmVudFxuICAgICAgKVxuICAgICAgICAubWFwKHJvdXRlciA9PiByb3V0ZXI/LnJlYWN0UHJvcHMubG9hZFJlbmRlcmVyKVxuICAgICAgICAuZmluZChyZW5kZXJlciA9PiAhIXJlbmRlcmVyKTtcblxuICAgICAgaWYgKHJlbmRlck9uTG9hZCkgcmV0dXJuIHJlbmRlck9uTG9hZChwcm9wcyk7XG5cbiAgICAgIHJldHVybiBFbXB0eUZyYWdtZW50O1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZsYXRUb1NlcSB9IGZyb20gXCIuLi9jb21tb24vZmxhdFRvU2VxXCI7XG5pbXBvcnQgeyBFbXB0eUZyYWdtZW50IH0gZnJvbSBcIi4uL3JlYWN0L3V0aWxzL0VtcHR5RnJhZ21lbnRcIjtcbmltcG9ydCB7IHVzZURlZmluZWRDb250ZXh0IH0gZnJvbSBcIi4uL3JlYWN0L3V0aWxzL2hvb2tzL3VzZURlZmluZWRDb250ZXh0XCI7XG5pbXBvcnQgeyBnZXRSZWFjdFJvdXRlclByb3BzIH0gZnJvbSBcIi4vUmVhY3RSb3V0ZXJcIjtcbmltcG9ydCB7IFJlYWN0Um91dGVyQ29udGV4dCB9IGZyb20gXCIuL1JlYWN0Um91dGVyTG9jYXRpb25cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWN0Um91dGVyQ29udGVudFZpZXcoKSB7XG4gIHJldHVybiByZW5kZXJSZWFjdFJvdXRlckNvbnRhaW5lcih1c2VEZWZpbmVkQ29udGV4dChSZWFjdFJvdXRlckNvbnRleHQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclJlYWN0Um91dGVyQ29udGFpbmVyKHJvdXRlUHJvcHM6IFJlYWN0Um91dGVyQ29udGV4dCkge1xuICBjb25zdCByb3V0ZXJQcm9wcyA9IGdldFJlYWN0Um91dGVyUHJvcHMocm91dGVQcm9wcy5sb2NhdGlvbi5yb3V0ZXIpO1xuXG4gIGxldCBjaGlsZHJlbjogUmVhY3RFbGVtZW50O1xuXG4gIGlmIChyb3V0ZXJQcm9wcy5yZW5kZXJlcikge1xuICAgIGNoaWxkcmVuID0gcm91dGVyUHJvcHMucmVuZGVyZXIocm91dGVQcm9wcyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGVmYXVsdFJlbmRlcmVyID0gZmxhdFRvU2VxKFxuICAgICAgcm91dGVQcm9wcy5sb2NhdGlvbixcbiAgICAgIGxvY2F0aW9uID0+IGxvY2F0aW9uLnBhcmVudFxuICAgIClcbiAgICAgIC5tYXAobG9jYXRpb24gPT4gbG9jYXRpb24ucm91dGVyLnJlYWN0UHJvcHMuZGVmYXVsdFJlbmRlcmVyKVxuICAgICAgLmZpbmQoZGVmYXVsdFJlbmRlcmVyID0+ICEhZGVmYXVsdFJlbmRlcmVyKTtcblxuICAgIGlmIChkZWZhdWx0UmVuZGVyZXIpIHtcbiAgICAgIGNoaWxkcmVuID0gZGVmYXVsdFJlbmRlcmVyKHJvdXRlUHJvcHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZHJlbiA9IEVtcHR5RnJhZ21lbnQ7XG4gICAgfVxuICB9XG5cbiAgZm9yIChcbiAgICBsZXQgbG9jYXRpb24gPSByb3V0ZVByb3BzLmxvY2F0aW9uO1xuICAgIGxvY2F0aW9uO1xuICAgIGxvY2F0aW9uID0gbG9jYXRpb24ucGFyZW50XG4gICkge1xuICAgIGNvbnN0IHByb3BzID0gZ2V0UmVhY3RSb3V0ZXJQcm9wcyhsb2NhdGlvbi5yb3V0ZXIpO1xuICAgIGNvbnN0IHdyYXBwZXJQcm9wcyA9IHtcbiAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgIHJvdXRlOiByb3V0ZVByb3BzLFxuICAgICAgY2hpbGRyZW4sXG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IHdyYXBwZXIgb2YgcHJvcHMud3JhcHBlcnMpIHtcbiAgICAgIGNoaWxkcmVuID0gY3JlYXRlRWxlbWVudCh3cmFwcGVyLCB3cmFwcGVyUHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjaGlsZHJlbjtcbn1cbi8vIE91dGVyV3JhcHBlcnNcbi8vIElubmVyV3JhcHBlcnNcbiIsImV4cG9ydCBjbGFzcyBSZWFjdFJvdXRlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG59XG4iLCJpbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSBcImhpc3RvcnlcIjtcbmltcG9ydCB7IFdpdGhNZXRhVHlwZSB9IGZyb20gXCIuLi9jb21tb24vTWV0YVR5cGVcIjtcbmltcG9ydCB7IGpvaW5VcmwgfSBmcm9tIFwiLi9qb2luVXJsXCI7XG5pbXBvcnQgeyBMYXp5IH0gZnJvbSBcIi4uL2NvbW1vbi9wYXR0ZXJucy9sYXp5XCI7XG5pbXBvcnQge1xuICBBc3NpZ24sXG4gIEhhc0tleXMsXG4gIERlZmF1bHRJZk5ldmVyLFxuICBQbHVja1JlcXVpcmVkLFxuICBJcyxcbiAgSWYsXG4gIE5vdCxcbiAgSXNOZXZlcixcbn0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBjcmVhdGVVbmRlZmluZWRDb250ZXh0IH0gZnJvbSBcIi4uL3JlYWN0L3V0aWxzL2hvb2tzL2NyZWF0ZVVuZGVmaW5lZENvbnRleHRcIjtcbmltcG9ydCB7IHVzZURlZmluZWRDb250ZXh0IH0gZnJvbSBcIi4uL3JlYWN0L3V0aWxzL2hvb2tzL3VzZURlZmluZWRDb250ZXh0XCI7XG5pbXBvcnQgeyBnZXROZXh0UGF0aCB9IGZyb20gXCIuLi9jb21tb24vZ2V0TmV4dFBhdGhcIjtcbmltcG9ydCB7IFRSZWFjdFJvdXRlciB9IGZyb20gXCIuL1JlYWN0Um91dGVyXCI7XG5pbXBvcnQgeyBSZWFjdFJvdXRlckVycm9yIH0gZnJvbSBcIi4vUmVhY3RSb3V0ZXJFcnJvclwiO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJBdCwgUm91dGVyVHlwZSwgVFJvdXRlciB9IGZyb20gXCIuL1JvdXRlclwiO1xuXG5leHBvcnQgdHlwZSBSb3V0ZXJBdEFyZ3M8UD4gPVxuICB8IFtSZWNvcmQ8a2V5b2YgUCwgc3RyaW5nIHwgbnVtYmVyPl1cbiAgfCBJZjxOb3Q8SGFzS2V5czxQPj4sIFt1bmRlZmluZWQ/XT47XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhY3RSb3V0ZXJMb2NhdGlvbjxcbiAgVCBleHRlbmRzIFRSZWFjdFJvdXRlclxuPiBleHRlbmRzIFdpdGhNZXRhVHlwZTx7XG4gICAgVFJvdXRlcjogVDtcbiAgfT4ge31cblxuZXhwb3J0IGNsYXNzIFJlYWN0Um91dGVyTG9jYXRpb248VCBleHRlbmRzIFRSZWFjdFJvdXRlciA9IFRSZWFjdFJvdXRlcj4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgX3BhcmVudDogUmVhY3RSb3V0ZXJMb2NhdGlvbjxhbnk+IHwgbnVsbCxcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nIHwgbnVsbCxcbiAgICBwdWJsaWMgaGlzdG9yeTogSGlzdG9yeSxcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXI8VD4sXG4gICAgcHVibGljIHBhcmFtczogVFtcInBhcmFtc1wiXVxuICApIHt9XG5cbiAgZ2V0IHBhcmVudCgpOiBEZWZhdWx0SWZOZXZlcjxcbiAgICBSZWFjdFJvdXRlckxvY2F0aW9uPEV4dHJhY3Q8UGx1Y2tSZXF1aXJlZDxULCBcInBhcmVudFwiPiwgVFJlYWN0Um91dGVyPj4sXG4gICAgbnVsbFxuICA+IHtcbiAgICByZXR1cm4gPGFueT50aGlzLl9wYXJlbnQ7XG4gIH1cblxuICBnZXQgcm9vdCgpOiBSZWFjdFJvdXRlckxvY2F0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50Py5yb290IHx8IHRoaXM7XG4gIH1cblxuICAvLyBzdGFjazogeyBbSyBpbiBrZXlvZiBUWydzdGFjayddXTogUm91dGVyPFRbJ3N0YWNrJ11bS10+IH1cblxuICBhdFN0YWNrPEsgZXh0ZW5kcyBrZXlvZiBUW1wic3RhY2tcIl0+KFxuICAgIG5hbWU6IHN0cmluZyAmIEtcbiAgKTogUmVhY3RSb3V0ZXJMb2NhdGlvbjxcbiAgICBUW1wic3RhY2tcIl1bS10gJiB7XG4gICAgICByb3V0ZXJUeXBlOiBUW1wicm91dGVyVHlwZVwiXTtcbiAgICB9XG4gID4ge1xuICAgIGlmICh0aGlzLm5hbWUgPT09IG5hbWUpIHJldHVybiA8YW55PnRoaXM7XG4gICAgaWYgKCF0aGlzLl9wYXJlbnQpXG4gICAgICB0aHJvdyBuZXcgUmVhY3RSb3V0ZXJFcnJvcihgTm8gJHtuYW1lfSBhdCByb3V0ZXIgc3RhY2suYCk7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudC5hdFN0YWNrKG5hbWUpO1xuICB9XG5cbiAgQExhenkoKSBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgIGxldCBwYXRoOiBzdHJpbmc7XG4gICAgaWYgKHRoaXMubmFtZSkge1xuICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICBwYXRoID0gam9pblVybCh0aGlzLl9wYXJlbnQucGF0aCwgdGhpcy5uYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhdGggPSBcIi9cIiArIHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGF0aCA9IHRoaXMuX3BhcmVudD8ucGF0aCB8fCBcIi9cIjtcbiAgICB9XG4gICAgZm9yIChsZXQgbmFtZSBvZiB0aGlzLnJvdXRlci5wYXJhbXMpIHtcbiAgICAgIHBhdGggPSBqb2luVXJsKHBhdGgsIFN0cmluZyh0aGlzLnBhcmFtc1tuYW1lXSkpO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIC8vXG5cbiAgYXQ8SyBleHRlbmRzIGtleW9mIFRbXCJjaGlsZHJlblwiXT4oXG4gICAgbmFtZTogSyxcbiAgICAuLi5hcmdzOiBSb3V0ZXJBdEFyZ3M8VFtcImNoaWxkcmVuXCJdW0tdW1wicGFyYW1zXCJdPlxuICApOiAvLyB8XG4gIFJlYWN0Um91dGVyTG9jYXRpb248Um91dGVyVHlwZTxSb3V0ZXJBdDxULCBLPj4+O1xuICBhdChuYW1lLCAuLi5bcGFyYW1zXTogYW55W10pOiBhbnkge1xuICAgIHJldHVybiBuZXcgUmVhY3RSb3V0ZXJMb2NhdGlvbihcbiAgICAgIHRoaXMsXG4gICAgICBuYW1lLFxuICAgICAgdGhpcy5oaXN0b3J5LFxuICAgICAgdGhpcy5yb3V0ZXIuYXQobmFtZSksXG4gICAgICBwYXJhbXMgfHwge31cbiAgICApO1xuICB9XG5cbiAgcHVzaCgpIHtcbiAgICB0aGlzLmhpc3RvcnkucHVzaCh0aGlzLnBhdGgpO1xuICB9XG5cbiAgcm91dGUocGF0aDogc3RyaW5nKTogUmVhY3RSb3V0ZXJDb250ZXh0IHtcbiAgICBjb25zdCByb290UGF0aCA9IHBhdGg7XG4gICAgbGV0IGxvY2F0aW9uOiBSZWFjdFJvdXRlckxvY2F0aW9uID0gdGhpcztcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgbmV4dFBhdGggPSBwYXRoO1xuICAgICAgbGV0IG5hbWU6IHN0cmluZztcbiAgICAgIFtuYW1lLCBwYXRoXSA9IGdldE5leHRQYXRoKHBhdGgpO1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVybiB7IHR5cGU6IFwiaW5kZXhcIiwgbG9jYXRpb24sIHJvb3RQYXRoIH07XG4gICAgICB9XG4gICAgICBpZiAoIShuYW1lIGluIGxvY2F0aW9uLnJvdXRlci5jaGlsZHJlbikpIHtcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogXCJkZWZhdWx0XCIsIGxvY2F0aW9uLCByb290UGF0aCwgbmV4dFBhdGggfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJvdXRlciA9IGxvY2F0aW9uLnJvdXRlci5hdChuYW1lKTtcbiAgICAgIGxldCBwYXJhbXMgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiByb3V0ZXIucGFyYW1zKSB7XG4gICAgICAgIGxldCB2YWx1ZTogc3RyaW5nO1xuICAgICAgICBbdmFsdWUsIHBhdGhdID0gZ2V0TmV4dFBhdGgocGF0aCk7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4geyB0eXBlOiBcInBhcmFtXCIsIG5hbWUsIGxvY2F0aW9uLCByb290UGF0aCB9O1xuICAgICAgICB9XG4gICAgICAgIHBhcmFtc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgbG9jYXRpb24gPSBuZXcgUmVhY3RSb3V0ZXJMb2NhdGlvbihcbiAgICAgICAgbG9jYXRpb24sXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGxvY2F0aW9uLmhpc3RvcnksXG4gICAgICAgIHJvdXRlcixcbiAgICAgICAgcGFyYW1zXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUmVhY3RSb3V0ZXJDb250ZXh0ID0gY3JlYXRlVW5kZWZpbmVkQ29udGV4dDxSZWFjdFJvdXRlckNvbnRleHQ+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSZWFjdFJvdXRlckNvbnRleHQ8VCBleHRlbmRzIFRSb3V0ZXI+KCk6IFJlYWN0Um91dGVyQ29udGV4dDxcbiAgVCAmIFRSZWFjdFJvdXRlclxuPiB7XG4gIHJldHVybiA8YW55PnVzZURlZmluZWRDb250ZXh0KFJlYWN0Um91dGVyQ29udGV4dCk7XG59XG5cbmV4cG9ydCB0eXBlIFJlYWN0Um91dGVyQ29udGV4dDxcbiAgVCBleHRlbmRzIFRSZWFjdFJvdXRlciA9IFRSZWFjdFJvdXRlcixcbiAgQmFzZSA9IHtcbiAgICByb290UGF0aDogc3RyaW5nO1xuICAgIGxvY2F0aW9uOiBSZWFjdFJvdXRlckxvY2F0aW9uPFQ+O1xuICAgIC8vIG5leHQ6IFJlYWN0RWxlbWVudFxuICAgIC8vIGJhY2s6IFJlYWN0RWxlbWVudFxuICAgIC8vIGRpcmVjdGlvbjogXCJiYWNrXCJ8XCJuZXh0XCJcbiAgfVxuPiA9XG4gIHwgKEJhc2UgJiB7IHR5cGU6IFwiaW5kZXhcIiB9KVxuICB8IChCYXNlICYgeyB0eXBlOiBcImRlZmF1bHRcIjsgbmV4dFBhdGg6IHN0cmluZyB9KVxuICB8IChCYXNlICYgeyB0eXBlOiBcInBhcmFtXCI7IG5hbWU6IHN0cmluZyB9KTtcbiIsImltcG9ydCB7IEhpc3RvcnkgfSBmcm9tIFwiSGlzdG9yeVwiO1xuaW1wb3J0IHtcbiAgY3JlYXRlRWxlbWVudCxcbiAgUmVhY3RFbGVtZW50LFxuICBSZWFjdE5vZGUsXG4gIHVzZUVmZmVjdCxcbiAgdXNlTWVtbyxcbiAgdXNlU3RhdGUsXG59IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgSWYsIElzRW1wdHlPYmplY3QsIFBhcnRpYWxVbmRlZmluZWRLZXlzIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBUUmVhY3RSb3V0ZXIgfSBmcm9tIFwiLi9SZWFjdFJvdXRlclwiO1xuaW1wb3J0IHsgUmVhY3RSb3V0ZXJMb2NhdGlvbiwgUmVhY3RSb3V0ZXJDb250ZXh0IH0gZnJvbSBcIi4vUmVhY3RSb3V0ZXJMb2NhdGlvblwiO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJQbHVnaW4gfSBmcm9tIFwiLi9Sb3V0ZXJcIjtcblxuZXhwb3J0IHR5cGUgUmVhY3RSb3V0ZXJWaWV3UHJvcHM8VCBleHRlbmRzIFRSZWFjdFJvdXRlcj4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAge1xuICAgIGNvbnRleHQ6IFRbXCJjb250ZXh0XCJdIHwgSWY8SXNFbXB0eU9iamVjdDxUW1wiY29udGV4dFwiXT4sIHVuZGVmaW5lZD47XG4gIH0sXG4gIHtcbiAgICBoaXN0b3J5OiBIaXN0b3J5O1xuICAgIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG4gICAgcm91dGVyOiBSb3V0ZXI8VD47XG4gICAgbGlzdGVuPzogKGNhbGxiYWNrOiAocGF0aDogc3RyaW5nKSA9PiB2b2lkKSA9PiAoKSA9PiB2b2lkO1xuICAgIHBhdGg/OiBzdHJpbmc7XG4gICAgcGx1Z2lucz86IFJvdXRlclBsdWdpbjxUPltdO1xuICB9XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gUmVhY3RSb3V0ZXJWaWV3PFQgZXh0ZW5kcyBUUmVhY3RSb3V0ZXI+KFxuICBwcm9wczogUmVhY3RSb3V0ZXJWaWV3UHJvcHM8VD5cbikge1xuICBjb25zdCB7IHBsdWdpbnMsIHJvdXRlcjogdW5ib3VuZFJvdXRlciwgY29udGV4dCwgaGlzdG9yeSB9ID0gPFxuICAgIFJlYWN0Um91dGVyVmlld1Byb3BzPFRSZWFjdFJvdXRlcj5cbiAgPnByb3BzO1xuXG4gIGNvbnN0IHJvdXRlciA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghcGx1Z2lucykgcmV0dXJuIHVuYm91bmRSb3V0ZXI7XG4gICAgcmV0dXJuIHVuYm91bmRSb3V0ZXIuYmluZChjb250ZXh0IHx8IHt9LCBwbHVnaW5zKTtcbiAgfSwgW3VuYm91bmRSb3V0ZXIsIHBsdWdpbnNdKTtcblxuICBjb25zdCBbcm91dGUsIHNldFJvdXRlXSA9IHVzZVN0YXRlPFJlYWN0Um91dGVyQ29udGV4dD4oKCkgPT5cbiAgICBnZXRSb3V0ZUZyb21QYXRoKGhpc3RvcnkubG9jYXRpb24ucGF0aG5hbWUpXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocm91dGUubG9jYXRpb24ucm91dGVyICE9PSByb3V0ZXIpIHtcbiAgICAgIHNldFJvdXRlKGdldFJvdXRlRnJvbVBhdGgoaGlzdG9yeS5sb2NhdGlvbi5wYXRobmFtZSkpO1xuICAgIH1cbiAgfSwgW3JvdXRlcl0pO1xuXG4gIHVzZUVmZmVjdChcbiAgICAoKSA9PlxuICAgICAgaGlzdG9yeS5saXN0ZW4obG9jYXRpb24gPT4ge1xuICAgICAgICBzZXRSb3V0ZShnZXRSb3V0ZUZyb21QYXRoKGxvY2F0aW9uLnBhdGhuYW1lKSk7XG4gICAgICB9KSxcbiAgICBbaGlzdG9yeSwgcm91dGVyXVxuICApO1xuXG4gIGxldCBjaGlsZHJlbjogUmVhY3RFbGVtZW50ID0gY3JlYXRlRWxlbWVudChSZWFjdFJvdXRlckNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICB2YWx1ZTogcm91dGUsXG4gICAgY2hpbGRyZW46IHByb3BzLmNoaWxkcmVuLFxuICB9KTtcblxuICByZXR1cm4gY2hpbGRyZW47XG5cbiAgZnVuY3Rpb24gZ2V0Um91dGVGcm9tUGF0aChwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFJlYWN0Um91dGVyTG9jYXRpb248YW55PihudWxsLCBudWxsLCBoaXN0b3J5LCByb3V0ZXIsIHt9KS5yb3V0ZShcbiAgICAgIHBhdGhcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNZXRhVHlwZSwgV2l0aE1ldGFUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9NZXRhVHlwZVwiO1xuaW1wb3J0IHsgZGVmaW5lZCB9IGZyb20gXCIuLi9jb21tb24vb2JqZWN0L2RlZmluZWRcIjtcbmltcG9ydCB7XG4gIEFzc2lnbixcbiAgRGVmYXVsdElmTmV2ZXIsXG4gIEV4cGVjdCxcbiAgSXNOZXZlcixcbiAgTm9uTnVsbGFibGVBdCxcbiAgUGx1Y2tSZXF1aXJlZCxcbn0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBpbnNwZWN0IH0gZnJvbSBcIi4uL2xvZ2dpbmdcIjtcblxuZXhwb3J0IHR5cGUgVFJvdXRlciA9IHtcbiAgcGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuXG4gIGNoaWxkcmVuOiBSZWNvcmQ8c3RyaW5nLCBUUm91dGVyPjtcblxuICBzdGFjazogUmVjb3JkPHN0cmluZywgVFJvdXRlcj47XG5cbiAgcm91dGVyVHlwZTogdHlwZW9mIFJvdXRlclR5cGU7XG5cbiAgY29udGV4dDogb2JqZWN0O1xufTtcblxuZXhwb3J0IHR5cGUgVEVtcHR5Um91dGVyID0gRXhwZWN0PFxuICBUUm91dGVyLFxuICB7XG4gICAgcGFyYW1zOiB7fTtcbiAgICBjaGlsZHJlbjoge307XG4gICAgc3RhY2s6IHt9O1xuICAgIHJvdXRlclR5cGU6IHR5cGVvZiBSb3V0ZXJUeXBlO1xuICAgIGNvbnRleHQ6IHt9O1xuICB9XG4+O1xuXG5leHBvcnQgbmFtZXNwYWNlIFRFbXB0eVJvdXRlciB7XG4gIGV4cG9ydCB0eXBlIFdpdGhDaGlsZHJlbjxDIGV4dGVuZHMgVFJvdXRlcltcImNoaWxkcmVuXCJdPiA9IFRSb3V0ZXIgJiB7XG4gICAgY2hpbGRyZW46IEM7XG4gIH07XG5cbiAgZXhwb3J0IHR5cGUgV2l0aFBhcmFtczxcbiAgICBLIGV4dGVuZHMgc3RyaW5nLFxuICAgIEMgZXh0ZW5kcyBUUm91dGVyW1wiY2hpbGRyZW5cIl0gPSB7fVxuICA+ID0gVFJvdXRlciAmIHtcbiAgICBjaGlsZHJlbjogQztcbiAgICBwYXJhbXM6IFJlY29yZDxLLCBhbnk+O1xuICB9O1xufVxuXG5leHBvcnQgdHlwZSBSb3V0ZXI8VCBleHRlbmRzIFRSb3V0ZXIgPSBURW1wdHlSb3V0ZXI+ID0gV2l0aE1ldGFUeXBlPHtcbiAgVFJvdXRlcjogVDtcbn0+ICYge1xuICBwYXJhbXM6IHN0cmluZ1tdO1xuXG4gIHJvdXRlclR5cGU6IG9iamVjdDtcblxuICBjaGlsZHJlbjogUmVjb3JkPHN0cmluZywgUm91dGVyPFRSb3V0ZXIgJiBQaWNrPFQsIFwicm91dGVyVHlwZVwiPj4+O1xuXG4gIHBsdWdpbnM6IFJvdXRlclBsdWdpbjxUPltdO1xuXG4gIHBhcmVudD86IFJvdXRlcjxBc3NpZ248VCwgeyBwYXJhbXM6IGFueSB9Pj47XG5cbiAgbmFtZT86IHN0cmluZztcbn0gJiBUW1wicm91dGVyVHlwZVwiXTtcblxuZXhwb3J0IGZ1bmN0aW9uIFJvdXRlcigpOiBSb3V0ZXI7XG5leHBvcnQgZnVuY3Rpb24gUm91dGVyPFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBBbnlSb3V0ZXI+PihcbiAgY2hpbGRyZW46IFRcbik6IFJvdXRlcjxcbiAgVEVtcHR5Um91dGVyICYge1xuICAgIGNoaWxkcmVuOiB7IFtLIGluIGtleW9mIFRdOiBSb3V0ZXJUeXBlPFRbS10+IH07XG4gIH1cbj47XG5leHBvcnQgZnVuY3Rpb24gUm91dGVyPFxuICBLIGV4dGVuZHMgc3RyaW5nLFxuICBUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgQW55Um91dGVyPiA9IHt9XG4+KFxuICBwYXJhbXM6IEtbXSxcbiAgY2hpbGRyZW4/OiBUXG4pOiBSb3V0ZXI8XG4gIFRFbXB0eVJvdXRlciAmIHtcbiAgICBjaGlsZHJlbjogeyBbSyBpbiBrZXlvZiBUXTogUm91dGVyVHlwZTxUW0tdPiB9O1xuICAgIHBhcmFtczogUmVjb3JkPEssIHN0cmluZz47XG4gIH1cbj47XG5leHBvcnQgZnVuY3Rpb24gUm91dGVyKC4uLmFyZ3MpOiBBbnlSb3V0ZXIge1xuICBsZXQgcGFyYW1zOiBzdHJpbmdbXTtcbiAgbGV0IGNoaWxkcmVuOiBSZWNvcmQ8c3RyaW5nLCBBbnlSb3V0ZXI+O1xuXG4gIGlmIChhcmdzLmxlbmd0aCA9PT0gMikge1xuICAgIFtwYXJhbXMsIGNoaWxkcmVuXSA9IGFyZ3M7XG4gIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzWzBdKSkge1xuICAgICAgW3BhcmFtcywgY2hpbGRyZW5dID0gW2FyZ3NbMF0sIHt9XTtcbiAgICB9IGVsc2Uge1xuICAgICAgW3BhcmFtcywgY2hpbGRyZW5dID0gW1tdLCBhcmdzWzBdXTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgW3BhcmFtcywgY2hpbGRyZW5dID0gW1tdLCB7fV07XG4gIH1cblxuICBjb25zdCByb3V0ZXJUeXBlID0gT2JqZWN0LmNyZWF0ZShSb3V0ZXJUeXBlKTtcblxuICByZXR1cm4gT2JqZWN0LnNldFByb3RvdHlwZU9mKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgcGFyYW1zLFxuICAgICAgcm91dGVyVHlwZSxcbiAgICAgIHBsdWdpbnM6IFtdLFxuICAgIH0sXG4gICAgcm91dGVyVHlwZVxuICApO1xufVxuXG5leHBvcnQgdHlwZSBBbnlSb3V0ZXIgPSBSb3V0ZXI8VFJvdXRlcj47XG5cbmV4cG9ydCB0eXBlIFJvdXRlclR5cGU8VCBleHRlbmRzIEFueVJvdXRlcj4gPSBNZXRhVHlwZTxUPltcIlRSb3V0ZXJcIl07XG5cbmV4cG9ydCB0eXBlIFJvdXRlckF0PFQgZXh0ZW5kcyBUUm91dGVyLCBLIGV4dGVuZHMga2V5b2YgVFtcImNoaWxkcmVuXCJdPiA9IFJvdXRlcjxcbiAgVFtcImNoaWxkcmVuXCJdW0tdICYge1xuICAgIHBhcmVudDogVDtcbiAgICByb3V0ZXJUeXBlOiBUW1wicm91dGVyVHlwZVwiXTtcbiAgICBzdGFjazogVFtcInN0YWNrXCJdICYgUmVjb3JkPEssIFRbXCJjaGlsZHJlblwiXVtLXT47XG4gICAgcm9vdDogRGVmYXVsdElmTmV2ZXI8UGx1Y2tSZXF1aXJlZDxULCBcInJvb3RcIj4sIFQ+O1xuICAgIGNvbnRleHQ6IFRbXCJjb250ZXh0XCJdO1xuICB9XG4+O1xuXG5leHBvcnQgbmFtZXNwYWNlIFJvdXRlclR5cGUge1xuICBleHBvcnQgdHlwZSBSb3V0ZTxVIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgVFJvdXRlcj4+ID0ge1xuICAgIGNoaWxkcmVuOiB7IFtLIGluIGtleW9mIFVdOiBVW0tdIH07XG4gIH07XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHJvdXRlPFQgZXh0ZW5kcyBUUm91dGVyLCBVIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgQW55Um91dGVyPj4oXG4gICAgdGhpczogUm91dGVyPFQ+LFxuICAgIGNoaWxkcmVuOiBVXG4gICk6IFJvdXRlcjxUICYgUm91dGU8eyBbSyBpbiBrZXlvZiBVXTogUm91dGVyVHlwZTxVW0tdPiB9Pj4ge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jaGlsZHJlbiwgY2hpbGRyZW4pO1xuXG4gICAgcmV0dXJuIDxhbnk+dGhpcztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiB1c2U8VCBleHRlbmRzIFRSb3V0ZXIsIFUgZXh0ZW5kcyBvYmplY3Q+KFxuICAgIHRoaXM6IFJvdXRlcjxUPixcbiAgICB0eXBlOiBVXG4gICk6IFJvdXRlcjxUICYgeyByb3V0ZXJUeXBlOiBVIH0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhcbiAgICAgIHRoaXMucm91dGVyVHlwZSxcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHR5cGUpXG4gICAgKTtcblxuICAgIHJldHVybiA8YW55PnRoaXM7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXQ8VCBleHRlbmRzIFRSb3V0ZXIsIEsgZXh0ZW5kcyBrZXlvZiBUW1wiY2hpbGRyZW5cIl0+KFxuICAgIHRoaXM6IFJvdXRlcjxUPixcbiAgICBuYW1lOiBzdHJpbmcgJiBLLFxuICAgIGNhbGxiYWNrPzogKHJvdXRlcjogUm91dGVyQXQ8VCwgSz4pID0+IHZvaWRcbiAgKTogUm91dGVyQXQ8VCwgSz4ge1xuICAgIGxldCBjaGlsZDogQW55Um91dGVyID0gZGVmaW5lZChcbiAgICAgIHRoaXMuY2hpbGRyZW5bbmFtZV0sXG4gICAgICAoKSA9PiBgTm8gcm91dGVyIGNoaWxkIGF0IFwiJHtuYW1lfVwiLmBcbiAgICApO1xuXG4gICAgaWYgKGNoaWxkLnBhcmVudCAhPT0gdGhpcykge1xuICAgICAgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW25hbWVdID0gUm91dGVyKGNoaWxkLnBhcmFtcywgY2hpbGQuY2hpbGRyZW4pXG4gICAgICAgIC51c2UoY2hpbGQucm91dGVyVHlwZSlcbiAgICAgICAgLnVzZSh0aGlzLnJvdXRlclR5cGUpO1xuICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgIGNoaWxkLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIGNhbGxiYWNrPy4oPGFueT5jaGlsZCk7XG5cbiAgICByZXR1cm4gPGFueT5jaGlsZDtcbiAgfVxuXG4gIGV4cG9ydCB0eXBlIFBhcmFtPEsgZXh0ZW5kcyBzdHJpbmcsIFUgPSBzdHJpbmc+ID0ge1xuICAgIHBhcmFtczogUmVjb3JkPEssIHN0cmluZz47XG4gIH07XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcmFtPFQgZXh0ZW5kcyBUUm91dGVyLCBLIGV4dGVuZHMgc3RyaW5nLCBVID0gc3RyaW5nPihcbiAgICB0aGlzOiBSb3V0ZXI8VD4sXG4gICAgbmFtZTogS1xuICApOiBSb3V0ZXI8VCAmIFBhcmFtPEssIFU+PiB7XG4gICAgdGhpcy5wYXJhbXMucHVzaChuYW1lKTtcbiAgICByZXR1cm4gPGFueT50aGlzO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGJpbmQ8VCBleHRlbmRzIFRSb3V0ZXI+KFxuICAgIHRoaXM6IFJvdXRlcjxUPixcbiAgICBjb250ZXh0OiBUW1wiY29udGV4dFwiXSxcbiAgICBwbHVnaW5zOiBSb3V0ZXJQbHVnaW48VD5bXVxuICApOiBSb3V0ZXI8VD4ge1xuICAgIGNvbnN0IHJvdXRlciA9IDxSb3V0ZXI8VD4+KFxuICAgICAgKDxhbnk+Um91dGVyKHRoaXMucGFyYW1zLCB0aGlzLmNoaWxkcmVuKSkudXNlKHRoaXMucm91dGVyVHlwZSlcbiAgICApO1xuICAgIHRoaXMucGx1Z2lucy5mb3JFYWNoKHBsdWdpbiA9PiB7XG4gICAgICBwbHVnaW4ocm91dGVyLCBjb250ZXh0KTtcbiAgICB9KTtcbiAgICBwbHVnaW5zLmZvckVhY2gocGx1Z2luID0+IHtcbiAgICAgIHBsdWdpbihyb3V0ZXIsIGNvbnRleHQpO1xuICAgIH0pO1xuICAgIHJldHVybiA8YW55PnJvdXRlcjtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhcHBseTxUIGV4dGVuZHMgVFJvdXRlcj4oXG4gICAgdGhpczogUm91dGVyPFQ+LFxuICAgIHBsdWdpbnM6IFJvdXRlclBsdWdpbjxUPltdXG4gICk6IFJvdXRlcjxUPiB7XG4gICAgdGhpcy5wbHVnaW5zLnB1c2goLi4ucGx1Z2lucyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGx1Z2luPFQgZXh0ZW5kcyBUUm91dGVyPihcbiAgICB0aGlzOiBSb3V0ZXI8VD4sXG4gICAgY2FsbGJhY2s6IChyb3V0ZXI6IFJvdXRlcjxUPiwgY29udGV4dDogVFtcImNvbnRleHRcIl0pID0+IHZvaWRcbiAgKTogUm91dGVyUGx1Z2luPFJvdXRlclJvb3Q8VD4+IHtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudC5wbHVnaW4oKHJvdXRlciwgY29udGV4dCkgPT4ge1xuICAgICAgICBjYWxsYmFjayg8YW55PnJvdXRlci5hdCg8YW55PnRoaXMubmFtZSksIGNvbnRleHQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiA8YW55PmNhbGxiYWNrO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNvbnRleHQ8VCBleHRlbmRzIFRSb3V0ZXI+KFxuICAgIHRoaXM6IFJvdXRlcjxUPlxuICApOiA8QyBleHRlbmRzIG9iamVjdD4oKSA9PiBSb3V0ZXI8VCAmIHsgY29udGV4dDogQyB9PiB7XG4gICAgcmV0dXJuICgpID0+IDxhbnk+dGhpcztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiB0b1N0cmluZyh0aGlzOiBBbnlSb3V0ZXIsIGNoaWxkcmVuOiBBbnlSb3V0ZXIpIHtcbiAgICByZXR1cm4gYFJvdXRlcigke2luc3BlY3QodGhpcy5wYXJhbXMpfSwke2luc3BlY3QodGhpcy5jaGlsZHJlbil9KWA7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgUm91dGVyUm9vdDxUIGV4dGVuZHMgVFJvdXRlcj4gPSBFeHRyYWN0PFxuICBEZWZhdWx0SWZOZXZlcjxQbHVja1JlcXVpcmVkPFQsIFwicm9vdFwiPiwgVD4sXG4gIFRSb3V0ZXJcbj47XG5cbi8vIFRPRE86IE1vdmUgY29udGV4dCB0byByZW5kZXI/XG5leHBvcnQgdHlwZSBSb3V0ZXJQbHVnaW48VCBleHRlbmRzIFRSb3V0ZXI+ID0gKFxuICByb3V0ZXI6IFJvdXRlcjxUPixcbiAgY29udGV4dDogVFtcImNvbnRleHRcIl1cbikgPT4gdm9pZDtcblxuUm91dGVyLnByb3RvdHlwZSA9IFJvdXRlclR5cGU7XG4iLCJleHBvcnQgZnVuY3Rpb24gam9pblVybCh1cmw6IHN0cmluZywgLi4uYXJnczogKHN0cmluZyB8IHVuZGVmaW5lZClbXSk6IHN0cmluZyB7XG4gICAgZm9yIChjb25zdCBhcmcgb2YgYXJncykge1xuICAgICAgICBpZiAoIWFyZylcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFwvKyQvZywgJycpXG4gICAgICAgICAgICArICcvJ1xuICAgICAgICAgICAgKyBhcmcucmVwbGFjZSgvXlxcLysvZywgJycpO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xufVxuIiwiaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzXCI7XG5cbmNvbnN0IHJlc3VsdFN5bWJvbCA9IFN5bWJvbCgpO1xuXG5leHBvcnQgdHlwZSBDb25maWdGYWN0b3J5UmVzdWx0PEM+ID0gQXdhaXRhYmxlPHsgW3Jlc3VsdFN5bWJvbF06IEMgfT47XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0ZhY3RvcnlGbjxDPiA9IChjb25maWc6IEMpID0+IENvbmZpZ0ZhY3RvcnlSZXN1bHQ8Qz47XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0ZhY3Rvcnk8QywgVSBleHRlbmRzIGFueVtdID0gW10+ID0gKFxuICAkOiBDb25maWdGYWN0b3J5Rm48Qz4sXG4gIC4uLmFyZ3M6IFVcbikgPT4gQ29uZmlnRmFjdG9yeVJlc3VsdDxDPjtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ0ZhY3Rvcnk8QywgVSBleHRlbmRzIGFueVtdPihcbiAgY29uZmlnOiBDb25maWdGYWN0b3J5PEMsIFU+IHwgdW5kZWZpbmVkLFxuICAuLi5hcmdzOiBVXG4pOiBDIHwgdW5kZWZpbmVkO1xuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ0ZhY3Rvcnk8QywgVSBleHRlbmRzIGFueVtdPihcbiAgY29uZmlnOiBDb25maWdGYWN0b3J5PEMsIFU+LFxuICAuLi5hcmdzOiBVXG4pOiBDO1xuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ0ZhY3RvcnkoY29uZmlnLCBjb250ZXh0LCAuLi5hcmdzKSB7XG4gIGxldCByZXN1bHQgPSBjb25maWc/LihcbiAgICAkID0+IHtcbiAgICAgIHJldHVybiB7IFtyZXN1bHRTeW1ib2xdOiAkIH07XG4gICAgfSxcbiAgICBjb250ZXh0LFxuICAgIC4uLmFyZ3NcbiAgKTtcbiAgaWYgKCFyZXN1bHQgfHwgIShyZXN1bHRTeW1ib2wgaW4gcmVzdWx0KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgWW91IGhhdmUgdG8gdXNlICRgKTtcbiAgfVxuICB3aGlsZSAocmVzdWx0U3ltYm9sIGluIHJlc3VsdCkge1xuICAgIHJlc3VsdCA9IHJlc3VsdFtyZXN1bHRTeW1ib2xdO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyB0b3VjaE1hcCB9IGZyb20gXCIuLi9jb21tb24vbWFwL3RvdWNoTWFwXCI7XG5pbXBvcnQgeyBBd2FpdGFibGUsIEZuLCBJc05ldmVyIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzXCI7XG5cbmNvbnN0IGdlbmVyaWNDb25maWdDYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbmRlY2xhcmUgY29uc3QgaXNHZW5lcmljQ29uZmlnOiB1bmlxdWUgc3ltYm9sO1xuXG5leHBvcnQgdHlwZSBHZW5lcmljQ29uZmlnQ29uZmlndXJlPFxuICBUIGV4dGVuZHMgR2VuZXJpY0NvbmZpZzxGbj5cbj4gPSBUIGV4dGVuZHMgR2VuZXJpY0NvbmZpZzxpbmZlciBVPiA/IFUgOiBuZXZlcjtcbmV4cG9ydCB0eXBlIEdlbmVyaWNDb25maWc8VCBleHRlbmRzIEZuID0gYW55PiA9IHtcbiAgKGNvbmZpZ3VyZTogVCk6IEF3YWl0YWJsZTxSZXR1cm5UeXBlPFQ+PjtcbiAgW2lzR2VuZXJpY0NvbmZpZ10/OiB0cnVlO1xufTtcbmV4cG9ydCB0eXBlIElzR2VuZXJpY0NvbmZpZzxUPiA9IElzTmV2ZXI8VD4gZXh0ZW5kcyB0cnVlXG4gID8gZmFsc2UgfCB0cnVlXG4gIDogVCBleHRlbmRzIEZuXG4gID8gUmVxdWlyZWQ8VD4gZXh0ZW5kcyB7XG4gICAgICBbaXNHZW5lcmljQ29uZmlnXTogdHJ1ZTtcbiAgICB9XG4gICAgPyB0cnVlXG4gICAgOiBmYWxzZVxuICA6IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gR2VuZXJpY0NvbmZpZzxUIGV4dGVuZHMgR2VuZXJpY0NvbmZpZz4oXG4gIGdlbmVyaWNDb25maWc6IFRcbik6IFJldHVyblR5cGU8VD4ge1xuICByZXR1cm4gdG91Y2hNYXAoZ2VuZXJpY0NvbmZpZ0NhY2hlLCBnZW5lcmljQ29uZmlnLCAoKSA9PiB7XG4gICAgcmV0dXJuIGdlbmVyaWNDb25maWcoeCA9PiB4KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBJZiwgSXMgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7XG4gIEFic3RyYWN0UnBjSGFuZGxlcixcbiAgQW55UnBjLFxuICBJUnBjSGFuZGxlcixcbiAgUnBjLFxuICBScGNDb21tYW5kLFxufSBmcm9tIFwiLi9ScGNcIjtcblxuZXhwb3J0IHR5cGUgTm9ScGMgPSBScGM8e1xuICBIYW5kbGVyOiB7fTtcbiAgQ29ubmVjdGlvbjoge307XG4gIENvbmZpZzogdW5kZWZpbmVkO1xuICBQcm9wczoge307XG59PjtcblxuZXhwb3J0IGNvbnN0IE5vUnBjOiBOb1JwYyA9IFJwYzxOb1JwYz4oe1xuICBjb25uZWN0OiAoKSA9PiAoe30pLFxuICBoYW5kbGVyOiBjbGFzc1xuICAgIGV4dGVuZHMgQWJzdHJhY3RScGNIYW5kbGVyPE5vUnBjPlxuICAgIGltcGxlbWVudHMgSVJwY0hhbmRsZXI8Tm9ScGM+IHtcbiAgICBhc3luYyBoYW5kbGUoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG59KTtcbiIsImltcG9ydCB7IHRvdWNoTWFwIH0gZnJvbSBcIi4uL2NvbW1vbi9tYXAvdG91Y2hNYXBcIjtcbmltcG9ydCB7IE1ldGFUeXBlLCBUTWV0YVR5cGUsIFdpdGhNZXRhVHlwZSB9IGZyb20gXCIuLi9jb21tb24vTWV0YVR5cGVcIjtcbmltcG9ydCB7IG1lcmdlRGVzY3JpcHRvcnMgfSBmcm9tIFwiLi4vY29tbW9uL29iamVjdC9tZXJnZURlc2NyaXB0b3JzXCI7XG5pbXBvcnQge1xuICBBd2FpdGFibGUsXG4gIEF3YWl0ZWQsXG4gIEZuLFxuICBJZixcbiAgSXMsXG4gIElzRW1wdHlPYmplY3QsXG4gIElzVW5kZWZpbmVkLFxuICBOb3QsXG4gIE92ZXJyaWRlLFxuICBQYXJ0aWFsVW5kZWZpbmVkS2V5cyxcbn0gZnJvbSBcIi4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBpbnNwZWN0IH0gZnJvbSBcIi4uL2xvZ2dpbmdcIjtcbmltcG9ydCB7IENvbmZpZ0ZhY3RvcnkgfSBmcm9tIFwiLi9Db25maWdGYWN0b3J5XCI7XG5pbXBvcnQgeyBHZW5lcmljQ29uZmlnLCBJc0dlbmVyaWNDb25maWcgfSBmcm9tIFwiLi9HZW5lcmljQ29uZmlnXCI7XG5cbmV4cG9ydCB0eXBlIFJwY0NvbW1hbmQgPSAocGF5bG9hZDogYW55KSA9PiBQcm9taXNlPGFueT47XG5cbmV4cG9ydCB0eXBlIFRScGMgPSB7XG4gIEhhbmRsZXI6IG9iamVjdDtcbiAgQ29ubmVjdGlvbjogYW55O1xuICBDb25maWc6IG9iamVjdCB8IHVuZGVmaW5lZDtcbiAgUHJvcHM6IG9iamVjdDtcbn07XG5cbmV4cG9ydCB0eXBlIEFueVJwYyA9IFJwYzxUUnBjPjtcblxuZXhwb3J0IHR5cGUgUnBjPFQgZXh0ZW5kcyBUUnBjPiA9IFdpdGhNZXRhVHlwZTx7XG4gIFRScGM6IFQ7XG59PiAmXG4gIFRbXCJQcm9wc1wiXSAmIHtcbiAgICByZWFkb25seSBvcHRpb25zOiBScGNPcHRpb25zPFRScGM+O1xuXG4gICAgcmVhZG9ubHkgc2VydmljZTogX1JwY0Nvbm5lY3Rpb248VD47XG5cbiAgICBjcmVhdGVScGNDb25uZWN0aW9uKGNvbW1hbmQ6IFJwY0NvbW1hbmQpOiBUW1wiQ29ubmVjdGlvblwiXTtcblxuICAgIC8vIFRPRE86IHJlbmFtZTpcbiAgICAvLyAgLSAqUnBjKiB0byAqKlxuICAgIGNyZWF0ZVJwY0NvbW1hbmQodW5yZXNvbHZlZENvbmZpZzogX1JwY1VucmVzb2x2ZWRDb25maWc8VD4pOiBScGNDb21tYW5kO1xuXG4gICAgcmVzb2x2ZVJwY0NvbmZpZyhcbiAgICAgIHVucmVzb2x2ZWRDb25maWc6IF9ScGNVbnJlc29sdmVkQ29uZmlnPFQ+XG4gICAgKTogUHJvbWlzZTxfUnBjUmVzb2x2ZWRDb25maWc8VD4+O1xuXG4gICAgcmVzb2x2ZVJwY0hhbmRsZXIoXG4gICAgICBjb25maWc6IF9ScGNVbnJlc29sdmVkQ29uZmlnPFQ+XG4gICAgKTogUHJvbWlzZTxfUnBjUmVzb2x2ZWRIYW5kbGVyPFQ+PjtcblxuICAgIGNyZWF0ZVJwY0hhbmRsZXIoXG4gICAgICBjb25maWc6IF9ScGNSZXNvbHZlZENvbmZpZzxUPlxuICAgICk6IFByb21pc2U8X1JwY1Jlc29sdmVkSGFuZGxlcjxUPj47XG4gIH07XG5cbmNvbnN0IHJwY1RvU2VydmljZUhhbmRsZXIgPSBuZXcgV2Vha01hcDxhbnksIEZuPigpO1xuXG5leHBvcnQgZnVuY3Rpb24gUnBjPFIgZXh0ZW5kcyBCYXNlZFJwYywgVCBleHRlbmRzIFRScGMgPSBScGNUeXBlPFI+PihcbiAgb3B0aW9uczogUnBjT3B0aW9uczxUPlxuKTogUnBjPFQ+IHtcbiAgbGV0IHNlcnZpY2U7XG4gIGNvbnN0IHJwYzogUnBjPFQ+ID0gT2JqZWN0LnNldFByb3RvdHlwZU9mKFxuICAgIG1lcmdlRGVzY3JpcHRvcnMob3B0aW9uc1tcInByb3BzXCJdIHx8IHt9LCB7XG4gICAgICBvcHRpb25zLFxuXG4gICAgICBnZXQgc2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICB9LFxuICAgIH0pLFxuICAgIEFueVJwY1xuICApO1xuICBzZXJ2aWNlID0gcnBjLmNyZWF0ZVJwY0Nvbm5lY3Rpb24ocGF5bG9hZCA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IHJwY1RvU2VydmljZUhhbmRsZXIuZ2V0KHJwYyk7XG4gICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICB0aHJvdyBuZXcgUnBjRXJyb3IoYE5vIGhhbmRsZSBmb3Igc2VydmljZS5gKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZXIocGF5bG9hZCk7XG4gIH0pO1xuICByZXR1cm4gcnBjO1xufVxuXG5leHBvcnQgdHlwZSBScGNSZXNvbHZlZENvbmZpZzxUIGV4dGVuZHMgQmFzZWRScGM+ID0gX1JwY1Jlc29sdmVkQ29uZmlnPFxuICBScGNUeXBlPFQ+XG4+O1xuXG5leHBvcnQgdHlwZSBfUnBjUmVzb2x2ZWRDb25maWc8XG4gIFQgZXh0ZW5kcyBUUnBjLFxuICBDb25maWcgPSBOb25OdWxsYWJsZTxUW1wiQ29uZmlnXCJdPlxuPiA9IENvbmZpZyBleHRlbmRzIEZuXG4gID8gSXNHZW5lcmljQ29uZmlnPENvbmZpZz4gZXh0ZW5kcyB0cnVlXG4gICAgPyBBd2FpdGVkPFJldHVyblR5cGU8Q29uZmlnPj5cbiAgICA6IENvbmZpZ1xuICA6IENvbmZpZztcblxuZXhwb3J0IHR5cGUgUnBjUmVzb2x2ZWRIYW5kbGVyPFQgZXh0ZW5kcyBCYXNlZFJwYz4gPSBfUnBjUmVzb2x2ZWRIYW5kbGVyPFxuICBScGNUeXBlPFQ+XG4+O1xuXG50eXBlIF9ScGNSZXNvbHZlZEhhbmRsZXI8VCBleHRlbmRzIFRScGM+ID0gVFtcIkhhbmRsZXJcIl0gJiB7XG4gIGNvbmZpZzogX1JwY1Jlc29sdmVkQ29uZmlnPFQ+O1xuICBycGM6IFJwYzxUPjtcbiAgaGFuZGxlKHBheWxvYWQ6IGFueSk6IEF3YWl0YWJsZTxhbnk+O1xufTtcblxuZXhwb3J0IHR5cGUgSVJwY0hhbmRsZXI8VCBleHRlbmRzIEJhc2VkUnBjPiA9IF9ScGNSZXNvbHZlZEhhbmRsZXI8UnBjVHlwZTxUPj47XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFJwY0hhbmRsZXI8XG4gIFIgZXh0ZW5kcyBBbnlScGMsXG4gIFQgZXh0ZW5kcyBUUnBjID0gUnBjVHlwZTxSPlxuPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBycGM6IFIsIHB1YmxpYyBjb25maWc6IF9ScGNSZXNvbHZlZENvbmZpZzxUPikge31cblxuICBhYnN0cmFjdCBoYW5kbGUocGF5bG9hZDogYW55KTogUHJvbWlzZTxhbnk+O1xufVxuXG5leHBvcnQgdHlwZSBScGNIYW5kbGVyQ2xhc3M8VCBleHRlbmRzIEFueVJwYywgUCA9IHt9PiA9IG5ldyAoXG4gIHJwYzogVCxcbiAgY29uZmlnOiBfUnBjUmVzb2x2ZWRDb25maWc8UnBjVHlwZTxUPj5cbikgPT4gX1JwY1Jlc29sdmVkSGFuZGxlcjxScGNUeXBlPFQ+PiAmIFA7XG5cbmV4cG9ydCB0eXBlIFJwY0lzR2VuZXJpY0NvbmZpZ09wdGlvbjxUIGV4dGVuZHMgUGljazxUUnBjLCBcIkNvbmZpZ1wiPj4gPVxuICB8IElzR2VuZXJpY0NvbmZpZzxUW1wiQ29uZmlnXCJdPlxuICB8IElmPE5vdDxJczxUW1wiQ29uZmlnXCJdLCBGbj4+LCB1bmRlZmluZWQ+O1xuXG5leHBvcnQgdHlwZSBScGNQcm9wc09wdGlvbjxUIGV4dGVuZHMgUGljazxUUnBjLCBcIlByb3BzXCI+PiA9XG4gIHwgVFtcIlByb3BzXCJdXG4gIHwgSWY8SXNFbXB0eU9iamVjdDxUW1wiUHJvcHNcIl0+LCB1bmRlZmluZWQ+O1xuXG5leHBvcnQgdHlwZSBScGNPcHRpb25zPFxuICBUIGV4dGVuZHMgVFJwYyxcbiAgQ29uZmlnSXNGbiBleHRlbmRzIGJvb2xlYW4gPSBJczxUW1wiQ29uZmlnXCJdLCBGbj4sXG4gIENvbmZpZ0lzR2VuZXJpY0NvbmZpZyBleHRlbmRzIGJvb2xlYW4gPSBJc0dlbmVyaWNDb25maWc8VFtcIkNvbmZpZ1wiXT5cbj4gPSBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAge1xuICAgIC8vIFRPRE86IGNvbmZpZ1R5cGU6ICdmdW5jdGlvbicgfCAnZ2VuZXJpYycgfCAnb2JqZWN0J1xuICAgIGlzR2VuZXJpY0NvbmZpZzogUnBjSXNHZW5lcmljQ29uZmlnT3B0aW9uPFQ+O1xuXG4gICAgaXNDb25maWdGbjogYm9vbGVhbiB8IElmPE5vdDxJczxUW1wiQ29uZmlnXCJdLCBGbj4+LCB1bmRlZmluZWQ+O1xuXG4gICAgcHJvcHM6IFJwY1Byb3BzT3B0aW9uPFQ+O1xuICB9LFxuICB7XG4gICAgY29ubmVjdCh0aGlzOiBScGM8VD4sIGNvbW1hbmQ6IFJwY0NvbW1hbmQpOiBUW1wiQ29ubmVjdGlvblwiXTtcblxuICAgIGhhbmRsZXI6IFJwY0hhbmRsZXJDbGFzczxScGM8VD4+O1xuICB9XG4+O1xuXG5jb25zdCBycGNUb1VuZGVmaW5lZENvbmZpZyA9IG5ldyBXZWFrTWFwPEFueVJwYywgYW55PigpO1xuY29uc3QgcnBjVG9Db25maWdUb0NvbnRleHQgPSBuZXcgV2Vha01hcDxcbiAgQW55UnBjLFxuICBXZWFrTWFwPGFueSwgUHJvbWlzZTxfUnBjUmVzb2x2ZWRIYW5kbGVyPFRScGM+Pj5cbj4oKTtcblxubGV0IGlzU2VydmljZUhhbmRsZXIgPSBmYWxzZTtcblxuZXhwb3J0IGNvbnN0IEFueVJwYzogQW55UnBjID0ge1xuICBnZXQgb3B0aW9ucygpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9LFxuICBnZXQgc2VydmljZSgpOiBhbnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9LFxuICBjcmVhdGVScGNDb25uZWN0aW9uKGhhbmRsZXIpIHtcbiAgICBpZiAoaXNTZXJ2aWNlSGFuZGxlcikge1xuICAgICAgcnBjVG9TZXJ2aWNlSGFuZGxlci5zZXQodGhpcywgaGFuZGxlcik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY29ubmVjdC5jYWxsKHRoaXMsIGhhbmRsZXIpO1xuICB9LFxuICBhc3luYyBjcmVhdGVScGNIYW5kbGVyKGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgdGhpcy5vcHRpb25zLmhhbmRsZXIodGhpcywgY29uZmlnKTtcbiAgfSxcblxuICBhc3luYyByZXNvbHZlUnBjSGFuZGxlcih1bnJlc29sdmVkQ29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUnBjSGFuZGxlcihhd2FpdCB0aGlzLnJlc29sdmVScGNDb25maWcodW5yZXNvbHZlZENvbmZpZykpO1xuICB9LFxuXG4gIGFzeW5jIHJlc29sdmVScGNDb25maWcoY29uZmlnKTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgICBpZiAoY29uZmlnICYmIHR5cGVvZiBjb25maWcgPT09IFwib2JqZWN0XCIgJiYgXCIkY29udGV4dFwiIGluIGNvbmZpZykge1xuICAgICAgY29uZmlnID0gYXdhaXQgQ29uZmlnRmFjdG9yeShjb25maWcuJGNvbnRleHQsIHRoaXMpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGNvbmZpZyAmJlxuICAgICAgQXJyYXkuaXNBcnJheShjb25maWcpICYmXG4gICAgICBjb25maWcubGVuZ3RoID09PSAxICYmXG4gICAgICB0eXBlb2YgY29uZmlnWzBdID09PSBcImZ1bmN0aW9uXCJcbiAgICApIHtcbiAgICAgIGNvbmZpZyA9IGF3YWl0IENvbmZpZ0ZhY3RvcnkoY29uZmlnWzBdLCB0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmlzR2VuZXJpY0NvbmZpZykge1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBgZXhwZWN0ZWQgdG8gZ2VuZXJpYyBjb25maWcsIGdvdDogJHtpbnNwZWN0KGNvbmZpZyl9YFxuICAgICAgICApO1xuICAgICAgY29uZmlnID0gYXdhaXQgR2VuZXJpY0NvbmZpZyhjb25maWcgYXMgR2VuZXJpY0NvbmZpZyk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5vcHRpb25zLmlzQ29uZmlnRm4gJiYgdHlwZW9mIGNvbmZpZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb25maWcgPSBhd2FpdCBDb25maWdGYWN0b3J5KGNvbmZpZyBhcyBDb25maWdGYWN0b3J5PGFueT4pO1xuICAgIH1cblxuICAgIHJldHVybiBjb25maWcgfHwge307XG4gIH0sXG4gIGNyZWF0ZVJwY0NvbW1hbmQodW5yZXNvbHZlZENvbmZpZykge1xuICAgIGlmICghdW5yZXNvbHZlZENvbmZpZykge1xuICAgICAgdW5yZXNvbHZlZENvbmZpZyA9IHRvdWNoTWFwKHJwY1RvVW5kZWZpbmVkQ29uZmlnLCB0aGlzLCBPYmplY3QpO1xuICAgIH1cbiAgICBsZXQgY29uZmlnO1xuICAgIGxldCBoYXNDb25maWcgPSBmYWxzZTtcbiAgICByZXR1cm4gYXN5bmMgcGF5bG9hZCA9PiB7XG4gICAgICBpZiAoIWhhc0NvbmZpZykge1xuICAgICAgICBjb25maWcgPSBhd2FpdCB0aGlzLnJlc29sdmVScGNDb25maWcodW5yZXNvbHZlZENvbmZpZyk7XG4gICAgICAgIGhhc0NvbmZpZyA9IHRydWU7XG4gICAgICB9XG4gICAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgdG91Y2hNYXAoXG4gICAgICAgIHRvdWNoTWFwKHJwY1RvQ29uZmlnVG9Db250ZXh0LCB0aGlzLCAoKSA9PiBuZXcgV2Vha01hcCgpKSxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICAoKSA9PiB0aGlzLmNyZWF0ZVJwY0hhbmRsZXIoY29uZmlnKVxuICAgICAgKTtcbiAgICAgIHJldHVybiBjb250ZXh0LmhhbmRsZShwYXlsb2FkKTtcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IHR5cGUgQmFzZWRScGM8VCBleHRlbmRzIFRScGMgPSBUUnBjPiA9IFdpdGhNZXRhVHlwZTx7IFRScGM6IFQgfT47XG5cbmV4cG9ydCB0eXBlIFJwY1R5cGU8VCBleHRlbmRzIEJhc2VkUnBjPiA9IE1ldGFUeXBlPFQ+W1wiVFJwY1wiXTtcblxuZXhwb3J0IHR5cGUgUnBjSG9vazxSIGV4dGVuZHMgQmFzZWRScGMsIFQgZXh0ZW5kcyBQYXJ0aWFsPFRScGM+PiA9IFJwYzxcbiAgRXh0cmFjdDxPdmVycmlkZTxScGNUeXBlPFI+LCBUPiwgVFJwYz5cbj47XG5cbnR5cGUgX1JwY1VucmVzb2x2ZWRDb25maWc8VCBleHRlbmRzIFRScGM+ID1cbiAgfCBUW1wiQ29uZmlnXCJdXG4gIHwgSWY8Tm90PElzPFRbXCJDb25maWdcIl0sIEZuPj4sIENvbmZpZ0ZhY3Rvcnk8VFtcIkNvbmZpZ1wiXT4+XG4gIC8vIFRPRE86ICRjb25maWdDb250ZXh0LCAkZ2VuZXJpY0NvbmZpZ0NvbnRleHRcbiAgfCB7XG4gICAgICAkY29udGV4dDogQ29uZmlnRmFjdG9yeTxUW1wiQ29uZmlnXCJdLCBbUnBjPFQ+XT47XG4gICAgfTtcblxuZXhwb3J0IHR5cGUgUnBjVW5yZXNvbHZlZENvbmZpZzxUIGV4dGVuZHMgQmFzZWRScGM+ID0gX1JwY1VucmVzb2x2ZWRDb25maWc8XG4gIFJwY1R5cGU8VD5cbj47XG5cbmV4cG9ydCB0eXBlIFJwY0NvbmZpZzxUIGV4dGVuZHMgQmFzZWRScGM+ID0gUnBjVHlwZTxUPltcIkNvbmZpZ1wiXTtcblxuZXhwb3J0IHR5cGUgUnBjVW5kZWZpbmVkQ29uZmlnPFQgZXh0ZW5kcyBCYXNlZFJwYz4gPSBJZjxcbiAgSXNVbmRlZmluZWQ8UnBjVW5yZXNvbHZlZENvbmZpZzxUPj4sXG4gIHVuZGVmaW5lZFxuPjtcblxuZXhwb3J0IGNsYXNzIFJwY0Vycm9yIGV4dGVuZHMgRXJyb3Ige31cblxuZXhwb3J0IHR5cGUgUnBjSGFuZGxlcjxUIGV4dGVuZHMgQW55UnBjPiA9IFJwY1R5cGU8VD5bXCJIYW5kbGVyXCJdO1xuZXhwb3J0IHR5cGUgUnBjQ29ubmVjdGlvbjxUIGV4dGVuZHMgQmFzZWRScGM+ID0gX1JwY0Nvbm5lY3Rpb248UnBjVHlwZTxUPj47XG5cbnR5cGUgX1JwY0Nvbm5lY3Rpb248VCBleHRlbmRzIFRScGM+ID0gVFtcIkNvbm5lY3Rpb25cIl0gJiBCYXNlZFJwYzxUPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVJwY1NlcnZpY2U8VCBleHRlbmRzIEFueVJwYz4oXG4gIHJwYzogVCxcbiAgY29tbWFuZDogUnBjQ29tbWFuZFxuKTogUnBjQ29ubmVjdGlvbjxUPiB7XG4gIGlzU2VydmljZUhhbmRsZXIgPSB0cnVlO1xuICBjb25zdCBjb25uZWN0aW9uID0gcnBjLmNyZWF0ZVJwY0Nvbm5lY3Rpb24oY29tbWFuZCk7XG4gIGlzU2VydmljZUhhbmRsZXIgPSBmYWxzZTtcbiAgcmV0dXJuIGNvbm5lY3Rpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmVScGNTZXJ2aWNlPFQgZXh0ZW5kcyBBbnlScGM+KFxuICBycGM6IFQsXG4gIGNvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxUPlxuKTogUnBjQ29ubmVjdGlvbjxUPiB7XG4gIHJldHVybiBoYW5kbGVScGNTZXJ2aWNlKHJwYywgcnBjLmNyZWF0ZVJwY0NvbW1hbmQoY29uZmlnKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBScGNDb25maWc8VCBleHRlbmRzIEFueVJwYz4oXG4gIHJwYzogVCxcbiAgY29uZmlnOiBScGNVbnJlc29sdmVkQ29uZmlnPFQ+XG4pOiBScGNVbnJlc29sdmVkQ29uZmlnPFQ+IHtcbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCB7IEF3YWl0ZWQsIEZuLCBJZiwgTm90LCBQYXJ0aWFsVW5kZWZpbmVkS2V5cyB9IGZyb20gXCIuLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgQ29uZmlnRmFjdG9yeSB9IGZyb20gXCIuL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7IEdlbmVyaWNDb25maWcsIElzR2VuZXJpY0NvbmZpZyB9IGZyb20gXCIuL0dlbmVyaWNDb25maWdcIjtcbmltcG9ydCB7IEFueVJwYywgUnBjSG9vaywgUnBjVHlwZSwgUnBjVW5yZXNvbHZlZENvbmZpZywgVFJwYyB9IGZyb20gXCIuL1JwY1wiO1xuXG5leHBvcnQgdHlwZSBScGNDb25maWdIb29rPFxuICBUIGV4dGVuZHMgVENvbmZpZ0hvb2sgJiB7XG4gICAgUHJvcHM/OiBvYmplY3Q7XG4gIH1cbj4gPSBScGNIb29rPFxuICBUW1wiVGFyZ2V0XCJdLFxuICB7XG4gICAgVENvbmZpZ0hvb2s6IFQ7XG4gICAgQ29uZmlnOiBUW1wiQ29uZmlnXCJdO1xuICB9XG4+ICZcbiAgTm9uTnVsbGFibGU8VFtcIlByb3BzXCJdPjtcblxuZXhwb3J0IHR5cGUgVENvbmZpZ0hvb2sgPSB7XG4gIFRhcmdldDogQW55UnBjO1xuICBDb25maWc6IFRScGNbXCJDb25maWdcIl07XG4gIFByb3BzPzogb2JqZWN0O1xufTtcbmV4cG9ydCB0eXBlIEFueVJwY0NvbmZpZ0hvb2sgPSBScGNDb25maWdIb29rPHtcbiAgVGFyZ2V0OiBBbnlScGM7XG4gIENvbmZpZzogVFJwY1tcIkNvbmZpZ1wiXTtcbn0+O1xuXG4vLyBUT0RPOiBfR2VuZXJpY1RvR2VuZXJpY0NvbmZpZ1xuLy8gVE9ETzogX0NvbmZpZ1RvR2VuZXJpY0NvbmZpZ1xuLy8gVE9ETzogX0NvbmZpZ1RvQ29uZmlnXG4vLyBUT0RPOiBfR2VuZXJpY0NvbmZpZ1RvQ29uZmlnXG50eXBlIF9HZW5lcmljQ29uZmlnSGFuZGxlcjxUIGV4dGVuZHMgVENvbmZpZ0hvb2s+ID0gKF86IHtcbiAgY29uZmlnOiBBd2FpdGVkPFJldHVyblR5cGU8RXh0cmFjdDxUW1wiQ29uZmlnXCJdLCBGbj4+PjtcbiAgdGFyZ2V0OiBUW1wiVGFyZ2V0XCJdO1xuICBwcm9wczogVFtcIlByb3BzXCJdO1xufSkgPT4gQ29uZmlnRmFjdG9yeTxScGNVbnJlc29sdmVkQ29uZmlnPFRbXCJUYXJnZXRcIl0+PjtcblxudHlwZSBfQ29uZmlnSGFuZGxlcjxUIGV4dGVuZHMgVENvbmZpZ0hvb2s+ID0gKF86IHtcbiAgY29uZmlnOiBUW1wiQ29uZmlnXCJdO1xuICB0YXJnZXQ6IFRbXCJUYXJnZXRcIl07XG4gIHByb3BzOiBUW1wiUHJvcHNcIl07XG59KSA9PiBDb25maWdGYWN0b3J5PFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIlRhcmdldFwiXT4+O1xuXG5leHBvcnQgdHlwZSBScGNDb25maWdIb29rSGFuZGxlcjxcbiAgUiBleHRlbmRzIEFueVJwY0NvbmZpZ0hvb2ssXG4gIFQgZXh0ZW5kcyBUQ29uZmlnSG9vayA9IFJwY1R5cGU8Uj5bXCJUQ29uZmlnSG9va1wiXVxuPiA9IElzR2VuZXJpY0NvbmZpZzxUW1wiQ29uZmlnXCJdPiBleHRlbmRzIHRydWVcbiAgPyBfR2VuZXJpY0NvbmZpZ0hhbmRsZXI8VD5cbiAgOiBfQ29uZmlnSGFuZGxlcjxUPjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJwY0NvbmZpZ0hvb2s8XG4gIFIgZXh0ZW5kcyBBbnlScGNDb25maWdIb29rLFxuICBUIGV4dGVuZHMgVENvbmZpZ0hvb2sgPSBScGNUeXBlPFI+W1wiVENvbmZpZ0hvb2tcIl1cbj4oXG4gIG9wdGlvbnM6IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICAgIHtcbiAgICAgIGlzR2VuZXJpY0NvbmZpZzpcbiAgICAgICAgfCBJc0dlbmVyaWNDb25maWc8VFtcIkNvbmZpZ1wiXT5cbiAgICAgICAgfCBJZjxOb3Q8SXNHZW5lcmljQ29uZmlnPFRbXCJDb25maWdcIl0+PiwgdW5kZWZpbmVkPjtcblxuICAgICAgcHJvcHM6IFRbXCJQcm9wc1wiXTtcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhcmdldDogVFtcIlRhcmdldFwiXTtcbiAgICAgIGhhbmRsZXI6IFJwY0NvbmZpZ0hvb2tIYW5kbGVyPFI+O1xuICAgIH1cbiAgPlxuKTogUiB7XG4gIGNvbnN0IHsgdGFyZ2V0LCBoYW5kbGVyIH0gPSBvcHRpb25zO1xuICBjb25zdCBpc0dlbmVyaWNDb25maWcgPVxuICAgIFwiaXNHZW5lcmljQ29uZmlnXCIgaW4gb3B0aW9ucyA/IG9wdGlvbnMuaXNHZW5lcmljQ29uZmlnID8/IGZhbHNlIDogZmFsc2U7XG5cbiAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZihcbiAgICB7XG4gICAgICAuLi5vcHRpb25zW1wicHJvcHNcIl0sXG4gICAgICBhc3luYyByZXNvbHZlUnBjQ29uZmlnKHRoaXM6IFRbXCJUYXJnZXRcIl0sIGNvbmZpZykge1xuICAgICAgICBpZiAoaXNHZW5lcmljQ29uZmlnKSB7XG4gICAgICAgICAgY29uZmlnID0gYXdhaXQgR2VuZXJpY0NvbmZpZyhcbiAgICAgICAgICAgIChoYW5kbGVyIGFzIF9HZW5lcmljQ29uZmlnSGFuZGxlcjxUPikoe1xuICAgICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgcHJvcHM6IG9wdGlvbnNbXCJwcm9wc1wiXSxcbiAgICAgICAgICAgIH0pIGFzIEdlbmVyaWNDb25maWdcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbmZpZyA9IGF3YWl0IENvbmZpZ0ZhY3RvcnkoXG4gICAgICAgICAgICAoaGFuZGxlciBhcyBfQ29uZmlnSGFuZGxlcjxUPikoe1xuICAgICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgcHJvcHM6IG9wdGlvbnNbXCJwcm9wc1wiXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnJlc29sdmVScGNDb25maWcuY2FsbCh0aGlzLCBjb25maWcpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHRhcmdldFxuICApO1xufVxuIiwiaW1wb3J0IHtcbiAgT3ZlcnJpZGUsXG4gIFBhcnRpYWxLZXlzLFxuICBVbmRlZmluZWRJZkVtcHR5T2JqZWN0LFxufSBmcm9tIFwiLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IEFueVJwYywgUnBjLCBScGNDb25maWcsIFJwY1VucmVzb2x2ZWRDb25maWcsIFRScGMgfSBmcm9tIFwiLi9ScGNcIjtcbmltcG9ydCB7IEFueVJwY0NvbmZpZ0hvb2ssIFJwY0NvbmZpZ0hvb2sgfSBmcm9tIFwiLi9ScGNDb25maWdIb29rXCI7XG5cbmV4cG9ydCB0eXBlIEFueVJwY1dpdGhPYmplY3RDb25maWcgPSBScGM8XG4gIE92ZXJyaWRlPFRScGMsIHsgQ29uZmlnOiBvYmplY3QgfCB1bmRlZmluZWQgfT5cbj47XG5cbmV4cG9ydCB0eXBlIFJwY1BhcnRpYWxDb25maWc8XG4gIFQgZXh0ZW5kcyBBbnlScGNXaXRoT2JqZWN0Q29uZmlnLFxuICBLIGV4dGVuZHMga2V5b2YgTm9uTnVsbGFibGU8UnBjQ29uZmlnPFQ+PlxuPiA9IFJwY0NvbmZpZ0hvb2s8e1xuICBUYXJnZXQ6IFQ7XG4gIENvbmZpZzpcbiAgICB8IFJwY1VucmVzb2x2ZWRDb25maWc8VD5cbiAgICB8IFVuZGVmaW5lZElmRW1wdHlPYmplY3Q8UGFydGlhbEtleXM8Tm9uTnVsbGFibGU8UnBjQ29uZmlnPFQ+PiwgSz4+O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBScGNQYXJ0aWFsQ29uZmlnPFxuICBUIGV4dGVuZHMgQW55UnBjLFxuICBLIGV4dGVuZHMga2V5b2YgTm9uTnVsbGFibGU8UnBjQ29uZmlnPFQ+PlxuPihcbiAgdGFyZ2V0OiBULFxuICBkZWZhdWx0Q29uZmlnOiBQaWNrPE5vbk51bGxhYmxlPFJwY0NvbmZpZzxUPj4sIEs+XG4pOiBScGNQYXJ0aWFsQ29uZmlnPFQsIEs+IHtcbiAgcmV0dXJuIDxhbnk+UnBjQ29uZmlnSG9vazxBbnlScGNDb25maWdIb29rPih7XG4gICAgaXNHZW5lcmljQ29uZmlnOiBmYWxzZSxcbiAgICB0YXJnZXQsXG4gICAgaGFuZGxlcjogKHsgY29uZmlnIH0pID0+ICQgPT4gJCh7IC4uLmRlZmF1bHRDb25maWcsIC4uLmNvbmZpZyB9KSxcbiAgfSk7XG59XG4iLCJpbXBvcnQge1xuICBBd2FpdGFibGUsXG4gIElmLFxuICBJc0VtcHR5T2JqZWN0LFxuICBPbWl0S2V5cyxcbiAgT3ZlcnJpZGUsXG4gIFBhcnRpYWxVbmRlZmluZWRLZXlzLFxufSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IERhdGFSb3cgfSBmcm9tIFwiLi4vLi4vdHlwZWRhdGEvRGF0YVJvd1wiO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gXCIuLi8uLi90eXBlZGF0YS9EYXRhU291cmNlXCI7XG5pbXBvcnQgeyBDb25maWdGYWN0b3J5IH0gZnJvbSBcIi4uL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7IEdlbmVyaWNDb25maWcgfSBmcm9tIFwiLi4vR2VuZXJpY0NvbmZpZ1wiO1xuXG5pbXBvcnQgeyBBbnlJbnB1dCwgSW5wdXRWYWx1ZSB9IGZyb20gXCIuLi9pbnB1dC9JbnB1dFwiO1xuaW1wb3J0IHsgTm9ScGMgfSBmcm9tIFwiLi4vTm9ScGNcIjtcbmltcG9ydCB7IEFueVJwYywgUnBjQ29uZmlnLCBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgUnBjRm4gfSBmcm9tIFwiLi4vcnBjLWZuL1JwY0ZuXCI7XG5pbXBvcnQgeyBScGNNYXAgfSBmcm9tIFwiLi4vcnBjLW1hcC9ScGNNYXBcIjtcbmltcG9ydCB7IFJwY1BhcmFtZXRlciB9IGZyb20gXCIuLi9ycGMtcGFyYW1ldGVyL1JwY1BhcmFtZXRlclwiO1xuaW1wb3J0IHsgUnBjQ29uZmlnSG9vayB9IGZyb20gXCIuLi9ScGNDb25maWdIb29rXCI7XG5pbXBvcnQgeyBEYXRhVGFibGUsIERhdGFUYWJsZU9wdGlvbnMgfSBmcm9tIFwiLi4vd2lkZ2V0L2RhdGEtdGFibGUvRGF0YVRhYmxlXCI7XG5pbXBvcnQgeyBGb3JtLCBGb3JtVHlwZSB9IGZyb20gXCIuLi93aWRnZXQvZm9ybS9Gb3JtXCI7XG5pbXBvcnQgeyBJbmxpbmVXaWRnZXQgfSBmcm9tIFwiLi4vd2lkZ2V0L2lubGluZS13aWRnZXQvSW5saW5lV2lkZ2V0XCI7XG5pbXBvcnQgeyBBbnlSb3dUeXBlLCBSb3cgfSBmcm9tIFwiLi4vd2lkZ2V0L1Jvd1wiO1xuaW1wb3J0IHsgVGFic1dpZGdldCB9IGZyb20gXCIuLi93aWRnZXQvdGFicy13aWRnZXQvVGFic1dpZGdldFwiO1xuaW1wb3J0IHsgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQgeyBBbnlXaWRnZXRSZWNvcmQgfSBmcm9tIFwiLi4vd2lkZ2V0L3dpZGdldC1tYXAvV2lkZ2V0TWFwXCI7XG5pbXBvcnQgeyBEYXRhTWFuYWdlckhhbmRsZXIgfSBmcm9tIFwiLi9EYXRhTWFuYWdlckhhbmRsZXJcIjtcblxuLy8gRnVsbDxUeXBlPlN0YWNrXG5leHBvcnQgdHlwZSBURGF0YU1hbmFnZXIgPSB7XG4gIERhdGE6IGFueTtcblxuICBUYWJsZVJvd0NvbnRyb2xsZXI6IEFueVJwYztcblxuICBUYWJsZVJvdzogYW55O1xuXG4gIEVkaXRJbnB1dDogQW55SW5wdXQ7XG5cbiAgRWRpdEVycm9yOiBhbnk7XG5cbiAgQWRkSW5wdXQ6IEFueUlucHV0O1xuXG4gIEFkZEVycm9yOiBhbnk7XG5cbiAgRWRpdFRhYnM6IEFueVdpZGdldFJlY29yZDtcbn07XG5cbnR5cGUgX1R5cGVzPFQgZXh0ZW5kcyBURGF0YU1hbmFnZXI+ID0ge1xuICBUYWJsZTogRGF0YVRhYmxlPHtcbiAgICBSb3c6IFRbXCJUYWJsZVJvd1wiXTtcbiAgICBSb3dDb250cm9sbGVyOiBUW1wiVGFibGVSb3dDb250cm9sbGVyXCJdO1xuICAgIERhdGE6IFRbXCJEYXRhXCJdO1xuICB9PjtcblxuICBUYWJsZVR5cGVzOiBXaWRnZXRUeXBlPF9UeXBlczxUPltcIlRhYmxlXCJdPltcIlR5cGVzXCJdO1xuXG4gIFRhYmxlQ29uZmlnOlxuICAgIHwgUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gICAgICAgIF9UeXBlczxUPltcIlRhYmxlVHlwZXNcIl1bXCJPcHRpb25hbENvbmZpZ1wiXSAmXG4gICAgICAgICAgT21pdEtleXM8X1R5cGVzPFQ+W1wiVGFibGVUeXBlc1wiXVtcIlJlcXVpcmVkQ29uZmlnXCJdLCBcInNvdXJjZVwiPlxuICAgICAgPlxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIEVkaXRGb3JtOiBGb3JtPHtcbiAgICBWYWx1ZTogbnVsbDtcbiAgICBFcnJvcjogVFtcIkVkaXRFcnJvclwiXTtcbiAgICBJbnB1dDogVFtcIkVkaXRJbnB1dFwiXTtcbiAgfT47XG5cbiAgQWRkRm9ybTogRm9ybTx7XG4gICAgVmFsdWU6IHN0cmluZztcbiAgICBFcnJvcjogVFtcIkFkZEVycm9yXCJdO1xuICAgIElucHV0OiBUW1wiQWRkSW5wdXRcIl07XG4gIH0+O1xuXG4gIEVkaVRhYk1hcDogVGFic1dpZGdldDxcbiAgICBUW1wiRWRpdFRhYnNcIl0gJiB7XG4gICAgICBmb3JtOiBEYXRhTWFuYWdlclR5cGVzPFQ+W1wiRWRpdEZvcm1cIl07XG4gICAgfVxuICA+O1xufTtcbmV4cG9ydCB0eXBlIERhdGFNYW5hZ2VyQ29uZmlnPFQgZXh0ZW5kcyBURGF0YU1hbmFnZXI+ID0gUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gIHtcbiAgICBnZXRUYWJzQ29uZmlnOlxuICAgICAgfCBDb25maWdGYWN0b3J5PFxuICAgICAgICAgIFJwY1VucmVzb2x2ZWRDb25maWc8X1R5cGVzPFQ+W1wiRWRpVGFiTWFwXCJdPixcbiAgICAgICAgICBbRGF0YVJvdzxUW1wiRGF0YVwiXT5dXG4gICAgICAgID5cbiAgICAgIHwgSWY8SXNFbXB0eU9iamVjdDxUW1wiRWRpdFRhYnNcIl0+LCB1bmRlZmluZWQ+O1xuXG4gICAgYWRkSW5wdXRDb25maWc6IFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIkFkZElucHV0XCJdPjtcblxuICAgIGVkaXRJbnB1dENvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxUW1wiRWRpdElucHV0XCJdPjtcbiAgfSxcbiAge1xuICAgIGdldFZhbHVlRnJvbURhdGFSb3c6IChcbiAgICAgIHJvdzogRGF0YVJvdzxUW1wiRGF0YVwiXT5cbiAgICApID0+IElucHV0VmFsdWU8Rm9ybVR5cGU8X1R5cGVzPFQ+W1wiRWRpdEZvcm1cIl0+W1wiSW5wdXRcIl0+O1xuXG4gICAgc291cmNlOiBEYXRhU291cmNlPFRbXCJEYXRhXCJdPjtcblxuICAgIGdldFRpdGxlOiAocm93OiBEYXRhUm93PFRbXCJEYXRhXCJdPikgPT4gc3RyaW5nO1xuXG4gICAgdGFibGVDb25maWc6IF9UeXBlczxUPltcIlRhYmxlQ29uZmlnXCJdO1xuXG4gICAgYWRkU3VibWl0OiBScGNDb25maWc8X1R5cGVzPFQ+W1wiQWRkRm9ybVwiXT5bXCJzdWJtaXRcIl07XG5cbiAgICBlZGl0U3VibWl0OiAoXG4gICAgICByb3c6IERhdGFSb3c8VFtcIkRhdGFcIl0+LFxuICAgICAgdmFsdWU6IElucHV0VmFsdWU8Rm9ybVR5cGU8X1R5cGVzPFQ+W1wiRWRpdEZvcm1cIl0+W1wiSW5wdXRcIl0+XG4gICAgKSA9PiBBd2FpdGFibGU7XG4gIH1cbj47XG5cbmV4cG9ydCB0eXBlIEFueURhdGFNYW5hZ2VyID0gRGF0YU1hbmFnZXI8VERhdGFNYW5hZ2VyPjtcblxuZXhwb3J0IHR5cGUgRGF0YU1hbmFnZXJUeXBlczxUIGV4dGVuZHMgVERhdGFNYW5hZ2VyPiA9IF9UeXBlczxUPjtcblxuZXhwb3J0IHR5cGUgRGF0YU1hbmFnZXI8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4gPSBScGNDb25maWdIb29rPHtcbiAgUHJvcHM6IHtcbiAgICBkYXRhTWFuYWdlcjoge1xuICAgICAgZWRpdElucHV0OiBBbnlJbnB1dDtcbiAgICAgIGVkaXRUYWJzOiBBbnlXaWRnZXRSZWNvcmQ7XG4gICAgfTtcbiAgfTtcbiAgVGFyZ2V0OiBScGNNYXA8e1xuICAgIGRlbGV0ZTogUnBjRm48KGtleTogc3RyaW5nKSA9PiB2b2lkPjtcblxuICAgIHRhYmxlOiBfVHlwZXM8VD5bXCJUYWJsZVwiXTtcblxuICAgIGFkZDogX1R5cGVzPFQ+W1wiQWRkRm9ybVwiXTtcblxuICAgIGVkaXQ6IFJwY1BhcmFtZXRlcjx7XG4gICAgICBEYXRhOiBzdHJpbmc7XG4gICAgICBUYXJnZXQ6IElubGluZVdpZGdldDx7XG4gICAgICAgIFRhcmdldDogX1R5cGVzPFQ+W1wiRWRpVGFiTWFwXCJdO1xuICAgICAgICBDb250cm9sbGVyOiBOb1JwYztcbiAgICAgICAgRWxlbWVudDogeyB0aXRsZTogc3RyaW5nIH07XG4gICAgICB9PjtcbiAgICB9PjtcbiAgfT47XG4gIENvbmZpZzogR2VuZXJpY0NvbmZpZzxcbiAgICA8RGF0YT4oXG4gICAgICBjb25maWc6IERhdGFNYW5hZ2VyQ29uZmlnPE92ZXJyaWRlPFQsIHsgRGF0YTogRGF0YSB9Pj5cbiAgICApID0+IERhdGFNYW5hZ2VyQ29uZmlnPFQ+XG4gID47XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIERhdGFNYW5hZ2VyPFxuICBUYWJsZVJvd1R5cGUgZXh0ZW5kcyBBbnlSb3dUeXBlLFxuICBBZGRFcnJvcixcbiAgRWRpdEVycm9yLFxuICBBZGRJbnB1dCBleHRlbmRzIEFueUlucHV0LFxuICBFZGl0SW5wdXQgZXh0ZW5kcyBBbnlJbnB1dCA9IEFkZElucHV0LFxuICBUYWJsZVJvd0NvbnRyb2xsZXIgZXh0ZW5kcyBBbnlScGMgPSBOb1JwYyxcbiAgRWRpdFRhYnMgZXh0ZW5kcyBBbnlXaWRnZXRSZWNvcmQgPSB7fVxuPihvcHRpb25zOiB7XG4gIHRhYmxlUm93VHlwZTogVGFibGVSb3dUeXBlO1xuICB0YWJsZU9wdGlvbnM/OiBEYXRhVGFibGVPcHRpb25zPFRhYmxlUm93Q29udHJvbGxlcj47XG4gIGFkZEVycm9yPzogQWRkRXJyb3I7XG4gIGVkaXRFcnJvcj86IEVkaXRFcnJvcjtcbiAgYWRkSW5wdXQ6IEFkZElucHV0O1xuICBlZGl0SW5wdXQ/OiBFZGl0SW5wdXQ7XG4gIGVkaXRUYWJzPzogRWRpdFRhYnM7XG59KTogRGF0YU1hbmFnZXI8e1xuICBUYWJsZVJvd0NvbnRyb2xsZXI6IFRhYmxlUm93Q29udHJvbGxlcjtcbiAgVGFibGVSb3c6IFJvdzxUYWJsZVJvd1R5cGU+O1xuICBEYXRhOiBhbnk7XG4gIEFkZEVycm9yOiBBZGRFcnJvcjtcbiAgQWRkSW5wdXQ6IEFkZElucHV0O1xuICBFZGl0RXJyb3I6IEVkaXRFcnJvcjtcbiAgRWRpdElucHV0OiBFZGl0SW5wdXQ7XG4gIEVkaXRUYWJzOiBFZGl0VGFicztcbn0+IHtcbiAgY29uc3QgZWRpdElucHV0OiBBbnlJbnB1dCA9IG9wdGlvbnMuZWRpdElucHV0IHx8IG9wdGlvbnMuYWRkSW5wdXQ7XG4gIGNvbnN0IGVkaXRUYWJzID0ge1xuICAgIGZvcm06IEZvcm0oeyBpbnB1dDogZWRpdElucHV0IH0pLFxuICAgIC4uLihvcHRpb25zLmVkaXRUYWJzIGFzIHt9KSxcbiAgfSBhcyBBbnlXaWRnZXRSZWNvcmQ7XG4gIHJldHVybiA8YW55PlJwY0NvbmZpZ0hvb2s8QW55RGF0YU1hbmFnZXI+KHtcbiAgICBwcm9wczoge1xuICAgICAgZGF0YU1hbmFnZXI6IHtcbiAgICAgICAgZWRpdElucHV0LFxuICAgICAgICBlZGl0VGFicyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBpc0dlbmVyaWNDb25maWc6IHRydWUsXG4gICAgaGFuZGxlcjogRGF0YU1hbmFnZXJIYW5kbGVyLFxuICAgIHRhcmdldDogUnBjTWFwKHtcbiAgICAgIGRlbGV0ZTogUnBjRm48KGtleTogc3RyaW5nKSA9PiB2b2lkPigpLFxuXG4gICAgICB0YWJsZTogRGF0YVRhYmxlKG9wdGlvbnMudGFibGVSb3dUeXBlLCBvcHRpb25zLnRhYmxlT3B0aW9ucyksXG5cbiAgICAgIGFkZDogRm9ybSh7XG4gICAgICAgIGlucHV0OiBvcHRpb25zLmFkZElucHV0LFxuICAgICAgfSksXG5cbiAgICAgIGVkaXQ6IFJwY1BhcmFtZXRlcihcbiAgICAgICAgU3RyaW5nLFxuICAgICAgICBJbmxpbmVXaWRnZXQoe1xuICAgICAgICAgIHRhcmdldDogVGFic1dpZGdldChlZGl0VGFicyksXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgIH0pLFxuICB9KTtcbn1cbiIsImltcG9ydCB7IFJwY0NvbmZpZ0hvb2tIYW5kbGVyIH0gZnJvbSBcIi4uL1JwY0NvbmZpZ0hvb2tcIjtcbmltcG9ydCB7IEFueURhdGFNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YU1hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IERhdGFNYW5hZ2VySGFuZGxlcjogUnBjQ29uZmlnSG9va0hhbmRsZXI8QW55RGF0YU1hbmFnZXI+ID0gKHtcbiAgY29uZmlnLFxuICBwcm9wczoge1xuICAgIGRhdGFNYW5hZ2VyOiB7IGVkaXRJbnB1dCB9LFxuICB9LFxufSkgPT4gJCA9PiB7XG4gIHJldHVybiAkKHtcbiAgICBhc3luYyBkZWxldGUoa2V5KSB7XG4gICAgICBhd2FpdCBjb25maWcuc291cmNlLmRlbGV0ZShrZXkpO1xuICAgIH0sXG4gICAgdGFibGU6ICQgPT5cbiAgICAgICQoe1xuICAgICAgICAuLi5jb25maWcudGFibGVDb25maWcsXG4gICAgICAgIHNvdXJjZTogY29uZmlnLnNvdXJjZSxcbiAgICAgIH0pLFxuICAgIGFkZDoge1xuICAgICAgaW5wdXRDb25maWc6IGNvbmZpZy5hZGRJbnB1dENvbmZpZyxcbiAgICAgIHN1Ym1pdDogdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gY29uZmlnLmFkZFN1Ym1pdCh2YWx1ZSk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgZWRpdDogYXN5bmMgKCQsIGtleSkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0gYXdhaXQgY29uZmlnLnNvdXJjZS5nZXRPckZhaWwoa2V5KTtcbiAgICAgIHJldHVybiAkKHtcbiAgICAgICAgZ2V0RWxlbWVudCgpIHtcbiAgICAgICAgICByZXR1cm4geyB0aXRsZTogY29uZmlnLmdldFRpdGxlKHJvdykgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdGFyZ2V0Q29uZmlnOiB7XG4gICAgICAgICAgZm9ybTogeyBpbnB1dENvbmZpZzogY29uZmlnLmVkaXRJbnB1dENvbmZpZyB9LFxuICAgICAgICAgIHN1Ym1pdCh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5lZGl0U3VibWl0KHJvdywgdmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBXaXRoTWV0YVR5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL01ldGFUeXBlXCI7XG5pbXBvcnQgeyBtYXBPYmplY3QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7IFJvdXRlciwgVEVtcHR5Um91dGVyIH0gZnJvbSBcIi4uLy4uL3R5cGVyb3V0ZXIvUm91dGVyXCI7XG5pbXBvcnQgeyBEYXRhTWFuYWdlciwgVERhdGFNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YU1hbmFnZXJcIjtcblxuZXhwb3J0IHR5cGUgVERhdGFNYW5hZ2VyUm91dGVyPFQgZXh0ZW5kcyBURGF0YU1hbmFnZXI+ID0gV2l0aE1ldGFUeXBlPHtcbiAgVERhdGFNYW5hZ2VyOiBUO1xufT4gJlxuICBURW1wdHlSb3V0ZXIuV2l0aENoaWxkcmVuPHtcbiAgICBhZGQ6IFRFbXB0eVJvdXRlcjtcbiAgICBlZGl0OiBURW1wdHlSb3V0ZXIuV2l0aFBhcmFtczxcbiAgICAgIFwiaWRcIixcbiAgICAgIHtcbiAgICAgICAgW0sgaW4ga2V5b2YgVFtcIkVkaXRUYWJzXCJdXTogVEVtcHR5Um91dGVyO1xuICAgICAgfVxuICAgID47XG4gIH0+O1xuXG5leHBvcnQgZnVuY3Rpb24gRGF0YU1hbmFnZXJSb3V0ZXI8VCBleHRlbmRzIFREYXRhTWFuYWdlcj4oXG4gIGRtOiBEYXRhTWFuYWdlcjxUPlxuKTogUm91dGVyPFREYXRhTWFuYWdlclJvdXRlcjxUPj4ge1xuICByZXR1cm4gPGFueT4oPFJvdXRlcjxURGF0YU1hbmFnZXJSb3V0ZXI8VERhdGFNYW5hZ2VyPj4+Um91dGVyKHtcbiAgICBhZGQ6IFJvdXRlcigpLFxuICAgIGVkaXQ6IFJvdXRlcihcbiAgICAgIFtcImlkXCJdLFxuICAgICAgbWFwT2JqZWN0KGRtLmRhdGFNYW5hZ2VyLmVkaXRUYWJzLCAoKSA9PiBSb3V0ZXIoKSlcbiAgICApLFxuICB9KSk7XG59XG4iLCJpbXBvcnQgeyBSZXF1aXJlT3B0aW9uYWxLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQge1xuICBBbnlJbnB1dCxcbiAgSUlucHV0LFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRFcnJvcixcbiAgSW5wdXRFcnJvck9yVmFsdWUsXG4gIElucHV0VmFsdWUsXG4gIElucHV0VmFsdWVFbGVtZW50LFxuICBJbnB1dEVsZW1lbnQsXG59IGZyb20gXCIuL0lucHV0XCI7XG5pbXBvcnQge1xuICBScGNSZXNvbHZlZENvbmZpZyxcbiAgUnBjUmVzb2x2ZWRIYW5kbGVyLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxufSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldEhhbmRsZXIgfSBmcm9tIFwiLi4vd2lkZ2V0L0Fic3RyYWN0V2lkZ2V0SGFuZGxlclwiO1xuaW1wb3J0IHsgSVdpZGdldEhhbmRsZXIsIFdpZGdldEVsZW1lbnQgfSBmcm9tIFwiLi4vd2lkZ2V0L1dpZGdldFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RJbnB1dEhhbmRsZXI8VCBleHRlbmRzIEFueUlucHV0PlxuICBleHRlbmRzIEFic3RyYWN0V2lkZ2V0SGFuZGxlcjxUPlxuICBpbXBsZW1lbnRzIElXaWRnZXRIYW5kbGVyPElJbnB1dD4ge1xuICBhYnN0cmFjdCBsb2FkQW5kQ2hlY2soZGF0YTogSW5wdXRWYWx1ZURhdGE8VD4pOiBQcm9taXNlPElucHV0RXJyb3JPclZhbHVlPFQ+PjtcblxuICBhYnN0cmFjdCBnZXRWYWx1ZUVsZW1lbnQoXG4gICAgdmFsdWU6IElucHV0VmFsdWU8VD4gfCB1bmRlZmluZWRcbiAgKTogUHJvbWlzZTxJbnB1dFZhbHVlRWxlbWVudDxUPj47XG5cbiAgYWJzdHJhY3QgZ2V0SW5wdXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxJbnB1dEVsZW1lbnQ8VD4+PjtcblxuICBhc3luYyBnZXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxXaWRnZXRFbGVtZW50PFQ+Pj4ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi4oYXdhaXQgdGhpcy5nZXRJbnB1dEVsZW1lbnQoKSksXG4gICAgICB2YWx1ZTogYXdhaXQgdGhpcy5nZXRWYWx1ZUVsZW1lbnQodW5kZWZpbmVkKSxcbiAgICB9IGFzIFJlcXVpcmVPcHRpb25hbEtleXM8V2lkZ2V0RWxlbWVudDxUPj47XG4gIH1cblxuICBhc3luYyBoYW5kbGVDaGVjayhcbiAgICBkYXRhOiBJbnB1dFZhbHVlRGF0YTxUPlxuICApOiBQcm9taXNlPElucHV0RXJyb3I8VD4gfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmxvYWRBbmRDaGVjayhkYXRhKTtcbiAgICBpZiAoXCJlcnJvclwiIGluIHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5lcnJvcjtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIFRPRE86IEFic3RyYWN0SW5wdXRWaWV3XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBGcmFnbWVudCwgUmVhY3RFbGVtZW50LCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEF3YWl0YWJsZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgVmlld1N0YXRlIH0gZnJvbSBcIi4uLy4uL3JlYWN0L3ZpZXcvVmlld1N0YXRlXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXRWaWV3IH0gZnJvbSBcIi4uL3dpZGdldC9BYnN0cmFjdFdpZGdldFZpZXdcIjtcbmltcG9ydCB7IFdpZGdldFR5cGUgfSBmcm9tIFwiLi4vd2lkZ2V0L1dpZGdldFwiO1xuLy8gVE9ETzogdHlwZSBJbnB1dFZpZXdcbmltcG9ydCB7XG4gIEFueUlucHV0LFxuICBBbnlJbnB1dENvbm5lY3Rpb24sXG4gIElucHV0RXJyb3IsXG4gIElucHV0VHlwZSxcbiAgSW5wdXRWYWx1ZURhdGEsXG4gIElucHV0VmFsdWVFbGVtZW50LFxufSBmcm9tIFwiLi9JbnB1dFwiO1xuaW1wb3J0IHsgSW5wdXRFcnJvckVsZW1lbnRNYXAsIElucHV0VmlldywgSW5wdXRWaWV3UHJvcHMgfSBmcm9tIFwiLi9JbnB1dFZpZXdcIjtcbmltcG9ydCB7IElucHV0Vmlld0NoaWxkcmVuIH0gZnJvbSBcIi4vSW5wdXRWaWV3Q2hpbGRyZW5cIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0SW5wdXRWaWV3PFxuICAgIEMgZXh0ZW5kcyBBbnlJbnB1dENvbm5lY3Rpb24sXG4gICAgUCBleHRlbmRzIElucHV0Vmlld1Byb3BzPEM+ID0gSW5wdXRWaWV3UHJvcHM8Qz4sXG4gICAgVCBleHRlbmRzIElucHV0VHlwZTxDPiA9IElucHV0VHlwZTxDPlxuICA+XG4gIGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRWaWV3PEMsIFA+XG4gIGltcGxlbWVudHMgSW5wdXRWaWV3PEM+IHtcbiAgcHJvdGVjdGVkIHVwZGF0ZUVycm9yPyhlcnJvcjogVFtcIkVycm9yXCJdIHwgdW5kZWZpbmVkKTogdm9pZDtcblxuICBAVmlld1N0YXRlKFwiZm9yY2VVcGRhdGVWYWx1ZVwiKSBwcm90ZWN0ZWQgX3ZhbHVlOlxuICAgIHwgSW5wdXRWYWx1ZUVsZW1lbnQ8Qz5cbiAgICB8IHVuZGVmaW5lZDtcblxuICBAVmlld1N0YXRlKFwiZm9yY2VVcGRhdGVFcnJvclwiKSBwcm90ZWN0ZWQgX2Vycm9yOiBJbnB1dEVycm9yPEM+O1xuXG4gIEBWaWV3U3RhdGUoKSBfZXJyb3JFbGVtZW50OiBSZWFjdEVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgQFZpZXdTdGF0ZSgpIGlzVmFsaWRhdGluZzogYm9vbGVhbjtcblxuICBwcm90ZWN0ZWQgX2RhdGE6IElucHV0VmFsdWVEYXRhPEM+O1xuICBwcm90ZWN0ZWQgX2lzVmFsaWRWYWx1ZTogYm9vbGVhbjtcblxuICBjaGlsZHJlbj86IElucHV0Vmlld0NoaWxkcmVuO1xuXG4gIGdldCBlcnJvckVsZW1lbnQoKTogUmVhY3RFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JFbGVtZW50O1xuICB9XG5cbiAgZ2V0IGRhdGEoKTogSW5wdXRWYWx1ZURhdGE8Qz4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgZ2V0IGVycm9yKCk6IFRbXCJFcnJvclwiXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IElucHV0VmFsdWVFbGVtZW50PEM+IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBhc3luYyBzZXRWYWx1ZSh2YWx1ZTogSW5wdXRWYWx1ZUVsZW1lbnQ8Qz4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5faXNWYWxpZFZhbHVlICYmIHRoaXMuX3ZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5pc1ZhbGlkYXRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2Vycm9yID0gYXdhaXQgdGhpcy5nZXRFcnJvcj8uKCk7XG4gICAgdGhpcy5pc1ZhbGlkYXRpbmcgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5fZXJyb3IgIT0gbnVsbCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkVycm9yPy4odGhpcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2lzVmFsaWRWYWx1ZSA9IHRydWU7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZT8uKHRoaXMpO1xuICB9XG5cbiAgc2V0RXJyb3IoZXJyb3I6IFRbXCJFcnJvclwiXSB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX2Vycm9yID0gZXJyb3I7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RXJyb3I/KCk6IEF3YWl0YWJsZTxJbnB1dEVycm9yPEM+IHwgdW5kZWZpbmVkPjtcblxuICBwcm90ZWN0ZWQgdXBkYXRlVmFsdWU/KHZhbHVlOiBJbnB1dFZhbHVlRWxlbWVudDxDPiB8IHVuZGVmaW5lZCk6IHZvaWQ7XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUVsZW1lbnQoZWxlbWVudDogV2lkZ2V0VHlwZTxDPltcIkVsZW1lbnRcIl0pIHtcbiAgICB0aGlzLl92YWx1ZSA9XG4gICAgICB0aGlzLnByb3BzLnZhbHVlICE9PSB1bmRlZmluZWQgPyB0aGlzLnByb3BzLnZhbHVlIDogZWxlbWVudC52YWx1ZTtcbiAgfVxuXG4gIGZvcmNlVXBkYXRlVmFsdWUoKSB7XG4gICAgdGhpcy5fZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5faXNWYWxpZFZhbHVlID0gZmFsc2U7XG4gICAgdGhpcy5fZGF0YSA9IHRoaXMucnBjLmdldFZhbHVlRGF0YUZyb21FbGVtZW50KHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlPy4odGhpcy5fdmFsdWUpO1xuICB9XG5cbiAgLy8gVE9ETzogW1wiY2hpbGRyZW5cIiwgeyAuLi4gfV1cbiAgcHJvdGVjdGVkIHJlbmRlckVycm9yRWxlbWVudCgpOiBSZWFjdEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHsgZXJyb3IgfSA9IHRoaXM7XG4gICAgLy8gVE9ETzogdXNlIHRoaXMuZXJyb3JcbiAgICBpZiAoZXJyb3IgPT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnByb3BzLnJlbmRlckVycm9yPy4oZXJyb3IpO1xuICAgIGlmIChlbGVtZW50KSByZXR1cm4gZWxlbWVudDtcblxuICAgIGNvbnN0IGVycm9yTWFwOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdEVsZW1lbnQgfCAoKGVycm9yKSA9PiBSZWFjdEVsZW1lbnQpPiA9IHtcbiAgICAgIC4uLnRoaXMuZ2V0RXJyb3JFbGVtZW50TWFwPy4oKSEsXG4gICAgICAuLi50aGlzLnByb3BzLmVycm9yTWFwLFxuICAgIH07XG5cbiAgICBjb25zdCBlcnJvclR5cGUgPVxuICAgICAgdHlwZW9mIGVycm9yID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gZXJyb3JcbiAgICAgICAgOiB0eXBlb2YgZXJyb3IgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGVycm9yLnR5cGUgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBlcnJvci50eXBlXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgZXJyb3JFbGVtZW50T3JGbiA9IGVycm9yTWFwW2Vycm9yVHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGVycm9yRWxlbWVudE9yRm4gPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxuICAgICAgICBGcmFnbWVudCxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgZXJyb3JFbGVtZW50T3JGbih0eXBlb2YgZXJyb3IgPT09IFwib2JqZWN0XCIgPyBlcnJvciA6IHVuZGVmaW5lZClcbiAgICAgICk7XG5cbiAgICBpZiAoZXJyb3JFbGVtZW50T3JGbikgcmV0dXJuIGVycm9yRWxlbWVudE9yRm47XG4gIH1cblxuICBmb3JjZVVwZGF0ZUVycm9yKCkge1xuICAgIHRoaXMuX2Vycm9yRWxlbWVudCA9XG4gICAgICB0aGlzLl9lcnJvciAhPSBudWxsID8gdGhpcy5yZW5kZXJFcnJvckVsZW1lbnQoKSA6IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuY2hpbGRyZW4/LnVwZGF0ZUVycm9yKHRoaXMuX2Vycm9yKTtcbiAgICB0aGlzLnVwZGF0ZUVycm9yPy4odGhpcy5fZXJyb3IpO1xuICB9XG5cbiAgaW5wdXRXaWxsVmFsaWRhdGU/KCk6IEF3YWl0YWJsZTtcblxuICBhc3luYyB2YWxpZGF0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBhd2FpdCB0aGlzLmlucHV0V2lsbFZhbGlkYXRlPy4oKTtcbiAgICBjb25zdCBlcnJvciA9XG4gICAgICAoYXdhaXQgdGhpcy5jaGlsZHJlbj8uZ2V0RXJyb3IoKSkgPz8gKGF3YWl0IHRoaXMuZ2V0RXJyb3I/LigpKTtcbiAgICByZXR1cm4gbnVsbCA9PSAodGhpcy5fZXJyb3IgPSBlcnJvcik7XG4gIH1cblxuICB1cGRhdGVWaWV3UHJvcHMocHJldlByb3BzOiBSZWFkb25seTxQPiwgbmV4dFByb3BzOiBSZWFkb25seTxQPikge1xuICAgIHN1cGVyLnVwZGF0ZVZpZXdQcm9wcyhwcmV2UHJvcHMsIG5leHRQcm9wcyk7XG4gICAgaWYgKG5leHRQcm9wcy52YWx1ZSAhPT0gcHJldlByb3BzLnZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IG5leHRQcm9wcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RXJyb3JFbGVtZW50TWFwPygpOiBJbnB1dEVycm9yRWxlbWVudE1hcDxDPjtcblxuICByZW5kZXJFcnJvcigpOiBSZWFjdE5vZGUge1xuICAgIGlmICh0aGlzLmVycm9yRWxlbWVudCkgcmV0dXJuIHRoaXMuZXJyb3JFbGVtZW50O1xuXG4gICAgY29uc3QgeyBlcnJvciB9ID0gdGhpcztcbiAgICBpZiAodHlwZW9mIGVycm9yID09PSBcInN0cmluZ1wiKSByZXR1cm4gZXJyb3I7XG5cbiAgICBpZiAoZXJyb3IgIT0gbnVsbCkgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycm9yKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHN1cGVyLmNvbXBvbmVudERpZE1vdW50KCk7XG4gICAgdGhpcy5wcm9wcy5pbnB1dFJlZj8uKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgc3VwZXIuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbiAgICB0aGlzLnByb3BzLmlucHV0UmVmPy4obnVsbCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgSW5wdXRWaWV3Q2xhc3M8VCBleHRlbmRzIEFueUlucHV0PiA9IG5ldyAoXG4gIHByb3BzOiBJbnB1dFZpZXdQcm9wczxScGNDb25uZWN0aW9uPFQ+PlxuKSA9PiBBYnN0cmFjdElucHV0VmlldzxScGNDb25uZWN0aW9uPFQ+PjtcbiIsIi8vIFRPRE86IFJlbmFtZSB0byAqSW5wdXRcbmltcG9ydCB7IG1lcmdlRGVzY3JpcHRvcnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL29iamVjdC9tZXJnZURlc2NyaXB0b3JzXCI7XG5pbXBvcnQge1xuICBBd2FpdGFibGUsXG4gIElmLFxuICBJcyxcbiAgSXNFbXB0eU9iamVjdCxcbiAgSXNVbmRlZmluZWQsXG4gIE5vdCxcbiAgT3ZlcnJpZGUsXG4gIFBhcnRpYWxVbmRlZmluZWRLZXlzLFxufSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IE5vUnBjIH0gZnJvbSBcIi4uL05vUnBjXCI7XG5pbXBvcnQge1xuICBCYXNlZFJwYyxcbiAgUnBjSXNHZW5lcmljQ29uZmlnT3B0aW9uLFxuICBScGNDb25uZWN0aW9uLFxuICBScGNIYW5kbGVyQ2xhc3MsXG4gIFJwY1Jlc29sdmVkSGFuZGxlcixcbiAgUnBjVHlwZSxcbiAgUnBjVW5yZXNvbHZlZENvbmZpZyxcbiAgUnBjUHJvcHNPcHRpb24sXG59IGZyb20gXCIuLi9ScGNcIjtcbmltcG9ydCB7IElzR2VuZXJpY0NvbmZpZyB9IGZyb20gXCIuLi9HZW5lcmljQ29uZmlnXCI7XG5pbXBvcnQge1xuICBUV2lkZ2V0LFxuICBXaWRnZXQsXG4gIFdpZGdldENvbW1hbmRzT3B0aW9uLFxuICBXaWRnZXRDb250cm9sbGVyT3B0aW9uLFxuICBXaWRnZXRFbGVtZW50LFxuICBXaWRnZXRUeXBlLFxufSBmcm9tIFwiLi4vd2lkZ2V0L1dpZGdldFwiO1xuXG5leHBvcnQgdHlwZSBJSW5wdXQgPSBJbnB1dDxcbiAgT3ZlcnJpZGU8XG4gICAgVElucHV0LFxuICAgIHtcbiAgICAgIENvbW1hbmRzOiB7fTtcbiAgICB9XG4gID5cbj47XG5leHBvcnQgdHlwZSBUSW5wdXQgPSB7XG4gIFZhbHVlRGF0YTogYW55O1xuXG4gIFZhbHVlOiBhbnk7XG5cbiAgQ29udHJvbGxlcjogVFdpZGdldFtcIkNvbnRyb2xsZXJcIl07XG5cbiAgUHJvcHM6IFRXaWRnZXRbXCJQcm9wc1wiXTtcblxuICBDb25maWc6IFRXaWRnZXRbXCJDb25maWdcIl07XG5cbiAgRWxlbWVudDogVFdpZGdldFtcIkVsZW1lbnRcIl07XG5cbiAgVmFsdWVFbGVtZW50OiBhbnk7XG5cbiAgRXJyb3I6IGFueTtcblxuICBDb21tYW5kczogVFdpZGdldFtcIkNvbW1hbmRzXCJdO1xufTtcblxuZXhwb3J0IHR5cGUgSW5wdXRFbGVtZW50PFQgZXh0ZW5kcyBBbnlJbnB1dD4gPSBJbnB1dFR5cGU8VD5bXCJFbGVtZW50XCJdO1xuXG5leHBvcnQgdHlwZSBJbnB1dDxUIGV4dGVuZHMgVElucHV0PiA9IFdpZGdldDx7XG4gIENvbW1hbmRzOiBUW1wiQ29tbWFuZHNcIl0gJiB7XG4gICAgY2hlY2s6IHtcbiAgICAgIChkYXRhOiBUW1wiVmFsdWVEYXRhXCJdKTogVFtcIkVycm9yXCJdIHwgdW5kZWZpbmVkO1xuICAgICAgaGFuZGxlcjogXCJoYW5kbGVDaGVja1wiO1xuICAgIH07XG4gIH07XG5cbiAgVElucHV0OiBUO1xuXG4gIENvbm5lY3Rpb246IHt9O1xuXG4gIENvbmZpZzogVFtcIkNvbmZpZ1wiXTtcblxuICBIYW5kbGVyOiB7XG4gICAgZ2V0SW5wdXRFbGVtZW50KCk6IFByb21pc2U8VFtcIkVsZW1lbnRcIl0+O1xuICAgIGdldFZhbHVlRWxlbWVudCh2YWx1ZTogVFtcIlZhbHVlXCJdIHwgdW5kZWZpbmVkKTogUHJvbWlzZTxUW1wiVmFsdWVFbGVtZW50XCJdPjtcbiAgICBsb2FkQW5kQ2hlY2soXG4gICAgICB2YWx1ZURhdGE6IFRbXCJWYWx1ZURhdGFcIl1cbiAgICApOiBQcm9taXNlPElucHV0RXJyb3JPclZhbHVlPElucHV0PFQ+Pj47XG4gIH07XG5cbiAgUHJvcHM6IFRbXCJQcm9wc1wiXSAmIHtcbiAgICBpbnB1dE9wdGlvbnM6IElucHV0T3B0aW9uczxUSW5wdXQ+O1xuXG4gICAgZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQoXG4gICAgICB0aGlzOiBJbnB1dDxUPixcbiAgICAgIGVsZW1lbnQ6IFRbXCJWYWx1ZUVsZW1lbnRcIl1cbiAgICApOiBUW1wiVmFsdWVEYXRhXCJdO1xuICB9O1xuXG4gIEVsZW1lbnQ6IFRbXCJFbGVtZW50XCJdICYge1xuICAgIHZhbHVlOiBUW1wiVmFsdWVFbGVtZW50XCJdIHwgdW5kZWZpbmVkO1xuICB9O1xuXG4gIENvbnRyb2xsZXI6IFRbXCJDb250cm9sbGVyXCJdO1xufT47XG5cbmV4cG9ydCB0eXBlIEJhc2VkSW5wdXQ8VCBleHRlbmRzIFRJbnB1dCA9IFRJbnB1dD4gPSBCYXNlZFJwYzxScGNUeXBlPElucHV0PFQ+Pj47XG5cbmV4cG9ydCB0eXBlIElucHV0VHlwZTxUIGV4dGVuZHMgQmFzZWRJbnB1dD4gPSBXaWRnZXRUeXBlPFQ+W1wiVElucHV0XCJdO1xuXG5leHBvcnQgdHlwZSBFcnJvck9yVmFsdWU8RSwgVj4gPVxuICB8IHsgZXJyb3I6IEU7IHZhbHVlOiBWIHwgdW5kZWZpbmVkIH1cbiAgfCB7IHZhbHVlOiBWIH07XG5cbmV4cG9ydCB0eXBlIElucHV0RXJyb3JPclZhbHVlPFQgZXh0ZW5kcyBCYXNlZElucHV0PiA9IEVycm9yT3JWYWx1ZTxcbiAgSW5wdXRFcnJvcjxUPixcbiAgSW5wdXRWYWx1ZTxUPlxuPjtcblxuZXhwb3J0IHR5cGUgQW55SW5wdXQgPSBJbnB1dDxUSW5wdXQ+O1xuZXhwb3J0IHR5cGUgQW55SW5wdXRDb25uZWN0aW9uID0gUnBjQ29ubmVjdGlvbjxBbnlJbnB1dD47XG5cbmV4cG9ydCB0eXBlIElucHV0T3B0aW9uczxUIGV4dGVuZHMgVElucHV0PiA9IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICB7XG4gICAgaXNHZW5lcmljQ29uZmlnOiBScGNJc0dlbmVyaWNDb25maWdPcHRpb248VD47XG5cbiAgICBwcm9wczogUnBjUHJvcHNPcHRpb248VD47XG5cbiAgICBjb250cm9sbGVyOiBXaWRnZXRDb250cm9sbGVyT3B0aW9uPFQ+O1xuICB9LFxuICB7XG4gICAgaGFuZGxlcjogUnBjSGFuZGxlckNsYXNzPElucHV0PFQ+PjtcblxuICAgIGdldFZhbHVlRGF0YUZyb21FbGVtZW50OiAoXG4gICAgICB0aGlzOiBJbnB1dDxUPixcbiAgICAgIHZhbHVlOiBJbnB1dFZhbHVlRWxlbWVudDxJbnB1dDxUPj5cbiAgICApID0+IElucHV0VmFsdWVEYXRhPElucHV0PFQ+PjtcbiAgfVxuPjtcblxuZXhwb3J0IGZ1bmN0aW9uIElucHV0PFIgZXh0ZW5kcyBCYXNlZElucHV0LCBUIGV4dGVuZHMgVElucHV0ID0gSW5wdXRUeXBlPFI+PihcbiAgb3B0aW9uczogSW5wdXRPcHRpb25zPFQ+XG4pOiBJbnB1dDxUPiB7XG4gIGNvbnN0IHtcbiAgICBwcm9wcyA9IHt9LFxuICAgIGlzR2VuZXJpY0NvbmZpZyxcbiAgICBjb250cm9sbGVyLFxuICAgIGhhbmRsZXIsXG4gICAgZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQsXG4gIH0gPSBvcHRpb25zIGFzIElucHV0T3B0aW9uczxUSW5wdXQ+O1xuXG4gIHJldHVybiA8YW55PldpZGdldDxBbnlJbnB1dD4oe1xuICAgIHByb3BzOiBtZXJnZURlc2NyaXB0b3JzKHByb3BzLCB7XG4gICAgICBpbnB1dE9wdGlvbnM6IDxJbnB1dE9wdGlvbnM8VElucHV0Pj5vcHRpb25zLFxuICAgICAgZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQsXG4gICAgfSksXG4gICAgY29udHJvbGxlcixcbiAgICBpc0dlbmVyaWNDb25maWcsXG4gICAgY29tbWFuZHM6IHsgY2hlY2s6IFwiaGFuZGxlQ2hlY2tcIiB9LFxuICAgIGhhbmRsZXIsXG4gIH0pO1xufVxuXG5leHBvcnQgdHlwZSBJbnB1dFZhbHVlPFQgZXh0ZW5kcyBCYXNlZElucHV0PiA9IElucHV0VHlwZTxUPltcIlZhbHVlXCJdO1xuXG5leHBvcnQgdHlwZSBJbnB1dFZhbHVlRWxlbWVudDxUIGV4dGVuZHMgQmFzZWRJbnB1dD4gPSBJbnB1dFR5cGU8XG4gIFRcbj5bXCJWYWx1ZUVsZW1lbnRcIl07XG5cbmV4cG9ydCB0eXBlIElucHV0RXJyb3I8VCBleHRlbmRzIEJhc2VkSW5wdXQ+ID0gSW5wdXRUeXBlPFQ+W1wiRXJyb3JcIl07XG5cbmV4cG9ydCB0eXBlIElucHV0VmFsdWVEYXRhPFQgZXh0ZW5kcyBCYXNlZElucHV0PiA9IElucHV0VHlwZTxUPltcIlZhbHVlRGF0YVwiXTtcbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dFZpZXcgfSBmcm9tIFwiLi9BYnN0cmFjdElucHV0Vmlld1wiO1xuaW1wb3J0IHsgQW55SW5wdXQsIElucHV0LCBJbnB1dEVycm9yLCBJbnB1dFR5cGUgfSBmcm9tIFwiLi9JbnB1dFwiO1xuaW1wb3J0IHsgSW5wdXRWaWV3LCBJbnB1dFZpZXdQcm9wcyB9IGZyb20gXCIuL0lucHV0Vmlld1wiO1xuXG5leHBvcnQgdHlwZSBBbnlJbnB1dEVycm9ySG9vayA9IElucHV0RXJyb3JIb29rPFRJbnB1dEVycm9ySG9vaz47XG5cbmV4cG9ydCB0eXBlIFRJbnB1dEVycm9ySG9vayA9IHsgVGFyZ2V0OiBBbnlJbnB1dDsgRXJyb3I6IGFueSB9O1xuZXhwb3J0IHR5cGUgSW5wdXRFcnJvckhvb2s8VCBleHRlbmRzIFRJbnB1dEVycm9ySG9vaz4gPSBJbnB1dDxcbiAgT21pdDxJbnB1dFR5cGU8VFtcIlRhcmdldFwiXT4sIFwiRXJyb3JcIj4gJiB7XG4gICAgVElucHV0RXJyb3JIb29rOiBUO1xuICAgIEVycm9yOiBJbnB1dEVycm9yPFRbXCJUYXJnZXRcIl0+IHwgVFtcIkVycm9yXCJdO1xuICB9XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gSW5wdXRFcnJvckhvb2s8RT4oKSB7XG4gIHJldHVybiA8VCBleHRlbmRzIEFueUlucHV0PihcbiAgICBpbnB1dDogVFxuICApOiBJbnB1dEVycm9ySG9vazx7IFRhcmdldDogVDsgRXJyb3I6IEUgfT4gPT4ge1xuICAgIHJldHVybiA8YW55PmlucHV0O1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSW5wdXRFcnJvckhvb2tWaWV3UHJvcHM8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueUlucHV0RXJyb3JIb29rPixcbiAgVCBleHRlbmRzIFRJbnB1dEVycm9ySG9vayA9IElucHV0VHlwZTxDPltcIlRJbnB1dEVycm9ySG9va1wiXVxuICAvLyBUIGV4dGVuZHMgQW55SW5wdXQgPSBJbnB1dFR5cGU8Qz5bXCJURXJyb3JIb29rXCJdW1wiVGFyZ2V0XCJdXG4+KHByb3BzOiBJbnB1dFZpZXdQcm9wczxDPik6IElucHV0Vmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248VFtcIlRhcmdldFwiXT4+IHtcbiAgcmV0dXJuIDxhbnk+cHJvcHM7XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dEVycm9ySG9va1ZpZXc8XG4gIEMgZXh0ZW5kcyBScGNDb25uZWN0aW9uPEFueUlucHV0RXJyb3JIb29rPixcbiAgVCBleHRlbmRzIFRJbnB1dEVycm9ySG9vayA9IElucHV0VHlwZTxDPltcIlRJbnB1dEVycm9ySG9va1wiXSxcbiAgVGFyZ2V0IGV4dGVuZHMgQW55SW5wdXQgPSBUW1wiVGFyZ2V0XCJdXG4+IGV4dGVuZHMgQWJzdHJhY3RJbnB1dFZpZXc8XG4gIEMsXG4gIElucHV0Vmlld1Byb3BzPEM+ICYge1xuICAgIGNoaWxkcmVuKFxuICAgICAgcHJvcHM6IElucHV0Vmlld1Byb3BzPFJwY0Nvbm5lY3Rpb248VGFyZ2V0Pj4sXG4gICAgICBlcnJvcjogUmVhY3RFbGVtZW50IHwgdW5kZWZpbmVkXG4gICAgKTogUmVhY3RFbGVtZW50O1xuICB9XG4+IHtcbiAgdGFyZ2V0OiBJbnB1dFZpZXc8UnBjQ29ubmVjdGlvbjxUYXJnZXQ+PiB8IG51bGw7XG5cbiAgaW5wdXRXaWxsVmFsaWRhdGUoKTogQXdhaXRhYmxlIHtcbiAgICByZXR1cm4gdGhpcy50YXJnZXQ/LnZhbGlkYXRlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlRXJyb3IoZXJyb3I6IElucHV0VHlwZTxDPltcIkVycm9yXCJdIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKCF0aGlzLmVycm9yRWxlbWVudCkge1xuICAgICAgdGhpcy50YXJnZXQ/LnNldEVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJWaWV3KCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgY29uc3QgeyBjb25uZWN0aW9uLCBlbGVtZW50IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW4oXG4gICAgICB7XG4gICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgIGVsZW1lbnQsXG4gICAgICAgIGlucHV0UmVmOiB0YXJnZXQgPT4ge1xuICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIH0sXG4gICAgICB0aGlzLmVycm9yRWxlbWVudFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBheWxvYWQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcblxuZXhwb3J0IHR5cGUgTGVuZ3RoRXJyb3IgPSBQYXlsb2FkPHtcbiAgTUFYX0xFTkdUSDogeyBtYXhMZW5ndGg6IG51bWJlciB9O1xuICBNSU5fTEVOR1RIOiB7IG1pbkxlbmd0aDogbnVtYmVyIH07XG59PjtcbmV4cG9ydCB0eXBlIExlbmd0aE9wdGlvbnMgPSB7XG4gIG1heExlbmd0aD86IG51bWJlcjtcbiAgbWluTGVuZ3RoPzogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExlbmd0aEVycm9yKFxuICB2YWx1ZTogeyBsZW5ndGg6IG51bWJlciB9LFxuICB7IG1heExlbmd0aCwgbWluTGVuZ3RoIH06IExlbmd0aE9wdGlvbnNcbik6IExlbmd0aEVycm9yIHwgdW5kZWZpbmVkIHtcbiAgaWYgKG1heExlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPiBtYXhMZW5ndGgpIHtcbiAgICByZXR1cm4geyB0eXBlOiBcIk1BWF9MRU5HVEhcIiwgbWF4TGVuZ3RoIH07XG4gIH1cbiAgaWYgKG1pbkxlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPCBtaW5MZW5ndGgpIHtcbiAgICByZXR1cm4geyB0eXBlOiBcIk1JTl9MRU5HVEhcIiwgbWluTGVuZ3RoIH07XG4gIH1cbn1cbiIsImltcG9ydCB7QXdhaXRhYmxlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcblxuZXhwb3J0IHR5cGUgVmFsdWVPckF3YWl0YWJsZUZuPFQ+ID0gVCB8ICgoKSA9PiBBd2FpdGFibGU8VD4pO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gVmFsdWVPckF3YWl0YWJsZUZuPFQ+KHZhbHVlOiBWYWx1ZU9yQXdhaXRhYmxlRm48VD4pOiBQcm9taXNlPFQ+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuICg8YW55PnZhbHVlKSgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG4iLCJpbXBvcnQge1xuICBJZixcbiAgSXMsXG4gIElzTmV2ZXIsXG4gIE9taXRLZXlzLFxuICBPdmVycmlkZSxcbiAgUGFydGlhbFVuZGVmaW5lZEtleXMsXG59IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgRGF0YVJvdyB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9EYXRhUm93XCI7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVkYXRhL0RhdGFTb3VyY2VcIjtcbmltcG9ydCB7IEdlbmVyaWNDb25maWcgfSBmcm9tIFwiLi4vLi4vR2VuZXJpY0NvbmZpZ1wiO1xuaW1wb3J0IHsgTm9ScGMgfSBmcm9tIFwiLi4vLi4vTm9ScGNcIjtcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gXCIuLi8uLi93aWRnZXQvZGF0YS10YWJsZS9EYXRhVGFibGVcIjtcbmltcG9ydCB7IEFueVJvd1R5cGUsIFJvdywgc3RyaW5nIH0gZnJvbSBcIi4uLy4uL3dpZGdldC9Sb3dcIjtcbmltcG9ydCB7IFdpZGdldFR5cGUgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0L1dpZGdldFwiO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi4vSW5wdXRcIjtcbmltcG9ydCB7IE51bGxhYmxlSW5wdXQgfSBmcm9tIFwiLi4vbnVsbGFibGUtaW5wdXQvTnVsbGFibGVJbnB1dFwiO1xuXG5pbXBvcnQgeyBWYWx1ZU9yQXdhaXRhYmxlRm4gfSBmcm9tIFwiLi4vVmFsdWVPckF3YWl0YWJsZUZuXCI7XG5pbXBvcnQgeyBEYXRhSW5wdXRIYW5kbGVyIH0gZnJvbSBcIi4vRGF0YUlucHV0SGFuZGxlclwiO1xuaW1wb3J0IHsgRGF0YUlucHV0VGVzdGVyIH0gZnJvbSBcIi4vRGF0YUlucHV0VGVzdGVyXCI7XG5cbmV4cG9ydCB0eXBlIFdpdGhEYXRhS2V5ID0ge1xuICAka2V5OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBEYXRhSW5wdXRUeXBlczxUIGV4dGVuZHMgVERhdGFJbnB1dD4gPSBfVHlwZXM8VD47XG5cbnR5cGUgX1R5cGVzPFQgZXh0ZW5kcyBURGF0YUlucHV0PiA9IFQgJiB7XG4gIFRhYmxlOiBEYXRhVGFibGU8e1xuICAgIFJvdzogVFtcIlRhYmxlUm93XCJdO1xuICAgIERhdGE6IFRbXCJUYWJsZURhdGFcIl07XG4gICAgUm93Q29udHJvbGxlcjogTm9ScGM7XG4gIH0+O1xuXG4gIFRhYmxlVHlwZXM6IFdpZGdldFR5cGU8X1R5cGVzPFQ+W1wiVGFibGVcIl0+W1wiVHlwZXNcIl07XG5cbiAgT3B0aW9uYWxDb25maWc6IHtcbiAgICBjb2x1bW5zOiBfVHlwZXM8VD5bXCJUYWJsZVR5cGVzXCJdW1wiQ29sdW1uQ29uZmlnTWFwXCJdO1xuICB9O1xuXG4gIFJlcXVpcmVkQ29uZmlnOiB7XG4gICAgZGVmYXVsdD86IFZhbHVlT3JBd2FpdGFibGVGbjxzdHJpbmcgfCBEYXRhUm93PFRbXCJUYWJsZURhdGFcIl0+IHwgdW5kZWZpbmVkPjtcblxuICAgIHRhYmxlQ29uZmlnPzogT21pdEtleXM8XG4gICAgICBfVHlwZXM8VD5bXCJUYWJsZVR5cGVzXCJdW1wiUmVxdWlyZWRDb25maWdcIl0gJlxuICAgICAgICBfVHlwZXM8VD5bXCJUYWJsZVR5cGVzXCJdW1wiT3B0aW9uYWxDb25maWdcIl0sXG4gICAgICBcImNvbHVtbnNcIiB8IFwic291cmNlXCJcbiAgICA+O1xuXG4gICAgc291cmNlOiBEYXRhU291cmNlPFRbXCJUYWJsZURhdGFcIl0+O1xuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgRGF0YUlucHV0Q29uZmlnPFQgZXh0ZW5kcyBURGF0YUlucHV0PiA9IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICBfVHlwZXM8VD5bXCJPcHRpb25hbENvbmZpZ1wiXSAmIHtcbiAgICBsb2FkU291cmNlOlxuICAgICAgfCBEYXRhU291cmNlPFRbXCJMb2FkRGF0YVwiXT5cbiAgICAgIHwgSWY8XG4gICAgICAgICAgSXM8VFtcIlZhbHVlXCJdLCBzdHJpbmc+IHwgSXM8VFtcIlRhYmxlRGF0YVwiXSwgVFtcIkxvYWRSb3dcIl0+LFxuICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICA+O1xuICB9LFxuICBfVHlwZXM8VD5bXCJSZXF1aXJlZENvbmZpZ1wiXVxuPjtcblxuZXhwb3J0IHR5cGUgQW55RGF0YUlucHV0ID0gRGF0YUlucHV0PGFueSwgVERhdGFJbnB1dD47XG5cbmV4cG9ydCB0eXBlIFREYXRhSW5wdXQgPSB7XG4gIFRhYmxlUm93OiBhbnk7XG4gIFRhYmxlRGF0YTogYW55O1xuXG4gIExvYWREYXRhOiBhbnk7XG4gIExvYWRSb3c6IGFueTtcblxuICBWYWx1ZTogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgRGF0YUlucHV0PE4gZXh0ZW5kcyBib29sZWFuLCBUIGV4dGVuZHMgVERhdGFJbnB1dD4gPSBOdWxsYWJsZUlucHV0PFxuICBOLFxuICB7XG4gICAgVHlwZXM6IF9UeXBlczxUPjtcblxuICAgIENvbW1hbmRzOiB7fTtcblxuICAgIFZhbHVlRGF0YTogc3RyaW5nO1xuXG4gICAgVmFsdWU6IFRbXCJWYWx1ZVwiXTtcblxuICAgIFZhbHVlRWxlbWVudDogX1R5cGVzPFQ+W1wiVGFibGVUeXBlc1wiXVtcIlJvd1dpdGhLZXlcIl07XG5cbiAgICBQcm9wczoge1xuICAgICAgdGFibGU6IF9UeXBlczxUPltcIlRhYmxlXCJdO1xuICAgIH07XG5cbiAgICBDb25maWc6IEdlbmVyaWNDb25maWc8XG4gICAgICA8VGFibGVEYXRhLCBMb2FkRGF0YSA9IFRhYmxlRGF0YT4oXG4gICAgICAgIGNvbmZpZzogRGF0YUlucHV0Q29uZmlnPFxuICAgICAgICAgIE92ZXJyaWRlPFxuICAgICAgICAgICAgVCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgVGFibGVEYXRhOiBUYWJsZURhdGE7XG4gICAgICAgICAgICAgIExvYWREYXRhOiBMb2FkRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA+XG4gICAgICAgID5cbiAgICAgICkgPT4gRGF0YUlucHV0Q29uZmlnPFQ+XG4gICAgPjtcblxuICAgIEVsZW1lbnQ6IHt9O1xuXG4gICAgQ29udHJvbGxlcjogX1R5cGVzPFQ+W1wiVGFibGVcIl07XG5cbiAgICBFcnJvcjogXCJJTlZBTElEX0RBVEFfS0VZXCI7XG4gIH1cbj47XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXRhSW5wdXQ8XG4gIFRhYmxlUm93VHlwZSBleHRlbmRzIEFueVJvd1R5cGUgPSB7XG4gICAgbGFiZWw6IHR5cGVvZiBzdHJpbmc7XG4gIH0sXG4gIE4gZXh0ZW5kcyBib29sZWFuID0gZmFsc2UsXG4gIExvYWRUeXBlID0gbmV2ZXIsXG4gIFMgZXh0ZW5kcyBQcm9wZXJ0eUtleSA9IGFueVxuPihcbiAgb3B0aW9uczoge1xuICAgIG51bGxhYmxlPzogTjtcbiAgICB0YWJsZVJvd1R5cGU/OiBUYWJsZVJvd1R5cGU7XG4gICAgbG9hZFR5cGU/OiBMb2FkVHlwZTtcbiAgfSA9IHt9XG4pOiBEYXRhSW5wdXQ8XG4gIE4sXG4gIHtcbiAgICBUYWJsZVJvdzogUm93PFRhYmxlUm93VHlwZT47XG4gICAgRGF0YTogYW55O1xuICAgIExvYWRSb3c6IExvYWRUeXBlO1xuICAgIFRhYmxlRGF0YTogYW55O1xuICAgIExvYWREYXRhOiBhbnk7XG4gICAgVmFsdWU6IElzTmV2ZXI8TG9hZFR5cGU+IGV4dGVuZHMgdHJ1ZSA/IHN0cmluZyA6IERhdGFSb3c8TG9hZFR5cGU+O1xuICAgIFJvdzogYW55O1xuICB9XG4+IHtcbiAgY29uc3QgdGFibGUgPSBEYXRhVGFibGUob3B0aW9ucy50YWJsZVJvd1R5cGUgfHwgeyBsYWJlbDogc3RyaW5nIH0pO1xuICByZXR1cm4gPGFueT5JbnB1dDxBbnlEYXRhSW5wdXQ+KHtcbiAgICBwcm9wczoge1xuICAgICAgbnVsbGFibGU6IG9wdGlvbnMubnVsbGFibGUgPz8gZmFsc2UsXG4gICAgICB0YWJsZSxcbiAgICB9LFxuICAgIGlzR2VuZXJpY0NvbmZpZzogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiB0YWJsZSxcbiAgICBoYW5kbGVyOiBEYXRhSW5wdXRIYW5kbGVyLFxuICAgIGdldFZhbHVlRGF0YUZyb21FbGVtZW50KHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWU/LiRrZXk7XG4gICAgfSxcbiAgfSk7XG59XG5cbi8vIERhdGFJbnB1dCh7XG4vLyAgICB0YWJsZVJvdzoge31cbi8vICAgIHJvdzogVHlwaW5nPFVzZXI+KClcbi8vIH0pXG4iLCJpbXBvcnQgeyBSZXF1aXJlT3B0aW9uYWxLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBEYXRhUm93IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVkYXRhL0RhdGFSb3dcIjtcbmltcG9ydCB7IFJwY0Vycm9yLCBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgV2lkZ2V0Q29udHJvbGxlciB9IGZyb20gXCIuLi8uLi93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQge1xuICBFcnJvck9yVmFsdWUsXG4gIElucHV0RWxlbWVudCxcbiAgSW5wdXRFcnJvcixcbiAgSW5wdXRUeXBlLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRWYWx1ZUVsZW1lbnQsXG59IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgQWJzdHJhY3ROdWxsYWJsZUlucHV0SGFuZGxlciB9IGZyb20gXCIuLi9udWxsYWJsZS1pbnB1dC9BYnN0cmFjdE51bGxhYmxlSW5wdXRIYW5kbGVyXCI7XG5pbXBvcnQgeyBWYWx1ZU9yQXdhaXRhYmxlRm4gfSBmcm9tIFwiLi4vVmFsdWVPckF3YWl0YWJsZUZuXCI7XG5pbXBvcnQgeyBBbnlEYXRhSW5wdXQgfSBmcm9tIFwiLi9EYXRhSW5wdXRcIjtcblxudHlwZSBUID0gQW55RGF0YUlucHV0O1xuXG5leHBvcnQgY2xhc3MgRGF0YUlucHV0SGFuZGxlciBleHRlbmRzIEFic3RyYWN0TnVsbGFibGVJbnB1dEhhbmRsZXI8VD4ge1xuICBnZXRDb250cm9sbGVyQ29uZmlnKCk6IFJwY1VucmVzb2x2ZWRDb25maWc8V2lkZ2V0Q29udHJvbGxlcjxUPj4ge1xuICAgIHJldHVybiAkID0+XG4gICAgICAkKHtcbiAgICAgICAgLi4udGhpcy5jb25maWcudGFibGVDb25maWcsXG4gICAgICAgIHNvdXJjZTogdGhpcy5jb25maWcuc291cmNlLFxuICAgICAgICBjb2x1bW5zOiB0aGlzLmNvbmZpZy5jb2x1bW5zLFxuICAgICAgfSk7XG4gIH1cblxuICBnZXRJbnB1dEVsZW1lbnQoKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPElucHV0RWxlbWVudDxUPj4+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHt9KTtcbiAgfVxuXG4gIGFzeW5jIGdldFZhbHVlRWxlbWVudChcbiAgICBkYXRhS2V5OiBJbnB1dFZhbHVlPFQ+IHwgdW5kZWZpbmVkXG4gICk6IFByb21pc2U8SW5wdXRWYWx1ZUVsZW1lbnQ8VD4+IHtcbiAgICBsZXQgZGF0YVJvdzogRGF0YVJvdzxhbnk+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGlmICghZGF0YUtleSkge1xuICAgICAgY29uc3QgZGF0YUtleU9yUm93ID0gYXdhaXQgVmFsdWVPckF3YWl0YWJsZUZuKHRoaXMuY29uZmlnLmRlZmF1bHQpO1xuICAgICAgaWYgKGRhdGFLZXlPclJvdyAmJiB0eXBlb2YgZGF0YUtleU9yUm93ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGRhdGFSb3cgPSBkYXRhS2V5T3JSb3c7XG4gICAgICB9IGVsc2UgaWYgKGRhdGFLZXlPclJvdykge1xuICAgICAgICBkYXRhS2V5ID0gU3RyaW5nKGRhdGFLZXlPclJvdyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkYXRhS2V5ICYmICFkYXRhUm93KSB7XG4gICAgICBkYXRhUm93ID0gYXdhaXQgdGhpcy5jb25maWcuc291cmNlLmdldChkYXRhS2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGFSb3cgJiYgKGF3YWl0IHRoaXMuY29udHJvbGxlci50aGVuKGMgPT4gYy5sb2FkUm93KGRhdGFSb3cpKSk7XG4gIH1cblxuICBhc3luYyBsb2FkQW5kQ2hlY2tOb3ROdWxsKFxuICAgIGtleTogTm9uTnVsbGFibGU8SW5wdXRWYWx1ZURhdGE8VD4+XG4gICk6IFByb21pc2U8RXJyb3JPclZhbHVlPElucHV0RXJyb3I8VD4sIE5vbk51bGxhYmxlPElucHV0VmFsdWU8VD4+Pj4ge1xuICAgIGlmICh0aGlzLmNvbmZpZy5sb2FkU291cmNlKSB7XG4gICAgICBjb25zdCByb3cgPSBhd2FpdCB0aGlzLmNvbmZpZy5sb2FkU291cmNlLmdldChTdHJpbmcoa2V5KSk7XG4gICAgICBpZiAoIXJvdykge1xuICAgICAgICByZXR1cm4geyBlcnJvcjogXCJJTlZBTElEX0RBVEFfS0VZXCIsIHZhbHVlOiB1bmRlZmluZWQgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHZhbHVlOiByb3cgfTtcbiAgICB9XG4gICAgaWYgKCEoYXdhaXQgdGhpcy5jb25maWcuc291cmNlLmZpbHRlcih7ICRpczoga2V5IH0pLmhhc1JvdygpKSkge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiSU5WQUxJRF9EQVRBX0tFWVwiLCB2YWx1ZTogdW5kZWZpbmVkIH07XG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBrZXkgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbWFwT2JqZWN0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvbWFwT2JqZWN0XCI7XG5pbXBvcnQgeyBQYXlsb2FkIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgUnBjTWFwIH0gZnJvbSBcIi4uLy4uL3JwYy1tYXAvUnBjTWFwXCI7XG5cbmltcG9ydCB7XG4gIEFueUlucHV0LFxuICBJbnB1dCxcbiAgSW5wdXRFbGVtZW50LFxuICBJbnB1dEVycm9yLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRWYWx1ZUVsZW1lbnQsXG59IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgSW5wdXRNYXBIYW5kbGVyIH0gZnJvbSBcIi4vSW5wdXRNYXBIYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIEFueUlucHV0UmVjb3JkID0gUmVjb3JkPHN0cmluZywgQW55SW5wdXQ+O1xuZXhwb3J0IHR5cGUgQW55SW5wdXRNYXAgPSBJbnB1dE1hcDxBbnlJbnB1dFJlY29yZD47XG5leHBvcnQgdHlwZSBJbnB1dEVycm9yTWFwPFQgZXh0ZW5kcyBBbnlJbnB1dFJlY29yZD4gPSBQYXlsb2FkPHtcbiAgRVJST1JfTUFQOiB7XG4gICAgZXJyb3JNYXA6IHsgW0sgaW4ga2V5b2YgVF06IElucHV0RXJyb3I8VFtLXT4gfTtcbiAgfTtcbn0+O1xuXG5leHBvcnQgdHlwZSBJbnB1dE1hcDxUIGV4dGVuZHMgQW55SW5wdXRSZWNvcmQ+ID0gSW5wdXQ8e1xuICBUSW5wdXRNYXA6IFQ7XG4gIENvbW1hbmRzOiB7fTtcbiAgQ29udHJvbGxlcjogUnBjTWFwPFQ+O1xuICBQcm9wczoge1xuICAgIHRhcmdldE1hcDogVDtcbiAgfTtcbiAgRWxlbWVudDoge1xuICAgIGVsZW1lbnRNYXA6IHtcbiAgICAgIFtLIGluIGtleW9mIFRdOiBJbnB1dEVsZW1lbnQ8VFtLXT47XG4gICAgfTtcbiAgfTtcbiAgQ29uZmlnOiBScGNVbnJlc29sdmVkQ29uZmlnPFJwY01hcDxUPj47XG4gIEVycm9yOiBJbnB1dEVycm9yTWFwPFQ+O1xuICBWYWx1ZURhdGE6IHsgW0sgaW4ga2V5b2YgVF06IElucHV0VmFsdWVEYXRhPFRbS10+IH07XG4gIFZhbHVlOiB7IFtLIGluIGtleW9mIFRdOiBJbnB1dFZhbHVlPFRbS10+IH07XG4gIFZhbHVlRWxlbWVudDogeyBbSyBpbiBrZXlvZiBUXTogSW5wdXRWYWx1ZUVsZW1lbnQ8VFtLXT4gfTtcbn0+O1xuXG4vL1xuXG5leHBvcnQgZnVuY3Rpb24gSW5wdXRNYXA8VCBleHRlbmRzIEFueUlucHV0UmVjb3JkPih0YXJnZXRNYXA6IFQpOiBJbnB1dE1hcDxUPiB7XG4gIHJldHVybiA8YW55PklucHV0PEFueUlucHV0TWFwPih7XG4gICAgcHJvcHM6IHtcbiAgICAgIHRhcmdldE1hcCxcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IFJwY01hcCh0YXJnZXRNYXApLFxuICAgIGhhbmRsZXI6IElucHV0TWFwSGFuZGxlcixcbiAgICBnZXRWYWx1ZURhdGFGcm9tRWxlbWVudCh2YWx1ZUVsZW1lbnRNYXApIHtcbiAgICAgIHJldHVybiBtYXBPYmplY3QodmFsdWVFbGVtZW50TWFwLCAoaXRlbVZhbHVlLCBpdGVtS2V5KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldE1hcFtpdGVtS2V5XS5nZXRWYWx1ZURhdGFGcm9tRWxlbWVudChpdGVtVmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBoYXNLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9vYmplY3QvaGFzS2V5c1wiO1xuaW1wb3J0IHsgbWFwT2JqZWN0QXN5bmMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL29iamVjdC9tYXBPYmplY3RcIjtcbmltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBXaWRnZXRDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldC9XaWRnZXRcIjtcbmltcG9ydCB7IEFic3RyYWN0SW5wdXRIYW5kbGVyIH0gZnJvbSBcIi4uL0Fic3RyYWN0SW5wdXRIYW5kbGVyXCI7XG5pbXBvcnQge1xuICBJbnB1dEVsZW1lbnQsXG4gIElucHV0RXJyb3JPclZhbHVlLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRWYWx1ZUVsZW1lbnQsXG59IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgQW55SW5wdXRNYXAgfSBmcm9tIFwiLi9JbnB1dE1hcFwiO1xuXG50eXBlIFQgPSBBbnlJbnB1dE1hcDtcblxuZXhwb3J0IGNsYXNzIElucHV0TWFwSGFuZGxlciBleHRlbmRzIEFic3RyYWN0SW5wdXRIYW5kbGVyPFQ+IHtcbiAgZ2V0Q29udHJvbGxlckNvbmZpZygpOiBScGNVbnJlc29sdmVkQ29uZmlnPFdpZGdldENvbnRyb2xsZXI8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5jb25maWc7XG4gIH1cblxuICBnZXRWYWx1ZUVsZW1lbnQoXG4gICAgdmFsdWU6IElucHV0VmFsdWU8VD4gfCB1bmRlZmluZWRcbiAgKTogUHJvbWlzZTxJbnB1dFZhbHVlRWxlbWVudDxUPj4ge1xuICAgIHJldHVybiBtYXBPYmplY3RBc3luYyh0aGlzLnJwYy50YXJnZXRNYXAsICh0YXJnZXQsIGtleSkgPT5cbiAgICAgIHRoaXMuY29udHJvbGxlclxuICAgICAgICAudGhlbihjID0+IGMuZ2V0VGFyZ2V0SGFuZGxlcihrZXkpKVxuICAgICAgICAudGhlbihoID0+IGguZ2V0VmFsdWVFbGVtZW50KHZhbHVlPy5ba2V5XSkpXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGdldElucHV0RWxlbWVudCgpOiBQcm9taXNlPFJlcXVpcmVPcHRpb25hbEtleXM8SW5wdXRFbGVtZW50PFQ+Pj4ge1xuICAgIHJldHVybiB7XG4gICAgICBlbGVtZW50TWFwOiBhd2FpdCBtYXBPYmplY3RBc3luYyh0aGlzLnJwYy50YXJnZXRNYXAsICh0YXJnZXQsIGtleSkgPT5cbiAgICAgICAgdGhpcy5jb250cm9sbGVyXG4gICAgICAgICAgLnRoZW4oYyA9PiBjLmdldFRhcmdldEhhbmRsZXIoa2V5KSlcbiAgICAgICAgICAudGhlbihoID0+IGguZ2V0SW5wdXRFbGVtZW50KCkpXG4gICAgICApLFxuICAgIH07XG4gIH1cblxuICBhc3luYyBsb2FkQW5kQ2hlY2soXG4gICAgZGF0YU1hcDogSW5wdXRWYWx1ZURhdGE8VD5cbiAgKTogUHJvbWlzZTxJbnB1dEVycm9yT3JWYWx1ZTxUPj4ge1xuICAgIGNvbnN0IGVycm9yTWFwOiBhbnkgPSB7fTtcbiAgICBjb25zdCB2YWx1ZU1hcCA9IGF3YWl0IG1hcE9iamVjdEFzeW5jKHRoaXMucnBjLnRhcmdldE1hcCwgKHRhcmdldCwga2V5KSA9PlxuICAgICAgdGhpcy5jb250cm9sbGVyXG4gICAgICAgIC50aGVuKGMgPT4gYy5nZXRUYXJnZXRIYW5kbGVyKGtleSkpXG4gICAgICAgIC50aGVuKGggPT4gaC5sb2FkQW5kQ2hlY2soZGF0YU1hcFtrZXldKSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoXCJlcnJvclwiIGluIHJlc3VsdCkge1xuICAgICAgICAgICAgZXJyb3JNYXBba2V5XSA9IHJlc3VsdC5lcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC52YWx1ZTtcbiAgICAgICAgfSlcbiAgICApO1xuXG4gICAgaWYgKGhhc0tleXMoZXJyb3JNYXApKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogdmFsdWVNYXAsIGVycm9yOiB7IHR5cGU6IFwiRVJST1JfTUFQXCIsIGVycm9yTWFwIH0gfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlTWFwIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IFJwY0Vycm9yIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dEhhbmRsZXIgfSBmcm9tIFwiLi4vQWJzdHJhY3RJbnB1dEhhbmRsZXJcIjtcbmltcG9ydCB7XG4gIEVycm9yT3JWYWx1ZSxcbiAgSW5wdXRFcnJvcixcbiAgSW5wdXRFcnJvck9yVmFsdWUsXG4gIElucHV0VmFsdWUsXG4gIElucHV0VmFsdWVEYXRhLFxuICBUSW5wdXQsXG59IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgTnVsbGFibGVJbnB1dCB9IGZyb20gXCIuL051bGxhYmxlSW5wdXRcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0TnVsbGFibGVJbnB1dEhhbmRsZXI8XG4gIFQgZXh0ZW5kcyBOdWxsYWJsZUlucHV0PGFueSwgVElucHV0PlxuPiBleHRlbmRzIEFic3RyYWN0SW5wdXRIYW5kbGVyPFQ+IHtcbiAgYWJzdHJhY3QgbG9hZEFuZENoZWNrTm90TnVsbChcbiAgICB2YWx1ZURhdGE6IE5vbk51bGxhYmxlPElucHV0VmFsdWVEYXRhPFQ+PlxuICApOiBQcm9taXNlPEVycm9yT3JWYWx1ZTxJbnB1dEVycm9yPFQ+LCBOb25OdWxsYWJsZTxJbnB1dFZhbHVlPFQ+Pj4+O1xuXG4gIGFzeW5jIGxvYWRBbmRDaGVjayhcbiAgICB2YWx1ZURhdGE6IElucHV0VmFsdWVEYXRhPFQ+XG4gICk6IFByb21pc2U8SW5wdXRFcnJvck9yVmFsdWU8VD4+IHtcbiAgICBpZiAodmFsdWVEYXRhID09IG51bGwpIHtcbiAgICAgIGlmICghdGhpcy5ycGMubnVsbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiTk9UX05VTExBQkxFXCIsIHZhbHVlOiB1bmRlZmluZWQgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHZhbHVlOiBudWxsIH07XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMubG9hZEFuZENoZWNrTm90TnVsbCh2YWx1ZURhdGEpO1xuICAgIGlmIChcImVycm9yXCIgaW4gcmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChyZXN1bHQudmFsdWUgPT0gbnVsbCkge1xuICAgICAgaWYgKCF0aGlzLnJwYy5udWxsYWJsZSkge1xuICAgICAgICB0aHJvdyBuZXcgUnBjRXJyb3IoYHZhbHVlIGlzIG51bGxgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgT3ZlcnJpZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IE5vUnBjIH0gZnJvbSBcIi4uLy4uL05vUnBjXCI7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgVGV4dElucHV0RXJyb3IsIFRleHRJbnB1dE9wdGlvbnMgfSBmcm9tIFwiLi9UZXh0SW5wdXRMb2FkZXJcIjtcbmltcG9ydCB7IFZhbHVlT3JBd2FpdGFibGVGbiB9IGZyb20gXCIuLi9WYWx1ZU9yQXdhaXRhYmxlRm5cIjtcbmltcG9ydCB7IFRleHRJbnB1dEhhbmRsZXIgfSBmcm9tIFwiLi9UZXh0SW5wdXRIYW5kbGVyXCI7XG5cbmV4cG9ydCB0eXBlIFRleHRJbnB1dCA9IElucHV0PHtcbiAgRXJyb3I6IFRleHRJbnB1dEVycm9yO1xuXG4gIFZhbHVlRGF0YTogc3RyaW5nO1xuXG4gIENvbW1hbmRzOiB7fTtcblxuICBWYWx1ZTogc3RyaW5nO1xuXG4gIFZhbHVlRWxlbWVudDogc3RyaW5nO1xuXG4gIENvbnRyb2xsZXI6IE5vUnBjO1xuXG4gIFByb3BzOiB7fTtcblxuICBDb25maWc6XG4gICAgfCB1bmRlZmluZWRcbiAgICB8IChUZXh0SW5wdXRPcHRpb25zICYge1xuICAgICAgICBkZWZhdWx0PzogVmFsdWVPckF3YWl0YWJsZUZuPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gICAgICB9KTtcblxuICBFbGVtZW50OiBPdmVycmlkZTxcbiAgICBUZXh0SW5wdXRPcHRpb25zLFxuICAgIHtcbiAgICAgIHBhdHRlcm4/OiBzdHJpbmc7XG4gICAgfVxuICA+O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBUZXh0SW5wdXQoKTogVGV4dElucHV0IHtcbiAgcmV0dXJuIElucHV0PFRleHRJbnB1dD4oe1xuICAgIGhhbmRsZXI6IFRleHRJbnB1dEhhbmRsZXIsXG4gICAgZ2V0VmFsdWVEYXRhRnJvbUVsZW1lbnQodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICB9KTtcbn1cbiIsImltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBBYnN0cmFjdElucHV0SGFuZGxlciB9IGZyb20gXCIuLi9BYnN0cmFjdElucHV0SGFuZGxlclwiO1xuaW1wb3J0IHsgV2lkZ2V0Q29udHJvbGxlciwgV2lkZ2V0RWxlbWVudCB9IGZyb20gXCIuLi8uLi93aWRnZXQvV2lkZ2V0XCI7XG5pbXBvcnQge1xuICBJbnB1dEVsZW1lbnQsXG4gIElucHV0RXJyb3JPclZhbHVlLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlRGF0YSxcbiAgSW5wdXRWYWx1ZUVsZW1lbnQsXG59IGZyb20gXCIuLi9JbnB1dFwiO1xuaW1wb3J0IHsgVGV4dElucHV0TG9hZGVyIH0gZnJvbSBcIi4vVGV4dElucHV0TG9hZGVyXCI7XG5pbXBvcnQgeyBWYWx1ZU9yQXdhaXRhYmxlRm4gfSBmcm9tIFwiLi4vVmFsdWVPckF3YWl0YWJsZUZuXCI7XG5pbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tIFwiLi9UZXh0SW5wdXRcIjtcblxudHlwZSBUID0gVGV4dElucHV0O1xuXG5leHBvcnQgY2xhc3MgVGV4dElucHV0SGFuZGxlciBleHRlbmRzIEFic3RyYWN0SW5wdXRIYW5kbGVyPFQ+IHtcbiAgYXN5bmMgZ2V0VmFsdWVFbGVtZW50KFxuICAgIHZhbHVlOiBJbnB1dFZhbHVlPFQ+IHwgdW5kZWZpbmVkXG4gICk6IFByb21pc2U8SW5wdXRWYWx1ZUVsZW1lbnQ8VD4+IHtcbiAgICByZXR1cm4gdmFsdWUgPz8gKGF3YWl0IFZhbHVlT3JBd2FpdGFibGVGbih0aGlzLmNvbmZpZy5kZWZhdWx0KSkgPz8gXCJcIjtcbiAgfVxuXG4gIGdldENvbnRyb2xsZXJDb25maWcoKTogUnBjVW5yZXNvbHZlZENvbmZpZzxXaWRnZXRDb250cm9sbGVyPFQ+PiB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGFzeW5jIGdldElucHV0RWxlbWVudCgpOiBQcm9taXNlPFJlcXVpcmVPcHRpb25hbEtleXM8SW5wdXRFbGVtZW50PFQ+Pj4ge1xuICAgIHJldHVybiB7XG4gICAgICBtaW5MZW5ndGg6IHRoaXMuY29uZmlnLm1pbkxlbmd0aCxcbiAgICAgIG1heExlbmd0aDogdGhpcy5jb25maWcubWF4TGVuZ3RoLFxuICAgICAgcGF0dGVybjogdGhpcy5jb25maWcucGF0dGVybj8uc291cmNlLFxuICAgICAgdHJpbTogdGhpcy5jb25maWcudHJpbSxcbiAgICAgIHJlcXVpcmVkOiB0aGlzLmNvbmZpZy5yZXF1aXJlZCxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgbG9hZEFuZENoZWNrKFxuICAgIHZhbHVlRGF0YTogSW5wdXRWYWx1ZURhdGE8VD5cbiAgKTogUHJvbWlzZTxJbnB1dEVycm9yT3JWYWx1ZTxUPj4ge1xuICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgVGV4dElucHV0TG9hZGVyLmxvYWQodGhpcy5jb25maWcsIHZhbHVlRGF0YSk7XG4gICAgY29uc3QgZXJyb3IgPSBUZXh0SW5wdXRMb2FkZXIuY2hlY2sodGhpcy5jb25maWcsIHZhbHVlRGF0YSk7XG4gICAgaWYgKGVycm9yICE9PSB1bmRlZmluZWQpIHJldHVybiB7IGVycm9yLCB2YWx1ZSB9O1xuICAgIHJldHVybiB7IHZhbHVlIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IFBheWxvYWQgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IGdldExlbmd0aEVycm9yLCBMZW5ndGhFcnJvciB9IGZyb20gXCIuLi9MZW5ndGhFcnJvclwiO1xuXG5leHBvcnQgdHlwZSBUZXh0SW5wdXRPcHRpb25zID0ge1xuICBwYXR0ZXJuPzogUmVnRXhwO1xuICBtaW5MZW5ndGg/OiBudW1iZXI7XG4gIG1heExlbmd0aD86IG51bWJlcjtcbiAgdHJpbT86IGJvb2xlYW47XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIFRleHRJbnB1dEVycm9yID1cbiAgfCBQYXlsb2FkPHtcbiAgICAgIElOVkFMSURfUEFUVEVSTjogeyBwYXR0ZXJuOiBzdHJpbmcgfTtcbiAgICB9PlxuICB8IExlbmd0aEVycm9yXG4gIHwgXCJSRVFVSVJFRFwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRleHRJbnB1dExvYWRlciB7XG4gIGV4cG9ydCBmdW5jdGlvbiBsb2FkKG9wdGlvbnM6IFRleHRJbnB1dE9wdGlvbnMsIHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChvcHRpb25zLnRyaW0pIHtcbiAgICAgIHZhbHVlID0gdmFsdWUudHJpbSgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gY2hlY2soXG4gICAgeyByZXF1aXJlZCwgcGF0dGVybiwgbWluTGVuZ3RoLCBtYXhMZW5ndGggfTogVGV4dElucHV0T3B0aW9ucyxcbiAgICB2YWx1ZTogc3RyaW5nXG4gICk6IFRleHRJbnB1dEVycm9yIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICBpZiAocmVxdWlyZWQpIHJldHVybiBcIlJFUVVJUkVEXCI7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHBhdHRlcm4gJiYgIXBhdHRlcm4udGVzdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwiSU5WQUxJRF9QQVRURVJOXCIsIHBhdHRlcm46IHBhdHRlcm4uc291cmNlIH07XG4gICAgfVxuXG4gICAgY29uc3QgbGVuZ3RoRXJyb3IgPSBnZXRMZW5ndGhFcnJvcih2YWx1ZSwgeyBtYXhMZW5ndGgsIG1pbkxlbmd0aCB9KTtcbiAgICBpZiAobGVuZ3RoRXJyb3IpIHJldHVybiBsZW5ndGhFcnJvcjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXdhaXRhYmxlLCBBd2FpdGVkLCBGbiB9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgUnBjRm5IYW5kbGVyIH0gZnJvbSBcIi4vUnBjRm5IYW5kbGVyXCI7XG5pbXBvcnQgeyBScGMgfSBmcm9tIFwiLi4vUnBjXCI7XG5cbmV4cG9ydCB0eXBlIFJwY0ZuPFQgZXh0ZW5kcyBGbj4gPSBScGM8e1xuICBDb25uZWN0aW9uOiAoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4gUHJvbWlzZTxBd2FpdGVkPFJldHVyblR5cGU8VD4+PjtcbiAgUHJvcHM6IHt9O1xuICBDb25maWc6ICguLi5hcmdzOiBQYXJhbWV0ZXJzPFQ+KSA9PiBBd2FpdGFibGU8QXdhaXRlZDxSZXR1cm5UeXBlPFQ+Pj47XG4gIEhhbmRsZXI6IHt9O1xufT47XG5cbmV4cG9ydCB0eXBlIEFueVJwY0ZuID0gUnBjRm48Rm4+O1xuXG5leHBvcnQgZnVuY3Rpb24gUnBjRm48VCBleHRlbmRzIEZuID0gKCkgPT4gdm9pZD4oKTogUnBjRm48VD4ge1xuICByZXR1cm4gPGFueT5ScGM8QW55UnBjRm4+KHtcbiAgICBpc0dlbmVyaWNDb25maWc6IGZhbHNlLFxuICAgIGlzQ29uZmlnRm46IHRydWUsXG4gICAgaGFuZGxlcjogUnBjRm5IYW5kbGVyLFxuICAgIGNvbm5lY3QoaGFuZGxlcikge1xuICAgICAgcmV0dXJuIGFzeW5jICguLi5hcmdzKSA9PiA8QXdhaXRlZDxSZXR1cm5UeXBlPFQ+Pj5hd2FpdCBoYW5kbGVyKGFyZ3MpO1xuICAgIH0sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBBbnlScGNGbiB9IGZyb20gXCIuL1JwY0ZuXCI7XG5pbXBvcnQgeyBBYnN0cmFjdFJwY0hhbmRsZXIsIElScGNIYW5kbGVyIH0gZnJvbSBcIi4uL1JwY1wiO1xuXG50eXBlIFQgPSBBbnlScGNGbjtcblxuZXhwb3J0IGNsYXNzIFJwY0ZuSGFuZGxlclxuICBleHRlbmRzIEFic3RyYWN0UnBjSGFuZGxlcjxUPlxuICBpbXBsZW1lbnRzIElScGNIYW5kbGVyPFQ+IHtcbiAgaGFuZGxlKHBheWxvYWQ6IGFueSk6IEF3YWl0YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcoLi4ucGF5bG9hZCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IG1hcE9iamVjdCB9IGZyb20gXCIuLi8uLi9jb21tb24vb2JqZWN0L21hcE9iamVjdFwiO1xuaW1wb3J0IHtcbiAgUGFydGlhbFVuZGVmaW5lZEtleXMsXG4gIFVuZGVmaW5lZElmRW1wdHlPYmplY3QsXG59IGZyb20gXCIuLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHtcbiAgQW55UnBjLFxuICBScGMsXG4gIFJwY0Nvbm5lY3Rpb24sXG4gIFJwY1Jlc29sdmVkSGFuZGxlcixcbiAgUnBjVW5yZXNvbHZlZENvbmZpZyxcbn0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgUnBjTWFwSGFuZGxlciB9IGZyb20gXCIuL1JwY01hcEhhbmRsZXJcIjtcblxuZXhwb3J0IHR5cGUgQW55UnBjUmVjb3JkID0gUmVjb3JkPHN0cmluZywgQW55UnBjPjtcblxuZXhwb3J0IHR5cGUgQW55UnBjTWFwID0gUnBjTWFwPEFueVJwY1JlY29yZD47XG5cbmV4cG9ydCB0eXBlIFJwY01hcDxUIGV4dGVuZHMgQW55UnBjUmVjb3JkPiA9IFJwYzx7XG4gIFRScGNNYXA6IFQ7XG5cbiAgQ29ubmVjdGlvbjoge1xuICAgIFtLIGluIGtleW9mIFRdOiBScGNDb25uZWN0aW9uPFRbS10+O1xuICB9O1xuXG4gIFByb3BzOiB7IHRhcmdldE1hcDogVCB9O1xuICBDb25maWc6IFVuZGVmaW5lZElmRW1wdHlPYmplY3Q8XG4gICAgUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gICAgICB7XG4gICAgICAgIFtLIGluIGtleW9mIFRdOiBScGNVbnJlc29sdmVkQ29uZmlnPFRbS10+O1xuICAgICAgfVxuICAgID5cbiAgPjtcbiAgSGFuZGxlcjoge1xuICAgIGdldFRhcmdldEhhbmRsZXI8SyBleHRlbmRzIGtleW9mIFQ+KFxuICAgICAga2V5OiBLXG4gICAgKTogUHJvbWlzZTxScGNSZXNvbHZlZEhhbmRsZXI8VFtLXT4+O1xuICB9O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBScGNNYXA8VCBleHRlbmRzIEFueVJwY1JlY29yZD4odGFyZ2V0TWFwOiBUKTogUnBjTWFwPFQ+IHtcbiAgcmV0dXJuIDxhbnk+UnBjPEFueVJwY01hcD4oe1xuICAgIHByb3BzOiB7XG4gICAgICB0YXJnZXRNYXA6IHRhcmdldE1hcCxcbiAgICB9LFxuICAgIGhhbmRsZXI6IFJwY01hcEhhbmRsZXIsXG4gICAgY29ubmVjdChoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gbWFwT2JqZWN0KHRoaXMudGFyZ2V0TWFwLCAodGFyZ2V0LCBrZXkpID0+XG4gICAgICAgIHRhcmdldC5jcmVhdGVScGNDb25uZWN0aW9uKHBheWxvYWQgPT4gaGFuZGxlcihba2V5LCBwYXlsb2FkXSkpXG4gICAgICApO1xuICAgIH0sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgQXdhaXRhYmxlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQge1xuICBBYnN0cmFjdFJwY0hhbmRsZXIsXG4gIEFueVJwYyxcbiAgSVJwY0hhbmRsZXIsXG4gIFJwY1Jlc29sdmVkSGFuZGxlcixcbiAgUnBjVHlwZSxcbn0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgQW55UnBjTWFwIH0gZnJvbSBcIi4vUnBjTWFwXCI7XG5cbmV4cG9ydCBjbGFzcyBScGNNYXBIYW5kbGVyPFIgZXh0ZW5kcyBBbnlScGNNYXAsIFQgZXh0ZW5kcyBScGNUeXBlPFI+W1wiVFJwY01hcFwiXT5cbiAgZXh0ZW5kcyBBYnN0cmFjdFJwY0hhbmRsZXI8Uj5cbiAgaW1wbGVtZW50cyBJUnBjSGFuZGxlcjxBbnlScGNNYXA+IHtcbiAgaGFuZGxlKFtrZXksIHBheWxvYWRdKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRUYXJnZXRIYW5kbGVyKGtleSkudGhlbihjID0+IGMuaGFuZGxlKHBheWxvYWQpKTtcbiAgfVxuXG4gIGdldFRhcmdldEhhbmRsZXIoa2V5OiBzdHJpbmcpOiBQcm9taXNlPFJwY1Jlc29sdmVkSGFuZGxlcjxBbnlScGM+PiB7XG4gICAgcmV0dXJuIHRoaXMucnBjLnRhcmdldE1hcFtrZXldLnJlc29sdmVScGNIYW5kbGVyKHRoaXMuY29uZmlnW2tleV0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb25maWdGYWN0b3J5IH0gZnJvbSBcIi4uL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7IEFueVJwYywgUnBjLCBScGNDb25uZWN0aW9uLCBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHsgUnBjUGFyYW1ldGVySGFuZGxlciB9IGZyb20gXCIuL1JwY1BhcmFtZXRlckhhbmRsZXJcIjtcblxuZXhwb3J0IHR5cGUgVFJwY1BhcmFtZXRlciA9IHsgVGFyZ2V0OiBBbnlScGM7IERhdGE6IGFueSB9O1xuXG50eXBlIFRlc3RScGMgPSBScGM8e1xuICBIYW5kbGVyOiB7fTtcbiAgQ29ubmVjdGlvbjoge307XG4gIFByb3BzOiB7fTtcbiAgQ29uZmlnOiBDb25maWdGYWN0b3J5PGFueT47XG59PjtcblxuZXhwb3J0IHR5cGUgUnBjUGFyYW1ldGVyPFQgZXh0ZW5kcyBUUnBjUGFyYW1ldGVyPiA9IFJwYzx7XG4gIFRQYXJhbWV0ZXI6IFQ7XG5cbiAgSGFuZGxlcjoge307XG5cbiAgQ29ubmVjdGlvbjogKGRhdGE6IFRbXCJEYXRhXCJdKSA9PiBScGNDb25uZWN0aW9uPFRbXCJUYXJnZXRcIl0+O1xuXG4gIFByb3BzOiB7XG4gICAgcGFyYW1ldGVyVGFyZ2V0OiBUW1wiVGFyZ2V0XCJdO1xuICAgIHBhcmFtZXRlckRhdGFUeXBlOiAob2JqOiBhbnkpID0+IFRbXCJEYXRhXCJdO1xuICB9O1xuXG4gIENvbmZpZzogQ29uZmlnRmFjdG9yeTxScGNVbnJlc29sdmVkQ29uZmlnPFRbXCJUYXJnZXRcIl0+LCBbVFtcIkRhdGFcIl1dPjtcbn0+O1xuZXhwb3J0IHR5cGUgQW55UnBjUGFyYW1ldGVyID0gUnBjUGFyYW1ldGVyPFRScGNQYXJhbWV0ZXI+O1xuXG4vLyBUT0RPOiBQYXJhbWV0ZXJUeXBlUmVmXG5leHBvcnQgZnVuY3Rpb24gUnBjUGFyYW1ldGVyPFRhcmdldCBleHRlbmRzIEFueVJwYywgRGF0YT4oXG4gIGRhdGFUeXBlOiAob2JqOiBhbnkpID0+IERhdGEsXG4gIHRhcmdldDogVGFyZ2V0XG4pOiBScGNQYXJhbWV0ZXI8eyBEYXRhOiBEYXRhOyBUYXJnZXQ6IFRhcmdldCB9PiB7XG4gIHJldHVybiA8YW55PlJwYzxBbnlScGNQYXJhbWV0ZXI+KHtcbiAgICBpc0dlbmVyaWNDb25maWc6IGZhbHNlLFxuICAgIGlzQ29uZmlnRm46IGZhbHNlLFxuICAgIGhhbmRsZXI6IFJwY1BhcmFtZXRlckhhbmRsZXIsXG4gICAgcHJvcHM6IHsgcGFyYW1ldGVyVGFyZ2V0OiB0YXJnZXQsIHBhcmFtZXRlckRhdGFUeXBlOiBkYXRhVHlwZSB9LFxuICAgIGNvbm5lY3QoaGFuZGxlcikge1xuICAgICAgcmV0dXJuIGRhdGEgPT5cbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJUYXJnZXQuY3JlYXRlUnBjQ29ubmVjdGlvbihwYXlsb2FkID0+XG4gICAgICAgICAgaGFuZGxlcihbZGF0YSwgcGF5bG9hZF0pXG4gICAgICAgICk7XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBDb25maWdGYWN0b3J5IH0gZnJvbSBcIi4uL0NvbmZpZ0ZhY3RvcnlcIjtcbmltcG9ydCB7IEFic3RyYWN0UnBjSGFuZGxlciwgSVJwY0hhbmRsZXIgfSBmcm9tIFwiLi4vUnBjXCI7XG5pbXBvcnQgeyBBbnlScGNQYXJhbWV0ZXIgfSBmcm9tIFwiLi9ScGNQYXJhbWV0ZXJcIjtcblxudHlwZSBUID0gQW55UnBjUGFyYW1ldGVyO1xuXG5leHBvcnQgY2xhc3MgUnBjUGFyYW1ldGVySGFuZGxlclxuICBleHRlbmRzIEFic3RyYWN0UnBjSGFuZGxlcjxUPlxuICBpbXBsZW1lbnRzIElScGNIYW5kbGVyPFQ+IHtcbiAgYXN5bmMgaGFuZGxlKFtkYXRhLCBwYXlsb2FkXSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdmFsdWUgPSBhd2FpdCB0aGlzLnJwYy5wYXJhbWV0ZXJEYXRhVHlwZShkYXRhKTtcbiAgICBjb25zdCB0YXJnZXRDb25maWcgPSBhd2FpdCBDb25maWdGYWN0b3J5KHRoaXMuY29uZmlnLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMucnBjLnBhcmFtZXRlclRhcmdldFxuICAgICAgLnJlc29sdmVScGNIYW5kbGVyKHRhcmdldENvbmZpZylcbiAgICAgIC50aGVuKGMgPT4gYy5oYW5kbGUocGF5bG9hZCkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBMYXp5IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYXR0ZXJucy9sYXp5XCI7XG5pbXBvcnQgeyBSZXF1aXJlT3B0aW9uYWxLZXlzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQge1xuICBBYnN0cmFjdFJwY0hhbmRsZXIsXG4gIElScGNIYW5kbGVyLFxuICBScGNSZXNvbHZlZEhhbmRsZXIsXG4gIFJwY1VucmVzb2x2ZWRDb25maWcsXG59IGZyb20gXCIuLi9ScGNcIjtcbmltcG9ydCB7XG4gIEFueVdpZGdldCxcbiAgSVdpZGdldCxcbiAgVFdpZGdldCxcbiAgV2lkZ2V0Q29udHJvbGxlcixcbiAgV2lkZ2V0RWxlbWVudCxcbiAgV2lkZ2V0VHlwZSxcbn0gZnJvbSBcIi4vV2lkZ2V0XCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFdpZGdldEhhbmRsZXI8XG4gICAgUiBleHRlbmRzIEFueVdpZGdldCxcbiAgICBUIGV4dGVuZHMgVFdpZGdldCA9IFdpZGdldFR5cGU8Uj5cbiAgPlxuICBleHRlbmRzIEFic3RyYWN0UnBjSGFuZGxlcjxSPlxuICBpbXBsZW1lbnRzIElScGNIYW5kbGVyPElXaWRnZXQ+IHtcbiAgYWJzdHJhY3QgZ2V0Q29udHJvbGxlckNvbmZpZygpOiBScGNVbnJlc29sdmVkQ29uZmlnPFdpZGdldENvbnRyb2xsZXI8Uj4+O1xuXG4gIGFic3RyYWN0IGdldEVsZW1lbnQoKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPFdpZGdldEVsZW1lbnQ8Uj4+PjtcblxuICBATGF6eSgpIGdldCBjb250cm9sbGVyKCk6IFByb21pc2U8UnBjUmVzb2x2ZWRIYW5kbGVyPFdpZGdldENvbnRyb2xsZXI8Uj4+PiB7XG4gICAgcmV0dXJuIHRoaXMucnBjLndpZGdldC5jb250cm9sbGVyLnJlc29sdmVScGNIYW5kbGVyKFxuICAgICAgdGhpcy5nZXRDb250cm9sbGVyQ29uZmlnKClcbiAgICApIGFzIFByb21pc2U8UnBjUmVzb2x2ZWRIYW5kbGVyPFdpZGdldENvbnRyb2xsZXI8Uj4+PjtcbiAgfVxuXG4gIGFzeW5jIGhhbmRsZShba2V5LCBwYXlsb2FkXTogW3N0cmluZywgYW55XSk6IFByb21pc2U8YW55PiB7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgXCJnZXRFbGVtZW50XCI6XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICAgIGNhc2UgXCJjb250cm9sbGVyXCI6XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIudGhlbihoYW5kbGVyID0+IGhhbmRsZXIuaGFuZGxlKHBheWxvYWQpKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSB0aGlzLnJwYy53aWRnZXQuY29tbWFuZHNba2V5XTtcbiAgICAgICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBjb21tYW5kIGhhbmRsZXIgZm9yIFwiJHtrZXl9XCIuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNbaGFuZGxlcl0oLi4ucGF5bG9hZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4uLy4uL3JlYWN0L3ZpZXcvVmlld1wiO1xuaW1wb3J0IHsgVmlld1N0YXRlIH0gZnJvbSBcIi4uLy4uL3JlYWN0L3ZpZXcvVmlld1N0YXRlXCI7XG5pbXBvcnQgeyBScGNDb25uZWN0aW9uIH0gZnJvbSBcIi4uL1JwY1wiO1xuaW1wb3J0IHtcbiAgQW55V2lkZ2V0LFxuICBBbnlXaWRnZXRDb25uZWN0aW9uLFxuICBXaWRnZXQsXG4gIFdpZGdldENvbnRyb2xsZXIsXG4gIFdpZGdldEVsZW1lbnQsXG4gIFdpZGdldFR5cGUsXG59IGZyb20gXCIuL1dpZGdldFwiO1xuaW1wb3J0IHsgV2lkZ2V0VmlldywgV2lkZ2V0Vmlld1Byb3BzIH0gZnJvbSBcIi4vV2lkZ2V0Vmlld1wiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RXaWRnZXRWaWV3PFxuICAgIEMgZXh0ZW5kcyBBbnlXaWRnZXRDb25uZWN0aW9uLFxuICAgIFAgZXh0ZW5kcyBXaWRnZXRWaWV3UHJvcHM8Qz4gPSBXaWRnZXRWaWV3UHJvcHM8Qz5cbiAgPlxuICBleHRlbmRzIFZpZXc8UD5cbiAgaW1wbGVtZW50cyBXaWRnZXRWaWV3PEM+IHtcbiAgQFZpZXdTdGF0ZShcImZvcmNlVXBkYXRlRWxlbWVudFwiKSBfZWxlbWVudDogV2lkZ2V0RWxlbWVudDxDPjtcblxuICBwcm90ZWN0ZWQgdXBkYXRlRWxlbWVudD8oZWxlbWVudDogV2lkZ2V0RWxlbWVudDxDPik6IHZvaWQ7XG5cbiAgZ2V0IGVsZW1lbnQoKTogV2lkZ2V0RWxlbWVudDxDPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gIH1cblxuICBzZXRFbGVtZW50KGVsZW1lbnQ6IFdpZGdldEVsZW1lbnQ8Qz4pIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuXG4gIGdldCBycGMoKTogV2lkZ2V0PFdpZGdldFR5cGU8Qz4+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb25uZWN0aW9uLnJwYyBhcyBhbnk7XG4gIH1cblxuICBnZXQgY29udHJvbGxlcigpOiBScGNDb25uZWN0aW9uPFdpZGdldENvbnRyb2xsZXI8Qz4+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb25uZWN0aW9uLmNvbnRyb2xsZXI7XG4gIH1cblxuICBnZXQgY29ubmVjdGlvbigpOiBDIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb25uZWN0aW9uO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFApIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5fZWxlbWVudCA9IHRoaXMucHJvcHMuZWxlbWVudDtcbiAgICB0aGlzLnVwZGF0ZUVsZW1lbnQ/Lih0aGlzLnByb3BzLmVsZW1lbnQpO1xuICB9XG5cbiAgZm9yY2VVcGRhdGVFbGVtZW50KCkge1xuICAgIHRoaXMudXBkYXRlRWxlbWVudD8uKHRoaXMuZWxlbWVudCk7XG4gIH1cblxuICB1cGRhdGVWaWV3UHJvcHMocHJldlByb3BzOiBSZWFkb25seTxQPiwgbmV4dFByb3BzOiBSZWFkb25seTxQPik6IHZvaWQge1xuICAgIGlmIChuZXh0UHJvcHMuZWxlbWVudCAhPT0gcHJldlByb3BzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBuZXh0UHJvcHMuZWxlbWVudDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgV2lkZ2V0Vmlld0NsYXNzPFQgZXh0ZW5kcyBBbnlXaWRnZXQ+ID0gbmV3IChcbiAgcHJvcHM6IFdpZGdldFZpZXdQcm9wczxScGNDb25uZWN0aW9uPFQ+PlxuKSA9PiBBYnN0cmFjdFdpZGdldFZpZXc8UnBjQ29ubmVjdGlvbjxUPj47XG4iLCJpbXBvcnQgeyBFeHBlY3QsIE51bGxhYmxlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXIodmFsdWU6IGFueSk6IG51bWJlciB7XG4gIHJldHVybiBOdW1iZXIodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbnVsbGFibGU8VD4odHlwZTogKHZhbHVlOiBhbnkpID0+IFQpOiBDb2x1bW5UeXBlPFQgfCBOdWxsYWJsZT4ge1xuICByZXR1cm4gdmFsdWUgPT4ge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSByZXR1cm4gdHlwZSh2YWx1ZSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmcodmFsdWU6IGFueSk6IHN0cmluZyB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG59XG5cbm51bWJlci5lbnVtID0gZnVuY3Rpb24gPFQgZXh0ZW5kcyBudW1iZXI+KCk6IENvbHVtblR5cGU8VD4ge1xuICByZXR1cm4gPGFueT5udW1iZXI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYm9vbGVhbih2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbn1cblxuZXhwb3J0IHR5cGUgQ29sdW1uVHlwZTxUPiA9ICh2YWx1ZTogYW55KSA9PiBUO1xuZXhwb3J0IHR5cGUgQW55Q29sdW1uVHlwZSA9IENvbHVtblR5cGU8YW55PjtcblxuZXhwb3J0IHR5cGUgQW55Um93VHlwZSA9IFJlY29yZDxzdHJpbmcsIEFueUNvbHVtblR5cGU+O1xuXG5leHBvcnQgdHlwZSBSb3c8VCBleHRlbmRzIEFueVJvd1R5cGU+ID0geyBbSyBpbiBrZXlvZiBUXTogUmV0dXJuVHlwZTxUW0tdPiB9O1xuZXhwb3J0IHR5cGUgQ29sdW1uPFQgZXh0ZW5kcyBBbnlDb2x1bW5UeXBlPiA9IFJldHVyblR5cGU8VD47XG5cbmV4cG9ydCB0eXBlIEFueVByaW1pdGl2ZUNvbHVtblR5cGUgPSBFeHBlY3Q8XG4gIEFueUNvbHVtblR5cGUsXG4gIHR5cGVvZiBzdHJpbmcgfCB0eXBlb2YgbnVtYmVyIHwgdHlwZW9mIGJvb2xlYW5cbj47XG4iLCJpbXBvcnQgeyBlbnRyaWVzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9vYmplY3QvZW50cmllc1wiO1xuaW1wb3J0IHsgbWVyZ2VEZXNjcmlwdG9ycyB9IGZyb20gXCIuLi8uLi9jb21tb24vb2JqZWN0L21lcmdlRGVzY3JpcHRvcnNcIjtcbmltcG9ydCB7IGNhcGl0YWxpemUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3N0cmluZy9jYXBpdGFsaXplXCI7XG5pbXBvcnQge1xuICBGbixcbiAgSWYsXG4gIElzLFxuICBJc0VtcHR5T2JqZWN0LFxuICBPdmVycmlkZSxcbiAgUGFydGlhbFVuZGVmaW5lZEtleXMsXG4gIFVuaW9uLFxufSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IE5vUnBjIH0gZnJvbSBcIi4uL05vUnBjXCI7XG5pbXBvcnQge1xuICBBbnlScGMsXG4gIEJhc2VkUnBjLFxuICBJUnBjSGFuZGxlcixcbiAgUnBjLFxuICBScGNDb21tYW5kLFxuICBScGNDb25uZWN0aW9uLFxuICBScGNIYW5kbGVyQ2xhc3MsXG4gIFJwY0lzR2VuZXJpY0NvbmZpZ09wdGlvbixcbiAgUnBjUHJvcHNPcHRpb24sXG4gIFJwY1R5cGUsXG4gIFJwY1VucmVzb2x2ZWRDb25maWcsXG4gIFRScGMsXG59IGZyb20gXCIuLi9ScGNcIjtcblxudHlwZSBfV2lkZ2V0Q29ubmVjdGlvbjxUIGV4dGVuZHMgVFdpZGdldD4gPSBUW1wiQ29ubmVjdGlvblwiXSAmIHtcbiAgcnBjOiBXaWRnZXQ8VD47XG4gIHJwY0NvbW1hbmQ6IFJwY0NvbW1hbmQ7XG4gIGNvbnRyb2xsZXI6IFJwY0Nvbm5lY3Rpb248VFtcIkNvbnRyb2xsZXJcIl0+O1xuXG4gIGdldEVsZW1lbnQoKTogUHJvbWlzZTxUW1wiRWxlbWVudFwiXT47XG5cbiAgY29tbWFuZDxLIGV4dGVuZHMga2V5b2YgVFtcIkNvbW1hbmRzXCJdPihcbiAgICBrZXk6IHN0cmluZyAmIEssXG4gICAgLi4uYXJnczogUGFyYW1ldGVyczxUW1wiQ29tbWFuZHNcIl1bS10+XG4gICk6IFByb21pc2U8UmV0dXJuVHlwZTxUW1wiQ29tbWFuZHNcIl1bS10+Pjtcbn07XG5cbmV4cG9ydCB0eXBlIFRXaWRnZXQgPSB7XG4gIENvbm5lY3Rpb246IG9iamVjdDtcbiAgQ29uZmlnOiBUUnBjW1wiQ29uZmlnXCJdO1xuICBIYW5kbGVyOiBUUnBjW1wiSGFuZGxlclwiXTtcbiAgUHJvcHM6IFRScGNbXCJQcm9wc1wiXTtcbiAgRWxlbWVudDogb2JqZWN0O1xuICBDb250cm9sbGVyOiBBbnlScGM7XG4gIENvbW1hbmRzOiBSZWNvcmQ8c3RyaW5nLCBGbiAmIHsgaGFuZGxlcjogc3RyaW5nIH0+O1xufTtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0PFxuICBUIGV4dGVuZHMgVFdpZGdldCxcbiAgQyBleHRlbmRzIFRXaWRnZXRbXCJDb21tYW5kc1wiXSA9IFRbXCJDb21tYW5kc1wiXVxuPiA9IFJwYzx7XG4gIFRXaWRnZXQ6IFQ7XG5cbiAgQ29uZmlnOiBUW1wiQ29uZmlnXCJdO1xuXG4gIEhhbmRsZXI6IFRbXCJIYW5kbGVyXCJdICYge1xuICAgIGdldEVsZW1lbnQoKTogUHJvbWlzZTxUW1wiRWxlbWVudFwiXT47XG4gICAgZ2V0Q29udHJvbGxlckNvbmZpZygpOiBScGNVbnJlc29sdmVkQ29uZmlnPFRbXCJDb250cm9sbGVyXCJdPjtcbiAgfTtcblxuICBQcm9wczogVFtcIlByb3BzXCJdICYge1xuICAgIHdpZGdldDoge1xuICAgICAgb3B0aW9uczogV2lkZ2V0T3B0aW9uczxUV2lkZ2V0PjtcbiAgICAgIGNvbW1hbmRzOiBSZWNvcmQ8a2V5b2YgVFtcIkNvbW1hbmRzXCJdLCBzdHJpbmc+O1xuICAgICAgY29ubmVjdGlvbjogX1dpZGdldENvbm5lY3Rpb248VD47XG4gICAgICBjb250cm9sbGVyOiBUW1wiQ29udHJvbGxlclwiXTtcbiAgICB9O1xuICB9O1xuXG4gIENvbm5lY3Rpb246IF9XaWRnZXRDb25uZWN0aW9uPFQ+O1xufT47XG5cbmV4cG9ydCB0eXBlIFdpZGdldENvbnRyb2xsZXJPcHRpb248VCBleHRlbmRzIFBpY2s8VFdpZGdldCwgXCJDb250cm9sbGVyXCI+PiA9XG4gIHwgVFtcIkNvbnRyb2xsZXJcIl1cbiAgfCBJZjxJczxUW1wiQ29udHJvbGxlclwiXSwgTm9ScGM+LCB1bmRlZmluZWQ+O1xuXG5leHBvcnQgdHlwZSBXaWRnZXRDb21tYW5kc09wdGlvbjxcbiAgVCBleHRlbmRzIFBpY2s8VFdpZGdldCwgXCJDb21tYW5kc1wiPixcbiAgQyBleHRlbmRzIFRXaWRnZXRbXCJDb21tYW5kc1wiXSA9IFRbXCJDb21tYW5kc1wiXVxuPiA9XG4gIHwgeyBbSyBpbiBrZXlvZiBUW1wiQ29tbWFuZHNcIl1dOiBDW0tdW1wiaGFuZGxlclwiXSB9XG4gIHwgSWY8SXNFbXB0eU9iamVjdDxUW1wiQ29tbWFuZHNcIl0+LCB1bmRlZmluZWQ+O1xuXG5leHBvcnQgdHlwZSBXaWRnZXRPcHRpb25zPFQgZXh0ZW5kcyBUV2lkZ2V0PiA9IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICB7XG4gICAgaXNHZW5lcmljQ29uZmlnOiBScGNJc0dlbmVyaWNDb25maWdPcHRpb248VD47XG5cbiAgICBwcm9wczogUnBjUHJvcHNPcHRpb248VD47XG5cbiAgICBjb250cm9sbGVyOiBXaWRnZXRDb250cm9sbGVyT3B0aW9uPFQ+O1xuXG4gICAgY29tbWFuZHM6IFdpZGdldENvbW1hbmRzT3B0aW9uPFQ+O1xuXG4gICAgY29ubmVjdGlvbjpcbiAgICAgIHwge1xuICAgICAgICAgIFtLIGluIGtleW9mIFRbXCJDb25uZWN0aW9uXCJdXTogKFxuICAgICAgICAgICAgY29ubmVjdGlvbjogX1dpZGdldENvbm5lY3Rpb248VD5cbiAgICAgICAgICApID0+IFRbXCJDb25uZWN0aW9uXCJdW0tdO1xuICAgICAgICB9XG4gICAgICB8IElmPElzRW1wdHlPYmplY3Q8VFtcIkNvbm5lY3Rpb25cIl0+LCB1bmRlZmluZWQ+O1xuICB9LFxuICB7XG4gICAgaGFuZGxlcjogV2lkZ2V0SGFuZGxlckNsYXNzPFdpZGdldDxUPj47XG4gIH1cbj47XG5cbmV4cG9ydCB0eXBlIFdpZGdldEhhbmRsZXJDbGFzczxcbiAgUiBleHRlbmRzIEFueVdpZGdldCxcbiAgQyBleHRlbmRzIFRXaWRnZXRbXCJDb21tYW5kc1wiXSA9IFdpZGdldFR5cGU8Uj5bXCJDb21tYW5kc1wiXVxuPiA9IFJwY0hhbmRsZXJDbGFzczxSLCBfV2lkZ2V0Q29tbWFuZEhhbmRsZXJNYXA8Uj4+O1xuXG50eXBlIF9XaWRnZXRDb21tYW5kSGFuZGxlck1hcDxcbiAgUiBleHRlbmRzIEJhc2VkV2lkZ2V0LFxuICBDIGV4dGVuZHMgVFdpZGdldFtcIkNvbW1hbmRzXCJdID0gV2lkZ2V0VHlwZTxSPltcIkNvbW1hbmRzXCJdXG4+ID0ge1xuICBbSEsgaW4gVW5pb248eyBbSyBpbiBrZXlvZiBDXTogQ1tLXVtcImhhbmRsZXJcIl0gfT5dOiBVbmlvbjxcbiAgICB7XG4gICAgICBbSyBpbiBrZXlvZiBDXTogQ1tLXVtcImhhbmRsZXJcIl0gZXh0ZW5kcyBIS1xuICAgICAgICA/ICguLi5hcmdzOiBQYXJhbWV0ZXJzPENbS10+KSA9PiBQcm9taXNlPFJldHVyblR5cGU8Q1tLXT4+XG4gICAgICAgIDogbmV2ZXI7XG4gICAgfVxuICA+O1xufTtcblxuZXhwb3J0IHR5cGUgSVdpZGdldEhhbmRsZXI8XG4gIFIgZXh0ZW5kcyBBbnlXaWRnZXQsXG4gIEMgZXh0ZW5kcyBUV2lkZ2V0W1wiQ29tbWFuZHNcIl0gPSBXaWRnZXRUeXBlPFI+W1wiQ29tbWFuZHNcIl1cbj4gPSBJUnBjSGFuZGxlcjxSPiAmIF9XaWRnZXRDb21tYW5kSGFuZGxlck1hcDxSPjtcblxuZXhwb3J0IGNvbnN0IEFueVdpZGdldENvbm5lY3Rpb246IF9XaWRnZXRDb25uZWN0aW9uPFRXaWRnZXQ+ID0ge1xuICBnZXQgcnBjKCk6IGFueSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH0sXG4gIGdldCBycGNDb21tYW5kKCk6IGFueSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH0sXG4gIGdldCBjb250cm9sbGVyKCk6IGFueSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH0sXG4gIGNvbW1hbmQoa2V5LCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMucnBjQ29tbWFuZChba2V5LCBhcmdzXSk7XG4gIH0sXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucnBjQ29tbWFuZChbXCJnZXRFbGVtZW50XCIsIFtdXSk7XG4gIH0sXG59O1xuXG5leHBvcnQgdHlwZSBBbnlXaWRnZXQgPSBXaWRnZXQ8VFdpZGdldD47XG5cbmV4cG9ydCBmdW5jdGlvbiBXaWRnZXQ8UiBleHRlbmRzIEFueVdpZGdldCwgVCBleHRlbmRzIFRXaWRnZXQgPSBXaWRnZXRUeXBlPFI+PihcbiAgb3B0aW9uczogV2lkZ2V0T3B0aW9uczxUPlxuKTogV2lkZ2V0PFQ+IHtcbiAgY29uc3Qge1xuICAgIGlzR2VuZXJpY0NvbmZpZyA9IGZhbHNlLFxuICAgIHByb3BzID0ge30sXG4gICAgaGFuZGxlcixcbiAgICBjb21tYW5kcyxcbiAgICBjb250cm9sbGVyLFxuICAgIGNvbm5lY3Rpb246IGNvbm5lY3Rpb25EZXNjcmlwdG9ycyxcbiAgfSA9IG9wdGlvbnMgYXMgV2lkZ2V0T3B0aW9uczxUV2lkZ2V0PjtcblxuICBsZXQgY29ubmVjdGlvbiA9IE9iamVjdC5jcmVhdGUoQW55V2lkZ2V0Q29ubmVjdGlvbik7XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcyhjb25uZWN0aW9uRGVzY3JpcHRvcnMpKSB7XG4gICAgY29uc3QgY3VycmVudEtleSA9IFwiY3VycmVudFwiICsgY2FwaXRhbGl6ZShrZXkpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25uZWN0aW9uLCBrZXksIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgaWYgKCEoY3VycmVudEtleSBpbiB0aGlzKSkge1xuICAgICAgICAgIHRoaXNbY3VycmVudEtleV0gPSB2YWx1ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1tjdXJyZW50S2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gPGFueT5ScGM8QW55V2lkZ2V0Pih7XG4gICAgaGFuZGxlcixcbiAgICBpc0dlbmVyaWNDb25maWcsXG4gICAgcHJvcHM6IG1lcmdlRGVzY3JpcHRvcnMocHJvcHMgYXMge30sIHtcbiAgICAgIHdpZGdldDoge1xuICAgICAgICBjb250cm9sbGVyOiBjb250cm9sbGVyIHx8IE5vUnBjLFxuICAgICAgICBvcHRpb25zOiA8V2lkZ2V0T3B0aW9uczxUV2lkZ2V0Pj5vcHRpb25zLFxuICAgICAgICBjb21tYW5kczogY29tbWFuZHMgfHwge30sXG4gICAgICAgIGNvbm5lY3Rpb246IGNvbm5lY3Rpb24sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIGNvbm5lY3QoY29tbWFuZCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZihcbiAgICAgICAge1xuICAgICAgICAgIHJwYzogdGhpcyxcbiAgICAgICAgICBycGNDb21tYW5kOiBjb21tYW5kLFxuICAgICAgICAgIGNvbnRyb2xsZXI6IHRoaXMud2lkZ2V0LmNvbnRyb2xsZXIuY3JlYXRlUnBjQ29ubmVjdGlvbihwYXlsb2FkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb21tYW5kKFtcImNvbnRyb2xsZXJcIiwgcGF5bG9hZF0pO1xuICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLndpZGdldC5jb25uZWN0aW9uXG4gICAgICApO1xuICAgIH0sXG4gIH0pO1xufVxuXG4vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCB0eXBlIEFueVdpZGdldENvbm5lY3Rpb24gPSBScGNDb25uZWN0aW9uPEFueVdpZGdldD47XG5cbmV4cG9ydCB0eXBlIEJhc2VkV2lkZ2V0PFQgZXh0ZW5kcyBUV2lkZ2V0ID0gVFdpZGdldD4gPSBCYXNlZFJwYzxcbiAgUnBjVHlwZTxXaWRnZXQ8VD4+XG4+O1xuXG5leHBvcnQgdHlwZSBXaWRnZXRUeXBlPFQgZXh0ZW5kcyBCYXNlZFdpZGdldD4gPSBScGNUeXBlPFQ+W1wiVFdpZGdldFwiXTtcblxuZXhwb3J0IHR5cGUgV2lkZ2V0RWxlbWVudDxUIGV4dGVuZHMgQmFzZWRXaWRnZXQ+ID0gV2lkZ2V0VHlwZTxUPltcIkVsZW1lbnRcIl07XG5cbmV4cG9ydCB0eXBlIFdpZGdldENvbnRyb2xsZXI8VCBleHRlbmRzIEJhc2VkV2lkZ2V0PiA9IFdpZGdldFR5cGU8XG4gIFRcbj5bXCJDb250cm9sbGVyXCJdO1xuXG5leHBvcnQgdHlwZSBXaWRnZXRIb29rPFxuICBSIGV4dGVuZHMgQW55V2lkZ2V0LFxuICBUIGV4dGVuZHMgUGFydGlhbDxUV2lkZ2V0PlxuPiA9IFdpZGdldDxFeHRyYWN0PE92ZXJyaWRlPFdpZGdldFR5cGU8Uj4sIFQ+LCBUV2lkZ2V0Pj47XG5cbmV4cG9ydCB0eXBlIElXaWRnZXQgPSBXaWRnZXQ8XG4gIE92ZXJyaWRlPFxuICAgIFRXaWRnZXQsXG4gICAge1xuICAgICAgQ29tbWFuZHM6IHt9O1xuICAgIH1cbiAgPlxuPjtcbiIsImltcG9ydCB7XG4gIElmLFxuICBJcyxcbiAgT3ZlcnJpZGUsXG4gIFBhcnRpYWxVbmRlZmluZWRLZXlzLFxuICBVbmRlZmluZWRJZkVtcHR5T2JqZWN0LFxuICBVbmRlZmluZWRJZklzVW5kZWZpbmVkLFxufSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IERhdGFFeHAgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZWRhdGEvZGF0YS1leHAvRGF0YUV4cFwiO1xuaW1wb3J0IHsgRGF0YVJvdyB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9EYXRhUm93XCI7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVkYXRhL0RhdGFTb3VyY2VcIjtcbmltcG9ydCB7IE5vblJlbGF0aW9uS2V5cyB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9SZWxhdGlvblwiO1xuaW1wb3J0IHsgQ29uZmlnRmFjdG9yeSB9IGZyb20gXCIuLi8uLi9Db25maWdGYWN0b3J5XCI7XG5pbXBvcnQgeyBHZW5lcmljQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0dlbmVyaWNDb25maWdcIjtcbmltcG9ydCB7IE5vUnBjIH0gZnJvbSBcIi4uLy4uL05vUnBjXCI7XG5pbXBvcnQgeyBScGNQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vcnBjLXBhcmFtZXRlci9ScGNQYXJhbWV0ZXJcIjtcbmltcG9ydCB7XG4gIEFueVJwYyxcbiAgUnBjQ29uZmlnLFxuICBScGNDb25uZWN0aW9uLFxuICBScGNVbnJlc29sdmVkQ29uZmlnLFxufSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBScGNGbiB9IGZyb20gXCIuLi8uLi9ycGMtZm4vUnBjRm5cIjtcbmltcG9ydCB7IFJwY01hcCB9IGZyb20gXCIuLi8uLi9ycGMtbWFwL1JwY01hcFwiO1xuaW1wb3J0IHsgQW55Um93VHlwZSwgQ29sdW1uLCBSb3cgfSBmcm9tIFwiLi4vUm93XCI7XG5pbXBvcnQgeyBXaWRnZXQsIFdpZGdldENvbnRyb2xsZXIgfSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBEYXRhVGFibGVIYW5kbGVyIH0gZnJvbSBcIi4vRGF0YVRhYmxlSGFuZGxlclwiO1xuXG5leHBvcnQgdHlwZSBEYXRhVGFibGVUeXBlczxUIGV4dGVuZHMgVERhdGFUYWJsZT4gPSBfVHlwZXM8VD47XG50eXBlIF9Db2x1bW5UeXBlczxcbiAgVCBleHRlbmRzIFREYXRhVGFibGUgJiB7XG4gICAgQ29sdW1uS2V5OiBzdHJpbmc7XG4gICAgQ29sdW1uVHlwZTtcbiAgfSxcbiAgVW5kZWZpbmVkSWZDb2x1bW5LZXlJc0RhdGFLZXkgZXh0ZW5kcyB1bmRlZmluZWQgPSBJZjxcbiAgICBJczxUW1wiQ29sdW1uS2V5XCJdLCBrZXlvZiBSZXF1aXJlZDxUW1wiRGF0YVwiXT4+LFxuICAgIHVuZGVmaW5lZFxuICA+XG4+ID0ge1xuICBDb2x1bW5Mb2FkZXI6ICgocm93OiBEYXRhUm93PFRbXCJEYXRhXCJdPikgPT4gYW55KSB8IE5vblJlbGF0aW9uS2V5czxUW1wiRGF0YVwiXT47XG5cbiAgQ29sdW1uQ29uZmlnOlxuICAgIHwgX0NvbHVtblR5cGVzPFQ+W1wiQ29sdW1uTG9hZGVyXCJdXG4gICAgfCBQYXJ0aWFsVW5kZWZpbmVkS2V5czxcbiAgICAgICAge1xuICAgICAgICAgIGxvYWQ6IF9Db2x1bW5UeXBlczxUPltcIkNvbHVtbkxvYWRlclwiXSB8IFVuZGVmaW5lZElmQ29sdW1uS2V5SXNEYXRhS2V5O1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmllbGQ/OiBEYXRhRXhwPFRbXCJEYXRhXCJdPjtcbiAgICAgICAgfVxuICAgICAgPlxuICAgIHwgVW5kZWZpbmVkSWZDb2x1bW5LZXlJc0RhdGFLZXk7XG59O1xuZXhwb3J0IHR5cGUgX1R5cGVzPFQgZXh0ZW5kcyBURGF0YVRhYmxlLCBEID0gVFtcIkRhdGFcIl0sIFJvdyA9IFRbXCJSb3dcIl0+ID0gVCAmIHtcbiAgUm93V2l0aEtleTogUm93ICYgeyAka2V5OiBzdHJpbmcgfTtcblxuICBRdWVyeToge1xuICAgIGdldENvdW50PzogYm9vbGVhbjtcbiAgICBvcmRlcj86IFJlY29yZDxcbiAgICAgIGtleW9mIFJvdyxcbiAgICAgIHsgc29ydD86IFwiQVNDXCIgfCBcIkRFU0NcIjsgbnVsbHM/OiBcIkZJUlNUXCIgfCBcIkxBU1RcIiB9IHwgXCJBU0NcIiB8IFwiREVTQ1wiXG4gICAgPjtcbiAgICB0ZXh0Pzogc3RyaW5nO1xuICAgIHNraXA/OiBudW1iZXI7XG4gICAgdGFrZT86IG51bWJlcjtcbiAgfTtcblxuICBRdWVyeVJlc3VsdDogeyB0b3RhbFJvd3M6IG51bWJlcjsgcm93czogKHsgJGtleTogc3RyaW5nIH0gJiBSb3cpW10gfTtcblxuICBDb2x1bW5Db25maWdNYXA6IFVuZGVmaW5lZElmRW1wdHlPYmplY3Q8XG4gICAgUGFydGlhbFVuZGVmaW5lZEtleXM8XG4gICAgICB7XG4gICAgICAgIFtLIGluIHN0cmluZyAmIGtleW9mIFJvd106IF9Db2x1bW5UeXBlczxcbiAgICAgICAgICBUICYge1xuICAgICAgICAgICAgQ29sdW1uS2V5OiBLO1xuICAgICAgICAgICAgQ29sdW1uVHlwZTogUm93W0tdO1xuICAgICAgICAgIH1cbiAgICAgICAgPltcIkNvbHVtbkNvbmZpZ1wiXTtcbiAgICAgIH1cbiAgICA+XG4gID47XG5cbiAgT3B0aW9uYWxDb25maWc6IHtcbiAgICBnZXRSb3dDb250cm9sbGVyQ29uZmlnOlxuICAgICAgfCBDb25maWdGYWN0b3J5PFxuICAgICAgICAgIFJwY1VucmVzb2x2ZWRDb25maWc8VFtcIlJvd0NvbnRyb2xsZXJcIl0+LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiBzdHJpbmc7XG4gICAgICAgICAgICAgIHNvdXJjZTogRGF0YVNvdXJjZTxEPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgID5cbiAgICAgIHwgVW5kZWZpbmVkSWZJc1VuZGVmaW5lZDxScGNDb25maWc8VFtcIlJvd0NvbnRyb2xsZXJcIl0+PjtcblxuICAgIGNvbHVtbnM6IF9UeXBlczxUPltcIkNvbHVtbkNvbmZpZ01hcFwiXTtcbiAgfTtcblxuICBSZXF1aXJlZENvbmZpZzoge1xuICAgIHNvdXJjZTogRGF0YVNvdXJjZTxEPjtcbiAgICBwYWdlU2l6ZT86IG51bWJlcjtcbiAgICBzZWFyY2hJbj86IERhdGFFeHA8RD5bXTtcbiAgICBtYXhSb3dzPzogbnVtYmVyO1xuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgRGF0YVRhYmxlQ29uZmlnPFQgZXh0ZW5kcyBURGF0YVRhYmxlPiA9IFBhcnRpYWxVbmRlZmluZWRLZXlzPFxuICBfVHlwZXM8VD5bXCJPcHRpb25hbENvbmZpZ1wiXSxcbiAgX1R5cGVzPFQ+W1wiUmVxdWlyZWRDb25maWdcIl1cbj47XG5cbmV4cG9ydCB0eXBlIEFueURhdGFUYWJsZSA9IERhdGFUYWJsZTxURGF0YVRhYmxlPjtcblxuZXhwb3J0IHR5cGUgVERhdGFUYWJsZSA9IHtcbiAgUm93OiBhbnk7XG4gIFJvd0NvbnRyb2xsZXI6IEFueVJwYztcbiAgRGF0YTogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgRGF0YVRhYmxlPFxuICBUIGV4dGVuZHMgVERhdGFUYWJsZSxcbiAgUm93ID0gVFtcIlJvd1wiXSxcbiAgUm93Q29udHJvbGxlciBleHRlbmRzIEFueVJwYyA9IFRbXCJSb3dDb250cm9sbGVyXCJdLFxuICBEID0gVFtcIkRhdGFcIl0sXG4gIEdldFJvd3NGbiA9IChxdWVyeTogX1R5cGVzPFQ+W1wiUXVlcnlcIl0pID0+IFByb21pc2U8X1R5cGVzPFQ+W1wiUXVlcnlSZXN1bHRcIl0+XG4+ID0gV2lkZ2V0PHtcbiAgVHlwZXM6IF9UeXBlczxUPjtcblxuICBDb25maWc6IEdlbmVyaWNDb25maWc8XG4gICAgPEQ+KGNvbmZpZzogRGF0YVRhYmxlQ29uZmlnPE92ZXJyaWRlPFQsIHsgRGF0YTogRCB9Pj4pID0+IERhdGFUYWJsZUNvbmZpZzxUPlxuICA+O1xuICBDb21tYW5kczoge307XG5cbiAgQ29ubmVjdGlvbjoge1xuICAgIGdldFJvd3M6IEdldFJvd3NGbjtcbiAgICBnZXRSb3dDb250cm9sbGVyKGtleTogc3RyaW5nKTogUnBjQ29ubmVjdGlvbjxSb3dDb250cm9sbGVyPjtcbiAgfTtcblxuICBFbGVtZW50OiB7XG4gICAgLy8gVE9ETzogbW92ZSB0byBQcm9wc1xuICAgIHNlYXJjaGFibGU6IGJvb2xlYW47XG4gICAgY29sdW1uczoge1xuICAgICAgW0sgaW4ga2V5b2YgUmVxdWlyZWQ8Um93Pl06IHtcbiAgICAgICAgc29ydGFibGU6IGJvb2xlYW47XG4gICAgICB9O1xuICAgIH07XG4gICAgdG90YWxSb3dzOiBudW1iZXI7XG4gICAgcm93czogX1R5cGVzPFQ+W1wiUm93V2l0aEtleVwiXVtdO1xuICAgIHBhZ2VTaXplPzogbnVtYmVyO1xuICB9O1xuICBQcm9wczoge307XG4gIEhhbmRsZXI6IHtcbiAgICBnZXRSb3dzOiBHZXRSb3dzRm47XG5cbiAgICBsb2FkUm93KGRhdGFSb3c6IGFueSk6IFByb21pc2U8eyAka2V5OiBzdHJpbmcgfSAmIFJvdz47XG4gICAgbG9hZFJvdyhkYXRhUm93OiBhbnksIG5vS2V5OiB0cnVlKTogUHJvbWlzZTxSb3c+O1xuXG4gICAgY29sdW1uczogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAge1xuICAgICAgICBsb2FkOiAocm93OiBEYXRhUm93PEQ+KSA9PiBhbnk7XG4gICAgICAgIGZpZWxkPzogRGF0YUV4cDxEPjtcbiAgICAgIH1cbiAgICA+O1xuICB9O1xuICBDb250cm9sbGVyOiBScGNNYXA8e1xuICAgIGdldFJvd0NvbnRyb2xsZXI6IFJwY1BhcmFtZXRlcjx7XG4gICAgICBUYXJnZXQ6IFJvd0NvbnRyb2xsZXI7XG4gICAgICBEYXRhOiBzdHJpbmc7XG4gICAgICBWYWx1ZTogc3RyaW5nO1xuICAgIH0+O1xuICAgIGdldFJvd3M6IFJwY0ZuPChxdWVyeTogX1R5cGVzPFQ+W1wiUXVlcnlcIl0pID0+IF9UeXBlczxUPltcIlF1ZXJ5UmVzdWx0XCJdPjtcbiAgfT47XG59PjtcblxuZXhwb3J0IHR5cGUgRGF0YVRhYmxlT3B0aW9uczxSb3dDb250cm9sbGVyIGV4dGVuZHMgQW55UnBjPiA9IHtcbiAgcm93Q29udHJvbGxlcj86IFJvd0NvbnRyb2xsZXI7XG5cbiAgcGFnZVNpemU/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gRGF0YVRhYmxlPFxuICBSb3dUeXBlIGV4dGVuZHMgQW55Um93VHlwZSxcbiAgUm93Q29udHJvbGxlciBleHRlbmRzIEFueVJwYyA9IE5vUnBjXG4+KFxuICByb3dUeXBlOiBSb3dUeXBlLFxuICBvcHRpb25zOiBEYXRhVGFibGVPcHRpb25zPFJvd0NvbnRyb2xsZXI+ID0ge31cbik6IERhdGFUYWJsZTx7XG4gIFJvd0NvbnRyb2xsZXI6IFJvd0NvbnRyb2xsZXI7XG4gIFJvdzogUm93PFJvd1R5cGU+O1xuICBEYXRhOiBhbnk7XG59PiB7XG4gIHJldHVybiA8YW55PldpZGdldDxBbnlEYXRhVGFibGU+KHtcbiAgICBpc0dlbmVyaWNDb25maWc6IHRydWUsXG4gICAgY29ubmVjdGlvbjoge1xuICAgICAgZ2V0Um93czogY29ubiA9PiBxdWVyeSA9PiBjb25uLmNvbnRyb2xsZXIuZ2V0Um93cyhxdWVyeSksXG4gICAgICBnZXRSb3dDb250cm9sbGVyOiBjb25uID0+IGtleSA9PiBjb25uLmNvbnRyb2xsZXIuZ2V0Um93Q29udHJvbGxlcihrZXkpLFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogUnBjTWFwKHtcbiAgICAgIGdldFJvd0NvbnRyb2xsZXI6IFJwY1BhcmFtZXRlcihTdHJpbmcsIG9wdGlvbnMucm93Q29udHJvbGxlciB8fCBOb1JwYyksXG4gICAgICBnZXRSb3dzOiBScGNGbjxhbnk+KCksXG4gICAgfSkgYXMgV2lkZ2V0Q29udHJvbGxlcjxBbnlEYXRhVGFibGU+LFxuICAgIGhhbmRsZXI6IERhdGFUYWJsZUhhbmRsZXIsXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXRIYW5kbGVyIH0gZnJvbSBcIi4uL0Fic3RyYWN0V2lkZ2V0SGFuZGxlclwiO1xuaW1wb3J0IHsgZW50cmllcyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L2VudHJpZXNcIjtcbmltcG9ydCB7IG1hcE9iamVjdCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L21hcE9iamVjdFwiO1xuaW1wb3J0IHsgTGF6eSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGF0dGVybnMvbGF6eVwiO1xuaW1wb3J0IHsgUmVxdWlyZU9wdGlvbmFsS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgRGF0YUV4cCB9IGZyb20gXCIuLi8uLi8uLi90eXBlZGF0YS9kYXRhLWV4cC9EYXRhRXhwXCI7XG5pbXBvcnQgeyBEYXRhT3JkZXIgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZWRhdGEvRGF0YU9yZGVyXCI7XG5pbXBvcnQgeyBEYXRhUm93IH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVkYXRhL0RhdGFSb3dcIjtcbmltcG9ydCB7IGluc3BlY3QgfSBmcm9tIFwiLi4vLi4vLi4vbG9nZ2luZ1wiO1xuaW1wb3J0IHsgQ29uZmlnRmFjdG9yeSB9IGZyb20gXCIuLi8uLi9Db25maWdGYWN0b3J5XCI7XG5pbXBvcnQgeyBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgSVdpZGdldEhhbmRsZXIsIFdpZGdldENvbnRyb2xsZXIsIFdpZGdldEVsZW1lbnQgfSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5pbXBvcnQgeyBBbnlEYXRhVGFibGUsIERhdGFUYWJsZVR5cGVzLCBURGF0YVRhYmxlIH0gZnJvbSBcIi4vRGF0YVRhYmxlXCI7XG5cbnR5cGUgUiA9IEFueURhdGFUYWJsZTtcbnR5cGUgVCA9IFREYXRhVGFibGU7XG5cbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIYW5kbGVyXG4gIGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRIYW5kbGVyPFI+XG4gIGltcGxlbWVudHMgSVdpZGdldEhhbmRsZXI8Uj4ge1xuICBATGF6eSgpIGdldCBjb2x1bW5zKCkge1xuICAgIHJldHVybiBtYXBPYmplY3QodGhpcy5jb25maWcuY29sdW1ucyB8fCB7fSwgKGNvbHVtbkNvbmZpZywga2V5KSA9PiB7XG4gICAgICBsZXQgbG9hZCwgZmllbGQ7XG5cbiAgICAgIHN3aXRjaCAodHlwZW9mIGNvbHVtbkNvbmZpZykge1xuICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICBsb2FkID0gY29sdW1uQ29uZmlnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgZmllbGQgPSBjb2x1bW5Db25maWc7XG4gICAgICAgICAgbG9hZCA9IGRhdGFSb3cgPT4gZGF0YVJvd1tmaWVsZF07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAoeyBsb2FkLCBmaWVsZCB9ID0gY29sdW1uQ29uZmlnIHx8ICh7fSBhcyBhbnkpKTtcbiAgICAgICAgICBpZiAoIWxvYWQpIHtcbiAgICAgICAgICAgIGxvYWQgPSBkYXRhUm93ID0+IGRhdGFSb3dba2V5XTtcbiAgICAgICAgICAgIGZpZWxkID0ga2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbmV4cGVjdGVkICR7aW5zcGVjdCh7IGNvbHVtbkNvbmZpZyB9KX1gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbG9hZCxcbiAgICAgICAgZmllbGQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9hZFJvdyhkYXRhUm93LCBub0tleT86IGJvb2xlYW4pIHtcbiAgICBjb25zdCByb3c6IGFueSA9IHt9O1xuICAgIGlmICghbm9LZXkpIHtcbiAgICAgIHJvdy4ka2V5ID0gZGF0YVJvdy4ka2V5O1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtrZXksIGNvbHVtbl0gb2YgZW50cmllcyh0aGlzLmNvbHVtbnMpKSB7XG4gICAgICByb3dba2V5XSA9IGF3YWl0IGNvbHVtbi5sb2FkKGRhdGFSb3cpO1xuICAgIH1cbiAgICByZXR1cm4gcm93O1xuICB9XG5cbiAgYXN5bmMgZ2V0Um93cyhcbiAgICBxdWVyeTogRGF0YVRhYmxlVHlwZXM8VD5bXCJRdWVyeVwiXVxuICApOiBQcm9taXNlPERhdGFUYWJsZVR5cGVzPFQ+W1wiUXVlcnlSZXN1bHRcIl0+IHtcbiAgICBjb25zdCBvcmRlcnM6IERhdGFPcmRlcjxhbnk+W10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIG9yZGVyXSBvZiBlbnRyaWVzKHF1ZXJ5Lm9yZGVyKSkge1xuICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5jb2x1bW5zW2tleV07XG4gICAgICBpZiAoY29sdW1uLmZpZWxkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygb3JkZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgb3JkZXJzLnB1c2goe1xuICAgICAgICAgIGJ5OiBjb2x1bW4uZmllbGQsXG4gICAgICAgICAgc29ydDogb3JkZXIsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3JkZXJzLnB1c2goe1xuICAgICAgICAgIGJ5OiBjb2x1bW4uZmllbGQsXG4gICAgICAgICAgc29ydDogb3JkZXIuc29ydCA/PyBcIkFTQ1wiLFxuICAgICAgICAgIG51bGxzOiBvcmRlci5udWxscyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbWF4Um93cyA9IHRoaXMuY29uZmlnLm1heFJvd3MgPz8gMTA7XG4gICAgY29uc3QgZmlsdGVyczogRGF0YUV4cDxhbnk+ID0gW107XG5cbiAgICBpZiAocXVlcnkudGV4dCkge1xuICAgICAgY29uc3Qgc2VhcmNoRmlsdGVycyA9IHRoaXMuY29uZmlnLnNlYXJjaEluPy5tYXAoZmllbGQgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICRzZWFyY2g6IHtcbiAgICAgICAgICAgIGluOiBmaWVsZCxcbiAgICAgICAgICAgIHRleHQ6IHF1ZXJ5LnRleHQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHNlYXJjaEZpbHRlcnM/Lmxlbmd0aCkge1xuICAgICAgICBmaWx0ZXJzLnB1c2goeyAkb3I6IHNlYXJjaEZpbHRlcnMgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzb3VyY2UgPSB0aGlzLmNvbmZpZy5zb3VyY2VcbiAgICAgIC5vcmRlcihvcmRlcnMpXG4gICAgICAudGFrZShNYXRoLm1pbihxdWVyeS50YWtlID8/IG1heFJvd3MsIG1heFJvd3MpKVxuICAgICAgLnNraXAocXVlcnkuc2tpcCA/PyAwKVxuICAgICAgLmZpbHRlcih7ICRhbmQ6IGZpbHRlcnMgfSk7XG5cbiAgICBsZXQgdG90YWxSb3dzOiBudW1iZXI7XG4gICAgbGV0IGRhdGFSb3dzOiBEYXRhUm93PGFueT5bXTtcblxuICAgIGlmIChxdWVyeS5nZXRDb3VudCkge1xuICAgICAgW3RvdGFsUm93cywgZGF0YVJvd3NdID0gYXdhaXQgc291cmNlLmdldENvdW50QW5kUm93cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBbdG90YWxSb3dzLCBkYXRhUm93c10gPSBbMCwgYXdhaXQgc291cmNlLmdldFJvd3MoKV07XG4gICAgfVxuXG4gICAgY29uc3Qgcm93czogYW55W10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGRhdGFSb3cgb2YgZGF0YVJvd3MpIHtcbiAgICAgIHJvd3MucHVzaChhd2FpdCB0aGlzLmxvYWRSb3coZGF0YVJvdykpO1xuICAgIH1cblxuICAgIHJldHVybiB7IHJvd3MsIHRvdGFsUm93cyB9O1xuICB9XG5cbiAgZ2V0Q29udHJvbGxlckNvbmZpZygpOiBScGNVbnJlc29sdmVkQ29uZmlnPFdpZGdldENvbnRyb2xsZXI8Uj4+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0Um93Q29udHJvbGxlcjogYXN5bmMgKCQsIGtleSkgPT5cbiAgICAgICAgJChcbiAgICAgICAgICBhd2FpdCBDb25maWdGYWN0b3J5KHRoaXMuY29uZmlnLmdldFJvd0NvbnRyb2xsZXJDb25maWcsIHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcy5jb25maWcuc291cmNlLFxuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICBnZXRSb3dzOiBxdWVyeSA9PiB0aGlzLmdldFJvd3MocXVlcnkpLFxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXRFbGVtZW50KCk6IFByb21pc2U8UmVxdWlyZU9wdGlvbmFsS2V5czxXaWRnZXRFbGVtZW50PFI+Pj4ge1xuICAgIGNvbnN0IHsgcm93cywgdG90YWxSb3dzIH0gPSBhd2FpdCB0aGlzLmdldFJvd3Moe1xuICAgICAgZ2V0Q291bnQ6IHRydWUsXG4gICAgICB0ZXh0OiBcIlwiLFxuICAgICAgdGFrZTogdGhpcy5jb25maWcucGFnZVNpemUgfHwgMTAsXG4gICAgICBza2lwOiAwLFxuICAgICAgb3JkZXI6IHt9LFxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICByb3dzLFxuICAgICAgdG90YWxSb3dzLFxuICAgICAgcGFnZVNpemU6IHRoaXMuY29uZmlnLnBhZ2VTaXplLFxuICAgICAgc2VhcmNoYWJsZTogISF0aGlzLmNvbmZpZy5zZWFyY2hJbj8ubGVuZ3RoLFxuICAgICAgY29sdW1uczoge30sXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXdhaXRhYmxlLCBJZiwgSXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7XG4gIEFueUlucHV0LFxuICBJbnB1dEVycm9yLFxuICBJbnB1dFZhbHVlLFxuICBJbnB1dFZhbHVlRGF0YSxcbn0gZnJvbSBcIi4uLy4uL2lucHV0L0lucHV0XCI7XG5pbXBvcnQgeyBWYWx1ZU9yQXdhaXRhYmxlRm4gfSBmcm9tIFwiLi4vLi4vaW5wdXQvVmFsdWVPckF3YWl0YWJsZUZuXCI7XG5pbXBvcnQgeyBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgQmFzZWRXaWRnZXQsIFdpZGdldCwgV2lkZ2V0RWxlbWVudCwgV2lkZ2V0VHlwZSB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IEZvcm1IYW5kbGVyIH0gZnJvbSBcIi4vRm9ybUhhbmRsZXJcIjtcblxuZXhwb3J0IHR5cGUgVEZvcm0gPSB7XG4gIElucHV0OiBBbnlJbnB1dDtcbiAgRXJyb3I6IGFueTtcbiAgVmFsdWU6IGFueTtcbn07XG5leHBvcnQgdHlwZSBBbnlGb3JtID0gRm9ybTxURm9ybT47XG5cbmV4cG9ydCB0eXBlIEJhc2VkRm9ybSA9IEJhc2VkV2lkZ2V0PFdpZGdldFR5cGU8QW55Rm9ybT4+O1xuXG5leHBvcnQgdHlwZSBGb3JtVHlwZTxUIGV4dGVuZHMgQmFzZWRGb3JtPiA9IFdpZGdldFR5cGU8VD5bXCJURm9ybVwiXTtcblxuZXhwb3J0IHR5cGUgRm9ybTxcbiAgVCBleHRlbmRzIFRGb3JtLFxuICBWYWx1ZSA9IFRbXCJWYWx1ZVwiXSxcbiAgRXJyb3IgPSBUW1wiRXJyb3JcIl0sXG4gIElucHV0IGV4dGVuZHMgQW55SW5wdXQgPSBUW1wiSW5wdXRcIl0sXG4gIFJlc3VsdCA9XG4gICAgfCB7IHZhbHVlOiBWYWx1ZSB9XG4gICAgfCB7IGVycm9yOiBFcnJvciB9XG4gICAgfCB7IGlucHV0RXJyb3I6IElucHV0RXJyb3I8SW5wdXQ+IH1cbj4gPSBXaWRnZXQ8e1xuICBURm9ybTogVDtcblxuICBDb25uZWN0aW9uOiB7fTtcblxuICBDb21tYW5kczoge1xuICAgIHN1Ym1pdDoge1xuICAgICAgKGRhdGE6IElucHV0VmFsdWVEYXRhPElucHV0Pik6IFJlc3VsdDtcbiAgICAgIGhhbmRsZXI6IFwiaGFuZGxlU3VibWl0XCI7XG4gICAgfTtcbiAgfTtcblxuICBDb25maWc6IHtcbiAgICBkZWZhdWx0PzogVmFsdWVPckF3YWl0YWJsZUZuPElucHV0VmFsdWU8SW5wdXQ+PjtcblxuICAgIGlucHV0Q29uZmlnOiBScGNVbnJlc29sdmVkQ29uZmlnPElucHV0PjtcblxuICAgIHN1Ym1pdChcbiAgICAgIHZhbHVlOiBJbnB1dFZhbHVlPElucHV0PlxuICAgICk6IEF3YWl0YWJsZTxcbiAgICAgIHwgUmVzdWx0XG4gICAgICB8IElmPElzPFZhbHVlLCBudWxsPiwgdm9pZD5cbiAgICAgIHwgSWY8SXM8VmFsdWUsIHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBhbnlbXT4sIFZhbHVlPlxuICAgID47XG4gIH07XG5cbiAgRWxlbWVudDogV2lkZ2V0RWxlbWVudDxJbnB1dD47XG5cbiAgQ29udHJvbGxlcjogSW5wdXQ7XG5cbiAgUHJvcHM6IHsgaW5wdXQ6IElucHV0IH07XG5cbiAgSGFuZGxlcjoge307XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIEZvcm08XG4gIElucHV0IGV4dGVuZHMgQW55SW5wdXQsXG4gIFZhbHVlID0gbnVsbCxcbiAgRXJyb3IgPSBuZXZlcixcbiAgVCBleHRlbmRzIFRGb3JtID0ge1xuICAgIElucHV0OiBJbnB1dDtcbiAgICBWYWx1ZTogVmFsdWU7XG4gICAgRXJyb3I6IEVycm9yO1xuICB9XG4+KHsgaW5wdXQgfTogeyB2YWx1ZT86IFZhbHVlOyBlcnJvcj86IEVycm9yOyBpbnB1dDogSW5wdXQgfSk6IEZvcm08VD4ge1xuICByZXR1cm4gPGFueT5XaWRnZXQ8QW55Rm9ybT4oe1xuICAgIHByb3BzOiB7IGlucHV0IH0sXG4gICAgY29udHJvbGxlcjogaW5wdXQsXG4gICAgaGFuZGxlcjogRm9ybUhhbmRsZXIsXG4gICAgY29tbWFuZHM6IHsgc3VibWl0OiBcImhhbmRsZVN1Ym1pdFwiIH0sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgUmVxdWlyZU9wdGlvbmFsS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgQW55SW5wdXQsIElucHV0VmFsdWVEYXRhIH0gZnJvbSBcIi4uLy4uL2lucHV0L0lucHV0XCI7XG5pbXBvcnQgeyBWYWx1ZU9yQXdhaXRhYmxlRm4gfSBmcm9tIFwiLi4vLi4vaW5wdXQvVmFsdWVPckF3YWl0YWJsZUZuXCI7XG5pbXBvcnQgeyBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXRIYW5kbGVyIH0gZnJvbSBcIi4uL0Fic3RyYWN0V2lkZ2V0SGFuZGxlclwiO1xuaW1wb3J0IHsgQW55Rm9ybSB9IGZyb20gXCIuL0Zvcm1cIjtcbmltcG9ydCB7IElXaWRnZXRIYW5kbGVyLCBXaWRnZXRDb250cm9sbGVyLCBXaWRnZXRFbGVtZW50IH0gZnJvbSBcIi4uL1dpZGdldFwiO1xuXG50eXBlIFQgPSBBbnlGb3JtO1xuXG5leHBvcnQgY2xhc3MgRm9ybUhhbmRsZXJcbiAgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldEhhbmRsZXI8VD5cbiAgaW1wbGVtZW50cyBJV2lkZ2V0SGFuZGxlcjxBbnlGb3JtPiB7XG4gIGdldENvbnRyb2xsZXJDb25maWcoKTogUnBjVW5yZXNvbHZlZENvbmZpZzxXaWRnZXRDb250cm9sbGVyPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmlucHV0Q29uZmlnO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlU3VibWl0KHZhbHVlRGF0YTogSW5wdXRWYWx1ZURhdGE8QW55SW5wdXQ+KSB7XG4gICAgY29uc3QgaW5wdXRSZXN1bHQgPSBhd2FpdCB0aGlzLmNvbnRyb2xsZXIudGhlbihpbnB1dCA9PlxuICAgICAgaW5wdXQubG9hZEFuZENoZWNrKHZhbHVlRGF0YSlcbiAgICApO1xuICAgIGlmIChcImVycm9yXCIgaW4gaW5wdXRSZXN1bHQpIHJldHVybiB7IGlucHV0RXJyb3I6IGlucHV0UmVzdWx0LmVycm9yIH07XG4gICAgY29uc3Qgc3VibWl0UmVzdWx0ID0gYXdhaXQgdGhpcy5jb25maWcuc3VibWl0KGlucHV0UmVzdWx0LnZhbHVlKTtcbiAgICBpZiAoc3VibWl0UmVzdWx0ID09IG51bGwpIHJldHVybiB7IHZhbHVlOiBudWxsIH07XG4gICAgaWYgKHR5cGVvZiBzdWJtaXRSZXN1bHQgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShzdWJtaXRSZXN1bHQpKVxuICAgICAgcmV0dXJuIHsgdmFsdWU6IHN1Ym1pdFJlc3VsdCB9O1xuXG4gICAgcmV0dXJuIHN1Ym1pdFJlc3VsdDtcbiAgfVxuXG4gIGFzeW5jIGdldEVsZW1lbnQoKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPFdpZGdldEVsZW1lbnQ8VD4+PiB7XG4gICAgY29uc3QgdmFsdWUgPSBhd2FpdCBWYWx1ZU9yQXdhaXRhYmxlRm4odGhpcy5jb25maWcuZGVmYXVsdCk7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBhd2FpdCB0aGlzLmNvbnRyb2xsZXIudGhlbihjID0+IGMuZ2V0SW5wdXRFbGVtZW50KCkpO1xuICAgICAgcmV0dXJuIHsgLi4uZWxlbWVudCwgdmFsdWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci50aGVuKGMgPT4gYy5nZXRFbGVtZW50KCkpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBBd2FpdGFibGUsXG4gIElmLFxuICBJc1VuZGVmaW5lZCxcbiAgUGFydGlhbFVuZGVmaW5lZEtleXMsXG59IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdHlwaW5nc1wiO1xuaW1wb3J0IHsgTm9ScGMgfSBmcm9tIFwiLi4vLi4vTm9ScGNcIjtcbmltcG9ydCB7XG4gIEFueVJwYyxcbiAgUnBjQ29tbWFuZCxcbiAgUnBjQ29ubmVjdGlvbixcbiAgUnBjVW5yZXNvbHZlZENvbmZpZyxcbn0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHtcbiAgQW55V2lkZ2V0LFxuICBUV2lkZ2V0LFxuICBXaWRnZXQsXG4gIFdpZGdldEVsZW1lbnQsXG4gIFdpZGdldEhhbmRsZXJDbGFzcyxcbn0gZnJvbSBcIi4uL1dpZGdldFwiO1xuaW1wb3J0IHsgSW5saW5lV2lkZ2V0SGFuZGxlciB9IGZyb20gXCIuL0lubGluZVdpZGdldEhhbmRsZXJcIjtcblxuZXhwb3J0IHR5cGUgVElubGluZVdpZGdldCA9IHtcbiAgVGFyZ2V0OiBBbnlXaWRnZXQgfCB1bmRlZmluZWQ7XG4gIEVsZW1lbnQ6IG9iamVjdDtcbiAgQ29udHJvbGxlcjogQW55UnBjO1xufTtcblxuZXhwb3J0IHR5cGUgQW55SW5saW5lV2lkZ2V0ID0gSW5saW5lV2lkZ2V0PFRJbmxpbmVXaWRnZXQ+O1xuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgSW5saW5lV2lkZ2V0IHtcbiAgdHlwZSBXaXRoRWxlbWVudDxcbiAgICBUYXJnZXQgZXh0ZW5kcyBBbnlXaWRnZXQsXG4gICAgRWxlbWVudCBleHRlbmRzIG9iamVjdFxuICA+ID0gSW5saW5lV2lkZ2V0PHsgQ29udHJvbGxlcjogTm9ScGM7IFRhcmdldDogVGFyZ2V0OyBFbGVtZW50OiBFbGVtZW50IH0+O1xufVxuZXhwb3J0IHR5cGUgSW5saW5lV2lkZ2V0PFxuICBUIGV4dGVuZHMgVElubGluZVdpZGdldCxcbiAgVGFyZ2V0IGV4dGVuZHMgQW55V2lkZ2V0ID0gTm9uTnVsbGFibGU8VFtcIlRhcmdldFwiXT4sXG4gIFVuZGVmaW5lZFRhcmdldCBleHRlbmRzIHVuZGVmaW5lZCA9IElmPElzVW5kZWZpbmVkPFRbXCJUYXJnZXRcIl0+LCB1bmRlZmluZWQ+XG4+ID0gV2lkZ2V0PHtcbiAgVElubGluZVdpZGdldDogVDtcbiAgQ29ubmVjdGlvbjoge1xuICAgIHRhcmdldDogUnBjQ29ubmVjdGlvbjxUYXJnZXQ+IHwgVW5kZWZpbmVkVGFyZ2V0O1xuICB9O1xuICBDb25maWc6IFBhcnRpYWxVbmRlZmluZWRLZXlzPHtcbiAgICBjb250cm9sbGVyQ29uZmlnOiBScGNVbnJlc29sdmVkQ29uZmlnPFRbXCJDb250cm9sbGVyXCJdPjtcblxuICAgIGdldEVsZW1lbnQ6XG4gICAgICB8ICgoKSA9PiBBd2FpdGFibGU8VFtcIkVsZW1lbnRcIl0+KVxuICAgICAgfCBJZjxJc1VuZGVmaW5lZDxUW1wiRWxlbWVudFwiXT4sIHVuZGVmaW5lZD47XG4gICAgdGFyZ2V0Q29uZmlnOiBScGNVbnJlc29sdmVkQ29uZmlnPFRhcmdldD4gfCBVbmRlZmluZWRUYXJnZXQ7XG4gIH0+O1xuICBIYW5kbGVyOiB7fTtcbiAgUHJvcHM6IHtcbiAgICBpbmxpbmVUYXJnZXQ6IFRbXCJUYXJnZXRcIl07XG4gIH07XG4gIEVsZW1lbnQ6IFtUW1wiRWxlbWVudFwiXSwgV2lkZ2V0RWxlbWVudDxUYXJnZXQ+IHwgVW5kZWZpbmVkVGFyZ2V0XTtcbiAgQ29udHJvbGxlcjogVFtcIkNvbnRyb2xsZXJcIl07XG4gIENvbW1hbmRzOiB7XG4gICAgdGFyZ2V0OiBScGNDb21tYW5kICYgeyBoYW5kbGVyOiBcImhhbmRsZVRhcmdldFwiIH07XG4gIH07XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIElubGluZVdpZGdldDxcbiAgVGFyZ2V0IGV4dGVuZHMgQW55V2lkZ2V0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLFxuICBDb250cm9sbGVyIGV4dGVuZHMgQW55UnBjID0gTm9ScGMsXG4gIEVsZW1lbnQgZXh0ZW5kcyBvYmplY3QgPSB7fSxcbiAgVCBleHRlbmRzIFRJbmxpbmVXaWRnZXQgPSB7XG4gICAgRWxlbWVudDogRWxlbWVudDtcbiAgICBDb250cm9sbGVyOiBDb250cm9sbGVyO1xuICAgIFRhcmdldDogVGFyZ2V0O1xuICB9XG4+KG9wdGlvbnM6IHtcbiAgdGFyZ2V0PzogVGFyZ2V0O1xuICBjb250cm9sbGVyPzogQ29udHJvbGxlcjtcbiAgZWxlbWVudD86IEVsZW1lbnQ7XG59KTogSW5saW5lV2lkZ2V0PFQ+IHtcbiAgY29uc3QgeyB0YXJnZXQsIGNvbnRyb2xsZXIgfSA9IG9wdGlvbnM7XG4gIHJldHVybiBXaWRnZXQ8SW5saW5lV2lkZ2V0PFQ+Pih7XG4gICAgaXNHZW5lcmljQ29uZmlnOiBmYWxzZSxcbiAgICBoYW5kbGVyOiBJbmxpbmVXaWRnZXRIYW5kbGVyIGFzIFdpZGdldEhhbmRsZXJDbGFzczxJbmxpbmVXaWRnZXQ8VD4+LFxuICAgIHByb3BzOiB7IGlubGluZVRhcmdldDogdGFyZ2V0IH0sXG4gICAgY29udHJvbGxlcjogY29udHJvbGxlciB8fCBOb1JwYyxcbiAgICBjb21tYW5kczogeyB0YXJnZXQ6IFwiaGFuZGxlVGFyZ2V0XCIgfSxcbiAgICBjb25uZWN0aW9uOiB7XG4gICAgICB0YXJnZXQoY29ubikge1xuICAgICAgICByZXR1cm4gY29ubi5ycGMuaW5saW5lVGFyZ2V0Py5jcmVhdGVScGNDb25uZWN0aW9uKHBheWxvYWQgPT4ge1xuICAgICAgICAgIHJldHVybiBjb25uLmNvbW1hbmQoXCJ0YXJnZXRcIiwgcGF5bG9hZCk7XG4gICAgICAgIH0pITtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBMYXp5IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYXR0ZXJucy9sYXp5XCI7XG5pbXBvcnQgeyBScGNFcnJvciwgUnBjUmVzb2x2ZWRIYW5kbGVyLCBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXRIYW5kbGVyIH0gZnJvbSBcIi4uL0Fic3RyYWN0V2lkZ2V0SGFuZGxlclwiO1xuaW1wb3J0IHsgQW55SW5saW5lV2lkZ2V0IH0gZnJvbSBcIi4vSW5saW5lV2lkZ2V0XCI7XG5pbXBvcnQge1xuICBBbnlXaWRnZXQsXG4gIElXaWRnZXRIYW5kbGVyLFxuICBXaWRnZXRDb250cm9sbGVyLFxuICBXaWRnZXRFbGVtZW50LFxufSBmcm9tIFwiLi4vV2lkZ2V0XCI7XG5cbmV4cG9ydCBjbGFzcyBJbmxpbmVXaWRnZXRIYW5kbGVyPFQgZXh0ZW5kcyBBbnlJbmxpbmVXaWRnZXQ+XG4gIGV4dGVuZHMgQWJzdHJhY3RXaWRnZXRIYW5kbGVyPFQ+XG4gIGltcGxlbWVudHMgSVdpZGdldEhhbmRsZXI8QW55SW5saW5lV2lkZ2V0PiB7XG4gIGdldENvbnRyb2xsZXJDb25maWcoKTogUnBjVW5yZXNvbHZlZENvbmZpZzxXaWRnZXRDb250cm9sbGVyPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmNvbnRyb2xsZXJDb25maWc7XG4gIH1cblxuICBATGF6eSgpIGdldCB0YXJnZXRDb250ZXh0KCk6XG4gICAgfCBQcm9taXNlPFJwY1Jlc29sdmVkSGFuZGxlcjxBbnlXaWRnZXQ+PlxuICAgIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5ycGMuaW5saW5lVGFyZ2V0KVxuICAgICAgcmV0dXJuIHRoaXMucnBjLmlubGluZVRhcmdldC5yZXNvbHZlUnBjSGFuZGxlcih0aGlzLmNvbmZpZy50YXJnZXRDb25maWcpO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlVGFyZ2V0KHBheWxvYWQpIHtcbiAgICBpZiAoIXRoaXMudGFyZ2V0Q29udGV4dCkgdGhyb3cgbmV3IFJwY0Vycm9yKGBObyB0YXJnZXRgKTtcbiAgICByZXR1cm4gdGhpcy50YXJnZXRDb250ZXh0LnRoZW4oYyA9PiBjLmhhbmRsZShwYXlsb2FkKSk7XG4gIH1cblxuICBhc3luYyBnZXRFbGVtZW50KCk6IFByb21pc2U8V2lkZ2V0RWxlbWVudDxUPj4ge1xuICAgIHRoaXMuY29uZmlnLmdldEVsZW1lbnQoKTtcbiAgICByZXR1cm4gW1xuICAgICAgYXdhaXQgdGhpcy5jb25maWcuZ2V0RWxlbWVudCgpLFxuICAgICAgYXdhaXQgdGhpcy50YXJnZXRDb250ZXh0Py50aGVuKGMgPT4gYy5nZXRFbGVtZW50KCkpLFxuICAgIF07XG4gIH1cbn1cbiIsImltcG9ydCB7IFVuaW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi90eXBpbmdzXCI7XG5pbXBvcnQgeyBScGNVbnJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL1JwY1wiO1xuaW1wb3J0IHsgUnBjTWFwIH0gZnJvbSBcIi4uLy4uL3JwYy1tYXAvUnBjTWFwXCI7XG5pbXBvcnQgeyBBbnlXaWRnZXQsIFdpZGdldCwgV2lkZ2V0RWxlbWVudCB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IEFueVdpZGdldFJlY29yZCB9IGZyb20gXCIuLi93aWRnZXQtbWFwL1dpZGdldE1hcFwiO1xuaW1wb3J0IHsgVGFic1dpZGdldEhhbmRsZXIgfSBmcm9tIFwiLi9UYWJzV2lkZ2V0SGFuZGxlclwiO1xuXG5leHBvcnQgdHlwZSBBbnlUYWJzV2lkZ2V0ID0gVGFic1dpZGdldDxBbnlXaWRnZXRSZWNvcmQ+O1xuXG5leHBvcnQgdHlwZSBUYWJzV2lkZ2V0PFQgZXh0ZW5kcyBBbnlXaWRnZXRSZWNvcmQ+ID0gV2lkZ2V0PHtcbiAgVGFiTWFwOiBUO1xuXG4gIENvbnRyb2xsZXI6IFJwY01hcDxUPjtcblxuICBDb21tYW5kczoge1xuICAgIGdldFRhYjoge1xuICAgICAgKGtleTogc3RyaW5nKTogV2lkZ2V0RWxlbWVudDxBbnlXaWRnZXQ+O1xuICAgICAgaGFuZGxlcjogXCJoYW5kbGVHZXRUYWJcIjtcbiAgICB9O1xuICB9O1xuICBDb25uZWN0aW9uOiB7XG4gICAgZ2V0VGFiPEsgZXh0ZW5kcyBrZXlvZiBUPihrZXk6IEspOiBXaWRnZXRFbGVtZW50PFRbS10+O1xuICB9O1xuXG4gIENvbmZpZzogUnBjVW5yZXNvbHZlZENvbmZpZzxScGNNYXA8VD4+O1xuXG4gIEVsZW1lbnQ6IHtcbiAgICBjdXJyZW50PzogVW5pb248XG4gICAgICB7XG4gICAgICAgIFtLIGluIHN0cmluZyAmIGtleW9mIFRdOiB7XG4gICAgICAgICAga2V5OiBLO1xuICAgICAgICAgIGVsZW1lbnQ6IFdpZGdldEVsZW1lbnQ8VFtLXT47XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgPjtcbiAgfTtcblxuICBQcm9wczoge1xuICAgIHRhYk1hcDogVDtcbiAgfTtcblxuICBIYW5kbGVyOiB7fTtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gVGFic1dpZGdldDxUIGV4dGVuZHMgQW55V2lkZ2V0UmVjb3JkPihcbiAgdGFiTWFwOiBUXG4pOiBUYWJzV2lkZ2V0PFQ+IHtcbiAgcmV0dXJuIDxhbnk+V2lkZ2V0PEFueVRhYnNXaWRnZXQ+KHtcbiAgICBjb250cm9sbGVyOiBScGNNYXAodGFiTWFwKSxcbiAgICBoYW5kbGVyOiBUYWJzV2lkZ2V0SGFuZGxlcixcbiAgICBjb21tYW5kczogeyBnZXRUYWI6IFwiaGFuZGxlR2V0VGFiXCIgfSxcbiAgICBwcm9wczogeyB0YWJNYXAgfSxcbiAgICBjb25uZWN0aW9uOiB7XG4gICAgICBnZXRUYWI6IGNvbm4gPT4ga2V5ID0+IGNvbm4uY29tbWFuZChcImdldFRhYlwiLCBrZXkpLFxuICAgIH0sXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXRIYW5kbGVyIH0gZnJvbSBcIi4uL0Fic3RyYWN0V2lkZ2V0SGFuZGxlclwiO1xuaW1wb3J0IHsga2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vb2JqZWN0L2tleXNcIjtcbmltcG9ydCB7IFJlcXVpcmVPcHRpb25hbEtleXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3R5cGluZ3NcIjtcbmltcG9ydCB7IFJwY1VucmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi4vLi4vUnBjXCI7XG5pbXBvcnQgeyBJV2lkZ2V0SGFuZGxlciwgV2lkZ2V0Q29udHJvbGxlciwgV2lkZ2V0RWxlbWVudCB9IGZyb20gXCIuLi9XaWRnZXRcIjtcbmltcG9ydCB7IEFueVRhYnNXaWRnZXQgfSBmcm9tIFwiLi9UYWJzV2lkZ2V0XCI7XG5cbnR5cGUgVCA9IEFueVRhYnNXaWRnZXQ7XG5cbmV4cG9ydCBjbGFzcyBUYWJzV2lkZ2V0SGFuZGxlclxuICBleHRlbmRzIEFic3RyYWN0V2lkZ2V0SGFuZGxlcjxUPlxuICBpbXBsZW1lbnRzIElXaWRnZXRIYW5kbGVyPFQ+IHtcbiAgZ2V0Q29udHJvbGxlckNvbmZpZygpOiBScGNVbnJlc29sdmVkQ29uZmlnPFdpZGdldENvbnRyb2xsZXI8VD4+IHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlR2V0VGFiKGtleSkge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXJcbiAgICAgIC50aGVuKGMgPT4gYy5nZXRUYXJnZXRIYW5kbGVyKGtleSkpXG4gICAgICAudGhlbih0ID0+IHQuZ2V0RWxlbWVudCgpKTtcbiAgfVxuXG4gIGFzeW5jIGdldEVsZW1lbnQoKTogUHJvbWlzZTxSZXF1aXJlT3B0aW9uYWxLZXlzPFdpZGdldEVsZW1lbnQ8VD4+PiB7XG4gICAgY29uc3QgW2tleV0gPSBrZXlzKHRoaXMucnBjLndpZGdldC5jb250cm9sbGVyLnRhcmdldE1hcCk7XG5cbiAgICBjb25zdCBlbGVtZW50ID1cbiAgICAgIChrZXkgfHwgdW5kZWZpbmVkKSAmJlxuICAgICAgKGF3YWl0IHRoaXMuY29udHJvbGxlclxuICAgICAgICAudGhlbihjID0+IGMuZ2V0VGFyZ2V0SGFuZGxlcihrZXkpKVxuICAgICAgICAudGhlbihjID0+IGMuZ2V0RWxlbWVudCgpKSk7XG4gICAgcmV0dXJuIHsgY3VycmVudDogZWxlbWVudCA/IHsga2V5LCBlbGVtZW50IH0gOiB1bmRlZmluZWQgfTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSAoKSA9PiBbXTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL3NyYy9sb2dnaW5nIHN5bmMgcmVjdXJzaXZlXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7Il0sInNvdXJjZVJvb3QiOiIifQ==