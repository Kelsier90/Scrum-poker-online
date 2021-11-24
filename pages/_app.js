import '@styles/globals.css'
import Head from 'next/head'
import React from 'react'
import SocketContextProvider from '@src/shared/socket/SocketContextProvider'
import UserContextProvider from '@src/shared/user/UserContextProvider'
import NotificationsProvider from '@src/components/common/NotificationsProvider'
import NotificationsContainer from '@src/components/common/NotificationsProvider/NotificationsContainer'
import TransitionLayout from '@src/components/common/TransitionLayout'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Scrum Poker Online</title>
        <meta
          name="description"
          content="Live scrum poker rooms. Scrum poker is an open source web application of online planning poker for scrum teams. Create a room and start planning!"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SocketContextProvider>
        <UserContextProvider>
          <NotificationsProvider>
            <TransitionLayout>
              <Component {...pageProps} />
            </TransitionLayout>
            <NotificationsContainer />
          </NotificationsProvider>
        </UserContextProvider>
      </SocketContextProvider>
    </>
  )
}

export default MyApp
