import { Svg, SvgProps } from '@pancakeswap/uikit'

const RibbonUpMid: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 142 48" {...props}>
      <rect width="142" height="46" fill="#FF720D" />
      <rect width="142" height="2" fill="#3B2070" />
    </Svg>
  )
}

export default RibbonUpMid
