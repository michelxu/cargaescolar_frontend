import React from 'react'
import Layout from '../components/Layout'
import Assignments from './Assignments'
import DrawerTab from '../components/DrawerTab'

const Home = () => {
  return (
    <>

    <Layout>
      <DrawerTab>
        <Assignments />
      </DrawerTab>
    </Layout>
    </>
  )
}

export default Home