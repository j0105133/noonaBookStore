//ttbj01022761248001
//https://noonabookstore.netlify.app
async function searchBooks() {
    const ttbKey = 'ttbj01022761248001';
    const query = document.getElementById('query').value;
   // const url = `https://noonabookstore.netlify.app/proxy?ttbkey=${ttbKey}&Query=${encodeURIComponent(query)}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=xml&Version=20131101`;
    const url =`http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${ttbKey}&Query=aladdin&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=xml&Version=20131101`
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');
        displayResults(xml);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayResults(xml) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    const items = xml.getElementsByTagName('item');
    for (let item of items) {
        const title = item.getElementsByTagName('title')[0].textContent;
        const author = item.getElementsByTagName('author')[0].textContent;
        const cover = item.getElementsByTagName('cover')[0].textContent;

        const bookDiv = document.createElement('div');
        bookDiv.innerHTML = `
            <img src="${cover}" alt="Cover image">
            <h2>${title}</h2>
            <p>${author}</p>
        `;
        resultsDiv.appendChild(bookDiv);
    }
}
