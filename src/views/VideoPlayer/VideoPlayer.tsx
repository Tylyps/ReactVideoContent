import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import agent from '../../api/agent';
import CustomButton from '../../components/CustomButton/CustomButton';
import { SingleMediaResponse } from '../../models/media';
import { useStore } from '../../stores/store';
import { useHistory } from 'react-router-dom';
import "./VideoPlayer.css";
import Loading from '../../components/Loading/Loading';

interface ModalArg {
  firstMessage?: string;
  secondMessage?: string;
}

const VideoPlayer = () => {
  const { id } = useParams<{id:string}>();
  const [playedMedia, setPlayedMedia] = useState<SingleMediaResponse>();
  const [loading, setLoading] = useState(true);
  const { modalStore } = useStore();
  const history = useHistory();

  const modalBody = useCallback((messages: ModalArg = {
    firstMessage: "You are not authorized to perform this action.",
    secondMessage: "Please buy premium version to watch this movie."
  }) => {
    const { firstMessage, secondMessage } = messages;
    return (
      <div className="errorModal">
        {firstMessage && <h2>
          {firstMessage}
        </h2>}
        {secondMessage && <h4>
          {secondMessage}
        </h4>}
        <CustomButton
          text="Back"
          onClick={() => {
            history.goBack();
            modalStore.closeModal();
          }}
        />
      </div>
    )
  }, [history, modalStore])

  useEffect(() => {
    agent.Media.getMediaPlay(id).then((res) => {
      setPlayedMedia(res);
      setLoading(false);
      if(!res.ContentUrl) {
        modalStore.openModal(modalBody({ firstMessage: "Something went wrong", secondMessage: "Empty movie url" }));
      }
    }, (err) => {
      if(err.response.status === 403) {
        modalStore.openModal(modalBody());
      }
    })
  }, [id, modalStore, modalBody])

  return (
    <div>
      <div className="videoContainer">
        <ReactPlayer
          width="100%"
          height="100%"
          url={playedMedia?.ContentUrl}
          controls
          volume={.5}
          onError={(e) => {
            if(e.error) {
              modalStore.openModal(modalBody({ firstMessage: e.error?.message}));
            }
          }}
        />
        <div className="loadingContainer">
          <Loading show={loading} />
        </div>
      </div>
      <div className="videoDescription">
        <h2>Title: {playedMedia?.Title}</h2>
        <h4>Description: {playedMedia?.Description}</h4>
      </div>
    </div>
  )
}

export default VideoPlayer;