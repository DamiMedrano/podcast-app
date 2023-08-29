export const formatPodcasts = (data) => {
  console.log('Podcasts raw: ', data?.feed?.entry);
  const podcasts = data?.feed?.entry.map((podcast) => {
    return {
      id: podcast.id.attributes["im:id"],
      name: podcast["im:name"].label,
      artist: podcast["im:artist"].label,
      thumbnail: podcast["im:image"][2].label,
      description: podcast.summary.label,
      releaseDate: timeSince(podcast["im:releaseDate"].attributes.label),
    };
  });
  return podcasts;
};

export const formatEpisodes = (data) => {
  console.log('Episodes raw: ', data?.results);
  const podcast = data?.results?.map((episode) => {
    return {
      id: episode.trackId,
      title: episode.trackName,
      artist: data.results[0].artistName,
      thumbnail: episode.artworkUrl600,
      topic: episode.shortDescription || episode.description,
      releaseDate: timeSince(episode.releaseDate),
      episodeUrl: episode.episodeUrl,
      duration: calculateAudioDuration(episode.trackTimeMillis),
      podcastName: episode.collectionName,
    };
  });
  return podcast;
};

function calculateAudioDuration(trackTimeMillis) {
  const totalSeconds = Math.floor(trackTimeMillis / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function timeSince(date) {

    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = seconds / 31536000;

    if (interval > 1) {
        return new Date(date).toLocaleDateString();
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return new Date(date).toLocaleDateString();
    }
    interval = seconds / 604800;
    if (interval > 1) {
        return new Date(date).toLocaleDateString();
    }
    interval = seconds / 86400;
    if (interval > 2) {
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return "last " + weekdays[new Date(date).getDay()];
    }
    if (interval > 1) {
        return "yesterday";
    }
    interval = seconds / 3600;
    if (interval > 2) {
        return Math.floor(interval) + " hours ago";
    }
    if (interval > 1) {
        return "an hour ago";
    }
    return "less than an hour ago";
}

const data = [
   {
      "id":1447892344,
      "title":"Over My Dead Body",
      "artist":"Wondery",
      "thumbnail":"https://is5-ssl.mzstatic.com/image/thumb/Podcasts126/v4/35/31/61/353161c0-05dc-e525-9876-7fa0f45c9e7b/mza_4913418962055114464.jpeg/600x600bb.jpg",
      "releaseDate":"less than an hour ago",
      "duration":"NaN:NaN:NaN",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000623379180,
      "title":"Gone Hunting | The Eyes Have It",
      "artist":"Wondery",
      "thumbnail":"https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/61/24/a7/6124a7d5-9fef-3f5e-0319-26dcf35143a5/mza_669524802198677636.jpeg/600x600bb.jpg",
      "topic":"Mike and Denise Williams have a picture perfect life. Until one cold December day Mike goes hunting, and never returns. Now the authorities battle the elements to find him before it’s too late.\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"8/21/2023",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/7da51f6b-e6eb-459a-af50-9e0b34fc9727.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:37:43",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000623379277,
      "title":"Gone Hunting | Tell That To The Alligators",
      "artist":"Wondery",
      "thumbnail":"https://is5-ssl.mzstatic.com/image/thumb/Podcasts116/v4/e1/84/4a/e1844a8d-c1ef-52cb-f7ec-8831f75f010a/mza_12024111265680596781.jpeg/600x600bb.jpg",
      "topic":"A fisherman makes a disturbing discovery. Could it hold the key to what happened to Mike?\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"8/21/2023",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/f7b88a95-7d0c-4e7d-b7f3-5759e065f5e7.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:27:18",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000624330374,
      "title":"Gone Hunting | A Beautiful Wedding",
      "artist":"Wondery",
      "thumbnail":"https://is2-ssl.mzstatic.com/image/thumb/Podcasts116/v4/7d/32/68/7d326825-5901-a733-fd71-d2b775a54c11/mza_14165858912747464751.jpeg/600x600bb.jpg",
      "topic":"Mike’s wife Denise begins to move on with her life, but a friend from her past makes an unexpected appearance.\n\n\n\n\nIf you or someone you know is experiencing intimate partner violence, here are some additional resources. For the National Domestic Violence Hotline call 1-800-799-7233 or visit thehotline.org to chat with someone live at any time. \n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"yesterday",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/a9ab3966-5001-4c3d-96d9-85a7764fb05f.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:32:44",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000622441941,
      "title":"Introducing - Over My Dead Body: Gone Hunting",
      "artist":"Wondery",
      "thumbnail":"https://is2-ssl.mzstatic.com/image/thumb/Podcasts116/v4/5d/e5/cc/5de5cc06-9d79-1fab-8f6b-5b289efa3644/mza_17391910283637132693.jpeg/600x600bb.jpg",
      "topic":"When Mike Williams vanishes on a hunting trip, the authorities suspect he was eaten by alligators. But the true predators who took Mike may lurk much closer to home...\n\nFrom Wondery, comes a new season of Over My Dead Body, a twisted story about the extremes of love and betrayal. \n\nListen to Over My Dead Body: Gone Hunting early and ad-free on Wondery Plus starting on 8/7 and on Amazon Music or wherever you get your podcasts on 8/21!\n\n\n\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"7/26/2023",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/501ff98f-9e36-43a1-8f21-fd865a0a60f9.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:02:18",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000536721220,
      "title":"Introducing Over My Dead Body: Fox Lake",
      "artist":"Wondery",
      "thumbnail":"https://is3-ssl.mzstatic.com/image/thumb/Podcasts125/v4/79/6b/d8/796bd877-aa11-b78d-0264-c9663c602edf/mza_11362771287747431691.jpeg/600x600bb.jpg",
      "topic":"A small town cop known as “GI Joe” is gunned down in a swamp in the summer of 2015 and quickly becomes a martyr in the national media. But when a dogged investigator and his team set out to get justice, they uncover unsettling secrets about Joe, the local police department, and the village of Fox Lake. From Wondery, the makers of The Shrink Next Door and Dr. Death comes the third season of Over My Dead Body: Fox Lake. Hosted by Matt Baglio.\n\nAll episodes are available now. You can binge the season exclusively, and ad-free, on Wondery+ or on Amazon Music with a Prime membership or Amazon Music Unlimited subscription.\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"9/13/2021",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/2658c354-d77c-4c85-b3d5-ef0b8d76ef0f.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:02:07",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000552834778,
      "title":"Joe vs Carole | John Cameron Mitchell on Becoming Joe Exotic",
      "artist":"Wondery",
      "thumbnail":"https://is5-ssl.mzstatic.com/image/thumb/Podcasts116/v4/64/4c/38/644c38b2-1eb4-2ed1-7163-7bc75bc3e6be/mza_17089793569502227397.jpeg/600x600bb.jpg",
      "topic":"Robert Moor talks with actor John Cameron Mitchell about what it was like to step into Joe Exotic’s cowboy boots for “Joe vs. Carole”. The two discuss the effects of Tiger King mania, how Mitchell nailed the Joe Exotic accent and how a pair of ass-less chaps may just have won him the role. The TV series based on the second season of Over My Dead Body premieres on Peacock March 3rd.\n\n\n\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"3/3/2022",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/e4d6f9a7-8378-44fe-b83b-4c744841f309.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:38:45",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000549982813,
      "title":"Joe vs Carole | Kate McKinnon on Becoming Carole Baskin",
      "artist":"Wondery",
      "thumbnail":"https://is4-ssl.mzstatic.com/image/thumb/Podcasts126/v4/f5/15/1c/f5151c8b-8050-c5ad-25d6-f0e2f80720fa/mza_13493403797806658695.jpeg/600x600bb.jpg",
      "topic":"Robert Moor talks with actor Kate McKinnon about what drew her to the role of Carole Baskin. The two discuss how she found humor in such a dark story and what makes a cat person a cat person. \"Joe vs. Carole” the TV series based on the second season of Over My Dead Body is now out on Peacock.\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"3/10/2022",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/2676af74-9891-4140-b7e4-daf26470e2a6.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:15:07",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000554328578,
      "title":"Joe vs Carole | Etan Frankel on creating the world of “Joe vs. Carole”",
      "artist":"Wondery",
      "thumbnail":"https://is5-ssl.mzstatic.com/image/thumb/Podcasts116/v4/44/47/be/4447bef0-c41b-ae12-8f39-b0f6d62ec5b5/mza_144511372174157024.jpeg/600x600bb.jpg",
      "topic":"Robert Moor talks with Etan Frankel, the Executive Producer, showrunner, and writer, tasked with adapting “Joe vs. Carole” for the screen. The pair talk about class dynamics, what Gossip Girl, Friday Night Lights and Shameless have in common with Joe Exotic and how brie and champagne drew Etan to Carole Baskin. “Joe vs. Carole” the TV series based on the second season of Over My Dead Body is now out on Peacock\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"3/17/2022",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/b014c251-5405-4057-95e0-7d13ebd87779.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:39:29",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000446877614,
      "title":"Introducing: Joe vs Carole | Over My Dead Body Season 2",
      "artist":"Wondery",
      "thumbnail":"https://is5-ssl.mzstatic.com/image/thumb/Podcasts116/v4/d4/2b/59/d42b592c-3c82-d301-8e9e-8cbadc2248d9/mza_15830121678127821772.jpeg/600x600bb.jpg",
      "topic":"To listen to Over My Dead Body Season 2: 'Joe vs. Carole' listen on Amazon Music or subscribe to Wondery+. Watch the television series based on the podcast 'Joe vs. Carole' premiering on Peacock on March 3rd. smarturl.it/Joe_vs_Carole\n\n\n\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"8/19/2019",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/5543c9d6-3fb8-4fd5-9c17-eaa9a40b3bf0.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:03:14",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000429688575,
      "title":"Tally | The Husband",
      "artist":"Wondery",
      "thumbnail":"https://is2-ssl.mzstatic.com/image/thumb/Podcasts115/v4/6a/7a/0f/6a7a0f75-2691-8162-1677-b84e4434daf2/mza_5099105378696306004.jpeg/600x600bb.jpg",
      "topic":"What makes a good marriage? Dan is smitten when he meets Wendi. But after a lavish wedding and a move to Tallahassee for Dan’s job, cracks in their relationship start to appear. Dan is blindsided when he comes home from a work trip and Wendi is gone. Maybe he should have read her novel.\n\n“Where the Enemy Sleeps” is performed by Scott Mackay featuring Lucette.\n\n\n\n\nListen ad free with Wondery+, including exclusive bonus episodes. Join Wondery+ for exclusives, binges, early access, and ad free listening. Available in the Wondery App. https://wondery.app.link/overmydeadbody\n\n\n\n\nSupport us by supporting our sponsors!\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"2/12/2019",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/e35d4104-c5a1-405b-b0b8-0dd492c0e70f.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:37:03",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000429688574,
      "title":"Tally | The Former Wife",
      "artist":"Wondery",
      "thumbnail":"https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/34/f1/c3/34f1c338-09ae-ec84-3d53-e0a3c051f6b8/mza_4716445314045243052.jpeg/600x600bb.jpg",
      "topic":"Divorces between lawyers tend to be uglier than average, and Dan and Wendi’s divorce is especially vicious. She fights to leave Tallahassee. He fights just as hard to keep her there. And when both fail to get what they want, one of them ends up dead.\n\n“Where the Enemy Sleeps” is performed by Scott Mackay featuring Lucette.\n\n\n\n\nListen ad free with Wondery+, including exclusive bonus episodes. Join Wondery+ for exclusives, binges, early access, and ad free listening. Available in the Wondery App. https://wondery.app.link/overmydeadbody\n\n\n\n\nSupport us by supporting our sponsors!\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"2/12/2019",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/56e5b014-4a44-4a19-83a0-4d364da922ca.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:32:31",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000429842826,
      "title":"Tally | “Who Would Do This?”",
      "artist":"Wondery",
      "thumbnail":"https://is4-ssl.mzstatic.com/image/thumb/Podcasts115/v4/55/a4/85/55a4852d-ec55-9ec5-24d5-c4ff0860c274/mza_14974659993717324138.jpeg/600x600bb.jpg",
      "topic":"After the initial shock of the murder wears off, everyone -- friends, reporters and law enforcement -- tries to understand how this could have happened, and why. The police investigate a number of theories about who might have pulled the trigger, and the families cope with the fallout.\n\n“Where the Enemy Sleeps” is performed by Scott Mackay featuring Lucette.\n\n“If You Stayed Over” is performed by Bonobo featuring Fink.\n\n\n\n\nListen ad free with Wondery+, including exclusive bonus episodes. Join Wondery+ for exclusives, binges, early access, and ad free listening. Available in the Wondery App. https://wondery.app.link/overmydeadbody\n\n\n\n\nSupport us by supporting our sponsors!\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"2/14/2019",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/9373e5aa-9c76-4635-86b9-ba92abe433e0.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:34:33",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000430167785,
      "title":"Tally | Tato and Tuto",
      "artist":"Wondery",
      "thumbnail":"https://is3-ssl.mzstatic.com/image/thumb/Podcasts125/v4/f2/1a/7b/f21a7b34-ed8b-beb4-90dc-e79b3beb1d55/mza_15369938154134598692.jpeg/600x600bb.jpg",
      "topic":"When are arrests are finally made, it’s not who anyone expected. The FBI and local police seem to be zeroing in on a group of suspects. And soon, the King will have to make an important decision.\n\nCan’t wait for Episode 5? It’s available now exclusively to Wondery+ subscribers. Go to wondery.com/plus \n\n“Where the Enemy Sleeps” is performed by Scott Mackay featuring Lucette.\n\n\n\n\nWant to hear more from the new show One Plus One? Click here to listen: wondery.fm/OnePlusOne\n\n\n\n\nListen ad free with Wondery+, including exclusive bonus episodes. Join Wondery+ for exclusives, binges, early access, and ad free listening. Available in the Wondery App. https://wondery.app.link/overmydeadbody\n\n\n\n\nSupport us by supporting our sponsors!\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"2/19/2019",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/5d5447cb-0b5e-4472-a7a5-3dd4bd42de95.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:34:53",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000430634956,
      "title":"Tally | The Maestro",
      "artist":"Wondery",
      "thumbnail":"https://is4-ssl.mzstatic.com/image/thumb/Podcasts115/v4/f1/2c/7d/f12c7d13-d342-a580-29d4-39d41c583c80/mza_4606853266791172262.jpeg/600x600bb.jpg",
      "topic":"A mysterious stranger approaches Donna on the street in Miami. He asks for money to repay a favor that his family did for hers. Donna isn’t sure what to do, so she turns to the Maestro for help.\n\nCan’t wait for Episode 6? It’s available now exclusively to Wondery+ subscribers. Go to wondery.com/plus \n\n“Where the Enemy Sleeps” is performed by Scott Mackay featuring Lucette.\n\n\n\n\nListen ad free with Wondery+, including exclusive bonus episodes. Join Wondery+ for exclusives, binges, early access, and ad free listening. Available in the Wondery App. https://wondery.app.link/overmydeadbody\n\n\n\n\nSupport us by supporting our sponsors!\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"2/26/2019",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/bc05d468-ed55-4e8d-8e42-86fd1287f2d3.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:33:58",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000431114256,
      "title":"Tally | Against Mercy",
      "artist":"Wondery",
      "thumbnail":"https://is2-ssl.mzstatic.com/image/thumb/Podcasts115/v4/e8/19/81/e81981e2-fc59-3de9-c587-e98addb5cffa/mza_11897536727565674167.jpeg/600x600bb.jpg",
      "topic":"The Tally police department is convinced they have the evidence to arrest four people in a murder conspiracy. But prosecutors only charge three. Why?\n\nNext episode will be a special bonus interview episode with host Matthew Shaer. Can't wait till next week? It’s available now exclusively to Wondery+ subscribers. Go to wondery.com/plus \n\n“Where the Enemy Sleeps” is performed by Scott Mackay featuring Lucette.\n\n\n\n\nListen ad free with Wondery+, including exclusive bonus episodes. Join Wondery+ for exclusives, binges, early access, and ad free listening. Available in the Wondery App. https://wondery.app.link/overmydeadbody\n\n\n\n\nSupport us by supporting our sponsors!\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"3/5/2019",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/47d9a8cd-4a25-408d-9205-3a13d36e4546.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:36:21",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000457999286,
      "title":"Tally | 'Til Life Do Us Part",
      "artist":"Wondery",
      "thumbnail":"https://is3-ssl.mzstatic.com/image/thumb/Podcasts125/v4/20/5b/90/205b90d0-413f-78e5-0d71-1321ab51e8d8/mza_1010743228960193135.jpeg/600x600bb.jpg",
      "topic":"Five years after Dan Markel's murder two people go on trial. But will his family finally get justice?",
      "releaseDate":"3/12/2019",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/5f275cea-5738-44ba-a6d8-e5465a7b7932.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:32:11",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000428731091,
      "title":"Introducing Over My Dead Body: Tally",
      "artist":"Wondery",
      "thumbnail":"https://is3-ssl.mzstatic.com/image/thumb/Podcasts125/v4/f8/32/22/f8322208-e74c-39b2-fdb0-dd3e2b29f724/mza_9231023598087420445.jpeg/600x600bb.jpg",
      "topic":"\"Tally\", the first season of Over My Dead Body, premieres on Valentine's Day\n\nAll episodes are available now. You can binge the series, including exclusive seasons and bonus episodes, ad-free on Wondery+ or on Amazon Music with a Prime membership or Amazon Music Unlimited subscription. Join Wondery+ here: https://wondery.app.link/overmydeadbody\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"1/29/2019",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/ccae3cc4-9ccd-4fa8-9bdc-44ab434390f6.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:02:18",
      "podcastName":"Over My Dead Body"
   },
   {
      "id":1000622900026,
      "title":"Listen Now: My Favorite Murder",
      "artist":"Wondery",
      "thumbnail":"https://is5-ssl.mzstatic.com/image/thumb/Podcasts126/v4/35/31/61/353161c0-05dc-e525-9876-7fa0f45c9e7b/mza_4913418962055114464.jpeg/600x600bb.jpg",
      "topic":"My Favorite Murder is a true crime comedy podcast hosted by Karen Kilgariff and Georgia Hardstark, co-founders of the Exactly Right network. Every Thursday since January of 2016, Karen and Georgia have shared their lifelong interest in true crime, telling each other stories of infamous serial killers, mysterious cold cases, incredible survivor stories and more.\n\n\n\n\nYou're going to hear a clip of My Favorite Murder from Episode 356 - \"Tugboat of Life\" where Karen tells Georgia the rescue and survival story of Harrison Okene.\n\n\n\n\nIf you like what you hear, follow My Favorite Murder podcast wherever you get your podcasts. You can listen early and ad-free on the Amazon Music or Wondery app.  \n\n \n\nWondery.fm/MFM\n\nSee Privacy Policy at https://art19.com/privacy and California Privacy Notice at https://art19.com/privacy#do-not-sell-my-info.",
      "releaseDate":"7/31/2023",
      "episodeUrl":"https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/458f5b8e-ceb6-4cb6-a7ba-fb774970f478.mp3?rss_browser=BAhJIglpVE1TBjoGRVQ%3D--4577cbcc3cc5282be318e551563630a2c5c2f06f",
      "duration":"00:06:25",
      "podcastName":"Over My Dead Body"
   }
]