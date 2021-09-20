import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from '../../components/Loading/Loading';
import MediaCard from '../../components/MediaCard/MediaCard';
import { useStore } from '../../stores/store';
import "./Home.css";

interface MediaLoadingArg {
  mediaListId: string;
  pageNumber: number;
  pageSize: number;
}

const Home = () => {
  const { mediaStore } = useStore();

  useEffect(() => {
    mediaStore.mediaList.forEach((media, key) => {
      if(media.areMoreMedia) {
        mediaStore.getMedia({
          MediaListId: parseInt(key),
          PageNumber: media.pageNumber,
          PageSize: media.pageSize,
        });
      }
    })
  }, [mediaStore])

  const loadMoreMedia = ({ mediaListId, pageNumber, pageSize }: MediaLoadingArg) => {
    return mediaStore.getMedia({
      MediaListId: parseInt(mediaListId),
      PageNumber: pageNumber,
      PageSize: pageSize,
    });
  }

  return (
    <div className="homeContainer">
      {mediaStore.mediaArray.map((medias, index) => (
        <div key={`movie-list-${index}`}>
          <h2>Movie list {index + 1}</h2>
          <InfiniteScroll
            pageStart={medias.pageNumber}
            hasMore={medias.areMoreMedia}
            loadMore={() => loadMoreMedia({ mediaListId: medias.mediaId, pageNumber: medias.pageNumber + 1, pageSize: medias.pageSize })}
            initialLoad={false}
          >
            {medias.mediaArray.map((media, i) => (
              <div style={{ marginBottom: "40px" }} key={`movie-list-${index}-movie-${i}`}>
                <MediaCard media={media} />
              </div>
            ))}
          </InfiniteScroll>
          {!medias.areMoreMedia ? (
            <h4 className="endMessage">There are no more movies :( </h4>
          ) : (
            <Loading />
          )}
        </div>
      ))}
    </div>
  )
}

export default observer(Home);