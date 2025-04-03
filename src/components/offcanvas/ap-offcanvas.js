import { Text } from '@/utils';

export default {
    props:
    {
        // determines if clicks on the background
        // the modal will close
        backDropClose:
        {
            type: Boolean,
            default: true,
        },

        // determines if the close button on the top right
        // will show or not
        closeButton:
        {
            type: Boolean,
            default: true,
        },

        // determines if the escape button on the keyboard
        // can close the offcanvas when pressed
        escapeClose:
        {
            type: Boolean,
            default: true,
        },

        // determines if the offcanvas
        // will show on right
        isFlip:
        {
            type: Boolean,
            default: true,
        },

        // determines if the offcanvas
        // will show as full page
        isFull:
        {
            type: Boolean,
            default: false,
        },

        // determines if the offcanvas
        // show or hide
        isOpen:
        {
            type: Boolean,
            default: false,
            required: true,
        },

        // determines if the offcanvas
        // have backdrop
        isOverlay:
        {
            type: Boolean,
            default: true,
        },

        // determines the type of transition
        // of the offcanvas
        transition:
        {
            type: String,
            default: 'slide', // 'none', 'slide', 'push'
        },
    },

    data()
    {
        return {
            openClass: '',
            displayClass: '',
        };
    },

    methods:
    {
        backDropEvent()
        {
            if (this.$refs.offcanvas === event.target)
            {
                this.close();
            }
        },

        escapeEvent()
        {
            if (event.keyCode === 27)
            {
                this.close();
            }
        },

        close()
        {
            this.$emit('update:isOpen', false);
        },

        toggleScrollbar(bool)
        {
            const el = document.body;

            if (bool)
            {
                el.classList.add('ap-offcanvas-page');
            }

            else
            {
                setTimeout(() =>
                {
                    el.classList.remove('ap-offcanvas-page');
                }, 300);
            }
        },

        toggleOffcanvas(bool)
        {
            if (bool)
            {
                this.displayClass = 'ap-offcanvas-block';

                setTimeout(() =>
                {
                    this.openClass = 'ap-open';
                }, 100);
            }

            else
            {
                this.openClass = '';

                setTimeout(() =>
                {
                    this.displayClass = '';
                }, 300);
            }
        },

        handleContainer(bool)
        {
            const el = document.body;

            if (bool && this.transition === 'push')
            {
                if (this.isFlip)
                {
                    el.classList.add('ap-offcanvas-flip');
                }

                el.classList.add('ap-offcanvas-container');

                setTimeout(() =>
                {
                    el.classList.add('ap-offcanvas-container-animation');
                }, 100);
            }

            else if (!bool && this.transition === 'push')
            {
                el.classList.remove('ap-offcanvas-container-animation');

                setTimeout(() =>
                {
                    if (this.isFlip)
                    {
                        el.classList.remove('ap-offcanvas-flip');
                    }

                    el.classList.remove('ap-offcanvas-container');
                }, 300);
            }
        },
    },

    computed:
    {
        handleTransitionClass()
        {
            switch (this.transition)
            {
                case 'none':
                    return 'ap-offcanvas-none';

                case 'slide':
                    return 'ap-offcanvas-slide ap-offcanvas-bar-animation';

                case 'push':
                    return 'ap-offcanvas-push ap-offcanvas-bar-animation';

                default:
                    break;
            }

            return null;
        },
    },

    watch:
    {
        isOpen()
        {
            if (this.isOpen)
            {
                if (this.escapeClose)
                {
                    window.addEventListener('keyup', this.escapeEvent);
                }

                if (this.backDropClose)
                {
                    this.$refs.offcanvas.addEventListener('click', this.backDropEvent);
                }

                this.toggleScrollbar(true);
                this.toggleOffcanvas(true);
                this.handleContainer(true);
            }

            else
            {
                if (this.escapeClose)
                {
                    window.removeEventListener('keyup', this.escapeEvent);
                }

                if (this.backDropClose)
                {
                    this.$refs.offcanvas.removeEventListener('click', this.backDropEvent);
                }

                this.toggleScrollbar(false);
                this.toggleOffcanvas(false);
                this.handleContainer(false);
            }
        },
    },

    render(h)
    {
        return h(
            'div',
            {
                class: Text.joinClass(
                    'ap-offcanvas',
                    this.isOverlay && 'ap-offcanvas-overlay',
                    this.isFlip && 'ap-offcanvas-flip',
                    this.openClass,
                    this.displayClass
                ),

                ref: 'offcanvas',
            },
            [
                h(
                    'div',
                    {
                        class: Text.joinClass(
                            'ap-offcanvas-bar',
                            this.handleTransitionClass,
                            this.isFull && 'ap-offcanvas-bar-full'
                        ),
                    },
                    [
                        this.$slots.default,

                        this.closeButton && h(
                            'a',
                            {
                                class: Text.joinClass(
                                    'ap-offcanvas-close',
                                    'ap-close',
                                    'ap-link-reset'
                                ),

                                on:
                                {
                                    click: () =>
                                    {
                                        this.close();
                                    },
                                },
                            },

                            [
                                h(
                                    'i',
                                    {
                                        class: 'lni lni-times',
                                    }
                                ),
                            ]
                        ),
                    ]
                ),
            ]
        );
    },
};
