const datas = { bau: 0, cua: 0, tom: 0, ca: 0, huou: 0, ga: 0};
let rolling = false;

document.querySelectorAll('.data').forEach(data => {
     data.addEventListener('click', () => {
        if (rolling) return;
        const dataType = data.getAttribute('data-bet');
        const dataRoll = Object.values(datas).reduce((acc, val) => acc + val, 0);
        if(dataRoll < 3 && datas[dataType] < 3){
            datas[dataType]++;
            data.querySelector('.count').textContent = datas[dataType];
        }
    });
 });
document.getElementById('roll-id').addEventListener('click', startRolling);

function startRolling(){
    if(rolling) return;
    rolling = true;
    const images = ['bau', 'cua', 'tom', 'ca', 'huou', 'ga'];
    const imgs = [document.getElementById('img1'),document.getElementById('img2'),document.getElementById('img3')];
    const interval = setInterval(() =>{
        for(let i =0;i< imgs.length;i++){
            const result = images[Math.floor(Math.random() * images.length)];
            imgs[i].innerHTML = `<img src="./img/${result}.png" alt="${result}">` 
        }
    },100);

    setTimeout(()=>{
        clearInterval(interval);
        for (let i = 0; i < imgs.length; i++) {
            const result = images[Math.floor(Math.random() * images.length)];
            imgs[i].innerHTML = `<img src="./img/${result}.png" alt="${result}">`;
            rolling = false;
            enableControls();
        }
    },4000)
    disableControls();
};
 function disableControls(){
    document.querySelectorAll('.data').forEach(data =>{
         data.style.pointerEvents = 'none';
    });
    document.getElementById('roll-id').disabled = true;
    document.getElementById('btn-reset').disabled = true;
 }

 function enableControls(){
    document.querySelectorAll('.data').forEach(data =>{
        data.style.pointerEvents = 'auto';
    });
    document.getElementById('roll-id').disabled = false;
    document.getElementById('btn-reset').disabled = false;
 }

 function reset(){
    Object.keys(datas).forEach(data => datas[data] = 0);
    document.querySelectorAll('.count').forEach(count =>count.textContent = '0');
 }