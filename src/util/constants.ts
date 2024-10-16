// news sources
export enum NewsSource {
   NewsApi = 'newsapi',
   Guardian = 'guardian',
   NyTimes = 'nytimes'
}
export const newsSourceLabels = {
   [NewsSource.NewsApi]: 'News Api',
   [NewsSource.Guardian]: 'Guardian',
   [NewsSource.NyTimes]: 'New York Times'
}

export const defaultSources: string[] = [
   NewsSource.NewsApi,
   NewsSource.Guardian,
   NewsSource.NyTimes
]

// numeric constants
export const PAGE_SIZE_PER_REQUEST = 10
export const PAGE_SIZE_FOR_TOP_STORIES = 20
export const TOP_STORIES_STALE_TIME = 3600000

// tabs
export enum HomeTab {
   TopStories = 'TOP STORIES',
   PersonalFeed = 'PERSONAL FEED'
}

// image url
export const imageUrls = {
   hero: 'https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_1280.jpg'
}

// local storage
export const PERSONAL_FEED_LOCAL_STORAGE_KEY = 'personal_feed'
