import styled from 'styled-components'

const AboutWrapper = styled.div`
  width: 60%;
  margin: 20px auto;
  height: 100vh;
`
const Title = styled.div`
  font-size: 30px;
  width: 200px;
  text-align: center;
  margin: 20px auto;
  color: #5e5e5e;
`
const AboutContent = styled.div`
  font-size: 16px;
  color: #b4b4b4;
`
export default function About() {
  return (
    <>
      <AboutWrapper>
        <Title>About</Title>
        <AboutContent>
          メタモンのうた「モンモンメタモン」
          <br />
          <br />
          うちの近くの牧場に だれかがあずけた　メタモン <br />
          大きなものから小さなものまで なんでもへんしん　メタモン <br />
          ある日いないと思ったら 小石に化けてた　メタモン <br />
          ちょっぴりへんしん下手くそで いろいろバレバレ　メタモン <br />
          メタメタモンモン メタメタモンモン メタメタメタメタ　モンモン
          <br />
          うちの近くの牧場に 今日も変わらず　メタモン ちょっと性格　変わりモン
          <br />
          笑うとへんしん解けちゃうもん ある日２匹のメタモンが
          <br />
          バトルでへんしん使ったら あっちもこっちもメタモンで
          <br />
          いろいろグダグダ　メタモン メタメタモンモン メタメタモンモン
          <br />
          メタメタメタメタ　モンモン うちの近くの牧場に ずっとぽつんと　メタモン
          <br />
          ポッポになっても上手に飛べない なかなかうまく　いかないもん
          <br />
          ある日たくさん友達できた だけどもやっぱり　メタモン
          <br />
          あいつもこいつもメタモンで いろいろメタメタ　メタモン メタメタモンモン
          <br />
          メタメタモンモン メタメタメタメタ　モンモン メタメタモンモン
          <br />
          メタメタモンモン メタメタメタメタ　モンモン
          <br />
        </AboutContent>
      </AboutWrapper>
    </>
  )
}
