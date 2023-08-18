import { useTranslation } from '@pancakeswap/localization'
import {
  EarnIcon,
  GovernanceIcon,
  InsertChartOutlinedIcon,
  NftIcon,
  PoolIcon,
  StoreIcon,
  SwapIcon,
  Text,
  TrophyIcon,
} from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { cloneElement, useMemo, useRef, useLayoutEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import styled from 'styled-components'

import { Partner1Inch, PartnerBinance, PartnerLedger, PartnerMetaMask } from './PartnerLogos'

const MARQUEE_WIDTH = 210

export const usePartnerData = () => {
  return useMemo(() => {
    return [
      { icon: <PartnerBinance />, width: 92 },
      { icon: <Partner1Inch />, width: 72 },
      { icon: <PartnerLedger />, width: 60 },
      { icon: <PartnerMetaMask />, width: 86 },
    ]
  }, [])
}

export const useEcosystemTagData = () => {
  const { t } = useTranslation()
  return useMemo(() => {
    return [
      { icon: <PoolIcon />, text: t('Staking') },
      { icon: <EarnIcon />, text: t('Farming') },
      { icon: <SwapIcon />, text: t('Trade') },
      { icon: <NftIcon />, text: t('NFT') },
      {
        icon: <InsertChartOutlinedIcon />,
        text: t('Liquidity Provision'),
      },
      {
        icon: <TrophyIcon />,
        text: t('Game'),
      },
      { icon: <GovernanceIcon />, text: t('Governance') },
      { icon: <StoreIcon />, text: t('IFO') },
    ]
  }, [t])
}

export const EcoSystemTagOuterWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 10px;
  }
`

export const FeatureTagsWrapper = styled(Marquee)`
  position: relative;
  width: ${MARQUEE_WIDTH}px;
  border-radius: 12px;
  mask-image: linear-gradient(to left, transparent, black 80px, black calc(100% - 80px), transparent);
  ${({ theme }) => theme.mediaQueries.lg} {
    height: ${MARQUEE_WIDTH}px !important;
    width: ${MARQUEE_WIDTH}px !important;
  }
  overflow: hidden;
`

export const PartnerTagOuterWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 40px;
  }
`

export const PartnerTagsWrapper = styled(Marquee)`
  position: relative;
  width: ${MARQUEE_WIDTH}px;
  border-radius: 12px;
  mask-image: linear-gradient(to left, transparent, black 80px, black calc(100% - 80px), transparent);
  ${({ theme }) => theme.mediaQueries.lg} {
    height: ${MARQUEE_WIDTH}px !important;
    width: ${MARQUEE_WIDTH}px !important;
    mask-image: none;
  }
  overflow: hidden;
`

export const FeatureTag = styled.div<{ $bgWidth: number }>`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: 0px 2px 0px 0px ${({ theme }) => theme.colors.cardBorder};
  box-sizing: border-box;
  height: 40px;
  flex-grow: 0;
  width: fit-content;
  margin-bottom: 21px;
  margin-right: 16px;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 0px;
    margin-right: 0px;
    width: 52px;
    white-space: nowrap;
    background: none;
    position: relative;
    left: -${({ $bgWidth }) => (MARQUEE_WIDTH - $bgWidth) / 2}px;
    border: none;
    background: none;
    box-shadow: none;
    &::before {
      z-index: -1;
      content: attr(data-content);
      height: 100%;
      position: absolute;
      top: 0;
      width: ${({ $bgWidth }) => $bgWidth}px;
      border-radius: 24px;
      border: 1px solid ${({ theme }) => theme.colors.cardBorder};
      background: ${({ theme }) => theme.colors.backgroundAlt};
      box-shadow: 0px 2px 0px 0px ${({ theme }) => theme.colors.cardBorder};
    }
  }
`

export const CakePartnerWrapper = styled.div<{ $bgWidth: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 8px 16px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: 0px 2px 0px 0px ${({ theme }) => theme.colors.cardBorder};
  margin-right: 16px;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 0px;
    margin-right: 0px;
    width: 52px;
    white-space: nowrap;
    position: relative;
    left: -${({ $bgWidth }) => (MARQUEE_WIDTH - $bgWidth) / 2}px;
    border: none;
    background: none;
    box-shadow: none;
    &::before {
      z-index: -1;
      content: attr(data-content);
      height: 100%;
      position: absolute;
      top: 0;
      width: ${({ $bgWidth }) => $bgWidth}px;
      border-radius: 24px;
      border: 1px solid ${({ theme }) => theme.colors.cardBorder};
      background: ${({ theme }) => theme.colors.backgroundAlt};
      box-shadow: 0px 2px 0px 0px ${({ theme }) => theme.colors.cardBorder};
    }
  }
`

export const CakeSectionTag: React.FC<{ icon: React.ReactElement; text: string }> = ({ icon, text }) => {
  const { theme } = useTheme()
  const textRef = useRef<HTMLDivElement>()
  useLayoutEffect(() => {
    if (textRef?.current) {
      setBgWidth(textRef.current.offsetWidth)
    }
  }, [])
  const [bgWidth, setBgWidth] = useState(() => textRef?.current?.offsetWidth ?? 0)
  return (
    <FeatureTag $bgWidth={bgWidth + 54}>
      {cloneElement(icon, { color: theme.isDark ? '#A881FC' : theme.colors.secondary })}
      <Text fontWeight="600" ref={textRef}>
        {text}
      </Text>
    </FeatureTag>
  )
}

export const CakePartnerTag: React.FC<{
  icon: React.ReactElement
  width: number
}> = ({ icon, width }) => {
  const { theme } = useTheme()
  return (
    <CakePartnerWrapper $bgWidth={width + 50}>
      {cloneElement(icon, { color: theme.isDark ? 'white' : 'black', width })}
    </CakePartnerWrapper>
  )
}
