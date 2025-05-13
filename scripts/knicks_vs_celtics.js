import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Key is missing. Make sure .env.local is configured correctly.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const channelId = 28; // Knicks vs Celtics Channel
const userId = '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e'; // Admin user

// Team IDs: Knicks: 7, Celtics: 8, Neutral: 33
const events = [
  // Q1
  { msg: "🏀 Tip-off! Knicks vs Celtics is underway!", hl: { title: 'Game Start', game_time: 'Q1 12:00', type: 'jump-ball', team_id: 33 }, score: [0, 0] },
  { msg: "Jayson Tatum strikes first for the Celtics with a mid-range jumper!", hl: { title: 'Tatum Opens Scoring', game_time: 'Q1 11:35', type: 'jump-shot', team_id: 2 }, score: [0, 2] }, // Celtics
  { msg: "Jalen Brunson answers for the Knicks with a driving layup!", hl: { title: 'Brunson Layup', game_time: 'Q1 11:10', type: 'layup', team_id: 6 }, score: [2, 2] }, // Knicks
  { msg: "Jaylen Brown drains a three-pointer! Celtics lead.", hl: { title: 'Brown Three', game_time: 'Q1 10:40', type: 'three-pointer', team_id: 2 }, score: [2, 5] }, // Celtics
  { msg: "Offensive foul on the Knicks. Turnover.", hl: { title: 'Knicks Offensive Foul', game_time: 'Q1 10:05', type: 'foul', team_id: 6 }, score: [2, 5] }, // Knicks
  { msg: "Kristaps Porziņģis with a block for Boston!", hl: { title: 'Porziņģis Block', game_time: 'Q1 9:22', type: 'block', team_id: 2 }, score: [2, 5] }, // Celtics
  { msg: "Timeout Knicks.", hl: { title: 'Timeout Knicks', game_time: 'Q1 8:50', type: 'timeout', team_id: 6 }, score: [2, 5] }, // Knicks
  { msg: "Julius Randle hits a tough fadeaway for New York!", hl: { title: 'Randle Fadeaway', game_time: 'Q1 8:15', type: 'jump-shot', team_id: 6 }, score: [4, 5] }, // Knicks
  { msg: "Derrick White sinks two free throws for the Celtics.", hl: { title: 'White Free Throws', game_time: 'Q1 6:58', type: 'free-throw', team_id: 2 }, score: [4, 7] }, // Celtics
  { msg: "End of Q1. Celtics up slightly.", hl: { title: 'End Q1', game_time: 'Q1 0:00', type: 'period-end', team_id: 33 }, score: [4, 7] },

  // Q2
  { msg: "Second quarter begins!", hl: { title: 'Q2 Start', game_time: 'Q2 12:00', type: 'period-start', team_id: 33 }, score: [4, 7] },
  { msg: "Brunson nails a three-pointer to tie the game!", hl: { title: 'Brunson Ties It', game_time: 'Q2 11:25', type: 'three-pointer', team_id: 6 }, score: [7, 7] }, // Knicks
  { msg: "Tatum responds with a powerful dunk!", hl: { title: 'Tatum Dunk', game_time: 'Q2 10:50', type: 'dunk', team_id: 2 }, score: [7, 9] }, // Celtics
  { msg: "Donte DiVincenzo adds a three for the Knicks! Back and forth!", hl: { title: 'DiVincenzo Three', game_time: 'Q2 10:11', type: 'three-pointer', team_id: 6 }, score: [10, 9] }, // Knicks
  { msg: "Timeout Celtics.", hl: { title: 'Celtics Timeout', game_time: 'Q2 9:40', type: 'timeout', team_id: 2 }, score: [10, 9] }, // Celtics
  { msg: "Jaylen Brown muscles in for a layup.", hl: { title: 'Brown Layup', game_time: 'Q2 9:03', type: 'layup', team_id: 2 }, score: [10, 11] }, // Celtics
  { msg: "Randle fouled, makes 1 of 2 free throws.", hl: { title: 'Randle Free Throw', game_time: 'Q2 7:55', type: 'free-throw', team_id: 6 }, score: [11, 11] }, // Knicks
  { msg: "Porziņģis hits a hook shot over the defense.", hl: { title: 'Porziņģis Hook Shot', game_time: 'Q2 6:48', type: 'jump-shot', team_id: 2 }, score: [11, 13] }, // Celtics
  { msg: "Brunson with a steal and fast break score!", hl: { title: 'Brunson Steal & Score', game_time: 'Q2 5:12', type: 'layup', team_id: 6 }, score: [13, 13] }, // Knicks
  { msg: "Tatum drills a three just before the buzzer!", hl: { title: 'Tatum Buzzer Beater 3', game_time: 'Q2 0:02', type: 'buzzer-beater', team_id: 2 }, score: [13, 16] }, // Celtics
  { msg: "Halftime: Celtics lead the Knicks 16-13.", hl: { title: 'Halftime', game_time: 'Q2 0:00', type: 'period-end', team_id: 33 }, score: [13, 16] },

  // Q3
  { msg: "Third quarter underway!", hl: { title: 'Q3 Start', game_time: 'Q3 12:00', type: 'period-start', team_id: 33 }, score: [13, 16] },
  { msg: "Randle starts the half with a strong layup.", hl: { title: 'Randle Q3 Layup', game_time: 'Q3 11:38', type: 'layup', team_id: 6 }, score: [15, 16] }, // Knicks
  { msg: "Tatum finds Brown for an alley-oop slam!", hl: { title: 'Celtics Alley-Oop', game_time: 'Q3 11:05', type: 'dunk', team_id: 2 }, score: [15, 18] }, // Celtics
  { msg: "Brunson fouled on a three-point attempt. Makes all three!", hl: { title: 'Brunson 3 FTs', game_time: 'Q3 10:15', type: 'free-throw', team_id: 6 }, score: [18, 18] }, // Knicks
  { msg: "Derrick White quiets the crowd with a three.", hl: { title: 'White Three', game_time: 'Q3 9:40', type: 'three-pointer', team_id: 2 }, score: [18, 21] }, // Celtics
  { msg: "Timeout Knicks.", hl: { title: 'Knicks Q3 Timeout', game_time: 'Q3 8:55', type: 'timeout', team_id: 6 }, score: [18, 21] }, // Knicks
  { msg: "Josh Hart hustles for a putback layup!", hl: { title: 'Hart Putback', game_time: 'Q3 8:01', type: 'layup', team_id: 6 }, score: [20, 21] }, // Knicks
  { msg: "Tatum scores again, tough jumper.", hl: { title: 'Tatum Jumper', game_time: 'Q3 7:10', type: 'jump-shot', team_id: 2 }, score: [20, 23] }, // Celtics
  { msg: "Turnover Celtics, Knicks ball.", hl: { title: 'Celtics Turnover', game_time: 'Q3 5:50', type: 'turnover', team_id: 2 }, score: [20, 23] }, // Celtics turnover
  { msg: "Randle powers through for an and-one!", hl: { title: 'Randle And-One', game_time: 'Q3 5:20', type: 'and-one', team_id: 6 }, score: [22, 23] }, // Knicks
  { msg: "Randle converts the free throw. Knicks lead!", hl: { title: 'Randle And-One FT', game_time: 'Q3 5:18', type: 'free-throw', team_id: 6 }, score: [23, 23] }, // Knicks (Score updated after FT) -> Let's correct score here [23, 23]
  // Correcting the score progression: And-one makes it 22-23, FT makes it 23-23. Let's add another event.
  { msg: "Brown quickly answers with a layup.", hl: { title: 'Brown Quick Layup', game_time: 'Q3 4:50', type: 'layup', team_id: 2 }, score: [23, 25] }, // Celtics
  { msg: "End of Q3. Celtics retake the lead, 25-23.", hl: { title: 'End Q3', game_time: 'Q3 0:00', type: 'period-end', team_id: 33 }, score: [23, 25] },


  // Q4
  { msg: "Final quarter starts!", hl: { title: 'Q4 Start', game_time: 'Q4 12:00', type: 'period-start', team_id: 33 }, score: [23, 25] },
  { msg: "Brunson ties it up with a floater!", hl: { title: 'Brunson Floater', game_time: 'Q4 11:33', type: 'jump-shot', team_id: 6 }, score: [25, 25] }, // Knicks
  { msg: "Tatum drains a crucial three-pointer!", hl: { title: 'Tatum Clutch Three', game_time: 'Q4 10:58', type: 'three-pointer', team_id: 2 }, score: [25, 28] }, // Celtics
  { msg: "Knicks turnover leads to a Celtics fast break dunk by Brown!", hl: { title: 'Brown Fast Break Dunk', game_time: 'Q4 10:15', type: 'dunk', team_id: 2 }, score: [25, 30] }, // Celtics
  { msg: "Timeout Knicks. Need to stop the bleeding.", hl: { title: 'Knicks Q4 Timeout', game_time: 'Q4 9:50', type: 'timeout', team_id: 6 }, score: [25, 30] }, // Knicks
  { msg: "Randle hits one free throw.", hl: { title: 'Randle FT', game_time: 'Q4 8:40', type: 'free-throw', team_id: 6 }, score: [26, 30] }, // Knicks
  { msg: "Porziņģis answers with a jump shot.", hl: { title: 'Porziņģis Jumper', game_time: 'Q4 7:50', type: 'jump-shot', team_id: 2 }, score: [26, 32] }, // Celtics
  { msg: "Brunson refuses to quit! Another three!", hl: { title: 'Brunson Deep Three', game_time: 'Q4 5:10', type: 'three-pointer', team_id: 6 }, score: [29, 32] }, // Knicks
  { msg: "White hits a dagger three for the Celtics!", hl: { title: 'White Dagger Three', game_time: 'Q4 2:30', type: 'three-pointer', team_id: 2 }, score: [29, 35] }, // Celtics
  { msg: "Knicks miss a contested layup.", hl: { title: 'Knicks Missed Layup', game_time: 'Q4 0:45', type: 'missed-shot', team_id: 6 }, score: [29, 35] }, // Knicks miss
  { msg: "Celtics dribble it out! Boston wins!", hl: { title: 'Game End - Celtics Win', game_time: 'Q4 0:00', type: 'game-end', team_id: 2 }, score: [29, 35] } // Celtics win
];


