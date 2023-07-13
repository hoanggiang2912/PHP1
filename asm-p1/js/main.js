
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
// searchbar
const searchBar = $$('.bar')
const searchIcon = $$('.magni-icon')
// tab
// const tabItems = $$('.tab__item')
const tabLines = $$('.tab__line')
const renderActiveTabs = $$('.tab__item.active')
// const panelItem = $$('.panel__item')
// show more section
const moreBtn = $$('.more-btn')
const moreProductsSection = $$('.more-products')
// respon nav
const responOverlay = $('.respon-overlay')
const responNav = $('.respon-nav')
const openNavBtn = $('.open-btn')
const closeNavBtn = $('.close-btn')
// slider
const prevBtn = $('.prev-btn')
const nextBtn = $('.next-btn')
const sliderItem = $$('.slider__item')
const sliderMain = $('.slider-main')
// product detail
// gallery
const galleryMain = $('.gallery__main > img')
const galleryItems = $$('.gallery__item > img')
// product options
const optionBtns = $$('.product__option__item')
const qtyOptions = $$('.product__qty__item')
// summary 
const summaryPrice = $('.summary__price')
const summaryTotal = $$('.summary__total__price')


for (let i = 0; i < renderActiveTabs.length ; i++) {
    tabLines[i].style.width = `${renderActiveTabs[i].offsetWidth}px`
    tabLines[i].style.left = `${renderActiveTabs[i].offsetLeft}px`
    tabLines[i].style.top = `${renderActiveTabs[i].offsetTop + renderActiveTabs[i].offsetHeight}px`
}



