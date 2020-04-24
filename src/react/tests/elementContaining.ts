import objectContaining = jasmine.objectContaining;
import arrayContaining = jasmine.arrayContaining;

export function elementContaining(type, props: object | null = null, ...children) {
    return objectContaining({
        type,
        ...(props ? {props: objectContaining(props)} : {}),
        ...((children || props?.['children']) ? {children: arrayContaining(children || props?.[children])} : {})
    })
}
