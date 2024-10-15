<img width="90" alt="image" src="https://github.com/user-attachments/assets/f2fba752-22f5-4c5a-bf0d-4fd566cd1a9f">

# WhatsNews - A News Aggregator

**WhatsNews** is a news aggregator built with React, Vite, and TypeScript. The application fetches news articles from multiple sourcesI, and displays them in a user-friendly interface.

#### Sources

-  [News Api Org](https://newsapi.org/)
-  [The Guardian](https://open-platform.theguardian.com/)
-  [New York Times](https://developer.nytimes.com/docs/articlesearch-product/1/overview)

## Features

-  Fetches news articles from multiple sources (NewsAPI and The Guardian API as of now).
-  A responsive UI to browse articles by categories or news sources.
-  Searching and filtering articles
-  Top strories feed
-  Saving preferences for custom feed

## Technologies Used

-  **React** with **TypeScript**
-  **Vite** for fast builds and development
-  **Tailwind CSS** for styling
-  **ShadCN** components for UI
-  **React Query** for data fetching
-  **Jotai** for minimal state management
-  **Docker** for containerization

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

-  **Node.js** (v16 or higher)
-  **npm** (or **yarn**)
-  **Docker** (only required for dockerization step)

### Installation and Running

1. Clone the repository:

   ```bash
   git clone https://github.com/shayaanfarooq/whatsnews.git
   cd whatsnews
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```bash
   touch .env
   ```

4. Add your API keys to the `.env` file:
   You can sign-up for free for the developer keys

   ```bash
   VITE_NEWS_API_KEY=your_news_api_key
   VITE_GUARDIAN_API_KEY=your_guardian_api_key
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:5731` in your browser to see the app.

## Folder Structure

-  `src/`
   -  `api/`
      -  `client/` - fetcher functions categories by source api
      -  `queries/` - custom hooks wrapped around react query hooks
      -  `util/` - data parsers dealing with raw api data and params
   -  `assets/`
   -  `atoms/` - jotai atoms for state management
   -  `components/` - common app components
      -  `ui/` - shadcn based reusable components
   -  `routes/` - all pages of the app
   -  `types/` - typescript type declarations
   -  `util/` - helper functions
   -  ...configs etc

## Docker Instructions

### Dockerizing the App

1. Clone the repository:

   ```bash
   git clone https://github.com/shayaanfarooq/whatsnews.git
   cd whatsnews
   ```

2. Ensure you have Docker installed on your system.
   (Due to some issue with env+Vite+docker, this has to be done slightly unconventionally)
3. Build the Docker image:
   ```bash
   docker build \
   --build-arg VITE_NEWS_API_KEY=your_api_key \
   --build-arg VITE_GUARDIAN_API_KEY=your_api_key_2 \
   --build-arg VITE_NY_TIMES_API_KEY=your_api_key_3 \
   -t whatsnews .
   ```
4. Run the Docker container:
   ```bash
   docker run -p 3000:80 whatsnews
   ```
5. Open `http://localhost:3000` to view the dockerized app.

## Screenshots

<img width="1440" alt="image" src="https://github.com/user-attachments/assets/88341018-8dca-480a-b55a-fe3b86daf9ab">

<br/><br/>

<img width="1440" alt="Screenshot 2024-10-15 at 3 04 08 AM" src="https://github.com/user-attachments/assets/7cdc1c47-707a-4cdb-81ce-5b6179c4859b">

<br/><br/>

<img width="1440" alt="image" src="https://github.com/user-attachments/assets/83c30cc9-b96e-4e53-962c-f12c6d8a83f8">
