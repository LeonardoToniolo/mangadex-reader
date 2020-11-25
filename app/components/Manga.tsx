import Mangadex from 'mangadex-api';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import {
  BackButton,
  Container,
  Graphic,
  ImgHolder,
  Info,
  InfoCard,
  InfoCardChapters,
  SelectHolder
} from './MangaStyle'

interface MangaParams {
  id: string
}

interface ChapterInfo {
  id: number,
  lang_name: string,
  volume: string,
  chapter: string,
  title: string,
  lang_code: string,
  group_id: number,
  group_name: string,
  group_id_2?: number | null,
  group_name_2?: string | null,
  group_id_3?: number | null,
  group_name_3?: string | null,
  timestamp: number,
  comments: number | null,
}

interface MangaInfo {
  cover_url: string,
  description: string,
  title: string,
  artist: string,
  alt_names: Array<string>,
  author: string,
  status: number,
  demographic: number,
  genres: Array<{
    id: number,
    name: string,
  }>,
  last_chapter: string,
  last_volume: number,
  last_updated: number,
  lang_name: string,
  lang_flag: string,
  hentai: number,
  rating: {
    bayesian: string,
    mean: string,
    users: string
  },
  views: number,
  follows: number,
  comments: number,
  covers: Array<string>,
  status_text?: string,
}

export default function Manga() {
  const params = useParams<MangaParams>();
  const [languagesAvailable, setLanguagesAvailable] = useState<any[]>();
  const [languageSelected, setLanguageSelected] = useState("English");
  const [mangaInfo, setMangaInfo] = useState<MangaInfo>();
  const [chapterInfo, setChapterInfo] = useState<ChapterInfo[]>();



  useEffect(() => {
    api.get('/').then(home => {
      console.log(home.data.data)
    });

    api.get(`/manga/${params.id}`).then(manga => {
      // TODO:
    });

    api.get(`/manga/${params.id}/chapters`).then(chapters => {
      console.log(chapters.data.data);
    })


    Mangadex.getManga(parseInt(params.id)).then((manga) => {
      setMangaInfo(manga.manga)
      setChapterInfo(
        manga.chapter
        .filter(chap => chap.lang_name==="English")
      )

      let langs:string[] = [];
      manga.chapter.map(chap => {
        let lang_code = chap.lang_name;
        langs.push(lang_code)
      })
      const unique = langs
      .filter((value, index, self) => self.indexOf(value) === index)
      setLanguagesAvailable(unique)
    });
  }, [params.id])

  useEffect(() => {
    Mangadex.getManga(parseInt(params.id)).then((manga) => {
      setChapterInfo(
        manga.chapter.filter(chap => chap.lang_name===languageSelected)
      )
    })
  }, [languageSelected])

  function handleChangeLanguageSelected(value:any) {
    setChapterInfo([])
    setLanguageSelected(value);
  }

  function handleClickFollow() {
    const favoritos = localStorage.getItem('favorite');

    let testObject = []
    if(favoritos != null) {
      mangaInfo.id = params.id
      testObject = [...JSON.parse(favoritos), mangaInfo];
    } else {
      mangaInfo.id = params.id
      testObject = [ mangaInfo ];

    }

    localStorage.setItem('favorite', JSON.stringify(testObject));
  }
  console.log('favorite: ', JSON.parse(localStorage.getItem('favorite')!));

  const renderHTML = (rawHTML: string) => React.createElement(
    "div", { dangerouslySetInnerHTML: { __html: rawHTML } });

  return (
    <>
      <Container>
        <BackButton>
          <Link to={'/'}>
            Voltar
          </Link>
        </BackButton>


        <InfoCard>
          <ImgHolder>
            {mangaInfo ? (
              <Graphic src={mangaInfo.cover_url} alt={mangaInfo.title}/>
              ) : (
                <Skeleton count={1} width={"100%"} height={322}/>
              )}
          </ImgHolder>


          <Info>
            <h1>{mangaInfo ? mangaInfo.title : <Skeleton duration={2}/>}</h1>
            <h3>{mangaInfo ? (
              `by ${mangaInfo.author}`
            ) : (
              <Skeleton duration={2}/>
            )}</h3>
            <p>{mangaInfo ? (
              renderHTML(mangaInfo.description)
            ) : (
              <Skeleton count={10} duration={2}/>
            )}</p>
            <button type="button" onClick={handleClickFollow}>favoritar</button>
          </Info>
        </InfoCard>

        <InfoCardChapters>
          <SelectHolder>
            <select
              onChange={event =>
                handleChangeLanguageSelected(event.target.value)}
              value={languageSelected}
            >
              {languagesAvailable ? languagesAvailable.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              )) : (
                <option value="">carregando...</option>
              ) }
            </select>
          </SelectHolder>
          {chapterInfo ? chapterInfo.map(chapter =>  (
            <Link
              to={`/chapter/${chapter.id}`}
              key={chapter.id}
              style={{color: "#000"}}>
              <div
                key={chapter.id}
                style={
                  (localStorage
                  .getItem(`${params.id}-${chapter.id}`) != null) ? {
                  border:'1px solid #000',
                  height: '25px',
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  padding: '5px',
                  backgroundColor:'#d3d3d3'
                }: {
                  border:'1px solid #000',
                  height: '25px',
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  padding: '5px'
                }}
              >
                {chapter.chapter} - {chapter.title}
              </div>
            </Link>
          )): (
            <Skeleton count={10} duration={2}/>
          )}
        </InfoCardChapters>
      </Container>

    </>
  );
}
