var menu_level_1 = document.querySelectorAll('.menu-level-1 .qc-hover')
var menu_level_2 = document.querySelectorAll('.menu-level-2')
var qc_log_icon = document.querySelector('.qc-log-icon')
var menu_lv2s = document.querySelectorAll('.menu-lv2')
var tabs = document.querySelectorAll('.tab-wrapper span[role=tab]')
var filter_btns = document.querySelectorAll('.filter-btn')
var filtrateu_menus = document.querySelectorAll('.filtrateu-menu')

var batchBind = function (dom, eventType, callback) {
	for(var i = 0, item, len=dom.length; item = dom[i++]; i < len) {
			(function (j) {
				item.addEventListener(eventType, function(event) {
					callback.call(this, event, dom, j)
				}, false)
			})(i)
	}
}



var menu_level_1_callback = function(event, dom, j) {
	event.target.parentNode.classList.add('qc-active')
	menu_level_2[j - 1] && menu_level_2[j - 1].parentNode.classList.add('qc-actived')
	for (var p = 1; p <= dom.length; p++) {
		if (p != j) {
			dom[p - 1].classList.remove('qc-active')
			menu_level_2[p - 1] && menu_level_2[p - 1].parentNode.classList.remove('qc-actived')
		}
	} 
}
batchBind(menu_level_1, 'mouseover', menu_level_1_callback)



menu_lv2s_callback = function(event, dom, j) {
	var nextElementSibling = event.target.nextElementSibling
	if (nextElementSibling && nextElementSibling.classList.contains('menu-sub')) {
		nextElementSibling.classList.toggle('hide')
	}
	for (var p = 0; p < dom.length; p++) {
		var domNextElementSibling = dom[p].nextElementSibling
		if (p != j - 1) {
			if (domNextElementSibling && domNextElementSibling.classList.contains('menu-sub')) {
				domNextElementSibling.classList.add('hide')
			}
		}
	}
}

batchBind(menu_lv2s, 'click', menu_lv2s_callback)



var tabs_callback = function(event, dom, j) {
	event.target.classList.add('current')
	for (var p = 0; p < dom.length; p++) {
		if (p != j - 1) {
			dom[p].classList.remove('current')
		}
	}
}
batchBind(tabs, 'click', tabs_callback)


filter_btns_callback = function(event, dom, j) {
	event.stopPropagation()
	var nextElementSibling = dom[j - 1].nextElementSibling
	if (nextElementSibling && nextElementSibling.classList.contains('filtrateu')) {
		nextElementSibling.classList.toggle('hide')
	}
	for (var p = 0; p < dom.length; p++) {
		var domNextElementSibling = dom[p].nextElementSibling
		if (p != j - 1) {
			if (domNextElementSibling && domNextElementSibling.classList.contains('filtrateu')) {
				domNextElementSibling.classList.add('hide')
			}
		}
	}
}

batchBind(filter_btns, 'click', filter_btns_callback)


filtrateu_menus_callback = function(event, dom, j) {
	event.stopPropagation()
	return false
}

batchBind(filtrateu_menus, 'click', filtrateu_menus_callback)

document.addEventListener('click', function() {
	var filtrateus = document.querySelectorAll('.filtrateu')
	for (var i = 0, item, len=filtrateus.length; item = filtrateus[i++]; i < len) {
		item.classList.add('hide')
	}
}, false)

var equalHeight = function() {
	document.querySelector('.action-logs').style.height = document.body.offsetHeight - 50 + 'px';
}



qc_log_icon.addEventListener('mouseover', function(event) {
	this.classList.add('qc-nav-hover')
}, false)

qc_log_icon.addEventListener('mouseout', function(event) {
	this.classList.remove('qc-nav-hover')
}, false)

window.onload = function() {
	equalHeight()
	window.onresize = function() {
		equalHeight()
	}
}
