import { RefObject, useRef } from 'react';

// -----------------------------
// interface
// -----------------------------
export type IuseScrollProps = {
 outerContentRef: RefObject<HTMLDivElement>;
 innerContentRef: RefObject<HTMLUListElement>;
 setScrollPosition: (position: number) => void;
 getScrollWidth: () => number;
};

// -----------------------------
// hooks
// -----------------------------
export const useScroll = (): IuseScrollProps => {
 const innerContentRef = useRef<HTMLUListElement>(null);
 const outerContentRef = useRef<HTMLDivElement>(null);

 /**
  * 画面初期化時にスライドの位置を変更する
  */
 const setScrollPosition = (position: number): void => {
   const outerRef = outerContentRef.current;
   if (outerRef) {
     outerRef.scrollLeft = position;
   }
 };

 /**
  * 現在の要素の横幅を取得してセンターのスクロール位置を取得する
  */
 const getScrollWidth = (): number => {
   const innerRef = innerContentRef.current;
   const outerRef = outerContentRef.current;

   if (innerRef && outerRef) {
     const innerWidth = innerRef.offsetWidth;
     const outerWidth = outerRef.offsetWidth;
     return (innerWidth - outerWidth) / 2;
   }
   return 0;
 };

 return { innerContentRef, outerContentRef, setScrollPosition, getScrollWidth };
};