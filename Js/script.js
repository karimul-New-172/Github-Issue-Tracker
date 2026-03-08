const allBtns = document.querySelectorAll('.btns .btn');
const allBtn = document.getElementById('btn-all');
const openBtn = document.getElementById('btn-open');
const closeBtn = document.getElementById('btn-close');

const issueCount = document.getElementById('issue-count');

const cardContainer = document.getElementById('card-container');

// reusable function for create element for an array
const createElement = (arr) => {
    const htmlElements = arr.map(el => `<span class="bg-yellow-400 rounded-2xl px-3 py-1">${el}</span>`);
    return htmlElements.join(' ');
}

// for btn togglink
allBtn.addEventListener('click', () => {
    allBtns.forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-soft', 'text-[#64748B]');
        allBtn.classList.remove('btn-soft', 'text-[#64748B]');
        allBtn.classList.add('btn-primary', 'text-white');
    })

    // for modal function
    const loadIssueDetails = (id) => {
        // console.log(id);
        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
            .then(res => res.json())
            .then(data => displayIssueDetails(data.data))
    }

    const displayIssueDetails = (data) => {
        const detailsContainer = document.getElementById('details-container');
        detailsContainer.innerHTML = `
            <h3 class="text-2xl font-semibold">${data.title}</h3>
            <div>
                <span class="bg-green-400 text-white px-3 py-1 rounded-2xl">${data.status}</span>
                 . 
                <span class="text-[#64748B]">${data.author}</span>
                 . 
                <span class="text-[#64748B]">${new Date(data.createdAt).toLocaleDateString('en-US')}</span>
            </div>
            <div>${createElement(data.labels)}</div>
            <p class="text-[#64748B]">${data.description}</p>
            <div class="bg-[#fbfbfb] p-4 rounded-xl flex justify-between">
                <div class="l-div">
                    <p class="text-[#64748B]">Assignee:</p>
                    <p>${data.author}</p>
                </div>
                <div class="r-div">
                    <p class="text-[#64748B]">Priority:</p>
                    <p class="bg-red-400 text-white px-3 py-1 rounded-2xl">${data.priority}</p>
                </div>
            </div>
        `
        document.getElementById('issue_modal').showModal();
    }

    const loadAllCards = async () => {
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const jsonData = await res.json();
        displayCards(jsonData.data);
    }
    const displayCards = (cards) => {
        issueCount.innerText = cards.length;
        // {
        // "id": 45,
        // "title": "Search results pagination broken",
        // "description": "Pagination controls don't work on search results page. Only first page is accessible.",
        // "status": "open",
        // "labels": [
        //     "bug"
        // ],
        // "priority": "medium",
        // "author": "page_paul",
        // "assignee": "emma_ui",
        // "createdAt": "2024-01-24T13:45:00Z",
        // "updatedAt": "2024-01-24T13:45:00Z"
        // }
        cardContainer.innerHTML = "";
        cards.forEach(card => {
            // console.log(card);
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card max-w-96 p-5 bg-white shadow-lg rounded-lg space-y-5';
            cardDiv.onclick = () => loadIssueDetails(card.id);
            if (card.status === "open") {
                cardDiv.classList.add('border-t-4', 'border-green-500');
            } else {
                cardDiv.classList.add('border-t-4', 'border-purple-500');
            }
            cardDiv.innerHTML = `
                <div  class="flex justify-between items-center">
                    <img src="./assets/Open-Status.png" alt="">
                    <span class="bg-red-200 text-red-500 px-6 py-1 rounded-2xl">${card.priority}</span>
                </div>
                <h3 class="text-2xl font-semibold">${card.title}</h3>
                <p class="text-[#64748B]">${card.description}</p>
                <div class="space-x-2">${createElement(card.labels)}</div>
                <div class="border border-gray-100"></div>
                <p class="text-[#64748B]">#1 by ${card.author}</p>
                <p class="text-[#64748B]">${new Date(card.createdAt).toLocaleDateString('en-US')}</p>
            `
            cardContainer.appendChild(cardDiv);
        })
    }
    loadAllCards();
})

openBtn.addEventListener('click', () => {
    allBtns.forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-soft', 'text-[#64748B]');
        openBtn.classList.remove('btn-soft', 'text-[#64748B]');
        openBtn.classList.add('btn-primary', 'text-white');
    })
})

closeBtn.addEventListener('click', () => {
    allBtns.forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-soft', 'text-[#64748B]');
        closeBtn.classList.remove('btn-soft', 'text-[#64748B]');
        closeBtn.classList.add('btn-primary', 'text-white');
    })
})

