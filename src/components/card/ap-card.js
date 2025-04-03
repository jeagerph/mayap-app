import { props, computed, methods } from './mixin';

export default {

    mixins: [props, computed, methods],

    render(h)
    {
        return h(
            'div',

            {
                // staticClass: data.staticClass,

                class: this.classes,
            },

            this.$slots.default
        );
    },
};
