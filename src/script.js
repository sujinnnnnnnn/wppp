// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
export { convertToDiscussion , render, setList } 
require("./style.css")
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const {id,createdAt,title,url,author,answer,bodyHTML,avatarUrl} = obj 

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
 //사진
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const img = document.createElement("img")
  img.setAttribute("class","discussion__avatar--image");
  img.setAttribute("src",avatarUrl);
  avatarWrapper.append(img);
  
  //제목
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const h2 = document.createElement("h2")
  h2.setAttribute("class","discussion__title")
  const title1 = document.createElement("a")
  title1.setAttribute("href",url)
  title1.innerText = title
  h2.append(title1)
  discussionContent.append(h2)

  //id , 올린날짜
  const idDiv = document.createElement("div");
  idDiv.setAttribute("class","discussion__information");
  idDiv.innerText = `${author} / ${createdAt}`
  discussionContent.append(idDiv);

  //
  const discussionAnswered = document.createElement("div");
  const answerBox = document.createElement("p")
  discussionAnswered.className = "discussion__answered";
 if(answer === null){
  answerBox.innerHTML = `<i class="fa-sharp fa-solid fa-check"></i>`
 }else{
  answerBox.innerHTML = `<i class="fa-sharp fa-solid fa-xmark"></i>`
 };
 discussionAnswered.append(answerBox)

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
//사진

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

let currentPage = 1
const rows_per_page = 7

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const pageBtn = document.querySelector(".pagenation")
const ul = document.querySelector('ul.discussions__container')

const render = (element) => { // fetch로 받아온 데이터들 그려줌
  element.innerHTML = "" //더블렌더링 어류잡기

    const pagenated = allData.slice(rows_per_page * (currentPage-1),currentPage*rows_per_page)
    // const pagenated = allData.slice(30,38)
    setuppagination(allData,rows_per_page)
    
  for (let i = 0; i < pagenated.length; i += 1) {
    element.append(convertToDiscussion(pagenated[i]));
  }
  return;
};

function setuppagination(items,per_page){ //i는 페이지
  const pageUl = document.querySelector(".pagenation")
  pageUl.innerHTML = ""
  let page_count = Math.ceil(items.length / per_page)
  for(let i = 1 ; i <= page_count; i++){
      let btn = paginationButton(i)
      btn.setAttribute("page-index", i)
      pageUl.appendChild(btn)
  }
  
}
function paginationButton(page){
  let button = document.createElement("button"); //버튼 만들어서
  button.setAttribute("class","divided")
  button.innerText = page // 버튼안에 페이지 번호 넣고 
  // if(currentPage === page) button.classList.add("active") //현재 페이지만 효과 넣기 
  return button
}
function handleActivePageNumber(){
  document.querySelectorAll(".divided").forEach(button=>{
    // button.classList.remove("active")
    const pageIndex = Number(button.innerText)
    if(pageIndex === currentPage){
      button.classList.add("active")
    }
  })
}
function nextPreviousNum(e){
  const curr = e.target.closest(".divided")
  console.log(allData);
  if(!curr){
    return ;
  }

}
pageBtn.addEventListener('click',(e)=>{
  console.log(nextPreviousNum(e));
  const currentNum = Number(e.target.closest(".divided").innerText)
  
  if(!currentNum){
    return;
  };
  currentPage = currentNum
  console.log(currentPage);
  setList()
})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
let allData // 상태 담는 역할?
function setList() {
  fetch('http://localhost:4000/discussions').then(el=>el.json()).then(el=>{
    const my__questions = "myQnA"
   let localData = JSON.parse(localStorage.getItem(my__questions));
    console.log(localData);
    if(!localData) {
      allData = el
    }else{
      allData =  [...localData,...el]
      // setCurrentPage()
    }  
  render(ul)
  handleActivePageNumber()
  })
}
// 왜 안에서만 되고 밖에선 이 데이터가 사라지는지
setList()
