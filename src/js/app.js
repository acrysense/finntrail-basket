document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));

    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    
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
        let stopY = elmYPosition(eID) - Number(document.querySelector('.header').clientHeight);
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
    
    function smoothScrollCoord(coord) {
        let startY = currentYPosition();
        let stopY = coord;
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

    // ALL LINKS SMOOTH SCROLL
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

    // BACK TO TOP
    const backToTop = document.querySelector('.go-top')

    if (backToTop) {
        backToTop.addEventListener('click', (event) => {
            event.preventDefault()
    
            smoothScrollCoord(0)
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

    const subscribeFormValidate = document.querySelector('.subscribe-form');

    if (subscribeFormValidate) {
        const subscribeFormInput = subscribeFormValidate.querySelector('.input-shell__input');
        
        subscribeFormValidate.addEventListener('submit', (event) => {
            const radioButton = document.querySelectorAll('.circle-checkbox__input')
            let radioChecked = 0

            for (let radio of radioButton) {
                if (radio.checked) {
                    radioChecked = 1
                }
            }

            if (radioChecked === 1 && subscribeFormInput.value.length > 5) {
                subscribeFormInput.classList.remove('input-shell__input--error')
                subscribeFormInput.value = ''
            } else {
                event.preventDefault()
                subscribeFormInput.classList.add('input-shell__input--error')
            }
        });
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
                    if (activeOption != null) {
                        activeOption.classList.remove('select-box__option--active')
                    }

                    option.parentNode.nextElementSibling.innerHTML = option.querySelector('label').innerHTML

                    option.classList.add('select-box__option--active')
                    option.parentNode.classList.remove('select-box__container--active')
                    option.parentNode.nextElementSibling.classList.remove('select-box__selected--active')
                }
            });
        });
    }

    // SCROLL TOTAL & PRODUCT
    const scrollTotalBtn = document.querySelector('.scroll-total__btn')
    const cartProductItems = document.querySelectorAll('.cart-product__item')

    const productBuyBlock = document.querySelector('.product__block--buy')
    const productFixed = document.querySelector('.product__fixed')

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

        if (productBuyBlock && productFixed) {
            if (window.pageYOffset >= productBuyBlock.offsetTop) {
                productFixed.classList.remove('product__fixed--hidden')
            }
        }
    })

    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const mobileMenu = document.querySelector('.mobile-menu')
    const mobileMenuOverlay = document.querySelector('.menu-overlay')

    if (hamburger) {
        hamburger.addEventListener('click', (event) => {
            event.preventDefault()

            if (hamburger.classList.contains('hamburger--active') && mobileMenu.classList.contains('mobile-menu--active')) {
                hamburger.classList.remove('hamburger--active')
                mobileMenu.classList.remove('mobile-menu--active')
                mobileMenuOverlay.classList.remove('menu-overlay--active')
                document.body.classList.remove('scroll-disabled')
            } else {
                hamburger.classList.add('hamburger--active')
                mobileMenu.classList.add('mobile-menu--active')
                mobileMenuOverlay.classList.add('menu-overlay--active')
                document.body.classList.add('scroll-disabled')
            }
        })
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (event) => {
            event.preventDefault()

            hamburger.classList.remove('hamburger--active')
            mobileMenu.classList.remove('mobile-menu--active')
            mobileMenuOverlay.classList.remove('menu-overlay--active')
            document.body.classList.remove('scroll-disabled')
        })
    }

    // TOP PROMO
    const topPromo = document.querySelector('.top-promo')
    const topPromoClose = document.querySelector('.top-promo__close')

    if (topPromo && topPromoClose) {
        topPromoClose.addEventListener('click', (event) => {
            event.preventDefault()

            topPromo.classList.add('top-promo--hidden')
            mobileMenu.classList.remove('mobile-menu--promo')
        })
    }

    // HEADER SEARCH
    const header = document.querySelector('.header')
    const headerSearchBtn = document.querySelector('.search-btn')
    const headerSearch = document.querySelector('.header-search')
    const headerSearchInput = document.querySelector('.header-search__input')
    const headerSearchDropdown = document.querySelector('.header-search__dropdown')
    const headerSearchPopular = document.querySelector('.header-search__popular')
    const headerSearchOptions = document.querySelector('.header-search__options')

    if (headerSearchBtn) {
        headerSearchBtn.addEventListener('click', (event) => {
            event.preventDefault()

            header.classList.add('header--search')
            headerSearchBtn.classList.add('search-btn--hidden')
            headerSearch.classList.add('header-search--active')
        })
    }

    if (headerSearchInput && headerSearchDropdown) {
        headerSearchInput.addEventListener('focus', () => {
            if (headerSearchInput.value.length > 0) {
                headerSearchPopular.classList.add('header-search__popular--hidden')
                headerSearchOptions.classList.add('header-search__options--active')
            } else {
                headerSearchPopular.classList.remove('header-search__popular--hidden')
                headerSearchOptions.classList.remove('header-search__options--active')
            }
            mobileMenuOverlay.classList.add('menu-overlay--active')
            headerSearchDropdown.classList.add('header-search__dropdown--active')
        })
        headerSearchInput.addEventListener('blur', () => {
            if (headerSearchInput.value.length > 0) {
                headerSearchPopular.classList.remove('header-search__popular--hidden')
                headerSearchOptions.classList.remove('header-search__options--active')
            }
            headerSearchDropdown.classList.remove('header-search__dropdown--active')
            mobileMenuOverlay.classList.remove('menu-overlay--active')
        })
        headerSearchInput.addEventListener('input', () => {
            if (headerSearchInput.value.length > 0) {
                headerSearchPopular.classList.add('header-search__popular--hidden')
                headerSearchOptions.classList.add('header-search__options--active')
            } else {
                headerSearchPopular.classList.remove('header-search__popular--hidden')
                headerSearchOptions.classList.remove('header-search__options--active')
            }
        })
    }

    // SCROLL
    let prevScrollpos = window.pageYOffset;

    window.addEventListener('scroll', () => {
        if (header) {
            const headerHeight = header.getBoundingClientRect().height;
            const topPromoHeight = topPromo ? topPromo.getBoundingClientRect().height : 0

            let currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos || prevScrollpos <= 0) { // If up
                if (window.pageYOffset <= topPromoHeight) {
                    if (topPromo && !topPromo.classList.contains('top-promo--hidden')) {
                        mobileMenu.classList.add('mobile-menu--promo')
                    }
                    header.querySelector('.header__wrap').style.transform = 'translate3d(0px, 0px, 0px)'
                    header.querySelector('.header__wrap').style.transition = 'none'
                    header.querySelector('.header__wrap').style.position = 'relative'
                } else {
                    header.querySelector('.header__wrap').style.transform = 'translate3d(0px, 0px, 0px)'
                    header.querySelector('.header__wrap').style.transition = 'transform 0.25s ease-in-out'
                    header.querySelector('.header__wrap').style.position = 'fixed'
                }
            } else { // If down
                if (window.pageYOffset >= headerHeight) {
                    if (headerSearch && headerSearch.classList.contains('header-search--active')) {
                        headerSearch.classList.remove('header-search--active')
                        setTimeout(() => headerSearchBtn.classList.remove('search-btn--hidden'), 200)
                    }
                    if (mobileMenu.classList.contains('mobile-menu--active')) {
                        hamburger.classList.remove('hamburger--active')
                        mobileMenu.classList.remove('mobile-menu--active')
                        mobileMenuOverlay.classList.remove('menu-overlay--active')
                        document.body.classList.remove('scroll-disabled')
                    }
                    mobileMenu.classList.remove('mobile-menu--promo')
                    header.querySelector('.header__wrap').style.transform = 'translate3d(0px, -100%, 0px)'
                    header.querySelector('.header__wrap').style.transition = 'transform 0.25s ease-in-out'
                    setTimeout(() => header.querySelector('.header__wrap').style.position = 'fixed', 200)
                }
            }
            prevScrollpos = currentScrollPos;
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
    const accordionSubTrigger = document.querySelectorAll('.accordion-sub__trigger')

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

    if (accordionSubTrigger) {
        accordionSubTrigger.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (!item.parentNode.classList.contains('is--open')) {
                    if (document.querySelector('.accordion-sub__item.is--open')) {
                        let test = document.querySelector('.accordion-sub__item.is--open')
                        slideUpQna(test.childNodes[test.childNodes.length - 1].previousElementSibling)
                    }
                    slideDownQna(item.nextElementSibling)
                } else {
                    slideUpQna(item.nextElementSibling)
                }
            })
        })
    }

    // COMMENTs
    const commentViewBtn = document.querySelectorAll('.comment__view')

    if (commentViewBtn) {
        commentViewBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (item.previousElementSibling.classList.contains('is--open')) {
                    item.previousElementSibling.classList.remove('is--open')
                    item.innerHTML = 'Показать ответ магазина'
                    slideUpQna(item.previousElementSibling)
                } else {
                    item.previousElementSibling.classList.add('is--open')
                    item.innerHTML = 'Скрыть ответ магазина'
                    slideDownQna(item.previousElementSibling)
                }
            })
        })
    }

    // RANGE
    const inputSizeField = document.querySelectorAll('.input-size__input');
    const valueMoneyField = document.querySelectorAll('.filters__value');
    const rangeGrowth = document.getElementById('range-growth');
    const rangeWeight = document.getElementById('range-weight');
    const rangeFootLength = document.getElementById('range-foor-length');
    const rangePalmGirth = document.getElementById('range-palm-girth');
    const rangeMoney = document.getElementById('range-money');

    if (rangeGrowth) {
        noUiSlider.create(rangeGrowth, {
            start: [186],
            step: 1,
            connect: [true, false],
            range: {
                'min': [165],
                'max': [195]
            }
        });
        rangeGrowth.noUiSlider.on('update', function( value, handle ) {
            rangeGrowth.previousElementSibling.value = Math.round(value[handle]);
    
            const min = Math.round(rangeGrowth.querySelector('.noUi-handle').getAttribute('aria-valuemin'))
            const max = Math.round(rangeGrowth.querySelector('.noUi-handle').getAttribute('aria-valuemax'))
                    
            if (Math.round(value[handle]) === max) {
                rangeGrowth.previousElementSibling.previousElementSibling.innerHTML = '<'
                rangeGrowth.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--min')
                rangeGrowth.previousElementSibling.previousElementSibling.classList.add('input-size__arrow--max')
            } else if (Math.round(value[handle]) === min) {
                rangeGrowth.previousElementSibling.previousElementSibling.innerHTML = '>'
                rangeGrowth.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--max')
                rangeGrowth.previousElementSibling.previousElementSibling.classList.add('input-size__arrow--min')
            } else {
                rangeGrowth.previousElementSibling.previousElementSibling.innerHTML = ''
                rangeGrowth.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--max')
                rangeGrowth.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--min')
            }
        });
    }

    if (rangeWeight) {
        noUiSlider.create(rangeWeight, {
            start: [80],
            step: 1,
            connect: [true, false],
            range: {
                'min': [55],
                'max': [135]
            }
        });
        rangeWeight.noUiSlider.on('update', function( value, handle ) {
            rangeWeight.previousElementSibling.value = Math.round(value[handle]);
    
            const min = Math.round(rangeWeight.querySelector('.noUi-handle').getAttribute('aria-valuemin'))
            const max = Math.round(rangeWeight.querySelector('.noUi-handle').getAttribute('aria-valuemax'))
                    
            if (Math.round(value[handle]) === max) {
                rangeWeight.previousElementSibling.previousElementSibling.innerHTML = '<'
                rangeWeight.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--min')
                rangeWeight.previousElementSibling.previousElementSibling.classList.add('input-size__arrow--max')
            } else if (Math.round(value[handle]) === min) {
                rangeWeight.previousElementSibling.previousElementSibling.innerHTML = '>'
                rangeWeight.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--max')
                rangeWeight.previousElementSibling.previousElementSibling.classList.add('input-size__arrow--min')
            } else {
                rangeWeight.previousElementSibling.previousElementSibling.innerHTML = ''
                rangeWeight.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--max')
                rangeWeight.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--min')
            }
        });
    }

    if (rangeFootLength) {
        noUiSlider.create(rangeFootLength, {
            start: [42],
            step: 1,
            connect: [true, false],
            range: {
                'min': [35],
                'max': [45]
            }
        });
        rangeFootLength.noUiSlider.on('update', function( value, handle ) {
            rangeFootLength.previousElementSibling.value = Math.round(value[handle]);
    
            const min = Math.round(rangeFootLength.querySelector('.noUi-handle').getAttribute('aria-valuemin'))
            const max = Math.round(rangeFootLength.querySelector('.noUi-handle').getAttribute('aria-valuemax'))
                    
            if (Math.round(value[handle]) === max) {
                rangeFootLength.previousElementSibling.previousElementSibling.innerHTML = '<'
                rangeFootLength.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--min')
                rangeFootLength.previousElementSibling.previousElementSibling.classList.add('input-size__arrow--max')
            } else if (Math.round(value[handle]) === min) {
                rangeFootLength.previousElementSibling.previousElementSibling.innerHTML = '>'
                rangeFootLength.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--max')
                rangeFootLength.previousElementSibling.previousElementSibling.classList.add('input-size__arrow--min')
            } else {
                rangeFootLength.previousElementSibling.previousElementSibling.innerHTML = ''
                rangeFootLength.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--max')
                rangeFootLength.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--min')
            }
        });
    }

    if (rangePalmGirth) {
        noUiSlider.create(rangePalmGirth, {
            start: [22],
            step: 1,
            connect: [true, false],
            range: {
                'min': [20],
                'max': [24]
            }
        });
        rangePalmGirth.noUiSlider.on('update', function( value, handle ) {
            rangePalmGirth.previousElementSibling.value = Math.round(value[handle]);
    
            const min = Math.round(rangePalmGirth.querySelector('.noUi-handle').getAttribute('aria-valuemin'))
            const max = Math.round(rangePalmGirth.querySelector('.noUi-handle').getAttribute('aria-valuemax'))
                    
            if (Math.round(value[handle]) === max) {
                rangePalmGirth.previousElementSibling.previousElementSibling.innerHTML = '<'
                rangePalmGirth.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--min')
                rangePalmGirth.previousElementSibling.previousElementSibling.classList.add('input-size__arrow--max')
            } else if (Math.round(value[handle]) === min) {
                rangePalmGirth.previousElementSibling.previousElementSibling.innerHTML = '>'
                rangePalmGirth.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--max')
                rangePalmGirth.previousElementSibling.previousElementSibling.classList.add('input-size__arrow--min')
            } else {
                rangePalmGirth.previousElementSibling.previousElementSibling.innerHTML = ''
                rangePalmGirth.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--max')
                rangePalmGirth.previousElementSibling.previousElementSibling.classList.remove('input-size__arrow--min')
            }
        });
    }

    if (rangeMoney) {
        noUiSlider.create(rangeMoney, {
            start: [6000, 19000],
            connect: true,
            range: {
                'min': 0,
                'max': 25000
            }
        });

        rangeMoney.noUiSlider.on('update', function( value, handle ) {
            
            if (handle === 0) {
                valueMoneyField[0].innerHTML = Math.round(value[0])
            } else {
                valueMoneyField[1].innerHTML = Math.round(value[1])
            }
        });
    }

    if (inputSizeField) {
        inputSizeField.forEach((item, handle) => {
            item.addEventListener('change', () => {
                switch (handle) {
                    case 0:
                        rangeGrowth.noUiSlider.setHandle(0, item.value);
                        break;
                    case 1:
                        rangeWeight.noUiSlider.setHandle(0, item.value);
                        break;
                    case 2:
                        rangeFootLength.noUiSlider.setHandle(0, item.value);
                        break;
                    case 3:
                        rangePalmGirth.noUiSlider.setHandle(0, item.value);
                        break;
                }
                
                if (item.value === item.max) {
                    item.previousElementSibling.innerHTML = '<'
                    item.previousElementSibling.classList.remove('input-size__arrow--min')
                    item.previousElementSibling.classList.add('input-size__arrow--max')
                } else if (item.value === item.min) {
                    item.previousElementSibling.innerHTML = '>'
                    item.previousElementSibling.classList.remove('input-size__arrow--max')
                    item.previousElementSibling.classList.add('input-size__arrow--min')
                } else {
                    item.previousElementSibling.innerHTML = ''
                    item.previousElementSibling.classList.remove('input-size__arrow--max')
                    item.previousElementSibling.classList.remove('input-size__arrow--min')
                }
            });
        })
    }

    // ADD INPUT GROUP
    const addInputGroupBtn = document.querySelectorAll('.input-group__add')
    
    if (addInputGroupBtn) {
        addInputGroupBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                item.parentNode.querySelectorAll('.input-group--hidden')[0].classList.remove('input-group--hidden')

                if (item.parentNode.querySelectorAll('.input-group--hidden').length === 0) {
                    item.classList.add('input-group__add--hidden')
                }
            })
        })
    }

    // FILTERS
    const filtersClose = document.querySelector('.filters__close')

    if (filtersClose) {
        filtersClose.addEventListener('click', (event) => {
            event.preventDefault()

            document.body.classList.remove('scroll-disabled')
            document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
            overlay.classList.remove('overlay--active')
        })
    }

    // SIZE ELEM
    const sizeElem = document.querySelectorAll('.size-info__column:not(.size-info__column--heading) .size-info__elem:not(.size-info__elem--gray, .size-info__elem--black')
    
    if (sizeElem) {
        sizeElem.forEach((item, i) => {
            item.addEventListener('mouseover', (event) => {
                event.preventDefault()

                item.classList.add('size-info__elem--active')
                item.parentNode.querySelector('.size-info__elem--black').classList.add('size-info__elem--active')
                item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling.querySelectorAll('.size-info__elem')[item.getAttribute('data-index')].classList.add('size-info__elem--active')
            })
            item.addEventListener('mouseout', (event) => {
                event.preventDefault()

                item.classList.remove('size-info__elem--active')
                item.parentNode.querySelector('.size-info__elem--black').classList.remove('size-info__elem--active')
                item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling.querySelectorAll('.size-info__elem')[item.getAttribute('data-index')].classList.remove('size-info__elem--active')
            })
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

    const aboutSlider = document.querySelector('.about__slider .swiper-container')

    const mySwiperReviews = new Swiper(aboutSlider, {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    })

    const productSlider = document.querySelector('.product__slider .swiper-container')

    const mySwiperProduct = new Swiper(productSlider, {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    })

    const promoSlider = document.querySelector('.promo .swiper-container')

    const mySwiperPromo = new Swiper(promoSlider, {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    })

    const stockSlider = document.querySelector('.stock__slider .swiper-container')

    const mySwiperStock = new Swiper(stockSlider, {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 4000,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        
    })

    const comparisonSlider = document.querySelectorAll('.comparison__slider .swiper-container')

    comparisonSlider.forEach(slider => {
        const mySwiperReviews = new Swiper(slider, {
            slidesPerView: 1,
            loop: true,
            observer: true,
            observeParents: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
                renderFraction: function (currentClass, totalClass) {
                    return '<span class="' + currentClass + '"></span>' + ' из ' + '<span class="' + totalClass + '"></span>';
                },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
    })

    const moreProductsSlider = document.querySelectorAll('.more-products__list .swiper-container')

    if (moreProductsSlider) {
        function initMoreProductsSlider() {
            moreProductsSlider.forEach(slider => {
                if (window.innerWidth >= 1024) {
                    const mySwiperMoreProducts = new Swiper(slider, {
                        slidesPerView: 6,
                        loop: true,
                        spaceBetween: 20,
                        breakpoints: {
                            0: {
                                slidesPerView: 5,
                            },
                            1200: {
                                slidesPerView: 6,
                            }
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    })
                }
            })
        }
    
        initMoreProductsSlider()
    }

    // SPECIFICATIONs
    const specificationBtn = document.querySelectorAll('.specification__more')
    const specificationGradientBtn = document.querySelectorAll('.specification__gradient')

    if (specificationBtn) {
        specificationBtn.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (item.previousElementSibling.previousElementSibling.classList.contains('specification__description') && item.previousElementSibling.previousElementSibling.classList.contains('specification__description--all')) {
                    item.previousElementSibling.previousElementSibling.classList.remove('specification__description--all')
                    item.innerHTML = 'Развернуть'

                    if (item.previousElementSibling.classList.contains('specification__gradient--hidden')) {
                        item.previousElementSibling.classList.remove('specification__gradient--hidden')
                    }
                } else if (item.previousElementSibling.previousElementSibling.classList.contains('specification__description') && !item.previousElementSibling.previousElementSibling.classList.contains('specification__description--all')) {
                    item.previousElementSibling.previousElementSibling.classList.add('specification__description--all')
                    item.innerHTML = 'Скрыть'

                    if (item.previousElementSibling.classList.contains('specification__gradient')) {
                        item.previousElementSibling.classList.add('specification__gradient--hidden')
                    }
                }

                if (item.parentNode.classList.contains('specification__list') && item.parentNode.classList.contains('specification__list--open')) {
                    item.parentNode.classList.remove('specification__list--open')
                    item.previousElementSibling.classList.remove('specification__gradient--hidden')
                    item.classList.remove('specification__more--bottom')
                    item.innerHTML = 'Развернуть'
                } else if (item.parentNode.classList.contains('specification__list') && !item.parentNode.classList.contains('specification__list--open')) {
                    item.parentNode.classList.add('specification__list--open')
                    item.previousElementSibling.classList.add('specification__gradient--hidden')
                    item.classList.add('specification__more--bottom')
                    item.innerHTML = 'Скрыть'
                }
            })
        })
    }

    if (specificationGradientBtn) {
        specificationGradientBtn.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (item.previousElementSibling.classList.contains('specification__description') && !item.previousElementSibling.classList.contains('specification__description--all')) {
                    item.previousElementSibling.classList.add('specification__description--all')
                    item.classList.add('specification__gradient--hidden')

                    if (item.nextElementSibling.classList.contains('specification__more')) {
                        item.nextElementSibling.innerHTML = 'Скрыть'
                    }
                }

                if (item.parentNode.classList.contains('specification__list') && !item.parentNode.classList.contains('specification__list--open')) {
                    item.parentNode.classList.add('specification__list--open')
                    item.classList.add('specification__gradient--hidden')

                    if (item.nextElementSibling.classList.contains('specification__more')) {
                        item.nextElementSibling.classList.add('specification__more--bottom')
                        item.nextElementSibling.innerHTML = 'Скрыть'
                    }
                }
            })
        })
    }

    // FOOTER ACCORDIONs
    const footerTrigger = document.querySelectorAll('.footer__trigger')

    if (footerTrigger) {
        footerTrigger.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (!item.parentNode.classList.contains('is--open')) {
                    if (document.querySelector('.footer__accordion.is--open')) {
                        let test = document.querySelector('.footer__accordion.is--open')
                        slideUpQna(test.childNodes[test.childNodes.length - 1].previousElementSibling)
                    }
                    slideDownQna(item.nextElementSibling)
                } else {
                    slideUpQna(item.nextElementSibling)
                }
            })
        })
    }

    // NOTIFICATION
    const notification = document.querySelector('.notification')
    const notificationClose = document.querySelector('.notification__close')

    if (notification && notificationClose) {
        notificationClose.addEventListener('click', (event) => {
            event.preventDefault()

            notification.classList.remove('notification--active')
        })
    }

    // COMPARISON
    const comparisonBtn = document.querySelectorAll('.product__comparison')

    if (comparisonBtn) {
        comparisonBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                notification.classList.add('notification--active')
            })
        })
    }

    // SIZE TABS
    const sizeTabsItem = document.querySelectorAll('.size-tabs__item')

    if (sizeTabsItem) {
        sizeTabsItem.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                const sizeTabsID = item.dataset.size - 1

                document.querySelectorAll('.size-tabs__item').forEach((child) => child.classList.remove('size-tabs__item--active'))
                document.querySelectorAll('.size-tabs__content').forEach((child) => child.classList.remove('size-tabs__content--active'))
                document.querySelectorAll('.size-tabs__content')[sizeTabsID].classList.add('size-tabs__content--active')
                item.classList.add('size-tabs__item--active')
                
                document.querySelector('.size-tabs__content--active').scrollIntoView({block: "start", behavior: "smooth"});
            })
        })
    }

    // GALLERY TABS
    const sizeTabsTab = document.querySelectorAll('.gallery-tabs__tab')

    if (sizeTabsTab) {
        sizeTabsTab.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                document.querySelectorAll('.gallery-tabs__item').forEach((child) => child.classList.remove('gallery-tabs__item--active'))
                document.querySelectorAll('.gallery-tabs__content').forEach((child) => child.classList.remove('gallery-tabs__content--active'))
                document.querySelectorAll('.gallery-tabs__content')[i].classList.add('gallery-tabs__content--active')
                item.parentNode.classList.add('gallery-tabs__item--active')
            })
        })
    }

    // STAR RATING
    const starRatingBtn = document.querySelectorAll('.star-rating__star')
    const starRatingHelp = document.querySelector('.star-rating__help')
    const starRatingQuestionnaire = document.querySelectorAll('.star-rating__questionnaire')

    if (starRatingBtn) {
        starRatingBtn.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                document.querySelectorAll('.star-rating__star').forEach((child) => child.classList.remove('star-rating__star--active'))
                document.querySelectorAll('.star-rating__questionnaire').forEach((child) => child.classList.remove('star-rating__questionnaire--active'))
                
                for (let j = 0; j < i + 1; j++) {
                    document.querySelectorAll('.star-rating__star')[j].classList.add('star-rating__star--active')
                }

                if (!starRatingHelp.classList.contains('star-rating__help--rating')) {
                    starRatingHelp.classList.add('star-rating__help--rating')
                }

                switch (i) {
                    case 0:
                        starRatingHelp.innerHTML = 'Ужасно'
                        starRatingQuestionnaire[0].classList.add('star-rating__questionnaire--active')
                        break;
                    case 1:
                        starRatingHelp.innerHTML = 'Плохо'
                        starRatingQuestionnaire[0].classList.add('star-rating__questionnaire--active')
                        break;
                    case 2:
                        starRatingHelp.innerHTML = 'Нормально'
                        starRatingQuestionnaire[0].classList.add('star-rating__questionnaire--active')
                        break;
                    case 3:
                        starRatingHelp.innerHTML = 'Хорошо'
                        starRatingQuestionnaire[1].classList.add('star-rating__questionnaire--active')
                        break;
                    case 4:
                        starRatingHelp.innerHTML = 'Отлично'
                        starRatingQuestionnaire[2].classList.add('star-rating__questionnaire--active')
                        break;
                }
            })
        })
    }

    // MODAL
    const modalBtn = document.querySelectorAll('.modal-btn')
    const modal = document.querySelectorAll('.modal')
    const modalClose = document.querySelectorAll('.modal__close, .modal__btn--close')
    const overlay = document.querySelector('.overlay')
    const swipeOverlay = document.querySelector('.swipe')
    
    if (modalBtn) {
        modalBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                const modalID = item.dataset.id

                if (modalID) {
                    if (!overlay.classList.contains('overlay--active')) {
                        overlay.classList.add('overlay--active')
                    }
    
                    swipeOverlay.classList.add('swipe--active')
                    document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                    document.body.classList.add('scroll-disabled')
                    document.getElementById(modalID).classList.add('modal--active')

                    if (document.getElementById(modalID).classList.contains('modal--sm')) {
                        setTimeout(() => {
                            document.body.classList.remove('scroll-disabled')
                            document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                            overlay.classList.remove('overlay--active')
                        }, 5000)
                    }
                }
            });
        });
    }

    document.body.addEventListener('keyup', (event) => {
        let key = event.keyCode;

        if (key == 27) {
            if (overlay.classList.contains('overlay--active')) {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                overlay.classList.remove('overlay--active')
                swipeOverlay.classList.remove('swipe--active')
            }
        };
    }, false);

    if (modalClose) {
        modalClose.forEach((item) => {
            item.addEventListener('click', () => {
                if (overlay.classList.contains('overlay--active')) {
                    document.body.classList.remove('scroll-disabled')
                    document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                    overlay.classList.remove('overlay--active')
                    swipeOverlay.classList.remove('swipe--active')
                }
            });
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (overlay.classList.contains('overlay--active')) {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                overlay.classList.remove('overlay--active')
                swipeOverlay.classList.remove('swipe--active')
            }
        });
    }

    if (swipeOverlay) {
        let mc = new Hammer(swipeOverlay);
    
        mc.on('pandown', () => {
            if (overlay.classList.contains('overlay--active')) {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                overlay.classList.remove('overlay--active')
                swipeOverlay.classList.remove('swipe--active')
            }
        });
    }

    // PRODUCT CART BTN BUY
    const productBtnBuy = document.querySelectorAll('.product__btn--buy')

    if (productBtnBuy) {
        productBtnBuy.forEach((item) =>
            item.addEventListener('click', () => {
                productBtnBuy.forEach((child) => {
                    child.innerHTML = 'Добавлено'
                    child.dataset.id = ''
                })
            })
        )
    }
});