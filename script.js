// script.js (FINAL WORKING)

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('taskForm');
  const tbody = document.getElementById('taskTableBody');

  const filterTaskInput = document.getElementById('filterTask');
  const filterAssignedInput = document.getElementById('filterAssigned');
  const filterStatusSelect = document.getElementById('filterStatus');
  const sortDateBtn = document.getElementById('sortDateBtn');

  let sortAsc = true;

  const tasks = [];

  // ---------- DATE HELPERS ----------
  function parseDateLocal(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function todayAtMidnight() {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }

  function daysDiff(targetDateStr) {
    const target = parseDateLocal(targetDateStr);
    const diffMs = target - todayAtMidnight();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  // ---------- FILTER LOGIC ----------
  function matchesFilters(task) {
    const tFilter = filterTaskInput.value.trim().toLowerCase();
    const aFilter = filterAssignedInput.value.trim().toLowerCase();
    const sFilter = filterStatusSelect.value;

    if (tFilter && !task.desc.toLowerCase().includes(tFilter)) return false;
    if (aFilter && !task.assigned.toLowerCase().includes(aFilter)) return false;

    if (sFilter) {
      if (sFilter === 'Overdue') {
        const d = daysDiff(task.date);
        if (!(d < 0 && task.status !== 'Complete')) return false;
      } else {
        if (task.status !== sFilter) return false;
      }
    }

    return true;
  }

  // ---------- RENDER ----------
  function render() {
    tbody.innerHTML = '';

    let list = tasks.filter(matchesFilters);

    // SORT
    list.sort((a, b) => {
      const da = parseDateLocal(a.date);
      const db = parseDateLocal(b.date);
      return sortAsc ? da - db : db - da;
    });

    list.forEach(task => {
      const tr = document.createElement('tr');

      // Task
      const tdDesc = document.createElement('td');
      tdDesc.textContent = task.desc;
      tr.appendChild(tdDesc);

      // Assigned
      const tdAssigned = document.createElement('td');
      tdAssigned.textContent = task.assigned;
      tr.appendChild(tdAssigned);

      // Date
      const tdDate = document.createElement('td');
      tdDate.textContent = task.date;
      tr.appendChild(tdDate);

      // Status
      const tdStatus = document.createElement('td');
      const sel = document.createElement('select');

      sel.innerHTML = `
        <option value="Pending">Pending</option>
        <option value="Complete">Complete</option>
      `;

      sel.value = task.status;

      sel.addEventListener('change', () => {
        task.status = sel.value;
        render();
      });

      tdStatus.appendChild(sel);
      tr.appendChild(tdStatus);

      // Row color
      if (task.status === 'Complete') {
        tr.style.backgroundColor = '#d4edda';
      } else {
        tr.style.backgroundColor = '#fff3cd';
      }

      // Days / Overdue
      const tdDays = document.createElement('td');
      const diff = daysDiff(task.date);

      if (task.status === 'Complete') {
        tdDays.innerHTML = `Complete`;
      } else if (diff < 0) {
        tdDays.innerHTML = `Overdue ${Math.abs(diff)}d`;
        tr.classList.add('row-overdue');
      } else {
        tdDays.innerHTML = `${diff}d`;
      }

      tr.appendChild(tdDays);

      // Delete
      const tdActions = document.createElement('td');
      const delBtn = document.createElement('button');

      delBtn.textContent = 'Delete';
      delBtn.className = 'btn-danger';

      delBtn.addEventListener('click', () => {
        const idx = tasks.findIndex(t => t.id === task.id);
        if (idx >= 0) {
          tasks.splice(idx, 1);
          render();
        }
      });

      tdActions.appendChild(delBtn);
      tr.appendChild(tdActions);

      tbody.appendChild(tr);
    });
  }

  // ---------- ADD TASK ----------
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const desc = document.getElementById('taskDesc').value.trim();
    const assigned = document.getElementById('assignedTo').value.trim();
    const date = document.getElementById('targetDate').value;

    if (!desc || !assigned || !date) {
      alert('Fill all fields');
      return;
    }

    tasks.push({
      id: Date.now().toString(),
      desc,
      assigned,
      date,
      status: 'Pending'
    });

    form.reset();
    render();
  });

  // ---------- EVENTS ----------
  [filterTaskInput, filterAssignedInput].forEach(inp =>
    inp.addEventListener('input', render)
  );

  filterStatusSelect.addEventListener('change', render);

  sortDateBtn.addEventListener('click', () => {
    sortAsc = !sortAsc;
    sortDateBtn.textContent = sortAsc ? 'Sort ↑' : 'Sort ↓';
    render();
  });

  // ---------- INITIAL ----------
  render();

});
