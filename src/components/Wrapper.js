import styled from 'styled-components'
import { colors } from '../tokens'

const Wrapper = styled.main.attrs({
  role: 'main',
})`
  position: relative;
  border-radius: 5px;
  max-width: 720px;
  word-wrap: break-word;
  background-color: ${colors.backgroundArticle};
  margin: 0px auto 0px auto;
  top: 8px;
  padding: 60px 0px 80px 0px;

  @media (max-width: 780px) {
    width: 100%;
    padding: 25px;
  }
`

export default Wrapper
