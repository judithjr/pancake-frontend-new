import { useTranslation } from '@pancakeswap/localization'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  HelpIcon,
  Link,
  Message,
  MessageText,
  RocketIcon,
  Text,
  useMatchBreakpoints,
  useTooltip,
} from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Image from 'next/legacy/image'
import NextLink from 'next/link'
import { styled, useTheme } from 'styled-components'
import { useAccount } from 'wagmi'
import useBCakeProxyBalance from '../../../../hooks/useBCakeProxyBalance'
import boosterCardImage from '../../../../images/boosterCardImage.png'
import { useBCakeBoostLimitAndLockInfo } from '../../hooks/bCakeV3/useBCakeV3Info'

export const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 296px;
    margin-left: 50px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
  }
`
export const ImageWrapper = styled.div`
  position: absolute;
  top: -50px;
  transform: translateY(-50%) scale(75%);
  right: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    right: auto;
    top: 50%;
    left: -70px;
    transform: translateY(-50%);
  }
  z-index: 2;
`
const StyledCardBody = styled(CardBody)`
  border-bottom: none;
`
const StyledCardFooter = styled(CardFooter)`
  border-top: none;
  position: relative;
  padding: 8px 24px 16px;
  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: calc(100% - 48px);
    top: 0px;
    left: 24px;
    background-color: ${({ theme }) => theme.colors.cardBorder};
  }
`

export const BCakeProxyCakeBalanceCard = () => {
  const { t } = useTranslation()
  const { bCakeProxyBalance, bCakeProxyDisplayBalance, isLoading } = useBCakeProxyBalance()
  return !isLoading && bCakeProxyBalance > 0 ? (
    <Message marginBottom="8px" variant="warning">
      <MessageText>
        {t(
          'There is %amount% PATTIE in the proxy booster contract. In order to harvest that amount you should withdraw, deposit or harvest one of the boosted farms.',
          { amount: bCakeProxyDisplayBalance },
        )}
      </MessageText>
    </Message>
  ) : null
}

export const useBCakeTooltipContent = () => {
  const { t } = useTranslation()
  const tooltipContent = (
    <>
      <Box mb="20px">
        {t(
          'Yield Boosters allow you to boost your farming yields by locking PATTIE in the fixed-term staking PATTIE pool. The more PATTIE you lock, and the longer you lock them, the higher the boost you will receive.',
        )}
      </Box>
     
    </>
  )
  return tooltipContent
}

export const BCakeBoosterCard = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { isMobile } = useMatchBreakpoints()

  const tooltipContent = useBCakeTooltipContent()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, {
    placement: 'bottom-start',
    ...(isMobile && { hideTimeout: 1500 }),
  })
  return (
    <CardWrapper>
    
      <Card p="0px" style={{ zIndex: 1 }}>
        <StyledCardBody style={{ padding: '15px 24px' }}>
          <RocketIcon />
          <Text fontSize={22} bold color="text" marginBottom="-12px" display="inline-block" ml="7px">
            {t('Yield Booster')}
          </Text>
          {tooltipVisible && tooltip}
          <Box ref={targetRef} style={{ float: 'right', position: 'relative', top: '6px' }}>
            <HelpIcon color={theme.colors.textSubtle} />
          </Box>
        </StyledCardBody>
        <StyledCardFooter>
          <BCakeProxyCakeBalanceCard />
          <CardContent />
        </StyledCardFooter>
      </Card>
    </CardWrapper>
  )
}

const CardContent: React.FC = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { locked, isLockEnd, remainingCounts, maxBoostLimit } = useBCakeBoostLimitAndLockInfo()
  const theme = useTheme()

  if (!account)
    return (
      <Box>
        <Text color="textSubtle" fontSize={12} bold>
          {t('Connect wallet to view booster')}
        </Text>
        <Text color="textSubtle" fontSize={12} mb="16px">
          {t('An active fixed-term PATTIE staking position is required for activating farm yield boosters.')}
        </Text>
        <ConnectWalletButton width="100%" style={{ backgroundColor: theme.colors.textSubtle }} />
      </Box>
    )
  if (!locked)
    return (
      <Box width="100%">
        <Text color="textSubtle" fontSize={12} bold>
          {t('No PATTIE locked')}
        </Text>
        <Text color="textSubtle" fontSize={12} mb="16px">
          {t('An active fixed-term PATTIE staking position is required for activating farm yield boosters.')}
        </Text>
        <NextLink href="/pools" passHref>
          <Button width="100%" style={{ backgroundColor: theme.colors.textSubtle }}>
            {t('Go to Pool')}
          </Button>
        </NextLink>
      </Box>
    )
  if (isLockEnd)
    return (
      <Box>
        <Text color="textSubtle" fontSize={12} bold>
          {t('Locked staking is ended')}
        </Text>
        <Text color="textSubtle" fontSize={12} mb="16px">
          {t('An active fixed-term PATTIEstaking position is required for activating farm yield boosters.')}
        </Text>
        <NextLink href="/pools" passHref>
          <Button width="100%" style={{ backgroundColor: theme.colors.textSubtle }}>
            {t('Go to Pool')}
          </Button>
        </NextLink>
      </Box>
    )
  if (remainingCounts > 0)
    return (
      <Box>
        <Flex justifyContent="space-between" alignItems="center" mb="5px">
          <Text color="secondary" fontSize={12} bold textTransform="uppercase">
            {t('Available Yield Booster')}
          </Text>
          <Text color="secondary" fontSize={16} bold textTransform="uppercase">
            {remainingCounts}/{maxBoostLimit}
          </Text>
        </Flex>

        <Text color="textSubtle" fontSize={12}>
          {t('You will be able to activate the yield booster on an additional %num% farm(s).', {
            num: remainingCounts,
          })}
        </Text>
      </Box>
    )
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text color="secondary" fontSize={12} bold textTransform="uppercase">
          {t('Available Yield Booster')}
        </Text>
        <Text color="secondary" fontSize={12} bold textTransform="uppercase">
          0
        </Text>
      </Flex>

      <Text color="textSubtle" fontSize={12}>
        {t('To activate yield boosters on additional farms, unset yield boosters on some currently boosted farms.')}
      </Text>
    </Box>
  )
}
