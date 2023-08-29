import { useState, useEffect } from 'react';
import { usePodcastContext } from '../context/PodcastAppContext';
import Image from 'next/image';
import { Episode } from '../types/Episode';
import PlayButton from './PlayButton';
import MutedSpeaker from '../../public/assets/svgs/muted-speaker.svg';
import Speaker from '../../public/assets/svgs/speaker.svg';
import PlayNext from '../../public/assets/svgs/play-next.svg';
import PlayPrevious from '../../public/assets/svgs/play-previous.svg';
import Shuffle from '../../public/assets/svgs/shuffle.svg';
import Reload from '../../public/assets/svgs/reload.svg';

function AudioPlayer() {
    const [volume, setVolume] = useState(100);
    const [lastVolume, setLastVolume] = useState(100);
    const [mute, setMute] = useState(false);
    const [duration, setDuration] = useState<number>(0);
    const [elapsed, setElapsed] = useState<number>(0);

    const { togglePlay, audioPlayer, episodeLoading, setEpisodeLoading, currentEpisode, setCurrentEpisode, episodes, isPlaying, setIsPlaying } = usePodcastContext();


    useEffect(() => {
        if (audioPlayer.current) {
            audioPlayer.current.volume = volume / 100;
        }
        
        const interval = isPlaying ? setInterval(() => {
            if (audioPlayer.current) {
                setDuration(Math.floor(audioPlayer.current.duration || 0));
                setElapsed(Math.floor(audioPlayer.current.currentTime || 0));
            }
        }, 1000) : null;

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [volume, isPlaying]);


    useEffect(() => {
        const audio = audioPlayer.current;
        if (audio) {
            audio.volume = volume / 100;
            const handleCanPlay = () => {
                console.log('Audio can start playing, but not guaranteed to play till the end without buffering');
                setEpisodeLoading(false);
            };
            const handleCanPlayThrough = () => {
                console.log('Audio can be played till the end without buffering');
            };
            audio.addEventListener('canplay', handleCanPlay);
            audio.addEventListener('canplaythrough', handleCanPlayThrough);

            return () => {
                audio.removeEventListener('canplay', handleCanPlay);
                audio.removeEventListener('canplaythrough', handleCanPlayThrough);
            };
        }
    }, [volume, audioPlayer, setEpisodeLoading]);


    useEffect(() => {
        audioPlayer.current?.play();
        if (!isPlaying){
            setIsPlaying(true);
        }
    }, [currentEpisode]);


    if (!currentEpisode) return null; 


    function formatTime(time: number): string {
        const hour = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        if(hour === '00') return `${minutes}:${seconds}`;
        return `${hour}:${minutes}:${seconds}`;
    }


    const handleMute = () => {
        setMute(prev => !prev);
        setLastVolume(volume);
        mute ? setVolume(lastVolume) : setVolume(0);
    }


    const goToNextEpisode = () => {
        const currentIndex = episodes.findIndex((episode: Episode) => episode.id === currentEpisode.id);
        const nextIndex = (currentIndex + 1) % episodes.length;
        setCurrentEpisode(episodes[nextIndex]);
    };


    const goToPreviousEpisode = () => {
        const currentIndex = episodes.findIndex((episode: Episode) => episode.id === currentEpisode.id);
        const prevIndex = (currentIndex - 1 + episodes.length) % episodes.length;
        setCurrentEpisode(episodes[prevIndex]);
    };


    const playRandomEpisode = () => {
        const randomIndex = Math.floor(Math.random() * episodes.length);
        setCurrentEpisode(episodes[randomIndex]);
    };


    const startFromBeginning = () => {
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = 0;
        }
    };


    return (
        <div className='bg-[#1A1A1A] w-full h-[110px] flex fixed bottom-0 left-0 justify-between'>
            <audio 
                src={currentEpisode.episodeUrl}
                ref={audioPlayer}
                muted={mute} 
            />
            <div className='flex'>
                <Image 
                    src={currentEpisode.thumbnail || ''}
                    alt={currentEpisode.title || "Episode Art"}
                    width={110}
                    height={110}
                    className='min-w-[110px] object-cover bg-[#fafafa]'
                />
                <div className='flex flex-col justify-center px-6'>
                    <div className='text-white text-base truncate-multiline truncate-2-lines leading-snug'>
                        {currentEpisode.title}
                    </div>
                    <div className='text-sm truncate-multiline truncate-2-lines leading-snug'>
                        {currentEpisode.artist}
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <button onClick={playRandomEpisode} className='w-10 h-10 flex justify-center items-center px-2 mr-4'>
                    <Image src={Shuffle} alt='shuffle' />
                </button>
                <button onClick={goToPreviousEpisode} className='w-10 h-10 flex justify-center items-center px-2 mr-4'>
                    <Image src={PlayPrevious} alt='shuffle' />
                </button>
                <PlayButton
                    isActive={true}
                    isAudioLoading={episodeLoading}
                    isAudioPlaying={isPlaying}
                    size='medium'
                    handleClick={togglePlay}
                  />

                <button onClick={goToNextEpisode} className='w-10 h-10 flex justify-center items-center px-2 mr-4'>
                    <Image src={PlayNext} alt='shuffle' />
                </button>
                <button onClick={startFromBeginning} className='w-10 h-10 flex justify-center items-center px-2 mr-4'>
                    <Image src={Reload} alt='shuffle' />
                </button>
            </div>
            <div className='flex items-center'>
                <span className='text-white w-[64px]'>{formatTime(elapsed)}</span>
                <input 
                    className='max-w-[400px] min-w-[360px] w-full mx-4'
                    type="range" 
                    min="0" 
                    max={duration} 
                    value={elapsed} 
                    onChange={e => {
                        const newValue = parseInt(e.target.value, 10);
                        setElapsed(newValue);
                        if (audioPlayer.current) {
                            audioPlayer.current.currentTime = newValue;
                        }
                    }} 
                />
                <span className='w-[64px]'>{formatTime(duration - elapsed)}</span>
            </div>
            <div className='flex justify-center items-center px-6'>
                <button className='w-10 h-10 flex justify-center items-center px-2' onClick={() => handleMute()}>
                    {mute ? <Image src={MutedSpeaker} alt='shuffle' /> : <Image src={Speaker} alt='shuffle' />}
                </button>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={e => setVolume(parseInt(e.target.value, 10))} 
                />
                
            </div>
        </div>
    );
}

export default AudioPlayer;