let i = 0;
const delays = [5000, 8000, 10000]; // Intervals of 5, 8, and 10 seconds
let currentDelayIndex = 0;

const runSimulation = async () => {

  if (i >= events.length) {
    console.log('✅ Simulation complete.');
    return;
  }

  const { msg, hl, score } = events[i];

  try {
    // Insert highlight
    await supabase.from('highlights').insert({
      title: hl.title,
      description: msg,
      game_time: hl.game_time,
      highlight_type: hl.type,
      channel_id: channelId,
      created_by: userId,
      team_id: hl.team_id
    });

    // Update channel state
    await supabase.from('channels').update({
      score_home: score[0], // Knicks score
      score_away: score[1], // Celtics score
      game_period: hl.game_time.split(' ')[0],
      time_remaining: hl.game_time.split(' ')[1],
      game_status: (hl.type === 'game-end') ? 'COMPLETED' : 'LIVE' // Set completed on final event
    }).eq('id', channelId);


    console.log(`🔁 Inserted (${i + 1}/${events.length}): ${msg} | Score (NYK-BOS): ${score[0]}-${score[1]}`);
  } catch (error) {
    console.error("Error interacting with Supabase:", error);
  }

  i++;

  if (i < events.length) {
    const delay = delays[currentDelayIndex];
    currentDelayIndex = (currentDelayIndex + 1) % delays.length;
    setTimeout(runSimulation, delay);
  } else {
    console.log('✅ All simulation events have been processed.');
    // Final status update might be redundant if done within the loop on game-end type
     if (events[events.length-1].hl.type !== 'game-end') {
        await supabase.from('channels').update({
           game_status: 'COMPLETED',
         }).eq('id', channelId);
     }
  }
};

console.log("🚀 Starting Knicks vs Celtics game simulation...");
try {
    await supabase.from('channels').update({
        game_status: 'LIVE',
        score_home: 0, // Reset scores at start
        score_away: 0,
        game_period: 'Q1',
        time_remaining: '12:00'
        }).eq('id', channelId);
    console.log('✅ Game status updated to LIVE.');
} catch (error) {
    console.error("Error updating game status:", error);
}

runSimulation();