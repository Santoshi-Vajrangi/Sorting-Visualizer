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

async function SelectionSort() {
    let swapsDisplay = document.createElement("div");
    swapsDisplay.classList.add("swaps");
    container.appendChild(swapsDisplay);

    let blocks = document.querySelectorAll('.block');
    for (let i = 0; i < arr.length - 1; i++) {
        let min_index = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min_index]) {
                min_index = j;
            }
        }
        swaps++;
        if (min_index != i) //swapping only when the min_index has changed
        {
            blocks[i].style.backgroundColor = "#f5187f";
            blocks[min_index].style.backgroundColor = "#f5187f";
            await new Promise(resolve => setTimeout(resolve, 500));

            let temp = arr[i];
            arr[i] = arr[min_index];
            arr[min_index] = temp;

            // Update the heights of bars
            blocks[i].style.height = `${arr[i] * 3.4}px`;
            blocks[min_index].style.height = `${arr[min_index] * 3.4}px`;

            let label1 = blocks[i].querySelector(".block_id");
            let label2 = blocks[min_index].querySelector(".block_id");
            let tempLabel = label1.innerText;
            label1.innerText = label2.innerText;
            label2.innerText = tempLabel;

            blocks[i].style.transform = `translate(${i * 30}px)`;
            blocks[min_index].style.transform = `translate(${min_index * 30}px)`;


            blocks[i].style.backgroundColor = "#13CE66";
            blocks[min_index].style.backgroundColor = "#c7b2fb";

            swapsDisplay.innerText = `Iteration: ${i + 1} | Total number of swaps made: ${swaps}`;
            await new Promise(resolve => setTimeout(resolve, 800));
        }
        else {
            await new Promise(resolve => setTimeout(resolve, 400));
            blocks[i].style.backgroundColor = "#13CE66";
        }
    }

    // Change the color of blocks to green after sorting
    for (let k = 0; k < arr.length; k++) {
        blocks[k].style.backgroundColor = "#13CE66";
    }

    let completeMessage = document.createElement("div");
    completeMessage.classList.add("info");
    completeMessage.innerText = "Sorting complete !";
    container.appendChild(completeMessage);
}

generateArray();

setTimeout(() => {
    SelectionSort();
}, 2000);
