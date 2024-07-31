(function ($) {
	"use strict";

	// LocalStorage JS
	let html = document.documentElement;
	let Theme = localStorage.theme;
	let ThemeLayout = localStorage.layout;
	let ThemeNavbar = localStorage.navbar;

	let darkMode = Theme === "dark";
	let rtlLayout = ThemeLayout === "rtl";
	let topMenu = ThemeNavbar === "top";

	// Theme Mode Toggle
	if (Theme) {
		html.setAttribute("data-theme", Theme);

		if (Theme === "dark") {
			localStorage.theme === "dark"
			$(".customizer__btn--light").removeClass("active");
			$(".customizer__btn--dark").addClass("active");

		} else {
			localStorage.theme === "light"
		}
	}

	// Theme Layout Toggle
	if (ThemeLayout) {

		html.setAttribute("dir", ThemeLayout);

		if (ThemeLayout === "rtl") {
			localStorage.themeLayout === "rtl"
			$(".customizer__btn--ltr").removeClass("active");
			$(".customizer__btn--rtl").addClass("active");
		} else {
			localStorage.themeLayout === "ltr"
		}
	}

	// Theme Navbar Toggle
	if (ThemeNavbar) {

		html.setAttribute("data-nav", ThemeNavbar);

		if (ThemeNavbar === "top") {
			localStorage.themeNavbar === "top"
			$(".customizer__btn--side").removeClass("active");
			$(".customizer__btn--top").addClass("active");
		} else {
			localStorage.themeNavbar === "side"
		}
	}

	// Dark Theme
	function darkTheme(e) {
		let Theme = "dark";
		localStorage.theme = Theme;
		document.documentElement.setAttribute("data-theme", Theme);

		darkMode = true;
	}

	// Light Theme
	function lightTheme(e) {
		let Theme = "light";
		localStorage.theme = Theme;
		document.documentElement.setAttribute("data-theme", Theme);

		darkMode = false;
	}

	// RTL Layout
	function rtlTheme(e) {
		let ThemeLayout = "rtl";
		localStorage.layout = ThemeLayout;
		document.documentElement.setAttribute("dir", ThemeLayout);

		rtlLayout = true;
	}

	// LTR Layout
	function ltrTheme(e) {
		let ThemeLayout = "ltr";
		localStorage.layout =  ThemeLayout;
		document.documentElement.setAttribute("dir", ThemeLayout);

		rtlLayout = false;
	}

	// Top Navbar
	function topTheme(e) {
		let ThemeNavbar = "top";
		localStorage.navbar = ThemeNavbar;
		document.documentElement.setAttribute("data-nav", ThemeNavbar);

		topMenu = true;
	}

	// Side Navbar
	function sideTheme(e) {
		let ThemeNavbar = "side";
		localStorage.navbar =  ThemeNavbar;
		document.documentElement.setAttribute("data-nav", ThemeNavbar);

		topMenu = false;
	}

	// Light Demo Add
	$(".customizer__btn--light").click(function() {
		$(".customizer__btn--dark").removeClass("active");
		$(".customizer__btn--light").addClass("active");

		lightTheme();
	})

	// Dark Demo Add
	$(".customizer__btn--dark").click(function() {
		$(".customizer__btn--light").removeClass("active");
		$(".customizer__btn--dark").addClass("active");

		darkTheme();
	})

	// LTR Layout Add
	$(".customizer__btn--ltr").click(function() {
		$(".customizer__btn--rtl").removeClass("active");
		$(".customizer__btn--ltr").addClass("active");

		ltrTheme();

		// if($("body").hasClass("layout-rtl")) {
		// 	$("body").removeClass("layout-rtl");
		// }
		// $('html').attr('dir', 'ltr');
		// $("body").addClass("layout-ltr");
	})

	// RTL Layout Add
	$(".customizer__btn--rtl").click(function() {
		$(".customizer__btn--ltr").removeClass("active");
		$(".customizer__btn--rtl").addClass("active");

		rtlTheme();
  	})

	// Side Navbar Add
	$(".customizer__btn--side").click(function() {
		$(".customizer__btn--top").removeClass("active");
		$(".customizer__btn--side").addClass("active");

		sideTheme();
	})

	// Top Navbar Add
	$(".customizer__btn--top").click(function() {
		$(".customizer__btn--side").removeClass("active");
		$(".customizer__btn--top").addClass("active");

		topTheme();
	})

	// Menu Active Class
	function addActiveClass(pageSlug) {
		let menuLinks = $('.header__menu__link, .sidebar__menu__link');
		menuLinks.removeClass('active');

		// Find the corresponding menu item and add the "active" class
		menuLinks.each(function () {
			let menuItemPath = $(this).attr('href');
			let menuItemName = menuItemPath.split('/').pop().split('.')[0];
			if (menuItemName === pageSlug || menuItemName + '#' === pageSlug) {
				let menuParent = $(this).closest('.has-children').find('ul').siblings('a');
				$(this).addClass('active');
				menuParent.addClass('active');
				menuParent.siblings('.sidebar__submenu').slideDown();

			} else if (pageSlug === '' || pageSlug === '#') {
				$('.header__menu__link').first().addClass('active');
				$('.sidebar__menu__link').first().addClass('active');

				$('.header__menu__link').first().siblings('.header__submenu').find('.header__menu__link').first().addClass('active');
				$('.header__menu__link').first().siblings('.header__submenu').slideDown();

				$('.sidebar__menu__link').first().siblings('.sidebar__submenu').find('.sidebar__menu__link').first().addClass('active');
				$('.sidebar__menu__link').first().siblings('.sidebar__submenu').slideDown();
			}
		});
	}

	// Get the path
	let path = window.location.pathname;
	let pathSegments = path.split('/');
	let pageSlug = pathSegments[pathSegments.length - 1].split('.')[0];

	addActiveClass(pageSlug);

	$(".sidebar__menu__link").click(function() {
		let $clickedItem = $(this);

        // Toggle active class and slideToggle for the clicked item's submenu
        $clickedItem.toggleClass("active");
        $clickedItem.siblings('.sidebar__submenu').slideToggle();

        // Remove active class and slideUp for other menu items
        $(".sidebar__menu__link").not($clickedItem).removeClass("active");
        $(".sidebar__menu__link").not($clickedItem).siblings(".sidebar__submenu").slideUp();
	})

  	// Customizer Toggle
  	$(".btn__customizer").click(function() {
		$(".customizer").toggleClass("active");
		$("body").addClass("overlay_active");
  	});

	// Customizer Close
	$(".customizer-overlay, .btn__customizer-close").click(function() {
		$(".customizer").removeClass("active");
		$("body").removeClass("overlay_active");
	})

  	// Sidebar Toggle
  	$(".btn__toggle-sidebar").click(function(e) {
		e.preventDefault();
		$(".sidebar").toggleClass("active");
		$(".sidebar").animate({
			width: "toggle"
		});
		$("body").addClass("overlay_active");
  	});

  	// Sidebar Close
  	$(".sidebar__close").click(function(e) {
		e.preventDefault();
		$(".sidebar").removeClass("active");
		$(".sidebar").animate({
			width: "toggle"
		});
		$("body").removeClass("overlay_active");
  	});

	// Datepicker Open
	$("#content__filter__label").click(function() {
		$('#content__filter__date').datepicker().datepicker('show');
  	});

  	// Content Toggle
  	$(".content__toggle__btn").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(this).siblings(".content__toggle__content").slideToggle();
  	});

  	// Task Sidebar Toggle
  	$(".btn__toggle-task").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(".content__todo__sidebar").slideToggle();
  	});

  	// Calendar Sidebar Toggle
  	$(".content__calendar__toggle").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(".content__calendar__sidebar").slideToggle();
  	});

  	// Chat Sidebar Toggle
  	$(".content__chat__toggle").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(".content__chat__sidebar").slideToggle();
  	});

  	// Chat Action Toggle
  	$(".content__chat__action__toggle__btn").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(this).siblings(".content__chat__action__toggle__content").slideToggle();
  	});

  	// Popup Toggle
  	$(".content__header__quickaction__link").click(function(e) {
		e.preventDefault();
		var $popup = $(this).siblings('.content__header__popup');

		$popup.slideToggle();
		$(".content__header__popup").not($popup).slideUp(0);
  	});


	// Add Todo
	$(".btn__add-modal").click(function() {
		$(".content__modal__form").addClass("active");
		$("body").addClass("overlay_active");
  	})

	// Close Todo
	$(".content__modal__form__close").click(function() {
		$(".content__modal__form").removeClass("active");
		$("body").removeClass("overlay_active");
  	})

	// Chat Mute Toggle
	$(".content__chat__header__filter__mute-btn").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
	})

	// Chat Search Toggle
	$(".content__chat__header__filter__btn").click(function(e) {
		e.preventDefault();

		var $clickedItem = $(this);

		// Toggle the 'active' class on the clicked item
		$clickedItem.toggleClass("active");

		// Slide toggle the content of the clicked item
		$clickedItem.siblings(".content__chat__header__filter__content").slideToggle();

		// Close the content of other items if they are open
		$(".content__chat__header__filter__btn").not($clickedItem).removeClass("active");
		$(".content__chat__header__filter__btn").not($clickedItem).siblings(".content__chat__header__filter__content").slideUp();
	})

	// Toggle Input Type Password
	$(".toggle-password-type").click(function(e) {
		e.preventDefault();
		const input = $(this).siblings("input");

		if (input.attr('type') === 'password') {
			$(this).removeClass("uil-eye");
			$(this).addClass("uil-eye-slash");
			input.attr('type', 'text');
		} else {
			$(this).addClass("uil-eye");
			$(this).removeClass("uil-eye-slash");
			input.attr('type', 'password');
		}
	});

	// Invoice Chat Toggle
	$(".content__invoice__chat__toggler").click(function(e) {
		e.preventDefault();
		var $invoiceChatContent = $(this).siblings('.content__invoice__chat__wrapper');

		$invoiceChatContent.stop().animate({
			width: 'toggle', // toggles between 0% and 100%
			opacity: 'toggle' // toggles between 0 and 1
		}, 300); // Adjust the duration as needed
	});

	// CountDown
	let day = document.querySelector('.countdown__days');
	let hour = document.querySelector('.countdown__hours');
	let minute = document.querySelector('.countdown__minutes');
	let second = document.querySelector('.countdown__seconds');

  	function setCountdown() {

		// Set countdown date
		let countdownDate = new Date('Jan 01, 2025 16:40:25').getTime();

		// Update countdown every second
		let updateCount = setInterval(function(){

			// Get today's date and time
			let todayDate = new Date().getTime();

			// Get distance between now and countdown date
			let distance = countdownDate - todayDate;

			let days = Math.floor(distance / (1000 * 60 * 60 *24));

			let hours = Math.floor(distance % (1000 * 60 * 60 *24) / (1000 * 60 *60));

			let minutes = Math.floor(distance % (1000 * 60 * 60 ) / (1000 * 60));

			let seconds = Math.floor(distance % (1000 * 60) / 1000);

			// Display values in html elements
			if (day) {
				day.textContent = days;
			}
			if (hour) {
				hour.textContent = hours;
			}
			if (minute) {
				minute.textContent = minutes;
			}
			if (second) {
				second.textContent = seconds;
			}

			// if countdown expires
			if(distance < 0){
				clearInterval(updateCount);
				document.getElementById("countdown").innerHTML = '<h1>EXPIRED</h1>'
			}
		}, 300)
	}

	setCountdown()

	// Editor
	if($('.content__chat__editor').length) {
		tinymce.init({
			selector: '.content__chat__editor',  // change this value according to your HTML
		});
	}

	// Calendar
	if($("#calendar").length) {
		$('#calendar').fullCalendar({
			themeSystem: 'jquery-ui',
			navLinks: true,
			height: 650,
			header: {
			  left: 'title, prev, next',
			  right: 'month,agendaWeek,agendaDay'
			},
			eventLimit: true, // allow "more" link when too many events
			eventSources: [
			  	{
					url: 'https://fullcalendar.io/demo-events.json'
				}
			],
			eventRender: function(event, element, view) {
			   var theDate = event.start
				var endDate = event.dowend;
				var startDate = event.dowstart;

				if (theDate >= endDate) {
					return false;
				}

				if (theDate <= startDate) {
				  	return false;
				}
			},
			events: [
				{
					id: 1,
					title:"Lunch",
					start:'12:00',
					end:  '12:30',
					dow: [1, 2, 3, 4, 5],
					dowstart: moment('2018-04-01', 'YYYY-MM-DD'),
					dowend: moment('2018-05-01', 'YYYY-MM-DD'),
					className: 'fc-event-lunch'
				}
			],
			businessHours: [{
				dow: [1,2,3,4,5],
				start: '08:00',
				end: '16:30'
			}],
			minTime: '06:00',
			maxTime: '21:00'
		});
	}

	// Line Chart
	let lineOptions = {
		series: [
			{
				name: "Product One",
				data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
			},

			{
				name: "Product Two",
				data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
			},
		],

		chart: {
			fontFamily: "Jost, sans-serif",
			height: 335,
			type: "area",
			background: "transparent",
			toolbar: {
				show: false,
			},
		},

		xaxis: {
			type: "category",
			categories: [
				"14:00",
				"14:10",
				"14:20",
				"14:30",
				"14:40",
				"14:50",
				"14:60",
				"15:00",
				"15:10",
				"15:20",
				"15:30",
			],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			crosshairs: {
				show: false
			},
		},
		yaxis: {
			labels: {
				offsetX: -10
			},
			title: {
				style: {
				fontSize: "0px",
				},
			},
			min: 0,
			max: 75,
			tickAmount: 3,
		},
		colors: ["#FFBB54", "#00A389"],
		fill: {
			colors: ['transparent', 'transparent'],
			type: ['solid', 'solid'],
		},

		legend: {
			show: true,
			position: "top",
			horizontalAlign: "right",
		},
		stroke: {
			width: [5, 5],
			curve: "smooth",
		},
		markers: {
			show: false,
		},
		labels: {
			show: false,
		},
		dataLabels: {
			enabled: false,
		},

		grid: {
			show: true,
			xaxis: {
				lines: {
					show: true,
				},
			},
			yaxis: {
				lines: {
					show: true,
				},
			},
			column: {
				opacity: 0.2
			},
		},

		tooltip: {
			enabled: true,
			custom: function({ series, seriesIndex, dataPointIndex, w }) {
				return '<div class="custom-tooltip">' +
				'<span class="custom-tooltip__title">' + w.globals.series[seriesIndex][dataPointIndex] + ' Request</span>' +
				'<span class="custom-tooltip__subtitle"> From ' + w.globals.seriesNames[seriesIndex] + '</span>' +
				'</div>';
			}
		},

		responsive: [
			{
				breakpoint: 1024,
				options: {
				chart: {
					height: 300,
				},
				},
			},
			{
				breakpoint: 1366,
				options: {
				chart: {
					height: 350,
				},
				},
			},
		],

	};

	let lineChartContainer = document.querySelector("#line-chart");
	let lineChart = lineChartContainer && new ApexCharts(lineChartContainer, lineOptions);
	lineChart && lineChart.render();


	// Line Chart
	let bitcoinOptions = {
		series: [
			{
				name: "Buy",
				data: [9400, 9200, 9700, 9400, 9200, 9600],
			},

			{
				name: "Sell",
				data: [9150, 9650, 9350, 9750, 9250, 9650],
			},
		],

		chart: {
			fontFamily: "Jost, sans-serif",
			height: 335,
			type: "area",
			background: "transparent",
			toolbar: {
				show: false,
			},
		},

		xaxis: {
			type: "category",
			categories: [
				"3:00 PM",
				"4:00 PM",
				"5:00 PM",
				"6:00 PM",
				"7:00 PM",
				"8:00 PM",
			],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			crosshairs: {
				show: false
			},
		},
		yaxis: {
			labels: {
				offsetX: -10
			},
			title: {
				style: {
					fontSize: "0px",
				},
			},
			min: 9100,
			max: 9800,
			tickAmount: 3,
			opposite: true,
		},
		colors: ["#00A389", "#FF5B5B"],
		fill: {
			colors: ['transparent', 'transparent'],
			type: ['solid', 'solid'],
		},

		legend: {
			show: true,
			position: "top",
			horizontalAlign: "right",
			fontSize: '16px',
      		fontWeight: 500,
		},
		stroke: {
			width: [5, 5],
			curve: "smooth",
		},
		markers: {
			show: false,
		},
		labels: {
			show: false,
		},
		dataLabels: {
			enabled: false,
		},

		grid: {
			show: true,
			xaxis: {
				lines: {
					show: true,
				},
			},
			yaxis: {
				lines: {
					show: true,
				},
				horizontalAlign: "right",
			},
			column: {
				opacity: 0.2
			},
		},

		tooltip: {
			enabled: true,
			custom: function({ series, seriesIndex, dataPointIndex, w }) {
				return '<div class="custom-tooltip">' +
				'<span class="custom-tooltip__title">' + w.globals.series[seriesIndex][dataPointIndex] + ' Request</span>' +
				'<span class="custom-tooltip__subtitle"> From ' + w.globals.seriesNames[seriesIndex] + '</span>' +
				'</div>';
			}
		},

		responsive: [
			{
				breakpoint: 1024,
				options: {
					chart: {
						height: 300,
					},
				},
			},
			{
				breakpoint: 1366,
				options: {
					chart: {
						height: 350,
					},
				},
			},
		],

	};

	// Bitcoin
	let bitcoinChartContainer = document.querySelector("#bitcoin-chart");
	let bitcoinChart = bitcoinChartContainer && new ApexCharts(bitcoinChartContainer, bitcoinOptions);
	bitcoinChart && bitcoinChart.render();

	// Ethererum
	let ethererumChartContainer = document.querySelector("#ethererum-chart");
	let ethererumChart = ethererumChartContainer && new ApexCharts(ethererumChartContainer, bitcoinOptions);
	ethererumChart && ethererumChart.render();

	// Litecoin
	let litecoinChartContainer = document.querySelector("#litecoin-chart");
	let litecoinChart = litecoinChartContainer && new ApexCharts(litecoinChartContainer, bitcoinOptions);
	litecoinChart && litecoinChart.render();


	// Market Activity Chart
	let activityOptions = {
		series: [
			{
				name: "Your Profits",
				data: [23, 11, 22, 27, 13, 22, 37, 21],
			},

			{
				name: "Buys",
				data: [30, 25, 36, 30, 45, 35, 64, 52],
			},

			{
				name: "Sells",
				data: [70, 60, 43, 38, 40, 55, 24, 16],
			},
		],

		chart: {
			fontFamily: "Jost, sans-serif",
			height: 335,
			type: "area",
			background: "transparent",
			toolbar: {
				show: false,
			},
		},

		xaxis: {
			type: "category",
			categories: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat",
			],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			crosshairs: {
				show: false
			},
		},
		yaxis: {
			labels: {
				offsetX: -10
			},
			title: {
				style: {
				fontSize: "0px",
				},
			},
			min: 0,
			max: 75,
			tickAmount: 3,
		},
		colors: ["#AB54DB", "#00A389", "#FF5B5B"],
		fill: {
			colors: ['transparent', 'transparent', 'transparent'],
			type: ['solid', 'solid', 'solid'],
		},

		legend: {
			show: true,
			position: "top",
			horizontalAlign: "left",
		},
		stroke: {
			width: [5, 5, 5],
			curve: "smooth",
		},
		markers: {
			show: false,
		},
		labels: {
			show: false,
		},
		dataLabels: {
			enabled: false,
		},

		grid: {
			show: true,
			xaxis: {
				lines: {
					show: true,
				},
			},
			yaxis: {
				lines: {
					show: true,
				},
			},
			column: {
				opacity: 0.2
			},
		},

		tooltip: {
			enabled: true,
			custom: function ({ series, seriesIndex, dataPointIndex, w }) {
				// Calculate the percentage based on the max value
				let value = w.globals.series[seriesIndex][dataPointIndex]
				var maxValue = Math.max(...series[0]);
				var percentage = ((value / maxValue) * 10).toFixed(0);

				return '<div class="custom-tooltip">' +
				'<span class="custom-tooltip__title">' + percentage + '%</span>' +
				'<span class="custom-tooltip__subtitle">' + value + ' Visitors</span>' +
				'</div>';
			},
		},

		responsive: [
			{
				breakpoint: 1024,
				options: {
				chart: {
					height: 300,
				},
				},
			},
			{
				breakpoint: 1366,
				options: {
					chart: {
						height: 350,
					},
				},
			},
		],

	};

	let activityChartContainer = document.querySelector("#market-activity-chart");
	let activityChart = activityChartContainer && new ApexCharts(activityChartContainer, activityOptions);
	activityChart && activityChart.render();

	// Bar Chart
	let barOptions = {
		series: [{
			data: [40, 31, 40, 10, 40, 36, 32]
		}],
		chart: {
			height: 250,
			type: 'bar',
			toolbar: {
				show: false,
			},
		},
		colors: ["#AB54DB26"],
		plotOptions: {
		bar: {
			columnWidth: 50,
			borderRadius: 12,
		}
		},
		dataLabels: {
		enabled: false,
		},

		xaxis: {
			categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			position: 'bottom',
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			},
			crosshairs: {
				show: false,
			},
			tooltip: {
				enabled: false,
			}
		},
		yaxis: {
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false,
			},
			labels: {
				show: false,
			},
		},

		grid: {
			show: false,
			padding: { left: -20, right: -20, top: 0, bottom: 0 },
		},

		tooltip: {
			enabled: true,

			custom: function ({ series, seriesIndex, dataPointIndex, w }) {
				// Calculate the percentage based on the max value
				let value = w.globals.series[seriesIndex][dataPointIndex]
				var maxValue = Math.max(...series[0]);
				var percentage = ((value / maxValue) * 10).toFixed(0);

				return '<div class="custom-tooltip">' +
				'<span class="custom-tooltip__title">' + percentage + '%</span>' +
				'<span class="custom-tooltip__subtitle">' + value + ' Visitors</span>' +
				'</div>';
			},
		},

	};

	let barChartContainer = document.querySelector("#column-chart");
	let barChart = barChartContainer && new ApexCharts(barChartContainer, barOptions);
	barChart && barChart.render();

	// Pie Chart
	let pieOptions = {
		series: [44, 55, 41],
		labels: ['Fixed Servers', 'Down Servers', 'Running'],
		colors: ["#AB54DB", "#EF9A91", "#F1E6B9"],
		plotOptions: {
			pie: {
				expandOnClick: false,
				startAngle: 0,
				dataLabels: {
					enabled: false,
				},
				customScale: 1, // Adjust this value to control the series border radius
			},
			stroke: {
				width: 25, // Width of the stroke
				colors: ['transparent'], // Color of the stroke (use 'transparent' to make it invisible)
			},
		},
		chart: {
			height: '350px',
			type: 'donut',
		},
		responsive: [{
			breakpoint: 576,
			options: {
				chart: {
					height: '550px'
				}
			},
		}],
		legend: {
			show: true,
			position: "bottom",
			fontSize: '14px',
      		fontWeight: 500,
			formatter: function (seriesName, opts) {
				let data = opts.w.globals.seriesTotals[opts.seriesIndex];
				return seriesName + ":  " + data;
				// return `<div class="custom-legend-item">${seriesName} <span> ${data} </span></div>`;
			},
		},
		responsive: [{
			breakpoint: 480,
			options: {
				chart: {
					width: 200
				},
				legend: {
					position: 'bottom'
				}
			}
		}]
	};

	let pieChartContainer = document.querySelector("#pie-chart");
	let pieChart = pieChartContainer && new ApexCharts(pieChartContainer, pieOptions);
	pieChart && pieChart.render();


	// Summary Chart
	let summaryOptions = {
		series: [30, 34, 6, 30],
		labels: ['Ethereum', 'Litecoin', 'Ripple', 'Bitcoin'],
		colors: ["#00ADA3", "#374C98", "#23292F", "#FFBB54"],
		plotOptions: {
			pie: {
				expandOnClick: false,
				startAngle: 0,
				dataLabels: {
					enabled: false,
				},
				customScale: 1, // Adjust this value to control the series border radius
			},
			stroke: {
				width: 25, // Width of the stroke
				colors: ['transparent'], // Color of the stroke (use 'transparent' to make it invisible)
			},
		},
		chart: {
			height: '350px',
			type: 'donut',
		},
		responsive: [{
			breakpoint: 576,
			options: {
				chart: {
					height: '550px'
				}
			},
		}],
		legend: {
			show: true,
			position: "bottom",
			fontSize: '14px',
      		fontWeight: 500,
			formatter: function (seriesName, opts) {
				let data = opts.w.globals.seriesTotals[opts.seriesIndex];
				return seriesName + ":  " + data;
				// return `<div class="custom-legend-item">${seriesName} <span> ${data} </span></div>`;
			},
		},
		responsive: [{
			breakpoint: 480,
			options: {
				chart: {
					width: 200
				},
				legend: {
					position: 'bottom'
				}
			}
		}]
	};

	let summaryChartContainer = document.querySelector("#summary-chart");
	let summaryChart = summaryChartContainer && new ApexCharts(summaryChartContainer, summaryOptions);
	summaryChart && summaryChart.render();

	// Stack Chart
	let stackOptions = {
		chart: {
			type: 'bar',
			height: 350,
			stacked: true,
			toolbar: {
				show: false,
			},
		},
		series: [
			{
				name: 'PRODUCT A',
				data: [2, 5, 1, 7, 2, 4, 1, 4],
				dataLabels: false,
			},
			{
				name: 'PRODUCT B',
				data: [1, 3, 2, 8, 3, 7, 3, 2],
				dataLabels: false,
			},
			{
				name: 'PRODUCT C',
				data: [1, 7, 5, 3, 2, 4, 5, 3],
				dataLabels: false,
			}
		],
		xaxis: {
			type: "category",
			categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			crosshairs: {
				show: false
			},
		},
		yaxis: {
			opposite: true,
			labels: {
				show: true,
				formatter: function (val) {
					return val + " AM";
				},
				offsetX: -17,
			},
			min: 0,
			max: 10,
			tickAmount: 5,
		},
		legend: {
			show: false,
		},
		grid: {
			show: false,
			padding: {
				left: -10,
				right: 0
			},
		},
		tooltip: {
			enabled: false,
		},
		dataLabels: {
			enabled: false,
		},
		plotOptions: {
			bar: {
				columnWidth: 18,
				borderRadius: 0
			}
		}
	};

	let stackChartContainer = document.querySelector("#stack-chart");
	let stackChart = stackChartContainer && new ApexCharts(stackChartContainer, stackOptions);
	stackChart && stackChart.render();

	// Income Chart
	let incomeOptions = {
		series: [{
			data: [40, 32, 45, 65, 23, 54, 23]
		}],

		chart: {
			height: 350,
			type: 'bar',
			toolbar: {
				show: false,
			}
		},

		colors: ["#1BD5FE"],

		fill: {
			type: "gradient",
			gradient: {
				type: "vertical",
				shadeIntensity: 1,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100],
				gradientToColors: ["#216BDB"]
			}
		},

		plotOptions: {
			bar: {
				columnWidth: 50,
				borderRadius: 12,
			}
		},

		dataLabels: {
			enabled: false,
		},

		xaxis: {
			categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			position: 'bottom',
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			crosshairs: {
				show: false,
			},
			tooltip: {
				enabled: false,
			}
		},

		yaxis: {
			labels: {
				show: true,
				offsetX: 0
			},
			min: 0, // Set the min and max as actual category values.
			max: 70,
			tickAmount: 3,
		},

		grid: {
			show: true,
			padding: { left: 0, right: 0, top: 0, bottom: 0 },
		},

		tooltip: {
			enabled: true,
			custom: function ({ series, seriesIndex, dataPointIndex, w }) {
				// Calculate the percentage based on the max value
				let value = w.globals.series[seriesIndex][dataPointIndex]
				var maxValue = Math.max(...series[0]);
				var percentage = ((value / maxValue) * 10).toFixed(0);

				// Get the mouse position from the global variable or state
				var mouseX = window.mouseX || 0;
				var mouseY = window.mouseY || 0;

				// Calculate the position of the tooltip above the bar
				var tooltipX = mouseX - 50;
				var tooltipY = mouseY - 30; // Adjust the offset as needed

				return '<div class="custom-tooltip" style="left:' + tooltipX + 'px; top:' + tooltipY + 'px;">' +
				  '<span class="custom-tooltip__title">$' + percentage + '</span>' +
				  '<span class="custom-tooltip__subtitle">' + value + ' Visitors</span>' +
				  '</div>';
			},
		},
	};

	let incomeChartContainer = document.querySelector("#income-chart");
	let incomeChart = incomeChartContainer && new ApexCharts(incomeChartContainer, incomeOptions);
	incomeChart && incomeChart.render();

	// Expense Chart
	let expenseOptions = {
		series: [{
			data: [40, 32, 45, 65, 23, 54, 23]
		}],

		chart: {
			height: 350,
			type: 'bar',
			toolbar: {
				show: false,
			},
		},

		colors: ["#FFBB54"],

		fill: {
			type: "gradient",
			gradient: {
				type: "vertical",
				shadeIntensity: 1,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100],
				gradientToColors: ["#FF3300"]
			}
		},

		plotOptions: {
			bar: {
				columnWidth: 50,
				borderRadius: 12,
			}
		},

		dataLabels: {
			enabled: false,
		},

		xaxis: {
			categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			position: 'bottom',
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			crosshairs: {
				show: false,
			},
			tooltip: {
				enabled: false,
			}
		},

		yaxis: {
			labels: {
				show: true,
				offsetX: 0
			},
			min: 0, // Set the min and max as actual category values.
			max: 70,
			tickAmount: 3,
		},

		grid: {
			show: true,
			padding: { left: 0, right: 0, top: 0, bottom: 0 },
		},

		tooltip: {
			enabled: true,
			custom: function ({ series, seriesIndex, dataPointIndex, w }) {
				// Calculate the percentage based on the max value
				let value = w.globals.series[seriesIndex][dataPointIndex]
				var maxValue = Math.max(...series[0]);
				var percentage = ((value / maxValue) * 10).toFixed(0);

				// Get the mouse position from the global variable or state
				var mouseX = window.mouseX || 0;
				var mouseY = window.mouseY || 0;

				// Calculate the position of the tooltip above the bar
				var tooltipX = mouseX - 50;
				var tooltipY = mouseY - 30; // Adjust the offset as needed

				return '<div class="custom-tooltip" style="left:' + tooltipX + 'px; top:' + tooltipY + 'px;">' +
					'<span class="custom-tooltip__title">$' + percentage + '</span>' +
					'<span class="custom-tooltip__subtitle">' + value + ' Visitors</span>' +
					'</div>';
			},
		},
	};

	let expenseChartContainer = document.querySelector("#expense-chart");
	let expenseChart = expenseChartContainer && new ApexCharts(expenseChartContainer, expenseOptions);
	expenseChart && expenseChart.render();



	if($("#chart-5").length){
		var options = {
			series: [80],
			chart: {
				height: 120,
				type: "radialBar",
			},
			plotOptions: {
				show: false,
				radialBar: {
					show: false,
					dataLabels: {
						show: false,
					}
				}
			},
			stroke: {
				width: 1, // Width of the stroke
				colors: ['transparent'], // Color of the stroke (use 'transparent' to make it invisible)
			},
			fill: {
				type: 'gradient',
				gradient: {
					shade: 'dark',
					type: 'horizontal',
					shadeIntensity: 1,
					gradientToColors: ['#0061FF'],
					inverseColors: true,
					opacityFrom: 1,
					opacityTo: .5,
					stops: [0, 100]
				}
			},
			labels: ["Median Ratio"]
		};
		var chart = new ApexCharts(document.querySelector("#chart-5"), options);
		chart.render();
	};


	if($("#chart-6").length){
		var optionsTwo = {
			series: [50],
			chart: {
				height: 120,
				type: "radialBar",
			},
			plotOptions: {
			show: false,
			radialBar: {
				show: false,
				dataLabels: {
				show: false,
				}
			}
			},
			stroke: {
				width: 1, // Width of the stroke
				colors: ['transparent'], // Color of the stroke (use 'transparent' to make it invisible)
			},
			fill: {
				type: 'gradient',
				gradient: {
				shade: '#34A853',
				type: 'horizontal',
				shadeIntensity: 1,
				gradientToColors: ['#34A853'],
				inverseColors: true,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100]
				}
			},
			labels: ["Median Ratio"]
		};
		var chart = new ApexCharts(document.querySelector("#chart-6"), optionsTwo);
		chart.render();
	};

	if($("#chart-7").length){
		var optionsThree = {
			series: [70],
			chart: {
				height: 120,
				type: "radialBar",
			},
			plotOptions: {
				show: false,
				radialBar: {
					show: false,
					dataLabels: {
						show: false,
					}
				}
			},
			stroke: {
				width: 1, // Width of the stroke
				colors: ['transparent'], // Color of the stroke (use 'transparent' to make it invisible)
			},
			fill: {
				type: 'gradient',
				gradient: {
					shade: '#0364B8',
					type: 'horizontal',
					shadeIntensity: 1,
					gradientToColors: ['#0364B8'],
					inverseColors: true,
					opacityFrom: 1,
					opacityTo: 1,
					stops: [0, 100]
				}
			},
			labels: ["Median Ratio"]
		};

		var chart = new ApexCharts(document.querySelector("#chart-7"), optionsThree);
		chart.render();
	};

	if($("#chart-8").length){
		var optionsFour = {
			series: [30],
			chart: {
				height: 120,
				type: "radialBar",
			},
			plotOptions: {
				show: false,
				radialBar: {
					show: false,
					dataLabels: {
					show: false,
					}
				}
			},
			stroke: {
				width: 1, // Width of the stroke
				colors: ['transparent'], // Color of the stroke (use 'transparent' to make it invisible)
			},
			fill: {
				type: 'gradient',
				gradient: {
					shade: '#8AD2F7',
					type: 'horizontal',
					shadeIntensity: 1,
					gradientToColors: ['#8AD2F7'],
					inverseColors: true,
					opacityFrom: 1,
					opacityTo: .5,
					stops: [0, 100]
				}
			},
			labels: ["Median Ratio"]
		};

		var chart = new ApexCharts(document.querySelector("#chart-8"), optionsFour);
		chart.render();
	};


	// Kanban Board JS
	$(document).ready(function(){
		var drake = dragula([document.querySelector('#one'), document.querySelector('#two'), document.querySelector('#three'), document.querySelector('#four'), document.querySelector('#five'), document.querySelector('#won')]);

		drake.on('drag', function(el){
			el.classList.add('gu-transit');
		});

		drake.on('drop', function(el){
			el.classList.remove('gu-transit');
		});
	});



})(jQuery);
