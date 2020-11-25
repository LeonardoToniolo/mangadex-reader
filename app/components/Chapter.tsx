import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BackButton, Container } from './ChapterStyle'
import ImageSlider from './ImageSlider';
import api from '../services/api';

interface ChapterParams {
  id: string
}

interface ChapterInfo {
  id: number,
  hash: string,
  mangaId: number,
  mangaTitle: string,
  volume: string,
  chapter: string,
  title: string,
  language: string,
  groups: Array<{
    id: number,
    name: string,
  }>,
  timestamp: number,
  comments: number,
  status: string,
  pages: Array<string>,
  server: string,
  serverFallback: string,
}

export default function Chapter() {
  const params = useParams<ChapterParams>();
  const [chapterInfos, setChapterInfos] = useState<ChapterInfo>()
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    api.get(`/chapter/${params.id}`).then(chapters => {
      setChapterInfos(chapters.data.data)
      let imagesArray: string[] = []
      let hash = chapters.data.data.hash
      let server = chapters.data.data.server
      chapters.data.data.pages.map((image: string)=> {
        imagesArray.push(`${server}${hash}/${image}`)
      })
      setImages(imagesArray)
    });
  }, [params.id]);

  return (
    <Container>

      <BackButton>
        <Link to={`/manga/${chapterInfos?.mangaId}`}>
          Voltar
        </Link>
      </BackButton>

      {chapterInfos && (
        images && (
          <ImageSlider
            images={images}
            chapterId={chapterInfos.id}
            mangaId={chapterInfos.mangaId}
          />
        )
      )}
    </Container>
  );
}
