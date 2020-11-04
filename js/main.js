/**
 * NodeList.prototype.forEach() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
 */
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

/* Фильтр на моб. устройствах */
const sidebarToggleBtn = document.querySelector('.menu-icon-wrapper');
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');

//Клик по кнопке для скрытия/показа фильтра
sidebarToggleBtn.onclick = function () {
	menuIcon.classList.toggle('menu-icon-active');
	sidebar.classList.toggle('sidebar--moblie-active');
}

/* Показать еще 3 карточки */
const btnShowMoreCards = document.querySelector('.btn-more');
const hiddenCard = document.querySelectorAll('.card-link--hidden');

//Клик по кнопке и показ 3-х скрытых карточек
btnShowMoreCards.addEventListener('click', function () {
	hiddenCard.forEach(function (card) {
		card.classList.remove('card-link--hidden');
	});
});

/* Показать/скрыть контент виджетов  */
const widgets = document.querySelectorAll('.widget');

widgets.forEach(function (widget) {
	widget.addEventListener('click', function (e) {
		if (e.target.classList.contains('widget__title')) {
			e.target.classList.toggle('widget__title--active');
			e.target.nextElementSibling.classList.toggle('widget__body--hidden');
		}
	});
});

/* Location - кнопка Любая */

const checkBoxAny = document.querySelector('#location-05');
const topLocationCheckboxes = document.querySelectorAll('[data-location-param]');

//Выбор кнопки Любая и отключение других чекбоксов
checkBoxAny.addEventListener('change', function () {
	if (checkBoxAny.checked) {
		topLocationCheckboxes.forEach(function (item) {
			item.checked = false;
		});
	}

});
//Отклбчаем кнопку Любая, при нажатии других чекбоксов
topLocationCheckboxes.forEach(function (item) {
	item.addEventListener('change', function () {
		if (checkBoxAny.checked) {
			checkBoxAny.checked = false;
		}
	});
});

//Показать еще 3 доп. опции в фильтре

const showMoreOptions = document.querySelector('.widget__btn-show-hidden');
const hiddenCheckboxes = document.querySelectorAll('.checkbox--hidden');

showMoreOptions.onclick = function (e) {
	e.preventDefault();

	//Если блоки скрыты - значит показываем
	if (showMoreOptions.dataset.options == 'hidden') {
		hiddenCheckboxes.forEach(function (item) {
			item.style.display = 'block';
		});
		showMoreOptions.innerText = 'Скрыть дополнительные опции';
		showMoreOptions.dataset.options = 'visible';
	}
	//Если блоки видны - значит скрываем 
	else if (showMoreOptions.dataset.options == 'visible') {
		hiddenCheckboxes.forEach(function (item) {
			item.style.display = 'none';
		});
		showMoreOptions.innerText = 'Показать еще';
		showMoreOptions.dataset.options = 'hidden';
	}
}