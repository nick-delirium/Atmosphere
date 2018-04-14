(function(){
    class Button extends H.ui.Control {

        constructor(icon_url) {
            super();
            this.icon = icon_url;
            this.setAlignment('top-left');
        }
        helloWorld(){
            alert("hello world")
        }
        renderInternal(el, doc) {
            this.addClass('dl-button');
            el.innerHTML = `
                <div class="dl-button__header">
                    <img class='btn-img' src='${this.icon}'>
                </div>
            `;
            el.addEventListener('click',this.helloWorld)
            super.renderInternal(el, doc);
        }
        addChild(control) {
            control.setParentEventTarget(this);
            return super.addChild(control);
        }
    }

    Object.assign(window, {Button});
}())