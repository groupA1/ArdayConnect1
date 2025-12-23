function showPage(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        window.scrollTo(0, 0);
    }

    let subjectsList = [];

    function addSubject() {
        let name = document.getElementById('subName').value;
        let max = parseFloat(document.getElementById('maxMarks').value);
        let obt = parseFloat(document.getElementById('obtMarks').value);

        if (!name || isNaN(max) || isNaN(obt)) {
            alert("Fadlan buuxi meelaha bannaan!");
            return;
        }
        if (obt > max) {
            alert("Khalad! Dhibcaha keentay ma ka badnaan karaan dhibcaha guud!");
            return;
        }
        if (obt < 0) {
            alert("Khalad! Ma gelin kartid tiro ka yar eber!");
            return;
        }

        let percent = (obt / max) * 100;
        let grade, gpa;

        if (percent >= 90) { grade="A+"; gpa=4.0; }
        else if (percent >= 80) { grade="A"; gpa=3.7; }
        else if (percent >= 70) { grade="B"; gpa=3.0; }
        else if (percent >= 60) { grade="C"; gpa=2.0; }
        else if (percent >= 50) { grade="D"; gpa=1.0; }
        else { grade="F"; gpa=0.0; }

        subjectsList.push({id:Date.now(), name, max, obt, percent, grade, gpa});
        document.getElementById('subName').value = "";
        document.getElementById('obtMarks').value = "";
        render();
    }

    function render() {
        const body = document.getElementById('historyBody');
        body.innerHTML = "";
        subjectsList.forEach(s => {
            body.innerHTML += `
                <tr>
                    <td><b>${s.name}</b></td>
                    <td>${s.obt}/${s.max}</td>
                    <td>${s.percent.toFixed(1)}%</td>
                    <td>${s.grade}</td>
                    <td><b>${s.gpa.toFixed(2)}</b></td>
                    <td><button onclick="deleteSubject(${s.id})" style="color:var(--danger); border:none; background:none; cursor:pointer; font-weight:600;">Delete</button></td>
                </tr>`;
        });
        updateSummary();
    }

    function deleteSubject(id) {
        subjectsList = subjectsList.filter(s => s.id !== id);
        render();
    }

    function updateSummary() {
        const panel = document.getElementById('summaryPanel');
        if(subjectsList.length === 0) {
            panel.style.display = "none";
            return;
        }
        
        let tp=0, tg=0;
        subjectsList.forEach(s => { tp += s.percent; tg += s.gpa; });
        let avg = tp / subjectsList.length;
        let fg = tg / subjectsList.length;

        document.getElementById('finalPercent').innerText = avg.toFixed(1) + "%";
        document.getElementById('finalGPA').innerText = fg.toFixed(2);
        document.getElementById('finalGrade').innerText = avg>=90?"A+":avg>=80?"A":avg>=70?"B":avg>=60?"C":avg>=50?"D":"F";
        panel.style.display = "flex";
        panel.style.flexWrap = "wrap";
    }

    function resetAll() {
        if(confirm("Ma hubtaa inaad tirtirto dhammaan xogta?")) {
            subjectsList = [];
            render();
        }
    }