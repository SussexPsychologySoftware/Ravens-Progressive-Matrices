const stimIds = ['a11','a24','a28','a36','a43','a48','a49','a53','a55','b10','b16','b21','b30','b34','b44','b50','b52','b57']
let data = []
let trialN = 0;

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function attachListeners(){
    function clickListener(e){
        data.push({pattern: stimIds[trialN], selectedStim: e.target.id})
        console.log(data)
        runNextTrial()
    }
    const targets = document.getElementById('targetsGrid').children
    for(let i=0; i<targets.length; i++){
        targets[i].addEventListener('click', clickListener)
    }
}

async function runNextTrial(){
    if(trialN > stimIds.length-1) {
        displayData()   
        return
    }
    const stimId = stimIds[trialN]
    const imageStub = 'img/' + stimId 
    document.getElementById('pattern').src = imageStub + '.png'
    const targets = document.getElementById('targetsGrid').children
    console.log(targets)
    for(let i=0; i<targets.length; i++){
        targets[i].src = imageStub + '_' + (i+1) + '.png'
    }
    trialN++
}

function displayData(){
    document.getElementById('stim').hidden = true
    document.getElementById('dataDisplay').innerText = JSON.stringify(data, null, "\t")
}

shuffle(stimIds)
attachListeners()
runNextTrial()

