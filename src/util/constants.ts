export enum NewsSource {
   NewsApi = 'newsapi',
   Guardian = 'guardian',
   NewYorkTimes = 'New York Times'
}
export const newsSourceLabels = {
   [NewsSource.NewsApi]: 'News Api',
   [NewsSource.Guardian]: 'Guardian',
   [NewsSource.NewYorkTimes]: 'New York Times'
}

export const defaultSources: string[] = [NewsSource.NewsApi, NewsSource.Guardian]

export const PAGE_SIZE_PER_REQUEST = 10
export const PAGE_SIZE_FOR_TOP_STORIES = 20

export enum HomeTab {
   TopStories = 'Top Stories',
   PersonalFeed = 'Personal Feed'
}
