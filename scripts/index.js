//initializing device size based on viewport width
var initialDeviceSize = window.outerWidth < 576 ? 'small' : 'large';
//default container to display when no chat has been selected
var default_container = document.querySelector('.default-container');
//display the default container for larger screens only
if(initialDeviceSize == 'large'){
	default_container.classList.remove('d-none');
}

//Function to toggle between chats and conversation pages
//default @param - initialDeviceSize
function initializeToggle(deviceSize = initialDeviceSize){
	if(deviceSize !== initialDeviceSize){
		window.location.reload();
	}
	let chats = document.querySelectorAll('.chats .chat');
	let back = document.querySelectorAll('.chat-back');
	let conversation_divs = document.querySelectorAll('.chat-content');
	chats.forEach((item, index) => {
		item.addEventListener('click', function(e){
			let chat_id = this.getAttribute('data-chat');
			let target_div = document.getElementById('chat-' + chat_id);
			conversation_divs.forEach(function(div){
				if(!div.classList.contains('d-none')){
					div.classList.add('d-none');
				}
			})
			if(target_div){
				toggleClass(target_div, deviceSize);
			}
		});
	});
	back.forEach(function(item){
		item.addEventListener('click',function(e){
			let target_div = this.parentElement.parentElement.parentElement;
			toggleClass(target_div, deviceSize);
		});
	})
};

function toggleClass(target_div, deviceSize){
	if(deviceSize == 'small'){
		let nav_container = document.querySelector('.main-content');
		nav_container.classList.toggle('d-none');
	}
	default_container.classList.add('d-none');
	target_div.classList.toggle('d-none');
}

//Function that initiates main toggle function for every window resize
window.onresize = function(e){
	var deviceSize = window.outerWidth < 576 ? 'small' : 'large';
	initializeToggle(deviceSize);
};

/*IIFE(Immediately invoked function expression) to hide the conversation
 content when nav links clicked and will display default container in larger screens
*/
!function(){
	let targets = document.querySelectorAll('.conversation-container .chat-content');
	let nav = document.querySelectorAll('nav a');
	nav.forEach(function(element, index) {
		// statements
		element.addEventListener('click', function(e){
			e.preventDefault();
			targets.forEach(function(item){
				!item.classList.contains('d-none') ? item.classList.add('d-none') : "";
			});
			default_container.classList.remove('d-none');
		});
	});
}();

//Initialize the toggle function with initialDeviceSize for the first time when page gets loaded
initializeToggle(initialDeviceSize);