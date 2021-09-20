export interface MediaImageModel {
  Id: string;
  MediaId: string;
  PlatrofmCode: string;
  ImageTypeCode: string;
  Url: string;
  Width: number;
  Heigth: number;
}

export interface MediaModel {
  Id: string;
  Guid: string;
  MediaTypecode: string;
  MediaAgeRestrictionValueMin: number;
  MediaAgeRestrictionImageUrl: string;
  Title: string;
  Description: string;
  Year: number;
  Duration: number;
  IsTrialContentAviable: boolean;
  AviableFrom: string;
  Images: MediaImageModel[];
}

export interface MediaResponse {
  CacheDataValidTo: string;
  SourceType: string;
  Entities: MediaModel[];
  Products: any[];
  PageSize: number;
  PageNumber: number;
  TotalCount: number;
}

export interface MediaRequest {
  MediaListId: number | string;
  IncludeCategories: boolean;
  IncludeImages: boolean;
  IncludeMedia: boolean;
  PageNumber: number;
  PageSize: number;
}

export interface SingleMediaResponse {
  MediaId: number;
  Title: string;
  Description: string;
  MediaTypeCode: string;
  MediaTypeDisplayName: string;
  StreamId: number;
  Provider: string;
  ContentUrl: string;

}