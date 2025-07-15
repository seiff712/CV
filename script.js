document.getElementById('cvForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const skills = document.getElementById('skills').value.split(',');
  const experience = document.getElementById('experience').value;
  const education = document.getElementById('education').value;
  const profilePic = document.getElementById('profilePic').files[0];

  document.getElementById('cvName').textContent = name;
  document.getElementById('cvTitle').textContent = title;
  document.getElementById('cvEmail').textContent = '📧 ' + email;
  document.getElementById('cvPhone').textContent = '📞 ' + phone;
  document.getElementById('cvExperience').textContent = experience;
  document.getElementById('cvEducation').textContent = education;

  const skillsList = document.getElementById('cvSkills');
  skillsList.innerHTML = '';
  skills.forEach(skill => {
    const parts = skill.split(':');
    const skillName = parts[0].trim();
    const level = parseInt(parts[1]) || 70;
    const li = document.createElement('li');
    li.innerHTML = `
      <div>${skillName}</div>
      <div class="skill-bar">
        <div class="skill-bar-fill" style="width: ${level}%;">${level}%</div>
      </div>
    `;
    skillsList.appendChild(li);
  });

  if (profilePic) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('cvImage').src = e.target.result;
    };
    reader.readAsDataURL(profilePic);
  }

  document.getElementById('cvDisplay').classList.remove('hidden');
});

// Dark mode toggle
const toggleBtn = document.getElementById('toggleMode');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load theme on start
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  toggleBtn.textContent = '☀️ Light Mode';
}
