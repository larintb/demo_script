import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Key is missing. Make sure .env.local is configured correctly.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const channelId = 26; // Celtics vs Knicks Channel
const userId = '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e'; // Admin user

// Team IDs: Knicks: 7, Celtics: 8, Neutral: 33
const events = [
 // Q1
  { msg: "🏀 Rematch time! Celtics host the Knicks!", hl: { title: 'Game Start', game_time: 'Q1 12:00', type: 'jump-ball', team_id: 33 }, score: [0, 0] }, // Score: Celtics-Knicks
  { msg: "Jalen Brunson starts hot for the Knicks with a three!", hl: { title: 'Brunson Opening Three', game_time: 'Q1 11:42', type: 'three-pointer', team_id: 6 }, score: [0, 3] }, // Knicks
  { msg: "Jaylen Brown answers for Boston with a strong drive.", hl: { title: 'Brown Driving Layup', game_time: 'Q1 11:18', type: 'layup', team_id: 2 }, score: [2, 3] }, // Celtics
  { msg: "Julius Randle muscles in for a Knicks score.", hl: { title: 'Randle Power Layup', game_time: 'Q1 10:45', type: 'layup', team_id: 6 }, score: [2, 5] }, // Knicks
  { msg: "Jayson Tatum ties it with a three-pointer!", hl: { title: 'Tatum Three', game_time: 'Q1 10:05', type: 'three-pointer', team_id: 2 }, score: [5, 5] }, // Celtics
  { msg: "Foul called on the Celtics.", hl: { title: 'Celtics Foul', game_time: 'Q1 9:30', type: 'foul', team_id: 2 }, score: [5, 5] }, // Celtics
  { msg: "Timeout Celtics.", hl: { title: 'Timeout Celtics', game_time: 'Q1 9:10', type: 'timeout', team_id: 2 }, score: [5, 5] }, // Celtics
  { msg: "Brunson hits both free throws for the Knicks.", hl: { title: 'Brunson FTs', game_time: 'Q1 8:40', type: 'free-throw', team_id: 6 }, score: [5, 7] }, // Knicks
  { msg: "Kristaps Porziņģis scores over his former team.", hl: { title: 'Porziņģis Jumper', game_time: 'Q1 7:55', type: 'jump-shot', team_id: 2 }, score: [7, 7] }, // Celtics
  { msg: "Donte DiVincenzo drains a corner three! Knicks lead again.", hl: { title: 'DiVincenzo Corner 3', game_time: 'Q1 6:30', type: 'three-pointer', team_id: 6 }, score: [7, 10] }, // Knicks
  { msg: "End of Q1. Knicks ahead early.", hl: { title: 'End Q1', game_time: 'Q1 0:00', type: 'period-end', team_id: 33 }, score: [7, 10] },

  // Q2
  { msg: "Second quarter starts.", hl: { title: 'Q2 Start', game_time: 'Q2 12:00', type: 'period-start', team_id: 33 }, score: [7, 10] },
  { msg: "Tatum ties it again with another three!", hl: { title: 'Tatum Ties Game', game_time: 'Q2 11:28', type: 'three-pointer', team_id: 2 }, score: [10, 10] }, // Celtics
  { msg: "Randle answers with a tough layup.", hl: { title: 'Randle Tough Layup', game_time: 'Q2 10:55', type: 'layup', team_id: 6 }, score: [10, 12] }, // Knicks
  { msg: "Derrick White gets a steal and layup for Boston!", hl: { title: 'White Steal & Score', game_time: 'Q2 10:12', type: 'layup', team_id: 2 }, score: [12, 12] }, // Celtics
  { msg: "Timeout Knicks.", hl: { title: 'Timeout Knicks', game_time: 'Q2 9:35', type: 'timeout', team_id: 6 }, score: [12, 12] }, // Knicks
  { msg: "Josh Hart scores on a putback for NY.", hl: { title: 'Hart Putback', game_time: 'Q2 8:50', type: 'layup', team_id: 6 }, score: [12, 14] }, // Knicks
  { msg: "Brown hits a mid-range shot for the Celtics.", hl: { title: 'Brown Mid-Range', game_time: 'Q2 7:45', type: 'jump-shot', team_id: 2 }, score: [14, 14] }, // Celtics
  { msg: "Brunson drives baseline for a reverse layup!", hl: { title: 'Brunson Reverse', game_time: 'Q2 6:30', type: 'layup', team_id: 6 }, score: [14, 16] }, // Knicks
  { msg: "Porziņģis blocks Randle at the rim!", hl: { title: 'Porziņģis Block on Randle', game_time: 'Q2 4:50', type: 'block', team_id: 2 }, score: [14, 16] }, // Celtics
  { msg: "Tatum sinks a jumper as the clock winds down.", hl: { title: 'Tatum Late Jumper', game_time: 'Q2 0:15', type: 'jump-shot', team_id: 2 }, score: [16, 16] }, // Celtics
  { msg: "Halftime: All tied up 16-16 between Celtics and Knicks.", hl: { title: 'Halftime', game_time: 'Q2 0:00', type: 'period-end', team_id: 33 }, score: [16, 16] },

  // Q3
  { msg: "Third quarter action!", hl: { title: 'Q3 Start', game_time: 'Q3 12:00', type: 'period-start', team_id: 33 }, score: [16, 16] },
  { msg: "Brown gets an and-one to start the half!", hl: { title: 'Brown And-One', game_time: 'Q3 11:33', type: 'and-one', team_id: 2 }, score: [18, 16] }, // Celtics
  { msg: "Brown completes the 3-point play.", hl: { title: 'Brown And-One FT', game_time: 'Q3 11:31', type: 'free-throw', team_id: 2 }, score: [19, 16] }, // Celtics
  { msg: "Brunson answers with a pull-up jumper.", hl: { title: 'Brunson Pull-up', game_time: 'Q3 10:50', type: 'jump-shot', team_id: 6 }, score: [19, 18] }, // Knicks
  { msg: "Tatum drains another three! He's feeling it.", hl: { title: 'Tatum On Fire', game_time: 'Q3 10:01', type: 'three-pointer', team_id: 2 }, score: [22, 18] }, // Celtics
  { msg: "Timeout Knicks.", hl: { title: 'Knicks Q3 Timeout', game_time: 'Q3 9:30', type: 'timeout', team_id: 6 }, score: [22, 18] }, // Knicks
  { msg: "Randle fouled, makes 1 of 2.", hl: { title: 'Randle FT', game_time: 'Q3 8:44', type: 'free-throw', team_id: 6 }, score: [22, 19] }, // Knicks
  { msg: "White hits Porziņģis for an easy dunk.", hl: { title: 'Porziņģis Dunk', game_time: 'Q3 7:58', type: 'dunk', team_id: 2 }, score: [24, 19] }, // Celtics
  { msg: "DiVincenzo hits back with a three!", hl: { title: 'DiVincenzo Three', game_time: 'Q3 7:15', type: 'three-pointer', team_id: 6 }, score: [24, 22] }, // Knicks
  { msg: "Celtics turnover leads to a Hart fast break layup.", hl: { title: 'Hart Fast Break', game_time: 'Q3 5:55', type: 'layup', team_id: 6 }, score: [24, 24] }, // Knicks
  { msg: "Tatum scores through contact!", hl: { title: 'Tatum Tough Score', game_time: 'Q3 4:20', type: 'layup', team_id: 2 }, score: [26, 24] }, // Celtics
  { msg: "End of Q3. Celtics edge ahead 26-24.", hl: { title: 'End Q3', game_time: 'Q3 0:00', type: 'period-end', team_id: 33 }, score: [26, 24] },

  // Q4
  { msg: "Final quarter begins!", hl: { title: 'Q4 Start', game_time: 'Q4 12:00', type: 'period-start', team_id: 33 }, score: [26, 24] },
  { msg: "Brunson ties the game with a jumper.", hl: { title: 'Brunson Jumper', game_time: 'Q4 11:36', type: 'jump-shot', team_id: 6 }, score: [26, 26] }, // Knicks
  { msg: "Brown answers for the Celtics.", hl: { title: 'Brown Layup', game_time: 'Q4 11:02', type: 'layup', team_id: 2 }, score: [28, 26] }, // Celtics
  { msg: "Randle powers in for another Knicks basket.", hl: { title: 'Randle Layup', game_time: 'Q4 10:10', type: 'layup', team_id: 6 }, score: [28, 28] }, // Knicks
  { msg: "White hits a crucial three for Boston!", hl: { title: 'White Clutch Three', game_time: 'Q4 8:55', type: 'three-pointer', team_id: 2 }, score: [31, 28] }, // Celtics
  { msg: "Timeout Knicks.", hl: { title: 'Knicks Q4 Timeout', game_time: 'Q4 8:40', type: 'timeout', team_id: 6 }, score: [31, 28] }, // Knicks
  { msg: "Brunson fouled, makes both FTs. One point game!", hl: { title: 'Brunson Clutch FTs', game_time: 'Q4 6:30', type: 'free-throw', team_id: 6 }, score: [31, 30] }, // Knicks
  { msg: "Tatum responds with a clutch jump shot!", hl: { title: 'Tatum Clutch Jumper', game_time: 'Q4 5:45', type: 'jump-shot', team_id: 2 }, score: [33, 30] }, // Celtics
  { msg: "Knicks turn it over! Costly mistake!", hl: { title: 'Knicks Late Turnover', game_time: 'Q4 2:10', type: 'turnover', team_id: 6 }, score: [33, 30] }, // Knicks turnover
  { msg: "Porziņģis slams it home to extend the lead!", hl: { title: 'Porziņģis Dagger Dunk', game_time: 'Q4 1:30', type: 'dunk', team_id: 2 }, score: [35, 30] }, // Celtics
  { msg: "Brunson misses a desperation three.", hl: { title: 'Knicks Miss', game_time: 'Q4 0:10', type: 'missed-shot', team_id: 6 }, score: [35, 30] }, // Knicks miss
  { msg: "Celtics win a close one at home!", hl: { title: 'Game End - Celtics Win', game_time: 'Q4 0:00', type: 'game-end', team_id: 2 }, score: [35, 30] } // Celtics win
];


let i = 0;
const delays = [5500, 8500, 10500]; // Slightly different delays
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
      score_home: score[0], // Celtics score
      score_away: score[1], // Knicks score
      game_period: hl.game_time.split(' ')[0],
      time_remaining: hl.game_time.split(' ')[1],
      game_status: (hl.type === 'game-end') ? 'COMPLETED' : 'LIVE'
    }).eq('id', channelId);


    console.log(`🔁 Inserted (${i + 1}/${events.length}): ${msg} | Score (BOS-NYK): ${score[0]}-${score[1]}`);
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

console.log("🚀 Starting Celtics vs Knicks game simulation...");
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