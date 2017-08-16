var menu_level_1 = document.querySelectorAll('.menu-level-1 .qc-hover')
var menu_level_2 = document.querySelectorAll('.menu-level-2')
var qc_log_icon = document.querySelector('.qc-log-icon')
var menu_lv2s = document.querySelectorAll('.menu-lv2')
var tabs = document.querySelectorAll('.tab-wrapper span[role=tab]')
var filter_btns = document.querySelectorAll('.filter-btn')
var filtrateu_menus = document.querySelectorAll('.filtrateu-menu')
var resize_line_icons = document.querySelectorAll('.resize-line-icon')
var resize_line_icons_obj = {}
var cols = document.querySelector('.table-fixed-head').querySelectorAll('col')
var table_head = document.querySelector('.table-fixed-head').querySelector('.table-box')
var table_basic_width = table_head.offsetWidth
console.log(table_basic_width)
var ths_head = document.querySelector('.table-fixed-head').querySelectorAll('th')


// var ths_body = document.querySelector('.table-fixed-body').querySelectorAll('th')

var cols_body = document.querySelector('.table-fixed-body').querySelectorAll('col')
var table_body = document.querySelector('.table-fixed-body').querySelector('.table-box')
var table_body_wrapper = document.querySelector('.table-fixed-body')

var batchBind = function (dom, eventType, callback) {
	for(var i = 0, item, len=dom.length; item = dom[i++]; i < len) {
			(function (j) {
				item.addEventListener(eventType, function(event) {
					callback.call(this, event, dom, j)
				}, false)
			})(i)
	}
}

var batchBindOff = function (dom, eventType, callback) {
	for(var i = 0, item, len=dom.length; item = dom[i++]; i < len) {
			(function (j) {
				item['on'+eventType] = null
				// item.removeEventListener(eventType, function(event) {
				// 	callback.call(this, event, dom, j)
				// }, false)
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

var resize_line_icon_callback_mouseup = function(j) {
	document.removeEventListener('mousemove', resize_line_icons_obj['mousemove' + j], false)
	document.body.style.cursor = 'pointer'
}


var resize_line_icon_callback = function(event, dom, j) {

	let left = event.target.getBoundingClientRect().left
	var origin = ths_head[j - 1].offsetWidth
	let table_width = table_head.offsetWidth

	console.log('ininin')

	var other_width = 0
	for (let i = 0; i < ths_head.length - 1; i ++) {
		other_width = other_width + ths_head[i].offsetWidth
	}


	var end_width = 0;
	end_width = parseInt(table_head.offsetWidth) - other_width
	console.log(end_width)

	resize_line_icons_obj['mousemove' + j] = function(event) {
		document.body.style.cursor = 'e-resize'
		// 在这里移动
		// console.log('clientX: ', event.clientX, ', left:', left, '差值：', event.clientX - left)
		widthDis = event.clientX - left
		cols[j - 1].style.width = origin + widthDis + 'px'
		if (parseInt(cols[j - 1].style.width) <= 100) {
			cols[j - 1].style.width = '100px'
		}

		cols_body[j - 1].style.width = origin + widthDis + 'px'
		if (parseInt(cols[j - 1].style.width) <= 100) {
			cols_body[j - 1].style.width = '100px'
		}

		if (other_width + widthDis + 100  < table_basic_width) {
			
			table_head.style.width = table_basic_width  + 'px'
			table_body.style.width = table_basic_width +  'px'
			if (widthDis >= 0) {

				console.log('normal_big')
				var diss = end_width - widthDis
				if (diss > 100) {
					cols[ths_head.length - 1].style.width = end_width - widthDis + 'px'
					cols_body[ths_head.length - 1].style.width = end_width - widthDis + 'px'
				} else {
					cols[ths_head.length - 1].style.width = 100 + 'px'
					cols_body[ths_head.length - 1].style.width = 100 + 'px'
				}
			} else {
				console.log('normal_small')

				cols[ths_head.length - 1].style.width = end_width - widthDis + 'px'
				cols_body[ths_head.length - 1].style.width = end_width - widthDis + 'px'
			}
		} else {

			cols[ths_head.length - 1].style.width = 100 + 'px'
			cols_body[ths_head.length - 1].style.width = 100 + 'px'
			if (widthDis >= 0) {
				table_head.style.width = table_width + widthDis  + 'px'
				table_body.style.width = table_width + widthDis  + 'px'
			} else {
				table_head.style.width = table_width + widthDis  + 'px'
				table_body.style.width = table_width + widthDis  + 'px'
			}
		}

		if (widthDis >= 0) {
			// var other_width = 0
			// for (let i = 0; i < ths_head.length - 1; i ++) {
			// 	other_width = other_width + ths_head[i].offsetWidth
			// }


			// var end_width = 0;
			// end_width = parseInt(table_head.style.width) - other_width
			if (table_width + widthDis >= table_basic_width) {
				// console.log('超了')
				// cols[ths_head.length - 1].style.width = '100px'
				// cols_body[ths_head.length - 1].style.width = '100px'

				// table_head.style.width = table_width + widthDis - 100 + 'px'
				// table_body.style.width = table_width + widthDis - 100 + 'px'
			}
		} else { 
			// cols[ths_head.length - 1].style.width = 'auto'
			// cols_body[ths_head.length - 1].style.width = 'auto'
		}
		
		
		// console.log(widthDis)
		

		
	}
	document.addEventListener('mousemove', resize_line_icons_obj['mousemove' + j], false)

	document.addEventListener('mouseup', function() {
		resize_line_icon_callback_mouseup.call(this, j)
	}, false)
}

batchBind(resize_line_icons, 'mousedown', resize_line_icon_callback)

table_body_wrapper.onscroll = function() {
	table_head.style.left = - this.scrollLeft + 'px';
}
// batchBind(resize_line_icons, 'mouseup', resize_line_icon_callback_mouseup)

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
