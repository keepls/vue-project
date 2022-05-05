import {warn} from 'vue'
import {fromPairs} from 'lodash-unified'
import {isObject} from '../types'
import {hasOwn} from '../objects'
import type {ExtractPropTypes,PropType} from 'vue'

const wrapperKey=Symbol()

export const propKey='__elPropsReservedKey'

type ResolveProp<T> =ExtractPropTypes<{
    key:{type:T;required:true}
}>['key']

type ResolvePropType<T>=ResolveProp<T> extends {type:infer V}
 ? V : ResolveProp<T>

 type ResolvePropTypeWithReadonly<T>=Readonly<T> extends Readonly<Array<infer A>>
 ? ResolvePropType<A[]> : ResolvePropType<T>

 type IfUnknown<T,V>=[unknown] extends [T] ? V:T

 export type BuildPropOption<T,D extends BuildPropType<T,V,C>,R,V,C>={
     type?:T
     values?:readonly V[]
     required?:R
     default?:R extends true
     ?never
     :D extends Record<string,unknown> | Array<any>
     ? () => D
     :(()=>D) | D
     validator?:((val:any)=>val is C) | ((val:any)=>boolean)
 }

 type _BuildPropType<T,V,C>=
 | (T extends PropWrapper<unknown>
    ? T[typeof wrapperKey]
    :[V] extends [never]
    ? ResolvePropTypeWithReadonly<T>
    :never 
    )
    | V
    | C

export type BuildPropType<T,V,C>=_BuildPropType<
    IfUnknown<T,never>,
    IfUnknown<V,never>,
    IfUnknown<C,never>
>

type _BuildPropDefault<T,D>=[T] extends[
    Record<string,unknown> | Array<any> | Function
]
? D: D extends()=>T
? ReturnType<D>:D


export type BuildPropDefault<T,D,R>= R extends true
? {readonly default?:undefined}
:{
    readonly default:Exclude<D,undefined> extends never
    ? undefined :Exclude<_BuildPropDefault<T,D>,undefined>
}

export type BuildPropReturn<T,D,R,V,C>={
    readonly type:PropType<BuildPropType<T,V,C>>
    readonly required:IfUnknown<R,false>
    readonly validator :((val:unknown)=>boolean) | undefined
    [propKey]:true
} & BuildPropDefault<
    BuildPropType<T,V,C>,
    IfUnknown<D,never>,
    IfUnknown<R,false>
>

export function buildProp<
    T=never,
    D extends BuildPropType<T,V,C>=never,
    R extends boolean=false,
    V=never,
    C=never
>(
    option:BuildPropOption<T,D,R,V,C>,
    key?:string
):BuildPropReturn<T,D,R,V,C>{
    if(!isObject(option) || !!option[propKey]) return option as any

    const {values,required,default:defaultValue,type,validator}=option

    // const _validator=
}




















