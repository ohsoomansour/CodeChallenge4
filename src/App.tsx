import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
/*#7.0 Introduction - Framer Motion(ReactJS 애니메이션 라이브러리) ※https://www.framer.com/motion/
 1. Getting started - Introduction > 설치: npm install framer-motion
 2. <div></div> (X) >> ★<moition.div></motion.div>
 3. motion은 버전5 > create-react-app 버전4를 사용하면 에러가 발생 >> #7.1 Installation 3:15 ~ (정상작동은 #7.2이동) 
  > 버전4: 'EcmaScript module'허용X > ★Version5는 허용 ▶ √[package.json 시트] - "dependencies":{ "react-scripts":"5.0.1", }
  > 문제해결: Create React App Configuration Override 사용, 무언가를 하는데 create-react-app이 그걸 허용하지 않을 때 사용 
  > 설치: npm install @craco/craco --save > node_modules - craco.config.js 생성 - package.json 옆에 있어야 된다  
  > 해결: github 
  */
/*#7.2 Basic Animatios 
  1. 애니메이트된 스타일 컴포넌트를 어떻게 가질 수 있는지  
   const Box = styled(motion.div)``; 
   >> <Box
        transition={{ type:"spring" , stiffness:10 }} "애니메이션 초기값은 'spring(튕김)', 'tween'(깔끔하게 멈춤) "" 
        transition={{ delay: 3 }}   "3초뒤 "
        transition={{ duration: 3 }}  "천천히 3초동안 " 
        animate ={{ borderRadius: "100px" }}
      /> 
   2. transition 옵션
    *stiffness: 물리현상을 약간 시뮬레이트(단단함)  / damping: (반동: 어떤 작용에 대하여 그 반대로 작용함 )   

*/ 
/* #7.3 Variants part One
1. varients: 애니메이션의 'stage', ★Basic Animatios > 'stage'
 - const myVars = {
    start: { scale: 0 },
    end: { scale:1, rotateZ: 360, transition:{ type: "spring", delay: 0.5} }
  }; 
 - ★컴포넌트의 'prorps' >> <Box variants={myVars}/>
 - initial >> start, <Box variants={myVars} initial={myVars.start}  />
 - animate >> end,  <Box variants={myVars}  initial={myVars.start}animate="end" />\
 
  #7.4 Varieants pat Two 
 1. display: grid, grid-template-columns: repeat(2, 1fr);  " 1fr 1fr 1:1 비율  " (명시적 열의 크기 )  
  *fr(fraction, 공간 비율) 
  place-self: center; 
 2. 애니메이션 순서
  2-1) Box를 먼저 나타나게 설정, variants={boxVariants} initial="start" animate={boxVariants.end} 자식들에게 기본으로 상속
  2-2) 다음 자식들(Circle*4)이 등장 ★props자동생성: <Circle variants={boxVariants} initial="start" animate={boxVariants.end} />
  2-3) <Circle variants={circleVariants}/> 부모의 "start" "end"  그대로 받음 
  2-4) delayChildren: 0.5 "Box가 Circle의 컴포넌트를 0.5초 지연"
  2-5) staggerChildren: (진행되는일에 시차를 두다)
  2-6) x 와 y는 'Moition'의 것 그 외에는 대부분 CSS 
*/
/* # 7.4 Gestures part One - Gesture, Drag
1. Gesture 
  <Box 
    whileHover={{ scale: 1.2, rotateZ: 90 }} 
    whileTap={{ scale: 0.8, rotate: -90, borderRadius:"100%" }} 
  />
  
2. #7.5 Gestures part One - Drag 
  2-1) ※https://flatuicolors.com/palette/defo >> copy Format: RGBA -(1, 2, 3, 0.4 ) 정수 형식 
  2-2) <Box drag whileDrag={{ backgroundColor: "rgb(46, 204, 113)" }} /> 
      [검사-요소]element.style {background-color: rgb(255, 255, 255)} >> "RGBA(46, 204, 113)" } ★"rgb가 정수이기 때문에 가능"   
       
*/
/* #Gestures part Two
  1.<Box drag="x" > x축으로만 움직임 
  2. dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}  "드래깅이 허용될 수 있는 영역인 Box를 만든다 "
  3-1)const biggerBoxeRef = useRef<HTMLDivElement>(null); 객체를 만듬
  3-2) 선택하고 싶은 DOM에 속성으로  ref값을 설정: <BiggerBox ref={biggerBoxeRef} > biggerBoxRef.current    
   <Box dragConstraints={biggerBoxeRef} /> "biggerbox 의 가장자리까지 라고 설정 "
 */

