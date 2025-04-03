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
        // can close the modal when pressed
        escapeClose:
        {
            type: Boolean,
            default: true,
        },

        // determines if the modal
        // show or hide
        isOpen:
        {
            type: Boolean,
            default: false,
        },

        // determines if the modal should
        // show on the vertical and horizontal center
        isCenter:
        {
            type: Boolean,
            default: false,
        },

        // the modal size, 'container' or one of
        // the ap-width-* classes without frefix
        size:
        {
            type: String,
            default: null, // 'container', 'full', 'small'
        },
    },

    mounted()
    {
        if (this.isOpen)
        {
            if (this.escapeClose)
            {
                window.addEventListener('keyup', this.escapeEvent);
            }

            if (this.backDropClose)
            {
                // this.$refs.modal.addEventListener('click', this.backDropEvent);
            }

            this.toggleScrollbar(true);
            this.toggleModal(true);
        }
    },

    data()
    {
        return {
            openClass: '',
            displayClass: '',
            positionClass: '',
        };
    },

    methods:
    {
        backDropEvent(event)
        {
            if (this.$refs.modal === event.target)
            {
                this.close();
            }
        },

        escapeEvent(event)
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
                el.classList.add('ap-modal-page');
            }

            else
            {
                el.classList.remove('ap-modal-page');
            }
        },

        toggleModal(bool)
        {
            if (bool)
            {
                this.displayClass = this.isCenter ? 'ap-modal-flex' : 'ap-modal-block';
                this.positionClass = this.isCenter ? 'ap-flex-top' : '';

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
                    // this.$refs.modal.addEventListener('click', this.backDropEvent);
                }

                this.toggleScrollbar(true);
                this.toggleModal(true);
            }

            else
            {
                if (this.escapeClose)
                {
                    window.removeEventListener('keyup', this.escapeEvent);
                }

                if (this.backDropClose)
                {
                    // this.$refs.modal.removeEventListener('click', this.backDropEvent);
                }

                this.toggleScrollbar(false);
                this.toggleModal(false);
            }
        },
    },

    render(h)
    {
        return h(
            'div',

            {
                class: Text.joinClass(
                    'ap-modal',
                    this.size && `ap-modal-${this.size}`,
                    this.positionClass,
                    this.openClass,
                    this.displayClass
                ),

                ref: 'modal',
            },

            [
                h(
                    'div',

                    {
                        class: Text.joinClass(
                            'ap-modal-dialog',
                            this.isCenter && 'ap-margin-auto-vertical'
                        ),
                    },

                    [
                        this.$slots.default,

                        this.closeButton && h(
                            'ap-modal-close',

                            {
                                on:
                                {
                                    click: () =>
                                    {
                                        this.close();
                                    },
                                },
                            }
                        ),
                    ]
                ),
            ]
        );
    },
};
