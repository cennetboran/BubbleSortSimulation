const container = document.querySelector(".data-container");

function generateBlocks(num = 20) {
  if (num && typeof num !== "number") {
    alert("First argument must be a typeof Number");
    return;
  }
  for (let i = 0; i < num; i += 1) {
    const value = Math.floor(Math.random() * 100);

    const block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${value * 3}px`;
    block.style.transform = `translateX(${i * 30}px)`;

    const blockLabel = document.createElement("label");
    blockLabel.classList.add("block__id");
    blockLabel.innerHTML = value;

    block.appendChild(blockLabel);
    container.appendChild(block);
  }
}

function reset(){
    
    while(container.firstChild){
        container.removeChild(container.lastChild);
    }
    generateBlocks();
    
}

function swap(el1, el2) {
  return new Promise(resolve => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");

    el1.style.transform = transform2;
    el2.style.transform = transform1;

    // Wait for the transition to end!
    window.requestAnimationFrame(function() {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 250);
    });
  });
}

async function bubbleSort(delay = 100) {
    let done = false
  if (delay && typeof delay !== "number") {
    alert("sort: First argument must be a typeof Number");
    return;
  }
  let blocks = document.querySelectorAll(".block");
  for (let i = 0; i < blocks.length - 1; i += 1) {
    for (let j = 0; j < blocks.length - i - 1; j += 1) {
      blocks[j].style.backgroundColor = "#F4A896";
      blocks[j + 1].style.backgroundColor = "#F4A896";

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      const value1 = Number(blocks[j].childNodes[0].innerHTML);
      const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

      if (value1 > value2) {
        await swap(blocks[j], blocks[j + 1]);
        blocks = document.querySelectorAll(".block");
        done = true
      }

      blocks[j].style.backgroundColor = "#ff5f77";
      blocks[j + 1].style.backgroundColor = "#ff5f77";
    }

    blocks[blocks.length - i - 1].style.backgroundColor = "#F4A896";
  }
  if(done == true){
    bubbleSort();
  }
  
}
function complexity(){
    let blocks = document.querySelectorAll(".block");
    let ln = blocks.length;
	let krmTxt = document.getElementById('complexity');
	let arr = (((ln -  1)*ln)/2);
	let complex = arr;
	let txt = "C(n) = "+arr+
	"<br>= "+complex+
	"<br>Karşılaştırma Sayısı = "+Math.floor(ln*ln/2)+
	"<br>Yer Değiştirme Sayısı = "+ln+
	"<br>O(n) = "+ln*ln+"= O(n) = (n*n)";
	krmTxt.innerHTML = txt;
}

generateBlocks();
