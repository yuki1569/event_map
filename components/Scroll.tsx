import React, { ReactElement, useEffect } from 'react';
import { useScroll } from './useScroll';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  cardWrapper: {
  overflow: 'scroll',
  margin: '40px auto 0',
  width: '100%',
  maxWidth: '100%',
},
 
cardList: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'nowrap',
  margin: '0 auto',
  maxWidth: '720px',
  width: '720px',
  
  '& > li': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    scrollSnapAlign: 'center',
    margin: '0 8px',
    height: '240px',
  },
},
}));

// -----------------------------
// Component
// -----------------------------
export const Scroll = (): ReactElement => {
 const classes = useStyles();
 const scroll = useScroll();
 
// -----------------------------
// LifeCycle
// -----------------------------
 useEffect(() => {
   scroll.setScrollPosition(scroll.getScrollWidth());
 }, [scroll]);
 return (
   <>
     <div>
       <p>
         <span>WorkPointで</span>
         <span>ポイント稼いでます！</span>
       </p>
     </div>
     <div>
    
        refのついた2つのdivとulにはstyleでwidth指定が無いとDOMで横幅を取得できないので必ず指定しておきます。
       <div ref={scroll.outerContentRef} className={classes.cardWrapper}>
         <ul ref={scroll.innerContentRef} className={classes.cardList}>
           <li>
             Listの中身が入る
           </li>
         </ul>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
         <p>ddddd</p>
       </div>
     </div>
   </>
 );
};