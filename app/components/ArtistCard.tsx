import Image from 'next/image';
import React from 'react';

interface Props {
  thumbnail: string;
  title: string;
  artist: string;
}

const ArtistCard: React.FC<Props> = ({ thumbnail, title, artist }) => {
  return (
    <div className="flex items-center gap-4 mx-4 pl-4">
      <Image
        src={thumbnail}
        alt={title}
        width={45}
        height={45}
        className="rounded-md"
      />
      <div className='flex flex-col'>
        <div className="color-red text-base text-white text-left truncate-multiline truncate-1-line leading-snug">{title}</div>
        <div className="text-sm text-left truncate-multiline truncate-1-line leading-snug">{artist}</div>
      </div>
    </div>
  );
}

export default ArtistCard;
