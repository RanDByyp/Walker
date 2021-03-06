var subMenuActive; 

onload = function initialize()
{
    subMenuActive = document.querySelector('.sub-menu.active');
    //Initialize EventListeners
        //Add trigger functions for when Window is resized.
        window.addEventListener("resize", function() 
        {
            replaceSubMenuNav();
            setMinHeightSubMenuHolder();

        });

        //Add trigger functions for when Menu Button is pressed.
        let menuToggle = document.getElementById('menu-toggle');
        menuToggle.addEventListener("click",function() 
        {
            toggleMenu(this);
        });

        //Add trigger functions for when Sub-Menu-Navigator Toggle is pressed.
        let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');
        subMenuNavToggle.addEventListener("click",function()
        {
            toggleSubMenuNav();
            displayChangeSubMenuNavToggle();
        });

        //Add trigger functions for when Sub-Menu Button is pressed.
        let subMenu = document.getElementsByClassName('sub-menu-toggle');
        for(let i = 0; i < subMenu.length; i++)
        {
            subMenu[i].addEventListener("click", function(){
                toggleSubMenu(this);
                toggleSubMenuNav();
                displayChangeSubMenuNavToggle();
            });
        }

        //INPUT ELEMENTS
        //Add trigger functions for when Input-Range has input.
        let slider = document.getElementsByClassName('slider');
        for(let i = 0; i < slider.length; i++)
        {
            slider[i].addEventListener("input",function()
            {
                displayChangeInputRange(this);
            });
            displayChangeInputRange(slider[i]);
        }

    //Initialize Menu
    replaceSubMenuNav();
    setMinHeightSubMenuHolder();
    displayChangeSubMenuNavToggle();
}

//Show/Hide Menu
function toggleMenu(trigger)
{
    let menu = document.getElementById('menu');
    let subMenuHolder = document.getElementById('sub-menu-holder');
    let subMenuNav = document.getElementById('sub-menu-nav');
    let nav = document.getElementById('nav');

    menu.classList.toggle('active');
    nav.classList.toggle('active');
    subMenuHolder.classList.toggle('active');

    //If Menu is hidden, make Sub-Menu-Nav inactive (hidden).
    doThingWithClassIfNotContains(menu,'active',function() { subMenuNav.classList.remove('active'); });

    //If Menu is hidden or shown, display correct Icon on Menu-Toggle Button.
    doThingWithClassIfContains(menu,'active',function() { setPropertyOfElement(trigger,'innerText','△'); });
    doThingWithClassIfNotContains(menu,'active',function() { setPropertyOfElement(trigger,'innerText','▽'); });
}

//Show/Hide Sub-Menu Navigator
function toggleSubMenuNav()
{
    let subMenuNav = document.getElementById('sub-menu-nav');
    subMenuNav.classList.toggle('active');
}

//Switch Active Sub-Menu shown in Sub-Menu-Holder
function toggleSubMenu(trigger)
{
    //If pressed and Sub-Menu-Toggle does not equal active Sub-Menu,
    //change active Sub-Menu-Toggle and Sub-Menu.
    if (trigger.name != subMenuActive.name)
    {
        let subMenuToggleActive = document.querySelector(".sub-menu-toggle.active");

        subMenuActive.classList.toggle('active');
        subMenuToggleActive.classList.toggle('active');

        let selectorString = '.sub-menu[name='+trigger.name+']';
        let subMenuTarget = document.querySelector(selectorString);

        subMenuTarget.classList.toggle('active');
        trigger.classList.toggle('active');
        subMenuActive = subMenuTarget;
    }
}

