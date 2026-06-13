/* ============================================================
   Career Compass — Admin CMS
   Simple password login + manage careers & categories.
   (Prototype auth only — replace with real auth in the backend.)
   ============================================================ */

const ADMIN_PASSWORD = 'scouts2026';   // prototype only
const SESSION_KEY = 'cc_admin_session';

const esc = (s = '') => String(s).replace(/[&<>"']/g, m =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

// ---------- Auth ----------
const loginView = document.getElementById('loginView');
const adminView = document.getElementById('adminView');

function isLoggedIn() { return sessionStorage.getItem(SESSION_KEY) === '1'; }

function showApp() {
  loginView.style.display = 'none';
  adminView.style.display = 'flex';
  navigate('dashboard');
}

document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const pw = document.getElementById('pw').value;
  if (pw === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, '1');
    showApp();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem(SESSION_KEY);
  location.reload();
});

// ---------- Navigation ----------
const content = document.getElementById('adminContent');
const viewTitle = document.getElementById('viewTitle');
const topbarActions = document.getElementById('topbarActions');

document.getElementById('adminNav').addEventListener('click', e => {
  const a = e.target.closest('a[data-view]');
  if (a) { e.preventDefault(); navigate(a.dataset.view); }
});

function setActiveNav(view) {
  document.querySelectorAll('#adminNav a').forEach(a =>
    a.classList.toggle('active', a.dataset.view === view));
}

function navigate(view, arg) {
  setActiveNav(view);
  topbarActions.innerHTML = '';
  switch (view) {
    case 'dashboard': return viewDashboard();
    case 'careers': return viewCareers();
    case 'categories': return viewCategories();
    case 'about': return viewAbout();
    case 'career-form': return viewCareerForm(arg);
    case 'category-form': return viewCategoryForm(arg);
  }
}

// ---------- Dashboard ----------
function viewDashboard() {
  viewTitle.textContent = 'Dashboard';
  const careers = Store.getCareers();
  const cats = Store.getCategories();
  const featured = Store.getFeatured();

  content.innerHTML = `
    <div class="notice">
      👋 Welcome! This is your content management system. Add careers, organize them into
      categories, and star the ones you want featured on the home page.
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="s-num">${careers.length}</div><div class="s-label">Total careers</div></div>
      <div class="stat-card"><div class="s-num">${cats.length}</div><div class="s-label">Categories</div></div>
      <div class="stat-card"><div class="s-num">${featured.length}</div><div class="s-label">Featured on home page</div></div>
    </div>

    <div class="page-actions">
      <h2 style="margin:0; color:var(--navy); font-size:1.2rem;">Quick actions</h2>
    </div>
    <div style="display:flex; gap:12px; flex-wrap:wrap;">
      <button class="btn btn-primary" id="qaCareer">➕ Add a new career</button>
      <button class="btn btn-ghost" id="qaCat">📁 Add a category</button>
      <a class="btn btn-ghost" href="index.html" target="_blank">🌐 Preview the live site</a>
    </div>

    <div class="page-actions" style="margin-top:36px;">
      <h2 style="margin:0; color:var(--navy); font-size:1.2rem;">Recently added careers</h2>
      <a class="btn btn-ghost btn-sm" id="qaAll">View all →</a>
    </div>
    <table class="data-table">
      <thead><tr><th>Career</th><th class="hide-sm">Category</th><th>Featured</th></tr></thead>
      <tbody>
        ${careers.slice(-5).reverse().map(c => `
          <tr>
            <td><strong>${c.icon || '💼'} ${esc(c.title)}</strong></td>
            <td class="hide-sm"><span class="tag">${esc(catNameOf(c.category))}</span></td>
            <td>${c.featured ? '<span class="tag tag-feat">★ Featured</span>' : '—'}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;

  document.getElementById('qaCareer').onclick = () => navigate('career-form');
  document.getElementById('qaCat').onclick = () => navigate('category-form');
  document.getElementById('qaAll').onclick = () => navigate('careers');
}

function catNameOf(id) {
  const c = Store.getCategory(id);
  return c ? c.name : 'Uncategorized';
}

