import { PageWrapper } from 'app/components/PageWrapper';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeSwitch } from './Features/ThemeSwitch';
import { ImageWrapper } from './ImageWrapper';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="FaceSystems Portal homepage" />
      </Helmet>
      <PageWrapper>
        <ThemeSwitch />
        <ImageWrapper src="photos.svg" />
        <ImageWrapper src="upload.svg" />
        <ImageWrapper src="album.svg" />
        <ImageWrapper src="credit_card.svg" />
        <ImageWrapper src="detection.svg" />
        <ImageWrapper src="celebration.svg" />
      </PageWrapper>
    </>
  );
}
