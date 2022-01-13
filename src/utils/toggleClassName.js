const addClassName = (el, clsNames) => {
    clsNames.forEach(cls => {
        if (!el.className.includes(cls))
            el.className = el.className + ' ' + cls;
    })
}    
const removeClassName = (el, clsNames) => {
    clsNames.forEach(cls =>
        el.className = el.className.replace(` ${cls}`, ''));
}

export { addClassName, removeClassName }