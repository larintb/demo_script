import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Key is missing. Make sure .env.local is configured correctly.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const channelId = 27; // Timberwolves vs Warriors Channel
const userId = '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e'; // Admin user

// Team IDs: Timberwolves: 9, Warriors: 10, Neutral: 33
const events = [
  // Q1
  { msg: "🏀 We are live! Timberwolves vs Warriors!", hl: { title: 'Game Start', game_time: 'Q1 12:00', type: 'jump-ball', team_id: 33 }, score: [0, 0] }, // Score: T-Wolves - Warriors
  { msg: "Stephen Curry opens the scoring with a signature three!", hl: { title: 'Curry Opening Three', game_time: 'Q1 11:39', type: 'three-pointer', team_id: 4 }, score: [0, 3] }, // Warriors
  { msg: "Anthony Edwards answers with a powerful drive for Minnesota!", hl: { title: 'Edwards Drive', game_time: 'Q1 11:11', type: 'layup', team_id: 20 }, score: [2, 3] }, // Timberwolves
  { msg: "Karl-Anthony Towns hits a jumper for the Wolves.", hl: { title: 'Towns Jumper', game_time: 'Q1 10:35', type: 'jump-shot', team_id: 20 }, score: [4, 3] }, // Timberwolves
  { msg: "Klay Thompson drains a three for Golden State!", hl: { title: 'Thompson Three', game_time: 'Q1 9:58', type: 'three-pointer', team_id: 4 }, score: [4, 6] }, // Warriors
  { msg: "Rudy Gobert with a block down low!", hl: { title: 'Gobert Block', game_time: 'Q1 9:12', type: 'block', team_id: 20 }, score: [4, 6] }, // Timberwolves
  { msg: "Timeout Timberwolves.", hl: { title: 'Timeout Timberwolves', game_time: 'Q1 8:48', type: 'timeout', team_id: 20 }, score: [4, 6] }, // Timberwolves
  { msg: "Edwards gets to the line, makes both free throws.", hl: { title: 'Edwards FTs', game_time: 'Q1 8:10', type: 'free-throw', team_id: 20 }, score: [6, 6] }, // Timberwolves
  { msg: "Chris Paul finds Draymond Green for an easy layup.", hl: { title: 'Green Layup', game_time: 'Q1 7:20', type: 'layup', team_id: 4 }, score: [6, 8] }, // Warriors
  { msg: "Towns scores again inside.", hl: { title: 'Towns Score', game_time: 'Q1 6:05', type: 'layup', team_id: 20 }, score: [8, 8] }, // Timberwolves
  { msg: "End of Q1. All square.", hl: { title: 'End Q1', game_time: 'Q1 0:00', type: 'period-end', team_id: 33 }, score: [8, 8] },

  // Q2
  { msg: "Second quarter action underway.", hl: { title: 'Q2 Start', game_time: 'Q2 12:00', type: 'period-start', team_id: 33 }, score: [8, 8] },
  { msg: "Curry heats up! Another three!", hl: { title: 'Curry Second Three', game_time: 'Q2 11:33', type: 'three-pointer', team_id: 4 }, score: [8, 11] }, // Warriors
  { msg: "Naz Reid answers with a three for the Wolves!", hl: { title: 'Reid Three', game_time: 'Q2 10:59', type: 'three-pointer', team_id: 20 }, score: [11, 11] }, // Timberwolves
  { msg: "Andrew Wiggins scores against his former team.", hl: { title: 'Wiggins Layup', game_time: 'Q2 10:15', type: 'layup', team_id: 4 }, score: [11, 13] }, // Warriors
  { msg: "Timeout Warriors.", hl: { title: 'Timeout Warriors', game_time: 'Q2 9:40', type: 'timeout', team_id: 4 }, score: [11, 13] }, // Warriors
  { msg: "Edwards with a steal and a monster dunk!", hl: { title: 'Edwards Steal & Dunk', game_time: 'Q2 8:55', type: 'dunk', team_id: 20 }, score: [13, 13] }, // Timberwolves
  { msg: "Thompson hits a mid-range jumper.", hl: { title: 'Thompson Jumper', game_time: 'Q2 8:02', type: 'jump-shot', team_id: 4 }, score: [13, 15] }, // Warriors
  { msg: "Towns fouled, makes both free throws.", hl: { title: 'Towns FTs', game_time: 'Q2 6:50', type: 'free-throw', team_id: 20 }, score: [15, 15] }, // Timberwolves
  { msg: "Curry with a beautiful assist to Green.", hl: { title: 'Curry Assist', game_time: 'Q2 5:30', type: 'layup', team_id: 4 }, score: [15, 17] }, // Warriors assist leading to layup for Green
  { msg: "Edwards buzzer-beater attempt is off!", hl: { title: 'Edwards Miss', game_time: 'Q2 0:02', type: 'missed-shot', team_id: 20 }, score: [15, 17] }, // Timberwolves miss
  { msg: "Halftime: Warriors lead the Timberwolves 17-15.", hl: { title: 'Halftime', game_time: 'Q2 0:00', type: 'period-end', team_id: 33 }, score: [15, 17] },

  // Q3
  { msg: "Third quarter begins!", hl: { title: 'Q3 Start', game_time: 'Q3 12:00', type: 'period-start', team_id: 33 }, score: [15, 17] },
  { msg: "Towns starts the half strong with a layup.", hl: { title: 'Towns Q3 Layup', game_time: 'Q3 11:36', type: 'layup', team_id: 20 }, score: [17, 17] }, // Timberwolves
  { msg: "Curry... Splash! Another three!", hl: { title: 'Curry Three Again', game_time: 'Q3 11:01', type: 'three-pointer', team_id: 4 }, score: [17, 20] }, // Warriors
  { msg: "Edwards drives and finishes with flair.", hl: { title: 'Edwards Acrobatic Layup', game_time: 'Q3 10:22', type: 'layup', team_id: 20 }, score: [19, 20] }, // Timberwolves
  { msg: "Warriors turn it over. Bad pass by Paul.", hl: { title: 'Warriors Turnover', game_time: 'Q3 9:40', type: 'turnover', team_id: 4 }, score: [19, 20] }, // Warriors turnover
  { msg: "Timeout Timberwolves.", hl: { title: 'Timberwolves Q3 Timeout', game_time: 'Q3 9:10', type: 'timeout', team_id: 20 }, score: [19, 20] }, // Timberwolves
  { msg: "Gobert gets an easy dunk off the feed.", hl: { title: 'Gobert Dunk', game_time: 'Q3 8:30', type: 'dunk', team_id: 20 }, score: [21, 20] }, // Timberwolves
  { msg: "Thompson ties it with a jumper.", hl: { title: 'Thompson Jumper', game_time: 'Q3 7:45', type: 'jump-shot', team_id: 4 }, score: [21, 22] }, // Warriors
  { msg: "Edwards scores and draws the foul! And-one!", hl: { title: 'Edwards And-One', game_time: 'Q3 6:20', type: 'and-one', team_id: 20 }, score: [23, 22] }, // Timberwolves
  { msg: "Edwards converts the free throw.", hl: { title: 'Edwards And-One FT', game_time: 'Q3 6:18', type: 'free-throw', team_id: 20 }, score: [24, 22] }, // Timberwolves
  { msg: "Curry with a floater to cut the lead.", hl: { title: 'Curry Floater', game_time: 'Q3 4:50', type: 'jump-shot', team_id: 4 }, score: [24, 24] }, // Warriors
  { msg: "End of Q3. Tied game heading into the fourth!", hl: { title: 'End Q3', game_time: 'Q3 0:00', type: 'period-end', team_id: 33 }, score: [24, 24] },

  // Q4
  { msg: "Final quarter! It's tied!", hl: { title: 'Q4 Start', game_time: 'Q4 12:00', type: 'period-start', team_id: 33 }, score: [24, 24] },
  { msg: "Edwards starts the 4th with a bang! Three-pointer!", hl: { title: 'Edwards Q4 Three', game_time: 'Q4 11:31', type: 'three-pointer', team_id: 20 }, score: [27, 24] }, // Timberwolves
  { msg: "Wiggins answers with a layup for the Warriors.", hl: { title: 'Wiggins Layup', game_time: 'Q4 10:55', type: 'layup', team_id: 4 }, score: [27, 26] }, // Warriors
  { msg: "Towns hits a clutch mid-range shot.", hl: { title: 'Towns Clutch Jumper', game_time: 'Q4 9:40', type: 'jump-shot', team_id: 20 }, score: [29, 26] }, // Timberwolves
  { msg: "Curry fouled on a 3pt attempt! Makes all three!", hl: { title: 'Curry 3 FTs', game_time: 'Q4 8:30', type: 'free-throw', team_id: 4 }, score: [29, 29] }, // Warriors
  { msg: "Timeout Warriors.", hl: { title: 'Warriors Q4 Timeout', game_time: 'Q4 8:15', type: 'timeout', team_id: 4 }, score: [29, 29] }, // Warriors
  { msg: "Gobert tips it in for Minnesota!", hl: { title: 'Gobert Tip-In', game_time: 'Q4 7:05', type: 'layup', team_id: 20 }, score: [31, 29] }, // Timberwolves
  { msg: "Thompson ties it again with a jumper!", hl: { title: 'Thompson Ties It', game_time: 'Q4 6:10', type: 'jump-shot', team_id: 4 }, score: [31, 31] }, // Warriors
  { msg: "Edwards takes over! Driving layup gives Wolves the lead!", hl: { title: 'Edwards Go-Ahead Layup', game_time: 'Q4 1:45', type: 'layup', team_id: 20 }, score: [33, 31] }, // Timberwolves
  { msg: "Curry misses a potential game-tying three!", hl: { title: 'Curry Missed Three', game_time: 'Q4 0:08', type: 'missed-shot', team_id: 4 }, score: [33, 31] }, // Warriors miss
  { msg: "Timberwolves rebound and hold on! What a finish!", hl: { title: 'Game End - Timberwolves Win', game_time: 'Q4 0:00', type: 'game-end', team_id: 20 }, score: [33, 31] } // Timberwolves win
];


let i = 0;
const delays = [4500, 7500, 9500]; // Slightly faster pace delays
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
      score_home: score[0], // Timberwolves score
      score_away: score[1], // Warriors score
      game_period: hl.game_time.split(' ')[0],
      time_remaining: hl.game_time.split(' ')[1],
      game_status: (hl.type === 'game-end') ? 'COMPLETED' : 'LIVE'
    }).eq('id', channelId);


    console.log(`🔁 Inserted (${i + 1}/${events.length}): ${msg} | Score (MIN-GSW): ${score[0]}-${score[1]}`);
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

console.log("🚀 Starting Timberwolves vs Warriors game simulation...");
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