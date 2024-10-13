export enum NewsSource {
   NewsApi = 'News Api',
   Guardian = 'Guardian',
   NewYorkTimes = 'New York Times'
}

export const defaultSources: string[] = [NewsSource.NewsApi, NewsSource.Guardian]

export const PAGE_SIZE_PER_REQUEST = 10
