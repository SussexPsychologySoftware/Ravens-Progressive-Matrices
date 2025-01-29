//
const jsPsych = initJsPsych({
    on_finish: function() {
      jsPsych.data.displayData();
    }
  });

const timeline = [];
const urlStub = 'https://raw.githubusercontent.com/nivlab/jspsych-demos/main/tasks/rpm/img/'

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
    let timelineVars = []
    for (let t=0; t<stim.length; t++){
        const trialUrlStub = urlStub + stim[t].id
        const patternElement = `<img src=${trialUrlStub}.png></img>`
        const trialVars = {pattern: patternElement, choices: []}
        for (let s=1; s<=stim[t].n; s++){
            trialVars.choices.push(`<img src=${trialUrlStub}_${s}.png alt=""></img>`)
        }
        timelineVars.push(trialVars)
    }
    return timelineVars
}

const stimIds = constructTimelineVariables()
console.log(stimIds)
// Recommend also doing image preloading, e.g.:
// var preload = {
//     type: jsPsychPreload,
//     images: ['img/blue.png', 'img/orange.png']
//   };

const trial = {
    type: jsPsychHtmlButtonResponse,
    prompt: "<p>Which option completes the pattern?</p>",
    stimulus: jsPsych.timelineVariable('pattern'),
    choices: jsPsych.timelineVariable('choices'),
    grid_columns: 3
};

var test_procedure = {
    timeline: [trial],
    timeline_variables: stimIds,
    randomize_order: true
}

timeline.push(test_procedure);
jsPsych.run(timeline);