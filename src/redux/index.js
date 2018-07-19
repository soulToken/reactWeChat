// import {createStore} from 'redux'
const ADD_GUN="加机关枪"
const REMOVE_GUN="减机关枪"
export function count(state=0,action){
    switch (action.type){
        case "加机关枪":
        return state+1
        case "减机关枪":
        return state-1
        default:
        return 10
    }
}
export function addGun(){
    return {
        type:ADD_GUN
    }
}
export function removeGun(){
    return {
        type:REMOVE_GUN
    }
}