let container = document.getElementById("container");
let arr = [];
let swaps = 0;

function generateArray() {
    // Filling array with random values
    for (let i = 0; i < 25; i++) {
        let value = Number(Math.ceil(Math.random() * 100));
        arr.push(value);
    }

    for (let i = 0; i < 25; i++) {
        let value = arr[i];

        let arrElement = document.createElement("div");
        arrElement.classList.add("block");
        arrElement.style.height = `${value * 3.4}px`;
        arrElement.style.transform = `translate(${i * 30}px)`;

        let array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;

        arrElement.appendChild(array_ele_label);
        container.appendChild(arrElement);
    }
}
function clearExplanation() {
    document.getElementById("explaination").innerText = "";
    document.querySelector('.pivotDiv').innerText = "";
}

async function QuickSort() {
    let blocks = document.querySelectorAll('.block');
    await quickSort(arr, blocks, 0, arr.length - 1);
    clearExplanation();

    let completeMessage = document.createElement("div");
    completeMessage.classList.add("info");
    completeMessage.innerText = "Sorting complete !";
    container.appendChild(completeMessage);
}

async function quickSort(arr, blocks, left, right) {
    let loc;
    if (left < right) {
        loc = await partition(arr, blocks, left, right);
        await quickSort(arr, blocks, left, loc - 1);
        await quickSort(arr, blocks, loc + 1, right);
    }
}

async function swap(arr, blocks, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    blocks[i].classList.add("swapping");
    blocks[j].classList.add("swapping");

    blocks[i].style.height = `${arr[i] * 3.4}px`;
    blocks[j].style.height = `${arr[j] * 3.4}px`;

    let label1 = blocks[i].querySelector('.block_id');
    let label2 = blocks[j].querySelector('.block_id');
    let tempLabel = label1.innerText;
    label1.innerText = label2.innerText;
    label2.innerText = tempLabel;

    blocks[i].style.transform = `translateX(${i * 30}px)`;
    blocks[j].style.transform = `translateX(${j * 30}px)`;

    document.getElementById("explaination").innerText = `Swapping ${arr[i]} with ${arr[j]}`;

    await new Promise(resolve => setTimeout(resolve, 400));

    blocks[i].classList.remove("swapping");
    blocks[j].classList.remove("swapping");

    await new Promise(resolve => setTimeout(resolve, 100));

    blocks[i].style.backgroundColor = '#c2b2fb';
    blocks[j].style.backgroundColor = '#c2b2fb';
}

async function partition(arr, blocks, left, right) {
    let pivotDiv = document.querySelector('.pivotDiv');
    let pivot = arr[right];

    for (let k = left; k <= right; k++) {
        blocks[k].style.backgroundColor = '#c2b2fb';
    }

    blocks[right].style.backgroundColor = 'yellow'; // Highlight the pivot

    pivotDiv.innerText = "Pivot element: " + pivot;

    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i = i + 1;
            await swap(arr, blocks, i, j);
        }
    }
    await swap(arr, blocks, i + 1, right);

    // Reset colors after partitioning
    for (let k = left; k <= right; k++) {
        if (k !== i + 1) {
            blocks[k].style.backgroundColor = '#c2b2fb';
        }
    }

    // Resetting pivot color
    blocks[right].style.backgroundColor = '#c2b2fb';

    return i + 1;
}

generateArray();

setTimeout(() => {
    QuickSort();
}, 2000);
