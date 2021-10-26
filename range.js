const inputSizeField = document.querySelectorAll('.input-size__input');
const rangeGrowth = document.getElementById('range-growth');
const rangeWeight = document.getElementById('range-weight');
const rangeFootLength = document.getElementById('range-foor-length');
const rangePalmGirth = document.getElementById('range-palm-girth');

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
