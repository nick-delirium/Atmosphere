(function(){
    class Button extends H.ui.Control {

        constructor(text, clss) {
            super();
            this.text = text;
            this.id = clss;
            // this.icon = icon_url;
            this.setAlignment('top-left');
        }
        onButtonClick(){
            alert("hello world")
        }
        renderInternal(el, doc) {
            this.addClass('dl-button '+this.id);
            el.innerHTML = `
                <div class="dl-button__header">
                    <span class='btn-img'>${this.text}</span> 
                </div>
            `;
            //el.addEventListener('click',this.onButtonClick)
            super.renderInternal(el, doc);
        }
        addChild(control) {
            control.setParentEventTarget(this);
            return super.addChild(control);
        }
    }

    Object.assign(window, {Button});
}())