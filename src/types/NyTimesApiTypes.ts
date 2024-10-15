// Root response type
export type NyTimesResponse = {
   status: string
   copyright: string
   response: {
      docs: NyTimesArticle[]
   }
}

// Article type
export type NyTimesArticle = {
   abstract: string
   web_url: string
   snippet: string
   lead_paragraph: string
   source: string
   multimedia: Multimedia[]
   headline: Headline
   keywords: Keyword[]
   pub_date: string
   document_type: string
   news_desk: string
   section_name: string
   subsection_name?: string
   byline: Byline
   type_of_material: string
   _id: string
   word_count: number
   uri: string
}

// Multimedia type
type Multimedia = {
   rank: number
   subtype: string
   caption: string | null
   credit: string | null
   type: string
   url: string
   height: number
   width: number
   legacy: LegacyData
   subType: string
   crop_name: string
}

// LegacyData type
type LegacyData = {
   xlarge?: string
   xlargewidth?: number
   xlargeheight?: number
   thumbnail?: string
   thumbnailwidth?: number
   thumbnailheight?: number
   wide?: string
   widewidth?: number
   wideheight?: number
}

// Headline type
type Headline = {
   main: string
   kicker: string | null
   content_kicker: string | null
   print_headline: string | null
   name: string | null
   seo: string | null
   sub: string | null
}

// Keyword type
type Keyword = {
   name: string
   value: string
   rank: number
   major: string
}

// Byline type
type Byline = {
   original: string
   person: Person[]
   organization: string | null
}

// Person type
type Person = {
   firstname: string
   middlename: string | null
   lastname: string
   qualifier: string | null
   title: string | null
   role: string
   organization: string
   rank: number
}

export interface NyTimesSearchParams {
   'api-key': string
   q?: string
   begin_date?: string
   end_date?: string | undefined
   page?: number
}
