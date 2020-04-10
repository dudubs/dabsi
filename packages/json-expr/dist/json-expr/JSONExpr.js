export function JSONExpr(...exps) {
    exps = exps.filter(exp => !!exp);
    return exps.length > 1 ? { all: exps } : exps[0];
}
