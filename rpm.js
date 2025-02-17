//https://github.com/RealityBending/JSmisc/tree/main/tasks/RPM

const jsPsych = initJsPsych({
    on_finish: function() {
      jsPsych.data.displayData();
    }
});

function constructTimelineVariables(){
    const stim = [
        {id:'a11', n:6},
        {id:'a24', n:6},
        {id:'a28', n:8},
        {id:'a36', n:8},
        {id:'a43', n:8},
        {id:'a48', n:8},
        {id:'a49', n:8},
        {id:'a53', n:8},
        {id:'a55', n:8},
        {id:'b10', n:6},
        {id:'b16', n:6},
        {id:'b21', n:6},
        {id:'b30', n:8},
        {id:'b34', n:8},
        {id:'b44', n:8},
        {id:'b50', n:8},
        {id:'b52', n:8},
        {id:'b57', n:8}
    ]
    // turn into object expected by js
    const urlStub = 'https://raw.githubusercontent.com/nivlab/jspsych-demos/main/tasks/rpm/img/'
    let timelineVars = []
    for (let t=0; t<stim.length; t++){
        const trialUrlStub = urlStub + stim[t].id
        const patternElement = `<img src=${trialUrlStub}.png></img>`
        const trialVars = {pattern: patternElement, choices: []}
        for (let s=1; s<=stim[t].n; s++){
            const preloadImage = new Image(100, 200);
            preloadImage.src = `${trialUrlStub}_${s}.png`;
            trialVars.choices.push(`<img src=${trialUrlStub}_${s}.png></img>`)
        }
        timelineVars.push(trialVars)
    }
    return timelineVars
}

// Recommend also doing image preloading with jsPsychPreload
// https://github.com/jspsych/jsPsych/discussions/1690
const trial = {
    type: jsPsychHtmlButtonResponse,
    prompt: '<p>Which option completes the pattern?</p><span id="clock" style="color: red" hidden>00:30</span>',
    stimulus: jsPsych.timelineVariable('pattern'),
    choices: jsPsych.timelineVariable('choices'),
    grid_columns: 3,
    button_html: (choice) => `<button class="jspsych-btn" style="border: none">${choice}</button>`,
    trial_duration: .5 * 60 * 1000,
    on_load: function(){
        var wait_time = .5 * 60 * 1000; // in milliseconds
        var start_time = performance.now();
        var interval = setInterval(function(){
            //calc time left
          var time_left = wait_time - (performance.now() - start_time);
          var minutes = Math.floor(time_left / 1000 / 60);
          var seconds = Math.floor((time_left - minutes*1000*60)/1000);
          var seconds_str = seconds.toString().padStart(2,'0');
          document.getElementById('clock').innerHTML = minutes + ':' + seconds_str
          console.log(seconds)
          if(seconds === 5){
            document.getElementById('clock').hidden = false;
          } else if(time_left <= 0){
            document.getElementById('clock').innerHTML = "0:00"
            clearInterval(interval);
            document.getElementById('clock').hidden = true;
          }
        }, 250)
      }
};

const stimIds = constructTimelineVariables()
const test_procedure = {
    timeline: [trial],
    timeline_variables: stimIds,
    randomize_order: true
}

const timeline = [];
timeline.push(test_procedure);
jsPsych.run(timeline);