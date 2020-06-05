import {BeanGameClient} from "./BeanGameClient";

const canvasElementId = 'gameCanvas';

showWelcomeScreen();

function showWelcomeScreen() {
  const nicknameInput = document.getElementById('nicknameInput') as HTMLInputElement;
  const canvas = document.getElementById(canvasElementId);
  document.getElementById('joinButton').onclick = function() {
    const nickname = nicknameInput.value;
    if (!nickname) {
      alert('Please enter a valid nickname');
      return;
    } else {
      nicknameInput.disabled = true;
      document.getElementById('welcomeScreen').classList.add('hidden');
      launchGameClient(nickname);
    }
  }
}

function launchGameClient(username: string) {
  document.getElementById(canvasElementId).classList.remove('hidden');
  const game = new BeanGameClient(canvasElementId);
  game.boot();
}
