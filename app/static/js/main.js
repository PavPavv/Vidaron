$(document).ready(function() {
	//menu icon
	const sandwich = function () {
        $(document).on('click', '.catalog-nav__header', function () {
        	let sandwich = $(this).find('.sandwich');
        	let catalog = $(this).parent();
            sandwich.toggleClass('sandwich--active');
            catalog.toggleClass('catalog-nav--active');
        });

        if ($(window).width() < 768) {
        	$(document).on('click', '.sandwich', function () {	
	            $(this).toggleClass('sandwich--active');
	            $('body').toggleClass('fixed-that');
	            $('.mobile-nav__wrapper').toggleClass('mobile-nav__wrapper--active');
	        });
        }
	};

	//
	const popularCategoriesSlider = function() {
		if($(window).width() < 768) {
			$('.js-categories-prev').slick({
				slidesToShow: 2,
				slideToScroll: 1,
			})
		}
	};

	//slider carousel for checked items
	const productPrevSlider = function() {
		let sliderCount = $('.product-slider__count');
		let prodSlider = $('.js-product-slider');

		prodSlider.on('init afterChange', function(event, slick, currentSlide, nextSlide) {
			let i = (currentSlide ? currentSlide : 0) + 1;
			sliderCount.text('Страница ' + i + ' из ' + slick.slideCount);
		});

		prodSlider.slick({
			slidesToShow: 4,
			slideToScroll: 1,
			prevArrow : '.slider-nav--prev',
			nextArrow : '.slider-nav--next',
			infinite: false,
			dots: false,
		    responsive: [
		      {
		        breakpoint: 1239,
		        settings: {
		        slidesToShow: 3,
		        arrow: false,
		        dots: true
		      }
		    }
		  ]
		});
	};
	//open and close menu
	const catalogNavHover = function() {
		if ($(window).width() > 767) {
			$('.catalog-nav__item').hover(
				function() {
					let catalogBody = $(this).closest('.catalog-nav__body');
					catalogBody.css('width',825)
				},
				function() {
					let catalogBody = $(this).closest('.catalog-nav__body');
					catalogBody.css('width','auto')
				}
			)
		} else {
			$(document).on('click','.catalog-nav__item',function() {
				$(this).addClass('catalog-nav__item--active');
				$(this).siblings().removeClass('catalog-nav__item--active');
			});
			$(document).on('click','.catalog-subnav__header',function() {
				$('.catalog-subnav__block').removeClass('catalog-subnav__block--active');
				$(this).closest().addClass('catalog-subnav__block--active');
			});
		}
	};

	//modal window with question about user's current city
	const locationChoose = function() {
		$(document).on('click','.location-question__btn', function() {
			let answer = $(this).data('location');
			$(this).closest('.location-question').hide();
			if(answer === 'no') {
				$(this).closest('.location__body').addClass('is-location-choose');
			}
		});
		$(document).on('click','.location-choose__item', 'location-choose__close', function() {
			$(this).closest('.location__body').removeClass('is-location-choose');
		});
		$(document).on('click','.location__header', function() {
			$(this).siblings('.location__body').addClass('is-location-choose');
		});
	};

	//open and close modal window
	const popupLink = function() {
		$('.js-popup-link').magnificPopup({
			showCloseBtn: false
		});

		$(document).on('click','.popup__close', function() {
			$.magnificPopup.close();
		});
	};

	//form validation for 'Get consultation' link
	const formValidate = function() {
		$('form').each(function() {
			$(this).on('submit', function() {
				$(this).validate({
					rules: {
						name: 'required',
						phone: 'required',
						password: 'required',
						'req-textarea': 'required'
					},
					messages: {
						name: 'Введите корректное имя',
						phone: 'Введите корректный номер',
						password: 'Введите корректный пароль',
						'req-textarea': 'Заполните поле'
					},
					errorPlacement: function (error, element) {
					    element.attr("placeholder", error[0].innerText);
					}
				});

				if ($(this).valid()) {
					let wrap = $(this)[0].closest('.hide-on-success');
					if (wrap) {
						$(wrap).siblings('.show-on-success').show();
						$(wrap).hide();
					}
				}
				return false;
			})
		});
	};

	//display and hide footer map-popup with location of head office
	const contactsPopup = function() {
		$(document).on('click','.contacts-popup__toggle', function(){
			$(this).parent().addClass('contacts-popup--active');
		});
		$(document).on('click','.contacts-popup__close', function(){
			$(this).closest('.contacts-popup').removeClass('contacts-popup--active');
		});
	};

	//user meassure speed of service in notifying modal window
	const reviewLine = function() {
		$(document).on('click','.review-line__number', function() {
			let left = $(this).parent().position().left;
			$(this).parent().siblings().removeClass('review-line__item--active');
			$(this).parent().addClass('review-line__item--active');
			$('.review-line').css('width',left  - 1);
		});
	};


	const simpleBar = function() {
		if($(window).width() > 1239) {
			$.each($('.catalog-subnav'),function(i,v) {
				new SimpleBar(v);
			});
		}
	};

	sandwich();
	popularCategoriesSlider();
	productPrevSlider();
	catalogNavHover();
	locationChoose();
	popupLink();
	formValidate();
	reviewLine();
	contactsPopup();
	simpleBar();
});


