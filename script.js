function showTab(tab){

document.querySelectorAll(".tab").forEach(t=>{
t.style.display="none"
})

document.getElementById(tab).style.display="block"

}

showTab("gauss")


/* MATRIX GRID */

const matrix=document.getElementById("matrix")

for(let i=0;i<3;i++){

for(let j=0;j<4;j++){

let input=document.createElement("input")
input.type="number"
input.id=`m${i}${j}`
input.style.width="60px"

matrix.appendChild(input)

}

matrix.appendChild(document.createElement("br"))

}


/* DARK MODE */

function toggleTheme(){

document.body.classList.toggle("dark")

}


/* GAUSS */

function solveGauss(){

let m=[]
let steps=""

for(let i=0;i<3;i++){

m[i]=[]

for(let j=0;j<4;j++){

m[i][j]=parseFloat(document.getElementById(`m${i}${j}`).value)

}

}

for(let i=0;i<3;i++){

let pivot=m[i][i]

for(let j=0;j<4;j++)
m[i][j]/=pivot

steps+="Normalize Row "+(i+1)+"\n"

for(let k=0;k<3;k++){

if(k!=i){

let factor=m[k][i]

for(let j=0;j<4;j++)
m[k][j]-=factor*m[i][j]

}

}

}

document.getElementById("gaussSteps").innerText=steps

document.getElementById("gaussResult").innerText=

"x="+m[0][3].toFixed(3)+
"  y="+m[1][3].toFixed(3)+
"  z="+m[2][3].toFixed(3)

}



/* NEWTON */

function newtonInterpolation(){

let x=document.getElementById("xValues").value.split(",").map(Number)
let y=document.getElementById("yValues").value.split(",").map(Number)
let xt=parseFloat(document.getElementById("targetX").value)

let result=y[0]

document.getElementById("newtonResult").innerText="Result = "+result

new Chart(document.getElementById("interpGraph"),{

type:"scatter",

data:{
datasets:[{

label:"Data Points",

data:x.map((v,i)=>({x:v,y:y[i]})),

backgroundColor:"red",
borderColor:"red",

pointRadius:6

}]
},

options:{
plugins:{
legend:{
labels:{
color:"white"
}
}
},

scales:{
x:{
ticks:{color:"white"},
grid:{color:"rgba(255,255,255,0.2)"}
},

y:{
ticks:{color:"white"},
grid:{color:"rgba(255,255,255,0.2)"}
}
}

}

})}


/* EULER */

function eulerMethod(){

let eq=document.getElementById("equation").value

let x=parseFloat(document.getElementById("x0").value)
let y=parseFloat(document.getElementById("y0").value)

let h=parseFloat(document.getElementById("h").value)
let xn=parseFloat(document.getElementById("xn").value)

let xs=[]
let ys=[]

let table=document.getElementById("eulerTable")

table.innerHTML="<tr><th>Step</th><th>x</th><th>y</th></tr>"

let step=0

while(x<=xn){

xs.push(x)
ys.push(y)

table.innerHTML+=`<tr><td>${step}</td><td>${x}</td><td>${y}</td></tr>`

let f=eval(eq)

y=y+h*f
x=x+h
step++

}

new Chart(document.getElementById("eulerGraph"),{

type:"line",

data:{
labels:xs,

datasets:[{
label:"Euler Approximation",
data:ys,

borderColor:"red",
backgroundColor:"red",

fill:false,
tension:0.3
}]
},

options:{
plugins:{
legend:{
labels:{
color:"white"
}
}
},

scales:{
x:{
ticks:{color:"white"},
grid:{color:"rgba(255,255,255,0.2)"}
},

y:{
ticks:{color:"white"},
grid:{color:"rgba(255,255,255,0.2)"}
}
}

}

})}


/* EXPORT PDF */

function exportPDF(){

const { jsPDF } = window.jspdf;

let doc = new jsPDF();

let y = 20;

/* TITLE */

doc.setFontSize(18);
doc.text("Numerical Methods Calculator Results",20,y);

y += 15;

/* GAUSS RESULT */

let gauss = document.getElementById("gaussResult").innerText;

if(gauss){
doc.setFontSize(14);
doc.text("Gauss Jordan Solution:",20,y);
y += 10;
doc.setFontSize(12);
doc.text(gauss,20,y);
y += 15;
}

/* NEWTON RESULT */

let newton = document.getElementById("newtonResult").innerText;

if(newton){
doc.setFontSize(14);
doc.text("Newton Interpolation Result:",20,y);
y += 10;
doc.setFontSize(12);
doc.text(newton,20,y);
y += 15;
}

/* EULER TABLE */

let table = document.getElementById("eulerTable");

if(table){

doc.setFontSize(14);
doc.text("Euler Method Iterations:",20,y);
y += 10;

for(let i=1;i<table.rows.length;i++){

let row = table.rows[i];

let text =
row.cells[0].innerText + "   " +
row.cells[1].innerText + "   " +
row.cells[2].innerText;

doc.setFontSize(12);
doc.text(text,20,y);

y += 8;

if(y > 280){
doc.addPage();
y = 20;
}

}

}

doc.save("Numerical_Methods_Result.pdf");

}
