'use client';
import { createContext, useContext, useState, useRef } from 'react';

const PodcastAppContext = createContext();

export function PodcastAppProvider({ children }) {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [episodeLoading, setEpisodeLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  const audioPlayer = useRef(null);

  const togglePlay = () => {
    if (audioPlayer.current) {
      if (!isPlaying) {
        audioPlayer.current.play();
      } else {
        audioPlayer.current.pause();
      }

      setIsPlaying((prev) => !prev);
    }
  };

  return (
    <PodcastAppContext.Provider value={{ togglePlay, audioPlayer, episodeLoading, setEpisodeLoading, currentEpisode, setCurrentEpisode, isPlaying, setIsPlaying, episodes, setEpisodes }}>
      {children}
    </PodcastAppContext.Provider>
  );
}

export function usePodcastContext() {
  return useContext(PodcastAppContext);
}
