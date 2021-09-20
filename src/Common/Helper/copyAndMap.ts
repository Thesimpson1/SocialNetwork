import { usersType } from "../../Redux/Reducer_Users"

type NewObjectPropsType = {followed: boolean}
type copyAndMapType = (item: any, itemId: number, objectId: any, newObjectProps:NewObjectPropsType ) => usersType[]

export const copyAndMap: copyAndMapType = (item, itemId, objectId, newObjectProps ) => {
    return item.map((i: Array<number|string>) => {
        if (i[objectId] === itemId) {
            return { ...i, ...newObjectProps }
        }
        return i;
    })
}