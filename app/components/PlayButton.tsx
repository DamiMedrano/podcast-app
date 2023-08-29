import React from 'react'
import Image from 'next/image';
import PlayIcon from '../../public/assets/svgs/play.svg';
import PauseIcon from '../../public/assets/svgs/pause.svg';
import LoadingIcon from '../../public/assets/svgs/reload.svg';


interface Props {
  isActive: boolean;
  isAudioLoading: boolean;
  isAudioPlaying: boolean;
  size: "small" | "medium" | "large";
  disabled?: boolean;
  handleClick: () => void;
}

const PlayButton: React.FC<Props> = ({isActive, isAudioLoading, isAudioPlaying, size, disabled, handleClick}) => {

  return (
    <button
        disabled={disabled}
        onClick={handleClick}
        className={`
            ${disabled ? 'opacity-0' : ''}
            ${size === 'large' ? 'min-w-[60px] min-h-[60px] p-4' : 'w-8 h-8'}
            ${size === 'medium' ? 'scale-125 mr-4' : ''}
            rounded-full flex justify-center items-center
          `}
        style={ isActive ? { backgroundColor: '#5C67DE' } : { backgroundColor: 'transparent' }}
      >
        { isAudioLoading ? (
          <Image 
            src={LoadingIcon} alt='loading spinner'
            className={`animate-spin ${size === 'small' ? 'p-1' : ''}`}
          />
        ) : (
          <>
            { isAudioPlaying ? (
              <Image src={PauseIcon} alt='pause' />
            ) : (
              <Image src={PlayIcon} alt='play' />
            )}
          </>
        )}
      </button>
  )
}

export default PlayButton