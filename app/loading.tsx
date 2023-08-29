import Image from 'next/image';
import ReloadIcon from '../public/assets/svgs/reload.svg';

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
      <Image src={ReloadIcon} className="animate-spin h-12 w-12 text-blue-500" alt='loading spinner'/>
    </div>
  );
}

export default Loading;
