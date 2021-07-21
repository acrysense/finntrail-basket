document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));

    // FORM VALIDATE
    const formValidate = document.querySelector('.form-validate');

    if (formValidate) {
        const formInput = formValidate.querySelectorAll('.input-group__input');
        
        formValidate.addEventListener('submit', (event) => {
            let validateCounter = formInput.length
    
            for (let input of formInput) {
                const inputError = input.parentNode.nextElementSibling
    
                if (input.validity.valid === false) {
                    inputError.className = 'input-group__error input-group__error--active';
                    inputError.textContent = 'Значение введено неверно';
                } else {
                    validateCounter -= 1
                    inputError.className = 'input-group__error';
                    inputError.textContent = '';
                }
            }
    
            if (validateCounter < 1) {
                for (let input of formInput) {
                    input.value = ''
                }
            } else {
                event.preventDefault()
            }
        });
    }

    // SMOOTH SCROLL
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;

        return 0;
    } 
    
    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    // PROMOCODE
    const promocodeTrigger = document.querySelector('.promocode__trigger')
    const promocodeInput = document.querySelector('.promocode__input')
    const promocodeBtn = document.querySelector('.promocode__btn')

    if (promocodeTrigger) {
        promocodeTrigger.addEventListener('click', (event) => {
            event.preventDefault()

            promocodeTrigger.classList.add('promocode__trigger--hidden')
            promocodeTrigger.nextElementSibling.classList.add('promocode__wrapper--active')
        })
    }

    if (promocodeBtn) {
        promocodeBtn.addEventListener('click', (event) => {
            event.preventDefault()

            if (promocodeInput.value.length < 1) {
                promocodeInput.parentNode.parentNode.classList.add('promocode--error')
            } else {
                if (promocodeInput.parentNode.parentNode.classList.contains('promocode--error')) {
                    promocodeInput.parentNode.parentNode.classList.remove('promocode--error')
                }

                promocodeInput.parentNode.parentNode.classList.add('promocode--success')
            }
        })
    }

    if (promocodeInput) {
        promocodeInput.addEventListener('input', () => {
            if (promocodeInput.parentNode.parentNode.classList.contains('promocode--success')) {
                promocodeInput.parentNode.parentNode.classList.remove('promocode--success')
            }
        })
    }

    // QUANTITY
    const quantity = document.querySelectorAll('.quantity'),
        quantityMinus = document.getElementsByClassName('quantity__minus'),
        quantityPlus = document.getElementsByClassName('quantity__plus')
    
    let quantityCountInput = document.getElementsByClassName('quantity__number')
    
    if (quantity) {
        quantity.forEach((s, i) => {
            quantityMinus[i].addEventListener('click', () => {
                if ((quantityCountInput[i].value) * 1 >= 1) {
                    quantityCountInput[i].value = (quantityCountInput[i].value) * 1 - 1;
                }
            });
    
            quantityPlus[i].addEventListener('click', () => {
                quantityCountInput[i].value = (quantityCountInput[i].value) * 1 + 1;
            })
        })
    }

    // SELECT
    const selected = document.querySelectorAll('.select-box__selected')
    const optionsList = document.querySelectorAll('.select-box__option')

    const useItemChecker = (els, onClickOutside) => {
        const checkBodyClick = (e) => {
            let currentEl = e.target;

            while (currentEl) {
                if (els.includes(currentEl)) break;
                currentEl = currentEl.parentNode
            }

            if (!currentEl) {
                onClickOutside()
                removeBodyChecker()
            }
        }
        function setBodyChecker  ()  {
            document.documentElement.addEventListener('click', checkBodyClick)
        }
        function removeBodyChecker ()  {
            document.documentElement.removeEventListener('click', checkBodyClick)
        }
        return {setBodyChecker, removeBodyChecker}
    }
    
    if (selected) {
        selected.forEach(item => {
            const close = () => {
                document.querySelectorAll('.select-box__container').forEach((child) => child.classList.remove('select-box__container--active'))
                document.querySelectorAll('.select-box__selected').forEach((child) => child.classList.remove('select-box__selected--active'))
            }
            const itemChecker = useItemChecker([item.parentNode.parentNode.parentNode, ...selected], close)

            item.addEventListener('click', () => {
                if (item.previousElementSibling.classList.contains('select-box__container--active')) {
                    close()
                }
                else {
                    close()
                    item.previousElementSibling.classList.add('select-box__container--active')
                    item.classList.add('select-box__selected--active')
                    itemChecker.setBodyChecker()
                }
            })
        });
    }

    if (optionsList) {
        optionsList.forEach((option) => {
            option.addEventListener('click', (event) => {
                event.preventDefault()

                if (!option.classList.contains('select-box__option--disabled')) {
                    const activeOption = option.parentNode.querySelector('.select-box__option--active')
                    activeOption.classList.remove('select-box__option--active')

                    option.parentNode.nextElementSibling.innerHTML = option.querySelector('label').innerHTML

                    option.classList.add('select-box__option--active')
                    option.parentNode.classList.remove('select-box__container--active')
                    option.parentNode.nextElementSibling.classList.remove('select-box__selected--active')
                }
            });
        });
    }

    // SCROLL TOTAL
    const scrollTotalBtn = document.querySelector('.scroll-total__btn')
    const cartProductItems = document.querySelectorAll('.cart-product__item')

    if (scrollTotalBtn && cartProductItems && cartProductItems.length < 2) {
        scrollTotalBtn.parentNode.classList.add('scroll-total--hidden')
    }

    if (scrollTotalBtn) {
        scrollTotalBtn.addEventListener('click', () => {
            smoothScroll('ordering')

            scrollTotalBtn.parentNode.classList.add('scroll-total--hidden')
        })
    }

    window.addEventListener('scroll', () => {
        if (cartProductItems && cartProductItems.length > 1) {
            const orderingScrollTop = elmYPosition('ordering')

            if (window.pageYOffset >= orderingScrollTop - 300) {
                scrollTotalBtn.parentNode.classList.add('scroll-total--hidden')
            } 
            else if (window.pageYOffset < orderingScrollTop - 500) {
                scrollTotalBtn.parentNode.classList.remove('scroll-total--hidden')
            }
        }
    })

    // ACCORDIONS
    const accordionTrigger = document.querySelectorAll('.accordion-cart__trigger')

    if (accordionTrigger) {
        accordionTrigger.forEach(item => {
            setTimeout(() => item.parentNode.style.setProperty('max-height', `${item.getBoundingClientRect().height}px`), 100)

            item.addEventListener('click', (event) => {
                event.preventDefault()
                
                let heightTrigger = item.getBoundingClientRect().height;
                let heightContent = item.nextElementSibling.clientHeight;
                
                if (!item.parentNode.classList.contains('accordion-cart__item--active')) {
                    accordionTrigger.forEach(child => {
                        child.parentNode.style.setProperty('max-height', `${child.getBoundingClientRect().height}px`)
                        child.parentNode.classList.remove('accordion-cart__item--active')
                    })

                    item.parentNode.classList.add('accordion-cart__item--active')
                    item.parentNode.style.setProperty('max-height', `${heightTrigger + heightContent}px`)
                } else {
                    item.parentNode.classList.remove('accordion-cart__item--active')
                    item.parentNode.style.setProperty('max-height', `${heightTrigger}px`)
                }
            })
        })
    }
});