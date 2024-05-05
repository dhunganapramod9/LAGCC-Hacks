function submit() {
  if (document.getElementById("career").selectedIndex == 0) {
    location.href = "science.html";
	} else if (document.getElementById("career").selectedIndex == 1) {
    location.href = "tech_eng.html";
  } else if (document.getElementById("career").selectedIndex == 2){
    location.href = "math.html";
	}
}

function p1() {
  const el = document.getElementById("p1");
  el.classList.toggle('expanded');
  el.classList.toggle('collapsed');
}

function p2() {
  const el = document.getElementById("p2");
  el.classList.toggle('expanded');
  el.classList.toggle('collapsed');
}

function p3() {
  const el = document.getElementById("p3");
  el.classList.toggle('expanded');
  el.classList.toggle('collapsed');
}


var S_cntr = 0;
var TE_cntr = 0;
var M_cntr = 0;

function calculate() {
  if (document.getElementById("Q1").selectedIndex == 1) {
    M_cntr += 1;
  } else if (document.getElementById("Q1").selectedIndex == 2) {
    S_cntr += 1;
  } else if (document.getElementById("Q1").selectedIndex == 3) {
    TE_cntr += 1;
  }

  if (document.getElementById("Q2").selectedIndex == 1) {
    M_cntr += 1;
  } else if (document.getElementById("Q2").selectedIndex == 2) {
    S_cntr += 1;
  } else if (document.getElementById("Q2").selectedIndex == 3) {
    TE_cntr += 1;
  }

  if (document.getElementById("Q3").selectedIndex == 1) {
    M_cntr += 1;
  } else if (document.getElementById("Q3").selectedIndex == 2) {
    S_cntr += 1;
  } else if (document.getElementById("Q3").selectedIndex == 3) {
    TE_cntr += 1;
  }

  if (document.getElementById("Q4").selectedIndex == 1) {
    M_cntr += 1;
  } else if (document.getElementById("Q4").selectedIndex == 2) {
    S_cntr += 1;
  } else if (document.getElementById("Q4").selectedIndex == 3) {
    TE_cntr += 1;
  }

    if (document.getElementById("Q5").selectedIndex == 1) {
    M_cntr += 1;
  } else if (document.getElementById("Q5").selectedIndex == 2) {
    S_cntr += 1;
  } else if (document.getElementById("Q5").selectedIndex == 3) {
    TE_cntr += 1;
  }

  if (document.getElementById("Q6").selectedIndex == 1) {
    M_cntr += 1;
  } else if (document.getElementById("Q6").selectedIndex == 2) {
    S_cntr += 1;
  } else if (document.getElementById("Q6").selectedIndex == 3) {
    TE_cntr += 1;
  }

  if (document.getElementById("Q7").selectedIndex == 1) {
    M_cntr += 1;
  } else if (document.getElementById("Q7").selectedIndex == 2) {
    S_cntr += 1;
  } else if (document.getElementById("Q7").selectedIndex == 3) {
    TE_cntr += 1;
  }

  if (document.getElementById("Q8").selectedIndex == 1) {
    M_cntr += 1;
  } else if (document.getElementById("Q8").selectedIndex == 2) {
    S_cntr += 1;
  } else if (document.getElementById("Q8").selectedIndex == 3) {
    TE_cntr += 1;
  }

  if (document.getElementById("Q9").selectedIndex == 1) {
    M_cntr += 1;
  } else if (document.getElementById("Q9").selectedIndex == 2) {
    S_cntr += 1;
  } else if (document.getElementById("Q9").selectedIndex == 3) {
    TE_cntr += 1;
  }

  if (S_cntr > M_cntr || S_cntr > TE_cntr) {
    location.href = "science.html";
  } else if (M_cntr > S_cntr || M_cntr > TE_cntr) {
    location.href = "math.html";
  } else if (TE_cntr > S_cntr || TE_cntr > M_cntr) {
    location.href = "tech_eng.html";
  } else if (S_cntr == 0 && M_cntr == 0 && TE_cntr == 0) {
    alert("Please answer the questions!");
  } else { // cntrs are tied
    location.href = "tech_eng.html";
  }
  
}

function CCintern(){
	location.href =" https://www.cuny.edu/about/administration/offices/ocip/students/careerlaunch/";
}

function MMintern(){
	location.href = "https://www.linkedin.com/jobs/view/3894464535/?alternateChannel=search&refId=GGnlZsLxk5czCmT4FZMFqw%3D%3D&trackingId=MIEPlAqlvO0nqC7IAKlaeg%3D%3D";
}

function MSIntern(){
	location.href = "https://www.linkedin.com/jobs/view/3910635594/?alternateChannel=search&refId=GGnlZsLxk5czCmT4FZMFqw%3D%3D&trackingId=w41f%2B7OumgrRnhe23ditaQ%3D%3D";
}

function RefugeeIntern(){
	location.href = "https://www.google.com/search?q=assylum+seeker+internship&sca_esv=e7989b0919315ea7&sca_upv=1&rlz=1C1ONGR_enUS1021US1021&sxsrf=ADLYWILwoWIanlK6Z0ZrniCVHgD55lqgsA:1714894162482&ei=UjU3ZtGCHdiIwbkPieuDkAs&uact=5&oq=assylum+seeker+internship&gs_lp=Egxnd3Mtd2l6LXNlcnAiGWFzc3lsdW0gc2Vla2VyIGludGVybnNoaXAyBhAAGBYYHjIGEAAYFhgeMgsQABiABBiGAxiKBTILEAAYgAQYhgMYigUyCxAAGIAEGIYDGIoFMgsQABiABBiGAxiKBTILEAAYgAQYhgMYigUyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRI5CxQqQJYtCpwAXgBkAEAmAGrAaABuAyqAQQwLjExuAEDyAEA-AEBmAIMoAL4DMICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgIHECMYsQIYJ8ICBxAAGIAEGArCAgoQABiABBhDGIoFwgIHEAAYgAQYDcICCBAAGBYYHhgPmAMA4gMFEgExIECIBgGQBgqSBwQxLjExoAe_Zg&sclient=gws-wiz-serp&ibp=htl;jobs&sa=X&ved=2ahUKEwiuwJvP_vWFAxVuRjABHW23AoEQkd0GegQIHBAB#fpstate=tldetail&htivrt=jobs&htiq=assylum+seeker+internship&htidocid=ie-zVjbfim2tVuPXAAAAAA%3D%3D";
}