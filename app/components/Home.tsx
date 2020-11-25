import React, { useEffect, useState } from 'react'
import {
  TopMangasRatings,
  TextLeft,
  HorizontalCards,
  Image,
  ImageTitle,
  CardHolder
} from './HomeStyle'
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import routes from '../constants/routes.json';
import Mangadex from 'mangadex-api';

interface topMangaByRatings {
  id: number,
  title: string,
  cover_url?: string,
  follows: number,
  rating: number,
  users: number,
}

interface latestUpdates {
  id: number,
  chapter: string,
  title: string,
  manga_id: number,
  cover_url: string,
  group: {
    id: number,
    name: string
  },
  uploaded: string
}

interface topChapters {
  id: number,
  chapter: string,
  title: string,
  manga_id: number,
  cover_url: string,
  views: number,
}

export default function Home(): JSX.Element {
  const [topMangasCategory, setTopMangasCategory] = useState("Ratings")
  const [topChaptersByMoments, setTopChaptersByMoments] = useState("6h");
  const [topMangas, setTopMangas] = useState<topMangaByRatings[]>([]);
  const [latestUpdates, setLatestUpdates] = useState<latestUpdates[]>([]);
  const [topChapters, setTopChapters] = useState<topChapters[]>([])
  const [favoritos, setFavoritos] = useState()

  useEffect(() => {
    Mangadex.getHome().then((home) => {
      console.log(home);
      setTopMangas(home.top_manga.rating)
      setLatestUpdates(home.latest_updates.all)
      setTopChapters(home.top_chapters.six_hours)
    })

    setFavoritos(JSON.parse(localStorage.getItem('favorite')!))
    console.log(favoritos)
  }, [])

  useEffect(() => {
    Mangadex.getHome().then((home) => {
      if(topMangasCategory === "Ratings") {
        setTopMangas(home.top_manga.rating)
      } else {
        setTopMangas(home.top_manga.follows)
      }
    })
  }, [topMangasCategory])

  useEffect(() => {
    Mangadex.getHome().then((home) => {
      if(topChaptersByMoments === "6h") {
        setTopChapters(home.top_chapters.six_hours)
      } else if(topChaptersByMoments === "24h") {
        setTopChapters(home.top_chapters.day)
      } else {
        setTopChapters(home.top_chapters.week)
      }
    })
  }, [topChaptersByMoments])

  function handleChangeTopMangasCategory(value:any) {
    setTopMangas([])
    setTopMangasCategory(value);
  }

  function handleChangeTopChaptersByMoments(value:any) {
    setTopChapters([])
    setTopChaptersByMoments(value);
  }

  const renderHTML = (rawHTML: string) => React.createElement(
    "div", { dangerouslySetInnerHTML: { __html: rawHTML } });

  return (
    <>
      <TopMangasRatings>
        <TextLeft>
          <h2>Latest Updates</h2>
        </TextLeft>
        <HorizontalCards>
          {latestUpdates ? latestUpdates.map(manga => (
            (manga.title) && (
              <CardHolder key={manga.manga_id}>
                <Link
                  to={routes.MANGA.replace(':id', `${manga.manga_id}`)}
                >
                  <Image
                    src={manga.cover_url}
                  />
                  <ImageTitle>{renderHTML(manga.title)}</ImageTitle>
                </Link>
              </CardHolder>
            )
          )): (
            <SkeletonTheme color="#505050" highlightColor="#444">
              <Skeleton
                style={{marginLeft: "10px"}}
                count={5}
                width={100}
                height={160} />
            </SkeletonTheme>
          )}
        </HorizontalCards>
      </TopMangasRatings>

      <TopMangasRatings>
        <TextLeft>
          <h2>Top Mangas - {topMangasCategory}</h2>
        </TextLeft>
        <select
          onChange={
            event => handleChangeTopMangasCategory(event.target.value)
          }
          value={topMangasCategory}
        >
          <option value="Ratings">Ratings</option>
          <option value="Followers">Followers</option>
        </select>
        <HorizontalCards>
          {topMangas ? topMangas.map(manga => (
            (manga.title)  && (
              <CardHolder key={manga.id}>
                <Link
                  to={routes.MANGA.replace(':id', `${manga.id}`)}
                >
                  <Image
                    src={manga.cover_url}
                  />
                  <ImageTitle>{renderHTML(manga.title)}</ImageTitle>
                </Link>
              </CardHolder>
            )
          )): (
            <SkeletonTheme color="#505050" highlightColor="#444">
              <Skeleton
                style={{marginLeft: "10px"}}
                count={5} width={100}
                height={160} />
            </SkeletonTheme>
          )}
        </HorizontalCards>
      </TopMangasRatings>

      <TopMangasRatings>
        <TextLeft>
          <h2>Top Chapters - {topChaptersByMoments}</h2>
        </TextLeft>
        <select
          onChange={
            event => handleChangeTopChaptersByMoments(event.target.value)
          }
          value={topChaptersByMoments}>
          <option value="6h">6h</option>
          <option value="24h">24h</option>
          <option value="7d">7d</option>
        </select>
        <HorizontalCards >
          {topChapters ? topChapters.map(chapter => (
            (chapter.title) && (
              <CardHolder key={chapter.id}>
                <Link
                  to={routes.CHAPTER.replace(':id',`${chapter.id}`)}
                >
                  <Image
                    src={chapter.cover_url}
                  />
                  <ImageTitle>{renderHTML(chapter.title)}</ImageTitle>
                </Link>
              </CardHolder>
            )
          )): (
            <SkeletonTheme color="#505050" highlightColor="#444">
              <Skeleton
                style={{marginLeft: "10px"}}
                count={5}
                width={100}
                height={160}>
              </Skeleton>
            </SkeletonTheme>
          )}
        </HorizontalCards>
      </TopMangasRatings>



      <TopMangasRatings>
        <TextLeft>
          <h2>Favoritos</h2>
        </TextLeft>
        <HorizontalCards >
          {(favoritos != null) && (favoritos.map(favorito => (
            <CardHolder key={favorito.id}>
            <Link
              to={routes.MANGA.replace(':id', favorito.id)}
            >
              <Image
                src={favorito.cover_url}
              />
              <ImageTitle>{renderHTML(favorito.title)}</ImageTitle>
            </Link>
          </CardHolder>
          )))}
        </HorizontalCards>
      </TopMangasRatings>
    </>
  )
}