/* #7.7MotionValues part One
1. <Box style={{ x:x }} />  "style의 x좌표가 바뀔 때마다, 이 MotionValue 역시 업데이트 될거다"
2. const x = useMotionValue(0); 
 > ★본문:"It can be updated with the set method. This won't trigger a React re-render."
 > React Rendering Cycle(렌더링 싸이클)을 발동시키지 않는다: ReactJS State(상태)로 살지 앟는다는 거다 state가 아니다  \
 > MotionValue가 바뀌어도 내 컴포넌트는 다시 랜더링되지는 않는다 *이유: 컴포넌트를 값이 바뀐다고 매번 다시 랜더링하고 싶지는 않다 
 > console.log(x) 한 번만 랜더링 ▶MotionValue { current: 0 }

3.useEffect(function, deps) >> ★useEffect(function, []) 
 *function: 수행하고자 하는 작업, deps: 배열형태, 배열 안에는 검사하고자 하는 특정값 or 빈 배열 
 >useEffect(() => {x.onChange((e) => x.get() )}, [x]) 

 #7.8 MotionValues part Two
 1.<transformation> 
    x: -800 => scale: 2
    x: -400 => scale: 1.5 
    x:    0 => scale: 1
    x:  400 => scale: 0.5 
    x: +800 => scale: 0.1
2. const potato = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);  "input:[-800, 0, 800] >> output:[2, 1, 0.1] 전달받고싶다 "
 > potato를 State와 연결
 #7.9 MotinoValues part Three
  1.linear-gradient: 기본적으로 선형 그레디언트는 위에서 아래로  진행 but 방향을 지정함으로써 그레디언트를 회전 
   - 90deg: 왼쪽에서 오른쪽 

  2.API - Motion Value - Utilities - ★useViewportScroll: 스크롤의 MotionValue를 넘겨줌(state가 아님, 리랜더링X)
   > Returns MotionValues that update when the viewport scrolls:
  - scrollY — Vertical scroll distance in pixels  
  - scrollYProgress: Vertical scroll progress between 0 and 1
  ★const {scrollY, scrollYProgress} = useViewportScroll();
    useEffect(() => {
      scrollY.onChange((e) => {console.log(scrollY.get(), scrollYProgress.get() )})  
    }, [scrollY, scrollYProgress]) 
   
*/   
/*#7.10 SVG Animation - ※https://fontawesome.com/
1. airbnb 검색  > ★< /> 복사 (svg,path제외 라이센스 부분 삭제 )
2. <path fill="black" > 색깔을 설정
  pathLength는 현재 우리 위치까지의  path의 길이를 나타냄
3. end: {
    pathLength:1,
    fill: "rgba(255, 255, 255, 1)",
    transition: { duration:5 },   
  }, 
  pathLength 0 -> 1, fill의 opacity 0 -> 1 둘다  5초 걸림
★(특정property에 duration을 줌)path를 다 그리고 fill 하는거 
  <motion.path
    variants={svg}
    initial= {svg.start}
    animate="end"
    transition={{
      default: { duration: 5} ,
      fill: {duration:2 , delay: 5 }  "5초뒤 2초지속 화이트로 채움"
    }}
  />    
*/
/*#️⃣7.11 AnimatePresence
  1. React js App에서 사라지는 component를 'animate' 한다
  2.*position:absoulute; 부모 요소를 기준으로 배치
  3.box-shadow: [h-offset] [v-offset] [blur] [spread] [color] (inset);
    - h-offset: 그림자의 좌우 위치 설정
    - v-offset: 그림자의 상하 위치 설정
    - blur: 그림자의 흐려짐 정도의 범위
    - spread: 그림자의 크기
    - color: 그림자 색상
    - inset: (optional) 요소 내부에 그림자 표현, 기본적으로 그림자는 요소 외부에 위치

  ⭐4. <AnimatePresence>
        {showing? <Box variants={ boxVariants } initial="initial" animate="visible" exit= "leaving" /> : null }
      ⭐exit는 element가 사라질 때 어떤 animation을 발생시킬 지를 정하는 것 
        AnimatePresence >> exit="leaving" 참조      
      </AnimatePresence>
*/
/*#7.13 Slide part One
 1. react.js의 각 element(Box 1~10)는 'key'를 가져야 한다
  > 슬라이드 모션 > react.js는 element가 가버리고 새 element가 생겼다고 생각
  >'element'의 'key'를 바꿔주는 것만으로 React.js는 element가 사라졌다고 생각'
  > 'key'를 바꾸면 component가 사라지고 AnimatePresence가 'exit' animation을 실행한다 
  > 'key'를 바꾸면 React.js는 component를 re-render해준다 > initial, animate, exit 세가지의 animation이 모두 실행된다 
2. ★방향추가(3:50 ~): √prev버튼 > 다른방향
  > custom: variants에 데이터를 보낼 수 있게 해주는 property다 
  > variant를 object를 return하는 function으로 바꿔 야 한다 
3. const [back, setBack] = useState(false); 우리는 하나의 'state'가 있고 false 또는 true를 가지고 있다( next로 가는지 prev로 가는지에 따라 )
  > 우리는 'entry'와 'exit'를 바꿀 수 있다 
  > variant를 'function'으로 바꿔야 한다  
    const variants = {
      visible: (custom) => ({
      opacity: 1,
      transition: { delay: custom * 0.2 }
      })
    }
  4. <AnimatePresence exitBeforeEnter >
  >원래는 1번이 exit하고 2번이 바로옴 
  >★exitBeforeEnter: 'exit'을 실행하고 끝나면 다음 element(Box)가 올 수 있게 하는 거다
  > 예시) 1번 박스가 완전 exit 하면 2번 박스가 올 수 있다 
*/

