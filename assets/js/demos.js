/* Interactive Project Demos & Data Science Chart - Vallepu Nagarjuna Portfolio */

const ProjectDemos = {
  // 1. To-Do List Application Demo
  todoList: {
    tasks: [
      { id: 1, text: 'Perform Exploratory Data Analysis on Customer Churn dataset', category: 'Data Analysis', completed: true },
      { id: 2, text: 'Optimize MySQL database queries for faster retrieval', category: 'Database', completed: false },
      { id: 3, text: 'Review Python Tkinter GUI documentation', category: 'Python', completed: false }
    ],
    render(container) {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex gap-2">
            <input type="text" id="todo-input" placeholder="Enter new Python task..." class="flex-1 bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400">
            <select id="todo-category" class="bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-400">
              <option value="Python">Python</option>
              <option value="Data Science">Data Science</option>
              <option value="Database">Database</option>
            </select>
            <button onclick="ProjectDemos.todoList.add()" class="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
              <i data-lucide="plus" class="w-4 h-4"></i> Add
            </button>
          </div>
          <div class="space-y-2 max-h-60 overflow-y-auto pr-1" id="todo-items">
            ${this.getTasksHTML()}
          </div>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
    },
    getTasksHTML() {
      if (this.tasks.length === 0) {
        return `<p class="text-slate-400 text-center py-4">No tasks remaining! Add one above.</p>`;
      }
      return this.tasks.map(t => `
        <div class="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors">
          <div class="flex items-center gap-3">
            <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="ProjectDemos.todoList.toggle(${t.id})" class="w-4 h-4 accent-cyan-500 rounded cursor-pointer">
            <span class="${t.completed ? 'line-through text-slate-500' : 'text-slate-200'}">${t.text}</span>
            <span class="text-xs px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">${t.category}</span>
          </div>
          <button onclick="ProjectDemos.todoList.delete(${t.id})" class="text-slate-400 hover:text-red-400 p-1 transition-colors">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `).join('');
    },
    add() {
      const input = document.getElementById('todo-input');
      const cat = document.getElementById('todo-category');
      if (!input || !input.value.trim()) return;
      this.tasks.push({
        id: Date.now(),
        text: input.value.trim(),
        category: cat ? cat.value : 'General',
        completed: false
      });
      input.value = '';
      this.refresh();
    },
    toggle(id) {
      const t = this.tasks.find(item => item.id === id);
      if (t) t.completed = !t.completed;
      this.refresh();
    },
    delete(id) {
      this.tasks = this.tasks.filter(item => item.id !== id);
      this.refresh();
    },
    refresh() {
      const container = document.getElementById('todo-items');
      if (container) {
        container.innerHTML = this.getTasksHTML();
        if (window.lucide) lucide.createIcons();
      }
    }
  },

  // 2. Password Generator Demo
  passwordGen: {
    length: 14,
    includeUpper: true,
    includeNumbers: true,
    includeSymbols: true,
    render(container) {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex gap-2 items-center">
            <input type="text" id="pwd-output" readonly value="${this.generate()}" class="flex-1 bg-slate-950 border border-cyan-500/40 rounded-lg px-4 py-3 text-cyan-400 font-mono font-semibold tracking-wider focus:outline-none">
            <button onclick="ProjectDemos.passwordGen.copy()" class="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-4 py-3 rounded-lg transition-colors flex items-center gap-2">
              <i data-lucide="copy" class="w-4 h-4"></i> Copy
            </button>
          </div>
          <div class="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div class="flex justify-between items-center text-sm text-slate-300">
              <label>Password Length: <span id="pwd-len-val" class="text-cyan-400 font-bold">${this.length}</span></label>
              <input type="range" min="8" max="32" value="${this.length}" oninput="ProjectDemos.passwordGen.updateLength(this.value)" class="w-40 accent-cyan-500">
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm text-slate-300">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked onchange="ProjectDemos.passwordGen.includeUpper = this.checked; ProjectDemos.passwordGen.refresh();" class="accent-cyan-500"> Uppercase (A-Z)
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked onchange="ProjectDemos.passwordGen.includeNumbers = this.checked; ProjectDemos.passwordGen.refresh();" class="accent-cyan-500"> Numbers (0-9)
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked onchange="ProjectDemos.passwordGen.includeSymbols = this.checked; ProjectDemos.passwordGen.refresh();" class="accent-cyan-500"> Symbols (@#$%)
              </label>
            </div>
          </div>
          <button onclick="ProjectDemos.passwordGen.refresh()" class="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2">
            <i data-lucide="refresh-cw" class="w-4 h-4"></i> Generate New Password
          </button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
    },
    generate() {
      let chars = 'abcdefghijklmnopqrstuvwxyz';
      if (this.includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (this.includeNumbers) chars += '0123456789';
      if (this.includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      let res = '';
      for (let i = 0; i < this.length; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return res;
    },
    updateLength(val) {
      this.length = parseInt(val);
      const span = document.getElementById('pwd-len-val');
      if (span) span.innerText = val;
      this.refresh();
    },
    refresh() {
      const out = document.getElementById('pwd-output');
      if (out) out.value = this.generate();
    },
    copy() {
      const out = document.getElementById('pwd-output');
      if (!out) return;
      navigator.clipboard.writeText(out.value);
      if (window.showToast) window.showToast('Password copied to clipboard!');
    }
  },

  // 3. Calculator Application Demo
  calculator: {
    displayValue: '0',
    history: '',
    render(container) {
      container.innerHTML = `
        <div class="max-w-xs mx-auto bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-2xl">
          <div class="bg-slate-900 p-3 rounded-xl mb-4 text-right">
            <div class="text-xs text-slate-500 min-h-[18px]" id="calc-hist"></div>
            <div class="text-2xl font-mono font-bold text-cyan-400 overflow-x-auto" id="calc-disp">0</div>
          </div>
          <div class="grid grid-cols-4 gap-2">
            <button onclick="ProjectDemos.calculator.clear()" class="col-span-2 bg-red-950/60 hover:bg-red-900 text-red-400 font-bold p-3 rounded-xl transition-colors">AC</button>
            <button onclick="ProjectDemos.calculator.del()" class="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold p-3 rounded-xl transition-colors">DEL</button>
            <button onclick="ProjectDemos.calculator.op('/')" class="bg-purple-900/60 hover:bg-purple-800 text-purple-300 font-bold p-3 rounded-xl transition-colors">÷</button>
            
            <button onclick="ProjectDemos.calculator.num('7')" class="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold p-3 rounded-xl transition-colors">7</button>
            <button onclick="ProjectDemos.calculator.num('8')" class="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold p-3 rounded-xl transition-colors">8</button>
            <button onclick="ProjectDemos.calculator.num('9')" class="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold p-3 rounded-xl transition-colors">9</button>
            <button onclick="ProjectDemos.calculator.op('*')" class="bg-purple-900/60 hover:bg-purple-800 text-purple-300 font-bold p-3 rounded-xl transition-colors">×</button>
            
            <button onclick="ProjectDemos.calculator.num('4')" class="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold p-3 rounded-xl transition-colors">4</button>
            <button onclick="ProjectDemos.calculator.num('5')" class="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold p-3 rounded-xl transition-colors">5</button>
            <button onclick="ProjectDemos.calculator.num('6')" class="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold p-3 rounded-xl transition-colors">6</button>
            <button onclick="ProjectDemos.calculator.op('-')" class="bg-purple-900/60 hover:bg-purple-800 text-purple-300 font-bold p-3 rounded-xl transition-colors">-</button>
            
            <button onclick="ProjectDemos.calculator.num('1')" class="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold p-3 rounded-xl transition-colors">1</button>
            <button onclick="ProjectDemos.calculator.num('2')" class="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold p-3 rounded-xl transition-colors">2</button>
            <button onclick="ProjectDemos.calculator.num('3')" class="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold p-3 rounded-xl transition-colors">3</button>
            <button onclick="ProjectDemos.calculator.op('+')" class="bg-purple-900/60 hover:bg-purple-800 text-purple-300 font-bold p-3 rounded-xl transition-colors">+</button>
            
            <button onclick="ProjectDemos.calculator.num('0')" class="col-span-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold p-3 rounded-xl transition-colors">0</button>
            <button onclick="ProjectDemos.calculator.num('.')" class="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold p-3 rounded-xl transition-colors">.</button>
            <button onclick="ProjectDemos.calculator.equals()" class="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold p-3 rounded-xl transition-colors">=</button>
          </div>
        </div>
      `;
    },
    num(val) {
      if (this.displayValue === '0' || this.displayValue === 'Error') {
        this.displayValue = val;
      } else {
        this.displayValue += val;
      }
      this.updateDisplay();
    },
    op(operator) {
      this.displayValue += ` ${operator} `;
      this.updateDisplay();
    },
    clear() {
      this.displayValue = '0';
      this.history = '';
      this.updateDisplay();
    },
    del() {
      if (this.displayValue.length > 1) {
        this.displayValue = this.displayValue.trimEnd().slice(0, -1);
      } else {
        this.displayValue = '0';
      }
      this.updateDisplay();
    },
    equals() {
      try {
        const sanitized = this.displayValue.replace(/×/g, '*').replace(/÷/g, '/');
        const res = Function(`'use strict'; return (${sanitized})`)();
        this.history = `${this.displayValue} =`;
        this.displayValue = String(Number.isInteger(res) ? res : res.toFixed(4));
      } catch (e) {
        this.displayValue = 'Error';
      }
      this.updateDisplay();
    },
    updateDisplay() {
      const disp = document.getElementById('calc-disp');
      const hist = document.getElementById('calc-hist');
      if (disp) disp.innerText = this.displayValue;
      if (hist) hist.innerText = this.history;
    }
  },

  // 4. Rock Paper Scissors Game Demo
  rps: {
    userScore: 0,
    compScore: 0,
    resultMsg: 'Choose your weapon to start!',
    render(container) {
      container.innerHTML = `
        <div class="text-center space-y-6">
          <div class="flex justify-center items-center gap-8 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div>
              <p class="text-xs text-slate-400 uppercase tracking-wider">User</p>
              <p class="text-3xl font-bold text-cyan-400" id="rps-user-score">${this.userScore}</p>
            </div>
            <div class="text-xl font-bold text-slate-600">VS</div>
            <div>
              <p class="text-xs text-slate-400 uppercase tracking-wider">Computer</p>
              <p class="text-3xl font-bold text-purple-400" id="rps-comp-score">${this.compScore}</p>
            </div>
          </div>
          <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-sm font-semibold text-slate-300 min-h-[48px] flex items-center justify-center" id="rps-msg">
            ${this.resultMsg}
          </div>
          <div class="flex justify-center gap-4">
            <button onclick="ProjectDemos.rps.play('rock')" class="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 p-4 rounded-2xl transition-all hover:scale-105 group">
              <span class="text-4xl block mb-1">🪨</span>
              <span class="text-xs font-bold text-slate-300 group-hover:text-cyan-400">Rock</span>
            </button>
            <button onclick="ProjectDemos.rps.play('paper')" class="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 p-4 rounded-2xl transition-all hover:scale-105 group">
              <span class="text-4xl block mb-1">📄</span>
              <span class="text-xs font-bold text-slate-300 group-hover:text-cyan-400">Paper</span>
            </button>
            <button onclick="ProjectDemos.rps.play('scissors')" class="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 p-4 rounded-2xl transition-all hover:scale-105 group">
              <span class="text-4xl block mb-1">✂️</span>
              <span class="text-xs font-bold text-slate-300 group-hover:text-cyan-400">Scissors</span>
            </button>
          </div>
        </div>
      `;
    },
    play(userChoice) {
      const choices = ['rock', 'paper', 'scissors'];
      const compChoice = choices[Math.floor(Math.random() * 3)];
      const icons = { rock: '🪨', paper: '📄', scissors: '✂️' };

      if (userChoice === compChoice) {
        this.resultMsg = `It's a Tie! Both chose ${icons[userChoice]}`;
      } else if (
        (userChoice === 'rock' && compChoice === 'scissors') ||
        (userChoice === 'paper' && compChoice === 'rock') ||
        (userChoice === 'scissors' && compChoice === 'paper')
      ) {
        this.userScore++;
        this.resultMsg = `🎉 You Win! ${icons[userChoice]} beats ${icons[compChoice]}`;
      } else {
        this.compScore++;
        this.resultMsg = `🤖 Computer Wins! ${icons[compChoice]} beats ${icons[userChoice]}`;
      }

      const uScore = document.getElementById('rps-user-score');
      const cScore = document.getElementById('rps-comp-score');
      const msg = document.getElementById('rps-msg');
      if (uScore) uScore.innerText = this.userScore;
      if (cScore) cScore.innerText = this.compScore;
      if (msg) msg.innerText = this.resultMsg;
    }
  }
};

// Global opener for project modals
window.openProjectDemo = function(projectId) {
  const modal = document.getElementById('demo-modal');
  const titleEl = document.getElementById('demo-modal-title');
  const bodyEl = document.getElementById('demo-modal-body');

  if (!modal || !bodyEl) return;

  const titles = {
    todo: 'To-Do List Application (Python Logic)',
    pwd: 'Password Generator (Tkinter & Python)',
    calc: 'Calculator Application (Arithmetic & Error Handling)',
    rps: 'Rock Paper Scissors Game (Interactive AI)'
  };

  titleEl.innerText = titles[projectId] || 'Project Demo';
  modal.classList.add('active');

  if (projectId === 'todo') ProjectDemos.todoList.render(bodyEl);
  if (projectId === 'pwd') ProjectDemos.passwordGen.render(bodyEl);
  if (projectId === 'calc') ProjectDemos.calculator.render(bodyEl);
  if (projectId === 'rps') ProjectDemos.rps.render(bodyEl);
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
};
