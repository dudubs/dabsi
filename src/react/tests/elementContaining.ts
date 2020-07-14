import objectContaining = jasmine.objectContaining;
import arrayContaining = jasmine.arrayContaining;

export function elementContaining(type, props: object | null = null, ...children) {
    return jasmine.objectContaining({
        type,
        ...(props ? {props: jasmine.objectContaining(props)} : {}),
        ...((children || props?.['children']) ? {children: jasmine.arrayContaining(children || props?.[children])} : {})
    })
}
