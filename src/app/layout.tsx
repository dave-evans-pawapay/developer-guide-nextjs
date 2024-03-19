import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from "@/components/navbar/navbar";
import {MsisdnContextProvider} from "@/context/mno.context";
import React from "react";
const inter = Inter({ subsets: ['latin'] })
import Provider from "@/app/context/client-provider"
import { getServerSession } from "next-auth/next"
import {authOptions} from "@/pages/api/auth/[...nextauth]";
export const metadata: Metadata = {
  title: 'pawaPay nextjs sandbox - Home'
}

export default async function RootLayout ({ children }: {
  children: React.ReactNode
}){
  const session = await getServerSession(authOptions)
    if (session && session.user.email && session.user.email.indexOf('@pawapay') <= 0) {
        return (
            <div className="flex flex-col content-center flex-wrap text-gray-800">
                <h1>Unauthorized</h1>
                <p>You are not authorized to access this page</p>
            </div>
        )
    }
  return (
      <html lang="en">
      <body className={inter.className}>
      <Provider session={session}>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a href="https://pawapay.io/" className="flex items-center">
                  <img src="https://global-uploads.webflow.com/62824591015aa314fd308df1/6411b26596e3de3f52551c00_Logopawapay-p-500.png"
                       className="logo" alt="pawaPay Logo" />
              </a>
              <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                  </svg>
              </button>
              <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                  <NavBar></NavBar>
              </div>
          </div>
      </nav>

          <MsisdnContextProvider>
              {children}
          </MsisdnContextProvider>
      </Provider>
      </body>
      </html>
  )
}


