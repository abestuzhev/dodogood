/*выравнивание ячеек по высоте*/
function equalheight(container){
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {
        $el = $(this);
        $($el).height('auto');
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

$(function(){


    $(window).on('load',function() {
        equalheight('.c-card-product');
    });
    $(window).resize(function(){
        equalheight('.c-card-product');
    });


    /*фильтр в каталоге*/
    $(document).on('click', '.c-card-filter__title', function(e){
        e.preventDefault();
        $(this).parents('.catalog-filter__item').siblings().find('.c-card-filter').removeClass('active');
        $(this).parents('.c-card-filter').toggleClass('active');
    });

    /*кастомные селекты*/
    $('.c-select').SumoSelect();

    /*слайдер карусель*/
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 30,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    /**/

    /*доабвление выпадающих стрелок в мобильной меню, к тем пунктам, у которых есть вложенные дети*/

    $('.navigation-catalog__link').each(function(index, elem){
        var parent = $(elem).parents('.navigation-catalog__item');
        if(parent.is(':has(ul)')){
            $(elem).addClass('hasChild');
        }
    })

    $('.navigation-catalog__link').on('click', function(e){
        var self = $(this);

        var parent = $(this).parents('.navigation-catalog__item');

        if(parent.is(':has(ul)')){
            e.preventDefault();
            parent.siblings().find('.navigation-catalog__link').removeClass('active');
            parent.siblings().find('.navigation-subcatalog__list').slideUp(300);
            self.siblings('.navigation-subcatalog__list').slideToggle(300);
            self.toggleClass('active');
        }
    });

    $('.navigation-catalog__title').on('click', function(e){
        var self = $(this);
        self.siblings('.navigation-catalog__list').slideToggle(300);
        self.toggleClass('active');

    });

    $('.header-menu__mobile').on('click', function(e){
        e.preventDefault();
        $('.sidebar').addClass('is-show');
        $('.sidebar-bg').addClass('is-show');

    });

    $('.navigation-close').on('click', function(e){
        e.preventDefault();
        $('.sidebar').removeClass('is-show');
        $('.sidebar-bg').removeClass('is-show');

    });


})