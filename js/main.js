$( document ).ready(function() {
    //for numbers convertation
    Number.prototype.format = function(n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
            num = this.toFixed(Math.max(0, ~~n));
    
        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };
    //price square 
    $('.price-check').each(function() {
        $(this).on('click', function() {
            $('.price-check').each(function () {
                $(this).removeClass('price-check__active');
            });
            //add active pos
            $(this).addClass('price-check__active');
            //add atr to next act
            $('#squarePrice').attr("data", $(this).attr("data"));
            let data = +$(this).attr("data");
            $('#squarePrice span').text(data.format(0, 3, ' '));
            //convert to real numbers & add text 
            $('#allPrice span').text(
                ($('#squarePrice').attr("data") * $('#midddleSquarePrice').attr("data")).format(0, 3, ' ')
            );
        });
    });
    //price for one square miter
    $('.price-pocket_item__link').each(function() {
        $(this).on('click', function() {
            $('.price-pocket_item__link').each(function () {
                $(this).removeClass('price-pocket_item__link__active');
            });
            //add active pos
            $(this).addClass('price-pocket_item__link__active');
            //add atr to next act
            $('#midddleSquarePrice').attr("data", $(this).attr("data"));
            let data = +$(this).attr("data");
            $('#midddleSquarePrice span').text(data.format(0, 3, ' '));
            $('#allPrice span').text(
                ($('#squarePrice').attr("data") * $('#midddleSquarePrice').attr("data")).format(0, 3, ' ')
            );
        });
    });
    //portfolio items tabs
    $(".portfolio-btns__item").each(function() {
        $(this).on('click', function() {
            $(".portfolio-btns__item").each(function() {
                $(this).removeClass("portfolio-btns__item__active");
            })
            $(this).addClass("portfolio-btns__item__active");
        });
    })
    //Jquery scrollbar
    $(".cooperations-items").mCustomScrollbar({
        axis:"x",
        theme:"my-theme"
    });


    //swiper sliders 
    var portfolioSwiper = new Swiper('.portfolio-items',  {
        slidesPerView: 1,
        navigation: {
            nextEl: '.portfolio-item-next',
            prevEl: '.portfolio-item-prev',
        }
    });
    var teamSwiper = new Swiper('.team-items',  {
        slidesPerView: 1,
        navigation: {
            nextEl: '.team-item-next',
            prevEl: '.team-item-prev',
        }
    });

    //functions to destroy on show slider
    function destroySlider(items, itemsWrapper, item, btns, swiper) {
        swiper.destroy(true, true);
        items.removeClass('swiper-container');
        itemsWrapper.removeClass('swiper-wrapper');
        itemsWrapper.addClass('disabled-slider')
        item.each(function(){
            $(this).removeClass('swiper-slide');
            $(this).attr('style', 'width: auto')
        })
        $(btns[0]).css({'display': 'none'});
        $(btns[1]).css({'display': 'none'});
    }
    function showSlider(items, itemsWrapper, item, btns, swiper) {
        let thisSwiper = swiper;
        thisSwiper = new Swiper(items,  {
            slidesPerView: 1,
            navigation: {
                nextEl: btns[0],
                prevEl: btns[1],
            }
        });
        items.addClass('swiper-container');
        itemsWrapper.addClass('swiper-wrapper');
        itemsWrapper.removeClass('disabled-slider')
        item.each(function(){
            $(this).addClass('swiper-slide');
        })
        $('.swiper-notification').remove();
        $(btns[0]).css({'display': 'block'});
        $(btns[1]).css({'display': ''});
    }

    //condition slider show/destroy
    window.addEventListener('resize', () => {
        if (window.innerWidth>=992)  {
            destroySlider($('.portfolio-items'), $('.portfolio-items__wrapper'), $('.portfolio-item'),
            ['.portfolio-item-next', '.portfolio-item-prev'], portfolioSwiper);

            destroySlider($('.team-items'), $('.team-items__wrapper'), $('.team-item'),
            ['.team-item-next', '.team-item-prev'], teamSwiper);
        } else {
            showSlider($('.portfolio-items'), $('.portfolio-items__wrapper'), $('.portfolio-item'),
            ['.portfolio-item-next', '.portfolio-item-prev'], portfolioSwiper);

            showSlider($('.team-items'), $('.team-items__wrapper'), $('.team-item'),
            ['.team-item-next', '.team-item-prev'], teamSwiper);
        }
    })
});

