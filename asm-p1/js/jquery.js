// toggle subnav
const toggleSubnav = $('.toggle__subnav')
const subnav = $('.subnav')
toggleSubnav.on("mouseenter" , () => {
    console.log(subnav)
    subnav.slideDown()
}).on("mouseleave" , () => {
    subnav.slideUp()
})