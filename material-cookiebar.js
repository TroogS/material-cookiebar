var MaterialCookieBar = (function () {
    function MaterialCookieBar() {
    }
    MaterialCookieBar.build = function (options) {
        if (this.checkConsent()) {
            return;
        }
        var elementId = Math.random().toString(36).slice(2);
        var mainElement = (document.createElement('div'));
        mainElement.classList.add("material-cookiebar");
        mainElement.id = elementId;
        var headerElement = (document.createElement('div'));
        headerElement.innerHTML = options.header;
        headerElement.classList.add("material-cookiebar-header");
        var bodyElement = (document.createElement('div'));
        bodyElement.innerHTML = options.message;
        bodyElement.classList.add("material-cookiebar-body");
        var buttonElement = this.createButtonDiv(options.buttonText, elementId);
        headerElement.classList.add("material-cookiebar-header");
        mainElement.append(headerElement);
        mainElement.append(bodyElement);
        mainElement.append(buttonElement);
        window.document.body.append(mainElement);
    };
    MaterialCookieBar.giveConsent = function () {
        var date = new Date();
        date.setTime(date.getTime() + (5 * 365 * 24 * 60 * 60 * 1000));
        document.cookie = this.cookieKey + "=True; expires=" + date.toUTCString() + "; path=/";
    };
    MaterialCookieBar.checkConsent = function () {
        var _this = this;
        var cookieArray = document.cookie.split(';').map(function (c) { return c.trim(); });
        var result = cookieArray.filter(function (c) { return c.substring(0, _this.cookieKey.length) === _this.cookieKey; }).map(function (c) { return c.substring(_this.cookieKey.length + 1); });
        return (result.length > 0);
    };
    MaterialCookieBar.createButtonDiv = function (buttonText, mainElementId) {
        var _this = this;
        var buttonElement = (document.createElement('div'));
        buttonElement.classList.add("material-cookiebar-button");
        var buttonLink = (document.createElement('a'));
        buttonLink.dataset.id = mainElementId;
        buttonLink.href = "#";
        buttonLink.onclick = function (ev) {
            _this.giveConsent();
            var srcElement = ev.srcElement;
            var mainElement = window.document.getElementById(srcElement.dataset.id);
            mainElement.remove();
        };
        buttonLink.innerHTML = buttonText;
        buttonElement.append(buttonLink);
        return buttonElement;
    };
    MaterialCookieBar.cookieKey = "MaterialCookieConsent";
    return MaterialCookieBar;
}());
//# sourceMappingURL=eas-cookiebar.js.map