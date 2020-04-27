<template>
    <vList>
        <vListItem
            v-for="(reply, i) in replies"
            :key="i"
            two-line
        >
            <vListItemAvatar>
                <vImg :src="reply.imageUrl" />
            </vListItemAvatar>
            <vListItemContent>
                <vListItemSubtitle class="mb-2">
                    <strong class=".font-weight-bold white--text">
                        {{ reply.author }}
                    </strong> il y a {{ utils.getTimeDiff(new Date(reply.published)) }}
                </vListItemSubtitle>
                <vListItemTitle>
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span v-html="reply.text" />
                </vListItemTitle>
            </vListItemContent>
        </vListItem>
    </vList>
</template>

<script>
import utils from '@/assets/js/utils';

export default {

    props: {
        replies: { type: Array, default: () => [] },
        master: { type: Object, default: () => {} },
    },

    data: () => ({
        utils,
    }),

    created() {
    },

    methods: {
    },
};
</script>
