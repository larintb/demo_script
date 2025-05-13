import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Key is missing. Make sure .env.local is configured correctly.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const channelId = 25; // Cavs vs Pacers Channel
const userId = '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e'; // Admin user

// Team IDs: Pacers: 5, Cavaliers: 6, Neutral: 33
const events = [
  // Q1
  { msg: "🏀 We're underway! Cavaliers vs Pacers!", hl: { title: 'Game Start', game_time: 'Q1 12:00', type: 'jump-ball', team_id: 33 }, score: [0, 0] }, // Score: Cavs-Pacers
  { msg: "Tyrese Haliburton gets the Pacers on the board first with a floater.", hl: { title: 'Haliburton Floater', game_time: 'Q1 11:40', type: 'jump-shot', team_id: 12 }, score: [0, 2] }, // Pacers
  { msg: "Donovan Mitchell answers quickly for the Cavs!", hl: { title: 'Mitchell Layup', game_time: 'Q1 11:15', type: 'layup', team_id: 10 }, score: [2, 2] }, // Cavs
  { msg: "Myles Turner with a rejection for Indiana!", hl: { title: 'Turner Block', game_time: 'Q1 10:30', type: 'block', team_id: 12 }, score: [2, 2] }, // Pacers
  { msg: "Darius Garland hits a three! Cavs lead.", hl: { title: 'Garland Three', game_time: 'Q1 9:55', type: 'three-pointer', team_id: 10 }, score: [5, 2] }, // Cavs
  { msg: "Pascal Siakam scores inside for the Pacers.", hl: { title: 'Siakam Layup', game_time: 'Q1 9:10', type: 'layup', team_id: 12 }, score: [5, 4] }, // Pacers
  { msg: "Timeout Cavaliers.", hl: { title: 'Timeout Cavaliers', game_time: 'Q1 8:45', type: 'timeout', team_id: 10 }, score: [5, 4] }, // Cavs
  { msg: "Evan Mobley with a nice hook shot for Cleveland.", hl: { title: 'Mobley Hook Shot', game_time: 'Q1 8:00', type: 'jump-shot', team_id: 10 }, score: [7, 4] }, // Cavs
  { msg: "Foul on the Cavs, Pacers ball.", hl: { title: 'Cavs Foul', game_time: 'Q1 7:12', type: 'foul', team_id: 10 }, score: [7, 4] }, // Cavs
  { msg: "Bennedict Mathurin sinks two free throws.", hl: { title: 'Mathurin Free Throws', game_time: 'Q1 6:40', type: 'free-throw', team_id: 12 }, score: [7, 6] }, // Pacers
  { msg: "End of Q1, tight contest.", hl: { title: 'End Q1', game_time: 'Q1 0:00', type: 'period-end', team_id: 33 }, score: [7, 6] },

  // Q2
  { msg: "Start of the second quarter.", hl: { title: 'Q2 Start', game_time: 'Q2 12:00', type: 'period-start', team_id: 33 }, score: [7, 6] },
  { msg: "Max Strus connects from deep for the Cavaliers!", hl: { title: 'Strus Three', game_time: 'Q2 11:30', type: 'three-pointer', team_id: 10 }, score: [10, 6] }, // Cavs
  { msg: "Haliburton finds Turner for an easy dunk.", hl: { title: 'Turner Dunk', game_time: 'Q2 10:50', type: 'dunk', team_id: 12 }, score: [10, 8] }, // Pacers
  { msg: "Mitchell with a crafty steal and layup.", hl: { title: 'Mitchell Steal & Layup', game_time: 'Q2 10:05', type: 'layup', team_id: 10 }, score: [12, 8] }, // Cavs
  { msg: "Timeout Pacers.", hl: { title: 'Timeout Pacers', game_time: 'Q2 9:33', type: 'timeout', team_id: 12 }, score: [12, 8] }, // Pacers
  { msg: "Siakam scores again, fighting through contact.", hl: { title: 'Siakam Tough Score', game_time: 'Q2 8:50', type: 'layup', team_id: 12 }, score: [12, 10] }, // Pacers
  { msg: "Jarrett Allen with a putback slam for the Cavs!", hl: { title: 'Allen Putback Dunk', game_time: 'Q2 7:40', type: 'dunk', team_id: 10 }, score: [14, 10] }, // Cavs
  { msg: "Haliburton sinks another three-pointer!", hl: { title: 'Haliburton Three', game_time: 'Q2 6:22', type: 'three-pointer', team_id: 12 }, score: [14, 13] }, // Pacers
  { msg: "Garland responds with a floater in the lane.", hl: { title: 'Garland Floater', game_time: 'Q2 5:15', type: 'jump-shot', team_id: 10 }, score: [16, 13] }, // Cavs
  { msg: "Pacers miss at the buzzer.", hl: { title: 'Pacers Miss', game_time: 'Q2 0:01', type: 'missed-shot', team_id: 12 }, score: [16, 13] }, // Pacers miss
  { msg: "Halftime: Cavaliers lead the Pacers 16-13.", hl: { title: 'Halftime', game_time: 'Q2 0:00', type: 'period-end', team_id: 33 }, score: [16, 13] },

  // Q3
  { msg: "Third quarter starts now!", hl: { title: 'Q3 Start', game_time: 'Q3 12:00', type: 'period-start', team_id: 33 }, score: [16, 13] },
  { msg: "Mitchell opens the half with a three!", hl: { title: 'Mitchell Q3 Three', game_time: 'Q3 11:35', type: 'three-pointer', team_id: 10 }, score: [19, 13] }, // Cavs
  { msg: "Siakam fouled, makes both free throws.", hl: { title: 'Siakam Free Throws', game_time: 'Q3 10:50', type: 'free-throw', team_id: 12 }, score: [19, 15] }, // Pacers
  { msg: "Mobley gets an easy basket inside.", hl: { title: 'Mobley Layup', game_time: 'Q3 10:10', type: 'layup', team_id: 10 }, score: [21, 15] }, // Cavs
  { msg: "Haliburton finds Mathurin for three!", hl: { title: 'Mathurin Three', game_time: 'Q3 9:20', type: 'three-pointer', team_id: 12 }, score: [21, 18] }, // Pacers
  { msg: "Timeout Cavaliers.", hl: { title: 'Cavs Q3 Timeout', game_time: 'Q3 8:40', type: 'timeout', team_id: 10 }, score: [21, 18] }, // Cavs
  { msg: "Garland hits a tough step-back jumper.", hl: { title: 'Garland Step-back', game_time: 'Q3 7:55', type: 'jump-shot', team_id: 10 }, score: [23, 18] }, // Cavs
  { msg: "Turner scores over Allen.", hl: { title: 'Turner Jumper', game_time: 'Q3 6:40', type: 'jump-shot', team_id: 12 }, score: [23, 20] }, // Pacers
  { msg: "Mitchell drives and kicks to Strus for three!", hl: { title: 'Strus Corner Three', game_time: 'Q3 5:10', type: 'three-pointer', team_id: 10 }, score: [26, 20] }, // Cavs
  { msg: "Pacers called for a travel. Turnover.", hl: { title: 'Pacers Travel', game_time: 'Q3 3:50', type: 'turnover', team_id: 12 }, score: [26, 20] }, // Pacers turnover
  { msg: "End of Q3. Cavs extend their lead.", hl: { title: 'End Q3', game_time: 'Q3 0:00', type: 'period-end', team_id: 33 }, score: [26, 20] },

  // Q4
  { msg: "Fourth quarter time!", hl: { title: 'Q4 Start', game_time: 'Q4 12:00', type: 'period-start', team_id: 33 }, score: [26, 20] },
  { msg: "Haliburton starts the quarter with a layup.", hl: { title: 'Haliburton Q4 Layup', game_time: 'Q4 11:38', type: 'layup', team_id: 12 }, score: [26, 22] }, // Pacers
  { msg: "Mitchell answers right back with a jumper.", hl: { title: 'Mitchell Jumper', game_time: 'Q4 11:05', type: 'jump-shot', team_id: 10 }, score: [28, 22] }, // Cavs
  { msg: "Siakam scores and draws the foul!", hl: { title: 'Siakam And-One', game_time: 'Q4 10:11', type: 'and-one', team_id: 12 }, score: [28, 24] }, // Pacers
  { msg: "Siakam completes the 3-point play.", hl: { title: 'Siakam And-One FT', game_time: 'Q4 10:09', type: 'free-throw', team_id: 12 }, score: [28, 25] }, // Pacers
  { msg: "Timeout Cavaliers.", hl: { title: 'Cavs Q4 Timeout', game_time: 'Q4 9:45', type: 'timeout', team_id: 10 }, score: [28, 25] }, // Cavs
  { msg: "Garland finds Allen for a dunk.", hl: { title: 'Allen Dunk', game_time: 'Q4 8:50', type: 'dunk', team_id: 10 }, score: [30, 25] }, // Cavs
  { msg: "Mathurin hits a clutch three for the Pacers!", hl: { title: 'Mathurin Clutch Three', game_time: 'Q4 6:20', type: 'three-pointer', team_id: 12 }, score: [30, 28] }, // Pacers
  { msg: "Mitchell takes over! Driving layup!", hl: { title: 'Mitchell Clutch Layup', game_time: 'Q4 4:30', type: 'layup', team_id: 10 }, score: [32, 28] }, // Cavs
  { msg: "Pacers turn it over on a bad pass.", hl: { title: 'Pacers Bad Pass', game_time: 'Q4 1:55', type: 'turnover', team_id: 12 }, score: [32, 28] }, // Pacers turnover
  { msg: "Cavs seal the deal with free throws by Garland.", hl: { title: 'Garland Seals FTs', game_time: 'Q4 0:25', type: 'free-throw', team_id: 10 }, score: [34, 28] }, // Cavs
  { msg: "That's the game! Cavaliers defeat the Pacers!", hl: { title: 'Game End - Cavs Win', game_time: 'Q4 0:00', type: 'game-end', team_id: 10 }, score: [34, 28] } // Cavs win
];


let i = 0;
const delays = [6000, 7000, 9000]; // Slightly different delays
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
      score_home: score[0], // Cavs score
      score_away: score[1], // Pacers score
      game_period: hl.game_time.split(' ')[0],
      time_remaining: hl.game_time.split(' ')[1],
      game_status: (hl.type === 'game-end') ? 'COMPLETED' : 'LIVE'
    }).eq('id', channelId);


    console.log(`🔁 Inserted (${i + 1}/${events.length}): ${msg} | Score (CLE-IND): ${score[0]}-${score[1]}`);
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
     if (events[events.length-1].hl.type !== 'game-end') {
        await supabase.from('channels').update({
           game_status: 'COMPLETED',
         }).eq('id', channelId);
     }
  }
};

console.log("🚀 Starting Cavaliers vs Pacers game simulation...");
try {
    await supabase.from('channels').update({
        game_status: 'LIVE',
        score_home: 0,
        score_away: 0,
        game_period: 'Q1',
        time_remaining: '12:00'
        }).eq('id', channelId);
    console.log('✅ Game status updated to LIVE.');
} catch (error) {
    console.error("Error updating game status:", error);
}

runSimulation();