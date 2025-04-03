import { props, computed } from '@/components/input/mixin';

export default {

    inheritAttrs: false,

    // We reuse the props and
    // computed of the `ap-input`😀🤘🏻
    mixins: [props, computed],

    data()
    {
        return {
            event: null,
            timeout: 1000,
            isLoading: false,
        };
    },

    props:
    {
        doneTyping:
        {
            type: Function,
        },

        // determines if the modal
        // show or hide
        isOpen:
        {
            type: Boolean,
            default: false,
        },

        // Collections of arrays
        // to be rendered as option
        items:
        {
            type: Array,
            default: null, // format [{id: 1, label: 'title'}]
        },

        onSelect:
        {
            type: Function,
        },

        loading:
        {
            type: Boolean,
            default: false,
        }
    },

    mounted()
    {
        window.addEventListener('keyup', this.escapeEvent);
        window.addEventListener('click', this.clickOutside);
    },

    destroyed()
    {
        window.removeEventListener('keyup', this.escapeEvent);
        window.removeEventListener('click', this.clickOutside);
    },

    methods:
    {
        isTyping()
        {
            if (process.env.APP_DEBUG)
            {
                console.log('user is typing..');
            }

            // Clear the existing event
            clearTimeout(this.event);

            // set timeout to prevent
            // immediate emitting the event
            this.event = setTimeout(() =>
            {
                // emit the function that pass
                // from props
                this.doneTyping();
            }, this.timeout);
        },

        clickOutside(event)
        {
            if (!this.$el.contains(event.target))
            {
                this.close();
            }
        },

        close()
        {
            this.$emit('update:isOpen', false);
        },

        escapeEvent(event)
        {
            if (event.keyCode === 27)
            {
                this.close();
                this.$refs.autocomplete.blur();
            }
        },
    },

    render(h)
    {
        const vm = this;

        return h(
            'div',

            {
                staticClass: 'ap-position-relative',

                class: this.wrapperClasses,

                ref: 'autocompleteWrapper',
            },

            [

                Boolean(this.label) && h(
                    'label',

                    {
                        class: this.labelClasses,
                    },

                    this.label
                ),

                h(
                    'input',

                    {
                        class: this.classes,

                        attrs: this.$attrs,

                        domProps:
                        {
                            value: vm.value,
                        },

                        on:
                        {
                            input(event)
                            {
                                vm.$emit('input', event.target.value);
                            },

                            keypress()
                            {
                                vm.isTyping();
                            },
                        },


                        ref: 'autocomplete',
                    }
                ),

                Boolean(this.error) && h(
                    'small',

                    {
                        class: 'ap-text-danger',
                    },

                    this.error
                ),

                h(
                    'ap-autocomplete-dropdown',

                    {
                        props:
                        {
                            isOpen: this.isOpen,

                            items: this.items,

                            onSelect: this.onSelect,

                            loading: this.loading,
                        },

                        on:
                        {
                            'update:isOpen': ($event) =>
                            {
                                this.$emit('update:isOpen', $event);
                            },
                        },
                    }
                ),
            ]
        );
    },
};
