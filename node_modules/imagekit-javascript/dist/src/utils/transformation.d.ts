import { ImageKitOptions, TransformationPosition } from "../interfaces";
declare const _default: {
    getDefault: () => TransformationPosition;
    addAsQueryParameter: (options: ImageKitOptions) => boolean;
    validParameters: (options: ImageKitOptions) => boolean;
    getTransformKey: (transform: string) => string;
    getChainTransformDelimiter: () => string;
    getTransformDelimiter: () => string;
    getTransformKeyValueDelimiter: () => string;
};
export default _default;
