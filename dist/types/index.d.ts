declare class D {
    _date: Date;
    constructor(...args: any[]);
    get year(): number;
    get yr(): number;
    get month(): string;
    get mon(): string;
    get day(): string;
    get dy(): string;
    get date(): number;
    get hours(): string;
    get hrs(): number;
    get minutes(): string;
    get mins(): number;
    get seconds(): string;
    get secs(): number;
    format(mask?: string): string;
    when(): string;
}
export default D;
