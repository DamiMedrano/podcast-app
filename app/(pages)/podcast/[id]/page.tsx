'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatEpisodes } from '@/app/utils/formatDatafromApi';
import { usePodcastContext } from '@/app/context/PodcastAppContext';
import getEpisodes from '@/app/api/getEpisodes';
import { Episode } from '@/app/types/Episode'
import AudioPlayer from '@/app/components/AudioPlayer';
import Table from '@/app/components/Table';
import ArtistCard from '@/app/components/ArtistCard';
import SearchBar from '@/app/components/SearchBar';
import Loading from '@/app/loading';
import Dropdown from '@/app/components/Dropdown';
import PlayButton from '@/app/components/PlayButton';
import VerifiedBadge from '../../../../public/assets/pngs/verified-badge.png';
import Clock from '../../../../public/assets/svgs/clock.svg'
import ArrowLeft from '../../../../public/assets/svgs/arrow-left.svg'

interface Props {
  params: {
    id: string
  }
}

const Page: React.FC<Props> = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const {togglePlay, episodeLoading, setEpisodeLoading, currentEpisode, setCurrentEpisode, isPlaying, episodes, setEpisodes} = usePodcastContext();
  const [filteredEpisodes, setFilteredEpisodes] = useState([...episodes]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSorting, setSelectedSorting] = useState('Order by');
  const [sortedEpisodes, setSortedEpisodes] = useState<Episode[]>([])


const handlePlayButtonClick = async (id: string) => {
  const selectedEpisode = episodes.find((episode: Episode) => episode.id === id);
  if (selectedEpisode === currentEpisode) {
    togglePlay();
    return;
  } else{
    setEpisodeLoading(true);
    setCurrentEpisode(selectedEpisode);
    setEpisodeLoading(false);
  }
};


useEffect(() => {
  const cachedEpisodes = localStorage.getItem(`cachedEpisodes_${params.id}`);
  if (cachedEpisodes) {
    setEpisodes(JSON.parse(cachedEpisodes));
  }

  const getEpisodesData = async () => {
    try {
      const response = await getEpisodes(params.id);
      const episodesFormatted = formatEpisodes(response);
      if(!cachedEpisodes) {
        setEpisodes(episodesFormatted);
      }
      setLoading(false);
      localStorage.setItem(`cachedEpisodes_${params.id}`, JSON.stringify(episodesFormatted));
    } catch (error) {
      console.error('Error fetching episodes: ', error);
    }
  };
  getEpisodesData();

}, [params.id, setEpisodes]);


useEffect(() => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const filtered = episodes.slice(1).filter((episode: Episode) =>
    episode.title.toLowerCase().includes(lowerCaseSearchTerm) ||
    (episode.topic && episode.topic.toLowerCase().includes(lowerCaseSearchTerm))
  );

  setFilteredEpisodes(filtered);
}, [searchTerm, episodes]);


useEffect(() => {
  let sorted = [...filteredEpisodes];
  if (selectedSorting === 'Title') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedSorting === 'Topic') {
    sorted.sort((a, b) => a.topic.localeCompare(b.topic));
  } else if (selectedSorting === 'Released') {
    sorted.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
  } else if (selectedSorting === 'Duration') {
    sorted.sort((a, b) => a.duration.localeCompare(b.duration));
  }

  setSortedEpisodes(sorted);
}, [filteredEpisodes, selectedSorting]);

  return (
    <div className='Podcast'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='flex gap-4'>
            <Link href='/' className='text-white h-[50px] w-[50px] flex justify-center items-center rounded-[15px] bg-[#1D1D1D] '>
              <Image src={ArrowLeft} alt='back' className='h-5 w-5' width={28} height={28}/>
            </Link>
            <SearchBar onSearch={setSearchTerm} searchBy='Episode' />
          </div>  
          {episodes.length > 1 && episodes[1].thumbnail && (
            <Image
              src={episodes[1].thumbnail}
              alt='podcast-banner'
              className='w-full min-w-[800px] h-[300px] object-cover rounded-lg mb-6'
              width={800} 
              height={300}
            />
          )}
          <div 
            className='h-[60px] my-2 flex justify-between items-center pb-4'>
            <PlayButton
              isActive={true}
              isAudioLoading={episodeLoading}
              isAudioPlaying={isPlaying && currentEpisode}
              size='large'
              handleClick={togglePlay}
              disabled={!currentEpisode}
            />
            <div className='flex items-center p-4 max-w-[500px]'>
              <h1 className='p-1 text-[32px] text-white w-full max-w-[400px] truncate overflow-ellipsis'>{episodes[0]?.podcastName}</h1>
              <Image src={VerifiedBadge} alt='verified-badge' width={28} height={28}/>
            </div>
            <Dropdown options={['Order by', 'Title', 'Topic', 'Released', 'Duration']} onOptionSelect={setSelectedSorting} />
            
          </div>
          <Table headers={['#', 'Title', 'Topic', 'Released', <Image src={Clock} alt='play' key='clock' className='mx-6'/>]}>
            {sortedEpisodes.map((episode: Episode) => (
              <tr key={episode.id} className='h-20 border-b-[1px] border-[#FFFFFF08]'>
                <td className='h-[80px] flex justify-center items-center'>
                  <PlayButton
                    isActive={currentEpisode === episode }
                    isAudioLoading={episodeLoading && currentEpisode === episode }
                    isAudioPlaying={isPlaying && currentEpisode === episode}
                    size='small'
                    handleClick={() => handlePlayButtonClick(episode.id)}
                  />
                </td>
                <td className='w-[20%] min-w-[300px]'>
                  <ArtistCard
                    thumbnail={episode.thumbnail}
                    title={episode.title}
                    artist={episode.artist}
                  />
                </td>
                <td>
                  <p className='text-left truncate-multiline truncate-2-lines mx-8'>
                    {episode.topic}
                  </p>
                </td>
                <td className='min-w-[120px]'>{episode.releaseDate}</td>
                <td>{episode.duration}</td>
              </tr>
            ))}
          </Table>
          <AudioPlayer />
        </>
      )}
    </div>
  );
};

export default Page;
