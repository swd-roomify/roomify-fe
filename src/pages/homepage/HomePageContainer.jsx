import About from '@/components/homepageComponents/about'
import Feature from '@/components/homepageComponents/feature'
import { Contact } from 'lucide-react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const HomePageContainer = () => {
  return (
    <>
        <section id="about">
        <About />
      </section>
      <section id="features">
        <Feature />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  )
}

export default HomePageContainer