//Get Highest Sub-Menu, and Set Sub-Menu-Holder 'min-height' to that value (If not fit browser, make it fit)
function setMinHeightSubMenuHolder()
{
    let menu = document.getElementById('menu');
    let menuToggle = document.getElementById('menu-toggle');
    let menuBar = document.getElementById('menu-bar');
    let subMenu = document.getElementsByClassName('sub-menu');
    let subMenuHolder = document.getElementById('sub-menu-holder');
    let isActive = menu.classList.contains('active');

    //If hidden, show Menu and Sub-Menu 'container', so properties can be substracted.
    if (!isActive)
    {
        toggleMenu(menuToggle);
    }

    //Loop through all Sub-Menus,
    //get the heighest height value, store it.
    let minHeight = 0;
    for(let i = 0; i < subMenu.length; i++)
    {
        if (subMenu[i].clientHeight > minHeight)
        {
            minHeight = subMenu[i].clientHeight;
        }
    }

    //Check if min-height fits within browser.
    //If not, set min-height to the amount of vertical space that is left.
    let actualSpace = window.innerHeight - menuBar.offsetHeight;
    if (minHeight > actualSpace)
    {
        minHeight = actualSpace;
    }

    //Set min-height of sub-menu wrapper to value of highest sub-menu.
    setStylePropertyOfElement(subMenuHolder,'minHeight',minHeight+"px");

    //If originally hidden, hide Menu and Sub-Menu 'container' again.
    if (!isActive)
    {
        toggleMenu(menuToggle);
    }
}

//Switch Sub-Menu-Toggle Buttons between Menu-Bar and Collapsible Sub-Menu-Navigator
function replaceSubMenuNav()
{
    let subMenuNav = document.getElementById('sub-menu-nav');
    let nav = document.getElementById('nav');
    let navPrison = document.getElementById('nav-prison');
    let subMenuToggle = document.querySelectorAll('.sub-menu-toggle');
    let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');

    //When window is equal or higher than 768 pixels,
    //display Sub-Menu Buttons in Menu Bar.
    if ((window.innerWidth >= 768) && (!checkIfNavIsTooLarge()))
    {
        navPrison.appendChild(subMenuNavToggle);

        for(let i = 0; i < subMenuToggle.length; i++)
        {
            nav.appendChild(subMenuToggle[i]);
        }
    }
    //When window is lower than 768, or Menu doesn't fit in Nav,
    //display Sub-Menu Buttons in Dropdown Menu.
    if ((window.innerWidth < 768) || (checkIfNavIsTooLarge()))
    {
        nav.appendChild(subMenuNavToggle);

        for(let i = 0; i < subMenuToggle.length; i++)
        {
            subMenuNav.appendChild(subMenuToggle[i]);
        }
    }
}

//Check if Sub-Menu-Toggle Buttons fit within the Width of the Menu
function checkIfNavIsTooLarge()
{
    let nav = document.getElementById('nav');
    let menuBar = document.getElementById('menu-bar');
    let menuToggle = document.getElementById('menu-toggle');

    let navIsTooLarge = false;

    if (nav.clientWidth > menuBar.clientWidth - menuToggle.clientWidth)
    {
        navIsTooLarge = true;
    }
    return navIsTooLarge;
}

//Display Active Sub-Menu and Collapsed State of Sub-Menu-Navigator-Toggle Button
function displayChangeSubMenuNavToggle()
{
    let subMenuNav = document.getElementById('sub-menu-nav');
    let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');
    let subMenuToggleActive = document.querySelector(".sub-menu-toggle.active");
    
    //Display Active Sub-Menu and hide/shown Icon on Sub-Menu-Navigator Button.
    doThingWithClassIfContains(subMenuNav,'active',function() { setPropertyOfElement(subMenuNavToggle,'innerText',subMenuToggleActive.innerText +' △'); });
    doThingWithClassIfNotContains(subMenuNav,'active',function() { setPropertyOfElement(subMenuNavToggle,'innerText',subMenuToggleActive.innerText +' ▽'); });
}

//Display Value of Input Element Range/Slider
function displayChangeInputRange(trigger)
{
    let selectorString = 'label[for="'+trigger.name+'"] span';
    let inputLabel = document.querySelector(selectorString);
    //Display Input-Range Value on it's Label.
    inputLabel.innerText = trigger.value;
}