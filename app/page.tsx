'use client'
import { useState, useEffect } from 'react';
import getPodcasts from './api/getPodcasts';
import getEpisodes from './api/getEpisodes';
import { formatPodcasts, formatEpisodes } from './utils/formatDatafromApi';
import { Podcast } from './types/Podcast';
import { usePodcastContext } from './context/PodcastAppContext';
import Table from './components/Table';
import ArtistCard from './components/ArtistCard';
import AudioPlayer from './components/AudioPlayer';
import Link from 'next/link';
import SearchBar from './components/SearchBar';
import Dropdown from './components/Dropdown';
import Loading from './loading';
import PlayButton from './components/PlayButton';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const {togglePlay, isPlaying, setCurrentEpisode, episodeLoading, setEpisodeLoading, episodes, setEpisodes } = usePodcastContext();
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [sortedPodcasts, setSortedPodcasts] = useState<Podcast[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSorting, setSelectedSorting] = useState('Order by');
  const [playingPodcastId, setPlayingPodcastId] = useState<string | null>(null);


  useEffect(() => {
    setLoading(true);
    const cachedPodcasts = localStorage.getItem('cachedPodcasts');
    if (cachedPodcasts) {
      try {
        setPodcasts(JSON.parse(cachedPodcasts));
      } catch (e) {
        console.error('Error parsing cachedPodcasts:', e);
      }
      setLoading(false);
    }

    const getPodcastsData = async () => {
      try {
        const response = await getPodcasts();
        const podcastsFormatted = formatPodcasts(response);
        localStorage.setItem('cachedPodcasts', JSON.stringify(podcastsFormatted));
        if(!cachedPodcasts) {
          setPodcasts(podcastsFormatted);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching podcasts: ', error);
        setLoading(false);
      }
    };
    getPodcastsData();
  }, []);


  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filtered = podcasts.filter((podcast: Podcast) =>
      podcast.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      podcast.artist.toLowerCase().includes(lowerCaseSearchTerm) ||
      podcast.description.toLowerCase().includes(lowerCaseSearchTerm)
    );

    setFilteredPodcasts(filtered);
  }, [searchTerm, podcasts]);


  useEffect(() => {
    let sorted = [...filteredPodcasts];
    if (selectedSorting === 'Name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSorting === 'Description') {
      sorted.sort((a, b) => a.description.localeCompare(b.description));
    } else if (selectedSorting === 'Released') {
      sorted.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
    } else if (selectedSorting === 'Artist') {
      sorted.sort((a, b) => a.artist.localeCompare(b.artist));
    }
    setSortedPodcasts(sorted);
  }, [filteredPodcasts, selectedSorting]);

  
  const handlePlayButtonClick = (id: string) => {
    if (id === playingPodcastId) {
      togglePlay();
      return;
    } else {
      setPlayingPodcastId(id);
    }

    setEpisodeLoading(true);
    
    const cachedEpisodes = localStorage.getItem(`cachedEpisodes_${id}`);
    if (cachedEpisodes) {
      setEpisodes(JSON.parse(cachedEpisodes));
      setCurrentEpisode(cachedEpisodes[cachedEpisodes.length - 1]);
    }

    
    const getEpisodesData = async () => {
      try {
        const response = await getEpisodes(id);
        const episodesFormatted = formatEpisodes(response);
        if(!cachedEpisodes) {
          setEpisodes(episodesFormatted);
          setCurrentEpisode(episodesFormatted[1]);
        }
        setEpisodeLoading(false);
        localStorage.setItem(`cachedEpisodes_${id}`, JSON.stringify(episodesFormatted));
      } catch (error) {
        console.error('Error fetching episodes: ', error);
        setEpisodeLoading(false);
      }
    }
    getEpisodesData();
  };

  return (
    <div className='App'>
      {loading ? (
        <>
          <Loading />
          <h1>{podcasts ? "podcast exists" : 'Loading...'}</h1>
        </>
      ) : (
        <>
        
        <button onClick={() => localStorage.clear()} className='absolute top-4 right-4'>clear cache</button>
          <div className='w-full '>
            <SearchBar onSearch={setSearchTerm} searchBy='Podcast' />
            <Dropdown options={['Order by', 'Name', 'Description', 'Released', 'Artist']} onOptionSelect={setSelectedSorting} />
          </div>
          <Table headers={['#', 'Name', 'Description', 'Released']}>
            {sortedPodcasts.map((podcast: Podcast, index: number) => (
              <tr key={podcast.id} className='h-20 border-b-[1px] border-[#FFFFFF08]'>
                <td className='h-[80px] flex justify-center items-center'>
                  <PlayButton
                    isActive={podcast.id === playingPodcastId}
                    isAudioLoading={episodeLoading && podcast.id === playingPodcastId}
                    isAudioPlaying={isPlaying && podcast.id === playingPodcastId}
                    size='small'
                    handleClick={() => handlePlayButtonClick(podcast.id)}
                  />
                </td>
                <td className='w-[20%] min-w-[300px]'>
                  <Link href={`/podcast/${podcast.id}`}>
                    <ArtistCard
                      thumbnail={podcast.thumbnail}
                      title={podcast.name}
                      artist={podcast.artist}
                    />
                  </Link>
                </td>
                <td>
                  <p className='text-left truncate-multiline truncate-2-lines mx-8'>
                    {podcast.description}
                  </p>
                </td>
                <td className='min-w-[120px]'>{podcast.releaseDate}</td>
              </tr>
            ))}
          </Table>
        </>
      )}
      <AudioPlayer />
    </div>
  );
};

export default Page;