const popularCategoriesSlider = function() {
	let sliderElement = $('.js-categories-prev');

	if($(window).width() < 768 && !(sliderElement.hasClass('slick-initialized'))) {
		sliderElement.slick({
			slidesToShow: 2,
			slideToScroll: 1,
		})
	} else if ($(window).width() > 768 && sliderElement.hasClass('slick-initialized')) {
		sliderElement.slick('unslick')
	}
};


$(window).on('resize', function() {
	popularCategoriesSlider();
});




//adding Yandex ARI with maps
if ($('div').is('.contacts-popup__map')) {
	ymaps.ready(function () {
	    var myMapOffice = new ymaps.Map('popup-contacts-office', {
	            center: [55.754578, 37.694953],
	            zoom: 16
	        }, {
	            searchControlProvider: 'yandex#search'
	        }),

	        myPlacemark = new ymaps.Placemark(myMapOffice.getCenter(), {
	            
	        }, {
	            // Опции.
	            iconLayout: 'default#image',
	            // Своё изображение иконки метки.
	            iconImageHref: 'i/icon/locationYa.png',
	            // Размеры метки.
	            iconImageSize: [36, 49],
	            // Смещение левого верхнего угла иконки относительно
	            // её "ножки" (точки привязки).
	            iconImageOffset: [-5, -38]
	        });

	    myMapOffice.geoObjects
	        .add(myPlacemark);
	    myMapOffice.behaviors.disable('scrollZoom');
	    myMapOffice.controls.remove('trafficControl').remove('searchControl').remove('typeSelector').remove('geolocationControl').remove('fullscreenControl').remove('rulerControl');

	    var myMapStock = new ymaps.Map('popup-contacts-stock', {
	            center: [55.563040, 37.759623],
	            zoom: 16
	        }, {
	            searchControlProvider: 'yandex#search'
	        }),

	        myPlacemark2 = new ymaps.Placemark(myMapStock.getCenter(), {
	            
	        }, {
	            // Опции.
	            iconLayout: 'default#image',
	            // Своё изображение иконки метки.
	            iconImageHref: 'i/icon/locationYa.png',
	            // Размеры метки.
	            iconImageSize: [36, 49],
	            // Смещение левого верхнего угла иконки относительно
	            // её "ножки" (точки привязки).
	            iconImageOffset: [-5, -38]
	        });

	    myMapStock.geoObjects
	        .add(myPlacemark2);
	    myMapStock.behaviors.disable('scrollZoom');
	    myMapStock.controls.remove('trafficControl').remove('searchControl').remove('typeSelector').remove('geolocationControl').remove('fullscreenControl').remove('rulerControl');
	});
}