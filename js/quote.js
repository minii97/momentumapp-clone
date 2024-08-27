const quoteBtn = document.querySelector('.quote-btn')
const quoteContents = document.querySelector('.quote-contents')

function activeQuoteContainer() {
  overlay.classList.remove('hide')
  quoteContents.classList.add('is-active')

  function hideQuoteContainer(e) {
    e.currentTarget.classList.add('hide')
    quoteContents.classList.remove('is-active')

    overlay.removeEventListener('click', hideQuoteContainer)
  }

  overlay.addEventListener('click', hideQuoteContainer)
}

quoteBtn.addEventListener('click', activeQuoteContainer)

fetch('./assets/data/quote.json')
  .then((res) => res.json())
  .then((data) => {
    const author = document.querySelector('.author')
    const quote = document.querySelector('.quote')

    crateRandomNum(data.length - 1)

    author.innerHTML = data[randomNum].author
    quote.innerHTML = `"${data[randomNum].quote}"`
  })
  .catch((error) => {
    quoteContents.innerHTML = '<p>Failed to load quote list from server.'
  })
