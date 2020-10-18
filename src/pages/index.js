/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import { Link } from 'gatsby'
import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import SEO from '../components/SEO'
import useSiteImages from '../hooks/use-site-images'
import Hero from '../components/Hero'
import useSiteMetadata from "../hooks/use-site-config"

const MainTitle = styled.h1`
  margin: 16px;
  line-height: 1.5;
  text-align: center;
  font-size: 2rem;
`

const Content = styled.span`
  display: block;
  line-height: 1.5;
  text-align: justify;
  margin-bottom: 16px;
`

const SubTitle = styled.h2`
  padding-top: 40px;
  line-height: 1.2;
  border-top: 1px solid #ececec;
  margin-bottom: 32px;
`

const NotFoundPage = props => {
  const { homepageImage, trees } = useSiteMetadata()
  const homeImage = useSiteImages(homepageImage).fluid.src
  const treesImage = useSiteImages(trees).fluid.src

  return (
      
    <Layout location={props.location} noCover={true}>
      <SEO title="Strona Główna" />
      <Hero heroImg={homeImage} treesImg={treesImage} title="Dom Seniora w Sercu Kaszub"/>
      <Wrapper>
        <MainTitle>Otwarcie pod koniec 2020 roku. Trwa nabór pensjonariuszy.</MainTitle>
        <SubTitle>Witamy na stronie domu opieki dla osób starszych Srebrny Dom.</SubTitle>

        <Content>
        Przyjmujemy osoby z dysfunkcjami ruchowymi, ale poruszające się o własnych siłach przy pomocy balkoników, lasek, kuli itp. Nie jest to ośrodek dla osób psychicznie chorych ani ośrodek hospicyjny. Tu każdy mieszkaniec odnajdzie własne miejsce i sposób na siebie. Każdy coś umie, na czymś się zna, coś lubi robić i to wszystko będzie mógł zrealizować z nami.
        </Content>
        <Content>
        Czekają na Państwa pokoje 2 i 3 osobowe, sala gimnastyczna, sala rehabilitacyjna, sauna, biblioteka z kawiarnią, jadalnia, miejsce na ognisko. Z nami możliwe jest <i>„Wesołe życie staruszka”</i> pełne wzajemnego szacunku i zrozumienia. Nasz kadra ma bogate doświadczenie w opiece nad osobami starszymi i przeszła szkolenie w zakresie Metody Montesorii.
        </Content>
        <Content>
        Zapraszamy do niczego niezobowiązującej wizyty w Swornychgaciach. <Link to="https://bit.ly/3757pWU">Dokładny adres to Jałowcowa 8, 89-608 Swornegacie</Link>
        </Content>
        <Content>
        Więcej informacji pod numerem <b>692 407 428</b> lub <a href="mailto:kontakt@srebrnydom.pl"><b>kontakt@srebrnydom.pl</b></a>
        </Content>

      </Wrapper>
    </Layout>
  )
}

export default NotFoundPage
