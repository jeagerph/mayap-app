<template>
    <li>
        <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small">

            <ap-grid :gutter="'small'">
                <div class="ap-width-expand@m">
                    <p class="ap-text-bold ap-text-italic ap-margin-remove">
                        {{ item.question }}
                    </p>

                    <div class="ap-margin-small-top">
                        <textarea
                            cols="30"
                            rows="2"
                            class="ap-textarea ap-textarea-message"
                            placeholder="type your answer here..."
                            v-model="item.answer">
                        </textarea>
                    </div>
                </div>
            </ap-grid>
            
        </div>
    </li>
    
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    props:
    {
        item: Object,
    },
};
</script>
