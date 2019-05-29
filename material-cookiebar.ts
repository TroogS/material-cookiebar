interface IMaterialCookieBarOptions {
    header: string;
    message: string;
    buttonText: string;
}

class MaterialCookieBar {

    public static cookieKey: string = "MaterialCookieConsent";

    // #region build

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /// <summary>   Cookiepopup erstellen </summary>
    /// <remarks>   A Beging, 29.05.2019. </remarks>
    /// <param name="options">  Options for controlling the operation. </param>
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    public static build(options: IMaterialCookieBarOptions): void {
        if (this.checkConsent()) {
            return;
        }

        let elementId = Math.random().toString(36).slice(2);

        let mainElement = <HTMLDivElement>(document.createElement('div'));
        mainElement.classList.add("material-cookiebar");
        mainElement.id = elementId;

        let headerElement = <HTMLDivElement>(document.createElement('div'));
        headerElement.innerHTML = options.header;
        headerElement.classList.add("material-cookiebar-header");

        let bodyElement = <HTMLDivElement>(document.createElement('div'));
        bodyElement.innerHTML = options.message;
        bodyElement.classList.add("material-cookiebar-body");

        let buttonElement = this.createButtonDiv(options.buttonText, elementId);
        headerElement.classList.add("material-cookiebar-header");

        mainElement.append(headerElement);
        mainElement.append(bodyElement);
        mainElement.append(buttonElement);

        window.document.body.append(mainElement);
    }

    // #endregion

    // #region giveConsent

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /// <summary>   Zustimmung zu Cookies geben </summary>
    /// <remarks>   A Beging, 29.05.2019. </remarks>
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    public static giveConsent(): void {
        const date = new Date();

        // Set it expire in 5 years
        date.setTime(date.getTime() + (5 * 365 * 24 * 60 * 60 * 1000));

        // Set it
        document.cookie = this.cookieKey + "=True; expires=" + date.toUTCString() + "; path=/";
    }

    // #endregion

    // #region private checkConsent

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /// <summary>   Prüfen, ob die Zustimmung bereits erteilt wurde </summary>
    /// <remarks>   A Beging, 29.05.2019. </remarks>
    /// <returns>   True if it succeeds, false if it fails. </returns>
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    private static checkConsent(): boolean {

        let cookieArray = document.cookie.split(';').map(c => c.trim());
        let result = cookieArray.filter(c => { return c.substring(0, this.cookieKey.length) === this.cookieKey }).map(c => c.substring(this.cookieKey.length + 1));

        return (result.length > 0);
    }

    // #endregion

    // #region private createButtonDiv

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /// <summary>   Erstellen des OK Buttons </summary>
    /// <remarks>   A Beging, 29.05.2019. </remarks>
    /// <param name="buttonText">   The button text. </param>
    /// <returns>   The new button div. </returns>
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    private static createButtonDiv(buttonText: string, mainElementId: string) {
        let buttonElement = <HTMLDivElement>(document.createElement('div'));
        buttonElement.classList.add("material-cookiebar-button");

        let buttonLink = <HTMLAnchorElement>(document.createElement('a'));
        buttonLink.dataset.id = mainElementId;
        buttonLink.href = "#";
        buttonLink.onclick = ev => {
            this.giveConsent();

            let srcElement = <HTMLElement>ev.srcElement;
            let mainElement = window.document.getElementById(srcElement.dataset.id);
            mainElement.remove();
        };
        buttonLink.innerHTML = buttonText;

        buttonElement.append(buttonLink);
        return buttonElement;
    }

    // #endregion


}