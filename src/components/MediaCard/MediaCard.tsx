import React, { useMemo } from 'react';
import "./MediaCard.css";
import BorderedContainer from '../BorderedContainer/BorderedContainer';
import { MediaModel } from '../../models/media';
import moment from 'moment';
import { useHistory } from 'react-router';

interface MediaCardProps {
  media: MediaModel
}

const MediaCard = (props: MediaCardProps) => {
  const { media } = props;
  const history = useHistory();
  const borderColors = useMemo(() => ({
    leftBorderColor: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`,
    rightBorderColor: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})` ,
  }), []);

  const ImageUrl = useMemo(() => {
    const url = media.Images.find((img) => img.ImageTypeCode === "FRAME")?.Url;
    if(url) {
      return url;
    }
    return "/assets/media.jpg";
  }, [media]);

  const goToVideo = () => {
    history.push(`/movie/${media.Id}`);
  }

  return (
    <>
      <BorderedContainer {...borderColors}>
        <div className="mediaContainer" onClick={goToVideo}>
          <div className="mediaContent">
            <img src={ImageUrl} alt="" />
            <h3 className="mediaTitle">
              {media.Title}
            </h3>
            <div className="hiddenDescription">
              <h5>Duration: {moment(media.Duration).format("hh:mm")}</h5>
              <h5>Year: {media.Year}</h5>
              <h5>Min age restriction: {media.MediaAgeRestrictionValueMin}</h5>
              <p className="mediaDescription">
                {media.Description}
              </p>
            </div>
          </div>
        </div>
      </BorderedContainer>
    </>
  )
}

export default MediaCard;