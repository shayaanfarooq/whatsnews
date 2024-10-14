export enum NewsSource {
   NewsApi = 'newsapi',
   Guardian = 'guardian'
}
export const newsSourceLabels = {
   [NewsSource.NewsApi]: 'News Api',
   [NewsSource.Guardian]: 'Guardian'
}

export const defaultSources: string[] = [NewsSource.NewsApi, NewsSource.Guardian]

export const PAGE_SIZE_PER_REQUEST = 10
export const PAGE_SIZE_FOR_TOP_STORIES = 20

export enum HomeTab {
   TopStories = 'TOP STORIES',
   PersonalFeed = 'PERSONAL FEED'
}

export const imageUrls = {
   hero: 'https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_1280.jpg'
}

export const PERSONAL_FEED_LOCAL_STORAGE_KEY = 'personal_feed'
