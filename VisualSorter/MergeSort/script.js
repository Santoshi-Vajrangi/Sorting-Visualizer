let container = document.getElementById("container");
let arr = [];

function generateArray() {
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

async function MergeSort() {
    let blocks = document.querySelectorAll('.block');
    await mergeSort(arr, blocks, 0, arr.length - 1);

    displayMessage("Sorting is complete!");
}

async function mergeSort(arr, blocks, left, right) {
    if (left < right) {
        await new Promise(resolve => setTimeout(resolve, 500));
        await displayMessage(`Dividing array from index ${left} to ${right}`);

        let mid = Math.floor((left + right) / 2);

        await mergeSort(arr, blocks, left, mid);
        await mergeSort(arr, blocks, mid + 1, right);

        await merge(arr, blocks, left, mid, right);
    }
}

async function merge(arr, blocks, left, mid, right) {
    let p = mid - left + 1;
    let q = right - mid;

    let L = new Array(p);
    let R = new Array(q);

    for (let i = 0; i < p; i++) {
        L[i] = arr[left + i];
    }
    for (let j = 0; j < q; j++) {
        R[j] = arr[mid + 1 + j];
    }

    displayMessage(`Merging subarray from index ${left} to ${right}`);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < p && j < q) {
        blocks[k].style.backgroundColor = "#13CE66";
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (L[i] <= R[j]) {
            arr[k] = L[i];
            blocks[k].style.height = `${arr[k] * 3.4}px`;

            let label2 = blocks[k].querySelector(".block_id");
            label2.innerText = L[i];

            await new Promise((resolve) => setTimeout(resolve, 400));
            i++;
        } else {
            arr[k] = R[j];
            blocks[k].style.height = `${arr[k] * 3.4}px`;

            let label2 = blocks[k].querySelector(".block_id");
            label2.innerText = R[j];

            await new Promise((resolve) => setTimeout(resolve, 400));
            j++;
        }
        k++;
    }
    blocks[k].style.backgroundColor = "#13CE66";
    while (i < p) {

        arr[k] = L[i];
        blocks[k].style.height = `${arr[k] * 3.4}px`;

        let label2 = blocks[k].querySelector(".block_id");
        label2.innerText = L[i];

        await new Promise((resolve) => setTimeout(resolve, 400));
        i++;
        k++;
    }

    while (j < q) {
        arr[k] = R[j];
        blocks[k].style.height = `${arr[k] * 3.4}px`;

        let label2 = blocks[k].querySelector(".block_id");
        label2.innerText = R[j];

        await new Promise((resolve) => setTimeout(resolve, 400));
        j++;
        k++;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    await displayMessage(`Merging of subarray from index ${left} to ${right} is complete`);
}

async function displayMessage(message) {
    let messageBox = document.getElementById("message");
    messageBox.innerText = message;
}

generateArray();

setTimeout(() => {
    MergeSort();
}, 2000);

