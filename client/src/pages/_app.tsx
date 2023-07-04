import React from 'react';
import dynamic from 'next/dynamic';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '../utils/axios.util';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import '../styles/globals.scss';

import { store } from '@/redux/app/store';

const Main = dynamic(() => import('../components/layouts/main/main.component'));

const MyApp = ({ Component, pageProps }: AppProps) =>
{
    return (
        <Provider store={ store }>
            <Main>
                <Component { ...pageProps }/>
            </Main>
        </Provider>
    );
};

export default MyApp;
