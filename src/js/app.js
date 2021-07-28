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

    const allLinks = document.querySelectorAll('a[href^="#"]')

    if (allLinks) {
        allLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
        
                if (item.getAttribute('href').length > 1) {
                    smoothScroll(item.getAttribute('href').slice(1))
                }
            })
        })
    }

    // SLIDE UP
    let slideUpQna = (target, duration = 400) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.previousElementSibling.style.pointerEvents = 'none';
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.previousElementSibling.style.pointerEvents = 'auto';
        }, duration);
        target.parentNode.classList.remove('is--open');
    }
    // SLIDE DOWN
    let slideDownQna = (target, duration = 400) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none') display = 'block';
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.previousElementSibling.style.pointerEvents = 'none';
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.previousElementSibling.style.pointerEvents = 'auto';
        }, duration);
        target.parentNode.classList.add('is--open');
    }
    // SLIDE TOGGLE
    let slideToggleQna = (target, duration = 400) => {
        if (window.getComputedStyle(target).display === 'none') {
            return slideDownQna(target, duration);
        } else {
            return slideUpQna(target, duration);
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

    // TOOLTIPs
    const tooltip = document.querySelectorAll('.tooltip')

    if (tooltip) {
        tooltip.forEach((item) => {
            const close = () => {
                document.querySelectorAll('.tooltip__wrapper').forEach((child) => child.classList.remove('tooltip__wrapper--active'))
            }
            const itemChecker = useItemChecker([item], close)

            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (item.querySelector('.tooltip__wrapper').classList.contains('tooltip__wrapper--active')) {
                    item.querySelector('.tooltip__wrapper').classList.remove('tooltip__wrapper--active')
                } else {
                    document.querySelectorAll('.tooltip__wrapper').forEach((child) => child.classList.remove('tooltip__wrapper--active'))
                    item.querySelector('.tooltip__wrapper').classList.add('tooltip__wrapper--active')
                    itemChecker.setBodyChecker()
                }
            })
        })
    }

    // ACCORDIONs
    const accordionTrigger = document.querySelectorAll('.accordion-cart__trigger')

    if (accordionTrigger) {
        accordionTrigger.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (!item.parentNode.classList.contains('is--open')) {
                    if (document.querySelector('.accordion-cart__item.is--open')) {
                        let test = document.querySelector('.accordion-cart__item.is--open')
                        slideUpQna(test.childNodes[test.childNodes.length - 1].previousElementSibling)
                    }
                    slideDownQna(item.nextElementSibling)
                } else {
                    slideUpQna(item.nextElementSibling)
                }
            })
        })
    }

    // RANGE
    const inputSizeRange = document.querySelectorAll('.input-size__range');
    const inputSizeField = document.querySelectorAll('.input-size__input');

    if (inputSizeRange) {
        inputSizeRange.forEach((item) => {
            item.addEventListener('input', (event) => {
                item.previousElementSibling.value = event.target.value;
            });
        })
    }

    if (inputSizeField) {
        inputSizeField.forEach((item) => {
            item.addEventListener('input', (event) => {
                item.nextElementSibling.value = event.target.value;
            });
        })
    }

    // SWIPER
    const reviewsSlider = document.querySelectorAll('.reviews__slider .swiper-container')

    reviewsSlider.forEach(slider => {
        const mySwiperReviews = new Swiper(slider, {
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
        })
    })
});