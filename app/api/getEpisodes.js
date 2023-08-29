export default async function getEpisodes(id) {
  const url = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`
  const allorigins = encodeURIComponent(`${url}`);
  try{
    const response = await fetch(`https://api.allorigins.win/raw?url=${allorigins}`);
    const data = await response.json();
    return data;
  }
  catch(error) {
    console.log(error)
  }
}
