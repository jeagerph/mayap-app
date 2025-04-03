<template>
    <div class="switcher-wrapper"
        :class="{ 'switcher-toggled' : show}">
        <div class="switcher-btn"
            @click="toggle()"> <i class="bx bx-cog bx-spin"></i>
        </div>
        <div class="switcher-body">
            <div class="d-flex align-items-center">
                <h5 class="mb-0 text-uppercase">Theme Customizer</h5>
                <button type="button" class="btn-close ms-auto close-switcher" aria-label="Close" @click="toggle()"></button>
            </div>
            <hr/>
            <h6 class="mb-0">Theme Styles</h6>
            <hr/>
            <div class="d-flex align-items-center justify-content-between">
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="lightmode" name="flexRadioDefault"
                        @click="changeTheme('light-theme')">
                    <label class="form-check-label" for="lightmode">Light</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="darkmode" name="flexRadioDefault"
                        @click="changeTheme('dark-theme')">
                    <label class="form-check-label" for="darkmode">Dark</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="semidark" name="flexRadioDefault"
                        @click="changeTheme('semi-dark')">
                    <label class="form-check-label" for="semidark">Semi Dark</label>
                </div>
            </div>
            <hr/>
            <div class="form-check">
                <input class="form-check-input" type="radio" id="minimaltheme" name="flexRadioDefault"
                    @click="changeTheme('minimal-theme')">
                <label class="form-check-label" for="minimaltheme">Minimal Theme</label>
            </div>
        </div>
    </div>
</template>

<script>
export default
{
    data()
    {
        return {
            show: false,

            activeTheme: 'light-theme'
        };
    },

    methods:
    {
        toggle()
        {
            this.show = !this.show;
        },

        changeTheme(theme)
        {
            const root = document.getElementsByTagName("html")[0];

            if (this.activeTheme) root.classList.remove(this.activeTheme);

            root.classList.add(theme);

            this.activeTheme = theme;
        }
    },
};
</script>
