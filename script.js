// Futuristic Smart Lock behavior
document.addEventListener('DOMContentLoaded', () => {
  const lockBtn = document.getElementById('lockBtn');
  const unlockBtn = document.getElementById('unlockBtn');
  const statusText = document.querySelector('.status-text');
  const statusDot = document.querySelector('.status-dot');
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsPanel = document.getElementById('settings');
  const closeSettings = document.getElementById('closeSettings');

  const roomInput = document.getElementById('room');
  const passInput = document.getElementById('pass');

  // Ensure inputs behave like masked numeric fields on mobile
  roomInput.setAttribute('inputmode','numeric');
  passInput.setAttribute('inputmode','numeric');

  // Helper to set status
  function setStatus(text, colorHex){
    statusText.textContent = text;
    statusDot.style.background = colorHex || 'rgba(255,255,255,0.12)';
    // subtle pop
    statusDot.style.transform = 'scale(1.12)';
    setTimeout(()=> statusDot.style.transform = 'scale(1)', 220);
  }

  // Validate - simple check
  function validInputs(){
    if(!roomInput.value.trim()){
      alert('Enter Room No (digits).');
      roomInput.focus();
      return false;
    }
    if(!passInput.value.trim()){
      alert('Enter Password / PIN.');
      passInput.focus();
      return false;
    }
    return true;
  }

  // Button behaviors
  lockBtn.addEventListener('click', () => {
    if(!validInputs()) return;
    lockBtn.classList.add('active');
    unlockBtn.classList.remove('active');
    lockBtn.setAttribute('aria-pressed','true');
    unlockBtn.setAttribute('aria-pressed','false');
    setStatus('Locked', '#fb7185'); // pinkish
    // store state (demo)
    localStorage.setItem('smartLockState','locked');
  });

  unlockBtn.addEventListener('click', () => {
    if(!validInputs()) return;
    unlockBtn.classList.add('active');
    lockBtn.classList.remove('active');
    unlockBtn.setAttribute('aria-pressed','true');
    lockBtn.setAttribute('aria-pressed','false');
    setStatus('Unlocked', '#34d399'); // green
    localStorage.setItem('smartLockState','unlocked');
  });

  // Restore last state
  const last = localStorage.getItem('smartLockState');
  if(last === 'locked'){
    lockBtn.classList.add('active');
    setStatus('Locked', '#fb7185');
  } else if(last === 'unlocked'){
    unlockBtn.classList.add('active');
    setStatus('Unlocked', '#34d399');
  }

  // small keyboard helper: allow numbers only (optional)
  function keepDigitsOnly(e){
    // allow navigation keys
    const allowed = ['Backspace','ArrowLeft','ArrowRight','Delete','Tab'];
    if(allowed.includes(e.key)) return;
    if(!/[0-9]/.test(e.key)) e.preventDefault();
  }
  roomInput.addEventListener('keydown', keepDigitsOnly);
  passInput.addEventListener('keydown', keepDigitsOnly);

  // settings (simple modal)
  settingsBtn.addEventListener('click', () => {
    settingsPanel.setAttribute('aria-hidden','false');
  });
  if(closeSettings) closeSettings.addEventListener('click', () => {
    settingsPanel.setAttribute('aria-hidden','true');
  });

});
