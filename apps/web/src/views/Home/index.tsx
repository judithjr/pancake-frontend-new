import { useTranslation } from '@pancakeswap/localization'
import { Box, Flex, PageSection, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { styled } from 'styled-components'
import MultipleBanner from './components/Banners/MultipleBanner'
import CakeDataRow from './components/CakeDataRow'
import CakeSection from './components/CakeSection'
import CommunitySection from './components/CommunitySection'
import { RightTopBox } from './components/CommunitySection/ImagesOnBg'
import EcoSystemSection from './components/EcoSystemSection'
import Footer from './components/Footer'
import Hero from './components/Hero'
import MetricsSection from './components/MetricsSection'
import { NewsSection } from './components/NewsSection'
import {
  InnerWedgeWrapper,
  OuterWedgeWrapper,
  WedgeBottomRight,
  WedgeTopLeft,
  WedgeTopRight,
} from './components/WedgeSvgs'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const Home: React.FC<React.PropsWithChildren> = () => {
  const { theme } = useTheme()
  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px', padding: '0px 16px' }
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  return (
    <Box style={{ width: isMobile ? '100vw' : 'calc(100vw - 8px)', overflow: 'hidden', boxSizing: 'border-box' }}>
      <style jsx global>
        {`
          #home-1 .page-bg {
            background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0%, #191326 100%);
          }
          [data-theme='dark'] #home-1 .page-bg {
            background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0%, #191326 100%);
          }
          #home-2 .page-bg {
            background: linear-gradient(180deg, #09070c 22%, #201335 100%);
          }
          [data-theme='dark'] #home-2 .page-bg {
            background: linear-gradient(180deg, #09070c 22%, #201335 100%);
          }
          #home-3 .page-bg {
            background: linear-gradient(180deg, #0b4576 0%, #091115 100%);
          }
          [data-theme='dark'] #home-3 .page-bg {
            background: linear-gradient(180deg, #0b4576 0%, #091115 100%);
          }
          #home-4 .inner-wedge svg {
            fill: #201335;
          }
          [data-theme='dark'] #home-4 .inner-wedge svg {
            fill: #201335;
          }

          #bottom-wedge4-2 svg {
            fill: #0b4576;
          }
          [data-theme='dark'] #bottom-wedge4-2 svg {
            fill: #0b4576;
          }
        `}
      </style>
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%', overflow: 'visible', padding: '16px' } }}
        containerProps={{
          id: 'home-1',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <MultipleBanner />
        <Hero />
      </StyledHeroSection>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home-2',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <MetricsSection />
      </PageSection>
      <PageSection
        innerProps={{ style: { ...HomeSectionContainerStyles, maxWidth: 'auto' } }}
        background={theme.colors.background}
        containerProps={{
          id: 'home-4',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <OuterWedgeWrapper>
          <InnerWedgeWrapper top>
            <WedgeTopLeft />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
        <EcoSystemSection />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.background}
        containerProps={{
          id: 'home4-2',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <OuterWedgeWrapper>
          <InnerWedgeWrapper width="150%" top>
            <WedgeTopRight />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
        
        
        <OuterWedgeWrapper>
          <InnerWedgeWrapper id="bottom-wedge4-2">
            <WedgeBottomRight />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        containerProps={{
          id: 'home-3',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <RightTopBox />
        <CommunitySection />
      </PageSection>
    
     
    </Box>
  )
}

export default Home
