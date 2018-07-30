$(function(){
    function equalheight(container){
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
        $(container).each(function() {
            $el = $(this);
            $($el).height('auto')
            topPostion = $el.position().top;
            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0;
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }
    $(window).on('load',function() {
        equalheight('.c-card-product');
    });
    $(window).resize(function(){
        equalheight('.c-card-product');
    });


    $(document).on('click', '.c-card-filter__title', function(e){
        e.preventDefault();
        $(this).parents('.catalog-filter__item').siblings().find('.c-card-filter').removeClass('active');
        $(this).parents('.c-card-filter').toggleClass('active');
    });

    $('.c-select').SumoSelect();

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 30,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
})