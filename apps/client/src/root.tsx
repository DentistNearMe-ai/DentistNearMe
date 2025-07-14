import { FlowbiteProvider, FlowbiteProviderHeader } from 'flowbite-qwik';

import { component$, isDev } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import './global.css';
import { usePostHog } from './lib/analytics';

export default component$(() => {

  usePostHog()

  return (
    <QwikCityProvider>
      <head>
  

        <meta charset="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <FlowbiteProviderHeader />
        <RouterHead />
      </head>
      <body lang="en">
        <FlowbiteProvider theme="blue" toastPosition="top-right">
          <RouterOutlet />
        </FlowbiteProvider>
      </body>
    </QwikCityProvider>
  );
});
