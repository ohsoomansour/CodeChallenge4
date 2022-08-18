/*
#6.8 Multi Boards  
  2.toDos boardId는 Typescript에 의하면 'string'이 아니다!
    >> 타입스크립트가 봤을땐 to_do, doing, done 3가지 선택지 밖에 없다 
    >> 좀 더 확장성을 주기위해  toDoState가 뭔지 알려줌 하지만 우리는 나중에 user들이 직접 board를 추가하게 할 수도 있으니까
    >> [atom.tsx] stete는 string으로써의 property와, string array로 이루어져있다  */

import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key:string] : ITodo[]; 
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: { 
    "to_do": [],
    Doing: [],
    Done: [],
  }
});

