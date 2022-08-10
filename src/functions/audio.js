import luffy from '../audio/luffy.mp3';
import zoro from '../audio/zoro.mp3';
import nami from '../audio/nami.mp3';
import usopp from '../audio/usopp.mp3';
import sanji from '../audio/sanji.mp3';
import chopper from '../audio/chopper.mp3';
import robin from '../audio/robin.mp3';
import franky from '../audio/franky.mp3';
import brook from '../audio/brook.mp3';

// Create all the audio into an array
const audio = [luffy, zoro, nami, usopp, sanji, chopper, robin, franky, brook];

// Functions to random the audio
export const getRandomAudio = () => {
  const random = Math.floor(Math.random() * audio.length);
  return audio[random];
}