// ---------- Careers list ----------
function viewCareers() {
  viewTitle.textContent = 'Careers';
  topbarActions.innerHTML = `<button class="btn btn-primary" id="addCareer">➕ Add Career</button>`;
  document.getElementById('addCareer').onclick = () => navigate('career-form');

  const careers = Store.getCareers();
  content.innerHTML = `
    <div class="notice">Click ★ to feature a career on the home page. Use Edit to change any details.</div>
    <table class="data-table">
      <thead>
        <tr><th>Career</th><th class="hide-sm">Category</th><th class="hide-sm">Salary</th><th>Featured</th><th>Actions</th></tr>
      </thead>
      <tbody id="careerRows">
        ${careers.length ? careers.map(c => `
          <tr>
            <td><strong>${c.icon || '💼'} ${esc(c.title)}</strong></td>
            <td class="hide-sm"><span class="tag">${esc(catNameOf(c.category))}</span></td>
            <td class="hide-sm">${esc(c.salary || '—')}</td>
            <td><button class="toggle-star" data-star="${esc(c.id)}" title="Toggle featured">${c.featured ? '⭐' : '☆'}</button></td>
            <td>
              <div class="row-actions">
                <button class="btn btn-ghost btn-sm" data-edit="${esc(c.id)}">Edit</button>
                <button class="btn btn-danger btn-sm" data-del="${esc(c.id)}">Delete</button>
              </div>
            </td>
          </tr>`).join('')
          : '<tr><td colspan="5" style="text-align:center; padding:40px; color:var(--muted);">No careers yet. Click “Add Career” to begin.</td></tr>'}
      </tbody>
    </table>`;

  content.querySelectorAll('[data-star]').forEach(b => b.onclick = () => {
    Store.toggleFeatured(b.dataset.star); viewCareers();
  });
  content.querySelectorAll('[data-edit]').forEach(b => b.onclick = () =>
    navigate('career-form', b.dataset.edit));
  content.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
    const c = Store.getCareer(b.dataset.del);
    if (confirm(`Delete “${c.title}”? This cannot be undone.`)) { Store.deleteCareer(b.dataset.del); viewCareers(); }
  });
}

