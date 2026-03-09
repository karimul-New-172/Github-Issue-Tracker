const allBtns = document.querySelectorAll('.btns .btn');
const allBtn = document.getElementById('btn-all');
const openBtn = document.getElementById('btn-open');
const closeBtn = document.getElementById('btn-close');

const issueCount = document.getElementById('issue-count');

const issueContainer = document.getElementById('issue-container');

//count array
const openCount = [];
const closeCount = [];

// reusable function for create element for an array
const createElement = (arr) => {
    const htmlElements = arr.map(el => `<span class="bg-yellow-400 rounded-2xl px-3 py-1">${el}</span>`);
    return htmlElements.join(' ');
}

// reusable function for spinner
function showSpinner() {
    document.getElementById('issue-container').classList.add('hidden');
    document.getElementById('spinner').classList.remove('hidden');
}

const hideSpinner = () => {
    document.getElementById('spinner').classList.add('hidden');
    document.getElementById('issue-container').classList.remove('hidden');
}

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
                    <p class="text-xl font-semibold">${data.author}</p>
                </div>
                <div class="r-div">
                    <p class="text-[#64748B]">Priority:</p>
                    <p class="bg-red-400 text-white px-3 py-1 rounded-2xl">${data.priority}</p>
                </div>
            </div>
        `
    document.getElementById('issue_modal').showModal();
}

const loadAllData = async () => {
    showSpinner();
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const jsonData = await res.json();
    displayAllData(jsonData.data);
}

const displayAllData = (issues) => {
    issueContainer.innerHTML = "";
    issueCount.innerText = issues.length;
    issues.forEach(issue => {
        const issueDiv = document.createElement('div');
        issueDiv.className = 'card max-w-96 p-5 bg-white shadow-lg rounded-lg space-y-5';
        issueDiv.onclick = () => loadIssueDetails(issue.id);
        if (issue.status === "open") {
            issueDiv.classList.add('border-t-4', 'border-green-500');
        } else {
            issueDiv.classList.add('border-t-4', 'border-purple-500');
        }
        issueDiv.innerHTML = `
                <div  class="flex justify-between items-center">
                    <img src="./assets/Open-Status.png" alt="">
                    <span class="bg-red-200 text-red-500 px-6 py-1 rounded-2xl">${issue.priority}</span>
                </div>
                <h3 class="text-2xl font-semibold">${issue.title}</h3>
                <p class="text-[#64748B]">${issue.description}</p>
                <div class="space-x-2">${createElement(issue.labels)}</div>
                <div class="border border-gray-100"></div>
                <p class="text-[#64748B]">#1 by ${issue.author}</p>
                <p class="text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString('en-US')}</p>
            `
        issueContainer.appendChild(issueDiv);
    })
    hideSpinner();
}

loadAllData();

// for btn togglink
allBtn.addEventListener('click', () => {
    allBtns.forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-soft', 'text-[#64748B]');
        allBtn.classList.remove('btn-soft', 'text-[#64748B]');
        allBtn.classList.add('btn-primary', 'text-white');
    })

    const loadAllIssues = async () => {
        showSpinner();
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const jsonData = await res.json();
        displayIssue(jsonData.data);
    }
    const displayIssue = (issues) => {
        issueContainer.innerHTML = "";
        issueCount.innerText = issues.length;
        issues.forEach(issue => {
            const issueDiv = document.createElement('div');
            issueDiv.className = 'card max-w-96 p-5 bg-white shadow-lg rounded-lg space-y-5';
            issueDiv.onclick = () => loadIssueDetails(issue.id);
            if (issue.status === "open") {
                issueDiv.classList.add('border-t-4', 'border-green-500');
            } else {
                issueDiv.classList.add('border-t-4', 'border-purple-500');
            }
            issueDiv.innerHTML = `
                <div  class="flex justify-between items-center">
                    <img src="./assets/Open-Status.png" alt="">
                    <span class="bg-red-200 text-red-500 px-6 py-1 rounded-2xl">${issue.priority}</span>
                </div>
                <h3 class="text-2xl font-semibold">${issue.title}</h3>
                <p class="text-[#64748B]">${issue.description}</p>
                <div class="space-x-2">${createElement(issue.labels)}</div>
                <div class="border border-gray-100"></div>
                <p class="text-[#64748B]">#1 by ${issue.author}</p>
                <p class="text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString('en-US')}</p>
            `
            issueContainer.appendChild(issueDiv);
        })
        hideSpinner();
    }
    loadAllIssues();
})

// for open btn click
openBtn.addEventListener('click', () => {
    allBtns.forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-soft', 'text-[#64748B]');
        openBtn.classList.remove('btn-soft', 'text-[#64748B]');
        openBtn.classList.add('btn-primary', 'text-white');
    })

    const loadAllIssues = async () => {
        showSpinner();
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const jsonData = await res.json();
        displayCards(jsonData.data);
    }

    const displayCards = (issues) => {
        issueContainer.innerHTML = "";
        issues.forEach(issue => {
            if (issue.status === 'open') {
                const isExist = openCount.find(item => item.id === issue.id);
                if (!isExist) {
                    openCount.push(issue);
                }
                issueCount.innerText = openCount.length;
                const issueDiv = document.createElement('div');
                issueDiv.className = 'card max-w-96 p-5 bg-white shadow-lg rounded-lg border-t-4 border-green-500 space-y-5';
                issueDiv.onclick = () => loadIssueDetails(issue.id);

                issueDiv.innerHTML = `
                <div  class="flex justify-between items-center">
                    <img src="./assets/Open-Status.png" alt="">
                    <span class="bg-red-200 text-red-500 px-6 py-1 rounded-2xl">${issue.priority}</span>
                </div>
                <h3 class="text-2xl font-semibold">${issue.title}</h3>
                <p class="text-[#64748B]">${issue.description}</p>
                <div class="space-x-2">${createElement(issue.labels)}</div>
                <div class="border border-gray-100"></div>
                <p class="text-[#64748B]">#1 by ${issue.author}</p>
                <p class="text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString('en-US')}</p>
            `
                issueContainer.appendChild(issueDiv);
            }
        })
        hideSpinner();
    }
    loadAllIssues();
})

// for close btn
closeBtn.addEventListener('click', () => {
    allBtns.forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-soft', 'text-[#64748B]');
        closeBtn.classList.remove('btn-soft', 'text-[#64748B]');
        closeBtn.classList.add('btn-primary', 'text-white');
    })

    const loadAllIssues = async () => {
        showSpinner();
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const jsonData = await res.json();
        displayCards(jsonData.data);
    }

    const displayCards = (issues) => {
        issueContainer.innerHTML = "";
        issues.forEach(issue => {
            if (issue.status === 'closed') {
                const isExist = closeCount.find(item => item.id === issue.id);
                if (!isExist) {
                    closeCount.push(issue);
                }
                issueCount.innerText = closeCount.length;
                const issueDiv = document.createElement('div');
                issueDiv.className = 'card max-w-96 p-5 bg-white shadow-lg rounded-lg border-t-4 border-purple-500 space-y-5';
                issueDiv.onclick = () => loadIssueDetails(issue.id);

                issueDiv.innerHTML = `
                <div  class="flex justify-between items-center">
                    <img src="./assets/Open-Status.png" alt="">
                    <span class="bg-red-200 text-red-500 px-6 py-1 rounded-2xl">${issue.priority}</span>
                </div>
                <h3 class="text-2xl font-semibold">${issue.title}</h3>
                <p class="text-[#64748B]">${issue.description}</p>
                <div class="space-x-2">${createElement(issue.labels)}</div>
                <div class="border border-gray-100"></div>
                <p class="text-[#64748B]">#1 by ${issue.author}</p>
                <p class="text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString('en-US')}</p>
            `
                issueContainer.appendChild(issueDiv);
            }
        })
        hideSpinner();
    }
    loadAllIssues();

})



// for search issue functionality
document.getElementById('btn-search').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.trim().toLowerCase();
    // console.log(searchValue);
    showSpinner();
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then(res => res.json())
        .then(issues => {
            const allSearchIssue = issues.data;
            const filterIssues = allSearchIssue.filter(issue => issue.title.toLowerCase().includes(searchValue));
            displaySearchIssue(filterIssues);
        });
    const displaySearchIssue = (issues) => {
        issueContainer.innerHTML = "";
        issueCount.innerText = issues.length;
        for (const issue of issues) {
            const issueDiv = document.createElement('div');
            issueDiv.className = 'card max-w-96 p-5 bg-white shadow-lg rounded-lg space-y-5';
            issueDiv.onclick = () => loadIssueDetails(issue.id);
            if (issue.status === "open") {
                issueDiv.classList.add('border-t-4', 'border-green-500');
            } else {
                issueDiv.classList.add('border-t-4', 'border-purple-500');
            }
            issueDiv.innerHTML = `
                <div  class="flex justify-between items-center">
                    <img src="./assets/Open-Status.png" alt="">
                    <span class="bg-red-200 text-red-500 px-6 py-1 rounded-2xl">${issue.priority}</span>
                </div>
                <h3 class="text-2xl font-semibold">${issue.title}</h3>
                <p class="text-[#64748B]">${issue.description}</p>
                <div class="space-x-2">${createElement(issue.labels)}</div>
                <div class="border border-gray-100"></div>
                <p class="text-[#64748B]">#1 by ${issue.author}</p>
                <p class="text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString('en-US')}</p>
            `
            issueContainer.appendChild(issueDiv);
        }
        hideSpinner();
    }
})