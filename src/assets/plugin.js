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
            let space = 'All';
            // let href = window.location.href.split('/');
            // let active = href[href.length-1].replace(/map/, '').toUpperCase();
            // console.log(active)
            el.innerHTML = `
                <div class="dl-button__header">
                   <span class='btn-img'>${this.text}</span>
                </div>
            `;
            // <a class='nav-link ${this.text == active ? this.text == '' ? "active-link": "active-link" : ""}' href="#/${this.text != '' ? (this.text+'map') : ''}">${this.text != '' ? this.text : space}</a>
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