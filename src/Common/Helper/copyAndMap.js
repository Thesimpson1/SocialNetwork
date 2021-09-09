

export const copyAndMap = (item, itemId, objectId, newObjectProps) => {
    return item.map(i => {
            if (i[objectId] === itemId) {
                return { ...i, ...newObjectProps }
            }
            return i;
            })
}