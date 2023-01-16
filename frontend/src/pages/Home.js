import * as React from 'react';
import { useRef } from "react";

import AppFooter from '../modules/views/AppFooter';
import ProductHero from '../modules/views/ProductHero';
import ProductValues from '../modules/views/ProductValues';
import AppAppBar from '../modules/views/AppAppBar';
import withRoot from '../modules/withRoot';

import AudioApp from '../audio app/App.jsx';

function Index() {
  const audioAppRef = useRef(null)
  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const executeAudioAppRefScroll = () => audioAppRef.current.scrollIntoView();
  const executeHomeRefScroll = () => homeRef.current.scrollIntoView();
  const executeAboutRefScroll = () => aboutRef.current.scrollIntoView();
  return (
    <React.Fragment>
      <div ref={homeRef}></div>
      <AppAppBar refs={{ 'home': executeHomeRefScroll, 'audio': executeAudioAppRefScroll, 'about': executeAboutRefScroll }} />
      <ProductHero refs={{ 'audio': executeAudioAppRefScroll }} />
      <div ref={aboutRef}></div>
      <ProductValues />
      <div ref={audioAppRef}></div>
      < AudioApp />
      <AppFooter />
    </React.Fragment>
  );
}



export default withRoot(Index);