// ---------- Career form ----------
function viewCareerForm(id) {
  const editing = !!id;
  const c = editing ? Store.getCareer(id) : {};
  viewTitle.textContent = editing ? 'Edit Career' : 'Add Career';
  const cats = Store.getCategories();

  content.innerHTML = `
    <a class="btn btn-ghost btn-sm" id="backBtn" style="margin-bottom:18px;">← Back to careers</a>
    <form class="form-card" id="careerForm">
      <div class="form-grid">
        <div class="form-group">
          <label>Career title *</label>
          <input class="form-control" name="title" required value="${esc(c.title || '')}" placeholder="e.g. Registered Nurse" />
        </div>
        <div class="form-group">
          <label>Category</label>
          <select class="form-control" name="category">
            <option value="">— Choose a category —</option>
            ${cats.map(cat => `<option value="${cat.id}" ${c.category === cat.id ? 'selected' : ''}>${cat.icon} ${esc(cat.name)}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Icon / emoji <span class="hint">(shows on cards)</span></label>
          <input class="form-control" name="icon" value="${esc(c.icon || '')}" placeholder="e.g. 🩺" maxlength="4" />
        </div>
        <div class="form-group">
          <label>Salary range</label>
          <input class="form-control" name="salary" value="${esc(c.salary || '')}" placeholder="e.g. $75,000 - $95,000 / year" />
        </div>
        <div class="form-group">
          <label>Education & training</label>
          <input class="form-control" name="education" value="${esc(c.education || '')}" placeholder="e.g. Bachelor’s degree + license" />
        </div>
        <div class="form-group">
          <label>Job outlook</label>
          <select class="form-control" name="jobOutlook">
            <option value="high" ${c.jobOutlook === 'high' ? 'selected' : ''}>In high demand</option>
            <option value="medium" ${(!c.jobOutlook || c.jobOutlook === 'medium') ? 'selected' : ''}>Steady demand</option>
            <option value="low" ${c.jobOutlook === 'low' ? 'selected' : ''}>Limited demand</option>
          </select>
        </div>

        <div class="form-group full">
          <label>Short description <span class="hint">(one sentence shown on cards)</span></label>
          <textarea class="form-control" name="shortDescription" style="min-height:60px;" placeholder="A short, friendly summary of the career.">${esc(c.shortDescription || '')}</textarea>
        </div>
        <div class="form-group full">
          <label>What they do</label>
          <textarea class="form-control" name="whatTheyDo">${esc(c.whatTheyDo || '')}</textarea>
        </div>
        <div class="form-group full">
          <label>Work environment</label>
          <textarea class="form-control" name="workEnvironment">${esc(c.workEnvironment || '')}</textarea>
        </div>
        <div class="form-group full">
          <label>How to become one</label>
          <textarea class="form-control" name="howToBecome">${esc(c.howToBecome || '')}</textarea>
        </div>
        <div class="form-group full">
          <label>Skills needed <span class="hint">(one per line, or comma-separated)</span></label>
          <textarea class="form-control" name="skills" placeholder="Communication&#10;Problem solving&#10;Teamwork">${esc((c.skills || []).join('\n'))}</textarea>
        </div>
        <div class="form-group full">
          <label>A day in the life</label>
          <textarea class="form-control" name="dayInLife">${esc(c.dayInLife || '')}</textarea>
        </div>

        <div class="form-group full">
          <div class="checkbox-row">
            <input type="checkbox" id="featured" name="featured" ${c.featured ? 'checked' : ''} />
            <label for="featured">⭐ Feature this career on the home page</label>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">${editing ? 'Save changes' : 'Add career'}</button>
        <button type="button" class="btn btn-ghost" id="cancelBtn">Cancel</button>
      </div>
    </form>`;

  document.getElementById('backBtn').onclick = () => navigate('careers');
  document.getElementById('cancelBtn').onclick = () => navigate('careers');

  document.getElementById('careerForm').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const skillsRaw = (fd.get('skills') || '').toString();
    const skills = skillsRaw.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);

    const data = {
      title: fd.get('title').toString().trim(),
      category: fd.get('category'),
      icon: fd.get('icon').toString().trim(),
      salary: fd.get('salary').toString().trim(),
      education: fd.get('education').toString().trim(),
      jobOutlook: fd.get('jobOutlook'),
      shortDescription: fd.get('shortDescription').toString().trim(),
      whatTheyDo: fd.get('whatTheyDo').toString().trim(),
      workEnvironment: fd.get('workEnvironment').toString().trim(),
      howToBecome: fd.get('howToBecome').toString().trim(),
      dayInLife: fd.get('dayInLife').toString().trim(),
      skills,
      featured: fd.get('featured') === 'on',
    };
    if (editing) data.id = id;
    Store.saveCareer(data);
    navigate('careers');
  });
}

// ---------- Categories ----------
function viewCategories() {
  viewTitle.textContent = 'Categories';
  topbarActions.innerHTML = `<button class="btn btn-primary" id="addCat">➕ Add Category</button>`;
  document.getElementById('addCat').onclick = () => navigate('category-form');

  const cats = Store.getCategories();
  content.innerHTML = `
    <div class="notice">Categories group related careers (for example, Doctors and Nurses both go under Healthcare).</div>
    <table class="data-table">
      <thead><tr><th>Category</th><th>Description</th><th>Careers</th><th>Actions</th></tr></thead>
      <tbody>
        ${cats.map(cat => `
          <tr>
            <td><strong>${cat.icon || '📁'} ${esc(cat.name)}</strong></td>
            <td style="color:var(--muted);">${esc(cat.description || '')}</td>
            <td><span class="tag">${Store.countByCategory(cat.id)}</span></td>
            <td>
              <div class="row-actions">
                <button class="btn btn-ghost btn-sm" data-edit="${esc(cat.id)}">Edit</button>
                <button class="btn btn-danger btn-sm" data-del="${esc(cat.id)}">Delete</button>
              </div>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`;

  content.querySelectorAll('[data-edit]').forEach(b => b.onclick = () =>
    navigate('category-form', b.dataset.edit));
  content.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
    const cat = Store.getCategory(b.dataset.del);
    const n = Store.countByCategory(b.dataset.del);
    const msg = n > 0
      ? `Delete “${cat.name}”? Its ${n} career(s) will become Uncategorized.`
      : `Delete “${cat.name}”?`;
    if (confirm(msg)) { Store.deleteCategory(b.dataset.del); viewCategories(); }
  });
}

