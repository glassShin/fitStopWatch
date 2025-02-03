//record-text에 localStorage에 있는 값들을 추가

let getTime = localStorage.getItem('fitTime');
let timeArray  = getTime ? JSON.parse(getTime) : null;


if(timeArray){
  timeArray.forEach((time,index) => {
    let template = `<p>
                      <span>${time.id}</span>
                    </p>
                    <p> 
                      <span>${time.hour}</span> :
                      <span>${time.minute}</span> :
                      <span>${time.seconds}</span>
                    </p>
                    `
document.querySelector('.record-text').insertAdjacentHTML('beforeend',template);
});
}
