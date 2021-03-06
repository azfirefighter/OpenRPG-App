/**
 * This is a small typescript definition script to allow for
 * loading of png's and other file types. We should expand this only as needed.
 *
 * Project: OpenRPG <https://openrpg.io>
 * Definitions by: incomingstick <https://github.com/incomingstick>
 */
declare module '*.png' {
    const value: any;
    export = value;
}

declare module '*.md' {
    const value: any;
    export = value;
}
