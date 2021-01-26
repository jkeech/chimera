## API Report File for "api-documenter-test"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export const constVariable: number;

// @public (undocumented)
export class DecoratorExample {
    creationDate: Date;
}

// @public
export class DocBaseClass {
    constructor();
    constructor(x: number);
}

// @public
export class DocClass1 extends DocBaseClass implements IDocInterface1, IDocInterface2 {
    // @internal
    constructor(name: string);
    // @deprecated (undocumented)
    deprecatedExample(): void;
    exampleFunction(a: string, b: string): string;
    exampleFunction(x: number): number;
    interestingEdgeCases(): void;
    // @eventProperty
    malformedEvent: SystemEvent;
    // @eventProperty
    readonly modifiedEvent: SystemEvent;
    // (undocumented)
    get readonlyProperty(): string;
    regularProperty: SystemEvent;
    static sumWithExample(x: number, y: number): number;
    tableExample(): void;
    // (undocumented)
    get writeableProperty(): string;
    set writeableProperty(value: string);
}

// @public
export class DocClassInterfaceMerge {
}

// @public
export interface DocClassInterfaceMerge {
}

// @public
export enum DocEnum {
    One = 1,
    Two = 2,
    Zero = 0
}

// @public
export enum DocEnumNamespaceMerge {
    Left = 0,
    Right = 1
}

// @public
export namespace DocEnumNamespaceMerge {
    export function exampleFunction(): void;
}

// @public
export namespace EcmaSmbols {
    const example: unique symbol;
}

// @public
export type ExampleDuplicateTypeAlias = SystemEvent | typeof SystemEvent;

// @public
export function exampleFunction(x: ExampleTypeAlias, y: number): IDocInterface1;

// @public
export type ExampleTypeAlias = Promise<boolean>;

// @public
export type ExampleUnionTypeAlias = IDocInterface1 | IDocInterface3;

// @public
export class Generic<T> {
}

// @public (undocumented)
export type GenericTypeAlias<T> = T[];

// @public (undocumented)
export interface IDocInterface1 {
    regularProperty: SystemEvent;
}

// @public (undocumented)
export interface IDocInterface2 extends IDocInterface1 {
    // @deprecated (undocumented)
    deprecatedExample(): void;
}

// @public
export interface IDocInterface3 {
    "[not.a.symbol]": string;
    [EcmaSmbols.example]: string;
    (x: number): number;
    [x: string]: string;
    new (): IDocInterface1;
    "redundantQuotes": string;
}

// @public
export interface IDocInterface4 {
    Context: ({ children }: {
        children: string;
    }) => boolean;
    generic: Generic<number>;
    numberOrFunction: number | (() => number);
    stringOrNumber: string | number;
}

// @public
export interface IDocInterface5 {
    regularProperty: string;
}

// @public
export interface IDocInterface6 {
    regularProperty: number;
}

// @public
export interface IDocInterface6 {
    // (undocumented)
    arrayProperty: IDocInterface1[];
    // (undocumented)
    genericReferenceMethod<T>(x: T): T;
    // (undocumented)
    intersectionProperty: IDocInterface1 & IDocInterface2;
    // (undocumented)
    tupleProperty: [IDocInterface1, IDocInterface2];
    // (undocumented)
    typeReferenceProperty: Generic<IDocInterface1>;
    // (undocumented)
    unionProperty: IDocInterface1 | IDocInterface2;
}

// @public
export interface IDocInterface7 {
    optionalField?: boolean;
    optionalMember?(): any;
    readonly optionalReadonlyField?: boolean;
    // (undocumented)
    optionalUndocumentedField?: boolean;
}

// @public
export namespace OuterNamespace {
    export namespace InnerNamespace {
        export function nestedFunction(x: number): number;
    }
    let nestedVariable: boolean;
}

// @public
export class SystemEvent {
    addHandler(handler: () => void): void;
}

// @public (undocumented)
export type TypeAlias = number;

// @public (undocumented)
export function yamlReferenceUniquenessTest(): IDocInterface1;


```