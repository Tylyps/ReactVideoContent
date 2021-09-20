import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { MediaModel } from "../models/media";

interface MediaListShortRequest {
  MediaListId: number | string;
  PageNumber: number;
  PageSize: number;
}

const MediaListRequest = (request: MediaListShortRequest) => {
  return {
    IncludeCategories: false,
    IncludeImages: true,
    IncludeMedia: false,
    ...request
  }
}

interface MediaListModel {
  mediaArray: MediaModel[],
  pageSize: number,
  pageNumber: number,
  totalCount: number,
  areMoreMedia: boolean,
  mediaId: string,
}

export default class MediaListStore {
  mediaList: Map<string, MediaListModel> = new Map();

  constructor() {
    makeAutoObservable(this);
    this.mediaList
      .set("2", {
        mediaArray: [],
        pageSize: 15,
        pageNumber: 0,
        totalCount: 15,
        areMoreMedia: true,
        mediaId: "2",
      })
      .set("3", {
        mediaArray: [],
        pageSize: 15,
        pageNumber: 0,
        totalCount: 15,
        areMoreMedia: true,
        mediaId: "3",
      })
  }

  getMedia = async (data: MediaListShortRequest) => {
    try {
      const mediaList = await agent.Media.getList(MediaListRequest(data));
      const oldMediaList = this.mediaList.get(data.MediaListId.toString());
      runInAction(() => {
        if(oldMediaList){
          const newMediaArray = [...oldMediaList.mediaArray, ...mediaList.Entities]
          this.mediaList.set(data.MediaListId.toString(), {
            mediaArray: newMediaArray,
            pageSize: mediaList.PageSize,
            pageNumber: mediaList.PageNumber,
            totalCount: mediaList.TotalCount,
            areMoreMedia: newMediaArray.length < mediaList.TotalCount,
            mediaId: data.MediaListId.toString(),
          })
        } else {
          this.mediaList.set(data.MediaListId.toString(), {
            mediaArray: [...mediaList.Entities],
            pageSize: mediaList.PageSize,
            pageNumber: mediaList.PageNumber,
            totalCount: mediaList.TotalCount,
            areMoreMedia: mediaList.Entities.length < mediaList.TotalCount,
            mediaId: data.MediaListId.toString(),
          })
        }
      })
    } catch (err) {
      throw(err);
    }
  }

  get mediaArray() {
    return Array.from(this.mediaList.values());
  }

}