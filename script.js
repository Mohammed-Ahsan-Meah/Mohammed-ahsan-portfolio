fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // ================= HERO =================
    const nameEl = document.getElementById('name');
    const careerEl = document.getElementById('careerObjective');

    // Typing effect for name
    let i = 0;
    const nameText = data.name;
    function typeName() {
      if (i < nameText.length) {
        nameEl.textContent += nameText[i];
        i++;
        setTimeout(typeName, 100); // speed
      }
    }
    typeName();

    // Animated subtitle fade-in
    careerEl.textContent = data.careerObjective;
    careerEl.style.opacity = 0;
    setTimeout(() => {
      careerEl.style.transition = "opacity 1.5s ease-in-out";
      careerEl.style.opacity = 1;
    }, 800);

    // ================= CONTACT =================
    const contactDiv = document.querySelector('.contact-cards');
    contactDiv.innerHTML = ''; // clear old content
    [
      {icon: 'fas fa-envelope', value: data.email, hover: '#FF6EC7'},
      {icon: 'fas fa-phone', value: data.contact.join(', '), hover: '#6EFFA1'},
      {icon: 'fas fa-location-dot', value: data.address, hover: '#58A6FF'}
    ].forEach(item => {
      const card = document.createElement('div');
      card.className = 'contact-card';
      card.innerHTML = `<i class="${item.icon}"></i><span>${item.value}</span>`;

      // Neon glow animation on hover
      card.addEventListener('mouseover', () => {
        card.style.boxShadow = `0 0 40px ${item.hover}, 0 0 80px ${item.hover}50`;
      });
      card.addEventListener('mouseout', () => {
        card.style.boxShadow = '0 0 20px rgba(88,166,255,0.2)';
      });

      contactDiv.appendChild(card);
    });

    // ================= PERSONAL INFO =================
    const personalDiv = document.getElementById('personalInfo');
    personalDiv.innerHTML = '';
    Object.keys(data.personalInfo).forEach(key => {
      const card = document.createElement('div');
      card.className = 'card futuristic-card';
      card.innerHTML = `<h3><i class="fas fa-user"></i> ${key}</h3><p>${data.personalInfo[key]}</p>`;
      personalDiv.appendChild(card);
    });

    // ================= EDUCATION =================
    const eduDiv = document.getElementById('educationCards');
    eduDiv.innerHTML = '';
    data.education.forEach(edu => {
      const card = document.createElement('div');
      card.className = 'card futuristic-card';
      card.innerHTML = `
        <h3><i class="fas fa-graduation-cap"></i> ${edu.degree}</h3>
        <p><strong>Institute:</strong> ${edu.institute}</p>
        <p><strong>Major/Subjects:</strong> ${edu.major || edu.subjects.join(', ')}</p>
        <p><strong>Passing Year:</strong> ${edu.passingYear}</p>
        <p><strong>Result:</strong> ${edu.result}</p>`;
      eduDiv.appendChild(card);
    });

    // ================= EXPERIENCE =================
    const expDiv = document.getElementById('experienceCards');
    expDiv.innerHTML = '';
    data.experience.forEach(exp => {
      const card = document.createElement('div');
      card.className = 'card futuristic-card';
      card.innerHTML = `
        <h3><i class="fas fa-briefcase"></i> ${exp.position}</h3>
        <p><strong>Company:</strong> ${exp.company}</p>
        <p><strong>Duration:</strong> ${exp.duration}</p>
        <p><strong>Location:</strong> ${exp.location}</p>
        <p><strong>Achievements:</strong> ${exp.achievement.join(', ')}</p>`;
      expDiv.appendChild(card);
    });

    // ================= SKILLS =================
    const skillsDiv = document.getElementById('skillsList');
    skillsDiv.innerHTML = '';
    data.skills.forEach(skill => {
      const div = document.createElement('div');
      div.className = 'skill futuristic-skill';
      div.innerHTML = `<i class="fas fa-check-circle"></i> ${skill}`;

      // Animated neon glow for skills
      div.addEventListener('mouseover', () => {
        div.style.boxShadow = '0 0 25px #58A6FF, 0 0 50px #79C0FF';
        div.querySelector('i').style.transform = 'scale(1.4) rotate(10deg)';
      });
      div.addEventListener('mouseout', () => {
        div.style.boxShadow = '0 0 10px rgba(88,166,255,0.3)';
        div.querySelector('i').style.transform = 'scale(1) rotate(0deg)';
      });

      skillsDiv.appendChild(div);
    });
  });