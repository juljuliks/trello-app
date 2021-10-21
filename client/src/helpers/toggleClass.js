export default function toggleClass(btns) {
    function toggleClass(elem) {
      elem.classList.toggle('hidden')
      elem.classList.toggle('show')
    }
    toggleClass(btns.querySelector('.edit-btn'))
    toggleClass(btns.querySelector('.save-btn'))
    toggleClass(btns.querySelector('.delete-btn'))
}