import styled, { keyframes } from 'styled-components'
import { ReactComponent as DittoSvg } from '../../icons/ditto.svg'

const loadingAnimation = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.6);
  }

  from {
    fill: #e3adff;
  }

  to {
    fill: white;
  }
`

const Ditto = styled(DittoSvg)`
  width: 80px;
  height: 80px;
  animation: ${loadingAnimation} 0.5s linear infinite alternate;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
`
const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: 'rgba(0, 0, 0, 0.6)';
`
export default function Loading() {
  return (
    <Mask>
      <Ditto />
    </Mask>
  )
}
