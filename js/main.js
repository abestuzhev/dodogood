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

        breakpoints: {
            // when window width is <= 320px
            480: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window width is <= 480px
            730: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is <= 640px
            980: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
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

    $('.header-filter-mobile').on('click', function(e){
        e.preventDefault();
        $('.catalog-filter-mobile').toggleClass('is-show');
    });


    /*простые табы*/
    $(document).on('click', '.tabs-menu a', function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(this).parents('.tabs-menu').parent().siblings('.tabs-content').find(".tabs-content__item").not(tab).css("display", "none");
        $(tab).fadeIn();
    });

    /*функция счета больше/меньше*/
    // function catalogItemCounter(field) {
    //     var fieldCount = function (el) {
    //         var
    //         // Мин. значение
    //             min = el.data('min') || false,
    //         // Макс. значение
    //             max = el.data('max') || false,
    //         // Кнопка уменьшения кол-ва
    //             dec = el.prev('.dec'),
    //         // Кнопка увеличения кол-ва
    //             inc = el.next('.inc');
    //         function init(el) {
    //             if (!el.attr('disabled')) {
    //                 dec.on('click', decrement);
    //                 inc.on('click', increment);
    //             }
    //             // Уменьшим значение
    //             function decrement() {
    //                 var value = parseInt(el[0].value);
    //                 value--;
    //
    //                 if (!min || value >= min) {
    //                     el[0].value = value;
    //                 }
    //             };
    //             // Увеличим значение
    //             function increment() {
    //                 var value = parseInt(el[0].value);
    //
    //                 value++;
    //
    //                 if (!max || value <= max) {
    //                     el[0].value = value++;
    //                 }
    //             };
    //         }
    //         el.each(function () {
    //             init($(this));
    //         });
    //     };
    //     $(field).each(function () {
    //         fieldCount($(this));
    //     });
    // }
    // catalogItemCounter('.fieldCount');

    $(document).on('click', '.product-card-size__title', function(){
        $(this).toggleClass('active');
        $('.product-card-size__list').slideToggle(300);
    });


    $('.js-mask-phone').mask('+7(000)000-00-00');

})