/* 🥇Code Challenge 4🥇
    🔹Use layoutId
    🔹Use AnimatePresence
    🔹Use varaints
#️⃣7.14 You Need to Watch This
  1. align-items: flex-start;  아이템들을 시작점으로 정렬합니다.
  2. element의 'layout'(props)을 주면  그 element의 layout이 바뀔 때 알아서 animate가 돼 
    > Framer Motion은 무언가 외부의 힘(style 또는 CSS는 state에 의해 바뀜)에 의해 바뀐 것을 감지한다
    > function App() {
      const [clicked, setClicked] = useState(false);
      const toggleClicked = () => setClicked((prev) => !prev);
      return (  
      <Wrapper onClick={toggleClicked} >      
        <Box
          style={{
            justifyContent: clicked? "center" : "flex-start",
            alignItems: clicked ? "center" : "flex-start", 
          }}
        >
          <Circle layout />   
        </Box >
      </Wrapper>
      );
    };
  3.  Framer에게  <Circle />(=UI 컴포넌트) 두 개는 같은 component 이다 "아래의 코드 작성시 알아서 animation을 만들어줌" 
   <Box>
      {!clicked? <Circle layoutId="circle" /> : null }   
    </Box >
    <Box>
      {clicked? <Circle layoutId="circle" /> : null }     
    </Box > 
*/
/*#️⃣7.15 Final Project part One ※grid: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
  1.<CSS>  vw(=viewport weight) 뷰포트 너비의 %, 1vw = 1%
           position: absolute;  부모요소를 기준으로 배치 

*/
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));  
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  width: 50vw;
  gap: 15px;
  position:relative;
  
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  height: 300px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  position:relativ;
  display:flex;
  justify-content:center;
  align-items:center;
;
`;
const Circle = styled(motion.div)`
  width:50px;
  height:50px;
  border-radius:50px;  
  background-color:white;
  position:absolute;
  
`
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute; 
  display:flex;
  justify-content: center;
  align-items: center; 
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [clicked, setClicked] = useState(false)
  const toggleMode = () => setClicked((current) => !current)
  return (  
  <Wrapper>
      <Grid>
        <Box key="1" onClick={() => setId("1")} layoutId={"1"}   whileHover={{ scale: 1.05 }}></Box>
        <Box key="2" onClick={() => setId("2")} layoutId={"2"}  whileHover={{ scale: 1.05 }}>
          {!clicked ? <Circle  layoutId="circle" /> : null}
        </Box>
        <Box key="3" onClick={() => setId("3")} layoutId={"3"} whileHover={{ scale: 1.05 }}>
          {clicked ? <Circle layoutId="circle" /> : null}
        </Box>
        <Box key="4" onClick={() => setId("4")} layoutId={"4"}  whileHover={{ scale: 1.05 }}></Box>    
        
        <button onClick={toggleMode} >Switch</button>
      </Grid>
      <AnimatePresence>
        {id ? (
        <Overlay
          variants={overlay}
          onClick={() => setId(null)}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Box 
            layoutId={id} 
            style={{ 
              width: 500, 
              height: 300,
              backgroundColor:"white",
            }}
              
            >
          </Box>
        </Overlay>
          
        ) : null}
      </AnimatePresence>
    </Wrapper>
    
  );
};

export default App;