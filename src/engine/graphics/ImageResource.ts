export type ImageSourceMap<IdType extends string> = { [id in IdType]: SingleSource | ImageSourceMap<string> }

export type SingleSource = string;

export type ImageMap = { [id: string]: SingleImage | ImageMap }

export type SingleImage = HTMLImageElement;