const app = {
    cartProduct : JSON.parse(localStorage.getItem('cartProduct')),
    eventHandler () {
        // expand search bar
        searchIcon.forEach((icon , index) => {
            icon.addEventListener('click', () => {
                icon.parentElement.classList.toggle('active')
            })
        });
        // product tabs
        const tabContainers = $$('.tab-container')
        tabContainers.forEach(item => {
            item.addEventListener('mouseenter' , () => {
                item.classList.add('active')       
                const activeContainer = $('.tab-container.active')
                if (activeContainer) {
                    const activeTabItems = $$('.tab-container.active > .tabs > .tab__item')
                    const activeTabLine = activeContainer.querySelector('.tab__line')
                    const activePanels = activeContainer.querySelectorAll('.panel__item')
                    activeTabItems.forEach((tab , index) => {
                        tab.onclick = () => {
                            activeContainer.querySelector('.panel__item.active').classList.remove('active')
                            
                            tab.classList.add('active')
                            activePanels[index].classList.add('active')
                            activeTabLine.style.top = `${tab.offsetTop + tab.offsetHeight}px`
                            activeTabLine.style.left = `${tab.offsetLeft}px`
                            activeTabLine.style.width = `${tab.offsetWidth}px`
                        }
                    });
                }         
            })
            item.addEventListener('mouseleave' , () => {
                item.classList.remove('active')
            })
        });
        // show more products
        moreBtn.forEach((btn , index) => {
            btn.onclick = () => {
                btn.classList.toggle('active')
                moreProductsSection[index].classList.toggle('active')
                
                !btn.getAttribute('class').includes('active') ?
                    btn.innerText = 'Xem thêm' 
                    :btn.innerText = 'Ẩn bớt'
            }
        });
        // handle on scroll header
        const container = $('.container') 
        if (container) {
            container.onmouseenter = () => {
                container.classList.add('active')
                if (container.getAttribute('class').includes('active')) {
                    const header = $('.container.active > .header')
                    const heroBanner = $('.hero-banner')
                    if (heroBanner) {
                        document.onscroll = () => {
                            const scrollY = document.scrollY || document.documentElement.scrollTop
                            if (scrollY != 0) {
                                header.style.transform = 'translateY(-100%)'
                            } else {
                                header.style.transform = 'translateY(0)'
                            }
                            if (scrollY >= heroBanner.offsetHeight - header.offsetHeight) {
                                header.style.transform = 'translateY(0)'
                                header.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.3) 100%)'
                            } else {
                                header.style.background = 'none'
                            }
                        }
                    }
                }
            }
        }
        // open respon nav
        openNavBtn.onclick = () => {
            responNav.style.transform = 'translateX(0)'
            responNav.style.opacity = 1
            responOverlay.style.opacity = 1
            responOverlay.style.visibility = 'visible'
        }
        closeNavBtn.onclick = () => {
            this.closeResponThings()
        }
        responOverlay.onclick = () => {
            this.closeResponThings()
        }
        responNav.onclick = (e) => {
            this.closeResponThings()
        }
        // slider
        if (sliderMain) {
            let itemWidth = sliderMain.offsetWidth
            var firstItem = sliderMain.firstElementChild.cloneNode(true);
            var lastItem = sliderMain.lastElementChild.cloneNode(true);

            // Append the cloned items to the beginning and end of the carousel
            sliderMain.appendChild(firstItem);
            sliderMain.insertBefore(lastItem, sliderMain.firstElementChild);

            // Initialize the current position of the carousel
            var currentPosition = -itemWidth;
            sliderMain.style.transform = `translateX(${currentPosition}px)`;
            nextBtn.onclick = () => {
                // Move to the next item
                currentPosition -= itemWidth;
                // Restrict the position to prevent scrolling beyond the last item
                currentPosition = Math.max(currentPosition, -itemWidth * (sliderMain.children.length - 1));
                // Apply the new position to the items container
                sliderMain.style.transform = `translateX(${currentPosition}px)`;
                // Check if we've reached the cloned last item
                if (currentPosition === -(itemWidth * (sliderMain.children.length - 1))) {
                    // Move to the actual first item
                    currentPosition = -itemWidth;
                    // Apply the new position instantly without animation
                    sliderMain.style.transition = 'none';
                    sliderMain.style.transform = `translateX(${currentPosition}px)`;

                    // After a short delay, reset the transition to re-enable animation
                    setTimeout(function () {
                        sliderMain.style.transition = '';
                    }, 10);
                }
            }
            prevBtn.addEventListener('click', () => {
                // Move to the previous item
                currentPosition += itemWidth;
                // Restrict the position to prevent scrolling beyond the first item
                currentPosition = Math.min(currentPosition, 0);
                // Apply the new position to the items container
                sliderMain.style.transform = `translateX(${currentPosition}px)`;

                // Check if we've reached the cloned first item
                if (currentPosition === 0) {
                    // Move to the actual last item
                    currentPosition = -itemWidth * (sliderMain.children.length - 2);
                    // Apply the new position instantly without animation
                    sliderMain.style.transition = 'none';
                    sliderMain.style.transform = `translateX(${currentPosition}px)`;

                    // After a short delay, reset the transition to re-enable animation
                    setTimeout(function () {
                        sliderMain.style.transition = '';
                    }, 10);
                }
            });
        }
        // product gallery
        if (galleryMain) {
            galleryItems.forEach(item => {
                item.onclick = () => {
                    galleryMain.style.animation = 'galleryEffect 2s cubic-bezier(0.19, 1, 0.22, 1) 1'
                    const itemSrc = item.getAttribute('src')
                    galleryMain.src = itemSrc
                    setTimeout (() => {
                        galleryMain.style.animation = ''
                    } , 500)
                }
            });
        }
        // product options
        this.productOptions(optionBtns, 'product__option__item')
        this.productOptions(qtyOptions, 'product__qty__item')
        // render cart
        const cartProductWrapper = $('.cart__product__wrapper')
        this.cartRender(cartProductWrapper)
        // quantity input 
        const [...qtyInput] = $$('.qty__input')
        if (qtyInput) {
            qtyInput.forEach((input , index) => {
                const minusBtn = input.parentElement.querySelector('.minus__btn')
                const plusBtn = input.parentElement.querySelector('.plus__btn')
                const [...cartProduct] = $$('.cart__product')
                minusBtn.onclick = () => {
                    input.value < 1 ? input.value = 0 : input.value--
                    this.calculatorCheck(cartProduct , input , index)
                }
                plusBtn.onclick = () => {
                    input.value++
                    this.calculatorCheck(cartProduct , input , index)
                }
                input.oninput = () => {
                    this.calculatorCheck(cartProduct , input , index)
                }
            });
        }
        // add to cart
        const addBtn = $('.add__btn')
        const addBtns = $$('.btn.label > i')
        if(addBtn) {
            addBtn.onclick = () => {
                const productInfo = {
                    productName: $('.product__name').innerText,
                    productPrice: $('.product__price').innerText,
                    productOption: $('.product__option__item.active').innerText,
                    productSetQty: $('.product__qty__item.active').innerText,
                    productQty: $('.qty__input').value,
                    productImageSrc: galleryMain.src
                }
                localStorage.setItem('cartProduct' , JSON.stringify(productInfo))
                addBtn.innerHTML = '<i class = "fa-solid fa-check" style="padding-inline: 10px"></i>ĐÃ THÊM THÀNH CÔNG'
            }
        }
        // delete cart product
        const buyBtn = $('.buy__now__btn')
        const summaryBuyBtn = $('.respon__summary__btn')
        const cartProductItem = $('.cart__product')
        const delBtns = $$('.del__btn')
        delBtns.forEach(btn => {
            btn.onclick = () => {
                btn.parentElement.remove()
                localStorage.removeItem('cartProduct')
                this.summaryHandler(btn.parentElement)

                this.buyBtnHandler(cartProductItem, buyBtn, summaryBuyBtn)
            }
        });
        // handle active/disable buy btn
        this.buyBtnHandler(cartProductItem, buyBtn, summaryBuyBtn)
        // confirm overlay
        const confirmOverlay = $('.confirm__overlay')
        const buyNowBtn = $$('.buy__now__btn')
        const confirmBtn = $('.confirm__btn')
        if(this.cartProduct){
            if (confirmOverlay) {
                buyNowBtn.forEach(btn => {
                    btn.onclick = () => {
                        confirmOverlay.style.opacity = 1;
                        confirmOverlay.style.transform = "translateY(0)"
                    }
                });
                confirmBtn.onclick = () => {
                    confirmOverlay.style.opacity = 0;
                    confirmOverlay.style.transform = "translateY(-100%)"
                }
            }
        }
        // cart respon nav handler 
        const toggleDropdown = $('.toggle-dropdown')
        const dropdown = $('.payment__respon__nav')
        const cartNav = $('.payment__nav')
        if(toggleDropdown) {
            toggleDropdown.onclick = () => {
                cartNav.style.marginBottom = '8px'
                
                dropdown.classList.toggle('active')
                dropdown.style.animation = 'navActive .1s cubic-bezier(0.19, 1, 0.22, 1)'
                
                setTimeout(() => {
                    dropdown.style.animation = ''
                }, 1000);
            }
        }
        //payment method choosing handler
        const paymentMethods = $$('.payment__method')
        this.choosingOption(paymentMethods , '.payment__method')
        //shipping options choosing handler
        const shippingOptions = $$('.shipping__option')
        this.choosingOption(shippingOptions , '.shipping__option')

        // header hover effect
        const navLinks = $$('.center-nav > .flex > .nav__item > .nav__link');
        const headerLine = $('.header__line')
        const centerNav = $('.center-nav')
        navLinks.forEach(item => {
            item.onmouseenter = () => {
                const width = item.offsetWidth
                const left = item.offsetLeft
                const top = item.offsetTop

                headerLine.style.width = width + 'px'
                headerLine.style.left = left + 'px'
                headerLine.style.top = (top*2) + 'px'
            }
        });
        centerNav.onmouseleave = () => {
            headerLine.style.width = 0;
        }

        // toggle subnav handler
        const toggleSubnav = $('.toggle__subnav')
        const subnav = $('.subnav__wrapper')
        toggleSubnav.addEventListener('click' , e => {
            console.log(subnav)
            this.slideToggle(subnav , 500)
        })
    },
    slideToggle(element, duration = 500) {
        if (window.getComputedStyle(element).display === 'none') {
            element.style.removeProperty('display');
            let height = element.scrollHeight;
            element.style.overflow = 'hidden';
            element.style.height = 0;
            element.style.transitionProperty = 'height';
            element.style.transitionDuration = duration + 'ms';
            element.offsetHeight; // Trigger reflow
            element.style.height = height + 'px';

            setTimeout(function () {
                element.style.removeProperty('height');
                element.style.removeProperty('overflow');
                element.style.removeProperty('transition-duration');
                element.style.removeProperty('transition-property');
            }, duration);
        } else {
            element.style.overflow = 'hidden';
            element.style.height = element.offsetHeight + 'px';
            element.style.transitionProperty = 'height';
            element.style.transitionDuration = duration + 'ms';
            element.offsetHeight; // Trigger reflow
            element.style.height = 0;

            setTimeout(function () {
                element.style.display = 'none';
                element.style.removeProperty('height');
                element.style.removeProperty('overflow');
                element.style.removeProperty('transition-duration');
                element.style.removeProperty('transition-property');
            }, duration);
        }
    },
    slideUp(element, duration = 500) {
        element.style.overflow = 'hidden';
        element.style.height = element.offsetHeight + 'px';
        element.style.transitionProperty = 'height, margin, padding';
        element.style.transitionDuration = duration + 'ms';
        element.offsetHeight; // Trigger reflow
        element.style.height = 0;
        element.style.marginTop = 0;
        element.style.marginBottom = 0;
        element.style.paddingTop = 0;
        element.style.paddingBottom = 0;
        element.style.opacity = 0;

        setTimeout(function () {
            element.style.display = 'none';
        }, duration);
    },
    slideDown(element, duration = 500) {
        element.style.removeProperty('display');
        let display = window.getComputedStyle(element).display;
        if (display === 'none') display = 'block';
        element.style.display = display;

        let height = element.offsetHeight;
        element.style.overflow = 'hidden';
        element.style.height = 0;
        element.style.transitionProperty = 'height, margin, padding';
        element.style.transitionDuration = duration + 'ms';
        element.offsetHeight; // Trigger reflow
        element.style.height = height + 'px';
        element.style.marginTop = '';
        element.style.marginBottom = '';
        element.style.paddingTop = '';
        element.style.paddingBottom = '';
        element.style.opacity = 1;

        setTimeout(function () {
            element.style.removeProperty('height');
            element.style.removeProperty('overflow');
            element.style.removeProperty('transition-duration');
            element.style.removeProperty('transition-property');
        }, duration);
    },      
    choosingOption (options , optionSelector) {
        options.forEach(item => {
            item.onclick = () => {
                $(`${optionSelector}.active`).classList.remove('active')

                item.classList.toggle('active')
            }
        })
    },
    closeResponThings () {
        responNav.style.transform = 'translateX(100%)'
        this.closeOverlay()
    },
    closeOverlay () {
        responOverlay.style.opacity = 0
        responOverlay.style.visibility = 'hidden'
    },
    // product option
    productOptions (optionBtns , btnSeletor) {
        optionBtns.forEach(btn => {
            btn.onclick = () => {
                $(`.${btnSeletor}.active`).classList.remove('active')
                btn.classList.add('active')
            }
        });
    },
    // cart render
    cartRender (cartBody) {
        if (cartBody) {
            if (this.cartProduct) {
                const product = `
                    <div class="cart__product">
                        <div class="flex">
                            <div class="flex" style="gap: 8px">
                                <input type="checkbox" checked="checked" name="productChoosed" id="productChoosed">
                                <label for="productChoosed" class="cart__product__banner"><img src="${this.cartProduct.productImageSrc}" alt=""></label>
                                <div class="cart__product__detail">
                                    <div class="cart__product__name">${this.cartProduct.productName}</div>
                                    <div class="cart__product__options">
                                        <span>${this.cartProduct.productOption}</span>
                                        <span>${this.cartProduct.productSetQty}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="cart__product__price">${this.cartProduct.productPrice}</div>
                                <div class="cart__product__qty product__qty__input">
                                    <button class="minus__btn">-</button>
                                    <input type="number" value="${this.cartProduct.productQty}" min="0" max="100" class="qty__input">
                                    <button class="plus__btn">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="del__btn"><i class="fa-solid fa-circle-xmark"></i></div>
                    </div>
                `
                cartBody.innerHTML = product
                this.summaryHandler(this.cartProduct)
            }
        }
    },
    // summary data handler
    summaryHandler (cartProduct) {
        // summary data handler
        summaryPrice.innerText = cartProduct.productPrice || 0
        summaryTotal.forEach(total => {
            total.innerText = cartProduct.productPrice || 0
        });
    },
    calculatorCheck (cartProduct , input , index) {
        const cartProductPrice = cartProduct[index].querySelector('.cart__product__price').innerText
        const price = Number(cartProductPrice.split('').slice(1).join(''))
        summaryTotal.forEach(ele => {
            ele.innerText = `$${price * input.value}`
        });
    },
    // handle active/disable buy btn
    buyBtnHandler (cartProductItem , buyBtn , summaryBuyBtn) {
        if (cartProductItem) {
            if(!buyBtn || !summaryBuyBtn) {
                return
            } else {
                buyBtn.classList.remove('disable')
                summaryBuyBtn.classList.remove('disable')
            }
        } else {
            if(!buyBtn || !summaryBuyBtn) {
                return
            } else {
                buyBtn.classList.add('disable')
                summaryBuyBtn.classList.add('disable')
            }
        }
    },
    start () {
        this.eventHandler()
    }
}
window.onload = () => {
    app.start()
}
