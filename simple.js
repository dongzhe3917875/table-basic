var menu_level_1 = document.querySelectorAll('.menu-level-1 .qc-hover')
var menu_level_2 = document.querySelectorAll('.menu-level-2')
var qc_log_icon = document.querySelector('.qc-log-icon')
for(var i = 0, item, len=menu_level_1.length; item = menu_level_1[i++]; i < len) {
		(function (j) {
			item.addEventListener('mouseover', function(event) {
				event.target.parentNode.classList.add('qc-active')
				menu_level_2[j - 1] && menu_level_2[j - 1].parentNode.classList.add('qc-actived')
				for (var p = 1; p <= menu_level_1.length; p++) {
					if (p != j) {
						menu_level_1[p - 1].classList.remove('qc-active')
						menu_level_2[p - 1] && menu_level_2[p - 1].parentNode.classList.remove('qc-actived')
					}
				} 
			}, false)
		})(i)
}
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
