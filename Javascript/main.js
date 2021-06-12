/*************************************** | Global Variables | ****************************************/

var PageSwiper;
var Navbar;
var ActiveMenuSlider;
var ActiveMenuSliderBaseDelay;
var SiteLocation = window.location.href.split("#")[0];

var RightKeyPressed = false;
var LeftKeyPressed = false;


/*************************************** | Initialize the Site | ****************************************/

window.addEventListener("load", function() 
{
	/* Initializes the Page Swiper */

	PageSwiper = new Swiper("#PagesContainer", {});
	ActiveMenuSlider = document.getElementById("ActiveMenu");

	PageSwiper.on("slideChange", function () 
	{
		HandlePageChange();
	});

	if(window.location.href != SiteLocation)
	{
		PageSwiper.slideTo(window.location.href.split("#")[1], 0, true)
		setTimeout(ResetMenuDelay, 1);
	}

	/* Initializes the navbar */

	Navbar = document.getElementsByTagName("navbar")[0];

	if(window.location.href == SiteLocation || window.location.href.split("#")[1] == "0")
	{
		Navbar.style = "transition: bottom ease 0.85s;"
		Navbar.style.bottom = "6vh";
	}
	else
	{
		Navbar.style.bottom = "6vh";
	}

	ActiveMenuSlider.style.marginLeft = String(5 + 25 * PageSwiper.activeIndex) + "%";

	/* Initializes the Shortcuts */

	document.onkeydown = function(Event)
	{
		Event = Event || window.event;

		if((Event.key == "ArrowRight" || Event.key == "Right") && (RightKeyPressed == false)) 
		{
			SlideToPage(PageSwiper.activeIndex + 1);
			RightKeyPressed = true;
		}
		else if((Event.key == "ArrowLeft" || Event.key == "Left") && (LeftKeyPressed == false)) 
		{
			SlideToPage(PageSwiper.activeIndex - 1);
			LeftKeyPressed = true;
		}
	}

	this.document.onkeyup = function(Event)
	{
		if(Event.key == "ArrowRight" || Event.key == "Right") 
		{
			RightKeyPressed = false;
		}
		else if(Event.key == "ArrowLeft" || Event.key == "Left") 
		{
			LeftKeyPressed = false;
		}
	}


});



/*************************************** | Event Handlers | ****************************************/

/* Page Swiper */

function HandlePageChange()
{
	window.location.href = SiteLocation + "#" + PageSwiper.activeIndex;
	ActiveMenuSlider.style.marginLeft = String(5 + 25 * PageSwiper.activeIndex) + "%";
}





/*************************************** | User Interactions | ****************************************/

/* Page Swiper */

function SlideToPage(PageIndex)
{
	var SlideDelta = Math.abs(PageSwiper.activeIndex - PageIndex);

	ActiveMenuSlider.style.transitionDuration = String((300 * SlideDelta) / 1000) + "s";
	PageSwiper.slideTo(PageIndex, 300 * SlideDelta, true);
	setTimeout(ResetMenuDelay, 300 * SlideDelta);

}


/*************************************** | Helper Functions | ****************************************/

function ResetMenuDelay()
{
	ActiveMenuSlider.style.transitionDuration = "0.3s";
}