function viewCategoryForm(id) {
  const editing = !!id;
  const cat = editing ? Store.getCategory(id) : {};
  viewTitle.textContent = editing ? 'Edit Category' : 'Add Category';

  content.innerHTML = `
    <a class="btn btn-ghost btn-sm" id="backBtn" style="margin-bottom:18px;">← Back to categories</a>
    <form class="form-card" id="catForm" style="max-width:560px;">
      <div class="form-group">
        <label>Category name *</label>
        <input class="form-control" name="name" required value="${esc(cat.name || '')}" placeholder="e.g. Healthcare" />
      </div>
      <div class="form-group">
        <label>Icon / emoji</label>
        <input class="form-control" name="icon" value="${esc(cat.icon || '')}" placeholder="e.g. 🩺" maxlength="4" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" name="description" style="min-height:70px;" placeholder="A short description of this field.">${esc(cat.description || '')}</textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">${editing ? 'Save changes' : 'Add category'}</button>
        <button type="button" class="btn btn-ghost" id="cancelBtn">Cancel</button>
      </div>
    </form>`;

  document.getElementById('backBtn').onclick = () => navigate('categories');
  document.getElementById('cancelBtn').onclick = () => navigate('categories');

  document.getElementById('catForm').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      name: fd.get('name').toString().trim(),
      icon: fd.get('icon').toString().trim(),
      description: fd.get('description').toString().trim(),
    };
    if (editing) data.id = id;
    Store.saveCategory(data);
    navigate('categories');
  });
}

// ---------- About page editor ----------
function viewAbout() {
  viewTitle.textContent = 'About Page';
  const a = Store.getAbout();
  const m = a.members || [];
  const member = (i, mem = {}) => `
    <div class="form-card" style="max-width:none; box-shadow:none; border:1px solid var(--line); padding:20px; margin-bottom:16px;">
      <h3 style="margin:0 0 14px; color:var(--navy); font-size:1.05rem;">👤 Team member ${i + 1}</h3>
      <div class="form-grid">
        <div class="form-group">
          <label>Name</label>
          <input class="form-control" name="m${i}_name" value="${esc(mem.name || '')}" placeholder="First name (or nickname)" />
        </div>
        <div class="form-group">
          <label>Role <span class="hint">(what they do on the team)</span></label>
          <input class="form-control" name="m${i}_role" value="${esc(mem.role || '')}" placeholder="e.g. Design & Website" />
        </div>
        <div class="form-group">
          <label>Photo emoji</label>
          <input class="form-control" name="m${i}_emoji" value="${esc(mem.emoji || '')}" placeholder="e.g. 🌸" maxlength="4" />
        </div>
        <div class="form-group full">
          <label>Short bio</label>
          <textarea class="form-control" name="m${i}_bio" style="min-height:70px;">${esc(mem.bio || '')}</textarea>
        </div>
      </div>
    </div>`;

  content.innerHTML = `
    <div class="notice">Edit your About Us page here. Changes show up on the public site right away.</div>
    <form class="form-card" id="aboutForm">
      <div class="form-group">
        <label>Page heading</label>
        <input class="form-control" name="heading" value="${esc(a.heading || '')}" placeholder="About Us" />
      </div>
      <div class="form-group">
        <label>Intro <span class="hint">(short line shown at the top)</span></label>
        <textarea class="form-control" name="intro" style="min-height:60px;">${esc(a.intro || '')}</textarea>
      </div>
      <div class="form-group">
        <label>Our mission</label>
        <textarea class="form-control" name="mission" style="min-height:100px;">${esc(a.mission || '')}</textarea>
      </div>

      <h2 style="color:var(--navy); font-size:1.15rem; margin:8px 0 16px;">Meet the Team (3 Girl Scouts)</h2>
      ${[0, 1, 2].map(i => member(i, m[i])).join('')}

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Save About page</button>
        <a class="btn btn-ghost" href="index.html#/about" target="_blank">Preview page ↗</a>
      </div>
    </form>`;

  document.getElementById('aboutForm').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const get = k => (fd.get(k) || '').toString().trim();
    const members = [0, 1, 2].map(i => ({
      name: get(`m${i}_name`),
      role: get(`m${i}_role`),
      emoji: get(`m${i}_emoji`),
      bio: get(`m${i}_bio`),
    }));
    Store.saveAbout({
      heading: get('heading'),
      intro: get('intro'),
      mission: get('mission'),
      members,
    });
    alert('About page saved! 🎉');
    viewAbout();
  });
}

// ---------- boot ----------
if (isLoggedIn()) showApp();
