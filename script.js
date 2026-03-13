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
label:"Points",
data:x.map((v,i)=>({x:v,y:y[i]})),
pointRadius:6
}]
}

})

}


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
fill:false,
tension:0.3
}]
}

})

}


/* EXPORT PDF */

function exportPDF(){

const { jsPDF } = window.jspdf

let doc=new jsPDF()

doc.text("Numerical Methods Result",20,20)

doc.save("result.pdf")

}