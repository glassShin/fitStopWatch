const hourSpan = document.querySelector('.fit-time p span:nth-child(1)');
const minuteSpan = document.querySelector('.fit-time p span:nth-child(2)');
const secondSpan = document.querySelector('.fit-time p span:nth-child(3)');

let setId = 0;
let hour = 0;
let minute = 0;
let seconds = 0;
let timer;

//setInterval, clearInterval,textContnet 블로그 파서 정리하기
//깃허브 올리기

// 25/02/01
/*-현재까지 문제점 (v 표시는 해결된 문제)
  
  -start버튼을 누를때 setInterval이 중복으로 적용되는 문제(v)
  -stop을 눌렀을때 localStorage에 값이 덮어씌워지고 있는 문제(v)
  -새로고침시 초기화 되는 문제(v)
  -localStorage에서 값을 꺼낼시 중복으로 꺼내지는 문제 발생(v)
*/

/*-추가적인 보완 상황들
  
  - 휴식 시간을 정해서 하는 기록하는 기능
  - 배경색상(다크테마)
*/


function startRecord(){
    seconds += 1;
      //초 
      if(seconds < 10){
        secondSpan.innerHTML= "0" + seconds;
      }else if(seconds == 60){
        seconds = 0;
        minute += 1
        secondSpan.innerHTML = "00";
      }else{
        secondSpan.innerHTML = seconds;
      }
      
      // 분
      if(minute < 10){
        minuteSpan.innerHTML = "0"+minute;
      }else if(minute == 60){
        minute = 0;
        hour += 1;
        minuteSpan.innerHTML = "00";
      }else{
        minuteSpan.innerHTML = minute;
      }
    
      //시간
      if(hour < 10){
        hourSpan.innerHTML = "0"+hour;
      }else{
        hourSpan.innerHTML = hour;
      }
}


document.querySelector('#stop').classList.add('hide');

//시작버튼
document.querySelector('#start').addEventListener('click',function(){
  //버튼을 클릭하면 우선적으로 setInterval을 삭제
  //그러므로 여러번 버튼을 눌러도 기존에 있던 setInterval이 삭제 되므로 중복 실행 해결
  // clearInterval(timer);
  timer = setInterval(startRecord,1000)

  document.querySelector('#start').classList.add('hide');
  document.querySelector('#stop').classList.remove('hide');
})




//정지버튼
document.querySelector('#stop').addEventListener('click',function(){

  clearInterval(timer)

  //localStorage에 넣기 위한 객체 생성
  let Record = {id:setId+=1, hour:hour, minute:minute, seconds:seconds};

  
  //localStorage에서 꺼냄
  let getLocalStorageRecord = localStorage.getItem('fitTime')

  // getLocalStorageRecord가 존재하면 배열 형태로 변환, 없으면 빈 배열 생성
  let recordArray = getLocalStorageRecord ? JSON.parse(getLocalStorageRecord) : [];
  console.log(recordArray)
  let recordOrder = recordArray.findIndex( order => order.id == setId);


  // console.log(recordArray)
  //findIndex는 값이 존재하지 않을시 -1 반환
  if(recordOrder == -1){
    recordArray.push(Record);
  }


localStorage.setItem('fitTime', JSON.stringify(recordArray))


  // 화면에 기록을 렌더링
  if(recordArray){
    document.querySelector('.record-text-left').innerHTML = '';
    document.querySelector('.record-text-right').innerHTML = '';
    recordArray.forEach((time,i) => {
        
      let template1 = 
         `<div>
              <p>
                <span>${recordArray[i].id}</span>
              </p>
            </div> `;

        let template2 = `
                    <div>
                        <p>
                          <span>${recordArray[i].hour < 10 ? '0'+recordArray[i].hour : recordArray[i].hour}</span> :
                          <span>${recordArray[i].minute < 10 ? '0'+recordArray[i].minute : recordArray[i].minute}</span> :
                          <span>${recordArray[i].seconds < 10 ? '0'+recordArray[i].seconds : recordArray[i].seconds}</span>
                        </p>
                      </div>
                        `

                        
      console.log(recordArray[i].id)                  
    document.querySelector('.record-text-left').insertAdjacentHTML('beforeend',template1);

    document.querySelector('.record-text-right').insertAdjacentHTML('beforeend',template2);

    });
  }
  
  
  document.querySelector('#stop').classList.add('hide');
  document.querySelector('#start').classList.remove('hide');

})


//클리어 버튼
document.querySelector('#clear').addEventListener('click',function(){
  clearInterval(timer)
  localStorage.clear();
  
  hour = 0;
  minute = 0;
  seconds = 0; 
  setId = 0;


  hourSpan.innerHTML = "0" + hour;
  minuteSpan.innerHTML = "0" + minute;
  secondSpan.innerHTML = "0" + seconds;

  document.querySelector('#stop').classList.add('hide');
  document.querySelector('#start').classList.remove('hide');
  
  document.querySelector('.record-text-left').innerHTML = '';
  document.querySelector('.record-text-right').innerHTML = '';
  console.log(hour, minute, seconds);

})



//화면 새로고침 시에도 기록이 남게 함
window.onload = function(){
  let getLocalStorageRecord = localStorage.getItem('fitTime');
  let recordArray = getLocalStorageRecord ? JSON.parse(getLocalStorageRecord) : [];

  setId = recordArray[recordArray.length-1].id;
  console.log(setId)
  if(recordArray.length > 0){
    
    recordArray.forEach((recordTime,i) => {
        let template1 = `
                    <div>
                        <p>
                          <span>${recordArray[i].id}</span>
                        </p>
                    </div>
                        `;
    
      let template2 = `<div> 
                        <p>
                          <span>${recordArray[i].hour < 10 ? '0'+recordArray[i].hour : recordArray[i].hour}</span> :
                          <span>${recordArray[i].minute < 10 ? '0'+recordArray[i].minute : recordArray[i].minute}</span> :
                          <span>${recordArray[i].seconds < 10 ? '0'+recordArray[i].seconds : recordArray[i].seconds}</span>
                        </p>
                      </div>  `



    document.querySelector('.record-text-left').insertAdjacentHTML('beforeend',template1);
    document.querySelector('.record-text-right').insertAdjacentHTML('beforeend',template2);

    
    });
  }
}

