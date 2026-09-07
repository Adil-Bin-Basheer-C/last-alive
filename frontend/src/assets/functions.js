export function randomWord(){
    let char="ABCDEFGHIJLMOPQSTUVWXYZ123456789"
    word=""
    for(let i=0;i<3;i++){
        word=word+chars[Math.floor(Math.random()*char.length)]
      }
  }